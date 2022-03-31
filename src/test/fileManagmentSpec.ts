import { promises as fs } from 'fs';
import path from 'path';
import fileManagment from '../fileManagment';

describe('Test image processing', (): void => {
  
  it('existing fileManagment, valid size values', async (): Promise<void> => {
    await fileManagment.createEditedImage(
      'encenadaport', 
     '120', 
      '120' 
    );
    const resizedImagePath: string = path.resolve(
      fileManagment.editedImage,
      `encenadaport-120x120.jpg`
    );
    let errorfileManagment: null | string = '';
    await fs.access(resizedImagePath);
    errorfileManagment = null;
    expect(errorfileManagment).toBeNull();
  });
});

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    fileManagment.editedImage,
    'encenadaport-120x120.jpg'
  );
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
});
