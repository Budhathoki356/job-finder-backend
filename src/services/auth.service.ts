import prisma from '../prisma/client';
import { comparePasswords, hashPassword } from '../utils/hash';
import { generateAccessToken, generateRefreshToken } from '../utils/token';

export const signup = async (name: string, email: string, password: string) => {
    if(!email || !password) throw new Error("Email and password are required");

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) throw new Error("User already exists");

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashed
        }
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return { accessToken, refreshToken };
    
}

export const login = async(email: string, password: string) => {
    if(!email || !password) throw new Error('Email and Password required');

    const user = await prisma.user.findUnique({ where: {email}});

    if(!user) throw new Error('Invalid email or password');

    const valid = await comparePasswords(password, user.password);
	if (!valid) throw new Error('Invalid email or password');

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return {accessToken , refreshToken};
}


export const getCurrentUser = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			name: true,
			email: true,
		},
	});

	if (!user) throw new Error('User not found');
	return user;
};
