import{S as G,O as j,G as O,D as X}from"./OrbitControls-FqkbUa6U.js";import{T as H}from"./TransformControls-DIS8GcSd.js";import{aG as N,M as Y,Y as Z,aH as q,Z as J,aI as F,aJ as K,K as Q,aK as $,a7 as ee,z as te,c as B,_ as M,ap as ne,aL as oe,aM as ae,aN as re,ao as ie,aO as le,s as I,C as ce,W as se,a as ue,b as de,G as fe,aP as pe,R as me}from"./three.module-CpOMtsua.js";import{B as we}from"./BG_ENV-DSI1sdw8.js";import{s as xe}from"./shaderMaterial-BSjRKRz3.js";import"./EXRLoader-DkJrvfaI.js";import"./HDRLoader-CNYvXwJL.js";import"./GroundProjectedSkybox-DU_m07Wz.js";import"./HDRI_LIST-DJCqOZOR.js";const ve=xe({alphaTest:0,viewport:new B(1980,1080),focal:1e3,centerAndScaleTexture:null,covAndColorTexture:null},`
    precision highp sampler2D;
    precision highp usampler2D;
    out vec4 vColor;
    out vec3 vPosition;
    uniform vec2 resolution;
    uniform vec2 viewport;
    uniform float focal;
    attribute uint splatIndex;
    uniform sampler2D centerAndScaleTexture;
    uniform usampler2D covAndColorTexture;    

    vec2 unpackInt16(in uint value) {
      int v = int(value);
      int v0 = v >> 16;
      int v1 = (v & 0xFFFF);
      if((v & 0x8000) != 0)
        v1 |= 0xFFFF0000;
      return vec2(float(v1), float(v0));
    }

    void main () {
      ivec2 texSize = textureSize(centerAndScaleTexture, 0);
      ivec2 texPos = ivec2(splatIndex%uint(texSize.x), splatIndex/uint(texSize.x));
      vec4 centerAndScaleData = texelFetch(centerAndScaleTexture, texPos, 0);
      vec4 center = vec4(centerAndScaleData.xyz, 1);
      vec4 camspace = modelViewMatrix * center;
      vec4 pos2d = projectionMatrix * camspace;

      float bounds = 1.2 * pos2d.w;
      if (pos2d.z < -pos2d.w || pos2d.x < -bounds || pos2d.x > bounds
        || pos2d.y < -bounds || pos2d.y > bounds) {
        gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
        return;
      }

      uvec4 covAndColorData = texelFetch(covAndColorTexture, texPos, 0);
      vec2 cov3D_M11_M12 = unpackInt16(covAndColorData.x) * centerAndScaleData.w;
      vec2 cov3D_M13_M22 = unpackInt16(covAndColorData.y) * centerAndScaleData.w;
      vec2 cov3D_M23_M33 = unpackInt16(covAndColorData.z) * centerAndScaleData.w;
      mat3 Vrk = mat3(
        cov3D_M11_M12.x, cov3D_M11_M12.y, cov3D_M13_M22.x,
        cov3D_M11_M12.y, cov3D_M13_M22.y, cov3D_M23_M33.x,
        cov3D_M13_M22.x, cov3D_M23_M33.x, cov3D_M23_M33.y
      );

      mat3 J = mat3(
        focal / camspace.z, 0., -(focal * camspace.x) / (camspace.z * camspace.z),
        0., focal / camspace.z, -(focal * camspace.y) / (camspace.z * camspace.z),
        0., 0., 0.
      );

      mat3 W = transpose(mat3(modelViewMatrix));
      mat3 T = W * J;
      mat3 cov = transpose(T) * Vrk * T;
      vec2 vCenter = vec2(pos2d) / pos2d.w;
      float diagonal1 = cov[0][0] + 0.3;
      float offDiagonal = cov[0][1];
      float diagonal2 = cov[1][1] + 0.3;
      float mid = 0.5 * (diagonal1 + diagonal2);
      float radius = length(vec2((diagonal1 - diagonal2) / 2.0, offDiagonal));
      float lambda1 = mid + radius;
      float lambda2 = max(mid - radius, 0.1);
      vec2 diagonalVector = normalize(vec2(offDiagonal, lambda1 - diagonal1));
      vec2 v1 = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
      vec2 v2 = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);
      uint colorUint = covAndColorData.w;
      vColor = vec4(
        float(colorUint & uint(0xFF)) / 255.0,
        float((colorUint >> uint(8)) & uint(0xFF)) / 255.0,
        float((colorUint >> uint(16)) & uint(0xFF)) / 255.0,
        float(colorUint >> uint(24)) / 255.0
      );
      vPosition = position;

      gl_Position = vec4(
        vCenter 
          + position.x * v2 / viewport * 2.0 
          + position.y * v1 / viewport * 2.0, pos2d.z / pos2d.w, 1.0);
    }
    `,`
    #include <alphatest_pars_fragment>
    #include <alphahash_pars_fragment>
    in vec4 vColor;
    in vec3 vPosition;
    void main () {
      float A = -dot(vPosition.xy, vPosition.xy);
      if (A < -4.0) discard;
      float B = exp(A) * vColor.a;
      vec4 diffuseColor = vec4(vColor.rgb, B);
      #include <alphatest_fragment>
      #include <alphahash_fragment>
      gl_FragColor = diffuseColor;
      #include <tonemapping_fragment>
      #include <${parseInt(te.replace(/\D+/g,""))>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `);function ge(e){let n=null,t=0;function r(a,i=!1){const l=n.length/16,m=-1e-4;let f=-1/0,o=1/0;const c=new Float32Array(l),p=new Int32Array(c.buffer),w=new Int32Array(l);let u=0;for(let s=0;s<l;s++){const d=a[0]*n[s*16+12]+a[1]*n[s*16+13]+a[2]*n[s*16+14]+a[3];(i||d<0&&n[s*16+15]>m*d)&&(c[u]=d,w[u]=s,u++,d>f&&(f=d),d<o&&(o=d))}const x=(256*256-1)/(f-o),T=new Uint32Array(256*256);for(let s=0;s<u;s++)p[s]=(c[s]-o)*x|0,T[p[s]]++;const D=new Uint32Array(256*256);for(let s=1;s<256*256;s++)D[s]=D[s-1]+T[s-1];const v=new Uint32Array(u);for(let s=0;s<u;s++)v[D[p[s]]++]=w[s];return v}e.onmessage=a=>{if(a.data.method=="push"){t===0&&(n=new Float32Array(a.data.length));const i=new Float32Array(a.data.matrices);n.set(i,t),t+=i.length}else if(a.data.method=="sort"&&n!==null){const i=r(new Float32Array(a.data.view),a.data.hashed);e.postMessage({indices:i,key:a.data.key},[i.buffer])}}}class ye extends N{constructor(n,t=25e3){super(),this.gl=n,this.chunkSize=t}async loadAsync(n,t,r){return new Promise(a=>this.load(n,a,t,r))}load(n,t,r,a){const i={gl:this.gl,url:this.manager.resolveURL(n),worker:new Worker(URL.createObjectURL(new Blob(["(",ge.toString(),")(self)"],{type:"application/javascript"}))),manager:this.manager,update:(l,m,f)=>Te(m,i,l,f),connect:l=>De(i,l),loading:!1,loaded:!1,loadedVertexCount:0,chunkSize:this.chunkSize,totalDownloadBytes:0,numVertices:0,rowLength:32,maxVertexes:0,bufferTextureWidth:0,bufferTextureHeight:0,stream:null,centerAndScaleData:null,covAndColorData:null,covAndColorTexture:null,centerAndScaleTexture:null,onProgress:r};be(i).then(t).catch(l=>{a?.(l),i.manager.itemError(i.url)})}}async function be(e){e.manager.itemStart(e.url);const n=await fetch(e.url);if(n.body===null)throw"Failed to fetch file";const t=n.headers.get("Content-Length"),r=t?parseInt(t):void 0;if(r==null)throw"Failed to get content length";e.stream=n.body.getReader(),e.totalDownloadBytes=r,e.numVertices=Math.floor(e.totalDownloadBytes/e.rowLength);const a=e.gl.getContext(),i=a.getParameter(a.MAX_TEXTURE_SIZE);return e.maxVertexes=i*i,e.numVertices>e.maxVertexes&&(e.numVertices=e.maxVertexes),e.bufferTextureWidth=i,e.bufferTextureHeight=Math.floor((e.numVertices-1)/i)+1,e.centerAndScaleData=new Float32Array(e.bufferTextureWidth*e.bufferTextureHeight*4),e.covAndColorData=new Uint32Array(e.bufferTextureWidth*e.bufferTextureHeight*4),e.centerAndScaleTexture=new F(e.centerAndScaleData,e.bufferTextureWidth,e.bufferTextureHeight,K,Q),e.centerAndScaleTexture.needsUpdate=!0,e.covAndColorTexture=new F(e.covAndColorData,e.bufferTextureWidth,e.bufferTextureHeight,$,ee),e.covAndColorTexture.internalFormat="RGBA32UI",e.covAndColorTexture.needsUpdate=!0,e}async function Ae(e){e.loading=!0;let n=0,t=0;const r=[];let a=0;const i=e.totalDownloadBytes!==0;for(;;)try{const{value:l,done:m}=await e.stream.read();if(m)break;if(n+=l.length,e.totalDownloadBytes!=null){const o=n/e.totalDownloadBytes*100;if(e.onProgress&&o-a>1){const c=new ProgressEvent("progress",{lengthComputable:i,loaded:n,total:e.totalDownloadBytes});e.onProgress(c),a=o}}r.push(l);const f=n-t;if(e.totalDownloadBytes!=null&&f>e.rowLength*e.chunkSize){const o=Math.floor(f/e.rowLength),c=new Uint8Array(f);let p=0;for(const x of r)c.set(x,p),p+=x.length;if(r.length=0,f>o*e.rowLength){const x=new Uint8Array(f-o*e.rowLength);x.set(c.subarray(f-x.length,f),0),r.push(x)}const w=new Uint8Array(o*e.rowLength);w.set(c.subarray(0,w.byteLength),0);const u=P(e,w.buffer,o);if(e.worker.postMessage({method:"push",src:e.url,length:e.numVertices*16,matrices:u.buffer},[u.buffer]),t+=o*e.rowLength,e.onProgress){const x=new ProgressEvent("progress",{lengthComputable:i,loaded:e.totalDownloadBytes,total:e.totalDownloadBytes});e.onProgress(x)}}}catch(l){console.error(l);break}if(n-t>0){const l=new Uint8Array(r.reduce((c,p)=>c+p.length,0));let m=0;for(const c of r)l.set(c,m),m+=c.length;const f=Math.floor(l.byteLength/e.rowLength),o=P(e,l.buffer,f);e.worker.postMessage({method:"push",src:e.url,length:f*16,matrices:o.buffer},[o.buffer])}e.loaded=!0,e.manager.itemEnd(e.url)}function Te(e,n,t,r){if(e.updateMatrixWorld(),n.gl.getCurrentViewport(t.viewport),t.material.viewport.x=t.viewport.z,t.material.viewport.y=t.viewport.w,t.material.focal=t.viewport.w/2*Math.abs(e.projectionMatrix.elements[5]),t.ready){if(r&&t.sorted)return;t.ready=!1;const a=new Float32Array([t.modelViewMatrix.elements[2],-t.modelViewMatrix.elements[6],t.modelViewMatrix.elements[10],t.modelViewMatrix.elements[14]]);n.worker.postMessage({method:"sort",src:n.url,key:t.uuid,view:a.buffer,hashed:r},[a.buffer]),r&&n.loaded&&(t.sorted=!0)}}function De(e,n){e.loading||Ae(e),n.ready=!1,n.pm=new M,n.vm1=new M,n.vm2=new M,n.viewport=new ne;const t=new Uint32Array(e.bufferTextureWidth*e.bufferTextureHeight),r=new oe(t,1,!1);r.setUsage(ae);const a=n.geometry=new re,i=new Float32Array(18),l=new ie(i,3);a.setAttribute("position",l),l.setXYZ(2,-2,2,0),l.setXYZ(1,2,2,0),l.setXYZ(0,-2,-2,0),l.setXYZ(5,-2,-2,0),l.setXYZ(4,2,2,0),l.setXYZ(3,2,-2,0),l.needsUpdate=!0,a.setAttribute("splatIndex",r),a.instanceCount=1;function m(o){if(n&&o.data.key===n.uuid){const c=new Uint32Array(o.data.indices);a.attributes.splatIndex.set(c),a.attributes.splatIndex.needsUpdate=!0,a.instanceCount=c.length,n.ready=!0}}e.worker.addEventListener("message",m);async function f(){for(;;){const o=e.gl.properties.get(e.centerAndScaleTexture),c=e.gl.properties.get(e.covAndColorTexture);if(o!=null&&o.__webglTexture&&c!=null&&c.__webglTexture&&e.loadedVertexCount>0)break;await new Promise(p=>setTimeout(p,10))}n.ready=!0}return f(),()=>e.worker.removeEventListener("message",m)}function P(e,n,t){const r=e.gl.getContext();if(e.loadedVertexCount+t>e.maxVertexes&&(t=e.maxVertexes-e.loadedVertexCount),t<=0)throw"Failed to parse file";const a=new Uint8Array(n),i=new Float32Array(n),l=new Float32Array(t*16),m=new Uint8Array(e.covAndColorData.buffer),f=new Int16Array(e.covAndColorData.buffer);for(let o=0;o<t;o++){const c=new le(-(a[32*o+28+1]-128)/128,(a[32*o+28+2]-128)/128,(a[32*o+28+3]-128)/128,-(a[32*o+28+0]-128)/128);c.invert();const p=new I(i[8*o+0],i[8*o+1],-i[8*o+2]),w=new I(i[8*o+3+0],i[8*o+3+1],i[8*o+3+2]),u=new M;u.makeRotationFromQuaternion(c),u.transpose(),u.scale(w);const x=u.clone();u.transpose(),u.premultiply(x),u.setPosition(p);const T=[0,1,2,5,6,10];let D=0;for(let d=0;d<T.length;d++)Math.abs(u.elements[T[d]])>D&&(D=Math.abs(u.elements[T[d]]));let v=e.loadedVertexCount*4+o*4;e.centerAndScaleData[v+0]=p.x,e.centerAndScaleData[v+1]=-p.y,e.centerAndScaleData[v+2]=p.z,e.centerAndScaleData[v+3]=D/32767,v=e.loadedVertexCount*8+o*4*2;for(let d=0;d<T.length;d++)f[v+d]=u.elements[T[d]]*32767/D;v=e.loadedVertexCount*16+(o*4+3)*4;const s=new ce(a[32*o+24+0]/255,a[32*o+24+1]/255,a[32*o+24+2]/255);s.convertSRGBToLinear(),m[v+0]=s.r*255,m[v+1]=s.g*255,m[v+2]=s.b*255,m[v+3]=a[32*o+24+3],u.elements[15]=Math.max(w.x,w.y,w.z)*a[32*o+24+3]/255;for(let d=0;d<16;d++)l[o*16+d]=u.elements[d]}for(;t>0;){let o=0,c=0;const p=e.loadedVertexCount%e.bufferTextureWidth,w=Math.floor(e.loadedVertexCount/e.bufferTextureWidth);e.loadedVertexCount%e.bufferTextureWidth!=0?(o=Math.min(e.bufferTextureWidth,p+t)-p,c=1):Math.floor(t/e.bufferTextureWidth)>0?(o=e.bufferTextureWidth,c=Math.floor(t/e.bufferTextureWidth)):(o=t%e.bufferTextureWidth,c=1);const u=e.gl.properties.get(e.centerAndScaleTexture);r.bindTexture(r.TEXTURE_2D,u.__webglTexture),r.texSubImage2D(r.TEXTURE_2D,0,p,w,o,c,r.RGBA,r.FLOAT,e.centerAndScaleData,e.loadedVertexCount*4);const x=e.gl.properties.get(e.covAndColorTexture);r.bindTexture(r.TEXTURE_2D,x.__webglTexture),r.texSubImage2D(r.TEXTURE_2D,0,p,w,o,c,r.RGBA_INTEGER,r.UNSIGNED_INT,e.covAndColorData,e.loadedVertexCount*4),e.gl.resetState(),e.loadedVertexCount+=o*c,t-=o*c}return l}class L extends Y{constructor(n,t,{toneMapped:r=!1,alphaTest:a=0,alphaHash:i=!1}={}){super(),this.frustumCulled=!1,this.onBeforeRender=()=>n.update(this,t,i),this.material=new ve,Object.assign(this.material,{transparent:!i,depthTest:!0,alphaTest:i?0:a,centerAndScaleTexture:n.centerAndScaleTexture,covAndColorTexture:n.covAndColorTexture,depthWrite:i?!0:a>0,blending:i?q:J,blendSrcAlpha:Z,alphaHash:!!i,toneMapped:r}),n.connect(this)}}let h,A,y,C,b,k,V=new B;const E=new fe,Ce=new O,z=new X;let g;z.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");Ce.setDRACOLoader(z);const U=new me,_=[];let S;async function Ee(e){k=e,S=k.addFolder("Scene"),h=new G,app.appendChild(h.dom),A=new se({antialias:!0,alpha:!0}),A.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),A.setSize(window.innerWidth,window.innerHeight),app.appendChild(A.domElement),y=new ue(50,window.innerWidth/window.innerHeight,.1,200),y.position.set(2,2,2),y.name="Camera",C=new de,C.add(E),b=new j(y,A.domElement),b.enableDamping=!0,b.dampingFactor=.05,b.minDistance=.1,b.maxDistance=100,b.maxPolarAngle=Math.PI/1.5,b.target.set(0,.5,0),g=new H(y,A.domElement),g.addEventListener("dragging-changed",r=>{b.enabled=!r.value,r.value}),g.addEventListener("change",()=>{g.object&&g.object.position.y<0&&(g.object.position.y=0)}),C.add(g.getHelper()),window.addEventListener("resize",_e),document.addEventListener("pointermove",R);let n=Date.now();app.addEventListener("pointerdown",()=>{n=Date.now()}),app.addEventListener("pointerup",r=>{Date.now()-n<200&&(R(r),Se())}),S.add(g,"mode",["translate","rotate","scale"]);const t=new we(C);t.setBGType("Color"),t.bgColor.set("grey"),t.setEnvType("HDRI"),t.updateAll(),t.addGui(S),C.add(new pe),he(),W()}function _e(){y.aspect=window.innerWidth/window.innerHeight,y.updateProjectionMatrix(),A.setSize(window.innerWidth,window.innerHeight)}function Me(){h.update(),b.update(),A.render(C,y)}function W(){requestAnimationFrame(W),Me()}function Se(){if(U.setFromCamera(V,y),U.intersectObject(E,!0,_),!_.length){g.detach();return}_[0].object.selectOnRaycast?g.attach(_[0].object.selectOnRaycast):g.attach(_[0].object),_.length=0}function R(e){V.x=e.clientX/window.innerWidth*2-1,V.y=-(e.clientY/window.innerHeight)*2+1}async function he(){const e="https://huggingface.co/cakewalk/splat-data/resolve/main",n=new ye(A,25e3),[t,r]=await Promise.all([new Promise(l=>n.load(`${e}/nike.splat`,l))]),a=new L(t,y,{alphaTest:.1});a.scale.setScalar(.5),a.position.set(0,1.6,2),C.add(a);const i=new L(t,y,{alphaTest:.1});i.scale.setScalar(.5),i.position.set(0,1.6,-1.5),i.rotation.set(Math.PI,0,Math.PI),C.add(i),g.attach(i)}export{Ee as default};
