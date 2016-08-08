var recipes = {};
if(localStorage._zengzag_recipes)
{
    recipes=JSON.parse(localStorage._zengzag_recipes);
}
else
{
    recipes = {val:[{titles:'番茄炒蛋',food:['番茄','蛋','油','盐']},{titles:'番茄炒蛋',food:['番茄','蛋','油','盐']},{titles:'番茄炒蛋',food:['番茄','蛋','油','盐']}]};
}


var Modal = React.createClass({
    render: function () {
        return (
            <div id="modal">
                <div className="modal fade" id="myModal"  role="dialog"
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
                                <button type="button" className="btn btn-primary">
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
    add:function () {
        $('#myModal').modal('show');
        $('#myModalLabel').text('添加菜谱');
    },

    render: function () {
        return (
            <div id="Add">
                <button type="button" className="btn btn-default btn-success" onClick={this.add}>
                    添加
                </button>
            </div>
        );
    }
});

var RecipePanels = React.createClass({
    render: function () {
        return (
            <div id="panels">
                <PanelList recipes={recipes.val} />
            </div>
        );
    }
});

var ListGroup = React.createClass({
       render: function () {
           var foodList= this.props.list.map(function(food,index) {
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
        var Panels= this.props.recipes.map(function(recipe,index) {
            var href = '#collapse'+index;
            var id = 'collapse'+index;
            return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion"
                               href={href}>
                                {recipe.titles}
                            </a>
                        </h4>
                    </div>
                    <div id={id} className="panel-collapse collapse">
                        <div className="panel-body">
                            <ListGroup  list={recipe.food} />
                            <div id="edit">
                                <button type="button" className="btn btn-default btn-success" data-index={index}>
                                    编辑
                                </button>
                                <button type="button" className="btn btn-default btn-danger" data-index={index}>
                                    删除
                                </button>
                            </div>
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



var Main = React.createClass({

    render: function () {
        return (
            <div>
                <RecipePanels />
                <AddRecipe />
                <Modal />
            </div>
        );
    }
});
ReactDOM.render(<Main />, document.getElementById('main'));