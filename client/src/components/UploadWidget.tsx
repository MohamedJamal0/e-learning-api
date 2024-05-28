import React, { useEffect, useRef } from 'react';

interface UploadWidgetProps {
  onUpload: (result: string) => void;
  children: React.ReactNode;
  [key: string]: any;
}

interface CloudinaryWidget {
  createUploadWidget(config: any, callbacks: any): any;
}

declare global {
  interface Window {
    cloudinary: CloudinaryWidget;
  }
}

export default function UploadWidget({
  onUpload,
  children,
  ...otherOptions
}: UploadWidgetProps) {
  const cloudinaryRef = useRef<CloudinaryWidget>();
  const widgetRef = useRef<any>();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'camera'],
        multiple: false,
        signed: true,
        ...otherOptions,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          onUpload(result.info.url);
        }
      }
    );
  }, []);

  return <button onClick={() => widgetRef.current.open()}>{children}</button>;
}
