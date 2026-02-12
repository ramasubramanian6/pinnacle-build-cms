import re

# Read the file
with open(r'd:\brizz\pinnacle-build-cms-1\src\pages\ProjectDetail.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix all malformed JSX patterns
fixes = [
    # Fix closing tags with spaces
    (r'</section \s*>', r'</section>'),
    (r'</Layout \s*>', r'</Layout>'),
    (r'</Dialog \s*>', r'</Dialog>'),  
    # Fix opening Dialog tags with spaces around = and {}
    (r'< Dialog open = \{ showPhoneModal \} onOpenChange = \{ setShowPhoneModal \} >', 
     r'<Dialog open={showPhoneModal} onOpenChange={setShowPhoneModal}>'),
    (r'< Dialog open = \{!!selectedVideo\} onOpenChange = \{', 
     r'<Dialog open={!!selectedVideo} onOpenChange={'),
    # Fix comment spaces    
    (r'\{\s*/\*\s*Phone Modal\s*\*/\s*\}', r'{/* Phone Modal */}'),
    (r'\{\s*/\*\s*Video Player Modal\s*\*/\s*\}', r'{/* Video Player Modal */}'),
]

for pattern, replacement in fixes:
    content = re.sub(pattern, replacement, content)

# Write back
with open(r'd:\brizz\pinnacle-build-cms-1\src\pages\ProjectDetail.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed all malformed JSX syntax")
