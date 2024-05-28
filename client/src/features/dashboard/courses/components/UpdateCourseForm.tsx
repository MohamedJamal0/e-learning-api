import { useState } from 'react';
import { TextEditor } from '../../../../components/TextEditor';
import Input from '../../../../components/ui/Input';
import UploadCourseCoverImage from './UploadCourseCoverImage';
import useUpdateCourse from '../hooks/useUpdateCourse';
import { UpdateCourseResponse } from '../types';
import Switch from '../../../../components/ui/Switch';

export interface UpdateCourseFormProps {
  course: UpdateCourseResponse;
}

export default function UpdateCourseForm({ course }: UpdateCourseFormProps) {
  const [courseForm, setCourseForm] = useState<UpdateCourseResponse>({
    ...course,
  });

  const { updateCourse, isUpdating } = useUpdateCourse();

  const handleOnChangeInput = (
    key: keyof UpdateCourseResponse,
    value: string | number | boolean
  ) => {
    setCourseForm({ ...courseForm, [key]: value });
  };

  const handleOnSaveUpdates = async () => {
    await updateCourse(courseForm);
  };

  return (
    <div>
      <Input
        id="title"
        name="title"
        label="Course Title"
        type="text"
        placeholder="title"
        value={courseForm.title}
        onChange={(e) => handleOnChangeInput('title', e.target.value)}
        className="mb-2"
      />
      <p className="text-xs text-gray-700 ">
        Your title should be a mix of attention-grabbing, informative, and
        optimized for search
      </p>
      <Input
        id="subtitle"
        name="subtitle"
        label="subtitle"
        type="text"
        placeholder="subtitle"
        value={courseForm.subtitle}
        onChange={(e) => handleOnChangeInput('subtitle', e.target.value)}
        className="mt-8 mb-2"
      />
      <p className=" text-xs text-gray-700">
        Use 1 or 2 related keywords, and mention 3-4 of the most important areas
        that you've covered during your course.
      </p>
      <div className="mt-8">
        <div className="mb-2 inline-block font-semibold">
          Course Description
        </div>
        <TextEditor
          className="w-full h-80 mb-14"
          value={courseForm.description}
          onChange={(value) => handleOnChangeInput('description', value)}
        />
      </div>
      <div className=" mt-16">
        <div className="mb-2 inline-block font-semibold">Basic info</div>
        <div className="flex items-center gap-8">
          <select
            value={courseForm.level}
            onChange={(e) => handleOnChangeInput('level', e.target.value)}
            className=" basis-56  px-3 py-2  border rounded-md cursor-pointer"
          >
            <option value={''}>-- Select level --</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>
      <div className="mt-16">
        <div className="mb-2 inline-block font-semibold">Pricing</div>
        <div className="flex item-center gap-8">
          <div className="w-1/3">
            <Input
              id="price"
              name="price"
              label="Price"
              type="number"
              disabled={courseForm.isFree}
              placeholder="price"
              onChange={(e) => handleOnChangeInput('price', e.target.value)}
              value={courseForm.price}
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              value={courseForm.isFree}
              onChange={(value) => handleOnChangeInput('isFree', value)}
            />
            <span className="text-lg font-medium">Is Free </span>
          </div>
        </div>
      </div>
      <UploadCourseCoverImage
        onChange={(value) => handleOnChangeInput('coverImage', value)}
        currentCoverImage={courseForm.coverImage}
      />
      <button
        onClick={handleOnSaveUpdates}
        className=" z-50 fixed right-[5%] top-3 px-6 py-1 rounded-md font-semibold bg-indigo-600 text-white"
      >
        {isUpdating ? 'Updating...' : 'Save'}
      </button>
    </div>
  );
}

//
