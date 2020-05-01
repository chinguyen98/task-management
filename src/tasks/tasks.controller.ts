import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {

    }



    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.tasksService.getTaskBySearchKey(filterDto);
    //     }
    //     return this.tasksService.getAllTasks();
    // }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id);
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    // @Patch('/:id/status')
    // updateTask(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
    //     return this.tasksService.updateTask(id, status);
    // }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string): Task {
    //     return this.tasksService.deleteTask(id);
    // }
}
