import type { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

type Params = {
	bookmarkId: string;
}

const EditPage: FunctionComponent = () => {
	const { bookmarkId } = useParams<Params>();

	return (
		<div>
			list bookmarks
		</div>
	);
}

export default EditPage;
