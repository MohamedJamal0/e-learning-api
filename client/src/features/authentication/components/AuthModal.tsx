import { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import Logo from '../../../components/Logo';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';
import GoogleButton from './GoogleButton';

interface AuthModalProps {
  initCurrentForm: 'login' | 'signUp';
  children?: React.ReactNode;
}

export default function AuthModal({
  initCurrentForm,
  children,
}: AuthModalProps) {
  const [open, setOpen] = useState<boolean>(false);

  const [currentForm, setCurrentForm] = useState<'login' | 'signUp'>(
    initCurrentForm
  );

  const changeToLogin = () => setCurrentForm('login');
  const changeToSignUp = () => setCurrentForm('signUp');

  return (
    <Modal open={open} onChange={() => setOpen(!open)}>
      <Modal.Open className="flex items-center gap-2 font-medium text-indigo-600 hover:text-orange-400 duration-200">
        {children}
      </Modal.Open>
      <Modal.Window>
        <Modal.Body className="w-[90vw] max-w-lg p-4 ">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="flex justify-center gap-2 mt-6">
            <GoogleButton />
          </div>
          <div className="font-medium text-center text-lg mt-4">OR</div>
          {currentForm === 'login' ? (
            <>
              <LoginForm />
              <div className="text-center mt-4 ">
                Don't have an account?
                <span
                  className="ml-2 text-indigo-600 font-medium cursor-pointer hover:text-black duration-200"
                  onClick={changeToSignUp}
                >
                  Sign Up
                </span>
              </div>
            </>
          ) : (
            <>
              <SignUpForm />
              <div className="text-center mt-4">
                Already have an account?
                <span
                  className="ml-2 text-indigo-600 font-medium cursor-pointer hover:text-black duration-200"
                  onClick={changeToLogin}
                >
                  Log In
                </span>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal.Window>
    </Modal>
  );
}
