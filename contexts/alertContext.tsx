import { createContext } from "react";

export interface IAlert {
    title: string, 
    content: string, 
    open: boolean, 
    success: boolean,
    setAlert?: React.Dispatch<React.SetStateAction<IAlert>>,
}
export const AlertContext = createContext<IAlert | null>(null);