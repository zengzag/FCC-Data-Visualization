'use strict';

console.log(localStorage._zengzag_recipes);
if (localStorage._zengzag_recipes) {
    var recipes = JSON.parse(localStorage._zengzag_recipes);
} else {
    var recipes = {
        val: [{ title: '番茄炒蛋', food: ['番茄', '蛋', '油', '盐'] }, {
            title: '麻婆豆腐',
            food: ['豆腐', '干辣椒', '猪肉', '花椒', '蒜']
        }, { title: '蜜汁烤翅', food: ['蜂蜜', '糖', '胡椒粉', '耗油'] }]
    };
}

var Modal = React.createClass({
    displayName: 'Modal',

    sub: function sub(event) {
        var num = event.target.getAttribute('data-num');
        if (num == 'add') {
            var titles = $('#inputName').val();
            var foods = $('#inputFood').val().split(',');
            var temp = { title: titles, food: foods };
            recipes.val.push(temp);
        } else {
            num = parseInt(num);
            var titles = $('#inputName').val();
            var foods = $('#inputFood').val().split(',');
            recipes.val[num].title = titles;
            recipes.val[num].food = foods;
        }
        $('#myModal').modal('hide');
        update();
    },

    render: function render() {
        return React.createElement(
            'div',
            { id: 'modal' },
            React.createElement(
                'div',
                { className: 'modal fade', id: 'myModal', role: 'dialog',
                    'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
                React.createElement(
                    'div',
                    { className: 'modal-dialog' },
                    React.createElement(
                        'div',
                        { className: 'modal-content' },
                        React.createElement(
                            'div',
                            { className: 'modal-header' },
                            React.createElement(
                                'button',
                                { type: 'button', className: 'close',
                                    'data-dismiss': 'modal', 'aria-hidden': 'true' },
                                '×'
                            ),
                            React.createElement(
                                'h4',
                                { className: 'modal-title', id: 'myModalLabel' },
                                '修改菜谱'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal-body' },
                            React.createElement('input', { type: 'text', placeholder: 'Recipe Name', id: 'inputName' }),
                            React.createElement('textarea', { rows: '5', cols: '30', placeholder: 'food', id: 'inputFood' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal-footer' },
                            React.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-default',
                                    'data-dismiss': 'modal' },
                                '关闭'
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-primary', id: 'sub', 'data-num': 'add', onClick: this.sub },
                                '提交'
                            )
                        )
                    )
                )
            )
        );
    }
});

var AddRecipe = React.createClass({
    displayName: 'AddRecipe',

    add: function add() {
        $('#myModal').modal('show');
        $('#myModalLabel').text('添加菜谱');
        $('#inputName').val('');
        $('#inputFood').val('');
        $('#sub').attr('data-num', 'add');
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { id: 'Add' },
                React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-default btn-success', onClick: this.add },
                    '添加'
                )
            ),
            React.createElement(Modal, null)
        );
    }
});

var RecipePanels = React.createClass({
    displayName: 'RecipePanels',

    render: function render() {
        return React.createElement(
            'div',
            { id: 'panels' },
            React.createElement(PanelList, { recipes: recipes.val })
        );
    }
});

var ListGroup = React.createClass({
    displayName: 'ListGroup',

    render: function render() {
        var foodList = this.props.list.map(function (food, index) {
            return React.createElement(
                'li',
                { className: 'list-group-item', key: index },
                food
            );
        });
        return React.createElement(
            'ul',
            { className: 'list-group' },
            foodList
        );
    }
});

var PanelList = React.createClass({
    displayName: 'PanelList',


    render: function render() {
        var Panels = this.props.recipes.map(function (recipe, index) {
            return React.createElement(
                'div',
                { className: 'panel panel-default', key: index },
                React.createElement(
                    'div',
                    { className: 'panel-heading' },
                    React.createElement(
                        'h4',
                        { className: 'panel-title' },
                        React.createElement(
                            'a',
                            { 'data-toggle': 'collapse', 'data-parent': '#accordion',
                                href: '#collapse' + index },
                            recipe.title
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'collapse' + index, className: 'panel-collapse collapse' },
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(ListGroup, { list: recipe.food }),
                        React.createElement(Edit, { index: index })
                    )
                )
            );
        });

        return React.createElement(
            'div',
            { className: 'panel-group', id: 'accordion' },
            Panels
        );
    }
});

var Edit = React.createClass({
    displayName: 'Edit',

    edit: function edit(event) {
        var num = parseInt(event.target.getAttribute('data-index'));
        $('#myModal').modal('show');
        var titles = recipes.val[num].title;
        $('#inputName').val(titles);
        var foods = recipes.val[num].food.join(',');
        $('#inputFood').val(foods);
        $('#myModalLabel').text('修改菜谱');
        $('#sub').attr('data-num', num);
    },
    delete: function _delete(event) {
        var num = parseInt(event.target.getAttribute('data-index'));
        recipes.val.splice(num, 1);
        update();
    },

    render: function render() {
        return React.createElement(
            'div',
            { id: 'edit' },
            React.createElement(
                'button',
                { type: 'button', className: 'btn btn-default btn-success', 'data-index': this.props.index, onClick: this.edit },
                '编辑'
            ),
            React.createElement(
                'button',
                { type: 'button', className: 'btn btn-default btn-danger', 'data-index': this.props.index, onClick: this.delete },
                '删除'
            )
        );
    }
});

function update() {
    localStorage._zengzag_recipes = JSON.stringify(recipes);
    ReactDOM.render(React.createElement(RecipePanels, null), document.getElementById('recipe'));
}

ReactDOM.render(React.createElement(AddRecipe, null), document.getElementById('buttonAdd'));
update();

//# sourceMappingURL=RecipeBox-compiled.js.map