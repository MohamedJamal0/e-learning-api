import { Outlet } from 'react-router-dom';
import LearningNavigation from './LearningNavigation';

export default function LearningMain() {
  return (
    <div className=" max-w-6xl mx-auto pb-20 px-[2%]">
      <LearningNavigation />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
