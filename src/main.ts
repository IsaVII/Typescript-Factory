import "./style.css";
import { basicTypes } from "./lessons/01-basic-types";
import { renderLesson } from "./ui/render";
import { setupQuizzes } from "./ui/quiz";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) {
  throw new Error("Could not find #app in index.html");
}

app.innerHTML = renderLesson(basicTypes);
setupQuizzes(app, basicTypes);
