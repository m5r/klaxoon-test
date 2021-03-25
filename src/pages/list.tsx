import type { FormEvent, FunctionComponent } from "react";
import { useState } from "react";

import useBookmarks from "../hooks/use-bookmarks";
import WarningIcon from "../components/warning-icon";

const ListPage: FunctionComponent = () => {
	const { bookmarks, removeBookmark, editBookmark, addBookmark } = useBookmarks();
	const [newBookmarkUrl, setNewBookmarkUrl] = useState("");
	const [isAddingBookmark, setIsAddingBookmark] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const isError = errorMessage !== "";

	async function onSubmit(event: FormEvent) {
		event.preventDefault();

		try {
			new URL(newBookmarkUrl);
			setErrorMessage("");
		} catch (error) {
			setErrorMessage("Please submit a valid url");
			return;
		}

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

				<div className="relative py-4">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-300" />
					</div>
				</div>

				<form onSubmit={onSubmit}>
					<div className="flex items-center gap-x-3">
						<div className="flex-1 relative">
							<label htmlFor="new-bookmark-url" className="block text-sm font-medium text-gray-700">
								URL you want to bookmark
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="new-bookmark-url"
									id="new-bookmark-url"
									className={`
									shadow-sm block w-full sm:text-sm rounded-sm
									${isError ? "border-red-400 text-red-900 placeholder-red-400" : "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"}
									`}
									placeholder="https://vimeo.com/145743834"
									value={newBookmarkUrl}
									onChange={(event) => setNewBookmarkUrl(event.target.value)}
								/>
							</div>
							{isError ? (
								<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
									<WarningIcon />
								</div>
							) : null}
							<p className="mt-2 text-sm text-red-600">
								&nbsp;
								{isError ? errorMessage : ""}
							</p>
						</div>

						<button
							type="submit"
							className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-sm shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2
						${isAddingBookmark ? "cursor-not-allowed bg-indigo-400" : "cursor-pointer bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"}`}
							disabled={isAddingBookmark}
						>
							Add to bookmarks
						</button>
					</div>
				</form>
			</section>
		</div>
	);
}

export default ListPage;
