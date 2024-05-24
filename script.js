document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('container');
    const slider = document.getElementById('slider');
    const sliderValue = document.getElementById('slider-value');
    const blackModeButton = document.getElementById('black-mode');
    const rainbowModeButton = document.getElementById('rainbow-mode');
    const eraseBoardButton = document.getElementById('erase-board');
    const pickColorButton = document.getElementById('pick-color-button');
    const colorPicker = document.getElementById('color-picker');
    let currentMode = 'black';
    let isDrawing = true;  
    let customColor = '#000000'; 

    // Creating the Grid

    function createGrid(size) {
        container.innerHTML = '';

        for (let i = 0; i < size * size; i++) { // Used for loop to create the grid
            const square = document.createElement('div');
            square.classList.add('square');
            square.addEventListener('mouseover', function() { // Checking to see if the user is drawing
                if (isDrawing) { // If the user is drawing, the square will change color
                    if (currentMode === 'black') {
                        square.style.backgroundColor = 'black';
                    } else if (currentMode === 'rainbow') {
                        square.style.backgroundColor = getRandomColor();
                    } else if (currentMode === 'custom') {
                        square.style.backgroundColor = customColor;
                    }
                }
            });
            square.addEventListener('click', function() { 
                isDrawing = !isDrawing; // Disables Drawing
            });
            container.appendChild(square);
        }

        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    }

    // Random Color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    // Delete Board
    function eraseBoard() {
        const squares = container.querySelectorAll('.square');
        squares.forEach(square => {
            square.style.backgroundColor = 'white';
        });
    }

    // Setting the different colors

    blackModeButton.addEventListener('click', function() {
        currentMode = 'black';
    });

    rainbowModeButton.addEventListener('click', function() {
        currentMode = 'rainbow';
    });

    eraseBoardButton.addEventListener('click', function() {
        eraseBoard();
    });

    pickColorButton.addEventListener('click', function() {
        colorPicker.click();
    });

    colorPicker.addEventListener('input', function() {
        customColor = this.value;
        currentMode = 'custom';
    });

    slider.addEventListener('input', function() {
        const size = this.value;
        sliderValue.textContent = `${size}x${size}`;
        createGrid(size);
    });

    createGrid(slider.value);
});
