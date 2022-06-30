import { randomGridPosition } from "./grid.js";
import { onSnake, expandSnake } from "./snake.js";

let food = getFoodPos();
const EXPANSION_RATE = 1;

export const update = () => {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getFoodPos();
  }
};

export const draw = (gameboard) => {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameboard.appendChild(foodElement);
};

function getFoodPos() {
  let newPos;
  while (newPos == null || onSnake(newPos)) {
    newPos = randomGridPosition();
  }
  return newPos;
}
