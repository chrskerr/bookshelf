import type { CookieOptions } from '@remix-run/node';

import { createCookie } from '@remix-run/node';

const cookieSigningKey = process.env.COOKIE_SIGNING_KEY;
const cookieSettings: CookieOptions = {
	secrets: cookieSigningKey ? [cookieSigningKey] : undefined,
	httpOnly: true,
	maxAge: 10 * 24 * 60 * 60,
	sameSite: 'strict',
};

export const userIdCookie = createCookie('user-id', cookieSettings);
export async function getUserIdFromRequest(
	request: Request,
): Promise<string | null> {
	const cookieHeader = request.headers.get('Cookie');
	return cookieHeader ? await userIdCookie.parse(cookieHeader) : null;
}
