

# Trivium Frontend UI

This frontend is built with **React**, **Next.js App Router**, **Tailwind v4**, and **FlyonUI**.  
UI components are designed to be:

- **Reusable**: shared building blocks instead of one-off elements.
- **Theme-aware**: colors, typography, and spacing come from a central theme.
- **Accessible**: ARIA attributes and clear states for error, toggle, dropdown, etc.
- **Mobile-first**: base styles optimized for small screens, with desktop via media queries.

---

## Project Structure (UI-related)

- `app/components/ui/Button/Button.jsx`  
  Reusable button component (default, icon, toggle, dropdown).
- `app/components/ui/Input/Input.jsx`  
  Reusable input field with variants and inline message.
- `app/globals.css`  
  Global styles, theme tokens, utilities, base layout.
- `app/styles/responsive.css`  
  Additional responsive rules (e.g. desktop tweaks).

---

## Available UI Components

- [Button](./app/components/ui/Button/Button.md)
- [Input](./app/components/ui/Input/Input.md)

Each component doc includes:

- Description & behavior
- Props (attributes) with types and defaults
- Usage examples
- Accessibility considerations
- Design rationale (why it works the way it does)

---

## Theming & Styling

The theming system is described in detail here:

- [`docs/theme.md`](./theme.md)

Core ideas:

- **Design tokens** (colors, spacing, typography, radii) defined centrally.
- **Semantic utilities** (`text-muted`, `bg-default`, `border-brand`, etc.) used in components.
- **Component-level classes** (`trvm-btn`, `trvm-input`) that map to those tokens.

You can imagine the theme as a set of **Lego bricks** (tokens and utilities), and components as **small builds** assembled from those same bricks. Change the bricks and every build updates automatically.

---

## Development Guidelines

1. **Prefer existing components**
   - Use `Button` and `Input` instead of raw `<button>` or `<input>` when possible.
   - If you need a new pattern, consider if it can be a variant of an existing component.

2. **Use semantic utilities**
   - Use `text-default`, `text-muted`, `bg-default`, `border-brand` etc. instead of raw hex codes.
   - Keep raw colors inside the theme layer (`globals.css`).

3. **Keep logic in pages/containers**
   - Components like `Button` and `Input` focus on presentation + basic behavior (e.g. dropdown open state).
   - Complex form state and domain logic lives in pages or feature hooks.

4. **Accessibility**
   - Use `aria-*` attributes where relevant (error states, toggle, dropdown).
   - Use labels for inputs via `htmlFor` / `id`, or surrounding `<label>`.

---

## Quick Usage Example

```jsx
import { Button } from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";

export default function ExampleForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    // submit logic...
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block mb-4 text-subtitle text-default">
          Email
        </label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          variant={error ? "error" : "default"}
          hasMessage={!!error}
          message={error}
        />
      </div>

      <Button type="default" variant="primary" size="md">
        Submit
      </Button>
    </form>
  );
}