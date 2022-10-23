import { FunctionComponent, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal: FunctionComponent<React.PropsWithChildren> = ({ children }) => {
  const modalRoot = document.getElementById("modal-root");
  const itemRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
  if (!itemRef.current) {
    itemRef.current = document.createElement("div");
    itemRef.current.classList.add("modal-container");
  }

  useEffect(() => {
    if (itemRef.current) modalRoot?.appendChild(itemRef.current);
    return () => modalRoot?.removeChild(itemRef.current as Node) as void;
  }, []);

  return createPortal(children, itemRef.current);
};
export default Modal;
