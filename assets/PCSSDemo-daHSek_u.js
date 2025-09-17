import{m as f,W as x,S as b,A as z,a as B,b as G,G as P,D as F,n as M,c as T,o as u,T as A,R as y,C as L}from"./three.module-N8Yg3gBE.js";import{S as k,O as U,G as W,D as H}from"./OrbitControls-l8VhczwG.js";import{E as $}from"./EXRLoader-D5rljWPQ.js";import{T as j}from"./TransformControls-C-UG_SIt.js";import{T as q,G as Y,E as X}from"./tween.esm-DFB-vPb4.js";import{M as Z}from"./MODEL_LIST-DWUBpEFf.js";function Q(o,t,e){t.traverse(n=>{n.material&&(Array.isArray(n.material)?n.material.forEach(s=>{o.properties.remove(s),s.dispose()}):(o.properties.remove(n.material),n.material.dispose()))}),o.info.programs.length=0,o.compile(t,e)}const V=({focus:o=0,size:t=25,samples:e=10}={})=>{const n=f.shadowmap_pars_fragment;return f.shadowmap_pars_fragment=f.shadowmap_pars_fragment.replace("#ifdef USE_SHADOWMAP",`#ifdef USE_SHADOWMAP

    #define PENUMBRA_FILTER_SIZE float(${t})
    #define RGB_NOISE_FUNCTION(uv) (randRGB(uv))
    vec3 randRGB(vec2 uv) {
      return vec3(
        fract(sin(dot(uv, vec2(12.75613, 38.12123))) * 13234.76575),
        fract(sin(dot(uv, vec2(19.45531, 58.46547))) * 43678.23431),
        fract(sin(dot(uv, vec2(23.67817, 78.23121))) * 93567.23423)
      );
    }
    
    vec3 lowPassRandRGB(vec2 uv) {
      // 3x3 convolution (average)
      // can be implemented as separable with an extra buffer for a total of 6 samples instead of 9
      vec3 result = vec3(0);
      result += RGB_NOISE_FUNCTION(uv + vec2(-1.0, -1.0));
      result += RGB_NOISE_FUNCTION(uv + vec2(-1.0,  0.0));
      result += RGB_NOISE_FUNCTION(uv + vec2(-1.0, +1.0));
      result += RGB_NOISE_FUNCTION(uv + vec2( 0.0, -1.0));
      result += RGB_NOISE_FUNCTION(uv + vec2( 0.0,  0.0));
      result += RGB_NOISE_FUNCTION(uv + vec2( 0.0, +1.0));
      result += RGB_NOISE_FUNCTION(uv + vec2(+1.0, -1.0));
      result += RGB_NOISE_FUNCTION(uv + vec2(+1.0,  0.0));
      result += RGB_NOISE_FUNCTION(uv + vec2(+1.0, +1.0));
      result *= 0.111111111; // 1.0 / 9.0
      return result;
    }
    vec3 highPassRandRGB(vec2 uv) {
      // by subtracting the low-pass signal from the original signal, we're being left with the high-pass signal
      // hp(x) = x - lp(x)
      return RGB_NOISE_FUNCTION(uv) - lowPassRandRGB(uv) + 0.5;
    }
    
    
    vec2 vogelDiskSample(int sampleIndex, int sampleCount, float angle) {
      const float goldenAngle = 2.399963f; // radians
      float r = sqrt(float(sampleIndex) + 0.5f) / sqrt(float(sampleCount));
      float theta = float(sampleIndex) * goldenAngle + angle;
      float sine = sin(theta);
      float cosine = cos(theta);
      return vec2(cosine, sine) * r;
    }
    float penumbraSize( const in float zReceiver, const in float zBlocker ) { // Parallel plane estimation
      return (zReceiver - zBlocker) / zBlocker;
    }
    float findBlocker(sampler2D shadowMap, vec2 uv, float compare, float angle) {
      float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);
      float blockerDepthSum = float(${o});
      float blockers = 0.0;
    
      int j = 0;
      vec2 offset = vec2(0.);
      float depth = 0.;
    
      #pragma unroll_loop_start
      for(int i = 0; i < ${e}; i ++) {
        offset = (vogelDiskSample(j, ${e}, angle) * texelSize) * 2.0 * PENUMBRA_FILTER_SIZE;
        depth = unpackRGBAToDepth( texture2D( shadowMap, uv + offset));
        if (depth < compare) {
          blockerDepthSum += depth;
          blockers++;
        }
        j++;
      }
      #pragma unroll_loop_end
    
      if (blockers > 0.0) {
        return blockerDepthSum / blockers;
      }
      return -1.0;
    }
            
    float vogelFilter(sampler2D shadowMap, vec2 uv, float zReceiver, float filterRadius, float angle) {
      float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);
      float shadow = 0.0f;
      int j = 0;
      vec2 vogelSample = vec2(0.0);
      vec2 offset = vec2(0.0);
      #pragma unroll_loop_start
      for (int i = 0; i < ${e}; i++) {
        vogelSample = vogelDiskSample(j, ${e}, angle) * texelSize;
        offset = vogelSample * (1.0 + filterRadius * float(${t}));
        shadow += step( zReceiver, unpackRGBAToDepth( texture2D( shadowMap, uv + offset ) ) );
        j++;
      }
      #pragma unroll_loop_end
      return shadow * 1.0 / ${e}.0;
    }
    
    float PCSS (sampler2D shadowMap, vec4 coords) {
      vec2 uv = coords.xy;
      float zReceiver = coords.z; // Assumed to be eye-space z in this code
      float angle = highPassRandRGB(gl_FragCoord.xy).r * PI2;
      float avgBlockerDepth = findBlocker(shadowMap, uv, zReceiver, angle);
      if (avgBlockerDepth == -1.0) {
        return 1.0;
      }
      float penumbraRatio = penumbraSize(zReceiver, avgBlockerDepth);
      return vogelFilter(shadowMap, uv, zReceiver, 1.25 * penumbraRatio, angle);
    }`).replace("#if defined( SHADOWMAP_TYPE_PCF )",`
return mix( 1.0, PCSS(shadowMap, shadowCoord), shadowIntensity );
#if defined( SHADOWMAP_TYPE_PCF )`),(s,I,O)=>{f.shadowmap_pars_fragment=n,Q(s,I,O)}},_=new Y;let w,r,d,p,l,v,h=new T;const c={enabled:!0,size:25,focus:0,samples:10,animate:!1},R=new P;new A;new $;const C=new W,E=new H;let i;E.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");C.setDRACOLoader(E);new y;let g,a;async function le(o){v=o,g=v.addFolder("Scene"),w=new k,app.appendChild(w.dom),r=new x({antialias:!0}),r.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),r.setSize(window.innerWidth,window.innerHeight),r.shadowMap.enabled=!0,r.outputColorSpace=b,r.toneMapping=z,app.appendChild(r.domElement),d=new B(50,window.innerWidth/window.innerHeight,.1,200),d.position.set(6,3,6),d.name="Camera",d.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),p=new G,p.add(R),l=new U(d,r.domElement),l.enableDamping=!0,l.dampingFactor=.05,l.minDistance=.1,l.maxDistance=100,l.maxPolarAngle=Math.PI/1.5,l.target.set(0,0,0),l.target.set(0,0,0),i=new j(d,r.domElement),i.addEventListener("dragging-changed",s=>{l.enabled=!s.value,s.value}),i.addEventListener("change",()=>{i.object&&i.object.position.y<0&&(i.object.position.y=0)}),p.add(i.getHelper()),window.addEventListener("resize",K),document.addEventListener("pointermove",S);let t=Date.now();app.addEventListener("pointerdown",()=>{t=Date.now()}),app.addEventListener("pointerup",s=>{Date.now()-t<200&&S(s)}),g.add(i,"mode",["translate","rotate","scale"]),a=new F(16777195,5),a.name="Dir. Light",a.castShadow=!0,a.shadow.camera.near=.01,a.shadow.camera.far=100;const e=4;a.shadow.camera.right=e,a.shadow.camera.left=-e,a.shadow.camera.top=e,a.shadow.camera.bottom=-e,a.shadow.mapSize.width=2048,a.shadow.mapSize.height=2048,a.shadow.bias=-.001,a.position.set(2,2,-3),p.add(a),i.attach(a);const n=new M;p.add(n),D(),J(v),await ae(),N()}function J(o){const t=o.addFolder("PCSS");t.open(),t.onChange(()=>{D()}),t.add(c,"enabled"),t.add(c,"size",1,100,1),t.add(c,"focus",0,2),t.add(c,"samples",1,20,1);const e=o.addFolder("Defaults");e.open(),e.addColor(a,"color"),e.add(a,"intensity",0,10);let n;e.add(c,"animate").name("Animate 💡").onChange(s=>{n||(n=new q(a.position,_).to({x:u.randFloatSpread(5),y:u.randFloat(.1,5)}).duration(3e3).repeat(1/0).repeatDelay(1e3).easing(X.Quadratic.InOut).onStart(()=>{n._valuesStart={x:a.position.x,y:a.position.y},n.to({x:u.randFloatSpread(5),y:u.randFloat(.1,5)})}).onRepeat(()=>{n._onStartCallback()})),s?(i.detach(),n.start()):(i.attach(a),n.stop())})}let m=null;async function D(){m&&(m(r,p,d),m=null),c.enabled&&(m=V({size:c.size,focus:c.focus,samples:c.samples}),p.traverse(o=>{o.material&&o.material.dispose()}))}function K(){d.aspect=window.innerWidth/window.innerHeight,d.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight)}function ee(){w.update(),_.update(),l.update(),r.render(p,d)}function N(){requestAnimationFrame(N),ee()}function S(o){h.x=o.clientX/window.innerWidth*2-1,h.y=-(o.clientY/window.innerHeight)*2+1}async function ae(){const t=(await C.loadAsync(Z.room.url)).scene;t.name="room",t.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0,e.selectOnRaycast=t,e?.material.name==="lampshade"&&(e.castShadow=!1,e.receiveShadow=!1))}),R.add(t)}new L;export{le as default};
