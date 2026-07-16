import status from "http-status";
export const notFound = (req, res) => {
    res.status(status.NOT_FOUND).json({
        success: false,
        message: `Route ${req.originalUrl} Not Found`,
    });
};
