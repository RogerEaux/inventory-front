import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import Button from '@/components/ui/button';
import Checkmark from '@/assets/svg/checkmark.svg?react';
import { useState } from 'react';

interface Props {
  id: string;
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
  placeholder: string;
}

export default function MultiSelectInput({
  id,
  options,
  value,
  onChange,
  placeholder = 'Select options',
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((val) => val !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const isSelected = value.length !== 0;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button role="combobox" variant="select" id={id}>
          <span className={`${isSelected ? 'text-black' : 'text-gray'}`}>
            {isSelected ? value.join(', ') : placeholder}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandGroup>
            {options.map((option) => {
              const isChecked = value.includes(option);

              return (
                <CommandItem
                  key={option}
                  onSelect={() => toggleOption(option)}
                  value={option}
                >
                  <div className="flex items-center gap-8">
                    {isChecked ? (
                      <Checkmark width={24} height={24} />
                    ) : (
                      <span className="h-24 w-24" />
                    )}
                    <span>{option}</span>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
