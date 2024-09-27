import React from 'react';

interface InputFieldProps {
  label: string;
  width?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  width = 'w-[46px]',
  name,
  value,
  onChange
}) => (
  <div className="flex gap-0.5 items-center">
    <span>{label}</span>
    <input
      className={`flex shrink-0 rounded-sm bg-zinc-100 h-[9px] ${width} px-1 text-black`}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label} // Optional: Use label as placeholder
    />
  </div>
);

export default InputField;
