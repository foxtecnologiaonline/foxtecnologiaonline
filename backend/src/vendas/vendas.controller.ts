import { Body, Controller, Post } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { CheckoutDto } from './dto/checkout.dto';

@Controller()
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post('checkout')
  checkout(@Body() dto: CheckoutDto) {
    return this.vendasService.checkout(dto);
  }
}
