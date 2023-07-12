import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { createContext, useState } from "react";
import NoPage from "./components/NoPage";
export const DevContext = createContext({
    isDev: false,
    setIsDev: () => { },
    useDevWrapper: () => { },
});
const DevWrapper = ({ children, showBadge }) => {
    return (_jsxs(_Fragment, { children: [_jsx("div", { hidden: !showBadge, style: {
                    background: "#ffa600",
                }, className: "h-[20px] w-full !bg-[#ffa600] absolute !text-white z-50 p-0 m-0 overflow-hidden text-center text-sm", children: "DEVELOPMENT MODE" }), children] }));
};
const DevProvider = ({ children, dev }) => {
    const isComponent = (child) => (child?.type ? typeof child.type === "function" || React.isValidElement(child) : false);
    const [isDev, setIsDev] = useState(dev || false);
    const getLocalPath = () => {
        const err = new Error();
        const stack = err.stack;
        if (!stack)
            return null;
        const stackArr = stack.split("\n");
        const caller = stackArr[3];
        if (!caller)
            return null;
        const pathMatch = caller.match(/\(([^)]+)\)/);
        if (!pathMatch)
            return null;
        const path = pathMatch[1];
        const removeOrigin = path.replace(window?.location?.origin ?? "", "");
        return removeOrigin;
    };
    function useDevWrapper({ child, prodChild, options = { showBadge: false } }) {
        if (isDev) {
            if (isComponent(child)) {
                return _jsx(DevWrapper, { ...options, children: child });
            }
            else {
                return typeof child === "function" ? child() : child;
            }
        }
        else {
            if (isComponent(child)) {
                return prodChild ? prodChild : _jsx(NoPage, {});
            }
            else {
                return prodChild ? (typeof prodChild === "function" ? prodChild() : prodChild) : null;
            }
        }
    }
    ;
    const values = {
        isDev,
        setIsDev,
        useDevWrapper,
        getLocalPath,
    };
    return _jsx(DevContext.Provider, { value: values, children: children });
};
export default DevProvider;
