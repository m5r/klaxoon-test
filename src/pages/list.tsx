import type { FormEvent, FunctionComponent } from "react";
import { useState } from "react";

import useBookmarks from "../hooks/useBookmarks";

const ListPage: FunctionComponent = () => {
	const { bookmarks, removeBookmark, editBookmark, addBookmark } = useBookmarks();
	const [newBookmarkUrl, setNewBookmarkUrl] = useState("");
	const [isAddingBookmark, setIsAddingBookmark] = useState(false);

	async function onSubmit(event: FormEvent) {
		event.preventDefault();

		// TODO: validate newBookmarkUrl is a valid url
		setIsAddingBookmark(true);
		await addBookmark(newBookmarkUrl);
		setIsAddingBookmark(false);
		setNewBookmarkUrl("");
	}

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

				<form onSubmit={onSubmit}>
					<input
						type="text"
						value={newBookmarkUrl}
						onChange={(event) => setNewBookmarkUrl(event.target.value)}
					/>

					<button
						type="submit"
						disabled={isAddingBookmark}
					>Add to bookmarks</button>
				</form>
			</section>
		</div>
	);
}

export default ListPage;
