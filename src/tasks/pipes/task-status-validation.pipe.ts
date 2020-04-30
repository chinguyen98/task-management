import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly alllowStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ]

    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException('Status is invalid!');
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.alllowStatuses.indexOf(status);
        return index !== -1;
    }
}