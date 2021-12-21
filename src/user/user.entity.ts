import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { User } from 'shared/inteface/user.model';
import { crypt } from 'src/utilities/Utils';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity implements User {
  @ApiProperty({ example: '0658' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'hello@world.com' })
  @Column('varchar')
  email: string;

  @ApiProperty({ example: 'Peter' })
  @Column('varchar')
  name: string;

  @ApiProperty({ example: 'P@ssw0rd' })
  @Column('varchar')
  password: string;

  @ApiProperty({ example: 'Parker' })
  @Column('varchar')
  surname: string;

  @BeforeInsert()
  async hashPassword() {
    await crypt(this.password).then((password) => (this.password = password));
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
  }
}
