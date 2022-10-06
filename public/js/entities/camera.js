
/** Representation of a third person camera using spherical coords **/

class Camera {

  constructor() {

    this.position = [0, 0, 0];
    this.direction = [0, 0, 0];
    this.up = [0, 1, 0];

    this.rho = 10;
    this.phi = Math.PI / 2;
    this.theta = 0;

    this.phiMin = 0.001;
    this.phiMax = Math.PI;

    this.lastX = 0;
    this.lastY = 0;

    this.sens = 0.005;

    this.x = this.rho * Math.cos(this.theta) * Math.sin(this.phi);
    this.z = this.rho * Math.sin(this.theta) * Math.sin(this.phi);
    this.y = this.rho * Math.cos(this.phi);
  }

  move() {

  }

  orbit(entity) {

    const dx = mouse.x - this.lastX;
    const dy = mouse.y - this.lastY;

    this.lastX = mouse.x;
    this.lastY = mouse.y;

    if (mouse.down) {
      this.theta += dx * this.sens;
      this.phi -= dy * this.sens;
  
      if (this.phi < this.phiMin) this.phi = this.phiMin;
      if (this.phi > this.phiMax) this.phi = this.phiMax;
    }

    this.direction = entity.position;

    this.x = entity.position[0] + this.rho * Math.cos(this.theta) * Math.sin(this.phi);
    this.z = entity.position[2] + this.rho * Math.sin(this.theta) * Math.sin(this.phi);
    this.y = entity.position[1] + this.rho * Math.cos(this.phi);
  }

  getView() {
    const m = mat4.create();
    mat4.lookAt(m, [this.x, this.y, this.z], this.direction, this.up);
    return m;
  }
}