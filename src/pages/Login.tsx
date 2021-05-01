import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { Network } from "../reducers/networks";
import { Branding } from "../components/Branding";
import { NetworkSelection } from "../components/NetworkSelection";
import { Button } from "../framework/Button";
import { Input } from "../framework/Input";
import "./Login.scss";
import { getFormError, PlainTextError } from "../util/FormError";
import { request } from "../util/request";
import { Captcha } from "../util/Captcha";
import { connectAccount } from "../actions";
import { useDispatch } from "react-redux";

// TODO: 2fa code
// TODO: no discord warning for cordova apps
// TODO: add x-super-properties + x-fingerprint to request headers

export default function LoginScreen() {
	const { t } = useTranslation("login");
	const [network, setNetwork] = useState<Network>();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [captchaKey, setCaptchaKey] = useState<string | undefined>(undefined);
	const [mfa, setMfa] = useState<string | undefined>(undefined);
	const [mfaTicket, setMfaTicket] = useState<string | undefined>(undefined);
	const [err, setErr] = useState<any>(null);
	const history = useHistory();
	const dispatch = useDispatch();

	const captchaRequired = !!err?.captcha_service && !captchaKey;

	async function submit(event: FormEvent) {
		event.preventDefault();
		if (!network) return setErr("Please select a network");
		// setErr(null);

		if (mfaTicket) {
			var { body, error } = await request("/auth/mfa/totp", {
				network,
				body: {
					login_source: null,
					gift_code_sku_id: null,
					code: mfa,
					ticket: mfaTicket,
				},
			});
		} else {
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
		}
		setLoading(false);
		setErr(error);
		if (error) return;
		if (body.mfa) return setMfaTicket(body.ticket);

		body.network_id = network.id;

		dispatch({ type: "ADD_ACCOUNT", payload: connectAccount(body) });
		history.push("/");
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

				<PlainTextError error={err} style={{ marginBottom: 0 }}></PlainTextError>

				<Captcha onVerify={setCaptchaKey} {...err}></Captcha>

				{mfaTicket && (
					<Input
						onChange={(e) => setMfa(e.target.value)}
						autoComplete=""
						className="mfaCode"
						labelText={t("mfa")}
						placeholder={t("mfaPlaceholder")}
					></Input>
				)}

				<Link className="small" to="/resetPassword">
					{t("forgotPassword")}
				</Link>

				<Button loading={loading} className="submit" primary disabled={captchaRequired || loading}>
					{captchaRequired ? t("captchaRequired") : t("login")}
				</Button>

				<div className="text muted">
					{t("registerNotice")} <Link to="/register">{t("register")}</Link>
				</div>
			</form>
		</div>
	);
}
