import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @ApiProperty({
    description: 'Acces token to validate authority',
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  accessToken: string;
}
