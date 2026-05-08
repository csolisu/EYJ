const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\carlo\\Desktop\\recursos interactivos - copia\\PÁGINA DE RECURSOS';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let modifiedCount = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const crucigramaRegex = /<a[^>]*href="crucigrama\.html"[^>]*>[\s\S]*?<\/a>/gi;
    
    let original = content;
    content = content.replace(crucigramaRegex, '');
    
    // Clean up empty lines that might have been left over inside nav-menu
    content = content.replace(/^\s*[\r\n]/gm, '');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        modifiedCount++;
        console.log('Cleaned links in', file);
    }
});

console.log(`Finished. Modified ${modifiedCount} files.`);
