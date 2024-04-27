import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [];
  constructor() {
    this.init();
  }

  async findAll(): Promise<Coffee[]> {
    return this.coffees;
  }

  async findOne(id: string): Promise<Coffee | undefined> {
    const existingCoffee = this.coffees.find((item) => item.id === id);
    if (!existingCoffee) {
      throw new NotFoundException(`Entity with id: ${id} could not be found`);
    }
    return existingCoffee;
  }

  async create(createCoffeeDto: any): Promise<Coffee> {
    const createdCoffee = new Coffee(
      randomUUID(),
      createCoffeeDto.name,
      createCoffeeDto.brand,
      createCoffeeDto.flavors,
    );
    this.coffees.push(createdCoffee);
    return createdCoffee;
  }

  async update(id: string, updateCoffeeDto: any): Promise<Coffee> {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === id);
    if (coffeeIndex >= 0) {
      this.coffees[coffeeIndex] = {
        ...this.coffees[coffeeIndex],
        ...updateCoffeeDto,
      };
      return this.coffees[coffeeIndex];
    }
    throw new HttpException(
      `Coffee with id: ${id} could not be found`,
      HttpStatus.NOT_FOUND,
    );
  }
  async remove(id: string): Promise<void> {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    } else
      throw new HttpException(
        `Coffee with id: ${id} could not be found`,
        HttpStatus.NOT_FOUND,
      );
  }

  init() {
    this.coffees.push(
      new Coffee(
        'c4fa6417-1e1b-4bbd-b82a-634ad1d01eb0',
        'Ethiopian Yirgacheffe',
        'BrandA',
        ['Floral', 'Citrus', 'Berry'],
      ),
      new Coffee(
        'ae54a330-1029-43bb-9b52-bd53df9348d0',
        'Colombian Supremo',
        'BrandB',
        ['Chocolate', 'Nutty', 'Balanced'],
      ),
      new Coffee(
        '62ac4ccc-14a4-42b1-98b4-c1109c336422',
        'Kenyan AA',
        'BrandC',
        ['Fruity', 'Wine-like', 'Complex'],
      ),
      new Coffee(
        '90ccdabb-4671-4ef2-ad23-9750d2ebf07e',
        'Guatemalan Antigua',
        'BrandD',
        ['Chocolate', 'Spicy', 'Full-bodied'],
      ),
      new Coffee(
        '1d7053f9-236f-49f2-aa45-a5e7a9d359f1',
        'Brazilian Santos',
        'BrandE',
        ['Nutty', 'Sweet', 'Mild'],
      ),
      new Coffee(
        'e3b3dda5-aba4-4b59-a63c-21f57ffcae09',
        'Costa Rican Tarrazu',
        'BrandF',
        ['Bright', 'Citrus', 'Clean'],
      ),
      new Coffee(
        'd45cecf9-ad91-4a0c-bbff-55d14f1f55b1',
        'Sumatra Mandheling',
        'BrandG',
        ['Earthy', 'Herbal', 'Bold'],
      ),
      new Coffee(
        'fb3d1489-cd0e-4022-94ff-4b78cbd75d77',
        'Mexican Altura',
        'BrandH',
        ['Nutty', 'Chocolate', 'Mild acidity'],
      ),
      new Coffee(
        '335420b5-d291-4756-9a9f-cc101b0ee936',
        'Panama Boquete',
        'BrandI',
        ['Floral', 'Bright', 'Delicate'],
      ),
      new Coffee(
        '5100188b-0902-4b23-8c9c-958374aaa039',
        'Hawaiian Kona',
        'BrandJ',
        ['Fruity', 'Floral', 'Smooth'],
      ),
    );
  }
}
