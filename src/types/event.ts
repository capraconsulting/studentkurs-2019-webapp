export interface IEvent {
    title: string, 
    date: IDate,
    description: string,
    id: number,
}

export interface IDate {
    day: number,
    month: number,
    year: number,
}