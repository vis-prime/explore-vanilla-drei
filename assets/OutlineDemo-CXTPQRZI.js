import{G as j,C as y,m as U,aI as $,aJ as J,M as X,aK as Y,d as P,a1 as Q,S as Z,W as ee,V as ne,a as te,A as ae,b as ie,c as oe,O as re,R as se,i as ce,n as de}from"./OrbitControls-R0lqBEeo.js";import{T as le}from"./TransformControls-C9PpcTYI.js";import{M as pe}from"./MODEL_LIST-CX7Ggjim.js";import{B as me}from"./BG_ENV-DvPFx4cR.js";import{s as ue}from"./shaderMaterial-CnuFB52m.js";import"./EXRLoader-CueWY_mu.js";import"./RGBELoader-C-6F00h6.js";import"./GroundProjectedSkybox-C8DAfX2s.js";import"./HDRI_LIST-DJCqOZOR.js";const fe=ue({screenspace:!1,color:new y("black"),opacity:1,thickness:.05,size:new P},`
   #include <common>
   #include <morphtarget_pars_vertex>
   #include <skinning_pars_vertex>
   uniform float thickness;
   uniform float screenspace;
   uniform vec2 size;
   void main() {
     #if defined (USE_SKINNING)
	   #include <beginnormal_vertex>
       #include <morphnormal_vertex>
       #include <skinbase_vertex>
       #include <skinnormal_vertex>
       #include <defaultnormal_vertex>
     #endif
     #include <begin_vertex>
	   #include <morphtarget_vertex>
	   #include <skinning_vertex>
     #include <project_vertex>
     vec4 tNormal = vec4(normal, 0.0);
     vec4 tPosition = vec4(transformed, 1.0);
     #ifdef USE_INSTANCING
       tNormal = instanceMatrix * tNormal;
       tPosition = instanceMatrix * tPosition;
     #endif
     if (screenspace == 0.0) {
       vec3 newPosition = tPosition.xyz + tNormal.xyz * thickness;
       gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0); 
     } else {
       vec4 clipPosition = projectionMatrix * modelViewMatrix * tPosition;
       vec4 clipNormal = projectionMatrix * modelViewMatrix * tNormal;
       vec2 offset = normalize(clipNormal.xy) * thickness / size * clipPosition.w * 2.0;
       clipPosition.xy += offset;
       gl_Position = clipPosition;
     }
   }`,`
   uniform vec3 color;
   uniform float opacity;
   void main(){
     gl_FragColor = vec4(color, opacity);
     #include <tonemapping_fragment>
     #include <${parseInt(Q.replace(/\D+/g,""))>=154?"colorspace_fragment":"encodings_fragment"}>
   }`);function we({color:d=new y("black"),opacity:l=1,transparent:t=!1,screenspace:o=!1,toneMapped:I=!0,polygonOffset:D=!1,polygonOffsetFactor:G=0,renderOrder:T=0,thickness:A=.05,angle:W=Math.PI,gl:h}={}){const p=new j;let c={color:d,opacity:l,transparent:t,screenspace:o,toneMapped:I,polygonOffset:D,polygonOffsetFactor:G,renderOrder:T,thickness:A,angle:W};function b(m){const e=p.parent;if(p.clear(),e&&e.geometry){let n;const f=new fe({side:U});e.skeleton?(n=new $,n.material=f,n.bind(e.skeleton,e.bindMatrix),p.add(n)):e.isInstancedMesh?(n=new J(e.geometry,f,e.count),n.instanceMatrix=e.instanceMatrix,p.add(n)):(n=new X,n.material=f,p.add(n)),n.geometry=m?Y(e.geometry,m):e.geometry}}function S(m){c={...c,...m};const e=p.children[0];if(e){const{transparent:n,thickness:f,color:F,opacity:V,screenspace:H,toneMapped:B,polygonOffset:q,polygonOffsetFactor:K,renderOrder:O}=c,C=new P;!h&&c.screenspace&&console.warn('Outlines: "screenspace" requires a WebGLRenderer instance to calculate the outline size'),h&&h.getSize(C),Object.assign(e.material,{transparent:n,thickness:f,color:F,opacity:V,size:C,screenspace:H,toneMapped:B,polygonOffset:q,polygonOffsetFactor:K}),O!==void 0&&(e.renderOrder=O)}}return{group:p,updateProps(m){var e;const n=(e=m.angle)!==null&&e!==void 0?e:c.angle;n!==c.angle&&b(n),S(m)},generate(){b(c.angle),S(c)}}}let M,a,s,w,r,k,x=new P;const _=new j,L=new ce,R=new de;let i;R.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");L.setDRACOLoader(R);const E=new se,u=[];let v,g;async function Ee(d){k=d,v=k.addFolder("Scene"),M=new Z,app.appendChild(M.dom),a=new ee({antialias:!0}),a.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),a.setSize(window.innerWidth,window.innerHeight),a.shadowMap.enabled=!0,a.shadowMap.type=ne,a.outputColorSpace=te,a.toneMapping=ae,app.appendChild(a.domElement),s=new ie(50,window.innerWidth/window.innerHeight,.1,200),s.position.set(2,2,2),s.name="Camera",w=new oe,w.add(_),r=new re(s,a.domElement),r.enableDamping=!0,r.dampingFactor=.05,r.minDistance=.1,r.maxDistance=100,r.maxPolarAngle=Math.PI/1.5,r.target.set(0,.5,0),i=new le(s,a.domElement),i.addEventListener("dragging-changed",o=>{r.enabled=!o.value,o.value}),i.addEventListener("change",()=>{i.object&&i.object.position.y<0&&(i.object.position.y=0)}),w.add(i.getHelper()),window.addEventListener("resize",ge),document.addEventListener("pointermove",N);let l=Date.now();app.addEventListener("pointerdown",()=>{l=Date.now()}),app.addEventListener("pointerup",o=>{Date.now()-l<200&&(N(o),ve())}),v.add(i,"mode",["translate","rotate","scale"]);const t=new me(w);t.setBGType("GroundProjection"),t.setEnvType("HDRI"),t.updateAll(),t.addGui(v),await Me(),z()}function ge(){s.aspect=window.innerWidth/window.innerHeight,s.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight)}function he(){M.update(),r.update(),a.render(w,s)}function z(){requestAnimationFrame(z),he()}function ve(){if(E.setFromCamera(x,s),E.intersectObject(_,!0,u),!u.length){i.detach();return}u[0].object.selectOnRaycast?i.attach(u[0].object.selectOnRaycast):i.attach(u[0].object),u.length=0}function N(d){x.x=d.clientX/window.innerWidth*2-1,x.y=-(d.clientY/window.innerHeight)*2+1}async function Me(){g=(await L.loadAsync(pe.monkey.url)).scene;const l=[];g.traverse(t=>{t.isMesh&&(t.castShadow=!0,t.receiveShadow=!0,t.selectOnRaycast=g,l.push(t))}),l.forEach(t=>{const o=we({color:new y("red"),thickness:.02});t.add(o.group),o.generate()}),_.add(g)}export{Ee as default};
