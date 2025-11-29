---

## `docs/theme.md`
# Theming & Styling

Global theme and utility configuration lives in:

- `app/globals.css`
- `app/styles/responsive.css` (for desktop/media-query specifics)

It defines:

1. **Themes** (light/dark) for FlyonUI.
2. **Design tokens** for colors, spacing, typography, radii.
3. **Semantic utilities** for text, backgrounds, borders, feedback.
4. **Component base classes** (`trvm-btn`, `trvm-input`).
5. **Layout** defaults (`main`, `.trvm-page`, etc.).

---

## Component Base Classes

Two important ones:

- `trvm-btn` – base button styling (used in `Button.jsx`)
- `trvm-input` – base input styling (used in `Input.jsx`)

Variant classes extend these:

- Buttons:
  - `btn-primary`, `btn-secondary`, `btn-glass` (FlyonUI button colors).
  - `trvm-btn-icon`, `trvm-toggle-btn`, `trvm-toggle-btn-active`, `trvm-dropdown-btn`.
- Inputs:
  - `input--default`, `input--active`, `input--disabled`, `input--error`.

The idea is:

- **Base class** = shared shape and typography.
- **Variant class** = state and color.
- **Utilities** = additional meaning (e.g. `text-muted`, `border-brand`).

---

## Design Tokens & Utilities

See the file for full list, but some concepts:

- **Typography tokens** (`--text-h1`, `--text-body`, etc.)  
  Used by utilities like `text-h1`, `text-body`.
- **Color tokens** (`--color-primary`, `--color-secondary-*`, `--color-muted`, etc.)  
  Used by utilities like `text-brand`, `bg-default`, `bg-alt`, `border-brand`.

Example usage inside components:

```jsx
<Button className="text-subtitle text-default">
  Action
</Button>

<Input className="border-brand" />