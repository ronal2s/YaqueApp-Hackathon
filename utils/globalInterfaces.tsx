export interface InputReferences {
    shake?: () => void | any,
    input?: { focus: () => void }//There are a lot more 
}

export interface IFPost {
    id: string,
    title: string,
    description: string,
    priority: string,
    picture: string,
    latitude: string,
    longitude: string,
    solved: false,
    date: string,
    comments: {
        id: string, userId: string, text: string, name: string, verified?: boolean
    }[]
}