#version 300 es

precision highp float;

in vec3 fPosition;
in vec3 fNormal;

out vec4 finalColor;

uniform vec3 lightPosition;
uniform vec3 objectColor;

float calculateLight()
{
  vec3 normal = normalize(fNormal);
  vec3 positionToLight = normalize(lightPosition - fPosition);
  float light = dot(normal, positionToLight);
  return light;
}

void main()
{
  finalColor = vec4(objectColor * calculateLight(), 1.0);
}