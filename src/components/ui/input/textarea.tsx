interface InputTextareaProps {
  label: string;
  name: string;
  value: string;
  title?: string;
  disabled?: boolean;
  className?: React.ComponentProps<'span'>['className']
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function InputTextarea({ name, label, value, title, disabled = false, className, onChange }: InputTextareaProps) {
  return (
    <span className={`w-full relative ${className}`} title={title}>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="peer py-1 px-2 w-full min-h-16 max-h-64 rounded bg-input disabled:bg-gray-700 hover:bg-input-hover focus:bg-input-hover outline-none"
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
