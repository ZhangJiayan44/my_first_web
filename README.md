# my_first_web

我的第一个用 **Git + GitHub** 从零上线的网站。纯静态页面，没有后端、没有数据库、不需要安装任何依赖。

🔗 在线地址：https://zhangjiayan44.github.io/my_first_web/

> 上面这行要等 GitHub Pages 开启之后才生效，记得回来核对一下仓库名。

---

## 文件说明

| 文件 | 作用 |
|---|---|
| `index.html` | 骨架 —— 页面上有什么内容 |
| `style.css` | 皮肤 —— 长什么样（颜色变量都在文件开头的 `:root` 里） |
| `app.js` | 行为 —— 按钮交互和学习清单 |
| `.gitignore` | 黑名单 —— 告诉 Git 哪些文件不用管 |
| `Git工作流速查.md` | 命令备忘 —— 忘了就翻它 |

## 本地预览

**方式一：直接双击** `index.html`（浏览器用 `file://` 打开，最简单）

**方式二：起本地服务器**（更接近真实环境，推荐）

```bash
# 在项目文件夹里执行任意一条
python -m http.server 8000     # 然后访问 http://localhost:8000
```

## 改完怎么发布

固定三步，记住它：

```bash
git add .
git commit -m "说明你改了什么"
git push
```

`push` 之后 GitHub Pages 会自动重新发布，等 1 分钟左右刷新网页就能看到变化。

## 上线原理（一句话）

GitHub Pages 盯着这个仓库的 `main` 分支，每次 `push` 之后自动把 `index.html` 当网站首页发布，所以**不用买服务器、不用配 Nginx**。

---

自己练手用，随便改。
