import re
import os

def html_to_jsx(html):
    html = html.replace('class="', 'className="')
    html = html.replace("class='", "className='")
    html = html.replace('for="', 'htmlFor="')
    # img tags
    html = re.sub(r'<img([^>]*?)(?<!/)>', r'<img\1 />', html)
    # input tags
    html = re.sub(r'<input([^>]*?)(?<!/)>', r'<input\1 />', html)
    # br tags
    html = html.replace('<br>', '<br />')
    html = html.replace('<hr>', '<hr />')
    # style=""
    def style_repl(match):
        style_str = match.group(1)
        styles = []
        for prop in style_str.split(';'):
            if not prop.strip(): continue
            parts = prop.split(':', 1)
            if len(parts) == 2:
                k, v = parts
                k = k.strip()
                v = v.strip()
                # camelCase
                k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
                styles.append(f"{k}: '{v}'")
        return 'style={{ ' + ', '.join(styles) + ' }}'
    html = re.sub(r'style="([^"]+)"', style_repl, html)
    # comments
    html = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', html, flags=re.DOTALL)
    # React specific attributes
    html = html.replace('frameborder="0"', 'frameBorder={0}')
    html = html.replace('allowfullscreen=""', 'allowFullScreen')
    html = html.replace('autoplay', 'autoPlay')
    # Link replacement
    html = re.sub(r'<a([^>]*)href="index.html"([^>]*)>', r'<Link\1to="/"\2>', html)
    html = re.sub(r'<a([^>]*)href="stay-options.html"([^>]*)>', r'<Link\1to="/stay-options"\2>', html)
    html = re.sub(r'<a([^>]*)href="amenities.html"([^>]*)>', r'<Link\1to="/amenities"\2>', html)
    html = re.sub(r'<a([^>]*)href="contact.html"([^>]*)>', r'<Link\1to="/contact"\2>', html)
    return html

def extract_section(html, start_marker, end_marker=None):
    start_idx = html.find(start_marker)
    if start_idx == -1: return ""
    
    if end_marker:
        end_idx = html.find(end_marker, start_idx)
        if end_idx == -1: return ""
        return html[start_idx:end_idx + len(end_marker)]
    
    # Simple nested div extraction for end_marker=None
    count = 0
    i = start_idx
    while i < len(html):
        if html[i:i+4] == '<div':
            count += 1
            i += 4
        elif html[i:i+6] == '</div>':
            count -= 1
            i += 6
            if count == 0:
                return html[start_idx:i]
        else:
            i += 1
    return ""

def main():
    base_dir = r"c:\Users\HP\Downloads\peakhaven-main\peakhaven-main"
    src_dir = os.path.join(base_dir, "peakhaven", "src")
    components_dir = os.path.join(src_dir, "components")
    pages_dir = os.path.join(src_dir, "pages")
    
    with open(os.path.join(base_dir, "index.html"), "r", encoding="utf-8") as f:
        index_html = f.read()

    # We need to split index.html into components
    sections = {
        "HeroSearch": ('<div class="main-banner">', None),
        "FeaturedVilla": ('<div class="featured section">', None),
        "VideoSection": ('<div class="video section">', '</div>\n    </div>\n  </div>'), # this one has two siblings, so we need a custom end or just extract both
        "InfoStats": ('<div class="fun-facts">', None),
        "BestDeals": ('<div class="section best-deal">', None),
        "PackagesGrid": ('<div class="properties section">', None),
        "ContactSection": ('<div class="contact section">', '</div>\n    </div>\n  </div>'), # Also two siblings
    }
    
    # Custom extraction for multi-root sections
    video_1 = extract_section(index_html, '<div class="video section">')
    video_2 = extract_section(index_html, '<div class="video-content">')
    sections_html = {
        "HeroSearch": extract_section(index_html, '<div class="main-banner">'),
        "FeaturedVilla": extract_section(index_html, '<div class="featured section">'),
        "VideoSection": video_1 + "\n" + video_2,
        "InfoStats": extract_section(index_html, '<div class="fun-facts">'),
        "BestDeals": extract_section(index_html, '<div class="section best-deal">'),
        "PackagesGrid": extract_section(index_html, '<div class="properties section">'),
        "ContactSection": extract_section(index_html, '<div class="contact section">') + "\n" + extract_section(index_html, '<div class="contact-content">')
    }

    # As requested: "HowItWorks.tsx"
    # Wait, HowItWorks is not in index.html as a top-level div. Let's just create an empty one or omit it if the prompt just meant the accordion.
    # I'll create it as a placeholder.
    sections_html["HowItWorks"] = "<div></div>"

    for name, html in sections_html.items():
        if not html: continue
        jsx = html_to_jsx(html)
        content = f"import {{ Link }} from 'react-router-dom';\n\nconst {name} = () => {{\n  return (\n    <>\n{jsx}\n    </>\n  );\n}};\n\nexport default {name};\n"
        with open(os.path.join(components_dir, f"{name}.tsx"), "w", encoding="utf-8") as f:
            f.write(content)
            
    # Now pages
    def process_page(filename, component_name):
        with open(os.path.join(base_dir, filename), "r", encoding="utf-8") as f:
            page_html = f.read()
            
        # extract body content between header and footer
        start_idx = page_html.find('<!-- ***** Header Area End ***** -->')
        if start_idx != -1:
            start_idx += len('<!-- ***** Header Area End ***** -->')
        else:
            start_idx = page_html.find('<div class="page-heading')
            
        end_idx = page_html.find('<footer class="footer">')
        if start_idx != -1 and end_idx != -1:
            content_html = page_html[start_idx:end_idx]
        else:
            content_html = ""
            
        jsx = html_to_jsx(content_html)
        content = f"import {{ Link }} from 'react-router-dom';\n\nconst {component_name} = () => {{\n  return (\n    <>\n{jsx}\n    </>\n  );\n}};\n\nexport default {component_name};\n"
        with open(os.path.join(pages_dir, f"{component_name}.tsx"), "w", encoding="utf-8") as f:
            f.write(content)
            
    process_page("stay-options.html", "StayOptions")
    process_page("amenities.html", "Amenities")
    process_page("contact.html", "Contact")
    
    # Assemble Home.tsx
    home_content = """import HeroSearch from '../components/HeroSearch';
import FeaturedVilla from '../components/FeaturedVilla';
import VideoSection from '../components/VideoSection';
import InfoStats from '../components/InfoStats';
import BestDeals from '../components/BestDeals';
import PackagesGrid from '../components/PackagesGrid';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <>
      <HeroSearch />
      <FeaturedVilla />
      <VideoSection />
      <InfoStats />
      <BestDeals />
      <PackagesGrid />
      <ContactSection />
    </>
  );
};

export default Home;
"""
    with open(os.path.join(pages_dir, "Home.tsx"), "w", encoding="utf-8") as f:
        f.write(home_content)

if __name__ == "__main__":
    main()
