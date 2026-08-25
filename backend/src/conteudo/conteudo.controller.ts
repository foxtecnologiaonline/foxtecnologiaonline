import {
  BadRequestException,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConteudoService } from './conteudo.service';
import { CreateConteudoDto } from './dto/create-conteudo.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Body } from '@nestjs/common';

@Controller('produtos/:id/conteudos')
export class ConteudoController {
  constructor(private readonly conteudoService: ConteudoService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @UseInterceptors(FileInterceptor('arquivo'))
  async criar(
    @Param('id', ParseUUIDPipe) produtoId: string,
    @Body() dto: CreateConteudoDto,
    @UploadedFile() arquivo?: Express.Multer.File,
  ) {
    if (!arquivo) {
      throw new BadRequestException('Arquivo obrigatorio (campo "arquivo").');
    }
    return this.conteudoService.criar(produtoId, dto, arquivo);
  }
}
