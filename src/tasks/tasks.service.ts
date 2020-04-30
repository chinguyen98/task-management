import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const task: Task = {
            id: uuid(),
            title: createTaskDto.title,
            description: createTaskDto.description,
            status: TaskStatus.OPEN,
        }
        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(item => item.id === id);
    }

    deleteTask(id: string): Task {
        let index: number = this.tasks.findIndex(item => item.id === id);
        let task = null;
        if (index !== -1) {
            task = this.tasks.splice(index, 1);
        }
        return task;
    }

    updateTask(id: string, taskStatus: TaskStatus): Task {
        let task = this.getTaskById(id);
        task.status = taskStatus
        return task;
    }
}
