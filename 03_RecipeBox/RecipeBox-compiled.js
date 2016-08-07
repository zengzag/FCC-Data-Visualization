"use strict";

var Modal = React.createclassName({
    render: function render() {
        return React.createElement(
            "div",
            { id: "modal" },
            React.createElement(
                "div",
                { className: "modal fade", id: "myModal", tabindex: "-1", role: "dialog",
                    "aria-labelledby": "myModalLabel", "aria-hidden": "true" },
                React.createElement(
                    "div",
                    { className: "modal-dialog" },
                    React.createElement(
                        "div",
                        { className: "modal-content" },
                        React.createElement(
                            "div",
                            { className: "modal-header" },
                            React.createElement(
                                "button",
                                { type: "button", className: "close",
                                    "data-dismiss": "modal", "aria-hidden": "true" },
                                "×"
                            ),
                            React.createElement(
                                "h4",
                                { className: "modal-title", id: "myModalLabel" },
                                "模态框（Modal）标题"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "modal-body" },
                            React.createElement(Input, { type: "text", placeholder: "Recipe Name", id: "name" }),
                            React.createElement("textarea", { rows: "5", cols: "30", placeholder: "food", id: "food" })
                        ),
                        React.createElement(
                            "div",
                            { className: "modal-footer" },
                            React.createElement(
                                "button",
                                { type: "button", className: "btn btn-default",
                                    "data-dismiss": "modal" },
                                "关闭"
                            ),
                            React.createElement(
                                "button",
                                { type: "button", className: "btn btn-primary" },
                                "提交更改"
                            )
                        )
                    )
                )
            )
        );
    }
});

var AddRecipe = React.createClass({
    displayName: "AddRecipe",

    render: function render() {
        return React.createElement(
            "div",
            { id: "Add" },
            React.createElement(
                "button",
                { type: "button", className: "btn btn-default btn-success" },
                "添加"
            )
        );
    }
});

var RecipePanels = React.createClass({
    displayName: "RecipePanels",

    render: function render() {
        return React.createElement(
            "div",
            { id: "panels" },
            React.createElement(
                "div",
                { "class": "panel-group", id: "accordion" },
                React.createElement(
                    "div",
                    { "class": "panel panel-default" },
                    React.createElement(
                        "div",
                        { "class": "panel-heading" },
                        React.createElement(
                            "h4",
                            { "class": "panel-title" },
                            React.createElement(
                                "a",
                                { "data-toggle": "collapse", "data-parent": "#accordion",
                                    href: "#collapseOne" },
                                "菜单一"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { id: "collapseOne", "class": "panel-collapse collapse" },
                        React.createElement(
                            "div",
                            { "class": "panel-body" },
                            React.createElement(
                                "ul",
                                { "class": "list-group" },
                                React.createElement(
                                    "li",
                                    { "class": "list-group-item" },
                                    "Nihil anim keffiyeh helvetica"
                                ),
                                React.createElement(
                                    "li",
                                    { "class": "list-group-item" },
                                    "labore Window"
                                ),
                                React.createElement(
                                    "li",
                                    { "class": "list-group-item" },
                                    "sapiente"
                                ),
                                React.createElement(
                                    "li",
                                    { "class": "list-group-item" },
                                    "anderson"
                                ),
                                React.createElement(
                                    "li",
                                    { "class": "list-group-item" },
                                    "helvetica"
                                )
                            ),
                            React.createElement(
                                "div",
                                { id: "edit" },
                                React.createElement(
                                    "button",
                                    { type: "button", "class": "btn btn-default btn-success" },
                                    "编辑"
                                ),
                                React.createElement(
                                    "button",
                                    { type: "button", "class": "btn btn-default btn-danger" },
                                    "删除"
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});

//# sourceMappingURL=RecipeBox-compiled.js.map