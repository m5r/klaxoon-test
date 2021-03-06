import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

import ListPage from "./pages/list";
import EditPage from "./pages/edit";
import { BookmarksProvider } from "./contexts/bookmarks-context";

function App() {
	return (
		<BookmarksProvider>
			<Router>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto">
						<Switch>
							<Route path="/list/:page" exact component={ListPage} />
							<Route path="/edit/:bookmarkId" exact component={EditPage} />
							<Route path="*">
								<Redirect to="/list/1" />
							</Route>
						</Switch>
					</div>
				</div>
			</Router>
		</BookmarksProvider>
	);
}

export default App;
