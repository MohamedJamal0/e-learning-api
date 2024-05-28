import UploadWidget from '../../../../components/UploadWidget';
import CldImage from '../../../../components/CldImage';
interface UploadCourseCoverImageProps {
  onChange: (imageUrl: string) => void;
  currentCoverImage: string;
}

export default function UploadCourseCoverImage({
  onChange,
  currentCoverImage,
}: UploadCourseCoverImageProps) {
  return (
    <div className="mt-8">
      <div className="mb-2 font-medium">Course image</div>
      <div className="grid grid-cols-2 items-center gap-5">
        <div className="relative flex-1 aspect-[1.8] bg-slate-50">
          <CldImage
            url={currentCoverImage?.split('/').slice(-2).join('/')}
            width={300}
            height={200}
          />
        </div>
        <UploadWidget
          onUpload={onChange}
          resourceType="image"
          maxFileSize={1 * 1024 * 1024}
        >
          <div className="border border-black p-4 cursor-pointer left-0 z-10">
            Upload Image
          </div>
        </UploadWidget>
      </div>
    </div>
  );
}
