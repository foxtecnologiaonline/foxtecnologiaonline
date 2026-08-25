import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from './config/configuration';

import { AuthModule } from './auth/auth.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ConteudoModule } from './conteudo/conteudo.module';
import { EstoqueModule } from './estoque/estoque.module';
import { VendasModule } from './vendas/vendas.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { DevolucoesModule } from './devolucoes/devolucoes.module';
import { JobsModule } from './jobs/jobs.module';
import { EmailModule } from './email/email.module';
import { AdminModule } from './admin/admin.module';
import { ClienteModule } from './cliente/cliente.module';
import { ReabastecimentosModule } from './reabastecimentos/reabastecimentos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('database.url'),
        autoLoadEntities: true,
        synchronize: false,
        logging: config.get('nodeEnv') === 'development',
      }),
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>('redis.host'),
          port: config.get<number>('redis.port'),
        },
      }),
    }),
    ScheduleModule.forRoot(),
    EmailModule,
    AuthModule,
    ProdutosModule,
    ConteudoModule,
    EstoqueModule,
    VendasModule,
    PagamentoModule,
    DevolucoesModule,
    ReabastecimentosModule,
    JobsModule,
    AdminModule,
    ClienteModule,
  ],
})
export class AppModule {}
