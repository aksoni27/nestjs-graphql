import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthGuard } from './auth.guard';
import { JwtGuard } from './jwt.guard';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [AuthGuard, JwtGuard],
})
export class AuthModule {}
