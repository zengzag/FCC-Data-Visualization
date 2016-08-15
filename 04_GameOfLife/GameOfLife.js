/**
 * Created by zengz on 2016/8/9.
 */
var grid = [];//地图，存储每个元素的状态
var speed = 100;//速度，毫秒
var gridWidth = 50;//地图宽（列）
var gridHeight = 30;//地图高（行）
var generation = 0;//运行世代数
var canIteration = false;//是否允许迭代，用来实现暂停、停止功能

var GridSquare = React.createClass({
    //地图组件
    getInitialState: function () {
        return {gridSquare: grid};
    },
    cellClick: function (event) {
        //点击方格修改状态
        var index = event.target.id;
        var state = event.target.className;
        if (state == 'dead') {
            grid[index] = 'live';
            this.setState({gridSquare: grid});
        } else {
            grid[index] = 'dead';
            this.setState({gridSquare: grid});
        }
    },

    render: function () {
        var gridSquare = this.state.gridSquare.map(function (state, index) {
            return (
                <div className={state} key={index} id={index}></div>
            );
        });
        return (
            <div className="grid" id="grid" style={{width:gridWidth*15+'px',height:gridHeight*15+'px'}}
                 onClick={this.cellClick}>
                {gridSquare}
            </div>
        );
    }
});

function updateGrid() {
    //刷新地图
    $('#generation').text(generation);
    ReactDOM.render(<GridSquare />, document.getElementById('container'));
}

function randomGrid() {
    //生成随机的地图grid
    for (var i = 0; i < gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            var temp = Math.random();
            var index = i * gridWidth + j;
            if (temp > 0.9) {
                //系数，控制随机点的个数
                grid[index] = 'live';
            } else {
                grid[index] = 'dead';
            }
        }
    }
}

function nextGrid() {
    generation++;//每次计算下一次Grid就意味着代数加一
    var num = gridWidth * gridHeight;//方格总数
    var countList = [];//每个方格周围活的个数，存入list中
    var countDead = 0;//计算死亡的数量，判断是否全部死亡，停止迭代。
    for (var index = 0; index < num; index++) {
        var i = Math.floor(index / gridWidth);//第i行
        var j = index % gridWidth;//第j列
        countList[index] = countCell(i, j);
    }
    for (index = 0; index < num; index++) {
        var count = countList[index];//根据countList来修改grid，避免直接修改引起冲突
        if (count < 2) {
            grid[index] = 'dead';
            countDead++;
        }//小于2个时死亡
        else {
            if ((count == 2 || count == 3) && (grid[index] != 'dead')) {
                grid[index] = 'stay';
            }//2、3个时活的保持
            else {
                if (count == 3 && grid[index] == 'dead') {
                    grid[index] = 'live';
                }//3个时死的活
                else {
                    grid[index] = 'dead';
                    countDead++;
                }
            }
        }
    }
    if (countDead >= num) {
        updateGrid();
        alert('进行了' + generation + '次迭代后灭绝');
        $('#clear').click();
    }
}

function countCell(i, j) {
    //i是行，j是列
    var count = 0;
    var index = 0;
    if (i < 0 || j < 0 || j >= gridWidth || i >= gridHeight) {
        console.log('countCell,i j有误');
    }//判断i，j是否正确，调试用。
    if ((i - 1) >= 0 && (j - 1) >= 0) {
        index = (i - 1) * gridWidth + (j - 1);
        if (grid[index] != 'dead') {
            count++;
        }
    }//-1,-1
    if ((i - 1) >= 0) {
        index = (i - 1) * gridWidth + (j);
        if (grid[index] != 'dead') {
            count++;
        }
    }//-1,0
    if ((i - 1) >= 0 && (j + 1) < gridWidth) {
        index = (i - 1) * gridWidth + (j + 1);
        if (grid[index] != 'dead') {
            count++;
        }
    }//-1,+1
    if ((j - 1) >= 0) {
        index = (i) * gridWidth + (j - 1);
        if (grid[index] != 'dead') {
            count++;
        }
    }//0,-1
    if ((j + 1) < gridWidth) {
        index = (i) * gridWidth + (j + 1);
        if (grid[index] != 'dead') {
            count++;
        }
    }//0,+1
    if ((i + 1) < gridHeight && (j - 1) >= 0) {
        index = (i + 1) * gridWidth + (j - 1);
        if (grid[index] != 'dead') {
            count++;
        }
    }//+1,-1
    if ((i + 1) < gridHeight) {
        index = (i + 1) * gridWidth + (j);
        if (grid[index] != 'dead') {
            count++;
        }
    }//+1,0
    if ((i + 1) < gridHeight && (j + 1) < gridWidth) {
        index = (i + 1) * gridWidth + (j + 1);
        if (grid[index] != 'dead') {
            count++;
        }
    }//+1,+1
    return count;
}

function iteration() {
    //迭代运行
    if (canIteration) {
        setTimeout(function () {
            nextGrid();
            updateGrid();
            iteration();
        }, speed);
    }
}

$('#run').click(function () {
    $('#pause').removeClass('active');
    $('#run').addClass('active');
    canIteration = true;//允许迭代
    iteration();
});

$('#pause').click(function () {
    $('#run').removeClass('active');
    $('#pause').addClass('active');
    canIteration = false;//停止迭代

});

$('#clear').click(function () {
    //将每个元素设置为死亡，代数清零
    canIteration = false;//停止迭代
    setTimeout(function () {
        grid.splice(0);
        var num = gridHeight * gridWidth;
        for (var index = 0; index < num; index++) {
            grid[index] = 'dead';
        }
        generation = 0;
        updateGrid();
    }, speed);//最后一次迭代运行后再执行清零
});

$('#random').click(function () {
    $('#clear').click();
    setTimeout(function () {
        randomGrid();
        updateGrid();
        $('#pause').click();
    }, speed);
});

$('#fast').click(function () {
    $('#medium').removeClass('active');
    $('#slow').removeClass('active');
    $('#fast').addClass('active');
    speed = 50;//设置速度50ms
});

$('#medium').click(function () {
    $('#fast').removeClass('active');
    $('#slow').removeClass('active');
    $('#medium').addClass('active');
    speed = 100;//设置速度100ms
});

$('#slow').click(function () {
    $('#fast').removeClass('active');
    $('#medium').removeClass('active');
    $('#slow').addClass('active');
    speed = 300;//设置速度300ms
});

$('#size50').click(function () {
    $('#size70').removeClass('active');
    $('#size100').removeClass('active');
    $('#size50').addClass('active');
    canIteration = false;//停止迭代
    setTimeout(function () {
        gridWidth = 50;//地图宽（列）
        gridHeight = 30;//地图高（行）
        $('#random').click();
    }, speed);
});


$('#size70').click(function () {
    $('#size50').removeClass('active');
    $('#size100').removeClass('active');
    $('#size70').addClass('active');
    canIteration = false;//停止迭代
    setTimeout(function () {
        gridWidth = 70;//地图宽（列）
        gridHeight = 40;//地图高（行）
        $('#random').click();
    }, speed);
});

$('#size100').click(function () {
    $('#size50').removeClass('active');
    $('#size70').removeClass('active');
    $('#size100').addClass('active');
    canIteration = false;//停止迭代
    setTimeout(function () {
        gridWidth = 100;//地图宽（列）
        gridHeight = 60;//地图高（行）
        $('#random').click();
    }, speed);
});

$(document).ready(function () {
    $('#random').click();
});
