import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    signIn(username: string, password: string) {
        return { token: '', expiresIn: 0 };
    }
}
