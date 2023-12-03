import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepo: Repository<UserEntity>,
  ) {}

  async getUserByEmailId(emailId: string) {
    return await this.userRepo.findOne({ where: { email: emailId } });
  }

  async registerUser(user: any): Promise<string> {
    let newUser: UserEntity = new UserEntity();
    newUser = { ...user };
    await this.userRepo.save(newUser);
    return 'User Registered Successfully';
  }
}
