import { ElearningApi } from '../../../services/apiElearning';
import {
  AnalyticsResponse,
  LastJoinedStudentsDataResponse,
  PurchaseResponse,
} from './types';

export const getLastJoinedStudentsData = () =>
  ElearningApi.get<LastJoinedStudentsDataResponse>('admin/courses/last-joined');

export const getPurchases = () =>
  ElearningApi.get<PurchaseResponse[]>('admin/courses/purchases');

export const getAnalytics = () =>
  ElearningApi.get<AnalyticsResponse>('admin/courses/analytics');
