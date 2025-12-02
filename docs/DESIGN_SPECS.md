# News Section Design Specifications

## Color Palette

### Primary Colors
- **Blue:** `#3B82F6` (blue-500)
- **Purple:** `#A855F7` (purple-500)
- **Pink:** `#EC4899` (pink-500)

### Card States
- **Default Border:** `transparent`
- **Hover Border:** `#BFDBFE` (blue-200)
- **Default Shadow:** Standard card shadow
- **Hover Shadow:** `shadow-2xl shadow-blue-100`

### Badge Colors
- **NEW Badge:** `linear-gradient(to right, #EF4444, #EC4899)` (red-500 to pink-500)
- **Category Badge:** `#DBEAFE` background, `#1D4ED8` text (blue-100/blue-700)
- **Tag Badges:** `#F3F4F6` background, `#374151` text (gray-100/gray-700)

### Gradient Overlays
- **Image Hover:** `linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent)`
- **Fallback Banner:** `linear-gradient(to right, blue-500, purple-500, pink-500)`
- **Accent Line:** `linear-gradient(to right, blue-500, purple-500, pink-500)`

## Typography

### Title (h3)
- **Font Size:** `1.25rem` (text-xl)
- **Font Weight:** `700` (font-bold)
- **Line Height:** `tight`
- **Line Clamp:** `2 lines`
- **Default Color:** `#111827` (gray-900)
- **Hover Color:** `#2563EB` (blue-600)

### Description (p)
- **Font Size:** `0.875rem` (text-sm)
- **Font Weight:** `400` (normal)
- **Line Height:** `relaxed`
- **Line Clamp:** `3 lines`
- **Color:** `#4B5563` (gray-600)

### Meta Text
- **Source Name:**
  - Font Size: `0.875rem` (text-sm)
  - Font Weight: `600` (font-semibold)
  - Default Color: `#374151` (gray-800)
  - Hover Color: `#2563EB` (blue-600)

- **Published Date:**
  - Font Size: `0.75rem` (text-xs)
  - Font Weight: `500` (font-medium)
  - Color: `#6B7280` (gray-500)

### Badge Typography
- **All Badges:** `0.75rem` (text-xs)
- **NEW Badge:** Bold weight

## Spacing

### Card Padding
- **Content Area:** `1.25rem` (p-5)
- **Card Gap:** `1.5rem` (gap-6)

### Internal Spacing
- **Title Bottom Margin:** `0.75rem` (mb-3)
- **Description Bottom Margin:** `1rem` (mb-4)
- **Tags Bottom Margin:** `1rem` (mb-4)
- **Meta Top Padding:** `1rem` (pt-4)

### Badge Spacing
- **Category Badge Margin:** `0.75rem` (mb-3)
- **Tag Gap:** `0.5rem` (gap-2)
- **NEW Badge Position:** `0.75rem` from top/left (top-3 left-3)

## Animations & Transitions

### Card Container
```css
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
```
- **Hover Scale:** `scale(1.02)`
- **Shadow:** Instant → 2xl with blue tint
- **Border:** transparent → blue-200

### Image
```css
transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
```
- **Hover Scale:** `scale(1.10)`
- **Duration:** `500ms`

### Gradient Overlay
```css
transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
```
- **Default Opacity:** `0`
- **Hover Opacity:** `1`
- **Duration:** `300ms`

### Accent Line
```css
transition: all 500ms ease-out;
```
- **Default Width:** `0`
- **Hover Width:** `100%`
- **Height:** `4px` (h-1)
- **Duration:** `500ms`
- **Easing:** `ease-out`

### NEW Badge
```css
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

### Text Color Changes
```css
transition: colors 300ms cubic-bezier(0.4, 0, 0.2, 1);
```
- **Title:** gray-900 → blue-600
- **Source:** gray-800 → blue-600

## Layout Dimensions

### Card
- **Aspect Ratio (Image):** `16:9` (aspect-video)
- **Fallback Banner Height:** `8rem` (h-32)
- **Border Width:** `2px` (border-2)
- **Border Radius:** Default from Card component

### Grid
- **Mobile (<768px):** `grid-cols-1`
- **Desktop (≥768px):** `grid-cols-2`
- **Gap:** `1.5rem` (gap-6)

### Loading Skeleton
- **Image Height:** `12rem` (h-48)
- **Badge Width:** `4rem` (w-16) and `5rem` (w-20)
- **Title Width:** `75%` (w-3/4)
- **Description Width:** `100%` and `83%` (w-full, w-5/6)

## Interactive States

### Default State
- Border: transparent 2px
- Shadow: Standard card shadow
- Scale: 1.0
- Image: 100% scale
- Overlay: 0% opacity
- Accent line: 0 width

### Hover State
- Border: blue-200 2px
- Shadow: 2xl with blue-100 tint
- Scale: 1.02
- Image: 110% scale
- Overlay: 100% opacity
- Accent line: 100% width
- Title color: blue-600
- Source color: blue-600

### Focus State
- Inherits hover styles
- Add focus ring for accessibility

## Accessibility

### Image Alt Text
- Use article title as alt text
- Provide descriptive text for decorative images

### Link Accessibility
- Entire card is clickable (Link wrapper)
- Clear focus indicators
- Semantic HTML structure

### Color Contrast
- All text meets WCAG AA standards
- Badge text has sufficient contrast
- NEW badge uses high contrast

### Loading States
- Skeleton screens prevent layout shift
- Loading attribute on images
- Graceful error handling

## Responsive Behavior

### Mobile (<768px)
- Single column layout
- Full-width cards
- Optimized touch targets (min 44px)
- Reduced animation intensity

### Tablet (768px - 1024px)
- 2 column layout
- Full hover effects
- Optimized spacing

### Desktop (≥1024px)
- 2 column layout with sidebar
- All interactive effects enabled
- Maximum content width: 7xl container

## Performance Guidelines

### Image Optimization
- Use `loading="lazy"` attribute
- Implement loading skeletons
- Handle error states gracefully
- Provide low-quality placeholders

### Animation Performance
- Use `transform` and `opacity` (GPU accelerated)
- Avoid animating layout properties
- Use `will-change` sparingly
- 60fps target for all animations

### Code Splitting
- Lazy load components when possible
- Optimize bundle size
- Use React.memo for expensive components

## Browser Support

### Modern Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallbacks
- CSS Grid with flexbox fallback
- Transform with position fallback
- Gradient with solid color fallback

## Design Tokens (Tailwind)

### Spacing Scale
- `0.75rem` = `3` (12px)
- `1rem` = `4` (16px)
- `1.25rem` = `5` (20px)
- `1.5rem` = `6` (24px)

### Font Sizes
- `0.75rem` = `xs`
- `0.875rem` = `sm`
- `1rem` = `base`
- `1.25rem` = `xl`

### Timing Functions
- `ease-out`: Accent line
- `cubic-bezier(0.4, 0, 0.2, 1)`: Default transitions
- `cubic-bezier(0.4, 0, 0.6, 1)`: Pulse animation

## Implementation Notes

### Group Hover Pattern
All hover effects use Tailwind's `group` and `group-hover:` modifiers:
```tsx
<Card className="group ...">
  <div className="group-hover:scale-110 ...">
```

### Conditional Classes
NEW badge visibility:
```tsx
{showNewBadge && <Badge>NEW</Badge>}
```

### State Management
- `imageError`: Boolean for fallback handling
- `imageLoaded`: Boolean for skeleton/image transition

### Date Utilities
- `formatDistanceToNow`: Human-readable dates
- `differenceInHours`: NEW badge logic (< 24h)

## Quality Checklist

- [ ] All hover effects smooth at 60fps
- [ ] Images lazy load correctly
- [ ] Loading skeletons match final layout
- [ ] NEW badge only on articles < 24h
- [ ] Responsive layout works on all screens
- [ ] Colors meet accessibility standards
- [ ] Animations respect prefers-reduced-motion
- [ ] Error states handled gracefully
- [ ] Focus states visible and clear
- [ ] Touch targets adequate on mobile
