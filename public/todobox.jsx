

var TodoList = React.createClass({
    render: function () {
        var createItem = function (item) {
            return <li key={item.id}>{item.text}</li>;
        };
        return <div>{this.props.items.map(createItem)}</div>;
    }
});


var Input = React.createClass({
    getInitialState: function () {
        return {items: [], text: ''};
    },
    onChange: function (e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
        var nextText = '';
        this.setState({items: nextItems, text: nextText});
    },
    render: function () {
        return (
            <div className="input-group">

                <form onSubmit={this.handleSubmit}>
                    <input placeholder="What needs to be done?"
                           onChange={this.onChange}
                           value={this.state.text}/>
                </form>
                <TodoList items={this.state.items}/>
                {/*<Todooperation  items={this.state.items}/>*/}
                <button>{(this.state.items.length) + " items left"}</button>
                <button>all</button>
            </div>
        );
    }
});


ReactDOM.render(<Input />, document.getElementById("container"));
