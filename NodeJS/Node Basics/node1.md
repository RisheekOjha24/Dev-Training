# Node.js, NVM, and NPM - Concepts and Differences

## Node.js: 
A runtime environment that lets you run JavaScript on the server side, outside of a browser. Node.js is known for its non-blocking, asynchronous nature, making it efficient for I/O-heavy tasks.

## NVM (Node Version Manager): 
A tool to manage multiple Node.js versions on a single system. It’s useful if you need to switch between versions for different projects. NVM makes it easy to install, uninstall, and switch Node.js versions.

NVM (Node Version Manager) is not installed globally. It is generally installed per user in their home directory by default, which means each user can have their own NVM installation with separate 
configurations and versions of Node.js
All files and directories under ~/.nvm are isolated to your user account.

### Install nvm
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
curl -o-: This command fetches a file from the web. Here, -o- sends the output directly to the terminal rather than saving it as a file.

https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh: This is the URL of the NVM installation script on GitHub.

bash: This pipes the script to the bash command, which runs it in your terminal. This downloads and installs NVM on your system.


```
source ~/.bashrc
```
source: This command reloads a file in the current terminal session. This way, you don’t need to close and reopen the terminal.
~/.bashrc: This is the configuration file for the Bash shell. Running this command reloads your shell configuration, allowing you to access nvm without restarting your terminal.


nvm install node
nvm install <version>
==> nvm uninstall <version>

## NPM (Node Package Manager):
This is the default package manager for Node.js, helping to install and manage packages (reusable code modules). It comes bundled with Node.js by default, but it can also be upgraded independently.

