import type { LoaderFunction } from '@remix-run/node';
import type { IBook, Jsonify } from '~/utils/types';

import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { db } from '~/utils/db.server';
import { getUserCookie } from '~/utils/cookies.server';
import AddEditBook from '~/components/add-edit';

type FetchData = {
	book: IBook;
	authorNames: string[];
	seriesNames: string[];
};

export const loader: LoaderFunction = async ({ params, request }) => {
	const bookId = params.bookId;

	const { userId } = await getUserCookie(request);

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
					readNext: true,
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

	const authors = await db.author.findMany({ include: { books: true } });
	const series = await db.series.findMany({ include: { books: true } });

	const fetchData: FetchData = {
		book,
		authorNames: authors
			.map(({ name, books }) => (books.length ? name : false))
			.filter((name): name is string => typeof name === 'string'),
		seriesNames: series
			.map(({ name, books }) => (books.length ? name : false))
			.filter((name): name is string => typeof name === 'string'),
	};

	return json(fetchData);
};

export default function Update() {
	const { book, authorNames, seriesNames } =
		useLoaderData<Jsonify<FetchData>>();
	return (
		<AddEditBook
			book={book}
			authorNames={authorNames}
			seriesNames={seriesNames}
		/>
	);
}

export { action } from '~/components/add-edit';
