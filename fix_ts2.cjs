const fs = require('fs');

let bd = fs.readFileSync('src/components/BestDeals.tsx', 'utf8');
bd = bd.replace("import { Link } from 'react-router-dom';\r\n", "");
bd = bd.replace("import { Link } from 'react-router-dom';\n", "");
bd = bd.replace("import { Property }", "import type { Property }");
fs.writeFileSync('src/components/BestDeals.tsx', bd);

let bm = fs.readFileSync('src/components/BookingModal.tsx', 'utf8');
bm = bm.replace("import { openBookingModal } from './BookingModal';\r\n", "");
bm = bm.replace("import { openBookingModal } from './BookingModal';\n", "");
fs.writeFileSync('src/components/BookingModal.tsx', bm);

let f = fs.readFileSync('src/components/Footer.tsx', 'utf8');
if (!f.includes("import { Link }")) {
  f = "import { Link } from 'react-router-dom';\n" + f;
  fs.writeFileSync('src/components/Footer.tsx', f);
}

let h = fs.readFileSync('src/components/Header.tsx', 'utf8');
h = h.replace(/import \{ Link \} from 'react-router-dom';\r?\nimport \{ Link \} from 'react-router-dom';\r?\n/g, "import { Link } from 'react-router-dom';\n");
fs.writeFileSync('src/components/Header.tsx', h);

let pd = fs.readFileSync('src/pages/PropertyDetail.tsx', 'utf8');
pd = pd.replace("import { Property }", "import type { Property }");
fs.writeFileSync('src/pages/PropertyDetail.tsx', pd);

let so = fs.readFileSync('src/pages/StayOptions.tsx', 'utf8');
so = so.replace("import { Property }", "import type { Property }");
fs.writeFileSync('src/pages/StayOptions.tsx', so);
