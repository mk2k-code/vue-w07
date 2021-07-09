# new-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).




### git command:
```bash

git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mk2k-code/vue-w07.git
git push -u origin main

# git command:
~/.gitconfig
git config --list
git remote 
```

### Deploy Vue project to github page:
```bash
npm run build
# 切換到輸出的目錄(dist)下 
cd dist

git init
git add -A
git commit -m '0709 deploy'

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:mk2k-code/vue-w07.git master:gh-pages
```
