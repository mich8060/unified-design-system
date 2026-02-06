import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const stylesDir = path.join(rootDir, 'src', 'styles');

// Load .env from parent directory first, then from scripts folder as fallback
dotenv.config(); // Try parent directory (cwd)
dotenv.config({ path: path.join(rootDir, '.env') }); // Try project root
dotenv.config({ path: path.join(__dirname, '.env') }); // Try scripts folder

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const FIGMA_API_BASE = 'https://api.figma.com/v1';

// Fetch data from Figma API
async function fetchFigmaData(endpoint) {
  const url = `${FIGMA_API_BASE}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'X-Figma-Token': FIGMA_ACCESS_TOKEN
    }
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Convert variable name to SASS-friendly format
function toSassVariableName(name) {
  return name
    .replace(/\s+/g, '-')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9-]/gi, '-')
    .toLowerCase()
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Extract color tokens from Figma variables
function extractColorTokens(variables) {
  const colors = {};
  
  if (!variables?.meta?.variables) {
    return colors;
  }

  Object.entries(variables.meta.variables).forEach(([id, variable]) => {
    // Skip system variables
    if (variable.name.toLowerCase().startsWith('system')) {
      return;
    }
    
    if (variable.resolvedType === 'COLOR' && variable.valuesByMode) {
      // Resolve color value (handles both direct values and aliases)
      const resolvedColor = resolveColorValue(id, variables);
      
      if (resolvedColor && resolvedColor.r !== undefined) {
        // Convert RGB values (0-1 range) to 0-255 range
        const r = Math.round(resolvedColor.r * 255);
        const g = Math.round(resolvedColor.g * 255);
        const b = Math.round(resolvedColor.b * 255);
        const a = resolvedColor.a !== undefined ? resolvedColor.a : 1;
        
        // Generate hex and rgba
        const hex = `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
        
        // Use variable name, clean it up for SASS
        const name = toSassVariableName(variable.name);
        colors[name] = {
          r,
          g,
          b,
          a,
          hex,
          originalName: variable.name
        };
      }
    }
  });

  return colors;
}

// Recursively resolve variable aliases to their actual numeric values
function resolveVariableValue(variableId, variables, visited = new Set()) {
  // Prevent circular references
  if (visited.has(variableId)) {
    return null;
  }
  visited.add(variableId);

  const variable = variables.meta?.variables?.[variableId];
  if (!variable || !variable.valuesByMode) {
    return null;
  }

  const modeId = Object.keys(variable.valuesByMode)[0];
  const value = variable.valuesByMode[modeId];

  // If it's a direct numeric value, return it
  if (typeof value === 'number') {
    return value;
  }
  
  // Handle integer values
  if (typeof value === 'string' && /^\d+$/.test(value)) {
    return parseInt(value, 10);
  }

  // If it's an alias, recursively resolve the referenced variable
  if (value && typeof value === 'object' && value.type === 'VARIABLE_ALIAS' && value.id) {
    return resolveVariableValue(value.id, variables, visited);
  }

  return null;
}

// Recursively resolve color variable aliases to their actual color values
function resolveColorValue(variableId, variables, visited = new Set()) {
  // Prevent circular references
  if (visited.has(variableId)) {
    return null;
  }
  visited.add(variableId);

  const variable = variables.meta?.variables?.[variableId];
  if (!variable || !variable.valuesByMode) {
    return null;
  }

  const modeId = Object.keys(variable.valuesByMode)[0];
  const value = variable.valuesByMode[modeId];

  // If it's a direct color value (RGB object), return it
  if (value && typeof value === 'object' && value.r !== undefined) {
    return value;
  }

  // If it's an alias, recursively resolve the referenced variable
  if (value && typeof value === 'object' && value.type === 'VARIABLE_ALIAS' && value.id) {
    return resolveColorValue(value.id, variables, visited);
  }

  return null;
}

// Extract string tokens (like font-family) from Figma variables
function extractStringTokens(variables) {
  const strings = {};
  
  if (!variables?.meta?.variables) {
    return strings;
  }

  Object.entries(variables.meta.variables).forEach(([id, variable]) => {
    // Skip system variables
    if (variable.name.toLowerCase().startsWith('system')) {
      return;
    }
    
    if (variable.resolvedType === 'STRING' && variable.valuesByMode) {
      const modeId = Object.keys(variable.valuesByMode)[0];
      const value = variable.valuesByMode[modeId];
      
      if (typeof value === 'string') {
        const name = toSassVariableName(variable.name);
        strings[name] = {
          value: value,
          originalName: variable.name
        };
      }
    }
  });

  return strings;
}

// Extract spacing tokens from Figma variables (FLOAT and INTEGER types)
function extractSpacingTokens(variables) {
  const spacing = {};
  
  if (!variables?.meta?.variables) {
    return spacing;
  }

  Object.entries(variables.meta.variables).forEach(([id, variable]) => {
    // Skip system variables
    if (variable.name.toLowerCase().startsWith('system')) {
      return;
    }
    
    // Handle both FLOAT and INTEGER types for numeric values
    if ((variable.resolvedType === 'FLOAT' || variable.resolvedType === 'INTEGER') && variable.valuesByMode) {
      const name = toSassVariableName(variable.name);
      const resolvedValue = resolveVariableValue(id, variables);
      
      if (resolvedValue !== null) {
        // Detect duration variables (should be stored as numbers, not strings)
        const isDuration = name.includes('duration') || name.includes('animation-duration');
        // For font-weight and similar, don't add 'px' suffix
        const isFontWeight = name.includes('weight') || name.includes('font-weight');
        
        let valueStr;
        if (isDuration) {
          // Duration values: store as number, will add "ms" when generating CSS
          valueStr = `${resolvedValue}`;
        } else if (isFontWeight) {
          valueStr = `${resolvedValue}`;
        } else {
          valueStr = `${resolvedValue}px`;
        }
        
        spacing[name] = {
          value: resolvedValue,
          valuePx: valueStr,
          originalName: variable.name,
          isDuration: isDuration
        };
      }
    }
  });

  return spacing;
}

// Extract typography tokens from Figma styles
function extractTypographyTokens(styles) {
  const typography = {};
  
  if (!styles?.meta?.styles) {
    return typography;
  }

  Object.entries(styles.meta.styles).forEach(([id, style]) => {
    if (style.styleType === 'TEXT') {
      const name = toSassVariableName(style.name);
      typography[name] = {
        originalName: style.name,
        description: style.description || ''
      };
    }
  });

  return typography;
}

// Get the group prefix from a variable name
function getGroupPrefix(name) {
  // Extract the first part before the first dash (or first two parts for nested groups)
  const parts = name.split('-');
  if (parts.length >= 2) {
    // Return first two parts for better grouping (e.g., "uds-scrim", "uds-shadow", "locumsmart-primary")
    return parts.slice(0, 2).join('-');
  }
  return parts[0];
}

// Custom sort function that orders variables with numbers from low to high
function sortVariablesWithNumbers([nameA], [nameB]) {
  // Extract numeric suffix from variable names
  const extractNumber = (name) => {
    const match = name.match(/-(\d+)$/);
    return match ? parseInt(match[1], 10) : null;
  };

  // Extract base name (everything before the number)
  const extractBase = (name) => {
    const match = name.match(/^(.+?)-(\d+)$/);
    return match ? match[1] : name;
  };

  const numA = extractNumber(nameA);
  const numB = extractNumber(nameB);
  const baseA = extractBase(nameA);
  const baseB = extractBase(nameB);

  // If both have numbers and same base, sort by number
  if (numA !== null && numB !== null && baseA === baseB) {
    return numA - numB;
  }

  // Otherwise, use standard string comparison
  return nameA.localeCompare(nameB);
}

// Check if a color variable is a brand color
function isBrandColor(name) {
  const brandPrefixes = ['comphealth', 'connect', 'locumsmart', 'modio', 'weatherby', 'wireframe'];
  return brandPrefixes.some(prefix => name.startsWith(prefix)) || name.startsWith('uds-brands');
}

// Generate SASS variables
function generateSASS(tokens) {
  let sass = '';

  // Colors - separate brands from system colors
  if (Object.keys(tokens.colors).length > 0) {
    // Sort colors by name, with numbers ordered low to high
    const sortedColors = Object.entries(tokens.colors).sort(sortVariablesWithNumbers);
    
    // Separate brand colors from system colors
    const systemColors = [];
    const brandColors = [];
    
    sortedColors.forEach(([name, color]) => {
      if (isBrandColor(name)) {
        brandColors.push([name, color]);
      } else {
        systemColors.push([name, color]);
      }
    });
    
    // System colors first
    if (systemColors.length > 0) {
      let lastGroup = null;
      systemColors.forEach(([name, color]) => {
        const currentGroup = getGroupPrefix(name);
        
        // Add blank line when group changes
        if (lastGroup !== null && currentGroup !== lastGroup) {
          sass += `\n`;
        }
        
        if (color.a < 1) {
          sass += `$${name}: rgba(${color.r}, ${color.g}, ${color.b}, ${color.a});\n`;
        } else {
          sass += `$${name}: ${color.hex};\n`;
        }
        
        lastGroup = currentGroup;
      });
      sass += `\n`;
    }
    
    // Brand colors grouped together
    if (brandColors.length > 0) {
      let lastGroup = null;
      brandColors.forEach(([name, color]) => {
        const currentGroup = getGroupPrefix(name);
        
        // Add blank line when group changes
        if (lastGroup !== null && currentGroup !== lastGroup) {
          sass += `\n`;
        }
        
        if (color.a < 1) {
          sass += `$${name}: rgba(${color.r}, ${color.g}, ${color.b}, ${color.a});\n`;
        } else {
          sass += `$${name}: ${color.hex};\n`;
        }
        
        lastGroup = currentGroup;
      });
      sass += `\n`;
    }
  }

  // Spacing
  if (Object.keys(tokens.spacing).length > 0) {
    // Sort spacing by name, with numbers ordered low to high
    const sortedSpacing = Object.entries(tokens.spacing).sort(sortVariablesWithNumbers);
    
    let lastGroup = null;
    sortedSpacing.forEach(([name, spacing]) => {
      const currentGroup = getGroupPrefix(name);
      
      // Add blank line when group changes
      if (lastGroup !== null && currentGroup !== lastGroup) {
        sass += `\n`;
      }
      
      // Duration variables: store as number (will add "ms" in tokens.scss)
      if (spacing.isDuration) {
        sass += `$${name}: ${spacing.value};\n`;
      } else {
        sass += `$${name}: ${spacing.valuePx};\n`;
      }
      
      lastGroup = currentGroup;
    });
    sass += `\n`;
  }

  // Strings (font-family, etc.)
  if (Object.keys(tokens.strings).length > 0) {
    // Sort strings by name
    const sortedStrings = Object.entries(tokens.strings).sort(sortVariablesWithNumbers);
    
    let lastGroup = null;
    sortedStrings.forEach(([name, str]) => {
      const currentGroup = getGroupPrefix(name);
      
      // Add blank line when group changes
      if (lastGroup !== null && currentGroup !== lastGroup) {
        sass += `\n`;
      }
      
      // Ensure URL variables and other strings that need quotes are properly quoted
      let value = str.value;
      const isUrl = name.includes('url') || name.includes('Url') || name.includes('URL');
      
      // If it's a URL or doesn't already have quotes, add them
      if (isUrl || (!value.startsWith('"') && !value.startsWith("'") && !value.includes(','))) {
        // Don't add quotes if it already has them or if it's a font stack (contains commas)
        if (!value.startsWith('"') && !value.startsWith("'")) {
          value = `"${value}"`;
        }
      }
      
      sass += `$${name}: ${value};\n`;
      
      lastGroup = currentGroup;
    });
    sass += `\n`;
  }

  // Typography (as references, actual values would need to be fetched from nodes)
  if (Object.keys(tokens.typography).length > 0) {
    Object.entries(tokens.typography).forEach(([name, typo]) => {
      // Typography variables would go here if we had the actual values
    });
  }

  return sass;
}

// Generate CSS custom properties from SASS variables
function generateCSSCustomProperties(tokens) {
  let css = '';
  
  // Helper to determine if a variable needs unit stripping (for duration variables that already have ms)
  function needsUnitStrip(name) {
    return name.includes('animation-duration') || name.includes('duration');
  }
  
  // Helper to determine if a variable needs unit suffix
  function needsUnitSuffix(name, value) {
    // If it's already a string with units, don't add
    if (typeof value === 'string' && (value.includes('px') || value.includes('ms') || value.includes('deg'))) {
      return false;
    }
    // Duration variables are stored as strings with "ms", so strip quotes and use as-is
    if (needsUnitStrip(name)) {
      return false;
    }
    // Font weights don't need units
    if (name.includes('weight') || name.includes('font-weight')) {
      return false;
    }
    // Numeric spacing/sizing values need px
    if (name.includes('spacing') || name.includes('sizing') || name.includes('radius') || 
        name.includes('gap') || name.includes('border-width') || name.includes('blur') ||
        name.includes('elevation') || name.includes('focus-ring')) {
      return true;
    }
    return false;
  }
  
  // Group variables by category for better organization
  const categories = {
    animation: [],
    blur: [],
    border: [],
    cursor: [],
    elevation: [],
    focus: [],
    gap: [],
    radius: [],
    sizing: [],
    spacing: [],
    aspect: [],
    transition: [],
    typography: [],
    color: [],
    code: [],
    button: [],
    icon: [],
    input: [],
    surface: [],
    text: [],
    brands: [],
    user: [],
    other: []
  };
  
  // Categorize all tokens
  const allVars = [
    ...Object.entries(tokens.colors).map(([name, color]) => ({
      name,
      value: color.a < 1 ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` : color.hex,
      type: 'color'
    })),
    ...Object.entries(tokens.spacing).map(([name, spacing]) => ({
      name,
      value: spacing.value,
      valuePx: spacing.valuePx,
      type: 'spacing'
    })),
    ...Object.entries(tokens.strings).map(([name, str]) => ({
      name,
      value: str.value,
      type: 'string'
    }))
  ];
  
  // Categorize variables
  allVars.forEach(v => {
    const name = v.name.toLowerCase();
    if (name.startsWith('uds-animation')) {
      categories.animation.push(v);
    } else if (name.includes('blur')) {
      categories.blur.push(v);
    } else if (name.includes('border') && !name.includes('button')) {
      categories.border.push(v);
    } else if (name.includes('cursor')) {
      categories.cursor.push(v);
    } else if (name.includes('elevation')) {
      categories.elevation.push(v);
    } else if (name.includes('focus-ring')) {
      categories.focus.push(v);
    } else if (name.includes('gap')) {
      categories.gap.push(v);
    } else if (name.includes('radius')) {
      categories.radius.push(v);
    } else if (name.includes('sizing')) {
      categories.sizing.push(v);
    } else if (name.includes('spacing')) {
      categories.spacing.push(v);
    } else if (name.includes('aspect')) {
      categories.aspect.push(v);
    } else if (name.includes('transition')) {
      categories.transition.push(v);
    } else if (name.includes('typography') || name.includes('font') || name.includes('line') || name.includes('letter') || name.includes('weight')) {
      categories.typography.push(v);
    } else if (name.includes('code')) {
      categories.code.push(v);
    } else if (name.includes('button')) {
      categories.button.push(v);
    } else if (name.includes('icon')) {
      categories.icon.push(v);
    } else if (name.includes('input')) {
      categories.input.push(v);
    } else if (name.includes('surface') && !name.includes('button')) {
      categories.surface.push(v);
    } else if (name.includes('text') && !name.includes('button')) {
      categories.text.push(v);
    } else if (name.includes('brands')) {
      categories.brands.push(v);
    } else if (name.includes('user')) {
      categories.user.push(v);
    } else if (name.startsWith('uds-')) {
      categories.color.push(v);
    } else {
      categories.other.push(v);
    }
  });
  
  // Generate CSS with organized sections
  const sectionNames = {
    animation: 'Animation',
    blur: 'Blur',
    border: 'Border',
    cursor: 'Cursor',
    elevation: 'Elevation',
    focus: 'Focus Ring',
    gap: 'Gap',
    radius: 'Border Radius',
    sizing: 'Sizing',
    spacing: 'Spacing',
    aspect: 'Aspect Ratio',
    transition: 'Transition',
    typography: 'Typography',
    color: 'Colors',
    code: 'Code',
    button: 'Button',
    icon: 'Icon',
    input: 'Input',
    surface: 'Surface',
    text: 'Text',
    brands: 'Brands',
    user: 'User',
    other: 'Other'
  };
  
  Object.entries(categories).forEach(([category, vars]) => {
    if (vars.length === 0) return;
    
    // Sort variables
    const sorted = vars.sort(([a], [b]) => {
      if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
      }
      return 0;
    });
    
    // Add section comment
    css += `\n    /* ${sectionNames[category]} */\n`;
    
    sorted.forEach(v => {
      let value = v.valuePx || v.value;
      
      // Handle duration variables (they're stored as strings with "ms")
      if (needsUnitStrip(v.name)) {
        // Remove quotes if it's a string
        if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        css += `    --${v.name}: #{vars.$${v.name}};\n`;
      } else if (v.type === 'string') {
        // String values - use as-is (already quoted in SASS)
        css += `    --${v.name}: #{vars.$${v.name}};\n`;
      } else if (v.type === 'spacing' && needsUnitSuffix(v.name, value)) {
        // Spacing values that need px
        css += `    --${v.name}: #{vars.$${v.name}};\n`;
      } else {
        // Color and other values
        css += `    --${v.name}: #{vars.$${v.name}};\n`;
      }
    });
  });
  
  return css;
}

// Main function
async function main() {
  try {
    console.log('Fetching design tokens from Figma...');
    console.log(`File Key: ${FIGMA_FILE_KEY}`);

    // Fetch variables (colors, spacing, etc.)
    let variables = {};
    try {
      console.log('Fetching variables...');
      variables = await fetchFigmaData(`/files/${FIGMA_FILE_KEY}/variables/local`);
      console.log('✓ Variables fetched');
    } catch (error) {
      console.warn('⚠ Could not fetch variables:', error.message);
    }

    // Fetch styles (typography, effects, etc.)
    let styles = {};
    try {
      console.log('Fetching styles...');
      styles = await fetchFigmaData(`/files/${FIGMA_FILE_KEY}/styles`);
      console.log('✓ Styles fetched');
    } catch (error) {
      console.warn('⚠ Could not fetch styles:', error.message);
    }

    // Extract tokens
    console.log('Extracting tokens...');
    const tokens = {
      colors: extractColorTokens(variables),
      spacing: extractSpacingTokens(variables),
      strings: extractStringTokens(variables),
      typography: extractTypographyTokens(styles)
    };

    console.log(`✓ Found ${Object.keys(tokens.colors).length} color tokens`);
    console.log(`✓ Found ${Object.keys(tokens.spacing).length} spacing tokens`);
    console.log(`✓ Found ${Object.keys(tokens.strings).length} string tokens`);
    console.log(`✓ Found ${Object.keys(tokens.typography).length} typography styles`);

    // Generate SASS
    console.log('Generating SASS...');
    const sass = generateSASS(tokens);

    // Write to file (to src/styles/ directory)
    // Ensure styles directory exists
    if (!fs.existsSync(stylesDir)) {
      fs.mkdirSync(stylesDir, { recursive: true });
      console.log(`✓ Created directory: src/styles/`);
    }
    
    const outputPath = path.join(stylesDir, '_variables.scss');
    fs.writeFileSync(outputPath, sass, 'utf-8');
    console.log(`✓ SASS generated: src/styles/_variables.scss`);

    // Validate variables in tokens.scss
    console.log('Validating variables...');
    const validationPassed = validateVariables(outputPath);
    
    // Exit with error code if validation failed (useful for CI/CD)
    if (!validationPassed) {
      const shouldExit = process.env.FAIL_ON_MISSING_VARS !== 'false';
      if (shouldExit) {
        console.error('\n✗ Validation failed. Set FAIL_ON_MISSING_VARS=false to continue anyway.');
        process.exit(1);
      } else {
        console.warn('\n⚠ Continuing despite validation failures...');
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Validate that all variables referenced in tokens.scss exist in _variables.scss
function validateVariables(variablesPath) {
  try {
    // Read tokens.scss (from src/styles/ directory)
    const tokensPath = path.join(stylesDir, 'tokens.scss');
    if (!fs.existsSync(tokensPath)) {
      console.warn('⚠ src/styles/tokens.scss not found, skipping validation');
      return;
    }
    
    const tokensContent = fs.readFileSync(tokensPath, 'utf-8');
    const variablesContent = fs.readFileSync(variablesPath, 'utf-8');
    
    // Extract all variable references from tokens.scss (format: vars.$variable-name)
    const variableRegex = /vars\.\$([a-zA-Z0-9-]+)/g;
    const referencedVars = new Set();
    const varLocations = new Map(); // Track where variables are used
    let match;
    let lineNumber = 1;
    const lines = tokensContent.split('\n');
    
    // Find all variable references with line numbers
    while ((match = variableRegex.exec(tokensContent)) !== null) {
      const varName = match[1];
      referencedVars.add(varName);
      
      // Find line number
      const beforeMatch = tokensContent.substring(0, match.index);
      lineNumber = beforeMatch.split('\n').length;
      
      if (!varLocations.has(varName)) {
        varLocations.set(varName, []);
      }
      varLocations.get(varName).push(lineNumber);
    }
    
    // Extract all defined variables from _variables.scss (format: $variable-name:)
    const definedVarRegex = /^\$([a-zA-Z0-9-]+):/gm;
    const definedVars = new Set();
    const placeholderVars = new Set();
    
    // Check for existing placeholder variables
    const placeholderRegex = /\/\/ PLACEHOLDER: \$([a-zA-Z0-9-]+)/g;
    while ((match = placeholderRegex.exec(variablesContent)) !== null) {
      placeholderVars.add(match[1]);
    }
    
    while ((match = definedVarRegex.exec(variablesContent)) !== null) {
      definedVars.add(match[1]);
    }
    
    // Warn about existing placeholder variables
    if (placeholderVars.size > 0) {
      console.warn(`\n⚠ Found ${placeholderVars.size} existing placeholder variable(s) that need attention:`);
      Array.from(placeholderVars).forEach(v => {
        console.warn(`   - $${v} (marked as PLACEHOLDER - update with correct value)`);
      });
    }
    
    // Find missing variables
    const missingVars = Array.from(referencedVars).filter(v => !definedVars.has(v));
    
    if (missingVars.length > 0) {
      console.warn(`\n⚠ WARNING: ${missingVars.length} variable(s) referenced in tokens.scss but not defined in _variables.scss:`);
      missingVars.forEach(v => {
        const locations = varLocations.get(v);
        const locationStr = locations.length === 1 
          ? `line ${locations[0]}` 
          : `lines ${locations.join(', ')}`;
        console.warn(`   - $${v} (used at ${locationStr})`);
      });
      
      console.warn('\n⚠ This will cause SCSS compilation to fail!');
      console.warn('   Generating placeholder variables with fallback values...\n');
      
      // Generate placeholder variables
      const placeholders = generatePlaceholderVariables(missingVars);
      const updatedContent = variablesContent + '\n' + placeholders;
      
      // Create backup before modifying
      const backupPath = variablesPath + '.backup';
      fs.writeFileSync(backupPath, variablesContent, 'utf-8');
      console.log(`✓ Backup created: ${backupPath}`);
      
      // Write updated content with placeholders
      fs.writeFileSync(variablesPath, updatedContent, 'utf-8');
      console.log(`✓ Placeholder variables added to ${variablesPath}`);
      console.warn('\n⚠ IMPORTANT: Review and update these placeholder variables with correct values!');
      console.warn('   The placeholders are marked with "PLACEHOLDER" comments.\n');
      
      return false; // Indicate validation failed
    } else {
      console.log('✓ All variables validated');
      return true;
    }
  } catch (error) {
    console.error(`✗ Validation error: ${error.message}`);
    return false;
  }
}

// Generate placeholder variables with sensible defaults
function generatePlaceholderVariables(missingVars) {
  let placeholders = '\n// ============================================\n';
  placeholders += '// PLACEHOLDER VARIABLES - MISSING FROM FIGMA\n';
  placeholders += '// ============================================\n';
  placeholders += '// These variables were referenced in tokens.scss but not found in Figma.\n';
  placeholders += '// Please update these with the correct values from your design system.\n';
  placeholders += '// ============================================\n\n';
  
  missingVars.forEach(varName => {
    const defaultValue = getDefaultValueForVariable(varName);
    placeholders += `// PLACEHOLDER: $${varName} - Update with correct value from Figma\n`;
    placeholders += `$${varName}: ${defaultValue};\n\n`;
  });
  
  return placeholders;
}

// Get sensible default values based on variable name patterns
function getDefaultValueForVariable(varName) {
  const name = varName.toLowerCase();
  
  // Color variables
  if (name.includes('color')) {
    if (name.includes('black')) return '#000000';
    if (name.includes('white')) return '#ffffff';
    if (name.includes('transparent')) return 'transparent';
    if (name.includes('primary')) return '#0066cc';
    if (name.includes('secondary')) return '#6c757d';
    if (name.includes('accent')) return '#ff6b6b';
    if (name.includes('neutral') || name.includes('gray') || name.includes('grey')) {
      if (name.includes('25') || name.includes('50')) return '#f8f9fa';
      if (name.includes('100')) return '#e9ecef';
      if (name.includes('200')) return '#dee2e6';
      if (name.includes('300')) return '#ced4da';
      if (name.includes('400')) return '#adb5bd';
      if (name.includes('500')) return '#6c757d';
      if (name.includes('600')) return '#495057';
      if (name.includes('700')) return '#343a40';
      if (name.includes('800')) return '#212529';
      if (name.includes('900') || name.includes('1000')) return '#000000';
      return '#6c757d';
    }
    return '#000000'; // Default to black
  }
  
  // Duration variables (in milliseconds)
  if (name.includes('duration') || name.includes('animation')) {
    if (name.includes('100')) return '100';
    if (name.includes('200')) return '200';
    if (name.includes('300')) return '300';
    if (name.includes('500')) return '500';
    return '300';
  }
  
  // Spacing/sizing variables (in pixels)
  if (name.includes('spacing') || name.includes('sizing') || name.includes('gap') || 
      name.includes('radius') || name.includes('border') || name.includes('width')) {
    // Extract number from variable name
    const numberMatch = varName.match(/\d+/);
    if (numberMatch) {
      return `${numberMatch[0]}px`;
    }
    if (name.includes('none') || name.includes('0')) return '0px';
    return '16px'; // Default spacing
  }
  
  // String variables
  if (name.includes('font') || name.includes('family')) {
    return '"system-ui, -apple-system, sans-serif"';
  }
  if (name.includes('ease') || name.includes('timing')) {
    return '"ease-in-out"';
  }
  if (name.includes('cursor')) {
    return '"default"';
  }
  if (name.includes('url')) {
    return '""';
  }
  
  // Default fallbacks
  return 'null'; // SCSS null value
}

main();
