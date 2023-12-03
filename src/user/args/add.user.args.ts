import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddUserArgs {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  role: string;
}
