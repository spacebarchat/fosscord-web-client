import React, { Suspense, StrictMode } from "react";
import { Provider } from "react-redux";
import store from "../util/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";
import "../util/i18n";
import Home from "../pages/Home";

const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));

function App() {
	return (
		<StrictMode>
			<Provider store={store}>
				<ErrorBoundary>
					<Suspense fallback={<div className="text page-center headline"> Loading ...</div>}>
						<Router>
							<Switch>
								<Route path="/register" component={Register}></Route>
								<Route path="/login" component={Login}></Route>
								<Route component={Home}></Route>
							</Switch>
						</Router>
					</Suspense>
				</ErrorBoundary>
			</Provider>
		</StrictMode>
	);
}

export default App;
