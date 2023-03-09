(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const Kd="0.0.6";/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.18.0
 * @author George Michael Brower
 * @license MIT
 */class ai{constructor(e,t,n,i,s="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),ai.nextNameID=ai.nextNameID||0,this.$name.id=`lil-gui-name-${++ai.nextNameID}`,this.$widget=document.createElement(s),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Jd extends ai{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function nl(r){let e,t;return(e=r.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=r.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=r.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const Qd={isPrimitive:!0,match:r=>typeof r=="string",fromHexString:nl,toHexString:nl},Gs={isPrimitive:!0,match:r=>typeof r=="number",fromHexString:r=>parseInt(r.substring(1),16),toHexString:r=>"#"+r.toString(16).padStart(6,0)},$d={isPrimitive:!1,match:r=>Array.isArray(r),fromHexString(r,e,t=1){const n=Gs.fromHexString(r);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([r,e,t],n=1){n=255/n;const i=r*n<<16^e*n<<8^t*n<<0;return Gs.toHexString(i)}},ef={isPrimitive:!1,match:r=>Object(r)===r,fromHexString(r,e,t=1){const n=Gs.fromHexString(r);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r,g:e,b:t},n=1){n=255/n;const i=r*n<<16^e*n<<8^t*n<<0;return Gs.toHexString(i)}},tf=[Qd,Gs,$d,ef];function nf(r){return tf.find(e=>e.match(r))}class rf extends ai{constructor(e,t,n,i){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=nf(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=nl(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class la extends ai{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class sf extends ai{constructor(e,t,n,i,s,o){super(e,t,n,"number"),this._initInput(),this.min(i),this.max(s);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let x=parseFloat(this.$input.value);isNaN(x)||(this._stepExplicit&&(x=this._snap(x)),this.setValue(this._clamp(x)))},t=x=>{const w=parseFloat(this.$input.value);isNaN(w)||(this._snapClampSetValue(w+x),this.$input.value=this.getValue())},n=x=>{x.code==="Enter"&&this.$input.blur(),x.code==="ArrowUp"&&(x.preventDefault(),t(this._step*this._arrowKeyMultiplier(x))),x.code==="ArrowDown"&&(x.preventDefault(),t(this._step*this._arrowKeyMultiplier(x)*-1))},i=x=>{this._inputFocused&&(x.preventDefault(),t(this._step*this._normalizeMouseWheel(x)))};let s=!1,o,a,l,c,u;const h=5,d=x=>{o=x.clientX,a=l=x.clientY,s=!0,c=this.getValue(),u=0,window.addEventListener("mousemove",m),window.addEventListener("mouseup",v)},m=x=>{if(s){const w=x.clientX-o,g=x.clientY-a;Math.abs(g)>h?(x.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(w)>h&&v()}if(!s){const w=x.clientY-l;u-=w*this._step*this._arrowKeyMultiplier(x),c+u>this._max?u=this._max-c:c+u<this._min&&(u=this._min-c),this._snapClampSetValue(c+u)}l=x.clientY},v=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",m),window.removeEventListener("mouseup",v)},p=()=>{this._inputFocused=!0},f=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",i,{passive:!1}),this.$input.addEventListener("mousedown",d),this.$input.addEventListener("focus",p),this.$input.addEventListener("blur",f)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(x,w,g,b,M)=>(x-w)/(g-w)*(M-b)+b,t=x=>{const w=this.$slider.getBoundingClientRect();let g=e(x,w.left,w.right,this._min,this._max);this._snapClampSetValue(g)},n=x=>{this._setDraggingStyle(!0),t(x.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)},i=x=>{t(x.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)};let o=!1,a,l;const c=x=>{x.preventDefault(),this._setDraggingStyle(!0),t(x.touches[0].clientX),o=!1},u=x=>{x.touches.length>1||(this._hasScrollBar?(a=x.touches[0].clientX,l=x.touches[0].clientY,o=!0):c(x),window.addEventListener("touchmove",h,{passive:!1}),window.addEventListener("touchend",d))},h=x=>{if(o){const w=x.touches[0].clientX-a,g=x.touches[0].clientY-l;Math.abs(w)>Math.abs(g)?c(x):(window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d))}else x.preventDefault(),t(x.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d)},m=this._callOnFinishChange.bind(this),v=400;let p;const f=x=>{if(Math.abs(x.deltaX)<Math.abs(x.deltaY)&&this._hasScrollBar)return;x.preventDefault();const g=this._normalizeMouseWheel(x)*this._step;this._snapClampSetValue(this.getValue()+g),this.$input.value=this.getValue(),clearTimeout(p),p=setTimeout(m,v)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",f,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class of extends ai{constructor(e,t,n,i){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(i)?i:Object.values(i),this._names=Array.isArray(i)?i:Object.keys(i),this._names.forEach(s=>{const o=document.createElement("option");o.innerHTML=s,this.$select.appendChild(o)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.innerHTML=t===-1?e:this._names[t],this}}class af extends ai{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const lf=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  background-color: var(--background-color);
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean .widget {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background-color: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background-color: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background-color: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui input {
  -webkit-tap-highlight-color: transparent;
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input::-webkit-outer-spin-button,
.lil-gui input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.lil-gui input[type=number] {
  -moz-appearance: textfield;
}
.lil-gui input[type=checkbox] {
  appearance: none;
  -webkit-appearance: none;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  -webkit-tap-highlight-color: transparent;
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: 1px solid var(--widget-color);
  text-align: center;
  line-height: calc(var(--widget-height) - 4px);
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
    border-color: var(--hover-color);
  }
  .lil-gui button:focus {
    border-color: var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function cf(r){const e=document.createElement("style");e.innerHTML=r;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let Yl=!1;class Ll{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:i,title:s="Controls",closeFolders:o=!1,injectStyles:a=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",c=>{(c.code==="Enter"||c.code==="Space")&&(c.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),l&&this.domElement.classList.add("allow-touch-styles"),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),!Yl&&a&&(cf(lf),Yl=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this._closeFolders=o,this.domElement.addEventListener("keydown",c=>c.stopPropagation()),this.domElement.addEventListener("keyup",c=>c.stopPropagation())}add(e,t,n,i,s){if(Object(n)===n)return new of(this,e,t,n);const o=e[t];switch(typeof o){case"number":return new sf(this,e,t,n,i,s);case"boolean":return new Jd(this,e,t);case"string":return new af(this,e,t);case"function":return new la(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,o)}addColor(e,t,n=1){return new rf(this,e,t,n)}addFolder(e){const t=new Ll({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof la||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof la)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}var Ds=function(){var r=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(u){u.preventDefault(),n(++r%e.children.length)},!1);function t(u){return e.appendChild(u.dom),u}function n(u){for(var h=0;h<e.children.length;h++)e.children[h].style.display=h===u?"block":"none";r=u}var i=(performance||Date).now(),s=i,o=0,a=t(new Ds.Panel("FPS","#0ff","#002")),l=t(new Ds.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=t(new Ds.Panel("MB","#f08","#201"));return n(0),{REVISION:16,dom:e,addPanel:t,showPanel:n,begin:function(){i=(performance||Date).now()},end:function(){o++;var u=(performance||Date).now();if(l.update(u-i,200),u>=s+1e3&&(a.update(o*1e3/(u-s),100),s=u,o=0,c)){var h=performance.memory;c.update(h.usedJSHeapSize/1048576,h.jsHeapSizeLimit/1048576)}return u},update:function(){i=this.end()},domElement:e,setMode:n}};Ds.Panel=function(r,e,t){var n=1/0,i=0,s=Math.round,o=s(window.devicePixelRatio||1),a=80*o,l=48*o,c=3*o,u=2*o,h=3*o,d=15*o,m=74*o,v=30*o,p=document.createElement("canvas");p.width=a,p.height=l,p.style.cssText="width:80px;height:48px";var f=p.getContext("2d");return f.font="bold "+9*o+"px Helvetica,Arial,sans-serif",f.textBaseline="top",f.fillStyle=t,f.fillRect(0,0,a,l),f.fillStyle=e,f.fillText(r,c,u),f.fillRect(h,d,m,v),f.fillStyle=t,f.globalAlpha=.9,f.fillRect(h,d,m,v),{dom:p,update:function(x,w){n=Math.min(n,x),i=Math.max(i,x),f.fillStyle=t,f.globalAlpha=1,f.fillRect(0,0,a,d),f.fillStyle=e,f.fillText(s(x)+" "+r+" ("+s(n)+"-"+s(i)+")",c,u),f.drawImage(p,h+o,d,m-o,v,h,d,m-o,v),f.fillRect(h+m-o,d,o,v),f.fillStyle=t,f.globalAlpha=.9,f.fillRect(h+m-o,d,o,s((1-x/w)*v))}}};const Ks=Ds;/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const jo="150",xr={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},_r={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},uf=0,Zl=1,hf=2,Ch=1,df=2,Oi=3,li=0,Ut=1,dn=2,Yn=0,jr=1,Kl=2,Jl=3,Ql=4,ff=5,Or=100,pf=101,mf=102,$l=103,ec=104,gf=200,vf=201,xf=202,_f=203,Ph=204,Rh=205,yf=206,wf=207,bf=208,Mf=209,Sf=210,Tf=0,Ef=1,Af=2,il=3,Cf=4,Pf=5,Rf=6,Df=7,Dh=0,Lf=1,If=2,Zn=0,Nf=1,Ff=2,Uf=3,is=4,Of=5,Lh=300,Zr=301,Kr=302,pn=303,rl=304,Xo=306,_n=1e3,xn=1001,zo=1002,it=1003,sl=1004,Uo=1005,Ve=1006,Ih=1007,Gi=1008,tc=1008,Fn=1009,kf=1010,zf=1011,qo=1012,Bf=1013,ki=1014,ft=1015,bt=1016,Gf=1017,Vf=1018,sr=1020,Hf=1021,sn=1023,Wf=1024,jf=1025,bi=1026,lr=1027,Bo=1028,Xf=1029,qf=1030,Yf=1031,Zf=1033,ca=33776,ua=33777,ha=33778,da=33779,nc=35840,ic=35841,rc=35842,sc=35843,Kf=36196,oc=37492,ac=37496,lc=37808,cc=37809,uc=37810,hc=37811,dc=37812,fc=37813,pc=37814,mc=37815,gc=37816,vc=37817,xc=37818,_c=37819,yc=37820,wc=37821,fa=36492,Jf=36283,bc=36284,Mc=36285,Sc=36286,Vs=2300,Jr=2301,pa=2302,Tc=2400,Ec=2401,Ac=2402,Qf=2500,$f=0,Nh=1,ol=2,yn=3e3,He=3001,Js=3200,Fh=3201,Il=0,ep=1,Ln="srgb",Qr="srgb-linear",Uh="display-p3",ma=7680,tp=519,al=35044,Vi="300 es",ll=1035;class Mi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Cc=1234567;const Ls=Math.PI/180,Hs=180/Math.PI;function Kn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Jt[r&255]+Jt[r>>8&255]+Jt[r>>16&255]+Jt[r>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[t&63|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[n&255]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]).toLowerCase()}function Yt(r,e,t){return Math.max(e,Math.min(t,r))}function Nl(r,e){return(r%e+e)%e}function np(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function ip(r,e,t){return r!==e?(t-r)/(e-r):0}function Is(r,e,t){return(1-t)*r+t*e}function rp(r,e,t,n){return Is(r,e,1-Math.exp(-t*n))}function sp(r,e=1){return e-Math.abs(Nl(r,e*2)-e)}function op(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function ap(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function lp(r,e){return r+Math.floor(Math.random()*(e-r+1))}function cp(r,e){return r+Math.random()*(e-r)}function up(r){return r*(.5-Math.random())}function hp(r){r!==void 0&&(Cc=r);let e=Cc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function dp(r){return r*Ls}function fp(r){return r*Hs}function cl(r){return(r&r-1)===0&&r!==0}function Oh(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function kh(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function pp(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),h=s((e-n)/2),d=o((e-n)/2),m=s((n-e)/2),v=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*h,l*d,a*c);break;case"YZY":r.set(l*d,a*u,l*h,a*c);break;case"ZXZ":r.set(l*h,l*d,a*u,a*c);break;case"XZX":r.set(a*u,l*v,l*m,a*c);break;case"YXY":r.set(l*m,a*u,l*v,a*c);break;case"ZYZ":r.set(l*v,l*m,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function wi(r,e){switch(e.constructor){case Float32Array:return r;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function dt(r,e){switch(e.constructor){case Float32Array:return r;case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Br={DEG2RAD:Ls,RAD2DEG:Hs,generateUUID:Kn,clamp:Yt,euclideanModulo:Nl,mapLinear:np,inverseLerp:ip,lerp:Is,damp:rp,pingpong:sp,smoothstep:op,smootherstep:ap,randInt:lp,randFloat:cp,randFloatSpread:up,seededRandom:hp,degToRad:dp,radToDeg:fp,isPowerOfTwo:cl,ceilPowerOfTwo:Oh,floorPowerOfTwo:kh,setQuaternionFromProperEuler:pp,normalize:dt,denormalize:wi};class _e{constructor(e=0,t=0){_e.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],m=n[5],v=n[8],p=i[0],f=i[3],x=i[6],w=i[1],g=i[4],b=i[7],M=i[2],E=i[5],P=i[8];return s[0]=o*p+a*w+l*M,s[3]=o*f+a*g+l*E,s[6]=o*x+a*b+l*P,s[1]=c*p+u*w+h*M,s[4]=c*f+u*g+h*E,s[7]=c*x+u*b+h*P,s[2]=d*p+m*w+v*M,s[5]=d*f+m*g+v*E,s[8]=d*x+m*b+v*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*s,m=c*s-o*l,v=t*h+n*d+i*m;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const p=1/v;return e[0]=h*p,e[1]=(i*c-u*n)*p,e[2]=(a*n-i*o)*p,e[3]=d*p,e[4]=(u*t-i*l)*p,e[5]=(i*s-a*t)*p,e[6]=m*p,e[7]=(n*l-c*t)*p,e[8]=(o*t-n*s)*p,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ga.makeScale(e,t)),this}rotate(e){return this.premultiply(ga.makeRotation(-e)),this}translate(e,t){return this.premultiply(ga.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ga=new Zt;function zh(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Ws(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}class Et{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const d=s[o+0],m=s[o+1],v=s[o+2],p=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=m,e[t+2]=v,e[t+3]=p;return}if(h!==p||l!==d||c!==m||u!==v){let f=1-a;const x=l*d+c*m+u*v+h*p,w=x>=0?1:-1,g=1-x*x;if(g>Number.EPSILON){const M=Math.sqrt(g),E=Math.atan2(M,x*w);f=Math.sin(f*E)/M,a=Math.sin(a*E)/M}const b=a*w;if(l=l*f+d*b,c=c*f+m*b,u=u*f+v*b,h=h*f+p*b,f===1-a){const M=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=M,c*=M,u*=M,h*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[o],d=s[o+1],m=s[o+2],v=s[o+3];return e[t]=a*v+u*h+l*m-c*d,e[t+1]=l*v+u*d+c*h-a*m,e[t+2]=c*v+u*m+a*d-l*h,e[t+3]=u*v-a*h-l*d-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(s/2),d=l(n/2),m=l(i/2),v=l(s/2);switch(o){case"XYZ":this._x=d*u*h+c*m*v,this._y=c*m*h-d*u*v,this._z=c*u*v+d*m*h,this._w=c*u*h-d*m*v;break;case"YXZ":this._x=d*u*h+c*m*v,this._y=c*m*h-d*u*v,this._z=c*u*v-d*m*h,this._w=c*u*h+d*m*v;break;case"ZXY":this._x=d*u*h-c*m*v,this._y=c*m*h+d*u*v,this._z=c*u*v+d*m*h,this._w=c*u*h-d*m*v;break;case"ZYX":this._x=d*u*h-c*m*v,this._y=c*m*h+d*u*v,this._z=c*u*v-d*m*h,this._w=c*u*h+d*m*v;break;case"YZX":this._x=d*u*h+c*m*v,this._y=c*m*h+d*u*v,this._z=c*u*v-d*m*h,this._w=c*u*h-d*m*v;break;case"XZY":this._x=d*u*h-c*m*v,this._y=c*m*h-d*u*v,this._z=c*u*v+d*m*h,this._w=c*u*h+d*m*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(o-i)*m}else if(n>a&&n>h){const m=2*Math.sqrt(1+n-a-h);this._w=(u-l)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(s+c)/m}else if(a>h){const m=2*Math.sqrt(1+a-n-h);this._w=(s-c)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+h-n-a);this._w=(o-i)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Yt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,n=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Pc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Pc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=l*t+o*i-a*n,u=l*n+a*t-s*i,h=l*i+s*n-o*t,d=-s*t-o*n-a*i;return this.x=c*l+d*-s+u*-a-h*-o,this.y=u*l+d*-o+h*-s-c*-a,this.z=h*l+d*-a+c*-o-u*-s,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return va.copy(this).projectOnVector(e),this.sub(va)}reflect(e){return this.sub(va.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const va=new I,Pc=new Et;function Xr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function xa(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const mp=new Zt().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),gp=new Zt().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]),zi=new I;function vp(r){return r.convertSRGBToLinear(),zi.set(r.r,r.g,r.b).applyMatrix3(gp),r.setRGB(zi.x,zi.y,zi.z)}function xp(r){return zi.set(r.r,r.g,r.b).applyMatrix3(mp),r.setRGB(zi.x,zi.y,zi.z).convertLinearToSRGB()}const _p={[Qr]:r=>r,[Ln]:r=>r.convertSRGBToLinear(),[Uh]:vp},yp={[Qr]:r=>r,[Ln]:r=>r.convertLinearToSRGB(),[Uh]:xp},ln={enabled:!1,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(r){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!r},get workingColorSpace(){return Qr},set workingColorSpace(r){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=_p[e],i=yp[t];if(n===void 0||i===void 0)throw new Error(`Unsupported color space conversion, "${e}" to "${t}".`);return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)}};let yr;class Bh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{yr===void 0&&(yr=Ws("canvas")),yr.width=e.width,yr.height=e.height;const n=yr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=yr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ws("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Xr(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Xr(t[n]/255)*255):t[n]=Xr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class Gh{constructor(e=null){this.isSource=!0,this.uuid=Kn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(_a(i[o].image)):s.push(_a(i[o]))}else s=_a(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function _a(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Bh.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let wp=0;class Ct extends Mi{constructor(e=Ct.DEFAULT_IMAGE,t=Ct.DEFAULT_MAPPING,n=xn,i=xn,s=Ve,o=Gi,a=sn,l=Fn,c=Ct.DEFAULT_ANISOTROPY,u=yn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=Kn(),this.name="",this.source=new Gh(e),this.mipmaps=[],this.mapping=t,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new _e(0,0),this.repeat=new _e(1,1),this.center=new _e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Lh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _n:e.x=e.x-Math.floor(e.x);break;case xn:e.x=e.x<0?0:1;break;case zo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case _n:e.y=e.y-Math.floor(e.y);break;case xn:e.y=e.y<0?0:1;break;case zo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}Ct.DEFAULT_IMAGE=null;Ct.DEFAULT_MAPPING=Lh;Ct.DEFAULT_ANISOTROPY=1;class lt{constructor(e=0,t=0,n=0,i=1){lt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],m=l[5],v=l[9],p=l[2],f=l[6],x=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-p)<.01&&Math.abs(v-f)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+p)<.1&&Math.abs(v+f)<.1&&Math.abs(c+m+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const g=(c+1)/2,b=(m+1)/2,M=(x+1)/2,E=(u+d)/4,P=(h+p)/4,y=(v+f)/4;return g>b&&g>M?g<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(g),i=E/n,s=P/n):b>M?b<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(b),n=E/i,s=y/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=P/s,i=y/s),this.set(n,i,s,t),this}let w=Math.sqrt((f-v)*(f-v)+(h-p)*(h-p)+(d-u)*(d-u));return Math.abs(w)<.001&&(w=1),this.x=(f-v)/w,this.y=(h-p)/w,this.z=(d-u)/w,this.w=Math.acos((c+m+x-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ft extends Mi{constructor(e=1,t=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t);const i={width:e,height:t,depth:1};this.texture=new Ct(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Ve,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Gh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vh extends Ct{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=it,this.minFilter=it,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bp extends Ct{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=it,this.minFilter=it,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class cr extends Ft{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLMultipleRenderTargets=!0;const s=this.texture;this.texture=[];for(let o=0;o<n;o++)this.texture[o]=s.clone(),this.texture[o].isRenderTargetTexture=!0}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.texture.length;i<s;i++)this.texture[i].image.width=e,this.texture[i].image.height=t,this.texture[i].image.depth=n;this.dispose()}return this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t),this}copy(e){this.dispose(),this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.set(0,0,this.width,this.height),this.scissor.set(0,0,this.width,this.height),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.texture.length=0;for(let t=0,n=e.texture.length;t<n;t++)this.texture[t]=e.texture[t].clone(),this.texture[t].isRenderTargetTexture=!0;return this}}class rs{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.length;l<c;l+=3){const u=e[l],h=e[l+1],d=e[l+2];u<t&&(t=u),h<n&&(n=h),d<i&&(i=d),u>s&&(s=u),h>o&&(o=h),d>a&&(a=d)}return this.min.set(t,n,i),this.max.set(s,o,a),this}setFromBufferAttribute(e){let t=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.count;l<c;l++){const u=e.getX(l),h=e.getY(l),d=e.getZ(l);u<t&&(t=u),h<n&&(n=h),d<i&&(i=d),u>s&&(s=u),h>o&&(o=h),d>a&&(a=d)}return this.min.set(t,n,i),this.max.set(s,o,a),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=qi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0)if(t&&n.attributes!=null&&n.attributes.position!==void 0){const s=n.attributes.position;for(let o=0,a=s.count;o<a;o++)qi.fromBufferAttribute(s,o).applyMatrix4(e.matrixWorld),this.expandByPoint(qi)}else n.boundingBox===null&&n.computeBoundingBox(),ya.copy(n.boundingBox),ya.applyMatrix4(e.matrixWorld),this.union(ya);const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,qi),qi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ds),lo.subVectors(this.max,ds),wr.subVectors(e.a,ds),br.subVectors(e.b,ds),Mr.subVectors(e.c,ds),Ti.subVectors(br,wr),Ei.subVectors(Mr,br),Yi.subVectors(wr,Mr);let t=[0,-Ti.z,Ti.y,0,-Ei.z,Ei.y,0,-Yi.z,Yi.y,Ti.z,0,-Ti.x,Ei.z,0,-Ei.x,Yi.z,0,-Yi.x,-Ti.y,Ti.x,0,-Ei.y,Ei.x,0,-Yi.y,Yi.x,0];return!wa(t,wr,br,Mr,lo)||(t=[1,0,0,0,1,0,0,0,1],!wa(t,wr,br,Mr,lo))?!1:(co.crossVectors(Ti,Ei),t=[co.x,co.y,co.z],wa(t,wr,br,Mr,lo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const di=[new I,new I,new I,new I,new I,new I,new I,new I],qi=new I,ya=new rs,wr=new I,br=new I,Mr=new I,Ti=new I,Ei=new I,Yi=new I,ds=new I,lo=new I,co=new I,Zi=new I;function wa(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Zi.fromArray(r,s);const a=i.x*Math.abs(Zi.x)+i.y*Math.abs(Zi.y)+i.z*Math.abs(Zi.z),l=e.dot(Zi),c=t.dot(Zi),u=n.dot(Zi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Mp=new rs,fs=new I,ba=new I;class ss{constructor(e=new I,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Mp.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fs.subVectors(e,this.center);const t=fs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(fs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ba.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fs.copy(e.center).add(ba)),this.expandByPoint(fs.copy(e.center).sub(ba))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fi=new I,Ma=new I,uo=new I,Ai=new I,Sa=new I,ho=new I,Ta=new I;class Yo{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fi.copy(this.origin).addScaledVector(this.direction,t),fi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ma.copy(e).add(t).multiplyScalar(.5),uo.copy(t).sub(e).normalize(),Ai.copy(this.origin).sub(Ma);const s=e.distanceTo(t)*.5,o=-this.direction.dot(uo),a=Ai.dot(this.direction),l=-Ai.dot(uo),c=Ai.lengthSq(),u=Math.abs(1-o*o);let h,d,m,v;if(u>0)if(h=o*l-a,d=o*a-l,v=s*u,h>=0)if(d>=-v)if(d<=v){const p=1/u;h*=p,d*=p,m=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=s,h=Math.max(0,-(o*d+a)),m=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(o*d+a)),m=-h*h+d*(d+2*l)+c;else d<=-v?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-l),s),m=-h*h+d*(d+2*l)+c):d<=v?(h=0,d=Math.min(Math.max(-s,-l),s),m=d*(d+2*l)+c):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-l),s),m=-h*h+d*(d+2*l)+c);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),m=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Ma).addScaledVector(uo,d),m}intersectSphere(e,t){fi.subVectors(e.center,this.origin);const n=fi.dot(this.direction),i=fi.dot(fi)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,fi)!==null}intersectTriangle(e,t,n,i,s){Sa.subVectors(t,e),ho.subVectors(n,e),Ta.crossVectors(Sa,ho);let o=this.direction.dot(Ta),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ai.subVectors(this.origin,e);const l=a*this.direction.dot(ho.crossVectors(Ai,ho));if(l<0)return null;const c=a*this.direction.dot(Sa.cross(Ai));if(c<0||l+c>o)return null;const u=-a*Ai.dot(Ta);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ue{constructor(){Ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,n,i,s,o,a,l,c,u,h,d,m,v,p,f){const x=this.elements;return x[0]=e,x[4]=t,x[8]=n,x[12]=i,x[1]=s,x[5]=o,x[9]=a,x[13]=l,x[2]=c,x[6]=u,x[10]=h,x[14]=d,x[3]=m,x[7]=v,x[11]=p,x[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ue().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Sr.setFromMatrixColumn(e,0).length(),s=1/Sr.setFromMatrixColumn(e,1).length(),o=1/Sr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=o*u,m=o*h,v=a*u,p=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=m+v*c,t[5]=d-p*c,t[9]=-a*l,t[2]=p-d*c,t[6]=v+m*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*u,m=l*h,v=c*u,p=c*h;t[0]=d+p*a,t[4]=v*a-m,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=m*a-v,t[6]=p+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*u,m=l*h,v=c*u,p=c*h;t[0]=d-p*a,t[4]=-o*h,t[8]=v+m*a,t[1]=m+v*a,t[5]=o*u,t[9]=p-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*u,m=o*h,v=a*u,p=a*h;t[0]=l*u,t[4]=v*c-m,t[8]=d*c+p,t[1]=l*h,t[5]=p*c+d,t[9]=m*c-v,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,m=o*c,v=a*l,p=a*c;t[0]=l*u,t[4]=p-d*h,t[8]=v*h+m,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=m*h+v,t[10]=d-p*h}else if(e.order==="XZY"){const d=o*l,m=o*c,v=a*l,p=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+p,t[5]=o*u,t[9]=m*h-v,t[2]=v*h-m,t[6]=a*u,t[10]=p*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Sp,e,Tp)}lookAt(e,t,n){const i=this.elements;return bn.subVectors(e,t),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),Ci.crossVectors(n,bn),Ci.lengthSq()===0&&(Math.abs(n.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),Ci.crossVectors(n,bn)),Ci.normalize(),fo.crossVectors(bn,Ci),i[0]=Ci.x,i[4]=fo.x,i[8]=bn.x,i[1]=Ci.y,i[5]=fo.y,i[9]=bn.y,i[2]=Ci.z,i[6]=fo.z,i[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],m=n[13],v=n[2],p=n[6],f=n[10],x=n[14],w=n[3],g=n[7],b=n[11],M=n[15],E=i[0],P=i[4],y=i[8],T=i[12],L=i[1],O=i[5],W=i[9],U=i[13],F=i[2],V=i[6],$=i[10],ne=i[14],K=i[3],ee=i[7],se=i[11],Me=i[15];return s[0]=o*E+a*L+l*F+c*K,s[4]=o*P+a*O+l*V+c*ee,s[8]=o*y+a*W+l*$+c*se,s[12]=o*T+a*U+l*ne+c*Me,s[1]=u*E+h*L+d*F+m*K,s[5]=u*P+h*O+d*V+m*ee,s[9]=u*y+h*W+d*$+m*se,s[13]=u*T+h*U+d*ne+m*Me,s[2]=v*E+p*L+f*F+x*K,s[6]=v*P+p*O+f*V+x*ee,s[10]=v*y+p*W+f*$+x*se,s[14]=v*T+p*U+f*ne+x*Me,s[3]=w*E+g*L+b*F+M*K,s[7]=w*P+g*O+b*V+M*ee,s[11]=w*y+g*W+b*$+M*se,s[15]=w*T+g*U+b*ne+M*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],m=e[14],v=e[3],p=e[7],f=e[11],x=e[15];return v*(+s*l*h-i*c*h-s*a*d+n*c*d+i*a*m-n*l*m)+p*(+t*l*m-t*c*d+s*o*d-i*o*m+i*c*u-s*l*u)+f*(+t*c*h-t*a*m-s*o*h+n*o*m+s*a*u-n*c*u)+x*(-i*a*u-t*l*h+t*a*d+i*o*h-n*o*d+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],m=e[11],v=e[12],p=e[13],f=e[14],x=e[15],w=h*f*c-p*d*c+p*l*m-a*f*m-h*l*x+a*d*x,g=v*d*c-u*f*c-v*l*m+o*f*m+u*l*x-o*d*x,b=u*p*c-v*h*c+v*a*m-o*p*m-u*a*x+o*h*x,M=v*h*l-u*p*l-v*a*d+o*p*d+u*a*f-o*h*f,E=t*w+n*g+i*b+s*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/E;return e[0]=w*P,e[1]=(p*d*s-h*f*s-p*i*m+n*f*m+h*i*x-n*d*x)*P,e[2]=(a*f*s-p*l*s+p*i*c-n*f*c-a*i*x+n*l*x)*P,e[3]=(h*l*s-a*d*s-h*i*c+n*d*c+a*i*m-n*l*m)*P,e[4]=g*P,e[5]=(u*f*s-v*d*s+v*i*m-t*f*m-u*i*x+t*d*x)*P,e[6]=(v*l*s-o*f*s-v*i*c+t*f*c+o*i*x-t*l*x)*P,e[7]=(o*d*s-u*l*s+u*i*c-t*d*c-o*i*m+t*l*m)*P,e[8]=b*P,e[9]=(v*h*s-u*p*s-v*n*m+t*p*m+u*n*x-t*h*x)*P,e[10]=(o*p*s-v*a*s+v*n*c-t*p*c-o*n*x+t*a*x)*P,e[11]=(u*a*s-o*h*s-u*n*c+t*h*c+o*n*m-t*a*m)*P,e[12]=M*P,e[13]=(u*p*i-v*h*i+v*n*d-t*p*d-u*n*f+t*h*f)*P,e[14]=(v*a*i-o*p*i-v*n*l+t*p*l+o*n*f-t*a*f)*P,e[15]=(o*h*i-u*a*i+u*n*l-t*h*l-o*n*d+t*a*d)*P,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,d=s*c,m=s*u,v=s*h,p=o*u,f=o*h,x=a*h,w=l*c,g=l*u,b=l*h,M=n.x,E=n.y,P=n.z;return i[0]=(1-(p+x))*M,i[1]=(m+b)*M,i[2]=(v-g)*M,i[3]=0,i[4]=(m-b)*E,i[5]=(1-(d+x))*E,i[6]=(f+w)*E,i[7]=0,i[8]=(v+g)*P,i[9]=(f-w)*P,i[10]=(1-(d+p))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Sr.set(i[0],i[1],i[2]).length();const o=Sr.set(i[4],i[5],i[6]).length(),a=Sr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Un.copy(this);const c=1/s,u=1/o,h=1/a;return Un.elements[0]*=c,Un.elements[1]*=c,Un.elements[2]*=c,Un.elements[4]*=u,Un.elements[5]*=u,Un.elements[6]*=u,Un.elements[8]*=h,Un.elements[9]*=h,Un.elements[10]*=h,t.setFromRotationMatrix(Un),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o){const a=this.elements,l=2*s/(t-e),c=2*s/(n-i),u=(t+e)/(t-e),h=(n+i)/(n-i),d=-(o+s)/(o-s),m=-2*o*s/(o-s);return a[0]=l,a[4]=0,a[8]=u,a[12]=0,a[1]=0,a[5]=c,a[9]=h,a[13]=0,a[2]=0,a[6]=0,a[10]=d,a[14]=m,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(e,t,n,i,s,o){const a=this.elements,l=1/(t-e),c=1/(n-i),u=1/(o-s),h=(t+e)*l,d=(n+i)*c,m=(o+s)*u;return a[0]=2*l,a[4]=0,a[8]=0,a[12]=-h,a[1]=0,a[5]=2*c,a[9]=0,a[13]=-d,a[2]=0,a[6]=0,a[10]=-2*u,a[14]=-m,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Sr=new I,Un=new Ue,Sp=new I(0,0,0),Tp=new I(1,1,1),Ci=new I,fo=new I,bn=new I,Rc=new Ue,Dc=new Et;class Qs{constructor(e=0,t=0,n=0,i=Qs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Yt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Rc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Dc.setFromEuler(this),this.setFromQuaternion(Dc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qs.DEFAULT_ORDER="XYZ";class Fl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ep=0;const Lc=new I,Tr=new Et,pi=new Ue,po=new I,ps=new I,Ap=new I,Cp=new Et,Ic=new I(1,0,0),Nc=new I(0,1,0),Fc=new I(0,0,1),Pp={type:"added"},Uc={type:"removed"};class pt extends Mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ep++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new I,t=new Qs,n=new Et,i=new I(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ue},normalMatrix:{value:new Zt}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new Fl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Tr.setFromAxisAngle(e,t),this.quaternion.multiply(Tr),this}rotateOnWorldAxis(e,t){return Tr.setFromAxisAngle(e,t),this.quaternion.premultiply(Tr),this}rotateX(e){return this.rotateOnAxis(Ic,e)}rotateY(e){return this.rotateOnAxis(Nc,e)}rotateZ(e){return this.rotateOnAxis(Fc,e)}translateOnAxis(e,t){return Lc.copy(e).applyQuaternion(this.quaternion),this.position.add(Lc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ic,e)}translateY(e){return this.translateOnAxis(Nc,e)}translateZ(e){return this.translateOnAxis(Fc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?po.copy(e):po.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ps.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(ps,po,this.up):pi.lookAt(po,ps,this.up),this.quaternion.setFromRotationMatrix(pi),i&&(pi.extractRotation(i.matrixWorld),Tr.setFromRotationMatrix(pi),this.quaternion.premultiply(Tr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Pp)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Uc)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(Uc)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pi.multiply(e.parent.matrixWorld)),e.applyMatrix4(pi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectsByProperty(e,t);o.length>0&&(n=n.concat(o))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ps,e,Ap),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ps,Cp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),m=o(e.animations),v=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),v.length>0&&(n.nodes=v)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}pt.DEFAULT_UP=new I(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const On=new I,mi=new I,Ea=new I,gi=new I,Er=new I,Ar=new I,Oc=new I,Aa=new I,Ca=new I,Pa=new I;class _i{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),On.subVectors(e,t),i.cross(On);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){On.subVectors(i,t),mi.subVectors(n,t),Ea.subVectors(e,t);const o=On.dot(On),a=On.dot(mi),l=On.dot(Ea),c=mi.dot(mi),u=mi.dot(Ea),h=o*c-a*a;if(h===0)return s.set(-2,-1,-1);const d=1/h,m=(c*l-a*u)*d,v=(o*u-a*l)*d;return s.set(1-m-v,v,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,gi),gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getUV(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,gi),l.set(0,0),l.addScaledVector(s,gi.x),l.addScaledVector(o,gi.y),l.addScaledVector(a,gi.z),l}static isFrontFacing(e,t,n,i){return On.subVectors(n,t),mi.subVectors(e,t),On.cross(mi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return On.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),On.cross(mi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return _i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return _i.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return _i.getUV(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return _i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return _i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Er.subVectors(i,n),Ar.subVectors(s,n),Aa.subVectors(e,n);const l=Er.dot(Aa),c=Ar.dot(Aa);if(l<=0&&c<=0)return t.copy(n);Ca.subVectors(e,i);const u=Er.dot(Ca),h=Ar.dot(Ca);if(u>=0&&h<=u)return t.copy(i);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Er,o);Pa.subVectors(e,s);const m=Er.dot(Pa),v=Ar.dot(Pa);if(v>=0&&m<=v)return t.copy(s);const p=m*c-l*v;if(p<=0&&c>=0&&v<=0)return a=c/(c-v),t.copy(n).addScaledVector(Ar,a);const f=u*v-m*h;if(f<=0&&h-u>=0&&m-v>=0)return Oc.subVectors(s,i),a=(h-u)/(h-u+(m-v)),t.copy(i).addScaledVector(Oc,a);const x=1/(f+p+d);return o=p*x,a=d*x,t.copy(n).addScaledVector(Er,o).addScaledVector(Ar,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let Rp=0;class En extends Mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rp++}),this.uuid=Kn(),this.name="",this.type="Material",this.blending=jr,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=Ph,this.blendDst=Rh,this.blendEquation=Or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=il,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ma,this.stencilZFail=ma,this.stencilZPass=ma,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}const i=this[t];if(i===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==jr&&(n.blending=this.blending),this.side!==li&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(n.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Hh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kn={h:0,s:0,l:0},mo={h:0,s:0,l:0};function Ra(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Ne{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ln){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ln.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=ln.workingColorSpace){return this.r=e,this.g=t,this.b=n,ln.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=ln.workingColorSpace){if(e=Nl(e,1),t=Yt(t,0,1),n=Yt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Ra(o,s,e+1/3),this.g=Ra(o,s,e),this.b=Ra(o,s,e-1/3)}return ln.toWorkingColorSpace(this,i),this}setStyle(e,t=Ln){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,ln.toWorkingColorSpace(this,t),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,ln.toWorkingColorSpace(this,t),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)){const l=parseFloat(s[1])/360,c=parseFloat(s[2])/100,u=parseFloat(s[3])/100;return n(s[4]),this.setHSL(l,c,u,t)}break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,ln.toWorkingColorSpace(this,t),this;if(o===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,ln.toWorkingColorSpace(this,t),this;console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ln){const n=Hh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xr(e.r),this.g=Xr(e.g),this.b=Xr(e.b),this}copyLinearToSRGB(e){return this.r=xa(e.r),this.g=xa(e.g),this.b=xa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ln){return ln.fromWorkingColorSpace(Qt.copy(this),e),Yt(Qt.r*255,0,255)<<16^Yt(Qt.g*255,0,255)<<8^Yt(Qt.b*255,0,255)<<0}getHexString(e=Ln){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ln.workingColorSpace){ln.fromWorkingColorSpace(Qt.copy(this),t);const n=Qt.r,i=Qt.g,s=Qt.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ln.workingColorSpace){return ln.fromWorkingColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=Ln){ln.fromWorkingColorSpace(Qt.copy(this),e);const t=Qt.r,n=Qt.g,i=Qt.b;return e!==Ln?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${t*255|0},${n*255|0},${i*255|0})`}offsetHSL(e,t,n){return this.getHSL(kn),kn.h+=e,kn.s+=t,kn.l+=n,this.setHSL(kn.h,kn.s,kn.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(kn),e.getHSL(mo);const n=Is(kn.h,mo.h,t),i=Is(kn.s,mo.s,t),s=Is(kn.l,mo.l,t);return this.setHSL(n,i,s),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qt=new Ne;Ne.NAMES=Hh;class oi extends En{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Dh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const It=new I,go=new _e;class Mt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=al,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)go.fromBufferAttribute(this,t),go.applyMatrix3(e),this.setXY(t,go.x,go.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),i=dt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),i=dt(i,this.array),s=dt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==al&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class Wh extends Mt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class jh extends Mt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class mt extends Mt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Dp=0;const Pn=new Ue,Da=new pt,Cr=new I,Mn=new rs,ms=new rs,Gt=new I;class Pt extends Mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dp++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(zh(e)?jh:Wh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Zt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Pn.makeRotationFromQuaternion(e),this.applyMatrix4(Pn),this}rotateX(e){return Pn.makeRotationX(e),this.applyMatrix4(Pn),this}rotateY(e){return Pn.makeRotationY(e),this.applyMatrix4(Pn),this}rotateZ(e){return Pn.makeRotationZ(e),this.applyMatrix4(Pn),this}translate(e,t,n){return Pn.makeTranslation(e,t,n),this.applyMatrix4(Pn),this}scale(e,t,n){return Pn.makeScale(e,t,n),this.applyMatrix4(Pn),this}lookAt(e){return Da.lookAt(e),Da.updateMatrix(),this.applyMatrix4(Da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cr).negate(),this.translate(Cr.x,Cr.y,Cr.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new mt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Mn.setFromBufferAttribute(s),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ss);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(Mn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];ms.setFromBufferAttribute(a),this.morphTargetsRelative?(Gt.addVectors(Mn.min,ms.min),Mn.expandByPoint(Gt),Gt.addVectors(Mn.max,ms.max),Mn.expandByPoint(Gt)):(Mn.expandByPoint(ms.min),Mn.expandByPoint(ms.max))}Mn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Gt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Gt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Gt.fromBufferAttribute(a,c),l&&(Cr.fromBufferAttribute(e,c),Gt.add(Cr)),i=Math.max(i,n.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let L=0;L<a;L++)c[L]=new I,u[L]=new I;const h=new I,d=new I,m=new I,v=new _e,p=new _e,f=new _e,x=new I,w=new I;function g(L,O,W){h.fromArray(i,L*3),d.fromArray(i,O*3),m.fromArray(i,W*3),v.fromArray(o,L*2),p.fromArray(o,O*2),f.fromArray(o,W*2),d.sub(h),m.sub(h),p.sub(v),f.sub(v);const U=1/(p.x*f.y-f.x*p.y);isFinite(U)&&(x.copy(d).multiplyScalar(f.y).addScaledVector(m,-p.y).multiplyScalar(U),w.copy(m).multiplyScalar(p.x).addScaledVector(d,-f.x).multiplyScalar(U),c[L].add(x),c[O].add(x),c[W].add(x),u[L].add(w),u[O].add(w),u[W].add(w))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let L=0,O=b.length;L<O;++L){const W=b[L],U=W.start,F=W.count;for(let V=U,$=U+F;V<$;V+=3)g(n[V+0],n[V+1],n[V+2])}const M=new I,E=new I,P=new I,y=new I;function T(L){P.fromArray(s,L*3),y.copy(P);const O=c[L];M.copy(O),M.sub(P.multiplyScalar(P.dot(O))).normalize(),E.crossVectors(y,O);const U=E.dot(u[L])<0?-1:1;l[L*4]=M.x,l[L*4+1]=M.y,l[L*4+2]=M.z,l[L*4+3]=U}for(let L=0,O=b.length;L<O;++L){const W=b[L],U=W.start,F=W.count;for(let V=U,$=U+F;V<$;V+=3)T(n[V+0]),T(n[V+1]),T(n[V+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Mt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);const i=new I,s=new I,o=new I,a=new I,l=new I,c=new I,u=new I,h=new I;if(e)for(let d=0,m=e.count;d<m;d+=3){const v=e.getX(d+0),p=e.getX(d+1),f=e.getX(d+2);i.fromBufferAttribute(t,v),s.fromBufferAttribute(t,p),o.fromBufferAttribute(t,f),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),a.fromBufferAttribute(n,v),l.fromBufferAttribute(n,p),c.fromBufferAttribute(n,f),a.add(u),l.add(u),c.add(u),n.setXYZ(v,a.x,a.y,a.z),n.setXYZ(p,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let d=0,m=t.count;d<m;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u);let m=0,v=0;for(let p=0,f=l.length;p<f;p++){a.isInterleavedBufferAttribute?m=l[p]*a.data.stride+a.offset:m=l[p]*u;for(let x=0;x<u;x++)d[v++]=c[m++]}return new Mt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Pt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const d=c[u],m=e(d,n);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const m=c[h];u.push(m.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,m=h.length;d<m;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const kc=new Ue,Qn=new Yo,vo=new ss,zc=new I,gs=new I,vs=new I,xs=new I,La=new I,xo=new I,_o=new _e,yo=new _e,wo=new _e,Ia=new I,bo=new I;class pe extends pt{constructor(e=new Pt,t=new oi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){xo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(La.fromBufferAttribute(h,e),o?xo.addScaledVector(La,u):xo.addScaledVector(La.sub(t),u))}t.add(xo)}return this.isSkinnedMesh&&this.boneTransform(e,t),t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),vo.copy(n.boundingSphere),vo.applyMatrix4(s),Qn.copy(e.ray).recast(e.near),vo.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere(vo,zc)===null||Qn.origin.distanceToSquared(zc)>(e.far-e.near)**2))||(kc.copy(s).invert(),Qn.copy(e.ray).applyMatrix4(kc),n.boundingBox!==null&&Qn.intersectsBox(n.boundingBox)===!1))return;let o;const a=n.index,l=n.attributes.position,c=n.attributes.uv,u=n.attributes.uv2,h=n.groups,d=n.drawRange;if(a!==null)if(Array.isArray(i))for(let m=0,v=h.length;m<v;m++){const p=h[m],f=i[p.materialIndex],x=Math.max(p.start,d.start),w=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let g=x,b=w;g<b;g+=3){const M=a.getX(g),E=a.getX(g+1),P=a.getX(g+2);o=Mo(this,f,e,Qn,c,u,M,E,P),o&&(o.faceIndex=Math.floor(g/3),o.face.materialIndex=p.materialIndex,t.push(o))}}else{const m=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let p=m,f=v;p<f;p+=3){const x=a.getX(p),w=a.getX(p+1),g=a.getX(p+2);o=Mo(this,i,e,Qn,c,u,x,w,g),o&&(o.faceIndex=Math.floor(p/3),t.push(o))}}else if(l!==void 0)if(Array.isArray(i))for(let m=0,v=h.length;m<v;m++){const p=h[m],f=i[p.materialIndex],x=Math.max(p.start,d.start),w=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let g=x,b=w;g<b;g+=3){const M=g,E=g+1,P=g+2;o=Mo(this,f,e,Qn,c,u,M,E,P),o&&(o.faceIndex=Math.floor(g/3),o.face.materialIndex=p.materialIndex,t.push(o))}}else{const m=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let p=m,f=v;p<f;p+=3){const x=p,w=p+1,g=p+2;o=Mo(this,i,e,Qn,c,u,x,w,g),o&&(o.faceIndex=Math.floor(p/3),t.push(o))}}}}function Lp(r,e,t,n,i,s,o,a){let l;if(e.side===Ut?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===li,a),l===null)return null;bo.copy(a),bo.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(bo);return c<t.near||c>t.far?null:{distance:c,point:bo.clone(),object:r}}function Mo(r,e,t,n,i,s,o,a,l){r.getVertexPosition(o,gs),r.getVertexPosition(a,vs),r.getVertexPosition(l,xs);const c=Lp(r,e,t,n,gs,vs,xs,Ia);if(c){i&&(_o.fromBufferAttribute(i,o),yo.fromBufferAttribute(i,a),wo.fromBufferAttribute(i,l),c.uv=_i.getUV(Ia,gs,vs,xs,_o,yo,wo,new _e)),s&&(_o.fromBufferAttribute(s,o),yo.fromBufferAttribute(s,a),wo.fromBufferAttribute(s,l),c.uv2=_i.getUV(Ia,gs,vs,xs,_o,yo,wo,new _e));const u={a:o,b:a,c:l,normal:new I,materialIndex:0};_i.getNormal(gs,vs,xs,u.normal),c.face=u}return c}class xt extends Pt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let d=0,m=0;v("z","y","x",-1,-1,n,t,e,o,s,0),v("z","y","x",1,-1,n,t,-e,o,s,1),v("x","z","y",1,1,e,n,t,i,o,2),v("x","z","y",1,-1,e,n,-t,i,o,3),v("x","y","z",1,-1,e,t,n,i,s,4),v("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new mt(c,3)),this.setAttribute("normal",new mt(u,3)),this.setAttribute("uv",new mt(h,2));function v(p,f,x,w,g,b,M,E,P,y,T){const L=b/P,O=M/y,W=b/2,U=M/2,F=E/2,V=P+1,$=y+1;let ne=0,K=0;const ee=new I;for(let se=0;se<$;se++){const Me=se*O-U;for(let j=0;j<V;j++){const le=j*L-W;ee[p]=le*w,ee[f]=Me*g,ee[x]=F,c.push(ee.x,ee.y,ee.z),ee[p]=0,ee[f]=0,ee[x]=E>0?1:-1,u.push(ee.x,ee.y,ee.z),h.push(j/P),h.push(1-se/y),ne+=1}}for(let se=0;se<y;se++)for(let Me=0;Me<P;Me++){const j=d+Me+V*se,le=d+Me+V*(se+1),fe=d+(Me+1)+V*(se+1),X=d+(Me+1)+V*se;l.push(j,le,X),l.push(le,fe,X),K+=6}a.addGroup(m,K,T),m+=K,d+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function $r(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function un(r){const e={};for(let t=0;t<r.length;t++){const n=$r(r[t]);for(const i in n)e[i]=n[i]}return e}function Ip(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Xh(r){return r.getRenderTarget()===null&&r.outputEncoding===He?Ln:Qr}const ur={clone:$r,merge:un};var Np=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vt extends En{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Np,this.fragmentShader=Fp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$r(e.uniforms),this.uniformsGroups=Ip(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Zo extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class At extends Zo{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Hs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ls*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hs*2*Math.atan(Math.tan(Ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ls*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Pr=-90,Rr=1;class Up extends pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n;const i=new At(Pr,Rr,e,t);i.layers=this.layers,i.up.set(0,1,0),i.lookAt(1,0,0),this.add(i);const s=new At(Pr,Rr,e,t);s.layers=this.layers,s.up.set(0,1,0),s.lookAt(-1,0,0),this.add(s);const o=new At(Pr,Rr,e,t);o.layers=this.layers,o.up.set(0,0,-1),o.lookAt(0,1,0),this.add(o);const a=new At(Pr,Rr,e,t);a.layers=this.layers,a.up.set(0,0,1),a.lookAt(0,-1,0),this.add(a);const l=new At(Pr,Rr,e,t);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,1),this.add(l);const c=new At(Pr,Rr,e,t);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,s,o,a,l,c]=this.children,u=e.getRenderTarget(),h=e.toneMapping,d=e.xr.enabled;e.toneMapping=Zn,e.xr.enabled=!1;const m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,i),e.setRenderTarget(n,1),e.render(t,s),e.setRenderTarget(n,2),e.render(t,o),e.setRenderTarget(n,3),e.render(t,a),e.setRenderTarget(n,4),e.render(t,l),n.texture.generateMipmaps=m,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(u),e.toneMapping=h,e.xr.enabled=d,n.texture.needsPMREMUpdate=!0}}class qh extends Ct{constructor(e,t,n,i,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Zr,super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Op extends Ft{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new qh(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ve}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new xt(5,5,5),s=new Vt({name:"CubemapFromEquirect",uniforms:$r(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ut,blending:Yn});s.uniforms.tEquirect.value=t;const o=new pe(i,s),a=t.minFilter;return t.minFilter===Gi&&(t.minFilter=Ve),new Up(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const Na=new I,kp=new I,zp=new Zt;class Ni{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Na.subVectors(n,t).cross(kp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Na),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||zp.getNormalMatrix(e),i=this.coplanarPoint(Na).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Dr=new ss,So=new I;class Ul{constructor(e=new Ni,t=new Ni,n=new Ni,i=new Ni,s=new Ni,o=new Ni){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,i=n[0],s=n[1],o=n[2],a=n[3],l=n[4],c=n[5],u=n[6],h=n[7],d=n[8],m=n[9],v=n[10],p=n[11],f=n[12],x=n[13],w=n[14],g=n[15];return t[0].setComponents(a-i,h-l,p-d,g-f).normalize(),t[1].setComponents(a+i,h+l,p+d,g+f).normalize(),t[2].setComponents(a+s,h+c,p+m,g+x).normalize(),t[3].setComponents(a-s,h-c,p-m,g-x).normalize(),t[4].setComponents(a-o,h-u,p-v,g-w).normalize(),t[5].setComponents(a+o,h+u,p+v,g+w).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Dr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Dr)}intersectsSprite(e){return Dr.center.set(0,0,0),Dr.radius=.7071067811865476,Dr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Dr)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(So.x=i.normal.x>0?e.max.x:e.min.x,So.y=i.normal.y>0?e.max.y:e.min.y,So.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(So)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Yh(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Bp(r,e){const t=e.isWebGL2,n=new WeakMap;function i(c,u){const h=c.array,d=c.usage,m=r.createBuffer();r.bindBuffer(u,m),r.bufferData(u,h,d),c.onUploadCallback();let v;if(h instanceof Float32Array)v=5126;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=5123;else if(h instanceof Int16Array)v=5122;else if(h instanceof Uint32Array)v=5125;else if(h instanceof Int32Array)v=5124;else if(h instanceof Int8Array)v=5120;else if(h instanceof Uint8Array)v=5121;else if(h instanceof Uint8ClampedArray)v=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:m,type:v,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version}}function s(c,u,h){const d=u.array,m=u.updateRange;r.bindBuffer(h,c),m.count===-1?r.bufferSubData(h,0,d):(t?r.bufferSubData(h,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):r.bufferSubData(h,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(r.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h===void 0?n.set(c,i(c,u)):h.version<c.version&&(s(h.buffer,c,u),h.version=c.version)}return{get:o,remove:a,update:l}}class pr extends Pt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=e/a,d=t/l,m=[],v=[],p=[],f=[];for(let x=0;x<u;x++){const w=x*d-o;for(let g=0;g<c;g++){const b=g*h-s;v.push(b,-w,0),p.push(0,0,1),f.push(g/a),f.push(1-x/l)}}for(let x=0;x<l;x++)for(let w=0;w<a;w++){const g=w+c*x,b=w+c*(x+1),M=w+1+c*(x+1),E=w+1+c*x;m.push(g,b,E),m.push(b,M,E)}this.setIndex(m),this.setAttribute("position",new mt(v,3)),this.setAttribute("normal",new mt(p,3)),this.setAttribute("uv",new mt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pr(e.width,e.height,e.widthSegments,e.heightSegments)}}var Gp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,Vp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hp=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Wp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qp="vec3 transformed = vec3( position );",Yp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zp=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,Kp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Jp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Qp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,$p=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,em=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,im=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,rm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,sm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,om=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,am=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,lm=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,cm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,um=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,hm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fm="gl_FragColor = linearToOutputTexel( gl_FragColor );",pm=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,gm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_m=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ym=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Tm=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Em=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Am=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Rm=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Dm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Im=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Nm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Fm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,Um=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Om=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,km=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,zm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Bm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vm=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Hm=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Wm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ym=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Km=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Qm=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,$m=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,eg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,tg=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ng=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ig=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,og=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,ag=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,lg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,cg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ug=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,dg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,_g=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,yg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,wg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,Sg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Eg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ag=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Pg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,Dg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, vec2 fullSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		
		vec2 lodFudge = pow( 1.95, lod ) / fullSize;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec2 fullSize = vec2( textureSize( sampler, 0 ) );
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), fullSize, floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), fullSize, ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,Lg=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,Ig=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,Ng=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,Fg=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,Ug=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,Og=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,kg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Gg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,jg=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Xg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,qg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Yg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Jg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$g=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
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
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,e0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,t0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,n0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,i0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,r0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,o0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,a0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,l0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,u0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,d0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,p0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,m0=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,g0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,v0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,x0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Ge={alphamap_fragment:Gp,alphamap_pars_fragment:Vp,alphatest_fragment:Hp,alphatest_pars_fragment:Wp,aomap_fragment:jp,aomap_pars_fragment:Xp,begin_vertex:qp,beginnormal_vertex:Yp,bsdfs:Zp,iridescence_fragment:Kp,bumpmap_pars_fragment:Jp,clipping_planes_fragment:Qp,clipping_planes_pars_fragment:$p,clipping_planes_pars_vertex:em,clipping_planes_vertex:tm,color_fragment:nm,color_pars_fragment:im,color_pars_vertex:rm,color_vertex:sm,common:om,cube_uv_reflection_fragment:am,defaultnormal_vertex:lm,displacementmap_pars_vertex:cm,displacementmap_vertex:um,emissivemap_fragment:hm,emissivemap_pars_fragment:dm,encodings_fragment:fm,encodings_pars_fragment:pm,envmap_fragment:mm,envmap_common_pars_fragment:gm,envmap_pars_fragment:vm,envmap_pars_vertex:xm,envmap_physical_pars_fragment:Rm,envmap_vertex:_m,fog_vertex:ym,fog_pars_vertex:wm,fog_fragment:bm,fog_pars_fragment:Mm,gradientmap_pars_fragment:Sm,lightmap_fragment:Tm,lightmap_pars_fragment:Em,lights_lambert_fragment:Am,lights_lambert_pars_fragment:Cm,lights_pars_begin:Pm,lights_toon_fragment:Dm,lights_toon_pars_fragment:Lm,lights_phong_fragment:Im,lights_phong_pars_fragment:Nm,lights_physical_fragment:Fm,lights_physical_pars_fragment:Um,lights_fragment_begin:Om,lights_fragment_maps:km,lights_fragment_end:zm,logdepthbuf_fragment:Bm,logdepthbuf_pars_fragment:Gm,logdepthbuf_pars_vertex:Vm,logdepthbuf_vertex:Hm,map_fragment:Wm,map_pars_fragment:jm,map_particle_fragment:Xm,map_particle_pars_fragment:qm,metalnessmap_fragment:Ym,metalnessmap_pars_fragment:Zm,morphcolor_vertex:Km,morphnormal_vertex:Jm,morphtarget_pars_vertex:Qm,morphtarget_vertex:$m,normal_fragment_begin:eg,normal_fragment_maps:tg,normal_pars_fragment:ng,normal_pars_vertex:ig,normal_vertex:rg,normalmap_pars_fragment:sg,clearcoat_normal_fragment_begin:og,clearcoat_normal_fragment_maps:ag,clearcoat_pars_fragment:lg,iridescence_pars_fragment:cg,output_fragment:ug,packing:hg,premultiplied_alpha_fragment:dg,project_vertex:fg,dithering_fragment:pg,dithering_pars_fragment:mg,roughnessmap_fragment:gg,roughnessmap_pars_fragment:vg,shadowmap_pars_fragment:xg,shadowmap_pars_vertex:_g,shadowmap_vertex:yg,shadowmask_pars_fragment:wg,skinbase_vertex:bg,skinning_pars_vertex:Mg,skinning_vertex:Sg,skinnormal_vertex:Tg,specularmap_fragment:Eg,specularmap_pars_fragment:Ag,tonemapping_fragment:Cg,tonemapping_pars_fragment:Pg,transmission_fragment:Rg,transmission_pars_fragment:Dg,uv_pars_fragment:Lg,uv_pars_vertex:Ig,uv_vertex:Ng,uv2_pars_fragment:Fg,uv2_pars_vertex:Ug,uv2_vertex:Og,worldpos_vertex:kg,background_vert:zg,background_frag:Bg,backgroundCube_vert:Gg,backgroundCube_frag:Vg,cube_vert:Hg,cube_frag:Wg,depth_vert:jg,depth_frag:Xg,distanceRGBA_vert:qg,distanceRGBA_frag:Yg,equirect_vert:Zg,equirect_frag:Kg,linedashed_vert:Jg,linedashed_frag:Qg,meshbasic_vert:$g,meshbasic_frag:e0,meshlambert_vert:t0,meshlambert_frag:n0,meshmatcap_vert:i0,meshmatcap_frag:r0,meshnormal_vert:s0,meshnormal_frag:o0,meshphong_vert:a0,meshphong_frag:l0,meshphysical_vert:c0,meshphysical_frag:u0,meshtoon_vert:h0,meshtoon_frag:d0,points_vert:f0,points_frag:p0,shadow_vert:m0,shadow_frag:g0,sprite_vert:v0,sprite_frag:x0},be={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new Zt},uv2Transform:{value:new Zt},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new _e(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new _e(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Zt}}},rn={basic:{uniforms:un([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:un([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:un([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:un([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:un([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:un([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:un([be.points,be.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:un([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:un([be.common,be.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:un([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:un([be.sprite,be.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:un([be.common,be.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:un([be.lights,be.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};rn.physical={uniforms:un([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new _e(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new _e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const To={r:0,b:0,g:0};function _0(r,e,t,n,i,s,o){const a=new Ne(0);let l=s===!0?0:1,c,u,h=null,d=0,m=null;function v(f,x){let w=!1,g=x.isScene===!0?x.background:null;g&&g.isTexture&&(g=(x.backgroundBlurriness>0?t:e).get(g));const b=r.xr,M=b.getSession&&b.getSession();M&&M.environmentBlendMode==="additive"&&(g=null),g===null?p(a,l):g&&g.isColor&&(p(g,1),w=!0),(r.autoClear||w)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),g&&(g.isCubeTexture||g.mapping===Xo)?(u===void 0&&(u=new pe(new xt(1,1,1),new Vt({name:"BackgroundCubeMaterial",uniforms:$r(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,P,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=g,u.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.toneMapped=g.encoding!==He,(h!==g||d!==g.version||m!==r.toneMapping)&&(u.material.needsUpdate=!0,h=g,d=g.version,m=r.toneMapping),u.layers.enableAll(),f.unshift(u,u.geometry,u.material,0,0,null)):g&&g.isTexture&&(c===void 0&&(c=new pe(new pr(2,2),new Vt({name:"BackgroundMaterial",uniforms:$r(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=g,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=g.encoding!==He,g.matrixAutoUpdate===!0&&g.updateMatrix(),c.material.uniforms.uvTransform.value.copy(g.matrix),(h!==g||d!==g.version||m!==r.toneMapping)&&(c.material.needsUpdate=!0,h=g,d=g.version,m=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))}function p(f,x){f.getRGB(To,Xh(r)),n.buffers.color.setClear(To.r,To.g,To.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(f,x=1){a.set(f),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,p(a,l)},render:v}}function y0(r,e,t,n){const i=r.getParameter(34921),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=f(null);let c=l,u=!1;function h(F,V,$,ne,K){let ee=!1;if(o){const se=p(ne,$,V);c!==se&&(c=se,m(c.object)),ee=x(F,ne,$,K),ee&&w(F,ne,$,K)}else{const se=V.wireframe===!0;(c.geometry!==ne.id||c.program!==$.id||c.wireframe!==se)&&(c.geometry=ne.id,c.program=$.id,c.wireframe=se,ee=!0)}K!==null&&t.update(K,34963),(ee||u)&&(u=!1,y(F,V,$,ne),K!==null&&r.bindBuffer(34963,t.get(K).buffer))}function d(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function m(F){return n.isWebGL2?r.bindVertexArray(F):s.bindVertexArrayOES(F)}function v(F){return n.isWebGL2?r.deleteVertexArray(F):s.deleteVertexArrayOES(F)}function p(F,V,$){const ne=$.wireframe===!0;let K=a[F.id];K===void 0&&(K={},a[F.id]=K);let ee=K[V.id];ee===void 0&&(ee={},K[V.id]=ee);let se=ee[ne];return se===void 0&&(se=f(d()),ee[ne]=se),se}function f(F){const V=[],$=[],ne=[];for(let K=0;K<i;K++)V[K]=0,$[K]=0,ne[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:$,attributeDivisors:ne,object:F,attributes:{},index:null}}function x(F,V,$,ne){const K=c.attributes,ee=V.attributes;let se=0;const Me=$.getAttributes();for(const j in Me)if(Me[j].location>=0){const fe=K[j];let X=ee[j];if(X===void 0&&(j==="instanceMatrix"&&F.instanceMatrix&&(X=F.instanceMatrix),j==="instanceColor"&&F.instanceColor&&(X=F.instanceColor)),fe===void 0||fe.attribute!==X||X&&fe.data!==X.data)return!0;se++}return c.attributesNum!==se||c.index!==ne}function w(F,V,$,ne){const K={},ee=V.attributes;let se=0;const Me=$.getAttributes();for(const j in Me)if(Me[j].location>=0){let fe=ee[j];fe===void 0&&(j==="instanceMatrix"&&F.instanceMatrix&&(fe=F.instanceMatrix),j==="instanceColor"&&F.instanceColor&&(fe=F.instanceColor));const X={};X.attribute=fe,fe&&fe.data&&(X.data=fe.data),K[j]=X,se++}c.attributes=K,c.attributesNum=se,c.index=ne}function g(){const F=c.newAttributes;for(let V=0,$=F.length;V<$;V++)F[V]=0}function b(F){M(F,0)}function M(F,V){const $=c.newAttributes,ne=c.enabledAttributes,K=c.attributeDivisors;$[F]=1,ne[F]===0&&(r.enableVertexAttribArray(F),ne[F]=1),K[F]!==V&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](F,V),K[F]=V)}function E(){const F=c.newAttributes,V=c.enabledAttributes;for(let $=0,ne=V.length;$<ne;$++)V[$]!==F[$]&&(r.disableVertexAttribArray($),V[$]=0)}function P(F,V,$,ne,K,ee){n.isWebGL2===!0&&($===5124||$===5125)?r.vertexAttribIPointer(F,V,$,K,ee):r.vertexAttribPointer(F,V,$,ne,K,ee)}function y(F,V,$,ne){if(n.isWebGL2===!1&&(F.isInstancedMesh||ne.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;g();const K=ne.attributes,ee=$.getAttributes(),se=V.defaultAttributeValues;for(const Me in ee){const j=ee[Me];if(j.location>=0){let le=K[Me];if(le===void 0&&(Me==="instanceMatrix"&&F.instanceMatrix&&(le=F.instanceMatrix),Me==="instanceColor"&&F.instanceColor&&(le=F.instanceColor)),le!==void 0){const fe=le.normalized,X=le.itemSize,ce=t.get(le);if(ce===void 0)continue;const xe=ce.buffer,Se=ce.type,ye=ce.bytesPerElement;if(le.isInterleavedBufferAttribute){const Te=le.data,je=Te.stride,Ye=le.offset;if(Te.isInstancedInterleavedBuffer){for(let Qe=0;Qe<j.locationSize;Qe++)M(j.location+Qe,Te.meshPerAttribute);F.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=Te.meshPerAttribute*Te.count)}else for(let Qe=0;Qe<j.locationSize;Qe++)b(j.location+Qe);r.bindBuffer(34962,xe);for(let Qe=0;Qe<j.locationSize;Qe++)P(j.location+Qe,X/j.locationSize,Se,fe,je*ye,(Ye+X/j.locationSize*Qe)*ye)}else{if(le.isInstancedBufferAttribute){for(let Te=0;Te<j.locationSize;Te++)M(j.location+Te,le.meshPerAttribute);F.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Te=0;Te<j.locationSize;Te++)b(j.location+Te);r.bindBuffer(34962,xe);for(let Te=0;Te<j.locationSize;Te++)P(j.location+Te,X/j.locationSize,Se,fe,X*ye,X/j.locationSize*Te*ye)}}else if(se!==void 0){const fe=se[Me];if(fe!==void 0)switch(fe.length){case 2:r.vertexAttrib2fv(j.location,fe);break;case 3:r.vertexAttrib3fv(j.location,fe);break;case 4:r.vertexAttrib4fv(j.location,fe);break;default:r.vertexAttrib1fv(j.location,fe)}}}}E()}function T(){W();for(const F in a){const V=a[F];for(const $ in V){const ne=V[$];for(const K in ne)v(ne[K].object),delete ne[K];delete V[$]}delete a[F]}}function L(F){if(a[F.id]===void 0)return;const V=a[F.id];for(const $ in V){const ne=V[$];for(const K in ne)v(ne[K].object),delete ne[K];delete V[$]}delete a[F.id]}function O(F){for(const V in a){const $=a[V];if($[F.id]===void 0)continue;const ne=$[F.id];for(const K in ne)v(ne[K].object),delete ne[K];delete $[F.id]}}function W(){U(),u=!0,c!==l&&(c=l,m(c.object))}function U(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:W,resetDefaultState:U,dispose:T,releaseStatesOfGeometry:L,releaseStatesOfProgram:O,initAttributes:g,enableAttribute:b,disableUnusedAttributes:E}}function w0(r,e,t,n){const i=n.isWebGL2;let s;function o(c){s=c}function a(c,u){r.drawArrays(s,c,u),t.update(u,s,1)}function l(c,u,h){if(h===0)return;let d,m;if(i)d=r,m="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[m](s,c,u,h),t.update(u,s,h)}this.setMode=o,this.render=a,this.renderInstances=l}function b0(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(P){if(P==="highp"){if(r.getShaderPrecisionFormat(35633,36338).precision>0&&r.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";P="mediump"}return P==="mediump"&&r.getShaderPrecisionFormat(35633,36337).precision>0&&r.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r instanceof WebGL2RenderingContext;let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=r.getParameter(34930),d=r.getParameter(35660),m=r.getParameter(3379),v=r.getParameter(34076),p=r.getParameter(34921),f=r.getParameter(36347),x=r.getParameter(36348),w=r.getParameter(36349),g=d>0,b=o||e.has("OES_texture_float"),M=g&&b,E=o?r.getParameter(36183):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:v,maxAttributes:p,maxVertexUniforms:f,maxVaryings:x,maxFragmentUniforms:w,vertexTextures:g,floatFragmentTextures:b,floatVertexTextures:M,maxSamples:E}}function M0(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Ni,a=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const m=h.length!==0||d||n!==0||i;return i=d,n=h.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,m){const v=h.clippingPlanes,p=h.clipIntersection,f=h.clipShadows,x=r.get(h);if(!i||v===null||v.length===0||s&&!f)s?u(null):c();else{const w=s?0:n,g=w*4;let b=x.clippingState||null;l.value=b,b=u(v,d,g,m);for(let M=0;M!==g;++M)b[M]=t[M];x.clippingState=b,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,m,v){const p=h!==null?h.length:0;let f=null;if(p!==0){if(f=l.value,v!==!0||f===null){const x=m+p*4,w=d.matrixWorldInverse;a.getNormalMatrix(w),(f===null||f.length<x)&&(f=new Float32Array(x));for(let g=0,b=m;g!==p;++g,b+=4)o.copy(h[g]).applyMatrix4(w,a),o.normal.toArray(f,b),f[b+3]=o.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=p,e.numIntersection=0,f}}function S0(r){let e=new WeakMap;function t(o,a){return a===pn?o.mapping=Zr:a===rl&&(o.mapping=Kr),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){const a=o.mapping;if(a===pn||a===rl)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Op(l.height/2);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Ol extends Zo{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Gr=4,Bc=[.125,.215,.35,.446,.526,.582],ir=20,Fa=new Ol,Gc=new Ne;let Ua=null;const er=(1+Math.sqrt(5))/2,Lr=1/er,Vc=[new I(1,1,1),new I(-1,1,1),new I(1,1,-1),new I(-1,1,-1),new I(0,er,Lr),new I(0,er,-Lr),new I(Lr,0,er),new I(-Lr,0,er),new I(er,Lr,0),new I(-er,Lr,0)];class es{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Ua=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ua),e.scissorTest=!1,Eo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Zr||e.mapping===Kr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ua=this._renderer.getRenderTarget();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ve,minFilter:Ve,generateMipmaps:!1,type:bt,format:sn,encoding:yn,depthBuffer:!1},i=Hc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hc(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=T0(s)),this._blurMaterial=E0(s,e,t)}return i}_compileMaterial(e){const t=new pe(this._lodPlanes[0],e);this._renderer.compile(t,Fa)}_sceneToCubeUV(e,t,n,i){const a=new At(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(Gc),u.toneMapping=Zn,u.autoClear=!1;const m=new oi({name:"PMREM.Background",side:Ut,depthWrite:!1,depthTest:!1}),v=new pe(new xt,m);let p=!1;const f=e.background;f?f.isColor&&(m.color.copy(f),e.background=null,p=!0):(m.color.copy(Gc),p=!0);for(let x=0;x<6;x++){const w=x%3;w===0?(a.up.set(0,l[x],0),a.lookAt(c[x],0,0)):w===1?(a.up.set(0,0,l[x]),a.lookAt(0,c[x],0)):(a.up.set(0,l[x],0),a.lookAt(0,0,c[x]));const g=this._cubeSize;Eo(i,w*g,x>2?g:0,g,g),u.setRenderTarget(i),p&&u.render(v,a),u.render(e,a)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=f}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Zr||e.mapping===Kr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=jc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wc());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new pe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Eo(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Fa)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Vc[(i-1)%Vc.length];this._blur(e,i-1,i,s,o)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new pe(this._lodPlanes[i],c),d=c.uniforms,m=this._sizeLods[n]-1,v=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*ir-1),p=s/v,f=isFinite(s)?1+Math.floor(u*p):ir;f>ir&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${ir}`);const x=[];let w=0;for(let P=0;P<ir;++P){const y=P/p,T=Math.exp(-y*y/2);x.push(T),P===0?w+=T:P<f&&(w+=2*T)}for(let P=0;P<x.length;P++)x[P]=x[P]/w;d.envMap.value=e.texture,d.samples.value=f,d.weights.value=x,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:g}=this;d.dTheta.value=v,d.mipInt.value=g-n;const b=this._sizeLods[i],M=3*b*(i>g-Gr?i-g+Gr:0),E=4*(this._cubeSize-b);Eo(t,M,E,3*b,2*b),l.setRenderTarget(t),l.render(h,Fa)}}function T0(r){const e=[],t=[],n=[];let i=r;const s=r-Gr+1+Bc.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Gr?l=Bc[o-r+Gr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],m=6,v=6,p=3,f=2,x=1,w=new Float32Array(p*v*m),g=new Float32Array(f*v*m),b=new Float32Array(x*v*m);for(let E=0;E<m;E++){const P=E%3*2/3-1,y=E>2?0:-1,T=[P,y,0,P+2/3,y,0,P+2/3,y+1,0,P,y,0,P+2/3,y+1,0,P,y+1,0];w.set(T,p*v*E),g.set(d,f*v*E);const L=[E,E,E,E,E,E];b.set(L,x*v*E)}const M=new Pt;M.setAttribute("position",new Mt(w,p)),M.setAttribute("uv",new Mt(g,f)),M.setAttribute("faceIndex",new Mt(b,x)),e.push(M),i>Gr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Hc(r,e,t){const n=new Ft(r,e,t);return n.texture.mapping=Xo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Eo(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function E0(r,e,t){const n=new Float32Array(ir),i=new I(0,1,0);return new Vt({name:"SphericalGaussianBlur",defines:{n:ir,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:kl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Wc(){return new Vt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:kl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function jc(){return new Vt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:kl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function kl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function A0(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===pn||l===rl,u=l===Zr||l===Kr;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new es(r)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{const h=a.image;if(c&&h&&h.height>0||u&&h&&i(h)){t===null&&(t=new es(r));const d=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function C0(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function P0(r,e,t,n){const i={},s=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);d.removeEventListener("dispose",o),delete i[d.id];const m=s.get(d);m&&(e.remove(m),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const v in d)e.update(d[v],34962);const m=h.morphAttributes;for(const v in m){const p=m[v];for(let f=0,x=p.length;f<x;f++)e.update(p[f],34962)}}function c(h){const d=[],m=h.index,v=h.attributes.position;let p=0;if(m!==null){const w=m.array;p=m.version;for(let g=0,b=w.length;g<b;g+=3){const M=w[g+0],E=w[g+1],P=w[g+2];d.push(M,E,E,P,P,M)}}else{const w=v.array;p=v.version;for(let g=0,b=w.length/3-1;g<b;g+=3){const M=g+0,E=g+1,P=g+2;d.push(M,E,E,P,P,M)}}const f=new(zh(d)?jh:Wh)(d,1);f.version=p;const x=s.get(h);x&&e.remove(x),s.set(h,f)}function u(h){const d=s.get(h);if(d){const m=h.index;m!==null&&d.version<m.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function R0(r,e,t,n){const i=n.isWebGL2;let s;function o(d){s=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function u(d,m){r.drawElements(s,m,a,d*l),t.update(m,s,1)}function h(d,m,v){if(v===0)return;let p,f;if(i)p=r,f="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[f](s,m,a,d*l,v),t.update(m,s,v)}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=h}function D0(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case 4:t.triangles+=a*(s/3);break;case 1:t.lines+=a*(s/2);break;case 3:t.lines+=a*(s-1);break;case 2:t.lines+=a*s;break;case 0:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function L0(r,e){return r[0]-e[0]}function I0(r,e){return Math.abs(e[1])-Math.abs(r[1])}function N0(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,o=new lt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,h){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const m=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,v=m!==void 0?m.length:0;let p=s.get(u);if(p===void 0||p.count!==v){let F=function(){W.dispose(),s.delete(u),u.removeEventListener("dispose",F)};p!==void 0&&p.texture.dispose();const w=u.morphAttributes.position!==void 0,g=u.morphAttributes.normal!==void 0,b=u.morphAttributes.color!==void 0,M=u.morphAttributes.position||[],E=u.morphAttributes.normal||[],P=u.morphAttributes.color||[];let y=0;w===!0&&(y=1),g===!0&&(y=2),b===!0&&(y=3);let T=u.attributes.position.count*y,L=1;T>e.maxTextureSize&&(L=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const O=new Float32Array(T*L*4*v),W=new Vh(O,T,L,v);W.type=ft,W.needsUpdate=!0;const U=y*4;for(let V=0;V<v;V++){const $=M[V],ne=E[V],K=P[V],ee=T*L*4*V;for(let se=0;se<$.count;se++){const Me=se*U;w===!0&&(o.fromBufferAttribute($,se),O[ee+Me+0]=o.x,O[ee+Me+1]=o.y,O[ee+Me+2]=o.z,O[ee+Me+3]=0),g===!0&&(o.fromBufferAttribute(ne,se),O[ee+Me+4]=o.x,O[ee+Me+5]=o.y,O[ee+Me+6]=o.z,O[ee+Me+7]=0),b===!0&&(o.fromBufferAttribute(K,se),O[ee+Me+8]=o.x,O[ee+Me+9]=o.y,O[ee+Me+10]=o.z,O[ee+Me+11]=K.itemSize===4?o.w:1)}}p={count:v,texture:W,size:new _e(T,L)},s.set(u,p),u.addEventListener("dispose",F)}let f=0;for(let w=0;w<d.length;w++)f+=d[w];const x=u.morphTargetsRelative?1:1-f;h.getUniforms().setValue(r,"morphTargetBaseInfluence",x),h.getUniforms().setValue(r,"morphTargetInfluences",d),h.getUniforms().setValue(r,"morphTargetsTexture",p.texture,t),h.getUniforms().setValue(r,"morphTargetsTextureSize",p.size)}else{const m=d===void 0?0:d.length;let v=n[u.id];if(v===void 0||v.length!==m){v=[];for(let g=0;g<m;g++)v[g]=[g,0];n[u.id]=v}for(let g=0;g<m;g++){const b=v[g];b[0]=g,b[1]=d[g]}v.sort(I0);for(let g=0;g<8;g++)g<m&&v[g][1]?(a[g][0]=v[g][0],a[g][1]=v[g][1]):(a[g][0]=Number.MAX_SAFE_INTEGER,a[g][1]=0);a.sort(L0);const p=u.morphAttributes.position,f=u.morphAttributes.normal;let x=0;for(let g=0;g<8;g++){const b=a[g],M=b[0],E=b[1];M!==Number.MAX_SAFE_INTEGER&&E?(p&&u.getAttribute("morphTarget"+g)!==p[M]&&u.setAttribute("morphTarget"+g,p[M]),f&&u.getAttribute("morphNormal"+g)!==f[M]&&u.setAttribute("morphNormal"+g,f[M]),i[g]=E,x+=E):(p&&u.hasAttribute("morphTarget"+g)===!0&&u.deleteAttribute("morphTarget"+g),f&&u.hasAttribute("morphNormal"+g)===!0&&u.deleteAttribute("morphNormal"+g),i[g]=0)}const w=u.morphTargetsRelative?1:1-x;h.getUniforms().setValue(r,"morphTargetBaseInfluence",w),h.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function F0(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);return i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),t.update(l.instanceMatrix,34962),l.instanceColor!==null&&t.update(l.instanceColor,34962)),h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Zh=new Ct,Kh=new Vh,Jh=new bp,Qh=new qh,Xc=[],qc=[],Yc=new Float32Array(16),Zc=new Float32Array(9),Kc=new Float32Array(4);function os(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Xc[i];if(s===void 0&&(s=new Float32Array(i),Xc[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Ot(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function kt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Ko(r,e){let t=qc[e];t===void 0&&(t=new Int32Array(e),qc[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function U0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function O0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;r.uniform2fv(this.addr,e),kt(t,e)}}function k0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ot(t,e))return;r.uniform3fv(this.addr,e),kt(t,e)}}function z0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;r.uniform4fv(this.addr,e),kt(t,e)}}function B0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(Ot(t,n))return;Kc.set(n),r.uniformMatrix2fv(this.addr,!1,Kc),kt(t,n)}}function G0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(Ot(t,n))return;Zc.set(n),r.uniformMatrix3fv(this.addr,!1,Zc),kt(t,n)}}function V0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(Ot(t,n))return;Yc.set(n),r.uniformMatrix4fv(this.addr,!1,Yc),kt(t,n)}}function H0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function W0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;r.uniform2iv(this.addr,e),kt(t,e)}}function j0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;r.uniform3iv(this.addr,e),kt(t,e)}}function X0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;r.uniform4iv(this.addr,e),kt(t,e)}}function q0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Y0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;r.uniform2uiv(this.addr,e),kt(t,e)}}function Z0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;r.uniform3uiv(this.addr,e),kt(t,e)}}function K0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;r.uniform4uiv(this.addr,e),kt(t,e)}}function J0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2D(e||Zh,i)}function Q0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Jh,i)}function $0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Qh,i)}function ev(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Kh,i)}function tv(r){switch(r){case 5126:return U0;case 35664:return O0;case 35665:return k0;case 35666:return z0;case 35674:return B0;case 35675:return G0;case 35676:return V0;case 5124:case 35670:return H0;case 35667:case 35671:return W0;case 35668:case 35672:return j0;case 35669:case 35673:return X0;case 5125:return q0;case 36294:return Y0;case 36295:return Z0;case 36296:return K0;case 35678:case 36198:case 36298:case 36306:case 35682:return J0;case 35679:case 36299:case 36307:return Q0;case 35680:case 36300:case 36308:case 36293:return $0;case 36289:case 36303:case 36311:case 36292:return ev}}function nv(r,e){r.uniform1fv(this.addr,e)}function iv(r,e){const t=os(e,this.size,2);r.uniform2fv(this.addr,t)}function rv(r,e){const t=os(e,this.size,3);r.uniform3fv(this.addr,t)}function sv(r,e){const t=os(e,this.size,4);r.uniform4fv(this.addr,t)}function ov(r,e){const t=os(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function av(r,e){const t=os(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function lv(r,e){const t=os(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function cv(r,e){r.uniform1iv(this.addr,e)}function uv(r,e){r.uniform2iv(this.addr,e)}function hv(r,e){r.uniform3iv(this.addr,e)}function dv(r,e){r.uniform4iv(this.addr,e)}function fv(r,e){r.uniform1uiv(this.addr,e)}function pv(r,e){r.uniform2uiv(this.addr,e)}function mv(r,e){r.uniform3uiv(this.addr,e)}function gv(r,e){r.uniform4uiv(this.addr,e)}function vv(r,e,t){const n=this.cache,i=e.length,s=Ko(t,i);Ot(n,s)||(r.uniform1iv(this.addr,s),kt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Zh,s[o])}function xv(r,e,t){const n=this.cache,i=e.length,s=Ko(t,i);Ot(n,s)||(r.uniform1iv(this.addr,s),kt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Jh,s[o])}function _v(r,e,t){const n=this.cache,i=e.length,s=Ko(t,i);Ot(n,s)||(r.uniform1iv(this.addr,s),kt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Qh,s[o])}function yv(r,e,t){const n=this.cache,i=e.length,s=Ko(t,i);Ot(n,s)||(r.uniform1iv(this.addr,s),kt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Kh,s[o])}function wv(r){switch(r){case 5126:return nv;case 35664:return iv;case 35665:return rv;case 35666:return sv;case 35674:return ov;case 35675:return av;case 35676:return lv;case 5124:case 35670:return cv;case 35667:case 35671:return uv;case 35668:case 35672:return hv;case 35669:case 35673:return dv;case 5125:return fv;case 36294:return pv;case 36295:return mv;case 36296:return gv;case 35678:case 36198:case 36298:case 36306:case 35682:return vv;case 35679:case 36299:case 36307:return xv;case 35680:case 36300:case 36308:case 36293:return _v;case 36289:case 36303:case 36311:case 36292:return yv}}class bv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=tv(t.type)}}class Mv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=wv(t.type)}}class Sv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Oa=/(\w+)(\])?(\[|\.)?/g;function Jc(r,e){r.seq.push(e),r.map[e.id]=e}function Tv(r,e,t){const n=r.name,i=n.length;for(Oa.lastIndex=0;;){const s=Oa.exec(n),o=Oa.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Jc(t,c===void 0?new bv(a,r,e):new Mv(a,r,e));break}else{let h=t.map[a];h===void 0&&(h=new Sv(a),Jc(t,h)),t=h}}}class Oo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,35718);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);Tv(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Qc(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}let Ev=0;function Av(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Cv(r){switch(r){case yn:return["Linear","( value )"];case He:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",r),["Linear","( value )"]}}function $c(r,e,t){const n=r.getShaderParameter(e,35713),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Av(r.getShaderSource(e),o)}else return i}function Pv(r,e){const t=Cv(e);return"vec4 "+r+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function Rv(r,e){let t;switch(e){case Nf:t="Linear";break;case Ff:t="Reinhard";break;case Uf:t="OptimizedCineon";break;case is:t="ACESFilmic";break;case Of:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Dv(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.tangentSpaceNormalMap||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Es).join(`
`)}function Lv(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Iv(r,e){const t={},n=r.getProgramParameter(e,35721);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===35674&&(a=2),s.type===35675&&(a=3),s.type===35676&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Es(r){return r!==""}function eu(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function tu(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Nv=/^[ \t]*#include +<([\w\d./]+)>/gm;function ul(r){return r.replace(Nv,Fv)}function Fv(r,e){const t=Ge[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return ul(t)}const Uv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nu(r){return r.replace(Uv,Ov)}function Ov(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function iu(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function kv(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Ch?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===df?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Oi&&(e="SHADOWMAP_TYPE_VSM"),e}function zv(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Zr:case Kr:e="ENVMAP_TYPE_CUBE";break;case Xo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Bv(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Kr:e="ENVMAP_MODE_REFRACTION";break}return e}function Gv(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Dh:e="ENVMAP_BLENDING_MULTIPLY";break;case Lf:e="ENVMAP_BLENDING_MIX";break;case If:e="ENVMAP_BLENDING_ADD";break}return e}function Vv(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Hv(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=kv(t),c=zv(t),u=Bv(t),h=Gv(t),d=Vv(t),m=t.isWebGL2?"":Dv(t),v=Lv(s),p=i.createProgram();let f,x,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=[v].filter(Es).join(`
`),f.length>0&&(f+=`
`),x=[m,v].filter(Es).join(`
`),x.length>0&&(x+=`
`)):(f=[iu(t),"#define SHADER_NAME "+t.shaderName,v,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Es).join(`
`),x=[m,iu(t),"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Zn?"#define TONE_MAPPING":"",t.toneMapping!==Zn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Zn?Rv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.encodings_pars_fragment,Pv("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Es).join(`
`)),o=ul(o),o=eu(o,t),o=tu(o,t),a=ul(a),a=eu(a,t),a=tu(a,t),o=nu(o),a=nu(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,f=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,x=["#define varying in",t.glslVersion===Vi?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vi?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const g=w+f+o,b=w+x+a,M=Qc(i,35633,g),E=Qc(i,35632,b);if(i.attachShader(p,M),i.attachShader(p,E),t.index0AttributeName!==void 0?i.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p),r.debug.checkShaderErrors){const T=i.getProgramInfoLog(p).trim(),L=i.getShaderInfoLog(M).trim(),O=i.getShaderInfoLog(E).trim();let W=!0,U=!0;if(i.getProgramParameter(p,35714)===!1){W=!1;const F=$c(i,M,"vertex"),V=$c(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,35715)+`

Program Info Log: `+T+`
`+F+`
`+V)}else T!==""?console.warn("THREE.WebGLProgram: Program Info Log:",T):(L===""||O==="")&&(U=!1);U&&(this.diagnostics={runnable:W,programLog:T,vertexShader:{log:L,prefix:f},fragmentShader:{log:O,prefix:x}})}i.deleteShader(M),i.deleteShader(E);let P;this.getUniforms=function(){return P===void 0&&(P=new Oo(i,p)),P};let y;return this.getAttributes=function(){return y===void 0&&(y=Iv(i,p)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.name=t.shaderName,this.id=Ev++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=M,this.fragmentShader=E,this}let Wv=0;class jv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Xv(e),t.set(e,n)),n}}class Xv{constructor(e){this.id=Wv++,this.code=e,this.usedTimes=0}}function qv(r,e,t,n,i,s,o){const a=new Fl,l=new jv,c=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,d=i.vertexTextures;let m=i.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y,T,L,O,W){const U=O.fog,F=W.geometry,V=y.isMeshStandardMaterial?O.environment:null,$=(y.isMeshStandardMaterial?t:e).get(y.envMap||V),ne=$&&$.mapping===Xo?$.image.height:null,K=v[y.type];y.precision!==null&&(m=i.getMaxPrecision(y.precision),m!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",m,"instead."));const ee=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,se=ee!==void 0?ee.length:0;let Me=0;F.morphAttributes.position!==void 0&&(Me=1),F.morphAttributes.normal!==void 0&&(Me=2),F.morphAttributes.color!==void 0&&(Me=3);let j,le,fe,X;if(K){const je=rn[K];j=je.vertexShader,le=je.fragmentShader}else j=y.vertexShader,le=y.fragmentShader,l.update(y),fe=l.getVertexShaderID(y),X=l.getFragmentShaderID(y);const ce=r.getRenderTarget(),xe=y.alphaTest>0,Se=y.clearcoat>0,ye=y.iridescence>0;return{isWebGL2:u,shaderID:K,shaderName:y.type,vertexShader:j,fragmentShader:le,defines:y.defines,customVertexShaderID:fe,customFragmentShaderID:X,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:m,instancing:W.isInstancedMesh===!0,instancingColor:W.isInstancedMesh===!0&&W.instanceColor!==null,supportsVertexTextures:d,outputEncoding:ce===null?r.outputEncoding:ce.isXRRenderTarget===!0?ce.texture.encoding:yn,map:!!y.map,matcap:!!y.matcap,envMap:!!$,envMapMode:$&&$.mapping,envMapCubeUVHeight:ne,lightMap:!!y.lightMap,aoMap:!!y.aoMap,emissiveMap:!!y.emissiveMap,bumpMap:!!y.bumpMap,normalMap:!!y.normalMap,objectSpaceNormalMap:y.normalMapType===ep,tangentSpaceNormalMap:y.normalMapType===Il,decodeVideoTexture:!!y.map&&y.map.isVideoTexture===!0&&y.map.encoding===He,clearcoat:Se,clearcoatMap:Se&&!!y.clearcoatMap,clearcoatRoughnessMap:Se&&!!y.clearcoatRoughnessMap,clearcoatNormalMap:Se&&!!y.clearcoatNormalMap,iridescence:ye,iridescenceMap:ye&&!!y.iridescenceMap,iridescenceThicknessMap:ye&&!!y.iridescenceThicknessMap,displacementMap:!!y.displacementMap,roughnessMap:!!y.roughnessMap,metalnessMap:!!y.metalnessMap,specularMap:!!y.specularMap,specularIntensityMap:!!y.specularIntensityMap,specularColorMap:!!y.specularColorMap,opaque:y.transparent===!1&&y.blending===jr,alphaMap:!!y.alphaMap,alphaTest:xe,gradientMap:!!y.gradientMap,sheen:y.sheen>0,sheenColorMap:!!y.sheenColorMap,sheenRoughnessMap:!!y.sheenRoughnessMap,transmission:y.transmission>0,transmissionMap:!!y.transmissionMap,thicknessMap:!!y.thicknessMap,combine:y.combine,vertexTangents:!!y.normalMap&&!!F.attributes.tangent,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUvs:!!y.map||!!y.bumpMap||!!y.normalMap||!!y.specularMap||!!y.alphaMap||!!y.emissiveMap||!!y.roughnessMap||!!y.metalnessMap||!!y.clearcoatMap||!!y.clearcoatRoughnessMap||!!y.clearcoatNormalMap||!!y.iridescenceMap||!!y.iridescenceThicknessMap||!!y.displacementMap||!!y.transmissionMap||!!y.thicknessMap||!!y.specularIntensityMap||!!y.specularColorMap||!!y.sheenColorMap||!!y.sheenRoughnessMap,uvsVertexOnly:!(y.map||y.bumpMap||y.normalMap||y.specularMap||y.alphaMap||y.emissiveMap||y.roughnessMap||y.metalnessMap||y.clearcoatNormalMap||y.iridescenceMap||y.iridescenceThicknessMap||y.transmission>0||y.transmissionMap||y.thicknessMap||y.specularIntensityMap||y.specularColorMap||y.sheen>0||y.sheenColorMap||y.sheenRoughnessMap)&&!!y.displacementMap,fog:!!U,useFog:y.fog===!0,fogExp2:U&&U.isFogExp2,flatShading:!!y.flatShading,sizeAttenuation:y.sizeAttenuation,logarithmicDepthBuffer:h,skinning:W.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:Me,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:y.toneMapped?r.toneMapping:Zn,useLegacyLights:r.useLegacyLights,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===dn,flipSided:y.side===Ut,useDepthPacking:!!y.depthPacking,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:y.extensions&&y.extensions.derivatives,extensionFragDepth:y.extensions&&y.extensions.fragDepth,extensionDrawBuffers:y.extensions&&y.extensions.drawBuffers,extensionShaderTextureLOD:y.extensions&&y.extensions.shaderTextureLOD,rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),customProgramCacheKey:y.customProgramCacheKey()}}function f(y){const T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(const L in y.defines)T.push(L),T.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(x(T,y),w(T,y),T.push(r.outputEncoding)),T.push(y.customProgramCacheKey),T.join()}function x(y,T){y.push(T.precision),y.push(T.outputEncoding),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.combine),y.push(T.vertexUvs),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function w(y,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.map&&a.enable(4),T.matcap&&a.enable(5),T.envMap&&a.enable(6),T.lightMap&&a.enable(7),T.aoMap&&a.enable(8),T.emissiveMap&&a.enable(9),T.bumpMap&&a.enable(10),T.normalMap&&a.enable(11),T.objectSpaceNormalMap&&a.enable(12),T.tangentSpaceNormalMap&&a.enable(13),T.clearcoat&&a.enable(14),T.clearcoatMap&&a.enable(15),T.clearcoatRoughnessMap&&a.enable(16),T.clearcoatNormalMap&&a.enable(17),T.iridescence&&a.enable(18),T.iridescenceMap&&a.enable(19),T.iridescenceThicknessMap&&a.enable(20),T.displacementMap&&a.enable(21),T.specularMap&&a.enable(22),T.roughnessMap&&a.enable(23),T.metalnessMap&&a.enable(24),T.gradientMap&&a.enable(25),T.alphaMap&&a.enable(26),T.alphaTest&&a.enable(27),T.vertexColors&&a.enable(28),T.vertexAlphas&&a.enable(29),T.vertexUvs&&a.enable(30),T.vertexTangents&&a.enable(31),T.uvsVertexOnly&&a.enable(32),y.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.specularIntensityMap&&a.enable(15),T.specularColorMap&&a.enable(16),T.transmission&&a.enable(17),T.transmissionMap&&a.enable(18),T.thicknessMap&&a.enable(19),T.sheen&&a.enable(20),T.sheenColorMap&&a.enable(21),T.sheenRoughnessMap&&a.enable(22),T.decodeVideoTexture&&a.enable(23),T.opaque&&a.enable(24),y.push(a.mask)}function g(y){const T=v[y.type];let L;if(T){const O=rn[T];L=ur.clone(O.uniforms)}else L=y.uniforms;return L}function b(y,T){let L;for(let O=0,W=c.length;O<W;O++){const U=c[O];if(U.cacheKey===T){L=U,++L.usedTimes;break}}return L===void 0&&(L=new Hv(r,T,y,s),c.push(L)),L}function M(y){if(--y.usedTimes===0){const T=c.indexOf(y);c[T]=c[c.length-1],c.pop(),y.destroy()}}function E(y){l.remove(y)}function P(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:g,acquireProgram:b,releaseProgram:M,releaseShaderCache:E,programs:c,dispose:P}}function Yv(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Zv(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function ru(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function su(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(h,d,m,v,p,f){let x=r[e];return x===void 0?(x={id:h.id,object:h,geometry:d,material:m,groupOrder:v,renderOrder:h.renderOrder,z:p,group:f},r[e]=x):(x.id=h.id,x.object=h,x.geometry=d,x.material=m,x.groupOrder=v,x.renderOrder=h.renderOrder,x.z=p,x.group=f),e++,x}function a(h,d,m,v,p,f){const x=o(h,d,m,v,p,f);m.transmission>0?n.push(x):m.transparent===!0?i.push(x):t.push(x)}function l(h,d,m,v,p,f){const x=o(h,d,m,v,p,f);m.transmission>0?n.unshift(x):m.transparent===!0?i.unshift(x):t.unshift(x)}function c(h,d){t.length>1&&t.sort(h||Zv),n.length>1&&n.sort(d||ru),i.length>1&&i.sort(d||ru)}function u(){for(let h=e,d=r.length;h<d;h++){const m=r[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function Kv(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new su,r.set(n,[o])):i>=s.length?(o=new su,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function Jv(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Ne};break;case"SpotLight":t={position:new I,direction:new I,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new I,halfWidth:new I,halfHeight:new I};break}return r[e.id]=t,t}}}function Qv(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let $v=0;function ex(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function tx(r,e){const t=new Jv,n=Qv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let u=0;u<9;u++)i.probe.push(new I);const s=new I,o=new Ue,a=new Ue;function l(u,h){let d=0,m=0,v=0;for(let O=0;O<9;O++)i.probe[O].set(0,0,0);let p=0,f=0,x=0,w=0,g=0,b=0,M=0,E=0,P=0,y=0;u.sort(ex);const T=h===!0?Math.PI:1;for(let O=0,W=u.length;O<W;O++){const U=u[O],F=U.color,V=U.intensity,$=U.distance,ne=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)d+=F.r*V*T,m+=F.g*V*T,v+=F.b*V*T;else if(U.isLightProbe)for(let K=0;K<9;K++)i.probe[K].addScaledVector(U.sh.coefficients[K],V);else if(U.isDirectionalLight){const K=t.get(U);if(K.color.copy(U.color).multiplyScalar(U.intensity*T),U.castShadow){const ee=U.shadow,se=n.get(U);se.shadowBias=ee.bias,se.shadowNormalBias=ee.normalBias,se.shadowRadius=ee.radius,se.shadowMapSize=ee.mapSize,i.directionalShadow[p]=se,i.directionalShadowMap[p]=ne,i.directionalShadowMatrix[p]=U.shadow.matrix,b++}i.directional[p]=K,p++}else if(U.isSpotLight){const K=t.get(U);K.position.setFromMatrixPosition(U.matrixWorld),K.color.copy(F).multiplyScalar(V*T),K.distance=$,K.coneCos=Math.cos(U.angle),K.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),K.decay=U.decay,i.spot[x]=K;const ee=U.shadow;if(U.map&&(i.spotLightMap[P]=U.map,P++,ee.updateMatrices(U),U.castShadow&&y++),i.spotLightMatrix[x]=ee.matrix,U.castShadow){const se=n.get(U);se.shadowBias=ee.bias,se.shadowNormalBias=ee.normalBias,se.shadowRadius=ee.radius,se.shadowMapSize=ee.mapSize,i.spotShadow[x]=se,i.spotShadowMap[x]=ne,E++}x++}else if(U.isRectAreaLight){const K=t.get(U);K.color.copy(F).multiplyScalar(V),K.halfWidth.set(U.width*.5,0,0),K.halfHeight.set(0,U.height*.5,0),i.rectArea[w]=K,w++}else if(U.isPointLight){const K=t.get(U);if(K.color.copy(U.color).multiplyScalar(U.intensity*T),K.distance=U.distance,K.decay=U.decay,U.castShadow){const ee=U.shadow,se=n.get(U);se.shadowBias=ee.bias,se.shadowNormalBias=ee.normalBias,se.shadowRadius=ee.radius,se.shadowMapSize=ee.mapSize,se.shadowCameraNear=ee.camera.near,se.shadowCameraFar=ee.camera.far,i.pointShadow[f]=se,i.pointShadowMap[f]=ne,i.pointShadowMatrix[f]=U.shadow.matrix,M++}i.point[f]=K,f++}else if(U.isHemisphereLight){const K=t.get(U);K.skyColor.copy(U.color).multiplyScalar(V*T),K.groundColor.copy(U.groundColor).multiplyScalar(V*T),i.hemi[g]=K,g++}}w>0&&(e.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=m,i.ambient[2]=v;const L=i.hash;(L.directionalLength!==p||L.pointLength!==f||L.spotLength!==x||L.rectAreaLength!==w||L.hemiLength!==g||L.numDirectionalShadows!==b||L.numPointShadows!==M||L.numSpotShadows!==E||L.numSpotMaps!==P)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=w,i.point.length=f,i.hemi.length=g,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=E+P-y,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=y,L.directionalLength=p,L.pointLength=f,L.spotLength=x,L.rectAreaLength=w,L.hemiLength=g,L.numDirectionalShadows=b,L.numPointShadows=M,L.numSpotShadows=E,L.numSpotMaps=P,i.version=$v++)}function c(u,h){let d=0,m=0,v=0,p=0,f=0;const x=h.matrixWorldInverse;for(let w=0,g=u.length;w<g;w++){const b=u[w];if(b.isDirectionalLight){const M=i.directional[d];M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(x),d++}else if(b.isSpotLight){const M=i.spot[v];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(x),M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(x),v++}else if(b.isRectAreaLight){const M=i.rectArea[p];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(x),a.identity(),o.copy(b.matrixWorld),o.premultiply(x),a.extractRotation(o),M.halfWidth.set(b.width*.5,0,0),M.halfHeight.set(0,b.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),p++}else if(b.isPointLight){const M=i.point[m];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(x),m++}else if(b.isHemisphereLight){const M=i.hemi[f];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(x),f++}}}return{setup:l,setupView:c,state:i}}function ou(r,e){const t=new tx(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function o(h){n.push(h)}function a(h){i.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function nx(r,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new ou(r,e),t.set(s,[l])):o>=a.length?(l=new ou(r,e),a.push(l)):l=a[o],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class $h extends En{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Js,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ix extends En{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new I,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const rx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function ox(r,e,t){let n=new Ul;const i=new _e,s=new _e,o=new lt,a=new $h({depthPacking:Fh}),l=new ix,c={},u=t.maxTextureSize,h={[li]:Ut,[Ut]:li,[dn]:dn},d=new Vt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _e},radius:{value:4}},vertexShader:rx,fragmentShader:sx}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const v=new Pt;v.setAttribute("position",new Mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const p=new pe(v,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ch,this.render=function(b,M,E){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||b.length===0)return;const P=r.getRenderTarget(),y=r.getActiveCubeFace(),T=r.getActiveMipmapLevel(),L=r.state;L.setBlending(Yn),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);for(let O=0,W=b.length;O<W;O++){const U=b[O],F=U.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",U,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;i.copy(F.mapSize);const V=F.getFrameExtents();if(i.multiply(V),s.copy(F.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/V.x),i.x=s.x*V.x,F.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/V.y),i.y=s.y*V.y,F.mapSize.y=s.y)),F.map===null){const ne=this.type!==Oi?{minFilter:it,magFilter:it}:{};F.map=new Ft(i.x,i.y,ne),F.map.texture.name=U.name+".shadowMap",F.camera.updateProjectionMatrix()}r.setRenderTarget(F.map),r.clear();const $=F.getViewportCount();for(let ne=0;ne<$;ne++){const K=F.getViewport(ne);o.set(s.x*K.x,s.y*K.y,s.x*K.z,s.y*K.w),L.viewport(o),F.updateMatrices(U,ne),n=F.getFrustum(),g(M,E,F.camera,U,this.type)}F.isPointLightShadow!==!0&&this.type===Oi&&x(F,E),F.needsUpdate=!1}f.needsUpdate=!1,r.setRenderTarget(P,y,T)};function x(b,M){const E=e.update(p);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Ft(i.x,i.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(M,null,E,d,p,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(M,null,E,m,p,null)}function w(b,M,E,P,y,T){let L=null;const O=E.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(O!==void 0)L=O;else if(L=E.isPointLight===!0?l:a,r.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const W=L.uuid,U=M.uuid;let F=c[W];F===void 0&&(F={},c[W]=F);let V=F[U];V===void 0&&(V=L.clone(),F[U]=V),L=V}return L.visible=M.visible,L.wireframe=M.wireframe,T===Oi?L.side=M.shadowSide!==null?M.shadowSide:M.side:L.side=M.shadowSide!==null?M.shadowSide:h[M.side],L.alphaMap=M.alphaMap,L.alphaTest=M.alphaTest,L.map=M.map,L.clipShadows=M.clipShadows,L.clippingPlanes=M.clippingPlanes,L.clipIntersection=M.clipIntersection,L.displacementMap=M.displacementMap,L.displacementScale=M.displacementScale,L.displacementBias=M.displacementBias,L.wireframeLinewidth=M.wireframeLinewidth,L.linewidth=M.linewidth,E.isPointLight===!0&&L.isMeshDistanceMaterial===!0&&(L.referencePosition.setFromMatrixPosition(E.matrixWorld),L.nearDistance=P,L.farDistance=y),L}function g(b,M,E,P,y){if(b.visible===!1)return;if(b.layers.test(M.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&y===Oi)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,b.matrixWorld);const O=e.update(b),W=b.material;if(Array.isArray(W)){const U=O.groups;for(let F=0,V=U.length;F<V;F++){const $=U[F],ne=W[$.materialIndex];if(ne&&ne.visible){const K=w(b,ne,P,E.near,E.far,y);r.renderBufferDirect(E,null,O,K,b,$)}}}else if(W.visible){const U=w(b,W,P,E.near,E.far,y);r.renderBufferDirect(E,null,O,U,b,null)}}const L=b.children;for(let O=0,W=L.length;O<W;O++)g(L[O],M,E,P,y)}}function ax(r,e,t){const n=t.isWebGL2;function i(){let G=!1;const B=new lt;let ue=null;const Pe=new lt(0,0,0,0);return{setMask:function(Ie){ue!==Ie&&!G&&(r.colorMask(Ie,Ie,Ie,Ie),ue=Ie)},setLocked:function(Ie){G=Ie},setClear:function(Ie,ut,Lt,Wt,An){An===!0&&(Ie*=Wt,ut*=Wt,Lt*=Wt),B.set(Ie,ut,Lt,Wt),Pe.equals(B)===!1&&(r.clearColor(Ie,ut,Lt,Wt),Pe.copy(B))},reset:function(){G=!1,ue=null,Pe.set(-1,0,0,0)}}}function s(){let G=!1,B=null,ue=null,Pe=null;return{setTest:function(Ie){Ie?xe(2929):Se(2929)},setMask:function(Ie){B!==Ie&&!G&&(r.depthMask(Ie),B=Ie)},setFunc:function(Ie){if(ue!==Ie){switch(Ie){case Tf:r.depthFunc(512);break;case Ef:r.depthFunc(519);break;case Af:r.depthFunc(513);break;case il:r.depthFunc(515);break;case Cf:r.depthFunc(514);break;case Pf:r.depthFunc(518);break;case Rf:r.depthFunc(516);break;case Df:r.depthFunc(517);break;default:r.depthFunc(515)}ue=Ie}},setLocked:function(Ie){G=Ie},setClear:function(Ie){Pe!==Ie&&(r.clearDepth(Ie),Pe=Ie)},reset:function(){G=!1,B=null,ue=null,Pe=null}}}function o(){let G=!1,B=null,ue=null,Pe=null,Ie=null,ut=null,Lt=null,Wt=null,An=null;return{setTest:function(wt){G||(wt?xe(2960):Se(2960))},setMask:function(wt){B!==wt&&!G&&(r.stencilMask(wt),B=wt)},setFunc:function(wt,mn,Cn){(ue!==wt||Pe!==mn||Ie!==Cn)&&(r.stencilFunc(wt,mn,Cn),ue=wt,Pe=mn,Ie=Cn)},setOp:function(wt,mn,Cn){(ut!==wt||Lt!==mn||Wt!==Cn)&&(r.stencilOp(wt,mn,Cn),ut=wt,Lt=mn,Wt=Cn)},setLocked:function(wt){G=wt},setClear:function(wt){An!==wt&&(r.clearStencil(wt),An=wt)},reset:function(){G=!1,B=null,ue=null,Pe=null,Ie=null,ut=null,Lt=null,Wt=null,An=null}}}const a=new i,l=new s,c=new o,u=new WeakMap,h=new WeakMap;let d={},m={},v=new WeakMap,p=[],f=null,x=!1,w=null,g=null,b=null,M=null,E=null,P=null,y=null,T=!1,L=null,O=null,W=null,U=null,F=null;const V=r.getParameter(35661);let $=!1,ne=0;const K=r.getParameter(7938);K.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(K)[1]),$=ne>=1):K.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),$=ne>=2);let ee=null,se={};const Me=r.getParameter(3088),j=r.getParameter(2978),le=new lt().fromArray(Me),fe=new lt().fromArray(j);function X(G,B,ue){const Pe=new Uint8Array(4),Ie=r.createTexture();r.bindTexture(G,Ie),r.texParameteri(G,10241,9728),r.texParameteri(G,10240,9728);for(let ut=0;ut<ue;ut++)r.texImage2D(B+ut,0,6408,1,1,0,6408,5121,Pe);return Ie}const ce={};ce[3553]=X(3553,3553,1),ce[34067]=X(34067,34069,6),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),xe(2929),l.setFunc(il),Rt(!1),Dt(Zl),xe(2884),St(Yn);function xe(G){d[G]!==!0&&(r.enable(G),d[G]=!0)}function Se(G){d[G]!==!1&&(r.disable(G),d[G]=!1)}function ye(G,B){return m[G]!==B?(r.bindFramebuffer(G,B),m[G]=B,n&&(G===36009&&(m[36160]=B),G===36160&&(m[36009]=B)),!0):!1}function Te(G,B){let ue=p,Pe=!1;if(G)if(ue=v.get(B),ue===void 0&&(ue=[],v.set(B,ue)),G.isWebGLMultipleRenderTargets){const Ie=G.texture;if(ue.length!==Ie.length||ue[0]!==36064){for(let ut=0,Lt=Ie.length;ut<Lt;ut++)ue[ut]=36064+ut;ue.length=Ie.length,Pe=!0}}else ue[0]!==36064&&(ue[0]=36064,Pe=!0);else ue[0]!==1029&&(ue[0]=1029,Pe=!0);Pe&&(t.isWebGL2?r.drawBuffers(ue):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ue))}function je(G){return f!==G?(r.useProgram(G),f=G,!0):!1}const Ye={[Or]:32774,[pf]:32778,[mf]:32779};if(n)Ye[$l]=32775,Ye[ec]=32776;else{const G=e.get("EXT_blend_minmax");G!==null&&(Ye[$l]=G.MIN_EXT,Ye[ec]=G.MAX_EXT)}const Qe={[gf]:0,[vf]:1,[xf]:768,[Ph]:770,[Sf]:776,[bf]:774,[yf]:772,[_f]:769,[Rh]:771,[Mf]:775,[wf]:773};function St(G,B,ue,Pe,Ie,ut,Lt,Wt){if(G===Yn){x===!0&&(Se(3042),x=!1);return}if(x===!1&&(xe(3042),x=!0),G!==ff){if(G!==w||Wt!==T){if((g!==Or||E!==Or)&&(r.blendEquation(32774),g=Or,E=Or),Wt)switch(G){case jr:r.blendFuncSeparate(1,771,1,771);break;case Kl:r.blendFunc(1,1);break;case Jl:r.blendFuncSeparate(0,769,0,1);break;case Ql:r.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case jr:r.blendFuncSeparate(770,771,1,771);break;case Kl:r.blendFunc(770,1);break;case Jl:r.blendFuncSeparate(0,769,0,1);break;case Ql:r.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}b=null,M=null,P=null,y=null,w=G,T=Wt}return}Ie=Ie||B,ut=ut||ue,Lt=Lt||Pe,(B!==g||Ie!==E)&&(r.blendEquationSeparate(Ye[B],Ye[Ie]),g=B,E=Ie),(ue!==b||Pe!==M||ut!==P||Lt!==y)&&(r.blendFuncSeparate(Qe[ue],Qe[Pe],Qe[ut],Qe[Lt]),b=ue,M=Pe,P=ut,y=Lt),w=G,T=!1}function zt(G,B){G.side===dn?Se(2884):xe(2884);let ue=G.side===Ut;B&&(ue=!ue),Rt(ue),G.blending===jr&&G.transparent===!1?St(Yn):St(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.premultipliedAlpha),l.setFunc(G.depthFunc),l.setTest(G.depthTest),l.setMask(G.depthWrite),a.setMask(G.colorWrite);const Pe=G.stencilWrite;c.setTest(Pe),Pe&&(c.setMask(G.stencilWriteMask),c.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),c.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),ct(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?xe(32926):Se(32926)}function Rt(G){L!==G&&(G?r.frontFace(2304):r.frontFace(2305),L=G)}function Dt(G){G!==uf?(xe(2884),G!==O&&(G===Zl?r.cullFace(1029):G===hf?r.cullFace(1028):r.cullFace(1032))):Se(2884),O=G}function gt(G){G!==W&&($&&r.lineWidth(G),W=G)}function ct(G,B,ue){G?(xe(32823),(U!==B||F!==ue)&&(r.polygonOffset(B,ue),U=B,F=ue)):Se(32823)}function on(G){G?xe(3089):Se(3089)}function Ht(G){G===void 0&&(G=33984+V-1),ee!==G&&(r.activeTexture(G),ee=G)}function D(G,B,ue){ue===void 0&&(ee===null?ue=33984+V-1:ue=ee);let Pe=se[ue];Pe===void 0&&(Pe={type:void 0,texture:void 0},se[ue]=Pe),(Pe.type!==G||Pe.texture!==B)&&(ee!==ue&&(r.activeTexture(ue),ee=ue),r.bindTexture(G,B||ce[G]),Pe.type=G,Pe.texture=B)}function A(){const G=se[ee];G!==void 0&&G.type!==void 0&&(r.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function te(){try{r.compressedTexImage2D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ge(){try{r.compressedTexImage3D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ve(){try{r.texSubImage2D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ee(){try{r.texSubImage3D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ze(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function N(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function q(){try{r.texStorage2D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ce(){try{r.texStorage3D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function we(){try{r.texImage2D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Le(){try{r.texImage3D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ae(G){le.equals(G)===!1&&(r.scissor(G.x,G.y,G.z,G.w),le.copy(G))}function Oe(G){fe.equals(G)===!1&&(r.viewport(G.x,G.y,G.z,G.w),fe.copy(G))}function Ze(G,B){let ue=h.get(B);ue===void 0&&(ue=new WeakMap,h.set(B,ue));let Pe=ue.get(G);Pe===void 0&&(Pe=r.getUniformBlockIndex(B,G.name),ue.set(G,Pe))}function Xe(G,B){const Pe=h.get(B).get(G);u.get(B)!==Pe&&(r.uniformBlockBinding(B,Pe,G.__bindingPointIndex),u.set(B,Pe))}function qe(){r.disable(3042),r.disable(2884),r.disable(2929),r.disable(32823),r.disable(3089),r.disable(2960),r.disable(32926),r.blendEquation(32774),r.blendFunc(1,0),r.blendFuncSeparate(1,0,1,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(513),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(519,0,4294967295),r.stencilOp(7680,7680,7680),r.clearStencil(0),r.cullFace(1029),r.frontFace(2305),r.polygonOffset(0,0),r.activeTexture(33984),r.bindFramebuffer(36160,null),n===!0&&(r.bindFramebuffer(36009,null),r.bindFramebuffer(36008,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},ee=null,se={},m={},v=new WeakMap,p=[],f=null,x=!1,w=null,g=null,b=null,M=null,E=null,P=null,y=null,T=!1,L=null,O=null,W=null,U=null,F=null,le.set(0,0,r.canvas.width,r.canvas.height),fe.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:xe,disable:Se,bindFramebuffer:ye,drawBuffers:Te,useProgram:je,setBlending:St,setMaterial:zt,setFlipSided:Rt,setCullFace:Dt,setLineWidth:gt,setPolygonOffset:ct,setScissorTest:on,activeTexture:Ht,bindTexture:D,unbindTexture:A,compressedTexImage2D:te,compressedTexImage3D:ge,texImage2D:we,texImage3D:Le,updateUBOMapping:Ze,uniformBlockBinding:Xe,texStorage2D:q,texStorage3D:Ce,texSubImage2D:ve,texSubImage3D:Ee,compressedTexSubImage2D:ze,compressedTexSubImage3D:N,scissor:Ae,viewport:Oe,reset:qe}}function lx(r,e,t,n,i,s,o){const a=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,u=i.maxTextureSize,h=i.maxSamples,d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),v=new WeakMap;let p;const f=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(D,A){return x?new OffscreenCanvas(D,A):Ws("canvas")}function g(D,A,te,ge){let ve=1;if((D.width>ge||D.height>ge)&&(ve=ge/Math.max(D.width,D.height)),ve<1||A===!0)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap){const Ee=A?kh:Math.floor,ze=Ee(ve*D.width),N=Ee(ve*D.height);p===void 0&&(p=w(ze,N));const q=te?w(ze,N):p;return q.width=ze,q.height=N,q.getContext("2d").drawImage(D,0,0,ze,N),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+D.width+"x"+D.height+") to ("+ze+"x"+N+")."),q}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+D.width+"x"+D.height+")."),D;return D}function b(D){return cl(D.width)&&cl(D.height)}function M(D){return a?!1:D.wrapS!==xn||D.wrapT!==xn||D.minFilter!==it&&D.minFilter!==Ve}function E(D,A){return D.generateMipmaps&&A&&D.minFilter!==it&&D.minFilter!==Ve}function P(D){r.generateMipmap(D)}function y(D,A,te,ge,ve=!1){if(a===!1)return A;if(D!==null){if(r[D]!==void 0)return r[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Ee=A;return A===6403&&(te===5126&&(Ee=33326),te===5131&&(Ee=33325),te===5121&&(Ee=33321)),A===33319&&(te===5126&&(Ee=33328),te===5131&&(Ee=33327),te===5121&&(Ee=33323)),A===6408&&(te===5126&&(Ee=34836),te===5131&&(Ee=34842),te===5121&&(Ee=ge===He&&ve===!1?35907:32856),te===32819&&(Ee=32854),te===32820&&(Ee=32855)),(Ee===33325||Ee===33326||Ee===33327||Ee===33328||Ee===34842||Ee===34836)&&e.get("EXT_color_buffer_float"),Ee}function T(D,A,te){return E(D,te)===!0||D.isFramebufferTexture&&D.minFilter!==it&&D.minFilter!==Ve?Math.log2(Math.max(A.width,A.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?A.mipmaps.length:1}function L(D){return D===it||D===sl||D===Uo?9728:9729}function O(D){const A=D.target;A.removeEventListener("dispose",O),U(A),A.isVideoTexture&&v.delete(A)}function W(D){const A=D.target;A.removeEventListener("dispose",W),V(A)}function U(D){const A=n.get(D);if(A.__webglInit===void 0)return;const te=D.source,ge=f.get(te);if(ge){const ve=ge[A.__cacheKey];ve.usedTimes--,ve.usedTimes===0&&F(D),Object.keys(ge).length===0&&f.delete(te)}n.remove(D)}function F(D){const A=n.get(D);r.deleteTexture(A.__webglTexture);const te=D.source,ge=f.get(te);delete ge[A.__cacheKey],o.memory.textures--}function V(D){const A=D.texture,te=n.get(D),ge=n.get(A);if(ge.__webglTexture!==void 0&&(r.deleteTexture(ge.__webglTexture),o.memory.textures--),D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let ve=0;ve<6;ve++)r.deleteFramebuffer(te.__webglFramebuffer[ve]),te.__webglDepthbuffer&&r.deleteRenderbuffer(te.__webglDepthbuffer[ve]);else{if(r.deleteFramebuffer(te.__webglFramebuffer),te.__webglDepthbuffer&&r.deleteRenderbuffer(te.__webglDepthbuffer),te.__webglMultisampledFramebuffer&&r.deleteFramebuffer(te.__webglMultisampledFramebuffer),te.__webglColorRenderbuffer)for(let ve=0;ve<te.__webglColorRenderbuffer.length;ve++)te.__webglColorRenderbuffer[ve]&&r.deleteRenderbuffer(te.__webglColorRenderbuffer[ve]);te.__webglDepthRenderbuffer&&r.deleteRenderbuffer(te.__webglDepthRenderbuffer)}if(D.isWebGLMultipleRenderTargets)for(let ve=0,Ee=A.length;ve<Ee;ve++){const ze=n.get(A[ve]);ze.__webglTexture&&(r.deleteTexture(ze.__webglTexture),o.memory.textures--),n.remove(A[ve])}n.remove(A),n.remove(D)}let $=0;function ne(){$=0}function K(){const D=$;return D>=l&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+l),$+=1,D}function ee(D){const A=[];return A.push(D.wrapS),A.push(D.wrapT),A.push(D.wrapR||0),A.push(D.magFilter),A.push(D.minFilter),A.push(D.anisotropy),A.push(D.internalFormat),A.push(D.format),A.push(D.type),A.push(D.generateMipmaps),A.push(D.premultiplyAlpha),A.push(D.flipY),A.push(D.unpackAlignment),A.push(D.encoding),A.join()}function se(D,A){const te=n.get(D);if(D.isVideoTexture&&on(D),D.isRenderTargetTexture===!1&&D.version>0&&te.__version!==D.version){const ge=D.image;if(ge===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ge.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Se(te,D,A);return}}t.bindTexture(3553,te.__webglTexture,33984+A)}function Me(D,A){const te=n.get(D);if(D.version>0&&te.__version!==D.version){Se(te,D,A);return}t.bindTexture(35866,te.__webglTexture,33984+A)}function j(D,A){const te=n.get(D);if(D.version>0&&te.__version!==D.version){Se(te,D,A);return}t.bindTexture(32879,te.__webglTexture,33984+A)}function le(D,A){const te=n.get(D);if(D.version>0&&te.__version!==D.version){ye(te,D,A);return}t.bindTexture(34067,te.__webglTexture,33984+A)}const fe={[_n]:10497,[xn]:33071,[zo]:33648},X={[it]:9728,[sl]:9984,[Uo]:9986,[Ve]:9729,[Ih]:9985,[Gi]:9987};function ce(D,A,te){if(te?(r.texParameteri(D,10242,fe[A.wrapS]),r.texParameteri(D,10243,fe[A.wrapT]),(D===32879||D===35866)&&r.texParameteri(D,32882,fe[A.wrapR]),r.texParameteri(D,10240,X[A.magFilter]),r.texParameteri(D,10241,X[A.minFilter])):(r.texParameteri(D,10242,33071),r.texParameteri(D,10243,33071),(D===32879||D===35866)&&r.texParameteri(D,32882,33071),(A.wrapS!==xn||A.wrapT!==xn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(D,10240,L(A.magFilter)),r.texParameteri(D,10241,L(A.minFilter)),A.minFilter!==it&&A.minFilter!==Ve&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const ge=e.get("EXT_texture_filter_anisotropic");if(A.magFilter===it||A.minFilter!==Uo&&A.minFilter!==Gi||A.type===ft&&e.has("OES_texture_float_linear")===!1||a===!1&&A.type===bt&&e.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||n.get(A).__currentAnisotropy)&&(r.texParameterf(D,ge.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy)}}function xe(D,A){let te=!1;D.__webglInit===void 0&&(D.__webglInit=!0,A.addEventListener("dispose",O));const ge=A.source;let ve=f.get(ge);ve===void 0&&(ve={},f.set(ge,ve));const Ee=ee(A);if(Ee!==D.__cacheKey){ve[Ee]===void 0&&(ve[Ee]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,te=!0),ve[Ee].usedTimes++;const ze=ve[D.__cacheKey];ze!==void 0&&(ve[D.__cacheKey].usedTimes--,ze.usedTimes===0&&F(A)),D.__cacheKey=Ee,D.__webglTexture=ve[Ee].texture}return te}function Se(D,A,te){let ge=3553;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ge=35866),A.isData3DTexture&&(ge=32879);const ve=xe(D,A),Ee=A.source;t.bindTexture(ge,D.__webglTexture,33984+te);const ze=n.get(Ee);if(Ee.version!==ze.__version||ve===!0){t.activeTexture(33984+te),r.pixelStorei(37440,A.flipY),r.pixelStorei(37441,A.premultiplyAlpha),r.pixelStorei(3317,A.unpackAlignment),r.pixelStorei(37443,0);const N=M(A)&&b(A.image)===!1;let q=g(A.image,N,!1,u);q=Ht(A,q);const Ce=b(q)||a,we=s.convert(A.format,A.encoding);let Le=s.convert(A.type),Ae=y(A.internalFormat,we,Le,A.encoding,A.isVideoTexture);ce(ge,A,Ce);let Oe;const Ze=A.mipmaps,Xe=a&&A.isVideoTexture!==!0,qe=ze.__version===void 0||ve===!0,G=T(A,q,Ce);if(A.isDepthTexture)Ae=6402,a?A.type===ft?Ae=36012:A.type===ki?Ae=33190:A.type===sr?Ae=35056:Ae=33189:A.type===ft&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===bi&&Ae===6402&&A.type!==qo&&A.type!==ki&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=ki,Le=s.convert(A.type)),A.format===lr&&Ae===6402&&(Ae=34041,A.type!==sr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=sr,Le=s.convert(A.type))),qe&&(Xe?t.texStorage2D(3553,1,Ae,q.width,q.height):t.texImage2D(3553,0,Ae,q.width,q.height,0,we,Le,null));else if(A.isDataTexture)if(Ze.length>0&&Ce){Xe&&qe&&t.texStorage2D(3553,G,Ae,Ze[0].width,Ze[0].height);for(let B=0,ue=Ze.length;B<ue;B++)Oe=Ze[B],Xe?t.texSubImage2D(3553,B,0,0,Oe.width,Oe.height,we,Le,Oe.data):t.texImage2D(3553,B,Ae,Oe.width,Oe.height,0,we,Le,Oe.data);A.generateMipmaps=!1}else Xe?(qe&&t.texStorage2D(3553,G,Ae,q.width,q.height),t.texSubImage2D(3553,0,0,0,q.width,q.height,we,Le,q.data)):t.texImage2D(3553,0,Ae,q.width,q.height,0,we,Le,q.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Xe&&qe&&t.texStorage3D(35866,G,Ae,Ze[0].width,Ze[0].height,q.depth);for(let B=0,ue=Ze.length;B<ue;B++)Oe=Ze[B],A.format!==sn?we!==null?Xe?t.compressedTexSubImage3D(35866,B,0,0,0,Oe.width,Oe.height,q.depth,we,Oe.data,0,0):t.compressedTexImage3D(35866,B,Ae,Oe.width,Oe.height,q.depth,0,Oe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage3D(35866,B,0,0,0,Oe.width,Oe.height,q.depth,we,Le,Oe.data):t.texImage3D(35866,B,Ae,Oe.width,Oe.height,q.depth,0,we,Le,Oe.data)}else{Xe&&qe&&t.texStorage2D(3553,G,Ae,Ze[0].width,Ze[0].height);for(let B=0,ue=Ze.length;B<ue;B++)Oe=Ze[B],A.format!==sn?we!==null?Xe?t.compressedTexSubImage2D(3553,B,0,0,Oe.width,Oe.height,we,Oe.data):t.compressedTexImage2D(3553,B,Ae,Oe.width,Oe.height,0,Oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage2D(3553,B,0,0,Oe.width,Oe.height,we,Le,Oe.data):t.texImage2D(3553,B,Ae,Oe.width,Oe.height,0,we,Le,Oe.data)}else if(A.isDataArrayTexture)Xe?(qe&&t.texStorage3D(35866,G,Ae,q.width,q.height,q.depth),t.texSubImage3D(35866,0,0,0,0,q.width,q.height,q.depth,we,Le,q.data)):t.texImage3D(35866,0,Ae,q.width,q.height,q.depth,0,we,Le,q.data);else if(A.isData3DTexture)Xe?(qe&&t.texStorage3D(32879,G,Ae,q.width,q.height,q.depth),t.texSubImage3D(32879,0,0,0,0,q.width,q.height,q.depth,we,Le,q.data)):t.texImage3D(32879,0,Ae,q.width,q.height,q.depth,0,we,Le,q.data);else if(A.isFramebufferTexture){if(qe)if(Xe)t.texStorage2D(3553,G,Ae,q.width,q.height);else{let B=q.width,ue=q.height;for(let Pe=0;Pe<G;Pe++)t.texImage2D(3553,Pe,Ae,B,ue,0,we,Le,null),B>>=1,ue>>=1}}else if(Ze.length>0&&Ce){Xe&&qe&&t.texStorage2D(3553,G,Ae,Ze[0].width,Ze[0].height);for(let B=0,ue=Ze.length;B<ue;B++)Oe=Ze[B],Xe?t.texSubImage2D(3553,B,0,0,we,Le,Oe):t.texImage2D(3553,B,Ae,we,Le,Oe);A.generateMipmaps=!1}else Xe?(qe&&t.texStorage2D(3553,G,Ae,q.width,q.height),t.texSubImage2D(3553,0,0,0,we,Le,q)):t.texImage2D(3553,0,Ae,we,Le,q);E(A,Ce)&&P(ge),ze.__version=Ee.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function ye(D,A,te){if(A.image.length!==6)return;const ge=xe(D,A),ve=A.source;t.bindTexture(34067,D.__webglTexture,33984+te);const Ee=n.get(ve);if(ve.version!==Ee.__version||ge===!0){t.activeTexture(33984+te),r.pixelStorei(37440,A.flipY),r.pixelStorei(37441,A.premultiplyAlpha),r.pixelStorei(3317,A.unpackAlignment),r.pixelStorei(37443,0);const ze=A.isCompressedTexture||A.image[0].isCompressedTexture,N=A.image[0]&&A.image[0].isDataTexture,q=[];for(let B=0;B<6;B++)!ze&&!N?q[B]=g(A.image[B],!1,!0,c):q[B]=N?A.image[B].image:A.image[B],q[B]=Ht(A,q[B]);const Ce=q[0],we=b(Ce)||a,Le=s.convert(A.format,A.encoding),Ae=s.convert(A.type),Oe=y(A.internalFormat,Le,Ae,A.encoding),Ze=a&&A.isVideoTexture!==!0,Xe=Ee.__version===void 0||ge===!0;let qe=T(A,Ce,we);ce(34067,A,we);let G;if(ze){Ze&&Xe&&t.texStorage2D(34067,qe,Oe,Ce.width,Ce.height);for(let B=0;B<6;B++){G=q[B].mipmaps;for(let ue=0;ue<G.length;ue++){const Pe=G[ue];A.format!==sn?Le!==null?Ze?t.compressedTexSubImage2D(34069+B,ue,0,0,Pe.width,Pe.height,Le,Pe.data):t.compressedTexImage2D(34069+B,ue,Oe,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ze?t.texSubImage2D(34069+B,ue,0,0,Pe.width,Pe.height,Le,Ae,Pe.data):t.texImage2D(34069+B,ue,Oe,Pe.width,Pe.height,0,Le,Ae,Pe.data)}}}else{G=A.mipmaps,Ze&&Xe&&(G.length>0&&qe++,t.texStorage2D(34067,qe,Oe,q[0].width,q[0].height));for(let B=0;B<6;B++)if(N){Ze?t.texSubImage2D(34069+B,0,0,0,q[B].width,q[B].height,Le,Ae,q[B].data):t.texImage2D(34069+B,0,Oe,q[B].width,q[B].height,0,Le,Ae,q[B].data);for(let ue=0;ue<G.length;ue++){const Ie=G[ue].image[B].image;Ze?t.texSubImage2D(34069+B,ue+1,0,0,Ie.width,Ie.height,Le,Ae,Ie.data):t.texImage2D(34069+B,ue+1,Oe,Ie.width,Ie.height,0,Le,Ae,Ie.data)}}else{Ze?t.texSubImage2D(34069+B,0,0,0,Le,Ae,q[B]):t.texImage2D(34069+B,0,Oe,Le,Ae,q[B]);for(let ue=0;ue<G.length;ue++){const Pe=G[ue];Ze?t.texSubImage2D(34069+B,ue+1,0,0,Le,Ae,Pe.image[B]):t.texImage2D(34069+B,ue+1,Oe,Le,Ae,Pe.image[B])}}}E(A,we)&&P(34067),Ee.__version=ve.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function Te(D,A,te,ge,ve){const Ee=s.convert(te.format,te.encoding),ze=s.convert(te.type),N=y(te.internalFormat,Ee,ze,te.encoding);n.get(A).__hasExternalTextures||(ve===32879||ve===35866?t.texImage3D(ve,0,N,A.width,A.height,A.depth,0,Ee,ze,null):t.texImage2D(ve,0,N,A.width,A.height,0,Ee,ze,null)),t.bindFramebuffer(36160,D),ct(A)?d.framebufferTexture2DMultisampleEXT(36160,ge,ve,n.get(te).__webglTexture,0,gt(A)):(ve===3553||ve>=34069&&ve<=34074)&&r.framebufferTexture2D(36160,ge,ve,n.get(te).__webglTexture,0),t.bindFramebuffer(36160,null)}function je(D,A,te){if(r.bindRenderbuffer(36161,D),A.depthBuffer&&!A.stencilBuffer){let ge=33189;if(te||ct(A)){const ve=A.depthTexture;ve&&ve.isDepthTexture&&(ve.type===ft?ge=36012:ve.type===ki&&(ge=33190));const Ee=gt(A);ct(A)?d.renderbufferStorageMultisampleEXT(36161,Ee,ge,A.width,A.height):r.renderbufferStorageMultisample(36161,Ee,ge,A.width,A.height)}else r.renderbufferStorage(36161,ge,A.width,A.height);r.framebufferRenderbuffer(36160,36096,36161,D)}else if(A.depthBuffer&&A.stencilBuffer){const ge=gt(A);te&&ct(A)===!1?r.renderbufferStorageMultisample(36161,ge,35056,A.width,A.height):ct(A)?d.renderbufferStorageMultisampleEXT(36161,ge,35056,A.width,A.height):r.renderbufferStorage(36161,34041,A.width,A.height),r.framebufferRenderbuffer(36160,33306,36161,D)}else{const ge=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let ve=0;ve<ge.length;ve++){const Ee=ge[ve],ze=s.convert(Ee.format,Ee.encoding),N=s.convert(Ee.type),q=y(Ee.internalFormat,ze,N,Ee.encoding),Ce=gt(A);te&&ct(A)===!1?r.renderbufferStorageMultisample(36161,Ce,q,A.width,A.height):ct(A)?d.renderbufferStorageMultisampleEXT(36161,Ce,q,A.width,A.height):r.renderbufferStorage(36161,q,A.width,A.height)}}r.bindRenderbuffer(36161,null)}function Ye(D,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,D),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),se(A.depthTexture,0);const ge=n.get(A.depthTexture).__webglTexture,ve=gt(A);if(A.depthTexture.format===bi)ct(A)?d.framebufferTexture2DMultisampleEXT(36160,36096,3553,ge,0,ve):r.framebufferTexture2D(36160,36096,3553,ge,0);else if(A.depthTexture.format===lr)ct(A)?d.framebufferTexture2DMultisampleEXT(36160,33306,3553,ge,0,ve):r.framebufferTexture2D(36160,33306,3553,ge,0);else throw new Error("Unknown depthTexture format")}function Qe(D){const A=n.get(D),te=D.isWebGLCubeRenderTarget===!0;if(D.depthTexture&&!A.__autoAllocateDepthBuffer){if(te)throw new Error("target.depthTexture not supported in Cube render targets");Ye(A.__webglFramebuffer,D)}else if(te){A.__webglDepthbuffer=[];for(let ge=0;ge<6;ge++)t.bindFramebuffer(36160,A.__webglFramebuffer[ge]),A.__webglDepthbuffer[ge]=r.createRenderbuffer(),je(A.__webglDepthbuffer[ge],D,!1)}else t.bindFramebuffer(36160,A.__webglFramebuffer),A.__webglDepthbuffer=r.createRenderbuffer(),je(A.__webglDepthbuffer,D,!1);t.bindFramebuffer(36160,null)}function St(D,A,te){const ge=n.get(D);A!==void 0&&Te(ge.__webglFramebuffer,D,D.texture,36064,3553),te!==void 0&&Qe(D)}function zt(D){const A=D.texture,te=n.get(D),ge=n.get(A);D.addEventListener("dispose",W),D.isWebGLMultipleRenderTargets!==!0&&(ge.__webglTexture===void 0&&(ge.__webglTexture=r.createTexture()),ge.__version=A.version,o.memory.textures++);const ve=D.isWebGLCubeRenderTarget===!0,Ee=D.isWebGLMultipleRenderTargets===!0,ze=b(D)||a;if(ve){te.__webglFramebuffer=[];for(let N=0;N<6;N++)te.__webglFramebuffer[N]=r.createFramebuffer()}else{if(te.__webglFramebuffer=r.createFramebuffer(),Ee)if(i.drawBuffers){const N=D.texture;for(let q=0,Ce=N.length;q<Ce;q++){const we=n.get(N[q]);we.__webglTexture===void 0&&(we.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&D.samples>0&&ct(D)===!1){const N=Ee?A:[A];te.__webglMultisampledFramebuffer=r.createFramebuffer(),te.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,te.__webglMultisampledFramebuffer);for(let q=0;q<N.length;q++){const Ce=N[q];te.__webglColorRenderbuffer[q]=r.createRenderbuffer(),r.bindRenderbuffer(36161,te.__webglColorRenderbuffer[q]);const we=s.convert(Ce.format,Ce.encoding),Le=s.convert(Ce.type),Ae=y(Ce.internalFormat,we,Le,Ce.encoding,D.isXRRenderTarget===!0),Oe=gt(D);r.renderbufferStorageMultisample(36161,Oe,Ae,D.width,D.height),r.framebufferRenderbuffer(36160,36064+q,36161,te.__webglColorRenderbuffer[q])}r.bindRenderbuffer(36161,null),D.depthBuffer&&(te.__webglDepthRenderbuffer=r.createRenderbuffer(),je(te.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(36160,null)}}if(ve){t.bindTexture(34067,ge.__webglTexture),ce(34067,A,ze);for(let N=0;N<6;N++)Te(te.__webglFramebuffer[N],D,A,36064,34069+N);E(A,ze)&&P(34067),t.unbindTexture()}else if(Ee){const N=D.texture;for(let q=0,Ce=N.length;q<Ce;q++){const we=N[q],Le=n.get(we);t.bindTexture(3553,Le.__webglTexture),ce(3553,we,ze),Te(te.__webglFramebuffer,D,we,36064+q,3553),E(we,ze)&&P(3553)}t.unbindTexture()}else{let N=3553;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(a?N=D.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(N,ge.__webglTexture),ce(N,A,ze),Te(te.__webglFramebuffer,D,A,36064,N),E(A,ze)&&P(N),t.unbindTexture()}D.depthBuffer&&Qe(D)}function Rt(D){const A=b(D)||a,te=D.isWebGLMultipleRenderTargets===!0?D.texture:[D.texture];for(let ge=0,ve=te.length;ge<ve;ge++){const Ee=te[ge];if(E(Ee,A)){const ze=D.isWebGLCubeRenderTarget?34067:3553,N=n.get(Ee).__webglTexture;t.bindTexture(ze,N),P(ze),t.unbindTexture()}}}function Dt(D){if(a&&D.samples>0&&ct(D)===!1){const A=D.isWebGLMultipleRenderTargets?D.texture:[D.texture],te=D.width,ge=D.height;let ve=16384;const Ee=[],ze=D.stencilBuffer?33306:36096,N=n.get(D),q=D.isWebGLMultipleRenderTargets===!0;if(q)for(let Ce=0;Ce<A.length;Ce++)t.bindFramebuffer(36160,N.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+Ce,36161,null),t.bindFramebuffer(36160,N.__webglFramebuffer),r.framebufferTexture2D(36009,36064+Ce,3553,null,0);t.bindFramebuffer(36008,N.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,N.__webglFramebuffer);for(let Ce=0;Ce<A.length;Ce++){Ee.push(36064+Ce),D.depthBuffer&&Ee.push(ze);const we=N.__ignoreDepthValues!==void 0?N.__ignoreDepthValues:!1;if(we===!1&&(D.depthBuffer&&(ve|=256),D.stencilBuffer&&(ve|=1024)),q&&r.framebufferRenderbuffer(36008,36064,36161,N.__webglColorRenderbuffer[Ce]),we===!0&&(r.invalidateFramebuffer(36008,[ze]),r.invalidateFramebuffer(36009,[ze])),q){const Le=n.get(A[Ce]).__webglTexture;r.framebufferTexture2D(36009,36064,3553,Le,0)}r.blitFramebuffer(0,0,te,ge,0,0,te,ge,ve,9728),m&&r.invalidateFramebuffer(36008,Ee)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),q)for(let Ce=0;Ce<A.length;Ce++){t.bindFramebuffer(36160,N.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+Ce,36161,N.__webglColorRenderbuffer[Ce]);const we=n.get(A[Ce]).__webglTexture;t.bindFramebuffer(36160,N.__webglFramebuffer),r.framebufferTexture2D(36009,36064+Ce,3553,we,0)}t.bindFramebuffer(36009,N.__webglMultisampledFramebuffer)}}function gt(D){return Math.min(h,D.samples)}function ct(D){const A=n.get(D);return a&&D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function on(D){const A=o.render.frame;v.get(D)!==A&&(v.set(D,A),D.update())}function Ht(D,A){const te=D.encoding,ge=D.format,ve=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||D.format===ll||te!==yn&&(te===He?a===!1?e.has("EXT_sRGB")===!0&&ge===sn?(D.format=ll,D.minFilter=Ve,D.generateMipmaps=!1):A=Bh.sRGBToLinear(A):(ge!==sn||ve!==Fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",te)),A}this.allocateTextureUnit=K,this.resetTextureUnits=ne,this.setTexture2D=se,this.setTexture2DArray=Me,this.setTexture3D=j,this.setTextureCube=le,this.rebindTextures=St,this.setupRenderTarget=zt,this.updateRenderTargetMipmap=Rt,this.updateMultisampleRenderTarget=Dt,this.setupDepthRenderbuffer=Qe,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=ct}function cx(r,e,t){const n=t.isWebGL2;function i(s,o=null){let a;if(s===Fn)return 5121;if(s===Gf)return 32819;if(s===Vf)return 32820;if(s===kf)return 5120;if(s===zf)return 5122;if(s===qo)return 5123;if(s===Bf)return 5124;if(s===ki)return 5125;if(s===ft)return 5126;if(s===bt)return n?5131:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Hf)return 6406;if(s===sn)return 6408;if(s===Wf)return 6409;if(s===jf)return 6410;if(s===bi)return 6402;if(s===lr)return 34041;if(s===ll)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Bo)return 6403;if(s===Xf)return 36244;if(s===qf)return 33319;if(s===Yf)return 33320;if(s===Zf)return 36249;if(s===ca||s===ua||s===ha||s===da)if(o===He)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===ca)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ua)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===ha)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===da)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===ca)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ua)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===ha)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===da)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===nc||s===ic||s===rc||s===sc)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===nc)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===ic)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===rc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===sc)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Kf)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===oc||s===ac)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===oc)return o===He?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===ac)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===lc||s===cc||s===uc||s===hc||s===dc||s===fc||s===pc||s===mc||s===gc||s===vc||s===xc||s===_c||s===yc||s===wc)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===lc)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===cc)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===uc)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===hc)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===dc)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===fc)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===pc)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===mc)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===gc)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===vc)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===xc)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===_c)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===yc)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===wc)return o===He?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===fa)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===fa)return o===He?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(s===Jf||s===bc||s===Mc||s===Sc)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===fa)return a.COMPRESSED_RED_RGTC1_EXT;if(s===bc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Mc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Sc)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===sr?n?34042:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class ux extends At{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}let fn=class extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}};const hx={type:"move"};class ka{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const p of e.hand.values()){const f=t.getJointPose(p,n),x=this._getHandJoint(c,p);f!==null&&(x.matrix.fromArray(f.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.jointRadius=f.radius),x.visible=f!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),m=.02,v=.005;c.inputState.pinching&&d>m+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=m-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(hx)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new fn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class as extends Ct{constructor(e,t,n,i,s,o,a,l,c,u){if(u=u!==void 0?u:bi,u!==bi&&u!==lr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===bi&&(n=ki),n===void 0&&u===lr&&(n=sr),super(null,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:it,this.minFilter=l!==void 0?l:it,this.flipY=!1,this.generateMipmaps=!1}}class dx extends Mi{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,m=null,v=null;const p=t.getContextAttributes();let f=null,x=null;const w=[],g=[],b=new Set,M=new Map,E=new At;E.layers.enable(1),E.viewport=new lt;const P=new At;P.layers.enable(2),P.viewport=new lt;const y=[E,P],T=new ux;T.layers.enable(1),T.layers.enable(2);let L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let le=w[j];return le===void 0&&(le=new ka,w[j]=le),le.getTargetRaySpace()},this.getControllerGrip=function(j){let le=w[j];return le===void 0&&(le=new ka,w[j]=le),le.getGripSpace()},this.getHand=function(j){let le=w[j];return le===void 0&&(le=new ka,w[j]=le),le.getHandSpace()};function W(j){const le=g.indexOf(j.inputSource);if(le===-1)return;const fe=w[le];fe!==void 0&&fe.dispatchEvent({type:j.type,data:j.inputSource})}function U(){i.removeEventListener("select",W),i.removeEventListener("selectstart",W),i.removeEventListener("selectend",W),i.removeEventListener("squeeze",W),i.removeEventListener("squeezestart",W),i.removeEventListener("squeezeend",W),i.removeEventListener("end",U),i.removeEventListener("inputsourceschange",F);for(let j=0;j<w.length;j++){const le=g[j];le!==null&&(g[j]=null,w[j].disconnect(le))}L=null,O=null,e.setRenderTarget(f),m=null,d=null,h=null,i=null,x=null,Me.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(f=e.getRenderTarget(),i.addEventListener("select",W),i.addEventListener("selectstart",W),i.addEventListener("selectend",W),i.addEventListener("squeeze",W),i.addEventListener("squeezestart",W),i.addEventListener("squeezeend",W),i.addEventListener("end",U),i.addEventListener("inputsourceschange",F),p.xrCompatible!==!0&&await t.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const le={antialias:i.renderState.layers===void 0?p.antialias:!0,alpha:p.alpha,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(i,t,le),i.updateRenderState({baseLayer:m}),x=new Ft(m.framebufferWidth,m.framebufferHeight,{format:sn,type:Fn,encoding:e.outputEncoding,stencilBuffer:p.stencil})}else{let le=null,fe=null,X=null;p.depth&&(X=p.stencil?35056:33190,le=p.stencil?lr:bi,fe=p.stencil?sr:ki);const ce={colorFormat:32856,depthFormat:X,scaleFactor:s};h=new XRWebGLBinding(i,t),d=h.createProjectionLayer(ce),i.updateRenderState({layers:[d]}),x=new Ft(d.textureWidth,d.textureHeight,{format:sn,type:Fn,depthTexture:new as(d.textureWidth,d.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,le),stencilBuffer:p.stencil,encoding:e.outputEncoding,samples:p.antialias?4:0});const xe=e.properties.get(x);xe.__ignoreDepthValues=d.ignoreDepthValues}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Me.setContext(i),Me.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function F(j){for(let le=0;le<j.removed.length;le++){const fe=j.removed[le],X=g.indexOf(fe);X>=0&&(g[X]=null,w[X].disconnect(fe))}for(let le=0;le<j.added.length;le++){const fe=j.added[le];let X=g.indexOf(fe);if(X===-1){for(let xe=0;xe<w.length;xe++)if(xe>=g.length){g.push(fe),X=xe;break}else if(g[xe]===null){g[xe]=fe,X=xe;break}if(X===-1)break}const ce=w[X];ce&&ce.connect(fe)}}const V=new I,$=new I;function ne(j,le,fe){V.setFromMatrixPosition(le.matrixWorld),$.setFromMatrixPosition(fe.matrixWorld);const X=V.distanceTo($),ce=le.projectionMatrix.elements,xe=fe.projectionMatrix.elements,Se=ce[14]/(ce[10]-1),ye=ce[14]/(ce[10]+1),Te=(ce[9]+1)/ce[5],je=(ce[9]-1)/ce[5],Ye=(ce[8]-1)/ce[0],Qe=(xe[8]+1)/xe[0],St=Se*Ye,zt=Se*Qe,Rt=X/(-Ye+Qe),Dt=Rt*-Ye;le.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Dt),j.translateZ(Rt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert();const gt=Se+Rt,ct=ye+Rt,on=St-Dt,Ht=zt+(X-Dt),D=Te*ye/ct*gt,A=je*ye/ct*gt;j.projectionMatrix.makePerspective(on,Ht,D,A,gt,ct)}function K(j,le){le===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(le.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;T.near=P.near=E.near=j.near,T.far=P.far=E.far=j.far,(L!==T.near||O!==T.far)&&(i.updateRenderState({depthNear:T.near,depthFar:T.far}),L=T.near,O=T.far);const le=j.parent,fe=T.cameras;K(T,le);for(let ce=0;ce<fe.length;ce++)K(fe[ce],le);T.matrixWorld.decompose(T.position,T.quaternion,T.scale),j.matrix.copy(T.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale);const X=j.children;for(let ce=0,xe=X.length;ce<xe;ce++)X[ce].updateMatrixWorld(!0);fe.length===2?ne(T,E,P):T.projectionMatrix.copy(E.projectionMatrix)},this.getCamera=function(){return T},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=j)},this.getPlanes=function(){return b};let ee=null;function se(j,le){if(u=le.getViewerPose(c||o),v=le,u!==null){const fe=u.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let X=!1;fe.length!==T.cameras.length&&(T.cameras.length=0,X=!0);for(let ce=0;ce<fe.length;ce++){const xe=fe[ce];let Se=null;if(m!==null)Se=m.getViewport(xe);else{const Te=h.getViewSubImage(d,xe);Se=Te.viewport,ce===0&&(e.setRenderTargetTextures(x,Te.colorTexture,d.ignoreDepthValues?void 0:Te.depthStencilTexture),e.setRenderTarget(x))}let ye=y[ce];ye===void 0&&(ye=new At,ye.layers.enable(ce),ye.viewport=new lt,y[ce]=ye),ye.matrix.fromArray(xe.transform.matrix),ye.projectionMatrix.fromArray(xe.projectionMatrix),ye.viewport.set(Se.x,Se.y,Se.width,Se.height),ce===0&&T.matrix.copy(ye.matrix),X===!0&&T.cameras.push(ye)}}for(let fe=0;fe<w.length;fe++){const X=g[fe],ce=w[fe];X!==null&&ce!==void 0&&ce.update(X,le,c||o)}if(ee&&ee(j,le),le.detectedPlanes){n.dispatchEvent({type:"planesdetected",data:le.detectedPlanes});let fe=null;for(const X of b)le.detectedPlanes.has(X)||(fe===null&&(fe=[]),fe.push(X));if(fe!==null)for(const X of fe)b.delete(X),M.delete(X),n.dispatchEvent({type:"planeremoved",data:X});for(const X of le.detectedPlanes)if(!b.has(X))b.add(X),M.set(X,le.lastChangedTime),n.dispatchEvent({type:"planeadded",data:X});else{const ce=M.get(X);X.lastChangedTime>ce&&(M.set(X,X.lastChangedTime),n.dispatchEvent({type:"planechanged",data:X}))}}v=null}const Me=new Yh;Me.setAnimationLoop(se),this.setAnimationLoop=function(j){ee=j},this.dispose=function(){}}}function fx(r,e){function t(p,f){f.color.getRGB(p.fogColor.value,Xh(r)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function n(p,f,x,w,g){f.isMeshBasicMaterial||f.isMeshLambertMaterial?i(p,f):f.isMeshToonMaterial?(i(p,f),u(p,f)):f.isMeshPhongMaterial?(i(p,f),c(p,f)):f.isMeshStandardMaterial?(i(p,f),h(p,f),f.isMeshPhysicalMaterial&&d(p,f,g)):f.isMeshMatcapMaterial?(i(p,f),m(p,f)):f.isMeshDepthMaterial?i(p,f):f.isMeshDistanceMaterial?(i(p,f),v(p,f)):f.isMeshNormalMaterial?i(p,f):f.isLineBasicMaterial?(s(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?a(p,f,x,w):f.isSpriteMaterial?l(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function i(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map),f.alphaMap&&(p.alphaMap.value=f.alphaMap),f.bumpMap&&(p.bumpMap.value=f.bumpMap,p.bumpScale.value=f.bumpScale,f.side===Ut&&(p.bumpScale.value*=-1)),f.displacementMap&&(p.displacementMap.value=f.displacementMap,p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap),f.normalMap&&(p.normalMap.value=f.normalMap,p.normalScale.value.copy(f.normalScale),f.side===Ut&&p.normalScale.value.negate()),f.specularMap&&(p.specularMap.value=f.specularMap),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const x=e.get(f).envMap;if(x&&(p.envMap.value=x,p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap){p.lightMap.value=f.lightMap;const b=r.useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=f.lightMapIntensity*b}f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity);let w;f.map?w=f.map:f.specularMap?w=f.specularMap:f.displacementMap?w=f.displacementMap:f.normalMap?w=f.normalMap:f.bumpMap?w=f.bumpMap:f.roughnessMap?w=f.roughnessMap:f.metalnessMap?w=f.metalnessMap:f.alphaMap?w=f.alphaMap:f.emissiveMap?w=f.emissiveMap:f.clearcoatMap?w=f.clearcoatMap:f.clearcoatNormalMap?w=f.clearcoatNormalMap:f.clearcoatRoughnessMap?w=f.clearcoatRoughnessMap:f.iridescenceMap?w=f.iridescenceMap:f.iridescenceThicknessMap?w=f.iridescenceThicknessMap:f.specularIntensityMap?w=f.specularIntensityMap:f.specularColorMap?w=f.specularColorMap:f.transmissionMap?w=f.transmissionMap:f.thicknessMap?w=f.thicknessMap:f.sheenColorMap?w=f.sheenColorMap:f.sheenRoughnessMap&&(w=f.sheenRoughnessMap),w!==void 0&&(w.isWebGLRenderTarget&&(w=w.texture),w.matrixAutoUpdate===!0&&w.updateMatrix(),p.uvTransform.value.copy(w.matrix));let g;f.aoMap?g=f.aoMap:f.lightMap&&(g=f.lightMap),g!==void 0&&(g.isWebGLRenderTarget&&(g=g.texture),g.matrixAutoUpdate===!0&&g.updateMatrix(),p.uv2Transform.value.copy(g.matrix))}function s(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function a(p,f,x,w){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*x,p.scale.value=w*.5,f.map&&(p.map.value=f.map),f.alphaMap&&(p.alphaMap.value=f.alphaMap),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);let g;f.map?g=f.map:f.alphaMap&&(g=f.alphaMap),g!==void 0&&(g.matrixAutoUpdate===!0&&g.updateMatrix(),p.uvTransform.value.copy(g.matrix))}function l(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map),f.alphaMap&&(p.alphaMap.value=f.alphaMap),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);let x;f.map?x=f.map:f.alphaMap&&(x=f.alphaMap),x!==void 0&&(x.matrixAutoUpdate===!0&&x.updateMatrix(),p.uvTransform.value.copy(x.matrix))}function c(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function u(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function h(p,f){p.roughness.value=f.roughness,p.metalness.value=f.metalness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap),f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap),e.get(f).envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function d(p,f,x){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap)),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap),f.clearcoatNormalMap&&(p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),p.clearcoatNormalMap.value=f.clearcoatNormalMap,f.side===Ut&&p.clearcoatNormalScale.value.negate())),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap)),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap)}function m(p,f){f.matcap&&(p.matcap.value=f.matcap)}function v(p,f){p.referencePosition.value.copy(f.referencePosition),p.nearDistance.value=f.nearDistance,p.farDistance.value=f.farDistance}return{refreshFogUniforms:t,refreshMaterialUniforms:n}}function px(r,e,t,n){let i={},s={},o=[];const a=t.isWebGL2?r.getParameter(35375):0;function l(w,g){const b=g.program;n.uniformBlockBinding(w,b)}function c(w,g){let b=i[w.id];b===void 0&&(v(w),b=u(w),i[w.id]=b,w.addEventListener("dispose",f));const M=g.program;n.updateUBOMapping(w,M);const E=e.render.frame;s[w.id]!==E&&(d(w),s[w.id]=E)}function u(w){const g=h();w.__bindingPointIndex=g;const b=r.createBuffer(),M=w.__size,E=w.usage;return r.bindBuffer(35345,b),r.bufferData(35345,M,E),r.bindBuffer(35345,null),r.bindBufferBase(35345,g,b),b}function h(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){const g=i[w.id],b=w.uniforms,M=w.__cache;r.bindBuffer(35345,g);for(let E=0,P=b.length;E<P;E++){const y=b[E];if(m(y,E,M)===!0){const T=y.__offset,L=Array.isArray(y.value)?y.value:[y.value];let O=0;for(let W=0;W<L.length;W++){const U=L[W],F=p(U);typeof U=="number"?(y.__data[0]=U,r.bufferSubData(35345,T+O,y.__data)):U.isMatrix3?(y.__data[0]=U.elements[0],y.__data[1]=U.elements[1],y.__data[2]=U.elements[2],y.__data[3]=U.elements[0],y.__data[4]=U.elements[3],y.__data[5]=U.elements[4],y.__data[6]=U.elements[5],y.__data[7]=U.elements[0],y.__data[8]=U.elements[6],y.__data[9]=U.elements[7],y.__data[10]=U.elements[8],y.__data[11]=U.elements[0]):(U.toArray(y.__data,O),O+=F.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(35345,T,y.__data)}}r.bindBuffer(35345,null)}function m(w,g,b){const M=w.value;if(b[g]===void 0){if(typeof M=="number")b[g]=M;else{const E=Array.isArray(M)?M:[M],P=[];for(let y=0;y<E.length;y++)P.push(E[y].clone());b[g]=P}return!0}else if(typeof M=="number"){if(b[g]!==M)return b[g]=M,!0}else{const E=Array.isArray(b[g])?b[g]:[b[g]],P=Array.isArray(M)?M:[M];for(let y=0;y<E.length;y++){const T=E[y];if(T.equals(P[y])===!1)return T.copy(P[y]),!0}}return!1}function v(w){const g=w.uniforms;let b=0;const M=16;let E=0;for(let P=0,y=g.length;P<y;P++){const T=g[P],L={boundary:0,storage:0},O=Array.isArray(T.value)?T.value:[T.value];for(let W=0,U=O.length;W<U;W++){const F=O[W],V=p(F);L.boundary+=V.boundary,L.storage+=V.storage}if(T.__data=new Float32Array(L.storage/Float32Array.BYTES_PER_ELEMENT),T.__offset=b,P>0){E=b%M;const W=M-E;E!==0&&W-L.boundary<0&&(b+=M-E,T.__offset=b)}b+=L.storage}return E=b%M,E>0&&(b+=M-E),w.__size=b,w.__cache={},this}function p(w){const g={boundary:0,storage:0};return typeof w=="number"?(g.boundary=4,g.storage=4):w.isVector2?(g.boundary=8,g.storage=8):w.isVector3||w.isColor?(g.boundary=16,g.storage=12):w.isVector4?(g.boundary=16,g.storage=16):w.isMatrix3?(g.boundary=48,g.storage=48):w.isMatrix4?(g.boundary=64,g.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),g}function f(w){const g=w.target;g.removeEventListener("dispose",f);const b=o.indexOf(g.__bindingPointIndex);o.splice(b,1),r.deleteBuffer(i[g.id]),delete i[g.id],delete s[g.id]}function x(){for(const w in i)r.deleteBuffer(i[w]);o=[],i={},s={}}return{bind:l,update:c,dispose:x}}function mx(){const r=Ws("canvas");return r.style.display="block",r}function mr(r={}){this.isWebGLRenderer=!0;const e=r.canvas!==void 0?r.canvas:mx(),t=r.context!==void 0?r.context:null,n=r.depth!==void 0?r.depth:!0,i=r.stencil!==void 0?r.stencil:!0,s=r.antialias!==void 0?r.antialias:!1,o=r.premultipliedAlpha!==void 0?r.premultipliedAlpha:!0,a=r.preserveDrawingBuffer!==void 0?r.preserveDrawingBuffer:!1,l=r.powerPreference!==void 0?r.powerPreference:"default",c=r.failIfMajorPerformanceCaveat!==void 0?r.failIfMajorPerformanceCaveat:!1;let u;t!==null?u=t.getContextAttributes().alpha:u=r.alpha!==void 0?r.alpha:!1;let h=null,d=null;const m=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=yn,this.useLegacyLights=!0,this.toneMapping=Zn,this.toneMappingExposure=1;const p=this;let f=!1,x=0,w=0,g=null,b=-1,M=null;const E=new lt,P=new lt;let y=null,T=e.width,L=e.height,O=1,W=null,U=null;const F=new lt(0,0,T,L),V=new lt(0,0,T,L);let $=!1;const ne=new Ul;let K=!1,ee=!1,se=null;const Me=new Ue,j=new I,le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function fe(){return g===null?O:1}let X=t;function ce(C,Y){for(let Q=0;Q<C.length;Q++){const k=C[Q],ie=e.getContext(k,Y);if(ie!==null)return ie}return null}try{const C={alpha:!0,depth:n,stencil:i,antialias:s,premultipliedAlpha:o,preserveDrawingBuffer:a,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${jo}`),e.addEventListener("webglcontextlost",Le,!1),e.addEventListener("webglcontextrestored",Ae,!1),e.addEventListener("webglcontextcreationerror",Oe,!1),X===null){const Y=["webgl2","webgl","experimental-webgl"];if(p.isWebGL1Renderer===!0&&Y.shift(),X=ce(Y,C),X===null)throw ce(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}X.getShaderPrecisionFormat===void 0&&(X.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let xe,Se,ye,Te,je,Ye,Qe,St,zt,Rt,Dt,gt,ct,on,Ht,D,A,te,ge,ve,Ee,ze,N,q;function Ce(){xe=new C0(X),Se=new b0(X,xe,r),xe.init(Se),ze=new cx(X,xe,Se),ye=new ax(X,xe,Se),Te=new D0,je=new Yv,Ye=new lx(X,xe,ye,je,Se,ze,Te),Qe=new S0(p),St=new A0(p),zt=new Bp(X,Se),N=new y0(X,xe,zt,Se),Rt=new P0(X,zt,Te,N),Dt=new F0(X,Rt,zt,Te),ge=new N0(X,Se,Ye),D=new M0(je),gt=new qv(p,Qe,St,xe,Se,N,D),ct=new fx(p,je),on=new Kv,Ht=new nx(xe,Se),te=new _0(p,Qe,St,ye,Dt,u,o),A=new ox(p,Dt,Se),q=new px(X,Te,Se,ye),ve=new w0(X,xe,Te,Se),Ee=new R0(X,xe,Te,Se),Te.programs=gt.programs,p.capabilities=Se,p.extensions=xe,p.properties=je,p.renderLists=on,p.shadowMap=A,p.state=ye,p.info=Te}Ce();const we=new dx(p,X);this.xr=we,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const C=xe.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=xe.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(C){C!==void 0&&(O=C,this.setSize(T,L,!1))},this.getSize=function(C){return C.set(T,L)},this.setSize=function(C,Y,Q=!0){if(we.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}T=C,L=Y,e.width=Math.floor(C*O),e.height=Math.floor(Y*O),Q===!0&&(e.style.width=C+"px",e.style.height=Y+"px"),this.setViewport(0,0,C,Y)},this.getDrawingBufferSize=function(C){return C.set(T*O,L*O).floor()},this.setDrawingBufferSize=function(C,Y,Q){T=C,L=Y,O=Q,e.width=Math.floor(C*Q),e.height=Math.floor(Y*Q),this.setViewport(0,0,C,Y)},this.getCurrentViewport=function(C){return C.copy(E)},this.getViewport=function(C){return C.copy(F)},this.setViewport=function(C,Y,Q,k){C.isVector4?F.set(C.x,C.y,C.z,C.w):F.set(C,Y,Q,k),ye.viewport(E.copy(F).multiplyScalar(O).floor())},this.getScissor=function(C){return C.copy(V)},this.setScissor=function(C,Y,Q,k){C.isVector4?V.set(C.x,C.y,C.z,C.w):V.set(C,Y,Q,k),ye.scissor(P.copy(V).multiplyScalar(O).floor())},this.getScissorTest=function(){return $},this.setScissorTest=function(C){ye.setScissorTest($=C)},this.setOpaqueSort=function(C){W=C},this.setTransparentSort=function(C){U=C},this.getClearColor=function(C){return C.copy(te.getClearColor())},this.setClearColor=function(){te.setClearColor.apply(te,arguments)},this.getClearAlpha=function(){return te.getClearAlpha()},this.setClearAlpha=function(){te.setClearAlpha.apply(te,arguments)},this.clear=function(C=!0,Y=!0,Q=!0){let k=0;C&&(k|=16384),Y&&(k|=256),Q&&(k|=1024),X.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Le,!1),e.removeEventListener("webglcontextrestored",Ae,!1),e.removeEventListener("webglcontextcreationerror",Oe,!1),on.dispose(),Ht.dispose(),je.dispose(),Qe.dispose(),St.dispose(),Dt.dispose(),N.dispose(),q.dispose(),gt.dispose(),we.dispose(),we.removeEventListener("sessionstart",ue),we.removeEventListener("sessionend",Pe),se&&(se.dispose(),se=null),Ie.stop()};function Le(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),f=!0}function Ae(){console.log("THREE.WebGLRenderer: Context Restored."),f=!1;const C=Te.autoReset,Y=A.enabled,Q=A.autoUpdate,k=A.needsUpdate,ie=A.type;Ce(),Te.autoReset=C,A.enabled=Y,A.autoUpdate=Q,A.needsUpdate=k,A.type=ie}function Oe(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Ze(C){const Y=C.target;Y.removeEventListener("dispose",Ze),Xe(Y)}function Xe(C){qe(C),je.remove(C)}function qe(C){const Y=je.get(C).programs;Y!==void 0&&(Y.forEach(function(Q){gt.releaseProgram(Q)}),C.isShaderMaterial&&gt.releaseShaderCache(C))}this.renderBufferDirect=function(C,Y,Q,k,ie,Be){Y===null&&(Y=le);const _=ie.isMesh&&ie.matrixWorld.determinant()<0,S=oa(C,Y,Q,k,ie);ye.setMaterial(k,_);let R=Q.index,z=1;k.wireframe===!0&&(R=Rt.getWireframeAttribute(Q),z=2);const Z=Q.drawRange,H=Q.attributes.position;let re=Z.start*z,he=(Z.start+Z.count)*z;Be!==null&&(re=Math.max(re,Be.start*z),he=Math.min(he,(Be.start+Be.count)*z)),R!==null?(re=Math.max(re,0),he=Math.min(he,R.count)):H!=null&&(re=Math.max(re,0),he=Math.min(he,H.count));const me=he-re;if(me<0||me===1/0)return;N.setup(ie,k,S,Q,R);let oe,ae=ve;if(R!==null&&(oe=zt.get(R),ae=Ee,ae.setIndex(oe)),ie.isMesh)k.wireframe===!0?(ye.setLineWidth(k.wireframeLinewidth*fe()),ae.setMode(1)):ae.setMode(4);else if(ie.isLine){let de=k.linewidth;de===void 0&&(de=1),ye.setLineWidth(de*fe()),ie.isLineSegments?ae.setMode(1):ie.isLineLoop?ae.setMode(2):ae.setMode(3)}else ie.isPoints?ae.setMode(0):ie.isSprite&&ae.setMode(4);if(ie.isInstancedMesh)ae.renderInstances(re,me,ie.count);else if(Q.isInstancedBufferGeometry){const de=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,De=Math.min(Q.instanceCount,de);ae.renderInstances(re,me,De)}else ae.render(re,me)},this.compile=function(C,Y){function Q(k,ie,Be){k.transparent===!0&&k.side===dn&&k.forceSinglePass===!1?(k.side=Ut,k.needsUpdate=!0,mn(k,ie,Be),k.side=li,k.needsUpdate=!0,mn(k,ie,Be),k.side=dn):mn(k,ie,Be)}d=Ht.get(C),d.init(),v.push(d),C.traverseVisible(function(k){k.isLight&&k.layers.test(Y.layers)&&(d.pushLight(k),k.castShadow&&d.pushShadow(k))}),d.setupLights(p.useLegacyLights),C.traverse(function(k){const ie=k.material;if(ie)if(Array.isArray(ie))for(let Be=0;Be<ie.length;Be++){const _=ie[Be];Q(_,C,k)}else Q(ie,C,k)}),v.pop(),d=null};let G=null;function B(C){G&&G(C)}function ue(){Ie.stop()}function Pe(){Ie.start()}const Ie=new Yh;Ie.setAnimationLoop(B),typeof self<"u"&&Ie.setContext(self),this.setAnimationLoop=function(C){G=C,we.setAnimationLoop(C),C===null?Ie.stop():Ie.start()},we.addEventListener("sessionstart",ue),we.addEventListener("sessionend",Pe),this.render=function(C,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(f===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),we.enabled===!0&&we.isPresenting===!0&&(we.cameraAutoUpdate===!0&&we.updateCamera(Y),Y=we.getCamera()),C.isScene===!0&&C.onBeforeRender(p,C,Y,g),d=Ht.get(C,v.length),d.init(),v.push(d),Me.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),ne.setFromProjectionMatrix(Me),ee=this.localClippingEnabled,K=D.init(this.clippingPlanes,ee),h=on.get(C,m.length),h.init(),m.push(h),ut(C,Y,0,p.sortObjects),h.finish(),p.sortObjects===!0&&h.sort(W,U),K===!0&&D.beginShadows();const Q=d.state.shadowsArray;if(A.render(Q,C,Y),K===!0&&D.endShadows(),this.info.autoReset===!0&&this.info.reset(),te.render(h,C),d.setupLights(p.useLegacyLights),Y.isArrayCamera){const k=Y.cameras;for(let ie=0,Be=k.length;ie<Be;ie++){const _=k[ie];Lt(h,C,_,_.viewport)}}else Lt(h,C,Y);g!==null&&(Ye.updateMultisampleRenderTarget(g),Ye.updateRenderTargetMipmap(g)),C.isScene===!0&&C.onAfterRender(p,C,Y),N.resetDefaultState(),b=-1,M=null,v.pop(),v.length>0?d=v[v.length-1]:d=null,m.pop(),m.length>0?h=m[m.length-1]:h=null};function ut(C,Y,Q,k){if(C.visible===!1)return;if(C.layers.test(Y.layers)){if(C.isGroup)Q=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(Y);else if(C.isLight)d.pushLight(C),C.castShadow&&d.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||ne.intersectsSprite(C)){k&&j.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Me);const _=Dt.update(C),S=C.material;S.visible&&h.push(C,_,S,Q,j.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(C.isSkinnedMesh&&C.skeleton.frame!==Te.render.frame&&(C.skeleton.update(),C.skeleton.frame=Te.render.frame),!C.frustumCulled||ne.intersectsObject(C))){k&&j.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Me);const _=Dt.update(C),S=C.material;if(Array.isArray(S)){const R=_.groups;for(let z=0,Z=R.length;z<Z;z++){const H=R[z],re=S[H.materialIndex];re&&re.visible&&h.push(C,_,re,Q,j.z,H)}}else S.visible&&h.push(C,_,S,Q,j.z,null)}}const Be=C.children;for(let _=0,S=Be.length;_<S;_++)ut(Be[_],Y,Q,k)}function Lt(C,Y,Q,k){const ie=C.opaque,Be=C.transmissive,_=C.transparent;d.setupLightsView(Q),K===!0&&D.setGlobalState(p.clippingPlanes,Q),Be.length>0&&Wt(ie,Y,Q),k&&ye.viewport(E.copy(k)),ie.length>0&&An(ie,Y,Q),Be.length>0&&An(Be,Y,Q),_.length>0&&An(_,Y,Q),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function Wt(C,Y,Q){const k=Se.isWebGL2;se===null&&(se=new Ft(1024,1024,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")?bt:Fn,minFilter:Gi,samples:k&&s===!0?4:0}));const ie=p.getRenderTarget();p.setRenderTarget(se),p.clear();const Be=p.toneMapping;p.toneMapping=Zn,An(C,Y,Q),p.toneMapping=Be,Ye.updateMultisampleRenderTarget(se),Ye.updateRenderTargetMipmap(se),p.setRenderTarget(ie)}function An(C,Y,Q){const k=Y.isScene===!0?Y.overrideMaterial:null;for(let ie=0,Be=C.length;ie<Be;ie++){const _=C[ie],S=_.object,R=_.geometry,z=k===null?_.material:k,Z=_.group;S.layers.test(Q.layers)&&wt(S,Y,Q,R,z,Z)}}function wt(C,Y,Q,k,ie,Be){C.onBeforeRender(p,Y,Q,k,ie,Be),C.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),ie.onBeforeRender(p,Y,Q,k,C,Be),ie.transparent===!0&&ie.side===dn&&ie.forceSinglePass===!1?(ie.side=Ut,ie.needsUpdate=!0,p.renderBufferDirect(Q,Y,k,ie,C,Be),ie.side=li,ie.needsUpdate=!0,p.renderBufferDirect(Q,Y,k,ie,C,Be),ie.side=dn):p.renderBufferDirect(Q,Y,k,ie,C,Be),C.onAfterRender(p,Y,Q,k,ie,Be)}function mn(C,Y,Q){Y.isScene!==!0&&(Y=le);const k=je.get(C),ie=d.state.lights,Be=d.state.shadowsArray,_=ie.state.version,S=gt.getParameters(C,ie.state,Be,Y,Q),R=gt.getProgramCacheKey(S);let z=k.programs;k.environment=C.isMeshStandardMaterial?Y.environment:null,k.fog=Y.fog,k.envMap=(C.isMeshStandardMaterial?St:Qe).get(C.envMap||k.environment),z===void 0&&(C.addEventListener("dispose",Ze),z=new Map,k.programs=z);let Z=z.get(R);if(Z!==void 0){if(k.currentProgram===Z&&k.lightsStateVersion===_)return Cn(C,S),Z}else S.uniforms=gt.getUniforms(C),C.onBuild(Q,S,p),C.onBeforeCompile(S,p),Z=gt.acquireProgram(S,R),z.set(R,Z),k.uniforms=S.uniforms;const H=k.uniforms;(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(H.clippingPlanes=D.uniform),Cn(C,S),k.needsLights=vr(C),k.lightsStateVersion=_,k.needsLights&&(H.ambientLightColor.value=ie.state.ambient,H.lightProbe.value=ie.state.probe,H.directionalLights.value=ie.state.directional,H.directionalLightShadows.value=ie.state.directionalShadow,H.spotLights.value=ie.state.spot,H.spotLightShadows.value=ie.state.spotShadow,H.rectAreaLights.value=ie.state.rectArea,H.ltc_1.value=ie.state.rectAreaLTC1,H.ltc_2.value=ie.state.rectAreaLTC2,H.pointLights.value=ie.state.point,H.pointLightShadows.value=ie.state.pointShadow,H.hemisphereLights.value=ie.state.hemi,H.directionalShadowMap.value=ie.state.directionalShadowMap,H.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,H.spotShadowMap.value=ie.state.spotShadowMap,H.spotLightMatrix.value=ie.state.spotLightMatrix,H.spotLightMap.value=ie.state.spotLightMap,H.pointShadowMap.value=ie.state.pointShadowMap,H.pointShadowMatrix.value=ie.state.pointShadowMatrix);const re=Z.getUniforms(),he=Oo.seqWithValue(re.seq,H);return k.currentProgram=Z,k.uniformsList=he,Z}function Cn(C,Y){const Q=je.get(C);Q.outputEncoding=Y.outputEncoding,Q.instancing=Y.instancing,Q.skinning=Y.skinning,Q.morphTargets=Y.morphTargets,Q.morphNormals=Y.morphNormals,Q.morphColors=Y.morphColors,Q.morphTargetsCount=Y.morphTargetsCount,Q.numClippingPlanes=Y.numClippingPlanes,Q.numIntersection=Y.numClipIntersection,Q.vertexAlphas=Y.vertexAlphas,Q.vertexTangents=Y.vertexTangents,Q.toneMapping=Y.toneMapping}function oa(C,Y,Q,k,ie){Y.isScene!==!0&&(Y=le),Ye.resetTextureUnits();const Be=Y.fog,_=k.isMeshStandardMaterial?Y.environment:null,S=g===null?p.outputEncoding:g.isXRRenderTarget===!0?g.texture.encoding:yn,R=(k.isMeshStandardMaterial?St:Qe).get(k.envMap||_),z=k.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Z=!!k.normalMap&&!!Q.attributes.tangent,H=!!Q.morphAttributes.position,re=!!Q.morphAttributes.normal,he=!!Q.morphAttributes.color,me=k.toneMapped?p.toneMapping:Zn,oe=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,ae=oe!==void 0?oe.length:0,de=je.get(k),De=d.state.lights;if(K===!0&&(ee===!0||C!==M)){const Je=C===M&&k.id===b;D.setState(k,C,Je)}let Re=!1;k.version===de.__version?(de.needsLights&&de.lightsStateVersion!==De.state.version||de.outputEncoding!==S||ie.isInstancedMesh&&de.instancing===!1||!ie.isInstancedMesh&&de.instancing===!0||ie.isSkinnedMesh&&de.skinning===!1||!ie.isSkinnedMesh&&de.skinning===!0||de.envMap!==R||k.fog===!0&&de.fog!==Be||de.numClippingPlanes!==void 0&&(de.numClippingPlanes!==D.numPlanes||de.numIntersection!==D.numIntersection)||de.vertexAlphas!==z||de.vertexTangents!==Z||de.morphTargets!==H||de.morphNormals!==re||de.morphColors!==he||de.toneMapping!==me||Se.isWebGL2===!0&&de.morphTargetsCount!==ae)&&(Re=!0):(Re=!0,de.__version=k.version);let We=de.currentProgram;Re===!0&&(We=mn(k,Y,ie));let Fe=!1,ke=!1,Ke=!1;const $e=We.getUniforms(),st=de.uniforms;if(ye.useProgram(We.program)&&(Fe=!0,ke=!0,Ke=!0),k.id!==b&&(b=k.id,ke=!0),Fe||M!==C){if($e.setValue(X,"projectionMatrix",C.projectionMatrix),Se.logarithmicDepthBuffer&&$e.setValue(X,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),M!==C&&(M=C,ke=!0,Ke=!0),k.isShaderMaterial||k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshStandardMaterial||k.envMap){const Je=$e.map.cameraPosition;Je!==void 0&&Je.setValue(X,j.setFromMatrixPosition(C.matrixWorld))}(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&$e.setValue(X,"isOrthographic",C.isOrthographicCamera===!0),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial||k.isShadowMaterial||ie.isSkinnedMesh)&&$e.setValue(X,"viewMatrix",C.matrixWorldInverse)}if(ie.isSkinnedMesh){$e.setOptional(X,ie,"bindMatrix"),$e.setOptional(X,ie,"bindMatrixInverse");const Je=ie.skeleton;Je&&(Se.floatVertexTextures?(Je.boneTexture===null&&Je.computeBoneTexture(),$e.setValue(X,"boneTexture",Je.boneTexture,Ye),$e.setValue(X,"boneTextureSize",Je.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const jt=Q.morphAttributes;if((jt.position!==void 0||jt.normal!==void 0||jt.color!==void 0&&Se.isWebGL2===!0)&&ge.update(ie,Q,We),(ke||de.receiveShadow!==ie.receiveShadow)&&(de.receiveShadow=ie.receiveShadow,$e.setValue(X,"receiveShadow",ie.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(st.envMap.value=R,st.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1),ke&&($e.setValue(X,"toneMappingExposure",p.toneMappingExposure),de.needsLights&&aa(st,Ke),Be&&k.fog===!0&&ct.refreshFogUniforms(st,Be),ct.refreshMaterialUniforms(st,k,O,L,se),Oo.upload(X,de.uniformsList,st,Ye)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Oo.upload(X,de.uniformsList,st,Ye),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&$e.setValue(X,"center",ie.center),$e.setValue(X,"modelViewMatrix",ie.modelViewMatrix),$e.setValue(X,"normalMatrix",ie.normalMatrix),$e.setValue(X,"modelMatrix",ie.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Je=k.uniformsGroups;for(let et=0,Tt=Je.length;et<Tt;et++)if(Se.isWebGL2){const an=Je[et];q.update(an,We),q.bind(an,We)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return We}function aa(C,Y){C.ambientLightColor.needsUpdate=Y,C.lightProbe.needsUpdate=Y,C.directionalLights.needsUpdate=Y,C.directionalLightShadows.needsUpdate=Y,C.pointLights.needsUpdate=Y,C.pointLightShadows.needsUpdate=Y,C.spotLights.needsUpdate=Y,C.spotLightShadows.needsUpdate=Y,C.rectAreaLights.needsUpdate=Y,C.hemisphereLights.needsUpdate=Y}function vr(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return x},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return g},this.setRenderTargetTextures=function(C,Y,Q){je.get(C.texture).__webglTexture=Y,je.get(C.depthTexture).__webglTexture=Q;const k=je.get(C);k.__hasExternalTextures=!0,k.__hasExternalTextures&&(k.__autoAllocateDepthBuffer=Q===void 0,k.__autoAllocateDepthBuffer||xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,Y){const Q=je.get(C);Q.__webglFramebuffer=Y,Q.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(C,Y=0,Q=0){g=C,x=Y,w=Q;let k=!0,ie=null,Be=!1,_=!1;if(C){const R=je.get(C);R.__useDefaultFramebuffer!==void 0?(ye.bindFramebuffer(36160,null),k=!1):R.__webglFramebuffer===void 0?Ye.setupRenderTarget(C):R.__hasExternalTextures&&Ye.rebindTextures(C,je.get(C.texture).__webglTexture,je.get(C.depthTexture).__webglTexture);const z=C.texture;(z.isData3DTexture||z.isDataArrayTexture||z.isCompressedArrayTexture)&&(_=!0);const Z=je.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(ie=Z[Y],Be=!0):Se.isWebGL2&&C.samples>0&&Ye.useMultisampledRTT(C)===!1?ie=je.get(C).__webglMultisampledFramebuffer:ie=Z,E.copy(C.viewport),P.copy(C.scissor),y=C.scissorTest}else E.copy(F).multiplyScalar(O).floor(),P.copy(V).multiplyScalar(O).floor(),y=$;if(ye.bindFramebuffer(36160,ie)&&Se.drawBuffers&&k&&ye.drawBuffers(C,ie),ye.viewport(E),ye.scissor(P),ye.setScissorTest(y),Be){const R=je.get(C.texture);X.framebufferTexture2D(36160,36064,34069+Y,R.__webglTexture,Q)}else if(_){const R=je.get(C.texture),z=Y||0;X.framebufferTextureLayer(36160,36064,R.__webglTexture,Q||0,z)}b=-1},this.readRenderTargetPixels=function(C,Y,Q,k,ie,Be,_){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let S=je.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&_!==void 0&&(S=S[_]),S){ye.bindFramebuffer(36160,S);try{const R=C.texture,z=R.format,Z=R.type;if(z!==sn&&ze.convert(z)!==X.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const H=Z===bt&&(xe.has("EXT_color_buffer_half_float")||Se.isWebGL2&&xe.has("EXT_color_buffer_float"));if(Z!==Fn&&ze.convert(Z)!==X.getParameter(35738)&&!(Z===ft&&(Se.isWebGL2||xe.has("OES_texture_float")||xe.has("WEBGL_color_buffer_float")))&&!H){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=C.width-k&&Q>=0&&Q<=C.height-ie&&X.readPixels(Y,Q,k,ie,ze.convert(z),ze.convert(Z),Be)}finally{const R=g!==null?je.get(g).__webglFramebuffer:null;ye.bindFramebuffer(36160,R)}}},this.copyFramebufferToTexture=function(C,Y,Q=0){const k=Math.pow(2,-Q),ie=Math.floor(Y.image.width*k),Be=Math.floor(Y.image.height*k);Ye.setTexture2D(Y,0),X.copyTexSubImage2D(3553,Q,0,0,C.x,C.y,ie,Be),ye.unbindTexture()},this.copyTextureToTexture=function(C,Y,Q,k=0){const ie=Y.image.width,Be=Y.image.height,_=ze.convert(Q.format),S=ze.convert(Q.type);Ye.setTexture2D(Q,0),X.pixelStorei(37440,Q.flipY),X.pixelStorei(37441,Q.premultiplyAlpha),X.pixelStorei(3317,Q.unpackAlignment),Y.isDataTexture?X.texSubImage2D(3553,k,C.x,C.y,ie,Be,_,S,Y.image.data):Y.isCompressedTexture?X.compressedTexSubImage2D(3553,k,C.x,C.y,Y.mipmaps[0].width,Y.mipmaps[0].height,_,Y.mipmaps[0].data):X.texSubImage2D(3553,k,C.x,C.y,_,S,Y.image),k===0&&Q.generateMipmaps&&X.generateMipmap(3553),ye.unbindTexture()},this.copyTextureToTexture3D=function(C,Y,Q,k,ie=0){if(p.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Be=C.max.x-C.min.x+1,_=C.max.y-C.min.y+1,S=C.max.z-C.min.z+1,R=ze.convert(k.format),z=ze.convert(k.type);let Z;if(k.isData3DTexture)Ye.setTexture3D(k,0),Z=32879;else if(k.isDataArrayTexture)Ye.setTexture2DArray(k,0),Z=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}X.pixelStorei(37440,k.flipY),X.pixelStorei(37441,k.premultiplyAlpha),X.pixelStorei(3317,k.unpackAlignment);const H=X.getParameter(3314),re=X.getParameter(32878),he=X.getParameter(3316),me=X.getParameter(3315),oe=X.getParameter(32877),ae=Q.isCompressedTexture?Q.mipmaps[0]:Q.image;X.pixelStorei(3314,ae.width),X.pixelStorei(32878,ae.height),X.pixelStorei(3316,C.min.x),X.pixelStorei(3315,C.min.y),X.pixelStorei(32877,C.min.z),Q.isDataTexture||Q.isData3DTexture?X.texSubImage3D(Z,ie,Y.x,Y.y,Y.z,Be,_,S,R,z,ae.data):Q.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),X.compressedTexSubImage3D(Z,ie,Y.x,Y.y,Y.z,Be,_,S,R,ae.data)):X.texSubImage3D(Z,ie,Y.x,Y.y,Y.z,Be,_,S,R,z,ae),X.pixelStorei(3314,H),X.pixelStorei(32878,re),X.pixelStorei(3316,he),X.pixelStorei(3315,me),X.pixelStorei(32877,oe),ie===0&&k.generateMipmaps&&X.generateMipmap(Z),ye.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?Ye.setTextureCube(C,0):C.isData3DTexture?Ye.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Ye.setTexture2DArray(C,0):Ye.setTexture2D(C,0),ye.unbindTexture()},this.resetState=function(){x=0,w=0,g=null,ye.reset(),N.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}Object.defineProperties(mr.prototype,{physicallyCorrectLights:{get:function(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights},set:function(r){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!r}}});class gx extends mr{}gx.prototype.isWebGL1Renderer=!0;class Hi extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class vx{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=al,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const cn=new I;class zl{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyMatrix4(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyNormalMatrix(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.transformDirection(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),i=dt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),i=dt(i,this.array),s=dt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Mt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new zl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const au=new I,lu=new lt,cu=new lt,xx=new I,uu=new Ue;class _x extends pe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new Ue,this.bindMatrixInverse=new Ue}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new lt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}boneTransform(e,t){const n=this.skeleton,i=this.geometry;lu.fromBufferAttribute(i.attributes.skinIndex,e),cu.fromBufferAttribute(i.attributes.skinWeight,e),au.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=cu.getComponent(s);if(o!==0){const a=lu.getComponent(s);uu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(xx.copy(au).applyMatrix4(uu),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class ed extends pt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class qr extends Ct{constructor(e=null,t=1,n=1,i,s,o,a,l,c=it,u=it,h,d){super(null,o,a,l,c,u,i,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const hu=new Ue,yx=new Ue;class Bl{constructor(e=[],t=[]){this.uuid=Kn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:yx;hu.multiplyMatrices(a,t[s]),hu.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Bl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Oh(e),e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new qr(t,e,e,sn,ft);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this.boneTextureSize=e,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new ed),this.bones.push(o),this.boneInverses.push(new Ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.5,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class du extends Mt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const fu=new Ue,pu=new Ue,Ao=[],wx=new Ue,_s=new pe;class bx extends pe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new du(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.frustumCulled=!1;for(let i=0;i<n;i++)this.setMatrixAt(i,wx)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(_s.geometry=this.geometry,_s.material=this.material,_s.material!==void 0)for(let s=0;s<i;s++){this.getMatrixAt(s,fu),pu.multiplyMatrices(n,fu),_s.matrixWorld=pu,_s.raycast(e,Ao);for(let o=0,a=Ao.length;o<a;o++){const l=Ao[o];l.instanceId=s,l.object=this,t.push(l)}Ao.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new du(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Jo extends En{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const mu=new I,gu=new I,vu=new Ue,za=new Yo,Co=new ss;class Hn extends pt{constructor(e=new Pt,t=new Jo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)mu.fromBufferAttribute(t,i-1),gu.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=mu.distanceTo(gu);e.setAttribute("lineDistance",new mt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Co.copy(n.boundingSphere),Co.applyMatrix4(i),Co.radius+=s,e.ray.intersectsSphere(Co)===!1)return;vu.copy(i).invert(),za.copy(e.ray).applyMatrix4(vu);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new I,u=new I,h=new I,d=new I,m=this.isLineSegments?2:1,v=n.index,f=n.attributes.position;if(v!==null){const x=Math.max(0,o.start),w=Math.min(v.count,o.start+o.count);for(let g=x,b=w-1;g<b;g+=m){const M=v.getX(g),E=v.getX(g+1);if(c.fromBufferAttribute(f,M),u.fromBufferAttribute(f,E),za.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const y=e.ray.origin.distanceTo(d);y<e.near||y>e.far||t.push({distance:y,point:h.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}else{const x=Math.max(0,o.start),w=Math.min(f.count,o.start+o.count);for(let g=x,b=w-1;g<b;g+=m){if(c.fromBufferAttribute(f,g),u.fromBufferAttribute(f,g+1),za.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const E=e.ray.origin.distanceTo(d);E<e.near||E>e.far||t.push({distance:E,point:h.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const xu=new I,_u=new I;class td extends Hn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)xu.fromBufferAttribute(t,i),_u.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+xu.distanceTo(_u);e.setAttribute("lineDistance",new mt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Mx extends Hn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class nd extends En{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const yu=new Ue,hl=new Yo,Po=new ss,Ro=new I;class Sx extends pt{constructor(e=new Pt,t=new nd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Po.copy(n.boundingSphere),Po.applyMatrix4(i),Po.radius+=s,e.ray.intersectsSphere(Po)===!1)return;yu.copy(i).invert(),hl.copy(e.ray).applyMatrix4(yu);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let v=d,p=m;v<p;v++){const f=c.getX(v);Ro.fromBufferAttribute(h,f),wu(Ro,f,l,i,e,t,this)}}else{const d=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let v=d,p=m;v<p;v++)Ro.fromBufferAttribute(h,v),wu(Ro,v,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function wu(r,e,t,n,i,s,o){const a=hl.distanceSqToPoint(r);if(a<t){const l=new I;hl.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class Tx extends Ct{constructor(e,t,n){super({width:e,height:t}),this.isFramebufferTexture=!0,this.format=n,this.magFilter=it,this.minFilter=it,this.generateMipmaps=!1,this.needsUpdate=!0}}class Qo extends Pt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new I,u=new _e;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const m=n+h/t*i;c.x=e*Math.cos(m),c.y=e*Math.sin(m),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[d]/e+1)/2,u.y=(o[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new mt(o,3)),this.setAttribute("normal",new mt(a,3)),this.setAttribute("uv",new mt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qo(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Xt extends Pt{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],h=[],d=[],m=[];let v=0;const p=[],f=n/2;let x=0;w(),o===!1&&(e>0&&g(!0),t>0&&g(!1)),this.setIndex(u),this.setAttribute("position",new mt(h,3)),this.setAttribute("normal",new mt(d,3)),this.setAttribute("uv",new mt(m,2));function w(){const b=new I,M=new I;let E=0;const P=(t-e)/n;for(let y=0;y<=s;y++){const T=[],L=y/s,O=L*(t-e)+e;for(let W=0;W<=i;W++){const U=W/i,F=U*l+a,V=Math.sin(F),$=Math.cos(F);M.x=O*V,M.y=-L*n+f,M.z=O*$,h.push(M.x,M.y,M.z),b.set(V,P,$).normalize(),d.push(b.x,b.y,b.z),m.push(U,1-L),T.push(v++)}p.push(T)}for(let y=0;y<i;y++)for(let T=0;T<s;T++){const L=p[T][y],O=p[T+1][y],W=p[T+1][y+1],U=p[T][y+1];u.push(L,O,U),u.push(O,W,U),E+=6}c.addGroup(x,E,0),x+=E}function g(b){const M=v,E=new _e,P=new I;let y=0;const T=b===!0?e:t,L=b===!0?1:-1;for(let W=1;W<=i;W++)h.push(0,f*L,0),d.push(0,L,0),m.push(.5,.5),v++;const O=v;for(let W=0;W<=i;W++){const F=W/i*l+a,V=Math.cos(F),$=Math.sin(F);P.x=T*$,P.y=f*L,P.z=T*V,h.push(P.x,P.y,P.z),d.push(0,L,0),E.x=V*.5+.5,E.y=$*.5*L+.5,m.push(E.x,E.y),v++}for(let W=0;W<i;W++){const U=M+W,F=O+W;b===!0?u.push(F,F+1,U):u.push(F+1,F,U),y+=3}c.addGroup(x,y,b===!0?1:2),x+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $o extends Pt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];a(i),c(n),u(),this.setAttribute("position",new mt(s,3)),this.setAttribute("normal",new mt(s.slice(),3)),this.setAttribute("uv",new mt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(w){const g=new I,b=new I,M=new I;for(let E=0;E<t.length;E+=3)m(t[E+0],g),m(t[E+1],b),m(t[E+2],M),l(g,b,M,w)}function l(w,g,b,M){const E=M+1,P=[];for(let y=0;y<=E;y++){P[y]=[];const T=w.clone().lerp(b,y/E),L=g.clone().lerp(b,y/E),O=E-y;for(let W=0;W<=O;W++)W===0&&y===E?P[y][W]=T:P[y][W]=T.clone().lerp(L,W/O)}for(let y=0;y<E;y++)for(let T=0;T<2*(E-y)-1;T++){const L=Math.floor(T/2);T%2===0?(d(P[y][L+1]),d(P[y+1][L]),d(P[y][L])):(d(P[y][L+1]),d(P[y+1][L+1]),d(P[y+1][L]))}}function c(w){const g=new I;for(let b=0;b<s.length;b+=3)g.x=s[b+0],g.y=s[b+1],g.z=s[b+2],g.normalize().multiplyScalar(w),s[b+0]=g.x,s[b+1]=g.y,s[b+2]=g.z}function u(){const w=new I;for(let g=0;g<s.length;g+=3){w.x=s[g+0],w.y=s[g+1],w.z=s[g+2];const b=f(w)/2/Math.PI+.5,M=x(w)/Math.PI+.5;o.push(b,1-M)}v(),h()}function h(){for(let w=0;w<o.length;w+=6){const g=o[w+0],b=o[w+2],M=o[w+4],E=Math.max(g,b,M),P=Math.min(g,b,M);E>.9&&P<.1&&(g<.2&&(o[w+0]+=1),b<.2&&(o[w+2]+=1),M<.2&&(o[w+4]+=1))}}function d(w){s.push(w.x,w.y,w.z)}function m(w,g){const b=w*3;g.x=e[b+0],g.y=e[b+1],g.z=e[b+2]}function v(){const w=new I,g=new I,b=new I,M=new I,E=new _e,P=new _e,y=new _e;for(let T=0,L=0;T<s.length;T+=9,L+=6){w.set(s[T+0],s[T+1],s[T+2]),g.set(s[T+3],s[T+4],s[T+5]),b.set(s[T+6],s[T+7],s[T+8]),E.set(o[L+0],o[L+1]),P.set(o[L+2],o[L+3]),y.set(o[L+4],o[L+5]),M.copy(w).add(g).add(b).divideScalar(3);const O=f(M);p(E,L+0,w,O),p(P,L+2,g,O),p(y,L+4,b,O)}}function p(w,g,b,M){M<0&&w.x===1&&(o[g]=w.x-1),b.x===0&&b.z===0&&(o[g]=M/2/Math.PI+.5)}function f(w){return Math.atan2(w.z,-w.x)}function x(w){return Math.atan2(-w.y,Math.sqrt(w.x*w.x+w.z*w.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $o(e.vertices,e.indices,e.radius,e.details)}}class Gl extends $o{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Gl(e.radius,e.detail)}}class Vr extends $o{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Vr(e.radius,e.detail)}}class Wi extends Pt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new I,d=new I,m=[],v=[],p=[],f=[];for(let x=0;x<=n;x++){const w=[],g=x/n;let b=0;x==0&&o==0?b=.5/t:x==n&&l==Math.PI&&(b=-.5/t);for(let M=0;M<=t;M++){const E=M/t;h.x=-e*Math.cos(i+E*s)*Math.sin(o+g*a),h.y=e*Math.cos(o+g*a),h.z=e*Math.sin(i+E*s)*Math.sin(o+g*a),v.push(h.x,h.y,h.z),d.copy(h).normalize(),p.push(d.x,d.y,d.z),f.push(E+b,1-g),w.push(c++)}u.push(w)}for(let x=0;x<n;x++)for(let w=0;w<t;w++){const g=u[x][w+1],b=u[x][w],M=u[x+1][w],E=u[x+1][w+1];(x!==0||o>0)&&m.push(g,b,E),(x!==n-1||l<Math.PI)&&m.push(b,M,E)}this.setIndex(m),this.setAttribute("position",new mt(v,3)),this.setAttribute("normal",new mt(p,3)),this.setAttribute("uv",new mt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class rr extends Pt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],u=new I,h=new I,d=new I;for(let m=0;m<=n;m++)for(let v=0;v<=i;v++){const p=v/i*s,f=m/n*Math.PI*2;h.x=(e+t*Math.cos(f))*Math.cos(p),h.y=(e+t*Math.cos(f))*Math.sin(p),h.z=t*Math.sin(f),a.push(h.x,h.y,h.z),u.x=e*Math.cos(p),u.y=e*Math.sin(p),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(v/i),c.push(m/n)}for(let m=1;m<=n;m++)for(let v=1;v<=i;v++){const p=(i+1)*m+v-1,f=(i+1)*(m-1)+v-1,x=(i+1)*(m-1)+v,w=(i+1)*m+v;o.push(p,f,w),o.push(f,x,w)}this.setIndex(o),this.setAttribute("position",new mt(a,3)),this.setAttribute("normal",new mt(l,3)),this.setAttribute("uv",new mt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class id extends En{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ne(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Kt extends En{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Il,this.normalScale=new _e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Si extends Kt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new _e(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Yt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ne(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._iridescence=0,this._transmission=0,this.setValues(e)}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function Pi(r,e,t){return rd(r)?new r.constructor(r.subarray(e,t!==void 0?t:r.length)):r.slice(e,t)}function Do(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function rd(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Ex(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function bu(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function sd(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class $s{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Ax extends $s{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Tc,endingEnd:Tc}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ec:s=e,a=2*t-n;break;case Ac:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ec:o=e,l=2*n-t;break;case Ac:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,m=this._weightNext,v=(n-t)/(i-t),p=v*v,f=p*v,x=-d*f+2*d*p-d*v,w=(1+d)*f+(-1.5-2*d)*p+(-.5+d)*v+1,g=(-1-m)*f+(1.5+m)*p+.5*v,b=m*f-m*p;for(let M=0;M!==a;++M)s[M]=x*o[u+M]+w*o[c+M]+g*o[l+M]+b*o[h+M];return s}}class Cx extends $s{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==a;++d)s[d]=o[c+d]*h+o[l+d]*u;return s}}class Px extends $s{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class ui{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Do(t,this.TimeBufferType),this.values=Do(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Do(e.times,Array),values:Do(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Px(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Cx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ax(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Vs:t=this.InterpolantFactoryMethodDiscrete;break;case Jr:t=this.InterpolantFactoryMethodLinear;break;case pa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Vs;case this.InterpolantFactoryMethodLinear:return Jr;case this.InterpolantFactoryMethodSmooth:return pa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=Pi(n,s,o),this.values=Pi(this.values,s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&rd(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=Pi(this.times),t=Pi(this.values),n=this.getValueSize(),i=this.getInterpolation()===pa,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const h=a*n,d=h-n,m=h+n;for(let v=0;v!==n;++v){const p=t[h+v];if(p!==t[d+v]||p!==t[m+v]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const h=a*n,d=o*n;for(let m=0;m!==n;++m)t[d+m]=t[h+m]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=Pi(e,0,o),this.values=Pi(t,0,o*n)):(this.times=e,this.values=t),this}clone(){const e=Pi(this.times,0),t=Pi(this.values,0),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}ui.prototype.TimeBufferType=Float32Array;ui.prototype.ValueBufferType=Float32Array;ui.prototype.DefaultInterpolation=Jr;class ls extends ui{}ls.prototype.ValueTypeName="bool";ls.prototype.ValueBufferType=Array;ls.prototype.DefaultInterpolation=Vs;ls.prototype.InterpolantFactoryMethodLinear=void 0;ls.prototype.InterpolantFactoryMethodSmooth=void 0;class od extends ui{}od.prototype.ValueTypeName="color";class js extends ui{}js.prototype.ValueTypeName="number";class Rx extends $s{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)Et.slerpFlat(s,0,o,c-a,o,c,l);return s}}class hr extends ui{InterpolantFactoryMethodLinear(e){return new Rx(this.times,this.values,this.getValueSize(),e)}}hr.prototype.ValueTypeName="quaternion";hr.prototype.DefaultInterpolation=Jr;hr.prototype.InterpolantFactoryMethodSmooth=void 0;class cs extends ui{}cs.prototype.ValueTypeName="string";cs.prototype.ValueBufferType=Array;cs.prototype.DefaultInterpolation=Vs;cs.prototype.InterpolantFactoryMethodLinear=void 0;cs.prototype.InterpolantFactoryMethodSmooth=void 0;class Xs extends ui{}Xs.prototype.ValueTypeName="vector";class Dx{constructor(e,t=-1,n,i=Qf){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Kn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Ix(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(ui.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=Ex(l);l=bu(l,1,u),c=bu(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new js(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const h=u[1];let d=i[h];d||(i[h]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,m,v,p){if(m.length!==0){const f=[],x=[];sd(m,f,x,v),f.length!==0&&p.push(new h(d,f,x))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const m={};let v;for(v=0;v<d.length;v++)if(d[v].morphTargets)for(let p=0;p<d[v].morphTargets.length;p++)m[d[v].morphTargets[p]]=-1;for(const p in m){const f=[],x=[];for(let w=0;w!==d[v].morphTargets.length;++w){const g=d[v];f.push(g.time),x.push(g.morphTarget===p?1:0)}i.push(new js(".morphTargetInfluence["+p+"]",f,x))}l=m.length*o}else{const m=".bones["+t[h].name+"]";n(Xs,m+".position",d,"pos",i),n(hr,m+".quaternion",d,"rot",i),n(Xs,m+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Lx(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return js;case"vector":case"vector2":case"vector3":case"vector4":return Xs;case"color":return od;case"quaternion":return hr;case"bool":case"boolean":return ls;case"string":return cs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Ix(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Lx(r.type);if(r.times===void 0){const t=[],n=[];sd(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const ts={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Nx{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const m=c[h],v=c[h+1];if(m.global&&(m.lastIndex=0),m.test(u))return v}return null}}}const Fx=new Nx;class gr{constructor(e){this.manager=e!==void 0?e:Fx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const vi={};class Ux extends Error{constructor(e,t){super(e),this.response=t}}class qs extends gr{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ts.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(vi[e]!==void 0){vi[e].push({onLoad:t,onProgress:n,onError:i});return}vi[e]=[],vi[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=vi[e],h=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),m=d?parseInt(d):0,v=m!==0;let p=0;const f=new ReadableStream({start(x){w();function w(){h.read().then(({done:g,value:b})=>{if(g)x.close();else{p+=b.byteLength;const M=new ProgressEvent("progress",{lengthComputable:v,loaded:p,total:m});for(let E=0,P=u.length;E<P;E++){const y=u[E];y.onProgress&&y.onProgress(M)}x.enqueue(b),w()}})}}});return new Response(f)}else throw new Ux(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),d=h&&h[1]?h[1].toLowerCase():void 0,m=new TextDecoder(d);return c.arrayBuffer().then(v=>m.decode(v))}}}).then(c=>{ts.add(e,c);const u=vi[e];delete vi[e];for(let h=0,d=u.length;h<d;h++){const m=u[h];m.onLoad&&m.onLoad(c)}}).catch(c=>{const u=vi[e];if(u===void 0)throw this.manager.itemError(e),c;delete vi[e];for(let h=0,d=u.length;h<d;h++){const m=u[h];m.onError&&m.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Ox extends gr{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ts.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Ws("img");function l(){u(),ts.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(h){u(),i&&i(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class ad extends gr{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new qr,a=new qs(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(s.withCredentials),a.load(e,function(l){const c=s.parse(l);c&&(c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:xn,o.wrapT=c.wrapT!==void 0?c.wrapT:xn,o.magFilter=c.magFilter!==void 0?c.magFilter:Ve,o.minFilter=c.minFilter!==void 0?c.minFilter:Ve,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.encoding!==void 0&&(o.encoding=c.encoding),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=Gi),c.mipmapCount===1&&(o.minFilter=Ve),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,t&&t(o,c))},n,i),o}}class ji extends gr{constructor(e){super(e)}load(e,t,n,i){const s=new Ct,o=new Ox(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class ea extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Ba=new Ue,Mu=new I,Su=new I;class Vl{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _e(512,512),this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ul,this._frameExtents=new _e(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Mu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mu),Su.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Su),t.updateMatrixWorld(),Ba.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ba),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ba)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class kx extends Vl{constructor(){super(new At(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Hs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class ld extends ea{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new kx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Tu=new Ue,ys=new I,Ga=new I;class zx extends Vl{constructor(){super(new At(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new _e(4,2),this._viewportCount=6,this._viewports=[new lt(2,1,1,1),new lt(0,1,1,1),new lt(3,1,1,1),new lt(1,1,1,1),new lt(3,0,1,1),new lt(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ys.setFromMatrixPosition(e.matrixWorld),n.position.copy(ys),Ga.copy(n.position),Ga.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ga),n.updateMatrixWorld(),i.makeTranslation(-ys.x,-ys.y,-ys.z),Tu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tu)}}class Bx extends ea{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new zx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Gx extends Vl{constructor(){super(new Ol(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class eo extends ea{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new Gx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class cd extends ea{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class dl{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Vx extends gr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ts.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){ts.add(e,l),t&&t(l),s.manager.itemEnd(e)}).catch(function(l){i&&i(l),s.manager.itemError(e),s.manager.itemEnd(e)}),s.manager.itemStart(e)}}class ud{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Eu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Eu();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Eu(){return(typeof performance>"u"?Date:performance).now()}const Hl="\\[\\]\\.:\\/",Hx=new RegExp("["+Hl+"]","g"),Wl="[^"+Hl+"]",Wx="[^"+Hl.replace("\\.","")+"]",jx=/((?:WC+[\/:])*)/.source.replace("WC",Wl),Xx=/(WCOD+)?/.source.replace("WCOD",Wx),qx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wl),Yx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wl),Zx=new RegExp("^"+jx+Xx+qx+Yx+"$"),Kx=["material","materials","bones","map"];class Jx{constructor(e,t,n){const i=n||at.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class at{constructor(e,t,n){this.path=t,this.parsedPath=n||at.parseTrackName(t),this.node=at.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new at.Composite(e,t,n):new at(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Hx,"")}static parseTrackName(e){const t=Zx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Kx.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=at.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}at.Composite=Jx;at.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};at.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};at.prototype.GetterByBindingType=[at.prototype._getValue_direct,at.prototype._getValue_array,at.prototype._getValue_arrayElement,at.prototype._getValue_toArray];at.prototype.SetterByBindingTypeAndVersioning=[[at.prototype._setValue_direct,at.prototype._setValue_direct_setNeedsUpdate,at.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[at.prototype._setValue_array,at.prototype._setValue_array_setNeedsUpdate,at.prototype._setValue_array_setMatrixWorldNeedsUpdate],[at.prototype._setValue_arrayElement,at.prototype._setValue_arrayElement_setNeedsUpdate,at.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[at.prototype._setValue_fromArray,at.prototype._setValue_fromArray_setNeedsUpdate,at.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class J{constructor(e){this.value=e}clone(){return new J(this.value.clone===void 0?this.value:this.value.clone())}}class us{constructor(e,t,n=0,i=1/0){this.ray=new Yo(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Fl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return fl(e,this,n,t),n.sort(Au),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)fl(e[i],this,n,t);return n.sort(Au),n}}function Au(r,e){return r.distance-e.distance}function fl(r,e,t,n){if(r.layers.test(e.layers)&&r.raycast(e,t),n===!0){const i=r.children;for(let s=0,o=i.length;s<o;s++)fl(i[s],e,t,!0)}}class Cu{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Yt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Pu=new I;class Qx extends pt{constructor(e,t){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new Pt,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,l=32;o<l;o++,a++){const c=o/l*Math.PI*2,u=a/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(u),Math.sin(u),1)}n.setAttribute("position",new mt(i,3));const s=new Jo({fog:!1,toneMapped:!1});this.cone=new td(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),Pu.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Pu),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const yi=$x();function $x(){const r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;!(c&8388608);)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[l]=c|u}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:o,offsetTable:a}}function e_(r){Math.abs(r)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),r=Yt(r,-65504,65504),yi.floatView[0]=r;const e=yi.uint32View[0],t=e>>23&511;return yi.baseTable[t]+((e&8388607)>>yi.shiftTable[t])}function t_(r){const e=r>>10;return yi.uint32View[0]=yi.mantissaTable[yi.offsetTable[e]+(r&1023)]+yi.exponentTable[e],yi.floatView[0]}const Hr={toHalfFloat:e_,fromHalfFloat:t_};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:jo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=jo);function Ru(r,e){if(e===$f)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===ol||e===Nh){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===ol)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class to extends gr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new o_(t)}),this.register(function(t){return new f_(t)}),this.register(function(t){return new p_(t)}),this.register(function(t){return new m_(t)}),this.register(function(t){return new l_(t)}),this.register(function(t){return new c_(t)}),this.register(function(t){return new u_(t)}),this.register(function(t){return new h_(t)}),this.register(function(t){return new s_(t)}),this.register(function(t){return new d_(t)}),this.register(function(t){return new a_(t)}),this.register(function(t){return new i_(t)}),this.register(function(t){return new g_(t)}),this.register(function(t){return new v_(t)})}load(e,t,n,i){const s=this;let o;this.resourcePath!==""?o=this.resourcePath:this.path!==""?o=this.path:o=dl.extractUrlBase(e),this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new qs(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===hd){try{o[nt.KHR_BINARY_GLTF]=new x_(e)}catch(h){i&&i(h);return}s=JSON.parse(o[nt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new D_(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](c);a[h.name]=h,o[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const h=s.extensionsUsed[u],d=s.extensionsRequired||[];switch(h){case nt.KHR_MATERIALS_UNLIT:o[h]=new r_;break;case nt.KHR_DRACO_MESH_COMPRESSION:o[h]=new __(s,this.dracoLoader);break;case nt.KHR_TEXTURE_TRANSFORM:o[h]=new y_;break;case nt.KHR_MESH_QUANTIZATION:o[h]=new w_;break;default:d.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function n_(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const nt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class i_{constructor(e){this.parser=e,this.name=nt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new Ne(16777215);l.color!==void 0&&u.fromArray(l.color);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new eo(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Bx(u),c.distance=h;break;case"spot":c=new ld(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Fi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class r_{constructor(){this.name=nt.KHR_MATERIALS_UNLIT}getMaterialType(){return oi}extendParams(e,t,n){const i=[];e.color=new Ne(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.fromArray(o),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,He))}return Promise.all(i)}}class s_{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class o_{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new _e(a,a)}return Promise.all(s)}}class a_{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class l_{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Ne(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];return o.sheenColorFactor!==void 0&&t.sheenColor.fromArray(o.sheenColorFactor),o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,He)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class c_{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class u_{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ne(a[0],a[1],a[2]),Promise.all(s)}}class h_{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class d_{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Si}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ne(a[0],a[1],a[2]),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,He)),Promise.all(s)}}class f_{constructor(e){this.parser=e,this.name=nt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class p_{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class m_{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class g_{constructor(e){this.name=nt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,h=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,d,i.mode,i.filter).then(function(m){return m.buffer}):o.ready.then(function(){const m=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(m),u,h,d,i.mode,i.filter),m})})}else return null}}class v_{constructor(e){this.name=nt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Dn.TRIANGLES&&c.mode!==Dn.TRIANGLE_STRIP&&c.mode!==Dn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,m=[];for(const v of h){const p=new Ue,f=new I,x=new Et,w=new I(1,1,1),g=new bx(v.geometry,v.material,d);for(let b=0;b<d;b++)l.TRANSLATION&&f.fromBufferAttribute(l.TRANSLATION,b),l.ROTATION&&x.fromBufferAttribute(l.ROTATION,b),l.SCALE&&w.fromBufferAttribute(l.SCALE,b),g.setMatrixAt(b,p.compose(f,x,w));for(const b in l)b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"&&v.geometry.setAttribute(b,l[b]);pt.prototype.copy.call(g,v),g.frustumCulled=!1,this.parser.assignFinalMaterial(g),m.push(g)}return u.isGroup?(u.clear(),u.add(...m),u):m[0]}))}}const hd="glTF",ws=12,Du={JSON:1313821514,BIN:5130562};class x_{constructor(e){this.name=nt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ws),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==hd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ws,s=new DataView(e,ws);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===Du.JSON){const c=new Uint8Array(e,ws+o,a);this.content=n.decode(c)}else if(l===Du.BIN){const c=ws+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class __{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=nt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const h=pl[u]||u.toLowerCase();a[h]=o[u]}for(const u in e.attributes){const h=pl[u]||u.toLowerCase();if(o[u]!==void 0){const d=n.accessors[e.attributes[u]],m=Yr[d.componentType];c[h]=m.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h){i.decodeDracoFile(u,function(d){for(const m in d.attributes){const v=d.attributes[m],p=l[m];p!==void 0&&(v.normalized=p)}h(d)},a,c)})})}}class y_{constructor(){this.name=nt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return t.texCoord!==void 0&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class w_{constructor(){this.name=nt.KHR_MESH_QUANTIZATION}}class dd extends $s{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,h=(n-t)/u,d=h*h,m=d*h,v=e*c,p=v-c,f=-2*m+3*d,x=m-d,w=1-f,g=x-d+h;for(let b=0;b!==a;b++){const M=o[p+b+a],E=o[p+b+l]*u,P=o[v+b+a],y=o[v+b]*u;s[b]=w*M+g*E+f*P+x*y}return s}}const b_=new Et;class M_ extends dd{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return b_.fromArray(s).normalize().toArray(s),s}}const Dn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Yr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Lu={9728:it,9729:Ve,9984:sl,9985:Ih,9986:Uo,9987:Gi},Iu={33071:xn,33648:zo,10497:_n},Va={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},pl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ri={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},S_={CUBICSPLINE:void 0,LINEAR:Jr,STEP:Vs},Ha={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function T_(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Kt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:li})),r.DefaultMaterial}function bs(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Fi(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function E_(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const h=e[c];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):r.attributes.position;o.push(d)}if(i){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):r.attributes.normal;a.push(d)}if(s){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],d=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=h),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function A_(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function C_(r){const e=r.extensions&&r.extensions[nt.KHR_DRACO_MESH_COMPRESSION];let t;return e?t="draco:"+e.bufferView+":"+e.indices+":"+Nu(e.attributes):t=r.indices+":"+Nu(r.attributes)+":"+r.mode,t}function Nu(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function ml(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function P_(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const R_=new Ue;class D_{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new n_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new ji(this.options.manager):this.textureLoader=new Vx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new qs(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};bs(s,a,i),Fi(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[nt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(dl.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Va[i.type],a=Yr[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Mt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=Va[i.type],c=Yr[i.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=i.byteOffset||0,m=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,v=i.normalized===!0;let p,f;if(m&&m!==h){const x=Math.floor(d/m),w="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+x+":"+i.count;let g=t.cache.get(w);g||(p=new c(a,x*m,i.count*m/u),g=new vx(p,m/u),t.cache.add(w,g)),f=new zl(g,l,d%m/u,v)}else a===null?p=new c(i.count*l):p=new c(a,d,i.count*l),f=new Mt(p,l,v);if(i.sparse!==void 0){const x=Va.SCALAR,w=Yr[i.sparse.indices.componentType],g=i.sparse.indices.byteOffset||0,b=i.sparse.values.byteOffset||0,M=new w(o[1],g,i.sparse.count*x),E=new c(o[2],b,i.sparse.count*l);a!==null&&(f=new Mt(f.array.slice(),f.itemSize,f.normalized));for(let P=0,y=M.length;P<y;P++){const T=M[P];if(f.setX(T,E[P*l]),l>=2&&f.setY(T,E[P*l+1]),l>=3&&f.setZ(T,E[P*l+2]),l>=4&&f.setW(T,E[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return f})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"";const d=(s.samplers||{})[o.sampler]||{};return u.magFilter=Lu[d.magFilter]||Ve,u.minFilter=Lu[d.minFilter]||Gi,u.wrapS=Iu[d.wrapS]||_n,u.wrapT=Iu[d.wrapT]||_n,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(h){c=!0;const d=new Blob([h],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(h){return new Promise(function(d,m){let v=d;t.isImageBitmapLoader===!0&&(v=function(p){const f=new Ct(p);f.needsUpdate=!0,d(f)}),t.load(dl.resolveURL(h,s.path),v,void 0,m)})}).then(function(h){return c===!0&&a.revokeObjectURL(l),h.userData.mimeType=o.mimeType||P_(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord!=0&&!(t==="aoMap"&&n.texCoord==1)&&console.warn("THREE.GLTFLoader: Custom UV set "+n.texCoord+" for texture "+t+" not yet supported."),s.extensions[nt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[nt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[nt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.encoding=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new nd,En.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Jo,En.prototype.copy.call(l,n),l.color.copy(n.color),this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}n.aoMap&&t.attributes.uv2===void 0&&t.attributes.uv!==void 0&&t.setAttribute("uv2",t.attributes.uv),e.material=n}getMaterialType(){return Kt}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[nt.KHR_MATERIALS_UNLIT]){const h=i[nt.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),c.push(h.extendParams(a,s,t))}else{const h=s.pbrMetallicRoughness||{};if(a.color=new Ne(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;a.color.fromArray(d),a.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",h.baseColorTexture,He)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=dn);const u=s.alphaMode||Ha.OPAQUE;if(u===Ha.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Ha.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==oi&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new _e(1,1),s.normalTexture.scale!==void 0)){const h=s.normalTexture.scale;a.normalScale.set(h,h)}return s.occlusionTexture!==void 0&&o!==oi&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==oi&&(a.emissive=new Ne().fromArray(s.emissiveFactor)),s.emissiveTexture!==void 0&&o!==oi&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,He)),Promise.all(c).then(function(){const h=new o(a);return s.name&&(h.name=s.name),Fi(h,s),t.associations.set(h,{materials:e}),s.extensions&&bs(i,h,s),h})}createUniqueName(e){const t=at.sanitizeNodeName(e||"");let n=t;for(let i=1;this.nodeNamesUsed[n];++i)n=t+"_"+i;return this.nodeNamesUsed[n]=!0,n}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[nt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Fu(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=C_(c),h=i[u];if(h)o.push(h.promise);else{let d;c.extensions&&c.extensions[nt.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Fu(new Pt,c,t),i[u]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?T_(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let m=0,v=u.length;m<v;m++){const p=u[m],f=o[m];let x;const w=c[m];if(f.mode===Dn.TRIANGLES||f.mode===Dn.TRIANGLE_STRIP||f.mode===Dn.TRIANGLE_FAN||f.mode===void 0)x=s.isSkinnedMesh===!0?new _x(p,w):new pe(p,w),x.isSkinnedMesh===!0&&x.normalizeSkinWeights(),f.mode===Dn.TRIANGLE_STRIP?x.geometry=Ru(x.geometry,Nh):f.mode===Dn.TRIANGLE_FAN&&(x.geometry=Ru(x.geometry,ol));else if(f.mode===Dn.LINES)x=new td(p,w);else if(f.mode===Dn.LINE_STRIP)x=new Hn(p,w);else if(f.mode===Dn.LINE_LOOP)x=new Mx(p,w);else if(f.mode===Dn.POINTS)x=new Sx(p,w);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+f.mode);Object.keys(x.geometry.morphAttributes).length>0&&A_(x,s),x.name=t.createUniqueName(s.name||"mesh_"+e),Fi(x,s),f.extensions&&bs(i,x,f),t.assignFinalMaterial(x),h.push(x)}for(let m=0,v=h.length;m<v;m++)t.associations.set(h[m],{meshes:e,primitives:m});if(h.length===1)return h[0];const d=new fn;t.associations.set(d,{meshes:e});for(let m=0,v=h.length;m<v;m++)d.add(h[m]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new At(Br.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ol(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Fi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const h=o[c];if(h){a.push(h);const d=new Ue;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Bl(a,l)})}loadAnimation(e){const n=this.json.animations[e],i=[],s=[],o=[],a=[],l=[];for(let c=0,u=n.channels.length;c<u;c++){const h=n.channels[c],d=n.samplers[h.sampler],m=h.target,v=m.node,p=n.parameters!==void 0?n.parameters[d.input]:d.input,f=n.parameters!==void 0?n.parameters[d.output]:d.output;i.push(this.getDependency("node",v)),s.push(this.getDependency("accessor",p)),o.push(this.getDependency("accessor",f)),a.push(d),l.push(m)}return Promise.all([Promise.all(i),Promise.all(s),Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],d=c[2],m=c[3],v=c[4],p=[];for(let x=0,w=u.length;x<w;x++){const g=u[x],b=h[x],M=d[x],E=m[x],P=v[x];if(g===void 0)continue;g.updateMatrix();let y;switch(Ri[P.path]){case Ri.weights:y=js;break;case Ri.rotation:y=hr;break;case Ri.position:case Ri.scale:default:y=Xs;break}const T=g.name?g.name:g.uuid,L=E.interpolation!==void 0?S_[E.interpolation]:Jr,O=[];Ri[P.path]===Ri.weights?g.traverse(function(U){U.morphTargetInfluences&&O.push(U.name?U.name:U.uuid)}):O.push(T);let W=M.array;if(M.normalized){const U=ml(W.constructor),F=new Float32Array(W.length);for(let V=0,$=W.length;V<$;V++)F[V]=W[V]*U;W=F}for(let U=0,F=O.length;U<F;U++){const V=new y(O[U]+"."+Ri[P.path],b.array,W,L);E.interpolation==="CUBICSPLINE"&&(V.createInterpolant=function(ne){const K=this instanceof hr?M_:dd;return new K(this.times,this.values,this.getValueSize()/3,ne)},V.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),p.push(V)}}const f=n.name?n.name:"animation_"+e;return new Dx(f,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(m){m.isSkinnedMesh&&m.bind(d,R_)});for(let m=0,v=h.length;m<v;m++)u.add(h[m]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new ed:c.length>1?u=new fn:c.length===1?u=c[0]:u=new pt,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(s.name&&(u.userData.name=s.name,u.name=o),Fi(u,s),s.extensions&&bs(n,u,s),s.matrix!==void 0){const h=new Ue;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new fn;n.name&&(s.name=i.createUniqueName(n.name)),Fi(s,n),n.extensions&&bs(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,h=l.length;u<h;u++)s.add(l[u]);const c=u=>{const h=new Map;for(const[d,m]of i.associations)(d instanceof En||d instanceof Ct)&&h.set(d,m);return u.traverse(d=>{const m=i.associations.get(d);m!=null&&h.set(d,m)}),h};return i.associations=c(s),s})}}function L_(r,e,t){const n=e.attributes,i=new rs;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new I(l[0],l[1],l[2]),new I(c[0],c[1],c[2])),a.normalized){const u=ml(Yr[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new I,l=new I;for(let c=0,u=s.length;c<u;c++){const h=s[c];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],m=d.min,v=d.max;if(m!==void 0&&v!==void 0){if(l.setX(Math.max(Math.abs(m[0]),Math.abs(v[0]))),l.setY(Math.max(Math.abs(m[1]),Math.abs(v[1]))),l.setZ(Math.max(Math.abs(m[2]),Math.abs(v[2]))),d.normalized){const p=ml(Yr[d.componentType]);l.multiplyScalar(p)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new ss;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Fu(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=pl[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Fi(r,e),L_(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?E_(r,e.targets,t):r})}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.6.9
*/var Uu=function(r){return URL.createObjectURL(new Blob([r],{type:"text/javascript"}))};try{URL.revokeObjectURL(Uu(""))}catch{Uu=function(e){return"data:application/javascript;charset=UTF-8,"+encodeURI(e)}}var In=Uint8Array,Bi=Uint16Array,gl=Uint32Array,fd=new In([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),pd=new In([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),I_=new In([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),md=function(r,e){for(var t=new Bi(31),n=0;n<31;++n)t[n]=e+=1<<r[n-1];for(var i=new gl(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)i[s]=s-t[n]<<5|n;return[t,i]},gd=md(fd,2),vd=gd[0],N_=gd[1];vd[28]=258,N_[258]=28;var F_=md(pd,0),U_=F_[0],vl=new Bi(32768);for(var _t=0;_t<32768;++_t){var Di=(_t&43690)>>>1|(_t&21845)<<1;Di=(Di&52428)>>>2|(Di&13107)<<2,Di=(Di&61680)>>>4|(Di&3855)<<4,vl[_t]=((Di&65280)>>>8|(Di&255)<<8)>>>1}var Ns=function(r,e,t){for(var n=r.length,i=0,s=new Bi(e);i<n;++i)++s[r[i]-1];var o=new Bi(e);for(i=0;i<e;++i)o[i]=o[i-1]+s[i-1]<<1;var a;if(t){a=new Bi(1<<e);var l=15-e;for(i=0;i<n;++i)if(r[i])for(var c=i<<4|r[i],u=e-r[i],h=o[r[i]-1]++<<u,d=h|(1<<u)-1;h<=d;++h)a[vl[h]>>>l]=c}else for(a=new Bi(n),i=0;i<n;++i)r[i]&&(a[i]=vl[o[r[i]-1]++]>>>15-r[i]);return a},no=new In(288);for(var _t=0;_t<144;++_t)no[_t]=8;for(var _t=144;_t<256;++_t)no[_t]=9;for(var _t=256;_t<280;++_t)no[_t]=7;for(var _t=280;_t<288;++_t)no[_t]=8;var xd=new In(32);for(var _t=0;_t<32;++_t)xd[_t]=5;var O_=Ns(no,9,1),k_=Ns(xd,5,1),Wa=function(r){for(var e=r[0],t=1;t<r.length;++t)r[t]>e&&(e=r[t]);return e},zn=function(r,e,t){var n=e/8|0;return(r[n]|r[n+1]<<8)>>(e&7)&t},ja=function(r,e){var t=e/8|0;return(r[t]|r[t+1]<<8|r[t+2]<<16)>>(e&7)},z_=function(r){return(r/8|0)+(r&7&&1)},B_=function(r,e,t){(e==null||e<0)&&(e=0),(t==null||t>r.length)&&(t=r.length);var n=new(r instanceof Bi?Bi:r instanceof gl?gl:In)(t-e);return n.set(r.subarray(e,t)),n},G_=function(r,e,t){var n=r.length;if(!n||t&&!t.l&&n<5)return e||new In(0);var i=!e||t,s=!t||t.i;t||(t={}),e||(e=new In(n*3));var o=function(ce){var xe=e.length;if(ce>xe){var Se=new In(Math.max(xe*2,ce));Se.set(e),e=Se}},a=t.f||0,l=t.p||0,c=t.b||0,u=t.l,h=t.d,d=t.m,m=t.n,v=n*8;do{if(!u){t.f=a=zn(r,l,1);var p=zn(r,l+1,3);if(l+=3,p)if(p==1)u=O_,h=k_,d=9,m=5;else if(p==2){var g=zn(r,l,31)+257,b=zn(r,l+10,15)+4,M=g+zn(r,l+5,31)+1;l+=14;for(var E=new In(M),P=new In(19),y=0;y<b;++y)P[I_[y]]=zn(r,l+y*3,7);l+=b*3;for(var T=Wa(P),L=(1<<T)-1,O=Ns(P,T,1),y=0;y<M;){var W=O[zn(r,l,L)];l+=W&15;var f=W>>>4;if(f<16)E[y++]=f;else{var U=0,F=0;for(f==16?(F=3+zn(r,l,3),l+=2,U=E[y-1]):f==17?(F=3+zn(r,l,7),l+=3):f==18&&(F=11+zn(r,l,127),l+=7);F--;)E[y++]=U}}var V=E.subarray(0,g),$=E.subarray(g);d=Wa(V),m=Wa($),u=Ns(V,d,1),h=Ns($,m,1)}else throw"invalid block type";else{var f=z_(l)+4,x=r[f-4]|r[f-3]<<8,w=f+x;if(w>n){if(s)throw"unexpected EOF";break}i&&o(c+x),e.set(r.subarray(f,w),c),t.b=c+=x,t.p=l=w*8;continue}if(l>v){if(s)throw"unexpected EOF";break}}i&&o(c+131072);for(var ne=(1<<d)-1,K=(1<<m)-1,ee=l;;ee=l){var U=u[ja(r,l)&ne],se=U>>>4;if(l+=U&15,l>v){if(s)throw"unexpected EOF";break}if(!U)throw"invalid length/literal";if(se<256)e[c++]=se;else if(se==256){ee=l,u=null;break}else{var Me=se-254;if(se>264){var y=se-257,j=fd[y];Me=zn(r,l,(1<<j)-1)+vd[y],l+=j}var le=h[ja(r,l)&K],fe=le>>>4;if(!le)throw"invalid distance";l+=le&15;var $=U_[fe];if(fe>3){var j=pd[fe];$+=ja(r,l)&(1<<j)-1,l+=j}if(l>v){if(s)throw"unexpected EOF";break}i&&o(c+131072);for(var X=c+Me;c<X;c+=4)e[c]=e[c-$],e[c+1]=e[c+1-$],e[c+2]=e[c+2-$],e[c+3]=e[c+3-$];c=X}}t.l=u,t.p=ee,t.b=c,u&&(a=1,t.m=d,t.d=h,t.n=m)}while(!a);return c==e.length?e:B_(e,0,c)},V_=new In(0),H_=function(r){if((r[0]&15)!=8||r[0]>>>4>7||(r[0]<<8|r[1])%31)throw"invalid zlib data";if(r[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function Lo(r,e){return G_((H_(r),r.subarray(2,-4)),e)}var W_=typeof TextDecoder<"u"&&new TextDecoder,j_=0;try{W_.decode(V_,{stream:!0}),j_=1}catch{}class io extends ad{constructor(e){super(e),this.type=bt}parse(e){const T=Math.pow(2.7182818,2.2);function L(_,S){let R=0;for(let Z=0;Z<65536;++Z)(Z==0||_[Z>>3]&1<<(Z&7))&&(S[R++]=Z);const z=R-1;for(;R<65536;)S[R++]=0;return z}function O(_){for(let S=0;S<16384;S++)_[S]={},_[S].len=0,_[S].lit=0,_[S].p=null}const W={l:0,c:0,lc:0};function U(_,S,R,z,Z){for(;R<_;)S=S<<8|Oe(z,Z),R+=8;R-=_,W.l=S>>R&(1<<_)-1,W.c=S,W.lc=R}const F=new Array(59);function V(_){for(let R=0;R<=58;++R)F[R]=0;for(let R=0;R<65537;++R)F[_[R]]+=1;let S=0;for(let R=58;R>0;--R){const z=S+F[R]>>1;F[R]=S,S=z}for(let R=0;R<65537;++R){const z=_[R];z>0&&(_[R]=z|F[z]++<<6)}}function $(_,S,R,z,Z,H){const re=S;let he=0,me=0;for(;z<=Z;z++){if(re.value-S.value>R)return!1;U(6,he,me,_,re);const oe=W.l;if(he=W.c,me=W.lc,H[z]=oe,oe==63){if(re.value-S.value>R)throw new Error("Something wrong with hufUnpackEncTable");U(8,he,me,_,re);let ae=W.l+6;if(he=W.c,me=W.lc,z+ae>Z+1)throw new Error("Something wrong with hufUnpackEncTable");for(;ae--;)H[z++]=0;z--}else if(oe>=59){let ae=oe-59+2;if(z+ae>Z+1)throw new Error("Something wrong with hufUnpackEncTable");for(;ae--;)H[z++]=0;z--}}V(H)}function ne(_){return _&63}function K(_){return _>>6}function ee(_,S,R,z){for(;S<=R;S++){const Z=K(_[S]),H=ne(_[S]);if(Z>>H)throw new Error("Invalid table entry");if(H>14){const re=z[Z>>H-14];if(re.len)throw new Error("Invalid table entry");if(re.lit++,re.p){const he=re.p;re.p=new Array(re.lit);for(let me=0;me<re.lit-1;++me)re.p[me]=he[me]}else re.p=new Array(1);re.p[re.lit-1]=S}else if(H){let re=0;for(let he=1<<14-H;he>0;he--){const me=z[(Z<<14-H)+re];if(me.len||me.p)throw new Error("Invalid table entry");me.len=H,me.lit=S,re++}}}return!0}const se={c:0,lc:0};function Me(_,S,R,z){_=_<<8|Oe(R,z),S+=8,se.c=_,se.lc=S}const j={c:0,lc:0};function le(_,S,R,z,Z,H,re,he,me){if(_==S){z<8&&(Me(R,z,Z,H),R=se.c,z=se.lc),z-=8;let oe=R>>z;if(oe=new Uint8Array([oe])[0],he.value+oe>me)return!1;const ae=re[he.value-1];for(;oe-- >0;)re[he.value++]=ae}else if(he.value<me)re[he.value++]=_;else return!1;j.c=R,j.lc=z}function fe(_){return _&65535}function X(_){const S=fe(_);return S>32767?S-65536:S}const ce={a:0,b:0};function xe(_,S){const R=X(_),Z=X(S),H=R+(Z&1)+(Z>>1),re=H,he=H-Z;ce.a=re,ce.b=he}function Se(_,S){const R=fe(_),z=fe(S),Z=R-(z>>1)&65535,H=z+Z-32768&65535;ce.a=H,ce.b=Z}function ye(_,S,R,z,Z,H,re){const he=re<16384,me=R>Z?Z:R;let oe=1,ae,de;for(;oe<=me;)oe<<=1;for(oe>>=1,ae=oe,oe>>=1;oe>=1;){de=0;const De=de+H*(Z-ae),Re=H*oe,We=H*ae,Fe=z*oe,ke=z*ae;let Ke,$e,st,jt;for(;de<=De;de+=We){let Je=de;const et=de+z*(R-ae);for(;Je<=et;Je+=ke){const Tt=Je+Fe,an=Je+Re,Bt=an+Fe;he?(xe(_[Je+S],_[an+S]),Ke=ce.a,st=ce.b,xe(_[Tt+S],_[Bt+S]),$e=ce.a,jt=ce.b,xe(Ke,$e),_[Je+S]=ce.a,_[Tt+S]=ce.b,xe(st,jt),_[an+S]=ce.a,_[Bt+S]=ce.b):(Se(_[Je+S],_[an+S]),Ke=ce.a,st=ce.b,Se(_[Tt+S],_[Bt+S]),$e=ce.a,jt=ce.b,Se(Ke,$e),_[Je+S]=ce.a,_[Tt+S]=ce.b,Se(st,jt),_[an+S]=ce.a,_[Bt+S]=ce.b)}if(R&oe){const Tt=Je+Re;he?xe(_[Je+S],_[Tt+S]):Se(_[Je+S],_[Tt+S]),Ke=ce.a,_[Tt+S]=ce.b,_[Je+S]=Ke}}if(Z&oe){let Je=de;const et=de+z*(R-ae);for(;Je<=et;Je+=ke){const Tt=Je+Fe;he?xe(_[Je+S],_[Tt+S]):Se(_[Je+S],_[Tt+S]),Ke=ce.a,_[Tt+S]=ce.b,_[Je+S]=Ke}}ae=oe,oe>>=1}return de}function Te(_,S,R,z,Z,H,re,he,me){let oe=0,ae=0;const de=re,De=Math.trunc(z.value+(Z+7)/8);for(;z.value<De;)for(Me(oe,ae,R,z),oe=se.c,ae=se.lc;ae>=14;){const We=oe>>ae-14&16383,Fe=S[We];if(Fe.len)ae-=Fe.len,le(Fe.lit,H,oe,ae,R,z,he,me,de),oe=j.c,ae=j.lc;else{if(!Fe.p)throw new Error("hufDecode issues");let ke;for(ke=0;ke<Fe.lit;ke++){const Ke=ne(_[Fe.p[ke]]);for(;ae<Ke&&z.value<De;)Me(oe,ae,R,z),oe=se.c,ae=se.lc;if(ae>=Ke&&K(_[Fe.p[ke]])==(oe>>ae-Ke&(1<<Ke)-1)){ae-=Ke,le(Fe.p[ke],H,oe,ae,R,z,he,me,de),oe=j.c,ae=j.lc;break}}if(ke==Fe.lit)throw new Error("hufDecode issues")}}const Re=8-Z&7;for(oe>>=Re,ae-=Re;ae>0;){const We=S[oe<<14-ae&16383];if(We.len)ae-=We.len,le(We.lit,H,oe,ae,R,z,he,me,de),oe=j.c,ae=j.lc;else throw new Error("hufDecode issues")}return!0}function je(_,S,R,z,Z,H){const re={value:0},he=R.value,me=Ae(S,R),oe=Ae(S,R);R.value+=4;const ae=Ae(S,R);if(R.value+=4,me<0||me>=65537||oe<0||oe>=65537)throw new Error("Something wrong with HUF_ENCSIZE");const de=new Array(65537),De=new Array(16384);O(De);const Re=z-(R.value-he);if($(_,R,Re,me,oe,de),ae>8*(z-(R.value-he)))throw new Error("Something wrong with hufUncompress");ee(de,me,oe,De),Te(de,De,_,R,ae,oe,H,Z,re)}function Ye(_,S,R){for(let z=0;z<R;++z)S[z]=_[S[z]]}function Qe(_){for(let S=1;S<_.length;S++){const R=_[S-1]+_[S]-128;_[S]=R}}function St(_,S){let R=0,z=Math.floor((_.length+1)/2),Z=0;const H=_.length-1;for(;!(Z>H||(S[Z++]=_[R++],Z>H));)S[Z++]=_[z++]}function zt(_){let S=_.byteLength;const R=new Array;let z=0;const Z=new DataView(_);for(;S>0;){const H=Z.getInt8(z++);if(H<0){const re=-H;S-=re+1;for(let he=0;he<re;he++)R.push(Z.getUint8(z++))}else{const re=H;S-=2;const he=Z.getUint8(z++);for(let me=0;me<re+1;me++)R.push(he)}}return R}function Rt(_,S,R,z,Z,H){let re=new DataView(H.buffer);const he=R[_.idx[0]].width,me=R[_.idx[0]].height,oe=3,ae=Math.floor(he/8),de=Math.ceil(he/8),De=Math.ceil(me/8),Re=he-(de-1)*8,We=me-(De-1)*8,Fe={value:0},ke=new Array(oe),Ke=new Array(oe),$e=new Array(oe),st=new Array(oe),jt=new Array(oe);for(let et=0;et<oe;++et)jt[et]=S[_.idx[et]],ke[et]=et<1?0:ke[et-1]+de*De,Ke[et]=new Float32Array(64),$e[et]=new Uint16Array(64),st[et]=new Uint16Array(de*64);for(let et=0;et<De;++et){let Tt=8;et==De-1&&(Tt=We);let an=8;for(let ot=0;ot<de;++ot){ot==de-1&&(an=Re);for(let vt=0;vt<oe;++vt)$e[vt].fill(0),$e[vt][0]=Z[ke[vt]++],Dt(Fe,z,$e[vt]),gt($e[vt],Ke[vt]),ct(Ke[vt]);on(Ke);for(let vt=0;vt<oe;++vt)Ht(Ke[vt],st[vt],ot*64)}let Bt=0;for(let ot=0;ot<oe;++ot){const vt=R[_.idx[ot]].type;for(let hi=8*et;hi<8*et+Tt;++hi){Bt=jt[ot][hi];for(let hs=0;hs<ae;++hs){const Jn=hs*64+(hi&7)*8;re.setUint16(Bt+0*2*vt,st[ot][Jn+0],!0),re.setUint16(Bt+1*2*vt,st[ot][Jn+1],!0),re.setUint16(Bt+2*2*vt,st[ot][Jn+2],!0),re.setUint16(Bt+3*2*vt,st[ot][Jn+3],!0),re.setUint16(Bt+4*2*vt,st[ot][Jn+4],!0),re.setUint16(Bt+5*2*vt,st[ot][Jn+5],!0),re.setUint16(Bt+6*2*vt,st[ot][Jn+6],!0),re.setUint16(Bt+7*2*vt,st[ot][Jn+7],!0),Bt+=8*2*vt}}if(ae!=de)for(let hi=8*et;hi<8*et+Tt;++hi){const hs=jt[ot][hi]+8*ae*2*vt,Jn=ae*64+(hi&7)*8;for(let ao=0;ao<an;++ao)re.setUint16(hs+ao*2*vt,st[ot][Jn+ao],!0)}}}const Je=new Uint16Array(he);re=new DataView(H.buffer);for(let et=0;et<oe;++et){R[_.idx[et]].decoded=!0;const Tt=R[_.idx[et]].type;if(R[et].type==2)for(let an=0;an<me;++an){const Bt=jt[et][an];for(let ot=0;ot<he;++ot)Je[ot]=re.getUint16(Bt+ot*2*Tt,!0);for(let ot=0;ot<he;++ot)re.setFloat32(Bt+ot*2*Tt,B(Je[ot]),!0)}}}function Dt(_,S,R){let z,Z=1;for(;Z<64;)z=S[_.value],z==65280?Z=64:z>>8==255?Z+=z&255:(R[Z]=z,Z++),_.value++}function gt(_,S){S[0]=B(_[0]),S[1]=B(_[1]),S[2]=B(_[5]),S[3]=B(_[6]),S[4]=B(_[14]),S[5]=B(_[15]),S[6]=B(_[27]),S[7]=B(_[28]),S[8]=B(_[2]),S[9]=B(_[4]),S[10]=B(_[7]),S[11]=B(_[13]),S[12]=B(_[16]),S[13]=B(_[26]),S[14]=B(_[29]),S[15]=B(_[42]),S[16]=B(_[3]),S[17]=B(_[8]),S[18]=B(_[12]),S[19]=B(_[17]),S[20]=B(_[25]),S[21]=B(_[30]),S[22]=B(_[41]),S[23]=B(_[43]),S[24]=B(_[9]),S[25]=B(_[11]),S[26]=B(_[18]),S[27]=B(_[24]),S[28]=B(_[31]),S[29]=B(_[40]),S[30]=B(_[44]),S[31]=B(_[53]),S[32]=B(_[10]),S[33]=B(_[19]),S[34]=B(_[23]),S[35]=B(_[32]),S[36]=B(_[39]),S[37]=B(_[45]),S[38]=B(_[52]),S[39]=B(_[54]),S[40]=B(_[20]),S[41]=B(_[22]),S[42]=B(_[33]),S[43]=B(_[38]),S[44]=B(_[46]),S[45]=B(_[51]),S[46]=B(_[55]),S[47]=B(_[60]),S[48]=B(_[21]),S[49]=B(_[34]),S[50]=B(_[37]),S[51]=B(_[47]),S[52]=B(_[50]),S[53]=B(_[56]),S[54]=B(_[59]),S[55]=B(_[61]),S[56]=B(_[35]),S[57]=B(_[36]),S[58]=B(_[48]),S[59]=B(_[49]),S[60]=B(_[57]),S[61]=B(_[58]),S[62]=B(_[62]),S[63]=B(_[63])}function ct(_){const S=.5*Math.cos(.7853975),R=.5*Math.cos(3.14159/16),z=.5*Math.cos(3.14159/8),Z=.5*Math.cos(3*3.14159/16),H=.5*Math.cos(5*3.14159/16),re=.5*Math.cos(3*3.14159/8),he=.5*Math.cos(7*3.14159/16),me=new Array(4),oe=new Array(4),ae=new Array(4),de=new Array(4);for(let De=0;De<8;++De){const Re=De*8;me[0]=z*_[Re+2],me[1]=re*_[Re+2],me[2]=z*_[Re+6],me[3]=re*_[Re+6],oe[0]=R*_[Re+1]+Z*_[Re+3]+H*_[Re+5]+he*_[Re+7],oe[1]=Z*_[Re+1]-he*_[Re+3]-R*_[Re+5]-H*_[Re+7],oe[2]=H*_[Re+1]-R*_[Re+3]+he*_[Re+5]+Z*_[Re+7],oe[3]=he*_[Re+1]-H*_[Re+3]+Z*_[Re+5]-R*_[Re+7],ae[0]=S*(_[Re+0]+_[Re+4]),ae[3]=S*(_[Re+0]-_[Re+4]),ae[1]=me[0]+me[3],ae[2]=me[1]-me[2],de[0]=ae[0]+ae[1],de[1]=ae[3]+ae[2],de[2]=ae[3]-ae[2],de[3]=ae[0]-ae[1],_[Re+0]=de[0]+oe[0],_[Re+1]=de[1]+oe[1],_[Re+2]=de[2]+oe[2],_[Re+3]=de[3]+oe[3],_[Re+4]=de[3]-oe[3],_[Re+5]=de[2]-oe[2],_[Re+6]=de[1]-oe[1],_[Re+7]=de[0]-oe[0]}for(let De=0;De<8;++De)me[0]=z*_[16+De],me[1]=re*_[16+De],me[2]=z*_[48+De],me[3]=re*_[48+De],oe[0]=R*_[8+De]+Z*_[24+De]+H*_[40+De]+he*_[56+De],oe[1]=Z*_[8+De]-he*_[24+De]-R*_[40+De]-H*_[56+De],oe[2]=H*_[8+De]-R*_[24+De]+he*_[40+De]+Z*_[56+De],oe[3]=he*_[8+De]-H*_[24+De]+Z*_[40+De]-R*_[56+De],ae[0]=S*(_[De]+_[32+De]),ae[3]=S*(_[De]-_[32+De]),ae[1]=me[0]+me[3],ae[2]=me[1]-me[2],de[0]=ae[0]+ae[1],de[1]=ae[3]+ae[2],de[2]=ae[3]-ae[2],de[3]=ae[0]-ae[1],_[0+De]=de[0]+oe[0],_[8+De]=de[1]+oe[1],_[16+De]=de[2]+oe[2],_[24+De]=de[3]+oe[3],_[32+De]=de[3]-oe[3],_[40+De]=de[2]-oe[2],_[48+De]=de[1]-oe[1],_[56+De]=de[0]-oe[0]}function on(_){for(let S=0;S<64;++S){const R=_[0][S],z=_[1][S],Z=_[2][S];_[0][S]=R+1.5747*Z,_[1][S]=R-.1873*z-.4682*Z,_[2][S]=R+1.8556*z}}function Ht(_,S,R){for(let z=0;z<64;++z)S[R+z]=Hr.toHalfFloat(D(_[z]))}function D(_){return _<=1?Math.sign(_)*Math.pow(Math.abs(_),2.2):Math.sign(_)*Math.pow(T,Math.abs(_)-1)}function A(_){return new DataView(_.array.buffer,_.offset.value,_.size)}function te(_){const S=_.viewer.buffer.slice(_.offset.value,_.offset.value+_.size),R=new Uint8Array(zt(S)),z=new Uint8Array(R.length);return Qe(R),St(R,z),new DataView(z.buffer)}function ge(_){const S=_.array.slice(_.offset.value,_.offset.value+_.size),R=Lo(S),z=new Uint8Array(R.length);return Qe(R),St(R,z),new DataView(z.buffer)}function ve(_){const S=_.viewer,R={value:_.offset.value},z=new Uint16Array(_.width*_.scanlineBlockSize*(_.channels*_.type)),Z=new Uint8Array(8192);let H=0;const re=new Array(_.channels);for(let We=0;We<_.channels;We++)re[We]={},re[We].start=H,re[We].end=re[We].start,re[We].nx=_.width,re[We].ny=_.lines,re[We].size=_.type,H+=re[We].nx*re[We].ny*re[We].size;const he=ue(S,R),me=ue(S,R);if(me>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(he<=me)for(let We=0;We<me-he+1;We++)Z[We+he]=Ze(S,R);const oe=new Uint16Array(65536),ae=L(Z,oe),de=Ae(S,R);je(_.array,S,R,de,z,H);for(let We=0;We<_.channels;++We){const Fe=re[We];for(let ke=0;ke<re[We].size;++ke)ye(z,Fe.start+ke,Fe.nx,Fe.size,Fe.ny,Fe.nx*Fe.size,ae)}Ye(oe,z,H);let De=0;const Re=new Uint8Array(z.buffer.byteLength);for(let We=0;We<_.lines;We++)for(let Fe=0;Fe<_.channels;Fe++){const ke=re[Fe],Ke=ke.nx*ke.size,$e=new Uint8Array(z.buffer,ke.end*2,Ke*2);Re.set($e,De),De+=Ke*2,ke.end+=Ke}return new DataView(Re.buffer)}function Ee(_){const S=_.array.slice(_.offset.value,_.offset.value+_.size),R=Lo(S),z=_.lines*_.channels*_.width,Z=_.type==1?new Uint16Array(z):new Uint32Array(z);let H=0,re=0;const he=new Array(4);for(let me=0;me<_.lines;me++)for(let oe=0;oe<_.channels;oe++){let ae=0;switch(_.type){case 1:he[0]=H,he[1]=he[0]+_.width,H=he[1]+_.width;for(let de=0;de<_.width;++de){const De=R[he[0]++]<<8|R[he[1]++];ae+=De,Z[re]=ae,re++}break;case 2:he[0]=H,he[1]=he[0]+_.width,he[2]=he[1]+_.width,H=he[2]+_.width;for(let de=0;de<_.width;++de){const De=R[he[0]++]<<24|R[he[1]++]<<16|R[he[2]++]<<8;ae+=De,Z[re]=ae,re++}break}}return new DataView(Z.buffer)}function ze(_){const S=_.viewer,R={value:_.offset.value},z=new Uint8Array(_.width*_.lines*(_.channels*_.type*2)),Z={version:Xe(S,R),unknownUncompressedSize:Xe(S,R),unknownCompressedSize:Xe(S,R),acCompressedSize:Xe(S,R),dcCompressedSize:Xe(S,R),rleCompressedSize:Xe(S,R),rleUncompressedSize:Xe(S,R),rleRawSize:Xe(S,R),totalAcUncompressedCount:Xe(S,R),totalDcUncompressedCount:Xe(S,R),acCompression:Xe(S,R)};if(Z.version<2)throw new Error("EXRLoader.parse: "+Q.compression+" version "+Z.version+" is unsupported");const H=new Array;let re=ue(S,R)-2;for(;re>0;){const Fe=N(S.buffer,R),ke=Ze(S,R),Ke=ke>>2&3,$e=(ke>>4)-1,st=new Int8Array([$e])[0],jt=Ze(S,R);H.push({name:Fe,index:st,type:jt,compression:Ke}),re-=Fe.length+3}const he=Q.channels,me=new Array(_.channels);for(let Fe=0;Fe<_.channels;++Fe){const ke=me[Fe]={},Ke=he[Fe];ke.name=Ke.name,ke.compression=0,ke.decoded=!1,ke.type=Ke.pixelType,ke.pLinear=Ke.pLinear,ke.width=_.width,ke.height=_.lines}const oe={idx:new Array(3)};for(let Fe=0;Fe<_.channels;++Fe){const ke=me[Fe];for(let Ke=0;Ke<H.length;++Ke){const $e=H[Ke];ke.name==$e.name&&(ke.compression=$e.compression,$e.index>=0&&(oe.idx[$e.index]=Fe),ke.offset=Fe)}}let ae,de,De;if(Z.acCompressedSize>0)switch(Z.acCompression){case 0:ae=new Uint16Array(Z.totalAcUncompressedCount),je(_.array,S,R,Z.acCompressedSize,ae,Z.totalAcUncompressedCount);break;case 1:const Fe=_.array.slice(R.value,R.value+Z.totalAcUncompressedCount),ke=Lo(Fe);ae=new Uint16Array(ke.buffer),R.value+=Z.totalAcUncompressedCount;break}if(Z.dcCompressedSize>0){const Fe={array:_.array,offset:R,size:Z.dcCompressedSize};de=new Uint16Array(ge(Fe).buffer),R.value+=Z.dcCompressedSize}if(Z.rleRawSize>0){const Fe=_.array.slice(R.value,R.value+Z.rleCompressedSize),ke=Lo(Fe);De=zt(ke.buffer),R.value+=Z.rleCompressedSize}let Re=0;const We=new Array(me.length);for(let Fe=0;Fe<We.length;++Fe)We[Fe]=new Array;for(let Fe=0;Fe<_.lines;++Fe)for(let ke=0;ke<me.length;++ke)We[ke].push(Re),Re+=me[ke].width*_.type*2;Rt(oe,We,me,ae,de,z);for(let Fe=0;Fe<me.length;++Fe){const ke=me[Fe];if(!ke.decoded)switch(ke.compression){case 2:let Ke=0,$e=0;for(let st=0;st<_.lines;++st){let jt=We[Fe][Ke];for(let Je=0;Je<ke.width;++Je){for(let et=0;et<2*ke.type;++et)z[jt++]=De[$e+et*ke.width*ke.height];$e++}Ke++}break;case 1:default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(z.buffer)}function N(_,S){const R=new Uint8Array(_);let z=0;for(;R[S.value+z]!=0;)z+=1;const Z=new TextDecoder().decode(R.slice(S.value,S.value+z));return S.value=S.value+z+1,Z}function q(_,S,R){const z=new TextDecoder().decode(new Uint8Array(_).slice(S.value,S.value+R));return S.value=S.value+R,z}function Ce(_,S){const R=Le(_,S),z=Ae(_,S);return[R,z]}function we(_,S){const R=Ae(_,S),z=Ae(_,S);return[R,z]}function Le(_,S){const R=_.getInt32(S.value,!0);return S.value=S.value+4,R}function Ae(_,S){const R=_.getUint32(S.value,!0);return S.value=S.value+4,R}function Oe(_,S){const R=_[S.value];return S.value=S.value+1,R}function Ze(_,S){const R=_.getUint8(S.value);return S.value=S.value+1,R}const Xe=function(_,S){let R;return"getBigInt64"in DataView.prototype?R=Number(_.getBigInt64(S.value,!0)):R=_.getUint32(S.value+4,!0)+Number(_.getUint32(S.value,!0)<<32),S.value+=8,R};function qe(_,S){const R=_.getFloat32(S.value,!0);return S.value+=4,R}function G(_,S){return Hr.toHalfFloat(qe(_,S))}function B(_){const S=(_&31744)>>10,R=_&1023;return(_>>15?-1:1)*(S?S===31?R?NaN:1/0:Math.pow(2,S-15)*(1+R/1024):6103515625e-14*(R/1024))}function ue(_,S){const R=_.getUint16(S.value,!0);return S.value+=2,R}function Pe(_,S){return B(ue(_,S))}function Ie(_,S,R,z){const Z=R.value,H=[];for(;R.value<Z+z-1;){const re=N(S,R),he=Le(_,R),me=Ze(_,R);R.value+=3;const oe=Le(_,R),ae=Le(_,R);H.push({name:re,pixelType:he,pLinear:me,xSampling:oe,ySampling:ae})}return R.value+=1,H}function ut(_,S){const R=qe(_,S),z=qe(_,S),Z=qe(_,S),H=qe(_,S),re=qe(_,S),he=qe(_,S),me=qe(_,S),oe=qe(_,S);return{redX:R,redY:z,greenX:Z,greenY:H,blueX:re,blueY:he,whiteX:me,whiteY:oe}}function Lt(_,S){const R=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],z=Ze(_,S);return R[z]}function Wt(_,S){const R=Ae(_,S),z=Ae(_,S),Z=Ae(_,S),H=Ae(_,S);return{xMin:R,yMin:z,xMax:Z,yMax:H}}function An(_,S){const R=["INCREASING_Y"],z=Ze(_,S);return R[z]}function wt(_,S){const R=qe(_,S),z=qe(_,S);return[R,z]}function mn(_,S){const R=qe(_,S),z=qe(_,S),Z=qe(_,S);return[R,z,Z]}function Cn(_,S,R,z,Z){if(z==="string"||z==="stringvector"||z==="iccProfile")return q(S,R,Z);if(z==="chlist")return Ie(_,S,R,Z);if(z==="chromaticities")return ut(_,R);if(z==="compression")return Lt(_,R);if(z==="box2i")return Wt(_,R);if(z==="lineOrder")return An(_,R);if(z==="float")return qe(_,R);if(z==="v2f")return wt(_,R);if(z==="v3f")return mn(_,R);if(z==="int")return Le(_,R);if(z==="rational")return Ce(_,R);if(z==="timecode")return we(_,R);if(z==="preview")return R.value+=Z,"skipped";R.value+=Z}function oa(_,S,R){const z={};if(_.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.");z.version=_.getUint8(4);const Z=_.getUint8(5);z.spec={singleTile:!!(Z&2),longName:!!(Z&4),deepFormat:!!(Z&8),multiPart:!!(Z&16)},R.value=8;let H=!0;for(;H;){const re=N(S,R);if(re==0)H=!1;else{const he=N(S,R),me=Ae(_,R),oe=Cn(_,S,R,he,me);oe===void 0?console.warn(`EXRLoader.parse: skipped unknown header attribute type '${he}'.`):z[re]=oe}}if(Z&-5)throw console.error("EXRHeader:",z),new Error("THREE.EXRLoader: provided file is currently unsupported.");return z}function aa(_,S,R,z,Z){const H={size:0,viewer:S,array:R,offset:z,width:_.dataWindow.xMax-_.dataWindow.xMin+1,height:_.dataWindow.yMax-_.dataWindow.yMin+1,channels:_.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:_.channels[0].pixelType,uncompress:null,getter:null,format:null,encoding:null};switch(_.compression){case"NO_COMPRESSION":H.lines=1,H.uncompress=A;break;case"RLE_COMPRESSION":H.lines=1,H.uncompress=te;break;case"ZIPS_COMPRESSION":H.lines=1,H.uncompress=ge;break;case"ZIP_COMPRESSION":H.lines=16,H.uncompress=ge;break;case"PIZ_COMPRESSION":H.lines=32,H.uncompress=ve;break;case"PXR24_COMPRESSION":H.lines=16,H.uncompress=Ee;break;case"DWAA_COMPRESSION":H.lines=32,H.uncompress=ze;break;case"DWAB_COMPRESSION":H.lines=256,H.uncompress=ze;break;default:throw new Error("EXRLoader.parse: "+_.compression+" is unsupported")}if(H.scanlineBlockSize=H.lines,H.type==1)switch(Z){case ft:H.getter=Pe,H.inputSize=2;break;case bt:H.getter=ue,H.inputSize=2;break}else if(H.type==2)switch(Z){case ft:H.getter=qe,H.inputSize=4;break;case bt:H.getter=G,H.inputSize=4}else throw new Error("EXRLoader.parse: unsupported pixelType "+H.type+" for "+_.compression+".");H.blockCount=(_.dataWindow.yMax+1)/H.scanlineBlockSize;for(let he=0;he<H.blockCount;he++)Xe(S,z);H.outputChannels=H.channels==3?4:H.channels;const re=H.width*H.height*H.outputChannels;switch(Z){case ft:H.byteArray=new Float32Array(re),H.channels<H.outputChannels&&H.byteArray.fill(1,0,re);break;case bt:H.byteArray=new Uint16Array(re),H.channels<H.outputChannels&&H.byteArray.fill(15360,0,re);break;default:console.error("THREE.EXRLoader: unsupported type: ",Z);break}return H.bytesPerLine=H.width*H.inputSize*H.channels,H.outputChannels==4?(H.format=sn,H.encoding=yn):(H.format=Bo,H.encoding=yn),H}const vr=new DataView(e),C=new Uint8Array(e),Y={value:0},Q=oa(vr,e,Y),k=aa(Q,vr,C,Y,this.type),ie={value:0},Be={R:0,G:1,B:2,A:3,Y:0};for(let _=0;_<k.height/k.scanlineBlockSize;_++){const S=Ae(vr,Y);k.size=Ae(vr,Y),k.lines=S+k.scanlineBlockSize>k.height?k.height-S:k.scanlineBlockSize;const z=k.size<k.lines*k.bytesPerLine?k.uncompress(k):A(k);Y.value+=k.size;for(let Z=0;Z<k.scanlineBlockSize;Z++){const H=Z+_*k.scanlineBlockSize;if(H>=k.height)break;for(let re=0;re<k.channels;re++){const he=Be[Q.channels[re].name];for(let me=0;me<k.width;me++){ie.value=(Z*(k.channels*k.width)+re*k.width+me)*k.inputSize;const oe=(k.height-1-H)*(k.width*k.outputChannels)+me*k.outputChannels+he;k.byteArray[oe]=k.getter(z,ie)}}}}return{header:Q,width:k.width,height:k.height,data:k.byteArray,format:k.format,encoding:k.encoding,type:this.type}}setDataType(e){return this.type=e,this}load(e,t,n,i){function s(o,a){o.encoding=a.encoding,o.minFilter=Ve,o.magFilter=Ve,o.generateMipmaps=!1,o.flipY=!1,t&&t(o,a)}return super.load(e,s,n,i)}}class ro extends pe{constructor(e,t={}){const i=[e.isCubeTexture?"#define ENVMAP_TYPE_CUBE":""],s=`
        varying vec3 vWorldPosition;

        void main() 
        {

            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

        }
        `,o=i.join(`
`)+`

        varying vec3 vWorldPosition;

        uniform float radius;
        uniform float height;
        uniform float angle;

        #ifdef ENVMAP_TYPE_CUBE

            uniform samplerCube map;

        #else

            uniform sampler2D map;

        #endif

        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {

            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;

        }

        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {

            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;

        }

        vec3 project() 
        {

            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;

            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;

            } else {

                p = vec3( 0.0, 1.0, 0.0 );

            }

            return p;

        }

        #include <common>

        void main() 
        {

            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE

                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;

            #else

                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;

            #endif

            gl_FragColor = vec4( outcolor, 1.0 );

            #include <tonemapping_fragment>
            #include <encodings_fragment>

        }
        `,a={map:{value:e},height:{value:t.height||15},radius:{value:t.radius||100}},l=new Gl(1,16),c=new Vt({uniforms:a,fragmentShader:o,vertexShader:s,side:dn});super(l,c)}set radius(e){this.material.uniforms.radius.value=e}get radius(){return this.material.uniforms.radius.value}set height(e){this.material.uniforms.height.value=e}get height(){return this.material.uniforms.height.value}}const Xa=new WeakMap;class so extends gr{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){const s=new qs(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,o=>{this.parse(o,t,i)},n,i)}parse(e,t,n){this.decodeDracoFile(e,t,null,null,Ln).catch(n)}decodeDracoFile(e,t,n,i,s=Qr){const o={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:s};return this.decodeGeometry(e,o).then(t)}decodeGeometry(e,t){const n=JSON.stringify(t);if(Xa.has(e)){const l=Xa.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i;const s=this.workerNextTaskID++,o=e.byteLength,a=this._getWorker(s,o).then(l=>(i=l,new Promise((c,u)=>{i._callbacks[s]={resolve:c,reject:u},i.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return a.catch(()=>!0).then(()=>{i&&s&&this._releaseTask(i,s)}),Xa.set(e,{key:n,promise:a}),a}_createGeometry(e){const t=new Pt;e.index&&t.setIndex(new Mt(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const i=e.attributes[n],s=i.name,o=i.array,a=i.itemSize,l=new Mt(o,a);s==="color"&&this._assignVertexColorSpace(l,i.vertexColorSpace),t.setAttribute(s,l)}return t}_assignVertexColorSpace(e,t){if(t!==Ln)return;const n=new Ne;for(let i=0,s=e.count;i<s;i++)n.fromBufferAttribute(e,i).convertSRGBToLinear(),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new qs(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,s)=>{n.load(e,i,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const s=X_.toString(),o=["/* draco decoder */",i,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([o]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(s){const o=s.data;switch(o.type){case"decode":i._callbacks[o.id].resolve(o);break;case"error":i._callbacks[o.id].reject(o);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+o.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,s){return i._taskLoad>s._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function X_(){let r,e;onmessage=function(o){const a=o.data;switch(a.type){case"init":r=a.decoderConfig,e=new Promise(function(u){r.onModuleLoaded=function(h){u({draco:h})},DracoDecoderModule(r)});break;case"decode":const l=a.buffer,c=a.taskConfig;e.then(u=>{const h=u.draco,d=new h.Decoder;try{const m=t(h,d,new Int8Array(l),c),v=m.attributes.map(p=>p.array.buffer);m.index&&v.push(m.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:m},v)}catch(m){console.error(m),self.postMessage({type:"error",id:a.id,error:m.message})}finally{h.destroy(d)}});break}};function t(o,a,l,c){const u=c.attributeIDs,h=c.attributeTypes;let d,m;const v=a.GetEncodedGeometryType(l);if(v===o.TRIANGULAR_MESH)d=new o.Mesh,m=a.DecodeArrayToMesh(l,l.byteLength,d);else if(v===o.POINT_CLOUD)d=new o.PointCloud,m=a.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!m.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+m.error_msg());const p={index:null,attributes:[]};for(const f in u){const x=self[h[f]];let w,g;if(c.useUniqueIDs)g=u[f],w=a.GetAttributeByUniqueId(d,g);else{if(g=a.GetAttributeId(d,o[u[f]]),g===-1)continue;w=a.GetAttribute(d,g)}const b=i(o,a,d,f,x,w);f==="color"&&(b.vertexColorSpace=c.vertexColorSpace),p.attributes.push(b)}return v===o.TRIANGULAR_MESH&&(p.index=n(o,a,d)),o.destroy(d),p}function n(o,a,l){const u=l.num_faces()*3,h=u*4,d=o._malloc(h);a.GetTrianglesUInt32Array(l,h,d);const m=new Uint32Array(o.HEAPF32.buffer,d,u).slice();return o._free(d),{array:m,itemSize:1}}function i(o,a,l,c,u,h){const d=h.num_components(),v=l.num_points()*d,p=v*u.BYTES_PER_ELEMENT,f=s(o,u),x=o._malloc(p);a.GetAttributeDataArrayForAllPoints(l,h,f,p,x);const w=new u(o.HEAPF32.buffer,x,v).slice();return o._free(x),{name:c,array:w,itemSize:d}}function s(o,a){switch(a){case Float32Array:return o.DT_FLOAT32;case Int8Array:return o.DT_INT8;case Int16Array:return o.DT_INT16;case Int32Array:return o.DT_INT32;case Uint8Array:return o.DT_UINT8;case Uint16Array:return o.DT_UINT16;case Uint32Array:return o.DT_UINT32}}}const Ou={type:"change"},qa={type:"start"},ku={type:"end"};class oo extends Mi{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:xr.ROTATE,MIDDLE:xr.DOLLY,RIGHT:xr.PAN},this.touches={ONE:_r.ROTATE,TWO:_r.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(N){N.addEventListener("keydown",Ht),this._domElementKeyEvents=N},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Ht),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Ou),n.update(),s=i.NONE},this.update=function(){const N=new I,q=new Et().setFromUnitVectors(e.up,new I(0,1,0)),Ce=q.clone().invert(),we=new I,Le=new Et,Ae=2*Math.PI;return function(){const Ze=n.object.position;N.copy(Ze).sub(n.target),N.applyQuaternion(q),a.setFromVector3(N),n.autoRotate&&s===i.NONE&&T(P()),n.enableDamping?(a.theta+=l.theta*n.dampingFactor,a.phi+=l.phi*n.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let Xe=n.minAzimuthAngle,qe=n.maxAzimuthAngle;return isFinite(Xe)&&isFinite(qe)&&(Xe<-Math.PI?Xe+=Ae:Xe>Math.PI&&(Xe-=Ae),qe<-Math.PI?qe+=Ae:qe>Math.PI&&(qe-=Ae),Xe<=qe?a.theta=Math.max(Xe,Math.min(qe,a.theta)):a.theta=a.theta>(Xe+qe)/2?Math.max(Xe,a.theta):Math.min(qe,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),a.radius*=c,a.radius=Math.max(n.minDistance,Math.min(n.maxDistance,a.radius)),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),N.setFromSpherical(a),N.applyQuaternion(Ce),Ze.copy(n.target).add(N),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),u.set(0,0,0)),c=1,h||we.distanceToSquared(n.object.position)>o||8*(1-Le.dot(n.object.quaternion))>o?(n.dispatchEvent(Ou),we.copy(n.object.position),Le.copy(n.object.quaternion),h=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",te),n.domElement.removeEventListener("pointerdown",St),n.domElement.removeEventListener("pointercancel",Dt),n.domElement.removeEventListener("wheel",on),n.domElement.removeEventListener("pointermove",zt),n.domElement.removeEventListener("pointerup",Rt),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Ht),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=i.NONE;const o=1e-6,a=new Cu,l=new Cu;let c=1;const u=new I;let h=!1;const d=new _e,m=new _e,v=new _e,p=new _e,f=new _e,x=new _e,w=new _e,g=new _e,b=new _e,M=[],E={};function P(){return 2*Math.PI/60/60*n.autoRotateSpeed}function y(){return Math.pow(.95,n.zoomSpeed)}function T(N){l.theta-=N}function L(N){l.phi-=N}const O=function(){const N=new I;return function(Ce,we){N.setFromMatrixColumn(we,0),N.multiplyScalar(-Ce),u.add(N)}}(),W=function(){const N=new I;return function(Ce,we){n.screenSpacePanning===!0?N.setFromMatrixColumn(we,1):(N.setFromMatrixColumn(we,0),N.crossVectors(n.object.up,N)),N.multiplyScalar(Ce),u.add(N)}}(),U=function(){const N=new I;return function(Ce,we){const Le=n.domElement;if(n.object.isPerspectiveCamera){const Ae=n.object.position;N.copy(Ae).sub(n.target);let Oe=N.length();Oe*=Math.tan(n.object.fov/2*Math.PI/180),O(2*Ce*Oe/Le.clientHeight,n.object.matrix),W(2*we*Oe/Le.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(O(Ce*(n.object.right-n.object.left)/n.object.zoom/Le.clientWidth,n.object.matrix),W(we*(n.object.top-n.object.bottom)/n.object.zoom/Le.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function F(N){n.object.isPerspectiveCamera?c/=N:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*N)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function V(N){n.object.isPerspectiveCamera?c*=N:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/N)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function $(N){d.set(N.clientX,N.clientY)}function ne(N){w.set(N.clientX,N.clientY)}function K(N){p.set(N.clientX,N.clientY)}function ee(N){m.set(N.clientX,N.clientY),v.subVectors(m,d).multiplyScalar(n.rotateSpeed);const q=n.domElement;T(2*Math.PI*v.x/q.clientHeight),L(2*Math.PI*v.y/q.clientHeight),d.copy(m),n.update()}function se(N){g.set(N.clientX,N.clientY),b.subVectors(g,w),b.y>0?F(y()):b.y<0&&V(y()),w.copy(g),n.update()}function Me(N){f.set(N.clientX,N.clientY),x.subVectors(f,p).multiplyScalar(n.panSpeed),U(x.x,x.y),p.copy(f),n.update()}function j(N){N.deltaY<0?V(y()):N.deltaY>0&&F(y()),n.update()}function le(N){let q=!1;switch(N.code){case n.keys.UP:N.ctrlKey||N.metaKey||N.shiftKey?L(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):U(0,n.keyPanSpeed),q=!0;break;case n.keys.BOTTOM:N.ctrlKey||N.metaKey||N.shiftKey?L(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):U(0,-n.keyPanSpeed),q=!0;break;case n.keys.LEFT:N.ctrlKey||N.metaKey||N.shiftKey?T(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):U(n.keyPanSpeed,0),q=!0;break;case n.keys.RIGHT:N.ctrlKey||N.metaKey||N.shiftKey?T(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):U(-n.keyPanSpeed,0),q=!0;break}q&&(N.preventDefault(),n.update())}function fe(){if(M.length===1)d.set(M[0].pageX,M[0].pageY);else{const N=.5*(M[0].pageX+M[1].pageX),q=.5*(M[0].pageY+M[1].pageY);d.set(N,q)}}function X(){if(M.length===1)p.set(M[0].pageX,M[0].pageY);else{const N=.5*(M[0].pageX+M[1].pageX),q=.5*(M[0].pageY+M[1].pageY);p.set(N,q)}}function ce(){const N=M[0].pageX-M[1].pageX,q=M[0].pageY-M[1].pageY,Ce=Math.sqrt(N*N+q*q);w.set(0,Ce)}function xe(){n.enableZoom&&ce(),n.enablePan&&X()}function Se(){n.enableZoom&&ce(),n.enableRotate&&fe()}function ye(N){if(M.length==1)m.set(N.pageX,N.pageY);else{const Ce=ze(N),we=.5*(N.pageX+Ce.x),Le=.5*(N.pageY+Ce.y);m.set(we,Le)}v.subVectors(m,d).multiplyScalar(n.rotateSpeed);const q=n.domElement;T(2*Math.PI*v.x/q.clientHeight),L(2*Math.PI*v.y/q.clientHeight),d.copy(m)}function Te(N){if(M.length===1)f.set(N.pageX,N.pageY);else{const q=ze(N),Ce=.5*(N.pageX+q.x),we=.5*(N.pageY+q.y);f.set(Ce,we)}x.subVectors(f,p).multiplyScalar(n.panSpeed),U(x.x,x.y),p.copy(f)}function je(N){const q=ze(N),Ce=N.pageX-q.x,we=N.pageY-q.y,Le=Math.sqrt(Ce*Ce+we*we);g.set(0,Le),b.set(0,Math.pow(g.y/w.y,n.zoomSpeed)),F(b.y),w.copy(g)}function Ye(N){n.enableZoom&&je(N),n.enablePan&&Te(N)}function Qe(N){n.enableZoom&&je(N),n.enableRotate&&ye(N)}function St(N){n.enabled!==!1&&(M.length===0&&(n.domElement.setPointerCapture(N.pointerId),n.domElement.addEventListener("pointermove",zt),n.domElement.addEventListener("pointerup",Rt)),ge(N),N.pointerType==="touch"?D(N):gt(N))}function zt(N){n.enabled!==!1&&(N.pointerType==="touch"?A(N):ct(N))}function Rt(N){ve(N),M.length===0&&(n.domElement.releasePointerCapture(N.pointerId),n.domElement.removeEventListener("pointermove",zt),n.domElement.removeEventListener("pointerup",Rt)),n.dispatchEvent(ku),s=i.NONE}function Dt(N){ve(N)}function gt(N){let q;switch(N.button){case 0:q=n.mouseButtons.LEFT;break;case 1:q=n.mouseButtons.MIDDLE;break;case 2:q=n.mouseButtons.RIGHT;break;default:q=-1}switch(q){case xr.DOLLY:if(n.enableZoom===!1)return;ne(N),s=i.DOLLY;break;case xr.ROTATE:if(N.ctrlKey||N.metaKey||N.shiftKey){if(n.enablePan===!1)return;K(N),s=i.PAN}else{if(n.enableRotate===!1)return;$(N),s=i.ROTATE}break;case xr.PAN:if(N.ctrlKey||N.metaKey||N.shiftKey){if(n.enableRotate===!1)return;$(N),s=i.ROTATE}else{if(n.enablePan===!1)return;K(N),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(qa)}function ct(N){switch(s){case i.ROTATE:if(n.enableRotate===!1)return;ee(N);break;case i.DOLLY:if(n.enableZoom===!1)return;se(N);break;case i.PAN:if(n.enablePan===!1)return;Me(N);break}}function on(N){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(N.preventDefault(),n.dispatchEvent(qa),j(N),n.dispatchEvent(ku))}function Ht(N){n.enabled===!1||n.enablePan===!1||le(N)}function D(N){switch(Ee(N),M.length){case 1:switch(n.touches.ONE){case _r.ROTATE:if(n.enableRotate===!1)return;fe(),s=i.TOUCH_ROTATE;break;case _r.PAN:if(n.enablePan===!1)return;X(),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case _r.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;xe(),s=i.TOUCH_DOLLY_PAN;break;case _r.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Se(),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(qa)}function A(N){switch(Ee(N),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;ye(N),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;Te(N),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Ye(N),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Qe(N),n.update();break;default:s=i.NONE}}function te(N){n.enabled!==!1&&N.preventDefault()}function ge(N){M.push(N)}function ve(N){delete E[N.pointerId];for(let q=0;q<M.length;q++)if(M[q].pointerId==N.pointerId){M.splice(q,1);return}}function Ee(N){let q=E[N.pointerId];q===void 0&&(q=new _e,E[N.pointerId]=q),q.set(N.pageX,N.pageY)}function ze(N){const q=N.pointerId===M[0].pointerId?M[1]:M[0];return E[q.pointerId]}n.domElement.addEventListener("contextmenu",te),n.domElement.addEventListener("pointerdown",St),n.domElement.addEventListener("pointercancel",Dt),n.domElement.addEventListener("wheel",on,{passive:!1}),this.update()}}const Ki=new us,gn=new I,Li=new I,yt=new Et,zu={X:new I(1,0,0),Y:new I(0,1,0),Z:new I(0,0,1)},Ya={type:"change"},Bu={type:"mouseDown"},Gu={type:"mouseUp",mode:null},Vu={type:"objectChange"};class ta extends pt{constructor(e,t){super(),t===void 0&&(console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.'),t=document),this.isTransformControls=!0,this.visible=!1,this.domElement=t,this.domElement.style.touchAction="none";const n=new Q_;this._gizmo=n,this.add(n);const i=new $_;this._plane=i,this.add(i);const s=this;function o(w,g){let b=g;Object.defineProperty(s,w,{get:function(){return b!==void 0?b:g},set:function(M){b!==M&&(b=M,i[w]=M,n[w]=M,s.dispatchEvent({type:w+"-changed",value:M}),s.dispatchEvent(Ya))}}),s[w]=g,i[w]=g,n[w]=g}o("camera",e),o("object",void 0),o("enabled",!0),o("axis",null),o("mode","translate"),o("translationSnap",null),o("rotationSnap",null),o("scaleSnap",null),o("space","world"),o("size",1),o("dragging",!1),o("showX",!0),o("showY",!0),o("showZ",!0);const a=new I,l=new I,c=new Et,u=new Et,h=new I,d=new Et,m=new I,v=new I,p=new I,f=0,x=new I;o("worldPosition",a),o("worldPositionStart",l),o("worldQuaternion",c),o("worldQuaternionStart",u),o("cameraPosition",h),o("cameraQuaternion",d),o("pointStart",m),o("pointEnd",v),o("rotationAxis",p),o("rotationAngle",f),o("eye",x),this._offset=new I,this._startNorm=new I,this._endNorm=new I,this._cameraScale=new I,this._parentPosition=new I,this._parentQuaternion=new Et,this._parentQuaternionInv=new Et,this._parentScale=new I,this._worldScaleStart=new I,this._worldQuaternionInv=new Et,this._worldScale=new I,this._positionStart=new I,this._quaternionStart=new Et,this._scaleStart=new I,this._getPointer=q_.bind(this),this._onPointerDown=Z_.bind(this),this._onPointerHover=Y_.bind(this),this._onPointerMove=K_.bind(this),this._onPointerUp=J_.bind(this),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp)}updateMatrixWorld(){this.object!==void 0&&(this.object.updateMatrixWorld(),this.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):this.object.parent.matrixWorld.decompose(this._parentPosition,this._parentQuaternion,this._parentScale),this.object.matrixWorld.decompose(this.worldPosition,this.worldQuaternion,this._worldScale),this._parentQuaternionInv.copy(this._parentQuaternion).invert(),this._worldQuaternionInv.copy(this.worldQuaternion).invert()),this.camera.updateMatrixWorld(),this.camera.matrixWorld.decompose(this.cameraPosition,this.cameraQuaternion,this._cameraScale),this.camera.isOrthographicCamera?this.camera.getWorldDirection(this.eye).negate():this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(),super.updateMatrixWorld(this)}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;Ki.setFromCamera(e,this.camera);const t=Za(this._gizmo.picker[this.mode],Ki);t?this.axis=t.object.name:this.axis=null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e.button!==0)&&this.axis!==null){Ki.setFromCamera(e,this.camera);const t=Za(this._plane,Ki,!0);t&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(t.point).sub(this.worldPositionStart)),this.dragging=!0,Bu.mode=this.mode,this.dispatchEvent(Bu)}}pointerMove(e){const t=this.axis,n=this.mode,i=this.object;let s=this.space;if(n==="scale"?s="local":(t==="E"||t==="XYZE"||t==="XYZ")&&(s="world"),i===void 0||t===null||this.dragging===!1||e.button!==-1)return;Ki.setFromCamera(e,this.camera);const o=Za(this._plane,Ki,!0);if(o){if(this.pointEnd.copy(o.point).sub(this.worldPositionStart),n==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),s==="local"&&t!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),t.indexOf("X")===-1&&(this._offset.x=0),t.indexOf("Y")===-1&&(this._offset.y=0),t.indexOf("Z")===-1&&(this._offset.z=0),s==="local"&&t!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),i.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(s==="local"&&(i.position.applyQuaternion(yt.copy(this._quaternionStart).invert()),t.search("X")!==-1&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.position.applyQuaternion(this._quaternionStart)),s==="world"&&(i.parent&&i.position.add(gn.setFromMatrixPosition(i.parent.matrixWorld)),t.search("X")!==-1&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.parent&&i.position.sub(gn.setFromMatrixPosition(i.parent.matrixWorld))));else if(n==="scale"){if(t.search("XYZ")!==-1){let a=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(a*=-1),Li.set(a,a,a)}else gn.copy(this.pointStart),Li.copy(this.pointEnd),gn.applyQuaternion(this._worldQuaternionInv),Li.applyQuaternion(this._worldQuaternionInv),Li.divide(gn),t.search("X")===-1&&(Li.x=1),t.search("Y")===-1&&(Li.y=1),t.search("Z")===-1&&(Li.z=1);i.scale.copy(this._scaleStart).multiply(Li),this.scaleSnap&&(t.search("X")!==-1&&(i.scale.x=Math.round(i.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Y")!==-1&&(i.scale.y=Math.round(i.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Z")!==-1&&(i.scale.z=Math.round(i.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(n==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const a=20/this.worldPosition.distanceTo(gn.setFromMatrixPosition(this.camera.matrixWorld));t==="E"?(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1):t==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(gn.copy(this.rotationAxis).cross(this.eye))*a):(t==="X"||t==="Y"||t==="Z")&&(this.rotationAxis.copy(zu[t]),gn.copy(zu[t]),s==="local"&&gn.applyQuaternion(this.worldQuaternion),this.rotationAngle=this._offset.dot(gn.cross(this.eye).normalize())*a),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),s==="local"&&t!=="E"&&t!=="XYZE"?(i.quaternion.copy(this._quaternionStart),i.quaternion.multiply(yt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),i.quaternion.copy(yt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),i.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(Ya),this.dispatchEvent(Vu)}}pointerUp(e){e.button===0&&(this.dragging&&this.axis!==null&&(Gu.mode=this.mode,this.dispatchEvent(Gu)),this.dragging=!1,this.axis=null)}dispose(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}attach(e){return this.object=e,this.visible=!0,this}detach(){return this.object=void 0,this.visible=!1,this.axis=null,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(Ya),this.dispatchEvent(Vu),this.pointStart.copy(this.pointEnd))}getRaycaster(){return Ki}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}}function q_(r){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:r.button};{const e=this.domElement.getBoundingClientRect();return{x:(r.clientX-e.left)/e.width*2-1,y:-(r.clientY-e.top)/e.height*2+1,button:r.button}}}function Y_(r){if(this.enabled)switch(r.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(r));break}}function Z_(r){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(r)),this.pointerDown(this._getPointer(r)))}function K_(r){this.enabled&&this.pointerMove(this._getPointer(r))}function J_(r){this.enabled&&(this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(r)))}function Za(r,e,t){const n=e.intersectObject(r,!0);for(let i=0;i<n.length;i++)if(n[i].object.visible||t)return n[i];return!1}const Io=new Qs,ht=new I(0,1,0),Hu=new I(0,0,0),Wu=new Ue,No=new Et,ko=new Et,$n=new I,ju=new Ue,As=new I(1,0,0),tr=new I(0,1,0),Cs=new I(0,0,1),Fo=new I,Ms=new I,Ss=new I;class Q_ extends pt{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const e=new oi({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),t=new Jo({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),n=e.clone();n.opacity=.15;const i=t.clone();i.opacity=.5;const s=e.clone();s.color.setHex(16711680);const o=e.clone();o.color.setHex(65280);const a=e.clone();a.color.setHex(255);const l=e.clone();l.color.setHex(16711680),l.opacity=.5;const c=e.clone();c.color.setHex(65280),c.opacity=.5;const u=e.clone();u.color.setHex(255),u.opacity=.5;const h=e.clone();h.opacity=.25;const d=e.clone();d.color.setHex(16776960),d.opacity=.25,e.clone().color.setHex(16776960);const v=e.clone();v.color.setHex(7895160);const p=new Xt(0,.04,.1,12);p.translate(0,.05,0);const f=new xt(.08,.08,.08);f.translate(0,.04,0);const x=new Pt;x.setAttribute("position",new mt([0,0,0,1,0,0],3));const w=new Xt(.0075,.0075,.5,3);w.translate(0,.25,0);function g(V,$){const ne=new rr(V,.0075,3,64,$*Math.PI*2);return ne.rotateY(Math.PI/2),ne.rotateX(Math.PI/2),ne}function b(){const V=new Pt;return V.setAttribute("position",new mt([0,0,0,1,1,1],3)),V}const M={X:[[new pe(p,s),[.5,0,0],[0,0,-Math.PI/2]],[new pe(p,s),[-.5,0,0],[0,0,Math.PI/2]],[new pe(w,s),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new pe(p,o),[0,.5,0]],[new pe(p,o),[0,-.5,0],[Math.PI,0,0]],[new pe(w,o)]],Z:[[new pe(p,a),[0,0,.5],[Math.PI/2,0,0]],[new pe(p,a),[0,0,-.5],[-Math.PI/2,0,0]],[new pe(w,a),null,[Math.PI/2,0,0]]],XYZ:[[new pe(new Vr(.1,0),h.clone()),[0,0,0]]],XY:[[new pe(new xt(.15,.15,.01),u.clone()),[.15,.15,0]]],YZ:[[new pe(new xt(.15,.15,.01),l.clone()),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new pe(new xt(.15,.15,.01),c.clone()),[.15,0,.15],[-Math.PI/2,0,0]]]},E={X:[[new pe(new Xt(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new pe(new Xt(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new pe(new Xt(.2,0,.6,4),n),[0,.3,0]],[new pe(new Xt(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new pe(new Xt(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new pe(new Xt(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new pe(new Vr(.2,0),n)]],XY:[[new pe(new xt(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new pe(new xt(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new pe(new xt(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]]},P={START:[[new pe(new Vr(.01,2),i),null,null,null,"helper"]],END:[[new pe(new Vr(.01,2),i),null,null,null,"helper"]],DELTA:[[new Hn(b(),i),null,null,null,"helper"]],X:[[new Hn(x,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new Hn(x,i.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new Hn(x,i.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},y={XYZE:[[new pe(g(.5,1),v),null,[0,Math.PI/2,0]]],X:[[new pe(g(.5,.5),s)]],Y:[[new pe(g(.5,.5),o),null,[0,0,-Math.PI/2]]],Z:[[new pe(g(.5,.5),a),null,[0,Math.PI/2,0]]],E:[[new pe(g(.75,1),d),null,[0,Math.PI/2,0]]]},T={AXIS:[[new Hn(x,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]]},L={XYZE:[[new pe(new Wi(.25,10,8),n)]],X:[[new pe(new rr(.5,.1,4,24),n),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new pe(new rr(.5,.1,4,24),n),[0,0,0],[Math.PI/2,0,0]]],Z:[[new pe(new rr(.5,.1,4,24),n),[0,0,0],[0,0,-Math.PI/2]]],E:[[new pe(new rr(.75,.1,2,24),n)]]},O={X:[[new pe(f,s),[.5,0,0],[0,0,-Math.PI/2]],[new pe(w,s),[0,0,0],[0,0,-Math.PI/2]],[new pe(f,s),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new pe(f,o),[0,.5,0]],[new pe(w,o)],[new pe(f,o),[0,-.5,0],[0,0,Math.PI]]],Z:[[new pe(f,a),[0,0,.5],[Math.PI/2,0,0]],[new pe(w,a),[0,0,0],[Math.PI/2,0,0]],[new pe(f,a),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new pe(new xt(.15,.15,.01),u),[.15,.15,0]]],YZ:[[new pe(new xt(.15,.15,.01),l),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new pe(new xt(.15,.15,.01),c),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new pe(new xt(.1,.1,.1),h.clone())]]},W={X:[[new pe(new Xt(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new pe(new Xt(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new pe(new Xt(.2,0,.6,4),n),[0,.3,0]],[new pe(new Xt(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new pe(new Xt(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new pe(new Xt(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new pe(new xt(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new pe(new xt(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new pe(new xt(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new pe(new xt(.2,.2,.2),n),[0,0,0]]]},U={X:[[new Hn(x,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new Hn(x,i.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new Hn(x,i.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function F(V){const $=new pt;for(const ne in V)for(let K=V[ne].length;K--;){const ee=V[ne][K][0].clone(),se=V[ne][K][1],Me=V[ne][K][2],j=V[ne][K][3],le=V[ne][K][4];ee.name=ne,ee.tag=le,se&&ee.position.set(se[0],se[1],se[2]),Me&&ee.rotation.set(Me[0],Me[1],Me[2]),j&&ee.scale.set(j[0],j[1],j[2]),ee.updateMatrix();const fe=ee.geometry.clone();fe.applyMatrix4(ee.matrix),ee.geometry=fe,ee.renderOrder=1/0,ee.position.set(0,0,0),ee.rotation.set(0,0,0),ee.scale.set(1,1,1),$.add(ee)}return $}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=F(M)),this.add(this.gizmo.rotate=F(y)),this.add(this.gizmo.scale=F(O)),this.add(this.picker.translate=F(E)),this.add(this.picker.rotate=F(L)),this.add(this.picker.scale=F(W)),this.add(this.helper.translate=F(P)),this.add(this.helper.rotate=F(T)),this.add(this.helper.scale=F(U)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){const n=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:ko;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let i=[];i=i.concat(this.picker[this.mode].children),i=i.concat(this.gizmo[this.mode].children),i=i.concat(this.helper[this.mode].children);for(let s=0;s<i.length;s++){const o=i[s];o.visible=!0,o.rotation.set(0,0,0),o.position.copy(this.worldPosition);let a;if(this.camera.isOrthographicCamera?a=(this.camera.top-this.camera.bottom)/this.camera.zoom:a=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),o.scale.set(1,1,1).multiplyScalar(a*this.size/4),o.tag==="helper"){o.visible=!1,o.name==="AXIS"?(o.visible=!!this.axis,this.axis==="X"&&(yt.setFromEuler(Io.set(0,0,0)),o.quaternion.copy(n).multiply(yt),Math.abs(ht.copy(As).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Y"&&(yt.setFromEuler(Io.set(0,0,Math.PI/2)),o.quaternion.copy(n).multiply(yt),Math.abs(ht.copy(tr).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Z"&&(yt.setFromEuler(Io.set(0,Math.PI/2,0)),o.quaternion.copy(n).multiply(yt),Math.abs(ht.copy(Cs).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="XYZE"&&(yt.setFromEuler(Io.set(0,Math.PI/2,0)),ht.copy(this.rotationAxis),o.quaternion.setFromRotationMatrix(Wu.lookAt(Hu,ht,tr)),o.quaternion.multiply(yt),o.visible=this.dragging),this.axis==="E"&&(o.visible=!1)):o.name==="START"?(o.position.copy(this.worldPositionStart),o.visible=this.dragging):o.name==="END"?(o.position.copy(this.worldPosition),o.visible=this.dragging):o.name==="DELTA"?(o.position.copy(this.worldPositionStart),o.quaternion.copy(this.worldQuaternionStart),gn.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),gn.applyQuaternion(this.worldQuaternionStart.clone().invert()),o.scale.copy(gn),o.visible=this.dragging):(o.quaternion.copy(n),this.dragging?o.position.copy(this.worldPositionStart):o.position.copy(this.worldPosition),this.axis&&(o.visible=this.axis.search(o.name)!==-1));continue}o.quaternion.copy(n),this.mode==="translate"||this.mode==="scale"?(o.name==="X"&&Math.abs(ht.copy(As).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Y"&&Math.abs(ht.copy(tr).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Z"&&Math.abs(ht.copy(Cs).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XY"&&Math.abs(ht.copy(Cs).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="YZ"&&Math.abs(ht.copy(As).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XZ"&&Math.abs(ht.copy(tr).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1)):this.mode==="rotate"&&(No.copy(n),ht.copy(this.eye).applyQuaternion(yt.copy(n).invert()),o.name.search("E")!==-1&&o.quaternion.setFromRotationMatrix(Wu.lookAt(this.eye,Hu,tr)),o.name==="X"&&(yt.setFromAxisAngle(As,Math.atan2(-ht.y,ht.z)),yt.multiplyQuaternions(No,yt),o.quaternion.copy(yt)),o.name==="Y"&&(yt.setFromAxisAngle(tr,Math.atan2(ht.x,ht.z)),yt.multiplyQuaternions(No,yt),o.quaternion.copy(yt)),o.name==="Z"&&(yt.setFromAxisAngle(Cs,Math.atan2(ht.y,ht.x)),yt.multiplyQuaternions(No,yt),o.quaternion.copy(yt))),o.visible=o.visible&&(o.name.indexOf("X")===-1||this.showX),o.visible=o.visible&&(o.name.indexOf("Y")===-1||this.showY),o.visible=o.visible&&(o.name.indexOf("Z")===-1||this.showZ),o.visible=o.visible&&(o.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),o.material._color=o.material._color||o.material.color.clone(),o.material._opacity=o.material._opacity||o.material.opacity,o.material.color.copy(o.material._color),o.material.opacity=o.material._opacity,this.enabled&&this.axis&&(o.name===this.axis||this.axis.split("").some(function(l){return o.name===l}))&&(o.material.color.setHex(16776960),o.material.opacity=1)}super.updateMatrixWorld(e)}}class $_ extends pe{constructor(){super(new pr(1e5,1e5,2,2),new oi({visible:!1,wireframe:!0,side:dn,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(e){let t=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(t="local"),Fo.copy(As).applyQuaternion(t==="local"?this.worldQuaternion:ko),Ms.copy(tr).applyQuaternion(t==="local"?this.worldQuaternion:ko),Ss.copy(Cs).applyQuaternion(t==="local"?this.worldQuaternion:ko),ht.copy(Ms),this.mode){case"translate":case"scale":switch(this.axis){case"X":ht.copy(this.eye).cross(Fo),$n.copy(Fo).cross(ht);break;case"Y":ht.copy(this.eye).cross(Ms),$n.copy(Ms).cross(ht);break;case"Z":ht.copy(this.eye).cross(Ss),$n.copy(Ss).cross(ht);break;case"XY":$n.copy(Ss);break;case"YZ":$n.copy(Fo);break;case"XZ":ht.copy(Ss),$n.copy(Ms);break;case"XYZ":case"E":$n.set(0,0,0);break}break;case"rotate":default:$n.set(0,0,0)}$n.length()===0?this.quaternion.copy(this.cameraQuaternion):(ju.lookAt(gn.set(0,0,0),$n,ht),this.quaternion.setFromRotationMatrix(ju)),super.updateMatrixWorld(e)}}function ey(r,e,t){e.traverse(n=>{n.material&&(r.properties.remove(n.material),n.material.dispose())}),r.info.programs.length=0,r.compile(e,t)}const Xu=({focus:r=0,size:e=25,samples:t=10}={})=>{const n=Ge.shadowmap_pars_fragment;return Ge.shadowmap_pars_fragment=Ge.shadowmap_pars_fragment.replace("#ifdef USE_SHADOWMAP",`#ifdef USE_SHADOWMAP

    #define PENUMBRA_FILTER_SIZE float(${e})
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
      float blockerDepthSum = float(${r});
      float blockers = 0.0;
    
      int j = 0;
      vec2 offset = vec2(0.);
      float depth = 0.;
    
      #pragma unroll_loop_start
      for(int i = 0; i < ${t}; i ++) {
        offset = (vogelDiskSample(j, ${t}, angle) * texelSize) * 2.0 * PENUMBRA_FILTER_SIZE;
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
      for (int i = 0; i < ${t}; i++) {
        vogelSample = vogelDiskSample(j, ${t}, angle) * texelSize;
        offset = vogelSample * (1.0 + filterRadius * float(${e}));
        shadow += step( zReceiver, unpackRGBAToDepth( texture2D( shadowMap, uv + offset ) ) );
        j++;
      }
      #pragma unroll_loop_end
      return shadow * 1.0 / ${t}.0;
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
return PCSS(shadowMap, shadowCoord);
#if defined( SHADOWMAP_TYPE_PCF )`),(i,s,o)=>{Ge.shadowmap_pars_fragment=n,ey(i,s,o)}};function _d(r,e,t,n){const i=class extends Vt{constructor(o={}){const a=Object.entries(r);super({uniforms:a.reduce((l,[c,u])=>{const h=ur.clone({[c]:{value:u}});return{...l,...h}},{}),vertexShader:e,fragmentShader:t}),this.key="",a.forEach(([l])=>Object.defineProperty(this,l,{get:()=>this.uniforms[l].value,set:c=>this.uniforms[l].value=c})),Object.assign(this,o),n&&n(this)}};return i.key=Br.generateUUID(),i}const ty=_d({},"void main() { }","void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");class ny extends Si{constructor(e=6,t=!1){super(),this.uniforms={chromaticAberration:{value:.05},transmission:{value:0},_transmission:{value:1},transmissionMap:{value:null},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new Ne("white")},anisotropy:{value:.1},time:{value:0},distortion:{value:0},distortionScale:{value:.5},temporalDistortion:{value:0},buffer:{value:null}},this.onBeforeCompile=n=>{n.uniforms={...n.uniforms,...this.uniforms},t?n.defines.USE_SAMPLER="":n.defines.USE_TRANSMISSION="",n.fragmentShader=`
      uniform float chromaticAberration;         
      uniform float anisotropy;      
      uniform float time;
      uniform float distortion;
      uniform float distortionScale;
      uniform float temporalDistortion;
      uniform sampler2D buffer;

      vec3 random3(vec3 c) {
        float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
        vec3 r;
        r.z = fract(512.0*j);
        j *= .125;
        r.x = fract(512.0*j);
        j *= .125;
        r.y = fract(512.0*j);
        return r-0.5;
      }

      float seed = 0.0;
      uint hash( uint x ) {
        x += ( x << 10u );
        x ^= ( x >>  6u );
        x += ( x <<  3u );
        x ^= ( x >> 11u );
        x += ( x << 15u );
        return x;
      }

      // Compound versions of the hashing algorithm I whipped together.
      uint hash( uvec2 v ) { return hash( v.x ^ hash(v.y)                         ); }
      uint hash( uvec3 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z)             ); }
      uint hash( uvec4 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z) ^ hash(v.w) ); }

      // Construct a float with half-open range [0:1] using low 23 bits.
      // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
      float floatConstruct( uint m ) {
        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32
        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
        m |= ieeeOne;                          // Add fractional part to 1.0
        float  f = uintBitsToFloat( m );       // Range [1:2]
        return f - 1.0;                        // Range [0:1]
      }

      // Pseudo-random value in half-open range [0:1].
      float random( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }
      float random( vec2  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float random( vec3  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float random( vec4  v ) { return floatConstruct(hash(floatBitsToUint(v))); }

      float rand() {
        float result = random(vec3(gl_FragCoord.xy, seed));
        seed += 1.0;
        return result;
      }

      const float F3 =  0.3333333;
      const float G3 =  0.1666667;

      float snoise(vec3 p) {
        vec3 s = floor(p + dot(p, vec3(F3)));
        vec3 x = p - s + dot(s, vec3(G3));
        vec3 e = step(vec3(0.0), x - x.yzx);
        vec3 i1 = e*(1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy*(1.0 - e);
        vec3 x1 = x - i1 + G3;
        vec3 x2 = x - i2 + 2.0*G3;
        vec3 x3 = x - 1.0 + 3.0*G3;
        vec4 w, d;
        w.x = dot(x, x);
        w.y = dot(x1, x1);
        w.z = dot(x2, x2);
        w.w = dot(x3, x3);
        w = max(0.6 - w, 0.0);
        d.x = dot(random3(s), x);
        d.y = dot(random3(s + i1), x1);
        d.z = dot(random3(s + i2), x2);
        d.w = dot(random3(s + 1.0), x3);
        w *= w;
        w *= w;
        d *= w;
        return dot(d, vec4(52.0));
      }

      float snoiseFractal(vec3 m) {
        return 0.5333333* snoise(m)
              +0.2666667* snoise(2.0*m)
              +0.1333333* snoise(4.0*m)
              +0.0666667* snoise(8.0*m);
      }
`+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("#include <transmission_pars_fragment>",`
        #ifdef USE_TRANSMISSION
          // Transmission code is based on glTF-Sampler-Viewer
          // https://github.com/KhronosGroup/glTF-Sample-Viewer
          uniform float _transmission;
          uniform float thickness;
          uniform float attenuationDistance;
          uniform vec3 attenuationColor;
          #ifdef USE_TRANSMISSIONMAP
            uniform sampler2D transmissionMap;
          #endif
          #ifdef USE_THICKNESSMAP
            uniform sampler2D thicknessMap;
          #endif
          uniform vec2 transmissionSamplerSize;
          uniform sampler2D transmissionSamplerMap;
          uniform mat4 modelMatrix;
          uniform mat4 projectionMatrix;
          varying vec3 vWorldPosition;
          vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
            // Direction of refracted light.
            vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
            // Compute rotation-independant scaling of the model matrix.
            vec3 modelScale;
            modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
            modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
            modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
            // The thickness is specified in local space.
            return normalize( refractionVector ) * thickness * modelScale;
          }
          float applyIorToRoughness( const in float roughness, const in float ior ) {
            // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
            // an IOR of 1.5 results in the default amount of microfacet refraction.
            return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
          }
          vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
            float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );            
            #ifdef USE_SAMPLER
              #ifdef texture2DLodEXT
                return texture2DLodEXT(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #else
                return texture2D(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #endif
            #else
              return texture2D(buffer, fragCoord.xy);
            #endif
          }
          vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
            if ( isinf( attenuationDistance ) ) {
              // Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.
              return radiance;
            } else {
              // Compute light attenuation using Beer's law.
              vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
              vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
              return transmittance * radiance;
            }
          }
          vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
            const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
            const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
            const in vec3 attenuationColor, const in float attenuationDistance ) {
            vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
            vec3 refractedRayExit = position + transmissionRay;
            // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
            vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
            vec2 refractionCoords = ndcPos.xy / ndcPos.w;
            refractionCoords += 1.0;
            refractionCoords /= 2.0;
            // Sample framebuffer to get pixel the refracted ray hits.
            vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
            vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
            // Get the specular component.
            vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
            return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
          }
        #endif
`),n.fragmentShader=n.fragmentShader.replace("#include <transmission_fragment>",`  
        // Improve the refraction to use the world pos
        material.transmission = _transmission;
        material.transmissionAlpha = 1.0;
        material.thickness = thickness;
        material.attenuationDistance = attenuationDistance;
        material.attenuationColor = attenuationColor;
        #ifdef USE_TRANSMISSIONMAP
          material.transmission *= texture2D( transmissionMap, vUv ).r;
        #endif
        #ifdef USE_THICKNESSMAP
          material.thickness *= texture2D( thicknessMap, vUv ).g;
        #endif
        
        vec3 pos = vWorldPosition;
        vec3 v = normalize( cameraPosition - pos );
        vec3 n = inverseTransformDirection( normal, viewMatrix );
        vec3 transmission = vec3(0.0);
        float transmissionR, transmissionB, transmissionG;
        float randomCoords = rand();
        float thickness_smear = thickness * max(pow(roughnessFactor, 0.33), anisotropy);
        vec3 distortionNormal = vec3(0.0);
        vec3 temporalOffset = vec3(time, -time, -time) * temporalDistortion;
        if (distortion > 0.0) {
          distortionNormal = distortion * vec3(snoiseFractal(vec3((pos * distortionScale + temporalOffset))), snoiseFractal(vec3(pos.zxy * distortionScale - temporalOffset)), snoiseFractal(vec3(pos.yxz * distortionScale + temporalOffset)));
        }
        for (float i = 0.0; i < ${e}.0; i ++) {
          vec3 sampleNorm = normalize(n + roughnessFactor * roughnessFactor * 2.0 * normalize(vec3(rand() - 0.5, rand() - 0.5, rand() - 0.5)) * pow(rand(), 0.33) + distortionNormal);
          transmissionR = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness  + thickness_smear * (i + randomCoords) / float(${e}),
            material.attenuationColor, material.attenuationDistance
          ).r;
          transmissionG = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior  * (1.0 + chromaticAberration * (i + randomCoords) / float(${e})) , material.thickness + thickness_smear * (i + randomCoords) / float(${e}),
            material.attenuationColor, material.attenuationDistance
          ).g;
          transmissionB = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior * (1.0 + 2.0 * chromaticAberration * (i + randomCoords) / float(${e})), material.thickness + thickness_smear * (i + randomCoords) / float(${e}),
            material.attenuationColor, material.attenuationDistance
          ).b;
          transmission.r += transmissionR;
          transmission.g += transmissionG;
          transmission.b += transmissionB;
        }
        transmission /= ${e}.0;
        totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
`)},Object.keys(this.uniforms).forEach(n=>Object.defineProperty(this,n,{get:()=>this.uniforms[n].value,set:i=>this.uniforms[n].value=i}))}}const na=new URL("assets/porsche_911_1975.336418ad.glb",location.href).href,iy=""+new URL("ulmer_muenster_1k-f1744c79.exr",import.meta.url).href,ry=""+new URL("ulmer_muenster-c72270fe.webp",import.meta.url).href,sy=""+new URL("wide_street_01_1k-48a1baf6.exr",import.meta.url).href,oy=""+new URL("wide_street_01-bd1bff94.webp",import.meta.url).href,ay=""+new URL("wide_street_02_1k-e164254f.exr",import.meta.url).href,ly=""+new URL("wide_street_02-b0d1a0ff.webp",import.meta.url).href,cy=""+new URL("kloppenheim_02_1k-3bfc9f61.exr",import.meta.url).href,uy=""+new URL("kloppenheim_02-b7800856.webp",import.meta.url).href,hy=""+new URL("dry_cracked_lake-54d5fdfd.avif",import.meta.url).href,dy=""+new URL("dry_cracked_lake_1k-48f18a7e.hdr",import.meta.url).href,fy=""+new URL("round_platform-0102a9f9.avif",import.meta.url).href,py=""+new URL("round_platform_1k-67f2ee28.exr",import.meta.url).href,my=""+new URL("skidpan-40377cab.avif",import.meta.url).href,gy=""+new URL("skidpan_1k-610d1329.hdr",import.meta.url).href,vy=""+new URL("dancing_hall-23457f13.avif",import.meta.url).href,xy=""+new URL("dancing_hall_1k-fa17ea5b.exr",import.meta.url).href,_y=""+new URL("empty_warehouse_01-0fa6d26b.avif",import.meta.url).href,yy=""+new URL("empty_warehouse_01_1k-8e757970.exr",import.meta.url).href,wy=""+new URL("old_hall-923a48b9.avif",import.meta.url).href,by=""+new URL("old_hall_1k-2e37cfd0.exr",import.meta.url).href,Xi={ulmer_muenster:{exr:iy,webP:ry,sunPos:[17,14,12],sunCol:"#ffffeb",shadowOpacity:.72,groundProj:{radius:25,height:2}},wide_street1:{exr:sy,webP:oy,sunPos:[15,24,11],sunCol:"#ffffeb",shadowOpacity:.85,groundProj:{radius:12,height:2}},wide_street2:{exr:ay,webP:ly,sunPos:[16,8,12],sunCol:"#ffffeb",shadowOpacity:.55,groundProj:{radius:25,height:2}},kloppenheim:{exr:cy,webP:uy,groundProj:{radius:25,height:2}},dry_cracked_lake:{hdr:dy,avif:hy,groundProj:{radius:20,height:2}},round_platform:{exr:py,avif:fy,groundProj:{radius:10,height:2.5}},skidpan:{hdr:gy,avif:my,groundProj:{radius:50,height:4.5}},dancing_hall:{avif:vy,exr:xy,groundProj:{radius:20,height:3}},empty_warehouse:{avif:_y,exr:yy,groundProj:{radius:19,height:6}},old_hall:{avif:wy,exr:by,groundProj:{radius:13,height:4}}};class ia extends ad{constructor(e){super(e),this.type=bt}parse(e){const a=function(g,b){switch(g){case 1:console.error("THREE.RGBELoader Read Error: "+(b||""));break;case 2:console.error("THREE.RGBELoader Write Error: "+(b||""));break;case 3:console.error("THREE.RGBELoader Bad File Format: "+(b||""));break;default:case 4:console.error("THREE.RGBELoader: Error: "+(b||""))}return-1},h=`
`,d=function(g,b,M){b=b||1024;let P=g.pos,y=-1,T=0,L="",O=String.fromCharCode.apply(null,new Uint16Array(g.subarray(P,P+128)));for(;0>(y=O.indexOf(h))&&T<b&&P<g.byteLength;)L+=O,T+=O.length,P+=128,O+=String.fromCharCode.apply(null,new Uint16Array(g.subarray(P,P+128)));return-1<y?(M!==!1&&(g.pos+=T+y+1),L+O.slice(0,y)):!1},m=function(g){const b=/^#\?(\S+)/,M=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,E=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,P=/^\s*FORMAT=(\S+)\s*$/,y=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,T={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let L,O;if(g.pos>=g.byteLength||!(L=d(g)))return a(1,"no header found");if(!(O=L.match(b)))return a(3,"bad initial token");for(T.valid|=1,T.programtype=O[1],T.string+=L+`
`;L=d(g),L!==!1;){if(T.string+=L+`
`,L.charAt(0)==="#"){T.comments+=L+`
`;continue}if((O=L.match(M))&&(T.gamma=parseFloat(O[1])),(O=L.match(E))&&(T.exposure=parseFloat(O[1])),(O=L.match(P))&&(T.valid|=2,T.format=O[1]),(O=L.match(y))&&(T.valid|=4,T.height=parseInt(O[1],10),T.width=parseInt(O[2],10)),T.valid&2&&T.valid&4)break}return T.valid&2?T.valid&4?T:a(3,"missing image size specifier"):a(3,"missing format specifier")},v=function(g,b,M){const E=b;if(E<8||E>32767||g[0]!==2||g[1]!==2||g[2]&128)return new Uint8Array(g);if(E!==(g[2]<<8|g[3]))return a(3,"wrong scanline width");const P=new Uint8Array(4*b*M);if(!P.length)return a(4,"unable to allocate buffer space");let y=0,T=0;const L=4*E,O=new Uint8Array(4),W=new Uint8Array(L);let U=M;for(;U>0&&T<g.byteLength;){if(T+4>g.byteLength)return a(1);if(O[0]=g[T++],O[1]=g[T++],O[2]=g[T++],O[3]=g[T++],O[0]!=2||O[1]!=2||(O[2]<<8|O[3])!=E)return a(3,"bad rgbe scanline format");let F=0,V;for(;F<L&&T<g.byteLength;){V=g[T++];const ne=V>128;if(ne&&(V-=128),V===0||F+V>L)return a(3,"bad scanline data");if(ne){const K=g[T++];for(let ee=0;ee<V;ee++)W[F++]=K}else W.set(g.subarray(T,T+V),F),F+=V,T+=V}const $=E;for(let ne=0;ne<$;ne++){let K=0;P[y]=W[ne+K],K+=E,P[y+1]=W[ne+K],K+=E,P[y+2]=W[ne+K],K+=E,P[y+3]=W[ne+K],y+=4}U--}return P},p=function(g,b,M,E){const P=g[b+3],y=Math.pow(2,P-128)/255;M[E+0]=g[b+0]*y,M[E+1]=g[b+1]*y,M[E+2]=g[b+2]*y,M[E+3]=1},f=function(g,b,M,E){const P=g[b+3],y=Math.pow(2,P-128)/255;M[E+0]=Hr.toHalfFloat(Math.min(g[b+0]*y,65504)),M[E+1]=Hr.toHalfFloat(Math.min(g[b+1]*y,65504)),M[E+2]=Hr.toHalfFloat(Math.min(g[b+2]*y,65504)),M[E+3]=Hr.toHalfFloat(1)},x=new Uint8Array(e);x.pos=0;const w=m(x);if(w!==-1){const g=w.width,b=w.height,M=v(x.subarray(x.pos),g,b);if(M!==-1){let E,P,y;switch(this.type){case ft:y=M.length/4;const T=new Float32Array(y*4);for(let O=0;O<y;O++)p(M,O*4,T,O*4);E=T,P=ft;break;case bt:y=M.length/4;const L=new Uint16Array(y*4);for(let O=0;O<y;O++)f(M,O*4,L,O*4);E=L,P=bt;break;default:console.error("THREE.RGBELoader: unsupported type: ",this.type);break}return{width:g,height:b,data:E,header:w.string,gamma:w.gamma,exposure:w.exposure,type:P}}}return null}setDataType(e){return this.type=e,this}load(e,t,n,i){function s(o,a){switch(o.type){case ft:case bt:o.encoding=yn,o.minFilter=Ve,o.magFilter=Ve,o.generateMipmaps=!1,o.flipY=!0;break}t&&t(o,a)}return super.load(e,s,n,i)}}let xl,$t,qn,qt,ei,Fs,Bn,_l=new _e;const Ji={environment:Xi.ulmer_muenster,groundProjection:!0,bgColor:new Ne,printCam:()=>{}},Ys=new fn,My=new ji,Sy=new io,Ty=new ia,yd=new to,wd=new so;let Wn;wd.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");yd.setDRACOLoader(wd);const qu=new us,Ir=[];let bd=()=>{},Go,Yu;async function Ey(r){Fs=r,Go=Fs.addFolder("Scene"),xl=new Ks,app.appendChild(xl.dom),$t=new mr({antialias:!0}),$t.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),$t.setSize(window.innerWidth,window.innerHeight),$t.shadowMap.enabled=!0,$t.shadowMap.type=Oi,$t.outputEncoding=He,$t.toneMapping=is,Yu=new es($t),Yu.compileCubemapShader(),app.appendChild($t.domElement),qn=new At(50,window.innerWidth/window.innerHeight,.1,200),qn.position.set(6,3,6),qn.name="Camera",qn.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),qt=new Hi,qt.add(Ys),ei=new oo(qn,$t.domElement),ei.enableDamping=!0,ei.dampingFactor=.05,ei.minDistance=.1,ei.maxDistance=100,ei.maxPolarAngle=Math.PI/1.5,ei.target.set(0,0,0),ei.target.set(0,0,0),Wn=new ta(qn,$t.domElement),Wn.addEventListener("dragging-changed",t=>{ei.enabled=!t.value,t.value}),Wn.addEventListener("change",()=>{Wn.object&&Wn.object.position.y<0&&(Wn.object.position.y=0)}),qt.add(Wn),window.addEventListener("resize",Cy),document.addEventListener("pointermove",Zu);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",t=>{Date.now()-e<200&&(Zu(t),Ry())}),Go.add(Wn,"mode",["translate","rotate","scale"]),Ay(),await Dy(),Md()}async function Ay(){let r=new fn,e=new eo(16777195,1);e.name="Dir. Light",e.castShadow=!0,e.shadow.camera.near=.1,e.shadow.camera.far=50,e.shadow.camera.right=15,e.shadow.camera.left=-15,e.shadow.camera.top=15,e.shadow.camera.bottom=-15,e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.radius=1.95,e.shadow.blurSamples=6,e.shadow.bias=-5e-4,r.add(e),qt.add(r);const t=new pe(new pr(10,10).rotateX(-Math.PI/2),new id({}));t.name="shadowFloor",t.receiveShadow=!0,t.position.set(0,0,0),qt.add(t);async function n(s){if(!s){qt.background=null,qt.environment=null;return}if(s.exr){const o=await Sy.loadAsync(s.exr);o.mapping=pn,qt.environment=o,console.log("exr loaded")}if(s.hdr){const o=await Ty.loadAsync(s.hdr);o.mapping=pn,qt.environment=o,console.log("exr loaded")}if(s.webP||s.avif){const o=await My.loadAsync(s.webP||s.avif);o.mapping=pn,o.encoding=He,qt.background=o,console.log("bg loaded"),Ji.groundProjection&&i(Ji.environment)}s.sunPos?(e.visible=!0,e.position.fromArray(s.sunPos)):e.visible=!1,s.sunCol?e.color.set(s.sunCol):e.color.set(16777215),s.shadowOpacity&&(t.material.opacity=s.shadowOpacity)}function i(s){Ji.groundProjection&&qt.background&&s.groundProj?(Bn||(Bn=new ro(qt.background),Bn.scale.setScalar(100)),Bn.material.uniforms.map.value=qt.background,Bn.radius=s.groundProj.radius,Bn.height=s.groundProj.height,Bn.parent||qt.add(Bn)):Bn&&Bn.parent&&Bn.removeFromParent()}n(Ji.environment),Go.add(Ji,"environment",Xi).onChange(s=>{n(s)}),Go.add(Ji,"groundProjection").onChange(s=>{i(Ji.environment)})}function Cy(){qn.aspect=window.innerWidth/window.innerHeight,qn.updateProjectionMatrix(),$t.setSize(window.innerWidth,window.innerHeight)}function Py(){xl.update(),ei.update(),bd(),$t.render(qt,qn)}function Md(){requestAnimationFrame(Md),Py()}function Ry(){if(qu.setFromCamera(_l,qn),qu.intersectObject(Ys,!0,Ir),!Ir.length){Wn.detach();return}Ir[0].object.selectOnRaycast?Wn.attach(Ir[0].object.selectOnRaycast):Wn.attach(Ir[0].object),Ir.length=0}function Zu(r){_l.x=r.clientX/window.innerWidth*2-1,_l.y=-(r.clientY/window.innerHeight)*2+1}async function Dy(){const r=new pe(new Wi(.5).translate(0,.5,0),new Kt({color:Ku(),roughness:0,metalness:1}));r.name="sphere",r.castShadow=!0,r.receiveShadow=!0,r.position.set(2,0,-1.5),Ys.add(r);const e=new pe(new xt(1,1,1).translate(0,.5,0),new Kt({color:Ku(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),Ys.add(e),Ly()}async function Ly(){const r={default:"def",physical:"phy",transmission:"tra"},e={carMaterial:r.default},t={renderEachMesh:!1,enabled:!1,customBackground:qt.background,backside:!0,thickness:1,backsideThickness:.5},n=[],s=(await yd.loadAsync(na)).scene;s.name="car";let o;const a=new ty,l=new ny(6,!1),c=new Si({roughness:0,transmission:1,thickness:1});s.traverse(b=>{if(b.isMesh){b.castShadow=!0,b.receiveShadow=!0,b.selectOnRaycast=s;const M=b.material;n.push({material:M,mesh:b,physical:c,transmission:l}),b.name==="body"&&(o=b)}}),Ys.add(s),Fs.add(e,"carMaterial",r).onChange(b=>{for(const M of n)b===r.default&&(M.mesh.material=M.material,t.enabled=!1),b===r.physical&&(M.mesh.material=M.physical,t.enabled=!1),b===r.transmission&&(M.mesh.material=M.transmission,t.enabled=!0)}),Iy(Fs,c),Ny(Fs,l,t);const u=new Ft(512,512,{minFilter:Ve,magFilter:Ve,encoding:$t.outputEncoding,type:bt}),h=new Ft(512,512,{minFilter:Ve,magFilter:Ve,encoding:$t.outputEncoding,type:bt}),d=l;d.buffer=h.texture;let m,v,p;const f={gl:$t,scene:qt,camera:qn};let x;const w=[{mesh:o,mat:l}],g=new ud(!0);bd=()=>{if(t.enabled){d.time=g.getElapsedTime(),t.renderEachMesh?x=n:x=w;for(let b=0;b<x.length;b++){const M=n[b].mesh;d.buffer===h.texture&&(v=f.gl.toneMapping,m=f.scene.background,p=M.material.side,f.gl.toneMapping=Zn,t.background&&(f.scene.background=t.background),M.material=a,t.backside&&(f.gl.setRenderTarget(u),f.gl.render(f.scene,f.camera),M.material=d,M.material.buffer=u.texture,M.material.thickness=t.backsideThickness,M.material.side=Ut),f.gl.setRenderTarget(h),f.gl.render(f.scene,f.camera),M.material.thickness=t.thickness,M.material.side=p,M.material.buffer=h.texture,f.scene.background=m,f.gl.setRenderTarget(null),M.material=d,f.gl.toneMapping=v)}}}}function Iy(r,e){const t=r.addFolder("Physical Material");t.addColor(e,"color"),t.addColor(e,"attenuationColor"),t.add(e,"attenuationDistance",0,2),t.add(e,"roughness",0,1),t.add(e,"transmission",0,1),t.add(e,"thickness",0,2),t.add(e,"reflectivity",0,1)}function Ny(r,e,t){const n=r.addFolder("Transmission Material");n.add(t,"enabled").name("Rendering Enabled").listen(),n.add(t,"backside"),n.add(t,"thickness",0,2),n.add(t,"backsideThickness",0,2),n.addColor(e,"color"),n.addColor(e,"attenuationColor"),n.add(e,"_transmission",0,1),n.add(e,"attenuationDistance",0,2),n.add(e,"roughness",0,1),n.add(e,"chromaticAberration",0,2),n.add(e,"distortion",0,10),n.add(e,"temporalDistortion",0,1),n.add(e,"anisotropy",0,10),n.add(e,"reflectivity",0,1),n.add(t,"renderEachMesh").name("⚠ Render Each Mesh separately")}const Fy=new Ne;function Ku(){return"#"+Fy.setHSL(Math.random(),.5,.5).getHexString()}const Uy=new URL("assets/room.afeffddc.glb",location.href).href;let yl,Rn,si,kr,ti,Ju,wl=new _e;new Ne;const Us=new fn;new ji;new io;const Sd=new to,Td=new so;let jn;Td.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");Sd.setDRACOLoader(Td);const Qu=new us,Nr=[];let $u,eh;async function Oy(r){Ju=r,$u=Ju.addFolder("Scene"),yl=new Ks,app.appendChild(yl.dom),Rn=new mr({antialias:!0}),Rn.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),Rn.setSize(window.innerWidth,window.innerHeight),Rn.shadowMap.enabled=!0,Rn.outputEncoding=He,Rn.toneMapping=is,eh=new es(Rn),eh.compileCubemapShader(),app.appendChild(Rn.domElement),si=new At(50,window.innerWidth/window.innerHeight,.1,200),si.position.set(6,3,6),si.name="Camera",si.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),kr=new Hi,kr.add(Us),ti=new oo(si,Rn.domElement),ti.enableDamping=!0,ti.dampingFactor=.05,ti.minDistance=.1,ti.maxDistance=100,ti.maxPolarAngle=Math.PI/1.5,ti.target.set(0,0,0),ti.target.set(0,0,0),jn=new ta(si,Rn.domElement),jn.addEventListener("dragging-changed",i=>{ti.enabled=!i.value,i.value}),jn.addEventListener("change",()=>{jn.object&&jn.object.position.y<0&&(jn.object.position.y=0)}),kr.add(jn),window.addEventListener("resize",ky),document.addEventListener("pointermove",th);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",i=>{Date.now()-e<200&&(th(i),By())}),$u.add(jn,"mode",["translate","rotate","scale"]),Xu({size:35,focus:.5,samples:16}),console.log(Xu);let t=new eo(16777195,5);t.name="Dir. Light",t.castShadow=!0,t.shadow.camera.near=.1,t.shadow.camera.far=50,t.shadow.camera.right=8.5,t.shadow.camera.left=-8.5,t.shadow.camera.top=8.5,t.shadow.camera.bottom=-8.5,t.shadow.mapSize.width=2048,t.shadow.mapSize.height=2048,t.shadow.bias=-.001,t.position.set(5,5,-8),kr.add(t);const n=new cd;kr.add(n),await Gy(),Ed()}function ky(){si.aspect=window.innerWidth/window.innerHeight,si.updateProjectionMatrix(),Rn.setSize(window.innerWidth,window.innerHeight)}function zy(){yl.update(),ti.update(),Rn.render(kr,si)}function Ed(){requestAnimationFrame(Ed),zy()}function By(){if(Qu.setFromCamera(wl,si),Qu.intersectObject(Us,!0,Nr),!Nr.length){jn.detach();return}Nr[0].object.selectOnRaycast?jn.attach(Nr[0].object.selectOnRaycast):jn.attach(Nr[0].object),Nr.length=0}function th(r){wl.x=r.clientX/window.innerWidth*2-1,wl.y=-(r.clientY/window.innerHeight)*2+1}async function Gy(){const r=new pe(new Wi(.5).translate(0,.5,0),new Kt({color:nh(),roughness:0,metalness:1}));r.name="sphere",r.castShadow=!0,r.receiveShadow=!0,r.position.set(2,0,-1.5),Us.add(r);const e=new pe(new xt(1,1,1).translate(0,.5,0),new Kt({color:nh(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),Us.add(e);const n=(await Sd.loadAsync(Uy)).scene;n.name="room",n.scale.setScalar(.5),n.position.set(0,-1,0),n.traverse(i=>{i.isMesh&&(i.castShadow=!0,i.receiveShadow=!0,i.selectOnRaycast=n,i.name==="Object_13"&&(console.log("FOUND",i),i.material.opacity=.5,i.material.transparent=!0,i.castShadow=!1,i.receiveShadow=!1))}),Us.add(n)}const Vy=new Ne;function nh(){return"#"+Vy.setHSL(Math.random(),.5,.5).getHexString()}const Hy=_d({depth:null,opacity:1,attenuation:2.5,anglePower:12,spotPosition:new I(0,0,0),lightColor:new Ne("white"),cameraNear:0,cameraFar:1,resolution:new _e(0,0),transparent:!0,depthWrite:!1},`
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vViewZ;
  varying float vIntensity;
  uniform vec3 spotPosition;
  uniform float attenuation;

  void main() {
    // compute intensity
    vNormal = normalize( normalMatrix * normal );
    vec4 worldPosition	= modelMatrix * vec4( position, 1.0 );
    vWorldPosition = worldPosition.xyz;
    vec4 viewPosition = viewMatrix * worldPosition;
    vViewZ = viewPosition.z;
    float intensity	= distance(worldPosition.xyz, spotPosition) / attenuation;
    intensity	= 1.0 - clamp(intensity, 0.0, 1.0);
    vIntensity = intensity;
    // set gl_Position
    gl_Position	= projectionMatrix * viewPosition;

  }`,`
  #include <packing>

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  uniform vec3 lightColor;
  uniform vec3 spotPosition;
  uniform float attenuation;
  uniform float anglePower;
  uniform sampler2D depth;
  uniform vec2 resolution;
  uniform float cameraNear;
  uniform float cameraFar;
  varying float vViewZ;
  varying float vIntensity;
  uniform float opacity;

  float readDepth( sampler2D depthSampler, vec2 coord ) {
    float fragCoordZ = texture2D( depthSampler, coord ).x;
    float viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);
    return viewZ;
  }

  void main() {
    float d = 1.0;
    bool isSoft = resolution[0] > 0.0 && resolution[1] > 0.0;
    if (isSoft) {
      vec2 sUv = gl_FragCoord.xy / resolution;
      d = readDepth(depth, sUv);
    }
    float intensity = vIntensity;
    vec3 normal	= vec3(vNormal.x, vNormal.y, abs(vNormal.z));
    float angleIntensity	= pow( dot(normal, vec3(0.0, 0.0, 1.0)), anglePower );
    intensity	*= angleIntensity;
    // fades when z is close to sampled depth, meaning the cone is intersecting existing geometry
    if (isSoft) {
      intensity	*= smoothstep(0., 1., vViewZ - d);
    }
    gl_FragColor = vec4(lightColor, intensity * opacity);

    #include <tonemapping_fragment>
    #include <encodings_fragment>
  }`);var Os={Linear:{None:function(r){return r}},Quadratic:{In:function(r){return r*r},Out:function(r){return r*(2-r)},InOut:function(r){return(r*=2)<1?.5*r*r:-.5*(--r*(r-2)-1)}},Cubic:{In:function(r){return r*r*r},Out:function(r){return--r*r*r+1},InOut:function(r){return(r*=2)<1?.5*r*r*r:.5*((r-=2)*r*r+2)}},Quartic:{In:function(r){return r*r*r*r},Out:function(r){return 1- --r*r*r*r},InOut:function(r){return(r*=2)<1?.5*r*r*r*r:-.5*((r-=2)*r*r*r-2)}},Quintic:{In:function(r){return r*r*r*r*r},Out:function(r){return--r*r*r*r*r+1},InOut:function(r){return(r*=2)<1?.5*r*r*r*r*r:.5*((r-=2)*r*r*r*r+2)}},Sinusoidal:{In:function(r){return 1-Math.cos(r*Math.PI/2)},Out:function(r){return Math.sin(r*Math.PI/2)},InOut:function(r){return .5*(1-Math.cos(Math.PI*r))}},Exponential:{In:function(r){return r===0?0:Math.pow(1024,r-1)},Out:function(r){return r===1?1:1-Math.pow(2,-10*r)},InOut:function(r){return r===0?0:r===1?1:(r*=2)<1?.5*Math.pow(1024,r-1):.5*(-Math.pow(2,-10*(r-1))+2)}},Circular:{In:function(r){return 1-Math.sqrt(1-r*r)},Out:function(r){return Math.sqrt(1- --r*r)},InOut:function(r){return(r*=2)<1?-.5*(Math.sqrt(1-r*r)-1):.5*(Math.sqrt(1-(r-=2)*r)+1)}},Elastic:{In:function(r){return r===0?0:r===1?1:-Math.pow(2,10*(r-1))*Math.sin((r-1.1)*5*Math.PI)},Out:function(r){return r===0?0:r===1?1:Math.pow(2,-10*r)*Math.sin((r-.1)*5*Math.PI)+1},InOut:function(r){return r===0?0:r===1?1:(r*=2,r<1?-.5*Math.pow(2,10*(r-1))*Math.sin((r-1.1)*5*Math.PI):.5*Math.pow(2,-10*(r-1))*Math.sin((r-1.1)*5*Math.PI)+1)}},Back:{In:function(r){var e=1.70158;return r*r*((e+1)*r-e)},Out:function(r){var e=1.70158;return--r*r*((e+1)*r+e)+1},InOut:function(r){var e=2.5949095;return(r*=2)<1?.5*(r*r*((e+1)*r-e)):.5*((r-=2)*r*((e+1)*r+e)+2)}},Bounce:{In:function(r){return 1-Os.Bounce.Out(1-r)},Out:function(r){return r<1/2.75?7.5625*r*r:r<2/2.75?7.5625*(r-=1.5/2.75)*r+.75:r<2.5/2.75?7.5625*(r-=2.25/2.75)*r+.9375:7.5625*(r-=2.625/2.75)*r+.984375},InOut:function(r){return r<.5?Os.Bounce.In(r*2)*.5:Os.Bounce.Out(r*2-1)*.5+.5}}},Ps;typeof self>"u"&&typeof process<"u"&&process.hrtime?Ps=function(){var r=process.hrtime();return r[0]*1e3+r[1]/1e6}:typeof self<"u"&&self.performance!==void 0&&self.performance.now!==void 0?Ps=self.performance.now.bind(self.performance):Date.now!==void 0?Ps=Date.now:Ps=function(){return new Date().getTime()};var zr=Ps,Wy=function(){function r(){this._tweens={},this._tweensAddedDuringUpdate={}}return r.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(t){return e._tweens[t]})},r.prototype.removeAll=function(){this._tweens={}},r.prototype.add=function(e){this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e},r.prototype.remove=function(e){delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]},r.prototype.update=function(e,t){e===void 0&&(e=zr()),t===void 0&&(t=!1);var n=Object.keys(this._tweens);if(n.length===0)return!1;for(;n.length>0;){this._tweensAddedDuringUpdate={};for(var i=0;i<n.length;i++){var s=this._tweens[n[i]],o=!t;s&&s.update(e,o)===!1&&!t&&delete this._tweens[n[i]]}n=Object.keys(this._tweensAddedDuringUpdate)}return!0},r}(),Rs={Linear:function(r,e){var t=r.length-1,n=t*e,i=Math.floor(n),s=Rs.Utils.Linear;return e<0?s(r[0],r[1],n):e>1?s(r[t],r[t-1],t-n):s(r[i],r[i+1>t?t:i+1],n-i)},Bezier:function(r,e){for(var t=0,n=r.length-1,i=Math.pow,s=Rs.Utils.Bernstein,o=0;o<=n;o++)t+=i(1-e,n-o)*i(e,o)*r[o]*s(n,o);return t},CatmullRom:function(r,e){var t=r.length-1,n=t*e,i=Math.floor(n),s=Rs.Utils.CatmullRom;return r[0]===r[t]?(e<0&&(i=Math.floor(n=t*(1+e))),s(r[(i-1+t)%t],r[i],r[(i+1)%t],r[(i+2)%t],n-i)):e<0?r[0]-(s(r[0],r[0],r[1],r[1],-n)-r[0]):e>1?r[t]-(s(r[t],r[t],r[t-1],r[t-1],n-t)-r[t]):s(r[i?i-1:0],r[i],r[t<i+1?t:i+1],r[t<i+2?t:i+2],n-i)},Utils:{Linear:function(r,e,t){return(e-r)*t+r},Bernstein:function(r,e){var t=Rs.Utils.Factorial;return t(r)/t(e)/t(r-e)},Factorial:function(){var r=[1];return function(e){var t=1;if(r[e])return r[e];for(var n=e;n>1;n--)t*=n;return r[e]=t,t}}(),CatmullRom:function(r,e,t,n,i){var s=(t-r)*.5,o=(n-e)*.5,a=i*i,l=i*a;return(2*e-2*t+s+o)*l+(-3*e+3*t-2*s-o)*a+s*i+e}}},Ad=function(){function r(){}return r.nextId=function(){return r._nextId++},r._nextId=0,r}(),Cd=new Wy,jy=function(){function r(e,t){t===void 0&&(t=Cd),this._object=e,this._group=t,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=Os.Linear.None,this._interpolationFunction=Rs.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._id=Ad.nextId(),this._isChainStopped=!1,this._goToEnd=!1}return r.prototype.getId=function(){return this._id},r.prototype.isPlaying=function(){return this._isPlaying},r.prototype.isPaused=function(){return this._isPaused},r.prototype.to=function(e,t){return this._valuesEnd=Object.create(e),t!==void 0&&(this._duration=t),this},r.prototype.duration=function(e){return this._duration=e,this},r.prototype.start=function(e){if(this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var t in this._valuesStartRepeat)this._swapEndStartRepeatValues(t),this._valuesStart[t]=this._valuesStartRepeat[t]}return this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e!==void 0?typeof e=="string"?zr()+parseFloat(e):e:zr(),this._startTime+=this._delayTime,this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat),this},r.prototype._setupProperties=function(e,t,n,i){for(var s in n){var o=e[s],a=Array.isArray(o),l=a?"array":typeof o,c=!a&&Array.isArray(n[s]);if(!(l==="undefined"||l==="function")){if(c){var u=n[s];if(u.length===0)continue;u=u.map(this._handleRelativeValue.bind(this,o)),n[s]=[o].concat(u)}if((l==="object"||a)&&o&&!c){t[s]=a?[]:{};for(var h in o)t[s][h]=o[h];i[s]=a?[]:{},this._setupProperties(o,t[s],n[s],i[s])}else typeof t[s]>"u"&&(t[s]=o),a||(t[s]*=1),c?i[s]=n[s].slice().reverse():i[s]=t[s]||0}}},r.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},r.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},r.prototype.pause=function(e){return e===void 0&&(e=zr()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this._group&&this._group.remove(this),this)},r.prototype.resume=function(e){return e===void 0&&(e=zr()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},r.prototype.stopChainedTweens=function(){for(var e=0,t=this._chainedTweens.length;e<t;e++)this._chainedTweens[e].stop();return this},r.prototype.group=function(e){return this._group=e,this},r.prototype.delay=function(e){return this._delayTime=e,this},r.prototype.repeat=function(e){return this._initialRepeat=e,this._repeat=e,this},r.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},r.prototype.yoyo=function(e){return this._yoyo=e,this},r.prototype.easing=function(e){return this._easingFunction=e,this},r.prototype.interpolation=function(e){return this._interpolationFunction=e,this},r.prototype.chain=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._chainedTweens=e,this},r.prototype.onStart=function(e){return this._onStartCallback=e,this},r.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},r.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},r.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},r.prototype.onStop=function(e){return this._onStopCallback=e,this},r.prototype.update=function(e,t){if(e===void 0&&(e=zr()),t===void 0&&(t=!0),this._isPaused)return!0;var n,i,s=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(e>s)return!1;t&&this.start(e)}if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),i=(e-this._startTime)/this._duration,i=this._duration===0||i>1?1:i;var o=this._easingFunction(i);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,o),this._onUpdateCallback&&this._onUpdateCallback(this._object,i),i===1)if(this._repeat>0){isFinite(this._repeat)&&this._repeat--;for(n in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[n]=="string"&&(this._valuesStartRepeat[n]=this._valuesStartRepeat[n]+parseFloat(this._valuesEnd[n])),this._yoyo&&this._swapEndStartRepeatValues(n),this._valuesStart[n]=this._valuesStartRepeat[n];return this._yoyo&&(this._reversed=!this._reversed),this._repeatDelayTime!==void 0?this._startTime=e+this._repeatDelayTime:this._startTime=e+this._delayTime,this._onRepeatCallback&&this._onRepeatCallback(this._object),!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var a=0,l=this._chainedTweens.length;a<l;a++)this._chainedTweens[a].start(this._startTime+this._duration);return this._isPlaying=!1,!1}return!0},r.prototype._updateProperties=function(e,t,n,i){for(var s in n)if(t[s]!==void 0){var o=t[s]||0,a=n[s],l=Array.isArray(e[s]),c=Array.isArray(a),u=!l&&c;u?e[s]=this._interpolationFunction(a,i):typeof a=="object"&&a?this._updateProperties(e[s],o,a,i):(a=this._handleRelativeValue(o,a),typeof a=="number"&&(e[s]=o+(a-o)*i))}},r.prototype._handleRelativeValue=function(e,t){return typeof t!="string"?t:t.charAt(0)==="+"||t.charAt(0)==="-"?e+parseFloat(t):parseFloat(t)},r.prototype._swapEndStartRepeatValues=function(e){var t=this._valuesStartRepeat[e],n=this._valuesEnd[e];typeof n=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(n):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=t},r}();Ad.nextId;var ci=Cd;ci.getAll.bind(ci);ci.removeAll.bind(ci);ci.add.bind(ci);ci.remove.bind(ci);var Xy=ci.update.bind(ci);let bl,en,Nn,nn,ni,Ml,Gn,Sl=new _e;const Ts={environment:Xi.kloppenheim,groundProjection:!1,bgColor:new Ne,printCam:()=>{}},Wr=new fn;new ji;const qy=new io,Yy=new ia,Pd=new to,Rd=new so;let xi;Rd.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");Pd.setDRACOLoader(Rd);const ih=new us,Ka=[];let Dd=()=>{},Vo,rh;async function Zy(r){Ml=r,Vo=Ml.addFolder("Scene"),bl=new Ks,app.appendChild(bl.dom),en=new mr({antialias:!0}),en.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),en.setSize(window.innerWidth,window.innerHeight),en.shadowMap.enabled=!0,en.shadowMap.type=Oi,en.outputEncoding=He,en.toneMapping=is,rh=new es(en),rh.compileCubemapShader(),app.appendChild(en.domElement),Nn=new At(50,window.innerWidth/window.innerHeight,.1,200),Nn.position.set(-16,16,16),Nn.name="Camera",nn=new Hi,nn.add(Wr),ni=new oo(Nn,en.domElement),ni.enableDamping=!0,ni.dampingFactor=.05,ni.minDistance=.1,ni.maxDistance=100,ni.maxPolarAngle=Math.PI/1.5,ni.target.set(0,0,0),ni.target.set(0,0,0),xi=new ta(Nn,en.domElement),xi.addEventListener("dragging-changed",t=>{ni.enabled=!t.value,t.value}),xi.addEventListener("change",()=>{xi.object&&xi.object.position.y<0&&(xi.object.position.y=0)}),nn.add(xi),window.addEventListener("resize",Jy),document.addEventListener("pointermove",sh);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",t=>{Date.now()-e<200&&(sh(t),$y())}),Vo.add(xi,"mode",["translate","rotate","scale"]),Ky(),await ew(),Ld()}async function Ky(){function r(t){if(!t){nn.background=null,nn.environment=null;return}t.exr&&qy.load(t.exr,n=>{n.mapping=pn,nn.environment=n}),t.hdr&&Yy.load(t.hdr,n=>{n.mapping=pn,nn.environment=n})}function e(t){Ts.groundProjection&&nn.background&&t.groundProj?(Gn||(Gn=new ro(nn.background),Gn.scale.setScalar(100)),Gn.material.uniforms.map.value=nn.background,Gn.radius=t.groundProj.radius,Gn.height=t.groundProj.height,Gn.parent||nn.add(Gn)):Gn&&Gn.parent&&Gn.removeFromParent()}r(Ts.environment),Vo.add(Ts,"environment",Xi).onChange(t=>{r(t)}),Vo.add(Ts,"groundProjection").onChange(t=>{e(Ts.environment)})}function Jy(){Nn.aspect=window.innerWidth/window.innerHeight,Nn.updateProjectionMatrix(),en.setSize(window.innerWidth,window.innerHeight)}function Qy(){bl.update(),Xy(),Dd(),ni.update(),en.render(nn,Nn)}function Ld(){requestAnimationFrame(Ld),Qy()}function $y(){ih.setFromCamera(Sl,Nn),ih.intersectObject(Wr,!0,Ka),Ka.length&&(Ka.length=0)}function sh(r){Sl.x=r.clientX/window.innerWidth*2-1,Sl.y=-(r.clientY/window.innerHeight)*2+1}async function ew(){const r=new pe(new Wi(.5).translate(0,.5,0),new Kt({color:Ja(),roughness:0,metalness:1}));r.name="sphere",r.castShadow=!0,r.receiveShadow=!0,r.position.set(2,0,-1.5),Wr.add(r);const e=new pe(new xt(1,1,1).translate(0,.5,0),new Kt({color:Ja(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),Wr.add(e);const t=new pe(new pr(10,10).rotateX(-Math.PI/2),new Kt({color:Ja(),roughness:.5,metalness:0}));t.name="floor",t.receiveShadow=!0,Wr.add(t);const i=(await Pd.loadAsync(na)).scene;i.name="car",i.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0,s.selectOnRaycast=i)}),Wr.add(i),tw()}function tw(){nn.add(new cd(16777215,.5));let r=1,e,t,n=16777215,i=5*4,s=.15*4,o=5;const a=new ld;a.intensity=3,a.position.set(5,5,5),a.angle=s,a.color.set(n),a.distance=i,a.castShadow=!0,a.shadow.bias=-1e-4;const l=new Qx(a);nn.add(a);const c=new Hy,u=new oi({transparent:!0,opacity:.25}),h={volumeMaterial:c,basicMaterial:u},[d,m]=iw({size:1024});c.spotPosition=a.position,c.opacity=r,c.lightColor=a.color,c.attenuation=a.distance,c.anglePower=o,c.cameraNear=Nn.near,c.cameraFar=Nn.far,e=e===void 0?.1:e,t=t===void 0?a.angle*7:t,console.log({volumeMaterial:c});const v=()=>{c.attenuation=a.distance,i=a.distance,t=Math.tan(a.angle)*a.distance,x.geometry=f(i,e,t)},p={materialType:h.volumeMaterial,helper:!1,useDepth:!1,updateVolumeGeometry:v,animateTarget:!1,animateLight:!1},f=(E,P,y)=>{const T=new Xt(P,y,E,128,64,!0);return T.translate(0,-E/2,0),T.rotateX(-Math.PI/2),T},x=new pe(f(i,e,t),c);v(),a.add(x);const w=new I;Dd=()=>{x.lookAt(a.target.getWorldPosition(w)),l.parent&&l.update(),p.useDepth&&(c.depth=null,m(),c.depth=d)};const g=oh(a.target.position,20,2e3,1e3),b=oh(a.position,20,2e3,1e3);function M(E){const P=E.addFolder("SpotLight Volume");P.open(),P.add(p,"materialType",h).onChange(T=>{x.material=T}),P.add(p,"useDepth").onChange(T=>{T?(c.depth=d,c.resolution=en.getSize(new _e)):(c.depth=null,c.resolution=new _e(0,0))}),P.add(c,"opacity",0,1),P.add(c,"attenuation",0,i),P.add(c,"anglePower",0,Math.PI),P.add(c,"cameraNear",0,10),P.add(c,"cameraFar",0,10);const y=E.addFolder("SpotLight");y.open(),y.add(p,"helper").onChange(T=>{T?nn.add(l):l.removeFromParent()}),y.addColor(a,"color"),y.add(a,"intensity",0,5),y.add(a,"angle",0,Math.PI/2).onChange(v),y.add(a,"penumbra",0,1),y.add(a,"distance",.1,20).onChange(v),y.add(a.shadow,"bias",-1e-4,1e-4),y.add(p,"animateTarget").name("🚲Animate target").onChange(T=>{T?g.start():g.stop()}),y.add(p,"animateLight").name("🚲Animate light").onChange(T=>{T?b.start():b.stop()})}xi.attach(a),M(Ml)}const nw=new Ne;function Ja(){return"#"+nw.setHSL(Math.random(),.5,.5).getHexString()}function iw({size:r=256,frames:e=1/0}={}){const t=en,n=r,i=r,s=new as(n,i);s.format=bi,s.type=qo,s.name="use_Depth_Buffer";let o=0;const a=rw(n,i,{depthTexture:s}),l=()=>{(e===1/0||o<e)&&(t.setRenderTarget(a),t.render(nn,Nn),t.setRenderTarget(null),o++)};return[a.depthTexture,l]}function oh(r,e,t,n){const i=new jy(r).to({x:Br.randFloatSpread(e),z:Br.randFloatSpread(e)},t).easing(Os.Bounce.Out).repeat(1e4).repeatDelay(n).onStart(()=>{s()}).onRepeat(()=>{s(),i.to({x:Br.randFloatSpread(6),z:Br.randFloatSpread(6)})}),s=()=>{i._valuesStart.x=r.x,i._valuesStart.z=r.z};return i}function rw(r,e,t){const n=en,i=r,s=e,o=t,{samples:a=0,depth:l,...c}=o;let u;return u=new Ft(i,s,{minFilter:Ve,magFilter:Ve,encoding:n.outputEncoding,type:bt,...c}),u.samples=a,u}/**
 * postprocessing v6.30.1 build Fri Feb 24 2023
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2023 Raoul van Rüschen
 * @license Zlib
 */var sw="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",tt={SKIP:9,SET:30,ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},or={NONE:0,DEPTH:1,CONVOLUTION:2},rt={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},ow=`#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;
#include <encodings_fragment>
#include <dithering_fragment>
}`,aw=class extends Vt{constructor(){super({name:"CopyMaterial",uniforms:{inputBuffer:new J(null),opacity:new J(1)},blending:Yn,depthWrite:!1,depthTest:!1,fragmentShader:ow,vertexShader:sw}),this.toneMapped=!1}set inputBuffer(r){this.uniforms.inputBuffer.value=r}setInputBuffer(r){this.uniforms.inputBuffer.value=r}getOpacity(r){return this.uniforms.opacity.value}setOpacity(r){this.uniforms.opacity.value=r}},lw=`#include <common>
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;
#if THREE_REVISION < 143
#define luminance(v) linearToRelativeLuminance(v)
#endif
#if THREE_REVISION >= 137
vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEADvoid main(){FRAGMENT_MAIN_UVvec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGEgl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <encodings_fragment>
#endif
#include <dithering_fragment>
}`,cw="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEADvoid main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORTgl_Position=vec4(position.xy,1.0,1.0);}",uw=class extends Vt{constructor(r,e,t,n,i=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:jo.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new J(null),depthBuffer:new J(null),resolution:new J(new _e),texelSize:new J(new _e),cameraNear:new J(.3),cameraFar:new J(1e3),aspect:new J(1),time:new J(0)},blending:Yn,depthWrite:!1,depthTest:!1,dithering:i}),this.toneMapped=!1,r&&this.setShaderParts(r),e&&this.setDefines(e),t&&this.setUniforms(t),this.copyCameraSettings(n)}set inputBuffer(r){this.uniforms.inputBuffer.value=r}setInputBuffer(r){this.uniforms.inputBuffer.value=r}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(r){this.uniforms.depthBuffer.value=r}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(r){this.defines.DEPTH_PACKING=r.toFixed(0),this.needsUpdate=!0}setDepthBuffer(r,e=Js){this.depthBuffer=r,this.depthPacking=e}setShaderData(r){this.setShaderParts(r.shaderParts),this.setDefines(r.defines),this.setUniforms(r.uniforms),this.setExtensions(r.extensions)}setShaderParts(r){var e,t,n,i,s;return this.fragmentShader=lw.replace(rt.FRAGMENT_HEAD,(e=r.get(rt.FRAGMENT_HEAD))!=null?e:"").replace(rt.FRAGMENT_MAIN_UV,(t=r.get(rt.FRAGMENT_MAIN_UV))!=null?t:"").replace(rt.FRAGMENT_MAIN_IMAGE,(n=r.get(rt.FRAGMENT_MAIN_IMAGE))!=null?n:""),this.vertexShader=cw.replace(rt.VERTEX_HEAD,(i=r.get(rt.VERTEX_HEAD))!=null?i:"").replace(rt.VERTEX_MAIN_SUPPORT,(s=r.get(rt.VERTEX_MAIN_SUPPORT))!=null?s:""),this.needsUpdate=!0,this}setDefines(r){for(const e of r.entries())this.defines[e[0]]=e[1];return this.needsUpdate=!0,this}setUniforms(r){for(const e of r.entries())this.uniforms[e[0]]=e[1];return this}setExtensions(r){this.extensions={};for(const e of r)this.extensions[e]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(r){this.encodeOutput!==r&&(r?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(r){return this.encodeOutput}setOutputEncodingEnabled(r){this.encodeOutput=r}get time(){return this.uniforms.time.value}set time(r){this.uniforms.time.value=r}setDeltaTime(r){this.uniforms.time.value+=r}adoptCameraSettings(r){this.copyCameraSettings(r)}copyCameraSettings(r){r&&(this.uniforms.cameraNear.value=r.near,this.uniforms.cameraFar.value=r.far,r instanceof At?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(r,e){const t=this.uniforms;t.resolution.value.set(r,e),t.texelSize.value.set(1/r,1/e),t.aspect.value=r/e}static get Section(){return rt}},hw=new Zo,Ii=null;function dw(){if(Ii===null){const r=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]);Ii=new Pt,Ii.setAttribute!==void 0?(Ii.setAttribute("position",new Mt(r,3)),Ii.setAttribute("uv",new Mt(e,2))):(Ii.addAttribute("position",new Mt(r,3)),Ii.addAttribute("uv",new Mt(e,2)))}return Ii}var wn=class{constructor(r="Pass",e=new Hi,t=hw){this.name=r,this.renderer=null,this.scene=e,this.camera=t,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(r){if(this.rtt===r){const e=this.fullscreenMaterial;e!==null&&(e.needsUpdate=!0),this.rtt=!r}}set mainScene(r){}set mainCamera(r){}setRenderer(r){this.renderer=r}isEnabled(){return this.enabled}setEnabled(r){this.enabled=r}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(r){let e=this.screen;e!==null?e.material=r:(e=new pe(dw(),r),e.frustumCulled=!1,this.scene===null&&(this.scene=new Hi),this.scene.add(e),this.screen=e)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(r){this.fullscreenMaterial=r}getDepthTexture(){return null}setDepthTexture(r,e=Js){}render(r,e,t,n,i){throw new Error("Render method not implemented!")}setSize(r,e){}initialize(r,e,t){}dispose(){for(const r of Object.keys(this)){const e=this[r];(e instanceof Ft||e instanceof En||e instanceof Ct||e instanceof wn)&&this[r].dispose()}}},fw=class extends wn{constructor(e,t=!0){super("CopyPass"),this.fullscreenMaterial=new aw,this.needsSwap=!1,this.renderTarget=e,e===void 0&&(this.renderTarget=new Ft(1,1,{minFilter:Ve,magFilter:Ve,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=t}get resize(){return this.autoResize}set resize(e){this.autoResize=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(e){this.autoResize=e}render(e,t,n,i,s){this.fullscreenMaterial.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){this.autoResize&&this.renderTarget.setSize(e,t)}initialize(e,t,n){n!==void 0&&(this.renderTarget.texture.type=n,n!==Fn?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":e.outputEncoding===He&&(this.renderTarget.texture.encoding=He))}},pw=class extends wn{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(r,e,t,n,i){const s=r.state.buffers.stencil;s.setLocked(!1),s.setTest(!1)}},ah=new Ne,Id=class extends wn{constructor(r=!0,e=!0,t=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=r,this.depth=e,this.stencil=t,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(r,e,t){this.color=r,this.depth=e,this.stencil=t}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(r){this.overrideClearColor=r}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(r){this.overrideClearAlpha=r}render(r,e,t,n,i){const s=this.overrideClearColor,o=this.overrideClearAlpha,a=r.getClearAlpha(),l=s!==null,c=o>=0;l?(r.getClearColor(ah),r.setClearColor(s,c?o:a)):c&&r.setClearAlpha(o),r.setRenderTarget(this.renderToScreen?null:e),r.clear(this.color,this.depth,this.stencil),l?r.setClearColor(ah,a):c&&r.setClearAlpha(a)}},Qa=!1,lh=class{constructor(r=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(r),this.meshCount=0,this.replaceMaterial=e=>{if(e.isMesh){let t;if(e.material.flatShading)switch(e.material.side){case dn:t=this.materialsFlatShadedDoubleSide;break;case Ut:t=this.materialsFlatShadedBackSide;break;default:t=this.materialsFlatShaded;break}else switch(e.material.side){case dn:t=this.materialsDoubleSide;break;case Ut:t=this.materialsBackSide;break;default:t=this.materials;break}this.originalMaterials.set(e,e.material),e.isSkinnedMesh?e.material=t[2]:e.isInstancedMesh?e.material=t[1]:e.material=t[0],++this.meshCount}}}setMaterial(r){if(this.disposeMaterials(),this.material=r,r!==null){const e=this.materials=[r.clone(),r.clone(),r.clone()];for(const t of e)t.uniforms=Object.assign({},r.uniforms),t.side=li;e[2].skinning=!0,this.materialsBackSide=e.map(t=>{const n=t.clone();return n.uniforms=Object.assign({},r.uniforms),n.side=Ut,n}),this.materialsDoubleSide=e.map(t=>{const n=t.clone();return n.uniforms=Object.assign({},r.uniforms),n.side=dn,n}),this.materialsFlatShaded=e.map(t=>{const n=t.clone();return n.uniforms=Object.assign({},r.uniforms),n.flatShading=!0,n}),this.materialsFlatShadedBackSide=e.map(t=>{const n=t.clone();return n.uniforms=Object.assign({},r.uniforms),n.flatShading=!0,n.side=Ut,n}),this.materialsFlatShadedDoubleSide=e.map(t=>{const n=t.clone();return n.uniforms=Object.assign({},r.uniforms),n.flatShading=!0,n.side=dn,n})}}render(r,e,t){const n=r.shadowMap.enabled;if(r.shadowMap.enabled=!1,Qa){const i=this.originalMaterials;this.meshCount=0,e.traverse(this.replaceMaterial),r.render(e,t);for(const s of i)s[0].material=s[1];this.meshCount!==i.size&&i.clear()}else{const i=e.overrideMaterial;e.overrideMaterial=this.material,r.render(e,t),e.overrideMaterial=i}r.shadowMap.enabled=n}disposeMaterials(){if(this.material!==null){const r=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(const e of r)e.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return Qa}static set workaroundEnabled(r){Qa=r}},ks=class extends wn{constructor(r,e,t=null){super("RenderPass",r,e),this.needsSwap=!1,this.clearPass=new Id,this.overrideMaterialManager=t===null?null:new lh(t),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(r){this.scene=r}set mainCamera(r){this.camera=r}get renderToScreen(){return super.renderToScreen}set renderToScreen(r){super.renderToScreen=r,this.clearPass.renderToScreen=r}get overrideMaterial(){const r=this.overrideMaterialManager;return r!==null?r.material:null}set overrideMaterial(r){const e=this.overrideMaterialManager;r!==null?e!==null?e.setMaterial(r):this.overrideMaterialManager=new lh(r):e!==null&&(e.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(r){this.overrideMaterial=r}get clear(){return this.clearPass.enabled}set clear(r){this.clearPass.enabled=r}getSelection(){return this.selection}setSelection(r){this.selection=r}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(r){this.ignoreBackground=r}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(r){this.skipShadowMapUpdate=r}getClearPass(){return this.clearPass}render(r,e,t,n,i){const s=this.scene,o=this.camera,a=this.selection,l=o.layers.mask,c=s.background,u=r.shadowMap.autoUpdate,h=this.renderToScreen?null:e;a!==null&&o.layers.set(a.getLayer()),this.skipShadowMapUpdate&&(r.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(s.background=null),this.clearPass.enabled&&this.clearPass.render(r,e),r.setRenderTarget(h),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(r,s,o):r.render(s,o),o.layers.mask=l,s.background=c,r.shadowMap.autoUpdate=u}};function ch(r,e,t){for(const n of e){const i="$1"+r+n.charAt(0).toUpperCase()+n.slice(1),s=new RegExp("([^\\.])(\\b"+n+"\\b)","g");for(const o of t.entries())o[1]!==null&&t.set(o[0],o[1].replace(s,i))}}function mw(r,e,t){var n,i,s,o,a;let l=e.getFragmentShader(),c=e.getVertexShader();const u=l!==void 0&&/mainImage/.test(l),h=l!==void 0&&/mainUv/.test(l);if(t.attributes|=e.getAttributes(),l===void 0)throw new Error(`Missing fragment shader (${e.name})`);if(h&&t.attributes&or.CONVOLUTION)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);if(!u&&!h)throw new Error(`Could not find mainImage or mainUv function (${e.name})`);{const d=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,m=t.shaderParts;let v=(n=m.get(rt.FRAGMENT_HEAD))!=null?n:"",p=(i=m.get(rt.FRAGMENT_MAIN_UV))!=null?i:"",f=(s=m.get(rt.FRAGMENT_MAIN_IMAGE))!=null?s:"",x=(o=m.get(rt.VERTEX_HEAD))!=null?o:"",w=(a=m.get(rt.VERTEX_MAIN_SUPPORT))!=null?a:"";const g=new Set,b=new Set;if(h&&(p+=`	${r}MainUv(UV);
`,t.uvTransformation=!0),c!==null&&/mainSupport/.test(c)){const P=/mainSupport *\([\w\s]*?uv\s*?\)/.test(c);w+=`	${r}MainSupport(`,w+=P?`vUv);
`:`);
`;for(const y of c.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(const T of y[1].split(/\s*,\s*/))t.varyings.add(T),g.add(T),b.add(T);for(const y of c.matchAll(d))b.add(y[1])}for(const P of l.matchAll(d))b.add(P[1]);for(const P of e.defines.keys())b.add(P.replace(/\([\w\s,]*\)/g,""));for(const P of e.uniforms.keys())b.add(P);b.delete("while"),b.delete("for"),b.delete("if"),e.uniforms.forEach((P,y)=>t.uniforms.set(r+y.charAt(0).toUpperCase()+y.slice(1),P)),e.defines.forEach((P,y)=>t.defines.set(r+y.charAt(0).toUpperCase()+y.slice(1),P));const M=new Map([["fragment",l],["vertex",c]]);ch(r,b,t.defines),ch(r,b,M),l=M.get("fragment"),c=M.get("vertex");const E=e.blendMode;if(t.blendModes.set(E.blendFunction,E),u){e.inputColorSpace!==null&&e.inputColorSpace!==t.colorSpace&&(f+=e.inputColorSpace===He?`color0 = LinearTosRGB(color0);
	`:`color0 = sRGBToLinear(color0);
	`),e.outputColorSpace!==null?t.colorSpace=e.outputColorSpace:e.inputColorSpace!==null&&(t.colorSpace=e.inputColorSpace);const P=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;f+=`${r}MainImage(color0, UV, `,t.attributes&or.DEPTH&&P.test(l)&&(f+="depth, ",t.readDepth=!0),f+=`color1);
	`;const y=r+"BlendOpacity";t.uniforms.set(y,E.opacity),f+=`color0 = blend${E.blendFunction}(color0, color1, ${y});

	`,v+=`uniform float ${y};

`}if(v+=l+`
`,c!==null&&(x+=c+`
`),m.set(rt.FRAGMENT_HEAD,v),m.set(rt.FRAGMENT_MAIN_UV,p),m.set(rt.FRAGMENT_MAIN_IMAGE,f),m.set(rt.VERTEX_HEAD,x),m.set(rt.VERTEX_MAIN_SUPPORT,w),e.extensions!==null)for(const P of e.extensions)t.extensions.add(P)}}var gw=class extends wn{constructor(r,...e){super("EffectPass"),this.fullscreenMaterial=new uw(null,null,null,r),this.listener=t=>this.handleEvent(t),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(r){for(const e of this.effects)e.mainScene=r}set mainCamera(r){this.fullscreenMaterial.copyCameraSettings(r);for(const e of this.effects)e.mainCamera=r}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(r){this.fullscreenMaterial.encodeOutput=r}get dithering(){return this.fullscreenMaterial.dithering}set dithering(r){const e=this.fullscreenMaterial;e.dithering=r,e.needsUpdate=!0}setEffects(r){for(const e of this.effects)e.removeEventListener("change",this.listener);this.effects=r.sort((e,t)=>t.attributes-e.attributes);for(const e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){const r=new ww;let e=0;for(const o of this.effects)if(o.blendMode.blendFunction===tt.DST)r.attributes|=o.getAttributes()&or.DEPTH;else{if(r.attributes&o.getAttributes()&or.CONVOLUTION)throw new Error(`Convolution effects cannot be merged (${o.name})`);mw("e"+e++,o,r)}let t=r.shaderParts.get(rt.FRAGMENT_HEAD),n=r.shaderParts.get(rt.FRAGMENT_MAIN_IMAGE),i=r.shaderParts.get(rt.FRAGMENT_MAIN_UV);const s=/\bblend\b/g;for(const o of r.blendModes.values())t+=o.getShaderCode().replace(s,`blend${o.blendFunction}`)+`
`;r.attributes&or.DEPTH?(r.readDepth&&(n=`float depth = readDepth(UV);

	`+n),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,r.colorSpace===He&&(n+=`color0 = sRGBToLinear(color0);
	`),r.uvTransformation?(i=`vec2 transformedUv = vUv;
`+i,r.defines.set("UV","transformedUv")):r.defines.set("UV","vUv"),r.shaderParts.set(rt.FRAGMENT_HEAD,t),r.shaderParts.set(rt.FRAGMENT_MAIN_IMAGE,n),r.shaderParts.set(rt.FRAGMENT_MAIN_UV,i),r.shaderParts.forEach((o,a,l)=>l.set(a,o==null?void 0:o.trim().replace(/^#/,`
#`))),this.skipRendering=e===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(r)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(r,e=Js){this.fullscreenMaterial.depthBuffer=r,this.fullscreenMaterial.depthPacking=e;for(const t of this.effects)t.setDepthTexture(r,e)}render(r,e,t,n,i){for(const s of this.effects)s.update(r,e,n);if(!this.skipRendering||this.renderToScreen){const s=this.fullscreenMaterial;s.inputBuffer=e.texture,s.time+=n*this.timeScale,r.setRenderTarget(this.renderToScreen?null:t),r.render(this.scene,this.camera)}}setSize(r,e){this.fullscreenMaterial.setSize(r,e);for(const t of this.effects)t.setSize(r,e)}initialize(r,e,t){this.renderer=r;for(const n of this.effects)n.initialize(r,e,t);this.updateMaterial(),t!==void 0&&t!==Fn&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(const r of this.effects)r.removeEventListener("change",this.listener),r.dispose()}handleEvent(r){switch(r.type){case"change":this.recompile();break}}},vw=class extends wn{constructor(r,e){super("MaskPass",r,e),this.needsSwap=!1,this.clearPass=new Id(!1,!1,!0),this.inverse=!1}set mainScene(r){this.scene=r}set mainCamera(r){this.camera=r}get inverted(){return this.inverse}set inverted(r){this.inverse=r}get clear(){return this.clearPass.enabled}set clear(r){this.clearPass.enabled=r}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(r){this.inverted=r}render(r,e,t,n,i){const s=r.getContext(),o=r.state.buffers,a=this.scene,l=this.camera,c=this.clearPass,u=this.inverted?0:1,h=1-u;o.color.setMask(!1),o.depth.setMask(!1),o.color.setLocked(!0),o.depth.setLocked(!0),o.stencil.setTest(!0),o.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),o.stencil.setFunc(s.ALWAYS,u,4294967295),o.stencil.setClear(h),o.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(r,null):(c.render(r,e),c.render(r,t))),this.renderToScreen?(r.setRenderTarget(null),r.render(a,l)):(r.setRenderTarget(e),r.render(a,l),r.setRenderTarget(t),r.render(a,l)),o.color.setLocked(!1),o.depth.setLocked(!1),o.stencil.setLocked(!1),o.stencil.setFunc(s.EQUAL,1,4294967295),o.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),o.stencil.setLocked(!0)}},$a=1/1e3,xw=1e3,_w=class{constructor(){this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(r){typeof document<"u"&&document.hidden!==void 0&&(r?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=r)}get delta(){return this._delta*$a}get fixedDelta(){return this._fixedDelta*$a}set fixedDelta(r){this._fixedDelta=r*xw}get elapsed(){return this._elapsed*$a}update(r){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=r!==void 0?r:performance.now(),this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()}handleEvent(r){document.hidden||(this.currentTime=performance.now())}dispose(){this.autoReset=!1}},yw=class{constructor(r=null,{depthBuffer:e=!0,stencilBuffer:t=!1,multisampling:n=0,frameBufferType:i}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,t,i,n),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new fw,this.depthTexture=null,this.passes=[],this.timer=new _w,this.autoRenderToScreen=!0,this.setRenderer(r)}get multisampling(){return this.inputBuffer.samples||0}set multisampling(r){const e=this.inputBuffer,t=this.multisampling;t>0&&r>0?(this.inputBuffer.samples=r,this.outputBuffer.samples=r,this.inputBuffer.dispose(),this.outputBuffer.dispose()):t!==r&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(e.depthBuffer,e.stencilBuffer,e.texture.type,r),this.inputBuffer.depthTexture=this.depthTexture,this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(r){if(this.renderer=r,r!==null){const e=r.getSize(new _e),t=r.getContext().getContextAttributes().alpha,n=this.inputBuffer.texture.type;n===Fn&&r.outputEncoding===He&&(this.inputBuffer.texture.encoding=He,this.outputBuffer.texture.encoding=He,this.inputBuffer.dispose(),this.outputBuffer.dispose()),r.autoClear=!1,this.setSize(e.width,e.height);for(const i of this.passes)i.initialize(r,t,n)}}replaceRenderer(r,e=!0){const t=this.renderer,n=t.domElement.parentNode;return this.setRenderer(r),e&&n!==null&&(n.removeChild(t.domElement),n.appendChild(r.domElement)),t}createDepthTexture(){const r=this.depthTexture=new as;return this.inputBuffer.depthTexture=r,this.inputBuffer.dispose(),this.inputBuffer.stencilBuffer?(r.format=lr,r.type=sr):r.type=ki,r}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.inputBuffer.depthTexture=null,this.inputBuffer.dispose();for(const r of this.passes)r.setDepthTexture(null)}}createBuffer(r,e,t,n){const i=this.renderer,s=i===null?new _e:i.getDrawingBufferSize(new _e),o={minFilter:Ve,magFilter:Ve,stencilBuffer:e,depthBuffer:r,type:t},a=new Ft(s.width,s.height,o);return n>0&&(a.ignoreDepthForMultisampleCopy=!1,a.samples=n),t===Fn&&i!==null&&i.outputEncoding===He&&(a.texture.encoding=He),a.texture.name="EffectComposer.Buffer",a.texture.generateMipmaps=!1,a}setMainScene(r){for(const e of this.passes)e.mainScene=r}setMainCamera(r){for(const e of this.passes)e.mainCamera=r}addPass(r,e){const t=this.passes,n=this.renderer,i=n.getDrawingBufferSize(new _e),s=n.getContext().getContextAttributes().alpha,o=this.inputBuffer.texture.type;if(r.setRenderer(n),r.setSize(i.width,i.height),r.initialize(n,s,o),this.autoRenderToScreen&&(t.length>0&&(t[t.length-1].renderToScreen=!1),r.renderToScreen&&(this.autoRenderToScreen=!1)),e!==void 0?t.splice(e,0,r):t.push(r),this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!0),r.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){const a=this.createDepthTexture();for(r of t)r.setDepthTexture(a)}else r.setDepthTexture(this.depthTexture)}removePass(r){const e=this.passes,t=e.indexOf(r);if(t!==-1&&e.splice(t,1).length>0){if(this.depthTexture!==null){const s=(a,l)=>a||l.needsDepthTexture;e.reduce(s,!1)||(r.getDepthTexture()===this.depthTexture&&r.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&t===e.length&&(r.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){const r=this.passes;this.deleteDepthTexture(),r.length>0&&(this.autoRenderToScreen&&(r[r.length-1].renderToScreen=!1),this.passes=[])}render(r){const e=this.renderer,t=this.copyPass;let n=this.inputBuffer,i=this.outputBuffer,s=!1,o,a,l;r===void 0&&(this.timer.update(),r=this.timer.delta);for(const c of this.passes)c.enabled&&(c.render(e,n,i,r,s),c.needsSwap&&(s&&(t.renderToScreen=c.renderToScreen,o=e.getContext(),a=e.state.buffers.stencil,a.setFunc(o.NOTEQUAL,1,4294967295),t.render(e,n,i,r,s),a.setFunc(o.EQUAL,1,4294967295)),l=n,n=i,i=l),c instanceof vw?s=!0:c instanceof pw&&(s=!1))}setSize(r,e,t){const n=this.renderer,i=n.getSize(new _e);(r===void 0||e===void 0)&&(r=i.width,e=i.height),(i.width!==r||i.height!==e)&&n.setSize(r,e,t);const s=n.getDrawingBufferSize(new _e);this.inputBuffer.setSize(s.width,s.height),this.outputBuffer.setSize(s.width,s.height);for(const o of this.passes)o.setSize(s.width,s.height)}reset(){const r=this.timer.autoReset;this.dispose(),this.autoRenderToScreen=!0,this.timer.autoReset=r}dispose(){for(const r of this.passes)r.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose()}},ww=class{constructor(){this.shaderParts=new Map([[rt.FRAGMENT_HEAD,null],[rt.FRAGMENT_MAIN_UV,null],[rt.FRAGMENT_MAIN_IMAGE,null],[rt.VERTEX_HEAD,null],[rt.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=or.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=yn}},bw=class extends Set{constructor(r,e=10){super(),this.l=e,this.exclusive=!1,r!==void 0&&this.set(r)}get layer(){return this.l}set layer(r){const e=this.l;for(const t of this)t.layers.disable(e),t.layers.enable(r);this.l=r}getLayer(){return this.layer}setLayer(r){this.layer=r}isExclusive(){return this.exclusive}setExclusive(r){this.exclusive=r}clear(){const r=this.layer;for(const e of this)e.layers.disable(r);return super.clear()}set(r){this.clear();for(const e of r)this.add(e);return this}indexOf(r){return this.has(r)?0:-1}add(r){return this.exclusive?r.layers.set(this.layer):r.layers.enable(this.layer),super.add(r)}delete(r){return this.has(r)&&r.layers.disable(this.layer),super.delete(r)}toggle(r){let e;return this.has(r)?(this.delete(r),e=!1):(this.add(r),e=!0),e}setVisible(r){for(const e of this)r?e.layers.enable(0):e.layers.disable(0);return this}},Mw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y,opacity);}",Sw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,min(y.a,opacity));}",Tw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y)*0.5,opacity);}",Ew="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.rg,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",Aw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(step(0.0,y)*(1.0-min(vec4(1.0),(1.0-x)/y)),vec4(1.0),step(1.0,x));return mix(x,z,opacity);}",Cw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=step(0.0,x)*mix(min(vec4(1.0),x/max(1.0-y,1e-9)),vec4(1.0),step(1.0,y));return mix(x,z,opacity);}",Pw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x,y),opacity);}",Rw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,abs(x-y),opacity);}",Dw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x/max(y,1e-12),opacity);}",Lw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y-2.0*x*y),opacity);}",Iw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 a=min(x,1.0),b=min(y,1.0);vec4 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,y));return mix(x,z,opacity);}",Nw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,step(1.0,x+y),opacity);}",Fw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.r,xHSL.gb));return vec4(mix(x.rgb,z,opacity),y.a);}",Uw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-y,opacity);}",Ow="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y*(1.0-x),opacity);}",kw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x,y),opacity);}",zw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(y+x-1.0,0.0,1.0),opacity);}",Bw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x+y,1.0),opacity);}",Gw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(2.0*y+x-1.0,0.0,1.0),opacity);}",Vw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.rg,yHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",Hw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x*y,opacity);}",Ww="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-abs(1.0-x-y),opacity);}",jw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,opacity);}",Xw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(2.0*y*x,1.0-2.0*(1.0-y)*(1.0-x),step(0.5,x));return mix(x,z,opacity);}",qw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 z=mix(mix(y2,x,step(0.5*x,y)),max(vec4(0.0),y2-1.0),step(x,(y2-1.0)));return mix(x,z,opacity);}",Yw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(min(x*x/max(1.0-y,1e-12),1.0),y,step(1.0,y));return mix(x,z,opacity);}",Zw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.r,yHSL.g,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",Kw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y-min(x*y,1.0),opacity);}",Jw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 w=step(0.5,y);vec4 z=mix(x-(1.0-y2)*x*(1.0-x),mix(x+(y2-1.0)*(sqrt(x)-x),x+(y2-1.0)*x*((16.0*x-12.0)*x+3.0),w*(1.0-step(0.25,x))),w);return mix(x,z,opacity);}",Qw="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}",$w="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x+y-1.0,0.0),opacity);}",eb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(max(1.0-min((1.0-x)/(2.0*y),1.0),0.0),min(x/(2.0*(1.0-y)),1.0),step(0.5,y));return mix(x,z,opacity);}",tb=new Map([[tt.ADD,Mw],[tt.ALPHA,Sw],[tt.AVERAGE,Tw],[tt.COLOR,Ew],[tt.COLOR_BURN,Aw],[tt.COLOR_DODGE,Cw],[tt.DARKEN,Pw],[tt.DIFFERENCE,Rw],[tt.DIVIDE,Dw],[tt.DST,null],[tt.EXCLUSION,Lw],[tt.HARD_LIGHT,Iw],[tt.HARD_MIX,Nw],[tt.HUE,Fw],[tt.INVERT,Uw],[tt.INVERT_RGB,Ow],[tt.LIGHTEN,kw],[tt.LINEAR_BURN,zw],[tt.LINEAR_DODGE,Bw],[tt.LINEAR_LIGHT,Gw],[tt.LUMINOSITY,Vw],[tt.MULTIPLY,Hw],[tt.NEGATION,Ww],[tt.NORMAL,jw],[tt.OVERLAY,Xw],[tt.PIN_LIGHT,qw],[tt.REFLECT,Yw],[tt.SATURATION,Zw],[tt.SCREEN,Kw],[tt.SOFT_LIGHT,Jw],[tt.SRC,Qw],[tt.SUBTRACT,$w],[tt.VIVID_LIGHT,eb]]),nb=class extends Mi{constructor(r,e=1){super(),this._blendFunction=r,this.opacity=new J(e)}getOpacity(){return this.opacity.value}setOpacity(r){this.opacity.value=r}get blendFunction(){return this._blendFunction}set blendFunction(r){this._blendFunction=r,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(r){this.blendFunction=r}getShaderCode(){return tb.get(this.blendFunction)}},jl=class extends Mi{constructor(r,e,{attributes:t=or.NONE,blendFunction:n=tt.NORMAL,defines:i=new Map,uniforms:s=new Map,extensions:o=null,vertexShader:a=null}={}){super(),this.name=r,this.renderer=null,this.attributes=t,this.fragmentShader=e,this.vertexShader=a,this.defines=i,this.uniforms=s,this.extensions=o,this.blendMode=new nb(n),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=yn,this._outputColorSpace=null}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(r){this._inputColorSpace=r,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(r){this._outputColorSpace=r,this.setChanged()}set mainScene(r){}set mainCamera(r){}getName(){return this.name}setRenderer(r){this.renderer=r}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(r){this.attributes=r,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(r){this.fragmentShader=r,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(r){this.vertexShader=r,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(r,e=Js){}update(r,e,t){}setSize(r,e){}initialize(r,e,t){}dispose(){for(const r of Object.keys(this)){const e=this[r];(e instanceof Ft||e instanceof En||e instanceof Ct||e instanceof wn)&&this[r].dispose()}}};new I;new Ue;new Ne;new I;new I;const ra=r=>{const e=[r],t=[];for(;e.length!==0;){const n=e.shift();n.material&&t.push(n);for(const i of n.children)i.visible&&e.push(i)}return t},Fr=(r,e,t,n,i)=>{i?e[t]!==r[t]&&(r[t]=e[t],r.uniforms[t].value=e[t],e[t]?(r.defines[n]="",n==="USE_NORMALMAP"&&(r.defines.TANGENTSPACE_NORMALMAP="")):delete r.defines[n],r.needsUpdate=!0):r[t]!==void 0&&(r[t]=void 0,r.uniforms[t].value=void 0,delete r.defines[n],r.needsUpdate=!0)},ib=r=>{const{width:e,height:t}=r.image;return Math.floor(Math.log2(Math.max(e,t)))+1},Nd=r=>{let e=r.material.uniforms.prevBoneTexture.value;if(e&&e.image.width===r.skeleton.boneTexture.width)e=r.material.uniforms.prevBoneTexture.value,e.image.data.set(r.skeleton.boneTexture.image.data);else{var t;(t=e)==null||t.dispose();const n=r.skeleton.boneTexture.image.data.slice(),i=r.skeleton.boneTexture.image.width;e=new qr(n,i,i,sn,ft),r.material.uniforms.prevBoneTexture.value=e,e.needsUpdate=!0}},rb=(r,e)=>{var t;(t=r.skeleton)!=null&&t.boneTexture&&(r.material.uniforms.boneTexture.value=r.skeleton.boneTexture,"USE_SKINNING"in r.material.defines||(r.material.defines.USE_SKINNING="",r.material.defines.BONE_TEXTURE="",r.material.needsUpdate=!0)),r.modelViewMatrix.multiplyMatrices(e.matrixWorldInverse,r.matrixWorld),r.material.uniforms.velocityMatrix.value.multiplyMatrices(e.projectionMatrix,r.modelViewMatrix)},sb=(r,e)=>{var t;r.material.uniforms.prevVelocityMatrix.value.multiplyMatrices(e.projectionMatrix,r.modelViewMatrix),(t=r.skeleton)!=null&&t.boneTexture&&Nd(r)},ob=()=>{if(Ge.envmap_physical_pars_fragment.includes("iblRadianceDisabled")||(Ge.envmap_physical_pars_fragment=Ge.envmap_physical_pars_fragment.replace("vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {",`
		uniform bool iblRadianceDisabled;
	
		vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		 if(iblRadianceDisabled) return vec3(0.);
		`)),"iblRadianceDisabled"in rn.physical.uniforms)return rn.physical.uniforms.iblRadianceDisabled;const r={value:!1};rn.physical.uniforms.iblRadianceDisabled=r;const{clone:e}=ur;return ur.clone=t=>{const n=e(t);return"iblRadianceDisabled"in t&&(n.iblRadianceDisabled=r),n},r},ab=()=>{if(Ge.envmap_physical_pars_fragment.includes("iblIrradianceDisabled")||(Ge.envmap_physical_pars_fragment=Ge.envmap_physical_pars_fragment.replace("vec3 getIBLIrradiance( const in vec3 normal ) {",`
			uniform bool iblIrradianceDisabled;
		
			vec3 getIBLIrradiance( const in vec3 normal ) {
			 if(iblIrradianceDisabled) return vec3(0.);
			`)),"iblIrradianceDisabled"in rn.physical.uniforms)return rn.physical.uniforms.iblIrradianceDisabled;const r={value:!1};rn.physical.uniforms.iblIrradianceDisabled=r;const{clone:e}=ur;return ur.clone=t=>{const n=e(t);return"iblIrradianceDisabled"in t&&(n.iblIrradianceDisabled=r),n},r},lb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xl(r){return r.replace(lb,cb)}function cb(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}const Fd=r=>r instanceof ro,ql=(r,e=r.material)=>e.visible&&e.depthWrite&&e.depthTest&&(!e.transparent||e.opacity>0)&&!Fd(r),Ud=(r,e)=>{const t=["vertexTangent","vertexColors","vertexAlphas","vertexUvs","uvsVertexOnly","supportsVertexTextures","instancing","instancingColor","side","flatShading","skinning","doubleSided","flipSided"];for(const n of t)e[n]=r[n]};var sa=`#define GLSLIFY 1
varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}`;class ub extends wn{constructor(e=1){super("CopyPass"),this.needsSwap=!1,this.renderTarget=new cr(1,1,1,{depthBuffer:!1}),this.setTextureCount(e)}setTextureCount(e){var t;let n="",i="";for(let s=0;s<e;s++)n+=`
				uniform sampler2D inputTexture${s};
				layout(location = ${s}) out vec4 gOutput${s};
			`,i+=`gOutput${s} = textureLod(inputTexture${s}, vUv, 0.);`;(t=this.fullscreenMaterial)==null||t.dispose(),this.fullscreenMaterial=new Vt({fragmentShader:`
            varying vec2 vUv;
			
			${n}

            void main() {
				${i}
            }
            `,vertexShader:sa,glslVersion:Vi});for(let s=0;s<e;s++)if(this.fullscreenMaterial.uniforms["inputTexture"+s]=new J(null),s>=this.renderTarget.texture.length){const o=this.renderTarget.texture[0].clone();o.isRenderTargetTexture=!0,this.renderTarget.texture.push(o)}}setSize(e,t){this.renderTarget.setSize(e,t)}render(e){e.setRenderTarget(this.renderTarget),e.render(this.scene,this.camera)}}var hb=`#define GLSLIFY 1
varying vec2 vUv;uniform sampler2D velocityTexture;uniform sampler2D depthTexture;uniform sampler2D lastDepthTexture;uniform float blend;uniform bool constantBlend;uniform bool fullAccumulate;uniform vec2 invTexSize;uniform mat4 projectionMatrix;uniform mat4 projectionMatrixInverse;uniform mat4 cameraMatrixWorld;uniform vec3 cameraPos;uniform mat4 prevViewMatrix;uniform mat4 prevCameraMatrixWorld;uniform mat4 prevProjectionMatrix;uniform mat4 prevProjectionMatrixInverse;uniform bool reset;uniform float delta;
#define EPSILON 0.00001
#include <packing>
#include <reproject>
void main(){vec4 depthTexel;float depth;getDepthAndDilatedUVOffset(depthTexture,vUv,depth,dilatedDepth,depthTexel);vec2 dilatedUv=vUv+dilatedUvOffset;if(dot(depthTexel.rgb,depthTexel.rgb)==0.0){
#ifdef neighborhoodClamping
#pragma unroll_loop_start
for(int i=0;i<textureCount;i++){gOutput[i]=textureLod(inputTexture[i],vUv,0.0);}
#pragma unroll_loop_end
#else
discard;
#endif
return;}vec4 inputTexel[textureCount];vec4 accumulatedTexel[textureCount];bool textureSampledThisFrame[textureCount];
#pragma unroll_loop_start
for(int i=0;i<textureCount;i++){inputTexel[i]=textureLod(inputTexture[i],vUv,0.0);doColorTransform[i]=luminance(inputTexel[i].rgb)>0.0;textureSampledThisFrame[i]=any(greaterThanEqual(inputTexel[i].rgb,vec3(0.0)));if(textureSampledThisFrame[i]){transformColor(inputTexel[i].rgb);}else{inputTexel[i].rgb=vec3(0.0);}texIndex++;}
#pragma unroll_loop_end
texIndex=0;velocityTexel=textureLod(velocityTexture,vUv,0.0);vec3 worldNormal=Decode(velocityTexel.ba);vec3 worldPos=screenSpaceToWorldSpace(vUv,depth,cameraMatrixWorld,projectionMatrixInverse);vec2 reprojectedUvDiffuse=vec2(-10.0);vec2 reprojectedUvSpecular[textureCount];vec2 reprojectedUv;bool reprojectHitPoint;vec3 clampedColor;
#pragma unroll_loop_start
for(int i=0;i<textureCount;i++){reprojectHitPoint=reprojectSpecular[i]&&inputTexel[i].a>0.0;if(reprojectHitPoint){reprojectedUvSpecular[i]=getReprojectedUV(neighborhoodClamping[i],neighborhoodClampingDisocclusionTest[i],depth,worldPos,worldNormal,inputTexel[i].a);}else{reprojectedUvSpecular[i]=vec2(-1.0);}if(reprojectedUvDiffuse.x==-10.0&&reprojectedUvSpecular[i].x<0.0){reprojectedUvDiffuse=getReprojectedUV(neighborhoodClamping[i],neighborhoodClampingDisocclusionTest[i],depth,worldPos,worldNormal,0.0);}reprojectedUv=reprojectedUvSpecular[i].x>=0.0 ? reprojectedUvSpecular[i]: reprojectedUvDiffuse;if(reprojectedUv.x<0.0){accumulatedTexel[i]=vec4(inputTexel[i].rgb,1.0);}else{accumulatedTexel[i]=sampleReprojectedTexture(accumulatedTexture[i],reprojectedUv,catmullRomSampling[i]);transformColor(accumulatedTexel[i].rgb);if(textureSampledThisFrame[i]){accumulatedTexel[i].a++;if(neighborhoodClamping[i]){clampedColor=accumulatedTexel[i].rgb;clampNeighborhood(inputTexture[i],clampedColor,inputTexel[i].rgb);accumulatedTexel[i].rgb=clampedColor;}}else{inputTexel[i].rgb=accumulatedTexel[i].rgb;}}texIndex++;}
#pragma unroll_loop_end
texIndex=0;vec2 deltaUv=vUv-reprojectedUv;bool didMove=dot(deltaUv,deltaUv)>=0.0000000001;float maxValue=(fullAccumulate&&!didMove)? 1.0 : blend;vec3 outputColor;float temporalReprojectMix;float m=1.-delta/(1./60.);float fpsAdjustedBlend=blend+max(0.,(1.-blend)*m);
#pragma unroll_loop_start
for(int i=0;i<textureCount;i++){temporalReprojectMix=fpsAdjustedBlend;if(reset)accumulatedTexel[i].a=0.0;if(!constantBlend)temporalReprojectMix=min(1.-1./(accumulatedTexel[i].a+1.0),maxValue);outputColor=mix(inputTexel[i].rgb,accumulatedTexel[i].rgb,temporalReprojectMix);undoColorTransform(outputColor);gOutput[i]=vec4(outputColor,accumulatedTexel[i].a);texIndex++;}
#pragma unroll_loop_end
#ifdef useCustomComposeShader
customComposeShader
#endif
}`,db=`#define GLSLIFY 1
vec4 velocityTexel;float dilatedDepth;vec2 dilatedUvOffset;int texIndex;
#define luminance(a) dot(vec3(0.2125, 0.7154, 0.0721), a)
vec3 screenSpaceToWorldSpace(const vec2 uv,const float depth,mat4 curMatrixWorld,const mat4 projMatrixInverse){vec4 ndc=vec4((uv.x-0.5)*2.0,(uv.y-0.5)*2.0,(depth-0.5)*2.0,1.0);vec4 clip=projMatrixInverse*ndc;vec4 view=curMatrixWorld*(clip/clip.w);return view.xyz;}vec2 viewSpaceToScreenSpace(const vec3 position,const mat4 projMatrix){vec4 projectedCoord=projMatrix*vec4(position,1.0);projectedCoord.xy/=projectedCoord.w;projectedCoord.xy=projectedCoord.xy*0.5+0.5;return projectedCoord.xy;}bool doColorTransform[textureCount];
#ifdef logTransform
void transformColor(inout vec3 color){if(!doColorTransform[texIndex])return;float lum=luminance(color);float diff=min(1.0,lum-0.99);if(diff>0.0){color=vec3(diff*0.1);return;}color=log(max(color,vec3(EPSILON)));}void undoColorTransform(inout vec3 color){if(!doColorTransform[texIndex])return;color=exp(color);}
#else
#define transformColor
#define undoColorTransform
#endif
void getNeighborhoodAABB(const sampler2D tex,inout vec3 minNeighborColor,inout vec3 maxNeighborColor){for(int x=-2;x<=2;x++){for(int y=-2;y<=2;y++){if(x!=0||y!=0){vec2 offset=vec2(x,y)*invTexSize;vec2 neighborUv=vUv+offset;vec4 neighborTexel=textureLod(tex,neighborUv,0.0);transformColor(neighborTexel.rgb);minNeighborColor=min(neighborTexel.rgb,minNeighborColor);maxNeighborColor=max(neighborTexel.rgb,maxNeighborColor);}}}}void clampNeighborhood(const sampler2D tex,inout vec3 color,const vec3 inputColor){vec3 minNeighborColor=inputColor;vec3 maxNeighborColor=inputColor;getNeighborhoodAABB(tex,minNeighborColor,maxNeighborColor);color=clamp(color,minNeighborColor,maxNeighborColor);}
#ifdef dilation
void getDilatedDepthUVOffset(const sampler2D tex,const vec2 centerUv,out float depth,out float dilatedDepth,out vec4 closestDepthTexel){float closestDepth=0.0;for(int x=-1;x<=1;x++){for(int y=-1;y<=1;y++){vec2 offset=vec2(x,y)*invTexSize;vec2 neighborUv=centerUv+offset;vec4 neighborDepthTexel=textureLod(tex,neighborUv,0.0);float neighborDepth=unpackRGBAToDepth(neighborDepthTexel);if(x==0&&y==0)depth=neighborDepth;if(neighborDepth>closestDepth){closestDepth=neighborDepth;closestDepthTexel=neighborDepthTexel;dilatedUvOffset=offset;}}}dilatedDepth=closestDepth;}
#endif
void getDepthAndDilatedUVOffset(sampler2D depthTex,vec2 uv,out float depth,out float dilatedDepth,out vec4 depthTexel){
#ifdef dilation
getDilatedDepthUVOffset(depthTex,uv,depth,dilatedDepth,depthTexel);
#else
depthTexel=textureLod(depthTex,uv,0.);depth=unpackRGBAToDepth(depthTexel);dilatedDepth=depth;
#endif
}bool planeDistanceDisocclusionCheck(const vec3 worldPos,const vec3 lastWorldPos,const vec3 worldNormal,const float worldDistFactor){vec3 toCurrent=worldPos-lastWorldPos;float distToPlane=abs(dot(toCurrent,worldNormal));return distToPlane>depthDistance*worldDistFactor;}bool worldDistanceDisocclusionCheck(const vec3 worldPos,const vec3 lastWorldPos,const float worldDistFactor){return distance(worldPos,lastWorldPos)>worldDistance*worldDistFactor;}bool validateReprojectedUV(const vec2 reprojectedUv,const bool neighborhoodClamp,const bool neighborhoodClampDisocclusionTest,const float depth,const vec3 worldPos,const vec3 worldNormal){if(any(lessThan(reprojectedUv,vec2(0.)))||any(greaterThan(reprojectedUv,vec2(1.))))return false;if(neighborhoodClamp&&!neighborhoodClampDisocclusionTest)return true;vec3 dilatedWorldPos=worldPos;float dilatedLastDepth,lastDepth;vec4 lastDepthTexel;vec2 dilatedReprojectedUv;
#ifdef dilation
dilatedWorldPos=screenSpaceToWorldSpace(vUv+dilatedUvOffset,dilatedDepth,cameraMatrixWorld,projectionMatrixInverse);getDepthAndDilatedUVOffset(lastDepthTexture,reprojectedUv,lastDepth,dilatedLastDepth,lastDepthTexel);dilatedReprojectedUv=reprojectedUv+dilatedUvOffset;
#else
lastDepthTexel=textureLod(lastDepthTexture,reprojectedUv,0.);lastDepth=unpackRGBAToDepth(lastDepthTexel);dilatedLastDepth=lastDepth;dilatedReprojectedUv=reprojectedUv;
#endif
vec3 lastWorldPos=screenSpaceToWorldSpace(dilatedReprojectedUv,dilatedLastDepth,prevCameraMatrixWorld,prevProjectionMatrixInverse);float worldDistFactor=clamp((50.0+distance(dilatedWorldPos,cameraPos))/100.,0.25,1.);if(worldDistanceDisocclusionCheck(dilatedWorldPos,lastWorldPos,worldDistFactor))return false;return!planeDistanceDisocclusionCheck(dilatedWorldPos,lastWorldPos,worldNormal,worldDistFactor);}vec2 reprojectHitPoint(const vec3 rayOrig,const float rayLength,const float depth){vec3 cameraRay=normalize(rayOrig-cameraPos);float cameraRayLength=distance(rayOrig,cameraPos);vec3 parallaxHitPoint=cameraPos+cameraRay*(cameraRayLength+rayLength);vec4 reprojectedParallaxHitPoint=prevViewMatrix*vec4(parallaxHitPoint,1.0);vec2 hitPointUv=viewSpaceToScreenSpace(reprojectedParallaxHitPoint.xyz,prevProjectionMatrix);return hitPointUv;}vec2 getReprojectedUV(const bool neighborhoodClamp,const bool neighborhoodClampDisocclusionTest,const float depth,const vec3 worldPos,const vec3 worldNormal,const float rayLength){if(rayLength!=0.0){vec2 reprojectedUv=reprojectHitPoint(worldPos,rayLength,depth);if(validateReprojectedUV(reprojectedUv,neighborhoodClamp,neighborhoodClampDisocclusionTest,depth,worldPos,worldNormal)){return reprojectedUv;}return vec2(-1.);}vec2 reprojectedUv=vUv-velocityTexel.rg;if(validateReprojectedUV(reprojectedUv,neighborhoodClamp,neighborhoodClampDisocclusionTest,depth,worldPos,worldNormal)){return reprojectedUv;}return vec2(-1.);}vec4 SampleTextureCatmullRom(const sampler2D tex,const vec2 uv,const vec2 texSize){vec2 samplePos=uv*texSize;vec2 texPos1=floor(samplePos-0.5f)+0.5f;vec2 f=samplePos-texPos1;vec2 w0=f*(-0.5f+f*(1.0f-0.5f*f));vec2 w1=1.0f+f*f*(-2.5f+1.5f*f);vec2 w2=f*(0.5f+f*(2.0f-1.5f*f));vec2 w3=f*f*(-0.5f+0.5f*f);vec2 w12=w1+w2;vec2 offset12=w2/(w1+w2);vec2 texPos0=texPos1-1.;vec2 texPos3=texPos1+2.;vec2 texPos12=texPos1+offset12;texPos0/=texSize;texPos3/=texSize;texPos12/=texSize;vec4 result=vec4(0.0);result+=textureLod(tex,vec2(texPos0.x,texPos0.y),0.0f)*w0.x*w0.y;result+=textureLod(tex,vec2(texPos12.x,texPos0.y),0.0f)*w12.x*w0.y;result+=textureLod(tex,vec2(texPos3.x,texPos0.y),0.0f)*w3.x*w0.y;result+=textureLod(tex,vec2(texPos0.x,texPos12.y),0.0f)*w0.x*w12.y;result+=textureLod(tex,vec2(texPos12.x,texPos12.y),0.0f)*w12.x*w12.y;result+=textureLod(tex,vec2(texPos3.x,texPos12.y),0.0f)*w3.x*w12.y;result+=textureLod(tex,vec2(texPos0.x,texPos3.y),0.0f)*w0.x*w3.y;result+=textureLod(tex,vec2(texPos12.x,texPos3.y),0.0f)*w12.x*w3.y;result+=textureLod(tex,vec2(texPos3.x,texPos3.y),0.0f)*w3.x*w3.y;result=max(result,vec4(0.));return result;}vec4 getTexel(const sampler2D tex,vec2 p){p=p/invTexSize+0.5;vec2 i=floor(p);vec2 f=p-i;f=f*f*f*(f*(f*6.0-15.0)+10.0);p=i+f;p=(p-0.5)*invTexSize;return textureLod(tex,p,0.0);}vec4 sampleReprojectedTexture(const sampler2D tex,const vec2 reprojectedUv,const bool useCatmullRom){if(useCatmullRom){return SampleTextureCatmullRom(tex,reprojectedUv,1.0/invTexSize);}return textureLod(tex,reprojectedUv,0.);}vec3 Decode(vec2 f){f=f*2.0-1.0;vec3 n=vec3(f.x,f.y,1.0-abs(f.x)-abs(f.y));float t=max(-n.z,0.0);n.x+=n.x>=0.0 ?-t : t;n.y+=n.y>=0.0 ?-t : t;return normalize(n);}`;class fb extends Vt{constructor(e=1,t=""){let n=hb.replace("#include <reproject>",db);typeof t=="string"&&(n=n.replace("customComposeShader",t));let i="";for(let l=0;l<e;l++)i+=`
				uniform sampler2D inputTexture${l};
				uniform sampler2D accumulatedTexture${l};

				layout(location = ${l}) out vec4 gOutput${l};
			`;n=i+n.replaceAll("textureCount",e),n=Xl(n);const s=n.matchAll(/inputTexture\[\s*[0-9]+\s*]/g);for(const[l]of s){const c=l.replace(/[^0-9]/g,"");n=n.replace(l,"inputTexture"+c)}const o=n.matchAll(/accumulatedTexture\[\s*[0-9]+\s*]/g);for(const[l]of o){const c=l.replace(/[^0-9]/g,"");n=n.replace(l,"accumulatedTexture"+c)}const a=n.matchAll(/gOutput\[\s*[0-9]+\s*]/g);for(const[l]of a){const c=l.replace(/[^0-9]/g,"");n=n.replace(l,"gOutput"+c)}super({type:"TemporalReprojectMaterial",uniforms:{velocityTexture:new J(null),depthTexture:new J(null),lastDepthTexture:new J(null),blend:new J(0),constantBlend:new J(!1),fullAccumulate:new J(!1),reset:new J(!1),delta:new J(0),invTexSize:new J(new _e),projectionMatrix:new J(new Ue),projectionMatrixInverse:new J(new Ue),cameraMatrixWorld:new J(new Ue),viewMatrix:new J(new Ue),prevViewMatrix:new J(new Ue),prevCameraMatrixWorld:new J(new Ue),prevProjectionMatrix:new J(new Ue),prevProjectionMatrixInverse:new J(new Ue),cameraPos:new J(new I)},vertexShader:sa,fragmentShader:n,toneMapped:!1,glslVersion:Vi});for(let l=0;l<e;l++)this.uniforms["inputTexture"+l]=new J(null),this.uniforms["accumulatedTexture"+l]=new J(null);typeof t=="string"&&(this.defines.useCustomComposeShader="")}}const Tl=1.324717957244746,pb=1/Tl,mb=1/(Tl*Tl),uh=1.1127756842787055,gb=r=>{const e=[];for(let t=0;t<r;t++)e.push([(uh+pb*t)%1,(uh+mb*t)%1]);return e},hh={blend:.9,dilation:!1,constantBlend:!1,fullAccumulate:!1,catmullRomSampling:!0,neighborhoodClamping:!1,neighborhoodClampingDisocclusionTest:!1,logTransform:!1,depthDistance:.25,worldDistance:.375,reprojectSpecular:!1,customComposeShader:null,renderTarget:null},dh=new Ue,fh=new Ue;class Od extends wn{constructor(e,t,n,i=1,s=hh){super("TemporalReprojectPass"),this.needsSwap=!1,this.clock=new ud,this.r2Sequence=[],this.pointsIndex=0,this.lastCameraTransform={position:new I,quaternion:new Et},this._scene=e,this._camera=t,this.textureCount=i,s={...hh,...s},this.renderTarget=new cr(1,1,i,{minFilter:Ve,magFilter:Ve,type:bt,depthBuffer:!1}),this.fullscreenMaterial=new fb(i,s.customComposeShader),this.fullscreenMaterial.defines.textureCount=i,s.dilation&&(this.fullscreenMaterial.defines.dilation=""),s.neighborhoodClamping&&(this.fullscreenMaterial.defines.neighborhoodClamping=""),s.logTransform&&(this.fullscreenMaterial.defines.logTransform=""),this.fullscreenMaterial.defines.depthDistance=s.depthDistance.toPrecision(5),this.fullscreenMaterial.defines.worldDistance=s.worldDistance.toPrecision(5),this.fullscreenMaterial.uniforms.blend.value=s.blend,this.fullscreenMaterial.uniforms.constantBlend.value=s.constantBlend,this.fullscreenMaterial.uniforms.fullAccumulate.value=s.fullAccumulate,this.fullscreenMaterial.uniforms.projectionMatrix.value=t.projectionMatrix.clone(),this.fullscreenMaterial.uniforms.projectionMatrixInverse.value=t.projectionMatrixInverse.clone(),this.fullscreenMaterial.uniforms.cameraMatrixWorld.value=t.matrixWorld,this.fullscreenMaterial.uniforms.viewMatrix.value=t.matrixWorldInverse,this.fullscreenMaterial.uniforms.cameraPos.value=t.position,this.fullscreenMaterial.uniforms.prevViewMatrix.value=t.matrixWorldInverse.clone(),this.fullscreenMaterial.uniforms.prevCameraMatrixWorld.value=t.matrixWorld.clone(),this.fullscreenMaterial.uniforms.prevProjectionMatrix.value=t.projectionMatrix.clone(),this.fullscreenMaterial.uniforms.prevProjectionMatrixInverse.value=t.projectionMatrixInverse.clone(),this.copyPass=new ub(i);for(let o=0;o<i;o++){const a=this.copyPass.renderTarget.texture[o];a.type=bt,a.minFilter=Ve,a.magFilter=Ve,a.needsUpdate=!0}this.fullscreenMaterial.uniforms.velocityTexture.value=n.texture,this.fullscreenMaterial.uniforms.depthTexture.value=n.depthTexture,typeof s.reprojectSpecular=="boolean"&&(s.reprojectSpecular=Array(i).fill(s.reprojectSpecular)),this.fullscreenMaterial.defines.reprojectSpecular=`bool[](${s.reprojectSpecular.join(", ")})`,typeof s.catmullRomSampling=="boolean"&&(s.catmullRomSampling=Array(i).fill(s.catmullRomSampling)),this.fullscreenMaterial.defines.catmullRomSampling=`bool[](${s.catmullRomSampling.join(", ")})`,typeof s.neighborhoodClamping=="boolean"&&(s.neighborhoodClamping=Array(i).fill(s.neighborhoodClamping)),this.fullscreenMaterial.defines.neighborhoodClamping=`bool[](${s.neighborhoodClamping.join(", ")})`,typeof s.neighborhoodClampingDisocclusionTest=="boolean"&&(s.neighborhoodClampingDisocclusionTest=Array(i).fill(s.neighborhoodClampingDisocclusionTest)),this.fullscreenMaterial.defines.neighborhoodClampingDisocclusionTest=`bool[](${s.neighborhoodClampingDisocclusionTest.join(", ")})`,this.options=s,this.velocityDepthNormalPass=n}dispose(){super.dispose(),this.renderTarget.dispose(),this.copyPass.dispose(),this.fullscreenMaterial.dispose()}setSize(e,t){this.renderTarget.setSize(e,t),this.copyPass.setSize(e,t),this.fullscreenMaterial.uniforms.invTexSize.value.set(1/e,1/t)}get texture(){return this.renderTarget.texture[0]}reset(){this.fullscreenMaterial.uniforms.reset.value=!0}render(e){const t=Math.min(.1,this.clock.getDelta());this.fullscreenMaterial.uniforms.delta.value=t,dh.copy(this._camera.projectionMatrix),fh.copy(this._camera.projectionMatrixInverse),this._camera.view&&(this._camera.view.enabled=!1),this._camera.updateProjectionMatrix(),this.fullscreenMaterial.uniforms.projectionMatrix.value.copy(this._camera.projectionMatrix),this.fullscreenMaterial.uniforms.projectionMatrixInverse.value.copy(this._camera.projectionMatrixInverse),this.fullscreenMaterial.uniforms.lastDepthTexture.value=this.velocityDepthNormalPass.lastDepthTexture,this._camera.view&&(this._camera.view.enabled=!0),this._camera.projectionMatrix.copy(dh),this._camera.projectionMatrixInverse.copy(fh),e.setRenderTarget(this.renderTarget),e.render(this.scene,this.camera),this.fullscreenMaterial.uniforms.reset.value=!1;for(let n=0;n<this.textureCount;n++)this.copyPass.fullscreenMaterial.uniforms["inputTexture"+n].value=this.renderTarget.texture[n],this.fullscreenMaterial.uniforms["accumulatedTexture"+n].value=this.copyPass.renderTarget.texture[n];this.copyPass.render(e),this.fullscreenMaterial.uniforms.prevCameraMatrixWorld.value.copy(this._camera.matrixWorld),this.fullscreenMaterial.uniforms.prevViewMatrix.value.copy(this._camera.matrixWorldInverse),this.fullscreenMaterial.uniforms.prevProjectionMatrix.value.copy(this.fullscreenMaterial.uniforms.projectionMatrix.value),this.fullscreenMaterial.uniforms.prevProjectionMatrixInverse.value.copy(this.fullscreenMaterial.uniforms.projectionMatrixInverse.value)}jitter(e=1){this.unjitter(),this.r2Sequence.length===0&&(this.r2Sequence=gb(256).map(([o,a])=>[o-.5,a-.5])),this.pointsIndex=(this.pointsIndex+1)%this.r2Sequence.length;const[t,n]=this.r2Sequence[this.pointsIndex],{width:i,height:s}=this.renderTarget;this._camera.setViewOffset&&this._camera.setViewOffset(i,s,t*e,n*e,i,s)}unjitter(){this._camera.clearViewOffset&&this._camera.clearViewOffset()}}var vb=`#define GLSLIFY 1
uniform sampler2D inputTexture;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 accumulatedTexel=textureLod(inputTexture,vUv,0.);outputColor=vec4(accumulatedTexel.rgb,1.);}`;const El={blend:.7,constantBlend:!0,dilation:!0,catmullRomSampling:!0,logTransform:!0,depthDistance:10,worldDistance:5,neighborhoodClamping:!0,neighborhoodClampingDisocclusionTest:!0};class kd extends jl{constructor(e,t,n,i=El){super("TRAAEffect",vb,{type:"FinalTRAAEffectMaterial",uniforms:new Map([["inputTexture",new J(null)]])}),this._scene=e,this._camera=t,i={...El,...i},this.temporalReprojectPass=new Od(e,t,n,1,i),this.uniforms.get("inputTexture").value=this.temporalReprojectPass.texture,this.setSize(i.width,i.height)}setSize(e,t){this.temporalReprojectPass.setSize(e,t)}dispose(){super.dispose(),this.temporalReprojectPass.dispose()}update(e,t){this.temporalReprojectPass.unjitter(),this.unjitteredProjectionMatrix=this._camera.projectionMatrix.clone(),this._camera.projectionMatrix.copy(this.unjitteredProjectionMatrix);const n=ra(this._scene).filter(i=>Fd(i));for(const i of n){const s=e.properties.get(i.material);if(!(s!=null&&s.programs))continue;const o=Array.from(s.programs.values())[0].getUniforms();if(!o._patchedProjectionMatrix){const a=o.setValue.bind(o);o._oldSetValue=a,o.setValue=(l,c,u,...h)=>{c==="projectionMatrix"&&(u=this.unjitteredProjectionMatrix),a(l,c,u,...h)},o._patchedProjectionMatrix=!0}cancelAnimationFrame(o._destroyPatchRAF),cancelAnimationFrame(o._destroyPatchRAF2),o._destroyPatchRAF=requestAnimationFrame(()=>{o._destroyPatchRAF2=requestAnimationFrame(()=>{o.setValue=o._oldSetValue,delete o._oldSetValue,delete o._patchedProjectionMatrix})})}this.temporalReprojectPass.fullscreenMaterial.uniforms.inputTexture0.value=t.texture,this.temporalReprojectPass.jitter(),this.temporalReprojectPass.render(e)}}kd.DefaultOptions=El;var xb=`#define GLSLIFY 1
varying vec2 vUv;uniform sampler2D depthTexture;uniform sampler2D normalTexture;uniform sampler2D momentTexture;uniform vec2 invTexSize;uniform bool horizontal;uniform bool blurHorizontal;uniform float denoise[textureCount];uniform float depthPhi;uniform float normalPhi;uniform float roughnessPhi;uniform float denoiseKernel;uniform float stepSize;uniform mat4 projectionMatrixInverse;uniform mat4 projectionMatrix;uniform mat4 cameraMatrixWorld;uniform bool isFirstIteration;uniform bool isLastIteration;
#include <packing>
#define EPSILON 0.00001
#define M_PI 3.1415926535897932384626433832795
#define PI M_PI
#define luminance(a) dot(a, vec3(0.2125, 0.7154, 0.0721))
#include <customComposeShaderFunctions>
vec3 screenSpaceToWorldSpace(const vec2 uv,const float depth,const mat4 curMatrixWorld){vec4 ndc=vec4((uv.x-0.5)*2.0,(uv.y-0.5)*2.0,(depth-0.5)*2.0,1.0);vec4 clip=projectionMatrixInverse*ndc;vec4 view=curMatrixWorld*(clip/clip.w);return view.xyz;}float distToPlane(const vec3 worldPos,const vec3 neighborWorldPos,const vec3 worldNormal){vec3 toCurrent=worldPos-neighborWorldPos;float distToPlane=abs(dot(toCurrent,worldNormal));return distToPlane;}void tap(const vec2 neighborVec,const vec2 pixelStepOffset,const float depth,const vec3 normal,const float roughness,const float roughnessSqrt,const vec3 worldPos,const float luma[textureCount],const float colorPhi[textureCount],inout vec3 denoisedColor[textureCount],inout float totalWeight[textureCount],inout float sumVariance[textureCount]){vec2 fullNeighborUv=neighborVec*pixelStepOffset;vec2 neighborUvNearest=vUv+fullNeighborUv;vec2 neighborUv=vUv+fullNeighborUv;vec2 neighborUvRoughness=vUv+fullNeighborUv*roughnessSqrt;float basicWeight=1.0;
#ifdef useDepth
vec4 neighborDepthTexel=textureLod(depthTexture,neighborUvNearest,0.);float neighborDepth=unpackRGBAToDepth(neighborDepthTexel);vec3 neighborWorldPos=screenSpaceToWorldSpace(neighborUvNearest,neighborDepth,cameraMatrixWorld);float depthDiff=(1.-distToPlane(worldPos,neighborWorldPos,normal));float depthSimilarity=max(depthDiff/depthPhi,0.);if(depthSimilarity<EPSILON)return;basicWeight*=depthSimilarity;
#endif
#if defined(useNormal) || defined(useRoughness)
vec4 neighborNormalTexel=textureLod(normalTexture,neighborUvNearest,0.);
#endif
#ifdef useNormal
vec3 neighborNormal=neighborNormalTexel.rgb;float normalDiff=dot(neighborNormal,normal);float normalSimilarity=pow(max(0.,normalDiff),normalPhi);if(normalSimilarity<EPSILON)return;basicWeight*=normalSimilarity;
#endif
#ifdef useRoughness
float neighborRoughness=neighborNormalTexel.a;neighborRoughness*=neighborRoughness;float roughnessDiff=abs(roughness-neighborRoughness);float roughnessSimilarity=exp(-roughnessDiff*roughnessPhi);if(roughnessSimilarity<EPSILON)return;basicWeight*=roughnessSimilarity;
#endif
vec4 neighborInputTexel[textureCount];vec3 neighborColor;float neighborLuma,lumaDiff,lumaSimilarity;float weight[textureCount];
#pragma unroll_loop_start
for(int i=0;i<textureCount;i++){neighborInputTexel[i]=textureLod(texture[i],roughnessDependent[i]? neighborUvRoughness : neighborUv,0.);neighborColor=neighborInputTexel[i].rgb;neighborLuma=luminance(neighborColor);lumaDiff=abs(luma[i]-neighborLuma);lumaSimilarity=max(1.0-lumaDiff/colorPhi[i],0.0);weight[i]=min(basicWeight*lumaSimilarity,1.0);denoisedColor[i]+=neighborColor*weight[i];totalWeight[i]+=weight[i];}
#pragma unroll_loop_end
#ifdef useMoment
if(isFirstIteration){vec4 neighborMoment=textureLod(momentTexture,neighborUvNearest,0.);neighborInputTexel[0].a=max(0.0,neighborMoment.g-neighborMoment.r*neighborMoment.r);sumVariance[0]+=weight[0]*weight[0]*neighborInputTexel[0].a;
#if momentTextureCount > 1
neighborInputTexel[1].a=max(0.0,neighborMoment.a-neighborMoment.b*neighborMoment.b);sumVariance[1]+=weight[1]*weight[1]*neighborInputTexel[1].a;
#endif
}
#endif
#pragma unroll_loop_start
for(int i=0;i<momentTextureCount;i++){
#ifndef useMoment
if(isFirstIteration)neighborInputTexel[i].a=1.0;
#endif
sumVariance[i]+=weight[i]*weight[i]*neighborInputTexel[i].a;}
#pragma unroll_loop_end
}void main(){vec4 depthTexel=textureLod(depthTexture,vUv,0.);if(dot(depthTexel.rgb,depthTexel.rgb)==0.){discard;return;}float depth=unpackRGBAToDepth(depthTexel);vec3 worldPos=screenSpaceToWorldSpace(vUv,depth,cameraMatrixWorld);vec4 normalTexel=textureLod(normalTexture,vUv,0.);vec3 normal=normalTexel.rgb;float roughness=normalTexel.a;roughness*=roughness;vec3 denoisedColor[textureCount];vec4 texel[textureCount];float luma[textureCount];float sumVariance[textureCount];float totalWeight[textureCount];float colorPhi[textureCount];
#pragma unroll_loop_start
for(int i=0;i<textureCount;i++){totalWeight[i]=1.0;texel[i]=textureLod(texture[i],vUv,0.);denoisedColor[i]=texel[i].rgb;luma[i]=luminance(texel[i].rgb);}
#pragma unroll_loop_end
#ifdef useMoment
if(isFirstIteration){vec4 moment=textureLod(momentTexture,vUv,0.);texel[0].a=max(0.0,moment.g-moment.r*moment.r);
#if momentTextureCount > 1
texel[1].a=max(0.0,moment.a-moment.b*moment.b);
#endif
}
#endif
#pragma unroll_loop_start
for(int i=0;i<momentTextureCount;i++){
#ifndef useMoment
if(isFirstIteration)texel[i].a=1.0;
#endif
sumVariance[i]=texel[i].a;if(roughnessDependent[i]){colorPhi[i]=denoise[i]*sqrt(basicVariance[i]*roughness+sumVariance[i]);}else{colorPhi[i]=denoise[i]*sqrt(basicVariance[i]+sumVariance[i]);}}
#pragma unroll_loop_end
vec2 pixelStepOffset=invTexSize*stepSize;float roughnessSqrt=max(0.05,sqrt(roughness));if(denoiseKernel>EPSILON){if(blurHorizontal){for(float i=-denoiseKernel;i<=denoiseKernel;i++){if(i!=0.){vec2 neighborVec=horizontal ? vec2(i,0.): vec2(0.,i);tap(neighborVec,pixelStepOffset,depth,normal,roughness,roughnessSqrt,worldPos,luma,colorPhi,denoisedColor,totalWeight,sumVariance);}}}else{for(float i=-denoiseKernel;i<=denoiseKernel;i++){if(i!=0.){vec2 neighborVec=horizontal ? vec2(-i,-i): vec2(i,-i);tap(neighborVec,pixelStepOffset,depth,normal,roughness,roughnessSqrt,worldPos,luma,colorPhi,denoisedColor,totalWeight,sumVariance);}}}
#pragma unroll_loop_start
for(int i=0;i<textureCount;i++){sumVariance[i]/=totalWeight[i]*totalWeight[i];denoisedColor[i]/=totalWeight[i];}
#pragma unroll_loop_end
}if(isLastIteration){
#include <customComposeShader>
}
#include <outputShader>
}`;const el={moment:!0,depth:!0,normal:!0,roughness:!0,diffuse:!0,roughnessDependent:!1,basicVariance:5e-4},_b=[["moment","","useMoment"],["depth","depthPhi","useDepth"],["normal","normalPhi","useNormal"],["roughness","roughnessPhi","useRoughness"]];class yb extends wn{constructor(e,t=[],n="",i="",s=el){super("DenoisePass"),this.iterations=1,s={...el,...s};let o="";const a="";let l="";this.textures=t;for(let d=0;d<this.textures.length;d++)o+=`layout(location = ${d}) out vec4 gTexture${d};
`,o+=`uniform sampler2D texture${d};
`,l+=`gTexture${d} = vec4(denoisedColor[${d}], sumVariance[${d}]);
`;let c=o+xb.replace("#include <customComposeShaderFunctions>",i).replace("#include <customComposeShader>",n).replace("#include <finalOutputShader>",a).replace("#include <outputShader>",l).replaceAll("textureCount",this.textures.length).replaceAll("momentTextureCount",Math.min(this.textures.length,2));c=Xl(c);const u=c.matchAll(/texture\[\s*[0-9]+\s*]/g);for(const[d]of u){const m=d.replace(/[^0-9]/g,"");c=c.replace(d,"texture"+m)}s={...el,...s},this.fullscreenMaterial=new Vt({fragmentShader:c,vertexShader:sa,uniforms:{depthTexture:new J(null),normalTexture:new J(null),momentTexture:new J(null),invTexSize:new J(new _e),horizontal:new J(!0),blurHorizontal:new J(!0),denoiseKernel:new J(1),denoiseDiffuse:new J(1),denoise:new J([0]),depthPhi:new J(1),normalPhi:new J(1),roughnessPhi:new J(1),stepSize:new J(1),isFirstIteration:new J(!1),isLastIteration:new J(!1),viewMatrix:new J(e.matrixWorldInverse),projectionMatrix:new J(e.projectionMatrix),cameraMatrixWorld:new J(e.matrixWorld),projectionMatrixInverse:new J(e.projectionMatrixInverse)},glslVersion:Vi});const h={type:bt,depthBuffer:!1};this.renderTargetA=new cr(1,1,this.textures.length,h),this.renderTargetB=new cr(1,1,this.textures.length,h);for(let d=0;d<this.textures.length;d++)this.fullscreenMaterial.uniforms["texture"+d]=new J(t[d]);typeof s.roughnessDependent=="boolean"&&(s.roughnessDependent=Array(t.length).fill(s.roughnessDependent)),this.fullscreenMaterial.defines.roughnessDependent=`bool[](${s.roughnessDependent.join(", ")})`,typeof s.basicVariance=="number"&&(s.basicVariance=Array(t.length).fill(s.basicVariance)),this.fullscreenMaterial.defines.basicVariance=`float[](${s.basicVariance.map(d=>d.toPrecision(5)).join(", ")})`,this.options=s}setSize(e,t){this.renderTargetA.setSize(e,t),this.renderTargetB.setSize(e,t),this.fullscreenMaterial.uniforms.invTexSize.value.set(1/e,1/t)}dispose(){super.dispose(),this.renderTargetA.dispose(),this.renderTargetB.dispose()}keepEdgeStoppingDefinesUpdated(){for(const[t,n,i]of _b){var e;const s=this.options[t]&&(n===""||((e=this.fullscreenMaterial.uniforms[n])==null?void 0:e.value)>.001);s!==i in this.fullscreenMaterial.defines&&(s?this.fullscreenMaterial.defines[i]="":delete this.fullscreenMaterial.defines[i],this.fullscreenMaterial.needsUpdate=!0)}}render(e){this.keepEdgeStoppingDefinesUpdated();const t=this.fullscreenMaterial.uniforms.denoiseKernel.value;if(this.iterations>0)for(let n=0;n<2*this.iterations;n++){const i=n%2===0,s=2**~~(n/2),a=parseInt(Math.log2(s))%2==0;this.fullscreenMaterial.uniforms.horizontal.value=i,this.fullscreenMaterial.uniforms.blurHorizontal.value=a,this.fullscreenMaterial.uniforms.stepSize.value=s,this.fullscreenMaterial.uniforms.isFirstIteration.value=n===0,this.fullscreenMaterial.uniforms.isLastIteration.value=n===2*this.iterations-1;const l=i?this.renderTargetA:this.renderTargetB;for(let c=0;c<this.textures.length;c++)this.fullscreenMaterial.uniforms["texture"+c].value=i?n===0?this.textures[c]:this.renderTargetB.texture[c]:this.renderTargetA.texture[c];e.setRenderTarget(l),e.render(this.scene,this.camera)}else this.fullscreenMaterial.uniforms.denoiseKernel.value=0,e.setRenderTarget(this.renderTargetB),e.render(this.scene,this.camera),this.fullscreenMaterial.uniforms.denoiseKernel.value=t;for(let n=0;n<this.textures.length;n++)this.fullscreenMaterial.uniforms["texture"+n].value=this.textures[n]}get texture(){return this.renderTargetB.texture[0]}}var wb=`#define GLSLIFY 1
vec4 moment,historyMoment;bool lastReprojectedUvSpecular,isReprojectedUvSpecular;
#pragma unroll_loop_start
for(int i=0;i<momentTextureCount;i++){isReprojectedUvSpecular=reprojectSpecular[i]&&inputTexel[i].a!=0.0&&reprojectedUvSpecular[i].x>=0.0;reprojectedUv=isReprojectedUvSpecular ? reprojectedUvSpecular[i]: reprojectedUvDiffuse;if(i==0){historyMoment=SampleTextureCatmullRom(lastMomentTexture,reprojectedUv,1.0/invTexSize);}else if(lastReprojectedUvSpecular!=isReprojectedUvSpecular){historyMoment.ba=SampleTextureCatmullRom(lastMomentTexture,reprojectedUv,1.0/invTexSize).ba;}lastReprojectedUvSpecular=isReprojectedUvSpecular;}
#pragma unroll_loop_end
if(reprojectedUvDiffuse.x>=0.0||reprojectedUvSpecular[0].x>=0.0){moment.r=luminance(gOutput[0].rgb);moment.g=moment.r*moment.r;
#if textureCount > 1
moment.b=luminance(gOutput[1].rgb);moment.a=moment.b*moment.b;
#endif
}else{moment.rg=vec2(0.,100.);moment.ba=vec2(0.,100.);gMoment=moment;return;}float momentTemporalReprojectMix=max(fpsAdjustedBlend,0.8);gMoment=mix(moment,historyMoment,0.8);`;const ph={fullAccumulate:!0,customComposeShader:wb};class bb extends Od{constructor(e,t,n,i=1,s=ph){s={...ph,...s},super(e,t,n,i,s),this.momentTexture=this.renderTarget.texture[0].clone(),this.momentTexture.isRenderTargetTexture=!0,this.momentTexture.type=ft,this.momentTexture.minFilter=it,this.momentTexture.magFilter=it,this.momentTexture.needsUpdate=!0,this.renderTarget.texture.push(this.momentTexture);const o=`
		layout(location = ${i}) out vec4 gMoment;

		uniform sampler2D lastMomentTexture;
		`;this.fullscreenMaterial.fragmentShader=o+this.fullscreenMaterial.fragmentShader,this.fullscreenMaterial.uniforms={...this.fullscreenMaterial.uniforms,lastMomentTexture:new J(null)};const a=i+1;this.copyPass.setTextureCount(a),this.copyPass.fullscreenMaterial.uniforms["inputTexture"+(a-1)].value=this.momentTexture;const l=this.copyPass.renderTarget.texture[a-1];l.type=ft,l.minFilter=Ve,l.magFilter=Ve,l.needsUpdate=!0,this.fullscreenMaterial.uniforms.lastMomentTexture.value=l,this.fullscreenMaterial.defines.momentTextureCount=Math.min(2,i)}}class Mb{constructor(e,t,n,i=1,s="",o="",a={}){this.svgfTemporalReprojectPass=new bb(e,t,n,i,a);const l=this.svgfTemporalReprojectPass.renderTarget.texture.slice(0,i);this.denoisePass=new yb(t,l,s,o,a),this.denoisePass.fullscreenMaterial.uniforms.momentTexture.value=this.svgfTemporalReprojectPass.momentTexture,this.setNonJitteredDepthTexture(n.depthTexture)}get texture(){return this.denoisePass.texture}setGBuffers(e,t){this.setJitteredGBuffers(e,t),this.setNonJitteredGBuffers(e,t)}setJitteredGBuffers(e,t){this.denoisePass.fullscreenMaterial.uniforms.depthTexture.value=e,this.denoisePass.fullscreenMaterial.uniforms.normalTexture.value=t}setNonJitteredDepthTexture(e){this.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.depthTexture.value=e}setVelocityTexture(e){this.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.velocityTexture.value=e}setSize(e,t){this.denoisePass.setSize(e,t),this.svgfTemporalReprojectPass.setSize(e,t)}dispose(){this.denoisePass.dispose(),this.svgfTemporalReprojectPass.dispose()}render(e){this.svgfTemporalReprojectPass.render(e),this.denoisePass.render(e)}}class Sb extends Vt{constructor(){super({type:"MRTMaterial",defines:{USE_UV:"",TEMPORAL_RESOLVE:""},uniforms:{color:new J(new Ne),emissive:new J(new Ne),map:new J(null),roughnessMap:new J(null),metalnessMap:new J(null),emissiveMap:new J(null),alphaMap:new J(null),normalMap:new J(null),normalScale:new J(new _e(1,1)),roughness:new J(0),metalness:new J(0),emissiveIntensity:new J(0),uvTransform:new J(new Zt),boneTexture:new J(null),blueNoiseTexture:new J(null),blueNoiseRepeat:new J(new _e(1,1)),texSize:new J(new _e(1,1)),frame:new J(0)},vertexShader:`
                varying vec2 vHighPrecisionZW;

                #define NORMAL
                #if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
                    varying vec3 vViewPosition;
                #endif
                
                #include <common>
                #include <uv_pars_vertex>
                #include <displacementmap_pars_vertex>
                #include <normal_pars_vertex>
                #include <morphtarget_pars_vertex>
                #include <logdepthbuf_pars_vertex>
                #include <clipping_planes_pars_vertex>
                #include <skinning_pars_vertex>
                #include <color_pars_vertex>

                varying vec2 screenUv;

                void main() {
                    #include <uv_vertex>
                    
                    #include <skinbase_vertex>
                    #include <beginnormal_vertex>
                    #include <skinnormal_vertex>
                    #include <defaultnormal_vertex>

                    #include <morphnormal_vertex>
                    #include <normal_vertex>
                    #include <begin_vertex>
                    #include <morphtarget_vertex>

                    #include <skinning_vertex>

                    #include <displacementmap_vertex>
                    #include <project_vertex>
                    #include <logdepthbuf_vertex>
                    #include <clipping_planes_vertex>

                    #include <color_vertex>
                    
                    #if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
                        vViewPosition = - mvPosition.xyz;
                    #endif

                    screenUv = gl_Position.xy * 0.5 + 0.5;

                    vHighPrecisionZW = gl_Position.zw;
                }
            `,fragmentShader:`
                #define NORMAL
                #if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
                    varying vec3 vViewPosition;
                #endif
                #include <packing>
                #include <uv_pars_fragment>
                #include <normal_pars_fragment>
                #include <bumpmap_pars_fragment>
                #include <normalmap_pars_fragment>
                #include <logdepthbuf_pars_fragment>
                #include <clipping_planes_pars_fragment>
                #include <color_pars_fragment>
                #include <alphamap_pars_fragment>
                
                layout(location = 0) out vec4 gDepth;
                layout(location = 1) out vec4 gNormal;
                layout(location = 2) out vec4 gDiffuse;
                layout(location = 3) out vec4 gEmissive;

                #include <map_pars_fragment>
                uniform vec3 color;

                varying vec2 vHighPrecisionZW;

                #include <metalnessmap_pars_fragment>
                uniform float metalness;

                #include <roughnessmap_pars_fragment>
                uniform float roughness;

                #include <emissivemap_pars_fragment>
                uniform vec3 emissive;
                uniform float emissiveIntensity;

#ifdef USE_ALPHAMAP
                uniform sampler2D blueNoiseTexture;
                uniform vec2 blueNoiseRepeat;
                uniform vec2 texSize;
                uniform int frame;

                varying vec2 screenUv;

                const float g = 1.6180339887498948482;
                const float a1 = 1.0 / g;

                // reference: https://extremelearning.com.au/unreasonable-effectiveness-of-quasirandom-sequences/
                float r1(float n) {
                    // 7th harmonious number
                    return fract(1.1127756842787055 + a1 * n);
                }

                const vec4 hn = vec4(0.618033988749895, 0.3247179572447458, 0.2207440846057596, 0.1673039782614187);

                vec4 sampleBlueNoise(vec2 uv, int seed) {
                    vec2 size = uv * texSize;
                    vec2 blueNoiseSize = texSize / blueNoiseRepeat;
                    float blueNoiseIndex = floor(floor(size.y / blueNoiseSize.y) * blueNoiseRepeat.x) + floor(size.x / blueNoiseSize.x);

                    // get the offset of this pixel's blue noise tile
                    int blueNoiseTileOffset = int(r1(blueNoiseIndex + 1.0) * 65536.);

                    vec2 blueNoiseUv = uv * blueNoiseRepeat;

                    // fetch blue noise for this pixel
                    vec4 blueNoise = textureLod(blueNoiseTexture, blueNoiseUv, 0.);

                    // animate blue noise
                    blueNoise = fract(blueNoise + hn * float(seed + blueNoiseTileOffset));

                    blueNoise.r = (blueNoise.r > 0.5 ? 1.0 - blueNoise.r : blueNoise.r) * 2.0;
                    blueNoise.g = (blueNoise.g > 0.5 ? 1.0 - blueNoise.g : blueNoise.g) * 2.0;
                    blueNoise.b = (blueNoise.b > 0.5 ? 1.0 - blueNoise.b : blueNoise.b) * 2.0;
                    blueNoise.a = (blueNoise.a > 0.5 ? 1.0 - blueNoise.a : blueNoise.a) * 2.0;

                    return blueNoise;
                }
#endif

                void main() {
                    #ifdef USE_ALPHAMAP
                    float alpha = textureLod( alphaMap, vUv, 0. ).g;

                    float alphaThreshold = sampleBlueNoise(screenUv, frame).a;
                    if(alpha < alphaThreshold){
                        discard;
                        return;
                    }
                    #endif

                    #include <clipping_planes_fragment>
                    #include <logdepthbuf_fragment>
                    #include <normal_fragment_begin>
                    #include <normal_fragment_maps>

                    float roughnessFactor = roughness;
                    bool isDeselected = roughness > 10.0e9;
                    
                    if(isDeselected){
                        roughnessFactor = 1.;
                        gNormal = vec4(0.);
                    }else{
                        #ifdef USE_ROUGHNESSMAP
                            vec4 texelRoughness = textureLod( roughnessMap, vUv, 0. );
                            // reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
                            roughnessFactor *= texelRoughness.g;
                        #endif

                        // roughness of 1.0 is reserved for deselected meshes
                        roughnessFactor = min(0.99, roughnessFactor);

                        vec3 worldNormal = normalize((vec4(normal, 1.) * viewMatrix).xyz);
                        gNormal = vec4( worldNormal, roughnessFactor );
                    }
                    

                    if(isDeselected){
                        discard;
                        return;
                    }

                    float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;

                    vec4 depthColor = packDepthToRGBA( fragCoordZ );
                    gDepth = depthColor;

                    #include <metalnessmap_fragment>

                    vec4 diffuseColor = vec4(color, metalnessFactor);

                    #include <map_fragment>
                    #include <color_fragment>

                    gDiffuse = diffuseColor;

                    vec3 totalEmissiveRadiance = emissive * emissiveIntensity;
                    #include <emissivemap_fragment>
                    
                    gEmissive = vec4(totalEmissiveRadiance, 0.);
                }
            `,glslVersion:Vi,toneMapped:!1,alphaTest:!1,fog:!1,lights:!1}),this.normalMapType=Il,this.normalScale=new _e(1,1)}}var Tb=`#define GLSLIFY 1
#if !defined(diffuseOnly) && !defined(specularOnly)
layout(location=0)out vec4 gDiffuse;layout(location=1)out vec4 gSpecular;
#else
#ifdef diffuseOnly
layout(location=0)out vec4 gDiffuse;
#else
layout(location=0)out vec4 gSpecular;
#endif
#endif
varying vec2 vUv;uniform sampler2D directLightTexture;uniform sampler2D accumulatedTexture;uniform sampler2D normalTexture;uniform sampler2D depthTexture;uniform sampler2D diffuseTexture;uniform sampler2D emissiveTexture;uniform sampler2D blueNoiseTexture;uniform sampler2D velocityTexture;
#ifdef autoThickness
uniform sampler2D backSideDepthTexture;
#endif
uniform mat4 projectionMatrix;uniform mat4 inverseProjectionMatrix;uniform mat4 cameraMatrixWorld;uniform float cameraNear;uniform float cameraFar;uniform float maxEnvMapMipLevel;uniform vec3 cameraPos;uniform float rayDistance;uniform float maxRoughness;uniform float thickness;uniform float envBlur;uniform float maxEnvLuminance;uniform int frame;uniform vec2 texSize;uniform vec2 blueNoiseRepeat;struct EquirectHdrInfo{sampler2D marginalWeights;sampler2D conditionalWeights;sampler2D map;vec2 size;float totalSumWhole;float totalSumDecimal;};uniform EquirectHdrInfo envMapInfo;
#define INVALID_RAY_COORDS vec2(-1.0);
#define EPSILON 0.00001
#define ONE_MINUS_EPSILON 1.0 - EPSILON
float nearMinusFar;float nearMulFar;float farMinusNear;vec2 invTexSize;
#include <packing>
#include <utils>
vec2 RayMarch(inout vec3 dir,inout vec3 hitPos);vec2 BinarySearch(inout vec3 dir,inout vec3 hitPos);float fastGetViewZ(const float depth);vec3 doSample(const vec3 viewPos,const vec3 viewDir,const vec3 viewNormal,const vec3 worldPosition,const float metalness,const float roughness,const bool isDiffuseSample,const bool isMisSample,const float NoV,const float NoL,const float NoH,const float LoH,const float VoH,const vec2 random,inout vec3 l,inout vec3 hitPos,out bool isMissedRay,out vec3 brdf,out float pdf);void main(){vec4 depthTexel=textureLod(depthTexture,vUv,0.0);if(dot(depthTexel.rgb,depthTexel.rgb)==0.){discard;return;}vec4 normalTexel=textureLod(normalTexture,vUv,0.0);float roughness=normalTexel.a;if(roughness==1.0||roughness>maxRoughness){discard;return;}invTexSize=1./texSize;roughness=clamp(roughness*roughness,0.0001,1.0);nearMinusFar=cameraNear-cameraFar;nearMulFar=cameraNear*cameraFar;farMinusNear=cameraFar-cameraNear;float unpackedDepth=unpackRGBAToDepth(depthTexel);float depth=fastGetViewZ(unpackedDepth);vec3 viewPos=getViewPosition(depth);vec3 viewDir=normalize(viewPos);vec3 worldNormal=normalTexel.xyz;vec3 viewNormal=normalize((vec4(worldNormal,1.)*cameraMatrixWorld).xyz);vec3 worldPos=vec4(vec4(viewPos,1.)*viewMatrix).xyz;vec4 diffuseTexel=textureLod(diffuseTexture,vUv,0.);vec3 diffuse=diffuseTexel.rgb;float metalness=diffuseTexel.a;vec3 n=viewNormal;vec3 v=-viewDir;float NoV=max(EPSILON,dot(n,v));vec3 V=(vec4(v,1.)*viewMatrix).xyz;vec3 N=worldNormal;vec4 blueNoise;vec3 H,l,h,F,T,B,envMisDir,gi;vec3 SSGI,diffuseGI,specularGI,brdf,hitPos;Onb(N,T,B);V=ToLocal(T,B,N,V);vec3 f0=mix(vec3(0.04),diffuse,metalness);float NoL,NoH,LoH,VoH,diffW,specW,invW,pdf,envPdf,diffuseSamples,specularSamples;bool isDiffuseSample,valid,isMissedRay;int sampleCounter=0;
#pragma unroll_loop_start
for(int i=0;i<spp;i++){blueNoise=sampleBlueNoise(frame+sampleCounter++);H=SampleGGXVNDF(V,roughness,roughness,blueNoise.r,blueNoise.g);if(H.z<0.0)H=-H;l=normalize(reflect(-V,H));l=ToWorld(T,B,N,l);l=(vec4(l,1.)*cameraMatrixWorld).xyz;l=normalize(l);h=normalize(v+l);NoL=clamp(dot(n,l),EPSILON,ONE_MINUS_EPSILON);NoH=clamp(dot(n,h),EPSILON,ONE_MINUS_EPSILON);LoH=clamp(dot(l,h),EPSILON,ONE_MINUS_EPSILON);VoH=clamp(dot(v,h),EPSILON,ONE_MINUS_EPSILON);
#if !defined(diffuseOnly) && !defined(specularOnly)
F=F_Schlick(f0,VoH);diffW=(1.-metalness)*luminance(diffuse);specW=luminance(F);diffW=max(diffW,EPSILON);specW=max(specW,EPSILON);invW=1./(diffW+specW);diffW*=invW;specW*=invW;isDiffuseSample=blueNoise.b<diffW;
#else
#ifdef diffuseOnly
isDiffuseSample=true;
#else
isDiffuseSample=false;
#endif
#endif
envMisDir=vec3(0.0);envPdf=0.0;
#ifdef importanceSampling
envPdf=sampleEquirectProbability(envMapInfo,blueNoise.rg,envMisDir);envMisDir=normalize((vec4(envMisDir,1.)*cameraMatrixWorld).xyz);
#endif
valid=blueNoise.a<0.25+dot(envMisDir,viewNormal)*0.5;if(!valid)envPdf=0.0;if(isDiffuseSample){if(envPdf==0.0){l=cosineSampleHemisphere(viewNormal,blueNoise.rg);}else{l=envMisDir;}h=normalize(v+l);NoL=clamp(dot(n,l),EPSILON,ONE_MINUS_EPSILON);NoH=clamp(dot(n,h),EPSILON,ONE_MINUS_EPSILON);LoH=clamp(dot(l,h),EPSILON,ONE_MINUS_EPSILON);VoH=clamp(dot(v,h),EPSILON,ONE_MINUS_EPSILON);gi=doSample(viewPos,viewDir,viewNormal,worldPos,metalness,roughness,isDiffuseSample,envPdf!=0.0,NoV,NoL,NoH,LoH,VoH,blueNoise.rg,l,hitPos,isMissedRay,brdf,pdf);gi*=brdf;if(envPdf==0.0){gi/=pdf;}else{gi*=misHeuristic(envPdf,pdf);gi/=envPdf;}diffuseSamples++;diffuseGI=mix(diffuseGI,gi,1./diffuseSamples);}else{if(envPdf!=0.0&&roughness>=0.025){l=envMisDir;h=normalize(v+l);NoL=clamp(dot(n,l),EPSILON,ONE_MINUS_EPSILON);NoH=clamp(dot(n,h),EPSILON,ONE_MINUS_EPSILON);LoH=clamp(dot(l,h),EPSILON,ONE_MINUS_EPSILON);VoH=clamp(dot(v,h),EPSILON,ONE_MINUS_EPSILON);}else{envPdf=0.0;}gi=doSample(viewPos,viewDir,viewNormal,worldPos,metalness,roughness,isDiffuseSample,envPdf!=0.0,NoV,NoL,NoH,LoH,VoH,blueNoise.rg,l,hitPos,isMissedRay,brdf,pdf);gi*=brdf;if(envPdf==0.0){gi/=pdf;}else{gi*=misHeuristic(envPdf,pdf);gi/=envPdf;}specularSamples++;specularGI=mix(specularGI,gi,1./specularSamples);}}
#pragma unroll_loop_end
roughness=sqrt(roughness);
#ifndef specularOnly
if(diffuseSamples==0.0)diffuseGI=vec3(-1.0);gDiffuse=vec4(diffuseGI,roughness);
#endif
#ifndef diffuseOnly
float rayLength=0.0;if(!isMissedRay&&roughness<0.375&&getCurvature(viewNormal,depth)<0.001){vec3 hitPosWS=(vec4(hitPos,1.)*viewMatrix).xyz;rayLength=distance(worldPos,hitPosWS);}if(specularSamples==0.0)specularGI=vec3(-1.0);gSpecular=vec4(specularGI,rayLength);
#endif
}vec3 doSample(const vec3 viewPos,const vec3 viewDir,const vec3 viewNormal,const vec3 worldPosition,const float metalness,const float roughness,const bool isDiffuseSample,const bool isMisSample,const float NoV,const float NoL,const float NoH,const float LoH,const float VoH,const vec2 random,inout vec3 l,inout vec3 hitPos,out bool isMissedRay,out vec3 brdf,out float pdf){float cosTheta=max(0.0,dot(viewNormal,l));if(isDiffuseSample){vec3 diffuseBrdf=vec3(evalDisneyDiffuse(NoL,NoV,LoH,roughness,metalness));pdf=NoL/M_PI;pdf=max(EPSILON,pdf);brdf=diffuseBrdf;}else{vec3 specularBrdf=evalDisneySpecular(roughness,NoH,NoV,NoL);pdf=GGXVNDFPdf(NoH,NoV,roughness);pdf=max(EPSILON,pdf);brdf=specularBrdf;}brdf*=cosTheta;hitPos=viewPos;
#if steps == 0
hitPos+=l;vec2 coords=viewSpaceToScreenSpace(hitPos);
#else
vec2 coords=RayMarch(l,hitPos);
#endif
bool allowMissedRays=false;
#ifdef missedRays
allowMissedRays=true;
#endif
isMissedRay=coords.x==-1.0;vec3 envMapSample=vec3(0.);
#ifdef USE_ENVMAP
if(isMissedRay||allowMissedRays){vec3 reflectedWS=normalize((vec4(l,1.)*viewMatrix).xyz);
#ifdef BOX_PROJECTED_ENV_MAP
float depth=unpackRGBAToDepth(textureLod(depthTexture,vUv,0.));reflectedWS=parallaxCorrectNormal(reflectedWS.xyz,envMapSize,envMapPosition,worldPosition);reflectedWS=normalize(reflectedWS.xyz);
#endif
float mip=envBlur*maxEnvMapMipLevel;if(!isDiffuseSample)mip*=sqrt(roughness);envMapSample=sampleEquirectEnvMapColor(reflectedWS,envMapInfo.map,mip);float maxEnvLum=isMisSample ? maxEnvLuminance : 5.0;if(maxEnvLum!=0.0){float envLum=luminance(envMapSample);if(envLum>maxEnvLum){envMapSample*=maxEnvLum/envLum;}}return envMapSample;}
#endif
vec4 velocity=textureLod(velocityTexture,coords.xy,0.0);vec2 reprojectedUv=coords.xy-velocity.xy;vec3 SSGI;bvec4 reprojectedUvInScreen=bvec4(greaterThanEqual(reprojectedUv,vec2(0.)),lessThanEqual(reprojectedUv,vec2(1.)));if(all(reprojectedUvInScreen)){vec4 emissiveTexel=textureLod(emissiveTexture,coords.xy,0.);vec3 emissiveColor=emissiveTexel.rgb*10.;vec3 reprojectedGI=getTexel(accumulatedTexture,reprojectedUv,0.).rgb;SSGI=reprojectedGI+emissiveColor;
#ifdef useDirectLight
SSGI+=textureLod(directLightTexture,coords.xy,0.).rgb*directLightMultiplier;
#endif
}else{SSGI=textureLod(directLightTexture,vUv,0.).rgb;}if(allowMissedRays){float ssgiLum=luminance(SSGI);float envLum=luminance(envMapSample);if(envLum>ssgiLum)SSGI=envMapSample;}return SSGI;}vec2 RayMarch(inout vec3 dir,inout vec3 hitPos){float stepsFloat=float(steps);float rayHitDepthDifference;dir*=rayDistance/float(steps);vec2 uv;for(int i=1;i<steps;i++){hitPos+=dir;if(hitPos.z>0.0)return INVALID_RAY_COORDS;uv=viewSpaceToScreenSpace(hitPos);
#ifndef missedRays
if(any(lessThan(uv,vec2(0.)))||any(greaterThan(uv,vec2(1.))))return INVALID_RAY_COORDS;
#endif
float unpackedDepth=unpackRGBAToDepth(textureLod(depthTexture,uv,0.0));float depth=fastGetViewZ(unpackedDepth);
#ifdef autoThickness
float unpackedBackSideDepth=unpackRGBAToDepth(textureLod(backSideDepthTexture,uv,0.0));float backSideDepth=fastGetViewZ(unpackedBackSideDepth);float currentThickness=max(abs(depth-backSideDepth),thickness);
#else
float currentThickness=thickness;
#endif
rayHitDepthDifference=depth-hitPos.z;if(rayHitDepthDifference>=0.0&&rayHitDepthDifference<currentThickness){
#if refineSteps == 0
return uv;
#else
return BinarySearch(dir,hitPos);
#endif
}}
#ifndef missedRays
return INVALID_RAY_COORDS;
#endif
return uv;}vec2 BinarySearch(inout vec3 dir,inout vec3 hitPos){float rayHitDepthDifference;vec2 uv;dir*=0.5;hitPos-=dir;for(int i=0;i<refineSteps;i++){uv=viewSpaceToScreenSpace(hitPos);float unpackedDepth=unpackRGBAToDepth(textureLod(depthTexture,uv,0.0));float depth=fastGetViewZ(unpackedDepth);rayHitDepthDifference=depth-hitPos.z;dir*=0.5;hitPos+=rayHitDepthDifference>0.0 ?-dir : dir;}uv=viewSpaceToScreenSpace(hitPos);return uv;}float fastGetViewZ(const float depth){
#ifdef PERSPECTIVE_CAMERA
return nearMulFar/(farMinusNear*depth-cameraFar);
#else
return depth*nearMinusFar-cameraNear;
#endif
}`,Eb=`#define GLSLIFY 1
#define PI M_PI
#define luminance(a) dot(vec3(0.2125, 0.7154, 0.0721), a)
vec4 getTexel(const sampler2D tex,vec2 p,const float mip){p=p/invTexSize+0.5;vec2 i=floor(p);vec2 f=p-i;f=f*f*f*(f*(f*6.0-15.0)+10.0);p=i+f;p=(p-0.5)*invTexSize;return textureLod(tex,p,mip);}vec3 getViewPosition(const float depth){float clipW=projectionMatrix[2][3]*depth+projectionMatrix[3][3];vec4 clipPosition=vec4((vec3(vUv,depth)-0.5)*2.0,1.0);clipPosition*=clipW;return(inverseProjectionMatrix*clipPosition).xyz;}vec3 screenSpaceToWorldSpace(vec2 uv,float depth,mat4 camMatrixWorld){vec3 viewPos=getViewPosition(depth);return vec4(camMatrixWorld*vec4(viewPos,1.)).xyz;}float getViewZ(const float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec2 viewSpaceToScreenSpace(const vec3 position){vec4 projectedCoord=projectionMatrix*vec4(position,1.0);projectedCoord.xy/=projectedCoord.w;projectedCoord.xy=projectedCoord.xy*0.5+0.5;return projectedCoord.xy;}vec2 worldSpaceToScreenSpace(const vec3 worldPos){vec4 vsPos=vec4(worldPos,1.0)*cameraMatrixWorld;return viewSpaceToScreenSpace(vsPos.xyz);}
#ifdef BOX_PROJECTED_ENV_MAP
uniform vec3 envMapSize;uniform vec3 envMapPosition;vec3 parallaxCorrectNormal(const vec3 v,const vec3 cubeSize,const vec3 cubePos,const vec3 worldPosition){vec3 nDir=normalize(v);vec3 rbmax=(.5*cubeSize+cubePos-worldPosition)/nDir;vec3 rbmin=(-.5*cubeSize+cubePos-worldPosition)/nDir;vec3 rbminmax;rbminmax.x=(nDir.x>0.)? rbmax.x : rbmin.x;rbminmax.y=(nDir.y>0.)? rbmax.y : rbmin.y;rbminmax.z=(nDir.z>0.)? rbmax.z : rbmin.z;float correction=min(min(rbminmax.x,rbminmax.y),rbminmax.z);vec3 boxIntersection=worldPosition+nDir*correction;return boxIntersection-cubePos;}
#endif
#define M_PI 3.1415926535897932384626433832795
vec2 equirectDirectionToUv(const vec3 direction){vec2 uv=vec2(atan(direction.z,direction.x),acos(direction.y));uv/=vec2(2.0*M_PI,M_PI);uv.x+=0.5;uv.y=1.0-uv.y;return uv;}vec3 equirectUvToDirection(vec2 uv){uv.x-=0.5;uv.y=1.0-uv.y;float theta=uv.x*2.0*PI;float phi=uv.y*PI;float sinPhi=sin(phi);return vec3(sinPhi*cos(theta),cos(phi),sinPhi*sin(theta));}vec3 sampleEquirectEnvMapColor(const vec3 direction,const sampler2D map,const float lod){return getTexel(map,equirectDirectionToUv(direction),lod).rgb;}mat3 getBasisFromNormal(const vec3 normal){vec3 other;if(abs(normal.x)>0.5){other=vec3(0.0,1.0,0.0);}else{other=vec3(1.0,0.0,0.0);}vec3 ortho=normalize(cross(normal,other));vec3 ortho2=normalize(cross(normal,ortho));return mat3(ortho2,ortho,normal);}vec3 F_Schlick(const vec3 f0,const float theta){return f0+(1.-f0)*pow(1.0-theta,5.);}float F_Schlick(const float f0,const float f90,const float theta){return f0+(f90-f0)*pow(1.0-theta,5.0);}float D_GTR(const float roughness,const float NoH,const float k){float a2=pow(roughness,2.);return a2/(PI*pow((NoH*NoH)*(a2*a2-1.)+1.,k));}float SmithG(const float NDotV,const float alphaG){float a=alphaG*alphaG;float b=NDotV*NDotV;return(2.0*NDotV)/(NDotV+sqrt(a+b-a*b));}float GGXVNDFPdf(const float NoH,const float NoV,const float roughness){float D=D_GTR(roughness,NoH,2.);float G1=SmithG(NoV,roughness*roughness);return(D*G1)/max(0.00001,4.0f*NoV);}float GeometryTerm(const float NoL,const float NoV,const float roughness){float a2=roughness*roughness;float G1=SmithG(NoV,a2);float G2=SmithG(NoL,a2);return G1*G2;}float evalDisneyDiffuse(const float NoL,const float NoV,const float LoH,const float roughness,const float metalness){float FD90=0.5+2.*roughness*pow(LoH,2.);float a=F_Schlick(1.,FD90,NoL);float b=F_Schlick(1.,FD90,NoV);return(a*b/PI)*(1.-metalness);}vec3 evalDisneySpecular(const float roughness,const float NoH,const float NoV,const float NoL){float D=D_GTR(roughness,NoH,2.);float G=GeometryTerm(NoL,NoV,pow(0.5+roughness*.5,2.));vec3 spec=vec3(D*G/(4.*NoL*NoV));return spec;}vec3 SampleGGXVNDF(const vec3 V,const float ax,const float ay,const float r1,const float r2){vec3 Vh=normalize(vec3(ax*V.x,ay*V.y,V.z));float lensq=Vh.x*Vh.x+Vh.y*Vh.y;vec3 T1=lensq>0. ? vec3(-Vh.y,Vh.x,0.)*inversesqrt(lensq): vec3(1.,0.,0.);vec3 T2=cross(Vh,T1);float r=sqrt(r1);float phi=2.0*PI*r2;float t1=r*cos(phi);float t2=r*sin(phi);float s=0.5*(1.0+Vh.z);t2=(1.0-s)*sqrt(1.0-t1*t1)+s*t2;vec3 Nh=t1*T1+t2*T2+sqrt(max(0.0,1.0-t1*t1-t2*t2))*Vh;return normalize(vec3(ax*Nh.x,ay*Nh.y,max(0.0,Nh.z)));}void Onb(const vec3 N,inout vec3 T,inout vec3 B){vec3 up=abs(N.z)<0.9999999 ? vec3(0,0,1): vec3(1,0,0);T=normalize(cross(up,N));B=cross(N,T);}vec3 ToLocal(const vec3 X,const vec3 Y,const vec3 Z,const vec3 V){return vec3(dot(V,X),dot(V,Y),dot(V,Z));}vec3 ToWorld(const vec3 X,const vec3 Y,const vec3 Z,const vec3 V){return V.x*X+V.y*Y+V.z*Z;}vec3 cosineSampleHemisphere(const vec3 n,const vec2 u){float r=sqrt(u.x);float theta=2.0*PI*u.y;vec3 b=normalize(cross(n,vec3(0.0,1.0,1.0)));vec3 t=cross(b,n);return normalize(r*sin(theta)*b+sqrt(1.0-u.x)*n+r*cos(theta)*t);}float equirectDirectionPdf(vec3 direction){vec2 uv=equirectDirectionToUv(direction);float theta=uv.y*PI;float sinTheta=sin(theta);if(sinTheta==0.0){return 0.0;}return 1.0/(2.0*PI*PI*sinTheta);}float sampleEquirectProbability(EquirectHdrInfo info,vec2 r,out vec3 direction){float v=textureLod(info.marginalWeights,vec2(r.x,0.0),0.).x;float u=textureLod(info.conditionalWeights,vec2(r.y,v),0.).x;vec2 uv=vec2(u,v);vec3 derivedDirection=equirectUvToDirection(uv);direction=derivedDirection;vec3 color=texture(info.map,uv).rgb;float totalSum=info.totalSumWhole+info.totalSumDecimal;float lum=luminance(color);float pdf=lum/totalSum;return info.size.x*info.size.y*pdf;}float misHeuristic(float a,float b){float aa=a*a;float bb=b*b;return aa/(aa+bb);}const float g=1.6180339887498948482;const float a1=1.0/g;float r1(float n){return fract(1.1127756842787055+a1*n);}const vec4 hn=vec4(0.618033988749895,0.3247179572447458,0.2207440846057596,0.1673039782614187);vec4 sampleBlueNoise(int seed){vec2 size=vUv*texSize;vec2 blueNoiseSize=texSize/blueNoiseRepeat;float blueNoiseIndex=floor(floor(size.y/blueNoiseSize.y)*blueNoiseRepeat.x)+floor(size.x/blueNoiseSize.x);int blueNoiseTileOffset=int(r1(blueNoiseIndex+1.0)*65536.);vec2 blueNoiseUv=vUv*blueNoiseRepeat;vec4 blueNoise=textureLod(blueNoiseTexture,blueNoiseUv,0.);blueNoise=fract(blueNoise+hn*float(seed+blueNoiseTileOffset));blueNoise.r=(blueNoise.r>0.5 ? 1.0-blueNoise.r : blueNoise.r)*2.0;blueNoise.g=(blueNoise.g>0.5 ? 1.0-blueNoise.g : blueNoise.g)*2.0;blueNoise.b=(blueNoise.b>0.5 ? 1.0-blueNoise.b : blueNoise.b)*2.0;blueNoise.a=(blueNoise.a>0.5 ? 1.0-blueNoise.a : blueNoise.a)*2.0;return blueNoise;}float getCurvature(const vec3 n,const float depth){vec3 dx=dFdx(n);vec3 dy=dFdy(n);vec3 xneg=n-dx;vec3 xpos=n+dx;vec3 yneg=n-dy;vec3 ypos=n+dy;float curvature=(cross(xneg,xpos).y-cross(yneg,ypos).x)*4.0/depth;return curvature;}`;const Ab=({data:{width:r,height:e,isFloatType:t,flipY:n,data:i}})=>{const s=o();function o(){const v=new ArrayBuffer(4),p=new Float32Array(v),f=new Uint32Array(v),x=new Uint32Array(512),w=new Uint32Array(512);for(let E=0;E<256;++E){const P=E-127;P<-27?(x[E]=0,x[E|256]=32768,w[E]=24,w[E|256]=24):P<-14?(x[E]=1024>>-P-14,x[E|256]=1024>>-P-14|32768,w[E]=-P-1,w[E|256]=-P-1):P<=15?(x[E]=P+15<<10,x[E|256]=P+15<<10|32768,w[E]=13,w[E|256]=13):P<128?(x[E]=31744,x[E|256]=64512,w[E]=24,w[E|256]=24):(x[E]=31744,x[E|256]=64512,w[E]=13,w[E|256]=13)}const g=new Uint32Array(2048),b=new Uint32Array(64),M=new Uint32Array(64);for(let E=1;E<1024;++E){let P=E<<13,y=0;for(;!(P&8388608);)P<<=1,y-=8388608;P&=-8388609,y+=947912704,g[E]=P|y}for(let E=1024;E<2048;++E)g[E]=939524096+(E-1024<<13);for(let E=1;E<31;++E)b[E]=E<<23;b[31]=1199570944,b[32]=2147483648;for(let E=33;E<63;++E)b[E]=2147483648+(E-32<<23);b[63]=3347054592;for(let E=1;E<64;++E)E!==32&&(M[E]=1024);return{floatView:p,uint32View:f,baseTable:x,shiftTable:w,mantissaTable:g,exponentTable:b,offsetTable:M}}function a(v){const p=v>>10;return s.uint32View[0]=s.mantissaTable[s.offsetTable[p]+(v&1023)]+s.exponentTable[p],s.floatView[0]}function l(v,p,f){return .2126*v+.7152*p+.0722*f}const c=(v,p,f=0,x=v.length)=>{let w=f,g=f+x-1;for(;w<g;){const b=w+g>>1;v[b]<p?w=b+1:g=b}return w-f},u=(v,p,f,x,w,g)=>{if(x)for(let L=0,O=f-1;L<=O;L++)for(let W=0,U=p*4;W<U;W+=4){const F=O-L,V=L*U+W,$=F*U+W;v[$]=v[V],v[$+1]=v[V+1],v[$+2]=v[V+2],v[$+3]=v[V+3]}const b=new Float32Array(p*f),M=new Float32Array(p*f),E=new Float32Array(f),P=new Float32Array(f);let y=0,T=0;for(let L=0;L<f;L++){let O=0;for(let W=0;W<p;W++){const U=L*p+W,F=v[4*U+0],V=v[4*U+1],$=v[4*U+2],ne=l(F,V,$);O+=ne,y+=ne,b[U]=ne,M[U]=O}if(O!==0)for(let W=L*p,U=L*p+p;W<U;W++)b[W]/=O,M[W]/=O;T+=O,E[L]=O,P[L]=T}if(T!==0)for(let L=0,O=E.length;L<O;L++)E[L]/=T,P[L]/=T;for(let L=0;L<f;L++){const O=(L+1)/f,W=c(P,O);w[L]=(W+.5)/f}for(let L=0;L<f;L++)for(let O=0;O<p;O++){const W=L*p+O,U=(O+1)/p,F=c(M,U,L*p,p);g[W]=(F+.5)/p}return y};if(!t)for(const v in i)i[v]=a(i[v]);const h=new Float32Array(e),d=new Float32Array(r*e),m=u(i,r,e,n,h,d);postMessage(t?{totalSumValue:m,marginalDataArray:h,conditionalDataArray:d}:{data:i,totalSumValue:m,marginalDataArray:h,conditionalDataArray:d})},Cb=new Blob(["onmessage = "+Ab],{type:"application/javascript"}),Pb=URL.createObjectURL(Cb);class Rb{constructor(){const e=new qr(new Float32Array([1,1,1,1]),1,1);e.type=ft,e.format=sn,e.minFilter=Ve,e.magFilter=Ve,e.wrapS=_n,e.wrapT=_n,e.generateMipmaps=!1,e.needsUpdate=!0;const t=new qr(new Float32Array([0,1]),1,2);t.type=ft,t.format=Bo,t.minFilter=Ve,t.magFilter=Ve,t.generateMipmaps=!1,t.needsUpdate=!0;const n=new qr(new Float32Array([0,0,1,1]),2,2);n.type=ft,n.format=Bo,n.minFilter=Ve,n.magFilter=Ve,n.generateMipmaps=!1,n.needsUpdate=!0,this.map=e,this.marginalWeights=t,this.conditionalWeights=n,this.totalSumWhole=1,this.totalSumDecimal=0,this.size=new _e}dispose(){this.marginalWeights.dispose(),this.conditionalWeights.dispose(),this.map.dispose()}updateFrom(e){this.mapUuid=e.uuid,e=e.clone();const{width:t,height:n,data:i}=e.image,{type:s}=e;return this.size.set(t,n),new Promise(o=>{var a;(a=this.worker)==null||a.terminate(),this.worker=new Worker(Pb),this.worker.postMessage({width:t,height:n,isFloatType:s===ft,flipY:e.flipY,data:i}),this.worker.onmessage=({data:{data:l,totalSumValue:c,marginalDataArray:u,conditionalDataArray:h}})=>{this.dispose();const{marginalWeights:d,conditionalWeights:m}=this;d.image={width:n,height:1,data:u},d.needsUpdate=!0,m.image={width:t,height:n,data:h},m.needsUpdate=!0;const v=~~c,p=c-v;this.totalSumWhole=v,this.totalSumDecimal=p,l&&(e.image.data=l,e.type=ft),this.map=e,this.worker=null,o()}})}}class Db extends Vt{constructor(){super({type:"SSGIMaterial",uniforms:{directLightTexture:new J(null),accumulatedTexture:new J(null),normalTexture:new J(null),depthTexture:new J(null),diffuseTexture:new J(null),emissiveTexture:new J(null),velocityTexture:new J(null),blueNoiseTexture:new J(null),backSideDepthTexture:new J(null),projectionMatrix:new J(new Ue),inverseProjectionMatrix:new J(new Ue),cameraMatrixWorld:new J(new Ue),viewMatrix:new J(new Ue),cameraNear:new J(0),cameraFar:new J(0),rayDistance:new J(0),thickness:new J(0),r3Offset:new J(new I),frame:new J(0),envBlur:new J(0),maxRoughness:new J(0),maxEnvMapMipLevel:new J(0),maxEnvLuminance:new J(0),envMapInfo:{value:new Rb},envMapPosition:new J(new I),envMapSize:new J(new I),viewMatrix:new J(new Ue),texSize:new J(new _e),blueNoiseRepeat:new J(new _e),cameraPos:new J(new I)},defines:{steps:20,refineSteps:5,spp:1,directLightMultiplier:1,CUBEUV_TEXEL_WIDTH:0,CUBEUV_TEXEL_HEIGHT:0,CUBEUV_MAX_MIP:0,vWorldPosition:"worldPos"},fragmentShader:Tb.replace("#include <utils>",Eb),vertexShader:sa,toneMapped:!1,depthWrite:!1,depthTest:!1,glslVersion:Vi})}}const Lb=new Ne(0),Ib=new $h({depthPacking:Fh,side:Ut});class Nb extends wn{constructor(e,t){super("BackSideDepthPass"),this._scene=e,this._camera=t,this.renderTarget=new Ft(1,1,{minFilter:it,magFilter:it})}setSize(e,t){this.renderTarget.setSize(e,t)}dispose(){super.dispose(),this.renderTarget.dispose()}render(e){const{background:t}=this._scene;this._scene.background=Lb,this._scene.overrideMaterial=Ib,e.setRenderTarget(this.renderTarget),e.render(this._scene,this._camera),this._scene.background=t,this._scene.overrideMaterial=null}}var Fb="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAABAUElEQVR4AQD/PwDAA6vxkhBFR6TrLIa/0aId+5Pl+oDJpdJaPgKIsoqBda/bgMDI1RpXhkfjtCV1Wl63mBysOuelSt+ltKRbPC5Xy/+q1FWfp0rKiiai+LvC1XuhhQSDv/HaJFT7dw3Wglah+IPiVNIdU9rD0EnDxnGaPw4D25fcsn0OYx66IyGeufWEme8n1Y1EgGuTdVt1t2XbQQMZyRl9ux5bkEyweskq66BMEZVtTUGkVghI1a6t7OmXAT2XkqzJlCPep/mS3X7vf4z8tOqhv5STCpXAdnZ2uqzWrFd8qpjNupGh8uAERFcZKJamVYA9TYOt36k/f68tjAvdZ5U6ntg8DvWinGyLEx0D3AUUTLtnneH5K0LMKslrWIzPrAEjSloxrU8OM4ezw4tn+78JMVH+07OgpP+8qUUJ69SNly7602n7p3hSAfpF6RdkZOaKBjaW9htWlXYYprQJmKP+iNsElaUQjzDHlziogLU5vo4XpDGzegIMAIW4amjNvtFV0FJMIn5EGKHCg73PiMth9CUHgpl4j5KpaiI8SZlRqMRztzUe+mXTc2UX3HaLJWpZcxqxjlySok7+UQH5bGdMcFAAvENWJKuMPqUdqx1NA/2ikoiJh0MU3gDGEzKIVStR0CFkHLY01VmyCmCekKFgeZ/tVzFgX/KluXnrskgSKu/7go95fMDUEVtaggPU+dWEUTDZgtc553hsdjU27aV3YmQW9uwhwIVuPpCR0wxkDitSbcjCbCqxs0twGLzjhfMYJXu9KpLLurK3pqGCQ4RFYdI+BWFQgYJW1hBam/aTnVB4SnUMmuLxfZ2q/DcpOGOAlZkhQ13+d1AW+X6zRI9lxt+fglQ4MBOlwGhproncn2QPbXRO0G9Sl7yjtgsbMyrtomCkppmtepT9EVpf83N+UxxJk36tvROiQGLK/+oyrFLElKnM8cFctmFK26GibWdee9ONVNPQQ7UxZHJ8BeDXmplmmG9XCnh0p3VHuB1iCZE5JrCDpHaNkyc7evkPUbVtdxV1WH9lJyUTPheHA9kGaOwyohCp+Kxzs0NU7bIfpFhSnM9DRg+gS5eDT6q/2ONYhufTBC/c7o6cUvKL5ezrivZ6g5lfdMWB8P46RhUxdY2E9BoI5vlPg0uStS+MIiohdyUhqQh7Dgm0BY5wCqG0iNS2OrIHnnwxh3f6+XQzHl6adZSHWZ4CJik21LXSOn4zXz47rlUFZQH2l35kSUN3xJGdMquS145u00nuX/9o6ljtnWlRbTPqydj8DoWDCSBqDhpZ20GQcSl7N9OfbBy892X69Wst0Itwb6awdheVr3dh9JDiIX1W3B0yY3dzffOpgarFpEO4Dz9RxlpsDG9usE8pXoXME9DLpI93q98Db3Jnl4sPZV9OrTqczWHQIV47iVpRpHDZewlNfh4L4wpvNZKGWGnUKrBnF5FRpXwoiOhFkoMsTzG2e/q0qllnVGbZfMxJvgPweoWU+4Nv4zP+713/9p+wadKYmoEjRQYJd/HcOPqewh4e508Y8j/0sIp7ivNuN6vZrWFLlf8Awdu1o7d9gUKE5KNn01W44g/GcSTZapSuGDHXeW4BGXzfW2zL4FCJS6vV0qw0AaOquRZU6KOJPfx9Ym8YMZpcZhGQhrx/tl4jfLWHjgZ+jZ9v3nrZ0PUky6tMr8NsRr+Y0clxZLruJTmE35YyPVcy4fYnwceofbM9/WTYJlaC+sgH3wOpGJ7/dmxYyyF88cSAV1AZOWMAAXOxkLWmIWv8tle8CoBLm5WPtqI2gZ01o1GHAIevjvVoAHZCNa56bJfkAESC2zsGL2dkZPOrgcN6QlGHK6xheVvoO6TcsZCI9PxDV4dwYJOfSZPE92Xf0+QJgIpkeikrxD+eE5ekvz24v3GV7KRHMyv3Rnx8DfHLQu6ec/QRlWqOglJ665umC6ZBVV0zdfVpGwaHi4zEiASH04l7e15C1S2060x0DkyjGG55wudumG6QOhdntkt2fDD+TooKhGWCZgjyfpGAlE/qXdXkxpRz4oM5SjuvaUNC9JJvoHEQEGDVnFT8jYM42y16+ImXA/ppQVyfb7CrlULA3d1NgitpHSkDSZ1AX4p6IuJj8KjrkjtpA253++l+0fBhPMgsDnzCZFt8DJ1JLN6PnIzNsL3vmr9mKgQesQVUA0ZYg7Xo5PdJUGRm9dI6i3VR+BERBXhHaaZPW6CYIj69qG0JyXbAdhUWZtR5ys9kcWwTRskIRJC1+Eo8D3yjFfzWzgJ5/n2SsAHX0IiE4pbuAoYu+HtqW1QCRCROXHrBcRn1zqqtQF9dn3cCO5eRjnVPmkqzVo+/Qrh6fHE8Vp5FyDvb58h9TfdddlJj2rxSaj7qY5mf9MYdeUqLiwnb1bqPYhiCuVlz2m/c02VcFTuGtP+LwqUDUaIB16B8nMl9jXdwEICbcjgFRYhixHsmxqippomwhkgVPVyQ9J1zLOOyiD2FQA/zbm9jNVcqaeQEpmHj167stzGAtn6TZHd7+YtKIpmx+UK9nqkzGmWHm46GsHXVlwy4rzoPJWyXkwnSjytW8VUkQtXOzm+FFQowkCVh8K9ie6iVvcOyOdrugc5xaOVjIX7PyB0Mbp6VnVpdW1dKcQCD+m+NT3c6jd2xbgR0g4ix/UF/m4SB+WQSr48eC0tLTawdUc3z7asTX5LgU5+qf3S/jSm5wX3ikqucp6exWr/sqX8Iq1m5Vyofsz/Zi5ZjlLUEQod83ssF0ZcKHhLAW42kGwPNBsUd7m+xa4fQeQNehieMnl999kW5EsBF4IC1H2thAENTWTl4u8jxc0vqaTQMb4pd9Mqx+AGqvNlxcLC1szrHchGXnWt+C65lhVUkqxIaW+5IVZA+e8oOM81ynGV3uaoVkEE/lGOdr9+8tvrNG59oipp9WDnoA1RjoV1i6MnPwvlybkdM/SCLcl72iHDhByOQCmeD02jVl+qeCUqF5LZYLfy/A0o8YGAFV06TXAYwVGAOVWBWbpaVQ/pb/2CqU2BQjY7RxQ+FUo1Q8O0GibUCS5kuYlTi1KNMGxTBrVFPh6sTWHSSUN0sjAvVo7+Zj4pXy+VjoG+wkcdIpyZaghC+A1X9l12BqoddswOHieD+LV9A5L+b5PbenoeLIa3uC36S8BZsg5+PV1lVAAa09GOhjpXMbfVjegRzS4/J9jaHrBCOGpaHmpYErmh658L2ZIRIZP1Ej1/e670oupM4g3vEs2e/ZERFtGSrEFt2FSNJS8c/RPmEqAlso22z92FSbw5qY+cP7BA/Yonb0T8R9r+zfGrhPg4nBY+gIhbz2shYdF+lZ1O4LDG6KQj/neP5toLlFK0KVU5nzVmfWo9fnP4bEqDpbn0onxuZQr6PcF6XOb0/pVpzRakhF+q7mmEJqCJJrqEPTZGRYxAQkodXP5yTNNLx/eNwYnR28ishbBT7OYsDuFC215yfwQUxMo7QdUW8lt9PAC9lhaa0KT3J1IGtFcJ9qqco2qTMeYD9lnte/KqZax5LoQwc7UpFH6cTX6R5bl6u99YIU2XAS9OWZWIJCnv4l6qpA2ElQGR1GBUAWORq85kDZ7iDZ3KfkyvsY6YpqXT4hGg9aJ6kks+Wbdp3qeCI5F/Em1UyGnfiSjNYEmthfI1HwDprl6FvXZVlCrdykAKfZpsKylgYTya2jogLZs4Rax//bmte4MY8faNLLG2ziQ+N2/wU8k8UgWLI1CV5Uv1kK0bCrJV68nvZP7AVnUK3JUrGdWD9qewMkYSCDzgNnWCFopPezeSjBb+Lc1R82QPCdnar+IGVMoyf1J2hfZANdTxPg311HYqXpl8ZG1I1mptlfKNdNmAFoKI0LebQqCVbZz3vrqY+EwN99MK1giWlodOF7qxxI4IlgWMt3jiovHtTzuj8i8mHcCC3OBHld/W/2lhsu33fQH1nm+8eO/XfgbcbOQST2+UZMJ9/K58f5Ti6lyKQG/98AY4J7PDoEiGenilzblQ55F1vKRPqC8CyHk+iipGZYxNwtYQuezcZ6ArglSyRzoZmgmyAaUlr1fEka5o2YV2NAFF1f0Jd2kbH3+THeoGs2dZiQWB4NoP1IFyYOttTQNcHUAP3CM+i+aJkLp6X4JVt+LzyopHwam+RA8GlvPsMJ2N5f+eZygJzuo371QUquJCPcq9ZstqlWZY4iVkG/zW2Y3qHJzg7YLyPri+pCIB7eU+Jj7duCE1Xe0n2+umkqeX/ipNoFxjWJJrzOBGcJmS2+JiHAuk2qXsgHmBqDJnFPWz1hvkokrLTuYKYtpNloGQVOqe9ewNB0ht336Rwj0OJQFuMZ55ki2ezaBKasCKeVmJRqGbpo+qkAEFwKe5nqaciDwHPm6TLkoDdt4w8X9zfr0r6nGx+lB1vipTmcqD5/Whx/lCKiEVjl11PoUV/msmHKnMor8W2VExy/v9vBHiiqJYntX6hnrGS6E7FXnX1F1ARZFnmmnBdgB8DqYmjC/0Ur29krarErQEpSbynXGe8s1kLjnD7PicljmhS/zATRXx1F1BFh8uwF7nkhVJiANqNJ4Rh8VW2pIYLvW0WvD1J3ctiM/V9Xbljh5gVYsGcvIpoQo6phhe9WI5pdNiJGcMUBix7WGq5fn2OfhRDDcwYjloqFyntSddIxseHPQgcDsGtgaFIZtpgQXVfW+3CnHHhtHF6MXwZSf5bjTBqVycxiZOhecxwwRmCN0wUHKiAKTtRWGV519FDlI6yseFXslF3d96i5EujLjSLTpvwYWxLHM24i+dxpaopOh99PiceqanlfPnBUnsmfJRwHI7nNG+8eaQO/6BEzc++zgM0NJhVamD5erE2vAetloOjkJM5XNaany6AtvMz9H6l4uYwTLH/WnMdZd8f6GNl8k8qsrlGo6MGQViJwXCSuX0cFUL1SZsXSq/+Mp29uzdJRZlpTXIIYwRMKBQOdJga21Zot3ed8plei7c/KwpYY1MGfxKkRwOtfIeXs6t3MntDVoYblMw3ULrXjwjXSNyZ/Sak1cpe9l3CFKVBbWk29MREG0Z2AGlLOz28xWZldgx7VBCEE9EYW8oD2ImVmwKKlkARF11rNbznPaKcWeKWRd1dqJ/MfxzCX/BopfegjJr/B5G7cl4konxVoDVvKuPzamLNZOykcUl/JrfmLnviJkr0A8G96H9lKsdSjny8pXyslJ4yghbYtVGFirO94lpDw4S1d2QVVXlGmO9FuX9wFDuEWtVwe41P5B4hyFMCsavSS62kbVeFyQNpDHe4RMKP8VNQOadylCt71UvHSrTEb61SQItBgnEGRDhI5cPtdfH2f3hml0v0p6xaiH3UNjBNHzMyi81+UU3zKolV+lusEW2lc1mKPokr2ikO7TR7TVrHKB9LnbCFTNojoWGbx9mSGVoPyia05XjwaqmtYvnCf81UJc1UswI/X4B6qDjVAFvF6Nuz+a0Q9TQ1XYsIHXWSih5/hPlbTXLpEI+1W7EN3aor9IS6tu0BdT17p08+QkCE2IMDC6HVqgzhwEsEOg1j8F0wfF5DlZDlb2SnbIuEVi6fxo81gSagwaAa/ALGV1yYIXbHmP/WZ2VyKGSLZkb6cWhZCXeDOYp3WryvJjx3adlaqz2Rx1f0zgj4e/5jqAq+92KrkFLAmFD6pllktG1HOvdqCZeojZmdJ9GFZw59hLPN0bI4h9X7w1/OYGLfW5pJ4XjlR2OEgpWZUQiZi8W9pzdJMfiKeOb0gfrA4t3jo4ty3ch2HTuQOY5b4DjtoQQMk6FPDzteHFss7kpOIp+RvfbmlQfZ/kVkpehYs6mE1/g6bqT7C6rveZ1N5X6UY3SMcknkYWrOyk7DdYyFl4EI9ntvEQMOG7fGQGha6HzSDl2pdwL/sWaavIW5baipFlsx4QDHkX86o5EY2IuJYGynMXFTGOvJipG1OG+6t3b+bqPivG2yCKFGp4uvFXrkCiRUL0RiiXcgMQUBrGUntDxOWxicDbh/UfnMzUETFcxgcVv/UB+khriN8NRfBSCYWjTmOGyv0eUfcZuj//YETGtxj3yJhKxBfIQ8JCkjpwRgp4VKOe2ZbMqgz8tYrNj23YNVsFWM2xlCezeTW8p/zyGfqEaEXjR0LM9m4nrGRXs4kqWH5yWNi3z+uSwivK3tOEpeZugaTooQpx3ZgO9bss+NNcHrd5KyWBSYcnbsc9BnpEvGq6XHA6Ww/JlFNovuMIRVfKJecaSzaCZ+yD+AjXM6p4SEsDef/HikuooNU0YNFqWIlndafKwtVyfKB7BbjmnNsXkJZyb7VVy7u8CX+miMiU/CoW8LlCVDe4+Si8A6jIvfKssBy9+hgxdQnZSkFNfoxJ5LfoI6JggMh/KR+0ah70s9y6kBourSXtHSrOunMbNZxFSpv1N3roWef0iIqckG3BEni3ujb/kKzYxtvdEBqlmKmQ8Bktz2tLLgbl/eo9uyrlLgYLaZM2CXQG5fWqQsBPOQO2+xUV50cKxJrpeCu/N59nWbjpX0qZeBeYL+dirJ5e/DNbQIfijNjV+5neZCHG3FYNsDohZF8NqQccexXgOQvWpTr4JuRO1wekz624HWuC3b529PbUwpxllPnUNrmLMVtB8qBdVpLJcMUTk0jy7lYj/hNUwFVXS3U0j6PdQ5hMZF2XmxXgb3c/A0IQxHbZvyl9bSyWmHrxN6XWl/9PeOzlCbU1tMtpdYOo6ZKQ3ifneKS5tmJUCKTf2hCBKEhaaguDC9dDaENX9Mx8qD1pRzB6dRJ5ROdHLFfdjJqoibQo98qFnLoIK/BKczhm6cN1EJUYjMKljlaC66W61puHx4eSyt6auUzYYqUQTB4Zc5hWqQbCtOU0tcyQDCc1RNMtyeJ7BYsI1NpwVQcFCTBytyWCUyGgOfwP34+XP/yY4KSUwRqVQWPfuEXmD/T7ipg32yEUMLD04mr43AZknaflyAGHxZFwp6ew/OTnCBgHLEXRAR6HISIZaX4qmHrz44kisn+p7oNRcavqVq8IR9yXRhR58IuoSGZR5uUfecbjayDdWVnsSSeDWEVUHPypvdt5eSqggBz3bKG2aNVJ5GQz67J7HNUwVO8tNgWzeJPwIV3MOdEgZf2lSBUl7a1grhHXYbJbQ34MC3COkRx0tvfsKeS2BmvD6p2OtbA5EBmEOKlZCXQ2Nnl48gPmUSWrFQoxxELuKjOl1ro8fN9l7xLF61LGqltUd1H4R/JYM63BSwPl9uIQw1A6k3j35sdW8qPu2TUgSDYHqS/w4YLIcOWpQjJ+P4dE5RWuxIMtm5FAUzpcY/B5YyTJ6KPQRfwWde3cA3fT8nabSkmZaShx0XHE60TYZbf3qLJ1SbKT/u7uaazXqAzu8sA5dhwhtigHwRINxv4Jj5aaV7G7z2YZCYqanPsbKZhJyArWJepS/HZ3e9sLjiivEdnp39WdDCeVqSATpuCn24cMFyfL3gHlU0ZfWcImkJi2lblhqsNtOYB3x3XIPOdvcy6bneN+F7oSi0wD0PceGl5RsgnQM1jQXpgXAfD6rc0fNXJHwwN596727udVbqbS33btc64D+tYf+NBYWBXZFuDJEDBe8AfPQ3MsDdW98Il4Ky08vBJq/Bf5F9RtZ7bVqx0/oVCCcPWzMKjbSAlY5beJhGk06JFQbiXSw1hmKEf4KyrL9tFCOnB95T6MAZWuJjdF6wJxIaT+o0SdMYcvL9BJd0RgWMVttYFQfLFJ2mX41wu9tvI+7urhNjOphVSxAv6+P654CScn/4bYvHxWE0fMA3M/9yDOjb4W40WwClVF93JBH20GlkN4Fze5g5561MN3+4ulU8sN+lO+Qj9nM1hK5w5rJuv97IYL6co57xEc4ky6PKdIdnrsXoGoLz0QxmdW17Wpd9H+3mNx1+a1M3b7qbBAamh4fbHs9YEZe5dkyQPwOID+G3C3IQu2H3vTQ7KABGIWICPdZOr+n5Bz/au7oJgXL4pjg4B67MkXBD4RPhBf2vpo2g+Bn8w/ilZPd3WrOnJ217jdqJi0JV2LC54Z9PVrrV9EKeqpglxnRQ859rtXElLfURb1G8Vu6IxHlXjJXUavSsZsJebsl1LlT3lDhBZPLpntAauxCLXS6Az5AxfzkcLhRkoo6kl05QoNKd35URj+PV8zpV76SoudlZR+aUhQuYFJcBhjQCO4ptH183q0LOvX6QFIrQm7LswGYCmgfgqnS2S0A40KmYp0+xyRC2/Cgfl2P9z3KdbzY2lpo7Rcx5njeksJ6XyQR12qx5GdRfA7FBmZTl6Cm5aZuAj1nLIBmU3Zqw53hGSksIqPadhn7siHtPb/SP5OHWv61qfpGTSkC8/z+AEqWIIT83TbRNv6wLScxQpkIdZqolH4/O/iYHQF4DrfEiihZNQ6V2jb/30as2jcOA9iOraveZ1UdYxexFxZsFBaI9wfQK22pGepkwpqPau5eErNPkaIyfatxT2EkJdwXSCynttpxsUyNeUGKnhBRQW71AZ3IYodZCP/SXw7y3dPWwZ45U/8PKO8LhJkfHO+DhwyeRvB59G6DR8aDrk1xvxvPhQoXLa4aTp/MZPY2WubtmehIK0+gFsSJ2YdpgVI5kccedPWy1xdaqJVUDyqQ97BgKcvmNe8OZKxCMcmZD/ozmklR94/7vWGZAYY2OokEk4l8U/fADDVYPcYK0y5FVqp65Ef6OOse1SjM5lu/Me/NZsfn42DeXhF13o5FFZiXEGegeWXMIfj9Pp5e4AnqCmIZy7Nc8Yjx3/BRGXtV9NSZecPuO9gRAiC3UgcRh8/FAjQ2BgptQYWGRg/RdB5qmFWuIp8F4TshUGkKAroE6qZlf4WGK16MYqYd3/h8Bm44znZQmAHdGZquwAEukcN9Q4/4uYniTvj/CUKDDl6mloGpi8pOBOpURReu5jodCDn21diSVtkmWvT6uWa3mB/MJKNmJgxpcveeRttVHugML/bmhfZPY6YTQH0v9z35Qgv8aR5d+WO61BCQEs1izqwKmCAm6vLGTcSucgF5KT7inYcnZlZE+D+IzBV2VZVbBBeenT2ynAWu07pddei0dI9b0rF/JjstW9ZmMNbKGv+uUoVag1wTxrm/p8YExYlNQgL6Piy1FV/He9Gxgp3hTDaRpGmMnYvZKg/ABUtjMU0VqB8pSfIwoiXXtrP/be5pj9Ep3hpqWN3ne4+wkK0pcDHehcFAL93fxp4HcC1axkCRkNhqVGmaah4dKABpqQ+R9dCi0fPphMYeB/k3XylqqsBElSVu4xGCNEQZWK1whk5BuWohdBjKoWcNz202nnYWwA4YHZa7DSa2+241JAHlvHBrjhFI6K6OsOotqCpqiNPiI1qFpFdL1kyhmvgnt8UF0l96qejNaHb11MDpHbwuxm31yJ5Y2jUWaB+ze3L4DKjuqAYJkH2kpbo48iJA1LxuwfXa+boMJmlcysXn+nQh+sDshso6VA2JDZ6pEUcPNJLu144isLVmCaCfD+LiQrnGU/pO0coO8eCpciXF8nibDU5lfYvVgtbWwSu0q0qtYX0WOLV2af6N9og61GprA/3bOGjYcwUg6pswOs/AodxhqnBZwswWYGbNw2NFwljS16tKAVXxwSGwNkkrBry0jI6j/G2BZh7iBTAHOv19g4UAS0KsD8ZSQY7D/B2vmFCXTsjU50aOzCfwSpgxPdkNFiXnpHvnpYi8DU4DfpkX9N8R3jKz760KjH1ON/Da+S9W9rb+JTUJTZcBoDeelYhR8nGJtOkYXAhR9crhfuNjHEPxmFDxU8RFnw4WaxGpTmKKDGqOlYXUaRYRbXAAJ/ZnxVvWSDqIz7rEdRtJ9XYCOiRQt0HQD+IW21FlVubVh+cNLyKPwaY+AOdHqcHj+SFK+MGkAJS0UT2Hu+Xb3eS+IWXCpIfV2EZobpQQ7sq67ggXamwkX3eWkg6qEC0iRCNTfdvpIuXz7otN6VibbW5cjjLIeUYRrwiiziqlEACDk93qal3zRrwOiaZuoz4Jb2YiReJi9/7g1bCb2agYltgUZzYxUXSp2T25pcWGbO1La7xtaeE/4mjyMYqV2hl5mOG0AbtsqraxXa3tqG3ePEO6tabmUbkNZec3ktXHNIXxaZAdO9YyF9VSuv27zDU0fDamwDWle3mEllpYMAhXBoEyrPO+S03Kog6F28IdOQcvE2GokUbl5PnKs10pwkGXGl8s4jZc3CFpTYK1Oj8cLCdtPcV7uh2JOi7Y5nFQVyBtUT8f8R++4dgOZypJUVv5sgztu3qNtGH78ALR4zSAbvLlmiqKv3fzwh0UwBk5GJBwR1lWt2Jr4zFpjbRUOhnZwuGQNX4ZA74yTAzAMNhWeAMMmqMi3958M2+NZlFMKWRV5uaKPiOMsVNtbPGV+vn7eOVIkkkx5UwHh6+HPfzzeht9cVooHind2gvnL6w5XbIuNZzTx6U5dYHtZTWXOvAhGbrVxUisMH0eZXrtTYllYSuMUu2GYqvEyDnakWic+43jiTGs9mWV+Rjwr7lf3JoRha7ZCD2iPEaFX1Y6lNrSIpGygRIzFqHRNEfI/gicWgqONkTNc8gkTVIexg0nU4xSitiBM1tqkiGCb/aRpjGSaIXFqHOdNlh2IifttQKQXWcEDjFIvlEl3kJKnUEaW6P3EhApPz4aB0kqOJXFDKiRvw9+JMrMqRI6iqsADzWilr5JsCUlhkja694ON2D6d3LM0oWo6cKhhJk8HZKmOcqEu0tnqLKuwZoaRmYFYgoSpy/cy0kCf1YSAdV6TWsdlyOdpcYqow3h77W+uJ4BSGocDVTRVbL+GWP80edtZvPADtfILy5p0nCe1ZnYm6LZiW2X90Kg3HkJaTEu/hnG1tZf9tAnHZHyM45hUSKYrWfiAgJuYLDtx53wOJJ0esJBAY34lxEwhEDWck2+W0lA1fzd4tvM7k9A+d4EQWnJUgiXVFf+HDwOzLG2qE/hkYWt0jpyTUWzR9VtAlkTzb/DYYu6DyLu46TKDvMgfUqHxoz+YcscCts5VnFXVOD9/kwNQ5qfN7kHQSZDsLXrO7AEDf++A1PWYKbnsfQ1Vh61xXhmSxNtNXFL0TAjr+VcAPoFm4ePOf5fB69yi0+6DUZ1wA+hX+0aehmOIU+5WXZ8Z5dauHaD/bN58mMhDgtuNgyeh5Jjtz39meWHAshocyI9VWGJFZ76JXk6gU+hGf3otb75Fp/Dyp+21LYLAy/1kOEz7cfKn6+J6X+VilT2dpGsZuL1xQzK5eIRfggVIxu3lGZ8Jb9mVqxDLcYLccBqGNB+Z45dbMaUisCtSW/FVXoE9hRLeeGW8XYhBz3r/mksPi27bCM6ghXUkirC/RhOrfhWRDGfY5dydtmbuprtNaVaFA1+TboBupU5DupBfjbTEuYdzerWBUxpEvzWQrNmxYn+WuhexgKnDGY0WduHmu+gU58NycSt3FqauodUDfQkf2Gp8z4QXe1O9tHwB4GFAgoGDDM8mjJ43fzUvawRrfEXT+jWICXyaLUaY8yIbOYCA/Ex3tUvc1opR30cEZz1gWxTwEJWxoVoJpKZA6w6DebqRiVlqgnmZNRzgslSRdimV9tqNh9J47TKah15+iIf0s9MXcEQJc7jgcWW+uU+lh24aUfvypTBOMYf1ROkOr+6WWn3TlbiC8J94XZgkzWurnEwq3v2f8NtminfUBdDZ5oGckvMCJ5plSrPV0twKZYCCUoQDAcB7qnMOPEJpj3dcpAPLWaAdJaVc2q423qaYtLcN1CFhRYnGSAEBbwNxVx/UckVre0LigZD/tnh+lAVvUwWyxKxgpXQAw0wACJLuyF5+rxFhZY2zgSeTGQE7h8z+1cxsVFk76R/bTnHHgXJrDkQxWRyEMaRAyw3Gjdy0N85GSIQsk5bhUepVphUz/1XeYQCWdqBlLuVc/IAaQK0tRqT22kGG/DW1KpkWjgHOkmW0puN9aqR+7YhidGGVmrV8dIXyx2t6h6aGMLyaPrFrmG1ogmOfbZNOBlHOIAPnVWqMcYYPgtV2PdYTAYZY75p0bvYmkmE4cX6ShH6c9xYtvq6iNAOombU5AYgK876RmWRzknzwqPSYEWqbbdWAzuyO1SheqvpLC8vXCWyKrK+aDzjb+bDSNbNnwJN+h/5XR25qknk8d7ccvQicU4FbRPNVqeQeloPE4V59/VFdhyNGMrNfGmOFUKZCXHoWbIRHWJ66TwTxse2emmK3mrt8ugZ9twlhZwsxAu3pWKORARx7hYSmcSOcFaPwKRbhB5EUI+1/lUSNwxrr6ZhQdWyrJYHdcD7KmoZ3MkTR1LKk0aSDeW42RBuGRHZRXQCL2skd1z/zf7eTJ5/pzjILHYWfd7XC9+eN459elWkROEyu5FtX23a0sauy62WwCrTimWJb/YQOdK+zAzM7a7SoFkZQq32Ygb1bWfmBd3qHAko5tmm04WrEAn68y+bVpwKzOooHBkhzZDHMFLl1jE7NCbP6AUn19G0J+kbrVPerRJJcu14ibbPIEYl2L3v1VPlIHdpVeRqIQJR3TUIiSzeQaJKijrZ99pkcmjiEp4fIs3YII/blooWlrrAuAgKXqdWXVSJ2epvNNQVhfxNvkOyz3JSUr8GjvcKTHr6zDExSNLL0052f6Wyn2ZRrN67KSCu8GCumq92gwpWmbohPOep3XFWhgD9st3CAO8VKyX51gFjkSEEwb7Jvh2WvzZj/GmoHAYlLQmd1rw/4pVM4eip4RcjL7rCzUdCGSvUDqjOXo4RggTBRsrttkqovI7sITjGs4TVkb5gWhnEgrTKDBQDAepZW+h9tBuxNA2/QBb0EAiD3i5qyXK61+XzMSP8qDIGCzXE0bIpXoaIkTG83ct3Z8SPV/T3wjCailS12spAcx/T8/4/+sW2poZYJeL30LOKAQuE/Ul/3AlIKnHxXNjR3ERRLldd7eYi3xIePA9AEg1OU8CJBjoiVgW36+4BidXaWd9LBliCRuH6I65ydVXKYB491GGyASpD68mTA15GZaqyPq789vsq9lPiFv0RMx/BYvu4GW5bgK3pMoQSZeGiwRP52cFaMAb2AjlyPfmtVVkBhZlj9rIdnjbZDGQPSX0b6huW25rJyU2hFEDXydWZ5YX0QYMJIbLfwYO8xg5Yxr/S+jYcYEanOlJrNzrqMSWsRNj9xzFYvKUOQQw/NLs5gCT2fZ1jFQ0q/DELr/jwLiecJs+SVoT72ekFEykGc2W4DU2a6m1spQoa8iGE7943iRwYRwafObpzGc12oU71/YhByJ8vuYxXcfNTc57e3xJSO8cKeFlJPwLaGsYFxwPokyVpJf9WuegMkWKG6lqiky1ykJc9CkB+WlXqZ9LcPAWAYkNVRlC3SrJeBb6wq/YGLMVWug9Zo02nkOUuEkUx8d5U56y8xMp5sk8ahaHGZMmLL5cwnVFr6R1hCSCxkA/mbnLUl1fL7h5mG0gf5gTm35Wvzt48uf1fKegLIYOLzpB5+mqkoeRVxaX8+OOIsW+Mn7ALzZGo+xbqw9xDNFuDBrNCbkCIOm6N4Cg5s4ZiPWMF8D2F8EW0RfNWAUE/ijh9tNXx1v/KIQbld0ViCNLKzC2j2d89zVQx0KF85J5to2XR0SiMbhLEWjPNqaPVTJZpJ53GqpIM7GkJLgPAc+3SnjkIlPslJh7imNHenfObtsvqedxmpNE5qOIng2mhXewvtXFmTXzo9o3vx4mITCJx/iPFm0bKXeqeNP6Cvcf/LD1MqTUKbku7FGlKuWhWIAQ6sajqlwPpdE3FyVuadi5sDKKTFmwFsXqeMFGsjVER4zTRuhYQTpWGmP5JtH3JcrIvT0Nl3QwpIlsyaUwCnoK+vEBXKkC0EOph9cmSOltY4gZmuTVc104eBA+Z7zB2UWK+UPoBbvUXlkY2Ljd1Aqjq2GUR7ypBV4JuiLFkDLT8FmIMnX2IspnjsuPkHUv8UCEQg2+OTZ3MLxQ1LvTgwM2qoLIwQl35EY/IiGMhczLZYmfZH5AGZp022H0czz2WKX6RzE6gMB79+TUEnHLiuUOf4Q1sXZAw3dWajpgLzKDxyqrCGXgOkR3lol+mZ+4Hs+euaVVL7TzXQTyyPdjg3pHa8SJuhXTodte9XAXm5ApmGywNsw+1VgkcB4Ma0iqaCUz97S8qjepw3AbPMxqVkuKRra9S6SMGZTKB9eX0+/zPXdv4QFtnYu42tpHgdhcCFRHdge1Vk7jQkJ3m8tIokhC87yzO8mV41vWa7goORmDBcOquVqi61J352oAeZeGv1p8xlU30403GVpsOOAq1WPkqUcRCpOfUBbbiKmxKvE7KNI3J/I3h+VNzq+Ggmo6CW4EWhZZaasJdvz2t+YGbf970MOtZlr3CAjK7zSv1LmAvz54Cgxgp0IhF4eLVT3egIVQd0RsBw+YeQ1lInvPCILrWCYYBDNBIVcPtYddYiOyZNOZFrho0z+DZ/Y5gCvTZVnua7AyoZmvN6VMt0Zu/Ajcuq6jdJMvyOjo1fT/ZvVsTw/YlT9dBzd47ou0QGYAOq9v4IYTOSGdes2scJdXrK2sHt+angjyqQjErDMs7QCvS36+/33Z+qtV20Hcj6ROameUGPvzpxO6CMTeYsgogDXltSmonxL79bzEvpYLpYvnmRAshH7pOG/cE0llBR01GCe6TLAzly8qB5iJufM0ISjZp1oF79asdBtCjhS30wUVV/ZAGblH9KbDGx7/Ln7fMvcneG4W7bXqamqCUPctpMUzRhDjGGRqJ0xn6gQpi752r7pwgGdNtwz9qpi3yrIhwGSXI7xcAJmwalm5DfgvJaYb1wdf4DCf3H29D0Vp907Qn2gqFkgDEkft1s2DqCZyvzkZZVYGuagUT6I9+EExhTQvXVYmRndy/QOlE5VGdGE1Ffjn1SKEZGvQZ/ZOnQL0r9iFxGVXFmMYvZyGWYQw53VZJk8KY2YfZvktsVdJpihL1voPnIg4Ora9NAb29bIcdV4u3CDFU3ODL0TpNye31BjMuAx6+WRGZbT5NCYhmg5n81sT0WkVhmxaI7az6QZ0YGSh07fPywK3ml1K3+F6xhsRAvVhVT7bJ2Noo9lAdX9Q3EraAhd3f5eXrEJFg3oHs7lI3WmUMx/iP1C3v4lbECiPOFs45naQiMvH2HyMslc+7BhsrOPgN+0Kg9MzRFAwimWW8OByF/3IEMsZxHB40xZZ9FMiqrqHdgKGB8SpFfrKsapIGxM62c+vH8iqVncyNKR7uUFQEo/rp64HTNaBoyjnZDxFuuJpCOhrIde2xx/GthD9tfy/0vM7qjx6xSmujScy4cn9xfVYlJgrCCNIpxRI3Azike7PQ2rVo+fGYU5Nd5a3GLvcmT1Wfo1/gGbeFoongomJ7vaxMHA91mmqR7c2KOfPg3XaxfiaNea3qdHbGArKdG8tNcSyqN31IRFZP2gvbtZEyUMf+fzLanApzzS8S9ea2ZQW2HpJemcC24hWBu+v35/VKNmCNyFLiHg8kq67b3epmLA6Mv5waiTM2KnfkywbBfjXWRiPjZPpylZwc+D21XdLMfPMZ/+sZ3s2OkiJhr1jG0mXrMaaAxqxsG/MTjsYY0wXP7fwujpiZtboWmcdwCbKXIh3aBXpq3JUaVKSCyqWGslwvUXyreV0hai4fJjnjTy0lt+nPP8W1R6wPmuUPalqaVO35xdz1CX/AFfq1zcGQfhYruP6ytzk80SG5G9gYJjcpOvFNIG42ACkrb9LYS2t1wm05DfZXFsxGm/zqjmD5nnfjm7wsv035MHPpcX3bwjNOKnt9osSUybPFpvs8Hl4ZlEUDHdJKnc+koMmpB6YIMe3CoX9GTVwHElw85m3L005kD0DF1n3i0MZAY1376Sv5WCYEwqgneqrdmri6UYQpDKIVTS8WlhSH/QTxoEnFef6Lce5eSszg5E8DThcZtSWZL34NIVxzbiH8CzS6S0nuBtJ49Q/I4bah/OXTjGARBDKQkwWLINkhPVKOW+gT9U5SaQncDA4JHKXKoAFvbV2v0M1pOf/hERAmnfC8pggJJgbusGsbGq188dQhWQDVggUl31YWF9Jx3Cmw+T/ZYlEm0js4Dcj8BbGmFOQ8t04LgQEaCnYa3b2qdS/57UQK3bBjOigpMiz4OMQuSuwddxZdhKg8VYKSZoyWnlY8hcDjzHPyvfPxFQ0Nzm78M53gSOJqfYgOBAnwOgZBqnAeG5aycAbIJjl62d6l0ZkfMcxWRT6VXj16k+WHOjrX66r55/BRnIuJwe8UpO/D7r2/rbp479DtpjCo425aIA4QeuvYUM07Yx0KNaQxoMNSAvaZbdzx/3gticPbAUTCQp3FxY9REb70bR1A4JT9yV5S63qdoqmb1QN8meidxGz8yTY6VPUWBV1nLZ0WujzF0oeJRjIV8TpOGZEVAh/eXxY7wWH8a2KG+gYoOA5y5eP+ElfqkekuDAbOjXiha7e48qJJETRcuH3XriQJmDmZTD/xV+WtZeWYTMXJNmK55cmecf0y6M99Yp9l9cCWfWWFBaWDuwXq8cgQPA8W91K3PFlumUVyiqFbuypf9mW52Znq/EJN5ZIsMqeGFAHs+k6UvofNZiJnxV/vSXmWGWkOREHxMcGgvsKqD/g6BBW2FLlyLd5aU32/iDIdu8R1+QJApbREsmErI+ITSrmNxIIvMyXoCd+eL24PwpnDDOOVSPu77iZ4vZ2w6dW8zFvG/BV5pfNMp9jqSA6JjM5Y7e54J7KTXIVyRa33FDDG/cZHdt3GFjYQh4xwEkXLncQoJugR5v9p+ARwGa51ghMktGofl1InT7plAOQmHeokZsXqKi4wJXJlmgt3ZI85qILjm3MlcKZAQiSFvi0CrBR2qnRuQqNiiaC22xh5sXvQDTrHsQfFikhgt+B8OS42QInH7gArsPYnAfM3rHhT+xqQpiUIJ0L5TbUtzfGbA8qzLn01wjKyDn1rHx3yNIx2wAKrBC/COZKIa15GjVV7h3awAq5lMmfz/+Iyub3GPMZn4BE2t+tSt8GconqTpJyfHz4duCAoPY659kGUuyst58hB5nHd87Et1CX0cOKPHF0EJldxy9khBSEMhUlGT4OTT7wVcxUI/TwQFNCkJU2KQMFuqmsdCwvxe0im5PpSWn9lVBEcnS2sPbRpKgQpLFVp5Gb/3T0DidWzLzczRde2sdbi0YGydtwhpfGPubZ6gxWf1W9eZjrOBnLWgc3mIo/d9wgOOoPOnhn5rD/Y09JgVWumZ0ihFDUggKWpggIDNGTCYFF8PKIq9g9o/nCqdOpx1123vCf2MR0O28m3/oKOpiXGpMfiYi/A3ig5SMUO1YXNmpg8aTZqj1ZrFjtWDa46q+8S4DI7rkqCo5rcGkmCaBQypS5lOiNo4/w8nrZ1clXyBWZLHESrk8cNXFlhmSXunrDqlUv9aYTqylJNFEIVlYiUVI1lXb6T0+4VANafDWrSeuQ3SIh/+tiUQA/Ut3AeMDyuehJCvuZxGAn2AebpI/S+6tlB/06kJMmb3o5emQjSSj4fDxMVaF6lY4P4Qnfx2fqAofwBCls3xx6mDrqhDkr2ZA8J2yDamxlyT2o4F/k0qi6yDn499o4YE10TprluQwGmgceL4x7Jufovudget9Vdt7MQgxLsfz4px9oBv0fhUkDuArLFZbdopfDT04zAcUqL+7IbHqkeWHY4zZwUjAZFha4J4W+0t7w99oNJ8h9J+mWILm8lzqfeRDwH6wik7pLh0ZIRzW59uE5FzPd++bn9C0zFFPUrTxYJ/xzGrcPpXpVeSXkokh5ZHm3lci/lcmd3kHUeNd6+P+aPcXCexhtBTDC9R6zV2/aLQHvrvlH8+/o4sWZpcVUGgeVTqks7TfAJQfgScFJRsPEzAbGmak4oyc/veaZW1/4oEClyKubxTNCkDl68K0EQ+fchh3k6zKz3hwy+ctHW0x/sytlEgQG954YIu6pEy4z/5v0cbL1p9Rkhs0P/s+jCSS162cwj1gpxQW39AvcoZ5yOjtc9EhQujmkNXuFIAUo2WOZx52M9+aFOR00yRdwF/GwwNfA6YkpphM0eV4RCxMTGEZGGuwVcTUMKErkH+9wFp7BFsPqmeQk/53Vm+KEabSW4s7kkFY7iNgbMD7mMrbSx3VnrVEMm8XIY0+C0Qa7ioHkkndowhpDjpBBype6YODucBqycQknukHe92s1v2i60+BubnKlSMP8RMhJSw51/Za2r0RT2IXMrej1DfZ6ebt7agdvnvKC/HWAPs8J6Y71C1Oghvf4ZxlawufWCGM2fIX3hfV1zIWzFYPOvZge/1xnl0haLWDZAQsDeYb7LyvGOXGm0lrlqZ++rEEd6VB0mFjgqYCMoQvmq2pfEPle1JCN5U8Js3qEYetgpoJWBnbQSEht9iowgpYj8VlYQe4D+oXrUi/enljIVu4XFz8r30cJWudKUqYnL9EFoYYIcb2NlSsI1gipiMBdA3/WGHKWmh3ovGlKE2ibS3Q+2WaeiHhE5yMGh+bSl6gOMgVu7ZXIW33HHI815L43JXhHMQx8eQe9GAd+P6UiEpu/pOkq+tef2sW/S+g69HKDlTajxSQ7+ePhuN48CCVFU0A54YOFiC3ZlLN1n9ThSlnALJfceehvW+q/PMzg5YefV7hClTtS4A/zvS6W7z85zebC13QOWMYlXbnpsvnY9ulgVjadl3uaVUg3Z4VfpRFH4Z+L7xpbl+4gH51QSdWVyG4ydTlm36+0Tr+aF1R0o89JuQ639uqRKNAQxbeV/Pk5T/8+lwf3TI2EI7NQHAxZK4d3vaxqD5DGa6v6Gr4UcthRrZyXB5mA9f8QRGiQeEz7+ReyGDPOAU4BIws012ivovpdr0ct6CPbGYtolmwNpxTRpDJpqjnQJoE2gLbj8zgcyJc63JgptqTQ0ca2+kipGoU0tEUY/wTUtwSjqW7MJ5oNsD7o+3S6nOvq4D8XSqYQ8fWGFj50CIr2Xk4F2PKoT56eg+Z+/1tkyd1pxadYKUjl7PfXmRd14IM37/zuQo+W6hsj7bukX8Ba0xHijo5e7JOfU5faHEsy07d8NPePGaA2Y3H9eH89pqDniapOvhuWtaoYlgwNfWXRiGeXr8XWVv/0b3hFlgGHeXzWNjpRHzAFyQc4dRtPRuLzE14PrCpp7QozS/WM2tIV0epXFeslEDTKjzKGXkWtrqiYyZfpGyb3qCEESeG5/qokdaEEVrX2niyfJ1tyQ1qBLZcJYscUJoiYptwnWAgpcz2Mss/pT0lRd+33zStUFBGDzuXf8rka2VgAPkUlx+DCHPIsuMB8m7mTiFaDvrCiZ1S4NadIK73LGOraXF6qtRK4VmO82DRHjibgNeVPZfaqQO57QNMzX0AMqV1mHKGDnnhmZVaO7/dRflgX9wtIVfo5BDnXbKcOSzBl1coYdZZhBH+bzbAqOsAnUt+6j/L1OzrsDbcHijnOh99DC0VeZAixm4ZWR57DdKl+g9Qj/Hsh8k/YXO0ZNtXJ2r35c7RvOryg6/arQfdBBrNPlP2EiFXZ0SHFcr2SCadXZaY6MInEa3n1Rli4AA1tsMkizqurdASnvBObm4UAg4E/nZBUxtX7gLn02QL5XUXrt9qlfegAjIxg7voF5g4U1YA5upwX6E63Zx/71kvkGqluDtIcWAxKKG7yxlRIWPBJOvFbThw4szf3YW9VQA6SmytjlLqyXUDOyd6sxVYrQoZ/OHeBDbYksYm5WFdm9x9D+Wde9WXsowIqvZk6QhmDdv0RlY0Po1smTAXkT2AWWMKRm0MfM/p1Wk89StdDrOj9Oz6v4wpqgwTQ3Vh8FCUT/wbUBUjJ2FF38LclwJzl6XB+euNyyuK26TiU3z+0+xkmqsgykExtOFMMN0DoF4F+0m3vjo3k8Jf1KH+4Ygdv5k8+2qJpS0bIT43tV113OKbGhQCeDtWspjXbBcuEL1zv3XVYGoUn1HRlZWqIW8ednPeHoDb859GmUU0g3Rr/uqHrMZogbabRigKRihHVubKGAfL3H/F2A1phxG+6iZzk+8ipxMHyY+1pZfY+EUPJT3iFm8h/B+iv54bXxpE5REMoqsn6wm0hqi7XwmO9PICJbwk2RemsOmY4U4SEnkyvnyCk/2P3IqxUT7o4kUeoo2mWyxfXtovab2xKqAwaQYPehN2T6C+6SVUO2TtJFhh3cC9G1xUY0yiHXsvr8CbzMWEVcNLXn38nrqNswNVi+vZUbfX3kVWXFTZ1I2cQWJjtCOdYqIRrg4p45r38lYHnRhd1rCh3Tzjjk0Cyz9hhXgOV4paD5T/El0zpqxMAlXwSr2j562iAPmv50VAfq5arWtz6KG2V85OlldXjlmB0VwrJJsKpiJy+6im2uHFqFxnKxMsnrTNumdiu3dh5XimSYap1ODlUfN7z83uFWkq0wRpAX+fAz79F+ltJToRI9S1esi+pa2HG7IwJ/xq6hUdJDbgvdiuV6pfq/F3ipJm9cfVvxHMYxWVICW93u+ao5zjAxqc4dzRhvD1bD3mPn+u9C7ZLIBYqfmhvsukP1fTgrPDkesnXNndhlVLiKgbThaofp87ZR+m+qNyUvsJQDujYsTZ6NGdSmRorIGx4qkS08ItW7zZqvzmmsk8Pe66sMYBo8NusHbeACK+RwFSbWnlAYBr6R89hn9A7+XkIfxXZpOBDt+4M+poWOHjqx+2/Z97pGLwWrdMZ9GlbuCMMCW/fzEcGdC9exHgp4nrWhQZFE72lQ7Ppwkl02lcRFwjLaMYYbEoImktj6c5T55J5lI3FfQhIJnI7qKf2KnGRBgS9TfqWQcnFkfLfZmgGLvshsVPHn5QaiGTkZzqP7ro6RYaym8xrS/HtrOTqij5Gw0e13bYMNCUwEBZZaHqV7PVPDFbhBPGRGaiwqHsJqZ8j2NOEqUPWL6KI24wQE2fqXtVR3Kovecsb9vWKKd6VGK70i+i+OArU9Aw4XgEG/CjU/jry5NdhtRZJduDVbbl0xzUbZUpViBcY8/P5cD7uGLgI8+rzKtqaGNgtEwdTBd0dpYYO2bAKKLtiNSPvj1y8ozoSRkUR56aPqm8e0JxGbGdSVofmP2u7cJSt7L9ptdBBSAcMHrZ1FV6of7BpqQnxQ4OlIIN+gTJPlcRRCuHntglXC460YhnTfvNBmllm6mpawmjBh4Z293lk2Vyq+AzobAVAhSp1WhualcBIASOqfdMAgdR2Okvdhx1VexgYl01fZ7qHq4imxugioLkzmAg9ayZ8US44HuZWJOhFGzSesK9wp4WCqRK8HMwJluATKzKBn8KxKAklUgqFrOFZyVBfWDlto9CeJOSwYCSkJCjpcWeV1l+fz/7GnJ+Wg11QOEbpvV7nZyHPvKjqG2av/e5nyEWGhLyWNKsJRyafOrn1+UwOht+ngf7of7butCCNNb+qqOT5PXSHDWpIHr9LeBhOIRljSiPne3XX2QZ/EmDE27lxysZAN2gTbK/IC6eLTKXdXW0sfTFIF/dAf8N2fnlwYSNQAfL+RfWcBdM7SiD4KTCaoEDlRh5TcOKLatV9Q0v8MIt3/t5X/MVgVLi3GRVavdTD6oAn7s6tXHa9QBXGV8qidLNrhSLk/FOH8cC0edwHFW8mo/TpVYocU/ugA0W0RbpHAosYWawTO5qJZlEC5mo6K4W6zHzIInr5UvOgAyEnR8arKI7oCuARq9Cl76A9QRLFk3rxpJTyqWfUY6cWEK01tmqYx6d+r5FDDqfkhRoqwRtHTio4UR8JgzZorfXzd6FbuaQaqrVhm5ZFyFC4VcwizpaEwK6HLkuaOkTgQCyPvCp6uOk4yx0VqHdzgKCYaS339xYAH9z4+BafjKgcP/J9kshEW7lxjfVIrAZvCasEOyialrecVDJ22sT72IxcDZePBZeOin2UqVEHBddodME1Zcvlz4OjgqoQyUrD62fWv6lNy2WvAHZ+ll4rBEAUEAvv9oNOXGCaAL4xmlB5iQDp67iKXqeHqEh6wVWhH1l2PEsJqjVuBsTJKnFQ+UPh4lRlOANNuCcGkIyhGsnDttGFiPdIlmxzmqwS43AAAAAElFTkSuQmCC",zd=Fb;const Ub=new Ne(0);class Ob extends wn{constructor(e,t){super("SSGIPass"),this.needsSwap=!1,this.defaultFragmentShader="",this.frame=0,this.cachedMaterials=new WeakMap,this.visibleMeshes=[],this.ssgiEffect=e,this._scene=e._scene,this._camera=e._camera,this.fullscreenMaterial=new Db,this.defaultFragmentShader=this.fullscreenMaterial.fragmentShader;const n=!t.diffuseOnly&&!t.specularOnly?2:1;this.renderTarget=new cr(1,1,n,{type:bt,depthBuffer:!1}),this.fullscreenMaterial.uniforms.cameraMatrixWorld.value=this._camera.matrixWorld,this.fullscreenMaterial.uniforms.viewMatrix.value=this._camera.matrixWorldInverse,this.fullscreenMaterial.uniforms.projectionMatrix.value=this._camera.projectionMatrix,this.fullscreenMaterial.uniforms.inverseProjectionMatrix.value=this._camera.projectionMatrixInverse,this.fullscreenMaterial.uniforms.cameraPos.value=this._camera.position,e._camera.isPerspectiveCamera&&(this.fullscreenMaterial.defines.PERSPECTIVE_CAMERA=""),t.diffuseOnly&&(this.fullscreenMaterial.defines.diffuseOnly=""),t.specularOnly&&(this.fullscreenMaterial.defines.specularOnly=""),this.initMRTRenderTarget()}initialize(e,...t){super.initialize(e,...t),new ji().load(zd,n=>{n.minFilter=it,n.magFilter=it,n.wrapS=_n,n.wrapT=_n,n.encoding=yn,this.fullscreenMaterial.uniforms.blueNoiseTexture.value=n})}get texture(){return this.renderTarget.texture[0]}get specularTexture(){const e="specularOnly"in this.fullscreenMaterial.defines?0:1;return this.renderTarget.texture[e]}initMRTRenderTarget(){this.gBuffersRenderTarget=new cr(1,1,4,{minFilter:it,magFilter:it}),this.gBuffersRenderTarget.depthTexture=new as(1,1),this.gBuffersRenderTarget.depthTexture.type=ft,this.backSideDepthPass=new Nb(this._scene,this._camera),this.depthTexture=this.gBuffersRenderTarget.texture[0],this.normalTexture=this.gBuffersRenderTarget.texture[1],this.diffuseTexture=this.gBuffersRenderTarget.texture[2],this.emissiveTexture=this.gBuffersRenderTarget.texture[3],this.diffuseTexture.minFilter=Ve,this.diffuseTexture.magFilter=Ve,this.diffuseTexture.encoding=He,this.diffuseTexture.needsUpdate=!0,this.emissiveTexture.minFilter=Ve,this.emissiveTexture.magFilter=Ve,this.emissiveTexture.type=bt,this.emissiveTexture.needsUpdate=!0,this.normalTexture.type=bt,this.normalTexture.needsUpdate=!0,this.fullscreenMaterial.uniforms.normalTexture.value=this.normalTexture,this.fullscreenMaterial.uniforms.depthTexture.value=this.depthTexture,this.fullscreenMaterial.uniforms.diffuseTexture.value=this.diffuseTexture,this.fullscreenMaterial.uniforms.emissiveTexture.value=this.emissiveTexture,this.fullscreenMaterial.uniforms.backSideDepthTexture.value=this.backSideDepthPass.renderTarget.texture}setSize(e,t){this.renderTarget.setSize(e*this.ssgiEffect.resolutionScale,t*this.ssgiEffect.resolutionScale),this.gBuffersRenderTarget.setSize(e,t),this.backSideDepthPass.setSize(e,t),this.fullscreenMaterial.uniforms.texSize.value.set(this.renderTarget.width,this.renderTarget.height)}dispose(){super.dispose(),this.renderTarget.dispose(),this.gBuffersRenderTarget.dispose(),this.backSideDepthPass.dispose(),this.fullscreenMaterial.dispose(),this.normalTexture=null,this.depthTexture=null,this.diffuseTexture=null,this.emissiveTexture=null}setMRTMaterialInScene(){this.visibleMeshes=ra(this._scene);for(const t of this.visibleMeshes){const n=t.material;let[i,s]=this.cachedMaterials.get(t)||[];if(n!==i){var e;s&&s.dispose(),s=new Sb,Ud(n,s),s.uniforms.normalScale.value=n.normalScale,(e=t.skeleton)!=null&&e.boneTexture&&(s.defines.USE_SKINNING="",s.defines.BONE_TEXTURE="",s.uniforms.boneTexture.value=t.skeleton.boneTexture,s.needsUpdate=!0),this.cachedMaterials.set(t,[n,s])}const o=Object.keys(n).find(c=>{const u=n[c];return u instanceof Ct&&u.matrix});o&&(s.uniforms.uvTransform.value=n[o].matrix),n.emissive&&(s.uniforms.emissive.value=n.emissive),n.color&&(s.uniforms.color.value=n.color),Fr(s,n,"normalMap","USE_NORMALMAP",!0),Fr(s,n,"roughnessMap","USE_ROUGHNESSMAP",!0),Fr(s,n,"metalnessMap","USE_	METALNESSMAP",!0),Fr(s,n,"map","USE_MAP",!0),Fr(s,n,"emissiveMap","USE_EMISSIVEMAP",!0),Fr(s,n,"alphaMap","USE_ALPHAMAP",!0);const a=this.fullscreenMaterial.uniforms.blueNoiseTexture.value;if(a){const{width:c,height:u}=a.source.data;s.uniforms.blueNoiseTexture.value=a,s.uniforms.blueNoiseRepeat.value.set(this.renderTarget.width/c,this.renderTarget.height/u)}s.uniforms.texSize.value.set(this.renderTarget.width,this.renderTarget.height),s.uniforms.frame.value=this.frame,t.visible=ql(t,n);const l=typeof n.roughness=="number"?n.roughness:1;s.uniforms.roughness.value=this.ssgiEffect.selection.size===0||this.ssgiEffect.selection.has(t)?l:1e11,s.uniforms.metalness.value=t.material.metalness||0,s.uniforms.emissiveIntensity.value=t.material.emissiveIntensity||0,t.material=s}}unsetMRTMaterialInScene(){for(const e of this.visibleMeshes){e.visible=!0;const[t]=this.cachedMaterials.get(e);e.material=t}}render(e){this.frame=(this.frame+this.ssgiEffect.spp)%65536;const{background:t}=this._scene;this._scene.background=Ub,this.setMRTMaterialInScene(),e.setRenderTarget(this.gBuffersRenderTarget),e.render(this._scene,this._camera),this.unsetMRTMaterialInScene(),this.ssgiEffect.autoThickness&&this.backSideDepthPass.render(e),this.fullscreenMaterial.uniforms.frame.value=this.frame,this.fullscreenMaterial.uniforms.cameraNear.value=this._camera.near,this.fullscreenMaterial.uniforms.cameraFar.value=this._camera.far,this.fullscreenMaterial.uniforms.viewMatrix.value.copy(this._camera.matrixWorldInverse),this.fullscreenMaterial.uniforms.accumulatedTexture.value=this.ssgiEffect.svgf.denoisePass.texture;const n=this.fullscreenMaterial.uniforms.blueNoiseTexture.value;if(n){const{width:i,height:s}=n.source.data;this.fullscreenMaterial.uniforms.blueNoiseRepeat.value.set(this.renderTarget.width/i,this.renderTarget.height/s)}e.setRenderTarget(this.renderTarget),e.render(this.scene,this.camera),this._scene.background=t}}var kb=`#define GLSLIFY 1
uniform sampler2D inputTexture;uniform sampler2D sceneTexture;uniform sampler2D depthTexture;uniform int toneMapping;
#include <tonemapping_pars_fragment>
#pragma tonemapping_pars_fragment
void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 depthTexel=textureLod(depthTexture,uv,0.);vec3 ssgiClr;if(dot(depthTexel.rgb,depthTexel.rgb)==0.){ssgiClr=textureLod(sceneTexture,uv,0.).rgb;}else{ssgiClr=textureLod(inputTexture,uv,0.).rgb;switch(toneMapping){case 1:ssgiClr=LinearToneMapping(ssgiClr);break;case 2:ssgiClr=ReinhardToneMapping(ssgiClr);break;case 3:ssgiClr=OptimizedCineonToneMapping(ssgiClr);break;case 4:ssgiClr=ACESFilmicToneMapping(ssgiClr);break;case 5:ssgiClr=CustomToneMapping(ssgiClr);break;}ssgiClr*=toneMappingExposure;}outputColor=vec4(ssgiClr,1.0);}`,zb=`#define GLSLIFY 1
{vec3 viewNormal=normalize((vec4(normal,1.)*cameraMatrixWorld).xyz);roughness*=roughness;vec3 viewPos=getViewPosition(depth);vec3 viewDir=normalize(viewPos);vec3 T,B;vec3 n=viewNormal;vec3 v=viewDir;vec3 V=(vec4(v,1.)*viewMatrix).xyz;vec3 N=(vec4(n,1.)*viewMatrix).xyz;Onb(N,T,B);V=ToLocal(T,B,N,V);vec3 H=SampleGGXVNDF(V,roughness,roughness,0.25,0.25);if(H.z<0.0)H=-H;vec3 l=normalize(reflect(-V,H));l=ToWorld(T,B,N,l);l=(vec4(l,1.)*cameraMatrixWorld).xyz;l=normalize(l);if(dot(viewNormal,l)<0.)l=-l;vec3 h=normalize(v+l);float VoH=max(EPSILON,dot(v,h));VoH=pow(VoH,0.875);vec4 diffuseTexel=textureLod(diffuseTexture,vUv,0.);vec3 diffuse=diffuseTexel.rgb;float metalness=diffuseTexel.a;vec3 f0=mix(vec3(0.04),diffuse,metalness);vec3 F=F_Schlick(f0,VoH);vec3 directLight=textureLod(directLightTexture,vUv,0.).rgb;
#ifdef ssgi
vec3 diffuseLightingColor=denoisedColor[0];vec3 diffuseComponent=diffuse*(1.-metalness)*(1.-F)*diffuseLightingColor;vec3 specularLightingColor=denoisedColor[1];vec3 specularComponent=specularLightingColor*F;denoisedColor[0]=diffuseComponent+specularComponent;
#endif
#ifdef ssdgi
vec3 diffuseLightingColor=denoisedColor[0];vec3 diffuseComponent=diffuse*(1.-metalness)*(1.-F)*diffuseLightingColor;denoisedColor[0]=diffuseComponent;
#endif
#ifdef ssr
vec3 specularLightingColor=denoisedColor[0];vec3 specularComponent=specularLightingColor*F;denoisedColor[0]=specularComponent;
#endif
#ifdef useDirectLight
denoisedColor[0]+=directLight;
#endif
}`,Bb=`#define GLSLIFY 1
uniform sampler2D diffuseTexture;uniform sampler2D directLightTexture;vec3 getViewPosition(const float depth){float clipW=projectionMatrix[2][3]*depth+projectionMatrix[3][3];vec4 clipPosition=vec4((vec3(vUv,depth)-0.5)*2.0,1.0);clipPosition*=clipW;return(projectionMatrixInverse*clipPosition).xyz;}vec3 F_Schlick(const vec3 f0,const float theta){return f0+(1.-f0)*pow(1.0-theta,5.);}vec3 SampleGGXVNDF(const vec3 V,const float ax,const float ay,const float r1,const float r2){vec3 Vh=normalize(vec3(ax*V.x,ay*V.y,V.z));float lensq=Vh.x*Vh.x+Vh.y*Vh.y;vec3 T1=lensq>0. ? vec3(-Vh.y,Vh.x,0.)*inversesqrt(lensq): vec3(1.,0.,0.);vec3 T2=cross(Vh,T1);float r=sqrt(r1);float phi=2.0*PI*r2;float t1=r*cos(phi);float t2=r*sin(phi);float s=0.5*(1.0+Vh.z);t2=(1.0-s)*sqrt(1.0-t1*t1)+s*t2;vec3 Nh=t1*T1+t2*T2+sqrt(max(0.0,1.0-t1*t1-t2*t2))*Vh;return normalize(vec3(ax*Nh.x,ay*Nh.y,max(0.0,Nh.z)));}void Onb(const vec3 N,inout vec3 T,inout vec3 B){vec3 up=abs(N.z)<0.9999999 ? vec3(0,0,1): vec3(1,0,0);T=normalize(cross(up,N));B=cross(N,T);}vec3 ToLocal(const vec3 X,const vec3 Y,const vec3 Z,const vec3 V){return vec3(dot(V,X),dot(V,Y),dot(V,Z));}vec3 ToWorld(const vec3 X,const vec3 Y,const vec3 Z,const vec3 V){return V.x*X+V.y*Y+V.z*Z;}`;const dr={distance:10,thickness:10,autoThickness:!1,maxRoughness:1,blend:.9,denoiseIterations:1,denoiseKernel:2,denoiseDiffuse:10,denoiseSpecular:10,depthPhi:2,normalPhi:50,roughnessPhi:1,envBlur:.5,importanceSampling:!0,directLightMultiplier:1,maxEnvLuminance:50,steps:20,refineSteps:5,spp:1,resolutionScale:1,missedRays:!1},{render:mh}=ks.prototype,gh=ab(),vh=ob();class ns extends jl{constructor(e,t,n,i=dr){i={...dr,...i},super("SSGIEffect",kb,{type:"FinalSSGIMaterial",uniforms:new Map([["inputTexture",new J(null)],["sceneTexture",new J(null)],["depthTexture",new J(null)],["toneMapping",new J(Zn)]])}),this.selection=new bw,this.isUsingRenderPass=!0,this._scene=e,this._camera=t;let s;i.diffuseOnly?(s="ssdgi",i.reprojectSpecular=!1,i.roughnessDependent=!1,i.basicVariance=25e-5,i.neighborhoodClamping=!1):i.specularOnly?(s="ssr",i.reprojectSpecular=!0,i.roughnessDependent=!0,i.basicVariance=25e-5,i.neighborhoodClamping=!0,i.neighborhoodClampingDisocclusionTest=!1):(s="ssgi",i.reprojectSpecular=[!1,!0],i.neighborhoodClamping=[!1,!0],i.neighborhoodClampingDisocclusionTest=!1,i.roughnessDependent=[!1,!0],i.basicVariance=[25e-5,25e-5]);const o=i.diffuseOnly||i.specularOnly?1:2;this.svgf=new Mb(e,t,n,o,zb,Bb,i),s==="ssgi"?this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.fragmentShader=this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.fragmentShader.replace("accumulatedTexel[ 1 ].rgb = clampedColor;",`
						float roughness = inputTexel[ 0 ].a;
						accumulatedTexel[ 1 ].rgb = mix(accumulatedTexel[ 1 ].rgb, clampedColor, 1. - sqrt(roughness));
						`):s==="ssr"&&(this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.fragmentShader=this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.fragmentShader.replace("accumulatedTexel[ 0 ].rgb = clampedColor;",`
					accumulatedTexel[ 0 ].rgb = mix(accumulatedTexel[ 0 ].rgb, clampedColor, 0.5);
					`)),this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.needsUpdate=!0,this.ssgiPass=new Ob(this,i),i.diffuseOnly?this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.inputTexture0.value=this.ssgiPass.texture:i.specularOnly?this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.inputTexture0.value=this.ssgiPass.specularTexture:(this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.inputTexture0.value=this.ssgiPass.texture,this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.inputTexture1.value=this.ssgiPass.specularTexture),this.svgf.setJitteredGBuffers(this.ssgiPass.depthTexture,this.ssgiPass.normalTexture),this.svgf.denoisePass.fullscreenMaterial.uniforms={...this.svgf.denoisePass.fullscreenMaterial.uniforms,diffuseTexture:new J(null),directLightTexture:new J(null)},this.svgf.denoisePass.fullscreenMaterial.defines[s]="",this.ssgiPass.fullscreenMaterial.defines.directLightMultiplier=i.directLightMultiplier.toPrecision(5),this.svgf.denoisePass.fullscreenMaterial.uniforms.diffuseTexture.value=this.ssgiPass.diffuseTexture,this.lastSize={width:i.width,height:i.height,resolutionScale:i.resolutionScale},this.sceneRenderTarget=new Ft(1,1,{encoding:He}),this.renderPass=new ks(this._scene,this._camera),this.renderPass.renderToScreen=!1,this.setSize(i.width,i.height);const a=this,l=this.renderPass;ks.prototype.render=function(...c){if(this!==l){const u=a.isUsingRenderPass;a.isUsingRenderPass=!0,u!=a.isUsingRenderPass&&a.updateUsingRenderPass()}mh.call(this,...c)},this.makeOptionsReactive(i)}updateUsingRenderPass(){this.isUsingRenderPass?(this.ssgiPass.fullscreenMaterial.defines.useDirectLight="",this.svgf.denoisePass.fullscreenMaterial.defines.useDirectLight=""):(delete this.ssgiPass.fullscreenMaterial.defines.useDirectLight,delete this.svgf.denoisePass.fullscreenMaterial.defines.useDirectLight),this.ssgiPass.fullscreenMaterial.needsUpdate=!0,this.svgf.denoisePass.fullscreenMaterial.needsUpdate=!0}makeOptionsReactive(e){let t=!1;const n=this.ssgiPass.fullscreenMaterial.uniforms,i=Object.keys(n),s=this.svgf.svgfTemporalReprojectPass;for(const o of Object.keys(e))Object.defineProperty(this,o,{get(){return e[o]},set(a){if(!(e[o]===a&&t))switch(e[o]=a,o){case"denoiseIterations":this.svgf.denoisePass.iterations=a;break;case"denoiseDiffuse":this.svgf.denoisePass.fullscreenMaterial.uniforms.denoise.value[0]=a;break;case"denoiseSpecular":this.svgf.denoisePass.fullscreenMaterial.uniforms.denoise.value[1]=a;break;case"denoiseKernel":case"depthPhi":case"normalPhi":case"roughnessPhi":this.svgf.denoisePass.fullscreenMaterial.uniforms[o].value=a;break;case"resolutionScale":this.setSize(this.lastSize.width,this.lastSize.height),s.reset();break;case"spp":this.ssgiPass.fullscreenMaterial.fragmentShader=this.ssgiPass.defaultFragmentShader.replaceAll("spp",a),a!==1&&(this.ssgiPass.fullscreenMaterial.fragmentShader=Xl(this.ssgiPass.fullscreenMaterial.fragmentShader.replace("#pragma unroll_loop_start","").replace("#pragma unroll_loop_end",""))),this.ssgiPass.fullscreenMaterial.needsUpdate=t,s.reset();break;case"steps":case"refineSteps":this.ssgiPass.fullscreenMaterial.defines[o]=parseInt(a),this.ssgiPass.fullscreenMaterial.needsUpdate=t,s.reset();break;case"importanceSampling":case"missedRays":case"autoThickness":a?this.ssgiPass.fullscreenMaterial.defines[o]="":delete this.ssgiPass.fullscreenMaterial.defines[o],this.ssgiPass.fullscreenMaterial.needsUpdate=t,s.reset();break;case"blend":this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.uniforms[o].value=a,s.reset();break;case"distance":n.rayDistance.value=a,s.reset();break;default:i.includes(o)&&(n[o].value=a,s.reset())}}}),this[o]=e[o];t=!0}initialize(e,...t){super.initialize(e,...t),this.ssgiPass.initialize(e,...t)}setSize(e,t,n=!1){e===void 0&&t===void 0||!n&&e===this.lastSize.width&&t===this.lastSize.height&&this.resolutionScale===this.lastSize.resolutionScale||(this.ssgiPass.setSize(e,t),this.svgf.setSize(e,t),this.sceneRenderTarget.setSize(e,t),this.lastSize={width:e,height:t,resolutionScale:this.resolutionScale})}dispose(){super.dispose(),this.ssgiPass.dispose(),this.svgf.dispose(),ks.prototype.render=mh}keepEnvMapUpdated(){const e=this.ssgiPass.fullscreenMaterial;if(this._scene.environment&&e.uniforms.envMapInfo.value.mapUuid!==this._scene.environment.uuid){var t;if(((t=this._scene.environment)==null?void 0:t.mapping)===pn){this._scene.environment.generateMipmaps||(this._scene.environment.generateMipmaps=!0,this._scene.environment.minFilter=tc,this._scene.environment.magFilter=tc,this._scene.environment.needsUpdate=!0);const n=ib(this._scene.environment);e.uniforms.maxEnvMapMipLevel.value=n,e.uniforms.envMapInfo.value.map=this._scene.environment,e.defines.USE_ENVMAP="",delete e.defines.importanceSampling,this.importanceSampling?e.uniforms.envMapInfo.value.updateFrom(this._scene.environment).then(()=>{e.defines.importanceSampling="",e.needsUpdate=!0}):e.uniforms.envMapInfo.value.map=this._scene.environment}else delete e.defines.USE_ENVMAP,delete e.defines.importanceSampling;this.svgf.svgfTemporalReprojectPass.reset(),e.needsUpdate=!0}}update(e,t){this.keepEnvMapUpdated();const n=this.isUsingRenderPass?t:this.sceneRenderTarget,i=[];if(!this.isUsingRenderPass){const o=[];for(const a of ra(this._scene)){if(a.isScene)return;a.visible=!ql(a),a.visible?i.push(a):o.push(a)}this.renderPass.render(e,this.sceneRenderTarget);for(const a of o)a.visible=!0;for(const a of i)a.visible=!1}this.ssgiPass.fullscreenMaterial.uniforms.directLightTexture.value=n.texture,this.svgf.denoisePass.fullscreenMaterial.uniforms.directLightTexture.value=n.texture,this.ssgiPass.render(e),this.svgf.render(e),this.uniforms.get("inputTexture").value=this.svgf.texture,this.uniforms.get("sceneTexture").value=n.texture,this.uniforms.get("depthTexture").value=this.ssgiPass.depthTexture,this.uniforms.get("toneMapping").value=e.toneMapping;for(const o of i)o.visible=!0;const s=!this.diffuseOnly&&!this.specularOnly;gh.value=s||this.diffuseOnly===!0,vh.value=s||this.specularOnly==!0,cancelAnimationFrame(this.rAF2),cancelAnimationFrame(this.rAF),cancelAnimationFrame(this.usingRenderPassRAF),this.rAF=requestAnimationFrame(()=>{this.rAF2=requestAnimationFrame(()=>{gh.value=!1,vh.value=!1})}),this.usingRenderPassRAF=requestAnimationFrame(()=>{const o=this.isUsingRenderPass;this.isUsingRenderPass=!1,o!=this.isUsingRenderPass&&this.updateUsingRenderPass()})}}ns.DefaultOptions=dr;class Gb extends ns{constructor(e,t,n,i=dr){i={...dr,...i},i.specularOnly=!0,super(e,t,n,i)}}class Vb extends ns{constructor(e,t,n,i=dr){i={...dr,...i},i.diffuseOnly=!0,super(e,t,n,i)}}var Hb=`#define GLSLIFY 1
uniform sampler2D inputTexture;uniform sampler2D velocityTexture;uniform sampler2D blueNoiseTexture;uniform ivec2 blueNoiseSize;uniform vec2 texSize;uniform float intensity;uniform float jitter;uniform float deltaTime;uniform int frame;uvec4 s0,s1;ivec2 pixel;void rng_initialize(vec2 p,int frame){pixel=ivec2(p);s0=uvec4(p,uint(frame),uint(p.x)+uint(p.y));s1=uvec4(frame,frame*15843,frame*31+4566,frame*2345+58585);}void pcg4d(inout uvec4 v){v=v*1664525u+1013904223u;v.x+=v.y*v.w;v.y+=v.z*v.x;v.z+=v.x*v.y;v.w+=v.y*v.z;v=v ^(v>>16u);v.x+=v.y*v.w;v.y+=v.z*v.x;v.z+=v.x*v.y;v.w+=v.y*v.z;}ivec2 shift2(){pcg4d(s1);return(pixel+ivec2(s1.xy % 0x0fffffffu))% blueNoiseSize;}void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 velocity=textureLod(velocityTexture,vUv,0.0);if(dot(velocity.xyz,velocity.xyz)==0.0){outputColor=inputColor;return;}velocity.xy*=intensity;rng_initialize(vUv*texSize,frame);vec2 blueNoise=texelFetch(blueNoiseTexture,shift2(),0).rg-0.5;vec2 jitterOffset=jitter*velocity.xy*blueNoise;float frameSpeed=(1./100.)/deltaTime;vec2 startUv=vUv+(jitterOffset-velocity.xy*0.5)*frameSpeed;vec2 endUv=vUv+(jitterOffset+velocity.xy*0.5)*frameSpeed;startUv=max(vec2(0.),startUv);endUv=min(vec2(1.),endUv);vec3 motionBlurredColor;for(float i=0.0;i<=samplesFloat;i++){vec2 reprojectedUv=mix(startUv,endUv,i/samplesFloat);vec3 neighborColor=textureLod(inputTexture,reprojectedUv,0.0).rgb;motionBlurredColor+=neighborColor;}motionBlurredColor/=samplesFloat;outputColor=vec4(motionBlurredColor,inputColor.a);}`;const xh={intensity:1,jitter:1,samples:16};class Wb extends jl{constructor(e,t=xh){t={...xh,...t},super("MotionBlurEffect",Hb,{type:"MotionBlurMaterial",uniforms:new Map([["inputTexture",new J(null)],["velocityTexture",new J(e.texture)],["blueNoiseTexture",new J(null)],["blueNoiseSize",new J(new _e)],["texSize",new J(new _e)],["intensity",new J(1)],["jitter",new J(1)],["frame",new J(0)],["deltaTime",new J(0)]]),defines:new Map([["samples",t.samples.toFixed(0)],["samplesFloat",t.samples.toFixed(0)+".0"]])}),this.pointsIndex=0,this.makeOptionsReactive(t)}makeOptionsReactive(e){for(const t of Object.keys(e))Object.defineProperty(this,t,{get(){return e[t]},set(n){switch(e[t]=n,t){case"intensity":case"jitter":this.uniforms.get(t).value=n;break}}}),this[t]=e[t]}initialize(e,...t){super.initialize(e,...t),new ji().load(zd,n=>{n.minFilter=it,n.magFilter=it,n.wrapS=_n,n.wrapT=_n,n.encoding=yn,this.uniforms.get("blueNoiseTexture").value=n})}update(e,t,n){this.uniforms.get("inputTexture").value=t.texture,this.uniforms.get("deltaTime").value=Math.max(1/1e3,n);const i=e.info.render.frame%65536;this.uniforms.get("frame").value=i,this.uniforms.get("texSize").value.set(window.innerWidth,window.innerHeight);const s=this.uniforms.get("blueNoiseTexture").value;if(s){const{width:o,height:a}=s.source.data;this.uniforms.get("blueNoiseSize").value.set(o,a)}}}const jb=`
		#ifdef USE_SKINNING
		#ifdef BONE_TEXTURE
			uniform sampler2D prevBoneTexture;
			mat4 getPrevBoneMatrix( const in float i ) {
				float j = i * 4.0;
				float x = mod( j, float( boneTextureSize ) );
				float y = floor( j / float( boneTextureSize ) );
				float dx = 1.0 / float( boneTextureSize );
				float dy = 1.0 / float( boneTextureSize );
				y = dy * ( y + 0.5 );
				vec4 v1 = textureLod( prevBoneTexture, vec2( dx * ( x + 0.5 ), y ), 0. );
				vec4 v2 = textureLod( prevBoneTexture, vec2( dx * ( x + 1.5 ), y ), 0. );
				vec4 v3 = textureLod( prevBoneTexture, vec2( dx * ( x + 2.5 ), y ), 0. );
				vec4 v4 = textureLod( prevBoneTexture, vec2( dx * ( x + 3.5 ), y ), 0. );
				mat4 bone = mat4( v1, v2, v3, v4 );
				return bone;
			}
		#else
			uniform mat4 prevBoneMatrices[ MAX_BONES ];
			mat4 getPrevBoneMatrix( const in float i ) {
				mat4 bone = prevBoneMatrices[ int(i) ];
				return bone;
			}
		#endif
		#endif
`,Xb=`
#define MAX_BONES 64
                    
${Ge.skinning_pars_vertex}
${jb}

uniform mat4 velocityMatrix;
uniform mat4 prevVelocityMatrix;
varying vec4 prevPosition;
varying vec4 newPosition;

#ifdef renderDepthNormal
varying vec2 vHighPrecisionZW;
#endif
`,qb=`
// Get the current vertex position
transformed = vec3( position );
${Ge.skinning_vertex}
newPosition = velocityMatrix * vec4( transformed, 1.0 );

// Get the previous vertex position
transformed = vec3( position );
${Ge.skinbase_vertex.replace(/mat4 /g,"").replace(/getBoneMatrix/g,"getPrevBoneMatrix")}
${Ge.skinning_vertex.replace(/vec4 /g,"")}
prevPosition = prevVelocityMatrix * vec4( transformed, 1.0 );

gl_Position = newPosition;

#ifdef renderDepthNormal
vHighPrecisionZW = gl_Position.zw;
#endif
`,Yb=`
varying vec4 prevPosition;
varying vec4 newPosition;

#ifdef renderDepthNormal
varying vec2 vHighPrecisionZW;
#endif
`,Zb=`
vec2 pos0 = (prevPosition.xy / prevPosition.w) * 0.5 + 0.5;
vec2 pos1 = (newPosition.xy / newPosition.w) * 0.5 + 0.5;

vec2 vel = pos1 - pos0;

#ifdef renderDepthNormal
float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
#endif

gl_FragColor = vec4(vel.x, vel.y, 0., 0.);
`,Kb={prevVelocityMatrix:{value:new Ue},velocityMatrix:{value:new Ue},prevBoneTexture:{value:null},boneTexture:{value:null},normalMap:{value:null},normalScale:{value:new _e},uvTransform:{value:new Zt}};class Jb extends Vt{constructor(){super({uniforms:ur.clone(Kb),glslVersion:Vi,vertexShader:`
					#include <common>
					#include <uv_pars_vertex>
					#include <displacementmap_pars_vertex>
					#include <normal_pars_vertex>
					#include <morphtarget_pars_vertex>
					#include <logdepthbuf_pars_vertex>
					#include <clipping_planes_pars_vertex>

					#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
						varying vec3 vViewPosition;
					#endif
					
                    ${Xb}
        
                    void main() {
						vec3 transformed;

						#include <uv_vertex>

						#include <skinbase_vertex>
						#include <beginnormal_vertex>
						#include <skinnormal_vertex>
						#include <defaultnormal_vertex>

						#include <morphnormal_vertex>
						#include <normal_vertex>
						#include <morphtarget_vertex>
						#include <displacementmap_vertex>
						#include <project_vertex>
						#include <logdepthbuf_vertex>
						#include <clipping_planes_vertex>

						${qb}

						#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
							vViewPosition = - mvPosition.xyz;
						#endif

                    }`,fragmentShader:`
					#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
						varying vec3 vViewPosition;
					#endif

					#ifdef renderDepthNormal
					layout(location = 0) out vec4 gDepth;
					layout(location = 1) out vec4 gVelocity;
					#else
					#define gVelocity gl_FragColor
					#endif

					${Yb}
					#include <packing>

					#include <uv_pars_fragment>
					#include <normal_pars_fragment>

					// source: https://knarkowicz.wordpress.com/2014/04/16/octahedron-normal-vector-encoding/
					vec2 OctWrap( vec2 v ) {
						vec2 w = 1.0 - abs( v.yx );
						if (v.x < 0.0) w.x = -w.x;
						if (v.y < 0.0) w.y = -w.y;
						return w;
					}

					vec2 Encode( vec3 n ) {
						n /= ( abs( n.x ) + abs( n.y ) + abs( n.z ) );
						n.xy = n.z > 0.0 ? n.xy : OctWrap( n.xy );
						n.xy = n.xy * 0.5 + 0.5;
						return n.xy;
					}

                    void main() {
						#include <normal_fragment_begin>
                    	#include <normal_fragment_maps>

						${Zb.replaceAll("gl_FragColor","gVelocity")}
						vec3 worldNormal = normalize((vec4(normal, 1.) * viewMatrix).xyz);
						gVelocity.ba = Encode(worldNormal);

						#ifdef renderDepthNormal
						gDepth = packDepthToRGBA(fragCoordZ);
						#endif
                    }`}),this.isVelocityMaterial=!0}}const Qb=new Ne(0),$b=new _e,_h=new Ue,yh=new Ue;class eM extends wn{constructor(e,t,n=!0){super("velocityDepthNormalPass"),this.cachedMaterials=new WeakMap,this.visibleMeshes=[],this.needsSwap=!1,this._scene=e,this._camera=t;const i=n?2:1;this.renderTarget=new cr(1,1,i,{minFilter:it,magFilter:it}),this.renderTarget.depthTexture=new as(1,1),this.renderTarget.depthTexture.type=ft,n&&(this.renderTarget.texture[0].type=Fn,this.renderTarget.texture[0].needsUpdate=!0,this.renderTarget.texture[1].type=ft,this.renderTarget.texture[1].needsUpdate=!0),this.renderDepthNormal=n}setVelocityDepthNormalMaterialInScene(){this.visibleMeshes=ra(this._scene);for(const t of this.visibleMeshes){const n=t.material;let[i,s]=this.cachedMaterials.get(t)||[];if(n!==i){var e;s=new Jb,Ud(n,s),t.material=s,(e=t.skeleton)!=null&&e.boneTexture&&Nd(t),this.cachedMaterials.set(t,[n,s])}t.material=s,t.visible=ql(t,n),this.renderDepthNormal&&(s.defines.renderDepthNormal="");const o=n.map||n.normalMap||n.roughnessMap||n.metalnessMap;o&&(s.uniforms.uvTransform.value=o.matrix),rb(t,this._camera)}}unsetVelocityDepthNormalMaterialInScene(){for(const e of this.visibleMeshes)e.visible=!0,sb(e,this._camera),e.material=this.cachedMaterials.get(e)[0]}setSize(e,t){var n;this.renderTarget.setSize(e,t),(n=this.lastDepthTexture)==null||n.dispose(),this.lastDepthTexture=new Tx(e,t,sn),this.lastDepthTexture.minFilter=it,this.lastDepthTexture.magFilter=it}dispose(){super.dispose(),this.renderTarget.dispose()}get texture(){return Array.isArray(this.renderTarget.texture)?this.renderTarget.texture[1]:this.renderTarget.texture}get depthTexture(){return this.renderTarget.texture[0]}render(e){_h.copy(this._camera.projectionMatrix),yh.copy(this._camera.projectionMatrixInverse),this._camera.view&&(this._camera.view.enabled=!1),this._camera.updateProjectionMatrix(),this.setVelocityDepthNormalMaterialInScene();const{background:t}=this._scene;this._scene.background=Qb,e.setRenderTarget(this.renderTarget),e.copyFramebufferToTexture($b,this.lastDepthTexture),e.render(this._scene,this._camera),this._scene.background=t,this.unsetVelocityDepthNormalMaterialInScene(),this._camera.view&&(this._camera.view.enabled=!0),this._camera.projectionMatrix.copy(_h),this._camera.projectionMatrixInverse.copy(yh)}}class tM{constructor(e,t,n=ns.DefaultOptions){const i=e.addFolder("SSGIDebugGUI");i.open(),this.pane=i,i.onChange(u=>{const{property:h,value:d}=u;t[h]=d}),n={...ns.DefaultOptions,...n};const s=i.addFolder("General");s.add(n,"distance",.001,10,.01),s.add(n,"autoThickness"),s.add(n,"thickness",0,5,.01),s.add(n,"maxRoughness",0,1,.01),s.add(n,"envBlur",0,1,.01),s.add(n,"importanceSampling"),s.add(n,"maxEnvLuminance",0,100,1),i.addFolder("Temporal Resolve").add(n,"blend",0,1,.001);const a=i.addFolder("Denoise");a.add(n,"denoiseIterations",0,5,1),a.add(n,"denoiseKernel",1,5,1),a.add(n,"denoiseDiffuse",0,50,.01),a.add(n,"denoiseSpecular",0,50,.01),a.add(n,"depthPhi",0,15,.001),a.add(n,"normalPhi",0,50,.001),a.add(n,"roughnessPhi",0,100,.001);const l=i.addFolder("Tracing");l.add(n,"steps",0,256,1),l.add(n,"refineSteps",0,16,1),l.add(n,"spp",1,32,1),l.add(n,"missedRays"),i.addFolder("Resolution").add(n,"resolutionScale",.25,1,.25)}}let Al,ii,hn,Nt,nr,Ho,Vn,Cl=new _e;const Qi={environment:Xi.ulmer_muenster,groundProjection:!0,bgColor:new Ne,printCam:()=>{}},zs=new fn,nM=new ji,iM=new io().setDataType(ft),rM=new ia().setDataType(ft),Bd=new to,Gd=new so;Gd.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");Bd.setDRACOLoader(Gd);const wh=new us,tl=[];let Pl,Ui;async function sM(r){Ho=r,Pl=Ho.addFolder("Scene"),Al=new Ks,app.appendChild(Al.dom),ii=new mr({powerPreference:"high-performance",premultipliedAlpha:!1,stencil:!1,antialias:!1,alpha:!1,preserveDrawingBuffer:!0}),ii.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),ii.setSize(window.innerWidth,window.innerHeight),ii.outputEncoding=He,ii.toneMapping=is,ii.autoClear=!1,app.appendChild(ii.domElement),new es(ii).compileEquirectangularShader(),hn=new At(50,window.innerWidth/window.innerHeight,.1,200),hn.position.set(6,3,6),hn.name="Camera",Nt=new Hi,Nt.background=new Ne("grey"),Nt.add(zs),nr=new oo(hn,ii.domElement),nr.enableDamping=!0,nr.dampingFactor=.05,nr.minDistance=.1,nr.maxDistance=100,nr.maxPolarAngle=Math.PI/1.5,window.addEventListener("resize",bh),document.addEventListener("pointermove",Mh);let t=Date.now();app.addEventListener("pointerdown",()=>{t=Date.now()}),app.addEventListener("pointerup",n=>{Date.now()-t<200&&(Mh(n),lM())}),await cM(),await oM(),uM(),bh(),Vd()}async function oM(){let r=new fn,e=new eo(16777195,1);e.name="Dir. Light",e.castShadow=!0,e.shadow.camera.near=.1,e.shadow.camera.far=50,e.shadow.camera.right=15,e.shadow.camera.left=-15,e.shadow.camera.top=15,e.shadow.camera.bottom=-15,e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.bias=-5e-4,r.add(e),Nt.add(r);async function t(i){if(!i){Nt.background=null,Nt.environment=null;return}if(i.exr){const s=await iM.loadAsync(i.exr);s.mapping=pn,Nt.environment=s,console.log("exr loaded")}if(i.hdr){const s=await rM.loadAsync(i.hdr);s.mapping=pn,Nt.environment=s,console.log("exr loaded")}if(i.webP||i.avif){const s=await nM.loadAsync(i.webP||i.avif);s.mapping=pn,s.encoding=He,Nt.background=s,console.log("bg loaded"),Qi.groundProjection&&n(Qi.environment)}i.sunPos?(e.visible=!0,e.position.fromArray(i.sunPos)):e.visible=!1,i.sunCol?e.color.set(i.sunCol):e.color.set(16777215)}function n(i){Qi.groundProjection&&Nt.background&&i.groundProj?(Vn||(Vn=new ro(Nt.background),Vn.scale.setScalar(100)),Vn.material.uniforms.map.value=Nt.background,Vn.radius=i.groundProj.radius,Vn.height=i.groundProj.height,Vn.parent||Nt.add(Vn)):Vn&&Vn.parent&&Vn.removeFromParent()}await t(Qi.environment),Pl.add(Qi,"environment",Xi).onChange(i=>{t(i)}),Pl.add(Qi,"groundProjection").onChange(i=>{n(Qi.environment)})}function bh(){const r=window.innerWidth,e=window.innerHeight;hn.aspect=r/e,hn.updateProjectionMatrix(),Ui.setSize(r,e)}function aM(){Al.update(),nr.update(),hn.updateMatrixWorld(),Ui.render()}function Vd(){requestAnimationFrame(Vd),aM()}function lM(){wh.setFromCamera(Cl,hn),wh.intersectObject(zs,!0,tl),tl.length&&(tl.length=0)}function Mh(r){Cl.x=r.clientX/window.innerWidth*2-1,Cl.y=-(r.clientY/window.innerHeight)*2+1}async function cM(){const r=new pe(new Wi(.5).translate(0,.5,0),new Kt({color:Sh(),roughness:0}));r.name="sphere",r.castShadow=!0,r.receiveShadow=!0,r.position.set(2,0,-1.5),zs.add(r);const e=new pe(new xt(1,1,1).translate(0,.5,0),new Kt({color:Sh(),roughness:0}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),zs.add(e);const t=new pe(new Qo(5,32).rotateX(-Math.PI/2),new Kt({color:1118481,roughness:0}));t.name="floor",t.receiveShadow=!0,t.position.set(0,.001,0),Nt.add(t);const i=(await Bd.loadAsync(na)).scene;i.name="car",i.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0,s.selectOnRaycast=i)}),zs.add(i)}function uM(){Ui=new yw(ii);const r=new ks(Nt,hn),e=new eM(Nt,hn),t={distance:10,thickness:10,autoThickness:!1,maxRoughness:1,blend:.9,denoiseIterations:1,denoiseKernel:2,denoiseDiffuse:10,denoiseSpecular:10,depthPhi:2,normalPhi:50,roughnessPhi:1,envBlur:.5,importanceSampling:!0,directLightMultiplier:1,maxEnvLuminance:50,steps:20,refineSteps:5,spp:1,resolutionScale:1,missedRays:!1},n=new ns(Nt,hn,e,t),i=new Vb(Nt,hn,e,t),s=new Gb(Nt,hn,e,t),o=new kd(Nt,hn,e),a=new Wb(e);new tM(Ho,n,t);const l={SSGI:n,SSDGI:i,SSR:s},c={useGI:!0,gi:l.SSGI,traa:!1,motionBlur:!1};function u(){Ui.removeAllPasses(),(c.useGI||c.traa||c.motionBlur)&&Ui.addPass(e);let d=[];c.useGI?d.push(c.gi):Ui.addPass(r),c.traa&&d.push(o),c.motionBlur&&d.push(a),d.length&&Ui.addPass(new gw(hn,...d)),console.log(Ui.passes)}const h=Ho.addFolder("EFFECTS");h.open(),h.add(c,"useGI").onChange(u),h.add(c,"gi",l).onChange(u),h.add(c,"traa").onChange(u),h.add(c,"motionBlur").onChange(u),u()}const hM=new Ne;function Sh(){return"#"+hM.setHSL(Math.random(),.5,.5).getHexString()}class dM extends Kt{constructor(e={}){super(),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var t;(t=e.defines)!=null&&t.USE_UV||(e.defines.USE_UV=""),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
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
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}}class fM extends Vt{constructor(e=new _e){super({uniforms:{inputBuffer:new J(null),depthBuffer:new J(null),resolution:new J(new _e),texelSize:new J(new _e),halfTexelSize:new J(new _e),kernel:new J(0),scale:new J(1),cameraNear:new J(0),cameraFar:new J(1),minDepthThreshold:new J(0),maxDepthThreshold:new J(1),depthScale:new J(0),depthToBlurRatioBias:new J(.25)},fragmentShader:`#include <common>
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
          #include <encodings_fragment>
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
        }`,blending:Yn,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t),this.uniforms.halfTexelSize.value.set(e,t).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}}class pM{constructor({gl:e,resolution:t,width:n=500,height:i=500,minDepthThreshold:s=0,maxDepthThreshold:o=1,depthScale:a=0,depthToBlurRatioBias:l=.25}){this.renderToScreen=!1,this.renderTargetA=new Ft(t,t,{minFilter:Ve,magFilter:Ve,stencilBuffer:!1,depthBuffer:!1,encoding:e.outputEncoding}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new fM,this.convolutionMaterial.setTexelSize(1/n,1/i),this.convolutionMaterial.setResolution(new _e(n,i)),this.scene=new Hi,this.camera=new Zo,this.convolutionMaterial.uniforms.minDepthThreshold.value=s,this.convolutionMaterial.uniforms.maxDepthThreshold.value=o,this.convolutionMaterial.uniforms.depthScale.value=a,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=l,this.convolutionMaterial.defines.USE_DEPTH=a>0;const c=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),u=new Float32Array([0,0,2,0,0,2]),h=new Pt;h.setAttribute("position",new Mt(c,3)),h.setAttribute("uv",new Mt(u,2)),this.screen=new pe(h,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,t,n){const i=this.scene,s=this.camera,o=this.renderTargetA,a=this.renderTargetB;let l=this.convolutionMaterial,c=l.uniforms;c.depthBuffer.value=t.depthTexture;const u=l.kernel;let h=t,d,m,v;for(m=0,v=u.length-1;m<v;++m)d=m&1?a:o,c.kernel.value=u[m],c.inputBuffer.value=h.texture,e.setRenderTarget(d),e.render(i,s),h=d;c.kernel.value=u[m],c.inputBuffer.value=h.texture,e.setRenderTarget(this.renderToScreen?null:n),e.render(i,s)}}const mM=""+new URL("rgh-2031a231.jpg",import.meta.url).href,gM=""+new URL("paper_normal-0e49083f.jpg",import.meta.url).href,vM={rgh:mM,paper_normal:gM};let Rl,Tn,vn,tn,ri,ar,Sn,Dl=new _e;const $i={environment:Xi.dancing_hall,groundProjection:!0,bgColor:new Ne,printCam:()=>{}},Bs=new fn,Hd=new ji,xM=new io,_M=new ia,Wd=new to,jd=new so;let Xn;jd.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");Wd.setDRACOLoader(jd);const Th=new us,Ur=[];let Xd=()=>{},Wo;async function yM(r){ar=r,Wo=ar.addFolder("Scene"),Rl=new Ks,app.appendChild(Rl.dom),Tn=new mr({antialias:!0}),Tn.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),Tn.setSize(window.innerWidth,window.innerHeight),Tn.shadowMap.enabled=!0,Tn.shadowMap.type=Oi,Tn.outputEncoding=He,Tn.toneMapping=is,app.appendChild(Tn.domElement),vn=new At(50,window.innerWidth/window.innerHeight,.1,200),vn.position.set(6,3,6),vn.name="Camera",vn.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),tn=new Hi,tn.add(Bs),ri=new oo(vn,Tn.domElement),ri.enableDamping=!0,ri.dampingFactor=.05,ri.minDistance=.1,ri.maxDistance=100,ri.maxPolarAngle=Math.PI/1.5,ri.target.set(0,0,0),ri.target.set(0,0,0),Xn=new ta(vn,Tn.domElement),Xn.addEventListener("dragging-changed",t=>{ri.enabled=!t.value,t.value}),Xn.addEventListener("change",()=>{Xn.object&&Xn.object.position.y<0&&(Xn.object.position.y=0)}),tn.add(Xn),window.addEventListener("resize",bM),document.addEventListener("pointermove",Eh);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",t=>{Date.now()-e<200&&(Eh(t),SM())}),Wo.add(Xn,"mode",["translate","rotate","scale"]),wM(),await TM(),qd()}async function wM(){let r=new fn,e=new eo(16777195,1);e.name="Dir. Light",e.castShadow=!0,e.shadow.camera.near=.1,e.shadow.camera.far=50,e.shadow.camera.right=15,e.shadow.camera.left=-15,e.shadow.camera.top=15,e.shadow.camera.bottom=-15,e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.radius=1.95,e.shadow.blurSamples=6,e.shadow.bias=-5e-4,r.add(e),tn.add(r);const t=new pe(new pr(10,10).rotateX(-Math.PI/2),new id({}));t.name="reflectionMesh",t.receiveShadow=!0,t.position.set(0,0,0);async function n(s){if(!s){tn.background=null,tn.environment=null;return}if(s.exr){const o=await xM.loadAsync(s.exr);o.mapping=pn,tn.environment=o,console.log("exr loaded")}if(s.hdr){const o=await _M.loadAsync(s.hdr);o.mapping=pn,tn.environment=o,console.log("exr loaded")}if(s.webP||s.avif){const o=await Hd.loadAsync(s.webP||s.avif);o.mapping=pn,o.encoding=He,tn.background=o,console.log("bg loaded"),$i.groundProjection&&i($i.environment)}s.sunPos?(e.visible=!0,e.position.fromArray(s.sunPos)):e.visible=!1,s.sunCol?e.color.set(s.sunCol):e.color.set(16777215)}function i(s){$i.groundProjection&&tn.background&&s.groundProj?(Sn||(Sn=new ro(tn.background),Sn.scale.setScalar(100)),Sn.material.uniforms.map.value=tn.background,Sn.radius=s.groundProj.radius,Sn.height=s.groundProj.height,Sn.parent||(console.log("ground Proj added"),tn.add(Sn),ar.add(Sn,"radius",1,50),ar.add(Sn,"height",1,50))):Sn&&Sn.parent&&(console.log("ground Proj removed"),Sn.removeFromParent())}n($i.environment),Wo.add($i,"environment",Xi).onChange(s=>{n(s)}),Wo.add($i,"groundProjection").onChange(s=>{i($i.environment)})}function bM(){vn.aspect=window.innerWidth/window.innerHeight,vn.updateProjectionMatrix(),Tn.setSize(window.innerWidth,window.innerHeight)}function MM(){Rl.update(),ri.update(),Xd(),Tn.render(tn,vn)}function qd(){requestAnimationFrame(qd),MM()}function SM(){if(Th.setFromCamera(Dl,vn),Th.intersectObject(Bs,!0,Ur),!Ur.length){Xn.detach();return}Ur[0].object.selectOnRaycast?Xn.attach(Ur[0].object.selectOnRaycast):Xn.attach(Ur[0].object),Ur.length=0}function Eh(r){Dl.x=r.clientX/window.innerWidth*2-1,Dl.y=-(r.clientY/window.innerHeight)*2+1}async function TM(){const r=new pe(new Wi(.5).translate(0,.5,0),new Kt({color:Ah(),roughness:0,metalness:1}));r.name="sphere",r.castShadow=!0,r.receiveShadow=!0,r.position.set(2,0,-1.5),Bs.add(r);const e=new pe(new xt(1,1,1).translate(0,.5,0),new Kt({color:Ah(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),Bs.add(e);const n=(await Wd.loadAsync(na)).scene;n.name="car",n.traverse(i=>{i.isMesh&&(i.castShadow=!0,i.receiveShadow=!0,i.selectOnRaycast=n,i.name)}),Bs.add(n),EM()}async function EM(){let r=1,e=5,t=1024,n=[1024,1024],i=0,s=1,o=1,a=.25,l=0,c=.25,u=1,h,d=0,m=.6,v=1,p=new Ne("#151515");const f=Tn;n=Array.isArray(n)?n:[n,n];const x=n[0]+n[1]>0,w=new Ni,g=new I,b=new I,M=new I,E=new Ue,P=new I(0,0,-1),y=new lt,T=new I,L=new I,O=new lt,W=new Ue,U=new At,F=ye=>{if(b.setFromMatrixPosition(ye.matrixWorld),M.setFromMatrixPosition(vn.matrixWorld),E.extractRotation(ye.matrixWorld),g.set(0,0,1),g.applyMatrix4(E),b.addScaledVector(g,d),T.subVectors(b,M),T.dot(g)>0)return;T.reflect(g).negate(),T.add(b),E.extractRotation(vn.matrixWorld),P.set(0,0,-1),P.applyMatrix4(E),P.add(M),L.subVectors(b,P),L.reflect(g).negate(),L.add(b),U.position.copy(T),U.up.set(0,1,0),U.up.applyMatrix4(E),U.up.reflect(g),U.lookAt(L),U.far=vn.far,U.updateMatrixWorld(),U.projectionMatrix.copy(vn.projectionMatrix),W.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),W.multiply(U.projectionMatrix),W.multiply(U.matrixWorldInverse),W.multiply(ye.matrixWorld),w.setFromNormalAndCoplanarPoint(g,b),w.applyMatrix4(U.matrixWorldInverse),y.set(w.normal.x,w.normal.y,w.normal.z,w.constant);const Te=U.projectionMatrix;O.x=(Math.sign(y.x)+Te.elements[8])/Te.elements[0],O.y=(Math.sign(y.y)+Te.elements[9])/Te.elements[5],O.z=-1,O.w=(1+Te.elements[10])/Te.elements[14],y.multiplyScalar(2/y.dot(O)),Te.elements[2]=y.x,Te.elements[6]=y.y,Te.elements[10]=y.z+1,Te.elements[14]=y.w};function V(){const ye={minFilter:Ve,magFilter:Ve,encoding:f.outputEncoding,type:bt},Te=new Ft(t,t,ye);Te.depthBuffer=!0,Te.depthTexture=new as(t,t),Te.depthTexture.format=bi,Te.depthTexture.type=qo;const je=new Ft(t,t,ye),Ye=new pM({gl:f,resolution:t,width:n[0],height:n[1],minDepthThreshold:i,maxDepthThreshold:s,depthScale:o,depthToBlurRatioBias:a}),Qe={mirror:l,textureMatrix:W,mixBlur:r,tDiffuse:Te.texture,tDepth:Te.depthTexture,tDiffuseBlur:je.texture,hasBlur:x,mixStrength:e,minDepthThreshold:i,maxDepthThreshold:s,depthScale:o,depthToBlurRatioBias:a,distortion:c,distortionMap:h,mixContrast:u,metalness:m,roughness:v,color:p};return[Te,je,Ye,Qe,{"defines-USE_BLUR":x?"":void 0,"defines-USE_DEPTH":"","defines-USE_DISTORTION":void 0}]}const[$,ne,K,ee,se]=V(),Me={standard:new Kt({roughness:v}),reflector:new dM(ee)},j=Me.reflector,le=Me.standard;j.defines.USE_BLUR=se["defines-USE_BLUR"],j.defines.USE_DEPTH=se["defines-USE_DEPTH"],j.defines.USE_DISTORTION=se["defines-USE_DISTORTION"];const fe=await Hd.loadAsync(vM.rgh);fe.wrapS=_n,fe.wrapT=_n,fe.repeat.set(5,5),le.roughnessMap=fe,le.color.set(p);const X={materialType:Me.reflector,useRoughnessMap:!1,useDistortionMap:!1},ce=new pe(new Qo(5,32),X.materialType);ce.rotateX(-Math.PI/2),ce.name="floor",ce.receiveShadow=!0,ce.position.set(0,.001,0),tn.add(ce),console.log({reflectorProps:ee,material:j}),ar.add(X,"materialType",Me).onChange(ye=>{ce.material=ye}),ar.addFolder("MeshStandardMaterial");const xe=ar.addFolder("MeshReflectorMaterial");xe.open(),xe.add(X,"useRoughnessMap").onChange(ye=>{ye?j.roughnessMap=fe:j.roughnessMap=null,j.needsUpdate=!0}),xe.add(X,"useDistortionMap").onChange(ye=>{ye?j.distortionMap=fe:j.distortionMap=null,j.needsUpdate=!0}),xe.add(j,"mixStrength",0,15),xe.add(j,"mixBlur",0,6),xe.add(j,"mixContrast",0,5),xe.add(j,"metalness",0,1),xe.add(j,"roughness",0,1),xe.add(j,"distortion",-2,2);const Se=ce;Xd=()=>{if(!Se)return;Se.visible=!1;const ye=f.xr.enabled,Te=f.shadowMap.autoUpdate;F(Se),f.xr.enabled=!1,f.shadowMap.autoUpdate=!1,f.setRenderTarget($),f.state.buffers.depth.setMask(!0),f.autoClear||f.clear(),f.render(tn,U),x&&K.render(f,$,ne),f.xr.enabled=ye,f.shadowMap.autoUpdate=Te,Se.visible=!0,f.setRenderTarget(null)}}const AM=new Ne;function Ah(){return"#"+AM.setHSL(Math.random(),.5,.5).getHexString()}let CM=window.location.href,PM=new URL(CM);const Zs={MeshTransmissionMaterial:Ey,PCSS:Oy,WIP_SpotLight:Zy,RealismEffects:sM,WIP_MeshReflectionMaterial:yM},fr={sceneName:PM.searchParams.get("scene")||Object.keys(Zs)[0],sceneInitFunction:()=>{}};function Yd(r){console.log({path:r});const e=new URLSearchParams(window.location.search);e.set("scene",r),window.history.replaceState({},"",`${window.location.pathname}?${e}`),document.title=`Explore | ${r}`}const Zd=new Ll({title:"Explore Vanilla Drei "+Kd,closeFolders:!0});Zd.add(fr,"sceneName",Object.keys(Zs)).name("SCENE").onChange(r=>{console.log({v:r}),Yd(r),window.location.reload()});Object.keys(Zs).includes(fr.sceneName)||(fr.sceneName=Object.keys(Zs)[0]);fr.sceneInitFunction=Zs[fr.sceneName];fr.sceneInitFunction(Zd);Yd(fr.sceneName);
