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
					<ul className="divide-y divide-gray-300">
						{bookmarks.map(bookmark => {
							return (
								<li key={bookmark.id}>
									<div className="bg-white px-4 py-5 sm:px-6">
										<div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
											<div className="ml-4 mt-4">
												<div className="flex items-center">
													<div className="flex-shrink-0">
														<img className="w-16 rounded-sm" src={bookmark.thumbnail} alt={`${bookmark.title} thumbnail`} />
													</div>
													<div className="ml-4">
														<h3 className="text-lg leading-6 font-medium text-gray-900">
															{bookmark.title}
														</h3>
														<p className="text-sm text-gray-500">
															{bookmark.author}
														</p>
													</div>
												</div>
											</div>
											<div className="ml-4 mt-4 flex-shrink-0 flex">
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
											</div>
										</div>
									</div>
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
