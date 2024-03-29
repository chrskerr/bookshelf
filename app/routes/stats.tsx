import type { LoaderFunction } from '@remix-run/node';
import type { IBook } from '~/utils/types';

import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { getUserCookie } from '~/utils/cookies.server';
import { db } from '~/utils/db.server';

export interface IBooksData {
	books: Array<IBook & { isOwned: boolean }>;
}

export const loader: LoaderFunction = async ({ request }) => {
	const userData = await getUserCookie(request);

	if (!userData.isAuthenticated) {
		const emptyData: IBooksData = {
			books: [],
		};
		return json(emptyData);
	}

	const data = {
		books: await db.book.findMany({
			select: {
				id: true,
				title: true,
				bookNumber: true,
				isOwned: true,
				createdAt: true,
				users: {
					select: {
						userId: true,
						readAt: true,
						addedToReadingListAt: true,
					},
				},
				author: { select: { id: true, name: true } },
				series: {
					select: {
						name: true,
					},
				},
			},
		}),
	};

	return json<IBooksData>(data);
};

export default function Index() {
	const { books } = useLoaderData<IBooksData>();

	const totalOwnedBooks = books.filter(({ isOwned }) => isOwned).length;
	const totalWishlistBooks = books.length - totalOwnedBooks;

	const readByKate = books.filter(
		({ users }) => users.find(user => user.userId === 'kate')?.readAt,
	).length;
	const readByChris = books.filter(
		({ users }) => users.find(user => user.userId === 'chris')?.readAt,
	).length;

	return (
		<div>
			<h2 className="mb-4 text-xl">Book stats:</h2>
			<div className="grid grid-cols-3 gap-y-2 mx-auto [&>*]:border-y [&>*]:p-1 [&>*:nth-of-type(3n+1)]:border-l [&>*:nth-of-type(3n+1)]:pl-2 [&>*:nth-of-type(3n)]:border-r [&>*:nth-of-type(3n)]:pr-2">
				<p>Total owned:</p>
				<p>{totalOwnedBooks}</p>
				<p>
					{((totalOwnedBooks / books.length) * 100).toFixed(1)}% of
					all books
				</p>

				<p>Total wishlist:</p>
				<p>{totalWishlistBooks}</p>
				<p>
					{((totalWishlistBooks / books.length) * 100).toFixed(1)}% of
					all books
				</p>

				<p>Read by Kate:</p>
				<p>{readByKate}</p>
				<p>
					{((readByKate / totalOwnedBooks) * 100).toFixed(1)}% of
					owned
				</p>

				<p>Read by Chris:</p>
				<p>{readByChris}</p>
				<p>
					{((readByChris / totalOwnedBooks) * 100).toFixed(1)}% of
					owned
				</p>
			</div>
		</div>
	);
}
