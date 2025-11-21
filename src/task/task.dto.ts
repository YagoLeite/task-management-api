export class TaskDto {
    id: string;
    title: string;
    description: string;
    status: string;
    expirationDate: Date;
}

export class CreateTaskDto {
    title: string;
    description: string;
    status: string;
    expirationDate: Date;
}

export interface FindAllParameters {
    title: string;
    status: string;
}
