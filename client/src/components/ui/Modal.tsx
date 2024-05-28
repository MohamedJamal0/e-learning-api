import React, { createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

interface ModalContextType {
  open: boolean;
  onChange: () => void;
}

const ModalContext = createContext<ModalContextType>({
  open: false,
  onChange: () => {},
});

const Modal = ({
  children,
  onChange,
  open,
}: {
  children: React.ReactNode;
  onChange: () => void;
  open: boolean;
}) => {
  const value = { open, onChange };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

const Open = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { onChange } = useContext(ModalContext);

  return (
    <button className={className} {...props} onClick={onChange}>
      {children}
    </button>
  );
};

const Window = ({ children }: { children: React.ReactNode }) => {
  const { open, onChange } = useContext(ModalContext);
  if (!open) return null;

  return createPortal(
    <div>
      <div
        onClick={onChange}
        className="fixed left-0 top-0 w-full h-screen bg-black opacity-40 z-50"
      ></div>
      <div className="fixed z-[60] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  py-4 rounded-md shadow-md fade-in-70  bg-white">
        {children}
      </div>
    </div>,
    document.body
  );
};

const Header = ({ children }: { children: React.ReactNode }) => {
  const { onChange } = useContext(ModalContext);
  return (
    <div className="flex items-center justify-between px-4 pb-2 border-b">
      <button
        className="flex items-center justify-center w-10 h-10 hover:bg-zinc-50 duration-200 rounded-full"
        onClick={onChange}
      >
        X
      </button>
      <div className="text-2xl font-medium">{children}</div>
      <div className="w-10 h-0"></div>
    </div>
  );
};

const Body = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

Modal.Open = Open;
Modal.Header = Header;
Modal.Window = Window;
Modal.Body = Body;

export default Modal;
