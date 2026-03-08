import cloudinary, { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

export function uploads(file: string, public_id?: string, overwrite?: boolean, invalidate?: boolean): Promise<UploadApiResponse | UploadApiErrorResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file, { public_id, overwrite, invalidate, resource_type: 'auto' }, (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
      if (error) return resolve(error);
      resolve(result!);
    });
  })
};


export function videoUploads(file: string, public_id?: string, overwrite?: boolean, invalidate?: boolean): Promise<UploadApiResponse | UploadApiErrorResponse> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(file, { public_id, overwrite, invalidate, resource_type: 'video', chunk_size: 50000 }, (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
      if (error) return resolve(error);
      resolve(result!);
    });
  })
};