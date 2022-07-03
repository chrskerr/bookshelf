import type { LoaderFunction } from '@remix-run/node';
import type { Jsonify } from '~/utils/types';

import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { db } from '~/utils/db.server';
import { getUserIdFromRequest } from '~/utils/cookies.server';
import AddEditBook from '~/components/add-edit';

export const loader: LoaderFunction = async ({ params, request }) => {
	const userId = await getUserIdFromRequest(request);

	if (!userId) {
		return undefined;
	}

	const authors = await db.author.findMany({ select: { name: true } });
	const series = await db.series.findMany({ select: { name: true } });

	return json({
		authorNames: authors.map(({ name }) => name),
		seriesNames: series.map(({ name }) => name),
	});
};

export default function Add() {
	const { authorNames, seriesNames } = useLoaderData<
		Jsonify<{
			authorNames: string[];
			seriesNames: string[];
		}>
	>();
	return (
		<AddEditBook
			book={null}
			authorNames={authorNames}
			seriesNames={seriesNames}
		/>
	);
}

export { action } from '~/components/add-edit';
