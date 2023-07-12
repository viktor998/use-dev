import React, { createContext, useState } from "react";
import NoPage from "./components/NoPage";
export interface DevContextProps {
  isDev: boolean;
  setIsDev: Function;
  useDevWrapper: Function;
}

interface DevProviderProps {
  children: React.ReactNode;
  dev?: boolean;
}

type DevWrapperProps<T> = {
  child: T | (() => T);
  prodChild?: T | (() => T);
  options?: {
    showBadge: boolean;
  };
}


export const DevContext = createContext<DevContextProps>({
  isDev: false,
  setIsDev: () => { },
  useDevWrapper: () => { },
});


const DevWrapper = ({ children, showBadge }) => {
  return (
    <>
      <div
        hidden={!showBadge}
        style={{
          background: "#ffa600",
        }}
        className="h-[20px] w-full !bg-[#ffa600] absolute !text-white z-50 p-0 m-0 overflow-hidden text-center text-sm"
      >
        DEVELOPMENT MODE
      </div>
      {children}
    </>
  );
};

const DevProvider: React.FC<DevProviderProps> = ({ children, dev }) => {
  const isComponent = (child) => (child?.type ? typeof child.type === "function" || React.isValidElement(child) : false);
  const [isDev, setIsDev] = useState(dev || false);

  const getLocalPath = () => {
    const err = new Error();
    const stack = err.stack;
    if (!stack) return null;
    const stackArr = stack.split("\n");
    const caller = stackArr[3];
    if (!caller) return null;
    const pathMatch = caller.match(/\(([^)]+)\)/);
    if (!pathMatch) return null;
    const path = pathMatch[1];
    const removeOrigin = path.replace(window?.location?.origin ?? "", "");
    return removeOrigin;
  };

  function useDevWrapper<T extends React.ReactElement>({ child, prodChild, options = { showBadge: false } }: DevWrapperProps<T>) {
    if (isDev) {
      if (isComponent(child)) {
        return <DevWrapper {...options}>{child}</DevWrapper>;
      } else {
        return typeof child === "function" ? child() : child;
      }
    } else {
      if (isComponent(child)) {
        return prodChild ? prodChild : <NoPage />;
      } else {
        return prodChild ? (typeof prodChild === "function" ? prodChild() : prodChild) : null;
      }
    }
  };

  const values = {
    isDev,
    setIsDev,
    useDevWrapper,
    getLocalPath,
  };

  return <DevContext.Provider value={values}>{children}</DevContext.Provider>;
};

export default DevProvider;
