# Tag Landing Page — Color Palette

Color palette extracted from the NewLandingPage for use in React Native apps.

## Quick Usage

```ts
import { colors } from './tag-color-palette';

// In your component
<View style={{ backgroundColor: colors.background }} />
<Text style={{ color: colors.primary }}>Tag</Text>
<TextInput style={{ borderColor: colors.border }} />
```

## Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#ffffff` | Page background |
| `primary` | `#0f172a` | Logo, primary text, buttons |
| `primaryHover` | `#1e293b` | Button hover/pressed |
| `secondary` | `#334155` | Tagline, form labels |
| `tertiary` | `#475569` | Body text, descriptions |
| `muted` | `#94a3b8` | Placeholders, subtext |
| `border` | `#e2e8f0` | Input borders, dividers |
| `surface` | `#f8fafc` | Cards, success boxes |
| `error` | `#ef4444` | Error messages |

## Raw Slate Scale

| Slate | Hex |
|-------|-----|
| `slate50` | `#f8fafc` |
| `slate200` | `#e2e8f0` |
| `slate400` | `#94a3b8` |
| `slate600` | `#475569` |
| `slate700` | `#334155` |
| `slate800` | `#1e293b` |
| `slate900` | `#0f172a` |

## Opacity Variants

For shadows or overlays, use the `rgba` helper:

```ts
import { rgba } from './tag-color-palette';

// 10% opacity overlay
<View style={{ backgroundColor: rgba('slate900', 0.1) }} />
```

## React Native StyleSheet Example

```ts
import { StyleSheet } from 'react-native';
import { colors } from './tag-color-palette';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    color: colors.primary,
  },
  tagline: {
    color: colors.secondary,
  },
  input: {
    borderColor: colors.border,
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
  },
  error: {
    color: colors.error,
  },
});
```
