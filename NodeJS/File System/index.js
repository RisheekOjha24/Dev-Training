// The fs (File System) module in Node.js is a core module that lets you work with files and directories on your system. It provides both asynchronous and synchronous methods for reading, writing, and managing files.

// # 1. Reading Files

const fs = require('fs');

// ## Asyncronus Read

// readFile => This method reads a file asynchronously and takes in a callback for handling the result.
fs.readFile('work.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});
console.log("This will be printed first");

// 'example.txt': The path to the file to read.

// 'utf8': Encoding type, here it’s set to UTF-8 for text files.
// When reading a file using UTF-8 encoding, Node.js converts the raw binary data in the file into human-readable text
// When writing a string to a file, UTF-8 ensures that characters, including non-ASCII ones (like Chinese characters, accents in European languages, or special symbols), are stored in a consistent way, even if your computer or system uses different language settings.

// Callback: Receives err (error object if something went wrong, null otherwise) and data (the file content).



// ## Syncronus Read
try {
    const data = fs.readFileSync('work.txt', 'utf8');
    console.log('File content:', data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
console.log("I will not run unitl above task is done");

  
// # 2.Writing Files

// ## Asyncronus Write
// Writes data to a file asynchronously, creating the file if it doesn’t exist or overwriting it if it does.

fs.writeFile('example.txt', 'Hello World!', 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('File written successfully');
  });

  // Parameters => File Path, content to Write, Encoding, CallBack
//   If exmaple.txt does not exist it will create the file
  

// ## Syncronus Read
try {
  fs.writeFileSync('example.txt', 'Hello World!', 'utf8');
  console.log('File written successfully');
} catch (err) {
  console.error('Error writing file:', err);
}


// # 3. Append Data

// ## Asyncronus

// Appending data to a file asynchronously
fs.appendFile('example.txt', '\nAppended text.', 'utf8', (err) => {
  if (err) {
    console.error('Error appending to file:', err);
    return;
  }
  console.log('Data appended successfully');
});


// ## Syncronus

try {
  // Appending data to a file synchronously
  fs.appendFileSync('example.txt', '\nAppended text.Synchronus');
  console.log('Data appended successfully');

} catch (err) {
  console.error('Error appending to file:', err);
}


// # Link and UnLink

// fs.link(): Creating a Hard Link
// A hard link is essentially another name for an existing file. When you create a hard link, you create a new directory entry (link) that points to the same file data on the disk. Both links will refer to the same file content.

// Syntax : fs.link(srcPath, destPath, callback);

fs.link('example.txt', 'linkedFile.txt', (err) => {
  if (err) {
    console.error('Error creating link:', err);
    return;
  }
  console.log('Hard link created successfully');
});
// new file linkedFile.txt will be created, but both example.txt and linkedFile.txt will point to the same underlying data on the disk.

// fs.unlink(): Deleting a File
// The fs.unlink() method is used to delete a file from the filesystem. This method removes the file's directory entry, which essentially means that the file is deleted. However, if there are any other hard links pointing to the same file, the content remains on disk until all links to the file are deleted.

// Delete the file 'example.txt'
fs.unlink('example.txt', (err) => {
  if (err) {
    console.error('Error deleting file:', err);
    return;
  }
  console.log('File deleted successfully');
});

// Why Use Hard Links Instead of Directly Modifying a File?


// 1. Efficient Space Usage
// No extra disk space for copies: Since hard links don't duplicate the actual file content (they only add a new reference to the same content), creating a hard link does not use extra space. Only the new directory entry (link) is created.

// Use case: If you're working with large files and need multiple references to the same file (e.g., in multiple directories), hard links allow you to have multiple names without duplicating the actual file content.

// 2. Avoiding Overwrites
// Prevention of accidental deletion or overwrite: Sometimes, you might want to work with a file and ensure it doesn't get accidentally deleted or overwritten. By creating a hard link in a different location, you essentially protect the original file from being accidentally removed.