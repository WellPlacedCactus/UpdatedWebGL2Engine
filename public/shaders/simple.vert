#version 300 es

layout(location = 0) in vec3 vPosition;
layout(location = 1) in vec3 vNormal;

out vec3 fPosition;
out vec3 fNormal;

uniform mat4 proj;
uniform mat4 view;
uniform mat4 model;

void main()
{
  gl_Position = proj * view * model * vec4(vPosition, 1.0);
  fPosition = (model * vec4(vPosition, 1.0)).xyz;
  fNormal = (model * vec4(vNormal, 0.0)).xyz;
}