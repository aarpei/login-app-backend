import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({
    description: 'Email for entity user',
    type: String,
    example: 'hello@world.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password for entity user',
    type: String,
    example: 'P@ssw0rd',
  })
  password: string;
}
