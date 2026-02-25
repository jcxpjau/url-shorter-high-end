import { Controller, Delete, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { DeleteUserUseCase } from '../../../../application/usecases/users/delete-user.usecase';
import { GetUserUseCase } from '../../../../application/usecases/users/get-user.usecase';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('users')
export class UserController {
    constructor(
        private readonly getUser: GetUserUseCase,
        private readonly deleteUser: DeleteUserUseCase,
    ) { }

    @Get(':id')
    async get(@Param('id', ParseIntPipe) id: number, @Req() req: any ) {
        return this.getUser.execute({ id: id, userId: req.user.id} );
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
        return this.deleteUser.execute({ id: id, userId: req.user.id});
    }
}   