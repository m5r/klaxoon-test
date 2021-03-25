import Bookmark from "./bookmark";

type CtorParams = {
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

	constructor({ thumbnail, author, title, url, duration, height, width }: CtorParams) {
		super({ thumbnail, author, title, url });
		this.width = width;
		this.height = height;
		this.duration = duration;
	}
}
