export default function GoogleButton() {
  return (
    <a
      className="flex items-center gap-2 px-4 py-2 rounded-md  border  font-medium  hover:border-black hover:bg-slate-100 duration-200 "
      href={import.meta.env.VITE_GOOGLE_AUTH_URL}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
        alt=""
      />
      Continue with Google
    </a>
  );
}
