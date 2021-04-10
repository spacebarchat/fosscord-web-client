import { Link } from "react-router-dom";
import Input from "../components/Input";
import "./Login.scss";

export default function LoginScreen() {
	return (
		<div className="page login">
			<Link to="/">Home</Link>
			<p className="text">Loginscreen</p>

			<Input labelText="test"></Input>
		</div>
	);
}
