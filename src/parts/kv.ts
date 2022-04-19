
import { MyDisplay } from "../core/myDisplay";
import { Color } from "three/src/math/Color";
import { Util } from "../libs/util";
import { Item } from "./item";
import { Point } from "../libs/point";
import { HSL } from "../libs/hsl";

// -----------------------------------------
//
// -----------------------------------------
export class Kv extends MyDisplay {

  private _item:Array<Item> = [];
  private _selectClassNames:Array<Array<string>> = [];
  private _pos:Array<Point> = [];

  constructor(opt:{el:HTMLElement}) {
    super(opt)

    // 動く円の数
    for(let i = 0; i < 10; i++) {
      this._pos.push(new Point())
    }

    // 選択用のクラス作っておく
    let i = 0;
    this._pos.forEach(() => {
      this._selectClassNames.push([]);

      const num = 50;
      for(let l = 0; l < num; l++) {

        const hsl = new HSL();
        hsl.s = 1;
        hsl.l = 0.5;
        hsl.h = Util.instance.map(l, 0, 1, 0, num - 1);

        const col = new Color()
        col.setHSL(hsl.h, hsl.s, hsl.l);
        let styleCol:String = col.getStyle();

        const sheets = document.styleSheets
        const sheet = sheets[sheets.length - 1];
        const name = 'col-' + (i * num + l)
        sheet.insertRule(
          // '.' + name + '::selection { background: ' + styleCol + '; }',
          '.' + name + '::selection { background: ' + styleCol + '; color: ' + '#000' + '; }',
          sheet.cssRules.length
        );

        this._selectClassNames[i].push(name);
      }
      i++;
    })


    this.qsAll('.l-main-item').forEach((val,i) => {
      const item = new Item({
        el:val as HTMLElement,
        id:i,
      });
      this._item.push(item);
    });
  }


  protected _update(): void {
    super._update();

    this._pos.forEach((val,i) => {
      const radius = 0.55;
      const rad = Util.instance.radian((i * (360 / this._pos.length)) + this._c * 2);
      // const x = 0.5 + Math.sin(rad) * radius * 0;
      const x = i / (this._pos.length - 1);
      const y = 0.5 + Math.cos(rad) * radius;
      val.x = x;
      val.y = y;

      this._item.forEach((val2,i2) => {
        if(i == 0) val2.isAttachedClass = false;
        if(!val2.isAttachedClass) {
          if(val2.nowSelectClassName != '') val2.removeSelectClass(val2.nowSelectClassName);
        }

        const dx = val.x - val2.pos.x;
        const dy = val.y - val2.pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < 0.1) {
          if(val2.nowSelectClassName != '') val2.removeSelectClass(val2.nowSelectClassName);
          const key = (this._c + i2) % (this._selectClassNames[i].length - 1)
          val2.nowSelectClassName = this._selectClassNames[i][key];
          val2.addSelectClass(val2.nowSelectClassName);
          val2.isAttachedClass = true;
        }
      })
    })

  }
}