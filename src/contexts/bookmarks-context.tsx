import type { Dispatch, FunctionComponent, SetStateAction } from "react";
import { createContext, useEffect, useState } from "react";
import localForage from "localforage";

import Bookmark, { BookmarkType } from "../models/bookmark";
import VideoBookmark from "../models/video-bookmark";
import PictureBookmark from "../models/picture-bookmark";

type Context = {
	isInitialized: boolean;
	bookmarks: Bookmark[];
	setBookmarks: Dispatch<SetStateAction<Bookmark[]>>;
}

export const BookmarksContext = createContext<Context>(null as any);

export const BookmarksProvider: FunctionComponent = ({ children }) => {
	const [isInitialized, setIsInitialized] = useState(false);
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
	const context: Context = {
		bookmarks,
		setBookmarks,
		isInitialized,
	};

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

	return new constructors[bookmarkMetadata.type](bookmarkMetadata);
}