import { createContext, useState, useContext } from 'react';
import useClickOutSide from '../../hooks/useClickOutside';
import { cn } from '../../utils';

interface MenuContextType {
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
  isOpen: boolean;
}

interface MenuProps {
  children: React.ReactNode;
  className?: string;
}

const MenuContext = createContext<MenuContextType | null>(null);

const Menu = ({ children }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <MenuContext.Provider
      value={{ handleOpen, isOpen, handleClose, handleToggle }}
    >
      <div className={'relative'}>{children}</div>
    </MenuContext.Provider>
  );
};

export default Menu;

const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

const Open = ({ children, ...props }: MenuProps) => {
  const { handleClose, handleToggle } = useMenu();
  const { ref } = useClickOutSide(handleClose);
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={handleToggle}
      {...props}
    >
      {children}
    </button>
  );
};

const List = ({ children, className }: MenuProps) => {
  const { isOpen } = useMenu();

  return (
    <ul
      className={cn(
        'absolute top-5 right-0 mt-8 border  rounded-md bg-white shadow-lg z-10',
        className,
        {
          'opacity-100': isOpen,
          'opacity-0 pointer-events-none': !isOpen,
        }
      )}
    >
      {children}
    </ul>
  );
};

const item = ({ children, className, ...props }: MenuProps) => {
  return (
    <li
      className={cn(
        'hover:bg-slate-200 cursor-pointer transition duration-300 *:w-full',
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
};

Menu.Open = Open;
Menu.List = List;
Menu.item = item;
