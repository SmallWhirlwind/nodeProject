var App = React.createClass({
    getInitialState: function () {
        return {
            todoItems: [],
            loadItems: []
        }
    },
    componentDidMount() {
        $.get('/items', (todoItems) => {
            this.setState({todoItems: todoItems});
            this.setState({loadItems: this.state.todoItems});
        })
    },
    addTodo: function (newTodoItem) {
        $.ajax({
            type: "POST",
            url: "/items",
            contentType: 'application/json',
            data: JSON.stringify({text: newTodoItem.text, isDone: newTodoItem.isDone}),
            success: function (todoItems) {
                this.setState({todoItems: todoItems});
                this.setState({loadItems: this.state.todoItems});
            }.bind(this)
        });
    },
    delete: function (i) {
        $.ajax({
            type: "DELETE",
            url: "/items",
            contentType: 'application/json',
            data: JSON.stringify({index: i}),
            success: function (todoItems) {
                this.setState({todoItems: todoItems});
                this.setState({loadItems: this.state.todoItems});
            }.bind(this)
        });
    },

    change: function (i) {
        $.ajax({
            type: "PUT",
            url: "/items",
            contentType: 'application/json',
            data: JSON.stringify({index: i}),
            success: function (todoItems) {
                this.setState({todoItems: todoItems});
                this.setState({loadItems: this.state.todoItems});
            }.bind(this)
        });
    },

    completed: function () {
        const completed = this.state.todoItems.filter(item=>item.isDone === true);
        this.setState({loadItems: completed});
    },
    actived: function () {
        const activeItems = this.state.todoItems.filter(item=>item.isDone === false);
        this.setState({loadItems: activeItems});
    },
    all: function () {
        this.setState({loadItems: this.state.todoItems});
    },

    clearCompletedAll: function () {
        $.ajax({
            type: "DELETE",
            url: "/completedItems",
            contentType: 'application/json',
            success: function (todoItems) {
                this.setState({todoItems: todoItems}, function () {
                    this.setState({loadItems: this.state.todoItems});
                });
            }.bind(this)
        });
    },

    render: function () {
        return (
            <div id="center">
                <p id="title">todos</p>
                <TodoHeader addTodo={this.addTodo}/>
                <TodoMain todoItems={this.state.loadItems} onDelete={this.delete}
                          change={this.change}/>
                <TodoFooter todoItems={this.state.todoItems}
                            onCompleted={this.completed}
                            onActived={this.actived}
                            onAll={this.all}
                            onClearCompletedAll={this.clearCompletedAll}/>
            </div>
        )
    }
});

var TodoHeader = React.createClass({
    handlerKeyUp: function (event) {
        if (event.keyCode === 13) {
            let value = event.target.value;

            if (!value) return false;
            let newTodoItem = {
                text: value,
                isDone: false
            };
            event.target.value = "";
            this.props.addTodo(newTodoItem);
        }
    },
    render: function () {
        return (
            <div>
                <input className="form-control" onKeyUp={this.handlerKeyUp} type="text"
                       placeholder="what needs to be done ?"/>
            </div>

        )
    }
});

var TodoMain = React.createClass({
    change: function (i) {

        this.props.change(i);
    },

    delete: function (i) {
        this.props.onDelete(i);
    },

    render: function () {
        const todoItems = this.props.todoItems.map((item, i)=> {
            return <div key={i} className="input-group  inline">
                <input type="checkbox" id="distance" onClick={this.change.bind(this, i)}
                       checked={item.isDone}/>
                {item.isDone ? <s>{item.text}</s> : item.text}
                <span className="input-group-btn">
                 <button className="btn btn-danger inline" id="distance" onClick={this.delete.bind(this, i)}>
                    <span className="glyphicon glyphicon-remove"/>
                 </button>
                </span>

            </div>
        });

        return (<div>{todoItems}</div>)
    }
});
var TodoFooter = React.createClass({

    completed: function () {
        this.props.onCompleted()
    },
    actived: function () {
        this.props.onActived()
    },
    all: function () {
        this.props.onAll();
    },

    clearCompletedAll: function () {
        this.props.onClearCompletedAll();
    },
    render: function () {
        const activeItems = this.props.todoItems.filter(item=>item.isDone === false);
        return (
            <div>
                <br/>
                <button className="btn btn-default distance1">{activeItems.length}items left</button>
                <button className="btn btn-primary distance1" onClick={this.completed}>completed</button>
                <button className="btn btn-primary distance1" onClick={this.actived}>active</button>
                <button className="btn btn-primary distance1" onClick={this.all}>all</button>
                <button className="btn btn-primary distance1" onClick={this.clearCompletedAll}>clear Completed</button>

            </div>

        )
    }
});


ReactDOM.render(<App/>, document.getElementById("content"));