function Square(props) {
  return (
    !props.hl ? /*#__PURE__*/
    React.createElement("button", { name: props.index, className: "square btn btn-outline-dark", onClick: props.onClick },
    props.value) : /*#__PURE__*/

    React.createElement("button", { name: props.index, style: { color: "greenyellow" }, className: "square btn btn-outline-dark", onClick: props.onClick },
    props.value));


}
class Board extends React.Component {

  render() {
    let arr = [];
    for (let i = 0; i < 3; i++) {
      let arrc = [];
      for (let j = i * 3; j < i * 3 + 3; j++) {
        arrc.push( /*#__PURE__*/React.createElement(Square, {
          hl: this.props.lineWin.includes(j) ? true : false,
          index: j,
          value: this.props.squares[j],
          onClick: () => this.props.onClick(j) }));

      }
      arr.push( /*#__PURE__*/React.createElement("div", { className: "board-row", key: i }, arrc));
    }
    return /*#__PURE__*/(
      React.createElement("div", null,
      arr));


  }}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null) }],

      stepNumber: 0,
      xIsNext: true,
      historyPos: [{ row: null, col: null }],
      isAsc: true };

  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const historyPos = this.state.historyPos.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(current.squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares }]),

      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      historyPos: historyPos.concat([{ row: Math.floor(i / 3), col: i % 3 }]) });

  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0 });

  }
  handleList() {
    this.setState({
      isAsc: !this.state.isAsc });

    console.log(this.state.isAsc);
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const historyPos = this.state.historyPos;
    let winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      let desc;
      if (this.state.isAsc) {
        desc = move ? "Go to move #" + move + " (" + historyPos[move].row + "," + historyPos[move].col + ")" : "Go to game start";
        return this.state.stepNumber === move ? /*#__PURE__*/React.createElement("li", { key: move, className: "fw-bold" }, " ", /*#__PURE__*/React.createElement("button", { className: "btn btn-warning mt-2", onClick: () => this.jumpTo(move) }, desc), " ") : /*#__PURE__*/
        React.createElement("li", { key: move }, " ", /*#__PURE__*/React.createElement("button", { className: "btn btn-warning mt-2", onClick: () => this.jumpTo(move) }, desc), " ");
      } else {
        desc = move != history.length - 1 ? "Go to move #" + (history.length - 1 - move) + " (" + historyPos[history.length - 1 - move].row + "," + historyPos[history.length - 1 - move].col + ")" : "Go to game start";
        return this.state.stepNumber === history.length - 1 - move ? /*#__PURE__*/React.createElement("li", { key: move, className: "fw-bold" }, " ", /*#__PURE__*/React.createElement("button", { className: "btn btn-warning mt-2", onClick: () => this.jumpTo(history.length - 1 - move) }, desc), " ") : /*#__PURE__*/
        React.createElement("li", { key: move }, " ", /*#__PURE__*/React.createElement("button", { className: "btn btn-warning mt-2", onClick: () => this.jumpTo(history.length - 1 - move) }, desc), " ");
      }
    });
    let status;
    if (winner) {
      status = "Winner: " + winner[0];
    } else {
      if (this.state.stepNumber == 9) status = "Final Result: Hòa";else
      status = "Next Player: " + (this.state.xIsNext ? 'X' : 'O');
    }
    return /*#__PURE__*/(
      React.createElement("div", { className: "container-fluid h-100 bg-light" }, /*#__PURE__*/
      React.createElement("div", { className: "row justify-content-center align-items-center h-100" }, /*#__PURE__*/
      React.createElement("div", { className: "col-md-4 offset-md-2 text-center game-board" }, /*#__PURE__*/
      React.createElement("h3", { className: "text-warning mb-3" }, status), /*#__PURE__*/
      React.createElement(Board, {
        lineWin: winner ? winner : [-1],
        squares: current.squares,
        onClick: i => this.handleClick(i) })), /*#__PURE__*/


      React.createElement("div", { className: "col-md-4 game-info" }, /*#__PURE__*/
      React.createElement("div", { class: "form-check form-switch mb-3 mt-3 ms-3" }, /*#__PURE__*/
      React.createElement("input", { type: "checkbox", class: "form-check-input", id: "switch", value: "0", onClick: () => this.handleList() }), /*#__PURE__*/
      React.createElement("label", { class: "form-check-label", for: "switch" }, "T\u0103ng / Gi\u1EA3m")),

      this.state.isAsc ? /*#__PURE__*/React.createElement("ol", null, " ", moves, " ") : /*#__PURE__*/React.createElement("ol", { reversed: true }, " ", moves, " ")))));




  }}

function calculateWinner(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], a, b, c];
    }
  }
  return null;
}
ReactDOM.render( /*#__PURE__*/React.createElement(Game, null), document.getElementById('root'));