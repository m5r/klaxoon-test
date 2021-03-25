import Bookmark from "./bookmark";

type CtorParams = {
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

	constructor({ thumbnail, author, title, url, height, width }: CtorParams) {
		super({ thumbnail, author, title, url });
		this.width = width;
		this.height = height;
	}
}
