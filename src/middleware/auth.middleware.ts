import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/token";

export interface AuthRequest extends Request {
    userId? : string
}

// 🔒 For regular authenticated users (after full login)
export const requireAuth = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): void => {
	const authHeader = req.headers.authorization;

	if (!authHeader?.startsWith('Bearer ')) {
		res.status(401).json({ error: 'Missing access token' });
		return;
	}

	const token = authHeader.split(' ')[1];

	try {
		const payload = verifyAccessToken(token);
		req.userId = payload.userId;
		next();
	} catch {
		res.status(401).json({ error: 'Invalid or expired access token' });
	}
};
