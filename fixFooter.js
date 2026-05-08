const fs = require('fs');
let c = fs.readFileSync('sistema-solar.html', 'utf8');
const index = c.indexOf('    </script>\n    <script src="js/main.js"></script>\n</body>\n</html>');
if (index !== -1) {
    c = c.substring(0, index + 13); // keep `    </script>\n`
} else {
    // try CRLF
    const index2 = c.indexOf('    </script>\r\n    <script src="js/main.js"></script>\r\n</body>\r\n</html>');
    if (index2 !== -1) {
        c = c.substring(0, index2 + 15);
    } else {
        // Just find the second to last </script>
        const parts = c.split('</script>');
        c = parts.slice(0, parts.length - 2).join('</script>') + '</script>\n';
    }
}

c += `    <footer class="site-footer">
        <div class="footer-container">
            <div class="footer-links">
                <a href="index.html">🏠 Inicio</a>
                <a href="dados.html">🎲 Dados</a>
                <a href="temporizador.html">⏱️ Temporizador</a>
                <a href="ruleta.html">🎰 Ruleta</a>
                <a href="grupos.html">👥 Grupos</a>
                <a href="quiz.html">📝 Quiz</a>
                <a href="contacto.html">📧 Contacto</a>
            </div>
            <p class="footer-copy">&copy; 2026 RecursosEducativos. Herramientas educativas gratuitas para profesores.</p>
        </div>
    </footer>
    <script src="js/main.js"></script>
</body>
</html>`;
fs.writeFileSync('sistema-solar.html', c);
console.log('Fixed using fallback');
