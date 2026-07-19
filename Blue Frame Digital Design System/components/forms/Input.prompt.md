"Fill-in-the-blank" form field — filled surface that lightens on focus with a single primary bottom-border. Covers inputs and textareas.

```jsx
<Input label="Your name" placeholder="Jane Doe" required />
<Input label="Email" type="email" hint="We reply within one business day." />
<Input label="Project details" multiline placeholder="Tell us what you need…" />
```

`multiline` swaps to a textarea, `error` turns the focus border coral, `hint` adds helper text. Spreads native input/textarea props.
