import React, { Suspense } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "../util/store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";

const Home = React.lazy(() => import("../pages/Home"));

function App() {
	return (
		<Provider store={store}>
			<ErrorBoundary>
				<Suspense fallback={<div>Loading ...</div>}>
					<Router>
						<Route component={Home}></Route>
					</Router>
				</Suspense>
			</ErrorBoundary>
		</Provider>
	);
}

export default App;
