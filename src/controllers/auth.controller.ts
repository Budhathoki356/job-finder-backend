import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const {accessToken, refreshToken} = await AuthService.signup(name, email, password);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(201).json({ accessToken });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const {email, password } = req.body;
    const {accessToken, refreshToken} = await AuthService.login( email, password);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(201).json({ accessToken });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
}

export const logout = async (_req: Request, res: Response) => {
	try {
		// Clear the refresh token cookie
		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
		});

		res.json({ message: 'Logged out successfully' });
	} catch (err: any) {
		res.status(400).json({ error: err.message });
	}
};

export const getMe = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).userId;

		const user = await AuthService.getCurrentUser(userId);

		res.json({ user });
	} catch (err: any) {
		res.status(401).json({ error: 'Unauthorized' });
	}
};