import { FormEvent } from 'react';
import Input from '../../../components/ui/Input';
import useLogin from '../hooks/useLogin';

export default function LoginForm() {
  const { login, isLoading, error } = useLogin();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password || isLoading) return;

    login(email.trim(), password);
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <Input
        id="email"
        type="email"
        name="email"
        label="Email"
        placeholder="Sign In with your Email"
      />
      <Input
        id="password"
        type="password"
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
          {isLoading ? 'loading...' : 'Sign In'}
        </button>
      </div>
    </form>
  );
}
