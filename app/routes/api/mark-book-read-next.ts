import type { ActionFunction } from '@remix-run/node';

import { Response } from '@remix-run/web-fetch';
import { getUserCookie } from '~/utils/cookies.server';
import { db } from '~/utils/db.server';

export interface IMarkBookReadNext {
	bookId: string;
	isReadNext: boolean;
}

export const action: ActionFunction = async ({ request }) => {
	const body: IMarkBookReadNext = await request.json();
	const { userId, isAuthenticated } = await getUserCookie(request);
	if (!isAuthenticated) return undefined;

	const bookId = body.bookId;

	if (!userId || !bookId || typeof body.isReadNext !== 'boolean') {
		return new Response(undefined, { status: 400 });
	}

	await db.usersBooks.upsert({
		where: { userId_bookId: { bookId, userId } },
		update: { addedToReadingListAt: body.isReadNext ? new Date() : null },
		create: {
			userId,
			bookId,
			addedToReadingListAt: body.isReadNext ? new Date() : null,
		},
	});

	return new Response(undefined, { status: 200 });
};
