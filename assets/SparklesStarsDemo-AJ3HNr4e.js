import{aR as J,I as G,o as M,C as x,ao as c,ae as H,c as S,s as P,ap as ft,aS as vt,aT as gt,_ as yt,y as wt,z as bt,G as O,aF as B,aM as At,M as U,aU as xt,W as Ct,S as _t,A as Mt,a as Pt,b as St,E as Ft,R as zt,aV as K,h as Dt,f as Rt,r as Tt,g as N,aW as Lt,aX as Wt}from"./three.module-CpOMtsua.js";import{S as Gt,O as Ot,G as Ut,D as Vt}from"./OrbitControls-FqkbUa6U.js";import{H as jt}from"./HDRLoader-CNYvXwJL.js";import{T as kt}from"./TransformControls-DIS8GcSd.js";import{M as It}from"./MODEL_LIST-Bh-xXQZi.js";import{H as Et}from"./HDRI_LIST-DJCqOZOR.js";import{G as Ht}from"./tween.esm-DFB-vPb4.js";import{v as Q}from"./constants-CSM6w_Ou.js";class Bt extends H{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
        uniform float pixelRatio;
        uniform float time;
        attribute float size;  
        attribute float speed;  
        attribute float opacity;
        attribute vec3 noise;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
          modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
          modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPostion = projectionMatrix * viewPosition;
          gl_Position = projectionPostion;
          gl_PointSize = size * 25. * pixelRatio;
          gl_PointSize *= (1.0 / - viewPosition.z);
          vColor = color;
          vOpacity = opacity;
        }
      `,fragmentShader:`
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(vColor, strength * vOpacity);
          #include <tonemapping_fragment>
          #include <${Q>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(t){this.uniforms.time.value=t}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(t){this.uniforms.pixelRatio.value=t}}const Z=a=>a&&a.constructor===Float32Array,Nt=a=>[a.r,a.g,a.b],tt=a=>a instanceof S||a instanceof P||a instanceof ft,et=a=>Array.isArray(a)?a:tt(a)?a.toArray():[a,a,a];function L(a,t,e){if(t!==void 0){if(Z(t))return t;if(t instanceof x){const i=Array.from({length:a*3},()=>Nt(t)).flat();return Float32Array.from(i)}else if(tt(t)||Array.isArray(t)){const i=Array.from({length:a*3},()=>et(t)).flat();return Float32Array.from(i)}return Float32Array.from({length:a},()=>t)}return Float32Array.from({length:a},e)}class it extends J{constructor({noise:t=1,count:e=100,speed:i=1,opacity:s=1,scale:r=1,size:o,color:n}={}){super(new G,new Bt);const u=this.material;u.transparent=!0,u.depthWrite=!1,this.rebuildAttributes({count:e,size:o,opacity:s,speed:i,scale:r,noise:t,color:n})}setPixelRatio(t){const e=this.material;e.pixelRatio=t}rebuildAttributes({noise:t=1,count:e=100,speed:i=1,opacity:s=1,scale:r=1,size:o,color:n}={}){const u=et(r),h=Float32Array.from(Array.from({length:e},()=>u.map(M.randFloatSpread)).flat()),p=L(e,o,Math.random),f=L(e,s),m=L(e,i),g=L(e*3,t),R=L(n===void 0?e*3:e,Z(n)?n:new x(n),()=>1);this.geometry.setAttribute("position",new c(h,3)),this.geometry.setAttribute("size",new c(p,1)),this.geometry.setAttribute("opacity",new c(f,1)),this.geometry.setAttribute("speed",new c(m,1)),this.geometry.setAttribute("color",new c(R,3)),this.geometry.setAttribute("noise",new c(g,3))}update(t){this.material.time=t}}class $t extends H{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${Q>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const qt=a=>new P().setFromSpherical(new gt(a,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI));class Xt extends J{constructor({radius:t=100,depth:e=50,count:i=5e3,saturation:s=0,factor:r=4,fade:o=!1,speed:n=1}={}){super(new G,new $t),this.speed=n;const u=this.material;u.blending=vt,u.uniforms.fade.value=o,u.depthWrite=!1,u.transparent=!0,u.vertexColors=!0,u.needsUpdate=!0,this.rebuildAttributes({radius:t,depth:e,count:i,saturation:s,factor:r,fade:o})}rebuildAttributes({radius:t=100,depth:e=50,count:i=5e3,saturation:s=0,factor:r=4,fade:o=!1,speed:n=1}){this.speed=n;const u=this.material;u.uniforms.fade.value=o;const h=[],p=[],f=Array.from({length:i},()=>(.5+.5*Math.random())*r),m=new x;let g=t+e;const R=e/i;for(let T=0;T<i;T++)g-=R*Math.random(),h.push(...qt(g).toArray()),m.setHSL(T/i,s,.9),p.push(m.r,m.g,m.b);this.geometry.setAttribute("position",new c(new Float32Array(h),3)),this.geometry.setAttribute("color",new c(new Float32Array(p),3)),this.geometry.setAttribute("size",new c(new Float32Array(f),1))}update(t){const e=this.material;e.uniforms.time.value=t*this.speed}}var Yt=Object.defineProperty,Jt=(a,t,e)=>t in a?Yt(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e,l=(a,t,e)=>(Jt(a,typeof t!="symbol"?t+"":t,e),e);function V(a,t,e,i,s){let r;if(a=a.subarray||a.slice?a:a.buffer,e=e.subarray||e.slice?e:e.buffer,a=t?a.subarray?a.subarray(t,s&&t+s):a.slice(t,s&&t+s):a,e.set)e.set(a,i);else for(r=0;r<a.length;r++)e[r+i]=a[r];return e}function Kt(a){return a instanceof Float32Array?a:a instanceof G?a.getAttribute("position").array:a.map(t=>{const e=Array.isArray(t);return t instanceof P?[t.x,t.y,t.z]:t instanceof S?[t.x,t.y,0]:e&&t.length===3?[t[0],t[1],t[2]]:e&&t.length===2?[t[0],t[1],0]:t}).flat()}class Qt extends G{constructor(){super(),l(this,"type","MeshLine"),l(this,"isMeshLine",!0),l(this,"positions",[]),l(this,"previous",[]),l(this,"next",[]),l(this,"side",[]),l(this,"width",[]),l(this,"indices_array",[]),l(this,"uvs",[]),l(this,"counters",[]),l(this,"widthCallback",null),l(this,"_attributes"),l(this,"_points",[]),l(this,"points"),l(this,"matrixWorld",new yt),Object.defineProperties(this,{points:{enumerable:!0,get(){return this._points},set(t){this.setPoints(t,this.widthCallback)}}})}setMatrixWorld(t){this.matrixWorld=t}setPoints(t,e){if(t=Kt(t),this._points=t,this.widthCallback=e??null,this.positions=[],this.counters=[],t.length&&t[0]instanceof P)for(let i=0;i<t.length;i++){const s=t[i],r=i/(t.length-1);this.positions.push(s.x,s.y,s.z),this.positions.push(s.x,s.y,s.z),this.counters.push(r),this.counters.push(r)}else for(let i=0;i<t.length;i+=3){const s=i/(t.length-1);this.positions.push(t[i],t[i+1],t[i+2]),this.positions.push(t[i],t[i+1],t[i+2]),this.counters.push(s),this.counters.push(s)}this.process()}compareV3(t,e){const i=t*6,s=e*6;return this.positions[i]===this.positions[s]&&this.positions[i+1]===this.positions[s+1]&&this.positions[i+2]===this.positions[s+2]}copyV3(t){const e=t*6;return[this.positions[e],this.positions[e+1],this.positions[e+2]]}process(){const t=this.positions.length/6;this.previous=[],this.next=[],this.side=[],this.width=[],this.indices_array=[],this.uvs=[];let e,i;this.compareV3(0,t-1)?i=this.copyV3(t-2):i=this.copyV3(0),this.previous.push(i[0],i[1],i[2]),this.previous.push(i[0],i[1],i[2]);for(let s=0;s<t;s++){if(this.side.push(1),this.side.push(-1),this.widthCallback?e=this.widthCallback(s/(t-1)):e=1,this.width.push(e),this.width.push(e),this.uvs.push(s/(t-1),0),this.uvs.push(s/(t-1),1),s<t-1){i=this.copyV3(s),this.previous.push(i[0],i[1],i[2]),this.previous.push(i[0],i[1],i[2]);const r=s*2;this.indices_array.push(r,r+1,r+2),this.indices_array.push(r+2,r+1,r+3)}s>0&&(i=this.copyV3(s),this.next.push(i[0],i[1],i[2]),this.next.push(i[0],i[1],i[2]))}this.compareV3(t-1,0)?i=this.copyV3(1):i=this.copyV3(t-1),this.next.push(i[0],i[1],i[2]),this.next.push(i[0],i[1],i[2]),!this._attributes||this._attributes.position.count!==this.counters.length?this._attributes={position:new c(new Float32Array(this.positions),3),previous:new c(new Float32Array(this.previous),3),next:new c(new Float32Array(this.next),3),side:new c(new Float32Array(this.side),1),width:new c(new Float32Array(this.width),1),uv:new c(new Float32Array(this.uvs),2),index:new c(new Uint16Array(this.indices_array),1),counters:new c(new Float32Array(this.counters),1)}:(this._attributes.position.copyArray(new Float32Array(this.positions)),this._attributes.position.needsUpdate=!0,this._attributes.previous.copyArray(new Float32Array(this.previous)),this._attributes.previous.needsUpdate=!0,this._attributes.next.copyArray(new Float32Array(this.next)),this._attributes.next.needsUpdate=!0,this._attributes.side.copyArray(new Float32Array(this.side)),this._attributes.side.needsUpdate=!0,this._attributes.width.copyArray(new Float32Array(this.width)),this._attributes.width.needsUpdate=!0,this._attributes.uv.copyArray(new Float32Array(this.uvs)),this._attributes.uv.needsUpdate=!0,this._attributes.index.copyArray(new Uint16Array(this.indices_array)),this._attributes.index.needsUpdate=!0),this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setIndex(this._attributes.index),this.computeBoundingSphere(),this.computeBoundingBox()}advance({x:t,y:e,z:i}){const s=this._attributes.position.array,r=this._attributes.previous.array,o=this._attributes.next.array,n=s.length;V(s,0,r,0,n),V(s,6,s,0,n-6),s[n-6]=t,s[n-5]=e,s[n-4]=i,s[n-3]=t,s[n-2]=e,s[n-1]=i,V(s,6,o,0,n-6),o[n-6]=t,o[n-5]=e,o[n-4]=i,o[n-3]=t,o[n-2]=e,o[n-1]=i,this._attributes.position.needsUpdate=!0,this._attributes.previous.needsUpdate=!0,this._attributes.next.needsUpdate=!0}}const Zt=`
  #include <common>
  #include <logdepthbuf_pars_vertex>
  #include <fog_pars_vertex>
  #include <clipping_planes_pars_vertex>

  attribute vec3 previous;
  attribute vec3 next;
  attribute float side;
  attribute float width;
  attribute float counters;
  
  uniform vec2 resolution;
  uniform float lineWidth;
  uniform vec3 color;
  uniform float opacity;
  uniform float sizeAttenuation;
  
  varying vec2 vUV;
  varying vec4 vColor;
  varying float vCounters;
  
  vec2 fix(vec4 i, float aspect) {
    vec2 res = i.xy / i.w;
    res.x *= aspect;
    return res;
  }
  
  void main() {
    float aspect = resolution.x / resolution.y;
    vColor = vec4(color, opacity);
    vUV = uv;
    vCounters = counters;
  
    mat4 m = projectionMatrix * modelViewMatrix;
    vec4 finalPosition = m * vec4(position, 1.0) * aspect;
    vec4 prevPos = m * vec4(previous, 1.0);
    vec4 nextPos = m * vec4(next, 1.0);
  
    vec2 currentP = fix(finalPosition, aspect);
    vec2 prevP = fix(prevPos, aspect);
    vec2 nextP = fix(nextPos, aspect);
  
    float w = lineWidth * width;
  
    vec2 dir;
    if (nextP == currentP) dir = normalize(currentP - prevP);
    else if (prevP == currentP) dir = normalize(nextP - currentP);
    else {
      vec2 dir1 = normalize(currentP - prevP);
      vec2 dir2 = normalize(nextP - currentP);
      dir = normalize(dir1 + dir2);
  
      vec2 perp = vec2(-dir1.y, dir1.x);
      vec2 miter = vec2(-dir.y, dir.x);
      //w = clamp(w / dot(miter, perp), 0., 4. * lineWidth * width);
    }
  
    //vec2 normal = (cross(vec3(dir, 0.), vec3(0., 0., 1.))).xy;
    vec4 normal = vec4(-dir.y, dir.x, 0., 1.);
    normal.xy *= .5 * w;
    //normal *= projectionMatrix;
    if (sizeAttenuation == 0.) {
      normal.xy *= finalPosition.w;
      normal.xy /= (vec4(resolution, 0., 1.) * projectionMatrix).xy * aspect;
    }
  
    finalPosition.xy += normal.xy * side;
    gl_Position = finalPosition;
    #include <logdepthbuf_vertex>
    #include <fog_vertex>
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    #include <clipping_planes_vertex>
    #include <fog_vertex>
  }
`,te=parseInt(bt.replace(/\D+/g,"")),ee=te>=154?"colorspace_fragment":"encodings_fragment",ie=`
  #include <fog_pars_fragment>
  #include <logdepthbuf_pars_fragment>
  #include <clipping_planes_pars_fragment>
  
  uniform sampler2D map;
  uniform sampler2D alphaMap;
  uniform float useGradient;
  uniform float useMap;
  uniform float useAlphaMap;
  uniform float useDash;
  uniform float dashArray;
  uniform float dashOffset;
  uniform float dashRatio;
  uniform float visibility;
  uniform float alphaTest;
  uniform vec2 repeat;
  uniform vec3 gradient[2];
  
  varying vec2 vUV;
  varying vec4 vColor;
  varying float vCounters;
  
  void main() {
    #include <logdepthbuf_fragment>
    vec4 diffuseColor = vColor;
    if (useGradient == 1.) diffuseColor = vec4(mix(gradient[0], gradient[1], vCounters), 1.0);
    if (useMap == 1.) diffuseColor *= texture2D(map, vUV * repeat);
    if (useAlphaMap == 1.) diffuseColor.a *= texture2D(alphaMap, vUV * repeat).a;
    if (diffuseColor.a < alphaTest) discard;
    if (useDash == 1.) diffuseColor.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));
    diffuseColor.a *= step(vCounters, visibility);
    #include <clipping_planes_fragment>
    gl_FragColor = diffuseColor;     
    #include <fog_fragment>
    #include <tonemapping_fragment>
    #include <${ee}>
  }
`;class $ extends H{constructor(t){super({uniforms:{...wt.fog,lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},color:{value:new x(16777215)},gradient:{value:[new x(16711680),new x(65280)]},opacity:{value:1},resolution:{value:new S(1,1)},sizeAttenuation:{value:1},dashArray:{value:0},dashOffset:{value:0},dashRatio:{value:.5},useDash:{value:0},useGradient:{value:0},visibility:{value:1},alphaTest:{value:0},repeat:{value:new S(1,1)}},vertexShader:Zt,fragmentShader:ie}),l(this,"lineWidth"),l(this,"map"),l(this,"useMap"),l(this,"alphaMap"),l(this,"useAlphaMap"),l(this,"color"),l(this,"gradient"),l(this,"resolution"),l(this,"sizeAttenuation"),l(this,"dashArray"),l(this,"dashOffset"),l(this,"dashRatio"),l(this,"useDash"),l(this,"useGradient"),l(this,"visibility"),l(this,"repeat"),this.type="MeshLineMaterial",Object.defineProperties(this,{lineWidth:{enumerable:!0,get(){return this.uniforms.lineWidth.value},set(e){this.uniforms.lineWidth.value=e}},map:{enumerable:!0,get(){return this.uniforms.map.value},set(e){this.uniforms.map.value=e}},useMap:{enumerable:!0,get(){return this.uniforms.useMap.value},set(e){this.uniforms.useMap.value=e}},alphaMap:{enumerable:!0,get(){return this.uniforms.alphaMap.value},set(e){this.uniforms.alphaMap.value=e}},useAlphaMap:{enumerable:!0,get(){return this.uniforms.useAlphaMap.value},set(e){this.uniforms.useAlphaMap.value=e}},color:{enumerable:!0,get(){return this.uniforms.color.value},set(e){this.uniforms.color.value=e}},gradient:{enumerable:!0,get(){return this.uniforms.gradient.value},set(e){this.uniforms.gradient.value=e}},opacity:{enumerable:!0,get(){return this.uniforms.opacity.value},set(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get(){return this.uniforms.resolution.value},set(e){this.uniforms.resolution.value.copy(e)}},sizeAttenuation:{enumerable:!0,get(){return this.uniforms.sizeAttenuation.value},set(e){this.uniforms.sizeAttenuation.value=e}},dashArray:{enumerable:!0,get(){return this.uniforms.dashArray.value},set(e){this.uniforms.dashArray.value=e,this.useDash=e!==0?1:0}},dashOffset:{enumerable:!0,get(){return this.uniforms.dashOffset.value},set(e){this.uniforms.dashOffset.value=e}},dashRatio:{enumerable:!0,get(){return this.uniforms.dashRatio.value},set(e){this.uniforms.dashRatio.value=e}},useDash:{enumerable:!0,get(){return this.uniforms.useDash.value},set(e){this.uniforms.useDash.value=e}},useGradient:{enumerable:!0,get(){return this.uniforms.useGradient.value},set(e){this.uniforms.useGradient.value=e}},visibility:{enumerable:!0,get(){return this.uniforms.visibility.value},set(e){this.uniforms.visibility.value=e}},alphaTest:{enumerable:!0,get(){return this.uniforms.alphaTest.value},set(e){this.uniforms.alphaTest.value=e}},repeat:{enumerable:!0,get(){return this.uniforms.repeat.value},set(e){this.uniforms.repeat.value.copy(e)}}}),this.setValues(t)}copy(t){return super.copy(t),this.lineWidth=t.lineWidth,this.map=t.map,this.useMap=t.useMap,this.alphaMap=t.alphaMap,this.useAlphaMap=t.useAlphaMap,this.color.copy(t.color),this.gradient=t.gradient,this.opacity=t.opacity,this.resolution.copy(t.resolution),this.sizeAttenuation=t.sizeAttenuation,this.dashArray=t.dashArray,this.dashOffset=t.dashOffset,this.dashRatio=t.dashRatio,this.useDash=t.useDash,this.useGradient=t.useGradient,this.visibility=t.visibility,this.alphaTest=t.alphaTest,this.repeat.copy(t.repeat),this}}const y={width:.2,length:1,decay:1,local:!1,stride:0,interval:1,instanceCount:10,color:new x(16777215),attenuation:a=>a},ae=(a,t=1)=>(a.set(a.subarray(t)),a.fill(-1/0,-t),a);class at extends O{constructor(t){if(super(),!t.target)throw new Error("Trail requires a target object to follow.");const e=t.geometry||new Qt,i=t.material||new $({lineWidth:.1,sizeAttenuation:1,resolution:new S(1,1)});let s;if(t.geometry){const r=new B(e,i,t.instanceCount||y.instanceCount);r.frustumCulled=!1,r.instanceMatrix.setUsage(At),s=r}else s=new U(e,i);this.trailParams={width:t.width||y.width,length:t.length||y.length,decay:t.decay||y.decay,local:t.local||y.local,stride:t.stride||y.stride,interval:t.interval||y.interval,instanceCount:t.instanceCount||y.instanceCount,color:t.color||y.color,attenuation:t.attenuation||y.attenuation,target:t.target},this.trailData={isUsingCustomGeometry:!!t.geometry,points:new Float32Array,geometry:e,material:i,mesh:s},this.trailTemp={frameCount:0,worldPosition:new P,prevPosition:new P,tempObj:new xt,positionArray:[0,0,0]},this.rebuildTrail(t)}rebuildTrail(t){const{trailParams:e,trailData:i,trailTemp:s}=this,r=Object.fromEntries(Object.entries(t).filter(([m,g])=>g!==void 0));Object.assign(e,r);const{length:o,width:n,color:u,target:h,instanceCount:p}=e,f=o*10*3;if(h.getWorldPosition(s.worldPosition),i.points.length!==f&&(i.points=Float32Array.from({length:f},(m,g)=>s.worldPosition.getComponent(g%3))),u&&"color"in i.material&&i.material.color.set(u),i.isUsingCustomGeometry){const m=i.mesh;m.count!==p&&(m.removeFromParent(),m.dispose(),i.mesh=new B(i.geometry,i.material,p),this.updateInstances())}else i.material instanceof $&&(i.material.lineWidth=.1*n);this.trailData.mesh.parent||this.add(this.trailData.mesh)}updateSize(t,e){const i=this.trailData.material;i&&i.uniforms&&i.uniforms.resolution&&i.uniforms.resolution.value.set(t,e)}updateTrailPoints(t){const e=this.trailParams,i=this.trailData.points,s=this.trailTemp;let r=!1;const{local:o,decay:n,stride:u}=e;if(s.frameCount===0){let h;o?h=t.position:(t.getWorldPosition(s.worldPosition),h=s.worldPosition);const p=1*n;for(let f=0;f<p;f++)h.distanceTo(s.prevPosition)<u||(ae(i,3),h.toArray(s.positionArray),i.set(s.positionArray,i.length-3));s.prevPosition.copy(h),r=!0}return s.frameCount++,s.frameCount=s.frameCount%e.interval,r}updateLineMesh(){const t=this.trailData.points,e=this.trailParams.attenuation;this.trailData.geometry.setPoints(t,e)}updateInstances(){const t=this.trailData.mesh,e=this.trailTemp.tempObj,i=this.trailParams,s=this.trailData.points,r=i.width,o=s.length/3,n=t.count,u=1/n;for(let h=0;h<n;h++){const p=Math.floor(h*u*o)*3,f=s[p],m=s[p+1],g=s[p+2];e.position.set(f,m,g),e.scale.setScalar(h/n*r),e.updateMatrixWorld(),t.setMatrixAt(h,e.matrixWorld)}t.instanceMatrix.needsUpdate=!0}update(){if(!this.parent)return;const t=this.trailParams.target;this.updateTrailPoints(t)&&(this.trailData.isUsingCustomGeometry?this.updateInstances():this.updateLineMesh())}}const se=new Ht;let I,v,A,w,b,F,E=new S;const j={bgColor:new x(17),printCam:()=>{}},z=new O,re=new jt,st=new Ut,rt=new Vt;let C;rt.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");st.setDRACOLoader(rt);const q=new zt,W=[];let X,D=[];async function Ce(a){F=a,X=F.addFolder("Scene"),I=new Gt,app.appendChild(I.dom),v=new Ct({antialias:!0,powerPreference:"high-performance"}),v.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),v.setSize(window.innerWidth,window.innerHeight),v.shadowMap.enabled=!0,v.outputColorSpace=_t,v.toneMapping=Mt,app.appendChild(v.domElement),A=new Pt(50,window.innerWidth/window.innerHeight,.1,200),A.position.set(6,3,6),A.name="Camera",w=new St,w.background=j.bgColor,re.load(Et.skidpan.hdr,e=>{e.mapping=Ft,w.backgroundBlurriness=.1,w.environment=e}),w.add(z),b=new Ot(A,v.domElement),b.enableDamping=!0,b.dampingFactor=.05,b.minDistance=.1,b.maxDistance=100,b.maxPolarAngle=Math.PI/1.5,b.target.set(0,1,0),C=new kt(A,v.domElement),C.addEventListener("dragging-changed",e=>{b.enabled=!e.value,e.value}),C.addEventListener("change",()=>{C.object&&C.object.position.y<0&&(C.object.position.y=0)}),window.addEventListener("resize",ot),document.addEventListener("pointermove",Y);let t=Date.now();document.addEventListener("pointerdown",()=>{t=Date.now()}),document.addEventListener("pointerup",e=>{Date.now()-t<200&&(Y(e),oe())}),X.addColor(j,"bgColor").onChange(()=>{w.background=j.bgColor}),await le(),ue()}const nt=[];function ot(){const a=window.innerWidth,t=window.innerHeight;A.aspect=a/t,A.updateProjectionMatrix(),v.setSize(a,t);const e=v.getPixelRatio();nt.forEach(i=>i(a*e,t*e))}const k=new Wt;function ne(){k.update();const a=k.getElapsed(),t=k.getDelta();I.update(),se.update(),b.update();for(const e of D)e.update(a,t);v.render(w,A)}function lt(){requestAnimationFrame(lt),ne()}function oe(){if(q.setFromCamera(E,A),q.intersectObject(z,!0,W),!W.length){C.detach();return}C.attach(W[0].object),W.length=0}function Y(a){E.x=a.clientX/window.innerWidth*2-1,E.y=-(a.clientY/window.innerHeight)*2+1}let _,ut;async function le(){_=new U(new K(.5,2),new Dt({color:16777215*Math.random(),roughness:.3,metalness:1,flatShading:!0,sheen:1,sheenColor:16777215*Math.random(),sheenRoughness:.5})),_.name="icoSph",_.castShadow=!0,_.receiveShadow=!0,_.position.set(0,3,0),z.add(_);const t=(await st.loadAsync(It.monkey.url)).scene;t.name="suzanne",t.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)}),z.add(t),ut=t,lt()}function ue(){he(),de(),ce(),pe(),me(),ot()}function he(){const a={noise:1,count:100,speed:1,opacity:1,scale:1,size:3,color:new x(16777215)},t=new it(a);t.setPixelRatio(v.getPixelRatio()),D.push(t),_.add(t),t.update(0);const e=F.addFolder("Sparkles Simple (Sphere)");e.add(a,"count",10,1e3,1).onChange(i=>t.rebuildAttributes(a)),e.add(a,"size",0,15,.01).onChange(i=>t.rebuildAttributes(a)),e.add(a,"opacity",0,1,.01).onChange(i=>t.rebuildAttributes(a)),e.add(a,"speed",0,15,.01).onChange(i=>t.rebuildAttributes(a)),e.add(a,"noise",0,15,.01).onChange(i=>t.rebuildAttributes(a)),e.add(a,"scale",0,15,.01).onChange(i=>t.rebuildAttributes(a)),e.addColor(a,"color").onChange(i=>t.rebuildAttributes(a)),e.add(t.material,"pixelRatio",0,2,.1)}function de(){const t={count:100,noise:new Float32Array(300),speed:new Float32Array(100),opacity:new Float32Array(100),scale:new P(3,1,3),size:new Float32Array(100),color:new Float32Array(300)},e={minNoise:.3,maxNoise:10,minSpeed:.1,maxSpeed:3,minSize:.3,maxSize:20,minColor:0,maxColor:1};function i(){const{noise:n,speed:u,size:h,opacity:p,color:f}=t,{minNoise:m,maxNoise:g,minSpeed:R,maxSpeed:T,minSize:dt,maxSize:ct,minColor:pt,maxColor:mt}=e;for(let d=0;d<n.length;d++)n[d]=M.randFloat(m,g);for(let d=0;d<u.length;d++)u[d]=M.randFloat(R,T);for(let d=0;d<h.length;d++)h[d]=M.randFloat(dt,ct);for(let d=0;d<p.length;d++)p[d]=M.randFloat(.3,1);for(let d=0;d<f.length;d++)f[d]=M.randFloat(pt,mt)}i();const s=new it(t);s.setPixelRatio(v.getPixelRatio()),s.position.y=.75,ut.add(s),D.push(s);const r=()=>{i(e.minRandom,e.maxRandom),s.rebuildAttributes(t)},o=F.addFolder("Sparkles Advanced (Monkey)");o.add(e,"minNoise",0,100,.01).onChange(r),o.add(e,"maxNoise",0,100,.01).onChange(r),o.add(e,"minSpeed",0,100,.01).onChange(r),o.add(e,"maxSpeed",0,100,.01).onChange(r),o.add(e,"minSize",.1,100,.01).onChange(r),o.add(e,"maxSize",0,100,.01).onChange(r),o.add(e,"minColor",0,1,.01).onChange(r),o.add(e,"maxColor",0,1,.01).onChange(r)}function ce(){const a={radius:50,depth:25,count:1e3,fade:!0,factor:5,saturation:1},t=new Xt(a);w.add(t),D.push(t);const e=()=>t.rebuildAttributes(a),i=F.addFolder("Stars");i.add(a,"count",10,1e4,10).onChange(e),i.add(a,"factor",.5,50,.1).onChange(e)}function pe(){const a=new O;a.position.set(0,.75,.07);const t=new U(new Rt(.1,16,16),new Tt);t.material.color.setHSL(Math.random(),1,.5),t.material.color.multiplyScalar(2),t.position.z=1.5,t.position.y=0,a.add(t);const e={width:4,length:10,target:t,color:t.material.color,interval:1},i=new at(e);z.add(a),w.add(i);const s=(u,h)=>i.updateSize(u,h);nt.push(s);const r=M.randFloat(1,2),o=(u,h)=>{a.position.y=.75+.75*Math.sin(u*r),a.rotation.y+=h*5},n={update:(u,h)=>{o(u,h),i.update()}};D.push(n),i.name="Trail Line (Monkey)",ht(e,i)}function me(){const a=new O;a.position.set(0,3,0);const t=new U(new K(.1),new N({flatShading:!0}));t.material.color.setHSL(Math.random(),1,.5),t.material.color.multiplyScalar(2),t.position.z=.8,t.position.y=0,a.add(t);const e={width:1,length:10,target:t,color:t.material.color,interval:1};e.geometry=new Lt(.1),e.material=new N({color:t.material.color}),e.instanceCount=20;const i=new at(e);z.add(a),w.add(i);const s=(o,n)=>{a.position.y=3+.5*Math.sin(o*2),a.rotation.y+=n*2},r={update:(o,n)=>{s(o,n),i.update()}};D.push(r),i.name="Trail Instanced (Sphere)",ht(e,i)}function ht(a,t){const e=F.addFolder(t.name);e.onChange(()=>t.rebuildTrail(a)),e.addColor(a,"color").name("Trail Color"),e.add(a,"length",1,50,.1).name("Trail Length"),e.add(a,"width",0,20,.1).name("Trail Width"),e.add(a,"interval",1,60,1).name("Trail Interval"),t.trailData.isUsingCustomGeometry&&e.add(a,"instanceCount",1,1e3,1).name("Instance Count")}export{Ce as default};
