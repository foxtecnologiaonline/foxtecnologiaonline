import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  preco: number;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsOptional()
  @IsIn(['rascunho', 'ativo', 'inativo'])
  status?: 'rascunho' | 'ativo' | 'inativo';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  estoqueLotePadrao?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limiarReabastecimento?: number;
}
