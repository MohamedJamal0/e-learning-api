import { FormEvent } from 'react';
import Input from '../../../components/ui/Input';
import useSignUp from '../hooks/useSignup';

export default function SignUpForm() {
  const { signUp, isLoading, error } = useSignUp();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);

    const email = dataForm.get('email') as string;
    const password = dataForm.get('password') as string;
    const firstName = dataForm.get('firstName') as string;
    const lastName = dataForm.get('lastName') as string;

    if (!email || !password || !firstName || !lastName || isLoading) return;

    signUp({ email, password, firstName, lastName });
  };

  return (
    <form onClick={handleSubmit}>
      <Input
        id="firstName"
        name="firstName"
        label="First Name"
        type="text"
        placeholder="First Name"
      />
      <Input
        type="text"
        id="lastName"
        name="lastName"
        label="Last Name"
        placeholder="Last Name"
      />
      <Input
        type="email"
        id="email"
        name="email"
        label="Email"
        placeholder="Sign Up with your Email"
      />
      <Input
        type="password"
        id="password"
        name="password"
        label="Password"
        placeholder="Password"
      />
      {error && (
        <p className=" mt-2 border py-3 rounded-md bg-red-100 text-red-500 text-center">
          {error}
        </p>
      )}
      <div className="flex justify-center mt-6">
        <button
          disabled={isLoading}
          type="submit"
          className="px-12 py-2.5 rounded-md text-lg font-medium  bg-indigo-700 shadow-xl text-white hover:bg-indigo-600 duration-200 "
        >
          {isLoading ? 'loading...' : 'Create Account'}
        </button>
      </div>
    </form>
  );
}
