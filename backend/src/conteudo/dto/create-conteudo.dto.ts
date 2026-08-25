import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateConteudoDto {
  @IsIn(['manual', 'cartilha', 'video'])
  tipo: 'manual' | 'cartilha' | 'video';

  @IsString()
  titulo: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  ordem?: number;
}
