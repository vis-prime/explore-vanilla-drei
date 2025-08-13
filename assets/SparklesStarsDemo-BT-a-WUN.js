import{b0 as G,Q as H,r as A,C as M,as as u,ai as I,d as V,v as D,at as oe,b1 as ae,b2 as ne,S as ie,W as re,a as se,A as de,b as le,c as ce,E as me,G as ue,O as pe,R as fe,M as ge,aX as he,j as we,i as ve,b3 as be,n as ye}from"./OrbitControls-R0lqBEeo.js";import{R as Ce}from"./RGBELoader-C-6F00h6.js";import{T as Ae}from"./TransformControls-C9PpcTYI.js";import{M as Se}from"./MODEL_LIST-CX7Ggjim.js";import{H as xe}from"./HDRI_LIST-DJCqOZOR.js";import{v as B}from"./constants-CqDbEtfV.js";class Pe extends I{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
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
          #include <${B>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(t){this.uniforms.time.value=t}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(t){this.uniforms.pixelRatio.value=t}}const N=e=>e&&e.constructor===Float32Array,Fe=e=>[e.r,e.g,e.b],q=e=>e instanceof V||e instanceof D||e instanceof oe,U=e=>Array.isArray(e)?e:q(e)?e.toArray():[e,e,e];function P(e,t,o){if(t!==void 0){if(N(t))return t;if(t instanceof M){const a=Array.from({length:e*3},()=>Fe(t)).flat();return Float32Array.from(a)}else if(q(t)||Array.isArray(t)){const a=Array.from({length:e*3},()=>U(t)).flat();return Float32Array.from(a)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},o)}class X extends G{constructor({noise:t=1,count:o=100,speed:a=1,opacity:d=1,scale:r=1,size:i,color:l}={}){super(new H,new Pe);const s=this.material;s.transparent=!0,s.depthWrite=!1,this.rebuildAttributes({count:o,size:i,opacity:d,speed:a,scale:r,noise:t,color:l})}setPixelRatio(t){const o=this.material;o.pixelRatio=t}rebuildAttributes({noise:t=1,count:o=100,speed:a=1,opacity:d=1,scale:r=1,size:i,color:l}={}){const s=U(r),w=Float32Array.from(Array.from({length:o},()=>s.map(A.randFloatSpread)).flat()),v=P(o,i,Math.random),y=P(o,d),f=P(o,a),C=P(o*3,t),S=P(l===void 0?o*3:o,N(l)?l:new M(l),()=>1);this.geometry.setAttribute("position",new u(w,3)),this.geometry.setAttribute("size",new u(v,1)),this.geometry.setAttribute("opacity",new u(y,1)),this.geometry.setAttribute("speed",new u(f,1)),this.geometry.setAttribute("color",new u(S,3)),this.geometry.setAttribute("noise",new u(C,3))}update(t){this.material.time=t}}class Me extends I{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
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
	      #include <${B>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const ze=e=>new D().setFromSpherical(new ne(e,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI));class Re extends G{constructor({radius:t=100,depth:o=50,count:a=5e3,saturation:d=0,factor:r=4,fade:i=!1,speed:l=1}={}){super(new H,new Me),this.speed=l;const s=this.material;s.blending=ae,s.uniforms.fade.value=i,s.depthWrite=!1,s.transparent=!0,s.vertexColors=!0,s.needsUpdate=!0,this.rebuildAttributes({radius:t,depth:o,count:a,saturation:d,factor:r,fade:i})}rebuildAttributes({radius:t=100,depth:o=50,count:a=5e3,saturation:d=0,factor:r=4,fade:i=!1,speed:l=1}){this.speed=l;const s=this.material;s.uniforms.fade.value=i;const w=[],v=[],y=Array.from({length:a},()=>(.5+.5*Math.random())*r),f=new M;let C=t+o;const S=o/a;for(let x=0;x<a;x++)C-=S*Math.random(),w.push(...ze(C).toArray()),f.setHSL(x/a,d,.9),v.push(f.r,f.g,f.b);this.geometry.setAttribute("position",new u(new Float32Array(w),3)),this.geometry.setAttribute("color",new u(new Float32Array(v),3)),this.geometry.setAttribute("size",new u(new Float32Array(y),1))}update(t){const o=this.material;o.uniforms.time.value=t*this.speed}}let _,c,p,g,m,F,E=new V;const z={bgColor:new M,printCam:()=>{}},k=new ue,ke=new Ce,$=new ve,Q=new ye;let h;Q.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");$.setDRACOLoader(Q);const j=new fe,R=[];let O,L=[];async function qe(e){F=e,O=F.addFolder("Scene"),_=new ie,app.appendChild(_.dom),c=new re({antialias:!0,powerPreference:"high-performance"}),c.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),c.setSize(window.innerWidth,window.innerHeight),c.shadowMap.enabled=!0,c.outputColorSpace=se,c.toneMapping=de,app.appendChild(c.domElement),p=new le(50,window.innerWidth/window.innerHeight,.1,200),p.position.set(6,3,6),p.name="Camera",g=new ce,z.bgColor.set(17),g.background=z.bgColor,ke.load(xe.skidpan.hdr,o=>{o.mapping=me,g.backgroundBlurriness=.1,g.environment=o}),g.add(k),m=new pe(p,c.domElement),m.enableDamping=!0,m.dampingFactor=.05,m.minDistance=.1,m.maxDistance=100,m.maxPolarAngle=Math.PI/1.5,m.target.set(0,1,0),h=new Ae(p,c.domElement),h.addEventListener("dragging-changed",o=>{m.enabled=!o.value,o.value}),h.addEventListener("change",()=>{h.object&&h.object.position.y<0&&(h.object.position.y=0)}),window.addEventListener("resize",Le),document.addEventListener("pointermove",W);let t=Date.now();document.addEventListener("pointerdown",()=>{t=Date.now()}),document.addEventListener("pointerup",o=>{Date.now()-t<200&&(W(o),Ee())}),O.addColor(z,"bgColor").onChange(()=>{g.background=z.bgColor}),await De(),je()}function Le(){p.aspect=window.innerWidth/window.innerHeight,p.updateProjectionMatrix(),c.setSize(window.innerWidth,window.innerHeight)}const T=new be;function _e(){T.update();const e=T.getElapsed();_.update();for(const t of L)t.update(e);m.update(),c.render(g,p)}function Y(){requestAnimationFrame(Y),_e()}function Ee(){if(j.setFromCamera(E,p),j.intersectObject(k,!0,R),!R.length){h.detach();return}h.attach(R[0].object),R.length=0}function W(e){E.x=e.clientX/window.innerWidth*2-1,E.y=-(e.clientY/window.innerHeight)*2+1}let b,J;async function De(){b=new ge(new he(.5,2),new we({color:16777215*Math.random(),roughness:.3,metalness:1,flatShading:!0,sheen:1,sheenColor:16777215*Math.random(),sheenRoughness:.5})),b.name="cube",b.castShadow=!0,b.receiveShadow=!0,b.position.set(0,3,0),k.add(b);const t=(await $.loadAsync(Se.monkey.url)).scene;t.name="suzanne",t.traverse(o=>{o.isMesh&&(o.castShadow=!0,o.receiveShadow=!0)}),k.add(t),J=t,Y()}function je(){Oe(),Te(),We()}function Oe(){const e={noise:1,count:100,speed:1,opacity:1,scale:1,size:3,color:new M(16777215)},t=new X(e);t.setPixelRatio(c.getPixelRatio()),L.push(t),b.add(t),console.log("Sparkles added to the scene",{sparkles:t}),t.update(0);const o=F.addFolder("Sparkles");o.add(e,"count",10,1e3,1).onChange(a=>t.rebuildAttributes(e)),o.add(e,"size",0,15,.01).onChange(a=>t.rebuildAttributes(e)),o.add(e,"opacity",0,1,.01).onChange(a=>t.rebuildAttributes(e)),o.add(e,"speed",0,15,.01).onChange(a=>t.rebuildAttributes(e)),o.add(e,"noise",0,15,.01).onChange(a=>t.rebuildAttributes(e)),o.add(e,"scale",0,15,.01).onChange(a=>t.rebuildAttributes(e)),o.addColor(e,"color").onChange(a=>t.rebuildAttributes(e)),o.add(t.material,"pixelRatio",0,2,.1)}function Te(){const t={count:100,noise:new Float32Array(300),speed:new Float32Array(100),opacity:new Float32Array(100),scale:new D(3,2,3),size:new Float32Array(100),color:new Float32Array(300)},o={minNoise:.3,maxNoise:10,minSpeed:.3,maxSpeed:10,minSize:.3,maxSize:20,minColor:0,maxColor:1};function a(){const{noise:l,speed:s,size:w,opacity:v,color:y}=t,{minNoise:f,maxNoise:C,minSpeed:S,maxSpeed:x,minSize:K,maxSize:Z,minColor:ee,maxColor:te}=o;for(let n=0;n<l.length;n++)l[n]=A.randFloat(f,C);for(let n=0;n<s.length;n++)s[n]=A.randFloat(S,x);for(let n=0;n<w.length;n++)w[n]=A.randFloat(K,Z);for(let n=0;n<v.length;n++)v[n]=A.randFloat(.3,1);for(let n=0;n<y.length;n++)y[n]=A.randFloat(ee,te)}a();const d=new X(t);d.setPixelRatio(c.getPixelRatio()),d.position.y=.5,J.add(d),L.push(d);const r=()=>{a(o.minRandom,o.maxRandom),d.rebuildAttributes(t)},i=F.addFolder("Advanced Sparkles");i.add(o,"minNoise",0,100,.01).onChange(r),i.add(o,"maxNoise",0,100,.01).onChange(r),i.add(o,"minSpeed",0,100,.01).onChange(r),i.add(o,"maxSpeed",0,100,.01).onChange(r),i.add(o,"minSize",.1,100,.01).onChange(r),i.add(o,"maxSize",0,100,.01).onChange(r),i.add(o,"minColor",0,1,.01).onChange(r),i.add(o,"maxColor",0,1,.01).onChange(r)}function We(){const e={radius:50,depth:25,count:1e3,fade:!0,factor:5,saturation:1},t=new Re(e);g.add(t),L.push(t);const o=()=>t.rebuildAttributes(e),a=F.addFolder("Stars");a.add(e,"count",10,1e4,10).onChange(o),a.add(e,"factor",.5,50,.1).onChange(o)}export{qe as default};
