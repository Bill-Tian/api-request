'use client';

import * as React from 'react';
import { Input } from './ui/input';

interface AutocompleteInputProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Key',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  const [filteredOptions, setFilteredOptions] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // 同步外部value到内部状态
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  React.useEffect(() => {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={inputRef}>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="rounded-none border-none shadow-none focus-visible:ring-0 h-6 p-0"
      />
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border border-border shadow-lg max-h-60 overflow-auto">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-input"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
