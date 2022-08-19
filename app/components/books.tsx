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

	const gridClasses =
		'grid grid-cols-[repeat(3,4fr)_repeat(5,1fr)] w-full min-w-[1200px] p-1 gap-x-2';

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
				<>
					<div
						className={`${gridClasses} sticky top-0 pb-4 font-medium text-left bg-white`}
					>
						<p className="w-[19%]">Title</p>
						<p className="w-[18%]">Author</p>
						<p className="w-[18%]">Series</p>
						<p className="w-[9%]">Book #</p>
						<p className="w-[9%]">Owned</p>
						<p className="w-[9%]">Have Read</p>
						<p className="w-[9%]">Reading list</p>
						<p className="w-[9%]"></p>
						<p />
					</div>
					{sortedBooks.map((book, i) => (
						<div
							key={book.id}
							className={`${gridClasses} ${
								i % 2 === 0 ? 'bg-emerald-50' : ''
							}`}
						>
							<Book key={book.id} book={book} refetch={refetch} />
						</div>
					))}
				</>
			)}
		</div>
	);
}
