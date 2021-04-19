import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Network } from "../reducers/networks";
import { Branding } from "../components/Branding";
import { NetworkSelection } from "../components/NetworkSelection";
import { Button } from "../framework/Button";
import { Input } from "../framework/Input";
import "./Login.scss";
import { getFormError, PlainTextError } from "../util/FormError";
import { request } from "../util/request";

// TODO: 2fa code
// TODO: no discord warning for cordova apps

export default function LoginScreen() {
	const { t } = useTranslation("login");
	const [network, setNetwork] = useState<Network>();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [captchaKey, setCaptchaKey] = useState(null);
	const [err, setErr] = useState(null);

	async function submit(event: FormEvent) {
		event.preventDefault();
		console.log({ email, password, network });
		const { response, error } = await request(`/auth/login`, {
			network,
			body: { login: email, password, undelete: false, login_source: null, gift_code_sku_id: null },
		});
		console.log(response, error);
		setErr(error);
	}

	return (
		<div className="page login">
			<form className="form" onSubmit={submit}>
				<h1 className="text headline">
					<Branding />
					{t("login")}
				</h1>

				<NetworkSelection defaultValue={network} onChange={(x) => setNetwork(x)} />
				{/* email or phone autocomplete */}

				<Input
					onChange={(e) => setEmail(e.target.value)}
					error={getFormError(err, "login")}
					autoComplete="email"
					type="text"
					className="emailPhone"
					labelText={t("emailTelephone")}
				></Input>

				<Input
					onChange={(e) => setPassword(e.target.value)}
					error={getFormError(err, "password")}
					className="password"
					type="password"
					labelText={t("password")}
					autoComplete="current-password"
				></Input>

				{/* // TODO network selection */}

				<Link className="small" to="/resetPassword">
					{t("forgotPassword")}
				</Link>

				<PlainTextError error={err} style={{ marginBottom: 0 }}></PlainTextError>

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
