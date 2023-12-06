class Player extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y, radius, color) {
    super(scene, x, y, radius, radius, color);

    this.speed = 300;
    this.radius = radius;
    this.mousePressed = false;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setStrokeStyle(2, 0xffffff);
    this.body.setCollideWorldBounds(true);

    this.arm = scene.add.circle(this.x, this.y, 10, 0xffffff);
    this.bullets = [];
  }

  removeBullet(bullet) {
    this.bullets = this.bullets.filter(b => b !== bullet);
  }

  update(keys, cursors, mouse) {
    this.body.setVelocityX(0);
    this.body.setVelocityY(0);

    if (keys.left.isDown || cursors.left.isDown) {
      this.body.setVelocityX(-this.speed);
    } else if (keys.right.isDown || cursors.right.isDown) {
      this.body.setVelocityX(this.speed);
    }
    if (keys.up.isDown || cursors.up.isDown) {
      this.body.setVelocityY(-this.speed);
    } else if (keys.down.isDown || cursors.down.isDown) {
      this.body.setVelocityY(this.speed);
    }

    this.updateArm(mouse);
    this.updateBullets(mouse);
  }

  updateArm(mouse) {
    const theta = Utility.getTheta(this.x, mouse.worldX, this.y, mouse.worldY);

    const dr = this.radius - this.arm.radius;

    this.arm.x = this.x + (dr * Math.cos(theta));
    this.arm.y = this.y + (dr * Math.sin(theta));
  }

  updateBullets(mouse) {
    if (mouse.leftButtonDown() && !this.mousePressed) {
      this.bullets.push(new Bullet(this.scene, this.arm.x, this.arm.y, mouse.x, mouse.y, this.removeBullet.bind(this), 5, 0xffffff));
      this.mousePressed = true;
    }

    if (mouse.leftButtonReleased() && this.mousePressed) {
      this.mousePressed = false;
    }

    for (const bullet of [...this.bullets]) {
      bullet.update();
    }
  }
}