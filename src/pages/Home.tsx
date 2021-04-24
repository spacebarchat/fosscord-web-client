import { Link } from "react-router-dom";
import { Text } from "../framework/Text";

export default function HomeScreen(props: any) {
	return (
		<div>
			<Link to="/login">Login</Link>
			<Text>Homescreen</Text>
		</div>
	);
}
