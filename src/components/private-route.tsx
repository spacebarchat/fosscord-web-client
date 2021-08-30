import { useState } from "react";
import { Route, RouteProps } from "react-router-dom";
import client from "../Client";
import LoadingPage from "../pages/loading-page";

// this route ensures that the user is logged in, else redirects them
const PrivateRoute: React.FunctionComponent<RouteProps> = (props) => {
  const [ready, setReady] = useState<boolean>(false);
  client.on("ready", () => {
    setReady(true);
  });

  if (!ready) return <LoadingPage />;
  else return <Route {...props} />;
};

export default PrivateRoute;
