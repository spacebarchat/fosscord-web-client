import HCaptcha from "@hcaptcha/react-hcaptcha";

export interface CaptchaProps {
	captcha_service: "hcaptcha" | "recaptcha";
	captcha_sitekey: string;
	onVerify: (data: any) => any;
}

export function Captcha(props: CaptchaProps | any) {
	if (!props.captcha_service) return <></>;
	// TODO: show captcha onError

	return (
		<>
			<HCaptcha
				onExpire={() => props.onVerify(null)}
				onError={() => props.onVerify(null)}
				onVerify={props.onVerify}
				sitekey={props.captcha_sitekey}
			></HCaptcha>
		</>
	);
}
