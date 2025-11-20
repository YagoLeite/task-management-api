import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTaskDto, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
    @Post()
    create(@Body() task: CreateTaskDto): TaskDto {
        return this.taskService.create(task);
    }

    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.taskService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() task: Partial<CreateTaskDto>): TaskDto {
        return this.taskService.update(id, task);
    }

    @Delete()
    clearAll(): void {
        this.taskService.clearAll();
    }
}
