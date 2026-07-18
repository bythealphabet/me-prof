import * as React from 'react';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';
export type HeadingSize = 'h1' | 'h2' | 'h3';
export type HeadingAlign = 'center' | 'left';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic element for the title. @default 'h2' */
  as?: HeadingTag;
  /** Type scale step. @default 'h2' */
  size?: HeadingSize;
  /** @default 'center' */
  align?: HeadingAlign;
  /** Apply the signature blue text-shadow glow. @default true */
  glow?: boolean;
  /** Optional monospace kicker rendered above the title. */
  eyebrow?: React.ReactNode;
  /** Optional supporting line (Plus Jakarta Sans) under the title. */
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Centered, glowing section title in Courier 700 — the recurring "What We Do"
 * style heading, with an optional monospace eyebrow and a sans subtitle.
 *
 * @startingPoint section="Typography" subtitle="Glowing section title + eyebrow + subtitle" viewport="700x240"
 */
export declare function SectionHeading(props: SectionHeadingProps): React.JSX.Element;
