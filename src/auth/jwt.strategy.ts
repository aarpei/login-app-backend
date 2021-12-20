import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'shared/inteface/jwt-payload.model';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { UserService } from 'src/user/user.service';
import { buildFindOneOptions } from 'src/utilities/Utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'sistemas',
    });
  }

  async validate(payload: JwtPayload) {
    const user = this.userService.findByPropertie(
      buildFindOneOptions(`id:${payload.userId}`),
    );
    if (!user) {
      //TODO: IMPLEMENT ERROR
      throw new HttpExceptionFilter();
    }
    return user;
  }
}
