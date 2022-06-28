import type { LoaderFunction } from '@remix-run/node';

import { getUserIdFromParams } from '~/utils/helpers';
import { userIdCookie } from '~/utils/cookies.server';

export const loader: LoaderFunction = async ({ params }) => {
	const userId = getUserIdFromParams(params);

	return new Response(null, {
		status: 200,
		headers: {
			'Set-Cookie': await userIdCookie.serialize(userId ?? ''),
		},
	});
};
