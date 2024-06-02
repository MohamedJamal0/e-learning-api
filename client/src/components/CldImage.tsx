import { Cloudinary } from '@cloudinary/url-gen/index';
import { Resize } from '@cloudinary/url-gen/actions';

interface CldImageProps {
  url: string;
  width: number;
  height: number;
  [key: string]: any;
}
export default function CldImage({
  url,
  width,
  height,
  ...props
}: CldImageProps) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
  });
  return (
    <img
      src={cld
        .image(url?.split('/').slice(-2).join('/'))
        .resize(Resize.scale().width(width).height(height))
        .toURL()}
      {...props}
    />
  );
}
