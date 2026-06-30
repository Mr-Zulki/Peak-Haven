const fs = require('fs');
const path = require('path');

const replacements = [
    // Lorem ipsum / Filler
    { rx: /Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor pack incididunt ut labore et dolore magna aliqua quised ipsum suspendisse./g, rep: "Experience unparalleled comfort and luxury in this exclusive property. Thoughtfully designed with modern aesthetics and top-tier amenities, it offers the perfect setting for relaxation and adventure alike." },
    { rx: /Swag fanny pack lyft blog twee\. JOMO ethical copper mug, succulents typewriter shaman DIY kitsch twee taiyaki fixie hella venmo after messenger poutine next level humblebrag swag franzen\./g, rep: "Nestled in a prime location, you'll have easy access to breathtaking landscapes and vibrant local culture. A truly exceptional stay awaits you." },
    { rx: /Dolor <strong>almesit amet<\/strong>, consectetur adipiscing elit, sed doesn't eiusmod tempor incididunt ut labore consectetur <code>adipiscing<\/code> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua\./g, rep: "Simply <strong>select your destination</strong>, choose your preferred property type, and easily book your stay. We handle the rest, ensuring a seamless and unforgettable experience." },
    { rx: /Dolor <strong>almesit amet<\/strong>, consectetur adipiscing elit, sed doesn't eiusmod tempor kinfolk tonx seitan crucifix 3 wolf moon bicycle rights keffiyeh snackwave wolf same vice, chillwave vexillologist incididunt ut labore consectetur <code>adipiscing<\/code> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua\./g, rep: "Simply <strong>select your destination</strong>, choose your preferred property type, and easily book your stay. We handle the rest, ensuring a seamless and unforgettable experience." },
    { rx: /Dolor <strong>almesit amet<\/strong>, consectetur adipiscing elit, do eiusmod tempor pack incididunt ut Kinfolk tonx seitan crucifix 3 wolf moon bicycle rights keffiyeh snackwave wolf same vice, chillwave vexillologistlabore et dolore magna aliqua quised ipsum suspendisse\./g, rep: "Experience unparalleled comfort and luxury in this exclusive property. Thoughtfully designed with modern aesthetics and top-tier amenities, it offers the perfect setting for relaxation." },
    
    // Emails
    { rx: /info@peakhaven\.co(?!m)/g, rep: 'info@peakhaven.com' },
    { rx: /hello@peakhaven\.com/g, rep: 'info@peakhaven.com' },

    // Addresses
    { rx: /18 Old Street Miami, OR 97219/g, rep: '18 Ocean Drive, Miami, FL 33139' },
    { rx: /Tunisia Tunis, OR 27001/g, rep: 'Avenue Habib Bourguiba, Tunis, Tunisia' },
    { rx: /26 Mid Street Portland, OR 38540/g, rep: '26 Mid Street, Portland, OR 97204' },
    { rx: /Turkey istanbul, OR 12650/g, rep: 'Galata, Istanbul, Turkey' },
    { rx: /Norway Nights, OR 42680/g, rep: 'Tromsø, Norway' },
    { rx: /Pent House Canada, OR 16540/g, rep: 'Toronto, ON, Canada' },
    { rx: /14 Mid Street Miami, OR 36450/g, rep: '14 Mid Street, Miami, FL 33132' },
    { rx: /24 New Street Miami, OR 24560/g, rep: '24 New Street, Miami, FL 33132' },
    
    // Dead Links in Footer / Header
    // Let's just fix the Quick links and social icons
    { rx: /<li><a href="#">Home<\/a><\/li>/g, rep: '<li><Link to="/">Home</Link></li>' },
    { rx: /<li><a href="#">Destinations<\/a><\/li>/g, rep: '<li><Link to="/stay-options">Destinations</Link></li>' },
    { rx: /<li><a href="#">Adventure Packages<\/a><\/li>/g, rep: '<li><Link to="/amenities">Adventure Packages</Link></li>' },
    { rx: /<li><a href="#">Blog<\/a><\/li>/g, rep: '' }, // removing dead link
    { rx: /<li><a href="#">Contact Us<\/a><\/li>/g, rep: '<li><Link to="/contact">Contact Us</Link></li>' },
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Add Link import if we introduce it
    if (content.includes('<Link to=') && !content.includes("import { Link }")) {
        content = "import { Link } from 'react-router-dom';\n" + content;
    }

    replacements.forEach(({rx, rep}) => {
        content = content.replace(rx, rep);
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
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
