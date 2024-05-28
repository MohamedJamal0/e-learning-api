import { LearningSidebarToggleProvider } from '../context/learningSidebarToggleContext';
import { LearningContextProvider } from '../context/learningContext';
import LearningHeader from './LearningHeader';
import LearningMain from './LearningMain';
import LearningSidebar from './LearningSidebar';

export default function LearningLayout() {
  return (
    <LearningContextProvider>
      <LearningSidebarToggleProvider>
        <LearningHeader />
        <div className="flex h-[calc(100vh-4rem)] mt-16  ">
          <LearningSidebar />
          <div className="flex-1 bg-gray-100/50 overflow-auto">
            <LearningMain />
          </div>
        </div>
      </LearningSidebarToggleProvider>
    </LearningContextProvider>
  );
}
