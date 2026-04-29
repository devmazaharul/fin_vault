import prisma from '@/lib/prisma';
import { AppError, AppSuccess, withErrorHandler } from '@/response';
import { validateUserInput } from '@/validation/user.schema';
import { hashPasscode } from './../../../../utils/inde';

export const POST = withErrorHandler(async (req: Request) => {
    const body = await req.json();
    const data = validateUserInput(body);
    // Here you would typically save the user data to a database and readbale variable name cleean code
    const chechUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (chechUser) {
        throw new AppError('User already exists', 400, 'USER_EXISTS');
    }

    const genHashPasscode = await hashPasscode(data.passcode);
    await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            passcode: genHashPasscode,
            address: data.address,
        },
    });

    return new AppSuccess('Success', data).send();
});
