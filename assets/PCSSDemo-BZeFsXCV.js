import{p as f,S as x,W as O,a as b,A as z,b as B,c as F,G as P,O as M,D as T,q as A,d as G,r as u,i as y,T as L,n as k,R as U,C as W}from"./OrbitControls-R0lqBEeo.js";import{E as H}from"./EXRLoader-CueWY_mu.js";import{T as $}from"./TransformControls-C9PpcTYI.js";import{T as j,E as q,u as Y}from"./tween.esm-DFB-vPb4.js";import{M as X}from"./MODEL_LIST-CX7Ggjim.js";function Z(o,t,e){t.traverse(n=>{n.material&&(Array.isArray(n.material)?n.material.forEach(i=>{o.properties.remove(i),i.dispose()}):(o.properties.remove(n.material),n.material.dispose()))}),o.info.programs.length=0,o.compile(t,e)}const Q=({focus:o=0,size:t=25,samples:e=10}={})=>{const n=f.shadowmap_pars_fragment;return f.shadowmap_pars_fragment=f.shadowmap_pars_fragment.replace("#ifdef USE_SHADOWMAP",`#ifdef USE_SHADOWMAP

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
#if defined( SHADOWMAP_TYPE_PCF )`),(i,I,N)=>{f.shadowmap_pars_fragment=n,Z(i,I,N)}};let h,r,d,p,l,v,w=new G;const c={enabled:!0,size:25,focus:0,samples:10,animate:!1},_=new P;new L;new H;const R=new y,C=new k;let s;C.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");R.setDRACOLoader(C);new U;let g,a;async function ie(o){v=o,g=v.addFolder("Scene"),h=new x,app.appendChild(h.dom),r=new O({antialias:!0}),r.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),r.setSize(window.innerWidth,window.innerHeight),r.shadowMap.enabled=!0,r.outputColorSpace=b,r.toneMapping=z,app.appendChild(r.domElement),d=new B(50,window.innerWidth/window.innerHeight,.1,200),d.position.set(6,3,6),d.name="Camera",d.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),p=new F,p.add(_),l=new M(d,r.domElement),l.enableDamping=!0,l.dampingFactor=.05,l.minDistance=.1,l.maxDistance=100,l.maxPolarAngle=Math.PI/1.5,l.target.set(0,0,0),l.target.set(0,0,0),s=new $(d,r.domElement),s.addEventListener("dragging-changed",i=>{l.enabled=!i.value,i.value}),s.addEventListener("change",()=>{s.object&&s.object.position.y<0&&(s.object.position.y=0)}),p.add(s.getHelper()),window.addEventListener("resize",J),document.addEventListener("pointermove",S);let t=Date.now();app.addEventListener("pointerdown",()=>{t=Date.now()}),app.addEventListener("pointerup",i=>{Date.now()-t<200&&S(i)}),g.add(s,"mode",["translate","rotate","scale"]),a=new T(16777195,5),a.name="Dir. Light",a.castShadow=!0,a.shadow.camera.near=.01,a.shadow.camera.far=100;const e=4;a.shadow.camera.right=e,a.shadow.camera.left=-e,a.shadow.camera.top=e,a.shadow.camera.bottom=-e,a.shadow.mapSize.width=2048,a.shadow.mapSize.height=2048,a.shadow.bias=-.001,a.position.set(2,2,-3),p.add(a),s.attach(a);const n=new A;p.add(n),E(),V(v),await ee(),D()}function V(o){const t=o.addFolder("PCSS");t.open(),t.onChange(()=>{E()}),t.add(c,"enabled"),t.add(c,"size",1,100,1),t.add(c,"focus",0,2),t.add(c,"samples",1,20,1);const e=o.addFolder("Defaults");e.open(),e.addColor(a,"color"),e.add(a,"intensity",0,10);let n;e.add(c,"animate").name("Animate 💡").onChange(i=>{n||(n=new j(a.position).to({x:u.randFloatSpread(5),y:u.randFloat(.1,5)}).duration(3e3).repeat(1/0).repeatDelay(1e3).easing(q.Quadratic.InOut).onStart(()=>{n._valuesStart={x:a.position.x,y:a.position.y},n.to({x:u.randFloatSpread(5),y:u.randFloat(.1,5)})}).onRepeat(()=>{n._onStartCallback()})),i?(s.detach(),n.start()):(s.attach(a),n.stop())})}let m=null;async function E(){m&&(m(r,p,d),m=null),c.enabled&&(m=Q({size:c.size,focus:c.focus,samples:c.samples}),p.traverse(o=>{o.material&&o.material.dispose()}))}function J(){d.aspect=window.innerWidth/window.innerHeight,d.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight)}function K(){h.update(),Y(),l.update(),r.render(p,d)}function D(){requestAnimationFrame(D),K()}function S(o){w.x=o.clientX/window.innerWidth*2-1,w.y=-(o.clientY/window.innerHeight)*2+1}async function ee(){const t=(await R.loadAsync(X.room.url)).scene;t.name="room",t.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0,e.selectOnRaycast=t,e?.material.name==="lampshade"&&(e.castShadow=!1,e.receiveShadow=!1))}),_.add(t)}new W;export{ie as default};
