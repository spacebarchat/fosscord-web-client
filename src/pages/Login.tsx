import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Network } from "../reducers/networks";
import { Branding } from "../components/Branding";
import { NetworkSelection } from "../components/NetworkSelection";
import { Button } from "../framework/Button";
import { Input } from "../framework/Input";
import "./Login.scss";
import { getFormError } from "../util/FormError";

export default function LoginScreen() {
	const { t } = useTranslation("login");
	const [network, setNetwork] = useState({} as Network);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="page login">
			<form className="form">
				<h1 className="text headline">
					<Branding />
					{t("login")}
				</h1>

				<NetworkSelection defaultValue={network} onChange={(x) => setNetwork(x)} />
				{/* email or phone autocomplete */}
				<p className="text danger error">{getFormError({ test: "error" }, "test")}</p>
				<Input
					onChange={(e) => setEmail(e.target.value)}
					autoComplete="email"
					type="text"
					className="emailPhone"
					labelText={t("emailTelephone")}
				></Input>

				<Input
					onChange={(e) => setPassword(e.target.value)}
					className="password"
					type="password"
					labelText={t("password")}
					autoComplete="current-password"
				></Input>

				{/* // TODO network selection */}

				<Link className="small" to="/resetPassword">
					{t("forgotPassword")}
				</Link>

				<Button className="submit" primary>
					{t("login")}
				</Button>

				<div className="text muted">
					{t("registerNotice")} <Link to="/register">{t("register")}</Link>
				</div>
			</form>
		</div>
	);
}
