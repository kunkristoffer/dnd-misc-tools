interface InputTextProps {
  label: string;
  name: string;
  value: string;
  title?: string;
  disabled?: boolean;
  error?: string[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputText({ name, label, value, title, error, disabled = false, onChange }: InputTextProps) {
  return (
    <span className="w-full relative" title={title}>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="peer py-2 px-3 w-full rounded bg-input disabled:bg-gray-700 hover:bg-input-hover focus:bg-input-hover outline-none shadow-inner"
      />
      <label
        className={`absolute left-3 top-2 text-secondary duration-300 ${
          value && "-translate-y-4 -translate-x-2 text-xs peer-focus:text-primary"
        } pointer-events-none`}
      >
        {label} {disabled && "(disabled)"}
      </label>
      <p className="absolute -bottom-2 w-full text-red-600 text-xs text-nowrap text-center">{error}</p>
    </span>
  );
}
