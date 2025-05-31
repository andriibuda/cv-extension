// utils/generateDoc.js

const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

/**
 * Generates a .docx file by replacing macros in a template
 * @param {string} templatePath - Path to the input .docx file with macros
 * @param {string} outputPath - Path to the generated .docx file
 * @param {Object} replacements - Key-value map of macros and values, e.g. { DESCRIPTION: '...', SKILLS: '...' }
 */

async function generateDoc(templatePath, outputPath, replacements) {
  try {
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      // data: replacements,
    });

    doc.setData(replacements);

    doc.render(); // Perform the replacement

    const buffer = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFileSync(outputPath, buffer);
  } catch (err) {
    console.error('[generateDoc] Failed to generate document:', err);
    throw err;
  }
}

module.exports = generateDoc;
