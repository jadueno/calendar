type TextProps = {
  children: string | JSX.Element | JSX.Element[];
  dark?: boolean;
};

export const Text: React.FC<TextProps> = ({ children, dark }) => {
  return (
    <p
      className={`text-sm font-light text-gray-500 ${dark && "text-gray-400"}`}
    >
      {children}
    </p>
  );
};
