import type { ActionFunction } from '@remix-run/node';

import { redirect } from '@remix-run/node';
import { db } from './db.server';

interface UploadBook {
	id?: string;
	title?: string;
	isbn?: string;
	author?: string;
	series?: string;
	isOwned?: boolean;
	firstPublishedAt?: string;
}

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const bookData = Object.fromEntries(formData) as UploadBook;

	if (
		!bookData.author ||
		!bookData.firstPublishedAt ||
		!bookData.isbn ||
		!bookData.title ||
		typeof bookData.isOwned !== 'boolean'
	) {
		throw new Response('Missing data', { status: 500 });
	}

	const insertObj: Parameters<typeof db.book.upsert>[0]['create'] = {
		title: bookData.title,
		isbn: bookData.isbn,
		isOwned: bookData.isOwned,
		firstPublishedAt: new Date(bookData.firstPublishedAt),
		...(bookData.series
			? {
					series: {
						connectOrCreate: {
							where: { name: bookData.series },
							create: { name: bookData.series },
						},
					},
			  }
			: {}),
	};

	const book = await db.book.upsert({
		where: { id: bookData.id },
		create: insertObj,
		update: insertObj,
	});

	let author = await db.author.findUnique({
		where: { name: bookData.author },
	});
	if (!author) {
		author = await db.author.create({ data: { name: bookData.author } });
	}

	const hasAuthor = !!(await db.booksAuthors.findUnique({
		where: { bookId_authorId: { bookId: book.id, authorId: author.id } },
	}));
	if (!hasAuthor) {
		await db.booksAuthors.create({
			data: { bookId: book.id, authorId: author.id },
		});
	}

	return redirect('/');
};
