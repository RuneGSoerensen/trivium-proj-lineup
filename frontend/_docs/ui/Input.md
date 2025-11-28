---

## `_docs/components/Input.md`

```md
# Input Component

**Path:** `app/components/ui/Input/Input.jsx`

A reusable text input component that wraps a native `<input>` element with:

- Visual variants (default, active, disabled, error, success).
- Optional inline message (for errors/help).
- Basic accessibility (`aria-invalid`, `aria-describedby`).

## Props

| Prop         | Type                                                      | Default      | Description                                                                 |
|--------------|-----------------------------------------------------------|--------------|-----------------------------------------------------------------------------|
| `value`      | `string`                                                 | `""`         | Current input value (controlled input).                                    |
| `onChange`   | `(event: React.ChangeEvent<HTMLInputElement>) => void`  | `() => {}`   | Fired when input value changes.                                            |
| `onBlur`     | `(event: React.FocusEvent<HTMLInputElement>) => void`   | `undefined`  | Optional blur handler.                                                     |
| `placeholder`| `string`                                                 | `undefined`  | Placeholder text shown when input is empty.                                |
| `type`       | `string`                                                 | `"text"`     | Native input `type` attribute.                                             |
| `className`  | `string`                                                 | `undefined`  | Additional custom styling classes.                                         |
| `variant`    | `"active" \| "disabled" \| "default" \| "error"`        | `undefined`  | Visual state variant for the input field.                                  |
| `hasMessage` | `boolean`                                                | `false`      | Whether to show an inline message below the input.                         |
| `message`    | `string`                                                 | `undefined`  | Inline message text (usually for errors or help text).                     |
| `id`         | `string`                                                 | auto         | Optional ID; generated automatically if not provided.                     |
| `...rest`    | All valid `<input>` attributes                           | —            | Includes `name`, `autoComplete`, `disabled`, etc.                          |

---

## Import

```jsx
import Input from "@/ui/Input/Input";