import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Coffee } from 'src/entities/coffee.entity'
import { Repository } from 'typeorm'
import { CreateCoffeeDto } from './dto/create-coffee.dto'
import { UpdateCoffeeDto } from './dto/update-coffee.dto'
import { Flavor } from '../entities/flavor.entity'

@Injectable()
export class CoffeesService {
  logger = new Logger('CoffeesService', { timestamp: true })

  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {
  }

  async findAll() {
    const coffees = await this.coffeeRepository.find({
      relations: {
        flavors: true,
      },
    })
    this.logger.log(`${coffees.length} coffees retreived successfully`)
    return coffees
  }

  async findOne(id: number) {
    const foundCoffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: {
        flavors: true,
      },
    })
    if (!foundCoffee) {
      throw new NotFoundException(`Coffee #${id} not found`)
    }
    return foundCoffee
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    try {
      // get flavors from the createCoffeeDto and preload them
      const flavors = await this.preloadFlavors(createCoffeeDto.flavors)
      const coffee = this.coffeeRepository.create({
        ...createCoffeeDto,
        flavors,
      })
      this.logger.log('New coffee created successfully')
      return this.coffeeRepository.save(coffee)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    // since everything is optional, we need to check if flavors are provided
    const flavors = updateCoffeeDto.flavors && await this.preloadFlavors(updateCoffeeDto.flavors)
    const coffee = await this.coffeeRepository.preload({
      id: id,
      ...updateCoffeeDto,
      flavors,
    })
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`)
    }
    return this.coffeeRepository.save(coffee)
  }

  async remove(id: number) {
    const coffee = await this.findOne(id)
    return this.coffeeRepository.remove(coffee)
  }

  /**
   * Preload flavors meaning check if the flavors already exist in the database
   * if not create them and return the flavors
   * @param flavorNames
   */
  async preloadFlavors(flavorNames: string[]): Promise<Flavor[]> {
    const flavors: Flavor[] = []
    for (const flavorName of flavorNames) {
      let flavor = await this.flavorRepository.findOneBy({ name: flavorName })
      if (!flavor) {
        flavor = this.flavorRepository.create({ name: flavorName })
        await this.flavorRepository.save(flavor)
      }
      flavors.push(flavor)
    }
    return flavors
  }
}
