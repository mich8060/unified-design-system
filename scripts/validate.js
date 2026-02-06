import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const stylesDir = path.join(rootDir, 'src', 'styles');

// Import the validation function from index.js
// Since we can't easily import from index.js, we'll duplicate the logic here
function validateVariables(variablesPath = '_variables.scss', tokensPath = 'tokens.scss') {
  try {
    if (!fs.existsSync(tokensPath)) {
      console.error(`✗ ${tokensPath} not found`);
      process.exit(1);
    }
    
    if (!fs.existsSync(variablesPath)) {
      console.error(`✗ ${variablesPath} not found. Run 'npm run generate' first.`);
      process.exit(1);
    }
    
    const tokensContent = fs.readFileSync(tokensPath, 'utf-8');
    const variablesContent = fs.readFileSync(variablesPath, 'utf-8');
    
    // Extract all variable references from tokens.scss (format: vars.$variable-name)
    const variableRegex = /vars\.\$([a-zA-Z0-9-]+)/g;
    const referencedVars = new Set();
    const varLocations = new Map();
    let match;
    
    // Find all variable references with line numbers
    while ((match = variableRegex.exec(tokensContent)) !== null) {
      const varName = match[1];
      referencedVars.add(varName);
      
      // Find line number
      const beforeMatch = tokensContent.substring(0, match.index);
      const lineNumber = beforeMatch.split('\n').length;
      
      if (!varLocations.has(varName)) {
        varLocations.set(varName, []);
      }
      varLocations.get(varName).push(lineNumber);
    }
    
    // Extract all defined variables from _variables.scss (format: $variable-name:)
    const definedVarRegex = /^\$([a-zA-Z0-9-]+):/gm;
    const definedVars = new Set();
    while ((match = definedVarRegex.exec(variablesContent)) !== null) {
      definedVars.add(match[1]);
    }
    
    // Find missing variables
    const missingVars = Array.from(referencedVars).filter(v => !definedVars.has(v));
    
    if (missingVars.length > 0) {
      console.error(`\n✗ VALIDATION FAILED: ${missingVars.length} variable(s) missing:`);
      missingVars.forEach(v => {
        const locations = varLocations.get(v);
        const locationStr = locations.length === 1 
          ? `line ${locations[0]}` 
          : `lines ${locations.join(', ')}`;
        console.error(`   - $${v} (referenced at ${locationStr} in tokens.scss)`);
      });
      
      console.error('\n✗ SCSS compilation will fail with these missing variables!');
      console.error('\nTo fix:');
      console.error('  1. Run "npm run tokens:generate" to pull latest from Figma');
      console.error('  2. Or manually add the missing variables to src/styles/_variables.scss');
      console.error('  3. Or update src/styles/tokens.scss to remove references to deleted variables\n');
      
      process.exit(1);
    } else {
      console.log('✓ All variables validated successfully');
      console.log(`  - ${referencedVars.size} variables referenced in tokens.scss`);
      console.log(`  - ${definedVars.size} variables defined in _variables.scss`);
      return true;
    }
  } catch (error) {
    console.error(`✗ Validation error: ${error.message}`);
    process.exit(1);
  }
}

// Run validation (paths to src/styles/ directory)
const variablesPath = process.argv[2] || path.join(stylesDir, '_variables.scss');
const tokensPath = process.argv[3] || path.join(stylesDir, 'tokens.scss');

console.log('Validating variables...\n');
console.log(`  Variables: ${variablesPath}`);
console.log(`  Tokens: ${tokensPath}\n`);
validateVariables(variablesPath, tokensPath);
