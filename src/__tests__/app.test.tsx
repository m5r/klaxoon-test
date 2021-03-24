import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import App from "../app";

test("renders learn react link", async () => {
	render(<App />);
	const linkElement = screen.getByText(/learn react/i);
	await waitFor(() => expect(linkElement).toBeInTheDocument());
});