# News Section Quick Reference Guide

## Key Features at a Glance

### 1. Two-Column Responsive Layout
```tsx
// Mobile: 1 column | Desktop: 2 columns
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
```

### 2. Hover Effects

#### Card Lift
```tsx
hover:scale-[1.02]  // Subtle 2% scale increase
```

#### Enhanced Shadow
```tsx
hover:shadow-2xl hover:shadow-blue-100  // Large shadow with blue tint
```

#### Border Glow
```tsx
border-2 border-transparent hover:border-blue-200  // Blue border appears on hover
```

#### Image Zoom
```tsx
group-hover:scale-110  // 10% zoom on image
transition-transform duration-500  // Smooth 500ms animation
```

#### Gradient Overlay
```tsx
bg-gradient-to-t from-black/60 via-black/20 to-transparent
opacity-0 group-hover:opacity-100  // Fades in on hover
```

#### Bottom Accent Line
```tsx
h-1 w-0 group-hover:w-full  // Grows from left to right
bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
transition-all duration-500 ease-out
```

### 3. NEW Badge

#### Condition
```tsx
const isNew = differenceInHours(new Date(), publishedDate) < 24
```

#### Styling
```tsx
className="bg-gradient-to-r from-red-500 to-pink-500
  text-white border-0 shadow-lg font-bold animate-pulse"
```

### 4. Image Handling

#### Lazy Loading
```tsx
loading="lazy"  // Browser-native lazy loading
```

#### Loading Skeleton
```tsx
{!imageLoaded && (
  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
)}
```

#### Error Fallback
```tsx
onError={() => setImageError(true)}
// Falls back to gradient banner
```

#### Gradient Banner (No Image)
```tsx
<div className="h-32 w-full bg-gradient-to-r
  from-blue-500 via-purple-500 to-pink-500">
```

### 5. Loading Skeletons

#### Structure
```tsx
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 h-48 w-full rounded-t-lg" />
    <div className="p-5 space-y-3">
      {/* Skeleton elements */}
    </div>
  </div>
)
```

#### Usage
```tsx
{[1, 2, 3, 4, 5, 6].map(i => (
  <Card key={i} className="overflow-hidden">
    <LoadingSkeleton />
  </Card>
))}
```

### 6. Empty State

#### With Icon
```tsx
<svg className="mx-auto h-16 w-16 text-gray-300">
  <path d="..." />  // Book icon
</svg>
<h3 className="text-lg font-semibold">No articles found</h3>
<p className="text-sm text-gray-500">
  Try adjusting your search or filters
</p>
```

### 7. Typography Improvements

#### Title
```tsx
className="text-xl font-bold mb-3 line-clamp-2
  text-gray-900 group-hover:text-blue-600
  transition-colors duration-300 leading-tight"
```

#### Description
```tsx
className="text-sm text-gray-600 mb-4 line-clamp-3
  flex-1 leading-relaxed"
```

### 8. Badge System

#### Category Badge
```tsx
<Badge className="text-xs bg-blue-100 text-blue-700
  hover:bg-blue-200 transition-colors">
  {article.category}
</Badge>
```

#### Tag Badges
```tsx
<Badge className="text-xs bg-gray-100 text-gray-700
  hover:bg-gray-200 transition-colors">
  {tag}
</Badge>
```

## Common Customizations

### Change NEW Badge Duration
```tsx
// In NewsCard.tsx, line 35
return differenceInHours(new Date(), date) < 48  // Change to 48 hours
```

### Adjust Hover Scale
```tsx
// In NewsCard.tsx, line 41
hover:scale-[1.05]  // Increase from 1.02 to 1.05
```

### Modify Grid Columns
```tsx
// In page.tsx, line 364
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// Add lg:grid-cols-3 for 3 columns on large screens
```

### Change Accent Line Color
```tsx
// In NewsCard.tsx, line 148
bg-gradient-to-r from-green-500 via-teal-500 to-blue-500
// Change gradient colors
```

### Adjust Image Zoom Level
```tsx
// In NewsCard.tsx, line 54
group-hover:scale-125  // Increase from 110 to 125 (25% zoom)
```

## File Locations

| File | Purpose |
|------|---------|
| `/src/app/page.tsx` | Main news page with grid layout |
| `/src/components/news/NewsCard.tsx` | Individual news card component |
| `/docs/NEWS_REDESIGN_SUMMARY.md` | Complete implementation details |
| `/docs/DESIGN_SPECS.md` | Full design specifications |

## Testing Checklist

### Visual Tests
- [ ] Hover effects animate smoothly
- [ ] NEW badge appears on recent articles
- [ ] Images load with skeleton
- [ ] Fallback gradient shows for missing images
- [ ] Accent line animates left to right
- [ ] Title and source change color on hover

### Responsive Tests
- [ ] Single column on mobile (<768px)
- [ ] Two columns on desktop (≥768px)
- [ ] Cards maintain equal height
- [ ] Spacing looks good at all sizes

### Performance Tests
- [ ] Images lazy load
- [ ] No layout shift during loading
- [ ] Animations run at 60fps
- [ ] Hover effects don't cause lag

### Edge Cases
- [ ] Articles without images
- [ ] Very long titles (clamping works)
- [ ] Articles with many tags
- [ ] Articles exactly 24 hours old
- [ ] Empty search results

## Browser DevTools Tips

### Test Hover States
```css
/* Force hover state in DevTools */
.group:hover { /* ... */ }
```

### Check Performance
```javascript
// In Console
performance.mark('start')
// Hover over card
performance.mark('end')
performance.measure('hover-time', 'start', 'end')
```

### Test Lazy Loading
```javascript
// In Console, disable cache
// Throttle network to "Slow 3G"
// Scroll page to see lazy loading in action
```

### Inspect Animations
```css
/* In DevTools > Rendering */
- Enable "Paint flashing"
- Enable "FPS meter"
- Check "Emulate CSS media feature prefers-reduced-motion"
```

## Common Issues & Solutions

### Cards Different Heights
**Problem:** Cards in same row have different heights
**Solution:** Already fixed with `flex flex-col h-full`

### Images Not Lazy Loading
**Problem:** All images load at once
**Solution:** Verify `loading="lazy"` attribute is present

### Hover Effects Laggy
**Problem:** Animations stutter
**Solution:** Use transform/opacity only, avoid layout properties

### NEW Badge Always Shows
**Problem:** Badge appears on all articles
**Solution:** Check server date vs article date, timezone issues

### Layout Shift on Load
**Problem:** Content jumps when images load
**Solution:** Use `aspect-video` and loading skeletons

## Performance Metrics

### Target Metrics
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Cumulative Layout Shift:** < 0.1
- **Hover Animation FPS:** 60fps

### Optimization Applied
- Lazy loading images
- CSS transforms (GPU accelerated)
- Loading skeletons
- Efficient re-renders with React
- Minimal JavaScript for interactions

## Accessibility

### Keyboard Navigation
- All cards focusable
- Clear focus indicators
- Enter key activates links

### Screen Readers
- Proper heading hierarchy
- Alt text on images
- Semantic HTML structure

### Color Contrast
- Text meets WCAG AA standards
- Badges have sufficient contrast
- Focus indicators visible

## Version Information

**Implementation Date:** 2025-11-17
**Next.js Version:** 16.0.3
**React Version:** 19.2.0
**Tailwind CSS:** v4
**Date-fns Version:** 4.1.0

## Support

For questions or issues:
1. Check this quick reference
2. Review DESIGN_SPECS.md for detailed specs
3. See NEWS_REDESIGN_SUMMARY.md for implementation details
4. Check component source code for inline comments
