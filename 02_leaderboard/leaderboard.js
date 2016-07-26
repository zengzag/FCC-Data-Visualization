var Fcc = React.createClass({
    render: function () {
        return (
            <div className="FCC"><a href="https://www.freecodecamp.cn" target="_blank"><span>FreeCodeCamp.cn</span></a>
            </div>
        );
    }
});



var Table = React.createClass({
    getInitialState: function () {
        return {getValue:[]};
    },

    getTbody: function (url) {
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                var Value = [];
                for (var i in data) {
                    var userUrl = "http://www.freecodecamp.com/" +data[i].username;
                    var temp = <tr key={i}><td className="count"> {i}</td><td className="name"><a href= {userUrl}  target="_blank"><img src={data[i].img}/><span>{data[i].username}</span></a></td><td className="recent">{ data[i].recent}</td><td className="all">{ data[i].alltime }</td></tr>
                    Value.push(temp);
                }
                this.setState({getValue:Value});
            }.bind(this)
        });
    },

    recent:function () {
        this.getTbody('http://fcctop100.herokuapp.com/api/fccusers/top/recent');
    },

    alltime:function () {
        this.getTbody('http://fcctop100.herokuapp.com/api/fccusers/top/alltime');
    },

    componentWillMount:function () {
        this.recent();
    },

    render: function () {
        var Value = this.state.getValue;
        console.log(Value);
        return (
            <div className="table-box">
                <div className="table-head">leader board</div>
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th className="count">count</th>
                        <th className="name">Camper Name</th>
                        <th className="recent" onClick={this.recent}>Points in past 30 days</th>
                        <th className="all" onClick={this.alltime}>All time points</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Value}
                    </tbody>
                </table>
            </div>
        );
    }
});


var Begin = React.createClass({
    render: function () {
        return (<div>
                <Fcc />
                <Table />
            </div>
        );
    }
});


ReactDOM.render(<Begin/>, document.getElementById('board'));








