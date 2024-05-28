import Header from './Header';

export default function FallbackError({ error }: any) {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-80px)] w-full">
        <div>
          {error?.status && (
            <p className="text-3xl text-center text-red-500">{error.status}</p>
          )}
          <p className="text-3xl text-red-500">{error?.message}</p>
        </div>
      </div>
    </div>
  );
}
