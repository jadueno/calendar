type TitleProps = {
  content: string;
  dark?: boolean;
};

export const Title: React.FC<TitleProps> = ({ content, dark }) => {
  return (
    <h1
      className={`text-2xl uppercase font-bold mb-6 leading-tight tracking-tight text-gray-900 ${
        dark && "text-white"
      }`}
    >
      {content}
    </h1>
  );
};
