import type { LoaderFunction } from '@remix-run/node';
import type { IBook } from '~/utils/types';

import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { db } from '~/utils/db.server';
import { getUserCookie } from '~/utils/cookies.server';
import AddEditBook from '~/components/add-edit';

type FetchData = {
	book: IBook & { isOwned: boolean };
	authorNames: string[];
	seriesNames: string[];
};

export const loader: LoaderFunction = async ({ params, request }) => {
	const bookId = params.bookId;

	const { userId, isAuthenticated } = await getUserCookie(request);

	if (!userId || !isAuthenticated) {
		return undefined;
	}

	const book = await db.book.findFirst({
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

	const fetchData = {
		book,
		authorNames: authors
			.map(({ name, books }) => (books.length ? name : false))
			.filter((name): name is string => typeof name === 'string'),
		seriesNames: series
			.map(({ name, books }) => (books.length ? name : false))
			.filter((name): name is string => typeof name === 'string'),
	};

	return json<FetchData>(fetchData);
};

export default function Update() {
	const { book, authorNames, seriesNames } = useLoaderData<FetchData>();
	return (
		<AddEditBook
			book={book}
			authorNames={authorNames}
			seriesNames={seriesNames}
		/>
	);
}

export { action } from '~/components/add-edit';
