import { GoChevronDown } from 'react-icons/go';
import {
  useState,
  createContext,
  useContext,
  cloneElement,
  ReactNode,
} from 'react';

interface AccordionContextType {
  toggle: boolean;
  onToggle: () => void;
}
const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionProps {
  children: ReactNode;
  isOpen: boolean;
}
export default function Accordion({ children, isOpen }: AccordionProps) {
  const [toggle, setToggle] = useState(isOpen);

  const onToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <AccordionContext.Provider value={{ toggle, onToggle }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

interface ToggleProps {
  children: ReactNode;
  className?: string;
}

function Toggle({ children, className }: ToggleProps) {
  const { toggle, onToggle } = useContext(
    AccordionContext
  ) as AccordionContextType;

  return (
    <div className={'relative ' + className} onClick={onToggle}>
      {children}
      <GoChevronDown
        className={`absolute right-5 ${
          toggle && 'rotate-180'
        } transition-all duration-300`}
      />
    </div>
  );
}

function Body({ children }: { children: JSX.Element }) {
  const { toggle } = useContext(AccordionContext) as AccordionContextType;

  return cloneElement(children, {
    className: toggle
      ? 'accordion-toggle animated overflow-hidden'
      : 'accordion-toggle overflow-hidden',
  });
}

Accordion.Toggle = Toggle;
Accordion.Body = Body;
