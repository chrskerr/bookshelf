import { Link } from '@remix-run/react';
import type { IMarkBookRead } from '~/routes/api/mark-book-read';
import type { IBook, Jsonify } from '~/utils/types';

interface IProps {
	book: Jsonify<IBook>;
	refetch: () => void;
}

export default function Book({ book, refetch }: IProps) {
	const isRead = !!book.users[0]?.readAt;
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

	return (
		<tr key={book.id}>
			<td>{book.title}</td>
			<td>{book.author?.name ?? 'missing'}</td>
			<td>{book.series?.name ?? 'n/a'}</td>
			<td>{book.isOwned ? 'yes' : 'no'}</td>
			<td>{isRead ? 'yes' : 'no'}</td>
			<td className="text-right link" onClick={markAsRead}>
				Mark as {isRead ? 'unread' : 'read'}
			</td>
			<td className="text-right">
				<Link to={`/edit/${book.id}`} className="link">
					Edit
				</Link>
			</td>
		</tr>
	);
}
