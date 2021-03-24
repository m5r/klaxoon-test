import type { FunctionComponent } from "react";

import useBookmarks from "../hooks/useBookmarks";

const ListPage: FunctionComponent = () => {
	const { bookmarks } = useBookmarks();

	return (
		<div>
			You have {bookmarks.length} bookmarks
		</div>
	);
}

export default ListPage;
