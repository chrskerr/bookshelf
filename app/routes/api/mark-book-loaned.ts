import type { ActionFunction } from '@remix-run/node';

import { Response } from '@remix-run/web-fetch';
import { getUserCookie } from '~/utils/cookies.server';
import { db } from '~/utils/db.server';

export interface IMarkBookLoaned {
	bookId: string;
	loanedTo: string;
}

export const action: ActionFunction = async ({ request }) => {
	const body: IMarkBookLoaned = await request.json();
	const { userId, isAuthenticated } = await getUserCookie(request);
	if (!isAuthenticated) return undefined;

	const bookId = body.bookId;

	if (!userId || !bookId) {
		return new Response(undefined, { status: 400 });
	}

	await db.book.update({
		where: { id: bookId },
		data: { loanedTo: body.loanedTo || null },
	});

	return new Response(undefined, { status: 200 });
};
