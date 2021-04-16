import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Branding } from "../components/Branding";
import { InstanceSelection } from "../components/InstanceSelection";
import { Button } from "../framework/Button";
import { Checkbox } from "../framework/Checkbox";
import { Input } from "../framework/Input";
import { Instance } from "../reducers/instances";
import "./Login.scss";

export default function Register() {
	const { t } = useTranslation("register");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [consent, setConsent] = useState(false);
	const [instance, setInstance] = useState({} as Instance);

	function submit(event: FormEvent) {
		event.preventDefault();
		console.log({ email, username, password, consent, instance });
	}

	return (
		<div className="page register">
			<form className="form" onSubmit={submit}>
				<h1 className="text headline"><Branding />{t("register")}</h1>

				<InstanceSelection defaultValue={instance} onChange={(x) => setInstance(x)} />

				<Input
					required
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					className="email"
					labelText={t("email")}
					autoComplete="email"
				></Input>
				<Input
					required
					onChange={(e) => setUsername(e.target.value)}
					className="username"
					type="text"
					labelText={t("username")}
					autoComplete="username"
				></Input>
				<Input
					required
					onChange={(e) => setPassword(e.target.value)}
					className="password"
					type="password"
					labelText={t("password")}
					autoComplete="new-password"
				></Input>

				{/* // TODO: date of birth + instance selection */}
				<Checkbox required onChange={(e) => setConsent(e.target.checked)} labelText={t("consent")}></Checkbox>

				<Button className="submit" primary>
					{t("submit")}
				</Button>

				<div className="text muted">
					{t("loginNotice")}
					<Link to="/login">{t("login")}</Link>
				</div>
			</form>
		</div>
	);
}
