/**
 * Created by zengz on 2016/8/9.
 */
var grid = [];//地图，存储每个元素的状态
var speed = 100;//速度，毫秒
var gridWidth = 50;//地图宽
var gridHeight = 30;//地图高
var generation = 0;

var GridSquare = React.createClass({
    //地图组件
    render: function () {
        var gridSquare = this.props.grids.map(function (state, index) {
            return (
                <div className={state} key={index} id={index}></div>
            );
        });
        return (
            <div className="grid" id="grid" style={{width:this.props.width,height:this.props.height}}>
                {gridSquare}
            </div>
        );
    }
});

function updateGrid() {
    //根据grid刷新地图
    ReactDOM.render(<GridSquare grids={grid} width={gridWidth*15+'px'} height={gridHeight*15+'px'} />, document.getElementById('container'));
}

function randomGrid() {
    //生成随机的地图grid
    for (var i = 0;i<gridHeight;i++){
        for (var j=0;j<gridWidth;j++){
            var temp = Math.random();
            var index = i*gridWidth + j;
            if(temp>0.8){
                grid[index]='live';
            }else{
                grid[index]='dead';
            }
        }
    }
}

function nextGrid() {
    var num = gridWidth*gridHeight;//方格总数
    var countGrid=[];//计数的方格
    for (var index = 0;index<num;index++){
        var i = Math.floor(num/gridWidth);//第i行
        var j = num%gridWidth;//第j列
        
    }
}

function countCell(i,j) {
    var count = 0;

    if((i-1)>=0 && (j-1)>=0) {
        var index = (i - 1) * gridWidth + (j - 1);
        if (grid[index] != 'dead') {
            count++;
        }
    }
}

$(document).ready(function() {
    randomGrid();
    updateGrid();
});
