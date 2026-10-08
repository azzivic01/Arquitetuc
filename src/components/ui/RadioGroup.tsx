/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
  forcedValue?: string;
  forcedFocusValue?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  forcedValue,
  forcedFocusValue,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || options[0]?.value);
  const selectedValue = forcedValue !== undefined ? forcedValue : controlledValue !== undefined ? controlledValue : internalValue;

  const handleSelect = (val: string) => {
    if (disabled) return;
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  return (
    <div role="radiogroup" aria-label={label} className="flex flex-col gap-2">
      <span
        className="text-xs font-semibold uppercase tracking-wider text-[var(--tema-color-text)] mb-1"
        style={{ fontFamily: 'var(--tema-font-label)' }}
      >
        {label}
      </span>
      <div className="flex flex-col gap-1.5">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          const isForcedFocus = forcedFocusValue === option.value;
          const optId = `radio-${name}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={optId}
              className={`group relative flex items-start gap-3 min-h-[44px] cursor-pointer select-none py-1 ${
                disabled ? 'cursor-not-allowed opacity-40' : ''
              }`}
            >
              <div className="relative flex items-center justify-center min-w-[44px] min-h-[44px] -m-2">
                <input
                  type="radio"
                  id={optId}
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  disabled={disabled}
                  onChange={() => handleSelect(option.value)}
                  className="peer sr-only"
                />
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-[var(--motion-duration-fast)] ${
                    isSelected
                      ? 'border-[var(--tema-color-accent)]'
                      : 'border-[var(--tema-color-border)] group-hover:border-[var(--tema-color-accent-ink)]'
                  } ${
                    isForcedFocus
                      ? 'outline-2 outline-[var(--tema-color-accent-ink)] outline-offset-2 ring-2 ring-[rgba(31,111,92,0.2)]'
                      : 'peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--tema-color-accent-ink)] peer-focus-visible:outline-offset-2'
                  }`}
                >
                  {isSelected && (
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--tema-color-accent)]" />
                  )}
                </div>
              </div>
              <div className="pt-2 text-sm">
                <span className="font-medium text-[var(--tema-color-text)]">
                  {option.label}
                </span>
                {option.description && (
                  <p className="text-xs text-[var(--tema-color-text-muted)] mt-0.5">
                    {option.description}
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};
