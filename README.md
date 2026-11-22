# fillWord — 填词游戏

基于 **Cocos Creator 3.8.8** + TypeScript 开发的填词（Word Puzzle）游戏工程。

> 🚧 **开发中** — 当前为工程骨架阶段：管理器架构与网格布局已完成，
> 数据绑定、关卡配置、场景与交互逻辑待接入。

## 玩法

在网格中填入字母，拼出目标单词。每关包含若干目标词，全部填出即过关。

## 开发状态

### ✅ 已完成

- **单例管理器** `GameManager` — 全局入口，防重复实例，负责游戏生命周期与开局触发
- **事件总线** `GameEvents` — 场景级事件常量（`GAME_START` / `GAME_OVER` / `LEVEL_LOADED` / `WORD_COMPLETED`）
- **全局常量** `GameConst` — 格子尺寸 `GRID_SIZE = 100`、格子间距 `GRID_SPACING = 10`
- **网格生成器** `GridManager` — 监听 `LEVEL_LOADED`，按关卡数据实例化字母节点，自动居中布局，重建前清空旧网格
- **关卡管理** `LevelManager` — 定义 `LevelData` 接口，预留 `JsonAsset` 配置接入点，目前返回内置模拟关卡

### 🚧 进行中

- `GridManager.generateGrid()` — 字母节点已按行列定位生成，**字母内容绑定待实现**（`// TODO: Set letter data`）
- `LevelManager.loadLevel()` — 目前使用内置模拟数据，**JSON 关卡配置待接入**；`LEVEL_LOADED` 事件的派发语句被注释，需在关卡数据接入后解除
- 关卡数据文件 `levels.json` 及对应 `JsonAsset` 引用待创建

### ⬜ 待开发

- 输入交互（点击 / 滑动选字母）
- 单词匹配与判定逻辑
- 关卡数据文件与多关卡流程
- 场景搭建（`scenes/` 目录尚未创建）
- 字母预制体（`letterPrefab`）与网格容器节点
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
├── .creator/                # 编辑器默认元数据
├── package.json             # 工程标识（Creator 3.8.8）
├── tsconfig.json
├── LICENSE
└── .gitignore
```

## 核心设计

### 事件驱动解耦

模块之间通过 `director.getScene().emit()` / `.on()` 通信，而非直接相互引用，便于后续拆分与替换模块：

```
GameManager ──emit(GAME_START)──────▶ 场景（监听方）
LevelManager ──emit(LEVEL_LOADED)──▶ GridManager ──▶ 生成网格
GridManager ──emit(WORD_COMPLETED)─▶ 判定逻辑
```

`GridManager` 在 `onLoad` 中注册监听、`onDestroy` 中注销监听，避免节点销毁后仍收到事件。

### 网格布局

`generateGrid()` 以容器原点为中心计算每个格子的位置：

```
startX = -(cols * GRID_SIZE) / 2 + GRID_SIZE / 2
startY =  (rows * GRID_SIZE) / 2 - GRID_SIZE / 2
x = startX + col * (GRID_SIZE + GRID_SPACING)
y = startY - row * (GRID_SIZE + GRID_SPACING)
```

因此改变 `GameConst` 中的尺寸 / 间距，或关卡行列数，网格都会自动居中。

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

## 组件挂载

| 组件 | 需在编辑器中绑定的字段 | 说明 |
|---|---|---|
| `GameManager` | `gridRoot` | 开局入口，启动后广播 `GAME_START` |
| `GridManager` | `letterPrefab`、`container` | 字母预制体 + 网格容器节点，缺一即报错不生成 |
| `LevelManager` | `levelsConfig` | 关卡 JSON（可选，当前走内置模拟数据） |

## 开发环境

| 组件 | 版本 |
|---|---|
| 引擎 | Cocos Creator 3.8.8 |
| 语言 | TypeScript |
| 目标平台 | 微信小游戏 / Web |

### 运行步骤

1. 安装 [Cocos Dashboard](https://www.cocos.com/creator-download) 并下载 **Cocos Creator 3.8.8**
2. 用 Cocos Creator 打开本工程目录，等待首次资源导入完成
3. 在 **资源管理器** 中创建场景并挂载 `GameManager` / `GridManager` / `LevelManager` 组件，按上表绑定字段
4. 点击编辑器顶部的预览按钮运行

> ⚠️ 当前仓库尚未包含场景文件（`scenes/`）与字母预制体，需在编辑器中手动创建并配置组件引用。

## 注意事项

- `.meta` 文件**必须提交**，删除会导致资源引用丢失；新增 / 重命名资源请在编辑器内操作，让编辑器自动生成 `.meta`
- `library/` `temp/` `build/` `profiles/` 为编辑器生成物，已在 `.gitignore` 中排除
- `tsconfig.json` 继承自 `./temp/tsconfig.cocos.json`，该文件由编辑器首次打开工程时自动生成，首次打开前不存在属正常现象
- 微信小游戏构建产物 `wechatgame/` 已在 `.gitignore` 中排除

## 许可证

Copyright © 2025–2026. All Rights Reserved.

本仓库仅供查看学习，未经作者书面许可，不得复制、修改、分发或用于商业用途。详见 [LICENSE](LICENSE)。
