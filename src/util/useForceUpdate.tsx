import { useState } from "react";

export default function useForceUpdate() {
  var [state, setState] = useState(0);

  return () => {
    state++;
    setState(state);
  };
}
