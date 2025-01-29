interface InputCheckboxProps {
  label: string;
  name: string;
  checked?: boolean;
  title?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputCheckbox({ name, label, checked = false, title, onChange }: InputCheckboxProps) {
  // Todo add same has focus effect to other inputs to help with keyboard accessability
  return (
    <span className="w-full">
      <label className="flex justify-center py-2 px-3 rounded border border-input bg-input hover:bg-input-hover has-[:checked]:bg-blue-600 has-[:focus]:border-blue-600 duration-200" title={title}>
        <input type="checkbox" name={name} checked={checked} onChange={onChange} className="absolute opacity-0"/>
        <p className="pointer-events-none select-none">{label}</p>
      </label>
    </span>
  );
}
