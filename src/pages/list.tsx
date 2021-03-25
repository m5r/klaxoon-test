import type { FunctionComponent } from "react";

import useBookmarks from "../hooks/use-bookmarks";

import Divider from "../components/divider";
import AddBookmarkForm from "../components/add-bookmark-form";

const ListPage: FunctionComponent = () => {
	const { bookmarks, removeBookmark, editBookmark } = useBookmarks();

	return (
		<div>
			<h3>You have {bookmarks.length} bookmarks</h3>

			<section>
				{bookmarks.length > 0 ? (
					<ul>
						{bookmarks.map(bookmark => {
							return (
								<li key={bookmark.id}>
									<img src={bookmark.thumbnail} alt={`${bookmark.title} thumbnail`} />
									<span>{bookmark.title}</span>
									<button onClick={() => editBookmark(bookmark.id)}>Edit</button>
									<button onClick={() => removeBookmark(bookmark.id)}>Delete</button>
								</li>
							);
						})}
					</ul>
				) : (
					<p>You have no bookmark yet</p>
				)}

				<Divider />

				<AddBookmarkForm />
			</section>
		</div>
	);
}

export default ListPage;
