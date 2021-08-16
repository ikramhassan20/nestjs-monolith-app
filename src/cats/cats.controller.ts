import { Controller, Get, Post, HttpCode, HttpStatus, Req, Res, Header } from '@nestjs/common';
import { AppService } from '../app.service';
import { Request, Response } from 'express';

@Controller('cats')
export class CatsController {
    constructor(private readonly appService: AppService) {}

    @Post()
    @Header('Cache-Control', 'none')
    @HttpCode(200)
    create(@Res() response: Response): string{
        return this.appService.saveCats() + response.status(HttpStatus.CREATED).send();
    }

    @Get()
    findAll(@Res() res: Response ): string {
        return this.appService.getCats() + res.status(HttpStatus.OK).send();
    }
}
