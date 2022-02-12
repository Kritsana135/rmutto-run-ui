import Resizer from 'react-image-file-resizer';
import { express_path } from 'src/config';

export const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500,
      500,
      'PNG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'file'
    );
  });

export const getProfileUrl = (id: string) =>
  `${express_path}/profile/${id}-.png`;

export const getProgressUrl = (imageStr: string) =>
  `${express_path}/progress/${imageStr}`;
