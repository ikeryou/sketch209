
import { MyDisplay } from "../core/myDisplay";
import { Conf } from "../core/conf";
import { Point } from "../libs/point";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _id:number;

  private _isAttachedClass:boolean = false;
  public get isAttachedClass():boolean {
    return this._isAttachedClass;
  }
  public set isAttachedClass(value:boolean) {
    this._isAttachedClass = value;
  }

  private _nowSelectClassName:string = '';
  public get nowSelectClassName():string {
    return this._nowSelectClassName;
  }
  public set nowSelectClassName(value:string) {
    this._nowSelectClassName = value;
  }

  private _pos:Point = new Point();
  public get pos():Point {
    return this._pos;
  }

  constructor(opt:{el:HTMLElement; id:number}) {
    super(opt)

    this._id = opt.id;

    this.getEl().innerHTML = '0';

    if(this._id % Conf.instance.LINE == 0) {
      this.getEl().innerHTML = '<br>';
    }

    this.css(this.getEl(), {
      color: '#FFF',
      fontSize: '40px',
    })
  }


  public addSelectClass(name:string): void {
    this.getEl().classList.add(name);
  }


  public removeSelectClass(name:string): void {
    this.getEl().classList.remove(name);
  }


  protected _update(): void {
    super._update();

    const ix = this._id % Conf.instance.LINE;
    const iy = ~~(this._id / Conf.instance.LINE);
    this._pos.set(ix / (Conf.instance.LINE - 1), iy / (Conf.instance.LINE - 1));
  }
}