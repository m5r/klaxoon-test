import localForage from "localforage";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Bookmark from "../models/bookmark";

export default function useBookmarks() {
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
	const history = useHistory();

	useEffect(() => {
		// TODO: save bookmarks to context to avoid refetching them from localstorage every time the hook is called
		// initialize state
		(async () => {
			const bookmarksFromStorage = await localForage.getItem<Bookmark[]>("bookmarks");
			if (!bookmarksFromStorage) {
				return;
			}

			setBookmarks(bookmarksFromStorage);
		})();
	}, []);

	function editBookmark(bookmarkId: Bookmark["id"]) {
		return history.push(`/edit/${bookmarkId}`);
	}

	function addBookmark(bookmarkUrl: Bookmark["url"]) {
		// fetch data from noembed
		const author = "author";
		const title = "title";

		const bookmark = new Bookmark({
			url: bookmarkUrl,
			author,
			title,
		});

		const nextBookmarks = [bookmark, ...bookmarks];
		setBookmarks(nextBookmarks);
		localForage.setItem("bookmarks", nextBookmarks)
			.catch(error => {
				// we should probably set up a retry strategy to save the data
				console.error(error);
			});
	}

	function removeBookmark(bookmarkId: Bookmark["id"]) {
		const nextBookmarks = bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
		setBookmarks(nextBookmarks);
		localForage.setItem("bookmarks", nextBookmarks)
			.catch(error => {
				// we should probably set up a retry strategy to save the data
				console.error(error);
			});
	}

	return {
		bookmarks,
		editBookmark,
		addBookmark,
		removeBookmark,
	};
}
