import { Link } from "react-router-dom";
import { useSelector, useDispatch, RootState } from "react-redux";
import("../test");

export default function HomeScreen(props: any) {
	const count = useSelector((state: RootState) => state.accounts);

	return (
		<div>
			<Link to="/login">Login</Link>
			<p className="text">Homescreen</p>
		</div>
	);
}
