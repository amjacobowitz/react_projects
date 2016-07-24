var Game = React.createClass({
	getInitialState: function(){
		return {
			gameBoard: [
										['-', '-', '-'],
										['-', '-', '-'],
										['-', '-', '-']
								],
			turn: -1,
			gameResult: '',
			gameLog: [0,0]
		}
	},
	handleSelection: function(selectedRow, selectedTile){

		function flip(rows){
			return rows[0].map(function(_, i){
				return rows.map(function(row){
					return row[i]
				})
			})
		}

		if (this.state.turn === -1){
			var tileDisplay = 'X'
		} else {
			var tileDisplay = 'O'
		}
		this.state.gameBoard[selectedRow].splice(selectedTile, 1, tileDisplay)
		this.setState({
			gameBoard: this.state.gameBoard
		})

		if (this.checkDraw(this.state.gameBoard) === false){
			this.setState({
				gameResult: 'Cat\'s Game' 
			})
		}

		var flippedGameBoard = flip(this.state.gameBoard)

		var diagOne = [this.state.gameBoard[0][0], this.state.gameBoard[1][1], this.state.gameBoard[2][2]]
		var diagTwo = [this.state.gameBoard[0][2], this.state.gameBoard[1][1], this.state.gameBoard[2][0]]

		var diags = [diagOne,diagTwo]


		if (this.checkRow(this.state.gameBoard) === 0 || this.checkRow(flippedGameBoard) === 0 || this.checkRow(diags) === 0){

			this.setState({
				gameResult: 'X'
			});
			this.updateGameLog('X');

		} else if (this.checkRow(this.state.gameBoard) === 1 || this.checkRow(flippedGameBoard) === 1 || this.checkRow(diags) === 1){

			this.setState({
				gameResult: 'O'
			});
			this.updateGameLog('O');

		}

		this.updateTurn()

	},

	checkRow: function(gameBoard){

		for (var i = 0; i  < gameBoard.length; i++){

			var xCount = 0;
			var oCount = 0;

			for (var j = 0; j < gameBoard[i].length; j++){
				if (gameBoard[i][j] === 'X') {
					xCount += 1;
					if (xCount === 3){
						return 0
					}
				} else if (gameBoard[i][j] === 'O'){
					oCount += 1;
					if (oCount === 3){
						return 1
					}
				}

			}
		}

		return false;
	},

	checkDraw: function(gameBoard){

		var gamePositions = [];

		for (var i = 0; i  < gameBoard.length; i++){
			for (var j = 0; j < gameBoard[i].length; j++){
				gamePositions.push(gameBoard[i][j])
			}
		}
		
		return gamePositions.includes('-')

	},

	updateTurn: function(){
		this.setState({
			turn: this.state.turn *= -1
		})
	},

	updateGameLog: function(winner){

		var playerOneScore = this.state.gameLog[0];
		var playerTwoScore = this.state.gameLog[1];

		if (winner === 'X'){
			var playerOneScore = this.state.gameLog[0] += 1
		} else if (winner === 'O'){
			var playerTwoScore = this.state.gameLog[1] += 1
		}

		this.setState({
			gameLog: [playerOneScore, playerTwoScore]
		});
	},
	resetGame: function(){
		this.setState({
			gameBoard: [
										['-', '-', '-'],
										['-', '-', '-'],
										['-', '-', '-']
								],
			turn: -1,
			gameResult: ''
		})
		
	},

	render: function(){
		var that = this;
		var GameBoard = this.state.gameBoard.map(function(row, i){
			return <Row row={row} rowNum={i} key={i} select={that.handleSelection} gameResult={that.state.gameResult}/>
		});

		return(
			<div>
				<ScoreBoard gameLog={this.state.gameLog} turn={this.state.turn} updateScore={this.handleUpdateScore} gameResult={this.state.gameResult} />
				<br/>
				<table>
					<tbody>
					{GameBoard}
					</tbody>
				</table>
				<ResetButton gameResult={this.state.gameResult} resetGame={this.resetGame}/>
			</div>
		)	
	}
});

var Row = React.createClass({
	propTypes: {
	    row: React.PropTypes.array.isRequired,
	    rowNum: React.PropTypes.number.isRequired,
	    select: React.PropTypes.func.isRequired,
	    gameResult: React.PropTypes.string.isRequired,
	},
	render: function(){
		var that = this;
		var tiles = this.props.row.map(function(tile, i){
			return <Tile 
								value={tile} 
								rowNum={that.props.rowNum} 
								tileNum={i} 
								select={that.props.select}
								key={i}
								gameResult={that.props.gameResult}
						 />
		});

		return (
			<tr>
				{tiles}
			</tr>
		)
	}
});

var Tile = React.createClass({
	propTypes: {
    value: React.PropTypes.string.isRequired,
    rowNum: React.PropTypes.number.isRequired,
    tileNum: React.PropTypes.number.isRequired,
    select: React.PropTypes.func.isRequired,
	},
	getInitialState: function() {
	  return {
	  	disabled: false 
	  };
	},
	handleSelect: function(){
		var rowNum = this.props.rowNum
		var tileNum = this.props.tileNum
		this.props.select(rowNum, tileNum)

		this.setState({
			disabled: true
		})
	},
	render: function(){

		var fontColor = null
		var disabled = this.state.disabled

		if (this.props.value === "X"){
			fontColor = 'xColor'
		} else if (this.props.value === "O"){
			fontColor = 'oColor'
		}

		return(
			<td>
				<input 
					disabled={disabled}
					type="button"
					value={this.props.value}
					onClick={this.handleSelect}
					className={fontColor}
				/>
			</td>
		)
	}
});

var ScoreBoard = React.createClass({
	render: function(){

		var turnDisplay = ''
		var fontColor = null

		if (this.props.gameResult === ''){
			if (this.props.turn === -1){
				turnDisplay = 'X\'s Turn';
				fontColor = "xColor";
			} else {
				turnDisplay = 'O\'s Turn';
				fontColor = "oColor";
			}
		}
		

		if (this.props.gameResult === 'O'){
			var results = "O wins!";
		} else if (this.props.gameResult === 'X'){
			var results = "X Wins!";
		} else if (this.props.gameResult === 'Cat\'s Game'){
			var results = this.props.gameResult;
		}
		return (
			<div>
				<h1>Tic-Tac-Toe</h1>
				<h3 className={fontColor}>{turnDisplay}</h3>
				<h3>{results}</h3>
				<table>
					<tbody>
						<tr>
							<td className="xColor" > X Wins: {this.props.gameLog[0]}</td> 
						</tr>
						<tr>
							<td className="oColor" > O Wins: {this.props.gameLog[1]}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
});

var ResetButton = React.createClass({
	handleReset: function(){
		this.props.resetGame()
	},
	render: function(){
		return (
			<button onClick={this.handleReset}>
				New Game
			</button>
		)
	}
});

ReactDOM.render(
	<Game />, 
	document.getElementById('content')
)