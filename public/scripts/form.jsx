var RootElement = React.createClass({
	getInitialState: function() {
    return {
    	friends: [{name: "Aaron", username: "Jacobo"}]
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
				<h3>Friend List of {this.props.user}</h3>
				<FriendForm addFriend={this.addFriend}/>
				<FriendList friends={this.state.friends}/>
			</div>
		)
	}
});

var FriendForm = React.createClass({
	propTypes: {
		addFriend: React.PropTypes.func.isRequired
	},
	getInitialState: function(){
		return {
			name: '',
			username: ''
		}
	},
	handleNameInput: function(e){
		this.setState({
			name: e.target.value
		})
	},
	handleUsernameInput: function(e){
		this.setState({
			username: e.target.value
		})
	},
	handleFormSubmit: function(e){
		e.preventDefault()
		this.props.addFriend(
			{name: this.state.name, username: this.state.username}
		)
		this.setState({
			username: '',
			name: ''
		})
	},
	render: function(){
		return (
			<form onSubmit={this.handleFormSubmit}>
				<input 
					type="text" 
					value={this.state.name}
					placeholder="name"
					onChange={this.handleNameInput}
				/>
				<input 
					type="text"
					value={this.state.username}
					placeholder="username"
					onChange={this.handleUsernameInput}
				/>
				<input type="submit" value="Add Friend"/>
			</form>
		)
	}
});

var FriendList = React.createClass({
	propTypes: {
		friends: React.PropTypes.array.isRequired
	},
	render: function(){

		var friendList = this.props.friends.map(function(friend){
			return (
				<FriendElement friend={friend}/>
			)
		});

		return (
			<ol>
				{friendList}
			</ol>
		)
	}
});

var FriendElement = React.createClass({
	propTypes: {
		friend: React.PropTypes.object.isRequired
	},
	render: function(){
		return (
			<li>
				Name: {this.props.friend.name}
				<br />
				Username: {this.props.friend.username}
			</li>
		)
	}
})



ReactDOM.render(
	<RootElement user="Aaron"/>,
	document.getElementById('content')
)