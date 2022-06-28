import type { IBook } from '~/utils/types';

import { Form, Link, useTransition } from '@remix-run/react';

interface IProps {
	book: IBook | null;
}

export default function AddEditBook({ book }: IProps) {
	const transition = useTransition();

	return (
		<div className="add-edit">
			<Form method="post">
				<fieldset disabled={transition.state === 'submitting'}>
					<div className="grid grid-cols-2 grid-flow-row gap-4">
						<input type="hidden" name="id" value={book?.id} />
						<label>
							Title:
							<input
								type="text"
								name="title"
								value={book?.title}
								required
							/>
						</label>
						<label>
							ISBN:
							<input
								type="text"
								name="isbn"
								value={book?.isbn}
								required
							/>
						</label>
						<label>
							Author:
							<input
								type="text"
								name="author"
								value={book?.authors[0]?.author.name}
								required
							/>
						</label>
						<label>
							Series:
							<input
								type="text"
								name="series"
								value={book?.series?.name}
							/>
						</label>
						<label>
							Is owned?
							<input
								type="checkbox"
								name="isOwned"
								checked={book?.isOwned}
								required
							/>
						</label>
						<label>
							Date First Published:
							<input
								type="date"
								name="firstPublishedAt"
								value={book?.firstPublishedAt.toISOString()}
								required
							/>
						</label>
					</div>
					<div className="flex mt-4">
						<button type="submit" className="button mr-4">
							{transition.state === 'submitting'
								? 'Saving...'
								: 'Save'}
						</button>
						<button className="button destructive">
							<Link to="/">Cancel</Link>
						</button>
					</div>
				</fieldset>
			</Form>
		</div>
	);
}
