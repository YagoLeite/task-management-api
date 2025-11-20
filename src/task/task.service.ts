import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateTaskDto, TaskDto } from './task.dto';
import * as crypto from 'crypto';

@Injectable()
export class TaskService {
    private tasks: TaskDto[] = [];

    create(task: CreateTaskDto): TaskDto {
        const newTask: TaskDto = {
            id: crypto.randomUUID(),
            ...task,
        };
        this.tasks.push(newTask);
        return newTask;
    }

    findAll(): TaskDto[] {
        return this.tasks;
    }

    findOne(@Param('id') id: string): TaskDto {
        const selectedTask = this.tasks.find((task) => task?.id === id);

        if (!selectedTask) {
            throw new NotFoundException('Task not found');
        }

        return selectedTask;
    }

    update(id: string, task: Partial<CreateTaskDto>): TaskDto {
        const indexFounded = this.tasks.findIndex((task) => task.id === id);
        if (indexFounded === -1) {
            throw new NotFoundException('Task not found');
        }

        // let taskFounded = this.tasks[indexFounded];

        this.tasks[indexFounded] = {
            ...this.tasks[indexFounded],
            ...task,
        };

        return this.tasks[indexFounded];
    }

    clearAll(): void {
        this.tasks = [];
    }
}
