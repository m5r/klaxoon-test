import type { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import TagInput from "@pathofdev/react-tag-input";

import useBookmark from "../hooks/use-bookmark";

type Params = {
	bookmarkId: string;
}

const EditPage: FunctionComponent = () => {
	const { bookmarkId } = useParams<Params>();
	const { bookmark, updateKeywords } = useBookmark(bookmarkId);

	if (!bookmark) {
		return (
			<div>
				Loading bookmark
			</div>
		)
	}

	return (
		<div>
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
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditPage;
