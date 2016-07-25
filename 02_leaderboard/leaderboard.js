var  Fcc = React.createClass({
    render:function() {
        return (
            <div className="FCC"><a href="https://www.freecodecamp.cn" target="_blank"><span>FreeCodeCamp.cn</span></a></div>
        );
    }
});

var Table= React.createClass({

    getInitialState:function(){
        return {tbodyValue:[]};
    },

    getTbody:function (url) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            cache: false,
            success: function(data) {
                var Value = data;
                this.setState({tbodyValue: Value});
            }.bind(this)
        });
    },

    render:function() {
        return (
            <div className="table-box">
                <div className="table-head">leader board</div>
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th className="count">count</th>
                        <th className="name">Camper Name</th>
                        <th className="recent" onClick={this.getTbody('http://fcctop100.herokuapp.com/api/fccusers/top/recent')}>Points in past 30 days</th>
                        <th className="all" onClick={this.getTbody()}>All time points</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="count">1</td>
                        <td className="name">
                            <a href={"http://www.freecodecamp.com/Takumar"} target="_blank">
                                <img src='https://avatars.githubusercontent.com/u/2951935?v=3'/>
                                <span>Takumar</span>
                            </a>
                        </td>
                        <td className="recent">{this.tbodyValue}</td>
                        <td className="all">177</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});


var Begin=React.createClass({
    render:function() {
        return (<div>
            <Fcc />
            <Table />
            </div>
        );
    }
});


ReactDOM.render(<Begin/>,document.getElementById('board'));








