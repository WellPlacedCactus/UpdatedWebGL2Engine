
/** Used to render models and generate projection matrix **/

class Renderer {

  constructor() {
    this.fov = 60.0;
    this.zNear = 0.001;
    this.zFar = 1000.0;

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.clearColor(0, 0, 0, 1);
  }

  prepare() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  render(model, entities, shader) {
    gl.bindVertexArray(model[0]);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model[1]);
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);

    entities.forEach(e => {
      shader.setMatrix('model', e.getModel());
      shader.setVec3('objectColor', e.color);
      gl.drawElements(gl.TRIANGLES, model[2], gl.UNSIGNED_SHORT, 0);
    });
    
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindVertexArray(null);
  }

  getProj() {
    const m = mat4.create();
    mat4.perspective(m, this.fov * Math.PI / 180, innerWidth / innerHeight, this.zNear, this.zFar);
    return m;
  }
}