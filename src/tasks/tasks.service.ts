import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './taskStatus.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {

    }

    async getTasks(
        filterDto: GetTaskFilterDto,
        user: User,
    ): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(
        id: number,
        user: User,
    ): Promise<Task> {
        const foundTask = await this.taskRepository.findOne({ where: { id, userId: user.id } });

        if (!foundTask) {
            throw new NotFoundException(`Task with Id ${id} not found!`);
        }

        return foundTask;
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: User,
    ): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: number, user: User): Promise<void> {
        const resultTask = await this.taskRepository.delete({ id, userId: user.id });

        if (resultTask.affected === 0) {
            throw new NotFoundException(`Task with Id ${id} not found!`);
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }
}
