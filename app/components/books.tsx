import { useState } from 'react';
import type { IBooksData } from '~/routes';
import type { Jsonify } from '~/utils/types';

import Book from './book';
import BookCard from './book-card';

interface IProps {
	loaderData: Jsonify<IBooksData>;
	shouldShowUserColumns: boolean;
	refetch: () => void;
}

enum Filters {
	ALL = 'all',
	UNREAD = 'unread',
	READ = 'read',
	READING_LIST = 'reading-list',
	LOANED = 'loaned',
}

enum Sorting {
	READING_LIST = 'reading-list',
	READING_LIST_OLDEST = 'reading-list-oldest',
	AUTHOR = 'author',
	TITLE = 'title',
	ADDED_AT = 'added-at',
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
				const aReadNext = a.users[0]?.addedToReadingListAt;
				const bReadNext = b.users[0]?.addedToReadingListAt;

				if (aReadNext && !bReadNext) return -1;
				if (bReadNext && !aReadNext) return 1;

				return sortBySeries(a, b);
			});

		case Sorting.READING_LIST_OLDEST:
			return books.sort((a, b) => {
				const aReadNext = a.users[0]?.addedToReadingListAt;
				const bReadNext = b.users[0]?.addedToReadingListAt;

				if (aReadNext && bReadNext) {
					return aReadNext.localeCompare(bReadNext);
				}

				if (aReadNext && !bReadNext) return -1;
				if (bReadNext && !aReadNext) return 1;

				return sortBySeries(a, b);
			});

		case Sorting.AUTHOR:
			return books.sort((a, b) => {
				return a.author?.name.localeCompare(b.author?.name ?? '') ?? 0;
			});

		case Sorting.TITLE:
			return books.sort((a, b) => {
				return a.title.localeCompare(b.title);
			});

		case Sorting.ADDED_AT:
			return books.sort((a, b) => {
				return b.createdAt.localeCompare(a.createdAt);
			});
	}
}

export default function Books({
	loaderData,
	refetch,
	shouldShowUserColumns,
}: IProps) {
	const { books } = loaderData;
	const [terms, setTerms] = useState('');
	const [filter, setFilter] = useState<Filters>(Filters.ALL);
	const [sort, setSort] = useState<Sorting>(Sorting.READING_LIST);

	const filterTerms = terms.toLowerCase().trim();

	const filteredBooks = books.filter(book => {
		switch (filter) {
			case Filters.ALL:
				break;
			case Filters.READ:
				if (!book.users[0]?.readAt) return false;
				break;
			case Filters.UNREAD:
				if (book.users[0]?.readAt) return false;
				break;
			case Filters.READING_LIST:
				if (!book.users[0]?.addedToReadingListAt) return false;
				break;
			case Filters.LOANED:
				if (!book.loanedTo) return false;
				break;
		}

		return filterTerms
			? book.author?.name.toLowerCase().includes(filterTerms) ||
					book.title.toLowerCase().includes(filterTerms) ||
					book.series?.name.toLowerCase().includes(filterTerms)
			: true;
	});
	const sortedBooks = sortBooks(filteredBooks, sort);

	const gridClasses = `grid ${
		shouldShowUserColumns
			? 'grid-cols-[repeat(3,4fr)_repeat(4,1fr)]'
			: 'grid-cols-[repeat(3,2fr)_repeat(2,1fr)]'
	}`;

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
						<option value={Filters.READING_LIST}>
							Reading list
						</option>
						<option value={Filters.READ}>Read</option>
						<option value={Filters.UNREAD}>Unread</option>
						<option value={Filters.LOANED}>On loan</option>
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
						<option value={Sorting.READING_LIST_OLDEST}>
							Longest on reading list
						</option>
						<option value={Sorting.AUTHOR}>Author</option>
						<option value={Sorting.TITLE}>Title</option>
						<option value={Sorting.ADDED_AT}>Date added</option>
					</select>
				</label>
			</div>

			{sortedBooks.length > 0 && (
				<>
					<div className="hidden md:block">
						<div
							className={`${gridClasses} w-full p-1 gap-x-2 sticky top-0 pb-4 font-medium text-left bg-white`}
						>
							<p className="w-[19%]">Title</p>
							<p className="w-[18%]">Author</p>
							<p className="w-[18%]">Series</p>
							<p className="w-[9%]">Book #</p>
							{shouldShowUserColumns && (
								<>
									<p className="w-[9%]">Have Read</p>
									<p className="w-[9%]">Reading list</p>
								</>
							)}
							<p className="w-[9%]"></p>
							<p />
						</div>
						{sortedBooks.map((book, i) => (
							<div
								key={book.id}
								className={`${
									i % 2 === 0 ? 'bg-emerald-50' : ''
								}`}
							>
								<Book
									book={book}
									refetch={refetch}
									shouldShowUserColumns={
										shouldShowUserColumns
									}
									gridClasses={gridClasses}
								/>
							</div>
						))}
					</div>
					<div className="md:hidden">
						{sortedBooks.map((book, i) => (
							<BookCard
								key={book.id}
								book={book}
								refetch={refetch}
								shouldShowUserColumns={shouldShowUserColumns}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}
