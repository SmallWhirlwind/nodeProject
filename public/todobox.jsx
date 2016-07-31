let style = {
    checkedTodo: {
        textDecoration: "line-through"
    },
    notCheckedTodo: {
        textDecoration: "none"
    }
    // tableContent: {
    //     border: "1px solid black"
    // }
};

var Todo = React.createClass({

    getInitialState: function () {
        return {checked: false, TodoStyle: style.notCheckedTodo};
    },
    handleChange(e) {
        this.setState({
            checked: e.target.checked
        });
        if (e.target.checked) {
            this.setState({
                TodoStyle: style.checkedTodo
            });
        } else {
            this.setState({
                TodoStyle: style.notCheckedTodo
            });
        }
    },

    // _onDelete:function() {
    //     this.props.onDelete(this.props.children);
    // },

    render: function () {
        return (
            <tr style={this.state.TodoStyle}>
                <td>
                    <input type="checkbox" checked={this.state.checked} onChange={this.handleChange}/>
                </td>
                <td >
                    {this.props.children}
                </td>
                <td >
                    <button onClick={this._onDelete}>X</button>
                </td>
            </tr>)
    }
});


var TodoList = React.createClass({

    // deleteTodo:function(id) {
    //     let newData = this.state.items.filter(function (item) {
    //         return item.id !== id;
    //     });
    //     this.setState({items: newData});
    // },

    render: function () {
        var createItem = function (item) {
            // return <li key={item.id}>{item.text}</li>;
            return <Todo key={item.id} >{item.text}</Todo>
        };
        return <div>
            <table>
                <tbody>{this.props.items.map(createItem)}</tbody>
            </table>
        </div>;
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
