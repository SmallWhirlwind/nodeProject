var App = React.createClass({
    getInitialState: function () {
        return {
            todoItems: []
        }
    },
    addTodo: function (newTodoItem) {
        const todoItems = this.state.todoItems;
        todoItems.push(newTodoItem);
        // this.allChecked();
        this.setState(todoItems);
        console.log(todoItems);
    },
    changeTodoState:function(index, isDone, isChangeAll=false){
        if(isChangeAll){
            this.setState({
                todoItems: this.state.todoItems.map((todo) => {
                    todo.isDone = isDone;
                    return todo;
                }),
                isAllChecked: isDone
            })
        }else{
            this.state.todoItems[index].isDone = isDone;
            this.allChecked();
        }
        // this.db.set('todos', this.state.todos);
        this.setState(this.state.todoItems);
    },

    allChecked:function(){
        let isAllChecked = false;
        if(this.state.todoItems.every((todo)=> todo.isDone)){
            isAllChecked = true;
        }
        this.setState({todoItems: this.state.todoItems, isAllChecked});
    },
    // 清除已完成的任务，传递给Footer组件的方法
    clearDone:function(){
        let todos = this.state.todoItems.filter(todo => !todo.isDone);
        this.setState({
            todoItems: todos,
            isAllChecked: false
        });
        // this.db.set('todos', todos);
        this.setState(this.state.todoItems);
    },

    // 删除当前的任务，传递给TodoItem的方法
    deleteTodo:function(index){
        this.state.todoItems.splice(index, 1);
        // this.setState({todos: this.state.todos});
        this.setState(this.state.todoItems);
        // this.db.set('todos', this.state.todos);
    },

    render: function () {
        return (
            <div>
                <TodoHeader addTodo={this.addTodo}/>
                <TodoMain deleteTodo={this.deleteTodo} todoItems={this.state.todoItems}
                          changeTodoState={this.changeTodoState}/>

                <TodoFooter isAllChecked={this.state.isAllChecked}
                            clearDone={this.clearDone} {...this.props}
                            changeTodoState={this.changeTodoState}/>
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
                <input onKeyUp={this.handlerKeyUp} type="text" placeholder="what's your task ?"/>
            </div>

        )
    }
});

var TodoMain = React.createClass({
    render: function () {
        return (
            <div>
                <ul>
                    {this.props.todoItems.map((todo, index) => {
                        return <TodoItem key={index} {...todo} index={index} {...this.props}/>
                    })}
                </ul>
            </div>

        )
    }
});


var TodoItem = React.createClass({
// 处理任务是否完成状态
    handlerChange: function () {
        let isDone = !this.props.isDone;
        this.props.changeTodoState(this.props.index, isDone);
    },

// 鼠标移入
    handlerMouseOver: function () {
        React.findDOMNode(this.refs.deleteBtn).style.display = "inline";
    },

// 鼠标移出
    handlerMouseOut: function () {
        React.findDOMNode(this.refs.deleteBtn).style.display = "none";
    },

// 删除当前任务
    handlerDelete: function () {
        this.props.deleteTodo(this.props.index);
    },


    render: function () {
        return (
            <div>

                <li
                    onMouseOver={this.handlerMouseOver}
                    onMouseOut={this.handlerMouseOut}
                >
                    <input type="checkbox" checked={this.props.isDone} onChange={this.handlerChange.bind(this)}/>
                    <span>{this.props.text}</span>
                    <button ref="deleteBtn" onClick={this.handlerDelete.bind(this)}>删除</button>
                </li>

            </div>

        )
    }
});

var TodoFooter = React.createClass({

    // 处理全选与全不选的状态
    handlerAllState:function(event){
        this.props.changeTodoState(null, event.target.checked, true);
    },

    // 绑定点击事件，清除已完成
    handlerClick:function(){
        this.props.clearDone();
    },
    render: function () {
        return (
        <div>
            <input checked={this.props.isAllChecked} onChange={this.handlerAllState.bind(this)} type="checkbox"/>
            <span >{this.props.todoDoneCount}已完成 / {this.props.todoCount}总数</span>
            <button onClick={this.handlerClick.bind(this)}>清除已完成</button>

        </div>

        )
    }
});

ReactDOM.render(<App/>, document.getElementById("content"));