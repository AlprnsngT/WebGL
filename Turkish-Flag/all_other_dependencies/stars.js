// Canvas
var canvas = document.querySelector('canvas');

// WebGL Connection
var gl = canvas.getContext('webgl');

// VertexShader Source Code
var vertexShaderSource = `
  attribute vec2 aPosition;
  
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

// FragmentShader Source Code
var fragmentShaderSource = `
  precision mediump float;
  
  uniform vec4 uColor;
  
  void main() {
    gl_FragColor = uColor;
  }
`;

// Create Shaders
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// Create Programs
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

// Vertex Buffers
var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

// Vertex_Position
var positionAttributeLocation = gl.getAttribLocation(program, 'aPosition');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

var colorUniformLocation = gl.getUniformLocation(program, 'uColor');

// Use two traingles for Turkish Flag Backround
// Use three triangles for Turkish Flag Stars
var triangles = [
  { vertices: [-0.9, 0.6,
    0.9, -0.6,
    0.9, 0.6], color: [1.0, 0.0, 0.0, 1.0] }, // First Triangle for Backround
  { vertices: [-0.9, 0.6,
    -0.9, -0.6,
    0.9, -0.6], color: [1.0, 0.0, 0.0, 1.0] }, // Second Triangle for Backround
  { vertices: [-0.041, 0.013, 
    0.222, -0.071,
     0.122, 0.069], color: [0.0, 0.0, 0.0, 0.0] }, // Pentagon Star 1
  { vertices: [0.058, -0.123,
     0.059, 0.049, 
     0.223, 0.102], color: [0.0, 0.0, 0.0, 0.0] }, // Pentagon Star 2
  { vertices: [0.056, 0.155,
    0.222, -0.0716,
     0.056, -0.018], color: [0.0, 0.0, 0.0, 0.0] } // Pentagon Star 3
];

triangles.forEach((triangle) => {
  // Upload Vertex Data
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle.vertices), gl.STATIC_DRAW);
  
  // Setup Triangles Colors
  gl.uniform4fv(colorUniformLocation, triangle.color);
  
  // Draw Triangles
  gl.drawArrays(gl.TRIANGLES, 0, 3);
});