import React, { useState } from 'react';
import InputField from './inputField';

const DateInput: React.FC = () => {
  const [date, setDate] = useState({
    day: '',
    month: '',
    year: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDate(prevDate => ({ ...prevDate, [name]: value }));
  };

  return (
    <div className="flex gap-1 whitespace-nowrap">
      <InputField
        label="วันที่"
        name="day"
        value={date.day}
        onChange={handleInputChange}
        width="w-3.5"
      />
      <InputField
        label="เดือน"
        name="month"
        value={date.month}
        onChange={handleInputChange}
        width="w-[42px]"
      />
      <InputField
        label="พศ"
        name="year"
        value={date.year}
        onChange={handleInputChange}
        width="w-6"
      />
    </div>
  );
};

export default DateInput;
