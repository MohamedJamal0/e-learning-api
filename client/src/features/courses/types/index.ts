export interface CourseResponse {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  price: string;
  isFree: boolean;
}

export interface CourseDetailsResponse {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  price: number;
  isFree: boolean;
  level: string;
  chapters: {
    _id: string;
    title: string;
    lectures: {
      _id: string;
      title: string;
      isFree: boolean;
      duration: number;
    }[];
  }[];
}

export interface IsSubscribedResponse {
  isSubscribed: boolean;
}

export interface StudentCourseResponse {
  id: string;
  title: string;
  coverImage: string;
  completionPercentage: number;
  firstLectureId: string;
}
