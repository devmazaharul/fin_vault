import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from "jsonwebtoken"

const SALT_ROUNDS = 10;

export const hashPasscode = async (passcode: string): Promise<string> => {
  return  bcrypt.hash(passcode, SALT_ROUNDS);
};

export const comparePasscode = async (passcode: string, hashedPasscode: string): Promise<boolean> => {
  return bcrypt.compare(passcode, hashedPasscode);
}


// JWT Utility Functions with default valuse

export const generateToken = (payload: object, secret: string, expiresIn: string | number = '1h'): string => {
  const options: SignOptions = { expiresIn } as any;
  return jwt.sign(payload, secret, options);
}

export const verifyToken = (token: string, secret: string): object | string => {
  return jwt.verify(token, secret);
}