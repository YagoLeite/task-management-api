import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, FindAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
    private tasks: TaskDto[] = [];

    create(task: CreateTaskDto): TaskDto {
        const newTask: TaskDto = {
            id: uuid(),
            ...task,
            status: task?.status || TaskStatusEnum.TO_DO,
        };
        this.tasks.push(newTask);
        return newTask;
    }

    findAll(params: FindAllParameters): TaskDto[] {
        return this.tasks.filter((t) => {
            let match = true;

            if (params.title != undefined && !t.title.includes(params.title)) {
                match = false;
            }

            if (params.status != undefined && t.status !== params.status) {
                match = false;
            }

            return match;
        });
    }

    findById(id: string): TaskDto {
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

    remove(id: string) {
        let taskIndex = this.tasks.findIndex((t) => t.id === id);

        if (taskIndex >= 0) {
            this.tasks.splice(taskIndex, 1);
            return;
        }

        throw new HttpException(`Task with id: ${id} not found`, HttpStatus.BAD_REQUEST);
    }
}
