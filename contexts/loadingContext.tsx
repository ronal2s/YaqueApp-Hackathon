import { createContext } from "react";

export interface ILoading {
    open: boolean,
    setLoading?: React.Dispatch<React.SetStateAction<ILoading>>,
}
export const AlertContext = createContext<ILoading | null>(null);