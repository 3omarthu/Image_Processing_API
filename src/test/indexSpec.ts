import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';
import fileManagment from '../fileManagment';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');

      expect(response.status).toBe(200);
    });
  });

 

  describe('endpoint: /test', (): void => {
    it('returns 404', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/test');

      expect(response.status).toBe(404);
    });
  });
});

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    fileManagment.editedImage,
    'encenadaport-180x180.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
  }
});

describe('endpoint: /api/images', (): void => {
  it('valid args', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?fileManagmentname=encenadaport'
    );

    expect(response.status).toBe(200);
  });

  it('valid args', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?fileManagmentname=encenadaport&width=180&height=180'
    );

    expect(response.status).toBe(200);
  });

  it('invalid args', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?fileManagmentname=encenadaport&width=-250&height=250'
    );

    expect(response.status).toBe(200);
  });

  it('no arguments', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/api/images');

    expect(response.status).toBe(200);
  });
});