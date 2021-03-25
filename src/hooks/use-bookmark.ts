 import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

 import type Bookmark from "../models/bookmark";
import useBookmarks from "./use-bookmarks";

export default function useBookmark(bookmarkId: Bookmark["id"]) {
	const { isInitialized, bookmarks, removeBookmark, editBookmarkKeywords } = useBookmarks();
	const [bookmark, setBookmark] = useState<Bookmark | null>(null);
	const history = useHistory();

	useEffect(() => {
		// initialize state
		if (!isInitialized) {
			return;
		}

		const foundBookmark = bookmarks.find(bookmark => bookmark.id === bookmarkId);
		if (!foundBookmark) {
			return history.push("/list");
		}

		setBookmark(foundBookmark);
	}, [isInitialized]);

	function updateKeywords(keywords: string[]) {
		const keywordsSet = new Set(keywords);
		editBookmarkKeywords(bookmarkId, keywordsSet);
	}

	function deleteBookmark() {
		removeBookmark(bookmarkId);
	}

	return {
		bookmark,
		deleteBookmark,
		updateKeywords,
	};
}
