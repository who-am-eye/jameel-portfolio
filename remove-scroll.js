const fs = require('fs');

const filePath = 'src/App.js';
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');

const startLine = 85;
const endLine = 100;

// find start by looking for comment
let startIndex = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('// Force scroll to top on page load for all pages')) {
    startIndex = i;
    break;
  }
}

if (startIndex !== -1) {
  let endIndex = startIndex;
  let braceCount = 0;
  
  // skip to
  for (let i = startIndex; i < lines.length; i++) {
    if (lines[i].includes('if (typeof window !== \'undefined\')')) {
      endIndex = i;
      break;
    }
  }

  for (let i = endIndex; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('{')) braceCount++;
    if (line.includes('}')) {
      braceCount--;
      if (braceCount === 0) {
        endIndex = i;
        break;
      }
    }
  }




  
  lines.splice(startIndex, endIndex - startIndex + 1);
  
  const newContent = lines.join('\n');
  
  fs.writeFileSync(filePath, newContent);
  
  console.log(`Removed scroll code from ${filePath}`);
} else {
  console.log('Could not find the scroll code block');
}
