import type { IBooksData } from '~/routes';

import { Link } from '@remix-run/react';

interface IProps {
	loaderData: IBooksData;
}

export default function Books({ loaderData }: IProps) {
	const { books } = loaderData;

	return (
		<div>
			<button className="button">
				<Link to="/add">Add new book</Link>
			</button>
			{books.length > 0 &&
				books.map(book => (
					<div key={book.id}>
						<p>{book.title}</p>
					</div>
				))}
		</div>
	);
}
