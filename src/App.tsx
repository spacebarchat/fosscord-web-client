import React, { useState } from "react";
import Routes from "./components/Routes";
import ErrorBoundary from "./components/ErrorBoundary";
import "./util/i18n";
import { InitClient } from "./Client";
import "./util/debug";
import { State } from "./util/State";

export default function App() {
  const [state, setWholeState] = useState({});

  const setState = (val: any) => setWholeState({ ...state, ...val });

  return (
    <State.Provider value={[state, setState]}>
      <ErrorBoundary>
        <Routes>
          <InitClient />
        </Routes>
      </ErrorBoundary>
    </State.Provider>
  );
}
