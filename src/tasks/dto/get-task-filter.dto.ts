import { TaskStatus } from "../task.model";

export class GetTaskFilterDto {
    status: TaskStatus;
    searchStr: string;
}