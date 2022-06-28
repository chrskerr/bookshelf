export type Who = 'chris' | 'kate';

export interface IBook {
	id: string;
	title: string;
	isbn: string;
	isOwned: boolean;
	firstPublishedAt: Date;
	authors: Array<{ author: { id: string; name: string } }>;
	users: Array<{
		readAt: Date | null;
		readingOrder: number | null;
	}>;
	series: {
		name: string;
	} | null;
}
