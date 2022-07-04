import type { ChangeEvent } from 'react';
import { Link } from '@remix-run/react';

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

	return (
		<header className="flex items-end justify-between w-full pb-8 mb-8 border-b-2 border-b-emerald-600">
			<div>
				<Link
					to="/"
					className="inline-block mb-4 font-mono text-4xl font-medium text-emerald-600"
				>
					Bookshelf
				</Link>
				<div className="text-xl">
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
			<button className="button">
				<Link to="/add">Add new book</Link>
			</button>
		</header>
	);
}
