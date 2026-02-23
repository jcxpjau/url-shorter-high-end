import { Controller, Get, Param, Delete, Post, Body, ParseIntPipe } from '@nestjs/common';
import { DeleteUserUseCase } from '../../../../application/usecases/users/delete-user.usecase';
import { GetUserUseCase } from '../../../../application/usecases/users/get-user.usecase';


@Controller('users')
export class UserController {
    constructor(
        private readonly getUser: GetUserUseCase,
        private readonly deleteUser: DeleteUserUseCase,
    ) { }

    @Get(':id')
    async get(@Param('id', ParseIntPipe) id: number) {
        return this.getUser.execute({ id });
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.deleteUser.execute({ id });
    }
}