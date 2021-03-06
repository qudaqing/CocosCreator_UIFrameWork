import { MaskOpacity, FormType } from "../UIFrame/config/SysDefine";
import UIBase from "../UIFrame/UIBase";
import CocosHelper from "../UIFrame/CocosHelper";
import UIHallSetting2 from "./UIHallSetting2";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHallSetting extends UIBase {

    formType = FormType.PopUp;

    @property(cc.Node)
    CloseNode: cc.Node= null;

    startPosition: cc.Vec2;

    static prefabPath = "UIForm/UIHallSetting";


    onShow(startPosition: cc.Vec2) {
        this.startPosition = this.node.convertToNodeSpaceAR(startPosition);
    }

    start () {
        this.CloseNode.on('click', () => {
            this.closeUIForm();
        }, this)
    } 

    async showAnimation() {
        this.node.scale = 0;
        this.node.setPosition(this.startPosition);

        await CocosHelper.runSyncTween(this.node, cc.tween().to(0.2, {position: cc.v3(0, 0, 0), scale: 1}));
    }

    async hideAnimation() {

    }

    async onClickOpen2UI() {
        let hallSetting2 = await UIHallSetting2.openView();
        let result = await hallSetting2.waitPromise();
        if(result) {
            this.closeUIForm();
        }
    }

    // update (dt) {}
}
