import React, { useState } from 'react';

interface InputProps {
  initialValue: string;
  onSubmit(value: string, addTodo: boolean): void;
  placeholder: string;
}

const keys = {
  ENTER: 13,
  ESCAPE: 27
};

const Input: React.FC<InputProps> = ({
  initialValue,
  onSubmit,
  placeholder
}) => {
  const [value, setValue] = useState(initialValue);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.trimLeft());
  };

  const handleSubmit = (e: React.KeyboardEvent | React.FocusEvent) => {
    if (
      value.length &&
      ((e as React.KeyboardEvent).which === keys.ENTER || e.type === 'blur')
    ) {
      onSubmit(value, true);
    } else if ((e as React.KeyboardEvent).which === keys.ESCAPE) {
      onSubmit(initialValue, false);
    }
  };

  const preventSubmission = (e: React.FormEvent) => e.preventDefault();

  return (
    <form action="#" style={{ flex: 1 }} onSubmit={preventSubmission}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onInputChange}
        onKeyPress={handleSubmit}
        onBlur={handleSubmit}
        autoFocus
      />
    </form>
  );
};

export { Input };
