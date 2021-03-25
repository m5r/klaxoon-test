import type { FunctionComponent } from "react";

import useBookmarks from "../hooks/use-bookmarks";

import Divider from "../components/divider";
import AddBookmarkForm from "../components/add-bookmark-form";
import BookmarksList from "../components/bookmarks-list";

const ListPage: FunctionComponent = () => {
	const { bookmarks, isInitialized } = useBookmarks();

	if (!isInitialized) {
		return (
			<div>
				Loading your bookmarks
			</div>
		);
	}

	return (
		<div className="py-4">
			<h3>You have {bookmarks.length} bookmarks</h3>

			<section className="pt-8">
				<AddBookmarkForm />

				<Divider />

				<BookmarksList />
			</section>
		</div>
	);
};

export default ListPage;
