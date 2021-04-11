import Logo from "../assets/logo_big_transparent.png";
import "./Branding.scss";

export function Branding() {
	return (
		<div className="branding">
			<img src={Logo} />
			<h2 className="text headline">Fosscord</h2>
		</div>
	);
}
