'use strict';

var recipes = {};
if (localStorage._zengzag_recipes) {
    recipes = JSON.parse(localStorage._zengzag_recipes);
} else {
    recipes = { val: [{ titles: '番茄炒蛋', food: ['番茄', '蛋', '油', '盐'] }, { titles: '番茄炒蛋', food: ['番茄', '蛋', '油', '盐'] }, { titles: '番茄炒蛋', food: ['番茄', '蛋', '油', '盐'] }] };
}

var Modal = React.createClass({
    displayName: 'Modal',

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
                                { type: 'button', className: 'btn btn-primary' },
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
    },

    render: function render() {
        return React.createElement(
            'div',
            { id: 'Add' },
            React.createElement(
                'button',
                { type: 'button', className: 'btn btn-default btn-success', onClick: this.add },
                '添加'
            )
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
            var href = '#collapse' + index;
            var id = 'collapse' + index;
            return React.createElement(
                'div',
                { className: 'panel panel-default' },
                React.createElement(
                    'div',
                    { className: 'panel-heading' },
                    React.createElement(
                        'h4',
                        { className: 'panel-title' },
                        React.createElement(
                            'a',
                            { 'data-toggle': 'collapse', 'data-parent': '#accordion',
                                href: href },
                            recipe.titles
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { id: id, className: 'panel-collapse collapse' },
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(ListGroup, { list: recipe.food }),
                        React.createElement(
                            'div',
                            { id: 'edit' },
                            React.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-default btn-success', 'data-index': index },
                                '编辑'
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-default btn-danger', 'data-index': index },
                                '删除'
                            )
                        )
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

var Main = React.createClass({
    displayName: 'Main',


    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(RecipePanels, null),
            React.createElement(AddRecipe, null),
            React.createElement(Modal, null)
        );
    }
});
ReactDOM.render(React.createElement(Main, null), document.getElementById('main'));

//# sourceMappingURL=RecipeBox-compiled.js.map