interface InputTextProps {
  label: string;
  name: string;
  value: string;
  title?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputText({ name, label, value, title, disabled = false, onChange }: InputTextProps) {
  return (
    <span className="w-full relative" title={title}>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="peer py-1 px-2 w-full rounded bg-input disabled:bg-gray-700 hover:bg-input-hover focus:bg-input-hover outline-none"
      />
      <label
        className={`absolute left-2 top-1 text-secondary duration-300 ${
          value && "-translate-y-3 text-xs peer-focus:text-primary"
        } pointer-events-none`}
      >
        {label} {disabled && "(disabled)"}
      </label>
    </span>
  );
}
