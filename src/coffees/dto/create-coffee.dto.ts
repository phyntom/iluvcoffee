import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator'

export class CreateCoffeeDto {
  @IsString()
  readonly name: string

  @IsString()
  readonly brand: string

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  readonly flavors: string[]
}
