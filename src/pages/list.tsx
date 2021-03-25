import type { FunctionComponent } from "react";

import useBookmarks from "../hooks/use-bookmarks";

import Divider from "../components/divider";
import AddBookmarkForm from "../components/add-bookmark-form";
import EditIcon from "../components/edit-icon";
import DeleteIcon from "../components/delete-icon";

const ListPage: FunctionComponent = () => {
	const { bookmarks, removeBookmark, editBookmark, isInitialized } = useBookmarks();

	if (!isInitialized) {
		return (
			<div>
				Loading your bookmarks
			</div>
		);
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
									<span className="relative z-0 inline-flex shadow-sm rounded-md">
										<button
											onClick={() => editBookmark(bookmark.id)}
											type="button"
											className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
										>
											<EditIcon />
											<span className="ml-2">Edit</span>
										</button>
										<button
											onClick={() => removeBookmark(bookmark.id)}
											type="button"
											className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
										>
											<DeleteIcon />
											<span className="ml-2">Delete</span>
										</button>
									</span>
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
};

export default ListPage;
