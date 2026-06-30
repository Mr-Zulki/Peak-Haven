const fs = require('fs');
const path = require('path');

function fixLinksInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    // regex to replace </a> with </Link> if there's a preceding <Link ... > on the same line
    // or just simply replace </a> with </Link> if there's a Link start tag before it.
    // A simpler way: we know all <Link to="..."><... </a> should be fixed.
    const newContent = content.replace(/(<Link[^>]*>.*?)(<\/a>)/g, '$1</Link>');
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Fixed ${filePath}`);
    }
}

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            fixLinksInFile(fullPath);
        }
    });
}

processDir(path.join(__dirname, 'src'));
