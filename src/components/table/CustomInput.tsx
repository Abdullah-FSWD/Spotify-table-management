import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { nanoid } from 'nanoid';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const CustomInput = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: CustomInputProps) => {
  const inputId = id || `input-${nanoid()}`;

  return (
    <div className="w-full">
      {label && (
        <Label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </Label>
      )}
      <Input
        id={inputId}
        className={`
          ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}
          ${className}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error
            ? `${inputId}-error`
            : helperText
            ? `${inputId}-helper`
            : undefined
        }
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};
