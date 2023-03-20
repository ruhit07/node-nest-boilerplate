import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const defaultConnection = (configService: ConfigService): TypeOrmModuleOptions => {
  const isDevelopment = configService.get('NODE_ENV') === 'development';

  return {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    autoLoadEntities: true,
    synchronize: isDevelopment,
  } as TypeOrmModuleOptions;
};

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: defaultConnection,
  }),
];
