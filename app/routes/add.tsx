import AddEditBook from '~/components/add-edit';

export default function Add() {
	return <AddEditBook book={null} />;
}

export { action } from '~/utils/update-book-action.server';
