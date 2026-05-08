const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\carlo\\Desktop\\recursos interactivos - copia\\PÁGINA DE RECURSOS';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let modifiedCount = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const cuerpoRegex = /<a[^>]*href="cuerpo-humano\.html"[^>]*>[\s\S]*?<\/a>/gi;
    const selectorRegex = /<a[^>]*href="selector\.html"[^>]*>[\s\S]*?<\/a>/gi;
    
    let original = content;
    content = content.replace(cuerpoRegex, '');
    content = content.replace(selectorRegex, '');
    
    content = content.replace(/^\s*[\r\n]/gm, '');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        modifiedCount++;
        console.log('Cleaned links in', file);
    }
});

console.log(`Finished. Modified ${modifiedCount} files.`);
