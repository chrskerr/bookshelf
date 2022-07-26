import { Grid, _ } from 'gridjs-react';

import type { IBooksData } from '~/routes';
import type { IMarkBookRead } from '~/routes/api/mark-book-read';
import type { IMarkBookReadNext } from '~/routes/api/mark-book-read-next';
import type { Jsonify } from '~/utils/types';

interface IProps {
	loaderData: Jsonify<IBooksData>;
	refetch: () => void;
}

type IsReadCell = { id: string; isRead: boolean };
type IsReadNextCell = { id: string; isReadNext: boolean };

export default function Books({ loaderData, refetch }: IProps) {
	const { books } = loaderData;

	async function markAsRead(book: IsReadCell) {
		const body: IMarkBookRead = {
			bookId: book.id,
			isRead: !book.isRead,
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

	async function markAsReadNext(book: IsReadNextCell) {
		const body: IMarkBookReadNext = {
			bookId: book.id,
			isReadNext: !book.isReadNext,
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
		<div className="w-full">
			<Grid
				sort={{ multiColumn: true }}
				search
				resizable
				data={books
					.map(book => ({
						id: book.id,
						title: book.title,
						authorName: book.author?.name ?? 'missing',
						seriesName: book.series?.name ?? '',
						bookNumber: book.series?.name ? book.bookNumber : '',
						isOwned: book.isOwned ? 'yes' : 'no',
						isRead: {
							id: book.id,
							isRead: !!book.users[0]?.readAt,
						},
						isReadNext: {
							id: book.id,
							isReadNext: !!book.users[0]?.readNext,
						},
					}))
					.sort((a, b) => {
						if (a.isReadNext && !b.isReadNext) return -1;
						if (b.isReadNext && !a.isReadNext) return 1;
						return 0;
					})}
				columns={[
					{ name: 'id', hidden: true },
					{ name: 'title' },
					{ name: 'authorName' },
					{ name: 'seriesName' },
					{ name: 'bookNumber' },
					{ name: 'isOwned' },
					{
						name: 'isRead',
						formatter: (cell: IsReadCell) => {
							return _(
								<input
									type="checkbox"
									defaultChecked={cell.isRead}
									onClick={() => markAsRead(cell)}
								/>,
							);
						},
						sort: {
							compare: (a: IsReadCell, b: IsReadCell) => {
								if (a.isRead && !b.isRead) return -1;
								if (b.isRead && !a.isRead) return 1;
								return 0;
							},
						},
					},
					{
						name: 'isReadNext',
						formatter: (cell: IsReadNextCell) => {
							return _(
								<input
									type="checkbox"
									defaultChecked={cell.isReadNext}
									onClick={() => markAsReadNext(cell)}
								/>,
							);
						},
						sort: {
							compare: (a: IsReadNextCell, b: IsReadNextCell) => {
								if (a.isReadNext && !b.isReadNext) return -1;
								if (b.isReadNext && !a.isReadNext) return 1;
								return 0;
							},
						},
					},
				]}
			/>
		</div>
	);
}
