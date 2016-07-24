var App = React.createClass({
	render: function(){
		return(
			<ToDoList />
		)
	}
});

var ToDoList = React.createClass({
	getInitialState: function() {
	    return {
	    	newItem: '',
	    	items: ["Hello", "Yes"],
	    	user: "Aaron"
	    };
	},
	addItem: function(item){
		this.setState({
			items: this.state.items.concat([item])
		});
	},
	deleteItem: function(item){
		this.state.items.splice(this.state.items.indexOf(item), 1)
		this.setState({
			items: this.state.items
		});
	},
	handleChange: function(e){
		this.setState({
			newItem: e.target.value
		});
	},
	handleSubmit: function(e){
    e.preventDefault();
		this.addItem(this.state.newItem);
		this.setState({
			newItem: ''
		})
	},
	render: function(){
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input 
						type="text"
						placeholder="item"
						value={this.state.newItem}
						onChange={this.handleChange}
					/>
					<input type="submit" value="Add Item"/>
				</form>
				<ToDoItems items={this.state.items} deleteItem={this.deleteItem}/>
			</div>
		)
	}
});

var ToDoItems = React.createClass({
	propTypes: {
		items: React.PropTypes.array.isRequired  
	},
	render: function(){
		var that = this;
		var toDoElements = this.props.items.map(function(item, key){
			return (
				<div key={key}>
					<Item item={item}/>
					<button onClick={that.props.deleteItem.bind(null, item)}>Remove</button>
				</div>
			)
		});

		return (
			<ul>
				{toDoElements}
			</ul>
		)
	}
});

var Item = React.createClass({
	render: function(){
		return(
			<li>
				{this.props.item}
			</li>
		)
	}
})





ReactDOM.render(<App />, document.getElementById('content'))