let player = 'circle';

const cell = document.querySelectorAll('.cell');
//Hrací pole a vyhlášení vítěze
for (let i = 0; i < cell.length; i +=1 ) {
    cell[i].addEventListener('click', (ev) => {
            if (player === 'circle') {
                    ev.target.classList.add('board__field--circle');
                    const playerIcon = document.querySelector('.icon--player');
                    playerIcon.src = 'cross.svg';
                    player = 'cross';
                    if (isWinningMove(cell[i]) === true) {
                        let winnerPopup = () => {
                                if (confirm(
                                        'Vyhrálo kolečko. Gratulace vítězům, čest poraženým. 😎 Zahrajem si znovu?',
                                ) == true ) {
                                location.reload();
                              } else {       
                              }};
                                setTimeout(winnerPopup, 200);}
            } else {
                    ev.target.classList.add('board__field--cross');
                    const playerIcon = document.querySelector('.icon--player');
                    playerIcon.src = 'circle.svg';
                    player = 'circle';
                    if (isWinningMove(cell[i]) === true) {
                        let winnerPopup = () => {
                                if (confirm(
                                  'Vyhrál křížek. Gratulace vítězům, čest poraženým. 😎 Zahrajem si znovu?',
                                ) == true ) {
                                location.reload();
                              } else {
                              }};
                                setTimeout(winnerPopup, 200);}
            }
            cell[i].disabled = true
    });
}

const getSymbol = (field) => {
	if (field.classList.contains('board__field--cross')) {
		return 'cross'
	} else if (field.classList.contains('board__field--circle')) {
		return 'circle'
	}
}

const boardSize = 10 
const fields = document.querySelectorAll('.cell') 
const getField = (row, column) => {
   return fields[row * boardSize + column]
}

const getPosition = (field) => {
	let fieldIndex = 0
	while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
		fieldIndex++
	}

	return {
		row: Math.floor(fieldIndex / boardSize),
		column: fieldIndex % boardSize,
	}
}
//Výherce
const symbolsToWin = 5
const isWinningMove = (field) => {
        const origin = getPosition(field);
        const symbol = getSymbol(field);

	let i
	let y
	let x

	let inRow = 1
	// Koukni doleva
	i = origin.column
	while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
		inRow++
		i--
	}

	// Koukni doprava
	i = origin.column
	while (i < boardSize - 1 && symbol === getSymbol(getField(origin.row, i + 1))) {
		inRow++
		i++
	}

	if (inRow >= symbolsToWin) {
		return true;
	}

	let inColumn = 1
	// Koukni nahoru
	i = origin.row
	while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
		inColumn++
		i--
	}

	// Koukni dolu
	i = origin.row
	while (i < boardSize - 1 && symbol === getSymbol(getField(i + 1, origin.column))) {
		inColumn++
		i++
	}

	if (inColumn >= symbolsToWin) {
		return true;
	}

	let inDiagonal = 1
	//Koukni doprava nahoru
	y = origin.column
	x = origin.row
	while (x > 0 && symbol === getSymbol(getField(x - 1, y + 1)) && y < boardSize -1) {
		inDiagonal++
		y++
		x--
	}

	//Koukni doleva nahoru
	y = origin.column
	x = origin.row
	while (x > 0 && symbol === getSymbol(getField(x - 1, y - 1)) && y > 0) {
		inDiagonal++
		y--
		x--
	}

	//Koukni doprava dolu
	y = origin.column
	x = origin.row
	while (x < boardSize - 1 && symbol === getSymbol(getField(x + 1, y + 1)) && y < boardSize -1) {
		inDiagonal++
		y++
		x++
	}

	//Koukni doleva dolu
	y = origin.column
	x = origin.row
	while (x < boardSize - 1 && symbol === getSymbol(getField(x + 1, y - 1)) && y > 0) {
		inDiagonal++
		y--
		x++
	}

	if (inDiagonal >= symbolsToWin) {
		return true;
	}

	return false
}
