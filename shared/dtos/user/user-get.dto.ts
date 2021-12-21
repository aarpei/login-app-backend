import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({
    description: 'Id for entity user',
    type: String,
    example: '0658',
  })
  id: string;

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
    description: 'Surname for entity user',
    type: String,
    example: 'Parker',
  })
  surname: string;
}
