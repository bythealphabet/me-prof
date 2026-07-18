import * as React from 'react';

export interface ServiceCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Monospace card title (service name). */
  title: React.ReactNode;
  /** Supporting description line. */
  description: React.ReactNode;
  /** Optional icon node (e.g. a Lucide icon) shown in a tinted tile. */
  icon?: React.ReactNode;
  /** Renders an anchor when set. */
  href?: string;
  /** Footer call-to-action text. @default 'Learn more →' */
  cta?: React.ReactNode;
  /** Enable the 3D mouse-tilt on hover. @default true */
  tilt?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

/**
 * The signature offer card — monospace title, description, coral "Learn more →",
 * a 45° draft-hatch surface with a shimmer sweep, and a subtle 3D mouse-tilt.
 * Used across the "What We Do" services grid.
 *
 * @startingPoint section="Surfaces" subtitle="Service offer card with 3D tilt & shimmer" viewport="360x420"
 */
export declare function ServiceCard(props: ServiceCardProps): React.JSX.Element;
