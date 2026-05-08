const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\carlo\\Desktop\\recursos interactivos - copia\\PÁGINA DE RECURSOS';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Improved regex to catch script tags with attributes and the style tags as well
    content = content.replace(/<(script)[^>]*>([\s\S]*?)<\/\1>/g, (match, tag, scriptContent) => {
        // If there's no script content (e.g., <script src="..."></script>), just return the match
        if (!scriptContent.trim()) return match;
        
        // Replace 6 or more spaces with a newline to break minified statements
        let fixedScript = scriptContent.replace(/ {6,}/g, '\n');
        
        // Return the full match but with the fixed script content
        return match.replace(scriptContent, `\n${fixedScript}\n`);
    });

    fs.writeFileSync(filePath, content);
    console.log('Fixed spacing', file);
});
