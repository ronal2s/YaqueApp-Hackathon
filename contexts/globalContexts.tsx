import { createContext } from "react";
import { IAlert } from "./alertContext";

export interface IUser {
    token?: string,
    logged?: boolean,
}


export interface IGlobalContexts {
    user?: IUser,
    loading?: boolean,
    setAlert?: (title: string, content: string, error?: boolean) => void
    setContext?: React.Dispatch<React.SetStateAction<IGlobalContexts>>,
}
export const GlobalContext = createContext<IGlobalContexts | null>(null);