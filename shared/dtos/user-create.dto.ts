import { User } from '../inteface/user.model';

export class CreateUserDto implements User {
  email: string;
  name: string;
  password: string;
  surname: string;
}
