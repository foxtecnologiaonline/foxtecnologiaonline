import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDevolucaoDto {
  @IsUUID()
  vendaId: string;

  @IsOptional()
  @IsString()
  motivo?: string;
}
