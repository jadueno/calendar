type LabelProps = {
  content: string;
  dark?: boolean;
};

export const Label: React.FC<LabelProps> = ({ content, dark }) => {
  return (
    <label
      className={`block mb-2 text-slate-900 text-sm font-medium ${
        dark && "text-white"
      }`}
    >
      {content}
    </label>
  );
};
