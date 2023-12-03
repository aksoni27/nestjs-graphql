import { GqlExecutionContext } from '@nestjs/graphql';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(Context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(Context).getContext();
    const authorizationHeader = ctx.req.headers.authorization;
    if (authorizationHeader) {
      try {
        const token = authorizationHeader.split(' ')[1];
        const user = jwt.verify(token, 'key');
        ctx.user = user;
      } catch (err) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
      return true;
    } else {
      return false;
    }
  }
}
