import React, { Suspense, StrictMode } from "react";
import { Provider } from "react-redux";
import store from "../util/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";
import "../util/i18n";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

function App() {
	return (
		<StrictMode>
			<Provider store={store}>
				<ErrorBoundary>
					<Suspense fallback={<div className="text">{/* Loading ... */}</div>}>
						<Router>
							<Switch>
								<Route exact path="/register" component={Register}></Route>
								<Route path="/login" component={Login}></Route>
								<Route exact path="/" component={Home}></Route>
								<Route component={NotFound}></Route>
							</Switch>
						</Router>
					</Suspense>
				</ErrorBoundary>
			</Provider>
		</StrictMode>
	);
}

export default App;
