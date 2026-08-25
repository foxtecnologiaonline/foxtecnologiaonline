import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { DevolucoesService } from './devolucoes.service';
import { CreateDevolucaoDto } from './dto/create-devolucao.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, AuthenticatedUser } from '../common/decorators/current-user.decorator';

@Controller('devolucoes')
@UseGuards(JwtAuthGuard)
export class DevolucoesController {
  constructor(private readonly devolucoesService: DevolucoesService) {}

  @Post()
  solicitar(@Body() dto: CreateDevolucaoDto, @CurrentUser() usuario: AuthenticatedUser) {
    return this.devolucoesService.solicitar(dto, usuario);
  }

  @Get(':id')
  buscar(@Param('id', ParseUUIDPipe) id: string) {
    return this.devolucoesService.buscarPorIdOuFalha(id);
  }
}
