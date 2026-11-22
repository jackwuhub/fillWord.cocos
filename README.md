# fillWord — 填词游戏

基于 **Cocos Creator 3.8.8** + TypeScript 开发的填词（Word Puzzle）游戏工程。

> 🚧 **开发中** — 当前为工程骨架阶段，核心架构已搭建，游戏逻辑待完善。

## 玩法

在网格中填入字母，拼出目标单词。每关包含若干目标词，全部填出即过关。

## 开发状态

### ✅ 已完成

- **单例管理器** `GameManager` — 全局入口，防重复实例，负责游戏生命周期
- **事件总线** `GameEvents` — 场景级事件（GAME_START / GAME_OVER / LEVEL_LOADED / WORD_COMPLETED）
- **网格生成器** `GridManager` — 根据关卡数据动态实例化字母节点，自动居中布局
- **关卡管理** `LevelManager` — 关卡数据接口定义（`LevelData`），预置 JSON 配置接入点

### 🚧 进行中

- `GridManager.generateGrid()` — 字母节点已生成，**字母内容绑定待实现**（见 `// TODO: Set letter data`）
- `LevelManager.loadLevel()` — 目前使用内置模拟数据，**JSON 关卡配置待接入**
- 关卡数据文件 `levels.json` 及对应 `JsonAsset` 引用待创建

### ⬜ 待开发

- 输入交互（点击 / 滑动选字母）
- 单词匹配与判定逻辑
- 关卡数据文件与多关卡流程
- 场景搭建（`scenes/` 目录尚未创建）
- UI：主菜单、关卡选择、结算界面
- 音效与动画

## 项目结构

```
fillWord.cocos/
├── assets/
│   └── scripts/
│       ├── GameEvents.ts    # 事件常量与全局配置（GRID_SIZE / GRID_SPACING）
│       ├── GameManager.ts   # 游戏主管理器（单例）
│       ├── GridManager.ts   # 网格生成与布局
│       └── LevelManager.ts  # 关卡数据加载
├── settings/v2/packages/    # Cocos Creator 项目设置
├── package.json             # 工程标识（Creator 3.8.8）
├── tsconfig.json
└── .gitignore
```

## 核心设计

### 事件驱动解耦

模块之间通过 `director.getScene().emit()` 通信，而非直接引用，便于后续拆分模块：

```
GameManager ──emit(GAME_START)──▶ 场景
LevelManager ──emit(LEVEL_LOADED)──▶ GridManager ──▶ 生成网格
GridManager ──emit(WORD_COMPLETED)──▶ 判定逻辑
```

### 关卡数据结构

```typescript
interface LevelData {
    id: number;
    rows: number;
    cols: number;
    words: string[];   // 目标单词列表
    layout: string[];  // 网格布局，每项代表一行，如 ["ABC", "DEF"]
}
```

## 开发环境

| 组件 | 版本 |
|---|---|
| 引擎 | Cocos Creator 3.8.8 |
| 语言 | TypeScript |
| 目标平台 | 微信小游戏 / Web |

### 运行步骤

1. 安装 [Cocos Dashboard](https://www.cocos.com/creator-download) 并下载 **Cocos Creator 3.8.8**
2. 用 Cocos Creator 打开本工程目录
3. 在 **资源管理器** 中创建场景并挂载 `GameManager` / `GridManager` / `LevelManager` 组件
4. 点击编辑器顶部的预览按钮运行

> ⚠️ 当前仓库尚未包含场景文件（`scenes/`），需在编辑器中手动创建并配置组件引用。

## 注意事项

- `.meta` 文件**必须提交**，删除会导致资源引用丢失
- `library/` `temp/` `build/` 为编译产物，已在 `.gitignore` 中排除
- `tsconfig.json` 继承自 `./temp/tsconfig.cocos.json`，该文件由编辑器自动生成，首次打开前不存在属正常现象

## 许可证

Copyright © 2025. All Rights Reserved.

本仓库仅供查看学习，未经作者书面许可，不得复制、修改、分发或用于商业用途。详见 [LICENSE](LICENSE)。
