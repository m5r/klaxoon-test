import localForage from "localforage";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import Bookmark from "../models/bookmark";
import VideoBookmark from "../models/video-bookmark";
import PictureBookmark from "../models/picture-bookmark";
import { BookmarksContext } from "../contexts/bookmarks-context";

export default function useBookmarks() {
	const { isInitialized, bookmarks, updateBookmarks } = useContext(BookmarksContext);
	const history = useHistory();

	function openEditBookmark(bookmarkId: Bookmark["id"]) {
		return history.push(`/edit/${bookmarkId}`);
	}

	async function addBookmark(bookmarkUrl: Bookmark["url"]) {
		const isUrlAlreadyBookmarked = Boolean(bookmarks.find(bookmark => bookmark.url === bookmarkUrl));
		if (isUrlAlreadyBookmarked) {
			throw new Error("URL is already bookmarked");
		}

		const response = await fetch(`https://noembed.com/embed?url=${bookmarkUrl}`);
		const bookmarkMetadata: NoEmbedResponse = await response.json();
		console.log("bookmarkMetadata", bookmarkMetadata);

		const bookmark = makeBookmark(bookmarkMetadata);

		const nextBookmarks = [bookmark, ...bookmarks];
		updateBookmarks(nextBookmarks);
	}

	function removeBookmark(bookmarkId: Bookmark["id"]) {
		const nextBookmarks = bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
		updateBookmarks(nextBookmarks);
	}

	function editBookmarkKeywords(bookmarkId: Bookmark["id"], keywords: Set<string>) {
		const nextBookmarks = bookmarks.map(bookmark => {
			if (bookmark.id !== bookmarkId) {
				return bookmark;
			}

			console.log("bookmark", bookmark);
			bookmark.updateKeywords(keywords);
			return bookmark;
		});
		updateBookmarks(nextBookmarks);
	}

	return {
		isInitialized,
		bookmarks,
		openEditBookmark,
		addBookmark,
		removeBookmark,
		editBookmarkKeywords,
	};
}

function makeBookmark(bookmarkMetadata: NoEmbedResponse): Bookmark {
	const thumbnail = bookmarkMetadata.thumbnail_url;
	const author = bookmarkMetadata.author_name;
	const title = bookmarkMetadata.title;
	const url = bookmarkMetadata.url;

	const height = bookmarkMetadata.height;
	const width = bookmarkMetadata.width;

	if (isVideoResponse(bookmarkMetadata)) {
		const duration = bookmarkMetadata.duration;

		return new VideoBookmark({
			thumbnail,
			author,
			title,
			url,
			height,
			width,
			duration,
		});
	}

	if (isPhotoResponse(bookmarkMetadata)) {
		return new PictureBookmark({
			thumbnail,
			author,
			title,
			url,
			height,
			width,
		});
	}

	return new Bookmark({
		thumbnail,
		author,
		title,
		url,
	});
}

function isVideoResponse(response: NoEmbedResponse): response is NoEmbedVideoResponse {
	return response.type === "video";
}

function isPhotoResponse(response: NoEmbedResponse): response is NoEmbedPhotoResponse {
	return response.type === "photo";
}

type NoEmbedVideoResponse = {
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

type NoEmbedPhotoResponse = {
	version: string;
	thumbnail_height: number;
	web_page: string;
	media_url: string;
	url: string;
	type: string;
	flickr_type: string;
	thumbnail_width: number;
	cache_age: number;
	author_name: string;
	title: string;
	html: string;
	height: number;
	license_id: number;
	provider_url: string;
	width: number;
	license: string;
	provider_name: string;
	author_url: string;
	thumbnail_url: string;
	web_page_short_url: string;
};

type NoEmbedResponse = NoEmbedVideoResponse | NoEmbedPhotoResponse;
