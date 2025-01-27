interface InputNumberProps {
  label: string;
  name: string;
  value: number;
  title?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputNumber({ name, label, value, title, disabled = false, onChange }: InputNumberProps) {
  return (
    <span className="w-full relative" title={title}>
      <input
        type="number"
        name={name}
        value={value === 0 ? "" : value}
        onChange={onChange}
        disabled={disabled}
        className="peer py-1 px-2 w-full rounded bg-input disabled:bg-gray-700 hover:bg-input-hover focus:bg-input-hover outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
