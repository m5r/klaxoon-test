import type { FunctionComponent } from "react";
import { createContext, useEffect, useState } from "react";
import localForage from "localforage";

import Bookmark, { BookmarkType } from "../models/bookmark";
import VideoBookmark from "../models/video-bookmark";
import PictureBookmark from "../models/picture-bookmark";

type Context = {
	isInitialized: boolean;
	bookmarks: Bookmark[];
	updateBookmarks: (nextBookmarks: Bookmark[]) => void;
}

export const BookmarksContext = createContext<Context>(null as any);

export const BookmarksProvider: FunctionComponent = ({ children }) => {
	const [isInitialized, setIsInitialized] = useState(false);
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
	const context: Context = {
		bookmarks,
		updateBookmarks,
		isInitialized,
	};

	function updateBookmarks(nextBookmarks: Bookmark[]) {
		setBookmarks(nextBookmarks);

		const serializedBookmarks = nextBookmarks.map(bookmark => ({
			...bookmark,
			keywords: Array.from(bookmark.keywords),
		}));
		localForage.setItem("bookmarks", serializedBookmarks)
			.catch(error => {
				// we should probably set up a retry strategy to save the data
				console.error(error);
			});
	}

	useEffect(() => {
		// initialize state from local storage
		(async () => {
			const serializedBookmarks = await localForage.getItem<Bookmark[]>("bookmarks");
			if (!serializedBookmarks) {
				setIsInitialized(true);
				return;
			}

			const instantiatedBookmarks = serializedBookmarks.map(bookmark => deserializeBookmark(bookmark));

			setBookmarks(instantiatedBookmarks);
			setIsInitialized(true);
		})();
	}, []);

	return (
		<BookmarksContext.Provider value={context}>
			{children}
		</BookmarksContext.Provider>
	);
};


export function deserializeBookmark(bookmarkMetadata: Bookmark) {
	const constructors: Record<BookmarkType, typeof Bookmark> = {
		link: Bookmark,
		video: VideoBookmark,
		picture: PictureBookmark,
	};
	const bookmarkWithSerializedKeywords = {
		...bookmarkMetadata,
		keywords: new Set(bookmarkMetadata.keywords),
	};

	return new constructors[bookmarkMetadata.type](bookmarkWithSerializedKeywords);
}
