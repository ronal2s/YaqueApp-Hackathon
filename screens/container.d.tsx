import { IAlert } from "../contexts/alertContext"
import { IGlobalContexts } from "../contexts/globalContexts"

export interface IAppContainer {
    globalContext: { context: IGlobalContexts, setContext: React.Dispatch<React.SetStateAction<IGlobalContexts>> },
    openModal?: () => void,
    openUser: () => void,
    openNonUser: () => void,
}