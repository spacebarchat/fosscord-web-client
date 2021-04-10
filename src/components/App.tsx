import React, { Suspense } from "react";
import { Provider } from "react-redux";
import store from "../util/store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";
import "../util/i18n";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));

function App() {
	return (
		<Provider store={store}>
			<ErrorBoundary>
				<Suspense fallback={<div className="text">Loading ...</div>}>
					<Router>
						<Route exact path="/login" component={Login}></Route>
						<Route exact path="/" component={Home}></Route>
					</Router>
				</Suspense>
			</ErrorBoundary>
		</Provider>
	);
}

export default App;
