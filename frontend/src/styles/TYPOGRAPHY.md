# Typography System

## Font Stack

### Cormorant Garamond (Serif)
- **Font Family**: Cormorant Garamond
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium)
- **Usage**: Headings, display text, luxury branding elements
- **Characteristics**: Elegant, high-contrast serifs, premium feel

### Jost (Sans-Serif)
- **Font Family**: Jost
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold)
- **Usage**: Body text, navigation, buttons, UI elements
- **Characteristics**: Geometric, clean, modern, excellent readability

## Usage Guidelines

### Headings (h1-h6)
All headings use **Cormorant Garamond** with `font-weight: 400`

```html
<h1>Page Title</h1>           <!-- 42px / 48px md -->
<h2>Section Header</h2>       <!-- 30px / 36px md -->
<h3>Subsection Header</h3>    <!-- 24px / 30px md -->
<h4>Sub-heading</h4>          <!-- 20px / 24px md -->
<h5>Minor Heading</h5>        <!-- 18px md -->
<h6>Caption Heading</h6>      <!-- 16px -->
```

### Body Text
Body paragraphs use **Jost** with `font-weight: 300`

```html
<p>Regular paragraph text...</p>
<p className="font-medium">Medium weight text</p>
<p className="font-semibold">Semibold text</p>
```

### Navigation
Navigation elements use **Jost** with uppercase, wider letter-spacing

```html
<nav>
  <a href="#">Home</a>
  <a href="#">Collections</a>
  <a href="#">About</a>
</nav>
```

### Buttons
Buttons use **Jost** with `font-weight: 500` and uppercase

```html
<button>Add to Bag</button>
<button>View More</button>
```

### Labels & Captions
Labels and captions use **Jost** with smaller font sizes

```html
<label>Email Address</label>
<small>Optional field</small>
```

## Component Classes

### Serif Font Classes
```css
.font-serif-display   /* Light serif for display */
.font-serif-medium    /* Medium serif for emphasis */
.font-serif-light     /* Light serif (300 weight) */
```

### Sans Font Classes
```css
.font-sans-body       /* Light sans for body text */
.font-sans-medium     /* Medium sans for emphasis */
.font-sans-semibold   /* Semibold sans for UI */
```

### Luxury Typography
```css
.luxury-heading      /* Large serif heading with letter-spacing */
.luxury-subheading   /* Medium serif subheading */
.product-title       /* Serif product names */
.product-description /* Light sans description text */
```

### Price Display
```css
.price              /* Medium weight sans for prices */
.price-currency     /* Smaller currency symbol */
```

## Examples

### Product Card Title
```html
<h3 className="font-serif-display">Mosaic Handbag</h3>
<p className="product-description">Premium leather crossbody...</p>
<span className="price">£250.00</span>
```

### Page Header
```html
<h1>Discover Our Collection</h1>
<p>Explore our curated selection of luxury handbags</p>
```

### Form Label
```html
<label>Shipping Address</label>
<input type="text" placeholder="Enter your address" />
```

### Button
```html
<button>Add to Bag</button>
```

## Font Weights

| Weight | Name | Usage |
|--------|------|-------|
| 300 | Light | Body text, light headings |
| 400 | Regular | Normal text, headings, navigation |
| 500 | Medium | Emphasis, buttons, labels |
| 600 | Semibold | Strong emphasis (Jost only) |

## Letter Spacing

| Element | Spacing | Notes |
|---------|---------|-------|
| Headings | 0.02em | Subtle enhancement |
| Navigation | 0.05em | Uppercase with wider spacing |
| Labels | Inherit | From Tailwind |
| Buttons | 0.05em | Uppercase with wider spacing |

## Implementation in Components

### TypeScript/React
```tsx
import { ReactNode } from 'react'

// Heading component
const Heading = ({ level = 1, children }: { level?: 1 | 2 | 3 | 4 | 5 | 6, children: ReactNode }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  return <Tag className="font-serif-display">{children}</Tag>
}

// Body text component
const BodyText = ({ children }: { children: ReactNode }) => {
  return <p className="font-sans-body">{children}</p>
}

// Price display
const Price = ({ amount }: { amount: number }) => {
  return <span className="price">£{amount.toFixed(2)}</span>
}

export { Heading, BodyText, Price }
```

## Responsive Typography

Font sizes scale responsively using Tailwind's md: prefix:

```html
<h1 className="text-4xl md:text-5xl">Large Heading</h1>
<p className="text-base md:text-lg">Body text scales up on medium screens</p>
```

## Accessibility Notes

1. **Contrast**: Ensure text color contrast ratio meets WCAG AA standards (4.5:1 minimum)
2. **Line Height**: Default 1.6 for body text, 1.8 for long-form content
3. **Font Size**: Minimum 16px for body text on mobile for readability
4. **Letter Spacing**: Increased letter-spacing aids readability but use sparingly
5. **Font Weight**: Avoid very light weights (300) for small text sizes

## Browser Support

- **Cormorant Garamond**: All modern browsers via Google Fonts
- **Jost**: All modern browsers via Google Fonts
- **Fallbacks**: Georgia (serif), system-ui/sans-serif provide safe fallbacks

## Performance

Fonts are imported in `frontend/index.html` with optimal loading:
- Preconnect to fonts.googleapis.com and fonts.gstatic.com
- Display strategy: swap (show fallback while loading)
- Only necessary weights/styles imported: 300, 400, 500

## Migration Guide

If updating components to use this system:

1. Replace inline font styles with classes
2. Update heading tags to use Cormorant classes
3. Ensure body text uses Jost
4. Apply `.luxury-heading` to showcase elements
5. Test responsive behavior on different screen sizes

---

**Last Updated**: August 30, 2026
**System**: Dual Font Typography Implementation
