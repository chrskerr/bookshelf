import type { LoaderFunction } from '@remix-run/node';
import type { IBook, Jsonify } from '~/utils/types';

import { json, redirect } from '@remix-run/node';
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
			isOwned: true,
			bookNumber: true,
			users: {
				where: { userId },
				select: {
					readAt: true,
					readingOrder: true,
				},
				take: 1,
			},
			author: { select: { id: true, name: true } },
			series: {
				select: {
					name: true,
				},
			},
		},
	});

	if (!book) {
		return redirect('/');
	}

	const authors = await db.author.findMany({ select: { name: true } });
	const series = await db.series.findMany({ select: { name: true } });

	return json({
		book,
		authorNames: authors.map(({ name }) => name),
		seriesNames: series.map(({ name }) => name),
	});
};

export default function Update() {
	const { book, authorNames, seriesNames } = useLoaderData<
		Jsonify<{
			book: IBook;
			authorNames: string[];
			seriesNames: string[];
		}>
	>();
	return (
		<AddEditBook
			book={book}
			authorNames={authorNames}
			seriesNames={seriesNames}
		/>
	);
}

export { action } from '~/components/add-edit';
