var Modal = React.createclassName({
    render: function () {
        return (
            <div id="modal">
                <div className="modal fade" id="myModal" tabindex="-1" role="dialog"
                     aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close"
                                        data-dismiss="modal" aria-hidden="true">
                                    &times;
                                </button>
                                <h4 className="modal-title" id="myModalLabel">
                                    模态框（Modal）标题
                                </h4>
                            </div>
                            <div className="modal-body">
                                <Input type="text" placeholder="Recipe Name" id="name"/>
                                <textarea rows="5" cols="30" placeholder="food" id="food"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default"
                                        data-dismiss="modal">关闭
                                </button>
                                <button type="button" className="btn btn-primary">
                                    提交更改
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
    render: function () {
        return (
            <div id="Add">
                <button type="button" className="btn btn-default btn-success">
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
                <div class="panel-group" id="accordion">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion"
                                   href="#collapseOne">
                                    菜单一
                                </a>
                            </h4>
                        </div>
                        <div id="collapseOne" class="panel-collapse collapse">
                            <div class="panel-body">
                                <ul class="list-group">
                                    <li class="list-group-item">Nihil anim keffiyeh helvetica</li>
                                    <li class="list-group-item">labore Window</li>
                                    <li class="list-group-item">sapiente</li>
                                    <li class="list-group-item">anderson</li>
                                    <li class="list-group-item">helvetica</li>
                                </ul>
                                <div id="edit">
                                    <button type="button" class="btn btn-default btn-success">
                                        编辑
                                    </button>
                                    <button type="button" class="btn btn-default btn-danger">
                                        删除
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});