import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/usuario.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarios: Repository<Usuario>,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existente = await this.usuarios.findOne({ where: { email: dto.email } });
    if (existente) {
      throw new ConflictException('Ja existe um usuario com este e-mail.');
    }
    const senhaHash = await bcrypt.hash(dto.senha, 10);
    const usuario = await this.usuarios.save(
      this.usuarios.create({
        nome: dto.nome,
        email: dto.email,
        senhaHash,
        tipo: dto.tipo,
      }),
    );
    return this.emitirToken(usuario);
  }

  async login(dto: LoginDto) {
    const usuario = await this.usuarios.findOne({ where: { email: dto.email } });
    if (!usuario) throw new UnauthorizedException('Credenciais invalidas.');
    const senhaValida = await bcrypt.compare(dto.senha, usuario.senhaHash);
    if (!senhaValida) throw new UnauthorizedException('Credenciais invalidas.');
    return this.emitirToken(usuario);
  }

  private emitirToken(usuario: Usuario) {
    const payload = { sub: usuario.id, email: usuario.email, tipo: usuario.tipo };
    return {
      accessToken: this.jwt.sign(payload),
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo },
    };
  }
}
