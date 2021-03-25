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
	duration: number;
}

export default class VideoBookmark extends Bookmark {
	width: number;
	height: number;
	duration: number;

	constructor({ keywords, id, thumbnail, author, title, url, duration, height, width }: CtorParams) {
		super({ keywords, id, thumbnail, author, title, url });
		this.width = width;
		this.height = height;
		this.duration = duration;
		this.type = "video";
	}
}
