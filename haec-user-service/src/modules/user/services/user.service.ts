import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../providers/prisma.service';
import { User } from '.prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async getUser(input: { id: number }): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: input.id,
      },
    });
  }

  public async createUser(input: {
    email: string;
    name?: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
      },
    });
  }
}
