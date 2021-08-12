import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../../framework/Button";
import { Input } from "../../framework/Input";
import "./Login.scss";
import store from "../../util/store";

export default function LoginScreen() {
  const { t } = useTranslation("login");
  const [email, setEmail] = useState<string>();
  // eslint-disable-next-line
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function submit(event: FormEvent) {
    event.preventDefault();

    store.saveItem("token", email);

    history.push("/channels/@me");
  }

  return (
    <div className="page login">
      <form className="form" onSubmit={submit}>
        <h1 className="text headline">{t("login")}</h1>

        <Input
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          type="text"
          className="emailPhone"
          labelText={t("emailTelephone") + " USE BOT TOKEN ON MOMENT"}
        ></Input>

        <Input
          onChange={(e) => setPassword(e.target.value)}
          className="password"
          type="password"
          labelText={t("password")}
          autoComplete="current-password"
        ></Input>

        <Button className="submit" primary>
          {t("login")}
        </Button>

        <Link className="small" to="/resetPassword">
          {t("forgotPassword")}
        </Link>

        <div className="text muted">
          {t("registerNotice")} <Link to="/register">{t("register")}</Link>
        </div>
      </form>
    </div>
  );
}
