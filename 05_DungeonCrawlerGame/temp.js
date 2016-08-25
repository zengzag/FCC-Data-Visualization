var column = 60;
var row = 60;
var wheight = 20;
var wwidth = 46;
var tileTypeEnum = ["empty", "player", "wall", "enemy", "potion", "exit", "weapon", "boss", "dark"];
var LevelupExp = [20,50,100,150,200,300,400];
var roomSizes = [[5,5],[4,3],[4,5],[6,7],[6,6],[6,5],[4,4],[3,4]];
var Sight = 4;

var allMaps = [];
var gamemap = [];

function randInt(min,max){
    return Math.floor(Math.random()*(max-min) + min);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function BuildItems(dungeon) {
    var items = [{type:1},
        {type:3,health:dungeon*10+10,attack:dungeon*10,exp:10*dungeon},{type:3,health:dungeon*10+10,attack:dungeon*10, exp:10*dungeon},
        {type:3,health:dungeon*10+10,attack:dungeon*10,exp:10*dungeon},{type:3,health:dungeon*10+10,attack:dungeon*10,exp:10*dungeon},
        {type:3,health:dungeon*10+10,attack:dungeon*10,exp:10*dungeon},{type:3,health:dungeon*10+10,attack:dungeon*10,exp:10*dungeon},
        {type:4,recover:30},{type:4,recover:30},
        {type:4,recover:30},{type:4,recover:30}
        ,{type:6,arm:10*dungeon, level:dungeon}];
    if(dungeon===4){
        items.push({type:7, health:200, attack:30});
    }else{
        items.push({type:5});
    }
    return shuffleArray(items);
}

function BuildRandomMap(dungeon){
    gamemap = [];
    for(var i=0;i<row;i++){
        var nr = [];
        for(var j=0;j<column;j++){
            nr.push({type:2, id:i*column+j});
        }
        gamemap.push(nr);
    }

    var rooms = BuildRooms(7+dungeon);
    var items = BuildItems(dungeon);

    var player;
    while(items.length > 0){
        var randRoom = rooms[randInt(0,rooms.length)];
        var randX = randInt(randRoom.x1, randRoom.x2);
        var randY = randInt(randRoom.y1, randRoom.y2);

        if(gamemap[randY][randX].type != 0) {
            continue;
        }else{
            var item = items.shift();
            FillMap(randX,randY,randX,randY,item);
            if(item.type===1){
                player = {x:randX, y:randY}
            }
        }
    }
    return {map:gamemap, player:player};
}

function BuildRooms(num){
    var sizes = [];
    for(var i=0;i<num;i++){
        sizes.push(roomSizes[randInt(0,8)]);
    }

    var rooms = [];
    var seedX = 0, seedY = 0, lastRoom = null;
    var trial = 0;
    while(rooms.length < num) {
        var size = sizes[rooms.length];
        if(lastRoom === null){
            seedX = randInt(0, column/2);
            seedY = randInt(0, row/2);
            FillMap(seedX, seedY, seedX+size[1], seedY+size[0], {type:0});
            lastRoom = {x1:seedX, y1:seedY, x2:seedX+size[1], y2:seedY+size[0]};
            rooms.push(lastRoom);
        }else{
            if(trial >= 10) {
                lastRoom = rooms[randInt(0,rooms.length)];
                trial = 0;
            }
            seedX = randInt(lastRoom.x1, lastRoom.x2+1);
            seedY = randInt(lastRoom.y1, lastRoom.y2+1);
            var x1, x2, y1, y2, cx=seedX, cy=seedY;

            //0:up, 1:right, 2:down, 3:left
            var direction = randInt(0,4);
            switch(direction){
                case 0:
                    x1 = randInt(seedX-size[1]+1, seedX);
                    y1 = lastRoom.y1 - size[0] - 1;
                    cy = lastRoom.y1-1;
                    break;
                case 1:
                    x1 = lastRoom.x2 + 2;
                    y1 = randInt(seedY-size[0]+1,seedY);
                    cx = lastRoom.x2+1;
                    break;
                case 2:
                    x1 = randInt(seedX-size[1]+1, seedX);
                    y1 = lastRoom.y2 + 2;
                    cy = lastRoom.y2 +1;
                    break;
                case 3:
                    x1 = lastRoom.x1 - size[1] - 1;
                    y1 = randInt(seedY-size[0]+1,seedY);
                    cx = lastRoom.x1 - 1;
                    break;
            }
            var x2 = x1 + size[1]-1, y2 = y1 + size[0] -1;
            if(isOverlap(x1,y1,x2,y2)){
                continue;
                trial ++;
            }else{
                trial = 0;
                FillMap(x1, y1, x2, y2, {type:0}); // Fill room
                FillMap(cx, cy, cx, cy, {type:0}); //Fill path
                lastRoom = {x1:x1, y1:y1, x2:x2, y2:y2, cx: cx, cy: cy};
                rooms.push(lastRoom);
            }
        }
    }

    return rooms;
}

function FillMap(x1,y1,x2,y2,type) {
    OpRect(x1,y1,x2,y2, function(i,j){
        if(i>=0 && i < row && j>=0 && j < column){
            gamemap[i][j] = type;
        }
    });
}

function isOverlap(x1, y1, x2, y2) {
    var ans = false;
    OpRect(x1-1,y1-1,x2+1,y2+1, function(i,j){
        if(j < 0 || j >= column || i<0 || i >= row ){
            ans = true;
        }else{
            if(gamemap[i][j].type != 2){
                ans = true;
            }
        }
    });
    return ans;
}

function OpRect(x1,y1,x2,y2,cb){
    for(var i=y1;i<=y2;i++){
        for(var j=x1;j<=x2;j++){
            {
                cb(i,j);
            }
        }
    }
}

function isInSight(centroid,i,j){
    if(Math.abs(i-centroid.y) <= Sight && Math.abs(j-centroid.x)<= Sight){
        return true;
    }else{
        return false;
    }
};

var Board = React.createClass({

    render: function(){
        return (
            <div className="innerBoard">{
                this.props.tiles.map(function(c,i){
                    return <div id={c.id} className={"tile "+ tileTypeEnum[c.type]}></div>
                })
            }</div>
        );}
});

var GameApp = React.createClass({
    getInitialState: function(){
        return this.restart();
    },

    restart: function(){
        allMaps = [];
        console.log("rebuilding..");
        for(var i=0;i<4;i++){
            allMaps.push(BuildRandomMap(i+1));
        }
        console.log("rebuild is done");
        var gamemap = allMaps[0];
        return {
            health:100,
            weapon:0,
            attack:10,
            level:1,
            exp:0,
            dungeon:1,
            dark:true,
            map: gamemap.map,
            player: gamemap.player
        };
    },

    getTilesInWindows: function(all, centroid, dark){
        var x1 = Math.min(Math.max(0, Math.floor(centroid.x - wwidth/2)), column-wwidth-1);
        var y1 = Math.min(Math.max(0, Math.floor(centroid.y - wheight/2)), row-wheight-1);
        var x2 = x1 + wwidth -1;
        var y2 = y1 + wheight -1;

        var result = [];
        OpRect(x1,y1,x2,y2, function(i,j){
            if(!dark || isInSight(centroid,i,j)){
                result.push(all[i][j]);
            }else{
                result.push({type:8});
            }
        });
        return result;
    },

    toggleDarkness: function(e){
        this.setState({dark: !this.state.dark});
    },

    moveTo: function(player, pos){
        var map = this.state.map;
        map[player.y][player.x] = {type:0};
        map[pos.y][pos.x] = {type:1};
        return map;
    },

    keyPressHandler: function(e){
        event.preventDefault()
        var player = this.state.player;
        var nextPos = {x:player.x,y:player.y};
        switch(e.key){
            case "ArrowUp":
                nextPos.y = player.y-1;
                break;
            case "ArrowRight":
                nextPos.x = player.x+1;
                break;
            case "ArrowDown":
                nextPos.y = player.y+1;
                break;
            case "ArrowLeft":
                nextPos.x = player.x-1;
                break;
        }

        if (nextPos.x < 0 || nextPos.x >= column || nextPos.y < 0 || nextPos.y >= row){
            return;
        }

        var op = {};
        switch(this.state.map[nextPos.y][nextPos.x].type){
            case 0:
                //empty
                op.map = this.moveTo(player, nextPos);
                op.player= nextPos;
                break;
            case 2:
                //wall cannot move through
                break;
            case 3:
                //enenmy
                var enemy = this.state.map[nextPos.y][nextPos.x];
                op.health = this.state.health - enemy.attack;
                enemy.health = enemy.health - this.state.attack;
                if(op.health <=0){
                    alert("You are defeated. Restart");
                    op = this.restart();
                }else{
                    if(enemy.health <= 0){
                        op.exp = this.state.exp + enemy.exp;
                        if(op.exp >= LevelupExp[this.state.level]){
                            op.level = this.state.level + 1;
                        }
                        op.map = this.moveTo(player, nextPos);
                        op.player = nextPos;
                    }else{
                        op.map = this.moveTo(player, player);
                        op.map[nextPos.y][nextPos.x].health = enemy.health;
                    }
                }
                break;
            case 4:
                //potion, drink it
                op.health = this.state.health+this.state.map[nextPos.y][nextPos.x].recover
                op.map = this.moveTo(player, nextPos);
                op.player= nextPos;
                break;
            case 5:
                //exit, go to next dungeon
                var newGameMap = allMaps[this.state.dungeon];
                op.dungeon = this.state.dungeon + 1;
                op.map = newGameMap.map;
                op.player = newGameMap.player;
                break;
            case 6:
                //weapon, pick it
                op.attack = this.state.attack + this.state.map[nextPos.y][nextPos.x].arm;
                op.weapon = this.state.map[nextPos.y][nextPos.x].level;
                op.map = this.moveTo(player, nextPos);
                op.player= nextPos;
                break;
            case 7:
                //boss
                var enemy = this.state.map[nextPos.y][nextPos.x];
                op.health = this.state.health - enemy.attack;
                enemy.health = enemy.health - this.state.attack;
                if(op.health <=0){
                    alert("You are defeated. Restart");
                    op = this.restart();
                }else{
                    if(enemy.health <= 0){
                        alert("You Win!");
                        op = this.restart();
                    }else{
                        op.map = this.moveTo(player, player);
                        op.map[nextPos.y][nextPos.x].health = enemy.health;
                    }
                }
                break;
        }
        console.log(op);
        this.setState(op);
    },

    componentDidMount() {
        window.addEventListener('keydown', this.keyPressHandler);
    },

    componentWillUnmount() {
        window.addEventListener('keydown', this.keyPressHandler);
    },

    render: function(){
        return (
            <div>
                <h2>Slaughter the boss in dungeon 4</h2>
                <div className="topbar">
                    <strong>Health:</strong><span>{this.state.health}</span>
                    <strong>Weapon:</strong><span>{this.state.weapon}</span>
                    <strong>Attack:</strong><span>{this.state.attack}</span>
                    <strong>Level:</strong><span>{this.state.level}</span>
                    <strong>Exp:</strong><span>{this.state.exp}/{LevelupExp[this.state.level]}</span>
                    <strong>Dungeon:</strong><span>{this.state.dungeon}</span>
                    <button onClick={this.toggleDarkness}>Toggle Darkness</button>
                </div>
                <div className="board"><Board tiles={this.getTilesInWindows(this.state.map,this.state.player, this.state.dark)}/></div>
            </div>
        );}
});

ReactDOM.render(<GameApp />, document.getElementById('GameApp'));