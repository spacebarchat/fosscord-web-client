import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Network } from "../reducers/networks";
import { Branding } from "../components/Branding";
import { NetworkSelection } from "../components/NetworkSelection";
import { Button } from "../framework/Button";
import { Input } from "../framework/Input";
import "./Login.scss";
import { FormError, getFormError, PlainTextError } from "../util/FormError";
import { request } from "../util/request";

// TODO: 2fa code
// TODO: no discord warning for cordova apps
// TODO: add x-super-properties + x-fingerprint to request headers

export default function LoginScreen() {
	const { t } = useTranslation("login");
	const [network, setNetwork] = useState<Network>();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	//TODO: captchaKey
	const [captchaKey, setCaptchaKey] = useState(null);
	const [err, setErr] = useState(null);

	async function submit(event: FormEvent) {
		event.preventDefault();
		console.log({ email, password, network });
		var { body, error } = await request(`/auth/login`, {
			network,
			body: {
				login: email,
				password,
				undelete: false,
				login_source: null,
				gift_code_sku_id: null,
				captcha_key: captchaKey,
			},
		});
		console.log(body, error);
		if (error?.captcha_key) {
			error = {
				captcha: {
					_errors: [{ message: "Captcha required" }],
				},
			};
		}
		setErr(error);
		setLoading(false);
	}

	async function changeNetwork(network: Network) {
		setErr(null);
		setNetwork(network);
		if (network.discord) {
			const { error, response } = await request("/", { network });
			if (response?.status !== 404) setErr(error);
		}
	}

	return (
		<div className="page login">
			<form className="form" onSubmit={submit}>
				<h1 className="text headline">
					<Branding />
					{t("login")}
				</h1>

				<NetworkSelection defaultValue={network} onChange={changeNetwork} />
				{/* email or phone autocomplete */}
				<FormError error={err} key="captcha"></FormError>

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

				<Button loading={loading} className="submit" primary>
					{t("login")}
				</Button>

				<div className="text muted">
					{t("registerNotice")} <Link to="/register">{t("register")}</Link>
				</div>
			</form>
		</div>
	);
}
