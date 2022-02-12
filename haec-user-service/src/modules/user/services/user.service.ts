import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../providers/prisma.service';
import { User } from '.prisma/client';
import * as bcrypt from 'bcrypt';

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
    password: string;
    name?: string;
  }): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(input.password, saltRounds);

    return this.prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        hashedPass: hashedPassword,
      },
    });
  }

  /**
   * This will either verify the user or throw an exception
   */
  public async verifyUser(input: {
    email: string;
    password: string
  }): Promise<void> {
    let user;
    try {
      user = await this.prisma.user.findUnique({
        where: {
          email: input.email
        }
      });
    } catch (error) {
      throw new UnauthorizedException('Password and email don\'t match an account');
    }

    if (await bcrypt.compare(input.password, user.hashedPass)) {
      return;
    }

    throw new UnauthorizedException('Password and email don\'t match an account');
  }
}
