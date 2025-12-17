
import { _decorator, Component, JsonAsset } from 'cc';
const { ccclass, property } = _decorator;

export interface LevelData {
    id: number;
    rows: number;
    cols: number;
    words: string[];
    layout: string[]; // 用字符串数组表示网格布局，例如 ["ABC", "DEF"]
}

@ccclass('LevelManager')
export class LevelManager extends Component {

    @property(JsonAsset)
    public levelsConfig: JsonAsset | null = null;

    private _currentLevelIndex: number = 0;

    start() {
        // 这里后续会从 levelsConfig 加载
        this.loadLevel(0);
    }

    public loadLevel(index: number) {
        console.log(`Loading Level ${index}...`);
        // 模拟数据
        const mockLevel: LevelData = {
            id: 0,
            rows: 3,
            cols: 3,
            words: ["CAT", "DOG"],
            layout: [
                "C A T",
                "D O G",
                "A B C"
            ]
        };

        // 通知 GridManager 生成网格 (通过事件或直接调用)
        // director.getScene().emit(GameEvents.LEVEL_LOADED, mockLevel);
    }

    public getCurrentLevelData(): LevelData {
        // TODO: Implement actual loading
        return {
            id: 0,
            rows: 3,
            cols: 3,
            words: ["TEST"],
            layout: ["TES", "T  ", "   "]
        };
    }
}
