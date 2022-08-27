import type { ChangeEvent } from 'react';
import { Link, useLocation } from '@remix-run/react';

interface IProps {
	userId: string | null;
	updateUserId: (userId: string) => Promise<void>;
}

export default function Nav({ userId, updateUserId }: IProps) {
	async function handleChange(
		e: ChangeEvent<HTMLSelectElement>,
	): Promise<void> {
		updateUserId(e.target.value);
	}

	const location = useLocation();

	return (
		<header className="flex flex-col items-start w-full pb-8 mb-8 border-b-2 md:justify-between md:items-end md:flex-row border-b-emerald-600">
			<div>
				<Link
					to="/"
					className="inline-block mb-4 text-4xl font-medium text-emerald-600"
				>
					Bookshelf
				</Link>
				<div className="mb-2 text-xl mb:mb-0">
					<label htmlFor="userId">Who are you?</label>
					<select
						id="userId"
						value={userId ?? 'none'}
						onChange={handleChange}
						className="ml-2"
					>
						<option disabled value="none">
							Please choose
						</option>
						<option value="kate">Kate</option>
						<option value="chris">Chris</option>
					</select>
				</div>
			</div>
			{location.pathname === '/' && (
				<button className="button">
					<Link to="/add">Add new book</Link>
				</button>
			)}
		</header>
	);
}
