import React from "react";

interface Props {
  label: string;
  type: string;
  error?: string;
  touched?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({
  label,
  type,
  error,
  touched,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <div className="w-full mb-4">
      <label
        htmlFor={label}
        className="block uppercase text-gray-700 text-xs tracking-wide font-bold mb-2"
      >
        {label}
      </label>
      <input
        id={label}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`${
          error && touched
            ? "border-red-500 bg-red-100"
            : "border-gray-700 bg-white"
        } appearance-none block w-full mb-3 py-3 px-4 shadow-inner text-gray-700 border tracking-wide leading-tight border-gray-200 rounded focus:outline-none focus:border-purple-400`}
      />
      {error && touched ? (
        <p className="text-red-500 text-xs italic">{error}</p>
      ) : null}
    </div>
  );
};

export default Input;