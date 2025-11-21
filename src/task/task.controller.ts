import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTaskDto, TaskDto } from './task.dto';
import { TaskService } from './task.service';
import type { FindAllParameters } from './task.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
    @Get()
    findAll(@Query() params: FindAllParameters): TaskDto[] {
        return this.taskService.findAll(params);
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.taskService.findById(id);
    }

    @Post()
    create(@Body() task: CreateTaskDto): TaskDto {
        return this.taskService.create(task);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() task: Partial<CreateTaskDto>): TaskDto {
        return this.taskService.update(id, task);
    }

    @Delete()
    clearAll(): void {
        this.taskService.clearAll();
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskService.remove(id);
    }
}
