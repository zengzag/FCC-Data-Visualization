var wall = {
    val: 0,
    color: 'gray'
};
var room = {
    val: 1,
    color: 'white'
};
var hero = {
    I: 72,//行
    J: 58,//列
    val: 2,
    color: 'blue',
    health: 100,
    weapon: '无',
    attack: 10,
    level: 1,
    exp: 100,
    dungeon: 1
};
function getMonster(dungeon) {
    var monster = {};
    monster = {
        val: 3,
        color: 'red',
        health: 10 + dungeon * 10 + Math.floor(Math.random() * 10),
        attack: dungeon * 5 + Math.floor(Math.random() * 10),
        exp: 10 + dungeon * 10
    };
    return monster;
}
function getWeapon(dungeon) {
    var weaponName = ['拳套', '木棒', '匕首', '大剑'];
    var weapon = {};
    weapon = {
        val: 4,
        color: 'coral',
        weapon: weaponName[dungeon],
        attack: 70
    };
    return weapon;
}
function getBlood(dungeon) {
    var blood = {};
    blood = {
        val: 5,
        color: 'green',
        health: 10 + dungeon * 10 + Math.floor(Math.random() * 10)
    };
    return blood;
}
var nextDungeon = {
    val: 6,
    color: 'indigo'
};
var boss = {
    val: 7,
    color: 'red',
    health: 800,
    attack: 50
};
//以上构建各类,其中怪物等有变动的类采用函数生成。
var gameMap = [];//游戏地图，各点的值为上面的各类
var roomRect=[];//用来保存每个房间的坐标、大小
var darkness=false;//是否显示烟雾

//初始化地图，地图长宽为80
function initMap() {
    for (var i = 0; i < 80; i++) {
        gameMap[i] = [];
        for (var j = 0; j < 80; j++) {
            gameMap[i].push(wall);
        }
    }
}
//在一个区域填充空白
function fullRect(X, Y, Width, Heigth) {
    for (var i = X; i < X + Width && i < 80; i++) {
        for (var j = Y; j < Y + Heigth && j < 80; j++) {
            gameMap[i][j] = room;
        }
    }
}
//判断一个区域是否全部为墙
function canSetRoom(X, Y, Width, Heigth){
    if(X<0||Y<0||X + Width >= 80||Y + Heigth >= 80){
        return false;
    }
    for (var i = X; i < X + Width && i < 80; i++) {
        for (var j = Y; j < Y + Heigth && j < 80; j++) {
            if(gameMap[i][j].val){
                return false;
            }
        }
    }
    return true;
}
//生成地图
function setMap() {
    
}



//react组件，生成一行
var RowMap = React.createClass({
    render: function () {
        var i = this.props.i;
        var List = this.props.row;
        var rowList=[];
        for(var j=0;j<List.length;j++){
            var temp;
            //烟雾
            if(darkness&&(i<hero.I-10||i>hero.I+10||j<hero.J-10||j>hero.J+10)){
                temp=(<div className="cell" style={{backgroundColor:'black'}} key={j}></div>);
            }else{
                temp=(<div className="cell" style={{backgroundColor:List[j].color}} key={j}></div>);
            }
            rowList.push(temp);
        }
        return <div className="row">{rowList}</div>;
    }
});
//react组件，生成地图
var GameMap = React.createClass({
    render: function () {
        var List = this.props.mapList;
        var Map=[];
        var i=0,max=80;
        //地图显示范围
        // if(hero.I<20){
        //     i=0;max=40;
        // }else{
        //     if(hero.I>60){
        //         i=40;max=80;
        //     }else {
        //         i=hero.I-20;max=hero.I+20;
        //     }
        // }
        // for(i;i<max;i++){
        for(i;i<max;i++){
            var temp=(<RowMap row={List[i]} i={i} key={i}/>);
            Map.push(temp);
        }
        return (
            <div>
                {Map}
            </div>
        );
    }
});

//test
initMap();
fullRect(2, 2, 5, 5);
gameMap[hero.I][hero.J]=hero;
console.log(canSetRoom(77, 77, 5, 5));
ReactDOM.render(<GameMap mapList={gameMap} />, document.getElementById('test'));