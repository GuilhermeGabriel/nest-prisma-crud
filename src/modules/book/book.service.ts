import { Injectable, BadRequestException } from '@nestjs/common';
import { BookDTO } from './book.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) { }

  async create(data: BookDTO) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code
      }
    });

    if (bookExists) {
      // throw new Error('Book already exists');
      throw new BadRequestException(
        'Item already exists'
      )
    }

    const book = await this.prisma.book.create({
      data
    });

    return book;
  }

  async findAll() {
    return await this.prisma.book.findMany();;
  }

  async update(id: string, data: BookDTO) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id
      }
    });

    if (!bookExists) {
      throw new BadRequestException(
        'Book does not exist'
      )
    }

    return await this.prisma.book.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id
      }
    });

    if (!bookExists) {
      throw new BadRequestException(
        'Book does not exist'
      )
    }

    return await this.prisma.book.delete({  where: { id } });
  }
}
