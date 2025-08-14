import{x as o,y as t,c as i,C as r,s as a}from"./three.module-mb-WANHP.js";import{s as n}from"./shaderMaterial-BmLXph0Z.js";import{v as l}from"./constants-9lyQ_GmL.js";const f=n({depth:null,opacity:1,attenuation:2.5,anglePower:12,spotPosition:new a(0,0,0),lightColor:new r("white"),cameraNear:0,cameraFar:1,resolution:new i(0,0),transparent:!0,depthWrite:!1},`
  varying vec3 vNormal;
  varying float vViewZ;
  varying float vIntensity;
  uniform vec3 spotPosition;
  uniform float attenuation;

  #include <fog_pars_vertex>
  #include <common>
  #include <logdepthbuf_pars_vertex>
  
  void main() {
  	#include <begin_vertex>
    #include <project_vertex>
    #include <fog_vertex>

    // compute intensity
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1);
    vec4 viewPosition = viewMatrix * worldPosition;
    vViewZ = viewPosition.z;

    vIntensity = 1.0 - saturate(distance(worldPosition.xyz, spotPosition) / attenuation);

    gl_Position = projectionMatrix * viewPosition;

    #include <logdepthbuf_vertex>
  }`,`
  varying vec3 vNormal;
  varying float vViewZ;
  varying float vIntensity;

  uniform vec3 lightColor;
  uniform float anglePower;
  uniform sampler2D depth;
  uniform vec2 resolution;
  uniform float cameraNear;
  uniform float cameraFar;
  uniform float opacity;

  #include <fog_pars_fragment>
  #include <packing>
  #include <logdepthbuf_pars_fragment>

  float readDepth(sampler2D depthSampler, vec2 uv) {
    float fragCoordZ = texture(depthSampler, uv).r;

    // https://github.com/mrdoob/three.js/issues/23072
    #ifdef USE_LOGDEPTHBUF
      float viewZ = 1.0 - exp2(fragCoordZ * log(cameraFar + 1.0) / log(2.0));
    #else
      float viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);
    #endif

    return viewZ;
  }

 void main() {
    #include <logdepthbuf_fragment>

    vec3 normal = vec3(vNormal.x, vNormal.y, abs(vNormal.z));
    float angleIntensity = pow(dot(normal, vec3(0, 0, 1)), anglePower);
    float intensity = vIntensity * angleIntensity;

    // fades when z is close to sampled depth, meaning the cone is intersecting existing geometry
    bool isSoft = resolution[0] > 0.0 && resolution[1] > 0.0;
    if (isSoft) {
      vec2 uv = gl_FragCoord.xy / resolution;
      intensity *= smoothstep(0.0, 1.0, vViewZ - readDepth(depth, uv));
    }

    gl_FragColor = vec4(lightColor, intensity * opacity);

    #include <tonemapping_fragment>
    #include <${l>=154?"colorspace_fragment":"encodings_fragment"}>
    #include <fog_fragment>
  }`,e=>{Object.assign(e.uniforms,o.merge([t.fog]))});export{f as S};
