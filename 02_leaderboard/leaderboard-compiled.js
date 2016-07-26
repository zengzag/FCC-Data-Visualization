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
        return { getValue: [] };
    },

    getTbody: function getTbody(url) {
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                var Value = [];
                for (var i in data) {
                    var userUrl = "http://www.freecodecamp.com/" + data[i].username;
                    var temp = React.createElement(
                        "tr",
                        { key: i },
                        React.createElement(
                            "td",
                            { className: "count" },
                            " ",
                            i
                        ),
                        React.createElement(
                            "td",
                            { className: "name" },
                            React.createElement(
                                "a",
                                { href: userUrl, target: "_blank" },
                                React.createElement("img", { src: data[i].img }),
                                React.createElement(
                                    "span",
                                    null,
                                    data[i].username
                                )
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "recent" },
                            data[i].recent
                        ),
                        React.createElement(
                            "td",
                            { className: "all" },
                            data[i].alltime
                        )
                    );
                    Value.push(temp);
                }
                this.setState({ getValue: Value });
            }.bind(this)
        });
    },

    recent: function recent() {
        this.getTbody('http://fcctop100.herokuapp.com/api/fccusers/top/recent');
    },

    alltime: function alltime() {
        this.getTbody('http://fcctop100.herokuapp.com/api/fccusers/top/alltime');
    },

    componentWillMount: function componentWillMount() {
        this.recent();
    },

    render: function render() {
        var Value = this.state.getValue;
        console.log(Value);
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
                            { className: "recent", onClick: this.recent },
                            "Points in past 30 days"
                        ),
                        React.createElement(
                            "th",
                            { className: "all", onClick: this.alltime },
                            "All time points"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    Value
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