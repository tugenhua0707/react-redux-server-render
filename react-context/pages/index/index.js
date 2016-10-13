
/*
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
*/
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
