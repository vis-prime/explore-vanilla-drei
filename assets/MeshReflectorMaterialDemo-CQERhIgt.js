import{ae as Pe,c as I,af as Oe,a9 as p,z as Ae,i as de,H as Be,L as Z,b as Ue,ad as je,I as He,ao as ve,M as ee,g as te,W as Ie,V as ze,S as Ne,A as We,a as ye,G as Ge,R as Ve,f as ke,B as Xe,o as ge,C as Re,a1 as Ye,s as j,_ as xe,ap as we,T as $e,av as K,aw as qe,u as Qe,v as Je,U as Ke}from"./three.module-mb-WANHP.js";import{H as Ze}from"./HDRI_LIST-DJCqOZOR.js";import{S as et,O as tt,G as rt,D as at}from"./OrbitControls-BThPDOU9.js";import{T as ot}from"./TransformControls-i8oTrZWj.js";import{T as nt,E as it,u as st}from"./tween.esm-DFB-vPb4.js";import{B as lt}from"./BG_ENV-Dmm91why.js";import{M as ut}from"./MODEL_LIST-CtQt_fBO.js";import"./EXRLoader-CrxFBtHm.js";import"./RGBELoader-DeKSjiHf.js";import"./GroundProjectedSkybox-ZeOOmZad.js";class dt extends Pe{constructor(e=new I){super({uniforms:{inputBuffer:new p(null),depthBuffer:new p(null),resolution:new p(new I),texelSize:new p(new I),halfTexelSize:new p(new I),kernel:new p(0),scale:new p(1),cameraNear:new p(0),cameraFar:new p(1),minDepthThreshold:new p(0),maxDepthThreshold:new p(1),depthScale:new p(0),depthToBlurRatioBias:new p(.25)},fragmentShader:`#include <common>
        #include <dithering_pars_fragment>      
        uniform sampler2D inputBuffer;
        uniform sampler2D depthBuffer;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          float depthFactor = 0.0;
          
          #ifdef USE_DEPTH
            vec4 depth = texture2D(depthBuffer, vUv);
            depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
            depthFactor *= depthScale;
            depthFactor = max(0.0, min(1.0, depthFactor + 0.25));
          #endif
          
          vec4 sum = texture2D(inputBuffer, mix(vUv0, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv1, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv2, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv3, vUv, depthFactor));
          gl_FragColor = sum * 0.25 ;

          #include <dithering_fragment>
          #include <tonemapping_fragment>
          #include <${parseInt(Ae.replace(/\D+/g,""))>=154?"colorspace_fragment":"encodings_fragment"}>
        }`,vertexShader:`uniform vec2 texelSize;
        uniform vec2 halfTexelSize;
        uniform float kernel;
        uniform float scale;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          vec2 uv = position.xy * 0.5 + 0.5;
          vUv = uv;

          vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;
          vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);
          vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);
          vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);
          vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);

          gl_Position = vec4(position.xy, 1.0, 1.0);
        }`,blending:Oe,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,n){this.uniforms.texelSize.value.set(e,n),this.uniforms.halfTexelSize.value.set(e,n).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}}class ht{renderToScreen=!1;constructor({gl:e,resolution:n,width:i=500,height:l=500,minDepthThreshold:x=0,maxDepthThreshold:d=1,depthScale:F=0,depthToBlurRatioBias:L=.25}){this.renderTargetA=new de(n,n,{minFilter:Z,magFilter:Z,stencilBuffer:!1,depthBuffer:!1,type:Be}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new dt,this.convolutionMaterial.setTexelSize(1/i,1/l),this.convolutionMaterial.setResolution(new I(i,l)),this.scene=new Ue,this.camera=new je,this.convolutionMaterial.uniforms.minDepthThreshold.value=x,this.convolutionMaterial.uniforms.maxDepthThreshold.value=d,this.convolutionMaterial.uniforms.depthScale.value=F,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=L,this.convolutionMaterial.defines.USE_DEPTH=F>0;const S=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),y=new Float32Array([0,0,2,0,0,2]),w=new He;w.setAttribute("position",new ve(S,3)),w.setAttribute("uv",new ve(y,2)),this.screen=new ee(w,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,n,i){const l=this.scene,x=this.camera,d=this.renderTargetA,F=this.renderTargetB,L=this.convolutionMaterial,S=L.uniforms;S.depthBuffer.value=n.depthTexture;const y=L.kernel;let w=n,P,r,R;for(r=0,R=y.length-1;r<R;++r)P=(r&1)===0?d:F,S.kernel.value=y[r],S.inputBuffer.value=w.texture,e.setRenderTarget(P),e.render(l,x),w=P;S.kernel.value=y[r],S.inputBuffer.value=w.texture,e.setRenderTarget(this.renderToScreen?null:i),e.render(l,x)}}class le extends te{_tDepth={value:null};_distortionMap={value:null};_tDiffuse={value:null};_tDiffuseBlur={value:null};_textureMatrix={value:null};_hasBlur={value:!1};_mirror={value:0};_mixBlur={value:0};_blurStrength={value:.5};_minDepthThreshold={value:.9};_maxDepthThreshold={value:1};_depthScale={value:0};_depthToBlurRatioBias={value:.25};_distortion={value:1};_mixContrast={value:1};constructor(e={}){super(),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var n;(n=e.defines)!=null&&n.USE_UV||(e.defines.USE_UV=""),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${e.vertexShader}`,e.vertexShader=e.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`),e.fragmentShader=`
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        ${e.fragmentShader}`,e.fragmentShader=e.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>

      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif

      vec4 new_vUv = my_vUv;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;

      vec4 base = texture2DProj(tDiffuse, new_vUv);
      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);

      vec4 merge = base;

      #ifdef USE_NORMALMAP
        vec2 normal_uv = vec2(0.0);
        vec4 normalColor = texture2D(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
        vec4 base_normal = texture2D(tDiffuse, normal_uv);
        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
        merge = base_normal;
        blur = blur_normal;
      #endif

      float depthFactor = 0.0001;
      float blurFactor = 0.0;

      #ifdef USE_DEPTH
        vec4 depth = texture2DProj(tDepth, new_vUv);
        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
        depthFactor *= depthScale;
        depthFactor = max(0.0001, min(1.0, depthFactor));

        #ifdef USE_BLUR
          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
          merge = merge * min(1.0, depthFactor + 0.5);
        #else
          merge = merge * depthFactor;
        #endif

      #endif

      float reflectorRoughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
        reflectorRoughnessFactor *= reflectorTexelRoughness.g;
      #endif

      #ifdef USE_BLUR
        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
        merge = mix(merge, blur, blurFactor);
      #endif

      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;

      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}}const ct=""+new URL("rgh-OQHteBbA.jpg",import.meta.url).href,mt=""+new URL("paper_normal-04Chbw_b.jpg",import.meta.url).href,_e={rgh:ct,paper_normal:mt};let he,f,h,E,_,re,ce=new I;const k=new Ge,Se=new $e,be=new rt,Ce=new at;let g;Ce.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");be.setDRACOLoader(Ce);const Te=new Ve,H=[];let Ee=()=>{},ue;async function Ct(t){re=t,ue=re.addFolder("Scene"),he=new et,app.appendChild(he.dom),f=new Ie({antialias:!0}),f.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),f.setSize(window.innerWidth,window.innerHeight),f.shadowMap.enabled=!0,f.shadowMap.type=ze,f.outputColorSpace=Ne,f.toneMapping=We,app.appendChild(f.domElement),h=new ye(50,window.innerWidth/window.innerHeight,.1,200),h.position.set(6,3,6),h.name="Camera",h.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),E=new Ue,E.add(k),_=new tt(h,f.domElement),_.enableDamping=!0,_.dampingFactor=.05,_.minDistance=.1,_.maxDistance=100,_.maxPolarAngle=Math.PI/1.5,_.target.set(0,0,0),_.target.set(0,0,0),g=new ot(h,f.domElement),g.addEventListener("dragging-changed",i=>{_.enabled=!i.value,i.value}),g.addEventListener("change",()=>{g.object&&g.object.position.y<0&&(g.object.position.y=0)}),E.add(g.getHelper()),window.addEventListener("resize",pt),document.addEventListener("pointermove",Me);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",i=>{Date.now()-e<200&&(Me(i),vt())}),ue.add(g,"mode",["translate","rotate","scale"]);const n=new lt(E);n.preset=Ze.dancing_hall,n.setEnvType("HDRI"),n.setBGType("GroundProjection"),n.updateAll(),n.addGui(ue),await gt(),Fe()}function pt(){h.aspect=window.innerWidth/window.innerHeight,h.updateProjectionMatrix(),f.setSize(window.innerWidth,window.innerHeight)}function ft(){he.update(),st(),_.update(),Ee(),f.render(E,h)}function Fe(){requestAnimationFrame(Fe),ft()}function vt(){if(Te.setFromCamera(ce,h),Te.intersectObject(k,!0,H),!H.length){g.detach();return}H[0].object.selectOnRaycast?g.attach(H[0].object.selectOnRaycast):g.attach(H[0].object),H.length=0}function Me(t){ce.x=t.clientX/window.innerWidth*2-1,ce.y=-(t.clientY/window.innerHeight)*2+1}async function gt(){const t=new ee(new ke(.5).translate(0,.5,0),new te({color:De(),roughness:0,metalness:1}));t.name="sphere",t.castShadow=!0,t.receiveShadow=!0,t.position.set(2,0,-1.5),k.add(t);const e=new ee(new Xe(1,1,1).translate(0,.5,0),new te({color:De(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),k.add(e);const i=(await be.loadAsync(ut.porsche_1975.url)).scene;i.name="car",i.traverse(d=>{d.isMesh&&(d.castShadow=!0,d.receiveShadow=!0,d.selectOnRaycast=i,d.name)}),k.add(i);const l={FL:null,FR:null,R:null,steerL:null,steerR:null,steerVal:0};l.R=i.getObjectByName("wheels_rear"),l.steerL=i.getObjectByName("wheel_L"),l.steerR=i.getObjectByName("wheel_R");const x=ge.degToRad(30);new nt(l).to({steerVal:1},3e3).easing(it.Elastic.Out).delay(3e3).repeatDelay(5e3).repeat(1e4).yoyo(!0).onUpdate(()=>{const d=ge.mapLinear(l.steerVal,0,1,-x,x);l.steerL.rotation.y=d,l.steerR.rotation.y=d}).start(),xt()}async function xt(){const t={resolution:1024,blurX:1024,blurY:1024,depthScale:1};let e=1,n=5,i=0,l=1,x=.25,d=0,F=.25,L=1,S=0,y=.6,w=1,P=new Re(4671303);const r=f;let R=t.blurX+t.blurY>0;const O=new Ye,D=new j,b=new j,ae=new j,z=new xe,X=new j(0,0,-1),T=new we,N=new j,Y=new j,W=new we,G=new xe,c=new ye,Le=u=>{if(b.setFromMatrixPosition(u.matrixWorld),ae.setFromMatrixPosition(h.matrixWorld),z.extractRotation(u.matrixWorld),D.set(0,0,1),D.applyMatrix4(z),b.addScaledVector(D,S),N.subVectors(b,ae),N.dot(D)>0)return;N.reflect(D).negate(),N.add(b),z.extractRotation(h.matrixWorld),X.set(0,0,-1),X.applyMatrix4(z),X.add(ae),Y.subVectors(b,X),Y.reflect(D).negate(),Y.add(b),c.position.copy(N),c.up.set(0,1,0),c.up.applyMatrix4(z),c.up.reflect(D),c.lookAt(Y),c.far=h.far,c.updateMatrixWorld(),c.projectionMatrix.copy(h.projectionMatrix),G.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),G.multiply(c.projectionMatrix),G.multiply(c.matrixWorldInverse),G.multiply(u.matrixWorld),O.setFromNormalAndCoplanarPoint(D,b),O.applyMatrix4(c.matrixWorldInverse),T.set(O.normal.x,O.normal.y,O.normal.z,O.constant);const o=c.projectionMatrix;W.x=(Math.sign(T.x)+o.elements[8])/o.elements[0],W.y=(Math.sign(T.y)+o.elements[9])/o.elements[5],W.z=-1,W.w=(1+o.elements[10])/o.elements[14],T.multiplyScalar(2/T.dot(W)),o.elements[2]=T.x,o.elements[6]=T.y,o.elements[10]=T.z+1,o.elements[14]=T.w};function me(){const u={minFilter:Z,magFilter:Z,colorSpace:r.outputColorSpace,type:Be},o=new de(t.resolution,t.resolution,u);o.depthBuffer=!0,o.depthTexture=new Qe(t.resolution,t.resolution),o.depthTexture.format=Je,o.depthTexture.type=Ke;const ie=new de(t.resolution,t.resolution,u),se=new ht({gl:r,resolution:t.resolution,width:t.blurX,height:t.blurY,minDepthThreshold:i,maxDepthThreshold:l,depthScale:t.depthScale,depthToBlurRatioBias:x});console.log(se);const pe={mirror:d,textureMatrix:G,mixBlur:e,tDiffuse:o.texture,tDepth:o.depthTexture,tDiffuseBlur:ie.texture,hasBlur:R,mixStrength:n,minDepthThreshold:i,maxDepthThreshold:l,depthScale:t.depthScale,depthToBlurRatioBias:x,distortion:F,mixContrast:L,metalness:y,roughness:w,color:P},fe={"defines-USE_BLUR":R?"":void 0,"defines-USE_DEPTH":t.depthScale>0?"":void 0,"defines-USE_DISTORTION":void 0};return console.log({fbo1:o,fbo2:ie,blurpass:se,reflectorProps:pe,defines:fe}),[o,ie,se,pe,fe]}let[$,oe,V,q,C]=me();function Q(){$.dispose(),oe.dispose(),V.renderTargetA.dispose(),V.renderTargetB.dispose(),V.convolutionMaterial.dispose(),R=t.blurX+t.blurY>0,[$,oe,V,q,C]=me(),v.reflector.dispose(),v.reflector=new le(q),v.reflector.defines.USE_BLUR=C["defines-USE_BLUR"],v.reflector.defines.USE_DEPTH=C["defines-USE_DEPTH"],v.reflector.defines.USE_DISTORTION=C["defines-USE_DISTORTION"],a=v.reflector,J(),m.materialType instanceof le&&(m.materialType=v.reflector,U.material=m.materialType)}function J(){m.useRoughnessMap?(a.roughnessMap=B,M.roughnessMap=B):(a.roughnessMap=null,M.roughnessMap=null),m.useDistortionMap?a.distortionMap=B:a.distortionMap=null,m.useNormalMap?(a.normalMap=A,M.normalMap=A):(a.normalMap=null,M.normalMap=null),a.needsUpdate=!0,M.needsUpdate=!0}const v={standard:new te({roughness:w}),reflector:new le(q)},M=v.standard;let a=v.reflector;a.defines.USE_BLUR=C["defines-USE_BLUR"],a.defines.USE_DEPTH=C["defines-USE_DEPTH"],a.defines.USE_DISTORTION=C["defines-USE_DISTORTION"];const B=await Se.loadAsync(_e.rgh);B.wrapS=K,B.wrapT=K;const A=await Se.loadAsync(_e.paper_normal);A.wrapS=K,A.wrapT=K,A.repeat.set(5,5),B.repeat.set(5,5),M.roughnessMap=B,M.color.set(P);const m={materialType:v.reflector,useRoughnessMap:!1,useDistortionMap:!1,useNormalMap:!1,normalScale:1,repeat:5},U=new ee(new qe(5,32),m.materialType);U.rotateX(-Math.PI/2),U.name="floor",U.receiveShadow=!0,U.position.set(0,.001,0),E.add(U),console.log({reflectorProps:q,material:a}),re.add(m,"materialType",v).onChange(u=>{U.material=u});const s=re.addFolder("MeshReflectorMaterial");s.open(),s.add(t,"resolution",128,2048,128).name("⚠ Resolution").onChange(Q),s.add(t,"blurX",16,2048,128).name("⚠ Blur X").onChange(Q),s.add(t,"blurY",16,2048,128).name("⚠ Blur Y").onChange(Q),s.add(t,"depthScale",0,10).name("⚠ DEPTH SCALE").onChange(Q),s.add(m,"useRoughnessMap").onChange(J),s.add(m,"useDistortionMap").onChange(J),s.add(m,"useNormalMap").onChange(J),s.addColor(a,"color").onChange(()=>{M.color.copy(a.color)}),s.add(m,"normalScale",0,1).onChange(u=>{a.normalScale.setScalar(u),M.normalScale.setScalar(u)}),s.add(m,"repeat",1,15,1).onChange(u=>{B.repeat.setScalar(u),A.repeat.setScalar(u)}),s.add(a,"mixStrength",0,15),s.add(a,"mixBlur",0,6),s.add(a,"mixContrast",0,5),s.add(a,"metalness",0,1),s.add(a,"roughness",0,1),s.add(a,"distortion",-2,2);const ne=U;Ee=()=>{ne.visible=!1;const u=r.xr.enabled,o=r.shadowMap.autoUpdate;Le(ne),r.xr.enabled=!1,r.shadowMap.autoUpdate=!1,r.setRenderTarget($),r.state.buffers.depth.setMask(!0),r.autoClear||r.clear(),r.render(E,c),R&&V.render(r,$,oe),r.xr.enabled=u,r.shadowMap.autoUpdate=o,ne.visible=!0,r.setRenderTarget(null)}}const wt=new Re;function De(){return"#"+wt.setHSL(Math.random(),.5,.5).getHexString()}export{Ct as default};
