var WarGame = React.createClass({
	getInitialState: function() {
	  return {
	  	playerCards: [],
	  	compCards: [],
	  	resultMessage: ''
	  };
	},
	updateCards: function(playerCards, compCards){
		this.setState({
			playerCards: playerCards,
			compCards: compCards
		})
	},
	exchangeCards: function(selectedPlayerCard, selectedCompCard, playerWinsHand, compWinsHand){
			var fullPlayerCardNum = parseFloat(selectedPlayerCard[0] + '.' + selectedPlayerCard[1])
			var fullCompCardNum = parseFloat(selectedCompCard[0] + '.' + selectedCompCard[1])

			var compCards = this.state.compCards
			var playerCards = this.state.playerCards


			if (playerWinsHand === true){
				var newPlayerCards = playerCards.concat(fullCompCardNum, fullPlayerCardNum);		

				this.setState({
					playerCards: newPlayerCards,
				})

			} else if (compWinsHand === true){
				var newCompCards = compCards.concat(fullCompCardNum, fullPlayerCardNum);

				this.setState({
					compCards: newCompCards
				})
			}

			this.checkWinner();
	},
	checkWinner: function(){
		if (this.state.playerCards.length === 0){
			this.setState({
				resultMessage: 'You Lose! Try again.'
			})
		} else if (this.state.compCards.length === 0){
			this.setState({
				resultMessage: 'You Win! Congratulations!'
			})
		}
	},
	render: function(){
		return (
			<div>
				<h1>War!</h1>
				<Scoreboard playerCards={this.state.playerCards} compCards={this.state.compCards} resultMessage={this.state.resultMessage}/>
				<Gameboard playerCards={this.state.playerCards} compCards={this.state.compCards} updateCards={this.updateCards} exchangeCards={this.exchangeCards}/>
			</div>
		)
	}
})

var Scoreboard = React.createClass({
	render: function(){
		return (
			<table>
				<tbody>
					<tr>
						<th>Player Score</th>
						<th>Computer Score</th>
					</tr>
					<tr>{this.props.resultMessage}</tr>
					<tr>
						<td>{this.props.playerCards.length}</td>
						<td>{this.props.compCards.length}</td>
					</tr>
				</tbody>
			</table>
		)
	}
})

var Gameboard = React.createClass({
	getInitialState: function(){
		return {
			selectedPlayerCard: [],
			selectedCompCard: [],
			playerWinsHand: false,
			compWinsHand: false,
			war: false,
			playerWarCard: [],
			compWarCard: [],
		}
	},
	sortCards: function(){

		var gameCards = [2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.3, 6.4, 7.1, 7.2, 7.3, 7.4, 8.1, 8.2, 8.3, 8.4, 9.1, 9.2, 9.3, 9.4, 10.1, 10.2, 10.3, 10.4, 11.1, 11.2, 11.3, 11.4, 12.1, 12.2, 12.3, 12.4, 13.1, 13.2, 13.3, 13.4, 14.1, 14.2, 14.3, 14.4]

		var getRandomCard = function(gameCards){
			return gameCards[Math.floor(Math.random() * gameCards.length)]
		}

		var removeCard = function(gameCards, selectedCard){
			var indexOfCard = gameCards.indexOf(selectedCard)
			return gameCards.splice(indexOfCard, 1)
		}

		var playerCards = [];
		var compCards = [];
		var randomCard = null;


		for (var i = 0; i < 26; i++){

			randomCard = getRandomCard(gameCards)
			playerCards.push(removeCard(gameCards, randomCard)[0])

			randomCard = getRandomCard(gameCards)
			compCards.push(removeCard(gameCards, randomCard)[0])
			
		}
		this.props.updateCards(playerCards, compCards)
		
	},
	selectNextCards: function(playerCards, compCards){

		var selectCard = function(cards){
			var card = cards.shift()
			var cardNum = Math.round(card)
			var suitNum = card.toString().slice(-1)

			return [cardNum, suitNum]

		}

		var playerCard = selectCard(playerCards);
		var compCard = selectCard(compCards);

		this.props.updateCards(playerCards, compCards);

		this.determineWinner(playerCard, compCard);

	},
	determineWinner: function(playerCard, compCard){
		if (playerCard[0] > compCard[0]){

			var playerWinsHand = true
			var compWinsHand = false
			
			this.setState({
				playerWinsHand: playerWinsHand,
				compWinsHand: compWinsHand,
				selectedPlayerCard: playerCard,
				selectedCompCard: compCard,
				war: false,
			});



			this.props.exchangeCards(playerCard, compCard, playerWinsHand, compWinsHand);

		} else if (playerCard[0] < compCard[0]){

			var playerWinsHand = false
			var compWinsHand = true

			this.setState({
				playerWinsHand: playerWinsHand,
				compWinsHand: compWinsHand,
				selectedPlayerCard: playerCard,
				selectedCompCard: compCard,
				war: false,
			});

			this.props.exchangeCards(playerCard, compCard, playerWinsHand, compWinsHand);
			
		} else {
			this.runWar(playerCard, compCard);
		}
	},
	runWar: function(playerCard, compCard){

		var playerWarCards = [];
		var compWarCards = [];

		// Get the full card number from the array of the card that was selected to cause the war
		var fullPlayerCardNum = parseFloat(playerCard[0] + '.' + playerCard[1])
		var fullCompCardNum = parseFloat(compCard[0] + '.' + compCard[1])

		var selectedPlayerWarCard = Math.round(this.props.playerCards[4]);
		var selectedCompWarCard = Math.round(this.props.compCards[4]);

		// Get suit and card numbers for finding image of player card (card num renamed from find above for clarity)
		var playerWarCardNum = selectedPlayerWarCard
		var playerWarSuitNum = this.props.playerCards[4].toString().slice(-1)

		// Get suit and card numbers for finding image of computer card
		var compWarCardNum = selectedCompWarCard
		var compWarSuitNum = this.props.compCards[4].toString().slice(-1)

		var playerCards = this.props.playerCards;
		var compCards = this.props.compCards;

		// Select 4 war cards from both decks
		for (var i =0; i < 4; i++){
			compWarCards.push(compCards[i]);
			playerWarCards.push(playerCards[i]);
		}
		// Remove 4  war cards from both decks
		for (var i = 0; i < 4; i++){
			compCards.shift()
			playerCards.shift()
		}

		if (selectedPlayerWarCard > selectedCompWarCard){

			// Place original cards that caused war into player's deck
			playerCards.push(fullPlayerCardNum)
			playerCards.push(fullCompCardNum)

			// Place WarCards from both players into back of player's deck
			for (var i = 0; i < 4; i++){
				playerCards.push(playerWarCards[i]);
				playerCards.push(compWarCards[i]);
			}

		} else if (selectedPlayerWarCard < selectedCompWarCard){

			// Place original cards that caused war into computer's deck
			compCards.push(fullCompCardNum)
			compCards.push(fullPlayerCardNum)

			// Place warcards from both players back into computer's deck
			for (var i = 0; i < 4; i++){
				compCards.push(playerWarCards[i]);
				compCards.push(compWarCards[i]);
			}
		}

		this.setState({
				selectedPlayerCard: playerCard,
				selectedCompCard: compCard,
				playerWarCard: [playerWarCardNum, playerWarSuitNum],
				compWarCard: [compWarCardNum, compWarSuitNum],
				compWinsHand: false,
				playerWinsHand: false,
				war: true,
		});

		this.props.updateCards(playerCards, compCards);


		// ACCOUNT FOR DOUBLE WAR HERE

	},
	handleClick: function(){
		this.selectNextCards(this.props.playerCards, this.props.compCards);	
	},
	resetGame: function(){
		this.sortCards();
	},
	render: function(){

		if (this.state.war === true){

			var findSuit = function(warCardSuitNum){
				if (warCardSuitNum === "1"){
					return "diamonds";
				} else if (warCardSuitNum === "2"){
					return "hearts";
				} else if (warCardSuitNum === "3"){
					return "clubs";
				} else if (warCardSuitNum === "4"){
					return "spades";
				} 
			}

			var playerSuit = findSuit(this.state.playerWarCard[1])
			var compSuit = findSuit(this.state.compWarCard[1])


			var playerFlippedCardImg = "../images/Blue_Back.jpeg"
			var compFlippedCardImg = "../images/Red_Back.jpg"
			var playerWarCardImg = "../images/" + this.state.playerWarCard[0] + '_of_' + playerSuit + '.png'
			var compWarCardImg = "../images/" + this.state.compWarCard[0] + '_of_' + compSuit + '.png'
			
			if (this.state.playerWarCard[0] > this.state.compWarCard[0]){
				var playerWarCardClass = "card-winner"
				var compWarCardClass = "card"
			} else if (this.state.playerWarCard[0] < this.state.compWarCard[0]){
				var playerWarCardClass = "card"
				var compWarCardClass = "card-winner"
			}


			var alt="War Card"
			
		} else {
			var playerFlippedCardImg = "";
			var compFlippedCardImg = "";
		}

		return (
				<table>
					<tbody>

						<tr>
							<td>
								<h4>Evil Computer</h4>
							</td>
						</tr>

						<tr>
							<td>
								<CardDisplay selectedCard={this.state.selectedCompCard} winner={this.state.compWinsHand}/>
							</td>
							<td>
								<img src={compFlippedCardImg} alt={alt} className={"card-back"}>
								</img>
							</td>
							<td>
								<img src={compFlippedCardImg} alt={alt} className={"card-back"}>
								</img>
							</td>
							<td>
								<img src={compFlippedCardImg} alt={alt} className={"card-back"}>
								</img>
							</td>
							<td>
								<img src={compWarCardImg} alt={alt} className={compWarCardClass}>
								</img>
							</td>
						</tr>

						<tr>
							<td>
								<h4>My Cards</h4>
							</td>
						</tr>

						<tr>
							<td>
								<button onClick={this.handleClick} >
									<CardDisplay selectedCard={this.state.selectedPlayerCard} winner={this.state.playerWinsHand}/>
								</button>
							</td>
							<td>
								<img src={playerFlippedCardImg} alt={alt} className={"card-back"}>
								</img>
							</td>
							<td>
								<img src={playerFlippedCardImg} alt={alt} className={"card-back"}>
								</img>
							</td>
							<td>
								<img src={playerFlippedCardImg} alt={alt} className={"card-back"}>
								</img>
							</td>
							<td>
								<img src={playerWarCardImg} alt={alt} className={playerWarCardClass}>
								</img>
							</td>
						</tr>

						<tr>
							<td>
								<button onClick={this.resetGame}>New Game</button>
							</td>
						</tr>

					</tbody>
				</table>
				
		)
	}

})

var CardDisplay = React.createClass({
	displayCard: function(selectedCard){
			var suit = ''
			var cardNum = selectedCard[0]

			if (selectedCard[1] === "1"){
				suit = "diamonds";
			} else if (selectedCard[1] === "2"){
				suit = "hearts";
			} else if (selectedCard[1] === "3"){
				suit = "clubs";
			} else if (selectedCard[1] === "4"){
				suit = "spades";
			} else {
				return "../images/Blue_Back.jpeg"
			}
		return "../images/" + cardNum + "_of_" + suit + ".png";
	},
	getAlt: function(selectedCard){
		return selectedCard[0] + " of " + selectedCard[1]
	},
	render: function(){
		if (this.props.winner === true){
			var className = "card-winner"
		} else {
			var className = "card"
		}

		return (
			<div>
					<img src={this.displayCard(this.props.selectedCard)} alt={this.getAlt(this.props.selectedCard)} className={className}></img>
			</div>
		)
	}
})
 



ReactDOM.render(<WarGame />, document.getElementById('content'))



