import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { emailid, password } = ctx.req.body.variables;
    const user: UserEntity = await this.userService.getUserByEmailId(emailid);
    if (user && user.password === password) {
      ctx.user = user;
      return true;
    } else {
      throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);
    }
  }
}
