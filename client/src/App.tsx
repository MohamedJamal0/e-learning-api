import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ManageCourseSettings from './features/dashboard/courses/components/ManageCourseSettings';
import ManageCourseDetails from './features/dashboard/courses/components/ManageCourseDetails';

import MainLayout from './features/dashboard/main/components/MainLayout';

import CourseContent from './features/learning/components/LectureContent';
import CourseDiscussion from './features/learning/components/CourseDiscussion';
import CoursePage from './pages/CoursePage';
import DashboardLoginPage from './pages/DashboardLoginPage';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackError from './components/FallbackError';
import CourseManageCurriculumProvider from './features/dashboard/courses/components/CourseManageCurriculumProvider';
import DashboardPage from './pages/DashboardPage';
import CourseLearningPage from './pages/CourseLearningPage';
import CourseManagePage from './pages/CourseManagePage';
import MyCoursesPage from './pages/MyCoursesPage';

export default function App() {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => <FallbackError error={error} />}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:courseTitle" element={<CoursePage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route
          path="/learning/:courseTitle/lecture/:lectureId"
          element={<CourseLearningPage />}
        >
          <Route index element={<CourseContent />} />
          <Route path="discussion" element={<CourseDiscussion />} />
        </Route>
        <Route path="dashboard/login" element={<DashboardLoginPage />} />
        <Route path="dashboard" element={<DashboardPage />}>
          <Route path="" element={<MainLayout />} />
          <Route path="course/:courseId/manage" element={<CourseManagePage />}>
            <Route index element={<ManageCourseDetails />} />
            <Route
              path="curriculum"
              element={<CourseManageCurriculumProvider />}
            />
            <Route path="settings" element={<ManageCourseSettings />} />
          </Route>
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
