const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\carlo\\Desktop\\recursos interactivos - copia\\PÁGINA DE RECURSOS';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let changedFiles = [];

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Pattern 1: Find .tool-header h1 { ... } and ensure color: white is there
    const regexH1 = /\.tool-header\s+h1\s*\{([^}]*)\}/gi;
    if (content.match(regexH1)) {
        content = content.replace(regexH1, (match, p1) => {
            if (p1.includes('color:')) {
                // Replace existing color
                return match.replace(/color:\s*[^;!]+/, 'color: white');
            } else {
                // Add color if missing
                return `.tool-header h1 { color: white; ${p1} }`;
            }
        });
    } else {
        // If .tool-header exists but not .tool-header h1, add it if there's a style block
        if (content.includes('.tool-header') && content.includes('<style>')) {
            content = content.replace('<style>', '<style>\n      .tool-header h1 { color: white; }');
        }
    }

    // Pattern 2: Ensure .tool-header itself has color: white
    const regexHeader = /(\.tool-header\s*\{[^}]*color:\s*)([^;!]+)([^}]*\})/gi;
    if (content.match(regexHeader)) {
        content = content.replace(regexHeader, (match, p1, p2, p3) => {
            if (p2.trim().toLowerCase() !== 'white' && p2.trim().toLowerCase() !== '#fff' && p2.trim().toLowerCase() !== '#ffffff') {
                return `${p1}white${p3}`;
            }
            return match;
        });
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        changedFiles.push(file);
    }
});

console.log('--- REPORT OF CHANGED TITLES ---');
if (changedFiles.length > 0) {
    changedFiles.forEach(f => console.log(`Changed title color to white in: ${f}`));
} else {
    console.log('No files needed changes.');
}
