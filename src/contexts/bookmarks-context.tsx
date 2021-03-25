import type { Dispatch, FunctionComponent, SetStateAction } from "react";
import { createContext, useEffect, useState } from "react";

import Bookmark from "../models/bookmark";
import localForage from "localforage";

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
			const bookmarksFromStorage = await localForage.getItem<Bookmark[]>("bookmarks");
			if (!bookmarksFromStorage) {
				setIsInitialized(true);
				return;
			}

			setBookmarks(bookmarksFromStorage);
			setIsInitialized(true);
		})();
	}, []);

	return (
		<BookmarksContext.Provider value={context}>
			{children}
		</BookmarksContext.Provider>
	)
}