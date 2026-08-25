import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ConteudoService } from '../conteudo/conteudo.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('produtos')
export class ProdutosController {
  constructor(
    private readonly produtosService: ProdutosService,
    private readonly conteudoService: ConteudoService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateProdutoDto) {
    return this.produtosService.create(dto);
  }

  @Get()
  findAll(@Query('admin') admin?: string) {
    return admin === 'true' ? this.produtosService.findAllAdmin() : this.produtosService.findAtivos();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const produto = await this.produtosService.findOneOrFail(id);
    const conteudos = await this.conteudoService.listarPorProduto(id);
    return { ...produto, conteudos };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProdutoDto) {
    return this.produtosService.update(id, dto);
  }
}
