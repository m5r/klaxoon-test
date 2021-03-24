type CtorParams = {
	url: string;
	title: string;
	author: string;
}

export default class Bookmark {
	readonly id: string;
	readonly url: string;
	readonly title: string;
	readonly author: string;
	readonly addedAt: Date;
	keywords: Set<string>;

	constructor({ author, title, url }: CtorParams) {
		this.id = generateRandomString();
		this.keywords = new Set();
		this.addedAt = new Date();
		this.author = author;
		this.title = title;
		this.url = url;
	}
}

function generateRandomString() {
	const array = new Uint32Array(1);
	crypto.getRandomValues(array);
	const randomNumber = array[0] * (Date.now() / 10000);

	return randomNumber.toString(16);
}
