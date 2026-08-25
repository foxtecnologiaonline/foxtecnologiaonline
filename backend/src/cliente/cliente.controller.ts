import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, AuthenticatedUser } from '../common/decorators/current-user.decorator';

@Controller()
@UseGuards(JwtAuthGuard)
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get('minhas-compras')
  minhasCompras(@CurrentUser() usuario: AuthenticatedUser) {
    return this.clienteService.minhasCompras(usuario.email);
  }
}
