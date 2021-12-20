import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'shared/inteface/jwt-payload.model';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { buildFindOneOptions } from 'src/utilities/Utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.findByPropertie(
      buildFindOneOptions(`email:${email}`),
    );
    console.log(user);
    if (!user) {
      //TODO: IMPLEMENT ERROR
      throw new Error();
    }
    return await user.validatePassword(password);
  }

  async generateAccessToken(email: string) {
    const user: UserEntity = await this.usersService.findByPropertie(
      buildFindOneOptions(`email:${email}`),
    );
    const jwtPayload: JwtPayload = { userId: user.id };
    return {
      accessToken: this.jwtService.sign(jwtPayload),
    };
  }
}
