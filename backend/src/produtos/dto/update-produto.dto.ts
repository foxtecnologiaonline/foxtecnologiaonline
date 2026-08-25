import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateProdutoDto } from './create-produto.dto';

export class UpdateProdutoDto extends PartialType(
  OmitType(CreateProdutoDto, ['estoqueLotePadrao'] as const),
) {}
