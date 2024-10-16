# Git
Git is a distributed version control system designed to track changes in source code during software development. It allows multiple developers to work on a project simultaneously without interfering with each other's changes.

# Git Configuration

Setting up your name and email address in Git config ensures that your commits accurately reflect your identity. This information is embedded in each commit and is crucial for accountability and collaboration within a project.

To configure your Git identity, use the following commands:
git config --global user.name "Your Name" git config --global user.email "your.email@example.com"



To see what you have set up, run:
git config --global --list




## Fork Point

The fork point is where branches diverge from each other, sharing the same commit history.

### Rebase

To rebase the current branch onto another branch, use:
git rebase <branch_name>




## Cloning a Repository

Clone a remote repository to your local machine using:
git clone <repository_url> <local_directory>



- `<repository_url>`: URL of the remote repository (HTTPS or SSH).
- `<local_directory>` (optional): Name for the cloned repository directory. If not provided, Git will create a directory with the same name as the remote repository.

> **Note:** Running `git init` again in the cloned directory is unnecessary.

## Directory Commands

- `dir`: Lists contents of the current directory (Windows).
- `ls`: Equivalent command (Unix).
- `ls -a`: Lists all files, including hidden ones (equivalent to `dir /a`).

## Understanding Remote Repositories

When you clone a repository from GitHub using `git clone`, Git automatically adds a remote named "origin" to your local repository.

### Push Changes to Remote

To push changes from your local repository to the remote, use:
git push origin <branch_name>


If the branch doesn't exist in the remote, Git will create it. If it exists, it will update it.

### Set Upstream Branch

To push and set the upstream branch, use:
git push -u origin main




### Remote Management

- To add a new remote:
git remote add <remote_name> <url_link>



- To view remote URLs:
git remote -v



- To change a remote URL:
git remote set-url <remote_name> <new_url>



- To delete a remote:
git remote remove <remote_name>




## Branch Commands 🌿🪵

- To list all branches:
git branch



- To create a new branch:
git branch <branch_name>



- To switch to a branch:
git checkout <branch_name>



- To create and switch to a new branch:
git checkout -b <branch_name>



- To delete a branch:
git branch -d <branch_name>



- To force delete a branch:
git branch -D <branch_name>



- To rename a branch:
git branch -m <old_branch_name> <new_branch_name>




## Additional Branch Information

To see additional information about each branch, including commit hash and message:
git branch -v




## Merging Branches

To merge a branch, first ensure you are on the target branch (where you want to merge changes):
git merge <branch_name>



Resolve any conflicts if they arise.

> **Important Note:** When you initialize a Git repository and haven't made any commits yet, running `git branch` may not show any branches because there are none created yet.

## Pull Command

To fetch changes from a remote repository and merge them:
git pull <remote_name> <branch_name>




### Handling Errors

1. **Diverging Histories**: If you see "fatal: refusing to merge unrelated histories," it means the histories have diverged. To allow the merge:
git pull <remote_name> <branch_name> --allow-unrelated-histories



2. **Conflicts**: Occur when changes overlap between branches. Resolve conflicts as necessary.

## Imp Points

When you create a new branch locally, make changes, and push it to the remote repository for the first time, GitHub presents the "compare and pull request" option.

If the branch already exists on the remote, pushing changes directly will not trigger this option.

## Comparing Branches

To compare the differences between the current branch and another branch:
git diff <branch_name>




## Git Reset Commands

The `git reset` command resets the current HEAD to a specified state:

- To unstage changes:
git reset



- To perform a mixed reset (changes remain in working directory):
git reset <commit_hash>



- To perform a hard reset (discard all changes):
git reset --hard <commit_hash>



> **Note:** This operation is irreversible and can cause loss of data, so use it with caution.
