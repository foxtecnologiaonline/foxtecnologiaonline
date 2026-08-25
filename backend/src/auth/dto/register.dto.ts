import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  senha: string;

  @IsIn(['admin', 'cliente'])
  tipo: 'admin' | 'cliente';
}
