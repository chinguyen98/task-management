import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TaskStatus } from "./taskStatus.enum";
import { User } from "src/auth/user.entity";
import { type } from "os";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    status: TaskStatus

    @Column()
    userId:Number

    @ManyToOne(type => User, user => user.tasks, { eager: false })
    user: User
}