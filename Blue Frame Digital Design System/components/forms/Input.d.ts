import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
  /** Field label rendered above the control. */
  label?: React.ReactNode;
  /** Render a multi-line textarea instead of an input. @default false */
  multiline?: boolean;
  /** Marks the field required and shows a coral asterisk. */
  required?: boolean;
  /** Helper text shown below the control. */
  hint?: React.ReactNode;
  /** Error message — shows below and turns the focus border coral. */
  error?: React.ReactNode;
}

/**
 * "Fill-in-the-blank" form field — a filled surface that lightens on focus and
 * gains a single primary bottom-border. Set `multiline` for a textarea.
 */
export declare function Input(props: InputProps): React.JSX.Element;
