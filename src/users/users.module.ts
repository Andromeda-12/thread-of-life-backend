import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthModule } from '../auth/auth.module';
import { Memory } from '../memories/memories.model';
import { MemoriesModule } from 'src/memories/memories.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Memory]),
    //   SequelizeModule.forFeature([User, Role, UserRoles, Post]),
    // RolesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => MemoriesModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
