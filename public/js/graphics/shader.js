
/** Handles all things related to shaders **/

class Shader {

  constructor(vsSource, fsSource) {
    this.program = this.loadProgram(
      this.loadShader(vsSource, gl.VERTEX_SHADER),
      this.loadShader(fsSource, gl.FRAGMENT_SHADER)
    );
  }

  loadShader(source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log(gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  loadProgram(vs, fs) {
    if (vs == null || fs == null) return;
    const p = gl.createProgram();
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.log(gl.getProgramInfoLog(p));
      return null;
    }
    gl.detachShader(p, vs);
    gl.detachShader(p, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return p;
  }

  bind() { gl.useProgram(this.program); }

  unbind() { gl.useProgram(null); }

  setMatrix(name, value) {
    const location = gl.getUniformLocation(this.program, name);
    gl.uniformMatrix4fv(location, false, value);
  }

  setVec3(name, value) {
    const location = gl.getUniformLocation(this.program, name);
    gl.uniform3fv(location, value);
  }
}