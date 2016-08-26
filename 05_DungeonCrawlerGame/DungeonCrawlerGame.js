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
        exp: 10 + dungeon * 30
    };
    return monster;
}
function getWeapon(dungeon) {
    var weaponName = ['拳套', '木棒', '匕首', '大剑'];
    var weapon = {};
    weapon = {
        val: 4,
        color: 'coral',
        weapon: weaponName[dungeon - 1],
        attack: 15 * dungeon
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
var darkness = false;//是否显示烟雾

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
function fullRect(rect) {
    for (var i = rect.I; i < rect.I + rect.Heigth && i < 80; i++) {
        for (var j = rect.J; j < rect.J + rect.Width && j < 80; j++) {
            gameMap[i][j] = room;
        }
    }
}
//判断一个区域是否全部为墙
function canSetRoom(rect) {
    if (rect.I < 0 || rect.J < 0 || rect.I + rect.Heigth >= 80 || rect.J + rect.Width >= 80) {
        return false;
    }
    for (var i = rect.I; i < rect.I + rect.Heigth && i < 80; i++) {
        for (var j = rect.J; j < rect.J + rect.Width && j < 80; j++) {
            if (gameMap[i][j].val) {
                return false;
            }
        }
    }
    return true;
}
function getRandomInt(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
}
//生成随机区域
function randomRect() {
    var rect = {I: -1, J: -1, Width: 0, Heigth: 0};
    rect.I = getRandomInt(25, 40);
    rect.J = getRandomInt(25, 40);
    rect.Width = getRandomInt(8, 16);
    rect.Heigth = getRandomInt(8, 16);
    return rect;
}
//生成地图
function setMap(dungeon) {
    var roomRect = [];//用来保存每个房间的坐标、大小
    var roomNum = dungeon + 9;
    roomRect.push(randomRect());
    fullRect(roomRect[0]);
    //生成roomNum个房间
    while (roomNum) {
        var randIndex = getRandomInt(0, roomRect.length);
        //随机选取父room
        var parentRoom = roomRect[randIndex];
        var sonRoom = randomRect();
        var aisleJ, aisleI;
        //在父room的4个方向随机选取一个尝试生成子room
        switch (getRandomInt(0, 4)) {
            case 0:
                aisleJ = getRandomInt(parentRoom.J, parentRoom.J + parentRoom.Width - 1);
                aisleI = parentRoom.I - 1;
                sonRoom.J = getRandomInt(aisleJ - sonRoom.Width + 1, aisleJ);
                sonRoom.I = aisleI - sonRoom.Heigth;
                if (canSetRoom(sonRoom)) {
                    roomRect.push(sonRoom);
                    fullRect(sonRoom);
                    gameMap[aisleI][aisleJ] = room;
                    roomNum--;
                }
                break;
            case 1:
                aisleI = getRandomInt(parentRoom.I, parentRoom.I + parentRoom.Heigth);
                aisleJ = parentRoom.J + parentRoom.Width;
                sonRoom.I = getRandomInt(aisleI - sonRoom.Heigth + 1, aisleI);
                sonRoom.J = aisleJ + 1;
                if (canSetRoom(sonRoom)) {
                    roomRect.push(sonRoom);
                    fullRect(sonRoom);
                    gameMap[aisleI][aisleJ] = room;
                    roomNum--;
                }
                break;
            case 2:
                aisleI = getRandomInt(parentRoom.I, parentRoom.I + parentRoom.Heigth);
                aisleJ = parentRoom.J - 1;
                sonRoom.I = getRandomInt(aisleI - sonRoom.Heigth + 1, aisleI);
                sonRoom.J = aisleJ - sonRoom.Width;
                if (canSetRoom(sonRoom)) {
                    roomRect.push(sonRoom);
                    fullRect(sonRoom);
                    gameMap[aisleI][aisleJ] = room;
                    roomNum--;
                }
                break;
            case 3:
                aisleJ = getRandomInt(parentRoom.J, parentRoom.J + parentRoom.Width - 1);
                aisleI = parentRoom.I + parentRoom.Heigth;
                sonRoom.J = getRandomInt(aisleJ - sonRoom.Width + 1, aisleJ);
                sonRoom.I = aisleI + 1;
                if (canSetRoom(sonRoom)) {
                    roomRect.push(sonRoom);
                    fullRect(sonRoom);
                    gameMap[aisleI][aisleJ] = room;
                    roomNum--;
                }
                break;
            default:
                break;
        }
    }
    //添加怪物等元素
    for (var i = 0; i <= (10 + dungeon) * 2 + 3; i++) {
        var randIndex2 = getRandomInt(0, roomRect.length);
        var tempRoom = roomRect[randIndex2];
        var tempI = getRandomInt(tempRoom.I, tempRoom.I + tempRoom.Heigth);
        var tempJ = getRandomInt(tempRoom.J, tempRoom.J + tempRoom.Width);
        if (i < 10 + dungeon) {
            if (gameMap[tempI][tempJ].val != 1) {
                i--
            } else {
                gameMap[tempI][tempJ] = getMonster(dungeon);
            }
        }

        if (i > 10 + dungeon && i < (10 + dungeon) * 2) {
            if (gameMap[tempI][tempJ].val != 1) {
                i--
            } else {
                gameMap[tempI][tempJ] = getBlood(dungeon);
            }
        }

        if (i == (10 + dungeon) * 2) {
            if (gameMap[tempI][tempJ].val != 1) {
                i--
            } else {
                gameMap[tempI][tempJ] = getWeapon(dungeon);
            }
        }
        if (i == (10 + dungeon) * 2 + 1) {
            if (gameMap[tempI][tempJ].val != 1) {
                i--
            } else {
                gameMap[tempI][tempJ] = nextDungeon;
            }
        }
        if (i == (10 + dungeon) * 2 + 2) {
            if (gameMap[tempI][tempJ].val != 1) {
                i--
            } else {
                hero.I = tempI;
                hero.J = tempJ;
                gameMap[hero.I][hero.J] = hero;
            }
        }
        if (dungeon == 4 && i == (10 + dungeon) * 2 + 3) {
            if (gameMap[tempI][tempJ].val != 1) {
                i--
            } else {
                gameMap[tempI][tempJ] = boss;
            }
        }
    }
}

//属性框
var Head = React.createClass({
    render: function () {
        return (
            <p className="head">
                <span className="title">Health:</span>
                <span id="health">{hero.health}</span>
                <span className="title">Weapon:</span>
                <span id="weapon">{hero.weapon}</span>
                <span className="title">Attack:</span>
                <span id="attack">{hero.attack}</span>
                <span className="title">Level:</span>
                <span id="level">{hero.level}</span>
                <span className="title">Exp:</span>
                <span id="exp">{hero.exp}</span>
                <span className="title">Dungeon:</span>
                <span id="dungeon">{hero.dungeon}</span>
                <button id="darkness" onClick={this.props.click}>Darkness</button>
            </p>
        );
    }
});
//react组件，生成一行
var RowMap = React.createClass({
    render: function () {
        var i = this.props.i;
        var List = this.props.row;
        var rowList = [];
        for (var j = 0; j < List.length; j++) {
            var temp;
            //烟雾
            if (darkness && (i < hero.I - 10 || i > hero.I + 10 || j < hero.J - 10 || j > hero.J + 10)) {
                temp = (<div className="cell" style={{backgroundColor:'black'}} key={i*80+j} id={i+' '+j}></div>);
            } else {
                temp = (<div className="cell" style={{backgroundColor:List[j].color}} key={i*80+j} id={i+' '+j}></div>);
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
        var Map = [];
        var i = 0, max = 80;
        //地图显示范围
        if (hero.I < 20) {
            i = 0;
            max = 40;
        } else {
            if (hero.I > 60) {
                i = 40;
                max = 80;
            } else {
                i = hero.I - 20;
                max = hero.I + 20;
            }
        }
        for (i; i < max; i++) {
            for (i; i < max; i++) {
                var temp = (<RowMap row={List[i]} i={i} key={i}/>);
                Map.push(temp);
            }
        }
        return (
            <div>
                {Map}
            </div>
        );
    }
});
//react主程序
var Main = React.createClass({
    getInitialState: function () {
        return {update: true};
    },//用来刷新组件
    darkClick: function () {
        darkness = !darkness;
        this.setState({update: !this.state.update});
    },
    keyPress: function (event) {
        console.log(event.key);
    },
    //添加键盘按钮事件
    componentDidMount() {
        document.addEventListener("keydown", this.keyPress);
    },
    componentDidUpdate() {
        document.addEventListener("keydown", this.keyPress);
    },
    render: function () {
        return (
            <div>
                <Head click={this.darkClick}/>
                <GameMap mapList={gameMap}/>
            </div>
        );
    }
});

//test
initMap();
setMap(1);
console.log(gameMap);
ReactDOM.render(<Main />, document.getElementById('main'));