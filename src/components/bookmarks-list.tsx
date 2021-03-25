import { Link, useParams } from "react-router-dom";

import useBookmarks from "../hooks/use-bookmarks";
import usePaginatedBookmarks from "../hooks/use-paginated-bookmarks";

import EditIcon from "./edit-icon";
import DeleteIcon from "./delete-icon";
import ArrowLeftIcon from "./arrow-left-icon";
import ArrowRightIcon from "./arrow-right-icon";

type Params = {
	page: string;
}

export default function BookmarksList() {
	const { page } = useParams<Params>();
	const currentPage = Number.parseInt(page, 10);
	const { removeBookmark, editBookmark } = useBookmarks();
	const {
		bookmarks,
		previousPage,
		nextPage,
		allPages,
	} = usePaginatedBookmarks({ page: currentPage });

	if (bookmarks.length === 0) {
		return (
			<p>You have no bookmark yet</p>
		);
	}

	return (
		<>
			<ul className="divide-y divide-gray-300">
				{bookmarks.map(bookmark => {
					return (
						<li key={bookmark.id}>
							<div className="bg-white py-5">
								<div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
									<div className="ml-4 mt-4">
										<div className="flex items-center">
											<a href={bookmark.url}>
												<div className="flex-shrink-0">
													<img className="w-16 rounded-sm" src={bookmark.thumbnail}
														 alt={`${bookmark.title} thumbnail`} />
												</div>
											</a>
											<div className="ml-4">
												<a href={bookmark.url}>
													<h3 className="text-lg leading-6 font-medium text-gray-900">
														{bookmark.title}
													</h3>
												</a>
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

			<nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
				<div className="-mt-px w-0 flex-1 flex">
					<Link
						to={previousPage ? `/list/${previousPage}` : `/list/${currentPage}`}
						className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
					>
						<ArrowLeftIcon />
						Previous
					</Link>
				</div>
				<div className="hidden md:-mt-px md:flex">
					{allPages.map((pageNumber) => {
						return (
							<Link
								to={`/list/${pageNumber}`}
								className={`
								${currentPage === pageNumber ?
									"border-indigo-500 text-indigo-600" :
									"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
								border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium
								`}
							>
								{pageNumber}
							</Link>
						)
					})}
				</div>
				<div className="-mt-px w-0 flex-1 flex justify-end">
					<Link
						to={nextPage ? `/list/${nextPage}` : `/list/${currentPage}`}
						className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
					>
						Next
						<ArrowRightIcon />
					</Link>
				</div>
			</nav>
		</>
	);
}
