/* eslint-disable @typescript-eslint/no-var-requires */

import { PrismaClient } from '@prisma/client';
import { Config } from '@jest/types';
import { nanoid } from 'nanoid';
import { ConfigService } from '@nestjs/config';
const NodeEnvironment = require('jest-environment-node');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

class PrismaTestEnvironment extends NodeEnvironment {
  schema: string;
  databaseUrl: string;

  constructor(config: Config.ProjectConfig) {
    super(config);

    // Generate a unique schema identifier for this text context
    this.schema = `test_${nanoid()}`;

    // Generate the pg connection string for ther test schema
    this.databaseUrl = 'file:./test.db';
  }

  async setup() {
    process.env.DATABASE_URL = this.databaseUrl;
    this.global.process.env.DATABASE_URL = this.databaseUrl;

    const asyncExec = util.promisify(exec);
    await asyncExec('yarn prisma migrate dev');

    return super.setup();
  }

  async teardown() {
    const asyncExec = util.promisify(exec);
    await asyncExec('npx prisma migrate reset -f');
  }
}

export default PrismaTestEnvironment;
