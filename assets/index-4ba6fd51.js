(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Bf="0.0.11";/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.18.0
 * @author George Michael Brower
 * @license MIT
 */class oi{constructor(e,t,n,r,s="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("name"),oi.nextNameID=oi.nextNameID||0,this.$name.id=`lil-gui-name-${++oi.nextNameID}`,this.$widget=document.createElement(s),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Uf extends oi{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Ml(i){let e,t;return(e=i.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const Nf={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:Ml,toHexString:Ml},$s={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},Ff={isPrimitive:!1,match:i=>Array.isArray(i),fromHexString(i,e,t=1){const n=$s.fromHexString(i);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([i,e,t],n=1){n=255/n;const r=i*n<<16^e*n<<8^t*n<<0;return $s.toHexString(r)}},Of={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,e,t=1){const n=$s.fromHexString(i);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:i,g:e,b:t},n=1){n=255/n;const r=i*n<<16^e*n<<8^t*n<<0;return $s.toHexString(r)}},zf=[Nf,$s,Ff,Of];function kf(i){return zf.find(e=>e.match(i))}class Gf extends oi{constructor(e,t,n,r){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=kf(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=Ml(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Eo extends oi{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Hf extends oi{constructor(e,t,n,r,s,a){super(e,t,n,"number"),this._initInput(),this.min(r),this.max(s);const o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let x=parseFloat(this.$input.value);isNaN(x)||(this._stepExplicit&&(x=this._snap(x)),this.setValue(this._clamp(x)))},t=x=>{const A=parseFloat(this.$input.value);isNaN(A)||(this._snapClampSetValue(A+x),this.$input.value=this.getValue())},n=x=>{x.code==="Enter"&&this.$input.blur(),x.code==="ArrowUp"&&(x.preventDefault(),t(this._step*this._arrowKeyMultiplier(x))),x.code==="ArrowDown"&&(x.preventDefault(),t(this._step*this._arrowKeyMultiplier(x)*-1))},r=x=>{this._inputFocused&&(x.preventDefault(),t(this._step*this._normalizeMouseWheel(x)))};let s=!1,a,o,l,c,u;const h=5,d=x=>{a=x.clientX,o=l=x.clientY,s=!0,c=this.getValue(),u=0,window.addEventListener("mousemove",p),window.addEventListener("mouseup",g)},p=x=>{if(s){const A=x.clientX-a,v=x.clientY-o;Math.abs(v)>h?(x.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(A)>h&&g()}if(!s){const A=x.clientY-l;u-=A*this._step*this._arrowKeyMultiplier(x),c+u>this._max?u=this._max-c:c+u<this._min&&(u=this._min-c),this._snapClampSetValue(c+u)}l=x.clientY},g=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",g)},m=()=>{this._inputFocused=!0},f=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",d),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",f)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(x,A,v,_,M)=>(x-A)/(v-A)*(M-_)+_,t=x=>{const A=this.$slider.getBoundingClientRect();let v=e(x,A.left,A.right,this._min,this._max);this._snapClampSetValue(v)},n=x=>{this._setDraggingStyle(!0),t(x.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",s)},r=x=>{t(x.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",s)};let a=!1,o,l;const c=x=>{x.preventDefault(),this._setDraggingStyle(!0),t(x.touches[0].clientX),a=!1},u=x=>{x.touches.length>1||(this._hasScrollBar?(o=x.touches[0].clientX,l=x.touches[0].clientY,a=!0):c(x),window.addEventListener("touchmove",h,{passive:!1}),window.addEventListener("touchend",d))},h=x=>{if(a){const A=x.touches[0].clientX-o,v=x.touches[0].clientY-l;Math.abs(A)>Math.abs(v)?c(x):(window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d))}else x.preventDefault(),t(x.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d)},p=this._callOnFinishChange.bind(this),g=400;let m;const f=x=>{if(Math.abs(x.deltaX)<Math.abs(x.deltaY)&&this._hasScrollBar)return;x.preventDefault();const v=this._normalizeMouseWheel(x)*this._step;this._snapClampSetValue(this.getValue()+v),this.$input.value=this.getValue(),clearTimeout(m),m=setTimeout(p,g)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",f,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Vf extends oi{constructor(e,t,n,r){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(r)?r:Object.values(r),this._names=Array.isArray(r)?r:Object.keys(r),this._names.forEach(s=>{const a=document.createElement("option");a.innerHTML=s,this.$select.appendChild(a)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.innerHTML=t===-1?e:this._names[t],this}}class Wf extends oi{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const jf=`.lil-gui {
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
}`;function Xf(i){const e=document.createElement("style");e.innerHTML=i;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let Ac=!1;class ec{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:r,title:s="Controls",closeFolders:a=!1,injectStyles:o=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",c=>{(c.code==="Enter"||c.code==="Space")&&(c.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),l&&this.domElement.classList.add("allow-touch-styles"),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),!Ac&&o&&(Xf(jf),Ac=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=a,this.domElement.addEventListener("keydown",c=>c.stopPropagation()),this.domElement.addEventListener("keyup",c=>c.stopPropagation())}add(e,t,n,r,s){if(Object(n)===n)return new Vf(this,e,t,n);const a=e[t];switch(typeof a){case"number":return new Hf(this,e,t,n,r,s);case"boolean":return new Uf(this,e,t);case"string":return new Wf(this,e,t);case"function":return new Eo(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,a)}addColor(e,t,n=1){return new Gf(this,e,t,n)}addFolder(e){const t=new ec({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof Eo||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof Eo)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}var Gs=function(){var i=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(u){u.preventDefault(),n(++i%e.children.length)},!1);function t(u){return e.appendChild(u.dom),u}function n(u){for(var h=0;h<e.children.length;h++)e.children[h].style.display=h===u?"block":"none";i=u}var r=(performance||Date).now(),s=r,a=0,o=t(new Gs.Panel("FPS","#0ff","#002")),l=t(new Gs.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=t(new Gs.Panel("MB","#f08","#201"));return n(0),{REVISION:16,dom:e,addPanel:t,showPanel:n,begin:function(){r=(performance||Date).now()},end:function(){a++;var u=(performance||Date).now();if(l.update(u-r,200),u>=s+1e3&&(o.update(a*1e3/(u-s),100),s=u,a=0,c)){var h=performance.memory;c.update(h.usedJSHeapSize/1048576,h.jsHeapSizeLimit/1048576)}return u},update:function(){r=this.end()},domElement:e,setMode:n}};Gs.Panel=function(i,e,t){var n=1/0,r=0,s=Math.round,a=s(window.devicePixelRatio||1),o=80*a,l=48*a,c=3*a,u=2*a,h=3*a,d=15*a,p=74*a,g=30*a,m=document.createElement("canvas");m.width=o,m.height=l,m.style.cssText="width:80px;height:48px";var f=m.getContext("2d");return f.font="bold "+9*a+"px Helvetica,Arial,sans-serif",f.textBaseline="top",f.fillStyle=t,f.fillRect(0,0,o,l),f.fillStyle=e,f.fillText(i,c,u),f.fillRect(h,d,p,g),f.fillStyle=t,f.globalAlpha=.9,f.fillRect(h,d,p,g),{dom:m,update:function(x,A){n=Math.min(n,x),r=Math.max(r,x),f.fillStyle=t,f.globalAlpha=1,f.fillRect(0,0,o,d),f.fillStyle=e,f.fillText(s(x)+" "+i+" ("+s(n)+"-"+s(r)+")",c,u),f.drawImage(m,h+a,d,p-a,g,h,d,p-a,g),f.fillRect(h+p-a,d,a,g),f.fillStyle=t,f.globalAlpha=.9,f.fillRect(h+p-a,d,a,s((1-x/A)*g))}}};const cs=Gs;/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const us="150",Er={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Cr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Yf=0,Mc=1,qf=2,ad=1,Qf=2,Ci=3,ui=0,Ot=1,wn=2,qt=0,Jr=1,bc=2,Sc=3,Tc=4,Zf=5,Xr=100,Kf=101,Jf=102,Ec=103,Cc=104,$f=200,ep=201,tp=202,np=203,od=204,ld=205,ip=206,rp=207,sp=208,ap=209,op=210,cd=0,ud=1,bl=2,Ka=3,Ja=4,hd=5,dd=6,tc=7,fd=0,lp=1,cp=2,qn=0,up=1,hp=2,dp=3,hs=4,fp=5,pd=300,ns=301,is=302,xn=303,Sl=304,oo=306,hn=1e3,nn=1001,$a=1002,Ke=1003,Tl=1004,qa=1005,Fe=1006,md=1007,qi=1008,Dc=1008,Qt=1009,pp=1010,mp=1011,ca=1012,gp=1013,ji=1014,it=1015,yt=1016,vp=1017,xp=1018,mr=1020,wp=1021,Ft=1023,yp=1024,_p=1025,li=1026,xr=1027,eo=1028,Ap=1029,Mp=1030,bp=1031,Sp=1033,Co=33776,Do=33777,Po=33778,Ro=33779,Pc=35840,Rc=35841,Ic=35842,Lc=35843,Tp=36196,Bc=37492,Uc=37496,Nc=37808,Fc=37809,Oc=37810,zc=37811,kc=37812,Gc=37813,Hc=37814,Vc=37815,Wc=37816,jc=37817,Xc=37818,Yc=37819,qc=37820,Qc=37821,Io=36492,Ep=36283,Zc=36284,Kc=36285,Jc=36286,ea=2300,rs=2301,Lo=2302,$c=2400,eu=2401,tu=2402,Cp=2500,Dp=0,gd=1,El=2,dn=3e3,Ne=3001,hi=3200,lo=3201,nc=0,Pp=1,Bn="srgb",ss="srgb-linear",vd="display-p3",Bo=7680,Rp=519,Cl=35044,Qi="300 es",Dl=1035;class fi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let nu=1234567;const Hs=Math.PI/180,ta=180/Math.PI;function Qn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[t&63|128]+sn[t>>8&255]+"-"+sn[t>>16&255]+sn[t>>24&255]+sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]).toLowerCase()}function tn(i,e,t){return Math.max(e,Math.min(t,i))}function ic(i,e){return(i%e+e)%e}function Ip(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Lp(i,e,t){return i!==e?(t-i)/(e-i):0}function Vs(i,e,t){return(1-t)*i+t*e}function Bp(i,e,t,n){return Vs(i,e,1-Math.exp(-t*n))}function Up(i,e=1){return e-Math.abs(ic(i,e*2)-e)}function Np(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Fp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Op(i,e){return i+Math.floor(Math.random()*(e-i+1))}function zp(i,e){return i+Math.random()*(e-i)}function kp(i){return i*(.5-Math.random())}function Gp(i){i!==void 0&&(nu=i);let e=nu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Hp(i){return i*Hs}function Vp(i){return i*ta}function Pl(i){return(i&i-1)===0&&i!==0}function xd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function wd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Wp(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),h=s((e-n)/2),d=a((e-n)/2),p=s((n-e)/2),g=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*h,l*d,o*c);break;case"YZY":i.set(l*d,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*d,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Di(i,e){switch(e.constructor){case Float32Array:return i;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Xt={DEG2RAD:Hs,RAD2DEG:ta,generateUUID:Qn,clamp:tn,euclideanModulo:ic,mapLinear:Ip,inverseLerp:Lp,lerp:Vs,damp:Bp,pingpong:Up,smoothstep:Np,smootherstep:Fp,randInt:Op,randFloat:zp,randFloatSpread:kp,seededRandom:Gp,degToRad:Hp,radToDeg:Vp,isPowerOfTwo:Pl,ceilPowerOfTwo:xd,floorPowerOfTwo:wd,setQuaternionFromProperEuler:Wp,normalize:pt,denormalize:Di};class ge{constructor(e=0,t=0){ge.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class rn{constructor(){rn.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,n,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],p=n[5],g=n[8],m=r[0],f=r[3],x=r[6],A=r[1],v=r[4],_=r[7],M=r[2],T=r[5],P=r[8];return s[0]=a*m+o*A+l*M,s[3]=a*f+o*v+l*T,s[6]=a*x+o*_+l*P,s[1]=c*m+u*A+h*M,s[4]=c*f+u*v+h*T,s[7]=c*x+u*_+h*P,s[2]=d*m+p*A+g*M,s[5]=d*f+p*v+g*T,s[8]=d*x+p*_+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*s,p=c*s-a*l,g=t*h+n*d+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/g;return e[0]=h*m,e[1]=(r*c-u*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(u*t-r*l)*m,e[5]=(r*s-o*t)*m,e[6]=p*m,e[7]=(n*l-c*t)*m,e[8]=(a*t-n*s)*m,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Uo.makeScale(e,t)),this}rotate(e){return this.premultiply(Uo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Uo.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Uo=new rn;function yd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function na(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}class Pt{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3];const d=s[a+0],p=s[a+1],g=s[a+2],m=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=m;return}if(h!==m||l!==d||c!==p||u!==g){let f=1-o;const x=l*d+c*p+u*g+h*m,A=x>=0?1:-1,v=1-x*x;if(v>Number.EPSILON){const M=Math.sqrt(v),T=Math.atan2(M,x*A);f=Math.sin(f*T)/M,o=Math.sin(o*T)/M}const _=o*A;if(l=l*f+d*_,c=c*f+p*_,u=u*f+g*_,h=h*f+m*_,f===1-o){const M=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=M,c*=M,u*=M,h*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[a],d=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+u*h+l*p-c*d,e[t+1]=l*g+u*d+c*h-o*p,e[t+2]=c*g+u*p+o*d-l*h,e[t+3]=u*g-o*h-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),h=o(s/2),d=l(n/2),p=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*p*g,this._y=c*p*h-d*u*g,this._z=c*u*g+d*p*h,this._w=c*u*h-d*p*g;break;case"YXZ":this._x=d*u*h+c*p*g,this._y=c*p*h-d*u*g,this._z=c*u*g-d*p*h,this._w=c*u*h+d*p*g;break;case"ZXY":this._x=d*u*h-c*p*g,this._y=c*p*h+d*u*g,this._z=c*u*g+d*p*h,this._w=c*u*h-d*p*g;break;case"ZYX":this._x=d*u*h-c*p*g,this._y=c*p*h+d*u*g,this._z=c*u*g-d*p*h,this._w=c*u*h+d*p*g;break;case"YZX":this._x=d*u*h+c*p*g,this._y=c*p*h+d*u*g,this._z=c*u*g-d*p*h,this._w=c*u*h-d*p*g;break;case"XZY":this._x=d*u*h-c*p*g,this._y=c*p*h-d*u*g,this._z=c*u*g+d*p*h,this._w=c*u*h+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(n>o&&n>h){const p=2*Math.sqrt(1+n-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-n-h);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-n-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,n=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(iu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(iu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=l*t+a*r-o*n,u=l*n+o*t-s*r,h=l*r+s*n-a*t,d=-s*t-a*n-o*r;return this.x=c*l+d*-s+u*-o-h*-a,this.y=u*l+d*-a+h*-s-c*-o,this.z=h*l+d*-o+c*-a-u*-s,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return No.copy(this).projectOnVector(e),this.sub(No)}reflect(e){return this.sub(No.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(tn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const No=new I,iu=new Pt;function $r(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const jp=new rn().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),Xp=new rn().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]),Xi=new I;function Yp(i){return i.convertSRGBToLinear(),Xi.set(i.r,i.g,i.b).applyMatrix3(Xp),i.setRGB(Xi.x,Xi.y,Xi.z)}function qp(i){return Xi.set(i.r,i.g,i.b).applyMatrix3(jp),i.setRGB(Xi.x,Xi.y,Xi.z).convertLinearToSRGB()}const Qp={[ss]:i=>i,[Bn]:i=>i.convertSRGBToLinear(),[vd]:Yp},Zp={[ss]:i=>i,[Bn]:i=>i.convertLinearToSRGB(),[vd]:qp},mn={enabled:!1,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(i){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!i},get workingColorSpace(){return ss},set workingColorSpace(i){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Qp[e],r=Zp[t];if(n===void 0||r===void 0)throw new Error(`Unsupported color space conversion, "${e}" to "${t}".`);return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)}};let Dr;class _d{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Dr===void 0&&(Dr=na("canvas")),Dr.width=e.width,Dr.height=e.height;const n=Dr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Dr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=na("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=$r(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor($r(t[n]/255)*255):t[n]=$r(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class Ad{constructor(e=null){this.isSource=!0,this.uuid=Qn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Oo(r[a].image)):s.push(Oo(r[a]))}else s=Oo(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Oo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?_d.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Kp=0;class Ct extends fi{constructor(e=Ct.DEFAULT_IMAGE,t=Ct.DEFAULT_MAPPING,n=nn,r=nn,s=Fe,a=qi,o=Ft,l=Qt,c=Ct.DEFAULT_ANISOTROPY,u=dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kp++}),this.uuid=Qn(),this.name="",this.source=new Ad(e),this.mipmaps=[],this.mapping=t,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ge(0,0),this.repeat=new ge(1,1),this.center=new ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new rn,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hn:e.x=e.x-Math.floor(e.x);break;case nn:e.x=e.x<0?0:1;break;case $a:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case hn:e.y=e.y-Math.floor(e.y);break;case nn:e.y=e.y<0?0:1;break;case $a:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}Ct.DEFAULT_IMAGE=null;Ct.DEFAULT_MAPPING=pd;Ct.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,n=0,r=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],p=l[5],g=l[9],m=l[2],f=l[6],x=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-m)<.01&&Math.abs(g-f)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+m)<.1&&Math.abs(g+f)<.1&&Math.abs(c+p+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,_=(p+1)/2,M=(x+1)/2,T=(u+d)/4,P=(h+m)/4,y=(g+f)/4;return v>_&&v>M?v<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(v),r=T/n,s=P/n):_>M?_<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(_),n=T/r,s=y/r):M<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(M),n=P/s,r=y/s),this.set(n,r,s,t),this}let A=Math.sqrt((f-g)*(f-g)+(h-m)*(h-m)+(d-u)*(d-u));return Math.abs(A)<.001&&(A=1),this.x=(f-g)/A,this.y=(h-m)/A,this.z=(d-u)/A,this.w=Math.acos((c+p+x-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ut extends fi{constructor(e=1,t=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const r={width:e,height:t,depth:1};this.texture=new Ct(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Fe,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ad(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Md extends Ct{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ws extends Ct{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wr extends ut{constructor(e=1,t=1,n=1,r={}){super(e,t,r),this.isWebGLMultipleRenderTargets=!0;const s=this.texture;this.texture=[];for(let a=0;a<n;a++)this.texture[a]=s.clone(),this.texture[a].isRenderTargetTexture=!0}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.texture.length;r<s;r++)this.texture[r].image.width=e,this.texture[r].image.height=t,this.texture[r].image.depth=n;this.dispose()}return this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t),this}copy(e){this.dispose(),this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.set(0,0,this.width,this.height),this.scissor.set(0,0,this.width,this.height),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.texture.length=0;for(let t=0,n=e.texture.length;t<n;t++)this.texture[t]=e.texture[t].clone(),this.texture[t].isRenderTargetTexture=!0;return this}}class Mr{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,n=1/0,r=1/0,s=-1/0,a=-1/0,o=-1/0;for(let l=0,c=e.length;l<c;l+=3){const u=e[l],h=e[l+1],d=e[l+2];u<t&&(t=u),h<n&&(n=h),d<r&&(r=d),u>s&&(s=u),h>a&&(a=h),d>o&&(o=d)}return this.min.set(t,n,r),this.max.set(s,a,o),this}setFromBufferAttribute(e){let t=1/0,n=1/0,r=1/0,s=-1/0,a=-1/0,o=-1/0;for(let l=0,c=e.count;l<c;l++){const u=e.getX(l),h=e.getY(l),d=e.getZ(l);u<t&&(t=u),h<n&&(n=h),d<r&&(r=d),u>s&&(s=u),h>a&&(a=h),d>o&&(o=d)}return this.min.set(t,n,r),this.max.set(s,a,o),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=er.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0)if(t&&n.attributes!=null&&n.attributes.position!==void 0){const s=n.attributes.position;for(let a=0,o=s.count;a<o;a++)er.fromBufferAttribute(s,a).applyMatrix4(e.matrixWorld),this.expandByPoint(er)}else n.boundingBox===null&&n.computeBoundingBox(),zo.copy(n.boundingBox),zo.applyMatrix4(e.matrixWorld),this.union(zo);const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,er),er.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_s),xa.subVectors(this.max,_s),Pr.subVectors(e.a,_s),Rr.subVectors(e.b,_s),Ir.subVectors(e.c,_s),Li.subVectors(Rr,Pr),Bi.subVectors(Ir,Rr),tr.subVectors(Pr,Ir);let t=[0,-Li.z,Li.y,0,-Bi.z,Bi.y,0,-tr.z,tr.y,Li.z,0,-Li.x,Bi.z,0,-Bi.x,tr.z,0,-tr.x,-Li.y,Li.x,0,-Bi.y,Bi.x,0,-tr.y,tr.x,0];return!ko(t,Pr,Rr,Ir,xa)||(t=[1,0,0,0,1,0,0,0,1],!ko(t,Pr,Rr,Ir,xa))?!1:(wa.crossVectors(Li,Bi),t=[wa.x,wa.y,wa.z],ko(t,Pr,Rr,Ir,xa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,er).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(er).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const vi=[new I,new I,new I,new I,new I,new I,new I,new I],er=new I,zo=new Mr,Pr=new I,Rr=new I,Ir=new I,Li=new I,Bi=new I,tr=new I,_s=new I,xa=new I,wa=new I,nr=new I;function ko(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){nr.fromArray(i,s);const o=r.x*Math.abs(nr.x)+r.y*Math.abs(nr.y)+r.z*Math.abs(nr.z),l=e.dot(nr),c=t.dot(nr),u=n.dot(nr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Jp=new Mr,As=new I,Go=new I;class ds{constructor(e=new I,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Jp.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;As.subVectors(e,this.center);const t=As.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(As,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Go.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(As.copy(e.center).add(Go)),this.expandByPoint(As.copy(e.center).sub(Go))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const xi=new I,Ho=new I,ya=new I,Ui=new I,Vo=new I,_a=new I,Wo=new I;class co{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=xi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xi.copy(this.origin).addScaledVector(this.direction,t),xi.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ho.copy(e).add(t).multiplyScalar(.5),ya.copy(t).sub(e).normalize(),Ui.copy(this.origin).sub(Ho);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ya),o=Ui.dot(this.direction),l=-Ui.dot(ya),c=Ui.lengthSq(),u=Math.abs(1-a*a);let h,d,p,g;if(u>0)if(h=a*l-o,d=a*o-l,g=s*u,h>=0)if(d>=-g)if(d<=g){const m=1/u;h*=m,d*=m,p=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ho).addScaledVector(ya,d),p}intersectSphere(e,t){xi.subVectors(e.center,this.origin);const n=xi.dot(this.direction),r=xi.dot(xi)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,xi)!==null}intersectTriangle(e,t,n,r,s){Vo.subVectors(t,e),_a.subVectors(n,e),Wo.crossVectors(Vo,_a);let a=this.direction.dot(Wo),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ui.subVectors(this.origin,e);const l=o*this.direction.dot(_a.crossVectors(Ui,_a));if(l<0)return null;const c=o*this.direction.dot(Vo.cross(Ui));if(c<0||l+c>a)return null;const u=-o*Ui.dot(Wo);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ze{constructor(){ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,n,r,s,a,o,l,c,u,h,d,p,g,m,f){const x=this.elements;return x[0]=e,x[4]=t,x[8]=n,x[12]=r,x[1]=s,x[5]=a,x[9]=o,x[13]=l,x[2]=c,x[6]=u,x[10]=h,x[14]=d,x[3]=p,x[7]=g,x[11]=m,x[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ze().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/Lr.setFromMatrixColumn(e,0).length(),s=1/Lr.setFromMatrixColumn(e,1).length(),a=1/Lr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*u,p=a*h,g=o*u,m=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+g*c,t[5]=d-m*c,t[9]=-o*l,t[2]=m-d*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,p=l*h,g=c*u,m=c*h;t[0]=d+m*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=p*o-g,t[6]=m+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,p=l*h,g=c*u,m=c*h;t[0]=d-m*o,t[4]=-a*h,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*u,t[9]=m-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,p=a*h,g=o*u,m=o*h;t[0]=l*u,t[4]=g*c-p,t[8]=d*c+m,t[1]=l*h,t[5]=m*c+d,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,g=o*l,m=o*c;t[0]=l*u,t[4]=m-d*h,t[8]=g*h+p,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*h+g,t[10]=d-m*h}else if(e.order==="XZY"){const d=a*l,p=a*c,g=o*l,m=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+m,t[5]=a*u,t[9]=p*h-g,t[2]=g*h-p,t[6]=o*u,t[10]=m*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($p,e,em)}lookAt(e,t,n){const r=this.elements;return bn.subVectors(e,t),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),Ni.crossVectors(n,bn),Ni.lengthSq()===0&&(Math.abs(n.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),Ni.crossVectors(n,bn)),Ni.normalize(),Aa.crossVectors(bn,Ni),r[0]=Ni.x,r[4]=Aa.x,r[8]=bn.x,r[1]=Ni.y,r[5]=Aa.y,r[9]=bn.y,r[2]=Ni.z,r[6]=Aa.z,r[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],p=n[13],g=n[2],m=n[6],f=n[10],x=n[14],A=n[3],v=n[7],_=n[11],M=n[15],T=r[0],P=r[4],y=r[8],b=r[12],D=r[1],U=r[5],W=r[9],N=r[13],F=r[2],V=r[6],J=r[10],ne=r[14],K=r[3],ee=r[7],se=r[11],ce=r[15];return s[0]=a*T+o*D+l*F+c*K,s[4]=a*P+o*U+l*V+c*ee,s[8]=a*y+o*W+l*J+c*se,s[12]=a*b+o*N+l*ne+c*ce,s[1]=u*T+h*D+d*F+p*K,s[5]=u*P+h*U+d*V+p*ee,s[9]=u*y+h*W+d*J+p*se,s[13]=u*b+h*N+d*ne+p*ce,s[2]=g*T+m*D+f*F+x*K,s[6]=g*P+m*U+f*V+x*ee,s[10]=g*y+m*W+f*J+x*se,s[14]=g*b+m*N+f*ne+x*ce,s[3]=A*T+v*D+_*F+M*K,s[7]=A*P+v*U+_*V+M*ee,s[11]=A*y+v*W+_*J+M*se,s[15]=A*b+v*N+_*ne+M*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],p=e[14],g=e[3],m=e[7],f=e[11],x=e[15];return g*(+s*l*h-r*c*h-s*o*d+n*c*d+r*o*p-n*l*p)+m*(+t*l*p-t*c*d+s*a*d-r*a*p+r*c*u-s*l*u)+f*(+t*c*h-t*o*p-s*a*h+n*a*p+s*o*u-n*c*u)+x*(-r*o*u-t*l*h+t*o*d+r*a*h-n*a*d+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],p=e[11],g=e[12],m=e[13],f=e[14],x=e[15],A=h*f*c-m*d*c+m*l*p-o*f*p-h*l*x+o*d*x,v=g*d*c-u*f*c-g*l*p+a*f*p+u*l*x-a*d*x,_=u*m*c-g*h*c+g*o*p-a*m*p-u*o*x+a*h*x,M=g*h*l-u*m*l-g*o*d+a*m*d+u*o*f-a*h*f,T=t*A+n*v+r*_+s*M;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/T;return e[0]=A*P,e[1]=(m*d*s-h*f*s-m*r*p+n*f*p+h*r*x-n*d*x)*P,e[2]=(o*f*s-m*l*s+m*r*c-n*f*c-o*r*x+n*l*x)*P,e[3]=(h*l*s-o*d*s-h*r*c+n*d*c+o*r*p-n*l*p)*P,e[4]=v*P,e[5]=(u*f*s-g*d*s+g*r*p-t*f*p-u*r*x+t*d*x)*P,e[6]=(g*l*s-a*f*s-g*r*c+t*f*c+a*r*x-t*l*x)*P,e[7]=(a*d*s-u*l*s+u*r*c-t*d*c-a*r*p+t*l*p)*P,e[8]=_*P,e[9]=(g*h*s-u*m*s-g*n*p+t*m*p+u*n*x-t*h*x)*P,e[10]=(a*m*s-g*o*s+g*n*c-t*m*c-a*n*x+t*o*x)*P,e[11]=(u*o*s-a*h*s-u*n*c+t*h*c+a*n*p-t*o*p)*P,e[12]=M*P,e[13]=(u*m*r-g*h*r+g*n*d-t*m*d-u*n*f+t*h*f)*P,e[14]=(g*o*r-a*m*r-g*n*l+t*m*l+a*n*f-t*o*f)*P,e[15]=(a*h*r-u*o*r+u*n*l-t*h*l-a*n*d+t*o*d)*P,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,d=s*c,p=s*u,g=s*h,m=a*u,f=a*h,x=o*h,A=l*c,v=l*u,_=l*h,M=n.x,T=n.y,P=n.z;return r[0]=(1-(m+x))*M,r[1]=(p+_)*M,r[2]=(g-v)*M,r[3]=0,r[4]=(p-_)*T,r[5]=(1-(d+x))*T,r[6]=(f+A)*T,r[7]=0,r[8]=(g+v)*P,r[9]=(f-A)*P,r[10]=(1-(d+m))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=Lr.set(r[0],r[1],r[2]).length();const a=Lr.set(r[4],r[5],r[6]).length(),o=Lr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Fn.copy(this);const c=1/s,u=1/a,h=1/o;return Fn.elements[0]*=c,Fn.elements[1]*=c,Fn.elements[2]*=c,Fn.elements[4]*=u,Fn.elements[5]*=u,Fn.elements[6]*=u,Fn.elements[8]*=h,Fn.elements[9]*=h,Fn.elements[10]*=h,t.setFromRotationMatrix(Fn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a){const o=this.elements,l=2*s/(t-e),c=2*s/(n-r),u=(t+e)/(t-e),h=(n+r)/(n-r),d=-(a+s)/(a-s),p=-2*a*s/(a-s);return o[0]=l,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=c,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=d,o[14]=p,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,n,r,s,a){const o=this.elements,l=1/(t-e),c=1/(n-r),u=1/(a-s),h=(t+e)*l,d=(n+r)*c,p=(a+s)*u;return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-d,o[2]=0,o[6]=0,o[10]=-2*u,o[14]=-p,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Lr=new I,Fn=new ze,$p=new I(0,0,0),em=new I(1,1,1),Ni=new I,Aa=new I,bn=new I,ru=new ze,su=new Pt;class ua{constructor(e=0,t=0,n=0,r=ua.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(tn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-tn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(tn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-tn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(tn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-tn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ru.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ru,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return su.setFromEuler(this),this.setFromQuaternion(su,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ua.DEFAULT_ORDER="XYZ";class rc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let tm=0;const au=new I,Br=new Pt,wi=new ze,Ma=new I,Ms=new I,nm=new I,im=new Pt,ou=new I(1,0,0),lu=new I(0,1,0),cu=new I(0,0,1),rm={type:"added"},uu={type:"removed"};class mt extends fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tm++}),this.uuid=Qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new I,t=new ua,n=new Pt,r=new I(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ze},normalMatrix:{value:new rn}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new rc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Br.setFromAxisAngle(e,t),this.quaternion.multiply(Br),this}rotateOnWorldAxis(e,t){return Br.setFromAxisAngle(e,t),this.quaternion.premultiply(Br),this}rotateX(e){return this.rotateOnAxis(ou,e)}rotateY(e){return this.rotateOnAxis(lu,e)}rotateZ(e){return this.rotateOnAxis(cu,e)}translateOnAxis(e,t){return au.copy(e).applyQuaternion(this.quaternion),this.position.add(au.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ou,e)}translateY(e){return this.translateOnAxis(lu,e)}translateZ(e){return this.translateOnAxis(cu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(wi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ma.copy(e):Ma.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wi.lookAt(Ms,Ma,this.up):wi.lookAt(Ma,Ms,this.up),this.quaternion.setFromRotationMatrix(wi),r&&(wi.extractRotation(r.matrixWorld),Br.setFromRotationMatrix(wi),this.quaternion.premultiply(Br.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(rm)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(uu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(uu)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),wi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),wi.multiply(e.parent.matrixWorld)),e.applyMatrix4(wi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let r=0,s=this.children.length;r<s;r++){const a=this.children[r].getObjectsByProperty(e,t);a.length>0&&(n=n.concat(a))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,e,nm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,im,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}mt.DEFAULT_UP=new I(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const On=new I,yi=new I,jo=new I,_i=new I,Ur=new I,Nr=new I,hu=new I,Xo=new I,Yo=new I,qo=new I;class Ti{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),On.subVectors(e,t),r.cross(On);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){On.subVectors(r,t),yi.subVectors(n,t),jo.subVectors(e,t);const a=On.dot(On),o=On.dot(yi),l=On.dot(jo),c=yi.dot(yi),u=yi.dot(jo),h=a*c-o*o;if(h===0)return s.set(-2,-1,-1);const d=1/h,p=(c*l-o*u)*d,g=(a*u-o*l)*d;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,_i),_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getUV(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,_i),l.set(0,0),l.addScaledVector(s,_i.x),l.addScaledVector(a,_i.y),l.addScaledVector(o,_i.z),l}static isFrontFacing(e,t,n,r){return On.subVectors(n,t),yi.subVectors(e,t),On.cross(yi).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return On.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),On.cross(yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ti.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ti.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return Ti.getUV(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Ti.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ti.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;Ur.subVectors(r,n),Nr.subVectors(s,n),Xo.subVectors(e,n);const l=Ur.dot(Xo),c=Nr.dot(Xo);if(l<=0&&c<=0)return t.copy(n);Yo.subVectors(e,r);const u=Ur.dot(Yo),h=Nr.dot(Yo);if(u>=0&&h<=u)return t.copy(r);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Ur,a);qo.subVectors(e,s);const p=Ur.dot(qo),g=Nr.dot(qo);if(g>=0&&p<=g)return t.copy(s);const m=p*c-l*g;if(m<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Nr,o);const f=u*g-p*h;if(f<=0&&h-u>=0&&p-g>=0)return hu.subVectors(s,r),o=(h-u)/(h-u+(p-g)),t.copy(r).addScaledVector(hu,o);const x=1/(f+m+d);return a=m*x,o=d*x,t.copy(n).addScaledVector(Ur,a).addScaledVector(Nr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let sm=0;class Cn extends fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=Qn(),this.name="",this.type="Material",this.blending=Jr,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=od,this.blendDst=ld,this.blendEquation=Xr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Ka,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Rp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bo,this.stencilZFail=Bo,this.stencilZPass=Bo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}const r=this[t];if(r===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Jr&&(n.blending=this.blending),this.side!==ui&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(n.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const bd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},ba={h:0,s:0,l:0};function Qo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ie{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Bn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,mn.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=mn.workingColorSpace){return this.r=e,this.g=t,this.b=n,mn.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=mn.workingColorSpace){if(e=ic(e,1),t=tn(t,0,1),n=tn(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Qo(a,s,e+1/3),this.g=Qo(a,s,e),this.b=Qo(a,s,e-1/3)}return mn.toWorkingColorSpace(this,r),this}setStyle(e,t=Bn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,mn.toWorkingColorSpace(this,t),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,mn.toWorkingColorSpace(this,t),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const l=parseFloat(s[1])/360,c=parseFloat(s[2])/100,u=parseFloat(s[3])/100;return n(s[4]),this.setHSL(l,c,u,t)}break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,mn.toWorkingColorSpace(this,t),this;if(a===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,mn.toWorkingColorSpace(this,t),this;console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Bn){const n=bd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$r(e.r),this.g=$r(e.g),this.b=$r(e.b),this}copyLinearToSRGB(e){return this.r=Fo(e.r),this.g=Fo(e.g),this.b=Fo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bn){return mn.fromWorkingColorSpace(an.copy(this),e),tn(an.r*255,0,255)<<16^tn(an.g*255,0,255)<<8^tn(an.b*255,0,255)<<0}getHexString(e=Bn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=mn.workingColorSpace){mn.fromWorkingColorSpace(an.copy(this),t);const n=an.r,r=an.g,s=an.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=mn.workingColorSpace){return mn.fromWorkingColorSpace(an.copy(this),t),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=Bn){mn.fromWorkingColorSpace(an.copy(this),e);const t=an.r,n=an.g,r=an.b;return e!==Bn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${t*255|0},${n*255|0},${r*255|0})`}offsetHSL(e,t,n){return this.getHSL(zn),zn.h+=e,zn.s+=t,zn.l+=n,this.setHSL(zn.h,zn.s,zn.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(zn),e.getHSL(ba);const n=Vs(zn.h,ba.h,t),r=Vs(zn.s,ba.s,t),s=Vs(zn.l,ba.l,t);return this.setHSL(n,r,s),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new Ie;Ie.NAMES=bd;class ai extends Cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=fd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ut=new I,Sa=new ge;class Et{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Cl,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Sa.fromBufferAttribute(this,t),Sa.applyMatrix3(e),this.setXY(t,Sa.x,Sa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Di(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Di(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Di(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Di(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),r=pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),r=pt(r,this.array),s=pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Cl&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class Sd extends Et{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Td extends Et{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class gt extends Et{constructor(e,t,n){super(new Float32Array(e),t,n)}}let am=0;const Rn=new ze,Zo=new mt,Fr=new I,Sn=new Mr,bs=new Mr,Vt=new I;class Rt extends fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:am++}),this.uuid=Qn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(yd(e)?Td:Sd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new rn().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Rn.makeRotationFromQuaternion(e),this.applyMatrix4(Rn),this}rotateX(e){return Rn.makeRotationX(e),this.applyMatrix4(Rn),this}rotateY(e){return Rn.makeRotationY(e),this.applyMatrix4(Rn),this}rotateZ(e){return Rn.makeRotationZ(e),this.applyMatrix4(Rn),this}translate(e,t,n){return Rn.makeTranslation(e,t,n),this.applyMatrix4(Rn),this}scale(e,t,n){return Rn.makeScale(e,t,n),this.applyMatrix4(Rn),this}lookAt(e){return Zo.lookAt(e),Zo.updateMatrix(),this.applyMatrix4(Zo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fr).negate(),this.translate(Fr.x,Fr.y,Fr.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new gt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Sn.setFromBufferAttribute(s),this.morphTargetsRelative?(Vt.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(Vt),Vt.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(Vt)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ds);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];bs.setFromBufferAttribute(o),this.morphTargetsRelative?(Vt.addVectors(Sn.min,bs.min),Sn.expandByPoint(Vt),Vt.addVectors(Sn.max,bs.max),Sn.expandByPoint(Vt)):(Sn.expandByPoint(bs.min),Sn.expandByPoint(bs.max))}Sn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Vt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Vt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Vt.fromBufferAttribute(o,c),l&&(Fr.fromBufferAttribute(e,c),Vt.add(Fr)),r=Math.max(r,n.distanceToSquared(Vt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Et(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let D=0;D<o;D++)c[D]=new I,u[D]=new I;const h=new I,d=new I,p=new I,g=new ge,m=new ge,f=new ge,x=new I,A=new I;function v(D,U,W){h.fromArray(r,D*3),d.fromArray(r,U*3),p.fromArray(r,W*3),g.fromArray(a,D*2),m.fromArray(a,U*2),f.fromArray(a,W*2),d.sub(h),p.sub(h),m.sub(g),f.sub(g);const N=1/(m.x*f.y-f.x*m.y);isFinite(N)&&(x.copy(d).multiplyScalar(f.y).addScaledVector(p,-m.y).multiplyScalar(N),A.copy(p).multiplyScalar(m.x).addScaledVector(d,-f.x).multiplyScalar(N),c[D].add(x),c[U].add(x),c[W].add(x),u[D].add(A),u[U].add(A),u[W].add(A))}let _=this.groups;_.length===0&&(_=[{start:0,count:n.length}]);for(let D=0,U=_.length;D<U;++D){const W=_[D],N=W.start,F=W.count;for(let V=N,J=N+F;V<J;V+=3)v(n[V+0],n[V+1],n[V+2])}const M=new I,T=new I,P=new I,y=new I;function b(D){P.fromArray(s,D*3),y.copy(P);const U=c[D];M.copy(U),M.sub(P.multiplyScalar(P.dot(U))).normalize(),T.crossVectors(y,U);const N=T.dot(u[D])<0?-1:1;l[D*4]=M.x,l[D*4+1]=M.y,l[D*4+2]=M.z,l[D*4+3]=N}for(let D=0,U=_.length;D<U;++D){const W=_[D],N=W.start,F=W.count;for(let V=N,J=N+F;V<J;V+=3)b(n[V+0]),b(n[V+1]),b(n[V+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Et(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const r=new I,s=new I,a=new I,o=new I,l=new I,c=new I,u=new I,h=new I;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),m=e.getX(d+1),f=e.getX(d+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,m),a.fromBufferAttribute(t,f),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),c.fromBufferAttribute(n,f),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Vt.fromBufferAttribute(e,t),Vt.normalize(),e.setXYZ(t,Vt.x,Vt.y,Vt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let p=0,g=0;for(let m=0,f=l.length;m<f;m++){o.isInterleavedBufferAttribute?p=l[m]*o.data.stride+o.offset:p=l[m]*u;for(let x=0;x<u;x++)d[g++]=c[p++]}return new Et(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Rt,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],p=e(d,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const du=new ze,Jn=new co,Ta=new ds,fu=new I,Ss=new I,Ts=new I,Es=new I,Ko=new I,Ea=new I,Ca=new ge,Da=new ge,Pa=new ge,Jo=new I,Ra=new I;class me extends mt{constructor(e=new Rt,t=new ai){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ea.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Ko.fromBufferAttribute(h,e),a?Ea.addScaledVector(Ko,u):Ea.addScaledVector(Ko.sub(t),u))}t.add(Ea)}return this.isSkinnedMesh&&this.boneTransform(e,t),t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;if(r===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Ta.copy(n.boundingSphere),Ta.applyMatrix4(s),Jn.copy(e.ray).recast(e.near),Ta.containsPoint(Jn.origin)===!1&&(Jn.intersectSphere(Ta,fu)===null||Jn.origin.distanceToSquared(fu)>(e.far-e.near)**2))||(du.copy(s).invert(),Jn.copy(e.ray).applyMatrix4(du),n.boundingBox!==null&&Jn.intersectsBox(n.boundingBox)===!1))return;let a;const o=n.index,l=n.attributes.position,c=n.attributes.uv,u=n.attributes.uv2,h=n.groups,d=n.drawRange;if(o!==null)if(Array.isArray(r))for(let p=0,g=h.length;p<g;p++){const m=h[p],f=r[m.materialIndex],x=Math.max(m.start,d.start),A=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let v=x,_=A;v<_;v+=3){const M=o.getX(v),T=o.getX(v+1),P=o.getX(v+2);a=Ia(this,f,e,Jn,c,u,M,T,P),a&&(a.faceIndex=Math.floor(v/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const p=Math.max(0,d.start),g=Math.min(o.count,d.start+d.count);for(let m=p,f=g;m<f;m+=3){const x=o.getX(m),A=o.getX(m+1),v=o.getX(m+2);a=Ia(this,r,e,Jn,c,u,x,A,v),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let p=0,g=h.length;p<g;p++){const m=h[p],f=r[m.materialIndex],x=Math.max(m.start,d.start),A=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=x,_=A;v<_;v+=3){const M=v,T=v+1,P=v+2;a=Ia(this,f,e,Jn,c,u,M,T,P),a&&(a.faceIndex=Math.floor(v/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const p=Math.max(0,d.start),g=Math.min(l.count,d.start+d.count);for(let m=p,f=g;m<f;m+=3){const x=m,A=m+1,v=m+2;a=Ia(this,r,e,Jn,c,u,x,A,v),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}}}function om(i,e,t,n,r,s,a,o){let l;if(e.side===Ot?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===ui,o),l===null)return null;Ra.copy(o),Ra.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Ra);return c<t.near||c>t.far?null:{distance:c,point:Ra.clone(),object:i}}function Ia(i,e,t,n,r,s,a,o,l){i.getVertexPosition(a,Ss),i.getVertexPosition(o,Ts),i.getVertexPosition(l,Es);const c=om(i,e,t,n,Ss,Ts,Es,Jo);if(c){r&&(Ca.fromBufferAttribute(r,a),Da.fromBufferAttribute(r,o),Pa.fromBufferAttribute(r,l),c.uv=Ti.getUV(Jo,Ss,Ts,Es,Ca,Da,Pa,new ge)),s&&(Ca.fromBufferAttribute(s,a),Da.fromBufferAttribute(s,o),Pa.fromBufferAttribute(s,l),c.uv2=Ti.getUV(Jo,Ss,Ts,Es,Ca,Da,Pa,new ge));const u={a,b:o,c:l,normal:new I,materialIndex:0};Ti.getNormal(Ss,Ts,Es,u.normal),c.face=u}return c}class Mt extends Rt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,p=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(u,3)),this.setAttribute("uv",new gt(h,2));function g(m,f,x,A,v,_,M,T,P,y,b){const D=_/P,U=M/y,W=_/2,N=M/2,F=T/2,V=P+1,J=y+1;let ne=0,K=0;const ee=new I;for(let se=0;se<J;se++){const ce=se*U-N;for(let O=0;O<V;O++){const te=O*D-W;ee[m]=te*A,ee[f]=ce*v,ee[x]=F,c.push(ee.x,ee.y,ee.z),ee[m]=0,ee[f]=0,ee[x]=T>0?1:-1,u.push(ee.x,ee.y,ee.z),h.push(O/P),h.push(1-se/y),ne+=1}}for(let se=0;se<y;se++)for(let ce=0;ce<P;ce++){const O=d+ce+V*se,te=d+ce+V*(se+1),he=d+(ce+1)+V*(se+1),j=d+(ce+1)+V*se;l.push(O,te,j),l.push(te,he,j),K+=6}o.addGroup(p,K,b),p+=K,d+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function as(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function vn(i){const e={};for(let t=0;t<i.length;t++){const n=as(i[t]);for(const r in n)e[r]=n[r]}return e}function lm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ed(i){return i.getRenderTarget()===null&&i.outputEncoding===Ne?Bn:ss}const yr={clone:as,merge:vn};var cm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,um=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _t extends Cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cm,this.fragmentShader=um,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=as(e.uniforms),this.uniformsGroups=lm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class uo extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Tt extends uo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ta*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Hs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ta*2*Math.atan(Math.tan(Hs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Hs*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Or=-90,zr=1;class hm extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n;const r=new Tt(Or,zr,e,t);r.layers=this.layers,r.up.set(0,1,0),r.lookAt(1,0,0),this.add(r);const s=new Tt(Or,zr,e,t);s.layers=this.layers,s.up.set(0,1,0),s.lookAt(-1,0,0),this.add(s);const a=new Tt(Or,zr,e,t);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(0,1,0),this.add(a);const o=new Tt(Or,zr,e,t);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(0,-1,0),this.add(o);const l=new Tt(Or,zr,e,t);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,1),this.add(l);const c=new Tt(Or,zr,e,t);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[r,s,a,o,l,c]=this.children,u=e.getRenderTarget(),h=e.toneMapping,d=e.xr.enabled;e.toneMapping=qn,e.xr.enabled=!1;const p=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,r),e.setRenderTarget(n,1),e.render(t,s),e.setRenderTarget(n,2),e.render(t,a),e.setRenderTarget(n,3),e.render(t,o),e.setRenderTarget(n,4),e.render(t,l),n.texture.generateMipmaps=p,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(u),e.toneMapping=h,e.xr.enabled=d,n.texture.needsPMREMUpdate=!0}}class Cd extends Ct{constructor(e,t,n,r,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:ns,super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class dm extends ut{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Cd(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Fe}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Mt(5,5,5),s=new _t({name:"CubemapFromEquirect",uniforms:as(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ot,blending:qt});s.uniforms.tEquirect.value=t;const a=new me(r,s),o=t.minFilter;return t.minFilter===qi&&(t.minFilter=Fe),new hm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}const $o=new I,fm=new I,pm=new rn;class Vi{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=$o.subVectors(n,t).cross(fm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta($o),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||pm.getNormalMatrix(e),r=this.coplanarPoint($o).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const kr=new ds,La=new I;class sc{constructor(e=new Vi,t=new Vi,n=new Vi,r=new Vi,s=new Vi,a=new Vi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,r=n[0],s=n[1],a=n[2],o=n[3],l=n[4],c=n[5],u=n[6],h=n[7],d=n[8],p=n[9],g=n[10],m=n[11],f=n[12],x=n[13],A=n[14],v=n[15];return t[0].setComponents(o-r,h-l,m-d,v-f).normalize(),t[1].setComponents(o+r,h+l,m+d,v+f).normalize(),t[2].setComponents(o+s,h+c,m+p,v+x).normalize(),t[3].setComponents(o-s,h-c,m-p,v-x).normalize(),t[4].setComponents(o-a,h-u,m-g,v-A).normalize(),t[5].setComponents(o+a,h+u,m+g,v+A).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),kr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(kr)}intersectsSprite(e){return kr.center.set(0,0,0),kr.radius=.7071067811865476,kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(kr)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(La.x=r.normal.x>0?e.max.x:e.min.x,La.y=r.normal.y>0?e.max.y:e.min.y,La.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(La)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Dd(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function mm(i,e){const t=e.isWebGL2,n=new WeakMap;function r(c,u){const h=c.array,d=c.usage,p=i.createBuffer();i.bindBuffer(u,p),i.bufferData(u,h,d),c.onUploadCallback();let g;if(h instanceof Float32Array)g=5126;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(h instanceof Int16Array)g=5122;else if(h instanceof Uint32Array)g=5125;else if(h instanceof Int32Array)g=5124;else if(h instanceof Int8Array)g=5120;else if(h instanceof Uint8Array)g=5121;else if(h instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:p,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version}}function s(c,u,h){const d=u.array,p=u.updateRange;i.bindBuffer(h,c),p.count===-1?i.bufferSubData(h,0,d):(t?i.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):i.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(i.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h===void 0?n.set(c,r(c,u)):h.version<c.version&&(s(h.buffer,c,u),h.version=c.version)}return{get:a,remove:o,update:l}}class br extends Rt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,h=e/o,d=t/l,p=[],g=[],m=[],f=[];for(let x=0;x<u;x++){const A=x*d-a;for(let v=0;v<c;v++){const _=v*h-s;g.push(_,-A,0),m.push(0,0,1),f.push(v/o),f.push(1-x/l)}}for(let x=0;x<l;x++)for(let A=0;A<o;A++){const v=A+c*x,_=A+c*(x+1),M=A+1+c*(x+1),T=A+1+c*x;p.push(v,_,T),p.push(_,M,T)}this.setIndex(p),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(m,3)),this.setAttribute("uv",new gt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new br(e.width,e.height,e.widthSegments,e.heightSegments)}}var gm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,vm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xm=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,wm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ym=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,_m=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Am="vec3 transformed = vec3( position );",Mm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bm=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
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
#endif`,Sm=`#ifdef USE_IRIDESCENCE
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
#endif`,Tm=`#ifdef USE_BUMPMAP
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
#endif`,Em=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Cm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Dm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Pm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Im=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Lm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Bm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Um=`#define PI 3.141592653589793
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
}`,Nm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Fm=`vec3 transformedNormal = objectNormal;
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
#endif`,Om=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,km=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vm=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Wm=`#ifdef USE_ENVMAP
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
#endif`,jm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xm=`#ifdef USE_ENVMAP
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
#endif`,Ym=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qm=`#ifdef USE_ENVMAP
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
#endif`,Qm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Km=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Jm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$m=`#ifdef USE_GRADIENTMAP
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
}`,eg=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,tg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ng=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ig=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rg=`uniform bool receiveShadow;
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
#endif`,sg=`#if defined( USE_ENVMAP )
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
#endif`,ag=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,og=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ug=`PhysicalMaterial material;
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
#endif`,hg=`struct PhysicalMaterial {
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
}`,dg=`
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
#endif`,fg=`#if defined( RE_IndirectDiffuse )
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
#endif`,pg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,mg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,xg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,wg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_g=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ag=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Sg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tg=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Eg=`#ifdef USE_MORPHNORMALS
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
#endif`,Cg=`#ifdef USE_MORPHTARGETS
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
#endif`,Dg=`#ifdef USE_MORPHTARGETS
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
#endif`,Pg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 geometryNormal = normal;`,Rg=`#ifdef OBJECTSPACE_NORMALMAP
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
#endif`,Ig=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ug=`#ifdef USE_NORMALMAP
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
#endif`,Ng=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,Fg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,Og=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,zg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Hg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Kg=`float getShadowMask() {
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
}`,Jg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$g=`#ifdef USE_SKINNING
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
#endif`,ev=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tv=`#ifdef USE_SKINNING
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
#endif`,nv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,iv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,av=`#ifdef USE_TRANSMISSION
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
#endif`,ov=`#ifdef USE_TRANSMISSION
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
#endif`,lv=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,cv=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,uv=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,hv=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,dv=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,fv=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,pv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gv=`uniform sampler2D t2D;
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
}`,vv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,wv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,_v=`#include <common>
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
}`,Av=`#if DEPTH_PACKING == 3200
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
}`,Mv=`#define DISTANCE
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
}`,bv=`#define DISTANCE
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
}`,Sv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Ev=`uniform float scale;
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
}`,Cv=`uniform vec3 diffuse;
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
}`,Dv=`#include <common>
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
}`,Pv=`uniform vec3 diffuse;
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
}`,Rv=`#define LAMBERT
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
}`,Iv=`#define LAMBERT
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
}`,Lv=`#define MATCAP
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
}`,Bv=`#define MATCAP
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
}`,Uv=`#define NORMAL
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
}`,Nv=`#define NORMAL
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
}`,Fv=`#define PHONG
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
}`,Ov=`#define PHONG
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
}`,zv=`#define STANDARD
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
}`,kv=`#define STANDARD
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
}`,Gv=`#define TOON
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
}`,Hv=`#define TOON
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
}`,Vv=`uniform float size;
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
}`,Wv=`uniform vec3 diffuse;
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
}`,jv=`#include <common>
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
}`,Xv=`uniform vec3 color;
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
}`,Yv=`uniform float rotation;
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
}`,qv=`uniform vec3 diffuse;
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
}`,We={alphamap_fragment:gm,alphamap_pars_fragment:vm,alphatest_fragment:xm,alphatest_pars_fragment:wm,aomap_fragment:ym,aomap_pars_fragment:_m,begin_vertex:Am,beginnormal_vertex:Mm,bsdfs:bm,iridescence_fragment:Sm,bumpmap_pars_fragment:Tm,clipping_planes_fragment:Em,clipping_planes_pars_fragment:Cm,clipping_planes_pars_vertex:Dm,clipping_planes_vertex:Pm,color_fragment:Rm,color_pars_fragment:Im,color_pars_vertex:Lm,color_vertex:Bm,common:Um,cube_uv_reflection_fragment:Nm,defaultnormal_vertex:Fm,displacementmap_pars_vertex:Om,displacementmap_vertex:zm,emissivemap_fragment:km,emissivemap_pars_fragment:Gm,encodings_fragment:Hm,encodings_pars_fragment:Vm,envmap_fragment:Wm,envmap_common_pars_fragment:jm,envmap_pars_fragment:Xm,envmap_pars_vertex:Ym,envmap_physical_pars_fragment:sg,envmap_vertex:qm,fog_vertex:Qm,fog_pars_vertex:Zm,fog_fragment:Km,fog_pars_fragment:Jm,gradientmap_pars_fragment:$m,lightmap_fragment:eg,lightmap_pars_fragment:tg,lights_lambert_fragment:ng,lights_lambert_pars_fragment:ig,lights_pars_begin:rg,lights_toon_fragment:ag,lights_toon_pars_fragment:og,lights_phong_fragment:lg,lights_phong_pars_fragment:cg,lights_physical_fragment:ug,lights_physical_pars_fragment:hg,lights_fragment_begin:dg,lights_fragment_maps:fg,lights_fragment_end:pg,logdepthbuf_fragment:mg,logdepthbuf_pars_fragment:gg,logdepthbuf_pars_vertex:vg,logdepthbuf_vertex:xg,map_fragment:wg,map_pars_fragment:yg,map_particle_fragment:_g,map_particle_pars_fragment:Ag,metalnessmap_fragment:Mg,metalnessmap_pars_fragment:Sg,morphcolor_vertex:Tg,morphnormal_vertex:Eg,morphtarget_pars_vertex:Cg,morphtarget_vertex:Dg,normal_fragment_begin:Pg,normal_fragment_maps:Rg,normal_pars_fragment:Ig,normal_pars_vertex:Lg,normal_vertex:Bg,normalmap_pars_fragment:Ug,clearcoat_normal_fragment_begin:Ng,clearcoat_normal_fragment_maps:Fg,clearcoat_pars_fragment:Og,iridescence_pars_fragment:zg,output_fragment:kg,packing:Gg,premultiplied_alpha_fragment:Hg,project_vertex:Vg,dithering_fragment:Wg,dithering_pars_fragment:jg,roughnessmap_fragment:Xg,roughnessmap_pars_fragment:Yg,shadowmap_pars_fragment:qg,shadowmap_pars_vertex:Qg,shadowmap_vertex:Zg,shadowmask_pars_fragment:Kg,skinbase_vertex:Jg,skinning_pars_vertex:$g,skinning_vertex:ev,skinnormal_vertex:tv,specularmap_fragment:nv,specularmap_pars_fragment:iv,tonemapping_fragment:rv,tonemapping_pars_fragment:sv,transmission_fragment:av,transmission_pars_fragment:ov,uv_pars_fragment:lv,uv_pars_vertex:cv,uv_vertex:uv,uv2_pars_fragment:hv,uv2_pars_vertex:dv,uv2_vertex:fv,worldpos_vertex:pv,background_vert:mv,background_frag:gv,backgroundCube_vert:vv,backgroundCube_frag:xv,cube_vert:wv,cube_frag:yv,depth_vert:_v,depth_frag:Av,distanceRGBA_vert:Mv,distanceRGBA_frag:bv,equirect_vert:Sv,equirect_frag:Tv,linedashed_vert:Ev,linedashed_frag:Cv,meshbasic_vert:Dv,meshbasic_frag:Pv,meshlambert_vert:Rv,meshlambert_frag:Iv,meshmatcap_vert:Lv,meshmatcap_frag:Bv,meshnormal_vert:Uv,meshnormal_frag:Nv,meshphong_vert:Fv,meshphong_frag:Ov,meshphysical_vert:zv,meshphysical_frag:kv,meshtoon_vert:Gv,meshtoon_frag:Hv,points_vert:Vv,points_frag:Wv,shadow_vert:jv,shadow_frag:Xv,sprite_vert:Yv,sprite_frag:qv},be={common:{diffuse:{value:new Ie(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new rn},uv2Transform:{value:new rn},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new rn}},sprite:{diffuse:{value:new Ie(16777215)},opacity:{value:1},center:{value:new ge(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new rn}}},un={basic:{uniforms:vn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:vn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Ie(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:vn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Ie(0)},specular:{value:new Ie(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:vn([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new Ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:vn([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new Ie(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:vn([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:vn([be.points,be.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:vn([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:vn([be.common,be.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:vn([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:vn([be.sprite,be.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new rn},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:vn([be.common,be.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:vn([be.lights,be.fog,{color:{value:new Ie(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};un.physical={uniforms:vn([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new ge(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new Ie(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new Ie(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new Ie(1,1,1)},specularColorMap:{value:null}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const Ba={r:0,b:0,g:0};function Qv(i,e,t,n,r,s,a){const o=new Ie(0);let l=s===!0?0:1,c,u,h=null,d=0,p=null;function g(f,x){let A=!1,v=x.isScene===!0?x.background:null;v&&v.isTexture&&(v=(x.backgroundBlurriness>0?t:e).get(v));const _=i.xr,M=_.getSession&&_.getSession();M&&M.environmentBlendMode==="additive"&&(v=null),v===null?m(o,l):v&&v.isColor&&(m(v,1),A=!0),(i.autoClear||A)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===oo)?(u===void 0&&(u=new me(new Mt(1,1,1),new _t({name:"BackgroundCubeMaterial",uniforms:as(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Ot,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,P,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.toneMapped=v.encoding!==Ne,(h!==v||d!==v.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=v,d=v.version,p=i.toneMapping),u.layers.enableAll(),f.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new me(new br(2,2),new _t({name:"BackgroundMaterial",uniforms:as(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=v.encoding!==Ne,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,p=i.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))}function m(f,x){f.getRGB(Ba,Ed(i)),n.buffers.color.setClear(Ba.r,Ba.g,Ba.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(f,x=1){o.set(f),l=x,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,m(o,l)},render:g}}function Zv(i,e,t,n){const r=i.getParameter(34921),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=f(null);let c=l,u=!1;function h(F,V,J,ne,K){let ee=!1;if(a){const se=m(ne,J,V);c!==se&&(c=se,p(c.object)),ee=x(F,ne,J,K),ee&&A(F,ne,J,K)}else{const se=V.wireframe===!0;(c.geometry!==ne.id||c.program!==J.id||c.wireframe!==se)&&(c.geometry=ne.id,c.program=J.id,c.wireframe=se,ee=!0)}K!==null&&t.update(K,34963),(ee||u)&&(u=!1,y(F,V,J,ne),K!==null&&i.bindBuffer(34963,t.get(K).buffer))}function d(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function p(F){return n.isWebGL2?i.bindVertexArray(F):s.bindVertexArrayOES(F)}function g(F){return n.isWebGL2?i.deleteVertexArray(F):s.deleteVertexArrayOES(F)}function m(F,V,J){const ne=J.wireframe===!0;let K=o[F.id];K===void 0&&(K={},o[F.id]=K);let ee=K[V.id];ee===void 0&&(ee={},K[V.id]=ee);let se=ee[ne];return se===void 0&&(se=f(d()),ee[ne]=se),se}function f(F){const V=[],J=[],ne=[];for(let K=0;K<r;K++)V[K]=0,J[K]=0,ne[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:J,attributeDivisors:ne,object:F,attributes:{},index:null}}function x(F,V,J,ne){const K=c.attributes,ee=V.attributes;let se=0;const ce=J.getAttributes();for(const O in ce)if(ce[O].location>=0){const he=K[O];let j=ee[O];if(j===void 0&&(O==="instanceMatrix"&&F.instanceMatrix&&(j=F.instanceMatrix),O==="instanceColor"&&F.instanceColor&&(j=F.instanceColor)),he===void 0||he.attribute!==j||j&&he.data!==j.data)return!0;se++}return c.attributesNum!==se||c.index!==ne}function A(F,V,J,ne){const K={},ee=V.attributes;let se=0;const ce=J.getAttributes();for(const O in ce)if(ce[O].location>=0){let he=ee[O];he===void 0&&(O==="instanceMatrix"&&F.instanceMatrix&&(he=F.instanceMatrix),O==="instanceColor"&&F.instanceColor&&(he=F.instanceColor));const j={};j.attribute=he,he&&he.data&&(j.data=he.data),K[O]=j,se++}c.attributes=K,c.attributesNum=se,c.index=ne}function v(){const F=c.newAttributes;for(let V=0,J=F.length;V<J;V++)F[V]=0}function _(F){M(F,0)}function M(F,V){const J=c.newAttributes,ne=c.enabledAttributes,K=c.attributeDivisors;J[F]=1,ne[F]===0&&(i.enableVertexAttribArray(F),ne[F]=1),K[F]!==V&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](F,V),K[F]=V)}function T(){const F=c.newAttributes,V=c.enabledAttributes;for(let J=0,ne=V.length;J<ne;J++)V[J]!==F[J]&&(i.disableVertexAttribArray(J),V[J]=0)}function P(F,V,J,ne,K,ee){n.isWebGL2===!0&&(J===5124||J===5125)?i.vertexAttribIPointer(F,V,J,K,ee):i.vertexAttribPointer(F,V,J,ne,K,ee)}function y(F,V,J,ne){if(n.isWebGL2===!1&&(F.isInstancedMesh||ne.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const K=ne.attributes,ee=J.getAttributes(),se=V.defaultAttributeValues;for(const ce in ee){const O=ee[ce];if(O.location>=0){let te=K[ce];if(te===void 0&&(ce==="instanceMatrix"&&F.instanceMatrix&&(te=F.instanceMatrix),ce==="instanceColor"&&F.instanceColor&&(te=F.instanceColor)),te!==void 0){const he=te.normalized,j=te.itemSize,ue=t.get(te);if(ue===void 0)continue;const ye=ue.buffer,xe=ue.type,Se=ue.bytesPerElement;if(te.isInterleavedBufferAttribute){const Ae=te.data,Le=Ae.stride,qe=te.offset;if(Ae.isInstancedInterleavedBuffer){for(let et=0;et<O.locationSize;et++)M(O.location+et,Ae.meshPerAttribute);F.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=Ae.meshPerAttribute*Ae.count)}else for(let et=0;et<O.locationSize;et++)_(O.location+et);i.bindBuffer(34962,ye);for(let et=0;et<O.locationSize;et++)P(O.location+et,j/O.locationSize,xe,he,Le*Se,(qe+j/O.locationSize*et)*Se)}else{if(te.isInstancedBufferAttribute){for(let Ae=0;Ae<O.locationSize;Ae++)M(O.location+Ae,te.meshPerAttribute);F.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Ae=0;Ae<O.locationSize;Ae++)_(O.location+Ae);i.bindBuffer(34962,ye);for(let Ae=0;Ae<O.locationSize;Ae++)P(O.location+Ae,j/O.locationSize,xe,he,j*Se,j/O.locationSize*Ae*Se)}}else if(se!==void 0){const he=se[ce];if(he!==void 0)switch(he.length){case 2:i.vertexAttrib2fv(O.location,he);break;case 3:i.vertexAttrib3fv(O.location,he);break;case 4:i.vertexAttrib4fv(O.location,he);break;default:i.vertexAttrib1fv(O.location,he)}}}}T()}function b(){W();for(const F in o){const V=o[F];for(const J in V){const ne=V[J];for(const K in ne)g(ne[K].object),delete ne[K];delete V[J]}delete o[F]}}function D(F){if(o[F.id]===void 0)return;const V=o[F.id];for(const J in V){const ne=V[J];for(const K in ne)g(ne[K].object),delete ne[K];delete V[J]}delete o[F.id]}function U(F){for(const V in o){const J=o[V];if(J[F.id]===void 0)continue;const ne=J[F.id];for(const K in ne)g(ne[K].object),delete ne[K];delete J[F.id]}}function W(){N(),u=!0,c!==l&&(c=l,p(c.object))}function N(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:W,resetDefaultState:N,dispose:b,releaseStatesOfGeometry:D,releaseStatesOfProgram:U,initAttributes:v,enableAttribute:_,disableUnusedAttributes:T}}function Kv(i,e,t,n){const r=n.isWebGL2;let s;function a(c){s=c}function o(c,u){i.drawArrays(s,c,u),t.update(u,s,1)}function l(c,u,h){if(h===0)return;let d,p;if(r)d=i,p="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[p](s,c,u,h),t.update(u,s,h)}this.setMode=a,this.render=o,this.renderInstances=l}function Jv(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(P){if(P==="highp"){if(i.getShaderPrecisionFormat(35633,36338).precision>0&&i.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(35633,36337).precision>0&&i.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i instanceof WebGL2RenderingContext;let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=i.getParameter(34930),d=i.getParameter(35660),p=i.getParameter(3379),g=i.getParameter(34076),m=i.getParameter(34921),f=i.getParameter(36347),x=i.getParameter(36348),A=i.getParameter(36349),v=d>0,_=a||e.has("OES_texture_float"),M=v&&_,T=a?i.getParameter(36183):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:f,maxVaryings:x,maxFragmentUniforms:A,vertexTextures:v,floatFragmentTextures:_,floatVertexTextures:M,maxSamples:T}}function $v(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Vi,o=new rn,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||n!==0||r;return r=d,n=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,p){const g=h.clippingPlanes,m=h.clipIntersection,f=h.clipShadows,x=i.get(h);if(!r||g===null||g.length===0||s&&!f)s?u(null):c();else{const A=s?0:n,v=A*4;let _=x.clippingState||null;l.value=_,_=u(g,d,v,p);for(let M=0;M!==v;++M)_[M]=t[M];x.clippingState=_,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,p,g){const m=h!==null?h.length:0;let f=null;if(m!==0){if(f=l.value,g!==!0||f===null){const x=p+m*4,A=d.matrixWorldInverse;o.getNormalMatrix(A),(f===null||f.length<x)&&(f=new Float32Array(x));for(let v=0,_=p;v!==m;++v,_+=4)a.copy(h[v]).applyMatrix4(A,o),a.normal.toArray(f,_),f[_+3]=a.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,f}}function e0(i){let e=new WeakMap;function t(a,o){return o===xn?a.mapping=ns:o===Sl&&(a.mapping=is),a}function n(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){const o=a.mapping;if(o===xn||o===Sl)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new dm(l.height/2);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class ac extends uo{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Qr=4,pu=[.125,.215,.35,.446,.526,.582],ur=20,el=new ac,mu=new Ie;let tl=null;const ar=(1+Math.sqrt(5))/2,Gr=1/ar,gu=[new I(1,1,1),new I(-1,1,1),new I(1,1,-1),new I(-1,1,-1),new I(0,ar,Gr),new I(0,ar,-Gr),new I(Gr,0,ar),new I(-Gr,0,ar),new I(ar,Gr,0),new I(-ar,Gr,0)];class ia{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){tl=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(tl),e.scissorTest=!1,Ua(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ns||e.mapping===is?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),tl=this._renderer.getRenderTarget();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Fe,minFilter:Fe,generateMipmaps:!1,type:yt,format:Ft,encoding:dn,depthBuffer:!1},r=vu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vu(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=t0(s)),this._blurMaterial=n0(s,e,t)}return r}_compileMaterial(e){const t=new me(this._lodPlanes[0],e);this._renderer.compile(t,el)}_sceneToCubeUV(e,t,n,r){const o=new Tt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(mu),u.toneMapping=qn,u.autoClear=!1;const p=new ai({name:"PMREM.Background",side:Ot,depthWrite:!1,depthTest:!1}),g=new me(new Mt,p);let m=!1;const f=e.background;f?f.isColor&&(p.color.copy(f),e.background=null,m=!0):(p.color.copy(mu),m=!0);for(let x=0;x<6;x++){const A=x%3;A===0?(o.up.set(0,l[x],0),o.lookAt(c[x],0,0)):A===1?(o.up.set(0,0,l[x]),o.lookAt(0,c[x],0)):(o.up.set(0,l[x],0),o.lookAt(0,0,c[x]));const v=this._cubeSize;Ua(r,A*v,x>2?v:0,v,v),u.setRenderTarget(r),m&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=f}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===ns||e.mapping===is;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=wu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xu());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new me(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Ua(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,el)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=gu[(r-1)%gu.length];this._blur(e,r-1,r,s,a)}t.autoClear=n}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new me(this._lodPlanes[r],c),d=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*ur-1),m=s/g,f=isFinite(s)?1+Math.floor(u*m):ur;f>ur&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${ur}`);const x=[];let A=0;for(let P=0;P<ur;++P){const y=P/m,b=Math.exp(-y*y/2);x.push(b),P===0?A+=b:P<f&&(A+=2*b)}for(let P=0;P<x.length;P++)x[P]=x[P]/A;d.envMap.value=e.texture,d.samples.value=f,d.weights.value=x,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const _=this._sizeLods[r],M=3*_*(r>v-Qr?r-v+Qr:0),T=4*(this._cubeSize-_);Ua(t,M,T,3*_,2*_),l.setRenderTarget(t),l.render(h,el)}}function t0(i){const e=[],t=[],n=[];let r=i;const s=i-Qr+1+pu.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>i-Qr?l=pu[a-i+Qr-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,m=3,f=2,x=1,A=new Float32Array(m*g*p),v=new Float32Array(f*g*p),_=new Float32Array(x*g*p);for(let T=0;T<p;T++){const P=T%3*2/3-1,y=T>2?0:-1,b=[P,y,0,P+2/3,y,0,P+2/3,y+1,0,P,y,0,P+2/3,y+1,0,P,y+1,0];A.set(b,m*g*T),v.set(d,f*g*T);const D=[T,T,T,T,T,T];_.set(D,x*g*T)}const M=new Rt;M.setAttribute("position",new Et(A,m)),M.setAttribute("uv",new Et(v,f)),M.setAttribute("faceIndex",new Et(_,x)),e.push(M),r>Qr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function vu(i,e,t){const n=new ut(i,e,t);return n.texture.mapping=oo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ua(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function n0(i,e,t){const n=new Float32Array(ur),r=new I(0,1,0);return new _t({name:"SphericalGaussianBlur",defines:{n:ur,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:oc(),fragmentShader:`

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
		`,blending:qt,depthTest:!1,depthWrite:!1})}function xu(){return new _t({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oc(),fragmentShader:`

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
		`,blending:qt,depthTest:!1,depthWrite:!1})}function wu(){return new _t({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qt,depthTest:!1,depthWrite:!1})}function oc(){return`

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
	`}function i0(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===xn||l===Sl,u=l===ns||l===is;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new ia(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||u&&h&&r(h)){t===null&&(t=new ia(i));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function r0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function s0(i,e,t,n){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const g in d)e.update(d[g],34962);const p=h.morphAttributes;for(const g in p){const m=p[g];for(let f=0,x=m.length;f<x;f++)e.update(m[f],34962)}}function c(h){const d=[],p=h.index,g=h.attributes.position;let m=0;if(p!==null){const A=p.array;m=p.version;for(let v=0,_=A.length;v<_;v+=3){const M=A[v+0],T=A[v+1],P=A[v+2];d.push(M,T,T,P,P,M)}}else{const A=g.array;m=g.version;for(let v=0,_=A.length/3-1;v<_;v+=3){const M=v+0,T=v+1,P=v+2;d.push(M,T,T,P,P,M)}}const f=new(yd(d)?Td:Sd)(d,1);f.version=m;const x=s.get(h);x&&e.remove(x),s.set(h,f)}function u(h){const d=s.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function a0(i,e,t,n){const r=n.isWebGL2;let s;function a(d){s=d}let o,l;function c(d){o=d.type,l=d.bytesPerElement}function u(d,p){i.drawElements(s,p,o,d*l),t.update(p,s,1)}function h(d,p,g){if(g===0)return;let m,f;if(r)m=i,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](s,p,o,d*l,g),t.update(p,s,g)}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=h}function o0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case 4:t.triangles+=o*(s/3);break;case 1:t.lines+=o*(s/2);break;case 3:t.lines+=o*(s-1);break;case 2:t.lines+=o*s;break;case 0:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function l0(i,e){return i[0]-e[0]}function c0(i,e){return Math.abs(e[1])-Math.abs(i[1])}function u0(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,a=new at,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const p=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=p!==void 0?p.length:0;let m=s.get(u);if(m===void 0||m.count!==g){let F=function(){W.dispose(),s.delete(u),u.removeEventListener("dispose",F)};m!==void 0&&m.texture.dispose();const A=u.morphAttributes.position!==void 0,v=u.morphAttributes.normal!==void 0,_=u.morphAttributes.color!==void 0,M=u.morphAttributes.position||[],T=u.morphAttributes.normal||[],P=u.morphAttributes.color||[];let y=0;A===!0&&(y=1),v===!0&&(y=2),_===!0&&(y=3);let b=u.attributes.position.count*y,D=1;b>e.maxTextureSize&&(D=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const U=new Float32Array(b*D*4*g),W=new Md(U,b,D,g);W.type=it,W.needsUpdate=!0;const N=y*4;for(let V=0;V<g;V++){const J=M[V],ne=T[V],K=P[V],ee=b*D*4*V;for(let se=0;se<J.count;se++){const ce=se*N;A===!0&&(a.fromBufferAttribute(J,se),U[ee+ce+0]=a.x,U[ee+ce+1]=a.y,U[ee+ce+2]=a.z,U[ee+ce+3]=0),v===!0&&(a.fromBufferAttribute(ne,se),U[ee+ce+4]=a.x,U[ee+ce+5]=a.y,U[ee+ce+6]=a.z,U[ee+ce+7]=0),_===!0&&(a.fromBufferAttribute(K,se),U[ee+ce+8]=a.x,U[ee+ce+9]=a.y,U[ee+ce+10]=a.z,U[ee+ce+11]=K.itemSize===4?a.w:1)}}m={count:g,texture:W,size:new ge(b,D)},s.set(u,m),u.addEventListener("dispose",F)}let f=0;for(let A=0;A<d.length;A++)f+=d[A];const x=u.morphTargetsRelative?1:1-f;h.getUniforms().setValue(i,"morphTargetBaseInfluence",x),h.getUniforms().setValue(i,"morphTargetInfluences",d),h.getUniforms().setValue(i,"morphTargetsTexture",m.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}else{const p=d===void 0?0:d.length;let g=n[u.id];if(g===void 0||g.length!==p){g=[];for(let v=0;v<p;v++)g[v]=[v,0];n[u.id]=g}for(let v=0;v<p;v++){const _=g[v];_[0]=v,_[1]=d[v]}g.sort(c0);for(let v=0;v<8;v++)v<p&&g[v][1]?(o[v][0]=g[v][0],o[v][1]=g[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(l0);const m=u.morphAttributes.position,f=u.morphAttributes.normal;let x=0;for(let v=0;v<8;v++){const _=o[v],M=_[0],T=_[1];M!==Number.MAX_SAFE_INTEGER&&T?(m&&u.getAttribute("morphTarget"+v)!==m[M]&&u.setAttribute("morphTarget"+v,m[M]),f&&u.getAttribute("morphNormal"+v)!==f[M]&&u.setAttribute("morphNormal"+v,f[M]),r[v]=T,x+=T):(m&&u.hasAttribute("morphTarget"+v)===!0&&u.deleteAttribute("morphTarget"+v),f&&u.hasAttribute("morphNormal"+v)===!0&&u.deleteAttribute("morphNormal"+v),r[v]=0)}const A=u.morphTargetsRelative?1:1-x;h.getUniforms().setValue(i,"morphTargetBaseInfluence",A),h.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function h0(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);return r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),t.update(l.instanceMatrix,34962),l.instanceColor!==null&&t.update(l.instanceColor,34962)),h}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const Pd=new Ct,Rd=new Md,Id=new Ws,Ld=new Cd,yu=[],_u=[],Au=new Float32Array(16),Mu=new Float32Array(9),bu=new Float32Array(4);function fs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=yu[r];if(s===void 0&&(s=new Float32Array(r),yu[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function zt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function kt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ho(i,e){let t=_u[e];t===void 0&&(t=new Int32Array(e),_u[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function d0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function f0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2fv(this.addr,e),kt(t,e)}}function p0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(zt(t,e))return;i.uniform3fv(this.addr,e),kt(t,e)}}function m0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4fv(this.addr,e),kt(t,e)}}function g0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(zt(t,n))return;bu.set(n),i.uniformMatrix2fv(this.addr,!1,bu),kt(t,n)}}function v0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(zt(t,n))return;Mu.set(n),i.uniformMatrix3fv(this.addr,!1,Mu),kt(t,n)}}function x0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(zt(t,n))return;Au.set(n),i.uniformMatrix4fv(this.addr,!1,Au),kt(t,n)}}function w0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function y0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2iv(this.addr,e),kt(t,e)}}function _0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3iv(this.addr,e),kt(t,e)}}function A0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4iv(this.addr,e),kt(t,e)}}function M0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function b0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2uiv(this.addr,e),kt(t,e)}}function S0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3uiv(this.addr,e),kt(t,e)}}function T0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4uiv(this.addr,e),kt(t,e)}}function E0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2D(e||Pd,r)}function C0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Id,r)}function D0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Ld,r)}function P0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Rd,r)}function R0(i){switch(i){case 5126:return d0;case 35664:return f0;case 35665:return p0;case 35666:return m0;case 35674:return g0;case 35675:return v0;case 35676:return x0;case 5124:case 35670:return w0;case 35667:case 35671:return y0;case 35668:case 35672:return _0;case 35669:case 35673:return A0;case 5125:return M0;case 36294:return b0;case 36295:return S0;case 36296:return T0;case 35678:case 36198:case 36298:case 36306:case 35682:return E0;case 35679:case 36299:case 36307:return C0;case 35680:case 36300:case 36308:case 36293:return D0;case 36289:case 36303:case 36311:case 36292:return P0}}function I0(i,e){i.uniform1fv(this.addr,e)}function L0(i,e){const t=fs(e,this.size,2);i.uniform2fv(this.addr,t)}function B0(i,e){const t=fs(e,this.size,3);i.uniform3fv(this.addr,t)}function U0(i,e){const t=fs(e,this.size,4);i.uniform4fv(this.addr,t)}function N0(i,e){const t=fs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function F0(i,e){const t=fs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function O0(i,e){const t=fs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function z0(i,e){i.uniform1iv(this.addr,e)}function k0(i,e){i.uniform2iv(this.addr,e)}function G0(i,e){i.uniform3iv(this.addr,e)}function H0(i,e){i.uniform4iv(this.addr,e)}function V0(i,e){i.uniform1uiv(this.addr,e)}function W0(i,e){i.uniform2uiv(this.addr,e)}function j0(i,e){i.uniform3uiv(this.addr,e)}function X0(i,e){i.uniform4uiv(this.addr,e)}function Y0(i,e,t){const n=this.cache,r=e.length,s=ho(t,r);zt(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Pd,s[a])}function q0(i,e,t){const n=this.cache,r=e.length,s=ho(t,r);zt(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Id,s[a])}function Q0(i,e,t){const n=this.cache,r=e.length,s=ho(t,r);zt(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Ld,s[a])}function Z0(i,e,t){const n=this.cache,r=e.length,s=ho(t,r);zt(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Rd,s[a])}function K0(i){switch(i){case 5126:return I0;case 35664:return L0;case 35665:return B0;case 35666:return U0;case 35674:return N0;case 35675:return F0;case 35676:return O0;case 5124:case 35670:return z0;case 35667:case 35671:return k0;case 35668:case 35672:return G0;case 35669:case 35673:return H0;case 5125:return V0;case 36294:return W0;case 36295:return j0;case 36296:return X0;case 35678:case 36198:case 36298:case 36306:case 35682:return Y0;case 35679:case 36299:case 36307:return q0;case 35680:case 36300:case 36308:case 36293:return Q0;case 36289:case 36303:case 36311:case 36292:return Z0}}class J0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=R0(t.type)}}class $0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=K0(t.type)}}class ex{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const nl=/(\w+)(\])?(\[|\.)?/g;function Su(i,e){i.seq.push(e),i.map[e.id]=e}function tx(i,e,t){const n=i.name,r=n.length;for(nl.lastIndex=0;;){const s=nl.exec(n),a=nl.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Su(t,c===void 0?new J0(o,i,e):new $0(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new ex(o),Su(t,h)),t=h}}}class Qa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,35718);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);tx(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Tu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}let nx=0;function ix(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function rx(i){switch(i){case dn:return["Linear","( value )"];case Ne:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",i),["Linear","( value )"]}}function Eu(i,e,t){const n=i.getShaderParameter(e,35713),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+ix(i.getShaderSource(e),a)}else return r}function sx(i,e){const t=rx(e);return"vec4 "+i+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function ax(i,e){let t;switch(e){case up:t="Linear";break;case hp:t="Reinhard";break;case dp:t="OptimizedCineon";break;case hs:t="ACESFilmic";break;case fp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function ox(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.tangentSpaceNormalMap||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ns).join(`
`)}function lx(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function cx(i,e){const t={},n=i.getProgramParameter(e,35721);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===35674&&(o=2),s.type===35675&&(o=3),s.type===35676&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ns(i){return i!==""}function Cu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Du(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ux=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rl(i){return i.replace(ux,hx)}function hx(i,e){const t=We[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return Rl(t)}const dx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pu(i){return i.replace(dx,fx)}function fx(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ru(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function px(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ad?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Qf?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ci&&(e="SHADOWMAP_TYPE_VSM"),e}function mx(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ns:case is:e="ENVMAP_TYPE_CUBE";break;case oo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function gx(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case is:e="ENVMAP_MODE_REFRACTION";break}return e}function vx(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case fd:e="ENVMAP_BLENDING_MULTIPLY";break;case lp:e="ENVMAP_BLENDING_MIX";break;case cp:e="ENVMAP_BLENDING_ADD";break}return e}function xx(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function wx(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=px(t),c=mx(t),u=gx(t),h=vx(t),d=xx(t),p=t.isWebGL2?"":ox(t),g=lx(s),m=r.createProgram();let f,x,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=[g].filter(Ns).join(`
`),f.length>0&&(f+=`
`),x=[p,g].filter(Ns).join(`
`),x.length>0&&(x+=`
`)):(f=[Ru(t),"#define SHADER_NAME "+t.shaderName,g,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ns).join(`
`),x=[p,Ru(t),"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?We.tonemapping_pars_fragment:"",t.toneMapping!==qn?ax("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.encodings_pars_fragment,sx("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ns).join(`
`)),a=Rl(a),a=Cu(a,t),a=Du(a,t),o=Rl(o),o=Cu(o,t),o=Du(o,t),a=Pu(a),o=Pu(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,f=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,x=["#define varying in",t.glslVersion===Qi?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qi?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const v=A+f+a,_=A+x+o,M=Tu(r,35633,v),T=Tu(r,35632,_);if(r.attachShader(m,M),r.attachShader(m,T),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m),i.debug.checkShaderErrors){const b=r.getProgramInfoLog(m).trim(),D=r.getShaderInfoLog(M).trim(),U=r.getShaderInfoLog(T).trim();let W=!0,N=!0;if(r.getProgramParameter(m,35714)===!1){W=!1;const F=Eu(r,M,"vertex"),V=Eu(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,35715)+`

Program Info Log: `+b+`
`+F+`
`+V)}else b!==""?console.warn("THREE.WebGLProgram: Program Info Log:",b):(D===""||U==="")&&(N=!1);N&&(this.diagnostics={runnable:W,programLog:b,vertexShader:{log:D,prefix:f},fragmentShader:{log:U,prefix:x}})}r.deleteShader(M),r.deleteShader(T);let P;this.getUniforms=function(){return P===void 0&&(P=new Qa(r,m)),P};let y;return this.getAttributes=function(){return y===void 0&&(y=cx(r,m)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.name=t.shaderName,this.id=nx++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=M,this.fragmentShader=T,this}let yx=0;class _x{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Ax(e),t.set(e,n)),n}}class Ax{constructor(e){this.id=yx++,this.code=e,this.usedTimes=0}}function Mx(i,e,t,n,r,s,a){const o=new rc,l=new _x,c=[],u=r.isWebGL2,h=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(y,b,D,U,W){const N=U.fog,F=W.geometry,V=y.isMeshStandardMaterial?U.environment:null,J=(y.isMeshStandardMaterial?t:e).get(y.envMap||V),ne=J&&J.mapping===oo?J.image.height:null,K=g[y.type];y.precision!==null&&(p=r.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const ee=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,se=ee!==void 0?ee.length:0;let ce=0;F.morphAttributes.position!==void 0&&(ce=1),F.morphAttributes.normal!==void 0&&(ce=2),F.morphAttributes.color!==void 0&&(ce=3);let O,te,he,j;if(K){const Le=un[K];O=Le.vertexShader,te=Le.fragmentShader}else O=y.vertexShader,te=y.fragmentShader,l.update(y),he=l.getVertexShaderID(y),j=l.getFragmentShaderID(y);const ue=i.getRenderTarget(),ye=y.alphaTest>0,xe=y.clearcoat>0,Se=y.iridescence>0;return{isWebGL2:u,shaderID:K,shaderName:y.type,vertexShader:O,fragmentShader:te,defines:y.defines,customVertexShaderID:he,customFragmentShaderID:j,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,instancing:W.isInstancedMesh===!0,instancingColor:W.isInstancedMesh===!0&&W.instanceColor!==null,supportsVertexTextures:d,outputEncoding:ue===null?i.outputEncoding:ue.isXRRenderTarget===!0?ue.texture.encoding:dn,map:!!y.map,matcap:!!y.matcap,envMap:!!J,envMapMode:J&&J.mapping,envMapCubeUVHeight:ne,lightMap:!!y.lightMap,aoMap:!!y.aoMap,emissiveMap:!!y.emissiveMap,bumpMap:!!y.bumpMap,normalMap:!!y.normalMap,objectSpaceNormalMap:y.normalMapType===Pp,tangentSpaceNormalMap:y.normalMapType===nc,decodeVideoTexture:!!y.map&&y.map.isVideoTexture===!0&&y.map.encoding===Ne,clearcoat:xe,clearcoatMap:xe&&!!y.clearcoatMap,clearcoatRoughnessMap:xe&&!!y.clearcoatRoughnessMap,clearcoatNormalMap:xe&&!!y.clearcoatNormalMap,iridescence:Se,iridescenceMap:Se&&!!y.iridescenceMap,iridescenceThicknessMap:Se&&!!y.iridescenceThicknessMap,displacementMap:!!y.displacementMap,roughnessMap:!!y.roughnessMap,metalnessMap:!!y.metalnessMap,specularMap:!!y.specularMap,specularIntensityMap:!!y.specularIntensityMap,specularColorMap:!!y.specularColorMap,opaque:y.transparent===!1&&y.blending===Jr,alphaMap:!!y.alphaMap,alphaTest:ye,gradientMap:!!y.gradientMap,sheen:y.sheen>0,sheenColorMap:!!y.sheenColorMap,sheenRoughnessMap:!!y.sheenRoughnessMap,transmission:y.transmission>0,transmissionMap:!!y.transmissionMap,thicknessMap:!!y.thicknessMap,combine:y.combine,vertexTangents:!!y.normalMap&&!!F.attributes.tangent,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUvs:!!y.map||!!y.bumpMap||!!y.normalMap||!!y.specularMap||!!y.alphaMap||!!y.emissiveMap||!!y.roughnessMap||!!y.metalnessMap||!!y.clearcoatMap||!!y.clearcoatRoughnessMap||!!y.clearcoatNormalMap||!!y.iridescenceMap||!!y.iridescenceThicknessMap||!!y.displacementMap||!!y.transmissionMap||!!y.thicknessMap||!!y.specularIntensityMap||!!y.specularColorMap||!!y.sheenColorMap||!!y.sheenRoughnessMap,uvsVertexOnly:!(y.map||y.bumpMap||y.normalMap||y.specularMap||y.alphaMap||y.emissiveMap||y.roughnessMap||y.metalnessMap||y.clearcoatNormalMap||y.iridescenceMap||y.iridescenceThicknessMap||y.transmission>0||y.transmissionMap||y.thicknessMap||y.specularIntensityMap||y.specularColorMap||y.sheen>0||y.sheenColorMap||y.sheenRoughnessMap)&&!!y.displacementMap,fog:!!N,useFog:y.fog===!0,fogExp2:N&&N.isFogExp2,flatShading:!!y.flatShading,sizeAttenuation:y.sizeAttenuation,logarithmicDepthBuffer:h,skinning:W.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:ce,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:y.toneMapped?i.toneMapping:qn,useLegacyLights:i.useLegacyLights,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===wn,flipSided:y.side===Ot,useDepthPacking:!!y.depthPacking,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:y.extensions&&y.extensions.derivatives,extensionFragDepth:y.extensions&&y.extensions.fragDepth,extensionDrawBuffers:y.extensions&&y.extensions.drawBuffers,extensionShaderTextureLOD:y.extensions&&y.extensions.shaderTextureLOD,rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),customProgramCacheKey:y.customProgramCacheKey()}}function f(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const D in y.defines)b.push(D),b.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(x(b,y),A(b,y),b.push(i.outputEncoding)),b.push(y.customProgramCacheKey),b.join()}function x(y,b){y.push(b.precision),y.push(b.outputEncoding),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.combine),y.push(b.vertexUvs),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function A(y,b){o.disableAll(),b.isWebGL2&&o.enable(0),b.supportsVertexTextures&&o.enable(1),b.instancing&&o.enable(2),b.instancingColor&&o.enable(3),b.map&&o.enable(4),b.matcap&&o.enable(5),b.envMap&&o.enable(6),b.lightMap&&o.enable(7),b.aoMap&&o.enable(8),b.emissiveMap&&o.enable(9),b.bumpMap&&o.enable(10),b.normalMap&&o.enable(11),b.objectSpaceNormalMap&&o.enable(12),b.tangentSpaceNormalMap&&o.enable(13),b.clearcoat&&o.enable(14),b.clearcoatMap&&o.enable(15),b.clearcoatRoughnessMap&&o.enable(16),b.clearcoatNormalMap&&o.enable(17),b.iridescence&&o.enable(18),b.iridescenceMap&&o.enable(19),b.iridescenceThicknessMap&&o.enable(20),b.displacementMap&&o.enable(21),b.specularMap&&o.enable(22),b.roughnessMap&&o.enable(23),b.metalnessMap&&o.enable(24),b.gradientMap&&o.enable(25),b.alphaMap&&o.enable(26),b.alphaTest&&o.enable(27),b.vertexColors&&o.enable(28),b.vertexAlphas&&o.enable(29),b.vertexUvs&&o.enable(30),b.vertexTangents&&o.enable(31),b.uvsVertexOnly&&o.enable(32),y.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.skinning&&o.enable(4),b.morphTargets&&o.enable(5),b.morphNormals&&o.enable(6),b.morphColors&&o.enable(7),b.premultipliedAlpha&&o.enable(8),b.shadowMapEnabled&&o.enable(9),b.useLegacyLights&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.specularIntensityMap&&o.enable(15),b.specularColorMap&&o.enable(16),b.transmission&&o.enable(17),b.transmissionMap&&o.enable(18),b.thicknessMap&&o.enable(19),b.sheen&&o.enable(20),b.sheenColorMap&&o.enable(21),b.sheenRoughnessMap&&o.enable(22),b.decodeVideoTexture&&o.enable(23),b.opaque&&o.enable(24),y.push(o.mask)}function v(y){const b=g[y.type];let D;if(b){const U=un[b];D=yr.clone(U.uniforms)}else D=y.uniforms;return D}function _(y,b){let D;for(let U=0,W=c.length;U<W;U++){const N=c[U];if(N.cacheKey===b){D=N,++D.usedTimes;break}}return D===void 0&&(D=new wx(i,b,y,s),c.push(D)),D}function M(y){if(--y.usedTimes===0){const b=c.indexOf(y);c[b]=c[c.length-1],c.pop(),y.destroy()}}function T(y){l.remove(y)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:v,acquireProgram:_,releaseProgram:M,releaseShaderCache:T,programs:c,dispose:P}}function bx(){let i=new WeakMap;function e(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function t(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function Sx(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Iu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Lu(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h,d,p,g,m,f){let x=i[e];return x===void 0?(x={id:h.id,object:h,geometry:d,material:p,groupOrder:g,renderOrder:h.renderOrder,z:m,group:f},i[e]=x):(x.id=h.id,x.object=h,x.geometry=d,x.material=p,x.groupOrder=g,x.renderOrder=h.renderOrder,x.z=m,x.group=f),e++,x}function o(h,d,p,g,m,f){const x=a(h,d,p,g,m,f);p.transmission>0?n.push(x):p.transparent===!0?r.push(x):t.push(x)}function l(h,d,p,g,m,f){const x=a(h,d,p,g,m,f);p.transmission>0?n.unshift(x):p.transparent===!0?r.unshift(x):t.unshift(x)}function c(h,d){t.length>1&&t.sort(h||Sx),n.length>1&&n.sort(d||Iu),r.length>1&&r.sort(d||Iu)}function u(){for(let h=e,d=i.length;h<d;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function Tx(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Lu,i.set(n,[a])):r>=s.length?(a=new Lu,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Ex(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Ie};break;case"SpotLight":t={position:new I,direction:new I,color:new Ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Ie,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Ie,groundColor:new Ie};break;case"RectAreaLight":t={color:new Ie,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function Cx(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Dx=0;function Px(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Rx(i,e){const t=new Ex,n=Cx(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let u=0;u<9;u++)r.probe.push(new I);const s=new I,a=new ze,o=new ze;function l(u,h){let d=0,p=0,g=0;for(let U=0;U<9;U++)r.probe[U].set(0,0,0);let m=0,f=0,x=0,A=0,v=0,_=0,M=0,T=0,P=0,y=0;u.sort(Px);const b=h===!0?Math.PI:1;for(let U=0,W=u.length;U<W;U++){const N=u[U],F=N.color,V=N.intensity,J=N.distance,ne=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)d+=F.r*V*b,p+=F.g*V*b,g+=F.b*V*b;else if(N.isLightProbe)for(let K=0;K<9;K++)r.probe[K].addScaledVector(N.sh.coefficients[K],V);else if(N.isDirectionalLight){const K=t.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity*b),N.castShadow){const ee=N.shadow,se=n.get(N);se.shadowBias=ee.bias,se.shadowNormalBias=ee.normalBias,se.shadowRadius=ee.radius,se.shadowMapSize=ee.mapSize,r.directionalShadow[m]=se,r.directionalShadowMap[m]=ne,r.directionalShadowMatrix[m]=N.shadow.matrix,_++}r.directional[m]=K,m++}else if(N.isSpotLight){const K=t.get(N);K.position.setFromMatrixPosition(N.matrixWorld),K.color.copy(F).multiplyScalar(V*b),K.distance=J,K.coneCos=Math.cos(N.angle),K.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),K.decay=N.decay,r.spot[x]=K;const ee=N.shadow;if(N.map&&(r.spotLightMap[P]=N.map,P++,ee.updateMatrices(N),N.castShadow&&y++),r.spotLightMatrix[x]=ee.matrix,N.castShadow){const se=n.get(N);se.shadowBias=ee.bias,se.shadowNormalBias=ee.normalBias,se.shadowRadius=ee.radius,se.shadowMapSize=ee.mapSize,r.spotShadow[x]=se,r.spotShadowMap[x]=ne,T++}x++}else if(N.isRectAreaLight){const K=t.get(N);K.color.copy(F).multiplyScalar(V),K.halfWidth.set(N.width*.5,0,0),K.halfHeight.set(0,N.height*.5,0),r.rectArea[A]=K,A++}else if(N.isPointLight){const K=t.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity*b),K.distance=N.distance,K.decay=N.decay,N.castShadow){const ee=N.shadow,se=n.get(N);se.shadowBias=ee.bias,se.shadowNormalBias=ee.normalBias,se.shadowRadius=ee.radius,se.shadowMapSize=ee.mapSize,se.shadowCameraNear=ee.camera.near,se.shadowCameraFar=ee.camera.far,r.pointShadow[f]=se,r.pointShadowMap[f]=ne,r.pointShadowMatrix[f]=N.shadow.matrix,M++}r.point[f]=K,f++}else if(N.isHemisphereLight){const K=t.get(N);K.skyColor.copy(N.color).multiplyScalar(V*b),K.groundColor.copy(N.groundColor).multiplyScalar(V*b),r.hemi[v]=K,v++}}A>0&&(e.isWebGL2||i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=be.LTC_FLOAT_1,r.rectAreaLTC2=be.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=be.LTC_HALF_1,r.rectAreaLTC2=be.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=p,r.ambient[2]=g;const D=r.hash;(D.directionalLength!==m||D.pointLength!==f||D.spotLength!==x||D.rectAreaLength!==A||D.hemiLength!==v||D.numDirectionalShadows!==_||D.numPointShadows!==M||D.numSpotShadows!==T||D.numSpotMaps!==P)&&(r.directional.length=m,r.spot.length=x,r.rectArea.length=A,r.point.length=f,r.hemi.length=v,r.directionalShadow.length=_,r.directionalShadowMap.length=_,r.pointShadow.length=M,r.pointShadowMap.length=M,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=_,r.pointShadowMatrix.length=M,r.spotLightMatrix.length=T+P-y,r.spotLightMap.length=P,r.numSpotLightShadowsWithMaps=y,D.directionalLength=m,D.pointLength=f,D.spotLength=x,D.rectAreaLength=A,D.hemiLength=v,D.numDirectionalShadows=_,D.numPointShadows=M,D.numSpotShadows=T,D.numSpotMaps=P,r.version=Dx++)}function c(u,h){let d=0,p=0,g=0,m=0,f=0;const x=h.matrixWorldInverse;for(let A=0,v=u.length;A<v;A++){const _=u[A];if(_.isDirectionalLight){const M=r.directional[d];M.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(x),d++}else if(_.isSpotLight){const M=r.spot[g];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(x),M.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(x),g++}else if(_.isRectAreaLight){const M=r.rectArea[m];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(x),o.identity(),a.copy(_.matrixWorld),a.premultiply(x),o.extractRotation(a),M.halfWidth.set(_.width*.5,0,0),M.halfHeight.set(0,_.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),m++}else if(_.isPointLight){const M=r.point[p];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(x),p++}else if(_.isHemisphereLight){const M=r.hemi[f];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(x),f++}}}return{setup:l,setupView:c,state:r}}function Bu(i,e){const t=new Rx(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function a(h){n.push(h)}function o(h){r.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Ix(i,e){let t=new WeakMap;function n(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new Bu(i,e),t.set(s,[l])):a>=o.length?(l=new Bu(i,e),o.push(l)):l=o[a],l}function r(){t=new WeakMap}return{get:n,dispose:r}}class lc extends Cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hi,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Lx extends Cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new I,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Bx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ux=`uniform sampler2D shadow_pass;
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
}`;function Nx(i,e,t){let n=new sc;const r=new ge,s=new ge,a=new at,o=new lc({depthPacking:lo}),l=new Lx,c={},u=t.maxTextureSize,h={[ui]:Ot,[Ot]:ui,[wn]:wn},d=new _t({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ge},radius:{value:4}},vertexShader:Bx,fragmentShader:Ux}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Rt;g.setAttribute("position",new Et(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new me(g,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ad,this.render=function(_,M,T){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||_.length===0)return;const P=i.getRenderTarget(),y=i.getActiveCubeFace(),b=i.getActiveMipmapLevel(),D=i.state;D.setBlending(qt),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);for(let U=0,W=_.length;U<W;U++){const N=_[U],F=N.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",N,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;r.copy(F.mapSize);const V=F.getFrameExtents();if(r.multiply(V),s.copy(F.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/V.x),r.x=s.x*V.x,F.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/V.y),r.y=s.y*V.y,F.mapSize.y=s.y)),F.map===null){const ne=this.type!==Ci?{minFilter:Ke,magFilter:Ke}:{};F.map=new ut(r.x,r.y,ne),F.map.texture.name=N.name+".shadowMap",F.camera.updateProjectionMatrix()}i.setRenderTarget(F.map),i.clear();const J=F.getViewportCount();for(let ne=0;ne<J;ne++){const K=F.getViewport(ne);a.set(s.x*K.x,s.y*K.y,s.x*K.z,s.y*K.w),D.viewport(a),F.updateMatrices(N,ne),n=F.getFrustum(),v(M,T,F.camera,N,this.type)}F.isPointLightShadow!==!0&&this.type===Ci&&x(F,T),F.needsUpdate=!1}f.needsUpdate=!1,i.setRenderTarget(P,y,b)};function x(_,M){const T=e.update(m);d.defines.VSM_SAMPLES!==_.blurSamples&&(d.defines.VSM_SAMPLES=_.blurSamples,p.defines.VSM_SAMPLES=_.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),_.mapPass===null&&(_.mapPass=new ut(r.x,r.y)),d.uniforms.shadow_pass.value=_.map.texture,d.uniforms.resolution.value=_.mapSize,d.uniforms.radius.value=_.radius,i.setRenderTarget(_.mapPass),i.clear(),i.renderBufferDirect(M,null,T,d,m,null),p.uniforms.shadow_pass.value=_.mapPass.texture,p.uniforms.resolution.value=_.mapSize,p.uniforms.radius.value=_.radius,i.setRenderTarget(_.map),i.clear(),i.renderBufferDirect(M,null,T,p,m,null)}function A(_,M,T,P,y,b){let D=null;const U=T.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(U!==void 0)D=U;else if(D=T.isPointLight===!0?l:o,i.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const W=D.uuid,N=M.uuid;let F=c[W];F===void 0&&(F={},c[W]=F);let V=F[N];V===void 0&&(V=D.clone(),F[N]=V),D=V}return D.visible=M.visible,D.wireframe=M.wireframe,b===Ci?D.side=M.shadowSide!==null?M.shadowSide:M.side:D.side=M.shadowSide!==null?M.shadowSide:h[M.side],D.alphaMap=M.alphaMap,D.alphaTest=M.alphaTest,D.map=M.map,D.clipShadows=M.clipShadows,D.clippingPlanes=M.clippingPlanes,D.clipIntersection=M.clipIntersection,D.displacementMap=M.displacementMap,D.displacementScale=M.displacementScale,D.displacementBias=M.displacementBias,D.wireframeLinewidth=M.wireframeLinewidth,D.linewidth=M.linewidth,T.isPointLight===!0&&D.isMeshDistanceMaterial===!0&&(D.referencePosition.setFromMatrixPosition(T.matrixWorld),D.nearDistance=P,D.farDistance=y),D}function v(_,M,T,P,y){if(_.visible===!1)return;if(_.layers.test(M.layers)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&y===Ci)&&(!_.frustumCulled||n.intersectsObject(_))){_.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,_.matrixWorld);const U=e.update(_),W=_.material;if(Array.isArray(W)){const N=U.groups;for(let F=0,V=N.length;F<V;F++){const J=N[F],ne=W[J.materialIndex];if(ne&&ne.visible){const K=A(_,ne,P,T.near,T.far,y);i.renderBufferDirect(T,null,U,K,_,J)}}}else if(W.visible){const N=A(_,W,P,T.near,T.far,y);i.renderBufferDirect(T,null,U,N,_,null)}}const D=_.children;for(let U=0,W=D.length;U<W;U++)v(D[U],M,T,P,y)}}function Fx(i,e,t){const n=t.isWebGL2;function r(){let H=!1;const G=new at;let de=null;const De=new at(0,0,0,0);return{setMask:function(Ue){de!==Ue&&!H&&(i.colorMask(Ue,Ue,Ue,Ue),de=Ue)},setLocked:function(Ue){H=Ue},setClear:function(Ue,dt,Bt,Kt,Dn){Dn===!0&&(Ue*=Kt,dt*=Kt,Bt*=Kt),G.set(Ue,dt,Bt,Kt),De.equals(G)===!1&&(i.clearColor(Ue,dt,Bt,Kt),De.copy(G))},reset:function(){H=!1,de=null,De.set(-1,0,0,0)}}}function s(){let H=!1,G=null,de=null,De=null;return{setTest:function(Ue){Ue?ye(2929):xe(2929)},setMask:function(Ue){G!==Ue&&!H&&(i.depthMask(Ue),G=Ue)},setFunc:function(Ue){if(de!==Ue){switch(Ue){case cd:i.depthFunc(512);break;case ud:i.depthFunc(519);break;case bl:i.depthFunc(513);break;case Ka:i.depthFunc(515);break;case Ja:i.depthFunc(514);break;case hd:i.depthFunc(518);break;case dd:i.depthFunc(516);break;case tc:i.depthFunc(517);break;default:i.depthFunc(515)}de=Ue}},setLocked:function(Ue){H=Ue},setClear:function(Ue){De!==Ue&&(i.clearDepth(Ue),De=Ue)},reset:function(){H=!1,G=null,de=null,De=null}}}function a(){let H=!1,G=null,de=null,De=null,Ue=null,dt=null,Bt=null,Kt=null,Dn=null;return{setTest:function(St){H||(St?ye(2960):xe(2960))},setMask:function(St){G!==St&&!H&&(i.stencilMask(St),G=St)},setFunc:function(St,yn,Pn){(de!==St||De!==yn||Ue!==Pn)&&(i.stencilFunc(St,yn,Pn),de=St,De=yn,Ue=Pn)},setOp:function(St,yn,Pn){(dt!==St||Bt!==yn||Kt!==Pn)&&(i.stencilOp(St,yn,Pn),dt=St,Bt=yn,Kt=Pn)},setLocked:function(St){H=St},setClear:function(St){Dn!==St&&(i.clearStencil(St),Dn=St)},reset:function(){H=!1,G=null,de=null,De=null,Ue=null,dt=null,Bt=null,Kt=null,Dn=null}}}const o=new r,l=new s,c=new a,u=new WeakMap,h=new WeakMap;let d={},p={},g=new WeakMap,m=[],f=null,x=!1,A=null,v=null,_=null,M=null,T=null,P=null,y=null,b=!1,D=null,U=null,W=null,N=null,F=null;const V=i.getParameter(35661);let J=!1,ne=0;const K=i.getParameter(7938);K.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(K)[1]),J=ne>=1):K.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),J=ne>=2);let ee=null,se={};const ce=i.getParameter(3088),O=i.getParameter(2978),te=new at().fromArray(ce),he=new at().fromArray(O);function j(H,G,de){const De=new Uint8Array(4),Ue=i.createTexture();i.bindTexture(H,Ue),i.texParameteri(H,10241,9728),i.texParameteri(H,10240,9728);for(let dt=0;dt<de;dt++)i.texImage2D(G+dt,0,6408,1,1,0,6408,5121,De);return Ue}const ue={};ue[3553]=j(3553,3553,1),ue[34067]=j(34067,34069,6),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),ye(2929),l.setFunc(Ka),It(!1),Lt(Mc),ye(2884),bt(qt);function ye(H){d[H]!==!0&&(i.enable(H),d[H]=!0)}function xe(H){d[H]!==!1&&(i.disable(H),d[H]=!1)}function Se(H,G){return p[H]!==G?(i.bindFramebuffer(H,G),p[H]=G,n&&(H===36009&&(p[36160]=G),H===36160&&(p[36009]=G)),!0):!1}function Ae(H,G){let de=m,De=!1;if(H)if(de=g.get(G),de===void 0&&(de=[],g.set(G,de)),H.isWebGLMultipleRenderTargets){const Ue=H.texture;if(de.length!==Ue.length||de[0]!==36064){for(let dt=0,Bt=Ue.length;dt<Bt;dt++)de[dt]=36064+dt;de.length=Ue.length,De=!0}}else de[0]!==36064&&(de[0]=36064,De=!0);else de[0]!==1029&&(de[0]=1029,De=!0);De&&(t.isWebGL2?i.drawBuffers(de):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(de))}function Le(H){return f!==H?(i.useProgram(H),f=H,!0):!1}const qe={[Xr]:32774,[Kf]:32778,[Jf]:32779};if(n)qe[Ec]=32775,qe[Cc]=32776;else{const H=e.get("EXT_blend_minmax");H!==null&&(qe[Ec]=H.MIN_EXT,qe[Cc]=H.MAX_EXT)}const et={[$f]:0,[ep]:1,[tp]:768,[od]:770,[op]:776,[sp]:774,[ip]:772,[np]:769,[ld]:771,[ap]:775,[rp]:773};function bt(H,G,de,De,Ue,dt,Bt,Kt){if(H===qt){x===!0&&(xe(3042),x=!1);return}if(x===!1&&(ye(3042),x=!0),H!==Zf){if(H!==A||Kt!==b){if((v!==Xr||T!==Xr)&&(i.blendEquation(32774),v=Xr,T=Xr),Kt)switch(H){case Jr:i.blendFuncSeparate(1,771,1,771);break;case bc:i.blendFunc(1,1);break;case Sc:i.blendFuncSeparate(0,769,0,1);break;case Tc:i.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case Jr:i.blendFuncSeparate(770,771,1,771);break;case bc:i.blendFunc(770,1);break;case Sc:i.blendFuncSeparate(0,769,0,1);break;case Tc:i.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}_=null,M=null,P=null,y=null,A=H,b=Kt}return}Ue=Ue||G,dt=dt||de,Bt=Bt||De,(G!==v||Ue!==T)&&(i.blendEquationSeparate(qe[G],qe[Ue]),v=G,T=Ue),(de!==_||De!==M||dt!==P||Bt!==y)&&(i.blendFuncSeparate(et[de],et[De],et[dt],et[Bt]),_=de,M=De,P=dt,y=Bt),A=H,b=!1}function Nt(H,G){H.side===wn?xe(2884):ye(2884);let de=H.side===Ot;G&&(de=!de),It(de),H.blending===Jr&&H.transparent===!1?bt(qt):bt(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.premultipliedAlpha),l.setFunc(H.depthFunc),l.setTest(H.depthTest),l.setMask(H.depthWrite),o.setMask(H.colorWrite);const De=H.stencilWrite;c.setTest(De),De&&(c.setMask(H.stencilWriteMask),c.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),c.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),ht(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ye(32926):xe(32926)}function It(H){D!==H&&(H?i.frontFace(2304):i.frontFace(2305),D=H)}function Lt(H){H!==Yf?(ye(2884),H!==U&&(H===Mc?i.cullFace(1029):H===qf?i.cullFace(1028):i.cullFace(1032))):xe(2884),U=H}function vt(H){H!==W&&(J&&i.lineWidth(H),W=H)}function ht(H,G,de){H?(ye(32823),(N!==G||F!==de)&&(i.polygonOffset(G,de),N=G,F=de)):xe(32823)}function fn(H){H?ye(3089):xe(3089)}function Zt(H){H===void 0&&(H=33984+V-1),ee!==H&&(i.activeTexture(H),ee=H)}function L(H,G,de){de===void 0&&(ee===null?de=33984+V-1:de=ee);let De=se[de];De===void 0&&(De={type:void 0,texture:void 0},se[de]=De),(De.type!==H||De.texture!==G)&&(ee!==de&&(i.activeTexture(de),ee=de),i.bindTexture(H,G||ue[H]),De.type=H,De.texture=G)}function E(){const H=se[ee];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ie(){try{i.compressedTexImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function we(){try{i.compressedTexImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function _e(){try{i.texSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Te(){try{i.texSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function He(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function B(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function q(){try{i.texStorage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ce(){try{i.texStorage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Me(){try{i.texImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Be(){try{i.texImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ee(H){te.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),te.copy(H))}function ke(H){he.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),he.copy(H))}function Qe(H,G){let de=h.get(G);de===void 0&&(de=new WeakMap,h.set(G,de));let De=de.get(H);De===void 0&&(De=i.getUniformBlockIndex(G,H.name),de.set(H,De))}function Xe(H,G){const De=h.get(G).get(H);u.get(G)!==De&&(i.uniformBlockBinding(G,De,H.__bindingPointIndex),u.set(G,De))}function Ye(){i.disable(3042),i.disable(2884),i.disable(2929),i.disable(32823),i.disable(3089),i.disable(2960),i.disable(32926),i.blendEquation(32774),i.blendFunc(1,0),i.blendFuncSeparate(1,0,1,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(513),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(519,0,4294967295),i.stencilOp(7680,7680,7680),i.clearStencil(0),i.cullFace(1029),i.frontFace(2305),i.polygonOffset(0,0),i.activeTexture(33984),i.bindFramebuffer(36160,null),n===!0&&(i.bindFramebuffer(36009,null),i.bindFramebuffer(36008,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},ee=null,se={},p={},g=new WeakMap,m=[],f=null,x=!1,A=null,v=null,_=null,M=null,T=null,P=null,y=null,b=!1,D=null,U=null,W=null,N=null,F=null,te.set(0,0,i.canvas.width,i.canvas.height),he.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:ye,disable:xe,bindFramebuffer:Se,drawBuffers:Ae,useProgram:Le,setBlending:bt,setMaterial:Nt,setFlipSided:It,setCullFace:Lt,setLineWidth:vt,setPolygonOffset:ht,setScissorTest:fn,activeTexture:Zt,bindTexture:L,unbindTexture:E,compressedTexImage2D:ie,compressedTexImage3D:we,texImage2D:Me,texImage3D:Be,updateUBOMapping:Qe,uniformBlockBinding:Xe,texStorage2D:q,texStorage3D:Ce,texSubImage2D:_e,texSubImage3D:Te,compressedTexSubImage2D:He,compressedTexSubImage3D:B,scissor:Ee,viewport:ke,reset:Ye}}function Ox(i,e,t,n,r,s,a){const o=r.isWebGL2,l=r.maxTextures,c=r.maxCubemapSize,u=r.maxTextureSize,h=r.maxSamples,d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let m;const f=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(L,E){return x?new OffscreenCanvas(L,E):na("canvas")}function v(L,E,ie,we){let _e=1;if((L.width>we||L.height>we)&&(_e=we/Math.max(L.width,L.height)),_e<1||E===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){const Te=E?wd:Math.floor,He=Te(_e*L.width),B=Te(_e*L.height);m===void 0&&(m=A(He,B));const q=ie?A(He,B):m;return q.width=He,q.height=B,q.getContext("2d").drawImage(L,0,0,He,B),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+He+"x"+B+")."),q}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function _(L){return Pl(L.width)&&Pl(L.height)}function M(L){return o?!1:L.wrapS!==nn||L.wrapT!==nn||L.minFilter!==Ke&&L.minFilter!==Fe}function T(L,E){return L.generateMipmaps&&E&&L.minFilter!==Ke&&L.minFilter!==Fe}function P(L){i.generateMipmap(L)}function y(L,E,ie,we,_e=!1){if(o===!1)return E;if(L!==null){if(i[L]!==void 0)return i[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Te=E;return E===6403&&(ie===5126&&(Te=33326),ie===5131&&(Te=33325),ie===5121&&(Te=33321)),E===33319&&(ie===5126&&(Te=33328),ie===5131&&(Te=33327),ie===5121&&(Te=33323)),E===6408&&(ie===5126&&(Te=34836),ie===5131&&(Te=34842),ie===5121&&(Te=we===Ne&&_e===!1?35907:32856),ie===32819&&(Te=32854),ie===32820&&(Te=32855)),(Te===33325||Te===33326||Te===33327||Te===33328||Te===34842||Te===34836)&&e.get("EXT_color_buffer_float"),Te}function b(L,E,ie){return T(L,ie)===!0||L.isFramebufferTexture&&L.minFilter!==Ke&&L.minFilter!==Fe?Math.log2(Math.max(E.width,E.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?E.mipmaps.length:1}function D(L){return L===Ke||L===Tl||L===qa?9728:9729}function U(L){const E=L.target;E.removeEventListener("dispose",U),N(E),E.isVideoTexture&&g.delete(E)}function W(L){const E=L.target;E.removeEventListener("dispose",W),V(E)}function N(L){const E=n.get(L);if(E.__webglInit===void 0)return;const ie=L.source,we=f.get(ie);if(we){const _e=we[E.__cacheKey];_e.usedTimes--,_e.usedTimes===0&&F(L),Object.keys(we).length===0&&f.delete(ie)}n.remove(L)}function F(L){const E=n.get(L);i.deleteTexture(E.__webglTexture);const ie=L.source,we=f.get(ie);delete we[E.__cacheKey],a.memory.textures--}function V(L){const E=L.texture,ie=n.get(L),we=n.get(E);if(we.__webglTexture!==void 0&&(i.deleteTexture(we.__webglTexture),a.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let _e=0;_e<6;_e++)i.deleteFramebuffer(ie.__webglFramebuffer[_e]),ie.__webglDepthbuffer&&i.deleteRenderbuffer(ie.__webglDepthbuffer[_e]);else{if(i.deleteFramebuffer(ie.__webglFramebuffer),ie.__webglDepthbuffer&&i.deleteRenderbuffer(ie.__webglDepthbuffer),ie.__webglMultisampledFramebuffer&&i.deleteFramebuffer(ie.__webglMultisampledFramebuffer),ie.__webglColorRenderbuffer)for(let _e=0;_e<ie.__webglColorRenderbuffer.length;_e++)ie.__webglColorRenderbuffer[_e]&&i.deleteRenderbuffer(ie.__webglColorRenderbuffer[_e]);ie.__webglDepthRenderbuffer&&i.deleteRenderbuffer(ie.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let _e=0,Te=E.length;_e<Te;_e++){const He=n.get(E[_e]);He.__webglTexture&&(i.deleteTexture(He.__webglTexture),a.memory.textures--),n.remove(E[_e])}n.remove(E),n.remove(L)}let J=0;function ne(){J=0}function K(){const L=J;return L>=l&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+l),J+=1,L}function ee(L){const E=[];return E.push(L.wrapS),E.push(L.wrapT),E.push(L.wrapR||0),E.push(L.magFilter),E.push(L.minFilter),E.push(L.anisotropy),E.push(L.internalFormat),E.push(L.format),E.push(L.type),E.push(L.generateMipmaps),E.push(L.premultiplyAlpha),E.push(L.flipY),E.push(L.unpackAlignment),E.push(L.encoding),E.join()}function se(L,E){const ie=n.get(L);if(L.isVideoTexture&&fn(L),L.isRenderTargetTexture===!1&&L.version>0&&ie.__version!==L.version){const we=L.image;if(we===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(we.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{xe(ie,L,E);return}}t.bindTexture(3553,ie.__webglTexture,33984+E)}function ce(L,E){const ie=n.get(L);if(L.version>0&&ie.__version!==L.version){xe(ie,L,E);return}t.bindTexture(35866,ie.__webglTexture,33984+E)}function O(L,E){const ie=n.get(L);if(L.version>0&&ie.__version!==L.version){xe(ie,L,E);return}t.bindTexture(32879,ie.__webglTexture,33984+E)}function te(L,E){const ie=n.get(L);if(L.version>0&&ie.__version!==L.version){Se(ie,L,E);return}t.bindTexture(34067,ie.__webglTexture,33984+E)}const he={[hn]:10497,[nn]:33071,[$a]:33648},j={[Ke]:9728,[Tl]:9984,[qa]:9986,[Fe]:9729,[md]:9985,[qi]:9987};function ue(L,E,ie){if(ie?(i.texParameteri(L,10242,he[E.wrapS]),i.texParameteri(L,10243,he[E.wrapT]),(L===32879||L===35866)&&i.texParameteri(L,32882,he[E.wrapR]),i.texParameteri(L,10240,j[E.magFilter]),i.texParameteri(L,10241,j[E.minFilter])):(i.texParameteri(L,10242,33071),i.texParameteri(L,10243,33071),(L===32879||L===35866)&&i.texParameteri(L,32882,33071),(E.wrapS!==nn||E.wrapT!==nn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(L,10240,D(E.magFilter)),i.texParameteri(L,10241,D(E.minFilter)),E.minFilter!==Ke&&E.minFilter!==Fe&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const we=e.get("EXT_texture_filter_anisotropic");if(E.magFilter===Ke||E.minFilter!==qa&&E.minFilter!==qi||E.type===it&&e.has("OES_texture_float_linear")===!1||o===!1&&E.type===yt&&e.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||n.get(E).__currentAnisotropy)&&(i.texParameterf(L,we.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy)}}function ye(L,E){let ie=!1;L.__webglInit===void 0&&(L.__webglInit=!0,E.addEventListener("dispose",U));const we=E.source;let _e=f.get(we);_e===void 0&&(_e={},f.set(we,_e));const Te=ee(E);if(Te!==L.__cacheKey){_e[Te]===void 0&&(_e[Te]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,ie=!0),_e[Te].usedTimes++;const He=_e[L.__cacheKey];He!==void 0&&(_e[L.__cacheKey].usedTimes--,He.usedTimes===0&&F(E)),L.__cacheKey=Te,L.__webglTexture=_e[Te].texture}return ie}function xe(L,E,ie){let we=3553;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(we=35866),E.isData3DTexture&&(we=32879);const _e=ye(L,E),Te=E.source;t.bindTexture(we,L.__webglTexture,33984+ie);const He=n.get(Te);if(Te.version!==He.__version||_e===!0){t.activeTexture(33984+ie),i.pixelStorei(37440,E.flipY),i.pixelStorei(37441,E.premultiplyAlpha),i.pixelStorei(3317,E.unpackAlignment),i.pixelStorei(37443,0);const B=M(E)&&_(E.image)===!1;let q=v(E.image,B,!1,u);q=Zt(E,q);const Ce=_(q)||o,Me=s.convert(E.format,E.encoding);let Be=s.convert(E.type),Ee=y(E.internalFormat,Me,Be,E.encoding,E.isVideoTexture);ue(we,E,Ce);let ke;const Qe=E.mipmaps,Xe=o&&E.isVideoTexture!==!0,Ye=He.__version===void 0||_e===!0,H=b(E,q,Ce);if(E.isDepthTexture)Ee=6402,o?E.type===it?Ee=36012:E.type===ji?Ee=33190:E.type===mr?Ee=35056:Ee=33189:E.type===it&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===li&&Ee===6402&&E.type!==ca&&E.type!==ji&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=ji,Be=s.convert(E.type)),E.format===xr&&Ee===6402&&(Ee=34041,E.type!==mr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=mr,Be=s.convert(E.type))),Ye&&(Xe?t.texStorage2D(3553,1,Ee,q.width,q.height):t.texImage2D(3553,0,Ee,q.width,q.height,0,Me,Be,null));else if(E.isDataTexture)if(Qe.length>0&&Ce){Xe&&Ye&&t.texStorage2D(3553,H,Ee,Qe[0].width,Qe[0].height);for(let G=0,de=Qe.length;G<de;G++)ke=Qe[G],Xe?t.texSubImage2D(3553,G,0,0,ke.width,ke.height,Me,Be,ke.data):t.texImage2D(3553,G,Ee,ke.width,ke.height,0,Me,Be,ke.data);E.generateMipmaps=!1}else Xe?(Ye&&t.texStorage2D(3553,H,Ee,q.width,q.height),t.texSubImage2D(3553,0,0,0,q.width,q.height,Me,Be,q.data)):t.texImage2D(3553,0,Ee,q.width,q.height,0,Me,Be,q.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Xe&&Ye&&t.texStorage3D(35866,H,Ee,Qe[0].width,Qe[0].height,q.depth);for(let G=0,de=Qe.length;G<de;G++)ke=Qe[G],E.format!==Ft?Me!==null?Xe?t.compressedTexSubImage3D(35866,G,0,0,0,ke.width,ke.height,q.depth,Me,ke.data,0,0):t.compressedTexImage3D(35866,G,Ee,ke.width,ke.height,q.depth,0,ke.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage3D(35866,G,0,0,0,ke.width,ke.height,q.depth,Me,Be,ke.data):t.texImage3D(35866,G,Ee,ke.width,ke.height,q.depth,0,Me,Be,ke.data)}else{Xe&&Ye&&t.texStorage2D(3553,H,Ee,Qe[0].width,Qe[0].height);for(let G=0,de=Qe.length;G<de;G++)ke=Qe[G],E.format!==Ft?Me!==null?Xe?t.compressedTexSubImage2D(3553,G,0,0,ke.width,ke.height,Me,ke.data):t.compressedTexImage2D(3553,G,Ee,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage2D(3553,G,0,0,ke.width,ke.height,Me,Be,ke.data):t.texImage2D(3553,G,Ee,ke.width,ke.height,0,Me,Be,ke.data)}else if(E.isDataArrayTexture)Xe?(Ye&&t.texStorage3D(35866,H,Ee,q.width,q.height,q.depth),t.texSubImage3D(35866,0,0,0,0,q.width,q.height,q.depth,Me,Be,q.data)):t.texImage3D(35866,0,Ee,q.width,q.height,q.depth,0,Me,Be,q.data);else if(E.isData3DTexture)Xe?(Ye&&t.texStorage3D(32879,H,Ee,q.width,q.height,q.depth),t.texSubImage3D(32879,0,0,0,0,q.width,q.height,q.depth,Me,Be,q.data)):t.texImage3D(32879,0,Ee,q.width,q.height,q.depth,0,Me,Be,q.data);else if(E.isFramebufferTexture){if(Ye)if(Xe)t.texStorage2D(3553,H,Ee,q.width,q.height);else{let G=q.width,de=q.height;for(let De=0;De<H;De++)t.texImage2D(3553,De,Ee,G,de,0,Me,Be,null),G>>=1,de>>=1}}else if(Qe.length>0&&Ce){Xe&&Ye&&t.texStorage2D(3553,H,Ee,Qe[0].width,Qe[0].height);for(let G=0,de=Qe.length;G<de;G++)ke=Qe[G],Xe?t.texSubImage2D(3553,G,0,0,Me,Be,ke):t.texImage2D(3553,G,Ee,Me,Be,ke);E.generateMipmaps=!1}else Xe?(Ye&&t.texStorage2D(3553,H,Ee,q.width,q.height),t.texSubImage2D(3553,0,0,0,Me,Be,q)):t.texImage2D(3553,0,Ee,Me,Be,q);T(E,Ce)&&P(we),He.__version=Te.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function Se(L,E,ie){if(E.image.length!==6)return;const we=ye(L,E),_e=E.source;t.bindTexture(34067,L.__webglTexture,33984+ie);const Te=n.get(_e);if(_e.version!==Te.__version||we===!0){t.activeTexture(33984+ie),i.pixelStorei(37440,E.flipY),i.pixelStorei(37441,E.premultiplyAlpha),i.pixelStorei(3317,E.unpackAlignment),i.pixelStorei(37443,0);const He=E.isCompressedTexture||E.image[0].isCompressedTexture,B=E.image[0]&&E.image[0].isDataTexture,q=[];for(let G=0;G<6;G++)!He&&!B?q[G]=v(E.image[G],!1,!0,c):q[G]=B?E.image[G].image:E.image[G],q[G]=Zt(E,q[G]);const Ce=q[0],Me=_(Ce)||o,Be=s.convert(E.format,E.encoding),Ee=s.convert(E.type),ke=y(E.internalFormat,Be,Ee,E.encoding),Qe=o&&E.isVideoTexture!==!0,Xe=Te.__version===void 0||we===!0;let Ye=b(E,Ce,Me);ue(34067,E,Me);let H;if(He){Qe&&Xe&&t.texStorage2D(34067,Ye,ke,Ce.width,Ce.height);for(let G=0;G<6;G++){H=q[G].mipmaps;for(let de=0;de<H.length;de++){const De=H[de];E.format!==Ft?Be!==null?Qe?t.compressedTexSubImage2D(34069+G,de,0,0,De.width,De.height,Be,De.data):t.compressedTexImage2D(34069+G,de,ke,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Qe?t.texSubImage2D(34069+G,de,0,0,De.width,De.height,Be,Ee,De.data):t.texImage2D(34069+G,de,ke,De.width,De.height,0,Be,Ee,De.data)}}}else{H=E.mipmaps,Qe&&Xe&&(H.length>0&&Ye++,t.texStorage2D(34067,Ye,ke,q[0].width,q[0].height));for(let G=0;G<6;G++)if(B){Qe?t.texSubImage2D(34069+G,0,0,0,q[G].width,q[G].height,Be,Ee,q[G].data):t.texImage2D(34069+G,0,ke,q[G].width,q[G].height,0,Be,Ee,q[G].data);for(let de=0;de<H.length;de++){const Ue=H[de].image[G].image;Qe?t.texSubImage2D(34069+G,de+1,0,0,Ue.width,Ue.height,Be,Ee,Ue.data):t.texImage2D(34069+G,de+1,ke,Ue.width,Ue.height,0,Be,Ee,Ue.data)}}else{Qe?t.texSubImage2D(34069+G,0,0,0,Be,Ee,q[G]):t.texImage2D(34069+G,0,ke,Be,Ee,q[G]);for(let de=0;de<H.length;de++){const De=H[de];Qe?t.texSubImage2D(34069+G,de+1,0,0,Be,Ee,De.image[G]):t.texImage2D(34069+G,de+1,ke,Be,Ee,De.image[G])}}}T(E,Me)&&P(34067),Te.__version=_e.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function Ae(L,E,ie,we,_e){const Te=s.convert(ie.format,ie.encoding),He=s.convert(ie.type),B=y(ie.internalFormat,Te,He,ie.encoding);n.get(E).__hasExternalTextures||(_e===32879||_e===35866?t.texImage3D(_e,0,B,E.width,E.height,E.depth,0,Te,He,null):t.texImage2D(_e,0,B,E.width,E.height,0,Te,He,null)),t.bindFramebuffer(36160,L),ht(E)?d.framebufferTexture2DMultisampleEXT(36160,we,_e,n.get(ie).__webglTexture,0,vt(E)):(_e===3553||_e>=34069&&_e<=34074)&&i.framebufferTexture2D(36160,we,_e,n.get(ie).__webglTexture,0),t.bindFramebuffer(36160,null)}function Le(L,E,ie){if(i.bindRenderbuffer(36161,L),E.depthBuffer&&!E.stencilBuffer){let we=33189;if(ie||ht(E)){const _e=E.depthTexture;_e&&_e.isDepthTexture&&(_e.type===it?we=36012:_e.type===ji&&(we=33190));const Te=vt(E);ht(E)?d.renderbufferStorageMultisampleEXT(36161,Te,we,E.width,E.height):i.renderbufferStorageMultisample(36161,Te,we,E.width,E.height)}else i.renderbufferStorage(36161,we,E.width,E.height);i.framebufferRenderbuffer(36160,36096,36161,L)}else if(E.depthBuffer&&E.stencilBuffer){const we=vt(E);ie&&ht(E)===!1?i.renderbufferStorageMultisample(36161,we,35056,E.width,E.height):ht(E)?d.renderbufferStorageMultisampleEXT(36161,we,35056,E.width,E.height):i.renderbufferStorage(36161,34041,E.width,E.height),i.framebufferRenderbuffer(36160,33306,36161,L)}else{const we=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let _e=0;_e<we.length;_e++){const Te=we[_e],He=s.convert(Te.format,Te.encoding),B=s.convert(Te.type),q=y(Te.internalFormat,He,B,Te.encoding),Ce=vt(E);ie&&ht(E)===!1?i.renderbufferStorageMultisample(36161,Ce,q,E.width,E.height):ht(E)?d.renderbufferStorageMultisampleEXT(36161,Ce,q,E.width,E.height):i.renderbufferStorage(36161,q,E.width,E.height)}}i.bindRenderbuffer(36161,null)}function qe(L,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,L),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),se(E.depthTexture,0);const we=n.get(E.depthTexture).__webglTexture,_e=vt(E);if(E.depthTexture.format===li)ht(E)?d.framebufferTexture2DMultisampleEXT(36160,36096,3553,we,0,_e):i.framebufferTexture2D(36160,36096,3553,we,0);else if(E.depthTexture.format===xr)ht(E)?d.framebufferTexture2DMultisampleEXT(36160,33306,3553,we,0,_e):i.framebufferTexture2D(36160,33306,3553,we,0);else throw new Error("Unknown depthTexture format")}function et(L){const E=n.get(L),ie=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!E.__autoAllocateDepthBuffer){if(ie)throw new Error("target.depthTexture not supported in Cube render targets");qe(E.__webglFramebuffer,L)}else if(ie){E.__webglDepthbuffer=[];for(let we=0;we<6;we++)t.bindFramebuffer(36160,E.__webglFramebuffer[we]),E.__webglDepthbuffer[we]=i.createRenderbuffer(),Le(E.__webglDepthbuffer[we],L,!1)}else t.bindFramebuffer(36160,E.__webglFramebuffer),E.__webglDepthbuffer=i.createRenderbuffer(),Le(E.__webglDepthbuffer,L,!1);t.bindFramebuffer(36160,null)}function bt(L,E,ie){const we=n.get(L);E!==void 0&&Ae(we.__webglFramebuffer,L,L.texture,36064,3553),ie!==void 0&&et(L)}function Nt(L){const E=L.texture,ie=n.get(L),we=n.get(E);L.addEventListener("dispose",W),L.isWebGLMultipleRenderTargets!==!0&&(we.__webglTexture===void 0&&(we.__webglTexture=i.createTexture()),we.__version=E.version,a.memory.textures++);const _e=L.isWebGLCubeRenderTarget===!0,Te=L.isWebGLMultipleRenderTargets===!0,He=_(L)||o;if(_e){ie.__webglFramebuffer=[];for(let B=0;B<6;B++)ie.__webglFramebuffer[B]=i.createFramebuffer()}else{if(ie.__webglFramebuffer=i.createFramebuffer(),Te)if(r.drawBuffers){const B=L.texture;for(let q=0,Ce=B.length;q<Ce;q++){const Me=n.get(B[q]);Me.__webglTexture===void 0&&(Me.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&L.samples>0&&ht(L)===!1){const B=Te?E:[E];ie.__webglMultisampledFramebuffer=i.createFramebuffer(),ie.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,ie.__webglMultisampledFramebuffer);for(let q=0;q<B.length;q++){const Ce=B[q];ie.__webglColorRenderbuffer[q]=i.createRenderbuffer(),i.bindRenderbuffer(36161,ie.__webglColorRenderbuffer[q]);const Me=s.convert(Ce.format,Ce.encoding),Be=s.convert(Ce.type),Ee=y(Ce.internalFormat,Me,Be,Ce.encoding,L.isXRRenderTarget===!0),ke=vt(L);i.renderbufferStorageMultisample(36161,ke,Ee,L.width,L.height),i.framebufferRenderbuffer(36160,36064+q,36161,ie.__webglColorRenderbuffer[q])}i.bindRenderbuffer(36161,null),L.depthBuffer&&(ie.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(ie.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(36160,null)}}if(_e){t.bindTexture(34067,we.__webglTexture),ue(34067,E,He);for(let B=0;B<6;B++)Ae(ie.__webglFramebuffer[B],L,E,36064,34069+B);T(E,He)&&P(34067),t.unbindTexture()}else if(Te){const B=L.texture;for(let q=0,Ce=B.length;q<Ce;q++){const Me=B[q],Be=n.get(Me);t.bindTexture(3553,Be.__webglTexture),ue(3553,Me,He),Ae(ie.__webglFramebuffer,L,Me,36064+q,3553),T(Me,He)&&P(3553)}t.unbindTexture()}else{let B=3553;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(o?B=L.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(B,we.__webglTexture),ue(B,E,He),Ae(ie.__webglFramebuffer,L,E,36064,B),T(E,He)&&P(B),t.unbindTexture()}L.depthBuffer&&et(L)}function It(L){const E=_(L)||o,ie=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let we=0,_e=ie.length;we<_e;we++){const Te=ie[we];if(T(Te,E)){const He=L.isWebGLCubeRenderTarget?34067:3553,B=n.get(Te).__webglTexture;t.bindTexture(He,B),P(He),t.unbindTexture()}}}function Lt(L){if(o&&L.samples>0&&ht(L)===!1){const E=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],ie=L.width,we=L.height;let _e=16384;const Te=[],He=L.stencilBuffer?33306:36096,B=n.get(L),q=L.isWebGLMultipleRenderTargets===!0;if(q)for(let Ce=0;Ce<E.length;Ce++)t.bindFramebuffer(36160,B.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(36160,36064+Ce,36161,null),t.bindFramebuffer(36160,B.__webglFramebuffer),i.framebufferTexture2D(36009,36064+Ce,3553,null,0);t.bindFramebuffer(36008,B.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,B.__webglFramebuffer);for(let Ce=0;Ce<E.length;Ce++){Te.push(36064+Ce),L.depthBuffer&&Te.push(He);const Me=B.__ignoreDepthValues!==void 0?B.__ignoreDepthValues:!1;if(Me===!1&&(L.depthBuffer&&(_e|=256),L.stencilBuffer&&(_e|=1024)),q&&i.framebufferRenderbuffer(36008,36064,36161,B.__webglColorRenderbuffer[Ce]),Me===!0&&(i.invalidateFramebuffer(36008,[He]),i.invalidateFramebuffer(36009,[He])),q){const Be=n.get(E[Ce]).__webglTexture;i.framebufferTexture2D(36009,36064,3553,Be,0)}i.blitFramebuffer(0,0,ie,we,0,0,ie,we,_e,9728),p&&i.invalidateFramebuffer(36008,Te)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),q)for(let Ce=0;Ce<E.length;Ce++){t.bindFramebuffer(36160,B.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(36160,36064+Ce,36161,B.__webglColorRenderbuffer[Ce]);const Me=n.get(E[Ce]).__webglTexture;t.bindFramebuffer(36160,B.__webglFramebuffer),i.framebufferTexture2D(36009,36064+Ce,3553,Me,0)}t.bindFramebuffer(36009,B.__webglMultisampledFramebuffer)}}function vt(L){return Math.min(h,L.samples)}function ht(L){const E=n.get(L);return o&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function fn(L){const E=a.render.frame;g.get(L)!==E&&(g.set(L,E),L.update())}function Zt(L,E){const ie=L.encoding,we=L.format,_e=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===Dl||ie!==dn&&(ie===Ne?o===!1?e.has("EXT_sRGB")===!0&&we===Ft?(L.format=Dl,L.minFilter=Fe,L.generateMipmaps=!1):E=_d.sRGBToLinear(E):(we!==Ft||_e!==Qt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",ie)),E}this.allocateTextureUnit=K,this.resetTextureUnits=ne,this.setTexture2D=se,this.setTexture2DArray=ce,this.setTexture3D=O,this.setTextureCube=te,this.rebindTextures=bt,this.setupRenderTarget=Nt,this.updateRenderTargetMipmap=It,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=ht}function zx(i,e,t){const n=t.isWebGL2;function r(s,a=null){let o;if(s===Qt)return 5121;if(s===vp)return 32819;if(s===xp)return 32820;if(s===pp)return 5120;if(s===mp)return 5122;if(s===ca)return 5123;if(s===gp)return 5124;if(s===ji)return 5125;if(s===it)return 5126;if(s===yt)return n?5131:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===wp)return 6406;if(s===Ft)return 6408;if(s===yp)return 6409;if(s===_p)return 6410;if(s===li)return 6402;if(s===xr)return 34041;if(s===Dl)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===eo)return 6403;if(s===Ap)return 36244;if(s===Mp)return 33319;if(s===bp)return 33320;if(s===Sp)return 36249;if(s===Co||s===Do||s===Po||s===Ro)if(a===Ne)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Co)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Do)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Po)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Ro)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Co)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Do)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Po)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Ro)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Pc||s===Rc||s===Ic||s===Lc)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Pc)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Rc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ic)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Lc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Tp)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Bc||s===Uc)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Bc)return a===Ne?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Uc)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Nc||s===Fc||s===Oc||s===zc||s===kc||s===Gc||s===Hc||s===Vc||s===Wc||s===jc||s===Xc||s===Yc||s===qc||s===Qc)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Nc)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Fc)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Oc)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===zc)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===kc)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Gc)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Hc)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Vc)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Wc)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===jc)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Xc)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Yc)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===qc)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Qc)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Io)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===Io)return a===Ne?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(s===Ep||s===Zc||s===Kc||s===Jc)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===Io)return o.COMPRESSED_RED_RGTC1_EXT;if(s===Zc)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Kc)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Jc)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===mr?n?34042:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class kx extends Tt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}let Mn=class extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}};const Gx={type:"move"};class il{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const m of e.hand.values()){const f=t.getJointPose(m,n),x=this._getHandJoint(c,m);f!==null&&(x.matrix.fromArray(f.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.jointRadius=f.radius),x.visible=f!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Gx)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Mn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Sr extends Ct{constructor(e,t,n,r,s,a,o,l,c,u){if(u=u!==void 0?u:li,u!==li&&u!==xr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===li&&(n=ji),n===void 0&&u===xr&&(n=mr),super(null,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Ke,this.minFilter=l!==void 0?l:Ke,this.flipY=!1,this.generateMipmaps=!1}}class Hx extends fi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,p=null,g=null;const m=t.getContextAttributes();let f=null,x=null;const A=[],v=[],_=new Set,M=new Map,T=new Tt;T.layers.enable(1),T.viewport=new at;const P=new Tt;P.layers.enable(2),P.viewport=new at;const y=[T,P],b=new kx;b.layers.enable(1),b.layers.enable(2);let D=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let te=A[O];return te===void 0&&(te=new il,A[O]=te),te.getTargetRaySpace()},this.getControllerGrip=function(O){let te=A[O];return te===void 0&&(te=new il,A[O]=te),te.getGripSpace()},this.getHand=function(O){let te=A[O];return te===void 0&&(te=new il,A[O]=te),te.getHandSpace()};function W(O){const te=v.indexOf(O.inputSource);if(te===-1)return;const he=A[te];he!==void 0&&he.dispatchEvent({type:O.type,data:O.inputSource})}function N(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",N),r.removeEventListener("inputsourceschange",F);for(let O=0;O<A.length;O++){const te=v[O];te!==null&&(v[O]=null,A[O].disconnect(te))}D=null,U=null,e.setRenderTarget(f),p=null,d=null,h=null,r=null,x=null,ce.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){s=O,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){o=O,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(O){c=O},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(O){if(r=O,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",N),r.addEventListener("inputsourceschange",F),m.xrCompatible!==!0&&await t.makeXRCompatible(),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const te={antialias:r.renderState.layers===void 0?m.antialias:!0,alpha:m.alpha,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,te),r.updateRenderState({baseLayer:p}),x=new ut(p.framebufferWidth,p.framebufferHeight,{format:Ft,type:Qt,encoding:e.outputEncoding,stencilBuffer:m.stencil})}else{let te=null,he=null,j=null;m.depth&&(j=m.stencil?35056:33190,te=m.stencil?xr:li,he=m.stencil?mr:ji);const ue={colorFormat:32856,depthFormat:j,scaleFactor:s};h=new XRWebGLBinding(r,t),d=h.createProjectionLayer(ue),r.updateRenderState({layers:[d]}),x=new ut(d.textureWidth,d.textureHeight,{format:Ft,type:Qt,depthTexture:new Sr(d.textureWidth,d.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:m.stencil,encoding:e.outputEncoding,samples:m.antialias?4:0});const ye=e.properties.get(x);ye.__ignoreDepthValues=d.ignoreDepthValues}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ce.setContext(r),ce.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function F(O){for(let te=0;te<O.removed.length;te++){const he=O.removed[te],j=v.indexOf(he);j>=0&&(v[j]=null,A[j].disconnect(he))}for(let te=0;te<O.added.length;te++){const he=O.added[te];let j=v.indexOf(he);if(j===-1){for(let ye=0;ye<A.length;ye++)if(ye>=v.length){v.push(he),j=ye;break}else if(v[ye]===null){v[ye]=he,j=ye;break}if(j===-1)break}const ue=A[j];ue&&ue.connect(he)}}const V=new I,J=new I;function ne(O,te,he){V.setFromMatrixPosition(te.matrixWorld),J.setFromMatrixPosition(he.matrixWorld);const j=V.distanceTo(J),ue=te.projectionMatrix.elements,ye=he.projectionMatrix.elements,xe=ue[14]/(ue[10]-1),Se=ue[14]/(ue[10]+1),Ae=(ue[9]+1)/ue[5],Le=(ue[9]-1)/ue[5],qe=(ue[8]-1)/ue[0],et=(ye[8]+1)/ye[0],bt=xe*qe,Nt=xe*et,It=j/(-qe+et),Lt=It*-qe;te.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(Lt),O.translateZ(It),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert();const vt=xe+It,ht=Se+It,fn=bt-Lt,Zt=Nt+(j-Lt),L=Ae*Se/ht*vt,E=Le*Se/ht*vt;O.projectionMatrix.makePerspective(fn,Zt,L,E,vt,ht)}function K(O,te){te===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(te.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(r===null)return;b.near=P.near=T.near=O.near,b.far=P.far=T.far=O.far,(D!==b.near||U!==b.far)&&(r.updateRenderState({depthNear:b.near,depthFar:b.far}),D=b.near,U=b.far);const te=O.parent,he=b.cameras;K(b,te);for(let ue=0;ue<he.length;ue++)K(he[ue],te);b.matrixWorld.decompose(b.position,b.quaternion,b.scale),O.matrix.copy(b.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale);const j=O.children;for(let ue=0,ye=j.length;ue<ye;ue++)j[ue].updateMatrixWorld(!0);he.length===2?ne(b,T,P):b.projectionMatrix.copy(T.projectionMatrix)},this.getCamera=function(){return b},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(O){l=O,d!==null&&(d.fixedFoveation=O),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=O)},this.getPlanes=function(){return _};let ee=null;function se(O,te){if(u=te.getViewerPose(c||a),g=te,u!==null){const he=u.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let j=!1;he.length!==b.cameras.length&&(b.cameras.length=0,j=!0);for(let ue=0;ue<he.length;ue++){const ye=he[ue];let xe=null;if(p!==null)xe=p.getViewport(ye);else{const Ae=h.getViewSubImage(d,ye);xe=Ae.viewport,ue===0&&(e.setRenderTargetTextures(x,Ae.colorTexture,d.ignoreDepthValues?void 0:Ae.depthStencilTexture),e.setRenderTarget(x))}let Se=y[ue];Se===void 0&&(Se=new Tt,Se.layers.enable(ue),Se.viewport=new at,y[ue]=Se),Se.matrix.fromArray(ye.transform.matrix),Se.projectionMatrix.fromArray(ye.projectionMatrix),Se.viewport.set(xe.x,xe.y,xe.width,xe.height),ue===0&&b.matrix.copy(Se.matrix),j===!0&&b.cameras.push(Se)}}for(let he=0;he<A.length;he++){const j=v[he],ue=A[he];j!==null&&ue!==void 0&&ue.update(j,te,c||a)}if(ee&&ee(O,te),te.detectedPlanes){n.dispatchEvent({type:"planesdetected",data:te.detectedPlanes});let he=null;for(const j of _)te.detectedPlanes.has(j)||(he===null&&(he=[]),he.push(j));if(he!==null)for(const j of he)_.delete(j),M.delete(j),n.dispatchEvent({type:"planeremoved",data:j});for(const j of te.detectedPlanes)if(!_.has(j))_.add(j),M.set(j,te.lastChangedTime),n.dispatchEvent({type:"planeadded",data:j});else{const ue=M.get(j);j.lastChangedTime>ue&&(M.set(j,j.lastChangedTime),n.dispatchEvent({type:"planechanged",data:j}))}}g=null}const ce=new Dd;ce.setAnimationLoop(se),this.setAnimationLoop=function(O){ee=O},this.dispose=function(){}}}function Vx(i,e){function t(m,f){f.color.getRGB(m.fogColor.value,Ed(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function n(m,f,x,A,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),c(m,f)):f.isMeshStandardMaterial?(r(m,f),h(m,f),f.isMeshPhysicalMaterial&&d(m,f,v)):f.isMeshMatcapMaterial?(r(m,f),p(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),g(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(s(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?o(m,f,x,A):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map),f.alphaMap&&(m.alphaMap.value=f.alphaMap),f.bumpMap&&(m.bumpMap.value=f.bumpMap,m.bumpScale.value=f.bumpScale,f.side===Ot&&(m.bumpScale.value*=-1)),f.displacementMap&&(m.displacementMap.value=f.displacementMap,m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap),f.normalMap&&(m.normalMap.value=f.normalMap,m.normalScale.value.copy(f.normalScale),f.side===Ot&&m.normalScale.value.negate()),f.specularMap&&(m.specularMap.value=f.specularMap),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const x=e.get(f).envMap;if(x&&(m.envMap.value=x,m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const _=i.useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*_}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity);let A;f.map?A=f.map:f.specularMap?A=f.specularMap:f.displacementMap?A=f.displacementMap:f.normalMap?A=f.normalMap:f.bumpMap?A=f.bumpMap:f.roughnessMap?A=f.roughnessMap:f.metalnessMap?A=f.metalnessMap:f.alphaMap?A=f.alphaMap:f.emissiveMap?A=f.emissiveMap:f.clearcoatMap?A=f.clearcoatMap:f.clearcoatNormalMap?A=f.clearcoatNormalMap:f.clearcoatRoughnessMap?A=f.clearcoatRoughnessMap:f.iridescenceMap?A=f.iridescenceMap:f.iridescenceThicknessMap?A=f.iridescenceThicknessMap:f.specularIntensityMap?A=f.specularIntensityMap:f.specularColorMap?A=f.specularColorMap:f.transmissionMap?A=f.transmissionMap:f.thicknessMap?A=f.thicknessMap:f.sheenColorMap?A=f.sheenColorMap:f.sheenRoughnessMap&&(A=f.sheenRoughnessMap),A!==void 0&&(A.isWebGLRenderTarget&&(A=A.texture),A.matrixAutoUpdate===!0&&A.updateMatrix(),m.uvTransform.value.copy(A.matrix));let v;f.aoMap?v=f.aoMap:f.lightMap&&(v=f.lightMap),v!==void 0&&(v.isWebGLRenderTarget&&(v=v.texture),v.matrixAutoUpdate===!0&&v.updateMatrix(),m.uv2Transform.value.copy(v.matrix))}function s(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function o(m,f,x,A){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*x,m.scale.value=A*.5,f.map&&(m.map.value=f.map),f.alphaMap&&(m.alphaMap.value=f.alphaMap),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let v;f.map?v=f.map:f.alphaMap&&(v=f.alphaMap),v!==void 0&&(v.matrixAutoUpdate===!0&&v.updateMatrix(),m.uvTransform.value.copy(v.matrix))}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map),f.alphaMap&&(m.alphaMap.value=f.alphaMap),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let x;f.map?x=f.map:f.alphaMap&&(x=f.alphaMap),x!==void 0&&(x.matrixAutoUpdate===!0&&x.updateMatrix(),m.uvTransform.value.copy(x.matrix))}function c(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.roughness.value=f.roughness,m.metalness.value=f.metalness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap),f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function d(m,f,x){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap)),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap),f.clearcoatNormalMap&&(m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),m.clearcoatNormalMap.value=f.clearcoatNormalMap,f.side===Ot&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap)),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap)}function p(m,f){f.matcap&&(m.matcap.value=f.matcap)}function g(m,f){m.referencePosition.value.copy(f.referencePosition),m.nearDistance.value=f.nearDistance,m.farDistance.value=f.farDistance}return{refreshFogUniforms:t,refreshMaterialUniforms:n}}function Wx(i,e,t,n){let r={},s={},a=[];const o=t.isWebGL2?i.getParameter(35375):0;function l(A,v){const _=v.program;n.uniformBlockBinding(A,_)}function c(A,v){let _=r[A.id];_===void 0&&(g(A),_=u(A),r[A.id]=_,A.addEventListener("dispose",f));const M=v.program;n.updateUBOMapping(A,M);const T=e.render.frame;s[A.id]!==T&&(d(A),s[A.id]=T)}function u(A){const v=h();A.__bindingPointIndex=v;const _=i.createBuffer(),M=A.__size,T=A.usage;return i.bindBuffer(35345,_),i.bufferData(35345,M,T),i.bindBuffer(35345,null),i.bindBufferBase(35345,v,_),_}function h(){for(let A=0;A<o;A++)if(a.indexOf(A)===-1)return a.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(A){const v=r[A.id],_=A.uniforms,M=A.__cache;i.bindBuffer(35345,v);for(let T=0,P=_.length;T<P;T++){const y=_[T];if(p(y,T,M)===!0){const b=y.__offset,D=Array.isArray(y.value)?y.value:[y.value];let U=0;for(let W=0;W<D.length;W++){const N=D[W],F=m(N);typeof N=="number"?(y.__data[0]=N,i.bufferSubData(35345,b+U,y.__data)):N.isMatrix3?(y.__data[0]=N.elements[0],y.__data[1]=N.elements[1],y.__data[2]=N.elements[2],y.__data[3]=N.elements[0],y.__data[4]=N.elements[3],y.__data[5]=N.elements[4],y.__data[6]=N.elements[5],y.__data[7]=N.elements[0],y.__data[8]=N.elements[6],y.__data[9]=N.elements[7],y.__data[10]=N.elements[8],y.__data[11]=N.elements[0]):(N.toArray(y.__data,U),U+=F.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(35345,b,y.__data)}}i.bindBuffer(35345,null)}function p(A,v,_){const M=A.value;if(_[v]===void 0){if(typeof M=="number")_[v]=M;else{const T=Array.isArray(M)?M:[M],P=[];for(let y=0;y<T.length;y++)P.push(T[y].clone());_[v]=P}return!0}else if(typeof M=="number"){if(_[v]!==M)return _[v]=M,!0}else{const T=Array.isArray(_[v])?_[v]:[_[v]],P=Array.isArray(M)?M:[M];for(let y=0;y<T.length;y++){const b=T[y];if(b.equals(P[y])===!1)return b.copy(P[y]),!0}}return!1}function g(A){const v=A.uniforms;let _=0;const M=16;let T=0;for(let P=0,y=v.length;P<y;P++){const b=v[P],D={boundary:0,storage:0},U=Array.isArray(b.value)?b.value:[b.value];for(let W=0,N=U.length;W<N;W++){const F=U[W],V=m(F);D.boundary+=V.boundary,D.storage+=V.storage}if(b.__data=new Float32Array(D.storage/Float32Array.BYTES_PER_ELEMENT),b.__offset=_,P>0){T=_%M;const W=M-T;T!==0&&W-D.boundary<0&&(_+=M-T,b.__offset=_)}_+=D.storage}return T=_%M,T>0&&(_+=M-T),A.__size=_,A.__cache={},this}function m(A){const v={boundary:0,storage:0};return typeof A=="number"?(v.boundary=4,v.storage=4):A.isVector2?(v.boundary=8,v.storage=8):A.isVector3||A.isColor?(v.boundary=16,v.storage=12):A.isVector4?(v.boundary=16,v.storage=16):A.isMatrix3?(v.boundary=48,v.storage=48):A.isMatrix4?(v.boundary=64,v.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),v}function f(A){const v=A.target;v.removeEventListener("dispose",f);const _=a.indexOf(v.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function x(){for(const A in r)i.deleteBuffer(r[A]);a=[],r={},s={}}return{bind:l,update:c,dispose:x}}function jx(){const i=na("canvas");return i.style.display="block",i}function Ki(i={}){this.isWebGLRenderer=!0;const e=i.canvas!==void 0?i.canvas:jx(),t=i.context!==void 0?i.context:null,n=i.depth!==void 0?i.depth:!0,r=i.stencil!==void 0?i.stencil:!0,s=i.antialias!==void 0?i.antialias:!1,a=i.premultipliedAlpha!==void 0?i.premultipliedAlpha:!0,o=i.preserveDrawingBuffer!==void 0?i.preserveDrawingBuffer:!1,l=i.powerPreference!==void 0?i.powerPreference:"default",c=i.failIfMajorPerformanceCaveat!==void 0?i.failIfMajorPerformanceCaveat:!1;let u;t!==null?u=t.getContextAttributes().alpha:u=i.alpha!==void 0?i.alpha:!1;let h=null,d=null;const p=[],g=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=dn,this.useLegacyLights=!0,this.toneMapping=qn,this.toneMappingExposure=1;const m=this;let f=!1,x=0,A=0,v=null,_=-1,M=null;const T=new at,P=new at;let y=null,b=e.width,D=e.height,U=1,W=null,N=null;const F=new at(0,0,b,D),V=new at(0,0,b,D);let J=!1;const ne=new sc;let K=!1,ee=!1,se=null;const ce=new ze,O=new I,te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function he(){return v===null?U:1}let j=t;function ue(C,Q){for(let $=0;$<C.length;$++){const z=C[$],re=e.getContext(z,Q);if(re!==null)return re}return null}try{const C={alpha:!0,depth:n,stencil:r,antialias:s,premultipliedAlpha:a,preserveDrawingBuffer:o,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${us}`),e.addEventListener("webglcontextlost",Be,!1),e.addEventListener("webglcontextrestored",Ee,!1),e.addEventListener("webglcontextcreationerror",ke,!1),j===null){const Q=["webgl2","webgl","experimental-webgl"];if(m.isWebGL1Renderer===!0&&Q.shift(),j=ue(Q,C),j===null)throw ue(Q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}j.getShaderPrecisionFormat===void 0&&(j.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let ye,xe,Se,Ae,Le,qe,et,bt,Nt,It,Lt,vt,ht,fn,Zt,L,E,ie,we,_e,Te,He,B,q;function Ce(){ye=new r0(j),xe=new Jv(j,ye,i),ye.init(xe),He=new zx(j,ye,xe),Se=new Fx(j,ye,xe),Ae=new o0,Le=new bx,qe=new Ox(j,ye,Se,Le,xe,He,Ae),et=new e0(m),bt=new i0(m),Nt=new mm(j,xe),B=new Zv(j,ye,Nt,xe),It=new s0(j,Nt,Ae,B),Lt=new h0(j,It,Nt,Ae),we=new u0(j,xe,qe),L=new $v(Le),vt=new Mx(m,et,bt,ye,xe,B,L),ht=new Vx(m,Le),fn=new Tx,Zt=new Ix(ye,xe),ie=new Qv(m,et,bt,Se,Lt,u,a),E=new Nx(m,Lt,xe),q=new Wx(j,Ae,xe,Se),_e=new Kv(j,ye,Ae,xe),Te=new a0(j,ye,Ae,xe),Ae.programs=vt.programs,m.capabilities=xe,m.extensions=ye,m.properties=Le,m.renderLists=fn,m.shadowMap=E,m.state=Se,m.info=Ae}Ce();const Me=new Hx(m,j);this.xr=Me,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const C=ye.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=ye.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(C){C!==void 0&&(U=C,this.setSize(b,D,!1))},this.getSize=function(C){return C.set(b,D)},this.setSize=function(C,Q,$=!0){if(Me.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}b=C,D=Q,e.width=Math.floor(C*U),e.height=Math.floor(Q*U),$===!0&&(e.style.width=C+"px",e.style.height=Q+"px"),this.setViewport(0,0,C,Q)},this.getDrawingBufferSize=function(C){return C.set(b*U,D*U).floor()},this.setDrawingBufferSize=function(C,Q,$){b=C,D=Q,U=$,e.width=Math.floor(C*$),e.height=Math.floor(Q*$),this.setViewport(0,0,C,Q)},this.getCurrentViewport=function(C){return C.copy(T)},this.getViewport=function(C){return C.copy(F)},this.setViewport=function(C,Q,$,z){C.isVector4?F.set(C.x,C.y,C.z,C.w):F.set(C,Q,$,z),Se.viewport(T.copy(F).multiplyScalar(U).floor())},this.getScissor=function(C){return C.copy(V)},this.setScissor=function(C,Q,$,z){C.isVector4?V.set(C.x,C.y,C.z,C.w):V.set(C,Q,$,z),Se.scissor(P.copy(V).multiplyScalar(U).floor())},this.getScissorTest=function(){return J},this.setScissorTest=function(C){Se.setScissorTest(J=C)},this.setOpaqueSort=function(C){W=C},this.setTransparentSort=function(C){N=C},this.getClearColor=function(C){return C.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor.apply(ie,arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha.apply(ie,arguments)},this.clear=function(C=!0,Q=!0,$=!0){let z=0;C&&(z|=16384),Q&&(z|=256),$&&(z|=1024),j.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Be,!1),e.removeEventListener("webglcontextrestored",Ee,!1),e.removeEventListener("webglcontextcreationerror",ke,!1),fn.dispose(),Zt.dispose(),Le.dispose(),et.dispose(),bt.dispose(),Lt.dispose(),B.dispose(),q.dispose(),vt.dispose(),Me.dispose(),Me.removeEventListener("sessionstart",de),Me.removeEventListener("sessionend",De),se&&(se.dispose(),se=null),Ue.stop()};function Be(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),f=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),f=!1;const C=Ae.autoReset,Q=E.enabled,$=E.autoUpdate,z=E.needsUpdate,re=E.type;Ce(),Ae.autoReset=C,E.enabled=Q,E.autoUpdate=$,E.needsUpdate=z,E.type=re}function ke(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Qe(C){const Q=C.target;Q.removeEventListener("dispose",Qe),Xe(Q)}function Xe(C){Ye(C),Le.remove(C)}function Ye(C){const Q=Le.get(C).programs;Q!==void 0&&(Q.forEach(function($){vt.releaseProgram($)}),C.isShaderMaterial&&vt.releaseShaderCache(C))}this.renderBufferDirect=function(C,Q,$,z,re,Ve){Q===null&&(Q=te);const w=re.isMesh&&re.matrixWorld.determinant()<0,S=So(C,Q,$,z,re);Se.setMaterial(z,w);let R=$.index,k=1;z.wireframe===!0&&(R=It.getWireframeAttribute($),k=2);const Z=$.drawRange,Y=$.attributes.position;let ae=Z.start*k,fe=(Z.start+Z.count)*k;Ve!==null&&(ae=Math.max(ae,Ve.start*k),fe=Math.min(fe,(Ve.start+Ve.count)*k)),R!==null?(ae=Math.max(ae,0),fe=Math.min(fe,R.count)):Y!=null&&(ae=Math.max(ae,0),fe=Math.min(fe,Y.count));const ve=fe-ae;if(ve<0||ve===1/0)return;B.setup(re,z,S,$,R);let oe,le=_e;if(R!==null&&(oe=Nt.get(R),le=Te,le.setIndex(oe)),re.isMesh)z.wireframe===!0?(Se.setLineWidth(z.wireframeLinewidth*he()),le.setMode(1)):le.setMode(4);else if(re.isLine){let pe=z.linewidth;pe===void 0&&(pe=1),Se.setLineWidth(pe*he()),re.isLineSegments?le.setMode(1):re.isLineLoop?le.setMode(2):le.setMode(3)}else re.isPoints?le.setMode(0):re.isSprite&&le.setMode(4);if(re.isInstancedMesh)le.renderInstances(ae,ve,re.count);else if($.isInstancedBufferGeometry){const pe=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Re=Math.min($.instanceCount,pe);le.renderInstances(ae,ve,Re)}else le.render(ae,ve)},this.compile=function(C,Q){function $(z,re,Ve){z.transparent===!0&&z.side===wn&&z.forceSinglePass===!1?(z.side=Ot,z.needsUpdate=!0,yn(z,re,Ve),z.side=ui,z.needsUpdate=!0,yn(z,re,Ve),z.side=wn):yn(z,re,Ve)}d=Zt.get(C),d.init(),g.push(d),C.traverseVisible(function(z){z.isLight&&z.layers.test(Q.layers)&&(d.pushLight(z),z.castShadow&&d.pushShadow(z))}),d.setupLights(m.useLegacyLights),C.traverse(function(z){const re=z.material;if(re)if(Array.isArray(re))for(let Ve=0;Ve<re.length;Ve++){const w=re[Ve];$(w,C,z)}else $(re,C,z)}),g.pop(),d=null};let H=null;function G(C){H&&H(C)}function de(){Ue.stop()}function De(){Ue.start()}const Ue=new Dd;Ue.setAnimationLoop(G),typeof self<"u"&&Ue.setContext(self),this.setAnimationLoop=function(C){H=C,Me.setAnimationLoop(C),C===null?Ue.stop():Ue.start()},Me.addEventListener("sessionstart",de),Me.addEventListener("sessionend",De),this.render=function(C,Q){if(Q!==void 0&&Q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(f===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),Q.parent===null&&Q.matrixWorldAutoUpdate===!0&&Q.updateMatrixWorld(),Me.enabled===!0&&Me.isPresenting===!0&&(Me.cameraAutoUpdate===!0&&Me.updateCamera(Q),Q=Me.getCamera()),C.isScene===!0&&C.onBeforeRender(m,C,Q,v),d=Zt.get(C,g.length),d.init(),g.push(d),ce.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),ne.setFromProjectionMatrix(ce),ee=this.localClippingEnabled,K=L.init(this.clippingPlanes,ee),h=fn.get(C,p.length),h.init(),p.push(h),dt(C,Q,0,m.sortObjects),h.finish(),m.sortObjects===!0&&h.sort(W,N),K===!0&&L.beginShadows();const $=d.state.shadowsArray;if(E.render($,C,Q),K===!0&&L.endShadows(),this.info.autoReset===!0&&this.info.reset(),ie.render(h,C),d.setupLights(m.useLegacyLights),Q.isArrayCamera){const z=Q.cameras;for(let re=0,Ve=z.length;re<Ve;re++){const w=z[re];Bt(h,C,w,w.viewport)}}else Bt(h,C,Q);v!==null&&(qe.updateMultisampleRenderTarget(v),qe.updateRenderTargetMipmap(v)),C.isScene===!0&&C.onAfterRender(m,C,Q),B.resetDefaultState(),_=-1,M=null,g.pop(),g.length>0?d=g[g.length-1]:d=null,p.pop(),p.length>0?h=p[p.length-1]:h=null};function dt(C,Q,$,z){if(C.visible===!1)return;if(C.layers.test(Q.layers)){if(C.isGroup)$=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(Q);else if(C.isLight)d.pushLight(C),C.castShadow&&d.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||ne.intersectsSprite(C)){z&&O.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ce);const w=Lt.update(C),S=C.material;S.visible&&h.push(C,w,S,$,O.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(C.isSkinnedMesh&&C.skeleton.frame!==Ae.render.frame&&(C.skeleton.update(),C.skeleton.frame=Ae.render.frame),!C.frustumCulled||ne.intersectsObject(C))){z&&O.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ce);const w=Lt.update(C),S=C.material;if(Array.isArray(S)){const R=w.groups;for(let k=0,Z=R.length;k<Z;k++){const Y=R[k],ae=S[Y.materialIndex];ae&&ae.visible&&h.push(C,w,ae,$,O.z,Y)}}else S.visible&&h.push(C,w,S,$,O.z,null)}}const Ve=C.children;for(let w=0,S=Ve.length;w<S;w++)dt(Ve[w],Q,$,z)}function Bt(C,Q,$,z){const re=C.opaque,Ve=C.transmissive,w=C.transparent;d.setupLightsView($),K===!0&&L.setGlobalState(m.clippingPlanes,$),Ve.length>0&&Kt(re,Q,$),z&&Se.viewport(T.copy(z)),re.length>0&&Dn(re,Q,$),Ve.length>0&&Dn(Ve,Q,$),w.length>0&&Dn(w,Q,$),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function Kt(C,Q,$){const z=xe.isWebGL2;se===null&&(se=new ut(1024,1024,{generateMipmaps:!0,type:ye.has("EXT_color_buffer_half_float")?yt:Qt,minFilter:qi,samples:z&&s===!0?4:0}));const re=m.getRenderTarget();m.setRenderTarget(se),m.clear();const Ve=m.toneMapping;m.toneMapping=qn,Dn(C,Q,$),m.toneMapping=Ve,qe.updateMultisampleRenderTarget(se),qe.updateRenderTargetMipmap(se),m.setRenderTarget(re)}function Dn(C,Q,$){const z=Q.isScene===!0?Q.overrideMaterial:null;for(let re=0,Ve=C.length;re<Ve;re++){const w=C[re],S=w.object,R=w.geometry,k=z===null?w.material:z,Z=w.group;S.layers.test($.layers)&&St(S,Q,$,R,k,Z)}}function St(C,Q,$,z,re,Ve){C.onBeforeRender(m,Q,$,z,re,Ve),C.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),re.onBeforeRender(m,Q,$,z,C,Ve),re.transparent===!0&&re.side===wn&&re.forceSinglePass===!1?(re.side=Ot,re.needsUpdate=!0,m.renderBufferDirect($,Q,z,re,C,Ve),re.side=ui,re.needsUpdate=!0,m.renderBufferDirect($,Q,z,re,C,Ve),re.side=wn):m.renderBufferDirect($,Q,z,re,C,Ve),C.onAfterRender(m,Q,$,z,re,Ve)}function yn(C,Q,$){Q.isScene!==!0&&(Q=te);const z=Le.get(C),re=d.state.lights,Ve=d.state.shadowsArray,w=re.state.version,S=vt.getParameters(C,re.state,Ve,Q,$),R=vt.getProgramCacheKey(S);let k=z.programs;z.environment=C.isMeshStandardMaterial?Q.environment:null,z.fog=Q.fog,z.envMap=(C.isMeshStandardMaterial?bt:et).get(C.envMap||z.environment),k===void 0&&(C.addEventListener("dispose",Qe),k=new Map,z.programs=k);let Z=k.get(R);if(Z!==void 0){if(z.currentProgram===Z&&z.lightsStateVersion===w)return Pn(C,S),Z}else S.uniforms=vt.getUniforms(C),C.onBuild($,S,m),C.onBeforeCompile(S,m),Z=vt.acquireProgram(S,R),k.set(R,Z),z.uniforms=S.uniforms;const Y=z.uniforms;(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Y.clippingPlanes=L.uniform),Pn(C,S),z.needsLights=Tr(C),z.lightsStateVersion=w,z.needsLights&&(Y.ambientLightColor.value=re.state.ambient,Y.lightProbe.value=re.state.probe,Y.directionalLights.value=re.state.directional,Y.directionalLightShadows.value=re.state.directionalShadow,Y.spotLights.value=re.state.spot,Y.spotLightShadows.value=re.state.spotShadow,Y.rectAreaLights.value=re.state.rectArea,Y.ltc_1.value=re.state.rectAreaLTC1,Y.ltc_2.value=re.state.rectAreaLTC2,Y.pointLights.value=re.state.point,Y.pointLightShadows.value=re.state.pointShadow,Y.hemisphereLights.value=re.state.hemi,Y.directionalShadowMap.value=re.state.directionalShadowMap,Y.directionalShadowMatrix.value=re.state.directionalShadowMatrix,Y.spotShadowMap.value=re.state.spotShadowMap,Y.spotLightMatrix.value=re.state.spotLightMatrix,Y.spotLightMap.value=re.state.spotLightMap,Y.pointShadowMap.value=re.state.pointShadowMap,Y.pointShadowMatrix.value=re.state.pointShadowMatrix);const ae=Z.getUniforms(),fe=Qa.seqWithValue(ae.seq,Y);return z.currentProgram=Z,z.uniformsList=fe,Z}function Pn(C,Q){const $=Le.get(C);$.outputEncoding=Q.outputEncoding,$.instancing=Q.instancing,$.skinning=Q.skinning,$.morphTargets=Q.morphTargets,$.morphNormals=Q.morphNormals,$.morphColors=Q.morphColors,$.morphTargetsCount=Q.morphTargetsCount,$.numClippingPlanes=Q.numClippingPlanes,$.numIntersection=Q.numClipIntersection,$.vertexAlphas=Q.vertexAlphas,$.vertexTangents=Q.vertexTangents,$.toneMapping=Q.toneMapping}function So(C,Q,$,z,re){Q.isScene!==!0&&(Q=te),qe.resetTextureUnits();const Ve=Q.fog,w=z.isMeshStandardMaterial?Q.environment:null,S=v===null?m.outputEncoding:v.isXRRenderTarget===!0?v.texture.encoding:dn,R=(z.isMeshStandardMaterial?bt:et).get(z.envMap||w),k=z.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Z=!!z.normalMap&&!!$.attributes.tangent,Y=!!$.morphAttributes.position,ae=!!$.morphAttributes.normal,fe=!!$.morphAttributes.color,ve=z.toneMapped?m.toneMapping:qn,oe=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,le=oe!==void 0?oe.length:0,pe=Le.get(z),Re=d.state.lights;if(K===!0&&(ee===!0||C!==M)){const Je=C===M&&z.id===_;L.setState(z,C,Je)}let Pe=!1;z.version===pe.__version?(pe.needsLights&&pe.lightsStateVersion!==Re.state.version||pe.outputEncoding!==S||re.isInstancedMesh&&pe.instancing===!1||!re.isInstancedMesh&&pe.instancing===!0||re.isSkinnedMesh&&pe.skinning===!1||!re.isSkinnedMesh&&pe.skinning===!0||pe.envMap!==R||z.fog===!0&&pe.fog!==Ve||pe.numClippingPlanes!==void 0&&(pe.numClippingPlanes!==L.numPlanes||pe.numIntersection!==L.numIntersection)||pe.vertexAlphas!==k||pe.vertexTangents!==Z||pe.morphTargets!==Y||pe.morphNormals!==ae||pe.morphColors!==fe||pe.toneMapping!==ve||xe.isWebGL2===!0&&pe.morphTargetsCount!==le)&&(Pe=!0):(Pe=!0,pe.__version=z.version);let je=pe.currentProgram;Pe===!0&&(je=yn(z,Q,re));let Oe=!1,Ge=!1,Ze=!1;const tt=je.getUniforms(),ot=pe.uniforms;if(Se.useProgram(je.program)&&(Oe=!0,Ge=!0,Ze=!0),z.id!==_&&(_=z.id,Ge=!0),Oe||M!==C){if(tt.setValue(j,"projectionMatrix",C.projectionMatrix),xe.logarithmicDepthBuffer&&tt.setValue(j,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),M!==C&&(M=C,Ge=!0,Ze=!0),z.isShaderMaterial||z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshStandardMaterial||z.envMap){const Je=tt.map.cameraPosition;Je!==void 0&&Je.setValue(j,O.setFromMatrixPosition(C.matrixWorld))}(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&tt.setValue(j,"isOrthographic",C.isOrthographicCamera===!0),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial||z.isShadowMaterial||re.isSkinnedMesh)&&tt.setValue(j,"viewMatrix",C.matrixWorldInverse)}if(re.isSkinnedMesh){tt.setOptional(j,re,"bindMatrix"),tt.setOptional(j,re,"bindMatrixInverse");const Je=re.skeleton;Je&&(xe.floatVertexTextures?(Je.boneTexture===null&&Je.computeBoneTexture(),tt.setValue(j,"boneTexture",Je.boneTexture,qe),tt.setValue(j,"boneTextureSize",Je.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Jt=$.morphAttributes;if((Jt.position!==void 0||Jt.normal!==void 0||Jt.color!==void 0&&xe.isWebGL2===!0)&&we.update(re,$,je),(Ge||pe.receiveShadow!==re.receiveShadow)&&(pe.receiveShadow=re.receiveShadow,tt.setValue(j,"receiveShadow",re.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(ot.envMap.value=R,ot.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1),Ge&&(tt.setValue(j,"toneMappingExposure",m.toneMappingExposure),pe.needsLights&&To(ot,Ze),Ve&&z.fog===!0&&ht.refreshFogUniforms(ot,Ve),ht.refreshMaterialUniforms(ot,z,U,D,se),Qa.upload(j,pe.uniformsList,ot,qe)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Qa.upload(j,pe.uniformsList,ot,qe),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&tt.setValue(j,"center",re.center),tt.setValue(j,"modelViewMatrix",re.modelViewMatrix),tt.setValue(j,"normalMatrix",re.normalMatrix),tt.setValue(j,"modelMatrix",re.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Je=z.uniformsGroups;for(let nt=0,Dt=Je.length;nt<Dt;nt++)if(xe.isWebGL2){const pn=Je[nt];q.update(pn,je),q.bind(pn,je)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return je}function To(C,Q){C.ambientLightColor.needsUpdate=Q,C.lightProbe.needsUpdate=Q,C.directionalLights.needsUpdate=Q,C.directionalLightShadows.needsUpdate=Q,C.pointLights.needsUpdate=Q,C.pointLightShadows.needsUpdate=Q,C.spotLights.needsUpdate=Q,C.spotLightShadows.needsUpdate=Q,C.rectAreaLights.needsUpdate=Q,C.hemisphereLights.needsUpdate=Q}function Tr(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return x},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return v},this.setRenderTargetTextures=function(C,Q,$){Le.get(C.texture).__webglTexture=Q,Le.get(C.depthTexture).__webglTexture=$;const z=Le.get(C);z.__hasExternalTextures=!0,z.__hasExternalTextures&&(z.__autoAllocateDepthBuffer=$===void 0,z.__autoAllocateDepthBuffer||ye.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,Q){const $=Le.get(C);$.__webglFramebuffer=Q,$.__useDefaultFramebuffer=Q===void 0},this.setRenderTarget=function(C,Q=0,$=0){v=C,x=Q,A=$;let z=!0,re=null,Ve=!1,w=!1;if(C){const R=Le.get(C);R.__useDefaultFramebuffer!==void 0?(Se.bindFramebuffer(36160,null),z=!1):R.__webglFramebuffer===void 0?qe.setupRenderTarget(C):R.__hasExternalTextures&&qe.rebindTextures(C,Le.get(C.texture).__webglTexture,Le.get(C.depthTexture).__webglTexture);const k=C.texture;(k.isData3DTexture||k.isDataArrayTexture||k.isCompressedArrayTexture)&&(w=!0);const Z=Le.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(re=Z[Q],Ve=!0):xe.isWebGL2&&C.samples>0&&qe.useMultisampledRTT(C)===!1?re=Le.get(C).__webglMultisampledFramebuffer:re=Z,T.copy(C.viewport),P.copy(C.scissor),y=C.scissorTest}else T.copy(F).multiplyScalar(U).floor(),P.copy(V).multiplyScalar(U).floor(),y=J;if(Se.bindFramebuffer(36160,re)&&xe.drawBuffers&&z&&Se.drawBuffers(C,re),Se.viewport(T),Se.scissor(P),Se.setScissorTest(y),Ve){const R=Le.get(C.texture);j.framebufferTexture2D(36160,36064,34069+Q,R.__webglTexture,$)}else if(w){const R=Le.get(C.texture),k=Q||0;j.framebufferTextureLayer(36160,36064,R.__webglTexture,$||0,k)}_=-1},this.readRenderTargetPixels=function(C,Q,$,z,re,Ve,w){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let S=Le.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&w!==void 0&&(S=S[w]),S){Se.bindFramebuffer(36160,S);try{const R=C.texture,k=R.format,Z=R.type;if(k!==Ft&&He.convert(k)!==j.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Y=Z===yt&&(ye.has("EXT_color_buffer_half_float")||xe.isWebGL2&&ye.has("EXT_color_buffer_float"));if(Z!==Qt&&He.convert(Z)!==j.getParameter(35738)&&!(Z===it&&(xe.isWebGL2||ye.has("OES_texture_float")||ye.has("WEBGL_color_buffer_float")))&&!Y){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Q>=0&&Q<=C.width-z&&$>=0&&$<=C.height-re&&j.readPixels(Q,$,z,re,He.convert(k),He.convert(Z),Ve)}finally{const R=v!==null?Le.get(v).__webglFramebuffer:null;Se.bindFramebuffer(36160,R)}}},this.copyFramebufferToTexture=function(C,Q,$=0){const z=Math.pow(2,-$),re=Math.floor(Q.image.width*z),Ve=Math.floor(Q.image.height*z);qe.setTexture2D(Q,0),j.copyTexSubImage2D(3553,$,0,0,C.x,C.y,re,Ve),Se.unbindTexture()},this.copyTextureToTexture=function(C,Q,$,z=0){const re=Q.image.width,Ve=Q.image.height,w=He.convert($.format),S=He.convert($.type);qe.setTexture2D($,0),j.pixelStorei(37440,$.flipY),j.pixelStorei(37441,$.premultiplyAlpha),j.pixelStorei(3317,$.unpackAlignment),Q.isDataTexture?j.texSubImage2D(3553,z,C.x,C.y,re,Ve,w,S,Q.image.data):Q.isCompressedTexture?j.compressedTexSubImage2D(3553,z,C.x,C.y,Q.mipmaps[0].width,Q.mipmaps[0].height,w,Q.mipmaps[0].data):j.texSubImage2D(3553,z,C.x,C.y,w,S,Q.image),z===0&&$.generateMipmaps&&j.generateMipmap(3553),Se.unbindTexture()},this.copyTextureToTexture3D=function(C,Q,$,z,re=0){if(m.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ve=C.max.x-C.min.x+1,w=C.max.y-C.min.y+1,S=C.max.z-C.min.z+1,R=He.convert(z.format),k=He.convert(z.type);let Z;if(z.isData3DTexture)qe.setTexture3D(z,0),Z=32879;else if(z.isDataArrayTexture)qe.setTexture2DArray(z,0),Z=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}j.pixelStorei(37440,z.flipY),j.pixelStorei(37441,z.premultiplyAlpha),j.pixelStorei(3317,z.unpackAlignment);const Y=j.getParameter(3314),ae=j.getParameter(32878),fe=j.getParameter(3316),ve=j.getParameter(3315),oe=j.getParameter(32877),le=$.isCompressedTexture?$.mipmaps[0]:$.image;j.pixelStorei(3314,le.width),j.pixelStorei(32878,le.height),j.pixelStorei(3316,C.min.x),j.pixelStorei(3315,C.min.y),j.pixelStorei(32877,C.min.z),$.isDataTexture||$.isData3DTexture?j.texSubImage3D(Z,re,Q.x,Q.y,Q.z,Ve,w,S,R,k,le.data):$.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),j.compressedTexSubImage3D(Z,re,Q.x,Q.y,Q.z,Ve,w,S,R,le.data)):j.texSubImage3D(Z,re,Q.x,Q.y,Q.z,Ve,w,S,R,k,le),j.pixelStorei(3314,Y),j.pixelStorei(32878,ae),j.pixelStorei(3316,fe),j.pixelStorei(3315,ve),j.pixelStorei(32877,oe),re===0&&z.generateMipmaps&&j.generateMipmap(Z),Se.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?qe.setTextureCube(C,0):C.isData3DTexture?qe.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?qe.setTexture2DArray(C,0):qe.setTexture2D(C,0),Se.unbindTexture()},this.resetState=function(){x=0,A=0,v=null,Se.reset(),B.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}Object.defineProperties(Ki.prototype,{physicallyCorrectLights:{get:function(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights},set:function(i){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!i}}});class Xx extends Ki{}Xx.prototype.isWebGL1Renderer=!0;class cc{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ie(e),this.density=t}clone(){return new cc(this.color,this.density)}toJSON(){return{type:"FogExp2",color:this.color.getHex(),density:this.density}}}class Ri extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class Yx{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Cl,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=Qn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const gn=new I;class uc{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyMatrix4(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyNormalMatrix(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.transformDirection(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Di(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Di(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Di(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Di(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),r=pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),r=pt(r,this.array),s=pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Et(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new uc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Uu=new I,Nu=new at,Fu=new at,qx=new I,Ou=new ze;class Qx extends me{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new ze,this.bindMatrixInverse=new ze}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new at,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}boneTransform(e,t){const n=this.skeleton,r=this.geometry;Nu.fromBufferAttribute(r.attributes.skinIndex,e),Fu.fromBufferAttribute(r.attributes.skinWeight,e),Uu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const a=Fu.getComponent(s);if(a!==0){const o=Nu.getComponent(s);Ou.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(qx.copy(Uu).applyMatrix4(Ou),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Bd extends mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class gr extends Ct{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Ke,u=Ke,h,d){super(null,a,o,l,c,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const zu=new ze,Zx=new ze;class hc{constructor(e=[],t=[]){this.uuid=Qn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new ze)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ze;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:Zx;zu.multiplyMatrices(o,t[s]),zu.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new hc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=xd(e),e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new gr(t,e,e,Ft,it);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this.boneTextureSize=e,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const s=e.bones[n];let a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Bd),this.bones.push(a),this.boneInverses.push(new ze().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.5,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){const a=t[r];e.bones.push(a.uuid);const o=n[r];e.boneInverses.push(o.toArray())}return e}}class ku extends Et{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Gu=new ze,Hu=new ze,Na=[],Kx=new ze,Cs=new me;class Jx extends me{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ku(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.frustumCulled=!1;for(let r=0;r<n;r++)this.setMatrixAt(r,Kx)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Cs.geometry=this.geometry,Cs.material=this.material,Cs.material!==void 0)for(let s=0;s<r;s++){this.getMatrixAt(s,Gu),Hu.multiplyMatrices(n,Gu),Cs.matrixWorld=Hu,Cs.raycast(e,Na);for(let a=0,o=Na.length;a<o;a++){const l=Na[a];l.instanceId=s,l.object=this,t.push(l)}Na.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ku(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class fo extends Cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ie(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Vu=new I,Wu=new I,ju=new ze,rl=new co,Fa=new ds;class Vn extends mt{constructor(e=new Rt,t=new fo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Vu.fromBufferAttribute(t,r-1),Wu.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Vu.distanceTo(Wu);e.setAttribute("lineDistance",new gt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fa.copy(n.boundingSphere),Fa.applyMatrix4(r),Fa.radius+=s,e.ray.intersectsSphere(Fa)===!1)return;ju.copy(r).invert(),rl.copy(e.ray).applyMatrix4(ju);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new I,u=new I,h=new I,d=new I,p=this.isLineSegments?2:1,g=n.index,f=n.attributes.position;if(g!==null){const x=Math.max(0,a.start),A=Math.min(g.count,a.start+a.count);for(let v=x,_=A-1;v<_;v+=p){const M=g.getX(v),T=g.getX(v+1);if(c.fromBufferAttribute(f,M),u.fromBufferAttribute(f,T),rl.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const y=e.ray.origin.distanceTo(d);y<e.near||y>e.far||t.push({distance:y,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const x=Math.max(0,a.start),A=Math.min(f.count,a.start+a.count);for(let v=x,_=A-1;v<_;v+=p){if(c.fromBufferAttribute(f,v),u.fromBufferAttribute(f,v+1),rl.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const T=e.ray.origin.distanceTo(d);T<e.near||T>e.far||t.push({distance:T,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}const Xu=new I,Yu=new I;class Ud extends Vn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Xu.fromBufferAttribute(t,r),Yu.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Xu.distanceTo(Yu);e.setAttribute("lineDistance",new gt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class $x extends Vn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Nd extends Cn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const qu=new ze,Il=new co,Oa=new ds,za=new I;class ew extends mt{constructor(e=new Rt,t=new Nd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Oa.copy(n.boundingSphere),Oa.applyMatrix4(r),Oa.radius+=s,e.ray.intersectsSphere(Oa)===!1)return;qu.copy(r).invert(),Il.copy(e.ray).applyMatrix4(qu);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=d,m=p;g<m;g++){const f=c.getX(g);za.fromBufferAttribute(h,f),Qu(za,f,l,r,e,t,this)}}else{const d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let g=d,m=p;g<m;g++)za.fromBufferAttribute(h,g),Qu(za,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Qu(i,e,t,n,r,s,a){const o=Il.distanceSqToPoint(i);if(o<t){const l=new I;Il.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class tw extends Ct{constructor(e,t,n){super({width:e,height:t}),this.isFramebufferTexture=!0,this.format=n,this.magFilter=Ke,this.minFilter=Ke,this.generateMipmaps=!1,this.needsUpdate=!0}}class po extends Rt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new I,u=new ge;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const p=n+h/t*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new gt(a,3)),this.setAttribute("normal",new gt(o,3)),this.setAttribute("uv",new gt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new po(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Wt extends Rt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],d=[],p=[];let g=0;const m=[],f=n/2;let x=0;A(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new gt(h,3)),this.setAttribute("normal",new gt(d,3)),this.setAttribute("uv",new gt(p,2));function A(){const _=new I,M=new I;let T=0;const P=(t-e)/n;for(let y=0;y<=s;y++){const b=[],D=y/s,U=D*(t-e)+e;for(let W=0;W<=r;W++){const N=W/r,F=N*l+o,V=Math.sin(F),J=Math.cos(F);M.x=U*V,M.y=-D*n+f,M.z=U*J,h.push(M.x,M.y,M.z),_.set(V,P,J).normalize(),d.push(_.x,_.y,_.z),p.push(N,1-D),b.push(g++)}m.push(b)}for(let y=0;y<r;y++)for(let b=0;b<s;b++){const D=m[b][y],U=m[b+1][y],W=m[b+1][y+1],N=m[b][y+1];u.push(D,U,N),u.push(U,W,N),T+=6}c.addGroup(x,T,0),x+=T}function v(_){const M=g,T=new ge,P=new I;let y=0;const b=_===!0?e:t,D=_===!0?1:-1;for(let W=1;W<=r;W++)h.push(0,f*D,0),d.push(0,D,0),p.push(.5,.5),g++;const U=g;for(let W=0;W<=r;W++){const F=W/r*l+o,V=Math.cos(F),J=Math.sin(F);P.x=b*J,P.y=f*D,P.z=b*V,h.push(P.x,P.y,P.z),d.push(0,D,0),T.x=V*.5+.5,T.y=J*.5*D+.5,p.push(T.x,T.y),g++}for(let W=0;W<r;W++){const N=M+W,F=U+W;_===!0?u.push(F,F+1,N):u.push(F+1,F,N),y+=3}c.addGroup(x,y,_===!0?1:2),x+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class mo extends Rt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],a=[];o(r),c(n),u(),this.setAttribute("position",new gt(s,3)),this.setAttribute("normal",new gt(s.slice(),3)),this.setAttribute("uv",new gt(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(A){const v=new I,_=new I,M=new I;for(let T=0;T<t.length;T+=3)p(t[T+0],v),p(t[T+1],_),p(t[T+2],M),l(v,_,M,A)}function l(A,v,_,M){const T=M+1,P=[];for(let y=0;y<=T;y++){P[y]=[];const b=A.clone().lerp(_,y/T),D=v.clone().lerp(_,y/T),U=T-y;for(let W=0;W<=U;W++)W===0&&y===T?P[y][W]=b:P[y][W]=b.clone().lerp(D,W/U)}for(let y=0;y<T;y++)for(let b=0;b<2*(T-y)-1;b++){const D=Math.floor(b/2);b%2===0?(d(P[y][D+1]),d(P[y+1][D]),d(P[y][D])):(d(P[y][D+1]),d(P[y+1][D+1]),d(P[y+1][D]))}}function c(A){const v=new I;for(let _=0;_<s.length;_+=3)v.x=s[_+0],v.y=s[_+1],v.z=s[_+2],v.normalize().multiplyScalar(A),s[_+0]=v.x,s[_+1]=v.y,s[_+2]=v.z}function u(){const A=new I;for(let v=0;v<s.length;v+=3){A.x=s[v+0],A.y=s[v+1],A.z=s[v+2];const _=f(A)/2/Math.PI+.5,M=x(A)/Math.PI+.5;a.push(_,1-M)}g(),h()}function h(){for(let A=0;A<a.length;A+=6){const v=a[A+0],_=a[A+2],M=a[A+4],T=Math.max(v,_,M),P=Math.min(v,_,M);T>.9&&P<.1&&(v<.2&&(a[A+0]+=1),_<.2&&(a[A+2]+=1),M<.2&&(a[A+4]+=1))}}function d(A){s.push(A.x,A.y,A.z)}function p(A,v){const _=A*3;v.x=e[_+0],v.y=e[_+1],v.z=e[_+2]}function g(){const A=new I,v=new I,_=new I,M=new I,T=new ge,P=new ge,y=new ge;for(let b=0,D=0;b<s.length;b+=9,D+=6){A.set(s[b+0],s[b+1],s[b+2]),v.set(s[b+3],s[b+4],s[b+5]),_.set(s[b+6],s[b+7],s[b+8]),T.set(a[D+0],a[D+1]),P.set(a[D+2],a[D+3]),y.set(a[D+4],a[D+5]),M.copy(A).add(v).add(_).divideScalar(3);const U=f(M);m(T,D+0,A,U),m(P,D+2,v,U),m(y,D+4,_,U)}}function m(A,v,_,M){M<0&&A.x===1&&(a[v]=A.x-1),_.x===0&&_.z===0&&(a[v]=M/2/Math.PI+.5)}function f(A){return Math.atan2(A.z,-A.x)}function x(A){return Math.atan2(-A.y,Math.sqrt(A.x*A.x+A.z*A.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mo(e.vertices,e.indices,e.radius,e.details)}}class dc extends mo{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new dc(e.radius,e.detail)}}class Zr extends mo{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Zr(e.radius,e.detail)}}class Zi extends Rt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new I,d=new I,p=[],g=[],m=[],f=[];for(let x=0;x<=n;x++){const A=[],v=x/n;let _=0;x==0&&a==0?_=.5/t:x==n&&l==Math.PI&&(_=-.5/t);for(let M=0;M<=t;M++){const T=M/t;h.x=-e*Math.cos(r+T*s)*Math.sin(a+v*o),h.y=e*Math.cos(a+v*o),h.z=e*Math.sin(r+T*s)*Math.sin(a+v*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),m.push(d.x,d.y,d.z),f.push(T+_,1-v),A.push(c++)}u.push(A)}for(let x=0;x<n;x++)for(let A=0;A<t;A++){const v=u[x][A+1],_=u[x][A],M=u[x+1][A],T=u[x+1][A+1];(x!==0||a>0)&&p.push(v,_,T),(x!==n-1||l<Math.PI)&&p.push(_,M,T)}this.setIndex(p),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(m,3)),this.setAttribute("uv",new gt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class hr extends Rt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const a=[],o=[],l=[],c=[],u=new I,h=new I,d=new I;for(let p=0;p<=n;p++)for(let g=0;g<=r;g++){const m=g/r*s,f=p/n*Math.PI*2;h.x=(e+t*Math.cos(f))*Math.cos(m),h.y=(e+t*Math.cos(f))*Math.sin(m),h.z=t*Math.sin(f),o.push(h.x,h.y,h.z),u.x=e*Math.cos(m),u.y=e*Math.sin(m),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(g/r),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=r;g++){const m=(r+1)*p+g-1,f=(r+1)*(p-1)+g-1,x=(r+1)*(p-1)+g,A=(r+1)*p+g;a.push(m,f,A),a.push(f,x,A)}this.setIndex(a),this.setAttribute("position",new gt(o,3)),this.setAttribute("normal",new gt(l,3)),this.setAttribute("uv",new gt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Fd extends Cn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ie(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Yt extends Cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nc,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ii extends Yt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ge(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return tn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ie(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ie(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ie(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._iridescence=0,this._transmission=0,this.setValues(e)}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function Fi(i,e,t){return Od(i)?new i.constructor(i.subarray(e,t!==void 0?t:i.length)):i.slice(e,t)}function ka(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Od(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function nw(i){function e(r,s){return i[r]-i[s]}const t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function Zu(i,e,t){const n=i.length,r=new i.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)r[a++]=i[o+l]}return r}function zd(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push.apply(t,a)),s=i[r++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=i[r++];while(s!==void 0)}class ha{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class iw extends ha{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:$c,endingEnd:$c}}intervalChanged_(e,t,n){const r=this.parameterPositions;let s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case eu:s=e,o=2*t-n;break;case tu:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case eu:a=e,l=2*n-t;break;case tu:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(r-t),m=g*g,f=m*g,x=-d*f+2*d*m-d*g,A=(1+d)*f+(-1.5-2*d)*m+(-.5+d)*g+1,v=(-1-p)*f+(1.5+p)*m+.5*g,_=p*f-p*m;for(let M=0;M!==o;++M)s[M]=x*a[u+M]+A*a[c+M]+v*a[l+M]+_*a[h+M];return s}}class rw extends ha{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(r-t),h=1-u;for(let d=0;d!==o;++d)s[d]=a[c+d]*h+a[l+d]*u;return s}}class sw extends ha{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class pi{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ka(t,this.TimeBufferType),this.values=ka(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ka(e.times,Array),values:ka(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new sw(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new rw(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new iw(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ea:t=this.InterpolantFactoryMethodDiscrete;break;case rs:t=this.InterpolantFactoryMethodLinear;break;case Lo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ea;case this.InterpolantFactoryMethodLinear:return rs;case this.InterpolantFactoryMethodSmooth:return Lo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=Fi(n,s,a),this.values=Fi(this.values,s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&Od(r))for(let o=0,l=r.length;o!==l;++o){const c=r[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=Fi(this.times),t=Fi(this.values),n=this.getValueSize(),r=this.getInterpolation()===Lo,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(r)l=!0;else{const h=o*n,d=h-n,p=h+n;for(let g=0;g!==n;++g){const m=t[h+g];if(m!==t[d+g]||m!==t[p+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let p=0;p!==n;++p)t[d+p]=t[h+p]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=Fi(e,0,a),this.values=Fi(t,0,a*n)):(this.times=e,this.values=t),this}clone(){const e=Fi(this.times,0),t=Fi(this.values,0),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}pi.prototype.TimeBufferType=Float32Array;pi.prototype.ValueBufferType=Float32Array;pi.prototype.DefaultInterpolation=rs;class ps extends pi{}ps.prototype.ValueTypeName="bool";ps.prototype.ValueBufferType=Array;ps.prototype.DefaultInterpolation=ea;ps.prototype.InterpolantFactoryMethodLinear=void 0;ps.prototype.InterpolantFactoryMethodSmooth=void 0;class kd extends pi{}kd.prototype.ValueTypeName="color";class ra extends pi{}ra.prototype.ValueTypeName="number";class aw extends ha{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t);let c=e*o;for(let u=c+o;c!==u;c+=4)Pt.slerpFlat(s,0,a,c-o,a,c,l);return s}}class _r extends pi{InterpolantFactoryMethodLinear(e){return new aw(this.times,this.values,this.getValueSize(),e)}}_r.prototype.ValueTypeName="quaternion";_r.prototype.DefaultInterpolation=rs;_r.prototype.InterpolantFactoryMethodSmooth=void 0;class ms extends pi{}ms.prototype.ValueTypeName="string";ms.prototype.ValueBufferType=Array;ms.prototype.DefaultInterpolation=ea;ms.prototype.InterpolantFactoryMethodLinear=void 0;ms.prototype.InterpolantFactoryMethodSmooth=void 0;class sa extends pi{}sa.prototype.ValueTypeName="vector";class ow{constructor(e,t=-1,n,r=Cp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=Qn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(cw(n[a]).scale(r));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,a=n.length;s!==a;++s)t.push(pi.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const u=nw(l);l=Zu(l,1,u),c=Zu(c,1,u),!r&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new ra(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(s);if(u&&u.length>1){const h=u[1];let d=r[h];d||(r[h]=d=[]),d.push(c)}}const a=[];for(const o in r)a.push(this.CreateFromMorphTargetSequence(o,r[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,p,g,m){if(p.length!==0){const f=[],x=[];zd(p,f,x,g),f.length!==0&&m.push(new h(d,f,x))}},r=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let m=0;m<d[g].morphTargets.length;m++)p[d[g].morphTargets[m]]=-1;for(const m in p){const f=[],x=[];for(let A=0;A!==d[g].morphTargets.length;++A){const v=d[g];f.push(v.time),x.push(v.morphTarget===m?1:0)}r.push(new ra(".morphTargetInfluence["+m+"]",f,x))}l=p.length*a}else{const p=".bones["+t[h].name+"]";n(sa,p+".position",d,"pos",r),n(_r,p+".quaternion",d,"rot",r),n(sa,p+".scale",d,"scl",r)}}return r.length===0?null:new this(s,l,r,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function lw(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ra;case"vector":case"vector2":case"vector3":case"vector4":return sa;case"color":return kd;case"quaternion":return _r;case"bool":case"boolean":return ps;case"string":return ms}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function cw(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=lw(i.type);if(i.times===void 0){const t=[],n=[];zd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const os={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class fc{constructor(e,t,n){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const p=c[h],g=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null}}}const uw=new fc;class Ji{constructor(e){this.manager=e!==void 0?e:uw,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const Ai={};class hw extends Error{constructor(e,t){super(e),this.response=t}}class ls extends Ji{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=os.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Ai[e]!==void 0){Ai[e].push({onLoad:t,onProgress:n,onError:r});return}Ai[e]=[],Ai[e].push({onLoad:t,onProgress:n,onError:r});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Ai[e],h=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),p=d?parseInt(d):0,g=p!==0;let m=0;const f=new ReadableStream({start(x){A();function A(){h.read().then(({done:v,value:_})=>{if(v)x.close();else{m+=_.byteLength;const M=new ProgressEvent("progress",{lengthComputable:g,loaded:m,total:p});for(let T=0,P=u.length;T<P;T++){const y=u[T];y.onProgress&&y.onProgress(M)}x.enqueue(_),A()}})}}});return new Response(f)}else throw new hw(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(d);return c.arrayBuffer().then(g=>p.decode(g))}}}).then(c=>{os.add(e,c);const u=Ai[e];delete Ai[e];for(let h=0,d=u.length;h<d;h++){const p=u[h];p.onLoad&&p.onLoad(c)}}).catch(c=>{const u=Ai[e];if(u===void 0)throw this.manager.itemError(e),c;delete Ai[e];for(let h=0,d=u.length;h<d;h++){const p=u[h];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class dw extends Ji{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=os.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o=na("img");function l(){u(),os.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(h){u(),r&&r(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class Gd extends Ji{constructor(e){super(e)}load(e,t,n,r){const s=this,a=new gr,o=new ls(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(e,function(l){const c=s.parse(l);c&&(c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:nn,a.wrapT=c.wrapT!==void 0?c.wrapT:nn,a.magFilter=c.magFilter!==void 0?c.magFilter:Fe,a.minFilter=c.minFilter!==void 0?c.minFilter:Fe,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.encoding!==void 0&&(a.encoding=c.encoding),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=qi),c.mipmapCount===1&&(a.minFilter=Fe),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c))},n,r),a}}class mi extends Ji{constructor(e){super(e)}load(e,t,n,r){const s=new Ct,a=new dw(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class go extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ie(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const sl=new ze,Ku=new I,Ju=new I;class pc{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ge(512,512),this.map=null,this.mapPass=null,this.matrix=new ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new sc,this._frameExtents=new ge(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ku.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ku),Ju.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ju),t.updateMatrixWorld(),sl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(sl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class fw extends pc{constructor(){super(new Tt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=ta*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class aa extends go{constructor(e,t,n=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.distance=n,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new fw}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const $u=new ze,Ds=new I,al=new I;class pw extends pc{constructor(){super(new Tt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ge(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ds.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ds),al.copy(n.position),al.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(al),n.updateMatrixWorld(),r.makeTranslation(-Ds.x,-Ds.y,-Ds.z),$u.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix($u)}}class mw extends go{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new pw}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class gw extends pc{constructor(){super(new ac(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class da extends go{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new gw}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Hd extends go{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ll{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,r=e.length;n<r;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class vw extends Ji{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=os.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){os.add(e,l),t&&t(l),s.manager.itemEnd(e)}).catch(function(l){r&&r(l),s.manager.itemError(e),s.manager.itemEnd(e)}),s.manager.itemStart(e)}}class mc{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=eh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=eh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function eh(){return(typeof performance>"u"?Date:performance).now()}const gc="\\[\\]\\.:\\/",xw=new RegExp("["+gc+"]","g"),vc="[^"+gc+"]",ww="[^"+gc.replace("\\.","")+"]",yw=/((?:WC+[\/:])*)/.source.replace("WC",vc),_w=/(WCOD+)?/.source.replace("WCOD",ww),Aw=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",vc),Mw=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",vc),bw=new RegExp("^"+yw+_w+Aw+Mw+"$"),Sw=["material","materials","bones","map"];class Tw{constructor(e,t,n){const r=n||ct.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ct{constructor(e,t,n){this.path=t,this.parsedPath=n||ct.parseTrackName(t),this.node=ct.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ct.Composite(e,t,n):new ct(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(xw,"")}static parseTrackName(e){const t=bw.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);Sw.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let s=t.propertyIndex;if(e||(e=ct.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[r];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ct.Composite=Tw;ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ct.prototype.GetterByBindingType=[ct.prototype._getValue_direct,ct.prototype._getValue_array,ct.prototype._getValue_arrayElement,ct.prototype._getValue_toArray];ct.prototype.SetterByBindingTypeAndVersioning=[[ct.prototype._setValue_direct,ct.prototype._setValue_direct_setNeedsUpdate,ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_array,ct.prototype._setValue_array_setNeedsUpdate,ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_arrayElement,ct.prototype._setValue_arrayElement_setNeedsUpdate,ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_fromArray,ct.prototype._setValue_fromArray_setNeedsUpdate,ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class X{constructor(e){this.value=e}clone(){return new X(this.value.clone===void 0?this.value:this.value.clone())}}class gs{constructor(e,t,n=0,r=1/0){this.ray=new co(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new rc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Bl(e,this,n,t),n.sort(th),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Bl(e[r],this,n,t);return n.sort(th),n}}function th(i,e){return i.distance-e.distance}function Bl(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const r=i.children;for(let s=0,a=r.length;s<a;s++)Bl(r[s],e,t,!0)}}class nh{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(tn(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const ih=new I;class Ew extends mt{constructor(e,t){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new Rt,r=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let a=0,o=1,l=32;a<l;a++,o++){const c=a/l*Math.PI*2,u=o/l*Math.PI*2;r.push(Math.cos(c),Math.sin(c),1,Math.cos(u),Math.sin(u),1)}n.setAttribute("position",new gt(r,3));const s=new fo({fog:!1,toneMapped:!1});this.cone=new Ud(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),ih.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(ih),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const Ei=Cw();function Cw(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,r[l]=24,r[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,r[l]=-c-1,r[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,r[l]=13,r[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,r[l]=24,r[l|256]=24):(n[l]=31744,n[l|256]=64512,r[l]=13,r[l|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;!(c&8388608);)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[l]=c|u}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}function Dw(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=tn(i,-65504,65504),Ei.floatView[0]=i;const e=Ei.uint32View[0],t=e>>23&511;return Ei.baseTable[t]+((e&8388607)>>Ei.shiftTable[t])}function Pw(i){const e=i>>10;return Ei.uint32View[0]=Ei.mantissaTable[Ei.offsetTable[e]+(i&1023)]+Ei.exponentTable[e],Ei.floatView[0]}const Kr={toHalfFloat:Dw,fromHalfFloat:Pw};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:us}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=us);function rh(i,e){if(e===Dp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===El||e===gd){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,r=[];if(e===El)for(let a=1;a<=n;a++)r.push(t.getX(0)),r.push(t.getX(a)),r.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(r.push(t.getX(a)),r.push(t.getX(a+1)),r.push(t.getX(a+2))):(r.push(t.getX(a+2)),r.push(t.getX(a+1)),r.push(t.getX(a)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=i.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class vs extends Ji{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Uw(t)}),this.register(function(t){return new Hw(t)}),this.register(function(t){return new Vw(t)}),this.register(function(t){return new Ww(t)}),this.register(function(t){return new Fw(t)}),this.register(function(t){return new Ow(t)}),this.register(function(t){return new zw(t)}),this.register(function(t){return new kw(t)}),this.register(function(t){return new Bw(t)}),this.register(function(t){return new Gw(t)}),this.register(function(t){return new Nw(t)}),this.register(function(t){return new Iw(t)}),this.register(function(t){return new jw(t)}),this.register(function(t){return new Xw(t)})}load(e,t,n,r){const s=this;let a;this.resourcePath!==""?a=this.resourcePath:this.path!==""?a=this.path:a=Ll.extractUrlBase(e),this.manager.itemStart(e);const o=function(c){r?r(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new ls(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(u){t(u),s.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let s;const a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Vd){try{a[rt.KHR_BINARY_GLTF]=new Yw(e)}catch(h){r&&r(h);return}s=JSON.parse(a[rt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new ay(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](c);o[h.name]=h,a[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const h=s.extensionsUsed[u],d=s.extensionsRequired||[];switch(h){case rt.KHR_MATERIALS_UNLIT:a[h]=new Lw;break;case rt.KHR_DRACO_MESH_COMPRESSION:a[h]=new qw(s,this.dracoLoader);break;case rt.KHR_TEXTURE_TRANSFORM:a[h]=new Qw;break;case rt.KHR_MESH_QUANTIZATION:a[h]=new Zw;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){const n=this;return new Promise(function(r,s){n.parse(e,t,r,s)})}}function Rw(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const rt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Iw{constructor(e){this.parser=e,this.name=rt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let r=t.cache.get(n);if(r)return r;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new Ie(16777215);l.color!==void 0&&u.fromArray(l.color);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new da(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new mw(u),c.distance=h;break;case"spot":c=new aa(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Wi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),r=Promise.resolve(c),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class Lw{constructor(){this.name=rt.KHR_MATERIALS_UNLIT}getMaterialType(){return ai}extendParams(e,t,n){const r=[];e.color=new Ie(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;e.color.fromArray(a),e.opacity=a[3]}s.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",s.baseColorTexture,Ne))}return Promise.all(r)}}class Bw{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class Uw{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],a=r.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ge(o,o)}return Promise.all(s)}}class Nw{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],a=r.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class Fw{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Ie(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=r.extensions[this.name];return a.sheenColorFactor!==void 0&&t.sheenColor.fromArray(a.sheenColorFactor),a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Ne)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class Ow{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],a=r.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class zw{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],a=r.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ie(o[0],o[1],o[2]),Promise.all(s)}}class kw{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class Gw{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],a=r.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ie(o[0],o[1],o[2]),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Ne)),Promise.all(s)}}class Hw{constructor(e){this.parser=e,this.name=rt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;const s=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}}class Vw{constructor(e){this.parser=e,this.name=rt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=r.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Ww{constructor(e){this.parser=e,this.name=rt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=r.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class jw{constructor(e){this.name=rt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const r=n.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const l=r.byteOffset||0,c=r.byteLength||0,u=r.count,h=r.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,r.mode,r.filter).then(function(p){return p.buffer}):a.ready.then(function(){const p=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(p),u,h,d,r.mode,r.filter),p})})}else return null}}class Xw{constructor(e){this.name=rt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const r=t.meshes[n.mesh];for(const c of r.primitives)if(c.mode!==Ln.TRIANGLES&&c.mode!==Ln.TRIANGLE_STRIP&&c.mode!==Ln.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,p=[];for(const g of h){const m=new ze,f=new I,x=new Pt,A=new I(1,1,1),v=new Jx(g.geometry,g.material,d);for(let _=0;_<d;_++)l.TRANSLATION&&f.fromBufferAttribute(l.TRANSLATION,_),l.ROTATION&&x.fromBufferAttribute(l.ROTATION,_),l.SCALE&&A.fromBufferAttribute(l.SCALE,_),v.setMatrixAt(_,m.compose(f,x,A));for(const _ in l)_!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,l[_]);mt.prototype.copy.call(v,g),v.frustumCulled=!1,this.parser.assignFinalMaterial(v),p.push(v)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}}const Vd="glTF",Ps=12,sh={JSON:1313821514,BIN:5130562};class Yw{constructor(e){this.name=rt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ps),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Vd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-Ps,s=new DataView(e,Ps);let a=0;for(;a<r;){const o=s.getUint32(a,!0);a+=4;const l=s.getUint32(a,!0);if(a+=4,l===sh.JSON){const c=new Uint8Array(e,Ps+a,o);this.content=n.decode(c)}else if(l===sh.BIN){const c=Ps+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class qw{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=rt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const u in a){const h=Ul[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=Ul[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[e.attributes[u]],p=es[d.componentType];c[h]=p.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h){r.decodeDracoFile(u,function(d){for(const p in d.attributes){const g=d.attributes[p],m=l[p];m!==void 0&&(g.normalized=m)}h(d)},o,c)})})}}class Qw{constructor(){this.name=rt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return t.texCoord!==void 0&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Zw{constructor(){this.name=rt.KHR_MESH_QUANTIZATION}}class Wd extends ha{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let a=0;a!==r;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,r){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=r-t,h=(n-t)/u,d=h*h,p=d*h,g=e*c,m=g-c,f=-2*p+3*d,x=p-d,A=1-f,v=x-d+h;for(let _=0;_!==o;_++){const M=a[m+_+o],T=a[m+_+l]*u,P=a[g+_+o],y=a[g+_]*u;s[_]=A*M+v*T+f*P+x*y}return s}}const Kw=new Pt;class Jw extends Wd{interpolate_(e,t,n,r){const s=super.interpolate_(e,t,n,r);return Kw.fromArray(s).normalize().toArray(s),s}}const Ln={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},es={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ah={9728:Ke,9729:Fe,9984:Tl,9985:md,9986:qa,9987:qi},oh={33071:nn,33648:$a,10497:hn},ol={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ul={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Oi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},$w={CUBICSPLINE:void 0,LINEAR:rs,STEP:ea},ll={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function ey(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Yt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ui})),i.DefaultMaterial}function Rs(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Wi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function ty(i,e,t){let n=!1,r=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(r=!0),h.COLOR_0!==void 0&&(s=!0),n&&r&&s)break}if(!n&&!r&&!s)return Promise.resolve(i);const a=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){const h=e[c];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(r){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(s){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],d=c[2];return n&&(i.morphAttributes.position=u),r&&(i.morphAttributes.normal=h),s&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function ny(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function iy(i){const e=i.extensions&&i.extensions[rt.KHR_DRACO_MESH_COMPRESSION];let t;return e?t="draco:"+e.bufferView+":"+e.indices+":"+lh(e.attributes):t=i.indices+":"+lh(i.attributes)+":"+i.mode,t}function lh(i){let e="";const t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Nl(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function ry(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const sy=new ze;class ay{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Rw,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,r=navigator.userAgent.indexOf("Firefox")>-1,s=r?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||r&&s<98?this.textureLoader=new mi(this.options.manager):this.textureLoader=new vw(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ls(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][r.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:r.asset,parser:n,userData:{}};Rs(s,o,r),Wi(o,r),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){const a=t[r].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let r=0,s=e.length;r<s;r++){const a=e[r];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const r=n.clone(),s=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,u]of a.children.entries())s(u,o.children[c])};return s(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const r=e(t[n]);if(r)return r}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let r=0;r<t.length;r++){const s=e(t[r]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[rt.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(s,a){n.load(Ll.resolveURL(t.uri,r.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const r=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+r)})}loadAccessor(e){const t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){const a=ol[r.type],o=es[r.componentType],l=r.normalized===!0,c=new o(r.count*a);return Promise.resolve(new Et(c,a,l))}const s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],l=ol[r.type],c=es[r.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=r.byteOffset||0,p=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,g=r.normalized===!0;let m,f;if(p&&p!==h){const x=Math.floor(d/p),A="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+x+":"+r.count;let v=t.cache.get(A);v||(m=new c(o,x*p,r.count*p/u),v=new Yx(m,p/u),t.cache.add(A,v)),f=new uc(v,l,d%p/u,g)}else o===null?m=new c(r.count*l):m=new c(o,d,r.count*l),f=new Et(m,l,g);if(r.sparse!==void 0){const x=ol.SCALAR,A=es[r.sparse.indices.componentType],v=r.sparse.indices.byteOffset||0,_=r.sparse.values.byteOffset||0,M=new A(a[1],v,r.sparse.count*x),T=new c(a[2],_,r.sparse.count*l);o!==null&&(f=new Et(f.array.slice(),f.itemSize,f.normalized));for(let P=0,y=M.length;P<y;P++){const b=M[P];if(f.setX(b,T[P*l]),l>=2&&f.setY(b,T[P*l+1]),l>=3&&f.setZ(b,T[P*l+2]),l>=4&&f.setW(b,T[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return f})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){const r=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"";const d=(s.samplers||{})[a.sampler]||{};return u.magFilter=ah[d.magFilter]||Fe,u.minFilter=ah[d.minFilter]||qi,u.wrapS=oh[d.wrapS]||hn,u.wrapT=oh[d.wrapT]||hn,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=r.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(h){c=!0;const d=new Blob([h],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(h){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(m){const f=new Ct(m);f.needsUpdate=!0,d(f)}),t.load(Ll.resolveURL(h,s.path),g,void 0,p)})}).then(function(h){return c===!0&&o.revokeObjectURL(l),h.userData.mimeType=a.mimeType||ry(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,r){const s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord!=0&&!(t==="aoMap"&&n.texCoord==1)&&console.warn("THREE.GLTFLoader: Custom UV set "+n.texCoord+" for texture "+t+" not yet supported."),s.extensions[rt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[rt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=s.associations.get(a);a=s.extensions[rt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return r!==void 0&&(a.encoding=r),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Nd,Cn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new fo,Cn.prototype.copy.call(l,n),l.color.copy(n.color),this.cache.add(o,l)),n=l}if(r||s||a){let o="ClonedMaterial:"+n.uuid+":";r&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),r&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}n.aoMap&&t.attributes.uv2===void 0&&t.attributes.uv!==void 0&&t.setAttribute("uv2",t.attributes.uv),e.material=n}getMaterialType(){return Yt}loadMaterial(e){const t=this,n=this.json,r=this.extensions,s=n.materials[e];let a;const o={},l=s.extensions||{},c=[];if(l[rt.KHR_MATERIALS_UNLIT]){const h=r[rt.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),c.push(h.extendParams(o,s,t))}else{const h=s.pbrMetallicRoughness||{};if(o.color=new Ie(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.fromArray(d),o.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",h.baseColorTexture,Ne)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=wn);const u=s.alphaMode||ll.OPAQUE;if(u===ll.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===ll.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==ai&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ge(1,1),s.normalTexture.scale!==void 0)){const h=s.normalTexture.scale;o.normalScale.set(h,h)}return s.occlusionTexture!==void 0&&a!==ai&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==ai&&(o.emissive=new Ie().fromArray(s.emissiveFactor)),s.emissiveTexture!==void 0&&a!==ai&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,Ne)),Promise.all(c).then(function(){const h=new a(o);return s.name&&(h.name=s.name),Wi(h,s),t.associations.set(h,{materials:e}),s.extensions&&Rs(r,h,s),h})}createUniqueName(e){const t=ct.sanitizeNodeName(e||"");let n=t;for(let r=1;this.nodeNamesUsed[n];++r)n=t+"_"+r;return this.nodeNamesUsed[n]=!0,n}loadGeometries(e){const t=this,n=this.extensions,r=this.primitiveCache;function s(o){return n[rt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return ch(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],u=iy(c),h=r[u];if(h)a.push(h.promise);else{let d;c.extensions&&c.extensions[rt.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=ch(new Rt,c,t),r[u]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,r=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const u=a[l].material===void 0?ey(this.cache):this.getDependency("material",a[l].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let p=0,g=u.length;p<g;p++){const m=u[p],f=a[p];let x;const A=c[p];if(f.mode===Ln.TRIANGLES||f.mode===Ln.TRIANGLE_STRIP||f.mode===Ln.TRIANGLE_FAN||f.mode===void 0)x=s.isSkinnedMesh===!0?new Qx(m,A):new me(m,A),x.isSkinnedMesh===!0&&x.normalizeSkinWeights(),f.mode===Ln.TRIANGLE_STRIP?x.geometry=rh(x.geometry,gd):f.mode===Ln.TRIANGLE_FAN&&(x.geometry=rh(x.geometry,El));else if(f.mode===Ln.LINES)x=new Ud(m,A);else if(f.mode===Ln.LINE_STRIP)x=new Vn(m,A);else if(f.mode===Ln.LINE_LOOP)x=new $x(m,A);else if(f.mode===Ln.POINTS)x=new ew(m,A);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+f.mode);Object.keys(x.geometry.morphAttributes).length>0&&ny(x,s),x.name=t.createUniqueName(s.name||"mesh_"+e),Wi(x,s),f.extensions&&Rs(r,x,f),t.assignFinalMaterial(x),h.push(x)}for(let p=0,g=h.length;p<g;p++)t.associations.set(h[p],{meshes:e,primitives:p});if(h.length===1)return h[0];const d=new Mn;t.associations.set(d,{meshes:e});for(let p=0,g=h.length;p<g;p++)d.add(h[p]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Tt(Xt.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new ac(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Wi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let r=0,s=t.joints.length;r<s;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){const s=r.pop(),a=r,o=[],l=[];for(let c=0,u=a.length;c<u;c++){const h=a[c];if(h){o.push(h);const d=new ze;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new hc(o,l)})}loadAnimation(e){const n=this.json.animations[e],r=[],s=[],a=[],o=[],l=[];for(let c=0,u=n.channels.length;c<u;c++){const h=n.channels[c],d=n.samplers[h.sampler],p=h.target,g=p.node,m=n.parameters!==void 0?n.parameters[d.input]:d.input,f=n.parameters!==void 0?n.parameters[d.output]:d.output;r.push(this.getDependency("node",g)),s.push(this.getDependency("accessor",m)),a.push(this.getDependency("accessor",f)),o.push(d),l.push(p)}return Promise.all([Promise.all(r),Promise.all(s),Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],d=c[2],p=c[3],g=c[4],m=[];for(let x=0,A=u.length;x<A;x++){const v=u[x],_=h[x],M=d[x],T=p[x],P=g[x];if(v===void 0)continue;v.updateMatrix();let y;switch(Oi[P.path]){case Oi.weights:y=ra;break;case Oi.rotation:y=_r;break;case Oi.position:case Oi.scale:default:y=sa;break}const b=v.name?v.name:v.uuid,D=T.interpolation!==void 0?$w[T.interpolation]:rs,U=[];Oi[P.path]===Oi.weights?v.traverse(function(N){N.morphTargetInfluences&&U.push(N.name?N.name:N.uuid)}):U.push(b);let W=M.array;if(M.normalized){const N=Nl(W.constructor),F=new Float32Array(W.length);for(let V=0,J=W.length;V<J;V++)F[V]=W[V]*N;W=F}for(let N=0,F=U.length;N<F;N++){const V=new y(U[N]+"."+Oi[P.path],_.array,W,D);T.interpolation==="CUBICSPLINE"&&(V.createInterpolant=function(ne){const K=this instanceof _r?Jw:Wd;return new K(this.times,this.values,this.getValueSize()/3,ne)},V.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),m.push(V)}}const f=n.name?n.name:"animation_"+e;return new ow(f,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(s){const a=n._getNodeRef(n.meshCache,r.mesh,s);return r.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=r.weights.length;l<c;l++)o.morphTargetInfluences[l]=r.weights[l]}),a})}loadNode(e){const t=this.json,n=this,r=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=r.children||[];for(let c=0,u=o.length;c<u;c++)a.push(n.getDependency("node",o[c]));const l=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){const u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(p){p.isSkinnedMesh&&p.bind(d,sy)});for(let p=0,g=h.length;p<g;p++)u.add(h[p]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],a=s.name?r.createUniqueName(s.name):"",o=[],l=r._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(r.getDependency("camera",s.camera).then(function(c){return r._getNodeRef(r.cameraCache,s.camera,c)})),r._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let u;if(s.isBone===!0?u=new Bd:c.length>1?u=new Mn:c.length===1?u=c[0]:u=new mt,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(s.name&&(u.userData.name=s.name,u.name=a),Wi(u,s),s.extensions&&Rs(n,u,s),s.matrix!==void 0){const h=new ze;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return r.associations.has(u)||r.associations.set(u,{}),r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],r=this,s=new Mn;n.name&&(s.name=r.createUniqueName(n.name)),Wi(s,n),n.extensions&&Rs(t,s,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(r.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let u=0,h=l.length;u<h;u++)s.add(l[u]);const c=u=>{const h=new Map;for(const[d,p]of r.associations)(d instanceof Cn||d instanceof Ct)&&h.set(d,p);return u.traverse(d=>{const p=r.associations.get(d);p!=null&&h.set(d,p)}),h};return r.associations=c(s),s})}}function oy(i,e,t){const n=e.attributes,r=new Mr;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(r.set(new I(l[0],l[1],l[2]),new I(c[0],c[1],c[2])),o.normalized){const u=Nl(es[o.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new I,l=new I;for(let c=0,u=s.length;c<u;c++){const h=s[c];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){const m=Nl(es[d.componentType]);l.multiplyScalar(m)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(o)}i.boundingBox=r;const a=new ds;r.getCenter(a.center),a.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=a}function ch(i,e,t){const n=e.attributes,r=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(const a in n){const o=Ul[a]||a.toLowerCase();o in i.attributes||r.push(s(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});r.push(a)}return Wi(i,e),oy(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?ty(i,e.targets,t):i})}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.6.9
*/var uh=function(i){return URL.createObjectURL(new Blob([i],{type:"text/javascript"}))};try{URL.revokeObjectURL(uh(""))}catch{uh=function(e){return"data:application/javascript;charset=UTF-8,"+encodeURI(e)}}var Un=Uint8Array,Yi=Uint16Array,Fl=Uint32Array,jd=new Un([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Xd=new Un([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),ly=new Un([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Yd=function(i,e){for(var t=new Yi(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var r=new Fl(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)r[s]=s-t[n]<<5|n;return[t,r]},qd=Yd(jd,2),Qd=qd[0],cy=qd[1];Qd[28]=258,cy[258]=28;var uy=Yd(Xd,0),hy=uy[0],Ol=new Yi(32768);for(var wt=0;wt<32768;++wt){var zi=(wt&43690)>>>1|(wt&21845)<<1;zi=(zi&52428)>>>2|(zi&13107)<<2,zi=(zi&61680)>>>4|(zi&3855)<<4,Ol[wt]=((zi&65280)>>>8|(zi&255)<<8)>>>1}var js=function(i,e,t){for(var n=i.length,r=0,s=new Yi(e);r<n;++r)++s[i[r]-1];var a=new Yi(e);for(r=0;r<e;++r)a[r]=a[r-1]+s[r-1]<<1;var o;if(t){o=new Yi(1<<e);var l=15-e;for(r=0;r<n;++r)if(i[r])for(var c=r<<4|i[r],u=e-i[r],h=a[i[r]-1]++<<u,d=h|(1<<u)-1;h<=d;++h)o[Ol[h]>>>l]=c}else for(o=new Yi(n),r=0;r<n;++r)i[r]&&(o[r]=Ol[a[i[r]-1]++]>>>15-i[r]);return o},fa=new Un(288);for(var wt=0;wt<144;++wt)fa[wt]=8;for(var wt=144;wt<256;++wt)fa[wt]=9;for(var wt=256;wt<280;++wt)fa[wt]=7;for(var wt=280;wt<288;++wt)fa[wt]=8;var Zd=new Un(32);for(var wt=0;wt<32;++wt)Zd[wt]=5;var dy=js(fa,9,1),fy=js(Zd,5,1),cl=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},kn=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},ul=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},py=function(i){return(i/8|0)+(i&7&&1)},my=function(i,e,t){(e==null||e<0)&&(e=0),(t==null||t>i.length)&&(t=i.length);var n=new(i instanceof Yi?Yi:i instanceof Fl?Fl:Un)(t-e);return n.set(i.subarray(e,t)),n},gy=function(i,e,t){var n=i.length;if(!n||t&&!t.l&&n<5)return e||new Un(0);var r=!e||t,s=!t||t.i;t||(t={}),e||(e=new Un(n*3));var a=function(ue){var ye=e.length;if(ue>ye){var xe=new Un(Math.max(ye*2,ue));xe.set(e),e=xe}},o=t.f||0,l=t.p||0,c=t.b||0,u=t.l,h=t.d,d=t.m,p=t.n,g=n*8;do{if(!u){t.f=o=kn(i,l,1);var m=kn(i,l+1,3);if(l+=3,m)if(m==1)u=dy,h=fy,d=9,p=5;else if(m==2){var v=kn(i,l,31)+257,_=kn(i,l+10,15)+4,M=v+kn(i,l+5,31)+1;l+=14;for(var T=new Un(M),P=new Un(19),y=0;y<_;++y)P[ly[y]]=kn(i,l+y*3,7);l+=_*3;for(var b=cl(P),D=(1<<b)-1,U=js(P,b,1),y=0;y<M;){var W=U[kn(i,l,D)];l+=W&15;var f=W>>>4;if(f<16)T[y++]=f;else{var N=0,F=0;for(f==16?(F=3+kn(i,l,3),l+=2,N=T[y-1]):f==17?(F=3+kn(i,l,7),l+=3):f==18&&(F=11+kn(i,l,127),l+=7);F--;)T[y++]=N}}var V=T.subarray(0,v),J=T.subarray(v);d=cl(V),p=cl(J),u=js(V,d,1),h=js(J,p,1)}else throw"invalid block type";else{var f=py(l)+4,x=i[f-4]|i[f-3]<<8,A=f+x;if(A>n){if(s)throw"unexpected EOF";break}r&&a(c+x),e.set(i.subarray(f,A),c),t.b=c+=x,t.p=l=A*8;continue}if(l>g){if(s)throw"unexpected EOF";break}}r&&a(c+131072);for(var ne=(1<<d)-1,K=(1<<p)-1,ee=l;;ee=l){var N=u[ul(i,l)&ne],se=N>>>4;if(l+=N&15,l>g){if(s)throw"unexpected EOF";break}if(!N)throw"invalid length/literal";if(se<256)e[c++]=se;else if(se==256){ee=l,u=null;break}else{var ce=se-254;if(se>264){var y=se-257,O=jd[y];ce=kn(i,l,(1<<O)-1)+Qd[y],l+=O}var te=h[ul(i,l)&K],he=te>>>4;if(!te)throw"invalid distance";l+=te&15;var J=hy[he];if(he>3){var O=Xd[he];J+=ul(i,l)&(1<<O)-1,l+=O}if(l>g){if(s)throw"unexpected EOF";break}r&&a(c+131072);for(var j=c+ce;c<j;c+=4)e[c]=e[c-J],e[c+1]=e[c+1-J],e[c+2]=e[c+2-J],e[c+3]=e[c+3-J];c=j}}t.l=u,t.p=ee,t.b=c,u&&(o=1,t.m=d,t.d=h,t.n=p)}while(!o);return c==e.length?e:my(e,0,c)},vy=new Un(0),xy=function(i){if((i[0]&15)!=8||i[0]>>>4>7||(i[0]<<8|i[1])%31)throw"invalid zlib data";if(i[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function Ga(i,e){return gy((xy(i),i.subarray(2,-4)),e)}var wy=typeof TextDecoder<"u"&&new TextDecoder,yy=0;try{wy.decode(vy,{stream:!0}),yy=1}catch{}class vo extends Gd{constructor(e){super(e),this.type=yt}parse(e){const b=Math.pow(2.7182818,2.2);function D(w,S){let R=0;for(let Z=0;Z<65536;++Z)(Z==0||w[Z>>3]&1<<(Z&7))&&(S[R++]=Z);const k=R-1;for(;R<65536;)S[R++]=0;return k}function U(w){for(let S=0;S<16384;S++)w[S]={},w[S].len=0,w[S].lit=0,w[S].p=null}const W={l:0,c:0,lc:0};function N(w,S,R,k,Z){for(;R<w;)S=S<<8|ke(k,Z),R+=8;R-=w,W.l=S>>R&(1<<w)-1,W.c=S,W.lc=R}const F=new Array(59);function V(w){for(let R=0;R<=58;++R)F[R]=0;for(let R=0;R<65537;++R)F[w[R]]+=1;let S=0;for(let R=58;R>0;--R){const k=S+F[R]>>1;F[R]=S,S=k}for(let R=0;R<65537;++R){const k=w[R];k>0&&(w[R]=k|F[k]++<<6)}}function J(w,S,R,k,Z,Y){const ae=S;let fe=0,ve=0;for(;k<=Z;k++){if(ae.value-S.value>R)return!1;N(6,fe,ve,w,ae);const oe=W.l;if(fe=W.c,ve=W.lc,Y[k]=oe,oe==63){if(ae.value-S.value>R)throw new Error("Something wrong with hufUnpackEncTable");N(8,fe,ve,w,ae);let le=W.l+6;if(fe=W.c,ve=W.lc,k+le>Z+1)throw new Error("Something wrong with hufUnpackEncTable");for(;le--;)Y[k++]=0;k--}else if(oe>=59){let le=oe-59+2;if(k+le>Z+1)throw new Error("Something wrong with hufUnpackEncTable");for(;le--;)Y[k++]=0;k--}}V(Y)}function ne(w){return w&63}function K(w){return w>>6}function ee(w,S,R,k){for(;S<=R;S++){const Z=K(w[S]),Y=ne(w[S]);if(Z>>Y)throw new Error("Invalid table entry");if(Y>14){const ae=k[Z>>Y-14];if(ae.len)throw new Error("Invalid table entry");if(ae.lit++,ae.p){const fe=ae.p;ae.p=new Array(ae.lit);for(let ve=0;ve<ae.lit-1;++ve)ae.p[ve]=fe[ve]}else ae.p=new Array(1);ae.p[ae.lit-1]=S}else if(Y){let ae=0;for(let fe=1<<14-Y;fe>0;fe--){const ve=k[(Z<<14-Y)+ae];if(ve.len||ve.p)throw new Error("Invalid table entry");ve.len=Y,ve.lit=S,ae++}}}return!0}const se={c:0,lc:0};function ce(w,S,R,k){w=w<<8|ke(R,k),S+=8,se.c=w,se.lc=S}const O={c:0,lc:0};function te(w,S,R,k,Z,Y,ae,fe,ve){if(w==S){k<8&&(ce(R,k,Z,Y),R=se.c,k=se.lc),k-=8;let oe=R>>k;if(oe=new Uint8Array([oe])[0],fe.value+oe>ve)return!1;const le=ae[fe.value-1];for(;oe-- >0;)ae[fe.value++]=le}else if(fe.value<ve)ae[fe.value++]=w;else return!1;O.c=R,O.lc=k}function he(w){return w&65535}function j(w){const S=he(w);return S>32767?S-65536:S}const ue={a:0,b:0};function ye(w,S){const R=j(w),Z=j(S),Y=R+(Z&1)+(Z>>1),ae=Y,fe=Y-Z;ue.a=ae,ue.b=fe}function xe(w,S){const R=he(w),k=he(S),Z=R-(k>>1)&65535,Y=k+Z-32768&65535;ue.a=Y,ue.b=Z}function Se(w,S,R,k,Z,Y,ae){const fe=ae<16384,ve=R>Z?Z:R;let oe=1,le,pe;for(;oe<=ve;)oe<<=1;for(oe>>=1,le=oe,oe>>=1;oe>=1;){pe=0;const Re=pe+Y*(Z-le),Pe=Y*oe,je=Y*le,Oe=k*oe,Ge=k*le;let Ze,tt,ot,Jt;for(;pe<=Re;pe+=je){let Je=pe;const nt=pe+k*(R-le);for(;Je<=nt;Je+=Ge){const Dt=Je+Oe,pn=Je+Pe,Ht=pn+Oe;fe?(ye(w[Je+S],w[pn+S]),Ze=ue.a,ot=ue.b,ye(w[Dt+S],w[Ht+S]),tt=ue.a,Jt=ue.b,ye(Ze,tt),w[Je+S]=ue.a,w[Dt+S]=ue.b,ye(ot,Jt),w[pn+S]=ue.a,w[Ht+S]=ue.b):(xe(w[Je+S],w[pn+S]),Ze=ue.a,ot=ue.b,xe(w[Dt+S],w[Ht+S]),tt=ue.a,Jt=ue.b,xe(Ze,tt),w[Je+S]=ue.a,w[Dt+S]=ue.b,xe(ot,Jt),w[pn+S]=ue.a,w[Ht+S]=ue.b)}if(R&oe){const Dt=Je+Pe;fe?ye(w[Je+S],w[Dt+S]):xe(w[Je+S],w[Dt+S]),Ze=ue.a,w[Dt+S]=ue.b,w[Je+S]=Ze}}if(Z&oe){let Je=pe;const nt=pe+k*(R-le);for(;Je<=nt;Je+=Ge){const Dt=Je+Oe;fe?ye(w[Je+S],w[Dt+S]):xe(w[Je+S],w[Dt+S]),Ze=ue.a,w[Dt+S]=ue.b,w[Je+S]=Ze}}le=oe,oe>>=1}return pe}function Ae(w,S,R,k,Z,Y,ae,fe,ve){let oe=0,le=0;const pe=ae,Re=Math.trunc(k.value+(Z+7)/8);for(;k.value<Re;)for(ce(oe,le,R,k),oe=se.c,le=se.lc;le>=14;){const je=oe>>le-14&16383,Oe=S[je];if(Oe.len)le-=Oe.len,te(Oe.lit,Y,oe,le,R,k,fe,ve,pe),oe=O.c,le=O.lc;else{if(!Oe.p)throw new Error("hufDecode issues");let Ge;for(Ge=0;Ge<Oe.lit;Ge++){const Ze=ne(w[Oe.p[Ge]]);for(;le<Ze&&k.value<Re;)ce(oe,le,R,k),oe=se.c,le=se.lc;if(le>=Ze&&K(w[Oe.p[Ge]])==(oe>>le-Ze&(1<<Ze)-1)){le-=Ze,te(Oe.p[Ge],Y,oe,le,R,k,fe,ve,pe),oe=O.c,le=O.lc;break}}if(Ge==Oe.lit)throw new Error("hufDecode issues")}}const Pe=8-Z&7;for(oe>>=Pe,le-=Pe;le>0;){const je=S[oe<<14-le&16383];if(je.len)le-=je.len,te(je.lit,Y,oe,le,R,k,fe,ve,pe),oe=O.c,le=O.lc;else throw new Error("hufDecode issues")}return!0}function Le(w,S,R,k,Z,Y){const ae={value:0},fe=R.value,ve=Ee(S,R),oe=Ee(S,R);R.value+=4;const le=Ee(S,R);if(R.value+=4,ve<0||ve>=65537||oe<0||oe>=65537)throw new Error("Something wrong with HUF_ENCSIZE");const pe=new Array(65537),Re=new Array(16384);U(Re);const Pe=k-(R.value-fe);if(J(w,R,Pe,ve,oe,pe),le>8*(k-(R.value-fe)))throw new Error("Something wrong with hufUncompress");ee(pe,ve,oe,Re),Ae(pe,Re,w,R,le,oe,Y,Z,ae)}function qe(w,S,R){for(let k=0;k<R;++k)S[k]=w[S[k]]}function et(w){for(let S=1;S<w.length;S++){const R=w[S-1]+w[S]-128;w[S]=R}}function bt(w,S){let R=0,k=Math.floor((w.length+1)/2),Z=0;const Y=w.length-1;for(;!(Z>Y||(S[Z++]=w[R++],Z>Y));)S[Z++]=w[k++]}function Nt(w){let S=w.byteLength;const R=new Array;let k=0;const Z=new DataView(w);for(;S>0;){const Y=Z.getInt8(k++);if(Y<0){const ae=-Y;S-=ae+1;for(let fe=0;fe<ae;fe++)R.push(Z.getUint8(k++))}else{const ae=Y;S-=2;const fe=Z.getUint8(k++);for(let ve=0;ve<ae+1;ve++)R.push(fe)}}return R}function It(w,S,R,k,Z,Y){let ae=new DataView(Y.buffer);const fe=R[w.idx[0]].width,ve=R[w.idx[0]].height,oe=3,le=Math.floor(fe/8),pe=Math.ceil(fe/8),Re=Math.ceil(ve/8),Pe=fe-(pe-1)*8,je=ve-(Re-1)*8,Oe={value:0},Ge=new Array(oe),Ze=new Array(oe),tt=new Array(oe),ot=new Array(oe),Jt=new Array(oe);for(let nt=0;nt<oe;++nt)Jt[nt]=S[w.idx[nt]],Ge[nt]=nt<1?0:Ge[nt-1]+pe*Re,Ze[nt]=new Float32Array(64),tt[nt]=new Uint16Array(64),ot[nt]=new Uint16Array(pe*64);for(let nt=0;nt<Re;++nt){let Dt=8;nt==Re-1&&(Dt=je);let pn=8;for(let lt=0;lt<pe;++lt){lt==pe-1&&(pn=Pe);for(let xt=0;xt<oe;++xt)tt[xt].fill(0),tt[xt][0]=Z[Ge[xt]++],Lt(Oe,k,tt[xt]),vt(tt[xt],Ze[xt]),ht(Ze[xt]);fn(Ze);for(let xt=0;xt<oe;++xt)Zt(Ze[xt],ot[xt],lt*64)}let Ht=0;for(let lt=0;lt<oe;++lt){const xt=R[w.idx[lt]].type;for(let gi=8*nt;gi<8*nt+Dt;++gi){Ht=Jt[lt][gi];for(let ys=0;ys<le;++ys){const Kn=ys*64+(gi&7)*8;ae.setUint16(Ht+0*2*xt,ot[lt][Kn+0],!0),ae.setUint16(Ht+1*2*xt,ot[lt][Kn+1],!0),ae.setUint16(Ht+2*2*xt,ot[lt][Kn+2],!0),ae.setUint16(Ht+3*2*xt,ot[lt][Kn+3],!0),ae.setUint16(Ht+4*2*xt,ot[lt][Kn+4],!0),ae.setUint16(Ht+5*2*xt,ot[lt][Kn+5],!0),ae.setUint16(Ht+6*2*xt,ot[lt][Kn+6],!0),ae.setUint16(Ht+7*2*xt,ot[lt][Kn+7],!0),Ht+=8*2*xt}}if(le!=pe)for(let gi=8*nt;gi<8*nt+Dt;++gi){const ys=Jt[lt][gi]+8*le*2*xt,Kn=le*64+(gi&7)*8;for(let va=0;va<pn;++va)ae.setUint16(ys+va*2*xt,ot[lt][Kn+va],!0)}}}const Je=new Uint16Array(fe);ae=new DataView(Y.buffer);for(let nt=0;nt<oe;++nt){R[w.idx[nt]].decoded=!0;const Dt=R[w.idx[nt]].type;if(R[nt].type==2)for(let pn=0;pn<ve;++pn){const Ht=Jt[nt][pn];for(let lt=0;lt<fe;++lt)Je[lt]=ae.getUint16(Ht+lt*2*Dt,!0);for(let lt=0;lt<fe;++lt)ae.setFloat32(Ht+lt*2*Dt,G(Je[lt]),!0)}}}function Lt(w,S,R){let k,Z=1;for(;Z<64;)k=S[w.value],k==65280?Z=64:k>>8==255?Z+=k&255:(R[Z]=k,Z++),w.value++}function vt(w,S){S[0]=G(w[0]),S[1]=G(w[1]),S[2]=G(w[5]),S[3]=G(w[6]),S[4]=G(w[14]),S[5]=G(w[15]),S[6]=G(w[27]),S[7]=G(w[28]),S[8]=G(w[2]),S[9]=G(w[4]),S[10]=G(w[7]),S[11]=G(w[13]),S[12]=G(w[16]),S[13]=G(w[26]),S[14]=G(w[29]),S[15]=G(w[42]),S[16]=G(w[3]),S[17]=G(w[8]),S[18]=G(w[12]),S[19]=G(w[17]),S[20]=G(w[25]),S[21]=G(w[30]),S[22]=G(w[41]),S[23]=G(w[43]),S[24]=G(w[9]),S[25]=G(w[11]),S[26]=G(w[18]),S[27]=G(w[24]),S[28]=G(w[31]),S[29]=G(w[40]),S[30]=G(w[44]),S[31]=G(w[53]),S[32]=G(w[10]),S[33]=G(w[19]),S[34]=G(w[23]),S[35]=G(w[32]),S[36]=G(w[39]),S[37]=G(w[45]),S[38]=G(w[52]),S[39]=G(w[54]),S[40]=G(w[20]),S[41]=G(w[22]),S[42]=G(w[33]),S[43]=G(w[38]),S[44]=G(w[46]),S[45]=G(w[51]),S[46]=G(w[55]),S[47]=G(w[60]),S[48]=G(w[21]),S[49]=G(w[34]),S[50]=G(w[37]),S[51]=G(w[47]),S[52]=G(w[50]),S[53]=G(w[56]),S[54]=G(w[59]),S[55]=G(w[61]),S[56]=G(w[35]),S[57]=G(w[36]),S[58]=G(w[48]),S[59]=G(w[49]),S[60]=G(w[57]),S[61]=G(w[58]),S[62]=G(w[62]),S[63]=G(w[63])}function ht(w){const S=.5*Math.cos(.7853975),R=.5*Math.cos(3.14159/16),k=.5*Math.cos(3.14159/8),Z=.5*Math.cos(3*3.14159/16),Y=.5*Math.cos(5*3.14159/16),ae=.5*Math.cos(3*3.14159/8),fe=.5*Math.cos(7*3.14159/16),ve=new Array(4),oe=new Array(4),le=new Array(4),pe=new Array(4);for(let Re=0;Re<8;++Re){const Pe=Re*8;ve[0]=k*w[Pe+2],ve[1]=ae*w[Pe+2],ve[2]=k*w[Pe+6],ve[3]=ae*w[Pe+6],oe[0]=R*w[Pe+1]+Z*w[Pe+3]+Y*w[Pe+5]+fe*w[Pe+7],oe[1]=Z*w[Pe+1]-fe*w[Pe+3]-R*w[Pe+5]-Y*w[Pe+7],oe[2]=Y*w[Pe+1]-R*w[Pe+3]+fe*w[Pe+5]+Z*w[Pe+7],oe[3]=fe*w[Pe+1]-Y*w[Pe+3]+Z*w[Pe+5]-R*w[Pe+7],le[0]=S*(w[Pe+0]+w[Pe+4]),le[3]=S*(w[Pe+0]-w[Pe+4]),le[1]=ve[0]+ve[3],le[2]=ve[1]-ve[2],pe[0]=le[0]+le[1],pe[1]=le[3]+le[2],pe[2]=le[3]-le[2],pe[3]=le[0]-le[1],w[Pe+0]=pe[0]+oe[0],w[Pe+1]=pe[1]+oe[1],w[Pe+2]=pe[2]+oe[2],w[Pe+3]=pe[3]+oe[3],w[Pe+4]=pe[3]-oe[3],w[Pe+5]=pe[2]-oe[2],w[Pe+6]=pe[1]-oe[1],w[Pe+7]=pe[0]-oe[0]}for(let Re=0;Re<8;++Re)ve[0]=k*w[16+Re],ve[1]=ae*w[16+Re],ve[2]=k*w[48+Re],ve[3]=ae*w[48+Re],oe[0]=R*w[8+Re]+Z*w[24+Re]+Y*w[40+Re]+fe*w[56+Re],oe[1]=Z*w[8+Re]-fe*w[24+Re]-R*w[40+Re]-Y*w[56+Re],oe[2]=Y*w[8+Re]-R*w[24+Re]+fe*w[40+Re]+Z*w[56+Re],oe[3]=fe*w[8+Re]-Y*w[24+Re]+Z*w[40+Re]-R*w[56+Re],le[0]=S*(w[Re]+w[32+Re]),le[3]=S*(w[Re]-w[32+Re]),le[1]=ve[0]+ve[3],le[2]=ve[1]-ve[2],pe[0]=le[0]+le[1],pe[1]=le[3]+le[2],pe[2]=le[3]-le[2],pe[3]=le[0]-le[1],w[0+Re]=pe[0]+oe[0],w[8+Re]=pe[1]+oe[1],w[16+Re]=pe[2]+oe[2],w[24+Re]=pe[3]+oe[3],w[32+Re]=pe[3]-oe[3],w[40+Re]=pe[2]-oe[2],w[48+Re]=pe[1]-oe[1],w[56+Re]=pe[0]-oe[0]}function fn(w){for(let S=0;S<64;++S){const R=w[0][S],k=w[1][S],Z=w[2][S];w[0][S]=R+1.5747*Z,w[1][S]=R-.1873*k-.4682*Z,w[2][S]=R+1.8556*k}}function Zt(w,S,R){for(let k=0;k<64;++k)S[R+k]=Kr.toHalfFloat(L(w[k]))}function L(w){return w<=1?Math.sign(w)*Math.pow(Math.abs(w),2.2):Math.sign(w)*Math.pow(b,Math.abs(w)-1)}function E(w){return new DataView(w.array.buffer,w.offset.value,w.size)}function ie(w){const S=w.viewer.buffer.slice(w.offset.value,w.offset.value+w.size),R=new Uint8Array(Nt(S)),k=new Uint8Array(R.length);return et(R),bt(R,k),new DataView(k.buffer)}function we(w){const S=w.array.slice(w.offset.value,w.offset.value+w.size),R=Ga(S),k=new Uint8Array(R.length);return et(R),bt(R,k),new DataView(k.buffer)}function _e(w){const S=w.viewer,R={value:w.offset.value},k=new Uint16Array(w.width*w.scanlineBlockSize*(w.channels*w.type)),Z=new Uint8Array(8192);let Y=0;const ae=new Array(w.channels);for(let je=0;je<w.channels;je++)ae[je]={},ae[je].start=Y,ae[je].end=ae[je].start,ae[je].nx=w.width,ae[je].ny=w.lines,ae[je].size=w.type,Y+=ae[je].nx*ae[je].ny*ae[je].size;const fe=de(S,R),ve=de(S,R);if(ve>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(fe<=ve)for(let je=0;je<ve-fe+1;je++)Z[je+fe]=Qe(S,R);const oe=new Uint16Array(65536),le=D(Z,oe),pe=Ee(S,R);Le(w.array,S,R,pe,k,Y);for(let je=0;je<w.channels;++je){const Oe=ae[je];for(let Ge=0;Ge<ae[je].size;++Ge)Se(k,Oe.start+Ge,Oe.nx,Oe.size,Oe.ny,Oe.nx*Oe.size,le)}qe(oe,k,Y);let Re=0;const Pe=new Uint8Array(k.buffer.byteLength);for(let je=0;je<w.lines;je++)for(let Oe=0;Oe<w.channels;Oe++){const Ge=ae[Oe],Ze=Ge.nx*Ge.size,tt=new Uint8Array(k.buffer,Ge.end*2,Ze*2);Pe.set(tt,Re),Re+=Ze*2,Ge.end+=Ze}return new DataView(Pe.buffer)}function Te(w){const S=w.array.slice(w.offset.value,w.offset.value+w.size),R=Ga(S),k=w.lines*w.channels*w.width,Z=w.type==1?new Uint16Array(k):new Uint32Array(k);let Y=0,ae=0;const fe=new Array(4);for(let ve=0;ve<w.lines;ve++)for(let oe=0;oe<w.channels;oe++){let le=0;switch(w.type){case 1:fe[0]=Y,fe[1]=fe[0]+w.width,Y=fe[1]+w.width;for(let pe=0;pe<w.width;++pe){const Re=R[fe[0]++]<<8|R[fe[1]++];le+=Re,Z[ae]=le,ae++}break;case 2:fe[0]=Y,fe[1]=fe[0]+w.width,fe[2]=fe[1]+w.width,Y=fe[2]+w.width;for(let pe=0;pe<w.width;++pe){const Re=R[fe[0]++]<<24|R[fe[1]++]<<16|R[fe[2]++]<<8;le+=Re,Z[ae]=le,ae++}break}}return new DataView(Z.buffer)}function He(w){const S=w.viewer,R={value:w.offset.value},k=new Uint8Array(w.width*w.lines*(w.channels*w.type*2)),Z={version:Xe(S,R),unknownUncompressedSize:Xe(S,R),unknownCompressedSize:Xe(S,R),acCompressedSize:Xe(S,R),dcCompressedSize:Xe(S,R),rleCompressedSize:Xe(S,R),rleUncompressedSize:Xe(S,R),rleRawSize:Xe(S,R),totalAcUncompressedCount:Xe(S,R),totalDcUncompressedCount:Xe(S,R),acCompression:Xe(S,R)};if(Z.version<2)throw new Error("EXRLoader.parse: "+$.compression+" version "+Z.version+" is unsupported");const Y=new Array;let ae=de(S,R)-2;for(;ae>0;){const Oe=B(S.buffer,R),Ge=Qe(S,R),Ze=Ge>>2&3,tt=(Ge>>4)-1,ot=new Int8Array([tt])[0],Jt=Qe(S,R);Y.push({name:Oe,index:ot,type:Jt,compression:Ze}),ae-=Oe.length+3}const fe=$.channels,ve=new Array(w.channels);for(let Oe=0;Oe<w.channels;++Oe){const Ge=ve[Oe]={},Ze=fe[Oe];Ge.name=Ze.name,Ge.compression=0,Ge.decoded=!1,Ge.type=Ze.pixelType,Ge.pLinear=Ze.pLinear,Ge.width=w.width,Ge.height=w.lines}const oe={idx:new Array(3)};for(let Oe=0;Oe<w.channels;++Oe){const Ge=ve[Oe];for(let Ze=0;Ze<Y.length;++Ze){const tt=Y[Ze];Ge.name==tt.name&&(Ge.compression=tt.compression,tt.index>=0&&(oe.idx[tt.index]=Oe),Ge.offset=Oe)}}let le,pe,Re;if(Z.acCompressedSize>0)switch(Z.acCompression){case 0:le=new Uint16Array(Z.totalAcUncompressedCount),Le(w.array,S,R,Z.acCompressedSize,le,Z.totalAcUncompressedCount);break;case 1:const Oe=w.array.slice(R.value,R.value+Z.totalAcUncompressedCount),Ge=Ga(Oe);le=new Uint16Array(Ge.buffer),R.value+=Z.totalAcUncompressedCount;break}if(Z.dcCompressedSize>0){const Oe={array:w.array,offset:R,size:Z.dcCompressedSize};pe=new Uint16Array(we(Oe).buffer),R.value+=Z.dcCompressedSize}if(Z.rleRawSize>0){const Oe=w.array.slice(R.value,R.value+Z.rleCompressedSize),Ge=Ga(Oe);Re=Nt(Ge.buffer),R.value+=Z.rleCompressedSize}let Pe=0;const je=new Array(ve.length);for(let Oe=0;Oe<je.length;++Oe)je[Oe]=new Array;for(let Oe=0;Oe<w.lines;++Oe)for(let Ge=0;Ge<ve.length;++Ge)je[Ge].push(Pe),Pe+=ve[Ge].width*w.type*2;It(oe,je,ve,le,pe,k);for(let Oe=0;Oe<ve.length;++Oe){const Ge=ve[Oe];if(!Ge.decoded)switch(Ge.compression){case 2:let Ze=0,tt=0;for(let ot=0;ot<w.lines;++ot){let Jt=je[Oe][Ze];for(let Je=0;Je<Ge.width;++Je){for(let nt=0;nt<2*Ge.type;++nt)k[Jt++]=Re[tt+nt*Ge.width*Ge.height];tt++}Ze++}break;case 1:default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(k.buffer)}function B(w,S){const R=new Uint8Array(w);let k=0;for(;R[S.value+k]!=0;)k+=1;const Z=new TextDecoder().decode(R.slice(S.value,S.value+k));return S.value=S.value+k+1,Z}function q(w,S,R){const k=new TextDecoder().decode(new Uint8Array(w).slice(S.value,S.value+R));return S.value=S.value+R,k}function Ce(w,S){const R=Be(w,S),k=Ee(w,S);return[R,k]}function Me(w,S){const R=Ee(w,S),k=Ee(w,S);return[R,k]}function Be(w,S){const R=w.getInt32(S.value,!0);return S.value=S.value+4,R}function Ee(w,S){const R=w.getUint32(S.value,!0);return S.value=S.value+4,R}function ke(w,S){const R=w[S.value];return S.value=S.value+1,R}function Qe(w,S){const R=w.getUint8(S.value);return S.value=S.value+1,R}const Xe=function(w,S){let R;return"getBigInt64"in DataView.prototype?R=Number(w.getBigInt64(S.value,!0)):R=w.getUint32(S.value+4,!0)+Number(w.getUint32(S.value,!0)<<32),S.value+=8,R};function Ye(w,S){const R=w.getFloat32(S.value,!0);return S.value+=4,R}function H(w,S){return Kr.toHalfFloat(Ye(w,S))}function G(w){const S=(w&31744)>>10,R=w&1023;return(w>>15?-1:1)*(S?S===31?R?NaN:1/0:Math.pow(2,S-15)*(1+R/1024):6103515625e-14*(R/1024))}function de(w,S){const R=w.getUint16(S.value,!0);return S.value+=2,R}function De(w,S){return G(de(w,S))}function Ue(w,S,R,k){const Z=R.value,Y=[];for(;R.value<Z+k-1;){const ae=B(S,R),fe=Be(w,R),ve=Qe(w,R);R.value+=3;const oe=Be(w,R),le=Be(w,R);Y.push({name:ae,pixelType:fe,pLinear:ve,xSampling:oe,ySampling:le})}return R.value+=1,Y}function dt(w,S){const R=Ye(w,S),k=Ye(w,S),Z=Ye(w,S),Y=Ye(w,S),ae=Ye(w,S),fe=Ye(w,S),ve=Ye(w,S),oe=Ye(w,S);return{redX:R,redY:k,greenX:Z,greenY:Y,blueX:ae,blueY:fe,whiteX:ve,whiteY:oe}}function Bt(w,S){const R=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],k=Qe(w,S);return R[k]}function Kt(w,S){const R=Ee(w,S),k=Ee(w,S),Z=Ee(w,S),Y=Ee(w,S);return{xMin:R,yMin:k,xMax:Z,yMax:Y}}function Dn(w,S){const R=["INCREASING_Y"],k=Qe(w,S);return R[k]}function St(w,S){const R=Ye(w,S),k=Ye(w,S);return[R,k]}function yn(w,S){const R=Ye(w,S),k=Ye(w,S),Z=Ye(w,S);return[R,k,Z]}function Pn(w,S,R,k,Z){if(k==="string"||k==="stringvector"||k==="iccProfile")return q(S,R,Z);if(k==="chlist")return Ue(w,S,R,Z);if(k==="chromaticities")return dt(w,R);if(k==="compression")return Bt(w,R);if(k==="box2i")return Kt(w,R);if(k==="lineOrder")return Dn(w,R);if(k==="float")return Ye(w,R);if(k==="v2f")return St(w,R);if(k==="v3f")return yn(w,R);if(k==="int")return Be(w,R);if(k==="rational")return Ce(w,R);if(k==="timecode")return Me(w,R);if(k==="preview")return R.value+=Z,"skipped";R.value+=Z}function So(w,S,R){const k={};if(w.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.");k.version=w.getUint8(4);const Z=w.getUint8(5);k.spec={singleTile:!!(Z&2),longName:!!(Z&4),deepFormat:!!(Z&8),multiPart:!!(Z&16)},R.value=8;let Y=!0;for(;Y;){const ae=B(S,R);if(ae==0)Y=!1;else{const fe=B(S,R),ve=Ee(w,R),oe=Pn(w,S,R,fe,ve);oe===void 0?console.warn(`EXRLoader.parse: skipped unknown header attribute type '${fe}'.`):k[ae]=oe}}if(Z&-5)throw console.error("EXRHeader:",k),new Error("THREE.EXRLoader: provided file is currently unsupported.");return k}function To(w,S,R,k,Z){const Y={size:0,viewer:S,array:R,offset:k,width:w.dataWindow.xMax-w.dataWindow.xMin+1,height:w.dataWindow.yMax-w.dataWindow.yMin+1,channels:w.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:w.channels[0].pixelType,uncompress:null,getter:null,format:null,encoding:null};switch(w.compression){case"NO_COMPRESSION":Y.lines=1,Y.uncompress=E;break;case"RLE_COMPRESSION":Y.lines=1,Y.uncompress=ie;break;case"ZIPS_COMPRESSION":Y.lines=1,Y.uncompress=we;break;case"ZIP_COMPRESSION":Y.lines=16,Y.uncompress=we;break;case"PIZ_COMPRESSION":Y.lines=32,Y.uncompress=_e;break;case"PXR24_COMPRESSION":Y.lines=16,Y.uncompress=Te;break;case"DWAA_COMPRESSION":Y.lines=32,Y.uncompress=He;break;case"DWAB_COMPRESSION":Y.lines=256,Y.uncompress=He;break;default:throw new Error("EXRLoader.parse: "+w.compression+" is unsupported")}if(Y.scanlineBlockSize=Y.lines,Y.type==1)switch(Z){case it:Y.getter=De,Y.inputSize=2;break;case yt:Y.getter=de,Y.inputSize=2;break}else if(Y.type==2)switch(Z){case it:Y.getter=Ye,Y.inputSize=4;break;case yt:Y.getter=H,Y.inputSize=4}else throw new Error("EXRLoader.parse: unsupported pixelType "+Y.type+" for "+w.compression+".");Y.blockCount=(w.dataWindow.yMax+1)/Y.scanlineBlockSize;for(let fe=0;fe<Y.blockCount;fe++)Xe(S,k);Y.outputChannels=Y.channels==3?4:Y.channels;const ae=Y.width*Y.height*Y.outputChannels;switch(Z){case it:Y.byteArray=new Float32Array(ae),Y.channels<Y.outputChannels&&Y.byteArray.fill(1,0,ae);break;case yt:Y.byteArray=new Uint16Array(ae),Y.channels<Y.outputChannels&&Y.byteArray.fill(15360,0,ae);break;default:console.error("THREE.EXRLoader: unsupported type: ",Z);break}return Y.bytesPerLine=Y.width*Y.inputSize*Y.channels,Y.outputChannels==4?(Y.format=Ft,Y.encoding=dn):(Y.format=eo,Y.encoding=dn),Y}const Tr=new DataView(e),C=new Uint8Array(e),Q={value:0},$=So(Tr,e,Q),z=To($,Tr,C,Q,this.type),re={value:0},Ve={R:0,G:1,B:2,A:3,Y:0};for(let w=0;w<z.height/z.scanlineBlockSize;w++){const S=Ee(Tr,Q);z.size=Ee(Tr,Q),z.lines=S+z.scanlineBlockSize>z.height?z.height-S:z.scanlineBlockSize;const k=z.size<z.lines*z.bytesPerLine?z.uncompress(z):E(z);Q.value+=z.size;for(let Z=0;Z<z.scanlineBlockSize;Z++){const Y=Z+w*z.scanlineBlockSize;if(Y>=z.height)break;for(let ae=0;ae<z.channels;ae++){const fe=Ve[$.channels[ae].name];for(let ve=0;ve<z.width;ve++){re.value=(Z*(z.channels*z.width)+ae*z.width+ve)*z.inputSize;const oe=(z.height-1-Y)*(z.width*z.outputChannels)+ve*z.outputChannels+fe;z.byteArray[oe]=z.getter(k,re)}}}}return{header:$,width:z.width,height:z.height,data:z.byteArray,format:z.format,encoding:z.encoding,type:this.type}}setDataType(e){return this.type=e,this}load(e,t,n,r){function s(a,o){a.encoding=o.encoding,a.minFilter=Fe,a.magFilter=Fe,a.generateMipmaps=!1,a.flipY=!1,t&&t(a,o)}return super.load(e,s,n,r)}}class pa extends me{constructor(e,t={}){const r=[e.isCubeTexture?"#define ENVMAP_TYPE_CUBE":""],s=`
        varying vec3 vWorldPosition;

        void main() 
        {

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
        `,o={map:{value:e},height:{value:t.height||15},radius:{value:t.radius||100}},l=new dc(1,16),c=new _t({uniforms:o,fragmentShader:a,vertexShader:s,side:wn});super(l,c)}set radius(e){this.material.uniforms.radius.value=e}get radius(){return this.material.uniforms.radius.value}set height(e){this.material.uniforms.height.value=e}get height(){return this.material.uniforms.height.value}}const hl=new WeakMap;class xs extends Ji{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,r){const s=new ls(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,a=>{this.parse(a,t,r)},n,r)}parse(e,t,n){this.decodeDracoFile(e,t,null,null,Bn).catch(n)}decodeDracoFile(e,t,n,r,s=ss){const a={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:r||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:s};return this.decodeGeometry(e,a).then(t)}decodeGeometry(e,t){const n=JSON.stringify(t);if(hl.has(e)){const l=hl.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let r;const s=this.workerNextTaskID++,a=e.byteLength,o=this._getWorker(s,a).then(l=>(r=l,new Promise((c,u)=>{r._callbacks[s]={resolve:c,reject:u},r.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{r&&s&&this._releaseTask(r,s)}),hl.set(e,{key:n,promise:o}),o}_createGeometry(e){const t=new Rt;e.index&&t.setIndex(new Et(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const r=e.attributes[n],s=r.name,a=r.array,o=r.itemSize,l=new Et(a,o);s==="color"&&this._assignVertexColorSpace(l,r.vertexColorSpace),t.setAttribute(s,l)}return t}_assignVertexColorSpace(e,t){if(t!==Bn)return;const n=new Ie;for(let r=0,s=e.count;r<s;r++)n.fromBufferAttribute(e,r).convertSRGBToLinear(),e.setXYZ(r,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new ls(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((r,s)=>{n.load(e,r,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const r=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const s=_y.toString(),a=["/* draco decoder */",r,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([a]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const r=new Worker(this.workerSourceURL);r._callbacks={},r._taskCosts={},r._taskLoad=0,r.postMessage({type:"init",decoderConfig:this.decoderConfig}),r.onmessage=function(s){const a=s.data;switch(a.type){case"decode":r._callbacks[a.id].resolve(a);break;case"error":r._callbacks[a.id].reject(a);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+a.type+'"')}},this.workerPool.push(r)}else this.workerPool.sort(function(r,s){return r._taskLoad>s._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function _y(){let i,e;onmessage=function(a){const o=a.data;switch(o.type){case"init":i=o.decoderConfig,e=new Promise(function(u){i.onModuleLoaded=function(h){u({draco:h})},DracoDecoderModule(i)});break;case"decode":const l=o.buffer,c=o.taskConfig;e.then(u=>{const h=u.draco,d=new h.Decoder;try{const p=t(h,d,new Int8Array(l),c),g=p.attributes.map(m=>m.array.buffer);p.index&&g.push(p.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:p},g)}catch(p){console.error(p),self.postMessage({type:"error",id:o.id,error:p.message})}finally{h.destroy(d)}});break}};function t(a,o,l,c){const u=c.attributeIDs,h=c.attributeTypes;let d,p;const g=o.GetEncodedGeometryType(l);if(g===a.TRIANGULAR_MESH)d=new a.Mesh,p=o.DecodeArrayToMesh(l,l.byteLength,d);else if(g===a.POINT_CLOUD)d=new a.PointCloud,p=o.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!p.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+p.error_msg());const m={index:null,attributes:[]};for(const f in u){const x=self[h[f]];let A,v;if(c.useUniqueIDs)v=u[f],A=o.GetAttributeByUniqueId(d,v);else{if(v=o.GetAttributeId(d,a[u[f]]),v===-1)continue;A=o.GetAttribute(d,v)}const _=r(a,o,d,f,x,A);f==="color"&&(_.vertexColorSpace=c.vertexColorSpace),m.attributes.push(_)}return g===a.TRIANGULAR_MESH&&(m.index=n(a,o,d)),a.destroy(d),m}function n(a,o,l){const u=l.num_faces()*3,h=u*4,d=a._malloc(h);o.GetTrianglesUInt32Array(l,h,d);const p=new Uint32Array(a.HEAPF32.buffer,d,u).slice();return a._free(d),{array:p,itemSize:1}}function r(a,o,l,c,u,h){const d=h.num_components(),g=l.num_points()*d,m=g*u.BYTES_PER_ELEMENT,f=s(a,u),x=a._malloc(m);o.GetAttributeDataArrayForAllPoints(l,h,f,m,x);const A=new u(a.HEAPF32.buffer,x,g).slice();return a._free(x),{name:c,array:A,itemSize:d}}function s(a,o){switch(o){case Float32Array:return a.DT_FLOAT32;case Int8Array:return a.DT_INT8;case Int16Array:return a.DT_INT16;case Int32Array:return a.DT_INT32;case Uint8Array:return a.DT_UINT8;case Uint16Array:return a.DT_UINT16;case Uint32Array:return a.DT_UINT32}}}const hh={type:"change"},dl={type:"start"},dh={type:"end"};class ws extends fi{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Er.ROTATE,MIDDLE:Er.DOLLY,RIGHT:Er.PAN},this.touches={ONE:Cr.ROTATE,TWO:Cr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(B){B.addEventListener("keydown",Zt),this._domElementKeyEvents=B},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Zt),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(hh),n.update(),s=r.NONE},this.update=function(){const B=new I,q=new Pt().setFromUnitVectors(e.up,new I(0,1,0)),Ce=q.clone().invert(),Me=new I,Be=new Pt,Ee=2*Math.PI;return function(){const Qe=n.object.position;B.copy(Qe).sub(n.target),B.applyQuaternion(q),o.setFromVector3(B),n.autoRotate&&s===r.NONE&&b(P()),n.enableDamping?(o.theta+=l.theta*n.dampingFactor,o.phi+=l.phi*n.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let Xe=n.minAzimuthAngle,Ye=n.maxAzimuthAngle;return isFinite(Xe)&&isFinite(Ye)&&(Xe<-Math.PI?Xe+=Ee:Xe>Math.PI&&(Xe-=Ee),Ye<-Math.PI?Ye+=Ee:Ye>Math.PI&&(Ye-=Ee),Xe<=Ye?o.theta=Math.max(Xe,Math.min(Ye,o.theta)):o.theta=o.theta>(Xe+Ye)/2?Math.max(Xe,o.theta):Math.min(Ye,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),o.radius*=c,o.radius=Math.max(n.minDistance,Math.min(n.maxDistance,o.radius)),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),B.setFromSpherical(o),B.applyQuaternion(Ce),Qe.copy(n.target).add(B),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),u.set(0,0,0)),c=1,h||Me.distanceToSquared(n.object.position)>a||8*(1-Be.dot(n.object.quaternion))>a?(n.dispatchEvent(hh),Me.copy(n.object.position),Be.copy(n.object.quaternion),h=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",ie),n.domElement.removeEventListener("pointerdown",bt),n.domElement.removeEventListener("pointercancel",Lt),n.domElement.removeEventListener("wheel",fn),n.domElement.removeEventListener("pointermove",Nt),n.domElement.removeEventListener("pointerup",It),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Zt),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const a=1e-6,o=new nh,l=new nh;let c=1;const u=new I;let h=!1;const d=new ge,p=new ge,g=new ge,m=new ge,f=new ge,x=new ge,A=new ge,v=new ge,_=new ge,M=[],T={};function P(){return 2*Math.PI/60/60*n.autoRotateSpeed}function y(){return Math.pow(.95,n.zoomSpeed)}function b(B){l.theta-=B}function D(B){l.phi-=B}const U=function(){const B=new I;return function(Ce,Me){B.setFromMatrixColumn(Me,0),B.multiplyScalar(-Ce),u.add(B)}}(),W=function(){const B=new I;return function(Ce,Me){n.screenSpacePanning===!0?B.setFromMatrixColumn(Me,1):(B.setFromMatrixColumn(Me,0),B.crossVectors(n.object.up,B)),B.multiplyScalar(Ce),u.add(B)}}(),N=function(){const B=new I;return function(Ce,Me){const Be=n.domElement;if(n.object.isPerspectiveCamera){const Ee=n.object.position;B.copy(Ee).sub(n.target);let ke=B.length();ke*=Math.tan(n.object.fov/2*Math.PI/180),U(2*Ce*ke/Be.clientHeight,n.object.matrix),W(2*Me*ke/Be.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(U(Ce*(n.object.right-n.object.left)/n.object.zoom/Be.clientWidth,n.object.matrix),W(Me*(n.object.top-n.object.bottom)/n.object.zoom/Be.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function F(B){n.object.isPerspectiveCamera?c/=B:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*B)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function V(B){n.object.isPerspectiveCamera?c*=B:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/B)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function J(B){d.set(B.clientX,B.clientY)}function ne(B){A.set(B.clientX,B.clientY)}function K(B){m.set(B.clientX,B.clientY)}function ee(B){p.set(B.clientX,B.clientY),g.subVectors(p,d).multiplyScalar(n.rotateSpeed);const q=n.domElement;b(2*Math.PI*g.x/q.clientHeight),D(2*Math.PI*g.y/q.clientHeight),d.copy(p),n.update()}function se(B){v.set(B.clientX,B.clientY),_.subVectors(v,A),_.y>0?F(y()):_.y<0&&V(y()),A.copy(v),n.update()}function ce(B){f.set(B.clientX,B.clientY),x.subVectors(f,m).multiplyScalar(n.panSpeed),N(x.x,x.y),m.copy(f),n.update()}function O(B){B.deltaY<0?V(y()):B.deltaY>0&&F(y()),n.update()}function te(B){let q=!1;switch(B.code){case n.keys.UP:B.ctrlKey||B.metaKey||B.shiftKey?D(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):N(0,n.keyPanSpeed),q=!0;break;case n.keys.BOTTOM:B.ctrlKey||B.metaKey||B.shiftKey?D(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):N(0,-n.keyPanSpeed),q=!0;break;case n.keys.LEFT:B.ctrlKey||B.metaKey||B.shiftKey?b(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):N(n.keyPanSpeed,0),q=!0;break;case n.keys.RIGHT:B.ctrlKey||B.metaKey||B.shiftKey?b(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):N(-n.keyPanSpeed,0),q=!0;break}q&&(B.preventDefault(),n.update())}function he(){if(M.length===1)d.set(M[0].pageX,M[0].pageY);else{const B=.5*(M[0].pageX+M[1].pageX),q=.5*(M[0].pageY+M[1].pageY);d.set(B,q)}}function j(){if(M.length===1)m.set(M[0].pageX,M[0].pageY);else{const B=.5*(M[0].pageX+M[1].pageX),q=.5*(M[0].pageY+M[1].pageY);m.set(B,q)}}function ue(){const B=M[0].pageX-M[1].pageX,q=M[0].pageY-M[1].pageY,Ce=Math.sqrt(B*B+q*q);A.set(0,Ce)}function ye(){n.enableZoom&&ue(),n.enablePan&&j()}function xe(){n.enableZoom&&ue(),n.enableRotate&&he()}function Se(B){if(M.length==1)p.set(B.pageX,B.pageY);else{const Ce=He(B),Me=.5*(B.pageX+Ce.x),Be=.5*(B.pageY+Ce.y);p.set(Me,Be)}g.subVectors(p,d).multiplyScalar(n.rotateSpeed);const q=n.domElement;b(2*Math.PI*g.x/q.clientHeight),D(2*Math.PI*g.y/q.clientHeight),d.copy(p)}function Ae(B){if(M.length===1)f.set(B.pageX,B.pageY);else{const q=He(B),Ce=.5*(B.pageX+q.x),Me=.5*(B.pageY+q.y);f.set(Ce,Me)}x.subVectors(f,m).multiplyScalar(n.panSpeed),N(x.x,x.y),m.copy(f)}function Le(B){const q=He(B),Ce=B.pageX-q.x,Me=B.pageY-q.y,Be=Math.sqrt(Ce*Ce+Me*Me);v.set(0,Be),_.set(0,Math.pow(v.y/A.y,n.zoomSpeed)),F(_.y),A.copy(v)}function qe(B){n.enableZoom&&Le(B),n.enablePan&&Ae(B)}function et(B){n.enableZoom&&Le(B),n.enableRotate&&Se(B)}function bt(B){n.enabled!==!1&&(M.length===0&&(n.domElement.setPointerCapture(B.pointerId),n.domElement.addEventListener("pointermove",Nt),n.domElement.addEventListener("pointerup",It)),we(B),B.pointerType==="touch"?L(B):vt(B))}function Nt(B){n.enabled!==!1&&(B.pointerType==="touch"?E(B):ht(B))}function It(B){_e(B),M.length===0&&(n.domElement.releasePointerCapture(B.pointerId),n.domElement.removeEventListener("pointermove",Nt),n.domElement.removeEventListener("pointerup",It)),n.dispatchEvent(dh),s=r.NONE}function Lt(B){_e(B)}function vt(B){let q;switch(B.button){case 0:q=n.mouseButtons.LEFT;break;case 1:q=n.mouseButtons.MIDDLE;break;case 2:q=n.mouseButtons.RIGHT;break;default:q=-1}switch(q){case Er.DOLLY:if(n.enableZoom===!1)return;ne(B),s=r.DOLLY;break;case Er.ROTATE:if(B.ctrlKey||B.metaKey||B.shiftKey){if(n.enablePan===!1)return;K(B),s=r.PAN}else{if(n.enableRotate===!1)return;J(B),s=r.ROTATE}break;case Er.PAN:if(B.ctrlKey||B.metaKey||B.shiftKey){if(n.enableRotate===!1)return;J(B),s=r.ROTATE}else{if(n.enablePan===!1)return;K(B),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(dl)}function ht(B){switch(s){case r.ROTATE:if(n.enableRotate===!1)return;ee(B);break;case r.DOLLY:if(n.enableZoom===!1)return;se(B);break;case r.PAN:if(n.enablePan===!1)return;ce(B);break}}function fn(B){n.enabled===!1||n.enableZoom===!1||s!==r.NONE||(B.preventDefault(),n.dispatchEvent(dl),O(B),n.dispatchEvent(dh))}function Zt(B){n.enabled===!1||n.enablePan===!1||te(B)}function L(B){switch(Te(B),M.length){case 1:switch(n.touches.ONE){case Cr.ROTATE:if(n.enableRotate===!1)return;he(),s=r.TOUCH_ROTATE;break;case Cr.PAN:if(n.enablePan===!1)return;j(),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(n.touches.TWO){case Cr.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ye(),s=r.TOUCH_DOLLY_PAN;break;case Cr.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;xe(),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(dl)}function E(B){switch(Te(B),s){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;Se(B),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;Ae(B),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;qe(B),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;et(B),n.update();break;default:s=r.NONE}}function ie(B){n.enabled!==!1&&B.preventDefault()}function we(B){M.push(B)}function _e(B){delete T[B.pointerId];for(let q=0;q<M.length;q++)if(M[q].pointerId==B.pointerId){M.splice(q,1);return}}function Te(B){let q=T[B.pointerId];q===void 0&&(q=new ge,T[B.pointerId]=q),q.set(B.pageX,B.pageY)}function He(B){const q=B.pointerId===M[0].pointerId?M[1]:M[0];return T[q.pointerId]}n.domElement.addEventListener("contextmenu",ie),n.domElement.addEventListener("pointerdown",bt),n.domElement.addEventListener("pointercancel",Lt),n.domElement.addEventListener("wheel",fn,{passive:!1}),this.update()}}const ir=new gs,_n=new I,ki=new I,At=new Pt,fh={X:new I(1,0,0),Y:new I(0,1,0),Z:new I(0,0,1)},fl={type:"change"},ph={type:"mouseDown"},mh={type:"mouseUp",mode:null},gh={type:"objectChange"};class ma extends mt{constructor(e,t){super(),t===void 0&&(console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.'),t=document),this.isTransformControls=!0,this.visible=!1,this.domElement=t,this.domElement.style.touchAction="none";const n=new Ey;this._gizmo=n,this.add(n);const r=new Cy;this._plane=r,this.add(r);const s=this;function a(A,v){let _=v;Object.defineProperty(s,A,{get:function(){return _!==void 0?_:v},set:function(M){_!==M&&(_=M,r[A]=M,n[A]=M,s.dispatchEvent({type:A+"-changed",value:M}),s.dispatchEvent(fl))}}),s[A]=v,r[A]=v,n[A]=v}a("camera",e),a("object",void 0),a("enabled",!0),a("axis",null),a("mode","translate"),a("translationSnap",null),a("rotationSnap",null),a("scaleSnap",null),a("space","world"),a("size",1),a("dragging",!1),a("showX",!0),a("showY",!0),a("showZ",!0);const o=new I,l=new I,c=new Pt,u=new Pt,h=new I,d=new Pt,p=new I,g=new I,m=new I,f=0,x=new I;a("worldPosition",o),a("worldPositionStart",l),a("worldQuaternion",c),a("worldQuaternionStart",u),a("cameraPosition",h),a("cameraQuaternion",d),a("pointStart",p),a("pointEnd",g),a("rotationAxis",m),a("rotationAngle",f),a("eye",x),this._offset=new I,this._startNorm=new I,this._endNorm=new I,this._cameraScale=new I,this._parentPosition=new I,this._parentQuaternion=new Pt,this._parentQuaternionInv=new Pt,this._parentScale=new I,this._worldScaleStart=new I,this._worldQuaternionInv=new Pt,this._worldScale=new I,this._positionStart=new I,this._quaternionStart=new Pt,this._scaleStart=new I,this._getPointer=Ay.bind(this),this._onPointerDown=by.bind(this),this._onPointerHover=My.bind(this),this._onPointerMove=Sy.bind(this),this._onPointerUp=Ty.bind(this),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp)}updateMatrixWorld(){this.object!==void 0&&(this.object.updateMatrixWorld(),this.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):this.object.parent.matrixWorld.decompose(this._parentPosition,this._parentQuaternion,this._parentScale),this.object.matrixWorld.decompose(this.worldPosition,this.worldQuaternion,this._worldScale),this._parentQuaternionInv.copy(this._parentQuaternion).invert(),this._worldQuaternionInv.copy(this.worldQuaternion).invert()),this.camera.updateMatrixWorld(),this.camera.matrixWorld.decompose(this.cameraPosition,this.cameraQuaternion,this._cameraScale),this.camera.isOrthographicCamera?this.camera.getWorldDirection(this.eye).negate():this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(),super.updateMatrixWorld(this)}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;ir.setFromCamera(e,this.camera);const t=pl(this._gizmo.picker[this.mode],ir);t?this.axis=t.object.name:this.axis=null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e.button!==0)&&this.axis!==null){ir.setFromCamera(e,this.camera);const t=pl(this._plane,ir,!0);t&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(t.point).sub(this.worldPositionStart)),this.dragging=!0,ph.mode=this.mode,this.dispatchEvent(ph)}}pointerMove(e){const t=this.axis,n=this.mode,r=this.object;let s=this.space;if(n==="scale"?s="local":(t==="E"||t==="XYZE"||t==="XYZ")&&(s="world"),r===void 0||t===null||this.dragging===!1||e.button!==-1)return;ir.setFromCamera(e,this.camera);const a=pl(this._plane,ir,!0);if(a){if(this.pointEnd.copy(a.point).sub(this.worldPositionStart),n==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),s==="local"&&t!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),t.indexOf("X")===-1&&(this._offset.x=0),t.indexOf("Y")===-1&&(this._offset.y=0),t.indexOf("Z")===-1&&(this._offset.z=0),s==="local"&&t!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),r.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(s==="local"&&(r.position.applyQuaternion(At.copy(this._quaternionStart).invert()),t.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.position.applyQuaternion(this._quaternionStart)),s==="world"&&(r.parent&&r.position.add(_n.setFromMatrixPosition(r.parent.matrixWorld)),t.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.parent&&r.position.sub(_n.setFromMatrixPosition(r.parent.matrixWorld))));else if(n==="scale"){if(t.search("XYZ")!==-1){let o=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(o*=-1),ki.set(o,o,o)}else _n.copy(this.pointStart),ki.copy(this.pointEnd),_n.applyQuaternion(this._worldQuaternionInv),ki.applyQuaternion(this._worldQuaternionInv),ki.divide(_n),t.search("X")===-1&&(ki.x=1),t.search("Y")===-1&&(ki.y=1),t.search("Z")===-1&&(ki.z=1);r.scale.copy(this._scaleStart).multiply(ki),this.scaleSnap&&(t.search("X")!==-1&&(r.scale.x=Math.round(r.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Y")!==-1&&(r.scale.y=Math.round(r.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Z")!==-1&&(r.scale.z=Math.round(r.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(n==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const o=20/this.worldPosition.distanceTo(_n.setFromMatrixPosition(this.camera.matrixWorld));t==="E"?(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1):t==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(_n.copy(this.rotationAxis).cross(this.eye))*o):(t==="X"||t==="Y"||t==="Z")&&(this.rotationAxis.copy(fh[t]),_n.copy(fh[t]),s==="local"&&_n.applyQuaternion(this.worldQuaternion),this.rotationAngle=this._offset.dot(_n.cross(this.eye).normalize())*o),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),s==="local"&&t!=="E"&&t!=="XYZE"?(r.quaternion.copy(this._quaternionStart),r.quaternion.multiply(At.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),r.quaternion.copy(At.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),r.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(fl),this.dispatchEvent(gh)}}pointerUp(e){e.button===0&&(this.dragging&&this.axis!==null&&(mh.mode=this.mode,this.dispatchEvent(mh)),this.dragging=!1,this.axis=null)}dispose(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}attach(e){return this.object=e,this.visible=!0,this}detach(){return this.object=void 0,this.visible=!1,this.axis=null,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(fl),this.dispatchEvent(gh),this.pointStart.copy(this.pointEnd))}getRaycaster(){return ir}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}}function Ay(i){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:i.button};{const e=this.domElement.getBoundingClientRect();return{x:(i.clientX-e.left)/e.width*2-1,y:-(i.clientY-e.top)/e.height*2+1,button:i.button}}}function My(i){if(this.enabled)switch(i.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(i));break}}function by(i){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(i)),this.pointerDown(this._getPointer(i)))}function Sy(i){this.enabled&&this.pointerMove(this._getPointer(i))}function Ty(i){this.enabled&&(this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(i)))}function pl(i,e,t){const n=e.intersectObject(i,!0);for(let r=0;r<n.length;r++)if(n[r].object.visible||t)return n[r];return!1}const Ha=new ua,ft=new I(0,1,0),vh=new I(0,0,0),xh=new ze,Va=new Pt,Za=new Pt,$n=new I,wh=new ze,Fs=new I(1,0,0),or=new I(0,1,0),Os=new I(0,0,1),Wa=new I,Is=new I,Ls=new I;class Ey extends mt{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const e=new ai({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),t=new fo({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),n=e.clone();n.opacity=.15;const r=t.clone();r.opacity=.5;const s=e.clone();s.color.setHex(16711680);const a=e.clone();a.color.setHex(65280);const o=e.clone();o.color.setHex(255);const l=e.clone();l.color.setHex(16711680),l.opacity=.5;const c=e.clone();c.color.setHex(65280),c.opacity=.5;const u=e.clone();u.color.setHex(255),u.opacity=.5;const h=e.clone();h.opacity=.25;const d=e.clone();d.color.setHex(16776960),d.opacity=.25,e.clone().color.setHex(16776960);const g=e.clone();g.color.setHex(7895160);const m=new Wt(0,.04,.1,12);m.translate(0,.05,0);const f=new Mt(.08,.08,.08);f.translate(0,.04,0);const x=new Rt;x.setAttribute("position",new gt([0,0,0,1,0,0],3));const A=new Wt(.0075,.0075,.5,3);A.translate(0,.25,0);function v(V,J){const ne=new hr(V,.0075,3,64,J*Math.PI*2);return ne.rotateY(Math.PI/2),ne.rotateX(Math.PI/2),ne}function _(){const V=new Rt;return V.setAttribute("position",new gt([0,0,0,1,1,1],3)),V}const M={X:[[new me(m,s),[.5,0,0],[0,0,-Math.PI/2]],[new me(m,s),[-.5,0,0],[0,0,Math.PI/2]],[new me(A,s),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new me(m,a),[0,.5,0]],[new me(m,a),[0,-.5,0],[Math.PI,0,0]],[new me(A,a)]],Z:[[new me(m,o),[0,0,.5],[Math.PI/2,0,0]],[new me(m,o),[0,0,-.5],[-Math.PI/2,0,0]],[new me(A,o),null,[Math.PI/2,0,0]]],XYZ:[[new me(new Zr(.1,0),h.clone()),[0,0,0]]],XY:[[new me(new Mt(.15,.15,.01),u.clone()),[.15,.15,0]]],YZ:[[new me(new Mt(.15,.15,.01),l.clone()),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new me(new Mt(.15,.15,.01),c.clone()),[.15,0,.15],[-Math.PI/2,0,0]]]},T={X:[[new me(new Wt(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new me(new Wt(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new me(new Wt(.2,0,.6,4),n),[0,.3,0]],[new me(new Wt(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new me(new Wt(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new me(new Wt(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new me(new Zr(.2,0),n)]],XY:[[new me(new Mt(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new me(new Mt(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new me(new Mt(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]]},P={START:[[new me(new Zr(.01,2),r),null,null,null,"helper"]],END:[[new me(new Zr(.01,2),r),null,null,null,"helper"]],DELTA:[[new Vn(_(),r),null,null,null,"helper"]],X:[[new Vn(x,r.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new Vn(x,r.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new Vn(x,r.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},y={XYZE:[[new me(v(.5,1),g),null,[0,Math.PI/2,0]]],X:[[new me(v(.5,.5),s)]],Y:[[new me(v(.5,.5),a),null,[0,0,-Math.PI/2]]],Z:[[new me(v(.5,.5),o),null,[0,Math.PI/2,0]]],E:[[new me(v(.75,1),d),null,[0,Math.PI/2,0]]]},b={AXIS:[[new Vn(x,r.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]]},D={XYZE:[[new me(new Zi(.25,10,8),n)]],X:[[new me(new hr(.5,.1,4,24),n),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new me(new hr(.5,.1,4,24),n),[0,0,0],[Math.PI/2,0,0]]],Z:[[new me(new hr(.5,.1,4,24),n),[0,0,0],[0,0,-Math.PI/2]]],E:[[new me(new hr(.75,.1,2,24),n)]]},U={X:[[new me(f,s),[.5,0,0],[0,0,-Math.PI/2]],[new me(A,s),[0,0,0],[0,0,-Math.PI/2]],[new me(f,s),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new me(f,a),[0,.5,0]],[new me(A,a)],[new me(f,a),[0,-.5,0],[0,0,Math.PI]]],Z:[[new me(f,o),[0,0,.5],[Math.PI/2,0,0]],[new me(A,o),[0,0,0],[Math.PI/2,0,0]],[new me(f,o),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new me(new Mt(.15,.15,.01),u),[.15,.15,0]]],YZ:[[new me(new Mt(.15,.15,.01),l),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new me(new Mt(.15,.15,.01),c),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new me(new Mt(.1,.1,.1),h.clone())]]},W={X:[[new me(new Wt(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new me(new Wt(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new me(new Wt(.2,0,.6,4),n),[0,.3,0]],[new me(new Wt(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new me(new Wt(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new me(new Wt(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new me(new Mt(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new me(new Mt(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new me(new Mt(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new me(new Mt(.2,.2,.2),n),[0,0,0]]]},N={X:[[new Vn(x,r.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new Vn(x,r.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new Vn(x,r.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function F(V){const J=new mt;for(const ne in V)for(let K=V[ne].length;K--;){const ee=V[ne][K][0].clone(),se=V[ne][K][1],ce=V[ne][K][2],O=V[ne][K][3],te=V[ne][K][4];ee.name=ne,ee.tag=te,se&&ee.position.set(se[0],se[1],se[2]),ce&&ee.rotation.set(ce[0],ce[1],ce[2]),O&&ee.scale.set(O[0],O[1],O[2]),ee.updateMatrix();const he=ee.geometry.clone();he.applyMatrix4(ee.matrix),ee.geometry=he,ee.renderOrder=1/0,ee.position.set(0,0,0),ee.rotation.set(0,0,0),ee.scale.set(1,1,1),J.add(ee)}return J}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=F(M)),this.add(this.gizmo.rotate=F(y)),this.add(this.gizmo.scale=F(U)),this.add(this.picker.translate=F(T)),this.add(this.picker.rotate=F(D)),this.add(this.picker.scale=F(W)),this.add(this.helper.translate=F(P)),this.add(this.helper.rotate=F(b)),this.add(this.helper.scale=F(N)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){const n=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:Za;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let r=[];r=r.concat(this.picker[this.mode].children),r=r.concat(this.gizmo[this.mode].children),r=r.concat(this.helper[this.mode].children);for(let s=0;s<r.length;s++){const a=r[s];a.visible=!0,a.rotation.set(0,0,0),a.position.copy(this.worldPosition);let o;if(this.camera.isOrthographicCamera?o=(this.camera.top-this.camera.bottom)/this.camera.zoom:o=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),a.scale.set(1,1,1).multiplyScalar(o*this.size/4),a.tag==="helper"){a.visible=!1,a.name==="AXIS"?(a.visible=!!this.axis,this.axis==="X"&&(At.setFromEuler(Ha.set(0,0,0)),a.quaternion.copy(n).multiply(At),Math.abs(ft.copy(Fs).applyQuaternion(n).dot(this.eye))>.9&&(a.visible=!1)),this.axis==="Y"&&(At.setFromEuler(Ha.set(0,0,Math.PI/2)),a.quaternion.copy(n).multiply(At),Math.abs(ft.copy(or).applyQuaternion(n).dot(this.eye))>.9&&(a.visible=!1)),this.axis==="Z"&&(At.setFromEuler(Ha.set(0,Math.PI/2,0)),a.quaternion.copy(n).multiply(At),Math.abs(ft.copy(Os).applyQuaternion(n).dot(this.eye))>.9&&(a.visible=!1)),this.axis==="XYZE"&&(At.setFromEuler(Ha.set(0,Math.PI/2,0)),ft.copy(this.rotationAxis),a.quaternion.setFromRotationMatrix(xh.lookAt(vh,ft,or)),a.quaternion.multiply(At),a.visible=this.dragging),this.axis==="E"&&(a.visible=!1)):a.name==="START"?(a.position.copy(this.worldPositionStart),a.visible=this.dragging):a.name==="END"?(a.position.copy(this.worldPosition),a.visible=this.dragging):a.name==="DELTA"?(a.position.copy(this.worldPositionStart),a.quaternion.copy(this.worldQuaternionStart),_n.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),_n.applyQuaternion(this.worldQuaternionStart.clone().invert()),a.scale.copy(_n),a.visible=this.dragging):(a.quaternion.copy(n),this.dragging?a.position.copy(this.worldPositionStart):a.position.copy(this.worldPosition),this.axis&&(a.visible=this.axis.search(a.name)!==-1));continue}a.quaternion.copy(n),this.mode==="translate"||this.mode==="scale"?(a.name==="X"&&Math.abs(ft.copy(Fs).applyQuaternion(n).dot(this.eye))>.99&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),a.name==="Y"&&Math.abs(ft.copy(or).applyQuaternion(n).dot(this.eye))>.99&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),a.name==="Z"&&Math.abs(ft.copy(Os).applyQuaternion(n).dot(this.eye))>.99&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),a.name==="XY"&&Math.abs(ft.copy(Os).applyQuaternion(n).dot(this.eye))<.2&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),a.name==="YZ"&&Math.abs(ft.copy(Fs).applyQuaternion(n).dot(this.eye))<.2&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),a.name==="XZ"&&Math.abs(ft.copy(or).applyQuaternion(n).dot(this.eye))<.2&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1)):this.mode==="rotate"&&(Va.copy(n),ft.copy(this.eye).applyQuaternion(At.copy(n).invert()),a.name.search("E")!==-1&&a.quaternion.setFromRotationMatrix(xh.lookAt(this.eye,vh,or)),a.name==="X"&&(At.setFromAxisAngle(Fs,Math.atan2(-ft.y,ft.z)),At.multiplyQuaternions(Va,At),a.quaternion.copy(At)),a.name==="Y"&&(At.setFromAxisAngle(or,Math.atan2(ft.x,ft.z)),At.multiplyQuaternions(Va,At),a.quaternion.copy(At)),a.name==="Z"&&(At.setFromAxisAngle(Os,Math.atan2(ft.y,ft.x)),At.multiplyQuaternions(Va,At),a.quaternion.copy(At))),a.visible=a.visible&&(a.name.indexOf("X")===-1||this.showX),a.visible=a.visible&&(a.name.indexOf("Y")===-1||this.showY),a.visible=a.visible&&(a.name.indexOf("Z")===-1||this.showZ),a.visible=a.visible&&(a.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),a.material._color=a.material._color||a.material.color.clone(),a.material._opacity=a.material._opacity||a.material.opacity,a.material.color.copy(a.material._color),a.material.opacity=a.material._opacity,this.enabled&&this.axis&&(a.name===this.axis||this.axis.split("").some(function(l){return a.name===l}))&&(a.material.color.setHex(16776960),a.material.opacity=1)}super.updateMatrixWorld(e)}}class Cy extends me{constructor(){super(new br(1e5,1e5,2,2),new ai({visible:!1,wireframe:!0,side:wn,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(e){let t=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(t="local"),Wa.copy(Fs).applyQuaternion(t==="local"?this.worldQuaternion:Za),Is.copy(or).applyQuaternion(t==="local"?this.worldQuaternion:Za),Ls.copy(Os).applyQuaternion(t==="local"?this.worldQuaternion:Za),ft.copy(Is),this.mode){case"translate":case"scale":switch(this.axis){case"X":ft.copy(this.eye).cross(Wa),$n.copy(Wa).cross(ft);break;case"Y":ft.copy(this.eye).cross(Is),$n.copy(Is).cross(ft);break;case"Z":ft.copy(this.eye).cross(Ls),$n.copy(Ls).cross(ft);break;case"XY":$n.copy(Ls);break;case"YZ":$n.copy(Wa);break;case"XZ":ft.copy(Ls),$n.copy(Is);break;case"XYZ":case"E":$n.set(0,0,0);break}break;case"rotate":default:$n.set(0,0,0)}$n.length()===0?this.quaternion.copy(this.cameraQuaternion):(wh.lookAt(_n.set(0,0,0),$n,ft),this.quaternion.setFromRotationMatrix(wh)),super.updateMatrixWorld(e)}}function Dy(i,e,t){e.traverse(n=>{n.material&&(i.properties.remove(n.material),n.material.dispose())}),i.info.programs.length=0,i.compile(e,t)}const yh=({focus:i=0,size:e=25,samples:t=10}={})=>{const n=We.shadowmap_pars_fragment;return We.shadowmap_pars_fragment=We.shadowmap_pars_fragment.replace("#ifdef USE_SHADOWMAP",`#ifdef USE_SHADOWMAP

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
#if defined( SHADOWMAP_TYPE_PCF )`),(r,s,a)=>{We.shadowmap_pars_fragment=n,Dy(r,s,a)}};function Kd(i,e,t,n){const r=class extends _t{constructor(a={}){const o=Object.entries(i);super({uniforms:o.reduce((l,[c,u])=>{const h=yr.clone({[c]:{value:u}});return{...l,...h}},{}),vertexShader:e,fragmentShader:t}),this.key="",o.forEach(([l])=>Object.defineProperty(this,l,{get:()=>this.uniforms[l].value,set:c=>this.uniforms[l].value=c})),Object.assign(this,a),n&&n(this)}};return r.key=Xt.generateUUID(),r}const Py=Kd({},"void main() { }","void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");class Ry extends Ii{constructor(e=6,t=!1){super(),this.uniforms={chromaticAberration:{value:.05},transmission:{value:0},_transmission:{value:1},transmissionMap:{value:null},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new Ie("white")},anisotropy:{value:.1},time:{value:0},distortion:{value:0},distortionScale:{value:.5},temporalDistortion:{value:0},buffer:{value:null}},this.onBeforeCompile=n=>{n.uniforms={...n.uniforms,...this.uniforms},t?n.defines.USE_SAMPLER="":n.defines.USE_TRANSMISSION="",n.fragmentShader=`
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
`)},Object.keys(this.uniforms).forEach(n=>Object.defineProperty(this,n,{get:()=>this.uniforms[n].value,set:r=>this.uniforms[n].value=r}))}}const ga=new URL("assets/porsche_911_1975_comp.e758b510.glb",location.href).href,Iy=""+new URL("ulmer_muenster_1k-f1744c79.exr",import.meta.url).href,Ly=""+new URL("ulmer_muenster-c72270fe.webp",import.meta.url).href,By=""+new URL("wide_street_01_1k-48a1baf6.exr",import.meta.url).href,Uy=""+new URL("wide_street_01-bd1bff94.webp",import.meta.url).href,Ny=""+new URL("wide_street_02_1k-e164254f.exr",import.meta.url).href,Fy=""+new URL("wide_street_02-b0d1a0ff.webp",import.meta.url).href,Oy=""+new URL("kloppenheim_02_1k-3bfc9f61.exr",import.meta.url).href,zy=""+new URL("kloppenheim_02-b7800856.webp",import.meta.url).href,ky=""+new URL("dry_cracked_lake-54d5fdfd.avif",import.meta.url).href,Gy=""+new URL("dry_cracked_lake_1k-48f18a7e.hdr",import.meta.url).href,Hy=""+new URL("round_platform-0102a9f9.avif",import.meta.url).href,Vy=""+new URL("round_platform_1k-67f2ee28.exr",import.meta.url).href,Wy=""+new URL("skidpan-40377cab.avif",import.meta.url).href,jy=""+new URL("skidpan_1k-610d1329.hdr",import.meta.url).href,Xy=""+new URL("dancing_hall-23457f13.avif",import.meta.url).href,Yy=""+new URL("dancing_hall_1k-fa17ea5b.exr",import.meta.url).href,qy=""+new URL("empty_warehouse_01-0fa6d26b.avif",import.meta.url).href,Qy=""+new URL("empty_warehouse_01_1k-8e757970.exr",import.meta.url).href,Zy=""+new URL("old_hall-923a48b9.avif",import.meta.url).href,Ky=""+new URL("old_hall_1k-2e37cfd0.exr",import.meta.url).href,Zn={ulmer_muenster:{exr:Iy,webP:Ly,sunPos:[17,14,12],sunColor:"#ffffeb",shadowOpacity:.72,groundProj:{radius:25,height:2}},wide_street1:{exr:By,webP:Uy,sunPos:[15,24,11],sunColor:"#ffffeb",shadowOpacity:.85,groundProj:{radius:12,height:2}},wide_street2:{exr:Ny,webP:Fy,sunPos:[16,8,12],sunColor:"#ffffeb",shadowOpacity:.55,groundProj:{radius:25,height:2}},kloppenheim:{exr:Oy,webP:zy,groundProj:{radius:25,height:2}},dry_cracked_lake:{hdr:Gy,avif:ky,groundProj:{radius:20,height:2}},round_platform:{exr:Vy,avif:Hy,groundProj:{radius:10,height:2.5}},skidpan:{hdr:jy,avif:Wy,groundProj:{radius:50,height:4.5}},dancing_hall:{avif:Xy,exr:Yy,groundProj:{radius:20,height:3}},empty_warehouse:{avif:qy,exr:Qy,groundProj:{radius:19,height:6}},old_hall:{avif:Zy,exr:Ky,groundProj:{radius:13,height:4}}};class xo extends Gd{constructor(e){super(e),this.type=yt}parse(e){const o=function(v,_){switch(v){case 1:console.error("THREE.RGBELoader Read Error: "+(_||""));break;case 2:console.error("THREE.RGBELoader Write Error: "+(_||""));break;case 3:console.error("THREE.RGBELoader Bad File Format: "+(_||""));break;default:case 4:console.error("THREE.RGBELoader: Error: "+(_||""))}return-1},h=`
`,d=function(v,_,M){_=_||1024;let P=v.pos,y=-1,b=0,D="",U=String.fromCharCode.apply(null,new Uint16Array(v.subarray(P,P+128)));for(;0>(y=U.indexOf(h))&&b<_&&P<v.byteLength;)D+=U,b+=U.length,P+=128,U+=String.fromCharCode.apply(null,new Uint16Array(v.subarray(P,P+128)));return-1<y?(M!==!1&&(v.pos+=b+y+1),D+U.slice(0,y)):!1},p=function(v){const _=/^#\?(\S+)/,M=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,T=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,P=/^\s*FORMAT=(\S+)\s*$/,y=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,b={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let D,U;if(v.pos>=v.byteLength||!(D=d(v)))return o(1,"no header found");if(!(U=D.match(_)))return o(3,"bad initial token");for(b.valid|=1,b.programtype=U[1],b.string+=D+`
`;D=d(v),D!==!1;){if(b.string+=D+`
`,D.charAt(0)==="#"){b.comments+=D+`
`;continue}if((U=D.match(M))&&(b.gamma=parseFloat(U[1])),(U=D.match(T))&&(b.exposure=parseFloat(U[1])),(U=D.match(P))&&(b.valid|=2,b.format=U[1]),(U=D.match(y))&&(b.valid|=4,b.height=parseInt(U[1],10),b.width=parseInt(U[2],10)),b.valid&2&&b.valid&4)break}return b.valid&2?b.valid&4?b:o(3,"missing image size specifier"):o(3,"missing format specifier")},g=function(v,_,M){const T=_;if(T<8||T>32767||v[0]!==2||v[1]!==2||v[2]&128)return new Uint8Array(v);if(T!==(v[2]<<8|v[3]))return o(3,"wrong scanline width");const P=new Uint8Array(4*_*M);if(!P.length)return o(4,"unable to allocate buffer space");let y=0,b=0;const D=4*T,U=new Uint8Array(4),W=new Uint8Array(D);let N=M;for(;N>0&&b<v.byteLength;){if(b+4>v.byteLength)return o(1);if(U[0]=v[b++],U[1]=v[b++],U[2]=v[b++],U[3]=v[b++],U[0]!=2||U[1]!=2||(U[2]<<8|U[3])!=T)return o(3,"bad rgbe scanline format");let F=0,V;for(;F<D&&b<v.byteLength;){V=v[b++];const ne=V>128;if(ne&&(V-=128),V===0||F+V>D)return o(3,"bad scanline data");if(ne){const K=v[b++];for(let ee=0;ee<V;ee++)W[F++]=K}else W.set(v.subarray(b,b+V),F),F+=V,b+=V}const J=T;for(let ne=0;ne<J;ne++){let K=0;P[y]=W[ne+K],K+=T,P[y+1]=W[ne+K],K+=T,P[y+2]=W[ne+K],K+=T,P[y+3]=W[ne+K],y+=4}N--}return P},m=function(v,_,M,T){const P=v[_+3],y=Math.pow(2,P-128)/255;M[T+0]=v[_+0]*y,M[T+1]=v[_+1]*y,M[T+2]=v[_+2]*y,M[T+3]=1},f=function(v,_,M,T){const P=v[_+3],y=Math.pow(2,P-128)/255;M[T+0]=Kr.toHalfFloat(Math.min(v[_+0]*y,65504)),M[T+1]=Kr.toHalfFloat(Math.min(v[_+1]*y,65504)),M[T+2]=Kr.toHalfFloat(Math.min(v[_+2]*y,65504)),M[T+3]=Kr.toHalfFloat(1)},x=new Uint8Array(e);x.pos=0;const A=p(x);if(A!==-1){const v=A.width,_=A.height,M=g(x.subarray(x.pos),v,_);if(M!==-1){let T,P,y;switch(this.type){case it:y=M.length/4;const b=new Float32Array(y*4);for(let U=0;U<y;U++)m(M,U*4,b,U*4);T=b,P=it;break;case yt:y=M.length/4;const D=new Uint16Array(y*4);for(let U=0;U<y;U++)f(M,U*4,D,U*4);T=D,P=yt;break;default:console.error("THREE.RGBELoader: unsupported type: ",this.type);break}return{width:v,height:_,data:T,header:A.string,gamma:A.gamma,exposure:A.exposure,type:P}}}return null}setDataType(e){return this.type=e,this}load(e,t,n,r){function s(a,o){switch(a.type){case it:case yt:a.encoding=dn,a.minFilter=Fe,a.magFilter=Fe,a.generateMipmaps=!1,a.flipY=!0;break}t&&t(a,o)}return super.load(e,s,n,r)}}let zl,on,Yn,$t,ei,Xs,Gn,kl=new ge;const rr={environment:Zn.ulmer_muenster,groundProjection:!0,bgColor:new Ie,printCam:()=>{}},oa=new Mn,Jy=new mi,$y=new vo,e_=new xo,Jd=new vs,$d=new xs;let Wn;$d.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");Jd.setDRACOLoader($d);const _h=new gs,Hr=[];let ef=()=>{},to,Ah;async function t_(i){Xs=i,to=Xs.addFolder("Scene"),zl=new cs,app.appendChild(zl.dom),on=new Ki({antialias:!0}),on.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),on.setSize(window.innerWidth,window.innerHeight),on.shadowMap.enabled=!0,on.shadowMap.type=Ci,on.outputEncoding=Ne,on.toneMapping=hs,Ah=new ia(on),Ah.compileCubemapShader(),app.appendChild(on.domElement),Yn=new Tt(50,window.innerWidth/window.innerHeight,.1,200),Yn.position.set(6,3,6),Yn.name="Camera",Yn.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),$t=new Ri,$t.add(oa),ei=new ws(Yn,on.domElement),ei.enableDamping=!0,ei.dampingFactor=.05,ei.minDistance=.1,ei.maxDistance=100,ei.maxPolarAngle=Math.PI/1.5,ei.target.set(0,0,0),ei.target.set(0,0,0),Wn=new ma(Yn,on.domElement),Wn.addEventListener("dragging-changed",t=>{ei.enabled=!t.value,t.value}),Wn.addEventListener("change",()=>{Wn.object&&Wn.object.position.y<0&&(Wn.object.position.y=0)}),$t.add(Wn),window.addEventListener("resize",i_),document.addEventListener("pointermove",Mh);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",t=>{Date.now()-e<200&&(Mh(t),s_())}),to.add(Wn,"mode",["translate","rotate","scale"]),n_(),await a_(),tf()}async function n_(){let i=new Mn,e=new da(16777195,1);e.name="Dir. Light",e.castShadow=!0,e.shadow.camera.near=.1,e.shadow.camera.far=50,e.shadow.camera.right=15,e.shadow.camera.left=-15,e.shadow.camera.top=15,e.shadow.camera.bottom=-15,e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.radius=1.95,e.shadow.blurSamples=6,e.shadow.bias=-5e-4,i.add(e),$t.add(i);const t=new me(new br(10,10).rotateX(-Math.PI/2),new Fd({}));t.name="shadowFloor",t.receiveShadow=!0,t.position.set(0,0,0),$t.add(t);async function n(s){if(!s){$t.background=null,$t.environment=null;return}if(s.exr){const a=await $y.loadAsync(s.exr);a.mapping=xn,$t.environment=a,console.log("exr loaded")}if(s.hdr){const a=await e_.loadAsync(s.hdr);a.mapping=xn,$t.environment=a,console.log("exr loaded")}if(s.webP||s.avif){const a=await Jy.loadAsync(s.webP||s.avif);a.mapping=xn,a.encoding=Ne,$t.background=a,console.log("bg loaded"),rr.groundProjection&&r(rr.environment)}s.sunPos?(e.visible=!0,e.position.fromArray(s.sunPos)):e.visible=!1,s.sunCol?e.color.set(s.sunCol):e.color.set(16777215),s.shadowOpacity&&(t.material.opacity=s.shadowOpacity)}function r(s){rr.groundProjection&&$t.background&&s.groundProj?(Gn||(Gn=new pa($t.background),Gn.scale.setScalar(100)),Gn.material.uniforms.map.value=$t.background,Gn.radius=s.groundProj.radius,Gn.height=s.groundProj.height,Gn.parent||$t.add(Gn)):Gn&&Gn.parent&&Gn.removeFromParent()}n(rr.environment),to.add(rr,"environment",Zn).onChange(s=>{n(s)}),to.add(rr,"groundProjection").onChange(s=>{r(rr.environment)})}function i_(){Yn.aspect=window.innerWidth/window.innerHeight,Yn.updateProjectionMatrix(),on.setSize(window.innerWidth,window.innerHeight)}function r_(){zl.update(),ei.update(),ef(),on.render($t,Yn)}function tf(){requestAnimationFrame(tf),r_()}function s_(){if(_h.setFromCamera(kl,Yn),_h.intersectObject(oa,!0,Hr),!Hr.length){Wn.detach();return}Hr[0].object.selectOnRaycast?Wn.attach(Hr[0].object.selectOnRaycast):Wn.attach(Hr[0].object),Hr.length=0}function Mh(i){kl.x=i.clientX/window.innerWidth*2-1,kl.y=-(i.clientY/window.innerHeight)*2+1}async function a_(){const i=new me(new Zi(.5).translate(0,.5,0),new Yt({color:bh(),roughness:0,metalness:1}));i.name="sphere",i.castShadow=!0,i.receiveShadow=!0,i.position.set(2,0,-1.5),oa.add(i);const e=new me(new Mt(1,1,1).translate(0,.5,0),new Yt({color:bh(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),oa.add(e),o_()}async function o_(){const i={default:"def",physical:"phy",transmission:"tra"},e={carMaterial:i.default},t={renderEachMesh:!1,enabled:!1,customBackground:$t.background,backside:!0,thickness:1,backsideThickness:.5},n=[],s=(await Jd.loadAsync(ga)).scene;s.name="car";let a;const o=new Py,l=new Ry(6,!1),c=new Ii({roughness:0,transmission:1,thickness:1});s.traverse(_=>{if(_.isMesh){_.castShadow=!0,_.receiveShadow=!0,_.selectOnRaycast=s;const M=_.material;n.push({material:M,mesh:_,physical:c,transmission:l}),_.name==="body"&&(a=_)}}),oa.add(s),Xs.add(e,"carMaterial",i).onChange(_=>{for(const M of n)_===i.default&&(M.mesh.material=M.material,t.enabled=!1),_===i.physical&&(M.mesh.material=M.physical,t.enabled=!1),_===i.transmission&&(M.mesh.material=M.transmission,t.enabled=!0)}),l_(Xs,c),c_(Xs,l,t);const u=new ut(512,512,{minFilter:Fe,magFilter:Fe,encoding:on.outputEncoding,type:yt}),h=new ut(512,512,{minFilter:Fe,magFilter:Fe,encoding:on.outputEncoding,type:yt}),d=l;d.buffer=h.texture;let p,g,m;const f={gl:on,scene:$t,camera:Yn};let x;const A=[{mesh:a,mat:l}],v=new mc(!0);ef=()=>{if(t.enabled){d.time=v.getElapsedTime(),t.renderEachMesh?x=n:x=A;for(let _=0;_<x.length;_++){const M=n[_].mesh;d.buffer===h.texture&&(g=f.gl.toneMapping,p=f.scene.background,m=M.material.side,f.gl.toneMapping=qn,t.background&&(f.scene.background=t.background),M.material=o,t.backside&&(f.gl.setRenderTarget(u),f.gl.render(f.scene,f.camera),M.material=d,M.material.buffer=u.texture,M.material.thickness=t.backsideThickness,M.material.side=Ot),f.gl.setRenderTarget(h),f.gl.render(f.scene,f.camera),M.material.thickness=t.thickness,M.material.side=m,M.material.buffer=h.texture,f.scene.background=p,f.gl.setRenderTarget(null),M.material=d,f.gl.toneMapping=g)}}}}function l_(i,e){const t=i.addFolder("Physical Material");t.addColor(e,"color"),t.addColor(e,"attenuationColor"),t.add(e,"attenuationDistance",0,2),t.add(e,"roughness",0,1),t.add(e,"transmission",0,1),t.add(e,"thickness",0,2),t.add(e,"reflectivity",0,1)}function c_(i,e,t){const n=i.addFolder("Transmission Material");n.add(t,"enabled").name("Rendering Enabled").listen(),n.add(t,"backside"),n.add(t,"thickness",0,2),n.add(t,"backsideThickness",0,2),n.addColor(e,"color"),n.addColor(e,"attenuationColor"),n.add(e,"_transmission",0,1),n.add(e,"attenuationDistance",0,2),n.add(e,"roughness",0,1),n.add(e,"chromaticAberration",0,2),n.add(e,"distortion",0,10),n.add(e,"temporalDistortion",0,1),n.add(e,"anisotropy",0,10),n.add(e,"reflectivity",0,1),n.add(t,"renderEachMesh").name("⚠ Render Each Mesh separately")}const u_=new Ie;function bh(){return"#"+u_.setHSL(Math.random(),.5,.5).getHexString()}const h_=new URL("assets/room_comp.c2582fb3.glb",location.href).href;let Gl,In,si,Yr,ti,Sh,Hl=new ge;new Ie;const Ys=new Mn;new mi;new vo;const nf=new vs,rf=new xs;let jn;rf.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");nf.setDRACOLoader(rf);const Th=new gs,Vr=[];let Eh,Ch;async function d_(i){Sh=i,Eh=Sh.addFolder("Scene"),Gl=new cs,app.appendChild(Gl.dom),In=new Ki({antialias:!0}),In.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),In.setSize(window.innerWidth,window.innerHeight),In.shadowMap.enabled=!0,In.outputEncoding=Ne,In.toneMapping=hs,Ch=new ia(In),Ch.compileCubemapShader(),app.appendChild(In.domElement),si=new Tt(50,window.innerWidth/window.innerHeight,.1,200),si.position.set(6,3,6),si.name="Camera",si.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),Yr=new Ri,Yr.add(Ys),ti=new ws(si,In.domElement),ti.enableDamping=!0,ti.dampingFactor=.05,ti.minDistance=.1,ti.maxDistance=100,ti.maxPolarAngle=Math.PI/1.5,ti.target.set(0,0,0),ti.target.set(0,0,0),jn=new ma(si,In.domElement),jn.addEventListener("dragging-changed",r=>{ti.enabled=!r.value,r.value}),jn.addEventListener("change",()=>{jn.object&&jn.object.position.y<0&&(jn.object.position.y=0)}),Yr.add(jn),window.addEventListener("resize",f_),document.addEventListener("pointermove",Dh);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",r=>{Date.now()-e<200&&(Dh(r),m_())}),Eh.add(jn,"mode",["translate","rotate","scale"]),yh({size:35,focus:.5,samples:16}),console.log(yh);let t=new da(16777195,5);t.name="Dir. Light",t.castShadow=!0,t.shadow.camera.near=.1,t.shadow.camera.far=50,t.shadow.camera.right=8.5,t.shadow.camera.left=-8.5,t.shadow.camera.top=8.5,t.shadow.camera.bottom=-8.5,t.shadow.mapSize.width=2048,t.shadow.mapSize.height=2048,t.shadow.bias=-.001,t.position.set(5,5,-8),Yr.add(t);const n=new Hd;Yr.add(n),await g_(),sf()}function f_(){si.aspect=window.innerWidth/window.innerHeight,si.updateProjectionMatrix(),In.setSize(window.innerWidth,window.innerHeight)}function p_(){Gl.update(),ti.update(),In.render(Yr,si)}function sf(){requestAnimationFrame(sf),p_()}function m_(){if(Th.setFromCamera(Hl,si),Th.intersectObject(Ys,!0,Vr),!Vr.length){jn.detach();return}Vr[0].object.selectOnRaycast?jn.attach(Vr[0].object.selectOnRaycast):jn.attach(Vr[0].object),Vr.length=0}function Dh(i){Hl.x=i.clientX/window.innerWidth*2-1,Hl.y=-(i.clientY/window.innerHeight)*2+1}async function g_(){const i=new me(new Zi(.5).translate(0,.5,0),new Yt({color:Ph(),roughness:0,metalness:1}));i.name="sphere",i.castShadow=!0,i.receiveShadow=!0,i.position.set(2,0,-1.5),Ys.add(i);const e=new me(new Mt(1,1,1).translate(0,.5,0),new Yt({color:Ph(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),Ys.add(e);const n=(await nf.loadAsync(h_)).scene;n.name="room",n.scale.setScalar(.5),n.position.set(0,-1,0),n.traverse(r=>{r.isMesh&&(r.castShadow=!0,r.receiveShadow=!0,r.selectOnRaycast=n,r.name==="Object_13"&&(console.log("FOUND",r),r.material.opacity=.5,r.material.transparent=!0,r.castShadow=!1,r.receiveShadow=!1))}),Ys.add(n)}const v_=new Ie;function Ph(){return"#"+v_.setHSL(Math.random(),.5,.5).getHexString()}const no=Kd({depth:null,opacity:1,attenuation:2.5,anglePower:12,spotPosition:new I(0,0,0),lightColor:new Ie("white"),cameraNear:0,cameraFar:1,resolution:new ge(0,0),transparent:!0,depthWrite:!1},`
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
  }`);var Pi={Linear:{None:function(i){return i}},Quadratic:{In:function(i){return i*i},Out:function(i){return i*(2-i)},InOut:function(i){return(i*=2)<1?.5*i*i:-.5*(--i*(i-2)-1)}},Cubic:{In:function(i){return i*i*i},Out:function(i){return--i*i*i+1},InOut:function(i){return(i*=2)<1?.5*i*i*i:.5*((i-=2)*i*i+2)}},Quartic:{In:function(i){return i*i*i*i},Out:function(i){return 1- --i*i*i*i},InOut:function(i){return(i*=2)<1?.5*i*i*i*i:-.5*((i-=2)*i*i*i-2)}},Quintic:{In:function(i){return i*i*i*i*i},Out:function(i){return--i*i*i*i*i+1},InOut:function(i){return(i*=2)<1?.5*i*i*i*i*i:.5*((i-=2)*i*i*i*i+2)}},Sinusoidal:{In:function(i){return 1-Math.cos(i*Math.PI/2)},Out:function(i){return Math.sin(i*Math.PI/2)},InOut:function(i){return .5*(1-Math.cos(Math.PI*i))}},Exponential:{In:function(i){return i===0?0:Math.pow(1024,i-1)},Out:function(i){return i===1?1:1-Math.pow(2,-10*i)},InOut:function(i){return i===0?0:i===1?1:(i*=2)<1?.5*Math.pow(1024,i-1):.5*(-Math.pow(2,-10*(i-1))+2)}},Circular:{In:function(i){return 1-Math.sqrt(1-i*i)},Out:function(i){return Math.sqrt(1- --i*i)},InOut:function(i){return(i*=2)<1?-.5*(Math.sqrt(1-i*i)-1):.5*(Math.sqrt(1-(i-=2)*i)+1)}},Elastic:{In:function(i){return i===0?0:i===1?1:-Math.pow(2,10*(i-1))*Math.sin((i-1.1)*5*Math.PI)},Out:function(i){return i===0?0:i===1?1:Math.pow(2,-10*i)*Math.sin((i-.1)*5*Math.PI)+1},InOut:function(i){return i===0?0:i===1?1:(i*=2,i<1?-.5*Math.pow(2,10*(i-1))*Math.sin((i-1.1)*5*Math.PI):.5*Math.pow(2,-10*(i-1))*Math.sin((i-1.1)*5*Math.PI)+1)}},Back:{In:function(i){var e=1.70158;return i*i*((e+1)*i-e)},Out:function(i){var e=1.70158;return--i*i*((e+1)*i+e)+1},InOut:function(i){var e=2.5949095;return(i*=2)<1?.5*(i*i*((e+1)*i-e)):.5*((i-=2)*i*((e+1)*i+e)+2)}},Bounce:{In:function(i){return 1-Pi.Bounce.Out(1-i)},Out:function(i){return i<1/2.75?7.5625*i*i:i<2/2.75?7.5625*(i-=1.5/2.75)*i+.75:i<2.5/2.75?7.5625*(i-=2.25/2.75)*i+.9375:7.5625*(i-=2.625/2.75)*i+.984375},InOut:function(i){return i<.5?Pi.Bounce.In(i*2)*.5:Pi.Bounce.Out(i*2-1)*.5+.5}}},zs;typeof self>"u"&&typeof process<"u"&&process.hrtime?zs=function(){var i=process.hrtime();return i[0]*1e3+i[1]/1e6}:typeof self<"u"&&self.performance!==void 0&&self.performance.now!==void 0?zs=self.performance.now.bind(self.performance):Date.now!==void 0?zs=Date.now:zs=function(){return new Date().getTime()};var qr=zs,x_=function(){function i(){this._tweens={},this._tweensAddedDuringUpdate={}}return i.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(t){return e._tweens[t]})},i.prototype.removeAll=function(){this._tweens={}},i.prototype.add=function(e){this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e},i.prototype.remove=function(e){delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]},i.prototype.update=function(e,t){e===void 0&&(e=qr()),t===void 0&&(t=!1);var n=Object.keys(this._tweens);if(n.length===0)return!1;for(;n.length>0;){this._tweensAddedDuringUpdate={};for(var r=0;r<n.length;r++){var s=this._tweens[n[r]],a=!t;s&&s.update(e,a)===!1&&!t&&delete this._tweens[n[r]]}n=Object.keys(this._tweensAddedDuringUpdate)}return!0},i}(),ks={Linear:function(i,e){var t=i.length-1,n=t*e,r=Math.floor(n),s=ks.Utils.Linear;return e<0?s(i[0],i[1],n):e>1?s(i[t],i[t-1],t-n):s(i[r],i[r+1>t?t:r+1],n-r)},Bezier:function(i,e){for(var t=0,n=i.length-1,r=Math.pow,s=ks.Utils.Bernstein,a=0;a<=n;a++)t+=r(1-e,n-a)*r(e,a)*i[a]*s(n,a);return t},CatmullRom:function(i,e){var t=i.length-1,n=t*e,r=Math.floor(n),s=ks.Utils.CatmullRom;return i[0]===i[t]?(e<0&&(r=Math.floor(n=t*(1+e))),s(i[(r-1+t)%t],i[r],i[(r+1)%t],i[(r+2)%t],n-r)):e<0?i[0]-(s(i[0],i[0],i[1],i[1],-n)-i[0]):e>1?i[t]-(s(i[t],i[t],i[t-1],i[t-1],n-t)-i[t]):s(i[r?r-1:0],i[r],i[t<r+1?t:r+1],i[t<r+2?t:r+2],n-r)},Utils:{Linear:function(i,e,t){return(e-i)*t+i},Bernstein:function(i,e){var t=ks.Utils.Factorial;return t(i)/t(e)/t(i-e)},Factorial:function(){var i=[1];return function(e){var t=1;if(i[e])return i[e];for(var n=e;n>1;n--)t*=n;return i[e]=t,t}}(),CatmullRom:function(i,e,t,n,r){var s=(t-i)*.5,a=(n-e)*.5,o=r*r,l=r*o;return(2*e-2*t+s+a)*l+(-3*e+3*t-2*s-a)*o+s*r+e}}},af=function(){function i(){}return i.nextId=function(){return i._nextId++},i._nextId=0,i}(),of=new x_,qs=function(){function i(e,t){t===void 0&&(t=of),this._object=e,this._group=t,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=Pi.Linear.None,this._interpolationFunction=ks.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._id=af.nextId(),this._isChainStopped=!1,this._goToEnd=!1}return i.prototype.getId=function(){return this._id},i.prototype.isPlaying=function(){return this._isPlaying},i.prototype.isPaused=function(){return this._isPaused},i.prototype.to=function(e,t){return this._valuesEnd=Object.create(e),t!==void 0&&(this._duration=t),this},i.prototype.duration=function(e){return this._duration=e,this},i.prototype.start=function(e){if(this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var t in this._valuesStartRepeat)this._swapEndStartRepeatValues(t),this._valuesStart[t]=this._valuesStartRepeat[t]}return this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e!==void 0?typeof e=="string"?qr()+parseFloat(e):e:qr(),this._startTime+=this._delayTime,this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat),this},i.prototype._setupProperties=function(e,t,n,r){for(var s in n){var a=e[s],o=Array.isArray(a),l=o?"array":typeof a,c=!o&&Array.isArray(n[s]);if(!(l==="undefined"||l==="function")){if(c){var u=n[s];if(u.length===0)continue;u=u.map(this._handleRelativeValue.bind(this,a)),n[s]=[a].concat(u)}if((l==="object"||o)&&a&&!c){t[s]=o?[]:{};for(var h in a)t[s][h]=a[h];r[s]=o?[]:{},this._setupProperties(a,t[s],n[s],r[s])}else typeof t[s]>"u"&&(t[s]=a),o||(t[s]*=1),c?r[s]=n[s].slice().reverse():r[s]=t[s]||0}}},i.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},i.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},i.prototype.pause=function(e){return e===void 0&&(e=qr()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this._group&&this._group.remove(this),this)},i.prototype.resume=function(e){return e===void 0&&(e=qr()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},i.prototype.stopChainedTweens=function(){for(var e=0,t=this._chainedTweens.length;e<t;e++)this._chainedTweens[e].stop();return this},i.prototype.group=function(e){return this._group=e,this},i.prototype.delay=function(e){return this._delayTime=e,this},i.prototype.repeat=function(e){return this._initialRepeat=e,this._repeat=e,this},i.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},i.prototype.yoyo=function(e){return this._yoyo=e,this},i.prototype.easing=function(e){return this._easingFunction=e,this},i.prototype.interpolation=function(e){return this._interpolationFunction=e,this},i.prototype.chain=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._chainedTweens=e,this},i.prototype.onStart=function(e){return this._onStartCallback=e,this},i.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},i.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},i.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},i.prototype.onStop=function(e){return this._onStopCallback=e,this},i.prototype.update=function(e,t){if(e===void 0&&(e=qr()),t===void 0&&(t=!0),this._isPaused)return!0;var n,r,s=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(e>s)return!1;t&&this.start(e)}if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),r=(e-this._startTime)/this._duration,r=this._duration===0||r>1?1:r;var a=this._easingFunction(r);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,a),this._onUpdateCallback&&this._onUpdateCallback(this._object,r),r===1)if(this._repeat>0){isFinite(this._repeat)&&this._repeat--;for(n in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[n]=="string"&&(this._valuesStartRepeat[n]=this._valuesStartRepeat[n]+parseFloat(this._valuesEnd[n])),this._yoyo&&this._swapEndStartRepeatValues(n),this._valuesStart[n]=this._valuesStartRepeat[n];return this._yoyo&&(this._reversed=!this._reversed),this._repeatDelayTime!==void 0?this._startTime=e+this._repeatDelayTime:this._startTime=e+this._delayTime,this._onRepeatCallback&&this._onRepeatCallback(this._object),!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var o=0,l=this._chainedTweens.length;o<l;o++)this._chainedTweens[o].start(this._startTime+this._duration);return this._isPlaying=!1,!1}return!0},i.prototype._updateProperties=function(e,t,n,r){for(var s in n)if(t[s]!==void 0){var a=t[s]||0,o=n[s],l=Array.isArray(e[s]),c=Array.isArray(o),u=!l&&c;u?e[s]=this._interpolationFunction(o,r):typeof o=="object"&&o?this._updateProperties(e[s],a,o,r):(o=this._handleRelativeValue(a,o),typeof o=="number"&&(e[s]=a+(o-a)*r))}},i.prototype._handleRelativeValue=function(e,t){return typeof t!="string"?t:t.charAt(0)==="+"||t.charAt(0)==="-"?e+parseFloat(t):parseFloat(t)},i.prototype._swapEndStartRepeatValues=function(e){var t=this._valuesStartRepeat[e],n=this._valuesEnd[e];typeof n=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(n):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=t},i}();af.nextId;var di=of;di.getAll.bind(di);di.removeAll.bind(di);di.add.bind(di);di.remove.bind(di);var xc=di.update.bind(di);let Vl,en,Nn,cn,ni,Wl,Hn,jl=new ge;const Bs={environment:Zn.kloppenheim,groundProjection:!1,bgColor:new Ie,printCam:()=>{}},dr=new Mn;new mi;const w_=new vo,y_=new xo,lf=new vs,cf=new xs;let bi;cf.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");lf.setDRACOLoader(cf);const Rh=new gs,ml=[];let uf=()=>{},io,Ih;async function __(i){Wl=i,io=Wl.addFolder("Scene"),Vl=new cs,app.appendChild(Vl.dom),en=new Ki({antialias:!0}),en.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),en.setSize(window.innerWidth,window.innerHeight),en.shadowMap.enabled=!0,en.shadowMap.type=Ci,en.outputEncoding=Ne,en.toneMapping=hs,Ih=new ia(en),Ih.compileCubemapShader(),app.appendChild(en.domElement),Nn=new Tt(50,window.innerWidth/window.innerHeight,.1,200),Nn.position.set(-16,16,16),Nn.name="Camera",cn=new Ri,cn.add(dr),ni=new ws(Nn,en.domElement),ni.enableDamping=!0,ni.dampingFactor=.05,ni.minDistance=.1,ni.maxDistance=100,ni.maxPolarAngle=Math.PI/1.5,ni.target.set(0,0,0),ni.target.set(0,0,0),bi=new ma(Nn,en.domElement),bi.addEventListener("dragging-changed",t=>{ni.enabled=!t.value,t.value}),bi.addEventListener("change",()=>{bi.object&&bi.object.position.y<0&&(bi.object.position.y=0)}),cn.add(bi),window.addEventListener("resize",M_),document.addEventListener("pointermove",Lh);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",t=>{Date.now()-e<200&&(Lh(t),S_())}),io.add(bi,"mode",["translate","rotate","scale"]),A_(),await T_(),hf()}async function A_(){function i(t){if(!t){cn.background=null,cn.environment=null;return}t.exr&&w_.load(t.exr,n=>{n.mapping=xn,cn.environment=n}),t.hdr&&y_.load(t.hdr,n=>{n.mapping=xn,cn.environment=n})}function e(t){Bs.groundProjection&&cn.background&&t.groundProj?(Hn||(Hn=new pa(cn.background),Hn.scale.setScalar(100)),Hn.material.uniforms.map.value=cn.background,Hn.radius=t.groundProj.radius,Hn.height=t.groundProj.height,Hn.parent||cn.add(Hn)):Hn&&Hn.parent&&Hn.removeFromParent()}i(Bs.environment),io.add(Bs,"environment",Zn).onChange(t=>{i(t)}),io.add(Bs,"groundProjection").onChange(t=>{e(Bs.environment)})}function M_(){Nn.aspect=window.innerWidth/window.innerHeight,Nn.updateProjectionMatrix(),en.setSize(window.innerWidth,window.innerHeight)}function b_(){Vl.update(),xc(),uf(),ni.update(),en.render(cn,Nn)}function hf(){requestAnimationFrame(hf),b_()}function S_(){Rh.setFromCamera(jl,Nn),Rh.intersectObject(dr,!0,ml),ml.length&&(ml.length=0)}function Lh(i){jl.x=i.clientX/window.innerWidth*2-1,jl.y=-(i.clientY/window.innerHeight)*2+1}async function T_(){const i=new me(new Zi(.5).translate(0,.5,0),new Yt({color:ja(),roughness:0,metalness:1}));i.name="sphere",i.castShadow=!0,i.receiveShadow=!0,i.position.set(2,0,-1.5),dr.add(i);const e=new me(new Mt(1,1,1).translate(0,.5,0),new Yt({color:ja(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),dr.add(e);const t=new me(new br(10,10).rotateX(-Math.PI/2),new Yt({color:ja(),roughness:.5,metalness:0}));t.name="floor",t.receiveShadow=!0,dr.add(t);const r=(await lf.loadAsync(ga)).scene;r.name="car",r.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0,s.selectOnRaycast=r)}),dr.add(r);for(let s=0;s<30;s++){const a=new me(new Zi(.3),new Yt({color:ja(),roughness:0,metalness:0}));a.name="sphere",a.castShadow=!0,a.receiveShadow=!0,a.position.set(Xt.randFloatSpread(10),Xt.randFloat(0,5),Xt.randFloatSpread(10)),dr.add(a)}E_()}function E_(){cn.add(new Hd(16777215,.5));const i=new ge;let e=1,t,n,r=16777215,s=5*4,a=.15*4,o=5;const l=new aa;l.intensity=3,l.position.set(5,5,5),l.angle=a,l.color.set(r),l.distance=s,l.castShadow=!0,l.shadow.bias=-1e-4;const c=new Ew(l);cn.add(l);const u=new no,h=new ai({transparent:!0,opacity:.25}),d={volumeMaterial:u,basicMaterial:h};let p,g=()=>{};function m(){if(x.useDepth){const y=D_({size:x.depthResolution});let b=p;p=y[0],u.depth=y[0],g=y[1],u.resolution.copy(en.getSize(i)),b&&b.dispose()}else u.depth=null,u.resolution.set(0,0)}u.spotPosition=l.position,u.opacity=e,u.lightColor=l.color,u.attenuation=l.distance,u.anglePower=o,u.cameraNear=Nn.near,u.cameraFar=Nn.far,t=t===void 0?.1:t,n=n===void 0?l.angle*7:n,console.log({volumeMaterial:u});const f=()=>{u.attenuation=l.distance,s=l.distance,n=Math.tan(l.angle)*l.distance,v.geometry=A(s,t,n)},x={materialType:d.volumeMaterial,helper:!1,useDepth:!1,depthResolution:256,updateVolumeGeometry:f,animateTarget:!1,animateLight:!1},A=(y,b,D)=>{const U=new Wt(b,D,y,128,64,!0);return U.translate(0,-y/2,0),U.rotateX(-Math.PI/2),U},v=new me(A(s,t,n),u);f(),l.add(v);const _=new I;uf=()=>{v.lookAt(l.target.getWorldPosition(_)),c.parent&&c.update(),x.useDepth&&(u.depth=null,g(),u.depth=p)};const M=Bh(l.target.position,20,2e3,1e3),T=Bh(l.position,20,2e3,1e3);window.onresize=()=>{u.resolution=en.getSize(i)};function P(y){const b=y.addFolder("SpotLight Volume");b.open(),b.add(x,"materialType",d).onChange(U=>{v.material=U}),b.add(x,"useDepth").onChange(m),b.add(x,"depthResolution",128,2048,1).onChange(m),b.add(u,"opacity",0,2),b.add(u,"attenuation",0,s),b.add(u,"anglePower",0,Math.PI),b.add(u,"cameraNear",0,10),b.add(u,"cameraFar",0,10);const D=y.addFolder("SpotLight");D.open(),D.add(x,"helper").onChange(U=>{U?cn.add(c):c.removeFromParent()}),D.addColor(l,"color"),D.add(l,"intensity",0,5),D.add(l,"angle",0,Math.PI/2).onChange(f),D.add(l,"penumbra",0,1),D.add(l,"distance",.1,20).onChange(f),D.add(l.shadow,"bias",-1e-4,1e-4),D.add(x,"animateTarget").name("🚲Animate target").onChange(U=>{U?M.start():M.stop()}),D.add(x,"animateLight").name("🚲Animate light").onChange(U=>{U?T.start():T.stop()})}bi.attach(l),P(Wl)}const C_=new Ie;function ja(){return"#"+C_.setHSL(Math.random(),.5,.5).getHexString()}function D_({size:i,frames:e=1/0}={}){const t=en,n=new I;t.getSize(n);const r=i||n.x,s=i||n.y;console.log("depth tex res",r,s);const a=new Sr(r,s);a.format=li,a.type=ca,a.name="Depth_Buffer";let o=0;const l=P_(r,s,{depthTexture:a}),c=()=>{(e===1/0||o<e)&&(t.setRenderTarget(l),t.render(cn,Nn),t.setRenderTarget(null),o++)};return[l.depthTexture,c]}function Bh(i,e,t,n){const r=new qs(i).to({x:Xt.randFloatSpread(e),z:Xt.randFloatSpread(e)},t).easing(Pi.Bounce.Out).repeat(1e4).repeatDelay(n).onStart(()=>{s()}).onRepeat(()=>{s(),r.to({x:Xt.randFloatSpread(6),z:Xt.randFloatSpread(6)})}),s=()=>{r._valuesStart.x=i.x,r._valuesStart.z=i.z};return r}function P_(i,e,t){const n=en,r=i,s=e,a=t,{samples:o=0,depth:l,...c}=a;let u;return u=new ut(r,s,{minFilter:Fe,magFilter:Fe,encoding:n.outputEncoding,type:yt,...c}),u.samples=o,u}/**
 * postprocessing v6.30.1 build Fri Feb 24 2023
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2023 Raoul van Rüschen
 * @license Zlib
 */var wc="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",$e={SKIP:9,SET:30,ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},Qs={DEFAULT:0,KEEP_MAX_DEPTH:1,DISCARD_MAX_DEPTH:2},df={DEPTH:0,LUMA:1,COLOR:2},ci={NONE:0,DEPTH:1,CONVOLUTION:2},st={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},wo={VERY_SMALL:0,SMALL:1,MEDIUM:2,LARGE:3,VERY_LARGE:4,HUGE:5},R_={SCALE_UP:"lut.scaleup"},I_={DISABLED:0,DEPTH:1,CUSTOM:2},Us={LOW:0,MEDIUM:1,HIGH:2,ULTRA:3},Xa={DEFAULT:0,ESKIL:1},L_=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <encodings_fragment>
}`,B_="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",U_=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],N_=class extends _t{constructor(i=new at){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new X(null),texelSize:new X(new at),scale:new X(1),kernel:new X(0)},blending:qt,depthWrite:!1,depthTest:!1,fragmentShader:L_,vertexShader:B_}),this.toneMapped=!1,this.setTexelSize(i.x,i.y),this.kernelSize=wo.MEDIUM}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.inputBuffer=i}get kernelSequence(){return U_[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(i){this.uniforms.scale.value=i}getScale(){return this.uniforms.scale.value}setScale(i){this.uniforms.scale.value=i}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(i){this.uniforms.kernel.value=i}setKernel(i){this.kernel=i}setTexelSize(i,e){this.uniforms.texelSize.value.set(i,e,i*.5,e*.5)}setSize(i,e){const t=1/i,n=1/e;this.uniforms.texelSize.value.set(t,n,t*.5,n*.5)}},F_=`#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;
#include <encodings_fragment>
#include <dithering_fragment>
}`,ff=class extends _t{constructor(){super({name:"CopyMaterial",uniforms:{inputBuffer:new X(null),opacity:new X(1)},blending:qt,depthWrite:!1,depthTest:!1,fragmentShader:F_,vertexShader:wc}),this.toneMapped=!1}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}getOpacity(i){return this.uniforms.opacity.value}setOpacity(i){this.uniforms.opacity.value=i}},O_=`#include <common>
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
if(keep){gl_FragColor=texture2D(inputBuffer,vUv);}else{discard;}}`,z_=class extends _t{constructor(){super({name:"DepthMaskMaterial",defines:{DEPTH_EPSILON:"0.0001",DEPTH_PACKING_0:"0",DEPTH_PACKING_1:"0",DEPTH_TEST_STRATEGY:Qs.KEEP_MAX_DEPTH},uniforms:{inputBuffer:new X(null),depthBuffer0:new X(null),depthBuffer1:new X(null),cameraNearFar:new X(new ge(1,1))},blending:qt,depthWrite:!1,depthTest:!1,fragmentShader:O_,vertexShader:wc}),this.toneMapped=!1,this.depthMode=bl}set depthBuffer0(i){this.uniforms.depthBuffer0.value=i}set depthPacking0(i){this.defines.DEPTH_PACKING_0=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer0(i,e=hi){this.depthBuffer0=i,this.depthPacking0=e}set depthBuffer1(i){this.uniforms.depthBuffer1.value=i}set depthPacking1(i){this.defines.DEPTH_PACKING_1=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer1(i,e=hi){this.depthBuffer1=i,this.depthPacking1=e}get maxDepthStrategy(){return Number(this.defines.DEPTH_TEST_STRATEGY)}set maxDepthStrategy(i){this.defines.DEPTH_TEST_STRATEGY=i.toFixed(0),this.needsUpdate=!0}get keepFar(){return this.maxDepthStrategy}set keepFar(i){this.maxDepthStrategy=i?Qs.KEEP_MAX_DEPTH:Qs.DISCARD_MAX_DEPTH}getMaxDepthStrategy(){return this.maxDepthStrategy}setMaxDepthStrategy(i){this.maxDepthStrategy=i}get epsilon(){return Number(this.defines.DEPTH_EPSILON)}set epsilon(i){this.defines.DEPTH_EPSILON=i.toFixed(16),this.needsUpdate=!0}getEpsilon(){return this.epsilon}setEpsilon(i){this.epsilon=i}get depthMode(){return Number(this.defines.DEPTH_MODE)}set depthMode(i){let e;switch(i){case cd:e="false";break;case ud:e="true";break;case Ja:e="abs(d1 - d0) <= DEPTH_EPSILON";break;case tc:e="abs(d1 - d0) > DEPTH_EPSILON";break;case bl:e="d0 > d1";break;case Ka:e="d0 >= d1";break;case hd:e="d0 <= d1";break;case dd:default:e="d0 < d1";break}this.defines.DEPTH_MODE=i.toFixed(0),this.defines["depthTest(d0, d1)"]=e,this.needsUpdate=!0}getDepthMode(){return this.depthMode}setDepthMode(i){this.depthMode=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){i&&(this.uniforms.cameraNearFar.value.set(i.near,i.far),i instanceof Tt?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}},k_=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.0555555
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <encodings_fragment>
}`,G_="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",H_=class extends _t{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new X(null),texelSize:new X(new ge)},blending:qt,depthWrite:!1,depthTest:!1,fragmentShader:k_,vertexShader:G_}),this.toneMapped=!1}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},V_=`varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;
#if THREE_REVISION < 143
#define luminance(v) linearToRelativeLuminance(v)
#endif
#if EDGE_DETECTION_MODE != 0
varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;
#endif
#if EDGE_DETECTION_MODE == 1
#include <common>
#endif
#if EDGE_DETECTION_MODE == 0 || PREDICATION_MODE == 1
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}vec3 gatherNeighbors(){float p=readDepth(vUv);float pLeft=readDepth(vUv0);float pTop=readDepth(vUv1);return vec3(p,pLeft,pTop);}
#elif PREDICATION_MODE == 2
uniform sampler2D predicationBuffer;vec3 gatherNeighbors(){float p=texture2D(predicationBuffer,vUv).r;float pLeft=texture2D(predicationBuffer,vUv0).r;float pTop=texture2D(predicationBuffer,vUv1).r;return vec3(p,pLeft,pTop);}
#endif
#if PREDICATION_MODE != 0
vec2 calculatePredicatedThreshold(){vec3 neighbours=gatherNeighbors();vec2 delta=abs(neighbours.xx-neighbours.yz);vec2 edges=step(PREDICATION_THRESHOLD,delta);return PREDICATION_SCALE*EDGE_THRESHOLD*(1.0-PREDICATION_STRENGTH*edges);}
#endif
#if EDGE_DETECTION_MODE != 0
uniform sampler2D inputBuffer;
#endif
void main(){
#if EDGE_DETECTION_MODE == 0
const vec2 threshold=vec2(DEPTH_THRESHOLD);
#elif PREDICATION_MODE != 0
vec2 threshold=calculatePredicatedThreshold();
#else
const vec2 threshold=vec2(EDGE_THRESHOLD);
#endif
#if EDGE_DETECTION_MODE == 0
vec3 neighbors=gatherNeighbors();vec2 delta=abs(neighbors.xx-vec2(neighbors.y,neighbors.z));vec2 edges=step(threshold,delta);if(dot(edges,vec2(1.0))==0.0){discard;}gl_FragColor=vec4(edges,0.0,1.0);
#elif EDGE_DETECTION_MODE == 1
float l=luminance(texture2D(inputBuffer,vUv).rgb);float lLeft=luminance(texture2D(inputBuffer,vUv0).rgb);float lTop=luminance(texture2D(inputBuffer,vUv1).rgb);vec4 delta;delta.xy=abs(l-vec2(lLeft,lTop));vec2 edges=step(threshold,delta.xy);if(dot(edges,vec2(1.0))==0.0){discard;}float lRight=luminance(texture2D(inputBuffer,vUv2).rgb);float lBottom=luminance(texture2D(inputBuffer,vUv3).rgb);delta.zw=abs(l-vec2(lRight,lBottom));vec2 maxDelta=max(delta.xy,delta.zw);float lLeftLeft=luminance(texture2D(inputBuffer,vUv4).rgb);float lTopTop=luminance(texture2D(inputBuffer,vUv5).rgb);delta.zw=abs(vec2(lLeft,lTop)-vec2(lLeftLeft,lTopTop));maxDelta=max(maxDelta.xy,delta.zw);float finalDelta=max(maxDelta.x,maxDelta.y);edges.xy*=step(finalDelta,LOCAL_CONTRAST_ADAPTATION_FACTOR*delta.xy);gl_FragColor=vec4(edges,0.0,1.0);
#elif EDGE_DETECTION_MODE == 2
vec4 delta;vec3 c=texture2D(inputBuffer,vUv).rgb;vec3 cLeft=texture2D(inputBuffer,vUv0).rgb;vec3 t=abs(c-cLeft);delta.x=max(max(t.r,t.g),t.b);vec3 cTop=texture2D(inputBuffer,vUv1).rgb;t=abs(c-cTop);delta.y=max(max(t.r,t.g),t.b);vec2 edges=step(threshold,delta.xy);if(dot(edges,vec2(1.0))==0.0){discard;}vec3 cRight=texture2D(inputBuffer,vUv2).rgb;t=abs(c-cRight);delta.z=max(max(t.r,t.g),t.b);vec3 cBottom=texture2D(inputBuffer,vUv3).rgb;t=abs(c-cBottom);delta.w=max(max(t.r,t.g),t.b);vec2 maxDelta=max(delta.xy,delta.zw);vec3 cLeftLeft=texture2D(inputBuffer,vUv4).rgb;t=abs(c-cLeftLeft);delta.z=max(max(t.r,t.g),t.b);vec3 cTopTop=texture2D(inputBuffer,vUv5).rgb;t=abs(c-cTopTop);delta.w=max(max(t.r,t.g),t.b);maxDelta=max(maxDelta.xy,delta.zw);float finalDelta=max(maxDelta.x,maxDelta.y);edges*=step(finalDelta,LOCAL_CONTRAST_ADAPTATION_FACTOR*delta.xy);gl_FragColor=vec4(edges,0.0,1.0);
#endif
}`,W_=`uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;
#if EDGE_DETECTION_MODE != 0
varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;
#endif
void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,0.0);vUv1=vUv+texelSize*vec2(0.0,-1.0);
#if EDGE_DETECTION_MODE != 0
vUv2=vUv+texelSize*vec2(1.0,0.0);vUv3=vUv+texelSize*vec2(0.0,1.0);vUv4=vUv+texelSize*vec2(-2.0,0.0);vUv5=vUv+texelSize*vec2(0.0,-2.0);
#endif
gl_Position=vec4(position.xy,1.0,1.0);}`,j_=class extends _t{constructor(i=new ge,e=df.COLOR){super({name:"EdgeDetectionMaterial",defines:{THREE_REVISION:us.replace(/\D+/g,""),LOCAL_CONTRAST_ADAPTATION_FACTOR:"2.0",EDGE_THRESHOLD:"0.1",DEPTH_THRESHOLD:"0.01",PREDICATION_MODE:"0",PREDICATION_THRESHOLD:"0.01",PREDICATION_SCALE:"2.0",PREDICATION_STRENGTH:"1.0",DEPTH_PACKING:"0"},uniforms:{inputBuffer:new X(null),depthBuffer:new X(null),predicationBuffer:new X(null),texelSize:new X(i)},blending:qt,depthWrite:!1,depthTest:!1,fragmentShader:V_,vertexShader:W_}),this.toneMapped=!1,this.edgeDetectionMode=e}set depthBuffer(i){this.uniforms.depthBuffer.value=i}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=hi){this.depthBuffer=i,this.depthPacking=e}get edgeDetectionMode(){return Number(this.defines.EDGE_DETECTION_MODE)}set edgeDetectionMode(i){this.defines.EDGE_DETECTION_MODE=i.toFixed(0),this.needsUpdate=!0}getEdgeDetectionMode(){return this.edgeDetectionMode}setEdgeDetectionMode(i){this.edgeDetectionMode=i}get localContrastAdaptationFactor(){return Number(this.defines.LOCAL_CONTRAST_ADAPTATION_FACTOR)}set localContrastAdaptationFactor(i){this.defines.LOCAL_CONTRAST_ADAPTATION_FACTOR=i.toFixed("6"),this.needsUpdate=!0}getLocalContrastAdaptationFactor(){return this.localContrastAdaptationFactor}setLocalContrastAdaptationFactor(i){this.localContrastAdaptationFactor=i}get edgeDetectionThreshold(){return Number(this.defines.EDGE_THRESHOLD)}set edgeDetectionThreshold(i){this.defines.EDGE_THRESHOLD=i.toFixed("6"),this.defines.DEPTH_THRESHOLD=(i*.1).toFixed("6"),this.needsUpdate=!0}getEdgeDetectionThreshold(){return this.edgeDetectionThreshold}setEdgeDetectionThreshold(i){this.edgeDetectionThreshold=i}get predicationMode(){return Number(this.defines.PREDICATION_MODE)}set predicationMode(i){this.defines.PREDICATION_MODE=i.toFixed(0),this.needsUpdate=!0}getPredicationMode(){return this.predicationMode}setPredicationMode(i){this.predicationMode=i}set predicationBuffer(i){this.uniforms.predicationBuffer.value=i}setPredicationBuffer(i){this.uniforms.predicationBuffer.value=i}get predicationThreshold(){return Number(this.defines.PREDICATION_THRESHOLD)}set predicationThreshold(i){this.defines.PREDICATION_THRESHOLD=i.toFixed("6"),this.needsUpdate=!0}getPredicationThreshold(){return this.predicationThreshold}setPredicationThreshold(i){this.predicationThreshold=i}get predicationScale(){return Number(this.defines.PREDICATION_SCALE)}set predicationScale(i){this.defines.PREDICATION_SCALE=i.toFixed("6"),this.needsUpdate=!0}getPredicationScale(){return this.predicationScale}setPredicationScale(i){this.predicationScale=i}get predicationStrength(){return Number(this.defines.PREDICATION_STRENGTH)}set predicationStrength(i){this.defines.PREDICATION_STRENGTH=i.toFixed("6"),this.needsUpdate=!0}getPredicationStrength(){return this.predicationStrength}setPredicationStrength(i){this.predicationStrength=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},X_=`#include <common>
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
}`,Y_="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEADvoid main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORTgl_Position=vec4(position.xy,1.0,1.0);}",q_=class extends _t{constructor(i,e,t,n,r=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:us.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new X(null),depthBuffer:new X(null),resolution:new X(new ge),texelSize:new X(new ge),cameraNear:new X(.3),cameraFar:new X(1e3),aspect:new X(1),time:new X(0)},blending:qt,depthWrite:!1,depthTest:!1,dithering:r}),this.toneMapped=!1,i&&this.setShaderParts(i),e&&this.setDefines(e),t&&this.setUniforms(t),this.copyCameraSettings(n)}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(i){this.uniforms.depthBuffer.value=i}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=hi){this.depthBuffer=i,this.depthPacking=e}setShaderData(i){this.setShaderParts(i.shaderParts),this.setDefines(i.defines),this.setUniforms(i.uniforms),this.setExtensions(i.extensions)}setShaderParts(i){var e,t,n,r,s;return this.fragmentShader=X_.replace(st.FRAGMENT_HEAD,(e=i.get(st.FRAGMENT_HEAD))!=null?e:"").replace(st.FRAGMENT_MAIN_UV,(t=i.get(st.FRAGMENT_MAIN_UV))!=null?t:"").replace(st.FRAGMENT_MAIN_IMAGE,(n=i.get(st.FRAGMENT_MAIN_IMAGE))!=null?n:""),this.vertexShader=Y_.replace(st.VERTEX_HEAD,(r=i.get(st.VERTEX_HEAD))!=null?r:"").replace(st.VERTEX_MAIN_SUPPORT,(s=i.get(st.VERTEX_MAIN_SUPPORT))!=null?s:""),this.needsUpdate=!0,this}setDefines(i){for(const e of i.entries())this.defines[e[0]]=e[1];return this.needsUpdate=!0,this}setUniforms(i){for(const e of i.entries())this.uniforms[e[0]]=e[1];return this}setExtensions(i){this.extensions={};for(const e of i)this.extensions[e]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(i){this.encodeOutput!==i&&(i?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(i){return this.encodeOutput}setOutputEncodingEnabled(i){this.encodeOutput=i}get time(){return this.uniforms.time.value}set time(i){this.uniforms.time.value=i}setDeltaTime(i){this.uniforms.time.value+=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){i&&(this.uniforms.cameraNear.value=i.near,this.uniforms.cameraFar.value=i.far,i instanceof Tt?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(i,e){const t=this.uniforms;t.resolution.value.set(i,e),t.texelSize.value.set(1/i,1/e),t.aspect.value=i/e}static get Section(){return st}},Q_=`#include <common>
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
}`,Z_=class extends _t{constructor(i=!1,e=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:us.replace(/\D+/g,"")},uniforms:{inputBuffer:new X(null),threshold:new X(0),smoothing:new X(1),range:new X(null)},blending:qt,depthWrite:!1,depthTest:!1,fragmentShader:Q_,vertexShader:wc}),this.toneMapped=!1,this.colorOutput=i,this.luminanceRange=e}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get threshold(){return this.uniforms.threshold.value}set threshold(i){this.smoothing>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=i}getThreshold(){return this.threshold}setThreshold(i){this.threshold=i}get smoothing(){return this.uniforms.smoothing.value}set smoothing(i){this.threshold>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=i}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(i){this.smoothing=i}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(i){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(i){i?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(i){return this.colorOutput}setColorOutputEnabled(i){this.colorOutput=i}get useRange(){return this.luminanceRange!==null}set useRange(i){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(i){i!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=i,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(i){this.luminanceRange=i}},K_=`#define sampleLevelZeroOffset(t, coord, offset) texture2D(t, coord + offset * texelSize)
#if __VERSION__ < 300
#define round(v) floor(v + 0.5)
#endif
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform lowp sampler2D areaTexture;uniform lowp sampler2D searchTexture;uniform vec2 texelSize;uniform vec2 resolution;varying vec2 vUv;varying vec4 vOffset[3];varying vec2 vPixCoord;void movec(const in bvec2 c,inout vec2 variable,const in vec2 value){if(c.x){variable.x=value.x;}if(c.y){variable.y=value.y;}}void movec(const in bvec4 c,inout vec4 variable,const in vec4 value){movec(c.xy,variable.xy,value.xy);movec(c.zw,variable.zw,value.zw);}vec2 decodeDiagBilinearAccess(in vec2 e){e.r=e.r*abs(5.0*e.r-5.0*0.75);return round(e);}vec4 decodeDiagBilinearAccess(in vec4 e){e.rb=e.rb*abs(5.0*e.rb-5.0*0.75);return round(e);}vec2 searchDiag1(const in vec2 texCoord,const in vec2 dir,out vec2 e){vec4 coord=vec4(texCoord,-1.0,1.0);vec3 t=vec3(texelSize,1.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;++i){if(!(coord.z<float(MAX_SEARCH_STEPS_DIAG_INT-1)&&coord.w>0.9)){break;}coord.xyz=t*vec3(dir,1.0)+coord.xyz;e=texture2D(inputBuffer,coord.xy).rg;coord.w=dot(e,vec2(0.5));}return coord.zw;}vec2 searchDiag2(const in vec2 texCoord,const in vec2 dir,out vec2 e){vec4 coord=vec4(texCoord,-1.0,1.0);coord.x+=0.25*texelSize.x;vec3 t=vec3(texelSize,1.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;++i){if(!(coord.z<float(MAX_SEARCH_STEPS_DIAG_INT-1)&&coord.w>0.9)){break;}coord.xyz=t*vec3(dir,1.0)+coord.xyz;e=texture2D(inputBuffer,coord.xy).rg;e=decodeDiagBilinearAccess(e);coord.w=dot(e,vec2(0.5));}return coord.zw;}vec2 areaDiag(const in vec2 dist,const in vec2 e,const in float offset){vec2 texCoord=vec2(AREATEX_MAX_DISTANCE_DIAG,AREATEX_MAX_DISTANCE_DIAG)*e+dist;texCoord=AREATEX_PIXEL_SIZE*texCoord+0.5*AREATEX_PIXEL_SIZE;texCoord.x+=0.5;texCoord.y+=AREATEX_SUBTEX_SIZE*offset;return texture2D(areaTexture,texCoord).rg;}vec2 calculateDiagWeights(const in vec2 texCoord,const in vec2 e,const in vec4 subsampleIndices){vec2 weights=vec2(0.0);vec4 d;vec2 end;if(e.r>0.0){d.xz=searchDiag1(texCoord,vec2(-1.0,1.0),end);d.x+=float(end.y>0.9);}else{d.xz=vec2(0.0);}d.yw=searchDiag1(texCoord,vec2(1.0,-1.0),end);if(d.x+d.y>2.0){vec4 coords=vec4(-d.x+0.25,d.x,d.y,-d.y-0.25)*texelSize.xyxy+texCoord.xyxy;vec4 c;c.xy=sampleLevelZeroOffset(inputBuffer,coords.xy,vec2(-1,0)).rg;c.zw=sampleLevelZeroOffset(inputBuffer,coords.zw,vec2(1,0)).rg;c.yxwz=decodeDiagBilinearAccess(c.xyzw);vec2 cc=vec2(2.0)*c.xz+c.yw;movec(bvec2(step(0.9,d.zw)),cc,vec2(0.0));weights+=areaDiag(d.xy,cc,subsampleIndices.z);}d.xz=searchDiag2(texCoord,vec2(-1.0,-1.0),end);if(sampleLevelZeroOffset(inputBuffer,texCoord,vec2(1,0)).r>0.0){d.yw=searchDiag2(texCoord,vec2(1.0),end);d.y+=float(end.y>0.9);}else{d.yw=vec2(0.0);}if(d.x+d.y>2.0){vec4 coords=vec4(-d.x,-d.x,d.y,d.y)*texelSize.xyxy+texCoord.xyxy;vec4 c;c.x=sampleLevelZeroOffset(inputBuffer,coords.xy,vec2(-1,0)).g;c.y=sampleLevelZeroOffset(inputBuffer,coords.xy,vec2(0,-1)).r;c.zw=sampleLevelZeroOffset(inputBuffer,coords.zw,vec2(1,0)).gr;vec2 cc=vec2(2.0)*c.xz+c.yw;movec(bvec2(step(0.9,d.zw)),cc,vec2(0.0));weights+=areaDiag(d.xy,cc,subsampleIndices.w).gr;}return weights;}float searchLength(const in vec2 e,const in float offset){vec2 scale=SEARCHTEX_SIZE*vec2(0.5,-1.0);vec2 bias=SEARCHTEX_SIZE*vec2(offset,1.0);scale+=vec2(-1.0,1.0);bias+=vec2(0.5,-0.5);scale*=1.0/SEARCHTEX_PACKED_SIZE;bias*=1.0/SEARCHTEX_PACKED_SIZE;return texture2D(searchTexture,scale*e+bias).r;}float searchXLeft(in vec2 texCoord,const in float end){vec2 e=vec2(0.0,1.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;++i){if(!(texCoord.x>end&&e.g>0.8281&&e.r==0.0)){break;}e=texture2D(inputBuffer,texCoord).rg;texCoord=vec2(-2.0,0.0)*texelSize+texCoord;}float offset=-(255.0/127.0)*searchLength(e,0.0)+3.25;return texelSize.x*offset+texCoord.x;}float searchXRight(vec2 texCoord,const in float end){vec2 e=vec2(0.0,1.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;++i){if(!(texCoord.x<end&&e.g>0.8281&&e.r==0.0)){break;}e=texture2D(inputBuffer,texCoord).rg;texCoord=vec2(2.0,0.0)*texelSize.xy+texCoord;}float offset=-(255.0/127.0)*searchLength(e,0.5)+3.25;return-texelSize.x*offset+texCoord.x;}float searchYUp(vec2 texCoord,const in float end){vec2 e=vec2(1.0,0.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;++i){if(!(texCoord.y>end&&e.r>0.8281&&e.g==0.0)){break;}e=texture2D(inputBuffer,texCoord).rg;texCoord=-vec2(0.0,2.0)*texelSize.xy+texCoord;}float offset=-(255.0/127.0)*searchLength(e.gr,0.0)+3.25;return texelSize.y*offset+texCoord.y;}float searchYDown(vec2 texCoord,const in float end){vec2 e=vec2(1.0,0.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;i++){if(!(texCoord.y<end&&e.r>0.8281&&e.g==0.0)){break;}e=texture2D(inputBuffer,texCoord).rg;texCoord=vec2(0.0,2.0)*texelSize.xy+texCoord;}float offset=-(255.0/127.0)*searchLength(e.gr,0.5)+3.25;return-texelSize.y*offset+texCoord.y;}vec2 area(const in vec2 dist,const in float e1,const in float e2,const in float offset){vec2 texCoord=vec2(AREATEX_MAX_DISTANCE)*round(4.0*vec2(e1,e2))+dist;texCoord=AREATEX_PIXEL_SIZE*texCoord+0.5*AREATEX_PIXEL_SIZE;texCoord.y=AREATEX_SUBTEX_SIZE*offset+texCoord.y;return texture2D(areaTexture,texCoord).rg;}void detectHorizontalCornerPattern(inout vec2 weights,const in vec4 texCoord,const in vec2 d){
#if !defined(DISABLE_CORNER_DETECTION)
vec2 leftRight=step(d.xy,d.yx);vec2 rounding=(1.0-CORNER_ROUNDING_NORM)*leftRight;rounding/=leftRight.x+leftRight.y;vec2 factor=vec2(1.0);factor.x-=rounding.x*sampleLevelZeroOffset(inputBuffer,texCoord.xy,vec2(0,1)).r;factor.x-=rounding.y*sampleLevelZeroOffset(inputBuffer,texCoord.zw,vec2(1,1)).r;factor.y-=rounding.x*sampleLevelZeroOffset(inputBuffer,texCoord.xy,vec2(0,-2)).r;factor.y-=rounding.y*sampleLevelZeroOffset(inputBuffer,texCoord.zw,vec2(1,-2)).r;weights*=clamp(factor,0.0,1.0);
#endif
}void detectVerticalCornerPattern(inout vec2 weights,const in vec4 texCoord,const in vec2 d){
#if !defined(DISABLE_CORNER_DETECTION)
vec2 leftRight=step(d.xy,d.yx);vec2 rounding=(1.0-CORNER_ROUNDING_NORM)*leftRight;rounding/=leftRight.x+leftRight.y;vec2 factor=vec2(1.0);factor.x-=rounding.x*sampleLevelZeroOffset(inputBuffer,texCoord.xy,vec2(1,0)).g;factor.x-=rounding.y*sampleLevelZeroOffset(inputBuffer,texCoord.zw,vec2(1,1)).g;factor.y-=rounding.x*sampleLevelZeroOffset(inputBuffer,texCoord.xy,vec2(-2,0)).g;factor.y-=rounding.y*sampleLevelZeroOffset(inputBuffer,texCoord.zw,vec2(-2,1)).g;weights*=clamp(factor,0.0,1.0);
#endif
}void main(){vec4 weights=vec4(0.0);vec4 subsampleIndices=vec4(0.0);vec2 e=texture2D(inputBuffer,vUv).rg;if(e.g>0.0){
#if !defined(DISABLE_DIAG_DETECTION)
weights.rg=calculateDiagWeights(vUv,e,subsampleIndices);if(weights.r==-weights.g){
#endif
vec2 d;vec3 coords;coords.x=searchXLeft(vOffset[0].xy,vOffset[2].x);coords.y=vOffset[1].y;d.x=coords.x;float e1=texture2D(inputBuffer,coords.xy).r;coords.z=searchXRight(vOffset[0].zw,vOffset[2].y);d.y=coords.z;d=round(resolution.xx*d+-vPixCoord.xx);vec2 sqrtD=sqrt(abs(d));float e2=sampleLevelZeroOffset(inputBuffer,coords.zy,vec2(1,0)).r;weights.rg=area(sqrtD,e1,e2,subsampleIndices.y);coords.y=vUv.y;detectHorizontalCornerPattern(weights.rg,coords.xyzy,d);
#if !defined(DISABLE_DIAG_DETECTION)
}else{e.r=0.0;}
#endif
}if(e.r>0.0){vec2 d;vec3 coords;coords.y=searchYUp(vOffset[1].xy,vOffset[2].z);coords.x=vOffset[0].x;d.x=coords.y;float e1=texture2D(inputBuffer,coords.xy).g;coords.z=searchYDown(vOffset[1].zw,vOffset[2].w);d.y=coords.z;d=round(resolution.yy*d-vPixCoord.yy);vec2 sqrtD=sqrt(abs(d));float e2=sampleLevelZeroOffset(inputBuffer,coords.xz,vec2(0,1)).g;weights.ba=area(sqrtD,e1,e2,subsampleIndices.x);coords.x=vUv.x;detectVerticalCornerPattern(weights.ba,coords.xyxz,d);}gl_FragColor=weights;}`,J_="uniform vec2 texelSize;uniform vec2 resolution;varying vec2 vUv;varying vec4 vOffset[3];varying vec2 vPixCoord;void main(){vUv=position.xy*0.5+0.5;vPixCoord=vUv*resolution;vOffset[0]=vUv.xyxy+texelSize.xyxy*vec4(-0.25,-0.125,1.25,-0.125);vOffset[1]=vUv.xyxy+texelSize.xyxy*vec4(-0.125,-0.25,-0.125,1.25);vOffset[2]=vec4(vOffset[0].xz,vOffset[1].yw)+vec4(-2.0,2.0,-2.0,2.0)*texelSize.xxyy*MAX_SEARCH_STEPS_FLOAT;gl_Position=vec4(position.xy,1.0,1.0);}",$_=class extends _t{constructor(i=new ge,e=new ge){super({name:"SMAAWeightsMaterial",defines:{MAX_SEARCH_STEPS_INT:"16",MAX_SEARCH_STEPS_FLOAT:"16.0",MAX_SEARCH_STEPS_DIAG_INT:"8",MAX_SEARCH_STEPS_DIAG_FLOAT:"8.0",CORNER_ROUNDING:"25",CORNER_ROUNDING_NORM:"0.25",AREATEX_MAX_DISTANCE:"16.0",AREATEX_MAX_DISTANCE_DIAG:"20.0",AREATEX_PIXEL_SIZE:"(1.0 / vec2(160.0, 560.0))",AREATEX_SUBTEX_SIZE:"(1.0 / 7.0)",SEARCHTEX_SIZE:"vec2(66.0, 33.0)",SEARCHTEX_PACKED_SIZE:"vec2(64.0, 16.0)"},uniforms:{inputBuffer:new X(null),searchTexture:new X(null),areaTexture:new X(null),resolution:new X(e),texelSize:new X(i)},blending:qt,depthWrite:!1,depthTest:!1,fragmentShader:K_,vertexShader:J_}),this.toneMapped=!1}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get searchTexture(){return this.uniforms.searchTexture.value}set searchTexture(i){this.uniforms.searchTexture.value=i}get areaTexture(){return this.uniforms.areaTexture.value}set areaTexture(i){this.uniforms.areaTexture.value=i}setLookupTextures(i,e){this.searchTexture=i,this.areaTexture=e}get orthogonalSearchSteps(){return Number(this.defines.MAX_SEARCH_STEPS_INT)}set orthogonalSearchSteps(i){const e=Math.min(Math.max(i,0),112);this.defines.MAX_SEARCH_STEPS_INT=e.toFixed("0"),this.defines.MAX_SEARCH_STEPS_FLOAT=e.toFixed("1"),this.needsUpdate=!0}setOrthogonalSearchSteps(i){this.orthogonalSearchSteps=i}get diagonalSearchSteps(){return Number(this.defines.MAX_SEARCH_STEPS_DIAG_INT)}set diagonalSearchSteps(i){const e=Math.min(Math.max(i,0),20);this.defines.MAX_SEARCH_STEPS_DIAG_INT=e.toFixed("0"),this.defines.MAX_SEARCH_STEPS_DIAG_FLOAT=e.toFixed("1"),this.needsUpdate=!0}setDiagonalSearchSteps(i){this.diagonalSearchSteps=i}get diagonalDetection(){return this.defines.DISABLE_DIAG_DETECTION===void 0}set diagonalDetection(i){i?delete this.defines.DISABLE_DIAG_DETECTION:this.defines.DISABLE_DIAG_DETECTION="1",this.needsUpdate=!0}isDiagonalDetectionEnabled(){return this.diagonalDetection}setDiagonalDetectionEnabled(i){this.diagonalDetection=i}get cornerRounding(){return Number(this.defines.CORNER_ROUNDING)}set cornerRounding(i){const e=Math.min(Math.max(i,0),100);this.defines.CORNER_ROUNDING=e.toFixed("4"),this.defines.CORNER_ROUNDING_NORM=(e/100).toFixed("4"),this.needsUpdate=!0}setCornerRounding(i){this.cornerRounding=i}get cornerDetection(){return this.defines.DISABLE_CORNER_DETECTION===void 0}set cornerDetection(i){i?delete this.defines.DISABLE_CORNER_DETECTION:this.defines.DISABLE_CORNER_DETECTION="1",this.needsUpdate=!0}isCornerRoundingEnabled(){return this.cornerDetection}setCornerRoundingEnabled(i){this.cornerDetection=i}setSize(i,e){const t=this.uniforms;t.texelSize.value.set(1/i,1/e),t.resolution.value.set(i,e)}},eA=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <encodings_fragment>
}`,tA="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",nA=class extends _t{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new X(null),supportBuffer:new X(null),texelSize:new X(new ge),radius:new X(.85)},blending:qt,depthWrite:!1,depthTest:!1,fragmentShader:eA,vertexShader:tA}),this.toneMapped=!1}set inputBuffer(i){this.uniforms.inputBuffer.value=i}set supportBuffer(i){this.uniforms.supportBuffer.value=i}get radius(){return this.uniforms.radius.value}set radius(i){this.uniforms.radius.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},iA=new uo,Gi=null;function rA(){if(Gi===null){const i=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]);Gi=new Rt,Gi.setAttribute!==void 0?(Gi.setAttribute("position",new Et(i,3)),Gi.setAttribute("uv",new Et(e,2))):(Gi.addAttribute("position",new Et(i,3)),Gi.addAttribute("uv",new Et(e,2)))}return Gi}var Gt=class{constructor(i="Pass",e=new Ri,t=iA){this.name=i,this.renderer=null,this.scene=e,this.camera=t,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(i){if(this.rtt===i){const e=this.fullscreenMaterial;e!==null&&(e.needsUpdate=!0),this.rtt=!i}}set mainScene(i){}set mainCamera(i){}setRenderer(i){this.renderer=i}isEnabled(){return this.enabled}setEnabled(i){this.enabled=i}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(i){let e=this.screen;e!==null?e.material=i:(e=new me(rA(),i),e.frustumCulled=!1,this.scene===null&&(this.scene=new Ri),this.scene.add(e),this.screen=e)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(i){this.fullscreenMaterial=i}getDepthTexture(){return null}setDepthTexture(i,e=hi){}render(i,e,t,n,r){throw new Error("Render method not implemented!")}setSize(i,e){}initialize(i,e,t){}dispose(){for(const i of Object.keys(this)){const e=this[i];(e instanceof ut||e instanceof Cn||e instanceof Ct||e instanceof Gt)&&this[i].dispose()}}},sA=class extends Gt{constructor(e,t=!0){super("CopyPass"),this.fullscreenMaterial=new ff,this.needsSwap=!1,this.renderTarget=e,e===void 0&&(this.renderTarget=new ut(1,1,{minFilter:Fe,magFilter:Fe,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=t}get resize(){return this.autoResize}set resize(e){this.autoResize=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(e){this.autoResize=e}render(e,t,n,r,s){this.fullscreenMaterial.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){this.autoResize&&this.renderTarget.setSize(e,t)}initialize(e,t,n){n!==void 0&&(this.renderTarget.texture.type=n,n!==Qt?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":e.outputEncoding===Ne&&(this.renderTarget.texture.encoding=Ne))}},aA=class extends Gt{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(i,e,t,n,r){const s=i.state.buffers.stencil;s.setLocked(!1),s.setTest(!1)}},Uh=new Ie,yo=class extends Gt{constructor(i=!0,e=!0,t=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=i,this.depth=e,this.stencil=t,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(i,e,t){this.color=i,this.depth=e,this.stencil=t}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(i){this.overrideClearColor=i}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(i){this.overrideClearAlpha=i}render(i,e,t,n,r){const s=this.overrideClearColor,a=this.overrideClearAlpha,o=i.getClearAlpha(),l=s!==null,c=a>=0;l?(i.getClearColor(Uh),i.setClearColor(s,c?a:o)):c&&i.setClearAlpha(a),i.setRenderTarget(this.renderToScreen?null:e),i.clear(this.color,this.depth,this.stencil),l?i.setClearColor(Uh,o):c&&i.setClearAlpha(o)}},Hi=-1,En=class extends fi{constructor(i,e=Hi,t=Hi,n=1){super(),this.resizable=i,this.baseSize=new ge(1,1),this.preferredSize=new ge(e,t),this.target=this.preferredSize,this.s=n,this.effectiveSize=new ge,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){const i=this.baseSize,e=this.preferredSize,t=this.effectiveSize,n=this.scale;e.width!==Hi?t.width=e.width:e.height!==Hi?t.width=Math.round(e.height*(i.width/Math.max(i.height,1))):t.width=Math.round(i.width*n),e.height!==Hi?t.height=e.height:e.width!==Hi?t.height=Math.round(e.width/Math.max(i.width/Math.max(i.height,1),1)):t.height=Math.round(i.height*n)}get width(){return this.effectiveSize.width}set width(i){this.preferredWidth=i}get height(){return this.effectiveSize.height}set height(i){this.preferredHeight=i}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(i){this.s!==i&&(this.s=i,this.preferredSize.setScalar(Hi),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getScale(){return this.scale}setScale(i){this.scale=i}get baseWidth(){return this.baseSize.width}set baseWidth(i){this.baseSize.width!==i&&(this.baseSize.width=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseWidth(){return this.baseWidth}setBaseWidth(i){this.baseWidth=i}get baseHeight(){return this.baseSize.height}set baseHeight(i){this.baseSize.height!==i&&(this.baseSize.height=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseHeight(){return this.baseHeight}setBaseHeight(i){this.baseHeight=i}setBaseSize(i,e){(this.baseSize.width!==i||this.baseSize.height!==e)&&(this.baseSize.set(i,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(i){this.preferredSize.width!==i&&(this.preferredSize.width=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(i){this.preferredWidth=i}get preferredHeight(){return this.preferredSize.height}set preferredHeight(i){this.preferredSize.height!==i&&(this.preferredSize.height=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(i){this.preferredHeight=i}setPreferredSize(i,e){(this.preferredSize.width!==i||this.preferredSize.height!==e)&&(this.preferredSize.set(i,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}copy(i){this.s=i.scale,this.baseSize.set(i.baseWidth,i.baseHeight),this.preferredSize.set(i.preferredWidth,i.preferredHeight),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height)}static get AUTO_SIZE(){return Hi}},gl=!1,Nh=class{constructor(i=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(i),this.meshCount=0,this.replaceMaterial=e=>{if(e.isMesh){let t;if(e.material.flatShading)switch(e.material.side){case wn:t=this.materialsFlatShadedDoubleSide;break;case Ot:t=this.materialsFlatShadedBackSide;break;default:t=this.materialsFlatShaded;break}else switch(e.material.side){case wn:t=this.materialsDoubleSide;break;case Ot:t=this.materialsBackSide;break;default:t=this.materials;break}this.originalMaterials.set(e,e.material),e.isSkinnedMesh?e.material=t[2]:e.isInstancedMesh?e.material=t[1]:e.material=t[0],++this.meshCount}}}setMaterial(i){if(this.disposeMaterials(),this.material=i,i!==null){const e=this.materials=[i.clone(),i.clone(),i.clone()];for(const t of e)t.uniforms=Object.assign({},i.uniforms),t.side=ui;e[2].skinning=!0,this.materialsBackSide=e.map(t=>{const n=t.clone();return n.uniforms=Object.assign({},i.uniforms),n.side=Ot,n}),this.materialsDoubleSide=e.map(t=>{const n=t.clone();return n.uniforms=Object.assign({},i.uniforms),n.side=wn,n}),this.materialsFlatShaded=e.map(t=>{const n=t.clone();return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n}),this.materialsFlatShadedBackSide=e.map(t=>{const n=t.clone();return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=Ot,n}),this.materialsFlatShadedDoubleSide=e.map(t=>{const n=t.clone();return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=wn,n})}}render(i,e,t){const n=i.shadowMap.enabled;if(i.shadowMap.enabled=!1,gl){const r=this.originalMaterials;this.meshCount=0,e.traverse(this.replaceMaterial),i.render(e,t);for(const s of r)s[0].material=s[1];this.meshCount!==r.size&&r.clear()}else{const r=e.overrideMaterial;e.overrideMaterial=this.material,i.render(e,t),e.overrideMaterial=r}i.shadowMap.enabled=n}disposeMaterials(){if(this.material!==null){const i=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(const e of i)e.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return gl}static set workaroundEnabled(i){gl=i}},ts=class extends Gt{constructor(i,e,t=null){super("RenderPass",i,e),this.needsSwap=!1,this.clearPass=new yo,this.overrideMaterialManager=t===null?null:new Nh(t),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get renderToScreen(){return super.renderToScreen}set renderToScreen(i){super.renderToScreen=i,this.clearPass.renderToScreen=i}get overrideMaterial(){const i=this.overrideMaterialManager;return i!==null?i.material:null}set overrideMaterial(i){const e=this.overrideMaterialManager;i!==null?e!==null?e.setMaterial(i):this.overrideMaterialManager=new Nh(i):e!==null&&(e.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(i){this.overrideMaterial=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getSelection(){return this.selection}setSelection(i){this.selection=i}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(i){this.ignoreBackground=i}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(i){this.skipShadowMapUpdate=i}getClearPass(){return this.clearPass}render(i,e,t,n,r){const s=this.scene,a=this.camera,o=this.selection,l=a.layers.mask,c=s.background,u=i.shadowMap.autoUpdate,h=this.renderToScreen?null:e;o!==null&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(i.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(s.background=null),this.clearPass.enabled&&this.clearPass.render(i,e),i.setRenderTarget(h),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(i,s,a):i.render(s,a),a.layers.mask=l,s.background=c,i.shadowMap.autoUpdate=u}},oA=class extends Gt{constructor(i,e,{renderTarget:t,resolutionScale:n=1,width:r=En.AUTO_SIZE,height:s=En.AUTO_SIZE,resolutionX:a=r,resolutionY:o=s}={}){super("DepthPass"),this.needsSwap=!1,this.renderPass=new ts(i,e,new lc({depthPacking:lo}));const l=this.renderPass;l.skipShadowMapUpdate=!0,l.ignoreBackground=!0;const c=l.getClearPass();c.overrideClearColor=new Ie(16777215),c.overrideClearAlpha=1,this.renderTarget=t,this.renderTarget===void 0&&(this.renderTarget=new ut(1,1,{minFilter:Ke,magFilter:Ke}),this.renderTarget.texture.name="DepthPass.Target");const u=this.resolution=new En(this,a,o,n);u.addEventListener("change",h=>this.setSize(u.baseWidth,u.baseHeight))}set mainScene(i){this.renderPass.mainScene=i}set mainCamera(i){this.renderPass.mainCamera=i}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}render(i,e,t,n,r){const s=this.renderToScreen?null:this.renderTarget;this.renderPass.render(i,s)}setSize(i,e){const t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height)}};function Fh(i,e,t){for(const n of e){const r="$1"+i+n.charAt(0).toUpperCase()+n.slice(1),s=new RegExp("([^\\.])(\\b"+n+"\\b)","g");for(const a of t.entries())a[1]!==null&&t.set(a[0],a[1].replace(s,r))}}function lA(i,e,t){var n,r,s,a,o;let l=e.getFragmentShader(),c=e.getVertexShader();const u=l!==void 0&&/mainImage/.test(l),h=l!==void 0&&/mainUv/.test(l);if(t.attributes|=e.getAttributes(),l===void 0)throw new Error(`Missing fragment shader (${e.name})`);if(h&&t.attributes&ci.CONVOLUTION)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);if(!u&&!h)throw new Error(`Could not find mainImage or mainUv function (${e.name})`);{const d=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,p=t.shaderParts;let g=(n=p.get(st.FRAGMENT_HEAD))!=null?n:"",m=(r=p.get(st.FRAGMENT_MAIN_UV))!=null?r:"",f=(s=p.get(st.FRAGMENT_MAIN_IMAGE))!=null?s:"",x=(a=p.get(st.VERTEX_HEAD))!=null?a:"",A=(o=p.get(st.VERTEX_MAIN_SUPPORT))!=null?o:"";const v=new Set,_=new Set;if(h&&(m+=`	${i}MainUv(UV);
`,t.uvTransformation=!0),c!==null&&/mainSupport/.test(c)){const P=/mainSupport *\([\w\s]*?uv\s*?\)/.test(c);A+=`	${i}MainSupport(`,A+=P?`vUv);
`:`);
`;for(const y of c.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(const b of y[1].split(/\s*,\s*/))t.varyings.add(b),v.add(b),_.add(b);for(const y of c.matchAll(d))_.add(y[1])}for(const P of l.matchAll(d))_.add(P[1]);for(const P of e.defines.keys())_.add(P.replace(/\([\w\s,]*\)/g,""));for(const P of e.uniforms.keys())_.add(P);_.delete("while"),_.delete("for"),_.delete("if"),e.uniforms.forEach((P,y)=>t.uniforms.set(i+y.charAt(0).toUpperCase()+y.slice(1),P)),e.defines.forEach((P,y)=>t.defines.set(i+y.charAt(0).toUpperCase()+y.slice(1),P));const M=new Map([["fragment",l],["vertex",c]]);Fh(i,_,t.defines),Fh(i,_,M),l=M.get("fragment"),c=M.get("vertex");const T=e.blendMode;if(t.blendModes.set(T.blendFunction,T),u){e.inputColorSpace!==null&&e.inputColorSpace!==t.colorSpace&&(f+=e.inputColorSpace===Ne?`color0 = LinearTosRGB(color0);
	`:`color0 = sRGBToLinear(color0);
	`),e.outputColorSpace!==null?t.colorSpace=e.outputColorSpace:e.inputColorSpace!==null&&(t.colorSpace=e.inputColorSpace);const P=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;f+=`${i}MainImage(color0, UV, `,t.attributes&ci.DEPTH&&P.test(l)&&(f+="depth, ",t.readDepth=!0),f+=`color1);
	`;const y=i+"BlendOpacity";t.uniforms.set(y,T.opacity),f+=`color0 = blend${T.blendFunction}(color0, color1, ${y});

	`,g+=`uniform float ${y};

`}if(g+=l+`
`,c!==null&&(x+=c+`
`),p.set(st.FRAGMENT_HEAD,g),p.set(st.FRAGMENT_MAIN_UV,m),p.set(st.FRAGMENT_MAIN_IMAGE,f),p.set(st.VERTEX_HEAD,x),p.set(st.VERTEX_MAIN_SUPPORT,A),e.extensions!==null)for(const P of e.extensions)t.extensions.add(P)}}var lr=class extends Gt{constructor(i,...e){super("EffectPass"),this.fullscreenMaterial=new q_(null,null,null,i),this.listener=t=>this.handleEvent(t),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(i){for(const e of this.effects)e.mainScene=i}set mainCamera(i){this.fullscreenMaterial.copyCameraSettings(i);for(const e of this.effects)e.mainCamera=i}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(i){this.fullscreenMaterial.encodeOutput=i}get dithering(){return this.fullscreenMaterial.dithering}set dithering(i){const e=this.fullscreenMaterial;e.dithering=i,e.needsUpdate=!0}setEffects(i){for(const e of this.effects)e.removeEventListener("change",this.listener);this.effects=i.sort((e,t)=>t.attributes-e.attributes);for(const e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){const i=new mA;let e=0;for(const a of this.effects)if(a.blendMode.blendFunction===$e.DST)i.attributes|=a.getAttributes()&ci.DEPTH;else{if(i.attributes&a.getAttributes()&ci.CONVOLUTION)throw new Error(`Convolution effects cannot be merged (${a.name})`);lA("e"+e++,a,i)}let t=i.shaderParts.get(st.FRAGMENT_HEAD),n=i.shaderParts.get(st.FRAGMENT_MAIN_IMAGE),r=i.shaderParts.get(st.FRAGMENT_MAIN_UV);const s=/\bblend\b/g;for(const a of i.blendModes.values())t+=a.getShaderCode().replace(s,`blend${a.blendFunction}`)+`
`;i.attributes&ci.DEPTH?(i.readDepth&&(n=`float depth = readDepth(UV);

	`+n),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,i.colorSpace===Ne&&(n+=`color0 = sRGBToLinear(color0);
	`),i.uvTransformation?(r=`vec2 transformedUv = vUv;
`+r,i.defines.set("UV","transformedUv")):i.defines.set("UV","vUv"),i.shaderParts.set(st.FRAGMENT_HEAD,t),i.shaderParts.set(st.FRAGMENT_MAIN_IMAGE,n),i.shaderParts.set(st.FRAGMENT_MAIN_UV,r),i.shaderParts.forEach((a,o,l)=>l.set(o,a==null?void 0:a.trim().replace(/^#/,`
#`))),this.skipRendering=e===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(i)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(i,e=hi){this.fullscreenMaterial.depthBuffer=i,this.fullscreenMaterial.depthPacking=e;for(const t of this.effects)t.setDepthTexture(i,e)}render(i,e,t,n,r){for(const s of this.effects)s.update(i,e,n);if(!this.skipRendering||this.renderToScreen){const s=this.fullscreenMaterial;s.inputBuffer=e.texture,s.time+=n*this.timeScale,i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}}setSize(i,e){this.fullscreenMaterial.setSize(i,e);for(const t of this.effects)t.setSize(i,e)}initialize(i,e,t){this.renderer=i;for(const n of this.effects)n.initialize(i,e,t);this.updateMaterial(),t!==void 0&&t!==Qt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(const i of this.effects)i.removeEventListener("change",this.listener),i.dispose()}handleEvent(i){switch(i.type){case"change":this.recompile();break}}},cA=class extends Gt{constructor({kernelSize:i=wo.MEDIUM,resolutionScale:e=.5,width:t=En.AUTO_SIZE,height:n=En.AUTO_SIZE,resolutionX:r=t,resolutionY:s=n}={}){super("KawaseBlurPass"),this.renderTargetA=new ut(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";const a=this.resolution=new En(this,r,s,e);a.addEventListener("change",o=>this.setSize(a.baseWidth,a.baseHeight)),this._blurMaterial=new N_,this._blurMaterial.kernelSize=i,this.copyMaterial=new ff}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(i){this._blurMaterial=i}get dithering(){return this.copyMaterial.dithering}set dithering(i){this.copyMaterial.dithering=i}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(i){this.blurMaterial.kernelSize=i}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get scale(){return this.blurMaterial.scale}set scale(i){this.blurMaterial.scale=i}getScale(){return this.blurMaterial.scale}setScale(i){this.blurMaterial.scale=i}getKernelSize(){return this.kernelSize}setKernelSize(i){this.kernelSize=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}render(i,e,t,n,r){const s=this.scene,a=this.camera,o=this.renderTargetA,l=this.renderTargetB,c=this.blurMaterial,u=c.kernelSequence;let h=e;this.fullscreenMaterial=c;for(let d=0,p=u.length;d<p;++d){const g=d&1?l:o;c.kernel=u[d],c.inputBuffer=h.texture,i.setRenderTarget(g),i.render(s,a),h=g}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=h.texture,i.setRenderTarget(this.renderToScreen?null:t),i.render(s,a)}setSize(i,e){const t=this.resolution;t.setBaseSize(i,e);const n=t.width,r=t.height;this.renderTargetA.setSize(n,r),this.renderTargetB.setSize(n,r),this.blurMaterial.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTargetA.texture.type=t,this.renderTargetB.texture.type=t,t!==Qt?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):i.outputEncoding===Ne&&(this.renderTargetA.texture.encoding=Ne,this.renderTargetB.texture.encoding=Ne))}static get AUTO_SIZE(){return En.AUTO_SIZE}},uA=class extends Gt{constructor({renderTarget:i,luminanceRange:e,colorOutput:t,resolutionScale:n=1,width:r=En.AUTO_SIZE,height:s=En.AUTO_SIZE,resolutionX:a=r,resolutionY:o=s}={}){super("LuminancePass"),this.fullscreenMaterial=new Z_(t,e),this.needsSwap=!1,this.renderTarget=i,this.renderTarget===void 0&&(this.renderTarget=new ut(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");const l=this.resolution=new En(this,a,o,n);l.addEventListener("change",c=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(i,e,t,n,r){const s=this.fullscreenMaterial;s.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){const t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height)}initialize(i,e,t){t!==void 0&&t!==Qt&&(this.renderTarget.texture.type=t,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},hA=class extends Gt{constructor(i,e){super("MaskPass",i,e),this.needsSwap=!1,this.clearPass=new yo(!1,!1,!0),this.inverse=!1}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get inverted(){return this.inverse}set inverted(i){this.inverse=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(i){this.inverted=i}render(i,e,t,n,r){const s=i.getContext(),a=i.state.buffers,o=this.scene,l=this.camera,c=this.clearPass,u=this.inverted?0:1,h=1-u;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),a.stencil.setFunc(s.ALWAYS,u,4294967295),a.stencil.setClear(h),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(i,null):(c.render(i,e),c.render(i,t))),this.renderToScreen?(i.setRenderTarget(null),i.render(o,l)):(i.setRenderTarget(e),i.render(o,l),i.setRenderTarget(t),i.render(o,l)),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(s.EQUAL,1,4294967295),a.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),a.stencil.setLocked(!0)}},dA=class extends Gt{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new ut(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new H_,this.upsamplingMaterial=new nA,this.resolution=new ge}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(i){if(this.levels!==i){const e=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let t=0;t<i;++t){const n=e.clone();n.texture.name="Downsampling.Mipmap"+t,this.downsamplingMipmaps.push(n)}this.upsamplingMipmaps.push(e);for(let t=1,n=i-1;t<n;++t){const r=e.clone();r.texture.name="Upsampling.Mipmap"+t,this.upsamplingMipmaps.push(r)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(i){this.upsamplingMaterial.radius=i}render(i,e,t,n,r){const{scene:s,camera:a}=this,{downsamplingMaterial:o,upsamplingMaterial:l}=this,{downsamplingMipmaps:c,upsamplingMipmaps:u}=this;let h=e;this.fullscreenMaterial=o;for(let d=0,p=c.length;d<p;++d){const g=c[d];o.setSize(h.width,h.height),o.inputBuffer=h.texture,i.setRenderTarget(g),i.render(s,a),h=g}this.fullscreenMaterial=l;for(let d=u.length-1;d>=0;--d){const p=u[d];l.setSize(h.width,h.height),l.inputBuffer=h.texture,l.supportBuffer=c[d].texture,i.setRenderTarget(p),i.render(s,a),h=p}}setSize(i,e){const t=this.resolution;t.set(i,e);let n=t.width,r=t.height;for(let s=0,a=this.downsamplingMipmaps.length;s<a;++s)n=Math.round(n*.5),r=Math.round(r*.5),this.downsamplingMipmaps[s].setSize(n,r),s<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[s].setSize(n,r)}initialize(i,e,t){if(t!==void 0){const n=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(const r of n)r.texture.type=t;if(t!==Qt)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(i.outputEncoding===Ne)for(const r of n)r.texture.encoding=Ne}}dispose(){super.dispose();for(const i of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))i.dispose()}},Xl=class extends Gt{constructor(i,e="inputBuffer"){super("ShaderPass"),this.fullscreenMaterial=i,this.input=e}setInput(i){this.input=i}render(i,e,t,n,r){const s=this.fullscreenMaterial.uniforms;e!==null&&s!==void 0&&s[this.input]!==void 0&&(s[this.input].value=e.texture),i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}initialize(i,e,t){t!==void 0&&t!==Qt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},vl=1/1e3,fA=1e3,pA=class{constructor(){this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(i){typeof document<"u"&&document.hidden!==void 0&&(i?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=i)}get delta(){return this._delta*vl}get fixedDelta(){return this._fixedDelta*vl}set fixedDelta(i){this._fixedDelta=i*fA}get elapsed(){return this._elapsed*vl}update(i){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=i!==void 0?i:performance.now(),this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()}handleEvent(i){document.hidden||(this.currentTime=performance.now())}dispose(){this.autoReset=!1}},pf=class{constructor(i=null,{depthBuffer:e=!0,stencilBuffer:t=!1,multisampling:n=0,frameBufferType:r}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,t,r,n),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new sA,this.depthTexture=null,this.passes=[],this.timer=new pA,this.autoRenderToScreen=!0,this.setRenderer(i)}get multisampling(){return this.inputBuffer.samples||0}set multisampling(i){const e=this.inputBuffer,t=this.multisampling;t>0&&i>0?(this.inputBuffer.samples=i,this.outputBuffer.samples=i,this.inputBuffer.dispose(),this.outputBuffer.dispose()):t!==i&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(e.depthBuffer,e.stencilBuffer,e.texture.type,i),this.inputBuffer.depthTexture=this.depthTexture,this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(i){if(this.renderer=i,i!==null){const e=i.getSize(new ge),t=i.getContext().getContextAttributes().alpha,n=this.inputBuffer.texture.type;n===Qt&&i.outputEncoding===Ne&&(this.inputBuffer.texture.encoding=Ne,this.outputBuffer.texture.encoding=Ne,this.inputBuffer.dispose(),this.outputBuffer.dispose()),i.autoClear=!1,this.setSize(e.width,e.height);for(const r of this.passes)r.initialize(i,t,n)}}replaceRenderer(i,e=!0){const t=this.renderer,n=t.domElement.parentNode;return this.setRenderer(i),e&&n!==null&&(n.removeChild(t.domElement),n.appendChild(i.domElement)),t}createDepthTexture(){const i=this.depthTexture=new Sr;return this.inputBuffer.depthTexture=i,this.inputBuffer.dispose(),this.inputBuffer.stencilBuffer?(i.format=xr,i.type=mr):i.type=ji,i}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.inputBuffer.depthTexture=null,this.inputBuffer.dispose();for(const i of this.passes)i.setDepthTexture(null)}}createBuffer(i,e,t,n){const r=this.renderer,s=r===null?new ge:r.getDrawingBufferSize(new ge),a={minFilter:Fe,magFilter:Fe,stencilBuffer:e,depthBuffer:i,type:t},o=new ut(s.width,s.height,a);return n>0&&(o.ignoreDepthForMultisampleCopy=!1,o.samples=n),t===Qt&&r!==null&&r.outputEncoding===Ne&&(o.texture.encoding=Ne),o.texture.name="EffectComposer.Buffer",o.texture.generateMipmaps=!1,o}setMainScene(i){for(const e of this.passes)e.mainScene=i}setMainCamera(i){for(const e of this.passes)e.mainCamera=i}addPass(i,e){const t=this.passes,n=this.renderer,r=n.getDrawingBufferSize(new ge),s=n.getContext().getContextAttributes().alpha,a=this.inputBuffer.texture.type;if(i.setRenderer(n),i.setSize(r.width,r.height),i.initialize(n,s,a),this.autoRenderToScreen&&(t.length>0&&(t[t.length-1].renderToScreen=!1),i.renderToScreen&&(this.autoRenderToScreen=!1)),e!==void 0?t.splice(e,0,i):t.push(i),this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!0),i.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){const o=this.createDepthTexture();for(i of t)i.setDepthTexture(o)}else i.setDepthTexture(this.depthTexture)}removePass(i){const e=this.passes,t=e.indexOf(i);if(t!==-1&&e.splice(t,1).length>0){if(this.depthTexture!==null){const s=(o,l)=>o||l.needsDepthTexture;e.reduce(s,!1)||(i.getDepthTexture()===this.depthTexture&&i.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&t===e.length&&(i.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){const i=this.passes;this.deleteDepthTexture(),i.length>0&&(this.autoRenderToScreen&&(i[i.length-1].renderToScreen=!1),this.passes=[])}render(i){const e=this.renderer,t=this.copyPass;let n=this.inputBuffer,r=this.outputBuffer,s=!1,a,o,l;i===void 0&&(this.timer.update(),i=this.timer.delta);for(const c of this.passes)c.enabled&&(c.render(e,n,r,i,s),c.needsSwap&&(s&&(t.renderToScreen=c.renderToScreen,a=e.getContext(),o=e.state.buffers.stencil,o.setFunc(a.NOTEQUAL,1,4294967295),t.render(e,n,r,i,s),o.setFunc(a.EQUAL,1,4294967295)),l=n,n=r,r=l),c instanceof hA?s=!0:c instanceof aA&&(s=!1))}setSize(i,e,t){const n=this.renderer,r=n.getSize(new ge);(i===void 0||e===void 0)&&(i=r.width,e=r.height),(r.width!==i||r.height!==e)&&n.setSize(i,e,t);const s=n.getDrawingBufferSize(new ge);this.inputBuffer.setSize(s.width,s.height),this.outputBuffer.setSize(s.width,s.height);for(const a of this.passes)a.setSize(s.width,s.height)}reset(){const i=this.timer.autoReset;this.dispose(),this.autoRenderToScreen=!0,this.timer.autoReset=i}dispose(){for(const i of this.passes)i.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose()}},mA=class{constructor(){this.shaderParts=new Map([[st.FRAGMENT_HEAD,null],[st.FRAGMENT_MAIN_UV,null],[st.FRAGMENT_MAIN_IMAGE,null],[st.VERTEX_HEAD,null],[st.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=ci.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=dn}},mf=class extends Set{constructor(i,e=10){super(),this.l=e,this.exclusive=!1,i!==void 0&&this.set(i)}get layer(){return this.l}set layer(i){const e=this.l;for(const t of this)t.layers.disable(e),t.layers.enable(i);this.l=i}getLayer(){return this.layer}setLayer(i){this.layer=i}isExclusive(){return this.exclusive}setExclusive(i){this.exclusive=i}clear(){const i=this.layer;for(const e of this)e.layers.disable(i);return super.clear()}set(i){this.clear();for(const e of i)this.add(e);return this}indexOf(i){return this.has(i)?0:-1}add(i){return this.exclusive?i.layers.set(this.layer):i.layers.enable(this.layer),super.add(i)}delete(i){return this.has(i)&&i.layers.disable(this.layer),super.delete(i)}toggle(i){let e;return this.has(i)?(this.delete(i),e=!1):(this.add(i),e=!0),e}setVisible(i){for(const e of this)i?e.layers.enable(0):e.layers.disable(0);return this}},gA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y,opacity);}",vA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,min(y.a,opacity));}",xA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y)*0.5,opacity);}",wA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.rg,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",yA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(step(0.0,y)*(1.0-min(vec4(1.0),(1.0-x)/y)),vec4(1.0),step(1.0,x));return mix(x,z,opacity);}",_A="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=step(0.0,x)*mix(min(vec4(1.0),x/max(1.0-y,1e-9)),vec4(1.0),step(1.0,y));return mix(x,z,opacity);}",AA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x,y),opacity);}",MA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,abs(x-y),opacity);}",bA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x/max(y,1e-12),opacity);}",SA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y-2.0*x*y),opacity);}",TA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 a=min(x,1.0),b=min(y,1.0);vec4 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,y));return mix(x,z,opacity);}",EA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,step(1.0,x+y),opacity);}",CA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.r,xHSL.gb));return vec4(mix(x.rgb,z,opacity),y.a);}",DA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-y,opacity);}",PA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y*(1.0-x),opacity);}",RA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x,y),opacity);}",IA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(y+x-1.0,0.0,1.0),opacity);}",LA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x+y,1.0),opacity);}",BA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(2.0*y+x-1.0,0.0,1.0),opacity);}",UA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.rg,yHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",NA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x*y,opacity);}",FA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-abs(1.0-x-y),opacity);}",OA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,opacity);}",zA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(2.0*y*x,1.0-2.0*(1.0-y)*(1.0-x),step(0.5,x));return mix(x,z,opacity);}",kA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 z=mix(mix(y2,x,step(0.5*x,y)),max(vec4(0.0),y2-1.0),step(x,(y2-1.0)));return mix(x,z,opacity);}",GA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(min(x*x/max(1.0-y,1e-12),1.0),y,step(1.0,y));return mix(x,z,opacity);}",HA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.r,yHSL.g,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",VA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y-min(x*y,1.0),opacity);}",WA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 w=step(0.5,y);vec4 z=mix(x-(1.0-y2)*x*(1.0-x),mix(x+(y2-1.0)*(sqrt(x)-x),x+(y2-1.0)*x*((16.0*x-12.0)*x+3.0),w*(1.0-step(0.25,x))),w);return mix(x,z,opacity);}",jA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}",XA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x+y-1.0,0.0),opacity);}",YA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(max(1.0-min((1.0-x)/(2.0*y),1.0),0.0),min(x/(2.0*(1.0-y)),1.0),step(0.5,y));return mix(x,z,opacity);}",qA=new Map([[$e.ADD,gA],[$e.ALPHA,vA],[$e.AVERAGE,xA],[$e.COLOR,wA],[$e.COLOR_BURN,yA],[$e.COLOR_DODGE,_A],[$e.DARKEN,AA],[$e.DIFFERENCE,MA],[$e.DIVIDE,bA],[$e.DST,null],[$e.EXCLUSION,SA],[$e.HARD_LIGHT,TA],[$e.HARD_MIX,EA],[$e.HUE,CA],[$e.INVERT,DA],[$e.INVERT_RGB,PA],[$e.LIGHTEN,RA],[$e.LINEAR_BURN,IA],[$e.LINEAR_DODGE,LA],[$e.LINEAR_LIGHT,BA],[$e.LUMINOSITY,UA],[$e.MULTIPLY,NA],[$e.NEGATION,FA],[$e.NORMAL,OA],[$e.OVERLAY,zA],[$e.PIN_LIGHT,kA],[$e.REFLECT,GA],[$e.SATURATION,HA],[$e.SCREEN,VA],[$e.SOFT_LIGHT,WA],[$e.SRC,jA],[$e.SUBTRACT,XA],[$e.VIVID_LIGHT,YA]]),QA=class extends fi{constructor(i,e=1){super(),this._blendFunction=i,this.opacity=new X(e)}getOpacity(){return this.opacity.value}setOpacity(i){this.opacity.value=i}get blendFunction(){return this._blendFunction}set blendFunction(i){this._blendFunction=i,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(i){this.blendFunction=i}getShaderCode(){return qA.get(this.blendFunction)}},$i=class extends fi{constructor(i,e,{attributes:t=ci.NONE,blendFunction:n=$e.NORMAL,defines:r=new Map,uniforms:s=new Map,extensions:a=null,vertexShader:o=null}={}){super(),this.name=i,this.renderer=null,this.attributes=t,this.fragmentShader=e,this.vertexShader=o,this.defines=r,this.uniforms=s,this.extensions=a,this.blendMode=new QA(n),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=dn,this._outputColorSpace=null}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(i){this._inputColorSpace=i,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(i){this._outputColorSpace=i,this.setChanged()}set mainScene(i){}set mainCamera(i){}getName(){return this.name}setRenderer(i){this.renderer=i}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(i){this.attributes=i,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(i){this.fragmentShader=i,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(i){this.vertexShader=i,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(i,e=hi){}update(i,e,t){}setSize(i,e){}initialize(i,e,t){}dispose(){for(const i of Object.keys(this)){const e=this[i];(e instanceof ut||e instanceof Cn||e instanceof Ct||e instanceof Gt)&&this[i].dispose()}}},ZA=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=texture2D(map,uv)*intensity;}`,gf=class extends $i{constructor({blendFunction:i=$e.SCREEN,luminanceThreshold:e=.9,luminanceSmoothing:t=.025,mipmapBlur:n=!1,intensity:r=1,radius:s=.85,levels:a=8,kernelSize:o=wo.LARGE,resolutionScale:l=.5,width:c=En.AUTO_SIZE,height:u=En.AUTO_SIZE,resolutionX:h=c,resolutionY:d=u}={}){super("BloomEffect",ZA,{blendFunction:i,uniforms:new Map([["map",new X(null)],["intensity",new X(r)]])}),this.renderTarget=new ut(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new cA({kernelSize:o}),this.luminancePass=new uA({colorOutput:!0}),this.luminanceMaterial.threshold=e,this.luminanceMaterial.smoothing=t,this.mipmapBlurPass=new dA,this.mipmapBlurPass.enabled=n,this.mipmapBlurPass.radius=s,this.mipmapBlurPass.levels=a,this.uniforms.get("map").value=n?this.mipmapBlurPass.texture:this.renderTarget.texture;const p=this.resolution=new En(this,h,d,l);p.addEventListener("change",g=>this.setSize(p.baseWidth,p.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get dithering(){return this.blurPass.dithering}set dithering(i){this.blurPass.dithering=i}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(i){this.blurPass.kernelSize=i}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(i){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(i){this.uniforms.get("intensity").value=i}getIntensity(){return this.intensity}setIntensity(i){this.intensity=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}update(i,e,t){const n=this.renderTarget,r=this.luminancePass;r.enabled?(r.render(i,e),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,r.renderTarget):this.blurPass.render(i,r.renderTarget,n)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,e):this.blurPass.render(i,e,n)}setSize(i,e){const t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height),this.blurPass.resolution.copy(t),this.luminancePass.setSize(i,e),this.mipmapBlurPass.setSize(i,e)}initialize(i,e,t){this.blurPass.initialize(i,e,t),this.luminancePass.initialize(i,e,t),this.mipmapBlurPass.initialize(i,e,t),t!==void 0&&(this.renderTarget.texture.type=t,i.outputEncoding===Ne&&(this.renderTarget.texture.encoding=Ne))}},KA=`
#if THREE_REVISION < 143
#define luminance(v) linearToRelativeLuminance(v)
#endif
#define QUALITY(q) ((q) < 5 ? 1.0 : ((q) > 5 ? ((q) < 10 ? 2.0 : ((q) < 11 ? 4.0 : 8.0)) : 1.5))
#define ONE_OVER_TWELVE 0.08333333333333333
varying vec2 vUvDown;varying vec2 vUvUp;varying vec2 vUvLeft;varying vec2 vUvRight;varying vec2 vUvDownLeft;varying vec2 vUvUpRight;varying vec2 vUvUpLeft;varying vec2 vUvDownRight;vec4 fxaa(const in vec4 inputColor,const in vec2 uv){float lumaCenter=luminance(inputColor.rgb);float lumaDown=luminance(texture2D(inputBuffer,vUvDown).rgb);float lumaUp=luminance(texture2D(inputBuffer,vUvUp).rgb);float lumaLeft=luminance(texture2D(inputBuffer,vUvLeft).rgb);float lumaRight=luminance(texture2D(inputBuffer,vUvRight).rgb);float lumaMin=min(lumaCenter,min(min(lumaDown,lumaUp),min(lumaLeft,lumaRight)));float lumaMax=max(lumaCenter,max(max(lumaDown,lumaUp),max(lumaLeft,lumaRight)));float lumaRange=lumaMax-lumaMin;if(lumaRange<max(EDGE_THRESHOLD_MIN,lumaMax*EDGE_THRESHOLD_MAX)){return inputColor;}float lumaDownLeft=luminance(texture2D(inputBuffer,vUvDownLeft).rgb);float lumaUpRight=luminance(texture2D(inputBuffer,vUvUpRight).rgb);float lumaUpLeft=luminance(texture2D(inputBuffer,vUvUpLeft).rgb);float lumaDownRight=luminance(texture2D(inputBuffer,vUvDownRight).rgb);float lumaDownUp=lumaDown+lumaUp;float lumaLeftRight=lumaLeft+lumaRight;float lumaLeftCorners=lumaDownLeft+lumaUpLeft;float lumaDownCorners=lumaDownLeft+lumaDownRight;float lumaRightCorners=lumaDownRight+lumaUpRight;float lumaUpCorners=lumaUpRight+lumaUpLeft;float edgeHorizontal=(abs(-2.0*lumaLeft+lumaLeftCorners)+abs(-2.0*lumaCenter+lumaDownUp)*2.0+abs(-2.0*lumaRight+lumaRightCorners));float edgeVertical=(abs(-2.0*lumaUp+lumaUpCorners)+abs(-2.0*lumaCenter+lumaLeftRight)*2.0+abs(-2.0*lumaDown+lumaDownCorners));bool isHorizontal=(edgeHorizontal>=edgeVertical);float stepLength=isHorizontal?texelSize.y:texelSize.x;float luma1=isHorizontal?lumaDown:lumaLeft;float luma2=isHorizontal?lumaUp:lumaRight;float gradient1=abs(luma1-lumaCenter);float gradient2=abs(luma2-lumaCenter);bool is1Steepest=gradient1>=gradient2;float gradientScaled=0.25*max(gradient1,gradient2);float lumaLocalAverage=0.0;if(is1Steepest){stepLength=-stepLength;lumaLocalAverage=0.5*(luma1+lumaCenter);}else{lumaLocalAverage=0.5*(luma2+lumaCenter);}vec2 currentUv=uv;if(isHorizontal){currentUv.y+=stepLength*0.5;}else{currentUv.x+=stepLength*0.5;}vec2 offset=isHorizontal?vec2(texelSize.x,0.0):vec2(0.0,texelSize.y);vec2 uv1=currentUv-offset*QUALITY(0);vec2 uv2=currentUv+offset*QUALITY(0);float lumaEnd1=luminance(texture2D(inputBuffer,uv1).rgb);float lumaEnd2=luminance(texture2D(inputBuffer,uv2).rgb);lumaEnd1-=lumaLocalAverage;lumaEnd2-=lumaLocalAverage;bool reached1=abs(lumaEnd1)>=gradientScaled;bool reached2=abs(lumaEnd2)>=gradientScaled;bool reachedBoth=reached1&&reached2;if(!reached1){uv1-=offset*QUALITY(1);}if(!reached2){uv2+=offset*QUALITY(1);}if(!reachedBoth){for(int i=2;i<SAMPLES;++i){if(!reached1){lumaEnd1=luminance(texture2D(inputBuffer,uv1).rgb);lumaEnd1=lumaEnd1-lumaLocalAverage;}if(!reached2){lumaEnd2=luminance(texture2D(inputBuffer,uv2).rgb);lumaEnd2=lumaEnd2-lumaLocalAverage;}reached1=abs(lumaEnd1)>=gradientScaled;reached2=abs(lumaEnd2)>=gradientScaled;reachedBoth=reached1&&reached2;if(!reached1){uv1-=offset*QUALITY(i);}if(!reached2){uv2+=offset*QUALITY(i);}if(reachedBoth){break;}}}float distance1=isHorizontal?(uv.x-uv1.x):(uv.y-uv1.y);float distance2=isHorizontal?(uv2.x-uv.x):(uv2.y-uv.y);bool isDirection1=distance1<distance2;float distanceFinal=min(distance1,distance2);float edgeThickness=(distance1+distance2);bool isLumaCenterSmaller=lumaCenter<lumaLocalAverage;bool correctVariation1=(lumaEnd1<0.0)!=isLumaCenterSmaller;bool correctVariation2=(lumaEnd2<0.0)!=isLumaCenterSmaller;bool correctVariation=isDirection1?correctVariation1:correctVariation2;float pixelOffset=-distanceFinal/edgeThickness+0.5;float finalOffset=correctVariation?pixelOffset:0.0;float lumaAverage=ONE_OVER_TWELVE*(2.0*(lumaDownUp+lumaLeftRight)+lumaLeftCorners+lumaRightCorners);float subPixelOffset1=clamp(abs(lumaAverage-lumaCenter)/lumaRange,0.0,1.0);float subPixelOffset2=(-2.0*subPixelOffset1+3.0)*subPixelOffset1*subPixelOffset1;float subPixelOffsetFinal=subPixelOffset2*subPixelOffset2*SUBPIXEL_QUALITY;finalOffset=max(finalOffset,subPixelOffsetFinal);vec2 finalUv=uv;if(isHorizontal){finalUv.y+=finalOffset*stepLength;}else{finalUv.x+=finalOffset*stepLength;}return texture2D(inputBuffer,finalUv);}void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=fxaa(inputColor,uv);}`,JA="varying vec2 vUvDown;varying vec2 vUvUp;varying vec2 vUvLeft;varying vec2 vUvRight;varying vec2 vUvDownLeft;varying vec2 vUvUpRight;varying vec2 vUvUpLeft;varying vec2 vUvDownRight;void mainSupport(const in vec2 uv){vUvDown=uv+vec2(0.0,-1.0)*texelSize;vUvUp=uv+vec2(0.0,1.0)*texelSize;vUvRight=uv+vec2(1.0,0.0)*texelSize;vUvLeft=uv+vec2(-1.0,0.0)*texelSize;vUvDownLeft=uv+vec2(-1.0,-1.0)*texelSize;vUvUpRight=uv+vec2(1.0,1.0)*texelSize;vUvUpLeft=uv+vec2(-1.0,1.0)*texelSize;vUvDownRight=uv+vec2(1.0,-1.0)*texelSize;}",$A=class extends $i{constructor({blendFunction:i=$e.SRC}={}){super("FXAAEffect",KA,{vertexShader:JA,blendFunction:i,defines:new Map([["EDGE_THRESHOLD_MIN","0.0312"],["EDGE_THRESHOLD_MAX","0.125"],["SUBPIXEL_QUALITY","0.75"],["SAMPLES","12"]])})}get minEdgeThreshold(){return Number(this.defines.get("EDGE_THRESHOLD_MIN"))}set minEdgeThreshold(i){this.defines.set("EDGE_THRESHOLD_MIN",i.toFixed(12)),this.setChanged()}get maxEdgeThreshold(){return Number(this.defines.get("EDGE_THRESHOLD_MAX"))}set maxEdgeThreshold(i){this.defines.set("EDGE_THRESHOLD_MAX",i.toFixed(12)),this.setChanged()}get subpixelQuality(){return Number(this.defines.get("SUBPIXEL_QUALITY"))}set subpixelQuality(i){this.defines.set("SUBPIXEL_QUALITY",i.toFixed(12)),this.setChanged()}get samples(){return Number(this.defines.get("SAMPLES"))}set samples(i){this.defines.set("SAMPLES",i.toFixed(0)),this.setChanged()}};new I;new ze;function Oh(i,e,t){const n=document.createElement("canvas"),r=n.getContext("2d");if(n.width=i,n.height=e,t instanceof Image)r.drawImage(t,0,0);else{const s=r.createImageData(i,e);s.data.set(t),r.putImageData(s,0,0)}return n}var vf=class{constructor(i=0,e=0,t=null){this.width=i,this.height=e,this.data=t}toCanvas(){return typeof document>"u"?null:Oh(this.width,this.height,this.data)}static from(i){const{width:e,height:t}=i;let n;if(i instanceof Image){const r=Oh(e,t,i);r!==null&&(n=r.getContext("2d").getImageData(0,0,e,t).data)}else n=i.data;return new vf(e,t,n)}},eM=`"use strict";(()=>{var O=Math.pow;var _={SCALE_UP:"lut.scaleup"};var k=[new Float32Array(3),new Float32Array(3)],n=[new Float32Array(3),new Float32Array(3),new Float32Array(3),new Float32Array(3)],Z=[[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([0,1,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([0,1,1]),new Float32Array([1,1,1])]];function d(a,t,r,m){let i=r[0]-t[0],e=r[1]-t[1],y=r[2]-t[2],h=a[0]-t[0],A=a[1]-t[1],w=a[2]-t[2],c=e*w-y*A,l=y*h-i*w,x=i*A-e*h,u=Math.sqrt(c*c+l*l+x*x),b=u*.5,s=c/u,F=l/u,f=x/u,p=-(a[0]*s+a[1]*F+a[2]*f),M=m[0]*s+m[1]*F+m[2]*f;return Math.abs(M+p)*b/3}function V(a,t,r,m,i,e){let y=(r+m*t+i*t*t)*4;e[0]=a[y+0],e[1]=a[y+1],e[2]=a[y+2]}function j(a,t,r,m,i,e){let y=r*(t-1),h=m*(t-1),A=i*(t-1),w=Math.floor(y),c=Math.floor(h),l=Math.floor(A),x=Math.ceil(y),u=Math.ceil(h),b=Math.ceil(A),s=y-w,F=h-c,f=A-l;if(w===y&&c===h&&l===A)V(a,t,y,h,A,e);else{let p;s>=F&&F>=f?p=Z[0]:s>=f&&f>=F?p=Z[1]:f>=s&&s>=F?p=Z[2]:F>=s&&s>=f?p=Z[3]:F>=f&&f>=s?p=Z[4]:f>=F&&F>=s&&(p=Z[5]);let[M,g,X,Y]=p,P=k[0];P[0]=s,P[1]=F,P[2]=f;let o=k[1],L=x-w,S=u-c,U=b-l;o[0]=L*M[0]+w,o[1]=S*M[1]+c,o[2]=U*M[2]+l,V(a,t,o[0],o[1],o[2],n[0]),o[0]=L*g[0]+w,o[1]=S*g[1]+c,o[2]=U*g[2]+l,V(a,t,o[0],o[1],o[2],n[1]),o[0]=L*X[0]+w,o[1]=S*X[1]+c,o[2]=U*X[2]+l,V(a,t,o[0],o[1],o[2],n[2]),o[0]=L*Y[0]+w,o[1]=S*Y[1]+c,o[2]=U*Y[2]+l,V(a,t,o[0],o[1],o[2],n[3]);let T=d(g,X,Y,P)*6,q=d(M,X,Y,P)*6,C=d(M,g,Y,P)*6,E=d(M,g,X,P)*6;n[0][0]*=T,n[0][1]*=T,n[0][2]*=T,n[1][0]*=q,n[1][1]*=q,n[1][2]*=q,n[2][0]*=C,n[2][1]*=C,n[2][2]*=C,n[3][0]*=E,n[3][1]*=E,n[3][2]*=E,e[0]=n[0][0]+n[1][0]+n[2][0]+n[3][0],e[1]=n[0][1]+n[1][1]+n[2][1]+n[3][1],e[2]=n[0][2]+n[1][2]+n[2][2]+n[3][2]}}var v=class{static expand(t,r){let m=Math.cbrt(t.length/4),i=new Float32Array(3),e=new t.constructor(O(r,3)*4),y=t instanceof Uint8Array?255:1,h=O(r,2),A=1/(r-1);for(let w=0;w<r;++w)for(let c=0;c<r;++c)for(let l=0;l<r;++l){let x=l*A,u=c*A,b=w*A,s=Math.round(l+c*r+w*h)*4;j(t,m,x,u,b,i),e[s+0]=i[0],e[s+1]=i[1],e[s+2]=i[2],e[s+3]=y}return e}};self.addEventListener("message",a=>{let t=a.data,r=t.data;switch(t.operation){case _.SCALE_UP:r=v.expand(r,t.size);break}postMessage(r,[r.buffer]),close()});})();
`,zh=new Ie,Zs=class extends Ws{constructor(i,e){super(i,e,e,e),this.type=it,this.format=Ft,this.encoding=dn,this.minFilter=Fe,this.magFilter=Fe,this.wrapS=nn,this.wrapT=nn,this.wrapR=nn,this.unpackAlignment=1,this.needsUpdate=!0,this.domainMin=new I(0,0,0),this.domainMax=new I(1,1,1)}get isLookupTexture3D(){return!0}scaleUp(i,e=!0){const t=this.image;let n;return i<=t.width?n=Promise.reject(new Error("The target size must be greater than the current size")):n=new Promise((r,s)=>{const a=URL.createObjectURL(new Blob([eM],{type:"text/javascript"})),o=new Worker(a);o.addEventListener("error",c=>s(c.error)),o.addEventListener("message",c=>{const u=new Zs(c.data,i);u.encoding=this.encoding,u.type=this.type,u.name=this.name,URL.revokeObjectURL(a),r(u)});const l=e?[t.data.buffer]:[];o.postMessage({operation:R_.SCALE_UP,data:t.data,size:i},l)}),n}applyLUT(i){const e=this.image,t=i.image,n=Math.min(e.width,e.height,e.depth),r=Math.min(t.width,t.height,t.depth);if(n!==r)console.error("Size mismatch");else if(i.type!==it||this.type!==it)console.error("Both LUTs must be FloatType textures");else if(i.format!==Ft||this.format!==Ft)console.error("Both LUTs must be RGBA textures");else{const s=e.data,a=t.data,o=n,l=o**2,c=o-1;for(let u=0,h=o**3;u<h;++u){const d=u*4,p=s[d+0]*c,g=s[d+1]*c,m=s[d+2]*c,f=Math.round(p+g*o+m*l)*4;s[d+0]=a[f+0],s[d+1]=a[f+1],s[d+2]=a[f+2]}this.needsUpdate=!0}return this}convertToUint8(){if(this.type===it){const i=this.image.data,e=new Uint8Array(i.length);for(let t=0,n=i.length;t<n;++t)e[t]=i[t]*255+.5;this.image.data=e,this.type=Qt,this.needsUpdate=!0}return this}convertToFloat(){if(this.type===Qt){const i=this.image.data,e=new Float32Array(i.length);for(let t=0,n=i.length;t<n;++t)e[t]=i[t]/255;this.image.data=e,this.type=it,this.needsUpdate=!0}return this}convertToRGBA(){return console.warn("LookupTexture","convertToRGBA() is deprecated, LUTs are now RGBA by default"),this}convertLinearToSRGB(){const i=this.image.data;if(this.type===it){for(let e=0,t=i.length;e<t;e+=4)zh.fromArray(i,e).convertLinearToSRGB().toArray(i,e);this.encoding=Ne,this.needsUpdate=!0}else console.error("Color space conversion requires FloatType data");return this}convertSRGBToLinear(){const i=this.image.data;if(this.type===it){for(let e=0,t=i.length;e<t;e+=4)zh.fromArray(i,e).convertSRGBToLinear().toArray(i,e);this.encoding=dn,this.needsUpdate=!0}else console.error("Color space conversion requires FloatType data");return this}toDataTexture(){const i=this.image.width,e=this.image.height*this.image.depth,t=new gr(this.image.data,i,e);return t.name=this.name,t.type=this.type,t.format=this.format,t.encoding=this.encoding,t.minFilter=Fe,t.magFilter=Fe,t.wrapS=this.wrapS,t.wrapT=this.wrapT,t.generateMipmaps=!1,t.needsUpdate=!0,t}static from(i){const e=i.image,{width:t,height:n}=e,r=Math.min(t,n);let s;if(e instanceof Image){const l=vf.from(e).data;if(t>n){s=new Uint8Array(l.length);for(let c=0;c<r;++c)for(let u=0;u<r;++u)for(let h=0;h<r;++h){const d=(h+c*r+u*r*r)*4,p=(h+u*r+c*r*r)*4;s[p+0]=l[d+0],s[p+1]=l[d+1],s[p+2]=l[d+2],s[p+3]=l[d+3]}}else s=new Uint8Array(l.buffer)}else s=e.data.slice();const a=new Zs(s,r);return a.encoding=i.encoding,a.type=i.type,a.name=i.name,a}static createNeutral(i){const e=new Float32Array(i**3*4),t=i**2,n=1/(i-1);for(let s=0;s<i;++s)for(let a=0;a<i;++a)for(let o=0;o<i;++o){const l=(s+a*i+o*t)*4;e[l+0]=s*n,e[l+1]=a*n,e[l+2]=o*n,e[l+3]=1}const r=new Zs(e,i);return r.name="neutral",r}},tM=`uniform vec3 scale;uniform vec3 offset;
#ifdef CUSTOM_INPUT_DOMAIN
uniform vec3 domainMin;uniform vec3 domainMax;
#endif
#ifdef LUT_3D
#ifdef LUT_PRECISION_HIGH
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler3D lut;
#else
uniform mediump sampler3D lut;
#endif
#else
uniform lowp sampler3D lut;
#endif
vec4 applyLUT(const in vec3 rgb){
#ifdef TETRAHEDRAL_INTERPOLATION
vec3 p=floor(rgb);vec3 f=rgb-p;vec3 v1=(p+0.5)*LUT_TEXEL_WIDTH;vec3 v4=(p+1.5)*LUT_TEXEL_WIDTH;vec3 v2,v3;vec3 frac;if(f.r>=f.g){if(f.g>f.b){frac=f.rgb;v2=vec3(v4.x,v1.y,v1.z);v3=vec3(v4.x,v4.y,v1.z);}else if(f.r>=f.b){frac=f.rbg;v2=vec3(v4.x,v1.y,v1.z);v3=vec3(v4.x,v1.y,v4.z);}else{frac=f.brg;v2=vec3(v1.x,v1.y,v4.z);v3=vec3(v4.x,v1.y,v4.z);}}else{if(f.b>f.g){frac=f.bgr;v2=vec3(v1.x,v1.y,v4.z);v3=vec3(v1.x,v4.y,v4.z);}else if(f.r>=f.b){frac=f.grb;v2=vec3(v1.x,v4.y,v1.z);v3=vec3(v4.x,v4.y,v1.z);}else{frac=f.gbr;v2=vec3(v1.x,v4.y,v1.z);v3=vec3(v1.x,v4.y,v4.z);}}vec4 n1=texture(lut,v1);vec4 n2=texture(lut,v2);vec4 n3=texture(lut,v3);vec4 n4=texture(lut,v4);vec4 weights=vec4(1.0-frac.x,frac.x-frac.y,frac.y-frac.z,frac.z);vec4 result=weights*mat4(vec4(n1.r,n2.r,n3.r,n4.r),vec4(n1.g,n2.g,n3.g,n4.g),vec4(n1.b,n2.b,n3.b,n4.b),vec4(1.0));return vec4(result.rgb,1.0);
#else
return texture(lut,rgb);
#endif
}
#else
#ifdef LUT_PRECISION_HIGH
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D lut;
#else
uniform mediump sampler2D lut;
#endif
#else
uniform lowp sampler2D lut;
#endif
vec4 applyLUT(const in vec3 rgb){float slice=rgb.b*LUT_SIZE;float slice0=floor(slice);float interp=slice-slice0;float centeredInterp=interp-0.5;float slice1=slice0+sign(centeredInterp);
#ifdef LUT_STRIP_HORIZONTAL
float xOffset=clamp(rgb.r*LUT_TEXEL_HEIGHT,LUT_TEXEL_WIDTH*0.5,LUT_TEXEL_HEIGHT-LUT_TEXEL_WIDTH*0.5);vec2 uv0=vec2(slice0*LUT_TEXEL_HEIGHT+xOffset,rgb.g);vec2 uv1=vec2(slice1*LUT_TEXEL_HEIGHT+xOffset,rgb.g);
#else
float yOffset=clamp(rgb.g*LUT_TEXEL_WIDTH,LUT_TEXEL_HEIGHT*0.5,LUT_TEXEL_WIDTH-LUT_TEXEL_HEIGHT*0.5);vec2 uv0=vec2(rgb.r,slice0*LUT_TEXEL_WIDTH+yOffset);vec2 uv1=vec2(rgb.r,slice1*LUT_TEXEL_WIDTH+yOffset);
#endif
vec4 sample0=texture2D(lut,uv0);vec4 sample1=texture2D(lut,uv1);return mix(sample0,sample1,abs(centeredInterp));}
#endif
void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec3 c=inputColor.rgb;
#ifdef CUSTOM_INPUT_DOMAIN
if(c.r>=domainMin.r&&c.g>=domainMin.g&&c.b>=domainMin.b&&c.r<=domainMax.r&&c.g<=domainMax.g&&c.b<=domainMax.b){c=applyLUT(scale*c+offset).rgb;}else{c=inputColor.rgb;}
#else
#if !defined(LUT_3D) || defined(TETRAHEDRAL_INTERPOLATION)
c=clamp(c,0.0,1.0);
#endif
c=applyLUT(scale*c+offset).rgb;
#endif
outputColor=vec4(c,inputColor.a);}`,nM=class extends $i{constructor(i,{blendFunction:e=$e.SRC,tetrahedralInterpolation:t=!1,inputEncoding:n=Ne}={}){super("LUT3DEffect",tM,{blendFunction:e,uniforms:new Map([["lut",new X(null)],["scale",new X(new I)],["offset",new X(new I)],["domainMin",new X(null)],["domainMax",new X(null)]])}),this.tetrahedralInterpolation=t,this.inputColorSpace=n,this.lut=i}get inputEncoding(){return this.inputColorSpace}set inputEncoding(i){this.inputColorSpace=i}getInputEncoding(){return this.inputColorSpace}setInputEncoding(i){this.inputColorSpace=i}getOutputEncoding(){return this.outputColorSpace}get lut(){return this.uniforms.get("lut").value}set lut(i){const e=this.defines,t=this.uniforms;if(this.lut!==i&&(t.get("lut").value=i,i!==null)){const n=i.image,r=this.tetrahedralInterpolation;if(e.clear(),e.set("LUT_SIZE",Math.min(n.width,n.height).toFixed(16)),e.set("LUT_TEXEL_WIDTH",(1/n.width).toFixed(16)),e.set("LUT_TEXEL_HEIGHT",(1/n.height).toFixed(16)),t.get("domainMin").value=null,t.get("domainMax").value=null,(i.type===it||i.type===yt)&&e.set("LUT_PRECISION_HIGH","1"),n.width>n.height?e.set("LUT_STRIP_HORIZONTAL","1"):i instanceof Ws&&e.set("LUT_3D","1"),i instanceof Zs){const s=i.domainMin,a=i.domainMax;(s.x!==0||s.y!==0||s.z!==0||a.x!==1||a.y!==1||a.z!==1)&&(e.set("CUSTOM_INPUT_DOMAIN","1"),t.get("domainMin").value=s.clone(),t.get("domainMax").value=a.clone())}this.tetrahedralInterpolation=r}}getLUT(){return this.lut}setLUT(i){this.lut=i}updateScaleOffset(){const i=this.lut;if(i!==null){const e=Math.min(i.image.width,i.image.height),t=this.uniforms.get("scale").value,n=this.uniforms.get("offset").value;if(this.tetrahedralInterpolation&&i instanceof Ws)if(this.defines.has("CUSTOM_INPUT_DOMAIN")){const r=i.domainMax.clone().sub(i.domainMin);t.setScalar(e-1).divide(r),n.copy(i.domainMin).negate().multiply(t)}else t.setScalar(e-1),n.setScalar(0);else if(this.defines.has("CUSTOM_INPUT_DOMAIN")){const r=i.domainMax.clone().sub(i.domainMin).multiplyScalar(e);t.setScalar(e-1).divide(r),n.copy(i.domainMin).negate().multiply(t).addScalar(1/(2*e))}else t.setScalar((e-1)/e),n.setScalar(1/(2*e))}}configureTetrahedralInterpolation(){const i=this.lut;i!==null&&(i.minFilter=Fe,i.magFilter=Fe,this.tetrahedralInterpolation&&(i instanceof Ws?(i.minFilter=Ke,i.magFilter=Ke):console.warn("Tetrahedral interpolation requires a 3D texture")),i.source===void 0&&(i.needsUpdate=!0))}get tetrahedralInterpolation(){return this.defines.has("TETRAHEDRAL_INTERPOLATION")}set tetrahedralInterpolation(i){i?this.defines.set("TETRAHEDRAL_INTERPOLATION","1"):this.defines.delete("TETRAHEDRAL_INTERPOLATION"),this.configureTetrahedralInterpolation(),this.updateScaleOffset(),this.setChanged()}setTetrahedralInterpolationEnabled(i){this.tetrahedralInterpolation=i}};new I;new I;var iM=class extends gf{constructor(i,e,t){super(t),this.setAttributes(this.getAttributes()|ci.DEPTH),this.camera=e,this.depthPass=new oA(i,e),this.clearPass=new yo(!0,!1,!1),this.clearPass.overrideClearColor=new Ie(0),this.depthMaskPass=new Xl(new z_);const n=this.depthMaskMaterial;n.copyCameraSettings(e),n.depthBuffer1=this.depthPass.texture,n.depthPacking1=lo,n.depthMode=Ja,this.renderTargetMasked=new ut(1,1,{depthBuffer:!1}),this.renderTargetMasked.texture.name="Bloom.Masked",this.selection=new mf,this.selection.layer=11,this._inverted=!1,this._ignoreBackground=!1}set mainScene(i){this.depthPass.mainScene=i}set mainCamera(i){this.camera=i,this.depthPass.mainCamera=i,this.depthMaskMaterial.copyCameraSettings(i)}getSelection(){return this.selection}get depthMaskMaterial(){return this.depthMaskPass.fullscreenMaterial}get inverted(){return this._inverted}set inverted(i){this._inverted=i,this.depthMaskMaterial.depthMode=i?tc:Ja}isInverted(){return this.inverted}setInverted(i){this.inverted=i}get ignoreBackground(){return this._ignoreBackground}set ignoreBackground(i){this._ignoreBackground=i,this.depthMaskMaterial.maxDepthStrategy=i?Qs.DISCARD_MAX_DEPTH:Qs.KEEP_MAX_DEPTH}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(i){this.ignoreBackground=i}setDepthTexture(i,e=hi){this.depthMaskMaterial.depthBuffer0=i,this.depthMaskMaterial.depthPacking0=e}update(i,e,t){const n=this.camera,r=this.selection,s=this.inverted;let a=e;if(this.ignoreBackground||!s||r.size>0){const o=n.layers.mask;n.layers.set(r.layer),this.depthPass.render(i),n.layers.mask=o,a=this.renderTargetMasked,this.clearPass.render(i,a),this.depthMaskPass.render(i,e,a)}super.update(i,a,t)}setSize(i,e){super.setSize(i,e),this.renderTargetMasked.setSize(i,e),this.depthPass.setSize(i,e)}initialize(i,e,t){super.initialize(i,e,t),this.clearPass.initialize(i,e,t),this.depthPass.initialize(i,e,t),this.depthMaskPass.initialize(i,e,t),t!==void 0&&(this.renderTargetMasked.texture.type=t,i.outputEncoding===Ne&&(this.renderTargetMasked.texture.encoding=Ne))}},kh="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAAeElEQVRYR+2XSwqAMAxEJ168ePEqwRSKhIIiuHjJqiU0gWE+1CQdApcVAMUAuARaMGCX1MIL/Ow13++9lW2s3mW9MWvsnWc/2fvGygwPAN4E8QzAA4CXAB6AHjG4JTHYI1ey3pcx6FHnEfhLDOIBKAmUBK6/ANUDTlROXAHd9EC1AAAAAElFTkSuQmCC",Gh="data:image/png;base64,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",rM="uniform sampler2D weightMap;varying vec2 vOffset0;varying vec2 vOffset1;void movec(const in bvec2 c,inout vec2 variable,const in vec2 value){if(c.x){variable.x=value.x;}if(c.y){variable.y=value.y;}}void movec(const in bvec4 c,inout vec4 variable,const in vec4 value){movec(c.xy,variable.xy,value.xy);movec(c.zw,variable.zw,value.zw);}void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 a;a.x=texture2D(weightMap,vOffset0).a;a.y=texture2D(weightMap,vOffset1).g;a.wz=texture2D(weightMap,uv).rb;vec4 color=inputColor;if(dot(a,vec4(1.0))>=1e-5){bool h=max(a.x,a.z)>max(a.y,a.w);vec4 blendingOffset=vec4(0.0,a.y,0.0,a.w);vec2 blendingWeight=a.yw;movec(bvec4(h),blendingOffset,vec4(a.x,0.0,a.z,0.0));movec(bvec2(h),blendingWeight,a.xz);blendingWeight/=dot(blendingWeight,vec2(1.0));vec4 blendingCoord=blendingOffset*vec4(texelSize,-texelSize)+uv.xyxy;color=blendingWeight.x*texture2D(inputBuffer,blendingCoord.xy);color+=blendingWeight.y*texture2D(inputBuffer,blendingCoord.zw);}outputColor=color;}",sM="varying vec2 vOffset0;varying vec2 vOffset1;void mainSupport(const in vec2 uv){vOffset0=uv+texelSize*vec2(1.0,0.0);vOffset1=uv+texelSize*vec2(0.0,1.0);}",aM=class extends $i{constructor({blendFunction:i=$e.SRC,preset:e=Us.MEDIUM,edgeDetectionMode:t=df.COLOR,predicationMode:n=I_.DISABLED}={}){super("SMAAEffect",rM,{vertexShader:sM,blendFunction:i,attributes:ci.CONVOLUTION|ci.DEPTH,uniforms:new Map([["weightMap",new X(null)]])});let r,s;arguments.length>1&&(r=arguments[0],s=arguments[1],arguments.length>2&&(e=arguments[2]),arguments.length>3&&(t=arguments[3])),this.renderTargetEdges=new ut(1,1,{depthBuffer:!1}),this.renderTargetEdges.texture.name="SMAA.Edges",this.renderTargetWeights=this.renderTargetEdges.clone(),this.renderTargetWeights.texture.name="SMAA.Weights",this.uniforms.get("weightMap").value=this.renderTargetWeights.texture,this.clearPass=new yo(!0,!1,!1),this.clearPass.overrideClearColor=new Ie(0),this.clearPass.overrideClearAlpha=1,this.edgeDetectionPass=new Xl(new j_),this.edgeDetectionMaterial.edgeDetectionMode=t,this.edgeDetectionMaterial.predicationMode=n,this.weightsPass=new Xl(new $_);const a=new fc;a.onLoad=()=>{const o=new Ct(r);o.name="SMAA.Search",o.magFilter=Ke,o.minFilter=Ke,o.generateMipmaps=!1,o.needsUpdate=!0,o.flipY=!0,this.weightsMaterial.searchTexture=o;const l=new Ct(s);l.name="SMAA.Area",l.magFilter=Fe,l.minFilter=Fe,l.generateMipmaps=!1,l.needsUpdate=!0,l.flipY=!1,this.weightsMaterial.areaTexture=l,this.dispatchEvent({type:"load"})},a.itemStart("search"),a.itemStart("area"),r!==void 0&&s!==void 0?(a.itemEnd("search"),a.itemEnd("area")):typeof Image<"u"&&(r=new Image,s=new Image,r.addEventListener("load",()=>a.itemEnd("search")),s.addEventListener("load",()=>a.itemEnd("area")),r.src=kh,s.src=Gh),this.applyPreset(e)}get edgesTexture(){return this.renderTargetEdges.texture}getEdgesTexture(){return this.edgesTexture}get weightsTexture(){return this.renderTargetWeights.texture}getWeightsTexture(){return this.weightsTexture}get edgeDetectionMaterial(){return this.edgeDetectionPass.fullscreenMaterial}get colorEdgesMaterial(){return this.edgeDetectionMaterial}getEdgeDetectionMaterial(){return this.edgeDetectionMaterial}get weightsMaterial(){return this.weightsPass.fullscreenMaterial}getWeightsMaterial(){return this.weightsMaterial}setEdgeDetectionThreshold(i){this.edgeDetectionMaterial.edgeDetectionThreshold=i}setOrthogonalSearchSteps(i){this.weightsMaterial.orthogonalSearchSteps=i}applyPreset(i){const e=this.edgeDetectionMaterial,t=this.weightsMaterial;switch(i){case Us.LOW:e.edgeDetectionThreshold=.15,t.orthogonalSearchSteps=4,t.diagonalDetection=!1,t.cornerDetection=!1;break;case Us.MEDIUM:e.edgeDetectionThreshold=.1,t.orthogonalSearchSteps=8,t.diagonalDetection=!1,t.cornerDetection=!1;break;case Us.HIGH:e.edgeDetectionThreshold=.1,t.orthogonalSearchSteps=16,t.diagonalSearchSteps=8,t.cornerRounding=25,t.diagonalDetection=!0,t.cornerDetection=!0;break;case Us.ULTRA:e.edgeDetectionThreshold=.05,t.orthogonalSearchSteps=32,t.diagonalSearchSteps=16,t.cornerRounding=25,t.diagonalDetection=!0,t.cornerDetection=!0;break}}setDepthTexture(i,e=hi){this.edgeDetectionMaterial.depthBuffer=i,this.edgeDetectionMaterial.depthPacking=e}update(i,e,t){this.clearPass.render(i,this.renderTargetEdges),this.edgeDetectionPass.render(i,e,this.renderTargetEdges),this.weightsPass.render(i,this.renderTargetEdges,this.renderTargetWeights)}setSize(i,e){this.edgeDetectionMaterial.setSize(i,e),this.weightsMaterial.setSize(i,e),this.renderTargetEdges.setSize(i,e),this.renderTargetWeights.setSize(i,e)}dispose(){const{searchTexture:i,areaTexture:e}=this.weightsMaterial;i!==null&&e!==null&&(i.dispose(),e.dispose()),super.dispose()}static get searchImageDataURL(){return kh}static get areaImageDataURL(){return Gh}},oM=`uniform float offset;uniform float darkness;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){const vec2 center=vec2(0.5);vec3 color=inputColor.rgb;
#if VIGNETTE_TECHNIQUE == 0
float d=distance(uv,center);color*=smoothstep(0.8,offset*0.799,d*(darkness+offset));
#else
vec2 coord=(uv-center)*vec2(offset);color=mix(color,vec3(1.0-darkness),dot(coord,coord));
#endif
outputColor=vec4(color,inputColor.a);}`,lM=class extends $i{constructor({blendFunction:i,technique:e=Xa.DEFAULT,eskil:t=!1,offset:n=.5,darkness:r=.5}={}){super("VignetteEffect",oM,{blendFunction:i,defines:new Map([["VIGNETTE_TECHNIQUE",e.toFixed(0)]]),uniforms:new Map([["offset",new X(n)],["darkness",new X(r)]])})}get technique(){return Number(this.defines.get("VIGNETTE_TECHNIQUE"))}set technique(i){this.technique!==i&&(this.defines.set("VIGNETTE_TECHNIQUE",i.toFixed(0)),this.setChanged())}get eskil(){return this.technique===Xa.ESKIL}set eskil(i){this.technique=i?Xa.ESKIL:Xa.DEFAULT}getTechnique(){return this.technique}setTechnique(i){this.technique=i}get offset(){return this.uniforms.get("offset").value}set offset(i){this.uniforms.get("offset").value=i}getOffset(){return this.offset}setOffset(i){this.offset=i}get darkness(){return this.uniforms.get("darkness").value}set darkness(i){this.uniforms.get("darkness").value=i}getDarkness(){return this.darkness}setDarkness(i){this.darkness=i}},cM=class extends Ji{load(i,e=()=>{},t=()=>{},n=null){const r=this.manager,s=new fc,a=new ls(s);return a.setPath(this.path),a.setResponseType("text"),new Promise((o,l)=>{s.onError=c=>{r.itemError(c),n!==null?(n(`Failed to load ${c}`),o()):l(`Failed to load ${c}`)},r.itemStart(i),a.load(i,c=>{try{const u=this.parse(c);r.itemEnd(i),e(u),o(u)}catch(u){console.error(u),s.onError(i)}},t)})}parse(i){const e=/^[\d ]+$/m,t=/^([\d.e+-]+) +([\d.e+-]+) +([\d.e+-]+) *$/gm;let n=e.exec(i);if(n===null)throw new Error("Missing grid information");const r=n[0].trim().split(/\s+/g).map(p=>Number(p)),s=r[1]-r[0],a=r.length,o=a**2;for(let p=1,g=r.length;p<g;++p)if(s!==r[p]-r[p-1])throw new Error("Inconsistent grid size");const l=new Float32Array(a**3*4);let c=0,u=0;for(;(n=t.exec(i))!==null;){const p=Number(n[1]),g=Number(n[2]),m=Number(n[3]);c=Math.max(c,p,g,m);const f=u%a,x=Math.floor(u/a)%a,A=Math.floor(u/o)%a,v=(f*o+x*a+A)*4;l[v+0]=p,l[v+1]=g,l[v+2]=m,l[v+3]=1,++u}const h=Math.ceil(Math.log2(c)),d=Math.pow(2,h);for(let p=0,g=l.length;p<g;p+=4)l[p+0]/=d,l[p+1]/=d,l[p+2]/=d;return new Zs(l,a)}};const uM=new URL("assets/pole_comp.901c5eb4.glb",location.href).href,hM=new URL("assets/road_comp.ae29df9a.glb",location.href).href,Hh=new mi,xl=new vo,wl=new xo,Mi={None:null,Color:"color",Default:"default",GroundProjection:"gp"},Ya={None:null,HDRI:"hdri"};class xf{constructor(e,t){this.scene=e,this.preset=Object.values(Zn)[0],this.environmentType=Ya.None,this.backgroundType=Mi.GroundProjection,this.gpRadius=10,this.gpHeight=1,this.bgColor=new Ie("#ffffff"),this.sunEnabled,this.sunPivot,this.sunLight,this.sunPos=new I(1,1,1),this.sunColor=new Ie("#ffffff"),this.shadowFloorEnabled,this.shadowFloor,this.shadowOpacity=1,this.envTexture,this.bgTexture,this.groundProjectedEnv,this.envCache={},this.bgCache={},this.addGui(t)}init(){this.sunEnabled&&!this.sunPivot&&(this.sunPivot=new Mn,this.sunPivot.name="sun_pivot",this.sunLight=new da(16777195,1),this.sunLight.name="sun",this.sunLight.color=this.sunColor,this.sunLight.castShadow=!0,this.sunLight.shadow.camera.near=.1,this.sunLight.shadow.camera.far=50,this.sunLight.shadow.camera.right=15,this.sunLight.shadow.camera.left=-15,this.sunLight.shadow.camera.top=15,this.sunLight.shadow.camera.bottom=-15,this.sunLight.shadow.mapSize.width=1024,this.sunLight.shadow.mapSize.height=1024,this.sunLight.shadow.radius=1.95,this.sunLight.shadow.blurSamples=6,sunLight.shadow.bias=-5e-4,this.sunPivot.add(sunLight)),this.shadowFloorEnabled&&!this.shadowFloor&&(this.shadowFloor=new me(new br(10,10).rotateX(-Math.PI/2),new Fd({opacity:this.shadowOpacity})),this.shadowFloor.name="shadow_floor",this.shadowFloor.receiveShadow=!0,this.shadowFloor.position.set(0,.001,0))}setEnvType(e){this.environmentType=Ya[e]}setBGType(e){this.backgroundType=Mi[e]}useFullFloat(){xl.setDataType(it),wl.setDataType(it)}addGui(e){e.add(this,"preset",Zn).onChange(t=>{this.preset=t,this.updateAll()}),e.add(this,"environment",Ya).onChange(()=>{this.updateAll()}),e.add(this,"background",Mi).onChange(()=>{this.updateAll()}),e.addColor(this,"bgColor").onChange(()=>{})}async updateAll(){var t;const e=this.preset;if(this.init(),await Promise.all([this.downloadEnvironment(e),this.downloadBackground(e)]),this.scene.environment=this.envTexture,this.bgTexture||(this.scene.background=null,this.backgroundType===Mi.Color&&(this.scene.background=this.bgColor)),this.backgroundType===Mi.GroundProjection&&this.bgTexture)this.scene.background=null,this.groundProjectedEnv||(this.groundProjectedEnv=new pa(this.bgTexture),this.groundProjectedEnv.scale.setScalar(100)),e.groundProj.radius&&(this.gpRadius=e.groundProj.radius),e.groundProj.height&&(this.gpHeight=e.groundProj.height),this.groundProjectedEnv.material.uniforms.map.value=this.bgTexture,this.groundProjectedEnv.radius=this.gpRadius,this.groundProjectedEnv.height=this.gpHeight,this.scene.add(this.groundProjectedEnv);else switch((t=this.groundProjectedEnv)!=null&&t.parent&&this.groundProjectedEnv.removeFromParent(),this.backgroundType){case Mi.Default:{this.scene.background=this.bgTexture;break}case Mi.Color:{this.scene.background=this.bgColor;break}default:{this.scene.background=null;break}}}async downloadEnvironment({exr:e,hdr:t}={}){console.log("download env");const n=e||t;if(this.environmentType===Ya.None){this.envTexture=null;return}let r=this.envCache[n];r||(r=e?await xl.loadAsync(n):await wl.loadAsync(n),this.envCache[n]=r,r.mapping=xn),this.envTexture=r}async downloadBackground({webP:e,avif:t}={}){console.log("download bg");const n=e||t;if(!(this.backgroundType===Mi.Default||this.backgroundType===Mi.GroundProjection)){this.bgTexture=null;return}if(n){let r=this.bgCache[n];r||(r=await Hh.loadAsync(n),this.bgCache[n]=r,r.mapping=xn,r.encoding=Ne),this.bgTexture=r}}async setupEnvironment(){loadEnv(this.environmentType)}async loadEnv(e){if(!e){scene.background=null,scene.environment=null;return}if(e.exr){const t=await xl.loadAsync(e.exr);t.mapping=xn,scene.environment=t,env=t,console.log("exr loaded")}if(e.hdr){const t=await wl.loadAsync(e.hdr);t.mapping=xn,scene.environment=t,bg=t,console.log("exr loaded")}if(e.webP||e.avif){const t=await Hh.loadAsync(e.webP||e.avif);t.mapping=xn,t.encoding=Ne,scene.background=t,console.log("bg loaded"),params.groundProjection&&loadGroundProj(params.environment)}e.sunPos?(sunLight.visible=!0,sunLight.position.fromArray(e.sunPos)):sunLight.visible=!1,e.sunColor?sunLight.color.set(e.sunColor):sunLight.color.set(16777215)}}let Yl,ln,Ks,fr,jt,ri,Si,vr,Vh=new ge;Zn.kloppenheim,new Ie;const _o=new Mn;new mi;const Ao=new vs,wf=new xs;let sr;wf.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");Ao.setDRACOLoader(wf);new gs;let yf=()=>{},yl;async function dM(i){vr=i,yl=vr.addFolder("Scene"),Yl=new cs,app.appendChild(Yl.dom),ln=new Ki({powerPreference:"high-performance",antialias:!1,stencil:!1,depth:!1}),ln.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),ln.setSize(window.innerWidth,window.innerHeight),ln.shadowMap.enabled=!0,ln.shadowMap.type=Ci,ln.outputEncoding=Ne,ln.toneMapping=hs,app.appendChild(ln.domElement),jt=new Tt(50,window.innerWidth/window.innerHeight,.1,200),jt.position.set(5,2,5),jt.name="Camera",ri=new Ri,ri.add(_o),Ks=new pf(ln,{multisampling:4}),Ks.addPass(new ts(ri,jt)),fr=new iM(ri,jt,{luminanceThreshold:0,luminanceSmoothing:0,intensity:90,mipmapBlur:!0}),fr.ignoreBackground=!0,fr.mipmapBlurPass.radius=.3,fr.mipmapBlurPass.levels=4;const e=new lr(jt,fr);Ks.addPass(e),Si=new ws(jt,ln.domElement),Si.enableDamping=!0,Si.dampingFactor=.05,Si.minDistance=.1,Si.maxDistance=100,Si.maxPolarAngle=Math.PI/1.5,Si.target.set(0,0,0),sr=new ma(jt,ln.domElement),sr.addEventListener("dragging-changed",a=>{Si.enabled=!a.value,a.value}),sr.addEventListener("change",()=>{sr.object&&sr.object.position.y<0&&(sr.object.position.y=0)}),ri.add(sr),ri.fog=new cc(0,.1),window.addEventListener("resize",fM),document.addEventListener("pointermove",Wh);let t=Date.now();app.addEventListener("pointerdown",()=>{t=Date.now()}),app.addEventListener("pointerup",a=>{Date.now()-t<200&&Wh(a)});const n=new xf(ri,yl);n.preset=Zn.kloppenheim,n.setEnvType("HDRI"),n.setBGType("Color"),n.bgColor.set(0),n.updateAll(),await mM();const r={int:.15};function s(){ri.traverse(a=>{a.material&&a.material.envMapIntensity!==void 0&&(a.material.envMapIntensity=r.int,a.material.type==="MeshPhysicalMaterial"&&console.log(a.material))})}s(),yl.add(r,"int",0,1).onChange(s),_f()}function fM(){jt.aspect=window.innerWidth/window.innerHeight,jt.updateProjectionMatrix(),Ks.setSize(window.innerWidth,window.innerHeight)}function pM(){Yl.update(),xc(),yf(),Si.update(),Ks.render()}function _f(){requestAnimationFrame(_f),pM()}function Wh(i){Vh.x=i.clientX/window.innerWidth*2-1,Vh.y=-(i.clientY/window.innerHeight)*2+1}async function mM(){await xM(),ln.compile(ri,jt)}const ro=(i,e,t)=>{const n=new Wt(e,t,i,128,64,!0);return n.translate(0,-i/2,0),n.rotateX(-Math.PI/2),n},cr=(i,e,t)=>{e.material.attenuation=i.distance;let n=Math.tan(i.angle)*i.distance;e.geometry=ro(i.distance,t,n)};new Ie;function gM({size:i,frames:e=1/0}={}){const t=ln,n=new I;t.getSize(n);const r=i||n.x,s=i||n.y;console.log("depth tex res",r,s);const a=new Sr(r,s);a.format=li,a.type=ca,a.name="Depth_Buffer";let o=0;const l=vM(r,s,{depthTexture:a}),c=()=>{(e===1/0||o<e)&&(t.setRenderTarget(l),t.render(ri,jt),t.setRenderTarget(null),o++)};return[l.depthTexture,c]}function vM(i,e,t){const n=ln,r=i,s=e,a=t,{samples:o=0,depth:l,...c}=a;let u;return u=new ut(r,s,{minFilter:Fe,magFilter:Fe,encoding:n.outputEncoding,type:yt,...c}),u.samples=o,u}async function xM(){const i=[],e={speed:10,useDepth:!1,depthResolution:1024},[t,n,r]=await Promise.all([yM(),wM(i),_M(i)]),s=new I;window.onresize=()=>{e.useDepth&&ln.getSize(s)};let a=()=>{};function o(){if(e.useDepth){const h=gM({size:e.depthResolution});let d;for(const p of i)d=p.depth,p.depth=h[0],p.resolution=ln.getSize(s);a=h[1],d&&d.dispose()}else for(const h of i)h.depth=null,h.resolution.set(0,0)}vr.add(e,"useDepth").onChange(o),vr.add(e,"depthResolution",128,1024,128).onChange(o),vr.add(e,"speed",.1,20).onChange();const l=new mc(!0);let c,u;yf=()=>{if(u=l.getDelta()*e.speed,t(u),n(u),r(u),e.useDepth){for(const h of i)c=h.depth,h.depth=null;a();for(const h of i)h.depth=c}}}async function wM(i){const t=(await Ao.loadAsync(ga)).scene;t.name="car",t.traverse(y=>{y.isMesh&&(y.selectOnRaycast=t,y.material.transparent||(y.castShadow=!0,y.receiveShadow=!0))}),_o.add(t);const n={FL:t.getObjectByName("wheel_L"),FR:t.getObjectByName("wheel_R"),R:t.getObjectByName("wheels_rear"),body:t.getObjectByName("body"),steerL:t.getObjectByName("steer_L"),steerR:t.getObjectByName("steer_R"),steerVal:0,emit:t.getObjectByName("emit"),lights:t.getObjectByName("lights"),wheenSpinMultiplier:1.8};n.emit.material=new Yt,n.emit.material.color.set(0),n.emit.material.emissive.set("#ffbb73"),n.lights.material.emissiveIntensity=3;const r={distance:8},s=new aa;s.intensity=5,s.color.set("#ffbb73"),s.angle=Xt.degToRad(20),s.penumbra=.2,s.distance=r.distance;const a=s.clone();t.add(s,a),t.add(s.target,a.target),s.position.set(-.66,.66,2),s.target.position.set(-.66,.25,10),a.position.set(.66,.66,2),a.target.position.set(.66,.25,10);let o=.08;const l=new no;l.opacity=1,l.lightColor=s.color,l.attenuation=r.distance,l.anglePower=5,l.cameraNear=jt.near,l.cameraFar=jt.far;const c=new no;c.opacity=1,c.lightColor=a.color,c.attenuation=r.distance,c.anglePower=l.anglePower,c.cameraNear=jt.near,c.cameraFar=jt.far,i.push(l,c);const u=new me(ro(r.distance,o,.5),l),h=new me(ro(r.distance,o,.5),c);s.add(u),a.add(h);const d=new I;u.lookAt(s.target.position),h.lookAt(a.target.position),cr(s,u,o),cr(a,h,o);const p=new aa(16711680,.05);p.penumbra=1,p.position.set(.62,.64,-2),p.target.position.set(.62,0,-4);const g=p.clone();g.position.set(-.62,.64,-2),g.target.position.set(-.62,0,-4),t.add(p,p.target,g,g.target);function m(y){const b=y.addFolder("Headlights Volume");b.add(l,"opacity",0,2).onChange(U=>{c.opacity=U}),b.add(l,"anglePower",0,15).onChange(U=>{c.anglePower=U});const D=y.addFolder("HeadLight");D.addColor(s,"color").onChange(()=>{a.color.copy(s.color)}),D.add(s,"intensity",0,5).onChange(()=>{a.intensity=s.intensity}),D.add(s,"angle",0,Math.PI/2).onChange(()=>{a.angle=s.angle,cr(s,u,o),cr(a,h,o)}),D.add(s,"penumbra",0,1).onChange(()=>{a.penumbra=s.penumbra}),D.add(r,"distance",.1,20).onChange(U=>{s.distance=U,a.distance=U,cr(s,u,o),cr(a,h,o)})}m(vr);const f=Xt.degToRad(15),x=Xt.degToRad(5),A=.25;function v(){const y=Xt.mapLinear(n.steerVal,-1,1,-f,f);n.steerL.rotation.y=y,n.steerR.rotation.y=y,n.body.rotation.z=Xt.mapLinear(n.steerVal,-1,1,-x,x)}const _=new qs(n).to({steerVal:0}).duration(1e3).easing(Pi.Elastic.Out).onStart(()=>{_._valuesStart.steerVal=n.steerVal}).onUpdate(()=>{v()});let M=!0;const T=new qs(n).to({steerVal:1}).duration(1e3).easing(Pi.Back.Out).delay(1e3).onStart(()=>{T.delay(Xt.randInt(100,4e3)),M?(T.to({steerVal:1}),P.to({x:A})):(T.to({steerVal:-1}),P.to({x:-A})),M=!M,T._valuesStart.steerVal=n.steerVal,P.start()}).onUpdate(()=>{v()});T.chain(_),_.chain(T),setTimeout(()=>{T.start()},2e3);const P=new qs(t.position).to({x:0}).duration(2e3).easing(Pi.Quadratic.InOut).onStart(()=>{P._valuesStart.x=t.position.x});return fr.selection.add(n.emit),y=>{l.spotPosition.copy(u.getWorldPosition(d)),c.spotPosition.copy(h.getWorldPosition(d)),n.FL.rotation.x+=y*n.wheenSpinMultiplier,n.FR.rotation.x+=y*n.wheenSpinMultiplier,n.R.rotation.x+=y*n.wheenSpinMultiplier}}async function yM(){const e=(await Ao.loadAsync(hM)).scene;e.name="road",e.traverse(a=>{a.isMesh&&(a.selectOnRaycast=e,a.castShadow=!0,a.receiveShadow=!0)});const t=8,n=12,r=t*n,s=[];for(let a=0;a<t;a++){const o=e.clone();o.position.z=a*n-r/2,_o.add(o),s.push(o)}return a=>{s.forEach(o=>{o.position.z-=a,o.position.z<-r/2&&(o.position.z+=r)})}}async function _M(i){const e=new I,t=.1,r=(await Ao.loadAsync(uM)).scene;r.name="pole",r.traverse(u=>{u.isMesh&&(u.selectOnRaycast=r,u.castShadow=!0,u.receiveShadow=!0)}),r.position.set(-6,0,0),r.rotation.y=Math.PI/2;const s=r.getObjectByName("emit");s.material=new Yt,s.material.color.set(0),s.material.emissive.set("#ffbb73"),s.castShadow=!1,s.receiveShadow=!1;const a=[],o=[],l={gap:15},c=vr.addFolder("Street Lamps");c.add(l,"gap",10,30,1).onChange(()=>{for(let u=0;u<a.length;u++){const h=a[u];h.position.z=u*l.gap,console.log(u,h.position.z)}}),fr.selection.add(s);for(let u=0;u<4;u++){const h=r.clone();a.push(h),h.position.z=u*l.gap;const d=new aa;d.intensity=100,d.angle=Xt.degToRad(30),d.penumbra=.5,d.distance=12,d.position.set(0,7.2,1.8),d.target.position.set(0,0,7),d.castShadow=!0,d.shadow.bias=-1e-4;const p=new no;i.push(p),p.opacity=.5,p.lightColor=d.color,p.anglePower=5,p.cameraNear=jt.near,p.cameraFar=jt.far;const g=new me(ro(d.distance,t,.5),p);d.add(g),cr(d,g,t),g.lookAt(d.target.getWorldPosition(e)),o.push(g);const m=c.addFolder("lamp "+u);m.add(d.shadow,"bias",-1e-4,1e-4).onChange(()=>{}),m.add(p,"opacity",0,2),m.add(p,"attenuation",0,d.distance),m.add(p,"anglePower",0,15),m.add(p,"cameraNear",0,10),m.add(p,"cameraFar",0,10),h.add(d,d.target),_o.add(h)}for(let u=0;u<a.length;u++){const h=a[u];o[u].material.spotPosition.copy(h.getWorldPosition(e)),o[u].lookAt(o[u].parent.target.getWorldPosition(e))}return u=>{for(let h=0;h<a.length;h++){const d=a[h];d.position.z-=u,d.position.z<-l.gap/2*a.length&&(d.position.z+=l.gap*a.length),o[h].material.spotPosition.copy(o[h].getWorldPosition(e))}}}const Mo=i=>{const e=[i],t=[];for(;e.length!==0;){const n=e.shift();n.material&&t.push(n);for(const r of n.children)r.visible&&e.push(r)}return t},Wr=(i,e,t,n,r)=>{r?e[t]!==i[t]&&(i[t]=e[t],i.uniforms[t].value=e[t],e[t]?(i.defines[n]="",n==="USE_NORMALMAP"&&(i.defines.TANGENTSPACE_NORMALMAP="")):delete i.defines[n],i.needsUpdate=!0):i[t]!==void 0&&(i[t]=void 0,i.uniforms[t].value=void 0,delete i.defines[n],i.needsUpdate=!0)},AM=i=>{const{width:e,height:t}=i.image;return Math.floor(Math.log2(Math.max(e,t)))+1},Af=i=>{let e=i.material.uniforms.prevBoneTexture.value;if(e&&e.image.width===i.skeleton.boneTexture.width)e=i.material.uniforms.prevBoneTexture.value,e.image.data.set(i.skeleton.boneTexture.image.data);else{var t;(t=e)==null||t.dispose();const n=i.skeleton.boneTexture.image.data.slice(),r=i.skeleton.boneTexture.image.width;e=new gr(n,r,r,Ft,it),i.material.uniforms.prevBoneTexture.value=e,e.needsUpdate=!0}},MM=(i,e)=>{var t;(t=i.skeleton)!=null&&t.boneTexture&&(i.material.uniforms.boneTexture.value=i.skeleton.boneTexture,"USE_SKINNING"in i.material.defines||(i.material.defines.USE_SKINNING="",i.material.defines.BONE_TEXTURE="",i.material.needsUpdate=!0)),i.modelViewMatrix.multiplyMatrices(e.matrixWorldInverse,i.matrixWorld),i.material.uniforms.velocityMatrix.value.multiplyMatrices(e.projectionMatrix,i.modelViewMatrix)},bM=(i,e)=>{var t;i.material.uniforms.prevVelocityMatrix.value.multiplyMatrices(e.projectionMatrix,i.modelViewMatrix),(t=i.skeleton)!=null&&t.boneTexture&&Af(i)},SM=()=>{if(We.envmap_physical_pars_fragment.includes("iblRadianceDisabled")||(We.envmap_physical_pars_fragment=We.envmap_physical_pars_fragment.replace("vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {",`
		uniform bool iblRadianceDisabled;
	
		vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		 if(iblRadianceDisabled) return vec3(0.);
		`)),"iblRadianceDisabled"in un.physical.uniforms)return un.physical.uniforms.iblRadianceDisabled;const i={value:!1};un.physical.uniforms.iblRadianceDisabled=i;const{clone:e}=yr;return yr.clone=t=>{const n=e(t);return"iblRadianceDisabled"in t&&(n.iblRadianceDisabled=i),n},i},TM=()=>{if(We.envmap_physical_pars_fragment.includes("iblIrradianceDisabled")||(We.envmap_physical_pars_fragment=We.envmap_physical_pars_fragment.replace("vec3 getIBLIrradiance( const in vec3 normal ) {",`
			uniform bool iblIrradianceDisabled;
		
			vec3 getIBLIrradiance( const in vec3 normal ) {
			 if(iblIrradianceDisabled) return vec3(0.);
			`)),"iblIrradianceDisabled"in un.physical.uniforms)return un.physical.uniforms.iblIrradianceDisabled;const i={value:!1};un.physical.uniforms.iblIrradianceDisabled=i;const{clone:e}=yr;return yr.clone=t=>{const n=e(t);return"iblIrradianceDisabled"in t&&(n.iblIrradianceDisabled=i),n},i},EM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yc(i){return i.replace(EM,CM)}function CM(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}const Mf=i=>i instanceof pa,_c=(i,e=i.material)=>e.visible&&e.depthWrite&&e.depthTest&&(!e.transparent||e.opacity>0)&&!Mf(i),bf=(i,e)=>{const t=["vertexTangent","vertexColors","vertexAlphas","vertexUvs","uvsVertexOnly","supportsVertexTextures","instancing","instancingColor","side","flatShading","skinning","doubleSided","flipSided"];for(const n of t)e[n]=i[n]};var bo=`#define GLSLIFY 1
varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}`;class DM extends Gt{constructor(e=1){super("CopyPass"),this.needsSwap=!1,this.renderTarget=new wr(1,1,1,{depthBuffer:!1}),this.setTextureCount(e)}setTextureCount(e){var t;let n="",r="";for(let s=0;s<e;s++)n+=`
				uniform sampler2D inputTexture${s};
				layout(location = ${s}) out vec4 gOutput${s};
			`,r+=`gOutput${s} = textureLod(inputTexture${s}, vUv, 0.);`;(t=this.fullscreenMaterial)==null||t.dispose(),this.fullscreenMaterial=new _t({fragmentShader:`
            varying vec2 vUv;
			
			${n}

            void main() {
				${r}
            }
            `,vertexShader:bo,glslVersion:Qi});for(let s=0;s<e;s++)if(this.fullscreenMaterial.uniforms["inputTexture"+s]=new X(null),s>=this.renderTarget.texture.length){const a=this.renderTarget.texture[0].clone();a.isRenderTargetTexture=!0,this.renderTarget.texture.push(a)}}setSize(e,t){this.renderTarget.setSize(e,t)}render(e){e.setRenderTarget(this.renderTarget),e.render(this.scene,this.camera)}}var PM=`#define GLSLIFY 1
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
}`,RM=`#define GLSLIFY 1
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
vec3 lastWorldPos=screenSpaceToWorldSpace(dilatedReprojectedUv,dilatedLastDepth,prevCameraMatrixWorld,prevProjectionMatrixInverse);float worldDistFactor=clamp((50.0+distance(dilatedWorldPos,cameraPos))/100.,0.25,1.);if(worldDistanceDisocclusionCheck(dilatedWorldPos,lastWorldPos,worldDistFactor))return false;return!planeDistanceDisocclusionCheck(dilatedWorldPos,lastWorldPos,worldNormal,worldDistFactor);}vec2 reprojectHitPoint(const vec3 rayOrig,const float rayLength,const float depth){vec3 cameraRay=normalize(rayOrig-cameraPos);float cameraRayLength=distance(rayOrig,cameraPos);vec3 parallaxHitPoint=cameraPos+cameraRay*(cameraRayLength+rayLength);vec4 reprojectedParallaxHitPoint=prevViewMatrix*vec4(parallaxHitPoint,1.0);vec2 hitPointUv=viewSpaceToScreenSpace(reprojectedParallaxHitPoint.xyz,prevProjectionMatrix);return hitPointUv;}vec2 getReprojectedUV(const bool neighborhoodClamp,const bool neighborhoodClampDisocclusionTest,const float depth,const vec3 worldPos,const vec3 worldNormal,const float rayLength){if(rayLength!=0.0){vec2 reprojectedUv=reprojectHitPoint(worldPos,rayLength,depth);if(validateReprojectedUV(reprojectedUv,neighborhoodClamp,neighborhoodClampDisocclusionTest,depth,worldPos,worldNormal)){return reprojectedUv;}return vec2(-1.);}vec2 reprojectedUv=vUv-velocityTexel.rg;if(validateReprojectedUV(reprojectedUv,neighborhoodClamp,neighborhoodClampDisocclusionTest,depth,worldPos,worldNormal)){return reprojectedUv;}return vec2(-1.);}vec4 SampleTextureCatmullRom(const sampler2D tex,const vec2 uv,const vec2 texSize){vec2 samplePos=uv*texSize;vec2 texPos1=floor(samplePos-0.5f)+0.5f;vec2 f=samplePos-texPos1;vec2 w0=f*(-0.5f+f*(1.0f-0.5f*f));vec2 w1=1.0f+f*f*(-2.5f+1.5f*f);vec2 w2=f*(0.5f+f*(2.0f-1.5f*f));vec2 w3=f*f*(-0.5f+0.5f*f);vec2 w12=w1+w2;vec2 offset12=w2/(w1+w2);vec2 texPos0=texPos1-1.;vec2 texPos3=texPos1+2.;vec2 texPos12=texPos1+offset12;texPos0/=texSize;texPos3/=texSize;texPos12/=texSize;vec4 result=vec4(0.0);result+=textureLod(tex,vec2(texPos0.x,texPos0.y),0.0f)*w0.x*w0.y;result+=textureLod(tex,vec2(texPos12.x,texPos0.y),0.0f)*w12.x*w0.y;result+=textureLod(tex,vec2(texPos3.x,texPos0.y),0.0f)*w3.x*w0.y;result+=textureLod(tex,vec2(texPos0.x,texPos12.y),0.0f)*w0.x*w12.y;result+=textureLod(tex,vec2(texPos12.x,texPos12.y),0.0f)*w12.x*w12.y;result+=textureLod(tex,vec2(texPos3.x,texPos12.y),0.0f)*w3.x*w12.y;result+=textureLod(tex,vec2(texPos0.x,texPos3.y),0.0f)*w0.x*w3.y;result+=textureLod(tex,vec2(texPos12.x,texPos3.y),0.0f)*w12.x*w3.y;result+=textureLod(tex,vec2(texPos3.x,texPos3.y),0.0f)*w3.x*w3.y;result=max(result,vec4(0.));return result;}vec4 getTexel(const sampler2D tex,vec2 p){p=p/invTexSize+0.5;vec2 i=floor(p);vec2 f=p-i;f=f*f*f*(f*(f*6.0-15.0)+10.0);p=i+f;p=(p-0.5)*invTexSize;return textureLod(tex,p,0.0);}vec4 sampleReprojectedTexture(const sampler2D tex,const vec2 reprojectedUv,const bool useCatmullRom){if(useCatmullRom){return SampleTextureCatmullRom(tex,reprojectedUv,1.0/invTexSize);}return textureLod(tex,reprojectedUv,0.);}vec3 Decode(vec2 f){f=f*2.0-1.0;vec3 n=vec3(f.x,f.y,1.0-abs(f.x)-abs(f.y));float t=max(-n.z,0.0);n.x+=n.x>=0.0 ?-t : t;n.y+=n.y>=0.0 ?-t : t;return normalize(n);}`;class IM extends _t{constructor(e=1,t=""){let n=PM.replace("#include <reproject>",RM);typeof t=="string"&&(n=n.replace("customComposeShader",t));let r="";for(let l=0;l<e;l++)r+=`
				uniform sampler2D inputTexture${l};
				uniform sampler2D accumulatedTexture${l};

				layout(location = ${l}) out vec4 gOutput${l};
			`;n=r+n.replaceAll("textureCount",e),n=yc(n);const s=n.matchAll(/inputTexture\[\s*[0-9]+\s*]/g);for(const[l]of s){const c=l.replace(/[^0-9]/g,"");n=n.replace(l,"inputTexture"+c)}const a=n.matchAll(/accumulatedTexture\[\s*[0-9]+\s*]/g);for(const[l]of a){const c=l.replace(/[^0-9]/g,"");n=n.replace(l,"accumulatedTexture"+c)}const o=n.matchAll(/gOutput\[\s*[0-9]+\s*]/g);for(const[l]of o){const c=l.replace(/[^0-9]/g,"");n=n.replace(l,"gOutput"+c)}super({type:"TemporalReprojectMaterial",uniforms:{velocityTexture:new X(null),depthTexture:new X(null),lastDepthTexture:new X(null),blend:new X(0),constantBlend:new X(!1),fullAccumulate:new X(!1),reset:new X(!1),delta:new X(0),invTexSize:new X(new ge),projectionMatrix:new X(new ze),projectionMatrixInverse:new X(new ze),cameraMatrixWorld:new X(new ze),viewMatrix:new X(new ze),prevViewMatrix:new X(new ze),prevCameraMatrixWorld:new X(new ze),prevProjectionMatrix:new X(new ze),prevProjectionMatrixInverse:new X(new ze),cameraPos:new X(new I)},vertexShader:bo,fragmentShader:n,toneMapped:!1,glslVersion:Qi});for(let l=0;l<e;l++)this.uniforms["inputTexture"+l]=new X(null),this.uniforms["accumulatedTexture"+l]=new X(null);typeof t=="string"&&(this.defines.useCustomComposeShader="")}}const ql=1.324717957244746,LM=1/ql,BM=1/(ql*ql),jh=1.1127756842787055,UM=i=>{const e=[];for(let t=0;t<i;t++)e.push([(jh+LM*t)%1,(jh+BM*t)%1]);return e},Xh={blend:.9,dilation:!1,constantBlend:!1,fullAccumulate:!1,catmullRomSampling:!0,neighborhoodClamping:!1,neighborhoodClampingDisocclusionTest:!1,logTransform:!1,depthDistance:.25,worldDistance:.375,reprojectSpecular:!1,customComposeShader:null,renderTarget:null},Yh=new ze,qh=new ze;class Sf extends Gt{constructor(e,t,n,r=1,s=Xh){super("TemporalReprojectPass"),this.needsSwap=!1,this.clock=new mc,this.r2Sequence=[],this.pointsIndex=0,this.lastCameraTransform={position:new I,quaternion:new Pt},this._scene=e,this._camera=t,this.textureCount=r,s={...Xh,...s},this.renderTarget=new wr(1,1,r,{minFilter:Fe,magFilter:Fe,type:yt,depthBuffer:!1}),this.fullscreenMaterial=new IM(r,s.customComposeShader),this.fullscreenMaterial.defines.textureCount=r,s.dilation&&(this.fullscreenMaterial.defines.dilation=""),s.neighborhoodClamping&&(this.fullscreenMaterial.defines.neighborhoodClamping=""),s.logTransform&&(this.fullscreenMaterial.defines.logTransform=""),this.fullscreenMaterial.defines.depthDistance=s.depthDistance.toPrecision(5),this.fullscreenMaterial.defines.worldDistance=s.worldDistance.toPrecision(5),this.fullscreenMaterial.uniforms.blend.value=s.blend,this.fullscreenMaterial.uniforms.constantBlend.value=s.constantBlend,this.fullscreenMaterial.uniforms.fullAccumulate.value=s.fullAccumulate,this.fullscreenMaterial.uniforms.projectionMatrix.value=t.projectionMatrix.clone(),this.fullscreenMaterial.uniforms.projectionMatrixInverse.value=t.projectionMatrixInverse.clone(),this.fullscreenMaterial.uniforms.cameraMatrixWorld.value=t.matrixWorld,this.fullscreenMaterial.uniforms.viewMatrix.value=t.matrixWorldInverse,this.fullscreenMaterial.uniforms.cameraPos.value=t.position,this.fullscreenMaterial.uniforms.prevViewMatrix.value=t.matrixWorldInverse.clone(),this.fullscreenMaterial.uniforms.prevCameraMatrixWorld.value=t.matrixWorld.clone(),this.fullscreenMaterial.uniforms.prevProjectionMatrix.value=t.projectionMatrix.clone(),this.fullscreenMaterial.uniforms.prevProjectionMatrixInverse.value=t.projectionMatrixInverse.clone(),this.copyPass=new DM(r);for(let a=0;a<r;a++){const o=this.copyPass.renderTarget.texture[a];o.type=yt,o.minFilter=Fe,o.magFilter=Fe,o.needsUpdate=!0}this.fullscreenMaterial.uniforms.velocityTexture.value=n.texture,this.fullscreenMaterial.uniforms.depthTexture.value=n.depthTexture,typeof s.reprojectSpecular=="boolean"&&(s.reprojectSpecular=Array(r).fill(s.reprojectSpecular)),this.fullscreenMaterial.defines.reprojectSpecular=`bool[](${s.reprojectSpecular.join(", ")})`,typeof s.catmullRomSampling=="boolean"&&(s.catmullRomSampling=Array(r).fill(s.catmullRomSampling)),this.fullscreenMaterial.defines.catmullRomSampling=`bool[](${s.catmullRomSampling.join(", ")})`,typeof s.neighborhoodClamping=="boolean"&&(s.neighborhoodClamping=Array(r).fill(s.neighborhoodClamping)),this.fullscreenMaterial.defines.neighborhoodClamping=`bool[](${s.neighborhoodClamping.join(", ")})`,typeof s.neighborhoodClampingDisocclusionTest=="boolean"&&(s.neighborhoodClampingDisocclusionTest=Array(r).fill(s.neighborhoodClampingDisocclusionTest)),this.fullscreenMaterial.defines.neighborhoodClampingDisocclusionTest=`bool[](${s.neighborhoodClampingDisocclusionTest.join(", ")})`,this.options=s,this.velocityDepthNormalPass=n}dispose(){super.dispose(),this.renderTarget.dispose(),this.copyPass.dispose(),this.fullscreenMaterial.dispose()}setSize(e,t){this.renderTarget.setSize(e,t),this.copyPass.setSize(e,t),this.fullscreenMaterial.uniforms.invTexSize.value.set(1/e,1/t)}get texture(){return this.renderTarget.texture[0]}reset(){this.fullscreenMaterial.uniforms.reset.value=!0}render(e){const t=Math.min(.1,this.clock.getDelta());this.fullscreenMaterial.uniforms.delta.value=t,Yh.copy(this._camera.projectionMatrix),qh.copy(this._camera.projectionMatrixInverse),this._camera.view&&(this._camera.view.enabled=!1),this._camera.updateProjectionMatrix(),this.fullscreenMaterial.uniforms.projectionMatrix.value.copy(this._camera.projectionMatrix),this.fullscreenMaterial.uniforms.projectionMatrixInverse.value.copy(this._camera.projectionMatrixInverse),this.fullscreenMaterial.uniforms.lastDepthTexture.value=this.velocityDepthNormalPass.lastDepthTexture,this._camera.view&&(this._camera.view.enabled=!0),this._camera.projectionMatrix.copy(Yh),this._camera.projectionMatrixInverse.copy(qh),e.setRenderTarget(this.renderTarget),e.render(this.scene,this.camera),this.fullscreenMaterial.uniforms.reset.value=!1;for(let n=0;n<this.textureCount;n++)this.copyPass.fullscreenMaterial.uniforms["inputTexture"+n].value=this.renderTarget.texture[n],this.fullscreenMaterial.uniforms["accumulatedTexture"+n].value=this.copyPass.renderTarget.texture[n];this.copyPass.render(e),this.fullscreenMaterial.uniforms.prevCameraMatrixWorld.value.copy(this._camera.matrixWorld),this.fullscreenMaterial.uniforms.prevViewMatrix.value.copy(this._camera.matrixWorldInverse),this.fullscreenMaterial.uniforms.prevProjectionMatrix.value.copy(this.fullscreenMaterial.uniforms.projectionMatrix.value),this.fullscreenMaterial.uniforms.prevProjectionMatrixInverse.value.copy(this.fullscreenMaterial.uniforms.projectionMatrixInverse.value)}jitter(e=1){this.unjitter(),this.r2Sequence.length===0&&(this.r2Sequence=UM(256).map(([a,o])=>[a-.5,o-.5])),this.pointsIndex=(this.pointsIndex+1)%this.r2Sequence.length;const[t,n]=this.r2Sequence[this.pointsIndex],{width:r,height:s}=this.renderTarget;this._camera.setViewOffset&&this._camera.setViewOffset(r,s,t*e,n*e,r,s)}unjitter(){this._camera.clearViewOffset&&this._camera.clearViewOffset()}}var NM=`#define GLSLIFY 1
uniform sampler2D inputTexture;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 accumulatedTexel=textureLod(inputTexture,vUv,0.);outputColor=vec4(accumulatedTexel.rgb,1.);}`;const Ql={blend:.7,constantBlend:!0,dilation:!0,catmullRomSampling:!0,logTransform:!0,depthDistance:10,worldDistance:5,neighborhoodClamping:!0,neighborhoodClampingDisocclusionTest:!0};class Tf extends $i{constructor(e,t,n,r=Ql){super("TRAAEffect",NM,{type:"FinalTRAAEffectMaterial",uniforms:new Map([["inputTexture",new X(null)]])}),this._scene=e,this._camera=t,r={...Ql,...r},this.temporalReprojectPass=new Sf(e,t,n,1,r),this.uniforms.get("inputTexture").value=this.temporalReprojectPass.texture,this.setSize(r.width,r.height)}setSize(e,t){this.temporalReprojectPass.setSize(e,t)}dispose(){super.dispose(),this.temporalReprojectPass.dispose()}update(e,t){this.temporalReprojectPass.unjitter(),this.unjitteredProjectionMatrix=this._camera.projectionMatrix.clone(),this._camera.projectionMatrix.copy(this.unjitteredProjectionMatrix);const n=Mo(this._scene).filter(r=>Mf(r));for(const r of n){const s=e.properties.get(r.material);if(!(s!=null&&s.programs))continue;const a=Array.from(s.programs.values())[0].getUniforms();if(!a._patchedProjectionMatrix){const o=a.setValue.bind(a);a._oldSetValue=o,a.setValue=(l,c,u,...h)=>{c==="projectionMatrix"&&(u=this.unjitteredProjectionMatrix),o(l,c,u,...h)},a._patchedProjectionMatrix=!0}cancelAnimationFrame(a._destroyPatchRAF),cancelAnimationFrame(a._destroyPatchRAF2),a._destroyPatchRAF=requestAnimationFrame(()=>{a._destroyPatchRAF2=requestAnimationFrame(()=>{a.setValue=a._oldSetValue,delete a._oldSetValue,delete a._patchedProjectionMatrix})})}this.temporalReprojectPass.fullscreenMaterial.uniforms.inputTexture0.value=t.texture,this.temporalReprojectPass.jitter(),this.temporalReprojectPass.render(e)}}Tf.DefaultOptions=Ql;var FM=`#define GLSLIFY 1
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
}`;const _l={moment:!0,depth:!0,normal:!0,roughness:!0,diffuse:!0,roughnessDependent:!1,basicVariance:5e-4},OM=[["moment","","useMoment"],["depth","depthPhi","useDepth"],["normal","normalPhi","useNormal"],["roughness","roughnessPhi","useRoughness"]];class zM extends Gt{constructor(e,t=[],n="",r="",s=_l){super("DenoisePass"),this.iterations=1,s={..._l,...s};let a="";const o="";let l="";this.textures=t;for(let d=0;d<this.textures.length;d++)a+=`layout(location = ${d}) out vec4 gTexture${d};
`,a+=`uniform sampler2D texture${d};
`,l+=`gTexture${d} = vec4(denoisedColor[${d}], sumVariance[${d}]);
`;let c=a+FM.replace("#include <customComposeShaderFunctions>",r).replace("#include <customComposeShader>",n).replace("#include <finalOutputShader>",o).replace("#include <outputShader>",l).replaceAll("textureCount",this.textures.length).replaceAll("momentTextureCount",Math.min(this.textures.length,2));c=yc(c);const u=c.matchAll(/texture\[\s*[0-9]+\s*]/g);for(const[d]of u){const p=d.replace(/[^0-9]/g,"");c=c.replace(d,"texture"+p)}s={..._l,...s},this.fullscreenMaterial=new _t({fragmentShader:c,vertexShader:bo,uniforms:{depthTexture:new X(null),normalTexture:new X(null),momentTexture:new X(null),invTexSize:new X(new ge),horizontal:new X(!0),blurHorizontal:new X(!0),denoiseKernel:new X(1),denoiseDiffuse:new X(1),denoise:new X([0]),depthPhi:new X(1),normalPhi:new X(1),roughnessPhi:new X(1),stepSize:new X(1),isFirstIteration:new X(!1),isLastIteration:new X(!1),viewMatrix:new X(e.matrixWorldInverse),projectionMatrix:new X(e.projectionMatrix),cameraMatrixWorld:new X(e.matrixWorld),projectionMatrixInverse:new X(e.projectionMatrixInverse)},glslVersion:Qi});const h={type:yt,depthBuffer:!1};this.renderTargetA=new wr(1,1,this.textures.length,h),this.renderTargetB=new wr(1,1,this.textures.length,h);for(let d=0;d<this.textures.length;d++)this.fullscreenMaterial.uniforms["texture"+d]=new X(t[d]);typeof s.roughnessDependent=="boolean"&&(s.roughnessDependent=Array(t.length).fill(s.roughnessDependent)),this.fullscreenMaterial.defines.roughnessDependent=`bool[](${s.roughnessDependent.join(", ")})`,typeof s.basicVariance=="number"&&(s.basicVariance=Array(t.length).fill(s.basicVariance)),this.fullscreenMaterial.defines.basicVariance=`float[](${s.basicVariance.map(d=>d.toPrecision(5)).join(", ")})`,this.options=s}setSize(e,t){this.renderTargetA.setSize(e,t),this.renderTargetB.setSize(e,t),this.fullscreenMaterial.uniforms.invTexSize.value.set(1/e,1/t)}dispose(){super.dispose(),this.renderTargetA.dispose(),this.renderTargetB.dispose()}keepEdgeStoppingDefinesUpdated(){for(const[t,n,r]of OM){var e;const s=this.options[t]&&(n===""||((e=this.fullscreenMaterial.uniforms[n])==null?void 0:e.value)>.001);s!==r in this.fullscreenMaterial.defines&&(s?this.fullscreenMaterial.defines[r]="":delete this.fullscreenMaterial.defines[r],this.fullscreenMaterial.needsUpdate=!0)}}render(e){this.keepEdgeStoppingDefinesUpdated();const t=this.fullscreenMaterial.uniforms.denoiseKernel.value;if(this.iterations>0)for(let n=0;n<2*this.iterations;n++){const r=n%2===0,s=2**~~(n/2),o=parseInt(Math.log2(s))%2==0;this.fullscreenMaterial.uniforms.horizontal.value=r,this.fullscreenMaterial.uniforms.blurHorizontal.value=o,this.fullscreenMaterial.uniforms.stepSize.value=s,this.fullscreenMaterial.uniforms.isFirstIteration.value=n===0,this.fullscreenMaterial.uniforms.isLastIteration.value=n===2*this.iterations-1;const l=r?this.renderTargetA:this.renderTargetB;for(let c=0;c<this.textures.length;c++)this.fullscreenMaterial.uniforms["texture"+c].value=r?n===0?this.textures[c]:this.renderTargetB.texture[c]:this.renderTargetA.texture[c];e.setRenderTarget(l),e.render(this.scene,this.camera)}else this.fullscreenMaterial.uniforms.denoiseKernel.value=0,e.setRenderTarget(this.renderTargetB),e.render(this.scene,this.camera),this.fullscreenMaterial.uniforms.denoiseKernel.value=t;for(let n=0;n<this.textures.length;n++)this.fullscreenMaterial.uniforms["texture"+n].value=this.textures[n]}get texture(){return this.renderTargetB.texture[0]}}var kM=`#define GLSLIFY 1
vec4 moment,historyMoment;bool lastReprojectedUvSpecular,isReprojectedUvSpecular;
#pragma unroll_loop_start
for(int i=0;i<momentTextureCount;i++){isReprojectedUvSpecular=reprojectSpecular[i]&&inputTexel[i].a!=0.0&&reprojectedUvSpecular[i].x>=0.0;reprojectedUv=isReprojectedUvSpecular ? reprojectedUvSpecular[i]: reprojectedUvDiffuse;if(i==0){historyMoment=SampleTextureCatmullRom(lastMomentTexture,reprojectedUv,1.0/invTexSize);}else if(lastReprojectedUvSpecular!=isReprojectedUvSpecular){historyMoment.ba=SampleTextureCatmullRom(lastMomentTexture,reprojectedUv,1.0/invTexSize).ba;}lastReprojectedUvSpecular=isReprojectedUvSpecular;}
#pragma unroll_loop_end
if(reprojectedUvDiffuse.x>=0.0||reprojectedUvSpecular[0].x>=0.0){moment.r=luminance(gOutput[0].rgb);moment.g=moment.r*moment.r;
#if textureCount > 1
moment.b=luminance(gOutput[1].rgb);moment.a=moment.b*moment.b;
#endif
}else{moment.rg=vec2(0.,100.);moment.ba=vec2(0.,100.);gMoment=moment;return;}float momentTemporalReprojectMix=max(fpsAdjustedBlend,0.8);gMoment=mix(moment,historyMoment,0.8);`;const Qh={fullAccumulate:!0,customComposeShader:kM};class GM extends Sf{constructor(e,t,n,r=1,s=Qh){s={...Qh,...s},super(e,t,n,r,s),this.momentTexture=this.renderTarget.texture[0].clone(),this.momentTexture.isRenderTargetTexture=!0,this.momentTexture.type=it,this.momentTexture.minFilter=Ke,this.momentTexture.magFilter=Ke,this.momentTexture.needsUpdate=!0,this.renderTarget.texture.push(this.momentTexture);const a=`
		layout(location = ${r}) out vec4 gMoment;

		uniform sampler2D lastMomentTexture;
		`;this.fullscreenMaterial.fragmentShader=a+this.fullscreenMaterial.fragmentShader,this.fullscreenMaterial.uniforms={...this.fullscreenMaterial.uniforms,lastMomentTexture:new X(null)};const o=r+1;this.copyPass.setTextureCount(o),this.copyPass.fullscreenMaterial.uniforms["inputTexture"+(o-1)].value=this.momentTexture;const l=this.copyPass.renderTarget.texture[o-1];l.type=it,l.minFilter=Fe,l.magFilter=Fe,l.needsUpdate=!0,this.fullscreenMaterial.uniforms.lastMomentTexture.value=l,this.fullscreenMaterial.defines.momentTextureCount=Math.min(2,r)}}class HM{constructor(e,t,n,r=1,s="",a="",o={}){this.svgfTemporalReprojectPass=new GM(e,t,n,r,o);const l=this.svgfTemporalReprojectPass.renderTarget.texture.slice(0,r);this.denoisePass=new zM(t,l,s,a,o),this.denoisePass.fullscreenMaterial.uniforms.momentTexture.value=this.svgfTemporalReprojectPass.momentTexture,this.setNonJitteredDepthTexture(n.depthTexture)}get texture(){return this.denoisePass.texture}setGBuffers(e,t){this.setJitteredGBuffers(e,t),this.setNonJitteredGBuffers(e,t)}setJitteredGBuffers(e,t){this.denoisePass.fullscreenMaterial.uniforms.depthTexture.value=e,this.denoisePass.fullscreenMaterial.uniforms.normalTexture.value=t}setNonJitteredDepthTexture(e){this.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.depthTexture.value=e}setVelocityTexture(e){this.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.velocityTexture.value=e}setSize(e,t){this.denoisePass.setSize(e,t),this.svgfTemporalReprojectPass.setSize(e,t)}dispose(){this.denoisePass.dispose(),this.svgfTemporalReprojectPass.dispose()}render(e){this.svgfTemporalReprojectPass.render(e),this.denoisePass.render(e)}}class VM extends _t{constructor(){super({type:"MRTMaterial",defines:{USE_UV:"",TEMPORAL_RESOLVE:""},uniforms:{color:new X(new Ie),emissive:new X(new Ie),map:new X(null),roughnessMap:new X(null),metalnessMap:new X(null),emissiveMap:new X(null),alphaMap:new X(null),normalMap:new X(null),normalScale:new X(new ge(1,1)),roughness:new X(0),metalness:new X(0),emissiveIntensity:new X(0),uvTransform:new X(new rn),boneTexture:new X(null),blueNoiseTexture:new X(null),blueNoiseRepeat:new X(new ge(1,1)),texSize:new X(new ge(1,1)),frame:new X(0)},vertexShader:`
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
            `,glslVersion:Qi,toneMapped:!1,alphaTest:!1,fog:!1,lights:!1}),this.normalMapType=nc,this.normalScale=new ge(1,1)}}var WM=`#define GLSLIFY 1
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
}`,jM=`#define GLSLIFY 1
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
vec2 equirectDirectionToUv(const vec3 direction){vec2 uv=vec2(atan(direction.z,direction.x),acos(direction.y));uv/=vec2(2.0*M_PI,M_PI);uv.x+=0.5;uv.y=1.0-uv.y;return uv;}vec3 equirectUvToDirection(vec2 uv){uv.x-=0.5;uv.y=1.0-uv.y;float theta=uv.x*2.0*PI;float phi=uv.y*PI;float sinPhi=sin(phi);return vec3(sinPhi*cos(theta),cos(phi),sinPhi*sin(theta));}vec3 sampleEquirectEnvMapColor(const vec3 direction,const sampler2D map,const float lod){return getTexel(map,equirectDirectionToUv(direction),lod).rgb;}mat3 getBasisFromNormal(const vec3 normal){vec3 other;if(abs(normal.x)>0.5){other=vec3(0.0,1.0,0.0);}else{other=vec3(1.0,0.0,0.0);}vec3 ortho=normalize(cross(normal,other));vec3 ortho2=normalize(cross(normal,ortho));return mat3(ortho2,ortho,normal);}vec3 F_Schlick(const vec3 f0,const float theta){return f0+(1.-f0)*pow(1.0-theta,5.);}float F_Schlick(const float f0,const float f90,const float theta){return f0+(f90-f0)*pow(1.0-theta,5.0);}float D_GTR(const float roughness,const float NoH,const float k){float a2=pow(roughness,2.);return a2/(PI*pow((NoH*NoH)*(a2*a2-1.)+1.,k));}float SmithG(const float NDotV,const float alphaG){float a=alphaG*alphaG;float b=NDotV*NDotV;return(2.0*NDotV)/(NDotV+sqrt(a+b-a*b));}float GGXVNDFPdf(const float NoH,const float NoV,const float roughness){float D=D_GTR(roughness,NoH,2.);float G1=SmithG(NoV,roughness*roughness);return(D*G1)/max(0.00001,4.0f*NoV);}float GeometryTerm(const float NoL,const float NoV,const float roughness){float a2=roughness*roughness;float G1=SmithG(NoV,a2);float G2=SmithG(NoL,a2);return G1*G2;}float evalDisneyDiffuse(const float NoL,const float NoV,const float LoH,const float roughness,const float metalness){float FD90=0.5+2.*roughness*pow(LoH,2.);float a=F_Schlick(1.,FD90,NoL);float b=F_Schlick(1.,FD90,NoV);return(a*b/PI)*(1.-metalness);}vec3 evalDisneySpecular(const float roughness,const float NoH,const float NoV,const float NoL){float D=D_GTR(roughness,NoH,2.);float G=GeometryTerm(NoL,NoV,pow(0.5+roughness*.5,2.));vec3 spec=vec3(D*G/(4.*NoL*NoV));return spec;}vec3 SampleGGXVNDF(const vec3 V,const float ax,const float ay,const float r1,const float r2){vec3 Vh=normalize(vec3(ax*V.x,ay*V.y,V.z));float lensq=Vh.x*Vh.x+Vh.y*Vh.y;vec3 T1=lensq>0. ? vec3(-Vh.y,Vh.x,0.)*inversesqrt(lensq): vec3(1.,0.,0.);vec3 T2=cross(Vh,T1);float r=sqrt(r1);float phi=2.0*PI*r2;float t1=r*cos(phi);float t2=r*sin(phi);float s=0.5*(1.0+Vh.z);t2=(1.0-s)*sqrt(1.0-t1*t1)+s*t2;vec3 Nh=t1*T1+t2*T2+sqrt(max(0.0,1.0-t1*t1-t2*t2))*Vh;return normalize(vec3(ax*Nh.x,ay*Nh.y,max(0.0,Nh.z)));}void Onb(const vec3 N,inout vec3 T,inout vec3 B){vec3 up=abs(N.z)<0.9999999 ? vec3(0,0,1): vec3(1,0,0);T=normalize(cross(up,N));B=cross(N,T);}vec3 ToLocal(const vec3 X,const vec3 Y,const vec3 Z,const vec3 V){return vec3(dot(V,X),dot(V,Y),dot(V,Z));}vec3 ToWorld(const vec3 X,const vec3 Y,const vec3 Z,const vec3 V){return V.x*X+V.y*Y+V.z*Z;}vec3 cosineSampleHemisphere(const vec3 n,const vec2 u){float r=sqrt(u.x);float theta=2.0*PI*u.y;vec3 b=normalize(cross(n,vec3(0.0,1.0,1.0)));vec3 t=cross(b,n);return normalize(r*sin(theta)*b+sqrt(1.0-u.x)*n+r*cos(theta)*t);}float equirectDirectionPdf(vec3 direction){vec2 uv=equirectDirectionToUv(direction);float theta=uv.y*PI;float sinTheta=sin(theta);if(sinTheta==0.0){return 0.0;}return 1.0/(2.0*PI*PI*sinTheta);}float sampleEquirectProbability(EquirectHdrInfo info,vec2 r,out vec3 direction){float v=textureLod(info.marginalWeights,vec2(r.x,0.0),0.).x;float u=textureLod(info.conditionalWeights,vec2(r.y,v),0.).x;vec2 uv=vec2(u,v);vec3 derivedDirection=equirectUvToDirection(uv);direction=derivedDirection;vec3 color=texture(info.map,uv).rgb;float totalSum=info.totalSumWhole+info.totalSumDecimal;float lum=luminance(color);float pdf=lum/totalSum;return info.size.x*info.size.y*pdf;}float misHeuristic(float a,float b){float aa=a*a;float bb=b*b;return aa/(aa+bb);}const float g=1.6180339887498948482;const float a1=1.0/g;float r1(float n){return fract(1.1127756842787055+a1*n);}const vec4 hn=vec4(0.618033988749895,0.3247179572447458,0.2207440846057596,0.1673039782614187);vec4 sampleBlueNoise(int seed){vec2 size=vUv*texSize;vec2 blueNoiseSize=texSize/blueNoiseRepeat;float blueNoiseIndex=floor(floor(size.y/blueNoiseSize.y)*blueNoiseRepeat.x)+floor(size.x/blueNoiseSize.x);int blueNoiseTileOffset=int(r1(blueNoiseIndex+1.0)*65536.);vec2 blueNoiseUv=vUv*blueNoiseRepeat;vec4 blueNoise=textureLod(blueNoiseTexture,blueNoiseUv,0.);blueNoise=fract(blueNoise+hn*float(seed+blueNoiseTileOffset));blueNoise.r=(blueNoise.r>0.5 ? 1.0-blueNoise.r : blueNoise.r)*2.0;blueNoise.g=(blueNoise.g>0.5 ? 1.0-blueNoise.g : blueNoise.g)*2.0;blueNoise.b=(blueNoise.b>0.5 ? 1.0-blueNoise.b : blueNoise.b)*2.0;blueNoise.a=(blueNoise.a>0.5 ? 1.0-blueNoise.a : blueNoise.a)*2.0;return blueNoise;}float getCurvature(const vec3 n,const float depth){vec3 dx=dFdx(n);vec3 dy=dFdy(n);vec3 xneg=n-dx;vec3 xpos=n+dx;vec3 yneg=n-dy;vec3 ypos=n+dy;float curvature=(cross(xneg,xpos).y-cross(yneg,ypos).x)*4.0/depth;return curvature;}`;const XM=({data:{width:i,height:e,isFloatType:t,flipY:n,data:r}})=>{const s=a();function a(){const g=new ArrayBuffer(4),m=new Float32Array(g),f=new Uint32Array(g),x=new Uint32Array(512),A=new Uint32Array(512);for(let T=0;T<256;++T){const P=T-127;P<-27?(x[T]=0,x[T|256]=32768,A[T]=24,A[T|256]=24):P<-14?(x[T]=1024>>-P-14,x[T|256]=1024>>-P-14|32768,A[T]=-P-1,A[T|256]=-P-1):P<=15?(x[T]=P+15<<10,x[T|256]=P+15<<10|32768,A[T]=13,A[T|256]=13):P<128?(x[T]=31744,x[T|256]=64512,A[T]=24,A[T|256]=24):(x[T]=31744,x[T|256]=64512,A[T]=13,A[T|256]=13)}const v=new Uint32Array(2048),_=new Uint32Array(64),M=new Uint32Array(64);for(let T=1;T<1024;++T){let P=T<<13,y=0;for(;!(P&8388608);)P<<=1,y-=8388608;P&=-8388609,y+=947912704,v[T]=P|y}for(let T=1024;T<2048;++T)v[T]=939524096+(T-1024<<13);for(let T=1;T<31;++T)_[T]=T<<23;_[31]=1199570944,_[32]=2147483648;for(let T=33;T<63;++T)_[T]=2147483648+(T-32<<23);_[63]=3347054592;for(let T=1;T<64;++T)T!==32&&(M[T]=1024);return{floatView:m,uint32View:f,baseTable:x,shiftTable:A,mantissaTable:v,exponentTable:_,offsetTable:M}}function o(g){const m=g>>10;return s.uint32View[0]=s.mantissaTable[s.offsetTable[m]+(g&1023)]+s.exponentTable[m],s.floatView[0]}function l(g,m,f){return .2126*g+.7152*m+.0722*f}const c=(g,m,f=0,x=g.length)=>{let A=f,v=f+x-1;for(;A<v;){const _=A+v>>1;g[_]<m?A=_+1:v=_}return A-f},u=(g,m,f,x,A,v)=>{if(x)for(let D=0,U=f-1;D<=U;D++)for(let W=0,N=m*4;W<N;W+=4){const F=U-D,V=D*N+W,J=F*N+W;g[J]=g[V],g[J+1]=g[V+1],g[J+2]=g[V+2],g[J+3]=g[V+3]}const _=new Float32Array(m*f),M=new Float32Array(m*f),T=new Float32Array(f),P=new Float32Array(f);let y=0,b=0;for(let D=0;D<f;D++){let U=0;for(let W=0;W<m;W++){const N=D*m+W,F=g[4*N+0],V=g[4*N+1],J=g[4*N+2],ne=l(F,V,J);U+=ne,y+=ne,_[N]=ne,M[N]=U}if(U!==0)for(let W=D*m,N=D*m+m;W<N;W++)_[W]/=U,M[W]/=U;b+=U,T[D]=U,P[D]=b}if(b!==0)for(let D=0,U=T.length;D<U;D++)T[D]/=b,P[D]/=b;for(let D=0;D<f;D++){const U=(D+1)/f,W=c(P,U);A[D]=(W+.5)/f}for(let D=0;D<f;D++)for(let U=0;U<m;U++){const W=D*m+U,N=(U+1)/m,F=c(M,N,D*m,m);v[W]=(F+.5)/m}return y};if(!t)for(const g in r)r[g]=o(r[g]);const h=new Float32Array(e),d=new Float32Array(i*e),p=u(r,i,e,n,h,d);postMessage(t?{totalSumValue:p,marginalDataArray:h,conditionalDataArray:d}:{data:r,totalSumValue:p,marginalDataArray:h,conditionalDataArray:d})},YM=new Blob(["onmessage = "+XM],{type:"application/javascript"}),qM=URL.createObjectURL(YM);class QM{constructor(){const e=new gr(new Float32Array([1,1,1,1]),1,1);e.type=it,e.format=Ft,e.minFilter=Fe,e.magFilter=Fe,e.wrapS=hn,e.wrapT=hn,e.generateMipmaps=!1,e.needsUpdate=!0;const t=new gr(new Float32Array([0,1]),1,2);t.type=it,t.format=eo,t.minFilter=Fe,t.magFilter=Fe,t.generateMipmaps=!1,t.needsUpdate=!0;const n=new gr(new Float32Array([0,0,1,1]),2,2);n.type=it,n.format=eo,n.minFilter=Fe,n.magFilter=Fe,n.generateMipmaps=!1,n.needsUpdate=!0,this.map=e,this.marginalWeights=t,this.conditionalWeights=n,this.totalSumWhole=1,this.totalSumDecimal=0,this.size=new ge}dispose(){this.marginalWeights.dispose(),this.conditionalWeights.dispose(),this.map.dispose()}updateFrom(e){this.mapUuid=e.uuid,e=e.clone();const{width:t,height:n,data:r}=e.image,{type:s}=e;return this.size.set(t,n),new Promise(a=>{var o;(o=this.worker)==null||o.terminate(),this.worker=new Worker(qM),this.worker.postMessage({width:t,height:n,isFloatType:s===it,flipY:e.flipY,data:r}),this.worker.onmessage=({data:{data:l,totalSumValue:c,marginalDataArray:u,conditionalDataArray:h}})=>{this.dispose();const{marginalWeights:d,conditionalWeights:p}=this;d.image={width:n,height:1,data:u},d.needsUpdate=!0,p.image={width:t,height:n,data:h},p.needsUpdate=!0;const g=~~c,m=c-g;this.totalSumWhole=g,this.totalSumDecimal=m,l&&(e.image.data=l,e.type=it),this.map=e,this.worker=null,a()}})}}class ZM extends _t{constructor(){super({type:"SSGIMaterial",uniforms:{directLightTexture:new X(null),accumulatedTexture:new X(null),normalTexture:new X(null),depthTexture:new X(null),diffuseTexture:new X(null),emissiveTexture:new X(null),velocityTexture:new X(null),blueNoiseTexture:new X(null),backSideDepthTexture:new X(null),projectionMatrix:new X(new ze),inverseProjectionMatrix:new X(new ze),cameraMatrixWorld:new X(new ze),viewMatrix:new X(new ze),cameraNear:new X(0),cameraFar:new X(0),rayDistance:new X(0),thickness:new X(0),r3Offset:new X(new I),frame:new X(0),envBlur:new X(0),maxRoughness:new X(0),maxEnvMapMipLevel:new X(0),maxEnvLuminance:new X(0),envMapInfo:{value:new QM},envMapPosition:new X(new I),envMapSize:new X(new I),viewMatrix:new X(new ze),texSize:new X(new ge),blueNoiseRepeat:new X(new ge),cameraPos:new X(new I)},defines:{steps:20,refineSteps:5,spp:1,directLightMultiplier:1,CUBEUV_TEXEL_WIDTH:0,CUBEUV_TEXEL_HEIGHT:0,CUBEUV_MAX_MIP:0,vWorldPosition:"worldPos"},fragmentShader:WM.replace("#include <utils>",jM),vertexShader:bo,toneMapped:!1,depthWrite:!1,depthTest:!1,glslVersion:Qi})}}const KM=new Ie(0),JM=new lc({depthPacking:lo,side:Ot});class $M extends Gt{constructor(e,t){super("BackSideDepthPass"),this._scene=e,this._camera=t,this.renderTarget=new ut(1,1,{minFilter:Ke,magFilter:Ke})}setSize(e,t){this.renderTarget.setSize(e,t)}dispose(){super.dispose(),this.renderTarget.dispose()}render(e){const{background:t}=this._scene;this._scene.background=KM,this._scene.overrideMaterial=JM,e.setRenderTarget(this.renderTarget),e.render(this._scene,this._camera),this._scene.background=t,this._scene.overrideMaterial=null}}var eb="data:image/png;base64,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",Ef=eb;const tb=new Ie(0);class nb extends Gt{constructor(e,t){super("SSGIPass"),this.needsSwap=!1,this.defaultFragmentShader="",this.frame=0,this.cachedMaterials=new WeakMap,this.visibleMeshes=[],this.ssgiEffect=e,this._scene=e._scene,this._camera=e._camera,this.fullscreenMaterial=new ZM,this.defaultFragmentShader=this.fullscreenMaterial.fragmentShader;const n=!t.diffuseOnly&&!t.specularOnly?2:1;this.renderTarget=new wr(1,1,n,{type:yt,depthBuffer:!1}),this.fullscreenMaterial.uniforms.cameraMatrixWorld.value=this._camera.matrixWorld,this.fullscreenMaterial.uniforms.viewMatrix.value=this._camera.matrixWorldInverse,this.fullscreenMaterial.uniforms.projectionMatrix.value=this._camera.projectionMatrix,this.fullscreenMaterial.uniforms.inverseProjectionMatrix.value=this._camera.projectionMatrixInverse,this.fullscreenMaterial.uniforms.cameraPos.value=this._camera.position,e._camera.isPerspectiveCamera&&(this.fullscreenMaterial.defines.PERSPECTIVE_CAMERA=""),t.diffuseOnly&&(this.fullscreenMaterial.defines.diffuseOnly=""),t.specularOnly&&(this.fullscreenMaterial.defines.specularOnly=""),this.initMRTRenderTarget()}initialize(e,...t){super.initialize(e,...t),new mi().load(Ef,n=>{n.minFilter=Ke,n.magFilter=Ke,n.wrapS=hn,n.wrapT=hn,n.encoding=dn,this.fullscreenMaterial.uniforms.blueNoiseTexture.value=n})}get texture(){return this.renderTarget.texture[0]}get specularTexture(){const e="specularOnly"in this.fullscreenMaterial.defines?0:1;return this.renderTarget.texture[e]}initMRTRenderTarget(){this.gBuffersRenderTarget=new wr(1,1,4,{minFilter:Ke,magFilter:Ke}),this.gBuffersRenderTarget.depthTexture=new Sr(1,1),this.gBuffersRenderTarget.depthTexture.type=it,this.backSideDepthPass=new $M(this._scene,this._camera),this.depthTexture=this.gBuffersRenderTarget.texture[0],this.normalTexture=this.gBuffersRenderTarget.texture[1],this.diffuseTexture=this.gBuffersRenderTarget.texture[2],this.emissiveTexture=this.gBuffersRenderTarget.texture[3],this.diffuseTexture.minFilter=Fe,this.diffuseTexture.magFilter=Fe,this.diffuseTexture.encoding=Ne,this.diffuseTexture.needsUpdate=!0,this.emissiveTexture.minFilter=Fe,this.emissiveTexture.magFilter=Fe,this.emissiveTexture.type=yt,this.emissiveTexture.needsUpdate=!0,this.normalTexture.type=yt,this.normalTexture.needsUpdate=!0,this.fullscreenMaterial.uniforms.normalTexture.value=this.normalTexture,this.fullscreenMaterial.uniforms.depthTexture.value=this.depthTexture,this.fullscreenMaterial.uniforms.diffuseTexture.value=this.diffuseTexture,this.fullscreenMaterial.uniforms.emissiveTexture.value=this.emissiveTexture,this.fullscreenMaterial.uniforms.backSideDepthTexture.value=this.backSideDepthPass.renderTarget.texture}setSize(e,t){this.renderTarget.setSize(e*this.ssgiEffect.resolutionScale,t*this.ssgiEffect.resolutionScale),this.gBuffersRenderTarget.setSize(e,t),this.backSideDepthPass.setSize(e,t),this.fullscreenMaterial.uniforms.texSize.value.set(this.renderTarget.width,this.renderTarget.height)}dispose(){super.dispose(),this.renderTarget.dispose(),this.gBuffersRenderTarget.dispose(),this.backSideDepthPass.dispose(),this.fullscreenMaterial.dispose(),this.normalTexture=null,this.depthTexture=null,this.diffuseTexture=null,this.emissiveTexture=null}setMRTMaterialInScene(){this.visibleMeshes=Mo(this._scene);for(const t of this.visibleMeshes){const n=t.material;let[r,s]=this.cachedMaterials.get(t)||[];if(n!==r){var e;s&&s.dispose(),s=new VM,bf(n,s),s.uniforms.normalScale.value=n.normalScale,(e=t.skeleton)!=null&&e.boneTexture&&(s.defines.USE_SKINNING="",s.defines.BONE_TEXTURE="",s.uniforms.boneTexture.value=t.skeleton.boneTexture,s.needsUpdate=!0),this.cachedMaterials.set(t,[n,s])}const a=Object.keys(n).find(c=>{const u=n[c];return u instanceof Ct&&u.matrix});a&&(s.uniforms.uvTransform.value=n[a].matrix),n.emissive&&(s.uniforms.emissive.value=n.emissive),n.color&&(s.uniforms.color.value=n.color),Wr(s,n,"normalMap","USE_NORMALMAP",!0),Wr(s,n,"roughnessMap","USE_ROUGHNESSMAP",!0),Wr(s,n,"metalnessMap","USE_	METALNESSMAP",!0),Wr(s,n,"map","USE_MAP",!0),Wr(s,n,"emissiveMap","USE_EMISSIVEMAP",!0),Wr(s,n,"alphaMap","USE_ALPHAMAP",!0);const o=this.fullscreenMaterial.uniforms.blueNoiseTexture.value;if(o){const{width:c,height:u}=o.source.data;s.uniforms.blueNoiseTexture.value=o,s.uniforms.blueNoiseRepeat.value.set(this.renderTarget.width/c,this.renderTarget.height/u)}s.uniforms.texSize.value.set(this.renderTarget.width,this.renderTarget.height),s.uniforms.frame.value=this.frame,t.visible=_c(t,n);const l=typeof n.roughness=="number"?n.roughness:1;s.uniforms.roughness.value=this.ssgiEffect.selection.size===0||this.ssgiEffect.selection.has(t)?l:1e11,s.uniforms.metalness.value=t.material.metalness||0,s.uniforms.emissiveIntensity.value=t.material.emissiveIntensity||0,t.material=s}}unsetMRTMaterialInScene(){for(const e of this.visibleMeshes){e.visible=!0;const[t]=this.cachedMaterials.get(e);e.material=t}}render(e){this.frame=(this.frame+this.ssgiEffect.spp)%65536;const{background:t}=this._scene;this._scene.background=tb,this.setMRTMaterialInScene(),e.setRenderTarget(this.gBuffersRenderTarget),e.render(this._scene,this._camera),this.unsetMRTMaterialInScene(),this.ssgiEffect.autoThickness&&this.backSideDepthPass.render(e),this.fullscreenMaterial.uniforms.frame.value=this.frame,this.fullscreenMaterial.uniforms.cameraNear.value=this._camera.near,this.fullscreenMaterial.uniforms.cameraFar.value=this._camera.far,this.fullscreenMaterial.uniforms.viewMatrix.value.copy(this._camera.matrixWorldInverse),this.fullscreenMaterial.uniforms.accumulatedTexture.value=this.ssgiEffect.svgf.denoisePass.texture;const n=this.fullscreenMaterial.uniforms.blueNoiseTexture.value;if(n){const{width:r,height:s}=n.source.data;this.fullscreenMaterial.uniforms.blueNoiseRepeat.value.set(this.renderTarget.width/r,this.renderTarget.height/s)}e.setRenderTarget(this.renderTarget),e.render(this.scene,this.camera),this._scene.background=t}}var ib=`#define GLSLIFY 1
uniform sampler2D inputTexture;uniform sampler2D sceneTexture;uniform sampler2D depthTexture;uniform int toneMapping;
#include <tonemapping_pars_fragment>
#pragma tonemapping_pars_fragment
void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 depthTexel=textureLod(depthTexture,uv,0.);vec3 ssgiClr;if(dot(depthTexel.rgb,depthTexel.rgb)==0.){ssgiClr=textureLod(sceneTexture,uv,0.).rgb;}else{ssgiClr=textureLod(inputTexture,uv,0.).rgb;switch(toneMapping){case 1:ssgiClr=LinearToneMapping(ssgiClr);break;case 2:ssgiClr=ReinhardToneMapping(ssgiClr);break;case 3:ssgiClr=OptimizedCineonToneMapping(ssgiClr);break;case 4:ssgiClr=ACESFilmicToneMapping(ssgiClr);break;case 5:ssgiClr=CustomToneMapping(ssgiClr);break;}ssgiClr*=toneMappingExposure;}outputColor=vec4(ssgiClr,1.0);}`,rb=`#define GLSLIFY 1
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
}`,sb=`#define GLSLIFY 1
uniform sampler2D diffuseTexture;uniform sampler2D directLightTexture;vec3 getViewPosition(const float depth){float clipW=projectionMatrix[2][3]*depth+projectionMatrix[3][3];vec4 clipPosition=vec4((vec3(vUv,depth)-0.5)*2.0,1.0);clipPosition*=clipW;return(projectionMatrixInverse*clipPosition).xyz;}vec3 F_Schlick(const vec3 f0,const float theta){return f0+(1.-f0)*pow(1.0-theta,5.);}vec3 SampleGGXVNDF(const vec3 V,const float ax,const float ay,const float r1,const float r2){vec3 Vh=normalize(vec3(ax*V.x,ay*V.y,V.z));float lensq=Vh.x*Vh.x+Vh.y*Vh.y;vec3 T1=lensq>0. ? vec3(-Vh.y,Vh.x,0.)*inversesqrt(lensq): vec3(1.,0.,0.);vec3 T2=cross(Vh,T1);float r=sqrt(r1);float phi=2.0*PI*r2;float t1=r*cos(phi);float t2=r*sin(phi);float s=0.5*(1.0+Vh.z);t2=(1.0-s)*sqrt(1.0-t1*t1)+s*t2;vec3 Nh=t1*T1+t2*T2+sqrt(max(0.0,1.0-t1*t1-t2*t2))*Vh;return normalize(vec3(ax*Nh.x,ay*Nh.y,max(0.0,Nh.z)));}void Onb(const vec3 N,inout vec3 T,inout vec3 B){vec3 up=abs(N.z)<0.9999999 ? vec3(0,0,1): vec3(1,0,0);T=normalize(cross(up,N));B=cross(N,T);}vec3 ToLocal(const vec3 X,const vec3 Y,const vec3 Z,const vec3 V){return vec3(dot(V,X),dot(V,Y),dot(V,Z));}vec3 ToWorld(const vec3 X,const vec3 Y,const vec3 Z,const vec3 V){return V.x*X+V.y*Y+V.z*Z;}`;const Zl={distance:10,thickness:10,autoThickness:!1,maxRoughness:1,blend:.9,denoiseIterations:1,denoiseKernel:2,denoiseDiffuse:10,denoiseSpecular:10,depthPhi:2,normalPhi:50,roughnessPhi:1,envBlur:.5,importanceSampling:!0,directLightMultiplier:1,maxEnvLuminance:50,steps:20,refineSteps:5,spp:1,resolutionScale:1,missedRays:!1},{render:Zh}=ts.prototype,Kh=TM(),Jh=SM();class so extends $i{constructor(e,t,n,r=Zl){r={...Zl,...r},super("SSGIEffect",ib,{type:"FinalSSGIMaterial",uniforms:new Map([["inputTexture",new X(null)],["sceneTexture",new X(null)],["depthTexture",new X(null)],["toneMapping",new X(qn)]])}),this.selection=new mf,this.isUsingRenderPass=!0,this._scene=e,this._camera=t;let s;r.diffuseOnly?(s="ssdgi",r.reprojectSpecular=!1,r.roughnessDependent=!1,r.basicVariance=25e-5,r.neighborhoodClamping=!1):r.specularOnly?(s="ssr",r.reprojectSpecular=!0,r.roughnessDependent=!0,r.basicVariance=25e-5,r.neighborhoodClamping=!0,r.neighborhoodClampingDisocclusionTest=!1):(s="ssgi",r.reprojectSpecular=[!1,!0],r.neighborhoodClamping=[!1,!0],r.neighborhoodClampingDisocclusionTest=!1,r.roughnessDependent=[!1,!0],r.basicVariance=[25e-5,25e-5]);const a=r.diffuseOnly||r.specularOnly?1:2;this.svgf=new HM(e,t,n,a,rb,sb,r),s==="ssgi"?this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.fragmentShader=this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.fragmentShader.replace("accumulatedTexel[ 1 ].rgb = clampedColor;",`
						float roughness = inputTexel[ 0 ].a;
						accumulatedTexel[ 1 ].rgb = mix(accumulatedTexel[ 1 ].rgb, clampedColor, 1. - sqrt(roughness));
						`):s==="ssr"&&(this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.fragmentShader=this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.fragmentShader.replace("accumulatedTexel[ 0 ].rgb = clampedColor;",`
					accumulatedTexel[ 0 ].rgb = mix(accumulatedTexel[ 0 ].rgb, clampedColor, 0.5);
					`)),this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.needsUpdate=!0,this.ssgiPass=new nb(this,r),r.diffuseOnly?this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.inputTexture0.value=this.ssgiPass.texture:r.specularOnly?this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.inputTexture0.value=this.ssgiPass.specularTexture:(this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.inputTexture0.value=this.ssgiPass.texture,this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.uniforms.inputTexture1.value=this.ssgiPass.specularTexture),this.svgf.setJitteredGBuffers(this.ssgiPass.depthTexture,this.ssgiPass.normalTexture),this.svgf.denoisePass.fullscreenMaterial.uniforms={...this.svgf.denoisePass.fullscreenMaterial.uniforms,diffuseTexture:new X(null),directLightTexture:new X(null)},this.svgf.denoisePass.fullscreenMaterial.defines[s]="",this.ssgiPass.fullscreenMaterial.defines.directLightMultiplier=r.directLightMultiplier.toPrecision(5),this.svgf.denoisePass.fullscreenMaterial.uniforms.diffuseTexture.value=this.ssgiPass.diffuseTexture,this.lastSize={width:r.width,height:r.height,resolutionScale:r.resolutionScale},this.sceneRenderTarget=new ut(1,1,{encoding:Ne}),this.renderPass=new ts(this._scene,this._camera),this.renderPass.renderToScreen=!1,this.setSize(r.width,r.height);const o=this,l=this.renderPass;ts.prototype.render=function(...c){if(this!==l){const u=o.isUsingRenderPass;o.isUsingRenderPass=!0,u!=o.isUsingRenderPass&&o.updateUsingRenderPass()}Zh.call(this,...c)},this.makeOptionsReactive(r)}updateUsingRenderPass(){this.isUsingRenderPass?(this.ssgiPass.fullscreenMaterial.defines.useDirectLight="",this.svgf.denoisePass.fullscreenMaterial.defines.useDirectLight=""):(delete this.ssgiPass.fullscreenMaterial.defines.useDirectLight,delete this.svgf.denoisePass.fullscreenMaterial.defines.useDirectLight),this.ssgiPass.fullscreenMaterial.needsUpdate=!0,this.svgf.denoisePass.fullscreenMaterial.needsUpdate=!0}makeOptionsReactive(e){let t=!1;const n=this.ssgiPass.fullscreenMaterial.uniforms,r=Object.keys(n),s=this.svgf.svgfTemporalReprojectPass;for(const a of Object.keys(e))Object.defineProperty(this,a,{get(){return e[a]},set(o){if(!(e[a]===o&&t))switch(e[a]=o,a){case"denoiseIterations":this.svgf.denoisePass.iterations=o;break;case"denoiseDiffuse":this.svgf.denoisePass.fullscreenMaterial.uniforms.denoise.value[0]=o;break;case"denoiseSpecular":this.svgf.denoisePass.fullscreenMaterial.uniforms.denoise.value[1]=o;break;case"denoiseKernel":case"depthPhi":case"normalPhi":case"roughnessPhi":this.svgf.denoisePass.fullscreenMaterial.uniforms[a].value=o;break;case"resolutionScale":this.setSize(this.lastSize.width,this.lastSize.height),s.reset();break;case"spp":this.ssgiPass.fullscreenMaterial.fragmentShader=this.ssgiPass.defaultFragmentShader.replaceAll("spp",o),o!==1&&(this.ssgiPass.fullscreenMaterial.fragmentShader=yc(this.ssgiPass.fullscreenMaterial.fragmentShader.replace("#pragma unroll_loop_start","").replace("#pragma unroll_loop_end",""))),this.ssgiPass.fullscreenMaterial.needsUpdate=t,s.reset();break;case"steps":case"refineSteps":this.ssgiPass.fullscreenMaterial.defines[a]=parseInt(o),this.ssgiPass.fullscreenMaterial.needsUpdate=t,s.reset();break;case"importanceSampling":case"missedRays":case"autoThickness":o?this.ssgiPass.fullscreenMaterial.defines[a]="":delete this.ssgiPass.fullscreenMaterial.defines[a],this.ssgiPass.fullscreenMaterial.needsUpdate=t,s.reset();break;case"blend":this.svgf.svgfTemporalReprojectPass.fullscreenMaterial.uniforms[a].value=o,s.reset();break;case"distance":n.rayDistance.value=o,s.reset();break;default:r.includes(a)&&(n[a].value=o,s.reset())}}}),this[a]=e[a];t=!0}initialize(e,...t){super.initialize(e,...t),this.ssgiPass.initialize(e,...t)}setSize(e,t,n=!1){e===void 0&&t===void 0||!n&&e===this.lastSize.width&&t===this.lastSize.height&&this.resolutionScale===this.lastSize.resolutionScale||(this.ssgiPass.setSize(e,t),this.svgf.setSize(e,t),this.sceneRenderTarget.setSize(e,t),this.lastSize={width:e,height:t,resolutionScale:this.resolutionScale})}dispose(){super.dispose(),this.ssgiPass.dispose(),this.svgf.dispose(),ts.prototype.render=Zh}keepEnvMapUpdated(){const e=this.ssgiPass.fullscreenMaterial;if(this._scene.environment&&e.uniforms.envMapInfo.value.mapUuid!==this._scene.environment.uuid){var t;if(((t=this._scene.environment)==null?void 0:t.mapping)===xn){this._scene.environment.generateMipmaps||(this._scene.environment.generateMipmaps=!0,this._scene.environment.minFilter=Dc,this._scene.environment.magFilter=Dc,this._scene.environment.needsUpdate=!0);const n=AM(this._scene.environment);e.uniforms.maxEnvMapMipLevel.value=n,e.uniforms.envMapInfo.value.map=this._scene.environment,e.defines.USE_ENVMAP="",delete e.defines.importanceSampling,this.importanceSampling?e.uniforms.envMapInfo.value.updateFrom(this._scene.environment).then(()=>{e.defines.importanceSampling="",e.needsUpdate=!0}):e.uniforms.envMapInfo.value.map=this._scene.environment}else delete e.defines.USE_ENVMAP,delete e.defines.importanceSampling;this.svgf.svgfTemporalReprojectPass.reset(),e.needsUpdate=!0}}update(e,t){this.keepEnvMapUpdated();const n=this.isUsingRenderPass?t:this.sceneRenderTarget,r=[];if(!this.isUsingRenderPass){const a=[];for(const o of Mo(this._scene)){if(o.isScene)return;o.visible=!_c(o),o.visible?r.push(o):a.push(o)}this.renderPass.render(e,this.sceneRenderTarget);for(const o of a)o.visible=!0;for(const o of r)o.visible=!1}this.ssgiPass.fullscreenMaterial.uniforms.directLightTexture.value=n.texture,this.svgf.denoisePass.fullscreenMaterial.uniforms.directLightTexture.value=n.texture,this.ssgiPass.render(e),this.svgf.render(e),this.uniforms.get("inputTexture").value=this.svgf.texture,this.uniforms.get("sceneTexture").value=n.texture,this.uniforms.get("depthTexture").value=this.ssgiPass.depthTexture,this.uniforms.get("toneMapping").value=e.toneMapping;for(const a of r)a.visible=!0;const s=!this.diffuseOnly&&!this.specularOnly;Kh.value=s||this.diffuseOnly===!0,Jh.value=s||this.specularOnly==!0,cancelAnimationFrame(this.rAF2),cancelAnimationFrame(this.rAF),cancelAnimationFrame(this.usingRenderPassRAF),this.rAF=requestAnimationFrame(()=>{this.rAF2=requestAnimationFrame(()=>{Kh.value=!1,Jh.value=!1})}),this.usingRenderPassRAF=requestAnimationFrame(()=>{const a=this.isUsingRenderPass;this.isUsingRenderPass=!1,a!=this.isUsingRenderPass&&this.updateUsingRenderPass()})}}so.DefaultOptions=Zl;var ab=`#define GLSLIFY 1
uniform sampler2D inputTexture;uniform sampler2D velocityTexture;uniform sampler2D blueNoiseTexture;uniform ivec2 blueNoiseSize;uniform vec2 texSize;uniform float intensity;uniform float jitter;uniform float deltaTime;uniform int frame;uvec4 s0,s1;ivec2 pixel;void rng_initialize(vec2 p,int frame){pixel=ivec2(p);s0=uvec4(p,uint(frame),uint(p.x)+uint(p.y));s1=uvec4(frame,frame*15843,frame*31+4566,frame*2345+58585);}void pcg4d(inout uvec4 v){v=v*1664525u+1013904223u;v.x+=v.y*v.w;v.y+=v.z*v.x;v.z+=v.x*v.y;v.w+=v.y*v.z;v=v ^(v>>16u);v.x+=v.y*v.w;v.y+=v.z*v.x;v.z+=v.x*v.y;v.w+=v.y*v.z;}ivec2 shift2(){pcg4d(s1);return(pixel+ivec2(s1.xy % 0x0fffffffu))% blueNoiseSize;}void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 velocity=textureLod(velocityTexture,vUv,0.0);if(dot(velocity.xyz,velocity.xyz)==0.0){outputColor=inputColor;return;}velocity.xy*=intensity;rng_initialize(vUv*texSize,frame);vec2 blueNoise=texelFetch(blueNoiseTexture,shift2(),0).rg-0.5;vec2 jitterOffset=jitter*velocity.xy*blueNoise;float frameSpeed=(1./100.)/deltaTime;vec2 startUv=vUv+(jitterOffset-velocity.xy*0.5)*frameSpeed;vec2 endUv=vUv+(jitterOffset+velocity.xy*0.5)*frameSpeed;startUv=max(vec2(0.),startUv);endUv=min(vec2(1.),endUv);vec3 motionBlurredColor;for(float i=0.0;i<=samplesFloat;i++){vec2 reprojectedUv=mix(startUv,endUv,i/samplesFloat);vec3 neighborColor=textureLod(inputTexture,reprojectedUv,0.0).rgb;motionBlurredColor+=neighborColor;}motionBlurredColor/=samplesFloat;outputColor=vec4(motionBlurredColor,inputColor.a);}`;const $h={intensity:1,jitter:1,samples:16};class ob extends $i{constructor(e,t=$h){t={...$h,...t},super("MotionBlurEffect",ab,{type:"MotionBlurMaterial",uniforms:new Map([["inputTexture",new X(null)],["velocityTexture",new X(e.texture)],["blueNoiseTexture",new X(null)],["blueNoiseSize",new X(new ge)],["texSize",new X(new ge)],["intensity",new X(1)],["jitter",new X(1)],["frame",new X(0)],["deltaTime",new X(0)]]),defines:new Map([["samples",t.samples.toFixed(0)],["samplesFloat",t.samples.toFixed(0)+".0"]])}),this.pointsIndex=0,this.makeOptionsReactive(t)}makeOptionsReactive(e){for(const t of Object.keys(e))Object.defineProperty(this,t,{get(){return e[t]},set(n){switch(e[t]=n,t){case"intensity":case"jitter":this.uniforms.get(t).value=n;break}}}),this[t]=e[t]}initialize(e,...t){super.initialize(e,...t),new mi().load(Ef,n=>{n.minFilter=Ke,n.magFilter=Ke,n.wrapS=hn,n.wrapT=hn,n.encoding=dn,this.uniforms.get("blueNoiseTexture").value=n})}update(e,t,n){this.uniforms.get("inputTexture").value=t.texture,this.uniforms.get("deltaTime").value=Math.max(1/1e3,n);const r=e.info.render.frame%65536;this.uniforms.get("frame").value=r,this.uniforms.get("texSize").value.set(window.innerWidth,window.innerHeight);const s=this.uniforms.get("blueNoiseTexture").value;if(s){const{width:a,height:o}=s.source.data;this.uniforms.get("blueNoiseSize").value.set(a,o)}}}const lb=`
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
`,cb=`
#define MAX_BONES 64
                    
${We.skinning_pars_vertex}
${lb}

uniform mat4 velocityMatrix;
uniform mat4 prevVelocityMatrix;
varying vec4 prevPosition;
varying vec4 newPosition;

#ifdef renderDepthNormal
varying vec2 vHighPrecisionZW;
#endif
`,ub=`
// Get the current vertex position
transformed = vec3( position );
${We.skinning_vertex}
newPosition = velocityMatrix * vec4( transformed, 1.0 );

// Get the previous vertex position
transformed = vec3( position );
${We.skinbase_vertex.replace(/mat4 /g,"").replace(/getBoneMatrix/g,"getPrevBoneMatrix")}
${We.skinning_vertex.replace(/vec4 /g,"")}
prevPosition = prevVelocityMatrix * vec4( transformed, 1.0 );

gl_Position = newPosition;

#ifdef renderDepthNormal
vHighPrecisionZW = gl_Position.zw;
#endif
`,hb=`
varying vec4 prevPosition;
varying vec4 newPosition;

#ifdef renderDepthNormal
varying vec2 vHighPrecisionZW;
#endif
`,db=`
vec2 pos0 = (prevPosition.xy / prevPosition.w) * 0.5 + 0.5;
vec2 pos1 = (newPosition.xy / newPosition.w) * 0.5 + 0.5;

vec2 vel = pos1 - pos0;

#ifdef renderDepthNormal
float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
#endif

gl_FragColor = vec4(vel.x, vel.y, 0., 0.);
`,fb={prevVelocityMatrix:{value:new ze},velocityMatrix:{value:new ze},prevBoneTexture:{value:null},boneTexture:{value:null},normalMap:{value:null},normalScale:{value:new ge},uvTransform:{value:new rn}};class pb extends _t{constructor(){super({uniforms:yr.clone(fb),glslVersion:Qi,vertexShader:`
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
					
                    ${cb}
        
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

						${ub}

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

					${hb}
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

						${db.replaceAll("gl_FragColor","gVelocity")}
						vec3 worldNormal = normalize((vec4(normal, 1.) * viewMatrix).xyz);
						gVelocity.ba = Encode(worldNormal);

						#ifdef renderDepthNormal
						gDepth = packDepthToRGBA(fragCoordZ);
						#endif
                    }`}),this.isVelocityMaterial=!0}}const mb=new Ie(0),gb=new ge,ed=new ze,td=new ze;class vb extends Gt{constructor(e,t,n=!0){super("velocityDepthNormalPass"),this.cachedMaterials=new WeakMap,this.visibleMeshes=[],this.needsSwap=!1,this._scene=e,this._camera=t;const r=n?2:1;this.renderTarget=new wr(1,1,r,{minFilter:Ke,magFilter:Ke}),this.renderTarget.depthTexture=new Sr(1,1),this.renderTarget.depthTexture.type=it,n&&(this.renderTarget.texture[0].type=Qt,this.renderTarget.texture[0].needsUpdate=!0,this.renderTarget.texture[1].type=it,this.renderTarget.texture[1].needsUpdate=!0),this.renderDepthNormal=n}setVelocityDepthNormalMaterialInScene(){this.visibleMeshes=Mo(this._scene);for(const t of this.visibleMeshes){const n=t.material;let[r,s]=this.cachedMaterials.get(t)||[];if(n!==r){var e;s=new pb,bf(n,s),t.material=s,(e=t.skeleton)!=null&&e.boneTexture&&Af(t),this.cachedMaterials.set(t,[n,s])}t.material=s,t.visible=_c(t,n),this.renderDepthNormal&&(s.defines.renderDepthNormal="");const a=n.map||n.normalMap||n.roughnessMap||n.metalnessMap;a&&(s.uniforms.uvTransform.value=a.matrix),MM(t,this._camera)}}unsetVelocityDepthNormalMaterialInScene(){for(const e of this.visibleMeshes)e.visible=!0,bM(e,this._camera),e.material=this.cachedMaterials.get(e)[0]}setSize(e,t){var n;this.renderTarget.setSize(e,t),(n=this.lastDepthTexture)==null||n.dispose(),this.lastDepthTexture=new tw(e,t,Ft),this.lastDepthTexture.minFilter=Ke,this.lastDepthTexture.magFilter=Ke}dispose(){super.dispose(),this.renderTarget.dispose()}get texture(){return Array.isArray(this.renderTarget.texture)?this.renderTarget.texture[1]:this.renderTarget.texture}get depthTexture(){return this.renderTarget.texture[0]}render(e){ed.copy(this._camera.projectionMatrix),td.copy(this._camera.projectionMatrixInverse),this._camera.view&&(this._camera.view.enabled=!1),this._camera.updateProjectionMatrix(),this.setVelocityDepthNormalMaterialInScene();const{background:t}=this._scene;this._scene.background=mb,e.setRenderTarget(this.renderTarget),e.copyFramebufferToTexture(gb,this.lastDepthTexture),e.render(this._scene,this._camera),this._scene.background=t,this.unsetVelocityDepthNormalMaterialInScene(),this._camera.view&&(this._camera.view.enabled=!0),this._camera.projectionMatrix.copy(ed),this._camera.projectionMatrixInverse.copy(td)}}class xb{constructor(e,t,n=so.DefaultOptions){const r=e.addFolder("SSGIDebugGUI");r.open(),this.pane=r,r.onChange(u=>{const{property:h,value:d}=u;t[h]=d}),n={...so.DefaultOptions,...n};const s=r.addFolder("General");s.add(n,"distance",.001,10,.01),s.add(n,"autoThickness"),s.add(n,"thickness",0,5,.01),s.add(n,"maxRoughness",0,1,.01),s.add(n,"envBlur",0,1,.01),s.add(n,"importanceSampling"),s.add(n,"maxEnvLuminance",0,100,1),r.addFolder("Temporal Resolve").add(n,"blend",0,1,.001);const o=r.addFolder("Denoise");o.add(n,"denoiseIterations",0,5,1),o.add(n,"denoiseKernel",1,5,1),o.add(n,"denoiseDiffuse",0,50,.01),o.add(n,"denoiseSpecular",0,50,.01),o.add(n,"depthPhi",0,15,.001),o.add(n,"normalPhi",0,50,.001),o.add(n,"roughnessPhi",0,100,.001);const l=r.addFolder("Tracing");l.add(n,"steps",0,256,1),l.add(n,"refineSteps",0,16,1),l.add(n,"spp",1,32,1),l.add(n,"missedRays"),r.addFolder("Resolution").add(n,"resolutionScale",.25,1,.25)}}const wb=""+new URL("rgh-2031a231.jpg",import.meta.url).href,yb=""+new URL("paper_normal-0e49083f.jpg",import.meta.url).href,_b=""+new URL("lut-b6534146.3dl",import.meta.url).href,Kl={rgh:wb,paper_normal:yb,lut:_b};function Ab(i){let e,t,n,r,s,a=!0,o,l;const c=new Ri,u=new Tt(40,window.innerWidth/window.innerHeight,.1,250);c.add(u);const h=document.createElement("canvas");document.body.appendChild(h),h.style.left=0,h.style.top=0,h.style.position="fixed";const d=document.createElement("div");d.id="orbitControlsDomElem",d.style.position="absolute",d.style.left=0,d.style.top=0,d.style.width="100vw",d.style.height="100vh",d.style.opacity=0,d.style.cursor="grab",document.body.appendChild(d);let p=h;const g=new Ki({canvas:p,powerPreference:"high-performance",premultipliedAlpha:!1,stencil:!1,antialias:!1,alpha:!1,preserveDrawingBuffer:!0});g.autoClear=!1,g.outputEncoding=Ne,g.setSize(window.innerWidth,window.innerHeight);const m=new lr(u),f=ce=>{v.multisampling=0,v.removePass(n),v.removePass(t),v.removePass(r),v.removePass(m),v.addPass(r),console.log("composer",v.passes)},x=new ws(u,document.querySelector("#orbitControlsDomElem"));x.enableDamping=!0;const A=8.75;u.position.set(50,30,50),x.target.set(0,A,0),x.maxPolarAngle=Math.PI/2,x.minDistance=7.5,window.controls=x;const v=new pf(g),_={yaw:55,pitch:27,intensity:0},M=new da(16777215,_.intensity);M.position.set(217,43,76),M.updateMatrixWorld(),M.castShadow=!0,c.add(M),g.shadowMap.enabled=!0,g.shadowMap.autoUpdate=!1,g.shadowMap.needsUpdate=!0,M.shadow.mapSize.width=8192,M.shadow.mapSize.height=8192,M.shadow.camera.near=50,M.shadow.camera.far=500,M.shadow.bias=-1e-4;const T=100;M.shadow.camera.left=-T,M.shadow.camera.bottom=-T,M.shadow.camera.right=T,M.shadow.camera.top=T;const P=new cs;document.body.appendChild(P.dom);const y=new xo().setDataType(it),b=async ce=>{var te;ce.mapping=xn,(te=c.environment)==null||te.dispose(),c.environment=ce,c.background=null,l==null||l.removeFromParent(),l==null||l.material.dispose(),l==null||l.geometry.dispose();const O=await new mi().loadAsync(Zn.dry_cracked_lake.avif);O.encoding=Ne,O.minFilter=Fe,l=new pa(O),l.radius=100,l.height=20,l.scale.setScalar(100),l.updateMatrixWorld(),c.add(l)};y.load(Zn.dry_cracked_lake.hdr,b);const D=new vs,U=new xs;U.setDecoderConfig({type:"js"}),U.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/"),D.setDRACOLoader(U);let W;W=ga;const N=Math.PI/180,F=()=>{console.log("refresh lighting"),M.position.x=Math.sin(_.yaw*N)*Math.cos(_.pitch*N),M.position.y=Math.sin(_.pitch*N),M.position.z=Math.cos(_.yaw*N)*Math.cos(_.pitch*N),M.position.normalize().multiplyScalar(75),M.updateMatrixWorld(),g.shadowMap.needsUpdate=!0},V=async()=>{const ce={distance:2.7200000000000104,thickness:1.2999999999999972,autoThickness:!1,maxRoughness:1,blend:.95,denoiseIterations:3,denoiseKernel:3,denoiseDiffuse:25,denoiseSpecular:25.54,depthPhi:5,normalPhi:28,roughnessPhi:18.75,envBlur:.55,importanceSampling:!0,directLightMultiplier:1,maxEnvLuminance:50,steps:20,refineSteps:4,spp:1,resolutionScale:1,missedRays:!1},O=new vb(c,u);v.addPass(O),e=new Tf(c,u,O),o=i;const te=new gf({intensity:1,mipmapBlur:!0,luminanceSmoothing:.75,luminanceThreshold:.75,kernelSize:wo.MEDIUM}),he=new lM({darkness:.8,offset:.3});s=new so(c,u,O,ce),new xb(o,s,ce),new cM().load(Kl.lut).then(ue=>{const ye=new nM(ue);v.addPass(new lr(u,s,te,he,ye));const xe=new ob(O);v.addPass(new lr(u,xe)),t=new lr(u,e);const Se=new aM;n=new lr(u,Se);const Ae=new $A;r=new lr(u,Ae),f(),ne(),J()});const j=new me(new po(25,32),new Yt({color:1118481,roughness:0,metalness:1}));j.rotateX(-Math.PI/2),j.name="floor",j.receiveShadow=!0,j.position.set(0,.001,0),c.add(j)},J=()=>{P.begin(),x.update(),u.updateMatrixWorld(),a?v.render():(g.clear(),g.render(c,u)),P.end(),window.requestAnimationFrame(J)},ne=()=>{u.aspect=window.innerWidth/window.innerHeight,u.updateProjectionMatrix();const ce=window.devicePixelRatio;g.setPixelRatio(ce),console.log("DPR",g.getPixelRatio()),g.setSize(window.innerWidth,window.innerHeight),v.setSize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",ne);function K(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,ce=>(ce^crypto.getRandomValues(new Uint8Array(1))[0]&15>>ce/4).toString(16))}const ee={1:"TRAA",2:"MSAA",3:"FXAA",4:"SMAA",5:"Disabled"};Object.values(ee),document.addEventListener("keydown",ce=>{if(document.activeElement.tagName!=="INPUT"&&ee[ce.key]&&f(),ce.code==="KeyQ"&&(a=!a,F()),ce.code==="KeyP"){const O=g.domElement.toDataURL(),te=document.createElement("a");te.href=O,te.download="screenshot-"+K()+".png",te.click()}});const se=ce=>{c.add(ce.scene),ce.scene.scale.setScalar(1),ce.scene.traverse(Ae=>{Ae.isMesh&&(Ae.castShadow=Ae.receiveShadow=!0,Ae.material.depthWrite=!0),Ae.frustumCulled=!1});const O=new Mr;O.setFromObject(ce.scene);const te=O.max.y-O.min.y,he=Math.max(O.max.x-O.min.x,O.max.z-O.min.z),j=15,ye=45/he,xe=j/te;ce.scene.scale.multiplyScalar(Math.min(ye,xe)),ce.scene.updateMatrixWorld(),O.setFromObject(ce.scene);const Se=new I;O.getCenter(Se),Se.y=O.min.y,ce.scene.position.sub(Se),c.updateMatrixWorld(),requestAnimationFrame(F)};D.load(W,ce=>{W==="time_machine.optimized.glb"&&(ce.scene.rotation.y+=Math.PI/2),se(ce),V()})}class Mb extends Yt{constructor(e={}){super(),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var t;(t=e.defines)!=null&&t.USE_UV||(e.defines.USE_UV=""),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
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
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}}class bb extends _t{constructor(e=new ge){super({uniforms:{inputBuffer:new X(null),depthBuffer:new X(null),resolution:new X(new ge),texelSize:new X(new ge),halfTexelSize:new X(new ge),kernel:new X(0),scale:new X(1),cameraNear:new X(0),cameraFar:new X(1),minDepthThreshold:new X(0),maxDepthThreshold:new X(1),depthScale:new X(0),depthToBlurRatioBias:new X(.25)},fragmentShader:`#include <common>
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
        }`,blending:qt,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t),this.uniforms.halfTexelSize.value.set(e,t).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}}class Sb{constructor({gl:e,resolution:t,width:n=500,height:r=500,minDepthThreshold:s=0,maxDepthThreshold:a=1,depthScale:o=0,depthToBlurRatioBias:l=.25}){this.renderToScreen=!1,this.renderTargetA=new ut(t,t,{minFilter:Fe,magFilter:Fe,stencilBuffer:!1,depthBuffer:!1,encoding:e.outputEncoding}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new bb,this.convolutionMaterial.setTexelSize(1/n,1/r),this.convolutionMaterial.setResolution(new ge(n,r)),this.scene=new Ri,this.camera=new uo,this.convolutionMaterial.uniforms.minDepthThreshold.value=s,this.convolutionMaterial.uniforms.maxDepthThreshold.value=a,this.convolutionMaterial.uniforms.depthScale.value=o,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=l,this.convolutionMaterial.defines.USE_DEPTH=o>0;const c=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),u=new Float32Array([0,0,2,0,0,2]),h=new Rt;h.setAttribute("position",new Et(c,3)),h.setAttribute("uv",new Et(u,2)),this.screen=new me(h,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,t,n){const r=this.scene,s=this.camera,a=this.renderTargetA,o=this.renderTargetB;let l=this.convolutionMaterial,c=l.uniforms;c.depthBuffer.value=t.depthTexture;const u=l.kernel;let h=t,d,p,g;for(p=0,g=u.length-1;p<g;++p)d=p&1?o:a,c.kernel.value=u[p],c.inputBuffer.value=h.texture,e.setRenderTarget(d),e.render(r,s),h=d;c.kernel.value=u[p],c.inputBuffer.value=h.texture,e.setRenderTarget(this.renderToScreen?null:n),e.render(r,s)}}let Jl,Tn,An,pr,ii,ao,$l=new ge;const Js=new Mn,nd=new mi,Cf=new vs,Df=new xs;let Xn;Df.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");Cf.setDRACOLoader(Df);const id=new gs,jr=[];let Pf=()=>{},Al;async function Tb(i){ao=i,Al=ao.addFolder("Scene"),Jl=new cs,app.appendChild(Jl.dom),Tn=new Ki({antialias:!0}),Tn.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),Tn.setSize(window.innerWidth,window.innerHeight),Tn.shadowMap.enabled=!0,Tn.shadowMap.type=Ci,Tn.outputEncoding=Ne,Tn.toneMapping=hs,app.appendChild(Tn.domElement),An=new Tt(50,window.innerWidth/window.innerHeight,.1,200),An.position.set(6,3,6),An.name="Camera",An.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),pr=new Ri,pr.add(Js),ii=new ws(An,Tn.domElement),ii.enableDamping=!0,ii.dampingFactor=.05,ii.minDistance=.1,ii.maxDistance=100,ii.maxPolarAngle=Math.PI/1.5,ii.target.set(0,0,0),ii.target.set(0,0,0),Xn=new ma(An,Tn.domElement),Xn.addEventListener("dragging-changed",n=>{ii.enabled=!n.value,n.value}),Xn.addEventListener("change",()=>{Xn.object&&Xn.object.position.y<0&&(Xn.object.position.y=0)}),pr.add(Xn),window.addEventListener("resize",Eb),document.addEventListener("pointermove",rd);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",n=>{Date.now()-e<200&&(rd(n),Db())}),Al.add(Xn,"mode",["translate","rotate","scale"]);const t=new xf(pr,Al);t.preset=Zn.dancing_hall,t.setEnvType("HDRI"),t.setBGType("GroundProjection"),t.updateAll(),await Pb(),Rf()}function Eb(){An.aspect=window.innerWidth/window.innerHeight,An.updateProjectionMatrix(),Tn.setSize(window.innerWidth,window.innerHeight)}function Cb(){Jl.update(),xc(),ii.update(),Pf(),Tn.render(pr,An)}function Rf(){requestAnimationFrame(Rf),Cb()}function Db(){if(id.setFromCamera($l,An),id.intersectObject(Js,!0,jr),!jr.length){Xn.detach();return}jr[0].object.selectOnRaycast?Xn.attach(jr[0].object.selectOnRaycast):Xn.attach(jr[0].object),jr.length=0}function rd(i){$l.x=i.clientX/window.innerWidth*2-1,$l.y=-(i.clientY/window.innerHeight)*2+1}async function Pb(){const i=new me(new Zi(.5).translate(0,.5,0),new Yt({color:sd(),roughness:0,metalness:1}));i.name="sphere",i.castShadow=!0,i.receiveShadow=!0,i.position.set(2,0,-1.5),Js.add(i);const e=new me(new Mt(1,1,1).translate(0,.5,0),new Yt({color:sd(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),Js.add(e);const n=(await Cf.loadAsync(ga)).scene;n.name="car",n.traverse(a=>{a.isMesh&&(a.castShadow=!0,a.receiveShadow=!0,a.selectOnRaycast=n,a.name)}),Js.add(n);const r={FL:null,FR:null,R:null,steerL:null,steerR:null,steerVal:0};r.R=n.getObjectByName("wheels_rear"),r.steerL=n.getObjectByName("wheel_L"),r.steerR=n.getObjectByName("wheel_R");const s=Xt.degToRad(30);new qs(r).to({steerVal:1},3e3).easing(Pi.Elastic.Out).delay(3e3).repeatDelay(5e3).repeat(1e4).yoyo(!0).onUpdate(()=>{const a=Xt.mapLinear(r.steerVal,0,1,-s,s);r.steerL.rotation.y=a,r.steerR.rotation.y=a}).start(),Rb()}async function Rb(){let i=1,e=5,t=1024,n=[1024,1024],r=0,s=1,a=1,o=.25,l=0,c=.25,u=1,h,d=0,p=.6,g=1,m=new Ie("#151515");const f=Tn;n=Array.isArray(n)?n:[n,n];const x=n[0]+n[1]>0,A=new Vi,v=new I,_=new I,M=new I,T=new ze,P=new I(0,0,-1),y=new at,b=new I,D=new I,U=new at,W=new ze,N=new Tt,F=Ae=>{if(_.setFromMatrixPosition(Ae.matrixWorld),M.setFromMatrixPosition(An.matrixWorld),T.extractRotation(Ae.matrixWorld),v.set(0,0,1),v.applyMatrix4(T),_.addScaledVector(v,d),b.subVectors(_,M),b.dot(v)>0)return;b.reflect(v).negate(),b.add(_),T.extractRotation(An.matrixWorld),P.set(0,0,-1),P.applyMatrix4(T),P.add(M),D.subVectors(_,P),D.reflect(v).negate(),D.add(_),N.position.copy(b),N.up.set(0,1,0),N.up.applyMatrix4(T),N.up.reflect(v),N.lookAt(D),N.far=An.far,N.updateMatrixWorld(),N.projectionMatrix.copy(An.projectionMatrix),W.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),W.multiply(N.projectionMatrix),W.multiply(N.matrixWorldInverse),W.multiply(Ae.matrixWorld),A.setFromNormalAndCoplanarPoint(v,_),A.applyMatrix4(N.matrixWorldInverse),y.set(A.normal.x,A.normal.y,A.normal.z,A.constant);const Le=N.projectionMatrix;U.x=(Math.sign(y.x)+Le.elements[8])/Le.elements[0],U.y=(Math.sign(y.y)+Le.elements[9])/Le.elements[5],U.z=-1,U.w=(1+Le.elements[10])/Le.elements[14],y.multiplyScalar(2/y.dot(U)),Le.elements[2]=y.x,Le.elements[6]=y.y,Le.elements[10]=y.z+1,Le.elements[14]=y.w};function V(){const Ae={minFilter:Fe,magFilter:Fe,encoding:f.outputEncoding,type:yt},Le=new ut(t,t,Ae);Le.depthBuffer=!0,Le.depthTexture=new Sr(t,t),Le.depthTexture.format=li,Le.depthTexture.type=ca;const qe=new ut(t,t,Ae),et=new Sb({gl:f,resolution:t,width:n[0],height:n[1],minDepthThreshold:r,maxDepthThreshold:s,depthScale:a,depthToBlurRatioBias:o}),bt={mirror:l,textureMatrix:W,mixBlur:i,tDiffuse:Le.texture,tDepth:Le.depthTexture,tDiffuseBlur:qe.texture,hasBlur:x,mixStrength:e,minDepthThreshold:r,maxDepthThreshold:s,depthScale:a,depthToBlurRatioBias:o,distortion:c,distortionMap:h,mixContrast:u,metalness:p,roughness:g,color:m};return[Le,qe,et,bt,{"defines-USE_BLUR":x?"":void 0,"defines-USE_DEPTH":"","defines-USE_DISTORTION":void 0}]}const[J,ne,K,ee,se]=V(),ce={standard:new Yt({roughness:g}),reflector:new Mb(ee)},O=ce.reflector,te=ce.standard;O.defines.USE_BLUR=se["defines-USE_BLUR"],O.defines.USE_DEPTH=se["defines-USE_DEPTH"],O.defines.USE_DISTORTION=se["defines-USE_DISTORTION"];const he=await nd.loadAsync(Kl.rgh);he.wrapS=hn,he.wrapT=hn;const j=await nd.loadAsync(Kl.paper_normal);j.wrapS=hn,j.wrapT=hn,j.repeat.set(5,5),he.repeat.set(5,5),te.roughnessMap=he,te.color.set(m);const ue={materialType:ce.reflector,useRoughnessMap:!1,useDistortionMap:!1,useNormalMap:!1,normalScale:1,repeat:5},ye=new me(new po(5,32),ue.materialType);ye.rotateX(-Math.PI/2),ye.name="floor",ye.receiveShadow=!0,ye.position.set(0,.001,0),pr.add(ye),console.log({reflectorProps:ee,material:O}),ao.add(ue,"materialType",ce).onChange(Ae=>{ye.material=Ae});const xe=ao.addFolder("MeshReflectorMaterial");xe.open(),xe.add(ue,"useRoughnessMap").onChange(Ae=>{Ae?(O.roughnessMap=he,te.roughnessMap=he):(O.roughnessMap=null,te.roughnessMap=null),O.needsUpdate=!0,te.needsUpdate=!0}),xe.add(ue,"useDistortionMap").onChange(Ae=>{Ae?O.distortionMap=he:O.distortionMap=null,O.needsUpdate=!0}),xe.add(ue,"useNormalMap").onChange(Ae=>{Ae?(O.normalMap=j,te.normalMap=j):(O.normalMap=null,te.normalMap=null),O.needsUpdate=!0,te.needsUpdate=!0}),xe.addColor(O,"color").onChange(()=>{te.color.copy(O.color)}),xe.add(ue,"normalScale",0,1).onChange(Ae=>{O.normalScale.setScalar(Ae),te.normalScale.setScalar(Ae)}),xe.add(ue,"repeat",1,15,1).onChange(Ae=>{he.repeat.setScalar(Ae),j.repeat.setScalar(Ae)}),xe.add(O,"mixStrength",0,15),xe.add(O,"mixBlur",0,6),xe.add(O,"mixContrast",0,5),xe.add(O,"metalness",0,1),xe.add(O,"roughness",0,1),xe.add(O,"distortion",-2,2);const Se=ye;Pf=()=>{if(!Se)return;Se.visible=!1;const Ae=f.xr.enabled,Le=f.shadowMap.autoUpdate;F(Se),f.xr.enabled=!1,f.shadowMap.autoUpdate=!1,f.setRenderTarget(J),f.state.buffers.depth.setMask(!0),f.autoClear||f.clear(),f.render(pr,N),x&&K.render(f,J,ne),f.xr.enabled=Ae,f.shadowMap.autoUpdate=Le,Se.visible=!0,f.setRenderTarget(null)}}const Ib=new Ie;function sd(){return"#"+Ib.setHSL(Math.random(),.5,.5).getHexString()}let Lb=window.location.href,Bb=new URL(Lb);const la={MeshTransmissionMaterial:t_,PCSS:d_,WIP_SpotLight:__,WIP_SpotLight1:dM,RealismEffects:Ab,WIP_MeshReflectionMaterial:Tb},Ar={sceneName:Bb.searchParams.get("scene")||Object.keys(la)[0],sceneInitFunction:()=>{}};function If(i){console.log({path:i});const e=new URLSearchParams(window.location.search);e.set("scene",i),window.history.replaceState({},"",`${window.location.pathname}?${e}`),document.title=`Explore | ${i}`}const Lf=new ec({title:"Explore Vanilla Drei "+Bf,closeFolders:!0});Lf.add(Ar,"sceneName",Object.keys(la)).name("SCENE").onChange(i=>{console.log({v:i}),If(i),window.location.reload()});Object.keys(la).includes(Ar.sceneName)||(Ar.sceneName=Object.keys(la)[0]);Ar.sceneInitFunction=la[Ar.sceneName];Ar.sceneInitFunction(Lf);If(Ar.sceneName);
