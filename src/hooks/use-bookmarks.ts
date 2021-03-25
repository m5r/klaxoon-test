import localForage from "localforage";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import Bookmark from "../models/bookmark";
import { BookmarksContext } from "../contexts/bookmarks-context";

type NoEmbedResponse = {
	url: string;
	video_id: number;
	thumbnail_height: number;
	version: string;
	duration: number;
	author_name: string;
	is_plus: string;
	thumbnail_width: number;
	type: string;
	provider_name: string;
	description: string;
	provider_url: string;
	width: number;
	height: number;
	account_type: string;
	html: string;
	title: string;
	upload_date: string;
	thumbnail_url: string;
	thumbnail_url_with_play_button: string;
	author_url: string;
	uri: string;
};

export default function useBookmarks() {
	const { isInitialized, bookmarks, setBookmarks } = useContext(BookmarksContext);
	const history = useHistory();

	function editBookmark(bookmarkId: Bookmark["id"]) {
		return history.push(`/edit/${bookmarkId}`);
	}

	async function addBookmark(bookmarkUrl: Bookmark["url"]) {
		const response = await fetch(`https://noembed.com/embed?url=${bookmarkUrl}`);
		const bookmarkMetadata: NoEmbedResponse = await response.json();
		console.log("bookmarkMetadata", bookmarkMetadata);
		const thumbnail = bookmarkMetadata.thumbnail_url;
		const author = bookmarkMetadata.author_name;
		const title = bookmarkMetadata.title;

		// TODO: VideoBookmark / PictureBookmark
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
