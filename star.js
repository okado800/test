//CSSのアニメーションに設定する値を生成してくれるクラス
class EasyAnimationParamCreater{
    //nameはアニメーション,randomはonかoffの設定が可能、onの場合は値を自動生成、offの場合は自分で設定できる
    constructor(name,random){
        this.name = name;
        this.random = random;
    }
    /*
        値を作成するメソッド、名前以外省略してもOKなように初期値を設定
        配列に入れた値を使用することで名前以外すべて数字のみで設定可能
    */
    parameter(random = this.random,duration = 1,timing = 0,direction = 0,){
        //animation-timing-functionの値を配列に、今回はよく使用するlinearとeaseのみ
        const timingParam =["linear","ease"];
        //animation-directionの値、今回は４種類設定可能
        const directionParam = ["normal","reverse","alternate","alternate-reverse"];
        //animation-iterationは今回は無限ループのみ
        this.iteration = "infinite";
        //ランダム生成onの場合ランダムな数字を格納
        if(random == "on"){
                //10~0.5の間で数字を生成
                this.duration =  ((Math.floor(Math.random() * (100 + 1 - 5) )) + 5)/10 + "s";
                //配列の中身を一つランダムに出力
                this.timing = timingParam[Math.floor(Math.random() * timingParam.length)]
                this.direction = directionParam[Math.floor(Math.random() * directionParam.length)]
        }
        //ランダムoffの場合ユーザーの設定した数値を使用
        else if(random == "off"){
            this.duration = duration + "s";
            this.timing = timingParam[timing];
            this.direction = directionParam[direction];
        }
        //実際に入れるアニメーションのパラメーター
        let param = `${this.name} ${this.duration} ${this.timing} ${this.direction} ${this.iteration}`;
        return param;

    }
}

/*
    星を作るためのクラス、EasyAnimationParamCreaterクラスのメンバを使えるように親クラスに設定し継承
    親クラスが星の動きを自動的にランダム生成してくれる
*/
class Stars extends EasyAnimationParamCreater{
    //アニメーションの名前、生成する星の最大数、最小数を設定できる、初期値は2000~1000個の星を生成
    constructor(name,max=2000,min=1000){
        //親クラスのコンストラクタの値、ランダムはonに
        super(name,'on');
        this.max = max;
        this.min = min;
    }
    //設定に必要な数字をランダムで生成するためのメソッド
    numberMaker(property,max,min){
        let number = 0;
        switch(property){
            //星の数の設定、for文の繰り返し回数に使用
            case 'star':
                number = (Math.floor( Math.random() * (max + 1 - min) )) + min ;
                break;
            //星の位置の設定、画面からはみ出ないように、1~99の整数から小数点１桁までの数値をでランダム生成、cssのtop.leftの値に使用
            case 'position':
                number = (Math.random() * 100).toFixed(1) + "%";
                break;
            //星の大きさ、大きくなりすぎないように、1~3の整数小数点一桁までで生成、cssのwidht,heightの値に使用
            case 'scale':
                number = (Math.random() * 3).toFixed(1)+"px";
                break;
            //星の色、暗くなりすぎないように201~255の間で整数を生成、rgbaの数値に使用
            case 'color':
                number = (Math.floor( Math.random() * (255 + 1 - 201) )) + 201 ;
                break;
            //星の光度,暗くなりすぎないように0.6~0.9の間で小数を生成
            case 'bright':
                number =((Math.random() * ( 0.9 - 0.6) ) + 0.6).toFixed(1); ;
                break;
        }
        return number;
    }
    starMake(){
        let night = document.querySelector("#night");
        //コンストラクタに設定した数を元に星のdivタグを生成
        for(let i = 0; i < this.numberMaker("star",this.max,this.min); i++){
            let div = document.createElement('div');
            div.setAttribute("class","star");
            //ランダム生成した数字で星の位置を指定
            div.style.top = this.numberMaker("position");
            div.style.left = this.numberMaker("position");
            //星の大きさいびつにならないように幅、高さ同じになるように記述
            let scale = this.numberMaker('scale');
            div.style.width = scale;
            div.style.height = scale;
            //星の色の値をrgba形式で設定
            let rgba = "rgba(" + this.numberMaker('color') +"," + this.numberMaker('color') + "," + this.numberMaker('color') + "," + this.numberMaker('bright') + ")";
            div.style.backgroundColor = rgba;
            div.style.boxShadow = "0 0 5px " + rgba + ", 0 0 8px " + rgba +", 0 0 15px " + rgba;
            //アニメーションの値を親クラスのparameterメソッドを使用して設定
            div.style.animation = this.parameter();
            night.appendChild(div);
       }
    }
}

//アニメーションの名前を設定してインスタンス化
let stars = new Stars('shine');
//星を生成
stars.starMake();




