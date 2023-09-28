import { variables } from './variables';
import { colors } from './colors';

function showGame() {
  const { screenFirst, screenSecond, btnSound } = variables;

  let time = 0;
  let score = 0;
  let interval;
  let sound = true;

  /**
   * Добавляет разметку в родительский элемент.
   *
   * @param {object} parentElement Родительский элемент.
   * @param {string} childElement Разметка дочернего элемента.
   */
  function addMarkup(parentElement, childElement) {
    parentElement.innerHTML = childElement;
  }

  /**
   * Формирует и возвращает разметку стартового экрана.
   *
   * @return {string} разметка стартового экрана.
   */
  function createStartScreen() {
    const markup = `
    <div class="game__inner">
        <div class="game__img">
          <img src="./img/svg/start-cosmic.svg" alt="" />
        </div>
        <div class="game__descr">
          <h2 class="game__title">Космическая меткость</h2>
          <p class="game__text">
            Отличная возможность проверить насколько метко и быстро ты попадаешь
            по предметам на экране. Коснись всех планет: больших и маленьких, и
            установи новый рекорд
          </p>
          <a class="game__button button" id="settings-btn" href="#">
            <span class="button__line button__line--top"></span>
            <span class="button__line button__line--right"></span>
            <span class="button__line button__line--bottom"></span>
            <span class="button__line button__line--left"></span>
            Пройти испытание
          </a>
        </div>
      </div>
    `;

    return markup;
  }

  /**
   * Формирует и возвращает разметку экрана с настройками.
   *
   * @return {string} разметка экрана с настройками.
   */
  function createSettingsScreen() {
    const markup = `
            <div class="game__inner">
              <div class="game__descr">
                <h2 class="game__title">Настройки</h2>
                <p class="game__text">
                  До начала игры всего один шаг. Вам осталось выбрать длительность
                  испытания
                </p>
                <div class="game__buttons-list">
                  <a class="game__button button game__button--time">
                    <span class="button__line button__line--top"></span>
                    <span class="button__line button__line--right"></span>
                    <span class="button__line button__line--bottom"></span>
                    <span class="button__line button__line--left"></span>
                    10 сек
                  </a>

                  <a class="game__button button game__button--time">
                    <span class="button__line button__line--top"></span>
                    <span class="button__line button__line--right"></span>
                    <span class="button__line button__line--bottom"></span>
                    <span class="button__line button__line--left"></span>
                    20 сек
                  </a>

                  <a class="game__button button game__button--time">
                    <span class="button__line button__line--top"></span>
                    <span class="button__line button__line--right"></span>
                    <span class="button__line button__line--bottom"></span>
                    <span class="button__line button__line--left"></span>
                    30 сек
                  </a>

                  <a class="game__button button game__button--time">
                    <span class="button__line button__line--top"></span>
                    <span class="button__line button__line--right"></span>
                    <span class="button__line button__line--bottom"></span>
                    <span class="button__line button__line--left"></span>
                    40 сек
                  </a>
                </div>
              </div>

              <div class="game__img">
                <img src="./img/svg/setting-cosmic.svg" alt="" />
              </div>
            </div>
    `;

    return markup;
  }

  /**
   * Формирует и возвращает разметку игрового экрана.
   *
   * @param {number} sec количество секунд, выбранное при настройке.
   * @return {string} разметка игрового экрана.
   */
  function createGameScreen(sec) {
    time = sec;

    const markup = `
        <div class="game__inner game__inner--game">
          <div class="game__play-descr">
            <h2 class="game__timer">Осталось <span class="game__time" id="time">00:${sec}</span></h2>
            <div class="game__play-img">
              <img src="./img/svg/time-cosmic.svg" alt="" />
            </div>
          </div>
          <div class="game__play-board">
            <div class="game__board" id="board"></div>
          </div>
        </div>
    `;

    return markup;
  }

  /**
   * Формирует и возвращает разметку экрана с результатами игры.
   *
   * @param {number} res Финальный счет игры.
   * @return {string} разметка экрана с результатами игры.
   */
  function createFinishScreen(res) {
    const markup = `
      <div class="game__inner">
        <div class="game__img">
          <img src="./img/svg/finish-cosmic.svg" alt="" />
        </div>
        <div class="game__descr">
          <h2 class="game__title">Ура! Испытание пройдено!</h2>
          <p class="game__res">
            Твой результат: <span class="res" id="res">${res}</span>
          </p>
          <a class="game__button button" href="#">
            <span class="button__line button__line--top"></span>
            <span class="button__line button__line--right"></span>
            <span class="button__line button__line--bottom"></span>
            <span class="button__line button__line--left"></span>
            Играть снова
          </a>
        </div>
      </div>
    `;

    return markup;
  }

  /**
   * Добавляет обработчики событий для первого экрана, когда он сформирован.
   *
   */
  function addFunctionaliatyStartScreen() {
    if (document.getElementById('settings-btn')) {
      const settingsBtn = document.getElementById('settings-btn');

      settingsBtn.addEventListener('click', (event) => {
        event.preventDefault();
        screenFirst.classList.add('up');
        screenFirst.innerHTML = '';
      });
    }
  }

  /**
   * Добавляет обработчики событий для экрана с настройками, когда он сформирован.
   *
   */
  function addFunctionaliatySettingsScreen() {
    if (document.querySelectorAll('.game__button--time')) {
      const gameButtonsTimeList = document.querySelectorAll(
        '.game__button--time'
      );

      gameButtonsTimeList.forEach((button) => {
        button.addEventListener('click', (event) => {
          addMarkup(
            screenFirst,
            createGameScreen(event.target.textContent.trim().split(' ')[0])
          );
          startGame();
          addFunctionaliatyGameScreen();

          screenFirst.classList.add('down');
          screenSecond.innerHTML = '';
        });
      });
    }
  }

  /**
   * Добавляет обработчики событий для игрового экрана, когда он сформирован.
   *
   */
  function addFunctionaliatyGameScreen() {
    if (document.getElementById('board')) {
      const board = document.getElementById('board');
      const myAudio = new Audio();
      myAudio.src = './files/click.mp3';

      board.addEventListener('click', (event) => {
        if (event.target.classList.contains('circle')) {
          sound && myAudio.play();
          score++;
          event.target.remove();
          createRandomCircle();
        }
      });
    }
  }

  /**
   * Добавляет обработчики событий для экрана с результатами игры, когда он сформирован.
   *
   */
  function addFunctionaliatyFinishScreen() {
    if (document.querySelector('.game__button')) {
      const button = document.querySelector('.game__button');

      button.addEventListener('click', (event) => {
        event.preventDefault();
        addMarkup(screenFirst, createSettingsScreen());
        addFunctionaliatySettingsScreen();
        score = 0;

        screenFirst.classList.add('down');
        screenSecond.innerHTML = '';
      });
    }
  }

  /**
   * Инициирует начало игры: (1) Запускает таймер игры, обновляя каждую секунду, (2) Запускает функцию отображения таймера на странице, (3) Запускает функцию формирования рандомного игрового объекта, (4) Формирует и воспроизводит звук начала игры
   *
   */
  function startGame() {
    const audioStart = new Audio();
    audioStart.src = './files/start.mp3';

    interval = setInterval(decreaseTime, 1000);
    setTime(time);
    createRandomCircle();
    sound && audioStart.play();
  }

  /**
   * Управляет таймером: (1) Если время вышло запускает функцию завершения игры, удаляет интервал (2) Если время не вышло, уменьшает его на секунду, преобразует в корректный формат, запускает функцию отображения таймера на странице
   *
   */
  function decreaseTime() {
    if (time === 0) {
      finishGame();
      clearInterval(interval);
    } else {
      let current = --time;
      let currentUpdate = current >= 10 ? current : `0${current}`;
      setTime(currentUpdate);
    }
  }

  /**
   * Выводит таймер на страницу.
   *
   * @param {number | string} value Количество секунд для отображения.
   */
  function setTime(value) {
    if (document.getElementById('time')) {
      const timeElem = document.getElementById('time');
      timeElem.innerHTML = `00:${value}`;
    }
  }

  /**
   * Инициирует завершение игры: (1) Формирует экран с результатами и отображает его, (2) Формирует и воспроизводит звук завершения игры
   *
   */
  function finishGame() {
    const audioFinish = new Audio();
    audioFinish.src = './files/finish.mp3';

    sound && audioFinish.play();
    addMarkup(screenSecond, createFinishScreen(score));
    addFunctionaliatyFinishScreen();
    screenFirst.classList.remove('down');
    screenFirst.innerHTML = '';
  }

  /**
   * Формирует и отображает на игровом поле круг, присваивая ему рандомно стилевые характеристики
   *
   */
  function createRandomCircle() {
    if (document.getElementById('board')) {
      const board = document.getElementById('board');

      const size = getRandomNumber(10, 60);
      const { width, height } = board.getBoundingClientRect();
      const x = getRandomNumber(0, width - size - 10);
      const y = getRandomNumber(0, height - size - 10);
      const color = colors[getRandomNumber(0, colors.length - 1)];

      const circle = document.createElement('div');
      circle.classList.add('circle');
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.top = `${y}px`;
      circle.style.left = `${x}px`;
      circle.style.backgroundColor = `${color}`;

      board.append(circle);
    }
  }

  /**
   * Возвращает рандомное число из заданного диапазона.
   *
   * @param {number} min минимальное значение.
   * @param {number} max максимальное значение.
   * @return {string} разметка экрана с результатами игры.
   */
  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  addMarkup(screenFirst, createStartScreen());
  addMarkup(screenSecond, createSettingsScreen());
  addFunctionaliatyStartScreen();
  addFunctionaliatySettingsScreen();

  btnSound.addEventListener('click', () => {
    btnSound.classList.toggle('sound-btn--active');

    sound = !sound;
    console.log(sound)
  });
}

export default showGame;
