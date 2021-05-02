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
import { request } from "../util/request";
import { Captcha } from "../util/Captcha";

export default function Register() {
	const { t } = useTranslation("register");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [birthday, setBirthday] = useState("");
	const [consent, setConsent] = useState(false);
	const [network, setNetwork] = useState<Network>();
	const [captchaKey, setCaptchaKey] = useState(null);
	//TODO: use setErr
	const [err, setErr] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const captchaRequired = !!err?.captcha_service && !captchaKey;

	async function submit(event: FormEvent) {
		event.preventDefault();

		setLoading(true);

		// TODO: make response body complete
		const { response, error } = await request(`/auth/register`, {
			network,
			// TODO: fingerprint
			body: {
				email,
				password,
				captcha_key: captchaKey,
				consent,
				fingerprint: null,
				gift_code_sku_id: null,
				invite: null,
				username,
				date_of_birth: birthday,
			},
		});

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
		<div className="page register">
			<form className="form" onSubmit={submit}>
				<h1 className="text headline">
					<Branding />
					{t("register")}
				</h1>

				<NetworkSelection defaultValue={network} onChange={changeNetwork} />

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
				<Input
					error={getFormError(err, "date_of_birth")}
					required
					onChange={(e) => setBirthday(e.target.value)}
					type="date"
					labelText={t("dateOfBirth")}
					autoComplete="bday"
				></Input>
				<Checkbox
					error={getFormError(err, "consent")}
					required
					onChange={(e) => setConsent(e.target.checked)}
					labelText={
						<>
							<Link external to={network?.termsOfService}>
								{t("consent")}
							</Link>
						</>
					}
				></Checkbox>

				<PlainTextError error={err} style={{ marginBottom: 0 }}></PlainTextError>

				<Captcha onVerify={setCaptchaKey} {...err}></Captcha>

				<Button loading={loading} className="submit" primary disabled={captchaRequired || loading}>
					{captchaRequired ? t("captchaRequired") : t("register")}
				</Button>

				<div className="text muted">
					{t("loginNotice")} <Link to="/login">{t("login")}</Link>
				</div>
			</form>
		</div>
	);
}
