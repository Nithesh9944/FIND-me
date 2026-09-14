"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="relative block w-full max-w-md">
      <span className="sr-only">Search games</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search games..."
        className="w-full rounded-full border border-ink/15 bg-white px-5 py-3 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-coral focus:ring-2 focus:ring-coral/20"
      />
    </label>
  );
}
