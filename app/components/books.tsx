import type { IBooksData } from '~/routes';
import type { Jsonify } from '~/utils/types';

import { Link } from '@remix-run/react';
import Book from './book';

interface IProps {
	loaderData: Jsonify<IBooksData>;
	refetch: () => void;
}

export default function Books({ loaderData, refetch }: IProps) {
	const { books } = loaderData;

	return (
		<div className="w-full">
			<div className="flex items-center justify-between mb-4">
				<h2 className="font-mono text-2xl">Library:</h2>
				<button className="button">
					<Link to="/add">Add new book</Link>
				</button>
			</div>

			{books.length > 0 && (
				<table className="w-full table-fixed">
					<thead className="sticky top-0 pb-4 text-left bg-white">
						<tr>
							<th>Title</th>
							<th>Authors</th>
							<th>Series</th>
							<th>Is Owned</th>
							<th>Is Read</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{books.map(book => (
							<Book key={book.id} book={book} refetch={refetch} />
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
