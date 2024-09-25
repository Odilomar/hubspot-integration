import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetContactsDto {
  @ApiPropertyOptional({
    description: 'The number of contacts to return. Defaults to 10.',
    default: 10,
  })
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional({
    description:
      'Used to get the next page of results. This is the value of the after query parameter returned in the response of the previous API call.',
    default: null,
  })
  @IsString()
  @IsOptional()
  after: string;
}
