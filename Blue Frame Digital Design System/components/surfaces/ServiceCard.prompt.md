The signature offer card — monospace title, description, and a coral "Learn more →", with a draft-hatch surface, shimmer sweep, and a subtle 3D mouse-tilt on hover.

```jsx
import { Globe } from 'lucide';
<ServiceCard
  icon={<Globe size={24} />}
  title="Professional Websites"
  description="Give your business a professional online presence that builds trust and turns visitors into clients."
  href="/services/professional-websites"
/>
```

Pass `href` (anchor) or `onClick`. `tilt={false}` disables the 3D effect; `cta` overrides the footer text. Sized to fill its grid cell (min-height `--card-size-h`).
