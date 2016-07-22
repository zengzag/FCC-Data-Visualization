var Begin = React.createClass({
   getInitialState:function(){
       return {textValue:'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](http://freecodecamp.com/hermanfassett)*'};
   },
    textChange:function () {
        this.setState({textValue:this.refs.text.value});
    },
    getMark:function () {
        return marked(this.state.textValue);
    },
    componentDidMount:function () {
        var marke=this.getMark();
        this.refs.mark.innerHTML=marke;
    },
    componentDidUpdate:function () {
        var marke=this.getMark();
        this.refs.mark.innerHTML=marke;
    },
    render:function () {
        var value = this.state.textValue;
        return (
            <div className="box" id="box">
                <textarea type="text" rows="16" ref="text" onChange={this.textChange}>{value}</textarea>
                <div ref="mark"></div>
            </div>
        )
    }
}); 

ReactDOM.render(<Begin/>,document.getElementById('mark'));