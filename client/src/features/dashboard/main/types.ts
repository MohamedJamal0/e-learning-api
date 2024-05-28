export interface PurchaseResponse {
  _id: string;
  netAmount: number;
  grossAmount: number;
  fee: number;
  purchaseDate: string;
  student: {
    firstName: string;
    lastName: string;
  };
  course: {
    title: string;
  };
  transactionId: string;
}

export interface LastJoinedStudentsDataResponse {
  month: number;
  count: number;
}

export interface AnalyticsResponse {
  numberOfCourses: number;
  numberOfPurchases: number;
  numberOfStudents: number;
  totalIncome: number;
}
