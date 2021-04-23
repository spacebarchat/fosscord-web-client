import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Branding } from "../components/Branding";
import { NetworkSelection } from "../components/NetworkSelection";
import { Button } from "../framework/Button";
import { Checkbox } from "../framework/Checkbox";
import { Link } from "../framework/Link";
import { Input } from "../framework/Input";
import { Network } from "../reducers/networks";
import "./Login.scss";
import { getFormError, PlainTextError } from "../util/FormError";

export default function Register() {
	const { t } = useTranslation("register");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [consent, setConsent] = useState(false);
	const [network, setNetwork] = useState<Network>();
	//TODO: use setErr
	const [err, setErr] = useState(null);

	function submit(event: FormEvent) {
		event.preventDefault();
		console.log({ email, username, password, consent, network });
	}

	return (
		<div className="page register">
			<form className="form" onSubmit={submit}>
				<h1 className="text headline">
					<Branding />
					{t("register")}
				</h1>

				<NetworkSelection defaultValue={network} onChange={(x) => setNetwork(x)} />

				<Input
					error={getFormError(err, "email")}
					required
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					className="email"
					labelText={t("email")}
					autoComplete="email"
				></Input>
				<Input
					error={getFormError(err, "username")}
					required
					onChange={(e) => setUsername(e.target.value)}
					className="username"
					type="text"
					labelText={t("username")}
					autoComplete="username"
				></Input>
				<Input
					error={getFormError(err, "password")}
					required
					onChange={(e) => setPassword(e.target.value)}
					className="password"
					type="password"
					labelText={t("password")}
					autoComplete="new-password"
				></Input>

				{/* // TODO: date of birth + network selection */}
				<Checkbox
					error={getFormError(err, "consent")}
					required
					onChange={(e) => setConsent(e.target.checked)}
					labelText={
						<>
							{t("consent")}
							<Link external to={network?.termsOfService}>
								{t("network")}
							</Link>
						</>
					}
				></Checkbox>

				<PlainTextError error={err} style={{ marginBottom: 0 }}></PlainTextError>

				<Button className="submit" primary>
					{t("submit")}
				</Button>

				<div className="text muted">
					{t("loginNotice")} <Link to="/login">{t("login")}</Link>
				</div>
			</form>
		</div>
	);
}
