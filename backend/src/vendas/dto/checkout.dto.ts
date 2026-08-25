import { IsEmail, IsUUID } from 'class-validator';

export class CheckoutDto {
  @IsUUID()
  produtoId: string;

  @IsEmail()
  compradorEmail: string;
}
