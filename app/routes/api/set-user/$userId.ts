import type { LoaderFunction } from '@remix-run/node';

import { getUserIdFromParams } from '~/utils/helpers';
import { getUserCookie, setUserCookie } from '~/utils/cookies.server';

export const loader: LoaderFunction = async ({ request, params }) => {
	const userId = getUserIdFromParams(params);
	const existingCookie = await getUserCookie(request);

	return new Response(null, {
		status: 200,
		headers: {
			'Set-Cookie': await setUserCookie({
				userId,
				isAuthenticated: existingCookie?.isAuthenticated ?? false,
			}),
		},
	});
};
