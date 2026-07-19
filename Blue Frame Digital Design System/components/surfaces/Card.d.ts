import * as React from 'react';

export type CardPadding = 'none' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Element to render. @default 'div' */
  as?: React.ElementType;
  /** Inner padding. @default 'md' */
  padding?: CardPadding;
  /** Enable the hover lift + shimmer sweep. @default false */
  hover?: boolean;
  children?: React.ReactNode;
}

/**
 * Base surface card — top-lit gradient over background-card, 45° draft hatch,
 * and an ambient navy shadow. No 1px borders; edges come from surface contrast.
 * Set `hover` for the lift + shimmer used on interactive cards.
 */
export declare function Card(props: CardProps): React.JSX.Element;
