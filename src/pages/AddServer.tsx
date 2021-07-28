import React, { useEffect } from "react";
import { RootState, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import AddServer from "../components/AddServer";
import "./general.scss";
import "./TopScreen.scss";

const NotFound = React.lazy(() => import("./NotFound"));

export default function HomeScreen(props: any) {
	const history = useHistory();
	const accounts = useSelector((state: RootState) => state.accounts);

	return (
		<Switch>
			<Route path="/server/add">
				<AddServer></AddServer>
			</Route>
			<Route component={NotFound}></Route>
		</Switch>
	);
}
