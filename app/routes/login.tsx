import type { ActionFunction } from '@remix-run/node';

import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { getUserCookie, setUserCookie } from '~/utils/cookies.server';

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const password = formData.get('password');

	const isAuthenticated = !!password && password === process.env.PASSWORD;

	const existingCookie = await getUserCookie(request);
	const res = redirect('/');
	res.headers.set(
		'Set-Cookie',
		await setUserCookie({ ...existingCookie, isAuthenticated }),
	);

	return res;
};

export default function Login() {
	return (
		<div>
			<h2 className="mb-4 text-xl">Login</h2>
			<Form
				method="post"
				className="grid items-center grid-cols-2 gap-4 justify-items-start"
			>
				<label className="label">
					Password:
					<input
						className="w-full"
						type="password"
						name="password"
						required
					/>
				</label>
				<button className="button" type="submit">
					Submit
				</button>
			</Form>
		</div>
	);
}
