import express from 'express';
import FileManagment from '../../fileManagment';

interface ImageDetails {
  imagename?: string;
  width?: string;
  height?: string;
}

const validator = async (details: ImageDetails): Promise<null | string> => {
  // console.log(details.imagename);
  if (!(await FileManagment.checkImageAvailability(details.imagename))) {
    return `The image name is invalid`;
  }


  const width: number = parseInt(details.width || '');
  const height: number = parseInt(details.height || '');

  if (!details.width || !details.height || Number.isNaN(width) || Number.isNaN(height) ||
  width <= 0 || height <= 0) {
    return 'the width or the height is invalid.'; ;
  }
  return null;
};

const images = express.Router();
images.get(
    '/',
    async (req: express.Request, res: express.Response): Promise<void> => {
      console.log(req.query);
      const validationMessage: null | string = await validator(req.query);
      if (validationMessage) {
        res.send(validationMessage);
        return;
      }

      const error: null | string = '';
      const imageName:string | undefined = req.query['imagename']?.toString();
      const width:string | undefined = req.query['width']?.toString();
      const height:string | undefined = req.query['height']?.toString();

      console.log(imageName);
      console.log(width);
      console.log(height);

      // let isImageAvailable = await FileManagment.isImageAvailable(imageName, width, height);
      // if(isImageAvailable){
      //   res.send(isImageAvailable);
      //   return;
      // }else{
      const editedImage = await FileManagment.createEditedImage(imageName, width, height);
      console.log('I am here');
      if (editedImage) {
        res.send(editedImage);
        return;
      // }
      }

      const Imagepath: string | null = await FileManagment.getImagePath(imageName, width, height);
      console.log(Imagepath);
      if (Imagepath) {
        res.sendFile(Imagepath);
      } else {
        res.send('An error has occured');
      }
    },
);

export default images;
