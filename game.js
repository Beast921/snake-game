import {
  SNAKE_SPEED,
  draw as drawSnake,
  update as updateSnake,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let lasttime = 0;
let gameOver = false;
const gameboard = document.getElementById("game-board");

const main = (time) => {
  if (gameOver) {
    if (confirm("You lost. Press ok to restart.")) window.location = "./";
    return;
  }
  window.requestAnimationFrame(main);
  const delay = (time - lasttime) / 1000;
  if (delay < 1 / SNAKE_SPEED) return;
  lasttime = time;

  update();
  draw();
};

window.requestAnimationFrame(main);

const update = () => {
  updateSnake();
  updateFood();
  checkDeath();
};

const draw = () => {
  gameboard.innerHTML = "";
  drawSnake(gameboard);
  drawFood(gameboard);
};

const checkDeath = () => {
  gameOver = snakeIntersection() || outsideGrid(getSnakeHead());
};
