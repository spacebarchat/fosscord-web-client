import { Link } from "react-router-dom";
import { useSelector, RootState } from "react-redux";
import { Text } from "../framework/Text";
import("../test");

export default function HomeScreen(props: any) {
	const count = useSelector((state: RootState) => state.accounts);

	return (
		<div>
			<Link to="/login">Login</Link>
			<Text>Homescreen</Text>
			<Text>{count}</Text>
		</div>
	);
}
