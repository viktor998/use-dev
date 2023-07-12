import { useContext } from "react";
import { DevContext } from "./DevProvider";

const useDev = () => {
  return useContext(DevContext);
};

export default useDev;
