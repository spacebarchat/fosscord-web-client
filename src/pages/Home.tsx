import { Link } from "react-router-dom";

export default function HomeScreen(props: any) {
	return (
		<div>
			<Link to="/login">Login</Link>
			<Text>Homescreen</Text>
			<Text>{count}</Text>
		</div>
	);
}
