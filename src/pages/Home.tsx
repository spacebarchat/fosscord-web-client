import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers/";
import("../test");

export default function HomeScreen(props: any) {
	const count = useSelector((state: RootState) => state.accounts);

	return (
		<div>
			<Link to="/login">Login</Link>
			<p>Homescreen</p>
		</div>
	);
}
