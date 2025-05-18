import { Response } from 'express';

export const sucess = (res: Response, message: string, data: any = {}, statusCode: number = 200) => {
    return res.status(statusCode).json({
        success: true,
        statusCode,
        message,
        data,
        error: {},
    });
};

export const error = (res: Response, message: string, errorDetail: any = {}, statusCode: number = 400) => {
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        data: {},
        error: errorDetail,
    });
};
