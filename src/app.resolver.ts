import { Query, Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UserService } from './user/user.service';
import { UseGuards, Response } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { AddUserArgs } from './user/args/add.user.args';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from './user/entity/user.entity';
import { JwtGuard } from './auth/jwt.guard';
import { ROLES, RoleGuard } from './auth/roles.guard';

@Resolver((of) => String)
export class AppResolver {
  constructor(private readonly userService: UserService) {}
  @Query((returns) => String)
  index(): string {
    return 'NestJs GraphQL Server';
  }

  @Query((returns) => String)
  @UseGuards(JwtGuard, new RoleGuard([ROLES.ADMIN]))
  securedAdminData() {
    return 'Secured Admin Data';
  }

  @Query((returns) => String)
  @UseGuards(JwtGuard, new RoleGuard([ROLES.ADMIN, ROLES.NORMAL_USER]))
  securedNormalUserData() {
    return 'Secured Normal_User Data';
  }
  @Query((returns) => String)
  @UseGuards(AuthGuard)
  login(
    @Args({ name: 'emailId', type: () => String }) emailId: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: UserEntity,
  ) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, 'key', {
      expiresIn: '1h',
    });
    return token;
  }

  @Mutation((returns) => String, { name: 'registerUser' })
  async addUser(
    @Args('addUserArgs') addUserArgs: AddUserArgs,
  ): Promise<string> {
    return await this.userService.registerUser(addUserArgs);
  }
}
