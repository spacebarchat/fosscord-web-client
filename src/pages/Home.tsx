import { useEffect } from "react";
import { RootState, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

export default function HomeScreen(props: any) {
	const history = useHistory();

	const accounts = useSelector((state: RootState) => state.accounts);
	useEffect(() => {
		if (!accounts.length) history.push("/login");
	});

	if (!accounts.length) {
		return <div></div>;
	}

	return (
		<div>
			<Link to="/login">Login</Link>
			<p className="text">Homescreen</p>
		</div>
	);
}
