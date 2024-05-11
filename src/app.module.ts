import { Module } from '@nestjs/common';

import { UploadModule } from './upload/upload.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [UploadModule,
    MulterModule.register({
      dest: './oussama',
    }),
    ConfigModule.forRoot(
    { 
      //make configServie available gobally without needing to implements of configModule
      isGlobal:true
    }
  ),TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    useFactory: async (config) =>({
      type: config.get('DB_TYPE'),
      host: config.get('DB_HOST'),
      port: parseInt(config.get('DB_PORT')), // Ensure port is cast as integer
      username: config.get('DB_USERNAME'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_DATABASE'),
      autoLoadEntities:true,
      //when the app start will do sync with db, used only on dev stage
      synchronize: true,
    }),
    inject:[ConfigService]
}),],
  controllers: [],
  providers: [],
})
export class AppModule {}
