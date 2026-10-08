/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps {
  id?: string;
  label: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  forcedState?: 'checked' | 'unchecked' | 'focus' | 'disabled';
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  description,
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  onChange,
  forcedState,
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isChecked =
    forcedState === 'checked'
      ? true
      : forcedState === 'unchecked'
      ? false
      : controlledChecked !== undefined
      ? controlledChecked
      : internalChecked;

  const effectivelyDisabled = disabled || forcedState === 'disabled';
  const isFocus = forcedState === 'focus';
  const inputId = id || `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (effectivelyDisabled) return;
    if (controlledChecked === undefined) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e.target.checked);
  };

  return (
    <label
      htmlFor={inputId}
      className={`group relative flex items-start gap-3 min-h-[44px] cursor-pointer select-none py-1 ${
        effectivelyDisabled ? 'cursor-not-allowed opacity-40' : ''
      }`}
    >
      <div className="relative flex items-center justify-center min-w-[44px] min-h-[44px] -m-2">
        <input
          type="checkbox"
          id={inputId}
          checked={isChecked}
          disabled={effectivelyDisabled}
          onChange={handleChange}
          className="peer sr-only"
        />
        <div
          className={`flex h-5 w-5 items-center justify-center rounded-[6px] border transition-all duration-[var(--motion-duration-fast)] ${
            isChecked
              ? 'bg-[var(--tema-color-accent)] border-[var(--tema-color-accent)] text-[var(--tema-color-on-accent)]'
              : 'bg-[var(--tema-color-surface)] border-[var(--tema-color-border)] group-hover:border-[var(--tema-color-accent-ink)]'
          } ${
            isFocus
              ? 'outline-2 outline-[var(--tema-color-accent-ink)] outline-offset-2 ring-2 ring-[rgba(31,111,92,0.2)]'
              : 'peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--tema-color-accent-ink)] peer-focus-visible:outline-offset-2'
          }`}
        >
          {isChecked && <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />}
        </div>
      </div>
      <div className="pt-2 text-sm">
        <span className="font-medium text-[var(--tema-color-text)] leading-snug">
          {label}
        </span>
        {description && (
          <p className="text-xs text-[var(--tema-color-text-muted)] mt-0.5">
            {description}
          </p>
        )}
      </div>
    </label>
  );
};
