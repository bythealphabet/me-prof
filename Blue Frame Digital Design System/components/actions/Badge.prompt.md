Small uppercase pill ("Data Tag") for categories, statuses, and gradient callouts like "Most Popular".

```jsx
<Badge>Curaçao</Badge>
<Badge variant="solid">Most Popular</Badge>
<Badge variant="tag" tone="coral" dot>Live</Badge>
<Badge variant="outline">EN · NL · ES · PAP</Badge>
```

Variants: `tag` (default tinted pill), `solid` (gradient callout, square-ish), `outline` (quiet). Tones `coral` / `gold` recolor the tag. `dot` adds a leading status dot; `size` is `sm` or `md`.
