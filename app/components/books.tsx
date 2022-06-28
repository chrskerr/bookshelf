import type { IBooksData } from '~/routes';

interface IProps {
	loaderData: IBooksData;
}

export default function Books({ loaderData }: IProps) {
	const { books } = loaderData;

	console.log(loaderData);

	return <div>{books.length > 0 && <div>Books!</div>}</div>;
}
