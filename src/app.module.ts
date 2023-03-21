import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envConfigValidation } from './config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: envConfigValidation,
    }),

    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static nodeEnv: string;
  static port: number;
  static apiPrefix: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.nodeEnv = this.configService.get('NODE_ENV');
    AppModule.port = +this.configService.get('API_PORT');
    AppModule.apiPrefix = this.configService.get('API_PREFIX');
  }
}
