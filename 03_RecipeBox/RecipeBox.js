console.log(localStorage._zengzag_recipes);
if (localStorage._zengzag_recipes) {
    var recipes = JSON.parse(localStorage._zengzag_recipes);
}
else {
    var recipes = {
        val: [{title: '番茄炒蛋', food: ['番茄', '蛋', '油', '盐']}, {
            title: '麻婆豆腐',
            food: ['豆腐', '干辣椒', '猪肉', '花椒','蒜']
        }, {title: '蜜汁烤翅', food: ['蜂蜜', '糖', '胡椒粉', '耗油']}]
    };
}

var Modal = React.createClass({
    sub:function (event) {
        var num = event.target.getAttribute('data-num');
        if (num == 'add'){
            var titles = $('#inputName').val();
            var foods =$('#inputFood').val().split(',');
            var temp = {title: titles, food:foods};
            recipes.val.push(temp);
        }else{
            num = parseInt(num);
            var titles = $('#inputName').val();
            var foods =$('#inputFood').val().split(',');
            recipes.val[num].title=titles;
            recipes.val[num].food=foods;
        }
        $('#myModal').modal('hide');
        update();
    },

    render: function () {
        return (
            <div id="modal">
                <div className="modal fade" id="myModal" role="dialog"
                     aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close"
                                        data-dismiss="modal" aria-hidden="true">
                                    &times;
                                </button>
                                <h4 className="modal-title" id="myModalLabel">
                                    修改菜谱
                                </h4>
                            </div>
                            <div className="modal-body">
                                <input type="text" placeholder="Recipe Name" id="inputName"/>
                                <textarea rows="5" cols="30" placeholder="food" id="inputFood"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default"
                                        data-dismiss="modal">关闭
                                </button>
                                <button type="button" className="btn btn-primary" id="sub" data-num="add" onClick={this.sub}>
                                    提交
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var AddRecipe = React.createClass({
    add: function () {
        $('#myModal').modal('show');
        $('#myModalLabel').text('添加菜谱');
        $('#inputName').val('');
        $('#inputFood').val('');
        $('#sub').attr('data-num','add');
    },

    render: function () {
        return (
            <div>
                <div id="Add">
                    <button type="button" className="btn btn-default btn-success" onClick={this.add}>
                        添加
                    </button>
                </div>
                <Modal />
            </div>
        );
    }
});

var RecipePanels = React.createClass({
    render: function () {
        return (
            <div id="panels">
                <PanelList recipes={recipes.val}/>
            </div>
        );
    }
});

var ListGroup = React.createClass({
    render: function () {
        var foodList = this.props.list.map(function (food, index) {
            return (
                <li className="list-group-item" key={index}>{food}</li>
            );
        });
        return (
            <ul className="list-group">
                {foodList}
            </ul>
        );
    }
});

var PanelList = React.createClass({

    render: function () {
        var Panels = this.props.recipes.map(function (recipe, index) {
            return (
                <div className="panel panel-default" key={index}>
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion"
                               href={'#collapse'+index}>
                                {recipe.title}
                            </a>
                        </h4>
                    </div>
                    <div id={'collapse'+index} className="panel-collapse collapse">
                        <div className="panel-body">
                            <ListGroup list={recipe.food}/>
                            <Edit index={index} />
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="panel-group" id="accordion">
                {Panels}
            </div>
        );
    }
});

var Edit = React.createClass({
    edit:function (event) {
        var num = parseInt(event.target.getAttribute('data-index'));
        $('#myModal').modal('show');
        var titles = recipes.val[num].title;
        $('#inputName').val(titles);
        var foods =recipes.val[num].food.join(',');
        $('#inputFood').val(foods);
        $('#myModalLabel').text('修改菜谱');
        $('#sub').attr('data-num',num);
    },
    delete:function (event) {
        var num = parseInt(event.target.getAttribute('data-index'));
        recipes.val.splice(num,1);
        update();
    },

    render: function () {
        return (
            <div id="edit">
                <button type="button" className="btn btn-default btn-success" data-index={this.props.index} onClick={this.edit}>
                    编辑
                </button>
                <button type="button" className="btn btn-default btn-danger" data-index={this.props.index} onClick={this.delete}>
                    删除
                </button>
            </div>
        );
    }
});

function update() {
    localStorage._zengzag_recipes=JSON.stringify(recipes);
    ReactDOM.render(<RecipePanels />, document.getElementById('recipe'));
}

ReactDOM.render(<AddRecipe />, document.getElementById('buttonAdd'));
update();