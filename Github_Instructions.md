# Final-Project
INST377 - Dynamic Web Applications


# GitHub Repository Workflow Guide

This guide explains the steps to **clone a repository**, **make changes**, and **push those changes back to GitHub**.

---

## 1. Clone the Repository

To get a local copy of the repository on your computer, you need to **clone** the repository. This command will create a copy of the repository in your current directory.

### Command:

```bash
git clone https://github.com/mc2021/Final-Project.git
```

---

# Editing the Files

To make changes to the files in the repository:

- Open the project folder in your **preferred code editor** (e.g., Visual Studio Code).
- Edit the existing files or create new ones based on what you need to change or add.
  
You can modify files such as:
- `.html` files for web pages
- `.css` files for styling
- `.js` files for functionality
- `.md` files for documentation (like this one)

---

# Making Changes

## 1. Stage the Changes
```bash
git add .
```

### 2. Commit the Changes
```bash
git commit -m "A brief description of the changes"
```

### 3. Push the changes to current branch
```bash
git push
```


# Fetch and merge changes from the main branch on the remote repository (origin) to the local main branch
```bash
git pull origin main:main
```

