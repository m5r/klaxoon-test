import React from "react";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import localForage from "localforage";

import ListPage from "../../pages/list";
import { BookmarksProvider } from "../../contexts/bookmarks-context";
import type Bookmark from "../../models/bookmark";

jest.mock("localforage", () => ({
	__esModule: true,
	default: ({
		getItem: jest.fn(),
	}),
}));

describe("/list page", () => {
	const mockedGetItem = localForage.getItem as any as jest.Mock<Promise<Bookmark[]>>;
	mockedGetItem.mockResolvedValue([]);

	const wrapper = BookmarksProvider;

	test("renders list of bookmarks", async () => {
		// test keeps failing because of asynchronous stuff happening in <BookmarksProvider />

		render(<ListPage />, { wrapper });
		expect(screen.getByText("Loading your bookmarks")).toBeInTheDocument()
		await waitForElementToBeRemoved(screen.getByText("Loading your bookmarks"));
		await waitFor(() => expect(screen.getByText("You have 0 bookmarks")).toBeInTheDocument());
	});
});
