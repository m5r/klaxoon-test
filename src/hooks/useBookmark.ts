 import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Bookmark from "../models/bookmark";
import useBookmarks from "./useBookmarks";

export default function useBookmark(bookmarkId: Bookmark["id"]) {
	const { bookmarks, removeBookmark } = useBookmarks();
	const [bookmark, setBookmark] = useState<Bookmark | null>(null);
	const history = useHistory();

	useEffect(() => {
		// initialize state
		const foundBookmark = bookmarks.find(bookmark => bookmark.id === bookmarkId);
		if (!foundBookmark) {
			return history.push("/list");
		}

		setBookmark(foundBookmark);
	}, [bookmarks]);

	function deleteBookmark() {
		removeBookmark(bookmarkId);
	}

	return {
		bookmark,
		deleteBookmark,
	};
}
