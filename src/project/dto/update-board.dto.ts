import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty()
  @IsNotEmpty()
  board: string;
}
