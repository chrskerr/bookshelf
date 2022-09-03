import type { LoaderFunction } from '@remix-run/node';

import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { db } from '~/utils/db.server';
import { getUserCookie } from '~/utils/cookies.server';
import AddEditBook from '~/components/add-edit';

type FetchData = {
	authorNames: string[];
	seriesNames: string[];
};

export const loader: LoaderFunction = async ({ params, request }) => {
	const userId = await getUserCookie(request);

	if (!userId) {
		return undefined;
	}

	const authors = await db.author.findMany({ include: { books: true } });
	const series = await db.series.findMany({ include: { books: true } });

	const fetchData = {
		authorNames: authors
			.map(({ name, books }) => (books.length ? name : false))
			.filter((name): name is string => typeof name === 'string'),
		seriesNames: series
			.map(({ name, books }) => (books.length ? name : false))
			.filter((name): name is string => typeof name === 'string'),
	};

	return json<FetchData>(fetchData);
};

export default function Add() {
	const { authorNames, seriesNames } = useLoaderData<FetchData>();
	return (
		<AddEditBook
			book={null}
			authorNames={authorNames}
			seriesNames={seriesNames}
		/>
	);
}

export { action } from '~/components/add-edit';
