import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Coffee } from 'src/entities/coffee.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CoffeesService {
  logger = new Logger('CoffeesService', { timestamp: true })

  constructor(@InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>) {}

  async findAll() {
    const coffees = await this.coffeeRepository.find()
    this.logger.log(`${coffees.length} Coffees retreived successfully`)
    return coffees
  }
  async findOne(id: number) {
    const foundCoffee = await this.coffeeRepository.findOne({
      where: { id },
    })
    if (!foundCoffee) {
      throw new NotFoundException(`Coffee #${id} not found`)
    }
    return foundCoffee
  }
  async create(createCoffeeDto: any) {
    try {
      const newCoffee = { ...createCoffeeDto }
      this.logger.log('New coffee created successfully')
      const createdCoffee = await this.coffeeRepository.save(newCoffee)
      return createdCoffee
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
  async update(id: number, updateCoffeeDto: any) {
    const coffee = await this.coffeeRepository.preload({
      id: id,
      ...updateCoffeeDto,
    })
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`)
    }
    return coffee
  }
  async remove(id: number) {
    const coffee = await this.findOne(id)
    return this.coffeeRepository.remove(coffee)
  }
}
