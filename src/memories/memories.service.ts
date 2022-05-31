import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { Memory } from './memories.model';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MemoryService {
  constructor(
    @InjectModel(Memory) private memoriesRepository: typeof Memory,
    private fileService: FilesService,
    private usersService: UsersService,
  ) {}

  async create(dto: CreateMemoryDto, image: any) {
    const fileName = await this.fileService.createFile(image);

    const description = this.getDescription(dto.content);
    const memory = await this.memoriesRepository.create({
      ...dto,
      description,
      imageUrl: fileName,
    });
    return memory;
  }

  async getMemories(userId: number) {
    await this.usersService.getUserById(userId);
  }

  async getMemoryById(id: number) {
    try {
      const memory = await this.memoriesRepository.findOne({
        where: { id },
        include: { all: true },
      });
      return memory;
    } catch {
      throw new HttpException(
        `Такого воспоминания c id ${id} не существует`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteMemory(id: number) {
    try {
      const memory = await this.memoriesRepository.findOne({
        where: { id },
        include: { all: true },
      });
      await memory.destroy();
    } catch {
      throw new HttpException(
        `Такого воспоминания c id ${id} не существует`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async editMemory(id: number, newMemory, image) {
    try {
      const memory = await this.memoriesRepository.findOne({
        where: { id },
        include: { all: true },
      });

      if (image) {
        const fileName = await this.fileService.createFile(image);
        memory.set({
          imageUrl: fileName
        })
      }

      const description = this.getDescription(newMemory.content);

      memory.set({
        title: newMemory.title,
        content: newMemory.content,
        date: newMemory.date,
        description: description,
      });

      await memory.save()
    } catch(e) {
      console.log(e);
      
      throw new HttpException(
        `Такого воспоминания c id ${id} не существует`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private getDescription(content: string) {
    const maxDescriptionLength = 50;
    return content.substring(0, maxDescriptionLength - 3) + '...';
  }
}
