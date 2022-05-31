import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MemoryService } from './memories.service';
import { MemoriesController } from './memories.controller';
import { User } from '../users/users.model';
import { Memory } from './memories.model';
import { FilesModule } from '../files/files.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [MemoryService],
  controllers: [MemoriesController],
  imports: [
    SequelizeModule.forFeature([User, Memory]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    FilesModule,
  ],
  exports:[MemoryService]
})
export class MemoriesModule {}
