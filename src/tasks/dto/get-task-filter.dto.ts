import { TaskStatus } from "../taskStatus.enum";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN], { message: 'Task status must be in: DONE, IN_PROGRESS, OPEN!' })
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    searchStr: string;
}