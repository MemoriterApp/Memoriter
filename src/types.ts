import { Timestamp } from "firebase/firestore/lite"

export type Flashcard = {
    id: string,
    content: string,
    interval: number,
    nextDate: Timestamp,
    pos: number,
    streak: number,
    syncedFolder: string,
    textAlign: string,
    textAlignColor: string,
    textAlitnSymbol: string,
    title: string,
    user: string
}

export type Folder = {
    id: string,
    archived?: boolean,
    pos?: number,
    title?: string,
    user?: string
}