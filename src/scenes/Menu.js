// eslint-disable-next-line no-unused-vars
class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');

    this.buttons = ['play'];
    this.states = ['normal', 'hover', 'click'];

    this.buttonX = window.innerWidth / 2;
    this.buttonY = window.innerHeight / 2;
  }

  preload() {
    this.load.image('main_menu', 'src/assets/images/backgrounds/main_menu.png');

    for (const button of this.buttons) {
      for (const state of this.states) {
        this.load.image(
          `${button}_${state}_button`,
          `src/assets/images/buttons/${button}_${state}.png`,
        );
      }
    }

    this.load.audio('main_menu_music', 'src/assets/sounds/music/main_menu.mp3');
  }

  create() {
    const backgroundImg = this.add.image(0, 0, 'main_menu').setOrigin(0, 0);

    backgroundImg.displayWidth = window.innerWidth;
    backgroundImg.displayHeight = window.innerHeight;

    new Button(
      this,
      this.buttonX,
      this.buttonY,
      'play_normal_button',
      'play_hover_button',
      'play_click_button',
      () => {
        this.scene.start('MainScene');
      },
    );

    this.mainMenuMusic = this.sound.add('main_menu_music', {
      loop: true,
    });

    this.mainMenuMusic.play();
  }
}
