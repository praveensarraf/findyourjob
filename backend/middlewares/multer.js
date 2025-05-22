import multer from 'multer';

const storage = multer.memoryStorage();

export const uploadFields = multer({ storage }).fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
  { name: 'logo', maxCount: 1 },
]);

export default uploadFields;
