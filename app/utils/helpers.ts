import type { Params } from '@remix-run/react';

export function getUserIdFromParams(
	params: Readonly<Params<string>>,
): string | null {
	return params.userId === 'chris' || params.userId === 'kate'
		? params.userId
		: null;
}
