import type { IBooksData } from '~/routes';
import type { Jsonify } from '~/utils/types';

import { Link } from '@remix-run/react';

interface IProps {
	loaderData: Jsonify<IBooksData>;
}

export default function Books({ loaderData }: IProps) {
	const { books } = loaderData;

	return (
		<div className="w-full max-w-5xl">
			<div className="mb-4 flex justify-between items-center">
				<h2 className="text-2xl font-mono">Library:</h2>
				<button className="button">
					<Link to="/add">Add new book</Link>
				</button>
			</div>

			{books.length > 0 &&
				books.map((book, i) => {
					const isRead = !!book.users[0]?.readAt;
					const authors = book.authors
						.map(({ author }) => author.name)
						.join(', ');

					return (
						<div
							key={book.id}
							className={`w-full grid grid-cols-5 gap-1 self-center border-b mb-3 pb-3 ${
								i === 0 ? 'border-t mt-3 pt-3' : ''
							}`}
						>
							<p>Title: {book.title}</p>
							<p>ISBN: {book.isbn}</p>
							<p>Authors: {authors}</p>
							<p>Series: {book.series?.name ?? 'n/a'}</p>
							<p>Is owned: {book.isOwned ? 'yes' : 'no'}</p>
							<p>Is read: {isRead ? 'yes' : 'no'}</p>
							<Link to={`/edit/${book.id}`} className="link">
								Mark as {isRead ? 'unread' : 'read'}
							</Link>
							<Link to={`/edit/${book.id}`} className="link">
								Edit
							</Link>
						</div>
					);
				})}
		</div>
	);
}
