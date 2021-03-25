import Bookmark from "./bookmark";

type CtorParams = {
	id?: string;
	keywords?: Set<string>;
	url: string;
	title: string;
	thumbnail: string;
	author: string;
	width: number;
	height: number;
}

export default class PictureBookmark extends Bookmark {
	width: number;
	height: number;

	constructor({ keywords, id, thumbnail, author, title, url, height, width }: CtorParams) {
		super({ keywords, id, thumbnail, author, title, url });
		this.width = width;
		this.height = height;
		this.type = "picture";
	}
}
