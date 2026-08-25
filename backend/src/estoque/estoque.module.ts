import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadeEstoque } from './entities/unidade-estoque.entity';
import { EstoqueService } from './estoque.service';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadeEstoque])],
  providers: [EstoqueService],
  exports: [EstoqueService],
})
export class EstoqueModule {}
