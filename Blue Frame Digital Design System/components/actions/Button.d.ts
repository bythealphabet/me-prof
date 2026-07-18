import * as React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'tertiary';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style. `primary` = ink→navy gradient CTA; `secondary` = soft surface;
   *  `ghost` = transparent; `tertiary` = monospace text link with growing underline. */
  variant?: ButtonVariant;
  /** Padding / font scale. @default 'md' */
  size?: ButtonSize;
  /** Render as a different element/component. Defaults to 'a' when `href` is set, else 'button'. */
  as?: React.ElementType;
  /** When set, renders an anchor. */
  href?: string;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  disabled?: boolean;
  /** Node rendered before the label (e.g. a Lucide icon). */
  iconLeft?: React.ReactNode;
  /** Node rendered after the label (e.g. an arrow). */
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Blue Frame Digital primary action. The brand's CTA carries a 135° gradient
 * from ink (#00236f) to primary-blue; secondary buttons use a soft surface with
 * an expanding radial ripple on hover.
 *
 * @startingPoint section="Actions" subtitle="Gradient CTA, surface, ghost & text variants" viewport="700x220"
 */
export declare function Button(props: ButtonProps): React.JSX.Element;
