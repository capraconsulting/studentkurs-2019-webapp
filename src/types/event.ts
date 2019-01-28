export interface IEvent {
    title: string, 
    date: IDate,
    description: string,
}

export interface IDate {
    day: number,
    month: number,
    year: number,
}