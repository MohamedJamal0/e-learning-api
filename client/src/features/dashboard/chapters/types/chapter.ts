import { LectureResponse } from '../../lectures/types';

export type ChapterWithLectures = ChapterResponse & {
  lectures: LectureResponse[];
};

export interface ChapterResponse {
  _id: string;
  title: string;
  order: number;
  isPublished: boolean;
}

export interface CreateChapter {
  title: string;
  courseId: string;
}

export interface UpdateChapter {
  title: string;
}
