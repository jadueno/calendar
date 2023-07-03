type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  content: string;
  icon: string;
  classList?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  content,
  icon,
  classList,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-indigo-600 hover:bg-indigo-800 ${classList}`}
    >
      {icon && <i className={`mr-2 ${icon} `} />}
      {content}
    </button>
  );
};
