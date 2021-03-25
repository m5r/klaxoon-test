import type { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

import useBookmark from "../hooks/use-bookmark";

type Params = {
	bookmarkId: string;
}

const EditPage: FunctionComponent = () => {
	const { bookmarkId } = useParams<Params>();
	const { bookmark } = useBookmark(bookmarkId);

	if (!bookmark) {
		return (
			<div>
				Loading bookmark
			</div>
		)
	}

	return (
		<div>
			Editing bookmark with url {bookmark.url}
		</div>
	);
}

export default EditPage;
