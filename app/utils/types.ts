export type Who = 'chris' | 'kate';

export interface IBook {
	id: string;
	title: string;
	bookNumber: number;
	author: { id: string; name: string } | null;
	users: Array<{
		userId: string;
		readAt: Date | null;
		readNext: boolean;
	}>;
	series: {
		name: string;
	} | null;
}

export type Jsonify<T> = T extends { toJSON(): infer U }
	? U
	: T extends object
	? {
			[k in keyof T]: Jsonify<T[k]>;
	  }
	: T;
