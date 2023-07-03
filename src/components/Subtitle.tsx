type SubtitleProps = {
  content: string;
  dark?: boolean;
};

export const Subtitle: React.FC<SubtitleProps> = ({ content, dark }) => {
  return (
    <h2
      className={`text-xl font-semibold leading-tight tracking-tight text-gray-900 ${
        dark && "text-white"
      }`}
    >
      {content}
    </h2>
  );
};
