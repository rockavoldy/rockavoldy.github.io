# Hugo Blog

Source code of my blog generated with Hugo. Templates built from scratch with only Tailwindcss and minimal JavaScript.

## Setup
1. Install hugo from [gohugo.io](https://gohugo.io/getting-started/installing/)
2. Install task from [taskfile.dev](https://taskfile.dev/#/installation)
3. create new article with command
    ```shell
    task new -- title-of-your-new-article
    ```
4. enjoy!

## Roadmap

- [x] Add Dark mode
- [ ] Popup image when clicked 
- [ ] Fix markdown and syntax highlighter
- [ ] Do some check on deprecated style from tailwind v2 to v3
- [ ] When i already publish more than 10 articles, need to fix pagination on this theme
- [x] Migrate some hardcoded on gh-actions to taskfile, so it can be published to other CI easily without tightly coupled with gh-actions
