/* @ds-bundle: {"format":3,"namespace":"BlueFrameDigitalDesignSystem_91c13d","components":[{"name":"Badge","sourcePath":"components/actions/Badge.jsx"},{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"ServiceCard","sourcePath":"components/surfaces/ServiceCard.jsx"},{"name":"Eyebrow","sourcePath":"components/typography/Eyebrow.jsx"},{"name":"SectionHeading","sourcePath":"components/typography/SectionHeading.jsx"}],"sourceHashes":{"components/actions/Badge.jsx":"a469cad50de2","components/actions/Button.jsx":"5e62179cfa46","components/forms/Input.jsx":"d080ac1e528e","components/surfaces/Card.jsx":"523af80fc2a3","components/surfaces/ServiceCard.jsx":"0ea0fd4bdac5","components/typography/Eyebrow.jsx":"db16586a09b1","components/typography/SectionHeading.jsx":"558e50902fe0","ui_kits/website/icons.jsx":"c61245f70efa","ui_kits/website/nav.jsx":"8c3b376d41be","ui_kits/website/sections.jsx":"531c78d5914a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BlueFrameDigitalDesignSystem_91c13d = window.BlueFrameDigitalDesignSystem_91c13d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Blue Frame Digital — Badge / Data Tag
 * The "Data Tag" is the signature small pill for categories and status. A solid
 * gradient variant covers callouts like "Most Popular"; outline is the quiet form.
 */

const css = `
.bfd-badge {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-family: var(--font-accent);
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1;
  padding: 0.55rem 1.1rem;
  border-radius: var(--radius-pill);
  white-space: nowrap;
}
.bfd-badge--md { font-size: 1.3rem; padding: 0.7rem 1.4rem; }

/* tag — the default Data Tag: tinted navy fill */
.bfd-badge--tag {
  background: color-mix(in srgb, var(--primary-blue) 30%, transparent);
  color: var(--primary-teal-pale, var(--primary-blue-pale));
}

/* solid — gradient callout (e.g. "Most Popular") */
.bfd-badge--solid {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-bright) 100%);
  color: var(--text-primary);
  box-shadow: 0 4px 15px rgba(96, 165, 250, 0.4);
  border-radius: var(--radius-sm);
}

/* outline — ghost-bordered, low emphasis */
.bfd-badge--outline {
  background: transparent;
  color: var(--text-secondary);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--text-light) 40%, transparent);
}

/* warm tones — apply on top of any variant for signal color */
.bfd-badge--coral.bfd-badge--tag { background: color-mix(in srgb, var(--accent-coral) 22%, transparent); color: var(--accent-coral); }
.bfd-badge--gold.bfd-badge--tag  { background: color-mix(in srgb, var(--accent-gold) 22%, transparent); color: var(--accent-gold); }

.bfd-badge__dot { width: 0.7rem; height: 0.7rem; border-radius: 50%; background: currentColor; }
`;
if (typeof document !== 'undefined' && !document.getElementById('bfd-badge-css')) {
  const s = document.createElement('style');
  s.id = 'bfd-badge-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Badge({
  variant = 'tag',
  tone = 'default',
  size = 'sm',
  dot = false,
  className = '',
  children,
  ...rest
}) {
  const classes = ['bfd-badge', `bfd-badge--${variant}`, `bfd-badge--${size}`, tone !== 'default' ? `bfd-badge--${tone}` : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classes
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "bfd-badge__dot"
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Badge.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
/**
 * Blue Frame Digital — Button
 * Brand buttons: a signature ink→navy gradient primary, a soft surface
 * secondary with an expanding radial ripple, a quiet ghost, and a monospace
 * "tertiary" text link with an underline that grows on hover.
 */

const css = `
.bfd-btn {
  --_ripple: rgba(30, 58, 138, 0.2);
  display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem;
  font-family: var(--font-accent);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-body);
  line-height: 1;
  border: none; cursor: pointer; text-decoration: none;
  border-radius: var(--radius-md);
  padding: 1.2rem 2.6rem;
  position: relative; overflow: hidden;
  transition: transform var(--duration-fast) var(--easing-ease-out),
              box-shadow var(--duration-fast) var(--easing-ease-out),
              background var(--duration-fast) var(--easing-ease-out);
  -webkit-tap-highlight-color: transparent;
}
.bfd-btn::before {
  content: ''; position: absolute; top: 50%; left: 50%;
  width: 0; height: 0; border-radius: 50%;
  background: var(--_ripple);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none;
}
.bfd-btn:hover::before { width: 320px; height: 320px; }
.bfd-btn > * { position: relative; z-index: 1; }
.bfd-btn:focus-visible { outline: 3px solid var(--primary-teal, var(--primary-blue-light)); outline-offset: 2px; }
.bfd-btn[aria-disabled="true"], .bfd-btn:disabled { opacity: 0.5; pointer-events: none; cursor: not-allowed; }

/* sizes */
.bfd-btn--sm { padding: 0.7rem 1.6rem; font-size: var(--font-size-small); }
.bfd-btn--lg { padding: 1.5rem 3.4rem; font-size: 1.9rem; }
.bfd-btn--block { display: flex; width: 100%; }

/* primary — the lithographic gradient */
.bfd-btn--primary {
  background: linear-gradient(135deg, var(--gradient-ink, #00236f) 0%, var(--primary-blue) 100%);
  color: var(--text-primary);
  box-shadow: 0 4px 16px rgba(11, 28, 48, 0.25);
}
.bfd-btn--primary:hover {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-light) 100%);
  box-shadow: 0 8px 28px rgba(11, 28, 48, 0.35);
  transform: translateY(-2px);
}
.bfd-btn--primary:active { transform: translateY(0); }

/* secondary — soft surface */
.bfd-btn--secondary {
  background: color-mix(in srgb, var(--background-card) 80%, var(--primary-blue) 20%);
  color: var(--primary-teal-pale, var(--primary-blue-pale));
  box-shadow: 0 4px 16px rgba(11, 28, 48, 0.2);
}
.bfd-btn--secondary:hover {
  background: color-mix(in srgb, var(--background-card) 60%, var(--primary-blue) 40%);
  box-shadow: 0 8px 28px rgba(11, 28, 48, 0.35);
  transform: translateY(-2px) scale(1.04);
}

/* ghost — outline-free, surface tint on hover */
.bfd-btn--ghost { background: transparent; color: var(--text-secondary); }
.bfd-btn--ghost::before { --_ripple: transparent; }
.bfd-btn--ghost:hover { background: color-mix(in srgb, var(--background-card) 70%, transparent); color: var(--primary-teal-bright, var(--primary-blue-bright)); }

/* tertiary — monospace text link with growing underline */
.bfd-btn--tertiary {
  background: transparent; color: var(--accent-coral, var(--primary-blue-bright));
  font-family: var(--font-mono); font-weight: 600;
  padding: 0.4rem 0.2rem; border-radius: 0; overflow: visible;
}
.bfd-btn--tertiary::before { display: none; }
.bfd-btn--tertiary::after {
  content: ''; position: absolute; left: 0; bottom: 0; height: 2px; width: 0;
  background: currentColor; transition: width var(--duration-fast) var(--easing-ease-out);
}
.bfd-btn--tertiary:hover { color: var(--primary-teal-bright, var(--primary-blue-light)); }
.bfd-btn--tertiary:hover::after { width: 100%; }
`;
if (typeof document !== 'undefined' && !document.getElementById('bfd-button-css')) {
  const s = document.createElement('style');
  s.id = 'bfd-button-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Button({
  variant = 'primary',
  size = 'md',
  as,
  href,
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  className = '',
  children,
  ...rest
}) {
  const Tag = as || (href ? 'a' : 'button');
  const classes = ['bfd-btn', `bfd-btn--${variant}`, size !== 'md' ? `bfd-btn--${size}` : '', fullWidth ? 'bfd-btn--block' : '', className].filter(Boolean).join(' ');
  const tagProps = {
    className: classes,
    ...rest
  };
  if (Tag === 'a') {
    tagProps.href = disabled ? undefined : href;
    tagProps['aria-disabled'] = disabled ? 'true' : undefined;
  } else {
    tagProps.disabled = disabled;
  }
  return /*#__PURE__*/React.createElement(Tag, tagProps, iconLeft ? /*#__PURE__*/React.createElement("span", {
    className: "bfd-btn__icon"
  }, iconLeft) : null, /*#__PURE__*/React.createElement("span", null, children), iconRight ? /*#__PURE__*/React.createElement("span", {
    className: "bfd-btn__icon"
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Blue Frame Digital — Input / Field
 * The "fill-in-the-blank" form control: a filled surface that lightens on focus
 * and gains a single primary bottom-border — like writing on an architectural form.
 * Handles single-line inputs and (via `multiline`) textareas.
 */

const css = `
.bfd-field { display: flex; flex-direction: column; gap: 0.7rem; }
.bfd-field__label {
  font-family: var(--font-accent); font-weight: 600;
  font-size: var(--font-size-small);
  color: var(--text-secondary);
  letter-spacing: 0.02em;
}
.bfd-field__req { color: var(--accent-coral); margin-left: 0.3ch; }
.bfd-field__control {
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  color: var(--text-primary);
  background: color-mix(in srgb, var(--background-dark) 70%, var(--background-card) 30%);
  border: none;
  border-bottom: 1px solid transparent;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  padding: 1.2rem 1.4rem;
  width: 100%;
  transition: background var(--duration-fast) ease, border-color var(--duration-fast) ease, box-shadow var(--duration-fast) ease;
}
.bfd-field__control::placeholder { color: var(--text-light); }
.bfd-field__control:hover { background: color-mix(in srgb, var(--background-dark) 55%, var(--background-card) 45%); }
.bfd-field__control:focus {
  outline: none;
  background: var(--background-card);
  border-bottom-color: var(--primary-teal, var(--primary-blue-light));
  box-shadow: 0 1px 0 0 var(--primary-teal, var(--primary-blue-light));
}
.bfd-field__control--area { min-height: 12rem; resize: vertical; line-height: var(--line-height-normal); }
.bfd-field__control[aria-invalid="true"] { border-bottom-color: var(--accent-coral); box-shadow: 0 1px 0 0 var(--accent-coral); }
.bfd-field__hint { font-family: var(--font-accent); font-size: 1.2rem; color: var(--text-light); }
.bfd-field__hint--error { color: var(--accent-coral); }
`;
if (typeof document !== 'undefined' && !document.getElementById('bfd-field-css')) {
  const s = document.createElement('style');
  s.id = 'bfd-field-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Input({
  label,
  id,
  multiline = false,
  required = false,
  hint = null,
  error = null,
  className = '',
  ...rest
}) {
  const autoId = React.useId();
  const fieldId = id || autoId;
  const Control = multiline ? 'textarea' : 'input';
  const controlClass = ['bfd-field__control', multiline ? 'bfd-field__control--area' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: ['bfd-field', className].filter(Boolean).join(' ')
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "bfd-field__label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "bfd-field__req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement(Control, _extends({
    id: fieldId,
    className: controlClass,
    "aria-invalid": error ? 'true' : undefined,
    required: required
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    className: "bfd-field__hint bfd-field__hint--error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "bfd-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Blue Frame Digital — Card
 * The base surface: a faint top-lit gradient over background-card, the 45° draft
 * hatch, a navy-tinted ambient shadow, and an optional hover lift + shimmer.
 * No divider lines — the brand defines edges with surface, never 1px borders.
 */

const css = `
.bfd-card {
  position: relative;
  background: linear-gradient(160deg, color-mix(in srgb, var(--background-card) 88%, white 12%) 0%, var(--background-card) 55%);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: box-shadow var(--duration-slow) var(--easing-ease-out),
              transform var(--duration-slow) var(--easing-ease-out);
}
.bfd-card__body { position: relative; z-index: 2; }
.bfd-card--pad-md .bfd-card__body { padding: var(--spacing-xl); }
.bfd-card--pad-lg .bfd-card__body { padding: var(--spacing-2xl); }
.bfd-card--pad-none .bfd-card__body { padding: 0; }

/* 45° draft hatch */
.bfd-card::before {
  content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(30,58,138,0.03) 10px, rgba(30,58,138,0.03) 20px);
  opacity: 1; transition: opacity var(--duration-fast) ease;
}
/* shimmer sweep */
.bfd-card::after {
  content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; z-index: 1; pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(96,165,250,0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.8s var(--easing-ease-out);
}
.bfd-card--hover:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-6px);
}
.bfd-card--hover:hover::before { opacity: 0; }
.bfd-card--hover:hover::after { transform: translateX(100%); }
`;
if (typeof document !== 'undefined' && !document.getElementById('bfd-card-css')) {
  const s = document.createElement('style');
  s.id = 'bfd-card-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Card({
  as = 'div',
  padding = 'md',
  hover = false,
  className = '',
  children,
  ...rest
}) {
  const Tag = as;
  const classes = ['bfd-card', `bfd-card--pad-${padding}`, hover ? 'bfd-card--hover' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: classes
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "bfd-card__body"
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Blue Frame Digital — ServiceCard
 * The signature offer card: monospace title, body, and a coral "Learn more →".
 * Subtle 3D mouse-tilt on hover (disabled for touch / reduced-motion), plus the
 * shared hatch + shimmer surface. Optional Lucide icon node in the top corner.
 */

const css = `
.bfd-service {
  position: relative;
  display: flex; flex-direction: column;
  height: 100%; min-height: var(--card-size-h, 38rem);
  text-align: left;
  background: linear-gradient(160deg, color-mix(in srgb, var(--background-card) 88%, white 12%) 0%, var(--background-card) 55%);
  border: none; border-radius: var(--radius-sm);
  box-shadow: var(--shadow-card);
  padding: var(--spacing-xl);
  overflow: hidden; cursor: pointer;
  font-family: inherit; color: inherit;
  transform: perspective(1000px);
  transform-style: preserve-3d;
  transition: box-shadow 800ms var(--easing-ease-out), transform 250ms var(--easing-ease-out);
}
.bfd-service::before {
  content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(30,58,138,0.03) 10px, rgba(30,58,138,0.03) 20px);
  transition: opacity var(--duration-fast) ease;
}
.bfd-service::after {
  content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; z-index: 1; pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(96,165,250,0.1), transparent);
  transform: translateX(-100%); transition: transform 0.8s var(--easing-ease-out);
}
.bfd-service:hover { box-shadow: var(--shadow-card-hover); }
.bfd-service:hover::before { opacity: 0; }
.bfd-service:hover::after { transform: translateX(100%); }
.bfd-service:focus-visible { outline: 3px solid var(--primary-teal, var(--primary-blue-light)); outline-offset: 3px; }

.bfd-service > * { position: relative; z-index: 2; }
.bfd-service__icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 4.4rem; height: 4.4rem; margin-bottom: var(--spacing-md);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--primary-blue) 28%, transparent);
  color: var(--primary-teal-bright, var(--primary-blue-bright));
}
.bfd-service__title {
  font-family: var(--font-heading); font-weight: 700;
  font-size: clamp(2.4rem, 2.5vw, 3rem);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-md);
  transform: translateZ(10px);
}
.bfd-service__desc {
  font-family: var(--font-body);
  color: var(--text-tertiary);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-body);
  margin: 0; flex: 1;
  transform: translateZ(5px);
}
.bfd-service__more {
  margin-top: var(--spacing-lg);
  font-family: var(--font-mono); font-size: 1.4rem; font-weight: 600;
  color: var(--accent-coral, var(--primary-blue-bright));
  transition: color var(--duration-fast) ease;
}
.bfd-service:hover .bfd-service__more { color: var(--primary-teal-bright, var(--primary-blue-light)); }
@media (prefers-reduced-motion: reduce) {
  .bfd-service { transform: none !important; }
}
`;
if (typeof document !== 'undefined' && !document.getElementById('bfd-service-css')) {
  const s = document.createElement('style');
  s.id = 'bfd-service-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function ServiceCard({
  title,
  description,
  icon = null,
  href,
  cta = 'Learn more →',
  tilt = true,
  className = '',
  onClick,
  ...rest
}) {
  const ref = React.useRef(null);
  const [transform, setTransform] = React.useState('perspective(1000px)');
  const handleMove = e => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const rx = (e.clientY - r.top - r.height / 2) / (r.height / 2) * 3;
    const ry = (r.width / 2 - (e.clientX - r.left)) / (r.width / 2) * 3;
    setTransform(`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`);
  };
  const reset = () => setTransform('perspective(1000px)');
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    href: href,
    type: href ? undefined : 'button',
    className: ['bfd-service', className].filter(Boolean).join(' '),
    style: {
      transform
    },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    onClick: onClick
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    className: "bfd-service__icon"
  }, icon) : null, /*#__PURE__*/React.createElement("h3", {
    className: "bfd-service__title"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "bfd-service__desc"
  }, description), /*#__PURE__*/React.createElement("span", {
    className: "bfd-service__more"
  }, cta));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/typography/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Blue Frame Digital — Eyebrow
 * The monospace "// kicker" that sits above headings. Wide tracking, glow accent.
 */

const css = `
.bfd-eyebrow {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: var(--font-size-small);
  letter-spacing: var(--tracking-label);
  color: var(--primary-teal-bright, var(--primary-blue-bright));
  margin: 0 0 var(--spacing-sm);
}
.bfd-eyebrow__prefix { opacity: 0.7; margin-right: 0.5ch; }
`;
if (typeof document !== 'undefined' && !document.getElementById('bfd-eyebrow-css')) {
  const s = document.createElement('style');
  s.id = 'bfd-eyebrow-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Eyebrow({
  prefix = '//',
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    className: ['bfd-eyebrow', className].filter(Boolean).join(' ')
  }, rest), prefix ? /*#__PURE__*/React.createElement("span", {
    className: "bfd-eyebrow__prefix"
  }, prefix) : null, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typography/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/typography/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Blue Frame Digital — SectionHeading
 * The centered, glowing section title (Courier 700). Optional eyebrow above.
 */

const css = `
.bfd-heading { margin: 0; }
.bfd-heading__title {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-bold);
  color: var(--primary-teal-pale, var(--primary-blue-pale));
  line-height: var(--line-height-tight);
  margin: 0;
  text-wrap: balance;
}
.bfd-heading--glow .bfd-heading__title { text-shadow: 0 0 20px rgba(96, 165, 250, 0.3); }
.bfd-heading--center { text-align: center; }
.bfd-heading--center .bfd-heading__eyebrow { display: block; }
.bfd-heading__eyebrow {
  font-family: var(--font-mono);
  font-size: var(--font-size-small);
  letter-spacing: var(--tracking-label);
  color: var(--primary-teal-bright, var(--primary-blue-bright));
  margin: 0 0 var(--spacing-md);
}
.bfd-heading__sub {
  font-family: var(--font-accent);
  font-weight: 400;
  font-size: var(--font-size-body);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  margin: var(--spacing-md) 0 0;
  max-width: 60ch;
}
.bfd-heading--center .bfd-heading__sub { margin-left: auto; margin-right: auto; }
.bfd-heading--size-h1 .bfd-heading__title { font-size: var(--font-size-h1); }
.bfd-heading--size-h2 .bfd-heading__title { font-size: var(--font-size-h2); }
.bfd-heading--size-h3 .bfd-heading__title { font-size: var(--font-size-h3); }
`;
if (typeof document !== 'undefined' && !document.getElementById('bfd-heading-css')) {
  const s = document.createElement('style');
  s.id = 'bfd-heading-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function SectionHeading({
  as = 'h2',
  size = 'h2',
  align = 'center',
  glow = true,
  eyebrow = null,
  subtitle = null,
  className = '',
  children,
  ...rest
}) {
  const Tag = as;
  const classes = ['bfd-heading', `bfd-heading--size-${size}`, `bfd-heading--${align}`, glow ? 'bfd-heading--glow' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes
  }, rest), eyebrow ? /*#__PURE__*/React.createElement("span", {
    className: "bfd-heading__eyebrow"
  }, eyebrow) : null, /*#__PURE__*/React.createElement(Tag, {
    className: "bfd-heading__title"
  }, children), subtitle ? /*#__PURE__*/React.createElement("p", {
    className: "bfd-heading__sub"
  }, subtitle) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typography/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Blue Frame Digital — UI kit: inline Lucide icons (ISC licensed).
   A React-safe icon set — no DOM replacement, renders as real SVG children. */

const LUCIDE = {
  'arrow-right': ['M5 12h14', 'm12 5 7 7-7 7'],
  globe: ['M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', 'M2 12h20', {
    circle: {
      cx: 12,
      cy: 12,
      r: 10
    }
  }],
  sparkles: ['M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z', 'M20 3v4', 'M22 5h-4', 'M4 17v2', 'M5 18H3'],
  filter: [{
    polygon: {
      points: '22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3'
    }
  }],
  plug: ['M12 22v-5', 'M9 8V2', 'M15 8V2', 'M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z'],
  search: ['m21 21-4.3-4.3', {
    circle: {
      cx: 11,
      cy: 11,
      r: 8
    }
  }],
  'bar-chart-2': [{
    line: {
      x1: 18,
      x2: 18,
      y1: 20,
      y2: 10
    }
  }, {
    line: {
      x1: 12,
      x2: 12,
      y1: 20,
      y2: 4
    }
  }, {
    line: {
      x1: 6,
      x2: 6,
      y1: 20,
      y2: 14
    }
  }],
  check: ['M20 6 9 17l-5-5'],
  'map-pin': ['M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0', {
    circle: {
      cx: 12,
      cy: 10,
      r: 3
    }
  }],
  mail: ['m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7', {
    rect: {
      width: 20,
      height: 16,
      x: 2,
      y: 4,
      rx: 2
    }
  }],
  'message-circle': ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  send: ['M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z', 'm21.854 2.147-10.94 10.939'],
  moon: ['M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'],
  sun: ['M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41', 'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41', {
    circle: {
      cx: 12,
      cy: 12,
      r: 4
    }
  }],
  menu: ['M4 12h16', 'M4 6h16', 'M4 18h16']
};
function Icon({
  name,
  size = 24,
  className = '',
  ...rest
}) {
  const parts = LUCIDE[name] || [];
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className,
    "aria-hidden": "true"
  }, rest), parts.map((p, i) => {
    if (typeof p === 'string') return /*#__PURE__*/React.createElement("path", {
      key: i,
      d: p
    });
    const tag = Object.keys(p)[0];
    return React.createElement(tag, {
      key: i,
      ...p[tag]
    });
  }));
}
Object.assign(window, {
  Icon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/nav.jsx
try { (() => {
/* Blue Frame Digital — UI kit: top nav + theme/palette control.
   Exports SiteNav and PaletteControl to window for the other kit scripts. */

const {
  useState,
  useEffect
} = React;
const PALETTES = [{
  id: 'blue',
  label: 'Blue',
  dot: '#2563eb'
}, {
  id: 'green',
  label: 'Ocean',
  dot: '#0d9488'
}, {
  id: 'wood',
  label: 'Wood',
  dot: '#b45309'
}];
function PaletteControl() {
  const [palette, setPalette] = useState(() => document.documentElement.dataset.palette || 'blue');
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  useEffect(() => {
    document.documentElement.dataset.palette = palette;
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('bfd-palette', palette);
      localStorage.setItem('bfd-theme', theme);
    } catch (e) {}
  }, [palette, theme]);
  return /*#__PURE__*/React.createElement("div", {
    className: "bfd-palette-ctrl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bfd-palette-ctrl__swatches"
  }, PALETTES.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    className: 'bfd-palette-ctrl__sw' + (palette === p.id ? ' is-active' : ''),
    style: {
      background: p.dot
    },
    "aria-label": p.label + ' palette',
    "aria-pressed": palette === p.id,
    onClick: () => setPalette(p.id)
  }))), /*#__PURE__*/React.createElement("button", {
    className: "bfd-palette-ctrl__theme",
    onClick: () => setTheme(t => t === 'dark' ? 'light' : 'dark'),
    "aria-label": "Toggle dark / light"
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: theme === 'dark' ? 'moon' : 'sun',
    size: 18
  })));
}
function SiteNav({
  onNav
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [['Services', 'services'], ['Why Us', 'about'], ['Pricing', 'pricing'], ['Contact', 'contact']];
  return /*#__PURE__*/React.createElement("header", {
    className: 'bfd-nav' + (scrolled ? ' is-scrolled' : '')
  }, /*#__PURE__*/React.createElement("a", {
    className: "bfd-nav__logo",
    href: "#top",
    onClick: e => {
      e.preventDefault();
      onNav('top');
    }
  }, "Blue", /*#__PURE__*/React.createElement("span", null, "Frame"), " Digital"), /*#__PURE__*/React.createElement("nav", {
    className: "bfd-nav__links"
  }, links.map(([label, id]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: '#' + id,
    onClick: e => {
      e.preventDefault();
      onNav(id);
    }
  }, label))), /*#__PURE__*/React.createElement(PaletteControl, null));
}
Object.assign(window, {
  SiteNav,
  PaletteControl
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections.jsx
try { (() => {
/* Blue Frame Digital — UI kit: page sections.
   Consumes the design-system primitives from the compiled bundle. */

const DS = window.BlueFrameDigitalDesignSystem_91c13d || {};
const {
  Button,
  ServiceCard,
  SectionHeading,
  Eyebrow,
  Badge,
  Card,
  Input
} = DS;
const {
  Icon
} = window;
const SERVICES = [{
  icon: 'globe',
  title: 'Professional Websites',
  desc: 'A professional online presence that builds trust and turns visitors into clients.'
}, {
  icon: 'sparkles',
  title: 'AI Business Assistant',
  desc: 'Custom AI agents trained on how you work — smarter quoting and website chat that save hours.'
}, {
  icon: 'filter',
  title: 'Conversion Design',
  desc: 'Turn more visitors into inquiries with the right forms, CTAs, and trust signals.'
}, {
  icon: 'plug',
  title: 'Custom Integrations',
  desc: 'Connect your site to CRM, calendar, payments, and WhatsApp — reliable automations, not copy-paste.'
}, {
  icon: 'search',
  title: 'Local SEO',
  desc: "Show up in Google's map pack when people in Curaçao search for what you offer."
}, {
  icon: 'bar-chart-2',
  title: 'Growth & Support',
  desc: 'Your website keeps improving after launch — monthly updates, reports, and new features.'
}];
const ABOUT = ['Most Curaçao businesses have a website. Very few have one that actually works. Keeping up with a fast-moving digital landscape isn’t realistic when you’re already running a business. That’s not a website problem — that’s a strategy problem. And it’s exactly the gap we fill.', 'Over the past 8+ years we’ve dedicated ourselves to web development — including enterprise-level work in the Netherlands for clients like DPG Media, National Geographic, and SourceUp. We bring a blue-collar work ethic to every project: show up, do the work, and don’t leave until it’s done right.', 'You need a digital presence that works as hard as you do — one that attracts quality leads, showcases your work, and positions you as the professional choice in your market. That’s exactly what we build.'];
function Hero({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "bfd-hero bfd-blueprint-grid",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bfd-hero__panel"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/hero-image.jpg",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "bfd-hero__content"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Blue Wave Based"), /*#__PURE__*/React.createElement("h1", {
    className: "bfd-hero__title"
  }, "Blue", /*#__PURE__*/React.createElement("span", null, "Frame"), /*#__PURE__*/React.createElement("br", null), "Digital."), /*#__PURE__*/React.createElement("p", {
    className: "bfd-hero__tag"
  }, "Your Cura\xE7ao business deserves a website that actually works."), /*#__PURE__*/React.createElement("div", {
    className: "bfd-hero__cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onNav('services')
  }, "Our Services"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => onNav('about')
  }, "Why Choose Us"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 20
    }),
    onClick: () => onNav('contact')
  }, "Get Started"))));
}
function Services({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "bfd-section",
    id: "services"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "// What We Do",
    subtitle: "Six ways we help Cura\xE7ao businesses win online \u2014 from the first impression to the leads that follow."
  }, "What We Do"), /*#__PURE__*/React.createElement("div", {
    className: "bfd-services-grid"
  }, SERVICES.map(s => /*#__PURE__*/React.createElement(ServiceCard, {
    key: s.title,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: s.icon,
      size: 24
    }),
    title: s.title,
    description: s.desc,
    onClick: () => onNav('contact')
  }))));
}
function About() {
  return /*#__PURE__*/React.createElement("section", {
    className: "bfd-section bfd-section--alt",
    id: "about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bfd-about"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    size: "h2",
    eyebrow: "// Why Choose Us"
  }, "Why Cura\xE7ao businesses choose Blue Frame Digital"), /*#__PURE__*/React.createElement("div", {
    className: "bfd-about__copy"
  }, ABOUT.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i
  }, p)), /*#__PURE__*/React.createElement("div", {
    className: "bfd-about__tags"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, "EN \xB7 NL \xB7 ES \xB7 PAP"), /*#__PURE__*/React.createElement(Badge, {
    tone: "gold"
  }, "8+ years"), /*#__PURE__*/React.createElement(Badge, {
    tone: "coral"
  }, "Enterprise NL")))));
}
const PACKAGES = [{
  name: 'Website Build',
  price: '$2,000',
  tagline: 'You provide content, we build',
  features: ['Custom SvelteKit website', 'Responsive design', '2 rounds of revisions', 'SEO optimization'],
  timeline: 'Timeline: 3–6 weeks*',
  note: '*Depends on your content delivery speed',
  bestFor: 'Clients with existing professional photos',
  popular: false
}, {
  name: 'Complete Package',
  price: '$3,500',
  tagline: 'We handle everything',
  features: ['Professional photoshoot (4 hours)', '20–30 edited photos', 'Professional copywriting', 'Everything from Website Build', 'Optional: Company video (+$300)'],
  timeline: 'Timeline: 3 weeks guaranteed',
  note: 'We control everything — no delays',
  bestFor: 'Busy professionals who want it done right, done fast',
  popular: true
}];
function Pricing({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "bfd-section",
    id: "pricing"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "// Pricing",
    subtitle: "Two clear packages. No surprises."
  }, "Choose Your Package"), /*#__PURE__*/React.createElement("div", {
    className: "bfd-pricing"
  }, PACKAGES.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    className: 'bfd-pkg' + (p.popular ? ' bfd-pkg--popular' : '')
  }, p.popular ? /*#__PURE__*/React.createElement("span", {
    className: "bfd-pkg__badge"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "solid"
  }, "Most Popular")) : null, /*#__PURE__*/React.createElement("h3", {
    className: "bfd-pkg__name"
  }, p.name), /*#__PURE__*/React.createElement("p", {
    className: "bfd-pkg__price"
  }, p.price), /*#__PURE__*/React.createElement("p", {
    className: "bfd-pkg__tagline"
  }, p.tagline), /*#__PURE__*/React.createElement("ul", {
    className: "bfd-pkg__features"
  }, p.features.map(f => /*#__PURE__*/React.createElement("li", {
    key: f
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, f)))), /*#__PURE__*/React.createElement("div", {
    className: "bfd-pkg__timeline"
  }, /*#__PURE__*/React.createElement("strong", null, p.timeline), /*#__PURE__*/React.createElement("span", null, p.note)), /*#__PURE__*/React.createElement("p", {
    className: "bfd-pkg__bestfor"
  }, /*#__PURE__*/React.createElement("strong", null, "Best for:"), " ", p.bestFor), /*#__PURE__*/React.createElement(Button, {
    variant: p.popular ? 'primary' : 'secondary',
    fullWidth: true,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 20
    }),
    onClick: () => onNav('contact')
  }, "Get Started")))));
}
function Contact() {
  const [sent, setSent] = React.useState(false);
  const submit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3200);
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "bfd-section bfd-section--alt",
    id: "contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bfd-contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bfd-contact__intro"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    size: "h2",
    eyebrow: "// Get Started"
  }, "Let\u2019s build something that works"), /*#__PURE__*/React.createElement("p", {
    className: "bfd-contact__lede"
  }, "Tell us about your business. We\u2019ll start with a conversation, not a contract."), /*#__PURE__*/React.createElement("ul", {
    className: "bfd-contact__info"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 20
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "bfd-contact__label"
  }, "Location"), "Willemstad, Cura\xE7ao")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 20
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "bfd-contact__label"
  }, "Email"), "hello@blueframe.digital")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 20
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "bfd-contact__label"
  }, "WhatsApp"), "Message us \u2014 Cura\xE7ao runs on WhatsApp")))), /*#__PURE__*/React.createElement("form", {
    className: "bfd-contact__form",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Your name",
    placeholder: "Jane Doe",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "you@business.cw",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "What do you need?",
    multiline: true,
    placeholder: "A new site, AI quoting, better SEO\u2026"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    type: "submit",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "send",
      size: 20
    })
  }, sent ? 'Thanks — we’ll be in touch!' : 'Send message'))));
}
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "bfd-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bfd-footer__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bfd-footer__brand"
  }, /*#__PURE__*/React.createElement("p", {
    className: "bfd-footer__logo"
  }, "Blue", /*#__PURE__*/React.createElement("span", null, "Frame"), " Digital"), /*#__PURE__*/React.createElement("p", {
    className: "bfd-footer__tag"
  }, "Websites and digital marketing for businesses in Cura\xE7ao \u2014 built to convert.")), /*#__PURE__*/React.createElement("div", {
    className: "bfd-footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Services"), /*#__PURE__*/React.createElement("ul", null, SERVICES.map(s => /*#__PURE__*/React.createElement("li", {
    key: s.title
  }, s.title)))), /*#__PURE__*/React.createElement("div", {
    className: "bfd-footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Explore"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Home"), /*#__PURE__*/React.createElement("li", null, "All services"), /*#__PURE__*/React.createElement("li", null, "Pricing"), /*#__PURE__*/React.createElement("li", null, "Contact"))), /*#__PURE__*/React.createElement("div", {
    className: "bfd-footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Contact"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "bfd-contact__label"
  }, "Location"), "Willemstad, Cura\xE7ao"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "bfd-contact__label"
  }, "Email"), "hello@blueframe.digital")))), /*#__PURE__*/React.createElement("p", {
    className: "bfd-footer__legal"
  }, "\xA9 ", new Date().getFullYear(), " Blue Frame Digital. All rights reserved."));
}
Object.assign(window, {
  Hero,
  Services,
  About,
  Pricing,
  Contact,
  SiteFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

})();
