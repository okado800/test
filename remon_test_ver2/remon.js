//画面再読み込み時必ず最上部へ移動させる
document.documentElement.scrollTop = 0;
//imgタグをすべて取得
const remonBox = document.querySelectorAll('img');
//イベント用フラグ;
let flag = [];
//要素のtopの位置
let position = [];

//remonBoxの要素の数の文だけ繰り返すforeach文、各要素のtopの位置の数値と要素数分のフラグを用意するための記述
remonBox.forEach(function(element){
	//getBoundingClientRect().topは指定の要素のtopの位置を取得するメソッド
	position.push(element.getBoundingClientRect().top);
	//remonBOxの要素数分だけfalseを配列に追加
	flag.push(false);
})

//画面がスクロールするたびに発動するイベントの設定
window.addEventListener('scroll', function() {
	for(let i=0; i < remonBox.length; i++)
		addClassActive(position[i],i)
});

/*クラスactiveを付与するための関数
第１引数はクラスactiveが付与が実行されるための条件の数値、画面が何pxスクロールした時に実行するかのpxの値
第２引数はquerySelectorAllで取得したimgタグのどれに対して付与するか、配列番号を指定*/

function addClassActive(num,arrayNum){
	//pageYOffsetは画面が縦に何px移動したかを取得するプロパティ、縦に[num]px以上移動したら実行
	if(window.pageYOffset >= num){
		//scrollイベントはスクロールするたびに何回も実行されるので、１回実行したらその後実行しないようにフラグで管理
		if(!flag[arrayNum]){
			remonBox[arrayNum].classList.add('active');
			flag[arrayNum] = true;
		}
	}
	else{
		if(flag[arrayNum]){
			remonBox[arrayNum].classList.remove('active');
			flag[arrayNum] = false;
		}
	}
}