import useBookmarks from "./use-bookmarks";

type Params = {
	page: number;
	amountPerPage?: number;
}

export default function usePaginatedBookmarks({ page, amountPerPage = 3 }: Params) {
	const { bookmarks } = useBookmarks();

	const paginatedBookmarks = bookmarks.slice((page - 1) * amountPerPage, (page * amountPerPage));
	const canPaginate = bookmarks.length > amountPerPage;

	let previousPage: number | null;
	let nextPage: number | null;
	if (canPaginate) {
		previousPage = page > 1 ? page - 1. : null;

		const hasMorePages = (bookmarks.length - (page * amountPerPage)) > 0;
		nextPage = hasMorePages ? page + 1 : null;
	} else {
		previousPage = null;
		nextPage = null;
	}

	return {
		bookmarks: paginatedBookmarks,
		previousPage,
		nextPage,
	}
}
