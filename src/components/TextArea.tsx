type TextAreaProps = {
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextArea: React.FC<TextAreaProps> = ({
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="mb-4 border text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:border-blue-500"
    ></textarea>
  );
};
