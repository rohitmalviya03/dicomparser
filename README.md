# DICOM Web Reader

Standalone browser-based DICOM reader converted from the Chrome extension.

## Features

- Open local `.dcm` files in a normal web page.
- Preview uncompressed grayscale DICOM images.
- Inspect DICOM tags in a searchable table.
- Shows Tag Key, Tag Name, VR, Length, and Value.
- Labels private tags using private creator values when available.
- Copy or download parsed metadata as JSON.

## Run

Open `index.html` directly in a browser, or serve the folder with any static web server.

```text
dicom-web-app/index.html
```

## Notes

- Files are processed locally in the browser.
- Compressed DICOM transfer syntaxes need decoder libraries for image preview.
- This is not a diagnostic medical viewer.
