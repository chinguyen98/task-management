import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './taskStatus.enum';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {

    }

    async getTaskById(id: number): Promise<Task> {
        const foundTask = await this.taskRepository.findOne(id);

        if (!foundTask) {
            throw new NotFoundException(`Task with Id ${id} not found!`);
        }

        return foundTask;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }


    // private tasks: Task[] = [];

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTaskBySearchKey(filterDto: GetTaskFilterDto): Task[] {
    //     const { status, searchStr } = filterDto;
    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(item => item.status === status);
    //     }

    //     if (searchStr) {
    //         tasks = tasks.filter(item => item.title.includes(searchStr) || item.description.includes(searchStr));
    //     }

    //     return tasks;
    // }

    // getTaskById(id: string): Task {
    //     const task = this.tasks.find(item => item.id === id);
    //     if (!task) {
    //         throw new NotFoundException('Can not find!');
    //     }
    //     return task;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const task: Task = {
    //         id: uuid(),
    //         title: createTaskDto.title,
    //         description: createTaskDto.description,
    //         status: TaskStatus.OPEN,
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

    // deleteTask(id: string): Task {
    //     let index: number = this.tasks.findIndex(item => item.id === id);
    //     let task = null;
    //     if (index !== -1) {
    //         task = this.tasks.splice(index, 1);
    //         return task;
    //     } else {
    //         throw new NotFoundException('Can not found id to delete!');
    //     }
    // }

    // updateTask(id: string, taskStatus: TaskStatus): Task {
    //     let task = this.getTaskById(id);
    //     task.status = taskStatus
    //     return task;
    // }
}
