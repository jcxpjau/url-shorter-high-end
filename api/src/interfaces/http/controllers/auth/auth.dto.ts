import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@email.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'Julio Xavier' })
  name: string;

  @ApiProperty({ example: 'user@email.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  password: string;
}