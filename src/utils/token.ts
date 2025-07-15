import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: string, role: string) => {
	return jwt.sign({ userId , role}, process.env.ACCESS_TOKEN_SECRET!, {
		expiresIn: '15m',
	});
};

export const generateRefreshToken = (userId: string, role: string) => {
	return jwt.sign({ userId , role}, process.env.REFRESH_TOKEN_SECRET!, {
		expiresIn: '7d',
	});
};

export const verifyRefreshToken = (token: string) => {
	return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {
		userId: string;
	};
};

export const verifyAccessToken = (token: string) => {
	return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
		userId: string;
		role: Role
	};
};

