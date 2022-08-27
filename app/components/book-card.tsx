import { Link } from '@remix-run/react';
import type { IMarkBookRead } from '~/routes/api/mark-book-read';
import type { IMarkBookReadNext } from '~/routes/api/mark-book-read-next';
import type { IBook, Jsonify } from '~/utils/types';

interface IProps {
	book: Jsonify<IBook>;
	refetch: () => void;
}

export default function BookCard({ book, refetch }: IProps) {
	const isRead = !!book.users[0]?.readAt;
	const isReadNext = !!book.users[0]?.readNext;

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

	return (
		<div className="p-3 mb-4 bg-white border rounded-lg">
			<div className="grid grid-cols-[1fr_2fr] gap-1 mb-2">
				<p className="font-semibold">Title:</p>
				<p className="truncate">{book.title}</p>

				<p className="font-semibold">Author:</p>
				<p className="truncate">{book.author?.name ?? 'missing'}</p>

				<p className="font-semibold">Series:</p>
				<p className="truncate">{book.series?.name ?? ''}</p>
			</div>
			<div className="grid grid-cols-[2fr_1fr_2fr_1fr] gap-1 mb-2">
				<p className="font-semibold">Book #:</p>
				<p>{book.series?.name ? book.bookNumber : 'n/a'}</p>

				<p className="font-semibold">Owned:</p>
				<p>{book.isOwned ? 'yes' : 'no'}</p>

				<p className="font-semibold">Have read:</p>
				<p>
					<input
						className="scale-150"
						type="checkbox"
						defaultChecked={isRead}
						onClick={markAsRead}
					/>
				</p>

				<p className="font-semibold">Reading list:</p>
				<p>
					<input
						className="scale-150"
						type="checkbox"
						defaultChecked={isReadNext}
						onClick={markAsReadNext}
					/>
				</p>
			</div>
			<div>
				<p>
					<Link to={`/edit/${book.id}`} className="link">
						Edit
					</Link>
				</p>
			</div>
		</div>
	);
}
