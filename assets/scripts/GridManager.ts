
import { _decorator, Component, Node, Prefab, instantiate, Vec3, director } from 'cc';
import { GameConst, GameEvents } from './GameEvents';
import { LevelData } from './LevelManager';
const { ccclass, property } = _decorator;

@ccclass('GridManager')
export class GridManager extends Component {

    @property(Prefab)
    public letterPrefab: Prefab | null = null;

    @property(Node)
    public container: Node | null = null; // 网格容器

    onLoad() {
        director.getScene()?.on(GameEvents.LEVEL_LOADED, this.onLevelLoaded, this);
    }

    onDestroy() {
        director.getScene()?.off(GameEvents.LEVEL_LOADED, this.onLevelLoaded, this);
    }

    private onLevelLoaded(event: any) { // 使用 any 暂时规避，建议用 strong type
        const levelData = event as LevelData; // 需要确保类型一致
        if (!levelData) return;
        this.generateGrid(levelData);
    }

    public generateGrid(data: LevelData) {
        if (!this.container || !this.letterPrefab) {
            console.error("GridManager: container or prefab missing!");
            return;
        }

        this.container.removeAllChildren();

        const startX = -(data.cols * GameConst.GRID_SIZE) / 2 + GameConst.GRID_SIZE / 2;
        const startY = (data.rows * GameConst.GRID_SIZE) / 2 - GameConst.GRID_SIZE / 2;

        for (let r = 0; r < data.rows; r++) {
            for (let c = 0; c < data.cols; c++) {
                const node = instantiate(this.letterPrefab);
                node.parent = this.container;

                const x = startX + c * (GameConst.GRID_SIZE + GameConst.GRID_SPACING);
                const y = startY - r * (GameConst.GRID_SIZE + GameConst.GRID_SPACING);

                node.setPosition(new Vec3(x, y, 0));

                // TODO: Set letter data based on data.layout[r][c]
            }
        }
    }
}
