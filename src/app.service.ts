import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getCats(): string {
    return 'Here we go Cats using App Service! This action returns all cats.';
  }
  saveCats(): string {
    return 'This action save the cat.';
  }
}
