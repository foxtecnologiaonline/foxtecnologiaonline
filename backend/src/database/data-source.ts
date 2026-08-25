import 'reflect-metadata';

// NOTE: dotenv is loaded by ConfigModule at runtime for the Nest app.
// This data source is used only by the TypeORM CLI (migrations), so we
// read directly from process.env / a local .env file if present.
import * as path from 'path';
import * as fs from 'fs';
import { DataSource, DataSourceOptions } from 'typeorm';

function loadDotEnv() {
  const envPath = path.resolve(__dirname, '../../.env');
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    value = value.replace(/^"(.*)"$/, '$1');
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadDotEnv();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'migrations/*{.ts,.js}')],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
};

export const AppDataSource = new DataSource(dataSourceOptions);
