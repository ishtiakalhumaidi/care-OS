import { IQuery } from "../interfaces/query.interface.js";

interface QueryBuilderConfig {
    searchableFields?: string[];
    filterableFields?: string[];
}

export class QueryBuilder<T, WhereInput extends Record<string, any>, IncludeType = any> {
    public model: any;
    public query: IQuery;
    public config: QueryBuilderConfig;

    public whereArgs: Record<string, any> = {};
    public includeArgs?: IncludeType;
    public sortArgs?: Record<string, 'asc' | 'desc'>;
    public skipArg?: number;
    public takeArg?: number;
    public selectArgs?: Record<string, boolean>;

    constructor(model: any, query: IQuery, config: QueryBuilderConfig = {}) {
        this.model = model;
        this.query = query;
        this.config = config;
    }

    search() {
        const searchTerm = this.query?.searchTerm as string;
        const searchableFields = this.config.searchableFields;

        if (searchTerm && searchableFields && searchableFields.length > 0) {
            const searchConditions = searchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            }));

            this.whereArgs.OR = searchConditions;
        }

        return this;
    }

    filter() {
        const queryObj = { ...this.query };
        const excludeFields = ['searchTerm', 'page', 'limit', 'sortBy', 'sortOrder', 'fields'];
        excludeFields.forEach((el) => delete queryObj[el]);

        const filterableFields = this.config.filterableFields || [];

        if (Object.keys(queryObj).length > 0) {
            const andConditions: any[] = [];

            for (const [key, value] of Object.entries(queryObj)) {
                if (filterableFields.includes(key)) {
                    // Automatically convert string booleans from query params
                    if (value === 'true' || value === 'false') {
                        andConditions.push({ [key]: value === 'true' });
                    } else {
                        andConditions.push({ [key]: value });
                    }
                }
            }

            if (andConditions.length > 0) {
                if (this.whereArgs.AND) {
                    this.whereArgs.AND = [...this.whereArgs.AND, ...andConditions];
                } else {
                    this.whereArgs.AND = andConditions;
                }
            }
        }

        return this;
    }

    paginate() {
        const page = Number(this.query?.page) || 1;
        const limit = Number(this.query?.limit) || 10;
        const skip = (page - 1) * limit;

        this.skipArg = skip;
        this.takeArg = limit;

        return this;
    }

    sort() {
        const sortBy = (this.query?.sortBy as string) || 'createdAt';
        const sortOrder = (this.query?.sortOrder as 'asc' | 'desc') || 'desc';

        this.sortArgs = { [sortBy]: sortOrder };

        return this;
    }

    fields() {
        if (this.query?.fields) {
            const fields = (this.query.fields as string).split(',');
            const selectObj: Record<string, boolean> = {};
            
            fields.forEach((field) => {
                selectObj[field.trim()] = true;
            });

            // Prisma prohibits using `select` and `include` at the same time.
            this.selectArgs = selectObj;
        }

        return this;
    }

    dynamicInclude(includeConfig?: IncludeType) {
        if (includeConfig) {
            this.includeArgs = includeConfig;
        }
        return this;
    }

    async execute() {
        const queryArgs: any = {
            where: this.whereArgs,
        };

        if (this.skipArg !== undefined) queryArgs.skip = this.skipArg;
        if (this.takeArg !== undefined) queryArgs.take = this.takeArg;
        if (this.sortArgs !== undefined) queryArgs.orderBy = this.sortArgs;

        // Apply either select or include, but not both
        if (this.selectArgs) {
            queryArgs.select = this.selectArgs;
        } else if (this.includeArgs) {
            queryArgs.include = this.includeArgs;
        }

        const [data, total] = await Promise.all([
            this.model.findMany(queryArgs),
            this.model.count({ where: this.whereArgs }),
        ]);

        const page = Number(this.query?.page) || 1;
        const limit = Number(this.query?.limit) || 10;
        const totalPages = Math.ceil(total / limit);

        return {
            meta: {
                page,
                limit,
                total,
                totalPages,
            },
            data,
        };
    }
}