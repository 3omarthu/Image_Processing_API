import express from 'express';
import File from './../../file';

interface ImageDetails {
  imagename?: string;
  width?: string;
  height?: string;
}

const validator = async (details: ImageDetails): Promise<null | string> => {
  // Check if requested file is available
    const availableImageNames: string = (
      await File.checkImageAvailability()
    ).join(', ');  

  if ((!details.width && !details.height) || Number.isNaN(details.width) || Number.isNaN(details.height) ) {
    return "the width or the height is invalid.";; 
  }
  return null;
};

const images = express.Router();
images.get(
  '/',
  async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const validationMessage: null | string = await validator(req.query);
    if (validationMessage) {
      res.send(validationMessage);
      return;
    }

    // thumb: null | string = '';
    let thumb = await File.createThumb(req.query);
    
    //let  thumb = File.createThumb(req.query);

    if (thumb) {
      res.send(thumb);
      return;
    }

    const Imagepath: null | string = await File.getImagePath(req.query);
    if (Imagepath) {
      res.sendFile(Imagepath);
    } else {
      res.send('An error has occured');
    }
  }
);

export default images;
