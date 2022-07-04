import { useState } from 'react';
import type { IBooksData } from '~/routes';
import type { Jsonify } from '~/utils/types';

import Book from './book';

interface IProps {
	loaderData: Jsonify<IBooksData>;
	refetch: () => void;
}

export default function Books({ loaderData, refetch }: IProps) {
	const { books } = loaderData;
	const [terms, setTerms] = useState('');

	const filterTerms = terms
		.split(' ')
		.map(term => term.toLowerCase())
		.filter(Boolean);
	const filteredBooks = terms
		? books.filter(book => {
				const matches = filterTerms.map<boolean>(term => {
					return (
						book.author?.name.toLowerCase().includes(term) ||
						book.title.toLowerCase().includes(term) ||
						book.series?.name.toLowerCase().includes(term) ||
						false
					);
				});
				return !matches.includes(false);
		  })
		: books;

	const sortedBooks = filteredBooks.sort((a, b) => {
		const aReadNext = !!a.users[0]?.readNext;
		const bReadNext = !!b.users[0]?.readNext;

		if (aReadNext && !bReadNext) return -1;
		if (bReadNext && !aReadNext) return 1;
		return 0;
	});

	return (
		<div className="w-full">
			<div className="grid grid-cols-3 mb-4">
				<label className="label">
					Search:
					<input
						placeholder="Enter search terms..."
						className="w-full"
						type="search"
						value={terms}
						onChange={e => setTerms(e.target.value)}
					/>
				</label>
			</div>

			{sortedBooks.length > 0 && (
				<table className="w-full table-auto">
					<thead className="sticky top-0 pb-4 text-lg font-medium text-left bg-white">
						<tr>
							<th>Title</th>
							<th>Authors</th>
							<th>Series</th>
							<th>Book #</th>
							<th>Owned</th>
							<th>Have Read</th>
							<th>Reading list</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{sortedBooks.map(book => (
							<Book key={book.id} book={book} refetch={refetch} />
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
