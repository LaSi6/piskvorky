let player = 'circle';

const cell = document.querySelectorAll('button');

for (let i = 0; i < cell.length; i +=1 ) {
    cell[i].addEventListener('click',  (ev) => {
            if (player === 'circle') {
                    ev.target.classList.add('board__field--circle');
                    const playerIcon = document.querySelector('.icon');
                    playerIcon.src = 'cross.svg';
                    player = 'cross';
            } else {
                    ev.target.classList.add('board__field--cross');
                    const playerIcon = document.querySelector('.icon');
                    playerIcon.src = 'circle.svg';
                    player = 'circle';
            }
            cell[i].disabled = true
        });
};

