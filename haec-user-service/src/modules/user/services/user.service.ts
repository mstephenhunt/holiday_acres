import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../providers/prisma.service';
import { User } from '.prisma/client';
import * as bcrypt from 'bcrypt';
import { stringify } from 'querystring';
import * as Crypto from 'crypto'


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

  // This will either `verify the user` or `throw an exception`

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

// This will log the user ** IN **



  public async loginUser(input: {
    email: string;
    password: string;
  }): Promise<string> {
    const verified = await this.verifyUser({ email: input.email, password: input.password})
    if (verified == true){
      // Generates random 21 character token with Crypto
      const token = await this.randomString()
      await this.prisma.user.update({
        where: { email: input.email },
        data: { token: token} })
      return token
  }
  else {
    throw new Error("Problem with email/password")
  }
  }

  private async randomString(size = 21): Promise<string> {
    return Crypto
      .randomBytes(size)
      .toString('base64')
      .slice(0, size)
      // const printAddress = async () => {
      //   const a = await address;
      //   console.log(a);
      };

// This will log the user ** OUT **

    public async logoutUser(input: {
      email: string;
    }): Promise<void> {
      await this.prisma.user.update({
        where: { email: input.email },
        data: { token: null } })
      }
    }
