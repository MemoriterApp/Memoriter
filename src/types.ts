import ObjectId from "bson-objectid"

export type Flashcard = {
    _id: ObjectId,
    content: string,
    interval: number,
    easiness: number,
    nextDate: number,
    pos: number,
    streak: number,
    folder: ObjectId,
    textAlign: string,
    textAlignColor: string,
    textAlignSymbol: string,
    title: string,
    user: string
}

export type Folder = {
    _id: ObjectId,
    archived?: boolean,
    pos?: number,
    title?: string,
    user?: string
}