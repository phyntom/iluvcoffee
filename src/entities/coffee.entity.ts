import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Flavor } from './flavor.entity'

@Entity('coffees')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  brand: string

  @JoinTable({ name: 'coffees_flavors' })
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, {
    cascade: true, // 👈 or optionally just insert or update ['insert']
  })
  flavors: Flavor[]
}
