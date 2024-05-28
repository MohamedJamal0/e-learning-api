import { NavLink } from 'react-router-dom';

export default function LearningNavigation() {
  return (
    <div className="flex mt-2.5 mb-2.5 border-b">
      <NavLink
        className={({ isActive }) =>
          (isActive ? 'text-indigo-500 border-b-2 border-indigo-500' : '') +
          ' font-medium text-lg py-3 px-4 '
        }
        to=""
        end
      >
        Course
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          (isActive ? 'text-indigo-500 border-b-2 border-indigo-500' : '') +
          ' font-medium text-lg py-3 px-4 '
        }
        to="discussion"
      >
        Discussion
      </NavLink>
    </div>
  );
}
