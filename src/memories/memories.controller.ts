import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { MemoryService } from './memories.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('memories')
export class MemoriesController {
  constructor(private memoryService: MemoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  createMemory(@Body() dto: CreateMemoryDto, @UploadedFile() image) {
    return this.memoryService.create(dto, image);
  }

  @Get('/:id')
  getMemory(@Param('id') id: number) {
    return this.memoryService.getMemoryById(id)
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  editMemory(@Param('id') id: number, @Body() memory, @UploadedFile() image) {
    return this.memoryService.editMemory(id, memory, image)
  }

  @Delete('/:id')
  deleteMemory(@Param('id') id: number) {
    return this.memoryService.deleteMemory(id)
  }
}
