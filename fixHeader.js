const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\carlo\\Desktop\\recursos interactivos - copia\\PÁGINA DE RECURSOS';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let modifiedCount = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the concatenated name with the spaced one
    const searchStr = 'RecursosEducativos';
    const replaceStr = 'Recursos Educativos';
    
    if (content.includes(searchStr)) {
        content = content.split(searchStr).join(replaceStr);
        fs.writeFileSync(filePath, content);
        modifiedCount++;
        console.log('Fixed header in', file);
    }
});

console.log(`Finished. Fixed ${modifiedCount} files.`);
