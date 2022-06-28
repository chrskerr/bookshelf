import type { IBooksData } from '~/routes';

import { Link } from '@remix-run/react';

interface IProps {
	loaderData: IBooksData;
}

export default function Books({ loaderData }: IProps) {
	const { books } = loaderData;

	console.log(loaderData);

	return (
		<div>
			<button className="button">
				<Link to="/add">Add new book</Link>
			</button>
			{books.length > 0 && <div>Books!</div>}
		</div>
	);
}
