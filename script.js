//your code here
  document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('gameContainer');
  const scoreElement = document.getElementById('score');

  const gridSize = 10;
  const gridWidth = gameContainer.offsetWidth / gridSize;
  const gridHeight = gameContainer.offsetHeight / gridSize;

  let snake = [{ x: 10, y: 20 }];
  let food = createFood();
  let direction = 'right';
  let score = 0;

  const moveInterval = setInterval(moveSnake, 100);

  document.addEventListener('keydown', changeDirection);

  function createFood() {
    const food = document.createElement('div');
    food.className = 'pixel food';
    food.id = 'food';
    gameContainer.appendChild(food);

    const foodX = Math.floor(Math.random() * gridWidth);
    const foodY = Math.floor(Math.random() * gridHeight);
    food.style.left = `${foodX * gridSize}px`;
    food.style.top = `${foodY * gridSize}px`;

    return { x: foodX, y: foodY };
  }

  function moveSnake() {
    const head = { ...snake[0] };

    if (direction === 'right') head.x += 1;
    if (direction === 'left') head.x -= 1;
    if (direction === 'up') head.y -= 1;
    if (direction === 'down') head.y += 1;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 1;
      scoreElement.textContent = score;

      food.remove();
      food = createFood();
    } else {
      snake.pop();
    }

    if (isCollision()) {
      clearInterval(moveInterval);
      alert('Game Over! Your score: ' + score);
    }

    renderSnake();
  }

  function renderSnake() {
    const snakePixels = document.getElementsByClassName('snakeBodyPixel');
    while (snakePixels.length > 0) {
      snakePixels[0].remove();
    }

    for (let i = 0; i < snake.length; i++) {
      const snakePixel = document.createElement('div');
      snakePixel.className = 'pixel snakeBodyPixel';
      snakePixel.style.left = `${snake[i].x * gridSize}px`;
      snakePixel.style.top = `${snake[i].y * gridSize}px`;
      gameContainer.appendChild(snakePixel);
    }
  }

  function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== 'right') direction = 'left';
    if (key === 38 && direction !== 'down') direction = 'up';
    if (key === 39 && direction !== 'left') direction = 'right';
    if (key === 40 && direction !== 'up') direction = 'down';
  }

  function isCollision() {
    const head = snake[0];

    if (
      head.x < 0 ||
      head.x >= gridWidth ||
      head.y < 0 ||
      head.y >= gridHeight
    ) {
      return true;
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }

    return false;
  }
});

 