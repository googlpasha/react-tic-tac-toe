import React, { Component } from 'react';
import './App.css';



function Squere(props) {
    return (<button className={'square ' + props.customClass} onClick={() => props.onClick()}>{props.value}</button>)
}


class Board extends Component {
  renderSquare(i){
    return <Squere 
      customClass={this.props.customClass}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      >
      </Squere>
  }

  render(){

    return(
      <div>
      <div className="board-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
      </div>
      <div className="board-row">
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
      </div>
      <div className="board-row">
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
      </div>
    </div>
    )
  }
}

class Game extends Component {

  constructor(props){
    super(props)
    this.state = {
      history : [{
        squares : Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber:0,
      gameClass : 'white'
    }
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7], 
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber +1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (squares[i] || this.calculateWinner(current.squares)){
      return
    }
    squares[i] =  this.state.xIsNext ? 'X' : 'O'
    let xIsNext = !this.state.xIsNext
    this.setState({
      xIsNext : xIsNext,
      stepNumber: history.length,
      history : history.concat([{
        squares : squares
      }])
    })
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  changeColor(color){
    this.setState(
      {gameClass : color}
    )
    console.log("Color changed!")
  }

  render(){
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = this.calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step,move)=>{
      const desc = move ? 'Go to move #' + move : 'Go to game start'
      return (
        <li key={move}>
          <button onClick={()=>this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    return(
      <div className={this.state.gameClass}>
      <div className="game-board">
      <div>
        <button onClick={()=>this.changeColor('green')}>Green</button>
        <button onClick={()=>this.changeColor('white')}>White</button>
      </div>
        <Board customClass={this.state.gameClass} squares={current.squares} onClick={(i)=>{this.handleClick(i)}} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
    )
  }
}





//======================================

export default Game
