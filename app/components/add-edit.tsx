import type { IBook, Jsonify } from '~/utils/types';
import type { ActionFunction } from '@remix-run/node';

import { Form, Link, useTransition } from '@remix-run/react';

import { redirect } from '@remix-run/node';
import { db } from '~/utils/db.server';

interface IProps {
	book: Jsonify<IBook> | null;
}

interface UploadBook {
	id?: string;
	title?: string;
	isbn?: string;
	author?: string;
	series?: string;
	isOwned?: string;
	firstPublishedAt?: string;
}

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const bookData = Object.fromEntries(formData) as UploadBook;

	if (
		!bookData.author ||
		!bookData.firstPublishedAt ||
		!bookData.isbn ||
		!bookData.title
	) {
		throw new Response('Missing data', { status: 500 });
	}

	const insertObj: Parameters<typeof db.book.upsert>[0]['create'] = {
		title: bookData.title.trim(),
		isbn: bookData.isbn.replace(/\D/g, ''),
		isOwned: bookData.isOwned === 'on',
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

export default function AddEditBook({ book }: IProps) {
	const transition = useTransition();

	const firstPublishedAt = book?.firstPublishedAt
		? new Date(book.firstPublishedAt).toISOString().split('T')[0]
		: undefined;

	return (
		<div className="add-edit">
			<Form method="post">
				<fieldset disabled={transition.state === 'submitting'}>
					<div className="grid grid-cols-2 grid-flow-row gap-4">
						<input
							type="hidden"
							name="id"
							defaultValue={book?.id}
						/>
						<label>
							Title:
							<input
								type="text"
								name="title"
								defaultValue={book?.title}
								required
							/>
						</label>
						<label>
							ISBN:
							<input
								type="text"
								name="isbn"
								defaultValue={book?.isbn}
								required
							/>
						</label>
						<label>
							Author:
							<input
								type="text"
								name="author"
								defaultValue={book?.authors[0]?.author.name}
								required
							/>
						</label>
						<label>
							Series:
							<input
								type="text"
								name="series"
								defaultValue={book?.series?.name}
							/>
						</label>
						<label>
							Is owned?
							<input
								type="checkbox"
								name="isOwned"
								defaultChecked={book?.isOwned}
								className="h-full"
							/>
						</label>
						<label>
							Date First Published:
							<input
								type="date"
								name="firstPublishedAt"
								defaultValue={firstPublishedAt}
								required
							/>
						</label>
					</div>
					<div className="flex mt-4">
						<button type="submit" className="button mr-4">
							{transition.state === 'submitting'
								? 'Saving...'
								: 'Save'}
						</button>
						<button className="button destructive">
							<Link to="/">Cancel</Link>
						</button>
					</div>
				</fieldset>
			</Form>
		</div>
	);
}
