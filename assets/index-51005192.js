(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const pp="0.0.22";/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.18.1
 * @author George Michael Brower
 * @license MIT
 */class _i{constructor(e,t,n,r,s="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("name"),_i.nextNameID=_i.nextNameID||0,this.$name.id=`lil-gui-name-${++_i.nextNameID}`,this.$widget=document.createElement(s),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class mp extends _i{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Yl(i){let e,t;return(e=i.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const gp={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:Yl,toHexString:Yl},ma={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},vp={isPrimitive:!1,match:i=>Array.isArray(i),fromHexString(i,e,t=1){const n=ma.fromHexString(i);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([i,e,t],n=1){n=255/n;const r=i*n<<16^e*n<<8^t*n<<0;return ma.toHexString(r)}},xp={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,e,t=1){const n=ma.fromHexString(i);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:i,g:e,b:t},n=1){n=255/n;const r=i*n<<16^e*n<<8^t*n<<0;return ma.toHexString(r)}},_p=[gp,ma,vp,xp];function yp(i){return _p.find(e=>e.match(i))}class wp extends _i{constructor(e,t,n,r){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=yp(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=Yl(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Ko extends _i{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Mp extends _i{constructor(e,t,n,r,s,a){super(e,t,n,"number"),this._initInput(),this.min(r),this.max(s);const o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let f=parseFloat(this.$input.value);isNaN(f)||(this._stepExplicit&&(f=this._snap(f)),this.setValue(this._clamp(f)))},t=f=>{const M=parseFloat(this.$input.value);isNaN(M)||(this._snapClampSetValue(M+f),this.$input.value=this.getValue())},n=f=>{f.code==="Enter"&&this.$input.blur(),f.code==="ArrowUp"&&(f.preventDefault(),t(this._step*this._arrowKeyMultiplier(f))),f.code==="ArrowDown"&&(f.preventDefault(),t(this._step*this._arrowKeyMultiplier(f)*-1))},r=f=>{this._inputFocused&&(f.preventDefault(),t(this._step*this._normalizeMouseWheel(f)))};let s=!1,a,o,l,c,u;const h=5,d=f=>{a=f.clientX,o=l=f.clientY,s=!0,c=this.getValue(),u=0,window.addEventListener("mousemove",p),window.addEventListener("mouseup",v)},p=f=>{if(s){const M=f.clientX-a,_=f.clientY-o;Math.abs(_)>h?(f.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(M)>h&&v()}if(!s){const M=f.clientY-l;u-=M*this._step*this._arrowKeyMultiplier(f),c+u>this._max?u=this._max-c:c+u<this._min&&(u=this._min-c),this._snapClampSetValue(c+u)}l=f.clientY},v=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",v)},x=()=>{this._inputFocused=!0},m=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",d),this.$input.addEventListener("focus",x),this.$input.addEventListener("blur",m)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(f,M,_,y,S)=>(f-M)/(_-M)*(S-y)+y,t=f=>{const M=this.$slider.getBoundingClientRect();let _=e(f,M.left,M.right,this._min,this._max);this._snapClampSetValue(_)},n=f=>{this._setDraggingStyle(!0),t(f.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",s)},r=f=>{t(f.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",s)};let a=!1,o,l;const c=f=>{f.preventDefault(),this._setDraggingStyle(!0),t(f.touches[0].clientX),a=!1},u=f=>{f.touches.length>1||(this._hasScrollBar?(o=f.touches[0].clientX,l=f.touches[0].clientY,a=!0):c(f),window.addEventListener("touchmove",h,{passive:!1}),window.addEventListener("touchend",d))},h=f=>{if(a){const M=f.touches[0].clientX-o,_=f.touches[0].clientY-l;Math.abs(M)>Math.abs(_)?c(f):(window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d))}else f.preventDefault(),t(f.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d)},p=this._callOnFinishChange.bind(this),v=400;let x;const m=f=>{if(Math.abs(f.deltaX)<Math.abs(f.deltaY)&&this._hasScrollBar)return;f.preventDefault();const _=this._normalizeMouseWheel(f)*this._step;this._snapClampSetValue(this.getValue()+_),this.$input.value=this.getValue(),clearTimeout(x),x=setTimeout(p,v)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Sp extends _i{constructor(e,t,n,r){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(r)?r:Object.values(r),this._names=Array.isArray(r)?r:Object.keys(r),this._names.forEach(s=>{const a=document.createElement("option");a.innerHTML=s,this.$select.appendChild(a)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.innerHTML=t===-1?e:this._names[t],this}}class bp extends _i{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const Tp=`.lil-gui {
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
}`;function Ep(i){const e=document.createElement("style");e.innerHTML=i;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let $c=!1;class Cc{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:r,title:s="Controls",closeFolders:a=!1,injectStyles:o=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",c=>{(c.code==="Enter"||c.code==="Space")&&(c.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),l&&this.domElement.classList.add("allow-touch-styles"),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),!$c&&o&&(Ep(Tp),$c=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=a,this.domElement.addEventListener("keydown",c=>c.stopPropagation()),this.domElement.addEventListener("keyup",c=>c.stopPropagation())}add(e,t,n,r,s){if(Object(n)===n)return new Sp(this,e,t,n);const a=e[t];switch(typeof a){case"number":return new Mp(this,e,t,n,r,s);case"boolean":return new mp(this,e,t);case"string":return new bp(this,e,t);case"function":return new Ko(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,a)}addColor(e,t,n=1){return new wp(this,e,t,n)}addFolder(e){const t=new Cc({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof Ko||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof Ko)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ba="151",Qr={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},es={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ap=0,Jc=1,Pp=2,Od=1,Cp=2,ti=3,ri=0,Ot=1,fn=2,Ht=0,Cs=1,Qc=2,eu=3,tu=4,Rp=5,Ss=100,Dp=101,Lp=102,nu=103,iu=104,Ip=200,Up=201,Np=202,Op=203,Fd=204,Bd=205,Fp=206,Bp=207,zp=208,kp=209,Hp=210,zd=0,kd=1,Zl=2,Mo=3,So=4,Hd=5,Gd=6,Rc=7,Vd=0,Gp=1,Vp=2,zn=0,Wp=1,jp=2,Xp=3,fr=4,qp=5,Wd=300,Ls=301,Is=302,Tn=303,Kl=304,Lo=306,mn=1e3,pn=1001,bo=1002,et=1003,$l=1004,_o=1005,Ue=1006,jd=1007,Gi=1008,To=1008,sn=1009,Yp=1010,Zp=1011,Ta=1012,Kp=1013,or=1014,lt=1015,_t=1016,$p=1017,Jp=1018,Fr=1020,Qp=1021,tn=1023,em=1024,tm=1025,yi=1026,Gr=1027,Eo=1028,nm=1029,im=1030,rm=1031,sm=1033,$o=33776,Jo=33777,Qo=33778,el=33779,ru=35840,su=35841,au=35842,ou=35843,am=36196,lu=37492,cu=37496,uu=37808,hu=37809,du=37810,fu=37811,pu=37812,mu=37813,gu=37814,vu=37815,xu=37816,_u=37817,yu=37818,wu=37819,Mu=37820,Su=37821,tl=36492,om=36283,bu=36284,Tu=36285,Eu=36286,ga=2300,Us=2301,nl=2302,Au=2400,Pu=2401,Cu=2402,lm=2500,cm=0,Xd=1,Jl=2,vn=3e3,ke=3001,ur=3200,Io=3201,Uo=0,um=1,On="srgb",Ns="srgb-linear",qd="display-p3",il=7680,hm=519,Ql=35044,hr="300 es",ec=1035;class Mi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ru=1234567;const oa=Math.PI/180,Os=180/Math.PI;function ni(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(on[i&255]+on[i>>8&255]+on[i>>16&255]+on[i>>24&255]+"-"+on[e&255]+on[e>>8&255]+"-"+on[e>>16&15|64]+on[e>>24&255]+"-"+on[t&63|128]+on[t>>8&255]+"-"+on[t>>16&255]+on[t>>24&255]+on[n&255]+on[n>>8&255]+on[n>>16&255]+on[n>>24&255]).toLowerCase()}function en(i,e,t){return Math.max(e,Math.min(t,i))}function Dc(i,e){return(i%e+e)%e}function dm(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function fm(i,e,t){return i!==e?(t-i)/(e-i):0}function la(i,e,t){return(1-t)*i+t*e}function pm(i,e,t,n){return la(i,e,1-Math.exp(-t*n))}function mm(i,e=1){return e-Math.abs(Dc(i,e*2)-e)}function gm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function vm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function xm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function _m(i,e){return i+Math.random()*(e-i)}function ym(i){return i*(.5-Math.random())}function wm(i){i!==void 0&&(Ru=i);let e=Ru+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Mm(i){return i*oa}function Sm(i){return i*Os}function tc(i){return(i&i-1)===0&&i!==0}function Yd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Zd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function bm(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),h=s((e-n)/2),d=a((e-n)/2),p=s((n-e)/2),v=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*h,l*d,o*c);break;case"YZY":i.set(l*d,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*d,o*u,o*c);break;case"XZX":i.set(o*u,l*v,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*v,o*c);break;case"ZYZ":i.set(l*v,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Hi(i,e){switch(e.constructor){case Float32Array:return i;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function vt(i,e){switch(e.constructor){case Float32Array:return i;case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Nt={DEG2RAD:oa,RAD2DEG:Os,generateUUID:ni,clamp:en,euclideanModulo:Dc,mapLinear:dm,inverseLerp:fm,lerp:la,damp:pm,pingpong:mm,smoothstep:gm,smootherstep:vm,randInt:xm,randFloat:_m,randFloatSpread:ym,seededRandom:wm,degToRad:Mm,radToDeg:Sm,isPowerOfTwo:tc,ceilPowerOfTwo:Yd,floorPowerOfTwo:Zd,setQuaternionFromProperEuler:bm,normalize:vt,denormalize:Hi};class ye{constructor(e=0,t=0){ye.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(en(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(){Qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,n,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],p=n[5],v=n[8],x=r[0],m=r[3],f=r[6],M=r[1],_=r[4],y=r[7],S=r[2],E=r[5],R=r[8];return s[0]=a*x+o*M+l*S,s[3]=a*m+o*_+l*E,s[6]=a*f+o*y+l*R,s[1]=c*x+u*M+h*S,s[4]=c*m+u*_+h*E,s[7]=c*f+u*y+h*R,s[2]=d*x+p*M+v*S,s[5]=d*m+p*_+v*E,s[8]=d*f+p*y+v*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*s,p=c*s-a*l,v=t*h+n*d+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return e[0]=h*x,e[1]=(r*c-u*n)*x,e[2]=(o*n-r*a)*x,e[3]=d*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-o*t)*x,e[6]=p*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(rl.makeScale(e,t)),this}rotate(e){return this.premultiply(rl.makeRotation(-e)),this}translate(e,t){return this.premultiply(rl.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const rl=new Qe;function Kd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function va(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Rs(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function sl(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Tm=new Qe().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),Em=new Qe().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]);function Am(i){return i.convertSRGBToLinear().applyMatrix3(Em)}function Pm(i){return i.applyMatrix3(Tm).convertLinearToSRGB()}const Cm={[Ns]:i=>i,[On]:i=>i.convertSRGBToLinear(),[qd]:Am},Rm={[Ns]:i=>i,[On]:i=>i.convertLinearToSRGB(),[qd]:Pm},An={enabled:!1,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(i){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!i},get workingColorSpace(){return Ns},set workingColorSpace(i){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Cm[e],r=Rm[t];if(n===void 0||r===void 0)throw new Error(`Unsupported color space conversion, "${e}" to "${t}".`);return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)}};let ts;class $d{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ts===void 0&&(ts=va("canvas")),ts.width=e.width,ts.height=e.height;const n=ts.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ts}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=va("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Rs(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Rs(t[n]/255)*255):t[n]=Rs(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class Lc{constructor(e=null){this.isSource=!0,this.uuid=ni(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(al(r[a].image)):s.push(al(r[a]))}else s=al(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function al(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?$d.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Dm=0;class Gt extends Mi{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,n=pn,r=pn,s=Ue,a=Gi,o=tn,l=sn,c=Gt.DEFAULT_ANISOTROPY,u=vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Dm++}),this.uuid=ni(),this.name="",this.source=new Lc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Wd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case mn:e.x=e.x-Math.floor(e.x);break;case pn:e.x=e.x<0?0:1;break;case bo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case mn:e.y=e.y-Math.floor(e.y);break;case pn:e.y=e.y<0?0:1;break;case bo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=Wd;Gt.DEFAULT_ANISOTROPY=1;class ot{constructor(e=0,t=0,n=0,r=1){ot.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],p=l[5],v=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(v+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,y=(p+1)/2,S=(f+1)/2,E=(u+d)/4,R=(h+x)/4,P=(v+m)/4;return _>y&&_>S?_<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(_),r=E/n,s=R/n):y>S?y<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),n=E/r,s=P/r):S<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),n=R/s,r=P/s),this.set(n,r,s,t),this}let M=Math.sqrt((m-v)*(m-v)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(M)<.001&&(M=1),this.x=(m-v)/M,this.y=(h-x)/M,this.z=(d-u)/M,this.w=Math.acos((c+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ct extends Mi{constructor(e=1,t=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t);const r={width:e,height:t,depth:1};this.texture=new Gt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Ue,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Lc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jd extends Gt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=et,this.minFilter=et,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Lm extends Gt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=et,this.minFilter=et,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vr extends ct{constructor(e=1,t=1,n=1,r={}){super(e,t,r),this.isWebGLMultipleRenderTargets=!0;const s=this.texture;this.texture=[];for(let a=0;a<n;a++)this.texture[a]=s.clone(),this.texture[a].isRenderTargetTexture=!0}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.texture.length;r<s;r++)this.texture[r].image.width=e,this.texture[r].image.height=t,this.texture[r].image.depth=n;this.dispose()}return this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t),this}copy(e){this.dispose(),this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.set(0,0,this.width,this.height),this.scissor.set(0,0,this.width,this.height),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.texture.length=0;for(let t=0,n=e.texture.length;t<n;t++)this.texture[t]=e.texture[t].clone(),this.texture[t].isRenderTargetTexture=!0;return this}}class kt{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3];const d=s[a+0],p=s[a+1],v=s[a+2],x=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=v,e[t+3]=x;return}if(h!==x||l!==d||c!==p||u!==v){let m=1-o;const f=l*d+c*p+u*v+h*x,M=f>=0?1:-1,_=1-f*f;if(_>Number.EPSILON){const S=Math.sqrt(_),E=Math.atan2(S,f*M);m=Math.sin(m*E)/S,o=Math.sin(o*E)/S}const y=o*M;if(l=l*m+d*y,c=c*m+p*y,u=u*m+v*y,h=h*m+x*y,m===1-o){const S=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=S,c*=S,u*=S,h*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[a],d=s[a+1],p=s[a+2],v=s[a+3];return e[t]=o*v+u*h+l*p-c*d,e[t+1]=l*v+u*d+c*h-o*p,e[t+2]=c*v+u*p+o*d-l*h,e[t+3]=u*v-o*h-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),h=o(s/2),d=l(n/2),p=l(r/2),v=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*p*v,this._y=c*p*h-d*u*v,this._z=c*u*v+d*p*h,this._w=c*u*h-d*p*v;break;case"YXZ":this._x=d*u*h+c*p*v,this._y=c*p*h-d*u*v,this._z=c*u*v-d*p*h,this._w=c*u*h+d*p*v;break;case"ZXY":this._x=d*u*h-c*p*v,this._y=c*p*h+d*u*v,this._z=c*u*v+d*p*h,this._w=c*u*h-d*p*v;break;case"ZYX":this._x=d*u*h-c*p*v,this._y=c*p*h+d*u*v,this._z=c*u*v-d*p*h,this._w=c*u*h+d*p*v;break;case"YZX":this._x=d*u*h+c*p*v,this._y=c*p*h+d*u*v,this._z=c*u*v-d*p*h,this._w=c*u*h-d*p*v;break;case"XZY":this._x=d*u*h-c*p*v,this._y=c*p*h-d*u*v,this._z=c*u*v+d*p*h,this._w=c*u*h+d*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(n>o&&n>h){const p=2*Math.sqrt(1+n-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-n-h);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-n-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(en(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Du.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Du.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=l*t+a*r-o*n,u=l*n+o*t-s*r,h=l*r+s*n-a*t,d=-s*t-a*n-o*r;return this.x=c*l+d*-s+u*-o-h*-a,this.y=u*l+d*-a+h*-s-c*-o,this.z=h*l+d*-o+c*-a-u*-s,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ol.copy(this).projectOnVector(e),this.sub(ol)}reflect(e){return this.sub(ol.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(en(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ol=new L,Du=new kt;class Si{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ai.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ai.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ai.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){if(e.updateWorldMatrix(!1,!1),e.boundingBox!==void 0)e.boundingBox===null&&e.computeBoundingBox(),ns.copy(e.boundingBox),ns.applyMatrix4(e.matrixWorld),this.union(ns);else{const r=e.geometry;if(r!==void 0)if(t&&r.attributes!==void 0&&r.attributes.position!==void 0){const s=r.attributes.position;for(let a=0,o=s.count;a<o;a++)Ai.fromBufferAttribute(s,a).applyMatrix4(e.matrixWorld),this.expandByPoint(Ai)}else r.boundingBox===null&&r.computeBoundingBox(),ns.copy(r.boundingBox),ns.applyMatrix4(e.matrixWorld),this.union(ns)}const n=e.children;for(let r=0,s=n.length;r<s;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ai),Ai.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ws),Ba.subVectors(this.max,Ws),is.subVectors(e.a,Ws),rs.subVectors(e.b,Ws),ss.subVectors(e.c,Ws),Yi.subVectors(rs,is),Zi.subVectors(ss,rs),wr.subVectors(is,ss);let t=[0,-Yi.z,Yi.y,0,-Zi.z,Zi.y,0,-wr.z,wr.y,Yi.z,0,-Yi.x,Zi.z,0,-Zi.x,wr.z,0,-wr.x,-Yi.y,Yi.x,0,-Zi.y,Zi.x,0,-wr.y,wr.x,0];return!ll(t,is,rs,ss,Ba)||(t=[1,0,0,0,1,0,0,0,1],!ll(t,is,rs,ss,Ba))?!1:(za.crossVectors(Yi,Zi),t=[za.x,za.y,za.z],ll(t,is,rs,ss,Ba))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ai).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ai).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ei=[new L,new L,new L,new L,new L,new L,new L,new L],Ai=new L,ns=new Si,is=new L,rs=new L,ss=new L,Yi=new L,Zi=new L,wr=new L,Ws=new L,Ba=new L,za=new L,Mr=new L;function ll(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Mr.fromArray(i,s);const o=r.x*Math.abs(Mr.x)+r.y*Math.abs(Mr.y)+r.z*Math.abs(Mr.z),l=e.dot(Mr),c=t.dot(Mr),u=n.dot(Mr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Im=new Si,js=new L,cl=new L;class Wi{constructor(e=new L,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Im.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;js.subVectors(e,this.center);const t=js.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(js,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(cl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(js.copy(e.center).add(cl)),this.expandByPoint(js.copy(e.center).sub(cl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Pi=new L,ul=new L,ka=new L,Ki=new L,hl=new L,Ha=new L,dl=new L;class No{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pi.copy(this.origin).addScaledVector(this.direction,t),Pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ul.copy(e).add(t).multiplyScalar(.5),ka.copy(t).sub(e).normalize(),Ki.copy(this.origin).sub(ul);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ka),o=Ki.dot(this.direction),l=-Ki.dot(ka),c=Ki.lengthSq(),u=Math.abs(1-a*a);let h,d,p,v;if(u>0)if(h=a*l-o,d=a*o-l,v=s*u,h>=0)if(d>=-v)if(d<=v){const x=1/u;h*=x,d*=x,p=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d<=-v?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c):d<=v?(h=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(ul).addScaledVector(ka,d),p}intersectSphere(e,t){Pi.subVectors(e.center,this.origin);const n=Pi.dot(this.direction),r=Pi.dot(Pi)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Pi)!==null}intersectTriangle(e,t,n,r,s){hl.subVectors(t,e),Ha.subVectors(n,e),dl.crossVectors(hl,Ha);let a=this.direction.dot(dl),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ki.subVectors(this.origin,e);const l=o*this.direction.dot(Ha.crossVectors(Ki,Ha));if(l<0)return null;const c=o*this.direction.dot(hl.cross(Ki));if(c<0||l+c>a)return null;const u=-o*Ki.dot(dl);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Le{constructor(){Le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,n,r,s,a,o,l,c,u,h,d,p,v,x,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=v,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Le().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/as.setFromMatrixColumn(e,0).length(),s=1/as.setFromMatrixColumn(e,1).length(),a=1/as.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*u,p=a*h,v=o*u,x=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+v*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=v+p*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,p=l*h,v=c*u,x=c*h;t[0]=d+x*o,t[4]=v*o-p,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=p*o-v,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,p=l*h,v=c*u,x=c*h;t[0]=d-x*o,t[4]=-a*h,t[8]=v+p*o,t[1]=p+v*o,t[5]=a*u,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,p=a*h,v=o*u,x=o*h;t[0]=l*u,t[4]=v*c-p,t[8]=d*c+x,t[1]=l*h,t[5]=x*c+d,t[9]=p*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,v=o*l,x=o*c;t[0]=l*u,t[4]=x-d*h,t[8]=v*h+p,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*h+v,t[10]=d-x*h}else if(e.order==="XZY"){const d=a*l,p=a*c,v=o*l,x=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+x,t[5]=a*u,t[9]=p*h-v,t[2]=v*h-p,t[6]=o*u,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Um,e,Nm)}lookAt(e,t,n){const r=this.elements;return Pn.subVectors(e,t),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),$i.crossVectors(n,Pn),$i.lengthSq()===0&&(Math.abs(n.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),$i.crossVectors(n,Pn)),$i.normalize(),Ga.crossVectors(Pn,$i),r[0]=$i.x,r[4]=Ga.x,r[8]=Pn.x,r[1]=$i.y,r[5]=Ga.y,r[9]=Pn.y,r[2]=$i.z,r[6]=Ga.z,r[10]=Pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],p=n[13],v=n[2],x=n[6],m=n[10],f=n[14],M=n[3],_=n[7],y=n[11],S=n[15],E=r[0],R=r[4],P=r[8],w=r[12],T=r[1],N=r[5],F=r[9],U=r[13],z=r[2],k=r[6],ee=r[10],$=r[14],Y=r[3],ne=r[7],J=r[11],be=r[15];return s[0]=a*E+o*T+l*z+c*Y,s[4]=a*R+o*N+l*k+c*ne,s[8]=a*P+o*F+l*ee+c*J,s[12]=a*w+o*U+l*$+c*be,s[1]=u*E+h*T+d*z+p*Y,s[5]=u*R+h*N+d*k+p*ne,s[9]=u*P+h*F+d*ee+p*J,s[13]=u*w+h*U+d*$+p*be,s[2]=v*E+x*T+m*z+f*Y,s[6]=v*R+x*N+m*k+f*ne,s[10]=v*P+x*F+m*ee+f*J,s[14]=v*w+x*U+m*$+f*be,s[3]=M*E+_*T+y*z+S*Y,s[7]=M*R+_*N+y*k+S*ne,s[11]=M*P+_*F+y*ee+S*J,s[15]=M*w+_*U+y*$+S*be,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],p=e[14],v=e[3],x=e[7],m=e[11],f=e[15];return v*(+s*l*h-r*c*h-s*o*d+n*c*d+r*o*p-n*l*p)+x*(+t*l*p-t*c*d+s*a*d-r*a*p+r*c*u-s*l*u)+m*(+t*c*h-t*o*p-s*a*h+n*a*p+s*o*u-n*c*u)+f*(-r*o*u-t*l*h+t*o*d+r*a*h-n*a*d+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],p=e[11],v=e[12],x=e[13],m=e[14],f=e[15],M=h*m*c-x*d*c+x*l*p-o*m*p-h*l*f+o*d*f,_=v*d*c-u*m*c-v*l*p+a*m*p+u*l*f-a*d*f,y=u*x*c-v*h*c+v*o*p-a*x*p-u*o*f+a*h*f,S=v*h*l-u*x*l-v*o*d+a*x*d+u*o*m-a*h*m,E=t*M+n*_+r*y+s*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/E;return e[0]=M*R,e[1]=(x*d*s-h*m*s-x*r*p+n*m*p+h*r*f-n*d*f)*R,e[2]=(o*m*s-x*l*s+x*r*c-n*m*c-o*r*f+n*l*f)*R,e[3]=(h*l*s-o*d*s-h*r*c+n*d*c+o*r*p-n*l*p)*R,e[4]=_*R,e[5]=(u*m*s-v*d*s+v*r*p-t*m*p-u*r*f+t*d*f)*R,e[6]=(v*l*s-a*m*s-v*r*c+t*m*c+a*r*f-t*l*f)*R,e[7]=(a*d*s-u*l*s+u*r*c-t*d*c-a*r*p+t*l*p)*R,e[8]=y*R,e[9]=(v*h*s-u*x*s-v*n*p+t*x*p+u*n*f-t*h*f)*R,e[10]=(a*x*s-v*o*s+v*n*c-t*x*c-a*n*f+t*o*f)*R,e[11]=(u*o*s-a*h*s-u*n*c+t*h*c+a*n*p-t*o*p)*R,e[12]=S*R,e[13]=(u*x*r-v*h*r+v*n*d-t*x*d-u*n*m+t*h*m)*R,e[14]=(v*o*r-a*x*r-v*n*l+t*x*l+a*n*m-t*o*m)*R,e[15]=(a*h*r-u*o*r+u*n*l-t*h*l-a*n*d+t*o*d)*R,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,d=s*c,p=s*u,v=s*h,x=a*u,m=a*h,f=o*h,M=l*c,_=l*u,y=l*h,S=n.x,E=n.y,R=n.z;return r[0]=(1-(x+f))*S,r[1]=(p+y)*S,r[2]=(v-_)*S,r[3]=0,r[4]=(p-y)*E,r[5]=(1-(d+f))*E,r[6]=(m+M)*E,r[7]=0,r[8]=(v+_)*R,r[9]=(m-M)*R,r[10]=(1-(d+x))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=as.set(r[0],r[1],r[2]).length();const a=as.set(r[4],r[5],r[6]).length(),o=as.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Gn.copy(this);const c=1/s,u=1/a,h=1/o;return Gn.elements[0]*=c,Gn.elements[1]*=c,Gn.elements[2]*=c,Gn.elements[4]*=u,Gn.elements[5]*=u,Gn.elements[6]*=u,Gn.elements[8]*=h,Gn.elements[9]*=h,Gn.elements[10]*=h,t.setFromRotationMatrix(Gn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a){const o=this.elements,l=2*s/(t-e),c=2*s/(n-r),u=(t+e)/(t-e),h=(n+r)/(n-r),d=-(a+s)/(a-s),p=-2*a*s/(a-s);return o[0]=l,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=c,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=d,o[14]=p,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,n,r,s,a){const o=this.elements,l=1/(t-e),c=1/(n-r),u=1/(a-s),h=(t+e)*l,d=(n+r)*c,p=(a+s)*u;return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-d,o[2]=0,o[6]=0,o[10]=-2*u,o[14]=-p,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const as=new L,Gn=new Le,Um=new L(0,0,0),Nm=new L(1,1,1),$i=new L,Ga=new L,Pn=new L,Lu=new Le,Iu=new kt;class Ea{constructor(e=0,t=0,n=0,r=Ea.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(en(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-en(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(en(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-en(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(en(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-en(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Lu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Lu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Iu.setFromEuler(this),this.setFromQuaternion(Iu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ea.DEFAULT_ORDER="XYZ";class Ic{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Om=0;const Uu=new L,os=new kt,Ci=new Le,Va=new L,Xs=new L,Fm=new L,Bm=new kt,Nu=new L(1,0,0),Ou=new L(0,1,0),Fu=new L(0,0,1),zm={type:"added"},Bu={type:"removed"};class yt extends Mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Om++}),this.uuid=ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new L,t=new Ea,n=new kt,r=new L(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Le},normalMatrix:{value:new Qe}}),this.matrix=new Le,this.matrixWorld=new Le,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new Ic,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return os.setFromAxisAngle(e,t),this.quaternion.multiply(os),this}rotateOnWorldAxis(e,t){return os.setFromAxisAngle(e,t),this.quaternion.premultiply(os),this}rotateX(e){return this.rotateOnAxis(Nu,e)}rotateY(e){return this.rotateOnAxis(Ou,e)}rotateZ(e){return this.rotateOnAxis(Fu,e)}translateOnAxis(e,t){return Uu.copy(e).applyQuaternion(this.quaternion),this.position.add(Uu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nu,e)}translateY(e){return this.translateOnAxis(Ou,e)}translateZ(e){return this.translateOnAxis(Fu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ci.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Va.copy(e):Va.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ci.lookAt(Xs,Va,this.up):Ci.lookAt(Va,Xs,this.up),this.quaternion.setFromRotationMatrix(Ci),r&&(Ci.extractRotation(r.matrixWorld),os.setFromRotationMatrix(Ci),this.quaternion.premultiply(os.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(zm)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(Bu)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),Ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ci),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let r=0,s=this.children.length;r<s;r++){const a=this.children[r].getObjectsByProperty(e,t);a.length>0&&(n=n.concat(a))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,e,Fm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,Bm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),p=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),v.length>0&&(n.nodes=v)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}yt.DEFAULT_UP=new L(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Vn=new L,Ri=new L,fl=new L,Di=new L,ls=new L,cs=new L,zu=new L,pl=new L,ml=new L,gl=new L;let Wa=!1;class Qn{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Vn.subVectors(e,t),r.cross(Vn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Vn.subVectors(r,t),Ri.subVectors(n,t),fl.subVectors(e,t);const a=Vn.dot(Vn),o=Vn.dot(Ri),l=Vn.dot(fl),c=Ri.dot(Ri),u=Ri.dot(fl),h=a*c-o*o;if(h===0)return s.set(-2,-1,-1);const d=1/h,p=(c*l-o*u)*d,v=(a*u-o*l)*d;return s.set(1-p-v,v,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Di),Di.x>=0&&Di.y>=0&&Di.x+Di.y<=1}static getUV(e,t,n,r,s,a,o,l){return Wa===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Wa=!0),this.getInterpolation(e,t,n,r,s,a,o,l)}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,Di),l.setScalar(0),l.addScaledVector(s,Di.x),l.addScaledVector(a,Di.y),l.addScaledVector(o,Di.z),l}static isFrontFacing(e,t,n,r){return Vn.subVectors(n,t),Ri.subVectors(e,t),Vn.cross(Ri).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vn.subVectors(this.c,this.b),Ri.subVectors(this.a,this.b),Vn.cross(Ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return Wa===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Wa=!0),Qn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return Qn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;ls.subVectors(r,n),cs.subVectors(s,n),pl.subVectors(e,n);const l=ls.dot(pl),c=cs.dot(pl);if(l<=0&&c<=0)return t.copy(n);ml.subVectors(e,r);const u=ls.dot(ml),h=cs.dot(ml);if(u>=0&&h<=u)return t.copy(r);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(ls,a);gl.subVectors(e,s);const p=ls.dot(gl),v=cs.dot(gl);if(v>=0&&p<=v)return t.copy(s);const x=p*c-l*v;if(x<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(n).addScaledVector(cs,o);const m=u*v-p*h;if(m<=0&&h-u>=0&&p-v>=0)return zu.subVectors(s,r),o=(h-u)/(h-u+(p-v)),t.copy(r).addScaledVector(zu,o);const f=1/(m+x+d);return a=x*f,o=d*f,t.copy(n).addScaledVector(ls,a).addScaledVector(cs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let km=0;class En extends Mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:km++}),this.uuid=ni(),this.name="",this.type="Material",this.blending=Cs,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=Fd,this.blendDst=Bd,this.blendEquation=Ss,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Mo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=il,this.stencilZFail=il,this.stencilZPass=il,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Cs&&(n.blending=this.blending),this.side!==ri&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(n.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Qd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wn={h:0,s:0,l:0},ja={h:0,s:0,l:0};function vl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Re{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=On){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,An.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=An.workingColorSpace){return this.r=e,this.g=t,this.b=n,An.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=An.workingColorSpace){if(e=Dc(e,1),t=en(t,0,1),n=en(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=vl(a,s,e+1/3),this.g=vl(a,s,e),this.b=vl(a,s,e-1/3)}return An.toWorkingColorSpace(this,r),this}setStyle(e,t=On){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,An.toWorkingColorSpace(this,t),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,An.toWorkingColorSpace(this,t),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const l=parseFloat(s[1])/360,c=parseFloat(s[2])/100,u=parseFloat(s[3])/100;return n(s[4]),this.setHSL(l,c,u,t)}break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=On){const n=Qd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rs(e.r),this.g=Rs(e.g),this.b=Rs(e.b),this}copyLinearToSRGB(e){return this.r=sl(e.r),this.g=sl(e.g),this.b=sl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=On){return An.fromWorkingColorSpace(ln.copy(this),e),en(ln.r*255,0,255)<<16^en(ln.g*255,0,255)<<8^en(ln.b*255,0,255)<<0}getHexString(e=On){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=An.workingColorSpace){An.fromWorkingColorSpace(ln.copy(this),t);const n=ln.r,r=ln.g,s=ln.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=An.workingColorSpace){return An.fromWorkingColorSpace(ln.copy(this),t),e.r=ln.r,e.g=ln.g,e.b=ln.b,e}getStyle(e=On){An.fromWorkingColorSpace(ln.copy(this),e);const t=ln.r,n=ln.g,r=ln.b;return e!==On?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${t*255|0},${n*255|0},${r*255|0})`}offsetHSL(e,t,n){return this.getHSL(Wn),Wn.h+=e,Wn.s+=t,Wn.l+=n,this.setHSL(Wn.h,Wn.s,Wn.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Wn),e.getHSL(ja);const n=la(Wn.h,ja.h,t),r=la(Wn.s,ja.s,t),s=la(Wn.l,ja.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ln=new Re;Re.NAMES=Qd;class xi extends En{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Vd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const zi=Hm();function Hm(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,r[l]=24,r[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,r[l]=-c-1,r[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,r[l]=13,r[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,r[l]=24,r[l|256]=24):(n[l]=31744,n[l|256]=64512,r[l]=13,r[l|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;!(c&8388608);)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[l]=c|u}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}function Gm(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=en(i,-65504,65504),zi.floatView[0]=i;const e=zi.uint32View[0],t=e>>23&511;return zi.baseTable[t]+((e&8388607)>>zi.shiftTable[t])}function Vm(i){const e=i>>10;return zi.uint32View[0]=zi.mantissaTable[zi.offsetTable[e]+(i&1023)]+zi.exponentTable[e],zi.floatView[0]}const bs={toHalfFloat:Gm,fromHalfFloat:Vm},Wt=new L,Xa=new ye;class Lt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ql,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Xa.fromBufferAttribute(this,t),Xa.applyMatrix3(e),this.setXY(t,Xa.x,Xa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix3(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Hi(t,this.array)),t}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Hi(t,this.array)),t}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Hi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Hi(t,this.array)),t}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),r=vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),r=vt(r,this.array),s=vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ql&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class ef extends Lt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class tf extends Lt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class dt extends Lt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Wm=0;const In=new Le,xl=new yt,us=new L,Cn=new Si,qs=new Si,Kt=new L;class Ft extends Mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wm++}),this.uuid=ni(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Kd(e)?tf:ef)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Qe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,t,n){return In.makeTranslation(e,t,n),this.applyMatrix4(In),this}scale(e,t,n){return In.makeScale(e,t,n),this.applyMatrix4(In),this}lookAt(e){return xl.lookAt(e),xl.updateMatrix(),this.applyMatrix4(xl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new dt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Si);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Cn.setFromBufferAttribute(s),this.morphTargetsRelative?(Kt.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(Kt),Kt.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(Kt)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];qs.setFromBufferAttribute(o),this.morphTargetsRelative?(Kt.addVectors(Cn.min,qs.min),Cn.expandByPoint(Kt),Kt.addVectors(Cn.max,qs.max),Cn.expandByPoint(Kt)):(Cn.expandByPoint(qs.min),Cn.expandByPoint(qs.max))}Cn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Kt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Kt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Kt.fromBufferAttribute(o,c),l&&(us.fromBufferAttribute(e,c),Kt.add(us)),r=Math.max(r,n.distanceToSquared(Kt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Lt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let T=0;T<o;T++)c[T]=new L,u[T]=new L;const h=new L,d=new L,p=new L,v=new ye,x=new ye,m=new ye,f=new L,M=new L;function _(T,N,F){h.fromArray(r,T*3),d.fromArray(r,N*3),p.fromArray(r,F*3),v.fromArray(a,T*2),x.fromArray(a,N*2),m.fromArray(a,F*2),d.sub(h),p.sub(h),x.sub(v),m.sub(v);const U=1/(x.x*m.y-m.x*x.y);isFinite(U)&&(f.copy(d).multiplyScalar(m.y).addScaledVector(p,-x.y).multiplyScalar(U),M.copy(p).multiplyScalar(x.x).addScaledVector(d,-m.x).multiplyScalar(U),c[T].add(f),c[N].add(f),c[F].add(f),u[T].add(M),u[N].add(M),u[F].add(M))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let T=0,N=y.length;T<N;++T){const F=y[T],U=F.start,z=F.count;for(let k=U,ee=U+z;k<ee;k+=3)_(n[k+0],n[k+1],n[k+2])}const S=new L,E=new L,R=new L,P=new L;function w(T){R.fromArray(s,T*3),P.copy(R);const N=c[T];S.copy(N),S.sub(R.multiplyScalar(R.dot(N))).normalize(),E.crossVectors(P,N);const U=E.dot(u[T])<0?-1:1;l[T*4]=S.x,l[T*4+1]=S.y,l[T*4+2]=S.z,l[T*4+3]=U}for(let T=0,N=y.length;T<N;++T){const F=y[T],U=F.start,z=F.count;for(let k=U,ee=U+z;k<ee;k+=3)w(n[k+0]),w(n[k+1]),w(n[k+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Lt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const r=new L,s=new L,a=new L,o=new L,l=new L,c=new L,u=new L,h=new L;if(e)for(let d=0,p=e.count;d<p;d+=3){const v=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,v),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Kt.fromBufferAttribute(e,t),Kt.normalize(),e.setXYZ(t,Kt.x,Kt.y,Kt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let p=0,v=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*u;for(let f=0;f<u;f++)d[v++]=c[p++]}return new Lt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ft,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],p=e(d,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ku=new Le,oi=new No,qa=new Wi,Hu=new L,hs=new L,ds=new L,fs=new L,_l=new L,Ya=new L,Za=new ye,Ka=new ye,$a=new ye,Gu=new L,Vu=new L,Wu=new L,Ja=new L,Qa=new L;class _e extends yt{constructor(e=new Ft,t=new xi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ya.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(_l.fromBufferAttribute(h,e),a?Ya.addScaledVector(_l,u):Ya.addScaledVector(_l.sub(t),u))}t.add(Ya)}return this.isSkinnedMesh&&this.applyBoneTransform(e,t),t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;if(r===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),qa.copy(n.boundingSphere),qa.applyMatrix4(s),oi.copy(e.ray).recast(e.near),qa.containsPoint(oi.origin)===!1&&(oi.intersectSphere(qa,Hu)===null||oi.origin.distanceToSquared(Hu)>(e.far-e.near)**2))||(ku.copy(s).invert(),oi.copy(e.ray).applyMatrix4(ku),n.boundingBox!==null&&oi.intersectsBox(n.boundingBox)===!1))return;let a;const o=n.index,l=n.attributes.position,c=n.attributes.uv,u=n.attributes.uv2,h=n.attributes.normal,d=n.groups,p=n.drawRange;if(o!==null)if(Array.isArray(r))for(let v=0,x=d.length;v<x;v++){const m=d[v],f=r[m.materialIndex],M=Math.max(m.start,p.start),_=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=M,S=_;y<S;y+=3){const E=o.getX(y),R=o.getX(y+1),P=o.getX(y+2);a=eo(this,f,e,oi,c,u,h,E,R,P),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const v=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=v,f=x;m<f;m+=3){const M=o.getX(m),_=o.getX(m+1),y=o.getX(m+2);a=eo(this,r,e,oi,c,u,h,M,_,y),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let v=0,x=d.length;v<x;v++){const m=d[v],f=r[m.materialIndex],M=Math.max(m.start,p.start),_=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=M,S=_;y<S;y+=3){const E=y,R=y+1,P=y+2;a=eo(this,f,e,oi,c,u,h,E,R,P),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const v=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=v,f=x;m<f;m+=3){const M=m,_=m+1,y=m+2;a=eo(this,r,e,oi,c,u,h,M,_,y),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}}}function jm(i,e,t,n,r,s,a,o){let l;if(e.side===Ot?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===ri,o),l===null)return null;Qa.copy(o),Qa.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Qa);return c<t.near||c>t.far?null:{distance:c,point:Qa.clone(),object:i}}function eo(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,hs),i.getVertexPosition(l,ds),i.getVertexPosition(c,fs);const u=jm(i,e,t,n,hs,ds,fs,Ja);if(u){r&&(Za.fromBufferAttribute(r,o),Ka.fromBufferAttribute(r,l),$a.fromBufferAttribute(r,c),u.uv=Qn.getInterpolation(Ja,hs,ds,fs,Za,Ka,$a,new ye)),s&&(Za.fromBufferAttribute(s,o),Ka.fromBufferAttribute(s,l),$a.fromBufferAttribute(s,c),u.uv2=Qn.getInterpolation(Ja,hs,ds,fs,Za,Ka,$a,new ye)),a&&(Gu.fromBufferAttribute(a,o),Vu.fromBufferAttribute(a,l),Wu.fromBufferAttribute(a,c),u.normal=Qn.getInterpolation(Ja,hs,ds,fs,Gu,Vu,Wu,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new L,materialIndex:0};Qn.getNormal(hs,ds,fs,h.normal),u.face=h}return u}class Dt extends Ft{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,p=0;v("z","y","x",-1,-1,n,t,e,a,s,0),v("z","y","x",1,-1,n,t,-e,a,s,1),v("x","z","y",1,1,e,n,t,r,a,2),v("x","z","y",1,-1,e,n,-t,r,a,3),v("x","y","z",1,-1,e,t,n,r,s,4),v("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(u,3)),this.setAttribute("uv",new dt(h,2));function v(x,m,f,M,_,y,S,E,R,P,w){const T=y/R,N=S/P,F=y/2,U=S/2,z=E/2,k=R+1,ee=P+1;let $=0,Y=0;const ne=new L;for(let J=0;J<ee;J++){const be=J*N-U;for(let ae=0;ae<k;ae++){const Z=ae*T-F;ne[x]=Z*M,ne[m]=be*_,ne[f]=z,c.push(ne.x,ne.y,ne.z),ne[x]=0,ne[m]=0,ne[f]=E>0?1:-1,u.push(ne.x,ne.y,ne.z),h.push(ae/R),h.push(1-J/P),$+=1}}for(let J=0;J<P;J++)for(let be=0;be<R;be++){const ae=d+be+k*J,Z=d+be+k*(J+1),re=d+(be+1)+k*(J+1),pe=d+(be+1)+k*J;l.push(ae,Z,pe),l.push(Z,re,pe),Y+=6}o.addGroup(p,Y,w),p+=Y,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Fs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function _n(i){const e={};for(let t=0;t<i.length;t++){const n=Fs(i[t]);for(const r in n)e[r]=n[r]}return e}function Xm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function nf(i){return i.getRenderTarget()===null&&i.outputEncoding===ke?On:Ns}const Wr={clone:Fs,merge:_n};var qm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ym=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class At extends En{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qm,this.fragmentShader=Ym,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fs(e.uniforms),this.uniformsGroups=Xm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Aa extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Le,this.projectionMatrix=new Le,this.projectionMatrixInverse=new Le}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class xt extends Aa{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Os*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(oa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Os*2*Math.atan(Math.tan(oa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(oa*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ps=-90,ms=1;class Zm extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n;const r=new xt(ps,ms,e,t);r.layers=this.layers,r.up.set(0,1,0),r.lookAt(1,0,0),this.add(r);const s=new xt(ps,ms,e,t);s.layers=this.layers,s.up.set(0,1,0),s.lookAt(-1,0,0),this.add(s);const a=new xt(ps,ms,e,t);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(0,1,0),this.add(a);const o=new xt(ps,ms,e,t);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(0,-1,0),this.add(o);const l=new xt(ps,ms,e,t);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,1),this.add(l);const c=new xt(ps,ms,e,t);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[r,s,a,o,l,c]=this.children,u=e.getRenderTarget(),h=e.toneMapping,d=e.xr.enabled;e.toneMapping=zn,e.xr.enabled=!1;const p=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,r),e.setRenderTarget(n,1),e.render(t,s),e.setRenderTarget(n,2),e.render(t,a),e.setRenderTarget(n,3),e.render(t,o),e.setRenderTarget(n,4),e.render(t,l),n.texture.generateMipmaps=p,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(u),e.toneMapping=h,e.xr.enabled=d,n.texture.needsPMREMUpdate=!0}}class rf extends Gt{constructor(e,t,n,r,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Ls,super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Km extends ct{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new rf(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ue}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Dt(5,5,5),s=new At({name:"CubemapFromEquirect",uniforms:Fs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ot,blending:Ht});s.uniforms.tEquirect.value=t;const a=new _e(r,s),o=t.minFilter;return t.minFilter===Gi&&(t.minFilter=Ue),new Zm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}const yl=new L,$m=new L,Jm=new Qe;class Bi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=yl.subVectors(n,t).cross($m.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(yl),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Jm.getNormalMatrix(e),r=this.coplanarPoint(yl).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Sr=new Wi,to=new L;class Oo{constructor(e=new Bi,t=new Bi,n=new Bi,r=new Bi,s=new Bi,a=new Bi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,r=n[0],s=n[1],a=n[2],o=n[3],l=n[4],c=n[5],u=n[6],h=n[7],d=n[8],p=n[9],v=n[10],x=n[11],m=n[12],f=n[13],M=n[14],_=n[15];return t[0].setComponents(o-r,h-l,x-d,_-m).normalize(),t[1].setComponents(o+r,h+l,x+d,_+m).normalize(),t[2].setComponents(o+s,h+c,x+p,_+f).normalize(),t[3].setComponents(o-s,h-c,x-p,_-f).normalize(),t[4].setComponents(o-a,h-u,x-v,_-M).normalize(),t[5].setComponents(o+a,h+u,x+v,_+M).normalize(),this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Sr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Sr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Sr)}intersectsSprite(e){return Sr.center.set(0,0,0),Sr.radius=.7071067811865476,Sr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Sr)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(to.x=r.normal.x>0?e.max.x:e.min.x,to.y=r.normal.y>0?e.max.y:e.min.y,to.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(to)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function sf(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Qm(i,e){const t=e.isWebGL2,n=new WeakMap;function r(c,u){const h=c.array,d=c.usage,p=i.createBuffer();i.bindBuffer(u,p),i.bufferData(u,h,d),c.onUploadCallback();let v;if(h instanceof Float32Array)v=5126;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=5123;else if(h instanceof Int16Array)v=5122;else if(h instanceof Uint32Array)v=5125;else if(h instanceof Int32Array)v=5124;else if(h instanceof Int8Array)v=5120;else if(h instanceof Uint8Array)v=5121;else if(h instanceof Uint8ClampedArray)v=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:p,type:v,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version}}function s(c,u,h){const d=u.array,p=u.updateRange;i.bindBuffer(h,c),p.count===-1?i.bufferSubData(h,0,d):(t?i.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):i.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(i.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h===void 0?n.set(c,r(c,u)):h.version<c.version&&(s(h.buffer,c,u),h.version=c.version)}return{get:a,remove:o,update:l}}class ji extends Ft{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,h=e/o,d=t/l,p=[],v=[],x=[],m=[];for(let f=0;f<u;f++){const M=f*d-a;for(let _=0;_<c;_++){const y=_*h-s;v.push(y,-M,0),x.push(0,0,1),m.push(_/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<o;M++){const _=M+c*f,y=M+c*(f+1),S=M+1+c*(f+1),E=M+1+c*f;p.push(_,y,E),p.push(y,S,E)}this.setIndex(p),this.setAttribute("position",new dt(v,3)),this.setAttribute("normal",new dt(x,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ji(e.width,e.height,e.widthSegments,e.heightSegments)}}var eg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ng=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,ig=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,rg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,sg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ag="vec3 transformed = vec3( position );",og=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,cg=`#ifdef USE_IRIDESCENCE
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
#endif`,ug=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
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
#endif`,hg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,dg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,gg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,xg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,_g=`#define PI 3.141592653589793
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
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,yg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,wg=`vec3 transformedNormal = objectNormal;
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
#endif`,Mg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Eg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ag="gl_FragColor = linearToOutputTexel( gl_FragColor );",Pg=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Cg=`#ifdef USE_ENVMAP
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
#endif`,Rg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Dg=`#ifdef USE_ENVMAP
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
#endif`,Lg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ig=`#ifdef USE_ENVMAP
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
#endif`,Ug=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ng=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Og=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Fg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Bg=`#ifdef USE_GRADIENTMAP
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
}`,zg=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,kg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vg=`uniform bool receiveShadow;
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
#endif`,Wg=`#if defined( USE_ENVMAP )
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
#endif`,jg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
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
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif`,Kg=`struct PhysicalMaterial {
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
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
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
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
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
#endif
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
		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );
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
}`,$g=`
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
#endif`,Jg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
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
#endif`,Qg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,ev=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,tv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,iv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,rv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,av=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ov=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hv=`#ifdef USE_MORPHNORMALS
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
#endif`,dv=`#ifdef USE_MORPHTARGETS
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
#endif`,fv=`#ifdef USE_MORPHTARGETS
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
#endif`,pv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#ifdef USE_NORMALMAP_TANGENTSPACE
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal, vNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 geometryNormal = normal;`,mv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,gv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_v=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,yv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,wv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,bv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Tv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ev=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Av=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Iv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Uv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Nv=`float getShadowMask() {
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
}`,Ov=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fv=`#ifdef USE_SKINNING
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
#endif`,Bv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zv=`#ifdef USE_SKINNING
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
#endif`,kv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Wv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
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
#endif`,jv=`#ifdef USE_TRANSMISSION
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
#endif`,Xv=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qv=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_UV2
	attribute vec2 uv2;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Yv=`#ifdef USE_UV
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Zv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Kv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$v=`uniform sampler2D t2D;
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
}`,Jv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,e0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,t0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,n0=`#include <common>
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
}`,i0=`#if DEPTH_PACKING == 3200
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
}`,r0=`#define DISTANCE
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
}`,s0=`#define DISTANCE
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
}`,a0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,o0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,l0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,c0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
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
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,u0=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
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
}`,h0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
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
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
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
}`,d0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
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
}`,f0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
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
}`,p0=`#define MATCAP
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
}`,m0=`#define MATCAP
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
}`,g0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
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
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,v0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
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
}`,x0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
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
}`,_0=`#define PHONG
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
}`,y0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
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
}`,w0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
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
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
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
}`,M0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
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
}`,S0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
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
}`,b0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
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
}`,T0=`uniform vec3 diffuse;
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
}`,E0=`#include <common>
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
}`,A0=`uniform vec3 color;
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
}`,P0=`uniform float rotation;
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
}`,C0=`uniform vec3 diffuse;
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
}`,Ve={alphamap_fragment:eg,alphamap_pars_fragment:tg,alphatest_fragment:ng,alphatest_pars_fragment:ig,aomap_fragment:rg,aomap_pars_fragment:sg,begin_vertex:ag,beginnormal_vertex:og,bsdfs:lg,iridescence_fragment:cg,bumpmap_pars_fragment:ug,clipping_planes_fragment:hg,clipping_planes_pars_fragment:dg,clipping_planes_pars_vertex:fg,clipping_planes_vertex:pg,color_fragment:mg,color_pars_fragment:gg,color_pars_vertex:vg,color_vertex:xg,common:_g,cube_uv_reflection_fragment:yg,defaultnormal_vertex:wg,displacementmap_pars_vertex:Mg,displacementmap_vertex:Sg,emissivemap_fragment:Tg,emissivemap_pars_fragment:Eg,encodings_fragment:Ag,encodings_pars_fragment:Pg,envmap_fragment:Cg,envmap_common_pars_fragment:Rg,envmap_pars_fragment:Dg,envmap_pars_vertex:Lg,envmap_physical_pars_fragment:Wg,envmap_vertex:Ig,fog_vertex:Ug,fog_pars_vertex:Ng,fog_fragment:Og,fog_pars_fragment:Fg,gradientmap_pars_fragment:Bg,lightmap_fragment:zg,lightmap_pars_fragment:kg,lights_lambert_fragment:Hg,lights_lambert_pars_fragment:Gg,lights_pars_begin:Vg,lights_toon_fragment:jg,lights_toon_pars_fragment:Xg,lights_phong_fragment:qg,lights_phong_pars_fragment:Yg,lights_physical_fragment:Zg,lights_physical_pars_fragment:Kg,lights_fragment_begin:$g,lights_fragment_maps:Jg,lights_fragment_end:Qg,logdepthbuf_fragment:ev,logdepthbuf_pars_fragment:tv,logdepthbuf_pars_vertex:nv,logdepthbuf_vertex:iv,map_fragment:rv,map_pars_fragment:sv,map_particle_fragment:av,map_particle_pars_fragment:ov,metalnessmap_fragment:lv,metalnessmap_pars_fragment:cv,morphcolor_vertex:uv,morphnormal_vertex:hv,morphtarget_pars_vertex:dv,morphtarget_vertex:fv,normal_fragment_begin:pv,normal_fragment_maps:mv,normal_pars_fragment:gv,normal_pars_vertex:vv,normal_vertex:xv,normalmap_pars_fragment:_v,clearcoat_normal_fragment_begin:yv,clearcoat_normal_fragment_maps:wv,clearcoat_pars_fragment:Mv,iridescence_pars_fragment:Sv,output_fragment:bv,packing:Tv,premultiplied_alpha_fragment:Ev,project_vertex:Av,dithering_fragment:Pv,dithering_pars_fragment:Cv,roughnessmap_fragment:Rv,roughnessmap_pars_fragment:Dv,shadowmap_pars_fragment:Lv,shadowmap_pars_vertex:Iv,shadowmap_vertex:Uv,shadowmask_pars_fragment:Nv,skinbase_vertex:Ov,skinning_pars_vertex:Fv,skinning_vertex:Bv,skinnormal_vertex:zv,specularmap_fragment:kv,specularmap_pars_fragment:Hv,tonemapping_fragment:Gv,tonemapping_pars_fragment:Vv,transmission_fragment:Wv,transmission_pars_fragment:jv,uv_pars_fragment:Xv,uv_pars_vertex:qv,uv_vertex:Yv,worldpos_vertex:Zv,background_vert:Kv,background_frag:$v,backgroundCube_vert:Jv,backgroundCube_frag:Qv,cube_vert:e0,cube_frag:t0,depth_vert:n0,depth_frag:i0,distanceRGBA_vert:r0,distanceRGBA_frag:s0,equirect_vert:a0,equirect_frag:o0,linedashed_vert:l0,linedashed_frag:c0,meshbasic_vert:u0,meshbasic_frag:h0,meshlambert_vert:d0,meshlambert_frag:f0,meshmatcap_vert:p0,meshmatcap_frag:m0,meshnormal_vert:g0,meshnormal_frag:v0,meshphong_vert:x0,meshphong_frag:_0,meshphysical_vert:y0,meshphysical_frag:w0,meshtoon_vert:M0,meshtoon_frag:S0,points_vert:b0,points_frag:T0,shadow_vert:E0,shadow_frag:A0,sprite_vert:P0,sprite_frag:C0},Ee={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaTest:{value:0}}},dn={basic:{uniforms:_n([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:_n([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new Re(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:_n([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:_n([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:_n([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new Re(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:_n([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:_n([Ee.points,Ee.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:_n([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:_n([Ee.common,Ee.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:_n([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:_n([Ee.sprite,Ee.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:_n([Ee.common,Ee.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:_n([Ee.lights,Ee.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};dn.physical={uniforms:_n([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const no={r:0,b:0,g:0};function R0(i,e,t,n,r,s,a){const o=new Re(0);let l=s===!0?0:1,c,u,h=null,d=0,p=null;function v(m,f){let M=!1,_=f.isScene===!0?f.background:null;_&&_.isTexture&&(_=(f.backgroundBlurriness>0?t:e).get(_));const y=i.xr,S=y.getSession&&y.getSession();S&&S.environmentBlendMode==="additive"&&(_=null),_===null?x(o,l):_&&_.isColor&&(x(_,1),M=!0),(i.autoClear||M)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),_&&(_.isCubeTexture||_.mapping===Lo)?(u===void 0&&(u=new _e(new Dt(1,1,1),new At({name:"BackgroundCubeMaterial",uniforms:Fs(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Ot,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,R,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,u.material.toneMapped=_.encoding!==ke,(h!==_||d!==_.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,p=i.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new _e(new ji(2,2),new At({name:"BackgroundMaterial",uniforms:Fs(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=_.encoding!==ke,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,p=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function x(m,f){m.getRGB(no,nf(i)),n.buffers.color.setClear(no.r,no.g,no.b,f,a)}return{getClearColor:function(){return o},setClearColor:function(m,f=1){o.set(m),l=f,x(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,x(o,l)},render:v}}function D0(i,e,t,n){const r=i.getParameter(34921),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=m(null);let c=l,u=!1;function h(z,k,ee,$,Y){let ne=!1;if(a){const J=x($,ee,k);c!==J&&(c=J,p(c.object)),ne=f(z,$,ee,Y),ne&&M(z,$,ee,Y)}else{const J=k.wireframe===!0;(c.geometry!==$.id||c.program!==ee.id||c.wireframe!==J)&&(c.geometry=$.id,c.program=ee.id,c.wireframe=J,ne=!0)}Y!==null&&t.update(Y,34963),(ne||u)&&(u=!1,P(z,k,ee,$),Y!==null&&i.bindBuffer(34963,t.get(Y).buffer))}function d(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function p(z){return n.isWebGL2?i.bindVertexArray(z):s.bindVertexArrayOES(z)}function v(z){return n.isWebGL2?i.deleteVertexArray(z):s.deleteVertexArrayOES(z)}function x(z,k,ee){const $=ee.wireframe===!0;let Y=o[z.id];Y===void 0&&(Y={},o[z.id]=Y);let ne=Y[k.id];ne===void 0&&(ne={},Y[k.id]=ne);let J=ne[$];return J===void 0&&(J=m(d()),ne[$]=J),J}function m(z){const k=[],ee=[],$=[];for(let Y=0;Y<r;Y++)k[Y]=0,ee[Y]=0,$[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:ee,attributeDivisors:$,object:z,attributes:{},index:null}}function f(z,k,ee,$){const Y=c.attributes,ne=k.attributes;let J=0;const be=ee.getAttributes();for(const ae in be)if(be[ae].location>=0){const re=Y[ae];let pe=ne[ae];if(pe===void 0&&(ae==="instanceMatrix"&&z.instanceMatrix&&(pe=z.instanceMatrix),ae==="instanceColor"&&z.instanceColor&&(pe=z.instanceColor)),re===void 0||re.attribute!==pe||pe&&re.data!==pe.data)return!0;J++}return c.attributesNum!==J||c.index!==$}function M(z,k,ee,$){const Y={},ne=k.attributes;let J=0;const be=ee.getAttributes();for(const ae in be)if(be[ae].location>=0){let re=ne[ae];re===void 0&&(ae==="instanceMatrix"&&z.instanceMatrix&&(re=z.instanceMatrix),ae==="instanceColor"&&z.instanceColor&&(re=z.instanceColor));const pe={};pe.attribute=re,re&&re.data&&(pe.data=re.data),Y[ae]=pe,J++}c.attributes=Y,c.attributesNum=J,c.index=$}function _(){const z=c.newAttributes;for(let k=0,ee=z.length;k<ee;k++)z[k]=0}function y(z){S(z,0)}function S(z,k){const ee=c.newAttributes,$=c.enabledAttributes,Y=c.attributeDivisors;ee[z]=1,$[z]===0&&(i.enableVertexAttribArray(z),$[z]=1),Y[z]!==k&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](z,k),Y[z]=k)}function E(){const z=c.newAttributes,k=c.enabledAttributes;for(let ee=0,$=k.length;ee<$;ee++)k[ee]!==z[ee]&&(i.disableVertexAttribArray(ee),k[ee]=0)}function R(z,k,ee,$,Y,ne){n.isWebGL2===!0&&(ee===5124||ee===5125)?i.vertexAttribIPointer(z,k,ee,Y,ne):i.vertexAttribPointer(z,k,ee,$,Y,ne)}function P(z,k,ee,$){if(n.isWebGL2===!1&&(z.isInstancedMesh||$.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();const Y=$.attributes,ne=ee.getAttributes(),J=k.defaultAttributeValues;for(const be in ne){const ae=ne[be];if(ae.location>=0){let Z=Y[be];if(Z===void 0&&(be==="instanceMatrix"&&z.instanceMatrix&&(Z=z.instanceMatrix),be==="instanceColor"&&z.instanceColor&&(Z=z.instanceColor)),Z!==void 0){const re=Z.normalized,pe=Z.itemSize,he=t.get(Z);if(he===void 0)continue;const j=he.buffer,Fe=he.type,ve=he.bytesPerElement;if(Z.isInterleavedBufferAttribute){const ue=Z.data,He=ue.stride,Ke=Z.offset;if(ue.isInstancedInterleavedBuffer){for(let Be=0;Be<ae.locationSize;Be++)S(ae.location+Be,ue.meshPerAttribute);z.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Be=0;Be<ae.locationSize;Be++)y(ae.location+Be);i.bindBuffer(34962,j);for(let Be=0;Be<ae.locationSize;Be++)R(ae.location+Be,pe/ae.locationSize,Fe,re,He*ve,(Ke+pe/ae.locationSize*Be)*ve)}else{if(Z.isInstancedBufferAttribute){for(let ue=0;ue<ae.locationSize;ue++)S(ae.location+ue,Z.meshPerAttribute);z.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ue=0;ue<ae.locationSize;ue++)y(ae.location+ue);i.bindBuffer(34962,j);for(let ue=0;ue<ae.locationSize;ue++)R(ae.location+ue,pe/ae.locationSize,Fe,re,pe*ve,pe/ae.locationSize*ue*ve)}}else if(J!==void 0){const re=J[be];if(re!==void 0)switch(re.length){case 2:i.vertexAttrib2fv(ae.location,re);break;case 3:i.vertexAttrib3fv(ae.location,re);break;case 4:i.vertexAttrib4fv(ae.location,re);break;default:i.vertexAttrib1fv(ae.location,re)}}}}E()}function w(){F();for(const z in o){const k=o[z];for(const ee in k){const $=k[ee];for(const Y in $)v($[Y].object),delete $[Y];delete k[ee]}delete o[z]}}function T(z){if(o[z.id]===void 0)return;const k=o[z.id];for(const ee in k){const $=k[ee];for(const Y in $)v($[Y].object),delete $[Y];delete k[ee]}delete o[z.id]}function N(z){for(const k in o){const ee=o[k];if(ee[z.id]===void 0)continue;const $=ee[z.id];for(const Y in $)v($[Y].object),delete $[Y];delete ee[z.id]}}function F(){U(),u=!0,c!==l&&(c=l,p(c.object))}function U(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:F,resetDefaultState:U,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfProgram:N,initAttributes:_,enableAttribute:y,disableUnusedAttributes:E}}function L0(i,e,t,n){const r=n.isWebGL2;let s;function a(c){s=c}function o(c,u){i.drawArrays(s,c,u),t.update(u,s,1)}function l(c,u,h){if(h===0)return;let d,p;if(r)d=i,p="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[p](s,c,u,h),t.update(u,s,h)}this.setMode=a,this.render=o,this.renderInstances=l}function I0(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(R){if(R==="highp"){if(i.getShaderPrecisionFormat(35633,36338).precision>0&&i.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(35633,36337).precision>0&&i.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=i.getParameter(34930),d=i.getParameter(35660),p=i.getParameter(3379),v=i.getParameter(34076),x=i.getParameter(34921),m=i.getParameter(36347),f=i.getParameter(36348),M=i.getParameter(36349),_=d>0,y=a||e.has("OES_texture_float"),S=_&&y,E=a?i.getParameter(36183):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:v,maxAttributes:x,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:M,vertexTextures:_,floatFragmentTextures:y,floatVertexTextures:S,maxSamples:E}}function U0(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Bi,o=new Qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||n!==0||r;return r=d,n=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,p){const v=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,f=i.get(h);if(!r||v===null||v.length===0||s&&!m)s?u(null):c();else{const M=s?0:n,_=M*4;let y=f.clippingState||null;l.value=y,y=u(v,d,_,p);for(let S=0;S!==_;++S)y[S]=t[S];f.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,p,v){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=l.value,v!==!0||m===null){const f=p+x*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let _=0,y=p;_!==x;++_,y+=4)a.copy(h[_]).applyMatrix4(M,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function N0(i){let e=new WeakMap;function t(a,o){return o===Tn?a.mapping=Ls:o===Kl&&(a.mapping=Is),a}function n(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){const o=a.mapping;if(o===Tn||o===Kl)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Km(l.height/2);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Pa extends Aa{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ts=4,ju=[.125,.215,.35,.446,.526,.582],Dr=20,wl=new Pa,Xu=new Re;let Ml=null;const Ar=(1+Math.sqrt(5))/2,gs=1/Ar,qu=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,Ar,gs),new L(0,Ar,-gs),new L(gs,0,Ar),new L(-gs,0,Ar),new L(Ar,gs,0),new L(-Ar,gs,0)];class nc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Ml=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ku(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ml),e.scissorTest=!1,io(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ls||e.mapping===Is?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ml=this._renderer.getRenderTarget();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ue,minFilter:Ue,generateMipmaps:!1,type:_t,format:tn,encoding:vn,depthBuffer:!1},r=Yu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yu(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=O0(s)),this._blurMaterial=F0(s,e,t)}return r}_compileMaterial(e){const t=new _e(this._lodPlanes[0],e);this._renderer.compile(t,wl)}_sceneToCubeUV(e,t,n,r){const o=new xt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(Xu),u.toneMapping=zn,u.autoClear=!1;const p=new xi({name:"PMREM.Background",side:Ot,depthWrite:!1,depthTest:!1}),v=new _e(new Dt,p);let x=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,x=!0):(p.color.copy(Xu),x=!0);for(let f=0;f<6;f++){const M=f%3;M===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):M===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const _=this._cubeSize;io(r,M*_,f>2?_:0,_,_),u.setRenderTarget(r),x&&u.render(v,o),u.render(e,o)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Ls||e.mapping===Is;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ku()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zu());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new _e(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;io(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,wl)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=qu[(r-1)%qu.length];this._blur(e,r-1,r,s,a)}t.autoClear=n}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new _e(this._lodPlanes[r],c),d=c.uniforms,p=this._sizeLods[n]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Dr-1),x=s/v,m=isFinite(s)?1+Math.floor(u*x):Dr;m>Dr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Dr}`);const f=[];let M=0;for(let R=0;R<Dr;++R){const P=R/x,w=Math.exp(-P*P/2);f.push(w),R===0?M+=w:R<m&&(M+=2*w)}for(let R=0;R<f.length;R++)f[R]=f[R]/M;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:_}=this;d.dTheta.value=v,d.mipInt.value=_-n;const y=this._sizeLods[r],S=3*y*(r>_-Ts?r-_+Ts:0),E=4*(this._cubeSize-y);io(t,S,E,3*y,2*y),l.setRenderTarget(t),l.render(h,wl)}}function O0(i){const e=[],t=[],n=[];let r=i;const s=i-Ts+1+ju.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>i-Ts?l=ju[a-i+Ts-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,v=6,x=3,m=2,f=1,M=new Float32Array(x*v*p),_=new Float32Array(m*v*p),y=new Float32Array(f*v*p);for(let E=0;E<p;E++){const R=E%3*2/3-1,P=E>2?0:-1,w=[R,P,0,R+2/3,P,0,R+2/3,P+1,0,R,P,0,R+2/3,P+1,0,R,P+1,0];M.set(w,x*v*E),_.set(d,m*v*E);const T=[E,E,E,E,E,E];y.set(T,f*v*E)}const S=new Ft;S.setAttribute("position",new Lt(M,x)),S.setAttribute("uv",new Lt(_,m)),S.setAttribute("faceIndex",new Lt(y,f)),e.push(S),r>Ts&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Yu(i,e,t){const n=new ct(i,e,t);return n.texture.mapping=Lo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function io(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function F0(i,e,t){const n=new Float32Array(Dr),r=new L(0,1,0);return new At({name:"SphericalGaussianBlur",defines:{n:Dr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Uc(),fragmentShader:`

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
		`,blending:Ht,depthTest:!1,depthWrite:!1})}function Zu(){return new At({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Uc(),fragmentShader:`

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
		`,blending:Ht,depthTest:!1,depthWrite:!1})}function Ku(){return new At({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Uc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ht,depthTest:!1,depthWrite:!1})}function Uc(){return`

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
	`}function B0(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Tn||l===Kl,u=l===Ls||l===Is;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new nc(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||u&&h&&r(h)){t===null&&(t=new nc(i));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function z0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function k0(i,e,t,n){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);d.removeEventListener("dispose",a),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const v in d)e.update(d[v],34962);const p=h.morphAttributes;for(const v in p){const x=p[v];for(let m=0,f=x.length;m<f;m++)e.update(x[m],34962)}}function c(h){const d=[],p=h.index,v=h.attributes.position;let x=0;if(p!==null){const M=p.array;x=p.version;for(let _=0,y=M.length;_<y;_+=3){const S=M[_+0],E=M[_+1],R=M[_+2];d.push(S,E,E,R,R,S)}}else{const M=v.array;x=v.version;for(let _=0,y=M.length/3-1;_<y;_+=3){const S=_+0,E=_+1,R=_+2;d.push(S,E,E,R,R,S)}}const m=new(Kd(d)?tf:ef)(d,1);m.version=x;const f=s.get(h);f&&e.remove(f),s.set(h,m)}function u(h){const d=s.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function H0(i,e,t,n){const r=n.isWebGL2;let s;function a(d){s=d}let o,l;function c(d){o=d.type,l=d.bytesPerElement}function u(d,p){i.drawElements(s,p,o,d*l),t.update(p,s,1)}function h(d,p,v){if(v===0)return;let x,m;if(r)x=i,m="drawElementsInstanced";else if(x=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",x===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[m](s,p,o,d*l,v),t.update(p,s,v)}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=h}function G0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case 4:t.triangles+=o*(s/3);break;case 1:t.lines+=o*(s/2);break;case 3:t.lines+=o*(s-1);break;case 2:t.lines+=o*s;break;case 0:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function V0(i,e){return i[0]-e[0]}function W0(i,e){return Math.abs(e[1])-Math.abs(i[1])}function j0(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,a=new ot,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const p=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,v=p!==void 0?p.length:0;let x=s.get(u);if(x===void 0||x.count!==v){let z=function(){F.dispose(),s.delete(u),u.removeEventListener("dispose",z)};x!==void 0&&x.texture.dispose();const M=u.morphAttributes.position!==void 0,_=u.morphAttributes.normal!==void 0,y=u.morphAttributes.color!==void 0,S=u.morphAttributes.position||[],E=u.morphAttributes.normal||[],R=u.morphAttributes.color||[];let P=0;M===!0&&(P=1),_===!0&&(P=2),y===!0&&(P=3);let w=u.attributes.position.count*P,T=1;w>e.maxTextureSize&&(T=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const N=new Float32Array(w*T*4*v),F=new Jd(N,w,T,v);F.type=lt,F.needsUpdate=!0;const U=P*4;for(let k=0;k<v;k++){const ee=S[k],$=E[k],Y=R[k],ne=w*T*4*k;for(let J=0;J<ee.count;J++){const be=J*U;M===!0&&(a.fromBufferAttribute(ee,J),N[ne+be+0]=a.x,N[ne+be+1]=a.y,N[ne+be+2]=a.z,N[ne+be+3]=0),_===!0&&(a.fromBufferAttribute($,J),N[ne+be+4]=a.x,N[ne+be+5]=a.y,N[ne+be+6]=a.z,N[ne+be+7]=0),y===!0&&(a.fromBufferAttribute(Y,J),N[ne+be+8]=a.x,N[ne+be+9]=a.y,N[ne+be+10]=a.z,N[ne+be+11]=Y.itemSize===4?a.w:1)}}x={count:v,texture:F,size:new ye(w,T)},s.set(u,x),u.addEventListener("dispose",z)}let m=0;for(let M=0;M<d.length;M++)m+=d[M];const f=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(i,"morphTargetBaseInfluence",f),h.getUniforms().setValue(i,"morphTargetInfluences",d),h.getUniforms().setValue(i,"morphTargetsTexture",x.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",x.size)}else{const p=d===void 0?0:d.length;let v=n[u.id];if(v===void 0||v.length!==p){v=[];for(let _=0;_<p;_++)v[_]=[_,0];n[u.id]=v}for(let _=0;_<p;_++){const y=v[_];y[0]=_,y[1]=d[_]}v.sort(W0);for(let _=0;_<8;_++)_<p&&v[_][1]?(o[_][0]=v[_][0],o[_][1]=v[_][1]):(o[_][0]=Number.MAX_SAFE_INTEGER,o[_][1]=0);o.sort(V0);const x=u.morphAttributes.position,m=u.morphAttributes.normal;let f=0;for(let _=0;_<8;_++){const y=o[_],S=y[0],E=y[1];S!==Number.MAX_SAFE_INTEGER&&E?(x&&u.getAttribute("morphTarget"+_)!==x[S]&&u.setAttribute("morphTarget"+_,x[S]),m&&u.getAttribute("morphNormal"+_)!==m[S]&&u.setAttribute("morphNormal"+_,m[S]),r[_]=E,f+=E):(x&&u.hasAttribute("morphTarget"+_)===!0&&u.deleteAttribute("morphTarget"+_),m&&u.hasAttribute("morphNormal"+_)===!0&&u.deleteAttribute("morphNormal"+_),r[_]=0)}const M=u.morphTargetsRelative?1:1-f;h.getUniforms().setValue(i,"morphTargetBaseInfluence",M),h.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function X0(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);return r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),t.update(l.instanceMatrix,34962),l.instanceColor!==null&&t.update(l.instanceColor,34962)),h}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const af=new Gt,of=new Jd,lf=new Lm,cf=new rf,$u=[],Ju=[],Qu=new Float32Array(16),eh=new Float32Array(9),th=new Float32Array(4);function ks(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=$u[r];if(s===void 0&&(s=new Float32Array(r),$u[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Xt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function qt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Fo(i,e){let t=Ju[e];t===void 0&&(t=new Int32Array(e),Ju[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function q0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Y0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;i.uniform2fv(this.addr,e),qt(t,e)}}function Z0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;i.uniform3fv(this.addr,e),qt(t,e)}}function K0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;i.uniform4fv(this.addr,e),qt(t,e)}}function $0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;th.set(n),i.uniformMatrix2fv(this.addr,!1,th),qt(t,n)}}function J0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;eh.set(n),i.uniformMatrix3fv(this.addr,!1,eh),qt(t,n)}}function Q0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;Qu.set(n),i.uniformMatrix4fv(this.addr,!1,Qu),qt(t,n)}}function ex(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function tx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;i.uniform2iv(this.addr,e),qt(t,e)}}function nx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;i.uniform3iv(this.addr,e),qt(t,e)}}function ix(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;i.uniform4iv(this.addr,e),qt(t,e)}}function rx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function sx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;i.uniform2uiv(this.addr,e),qt(t,e)}}function ax(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;i.uniform3uiv(this.addr,e),qt(t,e)}}function ox(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;i.uniform4uiv(this.addr,e),qt(t,e)}}function lx(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2D(e||af,r)}function cx(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||lf,r)}function ux(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||cf,r)}function hx(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||of,r)}function dx(i){switch(i){case 5126:return q0;case 35664:return Y0;case 35665:return Z0;case 35666:return K0;case 35674:return $0;case 35675:return J0;case 35676:return Q0;case 5124:case 35670:return ex;case 35667:case 35671:return tx;case 35668:case 35672:return nx;case 35669:case 35673:return ix;case 5125:return rx;case 36294:return sx;case 36295:return ax;case 36296:return ox;case 35678:case 36198:case 36298:case 36306:case 35682:return lx;case 35679:case 36299:case 36307:return cx;case 35680:case 36300:case 36308:case 36293:return ux;case 36289:case 36303:case 36311:case 36292:return hx}}function fx(i,e){i.uniform1fv(this.addr,e)}function px(i,e){const t=ks(e,this.size,2);i.uniform2fv(this.addr,t)}function mx(i,e){const t=ks(e,this.size,3);i.uniform3fv(this.addr,t)}function gx(i,e){const t=ks(e,this.size,4);i.uniform4fv(this.addr,t)}function vx(i,e){const t=ks(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function xx(i,e){const t=ks(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function _x(i,e){const t=ks(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function yx(i,e){i.uniform1iv(this.addr,e)}function wx(i,e){i.uniform2iv(this.addr,e)}function Mx(i,e){i.uniform3iv(this.addr,e)}function Sx(i,e){i.uniform4iv(this.addr,e)}function bx(i,e){i.uniform1uiv(this.addr,e)}function Tx(i,e){i.uniform2uiv(this.addr,e)}function Ex(i,e){i.uniform3uiv(this.addr,e)}function Ax(i,e){i.uniform4uiv(this.addr,e)}function Px(i,e,t){const n=this.cache,r=e.length,s=Fo(t,r);Xt(n,s)||(i.uniform1iv(this.addr,s),qt(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||af,s[a])}function Cx(i,e,t){const n=this.cache,r=e.length,s=Fo(t,r);Xt(n,s)||(i.uniform1iv(this.addr,s),qt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||lf,s[a])}function Rx(i,e,t){const n=this.cache,r=e.length,s=Fo(t,r);Xt(n,s)||(i.uniform1iv(this.addr,s),qt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||cf,s[a])}function Dx(i,e,t){const n=this.cache,r=e.length,s=Fo(t,r);Xt(n,s)||(i.uniform1iv(this.addr,s),qt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||of,s[a])}function Lx(i){switch(i){case 5126:return fx;case 35664:return px;case 35665:return mx;case 35666:return gx;case 35674:return vx;case 35675:return xx;case 35676:return _x;case 5124:case 35670:return yx;case 35667:case 35671:return wx;case 35668:case 35672:return Mx;case 35669:case 35673:return Sx;case 5125:return bx;case 36294:return Tx;case 36295:return Ex;case 36296:return Ax;case 35678:case 36198:case 36298:case 36306:case 35682:return Px;case 35679:case 36299:case 36307:return Cx;case 35680:case 36300:case 36308:case 36293:return Rx;case 36289:case 36303:case 36311:case 36292:return Dx}}class Ix{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=dx(t.type)}}class Ux{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=Lx(t.type)}}class Nx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Sl=/(\w+)(\])?(\[|\.)?/g;function nh(i,e){i.seq.push(e),i.map[e.id]=e}function Ox(i,e,t){const n=i.name,r=n.length;for(Sl.lastIndex=0;;){const s=Sl.exec(n),a=Sl.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){nh(t,c===void 0?new Ix(o,i,e):new Ux(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new Nx(o),nh(t,h)),t=h}}}class yo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,35718);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Ox(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function ih(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}let Fx=0;function Bx(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function zx(i){switch(i){case vn:return["Linear","( value )"];case ke:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",i),["Linear","( value )"]}}function rh(i,e,t){const n=i.getShaderParameter(e,35713),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Bx(i.getShaderSource(e),a)}else return r}function kx(i,e){const t=zx(e);return"vec4 "+i+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function Hx(i,e){let t;switch(e){case Wp:t="Linear";break;case jp:t="Reinhard";break;case Xp:t="OptimizedCineon";break;case fr:t="ACESFilmic";break;case qp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Gx(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(na).join(`
`)}function Vx(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Wx(i,e){const t={},n=i.getProgramParameter(e,35721);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===35674&&(o=2),s.type===35675&&(o=3),s.type===35676&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function na(i){return i!==""}function sh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ah(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const jx=/^[ \t]*#include +<([\w\d./]+)>/gm;function ic(i){return i.replace(jx,Xx)}function Xx(i,e){const t=Ve[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return ic(t)}const qx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function oh(i){return i.replace(qx,Yx)}function Yx(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function lh(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Zx(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Od?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Cp?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ti&&(e="SHADOWMAP_TYPE_VSM"),e}function Kx(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ls:case Is:e="ENVMAP_TYPE_CUBE";break;case Lo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function $x(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Is:e="ENVMAP_MODE_REFRACTION";break}return e}function Jx(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Vd:e="ENVMAP_BLENDING_MULTIPLY";break;case Gp:e="ENVMAP_BLENDING_MIX";break;case Vp:e="ENVMAP_BLENDING_ADD";break}return e}function Qx(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function e_(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Zx(t),c=Kx(t),u=$x(t),h=Jx(t),d=Qx(t),p=t.isWebGL2?"":Gx(t),v=Vx(s),x=r.createProgram();let m,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=[v].filter(na).join(`
`),m.length>0&&(m+=`
`),f=[p,v].filter(na).join(`
`),f.length>0&&(f+=`
`)):(m=[lh(t),"#define SHADER_NAME "+t.shaderName,v,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs2?"#define USE_UV2":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(na).join(`
`),f=[p,lh(t),"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs2?"#define USE_UV2":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==zn?"#define TONE_MAPPING":"",t.toneMapping!==zn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==zn?Hx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.encodings_pars_fragment,kx("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(na).join(`
`)),a=ic(a),a=sh(a,t),a=ah(a,t),o=ic(o),o=sh(o,t),o=ah(o,t),a=oh(a),o=oh(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===hr?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hr?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const _=M+m+a,y=M+f+o,S=ih(r,35633,_),E=ih(r,35632,y);if(r.attachShader(x,S),r.attachShader(x,E),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x),i.debug.checkShaderErrors){const w=r.getProgramInfoLog(x).trim(),T=r.getShaderInfoLog(S).trim(),N=r.getShaderInfoLog(E).trim();let F=!0,U=!0;if(r.getProgramParameter(x,35714)===!1)if(F=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,S,E);else{const z=rh(r,S,"vertex"),k=rh(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,35715)+`

Program Info Log: `+w+`
`+z+`
`+k)}else w!==""?console.warn("THREE.WebGLProgram: Program Info Log:",w):(T===""||N==="")&&(U=!1);U&&(this.diagnostics={runnable:F,programLog:w,vertexShader:{log:T,prefix:m},fragmentShader:{log:N,prefix:f}})}r.deleteShader(S),r.deleteShader(E);let R;this.getUniforms=function(){return R===void 0&&(R=new yo(r,x)),R};let P;return this.getAttributes=function(){return P===void 0&&(P=Wx(r,x)),P},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.name=t.shaderName,this.id=Fx++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=S,this.fragmentShader=E,this}let t_=0;class n_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new i_(e),t.set(e,n)),n}}class i_{constructor(e){this.id=t_++,this.code=e,this.usedTimes=0}}function r_(i,e,t,n,r,s,a){const o=new Ic,l=new n_,c=[],u=r.isWebGL2,h=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(w){return w===1?"uv2":"uv"}function m(w,T,N,F,U){const z=F.fog,k=U.geometry,ee=w.isMeshStandardMaterial?F.environment:null,$=(w.isMeshStandardMaterial?t:e).get(w.envMap||ee),Y=$&&$.mapping===Lo?$.image.height:null,ne=v[w.type];w.precision!==null&&(p=r.getMaxPrecision(w.precision),p!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));const J=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,be=J!==void 0?J.length:0;let ae=0;k.morphAttributes.position!==void 0&&(ae=1),k.morphAttributes.normal!==void 0&&(ae=2),k.morphAttributes.color!==void 0&&(ae=3);let Z,re,pe,he;if(ne){const Ce=dn[ne];Z=Ce.vertexShader,re=Ce.fragmentShader}else Z=w.vertexShader,re=w.fragmentShader,l.update(w),pe=l.getVertexShaderID(w),he=l.getFragmentShaderID(w);const j=i.getRenderTarget(),Fe=U.isInstancedMesh===!0,ve=!!w.map,ue=!!w.matcap,He=!!$,Ke=!!w.aoMap,Be=!!w.lightMap,Xe=!!w.bumpMap,Mt=!!w.normalMap,St=!!w.displacementMap,It=!!w.emissiveMap,Ct=!!w.metalnessMap,tt=!!w.roughnessMap,ft=w.clearcoat>0,Yt=w.iridescence>0,I=w.sheen>0,A=w.transmission>0,ie=ft&&!!w.clearcoatMap,me=ft&&!!w.clearcoatNormalMap,xe=ft&&!!w.clearcoatRoughnessMap,Ae=Yt&&!!w.iridescenceMap,O=Yt&&!!w.iridescenceThicknessMap,le=I&&!!w.sheenColorMap,Q=I&&!!w.sheenRoughnessMap,Pe=!!w.specularMap,Ie=!!w.specularColorMap,Ne=!!w.specularIntensityMap,we=A&&!!w.transmissionMap,ze=A&&!!w.thicknessMap,We=!!w.gradientMap,je=!!w.alphaMap,Ze=w.alphaTest>0,G=!!w.extensions,H=!!k.attributes.uv2;return{isWebGL2:u,shaderID:ne,shaderName:w.type,vertexShader:Z,fragmentShader:re,defines:w.defines,customVertexShaderID:pe,customFragmentShaderID:he,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,instancing:Fe,instancingColor:Fe&&U.instanceColor!==null,supportsVertexTextures:d,outputEncoding:j===null?i.outputEncoding:j.isXRRenderTarget===!0?j.texture.encoding:vn,map:ve,matcap:ue,envMap:He,envMapMode:He&&$.mapping,envMapCubeUVHeight:Y,aoMap:Ke,lightMap:Be,bumpMap:Xe,normalMap:Mt,displacementMap:d&&St,emissiveMap:It,normalMapObjectSpace:Mt&&w.normalMapType===um,normalMapTangentSpace:Mt&&w.normalMapType===Uo,decodeVideoTexture:ve&&w.map.isVideoTexture===!0&&w.map.encoding===ke,metalnessMap:Ct,roughnessMap:tt,clearcoat:ft,clearcoatMap:ie,clearcoatNormalMap:me,clearcoatRoughnessMap:xe,iridescence:Yt,iridescenceMap:Ae,iridescenceThicknessMap:O,sheen:I,sheenColorMap:le,sheenRoughnessMap:Q,specularMap:Pe,specularColorMap:Ie,specularIntensityMap:Ne,transmission:A,transmissionMap:we,thicknessMap:ze,gradientMap:We,opaque:w.transparent===!1&&w.blending===Cs,alphaMap:je,alphaTest:Ze,combine:w.combine,mapUv:ve&&x(w.map.channel),aoMapUv:Ke&&x(w.aoMap.channel),lightMapUv:Be&&x(w.lightMap.channel),bumpMapUv:Xe&&x(w.bumpMap.channel),normalMapUv:Mt&&x(w.normalMap.channel),displacementMapUv:St&&x(w.displacementMap.channel),emissiveMapUv:It&&x(w.emissiveMap.channel),metalnessMapUv:Ct&&x(w.metalnessMap.channel),roughnessMapUv:tt&&x(w.roughnessMap.channel),clearcoatMapUv:ie&&x(w.clearcoatMap.channel),clearcoatNormalMapUv:me&&x(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&x(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&x(w.iridescenceMap.channel),iridescenceThicknessMapUv:O&&x(w.iridescenceThicknessMap.channel),sheenColorMapUv:le&&x(w.sheenColorMap.channel),sheenRoughnessMapUv:Q&&x(w.sheenRoughnessMap.channel),specularMapUv:Pe&&x(w.specularMap.channel),specularColorMapUv:Ie&&x(w.specularColorMap.channel),specularIntensityMapUv:Ne&&x(w.specularIntensityMap.channel),transmissionMapUv:we&&x(w.transmissionMap.channel),thicknessMapUv:ze&&x(w.thicknessMap.channel),alphaMapUv:je&&x(w.alphaMap.channel),vertexTangents:Mt&&!!k.attributes.tangent,vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUvs2:H,pointsUvs:U.isPoints===!0&&!!k.attributes.uv&&(ve||je),fog:!!z,useFog:w.fog===!0,fogExp2:z&&z.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:U.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:ae,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:w.toneMapped?i.toneMapping:zn,useLegacyLights:i.useLegacyLights,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===fn,flipSided:w.side===Ot,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionDerivatives:G&&w.extensions.derivatives===!0,extensionFragDepth:G&&w.extensions.fragDepth===!0,extensionDrawBuffers:G&&w.extensions.drawBuffers===!0,extensionShaderTextureLOD:G&&w.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),customProgramCacheKey:w.customProgramCacheKey()}}function f(w){const T=[];if(w.shaderID?T.push(w.shaderID):(T.push(w.customVertexShaderID),T.push(w.customFragmentShaderID)),w.defines!==void 0)for(const N in w.defines)T.push(N),T.push(w.defines[N]);return w.isRawShaderMaterial===!1&&(M(T,w),_(T,w),T.push(i.outputEncoding)),T.push(w.customProgramCacheKey),T.join()}function M(w,T){w.push(T.precision),w.push(T.outputEncoding),w.push(T.envMapMode),w.push(T.envMapCubeUVHeight),w.push(T.mapUv),w.push(T.alphaMapUv),w.push(T.lightMapUv),w.push(T.aoMapUv),w.push(T.bumpMapUv),w.push(T.normalMapUv),w.push(T.displacementMapUv),w.push(T.emissiveMapUv),w.push(T.metalnessMapUv),w.push(T.roughnessMapUv),w.push(T.clearcoatMapUv),w.push(T.clearcoatNormalMapUv),w.push(T.clearcoatRoughnessMapUv),w.push(T.iridescenceMapUv),w.push(T.iridescenceThicknessMapUv),w.push(T.sheenColorMapUv),w.push(T.sheenRoughnessMapUv),w.push(T.specularMapUv),w.push(T.specularColorMapUv),w.push(T.specularIntensityMapUv),w.push(T.transmissionMapUv),w.push(T.thicknessMapUv),w.push(T.combine),w.push(T.fogExp2),w.push(T.sizeAttenuation),w.push(T.morphTargetsCount),w.push(T.morphAttributeCount),w.push(T.numDirLights),w.push(T.numPointLights),w.push(T.numSpotLights),w.push(T.numSpotLightMaps),w.push(T.numHemiLights),w.push(T.numRectAreaLights),w.push(T.numDirLightShadows),w.push(T.numPointLightShadows),w.push(T.numSpotLightShadows),w.push(T.numSpotLightShadowsWithMaps),w.push(T.shadowMapType),w.push(T.toneMapping),w.push(T.numClippingPlanes),w.push(T.numClipIntersection),w.push(T.depthPacking)}function _(w,T){o.disableAll(),T.isWebGL2&&o.enable(0),T.supportsVertexTextures&&o.enable(1),T.instancing&&o.enable(2),T.instancingColor&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUvs2&&o.enable(13),T.vertexTangents&&o.enable(14),w.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.skinning&&o.enable(4),T.morphTargets&&o.enable(5),T.morphNormals&&o.enable(6),T.morphColors&&o.enable(7),T.premultipliedAlpha&&o.enable(8),T.shadowMapEnabled&&o.enable(9),T.useLegacyLights&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.decodeVideoTexture&&o.enable(17),T.opaque&&o.enable(18),T.pointsUvs&&o.enable(19),w.push(o.mask)}function y(w){const T=v[w.type];let N;if(T){const F=dn[T];N=Wr.clone(F.uniforms)}else N=w.uniforms;return N}function S(w,T){let N;for(let F=0,U=c.length;F<U;F++){const z=c[F];if(z.cacheKey===T){N=z,++N.usedTimes;break}}return N===void 0&&(N=new e_(i,T,w,s),c.push(N)),N}function E(w){if(--w.usedTimes===0){const T=c.indexOf(w);c[T]=c[c.length-1],c.pop(),w.destroy()}}function R(w){l.remove(w)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:S,releaseProgram:E,releaseShaderCache:R,programs:c,dispose:P}}function s_(){let i=new WeakMap;function e(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function t(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function a_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ch(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function uh(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h,d,p,v,x,m){let f=i[e];return f===void 0?(f={id:h.id,object:h,geometry:d,material:p,groupOrder:v,renderOrder:h.renderOrder,z:x,group:m},i[e]=f):(f.id=h.id,f.object=h,f.geometry=d,f.material=p,f.groupOrder=v,f.renderOrder=h.renderOrder,f.z=x,f.group=m),e++,f}function o(h,d,p,v,x,m){const f=a(h,d,p,v,x,m);p.transmission>0?n.push(f):p.transparent===!0?r.push(f):t.push(f)}function l(h,d,p,v,x,m){const f=a(h,d,p,v,x,m);p.transmission>0?n.unshift(f):p.transparent===!0?r.unshift(f):t.unshift(f)}function c(h,d){t.length>1&&t.sort(h||a_),n.length>1&&n.sort(d||ch),r.length>1&&r.sort(d||ch)}function u(){for(let h=e,d=i.length;h<d;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function o_(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new uh,i.set(n,[a])):r>=s.length?(a=new uh,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function l_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Re};break;case"SpotLight":t={position:new L,direction:new L,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Re,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":t={color:new Re,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function c_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let u_=0;function h_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function d_(i,e){const t=new l_,n=c_(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let u=0;u<9;u++)r.probe.push(new L);const s=new L,a=new Le,o=new Le;function l(u,h){let d=0,p=0,v=0;for(let N=0;N<9;N++)r.probe[N].set(0,0,0);let x=0,m=0,f=0,M=0,_=0,y=0,S=0,E=0,R=0,P=0;u.sort(h_);const w=h===!0?Math.PI:1;for(let N=0,F=u.length;N<F;N++){const U=u[N],z=U.color,k=U.intensity,ee=U.distance,$=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)d+=z.r*k*w,p+=z.g*k*w,v+=z.b*k*w;else if(U.isLightProbe)for(let Y=0;Y<9;Y++)r.probe[Y].addScaledVector(U.sh.coefficients[Y],k);else if(U.isDirectionalLight){const Y=t.get(U);if(Y.color.copy(U.color).multiplyScalar(U.intensity*w),U.castShadow){const ne=U.shadow,J=n.get(U);J.shadowBias=ne.bias,J.shadowNormalBias=ne.normalBias,J.shadowRadius=ne.radius,J.shadowMapSize=ne.mapSize,r.directionalShadow[x]=J,r.directionalShadowMap[x]=$,r.directionalShadowMatrix[x]=U.shadow.matrix,y++}r.directional[x]=Y,x++}else if(U.isSpotLight){const Y=t.get(U);Y.position.setFromMatrixPosition(U.matrixWorld),Y.color.copy(z).multiplyScalar(k*w),Y.distance=ee,Y.coneCos=Math.cos(U.angle),Y.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),Y.decay=U.decay,r.spot[f]=Y;const ne=U.shadow;if(U.map&&(r.spotLightMap[R]=U.map,R++,ne.updateMatrices(U),U.castShadow&&P++),r.spotLightMatrix[f]=ne.matrix,U.castShadow){const J=n.get(U);J.shadowBias=ne.bias,J.shadowNormalBias=ne.normalBias,J.shadowRadius=ne.radius,J.shadowMapSize=ne.mapSize,r.spotShadow[f]=J,r.spotShadowMap[f]=$,E++}f++}else if(U.isRectAreaLight){const Y=t.get(U);Y.color.copy(z).multiplyScalar(k),Y.halfWidth.set(U.width*.5,0,0),Y.halfHeight.set(0,U.height*.5,0),r.rectArea[M]=Y,M++}else if(U.isPointLight){const Y=t.get(U);if(Y.color.copy(U.color).multiplyScalar(U.intensity*w),Y.distance=U.distance,Y.decay=U.decay,U.castShadow){const ne=U.shadow,J=n.get(U);J.shadowBias=ne.bias,J.shadowNormalBias=ne.normalBias,J.shadowRadius=ne.radius,J.shadowMapSize=ne.mapSize,J.shadowCameraNear=ne.camera.near,J.shadowCameraFar=ne.camera.far,r.pointShadow[m]=J,r.pointShadowMap[m]=$,r.pointShadowMatrix[m]=U.shadow.matrix,S++}r.point[m]=Y,m++}else if(U.isHemisphereLight){const Y=t.get(U);Y.skyColor.copy(U.color).multiplyScalar(k*w),Y.groundColor.copy(U.groundColor).multiplyScalar(k*w),r.hemi[_]=Y,_++}}M>0&&(e.isWebGL2||i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ee.LTC_FLOAT_1,r.rectAreaLTC2=Ee.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=Ee.LTC_HALF_1,r.rectAreaLTC2=Ee.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=p,r.ambient[2]=v;const T=r.hash;(T.directionalLength!==x||T.pointLength!==m||T.spotLength!==f||T.rectAreaLength!==M||T.hemiLength!==_||T.numDirectionalShadows!==y||T.numPointShadows!==S||T.numSpotShadows!==E||T.numSpotMaps!==R)&&(r.directional.length=x,r.spot.length=f,r.rectArea.length=M,r.point.length=m,r.hemi.length=_,r.directionalShadow.length=y,r.directionalShadowMap.length=y,r.pointShadow.length=S,r.pointShadowMap.length=S,r.spotShadow.length=E,r.spotShadowMap.length=E,r.directionalShadowMatrix.length=y,r.pointShadowMatrix.length=S,r.spotLightMatrix.length=E+R-P,r.spotLightMap.length=R,r.numSpotLightShadowsWithMaps=P,T.directionalLength=x,T.pointLength=m,T.spotLength=f,T.rectAreaLength=M,T.hemiLength=_,T.numDirectionalShadows=y,T.numPointShadows=S,T.numSpotShadows=E,T.numSpotMaps=R,r.version=u_++)}function c(u,h){let d=0,p=0,v=0,x=0,m=0;const f=h.matrixWorldInverse;for(let M=0,_=u.length;M<_;M++){const y=u[M];if(y.isDirectionalLight){const S=r.directional[d];S.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(f),d++}else if(y.isSpotLight){const S=r.spot[v];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(f),S.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(f),v++}else if(y.isRectAreaLight){const S=r.rectArea[x];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(f),o.identity(),a.copy(y.matrixWorld),a.premultiply(f),o.extractRotation(a),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),x++}else if(y.isPointLight){const S=r.point[p];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(f),p++}else if(y.isHemisphereLight){const S=r.hemi[m];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(f),m++}}}return{setup:l,setupView:c,state:r}}function hh(i,e){const t=new d_(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function a(h){n.push(h)}function o(h){r.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function f_(i,e){let t=new WeakMap;function n(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new hh(i,e),t.set(s,[l])):a>=o.length?(l=new hh(i,e),o.push(l)):l=o[a],l}function r(){t=new WeakMap}return{get:n,dispose:r}}class Nc extends En{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ur,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class p_ extends En{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const m_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g_=`uniform sampler2D shadow_pass;
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
}`;function v_(i,e,t){let n=new Oo;const r=new ye,s=new ye,a=new ot,o=new Nc({depthPacking:Io}),l=new p_,c={},u=t.maxTextureSize,h={[ri]:Ot,[Ot]:ri,[fn]:fn},d=new At({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:m_,fragmentShader:g_}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const v=new Ft;v.setAttribute("position",new Lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new _e(v,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Od,this.render=function(y,S,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const R=i.getRenderTarget(),P=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),T=i.state;T.setBlending(Ht),T.buffers.color.setClear(1,1,1,1),T.buffers.depth.setTest(!0),T.setScissorTest(!1);for(let N=0,F=y.length;N<F;N++){const U=y[N],z=U.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",U,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);const k=z.getFrameExtents();if(r.multiply(k),s.copy(z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/k.x),r.x=s.x*k.x,z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/k.y),r.y=s.y*k.y,z.mapSize.y=s.y)),z.map===null){const $=this.type!==ti?{minFilter:et,magFilter:et}:{};z.map=new ct(r.x,r.y,$),z.map.texture.name=U.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();const ee=z.getViewportCount();for(let $=0;$<ee;$++){const Y=z.getViewport($);a.set(s.x*Y.x,s.y*Y.y,s.x*Y.z,s.y*Y.w),T.viewport(a),z.updateMatrices(U,$),n=z.getFrustum(),_(S,E,z.camera,U,this.type)}z.isPointLightShadow!==!0&&this.type===ti&&f(z,E),z.needsUpdate=!1}m.needsUpdate=!1,i.setRenderTarget(R,P,w)};function f(y,S){const E=e.update(x);d.defines.VSM_SAMPLES!==y.blurSamples&&(d.defines.VSM_SAMPLES=y.blurSamples,p.defines.VSM_SAMPLES=y.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new ct(r.x,r.y)),d.uniforms.shadow_pass.value=y.map.texture,d.uniforms.resolution.value=y.mapSize,d.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(S,null,E,d,x,null),p.uniforms.shadow_pass.value=y.mapPass.texture,p.uniforms.resolution.value=y.mapSize,p.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(S,null,E,p,x,null)}function M(y,S,E,R){let P=null;const w=E.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(w!==void 0)P=w;else if(P=E.isPointLight===!0?l:o,i.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){const T=P.uuid,N=S.uuid;let F=c[T];F===void 0&&(F={},c[T]=F);let U=F[N];U===void 0&&(U=P.clone(),F[N]=U),P=U}if(P.visible=S.visible,P.wireframe=S.wireframe,R===ti?P.side=S.shadowSide!==null?S.shadowSide:S.side:P.side=S.shadowSide!==null?S.shadowSide:h[S.side],P.alphaMap=S.alphaMap,P.alphaTest=S.alphaTest,P.map=S.map,P.clipShadows=S.clipShadows,P.clippingPlanes=S.clippingPlanes,P.clipIntersection=S.clipIntersection,P.displacementMap=S.displacementMap,P.displacementScale=S.displacementScale,P.displacementBias=S.displacementBias,P.wireframeLinewidth=S.wireframeLinewidth,P.linewidth=S.linewidth,E.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const T=i.properties.get(P);T.light=E}return P}function _(y,S,E,R,P){if(y.visible===!1)return;if(y.layers.test(S.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&P===ti)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,y.matrixWorld);const N=e.update(y),F=y.material;if(Array.isArray(F)){const U=N.groups;for(let z=0,k=U.length;z<k;z++){const ee=U[z],$=F[ee.materialIndex];if($&&$.visible){const Y=M(y,$,R,P);i.renderBufferDirect(E,null,N,Y,y,ee)}}}else if(F.visible){const U=M(y,F,R,P);i.renderBufferDirect(E,null,N,U,y,null)}}const T=y.children;for(let N=0,F=T.length;N<F;N++)_(T[N],S,E,R,P)}}function x_(i,e,t){const n=t.isWebGL2;function r(){let G=!1;const H=new ot;let fe=null;const Ce=new ot(0,0,0,0);return{setMask:function(Ge){fe!==Ge&&!G&&(i.colorMask(Ge,Ge,Ge,Ge),fe=Ge)},setLocked:function(Ge){G=Ge},setClear:function(Ge,mt,bt,Zt,si){si===!0&&(Ge*=Zt,mt*=Zt,bt*=Zt),H.set(Ge,mt,bt,Zt),Ce.equals(H)===!1&&(i.clearColor(Ge,mt,bt,Zt),Ce.copy(H))},reset:function(){G=!1,fe=null,Ce.set(-1,0,0,0)}}}function s(){let G=!1,H=null,fe=null,Ce=null;return{setTest:function(Ge){Ge?j(2929):Fe(2929)},setMask:function(Ge){H!==Ge&&!G&&(i.depthMask(Ge),H=Ge)},setFunc:function(Ge){if(fe!==Ge){switch(Ge){case zd:i.depthFunc(512);break;case kd:i.depthFunc(519);break;case Zl:i.depthFunc(513);break;case Mo:i.depthFunc(515);break;case So:i.depthFunc(514);break;case Hd:i.depthFunc(518);break;case Gd:i.depthFunc(516);break;case Rc:i.depthFunc(517);break;default:i.depthFunc(515)}fe=Ge}},setLocked:function(Ge){G=Ge},setClear:function(Ge){Ce!==Ge&&(i.clearDepth(Ge),Ce=Ge)},reset:function(){G=!1,H=null,fe=null,Ce=null}}}function a(){let G=!1,H=null,fe=null,Ce=null,Ge=null,mt=null,bt=null,Zt=null,si=null;return{setTest:function(Rt){G||(Rt?j(2960):Fe(2960))},setMask:function(Rt){H!==Rt&&!G&&(i.stencilMask(Rt),H=Rt)},setFunc:function(Rt,wn,Ln){(fe!==Rt||Ce!==wn||Ge!==Ln)&&(i.stencilFunc(Rt,wn,Ln),fe=Rt,Ce=wn,Ge=Ln)},setOp:function(Rt,wn,Ln){(mt!==Rt||bt!==wn||Zt!==Ln)&&(i.stencilOp(Rt,wn,Ln),mt=Rt,bt=wn,Zt=Ln)},setLocked:function(Rt){G=Rt},setClear:function(Rt){si!==Rt&&(i.clearStencil(Rt),si=Rt)},reset:function(){G=!1,H=null,fe=null,Ce=null,Ge=null,mt=null,bt=null,Zt=null,si=null}}}const o=new r,l=new s,c=new a,u=new WeakMap,h=new WeakMap;let d={},p={},v=new WeakMap,x=[],m=null,f=!1,M=null,_=null,y=null,S=null,E=null,R=null,P=null,w=!1,T=null,N=null,F=null,U=null,z=null;const k=i.getParameter(35661);let ee=!1,$=0;const Y=i.getParameter(7938);Y.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(Y)[1]),ee=$>=1):Y.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),ee=$>=2);let ne=null,J={};const be=i.getParameter(3088),ae=i.getParameter(2978),Z=new ot().fromArray(be),re=new ot().fromArray(ae);function pe(G,H,fe){const Ce=new Uint8Array(4),Ge=i.createTexture();i.bindTexture(G,Ge),i.texParameteri(G,10241,9728),i.texParameteri(G,10240,9728);for(let mt=0;mt<fe;mt++)i.texImage2D(H+mt,0,6408,1,1,0,6408,5121,Ce);return Ge}const he={};he[3553]=pe(3553,3553,1),he[34067]=pe(34067,34069,6),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),j(2929),l.setFunc(Mo),St(!1),It(Jc),j(2884),Xe(Ht);function j(G){d[G]!==!0&&(i.enable(G),d[G]=!0)}function Fe(G){d[G]!==!1&&(i.disable(G),d[G]=!1)}function ve(G,H){return p[G]!==H?(i.bindFramebuffer(G,H),p[G]=H,n&&(G===36009&&(p[36160]=H),G===36160&&(p[36009]=H)),!0):!1}function ue(G,H){let fe=x,Ce=!1;if(G)if(fe=v.get(H),fe===void 0&&(fe=[],v.set(H,fe)),G.isWebGLMultipleRenderTargets){const Ge=G.texture;if(fe.length!==Ge.length||fe[0]!==36064){for(let mt=0,bt=Ge.length;mt<bt;mt++)fe[mt]=36064+mt;fe.length=Ge.length,Ce=!0}}else fe[0]!==36064&&(fe[0]=36064,Ce=!0);else fe[0]!==1029&&(fe[0]=1029,Ce=!0);Ce&&(t.isWebGL2?i.drawBuffers(fe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(fe))}function He(G){return m!==G?(i.useProgram(G),m=G,!0):!1}const Ke={[Ss]:32774,[Dp]:32778,[Lp]:32779};if(n)Ke[nu]=32775,Ke[iu]=32776;else{const G=e.get("EXT_blend_minmax");G!==null&&(Ke[nu]=G.MIN_EXT,Ke[iu]=G.MAX_EXT)}const Be={[Ip]:0,[Up]:1,[Np]:768,[Fd]:770,[Hp]:776,[zp]:774,[Fp]:772,[Op]:769,[Bd]:771,[kp]:775,[Bp]:773};function Xe(G,H,fe,Ce,Ge,mt,bt,Zt){if(G===Ht){f===!0&&(Fe(3042),f=!1);return}if(f===!1&&(j(3042),f=!0),G!==Rp){if(G!==M||Zt!==w){if((_!==Ss||E!==Ss)&&(i.blendEquation(32774),_=Ss,E=Ss),Zt)switch(G){case Cs:i.blendFuncSeparate(1,771,1,771);break;case Qc:i.blendFunc(1,1);break;case eu:i.blendFuncSeparate(0,769,0,1);break;case tu:i.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case Cs:i.blendFuncSeparate(770,771,1,771);break;case Qc:i.blendFunc(770,1);break;case eu:i.blendFuncSeparate(0,769,0,1);break;case tu:i.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}y=null,S=null,R=null,P=null,M=G,w=Zt}return}Ge=Ge||H,mt=mt||fe,bt=bt||Ce,(H!==_||Ge!==E)&&(i.blendEquationSeparate(Ke[H],Ke[Ge]),_=H,E=Ge),(fe!==y||Ce!==S||mt!==R||bt!==P)&&(i.blendFuncSeparate(Be[fe],Be[Ce],Be[mt],Be[bt]),y=fe,S=Ce,R=mt,P=bt),M=G,w=!1}function Mt(G,H){G.side===fn?Fe(2884):j(2884);let fe=G.side===Ot;H&&(fe=!fe),St(fe),G.blending===Cs&&G.transparent===!1?Xe(Ht):Xe(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.premultipliedAlpha),l.setFunc(G.depthFunc),l.setTest(G.depthTest),l.setMask(G.depthWrite),o.setMask(G.colorWrite);const Ce=G.stencilWrite;c.setTest(Ce),Ce&&(c.setMask(G.stencilWriteMask),c.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),c.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),tt(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?j(32926):Fe(32926)}function St(G){T!==G&&(G?i.frontFace(2304):i.frontFace(2305),T=G)}function It(G){G!==Ap?(j(2884),G!==N&&(G===Jc?i.cullFace(1029):G===Pp?i.cullFace(1028):i.cullFace(1032))):Fe(2884),N=G}function Ct(G){G!==F&&(ee&&i.lineWidth(G),F=G)}function tt(G,H,fe){G?(j(32823),(U!==H||z!==fe)&&(i.polygonOffset(H,fe),U=H,z=fe)):Fe(32823)}function ft(G){G?j(3089):Fe(3089)}function Yt(G){G===void 0&&(G=33984+k-1),ne!==G&&(i.activeTexture(G),ne=G)}function I(G,H,fe){fe===void 0&&(ne===null?fe=33984+k-1:fe=ne);let Ce=J[fe];Ce===void 0&&(Ce={type:void 0,texture:void 0},J[fe]=Ce),(Ce.type!==G||Ce.texture!==H)&&(ne!==fe&&(i.activeTexture(fe),ne=fe),i.bindTexture(G,H||he[G]),Ce.type=G,Ce.texture=H)}function A(){const G=J[ne];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function ie(){try{i.compressedTexImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function me(){try{i.compressedTexImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function xe(){try{i.texSubImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ae(){try{i.texSubImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function O(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function le(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Q(){try{i.texStorage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Pe(){try{i.texStorage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ie(){try{i.texImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ne(){try{i.texImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function we(G){Z.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),Z.copy(G))}function ze(G){re.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),re.copy(G))}function We(G,H){let fe=h.get(H);fe===void 0&&(fe=new WeakMap,h.set(H,fe));let Ce=fe.get(G);Ce===void 0&&(Ce=i.getUniformBlockIndex(H,G.name),fe.set(G,Ce))}function je(G,H){const Ce=h.get(H).get(G);u.get(H)!==Ce&&(i.uniformBlockBinding(H,Ce,G.__bindingPointIndex),u.set(H,Ce))}function Ze(){i.disable(3042),i.disable(2884),i.disable(2929),i.disable(32823),i.disable(3089),i.disable(2960),i.disable(32926),i.blendEquation(32774),i.blendFunc(1,0),i.blendFuncSeparate(1,0,1,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(513),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(519,0,4294967295),i.stencilOp(7680,7680,7680),i.clearStencil(0),i.cullFace(1029),i.frontFace(2305),i.polygonOffset(0,0),i.activeTexture(33984),i.bindFramebuffer(36160,null),n===!0&&(i.bindFramebuffer(36009,null),i.bindFramebuffer(36008,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},ne=null,J={},p={},v=new WeakMap,x=[],m=null,f=!1,M=null,_=null,y=null,S=null,E=null,R=null,P=null,w=!1,T=null,N=null,F=null,U=null,z=null,Z.set(0,0,i.canvas.width,i.canvas.height),re.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:j,disable:Fe,bindFramebuffer:ve,drawBuffers:ue,useProgram:He,setBlending:Xe,setMaterial:Mt,setFlipSided:St,setCullFace:It,setLineWidth:Ct,setPolygonOffset:tt,setScissorTest:ft,activeTexture:Yt,bindTexture:I,unbindTexture:A,compressedTexImage2D:ie,compressedTexImage3D:me,texImage2D:Ie,texImage3D:Ne,updateUBOMapping:We,uniformBlockBinding:je,texStorage2D:Q,texStorage3D:Pe,texSubImage2D:xe,texSubImage3D:Ae,compressedTexSubImage2D:O,compressedTexSubImage3D:le,scissor:we,viewport:ze,reset:Ze}}function __(i,e,t,n,r,s,a){const o=r.isWebGL2,l=r.maxTextures,c=r.maxCubemapSize,u=r.maxTextureSize,h=r.maxSamples,d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),v=new WeakMap;let x;const m=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(I,A){return f?new OffscreenCanvas(I,A):va("canvas")}function _(I,A,ie,me){let xe=1;if((I.width>me||I.height>me)&&(xe=me/Math.max(I.width,I.height)),xe<1||A===!0)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap){const Ae=A?Zd:Math.floor,O=Ae(xe*I.width),le=Ae(xe*I.height);x===void 0&&(x=M(O,le));const Q=ie?M(O,le):x;return Q.width=O,Q.height=le,Q.getContext("2d").drawImage(I,0,0,O,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+I.width+"x"+I.height+") to ("+O+"x"+le+")."),Q}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+I.width+"x"+I.height+")."),I;return I}function y(I){return tc(I.width)&&tc(I.height)}function S(I){return o?!1:I.wrapS!==pn||I.wrapT!==pn||I.minFilter!==et&&I.minFilter!==Ue}function E(I,A){return I.generateMipmaps&&A&&I.minFilter!==et&&I.minFilter!==Ue}function R(I){i.generateMipmap(I)}function P(I,A,ie,me,xe=!1){if(o===!1)return A;if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Ae=A;return A===6403&&(ie===5126&&(Ae=33326),ie===5131&&(Ae=33325),ie===5121&&(Ae=33321)),A===33319&&(ie===5126&&(Ae=33328),ie===5131&&(Ae=33327),ie===5121&&(Ae=33323)),A===6408&&(ie===5126&&(Ae=34836),ie===5131&&(Ae=34842),ie===5121&&(Ae=me===ke&&xe===!1?35907:32856),ie===32819&&(Ae=32854),ie===32820&&(Ae=32855)),(Ae===33325||Ae===33326||Ae===33327||Ae===33328||Ae===34842||Ae===34836)&&e.get("EXT_color_buffer_float"),Ae}function w(I,A,ie){return E(I,ie)===!0||I.isFramebufferTexture&&I.minFilter!==et&&I.minFilter!==Ue?Math.log2(Math.max(A.width,A.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?A.mipmaps.length:1}function T(I){return I===et||I===$l||I===_o?9728:9729}function N(I){const A=I.target;A.removeEventListener("dispose",N),U(A),A.isVideoTexture&&v.delete(A)}function F(I){const A=I.target;A.removeEventListener("dispose",F),k(A)}function U(I){const A=n.get(I);if(A.__webglInit===void 0)return;const ie=I.source,me=m.get(ie);if(me){const xe=me[A.__cacheKey];xe.usedTimes--,xe.usedTimes===0&&z(I),Object.keys(me).length===0&&m.delete(ie)}n.remove(I)}function z(I){const A=n.get(I);i.deleteTexture(A.__webglTexture);const ie=I.source,me=m.get(ie);delete me[A.__cacheKey],a.memory.textures--}function k(I){const A=I.texture,ie=n.get(I),me=n.get(A);if(me.__webglTexture!==void 0&&(i.deleteTexture(me.__webglTexture),a.memory.textures--),I.depthTexture&&I.depthTexture.dispose(),I.isWebGLCubeRenderTarget)for(let xe=0;xe<6;xe++)i.deleteFramebuffer(ie.__webglFramebuffer[xe]),ie.__webglDepthbuffer&&i.deleteRenderbuffer(ie.__webglDepthbuffer[xe]);else{if(i.deleteFramebuffer(ie.__webglFramebuffer),ie.__webglDepthbuffer&&i.deleteRenderbuffer(ie.__webglDepthbuffer),ie.__webglMultisampledFramebuffer&&i.deleteFramebuffer(ie.__webglMultisampledFramebuffer),ie.__webglColorRenderbuffer)for(let xe=0;xe<ie.__webglColorRenderbuffer.length;xe++)ie.__webglColorRenderbuffer[xe]&&i.deleteRenderbuffer(ie.__webglColorRenderbuffer[xe]);ie.__webglDepthRenderbuffer&&i.deleteRenderbuffer(ie.__webglDepthRenderbuffer)}if(I.isWebGLMultipleRenderTargets)for(let xe=0,Ae=A.length;xe<Ae;xe++){const O=n.get(A[xe]);O.__webglTexture&&(i.deleteTexture(O.__webglTexture),a.memory.textures--),n.remove(A[xe])}n.remove(A),n.remove(I)}let ee=0;function $(){ee=0}function Y(){const I=ee;return I>=l&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+l),ee+=1,I}function ne(I){const A=[];return A.push(I.wrapS),A.push(I.wrapT),A.push(I.wrapR||0),A.push(I.magFilter),A.push(I.minFilter),A.push(I.anisotropy),A.push(I.internalFormat),A.push(I.format),A.push(I.type),A.push(I.generateMipmaps),A.push(I.premultiplyAlpha),A.push(I.flipY),A.push(I.unpackAlignment),A.push(I.encoding),A.join()}function J(I,A){const ie=n.get(I);if(I.isVideoTexture&&ft(I),I.isRenderTargetTexture===!1&&I.version>0&&ie.__version!==I.version){const me=I.image;if(me===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(me.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Fe(ie,I,A);return}}t.bindTexture(3553,ie.__webglTexture,33984+A)}function be(I,A){const ie=n.get(I);if(I.version>0&&ie.__version!==I.version){Fe(ie,I,A);return}t.bindTexture(35866,ie.__webglTexture,33984+A)}function ae(I,A){const ie=n.get(I);if(I.version>0&&ie.__version!==I.version){Fe(ie,I,A);return}t.bindTexture(32879,ie.__webglTexture,33984+A)}function Z(I,A){const ie=n.get(I);if(I.version>0&&ie.__version!==I.version){ve(ie,I,A);return}t.bindTexture(34067,ie.__webglTexture,33984+A)}const re={[mn]:10497,[pn]:33071,[bo]:33648},pe={[et]:9728,[$l]:9984,[_o]:9986,[Ue]:9729,[jd]:9985,[Gi]:9987};function he(I,A,ie){if(ie?(i.texParameteri(I,10242,re[A.wrapS]),i.texParameteri(I,10243,re[A.wrapT]),(I===32879||I===35866)&&i.texParameteri(I,32882,re[A.wrapR]),i.texParameteri(I,10240,pe[A.magFilter]),i.texParameteri(I,10241,pe[A.minFilter])):(i.texParameteri(I,10242,33071),i.texParameteri(I,10243,33071),(I===32879||I===35866)&&i.texParameteri(I,32882,33071),(A.wrapS!==pn||A.wrapT!==pn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(I,10240,T(A.magFilter)),i.texParameteri(I,10241,T(A.minFilter)),A.minFilter!==et&&A.minFilter!==Ue&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const me=e.get("EXT_texture_filter_anisotropic");if(A.magFilter===et||A.minFilter!==_o&&A.minFilter!==Gi||A.type===lt&&e.has("OES_texture_float_linear")===!1||o===!1&&A.type===_t&&e.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||n.get(A).__currentAnisotropy)&&(i.texParameterf(I,me.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,r.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy)}}function j(I,A){let ie=!1;I.__webglInit===void 0&&(I.__webglInit=!0,A.addEventListener("dispose",N));const me=A.source;let xe=m.get(me);xe===void 0&&(xe={},m.set(me,xe));const Ae=ne(A);if(Ae!==I.__cacheKey){xe[Ae]===void 0&&(xe[Ae]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,ie=!0),xe[Ae].usedTimes++;const O=xe[I.__cacheKey];O!==void 0&&(xe[I.__cacheKey].usedTimes--,O.usedTimes===0&&z(A)),I.__cacheKey=Ae,I.__webglTexture=xe[Ae].texture}return ie}function Fe(I,A,ie){let me=3553;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(me=35866),A.isData3DTexture&&(me=32879);const xe=j(I,A),Ae=A.source;t.bindTexture(me,I.__webglTexture,33984+ie);const O=n.get(Ae);if(Ae.version!==O.__version||xe===!0){t.activeTexture(33984+ie),i.pixelStorei(37440,A.flipY),i.pixelStorei(37441,A.premultiplyAlpha),i.pixelStorei(3317,A.unpackAlignment),i.pixelStorei(37443,0);const le=S(A)&&y(A.image)===!1;let Q=_(A.image,le,!1,u);Q=Yt(A,Q);const Pe=y(Q)||o,Ie=s.convert(A.format,A.encoding);let Ne=s.convert(A.type),we=P(A.internalFormat,Ie,Ne,A.encoding,A.isVideoTexture);he(me,A,Pe);let ze;const We=A.mipmaps,je=o&&A.isVideoTexture!==!0,Ze=O.__version===void 0||xe===!0,G=w(A,Q,Pe);if(A.isDepthTexture)we=6402,o?A.type===lt?we=36012:A.type===or?we=33190:A.type===Fr?we=35056:we=33189:A.type===lt&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===yi&&we===6402&&A.type!==Ta&&A.type!==or&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=or,Ne=s.convert(A.type)),A.format===Gr&&we===6402&&(we=34041,A.type!==Fr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=Fr,Ne=s.convert(A.type))),Ze&&(je?t.texStorage2D(3553,1,we,Q.width,Q.height):t.texImage2D(3553,0,we,Q.width,Q.height,0,Ie,Ne,null));else if(A.isDataTexture)if(We.length>0&&Pe){je&&Ze&&t.texStorage2D(3553,G,we,We[0].width,We[0].height);for(let H=0,fe=We.length;H<fe;H++)ze=We[H],je?t.texSubImage2D(3553,H,0,0,ze.width,ze.height,Ie,Ne,ze.data):t.texImage2D(3553,H,we,ze.width,ze.height,0,Ie,Ne,ze.data);A.generateMipmaps=!1}else je?(Ze&&t.texStorage2D(3553,G,we,Q.width,Q.height),t.texSubImage2D(3553,0,0,0,Q.width,Q.height,Ie,Ne,Q.data)):t.texImage2D(3553,0,we,Q.width,Q.height,0,Ie,Ne,Q.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){je&&Ze&&t.texStorage3D(35866,G,we,We[0].width,We[0].height,Q.depth);for(let H=0,fe=We.length;H<fe;H++)ze=We[H],A.format!==tn?Ie!==null?je?t.compressedTexSubImage3D(35866,H,0,0,0,ze.width,ze.height,Q.depth,Ie,ze.data,0,0):t.compressedTexImage3D(35866,H,we,ze.width,ze.height,Q.depth,0,ze.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?t.texSubImage3D(35866,H,0,0,0,ze.width,ze.height,Q.depth,Ie,Ne,ze.data):t.texImage3D(35866,H,we,ze.width,ze.height,Q.depth,0,Ie,Ne,ze.data)}else{je&&Ze&&t.texStorage2D(3553,G,we,We[0].width,We[0].height);for(let H=0,fe=We.length;H<fe;H++)ze=We[H],A.format!==tn?Ie!==null?je?t.compressedTexSubImage2D(3553,H,0,0,ze.width,ze.height,Ie,ze.data):t.compressedTexImage2D(3553,H,we,ze.width,ze.height,0,ze.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?t.texSubImage2D(3553,H,0,0,ze.width,ze.height,Ie,Ne,ze.data):t.texImage2D(3553,H,we,ze.width,ze.height,0,Ie,Ne,ze.data)}else if(A.isDataArrayTexture)je?(Ze&&t.texStorage3D(35866,G,we,Q.width,Q.height,Q.depth),t.texSubImage3D(35866,0,0,0,0,Q.width,Q.height,Q.depth,Ie,Ne,Q.data)):t.texImage3D(35866,0,we,Q.width,Q.height,Q.depth,0,Ie,Ne,Q.data);else if(A.isData3DTexture)je?(Ze&&t.texStorage3D(32879,G,we,Q.width,Q.height,Q.depth),t.texSubImage3D(32879,0,0,0,0,Q.width,Q.height,Q.depth,Ie,Ne,Q.data)):t.texImage3D(32879,0,we,Q.width,Q.height,Q.depth,0,Ie,Ne,Q.data);else if(A.isFramebufferTexture){if(Ze)if(je)t.texStorage2D(3553,G,we,Q.width,Q.height);else{let H=Q.width,fe=Q.height;for(let Ce=0;Ce<G;Ce++)t.texImage2D(3553,Ce,we,H,fe,0,Ie,Ne,null),H>>=1,fe>>=1}}else if(We.length>0&&Pe){je&&Ze&&t.texStorage2D(3553,G,we,We[0].width,We[0].height);for(let H=0,fe=We.length;H<fe;H++)ze=We[H],je?t.texSubImage2D(3553,H,0,0,Ie,Ne,ze):t.texImage2D(3553,H,we,Ie,Ne,ze);A.generateMipmaps=!1}else je?(Ze&&t.texStorage2D(3553,G,we,Q.width,Q.height),t.texSubImage2D(3553,0,0,0,Ie,Ne,Q)):t.texImage2D(3553,0,we,Ie,Ne,Q);E(A,Pe)&&R(me),O.__version=Ae.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function ve(I,A,ie){if(A.image.length!==6)return;const me=j(I,A),xe=A.source;t.bindTexture(34067,I.__webglTexture,33984+ie);const Ae=n.get(xe);if(xe.version!==Ae.__version||me===!0){t.activeTexture(33984+ie),i.pixelStorei(37440,A.flipY),i.pixelStorei(37441,A.premultiplyAlpha),i.pixelStorei(3317,A.unpackAlignment),i.pixelStorei(37443,0);const O=A.isCompressedTexture||A.image[0].isCompressedTexture,le=A.image[0]&&A.image[0].isDataTexture,Q=[];for(let H=0;H<6;H++)!O&&!le?Q[H]=_(A.image[H],!1,!0,c):Q[H]=le?A.image[H].image:A.image[H],Q[H]=Yt(A,Q[H]);const Pe=Q[0],Ie=y(Pe)||o,Ne=s.convert(A.format,A.encoding),we=s.convert(A.type),ze=P(A.internalFormat,Ne,we,A.encoding),We=o&&A.isVideoTexture!==!0,je=Ae.__version===void 0||me===!0;let Ze=w(A,Pe,Ie);he(34067,A,Ie);let G;if(O){We&&je&&t.texStorage2D(34067,Ze,ze,Pe.width,Pe.height);for(let H=0;H<6;H++){G=Q[H].mipmaps;for(let fe=0;fe<G.length;fe++){const Ce=G[fe];A.format!==tn?Ne!==null?We?t.compressedTexSubImage2D(34069+H,fe,0,0,Ce.width,Ce.height,Ne,Ce.data):t.compressedTexImage2D(34069+H,fe,ze,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?t.texSubImage2D(34069+H,fe,0,0,Ce.width,Ce.height,Ne,we,Ce.data):t.texImage2D(34069+H,fe,ze,Ce.width,Ce.height,0,Ne,we,Ce.data)}}}else{G=A.mipmaps,We&&je&&(G.length>0&&Ze++,t.texStorage2D(34067,Ze,ze,Q[0].width,Q[0].height));for(let H=0;H<6;H++)if(le){We?t.texSubImage2D(34069+H,0,0,0,Q[H].width,Q[H].height,Ne,we,Q[H].data):t.texImage2D(34069+H,0,ze,Q[H].width,Q[H].height,0,Ne,we,Q[H].data);for(let fe=0;fe<G.length;fe++){const Ge=G[fe].image[H].image;We?t.texSubImage2D(34069+H,fe+1,0,0,Ge.width,Ge.height,Ne,we,Ge.data):t.texImage2D(34069+H,fe+1,ze,Ge.width,Ge.height,0,Ne,we,Ge.data)}}else{We?t.texSubImage2D(34069+H,0,0,0,Ne,we,Q[H]):t.texImage2D(34069+H,0,ze,Ne,we,Q[H]);for(let fe=0;fe<G.length;fe++){const Ce=G[fe];We?t.texSubImage2D(34069+H,fe+1,0,0,Ne,we,Ce.image[H]):t.texImage2D(34069+H,fe+1,ze,Ne,we,Ce.image[H])}}}E(A,Ie)&&R(34067),Ae.__version=xe.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function ue(I,A,ie,me,xe){const Ae=s.convert(ie.format,ie.encoding),O=s.convert(ie.type),le=P(ie.internalFormat,Ae,O,ie.encoding);n.get(A).__hasExternalTextures||(xe===32879||xe===35866?t.texImage3D(xe,0,le,A.width,A.height,A.depth,0,Ae,O,null):t.texImage2D(xe,0,le,A.width,A.height,0,Ae,O,null)),t.bindFramebuffer(36160,I),tt(A)?d.framebufferTexture2DMultisampleEXT(36160,me,xe,n.get(ie).__webglTexture,0,Ct(A)):(xe===3553||xe>=34069&&xe<=34074)&&i.framebufferTexture2D(36160,me,xe,n.get(ie).__webglTexture,0),t.bindFramebuffer(36160,null)}function He(I,A,ie){if(i.bindRenderbuffer(36161,I),A.depthBuffer&&!A.stencilBuffer){let me=33189;if(ie||tt(A)){const xe=A.depthTexture;xe&&xe.isDepthTexture&&(xe.type===lt?me=36012:xe.type===or&&(me=33190));const Ae=Ct(A);tt(A)?d.renderbufferStorageMultisampleEXT(36161,Ae,me,A.width,A.height):i.renderbufferStorageMultisample(36161,Ae,me,A.width,A.height)}else i.renderbufferStorage(36161,me,A.width,A.height);i.framebufferRenderbuffer(36160,36096,36161,I)}else if(A.depthBuffer&&A.stencilBuffer){const me=Ct(A);ie&&tt(A)===!1?i.renderbufferStorageMultisample(36161,me,35056,A.width,A.height):tt(A)?d.renderbufferStorageMultisampleEXT(36161,me,35056,A.width,A.height):i.renderbufferStorage(36161,34041,A.width,A.height),i.framebufferRenderbuffer(36160,33306,36161,I)}else{const me=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let xe=0;xe<me.length;xe++){const Ae=me[xe],O=s.convert(Ae.format,Ae.encoding),le=s.convert(Ae.type),Q=P(Ae.internalFormat,O,le,Ae.encoding),Pe=Ct(A);ie&&tt(A)===!1?i.renderbufferStorageMultisample(36161,Pe,Q,A.width,A.height):tt(A)?d.renderbufferStorageMultisampleEXT(36161,Pe,Q,A.width,A.height):i.renderbufferStorage(36161,Q,A.width,A.height)}}i.bindRenderbuffer(36161,null)}function Ke(I,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,I),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),J(A.depthTexture,0);const me=n.get(A.depthTexture).__webglTexture,xe=Ct(A);if(A.depthTexture.format===yi)tt(A)?d.framebufferTexture2DMultisampleEXT(36160,36096,3553,me,0,xe):i.framebufferTexture2D(36160,36096,3553,me,0);else if(A.depthTexture.format===Gr)tt(A)?d.framebufferTexture2DMultisampleEXT(36160,33306,3553,me,0,xe):i.framebufferTexture2D(36160,33306,3553,me,0);else throw new Error("Unknown depthTexture format")}function Be(I){const A=n.get(I),ie=I.isWebGLCubeRenderTarget===!0;if(I.depthTexture&&!A.__autoAllocateDepthBuffer){if(ie)throw new Error("target.depthTexture not supported in Cube render targets");Ke(A.__webglFramebuffer,I)}else if(ie){A.__webglDepthbuffer=[];for(let me=0;me<6;me++)t.bindFramebuffer(36160,A.__webglFramebuffer[me]),A.__webglDepthbuffer[me]=i.createRenderbuffer(),He(A.__webglDepthbuffer[me],I,!1)}else t.bindFramebuffer(36160,A.__webglFramebuffer),A.__webglDepthbuffer=i.createRenderbuffer(),He(A.__webglDepthbuffer,I,!1);t.bindFramebuffer(36160,null)}function Xe(I,A,ie){const me=n.get(I);A!==void 0&&ue(me.__webglFramebuffer,I,I.texture,36064,3553),ie!==void 0&&Be(I)}function Mt(I){const A=I.texture,ie=n.get(I),me=n.get(A);I.addEventListener("dispose",F),I.isWebGLMultipleRenderTargets!==!0&&(me.__webglTexture===void 0&&(me.__webglTexture=i.createTexture()),me.__version=A.version,a.memory.textures++);const xe=I.isWebGLCubeRenderTarget===!0,Ae=I.isWebGLMultipleRenderTargets===!0,O=y(I)||o;if(xe){ie.__webglFramebuffer=[];for(let le=0;le<6;le++)ie.__webglFramebuffer[le]=i.createFramebuffer()}else{if(ie.__webglFramebuffer=i.createFramebuffer(),Ae)if(r.drawBuffers){const le=I.texture;for(let Q=0,Pe=le.length;Q<Pe;Q++){const Ie=n.get(le[Q]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&I.samples>0&&tt(I)===!1){const le=Ae?A:[A];ie.__webglMultisampledFramebuffer=i.createFramebuffer(),ie.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,ie.__webglMultisampledFramebuffer);for(let Q=0;Q<le.length;Q++){const Pe=le[Q];ie.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(36161,ie.__webglColorRenderbuffer[Q]);const Ie=s.convert(Pe.format,Pe.encoding),Ne=s.convert(Pe.type),we=P(Pe.internalFormat,Ie,Ne,Pe.encoding,I.isXRRenderTarget===!0),ze=Ct(I);i.renderbufferStorageMultisample(36161,ze,we,I.width,I.height),i.framebufferRenderbuffer(36160,36064+Q,36161,ie.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(36161,null),I.depthBuffer&&(ie.__webglDepthRenderbuffer=i.createRenderbuffer(),He(ie.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(36160,null)}}if(xe){t.bindTexture(34067,me.__webglTexture),he(34067,A,O);for(let le=0;le<6;le++)ue(ie.__webglFramebuffer[le],I,A,36064,34069+le);E(A,O)&&R(34067),t.unbindTexture()}else if(Ae){const le=I.texture;for(let Q=0,Pe=le.length;Q<Pe;Q++){const Ie=le[Q],Ne=n.get(Ie);t.bindTexture(3553,Ne.__webglTexture),he(3553,Ie,O),ue(ie.__webglFramebuffer,I,Ie,36064+Q,3553),E(Ie,O)&&R(3553)}t.unbindTexture()}else{let le=3553;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(o?le=I.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(le,me.__webglTexture),he(le,A,O),ue(ie.__webglFramebuffer,I,A,36064,le),E(A,O)&&R(le),t.unbindTexture()}I.depthBuffer&&Be(I)}function St(I){const A=y(I)||o,ie=I.isWebGLMultipleRenderTargets===!0?I.texture:[I.texture];for(let me=0,xe=ie.length;me<xe;me++){const Ae=ie[me];if(E(Ae,A)){const O=I.isWebGLCubeRenderTarget?34067:3553,le=n.get(Ae).__webglTexture;t.bindTexture(O,le),R(O),t.unbindTexture()}}}function It(I){if(o&&I.samples>0&&tt(I)===!1){const A=I.isWebGLMultipleRenderTargets?I.texture:[I.texture],ie=I.width,me=I.height;let xe=16384;const Ae=[],O=I.stencilBuffer?33306:36096,le=n.get(I),Q=I.isWebGLMultipleRenderTargets===!0;if(Q)for(let Pe=0;Pe<A.length;Pe++)t.bindFramebuffer(36160,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(36160,36064+Pe,36161,null),t.bindFramebuffer(36160,le.__webglFramebuffer),i.framebufferTexture2D(36009,36064+Pe,3553,null,0);t.bindFramebuffer(36008,le.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,le.__webglFramebuffer);for(let Pe=0;Pe<A.length;Pe++){Ae.push(36064+Pe),I.depthBuffer&&Ae.push(O);const Ie=le.__ignoreDepthValues!==void 0?le.__ignoreDepthValues:!1;if(Ie===!1&&(I.depthBuffer&&(xe|=256),I.stencilBuffer&&(xe|=1024)),Q&&i.framebufferRenderbuffer(36008,36064,36161,le.__webglColorRenderbuffer[Pe]),Ie===!0&&(i.invalidateFramebuffer(36008,[O]),i.invalidateFramebuffer(36009,[O])),Q){const Ne=n.get(A[Pe]).__webglTexture;i.framebufferTexture2D(36009,36064,3553,Ne,0)}i.blitFramebuffer(0,0,ie,me,0,0,ie,me,xe,9728),p&&i.invalidateFramebuffer(36008,Ae)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),Q)for(let Pe=0;Pe<A.length;Pe++){t.bindFramebuffer(36160,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(36160,36064+Pe,36161,le.__webglColorRenderbuffer[Pe]);const Ie=n.get(A[Pe]).__webglTexture;t.bindFramebuffer(36160,le.__webglFramebuffer),i.framebufferTexture2D(36009,36064+Pe,3553,Ie,0)}t.bindFramebuffer(36009,le.__webglMultisampledFramebuffer)}}function Ct(I){return Math.min(h,I.samples)}function tt(I){const A=n.get(I);return o&&I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function ft(I){const A=a.render.frame;v.get(I)!==A&&(v.set(I,A),I.update())}function Yt(I,A){const ie=I.encoding,me=I.format,xe=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||I.format===ec||ie!==vn&&(ie===ke?o===!1?e.has("EXT_sRGB")===!0&&me===tn?(I.format=ec,I.minFilter=Ue,I.generateMipmaps=!1):A=$d.sRGBToLinear(A):(me!==tn||xe!==sn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",ie)),A}this.allocateTextureUnit=Y,this.resetTextureUnits=$,this.setTexture2D=J,this.setTexture2DArray=be,this.setTexture3D=ae,this.setTextureCube=Z,this.rebindTextures=Xe,this.setupRenderTarget=Mt,this.updateRenderTargetMipmap=St,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=tt}function y_(i,e,t){const n=t.isWebGL2;function r(s,a=null){let o;if(s===sn)return 5121;if(s===$p)return 32819;if(s===Jp)return 32820;if(s===Yp)return 5120;if(s===Zp)return 5122;if(s===Ta)return 5123;if(s===Kp)return 5124;if(s===or)return 5125;if(s===lt)return 5126;if(s===_t)return n?5131:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Qp)return 6406;if(s===tn)return 6408;if(s===em)return 6409;if(s===tm)return 6410;if(s===yi)return 6402;if(s===Gr)return 34041;if(s===ec)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Eo)return 6403;if(s===nm)return 36244;if(s===im)return 33319;if(s===rm)return 33320;if(s===sm)return 36249;if(s===$o||s===Jo||s===Qo||s===el)if(a===ke)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===$o)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Jo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Qo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===el)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===$o)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Jo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Qo)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===el)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===ru||s===su||s===au||s===ou)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===ru)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===su)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===au)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===ou)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===am)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===lu||s===cu)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===lu)return a===ke?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===cu)return a===ke?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===uu||s===hu||s===du||s===fu||s===pu||s===mu||s===gu||s===vu||s===xu||s===_u||s===yu||s===wu||s===Mu||s===Su)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===uu)return a===ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===hu)return a===ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===du)return a===ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===fu)return a===ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===pu)return a===ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===mu)return a===ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===gu)return a===ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===vu)return a===ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===xu)return a===ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===_u)return a===ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===yu)return a===ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===wu)return a===ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Mu)return a===ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Su)return a===ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===tl)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===tl)return a===ke?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(s===om||s===bu||s===Tu||s===Eu)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===tl)return o.COMPRESSED_RED_RGTC1_EXT;if(s===bu)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Tu)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Eu)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Fr?n?34042:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class w_ extends xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}let nn=class extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}};const M_={type:"move"};class bl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,n),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,v=.005;c.inputState.pinching&&d>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(M_)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new nn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class pr extends Gt{constructor(e,t,n,r,s,a,o,l,c,u){if(u=u!==void 0?u:yi,u!==yi&&u!==Gr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===yi&&(n=or),n===void 0&&u===Gr&&(n=Fr),super(null,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:et,this.minFilter=l!==void 0?l:et,this.flipY=!1,this.generateMipmaps=!1}}class S_ extends Mi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,p=null,v=null;const x=t.getContextAttributes();let m=null,f=null;const M=[],_=[],y=new Set,S=new Map,E=new xt;E.layers.enable(1),E.viewport=new ot;const R=new xt;R.layers.enable(2),R.viewport=new ot;const P=[E,R],w=new w_;w.layers.enable(1),w.layers.enable(2);let T=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let re=M[Z];return re===void 0&&(re=new bl,M[Z]=re),re.getTargetRaySpace()},this.getControllerGrip=function(Z){let re=M[Z];return re===void 0&&(re=new bl,M[Z]=re),re.getGripSpace()},this.getHand=function(Z){let re=M[Z];return re===void 0&&(re=new bl,M[Z]=re),re.getHandSpace()};function F(Z){const re=_.indexOf(Z.inputSource);if(re===-1)return;const pe=M[re];pe!==void 0&&pe.dispatchEvent({type:Z.type,data:Z.inputSource})}function U(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",U),r.removeEventListener("inputsourceschange",z);for(let Z=0;Z<M.length;Z++){const re=_[Z];re!==null&&(_[Z]=null,M[Z].disconnect(re))}T=null,N=null,e.setRenderTarget(m),p=null,d=null,h=null,r=null,f=null,ae.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",U),r.addEventListener("inputsourceschange",z),x.xrCompatible!==!0&&await t.makeXRCompatible(),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const re={antialias:r.renderState.layers===void 0?x.antialias:!0,alpha:x.alpha,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,re),r.updateRenderState({baseLayer:p}),f=new ct(p.framebufferWidth,p.framebufferHeight,{format:tn,type:sn,encoding:e.outputEncoding,stencilBuffer:x.stencil})}else{let re=null,pe=null,he=null;x.depth&&(he=x.stencil?35056:33190,re=x.stencil?Gr:yi,pe=x.stencil?Fr:or);const j={colorFormat:32856,depthFormat:he,scaleFactor:s};h=new XRWebGLBinding(r,t),d=h.createProjectionLayer(j),r.updateRenderState({layers:[d]}),f=new ct(d.textureWidth,d.textureHeight,{format:tn,type:sn,depthTexture:new pr(d.textureWidth,d.textureHeight,pe,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:x.stencil,encoding:e.outputEncoding,samples:x.antialias?4:0});const Fe=e.properties.get(f);Fe.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ae.setContext(r),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function z(Z){for(let re=0;re<Z.removed.length;re++){const pe=Z.removed[re],he=_.indexOf(pe);he>=0&&(_[he]=null,M[he].disconnect(pe))}for(let re=0;re<Z.added.length;re++){const pe=Z.added[re];let he=_.indexOf(pe);if(he===-1){for(let Fe=0;Fe<M.length;Fe++)if(Fe>=_.length){_.push(pe),he=Fe;break}else if(_[Fe]===null){_[Fe]=pe,he=Fe;break}if(he===-1)break}const j=M[he];j&&j.connect(pe)}}const k=new L,ee=new L;function $(Z,re,pe){k.setFromMatrixPosition(re.matrixWorld),ee.setFromMatrixPosition(pe.matrixWorld);const he=k.distanceTo(ee),j=re.projectionMatrix.elements,Fe=pe.projectionMatrix.elements,ve=j[14]/(j[10]-1),ue=j[14]/(j[10]+1),He=(j[9]+1)/j[5],Ke=(j[9]-1)/j[5],Be=(j[8]-1)/j[0],Xe=(Fe[8]+1)/Fe[0],Mt=ve*Be,St=ve*Xe,It=he/(-Be+Xe),Ct=It*-Be;re.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ct),Z.translateZ(It),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert();const tt=ve+It,ft=ue+It,Yt=Mt-Ct,I=St+(he-Ct),A=He*ue/ft*tt,ie=Ke*ue/ft*tt;Z.projectionMatrix.makePerspective(Yt,I,A,ie,tt,ft),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}function Y(Z,re){re===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(re.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;w.near=R.near=E.near=Z.near,w.far=R.far=E.far=Z.far,(T!==w.near||N!==w.far)&&(r.updateRenderState({depthNear:w.near,depthFar:w.far}),T=w.near,N=w.far);const re=Z.parent,pe=w.cameras;Y(w,re);for(let he=0;he<pe.length;he++)Y(pe[he],re);pe.length===2?$(w,E,R):w.projectionMatrix.copy(E.projectionMatrix),ne(Z,w,re)};function ne(Z,re,pe){pe===null?Z.matrix.copy(re.matrixWorld):(Z.matrix.copy(pe.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(re.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0);const he=Z.children;for(let j=0,Fe=he.length;j<Fe;j++)he[j].updateMatrixWorld(!0);Z.projectionMatrix.copy(re.projectionMatrix),Z.projectionMatrixInverse.copy(re.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Os*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Z)},this.getPlanes=function(){return y};let J=null;function be(Z,re){if(u=re.getViewerPose(c||a),v=re,u!==null){const pe=u.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let he=!1;pe.length!==w.cameras.length&&(w.cameras.length=0,he=!0);for(let j=0;j<pe.length;j++){const Fe=pe[j];let ve=null;if(p!==null)ve=p.getViewport(Fe);else{const He=h.getViewSubImage(d,Fe);ve=He.viewport,j===0&&(e.setRenderTargetTextures(f,He.colorTexture,d.ignoreDepthValues?void 0:He.depthStencilTexture),e.setRenderTarget(f))}let ue=P[j];ue===void 0&&(ue=new xt,ue.layers.enable(j),ue.viewport=new ot,P[j]=ue),ue.matrix.fromArray(Fe.transform.matrix),ue.matrix.decompose(ue.position,ue.quaternion,ue.scale),ue.projectionMatrix.fromArray(Fe.projectionMatrix),ue.projectionMatrixInverse.copy(ue.projectionMatrix).invert(),ue.viewport.set(ve.x,ve.y,ve.width,ve.height),j===0&&(w.matrix.copy(ue.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),he===!0&&w.cameras.push(ue)}}for(let pe=0;pe<M.length;pe++){const he=_[pe],j=M[pe];he!==null&&j!==void 0&&j.update(he,re,c||a)}if(J&&J(Z,re),re.detectedPlanes){n.dispatchEvent({type:"planesdetected",data:re.detectedPlanes});let pe=null;for(const he of y)re.detectedPlanes.has(he)||(pe===null&&(pe=[]),pe.push(he));if(pe!==null)for(const he of pe)y.delete(he),S.delete(he),n.dispatchEvent({type:"planeremoved",data:he});for(const he of re.detectedPlanes)if(!y.has(he))y.add(he),S.set(he,re.lastChangedTime),n.dispatchEvent({type:"planeadded",data:he});else{const j=S.get(he);he.lastChangedTime>j&&(S.set(he,he.lastChangedTime),n.dispatchEvent({type:"planechanged",data:he}))}}v=null}const ae=new sf;ae.setAnimationLoop(be),this.setAnimationLoop=function(Z){J=Z},this.dispose=function(){}}}function b_(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,nf(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,M,_,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),h(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f)):f.isMeshStandardMaterial?(s(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(s(m,f),v(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),x(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,M,_):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ot&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ot&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const M=e.get(f).envMap;if(M&&(m.envMap.value=M,m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const _=i.useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*_,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,M,_){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=_*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ot&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){const M=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function T_(i,e,t,n){let r={},s={},a=[];const o=t.isWebGL2?i.getParameter(35375):0;function l(M,_){const y=_.program;n.uniformBlockBinding(M,y)}function c(M,_){let y=r[M.id];y===void 0&&(v(M),y=u(M),r[M.id]=y,M.addEventListener("dispose",m));const S=_.program;n.updateUBOMapping(M,S);const E=e.render.frame;s[M.id]!==E&&(d(M),s[M.id]=E)}function u(M){const _=h();M.__bindingPointIndex=_;const y=i.createBuffer(),S=M.__size,E=M.usage;return i.bindBuffer(35345,y),i.bufferData(35345,S,E),i.bindBuffer(35345,null),i.bindBufferBase(35345,_,y),y}function h(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const _=r[M.id],y=M.uniforms,S=M.__cache;i.bindBuffer(35345,_);for(let E=0,R=y.length;E<R;E++){const P=y[E];if(p(P,E,S)===!0){const w=P.__offset,T=Array.isArray(P.value)?P.value:[P.value];let N=0;for(let F=0;F<T.length;F++){const U=T[F],z=x(U);typeof U=="number"?(P.__data[0]=U,i.bufferSubData(35345,w+N,P.__data)):U.isMatrix3?(P.__data[0]=U.elements[0],P.__data[1]=U.elements[1],P.__data[2]=U.elements[2],P.__data[3]=U.elements[0],P.__data[4]=U.elements[3],P.__data[5]=U.elements[4],P.__data[6]=U.elements[5],P.__data[7]=U.elements[0],P.__data[8]=U.elements[6],P.__data[9]=U.elements[7],P.__data[10]=U.elements[8],P.__data[11]=U.elements[0]):(U.toArray(P.__data,N),N+=z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(35345,w,P.__data)}}i.bindBuffer(35345,null)}function p(M,_,y){const S=M.value;if(y[_]===void 0){if(typeof S=="number")y[_]=S;else{const E=Array.isArray(S)?S:[S],R=[];for(let P=0;P<E.length;P++)R.push(E[P].clone());y[_]=R}return!0}else if(typeof S=="number"){if(y[_]!==S)return y[_]=S,!0}else{const E=Array.isArray(y[_])?y[_]:[y[_]],R=Array.isArray(S)?S:[S];for(let P=0;P<E.length;P++){const w=E[P];if(w.equals(R[P])===!1)return w.copy(R[P]),!0}}return!1}function v(M){const _=M.uniforms;let y=0;const S=16;let E=0;for(let R=0,P=_.length;R<P;R++){const w=_[R],T={boundary:0,storage:0},N=Array.isArray(w.value)?w.value:[w.value];for(let F=0,U=N.length;F<U;F++){const z=N[F],k=x(z);T.boundary+=k.boundary,T.storage+=k.storage}if(w.__data=new Float32Array(T.storage/Float32Array.BYTES_PER_ELEMENT),w.__offset=y,R>0){E=y%S;const F=S-E;E!==0&&F-T.boundary<0&&(y+=S-E,w.__offset=y)}y+=T.storage}return E=y%S,E>0&&(y+=S-E),M.__size=y,M.__cache={},this}function x(M){const _={boundary:0,storage:0};return typeof M=="number"?(_.boundary=4,_.storage=4):M.isVector2?(_.boundary=8,_.storage=8):M.isVector3||M.isColor?(_.boundary=16,_.storage=12):M.isVector4?(_.boundary=16,_.storage=16):M.isMatrix3?(_.boundary=48,_.storage=48):M.isMatrix4?(_.boundary=64,_.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),_}function m(M){const _=M.target;_.removeEventListener("dispose",m);const y=a.indexOf(_.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(r[_.id]),delete r[_.id],delete s[_.id]}function f(){for(const M in r)i.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:l,update:c,dispose:f}}function E_(){const i=va("canvas");return i.style.display="block",i}class Xi{constructor(e={}){const{canvas:t=E_(),context:n=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;let p=null,v=null;const x=[],m=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=vn,this.useLegacyLights=!0,this.toneMapping=zn,this.toneMappingExposure=1;const f=this;let M=!1,_=0,y=0,S=null,E=-1,R=null;const P=new ot,w=new ot;let T=null,N=t.width,F=t.height,U=1,z=null,k=null;const ee=new ot(0,0,N,F),$=new ot(0,0,N,F);let Y=!1;const ne=new Oo;let J=!1,be=!1,ae=null;const Z=new Le,re=new L,pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function he(){return S===null?U:1}let j=n;function Fe(C,V){for(let se=0;se<C.length;se++){const X=C[se],g=t.getContext(X,V);if(g!==null)return g}return null}try{const C={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ba}`),t.addEventListener("webglcontextlost",ze,!1),t.addEventListener("webglcontextrestored",We,!1),t.addEventListener("webglcontextcreationerror",je,!1),j===null){const V=["webgl2","webgl","experimental-webgl"];if(f.isWebGL1Renderer===!0&&V.shift(),j=Fe(V,C),j===null)throw Fe(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}j.getShaderPrecisionFormat===void 0&&(j.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let ve,ue,He,Ke,Be,Xe,Mt,St,It,Ct,tt,ft,Yt,I,A,ie,me,xe,Ae,O,le,Q,Pe,Ie;function Ne(){ve=new z0(j),ue=new I0(j,ve,e),ve.init(ue),Q=new y_(j,ve,ue),He=new x_(j,ve,ue),Ke=new G0,Be=new s_,Xe=new __(j,ve,He,Be,ue,Q,Ke),Mt=new N0(f),St=new B0(f),It=new Qm(j,ue),Pe=new D0(j,ve,It,ue),Ct=new k0(j,It,Ke,Pe),tt=new X0(j,Ct,It,Ke),Ae=new j0(j,ue,Xe),ie=new U0(Be),ft=new r_(f,Mt,St,ve,ue,Pe,ie),Yt=new b_(f,Be),I=new o_,A=new f_(ve,ue),xe=new R0(f,Mt,St,He,tt,d,l),me=new v_(f,tt,ue),Ie=new T_(j,Ke,ue,He),O=new L0(j,ve,Ke,ue),le=new H0(j,ve,Ke,ue),Ke.programs=ft.programs,f.capabilities=ue,f.extensions=ve,f.properties=Be,f.renderLists=I,f.shadowMap=me,f.state=He,f.info=Ke}Ne();const we=new S_(f,j);this.xr=we,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const C=ve.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=ve.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(C){C!==void 0&&(U=C,this.setSize(N,F,!1))},this.getSize=function(C){return C.set(N,F)},this.setSize=function(C,V,se=!0){if(we.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=C,F=V,t.width=Math.floor(C*U),t.height=Math.floor(V*U),se===!0&&(t.style.width=C+"px",t.style.height=V+"px"),this.setViewport(0,0,C,V)},this.getDrawingBufferSize=function(C){return C.set(N*U,F*U).floor()},this.setDrawingBufferSize=function(C,V,se){N=C,F=V,U=se,t.width=Math.floor(C*se),t.height=Math.floor(V*se),this.setViewport(0,0,C,V)},this.getCurrentViewport=function(C){return C.copy(P)},this.getViewport=function(C){return C.copy(ee)},this.setViewport=function(C,V,se,X){C.isVector4?ee.set(C.x,C.y,C.z,C.w):ee.set(C,V,se,X),He.viewport(P.copy(ee).multiplyScalar(U).floor())},this.getScissor=function(C){return C.copy($)},this.setScissor=function(C,V,se,X){C.isVector4?$.set(C.x,C.y,C.z,C.w):$.set(C,V,se,X),He.scissor(w.copy($).multiplyScalar(U).floor())},this.getScissorTest=function(){return Y},this.setScissorTest=function(C){He.setScissorTest(Y=C)},this.setOpaqueSort=function(C){z=C},this.setTransparentSort=function(C){k=C},this.getClearColor=function(C){return C.copy(xe.getClearColor())},this.setClearColor=function(){xe.setClearColor.apply(xe,arguments)},this.getClearAlpha=function(){return xe.getClearAlpha()},this.setClearAlpha=function(){xe.setClearAlpha.apply(xe,arguments)},this.clear=function(C=!0,V=!0,se=!0){let X=0;C&&(X|=16384),V&&(X|=256),se&&(X|=1024),j.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",We,!1),t.removeEventListener("webglcontextcreationerror",je,!1),I.dispose(),A.dispose(),Be.dispose(),Mt.dispose(),St.dispose(),tt.dispose(),Pe.dispose(),Ie.dispose(),ft.dispose(),we.dispose(),we.removeEventListener("sessionstart",Ge),we.removeEventListener("sessionend",mt),ae&&(ae.dispose(),ae=null),bt.stop()};function ze(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function We(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const C=Ke.autoReset,V=me.enabled,se=me.autoUpdate,X=me.needsUpdate,g=me.type;Ne(),Ke.autoReset=C,me.enabled=V,me.autoUpdate=se,me.needsUpdate=X,me.type=g}function je(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Ze(C){const V=C.target;V.removeEventListener("dispose",Ze),G(V)}function G(C){H(C),Be.remove(C)}function H(C){const V=Be.get(C).programs;V!==void 0&&(V.forEach(function(se){ft.releaseProgram(se)}),C.isShaderMaterial&&ft.releaseShaderCache(C))}this.renderBufferDirect=function(C,V,se,X,g,b){V===null&&(V=pe);const D=g.isMesh&&g.matrixWorld.determinant()<0,B=Jr(C,V,se,X,g);He.setMaterial(X,D);let q=se.index,W=1;X.wireframe===!0&&(q=Ct.getWireframeAttribute(se),W=2);const te=se.drawRange,oe=se.attributes.position;let de=te.start*W,ce=(te.start+te.count)*W;b!==null&&(de=Math.max(de,b.start*W),ce=Math.min(ce,(b.start+b.count)*W)),q!==null?(de=Math.max(de,0),ce=Math.min(ce,q.count)):oe!=null&&(de=Math.max(de,0),ce=Math.min(ce,oe.count));const ge=ce-de;if(ge<0||ge===1/0)return;Pe.setup(g,X,B,se,q);let De,Me=O;if(q!==null&&(De=It.get(q),Me=le,Me.setIndex(De)),g.isMesh)X.wireframe===!0?(He.setLineWidth(X.wireframeLinewidth*he()),Me.setMode(1)):Me.setMode(4);else if(g.isLine){let Se=X.linewidth;Se===void 0&&(Se=1),He.setLineWidth(Se*he()),g.isLineSegments?Me.setMode(1):g.isLineLoop?Me.setMode(2):Me.setMode(3)}else g.isPoints?Me.setMode(0):g.isSprite&&Me.setMode(4);if(g.isInstancedMesh)Me.renderInstances(de,ge,g.count);else if(se.isInstancedBufferGeometry){const Se=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,qe=Math.min(se.instanceCount,Se);Me.renderInstances(de,ge,qe)}else Me.render(de,ge)},this.compile=function(C,V){function se(X,g,b){X.transparent===!0&&X.side===fn&&X.forceSinglePass===!1?(X.side=Ot,X.needsUpdate=!0,$r(X,g,b),X.side=ri,X.needsUpdate=!0,$r(X,g,b),X.side=fn):$r(X,g,b)}v=A.get(C),v.init(),m.push(v),C.traverseVisible(function(X){X.isLight&&X.layers.test(V.layers)&&(v.pushLight(X),X.castShadow&&v.pushShadow(X))}),v.setupLights(f.useLegacyLights),C.traverse(function(X){const g=X.material;if(g)if(Array.isArray(g))for(let b=0;b<g.length;b++){const D=g[b];se(D,C,X)}else se(g,C,X)}),m.pop(),v=null};let fe=null;function Ce(C){fe&&fe(C)}function Ge(){bt.stop()}function mt(){bt.start()}const bt=new sf;bt.setAnimationLoop(Ce),typeof self<"u"&&bt.setContext(self),this.setAnimationLoop=function(C){fe=C,we.setAnimationLoop(C),C===null?bt.stop():bt.start()},we.addEventListener("sessionstart",Ge),we.addEventListener("sessionend",mt),this.render=function(C,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),we.enabled===!0&&we.isPresenting===!0&&(we.cameraAutoUpdate===!0&&we.updateCamera(V),V=we.getCamera()),C.isScene===!0&&C.onBeforeRender(f,C,V,S),v=A.get(C,m.length),v.init(),m.push(v),Z.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),ne.setFromProjectionMatrix(Z),be=this.localClippingEnabled,J=ie.init(this.clippingPlanes,be),p=I.get(C,x.length),p.init(),x.push(p),Zt(C,V,0,f.sortObjects),p.finish(),f.sortObjects===!0&&p.sort(z,k),J===!0&&ie.beginShadows();const se=v.state.shadowsArray;if(me.render(se,C,V),J===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset(),xe.render(p,C),v.setupLights(f.useLegacyLights),V.isArrayCamera){const X=V.cameras;for(let g=0,b=X.length;g<b;g++){const D=X[g];si(p,C,D,D.viewport)}}else si(p,C,V);S!==null&&(Xe.updateMultisampleRenderTarget(S),Xe.updateRenderTargetMipmap(S)),C.isScene===!0&&C.onAfterRender(f,C,V),Pe.resetDefaultState(),E=-1,R=null,m.pop(),m.length>0?v=m[m.length-1]:v=null,x.pop(),x.length>0?p=x[x.length-1]:p=null};function Zt(C,V,se,X){if(C.visible===!1)return;if(C.layers.test(V.layers)){if(C.isGroup)se=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(V);else if(C.isLight)v.pushLight(C),C.castShadow&&v.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||ne.intersectsSprite(C)){X&&re.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Z);const D=tt.update(C),B=C.material;B.visible&&p.push(C,D,B,se,re.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(C.isSkinnedMesh&&C.skeleton.frame!==Ke.render.frame&&(C.skeleton.update(),C.skeleton.frame=Ke.render.frame),!C.frustumCulled||ne.intersectsObject(C))){X&&re.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Z);const D=tt.update(C),B=C.material;if(Array.isArray(B)){const q=D.groups;for(let W=0,te=q.length;W<te;W++){const oe=q[W],de=B[oe.materialIndex];de&&de.visible&&p.push(C,D,de,se,re.z,oe)}}else B.visible&&p.push(C,D,B,se,re.z,null)}}const b=C.children;for(let D=0,B=b.length;D<B;D++)Zt(b[D],V,se,X)}function si(C,V,se,X){const g=C.opaque,b=C.transmissive,D=C.transparent;v.setupLightsView(se),J===!0&&ie.setGlobalState(f.clippingPlanes,se),b.length>0&&Rt(g,b,V,se),X&&He.viewport(P.copy(X)),g.length>0&&wn(g,V,se),b.length>0&&wn(b,V,se),D.length>0&&wn(D,V,se),He.buffers.depth.setTest(!0),He.buffers.depth.setMask(!0),He.buffers.color.setMask(!0),He.setPolygonOffset(!1)}function Rt(C,V,se,X){if(ae===null){const B=ue.isWebGL2;ae=new ct(1024,1024,{generateMipmaps:!0,type:ve.has("EXT_color_buffer_half_float")?_t:sn,minFilter:Gi,samples:B&&o===!0?4:0})}const g=f.getRenderTarget();f.setRenderTarget(ae),f.clear();const b=f.toneMapping;f.toneMapping=zn,wn(C,se,X),Xe.updateMultisampleRenderTarget(ae),Xe.updateRenderTargetMipmap(ae);let D=!1;for(let B=0,q=V.length;B<q;B++){const W=V[B],te=W.object,oe=W.geometry,de=W.material,ce=W.group;if(de.side===fn&&te.layers.test(X.layers)){const ge=de.side;de.side=Ot,de.needsUpdate=!0,Ln(te,se,X,oe,de,ce),de.side=ge,de.needsUpdate=!0,D=!0}}D===!0&&(Xe.updateMultisampleRenderTarget(ae),Xe.updateRenderTargetMipmap(ae)),f.setRenderTarget(g),f.toneMapping=b}function wn(C,V,se){const X=V.isScene===!0?V.overrideMaterial:null;for(let g=0,b=C.length;g<b;g++){const D=C[g],B=D.object,q=D.geometry,W=X===null?D.material:X,te=D.group;B.layers.test(se.layers)&&Ln(B,V,se,q,W,te)}}function Ln(C,V,se,X,g,b){C.onBeforeRender(f,V,se,X,g,b),C.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),g.onBeforeRender(f,V,se,X,C,b),g.transparent===!0&&g.side===fn&&g.forceSinglePass===!1?(g.side=Ot,g.needsUpdate=!0,f.renderBufferDirect(se,V,X,g,C,b),g.side=ri,g.needsUpdate=!0,f.renderBufferDirect(se,V,X,g,C,b),g.side=fn):f.renderBufferDirect(se,V,X,g,C,b),C.onAfterRender(f,V,se,X,g,b)}function $r(C,V,se){V.isScene!==!0&&(V=pe);const X=Be.get(C),g=v.state.lights,b=v.state.shadowsArray,D=g.state.version,B=ft.getParameters(C,g.state,b,V,se),q=ft.getProgramCacheKey(B);let W=X.programs;X.environment=C.isMeshStandardMaterial?V.environment:null,X.fog=V.fog,X.envMap=(C.isMeshStandardMaterial?St:Mt).get(C.envMap||X.environment),W===void 0&&(C.addEventListener("dispose",Ze),W=new Map,X.programs=W);let te=W.get(q);if(te!==void 0){if(X.currentProgram===te&&X.lightsStateVersion===D)return Oa(C,B),te}else B.uniforms=ft.getUniforms(C),C.onBuild(se,B,f),C.onBeforeCompile(B,f),te=ft.acquireProgram(B,q),W.set(q,te),X.uniforms=B.uniforms;const oe=X.uniforms;(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(oe.clippingPlanes=ie.uniform),Oa(C,B),X.needsLights=yr(C),X.lightsStateVersion=D,X.needsLights&&(oe.ambientLightColor.value=g.state.ambient,oe.lightProbe.value=g.state.probe,oe.directionalLights.value=g.state.directional,oe.directionalLightShadows.value=g.state.directionalShadow,oe.spotLights.value=g.state.spot,oe.spotLightShadows.value=g.state.spotShadow,oe.rectAreaLights.value=g.state.rectArea,oe.ltc_1.value=g.state.rectAreaLTC1,oe.ltc_2.value=g.state.rectAreaLTC2,oe.pointLights.value=g.state.point,oe.pointLightShadows.value=g.state.pointShadow,oe.hemisphereLights.value=g.state.hemi,oe.directionalShadowMap.value=g.state.directionalShadowMap,oe.directionalShadowMatrix.value=g.state.directionalShadowMatrix,oe.spotShadowMap.value=g.state.spotShadowMap,oe.spotLightMatrix.value=g.state.spotLightMatrix,oe.spotLightMap.value=g.state.spotLightMap,oe.pointShadowMap.value=g.state.pointShadowMap,oe.pointShadowMatrix.value=g.state.pointShadowMatrix);const de=te.getUniforms(),ce=yo.seqWithValue(de.seq,oe);return X.currentProgram=te,X.uniformsList=ce,te}function Oa(C,V){const se=Be.get(C);se.outputEncoding=V.outputEncoding,se.instancing=V.instancing,se.skinning=V.skinning,se.morphTargets=V.morphTargets,se.morphNormals=V.morphNormals,se.morphColors=V.morphColors,se.morphTargetsCount=V.morphTargetsCount,se.numClippingPlanes=V.numClippingPlanes,se.numIntersection=V.numClipIntersection,se.vertexAlphas=V.vertexAlphas,se.vertexTangents=V.vertexTangents,se.toneMapping=V.toneMapping}function Jr(C,V,se,X,g){V.isScene!==!0&&(V=pe),Xe.resetTextureUnits();const b=V.fog,D=X.isMeshStandardMaterial?V.environment:null,B=S===null?f.outputEncoding:S.isXRRenderTarget===!0?S.texture.encoding:vn,q=(X.isMeshStandardMaterial?St:Mt).get(X.envMap||D),W=X.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,te=!!X.normalMap&&!!se.attributes.tangent,oe=!!se.morphAttributes.position,de=!!se.morphAttributes.normal,ce=!!se.morphAttributes.color,ge=X.toneMapped?f.toneMapping:zn,De=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,Me=De!==void 0?De.length:0,Se=Be.get(X),qe=v.state.lights;if(J===!0&&(be===!0||C!==R)){const rt=C===R&&X.id===E;ie.setState(X,C,rt)}let Te=!1;X.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==qe.state.version||Se.outputEncoding!==B||g.isInstancedMesh&&Se.instancing===!1||!g.isInstancedMesh&&Se.instancing===!0||g.isSkinnedMesh&&Se.skinning===!1||!g.isSkinnedMesh&&Se.skinning===!0||Se.envMap!==q||X.fog===!0&&Se.fog!==b||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==ie.numPlanes||Se.numIntersection!==ie.numIntersection)||Se.vertexAlphas!==W||Se.vertexTangents!==te||Se.morphTargets!==oe||Se.morphNormals!==de||Se.morphColors!==ce||Se.toneMapping!==ge||ue.isWebGL2===!0&&Se.morphTargetsCount!==Me)&&(Te=!0):(Te=!0,Se.__version=X.version);let Oe=Se.currentProgram;Te===!0&&(Oe=$r(X,V,g));let Ye=!1,pt=!1,Tt=!1;const ut=Oe.getUniforms(),it=Se.uniforms;if(He.useProgram(Oe.program)&&(Ye=!0,pt=!0,Tt=!0),X.id!==E&&(E=X.id,pt=!0),Ye||R!==C){if(ut.setValue(j,"projectionMatrix",C.projectionMatrix),ue.logarithmicDepthBuffer&&ut.setValue(j,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),R!==C&&(R=C,pt=!0,Tt=!0),X.isShaderMaterial||X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshStandardMaterial||X.envMap){const rt=ut.map.cameraPosition;rt!==void 0&&rt.setValue(j,re.setFromMatrixPosition(C.matrixWorld))}(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&ut.setValue(j,"isOrthographic",C.isOrthographicCamera===!0),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial||X.isShadowMaterial||g.isSkinnedMesh)&&ut.setValue(j,"viewMatrix",C.matrixWorldInverse)}if(g.isSkinnedMesh){ut.setOptional(j,g,"bindMatrix"),ut.setOptional(j,g,"bindMatrixInverse");const rt=g.skeleton;rt&&(ue.floatVertexTextures?(rt.boneTexture===null&&rt.computeBoneTexture(),ut.setValue(j,"boneTexture",rt.boneTexture,Xe),ut.setValue(j,"boneTextureSize",rt.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const $e=se.morphAttributes;if(($e.position!==void 0||$e.normal!==void 0||$e.color!==void 0&&ue.isWebGL2===!0)&&Ae.update(g,se,Oe),(pt||Se.receiveShadow!==g.receiveShadow)&&(Se.receiveShadow=g.receiveShadow,ut.setValue(j,"receiveShadow",g.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(it.envMap.value=q,it.flipEnvMap.value=q.isCubeTexture&&q.isRenderTargetTexture===!1?-1:1),pt&&(ut.setValue(j,"toneMappingExposure",f.toneMappingExposure),Se.needsLights&&Zo(it,Tt),b&&X.fog===!0&&Yt.refreshFogUniforms(it,b),Yt.refreshMaterialUniforms(it,X,U,F,ae),yo.upload(j,Se.uniformsList,it,Xe)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(yo.upload(j,Se.uniformsList,it,Xe),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&ut.setValue(j,"center",g.center),ut.setValue(j,"modelViewMatrix",g.modelViewMatrix),ut.setValue(j,"normalMatrix",g.normalMatrix),ut.setValue(j,"modelMatrix",g.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const rt=X.uniformsGroups;for(let an=0,Vt=rt.length;an<Vt;an++)if(ue.isWebGL2){const st=rt[an];Ie.update(st,Oe),Ie.bind(st,Oe)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Oe}function Zo(C,V){C.ambientLightColor.needsUpdate=V,C.lightProbe.needsUpdate=V,C.directionalLights.needsUpdate=V,C.directionalLightShadows.needsUpdate=V,C.pointLights.needsUpdate=V,C.pointLightShadows.needsUpdate=V,C.spotLights.needsUpdate=V,C.spotLightShadows.needsUpdate=V,C.rectAreaLights.needsUpdate=V,C.hemisphereLights.needsUpdate=V}function yr(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(C,V,se){Be.get(C.texture).__webglTexture=V,Be.get(C.depthTexture).__webglTexture=se;const X=Be.get(C);X.__hasExternalTextures=!0,X.__hasExternalTextures&&(X.__autoAllocateDepthBuffer=se===void 0,X.__autoAllocateDepthBuffer||ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,V){const se=Be.get(C);se.__webglFramebuffer=V,se.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(C,V=0,se=0){S=C,_=V,y=se;let X=!0,g=null,b=!1,D=!1;if(C){const q=Be.get(C);q.__useDefaultFramebuffer!==void 0?(He.bindFramebuffer(36160,null),X=!1):q.__webglFramebuffer===void 0?Xe.setupRenderTarget(C):q.__hasExternalTextures&&Xe.rebindTextures(C,Be.get(C.texture).__webglTexture,Be.get(C.depthTexture).__webglTexture);const W=C.texture;(W.isData3DTexture||W.isDataArrayTexture||W.isCompressedArrayTexture)&&(D=!0);const te=Be.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(g=te[V],b=!0):ue.isWebGL2&&C.samples>0&&Xe.useMultisampledRTT(C)===!1?g=Be.get(C).__webglMultisampledFramebuffer:g=te,P.copy(C.viewport),w.copy(C.scissor),T=C.scissorTest}else P.copy(ee).multiplyScalar(U).floor(),w.copy($).multiplyScalar(U).floor(),T=Y;if(He.bindFramebuffer(36160,g)&&ue.drawBuffers&&X&&He.drawBuffers(C,g),He.viewport(P),He.scissor(w),He.setScissorTest(T),b){const q=Be.get(C.texture);j.framebufferTexture2D(36160,36064,34069+V,q.__webglTexture,se)}else if(D){const q=Be.get(C.texture),W=V||0;j.framebufferTextureLayer(36160,36064,q.__webglTexture,se||0,W)}E=-1},this.readRenderTargetPixels=function(C,V,se,X,g,b,D){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let B=Be.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&D!==void 0&&(B=B[D]),B){He.bindFramebuffer(36160,B);try{const q=C.texture,W=q.format,te=q.type;if(W!==tn&&Q.convert(W)!==j.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const oe=te===_t&&(ve.has("EXT_color_buffer_half_float")||ue.isWebGL2&&ve.has("EXT_color_buffer_float"));if(te!==sn&&Q.convert(te)!==j.getParameter(35738)&&!(te===lt&&(ue.isWebGL2||ve.has("OES_texture_float")||ve.has("WEBGL_color_buffer_float")))&&!oe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=C.width-X&&se>=0&&se<=C.height-g&&j.readPixels(V,se,X,g,Q.convert(W),Q.convert(te),b)}finally{const q=S!==null?Be.get(S).__webglFramebuffer:null;He.bindFramebuffer(36160,q)}}},this.copyFramebufferToTexture=function(C,V,se=0){const X=Math.pow(2,-se),g=Math.floor(V.image.width*X),b=Math.floor(V.image.height*X);Xe.setTexture2D(V,0),j.copyTexSubImage2D(3553,se,0,0,C.x,C.y,g,b),He.unbindTexture()},this.copyTextureToTexture=function(C,V,se,X=0){const g=V.image.width,b=V.image.height,D=Q.convert(se.format),B=Q.convert(se.type);Xe.setTexture2D(se,0),j.pixelStorei(37440,se.flipY),j.pixelStorei(37441,se.premultiplyAlpha),j.pixelStorei(3317,se.unpackAlignment),V.isDataTexture?j.texSubImage2D(3553,X,C.x,C.y,g,b,D,B,V.image.data):V.isCompressedTexture?j.compressedTexSubImage2D(3553,X,C.x,C.y,V.mipmaps[0].width,V.mipmaps[0].height,D,V.mipmaps[0].data):j.texSubImage2D(3553,X,C.x,C.y,D,B,V.image),X===0&&se.generateMipmaps&&j.generateMipmap(3553),He.unbindTexture()},this.copyTextureToTexture3D=function(C,V,se,X,g=0){if(f.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const b=C.max.x-C.min.x+1,D=C.max.y-C.min.y+1,B=C.max.z-C.min.z+1,q=Q.convert(X.format),W=Q.convert(X.type);let te;if(X.isData3DTexture)Xe.setTexture3D(X,0),te=32879;else if(X.isDataArrayTexture)Xe.setTexture2DArray(X,0),te=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}j.pixelStorei(37440,X.flipY),j.pixelStorei(37441,X.premultiplyAlpha),j.pixelStorei(3317,X.unpackAlignment);const oe=j.getParameter(3314),de=j.getParameter(32878),ce=j.getParameter(3316),ge=j.getParameter(3315),De=j.getParameter(32877),Me=se.isCompressedTexture?se.mipmaps[0]:se.image;j.pixelStorei(3314,Me.width),j.pixelStorei(32878,Me.height),j.pixelStorei(3316,C.min.x),j.pixelStorei(3315,C.min.y),j.pixelStorei(32877,C.min.z),se.isDataTexture||se.isData3DTexture?j.texSubImage3D(te,g,V.x,V.y,V.z,b,D,B,q,W,Me.data):se.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),j.compressedTexSubImage3D(te,g,V.x,V.y,V.z,b,D,B,q,Me.data)):j.texSubImage3D(te,g,V.x,V.y,V.z,b,D,B,q,W,Me),j.pixelStorei(3314,oe),j.pixelStorei(32878,de),j.pixelStorei(3316,ce),j.pixelStorei(3315,ge),j.pixelStorei(32877,De),g===0&&X.generateMipmaps&&j.generateMipmap(te),He.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?Xe.setTextureCube(C,0):C.isData3DTexture?Xe.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Xe.setTexture2DArray(C,0):Xe.setTexture2D(C,0),He.unbindTexture()},this.resetState=function(){_=0,y=0,S=null,He.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}}class A_ extends Xi{}A_.prototype.isWebGL1Renderer=!0;class Oc{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Re(e),this.density=t}clone(){return new Oc(this.color,this.density)}toJSON(){return{type:"FogExp2",color:this.color.getHex(),density:this.density}}}class Hn extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class P_{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ql,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=ni()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const xn=new L;class Fc{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyMatrix4(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyNormalMatrix(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.transformDirection(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Hi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Hi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Hi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Hi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),r=vt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),r=vt(r,this.array),s=vt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Lt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Fc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const dh=new L,fh=new ot,ph=new ot,C_=new L,mh=new Le,vs=new L;class R_ extends _e{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new Le,this.bindMatrixInverse=new Le,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Si),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)vs.fromBufferAttribute(t,n),this.applyBoneTransform(n,vs),this.boundingBox.expandByPoint(vs)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Wi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)vs.fromBufferAttribute(t,n),this.applyBoneTransform(n,vs),this.boundingSphere.expandByPoint(vs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ot,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,r=this.geometry;fh.fromBufferAttribute(r.attributes.skinIndex,e),ph.fromBufferAttribute(r.attributes.skinWeight,e),dh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const a=ph.getComponent(s);if(a!==0){const o=fh.getComponent(s);mh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(C_.copy(dh).applyMatrix4(mh),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class uf extends yt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Br extends Gt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=et,u=et,h,d){super(null,a,o,l,c,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const gh=new Le,D_=new Le;class Bc{constructor(e=[],t=[]){this.uuid=ni(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new Le)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Le;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:D_;gh.multiplyMatrices(o,t[s]),gh.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new Bc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Yd(e),e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Br(t,e,e,tn,lt);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this.boneTextureSize=e,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const s=e.bones[n];let a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new uf),this.bones.push(a),this.boneInverses.push(new Le().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.5,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){const a=t[r];e.bones.push(a.uuid);const o=n[r];e.boneInverses.push(o.toArray())}return e}}class vh extends Lt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const xs=new Le,xh=new Le,ro=[],_h=new Si,L_=new Le,Ys=new _e,Zs=new Wi;class I_ extends _e{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new vh(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,L_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Si),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xs),_h.copy(e.boundingBox).applyMatrix4(xs),this.boundingBox.union(_h)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Wi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xs),Zs.copy(e.boundingSphere).applyMatrix4(xs),this.boundingSphere.union(Zs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Ys.geometry=this.geometry,Ys.material=this.material,Ys.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zs.copy(this.boundingSphere),Zs.applyMatrix4(n),e.ray.intersectsSphere(Zs)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,xs),xh.multiplyMatrices(n,xs),Ys.matrixWorld=xh,Ys.raycast(e,ro);for(let a=0,o=ro.length;a<o;a++){const l=ro[a];l.instanceId=s,l.object=this,t.push(l)}ro.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new vh(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Ca extends En{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const yh=new L,wh=new L,Mh=new Le,Tl=new No,so=new Wi;class Zn extends yt{constructor(e=new Ft,t=new Ca){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)yh.fromBufferAttribute(t,r-1),wh.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=yh.distanceTo(wh);e.setAttribute("lineDistance",new dt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),so.copy(n.boundingSphere),so.applyMatrix4(r),so.radius+=s,e.ray.intersectsSphere(so)===!1)return;Mh.copy(r).invert(),Tl.copy(e.ray).applyMatrix4(Mh);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new L,u=new L,h=new L,d=new L,p=this.isLineSegments?2:1,v=n.index,m=n.attributes.position;if(v!==null){const f=Math.max(0,a.start),M=Math.min(v.count,a.start+a.count);for(let _=f,y=M-1;_<y;_+=p){const S=v.getX(_),E=v.getX(_+1);if(c.fromBufferAttribute(m,S),u.fromBufferAttribute(m,E),Tl.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const P=e.ray.origin.distanceTo(d);P<e.near||P>e.far||t.push({distance:P,point:h.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,a.start),M=Math.min(m.count,a.start+a.count);for(let _=f,y=M-1;_<y;_+=p){if(c.fromBufferAttribute(m,_),u.fromBufferAttribute(m,_+1),Tl.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const E=e.ray.origin.distanceTo(d);E<e.near||E>e.far||t.push({distance:E,point:h.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}const Sh=new L,bh=new L;class zc extends Zn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Sh.fromBufferAttribute(t,r),bh.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Sh.distanceTo(bh);e.setAttribute("lineDistance",new dt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class U_ extends Zn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class hf extends En{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Re(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Th=new Le,rc=new No,ao=new Wi,oo=new L;class N_ extends yt{constructor(e=new Ft,t=new hf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ao.copy(n.boundingSphere),ao.applyMatrix4(r),ao.radius+=s,e.ray.intersectsSphere(ao)===!1)return;Th.copy(r).invert(),rc.copy(e.ray).applyMatrix4(Th);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let v=d,x=p;v<x;v++){const m=c.getX(v);oo.fromBufferAttribute(h,m),Eh(oo,m,l,r,e,t,this)}}else{const d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let v=d,x=p;v<x;v++)oo.fromBufferAttribute(h,v),Eh(oo,v,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Eh(i,e,t,n,r,s,a){const o=rc.distanceSqToPoint(i);if(o<t){const l=new L;rc.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class O_ extends Gt{constructor(e,t,n){super({width:e,height:t}),this.isFramebufferTexture=!0,this.format=n,this.magFilter=et,this.minFilter=et,this.generateMipmaps=!1,this.needsUpdate=!0}}class Bo extends Ft{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new L,u=new ye;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const p=n+h/t*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new dt(a,3)),this.setAttribute("normal",new dt(o,3)),this.setAttribute("uv",new dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bo(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class $t extends Ft{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],d=[],p=[];let v=0;const x=[],m=n/2;let f=0;M(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new dt(h,3)),this.setAttribute("normal",new dt(d,3)),this.setAttribute("uv",new dt(p,2));function M(){const y=new L,S=new L;let E=0;const R=(t-e)/n;for(let P=0;P<=s;P++){const w=[],T=P/s,N=T*(t-e)+e;for(let F=0;F<=r;F++){const U=F/r,z=U*l+o,k=Math.sin(z),ee=Math.cos(z);S.x=N*k,S.y=-T*n+m,S.z=N*ee,h.push(S.x,S.y,S.z),y.set(k,R,ee).normalize(),d.push(y.x,y.y,y.z),p.push(U,1-T),w.push(v++)}x.push(w)}for(let P=0;P<r;P++)for(let w=0;w<s;w++){const T=x[w][P],N=x[w+1][P],F=x[w+1][P+1],U=x[w][P+1];u.push(T,N,U),u.push(N,F,U),E+=6}c.addGroup(f,E,0),f+=E}function _(y){const S=v,E=new ye,R=new L;let P=0;const w=y===!0?e:t,T=y===!0?1:-1;for(let F=1;F<=r;F++)h.push(0,m*T,0),d.push(0,T,0),p.push(.5,.5),v++;const N=v;for(let F=0;F<=r;F++){const z=F/r*l+o,k=Math.cos(z),ee=Math.sin(z);R.x=w*ee,R.y=m*T,R.z=w*k,h.push(R.x,R.y,R.z),d.push(0,T,0),E.x=k*.5+.5,E.y=ee*.5*T+.5,p.push(E.x,E.y),v++}for(let F=0;F<r;F++){const U=S+F,z=N+F;y===!0?u.push(z,z+1,U):u.push(z+1,z,U),P+=3}c.addGroup(f,P,y===!0?1:2),f+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $t(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class zo extends Ft{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],a=[];o(r),c(n),u(),this.setAttribute("position",new dt(s,3)),this.setAttribute("normal",new dt(s.slice(),3)),this.setAttribute("uv",new dt(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const _=new L,y=new L,S=new L;for(let E=0;E<t.length;E+=3)p(t[E+0],_),p(t[E+1],y),p(t[E+2],S),l(_,y,S,M)}function l(M,_,y,S){const E=S+1,R=[];for(let P=0;P<=E;P++){R[P]=[];const w=M.clone().lerp(y,P/E),T=_.clone().lerp(y,P/E),N=E-P;for(let F=0;F<=N;F++)F===0&&P===E?R[P][F]=w:R[P][F]=w.clone().lerp(T,F/N)}for(let P=0;P<E;P++)for(let w=0;w<2*(E-P)-1;w++){const T=Math.floor(w/2);w%2===0?(d(R[P][T+1]),d(R[P+1][T]),d(R[P][T])):(d(R[P][T+1]),d(R[P+1][T+1]),d(R[P+1][T]))}}function c(M){const _=new L;for(let y=0;y<s.length;y+=3)_.x=s[y+0],_.y=s[y+1],_.z=s[y+2],_.normalize().multiplyScalar(M),s[y+0]=_.x,s[y+1]=_.y,s[y+2]=_.z}function u(){const M=new L;for(let _=0;_<s.length;_+=3){M.x=s[_+0],M.y=s[_+1],M.z=s[_+2];const y=m(M)/2/Math.PI+.5,S=f(M)/Math.PI+.5;a.push(y,1-S)}v(),h()}function h(){for(let M=0;M<a.length;M+=6){const _=a[M+0],y=a[M+2],S=a[M+4],E=Math.max(_,y,S),R=Math.min(_,y,S);E>.9&&R<.1&&(_<.2&&(a[M+0]+=1),y<.2&&(a[M+2]+=1),S<.2&&(a[M+4]+=1))}}function d(M){s.push(M.x,M.y,M.z)}function p(M,_){const y=M*3;_.x=e[y+0],_.y=e[y+1],_.z=e[y+2]}function v(){const M=new L,_=new L,y=new L,S=new L,E=new ye,R=new ye,P=new ye;for(let w=0,T=0;w<s.length;w+=9,T+=6){M.set(s[w+0],s[w+1],s[w+2]),_.set(s[w+3],s[w+4],s[w+5]),y.set(s[w+6],s[w+7],s[w+8]),E.set(a[T+0],a[T+1]),R.set(a[T+2],a[T+3]),P.set(a[T+4],a[T+5]),S.copy(M).add(_).add(y).divideScalar(3);const N=m(S);x(E,T+0,M,N),x(R,T+2,_,N),x(P,T+4,y,N)}}function x(M,_,y,S){S<0&&M.x===1&&(a[_]=M.x-1),y.x===0&&y.z===0&&(a[_]=S/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function f(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zo(e.vertices,e.indices,e.radius,e.details)}}class kc extends zo{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new kc(e.radius,e.detail)}}class Es extends zo{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Es(e.radius,e.detail)}}class jr extends Ft{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new L,d=new L,p=[],v=[],x=[],m=[];for(let f=0;f<=n;f++){const M=[],_=f/n;let y=0;f===0&&a===0?y=.5/t:f===n&&l===Math.PI&&(y=-.5/t);for(let S=0;S<=t;S++){const E=S/t;h.x=-e*Math.cos(r+E*s)*Math.sin(a+_*o),h.y=e*Math.cos(a+_*o),h.z=e*Math.sin(r+E*s)*Math.sin(a+_*o),v.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),m.push(E+y,1-_),M.push(c++)}u.push(M)}for(let f=0;f<n;f++)for(let M=0;M<t;M++){const _=u[f][M+1],y=u[f][M],S=u[f+1][M],E=u[f+1][M+1];(f!==0||a>0)&&p.push(_,y,E),(f!==n-1||l<Math.PI)&&p.push(y,S,E)}this.setIndex(p),this.setAttribute("position",new dt(v,3)),this.setAttribute("normal",new dt(x,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Lr extends Ft{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const a=[],o=[],l=[],c=[],u=new L,h=new L,d=new L;for(let p=0;p<=n;p++)for(let v=0;v<=r;v++){const x=v/r*s,m=p/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(x),h.y=(e+t*Math.cos(m))*Math.sin(x),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(v/r),c.push(p/n)}for(let p=1;p<=n;p++)for(let v=1;v<=r;v++){const x=(r+1)*p+v-1,m=(r+1)*(p-1)+v-1,f=(r+1)*(p-1)+v,M=(r+1)*p+v;a.push(x,m,M),a.push(m,f,M)}this.setIndex(a),this.setAttribute("position",new dt(o,3)),this.setAttribute("normal",new dt(l,3)),this.setAttribute("uv",new dt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class df extends En{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Re(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class gn extends En{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Uo,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class qi extends gn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ye(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return en(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Re(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Re(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Re(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._iridescence=0,this._transmission=0,this.setValues(e)}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class F_ extends En{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Uo,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}function Ji(i,e,t){return ff(i)?new i.constructor(i.subarray(e,t!==void 0?t:i.length)):i.slice(e,t)}function lo(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function ff(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function B_(i){function e(r,s){return i[r]-i[s]}const t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function Ah(i,e,t){const n=i.length,r=new i.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)r[a++]=i[o+l]}return r}function pf(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push.apply(t,a)),s=i[r++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=i[r++];while(s!==void 0)}class Ra{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class z_ extends Ra{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Au,endingEnd:Au}}intervalChanged_(e,t,n){const r=this.parameterPositions;let s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Pu:s=e,o=2*t-n;break;case Cu:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Pu:a=e,l=2*n-t;break;case Cu:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,p=this._weightNext,v=(n-t)/(r-t),x=v*v,m=x*v,f=-d*m+2*d*x-d*v,M=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*v+1,_=(-1-p)*m+(1.5+p)*x+.5*v,y=p*m-p*x;for(let S=0;S!==o;++S)s[S]=f*a[u+S]+M*a[c+S]+_*a[l+S]+y*a[h+S];return s}}class k_ extends Ra{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(r-t),h=1-u;for(let d=0;d!==o;++d)s[d]=a[c+d]*h+a[l+d]*u;return s}}class H_ extends Ra{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class bi{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=lo(t,this.TimeBufferType),this.values=lo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:lo(e.times,Array),values:lo(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new H_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new k_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new z_(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ga:t=this.InterpolantFactoryMethodDiscrete;break;case Us:t=this.InterpolantFactoryMethodLinear;break;case nl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ga;case this.InterpolantFactoryMethodLinear:return Us;case this.InterpolantFactoryMethodSmooth:return nl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=Ji(n,s,a),this.values=Ji(this.values,s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&ff(r))for(let o=0,l=r.length;o!==l;++o){const c=r[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=Ji(this.times),t=Ji(this.values),n=this.getValueSize(),r=this.getInterpolation()===nl,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(r)l=!0;else{const h=o*n,d=h-n,p=h+n;for(let v=0;v!==n;++v){const x=t[h+v];if(x!==t[d+v]||x!==t[p+v]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let p=0;p!==n;++p)t[d+p]=t[h+p]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=Ji(e,0,a),this.values=Ji(t,0,a*n)):(this.times=e,this.values=t),this}clone(){const e=Ji(this.times,0),t=Ji(this.values,0),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}bi.prototype.TimeBufferType=Float32Array;bi.prototype.ValueBufferType=Float32Array;bi.prototype.DefaultInterpolation=Us;class Hs extends bi{}Hs.prototype.ValueTypeName="bool";Hs.prototype.ValueBufferType=Array;Hs.prototype.DefaultInterpolation=ga;Hs.prototype.InterpolantFactoryMethodLinear=void 0;Hs.prototype.InterpolantFactoryMethodSmooth=void 0;class mf extends bi{}mf.prototype.ValueTypeName="color";class xa extends bi{}xa.prototype.ValueTypeName="number";class G_ extends Ra{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t);let c=e*o;for(let u=c+o;c!==u;c+=4)kt.slerpFlat(s,0,a,c-o,a,c,l);return s}}class Xr extends bi{InterpolantFactoryMethodLinear(e){return new G_(this.times,this.values,this.getValueSize(),e)}}Xr.prototype.ValueTypeName="quaternion";Xr.prototype.DefaultInterpolation=Us;Xr.prototype.InterpolantFactoryMethodSmooth=void 0;class Gs extends bi{}Gs.prototype.ValueTypeName="string";Gs.prototype.ValueBufferType=Array;Gs.prototype.DefaultInterpolation=ga;Gs.prototype.InterpolantFactoryMethodLinear=void 0;Gs.prototype.InterpolantFactoryMethodSmooth=void 0;class _a extends bi{}_a.prototype.ValueTypeName="vector";class V_{constructor(e,t=-1,n,r=lm){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=ni(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(j_(n[a]).scale(r));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,a=n.length;s!==a;++s)t.push(bi.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const u=B_(l);l=Ah(l,1,u),c=Ah(c,1,u),!r&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new xa(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(s);if(u&&u.length>1){const h=u[1];let d=r[h];d||(r[h]=d=[]),d.push(c)}}const a=[];for(const o in r)a.push(this.CreateFromMorphTargetSequence(o,r[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,p,v,x){if(p.length!==0){const m=[],f=[];pf(p,m,f,v),m.length!==0&&x.push(new h(d,m,f))}},r=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let v;for(v=0;v<d.length;v++)if(d[v].morphTargets)for(let x=0;x<d[v].morphTargets.length;x++)p[d[v].morphTargets[x]]=-1;for(const x in p){const m=[],f=[];for(let M=0;M!==d[v].morphTargets.length;++M){const _=d[v];m.push(_.time),f.push(_.morphTarget===x?1:0)}r.push(new xa(".morphTargetInfluence["+x+"]",m,f))}l=p.length*a}else{const p=".bones["+t[h].name+"]";n(_a,p+".position",d,"pos",r),n(Xr,p+".quaternion",d,"rot",r),n(_a,p+".scale",d,"scl",r)}}return r.length===0?null:new this(s,l,r,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function W_(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return xa;case"vector":case"vector2":case"vector3":case"vector4":return _a;case"color":return mf;case"quaternion":return Xr;case"bool":case"boolean":return Hs;case"string":return Gs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function j_(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=W_(i.type);if(i.times===void 0){const t=[],n=[];pf(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Bs={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class X_{constructor(e,t,n){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const p=c[h],v=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return v}return null}}}const q_=new X_;class Yr{constructor(e){this.manager=e!==void 0?e:q_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const Li={};class Y_ extends Error{constructor(e,t){super(e),this.response=t}}class ya extends Yr{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Bs.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Li[e]!==void 0){Li[e].push({onLoad:t,onProgress:n,onError:r});return}Li[e]=[],Li[e].push({onLoad:t,onProgress:n,onError:r});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Li[e],h=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),p=d?parseInt(d):0,v=p!==0;let x=0;const m=new ReadableStream({start(f){M();function M(){h.read().then(({done:_,value:y})=>{if(_)f.close();else{x+=y.byteLength;const S=new ProgressEvent("progress",{lengthComputable:v,loaded:x,total:p});for(let E=0,R=u.length;E<R;E++){const P=u[E];P.onProgress&&P.onProgress(S)}f.enqueue(y),M()}})}}});return new Response(m)}else throw new Y_(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(d);return c.arrayBuffer().then(v=>p.decode(v))}}}).then(c=>{Bs.add(e,c);const u=Li[e];delete Li[e];for(let h=0,d=u.length;h<d;h++){const p=u[h];p.onLoad&&p.onLoad(c)}}).catch(c=>{const u=Li[e];if(u===void 0)throw this.manager.itemError(e),c;delete Li[e];for(let h=0,d=u.length;h<d;h++){const p=u[h];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Z_ extends Yr{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Bs.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o=va("img");function l(){u(),Bs.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(h){u(),r&&r(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class gf extends Yr{constructor(e){super(e)}load(e,t,n,r){const s=this,a=new Br,o=new ya(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(e,function(l){const c=s.parse(l);c&&(c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:pn,a.wrapT=c.wrapT!==void 0?c.wrapT:pn,a.magFilter=c.magFilter!==void 0?c.magFilter:Ue,a.minFilter=c.minFilter!==void 0?c.minFilter:Ue,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.encoding!==void 0&&(a.encoding=c.encoding),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=Gi),c.mipmapCount===1&&(a.minFilter=Ue),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c))},n,r),a}}class Zr extends Yr{constructor(e){super(e)}load(e,t,n,r){const s=new Gt,a=new Z_(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class ko extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const El=new Le,Ph=new L,Ch=new L;class Hc{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.map=null,this.mapPass=null,this.matrix=new Le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Oo,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ph.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ph),Ch.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ch),t.updateMatrixWorld(),El.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(El),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(El)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class K_ extends Hc{constructor(){super(new xt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Os*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class wa extends ko{constructor(e,t,n=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.distance=n,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new K_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Rh=new Le,Ks=new L,Al=new L;class $_ extends Hc{constructor(){super(new xt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ye(4,2),this._viewportCount=6,this._viewports=[new ot(2,1,1,1),new ot(0,1,1,1),new ot(3,1,1,1),new ot(1,1,1,1),new ot(3,0,1,1),new ot(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ks.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ks),Al.copy(n.position),Al.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Al),n.updateMatrixWorld(),r.makeTranslation(-Ks.x,-Ks.y,-Ks.z),Rh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rh)}}class J_ extends ko{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new $_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Q_ extends Hc{constructor(){super(new Pa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ho extends ko{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new Q_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class vf extends ko{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class sc{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,r=e.length;n<r;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class ey extends Yr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Bs.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){Bs.add(e,l),t&&t(l),s.manager.itemEnd(e)}).catch(function(l){r&&r(l),s.manager.itemError(e),s.manager.itemEnd(e)}),s.manager.itemStart(e)}}class Go{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Dh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Dh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Dh(){return(typeof performance>"u"?Date:performance).now()}const Gc="\\[\\]\\.:\\/",ty=new RegExp("["+Gc+"]","g"),Vc="[^"+Gc+"]",ny="[^"+Gc.replace("\\.","")+"]",iy=/((?:WC+[\/:])*)/.source.replace("WC",Vc),ry=/(WCOD+)?/.source.replace("WCOD",ny),sy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Vc),ay=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Vc),oy=new RegExp("^"+iy+ry+sy+ay+"$"),ly=["material","materials","bones","map"];class cy{constructor(e,t,n){const r=n||ht.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ht{constructor(e,t,n){this.path=t,this.parsedPath=n||ht.parseTrackName(t),this.node=ht.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ht.Composite(e,t,n):new ht(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ty,"")}static parseTrackName(e){const t=oy.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);ly.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let s=t.propertyIndex;if(e||(e=ht.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[r];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ht.Composite=cy;ht.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ht.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ht.prototype.GetterByBindingType=[ht.prototype._getValue_direct,ht.prototype._getValue_array,ht.prototype._getValue_arrayElement,ht.prototype._getValue_toArray];ht.prototype.SetterByBindingTypeAndVersioning=[[ht.prototype._setValue_direct,ht.prototype._setValue_direct_setNeedsUpdate,ht.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_array,ht.prototype._setValue_array_setNeedsUpdate,ht.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_arrayElement,ht.prototype._setValue_arrayElement_setNeedsUpdate,ht.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_fromArray,ht.prototype._setValue_fromArray_setNeedsUpdate,ht.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class K{constructor(e){this.value=e}clone(){return new K(this.value.clone===void 0?this.value:this.value.clone())}}class mr{constructor(e,t,n=0,r=1/0){this.ray=new No(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ic,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return ac(e,this,n,t),n.sort(Lh),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)ac(e[r],this,n,t);return n.sort(Lh),n}}function Lh(i,e){return i.distance-e.distance}function ac(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const r=i.children;for(let s=0,a=r.length;s<a;s++)ac(r[s],e,t,!0)}}class Ih{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(en(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Uh=new L;class uy extends yt{constructor(e,t){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new Ft,r=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let a=0,o=1,l=32;a<l;a++,o++){const c=a/l*Math.PI*2,u=o/l*Math.PI*2;r.push(Math.cos(c),Math.sin(c),1,Math.cos(u),Math.sin(u),1)}n.setAttribute("position",new dt(r,3));const s=new Ca({fog:!1,toneMapped:!1});this.cone=new zc(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),Uh.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Uh),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const co=new L,Ut=new Aa;class hy extends zc{constructor(e){const t=new Ft,n=new Ca({color:16777215,vertexColors:!0,toneMapped:!1}),r=[],s=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(v,x){l(v),l(x)}function l(v){r.push(0,0,0),s.push(0,0,0),a[v]===void 0&&(a[v]=[]),a[v].push(r.length/3-1)}t.setAttribute("position",new dt(r,3)),t.setAttribute("color",new dt(s,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();const c=new Re(16755200),u=new Re(16711680),h=new Re(43775),d=new Re(16777215),p=new Re(3355443);this.setColors(c,u,h,d,p)}setColors(e,t,n,r,s){const o=this.geometry.getAttribute("color");o.setXYZ(0,e.r,e.g,e.b),o.setXYZ(1,e.r,e.g,e.b),o.setXYZ(2,e.r,e.g,e.b),o.setXYZ(3,e.r,e.g,e.b),o.setXYZ(4,e.r,e.g,e.b),o.setXYZ(5,e.r,e.g,e.b),o.setXYZ(6,e.r,e.g,e.b),o.setXYZ(7,e.r,e.g,e.b),o.setXYZ(8,e.r,e.g,e.b),o.setXYZ(9,e.r,e.g,e.b),o.setXYZ(10,e.r,e.g,e.b),o.setXYZ(11,e.r,e.g,e.b),o.setXYZ(12,e.r,e.g,e.b),o.setXYZ(13,e.r,e.g,e.b),o.setXYZ(14,e.r,e.g,e.b),o.setXYZ(15,e.r,e.g,e.b),o.setXYZ(16,e.r,e.g,e.b),o.setXYZ(17,e.r,e.g,e.b),o.setXYZ(18,e.r,e.g,e.b),o.setXYZ(19,e.r,e.g,e.b),o.setXYZ(20,e.r,e.g,e.b),o.setXYZ(21,e.r,e.g,e.b),o.setXYZ(22,e.r,e.g,e.b),o.setXYZ(23,e.r,e.g,e.b),o.setXYZ(24,t.r,t.g,t.b),o.setXYZ(25,t.r,t.g,t.b),o.setXYZ(26,t.r,t.g,t.b),o.setXYZ(27,t.r,t.g,t.b),o.setXYZ(28,t.r,t.g,t.b),o.setXYZ(29,t.r,t.g,t.b),o.setXYZ(30,t.r,t.g,t.b),o.setXYZ(31,t.r,t.g,t.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,r.r,r.g,r.b),o.setXYZ(39,r.r,r.g,r.b),o.setXYZ(40,s.r,s.g,s.b),o.setXYZ(41,s.r,s.g,s.b),o.setXYZ(42,s.r,s.g,s.b),o.setXYZ(43,s.r,s.g,s.b),o.setXYZ(44,s.r,s.g,s.b),o.setXYZ(45,s.r,s.g,s.b),o.setXYZ(46,s.r,s.g,s.b),o.setXYZ(47,s.r,s.g,s.b),o.setXYZ(48,s.r,s.g,s.b),o.setXYZ(49,s.r,s.g,s.b),o.needsUpdate=!0}update(){const e=this.geometry,t=this.pointMap,n=1,r=1;Ut.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),Bt("c",t,e,Ut,0,0,-1),Bt("t",t,e,Ut,0,0,1),Bt("n1",t,e,Ut,-n,-r,-1),Bt("n2",t,e,Ut,n,-r,-1),Bt("n3",t,e,Ut,-n,r,-1),Bt("n4",t,e,Ut,n,r,-1),Bt("f1",t,e,Ut,-n,-r,1),Bt("f2",t,e,Ut,n,-r,1),Bt("f3",t,e,Ut,-n,r,1),Bt("f4",t,e,Ut,n,r,1),Bt("u1",t,e,Ut,n*.7,r*1.1,-1),Bt("u2",t,e,Ut,-n*.7,r*1.1,-1),Bt("u3",t,e,Ut,0,r*2,-1),Bt("cf1",t,e,Ut,-n,0,1),Bt("cf2",t,e,Ut,n,0,1),Bt("cf3",t,e,Ut,0,-r,1),Bt("cf4",t,e,Ut,0,r,1),Bt("cn1",t,e,Ut,-n,0,-1),Bt("cn2",t,e,Ut,n,0,-1),Bt("cn3",t,e,Ut,0,-r,-1),Bt("cn4",t,e,Ut,0,r,-1),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function Bt(i,e,t,n,r,s,a){co.set(r,s,a).unproject(n);const o=e[i];if(o!==void 0){const l=t.getAttribute("position");for(let c=0,u=o.length;c<u;c++)l.setXYZ(o[c],co.x,co.y,co.z)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ba}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ba);var ca=function(){var i=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(u){u.preventDefault(),n(++i%e.children.length)},!1);function t(u){return e.appendChild(u.dom),u}function n(u){for(var h=0;h<e.children.length;h++)e.children[h].style.display=h===u?"block":"none";i=u}var r=(performance||Date).now(),s=r,a=0,o=t(new ca.Panel("FPS","#0ff","#002")),l=t(new ca.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=t(new ca.Panel("MB","#f08","#201"));return n(0),{REVISION:16,dom:e,addPanel:t,showPanel:n,begin:function(){r=(performance||Date).now()},end:function(){a++;var u=(performance||Date).now();if(l.update(u-r,200),u>=s+1e3&&(o.update(a*1e3/(u-s),100),s=u,a=0,c)){var h=performance.memory;c.update(h.usedJSHeapSize/1048576,h.jsHeapSizeLimit/1048576)}return u},update:function(){r=this.end()},domElement:e,setMode:n}};ca.Panel=function(i,e,t){var n=1/0,r=0,s=Math.round,a=s(window.devicePixelRatio||1),o=80*a,l=48*a,c=3*a,u=2*a,h=3*a,d=15*a,p=74*a,v=30*a,x=document.createElement("canvas");x.width=o,x.height=l,x.style.cssText="width:80px;height:48px";var m=x.getContext("2d");return m.font="bold "+9*a+"px Helvetica,Arial,sans-serif",m.textBaseline="top",m.fillStyle=t,m.fillRect(0,0,o,l),m.fillStyle=e,m.fillText(i,c,u),m.fillRect(h,d,p,v),m.fillStyle=t,m.globalAlpha=.9,m.fillRect(h,d,p,v),{dom:x,update:function(f,M){n=Math.min(n,f),r=Math.max(r,f),m.fillStyle=t,m.globalAlpha=1,m.fillRect(0,0,o,d),m.fillStyle=e,m.fillText(s(f)+" "+i+" ("+s(n)+"-"+s(r)+")",c,u),m.drawImage(x,h+a,d,p-a,v,h,d,p-a,v),m.fillRect(h+p-a,d,a,v),m.fillStyle=t,m.globalAlpha=.9,m.fillRect(h+p-a,d,a,s((1-f/M)*v))}}};const gr=ca;function Nh(i,e){if(e===cm)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Jl||e===Xd){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,r=[];if(e===Jl)for(let a=1;a<=n;a++)r.push(t.getX(0)),r.push(t.getX(a)),r.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(r.push(t.getX(a)),r.push(t.getX(a+1)),r.push(t.getX(a+2))):(r.push(t.getX(a+2)),r.push(t.getX(a+1)),r.push(t.getX(a)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=i.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class vr extends Yr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new gy(t)}),this.register(function(t){return new Sy(t)}),this.register(function(t){return new by(t)}),this.register(function(t){return new Ty(t)}),this.register(function(t){return new xy(t)}),this.register(function(t){return new _y(t)}),this.register(function(t){return new yy(t)}),this.register(function(t){return new wy(t)}),this.register(function(t){return new my(t)}),this.register(function(t){return new My(t)}),this.register(function(t){return new vy(t)}),this.register(function(t){return new fy(t)}),this.register(function(t){return new Ey(t)}),this.register(function(t){return new Ay(t)})}load(e,t,n,r){const s=this;let a;this.resourcePath!==""?a=this.resourcePath:this.path!==""?a=this.path:a=sc.extractUrlBase(e),this.manager.itemStart(e);const o=function(c){r?r(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new ya(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(u){t(u),s.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let s;const a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===xf){try{a[nt.KHR_BINARY_GLTF]=new Py(e)}catch(h){r&&r(h);return}s=JSON.parse(a[nt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Hy(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](c);o[h.name]=h,a[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const h=s.extensionsUsed[u],d=s.extensionsRequired||[];switch(h){case nt.KHR_MATERIALS_UNLIT:a[h]=new py;break;case nt.KHR_DRACO_MESH_COMPRESSION:a[h]=new Cy(s,this.dracoLoader);break;case nt.KHR_TEXTURE_TRANSFORM:a[h]=new Ry;break;case nt.KHR_MESH_QUANTIZATION:a[h]=new Dy;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){const n=this;return new Promise(function(r,s){n.parse(e,t,r,s)})}}function dy(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const nt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class fy{constructor(e){this.parser=e,this.name=nt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let r=t.cache.get(n);if(r)return r;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new Re(16777215);l.color!==void 0&&u.fromArray(l.color);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ho(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new J_(u),c.distance=h;break;case"spot":c=new wa(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,rr(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),r=Promise.resolve(c),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class py{constructor(){this.name=nt.KHR_MATERIALS_UNLIT}getMaterialType(){return xi}extendParams(e,t,n){const r=[];e.color=new Re(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;e.color.fromArray(a),e.opacity=a[3]}s.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",s.baseColorTexture,ke))}return Promise.all(r)}}class my{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class gy{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qi}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],a=r.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ye(o,o)}return Promise.all(s)}}class vy{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qi}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],a=r.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class xy{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qi}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Re(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=r.extensions[this.name];return a.sheenColorFactor!==void 0&&t.sheenColor.fromArray(a.sheenColorFactor),a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,ke)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class _y{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qi}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],a=r.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class yy{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qi}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],a=r.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Re(o[0],o[1],o[2]),Promise.all(s)}}class wy{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qi}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class My{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qi}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],a=r.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Re(o[0],o[1],o[2]),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,ke)),Promise.all(s)}}class Sy{constructor(e){this.parser=e,this.name=nt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;const s=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}}class by{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=r.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Ty{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=r.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Ey{constructor(e){this.name=nt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const r=n.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const l=r.byteOffset||0,c=r.byteLength||0,u=r.count,h=r.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,r.mode,r.filter).then(function(p){return p.buffer}):a.ready.then(function(){const p=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(p),u,h,d,r.mode,r.filter),p})})}else return null}}class Ay{constructor(e){this.name=nt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const r=t.meshes[n.mesh];for(const c of r.primitives)if(c.mode!==Un.TRIANGLES&&c.mode!==Un.TRIANGLE_STRIP&&c.mode!==Un.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,p=[];for(const v of h){const x=new Le,m=new L,f=new kt,M=new L(1,1,1),_=new I_(v.geometry,v.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&f.fromBufferAttribute(l.ROTATION,y),l.SCALE&&M.fromBufferAttribute(l.SCALE,y),_.setMatrixAt(y,x.compose(m,f,M));for(const y in l)y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&v.geometry.setAttribute(y,l[y]);yt.prototype.copy.call(_,v),this.parser.assignFinalMaterial(_),p.push(_)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}}const xf="glTF",$s=12,Oh={JSON:1313821514,BIN:5130562};class Py{constructor(e){this.name=nt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,$s),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==xf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-$s,s=new DataView(e,$s);let a=0;for(;a<r;){const o=s.getUint32(a,!0);a+=4;const l=s.getUint32(a,!0);if(a+=4,l===Oh.JSON){const c=new Uint8Array(e,$s+a,o);this.content=n.decode(c)}else if(l===Oh.BIN){const c=$s+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Cy{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=nt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const u in a){const h=oc[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=oc[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[e.attributes[u]],p=Ds[d.componentType];c[h]=p.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h){r.decodeDracoFile(u,function(d){for(const p in d.attributes){const v=d.attributes[p],x=l[p];x!==void 0&&(v.normalized=x)}h(d)},o,c)})})}}class Ry{constructor(){this.name=nt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Dy{constructor(){this.name=nt.KHR_MESH_QUANTIZATION}}class _f extends Ra{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let a=0;a!==r;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=r-t,h=(n-t)/u,d=h*h,p=d*h,v=e*c,x=v-c,m=-2*p+3*d,f=p-d,M=1-m,_=f-d+h;for(let y=0;y!==o;y++){const S=a[x+y+o],E=a[x+y+l]*u,R=a[v+y+o],P=a[v+y]*u;s[y]=M*S+_*E+m*R+f*P}return s}}const Ly=new kt;class Iy extends _f{interpolate_(e,t,n,r){const s=super.interpolate_(e,t,n,r);return Ly.fromArray(s).normalize().toArray(s),s}}const Un={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Ds={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Fh={9728:et,9729:Ue,9984:$l,9985:jd,9986:_o,9987:Gi},Bh={33071:pn,33648:bo,10497:mn},Pl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},oc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Qi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Uy={CUBICSPLINE:void 0,LINEAR:Us,STEP:ga},Cl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Ny(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new gn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ri})),i.DefaultMaterial}function Js(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function rr(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Oy(i,e,t){let n=!1,r=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(r=!0),h.COLOR_0!==void 0&&(s=!0),n&&r&&s)break}if(!n&&!r&&!s)return Promise.resolve(i);const a=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){const h=e[c];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(r){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(s){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],d=c[2];return n&&(i.morphAttributes.position=u),r&&(i.morphAttributes.normal=h),s&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function Fy(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function By(i){const e=i.extensions&&i.extensions[nt.KHR_DRACO_MESH_COMPRESSION];let t;return e?t="draco:"+e.bufferView+":"+e.indices+":"+zh(e.attributes):t=i.indices+":"+zh(i.attributes)+":"+i.mode,t}function zh(i){let e="";const t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function lc(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function zy(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const ky=new Le;class Hy{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new dy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,r=navigator.userAgent.indexOf("Firefox")>-1,s=r?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||r&&s<98?this.textureLoader=new Zr(this.options.manager):this.textureLoader=new ey(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ya(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][r.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:r.asset,parser:n,userData:{}};Js(s,o,r),rr(o,r),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){const a=t[r].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let r=0,s=e.length;r<s;r++){const a=e[r];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const r=n.clone(),s=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,u]of a.children.entries())s(u,o.children[c])};return s(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const r=e(t[n]);if(r)return r}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let r=0;r<t.length;r++){const s=e(t[r]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[nt.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(s,a){n.load(sc.resolveURL(t.uri,r.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const r=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+r)})}loadAccessor(e){const t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){const a=Pl[r.type],o=Ds[r.componentType],l=r.normalized===!0,c=new o(r.count*a);return Promise.resolve(new Lt(c,a,l))}const s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],l=Pl[r.type],c=Ds[r.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=r.byteOffset||0,p=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,v=r.normalized===!0;let x,m;if(p&&p!==h){const f=Math.floor(d/p),M="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+f+":"+r.count;let _=t.cache.get(M);_||(x=new c(o,f*p,r.count*p/u),_=new P_(x,p/u),t.cache.add(M,_)),m=new Fc(_,l,d%p/u,v)}else o===null?x=new c(r.count*l):x=new c(o,d,r.count*l),m=new Lt(x,l,v);if(r.sparse!==void 0){const f=Pl.SCALAR,M=Ds[r.sparse.indices.componentType],_=r.sparse.indices.byteOffset||0,y=r.sparse.values.byteOffset||0,S=new M(a[1],_,r.sparse.count*f),E=new c(a[2],y,r.sparse.count*l);o!==null&&(m=new Lt(m.array.slice(),m.itemSize,m.normalized));for(let R=0,P=S.length;R<P;R++){const w=S[R];if(m.setX(w,E[R*l]),l>=2&&m.setY(w,E[R*l+1]),l>=3&&m.setZ(w,E[R*l+2]),l>=4&&m.setW(w,E[R*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){const r=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const d=(s.samplers||{})[a.sampler]||{};return u.magFilter=Fh[d.magFilter]||Ue,u.minFilter=Fh[d.minFilter]||Gi,u.wrapS=Bh[d.wrapS]||mn,u.wrapT=Bh[d.wrapT]||mn,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=r.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(h){c=!0;const d=new Blob([h],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(h){return new Promise(function(d,p){let v=d;t.isImageBitmapLoader===!0&&(v=function(x){const m=new Gt(x);m.needsUpdate=!0,d(m)}),t.load(sc.resolveURL(h,s.path),v,void 0,p)})}).then(function(h){return c===!0&&o.revokeObjectURL(l),h.userData.mimeType=a.mimeType||zy(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,r){const s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[nt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[nt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=s.associations.get(a);a=s.extensions[nt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return r!==void 0&&(a.encoding=r),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new hf,En.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Ca,En.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(r||s||a){let o="ClonedMaterial:"+n.uuid+":";r&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),r&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return gn}loadMaterial(e){const t=this,n=this.json,r=this.extensions,s=n.materials[e];let a;const o={},l=s.extensions||{},c=[];if(l[nt.KHR_MATERIALS_UNLIT]){const h=r[nt.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),c.push(h.extendParams(o,s,t))}else{const h=s.pbrMetallicRoughness||{};if(o.color=new Re(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.fromArray(d),o.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",h.baseColorTexture,ke)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=fn);const u=s.alphaMode||Cl.OPAQUE;if(u===Cl.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Cl.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==xi&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ye(1,1),s.normalTexture.scale!==void 0)){const h=s.normalTexture.scale;o.normalScale.set(h,h)}return s.occlusionTexture!==void 0&&a!==xi&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==xi&&(o.emissive=new Re().fromArray(s.emissiveFactor)),s.emissiveTexture!==void 0&&a!==xi&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,ke)),Promise.all(c).then(function(){const h=new a(o);return s.name&&(h.name=s.name),rr(h,s),t.associations.set(h,{materials:e}),s.extensions&&Js(r,h,s),h})}createUniqueName(e){const t=ht.sanitizeNodeName(e||"");let n=t;for(let r=1;this.nodeNamesUsed[n];++r)n=t+"_"+r;return this.nodeNamesUsed[n]=!0,n}loadGeometries(e){const t=this,n=this.extensions,r=this.primitiveCache;function s(o){return n[nt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return kh(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],u=By(c),h=r[u];if(h)a.push(h.promise);else{let d;c.extensions&&c.extensions[nt.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=kh(new Ft,c,t),r[u]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,r=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const u=a[l].material===void 0?Ny(this.cache):this.getDependency("material",a[l].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let p=0,v=u.length;p<v;p++){const x=u[p],m=a[p];let f;const M=c[p];if(m.mode===Un.TRIANGLES||m.mode===Un.TRIANGLE_STRIP||m.mode===Un.TRIANGLE_FAN||m.mode===void 0)f=s.isSkinnedMesh===!0?new R_(x,M):new _e(x,M),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===Un.TRIANGLE_STRIP?f.geometry=Nh(f.geometry,Xd):m.mode===Un.TRIANGLE_FAN&&(f.geometry=Nh(f.geometry,Jl));else if(m.mode===Un.LINES)f=new zc(x,M);else if(m.mode===Un.LINE_STRIP)f=new Zn(x,M);else if(m.mode===Un.LINE_LOOP)f=new U_(x,M);else if(m.mode===Un.POINTS)f=new N_(x,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&Fy(f,s),f.name=t.createUniqueName(s.name||"mesh_"+e),rr(f,s),m.extensions&&Js(r,f,m),t.assignFinalMaterial(f),h.push(f)}for(let p=0,v=h.length;p<v;p++)t.associations.set(h[p],{meshes:e,primitives:p});if(h.length===1)return h[0];const d=new nn;t.associations.set(d,{meshes:e});for(let p=0,v=h.length;p<v;p++)d.add(h[p]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new xt(Nt.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new Pa(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),rr(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let r=0,s=t.joints.length;r<s;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){const s=r.pop(),a=r,o=[],l=[];for(let c=0,u=a.length;c<u;c++){const h=a[c];if(h){o.push(h);const d=new Le;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Bc(o,l)})}loadAnimation(e){const n=this.json.animations[e],r=n.name?n.name:"animation_"+e,s=[],a=[],o=[],l=[],c=[];for(let u=0,h=n.channels.length;u<h;u++){const d=n.channels[u],p=n.samplers[d.sampler],v=d.target,x=v.node,m=n.parameters!==void 0?n.parameters[p.input]:p.input,f=n.parameters!==void 0?n.parameters[p.output]:p.output;v.node!==void 0&&(s.push(this.getDependency("node",x)),a.push(this.getDependency("accessor",m)),o.push(this.getDependency("accessor",f)),l.push(p),c.push(v))}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c)]).then(function(u){const h=u[0],d=u[1],p=u[2],v=u[3],x=u[4],m=[];for(let f=0,M=h.length;f<M;f++){const _=h[f],y=d[f],S=p[f],E=v[f],R=x[f];if(_===void 0)continue;_.updateMatrix();let P;switch(Qi[R.path]){case Qi.weights:P=xa;break;case Qi.rotation:P=Xr;break;case Qi.position:case Qi.scale:default:P=_a;break}const w=_.name?_.name:_.uuid,T=E.interpolation!==void 0?Uy[E.interpolation]:Us,N=[];Qi[R.path]===Qi.weights?_.traverse(function(U){U.morphTargetInfluences&&N.push(U.name?U.name:U.uuid)}):N.push(w);let F=S.array;if(S.normalized){const U=lc(F.constructor),z=new Float32Array(F.length);for(let k=0,ee=F.length;k<ee;k++)z[k]=F[k]*U;F=z}for(let U=0,z=N.length;U<z;U++){const k=new P(N[U]+"."+Qi[R.path],y.array,F,T);E.interpolation==="CUBICSPLINE"&&(k.createInterpolant=function($){const Y=this instanceof Xr?Iy:_f;return new Y(this.times,this.values,this.getValueSize()/3,$)},k.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),m.push(k)}}return new V_(r,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(s){const a=n._getNodeRef(n.meshCache,r.mesh,s);return r.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=r.weights.length;l<c;l++)o.morphTargetInfluences[l]=r.weights[l]}),a})}loadNode(e){const t=this.json,n=this,r=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=r.children||[];for(let c=0,u=o.length;c<u;c++)a.push(n.getDependency("node",o[c]));const l=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){const u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(p){p.isSkinnedMesh&&p.bind(d,ky)});for(let p=0,v=h.length;p<v;p++)u.add(h[p]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],a=s.name?r.createUniqueName(s.name):"",o=[],l=r._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(r.getDependency("camera",s.camera).then(function(c){return r._getNodeRef(r.cameraCache,s.camera,c)})),r._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let u;if(s.isBone===!0?u=new uf:c.length>1?u=new nn:c.length===1?u=c[0]:u=new yt,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(s.name&&(u.userData.name=s.name,u.name=a),rr(u,s),s.extensions&&Js(n,u,s),s.matrix!==void 0){const h=new Le;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return r.associations.has(u)||r.associations.set(u,{}),r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],r=this,s=new nn;n.name&&(s.name=r.createUniqueName(n.name)),rr(s,n),n.extensions&&Js(t,s,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(r.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let u=0,h=l.length;u<h;u++)s.add(l[u]);const c=u=>{const h=new Map;for(const[d,p]of r.associations)(d instanceof En||d instanceof Gt)&&h.set(d,p);return u.traverse(d=>{const p=r.associations.get(d);p!=null&&h.set(d,p)}),h};return r.associations=c(s),s})}}function Gy(i,e,t){const n=e.attributes,r=new Si;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(r.set(new L(l[0],l[1],l[2]),new L(c[0],c[1],c[2])),o.normalized){const u=lc(Ds[o.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new L,l=new L;for(let c=0,u=s.length;c<u;c++){const h=s[c];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],p=d.min,v=d.max;if(p!==void 0&&v!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(v[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(v[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(v[2]))),d.normalized){const x=lc(Ds[d.componentType]);l.multiplyScalar(x)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(o)}i.boundingBox=r;const a=new Wi;r.getCenter(a.center),a.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=a}function kh(i,e,t){const n=e.attributes,r=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(const a in n){const o=oc[a]||a.toLowerCase();o in i.attributes||r.push(s(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});r.push(a)}return rr(i,e),Gy(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?Oy(i,e.targets,t):i})}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.6.9
*/var Hh=function(i){return URL.createObjectURL(new Blob([i],{type:"text/javascript"}))};try{URL.revokeObjectURL(Hh(""))}catch{Hh=function(e){return"data:application/javascript;charset=UTF-8,"+encodeURI(e)}}var Fn=Uint8Array,lr=Uint16Array,cc=Uint32Array,yf=new Fn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),wf=new Fn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Vy=new Fn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Mf=function(i,e){for(var t=new lr(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var r=new cc(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)r[s]=s-t[n]<<5|n;return[t,r]},Sf=Mf(yf,2),bf=Sf[0],Wy=Sf[1];bf[28]=258,Wy[258]=28;var jy=Mf(wf,0),Xy=jy[0],uc=new lr(32768);for(var Et=0;Et<32768;++Et){var er=(Et&43690)>>>1|(Et&21845)<<1;er=(er&52428)>>>2|(er&13107)<<2,er=(er&61680)>>>4|(er&3855)<<4,uc[Et]=((er&65280)>>>8|(er&255)<<8)>>>1}var ua=function(i,e,t){for(var n=i.length,r=0,s=new lr(e);r<n;++r)++s[i[r]-1];var a=new lr(e);for(r=0;r<e;++r)a[r]=a[r-1]+s[r-1]<<1;var o;if(t){o=new lr(1<<e);var l=15-e;for(r=0;r<n;++r)if(i[r])for(var c=r<<4|i[r],u=e-i[r],h=a[i[r]-1]++<<u,d=h|(1<<u)-1;h<=d;++h)o[uc[h]>>>l]=c}else for(o=new lr(n),r=0;r<n;++r)i[r]&&(o[r]=uc[a[i[r]-1]++]>>>15-i[r]);return o},Da=new Fn(288);for(var Et=0;Et<144;++Et)Da[Et]=8;for(var Et=144;Et<256;++Et)Da[Et]=9;for(var Et=256;Et<280;++Et)Da[Et]=7;for(var Et=280;Et<288;++Et)Da[Et]=8;var Tf=new Fn(32);for(var Et=0;Et<32;++Et)Tf[Et]=5;var qy=ua(Da,9,1),Yy=ua(Tf,5,1),Rl=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},jn=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},Dl=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},Zy=function(i){return(i/8|0)+(i&7&&1)},Ky=function(i,e,t){(e==null||e<0)&&(e=0),(t==null||t>i.length)&&(t=i.length);var n=new(i instanceof lr?lr:i instanceof cc?cc:Fn)(t-e);return n.set(i.subarray(e,t)),n},$y=function(i,e,t){var n=i.length;if(!n||t&&!t.l&&n<5)return e||new Fn(0);var r=!e||t,s=!t||t.i;t||(t={}),e||(e=new Fn(n*3));var a=function(he){var j=e.length;if(he>j){var Fe=new Fn(Math.max(j*2,he));Fe.set(e),e=Fe}},o=t.f||0,l=t.p||0,c=t.b||0,u=t.l,h=t.d,d=t.m,p=t.n,v=n*8;do{if(!u){t.f=o=jn(i,l,1);var x=jn(i,l+1,3);if(l+=3,x)if(x==1)u=qy,h=Yy,d=9,p=5;else if(x==2){var _=jn(i,l,31)+257,y=jn(i,l+10,15)+4,S=_+jn(i,l+5,31)+1;l+=14;for(var E=new Fn(S),R=new Fn(19),P=0;P<y;++P)R[Vy[P]]=jn(i,l+P*3,7);l+=y*3;for(var w=Rl(R),T=(1<<w)-1,N=ua(R,w,1),P=0;P<S;){var F=N[jn(i,l,T)];l+=F&15;var m=F>>>4;if(m<16)E[P++]=m;else{var U=0,z=0;for(m==16?(z=3+jn(i,l,3),l+=2,U=E[P-1]):m==17?(z=3+jn(i,l,7),l+=3):m==18&&(z=11+jn(i,l,127),l+=7);z--;)E[P++]=U}}var k=E.subarray(0,_),ee=E.subarray(_);d=Rl(k),p=Rl(ee),u=ua(k,d,1),h=ua(ee,p,1)}else throw"invalid block type";else{var m=Zy(l)+4,f=i[m-4]|i[m-3]<<8,M=m+f;if(M>n){if(s)throw"unexpected EOF";break}r&&a(c+f),e.set(i.subarray(m,M),c),t.b=c+=f,t.p=l=M*8;continue}if(l>v){if(s)throw"unexpected EOF";break}}r&&a(c+131072);for(var $=(1<<d)-1,Y=(1<<p)-1,ne=l;;ne=l){var U=u[Dl(i,l)&$],J=U>>>4;if(l+=U&15,l>v){if(s)throw"unexpected EOF";break}if(!U)throw"invalid length/literal";if(J<256)e[c++]=J;else if(J==256){ne=l,u=null;break}else{var be=J-254;if(J>264){var P=J-257,ae=yf[P];be=jn(i,l,(1<<ae)-1)+bf[P],l+=ae}var Z=h[Dl(i,l)&Y],re=Z>>>4;if(!Z)throw"invalid distance";l+=Z&15;var ee=Xy[re];if(re>3){var ae=wf[re];ee+=Dl(i,l)&(1<<ae)-1,l+=ae}if(l>v){if(s)throw"unexpected EOF";break}r&&a(c+131072);for(var pe=c+be;c<pe;c+=4)e[c]=e[c-ee],e[c+1]=e[c+1-ee],e[c+2]=e[c+2-ee],e[c+3]=e[c+3-ee];c=pe}}t.l=u,t.p=ne,t.b=c,u&&(o=1,t.m=d,t.d=h,t.n=p)}while(!o);return c==e.length?e:Ky(e,0,c)},Jy=new Fn(0),Qy=function(i){if((i[0]&15)!=8||i[0]>>>4>7||(i[0]<<8|i[1])%31)throw"invalid zlib data";if(i[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function uo(i,e){return $y((Qy(i),i.subarray(2,-4)),e)}var ew=typeof TextDecoder<"u"&&new TextDecoder,tw=0;try{ew.decode(Jy,{stream:!0}),tw=1}catch{}class Vo extends gf{constructor(e){super(e),this.type=_t}parse(e){const w=Math.pow(2.7182818,2.2);function T(g,b){let D=0;for(let q=0;q<65536;++q)(q==0||g[q>>3]&1<<(q&7))&&(b[D++]=q);const B=D-1;for(;D<65536;)b[D++]=0;return B}function N(g){for(let b=0;b<16384;b++)g[b]={},g[b].len=0,g[b].lit=0,g[b].p=null}const F={l:0,c:0,lc:0};function U(g,b,D,B,q){for(;D<g;)b=b<<8|ze(B,q),D+=8;D-=g,F.l=b>>D&(1<<g)-1,F.c=b,F.lc=D}const z=new Array(59);function k(g){for(let D=0;D<=58;++D)z[D]=0;for(let D=0;D<65537;++D)z[g[D]]+=1;let b=0;for(let D=58;D>0;--D){const B=b+z[D]>>1;z[D]=b,b=B}for(let D=0;D<65537;++D){const B=g[D];B>0&&(g[D]=B|z[B]++<<6)}}function ee(g,b,D,B,q,W){const te=b;let oe=0,de=0;for(;B<=q;B++){if(te.value-b.value>D)return!1;U(6,oe,de,g,te);const ce=F.l;if(oe=F.c,de=F.lc,W[B]=ce,ce==63){if(te.value-b.value>D)throw new Error("Something wrong with hufUnpackEncTable");U(8,oe,de,g,te);let ge=F.l+6;if(oe=F.c,de=F.lc,B+ge>q+1)throw new Error("Something wrong with hufUnpackEncTable");for(;ge--;)W[B++]=0;B--}else if(ce>=59){let ge=ce-59+2;if(B+ge>q+1)throw new Error("Something wrong with hufUnpackEncTable");for(;ge--;)W[B++]=0;B--}}k(W)}function $(g){return g&63}function Y(g){return g>>6}function ne(g,b,D,B){for(;b<=D;b++){const q=Y(g[b]),W=$(g[b]);if(q>>W)throw new Error("Invalid table entry");if(W>14){const te=B[q>>W-14];if(te.len)throw new Error("Invalid table entry");if(te.lit++,te.p){const oe=te.p;te.p=new Array(te.lit);for(let de=0;de<te.lit-1;++de)te.p[de]=oe[de]}else te.p=new Array(1);te.p[te.lit-1]=b}else if(W){let te=0;for(let oe=1<<14-W;oe>0;oe--){const de=B[(q<<14-W)+te];if(de.len||de.p)throw new Error("Invalid table entry");de.len=W,de.lit=b,te++}}}return!0}const J={c:0,lc:0};function be(g,b,D,B){g=g<<8|ze(D,B),b+=8,J.c=g,J.lc=b}const ae={c:0,lc:0};function Z(g,b,D,B,q,W,te,oe,de){if(g==b){B<8&&(be(D,B,q,W),D=J.c,B=J.lc),B-=8;let ce=D>>B;if(ce=new Uint8Array([ce])[0],oe.value+ce>de)return!1;const ge=te[oe.value-1];for(;ce-- >0;)te[oe.value++]=ge}else if(oe.value<de)te[oe.value++]=g;else return!1;ae.c=D,ae.lc=B}function re(g){return g&65535}function pe(g){const b=re(g);return b>32767?b-65536:b}const he={a:0,b:0};function j(g,b){const D=pe(g),q=pe(b),W=D+(q&1)+(q>>1),te=W,oe=W-q;he.a=te,he.b=oe}function Fe(g,b){const D=re(g),B=re(b),q=D-(B>>1)&65535,W=B+q-32768&65535;he.a=W,he.b=q}function ve(g,b,D,B,q,W,te){const oe=te<16384,de=D>q?q:D;let ce=1,ge,De;for(;ce<=de;)ce<<=1;for(ce>>=1,ge=ce,ce>>=1;ce>=1;){De=0;const Me=De+W*(q-ge),Se=W*ce,qe=W*ge,Te=B*ce,Oe=B*ge;let Ye,pt,Tt,ut;for(;De<=Me;De+=qe){let it=De;const $e=De+B*(D-ge);for(;it<=$e;it+=Oe){const rt=it+Te,an=it+Se,Vt=an+Te;oe?(j(g[it+b],g[an+b]),Ye=he.a,Tt=he.b,j(g[rt+b],g[Vt+b]),pt=he.a,ut=he.b,j(Ye,pt),g[it+b]=he.a,g[rt+b]=he.b,j(Tt,ut),g[an+b]=he.a,g[Vt+b]=he.b):(Fe(g[it+b],g[an+b]),Ye=he.a,Tt=he.b,Fe(g[rt+b],g[Vt+b]),pt=he.a,ut=he.b,Fe(Ye,pt),g[it+b]=he.a,g[rt+b]=he.b,Fe(Tt,ut),g[an+b]=he.a,g[Vt+b]=he.b)}if(D&ce){const rt=it+Se;oe?j(g[it+b],g[rt+b]):Fe(g[it+b],g[rt+b]),Ye=he.a,g[rt+b]=he.b,g[it+b]=Ye}}if(q&ce){let it=De;const $e=De+B*(D-ge);for(;it<=$e;it+=Oe){const rt=it+Te;oe?j(g[it+b],g[rt+b]):Fe(g[it+b],g[rt+b]),Ye=he.a,g[rt+b]=he.b,g[it+b]=Ye}}ge=ce,ce>>=1}return De}function ue(g,b,D,B,q,W,te,oe,de){let ce=0,ge=0;const De=te,Me=Math.trunc(B.value+(q+7)/8);for(;B.value<Me;)for(be(ce,ge,D,B),ce=J.c,ge=J.lc;ge>=14;){const qe=ce>>ge-14&16383,Te=b[qe];if(Te.len)ge-=Te.len,Z(Te.lit,W,ce,ge,D,B,oe,de,De),ce=ae.c,ge=ae.lc;else{if(!Te.p)throw new Error("hufDecode issues");let Oe;for(Oe=0;Oe<Te.lit;Oe++){const Ye=$(g[Te.p[Oe]]);for(;ge<Ye&&B.value<Me;)be(ce,ge,D,B),ce=J.c,ge=J.lc;if(ge>=Ye&&Y(g[Te.p[Oe]])==(ce>>ge-Ye&(1<<Ye)-1)){ge-=Ye,Z(Te.p[Oe],W,ce,ge,D,B,oe,de,De),ce=ae.c,ge=ae.lc;break}}if(Oe==Te.lit)throw new Error("hufDecode issues")}}const Se=8-q&7;for(ce>>=Se,ge-=Se;ge>0;){const qe=b[ce<<14-ge&16383];if(qe.len)ge-=qe.len,Z(qe.lit,W,ce,ge,D,B,oe,de,De),ce=ae.c,ge=ae.lc;else throw new Error("hufDecode issues")}return!0}function He(g,b,D,B,q,W){const te={value:0},oe=D.value,de=we(b,D),ce=we(b,D);D.value+=4;const ge=we(b,D);if(D.value+=4,de<0||de>=65537||ce<0||ce>=65537)throw new Error("Something wrong with HUF_ENCSIZE");const De=new Array(65537),Me=new Array(16384);N(Me);const Se=B-(D.value-oe);if(ee(g,D,Se,de,ce,De),ge>8*(B-(D.value-oe)))throw new Error("Something wrong with hufUncompress");ne(De,de,ce,Me),ue(De,Me,g,D,ge,ce,W,q,te)}function Ke(g,b,D){for(let B=0;B<D;++B)b[B]=g[b[B]]}function Be(g){for(let b=1;b<g.length;b++){const D=g[b-1]+g[b]-128;g[b]=D}}function Xe(g,b){let D=0,B=Math.floor((g.length+1)/2),q=0;const W=g.length-1;for(;!(q>W||(b[q++]=g[D++],q>W));)b[q++]=g[B++]}function Mt(g){let b=g.byteLength;const D=new Array;let B=0;const q=new DataView(g);for(;b>0;){const W=q.getInt8(B++);if(W<0){const te=-W;b-=te+1;for(let oe=0;oe<te;oe++)D.push(q.getUint8(B++))}else{const te=W;b-=2;const oe=q.getUint8(B++);for(let de=0;de<te+1;de++)D.push(oe)}}return D}function St(g,b,D,B,q,W){let te=new DataView(W.buffer);const oe=D[g.idx[0]].width,de=D[g.idx[0]].height,ce=3,ge=Math.floor(oe/8),De=Math.ceil(oe/8),Me=Math.ceil(de/8),Se=oe-(De-1)*8,qe=de-(Me-1)*8,Te={value:0},Oe=new Array(ce),Ye=new Array(ce),pt=new Array(ce),Tt=new Array(ce),ut=new Array(ce);for(let $e=0;$e<ce;++$e)ut[$e]=b[g.idx[$e]],Oe[$e]=$e<1?0:Oe[$e-1]+De*Me,Ye[$e]=new Float32Array(64),pt[$e]=new Uint16Array(64),Tt[$e]=new Uint16Array(De*64);for(let $e=0;$e<Me;++$e){let rt=8;$e==Me-1&&(rt=qe);let an=8;for(let st=0;st<De;++st){st==De-1&&(an=Se);for(let wt=0;wt<ce;++wt)pt[wt].fill(0),pt[wt][0]=q[Oe[wt]++],It(Te,B,pt[wt]),Ct(pt[wt],Ye[wt]),tt(Ye[wt]);ft(Ye);for(let wt=0;wt<ce;++wt)Yt(Ye[wt],Tt[wt],st*64)}let Vt=0;for(let st=0;st<ce;++st){const wt=D[g.idx[st]].type;for(let Ti=8*$e;Ti<8*$e+rt;++Ti){Vt=ut[st][Ti];for(let Vs=0;Vs<ge;++Vs){const ai=Vs*64+(Ti&7)*8;te.setUint16(Vt+0*2*wt,Tt[st][ai+0],!0),te.setUint16(Vt+1*2*wt,Tt[st][ai+1],!0),te.setUint16(Vt+2*2*wt,Tt[st][ai+2],!0),te.setUint16(Vt+3*2*wt,Tt[st][ai+3],!0),te.setUint16(Vt+4*2*wt,Tt[st][ai+4],!0),te.setUint16(Vt+5*2*wt,Tt[st][ai+5],!0),te.setUint16(Vt+6*2*wt,Tt[st][ai+6],!0),te.setUint16(Vt+7*2*wt,Tt[st][ai+7],!0),Vt+=8*2*wt}}if(ge!=De)for(let Ti=8*$e;Ti<8*$e+rt;++Ti){const Vs=ut[st][Ti]+8*ge*2*wt,ai=ge*64+(Ti&7)*8;for(let Fa=0;Fa<an;++Fa)te.setUint16(Vs+Fa*2*wt,Tt[st][ai+Fa],!0)}}}const it=new Uint16Array(oe);te=new DataView(W.buffer);for(let $e=0;$e<ce;++$e){D[g.idx[$e]].decoded=!0;const rt=D[g.idx[$e]].type;if(D[$e].type==2)for(let an=0;an<de;++an){const Vt=ut[$e][an];for(let st=0;st<oe;++st)it[st]=te.getUint16(Vt+st*2*rt,!0);for(let st=0;st<oe;++st)te.setFloat32(Vt+st*2*rt,H(it[st]),!0)}}}function It(g,b,D){let B,q=1;for(;q<64;)B=b[g.value],B==65280?q=64:B>>8==255?q+=B&255:(D[q]=B,q++),g.value++}function Ct(g,b){b[0]=H(g[0]),b[1]=H(g[1]),b[2]=H(g[5]),b[3]=H(g[6]),b[4]=H(g[14]),b[5]=H(g[15]),b[6]=H(g[27]),b[7]=H(g[28]),b[8]=H(g[2]),b[9]=H(g[4]),b[10]=H(g[7]),b[11]=H(g[13]),b[12]=H(g[16]),b[13]=H(g[26]),b[14]=H(g[29]),b[15]=H(g[42]),b[16]=H(g[3]),b[17]=H(g[8]),b[18]=H(g[12]),b[19]=H(g[17]),b[20]=H(g[25]),b[21]=H(g[30]),b[22]=H(g[41]),b[23]=H(g[43]),b[24]=H(g[9]),b[25]=H(g[11]),b[26]=H(g[18]),b[27]=H(g[24]),b[28]=H(g[31]),b[29]=H(g[40]),b[30]=H(g[44]),b[31]=H(g[53]),b[32]=H(g[10]),b[33]=H(g[19]),b[34]=H(g[23]),b[35]=H(g[32]),b[36]=H(g[39]),b[37]=H(g[45]),b[38]=H(g[52]),b[39]=H(g[54]),b[40]=H(g[20]),b[41]=H(g[22]),b[42]=H(g[33]),b[43]=H(g[38]),b[44]=H(g[46]),b[45]=H(g[51]),b[46]=H(g[55]),b[47]=H(g[60]),b[48]=H(g[21]),b[49]=H(g[34]),b[50]=H(g[37]),b[51]=H(g[47]),b[52]=H(g[50]),b[53]=H(g[56]),b[54]=H(g[59]),b[55]=H(g[61]),b[56]=H(g[35]),b[57]=H(g[36]),b[58]=H(g[48]),b[59]=H(g[49]),b[60]=H(g[57]),b[61]=H(g[58]),b[62]=H(g[62]),b[63]=H(g[63])}function tt(g){const b=.5*Math.cos(.7853975),D=.5*Math.cos(3.14159/16),B=.5*Math.cos(3.14159/8),q=.5*Math.cos(3*3.14159/16),W=.5*Math.cos(5*3.14159/16),te=.5*Math.cos(3*3.14159/8),oe=.5*Math.cos(7*3.14159/16),de=new Array(4),ce=new Array(4),ge=new Array(4),De=new Array(4);for(let Me=0;Me<8;++Me){const Se=Me*8;de[0]=B*g[Se+2],de[1]=te*g[Se+2],de[2]=B*g[Se+6],de[3]=te*g[Se+6],ce[0]=D*g[Se+1]+q*g[Se+3]+W*g[Se+5]+oe*g[Se+7],ce[1]=q*g[Se+1]-oe*g[Se+3]-D*g[Se+5]-W*g[Se+7],ce[2]=W*g[Se+1]-D*g[Se+3]+oe*g[Se+5]+q*g[Se+7],ce[3]=oe*g[Se+1]-W*g[Se+3]+q*g[Se+5]-D*g[Se+7],ge[0]=b*(g[Se+0]+g[Se+4]),ge[3]=b*(g[Se+0]-g[Se+4]),ge[1]=de[0]+de[3],ge[2]=de[1]-de[2],De[0]=ge[0]+ge[1],De[1]=ge[3]+ge[2],De[2]=ge[3]-ge[2],De[3]=ge[0]-ge[1],g[Se+0]=De[0]+ce[0],g[Se+1]=De[1]+ce[1],g[Se+2]=De[2]+ce[2],g[Se+3]=De[3]+ce[3],g[Se+4]=De[3]-ce[3],g[Se+5]=De[2]-ce[2],g[Se+6]=De[1]-ce[1],g[Se+7]=De[0]-ce[0]}for(let Me=0;Me<8;++Me)de[0]=B*g[16+Me],de[1]=te*g[16+Me],de[2]=B*g[48+Me],de[3]=te*g[48+Me],ce[0]=D*g[8+Me]+q*g[24+Me]+W*g[40+Me]+oe*g[56+Me],ce[1]=q*g[8+Me]-oe*g[24+Me]-D*g[40+Me]-W*g[56+Me],ce[2]=W*g[8+Me]-D*g[24+Me]+oe*g[40+Me]+q*g[56+Me],ce[3]=oe*g[8+Me]-W*g[24+Me]+q*g[40+Me]-D*g[56+Me],ge[0]=b*(g[Me]+g[32+Me]),ge[3]=b*(g[Me]-g[32+Me]),ge[1]=de[0]+de[3],ge[2]=de[1]-de[2],De[0]=ge[0]+ge[1],De[1]=ge[3]+ge[2],De[2]=ge[3]-ge[2],De[3]=ge[0]-ge[1],g[0+Me]=De[0]+ce[0],g[8+Me]=De[1]+ce[1],g[16+Me]=De[2]+ce[2],g[24+Me]=De[3]+ce[3],g[32+Me]=De[3]-ce[3],g[40+Me]=De[2]-ce[2],g[48+Me]=De[1]-ce[1],g[56+Me]=De[0]-ce[0]}function ft(g){for(let b=0;b<64;++b){const D=g[0][b],B=g[1][b],q=g[2][b];g[0][b]=D+1.5747*q,g[1][b]=D-.1873*B-.4682*q,g[2][b]=D+1.8556*B}}function Yt(g,b,D){for(let B=0;B<64;++B)b[D+B]=bs.toHalfFloat(I(g[B]))}function I(g){return g<=1?Math.sign(g)*Math.pow(Math.abs(g),2.2):Math.sign(g)*Math.pow(w,Math.abs(g)-1)}function A(g){return new DataView(g.array.buffer,g.offset.value,g.size)}function ie(g){const b=g.viewer.buffer.slice(g.offset.value,g.offset.value+g.size),D=new Uint8Array(Mt(b)),B=new Uint8Array(D.length);return Be(D),Xe(D,B),new DataView(B.buffer)}function me(g){const b=g.array.slice(g.offset.value,g.offset.value+g.size),D=uo(b),B=new Uint8Array(D.length);return Be(D),Xe(D,B),new DataView(B.buffer)}function xe(g){const b=g.viewer,D={value:g.offset.value},B=new Uint16Array(g.width*g.scanlineBlockSize*(g.channels*g.type)),q=new Uint8Array(8192);let W=0;const te=new Array(g.channels);for(let qe=0;qe<g.channels;qe++)te[qe]={},te[qe].start=W,te[qe].end=te[qe].start,te[qe].nx=g.width,te[qe].ny=g.lines,te[qe].size=g.type,W+=te[qe].nx*te[qe].ny*te[qe].size;const oe=fe(b,D),de=fe(b,D);if(de>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(oe<=de)for(let qe=0;qe<de-oe+1;qe++)q[qe+oe]=We(b,D);const ce=new Uint16Array(65536),ge=T(q,ce),De=we(b,D);He(g.array,b,D,De,B,W);for(let qe=0;qe<g.channels;++qe){const Te=te[qe];for(let Oe=0;Oe<te[qe].size;++Oe)ve(B,Te.start+Oe,Te.nx,Te.size,Te.ny,Te.nx*Te.size,ge)}Ke(ce,B,W);let Me=0;const Se=new Uint8Array(B.buffer.byteLength);for(let qe=0;qe<g.lines;qe++)for(let Te=0;Te<g.channels;Te++){const Oe=te[Te],Ye=Oe.nx*Oe.size,pt=new Uint8Array(B.buffer,Oe.end*2,Ye*2);Se.set(pt,Me),Me+=Ye*2,Oe.end+=Ye}return new DataView(Se.buffer)}function Ae(g){const b=g.array.slice(g.offset.value,g.offset.value+g.size),D=uo(b),B=g.lines*g.channels*g.width,q=g.type==1?new Uint16Array(B):new Uint32Array(B);let W=0,te=0;const oe=new Array(4);for(let de=0;de<g.lines;de++)for(let ce=0;ce<g.channels;ce++){let ge=0;switch(g.type){case 1:oe[0]=W,oe[1]=oe[0]+g.width,W=oe[1]+g.width;for(let De=0;De<g.width;++De){const Me=D[oe[0]++]<<8|D[oe[1]++];ge+=Me,q[te]=ge,te++}break;case 2:oe[0]=W,oe[1]=oe[0]+g.width,oe[2]=oe[1]+g.width,W=oe[2]+g.width;for(let De=0;De<g.width;++De){const Me=D[oe[0]++]<<24|D[oe[1]++]<<16|D[oe[2]++]<<8;ge+=Me,q[te]=ge,te++}break}}return new DataView(q.buffer)}function O(g){const b=g.viewer,D={value:g.offset.value},B=new Uint8Array(g.width*g.lines*(g.channels*g.type*2)),q={version:je(b,D),unknownUncompressedSize:je(b,D),unknownCompressedSize:je(b,D),acCompressedSize:je(b,D),dcCompressedSize:je(b,D),rleCompressedSize:je(b,D),rleUncompressedSize:je(b,D),rleRawSize:je(b,D),totalAcUncompressedCount:je(b,D),totalDcUncompressedCount:je(b,D),acCompression:je(b,D)};if(q.version<2)throw new Error("EXRLoader.parse: "+C.compression+" version "+q.version+" is unsupported");const W=new Array;let te=fe(b,D)-2;for(;te>0;){const Te=le(b.buffer,D),Oe=We(b,D),Ye=Oe>>2&3,pt=(Oe>>4)-1,Tt=new Int8Array([pt])[0],ut=We(b,D);W.push({name:Te,index:Tt,type:ut,compression:Ye}),te-=Te.length+3}const oe=C.channels,de=new Array(g.channels);for(let Te=0;Te<g.channels;++Te){const Oe=de[Te]={},Ye=oe[Te];Oe.name=Ye.name,Oe.compression=0,Oe.decoded=!1,Oe.type=Ye.pixelType,Oe.pLinear=Ye.pLinear,Oe.width=g.width,Oe.height=g.lines}const ce={idx:new Array(3)};for(let Te=0;Te<g.channels;++Te){const Oe=de[Te];for(let Ye=0;Ye<W.length;++Ye){const pt=W[Ye];Oe.name==pt.name&&(Oe.compression=pt.compression,pt.index>=0&&(ce.idx[pt.index]=Te),Oe.offset=Te)}}let ge,De,Me;if(q.acCompressedSize>0)switch(q.acCompression){case 0:ge=new Uint16Array(q.totalAcUncompressedCount),He(g.array,b,D,q.acCompressedSize,ge,q.totalAcUncompressedCount);break;case 1:const Te=g.array.slice(D.value,D.value+q.totalAcUncompressedCount),Oe=uo(Te);ge=new Uint16Array(Oe.buffer),D.value+=q.totalAcUncompressedCount;break}if(q.dcCompressedSize>0){const Te={array:g.array,offset:D,size:q.dcCompressedSize};De=new Uint16Array(me(Te).buffer),D.value+=q.dcCompressedSize}if(q.rleRawSize>0){const Te=g.array.slice(D.value,D.value+q.rleCompressedSize),Oe=uo(Te);Me=Mt(Oe.buffer),D.value+=q.rleCompressedSize}let Se=0;const qe=new Array(de.length);for(let Te=0;Te<qe.length;++Te)qe[Te]=new Array;for(let Te=0;Te<g.lines;++Te)for(let Oe=0;Oe<de.length;++Oe)qe[Oe].push(Se),Se+=de[Oe].width*g.type*2;St(ce,qe,de,ge,De,B);for(let Te=0;Te<de.length;++Te){const Oe=de[Te];if(!Oe.decoded)switch(Oe.compression){case 2:let Ye=0,pt=0;for(let Tt=0;Tt<g.lines;++Tt){let ut=qe[Te][Ye];for(let it=0;it<Oe.width;++it){for(let $e=0;$e<2*Oe.type;++$e)B[ut++]=Me[pt+$e*Oe.width*Oe.height];pt++}Ye++}break;case 1:default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(B.buffer)}function le(g,b){const D=new Uint8Array(g);let B=0;for(;D[b.value+B]!=0;)B+=1;const q=new TextDecoder().decode(D.slice(b.value,b.value+B));return b.value=b.value+B+1,q}function Q(g,b,D){const B=new TextDecoder().decode(new Uint8Array(g).slice(b.value,b.value+D));return b.value=b.value+D,B}function Pe(g,b){const D=Ne(g,b),B=we(g,b);return[D,B]}function Ie(g,b){const D=we(g,b),B=we(g,b);return[D,B]}function Ne(g,b){const D=g.getInt32(b.value,!0);return b.value=b.value+4,D}function we(g,b){const D=g.getUint32(b.value,!0);return b.value=b.value+4,D}function ze(g,b){const D=g[b.value];return b.value=b.value+1,D}function We(g,b){const D=g.getUint8(b.value);return b.value=b.value+1,D}const je=function(g,b){let D;return"getBigInt64"in DataView.prototype?D=Number(g.getBigInt64(b.value,!0)):D=g.getUint32(b.value+4,!0)+Number(g.getUint32(b.value,!0)<<32),b.value+=8,D};function Ze(g,b){const D=g.getFloat32(b.value,!0);return b.value+=4,D}function G(g,b){return bs.toHalfFloat(Ze(g,b))}function H(g){const b=(g&31744)>>10,D=g&1023;return(g>>15?-1:1)*(b?b===31?D?NaN:1/0:Math.pow(2,b-15)*(1+D/1024):6103515625e-14*(D/1024))}function fe(g,b){const D=g.getUint16(b.value,!0);return b.value+=2,D}function Ce(g,b){return H(fe(g,b))}function Ge(g,b,D,B){const q=D.value,W=[];for(;D.value<q+B-1;){const te=le(b,D),oe=Ne(g,D),de=We(g,D);D.value+=3;const ce=Ne(g,D),ge=Ne(g,D);W.push({name:te,pixelType:oe,pLinear:de,xSampling:ce,ySampling:ge})}return D.value+=1,W}function mt(g,b){const D=Ze(g,b),B=Ze(g,b),q=Ze(g,b),W=Ze(g,b),te=Ze(g,b),oe=Ze(g,b),de=Ze(g,b),ce=Ze(g,b);return{redX:D,redY:B,greenX:q,greenY:W,blueX:te,blueY:oe,whiteX:de,whiteY:ce}}function bt(g,b){const D=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],B=We(g,b);return D[B]}function Zt(g,b){const D=we(g,b),B=we(g,b),q=we(g,b),W=we(g,b);return{xMin:D,yMin:B,xMax:q,yMax:W}}function si(g,b){const D=["INCREASING_Y"],B=We(g,b);return D[B]}function Rt(g,b){const D=Ze(g,b),B=Ze(g,b);return[D,B]}function wn(g,b){const D=Ze(g,b),B=Ze(g,b),q=Ze(g,b);return[D,B,q]}function Ln(g,b,D,B,q){if(B==="string"||B==="stringvector"||B==="iccProfile")return Q(b,D,q);if(B==="chlist")return Ge(g,b,D,q);if(B==="chromaticities")return mt(g,D);if(B==="compression")return bt(g,D);if(B==="box2i")return Zt(g,D);if(B==="lineOrder")return si(g,D);if(B==="float")return Ze(g,D);if(B==="v2f")return Rt(g,D);if(B==="v3f")return wn(g,D);if(B==="int")return Ne(g,D);if(B==="rational")return Pe(g,D);if(B==="timecode")return Ie(g,D);if(B==="preview")return D.value+=q,"skipped";D.value+=q}function $r(g,b,D){const B={};if(g.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.");B.version=g.getUint8(4);const q=g.getUint8(5);B.spec={singleTile:!!(q&2),longName:!!(q&4),deepFormat:!!(q&8),multiPart:!!(q&16)},D.value=8;let W=!0;for(;W;){const te=le(b,D);if(te==0)W=!1;else{const oe=le(b,D),de=we(g,D),ce=Ln(g,b,D,oe,de);ce===void 0?console.warn(`EXRLoader.parse: skipped unknown header attribute type '${oe}'.`):B[te]=ce}}if(q&-5)throw console.error("EXRHeader:",B),new Error("THREE.EXRLoader: provided file is currently unsupported.");return B}function Oa(g,b,D,B,q){const W={size:0,viewer:b,array:D,offset:B,width:g.dataWindow.xMax-g.dataWindow.xMin+1,height:g.dataWindow.yMax-g.dataWindow.yMin+1,channels:g.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:g.channels[0].pixelType,uncompress:null,getter:null,format:null,encoding:null};switch(g.compression){case"NO_COMPRESSION":W.lines=1,W.uncompress=A;break;case"RLE_COMPRESSION":W.lines=1,W.uncompress=ie;break;case"ZIPS_COMPRESSION":W.lines=1,W.uncompress=me;break;case"ZIP_COMPRESSION":W.lines=16,W.uncompress=me;break;case"PIZ_COMPRESSION":W.lines=32,W.uncompress=xe;break;case"PXR24_COMPRESSION":W.lines=16,W.uncompress=Ae;break;case"DWAA_COMPRESSION":W.lines=32,W.uncompress=O;break;case"DWAB_COMPRESSION":W.lines=256,W.uncompress=O;break;default:throw new Error("EXRLoader.parse: "+g.compression+" is unsupported")}if(W.scanlineBlockSize=W.lines,W.type==1)switch(q){case lt:W.getter=Ce,W.inputSize=2;break;case _t:W.getter=fe,W.inputSize=2;break}else if(W.type==2)switch(q){case lt:W.getter=Ze,W.inputSize=4;break;case _t:W.getter=G,W.inputSize=4}else throw new Error("EXRLoader.parse: unsupported pixelType "+W.type+" for "+g.compression+".");W.blockCount=(g.dataWindow.yMax+1)/W.scanlineBlockSize;for(let oe=0;oe<W.blockCount;oe++)je(b,B);W.outputChannels=W.channels==3?4:W.channels;const te=W.width*W.height*W.outputChannels;switch(q){case lt:W.byteArray=new Float32Array(te),W.channels<W.outputChannels&&W.byteArray.fill(1,0,te);break;case _t:W.byteArray=new Uint16Array(te),W.channels<W.outputChannels&&W.byteArray.fill(15360,0,te);break;default:console.error("THREE.EXRLoader: unsupported type: ",q);break}return W.bytesPerLine=W.width*W.inputSize*W.channels,W.outputChannels==4?(W.format=tn,W.encoding=vn):(W.format=Eo,W.encoding=vn),W}const Jr=new DataView(e),Zo=new Uint8Array(e),yr={value:0},C=$r(Jr,e,yr),V=Oa(C,Jr,Zo,yr,this.type),se={value:0},X={R:0,G:1,B:2,A:3,Y:0};for(let g=0;g<V.height/V.scanlineBlockSize;g++){const b=we(Jr,yr);V.size=we(Jr,yr),V.lines=b+V.scanlineBlockSize>V.height?V.height-b:V.scanlineBlockSize;const B=V.size<V.lines*V.bytesPerLine?V.uncompress(V):A(V);yr.value+=V.size;for(let q=0;q<V.scanlineBlockSize;q++){const W=q+g*V.scanlineBlockSize;if(W>=V.height)break;for(let te=0;te<V.channels;te++){const oe=X[C.channels[te].name];for(let de=0;de<V.width;de++){se.value=(q*(V.channels*V.width)+te*V.width+de)*V.inputSize;const ce=(V.height-1-W)*(V.width*V.outputChannels)+de*V.outputChannels+oe;V.byteArray[ce]=V.getter(B,se)}}}}return{header:C,width:V.width,height:V.height,data:V.byteArray,format:V.format,encoding:V.encoding,type:this.type}}setDataType(e){return this.type=e,this}load(e,t,n,r){function s(a,o){a.encoding=o.encoding,a.minFilter=Ue,a.magFilter=Ue,a.generateMipmaps=!1,a.flipY=!1,t&&t(a,o)}return super.load(e,s,n,r)}}class Wc extends _e{constructor(e,t={}){const r=[e.isCubeTexture?"#define ENVMAP_TYPE_CUBE":""],s=`
			varying vec3 vWorldPosition;

			void main() {

				vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
				vWorldPosition = worldPosition.xyz;

				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			}
			`,a=r.join(`
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

					vec3 o = ro - c;
					float t = - dot( n, o ) / d;
					vec3 q = o + rd * t;

					return ( dot( q, q ) < r * r ) ? t : 1e6;

				}

				// From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
				float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) {

					vec3 oc = ro - ce;
					float b = dot( oc, rd );
					float c = dot( oc, oc ) - ra * ra;
					float h = b * b - c;

					if( h < 0.0 ) { return -1.0; }

					h = sqrt( h );

					return - b + h;

				}

				vec3 project() {

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

				void main() {

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
				`,o={map:{value:e},height:{value:t.height||15},radius:{value:t.radius||100}},l=new kc(1,16),c=new At({uniforms:o,fragmentShader:a,vertexShader:s,side:fn});super(l,c)}set radius(e){this.material.uniforms.radius.value=e}get radius(){return this.material.uniforms.radius.value}set height(e){this.material.uniforms.height.value=e}get height(){return this.material.uniforms.height.value}}const Ll=new WeakMap;class xr extends Yr{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,r){const s=new ya(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,a=>{this.parse(a,t,r)},n,r)}parse(e,t,n){this.decodeDracoFile(e,t,null,null,On).catch(n)}decodeDracoFile(e,t,n,r,s=Ns){const a={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:r||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:s};return this.decodeGeometry(e,a).then(t)}decodeGeometry(e,t){const n=JSON.stringify(t);if(Ll.has(e)){const l=Ll.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let r;const s=this.workerNextTaskID++,a=e.byteLength,o=this._getWorker(s,a).then(l=>(r=l,new Promise((c,u)=>{r._callbacks[s]={resolve:c,reject:u},r.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{r&&s&&this._releaseTask(r,s)}),Ll.set(e,{key:n,promise:o}),o}_createGeometry(e){const t=new Ft;e.index&&t.setIndex(new Lt(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const r=e.attributes[n],s=r.name,a=r.array,o=r.itemSize,l=new Lt(a,o);s==="color"&&this._assignVertexColorSpace(l,r.vertexColorSpace),t.setAttribute(s,l)}return t}_assignVertexColorSpace(e,t){if(t!==On)return;const n=new Re;for(let r=0,s=e.count;r<s;r++)n.fromBufferAttribute(e,r).convertSRGBToLinear(),e.setXYZ(r,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new ya(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((r,s)=>{n.load(e,r,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const r=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const s=nw.toString(),a=["/* draco decoder */",r,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([a]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const r=new Worker(this.workerSourceURL);r._callbacks={},r._taskCosts={},r._taskLoad=0,r.postMessage({type:"init",decoderConfig:this.decoderConfig}),r.onmessage=function(s){const a=s.data;switch(a.type){case"decode":r._callbacks[a.id].resolve(a);break;case"error":r._callbacks[a.id].reject(a);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+a.type+'"')}},this.workerPool.push(r)}else this.workerPool.sort(function(r,s){return r._taskLoad>s._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function nw(){let i,e;onmessage=function(a){const o=a.data;switch(o.type){case"init":i=o.decoderConfig,e=new Promise(function(u){i.onModuleLoaded=function(h){u({draco:h})},DracoDecoderModule(i)});break;case"decode":const l=o.buffer,c=o.taskConfig;e.then(u=>{const h=u.draco,d=new h.Decoder;try{const p=t(h,d,new Int8Array(l),c),v=p.attributes.map(x=>x.array.buffer);p.index&&v.push(p.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:p},v)}catch(p){console.error(p),self.postMessage({type:"error",id:o.id,error:p.message})}finally{h.destroy(d)}});break}};function t(a,o,l,c){const u=c.attributeIDs,h=c.attributeTypes;let d,p;const v=o.GetEncodedGeometryType(l);if(v===a.TRIANGULAR_MESH)d=new a.Mesh,p=o.DecodeArrayToMesh(l,l.byteLength,d);else if(v===a.POINT_CLOUD)d=new a.PointCloud,p=o.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!p.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+p.error_msg());const x={index:null,attributes:[]};for(const m in u){const f=self[h[m]];let M,_;if(c.useUniqueIDs)_=u[m],M=o.GetAttributeByUniqueId(d,_);else{if(_=o.GetAttributeId(d,a[u[m]]),_===-1)continue;M=o.GetAttribute(d,_)}const y=r(a,o,d,m,f,M);m==="color"&&(y.vertexColorSpace=c.vertexColorSpace),x.attributes.push(y)}return v===a.TRIANGULAR_MESH&&(x.index=n(a,o,d)),a.destroy(d),x}function n(a,o,l){const u=l.num_faces()*3,h=u*4,d=a._malloc(h);o.GetTrianglesUInt32Array(l,h,d);const p=new Uint32Array(a.HEAPF32.buffer,d,u).slice();return a._free(d),{array:p,itemSize:1}}function r(a,o,l,c,u,h){const d=h.num_components(),v=l.num_points()*d,x=v*u.BYTES_PER_ELEMENT,m=s(a,u),f=a._malloc(x);o.GetAttributeDataArrayForAllPoints(l,h,m,x,f);const M=new u(a.HEAPF32.buffer,f,v).slice();return a._free(f),{name:c,array:M,itemSize:d}}function s(a,o){switch(o){case Float32Array:return a.DT_FLOAT32;case Int8Array:return a.DT_INT8;case Int16Array:return a.DT_INT16;case Int32Array:return a.DT_INT32;case Uint8Array:return a.DT_UINT8;case Uint16Array:return a.DT_UINT16;case Uint32Array:return a.DT_UINT32}}}const Gh={type:"change"},Il={type:"start"},Vh={type:"end"};class _r extends Mi{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qr.ROTATE,MIDDLE:Qr.DOLLY,RIGHT:Qr.PAN},this.touches={ONE:es.ROTATE,TWO:es.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(O){O.addEventListener("keydown",ft),this._domElementKeyEvents=O},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",ft),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Gh),n.update(),s=r.NONE},this.update=function(){const O=new L,le=new kt().setFromUnitVectors(e.up,new L(0,1,0)),Q=le.clone().invert(),Pe=new L,Ie=new kt,Ne=2*Math.PI;return function(){const ze=n.object.position;O.copy(ze).sub(n.target),O.applyQuaternion(le),o.setFromVector3(O),n.autoRotate&&s===r.NONE&&w(R()),n.enableDamping?(o.theta+=l.theta*n.dampingFactor,o.phi+=l.phi*n.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let We=n.minAzimuthAngle,je=n.maxAzimuthAngle;return isFinite(We)&&isFinite(je)&&(We<-Math.PI?We+=Ne:We>Math.PI&&(We-=Ne),je<-Math.PI?je+=Ne:je>Math.PI&&(je-=Ne),We<=je?o.theta=Math.max(We,Math.min(je,o.theta)):o.theta=o.theta>(We+je)/2?Math.max(We,o.theta):Math.min(je,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),o.radius*=c,o.radius=Math.max(n.minDistance,Math.min(n.maxDistance,o.radius)),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),O.setFromSpherical(o),O.applyQuaternion(Q),ze.copy(n.target).add(O),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),u.set(0,0,0)),c=1,h||Pe.distanceToSquared(n.object.position)>a||8*(1-Ie.dot(n.object.quaternion))>a?(n.dispatchEvent(Gh),Pe.copy(n.object.position),Ie.copy(n.object.quaternion),h=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",A),n.domElement.removeEventListener("pointerdown",Xe),n.domElement.removeEventListener("pointercancel",St),n.domElement.removeEventListener("wheel",tt),n.domElement.removeEventListener("pointermove",Mt),n.domElement.removeEventListener("pointerup",St),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",ft),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const a=1e-6,o=new Ih,l=new Ih;let c=1;const u=new L;let h=!1;const d=new ye,p=new ye,v=new ye,x=new ye,m=new ye,f=new ye,M=new ye,_=new ye,y=new ye,S=[],E={};function R(){return 2*Math.PI/60/60*n.autoRotateSpeed}function P(){return Math.pow(.95,n.zoomSpeed)}function w(O){l.theta-=O}function T(O){l.phi-=O}const N=function(){const O=new L;return function(Q,Pe){O.setFromMatrixColumn(Pe,0),O.multiplyScalar(-Q),u.add(O)}}(),F=function(){const O=new L;return function(Q,Pe){n.screenSpacePanning===!0?O.setFromMatrixColumn(Pe,1):(O.setFromMatrixColumn(Pe,0),O.crossVectors(n.object.up,O)),O.multiplyScalar(Q),u.add(O)}}(),U=function(){const O=new L;return function(Q,Pe){const Ie=n.domElement;if(n.object.isPerspectiveCamera){const Ne=n.object.position;O.copy(Ne).sub(n.target);let we=O.length();we*=Math.tan(n.object.fov/2*Math.PI/180),N(2*Q*we/Ie.clientHeight,n.object.matrix),F(2*Pe*we/Ie.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(N(Q*(n.object.right-n.object.left)/n.object.zoom/Ie.clientWidth,n.object.matrix),F(Pe*(n.object.top-n.object.bottom)/n.object.zoom/Ie.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function z(O){n.object.isPerspectiveCamera?c/=O:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*O)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function k(O){n.object.isPerspectiveCamera?c*=O:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/O)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ee(O){d.set(O.clientX,O.clientY)}function $(O){M.set(O.clientX,O.clientY)}function Y(O){x.set(O.clientX,O.clientY)}function ne(O){p.set(O.clientX,O.clientY),v.subVectors(p,d).multiplyScalar(n.rotateSpeed);const le=n.domElement;w(2*Math.PI*v.x/le.clientHeight),T(2*Math.PI*v.y/le.clientHeight),d.copy(p),n.update()}function J(O){_.set(O.clientX,O.clientY),y.subVectors(_,M),y.y>0?z(P()):y.y<0&&k(P()),M.copy(_),n.update()}function be(O){m.set(O.clientX,O.clientY),f.subVectors(m,x).multiplyScalar(n.panSpeed),U(f.x,f.y),x.copy(m),n.update()}function ae(O){O.deltaY<0?k(P()):O.deltaY>0&&z(P()),n.update()}function Z(O){let le=!1;switch(O.code){case n.keys.UP:O.ctrlKey||O.metaKey||O.shiftKey?T(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):U(0,n.keyPanSpeed),le=!0;break;case n.keys.BOTTOM:O.ctrlKey||O.metaKey||O.shiftKey?T(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):U(0,-n.keyPanSpeed),le=!0;break;case n.keys.LEFT:O.ctrlKey||O.metaKey||O.shiftKey?w(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):U(n.keyPanSpeed,0),le=!0;break;case n.keys.RIGHT:O.ctrlKey||O.metaKey||O.shiftKey?w(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):U(-n.keyPanSpeed,0),le=!0;break}le&&(O.preventDefault(),n.update())}function re(){if(S.length===1)d.set(S[0].pageX,S[0].pageY);else{const O=.5*(S[0].pageX+S[1].pageX),le=.5*(S[0].pageY+S[1].pageY);d.set(O,le)}}function pe(){if(S.length===1)x.set(S[0].pageX,S[0].pageY);else{const O=.5*(S[0].pageX+S[1].pageX),le=.5*(S[0].pageY+S[1].pageY);x.set(O,le)}}function he(){const O=S[0].pageX-S[1].pageX,le=S[0].pageY-S[1].pageY,Q=Math.sqrt(O*O+le*le);M.set(0,Q)}function j(){n.enableZoom&&he(),n.enablePan&&pe()}function Fe(){n.enableZoom&&he(),n.enableRotate&&re()}function ve(O){if(S.length==1)p.set(O.pageX,O.pageY);else{const Q=Ae(O),Pe=.5*(O.pageX+Q.x),Ie=.5*(O.pageY+Q.y);p.set(Pe,Ie)}v.subVectors(p,d).multiplyScalar(n.rotateSpeed);const le=n.domElement;w(2*Math.PI*v.x/le.clientHeight),T(2*Math.PI*v.y/le.clientHeight),d.copy(p)}function ue(O){if(S.length===1)m.set(O.pageX,O.pageY);else{const le=Ae(O),Q=.5*(O.pageX+le.x),Pe=.5*(O.pageY+le.y);m.set(Q,Pe)}f.subVectors(m,x).multiplyScalar(n.panSpeed),U(f.x,f.y),x.copy(m)}function He(O){const le=Ae(O),Q=O.pageX-le.x,Pe=O.pageY-le.y,Ie=Math.sqrt(Q*Q+Pe*Pe);_.set(0,Ie),y.set(0,Math.pow(_.y/M.y,n.zoomSpeed)),z(y.y),M.copy(_)}function Ke(O){n.enableZoom&&He(O),n.enablePan&&ue(O)}function Be(O){n.enableZoom&&He(O),n.enableRotate&&ve(O)}function Xe(O){n.enabled!==!1&&(S.length===0&&(n.domElement.setPointerCapture(O.pointerId),n.domElement.addEventListener("pointermove",Mt),n.domElement.addEventListener("pointerup",St)),ie(O),O.pointerType==="touch"?Yt(O):It(O))}function Mt(O){n.enabled!==!1&&(O.pointerType==="touch"?I(O):Ct(O))}function St(O){me(O),S.length===0&&(n.domElement.releasePointerCapture(O.pointerId),n.domElement.removeEventListener("pointermove",Mt),n.domElement.removeEventListener("pointerup",St)),n.dispatchEvent(Vh),s=r.NONE}function It(O){let le;switch(O.button){case 0:le=n.mouseButtons.LEFT;break;case 1:le=n.mouseButtons.MIDDLE;break;case 2:le=n.mouseButtons.RIGHT;break;default:le=-1}switch(le){case Qr.DOLLY:if(n.enableZoom===!1)return;$(O),s=r.DOLLY;break;case Qr.ROTATE:if(O.ctrlKey||O.metaKey||O.shiftKey){if(n.enablePan===!1)return;Y(O),s=r.PAN}else{if(n.enableRotate===!1)return;ee(O),s=r.ROTATE}break;case Qr.PAN:if(O.ctrlKey||O.metaKey||O.shiftKey){if(n.enableRotate===!1)return;ee(O),s=r.ROTATE}else{if(n.enablePan===!1)return;Y(O),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(Il)}function Ct(O){switch(s){case r.ROTATE:if(n.enableRotate===!1)return;ne(O);break;case r.DOLLY:if(n.enableZoom===!1)return;J(O);break;case r.PAN:if(n.enablePan===!1)return;be(O);break}}function tt(O){n.enabled===!1||n.enableZoom===!1||s!==r.NONE||(O.preventDefault(),n.dispatchEvent(Il),ae(O),n.dispatchEvent(Vh))}function ft(O){n.enabled===!1||n.enablePan===!1||Z(O)}function Yt(O){switch(xe(O),S.length){case 1:switch(n.touches.ONE){case es.ROTATE:if(n.enableRotate===!1)return;re(),s=r.TOUCH_ROTATE;break;case es.PAN:if(n.enablePan===!1)return;pe(),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(n.touches.TWO){case es.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;j(),s=r.TOUCH_DOLLY_PAN;break;case es.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Fe(),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(Il)}function I(O){switch(xe(O),s){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;ve(O),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;ue(O),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Ke(O),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Be(O),n.update();break;default:s=r.NONE}}function A(O){n.enabled!==!1&&O.preventDefault()}function ie(O){S.push(O)}function me(O){delete E[O.pointerId];for(let le=0;le<S.length;le++)if(S[le].pointerId==O.pointerId){S.splice(le,1);return}}function xe(O){let le=E[O.pointerId];le===void 0&&(le=new ye,E[O.pointerId]=le),le.set(O.pageX,O.pageY)}function Ae(O){const le=O.pointerId===S[0].pointerId?S[1]:S[0];return E[le.pointerId]}n.domElement.addEventListener("contextmenu",A),n.domElement.addEventListener("pointerdown",Xe),n.domElement.addEventListener("pointercancel",St),n.domElement.addEventListener("wheel",tt,{passive:!1}),this.update()}}const br=new mr,Mn=new L,tr=new L,Pt=new kt,Wh={X:new L(1,0,0),Y:new L(0,1,0),Z:new L(0,0,1)},Ul={type:"change"},jh={type:"mouseDown"},Xh={type:"mouseUp",mode:null},qh={type:"objectChange"};class Kr extends yt{constructor(e,t){super(),t===void 0&&(console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.'),t=document),this.isTransformControls=!0,this.visible=!1,this.domElement=t,this.domElement.style.touchAction="none";const n=new lw;this._gizmo=n,this.add(n);const r=new cw;this._plane=r,this.add(r);const s=this;function a(M,_){let y=_;Object.defineProperty(s,M,{get:function(){return y!==void 0?y:_},set:function(S){y!==S&&(y=S,r[M]=S,n[M]=S,s.dispatchEvent({type:M+"-changed",value:S}),s.dispatchEvent(Ul))}}),s[M]=_,r[M]=_,n[M]=_}a("camera",e),a("object",void 0),a("enabled",!0),a("axis",null),a("mode","translate"),a("translationSnap",null),a("rotationSnap",null),a("scaleSnap",null),a("space","world"),a("size",1),a("dragging",!1),a("showX",!0),a("showY",!0),a("showZ",!0);const o=new L,l=new L,c=new kt,u=new kt,h=new L,d=new kt,p=new L,v=new L,x=new L,m=0,f=new L;a("worldPosition",o),a("worldPositionStart",l),a("worldQuaternion",c),a("worldQuaternionStart",u),a("cameraPosition",h),a("cameraQuaternion",d),a("pointStart",p),a("pointEnd",v),a("rotationAxis",x),a("rotationAngle",m),a("eye",f),this._offset=new L,this._startNorm=new L,this._endNorm=new L,this._cameraScale=new L,this._parentPosition=new L,this._parentQuaternion=new kt,this._parentQuaternionInv=new kt,this._parentScale=new L,this._worldScaleStart=new L,this._worldQuaternionInv=new kt,this._worldScale=new L,this._positionStart=new L,this._quaternionStart=new kt,this._scaleStart=new L,this._getPointer=iw.bind(this),this._onPointerDown=sw.bind(this),this._onPointerHover=rw.bind(this),this._onPointerMove=aw.bind(this),this._onPointerUp=ow.bind(this),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp)}updateMatrixWorld(){this.object!==void 0&&(this.object.updateMatrixWorld(),this.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):this.object.parent.matrixWorld.decompose(this._parentPosition,this._parentQuaternion,this._parentScale),this.object.matrixWorld.decompose(this.worldPosition,this.worldQuaternion,this._worldScale),this._parentQuaternionInv.copy(this._parentQuaternion).invert(),this._worldQuaternionInv.copy(this.worldQuaternion).invert()),this.camera.updateMatrixWorld(),this.camera.matrixWorld.decompose(this.cameraPosition,this.cameraQuaternion,this._cameraScale),this.camera.isOrthographicCamera?this.camera.getWorldDirection(this.eye).negate():this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(),super.updateMatrixWorld(this)}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;br.setFromCamera(e,this.camera);const t=Nl(this._gizmo.picker[this.mode],br);t?this.axis=t.object.name:this.axis=null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e.button!==0)&&this.axis!==null){br.setFromCamera(e,this.camera);const t=Nl(this._plane,br,!0);t&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(t.point).sub(this.worldPositionStart)),this.dragging=!0,jh.mode=this.mode,this.dispatchEvent(jh)}}pointerMove(e){const t=this.axis,n=this.mode,r=this.object;let s=this.space;if(n==="scale"?s="local":(t==="E"||t==="XYZE"||t==="XYZ")&&(s="world"),r===void 0||t===null||this.dragging===!1||e.button!==-1)return;br.setFromCamera(e,this.camera);const a=Nl(this._plane,br,!0);if(a){if(this.pointEnd.copy(a.point).sub(this.worldPositionStart),n==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),s==="local"&&t!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),t.indexOf("X")===-1&&(this._offset.x=0),t.indexOf("Y")===-1&&(this._offset.y=0),t.indexOf("Z")===-1&&(this._offset.z=0),s==="local"&&t!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),r.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(s==="local"&&(r.position.applyQuaternion(Pt.copy(this._quaternionStart).invert()),t.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.position.applyQuaternion(this._quaternionStart)),s==="world"&&(r.parent&&r.position.add(Mn.setFromMatrixPosition(r.parent.matrixWorld)),t.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.parent&&r.position.sub(Mn.setFromMatrixPosition(r.parent.matrixWorld))));else if(n==="scale"){if(t.search("XYZ")!==-1){let o=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(o*=-1),tr.set(o,o,o)}else Mn.copy(this.pointStart),tr.copy(this.pointEnd),Mn.applyQuaternion(this._worldQuaternionInv),tr.applyQuaternion(this._worldQuaternionInv),tr.divide(Mn),t.search("X")===-1&&(tr.x=1),t.search("Y")===-1&&(tr.y=1),t.search("Z")===-1&&(tr.z=1);r.scale.copy(this._scaleStart).multiply(tr),this.scaleSnap&&(t.search("X")!==-1&&(r.scale.x=Math.round(r.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Y")!==-1&&(r.scale.y=Math.round(r.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Z")!==-1&&(r.scale.z=Math.round(r.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(n==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const o=20/this.worldPosition.distanceTo(Mn.setFromMatrixPosition(this.camera.matrixWorld));t==="E"?(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1):t==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(Mn.copy(this.rotationAxis).cross(this.eye))*o):(t==="X"||t==="Y"||t==="Z")&&(this.rotationAxis.copy(Wh[t]),Mn.copy(Wh[t]),s==="local"&&Mn.applyQuaternion(this.worldQuaternion),this.rotationAngle=this._offset.dot(Mn.cross(this.eye).normalize())*o),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),s==="local"&&t!=="E"&&t!=="XYZE"?(r.quaternion.copy(this._quaternionStart),r.quaternion.multiply(Pt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),r.quaternion.copy(Pt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),r.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(Ul),this.dispatchEvent(qh)}}pointerUp(e){e.button===0&&(this.dragging&&this.axis!==null&&(Xh.mode=this.mode,this.dispatchEvent(Xh)),this.dragging=!1,this.axis=null)}dispose(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}attach(e){return this.object=e,this.visible=!0,this}detach(){return this.object=void 0,this.visible=!1,this.axis=null,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(Ul),this.dispatchEvent(qh),this.pointStart.copy(this.pointEnd))}getRaycaster(){return br}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}}function iw(i){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:i.button};{const e=this.domElement.getBoundingClientRect();return{x:(i.clientX-e.left)/e.width*2-1,y:-(i.clientY-e.top)/e.height*2+1,button:i.button}}}function rw(i){if(this.enabled)switch(i.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(i));break}}function sw(i){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(i)),this.pointerDown(this._getPointer(i)))}function aw(i){this.enabled&&this.pointerMove(this._getPointer(i))}function ow(i){this.enabled&&(this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(i)))}function Nl(i,e,t){const n=e.intersectObject(i,!0);for(let r=0;r<n.length;r++)if(n[r].object.visible||t)return n[r];return!1}const ho=new Ea,gt=new L(0,1,0),Yh=new L(0,0,0),Zh=new Le,fo=new kt,wo=new kt,li=new L,Kh=new Le,ia=new L(1,0,0),Pr=new L(0,1,0),ra=new L(0,0,1),po=new L,Qs=new L,ea=new L;class lw extends yt{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const e=new xi({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),t=new Ca({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),n=e.clone();n.opacity=.15;const r=t.clone();r.opacity=.5;const s=e.clone();s.color.setHex(16711680);const a=e.clone();a.color.setHex(65280);const o=e.clone();o.color.setHex(255);const l=e.clone();l.color.setHex(16711680),l.opacity=.5;const c=e.clone();c.color.setHex(65280),c.opacity=.5;const u=e.clone();u.color.setHex(255),u.opacity=.5;const h=e.clone();h.opacity=.25;const d=e.clone();d.color.setHex(16776960),d.opacity=.25,e.clone().color.setHex(16776960);const v=e.clone();v.color.setHex(7895160);const x=new $t(0,.04,.1,12);x.translate(0,.05,0);const m=new Dt(.08,.08,.08);m.translate(0,.04,0);const f=new Ft;f.setAttribute("position",new dt([0,0,0,1,0,0],3));const M=new $t(.0075,.0075,.5,3);M.translate(0,.25,0);function _(k,ee){const $=new Lr(k,.0075,3,64,ee*Math.PI*2);return $.rotateY(Math.PI/2),$.rotateX(Math.PI/2),$}function y(){const k=new Ft;return k.setAttribute("position",new dt([0,0,0,1,1,1],3)),k}const S={X:[[new _e(x,s),[.5,0,0],[0,0,-Math.PI/2]],[new _e(x,s),[-.5,0,0],[0,0,Math.PI/2]],[new _e(M,s),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new _e(x,a),[0,.5,0]],[new _e(x,a),[0,-.5,0],[Math.PI,0,0]],[new _e(M,a)]],Z:[[new _e(x,o),[0,0,.5],[Math.PI/2,0,0]],[new _e(x,o),[0,0,-.5],[-Math.PI/2,0,0]],[new _e(M,o),null,[Math.PI/2,0,0]]],XYZ:[[new _e(new Es(.1,0),h.clone()),[0,0,0]]],XY:[[new _e(new Dt(.15,.15,.01),u.clone()),[.15,.15,0]]],YZ:[[new _e(new Dt(.15,.15,.01),l.clone()),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new _e(new Dt(.15,.15,.01),c.clone()),[.15,0,.15],[-Math.PI/2,0,0]]]},E={X:[[new _e(new $t(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new _e(new $t(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new _e(new $t(.2,0,.6,4),n),[0,.3,0]],[new _e(new $t(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new _e(new $t(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new _e(new $t(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new _e(new Es(.2,0),n)]],XY:[[new _e(new Dt(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new _e(new Dt(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new _e(new Dt(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]]},R={START:[[new _e(new Es(.01,2),r),null,null,null,"helper"]],END:[[new _e(new Es(.01,2),r),null,null,null,"helper"]],DELTA:[[new Zn(y(),r),null,null,null,"helper"]],X:[[new Zn(f,r.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new Zn(f,r.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new Zn(f,r.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},P={XYZE:[[new _e(_(.5,1),v),null,[0,Math.PI/2,0]]],X:[[new _e(_(.5,.5),s)]],Y:[[new _e(_(.5,.5),a),null,[0,0,-Math.PI/2]]],Z:[[new _e(_(.5,.5),o),null,[0,Math.PI/2,0]]],E:[[new _e(_(.75,1),d),null,[0,Math.PI/2,0]]]},w={AXIS:[[new Zn(f,r.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]]},T={XYZE:[[new _e(new jr(.25,10,8),n)]],X:[[new _e(new Lr(.5,.1,4,24),n),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new _e(new Lr(.5,.1,4,24),n),[0,0,0],[Math.PI/2,0,0]]],Z:[[new _e(new Lr(.5,.1,4,24),n),[0,0,0],[0,0,-Math.PI/2]]],E:[[new _e(new Lr(.75,.1,2,24),n)]]},N={X:[[new _e(m,s),[.5,0,0],[0,0,-Math.PI/2]],[new _e(M,s),[0,0,0],[0,0,-Math.PI/2]],[new _e(m,s),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new _e(m,a),[0,.5,0]],[new _e(M,a)],[new _e(m,a),[0,-.5,0],[0,0,Math.PI]]],Z:[[new _e(m,o),[0,0,.5],[Math.PI/2,0,0]],[new _e(M,o),[0,0,0],[Math.PI/2,0,0]],[new _e(m,o),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new _e(new Dt(.15,.15,.01),u),[.15,.15,0]]],YZ:[[new _e(new Dt(.15,.15,.01),l),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new _e(new Dt(.15,.15,.01),c),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new _e(new Dt(.1,.1,.1),h.clone())]]},F={X:[[new _e(new $t(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new _e(new $t(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new _e(new $t(.2,0,.6,4),n),[0,.3,0]],[new _e(new $t(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new _e(new $t(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new _e(new $t(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new _e(new Dt(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new _e(new Dt(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new _e(new Dt(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new _e(new Dt(.2,.2,.2),n),[0,0,0]]]},U={X:[[new Zn(f,r.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new Zn(f,r.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new Zn(f,r.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function z(k){const ee=new yt;for(const $ in k)for(let Y=k[$].length;Y--;){const ne=k[$][Y][0].clone(),J=k[$][Y][1],be=k[$][Y][2],ae=k[$][Y][3],Z=k[$][Y][4];ne.name=$,ne.tag=Z,J&&ne.position.set(J[0],J[1],J[2]),be&&ne.rotation.set(be[0],be[1],be[2]),ae&&ne.scale.set(ae[0],ae[1],ae[2]),ne.updateMatrix();const re=ne.geometry.clone();re.applyMatrix4(ne.matrix),ne.geometry=re,ne.renderOrder=1/0,ne.position.set(0,0,0),ne.rotation.set(0,0,0),ne.scale.set(1,1,1),ee.add(ne)}return ee}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=z(S)),this.add(this.gizmo.rotate=z(P)),this.add(this.gizmo.scale=z(N)),this.add(this.picker.translate=z(E)),this.add(this.picker.rotate=z(T)),this.add(this.picker.scale=z(F)),this.add(this.helper.translate=z(R)),this.add(this.helper.rotate=z(w)),this.add(this.helper.scale=z(U)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){const n=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:wo;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let r=[];r=r.concat(this.picker[this.mode].children),r=r.concat(this.gizmo[this.mode].children),r=r.concat(this.helper[this.mode].children);for(let s=0;s<r.length;s++){const a=r[s];a.visible=!0,a.rotation.set(0,0,0),a.position.copy(this.worldPosition);let o;if(this.camera.isOrthographicCamera?o=(this.camera.top-this.camera.bottom)/this.camera.zoom:o=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),a.scale.set(1,1,1).multiplyScalar(o*this.size/4),a.tag==="helper"){a.visible=!1,a.name==="AXIS"?(a.visible=!!this.axis,this.axis==="X"&&(Pt.setFromEuler(ho.set(0,0,0)),a.quaternion.copy(n).multiply(Pt),Math.abs(gt.copy(ia).applyQuaternion(n).dot(this.eye))>.9&&(a.visible=!1)),this.axis==="Y"&&(Pt.setFromEuler(ho.set(0,0,Math.PI/2)),a.quaternion.copy(n).multiply(Pt),Math.abs(gt.copy(Pr).applyQuaternion(n).dot(this.eye))>.9&&(a.visible=!1)),this.axis==="Z"&&(Pt.setFromEuler(ho.set(0,Math.PI/2,0)),a.quaternion.copy(n).multiply(Pt),Math.abs(gt.copy(ra).applyQuaternion(n).dot(this.eye))>.9&&(a.visible=!1)),this.axis==="XYZE"&&(Pt.setFromEuler(ho.set(0,Math.PI/2,0)),gt.copy(this.rotationAxis),a.quaternion.setFromRotationMatrix(Zh.lookAt(Yh,gt,Pr)),a.quaternion.multiply(Pt),a.visible=this.dragging),this.axis==="E"&&(a.visible=!1)):a.name==="START"?(a.position.copy(this.worldPositionStart),a.visible=this.dragging):a.name==="END"?(a.position.copy(this.worldPosition),a.visible=this.dragging):a.name==="DELTA"?(a.position.copy(this.worldPositionStart),a.quaternion.copy(this.worldQuaternionStart),Mn.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),Mn.applyQuaternion(this.worldQuaternionStart.clone().invert()),a.scale.copy(Mn),a.visible=this.dragging):(a.quaternion.copy(n),this.dragging?a.position.copy(this.worldPositionStart):a.position.copy(this.worldPosition),this.axis&&(a.visible=this.axis.search(a.name)!==-1));continue}a.quaternion.copy(n),this.mode==="translate"||this.mode==="scale"?(a.name==="X"&&Math.abs(gt.copy(ia).applyQuaternion(n).dot(this.eye))>.99&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),a.name==="Y"&&Math.abs(gt.copy(Pr).applyQuaternion(n).dot(this.eye))>.99&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),a.name==="Z"&&Math.abs(gt.copy(ra).applyQuaternion(n).dot(this.eye))>.99&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),a.name==="XY"&&Math.abs(gt.copy(ra).applyQuaternion(n).dot(this.eye))<.2&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),a.name==="YZ"&&Math.abs(gt.copy(ia).applyQuaternion(n).dot(this.eye))<.2&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),a.name==="XZ"&&Math.abs(gt.copy(Pr).applyQuaternion(n).dot(this.eye))<.2&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1)):this.mode==="rotate"&&(fo.copy(n),gt.copy(this.eye).applyQuaternion(Pt.copy(n).invert()),a.name.search("E")!==-1&&a.quaternion.setFromRotationMatrix(Zh.lookAt(this.eye,Yh,Pr)),a.name==="X"&&(Pt.setFromAxisAngle(ia,Math.atan2(-gt.y,gt.z)),Pt.multiplyQuaternions(fo,Pt),a.quaternion.copy(Pt)),a.name==="Y"&&(Pt.setFromAxisAngle(Pr,Math.atan2(gt.x,gt.z)),Pt.multiplyQuaternions(fo,Pt),a.quaternion.copy(Pt)),a.name==="Z"&&(Pt.setFromAxisAngle(ra,Math.atan2(gt.y,gt.x)),Pt.multiplyQuaternions(fo,Pt),a.quaternion.copy(Pt))),a.visible=a.visible&&(a.name.indexOf("X")===-1||this.showX),a.visible=a.visible&&(a.name.indexOf("Y")===-1||this.showY),a.visible=a.visible&&(a.name.indexOf("Z")===-1||this.showZ),a.visible=a.visible&&(a.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),a.material._color=a.material._color||a.material.color.clone(),a.material._opacity=a.material._opacity||a.material.opacity,a.material.color.copy(a.material._color),a.material.opacity=a.material._opacity,this.enabled&&this.axis&&(a.name===this.axis||this.axis.split("").some(function(l){return a.name===l}))&&(a.material.color.setHex(16776960),a.material.opacity=1)}super.updateMatrixWorld(e)}}class cw extends _e{constructor(){super(new ji(1e5,1e5,2,2),new xi({visible:!1,wireframe:!0,side:fn,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(e){let t=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(t="local"),po.copy(ia).applyQuaternion(t==="local"?this.worldQuaternion:wo),Qs.copy(Pr).applyQuaternion(t==="local"?this.worldQuaternion:wo),ea.copy(ra).applyQuaternion(t==="local"?this.worldQuaternion:wo),gt.copy(Qs),this.mode){case"translate":case"scale":switch(this.axis){case"X":gt.copy(this.eye).cross(po),li.copy(po).cross(gt);break;case"Y":gt.copy(this.eye).cross(Qs),li.copy(Qs).cross(gt);break;case"Z":gt.copy(this.eye).cross(ea),li.copy(ea).cross(gt);break;case"XY":li.copy(ea);break;case"YZ":li.copy(po);break;case"XZ":gt.copy(ea),li.copy(Qs);break;case"XYZ":case"E":li.set(0,0,0);break}break;case"rotate":default:li.set(0,0,0)}li.length()===0?this.quaternion.copy(this.cameraQuaternion):(Kh.lookAt(Mn.set(0,0,0),li,gt),this.quaternion.setFromRotationMatrix(Kh)),super.updateMatrixWorld(e)}}function uw(i,e,t){e.traverse(n=>{n.material&&(i.properties.remove(n.material),n.material.dispose())}),i.info.programs.length=0,i.compile(e,t)}const hw=({focus:i=0,size:e=25,samples:t=10}={})=>{const n=Ve.shadowmap_pars_fragment;return Ve.shadowmap_pars_fragment=Ve.shadowmap_pars_fragment.replace("#ifdef USE_SHADOWMAP",`#ifdef USE_SHADOWMAP

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
      float blockerDepthSum = float(${i});
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
#if defined( SHADOWMAP_TYPE_PCF )`),(r,s,a)=>{Ve.shadowmap_pars_fragment=n,uw(r,s,a)}};function Wo(i,e,t,n){const r=class extends At{constructor(a={}){const o=Object.entries(i);super({uniforms:o.reduce((l,[c,u])=>{const h=Wr.clone({[c]:{value:u}});return{...l,...h}},{}),vertexShader:e,fragmentShader:t}),this.key="",o.forEach(([l])=>Object.defineProperty(this,l,{get:()=>this.uniforms[l].value,set:c=>this.uniforms[l].value=c})),Object.assign(this,a),n&&n(this)}};return r.key=Nt.generateUUID(),r}const Ef=Wo({},"void main() { }","void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");class Af extends qi{constructor(e=6,t=!1){super(),this.uniforms={chromaticAberration:{value:.05},transmission:{value:0},_transmission:{value:1},transmissionMap:{value:null},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new Re("white")},anisotropy:{value:.1},time:{value:0},distortion:{value:0},distortionScale:{value:.5},temporalDistortion:{value:0},buffer:{value:null}},this.onBeforeCompile=n=>{n.uniforms={...n.uniforms,...this.uniforms},t?n.defines.USE_SAMPLER="":n.defines.USE_TRANSMISSION="",n.fragmentShader=`
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
`)},Object.keys(this.uniforms).forEach(n=>Object.defineProperty(this,n,{get:()=>this.uniforms[n].value,set:r=>this.uniforms[n].value=r}))}}const Ao=Wo({depth:null,opacity:1,attenuation:2.5,anglePower:12,spotPosition:new L(0,0,0),lightColor:new Re("white"),cameraNear:0,cameraFar:1,resolution:new ye(0,0),transparent:!0,depthWrite:!1},`
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
  }`);class dw extends At{constructor(e=new ye){super({uniforms:{inputBuffer:new K(null),depthBuffer:new K(null),resolution:new K(new ye),texelSize:new K(new ye),halfTexelSize:new K(new ye),kernel:new K(0),scale:new K(1),cameraNear:new K(0),cameraFar:new K(1),minDepthThreshold:new K(0),maxDepthThreshold:new K(1),depthScale:new K(0),depthToBlurRatioBias:new K(.25)},fragmentShader:`#include <common>
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
        }`,blending:Ht,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t),this.uniforms.halfTexelSize.value.set(e,t).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}}class fw{constructor({gl:e,resolution:t,width:n=500,height:r=500,minDepthThreshold:s=0,maxDepthThreshold:a=1,depthScale:o=0,depthToBlurRatioBias:l=.25}){this.renderToScreen=!1,this.renderTargetA=new ct(t,t,{minFilter:Ue,magFilter:Ue,stencilBuffer:!1,depthBuffer:!1,encoding:e.outputEncoding}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new dw,this.convolutionMaterial.setTexelSize(1/n,1/r),this.convolutionMaterial.setResolution(new ye(n,r)),this.scene=new Hn,this.camera=new Aa,this.convolutionMaterial.uniforms.minDepthThreshold.value=s,this.convolutionMaterial.uniforms.maxDepthThreshold.value=a,this.convolutionMaterial.uniforms.depthScale.value=o,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=l,this.convolutionMaterial.defines.USE_DEPTH=o>0;const c=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),u=new Float32Array([0,0,2,0,0,2]),h=new Ft;h.setAttribute("position",new Lt(c,3)),h.setAttribute("uv",new Lt(u,2)),this.screen=new _e(h,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,t,n){const r=this.scene,s=this.camera,a=this.renderTargetA,o=this.renderTargetB,l=this.convolutionMaterial,c=l.uniforms;c.depthBuffer.value=t.depthTexture;const u=l.kernel;let h=t,d,p,v;for(p=0,v=u.length-1;p<v;++p)d=p&1?o:a,c.kernel.value=u[p],c.inputBuffer.value=h.texture,e.setRenderTarget(d),e.render(r,s),h=d;c.kernel.value=u[p],c.inputBuffer.value=h.texture,e.setRenderTarget(this.renderToScreen?null:n),e.render(r,s)}}class Ol extends gn{constructor(e={}){super(),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var t;(t=e.defines)!=null&&t.USE_UV||(e.defines.USE_UV=""),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
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
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}}const pw=""+new URL("ulmer_muenster_1k-f1744c79.exr",import.meta.url).href,mw=""+new URL("ulmer_muenster-c72270fe.webp",import.meta.url).href,gw=""+new URL("wide_street_01_1k-48a1baf6.exr",import.meta.url).href,vw=""+new URL("wide_street_01-bd1bff94.webp",import.meta.url).href,xw=""+new URL("wide_street_02_1k-e164254f.exr",import.meta.url).href,_w=""+new URL("wide_street_02-b0d1a0ff.webp",import.meta.url).href,yw=""+new URL("kloppenheim_02_1k-3bfc9f61.exr",import.meta.url).href,ww=""+new URL("kloppenheim_02-b7800856.webp",import.meta.url).href,Mw=""+new URL("dry_cracked_lake-54d5fdfd.avif",import.meta.url).href,Sw=""+new URL("dry_cracked_lake_1k-48f18a7e.hdr",import.meta.url).href,bw=""+new URL("round_platform-0102a9f9.avif",import.meta.url).href,Tw=""+new URL("round_platform_1k-67f2ee28.exr",import.meta.url).href,Ew=""+new URL("skidpan-40377cab.avif",import.meta.url).href,Aw=""+new URL("skidpan_1k-610d1329.hdr",import.meta.url).href,Pw=""+new URL("dancing_hall-23457f13.avif",import.meta.url).href,Cw=""+new URL("dancing_hall_1k-fa17ea5b.exr",import.meta.url).href,Rw=""+new URL("empty_warehouse_01-0fa6d26b.avif",import.meta.url).href,Dw=""+new URL("empty_warehouse_01_1k-8e757970.exr",import.meta.url).href,Lw=""+new URL("old_hall-923a48b9.avif",import.meta.url).href,Iw=""+new URL("old_hall_1k-2e37cfd0.exr",import.meta.url).href,dr={ulmer_muenster:{exr:pw,webP:mw,sunPos:[17,14,12],sunColor:"#ffffeb",shadowOpacity:.72,groundProj:{radius:25,height:2}},wide_street1:{exr:gw,webP:vw,sunPos:[15,24,11],sunColor:"#ffffeb",shadowOpacity:.85,groundProj:{radius:12,height:2}},wide_street2:{exr:xw,webP:_w,sunPos:[16,8,12],sunColor:"#ffffeb",shadowOpacity:.55,groundProj:{radius:25,height:2}},kloppenheim:{exr:yw,webP:ww,groundProj:{radius:25,height:2}},dry_cracked_lake:{hdr:Sw,avif:Mw,groundProj:{radius:20,height:2}},round_platform:{exr:Tw,avif:bw,groundProj:{radius:10,height:2.5}},skidpan:{hdr:Aw,avif:Ew,groundProj:{radius:50,height:4.5}},dancing_hall:{avif:Pw,exr:Cw,groundProj:{radius:20,height:3}},empty_warehouse:{avif:Rw,exr:Dw,groundProj:{radius:19,height:6}},old_hall:{avif:Lw,exr:Iw,groundProj:{radius:13,height:4}}};class jc extends gf{constructor(e){super(e),this.type=_t}parse(e){const o=function(_,y){switch(_){case 1:console.error("THREE.RGBELoader Read Error: "+(y||""));break;case 2:console.error("THREE.RGBELoader Write Error: "+(y||""));break;case 3:console.error("THREE.RGBELoader Bad File Format: "+(y||""));break;default:case 4:console.error("THREE.RGBELoader: Error: "+(y||""))}return-1},h=`
`,d=function(_,y,S){y=y||1024;let R=_.pos,P=-1,w=0,T="",N=String.fromCharCode.apply(null,new Uint16Array(_.subarray(R,R+128)));for(;0>(P=N.indexOf(h))&&w<y&&R<_.byteLength;)T+=N,w+=N.length,R+=128,N+=String.fromCharCode.apply(null,new Uint16Array(_.subarray(R,R+128)));return-1<P?(S!==!1&&(_.pos+=w+P+1),T+N.slice(0,P)):!1},p=function(_){const y=/^#\?(\S+)/,S=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,E=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,R=/^\s*FORMAT=(\S+)\s*$/,P=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,w={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let T,N;if(_.pos>=_.byteLength||!(T=d(_)))return o(1,"no header found");if(!(N=T.match(y)))return o(3,"bad initial token");for(w.valid|=1,w.programtype=N[1],w.string+=T+`
`;T=d(_),T!==!1;){if(w.string+=T+`
`,T.charAt(0)==="#"){w.comments+=T+`
`;continue}if((N=T.match(S))&&(w.gamma=parseFloat(N[1])),(N=T.match(E))&&(w.exposure=parseFloat(N[1])),(N=T.match(R))&&(w.valid|=2,w.format=N[1]),(N=T.match(P))&&(w.valid|=4,w.height=parseInt(N[1],10),w.width=parseInt(N[2],10)),w.valid&2&&w.valid&4)break}return w.valid&2?w.valid&4?w:o(3,"missing image size specifier"):o(3,"missing format specifier")},v=function(_,y,S){const E=y;if(E<8||E>32767||_[0]!==2||_[1]!==2||_[2]&128)return new Uint8Array(_);if(E!==(_[2]<<8|_[3]))return o(3,"wrong scanline width");const R=new Uint8Array(4*y*S);if(!R.length)return o(4,"unable to allocate buffer space");let P=0,w=0;const T=4*E,N=new Uint8Array(4),F=new Uint8Array(T);let U=S;for(;U>0&&w<_.byteLength;){if(w+4>_.byteLength)return o(1);if(N[0]=_[w++],N[1]=_[w++],N[2]=_[w++],N[3]=_[w++],N[0]!=2||N[1]!=2||(N[2]<<8|N[3])!=E)return o(3,"bad rgbe scanline format");let z=0,k;for(;z<T&&w<_.byteLength;){k=_[w++];const $=k>128;if($&&(k-=128),k===0||z+k>T)return o(3,"bad scanline data");if($){const Y=_[w++];for(let ne=0;ne<k;ne++)F[z++]=Y}else F.set(_.subarray(w,w+k),z),z+=k,w+=k}const ee=E;for(let $=0;$<ee;$++){let Y=0;R[P]=F[$+Y],Y+=E,R[P+1]=F[$+Y],Y+=E,R[P+2]=F[$+Y],Y+=E,R[P+3]=F[$+Y],P+=4}U--}return R},x=function(_,y,S,E){const R=_[y+3],P=Math.pow(2,R-128)/255;S[E+0]=_[y+0]*P,S[E+1]=_[y+1]*P,S[E+2]=_[y+2]*P,S[E+3]=1},m=function(_,y,S,E){const R=_[y+3],P=Math.pow(2,R-128)/255;S[E+0]=bs.toHalfFloat(Math.min(_[y+0]*P,65504)),S[E+1]=bs.toHalfFloat(Math.min(_[y+1]*P,65504)),S[E+2]=bs.toHalfFloat(Math.min(_[y+2]*P,65504)),S[E+3]=bs.toHalfFloat(1)},f=new Uint8Array(e);f.pos=0;const M=p(f);if(M!==-1){const _=M.width,y=M.height,S=v(f.subarray(f.pos),_,y);if(S!==-1){let E,R,P;switch(this.type){case lt:P=S.length/4;const w=new Float32Array(P*4);for(let N=0;N<P;N++)x(S,N*4,w,N*4);E=w,R=lt;break;case _t:P=S.length/4;const T=new Uint16Array(P*4);for(let N=0;N<P;N++)m(S,N*4,T,N*4);E=T,R=_t;break;default:console.error("THREE.RGBELoader: unsupported type: ",this.type);break}return{width:_,height:y,data:E,header:M.string,gamma:M.gamma,exposure:M.exposure,type:R}}}return null}setDataType(e){return this.type=e,this}load(e,t,n,r){function s(a,o){switch(a.type){case lt:case _t:a.encoding=vn,a.minFilter=Ue,a.magFilter=Ue,a.generateMipmaps=!1,a.flipY=!0;break}t&&t(a,o)}return super.load(e,s,n,r)}}const Uw=""+new URL("monkey_comp-d95d1bea.glb",import.meta.url).href,Nw=""+new URL("pole_comp-c0e03be1.glb",import.meta.url).href,Ow=""+new URL("porsche_911_1975_comp-3dc89b35.glb",import.meta.url).href,Fw=""+new URL("road_comp-e27e7526.glb",import.meta.url).href,Bw=""+new URL("room_comp-079f9869.glb",import.meta.url).href,zw=""+new URL("vase_2k_comp-56086561.glb",import.meta.url).href,kw=""+new URL("stanford _bunny_comp-cc57988b.glb",import.meta.url).href,kn={monkey:{url:Uw},pole:{url:Nw},porsche_1975:{url:Ow},road:{url:Fw},room:{url:Bw},vase:{url:zw},bunny:{url:kw}};let hc,cn,ei,rn,ui,ha,Xn,dc=new ye;const Tr={environment:dr.ulmer_muenster,groundProjection:!0,bgColor:new Re,printCam:()=>{}},Ma=new nn,Hw=new Zr,Gw=new Vo,Vw=new jc,Pf=new vr,Cf=new xr;let Kn;Cf.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");Pf.setDRACOLoader(Cf);const $h=new mr,_s=[];let Rf=()=>{},Po,Jh;async function Ww(i){ha=i,Po=ha.addFolder("Scene"),hc=new gr,app.appendChild(hc.dom),cn=new Xi({antialias:!0}),cn.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),cn.setSize(window.innerWidth,window.innerHeight),cn.shadowMap.enabled=!0,cn.shadowMap.type=ti,cn.outputEncoding=ke,cn.toneMapping=fr,Jh=new nc(cn),Jh.compileCubemapShader(),app.appendChild(cn.domElement),ei=new xt(50,window.innerWidth/window.innerHeight,.1,200),ei.position.set(6,3,6),ei.name="Camera",ei.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),rn=new Hn,rn.add(Ma),ui=new _r(ei,cn.domElement),ui.enableDamping=!0,ui.dampingFactor=.05,ui.minDistance=.1,ui.maxDistance=100,ui.maxPolarAngle=Math.PI/1.5,ui.target.set(0,0,0),ui.target.set(0,0,0),Kn=new Kr(ei,cn.domElement),Kn.addEventListener("dragging-changed",t=>{ui.enabled=!t.value,t.value}),Kn.addEventListener("change",()=>{Kn.object&&Kn.object.position.y<0&&(Kn.object.position.y=0)}),rn.add(Kn),window.addEventListener("resize",Xw),document.addEventListener("pointermove",Qh);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",t=>{Date.now()-e<200&&(Qh(t),Yw())}),Po.add(Kn,"mode",["translate","rotate","scale"]),jw(),await Zw(),Df()}async function jw(){let i=new nn,e=new Ho(16777195,1);e.name="Dir. Light",e.castShadow=!0,e.shadow.camera.near=.1,e.shadow.camera.far=50,e.shadow.camera.right=15,e.shadow.camera.left=-15,e.shadow.camera.top=15,e.shadow.camera.bottom=-15,e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.radius=1.95,e.shadow.blurSamples=6,e.shadow.bias=-5e-4,i.add(e),rn.add(i);const t=new _e(new ji(10,10).rotateX(-Math.PI/2),new df({}));t.name="shadowFloor",t.receiveShadow=!0,t.position.set(0,0,0),rn.add(t);async function n(s){if(!s){rn.background=null,rn.environment=null;return}if(s.exr){const a=await Gw.loadAsync(s.exr);a.mapping=Tn,rn.environment=a,console.log("exr loaded")}if(s.hdr){const a=await Vw.loadAsync(s.hdr);a.mapping=Tn,rn.environment=a,console.log("exr loaded")}if(s.webP||s.avif){const a=await Hw.loadAsync(s.webP||s.avif);a.mapping=Tn,a.encoding=ke,rn.background=a,console.log("bg loaded"),Tr.groundProjection&&r(Tr.environment)}s.sunPos?(e.visible=!0,e.position.fromArray(s.sunPos)):e.visible=!1,s.sunCol?e.color.set(s.sunCol):e.color.set(16777215),s.shadowOpacity&&(t.material.opacity=s.shadowOpacity)}function r(s){Tr.groundProjection&&rn.background&&s.groundProj?(Xn||(Xn=new Wc(rn.background),Xn.scale.setScalar(100)),Xn.material.uniforms.map.value=rn.background,Xn.radius=s.groundProj.radius,Xn.height=s.groundProj.height,Xn.parent||rn.add(Xn)):Xn&&Xn.parent&&Xn.removeFromParent()}n(Tr.environment),Po.add(Tr,"environment",dr).onChange(s=>{n(s)}),Po.add(Tr,"groundProjection").onChange(s=>{r(Tr.environment)})}function Xw(){ei.aspect=window.innerWidth/window.innerHeight,ei.updateProjectionMatrix(),cn.setSize(window.innerWidth,window.innerHeight)}function qw(){hc.update(),ui.update(),Rf(),cn.render(rn,ei)}function Df(){requestAnimationFrame(Df),qw()}function Yw(){if($h.setFromCamera(dc,ei),$h.intersectObject(Ma,!0,_s),!_s.length){Kn.detach();return}_s[0].object.selectOnRaycast?Kn.attach(_s[0].object.selectOnRaycast):Kn.attach(_s[0].object),_s.length=0}function Qh(i){dc.x=i.clientX/window.innerWidth*2-1,dc.y=-(i.clientY/window.innerHeight)*2+1}async function Zw(){const i=new _e(new jr(.5).translate(0,.5,0),new gn({color:ed(),roughness:0,metalness:1}));i.name="sphere",i.castShadow=!0,i.receiveShadow=!0,i.position.set(2,0,-1.5),Ma.add(i);const e=new _e(new Dt(1,1,1).translate(0,.5,0),new gn({color:ed(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),Ma.add(e),Kw()}async function Kw(){const i={default:"def",physical:"phy",transmission:"tra"},e={carMaterial:i.default},t={renderEachMesh:!1,enabled:!1,customBackground:rn.background,backside:!0,thickness:1,backsideThickness:.5},n=[],s=(await Pf.loadAsync(kn.porsche_1975.url)).scene;s.name="car";let a;const o=new Ef,l=new Af(6,!1),c=new qi({roughness:0,transmission:1,thickness:1});s.traverse(y=>{if(y.isMesh){y.castShadow=!0,y.receiveShadow=!0,y.selectOnRaycast=s;const S=y.material;n.push({material:S,mesh:y,physical:c,transmission:l}),y.name==="body"&&(a=y)}}),Ma.add(s),ha.add(e,"carMaterial",i).onChange(y=>{for(const S of n)y===i.default&&(S.mesh.material=S.material,t.enabled=!1),y===i.physical&&(S.mesh.material=S.physical,t.enabled=!1),y===i.transmission&&(S.mesh.material=S.transmission,t.enabled=!0)}),$w(ha,c),Jw(ha,l,t);const u=new ct(512,512,{minFilter:Ue,magFilter:Ue,encoding:cn.outputEncoding,type:_t}),h=new ct(512,512,{minFilter:Ue,magFilter:Ue,encoding:cn.outputEncoding,type:_t}),d=l;d.buffer=h.texture;let p,v,x;const m={gl:cn,scene:rn,camera:ei};let f;const M=[{mesh:a,mat:l}],_=new Go(!0);Rf=()=>{if(t.enabled){d.time=_.getElapsedTime(),t.renderEachMesh?f=n:f=M;for(let y=0;y<f.length;y++){const S=n[y].mesh;d.buffer===h.texture&&(v=m.gl.toneMapping,p=m.scene.background,x=S.material.side,m.gl.toneMapping=zn,t.background&&(m.scene.background=t.background),S.material=o,t.backside&&(m.gl.setRenderTarget(u),m.gl.render(m.scene,m.camera),S.material=d,S.material.buffer=u.texture,S.material.thickness=t.backsideThickness,S.material.side=Ot),m.gl.setRenderTarget(h),m.gl.render(m.scene,m.camera),S.material.thickness=t.thickness,S.material.side=x,S.material.buffer=h.texture,m.scene.background=p,m.gl.setRenderTarget(null),S.material=d,m.gl.toneMapping=v)}}}}function $w(i,e){const t=i.addFolder("Physical Material");t.addColor(e,"color"),t.addColor(e,"attenuationColor"),t.add(e,"attenuationDistance",0,2),t.add(e,"roughness",0,1),t.add(e,"transmission",0,1),t.add(e,"thickness",0,2),t.add(e,"reflectivity",0,1)}function Jw(i,e,t){const n=i.addFolder("Transmission Material");n.add(t,"enabled").name("Rendering Enabled").listen(),n.add(t,"backside"),n.add(t,"thickness",0,2),n.add(t,"backsideThickness",0,2),n.addColor(e,"color"),n.addColor(e,"attenuationColor"),n.add(e,"_transmission",0,1),n.add(e,"attenuationDistance",0,2),n.add(e,"roughness",0,1),n.add(e,"chromaticAberration",0,2),n.add(e,"distortion",0,10),n.add(e,"temporalDistortion",0,1),n.add(e,"anisotropy",0,10),n.add(e,"reflectivity",0,1),n.add(t,"renderEachMesh").name("⚠ Render Each Mesh separately")}const Qw=new Re;function ed(){return"#"+Qw.setHSL(Math.random(),.5,.5).getHexString()}var ii=Object.freeze({Linear:Object.freeze({None:function(i){return i},In:function(i){return this.None(i)},Out:function(i){return this.None(i)},InOut:function(i){return this.None(i)}}),Quadratic:Object.freeze({In:function(i){return i*i},Out:function(i){return i*(2-i)},InOut:function(i){return(i*=2)<1?.5*i*i:-.5*(--i*(i-2)-1)}}),Cubic:Object.freeze({In:function(i){return i*i*i},Out:function(i){return--i*i*i+1},InOut:function(i){return(i*=2)<1?.5*i*i*i:.5*((i-=2)*i*i+2)}}),Quartic:Object.freeze({In:function(i){return i*i*i*i},Out:function(i){return 1- --i*i*i*i},InOut:function(i){return(i*=2)<1?.5*i*i*i*i:-.5*((i-=2)*i*i*i-2)}}),Quintic:Object.freeze({In:function(i){return i*i*i*i*i},Out:function(i){return--i*i*i*i*i+1},InOut:function(i){return(i*=2)<1?.5*i*i*i*i*i:.5*((i-=2)*i*i*i*i+2)}}),Sinusoidal:Object.freeze({In:function(i){return 1-Math.sin((1-i)*Math.PI/2)},Out:function(i){return Math.sin(i*Math.PI/2)},InOut:function(i){return .5*(1-Math.sin(Math.PI*(.5-i)))}}),Exponential:Object.freeze({In:function(i){return i===0?0:Math.pow(1024,i-1)},Out:function(i){return i===1?1:1-Math.pow(2,-10*i)},InOut:function(i){return i===0?0:i===1?1:(i*=2)<1?.5*Math.pow(1024,i-1):.5*(-Math.pow(2,-10*(i-1))+2)}}),Circular:Object.freeze({In:function(i){return 1-Math.sqrt(1-i*i)},Out:function(i){return Math.sqrt(1- --i*i)},InOut:function(i){return(i*=2)<1?-.5*(Math.sqrt(1-i*i)-1):.5*(Math.sqrt(1-(i-=2)*i)+1)}}),Elastic:Object.freeze({In:function(i){return i===0?0:i===1?1:-Math.pow(2,10*(i-1))*Math.sin((i-1.1)*5*Math.PI)},Out:function(i){return i===0?0:i===1?1:Math.pow(2,-10*i)*Math.sin((i-.1)*5*Math.PI)+1},InOut:function(i){return i===0?0:i===1?1:(i*=2,i<1?-.5*Math.pow(2,10*(i-1))*Math.sin((i-1.1)*5*Math.PI):.5*Math.pow(2,-10*(i-1))*Math.sin((i-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(i){var e=1.70158;return i===1?1:i*i*((e+1)*i-e)},Out:function(i){var e=1.70158;return i===0?0:--i*i*((e+1)*i+e)+1},InOut:function(i){var e=2.5949095;return(i*=2)<1?.5*(i*i*((e+1)*i-e)):.5*((i-=2)*i*((e+1)*i+e)+2)}}),Bounce:Object.freeze({In:function(i){return 1-ii.Bounce.Out(1-i)},Out:function(i){return i<1/2.75?7.5625*i*i:i<2/2.75?7.5625*(i-=1.5/2.75)*i+.75:i<2.5/2.75?7.5625*(i-=2.25/2.75)*i+.9375:7.5625*(i-=2.625/2.75)*i+.984375},InOut:function(i){return i<.5?ii.Bounce.In(i*2)*.5:ii.Bounce.Out(i*2-1)*.5+.5}}),generatePow:function(i){return i===void 0&&(i=4),i=i<Number.EPSILON?Number.EPSILON:i,i=i>1e4?1e4:i,{In:function(e){return Math.pow(e,i)},Out:function(e){return 1-Math.pow(1-e,i)},InOut:function(e){return e<.5?Math.pow(e*2,i)/2:(1-Math.pow(2-e*2,i))/2+.5}}}}),sa;typeof self>"u"&&typeof process<"u"&&process.hrtime?sa=function(){var i=process.hrtime();return i[0]*1e3+i[1]/1e6}:typeof self<"u"&&self.performance!==void 0&&self.performance.now!==void 0?sa=self.performance.now.bind(self.performance):Date.now!==void 0?sa=Date.now:sa=function(){return new Date().getTime()};var aa=sa,eM=function(){function i(){this._tweens={},this._tweensAddedDuringUpdate={}}return i.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(t){return e._tweens[t]})},i.prototype.removeAll=function(){this._tweens={}},i.prototype.add=function(e){this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e},i.prototype.remove=function(e){delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]},i.prototype.update=function(e,t){e===void 0&&(e=aa()),t===void 0&&(t=!1);var n=Object.keys(this._tweens);if(n.length===0)return!1;for(;n.length>0;){this._tweensAddedDuringUpdate={};for(var r=0;r<n.length;r++){var s=this._tweens[n[r]],a=!t;s&&s.update(e,a)===!1&&!t&&delete this._tweens[n[r]]}n=Object.keys(this._tweensAddedDuringUpdate)}return!0},i}(),As={Linear:function(i,e){var t=i.length-1,n=t*e,r=Math.floor(n),s=As.Utils.Linear;return e<0?s(i[0],i[1],n):e>1?s(i[t],i[t-1],t-n):s(i[r],i[r+1>t?t:r+1],n-r)},Bezier:function(i,e){for(var t=0,n=i.length-1,r=Math.pow,s=As.Utils.Bernstein,a=0;a<=n;a++)t+=r(1-e,n-a)*r(e,a)*i[a]*s(n,a);return t},CatmullRom:function(i,e){var t=i.length-1,n=t*e,r=Math.floor(n),s=As.Utils.CatmullRom;return i[0]===i[t]?(e<0&&(r=Math.floor(n=t*(1+e))),s(i[(r-1+t)%t],i[r],i[(r+1)%t],i[(r+2)%t],n-r)):e<0?i[0]-(s(i[0],i[0],i[1],i[1],-n)-i[0]):e>1?i[t]-(s(i[t],i[t],i[t-1],i[t-1],n-t)-i[t]):s(i[r?r-1:0],i[r],i[t<r+1?t:r+1],i[t<r+2?t:r+2],n-r)},Utils:{Linear:function(i,e,t){return(e-i)*t+i},Bernstein:function(i,e){var t=As.Utils.Factorial;return t(i)/t(e)/t(i-e)},Factorial:function(){var i=[1];return function(e){var t=1;if(i[e])return i[e];for(var n=e;n>1;n--)t*=n;return i[e]=t,t}}(),CatmullRom:function(i,e,t,n,r){var s=(t-i)*.5,a=(n-e)*.5,o=r*r,l=r*o;return(2*e-2*t+s+a)*l+(-3*e+3*t-2*s-a)*o+s*r+e}}},Lf=function(){function i(){}return i.nextId=function(){return i._nextId++},i._nextId=0,i}(),fc=new eM,zr=function(){function i(e,t){t===void 0&&(t=fc),this._object=e,this._group=t,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=ii.Linear.None,this._interpolationFunction=As.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=Lf.nextId(),this._isChainStopped=!1,this._goToEnd=!1}return i.prototype.getId=function(){return this._id},i.prototype.isPlaying=function(){return this._isPlaying},i.prototype.isPaused=function(){return this._isPaused},i.prototype.to=function(e,t){return this._valuesEnd=Object.create(e),t!==void 0&&(this._duration=t),this},i.prototype.duration=function(e){return e===void 0&&(e=1e3),this._duration=e,this},i.prototype.start=function(e,t){if(e===void 0&&(e=aa()),t===void 0&&(t=!1),this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var n in this._valuesStartRepeat)this._swapEndStartRepeatValues(n),this._valuesStart[n]=this._valuesStartRepeat[n]}return this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e,this._startTime+=this._delayTime,this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,t),this},i.prototype.startFromCurrentValues=function(e){return this.start(e,!0)},i.prototype._setupProperties=function(e,t,n,r,s){for(var a in n){var o=e[a],l=Array.isArray(o),c=l?"array":typeof o,u=!l&&Array.isArray(n[a]);if(!(c==="undefined"||c==="function")){if(u){var h=n[a];if(h.length===0)continue;h=h.map(this._handleRelativeValue.bind(this,o)),t[a]===void 0&&(n[a]=[o].concat(h))}if((c==="object"||l)&&o&&!u){t[a]=l?[]:{};for(var d in o)t[a][d]=o[d];r[a]=l?[]:{},this._setupProperties(o,t[a],n[a],r[a],s)}else(typeof t[a]>"u"||s)&&(t[a]=o),l||(t[a]*=1),u?r[a]=n[a].slice().reverse():r[a]=t[a]||0}}},i.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},i.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},i.prototype.pause=function(e){return e===void 0&&(e=aa()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this._group&&this._group.remove(this),this)},i.prototype.resume=function(e){return e===void 0&&(e=aa()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},i.prototype.stopChainedTweens=function(){for(var e=0,t=this._chainedTweens.length;e<t;e++)this._chainedTweens[e].stop();return this},i.prototype.group=function(e){return e===void 0&&(e=fc),this._group=e,this},i.prototype.delay=function(e){return e===void 0&&(e=0),this._delayTime=e,this},i.prototype.repeat=function(e){return e===void 0&&(e=0),this._initialRepeat=e,this._repeat=e,this},i.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},i.prototype.yoyo=function(e){return e===void 0&&(e=!1),this._yoyo=e,this},i.prototype.easing=function(e){return e===void 0&&(e=ii.Linear.None),this._easingFunction=e,this},i.prototype.interpolation=function(e){return e===void 0&&(e=As.Linear),this._interpolationFunction=e,this},i.prototype.chain=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._chainedTweens=e,this},i.prototype.onStart=function(e){return this._onStartCallback=e,this},i.prototype.onEveryStart=function(e){return this._onEveryStartCallback=e,this},i.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},i.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},i.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},i.prototype.onStop=function(e){return this._onStopCallback=e,this},i.prototype.update=function(e,t){if(e===void 0&&(e=aa()),t===void 0&&(t=!0),this._isPaused)return!0;var n,r,s=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(e>s)return!1;t&&this.start(e,!0)}if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0),r=(e-this._startTime)/this._duration,r=this._duration===0||r>1?1:r;var a=this._easingFunction(r);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,a),this._onUpdateCallback&&this._onUpdateCallback(this._object,r),r===1)if(this._repeat>0){isFinite(this._repeat)&&this._repeat--;for(n in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[n]=="string"&&(this._valuesStartRepeat[n]=this._valuesStartRepeat[n]+parseFloat(this._valuesEnd[n])),this._yoyo&&this._swapEndStartRepeatValues(n),this._valuesStart[n]=this._valuesStartRepeat[n];return this._yoyo&&(this._reversed=!this._reversed),this._repeatDelayTime!==void 0?this._startTime=e+this._repeatDelayTime:this._startTime=e+this._delayTime,this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1,!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var o=0,l=this._chainedTweens.length;o<l;o++)this._chainedTweens[o].start(this._startTime+this._duration,!1);return this._isPlaying=!1,!1}return!0},i.prototype._updateProperties=function(e,t,n,r){for(var s in n)if(t[s]!==void 0){var a=t[s]||0,o=n[s],l=Array.isArray(e[s]),c=Array.isArray(o),u=!l&&c;u?e[s]=this._interpolationFunction(o,r):typeof o=="object"&&o?this._updateProperties(e[s],a,o,r):(o=this._handleRelativeValue(a,o),typeof o=="number"&&(e[s]=a+(o-a)*r))}},i.prototype._handleRelativeValue=function(e,t){return typeof t!="string"?t:t.charAt(0)==="+"||t.charAt(0)==="-"?e+parseFloat(t):parseFloat(t)},i.prototype._swapEndStartRepeatValues=function(e){var t=this._valuesStartRepeat[e],n=this._valuesEnd[e];typeof n=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(n):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=t},i}();Lf.nextId;var wi=fc;wi.getAll.bind(wi);wi.removeAll.bind(wi);wi.add.bind(wi);wi.remove.bind(wi);var La=wi.update.bind(wi);let pc,Nn,gi,sr,hi,Fl,td=new ye;const ki={enabled:!0,size:25,focus:0,samples:10,animate:!1},If=new nn;new Zr;new Vo;const Uf=new vr,Nf=new xr;let Yn;Nf.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");Uf.setDRACOLoader(Nf);new mr;let nd,zt;async function tM(i){Fl=i,nd=Fl.addFolder("Scene"),pc=new gr,app.appendChild(pc.dom),Nn=new Xi({antialias:!0}),Nn.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),Nn.setSize(window.innerWidth,window.innerHeight),Nn.shadowMap.enabled=!0,Nn.outputEncoding=ke,Nn.toneMapping=fr,app.appendChild(Nn.domElement),gi=new xt(50,window.innerWidth/window.innerHeight,.1,200),gi.position.set(6,3,6),gi.name="Camera",gi.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),sr=new Hn,sr.add(If),hi=new _r(gi,Nn.domElement),hi.enableDamping=!0,hi.dampingFactor=.05,hi.minDistance=.1,hi.maxDistance=100,hi.maxPolarAngle=Math.PI/1.5,hi.target.set(0,0,0),hi.target.set(0,0,0),Yn=new Kr(gi,Nn.domElement),Yn.addEventListener("dragging-changed",r=>{hi.enabled=!r.value,r.value}),Yn.addEventListener("change",()=>{Yn.object&&Yn.object.position.y<0&&(Yn.object.position.y=0)}),sr.add(Yn),window.addEventListener("resize",iM),document.addEventListener("pointermove",id);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",r=>{Date.now()-e<200&&id(r)}),nd.add(Yn,"mode",["translate","rotate","scale"]),zt=new Ho(16777195,5),zt.name="Dir. Light",zt.castShadow=!0,zt.shadow.camera.near=.01,zt.shadow.camera.far=100;const t=4;zt.shadow.camera.right=t,zt.shadow.camera.left=-t,zt.shadow.camera.top=t,zt.shadow.camera.bottom=-t,zt.shadow.mapSize.width=2048,zt.shadow.mapSize.height=2048,zt.shadow.bias=-.001,zt.position.set(2,2,-3),sr.add(zt),Yn.attach(zt);const n=new vf;sr.add(n),Of(),nM(Fl),await sM(),Ff()}function nM(i){const e=i.addFolder("PCSS");e.open(),e.onChange(()=>{Of()}),e.add(ki,"enabled"),e.add(ki,"size",1,100,1),e.add(ki,"focus",0,2),e.add(ki,"samples",1,20,1);const t=i.addFolder("Defaults");t.open(),t.addColor(zt,"color"),t.add(zt,"intensity",0,10);let n;t.add(ki,"animate").name("Animate 💡").onChange(r=>{n||(n=new zr(zt.position).to({x:Nt.randFloatSpread(5),y:Nt.randFloat(.1,5)}).duration(3e3).repeat(1/0).repeatDelay(1e3).easing(ii.Quadratic.InOut).onStart(()=>{n._valuesStart={x:zt.position.x,y:zt.position.y},n.to({x:Nt.randFloatSpread(5),y:Nt.randFloat(.1,5)})}).onRepeat(()=>{n._onStartCallback()})),r?(Yn.detach(),n.start()):(Yn.attach(zt),n.stop())})}let mo=null;async function Of(){mo&&(mo(Nn,sr,gi),mo=null),ki.enabled&&(mo=hw({size:ki.size,focus:ki.focus,samples:ki.samples}),sr.traverse(i=>{i.material&&i.material.dispose()}))}function iM(){gi.aspect=window.innerWidth/window.innerHeight,gi.updateProjectionMatrix(),Nn.setSize(window.innerWidth,window.innerHeight)}function rM(){pc.update(),La(),hi.update(),Nn.render(sr,gi)}function Ff(){requestAnimationFrame(Ff),rM()}function id(i){td.x=i.clientX/window.innerWidth*2-1,td.y=-(i.clientY/window.innerHeight)*2+1}async function sM(){const e=(await Uf.loadAsync(kn.room.url)).scene;e.name="room",e.traverse(t=>{t.isMesh&&(t.castShadow=!0,t.receiveShadow=!0,t.selectOnRaycast=e,(t==null?void 0:t.material.name)==="lampshade"&&(t.castShadow=!1,t.receiveShadow=!1))}),If.add(e)}new Re;let mc,Jt,Bn,hn,di,gc,qn,vc=new ye;const ta={environment:dr.kloppenheim,groundProjection:!1,bgColor:new Re,printCam:()=>{}},Ir=new nn,aM=new Vo,oM=new jc,Bf=new vr,zf=new xr;let Ii;zf.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");Bf.setDRACOLoader(zf);const rd=new mr,Bl=[];let kf=()=>{},Co;async function lM(i){gc=i,Co=gc.addFolder("Scene"),mc=new gr,app.appendChild(mc.dom),Jt=new Xi({antialias:!0}),Jt.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),Jt.setSize(window.innerWidth,window.innerHeight),Jt.shadowMap.enabled=!0,Jt.shadowMap.type=ti,Jt.outputEncoding=ke,Jt.toneMapping=fr,app.appendChild(Jt.domElement),Bn=new xt(50,window.innerWidth/window.innerHeight,.1,200),Bn.position.set(-16,16,16),Bn.name="Camera",hn=new Hn,hn.add(Ir),di=new _r(Bn,Jt.domElement),di.enableDamping=!0,di.dampingFactor=.05,di.minDistance=.1,di.maxDistance=100,di.maxPolarAngle=Math.PI/1.5,di.target.set(0,0,0),di.target.set(0,0,0),Ii=new Kr(Bn,Jt.domElement),Ii.addEventListener("dragging-changed",t=>{di.enabled=!t.value,t.value}),Ii.addEventListener("change",()=>{Ii.object&&Ii.object.position.y<0&&(Ii.object.position.y=0)}),hn.add(Ii),window.addEventListener("resize",uM),document.addEventListener("pointermove",sd);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",t=>{Date.now()-e<200&&(sd(t),dM())}),Co.add(Ii,"mode",["translate","rotate","scale"]),cM(),await fM(),Hf()}async function cM(){function i(t){if(!t){hn.background=null,hn.environment=null;return}t.exr&&aM.load(t.exr,n=>{n.mapping=Tn,hn.environment=n}),t.hdr&&oM.load(t.hdr,n=>{n.mapping=Tn,hn.environment=n})}function e(t){ta.groundProjection&&hn.background&&t.groundProj?(qn||(qn=new Wc(hn.background),qn.scale.setScalar(100)),qn.material.uniforms.map.value=hn.background,qn.radius=t.groundProj.radius,qn.height=t.groundProj.height,qn.parent||hn.add(qn)):qn&&qn.parent&&qn.removeFromParent()}i(ta.environment),Co.add(ta,"environment",dr).onChange(t=>{i(t)}),Co.add(ta,"groundProjection").onChange(t=>{e(ta.environment)})}function uM(){Bn.aspect=window.innerWidth/window.innerHeight,Bn.updateProjectionMatrix(),Jt.setSize(window.innerWidth,window.innerHeight)}function hM(){mc.update(),La(),kf(),di.update(),Jt.render(hn,Bn)}function Hf(){requestAnimationFrame(Hf),hM()}function dM(){rd.setFromCamera(vc,Bn),rd.intersectObject(Ir,!0,Bl),Bl.length&&(Bl.length=0)}function sd(i){vc.x=i.clientX/window.innerWidth*2-1,vc.y=-(i.clientY/window.innerHeight)*2+1}async function fM(){const i=new _e(new jr(.5).translate(0,.5,0),new gn({color:go(),roughness:0,metalness:1}));i.name="sphere",i.castShadow=!0,i.receiveShadow=!0,i.position.set(2,0,-1.5),Ir.add(i);const e=new _e(new Dt(1,1,1).translate(0,.5,0),new gn({color:go(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),Ir.add(e);const t=new _e(new ji(10,10).rotateX(-Math.PI/2),new gn({color:go(),roughness:.5,metalness:0}));t.name="floor",t.receiveShadow=!0,Ir.add(t);const r=(await Bf.loadAsync(kn.porsche_1975.url)).scene;r.name="car",r.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0,s.selectOnRaycast=r)}),Ir.add(r);for(let s=0;s<30;s++){const a=new _e(new jr(.3),new gn({color:go(),roughness:0,metalness:0}));a.name="sphere",a.castShadow=!0,a.receiveShadow=!0,a.position.set(Nt.randFloatSpread(10),Nt.randFloat(0,5),Nt.randFloatSpread(10)),Ir.add(a)}pM()}function pM(){hn.add(new vf(16777215,.5));const i=new ye;let e=1,t,n,r=16777215,s=5*4,a=.15*4,o=5;const l=new wa;l.intensity=3,l.position.set(5,5,5),l.angle=a,l.color.set(r),l.distance=s,l.castShadow=!0,l.shadow.bias=-1e-4;const c=new uy(l);hn.add(l);const u=new Ao,h=new xi({transparent:!0,opacity:.25}),d={volumeMaterial:u,basicMaterial:h};let p,v=()=>{};function x(){if(f.useDepth){const P=gM({size:f.depthResolution});let w=p;p=P[0],u.depth=P[0],v=P[1],u.resolution.copy(Jt.getSize(i)),u.resolution.multiplyScalar(Jt.getPixelRatio()),w&&w.dispose()}else u.depth=null,u.resolution.set(0,0)}u.spotPosition=l.position,u.opacity=e,u.lightColor=l.color,u.attenuation=l.distance,u.anglePower=o,u.cameraNear=Bn.near,u.cameraFar=Bn.far,t=t===void 0?.1:t,n=n===void 0?l.angle*7:n,console.log({volumeMaterial:u});const m=()=>{u.attenuation=l.distance,s=l.distance,n=Math.tan(l.angle)*l.distance,_.geometry=M(s,t,n)},f={materialType:d.volumeMaterial,helper:!1,useDepth:!1,depthResolution:256,updateVolumeGeometry:m,animateTarget:!1,animateLight:!1},M=(P,w,T)=>{const N=new $t(w,T,P,128,64,!0);return N.translate(0,-P/2,0),N.rotateX(-Math.PI/2),N},_=new _e(M(s,t,n),u);m(),l.add(_);const y=new L;kf=()=>{_.lookAt(l.target.getWorldPosition(y)),c.parent&&c.update(),f.useDepth&&(u.depth=null,v(),u.depth=p)},window.onresize=()=>{u.resolution.copy(Jt.getSize(i)),u.resolution.multiplyScalar(Jt.getPixelRatio())};function S(P){const w=P.addFolder("SpotLight Volume");w.open(),w.add(f,"materialType",d).onChange(N=>{_.material=N}),w.add(f,"useDepth").onChange(x),w.add(f,"depthResolution",128,2048,1).onChange(x),w.add(u,"opacity",0,2),w.add(u,"attenuation",0,s),w.add(u,"anglePower",0,Math.PI),w.add(u,"cameraNear",0,10),w.add(u,"cameraFar",0,10);const T=P.addFolder("SpotLight");T.open(),T.add(f,"helper").onChange(N=>{N?hn.add(c):c.removeFromParent()}),T.addColor(l,"color"),T.add(l,"intensity",0,5),T.add(l,"angle",0,Math.PI/2).onChange(m),T.add(l,"penumbra",0,1),T.add(l,"distance",.1,20).onChange(m),T.add(l.shadow,"bias",-1e-4,1e-4),T.add(f,"animateTarget").name("🚲Animate target").onChange(N=>{N?E.start():E.stop()}),T.add(f,"animateLight").name("🚲Animate light").onChange(N=>{N?R.start():R.stop()})}Ii.attach(l),S(gc);const E=ad(l.target.position,20,2e3,1e3),R=ad(l.position,20,2e3,1e3)}const mM=new Re;function go(){return"#"+mM.setHSL(Math.random(),.5,.5).getHexString()}function gM({size:i,frames:e=1/0}={}){const t=Jt,n=new L;t.getSize(n);const r=i||n.x,s=i||n.y;console.log("depth tex res",r,s);const a=new pr(r,s);a.format=yi,a.type=Ta,a.name="Depth_Buffer";let o=0;const l=vM(r,s,{depthTexture:a}),c=()=>{(e===1/0||o<e)&&(t.setRenderTarget(l),t.render(hn,Bn),t.setRenderTarget(null),o++)};return[l.depthTexture,c]}function ad(i,e,t,n){const r=new zr(i).to({x:Nt.randFloatSpread(e),z:Nt.randFloatSpread(e)},t).easing(ii.Bounce.Out).repeat(1e4).repeatDelay(n).onStart(()=>{s()}).onRepeat(()=>{s(),r.to({x:Nt.randFloatSpread(6),z:Nt.randFloatSpread(6)})}),s=()=>{r._valuesStart.x=i.x,r._valuesStart.z=i.z};return r}function vM(i,e,t){const n=Jt,r=i,s=e,a=t,{samples:o=0,depth:l,...c}=a;let u;return u=new ct(r,s,{minFilter:Ue,magFilter:Ue,encoding:n.outputEncoding,type:_t,...c}),u.samples=o,u}/**
 * postprocessing v6.30.2 build Fri Mar 31 2023
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2023 Raoul van Rüschen
 * @license Zlib
 */var Xc="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",Je={SKIP:9,SET:30,ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},da={DEFAULT:0,KEEP_MAX_DEPTH:1,DISCARD_MAX_DEPTH:2},cr={NONE:0,DEPTH:1,CONVOLUTION:2},at={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},jo={VERY_SMALL:0,SMALL:1,MEDIUM:2,LARGE:3,VERY_LARGE:4,HUGE:5},xM=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <encodings_fragment>
}`,_M="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",yM=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],wM=class extends At{constructor(i=new ot){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new K(null),texelSize:new K(new ot),scale:new K(1),kernel:new K(0)},blending:Ht,depthWrite:!1,depthTest:!1,fragmentShader:xM,vertexShader:_M}),this.toneMapped=!1,this.setTexelSize(i.x,i.y),this.kernelSize=jo.MEDIUM}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.inputBuffer=i}get kernelSequence(){return yM[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(i){this.uniforms.scale.value=i}getScale(){return this.uniforms.scale.value}setScale(i){this.uniforms.scale.value=i}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(i){this.uniforms.kernel.value=i}setKernel(i){this.kernel=i}setTexelSize(i,e){this.uniforms.texelSize.value.set(i,e,i*.5,e*.5)}setSize(i,e){const t=1/i,n=1/e;this.uniforms.texelSize.value.set(t,n,t*.5,n*.5)}},MM=`#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;
#include <encodings_fragment>
#include <dithering_fragment>
}`,Gf=class extends At{constructor(){super({name:"CopyMaterial",uniforms:{inputBuffer:new K(null),opacity:new K(1)},blending:Ht,depthWrite:!1,depthTest:!1,fragmentShader:MM,vertexShader:Xc}),this.toneMapped=!1}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}getOpacity(i){return this.uniforms.opacity.value}setOpacity(i){this.uniforms.opacity.value=i}},SM=`#include <common>
#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer0;uniform highp sampler2D depthBuffer1;
#else
uniform mediump sampler2D depthBuffer0;uniform mediump sampler2D depthBuffer1;
#endif
uniform sampler2D inputBuffer;uniform vec2 cameraNearFar;float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNearFar.x,cameraNearFar.y);
#else
return orthographicDepthToViewZ(depth,cameraNearFar.x,cameraNearFar.y);
#endif
}varying vec2 vUv;void main(){vec2 depth;
#if DEPTH_PACKING_0 == 3201
depth.x=unpackRGBAToDepth(texture2D(depthBuffer0,vUv));
#else
depth.x=texture2D(depthBuffer0,vUv).r;
#endif
#if DEPTH_PACKING_1 == 3201
depth.y=unpackRGBAToDepth(texture2D(depthBuffer1,vUv));
#else
depth.y=texture2D(depthBuffer1,vUv).r;
#endif
bool isMaxDepth=(depth.x==1.0);
#ifdef PERSPECTIVE_CAMERA
depth.x=viewZToOrthographicDepth(getViewZ(depth.x),cameraNearFar.x,cameraNearFar.y);depth.y=viewZToOrthographicDepth(getViewZ(depth.y),cameraNearFar.x,cameraNearFar.y);
#endif
#if DEPTH_TEST_STRATEGY == 0
bool keep=depthTest(depth.x,depth.y);
#elif DEPTH_TEST_STRATEGY == 1
bool keep=isMaxDepth||depthTest(depth.x,depth.y);
#else
bool keep=!isMaxDepth&&depthTest(depth.x,depth.y);
#endif
if(keep){gl_FragColor=texture2D(inputBuffer,vUv);}else{discard;}}`,bM=class extends At{constructor(){super({name:"DepthMaskMaterial",defines:{DEPTH_EPSILON:"0.0001",DEPTH_PACKING_0:"0",DEPTH_PACKING_1:"0",DEPTH_TEST_STRATEGY:da.KEEP_MAX_DEPTH},uniforms:{inputBuffer:new K(null),depthBuffer0:new K(null),depthBuffer1:new K(null),cameraNearFar:new K(new ye(1,1))},blending:Ht,depthWrite:!1,depthTest:!1,fragmentShader:SM,vertexShader:Xc}),this.toneMapped=!1,this.depthMode=Zl}set depthBuffer0(i){this.uniforms.depthBuffer0.value=i}set depthPacking0(i){this.defines.DEPTH_PACKING_0=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer0(i,e=ur){this.depthBuffer0=i,this.depthPacking0=e}set depthBuffer1(i){this.uniforms.depthBuffer1.value=i}set depthPacking1(i){this.defines.DEPTH_PACKING_1=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer1(i,e=ur){this.depthBuffer1=i,this.depthPacking1=e}get maxDepthStrategy(){return Number(this.defines.DEPTH_TEST_STRATEGY)}set maxDepthStrategy(i){this.defines.DEPTH_TEST_STRATEGY=i.toFixed(0),this.needsUpdate=!0}get keepFar(){return this.maxDepthStrategy}set keepFar(i){this.maxDepthStrategy=i?da.KEEP_MAX_DEPTH:da.DISCARD_MAX_DEPTH}getMaxDepthStrategy(){return this.maxDepthStrategy}setMaxDepthStrategy(i){this.maxDepthStrategy=i}get epsilon(){return Number(this.defines.DEPTH_EPSILON)}set epsilon(i){this.defines.DEPTH_EPSILON=i.toFixed(16),this.needsUpdate=!0}getEpsilon(){return this.epsilon}setEpsilon(i){this.epsilon=i}get depthMode(){return Number(this.defines.DEPTH_MODE)}set depthMode(i){let e;switch(i){case zd:e="false";break;case kd:e="true";break;case So:e="abs(d1 - d0) <= DEPTH_EPSILON";break;case Rc:e="abs(d1 - d0) > DEPTH_EPSILON";break;case Zl:e="d0 > d1";break;case Mo:e="d0 >= d1";break;case Hd:e="d0 <= d1";break;case Gd:default:e="d0 < d1";break}this.defines.DEPTH_MODE=i.toFixed(0),this.defines["depthTest(d0, d1)"]=e,this.needsUpdate=!0}getDepthMode(){return this.depthMode}setDepthMode(i){this.depthMode=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){i&&(this.uniforms.cameraNearFar.value.set(i.near,i.far),i instanceof xt?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}},TM=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.0555555
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <encodings_fragment>
}`,EM="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",AM=class extends At{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new K(null),texelSize:new K(new ye)},blending:Ht,depthWrite:!1,depthTest:!1,fragmentShader:TM,vertexShader:EM}),this.toneMapped=!1}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},PM=`#include <common>
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
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE gl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <encodings_fragment>
#endif
#include <dithering_fragment>
}`,CM="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",RM=class extends At{constructor(i,e,t,n,r=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:ba.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new K(null),depthBuffer:new K(null),resolution:new K(new ye),texelSize:new K(new ye),cameraNear:new K(.3),cameraFar:new K(1e3),aspect:new K(1),time:new K(0)},blending:Ht,depthWrite:!1,depthTest:!1,dithering:r}),this.toneMapped=!1,i&&this.setShaderParts(i),e&&this.setDefines(e),t&&this.setUniforms(t),this.copyCameraSettings(n)}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(i){this.uniforms.depthBuffer.value=i}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=ur){this.depthBuffer=i,this.depthPacking=e}setShaderData(i){this.setShaderParts(i.shaderParts),this.setDefines(i.defines),this.setUniforms(i.uniforms),this.setExtensions(i.extensions)}setShaderParts(i){var e,t,n,r,s;return this.fragmentShader=PM.replace(at.FRAGMENT_HEAD,(e=i.get(at.FRAGMENT_HEAD))!=null?e:"").replace(at.FRAGMENT_MAIN_UV,(t=i.get(at.FRAGMENT_MAIN_UV))!=null?t:"").replace(at.FRAGMENT_MAIN_IMAGE,(n=i.get(at.FRAGMENT_MAIN_IMAGE))!=null?n:""),this.vertexShader=CM.replace(at.VERTEX_HEAD,(r=i.get(at.VERTEX_HEAD))!=null?r:"").replace(at.VERTEX_MAIN_SUPPORT,(s=i.get(at.VERTEX_MAIN_SUPPORT))!=null?s:""),this.needsUpdate=!0,this}setDefines(i){for(const e of i.entries())this.defines[e[0]]=e[1];return this.needsUpdate=!0,this}setUniforms(i){for(const e of i.entries())this.uniforms[e[0]]=e[1];return this}setExtensions(i){this.extensions={};for(const e of i)this.extensions[e]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(i){this.encodeOutput!==i&&(i?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(i){return this.encodeOutput}setOutputEncodingEnabled(i){this.encodeOutput=i}get time(){return this.uniforms.time.value}set time(i){this.uniforms.time.value=i}setDeltaTime(i){this.uniforms.time.value+=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){i&&(this.uniforms.cameraNear.value=i.near,this.uniforms.cameraFar.value=i.far,i instanceof xt?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(i,e){const t=this.uniforms;t.resolution.value.set(i,e),t.texelSize.value.set(1/i,1/e),t.aspect.value=i/e}static get Section(){return at}},DM=`#include <common>
#if THREE_REVISION < 143
#define luminance(v) linearToRelativeLuminance(v)
#endif
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#ifdef RANGE
uniform vec2 range;
#elif defined(THRESHOLD)
uniform float threshold;uniform float smoothing;
#endif
varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);
#ifdef RANGE
float low=step(range.x,l);float high=step(l,range.y);l*=low*high;
#elif defined(THRESHOLD)
l=smoothstep(threshold,threshold+smoothing,l);
#endif
#ifdef COLOR
gl_FragColor=vec4(texel.rgb*l,l);
#else
gl_FragColor=vec4(l);
#endif
}`,LM=class extends At{constructor(i=!1,e=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:ba.replace(/\D+/g,"")},uniforms:{inputBuffer:new K(null),threshold:new K(0),smoothing:new K(1),range:new K(null)},blending:Ht,depthWrite:!1,depthTest:!1,fragmentShader:DM,vertexShader:Xc}),this.toneMapped=!1,this.colorOutput=i,this.luminanceRange=e}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get threshold(){return this.uniforms.threshold.value}set threshold(i){this.smoothing>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=i}getThreshold(){return this.threshold}setThreshold(i){this.threshold=i}get smoothing(){return this.uniforms.smoothing.value}set smoothing(i){this.threshold>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=i}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(i){this.smoothing=i}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(i){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(i){i?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(i){return this.colorOutput}setColorOutputEnabled(i){this.colorOutput=i}get useRange(){return this.luminanceRange!==null}set useRange(i){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(i){i!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=i,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(i){this.luminanceRange=i}},IM=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <encodings_fragment>
}`,UM="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",NM=class extends At{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new K(null),supportBuffer:new K(null),texelSize:new K(new ye),radius:new K(.85)},blending:Ht,depthWrite:!1,depthTest:!1,fragmentShader:IM,vertexShader:UM}),this.toneMapped=!1}set inputBuffer(i){this.uniforms.inputBuffer.value=i}set supportBuffer(i){this.uniforms.supportBuffer.value=i}get radius(){return this.uniforms.radius.value}set radius(i){this.uniforms.radius.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},OM=new Aa,nr=null;function FM(){if(nr===null){const i=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]);nr=new Ft,nr.setAttribute!==void 0?(nr.setAttribute("position",new Lt(i,3)),nr.setAttribute("uv",new Lt(e,2))):(nr.addAttribute("position",new Lt(i,3)),nr.addAttribute("uv",new Lt(e,2)))}return nr}var jt=class{constructor(i="Pass",e=new Hn,t=OM){this.name=i,this.renderer=null,this.scene=e,this.camera=t,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(i){if(this.rtt===i){const e=this.fullscreenMaterial;e!==null&&(e.needsUpdate=!0),this.rtt=!i}}set mainScene(i){}set mainCamera(i){}setRenderer(i){this.renderer=i}isEnabled(){return this.enabled}setEnabled(i){this.enabled=i}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(i){let e=this.screen;e!==null?e.material=i:(e=new _e(FM(),i),e.frustumCulled=!1,this.scene===null&&(this.scene=new Hn),this.scene.add(e),this.screen=e)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(i){this.fullscreenMaterial=i}getDepthTexture(){return null}setDepthTexture(i,e=ur){}render(i,e,t,n,r){throw new Error("Render method not implemented!")}setSize(i,e){}initialize(i,e,t){}dispose(){for(const i of Object.keys(this)){const e=this[i];(e instanceof ct||e instanceof En||e instanceof Gt||e instanceof jt)&&this[i].dispose()}}},BM=class extends jt{constructor(e,t=!0){super("CopyPass"),this.fullscreenMaterial=new Gf,this.needsSwap=!1,this.renderTarget=e,e===void 0&&(this.renderTarget=new ct(1,1,{minFilter:Ue,magFilter:Ue,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=t}get resize(){return this.autoResize}set resize(e){this.autoResize=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(e){this.autoResize=e}render(e,t,n,r,s){this.fullscreenMaterial.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){this.autoResize&&this.renderTarget.setSize(e,t)}initialize(e,t,n){n!==void 0&&(this.renderTarget.texture.type=n,n!==sn?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":e.outputEncoding===ke&&(this.renderTarget.texture.encoding=ke))}},zM=class extends jt{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(i,e,t,n,r){const s=i.state.buffers.stencil;s.setLocked(!1),s.setTest(!1)}},od=new Re,qc=class extends jt{constructor(i=!0,e=!0,t=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=i,this.depth=e,this.stencil=t,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(i,e,t){this.color=i,this.depth=e,this.stencil=t}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(i){this.overrideClearColor=i}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(i){this.overrideClearAlpha=i}render(i,e,t,n,r){const s=this.overrideClearColor,a=this.overrideClearAlpha,o=i.getClearAlpha(),l=s!==null,c=a>=0;l?(i.getClearColor(od),i.setClearColor(s,c?a:o)):c&&i.setClearAlpha(a),i.setRenderTarget(this.renderToScreen?null:e),i.clear(this.color,this.depth,this.stencil),l?i.setClearColor(od,o):c&&i.setClearAlpha(o)}},ir=-1,Dn=class extends Mi{constructor(i,e=ir,t=ir,n=1){super(),this.resizable=i,this.baseSize=new ye(1,1),this.preferredSize=new ye(e,t),this.target=this.preferredSize,this.s=n,this.effectiveSize=new ye,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){const i=this.baseSize,e=this.preferredSize,t=this.effectiveSize,n=this.scale;e.width!==ir?t.width=e.width:e.height!==ir?t.width=Math.round(e.height*(i.width/Math.max(i.height,1))):t.width=Math.round(i.width*n),e.height!==ir?t.height=e.height:e.width!==ir?t.height=Math.round(e.width/Math.max(i.width/Math.max(i.height,1),1)):t.height=Math.round(i.height*n)}get width(){return this.effectiveSize.width}set width(i){this.preferredWidth=i}get height(){return this.effectiveSize.height}set height(i){this.preferredHeight=i}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(i){this.s!==i&&(this.s=i,this.preferredSize.setScalar(ir),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getScale(){return this.scale}setScale(i){this.scale=i}get baseWidth(){return this.baseSize.width}set baseWidth(i){this.baseSize.width!==i&&(this.baseSize.width=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseWidth(){return this.baseWidth}setBaseWidth(i){this.baseWidth=i}get baseHeight(){return this.baseSize.height}set baseHeight(i){this.baseSize.height!==i&&(this.baseSize.height=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseHeight(){return this.baseHeight}setBaseHeight(i){this.baseHeight=i}setBaseSize(i,e){(this.baseSize.width!==i||this.baseSize.height!==e)&&(this.baseSize.set(i,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(i){this.preferredSize.width!==i&&(this.preferredSize.width=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(i){this.preferredWidth=i}get preferredHeight(){return this.preferredSize.height}set preferredHeight(i){this.preferredSize.height!==i&&(this.preferredSize.height=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(i){this.preferredHeight=i}setPreferredSize(i,e){(this.preferredSize.width!==i||this.preferredSize.height!==e)&&(this.preferredSize.set(i,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}copy(i){this.s=i.scale,this.baseSize.set(i.baseWidth,i.baseHeight),this.preferredSize.set(i.preferredWidth,i.preferredHeight),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height)}static get AUTO_SIZE(){return ir}},zl=!1,ld=class{constructor(i=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(i),this.meshCount=0,this.replaceMaterial=e=>{if(e.isMesh){let t;if(e.material.flatShading)switch(e.material.side){case fn:t=this.materialsFlatShadedDoubleSide;break;case Ot:t=this.materialsFlatShadedBackSide;break;default:t=this.materialsFlatShaded;break}else switch(e.material.side){case fn:t=this.materialsDoubleSide;break;case Ot:t=this.materialsBackSide;break;default:t=this.materials;break}this.originalMaterials.set(e,e.material),e.isSkinnedMesh?e.material=t[2]:e.isInstancedMesh?e.material=t[1]:e.material=t[0],++this.meshCount}}}cloneMaterial(i){if(!(i instanceof At))return i.clone();const e=i.uniforms,t=new Map;for(const r in e){const s=e[r].value;s.isRenderTargetTexture&&(e[r].value=null,t.set(r,s))}const n=i.clone();for(const r of t)e[r[0]].value=r[1],n.uniforms[r[0]].value=r[1];return n}setMaterial(i){if(this.disposeMaterials(),this.material=i,i!==null){const e=this.materials=[this.cloneMaterial(i),this.cloneMaterial(i),this.cloneMaterial(i)];for(const t of e)t.uniforms=Object.assign({},i.uniforms),t.side=ri;e[2].skinning=!0,this.materialsBackSide=e.map(t=>{const n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.side=Ot,n}),this.materialsDoubleSide=e.map(t=>{const n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.side=fn,n}),this.materialsFlatShaded=e.map(t=>{const n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n}),this.materialsFlatShadedBackSide=e.map(t=>{const n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=Ot,n}),this.materialsFlatShadedDoubleSide=e.map(t=>{const n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=fn,n})}}render(i,e,t){const n=i.shadowMap.enabled;if(i.shadowMap.enabled=!1,zl){const r=this.originalMaterials;this.meshCount=0,e.traverse(this.replaceMaterial),i.render(e,t);for(const s of r)s[0].material=s[1];this.meshCount!==r.size&&r.clear()}else{const r=e.overrideMaterial;e.overrideMaterial=this.material,i.render(e,t),e.overrideMaterial=r}i.shadowMap.enabled=n}disposeMaterials(){if(this.material!==null){const i=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(const e of i)e.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return zl}static set workaroundEnabled(i){zl=i}},kr=class extends jt{constructor(i,e,t=null){super("RenderPass",i,e),this.needsSwap=!1,this.clearPass=new qc,this.overrideMaterialManager=t===null?null:new ld(t),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get renderToScreen(){return super.renderToScreen}set renderToScreen(i){super.renderToScreen=i,this.clearPass.renderToScreen=i}get overrideMaterial(){const i=this.overrideMaterialManager;return i!==null?i.material:null}set overrideMaterial(i){const e=this.overrideMaterialManager;i!==null?e!==null?e.setMaterial(i):this.overrideMaterialManager=new ld(i):e!==null&&(e.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(i){this.overrideMaterial=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getSelection(){return this.selection}setSelection(i){this.selection=i}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(i){this.ignoreBackground=i}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(i){this.skipShadowMapUpdate=i}getClearPass(){return this.clearPass}render(i,e,t,n,r){const s=this.scene,a=this.camera,o=this.selection,l=a.layers.mask,c=s.background,u=i.shadowMap.autoUpdate,h=this.renderToScreen?null:e;o!==null&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(i.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(s.background=null),this.clearPass.enabled&&this.clearPass.render(i,e),i.setRenderTarget(h),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(i,s,a):i.render(s,a),a.layers.mask=l,s.background=c,i.shadowMap.autoUpdate=u}},kM=class extends jt{constructor(i,e,{renderTarget:t,resolutionScale:n=1,width:r=Dn.AUTO_SIZE,height:s=Dn.AUTO_SIZE,resolutionX:a=r,resolutionY:o=s}={}){super("DepthPass"),this.needsSwap=!1,this.renderPass=new kr(i,e,new Nc({depthPacking:Io}));const l=this.renderPass;l.skipShadowMapUpdate=!0,l.ignoreBackground=!0;const c=l.getClearPass();c.overrideClearColor=new Re(16777215),c.overrideClearAlpha=1,this.renderTarget=t,this.renderTarget===void 0&&(this.renderTarget=new ct(1,1,{minFilter:et,magFilter:et}),this.renderTarget.texture.name="DepthPass.Target");const u=this.resolution=new Dn(this,a,o,n);u.addEventListener("change",h=>this.setSize(u.baseWidth,u.baseHeight))}set mainScene(i){this.renderPass.mainScene=i}set mainCamera(i){this.renderPass.mainCamera=i}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}render(i,e,t,n,r){const s=this.renderToScreen?null:this.renderTarget;this.renderPass.render(i,s)}setSize(i,e){const t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height)}};function cd(i,e,t){for(const n of e){const r="$1"+i+n.charAt(0).toUpperCase()+n.slice(1),s=new RegExp("([^\\.])(\\b"+n+"\\b)","g");for(const a of t.entries())a[1]!==null&&t.set(a[0],a[1].replace(s,r))}}function HM(i,e,t){var n,r,s,a,o;let l=e.getFragmentShader(),c=e.getVertexShader();const u=l!==void 0&&/mainImage/.test(l),h=l!==void 0&&/mainUv/.test(l);if(t.attributes|=e.getAttributes(),l===void 0)throw new Error(`Missing fragment shader (${e.name})`);if(h&&t.attributes&cr.CONVOLUTION)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);if(!u&&!h)throw new Error(`Could not find mainImage or mainUv function (${e.name})`);{const d=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,p=t.shaderParts;let v=(n=p.get(at.FRAGMENT_HEAD))!=null?n:"",x=(r=p.get(at.FRAGMENT_MAIN_UV))!=null?r:"",m=(s=p.get(at.FRAGMENT_MAIN_IMAGE))!=null?s:"",f=(a=p.get(at.VERTEX_HEAD))!=null?a:"",M=(o=p.get(at.VERTEX_MAIN_SUPPORT))!=null?o:"";const _=new Set,y=new Set;if(h&&(x+=`	${i}MainUv(UV);
`,t.uvTransformation=!0),c!==null&&/mainSupport/.test(c)){const R=/mainSupport *\([\w\s]*?uv\s*?\)/.test(c);M+=`	${i}MainSupport(`,M+=R?`vUv);
`:`);
`;for(const P of c.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(const w of P[1].split(/\s*,\s*/))t.varyings.add(w),_.add(w),y.add(w);for(const P of c.matchAll(d))y.add(P[1])}for(const R of l.matchAll(d))y.add(R[1]);for(const R of e.defines.keys())y.add(R.replace(/\([\w\s,]*\)/g,""));for(const R of e.uniforms.keys())y.add(R);y.delete("while"),y.delete("for"),y.delete("if"),e.uniforms.forEach((R,P)=>t.uniforms.set(i+P.charAt(0).toUpperCase()+P.slice(1),R)),e.defines.forEach((R,P)=>t.defines.set(i+P.charAt(0).toUpperCase()+P.slice(1),R));const S=new Map([["fragment",l],["vertex",c]]);cd(i,y,t.defines),cd(i,y,S),l=S.get("fragment"),c=S.get("vertex");const E=e.blendMode;if(t.blendModes.set(E.blendFunction,E),u){e.inputColorSpace!==null&&e.inputColorSpace!==t.colorSpace&&(m+=e.inputColorSpace===ke?`color0 = LinearTosRGB(color0);
	`:`color0 = sRGBToLinear(color0);
	`),e.outputColorSpace!==null?t.colorSpace=e.outputColorSpace:e.inputColorSpace!==null&&(t.colorSpace=e.inputColorSpace);const R=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;m+=`${i}MainImage(color0, UV, `,t.attributes&cr.DEPTH&&R.test(l)&&(m+="depth, ",t.readDepth=!0),m+=`color1);
	`;const P=i+"BlendOpacity";t.uniforms.set(P,E.opacity),m+=`color0 = blend${E.blendFunction}(color0, color1, ${P});

	`,v+=`uniform float ${P};

`}if(v+=l+`
`,c!==null&&(f+=c+`
`),p.set(at.FRAGMENT_HEAD,v),p.set(at.FRAGMENT_MAIN_UV,x),p.set(at.FRAGMENT_MAIN_IMAGE,m),p.set(at.VERTEX_HEAD,f),p.set(at.VERTEX_MAIN_SUPPORT,M),e.extensions!==null)for(const R of e.extensions)t.extensions.add(R)}}var Cr=class extends jt{constructor(i,...e){super("EffectPass"),this.fullscreenMaterial=new RM(null,null,null,i),this.listener=t=>this.handleEvent(t),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(i){for(const e of this.effects)e.mainScene=i}set mainCamera(i){this.fullscreenMaterial.copyCameraSettings(i);for(const e of this.effects)e.mainCamera=i}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(i){this.fullscreenMaterial.encodeOutput=i}get dithering(){return this.fullscreenMaterial.dithering}set dithering(i){const e=this.fullscreenMaterial;e.dithering=i,e.needsUpdate=!0}setEffects(i){for(const e of this.effects)e.removeEventListener("change",this.listener);this.effects=i.sort((e,t)=>t.attributes-e.attributes);for(const e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){const i=new ZM;let e=0;for(const a of this.effects)if(a.blendMode.blendFunction===Je.DST)i.attributes|=a.getAttributes()&cr.DEPTH;else{if(i.attributes&a.getAttributes()&cr.CONVOLUTION)throw new Error(`Convolution effects cannot be merged (${a.name})`);HM("e"+e++,a,i)}let t=i.shaderParts.get(at.FRAGMENT_HEAD),n=i.shaderParts.get(at.FRAGMENT_MAIN_IMAGE),r=i.shaderParts.get(at.FRAGMENT_MAIN_UV);const s=/\bblend\b/g;for(const a of i.blendModes.values())t+=a.getShaderCode().replace(s,`blend${a.blendFunction}`)+`
`;i.attributes&cr.DEPTH?(i.readDepth&&(n=`float depth = readDepth(UV);

	`+n),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,i.colorSpace===ke&&(n+=`color0 = sRGBToLinear(color0);
	`),i.uvTransformation?(r=`vec2 transformedUv = vUv;
`+r,i.defines.set("UV","transformedUv")):i.defines.set("UV","vUv"),i.shaderParts.set(at.FRAGMENT_HEAD,t),i.shaderParts.set(at.FRAGMENT_MAIN_IMAGE,n),i.shaderParts.set(at.FRAGMENT_MAIN_UV,r),i.shaderParts.forEach((a,o,l)=>l.set(o,a==null?void 0:a.trim().replace(/^#/,`
#`))),this.skipRendering=e===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(i)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(i,e=ur){this.fullscreenMaterial.depthBuffer=i,this.fullscreenMaterial.depthPacking=e;for(const t of this.effects)t.setDepthTexture(i,e)}render(i,e,t,n,r){for(const s of this.effects)s.update(i,e,n);if(!this.skipRendering||this.renderToScreen){const s=this.fullscreenMaterial;s.inputBuffer=e.texture,s.time+=n*this.timeScale,i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}}setSize(i,e){this.fullscreenMaterial.setSize(i,e);for(const t of this.effects)t.setSize(i,e)}initialize(i,e,t){this.renderer=i;for(const n of this.effects)n.initialize(i,e,t);this.updateMaterial(),t!==void 0&&t!==sn&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(const i of this.effects)i.removeEventListener("change",this.listener),i.dispose()}handleEvent(i){switch(i.type){case"change":this.recompile();break}}},GM=class extends jt{constructor({kernelSize:i=jo.MEDIUM,resolutionScale:e=.5,width:t=Dn.AUTO_SIZE,height:n=Dn.AUTO_SIZE,resolutionX:r=t,resolutionY:s=n}={}){super("KawaseBlurPass"),this.renderTargetA=new ct(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";const a=this.resolution=new Dn(this,r,s,e);a.addEventListener("change",o=>this.setSize(a.baseWidth,a.baseHeight)),this._blurMaterial=new wM,this._blurMaterial.kernelSize=i,this.copyMaterial=new Gf}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(i){this._blurMaterial=i}get dithering(){return this.copyMaterial.dithering}set dithering(i){this.copyMaterial.dithering=i}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(i){this.blurMaterial.kernelSize=i}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get scale(){return this.blurMaterial.scale}set scale(i){this.blurMaterial.scale=i}getScale(){return this.blurMaterial.scale}setScale(i){this.blurMaterial.scale=i}getKernelSize(){return this.kernelSize}setKernelSize(i){this.kernelSize=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}render(i,e,t,n,r){const s=this.scene,a=this.camera,o=this.renderTargetA,l=this.renderTargetB,c=this.blurMaterial,u=c.kernelSequence;let h=e;this.fullscreenMaterial=c;for(let d=0,p=u.length;d<p;++d){const v=d&1?l:o;c.kernel=u[d],c.inputBuffer=h.texture,i.setRenderTarget(v),i.render(s,a),h=v}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=h.texture,i.setRenderTarget(this.renderToScreen?null:t),i.render(s,a)}setSize(i,e){const t=this.resolution;t.setBaseSize(i,e);const n=t.width,r=t.height;this.renderTargetA.setSize(n,r),this.renderTargetB.setSize(n,r),this.blurMaterial.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTargetA.texture.type=t,this.renderTargetB.texture.type=t,t!==sn?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):i.outputEncoding===ke&&(this.renderTargetA.texture.encoding=ke,this.renderTargetB.texture.encoding=ke))}static get AUTO_SIZE(){return Dn.AUTO_SIZE}},VM=class extends jt{constructor({renderTarget:i,luminanceRange:e,colorOutput:t,resolutionScale:n=1,width:r=Dn.AUTO_SIZE,height:s=Dn.AUTO_SIZE,resolutionX:a=r,resolutionY:o=s}={}){super("LuminancePass"),this.fullscreenMaterial=new LM(t,e),this.needsSwap=!1,this.renderTarget=i,this.renderTarget===void 0&&(this.renderTarget=new ct(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");const l=this.resolution=new Dn(this,a,o,n);l.addEventListener("change",c=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(i,e,t,n,r){const s=this.fullscreenMaterial;s.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){const t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height)}initialize(i,e,t){t!==void 0&&t!==sn&&(this.renderTarget.texture.type=t,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},WM=class extends jt{constructor(i,e){super("MaskPass",i,e),this.needsSwap=!1,this.clearPass=new qc(!1,!1,!0),this.inverse=!1}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get inverted(){return this.inverse}set inverted(i){this.inverse=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(i){this.inverted=i}render(i,e,t,n,r){const s=i.getContext(),a=i.state.buffers,o=this.scene,l=this.camera,c=this.clearPass,u=this.inverted?0:1,h=1-u;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),a.stencil.setFunc(s.ALWAYS,u,4294967295),a.stencil.setClear(h),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(i,null):(c.render(i,e),c.render(i,t))),this.renderToScreen?(i.setRenderTarget(null),i.render(o,l)):(i.setRenderTarget(e),i.render(o,l),i.setRenderTarget(t),i.render(o,l)),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(s.EQUAL,1,4294967295),a.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),a.stencil.setLocked(!0)}},jM=class extends jt{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new ct(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new AM,this.upsamplingMaterial=new NM,this.resolution=new ye}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(i){if(this.levels!==i){const e=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let t=0;t<i;++t){const n=e.clone();n.texture.name="Downsampling.Mipmap"+t,this.downsamplingMipmaps.push(n)}this.upsamplingMipmaps.push(e);for(let t=1,n=i-1;t<n;++t){const r=e.clone();r.texture.name="Upsampling.Mipmap"+t,this.upsamplingMipmaps.push(r)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(i){this.upsamplingMaterial.radius=i}render(i,e,t,n,r){const{scene:s,camera:a}=this,{downsamplingMaterial:o,upsamplingMaterial:l}=this,{downsamplingMipmaps:c,upsamplingMipmaps:u}=this;let h=e;this.fullscreenMaterial=o;for(let d=0,p=c.length;d<p;++d){const v=c[d];o.setSize(h.width,h.height),o.inputBuffer=h.texture,i.setRenderTarget(v),i.render(s,a),h=v}this.fullscreenMaterial=l;for(let d=u.length-1;d>=0;--d){const p=u[d];l.setSize(h.width,h.height),l.inputBuffer=h.texture,l.supportBuffer=c[d].texture,i.setRenderTarget(p),i.render(s,a),h=p}}setSize(i,e){const t=this.resolution;t.set(i,e);let n=t.width,r=t.height;for(let s=0,a=this.downsamplingMipmaps.length;s<a;++s)n=Math.round(n*.5),r=Math.round(r*.5),this.downsamplingMipmaps[s].setSize(n,r),s<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[s].setSize(n,r)}initialize(i,e,t){if(t!==void 0){const n=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(const r of n)r.texture.type=t;if(t!==sn)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(i.outputEncoding===ke)for(const r of n)r.texture.encoding=ke}}dispose(){super.dispose();for(const i of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))i.dispose()}},XM=class extends jt{constructor(i,e="inputBuffer"){super("ShaderPass"),this.fullscreenMaterial=i,this.input=e}setInput(i){this.input=i}render(i,e,t,n,r){const s=this.fullscreenMaterial.uniforms;e!==null&&s!==void 0&&s[this.input]!==void 0&&(s[this.input].value=e.texture),i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}initialize(i,e,t){t!==void 0&&t!==sn&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},kl=1/1e3,qM=1e3,YM=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(i){typeof document<"u"&&document.hidden!==void 0&&(i?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=i)}get delta(){return this._delta*kl}get fixedDelta(){return this._fixedDelta*kl}set fixedDelta(i){this._fixedDelta=i*qM}get elapsed(){return this._elapsed*kl}update(i){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(i!==void 0?i:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}handleEvent(i){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},Vf=class{constructor(i=null,{depthBuffer:e=!0,stencilBuffer:t=!1,multisampling:n=0,frameBufferType:r}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,t,r,n),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new BM,this.depthTexture=null,this.passes=[],this.timer=new YM,this.autoRenderToScreen=!0,this.setRenderer(i)}get multisampling(){return this.inputBuffer.samples||0}set multisampling(i){const e=this.inputBuffer,t=this.multisampling;t>0&&i>0?(this.inputBuffer.samples=i,this.outputBuffer.samples=i,this.inputBuffer.dispose(),this.outputBuffer.dispose()):t!==i&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(e.depthBuffer,e.stencilBuffer,e.texture.type,i),this.inputBuffer.depthTexture=this.depthTexture,this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(i){if(this.renderer=i,i!==null){const e=i.getSize(new ye),t=i.getContext().getContextAttributes().alpha,n=this.inputBuffer.texture.type;n===sn&&i.outputEncoding===ke&&(this.inputBuffer.texture.encoding=ke,this.outputBuffer.texture.encoding=ke,this.inputBuffer.dispose(),this.outputBuffer.dispose()),i.autoClear=!1,this.setSize(e.width,e.height);for(const r of this.passes)r.initialize(i,t,n)}}replaceRenderer(i,e=!0){const t=this.renderer,n=t.domElement.parentNode;return this.setRenderer(i),e&&n!==null&&(n.removeChild(t.domElement),n.appendChild(i.domElement)),t}createDepthTexture(){const i=this.depthTexture=new pr;return this.inputBuffer.depthTexture=i,this.inputBuffer.dispose(),this.inputBuffer.stencilBuffer?(i.format=Gr,i.type=Fr):i.type=or,i}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.inputBuffer.depthTexture=null,this.inputBuffer.dispose();for(const i of this.passes)i.setDepthTexture(null)}}createBuffer(i,e,t,n){const r=this.renderer,s=r===null?new ye:r.getDrawingBufferSize(new ye),a={minFilter:Ue,magFilter:Ue,stencilBuffer:e,depthBuffer:i,type:t},o=new ct(s.width,s.height,a);return n>0&&(o.ignoreDepthForMultisampleCopy=!1,o.samples=n),t===sn&&r!==null&&r.outputEncoding===ke&&(o.texture.encoding=ke),o.texture.name="EffectComposer.Buffer",o.texture.generateMipmaps=!1,o}setMainScene(i){for(const e of this.passes)e.mainScene=i}setMainCamera(i){for(const e of this.passes)e.mainCamera=i}addPass(i,e){const t=this.passes,n=this.renderer,r=n.getDrawingBufferSize(new ye),s=n.getContext().getContextAttributes().alpha,a=this.inputBuffer.texture.type;if(i.setRenderer(n),i.setSize(r.width,r.height),i.initialize(n,s,a),this.autoRenderToScreen&&(t.length>0&&(t[t.length-1].renderToScreen=!1),i.renderToScreen&&(this.autoRenderToScreen=!1)),e!==void 0?t.splice(e,0,i):t.push(i),this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!0),i.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){const o=this.createDepthTexture();for(i of t)i.setDepthTexture(o)}else i.setDepthTexture(this.depthTexture)}removePass(i){const e=this.passes,t=e.indexOf(i);if(t!==-1&&e.splice(t,1).length>0){if(this.depthTexture!==null){const s=(o,l)=>o||l.needsDepthTexture;e.reduce(s,!1)||(i.getDepthTexture()===this.depthTexture&&i.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&t===e.length&&(i.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){const i=this.passes;this.deleteDepthTexture(),i.length>0&&(this.autoRenderToScreen&&(i[i.length-1].renderToScreen=!1),this.passes=[])}render(i){const e=this.renderer,t=this.copyPass;let n=this.inputBuffer,r=this.outputBuffer,s=!1,a,o,l;i===void 0&&(this.timer.update(),i=this.timer.delta);for(const c of this.passes)c.enabled&&(c.render(e,n,r,i,s),c.needsSwap&&(s&&(t.renderToScreen=c.renderToScreen,a=e.getContext(),o=e.state.buffers.stencil,o.setFunc(a.NOTEQUAL,1,4294967295),t.render(e,n,r,i,s),o.setFunc(a.EQUAL,1,4294967295)),l=n,n=r,r=l),c instanceof WM?s=!0:c instanceof zM&&(s=!1))}setSize(i,e,t){const n=this.renderer,r=n.getSize(new ye);(i===void 0||e===void 0)&&(i=r.width,e=r.height),(r.width!==i||r.height!==e)&&n.setSize(i,e,t);const s=n.getDrawingBufferSize(new ye);this.inputBuffer.setSize(s.width,s.height),this.outputBuffer.setSize(s.width,s.height);for(const a of this.passes)a.setSize(s.width,s.height)}reset(){const i=this.timer.autoReset;this.dispose(),this.autoRenderToScreen=!0,this.timer.autoReset=i}dispose(){for(const i of this.passes)i.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose()}},ZM=class{constructor(){this.shaderParts=new Map([[at.FRAGMENT_HEAD,null],[at.FRAGMENT_MAIN_UV,null],[at.FRAGMENT_MAIN_IMAGE,null],[at.VERTEX_HEAD,null],[at.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=cr.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=vn}},Wf=class extends Set{constructor(i,e=10){super(),this.l=e,this.exclusive=!1,i!==void 0&&this.set(i)}get layer(){return this.l}set layer(i){const e=this.l;for(const t of this)t.layers.disable(e),t.layers.enable(i);this.l=i}getLayer(){return this.layer}setLayer(i){this.layer=i}isExclusive(){return this.exclusive}setExclusive(i){this.exclusive=i}clear(){const i=this.layer;for(const e of this)e.layers.disable(i);return super.clear()}set(i){this.clear();for(const e of i)this.add(e);return this}indexOf(i){return this.has(i)?0:-1}add(i){return this.exclusive?i.layers.set(this.layer):i.layers.enable(this.layer),super.add(i)}delete(i){return this.has(i)&&i.layers.disable(this.layer),super.delete(i)}toggle(i){let e;return this.has(i)?(this.delete(i),e=!1):(this.add(i),e=!0),e}setVisible(i){for(const e of this)i?e.layers.enable(0):e.layers.disable(0);return this}},KM="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y,opacity);}",$M="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,min(y.a,opacity));}",JM="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y)*0.5,opacity);}",QM="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.rg,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",eS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(step(0.0,y)*(1.0-min(vec4(1.0),(1.0-x)/y)),vec4(1.0),step(1.0,x));return mix(x,z,opacity);}",tS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=step(0.0,x)*mix(min(vec4(1.0),x/max(1.0-y,1e-9)),vec4(1.0),step(1.0,y));return mix(x,z,opacity);}",nS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x,y),opacity);}",iS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,abs(x-y),opacity);}",rS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x/max(y,1e-12),opacity);}",sS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y-2.0*x*y),opacity);}",aS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 a=min(x,1.0),b=min(y,1.0);vec4 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,y));return mix(x,z,opacity);}",oS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,step(1.0,x+y),opacity);}",lS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.r,xHSL.gb));return vec4(mix(x.rgb,z,opacity),y.a);}",cS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-y,opacity);}",uS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y*(1.0-x),opacity);}",hS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x,y),opacity);}",dS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(y+x-1.0,0.0,1.0),opacity);}",fS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x+y,1.0),opacity);}",pS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(2.0*y+x-1.0,0.0,1.0),opacity);}",mS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.rg,yHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",gS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x*y,opacity);}",vS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-abs(1.0-x-y),opacity);}",xS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,opacity);}",_S="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(2.0*y*x,1.0-2.0*(1.0-y)*(1.0-x),step(0.5,x));return mix(x,z,opacity);}",yS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 z=mix(mix(y2,x,step(0.5*x,y)),max(vec4(0.0),y2-1.0),step(x,(y2-1.0)));return mix(x,z,opacity);}",wS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(min(x*x/max(1.0-y,1e-12),1.0),y,step(1.0,y));return mix(x,z,opacity);}",MS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.r,yHSL.g,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",SS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y-min(x*y,1.0),opacity);}",bS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 w=step(0.5,y);vec4 z=mix(x-(1.0-y2)*x*(1.0-x),mix(x+(y2-1.0)*(sqrt(x)-x),x+(y2-1.0)*x*((16.0*x-12.0)*x+3.0),w*(1.0-step(0.25,x))),w);return mix(x,z,opacity);}",TS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}",ES="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x+y-1.0,0.0),opacity);}",AS="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(max(1.0-min((1.0-x)/(2.0*y),1.0),0.0),min(x/(2.0*(1.0-y)),1.0),step(0.5,y));return mix(x,z,opacity);}",PS=new Map([[Je.ADD,KM],[Je.ALPHA,$M],[Je.AVERAGE,JM],[Je.COLOR,QM],[Je.COLOR_BURN,eS],[Je.COLOR_DODGE,tS],[Je.DARKEN,nS],[Je.DIFFERENCE,iS],[Je.DIVIDE,rS],[Je.DST,null],[Je.EXCLUSION,sS],[Je.HARD_LIGHT,aS],[Je.HARD_MIX,oS],[Je.HUE,lS],[Je.INVERT,cS],[Je.INVERT_RGB,uS],[Je.LIGHTEN,hS],[Je.LINEAR_BURN,dS],[Je.LINEAR_DODGE,fS],[Je.LINEAR_LIGHT,pS],[Je.LUMINOSITY,mS],[Je.MULTIPLY,gS],[Je.NEGATION,vS],[Je.NORMAL,xS],[Je.OVERLAY,_S],[Je.PIN_LIGHT,yS],[Je.REFLECT,wS],[Je.SATURATION,MS],[Je.SCREEN,SS],[Je.SOFT_LIGHT,bS],[Je.SRC,TS],[Je.SUBTRACT,ES],[Je.VIVID_LIGHT,AS]]),CS=class extends Mi{constructor(i,e=1){super(),this._blendFunction=i,this.opacity=new K(e)}getOpacity(){return this.opacity.value}setOpacity(i){this.opacity.value=i}get blendFunction(){return this._blendFunction}set blendFunction(i){this._blendFunction=i,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(i){this.blendFunction=i}getShaderCode(){return PS.get(this.blendFunction)}},Ia=class extends Mi{constructor(i,e,{attributes:t=cr.NONE,blendFunction:n=Je.NORMAL,defines:r=new Map,uniforms:s=new Map,extensions:a=null,vertexShader:o=null}={}){super(),this.name=i,this.renderer=null,this.attributes=t,this.fragmentShader=e,this.vertexShader=o,this.defines=r,this.uniforms=s,this.extensions=a,this.blendMode=new CS(n),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=vn,this._outputColorSpace=null}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(i){this._inputColorSpace=i,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(i){this._outputColorSpace=i,this.setChanged()}set mainScene(i){}set mainCamera(i){}getName(){return this.name}setRenderer(i){this.renderer=i}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(i){this.attributes=i,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(i){this.fragmentShader=i,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(i){this.vertexShader=i,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(i,e=ur){}update(i,e,t){}setSize(i,e){}initialize(i,e,t){}dispose(){for(const i of Object.keys(this)){const e=this[i];(e instanceof ct||e instanceof En||e instanceof Gt||e instanceof jt)&&this[i].dispose()}}},RS=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=texture2D(map,uv)*intensity;}`,jf=class extends Ia{constructor({blendFunction:i=Je.SCREEN,luminanceThreshold:e=.9,luminanceSmoothing:t=.025,mipmapBlur:n=!1,intensity:r=1,radius:s=.85,levels:a=8,kernelSize:o=jo.LARGE,resolutionScale:l=.5,width:c=Dn.AUTO_SIZE,height:u=Dn.AUTO_SIZE,resolutionX:h=c,resolutionY:d=u}={}){super("BloomEffect",RS,{blendFunction:i,uniforms:new Map([["map",new K(null)],["intensity",new K(r)]])}),this.renderTarget=new ct(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new GM({kernelSize:o}),this.luminancePass=new VM({colorOutput:!0}),this.luminanceMaterial.threshold=e,this.luminanceMaterial.smoothing=t,this.mipmapBlurPass=new jM,this.mipmapBlurPass.enabled=n,this.mipmapBlurPass.radius=s,this.mipmapBlurPass.levels=a,this.uniforms.get("map").value=n?this.mipmapBlurPass.texture:this.renderTarget.texture;const p=this.resolution=new Dn(this,h,d,l);p.addEventListener("change",v=>this.setSize(p.baseWidth,p.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get dithering(){return this.blurPass.dithering}set dithering(i){this.blurPass.dithering=i}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(i){this.blurPass.kernelSize=i}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(i){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(i){this.uniforms.get("intensity").value=i}getIntensity(){return this.intensity}setIntensity(i){this.intensity=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}update(i,e,t){const n=this.renderTarget,r=this.luminancePass;r.enabled?(r.render(i,e),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,r.renderTarget):this.blurPass.render(i,r.renderTarget,n)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,e):this.blurPass.render(i,e,n)}setSize(i,e){const t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height),this.blurPass.resolution.copy(t),this.luminancePass.setSize(i,e),this.mipmapBlurPass.setSize(i,e)}initialize(i,e,t){this.blurPass.initialize(i,e,t),this.luminancePass.initialize(i,e,t),this.mipmapBlurPass.initialize(i,e,t),t!==void 0&&(this.renderTarget.texture.type=t,i.outputEncoding===ke&&(this.renderTarget.texture.encoding=ke))}},DS=`#if THREE_REVISION < 143
#define luminance(v) linearToRelativeLuminance(v)
#endif
#define QUALITY(q) ((q) < 5 ? 1.0 : ((q) > 5 ? ((q) < 10 ? 2.0 : ((q) < 11 ? 4.0 : 8.0)) : 1.5))
#define ONE_OVER_TWELVE 0.08333333333333333
varying vec2 vUvDown;varying vec2 vUvUp;varying vec2 vUvLeft;varying vec2 vUvRight;varying vec2 vUvDownLeft;varying vec2 vUvUpRight;varying vec2 vUvUpLeft;varying vec2 vUvDownRight;vec4 fxaa(const in vec4 inputColor,const in vec2 uv){float lumaCenter=luminance(inputColor.rgb);float lumaDown=luminance(texture2D(inputBuffer,vUvDown).rgb);float lumaUp=luminance(texture2D(inputBuffer,vUvUp).rgb);float lumaLeft=luminance(texture2D(inputBuffer,vUvLeft).rgb);float lumaRight=luminance(texture2D(inputBuffer,vUvRight).rgb);float lumaMin=min(lumaCenter,min(min(lumaDown,lumaUp),min(lumaLeft,lumaRight)));float lumaMax=max(lumaCenter,max(max(lumaDown,lumaUp),max(lumaLeft,lumaRight)));float lumaRange=lumaMax-lumaMin;if(lumaRange<max(EDGE_THRESHOLD_MIN,lumaMax*EDGE_THRESHOLD_MAX)){return inputColor;}float lumaDownLeft=luminance(texture2D(inputBuffer,vUvDownLeft).rgb);float lumaUpRight=luminance(texture2D(inputBuffer,vUvUpRight).rgb);float lumaUpLeft=luminance(texture2D(inputBuffer,vUvUpLeft).rgb);float lumaDownRight=luminance(texture2D(inputBuffer,vUvDownRight).rgb);float lumaDownUp=lumaDown+lumaUp;float lumaLeftRight=lumaLeft+lumaRight;float lumaLeftCorners=lumaDownLeft+lumaUpLeft;float lumaDownCorners=lumaDownLeft+lumaDownRight;float lumaRightCorners=lumaDownRight+lumaUpRight;float lumaUpCorners=lumaUpRight+lumaUpLeft;float edgeHorizontal=(abs(-2.0*lumaLeft+lumaLeftCorners)+abs(-2.0*lumaCenter+lumaDownUp)*2.0+abs(-2.0*lumaRight+lumaRightCorners));float edgeVertical=(abs(-2.0*lumaUp+lumaUpCorners)+abs(-2.0*lumaCenter+lumaLeftRight)*2.0+abs(-2.0*lumaDown+lumaDownCorners));bool isHorizontal=(edgeHorizontal>=edgeVertical);float stepLength=isHorizontal?texelSize.y:texelSize.x;float luma1=isHorizontal?lumaDown:lumaLeft;float luma2=isHorizontal?lumaUp:lumaRight;float gradient1=abs(luma1-lumaCenter);float gradient2=abs(luma2-lumaCenter);bool is1Steepest=gradient1>=gradient2;float gradientScaled=0.25*max(gradient1,gradient2);float lumaLocalAverage=0.0;if(is1Steepest){stepLength=-stepLength;lumaLocalAverage=0.5*(luma1+lumaCenter);}else{lumaLocalAverage=0.5*(luma2+lumaCenter);}vec2 currentUv=uv;if(isHorizontal){currentUv.y+=stepLength*0.5;}else{currentUv.x+=stepLength*0.5;}vec2 offset=isHorizontal?vec2(texelSize.x,0.0):vec2(0.0,texelSize.y);vec2 uv1=currentUv-offset*QUALITY(0);vec2 uv2=currentUv+offset*QUALITY(0);float lumaEnd1=luminance(texture2D(inputBuffer,uv1).rgb);float lumaEnd2=luminance(texture2D(inputBuffer,uv2).rgb);lumaEnd1-=lumaLocalAverage;lumaEnd2-=lumaLocalAverage;bool reached1=abs(lumaEnd1)>=gradientScaled;bool reached2=abs(lumaEnd2)>=gradientScaled;bool reachedBoth=reached1&&reached2;if(!reached1){uv1-=offset*QUALITY(1);}if(!reached2){uv2+=offset*QUALITY(1);}if(!reachedBoth){for(int i=2;i<SAMPLES;++i){if(!reached1){lumaEnd1=luminance(texture2D(inputBuffer,uv1).rgb);lumaEnd1=lumaEnd1-lumaLocalAverage;}if(!reached2){lumaEnd2=luminance(texture2D(inputBuffer,uv2).rgb);lumaEnd2=lumaEnd2-lumaLocalAverage;}reached1=abs(lumaEnd1)>=gradientScaled;reached2=abs(lumaEnd2)>=gradientScaled;reachedBoth=reached1&&reached2;if(!reached1){uv1-=offset*QUALITY(i);}if(!reached2){uv2+=offset*QUALITY(i);}if(reachedBoth){break;}}}float distance1=isHorizontal?(uv.x-uv1.x):(uv.y-uv1.y);float distance2=isHorizontal?(uv2.x-uv.x):(uv2.y-uv.y);bool isDirection1=distance1<distance2;float distanceFinal=min(distance1,distance2);float edgeThickness=(distance1+distance2);bool isLumaCenterSmaller=lumaCenter<lumaLocalAverage;bool correctVariation1=(lumaEnd1<0.0)!=isLumaCenterSmaller;bool correctVariation2=(lumaEnd2<0.0)!=isLumaCenterSmaller;bool correctVariation=isDirection1?correctVariation1:correctVariation2;float pixelOffset=-distanceFinal/edgeThickness+0.5;float finalOffset=correctVariation?pixelOffset:0.0;float lumaAverage=ONE_OVER_TWELVE*(2.0*(lumaDownUp+lumaLeftRight)+lumaLeftCorners+lumaRightCorners);float subPixelOffset1=clamp(abs(lumaAverage-lumaCenter)/lumaRange,0.0,1.0);float subPixelOffset2=(-2.0*subPixelOffset1+3.0)*subPixelOffset1*subPixelOffset1;float subPixelOffsetFinal=subPixelOffset2*subPixelOffset2*SUBPIXEL_QUALITY;finalOffset=max(finalOffset,subPixelOffsetFinal);vec2 finalUv=uv;if(isHorizontal){finalUv.y+=finalOffset*stepLength;}else{finalUv.x+=finalOffset*stepLength;}return texture2D(inputBuffer,finalUv);}void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=fxaa(inputColor,uv);}`,LS="varying vec2 vUvDown;varying vec2 vUvUp;varying vec2 vUvLeft;varying vec2 vUvRight;varying vec2 vUvDownLeft;varying vec2 vUvUpRight;varying vec2 vUvUpLeft;varying vec2 vUvDownRight;void mainSupport(const in vec2 uv){vUvDown=uv+vec2(0.0,-1.0)*texelSize;vUvUp=uv+vec2(0.0,1.0)*texelSize;vUvRight=uv+vec2(1.0,0.0)*texelSize;vUvLeft=uv+vec2(-1.0,0.0)*texelSize;vUvDownLeft=uv+vec2(-1.0,-1.0)*texelSize;vUvUpRight=uv+vec2(1.0,1.0)*texelSize;vUvUpLeft=uv+vec2(-1.0,1.0)*texelSize;vUvDownRight=uv+vec2(1.0,-1.0)*texelSize;}",IS=class extends Ia{constructor({blendFunction:i=Je.SRC}={}){super("FXAAEffect",DS,{vertexShader:LS,blendFunction:i,defines:new Map([["EDGE_THRESHOLD_MIN","0.0312"],["EDGE_THRESHOLD_MAX","0.125"],["SUBPIXEL_QUALITY","0.75"],["SAMPLES","12"]])})}get minEdgeThreshold(){return Number(this.defines.get("EDGE_THRESHOLD_MIN"))}set minEdgeThreshold(i){this.defines.set("EDGE_THRESHOLD_MIN",i.toFixed(12)),this.setChanged()}get maxEdgeThreshold(){return Number(this.defines.get("EDGE_THRESHOLD_MAX"))}set maxEdgeThreshold(i){this.defines.set("EDGE_THRESHOLD_MAX",i.toFixed(12)),this.setChanged()}get subpixelQuality(){return Number(this.defines.get("SUBPIXEL_QUALITY"))}set subpixelQuality(i){this.defines.set("SUBPIXEL_QUALITY",i.toFixed(12)),this.setChanged()}get samples(){return Number(this.defines.get("SAMPLES"))}set samples(i){this.defines.set("SAMPLES",i.toFixed(0)),this.setChanged()}};new L;new Le;new Re;new L;new L;var US=class extends jf{constructor(i,e,t){super(t),this.setAttributes(this.getAttributes()|cr.DEPTH),this.camera=e,this.depthPass=new kM(i,e),this.clearPass=new qc(!0,!1,!1),this.clearPass.overrideClearColor=new Re(0),this.depthMaskPass=new XM(new bM);const n=this.depthMaskMaterial;n.copyCameraSettings(e),n.depthBuffer1=this.depthPass.texture,n.depthPacking1=Io,n.depthMode=So,this.renderTargetMasked=new ct(1,1,{depthBuffer:!1}),this.renderTargetMasked.texture.name="Bloom.Masked",this.selection=new Wf,this.selection.layer=11,this._inverted=!1,this._ignoreBackground=!1}set mainScene(i){this.depthPass.mainScene=i}set mainCamera(i){this.camera=i,this.depthPass.mainCamera=i,this.depthMaskMaterial.copyCameraSettings(i)}getSelection(){return this.selection}get depthMaskMaterial(){return this.depthMaskPass.fullscreenMaterial}get inverted(){return this._inverted}set inverted(i){this._inverted=i,this.depthMaskMaterial.depthMode=i?Rc:So}isInverted(){return this.inverted}setInverted(i){this.inverted=i}get ignoreBackground(){return this._ignoreBackground}set ignoreBackground(i){this._ignoreBackground=i,this.depthMaskMaterial.maxDepthStrategy=i?da.DISCARD_MAX_DEPTH:da.KEEP_MAX_DEPTH}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(i){this.ignoreBackground=i}setDepthTexture(i,e=ur){this.depthMaskMaterial.depthBuffer0=i,this.depthMaskMaterial.depthPacking0=e}update(i,e,t){const n=this.camera,r=this.selection,s=this.inverted;let a=e;if(this.ignoreBackground||!s||r.size>0){const o=n.layers.mask;n.layers.set(r.layer),this.depthPass.render(i),n.layers.mask=o,a=this.renderTargetMasked,this.clearPass.render(i,a),this.depthMaskPass.render(i,e,a)}super.update(i,a,t)}setSize(i,e){super.setSize(i,e),this.renderTargetMasked.setSize(i,e),this.depthPass.setSize(i,e)}initialize(i,e,t){super.initialize(i,e,t),this.clearPass.initialize(i,e,t),this.depthPass.initialize(i,e,t),this.depthMaskPass.initialize(i,e,t),t!==void 0&&(this.renderTargetMasked.texture.type=t,i.outputEncoding===ke&&(this.renderTargetMasked.texture.encoding=ke))}};const ud=new Zr,Hl=new Vo,Gl=new jc,ci={None:null,Color:"color",Default:"default",GroundProjection:"gp"},vo={None:null,HDRI:"hdri"};class Ua{constructor(e){this.scene=e,this.preset=Object.values(dr)[0],this.environmentType=vo.None,this.backgroundType=ci.GroundProjection,this.gpRadius=10,this.gpHeight=1,this.bgColor=new Re("#ffffff"),this.sunEnabled,this.sunPivot,this.sunLight,this.sunPos=new L(1,1,1),this.sunColor=new Re("#ffffff"),this.shadowFloorEnabled,this.shadowFloor,this.shadowOpacity=1,this.envTexture,this.bgTexture,this.groundProjectedSkybox,this.envCache={},this.bgCache={},this.guiFolder=null}init(){this.sunEnabled&&!this.sunPivot&&(this.sunPivot=new nn,this.sunPivot.name="sun_pivot",this.sunLight=new Ho(16777195,1),this.sunLight.name="sun",this.sunLight.color=this.sunColor,this.sunLight.castShadow=!0,this.sunLight.shadow.camera.near=.1,this.sunLight.shadow.camera.far=50,this.sunLight.shadow.camera.right=15,this.sunLight.shadow.camera.left=-15,this.sunLight.shadow.camera.top=15,this.sunLight.shadow.camera.bottom=-15,this.sunLight.shadow.mapSize.width=1024,this.sunLight.shadow.mapSize.height=1024,this.sunLight.shadow.radius=1.95,this.sunLight.shadow.blurSamples=6,sunLight.shadow.bias=-5e-4,this.sunPivot.add(sunLight)),this.shadowFloorEnabled&&!this.shadowFloor&&(this.shadowFloor=new _e(new ji(10,10).rotateX(-Math.PI/2),new df({opacity:this.shadowOpacity})),this.shadowFloor.name="shadow_floor",this.shadowFloor.receiveShadow=!0,this.shadowFloor.position.set(0,.001,0))}setEnvType(e){this.environmentType=vo[e]}setBGType(e){this.backgroundType=ci[e]}useFullFloat(){Hl.setDataType(lt),Gl.setDataType(lt)}addGui(e){const t=e.addFolder("BG & ENV");return this.guiFolder=t,t.add(this,"preset",dr).onChange(n=>{this.preset=n,this.updateAll()}),t.add(this,"environmentType",vo).onChange(()=>{this.updateAll()}),t.add(this,"backgroundType",ci).onChange(n=>{var r;this.updateAll(),n===ci.Color?this.bgColorPicker=t.addColor(this,"bgColor"):((r=this.bgColorPicker)==null||r.destroy(),this.bgColorPicker=null)}),t}async updateAll(){var t;const e=this.preset;if(this.init(),await Promise.all([this.downloadEnvironment(e),this.downloadBackground(e)]),this.scene.environment=this.envTexture,this.bgTexture||(this.scene.background=null,this.backgroundType===ci.Color&&(this.scene.background=this.bgColor)),this.backgroundType===ci.GroundProjection&&this.bgTexture)this.scene.background=null,this.groundProjectedSkybox||(this.groundProjectedSkybox=new Wc(this.bgTexture),this.groundProjectedSkybox.scale.setScalar(100)),e.groundProj.radius&&(this.gpRadius=e.groundProj.radius),e.groundProj.height&&(this.gpHeight=e.groundProj.height),this.bgTexture.minFilter=Ue,this.groundProjectedSkybox.material.uniforms.map.value=this.bgTexture,this.groundProjectedSkybox.radius=this.gpRadius,this.groundProjectedSkybox.height=this.gpHeight,this.scene.add(this.groundProjectedSkybox);else switch((t=this.groundProjectedSkybox)!=null&&t.parent&&this.groundProjectedSkybox.removeFromParent(),this.backgroundType){case ci.Default:{this.scene.background=this.bgTexture;break}case ci.Color:{this.scene.background=this.bgColor;break}default:{this.scene.background=null;break}}}async downloadEnvironment({exr:e,hdr:t}={}){const n=e||t;if(this.environmentType===vo.None){this.envTexture=null;return}let r=this.envCache[n];r||(r=e?await Hl.loadAsync(n):await Gl.loadAsync(n),this.envCache[n]=r,r.mapping=Tn),this.envTexture=r}async downloadBackground({webP:e,avif:t}={}){const n=e||t;if(!(this.backgroundType===ci.Default||this.backgroundType===ci.GroundProjection)){this.bgTexture=null;return}if(n){let r=this.bgCache[n];r||(r=await ud.loadAsync(n),this.bgCache[n]=r,r.mapping=Tn,r.encoding=ke),this.bgTexture=r}}async setupEnvironment(){loadEnv(this.environmentType)}async loadEnv(e){if(!e){scene.background=null,scene.environment=null;return}if(e.exr){const t=await Hl.loadAsync(e.exr);t.mapping=Tn,scene.environment=t,env=t,console.log("exr loaded")}if(e.hdr){const t=await Gl.loadAsync(e.hdr);t.mapping=Tn,scene.environment=t,bg=t,console.log("exr loaded")}if(e.webP||e.avif){const t=await ud.loadAsync(e.webP||e.avif);t.mapping=Tn,t.encoding=ke,scene.background=t,console.log("bg loaded"),params.groundProjection&&loadGroundProj(params.environment)}e.sunPos?(sunLight.visible=!0,sunLight.position.fromArray(e.sunPos)):sunLight.visible=!1,e.sunColor?sunLight.color.set(e.sunColor):sunLight.color.set(16777215)}}let xc,un,fa,Ur,Qt,pi,Ui,Hr,hd=new ye;const NS={printCam:()=>{},pixelRatio:Math.min(1.5,window.devicePixelRatio)},Xo=new nn,qo=new vr,Xf=new xr;let Er;Xf.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");qo.setDRACOLoader(Xf);new mr;let qf=()=>{},Vl;async function OS(i){Hr=i,Vl=Hr.addFolder("Scene"),xc=new gr,app.appendChild(xc.dom),un=new Xi({powerPreference:"high-performance",antialias:!1,stencil:!1,depth:!1}),un.setPixelRatio(NS.pixelRatio),un.setSize(window.innerWidth,window.innerHeight),un.shadowMap.enabled=!0,un.shadowMap.type=ti,un.outputEncoding=ke,un.toneMapping=fr,app.appendChild(un.domElement),Qt=new xt(50,window.innerWidth/window.innerHeight,.1,200),Qt.position.set(5,2,5),Qt.name="Camera",pi=new Hn,pi.add(Xo),fa=new Vf(un,{multisampling:4}),fa.addPass(new kr(pi,Qt)),Ur=new US(pi,Qt,{luminanceThreshold:0,luminanceSmoothing:0,intensity:90,mipmapBlur:!0}),Ur.ignoreBackground=!0,Ur.mipmapBlurPass.radius=.3,Ur.mipmapBlurPass.levels=4;const e=new Cr(Qt,Ur);fa.addPass(e),Ui=new _r(Qt,un.domElement),Ui.enableDamping=!0,Ui.dampingFactor=.05,Ui.minDistance=.1,Ui.maxDistance=100,Ui.maxPolarAngle=Math.PI/1.5,Ui.target.set(0,0,0),Er=new Kr(Qt,un.domElement),Er.addEventListener("dragging-changed",a=>{Ui.enabled=!a.value,a.value}),Er.addEventListener("change",()=>{Er.object&&Er.object.position.y<0&&(Er.object.position.y=0)}),pi.add(Er),pi.fog=new Oc(0,.1),window.addEventListener("resize",FS),document.addEventListener("pointermove",dd);let t=Date.now();app.addEventListener("pointerdown",()=>{t=Date.now()}),app.addEventListener("pointerup",a=>{Date.now()-t<200&&dd(a)});const n=new Ua(pi);n.preset=dr.kloppenheim,n.setEnvType("HDRI"),n.setBGType("Color"),n.bgColor.set(0),n.updateAll(),n.addGui(Vl),await zS();const r={int:.15};function s(){pi.traverse(a=>{a.material&&a.material.envMapIntensity!==void 0&&(a.material.envMapIntensity=r.int,a.material.type==="MeshPhysicalMaterial"&&console.log(a.material))})}s(),Vl.add(r,"int",0,1).onChange(s),Yf()}function FS(){Qt.aspect=window.innerWidth/window.innerHeight,Qt.updateProjectionMatrix(),fa.setSize(window.innerWidth,window.innerHeight)}function BS(){xc.update(),La(),qf(),Ui.update(),fa.render()}function Yf(){requestAnimationFrame(Yf),BS()}function dd(i){hd.x=i.clientX/window.innerWidth*2-1,hd.y=-(i.clientY/window.innerHeight)*2+1}async function zS(){await GS(),un.compile(pi,Qt)}const Ro=(i,e,t)=>{const n=new $t(e,t,i,128,64,!0);return n.translate(0,-i/2,0),n.rotateX(-Math.PI/2),n},Rr=(i,e,t)=>{e.material.attenuation=i.distance;let n=Math.tan(i.angle)*i.distance;e.geometry=Ro(i.distance,t,n)};function kS({size:i,frames:e=1/0}={}){const t=un,n=new L;t.getSize(n);const r=i||n.x,s=i||n.y;console.log("depth tex res",r,s);const a=new pr(r,s);a.format=yi,a.type=Ta,a.name="Depth_Buffer";let o=0;const l=HS(r,s,{depthTexture:a}),c=()=>{(e===1/0||o<e)&&(t.setRenderTarget(l),t.render(pi,Qt),t.setRenderTarget(null),o++)};return[l.depthTexture,c]}function HS(i,e,t){const n=un,r=i,s=e,a=t,{samples:o=0,depth:l,...c}=a;let u;return u=new ct(r,s,{minFilter:Ue,magFilter:Ue,encoding:n.outputEncoding,type:_t,...c}),u.samples=o,u}async function GS(){const i=[],e={speed:10,useDepth:!1,depthResolution:1024},[t,n,r]=await Promise.all([WS(),VS(i),jS(i)]),s=new L,a=()=>{e.useDepth&&(un.getSize(s),s.multiplyScalar(un.getPixelRatio()))};window.addEventListener("resize",a);let o=()=>{};function l(){if(e.useDepth){const d=kS({size:e.depthResolution});let p;for(const v of i)p=v.depth,v.depth=d[0],v.resolution=s;a(),o=d[1],p&&p.dispose()}else for(const d of i)d.depth=null,d.resolution.set(0,0)}Hr.add(e,"useDepth").onChange(l),Hr.add(e,"depthResolution",128,1024,128).onChange(l),Hr.add(e,"speed",.1,20).onChange();const c=new Go(!0);let u,h;qf=()=>{if(h=c.getDelta()*e.speed,t(h),n(h),r(h),e.useDepth){for(const d of i)u=d.depth,d.depth=null;o();for(const d of i)d.depth=u}}}async function VS(i){const t=(await qo.loadAsync(kn.porsche_1975.url)).scene;t.name="car",t.traverse(P=>{P.isMesh&&(P.selectOnRaycast=t,P.material.transparent||(P.castShadow=!0,P.receiveShadow=!0))}),Xo.add(t);const n={FL:t.getObjectByName("wheel_L"),FR:t.getObjectByName("wheel_R"),R:t.getObjectByName("wheels_rear"),body:t.getObjectByName("body"),steerL:t.getObjectByName("steer_L"),steerR:t.getObjectByName("steer_R"),steerVal:0,emit:t.getObjectByName("emit"),lights:t.getObjectByName("lights"),wheenSpinMultiplier:1.8};n.emit.material=new gn,n.emit.material.color.set(0),n.emit.material.emissive.set("#ffbb73"),n.lights.material.emissiveIntensity=3;const r={distance:8},s=new wa;s.intensity=5,s.color.set("#ffbb73"),s.angle=Nt.degToRad(20),s.penumbra=.2,s.distance=r.distance;const a=s.clone();t.add(s,a),t.add(s.target,a.target),s.position.set(-.66,.66,2),s.target.position.set(-.66,.25,10),a.position.set(.66,.66,2),a.target.position.set(.66,.25,10);let o=.08;const l=new Ao;l.opacity=1,l.lightColor=s.color,l.attenuation=r.distance,l.anglePower=5,l.cameraNear=Qt.near,l.cameraFar=Qt.far;const c=new Ao;c.opacity=1,c.lightColor=a.color,c.attenuation=r.distance,c.anglePower=l.anglePower,c.cameraNear=Qt.near,c.cameraFar=Qt.far,i.push(l,c);const u=new _e(Ro(r.distance,o,.5),l),h=new _e(Ro(r.distance,o,.5),c);s.add(u),a.add(h);const d=new L;u.lookAt(s.target.position),h.lookAt(a.target.position),Rr(s,u,o),Rr(a,h,o);const p=new wa(16711680,.05);p.penumbra=1,p.position.set(.62,.64,-2),p.target.position.set(.62,0,-4);const v=p.clone();v.position.set(-.62,.64,-2),v.target.position.set(-.62,0,-4),t.add(p,p.target,v,v.target);function x(P){const w=P.addFolder("HeadLight"),T=w.addFolder("Headlights Volume");T.add(l,"opacity",0,2).onChange(N=>{c.opacity=N}),T.add(l,"anglePower",0,15).onChange(N=>{c.anglePower=N}),w.addColor(s,"color").onChange(()=>{a.color.copy(s.color)}),w.add(s,"intensity",0,5).onChange(()=>{a.intensity=s.intensity}),w.add(s,"angle",0,Math.PI/2).onChange(()=>{a.angle=s.angle,Rr(s,u,o),Rr(a,h,o)}),w.add(s,"penumbra",0,1).onChange(()=>{a.penumbra=s.penumbra}),w.add(r,"distance",.1,20).onChange(N=>{s.distance=N,a.distance=N,Rr(s,u,o),Rr(a,h,o)})}x(Hr);const m=Nt.degToRad(15),f=Nt.degToRad(5),M=.25;function _(){const P=Nt.mapLinear(n.steerVal,-1,1,-m,m);n.steerL.rotation.y=P,n.steerR.rotation.y=P,n.body.rotation.z=Nt.mapLinear(n.steerVal,-1,1,-f,f)}const y=new zr(n).to({steerVal:0}).duration(1e3).easing(ii.Elastic.Out).onStart(()=>{y._valuesStart.steerVal=n.steerVal}).onUpdate(()=>{_()});let S=!0;const E=new zr(n).to({steerVal:1}).duration(1e3).easing(ii.Back.Out).delay(1e3).onStart(()=>{E.delay(Nt.randInt(100,4e3)),S?(E.to({steerVal:1}),R.to({x:M})):(E.to({steerVal:-1}),R.to({x:-M})),S=!S,E._valuesStart.steerVal=n.steerVal,R.start()}).onUpdate(()=>{_()});E.chain(y),y.chain(E),setTimeout(()=>{E.start()},2e3);const R=new zr(t.position).to({x:0}).duration(2e3).easing(ii.Quadratic.InOut).onStart(()=>{R._valuesStart.x=t.position.x});return Ur.selection.add(n.emit),P=>{l.spotPosition.copy(u.getWorldPosition(d)),c.spotPosition.copy(h.getWorldPosition(d)),n.FL.rotation.x+=P*n.wheenSpinMultiplier,n.FR.rotation.x+=P*n.wheenSpinMultiplier,n.R.rotation.x+=P*n.wheenSpinMultiplier}}async function WS(){const e=(await qo.loadAsync(kn.road.url)).scene;e.name="road",e.traverse(a=>{a.isMesh&&(a.selectOnRaycast=e,a.castShadow=!0,a.receiveShadow=!0)});const t=8,n=12,r=t*n,s=[];for(let a=0;a<t;a++){const o=e.clone();o.position.z=a*n-r/2,Xo.add(o),s.push(o)}return a=>{s.forEach(o=>{o.position.z-=a,o.position.z<-r/2&&(o.position.z+=r)})}}async function jS(i){const e=new L,t=.1,r=(await qo.loadAsync(kn.pole.url)).scene;r.name="pole",r.traverse(u=>{u.isMesh&&(u.selectOnRaycast=r,u.castShadow=!0,u.receiveShadow=!0)}),r.position.set(-6,0,0),r.rotation.y=Math.PI/2;const s=r.getObjectByName("emit");s.material=new gn,s.material.color.set(0),s.material.emissive.set("#ffbb73"),s.castShadow=!1,s.receiveShadow=!1;const a=[],o=[],l={gap:15},c=Hr.addFolder("Street Lamps");c.add(l,"gap",10,30,1).onChange(()=>{for(let u=0;u<a.length;u++){const h=a[u];h.position.z=u*l.gap,console.log(u,h.position.z)}}),Ur.selection.add(s);for(let u=0;u<4;u++){const h=r.clone();a.push(h),h.position.z=u*l.gap;const d=new wa;d.intensity=100,d.angle=Nt.degToRad(30),d.penumbra=.5,d.distance=12,d.position.set(0,7.2,1.8),d.target.position.set(0,0,7),d.castShadow=!0,d.shadow.bias=-1e-4;const p=new Ao;i.push(p),p.opacity=.5,p.lightColor=d.color,p.anglePower=5,p.cameraNear=Qt.near,p.cameraFar=Qt.far;const v=new _e(Ro(d.distance,t,.5),p);d.add(v),Rr(d,v,t),v.lookAt(d.target.getWorldPosition(e)),o.push(v);const x=c.addFolder("lamp "+u);x.add(d.shadow,"bias",-1e-4,1e-4).onChange(()=>{}),x.add(p,"opacity",0,2),x.add(p,"attenuation",0,d.distance),x.add(p,"anglePower",0,15),x.add(p,"cameraNear",0,10),x.add(p,"cameraFar",0,10),h.add(d,d.target),Xo.add(h)}for(let u=0;u<a.length;u++){const h=a[u];o[u].material.spotPosition.copy(h.getWorldPosition(e)),o[u].lookAt(o[u].parent.target.getWorldPosition(e))}return u=>{for(let h=0;h<a.length;h++){const d=a[h];d.position.z-=u,d.position.z<-l.gap/2*a.length&&(d.position.z+=l.gap*a.length),o[h].material.spotPosition.copy(o[h].getWorldPosition(e))}}}const Yo=i=>{const e=[i],t=[];for(;e.length!==0;){const n=e.shift();n.material&&t.push(n);for(const r of n.children)r.visible&&e.push(r)}return t},ys=(i,e,t,n,r)=>{r?e[t]!==i[t]&&(i[t]=e[t],i.uniforms[t].value=e[t],e[t]?(i.defines[n]="",n==="USE_NORMALMAP"&&(i.defines.TANGENTSPACE_NORMALMAP="")):delete i.defines[n],i.needsUpdate=!0):i[t]!==void 0&&(i[t]=void 0,i.uniforms[t].value=void 0,delete i.defines[n],i.needsUpdate=!0)},XS=i=>{const{width:e,height:t}=i.image;return Math.floor(Math.log2(Math.max(e,t)))+1},Zf=i=>{let e=i.material.uniforms.prevBoneTexture.value;if(e&&e.image.width===i.skeleton.boneTexture.width)e=i.material.uniforms.prevBoneTexture.value,e.image.data.set(i.skeleton.boneTexture.image.data);else{var t;(t=e)==null||t.dispose();const n=i.skeleton.boneTexture.image.data.slice(),r=i.skeleton.boneTexture.image.width;e=new Br(n,r,r,tn,lt),i.material.uniforms.prevBoneTexture.value=e,e.needsUpdate=!0}},qS=(i,e)=>{var t;(t=i.skeleton)!=null&&t.boneTexture&&(i.material.uniforms.boneTexture.value=i.skeleton.boneTexture,"USE_SKINNING"in i.material.defines||(i.material.defines.USE_SKINNING="",i.material.defines.BONE_TEXTURE="",i.material.needsUpdate=!0)),i.modelViewMatrix.multiplyMatrices(e.matrixWorldInverse,i.matrixWorld),i.material.uniforms.velocityMatrix.value.multiplyMatrices(e.projectionMatrix,i.modelViewMatrix)},YS=(i,e)=>{var t;i.material.uniforms.prevVelocityMatrix.value.multiplyMatrices(e.projectionMatrix,i.modelViewMatrix),(t=i.skeleton)!=null&&t.boneTexture&&Zf(i)},ZS=()=>{if(Ve.envmap_physical_pars_fragment.includes("iblRadianceDisabled")||(Ve.envmap_physical_pars_fragment=Ve.envmap_physical_pars_fragment.replace("vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {",`
		uniform bool iblRadianceDisabled;
	
		vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		 if(iblRadianceDisabled) return vec3(0.);
		`)),"iblRadianceDisabled"in dn.physical.uniforms)return dn.physical.uniforms.iblRadianceDisabled;const i={value:!1};dn.physical.uniforms.iblRadianceDisabled=i;const{clone:e}=Wr;return Wr.clone=t=>{const n=e(t);return"iblRadianceDisabled"in t&&(n.iblRadianceDisabled=i),n},i},KS=()=>{if(Ve.envmap_physical_pars_fragment.includes("iblIrradianceDisabled")||(Ve.envmap_physical_pars_fragment=Ve.envmap_physical_pars_fragment.replace("vec3 getIBLIrradiance( const in vec3 normal ) {",`
			uniform bool iblIrradianceDisabled;
		
			vec3 getIBLIrradiance( const in vec3 normal ) {
			 if(iblIrradianceDisabled) return vec3(0.);
			`)),"iblIrradianceDisabled"in dn.physical.uniforms)return dn.physical.uniforms.iblIrradianceDisabled;const i={value:!1};dn.physical.uniforms.iblIrradianceDisabled=i;const{clone:e}=Wr;return Wr.clone=t=>{const n=e(t);return"iblIrradianceDisabled"in t&&(n.iblIrradianceDisabled=i),n},i},$S=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yc(i){return i.replace($S,JS)}function JS(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}const Kf=i=>{var e;return(e=i.material.fragmentShader)==null?void 0:e.includes("float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );")},Zc=(i,e=i.material)=>e.visible&&e.depthWrite&&e.depthTest&&(!e.transparent||e.opacity>0)&&!Kf(i),$f=(i,e)=>{const t=["vertexTangent","vertexColors","vertexAlphas","vertexUvs","uvsVertexOnly","supportsVertexTextures","instancing","instancingColor","side","flatShading","skinning","doubleSided","flipSided"];for(const n of t)e[n]=i[n]};var Na=`#define GLSLIFY 1
varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}`;class QS extends jt{constructor(e=1){super("CopyPass"),this.needsSwap=!1,this.renderTarget=new Vr(1,1,1,{depthBuffer:!1}),this.setTextureCount(e)}setTextureCount(e){var t;let n="",r="";for(let s=0;s<e;s++)n+=`
				uniform sampler2D inputTexture${s};
				layout(location = ${s}) out vec4 gOutput${s};
			`,r+=`gOutput${s} = textureLod(inputTexture${s}, vUv, 0.);`;(t=this.fullscreenMaterial)==null||t.dispose(),this.fullscreenMaterial=new At({fragmentShader:`
            varying vec2 vUv;
			
			${n}

            void main() {
				${r}
            }
            `,vertexShader:Na,glslVersion:hr,blending:Ht,depthWrite:!1,depthTest:!1,toneMapped:!1});for(let s=0;s<e;s++)if(this.fullscreenMaterial.uniforms["inputTexture"+s]=new K(null),s>=this.renderTarget.texture.length){const a=this.renderTarget.texture[0].clone();a.isRenderTargetTexture=!0,this.renderTarget.texture.push(a)}}setSize(e,t){this.renderTarget.setSize(e,t)}render(e){e.setRenderTarget(this.renderTarget),e.render(this.scene,this.camera)}}var eb=`#define GLSLIFY 1
varying vec2 vUv;uniform sampler2D velocityTexture;uniform sampler2D depthTexture;uniform sampler2D lastDepthTexture;uniform float blend;uniform bool constantBlend;uniform bool fullAccumulate;uniform vec2 invTexSize;uniform mat4 projectionMatrix;uniform mat4 projectionMatrixInverse;uniform mat4 cameraMatrixWorld;uniform vec3 cameraPos;uniform mat4 prevViewMatrix;uniform mat4 prevCameraMatrixWorld;uniform mat4 prevProjectionMatrix;uniform mat4 prevProjectionMatrixInverse;uniform bool reset;uniform float delta;
#define EPSILON 0.00001
#define SAMPLING_LINEAR 0
#define SAMPLING_CATMULL_ROM 1
#define SAMPLING_BLOCKY 2
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
for(int i=0;i<textureCount;i++){inputTexel[i]=textureLod(inputTexture[i],vUv,0.0);doColorTransform[i]=luminance(inputTexel[i].rgb)>0.0;textureSampledThisFrame[i]=inputTexel[i].r>=0.;if(textureSampledThisFrame[i]){transformColor(inputTexel[i].rgb);}else{inputTexel[i].rgb=vec3(0.0);}texIndex++;}
#pragma unroll_loop_end
texIndex=0;velocityTexel=textureLod(velocityTexture,vUv,0.0);bool didMove=dot(velocityTexel.xy,velocityTexel.xy)>0.000000001;
#ifdef dilation
vec2 octahedronEncodedNormal=textureLod(velocityTexture,dilatedUv,0.0).ba;
#else
vec2 octahedronEncodedNormal=velocityTexel.ba;
#endif
vec3 worldNormal=Decode(octahedronEncodedNormal);vec3 worldPos=screenSpaceToWorldSpace(vUv,depth,cameraMatrixWorld,projectionMatrixInverse);vec2 reprojectedUvDiffuse=vec2(-10.0);vec2 reprojectedUvSpecular[textureCount];vec2 reprojectedUv;bool reprojectHitPoint;int samplingMethod;
#pragma unroll_loop_start
for(int i=0;i<textureCount;i++){reprojectHitPoint=reprojectSpecular[i]&&inputTexel[i].a>0.0;if(reprojectHitPoint){reprojectedUvSpecular[i]=getReprojectedUV(neighborhoodClamping[i],neighborhoodClampingDisocclusionTest[i],depth,worldPos,worldNormal,inputTexel[i].a);}else{reprojectedUvSpecular[i]=vec2(-1.0);}if(reprojectedUvDiffuse.x==-10.0&&reprojectedUvSpecular[i].x<0.0){reprojectedUvDiffuse=getReprojectedUV(neighborhoodClamping[i],neighborhoodClampingDisocclusionTest[i],depth,worldPos,worldNormal,0.0);}reprojectedUv=reprojectedUvSpecular[i].x>=0.0 ? reprojectedUvSpecular[i]: reprojectedUvDiffuse;if(reprojectedUv.x<0.0){accumulatedTexel[i]=vec4(inputTexel[i].rgb,0.0);}else{if(sampling[i]==SAMPLING_BLOCKY){samplingMethod=didMove ? SAMPLING_BLOCKY : SAMPLING_CATMULL_ROM;}else{samplingMethod=sampling[i];}accumulatedTexel[i]=sampleReprojectedTexture(accumulatedTexture[i],reprojectedUv,samplingMethod);transformColor(accumulatedTexel[i].rgb);if(textureSampledThisFrame[i]){accumulatedTexel[i].a++;if(neighborhoodClamping[i]){vec3 clampedColor=accumulatedTexel[i].rgb;clampNeighborhood(inputTexture[i],clampedColor,inputTexel[i].rgb);accumulatedTexel[i].rgb=clampedColor;}}else{inputTexel[i].rgb=accumulatedTexel[i].rgb;}}texIndex++;}
#pragma unroll_loop_end
texIndex=0;float m=1.-delta/(1./60.);float fpsAdjustedBlend=blend+max(0.,(1.-blend)*m);float maxValue=(fullAccumulate&&!didMove)? 1.0 : fpsAdjustedBlend;vec3 outputColor;float temporalReprojectMix;
#pragma unroll_loop_start
for(int i=0;i<textureCount;i++){if(constantBlend){temporalReprojectMix=accumulatedTexel[i].a==0.0 ? 0.0 : fpsAdjustedBlend;}else{temporalReprojectMix=fpsAdjustedBlend;if(reset)accumulatedTexel[i].a=0.0;temporalReprojectMix=min(1.-1./(accumulatedTexel[i].a+1.0),maxValue);}outputColor=mix(inputTexel[i].rgb,accumulatedTexel[i].rgb,temporalReprojectMix);undoColorTransform(outputColor);gOutput[i]=vec4(outputColor,accumulatedTexel[i].a);texIndex++;}
#pragma unroll_loop_end
#ifdef useCustomComposeShader
customComposeShader
#endif
}`,tb=`#define GLSLIFY 1
vec4 velocityTexel;float dilatedDepth;vec2 dilatedUvOffset;int texIndex;
#define luminance(a) dot(vec3(0.2125, 0.7154, 0.0721), a)
vec3 screenSpaceToWorldSpace(const vec2 uv,const float depth,mat4 curMatrixWorld,const mat4 projMatrixInverse){vec4 ndc=vec4((uv.x-0.5)*2.0,(uv.y-0.5)*2.0,(depth-0.5)*2.0,1.0);vec4 clip=projMatrixInverse*ndc;vec4 view=curMatrixWorld*(clip/clip.w);return view.xyz;}vec2 viewSpaceToScreenSpace(const vec3 position,const mat4 projMatrix){vec4 projectedCoord=projMatrix*vec4(position,1.0);projectedCoord.xy/=projectedCoord.w;projectedCoord.xy=projectedCoord.xy*0.5+0.5;return projectedCoord.xy;}bool doColorTransform[textureCount];
#ifdef logTransform
void transformColor(inout vec3 color){if(!doColorTransform[texIndex])return;float lum=luminance(color);float diff=min(1.0,lum-0.99);if(diff>0.0){color=vec3(diff*0.1);return;}color=log(max(color,vec3(EPSILON)));}void undoColorTransform(inout vec3 color){if(!doColorTransform[texIndex])return;color=exp(color);}
#else
#define transformColor
#define undoColorTransform
#endif
void getNeighborhoodAABB(const sampler2D tex,inout vec3 minNeighborColor,inout vec3 maxNeighborColor){for(int x=-2;x<=2;x++){for(int y=-2;y<=2;y++){if(x!=0||y!=0){vec2 offset=vec2(x,y)*invTexSize;vec2 neighborUv=vUv+offset;vec4 neighborTexel=textureLod(tex,neighborUv,0.0);transformColor(neighborTexel.rgb);minNeighborColor=min(neighborTexel.rgb,minNeighborColor);maxNeighborColor=max(neighborTexel.rgb,maxNeighborColor);}}}}
#ifdef logClamp
void clampNeighborhood(const sampler2D tex,inout vec3 color,vec3 inputColor){transformColor(inputColor);vec3 minNeighborColor=inputColor;vec3 maxNeighborColor=inputColor;getNeighborhoodAABB(tex,minNeighborColor,maxNeighborColor);transformColor(color);color=clamp(color,minNeighborColor,maxNeighborColor);undoColorTransform(color);}
#else
void clampNeighborhood(const sampler2D tex,inout vec3 color,const vec3 inputColor){vec3 minNeighborColor=inputColor;vec3 maxNeighborColor=inputColor;getNeighborhoodAABB(tex,minNeighborColor,maxNeighborColor);color=clamp(color,minNeighborColor,maxNeighborColor);}
#endif
#ifdef dilation
void getDilatedDepthUVOffset(const sampler2D tex,const vec2 centerUv,out float depth,out float dilatedDepth,out vec4 closestDepthTexel){float closestDepth=0.0;for(int x=-1;x<=1;x++){for(int y=-1;y<=1;y++){vec2 offset=vec2(x,y)*invTexSize;vec2 neighborUv=centerUv+offset;vec4 neighborDepthTexel=textureLod(tex,neighborUv,0.0);float neighborDepth=unpackRGBAToDepth(neighborDepthTexel);if(x==0&&y==0)depth=neighborDepth;if(neighborDepth>closestDepth){closestDepth=neighborDepth;closestDepthTexel=neighborDepthTexel;dilatedUvOffset=offset;}}}dilatedDepth=closestDepth;}
#endif
void getDepthAndDilatedUVOffset(sampler2D depthTex,vec2 uv,out float depth,out float dilatedDepth,out vec4 depthTexel){
#ifdef dilation
getDilatedDepthUVOffset(depthTex,uv,depth,dilatedDepth,depthTexel);
#else
depthTexel=textureLod(depthTex,uv,0.);depth=unpackRGBAToDepth(depthTexel);dilatedDepth=depth;
#endif
}bool planeDistanceDisocclusionCheck(const vec3 worldPos,const vec3 lastWorldPos,const vec3 worldNormal,const float worldDistFactor){if(abs(dot(worldNormal,worldPos))==0.0)return false;vec3 toCurrent=worldPos-lastWorldPos;float distToPlane=abs(dot(toCurrent,worldNormal));return distToPlane>depthDistance*worldDistFactor;}bool worldDistanceDisocclusionCheck(const vec3 worldPos,const vec3 lastWorldPos,const float worldDistFactor){return distance(worldPos,lastWorldPos)>worldDistance*worldDistFactor;}bool validateReprojectedUV(const vec2 reprojectedUv,const bool neighborhoodClamp,const bool neighborhoodClampDisocclusionTest,const float depth,const vec3 worldPos,const vec3 worldNormal){if(reprojectedUv.x>1.0||reprojectedUv.x<0.0||reprojectedUv.y>1.0||reprojectedUv.y<0.0)return false;if(neighborhoodClamp&&!neighborhoodClampDisocclusionTest)return true;vec3 dilatedWorldPos=worldPos;vec3 lastWorldPos;float dilatedLastDepth,lastDepth;vec4 lastDepthTexel;vec2 dilatedReprojectedUv;
#ifdef dilation
dilatedWorldPos=screenSpaceToWorldSpace(vUv+dilatedUvOffset,dilatedDepth,cameraMatrixWorld,projectionMatrixInverse);getDepthAndDilatedUVOffset(lastDepthTexture,reprojectedUv,lastDepth,dilatedLastDepth,lastDepthTexel);dilatedReprojectedUv=reprojectedUv+dilatedUvOffset;
#else
lastDepthTexel=textureLod(lastDepthTexture,reprojectedUv,0.);lastDepth=unpackRGBAToDepth(lastDepthTexel);dilatedLastDepth=lastDepth;dilatedReprojectedUv=reprojectedUv;
#endif
lastWorldPos=screenSpaceToWorldSpace(dilatedReprojectedUv,dilatedLastDepth,prevCameraMatrixWorld,prevProjectionMatrixInverse);float worldDistFactor=clamp((50.0+distance(dilatedWorldPos,cameraPos))/100.,0.25,1.);
#ifndef dilation
if(worldDistanceDisocclusionCheck(dilatedWorldPos,lastWorldPos,worldDistFactor))return false;
#endif
return!planeDistanceDisocclusionCheck(dilatedWorldPos,lastWorldPos,worldNormal,worldDistFactor);}vec2 reprojectHitPoint(const vec3 rayOrig,const float rayLength,const float depth){vec3 cameraRay=normalize(rayOrig-cameraPos);float cameraRayLength=distance(rayOrig,cameraPos);vec3 parallaxHitPoint=cameraPos+cameraRay*(cameraRayLength+rayLength);vec4 reprojectedParallaxHitPoint=prevViewMatrix*vec4(parallaxHitPoint,1.0);vec2 hitPointUv=viewSpaceToScreenSpace(reprojectedParallaxHitPoint.xyz,prevProjectionMatrix);return hitPointUv;}vec2 getReprojectedUV(const bool neighborhoodClamp,const bool neighborhoodClampDisocclusionTest,const float depth,const vec3 worldPos,const vec3 worldNormal,const float rayLength){if(rayLength!=0.0){vec2 reprojectedUv=reprojectHitPoint(worldPos,rayLength,depth);if(validateReprojectedUV(reprojectedUv,neighborhoodClamp,neighborhoodClampDisocclusionTest,depth,worldPos,worldNormal)){return reprojectedUv;}return vec2(-1.);}vec2 reprojectedUv=vUv-velocityTexel.rg;if(validateReprojectedUV(reprojectedUv,neighborhoodClamp,neighborhoodClampDisocclusionTest,depth,worldPos,worldNormal)){return reprojectedUv;}return vec2(-1.);}vec4 SampleTextureCatmullRom(const sampler2D tex,const vec2 uv,const vec2 texSize){vec2 samplePos=uv*texSize;vec2 texPos1=floor(samplePos-0.5f)+0.5f;vec2 f=samplePos-texPos1;vec2 w0=f*(-0.5f+f*(1.0f-0.5f*f));vec2 w1=1.0f+f*f*(-2.5f+1.5f*f);vec2 w2=f*(0.5f+f*(2.0f-1.5f*f));vec2 w3=f*f*(-0.5f+0.5f*f);vec2 w12=w1+w2;vec2 offset12=w2/(w1+w2);vec2 texPos0=texPos1-1.;vec2 texPos3=texPos1+2.;vec2 texPos12=texPos1+offset12;texPos0/=texSize;texPos3/=texSize;texPos12/=texSize;vec4 result=vec4(0.0);result+=textureLod(tex,vec2(texPos0.x,texPos0.y),0.0f)*w0.x*w0.y;result+=textureLod(tex,vec2(texPos12.x,texPos0.y),0.0f)*w12.x*w0.y;result+=textureLod(tex,vec2(texPos3.x,texPos0.y),0.0f)*w3.x*w0.y;result+=textureLod(tex,vec2(texPos0.x,texPos12.y),0.0f)*w0.x*w12.y;result+=textureLod(tex,vec2(texPos12.x,texPos12.y),0.0f)*w12.x*w12.y;result+=textureLod(tex,vec2(texPos3.x,texPos12.y),0.0f)*w3.x*w12.y;result+=textureLod(tex,vec2(texPos0.x,texPos3.y),0.0f)*w0.x*w3.y;result+=textureLod(tex,vec2(texPos12.x,texPos3.y),0.0f)*w12.x*w3.y;result+=textureLod(tex,vec2(texPos3.x,texPos3.y),0.0f)*w3.x*w3.y;result=max(result,vec4(0.));return result;}vec4 getTexel(const sampler2D tex,vec2 p){p=p/invTexSize+0.5;vec2 i=floor(p);vec2 f=p-i;f=f*f*f*(f*(f*6.0-15.0)+10.0);p=i+f;p=(p-0.5)*invTexSize;return textureLod(tex,p,0.0);}vec2 sampleBlocky(vec2 p){vec2 d=vec2(dFdx(p.x),dFdy(p.y))/invTexSize;p/=invTexSize;vec2 fA=p-0.5*d,iA=floor(fA);vec2 fB=p+0.5*d,iB=floor(fB);return(iA+(iB-iA)*(fB-iB)/d+0.5)*invTexSize;}vec4 sampleReprojectedTexture(const sampler2D tex,const vec2 reprojectedUv,int samplingMode){vec2 p=samplingMode==SAMPLING_BLOCKY ? sampleBlocky(reprojectedUv): reprojectedUv;if(samplingMode==SAMPLING_CATMULL_ROM||samplingMode==SAMPLING_BLOCKY){return SampleTextureCatmullRom(tex,p,1.0/invTexSize);}return textureLod(tex,p,0.);}vec3 Decode(vec2 f){f=f*2.0-1.0;vec3 n=vec3(f.x,f.y,1.0-abs(f.x)-abs(f.y));float t=max(-n.z,0.0);n.x+=n.x>=0.0 ?-t : t;n.y+=n.y>=0.0 ?-t : t;return normalize(n);}`;class nb extends At{constructor(e=1,t=""){let n=eb.replace("#include <reproject>",tb);typeof t=="string"&&(n=n.replace("customComposeShader",t));let r="";for(let l=0;l<e;l++)r+=`
				uniform sampler2D inputTexture${l};
				uniform sampler2D accumulatedTexture${l};

				layout(location = ${l}) out vec4 gOutput${l};
			`;n=r+n.replaceAll("textureCount",e),n=Yc(n);const s=n.matchAll(/inputTexture\[\s*[0-9]+\s*]/g);for(const[l]of s){const c=l.replace(/[^0-9]/g,"");n=n.replace(l,"inputTexture"+c)}const a=n.matchAll(/accumulatedTexture\[\s*[0-9]+\s*]/g);for(const[l]of a){const c=l.replace(/[^0-9]/g,"");n=n.replace(l,"accumulatedTexture"+c)}const o=n.matchAll(/gOutput\[\s*[0-9]+\s*]/g);for(const[l]of o){const c=l.replace(/[^0-9]/g,"");n=n.replace(l,"gOutput"+c)}super({type:"TemporalReprojectMaterial",uniforms:{velocityTexture:new K(null),depthTexture:new K(null),lastDepthTexture:new K(null),blend:new K(0),constantBlend:new K(!1),fullAccumulate:new K(!1),reset:new K(!1),delta:new K(0),invTexSize:new K(new ye),projectionMatrix:new K(new Le),projectionMatrixInverse:new K(new Le),cameraMatrixWorld:new K(new Le),viewMatrix:new K(new Le),prevViewMatrix:new K(new Le),prevCameraMatrixWorld:new K(new Le),prevProjectionMatrix:new K(new Le),prevProjectionMatrixInverse:new K(new Le),cameraPos:new K(new L)},vertexShader:Na,fragmentShader:n,blending:Ht,depthWrite:!1,depthTest:!1,toneMapped:!1,glslVersion:hr});for(let l=0;l<e;l++)this.uniforms["inputTexture"+l]=new K(null),this.uniforms["accumulatedTexture"+l]=new K(null);typeof t=="string"&&(this.defines.useCustomComposeShader="")}}const _c=1.324717957244746,ib=1/_c,rb=1/(_c*_c),fd=1.1127756842787055,sb=i=>{const e=[];for(let t=0;t<i;t++)e.push([(fd+ib*t)%1,(fd+rb*t)%1]);return e},pd={blend:.9,dilation:!1,constantBlend:!1,fullAccumulate:!1,sampling:"blocky",neighborhoodClamping:!1,neighborhoodClampingDisocclusionTest:!0,logTransform:!1,logClamp:!1,depthDistance:.25,worldDistance:.375,reprojectSpecular:!1,customComposeShader:null,renderTarget:null},md=new Le,gd=new Le;class Jf extends jt{constructor(e,t,n,r=1,s=pd){super("TemporalReprojectPass"),this.needsSwap=!1,this.clock=new Go,this.r2Sequence=[],this.pointsIndex=0,this.lastCameraTransform={position:new L,quaternion:new kt},this._scene=e,this._camera=t,this.textureCount=r,s={...pd,...s},this.renderTarget=new Vr(1,1,r,{minFilter:Ue,magFilter:Ue,type:_t,depthBuffer:!1}),this.fullscreenMaterial=new nb(r,s.customComposeShader),this.fullscreenMaterial.defines.textureCount=r,s.dilation&&(this.fullscreenMaterial.defines.dilation=""),s.neighborhoodClamping&&(this.fullscreenMaterial.defines.neighborhoodClamping=""),s.logTransform&&(this.fullscreenMaterial.defines.logTransform=""),s.logClamp&&(this.fullscreenMaterial.defines.logClamp=""),this.fullscreenMaterial.defines.depthDistance=s.depthDistance.toPrecision(5),this.fullscreenMaterial.defines.worldDistance=s.worldDistance.toPrecision(5),this.fullscreenMaterial.uniforms.blend.value=s.blend,this.fullscreenMaterial.uniforms.constantBlend.value=s.constantBlend,this.fullscreenMaterial.uniforms.fullAccumulate.value=s.fullAccumulate,this.fullscreenMaterial.uniforms.projectionMatrix.value=t.projectionMatrix.clone(),this.fullscreenMaterial.uniforms.projectionMatrixInverse.value=t.projectionMatrixInverse.clone(),this.fullscreenMaterial.uniforms.cameraMatrixWorld.value=t.matrixWorld,this.fullscreenMaterial.uniforms.viewMatrix.value=t.matrixWorldInverse,this.fullscreenMaterial.uniforms.cameraPos.value=t.position,this.fullscreenMaterial.uniforms.prevViewMatrix.value=t.matrixWorldInverse.clone(),this.fullscreenMaterial.uniforms.prevCameraMatrixWorld.value=t.matrixWorld.clone(),this.fullscreenMaterial.uniforms.prevProjectionMatrix.value=t.projectionMatrix.clone(),this.fullscreenMaterial.uniforms.prevProjectionMatrixInverse.value=t.projectionMatrixInverse.clone(),this.copyPass=new QS(r);for(let o=0;o<r;o++){const l=this.copyPass.renderTarget.texture[o];l.type=_t,l.minFilter=Ue,l.magFilter=Ue,l.needsUpdate=!0}this.fullscreenMaterial.uniforms.velocityTexture.value=n.texture,this.fullscreenMaterial.uniforms.depthTexture.value=n.depthTexture;const a=["linear","catmullRom","blocky"];for(const o of["sampling","reprojectSpecular","neighborhoodClamping","neighborhoodClampingDisocclusionTest"]){let l=o==="sampling"?a.indexOf(s[o]):s[o];if(l===-1)throw new Error(`Invalid value for option ${o}: ${s[o]}`);const c=o==="sampling"?"int":"bool";typeof l!="array"&&(l=Array(r).fill(l)),this.fullscreenMaterial.defines[o]=`${c}[](${l.join(", ")})`}this.options=s,this.velocityDepthNormalPass=n}dispose(){super.dispose(),this.renderTarget.dispose(),this.copyPass.dispose(),this.fullscreenMaterial.dispose()}setSize(e,t){this.renderTarget.setSize(e,t),this.copyPass.setSize(e,t),this.fullscreenMaterial.uniforms.invTexSize.value.set(1/e,1/t)}get texture(){return this.renderTarget.texture[0]}reset(){this.fullscreenMaterial.uniforms.reset.value=!0}render(e){const t=Math.min(.1,this.clock.getDelta());this.fullscreenMaterial.uniforms.delta.value=t,md.copy(this._camera.projectionMatrix),gd.copy(this._camera.projectionMatrixInverse),this._camera.view&&(this._camera.view.enabled=!1),this._camera.updateProjectionMatrix(),this.fullscreenMaterial.uniforms.projectionMatrix.value.copy(this._camera.projectionMatrix),this.fullscreenMaterial.uniforms.projectionMatrixInverse.value.copy(this._camera.projectionMatrixInverse),this.fullscreenMaterial.uniforms.lastDepthTexture.value=this.velocityDepthNormalPass.lastDepthTexture,this._camera.view&&(this._camera.view.enabled=!0),this._camera.projectionMatrix.copy(md),this._camera.projectionMatrixInverse.copy(gd),e.setRenderTarget(this.renderTarget),e.render(this.scene,this.camera),this.fullscreenMaterial.uniforms.reset.value=!1;for(let n=0;n<this.textureCount;n++)this.copyPass.fullscreenMaterial.uniforms["inputTexture"+n].value=this.renderTarget.texture[n],this.fullscreenMaterial.uniforms["accumulatedTexture"+n].value=this.copyPass.renderTarget.texture[n];this.copyPass.render(e),this.fullscreenMaterial.uniforms.prevCameraMatrixWorld.value.copy(this._camera.matrixWorld),this.fullscreenMaterial.uniforms.prevViewMatrix.value.copy(this._camera.matrixWorldInverse),this.fullscreenMaterial.uniforms.prevProjectionMatrix.value.copy(this.fullscreenMaterial.uniforms.projectionMatrix.value),this.fullscreenMaterial.uniforms.prevProjectionMatrixInverse.value.copy(this.fullscreenMaterial.uniforms.projectionMatrixInverse.value)}jitter(e=1){this.unjitter(),this.r2Sequence.length===0&&(this.r2Sequence=sb(256).map(([a,o])=>[a-.5,o-.5])),this.pointsIndex=(this.pointsIndex+1)%this.r2Sequence.length;const[t,n]=this.r2Sequence[this.pointsIndex],{width:r,height:s}=this.renderTarget;this._camera.setViewOffset&&this._camera.setViewOffset(r,s,t*e,n*e,r,s)}unjitter(){this._camera.clearViewOffset&&this._camera.clearViewOffset()}}var ab=`#define GLSLIFY 1
uniform sampler2D inputTexture;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 accumulatedTexel=textureLod(inputTexture,vUv,0.);outputColor=vec4(accumulatedTexel.rgb,1.);}`;const yc={blend:.8,constantBlend:!0,dilation:!0,sampling:"catmullRom",logTransform:!1,depthDistance:10,worldDistance:5,neighborhoodClamping:!0};class Qf extends Ia{constructor(e,t,n,r=yc){super("TRAAEffect",ab,{type:"FinalTRAAEffectMaterial",uniforms:new Map([["inputTexture",new K(null)]])}),this._scene=e,this._camera=t,r={...yc,...r},this.temporalReprojectPass=new Jf(e,t,n,1,r),this.uniforms.get("inputTexture").value=this.temporalReprojectPass.texture,this.setSize(r.width,r.height)}setSize(e,t){this.temporalReprojectPass.setSize(e,t)}dispose(){super.dispose(),this.temporalReprojectPass.dispose()}update(e,t){this.temporalReprojectPass.unjitter(),this.unjitteredProjectionMatrix=this._camera.projectionMatrix.clone(),this._camera.projectionMatrix.copy(this.unjitteredProjectionMatrix);const n=Yo(this._scene).filter(r=>Kf(r));for(const r of n){const s=e.properties.get(r.material);if(!(s!=null&&s.programs))continue;const a=Array.from(s.programs.values())[0].getUniforms();if(!a._patchedProjectionMatrix){const o=a.setValue.bind(a);a._oldSetValue=o,a.setValue=(l,c,u,...h)=>{c==="projectionMatrix"&&(u=this.unjitteredProjectionMatrix),o(l,c,u,...h)},a._patchedProjectionMatrix=!0}cancelAnimationFrame(a._destroyPatchRAF),cancelAnimationFrame(a._destroyPatchRAF2),a._destroyPatchRAF=requestAnimationFrame(()=>{a._destroyPatchRAF2=requestAnimationFrame(()=>{a.setValue=a._oldSetValue,delete a._oldSetValue,delete a._patchedProjectionMatrix})})}this.temporalReprojectPass.fullscreenMaterial.uniforms.inputTexture0.value=t.texture,this.temporalReprojectPass.jitter(),this.temporalReprojectPass.render(e)}}Qf.DefaultOptions=yc;var ob=`#define GLSLIFY 1
varying vec2 vUv;uniform sampler2D depthTexture;uniform sampler2D normalTexture;uniform sampler2D momentTexture;uniform vec2 invTexSize;uniform bool horizontal;uniform bool blurHorizontal;uniform float denoise[textureCount];uniform float depthPhi;uniform float normalPhi;uniform float roughnessPhi;uniform float denoiseKernel;uniform float stepSize;uniform mat4 projectionMatrixInverse;uniform mat4 projectionMatrix;uniform mat4 cameraMatrixWorld;uniform bool isFirstIteration;uniform bool isLastIteration;
#include <packing>
#define EPSILON 0.00001
#define M_PI 3.1415926535897932384626433832795
#define PI M_PI
#define luminance(a) dot(a, vec3(0.2125, 0.7154, 0.0721))
#include <customComposeShaderFunctions>
vec3 screenSpaceToWorldSpace(const vec2 uv,const float depth,const mat4 curMatrixWorld){vec4 ndc=vec4((uv.x-0.5)*2.0,(uv.y-0.5)*2.0,(depth-0.5)*2.0,1.0);vec4 clip=projectionMatrixInverse*ndc;vec4 view=curMatrixWorld*(clip/clip.w);return view.xyz;}float distToPlane(const vec3 worldPos,const vec3 neighborWorldPos,const vec3 worldNormal){vec3 toCurrent=worldPos-neighborWorldPos;float distToPlane=abs(dot(toCurrent,worldNormal));return distToPlane;}void tap(const vec2 neighborVec,const vec2 pixelStepOffset,const vec3 normal,const float roughness,const vec3 worldPos,const float luma[textureCount],const float colorPhi[textureCount],inout vec3 denoisedColor[textureCount],inout float totalWeight[textureCount],inout float sumVariance[textureCount],inout float variance[textureCount]){vec2 fullNeighborUv=neighborVec*pixelStepOffset;vec2 neighborUvNearest=vUv+fullNeighborUv;vec2 bilinearOffset=neighborVec.y>0. ? invTexSize :-invTexSize;vec2 neighborUv=vUv+fullNeighborUv+bilinearOffset*0.5;vec2 neighborUvRoughness=vUv+fullNeighborUv*(roughness<0.15 ? roughness/0.15 : 1.)+bilinearOffset*0.5;float basicWeight=1.0;
#ifdef useDepth
vec4 neighborDepthTexel=textureLod(depthTexture,neighborUvNearest,0.);float neighborDepth=unpackRGBAToDepth(neighborDepthTexel);vec3 neighborWorldPos=screenSpaceToWorldSpace(neighborUvNearest,neighborDepth,cameraMatrixWorld);float depthDiff=(1.-distToPlane(worldPos,neighborWorldPos,normal));float depthSimilarity=max(depthDiff/depthPhi,0.);basicWeight*=depthSimilarity;
#endif
#if defined(useNormal) || defined(useRoughness)
vec4 neighborNormalTexel=textureLod(normalTexture,neighborUvNearest,0.);
#endif
#ifdef useNormal
vec3 neighborNormal=neighborNormalTexel.rgb;float normalDiff=dot(neighborNormal,normal);float normalSimilarity=pow(max(0.,normalDiff),normalPhi);basicWeight*=normalSimilarity;
#endif
#ifdef useRoughness
float neighborRoughness=neighborNormalTexel.a;neighborRoughness*=neighborRoughness;float roughnessDiff=abs(roughness-neighborRoughness);float roughnessSimilarity=exp(-roughnessDiff*roughnessPhi);basicWeight*=roughnessSimilarity;
#endif
vec4 neighborInputTexel[textureCount];vec3 neighborColor;float neighborLuma,lumaDiff,lumaSimilarity,disocclusionBoost;float weight[textureCount];
#pragma unroll_loop_start
for(int i=0;i<textureCount;i++){neighborInputTexel[i]=textureLod(texture[i],roughnessDependent[i]? neighborUvRoughness : neighborUv,0.);neighborColor=neighborInputTexel[i].rgb;neighborLuma=luminance(neighborColor);lumaDiff=abs(luma[i]-neighborLuma);lumaSimilarity=max(1.0-lumaDiff/colorPhi[i],0.0);weight[i]=min(basicWeight*lumaSimilarity,1.0);disocclusionBoost=variance[i]/1000.;weight[i]=mix(weight[i],1.,disocclusionBoost);denoisedColor[i]+=neighborColor*weight[i];totalWeight[i]+=weight[i];}
#pragma unroll_loop_end
#ifdef useMoment
if(isFirstIteration){vec4 neighborMoment=textureLod(momentTexture,neighborUvNearest,0.);neighborInputTexel[0].a=neighborMoment.g-neighborMoment.r*neighborMoment.r;sumVariance[0]+=weight[0]*weight[0]*neighborInputTexel[0].a;
#if momentTextureCount > 1
neighborInputTexel[1].a=neighborMoment.a-neighborMoment.b*neighborMoment.b;sumVariance[1]+=weight[1]*weight[1]*neighborInputTexel[1].a;
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
}void main(){vec4 depthTexel=textureLod(depthTexture,vUv,0.);if(dot(depthTexel.rgb,depthTexel.rgb)==0.){discard;return;}float depth=unpackRGBAToDepth(depthTexel);vec3 worldPos=screenSpaceToWorldSpace(vUv,depth,cameraMatrixWorld);vec4 normalTexel=textureLod(normalTexture,vUv,0.);vec3 normal=normalTexel.rgb;float roughness=normalTexel.a;roughness*=roughness;vec3 denoisedColor[textureCount];float sumVariance[textureCount];float variance[textureCount];
#ifdef doDenoise
vec4 texel[textureCount];float luma[textureCount];float totalWeight[textureCount];float colorPhi[textureCount];
#pragma unroll_loop_start
for(int i=0;i<textureCount;i++){totalWeight[i]=1.0;texel[i]=textureLod(texture[i],vUv,0.);denoisedColor[i]=texel[i].rgb;luma[i]=luminance(texel[i].rgb);}
#pragma unroll_loop_end
#ifdef useMoment
if(isFirstIteration){vec4 moment=textureLod(momentTexture,vUv,0.);texel[0].a=max(0.0,moment.g-moment.r*moment.r);variance[0]=min(1000.,texel[0].a);
#if momentTextureCount > 1
texel[1].a=max(0.0,moment.a-moment.b*moment.b);variance[1]=min(1000.,texel[1].a);
#endif
}
#endif
#pragma unroll_loop_start
for(int i=0;i<momentTextureCount;i++){
#ifndef useMoment
if(isFirstIteration)texel[i].a=1.0;
#endif
sumVariance[i]=texel[i].a;variance[i]=min(1000.,texel[i].a);if(roughnessDependent[i]){colorPhi[i]=denoise[i]*sqrt(basicVariance[i]*roughness+sumVariance[i]);}else{colorPhi[i]=denoise[i]*sqrt(basicVariance[i]+sumVariance[i]);}}
#pragma unroll_loop_end
vec2 pixelStepOffset=invTexSize*stepSize;if(blurHorizontal){for(float i=-denoiseKernel;i<=denoiseKernel;i++){if(i!=0.){vec2 neighborVec=horizontal ? vec2(i,0.): vec2(0.,i);tap(neighborVec,pixelStepOffset,normal,roughness,worldPos,luma,colorPhi,denoisedColor,totalWeight,sumVariance,variance);}}}else{for(float i=-denoiseKernel;i<=denoiseKernel;i++){if(i!=0.){vec2 neighborVec=horizontal ? vec2(-i,-i): vec2(i,-i);tap(neighborVec,pixelStepOffset,normal,roughness,worldPos,luma,colorPhi,denoisedColor,totalWeight,sumVariance,variance);}}}
#pragma unroll_loop_start
for(int i=0;i<textureCount;i++){sumVariance[i]/=totalWeight[i]*totalWeight[i];denoisedColor[i]/=totalWeight[i];}
#pragma unroll_loop_end
#else
#pragma unroll_loop_start
for(int i=0;i<textureCount;i++){denoisedColor[i]=textureLod(texture[i],vUv,0.).rgb;}
#pragma unroll_loop_end
#endif
if(isLastIteration){
#include <customComposeShader>
}
#include <outputShader>
}`;const Wl={moment:!0,depth:!0,normal:!0,roughness:!0,diffuse:!0,roughnessDependent:!1,basicVariance:5e-4},lb=[["moment","","useMoment"],["depth","depthPhi","useDepth"],["normal","normalPhi","useNormal"],["roughness","roughnessPhi","useRoughness"]];class cb extends jt{constructor(e,t=[],n="",r="",s=Wl){super("DenoisePass"),this.iterations=1,s={...Wl,...s};let a="";const o="";let l="";this.textures=t;for(let d=0;d<this.textures.length;d++)a+=`layout(location = ${d}) out vec4 gTexture${d};
`,a+=`uniform sampler2D texture${d};
`,l+=`gTexture${d} = vec4(denoisedColor[${d}], sumVariance[${d}]);
`;let c=a+ob.replace("#include <customComposeShaderFunctions>",r).replace("#include <customComposeShader>",n).replace("#include <finalOutputShader>",o).replace("#include <outputShader>",l).replaceAll("textureCount",this.textures.length).replaceAll("momentTextureCount",Math.min(this.textures.length,2));c=Yc(c);const u=c.matchAll(/texture\[\s*[0-9]+\s*]/g);for(const[d]of u){const p=d.replace(/[^0-9]/g,"");c=c.replace(d,"texture"+p)}s={...Wl,...s},this.fullscreenMaterial=new At({fragmentShader:c,vertexShader:Na,uniforms:{depthTexture:new K(null),normalTexture:new K(null),momentTexture:new K(null),invTexSize:new K(new ye),horizontal:new K(!0),blurHorizontal:new K(!0),denoiseKernel:new K(1),denoiseDiffuse:new K(1),denoise:new K([0]),depthPhi:new K(1),normalPhi:new K(1),roughnessPhi:new K(1),stepSize:new K(1),isFirstIteration:new K(!1),isLastIteration:new K(!1),viewMatrix:new K(e.matrixWorldInverse),projectionMatrix:new K(e.projectionMatrix),cameraMatrixWorld:new K(e.matrixWorld),projectionMatrixInverse:new K(e.projectionMatrixInverse)},glslVersion:hr,blending:Ht,depthWrite:!1,depthTest:!1,toneMapped:!1});const h={type:_t,depthBuffer:!1};this.renderTargetA=new Vr(1,1,this.textures.length,h),this.renderTargetB=new Vr(1,1,this.textures.length,h);for(let d=0;d<this.textures.length;d++)this.fullscreenMaterial.uniforms["texture"+d]=new K(t[d]);typeof s.roughnessDependent=="boolean"&&(s.roughnessDependent=Array(t.length).fill(s.roughnessDependent)),this.fullscreenMaterial.defines.roughnessDependent=`bool[](${s.roughnessDependent.join(", ")})`,typeof s.basicVariance=="number"&&(s.basicVariance=Array(t.length).fill(s.basicVariance)),this.fullscreenMaterial.defines.basicVariance=`float[](${s.basicVariance.map(d=>d.toPrecision(5)).join(", ")})`,this.options=s}setSize(e,t){this.renderTargetA.setSize(e,t),this.renderTargetB.setSize(e,t),this.fullscreenMaterial.uniforms.invTexSize.value.set(1/e,1/t)}dispose(){super.dispose(),this.renderTargetA.dispose(),this.renderTargetB.dispose()}keepEdgeStoppingDefinesUpdated(){for(const[t,n,r]of lb){var e;const s=this.options[t]&&(n===""||((e=this.fullscreenMaterial.uniforms[n])==null?void 0:e.value)>.001);s!==r in this.fullscreenMaterial.defines&&(s?this.fullscreenMaterial.defines[r]="":delete this.fullscreenMaterial.defines[r],this.fullscreenMaterial.needsUpdate=!0)}}render(e){this.keepEdgeStoppingDefinesUpdated();const t=this.fullscreenMaterial.uniforms.denoiseKernel.value;if(this.iterations>0){"doDenoise"in this.fullscreenMaterial.defines||(this.fullscreenMaterial.defines.doDenoise="",this.fullscreenMaterial.needsUpdate=!0);for(let n=0;n<2*this.iterations;n++){const r=n%2===0,s=2**~~(n/2),o=parseInt(Math.log2(s))%2==0;this.fullscreenMaterial.uniforms.horizontal.value=r,this.fullscreenMaterial.uniforms.blurHorizontal.value=o,this.fullscreenMaterial.uniforms.stepSize.value=s,this.fullscreenMaterial.uniforms.isFirstIteration.value=n===0,this.fullscreenMaterial.uniforms.isLastIteration.value=n===2*this.iterations-1;const l=r?this.renderTargetA:this.renderTargetB;for(let c=0;c<this.textures.length;c++)this.fullscreenMaterial.uniforms["texture"+c].value=r?n===0?this.textures[c]:this.renderTargetB.texture[c]:this.renderTargetA.texture[c];e.setRenderTarget(l),e.render(this.scene,this.camera)}}else"doDenoise"in this.fullscreenMaterial.defines&&(delete this.fullscreenMaterial.defines.doDenoise,this.fullscreenMaterial.needsUpdate=!0),e.setRenderTarget(this.renderTargetB),e.render(this.scene,this.camera),this.fullscreenMaterial.uniforms.denoiseKernel.value=t;for(let n=0;n<this.textures.length;n++)this.fullscreenMaterial.uniforms["texture"+n].value=this.textures[n]}get texture(){return this.renderTargetB.texture[0]}}var ub=`#define GLSLIFY 1
vec4 moment;if(!reset&&reprojectedUvDiffuse.x>=0.0){vec4 historyMoment=sampleReprojectedTexture(lastMomentTexture,reprojectedUvDiffuse,didMove ? SAMPLING_BLOCKY : SAMPLING_CATMULL_ROM);moment.r=luminance(gOutput[0].rgb);moment.g=moment.r*moment.r;
#if textureCount > 1
moment.b=luminance(gOutput[1].rgb);moment.a=moment.b*moment.b;
#endif
gMoment=mix(moment,historyMoment,0.8);}else{moment.rg=vec2(0.,1000.);moment.ba=vec2(0.,1000.);gMoment=moment;return;}`;const vd={fullAccumulate:!0,customComposeShader:ub};class hb extends Jf{constructor(e,t,n,r=1,s=vd){s={...vd,...s},super(e,t,n,r,s),this.momentTexture=this.renderTarget.texture[0].clone(),this.momentTexture.isRenderTargetTexture=!0,this.momentTexture.type=lt,this.momentTexture.minFilter=et,this.momentTexture.magFilter=et,this.momentTexture.needsUpdate=!0,this.renderTarget.texture.push(this.momentTexture);const a=`
		layout(location = ${r}) out vec4 gMoment;

		uniform sampler2D lastMomentTexture;
		`;this.fullscreenMaterial.fragmentShader=a+this.fullscreenMaterial.fragmentShader,this.fullscreenMaterial.uniforms={...this.fullscreenMaterial.uniforms,lastMomentTexture:new K(null)};const o=r+1;this.copyPass.setTextureCount(o),this.copyPass.fullscreenMaterial.uniforms["inputTexture"+(o-1)].value=this.momentTexture;const l=this.copyPass.renderTarget.texture[o-1];l.type=lt,l.minFilter=Ue,l.magFilter=Ue,l.needsUpdate=!0,this.fullscreenMaterial.uniforms.lastMomentTexture.value=l,this.fullscreenMaterial.defines.momentTextureCount=Math.min(2,r)}}class db{constructor(e,t,n,r=1,s="",a="",o={}){this.svgfTemporalReprojectPass=new hb(e,t,n,r,o);const l=this.svgfTemporalReprojectPass.renderTarget.texture.slice(0,r);this.denoisePass=new cb(t,l,s,a,o),this.denoisePass.fullscreenMaterial.uniforms.momentTexture.value=this.svgfTemporalReprojectPass.momentTexture,this.setNonJitteredDepthTexture(n.depthTexture)}get texture(){return this.denoisePass.texture}setGBuffers(e,t){this.setJitteredGBuffers(e,t),this.setNonJitteredGBuffers(e,t)}setJitteredGBuffers(e,t){this.denoisePass.fullscreenMaterial.uniforms.depthTexture.value=e,this.denoisePass.fullscreenMaterial.uniforms.normalTexture.value=t}setNonJitteredDepthTexture(e){this.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.depthTexture.value=e}setVelocityTexture(e){this.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.velocityTexture.value=e}setSize(e,t){this.denoisePass.setSize(e,t),this.svgfTemporalReprojectPass.setSize(e,t)}dispose(){this.denoisePass.dispose(),this.svgfTemporalReprojectPass.dispose()}render(e){this.svgfTemporalReprojectPass.render(e),this.denoisePass.render(e)}}class fb extends jt{constructor(){super("CubeToEquirectEnvPass"),this.renderTarget=new ct(1,1,{depthBuffer:!1,type:lt}),this.fullscreenMaterial=new At({fragmentShader:`
            varying vec2 vUv;
			uniform samplerCube cubeMap;

			#define M_PI 3.1415926535897932384626433832795
			
			// source: https://github.com/spite/CubemapToEquirectangular/blob/master/src/CubemapToEquirectangular.js
            void main() {
				float longitude = vUv.x * 2. * M_PI - M_PI + M_PI / 2.;
				float latitude = vUv.y * M_PI;

				vec3 dir = vec3(
					- sin( longitude ) * sin( latitude ),
					cos( latitude ),
					- cos( longitude ) * sin( latitude )
				);

				dir.y = -dir.y;

				gl_FragColor = textureCube( cubeMap, dir );
            }
            `,vertexShader:Na,uniforms:{cubeMap:{value:null}},blending:Ht,depthWrite:!1,depthTest:!1,toneMapped:!1})}dispose(){this.renderTarget.dispose()}generateEquirectEnvMap(e,t,n=null,r=null,s=4096){if(n===null&&r===null){const c=t.source.data[0].width,u=2**Math.ceil(Math.log2(2*c*3**.5)),h=2**Math.ceil(Math.log2(c*3**.5));n=u,r=h}n>s&&(n=s,r=s/2),this.renderTarget.setSize(n,r),this.fullscreenMaterial.uniforms.cubeMap.value=t;const{renderTarget:a}=this;e.setRenderTarget(a),e.render(this.scene,this.camera);const o=new Float32Array(n*r*4);e.readRenderTargetPixels(a,0,0,n,r,o);const l=new Br(o,n,r,tn,lt);return l.wrapS=pn,l.wrapT=pn,l.minFilter=To,l.magFilter=To,l.needsUpdate=!0,l.mapping=Tn,l}}class pb extends At{constructor(){super({type:"MRTMaterial",defines:{USE_UV:"",TEMPORAL_RESOLVE:""},uniforms:{color:new K(new Re),emissive:new K(new Re),map:new K(null),roughnessMap:new K(null),metalnessMap:new K(null),emissiveMap:new K(null),alphaMap:new K(null),normalMap:new K(null),normalScale:new K(new ye(1,1)),roughness:new K(0),metalness:new K(0),emissiveIntensity:new K(0),uvTransform:new K(new Qe),boneTexture:new K(null),blueNoiseTexture:new K(null),blueNoiseRepeat:new K(new ye(1,1)),texSize:new K(new ye(1,1)),frame:new K(0)},vertexShader:`
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
                    // !todo: properly implement alpha hashing
                    // #ifdef USE_ALPHAMAP
                    // float alpha = textureLod( alphaMap, vUv, 0. ).g;

                    // float alphaThreshold = sampleBlueNoise(screenUv, frame).a;
                    // if(alpha < alphaThreshold){
                    //     discard;
                    //     return;
                    // }
                    // #endif

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
            `,glslVersion:hr,toneMapped:!1,alphaTest:!1,fog:!1,lights:!1}),this.normalMapType=Uo,this.normalScale=new ye(1,1)}}var mb=`#define GLSLIFY 1
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
uniform mat4 projectionMatrix;uniform mat4 inverseProjectionMatrix;uniform mat4 cameraMatrixWorld;uniform float cameraNear;uniform float cameraFar;uniform float maxEnvMapMipLevel;uniform float rayDistance;uniform float maxRoughness;uniform float thickness;uniform float envBlur;uniform int frame;uniform vec2 texSize;uniform vec2 blueNoiseRepeat;struct EquirectHdrInfo{sampler2D marginalWeights;sampler2D conditionalWeights;sampler2D map;vec2 size;float totalSumWhole;float totalSumDecimal;};uniform EquirectHdrInfo envMapInfo;
#define INVALID_RAY_COORDS vec2(-1.0);
#define EPSILON 0.00001
#define ONE_MINUS_EPSILON 1.0 - EPSILON
float nearMinusFar;float nearMulFar;float farMinusNear;vec2 invTexSize;
#include <packing>
#include <utils>
vec2 RayMarch(inout vec3 dir,inout vec3 hitPos);vec2 BinarySearch(inout vec3 dir,inout vec3 hitPos);float fastGetViewZ(const float depth);vec3 doSample(const vec3 viewPos,const vec3 viewDir,const vec3 viewNormal,const vec3 worldPosition,const float metalness,const float roughness,const bool isDiffuseSample,const bool isEnvMisSample,const float NoV,const float NoL,const float NoH,const float LoH,const float VoH,const vec2 random,inout vec3 l,inout vec3 hitPos,out bool isMissedRay,out vec3 brdf,out float pdf);void main(){vec4 depthTexel=textureLod(depthTexture,vUv,0.0);if(dot(depthTexel.rgb,depthTexel.rgb)==0.){discard;return;}vec4 normalTexel=textureLod(normalTexture,vUv,0.0);float roughness=normalTexel.a;if(roughness==1.0||roughness>maxRoughness){discard;return;}invTexSize=1./texSize;roughness=clamp(roughness*roughness,0.0001,1.0);nearMinusFar=cameraNear-cameraFar;nearMulFar=cameraNear*cameraFar;farMinusNear=cameraFar-cameraNear;float unpackedDepth=unpackRGBAToDepth(depthTexel);float depth=fastGetViewZ(unpackedDepth);vec3 viewPos=getViewPosition(depth);vec3 viewDir=normalize(viewPos);vec3 worldNormal=normalTexel.xyz;vec3 viewNormal=normalize((vec4(worldNormal,1.)*cameraMatrixWorld).xyz);vec3 worldPos=vec4(vec4(viewPos,1.)*viewMatrix).xyz;vec4 diffuseTexel=textureLod(diffuseTexture,vUv,0.);vec3 diffuse=diffuseTexel.rgb;float metalness=diffuseTexel.a;vec3 n=viewNormal;vec3 v=-viewDir;float NoV=max(EPSILON,dot(n,v));vec3 V=(vec4(v,1.)*viewMatrix).xyz;vec3 N=worldNormal;vec4 blueNoise;vec3 H,l,h,F,T,B,envMisDir,gi;vec3 diffuseGI,specularGI,brdf,hitPos;Onb(N,T,B);V=ToLocal(T,B,N,V);vec3 f0=mix(vec3(0.04),diffuse,metalness);float NoL,NoH,LoH,VoH,diffW,specW,invW,pdf,envPdf,diffuseSamples,specularSamples,envMisProbability,envMisMultiplier;bool isDiffuseSample,isEnvMisSample,isMissedRay;int sampleCounter=0;
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
envMisDir=vec3(0.0);
#ifdef importanceSampling
envPdf=sampleEquirectProbability(envMapInfo,blueNoise.rg,envMisDir);envMisDir=normalize((vec4(envMisDir,1.)*cameraMatrixWorld).xyz);envMisProbability=0.25+dot(envMisDir,viewNormal)*0.5;isEnvMisSample=blueNoise.a<envMisProbability;envMisMultiplier=1./(1.-envMisProbability);if(isEnvMisSample){envPdf/=1.-envMisProbability;}else{envPdf=0.0001;}
#else
envPdf=0.0;envMisMultiplier=1.;
#endif
if(isDiffuseSample){if(isEnvMisSample){l=envMisDir;}else{l=cosineSampleHemisphere(viewNormal,blueNoise.rg);}h=normalize(v+l);NoL=clamp(dot(n,l),EPSILON,ONE_MINUS_EPSILON);NoH=clamp(dot(n,h),EPSILON,ONE_MINUS_EPSILON);LoH=clamp(dot(l,h),EPSILON,ONE_MINUS_EPSILON);VoH=clamp(dot(v,h),EPSILON,ONE_MINUS_EPSILON);gi=doSample(viewPos,viewDir,viewNormal,worldPos,metalness,roughness,isDiffuseSample,isEnvMisSample,NoV,NoL,NoH,LoH,VoH,blueNoise.rg,l,hitPos,isMissedRay,brdf,pdf);gi*=brdf;if(isEnvMisSample){gi*=misHeuristic(envPdf,pdf);gi/=envPdf;}else{gi/=pdf;gi*=envMisMultiplier;}diffuseSamples++;diffuseGI=mix(diffuseGI,gi,1./diffuseSamples);}else{isEnvMisSample=isEnvMisSample&&roughness>=0.025;if(isEnvMisSample){l=envMisDir;h=normalize(v+l);NoL=clamp(dot(n,l),EPSILON,ONE_MINUS_EPSILON);NoH=clamp(dot(n,h),EPSILON,ONE_MINUS_EPSILON);LoH=clamp(dot(l,h),EPSILON,ONE_MINUS_EPSILON);VoH=clamp(dot(v,h),EPSILON,ONE_MINUS_EPSILON);}gi=doSample(viewPos,viewDir,viewNormal,worldPos,metalness,roughness,isDiffuseSample,isEnvMisSample,NoV,NoL,NoH,LoH,VoH,blueNoise.rg,l,hitPos,isMissedRay,brdf,pdf);gi*=brdf;if(isEnvMisSample){gi*=misHeuristic(envPdf,pdf);gi/=envPdf;}else{gi/=pdf;gi*=envMisMultiplier;}specularSamples++;specularGI=mix(specularGI,gi,1./specularSamples);}}
#pragma unroll_loop_end
roughness=sqrt(roughness);vec2 uv=viewSpaceToScreenSpace(viewPos);
#ifndef specularOnly
if(diffuseSamples==0.0)diffuseGI=vec3(-1.0);gDiffuse=vec4(diffuseGI,roughness);
#endif
#ifndef diffuseOnly
float rayLength=0.0;if(!isMissedRay&&roughness<0.375&&getCurvature(viewNormal,depth)<0.0005){vec3 hitPosWS=(vec4(hitPos,1.)*viewMatrix).xyz;rayLength=distance(worldPos,hitPosWS);}if(specularSamples==0.0)specularGI=vec3(-1.0);gSpecular=vec4(specularGI,rayLength);
#endif
}vec3 doSample(const vec3 viewPos,const vec3 viewDir,const vec3 viewNormal,const vec3 worldPosition,const float metalness,const float roughness,const bool isDiffuseSample,const bool isEnvMisSample,const float NoV,const float NoL,const float NoH,const float LoH,const float VoH,const vec2 random,inout vec3 l,inout vec3 hitPos,out bool isMissedRay,out vec3 brdf,out float pdf){float cosTheta=max(0.0,dot(viewNormal,l));if(isDiffuseSample){vec3 diffuseBrdf=vec3(evalDisneyDiffuse(NoL,NoV,LoH,roughness,metalness));pdf=NoL/M_PI;pdf=max(EPSILON,pdf);brdf=diffuseBrdf;}else{vec3 specularBrdf=evalDisneySpecular(roughness,NoH,NoV,NoL);pdf=GGXVNDFPdf(NoH,NoV,roughness);pdf=max(EPSILON,pdf);brdf=specularBrdf;}brdf*=cosTheta;hitPos=viewPos;
#if steps == 0
hitPos+=l;vec2 coords=viewSpaceToScreenSpace(hitPos);
#else
vec2 coords=RayMarch(l,hitPos);
#endif
bool allowMissedRays=false;
#ifdef missedRays
allowMissedRays=true;
#endif
isMissedRay=coords.x==-1.0;vec3 envMapSample=vec3(0.);if(isMissedRay||allowMissedRays){
#ifdef USE_ENVMAP
vec3 reflectedWS=normalize((vec4(l,1.)*viewMatrix).xyz);
#ifdef BOX_PROJECTED_ENV_MAP
reflectedWS=parallaxCorrectNormal(reflectedWS.xyz,envMapSize,envMapPosition,worldPosition);reflectedWS=normalize(reflectedWS.xyz);
#endif
float mip=envBlur*maxEnvMapMipLevel;if(!isDiffuseSample&&roughness<0.15)mip*=roughness/0.15;envMapSample=sampleEquirectEnvMapColor(reflectedWS,envMapInfo.map,mip);float maxEnvLum=isEnvMisSample ? 50.0 : 5.0;if(maxEnvLum!=0.0){float envLum=luminance(envMapSample);if(envLum>maxEnvLum){envMapSample*=maxEnvLum/envLum;}}return envMapSample;
#else
return vec3(0.0);
#endif
}vec4 velocity=textureLod(velocityTexture,coords.xy,0.0);vec2 reprojectedUv=coords.xy-velocity.xy;vec3 SSGI;if(reprojectedUv.x>=0.0&&reprojectedUv.x<=1.0&&reprojectedUv.y>=0.0&&reprojectedUv.y<=1.0){vec4 emissiveTexel=textureLod(emissiveTexture,coords.xy,0.);vec3 emissiveColor=emissiveTexel.rgb*10.;vec3 reprojectedGI=getTexel(accumulatedTexture,reprojectedUv,0.).rgb;SSGI=reprojectedGI+emissiveColor;
#ifdef useDirectLight
SSGI+=textureLod(directLightTexture,coords.xy,0.).rgb*directLightMultiplier;
#endif
}else{SSGI=textureLod(directLightTexture,vUv,0.).rgb;}if(allowMissedRays){float ssgiLum=luminance(SSGI);float envLum=luminance(envMapSample);if(envLum>ssgiLum)SSGI=envMapSample;}return SSGI;}vec2 RayMarch(inout vec3 dir,inout vec3 hitPos){float rayHitDepthDifference;dir*=rayDistance/float(steps);vec2 uv;for(int i=1;i<steps;i++){float m=exp(pow(float(i)/4.0,0.05))-2.0;hitPos+=dir*min(m,1.);if(hitPos.z>0.0)return INVALID_RAY_COORDS;uv=viewSpaceToScreenSpace(hitPos);
#ifndef missedRays
if(uv.x<0.||uv.y<0.||uv.x>1.||uv.y>1.)return INVALID_RAY_COORDS;
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
}`,gb=`#define GLSLIFY 1
#define PI M_PI
#define luminance(a) dot(vec3(0.2125, 0.7154, 0.0721), a)
vec4 getTexel(const sampler2D tex,vec2 p,const float mip){p=p/invTexSize+0.5;vec2 i=floor(p);vec2 f=p-i;f=f*f*f*(f*(f*6.0-15.0)+10.0);p=i+f;p=(p-0.5)*invTexSize;return textureLod(tex,p,mip);}float getViewZ(const float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}
#ifdef PERSPECTIVE_CAMERA
vec3 getViewPosition(const float depth){float clipW=projectionMatrix[2][3]*depth+projectionMatrix[3][3];vec4 clipPosition=vec4((vec3(vUv,depth)-0.5)*2.0,1.0);clipPosition*=clipW;return(inverseProjectionMatrix*clipPosition).xyz;}
#else
vec3 getViewPosition(const float depth){float z=getViewZ(depth);vec4 clipPosition=vec4(vUv*2.0-1.0,z,1.0);clipPosition*=clipPosition.z;return(inverseProjectionMatrix*clipPosition).xyz;}
#endif
vec3 screenSpaceToWorldSpace(vec2 uv,float depth,mat4 camMatrixWorld){vec3 viewPos=getViewPosition(depth);return vec4(camMatrixWorld*vec4(viewPos,1.)).xyz;}vec2 viewSpaceToScreenSpace(const vec3 position){vec4 projectedCoord=projectionMatrix*vec4(position,1.0);projectedCoord.xy/=projectedCoord.w;projectedCoord.xy=projectedCoord.xy*0.5+0.5;return projectedCoord.xy;}vec2 worldSpaceToScreenSpace(const vec3 worldPos){vec4 vsPos=vec4(worldPos,1.0)*cameraMatrixWorld;return viewSpaceToScreenSpace(vsPos.xyz);}
#ifdef BOX_PROJECTED_ENV_MAP
uniform vec3 envMapSize;uniform vec3 envMapPosition;vec3 parallaxCorrectNormal(const vec3 v,const vec3 cubeSize,const vec3 cubePos,const vec3 worldPosition){vec3 nDir=normalize(v);vec3 rbmax=(.5*cubeSize+cubePos-worldPosition)/nDir;vec3 rbmin=(-.5*cubeSize+cubePos-worldPosition)/nDir;vec3 rbminmax;rbminmax.x=(nDir.x>0.)? rbmax.x : rbmin.x;rbminmax.y=(nDir.y>0.)? rbmax.y : rbmin.y;rbminmax.z=(nDir.z>0.)? rbmax.z : rbmin.z;float correction=min(min(rbminmax.x,rbminmax.y),rbminmax.z);vec3 boxIntersection=worldPosition+nDir*correction;return boxIntersection-cubePos;}
#endif
#define M_PI 3.1415926535897932384626433832795
vec2 equirectDirectionToUv(const vec3 direction){vec2 uv=vec2(atan(direction.z,direction.x),acos(direction.y));uv/=vec2(2.0*M_PI,M_PI);uv.x+=0.5;uv.y=1.0-uv.y;return uv;}vec3 equirectUvToDirection(vec2 uv){uv.x-=0.5;uv.y=1.0-uv.y;float theta=uv.x*2.0*PI;float phi=uv.y*PI;float sinPhi=sin(phi);return vec3(sinPhi*cos(theta),cos(phi),sinPhi*sin(theta));}vec3 sampleEquirectEnvMapColor(const vec3 direction,const sampler2D map,const float lod){return getTexel(map,equirectDirectionToUv(direction),lod).rgb;}mat3 getBasisFromNormal(const vec3 normal){vec3 other;if(abs(normal.x)>0.5){other=vec3(0.0,1.0,0.0);}else{other=vec3(1.0,0.0,0.0);}vec3 ortho=normalize(cross(normal,other));vec3 ortho2=normalize(cross(normal,ortho));return mat3(ortho2,ortho,normal);}vec3 F_Schlick(const vec3 f0,const float theta){return f0+(1.-f0)*pow(1.0-theta,5.);}float F_Schlick(const float f0,const float f90,const float theta){return f0+(f90-f0)*pow(1.0-theta,5.0);}float D_GTR(const float roughness,const float NoH,const float k){float a2=pow(roughness,2.);return a2/(PI*pow((NoH*NoH)*(a2*a2-1.)+1.,k));}float SmithG(const float NDotV,const float alphaG){float a=alphaG*alphaG;float b=NDotV*NDotV;return(2.0*NDotV)/(NDotV+sqrt(a+b-a*b));}float GGXVNDFPdf(const float NoH,const float NoV,const float roughness){float D=D_GTR(roughness,NoH,2.);float G1=SmithG(NoV,roughness*roughness);return(D*G1)/max(0.00001,4.0f*NoV);}float GeometryTerm(const float NoL,const float NoV,const float roughness){float a2=roughness*roughness;float G1=SmithG(NoV,a2);float G2=SmithG(NoL,a2);return G1*G2;}float evalDisneyDiffuse(const float NoL,const float NoV,const float LoH,const float roughness,const float metalness){float FD90=0.5+2.*roughness*pow(LoH,2.);float a=F_Schlick(1.,FD90,NoL);float b=F_Schlick(1.,FD90,NoV);return(a*b/PI)*(1.-metalness);}vec3 evalDisneySpecular(const float roughness,const float NoH,const float NoV,const float NoL){float D=D_GTR(roughness,NoH,2.);float G=GeometryTerm(NoL,NoV,pow(0.5+roughness*.5,2.));vec3 spec=vec3(D*G/(4.*NoL*NoV));return spec;}vec3 SampleGGXVNDF(const vec3 V,const float ax,const float ay,const float r1,const float r2){vec3 Vh=normalize(vec3(ax*V.x,ay*V.y,V.z));float lensq=Vh.x*Vh.x+Vh.y*Vh.y;vec3 T1=lensq>0. ? vec3(-Vh.y,Vh.x,0.)*inversesqrt(lensq): vec3(1.,0.,0.);vec3 T2=cross(Vh,T1);float r=sqrt(r1);float phi=2.0*PI*r2;float t1=r*cos(phi);float t2=r*sin(phi);float s=0.5*(1.0+Vh.z);t2=(1.0-s)*sqrt(1.0-t1*t1)+s*t2;vec3 Nh=t1*T1+t2*T2+sqrt(max(0.0,1.0-t1*t1-t2*t2))*Vh;return normalize(vec3(ax*Nh.x,ay*Nh.y,max(0.0,Nh.z)));}void Onb(const vec3 N,inout vec3 T,inout vec3 B){vec3 up=abs(N.z)<0.9999999 ? vec3(0,0,1): vec3(1,0,0);T=normalize(cross(up,N));B=cross(N,T);}vec3 ToLocal(const vec3 X,const vec3 Y,const vec3 Z,const vec3 V){return vec3(dot(V,X),dot(V,Y),dot(V,Z));}vec3 ToWorld(const vec3 X,const vec3 Y,const vec3 Z,const vec3 V){return V.x*X+V.y*Y+V.z*Z;}vec3 cosineSampleHemisphere(const vec3 n,const vec2 u){float r=sqrt(u.x);float theta=2.0*PI*u.y;vec3 b=normalize(cross(n,vec3(0.0,1.0,1.0)));vec3 t=cross(b,n);return normalize(r*sin(theta)*b+sqrt(1.0-u.x)*n+r*cos(theta)*t);}float equirectDirectionPdf(vec3 direction){vec2 uv=equirectDirectionToUv(direction);float theta=uv.y*PI;float sinTheta=sin(theta);if(sinTheta==0.0){return 0.0;}return 1.0/(2.0*PI*PI*sinTheta);}float sampleEquirectProbability(EquirectHdrInfo info,vec2 r,out vec3 direction){float v=textureLod(info.marginalWeights,vec2(r.x,0.0),0.).x;float u=textureLod(info.conditionalWeights,vec2(r.y,v),0.).x;vec2 uv=vec2(u,v);vec3 derivedDirection=equirectUvToDirection(uv);direction=derivedDirection;vec3 color=texture(info.map,uv).rgb;float totalSum=info.totalSumWhole+info.totalSumDecimal;float lum=luminance(color);float pdf=lum/totalSum;return info.size.x*info.size.y*pdf;}float misHeuristic(float a,float b){float aa=a*a;float bb=b*b;return aa/(aa+bb);}const float g=1.6180339887498948482;const float a1=1.0/g;float r1(float n){return fract(1.1127756842787055+a1*n);}const vec4 hn=vec4(0.618033988749895,0.3247179572447458,0.2207440846057596,0.1673039782614187);vec4 sampleBlueNoise(int seed){vec2 size=vUv*texSize;vec2 blueNoiseSize=texSize/blueNoiseRepeat;float blueNoiseIndex=floor(floor(size.y/blueNoiseSize.y)*blueNoiseRepeat.x)+floor(size.x/blueNoiseSize.x);int blueNoiseTileOffset=int(r1(blueNoiseIndex+1.0)*65536.);vec2 blueNoiseUv=vUv*blueNoiseRepeat;vec4 blueNoise=textureLod(blueNoiseTexture,blueNoiseUv,0.);blueNoise=fract(blueNoise+hn*float(seed+blueNoiseTileOffset));blueNoise.r=(blueNoise.r>0.5 ? 1.0-blueNoise.r : blueNoise.r)*2.0;blueNoise.g=(blueNoise.g>0.5 ? 1.0-blueNoise.g : blueNoise.g)*2.0;blueNoise.b=(blueNoise.b>0.5 ? 1.0-blueNoise.b : blueNoise.b)*2.0;blueNoise.a=(blueNoise.a>0.5 ? 1.0-blueNoise.a : blueNoise.a)*2.0;return blueNoise;}float getCurvature(const vec3 n,const float depth){vec3 dx=dFdx(n);vec3 dy=dFdy(n);vec3 xneg=n-dx;vec3 xpos=n+dx;vec3 yneg=n-dy;vec3 ypos=n+dy;float curvature=(cross(xneg,xpos).y-cross(yneg,ypos).x)*4.0/depth;return curvature;}`;const vb=({data:{width:i,height:e,isFloatType:t,flipY:n,data:r}})=>{const s=a();function a(){const v=new ArrayBuffer(4),x=new Float32Array(v),m=new Uint32Array(v),f=new Uint32Array(512),M=new Uint32Array(512);for(let E=0;E<256;++E){const R=E-127;R<-27?(f[E]=0,f[E|256]=32768,M[E]=24,M[E|256]=24):R<-14?(f[E]=1024>>-R-14,f[E|256]=1024>>-R-14|32768,M[E]=-R-1,M[E|256]=-R-1):R<=15?(f[E]=R+15<<10,f[E|256]=R+15<<10|32768,M[E]=13,M[E|256]=13):R<128?(f[E]=31744,f[E|256]=64512,M[E]=24,M[E|256]=24):(f[E]=31744,f[E|256]=64512,M[E]=13,M[E|256]=13)}const _=new Uint32Array(2048),y=new Uint32Array(64),S=new Uint32Array(64);for(let E=1;E<1024;++E){let R=E<<13,P=0;for(;!(R&8388608);)R<<=1,P-=8388608;R&=-8388609,P+=947912704,_[E]=R|P}for(let E=1024;E<2048;++E)_[E]=939524096+(E-1024<<13);for(let E=1;E<31;++E)y[E]=E<<23;y[31]=1199570944,y[32]=2147483648;for(let E=33;E<63;++E)y[E]=2147483648+(E-32<<23);y[63]=3347054592;for(let E=1;E<64;++E)E!==32&&(S[E]=1024);return{floatView:x,uint32View:m,baseTable:f,shiftTable:M,mantissaTable:_,exponentTable:y,offsetTable:S}}function o(v){const x=v>>10;return s.uint32View[0]=s.mantissaTable[s.offsetTable[x]+(v&1023)]+s.exponentTable[x],s.floatView[0]}function l(v,x,m){return .2126*v+.7152*x+.0722*m}const c=(v,x,m=0,f=v.length)=>{let M=m,_=m+f-1;for(;M<_;){const y=M+_>>1;v[y]<x?M=y+1:_=y}return M-m},u=(v,x,m,f,M,_)=>{if(f)for(let T=0,N=m-1;T<=N;T++)for(let F=0,U=x*4;F<U;F+=4){const z=N-T,k=T*U+F,ee=z*U+F;v[ee]=v[k],v[ee+1]=v[k+1],v[ee+2]=v[k+2],v[ee+3]=v[k+3]}const y=new Float32Array(x*m),S=new Float32Array(x*m),E=new Float32Array(m),R=new Float32Array(m);let P=0,w=0;for(let T=0;T<m;T++){let N=0;for(let F=0;F<x;F++){const U=T*x+F,z=v[4*U+0],k=v[4*U+1],ee=v[4*U+2],$=l(z,k,ee);N+=$,P+=$,y[U]=$,S[U]=N}if(N!==0)for(let F=T*x,U=T*x+x;F<U;F++)y[F]/=N,S[F]/=N;w+=N,E[T]=N,R[T]=w}if(w!==0)for(let T=0,N=E.length;T<N;T++)E[T]/=w,R[T]/=w;for(let T=0;T<m;T++){const N=(T+1)/m,F=c(R,N);M[T]=(F+.5)/m}for(let T=0;T<m;T++)for(let N=0;N<x;N++){const F=T*x+N,U=(N+1)/x,z=c(S,U,T*x,x);_[F]=(z+.5)/x}return P};if(!t){const v=new Float32Array(r.length);for(const x in r)v[x]=o(r[x]);r=v}const h=new Float32Array(e),d=new Float32Array(i*e),p=u(r,i,e,n,h,d);postMessage(t?{totalSumValue:p,marginalDataArray:h,conditionalDataArray:d}:{data:r,totalSumValue:p,marginalDataArray:h,conditionalDataArray:d})},xb=new Blob(["onmessage = "+vb],{type:"application/javascript"}),_b=URL.createObjectURL(xb);class yb{constructor(){const e=new Br(new Float32Array([1,1,1,1]),1,1);e.type=lt,e.format=tn,e.minFilter=Ue,e.magFilter=Ue,e.wrapS=mn,e.wrapT=mn,e.generateMipmaps=!1,e.needsUpdate=!0;const t=new Br(new Float32Array([0,1]),1,2);t.type=lt,t.format=Eo,t.minFilter=Ue,t.magFilter=Ue,t.generateMipmaps=!1,t.needsUpdate=!0;const n=new Br(new Float32Array([0,0,1,1]),2,2);n.type=lt,n.format=Eo,n.minFilter=Ue,n.magFilter=Ue,n.generateMipmaps=!1,n.needsUpdate=!0,this.map=e,this.marginalWeights=t,this.conditionalWeights=n,this.totalSumWhole=1,this.totalSumDecimal=0,this.size=new ye}dispose(){this.marginalWeights.dispose(),this.conditionalWeights.dispose(),this.map.dispose()}updateFrom(e){e=e.clone();const{width:t,height:n,data:r}=e.image,{type:s}=e;return this.size.set(t,n),new Promise(a=>{var o;(o=this.worker)==null||o.terminate(),this.worker=new Worker(_b),this.worker.postMessage({width:t,height:n,isFloatType:s===lt,flipY:e.flipY,data:r}),this.worker.onmessage=({data:{data:l,totalSumValue:c,marginalDataArray:u,conditionalDataArray:h}})=>{this.dispose();const{marginalWeights:d,conditionalWeights:p}=this;d.image={width:n,height:1,data:u},d.needsUpdate=!0,p.image={width:t,height:n,data:h},p.needsUpdate=!0;const v=~~c,x=c-v;this.totalSumWhole=v,this.totalSumDecimal=x,l&&(e.source=new Lc({...e.image}),e.image={width:t,height:n,data:l},e.type=lt),this.map=e,this.worker=null,a(e)}})}}class wb extends At{constructor(){super({type:"SSGIMaterial",uniforms:{directLightTexture:new K(null),accumulatedTexture:new K(null),normalTexture:new K(null),depthTexture:new K(null),diffuseTexture:new K(null),emissiveTexture:new K(null),velocityTexture:new K(null),blueNoiseTexture:new K(null),backSideDepthTexture:new K(null),projectionMatrix:new K(new Le),inverseProjectionMatrix:new K(new Le),cameraMatrixWorld:new K(new Le),viewMatrix:new K(new Le),cameraNear:new K(0),cameraFar:new K(0),rayDistance:new K(0),thickness:new K(0),frame:new K(0),envBlur:new K(0),maxRoughness:new K(0),maxEnvMapMipLevel:new K(0),envMapInfo:{value:new yb},envMapPosition:new K(new L),envMapSize:new K(new L),viewMatrix:new K(new Le),texSize:new K(new ye),blueNoiseRepeat:new K(new ye)},defines:{steps:20,refineSteps:5,spp:1,directLightMultiplier:1,CUBEUV_TEXEL_WIDTH:0,CUBEUV_TEXEL_HEIGHT:0,CUBEUV_MAX_MIP:0,vWorldPosition:"worldPos"},fragmentShader:mb.replace("#include <utils>",gb),vertexShader:Na,blending:Ht,depthWrite:!1,depthTest:!1,toneMapped:!1,glslVersion:hr})}}const Mb=new Re(0),Sb=new Nc({depthPacking:Io,side:Ot});class bb extends jt{constructor(e,t){super("BackSideDepthPass"),this._scene=e,this._camera=t,this.renderTarget=new ct(1,1,{minFilter:et,magFilter:et})}setSize(e,t){this.renderTarget.setSize(e,t)}dispose(){super.dispose(),this.renderTarget.dispose()}render(e){const{background:t}=this._scene;this._scene.background=Mb,this._scene.overrideMaterial=Sb,e.setRenderTarget(this.renderTarget),e.render(this._scene,this._camera),this._scene.background=t,this._scene.overrideMaterial=null}}var Tb="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAABAUElEQVR4AQD/PwDAA6vxkhBFR6TrLIa/0aId+5Pl+oDJpdJaPgKIsoqBda/bgMDI1RpXhkfjtCV1Wl63mBysOuelSt+ltKRbPC5Xy/+q1FWfp0rKiiai+LvC1XuhhQSDv/HaJFT7dw3Wglah+IPiVNIdU9rD0EnDxnGaPw4D25fcsn0OYx66IyGeufWEme8n1Y1EgGuTdVt1t2XbQQMZyRl9ux5bkEyweskq66BMEZVtTUGkVghI1a6t7OmXAT2XkqzJlCPep/mS3X7vf4z8tOqhv5STCpXAdnZ2uqzWrFd8qpjNupGh8uAERFcZKJamVYA9TYOt36k/f68tjAvdZ5U6ntg8DvWinGyLEx0D3AUUTLtnneH5K0LMKslrWIzPrAEjSloxrU8OM4ezw4tn+78JMVH+07OgpP+8qUUJ69SNly7602n7p3hSAfpF6RdkZOaKBjaW9htWlXYYprQJmKP+iNsElaUQjzDHlziogLU5vo4XpDGzegIMAIW4amjNvtFV0FJMIn5EGKHCg73PiMth9CUHgpl4j5KpaiI8SZlRqMRztzUe+mXTc2UX3HaLJWpZcxqxjlySok7+UQH5bGdMcFAAvENWJKuMPqUdqx1NA/2ikoiJh0MU3gDGEzKIVStR0CFkHLY01VmyCmCekKFgeZ/tVzFgX/KluXnrskgSKu/7go95fMDUEVtaggPU+dWEUTDZgtc553hsdjU27aV3YmQW9uwhwIVuPpCR0wxkDitSbcjCbCqxs0twGLzjhfMYJXu9KpLLurK3pqGCQ4RFYdI+BWFQgYJW1hBam/aTnVB4SnUMmuLxfZ2q/DcpOGOAlZkhQ13+d1AW+X6zRI9lxt+fglQ4MBOlwGhproncn2QPbXRO0G9Sl7yjtgsbMyrtomCkppmtepT9EVpf83N+UxxJk36tvROiQGLK/+oyrFLElKnM8cFctmFK26GibWdee9ONVNPQQ7UxZHJ8BeDXmplmmG9XCnh0p3VHuB1iCZE5JrCDpHaNkyc7evkPUbVtdxV1WH9lJyUTPheHA9kGaOwyohCp+Kxzs0NU7bIfpFhSnM9DRg+gS5eDT6q/2ONYhufTBC/c7o6cUvKL5ezrivZ6g5lfdMWB8P46RhUxdY2E9BoI5vlPg0uStS+MIiohdyUhqQh7Dgm0BY5wCqG0iNS2OrIHnnwxh3f6+XQzHl6adZSHWZ4CJik21LXSOn4zXz47rlUFZQH2l35kSUN3xJGdMquS145u00nuX/9o6ljtnWlRbTPqydj8DoWDCSBqDhpZ20GQcSl7N9OfbBy892X69Wst0Itwb6awdheVr3dh9JDiIX1W3B0yY3dzffOpgarFpEO4Dz9RxlpsDG9usE8pXoXME9DLpI93q98Db3Jnl4sPZV9OrTqczWHQIV47iVpRpHDZewlNfh4L4wpvNZKGWGnUKrBnF5FRpXwoiOhFkoMsTzG2e/q0qllnVGbZfMxJvgPweoWU+4Nv4zP+713/9p+wadKYmoEjRQYJd/HcOPqewh4e508Y8j/0sIp7ivNuN6vZrWFLlf8Awdu1o7d9gUKE5KNn01W44g/GcSTZapSuGDHXeW4BGXzfW2zL4FCJS6vV0qw0AaOquRZU6KOJPfx9Ym8YMZpcZhGQhrx/tl4jfLWHjgZ+jZ9v3nrZ0PUky6tMr8NsRr+Y0clxZLruJTmE35YyPVcy4fYnwceofbM9/WTYJlaC+sgH3wOpGJ7/dmxYyyF88cSAV1AZOWMAAXOxkLWmIWv8tle8CoBLm5WPtqI2gZ01o1GHAIevjvVoAHZCNa56bJfkAESC2zsGL2dkZPOrgcN6QlGHK6xheVvoO6TcsZCI9PxDV4dwYJOfSZPE92Xf0+QJgIpkeikrxD+eE5ekvz24v3GV7KRHMyv3Rnx8DfHLQu6ec/QRlWqOglJ665umC6ZBVV0zdfVpGwaHi4zEiASH04l7e15C1S2060x0DkyjGG55wudumG6QOhdntkt2fDD+TooKhGWCZgjyfpGAlE/qXdXkxpRz4oM5SjuvaUNC9JJvoHEQEGDVnFT8jYM42y16+ImXA/ppQVyfb7CrlULA3d1NgitpHSkDSZ1AX4p6IuJj8KjrkjtpA253++l+0fBhPMgsDnzCZFt8DJ1JLN6PnIzNsL3vmr9mKgQesQVUA0ZYg7Xo5PdJUGRm9dI6i3VR+BERBXhHaaZPW6CYIj69qG0JyXbAdhUWZtR5ys9kcWwTRskIRJC1+Eo8D3yjFfzWzgJ5/n2SsAHX0IiE4pbuAoYu+HtqW1QCRCROXHrBcRn1zqqtQF9dn3cCO5eRjnVPmkqzVo+/Qrh6fHE8Vp5FyDvb58h9TfdddlJj2rxSaj7qY5mf9MYdeUqLiwnb1bqPYhiCuVlz2m/c02VcFTuGtP+LwqUDUaIB16B8nMl9jXdwEICbcjgFRYhixHsmxqippomwhkgVPVyQ9J1zLOOyiD2FQA/zbm9jNVcqaeQEpmHj167stzGAtn6TZHd7+YtKIpmx+UK9nqkzGmWHm46GsHXVlwy4rzoPJWyXkwnSjytW8VUkQtXOzm+FFQowkCVh8K9ie6iVvcOyOdrugc5xaOVjIX7PyB0Mbp6VnVpdW1dKcQCD+m+NT3c6jd2xbgR0g4ix/UF/m4SB+WQSr48eC0tLTawdUc3z7asTX5LgU5+qf3S/jSm5wX3ikqucp6exWr/sqX8Iq1m5Vyofsz/Zi5ZjlLUEQod83ssF0ZcKHhLAW42kGwPNBsUd7m+xa4fQeQNehieMnl999kW5EsBF4IC1H2thAENTWTl4u8jxc0vqaTQMb4pd9Mqx+AGqvNlxcLC1szrHchGXnWt+C65lhVUkqxIaW+5IVZA+e8oOM81ynGV3uaoVkEE/lGOdr9+8tvrNG59oipp9WDnoA1RjoV1i6MnPwvlybkdM/SCLcl72iHDhByOQCmeD02jVl+qeCUqF5LZYLfy/A0o8YGAFV06TXAYwVGAOVWBWbpaVQ/pb/2CqU2BQjY7RxQ+FUo1Q8O0GibUCS5kuYlTi1KNMGxTBrVFPh6sTWHSSUN0sjAvVo7+Zj4pXy+VjoG+wkcdIpyZaghC+A1X9l12BqoddswOHieD+LV9A5L+b5PbenoeLIa3uC36S8BZsg5+PV1lVAAa09GOhjpXMbfVjegRzS4/J9jaHrBCOGpaHmpYErmh658L2ZIRIZP1Ej1/e670oupM4g3vEs2e/ZERFtGSrEFt2FSNJS8c/RPmEqAlso22z92FSbw5qY+cP7BA/Yonb0T8R9r+zfGrhPg4nBY+gIhbz2shYdF+lZ1O4LDG6KQj/neP5toLlFK0KVU5nzVmfWo9fnP4bEqDpbn0onxuZQr6PcF6XOb0/pVpzRakhF+q7mmEJqCJJrqEPTZGRYxAQkodXP5yTNNLx/eNwYnR28ishbBT7OYsDuFC215yfwQUxMo7QdUW8lt9PAC9lhaa0KT3J1IGtFcJ9qqco2qTMeYD9lnte/KqZax5LoQwc7UpFH6cTX6R5bl6u99YIU2XAS9OWZWIJCnv4l6qpA2ElQGR1GBUAWORq85kDZ7iDZ3KfkyvsY6YpqXT4hGg9aJ6kks+Wbdp3qeCI5F/Em1UyGnfiSjNYEmthfI1HwDprl6FvXZVlCrdykAKfZpsKylgYTya2jogLZs4Rax//bmte4MY8faNLLG2ziQ+N2/wU8k8UgWLI1CV5Uv1kK0bCrJV68nvZP7AVnUK3JUrGdWD9qewMkYSCDzgNnWCFopPezeSjBb+Lc1R82QPCdnar+IGVMoyf1J2hfZANdTxPg311HYqXpl8ZG1I1mptlfKNdNmAFoKI0LebQqCVbZz3vrqY+EwN99MK1giWlodOF7qxxI4IlgWMt3jiovHtTzuj8i8mHcCC3OBHld/W/2lhsu33fQH1nm+8eO/XfgbcbOQST2+UZMJ9/K58f5Ti6lyKQG/98AY4J7PDoEiGenilzblQ55F1vKRPqC8CyHk+iipGZYxNwtYQuezcZ6ArglSyRzoZmgmyAaUlr1fEka5o2YV2NAFF1f0Jd2kbH3+THeoGs2dZiQWB4NoP1IFyYOttTQNcHUAP3CM+i+aJkLp6X4JVt+LzyopHwam+RA8GlvPsMJ2N5f+eZygJzuo371QUquJCPcq9ZstqlWZY4iVkG/zW2Y3qHJzg7YLyPri+pCIB7eU+Jj7duCE1Xe0n2+umkqeX/ipNoFxjWJJrzOBGcJmS2+JiHAuk2qXsgHmBqDJnFPWz1hvkokrLTuYKYtpNloGQVOqe9ewNB0ht336Rwj0OJQFuMZ55ki2ezaBKasCKeVmJRqGbpo+qkAEFwKe5nqaciDwHPm6TLkoDdt4w8X9zfr0r6nGx+lB1vipTmcqD5/Whx/lCKiEVjl11PoUV/msmHKnMor8W2VExy/v9vBHiiqJYntX6hnrGS6E7FXnX1F1ARZFnmmnBdgB8DqYmjC/0Ur29krarErQEpSbynXGe8s1kLjnD7PicljmhS/zATRXx1F1BFh8uwF7nkhVJiANqNJ4Rh8VW2pIYLvW0WvD1J3ctiM/V9Xbljh5gVYsGcvIpoQo6phhe9WI5pdNiJGcMUBix7WGq5fn2OfhRDDcwYjloqFyntSddIxseHPQgcDsGtgaFIZtpgQXVfW+3CnHHhtHF6MXwZSf5bjTBqVycxiZOhecxwwRmCN0wUHKiAKTtRWGV519FDlI6yseFXslF3d96i5EujLjSLTpvwYWxLHM24i+dxpaopOh99PiceqanlfPnBUnsmfJRwHI7nNG+8eaQO/6BEzc++zgM0NJhVamD5erE2vAetloOjkJM5XNaany6AtvMz9H6l4uYwTLH/WnMdZd8f6GNl8k8qsrlGo6MGQViJwXCSuX0cFUL1SZsXSq/+Mp29uzdJRZlpTXIIYwRMKBQOdJga21Zot3ed8plei7c/KwpYY1MGfxKkRwOtfIeXs6t3MntDVoYblMw3ULrXjwjXSNyZ/Sak1cpe9l3CFKVBbWk29MREG0Z2AGlLOz28xWZldgx7VBCEE9EYW8oD2ImVmwKKlkARF11rNbznPaKcWeKWRd1dqJ/MfxzCX/BopfegjJr/B5G7cl4konxVoDVvKuPzamLNZOykcUl/JrfmLnviJkr0A8G96H9lKsdSjny8pXyslJ4yghbYtVGFirO94lpDw4S1d2QVVXlGmO9FuX9wFDuEWtVwe41P5B4hyFMCsavSS62kbVeFyQNpDHe4RMKP8VNQOadylCt71UvHSrTEb61SQItBgnEGRDhI5cPtdfH2f3hml0v0p6xaiH3UNjBNHzMyi81+UU3zKolV+lusEW2lc1mKPokr2ikO7TR7TVrHKB9LnbCFTNojoWGbx9mSGVoPyia05XjwaqmtYvnCf81UJc1UswI/X4B6qDjVAFvF6Nuz+a0Q9TQ1XYsIHXWSih5/hPlbTXLpEI+1W7EN3aor9IS6tu0BdT17p08+QkCE2IMDC6HVqgzhwEsEOg1j8F0wfF5DlZDlb2SnbIuEVi6fxo81gSagwaAa/ALGV1yYIXbHmP/WZ2VyKGSLZkb6cWhZCXeDOYp3WryvJjx3adlaqz2Rx1f0zgj4e/5jqAq+92KrkFLAmFD6pllktG1HOvdqCZeojZmdJ9GFZw59hLPN0bI4h9X7w1/OYGLfW5pJ4XjlR2OEgpWZUQiZi8W9pzdJMfiKeOb0gfrA4t3jo4ty3ch2HTuQOY5b4DjtoQQMk6FPDzteHFss7kpOIp+RvfbmlQfZ/kVkpehYs6mE1/g6bqT7C6rveZ1N5X6UY3SMcknkYWrOyk7DdYyFl4EI9ntvEQMOG7fGQGha6HzSDl2pdwL/sWaavIW5baipFlsx4QDHkX86o5EY2IuJYGynMXFTGOvJipG1OG+6t3b+bqPivG2yCKFGp4uvFXrkCiRUL0RiiXcgMQUBrGUntDxOWxicDbh/UfnMzUETFcxgcVv/UB+khriN8NRfBSCYWjTmOGyv0eUfcZuj//YETGtxj3yJhKxBfIQ8JCkjpwRgp4VKOe2ZbMqgz8tYrNj23YNVsFWM2xlCezeTW8p/zyGfqEaEXjR0LM9m4nrGRXs4kqWH5yWNi3z+uSwivK3tOEpeZugaTooQpx3ZgO9bss+NNcHrd5KyWBSYcnbsc9BnpEvGq6XHA6Ww/JlFNovuMIRVfKJecaSzaCZ+yD+AjXM6p4SEsDef/HikuooNU0YNFqWIlndafKwtVyfKB7BbjmnNsXkJZyb7VVy7u8CX+miMiU/CoW8LlCVDe4+Si8A6jIvfKssBy9+hgxdQnZSkFNfoxJ5LfoI6JggMh/KR+0ah70s9y6kBourSXtHSrOunMbNZxFSpv1N3roWef0iIqckG3BEni3ujb/kKzYxtvdEBqlmKmQ8Bktz2tLLgbl/eo9uyrlLgYLaZM2CXQG5fWqQsBPOQO2+xUV50cKxJrpeCu/N59nWbjpX0qZeBeYL+dirJ5e/DNbQIfijNjV+5neZCHG3FYNsDohZF8NqQccexXgOQvWpTr4JuRO1wekz624HWuC3b529PbUwpxllPnUNrmLMVtB8qBdVpLJcMUTk0jy7lYj/hNUwFVXS3U0j6PdQ5hMZF2XmxXgb3c/A0IQxHbZvyl9bSyWmHrxN6XWl/9PeOzlCbU1tMtpdYOo6ZKQ3ifneKS5tmJUCKTf2hCBKEhaaguDC9dDaENX9Mx8qD1pRzB6dRJ5ROdHLFfdjJqoibQo98qFnLoIK/BKczhm6cN1EJUYjMKljlaC66W61puHx4eSyt6auUzYYqUQTB4Zc5hWqQbCtOU0tcyQDCc1RNMtyeJ7BYsI1NpwVQcFCTBytyWCUyGgOfwP34+XP/yY4KSUwRqVQWPfuEXmD/T7ipg32yEUMLD04mr43AZknaflyAGHxZFwp6ew/OTnCBgHLEXRAR6HISIZaX4qmHrz44kisn+p7oNRcavqVq8IR9yXRhR58IuoSGZR5uUfecbjayDdWVnsSSeDWEVUHPypvdt5eSqggBz3bKG2aNVJ5GQz67J7HNUwVO8tNgWzeJPwIV3MOdEgZf2lSBUl7a1grhHXYbJbQ34MC3COkRx0tvfsKeS2BmvD6p2OtbA5EBmEOKlZCXQ2Nnl48gPmUSWrFQoxxELuKjOl1ro8fN9l7xLF61LGqltUd1H4R/JYM63BSwPl9uIQw1A6k3j35sdW8qPu2TUgSDYHqS/w4YLIcOWpQjJ+P4dE5RWuxIMtm5FAUzpcY/B5YyTJ6KPQRfwWde3cA3fT8nabSkmZaShx0XHE60TYZbf3qLJ1SbKT/u7uaazXqAzu8sA5dhwhtigHwRINxv4Jj5aaV7G7z2YZCYqanPsbKZhJyArWJepS/HZ3e9sLjiivEdnp39WdDCeVqSATpuCn24cMFyfL3gHlU0ZfWcImkJi2lblhqsNtOYB3x3XIPOdvcy6bneN+F7oSi0wD0PceGl5RsgnQM1jQXpgXAfD6rc0fNXJHwwN596727udVbqbS33btc64D+tYf+NBYWBXZFuDJEDBe8AfPQ3MsDdW98Il4Ky08vBJq/Bf5F9RtZ7bVqx0/oVCCcPWzMKjbSAlY5beJhGk06JFQbiXSw1hmKEf4KyrL9tFCOnB95T6MAZWuJjdF6wJxIaT+o0SdMYcvL9BJd0RgWMVttYFQfLFJ2mX41wu9tvI+7urhNjOphVSxAv6+P654CScn/4bYvHxWE0fMA3M/9yDOjb4W40WwClVF93JBH20GlkN4Fze5g5561MN3+4ulU8sN+lO+Qj9nM1hK5w5rJuv97IYL6co57xEc4ky6PKdIdnrsXoGoLz0QxmdW17Wpd9H+3mNx1+a1M3b7qbBAamh4fbHs9YEZe5dkyQPwOID+G3C3IQu2H3vTQ7KABGIWICPdZOr+n5Bz/au7oJgXL4pjg4B67MkXBD4RPhBf2vpo2g+Bn8w/ilZPd3WrOnJ217jdqJi0JV2LC54Z9PVrrV9EKeqpglxnRQ859rtXElLfURb1G8Vu6IxHlXjJXUavSsZsJebsl1LlT3lDhBZPLpntAauxCLXS6Az5AxfzkcLhRkoo6kl05QoNKd35URj+PV8zpV76SoudlZR+aUhQuYFJcBhjQCO4ptH183q0LOvX6QFIrQm7LswGYCmgfgqnS2S0A40KmYp0+xyRC2/Cgfl2P9z3KdbzY2lpo7Rcx5njeksJ6XyQR12qx5GdRfA7FBmZTl6Cm5aZuAj1nLIBmU3Zqw53hGSksIqPadhn7siHtPb/SP5OHWv61qfpGTSkC8/z+AEqWIIT83TbRNv6wLScxQpkIdZqolH4/O/iYHQF4DrfEiihZNQ6V2jb/30as2jcOA9iOraveZ1UdYxexFxZsFBaI9wfQK22pGepkwpqPau5eErNPkaIyfatxT2EkJdwXSCynttpxsUyNeUGKnhBRQW71AZ3IYodZCP/SXw7y3dPWwZ45U/8PKO8LhJkfHO+DhwyeRvB59G6DR8aDrk1xvxvPhQoXLa4aTp/MZPY2WubtmehIK0+gFsSJ2YdpgVI5kccedPWy1xdaqJVUDyqQ97BgKcvmNe8OZKxCMcmZD/ozmklR94/7vWGZAYY2OokEk4l8U/fADDVYPcYK0y5FVqp65Ef6OOse1SjM5lu/Me/NZsfn42DeXhF13o5FFZiXEGegeWXMIfj9Pp5e4AnqCmIZy7Nc8Yjx3/BRGXtV9NSZecPuO9gRAiC3UgcRh8/FAjQ2BgptQYWGRg/RdB5qmFWuIp8F4TshUGkKAroE6qZlf4WGK16MYqYd3/h8Bm44znZQmAHdGZquwAEukcN9Q4/4uYniTvj/CUKDDl6mloGpi8pOBOpURReu5jodCDn21diSVtkmWvT6uWa3mB/MJKNmJgxpcveeRttVHugML/bmhfZPY6YTQH0v9z35Qgv8aR5d+WO61BCQEs1izqwKmCAm6vLGTcSucgF5KT7inYcnZlZE+D+IzBV2VZVbBBeenT2ynAWu07pddei0dI9b0rF/JjstW9ZmMNbKGv+uUoVag1wTxrm/p8YExYlNQgL6Piy1FV/He9Gxgp3hTDaRpGmMnYvZKg/ABUtjMU0VqB8pSfIwoiXXtrP/be5pj9Ep3hpqWN3ne4+wkK0pcDHehcFAL93fxp4HcC1axkCRkNhqVGmaah4dKABpqQ+R9dCi0fPphMYeB/k3XylqqsBElSVu4xGCNEQZWK1whk5BuWohdBjKoWcNz202nnYWwA4YHZa7DSa2+241JAHlvHBrjhFI6K6OsOotqCpqiNPiI1qFpFdL1kyhmvgnt8UF0l96qejNaHb11MDpHbwuxm31yJ5Y2jUWaB+ze3L4DKjuqAYJkH2kpbo48iJA1LxuwfXa+boMJmlcysXn+nQh+sDshso6VA2JDZ6pEUcPNJLu144isLVmCaCfD+LiQrnGU/pO0coO8eCpciXF8nibDU5lfYvVgtbWwSu0q0qtYX0WOLV2af6N9og61GprA/3bOGjYcwUg6pswOs/AodxhqnBZwswWYGbNw2NFwljS16tKAVXxwSGwNkkrBry0jI6j/G2BZh7iBTAHOv19g4UAS0KsD8ZSQY7D/B2vmFCXTsjU50aOzCfwSpgxPdkNFiXnpHvnpYi8DU4DfpkX9N8R3jKz760KjH1ON/Da+S9W9rb+JTUJTZcBoDeelYhR8nGJtOkYXAhR9crhfuNjHEPxmFDxU8RFnw4WaxGpTmKKDGqOlYXUaRYRbXAAJ/ZnxVvWSDqIz7rEdRtJ9XYCOiRQt0HQD+IW21FlVubVh+cNLyKPwaY+AOdHqcHj+SFK+MGkAJS0UT2Hu+Xb3eS+IWXCpIfV2EZobpQQ7sq67ggXamwkX3eWkg6qEC0iRCNTfdvpIuXz7otN6VibbW5cjjLIeUYRrwiiziqlEACDk93qal3zRrwOiaZuoz4Jb2YiReJi9/7g1bCb2agYltgUZzYxUXSp2T25pcWGbO1La7xtaeE/4mjyMYqV2hl5mOG0AbtsqraxXa3tqG3ePEO6tabmUbkNZec3ktXHNIXxaZAdO9YyF9VSuv27zDU0fDamwDWle3mEllpYMAhXBoEyrPO+S03Kog6F28IdOQcvE2GokUbl5PnKs10pwkGXGl8s4jZc3CFpTYK1Oj8cLCdtPcV7uh2JOi7Y5nFQVyBtUT8f8R++4dgOZypJUVv5sgztu3qNtGH78ALR4zSAbvLlmiqKv3fzwh0UwBk5GJBwR1lWt2Jr4zFpjbRUOhnZwuGQNX4ZA74yTAzAMNhWeAMMmqMi3958M2+NZlFMKWRV5uaKPiOMsVNtbPGV+vn7eOVIkkkx5UwHh6+HPfzzeht9cVooHind2gvnL6w5XbIuNZzTx6U5dYHtZTWXOvAhGbrVxUisMH0eZXrtTYllYSuMUu2GYqvEyDnakWic+43jiTGs9mWV+Rjwr7lf3JoRha7ZCD2iPEaFX1Y6lNrSIpGygRIzFqHRNEfI/gicWgqONkTNc8gkTVIexg0nU4xSitiBM1tqkiGCb/aRpjGSaIXFqHOdNlh2IifttQKQXWcEDjFIvlEl3kJKnUEaW6P3EhApPz4aB0kqOJXFDKiRvw9+JMrMqRI6iqsADzWilr5JsCUlhkja694ON2D6d3LM0oWo6cKhhJk8HZKmOcqEu0tnqLKuwZoaRmYFYgoSpy/cy0kCf1YSAdV6TWsdlyOdpcYqow3h77W+uJ4BSGocDVTRVbL+GWP80edtZvPADtfILy5p0nCe1ZnYm6LZiW2X90Kg3HkJaTEu/hnG1tZf9tAnHZHyM45hUSKYrWfiAgJuYLDtx53wOJJ0esJBAY34lxEwhEDWck2+W0lA1fzd4tvM7k9A+d4EQWnJUgiXVFf+HDwOzLG2qE/hkYWt0jpyTUWzR9VtAlkTzb/DYYu6DyLu46TKDvMgfUqHxoz+YcscCts5VnFXVOD9/kwNQ5qfN7kHQSZDsLXrO7AEDf++A1PWYKbnsfQ1Vh61xXhmSxNtNXFL0TAjr+VcAPoFm4ePOf5fB69yi0+6DUZ1wA+hX+0aehmOIU+5WXZ8Z5dauHaD/bN58mMhDgtuNgyeh5Jjtz39meWHAshocyI9VWGJFZ76JXk6gU+hGf3otb75Fp/Dyp+21LYLAy/1kOEz7cfKn6+J6X+VilT2dpGsZuL1xQzK5eIRfggVIxu3lGZ8Jb9mVqxDLcYLccBqGNB+Z45dbMaUisCtSW/FVXoE9hRLeeGW8XYhBz3r/mksPi27bCM6ghXUkirC/RhOrfhWRDGfY5dydtmbuprtNaVaFA1+TboBupU5DupBfjbTEuYdzerWBUxpEvzWQrNmxYn+WuhexgKnDGY0WduHmu+gU58NycSt3FqauodUDfQkf2Gp8z4QXe1O9tHwB4GFAgoGDDM8mjJ43fzUvawRrfEXT+jWICXyaLUaY8yIbOYCA/Ex3tUvc1opR30cEZz1gWxTwEJWxoVoJpKZA6w6DebqRiVlqgnmZNRzgslSRdimV9tqNh9J47TKah15+iIf0s9MXcEQJc7jgcWW+uU+lh24aUfvypTBOMYf1ROkOr+6WWn3TlbiC8J94XZgkzWurnEwq3v2f8NtminfUBdDZ5oGckvMCJ5plSrPV0twKZYCCUoQDAcB7qnMOPEJpj3dcpAPLWaAdJaVc2q423qaYtLcN1CFhRYnGSAEBbwNxVx/UckVre0LigZD/tnh+lAVvUwWyxKxgpXQAw0wACJLuyF5+rxFhZY2zgSeTGQE7h8z+1cxsVFk76R/bTnHHgXJrDkQxWRyEMaRAyw3Gjdy0N85GSIQsk5bhUepVphUz/1XeYQCWdqBlLuVc/IAaQK0tRqT22kGG/DW1KpkWjgHOkmW0puN9aqR+7YhidGGVmrV8dIXyx2t6h6aGMLyaPrFrmG1ogmOfbZNOBlHOIAPnVWqMcYYPgtV2PdYTAYZY75p0bvYmkmE4cX6ShH6c9xYtvq6iNAOombU5AYgK876RmWRzknzwqPSYEWqbbdWAzuyO1SheqvpLC8vXCWyKrK+aDzjb+bDSNbNnwJN+h/5XR25qknk8d7ccvQicU4FbRPNVqeQeloPE4V59/VFdhyNGMrNfGmOFUKZCXHoWbIRHWJ66TwTxse2emmK3mrt8ugZ9twlhZwsxAu3pWKORARx7hYSmcSOcFaPwKRbhB5EUI+1/lUSNwxrr6ZhQdWyrJYHdcD7KmoZ3MkTR1LKk0aSDeW42RBuGRHZRXQCL2skd1z/zf7eTJ5/pzjILHYWfd7XC9+eN459elWkROEyu5FtX23a0sauy62WwCrTimWJb/YQOdK+zAzM7a7SoFkZQq32Ygb1bWfmBd3qHAko5tmm04WrEAn68y+bVpwKzOooHBkhzZDHMFLl1jE7NCbP6AUn19G0J+kbrVPerRJJcu14ibbPIEYl2L3v1VPlIHdpVeRqIQJR3TUIiSzeQaJKijrZ99pkcmjiEp4fIs3YII/blooWlrrAuAgKXqdWXVSJ2epvNNQVhfxNvkOyz3JSUr8GjvcKTHr6zDExSNLL0052f6Wyn2ZRrN67KSCu8GCumq92gwpWmbohPOep3XFWhgD9st3CAO8VKyX51gFjkSEEwb7Jvh2WvzZj/GmoHAYlLQmd1rw/4pVM4eip4RcjL7rCzUdCGSvUDqjOXo4RggTBRsrttkqovI7sITjGs4TVkb5gWhnEgrTKDBQDAepZW+h9tBuxNA2/QBb0EAiD3i5qyXK61+XzMSP8qDIGCzXE0bIpXoaIkTG83ct3Z8SPV/T3wjCailS12spAcx/T8/4/+sW2poZYJeL30LOKAQuE/Ul/3AlIKnHxXNjR3ERRLldd7eYi3xIePA9AEg1OU8CJBjoiVgW36+4BidXaWd9LBliCRuH6I65ydVXKYB491GGyASpD68mTA15GZaqyPq789vsq9lPiFv0RMx/BYvu4GW5bgK3pMoQSZeGiwRP52cFaMAb2AjlyPfmtVVkBhZlj9rIdnjbZDGQPSX0b6huW25rJyU2hFEDXydWZ5YX0QYMJIbLfwYO8xg5Yxr/S+jYcYEanOlJrNzrqMSWsRNj9xzFYvKUOQQw/NLs5gCT2fZ1jFQ0q/DELr/jwLiecJs+SVoT72ekFEykGc2W4DU2a6m1spQoa8iGE7943iRwYRwafObpzGc12oU71/YhByJ8vuYxXcfNTc57e3xJSO8cKeFlJPwLaGsYFxwPokyVpJf9WuegMkWKG6lqiky1ykJc9CkB+WlXqZ9LcPAWAYkNVRlC3SrJeBb6wq/YGLMVWug9Zo02nkOUuEkUx8d5U56y8xMp5sk8ahaHGZMmLL5cwnVFr6R1hCSCxkA/mbnLUl1fL7h5mG0gf5gTm35Wvzt48uf1fKegLIYOLzpB5+mqkoeRVxaX8+OOIsW+Mn7ALzZGo+xbqw9xDNFuDBrNCbkCIOm6N4Cg5s4ZiPWMF8D2F8EW0RfNWAUE/ijh9tNXx1v/KIQbld0ViCNLKzC2j2d89zVQx0KF85J5to2XR0SiMbhLEWjPNqaPVTJZpJ53GqpIM7GkJLgPAc+3SnjkIlPslJh7imNHenfObtsvqedxmpNE5qOIng2mhXewvtXFmTXzo9o3vx4mITCJx/iPFm0bKXeqeNP6Cvcf/LD1MqTUKbku7FGlKuWhWIAQ6sajqlwPpdE3FyVuadi5sDKKTFmwFsXqeMFGsjVER4zTRuhYQTpWGmP5JtH3JcrIvT0Nl3QwpIlsyaUwCnoK+vEBXKkC0EOph9cmSOltY4gZmuTVc104eBA+Z7zB2UWK+UPoBbvUXlkY2Ljd1Aqjq2GUR7ypBV4JuiLFkDLT8FmIMnX2IspnjsuPkHUv8UCEQg2+OTZ3MLxQ1LvTgwM2qoLIwQl35EY/IiGMhczLZYmfZH5AGZp022H0czz2WKX6RzE6gMB79+TUEnHLiuUOf4Q1sXZAw3dWajpgLzKDxyqrCGXgOkR3lol+mZ+4Hs+euaVVL7TzXQTyyPdjg3pHa8SJuhXTodte9XAXm5ApmGywNsw+1VgkcB4Ma0iqaCUz97S8qjepw3AbPMxqVkuKRra9S6SMGZTKB9eX0+/zPXdv4QFtnYu42tpHgdhcCFRHdge1Vk7jQkJ3m8tIokhC87yzO8mV41vWa7goORmDBcOquVqi61J352oAeZeGv1p8xlU30403GVpsOOAq1WPkqUcRCpOfUBbbiKmxKvE7KNI3J/I3h+VNzq+Ggmo6CW4EWhZZaasJdvz2t+YGbf970MOtZlr3CAjK7zSv1LmAvz54Cgxgp0IhF4eLVT3egIVQd0RsBw+YeQ1lInvPCILrWCYYBDNBIVcPtYddYiOyZNOZFrho0z+DZ/Y5gCvTZVnua7AyoZmvN6VMt0Zu/Ajcuq6jdJMvyOjo1fT/ZvVsTw/YlT9dBzd47ou0QGYAOq9v4IYTOSGdes2scJdXrK2sHt+angjyqQjErDMs7QCvS36+/33Z+qtV20Hcj6ROameUGPvzpxO6CMTeYsgogDXltSmonxL79bzEvpYLpYvnmRAshH7pOG/cE0llBR01GCe6TLAzly8qB5iJufM0ISjZp1oF79asdBtCjhS30wUVV/ZAGblH9KbDGx7/Ln7fMvcneG4W7bXqamqCUPctpMUzRhDjGGRqJ0xn6gQpi752r7pwgGdNtwz9qpi3yrIhwGSXI7xcAJmwalm5DfgvJaYb1wdf4DCf3H29D0Vp907Qn2gqFkgDEkft1s2DqCZyvzkZZVYGuagUT6I9+EExhTQvXVYmRndy/QOlE5VGdGE1Ffjn1SKEZGvQZ/ZOnQL0r9iFxGVXFmMYvZyGWYQw53VZJk8KY2YfZvktsVdJpihL1voPnIg4Ora9NAb29bIcdV4u3CDFU3ODL0TpNye31BjMuAx6+WRGZbT5NCYhmg5n81sT0WkVhmxaI7az6QZ0YGSh07fPywK3ml1K3+F6xhsRAvVhVT7bJ2Noo9lAdX9Q3EraAhd3f5eXrEJFg3oHs7lI3WmUMx/iP1C3v4lbECiPOFs45naQiMvH2HyMslc+7BhsrOPgN+0Kg9MzRFAwimWW8OByF/3IEMsZxHB40xZZ9FMiqrqHdgKGB8SpFfrKsapIGxM62c+vH8iqVncyNKR7uUFQEo/rp64HTNaBoyjnZDxFuuJpCOhrIde2xx/GthD9tfy/0vM7qjx6xSmujScy4cn9xfVYlJgrCCNIpxRI3Azike7PQ2rVo+fGYU5Nd5a3GLvcmT1Wfo1/gGbeFoongomJ7vaxMHA91mmqR7c2KOfPg3XaxfiaNea3qdHbGArKdG8tNcSyqN31IRFZP2gvbtZEyUMf+fzLanApzzS8S9ea2ZQW2HpJemcC24hWBu+v35/VKNmCNyFLiHg8kq67b3epmLA6Mv5waiTM2KnfkywbBfjXWRiPjZPpylZwc+D21XdLMfPMZ/+sZ3s2OkiJhr1jG0mXrMaaAxqxsG/MTjsYY0wXP7fwujpiZtboWmcdwCbKXIh3aBXpq3JUaVKSCyqWGslwvUXyreV0hai4fJjnjTy0lt+nPP8W1R6wPmuUPalqaVO35xdz1CX/AFfq1zcGQfhYruP6ytzk80SG5G9gYJjcpOvFNIG42ACkrb9LYS2t1wm05DfZXFsxGm/zqjmD5nnfjm7wsv035MHPpcX3bwjNOKnt9osSUybPFpvs8Hl4ZlEUDHdJKnc+koMmpB6YIMe3CoX9GTVwHElw85m3L005kD0DF1n3i0MZAY1376Sv5WCYEwqgneqrdmri6UYQpDKIVTS8WlhSH/QTxoEnFef6Lce5eSszg5E8DThcZtSWZL34NIVxzbiH8CzS6S0nuBtJ49Q/I4bah/OXTjGARBDKQkwWLINkhPVKOW+gT9U5SaQncDA4JHKXKoAFvbV2v0M1pOf/hERAmnfC8pggJJgbusGsbGq188dQhWQDVggUl31YWF9Jx3Cmw+T/ZYlEm0js4Dcj8BbGmFOQ8t04LgQEaCnYa3b2qdS/57UQK3bBjOigpMiz4OMQuSuwddxZdhKg8VYKSZoyWnlY8hcDjzHPyvfPxFQ0Nzm78M53gSOJqfYgOBAnwOgZBqnAeG5aycAbIJjl62d6l0ZkfMcxWRT6VXj16k+WHOjrX66r55/BRnIuJwe8UpO/D7r2/rbp479DtpjCo425aIA4QeuvYUM07Yx0KNaQxoMNSAvaZbdzx/3gticPbAUTCQp3FxY9REb70bR1A4JT9yV5S63qdoqmb1QN8meidxGz8yTY6VPUWBV1nLZ0WujzF0oeJRjIV8TpOGZEVAh/eXxY7wWH8a2KG+gYoOA5y5eP+ElfqkekuDAbOjXiha7e48qJJETRcuH3XriQJmDmZTD/xV+WtZeWYTMXJNmK55cmecf0y6M99Yp9l9cCWfWWFBaWDuwXq8cgQPA8W91K3PFlumUVyiqFbuypf9mW52Znq/EJN5ZIsMqeGFAHs+k6UvofNZiJnxV/vSXmWGWkOREHxMcGgvsKqD/g6BBW2FLlyLd5aU32/iDIdu8R1+QJApbREsmErI+ITSrmNxIIvMyXoCd+eL24PwpnDDOOVSPu77iZ4vZ2w6dW8zFvG/BV5pfNMp9jqSA6JjM5Y7e54J7KTXIVyRa33FDDG/cZHdt3GFjYQh4xwEkXLncQoJugR5v9p+ARwGa51ghMktGofl1InT7plAOQmHeokZsXqKi4wJXJlmgt3ZI85qILjm3MlcKZAQiSFvi0CrBR2qnRuQqNiiaC22xh5sXvQDTrHsQfFikhgt+B8OS42QInH7gArsPYnAfM3rHhT+xqQpiUIJ0L5TbUtzfGbA8qzLn01wjKyDn1rHx3yNIx2wAKrBC/COZKIa15GjVV7h3awAq5lMmfz/+Iyub3GPMZn4BE2t+tSt8GconqTpJyfHz4duCAoPY659kGUuyst58hB5nHd87Et1CX0cOKPHF0EJldxy9khBSEMhUlGT4OTT7wVcxUI/TwQFNCkJU2KQMFuqmsdCwvxe0im5PpSWn9lVBEcnS2sPbRpKgQpLFVp5Gb/3T0DidWzLzczRde2sdbi0YGydtwhpfGPubZ6gxWf1W9eZjrOBnLWgc3mIo/d9wgOOoPOnhn5rD/Y09JgVWumZ0ihFDUggKWpggIDNGTCYFF8PKIq9g9o/nCqdOpx1123vCf2MR0O28m3/oKOpiXGpMfiYi/A3ig5SMUO1YXNmpg8aTZqj1ZrFjtWDa46q+8S4DI7rkqCo5rcGkmCaBQypS5lOiNo4/w8nrZ1clXyBWZLHESrk8cNXFlhmSXunrDqlUv9aYTqylJNFEIVlYiUVI1lXb6T0+4VANafDWrSeuQ3SIh/+tiUQA/Ut3AeMDyuehJCvuZxGAn2AebpI/S+6tlB/06kJMmb3o5emQjSSj4fDxMVaF6lY4P4Qnfx2fqAofwBCls3xx6mDrqhDkr2ZA8J2yDamxlyT2o4F/k0qi6yDn499o4YE10TprluQwGmgceL4x7Jufovudget9Vdt7MQgxLsfz4px9oBv0fhUkDuArLFZbdopfDT04zAcUqL+7IbHqkeWHY4zZwUjAZFha4J4W+0t7w99oNJ8h9J+mWILm8lzqfeRDwH6wik7pLh0ZIRzW59uE5FzPd++bn9C0zFFPUrTxYJ/xzGrcPpXpVeSXkokh5ZHm3lci/lcmd3kHUeNd6+P+aPcXCexhtBTDC9R6zV2/aLQHvrvlH8+/o4sWZpcVUGgeVTqks7TfAJQfgScFJRsPEzAbGmak4oyc/veaZW1/4oEClyKubxTNCkDl68K0EQ+fchh3k6zKz3hwy+ctHW0x/sytlEgQG954YIu6pEy4z/5v0cbL1p9Rkhs0P/s+jCSS162cwj1gpxQW39AvcoZ5yOjtc9EhQujmkNXuFIAUo2WOZx52M9+aFOR00yRdwF/GwwNfA6YkpphM0eV4RCxMTGEZGGuwVcTUMKErkH+9wFp7BFsPqmeQk/53Vm+KEabSW4s7kkFY7iNgbMD7mMrbSx3VnrVEMm8XIY0+C0Qa7ioHkkndowhpDjpBBype6YODucBqycQknukHe92s1v2i60+BubnKlSMP8RMhJSw51/Za2r0RT2IXMrej1DfZ6ebt7agdvnvKC/HWAPs8J6Y71C1Oghvf4ZxlawufWCGM2fIX3hfV1zIWzFYPOvZge/1xnl0haLWDZAQsDeYb7LyvGOXGm0lrlqZ++rEEd6VB0mFjgqYCMoQvmq2pfEPle1JCN5U8Js3qEYetgpoJWBnbQSEht9iowgpYj8VlYQe4D+oXrUi/enljIVu4XFz8r30cJWudKUqYnL9EFoYYIcb2NlSsI1gipiMBdA3/WGHKWmh3ovGlKE2ibS3Q+2WaeiHhE5yMGh+bSl6gOMgVu7ZXIW33HHI815L43JXhHMQx8eQe9GAd+P6UiEpu/pOkq+tef2sW/S+g69HKDlTajxSQ7+ePhuN48CCVFU0A54YOFiC3ZlLN1n9ThSlnALJfceehvW+q/PMzg5YefV7hClTtS4A/zvS6W7z85zebC13QOWMYlXbnpsvnY9ulgVjadl3uaVUg3Z4VfpRFH4Z+L7xpbl+4gH51QSdWVyG4ydTlm36+0Tr+aF1R0o89JuQ639uqRKNAQxbeV/Pk5T/8+lwf3TI2EI7NQHAxZK4d3vaxqD5DGa6v6Gr4UcthRrZyXB5mA9f8QRGiQeEz7+ReyGDPOAU4BIws012ivovpdr0ct6CPbGYtolmwNpxTRpDJpqjnQJoE2gLbj8zgcyJc63JgptqTQ0ca2+kipGoU0tEUY/wTUtwSjqW7MJ5oNsD7o+3S6nOvq4D8XSqYQ8fWGFj50CIr2Xk4F2PKoT56eg+Z+/1tkyd1pxadYKUjl7PfXmRd14IM37/zuQo+W6hsj7bukX8Ba0xHijo5e7JOfU5faHEsy07d8NPePGaA2Y3H9eH89pqDniapOvhuWtaoYlgwNfWXRiGeXr8XWVv/0b3hFlgGHeXzWNjpRHzAFyQc4dRtPRuLzE14PrCpp7QozS/WM2tIV0epXFeslEDTKjzKGXkWtrqiYyZfpGyb3qCEESeG5/qokdaEEVrX2niyfJ1tyQ1qBLZcJYscUJoiYptwnWAgpcz2Mss/pT0lRd+33zStUFBGDzuXf8rka2VgAPkUlx+DCHPIsuMB8m7mTiFaDvrCiZ1S4NadIK73LGOraXF6qtRK4VmO82DRHjibgNeVPZfaqQO57QNMzX0AMqV1mHKGDnnhmZVaO7/dRflgX9wtIVfo5BDnXbKcOSzBl1coYdZZhBH+bzbAqOsAnUt+6j/L1OzrsDbcHijnOh99DC0VeZAixm4ZWR57DdKl+g9Qj/Hsh8k/YXO0ZNtXJ2r35c7RvOryg6/arQfdBBrNPlP2EiFXZ0SHFcr2SCadXZaY6MInEa3n1Rli4AA1tsMkizqurdASnvBObm4UAg4E/nZBUxtX7gLn02QL5XUXrt9qlfegAjIxg7voF5g4U1YA5upwX6E63Zx/71kvkGqluDtIcWAxKKG7yxlRIWPBJOvFbThw4szf3YW9VQA6SmytjlLqyXUDOyd6sxVYrQoZ/OHeBDbYksYm5WFdm9x9D+Wde9WXsowIqvZk6QhmDdv0RlY0Po1smTAXkT2AWWMKRm0MfM/p1Wk89StdDrOj9Oz6v4wpqgwTQ3Vh8FCUT/wbUBUjJ2FF38LclwJzl6XB+euNyyuK26TiU3z+0+xkmqsgykExtOFMMN0DoF4F+0m3vjo3k8Jf1KH+4Ygdv5k8+2qJpS0bIT43tV113OKbGhQCeDtWspjXbBcuEL1zv3XVYGoUn1HRlZWqIW8ednPeHoDb859GmUU0g3Rr/uqHrMZogbabRigKRihHVubKGAfL3H/F2A1phxG+6iZzk+8ipxMHyY+1pZfY+EUPJT3iFm8h/B+iv54bXxpE5REMoqsn6wm0hqi7XwmO9PICJbwk2RemsOmY4U4SEnkyvnyCk/2P3IqxUT7o4kUeoo2mWyxfXtovab2xKqAwaQYPehN2T6C+6SVUO2TtJFhh3cC9G1xUY0yiHXsvr8CbzMWEVcNLXn38nrqNswNVi+vZUbfX3kVWXFTZ1I2cQWJjtCOdYqIRrg4p45r38lYHnRhd1rCh3Tzjjk0Cyz9hhXgOV4paD5T/El0zpqxMAlXwSr2j562iAPmv50VAfq5arWtz6KG2V85OlldXjlmB0VwrJJsKpiJy+6im2uHFqFxnKxMsnrTNumdiu3dh5XimSYap1ODlUfN7z83uFWkq0wRpAX+fAz79F+ltJToRI9S1esi+pa2HG7IwJ/xq6hUdJDbgvdiuV6pfq/F3ipJm9cfVvxHMYxWVICW93u+ao5zjAxqc4dzRhvD1bD3mPn+u9C7ZLIBYqfmhvsukP1fTgrPDkesnXNndhlVLiKgbThaofp87ZR+m+qNyUvsJQDujYsTZ6NGdSmRorIGx4qkS08ItW7zZqvzmmsk8Pe66sMYBo8NusHbeACK+RwFSbWnlAYBr6R89hn9A7+XkIfxXZpOBDt+4M+poWOHjqx+2/Z97pGLwWrdMZ9GlbuCMMCW/fzEcGdC9exHgp4nrWhQZFE72lQ7Ppwkl02lcRFwjLaMYYbEoImktj6c5T55J5lI3FfQhIJnI7qKf2KnGRBgS9TfqWQcnFkfLfZmgGLvshsVPHn5QaiGTkZzqP7ro6RYaym8xrS/HtrOTqij5Gw0e13bYMNCUwEBZZaHqV7PVPDFbhBPGRGaiwqHsJqZ8j2NOEqUPWL6KI24wQE2fqXtVR3Kovecsb9vWKKd6VGK70i+i+OArU9Aw4XgEG/CjU/jry5NdhtRZJduDVbbl0xzUbZUpViBcY8/P5cD7uGLgI8+rzKtqaGNgtEwdTBd0dpYYO2bAKKLtiNSPvj1y8ozoSRkUR56aPqm8e0JxGbGdSVofmP2u7cJSt7L9ptdBBSAcMHrZ1FV6of7BpqQnxQ4OlIIN+gTJPlcRRCuHntglXC460YhnTfvNBmllm6mpawmjBh4Z293lk2Vyq+AzobAVAhSp1WhualcBIASOqfdMAgdR2Okvdhx1VexgYl01fZ7qHq4imxugioLkzmAg9ayZ8US44HuZWJOhFGzSesK9wp4WCqRK8HMwJluATKzKBn8KxKAklUgqFrOFZyVBfWDlto9CeJOSwYCSkJCjpcWeV1l+fz/7GnJ+Wg11QOEbpvV7nZyHPvKjqG2av/e5nyEWGhLyWNKsJRyafOrn1+UwOht+ngf7of7butCCNNb+qqOT5PXSHDWpIHr9LeBhOIRljSiPne3XX2QZ/EmDE27lxysZAN2gTbK/IC6eLTKXdXW0sfTFIF/dAf8N2fnlwYSNQAfL+RfWcBdM7SiD4KTCaoEDlRh5TcOKLatV9Q0v8MIt3/t5X/MVgVLi3GRVavdTD6oAn7s6tXHa9QBXGV8qidLNrhSLk/FOH8cC0edwHFW8mo/TpVYocU/ugA0W0RbpHAosYWawTO5qJZlEC5mo6K4W6zHzIInr5UvOgAyEnR8arKI7oCuARq9Cl76A9QRLFk3rxpJTyqWfUY6cWEK01tmqYx6d+r5FDDqfkhRoqwRtHTio4UR8JgzZorfXzd6FbuaQaqrVhm5ZFyFC4VcwizpaEwK6HLkuaOkTgQCyPvCp6uOk4yx0VqHdzgKCYaS339xYAH9z4+BafjKgcP/J9kshEW7lxjfVIrAZvCasEOyialrecVDJ22sT72IxcDZePBZeOin2UqVEHBddodME1Zcvlz4OjgqoQyUrD62fWv6lNy2WvAHZ+ll4rBEAUEAvv9oNOXGCaAL4xmlB5iQDp67iKXqeHqEh6wVWhH1l2PEsJqjVuBsTJKnFQ+UPh4lRlOANNuCcGkIyhGsnDttGFiPdIlmxzmqwS43AAAAAElFTkSuQmCC",ep=Tb;const Eb=new Re(0);class Ab extends jt{constructor(e,t){super("SSGIPass"),this.needsSwap=!1,this.defaultFragmentShader="",this.frame=0,this.cachedMaterials=new WeakMap,this.visibleMeshes=[],this.ssgiEffect=e,this._scene=e._scene,this._camera=e._camera,this.fullscreenMaterial=new wb,this.defaultFragmentShader=this.fullscreenMaterial.fragmentShader;const n=!t.diffuseOnly&&!t.specularOnly?2:1;this.renderTarget=new Vr(1,1,n,{type:_t,depthBuffer:!1}),this.fullscreenMaterial.uniforms.cameraMatrixWorld.value=this._camera.matrixWorld,this.fullscreenMaterial.uniforms.viewMatrix.value=this._camera.matrixWorldInverse,this.fullscreenMaterial.uniforms.projectionMatrix.value=this._camera.projectionMatrix,this.fullscreenMaterial.uniforms.inverseProjectionMatrix.value=this._camera.projectionMatrixInverse,e._camera.isPerspectiveCamera&&(this.fullscreenMaterial.defines.PERSPECTIVE_CAMERA=""),t.diffuseOnly&&(this.fullscreenMaterial.defines.diffuseOnly=""),t.specularOnly&&(this.fullscreenMaterial.defines.specularOnly=""),this.initMRTRenderTarget()}initialize(e,...t){super.initialize(e,...t),new Zr().load(ep,n=>{n.minFilter=et,n.magFilter=et,n.wrapS=mn,n.wrapT=mn,n.encoding=vn,this.fullscreenMaterial.uniforms.blueNoiseTexture.value=n})}get texture(){return this.renderTarget.texture[0]}get specularTexture(){const e="specularOnly"in this.fullscreenMaterial.defines?0:1;return this.renderTarget.texture[e]}initMRTRenderTarget(){this.gBuffersRenderTarget=new Vr(1,1,4,{minFilter:et,magFilter:et}),this.gBuffersRenderTarget.depthTexture=new pr(1,1),this.gBuffersRenderTarget.depthTexture.type=lt,this.backSideDepthPass=new bb(this._scene,this._camera),this.depthTexture=this.gBuffersRenderTarget.texture[0],this.normalTexture=this.gBuffersRenderTarget.texture[1],this.diffuseTexture=this.gBuffersRenderTarget.texture[2],this.emissiveTexture=this.gBuffersRenderTarget.texture[3],this.diffuseTexture.minFilter=Ue,this.diffuseTexture.magFilter=Ue,this.diffuseTexture.encoding=ke,this.diffuseTexture.needsUpdate=!0,this.emissiveTexture.minFilter=Ue,this.emissiveTexture.magFilter=Ue,this.emissiveTexture.type=_t,this.emissiveTexture.needsUpdate=!0,this.normalTexture.type=_t,this.normalTexture.needsUpdate=!0,this.fullscreenMaterial.uniforms.normalTexture.value=this.normalTexture,this.fullscreenMaterial.uniforms.depthTexture.value=this.depthTexture,this.fullscreenMaterial.uniforms.diffuseTexture.value=this.diffuseTexture,this.fullscreenMaterial.uniforms.emissiveTexture.value=this.emissiveTexture,this.fullscreenMaterial.uniforms.backSideDepthTexture.value=this.backSideDepthPass.renderTarget.texture}setSize(e,t){this.renderTarget.setSize(e*this.ssgiEffect.resolutionScale,t*this.ssgiEffect.resolutionScale),this.gBuffersRenderTarget.setSize(e,t),this.backSideDepthPass.setSize(e,t),this.fullscreenMaterial.uniforms.texSize.value.set(this.renderTarget.width,this.renderTarget.height)}dispose(){super.dispose(),this.renderTarget.dispose(),this.gBuffersRenderTarget.dispose(),this.backSideDepthPass.dispose(),this.fullscreenMaterial.dispose(),this.normalTexture=null,this.depthTexture=null,this.diffuseTexture=null,this.emissiveTexture=null}setMRTMaterialInScene(){this.visibleMeshes=Yo(this._scene);for(const s of this.visibleMeshes){var e,t,n;const a=s.material;let[o,l]=this.cachedMaterials.get(s)||[];if(a!==o){var r;l&&l.dispose(),l=new pb,$f(a,l),l.uniforms.normalScale.value=a.normalScale,(r=s.skeleton)!=null&&r.boneTexture&&(l.defines.USE_SKINNING="",l.defines.BONE_TEXTURE="",l.uniforms.boneTexture.value=s.skeleton.boneTexture,l.needsUpdate=!0);const h=Object.keys(a).find(d=>{const p=a[d];return p instanceof Gt&&p.matrix});h&&(l.uniforms.uvTransform.value=a[h].matrix),this.cachedMaterials.set(s,[a,l])}a.emissive&&(l.uniforms.emissive.value=a.emissive),a.color&&(l.uniforms.color.value=a.color),ys(l,a,"normalMap","USE_NORMALMAP",!0),ys(l,a,"roughnessMap","USE_ROUGHNESSMAP",!0),ys(l,a,"metalnessMap","USE_	METALNESSMAP",!0),ys(l,a,"map","USE_MAP",!0),ys(l,a,"emissiveMap","USE_EMISSIVEMAP",!0),ys(l,a,"alphaMap","USE_ALPHAMAP",!0);const c=this.fullscreenMaterial.uniforms.blueNoiseTexture.value;if(c){const{width:h,height:d}=c.source.data;l.uniforms.blueNoiseTexture.value=c,l.uniforms.blueNoiseRepeat.value.set(this.renderTarget.width/h,this.renderTarget.height/d)}l.uniforms.texSize.value.set(this.renderTarget.width,this.renderTarget.height),l.uniforms.frame.value=this.frame,s.visible=Zc(s,a);const u=(e=a.roughness)!==null&&e!==void 0?e:1;l.uniforms.roughness.value=this.ssgiEffect.selection.size===0||this.ssgiEffect.selection.has(s)?u:1e11,l.uniforms.metalness.value=(t=s.material.metalness)!==null&&t!==void 0?t:0,l.uniforms.emissiveIntensity.value=(n=s.material.emissiveIntensity)!==null&&n!==void 0?n:0,s.material=l}}unsetMRTMaterialInScene(){for(const e of this.visibleMeshes){e.visible=!0;const[t]=this.cachedMaterials.get(e);e.material=t}}render(e){this.frame=(this.frame+this.ssgiEffect.spp)%65536;const{background:t}=this._scene;this._scene.background=Eb,this.setMRTMaterialInScene(),e.setRenderTarget(this.gBuffersRenderTarget),e.render(this._scene,this._camera),this.unsetMRTMaterialInScene(),this.ssgiEffect.autoThickness&&this.backSideDepthPass.render(e),this.fullscreenMaterial.uniforms.frame.value=this.frame,this.fullscreenMaterial.uniforms.cameraNear.value=this._camera.near,this.fullscreenMaterial.uniforms.cameraFar.value=this._camera.far,this.fullscreenMaterial.uniforms.viewMatrix.value.copy(this._camera.matrixWorldInverse),this.fullscreenMaterial.uniforms.accumulatedTexture.value=this.ssgiEffect.svgf.denoisePass.texture;const n=this.fullscreenMaterial.uniforms.blueNoiseTexture.value;if(n){const{width:r,height:s}=n.source.data;this.fullscreenMaterial.uniforms.blueNoiseRepeat.value.set(this.renderTarget.width/r,this.renderTarget.height/s)}e.setRenderTarget(this.renderTarget),e.render(this.scene,this.camera),this._scene.background=t}}var Pb=`#define GLSLIFY 1
uniform sampler2D inputTexture;uniform sampler2D sceneTexture;uniform sampler2D depthTexture;uniform int toneMapping;
#include <tonemapping_pars_fragment>
#pragma tonemapping_pars_fragment
void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 depthTexel=textureLod(depthTexture,uv,0.);vec3 ssgiClr;if(dot(depthTexel.rgb,depthTexel.rgb)==0.){ssgiClr=textureLod(sceneTexture,uv,0.).rgb;}else{ssgiClr=textureLod(inputTexture,uv,0.).rgb;switch(toneMapping){case 1:ssgiClr=LinearToneMapping(ssgiClr);break;case 2:ssgiClr=ReinhardToneMapping(ssgiClr);break;case 3:ssgiClr=OptimizedCineonToneMapping(ssgiClr);break;case 4:ssgiClr=ACESFilmicToneMapping(ssgiClr);break;case 5:ssgiClr=CustomToneMapping(ssgiClr);break;}ssgiClr*=toneMappingExposure;}outputColor=vec4(ssgiClr,1.0);}`,Cb=`#define GLSLIFY 1
vec3 viewNormal=normalize((vec4(normal,1.)*cameraMatrixWorld).xyz);roughness*=roughness;vec3 viewPos=getViewPosition(depth);vec3 viewDir=normalize(viewPos);vec3 T,B;vec3 n=viewNormal;vec3 v=viewDir;vec3 V=(vec4(v,1.)*viewMatrix).xyz;vec3 N=(vec4(n,1.)*viewMatrix).xyz;Onb(N,T,B);V=ToLocal(T,B,N,V);vec3 H=SampleGGXVNDF(V,roughness,roughness,0.25,0.25);if(H.z<0.0)H=-H;vec3 l=normalize(reflect(-V,H));l=ToWorld(T,B,N,l);l=(vec4(l,1.)*cameraMatrixWorld).xyz;l=normalize(l);if(dot(viewNormal,l)<0.)l=-l;vec3 h=normalize(v+l);float VoH=max(EPSILON,dot(v,h));VoH=pow(VoH,0.875);vec4 diffuseTexel=textureLod(diffuseTexture,vUv,0.);vec3 diffuse=diffuseTexel.rgb;float metalness=diffuseTexel.a;vec3 f0=mix(vec3(0.04),diffuse,metalness);vec3 F=F_Schlick(f0,VoH);vec3 directLight=textureLod(directLightTexture,vUv,0.).rgb;
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
`,Rb=`#define GLSLIFY 1
uniform sampler2D diffuseTexture;uniform sampler2D directLightTexture;vec3 getViewPosition(const float depth){float clipW=projectionMatrix[2][3]*depth+projectionMatrix[3][3];vec4 clipPosition=vec4((vec3(vUv,depth)-0.5)*2.0,1.0);clipPosition*=clipW;return(projectionMatrixInverse*clipPosition).xyz;}vec3 F_Schlick(const vec3 f0,const float theta){return f0+(1.-f0)*pow(1.0-theta,5.);}vec3 SampleGGXVNDF(const vec3 V,const float ax,const float ay,const float r1,const float r2){vec3 Vh=normalize(vec3(ax*V.x,ay*V.y,V.z));float lensq=Vh.x*Vh.x+Vh.y*Vh.y;vec3 T1=lensq>0. ? vec3(-Vh.y,Vh.x,0.)*inversesqrt(lensq): vec3(1.,0.,0.);vec3 T2=cross(Vh,T1);float r=sqrt(r1);float phi=2.0*PI*r2;float t1=r*cos(phi);float t2=r*sin(phi);float s=0.5*(1.0+Vh.z);t2=(1.0-s)*sqrt(1.0-t1*t1)+s*t2;vec3 Nh=t1*T1+t2*T2+sqrt(max(0.0,1.0-t1*t1-t2*t2))*Vh;return normalize(vec3(ax*Nh.x,ay*Nh.y,max(0.0,Nh.z)));}void Onb(const vec3 N,inout vec3 T,inout vec3 B){vec3 up=abs(N.z)<0.9999999 ? vec3(0,0,1): vec3(1,0,0);T=normalize(cross(up,N));B=cross(N,T);}vec3 ToLocal(const vec3 X,const vec3 Y,const vec3 Z,const vec3 V){return vec3(dot(V,X),dot(V,Y),dot(V,Z));}vec3 ToWorld(const vec3 X,const vec3 Y,const vec3 Z,const vec3 V){return V.x*X+V.y*Y+V.z*Z;}`;const qr={distance:10,thickness:10,autoThickness:!1,maxRoughness:1,blend:.9,denoiseIterations:1,denoiseKernel:2,denoiseDiffuse:10,denoiseSpecular:10,depthPhi:2,normalPhi:50,roughnessPhi:1,envBlur:.5,importanceSampling:!0,directLightMultiplier:1,steps:20,refineSteps:5,spp:1,resolutionScale:1,missedRays:!1},{render:xd}=kr.prototype,_d=KS(),yd=ZS();class zs extends Ia{constructor(e,t,n,r=qr){if(r={...qr,...r},super("SSGIEffect",Pb,{type:"FinalSSGIMaterial",uniforms:new Map([["inputTexture",new K(null)],["sceneTexture",new K(null)],["depthTexture",new K(null)],["toneMapping",new K(zn)]])}),this.selection=new Wf,this.isUsingRenderPass=!0,!(t instanceof xt))throw new Error(this.constructor.name+" doesn't support cameras of type '"+t.constructor.name+"' yet. Only cameras of type 'PerspectiveCamera' are supported.");this._scene=e,this._camera=t;let s;r.diffuseOnly?(s="ssdgi",r.reprojectSpecular=!1,r.roughnessDependent=!1,r.basicVariance=25e-5,r.neighborhoodClamping=!1):r.specularOnly?(s="ssr",r.reprojectSpecular=!0,r.roughnessDependent=!0,r.basicVariance=25e-5,r.neighborhoodClamping=!0):(s="ssgi",r.reprojectSpecular=[!1,!0],r.neighborhoodClamping=[!1,!0],r.roughnessDependent=[!1,!0],r.basicVariance=[25e-5,25e-5]);const a=r.diffuseOnly||r.specularOnly?1:2;this.svgf=new db(e,t,n,a,Cb,Rb,r),s==="ssgi"?this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.fragmentShader=this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.fragmentShader.replace("accumulatedTexel[ 1 ].rgb = clampedColor;",`
						float roughness = inputTexel[ 0 ].a;
						accumulatedTexel[ 1 ].rgb = mix(accumulatedTexel[ 1 ].rgb, clampedColor, 1. - sqrt(roughness));
						`):s==="ssr"&&(this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.fragmentShader=this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.fragmentShader.replace("accumulatedTexel[ 0 ].rgb = clampedColor;",`
					accumulatedTexel[ 0 ].rgb = mix(accumulatedTexel[ 0 ].rgb, clampedColor, 0.5);
					`)),this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.needsUpdate=!0,this.ssgiPass=new Ab(this,r),r.diffuseOnly?this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.inputTexture0.value=this.ssgiPass.texture:r.specularOnly?this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.inputTexture0.value=this.ssgiPass.specularTexture:(this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.inputTexture0.value=this.ssgiPass.texture,this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.inputTexture1.value=this.ssgiPass.specularTexture),this.svgf.setJitteredGBuffers(this.ssgiPass.depthTexture,this.ssgiPass.normalTexture),this.svgf.denoisePass.fullscreenMaterial.uniforms={...this.svgf.denoisePass.fullscreenMaterial.uniforms,diffuseTexture:new K(null),directLightTexture:new K(null)},this.svgf.denoisePass.fullscreenMaterial.defines[s]="",this.svgf.denoisePass.fullscreenMaterial.uniforms.diffuseTexture.value=this.ssgiPass.diffuseTexture,this.lastSize={width:r.width,height:r.height,resolutionScale:r.resolutionScale},this.sceneRenderTarget=new ct(1,1,{encoding:ke}),this.renderPass=new kr(this._scene,this._camera),this.renderPass.renderToScreen=!1,this.setSize(r.width,r.height);const o=this,l=this.renderPass;kr.prototype.render=function(...c){if(this!==l){const u=o.isUsingRenderPass;o.isUsingRenderPass=!0,u!=o.isUsingRenderPass&&o.updateUsingRenderPass()}xd.call(this,...c)},this.makeOptionsReactive(r)}updateUsingRenderPass(){this.isUsingRenderPass?(this.ssgiPass.fullscreenMaterial.defines.useDirectLight="",this.svgf.denoisePass.fullscreenMaterial.defines.useDirectLight=""):(delete this.ssgiPass.fullscreenMaterial.defines.useDirectLight,delete this.svgf.denoisePass.fullscreenMaterial.defines.useDirectLight),this.ssgiPass.fullscreenMaterial.needsUpdate=!0,this.svgf.denoisePass.fullscreenMaterial.needsUpdate=!0}makeOptionsReactive(e){let t=!1;const n=this.ssgiPass.fullscreenMaterial.uniforms,r=Object.keys(n),s=this.svgf.svgfTemporalReprojectPass;for(const a of Object.keys(e))Object.defineProperty(this,a,{get(){return e[a]},set(o){if(!(e[a]===o&&t))switch(e[a]=o,a){case"denoiseIterations":this.svgf.denoisePass.iterations=o;break;case"denoiseDiffuse":this.svgf.denoisePass.fullscreenMaterial.uniforms.denoise.value[0]=o;break;case"denoiseSpecular":this.svgf.denoisePass.fullscreenMaterial.uniforms.denoise.value[1]=o;break;case"denoiseKernel":case"depthPhi":case"normalPhi":case"roughnessPhi":this.svgf.denoisePass.fullscreenMaterial.uniforms[a].value=o;break;case"resolutionScale":this.setSize(this.lastSize.width,this.lastSize.height),s.reset();break;case"spp":this.ssgiPass.fullscreenMaterial.fragmentShader=this.ssgiPass.defaultFragmentShader.replaceAll("spp",o),o!==1&&(this.ssgiPass.fullscreenMaterial.fragmentShader=Yc(this.ssgiPass.fullscreenMaterial.fragmentShader.replace("#pragma unroll_loop_start","").replace("#pragma unroll_loop_end",""))),this.ssgiPass.fullscreenMaterial.needsUpdate=t,s.reset();break;case"steps":case"refineSteps":this.ssgiPass.fullscreenMaterial.defines[a]=parseInt(o),this.ssgiPass.fullscreenMaterial.needsUpdate=t,s.reset();break;case"directLightMultiplier":this.ssgiPass.fullscreenMaterial.defines[a]=o.toPrecision(5),this.ssgiPass.fullscreenMaterial.needsUpdate=t,s.reset();break;case"importanceSampling":case"missedRays":case"autoThickness":o?this.ssgiPass.fullscreenMaterial.defines[a]="":delete this.ssgiPass.fullscreenMaterial.defines[a],this.ssgiPass.fullscreenMaterial.needsUpdate=t,s.reset();break;case"blend":this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.uniforms[a].value=o,s.reset();break;case"distance":n.rayDistance.value=o,s.reset();break;default:r.includes(a)&&(n[a].value=o,s.reset())}}}),this[a]=e[a];t=!0}initialize(e,...t){super.initialize(e,...t),this.ssgiPass.initialize(e,...t)}setSize(e,t,n=!1){var r;e===void 0&&t===void 0||!n&&e===this.lastSize.width&&t===this.lastSize.height&&this.resolutionScale===this.lastSize.resolutionScale||(this.ssgiPass.setSize(e,t),this.svgf.setSize(e,t),this.sceneRenderTarget.setSize(e,t),(r=this.cubeToEquirectEnvPass)==null||r.setSize(e,t),this.lastSize={width:e,height:t,resolutionScale:this.resolutionScale})}dispose(){var e;super.dispose(),this.ssgiPass.dispose(),this.svgf.dispose(),(e=this.cubeToEquirectEnvPass)==null||e.dispose(),kr.prototype.render=xd}keepEnvMapUpdated(e){const t=this.ssgiPass.fullscreenMaterial;let n=this._scene.environment;if(n){if(t.uniforms.envMapInfo.value.mapUuid!==n.uuid){n.isCubeTexture&&(this.cubeToEquirectEnvPass||(this.cubeToEquirectEnvPass=new fb),n=this.cubeToEquirectEnvPass.generateEquirectEnvMap(e,n),n.uuid=this._scene.environment.uuid),n.generateMipmaps||(n.generateMipmaps=!0,n.minFilter=To,n.magFilter=To,n.needsUpdate=!0),t.uniforms.envMapInfo.value.mapUuid=n.uuid;const r=XS(n);t.uniforms.maxEnvMapMipLevel.value=r,t.uniforms.envMapInfo.value.map=n,t.defines.USE_ENVMAP="",delete t.defines.importanceSampling,this.importanceSampling?t.uniforms.envMapInfo.value.updateFrom(n,e).then(()=>{t.defines.importanceSampling="",t.needsUpdate=!0}):t.uniforms.envMapInfo.value.map=n,this.svgf.svgfTemporalReprojectPass.reset(),t.needsUpdate=!0}}else"USE_ENVMAP"in t.defines&&(delete t.defines.USE_ENVMAP,delete t.defines.importanceSampling,t.needsUpdate=!0)}update(e,t){this.keepEnvMapUpdated(e);const n=this.isUsingRenderPass?t:this.sceneRenderTarget,r=[];if(!this.isUsingRenderPass){const a=[];for(const o of Yo(this._scene)){if(o.isScene)return;o.visible=!Zc(o),o.visible?r.push(o):a.push(o)}this.renderPass.render(e,this.sceneRenderTarget);for(const o of a)o.visible=!0;for(const o of r)o.visible=!1}this.ssgiPass.fullscreenMaterial.uniforms.directLightTexture.value=n.texture,this.svgf.denoisePass.fullscreenMaterial.uniforms.directLightTexture.value=n.texture,this.ssgiPass.render(e),this.svgf.render(e),this.uniforms.get("inputTexture").value=this.svgf.texture,this.uniforms.get("sceneTexture").value=n.texture,this.uniforms.get("depthTexture").value=this.ssgiPass.depthTexture,this.uniforms.get("toneMapping").value=e.toneMapping;for(const a of r)a.visible=!0;const s=!this.diffuseOnly&&!this.specularOnly;_d.value=s||this.diffuseOnly===!0,yd.value=s||this.specularOnly==!0,cancelAnimationFrame(this.rAF2),cancelAnimationFrame(this.rAF),cancelAnimationFrame(this.usingRenderPassRAF),this.rAF=requestAnimationFrame(()=>{this.rAF2=requestAnimationFrame(()=>{_d.value=!1,yd.value=!1})}),this.usingRenderPassRAF=requestAnimationFrame(()=>{const a=this.isUsingRenderPass;this.isUsingRenderPass=!1,a!=this.isUsingRenderPass&&this.updateUsingRenderPass()})}}zs.DefaultOptions=qr;class Db extends zs{constructor(e,t,n,r=qr){r={...qr,...r},r.specularOnly=!0,super(e,t,n,r)}}class Lb extends zs{constructor(e,t,n,r=qr){r={...qr,...r},r.diffuseOnly=!0,super(e,t,n,r)}}var Ib=`#define GLSLIFY 1
uniform sampler2D inputTexture;uniform sampler2D velocityTexture;uniform sampler2D blueNoiseTexture;uniform ivec2 blueNoiseSize;uniform vec2 texSize;uniform float intensity;uniform float jitter;uniform float deltaTime;uniform int frame;uvec4 s0,s1;ivec2 pixel;void rng_initialize(vec2 p,int frame){pixel=ivec2(p);s0=uvec4(p,uint(frame),uint(p.x)+uint(p.y));s1=uvec4(frame,frame*15843,frame*31+4566,frame*2345+58585);}void pcg4d(inout uvec4 v){v=v*1664525u+1013904223u;v.x+=v.y*v.w;v.y+=v.z*v.x;v.z+=v.x*v.y;v.w+=v.y*v.z;v=v ^(v>>16u);v.x+=v.y*v.w;v.y+=v.z*v.x;v.z+=v.x*v.y;v.w+=v.y*v.z;}ivec2 shift2(){pcg4d(s1);return(pixel+ivec2(s1.xy % 0x0fffffffu))% blueNoiseSize;}void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 velocity=textureLod(velocityTexture,vUv,0.0);if(dot(velocity.xyz,velocity.xyz)==0.0){outputColor=inputColor;return;}velocity.xy*=intensity;rng_initialize(vUv*texSize,frame);vec2 blueNoise=texelFetch(blueNoiseTexture,shift2(),0).rg-0.5;vec2 jitterOffset=jitter*velocity.xy*blueNoise;float frameSpeed=(1./100.)/deltaTime;vec2 startUv=vUv+(jitterOffset-velocity.xy*0.5)*frameSpeed;vec2 endUv=vUv+(jitterOffset+velocity.xy*0.5)*frameSpeed;startUv=max(vec2(0.),startUv);endUv=min(vec2(1.),endUv);vec3 motionBlurredColor;for(float i=0.0;i<=samplesFloat;i++){vec2 reprojectedUv=mix(startUv,endUv,i/samplesFloat);vec3 neighborColor=textureLod(inputTexture,reprojectedUv,0.0).rgb;motionBlurredColor+=neighborColor;}motionBlurredColor/=samplesFloat;outputColor=vec4(motionBlurredColor,inputColor.a);}`;const wd={intensity:1,jitter:1,samples:16};class Ub extends Ia{constructor(e,t=wd){t={...wd,...t},super("MotionBlurEffect",Ib,{type:"MotionBlurMaterial",uniforms:new Map([["inputTexture",new K(null)],["velocityTexture",new K(e.texture)],["blueNoiseTexture",new K(null)],["blueNoiseSize",new K(new ye)],["texSize",new K(new ye)],["intensity",new K(1)],["jitter",new K(1)],["frame",new K(0)],["deltaTime",new K(0)]]),defines:new Map([["samples",t.samples.toFixed(0)],["samplesFloat",t.samples.toFixed(0)+".0"]])}),this.pointsIndex=0,this.makeOptionsReactive(t)}makeOptionsReactive(e){for(const t of Object.keys(e))Object.defineProperty(this,t,{get(){return e[t]},set(n){switch(e[t]=n,t){case"intensity":case"jitter":this.uniforms.get(t).value=n;break}}}),this[t]=e[t]}initialize(e,...t){super.initialize(e,...t),new Zr().load(ep,n=>{n.minFilter=et,n.magFilter=et,n.wrapS=mn,n.wrapT=mn,n.encoding=vn,this.uniforms.get("blueNoiseTexture").value=n})}update(e,t,n){this.uniforms.get("inputTexture").value=t.texture,this.uniforms.get("deltaTime").value=Math.max(1/1e3,n);const r=e.info.render.frame%65536;this.uniforms.get("frame").value=r,this.uniforms.get("texSize").value.set(window.innerWidth,window.innerHeight);const s=this.uniforms.get("blueNoiseTexture").value;if(s){const{width:a,height:o}=s.source.data;this.uniforms.get("blueNoiseSize").value.set(a,o)}}}const Nb=`
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
`,Ob=`
#define MAX_BONES 64
                    
${Ve.skinning_pars_vertex}
${Nb}

uniform mat4 velocityMatrix;
uniform mat4 prevVelocityMatrix;
varying vec4 prevPosition;
varying vec4 newPosition;

#ifdef renderDepthNormal
varying vec2 vHighPrecisionZW;
#endif
`,Fb=`
// Get the current vertex position
transformed = vec3( position );
${Ve.skinning_vertex}
newPosition = velocityMatrix * vec4( transformed, 1.0 );

// Get the previous vertex position
transformed = vec3( position );
${Ve.skinbase_vertex.replace(/mat4 /g,"").replace(/getBoneMatrix/g,"getPrevBoneMatrix")}
${Ve.skinning_vertex.replace(/vec4 /g,"")}
prevPosition = prevVelocityMatrix * vec4( transformed, 1.0 );

gl_Position = newPosition;

#ifdef renderDepthNormal
vHighPrecisionZW = gl_Position.zw;
#endif
`,Bb=`
varying vec4 prevPosition;
varying vec4 newPosition;

#ifdef renderDepthNormal
varying vec2 vHighPrecisionZW;
#endif
`,zb=`
vec2 pos0 = (prevPosition.xy / prevPosition.w) * 0.5 + 0.5;
vec2 pos1 = (newPosition.xy / newPosition.w) * 0.5 + 0.5;

vec2 vel = pos1 - pos0;

#ifdef renderDepthNormal
float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
#endif

gl_FragColor = vec4(vel.x, vel.y, 0., 0.);
`,kb={prevVelocityMatrix:{value:new Le},velocityMatrix:{value:new Le},prevBoneTexture:{value:null},boneTexture:{value:null},normalMap:{value:null},normalScale:{value:new ye},uvTransform:{value:new Qe}};class Hb extends At{constructor(){super({uniforms:Wr.clone(kb),glslVersion:hr,vertexShader:`
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
					
                    ${Ob}
        
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

						${Fb}

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

					${Bb}
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

						${zb.replaceAll("gl_FragColor","gVelocity")}
						vec3 worldNormal = normalize((vec4(normal, 1.) * viewMatrix).xyz);
						gVelocity.ba = Encode(worldNormal);

						#ifdef renderDepthNormal
						gDepth = packDepthToRGBA(fragCoordZ);
						#endif
                    }`}),this.isVelocityMaterial=!0}}const Gb=new Re(0),Vb=new ye,Md=new Le,Sd=new Le;class Wb extends jt{constructor(e,t,n=!0){if(super("velocityDepthNormalPass"),this.cachedMaterials=new WeakMap,this.visibleMeshes=[],this.needsSwap=!1,!(t instanceof xt))throw new Error(this.constructor.name+" doesn't support cameras of type '"+t.constructor.name+"' yet. Only cameras of type 'PerspectiveCamera' are supported.");this._scene=e,this._camera=t;const r=n?2:1;this.renderTarget=new Vr(1,1,r,{minFilter:et,magFilter:et}),this.renderTarget.depthTexture=new pr(1,1),this.renderTarget.depthTexture.type=lt,n&&(this.renderTarget.texture[0].type=sn,this.renderTarget.texture[0].needsUpdate=!0,this.renderTarget.texture[1].type=lt,this.renderTarget.texture[1].needsUpdate=!0),this.renderDepthNormal=n}setVelocityDepthNormalMaterialInScene(){this.visibleMeshes=Yo(this._scene);for(const t of this.visibleMeshes){const n=t.material;let[r,s]=this.cachedMaterials.get(t)||[];if(n!==r){var e;s=new Hb,$f(n,s),t.material=s,(e=t.skeleton)!=null&&e.boneTexture&&Zf(t),this.cachedMaterials.set(t,[n,s])}t.material=s,t.visible=Zc(t,n),this.renderDepthNormal&&(s.defines.renderDepthNormal="");const a=n.map||n.normalMap||n.roughnessMap||n.metalnessMap;a&&(s.uniforms.uvTransform.value=a.matrix),qS(t,this._camera)}}unsetVelocityDepthNormalMaterialInScene(){for(const e of this.visibleMeshes)e.visible=!0,YS(e,this._camera),e.material=this.cachedMaterials.get(e)[0]}setSize(e,t){var n;this.renderTarget.setSize(e,t),(n=this.lastDepthTexture)==null||n.dispose(),this.lastDepthTexture=new O_(e,t,tn),this.lastDepthTexture.minFilter=et,this.lastDepthTexture.magFilter=et}dispose(){super.dispose(),this.renderTarget.dispose()}get texture(){return Array.isArray(this.renderTarget.texture)?this.renderTarget.texture[1]:this.renderTarget.texture}get depthTexture(){return this.renderTarget.texture[0]}render(e){Md.copy(this._camera.projectionMatrix),Sd.copy(this._camera.projectionMatrixInverse),this._camera.view&&(this._camera.view.enabled=!1),this._camera.updateProjectionMatrix(),this._camera.updateMatrixWorld(),this.setVelocityDepthNormalMaterialInScene();const{background:t}=this._scene;this._scene.background=Gb,e.setRenderTarget(this.renderTarget),e.copyFramebufferToTexture(Vb,this.lastDepthTexture),e.render(this._scene,this._camera),this._scene.background=t,this.unsetVelocityDepthNormalMaterialInScene(),this._camera.view&&(this._camera.view.enabled=!0),this._camera.projectionMatrix.copy(Md),this._camera.projectionMatrixInverse.copy(Sd)}}class jb{constructor(e,t,n=zs.DefaultOptions){const r=e.addFolder("SSGIDebugGUI");r.open(),this.pane=r,r.onChange(u=>{const{property:h,value:d}=u;t[h]=d}),n={...zs.DefaultOptions,...n};const s=r.addFolder("General");s.add(n,"distance",.001,10,.01),s.add(n,"autoThickness"),s.add(n,"thickness",0,5,.01),s.add(n,"maxRoughness",0,1,.01),s.add(n,"envBlur",0,1,.01),s.add(n,"importanceSampling"),s.add(n,"maxEnvLuminance",0,100,1),r.addFolder("Temporal Resolve").add(n,"blend",0,1,.001);const o=r.addFolder("Denoise");o.add(n,"denoiseIterations",0,5,1),o.add(n,"denoiseKernel",1,5,1),o.add(n,"denoiseDiffuse",0,50,.01),o.add(n,"denoiseSpecular",0,50,.01),o.add(n,"depthPhi",0,15,.001),o.add(n,"normalPhi",0,50,.001),o.add(n,"roughnessPhi",0,100,.001);const l=r.addFolder("Tracing");l.add(n,"steps",0,256,1),l.add(n,"refineSteps",0,16,1),l.add(n,"spp",1,32,1),l.add(n,"missedRays"),r.addFolder("Resolution").add(n,"resolutionScale",.25,1,.25)}}async function Xb(i){const e={gi:"SSGI",AA:"FXAA",motionBlur:!0,bloom:!0,postprocessingEnabled:!0,groundProjection:!0},t=new Hn,n=new xt(35,window.innerWidth/window.innerHeight,.5,200);t.add(n);const r=new Ua(t);r.useFullFloat(),r.setEnvType("HDRI"),r.setBGType("GroundProjection"),r.updateAll(),r.addGui(i).open();const s=document.createElement("canvas");document.body.appendChild(s),s.style.left=0,s.style.top=0,s.style.position="fixed";const a=document.createElement("div");a.id="orbitControlsDomElem",a.style.position="absolute",a.style.left=0,a.style.top=0,a.style.width="100vw",a.style.height="100vh",a.style.opacity=0,a.style.cursor="grab",document.body.appendChild(a);let o=s;const l=new Xi({canvas:o,powerPreference:"high-performance",premultipliedAlpha:!1,stencil:!1,antialias:!1,alpha:!1,preserveDrawingBuffer:!0});l.autoClear=!1,l.outputEncoding=ke,l.setSize(window.innerWidth,window.innerHeight);const c=new _r(n,document.querySelector("#orbitControlsDomElem"));c.enableDamping=!0,n.position.set(5,3,5),c.target.set(0,.1,0),c.maxPolarAngle=Math.PI/2,c.minDistance=.1;const u=new Vf(l),h=new gr;document.body.appendChild(h.dom);const d=()=>{n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),u.setSize(window.innerWidth,window.innerHeight)},p=new vr,v=new xr;v.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/"),p.setDRACOLoader(v);let x=kn.porsche_1975.url;const m=await p.loadAsync(x);t.add(m.scene),m.scene.traverse(J=>{J.isMesh&&(J.castShadow=J.receiveShadow=!0,J.material.depthWrite=!0)});const f={distance:3,thickness:3,autoThickness:!1,maxRoughness:1,blend:.95,denoiseIterations:3,denoiseKernel:3,denoiseDiffuse:25,denoiseSpecular:25.54,depthPhi:5,normalPhi:28,roughnessPhi:18.75,envBlur:.55,importanceSampling:!0,directLightMultiplier:1,maxEnvLuminance:50,steps:20,refineSteps:4,spp:1,resolutionScale:1,missedRays:!1},M=new Wb(t,n),_=new jf({intensity:1,mipmapBlur:!0,luminanceSmoothing:.75,luminanceThreshold:.75,kernelSize:jo.MEDIUM}),y=new kr(t,n),S=new zs(t,n,M,f),E=new Cr(n,S),R=new Cr(n,new Lb(t,n,M,f)),P=new Cr(n,new Db(t,n,M,f)),w=new Ub(M),T=new Qf(t,n,M);new Cr(n,T);const N=new IS,F=new Cr(n,N),U=()=>{u.removeAllPasses(),u.addPass(M);const J=[];switch(e.gi){case"SSGI":{u.addPass(E);break}case"SSGDI":{u.addPass(R);break}case"SSR":{u.addPass(P);break}default:{u.addPass(y);break}}switch(e.bloom&&J.push(_),e.AA){case"TRAA":J.push(T);break;case"FXAA":u.addPass(F);break}e.motionBlur&&J.push(w),J.length&&u.addPass(new Cr(n,...J)),z()},z=()=>{let J=`ALL Passes:
`;for(const[be,ae]of u.passes.entries()){if(J+=`${be}: ${ae.name}
`,ae.name==="EffectPass")for(const Z of ae.effects)J+=" -"+Z.name+`
`;J+=`
`}console.log(J)},k=["SSGI","SSGDI","SSR","DEFAULT"],ee=["NONE","TRAA","FXAA"],$=i.addFolder("Post");$.open(),$.add(e,"postprocessingEnabled"),$.add(e,"gi",k).onChange(U),$.add(e,"motionBlur").onChange(U),$.add(e,"bloom").onChange(U),$.add(e,"AA",ee).onChange(U),new jb($,S,f),U(),d();const Y=new _e(new Bo(5,32),new gn({color:1118481,roughness:.1,metalness:0}));Y.rotateX(-Math.PI/2),Y.name="floor",Y.receiveShadow=!0,Y.position.set(0,.001,0),t.add(Y);const ne=()=>{h.begin(),c.update(),e.postprocessingEnabled?u.render():(l.clear(),l.render(t,n)),h.end(),window.requestAnimationFrame(ne)};window.addEventListener("resize",d),document.addEventListener("keydown",J=>{if(J.code==="KeyQ"&&(e.postprocessingEnabled=!e.postprocessingEnabled),J.code==="KeyP"){const be=l.domElement.toDataURL(),ae=document.createElement("a");ae.href=be,ae.download="screenshot-"+qb()+".png",ae.click()}}),ne()}function qb(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,i=>(i^crypto.getRandomValues(new Uint8Array(1))[0]&15>>i/4).toString(16))}const Yb=""+new URL("rgh-2031a231.jpg",import.meta.url).href,Zb=""+new URL("paper_normal-0e49083f.jpg",import.meta.url).href,bd={rgh:Yb,paper_normal:Zb};let wc,Rn,bn,Nr,fi,Do,Mc=new ye;const pa=new nn,Td=new Zr,tp=new vr,np=new xr;let $n;np.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");tp.setDRACOLoader(np);const Ed=new mr,ws=[];let ip=()=>{},jl;async function Kb(i){Do=i,jl=Do.addFolder("Scene"),wc=new gr,app.appendChild(wc.dom),Rn=new Xi({antialias:!0}),Rn.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),Rn.setSize(window.innerWidth,window.innerHeight),Rn.shadowMap.enabled=!0,Rn.shadowMap.type=ti,Rn.outputEncoding=ke,Rn.toneMapping=fr,app.appendChild(Rn.domElement),bn=new xt(50,window.innerWidth/window.innerHeight,.1,200),bn.position.set(6,3,6),bn.name="Camera",bn.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),Nr=new Hn,Nr.add(pa),fi=new _r(bn,Rn.domElement),fi.enableDamping=!0,fi.dampingFactor=.05,fi.minDistance=.1,fi.maxDistance=100,fi.maxPolarAngle=Math.PI/1.5,fi.target.set(0,0,0),fi.target.set(0,0,0),$n=new Kr(bn,Rn.domElement),$n.addEventListener("dragging-changed",n=>{fi.enabled=!n.value,n.value}),$n.addEventListener("change",()=>{$n.object&&$n.object.position.y<0&&($n.object.position.y=0)}),Nr.add($n),window.addEventListener("resize",$b),document.addEventListener("pointermove",Ad);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",n=>{Date.now()-e<200&&(Ad(n),Qb())}),jl.add($n,"mode",["translate","rotate","scale"]);const t=new Ua(Nr);t.preset=dr.dancing_hall,t.setEnvType("HDRI"),t.setBGType("GroundProjection"),t.updateAll(),t.addGui(jl),await e1(),rp()}function $b(){bn.aspect=window.innerWidth/window.innerHeight,bn.updateProjectionMatrix(),Rn.setSize(window.innerWidth,window.innerHeight)}function Jb(){wc.update(),La(),fi.update(),ip(),Rn.render(Nr,bn)}function rp(){requestAnimationFrame(rp),Jb()}function Qb(){if(Ed.setFromCamera(Mc,bn),Ed.intersectObject(pa,!0,ws),!ws.length){$n.detach();return}ws[0].object.selectOnRaycast?$n.attach(ws[0].object.selectOnRaycast):$n.attach(ws[0].object),ws.length=0}function Ad(i){Mc.x=i.clientX/window.innerWidth*2-1,Mc.y=-(i.clientY/window.innerHeight)*2+1}async function e1(){const i=new _e(new jr(.5).translate(0,.5,0),new gn({color:Pd(),roughness:0,metalness:1}));i.name="sphere",i.castShadow=!0,i.receiveShadow=!0,i.position.set(2,0,-1.5),pa.add(i);const e=new _e(new Dt(1,1,1).translate(0,.5,0),new gn({color:Pd(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),pa.add(e);const n=(await tp.loadAsync(kn.porsche_1975.url)).scene;n.name="car",n.traverse(a=>{a.isMesh&&(a.castShadow=!0,a.receiveShadow=!0,a.selectOnRaycast=n,a.name)}),pa.add(n);const r={FL:null,FR:null,R:null,steerL:null,steerR:null,steerVal:0};r.R=n.getObjectByName("wheels_rear"),r.steerL=n.getObjectByName("wheel_L"),r.steerR=n.getObjectByName("wheel_R");const s=Nt.degToRad(30);new zr(r).to({steerVal:1},3e3).easing(ii.Elastic.Out).delay(3e3).repeatDelay(5e3).repeat(1e4).yoyo(!0).onUpdate(()=>{const a=Nt.mapLinear(r.steerVal,0,1,-s,s);r.steerL.rotation.y=a,r.steerR.rotation.y=a}).start(),t1()}async function t1(){const i={resolution:1024,blurX:1024,blurY:1024,depthScale:1};let e=1,t=5,n=0,r=1,s=.25,a=0,o=.25,l=1,c=0,u=.6,h=1,d=new Re("#151515");const p=Rn;let v=i.blurX+i.blurY>0;const x=new Bi,m=new L,f=new L,M=new L,_=new Le,y=new L(0,0,-1),S=new ot,E=new L,R=new L,P=new ot,w=new Le,T=new xt,N=ve=>{if(f.setFromMatrixPosition(ve.matrixWorld),M.setFromMatrixPosition(bn.matrixWorld),_.extractRotation(ve.matrixWorld),m.set(0,0,1),m.applyMatrix4(_),f.addScaledVector(m,c),E.subVectors(f,M),E.dot(m)>0)return;E.reflect(m).negate(),E.add(f),_.extractRotation(bn.matrixWorld),y.set(0,0,-1),y.applyMatrix4(_),y.add(M),R.subVectors(f,y),R.reflect(m).negate(),R.add(f),T.position.copy(E),T.up.set(0,1,0),T.up.applyMatrix4(_),T.up.reflect(m),T.lookAt(R),T.far=bn.far,T.updateMatrixWorld(),T.projectionMatrix.copy(bn.projectionMatrix),w.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),w.multiply(T.projectionMatrix),w.multiply(T.matrixWorldInverse),w.multiply(ve.matrixWorld),x.setFromNormalAndCoplanarPoint(m,f),x.applyMatrix4(T.matrixWorldInverse),S.set(x.normal.x,x.normal.y,x.normal.z,x.constant);const ue=T.projectionMatrix;P.x=(Math.sign(S.x)+ue.elements[8])/ue.elements[0],P.y=(Math.sign(S.y)+ue.elements[9])/ue.elements[5],P.z=-1,P.w=(1+ue.elements[10])/ue.elements[14],S.multiplyScalar(2/S.dot(P)),ue.elements[2]=S.x,ue.elements[6]=S.y,ue.elements[10]=S.z+1,ue.elements[14]=S.w};function F(){const ve={minFilter:Ue,magFilter:Ue,encoding:p.outputEncoding,type:_t},ue=new ct(i.resolution,i.resolution,ve);ue.depthBuffer=!0,ue.depthTexture=new pr(i.resolution,i.resolution),ue.depthTexture.format=yi,ue.depthTexture.type=Ta;const He=new ct(i.resolution,i.resolution,ve),Ke=new fw({gl:p,resolution:i.resolution,width:i.blurX,height:i.blurY,minDepthThreshold:n,maxDepthThreshold:r,depthScale:i.depthScale,depthToBlurRatioBias:s});console.log(Ke);const Be={mirror:a,textureMatrix:w,mixBlur:e,tDiffuse:ue.texture,tDepth:ue.depthTexture,tDiffuseBlur:He.texture,hasBlur:v,mixStrength:t,minDepthThreshold:n,maxDepthThreshold:r,depthScale:i.depthScale,depthToBlurRatioBias:s,distortion:o,mixContrast:l,metalness:u,roughness:h,color:d},Xe={"defines-USE_BLUR":v?"":void 0,"defines-USE_DEPTH":i.depthScale>0?"":void 0,"defines-USE_DISTORTION":void 0};return console.log({fbo1:ue,fbo2:He,blurpass:Ke,reflectorProps:Be,defines:Xe}),[ue,He,Ke,Be,Xe]}let[U,z,k,ee,$]=F();function Y(){U.dispose(),z.dispose(),k.renderTargetA.dispose(),k.renderTargetB.dispose(),k.convolutionMaterial.dispose(),v=i.blurX+i.blurY>0,[U,z,k,ee,$]=F(),J.reflector.dispose(),J.reflector=new Ol(ee),J.reflector.defines.USE_BLUR=$["defines-USE_BLUR"],J.reflector.defines.USE_DEPTH=$["defines-USE_DEPTH"],J.reflector.defines.USE_DISTORTION=$["defines-USE_DISTORTION"],ae=J.reflector,ne(),pe.materialType instanceof Ol&&(pe.materialType=J.reflector,he.material=pe.materialType)}function ne(){pe.useRoughnessMap?(ae.roughnessMap=Z,be.roughnessMap=Z):(ae.roughnessMap=null,be.roughnessMap=null),pe.useDistortionMap?ae.distortionMap=Z:ae.distortionMap=null,pe.useNormalMap?(ae.normalMap=re,be.normalMap=re):(ae.normalMap=null,be.normalMap=null),ae.needsUpdate=!0,be.needsUpdate=!0}const J={standard:new gn({roughness:h}),reflector:new Ol(ee)},be=J.standard;let ae=J.reflector;ae.defines.USE_BLUR=$["defines-USE_BLUR"],ae.defines.USE_DEPTH=$["defines-USE_DEPTH"],ae.defines.USE_DISTORTION=$["defines-USE_DISTORTION"];const Z=await Td.loadAsync(bd.rgh);Z.wrapS=mn,Z.wrapT=mn;const re=await Td.loadAsync(bd.paper_normal);re.wrapS=mn,re.wrapT=mn,re.repeat.set(5,5),Z.repeat.set(5,5),be.roughnessMap=Z,be.color.set(d);const pe={materialType:J.reflector,useRoughnessMap:!1,useDistortionMap:!1,useNormalMap:!1,normalScale:1,repeat:5},he=new _e(new Bo(5,32),pe.materialType);he.rotateX(-Math.PI/2),he.name="floor",he.receiveShadow=!0,he.position.set(0,.001,0),Nr.add(he),console.log({reflectorProps:ee,material:ae}),Do.add(pe,"materialType",J).onChange(ve=>{he.material=ve});const j=Do.addFolder("MeshReflectorMaterial");j.open(),j.add(i,"resolution",128,2048,128).name("⚠ Resolution").onChange(Y),j.add(i,"blurX",16,2048,128).name("⚠ Blur X").onChange(Y),j.add(i,"blurY",16,2048,128).name("⚠ Blur Y").onChange(Y),j.add(i,"depthScale",0,10).name("⚠ DEPTH SCALE").onChange(Y),j.add(pe,"useRoughnessMap").onChange(ne),j.add(pe,"useDistortionMap").onChange(ne),j.add(pe,"useNormalMap").onChange(ne),j.addColor(ae,"color").onChange(()=>{be.color.copy(ae.color)}),j.add(pe,"normalScale",0,1).onChange(ve=>{ae.normalScale.setScalar(ve),be.normalScale.setScalar(ve)}),j.add(pe,"repeat",1,15,1).onChange(ve=>{Z.repeat.setScalar(ve),re.repeat.setScalar(ve)}),j.add(ae,"mixStrength",0,15),j.add(ae,"mixBlur",0,6),j.add(ae,"mixContrast",0,5),j.add(ae,"metalness",0,1),j.add(ae,"roughness",0,1),j.add(ae,"distortion",-2,2);const Fe=he;ip=()=>{Fe.visible=!1;const ve=p.xr.enabled,ue=p.shadowMap.autoUpdate;N(Fe),p.xr.enabled=!1,p.shadowMap.autoUpdate=!1,p.setRenderTarget(U),p.state.buffers.depth.setMask(!0),p.autoClear||p.clear(),p.render(Nr,T),v&&k.render(p,U,z),p.xr.enabled=ve,p.shadowMap.autoUpdate=ue,Fe.visible=!0,p.setRenderTarget(null)}}const n1=new Re;function Pd(){return"#"+n1.setHSL(Math.random(),.5,.5).getHexString()}let Sc,yn,vi,Or,Ni,bc,Tc=new ye;const Kc=new nn,sp=new vr,ap=new xr;let Jn;ap.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");sp.setDRACOLoader(ap);const Cd=new mr,Ms=[];let op=()=>{},Xl;async function i1(i){bc=i,Xl=bc.addFolder("Scene"),Sc=new gr,app.appendChild(Sc.dom),yn=new Xi({antialias:!0}),yn.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),yn.setSize(window.innerWidth,window.innerHeight),yn.shadowMap.enabled=!0,yn.shadowMap.type=ti,yn.outputEncoding=ke,yn.toneMapping=fr,app.appendChild(yn.domElement),vi=new xt(50,window.innerWidth/window.innerHeight,.1,200),vi.position.set(2,2,2),vi.name="Camera",Or=new Hn,Or.add(Kc),Ni=new _r(vi,yn.domElement),Ni.enableDamping=!0,Ni.dampingFactor=.05,Ni.minDistance=.1,Ni.maxDistance=100,Ni.maxPolarAngle=Math.PI/1.5,Ni.target.set(0,.5,0),Jn=new Kr(vi,yn.domElement),Jn.addEventListener("dragging-changed",n=>{Ni.enabled=!n.value,n.value}),Jn.addEventListener("change",()=>{Jn.object&&Jn.object.position.y<0&&(Jn.object.position.y=0)}),Or.add(Jn),window.addEventListener("resize",r1),document.addEventListener("pointermove",Rd);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",n=>{Date.now()-e<200&&(Rd(n),a1())}),Xl.add(Jn,"mode",["translate","rotate","scale"]);const t=new Ua(Or);t.setBGType("GroundProjection"),t.setEnvType("HDRI"),t.updateAll(),t.addGui(Xl),await o1(),lp()}function r1(){vi.aspect=window.innerWidth/window.innerHeight,vi.updateProjectionMatrix(),yn.setSize(window.innerWidth,window.innerHeight)}function s1(){Sc.update(),Ni.update(),op(),yn.render(Or,vi)}function lp(){requestAnimationFrame(lp),s1()}function a1(){if(Cd.setFromCamera(Tc,vi),Cd.intersectObject(Kc,!0,Ms),!Ms.length){Jn.detach();return}Ms[0].object.selectOnRaycast?Jn.attach(Ms[0].object.selectOnRaycast):Jn.attach(Ms[0].object),Ms.length=0}function Rd(i){Tc.x=i.clientX/window.innerWidth*2-1,Tc.y=-(i.clientY/window.innerHeight)*2+1}async function o1(){const i={customBackground:Or.background,backside:!0,thickness:1,backsideThickness:.5},t=(await sp.loadAsync(kn.monkey.url)).scene,n=new Ef,r=new Af(6,!1),s=[];t.traverse(v=>{v.isMesh&&(v.castShadow=!0,v.receiveShadow=!0,v.selectOnRaycast=t,v.material=r,s.push(v))}),Kc.add(t),l1(bc,r,i);const a=new ct(512,512,{minFilter:Ue,magFilter:Ue,encoding:yn.outputEncoding,type:_t}),o=new ct(512,512,{minFilter:Ue,magFilter:Ue,encoding:yn.outputEncoding,type:_t}),l=r;l.buffer=o.texture;let c,u,h;const d={gl:yn,scene:Or,camera:vi},p=new Go(!0);op=()=>{l.time=p.getElapsedTime();for(const v of s){const x=v;l.buffer===o.texture&&(u=d.gl.toneMapping,c=d.scene.background,h=x.material.side,d.gl.toneMapping=zn,i.background&&(d.scene.background=i.background),x.material=n,i.backside&&(d.gl.setRenderTarget(a),d.gl.render(d.scene,d.camera),x.material=l,x.material.buffer=a.texture,x.material.thickness=i.backsideThickness,x.material.side=Ot),d.gl.setRenderTarget(o),d.gl.render(d.scene,d.camera),x.material.thickness=i.thickness,x.material.side=h,x.material.buffer=o.texture,d.scene.background=c,d.gl.setRenderTarget(null),x.material=l,d.gl.toneMapping=u)}}}function l1(i,e,t){const n=i.addFolder("Transmission Material");n.open(),n.add(t,"backside"),n.add(t,"thickness",0,2),n.add(t,"backsideThickness",0,2),n.addColor(e,"color"),n.add(e,"roughness",0,1),n.add(e,"chromaticAberration",0,2),n.add(e,"distortion",0,10),n.add(e,"temporalDistortion",0,1),n.add(e,"anisotropy",0,10),n.add(e,"reflectivity",0,1),n.addColor(e,"attenuationColor"),n.add(e,"attenuationDistance",0,2)}function Dd(i=ri){const e={value:new Le};return Object.assign(new F_({side:i}),{viewMatrix:e,onBeforeCompile:t=>{t.uniforms.viewMatrix=e,t.fragmentShader=`vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
             return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
           }
`+t.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
             normal = inverseTransformDirection( normal, viewMatrix );
`)}})}const c1=Wo({causticsTexture:null,causticsTextureB:null,color:new Re,lightProjMatrix:new Le,lightViewMatrix:new Le},`varying vec3 vWorldPosition;   
     void main() {
       gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
       vec4 worldPosition = modelMatrix * vec4(position, 1.);
       vWorldPosition = worldPosition.xyz;
     }`,`varying vec3 vWorldPosition;
    uniform vec3 color;
    uniform sampler2D causticsTexture; 
    uniform sampler2D causticsTextureB; 
    uniform mat4 lightProjMatrix;
    uniform mat4 lightViewMatrix;
     void main() {
      // Apply caustics  
      vec4 lightSpacePos = lightProjMatrix * lightViewMatrix * vec4(vWorldPosition, 1.0);
      lightSpacePos.xyz /= lightSpacePos.w;
      lightSpacePos.xyz = lightSpacePos.xyz * 0.5 + 0.5; 
      vec3 front = texture2D(causticsTexture, lightSpacePos.xy).rgb;
      vec3 back = texture2D(causticsTextureB, lightSpacePos.xy).rgb;
      gl_FragColor = vec4((front + back) * color, 1.0);
      #include <tonemapping_fragment>
      #include <encodings_fragment>
     }`),u1=Wo({cameraMatrixWorld:new Le,cameraProjectionMatrixInv:new Le,normalTexture:null,depthTexture:null,lightDir:new L(0,1,0),lightPlaneNormal:new L(0,1,0),lightPlaneConstant:0,near:.1,far:100,modelMatrix:new Le,worldRadius:1/40,ior:1.1,bounces:0,resolution:1024,size:10,intensity:.5},`
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,`  
    uniform mat4 cameraMatrixWorld;
    uniform mat4 cameraProjectionMatrixInv;
    uniform vec3 lightDir;
    uniform vec3 lightPlaneNormal;
    uniform float lightPlaneConstant;
    uniform float near;
    uniform float far;
    uniform float time;
    uniform float worldRadius;
    uniform float resolution;
    uniform float size;
    uniform float intensity;
    uniform float ior;
    precision highp isampler2D;
    precision highp usampler2D;
    uniform sampler2D normalTexture;
    uniform sampler2D depthTexture;
    uniform float bounces;
    varying vec2 vUv;
    vec3 WorldPosFromDepth(float depth, vec2 coord) {
      float z = depth * 2.0 - 1.0;
      vec4 clipSpacePosition = vec4(coord * 2.0 - 1.0, z, 1.0);
      vec4 viewSpacePosition = cameraProjectionMatrixInv * clipSpacePosition;
      // Perspective division
      viewSpacePosition /= viewSpacePosition.w;
      vec4 worldSpacePosition = cameraMatrixWorld * viewSpacePosition;
      return worldSpacePosition.xyz;
    }                  
    float sdPlane( vec3 p, vec3 n, float h ) {
      // n must be normalized
      return dot(p,n) + h;
    }
    float planeIntersect( vec3 ro, vec3 rd, vec4 p ) {
      return -(dot(ro,p.xyz)+p.w)/dot(rd,p.xyz);
    }
    vec3 totalInternalReflection(vec3 ro, vec3 rd, vec3 pos, vec3 normal, float ior, out vec3 rayOrigin, out vec3 rayDirection) {
      rayOrigin = ro;
      rayDirection = rd;
      rayDirection = refract(rayDirection, normal, 1.0 / ior);
      rayOrigin = pos + rayDirection * 0.1;
      return rayDirection;
    }
    void main() {
      // Each sample consists of random offset in the x and y direction
      float caustic = 0.0;
      float causticTexelSize = (1.0 / resolution) * size * 2.0;
      float texelsNeeded = worldRadius / causticTexelSize;
      float sampleRadius = texelsNeeded / resolution;
      float sum = 0.0;
      if (texture2D(depthTexture, vUv).x == 1.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
      }
      vec2 offset1 = vec2(-0.5, -0.5);//vec2(rand() - 0.5, rand() - 0.5);
      vec2 offset2 = vec2(-0.5, 0.5);//vec2(rand() - 0.5, rand() - 0.5);
      vec2 offset3 = vec2(0.5, 0.5);//vec2(rand() - 0.5, rand() - 0.5);
      vec2 offset4 = vec2(0.5, -0.5);//vec2(rand() - 0.5, rand() - 0.5);
      vec2 uv1 = vUv + offset1 * sampleRadius;
      vec2 uv2 = vUv + offset2 * sampleRadius;
      vec2 uv3 = vUv + offset3 * sampleRadius;
      vec2 uv4 = vUv + offset4 * sampleRadius;
      vec3 normal1 = texture2D(normalTexture, uv1, -10.0).rgb * 2.0 - 1.0;
      vec3 normal2 = texture2D(normalTexture, uv2, -10.0).rgb * 2.0 - 1.0;
      vec3 normal3 = texture2D(normalTexture, uv3, -10.0).rgb * 2.0 - 1.0;
      vec3 normal4 = texture2D(normalTexture, uv4, -10.0).rgb * 2.0 - 1.0;
      float depth1 = texture2D(depthTexture, uv1, -10.0).x;
      float depth2 = texture2D(depthTexture, uv2, -10.0).x;
      float depth3 = texture2D(depthTexture, uv3, -10.0).x;
      float depth4 = texture2D(depthTexture, uv4, -10.0).x;
      // Sanity check the depths
      if (depth1 == 1.0 || depth2 == 1.0 || depth3 == 1.0 || depth4 == 1.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
      }
      vec3 pos1 = WorldPosFromDepth(depth1, uv1);
      vec3 pos2 = WorldPosFromDepth(depth2, uv2);
      vec3 pos3 = WorldPosFromDepth(depth3, uv3);
      vec3 pos4 = WorldPosFromDepth(depth4, uv4);
      vec3 originPos1 = WorldPosFromDepth(0.0, uv1);
      vec3 originPos2 = WorldPosFromDepth(0.0, uv2);
      vec3 originPos3 = WorldPosFromDepth(0.0, uv3);
      vec3 originPos4 = WorldPosFromDepth(0.0, uv4);
      vec3 endPos1, endPos2, endPos3, endPos4;
      vec3 endDir1, endDir2, endDir3, endDir4;
      totalInternalReflection(originPos1, lightDir, pos1, normal1, ior, endPos1, endDir1);
      totalInternalReflection(originPos2, lightDir, pos2, normal2, ior, endPos2, endDir2);
      totalInternalReflection(originPos3, lightDir, pos3, normal3, ior, endPos3, endDir3);
      totalInternalReflection(originPos4, lightDir, pos4, normal4, ior, endPos4, endDir4);
      float lightPosArea = length(cross(originPos2 - originPos1, originPos3 - originPos1)) + length(cross(originPos3 - originPos1, originPos4 - originPos1));
      float t1 = planeIntersect(endPos1, endDir1, vec4(lightPlaneNormal, lightPlaneConstant));
      float t2 = planeIntersect(endPos2, endDir2, vec4(lightPlaneNormal, lightPlaneConstant));
      float t3 = planeIntersect(endPos3, endDir3, vec4(lightPlaneNormal, lightPlaneConstant));
      float t4 = planeIntersect(endPos4, endDir4, vec4(lightPlaneNormal, lightPlaneConstant));
      vec3 finalPos1 = endPos1 + endDir1 * t1;
      vec3 finalPos2 = endPos2 + endDir2 * t2;
      vec3 finalPos3 = endPos3 + endDir3 * t3;
      vec3 finalPos4 = endPos4 + endDir4 * t4;
      float finalArea = length(cross(finalPos2 - finalPos1, finalPos3 - finalPos1)) + length(cross(finalPos3 - finalPos1, finalPos4 - finalPos1));
      caustic += intensity * (lightPosArea / finalArea);
      // Calculate the area of the triangle in light spaces
      gl_FragColor = vec4(vec3(max(caustic, 0.0)), 1.0);
    }`),Ld={depth:!0,minFilter:Ue,magFilter:Ue,encoding:vn,type:sn},Id={minFilter:Gi,magFilter:Ue,encoding:vn,format:tn,type:lt,generateMipmaps:!0};class h1{constructor(e){this.camera=new Pa(-1,1,1,-1,0,1),this.geometry=new ji(2,2),this.mesh=new _e(this.geometry,e)}get material(){return this.mesh.material}set material(e){this.mesh.material=e}dispose(){this.mesh.geometry.dispose()}render(e){e.render(this.mesh,this.camera)}}let Ec,Sn,ar,Ps,Oi,Fi,Ud=new ye;const Ac=new nn,Pc=new vr,cp=new xr;let mi;cp.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");Pc.setDRACOLoader(cp);new mr;let up=()=>{},ql;async function d1(i){Fi=i,ql=Fi.addFolder("Scene"),Ec=new gr,app.appendChild(Ec.dom),Sn=new Xi({antialias:!0}),Sn.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),Sn.setSize(window.innerWidth,window.innerHeight),Sn.shadowMap.enabled=!0,Sn.shadowMap.type=ti,Sn.outputEncoding=ke,Sn.toneMapping=fr,app.appendChild(Sn.domElement),ar=new xt(50,window.innerWidth/window.innerHeight,.1,200),ar.position.set(1,1,-1),ar.name="Camera",Ps=new Hn,Ps.add(Ac),Oi=new _r(ar,Sn.domElement),Oi.enableDamping=!0,Oi.dampingFactor=.05,Oi.minDistance=.1,Oi.maxDistance=100,Oi.maxPolarAngle=Math.PI/1.5,Oi.target.set(0,.5,0),mi=new Kr(ar,Sn.domElement),mi.addEventListener("dragging-changed",n=>{Oi.enabled=!n.value,n.value}),mi.addEventListener("change",()=>{mi.object&&mi.object.position.y<0&&(mi.object.position.y=0)}),Ps.add(mi),window.addEventListener("resize",f1),document.addEventListener("pointermove",Nd);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",n=>{Date.now()-e<200&&Nd(n)}),ql.add(mi,"mode",["translate","rotate","scale"]);const t=new Ua(Ps);t.setBGType("Color"),t.bgColor.set("grey"),t.setEnvType("HDRI"),t.updateAll(),t.addGui(ql),await m1(),hp()}function f1(){ar.aspect=window.innerWidth/window.innerHeight,ar.updateProjectionMatrix(),Sn.setSize(window.innerWidth,window.innerHeight)}function p1(){Ec.update(),La(),Oi.update(),up(),Sn.render(Ps,ar)}function hp(){requestAnimationFrame(hp),p1()}function Nd(i){Ud.x=i.clientX/window.innerWidth*2-1,Ud.y=-(i.clientY/window.innerHeight)*2+1}function xo(i,e,t){const n=Sn,r=i,s=e,a=t,{samples:o=0,depth:l,...c}=a;let u;return u=new ct(r,s,{minFilter:Ue,magFilter:Ue,encoding:n.outputEncoding,type:_t,...c}),l&&(u.depthTexture=new pr(r,s,lt)),u.samples=o,u}async function m1(){const i={vase:kn.vase,monkey:kn.monkey,bunny:kn.bunny};window.cModel=i.bunny;let t=(await Pc.loadAsync(cModel.url)).scene;Fi.add(window,"cModel",i).onChange(async k=>{const ee=await Pc.loadAsync(k.url);t.parent.add(ee.scene),t.removeFromParent(),t=ee.scene,n()});function n(){new zr(t.rotation).to({y:2*Math.PI}).duration(1e4).repeat(5).start()}n();const r={};t.traverse(k=>{k.isMesh&&(k.castShadow=!0,k.receiveShadow=!0,k.selectOnRaycast=t,r[k.material.uuid]=k.material,Fi.add(k.material.normalScale,"x",-1,1).name("normalVector x"),Fi.add(k.material.normalScale,"y",-1,1).name("normalVector y"))}),Ac.add(t),window.debug=!0,window.frames=1/0,window.ior=1.1,window.color=new Re("white"),window.causticsOnly=!1,window.backside=!1,window.backsideIOR=1.1,window.worldRadius=.3125/100,window.intensity=.05,window.resolution=2024,window.lightSource=[1,2,1];const s=Fi.addFolder("Caustics"),a=new nn;a.position.fromArray(lightSource),mi.attach(a),mi.addEventListener("change",()=>{a.position.toArray(lightSource)}),Ps.add(a);const o=xo(resolution,resolution,Ld),l=xo(resolution,resolution,Ld),c=xo(resolution,resolution,Id),u=xo(resolution,resolution,Id),h=Dd(),d=Dd(Ot),p=new u1,v=new h1(p);s.open(),s.addColor(window,"color"),s.add(window,"ior",0,Math.PI),s.add(window,"backside").onChange(k=>{k||u.dispose()}),s.add(window,"backsideIOR",0,Math.PI),s.add(window,"worldRadius",0,.05),s.add(window,"intensity",0,1),s.add(window,"causticsOnly");const x=new nn,m=new Pa;m.near=.01,m.far=.5;const f=new Hn,M=new _e(new ji(1,1),new c1({transparent:!0,color,causticsTexture:c.texture,causticsTextureB:u.texture,depthWrite:!1}));M.rotation.x=-Math.PI/2;const _=Sn,y=new hy(m);x.updateWorldMatrix(!1,!0),x.add(f,M),f.add(t),Ac.add(x,y);let S=0;const E=new L,R=new Oo,P=new Le,w=new Bi,T=new L,N=new L,F=new Si,U=new L,z=new L;Fi.add(t.scale,"x",.1,3,.01).name("model scale").onChange(k=>{t.scale.setScalar(k),F.getSize(z),console.log("size",z,{far:m.far})}),Fi.add(m,"near",.01,5,.01),Fi.add(m,"far",.01,5,.01).listen(),up=(k,ee)=>{var $;if(frames===1/0||S++<frames){Array.isArray(lightSource)?T.fromArray(lightSource).normalize():T.copy(x.worldToLocal(lightSource.getWorldPosition(E)).normalize()),N.copy(T).multiplyScalar(-1);let Y=[];($=f.parent)==null||$.matrixWorld.identity(),F.setFromObject(f,!0),Y.push(new L(F.min.x,F.min.y,F.min.z)),Y.push(new L(F.min.x,F.min.y,F.max.z)),Y.push(new L(F.min.x,F.max.y,F.min.z)),Y.push(new L(F.min.x,F.max.y,F.max.z)),Y.push(new L(F.max.x,F.min.y,F.min.z)),Y.push(new L(F.max.x,F.min.y,F.max.z)),Y.push(new L(F.max.x,F.max.y,F.min.z)),Y.push(new L(F.max.x,F.max.y,F.max.z));const ne=Y.map(ve=>ve.clone());F.getCenter(U),Y=Y.map(ve=>ve.clone().sub(U));const J=w.set(N,0),be=Y.map(ve=>J.projectPoint(ve,new L)),ae=be.reduce((ve,ue)=>ve.add(ue),E.set(0,0,0)).divideScalar(be.length),Z=be.map(ve=>ve.distanceTo(ae)).reduce((ve,ue)=>Math.max(ve,ue)),re=Y.map(ve=>ve.dot(T)).reduce((ve,ue)=>Math.max(ve,ue));m.position.copy(T.clone().multiplyScalar(re).add(U)),m.lookAt(f.localToWorld(U.clone())),P.lookAt(m.position,U,E.set(0,1,0)),m.left=-Z,m.right=Z,m.top=Z,m.bottom=-Z,m.far=re*2,m.updateProjectionMatrix(),m.updateMatrixWorld();const pe=ne.map(ve=>ve.add(T.clone().multiplyScalar(-ve.y/T.y))),he=pe.reduce((ve,ue)=>ve.add(ue),E.set(0,0,0)).divideScalar(pe.length),j=2*pe.map(ve=>Math.hypot(ve.x-he.x,ve.z-he.z)).reduce((ve,ue)=>Math.max(ve,ue));M.scale.setScalar(j),M.position.copy(he),debug&&(y==null||y.update()),d.viewMatrix.value=h.viewMatrix.value=m.matrixWorldInverse;const Fe=R.setFromProjectionMatrix(P.multiplyMatrices(m.projectionMatrix,m.matrixWorldInverse)).planes[4];p.cameraMatrixWorld=m.matrixWorld,p.cameraProjectionMatrixInv=m.projectionMatrixInverse,p.lightDir=N,p.lightPlaneNormal=Fe.normal,p.lightPlaneConstant=Fe.constant,p.near=m.near,p.far=m.far,p.resolution=resolution,p.size=Z,p.intensity=intensity,p.worldRadius=worldRadius,f.visible=!0,_.setRenderTarget(o),_.clear(),f.overrideMaterial=h,_.render(f,m),_.setRenderTarget(l),_.clear(),backside&&(f.overrideMaterial=d,_.render(f,m)),f.overrideMaterial=null,p.ior=ior,M.material.lightProjMatrix=m.projectionMatrix,M.material.lightViewMatrix=m.matrixWorldInverse,p.normalTexture=o.texture,p.depthTexture=o.depthTexture,_.setRenderTarget(c),_.clear(),v.render(_),p.ior=backsideIOR,p.normalTexture=l.texture,p.depthTexture=l.depthTexture,_.setRenderTarget(u),_.clear(),backside&&v.render(_),_.setRenderTarget(null),causticsOnly&&(f.visible=!1)}}}let g1=window.location.href,v1=new URL(g1);const Sa={MeshTransmissionMaterial:Ww,MeshTransmissionMaterial1:i1,PCSS:tM,SpotLight:lM,SpotLight1:OS,RealismEffects:Xb,Caustics:d1,MeshReflectionMaterial:Kb},Vi={sceneName:v1.searchParams.get("scene")||Object.keys(Sa)[0],sceneInitFunction:()=>{}};Vi.sceneName=Vi.sceneName.replace("WIP_","");function dp(i){console.log({path:i});const e=new URLSearchParams(window.location.search);e.set("scene",i),window.history.replaceState({},"",`${window.location.pathname}?${e}`),document.title=`Explore | ${i}`}const fp=new Cc({title:"Explore Drei Vanilla"+pp,closeFolders:!0});fp.add(Vi,"sceneName",Object.keys(Sa)).name("SCENE").onChange(i=>{console.log({v:i}),dp(i),window.location.reload()});Object.keys(Sa).includes(Vi.sceneName)||(Vi.sceneName=Object.keys(Sa)[0]);Vi.sceneInitFunction=Sa[Vi.sceneName];Vi.sceneInitFunction(fp);dp(Vi.sceneName);
