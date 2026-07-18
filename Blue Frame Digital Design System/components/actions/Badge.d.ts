import * as React from 'react';

export type BadgeVariant = 'tag' | 'solid' | 'outline';
export type BadgeTone = 'default' | 'coral' | 'gold';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `tag` = the signature rounded "Data Tag" pill; `solid` = gradient callout
   *  (e.g. "Most Popular"); `outline` = quiet ghost-bordered. @default 'tag' */
  variant?: BadgeVariant;
  /** Warm signal color (applies to the `tag` variant). @default 'default' */
  tone?: BadgeTone;
  /** @default 'sm' */
  size?: BadgeSize;
  /** Show a leading status dot. */
  dot?: boolean;
  children?: React.ReactNode;
}

/**
 * The "Data Tag" — a small uppercase pill (Plus Jakarta Sans) for categories,
 * statuses, and gradient callouts. Adds a pop of technical detail to minimal layouts.
 */
export declare function Badge(props: BadgeProps): React.JSX.Element;
