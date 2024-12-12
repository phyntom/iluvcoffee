import { Injectable, Logger } from '@nestjs/common'

import { Coffee } from 'src/entities/coffee.entity'

@Injectable()
export class CoffeesService {
  coffees: Coffee[] = [
    {
      id: 1,
      name: 'Morning Bliss',
      brand: 'Sunrise Roasters',
      flavors: ['vanilla', 'caramel', 'hazelnut'],
    },
    {
      id: 2,
      name: 'Dark Roast Supreme',
      brand: 'Night Owl Coffee',
      flavors: ['dark chocolate', 'smoky', 'earthy'],
    },
    {
      id: 3,
      name: 'Espresso Royale',
      brand: 'Royal Beans',
      flavors: ['bold', 'nutty', 'spiced'],
    },
    {
      id: 4,
      name: 'Hazel Harmony',
      brand: 'Nutty Delights',
      flavors: ['hazelnut', 'cinnamon', 'creamy'],
    },
    {
      id: 5,
      name: 'Tropical Brew',
      brand: 'Island Beans',
      flavors: ['coconut', 'pineapple', 'toffee'],
    },
  ]

  logger = new Logger('CoffeesService', { timestamp: true })

  findAll() {
    this.logger.log(`${this.coffees.length} Coffees retreived successfully`)

    return this.coffees
  }
  findOne(id: number): Coffee | undefined {
    return this.coffees.find((item) => item.id === id)
  }
  create(createCoffeeDto: any) {
    const newCoffee = { id: this.coffees.length + 1, ...createCoffeeDto }

    this.logger.log('New coffee created successfully')

    return this.coffees.push(newCoffee)
  }
  update(id: number, updateCoffeeDto: any): Coffee | undefined {
    const existingCoffee = this.findOne(id)

    if (existingCoffee) {
      const updatedCoffee = { ...existingCoffee, ...updateCoffeeDto }

      this.coffees = this.coffees.map((item) => (item.id === id ? updatedCoffee : item))

      return updatedCoffee
    }

    return existingCoffee
  }
  remove(id: number): Coffee | undefined {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === id)

    if (coffeeIndex >= 0) {
      return this.coffees.splice(coffeeIndex, 1)[0]
    }

    return undefined
  }
}
