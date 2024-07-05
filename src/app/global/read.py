import os

# Markdown header for the file
markdown_header = '''# File Contents Report

This document contains the paths and contents of all files in the current directory.

'''

# Open or create the Markdown file
with open('file_contents.md', 'w', encoding='utf-8') as md_file:
    md_file.write(markdown_header)

    # Walk through all files in the current directory
    for root, dirs, files in os.walk('.'):
        for file in files:
            # Skip the markdown file itself
            if file == 'file_contents.md':
                continue

            # Write the file path as a header in the Markdown file
            path = os.path.join(root, file)
            md_file.write(f'## File: {path}\n\n')

            # Write the file content in a code block
            try:
                with open(path, 'r', encoding='utf-8') as file_content:
                    content = file_content.read()
                    md_file.write('```text\n')
                    md_file.write(content)
                    md_file.write('\n```\n\n')
            except Exception as e:
                # Attach the filename to the error message
                error_message = f"Error reading file {file}: {e}\n\n"
                md_file.write(error_message)