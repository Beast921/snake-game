import { getInputDirn } from "./input.js";

export const SNAKE_SPEED = 7;
const snakeBody = [{ x: 10, y: 11 }];
let newSegments = 0;

export const update = () => {
  addSegments();
  const inputDirn = getInputDirn();
  for (let i = snakeBody.length - 2; i >= 0; --i) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += inputDirn.x;
  snakeBody[0].y += inputDirn.y;
};

export const draw = (gameboard) => {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameboard.appendChild(snakeElement);
  });
};

export const expandSnake = (amount) => {
  newSegments += amount;
};

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPos(segment, position);
  });
}

const equalPos = (pos1, pos2) => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

const addSegments = () => {
  for (let i = 0; i < newSegments; ++i)
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  newSegments = 0;
};

export const getSnakeHead = () => {
  return snakeBody[0];
};

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}
