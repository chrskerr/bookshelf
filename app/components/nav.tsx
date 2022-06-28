import type { Who } from '~/utils/types';

import type { ChangeEvent } from 'react';

interface IProps {
	userId: Who | null;
	updateUserId: (userId: string) => Promise<void>;
}

export default function Nav({ userId, updateUserId }: IProps) {
	async function handleChange(
		e: ChangeEvent<HTMLSelectElement>,
	): Promise<void> {
		updateUserId(e.target.value);
	}

	return (
		<header className="w-full border-b-2 border-b-emerald-600 pb-8 mb-8">
			<h1 className="text-4xl text-emerald-600 font-mono font-medium pb-4">
				Bookshelf
			</h1>
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
		</header>
	);
}
