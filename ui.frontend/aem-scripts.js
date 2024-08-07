const fs = require('fs');
const path = require('path');

const sourceFolder = path.join(__dirname, 'dist/');
const destinationFolder = path.join(__dirname, '../ui.apps/src/main/content/jcr_root/apps/aem-third-party-api-integration-using-csr/clientlibs/clientlib-angular/');

// Function to recursively copy files
function copyFiles(source, destination) {
  const parentDir = path.dirname(destination);
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  const cssTxtPath = path.join(destination, 'css.txt');
  const jsTxtPath = path.join(destination, 'js.txt');

  let cssFiles = '';
  let jsFiles = '';

  fs.readdirSync(source).forEach((file) => {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyFiles(sourcePath, destinationPath);
    } else {
      const extension = path.extname(file).toLowerCase();
      if (extension === '.js') {
        fs.copyFileSync(sourcePath, destinationPath);
        jsFiles += file + '\n';
      } else if (extension === '.css') {
        fs.copyFileSync(sourcePath, destinationPath);
        cssFiles += file + '\n';
      }
    }
  });

  fs.writeFileSync(cssTxtPath, cssFiles);
  fs.writeFileSync(jsTxtPath, jsFiles);
}

// Copy JS and CSS files and create txt files
copyFiles(sourceFolder, destinationFolder);
