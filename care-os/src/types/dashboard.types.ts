export interface NavItem {
    title: string;
    href: string;
    icon: string;
}

export interface NavSection {
    title?: string;
    items: NavItem[];
}

export interface PieChartData {
    status: string;
    count: number;
}

export interface BarChartData {
    month: Date | string;
    count: number;
}

// Adapted for CareOS Super Admin / Owner Dashboard metrics
export interface ICareOSDashboardData {
    branchCount?: number;
    classroomCount?: number;
    teacherCount?: number;
    guardianCount?: number;
    childCount?: number;
    barChartData?: BarChartData[];
    pieChartData?: PieChartData[];
}