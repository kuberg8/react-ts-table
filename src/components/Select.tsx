import React, { useState, useEffect, useMemo } from "react";

interface ISelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

const Select: React.FC<ISelectProps> = ({ options, value, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string }>({ value: "", label: "" });

  useEffect(() => {
    setSelectedOption(options.find((option) => option.value === value) || { value: "", label: "" });
  }, [options, value]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const selected = options.find((option) => option.value === value) || { value: "", label: "" };
    setSelectedOption(selected);
    onChange(value);
  };

  const selectOptions = useMemo(
    () =>
      options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )),
    [options]
  );

  return (
    <select value={selectedOption.value} onChange={handleChange}>
      {selectOptions}
    </select>
  );
};

export default Select;
