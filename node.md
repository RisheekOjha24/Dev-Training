# Understanding Hard Links

In a file system, a hard link is like an additional reference (or name) to a specific file. Every file on disk has a unique identifier called an inode, which is the actual data stored on disk. A hard link points directly to this inode, meaning it’s not just a copy of the file but another name that points to the exact same data.

## Characteristics of Hard Links:

1. Both the original file and any hard links to it point to the same data.

2. If you modify the data in one hard link, it reflects in all other hard links (and the original file) because they share the same underlying inode.

3. Deleting one hard link does not delete the data itself, as long as other hard links still reference it.