import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export class JwtToken {
    static generateToken(userId: number): Error | string {
        const jwtSecret = process.env.SECRET;
        if (!jwtSecret) {
            return new Error('A secret key invalida ou nao encontrada!');
        }
        return jwt.sign({ id: userId }, jwtSecret, { expiresIn: '1h' });
    }

    static varifyToken(token: string): string | jwt.JwtPayload {
        const jwtSecret = process.env.SECRET;
        if (!jwtSecret) {
            return new Error('A secret key invalida ou nao encontrada!');
        }

        return jwt.verify(token, jwtSecret);
    }
}
