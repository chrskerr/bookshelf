import type { LoaderFunction } from '@remix-run/node';
import type { IBook } from '~/utils/types';

import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';
import { getUserIdFromRequest } from '~/utils/cookies.server';
import AddEditBook from '~/components/add-edit';

export const loader: LoaderFunction = async ({ params, request }) => {
	const bookId = params.bookId;

	const userId = await getUserIdFromRequest(request);

	if (!userId) {
		return undefined;
	}

	const book: IBook | null = await db.book.findFirst({
		where: { id: bookId },
		select: {
			id: true,
			title: true,
			users: {
				where: { userId },
				select: {
					readAt: true,
					readingOrder: true,
				},
				take: 1,
			},
			authors: {
				select: {
					author: { select: { id: true, name: true } },
				},
			},
			series: {
				select: {
					name: true,
				},
			},
		},
	});

	return json(book);
};

export default function Update() {
	const book = useLoaderData<IBook | null>();
	return <AddEditBook book={book} />;
}
