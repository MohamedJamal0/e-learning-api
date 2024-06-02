import { useNavigate, useParams } from 'react-router-dom';
import Paypal from '../../payment/Paypal';
import useIsUserSubscribed from '../hooks/useIsUserSubscribed';
import AttendFreeCourse from './AttendFreeCourse';
import Spinner from '../../../components/ui/Spinner';
import { useAuthContext } from '../../../features/authentication/context/authContext';

interface CoursePriceCardProps {
  _id: string;
  isFree: boolean;
  price: number;
  coverImage: string;
  firstLecture: string;
}
export default function CoursePriceCard({
  _id,
  isFree,
  price,
  coverImage,
  firstLecture,
}: CoursePriceCardProps) {
  const { isUserSubscribed, isLoading } = useIsUserSubscribed(_id);
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const { courseTitle } = useParams();

  let pricing;

  if (isLoading) pricing = <Spinner />;

  if (isFree && !isLoading)
    pricing = (
      <AttendFreeCourse
        user={user}
        firstLecture={firstLecture}
        courseId={_id}
      />
    );

  if (!isFree && !isUserSubscribed && !isLoading)
    pricing = (
      <>
        <p className="mt-3 text-3xl font-semibold">${price}</p>
        <Paypal
          courseId={_id}
          onSuccess={() =>
            navigate(`/learning/${courseTitle}/lecture/${firstLecture}`)
          }
        />
        {!user && (
          <p className="text-indigo-800 font-medium">Login to subscribe</p>
        )}
        {user && user?.role !== 'student' && (
          <p className="text-red-500 font-medium ">
            Admin cannot subscribe, please log out
          </p>
        )}
      </>
    );

  if (isUserSubscribed && !isLoading)
    pricing = (
      <button
        onClick={() =>
          navigate(`/learning/${courseTitle}/lecture/${firstLecture}`)
        }
        className="w-full mt-3 py-2.5 rounded-md bg-blue-950 text-white font-medium hover:opacity-50"
      >
        Go To Course
      </button>
    );

  return (
    <div className="w-[90vw] max-w-xl mx-auto mt-7 overflow-auto  border rounded-md  bg-white text-black lg:fixed lg:right-0 lg:top-0 lg:max-w-xs lg:mt-32 lg:mr-[4%] lg:max-h-[510px]  ">
      <img
        className="w-full h-64  lg:h-44 object-cover"
        src={coverImage}
        alt=""
      />
      <div className=" py-2 px-5">
        <div className="py-4 px-2.5 border rounded-md border-blue-400 text-center">
          <p>Get Lifetime access to this course only.</p>
          {pricing}
        </div>
      </div>
    </div>
  );
}
