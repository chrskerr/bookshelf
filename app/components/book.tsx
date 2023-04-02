import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { IMarkBookRead } from '~/routes/api/mark-book-read';
import type { IMarkBookReadNext } from '~/routes/api/mark-book-read-next';
import type { IBook, Jsonify } from '~/utils/types';

import { Link } from '@remix-run/react';
import debounce from 'lodash/debounce';
import { useCallback } from 'react';
import type { IMarkBookLoaned } from '~/routes/api/mark-book-loaned';

interface IProps {
	book: Jsonify<IBook>;
	refetch: () => void;
	shouldShowUserColumns: boolean;
	gridClasses: string;
}

export default function Book({
	book,
	refetch,
	shouldShowUserColumns,
	gridClasses,
}: IProps) {
	const isRead = !!book.users[0]?.readAt;
	const isReadNext = !!book.users[0]?.addedToReadingListAt;

	const [loanedTo, setLoanedTo] = useState(book.loanedTo ?? '');

	async function markAsRead() {
		const body: IMarkBookRead = {
			bookId: book.id,
			isRead: !isRead,
		};
		const res = await fetch('/api/mark-book-read', {
			method: 'post',
			credentials: 'include',
			body: JSON.stringify(body),
		});

		if (res.ok) {
			refetch();
		}
	}

	async function markAsReadNext() {
		const body: IMarkBookReadNext = {
			bookId: book.id,
			isReadNext: !isReadNext,
		};
		const res = await fetch('/api/mark-book-read-next', {
			method: 'post',
			credentials: 'include',
			body: JSON.stringify(body),
		});

		if (res.ok) {
			refetch();
		}
	}

	const handleLoanedToSave = useCallback(
		debounce(async (newValue: string) => {
			const body: IMarkBookLoaned = {
				bookId: book.id,
				loanedTo: newValue,
			};
			const res = await fetch('/api/mark-book-loaned', {
				method: 'post',
				credentials: 'include',
				body: JSON.stringify(body),
			});

			if (res.ok) {
				refetch();
			}
		}, 500),
		[],
	);

	const handleLoanedToChange = useCallback(
		(e: ChangeEvent & { currentTarget: HTMLInputElement }) => {
			const newValue = e.currentTarget.value;
			setLoanedTo(newValue);
			handleLoanedToSave(newValue);
		},
		[],
	);

	return (
		<details className="p-1">
			<summary className="relative [&::-webkit-details-marker]:absolute [&::-webkit-details-marker]:left-[-1.25rem] [&::-webkit-details-marker]:top-[0.5rem] [&::marker]:absolute [&::marker]:left-[-1.25rem] [&::marker]:top-[0.5rem]">
				<div className={`${gridClasses} w-full gap-x-2`}>
					<p className="truncate">{book.title}</p>
					<p className="truncate">{book.author?.name ?? 'missing'}</p>
					<p className="truncate">{book.series?.name ?? ''}</p>
					<p>{book.series?.name ? book.bookNumber : '-'}</p>
					{shouldShowUserColumns && (
						<>
							<p>
								<input
									type="checkbox"
									defaultChecked={isRead}
									onClick={markAsRead}
								/>
							</p>
							<p>
								<input
									type="checkbox"
									defaultChecked={isReadNext}
									onClick={markAsReadNext}
								/>
							</p>
						</>
					)}
					<p>
						<Link to={`/edit/${book.id}`} className="link">
							Edit
						</Link>
					</p>
				</div>
			</summary>
			<p className="pt-1">
				Loaned to:{' '}
				<input
					className="ml-4 border border-black"
					value={loanedTo}
					onChange={handleLoanedToChange}
				/>
			</p>
		</details>
	);
}
