import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('check-cookie')
  checkCookie(@Req() req: any) {
    // Check if the 'token' cookie is set
    const tokenCookie = req.cookies['token'];

    if (tokenCookie) {
      // The 'token' cookie is set
      return 'Cookie is set';
    } else {
      // The 'token' cookie is not set
      return 'Cookie is not set';
    }
  }
}
