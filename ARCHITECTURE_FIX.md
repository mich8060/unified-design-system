# CSS Token Generator Architecture Fix

## Root Cause Analysis

### Problem 1: Brand Values Injected into Design System Light (`:root`)

**Location**: `generate_structured_css.py` lines 636-648

**Issue**: Non-color variables (buttons, surfaces, borders) get brand override values **hard-coded** directly into `:root`:

```python
# Lines 636-648: PROBLEMATIC CODE
if var_id in ds_var_brand_overrides and ds_var_brand_overrides[var_id]:
    brand_override_value = ds_var_brand_overrides[var_id]['CompHealth']  # Hard-codes CompHealth!
    css_value = format_value_for_css(brand_override_value, var_type, var_name)
    scss_parts.append(f"  {css_name}: {css_value};")  # Hard value in :root
```

**Result**: 
- `:root` contains `--uds-button-border-primary-default: #009add;` (CompHealth value)
- `[data-brand="modio"]` tries to override, but both have same specificity
- Since `:root` comes first, brand blocks can't override it

**Generated CSS (BROKEN)**:
```css
:root {
  --uds-button-border-primary-default: #009add;  /* CompHealth hard-coded! */
}

[data-brand="modio"] {
  --uds-button-border-primary-default: #3b82f6;  /* Can't override :root */
}
```

### Problem 2: Component Tokens Finalized Too Early

**Location**: `generate_structured_css.py` lines 632-681

**Issue**: Component tokens (buttons, surfaces) are resolved to **hard values** instead of referencing semantic color tokens:

**Current (BROKEN)**:
```css
:root {
  --uds-button-surface-primary-default: #009add;  /* Hard value */
  --uds-surface-brand-primary: #eae4ee;  /* Hard value */
}
```

**Should be**:
```css
:root {
  --uds-button-surface-primary-default: var(--uds-color-primary-500);  /* References semantic token */
  --uds-surface-brand-primary: var(--uds-color-primary-50);  /* References semantic token */
}
```

### Problem 3: Brand Overrides Skipped When Already Injected

**Location**: `generate_structured_css.py` lines 1003-1005

**Issue**: Brand overrides are skipped if they were already injected into Design System:

```python
# Lines 1003-1005: PROBLEMATIC CODE
if ds_var_id in ds_var_brand_overrides and brand_name in ds_var_brand_overrides[ds_var_id]:
    # This variable was already updated in the Design System section, skip adding to brand overrides
    continue  # Prevents brand blocks from overriding!
```

**Result**: Brand blocks are empty because variables were already "handled" in `:root`.

### Problem 4: Same Specificity, Order-Dependent Cascade

**Issue**: Both `:root` and `[data-brand="X"]` have the same specificity. The generator writes:
1. `:root` (with hard-coded brand values)
2. `[data-brand="X"]` (trying to override)

Since they have same specificity, the **last one wins**. But if `:root` has hard values and brand blocks come later, they should win - but they're being skipped due to Problem 3.

## Required Fixes

### Fix 1: Remove Brand Injection from Design System Light

**Location**: `generate_structured_css.py` lines 632-681

**Change**: Remove the brand override injection logic. Design System Light should **always** use Design System values, never brand values.

**Before**:
```python
else:
    # Non-color variables get their values directly
    # Check if there's a brand override for this variable - if so, use the first brand's override value
    if var_id in ds_var_brand_overrides and ds_var_brand_overrides[var_id]:
        brand_override_value = ds_var_brand_overrides[var_id]['CompHealth']
        css_value = format_value_for_css(brand_override_value, var_type, var_name)
        scss_parts.append(f"  {css_name}: {css_value};")  # ❌ REMOVE THIS
```

**After**:
```python
else:
    # Non-color variables get their values directly from Design System
    # NEVER inject brand values here - they belong in [data-brand] blocks
    if light_mode_id:
        value = resolve_value_for_mode(var_id, light_mode_id, fallback_to_first_mode=True)
        css_value = format_value_for_css(value, var_type, var_name)
        if css_value:
            scss_parts.append(f"  {css_name}: {css_value};")
```

### Fix 2: Ensure Component Tokens Reference Semantic Tokens

**Location**: `generate_structured_css.py` lines 632-681

**Change**: For component tokens that depend on colors, check if they should reference semantic color tokens instead of hard values.

**Note**: This may require analyzing the variable name to determine if it's a derived token. For now, the immediate fix is to remove brand injection. Component tokens should reference `--uds-color-*` tokens when they represent color-derived values.

**Example**:
- `uds/button/surface/primary/default` should reference `var(--uds-color-primary-500)` if it's color-derived
- This requires understanding the token structure from Figma

**For now**: Removing brand injection (Fix 1) will ensure brand blocks can override properly.

### Fix 3: Remove Skip Logic for Brand Overrides

**Location**: `generate_structured_css.py` lines 1003-1005

**Change**: Remove the logic that skips brand overrides if they were already in Design System.

**Before**:
```python
if ds_var_id in ds_var_brand_overrides and brand_name in ds_var_brand_overrides[ds_var_id]:
    # This variable was already updated in the Design System section, skip adding to brand overrides
    continue  # ❌ REMOVE THIS
```

**After**:
```python
# Always include brand overrides in brand blocks
# Design System Light no longer injects brand values, so brand blocks must contain all overrides
```

### Fix 4: Update Filtering Logic

**Location**: `generate_structured_css.py` lines 1045-1069

**Change**: Update the filtering logic to not exclude variables that were in `ds_var_brand_overrides`, since we're no longer injecting them into Design System.

**Before**:
```python
# Check if this DS variable was updated in the Design System section
if ds_var_id in ds_var_brand_overrides and brand_name in ds_var_brand_overrides[ds_var_id]:
    should_exclude = True  # ❌ This logic is now wrong
```

**After**:
```python
# Since Design System Light no longer injects brand values,
# we don't need to exclude variables that were in ds_var_brand_overrides
# Brand blocks should contain all brand-specific overrides
```

## Implementation Checklist

- [ ] **Fix 1**: Remove brand injection logic (lines 636-648)
- [ ] **Fix 2**: Ensure Design System Light always uses Design System values (lines 632-681)
- [ ] **Fix 3**: Remove skip logic for brand overrides (lines 1003-1005)
- [ ] **Fix 4**: Update filtering logic to not exclude based on `ds_var_brand_overrides` (lines 1045-1069)
- [ ] **Fix 5**: Remove or repurpose `ds_var_brand_overrides` tracking (it's no longer needed for injection)

## Expected Output After Fix

### Design System Light (`:root`)
```css
:root {
  /* Brand Color Variables (Defaults) */
  --brand-color-primary-500: #009add;  /* Design System default */
  
  /* UDS Color Variables */
  --uds-color-primary-500: var(--brand-color-primary-500);
  
  /* Component Tokens - Use Design System values */
  --uds-button-surface-primary-default: #009add;  /* From Design System, not brand */
  --uds-surface-brand-primary: #e3f5fa;  /* From Design System */
}
```

### Brand Override Block
```css
[data-brand="comphealth"] {
  /* Brand Color Overrides */
  --brand-color-primary-500: #644d7b;  /* CompHealth value */
  
  /* Component Tokens Override (if needed) */
  --uds-button-surface-primary-default: var(--uds-color-primary-500);  /* References semantic token */
}
```

**Cascade Flow**:
1. `:root` sets `--brand-color-primary-500: #009add` (DS default)
2. `[data-brand="comphealth"]` overrides `--brand-color-primary-500: #644d7b`
3. `--uds-color-primary-500: var(--brand-color-primary-500)` automatically updates
4. Component tokens that reference `--uds-color-primary-500` automatically update

## Verification Checklist

After applying fixes, verify in DevTools:

1. **Check `:root` has no hard-coded brand values**:
   - Search for `--uds-button-*` in `:root` - should be Design System values only
   - Search for `--uds-surface-*` in `:root` - should be Design System values only

2. **Check brand blocks contain overrides**:
   - `[data-brand="comphealth"]` should have `--brand-color-*` variables
   - `[data-brand="comphealth"]` should have component token overrides if they differ

3. **Test brand switching**:
   - Set `data-brand="comphealth"` on `<html>`
   - Verify buttons/surfaces change color
   - Set `data-brand="modio"` on `<html>`
   - Verify buttons/surfaces change to Modio colors

4. **Verify cascade**:
   - `--uds-color-primary-500` should reference `var(--brand-color-primary-500)`
   - Changing `--brand-color-primary-500` in brand block should update `--uds-color-primary-500`
   - Component tokens should reference semantic tokens (or hard values if not color-derived)

## Files to Modify

1. `scripts/generate_structured_css.py`
   - Lines 632-681: Remove brand injection logic
   - Lines 1003-1005: Remove skip logic
   - Lines 1045-1069: Update filtering logic
   - Lines 564-611: Consider removing `ds_var_brand_overrides` tracking (or repurpose it)

## Notes

- **Preserving structure**: All variable names, output format, and collection structure remain unchanged
- **Minimal changes**: Only removing problematic injection logic, not redesigning the system
- **Cascade correctness**: After fixes, cascade will work as expected: Core → Brand primitives → Design System → Component tokens
