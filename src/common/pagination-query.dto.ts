import { IsOptional, IsPositive } from 'class-validator'
import { Type } from 'class-transformer'

export class PaginationQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit: number

  @Type(() => Number)
  @IsOptional()
  offset: number

}