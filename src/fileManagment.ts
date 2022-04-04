import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';


interface ImageDetails {
  imageName?: string;
  width?: string;
  height?: string;
}

export default class fileManagment {

  static imagePath = path.resolve(__dirname, '../content/images');

  static async checkImageAvailability(imageName?: string): Promise<string[]> {
    try {
      var image = await fs.readdir(fileManagment.imagePath);
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
      `${imageName}.jpg`
    );
    console.log(filePathFull);

    const filePathSecondFolder: string = path.resolve(
      fileManagment.editedImage,
      `${imageName}-${width}-${height}.jpg`
    );
    console.log(filePathSecondFolder);

    var filePath = filePathFull;
    var newFilePath = filePathSecondFolder;
    var newWidth = parseInt(width);
    var newHeight = parseInt(height);

    return await fileManagment.processingImage(
      filePath,
      newFilePath,
      newWidth,
      newHeight
    );
  }

  static processingImage = async (
    filePath: string, newFilePath: string, width: number,
    height: number
  ): Promise<null| string> => {
    console.log(filePath);
   try{ 
     await sharp(filePath)
      .resize(width, height)
      .toFormat('jpeg')
      .toFile(newFilePath);
    return null;
  } catch {   
    return 'Image can not be processed.';
  }
  }

  static async getImagePath(imageName: string | undefined,
    width: string | undefined, height: string | undefined)
    : Promise<null | string> {
    if (!imageName) {
      return null;
    }

    
    const filePath: string = width && height ? path.resolve(
      fileManagment.editedImage,`${imageName}-${width}-${height}.jpg`
    ): path.resolve(fileManagment.imagePath, `${imageName}.jpg`);

    
    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }

  static createSecondfolder(): void {
    try {
       fs.access(fileManagment.editedImage);
      // Path already available
    } catch {
      fs.mkdir(fileManagment.editedImage);
    }
  }
}


