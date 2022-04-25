import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/modules/user/user.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('can create a user', async () => {
    const response = await request(app.getHttpServer()).post('/user').send({
      email: 'fake.email.com',
      name: 'Mocky McMockerson',
      password: 'password',
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      id: 1,
      email: 'fake.email.com',
      name: 'Mocky McMockerson',
    });
  });

  it('can get a user', async () => {
    const response = await request(app.getHttpServer()).get('/user/1');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      id: 1,
      email: 'fake.email.com',
      name: 'Mocky McMockerson',
    });
  });

  it('can verify that a user passes', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/verify')
      .send({
        email: 'fake.email.com',
        password: 'password',
      });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(true);
  });

  it('can verify that a user fails', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/verify')
      .send({
        email: 'fake.email.com',
        name: 'Mocky McMockerson',
        password: 'badpw',
      });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(false);
  });
});
