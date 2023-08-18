var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');

// VertexShader Source Code
var vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0, 1);
  }
`;

// FragmentShader Source Code for First  Circle (White)
var fragmentShaderSource1 = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(0, 0, 0, 0);
  }
`;

// FragmentShader Source Code for Second Circle (Red)
var fragmentShaderSource2 = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1, 0, 0, 1);
  }
`;
// Create Programs for White Circle
const program1 = createProgram(vertexShaderSource, fragmentShaderSource1);

// Create Programs for Red Circle
const program2 = createProgram(vertexShaderSource, fragmentShaderSource2);

function createProgram(vertexShaderSource, fragmentShaderSource) {
    // Create Vertex Shaders
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error('Error compiling vertex shader:', gl.getShaderInfoLog(vertexShader));
      return null;
    }
  
    // Create Fragment Shaders
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Error compiling fragment shader:', gl.getShaderInfoLog(fragmentShader));
      return null;
    }
  
    // Compoile
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Error linking program:', gl.getProgramInfoLog(program));
      return null;
    }
  
    return program;
  }
  
// Circle Data
var numSegments = 50; // Segments
var radius = 0.3; // White Circle's radius
var radius2 = 0.23; // Red Circle's radius
var anglePerSegment = 2 * Math.PI / numSegments;

// Create Vertex //// White Circle
var positions1 = [];
for (let i = 0; i <= numSegments; i++) {
  var angle = i * anglePerSegment;
  var x = radius * Math.cos(angle) -0.35;
  var y = radius * Math.sin(angle);
  positions1.push(x, y);
}

// Create Vertex //// Red Circle
var positions2 = [];
for (let i = 0; i <= numSegments; i++) {
  var angle = i * anglePerSegment;
  var x = 0.1 + radius2 * Math.cos(angle) - 0.36;
  var y = radius2 * Math.sin(angle);
  positions2.push(x, y);
}

// Create Buffer
var buffer1 = gl.createBuffer();
var buffer2 = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER,buffer1);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions1), gl.STATIC_DRAW);

gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions2), gl.STATIC_DRAW);

// Draw First Circle
gl.useProgram(program1);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer1);
var a_position1 = gl.getAttribLocation(program1, 'a_position');
gl.enableVertexAttribArray(a_position1);
gl.vertexAttribPointer(a_position1, 2, gl.FLOAT, false, 0, 0);
gl.drawArrays(gl.TRIANGLE_FAN, 0, positions1.length / 2);

// Draw Second Circle
gl.useProgram(program2);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
var a_position2 = gl.getAttribLocation(program2, 'a_position');
gl.enableVertexAttribArray(a_position2);
gl.vertexAttribPointer(a_position2, 2, gl.FLOAT, false, 0, 0);
gl.drawArrays(gl.TRIANGLE_FAN, 0, positions2.length / 2);