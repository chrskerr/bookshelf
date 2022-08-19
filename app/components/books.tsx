import { useState } from 'react';
import type { IBooksData } from '~/routes';
import type { Jsonify } from '~/utils/types';

import Book from './book';

interface IProps {
	loaderData: Jsonify<IBooksData>;
	refetch: () => void;
}

enum Filters {
	ALL = 'all',
	NOT_OWNED = 'not-owned',
	UNREAD = 'unread',
	READ = 'read',
}

export default function Books({ loaderData, refetch }: IProps) {
	const { books } = loaderData;
	const [terms, setTerms] = useState('');
	const [filter, setFilter] = useState<Filters>(Filters.ALL);

	const filterTerms = terms
		.split(' ')
		.map(term => term.toLowerCase())
		.filter(Boolean);

	const filteredBooks =
		terms || filter !== Filters.ALL
			? books.filter(book => {
					switch (filter) {
						case Filters.ALL:
							break;
						case Filters.NOT_OWNED:
							if (book.isOwned) return false;
							break;
						case Filters.READ:
							if (!book.users[0]?.readAt) return false;
							break;

						case Filters.UNREAD:
							if (book.users[0]?.readAt) return false;
							break;
					}

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
			<div className="max-w-xl pb-4">
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
				<label className="my-4 label">
					Filter:
					<select
						value={filter}
						onChange={e => setFilter(e.target.value as Filters)}
					>
						<option value={Filters.ALL}>All books</option>
						<option value={Filters.NOT_OWNED}>Not owned</option>
						<option value={Filters.READ}>Read</option>
						<option value={Filters.UNREAD}>Unread</option>
					</select>
				</label>
			</div>

			{sortedBooks.length > 0 && (
				<table className="w-full table-auto min-w-[1200px]">
					<thead className="sticky top-0 pb-4 text-lg font-medium text-left bg-white">
						<tr>
							<th className="w-[20%]">Title</th>
							<th className="w-[20%]">Author</th>
							<th className="w-[20%]">Series</th>
							<th className="w-[8%]">Book #</th>
							<th className="w-[8%]">Owned</th>
							<th className="w-[8%]">Have Read</th>
							<th className="w-[8%]">Reading list</th>
							<th className="w-[8%]"></th>
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
