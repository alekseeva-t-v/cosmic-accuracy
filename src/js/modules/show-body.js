import { variables } from "./variables";

/**
 * Отвечает за плавное отображение страницы
 *
 */
function showBody() {
  const {body} = variables

  body.classList.add('body_visible');
}

export default showBody;