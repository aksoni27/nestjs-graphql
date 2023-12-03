import { GqlExecutionContext } from '@nestjs/graphql';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

export const ROLES = {
  ADMIN: 'ADMIN',
  NORMAL_USER: 'NORMAL_USER',
};

@Injectable()
export class RoleGuard implements CanActivate {
  roles: string[];
  constructor(roles: string[]) {
    this.roles = roles;
  }
  canActivate(Context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(Context).getContext();
    const user = ctx.user;
    const hasRequiredRole = this.roles.some((role) => role === user.role);
    return hasRequiredRole;
  }
}
