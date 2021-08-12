import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../framework/Button";
import { Checkbox } from "../../framework/Checkbox";
import { Link } from "../../framework/Link";
import { Input } from "../../framework/Input";
import { network } from "../../models/networks";
import "./Login.scss";

export default function Register() {
  const { t } = useTranslation("register");
  // eslint-disable-next-line
  const [email, setEmail] = useState("");
  // eslint-disable-next-line
  const [username, setUsername] = useState("");
  // eslint-disable-next-line
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [birthday, setBirthday] = useState("");
  // eslint-disable-next-line
  const [consent, setConsent] = useState(false);

  return (
    <div className="page register">
      <form className="form">
        <h1 className="text headline">{t("register")}</h1>

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
        <Input
          required
          onChange={(e) => setBirthday(e.target.value)}
          type="date"
          labelText={t("dateOfBirth")}
          autoComplete="bday"
        ></Input>
        <Checkbox
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

        <Button className="submit" primary>
          {t("register")}
        </Button>

        <div className="text muted">
          {t("loginNotice")} <Link to="/login">{t("login")}</Link>
        </div>
      </form>
    </div>
  );
}
