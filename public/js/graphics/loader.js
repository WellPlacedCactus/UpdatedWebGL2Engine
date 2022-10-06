
/** Loads buffer data **/

class Loader {

  constructor() {}

  loadTextFromFile(file) {
    return new Promise(async (resolve) => {
      const response = await fetch(file);
      resolve(response.text());
    });
  }

  loadModel(positions, normals, indices) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    this.loadVBO(0, 3, positions, false);
    this.loadVBO(1, 3, normals, true);
    gl.bindVertexArray(null);
    const ebo = this.loadEBO(indices);
    return [vao, ebo, indices.length];
  }

  loadVBO(position, size, data, normalized) {
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(position, size, gl.FLOAT, normalized, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  loadEBO(indices) {
    const ebo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return ebo;
  }
}