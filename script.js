//your code here
document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("gameContainer");
  const gridSize = 10;
  const gridCount = 400 / gridSize;
  let food;
  let snake;
  let direction;
  let interval;

  function createPixel(id, className) {
    const pixel = document.createElement("div");
    pixel.id = id;
    pixel.classList.add(className);
    return pixel;
  }

  function createFood() {
    const x = Math.floor(Math.random() * gridCount);
    const y = Math.floor(Math.random() * gridCount);
    const foodId = `food-${x}-${y}`;
    food = createPixel(foodId, "food");
    food.style.left = `${x * gridSize}px`;
    food.style.top = `${y * gridSize}px`;
    gameContainer.appendChild(food);
  }

  function createSnake() {
    snake = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
    ];

    for (let i = 0; i < snake.length; i++) {
      const pixelId = `pixel-${snake[i].x}-${snake[i].y}`;
      const snakePixel = createPixel(pixelId, "snakeBodyPixel");
      snakePixel.style.left = `${snake[i].x * gridSize}px`;
      snakePixel.style.top = `${snake[i].y * gridSize}px`;
      gameContainer.appendChild(snakePixel);
    }
  }

  function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
      case "up":
        head.y -= 1;
        break;
      case "down":
        head.y += 1;
        break;
      case "left":
        head.x -= 1;
        break;
      case "right":
        head.x += 1;
        break;
    }

    const newHeadId = `pixel-${head.x}-${head.y}`;
    const newHead = createPixel(newHeadId, "snakeBodyPixel");
    newHead.style.left = `${head.x * gridSize}px`;
    newHead.style.top = `${head.y * gridSize}px`;

    snake.unshift(head);
    gameContainer.appendChild(newHead);

    if (head.x === food.offsetLeft / gridSize && head.y === food.offsetTop / gridSize) {
      gameContainer.removeChild(food);
      createFood();
    } else {
      const tail = snake.pop();
      const tailId = `pixel-${tail.x}-${tail.y}`;
      const tailPixel = document.getElementById(tailId);
      gameContainer.removeChild(tailPixel);
    }
  }

  function handleKeyPress(event) {
    const
