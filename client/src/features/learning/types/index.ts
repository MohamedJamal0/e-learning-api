export interface CourseWithProgressResponse {
  _id: string;
  title: string;
  chapters: {
    _id: string;
    title: string;
    lectures: {
      _id: string;
      title: string;
      isFree: boolean;
      isCompleted: boolean;
    }[];
  }[];
}


export interface LectureContentResponse {
  _id: string;
  title: string;
  videoUrl: string;
}
