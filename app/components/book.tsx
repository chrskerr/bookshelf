import { Link } from '@remix-run/react';
import type { IMarkBookRead } from '~/routes/api/mark-book-read';
import type { IMarkBookReadNext } from '~/routes/api/mark-book-read-next';
import type { IBook, Jsonify } from '~/utils/types';

interface IProps {
	book: Jsonify<IBook>;
	refetch: () => void;
}

export default function Book({ book, refetch }: IProps) {
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
		<>
			<p className="truncate">{book.title}</p>
			<p className="truncate">{book.author?.name ?? 'missing'}</p>
			<p className="truncate">{book.series?.name ?? ''}</p>
			<p>{book.series?.name ? book.bookNumber : ''}</p>
			<p>{book.isOwned ? 'yes' : 'no'}</p>
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
			<p>
				<Link to={`/edit/${book.id}`} className="link">
					Edit
				</Link>
			</p>
		</>
	);
}
