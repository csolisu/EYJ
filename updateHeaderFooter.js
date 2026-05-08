const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\carlo\\Desktop\\recursos interactivos - copia\\PÁGINA DE RECURSOS';

const sourceFile = path.join(dir, 'buscaminas.html');
const sourceContent = fs.readFileSync(sourceFile, 'utf8');

const headerMatch = sourceContent.match(/<header class="site-header">[\s\S]*?<\/header>/);
const footerMatch = sourceContent.match(/<footer class="site-footer">[\s\S]*?<\/footer>/);

if (headerMatch && footerMatch) {
    const newHeader = headerMatch[0];
    const newFooter = footerMatch[0];

    const targets = ['dados.html', 'temporizador.html'];

    targets.forEach(target => {
        const targetPath = path.join(dir, target);
        let content = fs.readFileSync(targetPath, 'utf8');
        
        content = content.replace(/<header class="site-header">[\s\S]*?<\/header>/, newHeader);
        content = content.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, newFooter);
        
        fs.writeFileSync(targetPath, content);
        console.log('Updated', target);
    });
} else {
    console.error('Could not find header or footer in buscaminas.html');
}
