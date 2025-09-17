import{t as $,S as K,O as X,G as Y,D as J}from"./OrbitControls-l8VhczwG.js";import{T as Q}from"./TransformControls-C-UG_SIt.js";import{G as j,C as y,k as Z,aE as ee,aF as ne,M as te,c as P,z as ie,W as ae,V as oe,S as re,A as se,a as ce,b as de,R as le}from"./three.module-N8Yg3gBE.js";import{M as pe}from"./MODEL_LIST-DWUBpEFf.js";import{B as me}from"./BG_ENV-Dp2mGFHV.js";import{s as ue}from"./shaderMaterial-DAZgBVE9.js";import"./EXRLoader-D5rljWPQ.js";import"./HDRLoader-apDHl61K.js";import"./GroundProjectedSkybox-BvrAwn1X.js";import"./HDRI_LIST-DJCqOZOR.js";const fe=ue({screenspace:!1,color:new y("black"),opacity:1,thickness:.05,size:new P},`
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
     #include <${parseInt(ie.replace(/\D+/g,""))>=154?"colorspace_fragment":"encodings_fragment"}>
   }`);function we({color:d=new y("black"),opacity:l=1,transparent:t=!1,screenspace:o=!1,toneMapped:D=!0,polygonOffset:G=!1,polygonOffsetFactor:I=0,renderOrder:T=0,thickness:A=.05,angle:F=Math.PI,gl:h}={}){const p=new j;let c={color:d,opacity:l,transparent:t,screenspace:o,toneMapped:D,polygonOffset:G,polygonOffsetFactor:I,renderOrder:T,thickness:A,angle:F};function _(m){const e=p.parent;if(p.clear(),e&&e.geometry){let n;const f=new fe({side:Z});e.skeleton?(n=new ee,n.material=f,n.bind(e.skeleton,e.bindMatrix),p.add(n)):e.isInstancedMesh?(n=new ne(e.geometry,f,e.count),n.instanceMatrix=e.instanceMatrix,p.add(n)):(n=new te,n.material=f,p.add(n)),n.geometry=m?$(e.geometry,m):e.geometry}}function b(m){c={...c,...m};const e=p.children[0];if(e){const{transparent:n,thickness:f,color:W,opacity:V,screenspace:H,toneMapped:B,polygonOffset:q,polygonOffsetFactor:U,renderOrder:O}=c,k=new P;!h&&c.screenspace&&console.warn('Outlines: "screenspace" requires a WebGLRenderer instance to calculate the outline size'),h&&h.getSize(k),Object.assign(e.material,{transparent:n,thickness:f,color:W,opacity:V,size:k,screenspace:H,toneMapped:B,polygonOffset:q,polygonOffsetFactor:U}),O!==void 0&&(e.renderOrder=O)}}return{group:p,updateProps(m){var e;const n=(e=m.angle)!==null&&e!==void 0?e:c.angle;n!==c.angle&&_(n),b(m)},generate(){_(c.angle),b(c)}}}let M,i,s,w,r,C,x=new P;const S=new j,z=new Y,L=new J;let a;L.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");z.setDRACOLoader(L);const E=new le,u=[];let v,g;async function Ne(d){C=d,v=C.addFolder("Scene"),M=new K,app.appendChild(M.dom),i=new ae({antialias:!0}),i.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),i.setSize(window.innerWidth,window.innerHeight),i.shadowMap.enabled=!0,i.shadowMap.type=oe,i.outputColorSpace=re,i.toneMapping=se,app.appendChild(i.domElement),s=new ce(50,window.innerWidth/window.innerHeight,.1,200),s.position.set(2,2,2),s.name="Camera",w=new de,w.add(S),r=new X(s,i.domElement),r.enableDamping=!0,r.dampingFactor=.05,r.minDistance=.1,r.maxDistance=100,r.maxPolarAngle=Math.PI/1.5,r.target.set(0,.5,0),a=new Q(s,i.domElement),a.addEventListener("dragging-changed",o=>{r.enabled=!o.value,o.value}),a.addEventListener("change",()=>{a.object&&a.object.position.y<0&&(a.object.position.y=0)}),w.add(a.getHelper()),window.addEventListener("resize",ge),document.addEventListener("pointermove",N);let l=Date.now();app.addEventListener("pointerdown",()=>{l=Date.now()}),app.addEventListener("pointerup",o=>{Date.now()-l<200&&(N(o),ve())}),v.add(a,"mode",["translate","rotate","scale"]);const t=new me(w);t.setBGType("GroundProjection"),t.setEnvType("HDRI"),t.updateAll(),t.addGui(v),await Me(),R()}function ge(){s.aspect=window.innerWidth/window.innerHeight,s.updateProjectionMatrix(),i.setSize(window.innerWidth,window.innerHeight)}function he(){M.update(),r.update(),i.render(w,s)}function R(){requestAnimationFrame(R),he()}function ve(){if(E.setFromCamera(x,s),E.intersectObject(S,!0,u),!u.length){a.detach();return}u[0].object.selectOnRaycast?a.attach(u[0].object.selectOnRaycast):a.attach(u[0].object),u.length=0}function N(d){x.x=d.clientX/window.innerWidth*2-1,x.y=-(d.clientY/window.innerHeight)*2+1}async function Me(){g=(await z.loadAsync(pe.monkey.url)).scene;const l=[];g.traverse(t=>{t.isMesh&&(t.castShadow=!0,t.receiveShadow=!0,t.selectOnRaycast=g,l.push(t))}),l.forEach(t=>{const o=we({color:new y("red"),thickness:.02});t.add(o.group),o.generate()}),S.add(g)}export{Ne as default};
