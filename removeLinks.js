const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\carlo\\Desktop\\recursos interactivos - copia\\PÁGINA DE RECURSOS';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let modifiedCount = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove the Ahorcado link (it might have varied whitespace, so use regex)
    const ahorcadoRegex = /<a[^>]*href="ahorcado\.html"[^>]*>[\s\S]*?<\/a>/gi;
    const conectaRegex = /<a[^>]*href="conecta4\.html"[^>]*>[\s\S]*?<\/a>/gi;
    
    let original = content;
    content = content.replace(ahorcadoRegex, '');
    content = content.replace(conectaRegex, '');
    
    // Clean up empty lines that might have been left over inside nav-menu
    content = content.replace(/^\s*[\r\n]/gm, '');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        modifiedCount++;
        console.log('Cleaned links in', file);
    }
});

console.log(`Finished. Modified ${modifiedCount} files.`);
