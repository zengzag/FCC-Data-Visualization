"use strict";

var Fcc = React.createClass({
    displayName: "Fcc",

    render: function render() {
        return React.createElement(
            "div",
            { className: "FCC" },
            React.createElement(
                "a",
                { href: "https://www.freecodecamp.cn", target: "_blank" },
                React.createElement(
                    "span",
                    null,
                    "FreeCodeCamp.cn"
                )
            )
        );
    }
});

var Table = React.createClass({
    displayName: "Table",


    getInitialState: function getInitialState() {
        return { tbodyValue: [] };
    },

    getTbody: function getTbody(url) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            cache: false,
            success: function (data) {
                var Value = data;
                this.setState({ tbodyValue: Value });
            }.bind(this)
        });
    },

    render: function render() {
        return React.createElement(
            "div",
            { className: "table-box" },
            React.createElement(
                "div",
                { className: "table-head" },
                "leader board"
            ),
            React.createElement(
                "table",
                { className: "table table-striped table-bordered" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { className: "count" },
                            "count"
                        ),
                        React.createElement(
                            "th",
                            { className: "name" },
                            "Camper Name"
                        ),
                        React.createElement(
                            "th",
                            { className: "recent", onClick: this.getTbody('http://fcctop100.herokuapp.com/api/fccusers/top/recent') },
                            "Points in past 30 days"
                        ),
                        React.createElement(
                            "th",
                            { className: "all", onClick: this.getTbody() },
                            "All time points"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            { className: "count" },
                            "1"
                        ),
                        React.createElement(
                            "td",
                            { className: "name" },
                            React.createElement(
                                "a",
                                { href: "http://www.freecodecamp.com/Takumar", target: "_blank" },
                                React.createElement("img", { src: "https://avatars.githubusercontent.com/u/2951935?v=3" }),
                                React.createElement(
                                    "span",
                                    null,
                                    "Takumar"
                                )
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "recent" },
                            this.tbodyValue
                        ),
                        React.createElement(
                            "td",
                            { className: "all" },
                            "177"
                        )
                    )
                )
            )
        );
    }
});

var Begin = React.createClass({
    displayName: "Begin",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(Fcc, null),
            React.createElement(Table, null)
        );
    }
});

ReactDOM.render(React.createElement(Begin, null), document.getElementById('board'));

//# sourceMappingURL=leaderboard-compiled.js.map