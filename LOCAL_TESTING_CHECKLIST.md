# Local Testing Checklist

This checklist ensures all new features work correctly before deployment to EC2.

## Pre-Testing Setup

- [ ] Pull latest code: `git pull origin clean-main`
- [ ] Install dependencies: `cd frontend && npm install`
- [ ] Build frontend: `npm run build`
- [ ] Start backend: (as documented in DEPLOYMENT_GUIDE.md)
- [ ] Start nginx or local server
- [ ] Open browser to http://localhost:3000 or your dev server URL

---

## Feature 1: Enhanced OrderDetail Page

### Visual Design
- [ ] Order detail page loads without errors
- [ ] Status icon displays correctly (green checkmark for delivered orders)
- [ ] Order number and date display at top
- [ ] Status badge appears with correct color coding
- [ ] Card-based layout displays properly

### Order Information
- [ ] Order items section shows all purchased items
- [ ] Product images display correctly
- [ ] Item quantities and prices are accurate
- [ ] Order totals (subtotal, shipping, tax) calculate correctly
- [ ] Shipping address displays all fields correctly

### Status Display
- [ ] Order status badge shows correct status (DELIVERED, SHIPPED, PENDING, CANCELLED)
- [ ] Payment status displays properly
- [ ] Status colors match design (green for delivered, blue for shipped, etc.)

### Buttons & Navigation
- [ ] "Continue Shopping" button appears and works
- [ ] "View All Orders" button appears and works
- [ ] Back to Orders link works
- [ ] Customer support link is present

### Responsiveness
- [ ] Layout looks good on mobile (375px width)
- [ ] Layout looks good on tablet (768px width)
- [ ] Layout looks good on desktop (1024px+ width)
- [ ] All text remains readable on all sizes
- [ ] Images scale properly

### Data Binding
- [ ] Order data loads from API correctly
- [ ] Loading state shows spinner while fetching
- [ ] Error state displays if order not found
- [ ] All dynamic data populates correctly

---

## Feature 2: Dual Font System

### Font Display - Headings (Cormorant Garamond)
- [ ] All `<h1>` tags display in serif font
- [ ] All `<h2>` tags display in serif font
- [ ] All `<h3>` tags display in serif font
- [ ] All `<h4>` tags display in serif font
- [ ] Headings appear elegant and premium-looking
- [ ] Font weight looks consistent (400)

### Font Display - Body Text (Jost)
- [ ] Paragraph text displays in sans-serif
- [ ] Body text is clean and easy to read
- [ ] Font weight is light (300) for body text
- [ ] Description text displays in sans-serif

### Font Display - UI Elements
- [ ] Navigation links appear in Jost sans-serif
- [ ] Navigation text is uppercase
- [ ] Buttons display in Jost
- [ ] Button text is uppercase
- [ ] Labels are in sans-serif
- [ ] Form labels are readable

### Font Display - Special Elements
- [ ] Product titles appear in serif font
- [ ] Product descriptions in sans-serif
- [ ] Prices display in sans-serif
- [ ] Links maintain consistent font families

### Responsive Typography
- [ ] Headings size correctly on mobile
- [ ] Headings size correctly on tablet
- [ ] Headings size correctly on desktop
- [ ] Font sizes are readable on all devices
- [ ] No text overflow or wrapping issues
- [ ] Line-height appears appropriate everywhere

### Font Weights
- [ ] Light weight (300) used for body text
- [ ] Regular weight (400) used for headings
- [ ] Medium weight (500) used for emphasis
- [ ] No improper font weight application

### Letter Spacing
- [ ] Navigation has wider letter-spacing (0.05em)
- [ ] Headings have subtle letter-spacing
- [ ] Regular text has normal spacing

### Pages to Check
- [ ] HomePage - headings and body text
- [ ] Product Listing - product names and prices
- [ ] Product Detail - product info and descriptions
- [ ] Cart Page - all text elements
- [ ] Checkout Page - form labels and headings
- [ ] Order Detail Page - all text elements
- [ ] PaymentSuccess Page - success message and details
- [ ] PaymentFailed Page - error message and buttons
- [ ] OrderHistory Page - order list and status
- [ ] Footer - company info text
- [ ] Navigation - menu items

### Browser Compatibility
- [ ] Fonts display correctly in Chrome
- [ ] Fonts display correctly in Safari
- [ ] Fonts display correctly in Firefox
- [ ] Fonts display on mobile browsers
- [ ] Google Fonts loading correctly (check network tab)
- [ ] Fallback fonts working if Google Fonts fails

---

## Cross-Feature Testing

### Integration
- [ ] All pages still have header and footer
- [ ] All pages have consistent styling
- [ ] Navigation works across all pages
- [ ] Cart functionality still works
- [ ] Checkout flow still works

### Performance
- [ ] Pages load quickly
- [ ] No console errors
- [ ] No missing fonts errors
- [ ] CSS file loads successfully
- [ ] No style flashing on load

### Accessibility
- [ ] Text contrast is sufficient (readable)
- [ ] Font sizes are not too small
- [ ] Links are distinguishable
- [ ] Headings are semantically correct
- [ ] Form inputs have labels

---

## Regression Testing

- [ ] Guest checkout still works
- [ ] "Pairs With" recommendations still show in cart
- [ ] Collections page still displays correctly
- [ ] PaymentSuccess page displays correctly
- [ ] PaymentFailed page displays correctly
- [ ] All existing buttons work
- [ ] All existing links work

---

## Edge Cases

### Order Detail Page
- [ ] Test with order that has multiple items
- [ ] Test with order that has free shipping
- [ ] Test with order that has no tax
- [ ] Test with order that has high price
- [ ] Test with no order (404 state)
- [ ] Test loading while API request in progress

### Typography
- [ ] Very long product names (no wrapping issues)
- [ ] Very long descriptions (proper line-height)
- [ ] Small screen fonts (readability)
- [ ] Large screen fonts (visual balance)
- [ ] Multiple font weights in same element

---

## Final Verification

Before deployment to EC2:

- [ ] All checkboxes above are checked
- [ ] No console errors in developer tools
- [ ] No console warnings (except allowed ones)
- [ ] Network requests are successful
- [ ] Build completes without warnings
- [ ] frontend/dist/ folder has all files
- [ ] index.html loads correctly
- [ ] CSS files load correctly
- [ ] JavaScript files load correctly
- [ ] Images load correctly

---

## Screenshot Guide

Take screenshots of:
- [ ] OrderDetail page on mobile
- [ ] OrderDetail page on tablet
- [ ] OrderDetail page on desktop
- [ ] Homepage showing typography
- [ ] Product page showing fonts
- [ ] Navigation showing uppercase text
- [ ] Order history page
- [ ] Console showing no errors

---

## Sign-Off

**Date of Testing**: _______________
**Tester Name**: _______________
**Browser Version**: _______________
**Device**: _______________

**Overall Status**: 
- [ ] Ready for Deployment
- [ ] Needs Fixes (describe below)

**Notes/Issues Found**:
```
[Add any issues found here]
```

**Approved By**: _______________

---

## If Issues Found

1. Document the issue clearly
2. Screenshot if possible
3. Identify which feature is affected
4. Check for console errors
5. Report back with:
   - Issue description
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/device information
   - Screenshot or video if helpful

---

## Post-Testing Actions

Once all checks pass:

1. **Commit Changes** (if local config changes made)
   ```bash
   git add .
   git commit -m "test: verify features on local environment"
   ```

2. **Prepare for Deployment** 
   - Note any server configuration needed
   - Plan deployment time
   - Prepare rollback plan

3. **Deploy to EC2**
   - Update frontend/dist folder on server
   - Restart nginx
   - Test live server

4. **Monitor After Deployment**
   - Check for any errors in logs
   - Verify page loads correctly
   - Test key user flows
   - Monitor for performance issues

---

**Test Start Date**: _______________  
**Test End Date**: _______________  
**Status**: Ready / Needs Work  

For issues or questions, refer to LATEST_UPDATES_SUMMARY.md
