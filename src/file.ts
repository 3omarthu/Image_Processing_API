import { promises as fs } from 'fs';
import path from 'path';
import imageProcessing from './imageProcessar'; 

// query segments
interface ImageDetails {
  filename?: string;
  width?: string;
  height?: string;
}

export default class File {
  static imagePath = path.resolve(__dirname, '../content/images/full');
  static imageThumbPath = path.resolve(__dirname, '../content/images/thumb');

  static async getImagePath(params: ImageDetails): Promise<null | string> {

    const filePath: string =
    params.width && params.height
      ? path.resolve(
          File.imageThumbPath,
          `${params.filename}-${params.width}x${params.height}.jpg`
        )
      : path.resolve(File.imagePath, `${params.filename}.jpg`);

    // Check file existence
    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }

  static async checkImageAvailability(filename?: string): Promise<string[]> {
    try {
      return (await fs.readdir(File.imagePath)).map(
        (filename: string): string => filename.split('.')[0]
      ); // Cut extension
    } catch {
      return [];
    }
  }

  static async isImageAvailable(filename: string = ''): Promise<boolean> {
    if (!filename) {
      return false; // Fail early
    }

    return (await File.getAvailableImageNames()).includes(filename);
  }

  static async getAvailableImageNames(): Promise<string[]> {
    try {
      return (await fs.readdir(File.imagePath)).map(
        (filename: string): string => filename.split('.')[0]
      ); // Cut extension
    } catch {
      return [];
    }
  }

  static async isThumbAvailable(params: ImageDetails): Promise<boolean> {
    if (!params.filename || !params.width || !params.height) {
      return false; // Fail early
    }

    // Set appropriate path
    const filePath: string = path.resolve(
      File.imageThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(File.imageThumbPath); // Path already available
    } catch {
      fs.mkdir(File.imageThumbPath);
    }
  }

  static async createThumb(params: ImageDetails): Promise<null | string> {
    if (!params.filename || !params.width || !params.height) {
      return null; 
    }

    const filePathFull: string = path.resolve(
      File.imagePath,
      `${params.filename}.jpg`
    );
    
    const filePathThumb: string = path.resolve(
      File.imageThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );


    return await imageProcessing({
      source: filePathFull,
      target: filePathThumb,
      width: parseInt(params.width),
      height: parseInt(params.height)
    });
  }
}

