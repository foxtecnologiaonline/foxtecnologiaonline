import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConteudoProduto } from './entities/conteudo-produto.entity';
import { ConteudoService } from './conteudo.service';
import { ConteudoController } from './conteudo.controller';
import { S3Service } from './storage/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConteudoProduto])],
  providers: [ConteudoService, S3Service],
  controllers: [ConteudoController],
  exports: [ConteudoService],
})
export class ConteudoModule {}
