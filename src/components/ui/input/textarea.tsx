interface InputTextareaProps {
  label: string;
  name: string;
  value: string;
  title?: string;
  disabled?: boolean;
  error?: string[];
  className?: React.ComponentProps<"span">["className"];
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function InputTextarea({
  name,
  label,
  value,
  title,
  disabled = false,
  error,
  className,
  onChange,
}: InputTextareaProps) {
  return (
    <span className={`w-full relative ${className}`} title={title}>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="peer py-2 px-3 w-full min-h-16 max-h-64 rounded bg-input disabled:bg-gray-700 hover:bg-input-hover focus:bg-input-hover outline-none"
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
