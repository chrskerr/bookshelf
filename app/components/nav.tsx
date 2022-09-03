import type { ChangeEvent } from 'react';
import { Link, useLocation } from '@remix-run/react';

interface IProps {
	userId: string | null;
	updateUserId: (userId: string) => Promise<void>;
}

const linksMap: Array<{ href: `/${string}`; label: string }> = [
	{ href: '/', label: 'Library' },
	{ href: '/wishlist', label: 'Wishlist' },
	{ href: '/add', label: 'Add' },
];

export default function Nav({ userId, updateUserId }: IProps) {
	async function handleChange(
		e: ChangeEvent<HTMLSelectElement>,
	): Promise<void> {
		updateUserId(e.target.value);
	}

	const { pathname } = useLocation();

	return (
		<header className="flex flex-col items-start w-full pb-4 mb-8 border-b-2 md:pb-8 md:justify-between md:items-end md:flex-row border-b-emerald-600">
			<div className="pb-2 md:pb-0">
				<Link
					to="/"
					className="inline-block mb-4 text-4xl font-medium text-emerald-600"
				>
					Bookshelf
				</Link>
				<div className="mb-2 mb:mb-0">
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
			<div className="flex">
				{linksMap.map(({ href, label }) => (
					<Link
						key={href}
						to={href}
						className={`width-[75px] mr-4 hover:text-emerald-600 hover:underline ${
							pathname === href
								? 'text-emerald-600 underline'
								: ''
						}`}
					>
						{label}
					</Link>
				))}
			</div>
		</header>
	);
}
