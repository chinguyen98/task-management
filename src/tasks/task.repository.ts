import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./taskStatus.enum";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    async getTasks(
        filterDto: GetTaskFilterDto,
        user: User,
    ): Promise<Task[]> {
        const { searchStr, status } = filterDto;
        const query = this.createQueryBuilder('task');

        query.where('task.userId=:userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (searchStr) {
            query.andWhere('(task.title LIKE :searchStr OR task.description LIKE :searchStr)', { searchStr: `%${searchStr}%` })
        }

        const tasks = query.getMany();
        return tasks;
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: User
    ): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();
        delete task.user;

        return task;
    }
}