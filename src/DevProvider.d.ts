import React from "react";
export interface DevContextProps {
    isDev: boolean;
    setIsDev: Function;
    useDevWrapper: Function;
}
interface DevProviderProps {
    children: React.ReactNode;
    dev?: boolean;
}
export declare const DevContext: React.Context<DevContextProps>;
declare const DevProvider: React.FC<DevProviderProps>;
export default DevProvider;
