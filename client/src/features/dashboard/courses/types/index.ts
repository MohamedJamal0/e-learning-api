export interface DashboardCourseResponse {
  _id: string;
  title: string;
  isPublished: string;
  price: string;
  numberOfStudents: number;
}

export interface UpdateCourseResponse {
  title: string;
  subtitle: string;
  description: string;
  level: string;
  coverImage: string;
  isFree: boolean;
  price: number;
}
