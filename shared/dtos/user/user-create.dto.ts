import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../inteface/user.model';

export class CreateUserDto implements User {
  @ApiProperty({
    description: 'Email for entity user',
    type: String,
    example: 'hello@world.com',
  })
  email: string;

  @ApiProperty({
    description: 'Name for entity user',
    type: String,
    example: 'Peter',
  })
  name: string;

  @ApiProperty({
    description: 'Password for entity user',
    type: String,
    example: 'P@ssw0rd',
  })
  password: string;

  @ApiProperty({
    description: 'Surname for entity user',
    type: String,
    example: 'Parker',
  })
  surname: string;
}
