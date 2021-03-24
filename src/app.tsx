import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

import ListPage from "./pages/list";
import EditPage from "./pages/edit";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Redirect to="/list" />
				</Route>
				<Route path="/list" exact component={ListPage} />
				<Route path="/edit/:bookmarkId" exact component={EditPage} />
			</Switch>
		</Router>
	);
}

export default App;
