import Input from '../../../../components/ui/Input';
import useAdminLogin from '../hooks/useAdminLogin';

export default function AdminLogin() {
  const { adminLogin, isLoading, errorMessage } = useAdminLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    adminLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-3">
      <Input
        type="text"
        id="username"
        name="username"
        label="username"
        placeholder="username"
        defaultValue={'admin'}
        required
      />
      <Input
        type="password"
        id="password"
        name="password"
        label="Password"
        placeholder="password"
        defaultValue={'123456'}
        required
      />
      <p className="text-red-500">{errorMessage}</p>

      <button
        disabled={isLoading}
        className="w-full h-12  py-2 rounded-md text-white bg-indigo-500"
      >
        {isLoading ? 'Loading' : 'Login'}
      </button>
    </form>
  );
}
