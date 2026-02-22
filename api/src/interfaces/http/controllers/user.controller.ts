import { Controller, Get, Param, Delete } from '@nestjs/common';
import { GetUserUseCase } from '../../../application/usecases/users/get-user.usecase';
import { DeleteUserUseCase } from '../../../application/usecases/users/delete-user.usecase';

@Controller('users')
export class UserController {
    constructor(
        private readonly getUser: GetUserUseCase,
        private readonly deleteUser: DeleteUserUseCase,
    ) { }

    @Get(':id')
    async get(@Param('id') id: string) {
        return this.getUser.execute({ id });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.deleteUser.execute({ id });
    }
}