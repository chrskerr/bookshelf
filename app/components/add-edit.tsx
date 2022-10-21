import type { IBook, Jsonify } from '~/utils/types';
import type { ActionFunction } from '@remix-run/node';

import { Form, Link, useTransition, useNavigate } from '@remix-run/react';

import { redirect } from '@remix-run/node';
import { db } from '~/utils/db.server';
import { Hint } from 'react-autocomplete-hint';
import { useState } from 'react';
import { getUserCookie } from '~/utils/cookies.server';

interface IProps {
	book: Jsonify<IBook & { isOwned: boolean }> | null;
	authorNames: string[];
	seriesNames: string[];
}

interface UploadBook {
	id?: string;
	title?: string;
	author?: string;
	series?: string;
	isOwned?: string;
	bookNumber?: string;
}

export const action: ActionFunction = async ({ request }) => {
	const cookie = await getUserCookie(request);
	if (!cookie.isAuthenticated) return undefined;

	const formData = await request.formData();
	const bookData = Object.fromEntries(formData) as UploadBook;

	if (
		!bookData.author ||
		!bookData.bookNumber ||
		isNaN(parseInt(bookData.bookNumber)) ||
		!bookData.title
	) {
		throw new Response('Missing data', { status: 500 });
	}

	const insertObj: Parameters<typeof db.book.upsert>[0]['create'] = {
		title: bookData.title.trim(),
		isOwned: bookData.isOwned === 'on',
		bookNumber: parseInt(bookData.bookNumber),
		author: {
			connectOrCreate: {
				where: { name: bookData.author },
				create: { name: bookData.author },
			},
		},
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

	await db.book.upsert({
		where: { id: bookData.id },
		create: insertObj,
		update: insertObj,
	});

	return redirect('/');
};

export default function AddEditBook({
	book,
	authorNames,
	seriesNames,
}: IProps) {
	const transition = useTransition();
	const navigate = useNavigate();

	const [author, setAuthor] = useState<string>(book?.author?.name || '');
	const [series, setSeries] = useState<string>(book?.series?.name || '');

	async function handleDelete(e: MouseEvent) {
		if (!book) return;
		await fetch(`/api/delete/${book.id}`, {
			method: 'post',
			credentials: 'include',
		});
		navigate('/');
	}

	return (
		<div className="add-edit">
			<Form method="post">
				<fieldset disabled={transition.state === 'submitting'}>
					<div className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2">
						<input
							type="hidden"
							name="id"
							defaultValue={book?.id}
						/>
						<label className="label">
							Title:
							<input
								type="text"
								name="title"
								defaultValue={book?.title}
								required
							/>
						</label>
						<label className="label">
							Author:
							<Hint
								options={authorNames}
								onFill={e => setAuthor(e as string)}
								allowEnterFill
								allowTabFill
							>
								<input
									className="w-full"
									type="text"
									name="author"
									value={author}
									onChange={e => setAuthor(e.target.value)}
									required
								/>
							</Hint>
						</label>
						<label className="label">
							Series:
							<Hint
								options={seriesNames}
								onFill={e => setSeries(e as string)}
								allowEnterFill
								allowTabFill
							>
								<input
									type="text"
									name="series"
									value={series}
									onChange={e => setSeries(e.target.value)}
								/>
							</Hint>
						</label>
						<label className="label">
							Is owned?
							<input
								type="checkbox"
								name="isOwned"
								defaultChecked={book?.isOwned ?? true}
								className="h-full"
							/>
						</label>
						<label className="label">
							Book number
							<input
								type="number"
								name="bookNumber"
								defaultValue={book?.bookNumber ?? '1'}
								step={1}
								min={1}
								required
							/>
						</label>
					</div>
					<div className="flex mt-4">
						<button type="submit" className="mr-4 button">
							{transition.state === 'submitting'
								? 'Saving...'
								: 'Save'}
						</button>
						<button type="button" className="button neutral">
							<Link to="/">Cancel</Link>
						</button>
						{book && (
							<button
								type="button"
								className="ml-auto button destructive"
								onClick={handleDelete}
							>
								Delete
							</button>
						)}
					</div>
				</fieldset>
			</Form>
		</div>
	);
}
