import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly users: UserDto[] = [{ id: '1', username: 'user', password: '1234' }];

    create(user: CreateUserDto) {
        const userAlreadyHere = this.users.filter((u) => u.username === user.username);

        if (userAlreadyHere.length > 0) {
            throw new HttpException(
                `User with username ${user.username} already exists`,
                HttpStatus.CONFLICT,
            );
        }

        const newUser = {
            ...user,
            id: uuid(),
            password: bcryptHashSync(user.password, 10),
        };

        this.users.push(newUser);
        return this.users;
    }

    findByUserName(username: string): UserDto | undefined {
        return this.users.find((user) => user.username === username);
    }
}
