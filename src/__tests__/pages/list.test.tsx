import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import ListPage from "../../pages/list";
import { BookmarksProvider } from "../../contexts/bookmarks-context";

describe("/list page", () => {
	const wrapper = BookmarksProvider;

	test("renders list of bookmarks", async () => {
		render(<ListPage />, { wrapper });
		const bookmarkCountElement = screen.getByText("You have 0 bookmarks");
		await waitFor(() => expect(bookmarkCountElement).toBeInTheDocument());
	});
});
