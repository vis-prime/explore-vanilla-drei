import{S as De,O as Te}from"./OrbitControls-BThPDOU9.js";import{T as Se}from"./TransformControls-i8oTrZWj.js";import{M as ne,O as ie,I as Ce,J as $,i as be,H as se,L as A,u as Fe,K as le,G as ce,b as de,Q as Re,d as _e,X as ze,Y as We,Z as Ie,C as ue,s as v,z as Be,_ as R,$ as Oe,F as je,a0 as Ee,a1 as Le,a2 as Ae,a3 as Ve,a4 as ke,k as Ne,W as Ge,V as He,S as Ue,A as Qe,a as Xe,c as Ye,R as qe}from"./three.module-mb-WANHP.js";import{M as N,a as Je}from"./MODEL_LIST-CtQt_fBO.js";import{B as Ke}from"./BG_ENV-Dmm91why.js";import{u as Ze}from"./tween.esm-DFB-vPb4.js";import{E as $e,R as et,a as tt,B as at}from"./index-CJeBuP8p.js";import{L as rt}from"./LoadingHelper-Bpwvv_dV.js";import{s as me}from"./shaderMaterial-BmLXph0Z.js";import"./EXRLoader-CrxFBtHm.js";import"./RGBELoader-DeKSjiHf.js";import"./GroundProjectedSkybox-ZeOOmZad.js";import"./HDRI_LIST-DJCqOZOR.js";const ot=new ie(-1,1,1,-1,0,1);class nt extends Ce{constructor(){super(),this.setAttribute("position",new $([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new $([0,2,0,0,2,0],2))}}const it=new nt;class st{constructor(t){this._mesh=new ne(it,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,ot)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}function G(e=1024,t=1024,s){var a=e,S=t,_=s||{};const{samples:y=0,depth:C,...z}=_,B=C??_.depthBuffer;var m=new be(a,S,{minFilter:A,magFilter:A,type:se,...z});return B&&(m.depthTexture=new Fe(a,S,le)),m.samples=y,m}const lt=e=>e?.isVector3;function ee(e=je){const t={value:new R};return Object.assign(new ke({side:e}),{viewMatrix:t,onBeforeCompile:s=>{s.uniforms.viewMatrix=t,s.fragmentShader=`vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
           return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
         }
`+s.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
           normal = inverseTransformDirection( normal, viewMatrix );
`)}})}const ct=me({causticsTexture:null,causticsTextureB:null,color:new ue,lightProjMatrix:new R,lightViewMatrix:new R},`varying vec3 vWorldPosition;   
   void main() {
     gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
     vec4 worldPosition = modelMatrix * vec4(position, 1.);
     vWorldPosition = worldPosition.xyz;
   }`,`varying vec3 vWorldPosition;
  uniform vec3 color;
  uniform sampler2D causticsTexture; 
  uniform sampler2D causticsTextureB; 
  uniform mat4 lightProjMatrix;
  uniform mat4 lightViewMatrix;
   void main() {
    // Apply caustics  
    vec4 lightSpacePos = lightProjMatrix * lightViewMatrix * vec4(vWorldPosition, 1.0);
    lightSpacePos.xyz /= lightSpacePos.w;
    lightSpacePos.xyz = lightSpacePos.xyz * 0.5 + 0.5; 
    vec3 front = texture2D(causticsTexture, lightSpacePos.xy).rgb;
    vec3 back = texture2D(causticsTextureB, lightSpacePos.xy).rgb;
    gl_FragColor = vec4((front + back) * color, 1.0);
    #include <tonemapping_fragment>
    #include <${parseInt(Be.replace(/\D+/g,""))>=154?"colorspace_fragment":"encodings_fragment"}>
   }`),dt=me({cameraMatrixWorld:new R,cameraProjectionMatrixInv:new R,normalTexture:null,depthTexture:null,lightDir:new v(0,1,0),lightPlaneNormal:new v(0,1,0),lightPlaneConstant:0,near:.1,far:100,modelMatrix:new R,worldRadius:1/40,ior:1.1,bounces:0,resolution:1024,size:10,intensity:.5},`
  varying vec2 vUv;
  void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,`  
  uniform mat4 cameraMatrixWorld;
  uniform mat4 cameraProjectionMatrixInv;
  uniform vec3 lightDir;
  uniform vec3 lightPlaneNormal;
  uniform float lightPlaneConstant;
  uniform float near;
  uniform float far;
  uniform float time;
  uniform float worldRadius;
  uniform float resolution;
  uniform float size;
  uniform float intensity;
  uniform float ior;
  precision highp isampler2D;
  precision highp usampler2D;
  uniform sampler2D normalTexture;
  uniform sampler2D depthTexture;
  uniform float bounces;
  varying vec2 vUv;
  vec3 WorldPosFromDepth(float depth, vec2 coord) {
    float z = depth * 2.0 - 1.0;
    vec4 clipSpacePosition = vec4(coord * 2.0 - 1.0, z, 1.0);
    vec4 viewSpacePosition = cameraProjectionMatrixInv * clipSpacePosition;
    // Perspective division
    viewSpacePosition /= viewSpacePosition.w;
    vec4 worldSpacePosition = cameraMatrixWorld * viewSpacePosition;
    return worldSpacePosition.xyz;
  }                  
  float sdPlane( vec3 p, vec3 n, float h ) {
    // n must be normalized
    return dot(p,n) + h;
  }
  float planeIntersect( vec3 ro, vec3 rd, vec4 p ) {
    return -(dot(ro,p.xyz)+p.w)/dot(rd,p.xyz);
  }
  vec3 totalInternalReflection(vec3 ro, vec3 rd, vec3 pos, vec3 normal, float ior, out vec3 rayOrigin, out vec3 rayDirection) {
    rayOrigin = ro;
    rayDirection = rd;
    rayDirection = refract(rayDirection, normal, 1.0 / ior);
    rayOrigin = pos + rayDirection * 0.1;
    return rayDirection;
  }
  void main() {
    // Each sample consists of random offset in the x and y direction
    float caustic = 0.0;
    float causticTexelSize = (1.0 / resolution) * size * 2.0;
    float texelsNeeded = worldRadius / causticTexelSize;
    float sampleRadius = texelsNeeded / resolution;
    float sum = 0.0;
    if (texture2D(depthTexture, vUv).x == 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }
    vec2 offset1 = vec2(-0.5, -0.5);//vec2(rand() - 0.5, rand() - 0.5);
    vec2 offset2 = vec2(-0.5, 0.5);//vec2(rand() - 0.5, rand() - 0.5);
    vec2 offset3 = vec2(0.5, 0.5);//vec2(rand() - 0.5, rand() - 0.5);
    vec2 offset4 = vec2(0.5, -0.5);//vec2(rand() - 0.5, rand() - 0.5);
    vec2 uv1 = vUv + offset1 * sampleRadius;
    vec2 uv2 = vUv + offset2 * sampleRadius;
    vec2 uv3 = vUv + offset3 * sampleRadius;
    vec2 uv4 = vUv + offset4 * sampleRadius;
    vec3 normal1 = texture2D(normalTexture, uv1, -10.0).rgb * 2.0 - 1.0;
    vec3 normal2 = texture2D(normalTexture, uv2, -10.0).rgb * 2.0 - 1.0;
    vec3 normal3 = texture2D(normalTexture, uv3, -10.0).rgb * 2.0 - 1.0;
    vec3 normal4 = texture2D(normalTexture, uv4, -10.0).rgb * 2.0 - 1.0;
    float depth1 = texture2D(depthTexture, uv1, -10.0).x;
    float depth2 = texture2D(depthTexture, uv2, -10.0).x;
    float depth3 = texture2D(depthTexture, uv3, -10.0).x;
    float depth4 = texture2D(depthTexture, uv4, -10.0).x;
    // Sanity check the depths
    if (depth1 == 1.0 || depth2 == 1.0 || depth3 == 1.0 || depth4 == 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }
    vec3 pos1 = WorldPosFromDepth(depth1, uv1);
    vec3 pos2 = WorldPosFromDepth(depth2, uv2);
    vec3 pos3 = WorldPosFromDepth(depth3, uv3);
    vec3 pos4 = WorldPosFromDepth(depth4, uv4);
    vec3 originPos1 = WorldPosFromDepth(0.0, uv1);
    vec3 originPos2 = WorldPosFromDepth(0.0, uv2);
    vec3 originPos3 = WorldPosFromDepth(0.0, uv3);
    vec3 originPos4 = WorldPosFromDepth(0.0, uv4);
    vec3 endPos1, endPos2, endPos3, endPos4;
    vec3 endDir1, endDir2, endDir3, endDir4;
    totalInternalReflection(originPos1, lightDir, pos1, normal1, ior, endPos1, endDir1);
    totalInternalReflection(originPos2, lightDir, pos2, normal2, ior, endPos2, endDir2);
    totalInternalReflection(originPos3, lightDir, pos3, normal3, ior, endPos3, endDir3);
    totalInternalReflection(originPos4, lightDir, pos4, normal4, ior, endPos4, endDir4);
    float lightPosArea = length(cross(originPos2 - originPos1, originPos3 - originPos1)) + length(cross(originPos3 - originPos1, originPos4 - originPos1));
    float t1 = planeIntersect(endPos1, endDir1, vec4(lightPlaneNormal, lightPlaneConstant));
    float t2 = planeIntersect(endPos2, endDir2, vec4(lightPlaneNormal, lightPlaneConstant));
    float t3 = planeIntersect(endPos3, endDir3, vec4(lightPlaneNormal, lightPlaneConstant));
    float t4 = planeIntersect(endPos4, endDir4, vec4(lightPlaneNormal, lightPlaneConstant));
    vec3 finalPos1 = endPos1 + endDir1 * t1;
    vec3 finalPos2 = endPos2 + endDir2 * t2;
    vec3 finalPos3 = endPos3 + endDir3 * t3;
    vec3 finalPos4 = endPos4 + endDir4 * t4;
    float finalArea = length(cross(finalPos2 - finalPos1, finalPos3 - finalPos1)) + length(cross(finalPos3 - finalPos1, finalPos4 - finalPos1));
    caustic += intensity * (lightPosArea / finalArea);
    // Calculate the area of the triangle in light spaces
    gl_FragColor = vec4(vec3(max(caustic, 0.0)), 1.0);
  }`),te={depthBuffer:!0,minFilter:A,magFilter:A,type:Ve},Y={minFilter:Oe,magFilter:A,type:le,generateMipmaps:!0};function ut(e){const t=ee(),s=ee(Ne),a=new dt,S=new st(a);let _=0;const y=new v,C=new Ee,z=new R,B=new Le,m=new v,O=new v,o=new Ae,h=new v,l=[],W=[],g=[],k=[],j=new v;for(let p=0;p<8;p++)l.push(new v),W.push(new v),g.push(new v),k.push(new v);return function(d){const{params:i,helper:b,camera:n,plane:x,normalTarget:E,normalTargetB:U,causticsTarget:ve,causticsTargetB:he,scene:P,group:ge}=e();if(i.frames===1/0||i.frames&&_++<i.frames){var K;lt(i.lightSource)?m.copy(i.lightSource).normalize():i.lightSource&&m.copy(ge.worldToLocal(i.lightSource.getWorldPosition(y)).normalize()),O.copy(m).multiplyScalar(-1),(K=P.parent)==null||K.matrixWorld.identity(),o.setFromObject(P,!0),l[0].set(o.min.x,o.min.y,o.min.z),l[1].set(o.min.x,o.min.y,o.max.z),l[2].set(o.min.x,o.max.y,o.min.z),l[3].set(o.min.x,o.max.y,o.max.z),l[4].set(o.max.x,o.min.y,o.min.z),l[5].set(o.max.x,o.min.y,o.max.z),l[6].set(o.max.x,o.max.y,o.min.z),l[7].set(o.max.x,o.max.y,o.max.z);for(let r=0;r<8;r++)W[r].copy(l[r]);o.getCenter(h),l.map(r=>r.sub(h));const xe=B.set(O,0);l.map((r,u)=>xe.projectPoint(r,g[u]));const Pe=g.reduce((r,u)=>r.add(u),y.set(0,0,0)).divideScalar(g.length),I=g.map(r=>r.distanceTo(Pe)).reduce((r,u)=>Math.max(r,u)),we=l.map(r=>r.dot(m)).reduce((r,u)=>Math.max(r,u));n.position.copy(j.copy(m).multiplyScalar(we).add(h)),n.lookAt(P.localToWorld(h));const ye=z.lookAt(n.position,h,y.set(0,1,0));if(n.left=-I,n.right=I,n.top=I,n.bottom=-I,i.near&&(n.near=i.near),i.far)n.far=i.far;else{const r=y.set(0,I,0).applyMatrix4(ye),u=(n.position.y+r.y)/m.y;n.far=u}n.updateProjectionMatrix(),n.updateMatrixWorld();const Q=W.map((r,u)=>r.add(k[u].copy(m).multiplyScalar(-r.y/m.y))),X=Q.reduce((r,u)=>r.add(u),y.set(0,0,0)).divideScalar(Q.length),Me=2*Q.map(r=>Math.hypot(r.x-X.x,r.z-X.z)).reduce((r,u)=>Math.max(r,u));x.scale.setScalar(Me),x.position.copy(X),b!=null&&b.parent&&b.update(),s.viewMatrix.value=t.viewMatrix.value=n.matrixWorldInverse;const Z=C.setFromProjectionMatrix(z.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse)).planes[4];a.cameraMatrixWorld=n.matrixWorld,a.cameraProjectionMatrixInv=n.projectionMatrixInverse,a.lightDir=O,a.lightPlaneNormal=Z.normal,a.lightPlaneConstant=Z.constant,a.near=n.near,a.far=n.far,i.resolution&&(a.resolution=i.resolution),a.size=I,i.intensity&&(a.intensity=i.intensity),i.worldRadius&&(a.worldRadius=i.worldRadius),P.visible=!0,d.setRenderTarget(E),d.clear(),P.overrideMaterial=t,d.render(P,n),d.setRenderTarget(U),d.clear(),i.backside&&(P.overrideMaterial=s,d.render(P,n)),P.overrideMaterial=null,i.ior&&(a.ior=i.ior),x.material.lightProjMatrix=n.projectionMatrix,x.material.lightViewMatrix=n.matrixWorldInverse,a.normalTexture=E.texture,a.depthTexture=E.depthTexture,d.setRenderTarget(ve),d.clear(),S.render(d),i.backsideIOR&&(a.ior=i.backsideIOR),a.normalTexture=U.texture,a.depthTexture=U.depthTexture,d.setRenderTarget(he),d.clear(),i.backside&&S.render(d),d.setRenderTarget(null),i.causticsOnly&&(P.visible=!1)}}}const mt=(e,{frames:t=1,causticsOnly:s=!1,ior:a=1.1,backside:S=!1,backsideIOR:_=1.1,worldRadius:y=.3125,color:C=new ue("white"),intensity:z=.05,resolution:B=2024,lightSource:m=new v(1,1,1),near:O=.1,far:o=0}={})=>{const h={frames:t,ior:a,color:C,causticsOnly:s,backside:S,backsideIOR:_,worldRadius:y,intensity:z,resolution:B,lightSource:m,near:O,far:o},l=new ce;l.name="caustics_group";const W=new ie,g=new de;g.name="caustics_scene";const k=e,j=new Re(W);j.name="caustics_helper";const p=h.resolution,d=G(p,p,te),i=G(p,p,te);e.extensions.get("OES_texture_float_linear")||(console.warn("Caustics: OES_texture_float_linear extension is not supported, using HalfFloatType instead."),Y.type=se);const b=G(p,p,Y),n=G(p,p,Y),x=new ne(new _e(1,1),new ct({transparent:!0,color:h.color,causticsTexture:b.texture,causticsTextureB:n.texture,blending:Ie,blendSrc:We,blendDst:ze,depthWrite:!1}));x.name="caustics_plane",x.rotation.x=-Math.PI/2,x.renderOrder=2,l.add(g,x),l.updateWorldMatrix(!1,!0);const E=ut(()=>({params:h,scene:g,group:l,camera:W,plane:x,normalTarget:d,normalTargetB:i,causticsTarget:b,causticsTargetB:n,helper:j}));return{scene:g,group:l,helper:j,params:h,update:E.bind({},k),normalTarget:d,normalTargetB:i,causticsTarget:b,causticsTargetB:n}};let J,f,L,w,M,T,V,ae=new Ye;const pt=new ce;let D;new qe;let q;const pe={Vase:N.vase,Monkey:N.monkey,Bunny:N.bunny,Porsche:N.porsche_1975},H={model:pe.Porsche},re={};let F;const ft=new rt;async function It(e){V=e,q=V.addFolder("Scene"),J=new De,app.appendChild(J.dom),f=new Ge({antialias:!1,alpha:!0}),f.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),f.setSize(window.innerWidth,window.innerHeight),f.shadowMap.enabled=!0,f.shadowMap.type=He,f.outputColorSpace=Ue,f.toneMapping=Qe,app.appendChild(f.domElement),w=new Xe(50,window.innerWidth/window.innerHeight,.1,500),w.position.set(-5,5,5),w.name="Camera",M=new de,M.add(pt),L=new $e(f,{multisampling:4}),L.addPass(new et(M,w)),L.addPass(new tt(w,new at({mipmapBlur:!0,luminanceThreshold:.9}))),T=new Te(w,f.domElement),T.enableDamping=!0,T.dampingFactor=.05,T.minDistance=.1,T.maxDistance=400,T.target.set(0,.5,0),D=new Se(w,f.domElement),D.addEventListener("dragging-changed",a=>{T.enabled=!a.value,a.value}),D.addEventListener("change",()=>{D.object&&D.object.position.y<0&&(D.object.position.y=0)}),M.add(D.getHelper()),window.addEventListener("resize",vt),document.addEventListener("pointermove",oe);let t=Date.now();app.addEventListener("pointerdown",()=>{t=Date.now()}),app.addEventListener("pointerup",a=>{Date.now()-t<200&&oe(a)}),q.add(D,"mode",["translate","rotate","scale"]);const s=new Ke(M,{loadingHelper:ft});s.setBGType("Default"),s.setEnvType("HDRI"),s.addGui(q),await Promise.all([s.updateAll(),gt()]),M.backgroundBlurriness=.4,M.backgroundIntensity=.2,xt(),fe()}function vt(){w.aspect=window.innerWidth/window.innerHeight,w.updateProjectionMatrix(),L.setSize(window.innerWidth,window.innerHeight)}function ht(){J.update(),Ze(),T.update(),c&&c.update(),L.render(M,w)}function fe(){requestAnimationFrame(fe),ht()}function oe(e){ae.x=e.clientX/window.innerWidth*2-1,ae.y=-(e.clientY/window.innerHeight)*2+1}async function gt(){const e=async()=>{let t=re[H.model.url];t||(t=await Je(H.model.url),re[H.model.url]=t),t.scene.traverse(a=>{a.frustumCulled=!1});let s;F&&(s=F.parent,F.removeFromParent()),s&&s.add(t.scene),F=t.scene};V.add(H,"model",pe).onChange(async t=>{await e()}),await e(),V.add(F.scale,"x",1e-4,3).name("model scale").onChange(t=>{F.scale.setScalar(t)})}let c;async function xt(){c=mt(f,{frames:1/0,worldRadius:.01}),M.add(c.group,c.helper),c.scene.add(F),Pt()}function Pt(){const e=V.addFolder("Caustics");e.open(),e.addColor(c.params,"color"),e.add(c.params,"ior",0,Math.PI),e.add(c.params,"far",0,5),e.add(c.helper,"visible").name("helper"),e.add(c.params,"backside").onChange(t=>{t||c.causticsTargetB.dispose()}),e.add(c.params,"backsideIOR",0,Math.PI),e.add(c.params,"worldRadius",0,.05),e.add(c.params,"intensity",0,1),e.add(c.params,"causticsOnly"),e.add(c.params.lightSource,"x",-1,1),e.add(c.params.lightSource,"y",.1,10),e.add(c.params.lightSource,"z",-1,1)}export{It as default};
