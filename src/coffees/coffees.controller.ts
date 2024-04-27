import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Patch,
  Delete,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  async findAll() {
    // const { limit, offset } = paginationQuery;
    return await this.coffeesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.coffeesService.findOne(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: any) {
    return await this.coffeesService.create(body);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return await this.coffeesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
