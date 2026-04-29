import { NextResponse } from 'next/server';

export class AppError {
    constructor(
        public message: string,
        public statusCode: number = 500,
        public errorCode?: string,
        public details?: any,
        public isOperational: boolean = true,
    ) {}

    send(path?: string) {
        return NextResponse.json(
            {
                success: false,
                message: this.message,
                errorCode: this.errorCode,
                details: this.details,
                path: path,
                timestamp: new Date().toISOString(),
            },
            {
                status: this.statusCode,
            },
        );
    }
}

export class AppSuccess {
    constructor(
        public message: string,
        public data?: any,
        public statusCode: number = 200,
    ) {}

    send() {
        return NextResponse.json(
            {
                success: true,
                message: this.message,
                data: this.data,
            },
            {
                status: this.statusCode,
            },
        );
    }
}


export const withErrorHandler = (handler: (req: Request) => Promise<NextResponse>) => {
    return async (req: Request) => {
        try {
            return await handler(req);
        } catch (error) {
            if (error instanceof AppError) {
                return error.send(req.url);
            } 
            return new AppError('Internal Server Error', 500, 'INTERNAL_ERROR').send(req.url);
        }
    };
}