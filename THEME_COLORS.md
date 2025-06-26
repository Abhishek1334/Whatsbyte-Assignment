# 🎨 Theme Color System

## Color Palette

| Class Name | Color Value | Usage |
|------------|-------------|-------|
| `bg-primary` | #0758A8 | Primary brand background |
| `bg-secondary` | #002A59 | Secondary brand background |
| `bg-accent` | #365983 | Accent background |
| `bg-surface` | #FEFEFE | Surface background |
| `text-text-light` | #FAFDFE | Light text |
| `text-text-dark` | #031F45 | Dark text |

## Usage Examples

```tsx
// Header
<header className="bg-primary text-text-light">

// Card
<div className="bg-surface text-text-dark">

// Button
<button className="bg-primary text-text-light hover:bg-secondary">
```

## Configuration

Colors are defined in `src/styles/globals.css` using Tailwind v4 syntax:

```css
@theme {
  --color-primary: #0758A8;
  --color-secondary: #002A59;
  --color-accent: #365983;
  --color-surface: #FEFEFE;
  --color-text-light: #FAFDFE;
  --color-text-dark: #031F45;
}
```

## Debug & Test Pages

1. **Homepage**: `http://localhost:3000` - Basic functionality test
2. **Debug page**: `http://localhost:3000/debug-theme` - **NEW! Complete diagnostic**
3. **Theme test**: `http://localhost:3000/test-theme` - Full showcase

## Debug Checklist

Visit `/debug-theme` and check:
- ✅ Basic Tailwind colors work (red, blue, green)
- ✅ Custom colors work (primary, secondary, accent)
- ✅ Text colors work (text-light, text-dark)
- ✅ CSS variables work
- ✅ Inline styles work (fallback)

If basic colors don't work → Tailwind installation issue
If custom colors don't work → v4 configuration issue
If CSS variables work but classes don't → Class naming issue

## Properly Named Color Palette

| Class Name | Color Value | Usage |
|------------|-------------|-------|
| `bg-primary` | #0758A8 | Primary brand background - headers, main buttons |
| `bg-secondary` | #002A59 | Secondary brand background - darker sections |
| `bg-accent` | #365983 | Accent background - medium tone, navigation |
| `bg-surface` | #FEFEFE | Surface background - cards, nearly white |
| `text-light` | #FAFDFE | Light text - for dark backgrounds |
| `text-dark` | #031F45 | Dark text - for light backgrounds |

## Perfect Color Combinations

### Dark Backgrounds with Light Text
- `bg-primary` + `text-light` - Primary headers/buttons
- `bg-secondary` + `text-light` - Secondary sections/footers
- `bg-accent` + `text-light` - Navigation, medium emphasis

### Light Backgrounds with Dark Text  
- `bg-surface` + `text-dark` - Cards, content areas
- `bg-white` + `text-dark` - Clean, minimal sections

## Additional Text Colors
- `text-primary` - Primary brand color for text (#0758A8)