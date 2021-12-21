import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Email for entity user',
    type: String,
    example: 'hello@world.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Name for entity user',
    type: String,
    example: 'Peter',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Password for entity user',
    type: String,

    example: 'P@ssw0rd',
  })
  password?: string;

  @ApiPropertyOptional({
    description: 'Surname for entity user',
    type: String,
    example: 'Parker',
  })
  surname?: string;
}
