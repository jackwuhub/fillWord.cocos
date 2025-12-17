
import { _decorator, Component, Node, director } from 'cc';
import { GameEvents } from './GameEvents';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    private static _instance: GameManager;
    public static get instance() {
        return this._instance;
    }

    @property({ type: Node })
    public gridRoot: Node | null = null;

    onLoad() {
        if (!GameManager._instance) {
            GameManager._instance = this;
        } else {
            console.warn('Duplicate GameManager found!');
            this.destroy();
            return;
        }

        console.log("GameManager Loaded");
    }

    start() {
        // Test: Emit game start
        this.scheduleOnce(() => {
            this.startGame();
        }, 0.5);
    }

    public startGame() {
        console.log("Game Start!");
        director.getScene()?.emit(GameEvents.GAME_START);
    }
}
