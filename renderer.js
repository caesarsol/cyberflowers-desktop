document.body.style.overflow = 'hidden'
document.body.style.width = '100vw'
document.body.style.height = '100vh'
document.body.style.margin = '0'
document.body.style.padding = '0'
document.body.style.background = 'steelblue'

const regl = require('regl')()
const mat4 = require('gl-mat4')
const sphere = require('primitive-icosphere')
const camera = require('lookat-camera')()

const mesh = sphere(10)

const drawSphere = regl({
  frag: `
    precision mediump float;
    uniform vec3 color;
    void main () {
      gl_FragColor = vec4(color, 1.0);
    }`,
  vert: `
    precision mediump float;
    uniform mat4 proj;
    uniform mat4 model;
    uniform mat4 view;
    attribute vec3 position;
    void main () {
      gl_Position = proj * view * model * vec4(position, 1.0);
      gl_PointSize = 10.0;
    }`,
  attributes: {
    position: regl.buffer(mesh.positions)
  },
  elements: regl.elements(mesh.cells),
  uniforms: {
    proj: mat4.perspective([], Math.PI / 2, window.innerWidth / window.innerHeight, 0.01, 1000),
    model: regl.prop('model'),
    view: regl.prop('view'),
    color: regl.prop('color')
  }
})

var scale = 0.1

regl.frame(function (props, context) {
  regl.clear({
    color: [0, 0, 0, 1]
  })

  camera.position = [0, 5, 0]
  camera.target = [0, 0, 0]
  camera.up = [0, 0, 1]

  drawSphere({
    view: camera.view(),
    color: [1, 0, 0],
    model: mat4.scale(mat4.identity([]), mat4.identity([]), [scale, scale, scale])
  })
})
