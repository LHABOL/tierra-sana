import { clsx } from "clsx";

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea";
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  className?: string;
}

const control =
  "mt-2 w-full border-b border-olive/25 bg-transparent py-2.5 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-stone/50 focus:border-olive";

export function Field({
  label,
  name,
  type = "text",
  required,
  as = "input",
  placeholder,
  autoComplete,
  defaultValue,
  className,
}: FieldProps) {
  return (
    <label className={clsx("block", className)}>
      <span className="text-[0.62rem] uppercase tracking-[0.24em] text-olive-mid">
        {label}
        {required && <span className="text-olive"> *</span>}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={clsx(control, "resize-none")}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          className={control}
        />
      )}
    </label>
  );
}
