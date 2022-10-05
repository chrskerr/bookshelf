import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { getUserCookie } from '~/utils/cookies.server';
import { db } from '~/utils/db.server';

export interface IMarkBookRead {
	bookId: string;
	isRead: boolean;
}

export const action: ActionFunction = async ({ request, params }) => {
	const { isAuthenticated } = await getUserCookie(request);
	if (!isAuthenticated) return undefined;

	const bookId = params.bookId;
	if (!bookId) return undefined;

	await db.usersBooks.deleteMany({ where: { bookId } });
	await db.book.delete({ where: { id: bookId } });

	return redirect('/');
};
