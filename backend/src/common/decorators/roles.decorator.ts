import { SetMetadata } from '@nestjs/common';
import { TipoUsuario } from '../../usuarios/usuario.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TipoUsuario[]) => SetMetadata(ROLES_KEY, roles);
