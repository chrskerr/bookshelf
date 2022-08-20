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
	READING_LIST = 'reading-list',
}

enum Sorting {
	READING_LIST = 'reading-list',
	SERIES_THEN_AUTHOR = 'series-then-author',
	AUTHOR = 'author',
	TITLE = 'title',
}

type IBook = IProps['loaderData']['books'][0];

function sortBySeries(a: IBook, b: IBook): number {
	if (!a.series || !b.series) {
		return a.author?.name.localeCompare(b.author?.name ?? '') ?? 0;
	}

	if (a.series.name === b.series.name) {
		return a.bookNumber - b.bookNumber;
	}

	return a.series.name.localeCompare(b.series.name);
}

function sortBooks(books: IBook[], sort: Sorting): IBook[] {
	switch (sort) {
		case Sorting.READING_LIST:
			return books.sort((a, b) => {
				const aReadNext = !!a.users[0]?.readNext;
				const bReadNext = !!b.users[0]?.readNext;

				if (aReadNext && !bReadNext) return -1;
				if (bReadNext && !aReadNext) return 1;

				return sortBySeries(a, b);
			});

		case Sorting.SERIES_THEN_AUTHOR:
			return books.sort(sortBySeries);

		case Sorting.AUTHOR:
			return books.sort((a, b) => {
				return a.author?.name.localeCompare(b.author?.name ?? '') ?? 0;
			});

		case Sorting.TITLE:
			return books.sort((a, b) => {
				return a.title.localeCompare(b.title);
			});

		default:
			return books;
	}
}

export default function Books({ loaderData, refetch }: IProps) {
	const { books } = loaderData;
	const [terms, setTerms] = useState('');
	const [filter, setFilter] = useState<Filters>(Filters.ALL);
	const [sort, setSort] = useState<Sorting>(Sorting.READING_LIST);

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
						case Filters.READING_LIST:
							if (book.users[0]?.readNext) return true;
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

	const sortedBooks = sortBooks(filteredBooks, sort);

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
						<option value={Filters.READING_LIST}>
							Reading list
						</option>
						<option value={Filters.READ}>Read</option>
						<option value={Filters.UNREAD}>Unread</option>
					</select>
				</label>
				<label className="my-4 label">
					Sort:
					<select
						value={sort}
						onChange={e => setSort(e.target.value as Sorting)}
					>
						<option value={Sorting.READING_LIST}>
							Reading list
						</option>
						<option value={Sorting.SERIES_THEN_AUTHOR}>
							Author &amp; Series
						</option>
						<option value={Sorting.AUTHOR}>Author</option>
						<option value={Sorting.TITLE}>Title</option>
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
