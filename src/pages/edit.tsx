import type { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import TagInput from "@pathofdev/react-tag-input";

import useBookmark from "../hooks/use-bookmark";

import DeleteIcon from "../components/delete-icon";

type Params = {
	bookmarkId: string;
}

const EditPage: FunctionComponent = () => {
	const { bookmarkId } = useParams<Params>();
	const { bookmark, updateKeywords, deleteBookmark } = useBookmark(bookmarkId);

	if (!bookmark) {
		return (
			<div>
				Loading bookmark
			</div>
		)
	}

	return (
		<div>
			<div className="py-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
				<h3 className="text-lg leading-6 font-medium text-gray-900">
					Editing <i>{bookmark.title}</i>
				</h3>
				<div className="mt-3 flex sm:mt-0 sm:ml-4">
					<button
						onClick={() => deleteBookmark()}
						type="button"
						style={{ lineHeight: 1 }}
						className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto"
					>
						<DeleteIcon />
						<span className="ml-2">Delete</span>
					</button>
				</div>
			</div>

			<div className="ml-4 mt-4">
				<div className="flex items-center">
					<div className="flex-shrink-0">
						<img className="w-16 rounded-sm" src={bookmark.thumbnail}
							 alt={`${bookmark.title} thumbnail`} />
					</div>
					<div className="ml-4">
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							{bookmark.title}
						</h3>
						<p className="text-sm text-gray-500">
							{bookmark.author}
						</p>
						<TagInput
							tags={Array.from(bookmark.keywords)}
							onChange={keywords => updateKeywords(keywords)}
							placeholder="Add keywords here"
							editable={true}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditPage;
