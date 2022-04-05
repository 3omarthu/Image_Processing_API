import {promises as fs} from 'fs';
import path from 'path';
import sharp from 'sharp';


export default class fileManagment {
  static imagePath = path.resolve(__dirname, '../content/images');

  /**
 * check Image Availability.
 * @param {number} num1 The first number.
 * @param {number} num2 The second number.
 * @return {number} The sum of the two numbers.
 */
  static async checkImageAvailability(imageName?: string): Promise<string[]> {
    try {
      let image = await fs.readdir(fileManagment.imagePath);
      image = image.map((imageName: string): string => imageName.split('.')[0]);
      return (image);
    } catch {
      return [];
    }
  }

  static editedImage = path.resolve(__dirname, '../content/SecondFolder');
  static async createEditedImage(imageName: string | undefined, width: string | undefined, height: string | undefined): Promise<null | string> {
    if (!imageName || !width || !height) {
      return null;
    }
    const filePathFull: string = path.resolve(
        fileManagment.imagePath,
        `${imageName}.jpg`,
    );
    console.log(filePathFull);

    const filePathSecondFolder: string = path.resolve(
        fileManagment.editedImage,
        `${imageName}-${width}-${height}.jpg`,
    );
    console.log(filePathSecondFolder);

    const filePath = filePathFull;
    const newFilePath = filePathSecondFolder;
    const newWidth = parseInt(width);
    const newHeight = parseInt(height);

    return await fileManagment.processingImage(
        filePath,
        newFilePath,
        newWidth,
        newHeight,
    );
  }

  static async isImageAvailable(imageName: string | undefined, width: string | undefined, height: string | undefined): Promise< boolean> {
    if (!imageName || !width || !height) {
      return false;
    }
    const filePathSecondFolder: string = path.resolve(
        fileManagment.editedImage,
        `${imageName}-${width}-${height}.jpg`,
    );
    try {
      fs.access(filePathSecondFolder);
      return true;
    } catch {
      return false;
    }
  }

  static processingImage = async (
      filePath: string, newFilePath: string, width: number,
      height: number,
  ): Promise<null| string> => {
    console.log(filePath);
    try {
      await sharp(filePath)
          .resize(width, height)
          .toFormat('jpeg')
          .toFile(newFilePath);
      return null;
    } catch {
      return 'Image can not be processed.';
    }
  };

  static async getImagePath(imageName: string | undefined,
      width: string | undefined, height: string | undefined)
    : Promise<null | string> {
    if (!imageName) {
      return null;
    }


    const filePath: string = width && height ? path.resolve(
        fileManagment.editedImage, `${imageName}-${width}-${height}.jpg`,
    ): path.resolve(fileManagment.imagePath, `${imageName}.jpg`);


    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }

  static async createSecondFolder(): Promise<void> {
    try {
      await fs.access(fileManagment.editedImage);
      // Path already available
    } catch {
      fs.mkdir(fileManagment.editedImage);
    }
  }
}


