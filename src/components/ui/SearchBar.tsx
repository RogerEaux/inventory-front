import Input from '@/components/ui/input';
import SearchIcon from '@/assets/svg/search.svg?react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="shadow-input flex items-center rounded-md transition-all focus-within:ring-2">
      <div className="bg-light-gray flex h-48 items-center rounded-l-md pl-16">
        <SearchIcon
          className={`${value ? 'text-black' : 'text-gray'} transition-colors`}
        />
      </div>
      <Input
        id="search"
        placeholder="Search"
        type="search"
        variant="search"
        autoComplete="off"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
      />
    </div>
  );
}
