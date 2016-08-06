var App = React.createClass({

    getInitialState: function () {
        return {
            itemsTodo: []
        }
    },
    addTodo: function (newTodoItem) {
        const itemsTodo = this.state.itemsTodo;
        itemsTodo.push(newTodoItem);
        this.setState(itemsTodo);
        console.log(itemsTodo);
    },
    render: function () {
        return (
            <div>
                <TodoHeader addTodo={this.addTodo}/>
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
                <input onKeyUp={this.handlerKeyUp.bind(this)} type="text" placeholder="what's your task ?"/>
            </div>

        )
    }
});

ReactDOM.render(<App/>, document.getElementById("content"));