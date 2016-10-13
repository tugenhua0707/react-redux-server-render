
## React中 context的使用
#### context是在 react @ 0.14版本以后发布的一个高级且实验性的功能。
### 使用Context的原因
#### 有时候想传递数据通过组建树，但是不想给每一层级的组件手动传递属性，那么context就能帮我们 "越级" 传递数据到组件数中你想传递到的
深沉次组件。 比如： 有时候 A组件 为了 给B组件 中 的 C组件 传递一个 prop，通常的做法是 把参数在组件中传递2次才能最终将A组件中的prop
传递给C组件。
比如如下代码演示：
    import React from 'react';
    import ReactDOM from 'react-dom';
    var Button = React.createClass({
      render: function(){
        return(
          <button style={{background:this.props.color}}>
            {this.props.children}
          </button>
        )
      }
    });

    var Message = React.createClass({
      render: function(){
        return(
          <div>
            <Button color = {this.props.color}>Delete</Button>
          </div>
        ) 
      }
    }); 

    var MessageList = React.createClass({
      render: function(){
        var color = "red";
        return(
          <Message color={color} />
        )
      }
    });

    ReactDOM.render(
      <MessageList />, document.getElementById('root')
    )
### 使用context 改进数据传递
    import React, { PropTypes } from 'react';
    import ReactDOM from 'react-dom';
    var Button = React.createClass({
      // 指定context的数据类型
      contextTypes: {
        color: PropTypes.string
      },
      render: function(){
        return (
          <button style={{background: this.context.color}}>
            {this.props.children}
          </button>
        )
      }
    });

    var Message = React.createClass({
      render: function(){
        return (
          <div>
            <Button>Delete2</Button>
          </div>
        )
      }
    });

    var MessageList = React.createClass({

      childContextTypes: {
        color: PropTypes.string
      },
      getChildContext: function(){
        return {color: "green"};
      },
      render: function(){
        return (
          <div><Message /></div>
        )
      }
    });

    ReactDOM.render(
      <MessageList />, document.getElementById('root')
    )
#### 上面的MessageList组件是父级组件：指定数据并要将数据传递下去的父组件要定义 childContextTypes 和 getChildContext() ；想要接收到数据的
子组件 必须定义 contextTypes 来使用传递过来的 context 。
