type LinkProps = {
  children: string | JSX.Element | JSX.Element[];
  dark?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  classList?: string;
  goTo?: string;
};

import { Link as LinkTo } from "react-router-dom";

export const Link: React.FC<LinkProps> = ({
  children,
  dark,
  onClick,
  classList,
  goTo,
}) => {
  return (
    <span
      onClick={onClick}
      className={`font-medium text-indigo-800 hover:text-indigo-500 cursor-pointer ${
        dark && "text-white hover:text-indigo-500"
      } ${classList}`}
    >
      {goTo ? <LinkTo to={`/${goTo}`}>{children}</LinkTo> : children}
    </span>
  );
};
