
/** Representation of an object in world space **/

class Entity {

  constructor(position, rotation, scale, color) {
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
    this.color = color;
  }

  getModel() {
    const m = mat4.create();
    mat4.translate(m, m, this.position);
    mat4.rotate(m, m, this.rotation[0], [1, 0, 0]);
    mat4.rotate(m, m, this.rotation[1], [0, 1, 0]);
    mat4.rotate(m, m, this.rotation[2], [0, 0, 1]);
    mat4.scale(m, m, this.scale);
    return m;
  }
}