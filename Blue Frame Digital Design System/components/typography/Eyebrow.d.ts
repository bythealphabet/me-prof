import * as React from 'react';

export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Leading marker. @default '//' — pass '' to hide. */
  prefix?: string;
  children?: React.ReactNode;
}

/**
 * The monospace "// kicker" label that introduces a heading or section —
 * wide tracking, glow-accent color. Signature of the blueprint voice.
 */
export declare function Eyebrow(props: EyebrowProps): React.JSX.Element;
