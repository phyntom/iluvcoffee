import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Delete,
  ParseIntPipe,
  HttpException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common'

import { CoffeesService } from './coffees.service'

import { Coffee } from 'src/entities/coffee.entity'

import { CreateCoffeeDto } from './dto/create-coffee.dto'

import { UpdateCoffeeDto } from './dto/update-coffee.dto'

@Controller('coffees')
export class CoffeesController {
  constructor(private coffeeService: CoffeesService) {}

  @Get()
  async findAll(): Promise<Coffee[]> {
    return await this.coffeeService.findAll()
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
  ): any {
    return this.coffeeService.findOne(id)
  }

  @Post()
  create(@Body() body: CreateCoffeeDto) {
    try {
      this.coffeeService.create(body)

      return body
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }
  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
    @Body() body: UpdateCoffeeDto,
  ) {
    const updatedCoffee = await this.coffeeService.update(id, body)
    if (updatedCoffee) {
      return updatedCoffee
    } else {
      throw new NotFoundException(`Coffee #${id} not found`)
    }
  }
  @Delete(':id')
  remove(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
  ) {
    const removedCoffee = this.coffeeService.remove(id)

    if (removedCoffee) {
      return removedCoffee
    } else {
      throw new HttpException('Coffee not found', HttpStatus.NOT_FOUND)
    }
  }
}
