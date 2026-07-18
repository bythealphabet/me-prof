Brand button — a gradient primary CTA, a soft surface secondary, a quiet ghost, and a monospace tertiary text link; use it for any action or navigation affordance.

```jsx
<Button variant="primary" href="/contact" iconRight={<ArrowRight size={20} />}>
  Get Started
</Button>

<Button variant="secondary">Our Services</Button>
<Button variant="tertiary">Learn more →</Button>
```

Variants: `primary` (signature ink→navy gradient), `secondary` (soft surface + radial ripple), `ghost` (transparent), `tertiary` (Courier text link with an underline that grows on hover). Sizes: `sm` / `md` / `lg`. Pass `href` to render an `<a>`, `fullWidth` to stretch, and `iconLeft` / `iconRight` for Lucide icons.
