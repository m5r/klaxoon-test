import useBookmarks from "./use-bookmarks";

type Params = {
	page: number;
	amountPerPage?: number;
}

export default function usePaginatedBookmarks({ page, amountPerPage = 3 }: Params) {
	const { bookmarks } = useBookmarks();

	const paginatedBookmarks = bookmarks.slice((page - 1) * amountPerPage, (page * amountPerPage));

	const lastPage = Math.ceil(bookmarks.length / amountPerPage);
	let previousPage: number | null;
	let nextPage: number | null;

	const canPaginate = bookmarks.length > amountPerPage;
	if (canPaginate) {
		previousPage = page > 1 ? page - 1. : null;

		const hasMorePages = (bookmarks.length - (page * amountPerPage)) > 0;
		nextPage = hasMorePages ? page + 1 : null;
	} else {
		previousPage = null;
		nextPage = null;
	}

	const allPages = Array(lastPage).fill(0).map((_, index) => index + 1);

	return {
		bookmarks: paginatedBookmarks,
		previousPage,
		nextPage,
		allPages,
	}
}
