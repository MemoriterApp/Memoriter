export type Flashcard = {
    _id?: string,
    content: string,
    interval: number,
    easiness: number,
    nextDate: number,
    pos: number,
    streak: number,
    folder: string,
    textAlign: string,
    textAlignColor: string,
    textAlignSymbol: string,
    title: string,
    user: string
}

export type Folder = {
    _id?: string,
    archived?: boolean,
    pos?: number,
    title?: string,
    user?: string
}