import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../providers/prisma.service';
import { User } from '.prisma/client';
import * as bcrypt from 'bcrypt';
import { stringify } from 'querystring';

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
    password: string;
  }): Promise<boolean> {
    let user;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (await bcrypt.compare(input.password, user.hashedPass)) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }

    return false;
  }

// This will log the user in

  public async loginUser(input: {
    email: string;
    password: string;
  }): Promise<string> {
    const verified = await this.verifyUser({ email: input.email, password: input.password})
    if (verified == true){
      const user = await this.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })
      // NEED TO: generate random token
      const token = "aosjdfp9h3487"
      user.token = token
    return user.token
  }
  else {
    console.log("error")
    throw new Error()
  }
  }

//this will log the user out

public async logoutUser(input: {
  email: string;
}): Promise<string> {
  //find user by email
  const logUserOut = await this.prisma.user.findUnique({
    where: {
      email: input.email,
    },
  })
  //set user's token to null
    logUserOut.token = null
    return logUserOut.token
  }
}
