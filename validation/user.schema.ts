import { AppError } from '@/response';
import { z } from 'zod';

// schema
export const UserSchema = z.object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    passcode: z.string().regex(/^\d{4}$/, 'Passcode must be exactly 4 digits'),
    address: z.string().min(1, 'Address is required'),
    isaggree: z.boolean().refine((val) => val === true, 'You must agree to the terms'),
});

export type UserInput = z.infer<typeof UserSchema>;

// validation function
export const validateUserInput = (data: unknown): UserInput => {
    const result = UserSchema.safeParse(data);

    if (!result.success) {
        const formattedErrors = result.error.issues.map((err) => ({
            field: err.path.join('.'), // "email"
            message: err.message,
        }));

        throw new AppError('Validation failed', 400, 'VALIDATION_ERROR', formattedErrors);
    }

    return result.data;
};
