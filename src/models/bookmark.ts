type CtorParams = {
	id?: string; // id is passed when deserializing
	keywords?: Set<string>; // keywords is passed when deserializing
	url: string;
	title: string;
	thumbnail: string;
	author: string;
}

export type BookmarkType = "link" | "video" | "picture";

export default class Bookmark {
	readonly id: string;
	readonly url: string;
	readonly title: string;
	readonly thumbnail: string;
	readonly author: string;
	readonly addedAt: Date;
	type: BookmarkType;
	keywords: Set<string>;

	constructor({ id, keywords, thumbnail, author, title, url }: CtorParams) {
		this.id = id ?? generateRandomString();
		this.keywords = keywords ?? new Set();
		this.addedAt = new Date();
		this.thumbnail = thumbnail;
		this.author = author;
		this.title = title;
		this.url = url;
		this.type = "link";
	}

	public updateKeywords(nextKeywords: Set<string>) {
		this.keywords = nextKeywords;
	}
}

function generateRandomString() {
	const array = new Uint32Array(1);
	crypto.getRandomValues(array);
	const randomNumber = array[0] * (Date.now() / 10000);

	return randomNumber.toString(16);
}
