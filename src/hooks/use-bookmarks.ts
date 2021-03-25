import localForage from "localforage";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import Bookmark from "../models/bookmark";
import { BookmarksContext } from "../contexts/bookmarks-context";

export default function useBookmarks() {
	const { isInitialized, bookmarks, setBookmarks } = useContext(BookmarksContext);
	const history = useHistory();

	function editBookmark(bookmarkId: Bookmark["id"]) {
		return history.push(`/edit/${bookmarkId}`);
	}

	async function addBookmark(bookmarkUrl: Bookmark["url"]) {
		// fetch data from noembed
		const thumbnail = "thumbnail";
		const author = "author";
		const title = "title";

		const bookmark = new Bookmark({
			url: bookmarkUrl,
			thumbnail,
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
		isInitialized,
		bookmarks,
		editBookmark,
		addBookmark,
		removeBookmark,
	};
}
