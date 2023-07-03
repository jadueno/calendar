type InputProps = {
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  name: string;
  placeholder: string;
  value: string;
  error: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  error,
  onChange,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`mb-4 border text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:border-blue-500 ${
        error &&
        "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
      }`}
    />
  );
};
