export interface LectureResponse {
  _id: string;
  title: string;
  videoUrl: string;
  order: number;
  article: string;
  isPublished: boolean;
  isFree: boolean;
  chapter: string;
}

export interface UpdateLecture {
  title?: string;
  videoUrl?: string;
  isPublished?: boolean;
  isFree?: boolean;
  duration?: number;
  article?: string;
}

export interface CreateLecture {
  title: string;
  chapterId: string;
  courseId: string;
}


