import { useState } from 'react';
export default function useToggle( init: boolean ) {
  const [toggle, setToggle] = useState(init);

  const onToggle = () => {
    setToggle((prev) => !prev);
  };

  return {
    toggle,
    onToggle,
  };
}
