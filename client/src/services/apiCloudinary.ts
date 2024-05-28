import axios, { AxiosResponse } from 'axios';

export async function uploadVideo(
  file: File,
  onChangeProgress: (progress: number) => void
): Promise<{ url: string; duration: number }> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'tiqd4xkm');
  formData.append('resource_type', 'video');
  try {
    const response: AxiosResponse<any> = await axios.post(
      `https://api.cloudinary.com/v1_1/dfmcyikt4/video/upload`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          onChangeProgress(
            Math.round((100 * progressEvent.loaded) / progressEvent.total!)
          );
        },
      }
    );

    return {
      url: response.data.url,
      duration: response.data.duration.toFixed(2),
    };
  } catch (error) {
    throw new Error('Failed to upload file');
  }
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'tiqd4xkm');
  formData.append('resource_type', 'image');

  try {
    const response: AxiosResponse<any> = await axios.post(
      `https://api.cloudinary.com/v1_1/dfmcyikt4/image/upload`,
      formData
    );

    return response.data.url;
  } catch (error) {
    throw new Error('Failed to upload file');
  }
}
