const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/autocomplete=/g, 'autoComplete=');
    content = content.replace(/required=""/g, 'required');
    if (content.includes("import { Link } from 'react-router-dom';") && !content.includes("<Link")) {
        content = content.replace(/import \{ Link \} from 'react-router-dom';\r?\n\r?\n?/, "");
    }
    fs.writeFileSync(filePath, content, 'utf8');
}

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            processFile(fullPath);
        }
    });
}
processDir(path.join(__dirname, 'src'));
