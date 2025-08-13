import{b0 as B,Q as G,r as S,C as F,as as p,ai as H,d as I,v as D,at as oe,b1 as ae,b2 as ne,S as ie,W as re,a as se,A as de,b as le,c as ce,E as me,G as ue,O as pe,R as fe,M as ge,B as he,h as we,i as ve,b3 as ye,n as be}from"./OrbitControls-R0lqBEeo.js";import{R as Ae}from"./RGBELoader-C-6F00h6.js";import{T as Se}from"./TransformControls-C9PpcTYI.js";import{M as Ce}from"./MODEL_LIST-CX7Ggjim.js";import{H as xe}from"./HDRI_LIST-DJCqOZOR.js";import{v as V}from"./constants-CqDbEtfV.js";class Pe extends H{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
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
          #include <${V>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(t){this.uniforms.time.value=t}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(t){this.uniforms.pixelRatio.value=t}}const N=e=>e&&e.constructor===Float32Array,Fe=e=>[e.r,e.g,e.b],q=e=>e instanceof I||e instanceof D||e instanceof oe,U=e=>Array.isArray(e)?e:q(e)?e.toArray():[e,e,e];function P(e,t,o){if(t!==void 0){if(N(t))return t;if(t instanceof F){const a=Array.from({length:e*3},()=>Fe(t)).flat();return Float32Array.from(a)}else if(q(t)||Array.isArray(t)){const a=Array.from({length:e*3},()=>U(t)).flat();return Float32Array.from(a)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},o)}class $ extends B{constructor({noise:t=1,count:o=100,speed:a=1,opacity:d=1,scale:r=1,size:i,color:l}={}){super(new G,new Pe);const s=this.material;s.transparent=!0,s.depthWrite=!1,this.rebuildAttributes({count:o,size:i,opacity:d,speed:a,scale:r,noise:t,color:l})}setPixelRatio(t){const o=this.material;o.pixelRatio=t}rebuildAttributes({noise:t=1,count:o=100,speed:a=1,opacity:d=1,scale:r=1,size:i,color:l}={}){const s=U(r),w=Float32Array.from(Array.from({length:o},()=>s.map(S.randFloatSpread)).flat()),v=P(o,i,Math.random),b=P(o,d),g=P(o,a),A=P(o*3,t),C=P(l===void 0?o*3:o,N(l)?l:new F(l),()=>1);this.geometry.setAttribute("position",new p(w,3)),this.geometry.setAttribute("size",new p(v,1)),this.geometry.setAttribute("opacity",new p(b,1)),this.geometry.setAttribute("speed",new p(g,1)),this.geometry.setAttribute("color",new p(C,3)),this.geometry.setAttribute("noise",new p(A,3))}update(t){this.material.time=t}}class Me extends H{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
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
	      #include <${V>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const ze=e=>new D().setFromSpherical(new ne(e,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI));class Re extends B{constructor({radius:t=100,depth:o=50,count:a=5e3,saturation:d=0,factor:r=4,fade:i=!1,speed:l=1}={}){super(new G,new Me),this.speed=l;const s=this.material;s.blending=ae,s.uniforms.fade.value=i,s.depthWrite=!1,s.transparent=!0,s.vertexColors=!0,s.needsUpdate=!0,this.rebuildAttributes({radius:t,depth:o,count:a,saturation:d,factor:r,fade:i})}rebuildAttributes({radius:t=100,depth:o=50,count:a=5e3,saturation:d=0,factor:r=4,fade:i=!1,speed:l=1}){this.speed=l;const s=this.material;s.uniforms.fade.value=i;const w=[],v=[],b=Array.from({length:a},()=>(.5+.5*Math.random())*r),g=new F;let A=t+o;const C=o/a;for(let x=0;x<a;x++)A-=C*Math.random(),w.push(...ze(A).toArray()),g.setHSL(x/a,d,.9),v.push(g.r,g.g,g.b);this.geometry.setAttribute("position",new p(new Float32Array(w),3)),this.geometry.setAttribute("color",new p(new Float32Array(v),3)),this.geometry.setAttribute("size",new p(new Float32Array(b),1))}update(t){const o=this.material;o.uniforms.time.value=t*this.speed}}let _,c,f,h,m,R,E=new I;const O={bgColor:new F,printCam:()=>{}},k=new ue,ke=new Ae,Q=new ve,X=new be;let u;X.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");Q.setDRACOLoader(X);const T=new fe,M=[];let z,L=[];async function qe(e){R=e,z=R.addFolder("Scene"),_=new ie,app.appendChild(_.dom),c=new re({antialias:!0,powerPreference:"high-performance"}),c.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),c.setSize(window.innerWidth,window.innerHeight),c.shadowMap.enabled=!0,c.outputColorSpace=se,c.toneMapping=de,app.appendChild(c.domElement),f=new le(50,window.innerWidth/window.innerHeight,.1,200),f.position.set(6,3,6),f.name="Camera",h=new ce,ke.load(xe.skidpan.hdr,o=>{o.mapping=me,h.backgroundBlurriness=.1,h.environment=o}),h.add(k),m=new pe(f,c.domElement),m.enableDamping=!0,m.dampingFactor=.05,m.minDistance=.1,m.maxDistance=100,m.maxPolarAngle=Math.PI/1.5,m.target.set(0,1,0),u=new Se(f,c.domElement),u.addEventListener("dragging-changed",o=>{m.enabled=!o.value,o.value}),u.addEventListener("change",()=>{u.object&&u.object.position.y<0&&(u.object.position.y=0)}),window.addEventListener("resize",Le),document.addEventListener("pointermove",W);let t=Date.now();document.addEventListener("pointerdown",()=>{t=Date.now()}),document.addEventListener("pointerup",o=>{Date.now()-t<200&&(W(o),Ee())}),z.add(u,"mode",["translate","rotate","scale"]),z.add(h,"backgroundBlurriness",0,1,.01),z.addColor(O,"bgColor").onChange(()=>{h.background=O.bgColor}),await De(),Oe()}function Le(){f.aspect=window.innerWidth/window.innerHeight,f.updateProjectionMatrix(),c.setSize(window.innerWidth,window.innerHeight)}const j=new ye;function _e(){j.update();const e=j.getElapsed();_.update();for(const t of L)t.update(e);m.update(),c.render(h,f)}function Y(){requestAnimationFrame(Y),_e()}function Ee(){if(T.setFromCamera(E,f),T.intersectObject(k,!0,M),!M.length){u.detach();return}u.attach(M[0].object),M.length=0}function W(e){E.x=e.clientX/window.innerWidth*2-1,E.y=-(e.clientY/window.innerHeight)*2+1}let y,J;async function De(){y=new ge(new he(1,1,1),new we({color:16777215*Math.random(),roughness:.3,metalness:0})),y.name="cube",y.castShadow=!0,y.receiveShadow=!0,y.position.set(0,3,0),k.add(y);const t=(await Q.loadAsync(Ce.monkey.url)).scene;t.name="suzanne",t.traverse(o=>{o.isMesh&&(o.castShadow=!0,o.receiveShadow=!0)}),k.add(t),J=t,Y()}function Oe(){Te(),je(),We()}function Te(){const e={noise:1,count:100,speed:1,opacity:1,scale:1,size:3,color:new F(16777215)},t=new $(e);t.setPixelRatio(c.getPixelRatio()),L.push(t),y.add(t),console.log("Sparkles added to the scene",{sparkles:t}),t.update(0);const o=R.addFolder("Sparkles");o.add(e,"count",10,1e3,1).onChange(a=>t.rebuildAttributes(e)),o.add(e,"size",0,15,.01).onChange(a=>t.rebuildAttributes(e)),o.add(e,"opacity",0,1,.01).onChange(a=>t.rebuildAttributes(e)),o.add(e,"speed",0,15,.01).onChange(a=>t.rebuildAttributes(e)),o.add(e,"noise",0,15,.01).onChange(a=>t.rebuildAttributes(e)),o.add(e,"scale",0,15,.01).onChange(a=>t.rebuildAttributes(e)),o.addColor(e,"color").onChange(a=>t.rebuildAttributes(e)),o.add(t.material,"pixelRatio",0,2,.1)}function je(){const t={count:100,noise:new Float32Array(300),speed:new Float32Array(100),opacity:new Float32Array(100),scale:new D(3,2,3),size:new Float32Array(100),color:new Float32Array(300)},o={minNoise:.3,maxNoise:10,minSpeed:.3,maxSpeed:10,minSize:.3,maxSize:10,minColor:0,maxColor:1};function a(){const{noise:l,speed:s,size:w,opacity:v,color:b}=t,{minNoise:g,maxNoise:A,minSpeed:C,maxSpeed:x,minSize:K,maxSize:Z,minColor:ee,maxColor:te}=o;for(let n=0;n<l.length;n++)l[n]=S.randFloat(g,A);for(let n=0;n<s.length;n++)s[n]=S.randFloat(C,x);for(let n=0;n<w.length;n++)w[n]=S.randFloat(K,Z);for(let n=0;n<v.length;n++)v[n]=S.randFloat(.3,1);for(let n=0;n<b.length;n++)b[n]=S.randFloat(ee,te)}a();const d=new $(t);d.setPixelRatio(c.getPixelRatio()),d.position.y=.5,J.add(d),L.push(d);const r=()=>{a(o.minRandom,o.maxRandom),d.rebuildAttributes(t)},i=R.addFolder("Advanced Sparkles");i.add(o,"minNoise",0,100,.01).onChange(r),i.add(o,"maxNoise",0,100,.01).onChange(r),i.add(o,"minSpeed",0,100,.01).onChange(r),i.add(o,"maxSpeed",0,100,.01).onChange(r),i.add(o,"minSize",.1,100,.01).onChange(r),i.add(o,"maxSize",0,100,.01).onChange(r),i.add(o,"minColor",0,1,.01).onChange(r),i.add(o,"maxColor",0,1,.01).onChange(r)}function We(){const e=new Re({radius:50,depth:25,fade:!0});h.add(e),L.push(e)}export{qe as default};
