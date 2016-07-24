var RootElement = React.createClass({
	getInitialState: function(){
		return {
			friends: [{first_name: "Aaron", last_name: "Jac", username: "amj"}]
		};
	},
	addFriend: function(friend){
		this.setState({
			friends: this.state.friends.concat([friend])
		});
	},
	render: function(){
		return (
			<div>
				<h3>Friends List</h3>
				<AddFriendForm addFriend={this.addFriend}/>
				<FriendList friends={this.state.friends}/>
			</div>
		)
	}
});


var AddFriendForm = React.createClass({
	propTypes: {
		addFriend: React.PropTypes.func.isRequired
	},
	getInitialState: function(){
		return {
			first_name: '',
			last_name: '',
			username: '',
		}
	},
	handleFirstNameChange: function(e){
		this.setState({
			first_name: e.target.value
		})
	},
	handleLastNameChange: function(e){
		this.setState({
			last_name: e.target.value
		})
	},
	handleUsernameChange: function(e){
		this.setState({
			username: e.target.value
		})
	},
	handleSubmit: function(e){
		e.preventDefault();
		this.props.addFriend({
			first_name: this.state.first_name, 
			last_name: this.state.last_name, 
			username: this.state.username
		});
		this.setState({
			first_name: '',
			last_name: '',
			username: ''	
		})
	},
	render: function(){
		return (
			<form onSubmit={this.handleSubmit}>
				<input 
					type="text" 
					value={this.state.first_name} 
					onChange={this.handleFirstNameChange}
					placeholder="first name"
				/>
				<input 
					type="text" 
					value={this.state.last_name} 
					onChange={this.handleLastNameChange}
					placeholder="last name"
				/>
				<input 
					type="text" 
					value={this.state.username} 
					onChange={this.handleUsernameChange}
					placeholder="username"
				/>
				<input type="submit" value="Add Friend" />
			</form>
		)
	}
});

var FriendList = React.createClass({
	propTypes: {
		friends: React.PropTypes.array.isRequired
	},
	render: function(){

		var listItems = this.props.friends.map(function(friend){
			return (
				<FriendElement friend={friend}/>
			)
		});

		return (
			<ul>
				{listItems}
			</ul>
		)
	}
})

var FriendElement = React.createClass({
	propTypes: {
		friend: React.PropTypes.object.isRequired
	},
	render: function(){
		return (
			<li>
				First Name: {this.props.friend.first_name}
				<br />
				Last Name: {this.props.friend.last_name}
				<br />
				Username: {this.props.friend.username}
				<br />
			</li>
		)
	}
})


ReactDOM.render(<RootElement />, document.getElementById('content'))
