document.body.style.overflow = 'hidden'
document.body.style.width = '100vw'
document.body.style.height = '100vh'
document.body.style.margin = '0'
document.body.style.padding = '0'
document.body.style.background = 'steelblue'

const regl = require('regl')()

const drawTriangle = regl({
  frag: `
  void main() {
    gl_FragColor = vec4(1, 0, 0, 1);
  }`,

  vert: `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0, 1);
  }`,

  attributes: {
    position: [[0, -1], [-1, 0], [1, 1]]
  },

  count: 3
})

drawTriangle()
