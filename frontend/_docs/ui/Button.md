---

## `docs/components/Button.md`

```md
# Button Component

**Path:** `app/components/ui/Button/Button.jsx`

A reusable button component with multiple **types**, **variants**, and **sizes**.  
It’s built to cover most button patterns: text buttons, icon-only buttons, toggles, and dropdown triggers.

## Props

| Prop            | Type                                                     | Default     | Description                                                                 |
|------------------|----------------------------------------------------------|-------------|-----------------------------------------------------------------------------|
| `type`           | `"default" \| "icon" \| "toggle" \| "dropdown"`         | `"default"` | Controls the button's behavior and layout.                                 |
| `variant`        | `"primary" \| "secondary" \| "glass"`                   | `"primary"` | Controls the visual style using FlyonUI button variants.                   |
| `size`           | `"sm" \| "md" \| "lg"`                                   | `"md"`      | Controls padding and font size.                                            |
| `iconSize`       | `"sm" \| "md" \| "lg" \| "xl" \| "xxl" \| `string`       | `"md"`      | Icon size mapped via internal size map or used as raw class.               |
| `iconStroke`     | `"sm" \| "md" \| "lg" \| `string`                        | `"md"`      | Icon stroke width mapped via Tailwind stroke utilities.                    |
| `icon`       | `ReactNode`                                             | `undefined` | Icon rendered before the button label.                                     |
| `icon`      | `ReactNode`                                             | `undefined` | Icon rendered after the button label.                                      |
| `className`      | `string`                                                | `undefined` | Additional Tailwind or custom utility classes.                             |
| `children`       | `ReactNode`                                             | `undefined` | Button label content (hidden when `type="icon"`).                          |
| `active`         | `boolean`                                               | `false`     | Controls active state for `type="toggle"`.                                 |
| `dropdownitems` | `ReactNode`                                             | `undefined` | Content rendered inside the dropdown panel.                                |
| `...rest`        | All valid `<button>` attributes                         | —           | Includes `onClick`, `disabled`, `type="submit"`, etc.                      |
---

### Import

```jsx
import { Button } from "@/ui/Button/Button";


