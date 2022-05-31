import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { Memory } from 'src/memories/memories.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const defaultAvatar = 'default-avatar.png'
    const user = await this.userRepository.create({...dto, avatar: defaultAvatar});
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });

    const returnedUser = {
      id: user.id,
      email: user.email,
      login: user.login,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      memories: user.memories,
    };

    return returnedUser;
  }

  async getUsersMemories(id: number) {
    const user = await this.getUserById(id)
    return user.memories
  }
}
