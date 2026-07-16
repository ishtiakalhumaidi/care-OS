export const sendResponse = (res, responseData) => {
    const { httpStatusCode, success, message, data, meta } = responseData;
    res.status(httpStatusCode).json({
        success,
        message,
        data,
        meta
    });
};
