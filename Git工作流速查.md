# 先本地还是先 GitHub？——建仓库的两种顺序

> 结论先给：**两种都对，而且本质是一回事。**
> 因为 GitHub 上的仓库 = 本地仓库 + 一根叫 `remote` 的线。它们是两个独立仓库，
> `git remote add` 只是牵了根线，所以"谁先谁后"不是对错问题，是场景问题。

---

## 顺序 A：本地先建 → 再推上去（默认推荐）

```bash
mkdir my-project && cd my-project
git init                          # 本地立仓库
# —— 写代码 ——
git add .
git commit -m "init: 项目初始化"
# —— 现在去 GitHub 网页 New repository，建一个【空】仓库 ——
git remote add origin https://github.com/用户名/仓库名.git
git push -u origin main
```

**优点**
1. 不依赖网络，断网/GitHub 抽风都能干活 ← 这就是 Git 是**分布式**版本控制的意义
2. 从第一天就有 `git init`，不会出现"忘了初始化"的困惑
3. 历史与提交信息完全由自己掌握
4. 本地 `git log` 立刻见效，不用等 push

**适用**：自己做新项目、solo 参赛、想从零学流程。

---

## 顺序 B：GitHub 先建 → clone 下来（很多场景下是唯一解）

```bash
# GitHub 网页 New repository，建完拿到地址
git clone https://github.com/用户名/仓库名.git
cd 仓库名
# —— 写代码 ——
git add . && git commit -m "xxx" && git push
```

**`git clone` 到底干了什么？** 它内部一次做完了四件事：

```
建本地文件夹  →  git init  →  git remote add origin <地址>  →  git pull
```

所以顺序 B **没有跳过任何知识点**，只是帮你把四步合成一步。

**什么时候必须用 B**

| 场景 | 原因 |
|---|---|
| 比赛/黑客松主办方发来仓库链接 | 仓库已存在，你只能 clone |
| 团队里别人已经建好仓库 | 同上 |
| 想先在网页加 README / LICENSE / 模板 | 线上已有内容，clone 最省事 |
| 参与开源、fork 别人仓库 | 只能先有线上仓库 |

---

## ⚠️ 真正要防的坑：`Add a README` + 顺序 A

在 GitHub 建仓库时勾了 **Add a README file**，然后又用顺序 A 在本地 `git init` + `commit`，
push 时会撞：

```
! [rejected]        main -> main (fetch first)
error: failed to push some refs to '...'
hint: Updates were rejected because the remote contains work that you do not have locally.
```

**原因**：网页那个 README 产生了提交 #1，你本地也有提交 #1'，**两条历史互不相干**，
Git 不知道以谁为准，只能拒绝。

**三种救法**

```bash
# ① 推荐：把线上提交拉下来，把自己的接在后面（历史合流，最干净）
git pull --rebase origin main
git push -u origin main

# ② 线上那份不要了，强行覆盖（个人项目才敢用）
git push -u origin main --force

# ③ 从源头避免：建仓库时别勾任何初始化选项，保持空仓库
```

> 🔑 **记忆点：用顺序 A 时，GitHub 那边一定建"空仓库"** ——
> 不勾 Add README、不勾 Add .gitignore、不选 License。

---

## 决策表（下次直接查）

| 情况 | 用哪个 | 第一条命令 |
|---|---|---|
| 自己从零做新项目 | **A** | `git init` |
| 主办方/队友已给仓库地址 | **B** | `git clone <地址>` |
| 仓库已存在，本地也有代码但没连线 | 混合 | `git remote add origin <地址>`，再 `git pull --rebase` |
| 只是想看看别人的项目 | — | `git clone <地址>` |

---

## 连上线之后：两种顺序再无区别

```
git pull → 改代码 → git status → git add . → git commit -m "..." → git push
```

**唯一需要注意顺序的时刻，只有项目最开始那一次。** 之后就是上面这个无限循环。

---

## 附 1：常用 remote 命令

```bash
git remote -v                              # 看当前绑定的地址（-v = verbose）
git remote add origin <地址>                # 绑定（一个仓库只需一次）
git remote set-url origin <新地址>          # 改地址（换仓库、https 换 ssh 时用）
git remote remove origin                   # 解绑
```

---

# 一、只记这 5 条命令，就能活下来

```bash
git status                      # 我现在处于什么状态？（最该常敲的一条）
git add .                       # 把所有改动放进暂存区
git commit -m "改了什么"          # 存成一个版本快照
git push                        # 推到 GitHub
git log --oneline               # 看历史提交（按 q 退出）
```

**日常循环**：改代码 → `git add .` → `git commit -m "..."` → `git push`

---

# 二、整体流程图

```
① 工作区              ② 暂存区             ③ 本地仓库           ④ 远程仓库
 正在编辑的文件   add→  打包待提交    commit→  有历史了    push→   GitHub 上
   （红字）             （绿字）
                                    ←──────── pull ────────────
```

- `git status` 红字 = 没暂存；绿字 = 已暂存待提交
- 全部提交完会显示 `nothing to commit, working tree clean`（干净，最舒服的状态）

---

# 三、比赛第一天：从零建仓库

```bash
mkdir my-project && cd my-project   # 建文件夹并进入
git init                            # 变成仓库（生成隐藏的 .git 文件夹）
# ...把代码文件放进来...
git add .
git commit -m "init: 项目初始化"
```

然后去 GitHub 网页 → **New repository** → 填仓库名 → **不要**勾 Add README →
创建后页面会给你两行命令，照着敲：

```bash
git remote add origin https://github.com/用户名/仓库名.git   # 绑定远程地址（只需一次）
git push -u origin main                                    # 第一次推（-u 记住关联，以后直接 git push）
```

---

# 四、已有仓库，拉下来合作

```bash
git clone https://github.com/用户名/仓库名.git    # 下载到本地
cd 仓库名
```

**每轮开始工作前先 `git pull`，写完就先 `commit` 再 `push`** —— 这两句能避免 90% 的冲突。

---

# 五、分支：比赛分工用

```bash
git switch -c feature/login     # 新建并切到分支（老写法：git checkout -b）
# ...在分支上写代码、commit...
git switch main                 # 切回主分支
git merge feature/login         # 把分支的改动合并进来
git branch -d feature/login     # 合并完删掉分支
git branch                      # 看有哪些分支（* 是当前所在）
```

**推荐节奏**：`main` 永远保持"能跑"的状态，新功能开分支写，写完合并。

---

# 六、出错急救包（必看）

| 报错 / 情况 | 原因 | 怎么救 |
|---|---|---|
| `fatal: not a git repository` | 当前文件夹不是仓库 / 路径不对 | 用 `cd` 进项目文件夹，或先 `git init` |
| `Updates were rejected... fetch first` | GitHub 上有你本地没有的提交 | `git pull --rebase` 然后重新 `git push` |
| `CONFLICT (content): Merge conflict in 某文件` | 同一文件同一处两边都改了 | 打开文件，删掉 `<<<<<<<` `=======` `>>>>>>>` 标记、留下想要的内容，再 `git add .` → `git commit` → `git push` |
| `remote origin already exists` | 已绑定过远程地址 | `git remote set-url origin 新地址` |
| `Please tell me who you are` | 没配用户名邮箱 | `git config --global user.name "名字"` 和 `git config --global user.email "邮箱"` |
| `Authentication failed` | 密码/令牌不对 | 用 **Personal Access Token** 当密码（见第七节） |
| 提交信息写错了 | 手滑 | 还没 push：`git commit --amend -m "新信息"` |
| 改错了想回退 | 撤销未提交的改动 | 单个文件 `git restore 文件名`；撤销暂存 `git restore --staged 文件名` |
| 想看看改了什么 | — | `git diff`（未暂存）/ `git diff --staged`（已暂存） |
| 不小心 `git add` 了不该提交的 | — | `git restore --staged 文件名`（文件内容不动） |

### 致命操作提醒
- **永远不要删 `.git` 文件夹** —— 你的全部历史都在里面。
- **密码、API Key 绝不提交**：写进 `.gitignore`。一旦 push 出去，**删掉文件也没用**，历史里还在，必须去改密钥。

---

# 七、GitHub 认证：密码不能用怎么办

GitHub 从 2021 年起**不能用账号密码推代码**，要用 **Personal Access Token (PAT)**：

1. GitHub 网页 → 右上角头像 → **Settings** → 左侧最下 **Developer settings**
2. **Personal access tokens** → **Tokens (classic)** → **Generate new token (classic)**
3. Note 随便写；Expiration 选 30 天；勾选 **`repo`**（最重要的一个）
4. 生成后**立刻复制**（只显示一次），push 时粘贴到密码位置
5. 想让它记住：`git config --global credential.helper manager`（Windows 自带 Git Credential Manager）

> 更省事的替代：装 [GitHub CLI](https://cli.github.com/)，跑 `gh auth login` 一次搞定；或直接用 **GitHub Desktop** 图形界面。

---

# 八、参赛现场最小检查表

- [ ] `git config --global user.name` / `user.email` 配好了
- [ ] 项目文件夹里 `git init` 过，有 `.git` 目录
- [ ] `.gitignore` 写好了（至少排除 `node_modules/`、`.env`）
- [ ] 至少有一次 commit（`git log --oneline` 看得到）
- [ ] 绑定了远程：`git remote -v` 能显示地址
- [ ] `git push` 成功，GitHub 网页上能看到代码
- [ ] 如果是网页项目，**Settings → Pages** 开启，拿到公网地址
- [ ] 提交前 `git status` 是 clean 的

---

# 九、几个好习惯（评委真的会看）

1. **提交信息写清楚**：`fix: 修登录按钮点击无反应` 比 `update`、`111` 强太多。
   常用前缀：`feat:` 新功能 / `fix:` 修 bug / `docs:` 文档 / `style:` 格式 / `refactor:` 重构。
2. **小步提交**：写完一小块就 commit，别攒一天一次提交。历史能看出你的工作过程。
3. **README 写清楚**：项目是干什么的、怎么跑起来、用了什么技术 —— 评委第一眼看的就是它。
4. **别提交垃圾**：`node_modules/`、编辑器配置、`.env` 一律进 `.gitignore`。
5. **演示前提前跑一遍**，别在现场装依赖。
