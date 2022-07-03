import type { ActionFunction } from '@remix-run/node';

import { Response } from '@remix-run/web-fetch';
import { getUserIdFromRequest } from '~/utils/cookies.server';
import { db } from '~/utils/db.server';

export interface IMarkBookRead {
	bookId: string;
	isRead: boolean;
}

export const action: ActionFunction = async ({ request }) => {
	const body: IMarkBookRead = await request.json();
	const userId = await getUserIdFromRequest(request);

	const bookId = body.bookId;

	if (!userId || !bookId || typeof body.isRead !== 'boolean') {
		return new Response(undefined, { status: 400 });
	}

	const readAt = body.isRead ? new Date() : null;

	await db.usersBooks.upsert({
		where: { userId_bookId: { bookId, userId } },
		update: { readAt },
		create: { userId, bookId, readAt },
	});

	return new Response(undefined, { status: 200 });
};
