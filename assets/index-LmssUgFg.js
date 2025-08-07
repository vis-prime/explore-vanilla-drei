(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const gf="0.0.60";/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class ws{constructor(e,t,i,s,r="div"){this.parent=e,this.object=t,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),ws.nextNameID=ws.nextNameID||0,this.$name.id=`lil-gui-name-${++ws.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class e_ extends ws{constructor(e,t,i){super(e,t,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function gu(n){let e,t;return(e=n.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=n.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=n.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const t_={isPrimitive:!0,match:n=>typeof n=="string",fromHexString:gu,toHexString:gu},Jo={isPrimitive:!0,match:n=>typeof n=="number",fromHexString:n=>parseInt(n.substring(1),16),toHexString:n=>"#"+n.toString(16).padStart(6,0)},n_={isPrimitive:!1,match:n=>Array.isArray(n),fromHexString(n,e,t=1){const i=Jo.fromHexString(n);e[0]=(i>>16&255)/255*t,e[1]=(i>>8&255)/255*t,e[2]=(i&255)/255*t},toHexString([n,e,t],i=1){i=255/i;const s=n*i<<16^e*i<<8^t*i<<0;return Jo.toHexString(s)}},i_={isPrimitive:!1,match:n=>Object(n)===n,fromHexString(n,e,t=1){const i=Jo.fromHexString(n);e.r=(i>>16&255)/255*t,e.g=(i>>8&255)/255*t,e.b=(i&255)/255*t},toHexString({r:n,g:e,b:t},i=1){i=255/i;const s=n*i<<16^e*i<<8^t*i<<0;return Jo.toHexString(s)}},s_=[t_,Jo,n_,i_];function r_(n){return s_.find(e=>e.match(n))}class a_ extends ws{constructor(e,t,i,s){super(e,t,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=r_(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=gu(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class rh extends ws{constructor(e,t,i){super(e,t,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class o_ extends ws{constructor(e,t,i,s,r,a){super(e,t,i,"number"),this._initInput(),this.min(s),this.max(r);const o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let y=parseFloat(this.$input.value);isNaN(y)||(this._stepExplicit&&(y=this._snap(y)),this.setValue(this._clamp(y)))},i=y=>{const w=parseFloat(this.$input.value);isNaN(w)||(this._snapClampSetValue(w+y),this.$input.value=this.getValue())},s=y=>{y.key==="Enter"&&this.$input.blur(),y.code==="ArrowUp"&&(y.preventDefault(),i(this._step*this._arrowKeyMultiplier(y))),y.code==="ArrowDown"&&(y.preventDefault(),i(this._step*this._arrowKeyMultiplier(y)*-1))},r=y=>{this._inputFocused&&(y.preventDefault(),i(this._step*this._normalizeMouseWheel(y)))};let a=!1,o,l,c,h,u;const d=5,f=y=>{o=y.clientX,l=c=y.clientY,a=!0,h=this.getValue(),u=0,window.addEventListener("mousemove",_),window.addEventListener("mouseup",v)},_=y=>{if(a){const w=y.clientX-o,S=y.clientY-l;Math.abs(S)>d?(y.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(w)>d&&v()}if(!a){const w=y.clientY-c;u-=w*this._step*this._arrowKeyMultiplier(y),h+u>this._max?u=this._max-h:h+u<this._min&&(u=this._min-h),this._snapClampSetValue(h+u)}c=y.clientY},v=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",_),window.removeEventListener("mouseup",v)},m=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",f),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(p,y,w,S,A)=>(p-y)/(w-y)*(A-S)+S,t=p=>{const y=this.$slider.getBoundingClientRect();let w=e(p,y.left,y.right,this._min,this._max);this._snapClampSetValue(w)},i=p=>{this._setDraggingStyle(!0),t(p.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",r)},s=p=>{t(p.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",r)};let a=!1,o,l;const c=p=>{p.preventDefault(),this._setDraggingStyle(!0),t(p.touches[0].clientX),a=!1},h=p=>{p.touches.length>1||(this._hasScrollBar?(o=p.touches[0].clientX,l=p.touches[0].clientY,a=!0):c(p),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",d))},u=p=>{if(a){const y=p.touches[0].clientX-o,w=p.touches[0].clientY-l;Math.abs(y)>Math.abs(w)?c(p):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d))}else p.preventDefault(),t(p.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d)},f=this._callOnFinishChange.bind(this),_=400;let v;const m=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();const w=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+w),this.$input.value=this.getValue(),clearTimeout(v),v=setTimeout(f,_)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:i}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,i=-e.wheelDelta/120,i*=this._stepExplicit?1:10),t+-i}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class l_ extends ws{constructor(e,t,i,s){super(e,t,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const i=document.createElement("option");i.textContent=t,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class c_ extends ws{constructor(e,t,i){super(e,t,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var h_=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
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
  background: var(--background-color);
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
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
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
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
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
.lil-gui .controller.boolean {
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
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
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
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
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

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
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
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
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
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function u_(n){const e=document.createElement("style");e.innerHTML=n;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let _f=!1;class Nd{constructor({parent:e,autoPlace:t=e===void 0,container:i,width:s,title:r="Controls",closeFolders:a=!1,injectStyles:o=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!_f&&o&&(u_(h_),_f=!0),i?i.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=a}add(e,t,i,s,r){if(Object(i)===i)return new l_(this,e,t,i);const a=e[t];switch(typeof a){case"number":return new o_(this,e,t,i,s,r);case"boolean":return new e_(this,e,t);case"string":return new c_(this,e,t);case"function":return new rh(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,a)}addColor(e,t,i=1){return new a_(this,e,t,i)}addFolder(e){const t=new Nd({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(i=>{i instanceof rh||i._name in e.controllers&&i.load(e.controllers[i._name])}),t&&e.folders&&this.folders.forEach(i=>{i._title in e.folders&&i.load(e.folders[i._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof rh)){if(i._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);t.controllers[i._name]=i.save()}}),e&&this.folders.forEach(i=>{if(i._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);t.folders[i._title]=i.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const i=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const s=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Mi="179",Ha={ROTATE:0,DOLLY:1,PAN:2},Fa={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},d_=0,vf=1,f_=2,eg=1,p_=2,sn=3,qi=0,jt=1,xn=2,An=0,qr=1,xf=2,yf=3,wf=4,Fd=5,Gr=100,m_=101,g_=102,__=103,v_=104,x_=200,Od=201,y_=202,w_=203,Pc=204,_u=205,S_=206,M_=207,b_=208,E_=209,T_=210,A_=211,R_=212,C_=213,P_=214,Dc=0,Ic=1,Qo=2,Jr=3,$a=4,Lc=5,Uc=6,el=7,Bd=0,D_=1,I_=2,Ss=0,L_=1,U_=2,N_=3,Ji=4,F_=5,O_=6,tg=7,Sf="attached",B_="detached",ng=300,ja=301,Ya=302,an=303,vu=304,$c=306,$i=1e3,ys=1001,Nc=1002,wn=1003,ig=1004,Io=1005,nt=1006,xc=1007,ji=1008,on=1009,sg=1010,rg=1011,wr=1012,kd=1013,er=1014,Vt=1015,Gt=1016,zd=1017,Hd=1018,Za=1020,ag=35902,og=1021,lg=1022,rn=1023,Sr=1026,qa=1027,jr=1028,Gd=1029,Vr=1030,Vd=1031,jc=1033,yc=33776,wc=33777,Sc=33778,Mc=33779,xu=35840,yu=35841,wu=35842,Su=35843,Mu=36196,bu=37492,Eu=37496,Tu=37808,Au=37809,Ru=37810,Cu=37811,Pu=37812,Du=37813,Iu=37814,Lu=37815,Uu=37816,Nu=37817,Fu=37818,Ou=37819,Bu=37820,ku=37821,bc=36492,zu=36494,Hu=36495,cg=36283,Gu=36284,Vu=36285,Wu=36286,tl=2300,nl=2301,ah=2302,Mf=2400,bf=2401,Ef=2402,k_=2500,z_=0,hg=1,Xu=2,Mr=3200,Wd=3201,Yc=0,H_=1,gs="",je="srgb",Ut="srgb-linear",Fc="linear",Rt="srgb",aa=7680,Tf=519,G_=512,V_=513,W_=514,ug=515,X_=516,$_=517,j_=518,Y_=519,$u=35044,ju=35048,Af="300 es",Yi=2e3,il=2001;class bs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Rf=1234567;const Bo=Math.PI/180,Ka=180/Math.PI;function Zi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Sn[n&255]+Sn[n>>8&255]+Sn[n>>16&255]+Sn[n>>24&255]+"-"+Sn[e&255]+Sn[e>>8&255]+"-"+Sn[e>>16&15|64]+Sn[e>>24&255]+"-"+Sn[t&63|128]+Sn[t>>8&255]+"-"+Sn[t>>16&255]+Sn[t>>24&255]+Sn[i&255]+Sn[i>>8&255]+Sn[i>>16&255]+Sn[i>>24&255]).toLowerCase()}function lt(n,e,t){return Math.max(e,Math.min(t,n))}function Xd(n,e){return(n%e+e)%e}function Z_(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function q_(n,e,t){return n!==e?(t-n)/(e-n):0}function ko(n,e,t){return(1-t)*n+t*e}function K_(n,e,t,i){return ko(n,e,1-Math.exp(-t*i))}function J_(n,e=1){return e-Math.abs(Xd(n,e*2)-e)}function Q_(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function ev(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function tv(n,e){return n+Math.floor(Math.random()*(e-n+1))}function nv(n,e){return n+Math.random()*(e-n)}function iv(n){return n*(.5-Math.random())}function sv(n){n!==void 0&&(Rf=n);let e=Rf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function rv(n){return n*Bo}function av(n){return n*Ka}function ov(n){return(n&n-1)===0&&n!==0}function lv(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function cv(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function hv(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),h=a((e+i)/2),u=r((e-i)/2),d=a((e-i)/2),f=r((i-e)/2),_=a((i-e)/2);switch(s){case"XYX":n.set(o*h,l*u,l*d,o*c);break;case"YZY":n.set(l*d,o*h,l*u,o*c);break;case"ZXZ":n.set(l*u,l*d,o*h,o*c);break;case"XZX":n.set(o*h,l*_,l*f,o*c);break;case"YXY":n.set(l*f,o*h,l*_,o*c);break;case"ZYZ":n.set(l*_,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Wi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const xt={DEG2RAD:Bo,RAD2DEG:Ka,generateUUID:Zi,clamp:lt,euclideanModulo:Xd,mapLinear:Z_,inverseLerp:q_,lerp:ko,damp:K_,pingpong:J_,smoothstep:Q_,smootherstep:ev,randInt:tv,randFloat:nv,randFloatSpread:iv,seededRandom:sv,degToRad:rv,radToDeg:av,isPowerOfTwo:ov,ceilPowerOfTwo:lv,floorPowerOfTwo:cv,setQuaternionFromProperEuler:hv,normalize:bt,denormalize:Wi};class ue{constructor(e=0,t=0){ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ht{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3];const d=r[a+0],f=r[a+1],_=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=_,e[t+3]=v;return}if(u!==v||l!==d||c!==f||h!==_){let m=1-o;const p=l*d+c*f+h*_+u*v,y=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){const A=Math.sqrt(w),I=Math.atan2(A,p*y);m=Math.sin(m*I)/A,o=Math.sin(o*I)/A}const S=o*y;if(l=l*m+d*S,c=c*m+f*S,h=h*m+_*S,u=u*m+v*S,m===1-o){const A=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=A,c*=A,h*=A,u*=A}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],d=r[a+1],f=r[a+2],_=r[a+3];return e[t]=o*_+h*u+l*f-c*d,e[t+1]=l*_+h*d+c*u-o*f,e[t+2]=c*_+h*f+o*d-l*u,e[t+3]=h*_-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),d=l(i/2),f=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*_,this._y=c*f*u-d*h*_,this._z=c*h*_+d*f*u,this._w=c*h*u-d*f*_;break;case"YXZ":this._x=d*h*u+c*f*_,this._y=c*f*u-d*h*_,this._z=c*h*_-d*f*u,this._w=c*h*u+d*f*_;break;case"ZXY":this._x=d*h*u-c*f*_,this._y=c*f*u+d*h*_,this._z=c*h*_+d*f*u,this._w=c*h*u-d*f*_;break;case"ZYX":this._x=d*h*u-c*f*_,this._y=c*f*u+d*h*_,this._z=c*h*_-d*f*u,this._w=c*h*u+d*f*_;break;case"YZX":this._x=d*h*u+c*f*_,this._y=c*f*u+d*h*_,this._z=c*h*_-d*f*u,this._w=c*h*u-d*f*_;break;case"XZY":this._x=d*h*u-c*f*_,this._y=c*f*u-d*h*_,this._z=c*h*_+d*f*u,this._w=c*h*u+d*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>u){const f=2*Math.sqrt(1+i-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-i-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,i=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Cf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Cf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),h=2*(o*t-r*s),u=2*(r*i-a*t);return this.x=t+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return oh.copy(this).projectOnVector(e),this.sub(oh)}reflect(e){return this.sub(oh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oh=new D,Cf=new Ht;class ot{constructor(e,t,i,s,r,a,o,l,c){ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],_=i[8],v=s[0],m=s[3],p=s[6],y=s[1],w=s[4],S=s[7],A=s[2],I=s[5],P=s[8];return r[0]=a*v+o*y+l*A,r[3]=a*m+o*w+l*I,r[6]=a*p+o*S+l*P,r[1]=c*v+h*y+u*A,r[4]=c*m+h*w+u*I,r[7]=c*p+h*S+u*P,r[2]=d*v+f*y+_*A,r[5]=d*m+f*w+_*I,r[8]=d*p+f*S+_*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,_=t*u+i*d+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=u*v,e[1]=(s*c-h*i)*v,e[2]=(o*i-s*a)*v,e[3]=d*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(lh.makeScale(e,t)),this}rotate(e){return this.premultiply(lh.makeRotation(-e)),this}translate(e,t){return this.premultiply(lh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const lh=new ot;function dg(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function sl(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function uv(){const n=sl("canvas");return n.style.display="block",n}const Pf={};function Ga(n){n in Pf||(Pf[n]=!0,console.warn(n))}function dv(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Df=new ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),If=new ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function fv(){const n={enabled:!0,workingColorSpace:Ut,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Rt&&(s.r=Ks(s.r),s.g=Ks(s.g),s.b=Ks(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Rt&&(s.r=Va(s.r),s.g=Va(s.g),s.b=Va(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===gs?Fc:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ga("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ga("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ut]:{primaries:e,whitePoint:i,transfer:Fc,toXYZ:Df,fromXYZ:If,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:je},outputColorSpaceConfig:{drawingBufferColorSpace:je}},[je]:{primaries:e,whitePoint:i,transfer:Rt,toXYZ:Df,fromXYZ:If,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:je}}}),n}const mt=fv();function Ks(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Va(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let oa;class pv{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{oa===void 0&&(oa=sl("canvas")),oa.width=e.width,oa.height=e.height;const s=oa.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=oa}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=sl("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ks(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ks(t[i]/255)*255):t[i]=Ks(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let mv=0;class $d{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mv++}),this.uuid=Zi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ch(s[a].image)):r.push(ch(s[a]))}else r=ch(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function ch(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?pv.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let gv=0;const hh=new D;class Kt extends bs{constructor(e=Kt.DEFAULT_IMAGE,t=Kt.DEFAULT_MAPPING,i=ys,s=ys,r=nt,a=ji,o=rn,l=on,c=Kt.DEFAULT_ANISOTROPY,h=gs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gv++}),this.uuid=Zi(),this.name="",this.source=new $d(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(hh).x}get height(){return this.source.getSize(hh).y}get depth(){return this.source.getSize(hh).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ng)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $i:e.x=e.x-Math.floor(e.x);break;case ys:e.x=e.x<0?0:1;break;case Nc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $i:e.y=e.y-Math.floor(e.y);break;case ys:e.y=e.y<0?0:1;break;case Nc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Kt.DEFAULT_IMAGE=null;Kt.DEFAULT_MAPPING=ng;Kt.DEFAULT_ANISOTROPY=1;class pt{constructor(e=0,t=0,i=0,s=1){pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],_=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(_+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,S=(f+1)/2,A=(p+1)/2,I=(h+d)/4,P=(u+v)/4,C=(_+m)/4;return w>S&&w>A?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=I/i,r=P/i):S>A?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=I/s,r=C/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=P/r,s=C/r),this.set(i,s,r,t),this}let y=Math.sqrt((m-_)*(m-_)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(u-v)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _v extends bs{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t);const s={width:e,height:t,depth:i.depth},r=new Kt(s);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:nt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new $d(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class St extends _v{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class fg extends Kt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=wn,this.minFilter=wn,this.wrapR=ys,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class vv extends Kt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=wn,this.minFilter=wn,this.wrapR=ys,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Es{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ti.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ti.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ti.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ti):Ti.fromBufferAttribute(r,a),Ti.applyMatrix4(e.matrixWorld),this.expandByPoint(Ti);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),bl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),bl.copy(i.boundingBox)),bl.applyMatrix4(e.matrixWorld),this.union(bl)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ti),Ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(po),El.subVectors(this.max,po),la.subVectors(e.a,po),ca.subVectors(e.b,po),ha.subVectors(e.c,po),ir.subVectors(ca,la),sr.subVectors(ha,ca),Ar.subVectors(la,ha);let t=[0,-ir.z,ir.y,0,-sr.z,sr.y,0,-Ar.z,Ar.y,ir.z,0,-ir.x,sr.z,0,-sr.x,Ar.z,0,-Ar.x,-ir.y,ir.x,0,-sr.y,sr.x,0,-Ar.y,Ar.x,0];return!uh(t,la,ca,ha,El)||(t=[1,0,0,0,1,0,0,0,1],!uh(t,la,ca,ha,El))?!1:(Tl.crossVectors(ir,sr),t=[Tl.x,Tl.y,Tl.z],uh(t,la,ca,ha,El))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ti).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Cs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Cs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Cs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Cs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Cs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Cs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Cs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Cs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Cs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Cs=[new D,new D,new D,new D,new D,new D,new D,new D],Ti=new D,bl=new Es,la=new D,ca=new D,ha=new D,ir=new D,sr=new D,Ar=new D,po=new D,El=new D,Tl=new D,Rr=new D;function uh(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Rr.fromArray(n,r);const o=s.x*Math.abs(Rr.x)+s.y*Math.abs(Rr.y)+s.z*Math.abs(Rr.z),l=e.dot(Rr),c=t.dot(Rr),h=i.dot(Rr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const xv=new Es,mo=new D,dh=new D;class Ts{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):xv.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;mo.subVectors(e,this.center);const t=mo.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(mo,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(dh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(mo.copy(e.center).add(dh)),this.expandByPoint(mo.copy(e.center).sub(dh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Ps=new D,fh=new D,Al=new D,rr=new D,ph=new D,Rl=new D,mh=new D;class ro{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ps)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ps.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ps.copy(this.origin).addScaledVector(this.direction,t),Ps.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){fh.copy(e).add(t).multiplyScalar(.5),Al.copy(t).sub(e).normalize(),rr.copy(this.origin).sub(fh);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Al),o=rr.dot(this.direction),l=-rr.dot(Al),c=rr.lengthSq(),h=Math.abs(1-a*a);let u,d,f,_;if(h>0)if(u=a*l-o,d=a*o-l,_=r*h,u>=0)if(d>=-_)if(d<=_){const v=1/h;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-_?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=_?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(fh).addScaledVector(Al,d),f}intersectSphere(e,t){Ps.subVectors(e.center,this.origin);const i=Ps.dot(this.direction),s=Ps.dot(Ps)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Ps)!==null}intersectTriangle(e,t,i,s,r){ph.subVectors(t,e),Rl.subVectors(i,e),mh.crossVectors(ph,Rl);let a=this.direction.dot(mh),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;rr.subVectors(this.origin,e);const l=o*this.direction.dot(Rl.crossVectors(rr,Rl));if(l<0)return null;const c=o*this.direction.dot(ph.cross(rr));if(c<0||l+c>a)return null;const h=-o*rr.dot(mh);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class We{constructor(e,t,i,s,r,a,o,l,c,h,u,d,f,_,v,m){We.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,h,u,d,f,_,v,m)}set(e,t,i,s,r,a,o,l,c,h,u,d,f,_,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=_,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new We().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/ua.setFromMatrixColumn(e,0).length(),r=1/ua.setFromMatrixColumn(e,1).length(),a=1/ua.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,_=o*h,v=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+_*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=_+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,_=c*h,v=c*u;t[0]=d+v*o,t[4]=_*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-_,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,_=c*h,v=c*u;t[0]=d-v*o,t[4]=-a*u,t[8]=_+f*o,t[1]=f+_*o,t[5]=a*h,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,_=o*h,v=o*u;t[0]=l*h,t[4]=_*c-f,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=f*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,_=o*l,v=o*c;t[0]=l*h,t[4]=v-d*u,t[8]=_*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+_,t[10]=d-v*u}else if(e.order==="XZY"){const d=a*l,f=a*c,_=o*l,v=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=a*h,t[9]=f*u-_,t[2]=_*u-f,t[6]=o*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(yv,e,wv)}lookAt(e,t,i){const s=this.elements;return $n.subVectors(e,t),$n.lengthSq()===0&&($n.z=1),$n.normalize(),ar.crossVectors(i,$n),ar.lengthSq()===0&&(Math.abs(i.z)===1?$n.x+=1e-4:$n.z+=1e-4,$n.normalize(),ar.crossVectors(i,$n)),ar.normalize(),Cl.crossVectors($n,ar),s[0]=ar.x,s[4]=Cl.x,s[8]=$n.x,s[1]=ar.y,s[5]=Cl.y,s[9]=$n.y,s[2]=ar.z,s[6]=Cl.z,s[10]=$n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],_=i[2],v=i[6],m=i[10],p=i[14],y=i[3],w=i[7],S=i[11],A=i[15],I=s[0],P=s[4],C=s[8],M=s[12],E=s[1],L=s[5],G=s[9],H=s[13],z=s[2],q=s[6],X=s[10],ie=s[14],Z=s[3],re=s[7],oe=s[11],Te=s[15];return r[0]=a*I+o*E+l*z+c*Z,r[4]=a*P+o*L+l*q+c*re,r[8]=a*C+o*G+l*X+c*oe,r[12]=a*M+o*H+l*ie+c*Te,r[1]=h*I+u*E+d*z+f*Z,r[5]=h*P+u*L+d*q+f*re,r[9]=h*C+u*G+d*X+f*oe,r[13]=h*M+u*H+d*ie+f*Te,r[2]=_*I+v*E+m*z+p*Z,r[6]=_*P+v*L+m*q+p*re,r[10]=_*C+v*G+m*X+p*oe,r[14]=_*M+v*H+m*ie+p*Te,r[3]=y*I+w*E+S*z+A*Z,r[7]=y*P+w*L+S*q+A*re,r[11]=y*C+w*G+S*X+A*oe,r[15]=y*M+w*H+S*ie+A*Te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],_=e[3],v=e[7],m=e[11],p=e[15];return _*(+r*l*u-s*c*u-r*o*d+i*c*d+s*o*f-i*l*f)+v*(+t*l*f-t*c*d+r*a*d-s*a*f+s*c*h-r*l*h)+m*(+t*c*u-t*o*f-r*a*u+i*a*f+r*o*h-i*c*h)+p*(-s*o*h-t*l*u+t*o*d+s*a*u-i*a*d+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],_=e[12],v=e[13],m=e[14],p=e[15],y=u*m*c-v*d*c+v*l*f-o*m*f-u*l*p+o*d*p,w=_*d*c-h*m*c-_*l*f+a*m*f+h*l*p-a*d*p,S=h*v*c-_*u*c+_*o*f-a*v*f-h*o*p+a*u*p,A=_*u*l-h*v*l-_*o*d+a*v*d+h*o*m-a*u*m,I=t*y+i*w+s*S+r*A;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/I;return e[0]=y*P,e[1]=(v*d*r-u*m*r-v*s*f+i*m*f+u*s*p-i*d*p)*P,e[2]=(o*m*r-v*l*r+v*s*c-i*m*c-o*s*p+i*l*p)*P,e[3]=(u*l*r-o*d*r-u*s*c+i*d*c+o*s*f-i*l*f)*P,e[4]=w*P,e[5]=(h*m*r-_*d*r+_*s*f-t*m*f-h*s*p+t*d*p)*P,e[6]=(_*l*r-a*m*r-_*s*c+t*m*c+a*s*p-t*l*p)*P,e[7]=(a*d*r-h*l*r+h*s*c-t*d*c-a*s*f+t*l*f)*P,e[8]=S*P,e[9]=(_*u*r-h*v*r-_*i*f+t*v*f+h*i*p-t*u*p)*P,e[10]=(a*v*r-_*o*r+_*i*c-t*v*c-a*i*p+t*o*p)*P,e[11]=(h*o*r-a*u*r-h*i*c+t*u*c+a*i*f-t*o*f)*P,e[12]=A*P,e[13]=(h*v*s-_*u*s+_*i*d-t*v*d-h*i*m+t*u*m)*P,e[14]=(_*o*s-a*v*s-_*i*l+t*v*l+a*i*m-t*o*m)*P,e[15]=(a*u*s-h*o*s+h*i*l-t*u*l-a*i*d+t*o*d)*P,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,_=r*u,v=a*h,m=a*u,p=o*u,y=l*c,w=l*h,S=l*u,A=i.x,I=i.y,P=i.z;return s[0]=(1-(v+p))*A,s[1]=(f+S)*A,s[2]=(_-w)*A,s[3]=0,s[4]=(f-S)*I,s[5]=(1-(d+p))*I,s[6]=(m+y)*I,s[7]=0,s[8]=(_+w)*P,s[9]=(m-y)*P,s[10]=(1-(d+v))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=ua.set(s[0],s[1],s[2]).length();const a=ua.set(s[4],s[5],s[6]).length(),o=ua.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Ai.copy(this);const c=1/r,h=1/a,u=1/o;return Ai.elements[0]*=c,Ai.elements[1]*=c,Ai.elements[2]*=c,Ai.elements[4]*=h,Ai.elements[5]*=h,Ai.elements[6]*=h,Ai.elements[8]*=u,Ai.elements[9]*=u,Ai.elements[10]*=u,t.setFromRotationMatrix(Ai),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=Yi,l=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(i-s),d=(t+e)/(t-e),f=(i+s)/(i-s);let _,v;if(l)_=r/(a-r),v=a*r/(a-r);else if(o===Yi)_=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===il)_=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Yi,l=!1){const c=this.elements,h=2/(t-e),u=2/(i-s),d=-(t+e)/(t-e),f=-(i+s)/(i-s);let _,v;if(l)_=1/(a-r),v=a/(a-r);else if(o===Yi)_=-2/(a-r),v=-(a+r)/(a-r);else if(o===il)_=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=_,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ua=new D,Ai=new We,yv=new D(0,0,0),wv=new D(1,1,1),ar=new D,Cl=new D,$n=new D,Lf=new We,Uf=new Ht;class wi{constructor(e=0,t=0,i=0,s=wi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(lt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-lt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Lf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Lf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Uf.setFromEuler(this),this.setFromQuaternion(Uf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wi.DEFAULT_ORDER="XYZ";class jd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Sv=0;const Nf=new D,da=new Ht,Ds=new We,Pl=new D,go=new D,Mv=new D,bv=new Ht,Ff=new D(1,0,0),Of=new D(0,1,0),Bf=new D(0,0,1),kf={type:"added"},Ev={type:"removed"},fa={type:"childadded",child:null},gh={type:"childremoved",child:null};class Pt extends bs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sv++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new D,t=new wi,i=new Ht,s=new D(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new We},normalMatrix:{value:new ot}}),this.matrix=new We,this.matrixWorld=new We,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return da.setFromAxisAngle(e,t),this.quaternion.multiply(da),this}rotateOnWorldAxis(e,t){return da.setFromAxisAngle(e,t),this.quaternion.premultiply(da),this}rotateX(e){return this.rotateOnAxis(Ff,e)}rotateY(e){return this.rotateOnAxis(Of,e)}rotateZ(e){return this.rotateOnAxis(Bf,e)}translateOnAxis(e,t){return Nf.copy(e).applyQuaternion(this.quaternion),this.position.add(Nf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ff,e)}translateY(e){return this.translateOnAxis(Of,e)}translateZ(e){return this.translateOnAxis(Bf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ds.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Pl.copy(e):Pl.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),go.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ds.lookAt(go,Pl,this.up):Ds.lookAt(Pl,go,this.up),this.quaternion.setFromRotationMatrix(Ds),s&&(Ds.extractRotation(s.matrixWorld),da.setFromRotationMatrix(Ds),this.quaternion.premultiply(da.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(kf),fa.child=e,this.dispatchEvent(fa),fa.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ev),gh.child=e,this.dispatchEvent(gh),gh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ds.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ds.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ds),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(kf),fa.child=e,this.dispatchEvent(fa),fa.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(go,e,Mv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(go,bv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Pt.DEFAULT_UP=new D(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ri=new D,Is=new D,_h=new D,Ls=new D,pa=new D,ma=new D,zf=new D,vh=new D,xh=new D,yh=new D,wh=new pt,Sh=new pt,Mh=new pt;class gi{constructor(e=new D,t=new D,i=new D){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Ri.subVectors(e,t),s.cross(Ri);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Ri.subVectors(s,t),Is.subVectors(i,t),_h.subVectors(e,t);const a=Ri.dot(Ri),o=Ri.dot(Is),l=Ri.dot(_h),c=Is.dot(Is),h=Is.dot(_h),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,_=(a*h-o*l)*d;return r.set(1-f-_,_,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Ls)===null?!1:Ls.x>=0&&Ls.y>=0&&Ls.x+Ls.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Ls)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ls.x),l.addScaledVector(a,Ls.y),l.addScaledVector(o,Ls.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return wh.setScalar(0),Sh.setScalar(0),Mh.setScalar(0),wh.fromBufferAttribute(e,t),Sh.fromBufferAttribute(e,i),Mh.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(wh,r.x),a.addScaledVector(Sh,r.y),a.addScaledVector(Mh,r.z),a}static isFrontFacing(e,t,i,s){return Ri.subVectors(i,t),Is.subVectors(e,t),Ri.cross(Is).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ri.subVectors(this.c,this.b),Is.subVectors(this.a,this.b),Ri.cross(Is).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return gi.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return gi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;pa.subVectors(s,i),ma.subVectors(r,i),vh.subVectors(e,i);const l=pa.dot(vh),c=ma.dot(vh);if(l<=0&&c<=0)return t.copy(i);xh.subVectors(e,s);const h=pa.dot(xh),u=ma.dot(xh);if(h>=0&&u<=h)return t.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(pa,a);yh.subVectors(e,r);const f=pa.dot(yh),_=ma.dot(yh);if(_>=0&&f<=_)return t.copy(r);const v=f*c-l*_;if(v<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(ma,o);const m=h*_-f*u;if(m<=0&&u-h>=0&&f-_>=0)return zf.subVectors(r,s),o=(u-h)/(u-h+(f-_)),t.copy(s).addScaledVector(zf,o);const p=1/(m+v+d);return a=v*p,o=d*p,t.copy(i).addScaledVector(pa,a).addScaledVector(ma,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const pg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},or={h:0,s:0,l:0},Dl={h:0,s:0,l:0};function bh(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ye{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=je){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,mt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=mt.workingColorSpace){return this.r=e,this.g=t,this.b=i,mt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=mt.workingColorSpace){if(e=Xd(e,1),t=lt(t,0,1),i=lt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=bh(a,r,e+1/3),this.g=bh(a,r,e),this.b=bh(a,r,e-1/3)}return mt.colorSpaceToWorking(this,s),this}setStyle(e,t=je){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=je){const i=pg[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ks(e.r),this.g=Ks(e.g),this.b=Ks(e.b),this}copyLinearToSRGB(e){return this.r=Va(e.r),this.g=Va(e.g),this.b=Va(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=je){return mt.workingToColorSpace(Mn.copy(this),e),Math.round(lt(Mn.r*255,0,255))*65536+Math.round(lt(Mn.g*255,0,255))*256+Math.round(lt(Mn.b*255,0,255))}getHexString(e=je){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=mt.workingColorSpace){mt.workingToColorSpace(Mn.copy(this),t);const i=Mn.r,s=Mn.g,r=Mn.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=mt.workingColorSpace){return mt.workingToColorSpace(Mn.copy(this),t),e.r=Mn.r,e.g=Mn.g,e.b=Mn.b,e}getStyle(e=je){mt.workingToColorSpace(Mn.copy(this),e);const t=Mn.r,i=Mn.g,s=Mn.b;return e!==je?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(or),this.setHSL(or.h+e,or.s+t,or.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(or),e.getHSL(Dl);const i=ko(or.h,Dl.h,t),s=ko(or.s,Dl.s,t),r=ko(or.l,Dl.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Mn=new ye;ye.NAMES=pg;let Tv=0;class Rn extends bs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tv++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=qr,this.side=qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pc,this.blendDst=_u,this.blendEquation=Gr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ye(0,0,0),this.blendAlpha=0,this.depthFunc=Jr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=aa,this.stencilZFail=aa,this.stencilZPass=aa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==qr&&(i.blending=this.blending),this.side!==qi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Pc&&(i.blendSrc=this.blendSrc),this.blendDst!==_u&&(i.blendDst=this.blendDst),this.blendEquation!==Gr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Jr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==aa&&(i.stencilFail=this.stencilFail),this.stencilZFail!==aa&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==aa&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class yi extends Rn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=Bd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const $s=Av();function Av(){const n=new ArrayBuffer(4),e=new Float32Array(n),t=new Uint32Array(n),i=new Uint32Array(512),s=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(i[l]=0,i[l|256]=32768,s[l]=24,s[l|256]=24):c<-14?(i[l]=1024>>-c-14,i[l|256]=1024>>-c-14|32768,s[l]=-c-1,s[l|256]=-c-1):c<=15?(i[l]=c+15<<10,i[l|256]=c+15<<10|32768,s[l]=13,s[l|256]=13):c<128?(i[l]=31744,i[l|256]=64512,s[l]=24,s[l|256]=24):(i[l]=31744,i[l|256]=64512,s[l]=13,s[l|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:i,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:o}}function Rv(n){Math.abs(n)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),n=lt(n,-65504,65504),$s.floatView[0]=n;const e=$s.uint32View[0],t=e>>23&511;return $s.baseTable[t]+((e&8388607)>>$s.shiftTable[t])}function Cv(n){const e=n>>10;return $s.uint32View[0]=$s.mantissaTable[$s.offsetTable[e]+(n&1023)]+$s.exponentTable[e],$s.floatView[0]}class Oa{static toHalfFloat(e){return Rv(e)}static fromHalfFloat(e){return Cv(e)}}const Qt=new D,Il=new ue;let Pv=0;class Xt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Pv++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=$u,this.updateRanges=[],this.gpuType=Vt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Il.fromBufferAttribute(this,t),Il.applyMatrix3(e),this.setXY(t,Il.x,Il.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix3(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Wi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$u&&(e.usage=this.usage),e}}class mg extends Xt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class gg extends Xt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ht extends Xt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Dv=0;const ri=new We,Eh=new Pt,ga=new D,jn=new Es,_o=new Es,dn=new D;class Tt extends bs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dv++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(dg(e)?gg:mg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new ot().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ri.makeRotationFromQuaternion(e),this.applyMatrix4(ri),this}rotateX(e){return ri.makeRotationX(e),this.applyMatrix4(ri),this}rotateY(e){return ri.makeRotationY(e),this.applyMatrix4(ri),this}rotateZ(e){return ri.makeRotationZ(e),this.applyMatrix4(ri),this}translate(e,t,i){return ri.makeTranslation(e,t,i),this.applyMatrix4(ri),this}scale(e,t,i){return ri.makeScale(e,t,i),this.applyMatrix4(ri),this}lookAt(e){return Eh.lookAt(e),Eh.updateMatrix(),this.applyMatrix4(Eh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ga).negate(),this.translate(ga.x,ga.y,ga.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ht(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Es);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];jn.setFromBufferAttribute(r),this.morphTargetsRelative?(dn.addVectors(this.boundingBox.min,jn.min),this.boundingBox.expandByPoint(dn),dn.addVectors(this.boundingBox.max,jn.max),this.boundingBox.expandByPoint(dn)):(this.boundingBox.expandByPoint(jn.min),this.boundingBox.expandByPoint(jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ts);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const i=this.boundingSphere.center;if(jn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];_o.setFromBufferAttribute(o),this.morphTargetsRelative?(dn.addVectors(jn.min,_o.min),jn.expandByPoint(dn),dn.addVectors(jn.max,_o.max),jn.expandByPoint(dn)):(jn.expandByPoint(_o.min),jn.expandByPoint(_o.max))}jn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)dn.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(dn));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)dn.fromBufferAttribute(o,c),l&&(ga.fromBufferAttribute(e,c),dn.add(ga)),s=Math.max(s,i.distanceToSquared(dn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xt(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<i.count;C++)o[C]=new D,l[C]=new D;const c=new D,h=new D,u=new D,d=new ue,f=new ue,_=new ue,v=new D,m=new D;function p(C,M,E){c.fromBufferAttribute(i,C),h.fromBufferAttribute(i,M),u.fromBufferAttribute(i,E),d.fromBufferAttribute(r,C),f.fromBufferAttribute(r,M),_.fromBufferAttribute(r,E),h.sub(c),u.sub(c),f.sub(d),_.sub(d);const L=1/(f.x*_.y-_.x*f.y);isFinite(L)&&(v.copy(h).multiplyScalar(_.y).addScaledVector(u,-f.y).multiplyScalar(L),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-_.x).multiplyScalar(L),o[C].add(v),o[M].add(v),o[E].add(v),l[C].add(m),l[M].add(m),l[E].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let C=0,M=y.length;C<M;++C){const E=y[C],L=E.start,G=E.count;for(let H=L,z=L+G;H<z;H+=3)p(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const w=new D,S=new D,A=new D,I=new D;function P(C){A.fromBufferAttribute(s,C),I.copy(A);const M=o[C];w.copy(M),w.sub(A.multiplyScalar(A.dot(M))).normalize(),S.crossVectors(I,M);const L=S.dot(l[C])<0?-1:1;a.setXYZW(C,w.x,w.y,w.z,L)}for(let C=0,M=y.length;C<M;++C){const E=y[C],L=E.start,G=E.count;for(let H=L,z=L+G;H<z;H+=3)P(e.getX(H+0)),P(e.getX(H+1)),P(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Xt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,u=new D;if(e)for(let d=0,f=e.count;d<f;d+=3){const _=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)dn.fromBufferAttribute(e,t),dn.normalize(),e.setXYZ(t,dn.x,dn.y,dn.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,_=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)d[_++]=c[f++]}return new Xt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tt,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Hf=new We,Cr=new ro,Ll=new Ts,Gf=new D,Ul=new D,Nl=new D,Fl=new D,Th=new D,Ol=new D,Vf=new D,Bl=new D;class he extends Pt{constructor(e=new Tt,t=new yi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ol.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Th.fromBufferAttribute(u,e),a?Ol.addScaledVector(Th,h):Ol.addScaledVector(Th.sub(t),h))}t.add(Ol)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ll.copy(i.boundingSphere),Ll.applyMatrix4(r),Cr.copy(e.ray).recast(e.near),!(Ll.containsPoint(Cr.origin)===!1&&(Cr.intersectSphere(Ll,Gf)===null||Cr.origin.distanceToSquared(Gf)>(e.far-e.near)**2))&&(Hf.copy(r).invert(),Cr.copy(e.ray).applyMatrix4(Hf),!(i.boundingBox!==null&&Cr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Cr)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,v=d.length;_<v;_++){const m=d[_],p=a[m.materialIndex],y=Math.max(m.start,f.start),w=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let S=y,A=w;S<A;S+=3){const I=o.getX(S),P=o.getX(S+1),C=o.getX(S+2);s=kl(this,p,e,i,c,h,u,I,P,C),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=_,p=v;m<p;m+=3){const y=o.getX(m),w=o.getX(m+1),S=o.getX(m+2);s=kl(this,a,e,i,c,h,u,y,w,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,v=d.length;_<v;_++){const m=d[_],p=a[m.materialIndex],y=Math.max(m.start,f.start),w=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let S=y,A=w;S<A;S+=3){const I=S,P=S+1,C=S+2;s=kl(this,p,e,i,c,h,u,I,P,C),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=_,p=v;m<p;m+=3){const y=m,w=m+1,S=m+2;s=kl(this,a,e,i,c,h,u,y,w,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Iv(n,e,t,i,s,r,a,o){let l;if(e.side===jt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===qi,o),l===null)return null;Bl.copy(o),Bl.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Bl);return c<t.near||c>t.far?null:{distance:c,point:Bl.clone(),object:n}}function kl(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Ul),n.getVertexPosition(l,Nl),n.getVertexPosition(c,Fl);const h=Iv(n,e,t,i,Ul,Nl,Fl,Vf);if(h){const u=new D;gi.getBarycoord(Vf,Ul,Nl,Fl,u),s&&(h.uv=gi.getInterpolatedAttribute(s,o,l,c,u,new ue)),r&&(h.uv1=gi.getInterpolatedAttribute(r,o,l,c,u,new ue)),a&&(h.normal=gi.getInterpolatedAttribute(a,o,l,c,u,new D),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new D,materialIndex:0};gi.getNormal(Ul,Nl,Fl,d.normal),h.face=d,h.barycoord=u}return h}class Lt extends Tt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;_("z","y","x",-1,-1,i,t,e,a,r,0),_("z","y","x",1,-1,i,t,-e,a,r,1),_("x","z","y",1,1,e,i,t,s,a,2),_("x","z","y",1,-1,e,i,-t,s,a,3),_("x","y","z",1,-1,e,t,i,s,r,4),_("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new ht(c,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(u,2));function _(v,m,p,y,w,S,A,I,P,C,M){const E=S/P,L=A/C,G=S/2,H=A/2,z=I/2,q=P+1,X=C+1;let ie=0,Z=0;const re=new D;for(let oe=0;oe<X;oe++){const Te=oe*L-H;for(let fe=0;fe<q;fe++){const ke=fe*E-G;re[v]=ke*y,re[m]=Te*w,re[p]=z,c.push(re.x,re.y,re.z),re[v]=0,re[m]=0,re[p]=I>0?1:-1,h.push(re.x,re.y,re.z),u.push(fe/P),u.push(1-oe/C),ie+=1}}for(let oe=0;oe<C;oe++)for(let Te=0;Te<P;Te++){const fe=d+Te+q*oe,ke=d+Te+q*(oe+1),Ye=d+(Te+1)+q*(oe+1),W=d+(Te+1)+q*oe;l.push(fe,ke,W),l.push(ke,Ye,W),Z+=6}o.addGroup(f,Z,M),f+=Z,d+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ja(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Dn(n){const e={};for(let t=0;t<n.length;t++){const i=Ja(n[t]);for(const s in i)e[s]=i[s]}return e}function Lv(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function _g(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:mt.workingColorSpace}const Yd={clone:Ja,merge:Dn};var Uv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ln extends Rn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uv,this.fragmentShader=Nv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ja(e.uniforms),this.uniformsGroups=Lv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class hl extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new We,this.projectionMatrix=new We,this.projectionMatrixInverse=new We,this.coordinateSystem=Yi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const lr=new D,Wf=new ue,Xf=new ue;class yt extends hl{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ka*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Bo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ka*2*Math.atan(Math.tan(Bo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){lr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(lr.x,lr.y).multiplyScalar(-e/lr.z),lr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(lr.x,lr.y).multiplyScalar(-e/lr.z)}getViewSize(e,t){return this.getViewBounds(e,Wf,Xf),t.subVectors(Xf,Wf)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Bo*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const _a=-90,va=1;class Fv extends Pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new yt(_a,va,e,t);s.layers=this.layers,this.add(s);const r=new yt(_a,va,e,t);r.layers=this.layers,this.add(r);const a=new yt(_a,va,e,t);a.layers=this.layers,this.add(a);const o=new yt(_a,va,e,t);o.layers=this.layers,this.add(o);const l=new yt(_a,va,e,t);l.layers=this.layers,this.add(l);const c=new yt(_a,va,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Yi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===il)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class vg extends Kt{constructor(e=[],t=ja,i,s,r,a,o,l,c,h){super(e,t,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ov extends St{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new vg(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Lt(5,5,5),r=new ln({name:"CubemapFromEquirect",uniforms:Ja(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:jt,blending:An});r.uniforms.tEquirect.value=t;const a=new he(s,r),o=t.minFilter;return t.minFilter===ji&&(t.minFilter=nt),new Fv(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}let wt=class extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}};const Bv={type:"move"};class Ah{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,_=.005;c.inputState.pinching&&d>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Bv)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new wt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Zd{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new ye(e),this.near=t,this.far=i}clone(){return new Zd(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class cn extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wi,this.environmentIntensity=1,this.environmentRotation=new wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class xg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=$u,this.updateRanges=[],this.version=0,this.uuid=Zi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Cn=new D;class rl{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Cn.fromBufferAttribute(this,t),Cn.applyMatrix4(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Cn.fromBufferAttribute(this,t),Cn.applyNormalMatrix(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Cn.fromBufferAttribute(this,t),Cn.transformDirection(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Wi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Wi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Wi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Wi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Wi(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Xt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new rl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class yg extends Rn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ye(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let xa;const vo=new D,ya=new D,wa=new D,Sa=new ue,xo=new ue,wg=new We,zl=new D,yo=new D,Hl=new D,$f=new ue,Rh=new ue,jf=new ue;class kv extends Pt{constructor(e=new yg){if(super(),this.isSprite=!0,this.type="Sprite",xa===void 0){xa=new Tt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new xg(t,5);xa.setIndex([0,1,2,0,2,3]),xa.setAttribute("position",new rl(i,3,0,!1)),xa.setAttribute("uv",new rl(i,2,3,!1))}this.geometry=xa,this.material=e,this.center=new ue(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ya.setFromMatrixScale(this.matrixWorld),wg.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),wa.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ya.multiplyScalar(-wa.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const a=this.center;Gl(zl.set(-.5,-.5,0),wa,a,ya,s,r),Gl(yo.set(.5,-.5,0),wa,a,ya,s,r),Gl(Hl.set(.5,.5,0),wa,a,ya,s,r),$f.set(0,0),Rh.set(1,0),jf.set(1,1);let o=e.ray.intersectTriangle(zl,yo,Hl,!1,vo);if(o===null&&(Gl(yo.set(-.5,.5,0),wa,a,ya,s,r),Rh.set(0,1),o=e.ray.intersectTriangle(zl,Hl,yo,!1,vo),o===null))return;const l=e.ray.origin.distanceTo(vo);l<e.near||l>e.far||t.push({distance:l,point:vo.clone(),uv:gi.getInterpolation(vo,zl,yo,Hl,$f,Rh,jf,new ue),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Gl(n,e,t,i,s,r){Sa.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(xo.x=r*Sa.x-s*Sa.y,xo.y=s*Sa.x+r*Sa.y):xo.copy(Sa),n.copy(e),n.x+=xo.x,n.y+=xo.y,n.applyMatrix4(wg)}const Yf=new D,Zf=new pt,qf=new pt,zv=new D,Kf=new We,Vl=new D,Ch=new Ts,Jf=new We,Ph=new ro;class Sg extends he{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Sf,this.bindMatrix=new We,this.bindMatrixInverse=new We,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Es),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Vl),this.boundingBox.expandByPoint(Vl)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ts),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Vl),this.boundingSphere.expandByPoint(Vl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ch.copy(this.boundingSphere),Ch.applyMatrix4(s),e.ray.intersectsSphere(Ch)!==!1&&(Jf.copy(s).invert(),Ph.copy(e.ray).applyMatrix4(Jf),!(this.boundingBox!==null&&Ph.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ph)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new pt,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Sf?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===B_?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,s=this.geometry;Zf.fromBufferAttribute(s.attributes.skinIndex,e),qf.fromBufferAttribute(s.attributes.skinWeight,e),Yf.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=qf.getComponent(r);if(a!==0){const o=Zf.getComponent(r);Kf.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(zv.copy(Yf).applyMatrix4(Kf),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Mg extends Pt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class al extends Kt{constructor(e=null,t=1,i=1,s,r,a,o,l,c=wn,h=wn,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Qf=new We,Hv=new We;class qd{constructor(e=[],t=[]){this.uuid=Zi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new We)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new We;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Hv;Qf.multiplyMatrices(o,t[r]),Qf.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new qd(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new al(t,e,e,rn,Vt);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){const r=e.bones[i];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Mg),this.bones.push(a),this.boneInverses.push(new We().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=i[s];e.boneInverses.push(o.toArray())}return e}}class Qa extends Xt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ma=new We,ep=new We,Wl=[],tp=new Es,Gv=new We,wo=new he,So=new Ts;class Kd extends he{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Qa(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Gv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Es),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ma),tp.copy(e.boundingBox).applyMatrix4(Ma),this.boundingBox.union(tp)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ts),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ma),So.copy(e.boundingSphere).applyMatrix4(Ma),this.boundingSphere.union(So)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(wo.geometry=this.geometry,wo.material=this.material,wo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),So.copy(this.boundingSphere),So.applyMatrix4(i),e.ray.intersectsSphere(So)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ma),ep.multiplyMatrices(i,Ma),wo.matrixWorld=ep,wo.raycast(e,Wl);for(let a=0,o=Wl.length;a<o;a++){const l=Wl[a];l.instanceId=r,l.object=this,t.push(l)}Wl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Qa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new al(new Float32Array(s*this.count),s,this.count,jr,Vt));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Dh=new D,Vv=new D,Wv=new ot;class Hi{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Dh.subVectors(i,t).cross(Vv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Dh),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Wv.getNormalMatrix(e),s=this.coplanarPoint(Dh).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Pr=new Ts,Xv=new ue(.5,.5),Xl=new D;class Zc{constructor(e=new Hi,t=new Hi,i=new Hi,s=new Hi,r=new Hi,a=new Hi){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Yi,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],_=r[8],v=r[9],m=r[10],p=r[11],y=r[12],w=r[13],S=r[14],A=r[15];if(s[0].setComponents(c-a,f-h,p-_,A-y).normalize(),s[1].setComponents(c+a,f+h,p+_,A+y).normalize(),s[2].setComponents(c+o,f+u,p+v,A+w).normalize(),s[3].setComponents(c-o,f-u,p-v,A-w).normalize(),i)s[4].setComponents(l,d,m,S).normalize(),s[5].setComponents(c-l,f-d,p-m,A-S).normalize();else if(s[4].setComponents(c-l,f-d,p-m,A-S).normalize(),t===Yi)s[5].setComponents(c+l,f+d,p+m,A+S).normalize();else if(t===il)s[5].setComponents(l,d,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Pr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Pr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Pr)}intersectsSprite(e){Pr.center.set(0,0,0);const t=Xv.distanceTo(e.center);return Pr.radius=.7071067811865476+t,Pr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pr)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Xl.x=s.normal.x>0?e.max.x:e.min.x,Xl.y=s.normal.y>0?e.max.y:e.min.y,Xl.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Xl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class br extends Rn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Oc=new D,Bc=new D,np=new We,Mo=new ro,$l=new Ts,Ih=new D,ip=new D;class di extends Pt{constructor(e=new Tt,t=new br){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Oc.fromBufferAttribute(t,s-1),Bc.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Oc.distanceTo(Bc);e.setAttribute("lineDistance",new ht(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),$l.copy(i.boundingSphere),$l.applyMatrix4(s),$l.radius+=r,e.ray.intersectsSphere($l)===!1)return;np.copy(s).invert(),Mo.copy(e.ray).applyMatrix4(np);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){const f=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let v=f,m=_-1;v<m;v+=c){const p=h.getX(v),y=h.getX(v+1),w=jl(this,e,Mo,l,p,y,v);w&&t.push(w)}if(this.isLineLoop){const v=h.getX(_-1),m=h.getX(f),p=jl(this,e,Mo,l,v,m,_-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let v=f,m=_-1;v<m;v+=c){const p=jl(this,e,Mo,l,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){const v=jl(this,e,Mo,l,_-1,f,_-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function jl(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(Oc.fromBufferAttribute(o,s),Bc.fromBufferAttribute(o,r),t.distanceSqToSegment(Oc,Bc,Ih,ip)>i)return;Ih.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Ih);if(!(c<e.near||c>e.far))return{distance:c,point:ip.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const sp=new D,rp=new D;class ul extends di{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)sp.fromBufferAttribute(t,s),rp.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+sp.distanceTo(rp);e.setAttribute("lineDistance",new ht(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class $v extends di{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class bg extends Rn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ap=new We,Yu=new ro,Yl=new Ts,Zl=new D;class jv extends Pt{constructor(e=new Tt,t=new bg){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Yl.copy(i.boundingSphere),Yl.applyMatrix4(s),Yl.radius+=r,e.ray.intersectsSphere(Yl)===!1)return;ap.copy(s).invert(),Yu.copy(e.ray).applyMatrix4(ap);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let _=d,v=f;_<v;_++){const m=c.getX(_);Zl.fromBufferAttribute(u,m),op(Zl,m,l,s,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let _=d,v=f;_<v;_++)Zl.fromBufferAttribute(u,_),op(Zl,_,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function op(n,e,t,i,s,r,a){const o=Yu.distanceSqToPoint(n);if(o<t){const l=new D;Yu.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class ta extends Kt{constructor(e,t,i=er,s,r,a,o=wn,l=wn,c,h=Sr,u=1){if(h!==Sr&&h!==qa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new $d(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class qc extends Tt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new D,h=new ue;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=i+u/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ht(a,3)),this.setAttribute("normal",new ht(o,3)),this.setAttribute("uv",new ht(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class fn extends Tt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let _=0;const v=[],m=i/2;let p=0;y(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new ht(u,3)),this.setAttribute("normal",new ht(d,3)),this.setAttribute("uv",new ht(f,2));function y(){const S=new D,A=new D;let I=0;const P=(t-e)/i;for(let C=0;C<=r;C++){const M=[],E=C/r,L=E*(t-e)+e;for(let G=0;G<=s;G++){const H=G/s,z=H*l+o,q=Math.sin(z),X=Math.cos(z);A.x=L*q,A.y=-E*i+m,A.z=L*X,u.push(A.x,A.y,A.z),S.set(q,P,X).normalize(),d.push(S.x,S.y,S.z),f.push(H,1-E),M.push(_++)}v.push(M)}for(let C=0;C<s;C++)for(let M=0;M<r;M++){const E=v[M][C],L=v[M+1][C],G=v[M+1][C+1],H=v[M][C+1];(e>0||M!==0)&&(h.push(E,L,H),I+=3),(t>0||M!==r-1)&&(h.push(L,G,H),I+=3)}c.addGroup(p,I,0),p+=I}function w(S){const A=_,I=new ue,P=new D;let C=0;const M=S===!0?e:t,E=S===!0?1:-1;for(let G=1;G<=s;G++)u.push(0,m*E,0),d.push(0,E,0),f.push(.5,.5),_++;const L=_;for(let G=0;G<=s;G++){const z=G/s*l+o,q=Math.cos(z),X=Math.sin(z);P.x=M*X,P.y=m*E,P.z=M*q,u.push(P.x,P.y,P.z),d.push(0,E,0),I.x=q*.5+.5,I.y=X*.5*E+.5,f.push(I.x,I.y),_++}for(let G=0;G<s;G++){const H=A+G,z=L+G;S===!0?h.push(z,z+1,H):h.push(z+1,z,H),C+=3}c.addGroup(p,C,S===!0?1:2),p+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Kc extends Tt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),c(i),h(),this.setAttribute("position",new ht(r,3)),this.setAttribute("normal",new ht(r.slice(),3)),this.setAttribute("uv",new ht(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const w=new D,S=new D,A=new D;for(let I=0;I<t.length;I+=3)f(t[I+0],w),f(t[I+1],S),f(t[I+2],A),l(w,S,A,y)}function l(y,w,S,A){const I=A+1,P=[];for(let C=0;C<=I;C++){P[C]=[];const M=y.clone().lerp(S,C/I),E=w.clone().lerp(S,C/I),L=I-C;for(let G=0;G<=L;G++)G===0&&C===I?P[C][G]=M:P[C][G]=M.clone().lerp(E,G/L)}for(let C=0;C<I;C++)for(let M=0;M<2*(I-C)-1;M++){const E=Math.floor(M/2);M%2===0?(d(P[C][E+1]),d(P[C+1][E]),d(P[C][E])):(d(P[C][E+1]),d(P[C+1][E+1]),d(P[C+1][E]))}}function c(y){const w=new D;for(let S=0;S<r.length;S+=3)w.x=r[S+0],w.y=r[S+1],w.z=r[S+2],w.normalize().multiplyScalar(y),r[S+0]=w.x,r[S+1]=w.y,r[S+2]=w.z}function h(){const y=new D;for(let w=0;w<r.length;w+=3){y.x=r[w+0],y.y=r[w+1],y.z=r[w+2];const S=m(y)/2/Math.PI+.5,A=p(y)/Math.PI+.5;a.push(S,1-A)}_(),u()}function u(){for(let y=0;y<a.length;y+=6){const w=a[y+0],S=a[y+2],A=a[y+4],I=Math.max(w,S,A),P=Math.min(w,S,A);I>.9&&P<.1&&(w<.2&&(a[y+0]+=1),S<.2&&(a[y+2]+=1),A<.2&&(a[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,w){const S=y*3;w.x=e[S+0],w.y=e[S+1],w.z=e[S+2]}function _(){const y=new D,w=new D,S=new D,A=new D,I=new ue,P=new ue,C=new ue;for(let M=0,E=0;M<r.length;M+=9,E+=6){y.set(r[M+0],r[M+1],r[M+2]),w.set(r[M+3],r[M+4],r[M+5]),S.set(r[M+6],r[M+7],r[M+8]),I.set(a[E+0],a[E+1]),P.set(a[E+2],a[E+3]),C.set(a[E+4],a[E+5]),A.copy(y).add(w).add(S).divideScalar(3);const L=m(A);v(I,E+0,y,L),v(P,E+2,w,L),v(C,E+4,S,L)}}function v(y,w,S,A){A<0&&y.x===1&&(a[w]=y.x-1),S.x===0&&S.z===0&&(a[w]=A/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kc(e.vertices,e.indices,e.radius,e.details)}}class Jd extends Kc{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Jd(e.radius,e.detail)}}class Ba extends Kc{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ba(e.radius,e.detail)}}class Hn extends Tt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=e/o,d=t/l,f=[],_=[],v=[],m=[];for(let p=0;p<h;p++){const y=p*d-a;for(let w=0;w<c;w++){const S=w*u-r;_.push(S,-y,0),v.push(0,0,1),m.push(w/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const w=y+c*p,S=y+c*(p+1),A=y+1+c*(p+1),I=y+1+c*p;f.push(w,S,I),f.push(S,A,I)}this.setIndex(f),this.setAttribute("position",new ht(_,3)),this.setAttribute("normal",new ht(v,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ki extends Tt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new D,d=new D,f=[],_=[],v=[],m=[];for(let p=0;p<=i;p++){const y=[],w=p/i;let S=0;p===0&&a===0?S=.5/t:p===i&&l===Math.PI&&(S=-.5/t);for(let A=0;A<=t;A++){const I=A/t;u.x=-e*Math.cos(s+I*r)*Math.sin(a+w*o),u.y=e*Math.cos(a+w*o),u.z=e*Math.sin(s+I*r)*Math.sin(a+w*o),_.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(I+S,1-w),y.push(c++)}h.push(y)}for(let p=0;p<i;p++)for(let y=0;y<t;y++){const w=h[p][y+1],S=h[p][y],A=h[p+1][y],I=h[p+1][y+1];(p!==0||a>0)&&f.push(w,S,I),(p!==i-1||l<Math.PI)&&f.push(S,A,I)}this.setIndex(f),this.setAttribute("position",new ht(_,3)),this.setAttribute("normal",new ht(v,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ki(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Wr extends Tt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new D,u=new D,d=new D;for(let f=0;f<=i;f++)for(let _=0;_<=s;_++){const v=_/s*r,m=f/i*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(_/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let _=1;_<=s;_++){const v=(s+1)*f+_-1,m=(s+1)*(f-1)+_-1,p=(s+1)*(f-1)+_,y=(s+1)*f+_;a.push(v,m,y),a.push(m,p,y)}this.setIndex(a),this.setAttribute("position",new ht(o,3)),this.setAttribute("normal",new ht(l,3)),this.setAttribute("uv",new ht(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Qd extends Tt{constructor(e=1,t=.4,i=64,s=8,r=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:i,radialSegments:s,p:r,q:a},i=Math.floor(i),s=Math.floor(s);const o=[],l=[],c=[],h=[],u=new D,d=new D,f=new D,_=new D,v=new D,m=new D,p=new D;for(let w=0;w<=i;++w){const S=w/i*r*Math.PI*2;y(S,r,a,e,f),y(S+.01,r,a,e,_),m.subVectors(_,f),p.addVectors(_,f),v.crossVectors(m,p),p.crossVectors(v,m),v.normalize(),p.normalize();for(let A=0;A<=s;++A){const I=A/s*Math.PI*2,P=-t*Math.cos(I),C=t*Math.sin(I);u.x=f.x+(P*p.x+C*v.x),u.y=f.y+(P*p.y+C*v.y),u.z=f.z+(P*p.z+C*v.z),l.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),c.push(d.x,d.y,d.z),h.push(w/i),h.push(A/s)}}for(let w=1;w<=i;w++)for(let S=1;S<=s;S++){const A=(s+1)*(w-1)+(S-1),I=(s+1)*w+(S-1),P=(s+1)*w+S,C=(s+1)*(w-1)+S;o.push(A,I,C),o.push(I,P,C)}this.setIndex(o),this.setAttribute("position",new ht(l,3)),this.setAttribute("normal",new ht(c,3)),this.setAttribute("uv",new ht(h,2));function y(w,S,A,I,P){const C=Math.cos(w),M=Math.sin(w),E=A/S*w,L=Math.cos(E);P.x=I*(2+L)*.5*C,P.y=I*(2+L)*M*.5,P.z=I*Math.sin(E)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qd(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class ef extends Rn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new ye(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Wt extends Rn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yc,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class bi extends Wt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Yv extends Rn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yc,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Eg extends Rn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yc,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=Bd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Tg extends Rn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Mr,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Zv extends Rn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class qv extends br{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function ql(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Kv(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Jv(n){function e(s,r){return n[s]-n[r]}const t=n.length,i=new Array(t);for(let s=0;s!==t;++s)i[s]=s;return i.sort(e),i}function lp(n,e,t){const i=n.length,s=new n.constructor(i);for(let r=0,a=0;a!==i;++r){const o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=n[o+l]}return s}function Ag(n,e,t,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let a=r[i];if(a!==void 0)if(Array.isArray(a))do a=r[i],a!==void 0&&(e.push(r.time),t.push(...a)),r=n[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[i],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=n[s++];while(r!==void 0);else do a=r[i],a!==void 0&&(e.push(r.time),t.push(a)),r=n[s++];while(r!==void 0)}class dl{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break n}for(;i<a;){const o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Qv extends dl{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Mf,endingEnd:Mf}}intervalChanged_(e,t,i){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case bf:r=e,o=2*t-i;break;case Ef:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case bf:a=e,l=2*i-t;break;case Ef:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}const c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,_=(i-t)/(s-t),v=_*_,m=v*_,p=-d*m+2*d*v-d*_,y=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*_+1,w=(-1-f)*m+(1.5+f)*v+.5*_,S=f*m-f*v;for(let A=0;A!==o;++A)r[A]=p*a[h+A]+y*a[c+A]+w*a[l+A]+S*a[u+A];return r}}class ex extends dl{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(s-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}}class tx extends dl{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Qi{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ql(t,this.TimeBufferType),this.values=ql(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:ql(e.times,Array),values:ql(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new tx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ex(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Qv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case tl:t=this.InterpolantFactoryMethodDiscrete;break;case nl:t=this.InterpolantFactoryMethodLinear;break;case ah:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tl;case this.InterpolantFactoryMethodLinear:return nl;case this.InterpolantFactoryMethodSmooth:return ah}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){const i=this.times,s=i.length;let r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Kv(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===ah,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{const u=o*i,d=u-i,f=u+i;for(let _=0;_!==i;++_){const v=t[u+_];if(v!==t[d+_]||v!==t[f+_]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*i,d=a*i;for(let f=0;f!==i;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Qi.prototype.ValueTypeName="";Qi.prototype.TimeBufferType=Float32Array;Qi.prototype.ValueBufferType=Float32Array;Qi.prototype.DefaultInterpolation=nl;class ao extends Qi{constructor(e,t,i){super(e,t,i)}}ao.prototype.ValueTypeName="bool";ao.prototype.ValueBufferType=Array;ao.prototype.DefaultInterpolation=tl;ao.prototype.InterpolantFactoryMethodLinear=void 0;ao.prototype.InterpolantFactoryMethodSmooth=void 0;class Rg extends Qi{constructor(e,t,i,s){super(e,t,i,s)}}Rg.prototype.ValueTypeName="color";class eo extends Qi{constructor(e,t,i,s){super(e,t,i,s)}}eo.prototype.ValueTypeName="number";class nx extends dl{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t);let c=e*o;for(let h=c+o;c!==h;c+=4)Ht.slerpFlat(r,0,a,c-o,a,c,l);return r}}class to extends Qi{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new nx(this.times,this.values,this.getValueSize(),e)}}to.prototype.ValueTypeName="quaternion";to.prototype.InterpolantFactoryMethodSmooth=void 0;class oo extends Qi{constructor(e,t,i){super(e,t,i)}}oo.prototype.ValueTypeName="string";oo.prototype.ValueBufferType=Array;oo.prototype.DefaultInterpolation=tl;oo.prototype.InterpolantFactoryMethodLinear=void 0;oo.prototype.InterpolantFactoryMethodSmooth=void 0;class no extends Qi{constructor(e,t,i,s){super(e,t,i,s)}}no.prototype.ValueTypeName="vector";class ix{constructor(e="",t=-1,i=[],s=k_){this.name=e,this.tracks=i,this.duration=t,this.blendMode=s,this.uuid=Zi(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,s=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(rx(i[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],i=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=i.length;r!==a;++r)t.push(Qi.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(e,t,i,s){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=Jv(l);l=lp(l,1,h),c=lp(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new eo(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const s=e;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===t)return i[s];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(c)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,i));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const i=function(u,d,f,_,v){if(f.length!==0){const m=[],p=[];Ag(f,m,p,_),m.length!==0&&v.push(new u(d,m,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let _;for(_=0;_<d.length;_++)if(d[_].morphTargets)for(let v=0;v<d[_].morphTargets.length;v++)f[d[_].morphTargets[v]]=-1;for(const v in f){const m=[],p=[];for(let y=0;y!==d[_].morphTargets.length;++y){const w=d[_];m.push(w.time),p.push(w.morphTarget===v?1:0)}s.push(new eo(".morphTargetInfluence["+v+"]",m,p))}l=f.length*a}else{const f=".bones["+t[u].name+"]";i(no,f+".position",d,"pos",s),i(to,f+".quaternion",d,"rot",s),i(no,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let i=0,s=e.length;i!==s;++i){const r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function sx(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return eo;case"vector":case"vector2":case"vector3":case"vector4":return no;case"color":return Rg;case"quaternion":return to;case"bool":case"boolean":return ao;case"string":return oo}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function rx(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=sx(n.type);if(n.times===void 0){const t=[],i=[];Ag(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}const qs={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class ax{constructor(e,t,i){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.abortController=new AbortController,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],_=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return _}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const ox=new ax;class nr{constructor(e){this.manager=e!==void 0?e:ox,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}nr.DEFAULT_MATERIAL_NAME="__DEFAULT";const Us={};class lx extends Error{constructor(e,t){super(e),this.response=t}}class Qr extends nr{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=qs.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Us[e]!==void 0){Us[e].push({onLoad:t,onProgress:i,onError:s});return}Us[e]=[],Us[e].push({onLoad:t,onProgress:i,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Us[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,_=f!==0;let v=0;const m=new ReadableStream({start(p){y();function y(){u.read().then(({done:w,value:S})=>{if(w)p.close();else{v+=S.byteLength;const A=new ProgressEvent("progress",{lengthComputable:_,loaded:v,total:f});for(let I=0,P=h.length;I<P;I++){const C=h[I];C.onProgress&&C.onProgress(A)}p.enqueue(S),y()}},w=>{p.error(w)})}}});return new Response(m)}else throw new lx(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(_=>f.decode(_))}}}).then(c=>{qs.add(`file:${e}`,c);const h=Us[e];delete Us[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Us[e];if(h===void 0)throw this.manager.itemError(e),c;delete Us[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const ba=new WeakMap;class cx extends nr{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=qs.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=ba.get(a);u===void 0&&(u=[],ba.set(a,u)),u.push({onLoad:t,onError:s})}return a}const o=sl("img");function l(){h(),t&&t(this);const u=ba.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}ba.delete(this),r.manager.itemEnd(e)}function c(u){h(),s&&s(u),qs.remove(`image:${e}`);const d=ba.get(this)||[];for(let f=0;f<d.length;f++){const _=d[f];_.onError&&_.onError(u)}ba.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),qs.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class Cg extends nr{constructor(e){super(e)}load(e,t,i,s){const r=this,a=new al,o=new Qr(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(l){let c;try{c=r.parse(l)}catch(h){if(s!==void 0)s(h);else{console.error(h);return}}c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:ys,a.wrapT=c.wrapT!==void 0?c.wrapT:ys,a.magFilter=c.magFilter!==void 0?c.magFilter:nt,a.minFilter=c.minFilter!==void 0?c.minFilter:nt,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(a.colorSpace=c.colorSpace),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=ji),c.mipmapCount===1&&(a.minFilter=nt),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c)},i,s),a}}class tr extends nr{constructor(e){super(e)}load(e,t,i,s){const r=new Kt,a=new cx(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class Jc extends Pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Lh=new We,cp=new D,hp=new D;class tf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=on,this.map=null,this.mapPass=null,this.matrix=new We,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zc,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;cp.setFromMatrixPosition(e.matrixWorld),t.position.copy(cp),hp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(hp),t.updateMatrixWorld(),Lh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lh,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Lh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class hx extends tf{constructor(){super(new yt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=Ka*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class xr extends Jc{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new hx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const up=new We,bo=new D,Uh=new D;class ux extends tf{constructor(){super(new yt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new pt(2,1,1,1),new pt(0,1,1,1),new pt(3,1,1,1),new pt(1,1,1,1),new pt(3,0,1,1),new pt(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),bo.setFromMatrixPosition(e.matrixWorld),i.position.copy(bo),Uh.copy(i.position),Uh.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Uh),i.updateMatrixWorld(),s.makeTranslation(-bo.x,-bo.y,-bo.z),up.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(up,i.coordinateSystem,i.reversedDepth)}}class dx extends Jc{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new ux}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class fl extends hl{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class fx extends tf{constructor(){super(new fl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class na extends Jc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new fx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class nf extends Jc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class zo{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class px extends Tt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Nh=new WeakMap;class mx extends nr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=qs.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{if(Nh.has(a)===!0)s&&s(Nh.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return qs.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Nh.set(l,c),qs.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});qs.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class gx extends yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Qc{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const sf="\\[\\]\\.:\\/",_x=new RegExp("["+sf+"]","g"),rf="[^"+sf+"]",vx="[^"+sf.replace("\\.","")+"]",xx=/((?:WC+[\/:])*)/.source.replace("WC",rf),yx=/(WCOD+)?/.source.replace("WCOD",vx),wx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",rf),Sx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",rf),Mx=new RegExp("^"+xx+yx+wx+Sx+"$"),bx=["material","materials","bones","map"];class Ex{constructor(e,t,i){const s=i||Et.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class Et{constructor(e,t,i){this.path=t,this.parsedPath=i||Et.parseTrackName(t),this.node=Et.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new Et.Composite(e,t,i):new Et(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(_x,"")}static parseTrackName(e){const t=Mx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=i.nodeName.substring(s+1);bx.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=Et.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Et.Composite=Ex;Et.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Et.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Et.prototype.GetterByBindingType=[Et.prototype._getValue_direct,Et.prototype._getValue_array,Et.prototype._getValue_arrayElement,Et.prototype._getValue_toArray];Et.prototype.SetterByBindingTypeAndVersioning=[[Et.prototype._setValue_direct,Et.prototype._setValue_direct_setNeedsUpdate,Et.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_array,Et.prototype._setValue_array_setNeedsUpdate,Et.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_arrayElement,Et.prototype._setValue_arrayElement_setNeedsUpdate,Et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_fromArray,Et.prototype._setValue_fromArray_setNeedsUpdate,Et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class tt{constructor(e){this.value=e}clone(){return new tt(this.value.clone===void 0?this.value:this.value.clone())}}const dp=new We;class Fn{constructor(e,t,i=0,s=1/0){this.ray=new ro(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new jd,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return dp.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(dp),this}intersectObject(e,t=!0,i=[]){return Zu(e,this,i,t),i.sort(fp),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Zu(e[s],this,i,t);return i.sort(fp),i}}function fp(n,e){return n.distance-e.distance}function Zu(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)Zu(r[a],e,t,!0)}}class pp{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=lt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(lt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const mp=new D;class Ho extends Pt{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const i=new Tt,s=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let a=0,o=1,l=32;a<l;a++,o++){const c=a/l*Math.PI*2,h=o/l*Math.PI*2;s.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}i.setAttribute("position",new ht(s,3));const r=new br({fog:!1,toneMapped:!1});this.cone=new ul(i,r),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),mp.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(mp),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}class Tx extends ul{constructor(e=10,t=10,i=4473924,s=8947848){i=new ye(i),s=new ye(s);const r=t/2,a=e/t,o=e/2,l=[],c=[];for(let d=0,f=0,_=-o;d<=t;d++,_+=a){l.push(-o,0,_,o,0,_),l.push(_,0,-o,_,0,o);const v=d===r?i:s;v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3}const h=new Tt;h.setAttribute("position",new ht(l,3)),h.setAttribute("color",new ht(c,3));const u=new br({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Ax extends ul{constructor(e=10,t=16,i=8,s=64,r=4473924,a=8947848){r=new ye(r),a=new ye(a);const o=[],l=[];if(t>1)for(let u=0;u<t;u++){const d=u/t*(Math.PI*2),f=Math.sin(d)*e,_=Math.cos(d)*e;o.push(0,0,0),o.push(f,0,_);const v=u&1?r:a;l.push(v.r,v.g,v.b),l.push(v.r,v.g,v.b)}for(let u=0;u<i;u++){const d=u&1?r:a,f=e-e/i*u;for(let _=0;_<s;_++){let v=_/s*(Math.PI*2),m=Math.sin(v)*f,p=Math.cos(v)*f;o.push(m,0,p),l.push(d.r,d.g,d.b),v=(_+1)/s*(Math.PI*2),m=Math.sin(v)*f,p=Math.cos(v)*f,o.push(m,0,p),l.push(d.r,d.g,d.b)}}const c=new Tt;c.setAttribute("position",new ht(o,3)),c.setAttribute("color",new ht(l,3));const h=new br({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Kl=new D,$t=new hl;class Rx extends ul{constructor(e){const t=new Tt,i=new br({color:16777215,vertexColors:!0,toneMapped:!1}),s=[],r=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(_,v){l(_),l(v)}function l(_){s.push(0,0,0),r.push(0,0,0),a[_]===void 0&&(a[_]=[]),a[_].push(s.length/3-1)}t.setAttribute("position",new ht(s,3)),t.setAttribute("color",new ht(r,3)),super(t,i),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();const c=new ye(16755200),h=new ye(16711680),u=new ye(43775),d=new ye(16777215),f=new ye(3355443);this.setColors(c,h,u,d,f)}setColors(e,t,i,s,r){const o=this.geometry.getAttribute("color");return o.setXYZ(0,e.r,e.g,e.b),o.setXYZ(1,e.r,e.g,e.b),o.setXYZ(2,e.r,e.g,e.b),o.setXYZ(3,e.r,e.g,e.b),o.setXYZ(4,e.r,e.g,e.b),o.setXYZ(5,e.r,e.g,e.b),o.setXYZ(6,e.r,e.g,e.b),o.setXYZ(7,e.r,e.g,e.b),o.setXYZ(8,e.r,e.g,e.b),o.setXYZ(9,e.r,e.g,e.b),o.setXYZ(10,e.r,e.g,e.b),o.setXYZ(11,e.r,e.g,e.b),o.setXYZ(12,e.r,e.g,e.b),o.setXYZ(13,e.r,e.g,e.b),o.setXYZ(14,e.r,e.g,e.b),o.setXYZ(15,e.r,e.g,e.b),o.setXYZ(16,e.r,e.g,e.b),o.setXYZ(17,e.r,e.g,e.b),o.setXYZ(18,e.r,e.g,e.b),o.setXYZ(19,e.r,e.g,e.b),o.setXYZ(20,e.r,e.g,e.b),o.setXYZ(21,e.r,e.g,e.b),o.setXYZ(22,e.r,e.g,e.b),o.setXYZ(23,e.r,e.g,e.b),o.setXYZ(24,t.r,t.g,t.b),o.setXYZ(25,t.r,t.g,t.b),o.setXYZ(26,t.r,t.g,t.b),o.setXYZ(27,t.r,t.g,t.b),o.setXYZ(28,t.r,t.g,t.b),o.setXYZ(29,t.r,t.g,t.b),o.setXYZ(30,t.r,t.g,t.b),o.setXYZ(31,t.r,t.g,t.b),o.setXYZ(32,i.r,i.g,i.b),o.setXYZ(33,i.r,i.g,i.b),o.setXYZ(34,i.r,i.g,i.b),o.setXYZ(35,i.r,i.g,i.b),o.setXYZ(36,i.r,i.g,i.b),o.setXYZ(37,i.r,i.g,i.b),o.setXYZ(38,s.r,s.g,s.b),o.setXYZ(39,s.r,s.g,s.b),o.setXYZ(40,r.r,r.g,r.b),o.setXYZ(41,r.r,r.g,r.b),o.setXYZ(42,r.r,r.g,r.b),o.setXYZ(43,r.r,r.g,r.b),o.setXYZ(44,r.r,r.g,r.b),o.setXYZ(45,r.r,r.g,r.b),o.setXYZ(46,r.r,r.g,r.b),o.setXYZ(47,r.r,r.g,r.b),o.setXYZ(48,r.r,r.g,r.b),o.setXYZ(49,r.r,r.g,r.b),o.needsUpdate=!0,this}update(){const e=this.geometry,t=this.pointMap,i=1,s=1;let r,a;if($t.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)r=1,a=0;else if(this.camera.coordinateSystem===Yi)r=-1,a=1;else if(this.camera.coordinateSystem===il)r=0,a=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);Yt("c",t,e,$t,0,0,r),Yt("t",t,e,$t,0,0,a),Yt("n1",t,e,$t,-i,-s,r),Yt("n2",t,e,$t,i,-s,r),Yt("n3",t,e,$t,-i,s,r),Yt("n4",t,e,$t,i,s,r),Yt("f1",t,e,$t,-i,-s,a),Yt("f2",t,e,$t,i,-s,a),Yt("f3",t,e,$t,-i,s,a),Yt("f4",t,e,$t,i,s,a),Yt("u1",t,e,$t,i*.7,s*1.1,r),Yt("u2",t,e,$t,-i*.7,s*1.1,r),Yt("u3",t,e,$t,0,s*2,r),Yt("cf1",t,e,$t,-i,0,a),Yt("cf2",t,e,$t,i,0,a),Yt("cf3",t,e,$t,0,-s,a),Yt("cf4",t,e,$t,0,s,a),Yt("cn1",t,e,$t,-i,0,r),Yt("cn2",t,e,$t,i,0,r),Yt("cn3",t,e,$t,0,-s,r),Yt("cn4",t,e,$t,0,s,r),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function Yt(n,e,t,i,s,r,a){Kl.set(s,r,a).unproject(i);const o=e[n];if(o!==void 0){const l=t.getAttribute("position");for(let c=0,h=o.length;c<h;c++)l.setXYZ(o[c],Kl.x,Kl.y,Kl.z)}}class Pg extends bs{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function gp(n,e,t,i){const s=Cx(i);switch(t){case og:return n*e;case jr:return n*e/s.components*s.byteLength;case Gd:return n*e/s.components*s.byteLength;case Vr:return n*e*2/s.components*s.byteLength;case Vd:return n*e*2/s.components*s.byteLength;case lg:return n*e*3/s.components*s.byteLength;case rn:return n*e*4/s.components*s.byteLength;case jc:return n*e*4/s.components*s.byteLength;case yc:case wc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Sc:case Mc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case yu:case Su:return Math.max(n,16)*Math.max(e,8)/4;case xu:case wu:return Math.max(n,8)*Math.max(e,8)/2;case Mu:case bu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Eu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Tu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Au:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ru:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Cu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Pu:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Du:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Iu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Lu:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Uu:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Nu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Fu:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ou:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Bu:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ku:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case bc:case zu:case Hu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case cg:case Gu:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Vu:case Wu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Cx(n){switch(n){case on:case sg:return{byteLength:1,components:1};case wr:case rg:case Gt:return{byteLength:2,components:1};case zd:case Hd:return{byteLength:2,components:4};case er:case kd:case Vt:return{byteLength:4,components:1};case ag:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mi}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mi);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Dg(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Px(n){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((f,_)=>f.start-_.start);let d=0;for(let f=1;f<u.length;f++){const _=u[d],v=u[f];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,_=u.length;f<_;f++){const v=u[f];n.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Dx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ix=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Lx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ux=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Fx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ox=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Bx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,zx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Wx=`#ifdef USE_IRIDESCENCE
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
#endif`,Xx=`#ifdef USE_BUMPMAP
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
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,$x=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
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
	#endif
#endif`,jx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Kx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Jx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Qx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ey=`#define PI 3.141592653589793
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
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
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
} // validated`,ty=`#ifdef ENVMAP_TYPE_CUBE_UV
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
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
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
#endif`,ny=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,iy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ry=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ay=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,oy="gl_FragColor = linearToOutputTexel( gl_FragColor );",ly=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cy=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
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
#endif`,hy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,uy=`#ifdef USE_ENVMAP
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
#endif`,dy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fy=`#ifdef USE_ENVMAP
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
#endif`,py=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,my=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_y=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vy=`#ifdef USE_GRADIENTMAP
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
}`,xy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,yy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
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
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
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
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
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
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
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
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
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
#endif`,My=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,by=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ey=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ty=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ay=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ry=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
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
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
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
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Cy=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
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
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
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
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
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
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
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
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
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
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
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
}`,Py=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
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
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
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
		getSpotLightInfo( spotLight, geometryPosition, directLight );
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
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
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Dy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Iy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ly=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Uy=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ny=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fy=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Oy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,By=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ky=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zy=`#if defined( USE_POINTS_UV )
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
#endif`,Hy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$y=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,jy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
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
vec3 nonPerturbedNormal = normal;`,Zy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,qy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ky=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
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
#endif`,ew=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,nw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
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
}`,aw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ow=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,uw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
			float shadowIntensity;
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
			float shadowIntensity;
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
			float shadowIntensity;
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
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
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
		return mix( 1.0, shadow, shadowIntensity );
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
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
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
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,fw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
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
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,pw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,mw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,gw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_w=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,vw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xw=`#ifdef USE_SKINNING
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
#endif`,yw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ww=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
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
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,bw=`#ifdef USE_TRANSMISSION
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
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ew=`#ifdef USE_TRANSMISSION
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
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
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
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
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
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Tw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
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
#endif`,Aw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
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
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
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
#endif`,Rw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
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
#endif`,Cw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Pw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Dw=`uniform sampler2D t2D;
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
	#include <colorspace_fragment>
}`,Iw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
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
}`,Ow=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Bw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
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
}`,kw=`#define DISTANCE
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
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,zw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Hw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gw=`uniform float scale;
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
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vw=`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ww=`#include <common>
#include <batching_pars_vertex>
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
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
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
}`,Xw=`uniform vec3 diffuse;
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
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
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
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$w=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
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
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
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
}`,jw=`#define LAMBERT
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
#include <alphahash_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
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
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
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
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
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
}`,Zw=`#define MATCAP
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
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
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
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
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
}`,Kw=`#define NORMAL
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
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Jw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
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
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
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
}`,Qw=`#define PHONG
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
#include <alphahash_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
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
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
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
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
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
}`,tS=`#define STANDARD
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
#ifdef USE_DISPERSION
	uniform float dispersion;
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
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
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
#include <alphahash_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
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
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
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
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
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
}`,iS=`#define TOON
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
#include <alphahash_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sS=`uniform float size;
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
	#include <morphinstance_vertex>
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
}`,rS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,aS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
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
}`,oS=`uniform vec3 color;
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
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,lS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
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
}`,cS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rt={alphahash_fragment:Dx,alphahash_pars_fragment:Ix,alphamap_fragment:Lx,alphamap_pars_fragment:Ux,alphatest_fragment:Nx,alphatest_pars_fragment:Fx,aomap_fragment:Ox,aomap_pars_fragment:Bx,batching_pars_vertex:kx,batching_vertex:zx,begin_vertex:Hx,beginnormal_vertex:Gx,bsdfs:Vx,iridescence_fragment:Wx,bumpmap_pars_fragment:Xx,clipping_planes_fragment:$x,clipping_planes_pars_fragment:jx,clipping_planes_pars_vertex:Yx,clipping_planes_vertex:Zx,color_fragment:qx,color_pars_fragment:Kx,color_pars_vertex:Jx,color_vertex:Qx,common:ey,cube_uv_reflection_fragment:ty,defaultnormal_vertex:ny,displacementmap_pars_vertex:iy,displacementmap_vertex:sy,emissivemap_fragment:ry,emissivemap_pars_fragment:ay,colorspace_fragment:oy,colorspace_pars_fragment:ly,envmap_fragment:cy,envmap_common_pars_fragment:hy,envmap_pars_fragment:uy,envmap_pars_vertex:dy,envmap_physical_pars_fragment:My,envmap_vertex:fy,fog_vertex:py,fog_pars_vertex:my,fog_fragment:gy,fog_pars_fragment:_y,gradientmap_pars_fragment:vy,lightmap_pars_fragment:xy,lights_lambert_fragment:yy,lights_lambert_pars_fragment:wy,lights_pars_begin:Sy,lights_toon_fragment:by,lights_toon_pars_fragment:Ey,lights_phong_fragment:Ty,lights_phong_pars_fragment:Ay,lights_physical_fragment:Ry,lights_physical_pars_fragment:Cy,lights_fragment_begin:Py,lights_fragment_maps:Dy,lights_fragment_end:Iy,logdepthbuf_fragment:Ly,logdepthbuf_pars_fragment:Uy,logdepthbuf_pars_vertex:Ny,logdepthbuf_vertex:Fy,map_fragment:Oy,map_pars_fragment:By,map_particle_fragment:ky,map_particle_pars_fragment:zy,metalnessmap_fragment:Hy,metalnessmap_pars_fragment:Gy,morphinstance_vertex:Vy,morphcolor_vertex:Wy,morphnormal_vertex:Xy,morphtarget_pars_vertex:$y,morphtarget_vertex:jy,normal_fragment_begin:Yy,normal_fragment_maps:Zy,normal_pars_fragment:qy,normal_pars_vertex:Ky,normal_vertex:Jy,normalmap_pars_fragment:Qy,clearcoat_normal_fragment_begin:ew,clearcoat_normal_fragment_maps:tw,clearcoat_pars_fragment:nw,iridescence_pars_fragment:iw,opaque_fragment:sw,packing:rw,premultiplied_alpha_fragment:aw,project_vertex:ow,dithering_fragment:lw,dithering_pars_fragment:cw,roughnessmap_fragment:hw,roughnessmap_pars_fragment:uw,shadowmap_pars_fragment:dw,shadowmap_pars_vertex:fw,shadowmap_vertex:pw,shadowmask_pars_fragment:mw,skinbase_vertex:gw,skinning_pars_vertex:_w,skinning_vertex:vw,skinnormal_vertex:xw,specularmap_fragment:yw,specularmap_pars_fragment:ww,tonemapping_fragment:Sw,tonemapping_pars_fragment:Mw,transmission_fragment:bw,transmission_pars_fragment:Ew,uv_pars_fragment:Tw,uv_pars_vertex:Aw,uv_vertex:Rw,worldpos_vertex:Cw,background_vert:Pw,background_frag:Dw,backgroundCube_vert:Iw,backgroundCube_frag:Lw,cube_vert:Uw,cube_frag:Nw,depth_vert:Fw,depth_frag:Ow,distanceRGBA_vert:Bw,distanceRGBA_frag:kw,equirect_vert:zw,equirect_frag:Hw,linedashed_vert:Gw,linedashed_frag:Vw,meshbasic_vert:Ww,meshbasic_frag:Xw,meshlambert_vert:$w,meshlambert_frag:jw,meshmatcap_vert:Yw,meshmatcap_frag:Zw,meshnormal_vert:qw,meshnormal_frag:Kw,meshphong_vert:Jw,meshphong_frag:Qw,meshphysical_vert:eS,meshphysical_frag:tS,meshtoon_vert:nS,meshtoon_frag:iS,points_vert:sS,points_frag:rS,shadow_vert:aS,shadow_frag:oS,sprite_vert:lS,sprite_frag:cS},Pe={common:{diffuse:{value:new ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new ye(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},fs={basic:{uniforms:Dn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:Dn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new ye(0)}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:Dn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new ye(0)},specular:{value:new ye(1118481)},shininess:{value:30}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:Dn([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:Dn([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new ye(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:Dn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:Dn([Pe.points,Pe.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:Dn([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:Dn([Pe.common,Pe.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:Dn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:Dn([Pe.sprite,Pe.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distanceRGBA:{uniforms:Dn([Pe.common,Pe.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distanceRGBA_vert,fragmentShader:rt.distanceRGBA_frag},shadow:{uniforms:Dn([Pe.lights,Pe.fog,{color:{value:new ye(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};fs.physical={uniforms:Dn([fs.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new ye(0)},specularColor:{value:new ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};const Jl={r:0,b:0,g:0},Dr=new wi,hS=new We;function uS(n,e,t,i,s,r,a){const o=new ye(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function _(w){let S=w.isScene===!0?w.background:null;return S&&S.isTexture&&(S=(w.backgroundBlurriness>0?t:e).get(S)),S}function v(w){let S=!1;const A=_(w);A===null?p(o,l):A&&A.isColor&&(p(A,1),S=!0);const I=n.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,a):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,S){const A=_(S);A&&(A.isCubeTexture||A.mapping===$c)?(h===void 0&&(h=new he(new Lt(1,1,1),new ln({name:"BackgroundCubeMaterial",uniforms:Ja(fs.backgroundCube.uniforms),vertexShader:fs.backgroundCube.vertexShader,fragmentShader:fs.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,P,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Dr.copy(S.backgroundRotation),Dr.x*=-1,Dr.y*=-1,Dr.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Dr.y*=-1,Dr.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(hS.makeRotationFromEuler(Dr)),h.material.toneMapped=mt.getTransfer(A.colorSpace)!==Rt,(u!==A||d!==A.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,u=A,d=A.version,f=n.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new he(new Hn(2,2),new ln({name:"BackgroundMaterial",uniforms:Ja(fs.background.uniforms),vertexShader:fs.background.vertexShader,fragmentShader:fs.background.fragmentShader,side:qi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=mt.getTransfer(A.colorSpace)!==Rt,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||d!==A.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=A,d=A.version,f=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function p(w,S){w.getRGB(Jl,_g(n)),i.buffers.color.setClear(Jl.r,Jl.g,Jl.b,S,a)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,S=1){o.set(w),l=S,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,p(o,l)},render:v,addToRenderList:m,dispose:y}}function dS(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,a=!1;function o(E,L,G,H,z){let q=!1;const X=u(H,G,L);r!==X&&(r=X,c(r.object)),q=f(E,H,G,z),q&&_(E,H,G,z),z!==null&&e.update(z,n.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,S(E,L,G,H),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return n.createVertexArray()}function c(E){return n.bindVertexArray(E)}function h(E){return n.deleteVertexArray(E)}function u(E,L,G){const H=G.wireframe===!0;let z=i[E.id];z===void 0&&(z={},i[E.id]=z);let q=z[L.id];q===void 0&&(q={},z[L.id]=q);let X=q[H];return X===void 0&&(X=d(l()),q[H]=X),X}function d(E){const L=[],G=[],H=[];for(let z=0;z<t;z++)L[z]=0,G[z]=0,H[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:G,attributeDivisors:H,object:E,attributes:{},index:null}}function f(E,L,G,H){const z=r.attributes,q=L.attributes;let X=0;const ie=G.getAttributes();for(const Z in ie)if(ie[Z].location>=0){const oe=z[Z];let Te=q[Z];if(Te===void 0&&(Z==="instanceMatrix"&&E.instanceMatrix&&(Te=E.instanceMatrix),Z==="instanceColor"&&E.instanceColor&&(Te=E.instanceColor)),oe===void 0||oe.attribute!==Te||Te&&oe.data!==Te.data)return!0;X++}return r.attributesNum!==X||r.index!==H}function _(E,L,G,H){const z={},q=L.attributes;let X=0;const ie=G.getAttributes();for(const Z in ie)if(ie[Z].location>=0){let oe=q[Z];oe===void 0&&(Z==="instanceMatrix"&&E.instanceMatrix&&(oe=E.instanceMatrix),Z==="instanceColor"&&E.instanceColor&&(oe=E.instanceColor));const Te={};Te.attribute=oe,oe&&oe.data&&(Te.data=oe.data),z[Z]=Te,X++}r.attributes=z,r.attributesNum=X,r.index=H}function v(){const E=r.newAttributes;for(let L=0,G=E.length;L<G;L++)E[L]=0}function m(E){p(E,0)}function p(E,L){const G=r.newAttributes,H=r.enabledAttributes,z=r.attributeDivisors;G[E]=1,H[E]===0&&(n.enableVertexAttribArray(E),H[E]=1),z[E]!==L&&(n.vertexAttribDivisor(E,L),z[E]=L)}function y(){const E=r.newAttributes,L=r.enabledAttributes;for(let G=0,H=L.length;G<H;G++)L[G]!==E[G]&&(n.disableVertexAttribArray(G),L[G]=0)}function w(E,L,G,H,z,q,X){X===!0?n.vertexAttribIPointer(E,L,G,z,q):n.vertexAttribPointer(E,L,G,H,z,q)}function S(E,L,G,H){v();const z=H.attributes,q=G.getAttributes(),X=L.defaultAttributeValues;for(const ie in q){const Z=q[ie];if(Z.location>=0){let re=z[ie];if(re===void 0&&(ie==="instanceMatrix"&&E.instanceMatrix&&(re=E.instanceMatrix),ie==="instanceColor"&&E.instanceColor&&(re=E.instanceColor)),re!==void 0){const oe=re.normalized,Te=re.itemSize,fe=e.get(re);if(fe===void 0)continue;const ke=fe.buffer,Ye=fe.type,W=fe.bytesPerElement,ee=Ye===n.INT||Ye===n.UNSIGNED_INT||re.gpuType===kd;if(re.isInterleavedBufferAttribute){const ae=re.data,Ne=ae.stride,De=re.offset;if(ae.isInstancedInterleavedBuffer){for(let Le=0;Le<Z.locationSize;Le++)p(Z.location+Le,ae.meshPerAttribute);E.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Le=0;Le<Z.locationSize;Le++)m(Z.location+Le);n.bindBuffer(n.ARRAY_BUFFER,ke);for(let Le=0;Le<Z.locationSize;Le++)w(Z.location+Le,Te/Z.locationSize,Ye,oe,Ne*W,(De+Te/Z.locationSize*Le)*W,ee)}else{if(re.isInstancedBufferAttribute){for(let ae=0;ae<Z.locationSize;ae++)p(Z.location+ae,re.meshPerAttribute);E.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ae=0;ae<Z.locationSize;ae++)m(Z.location+ae);n.bindBuffer(n.ARRAY_BUFFER,ke);for(let ae=0;ae<Z.locationSize;ae++)w(Z.location+ae,Te/Z.locationSize,Ye,oe,Te*W,Te/Z.locationSize*ae*W,ee)}}else if(X!==void 0){const oe=X[ie];if(oe!==void 0)switch(oe.length){case 2:n.vertexAttrib2fv(Z.location,oe);break;case 3:n.vertexAttrib3fv(Z.location,oe);break;case 4:n.vertexAttrib4fv(Z.location,oe);break;default:n.vertexAttrib1fv(Z.location,oe)}}}}y()}function A(){C();for(const E in i){const L=i[E];for(const G in L){const H=L[G];for(const z in H)h(H[z].object),delete H[z];delete L[G]}delete i[E]}}function I(E){if(i[E.id]===void 0)return;const L=i[E.id];for(const G in L){const H=L[G];for(const z in H)h(H[z].object),delete H[z];delete L[G]}delete i[E.id]}function P(E){for(const L in i){const G=i[L];if(G[E.id]===void 0)continue;const H=G[E.id];for(const z in H)h(H[z].object),delete H[z];delete G[E.id]}}function C(){M(),a=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:M,dispose:A,releaseStatesOfGeometry:I,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function fS(n,e,t){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function a(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),t.update(h,i,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let f=0;for(let _=0;_<u;_++)f+=h[_];t.update(f,i,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<c.length;_++)a(c[_],h[_],d[_]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let _=0;for(let v=0;v<u;v++)_+=h[v]*d[v];t.update(_,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function pS(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==rn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const C=P===Gt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==on&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Vt&&!C)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=_>0,I=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:w,maxFragmentUniforms:S,vertexTextures:A,maxSamples:I}}function mS(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Hi,o=new ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||i!==0||s;return s=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const _=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!s||_===null||_.length===0||r&&!m)r?h(null):c();else{const y=r?0:i,w=y*4;let S=p.clippingState||null;l.value=S,S=h(_,d,w,f);for(let A=0;A!==w;++A)S[A]=t[A];p.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,f,_){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,_!==!0||m===null){const p=f+v*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,S=f;w!==v;++w,S+=4)a.copy(u[w]).applyMatrix4(y,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function gS(n){let e=new WeakMap;function t(a,o){return o===an?a.mapping=ja:o===vu&&(a.mapping=Ya),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===an||o===vu)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Ov(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const ka=4,_p=[.125,.215,.35,.446,.526,.582],Xr=20,Fh=new fl,vp=new ye;let Oh=null,Bh=0,kh=0,zh=!1;const Br=(1+Math.sqrt(5))/2,Ea=1/Br,xp=[new D(-Br,Ea,0),new D(Br,Ea,0),new D(-Ea,0,Br),new D(Ea,0,Br),new D(0,Br,-Ea),new D(0,Br,Ea),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],_S=new D;class kc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=_S}=r;Oh=this._renderer.getRenderTarget(),Bh=this._renderer.getActiveCubeFace(),kh=this._renderer.getActiveMipmapLevel(),zh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Oh,Bh,kh),this._renderer.xr.enabled=zh,e.scissorTest=!1,Ql(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ja||e.mapping===Ya?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Oh=this._renderer.getRenderTarget(),Bh=this._renderer.getActiveCubeFace(),kh=this._renderer.getActiveMipmapLevel(),zh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:nt,minFilter:nt,generateMipmaps:!1,type:Gt,format:rn,colorSpace:Ut,depthBuffer:!1},s=yp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yp(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vS(r)),this._blurMaterial=xS(r,e,t)}return s}_compileMaterial(e){const t=new he(this._lodPlanes[0],e);this._renderer.compile(t,Fh)}_sceneToCubeUV(e,t,i,s,r){const l=new yt(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(vp),u.toneMapping=Ss,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const v=new yi({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1}),m=new he(new Lt,v);let p=!1;const y=e.background;y?y.isColor&&(v.color.copy(y),e.background=null,p=!0):(v.color.copy(vp),p=!0);for(let w=0;w<6;w++){const S=w%3;S===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):S===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));const A=this._cubeSize;Ql(s,S*A,w>2?A:0,A,A),u.setRenderTarget(s),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===ja||e.mapping===Ya;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wp());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new he(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ql(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Fh)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=xp[(s-r-1)%xp.length];this._blur(e,r-1,r,a,o)}t.autoClear=i}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new he(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Xr-1),v=r/_,m=isFinite(r)?1+Math.floor(h*v):Xr;m>Xr&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Xr}`);const p=[];let y=0;for(let P=0;P<Xr;++P){const C=P/v,M=Math.exp(-C*C/2);p.push(M),P===0?y+=M:P<m&&(y+=2*M)}for(let P=0;P<p.length;P++)p[P]=p[P]/y;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:w}=this;d.dTheta.value=_,d.mipInt.value=w-i;const S=this._sizeLods[s],A=3*S*(s>w-ka?s-w+ka:0),I=4*(this._cubeSize-S);Ql(t,A,I,3*S,2*S),l.setRenderTarget(t),l.render(u,Fh)}}function vS(n){const e=[],t=[],i=[];let s=n;const r=n-ka+1+_p.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>n-ka?l=_p[a-n+ka-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,_=6,v=3,m=2,p=1,y=new Float32Array(v*_*f),w=new Float32Array(m*_*f),S=new Float32Array(p*_*f);for(let I=0;I<f;I++){const P=I%3*2/3-1,C=I>2?0:-1,M=[P,C,0,P+2/3,C,0,P+2/3,C+1,0,P,C,0,P+2/3,C+1,0,P,C+1,0];y.set(M,v*_*I),w.set(d,m*_*I);const E=[I,I,I,I,I,I];S.set(E,p*_*I)}const A=new Tt;A.setAttribute("position",new Xt(y,v)),A.setAttribute("uv",new Xt(w,m)),A.setAttribute("faceIndex",new Xt(S,p)),e.push(A),s>ka&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function yp(n,e,t){const i=new St(n,e,t);return i.texture.mapping=$c,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ql(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function xS(n,e,t){const i=new Float32Array(Xr),s=new D(0,1,0);return new ln({name:"SphericalGaussianBlur",defines:{n:Xr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:af(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function wp(){return new ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:af(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function Sp(){return new ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:af(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function af(){return`

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
	`}function yS(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===an||l===vu,h=l===ja||l===Ya;if(c||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new kc(n)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new kc(n)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function wS(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Ga("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function SS(n,e,t,i){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],n.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,_=u.attributes.position;let v=0;if(f!==null){const y=f.array;v=f.version;for(let w=0,S=y.length;w<S;w+=3){const A=y[w+0],I=y[w+1],P=y[w+2];d.push(A,I,I,P,P,A)}}else if(_!==void 0){const y=_.array;v=_.version;for(let w=0,S=y.length/3-1;w<S;w+=3){const A=w+0,I=w+1,P=w+2;d.push(A,I,I,P,P,A)}}else return;const m=new(dg(d)?gg:mg)(d,1);m.version=v;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function MS(n,e,t){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){n.drawElements(i,f,r,d*a),t.update(f,i,1)}function c(d,f,_){_!==0&&(n.drawElementsInstanced(i,f,r,d*a,_),t.update(f,i,_))}function h(d,f,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,d,0,_);let m=0;for(let p=0;p<_;p++)m+=f[p];t.update(m,i,1)}function u(d,f,_,v){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,d,0,v,0,_);let p=0;for(let y=0;y<_;y++)p+=f[y]*v[y];t.update(p,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function bS(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function ES(n,e,t){const i=new WeakMap,s=new pt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=i.get(o);if(d===void 0||d.count!==u){let M=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let w=0;f===!0&&(w=1),_===!0&&(w=2),v===!0&&(w=3);let S=o.attributes.position.count*w,A=1;S>e.maxTextureSize&&(A=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const I=new Float32Array(S*A*4*u),P=new fg(I,S,A,u);P.type=Vt,P.needsUpdate=!0;const C=w*4;for(let E=0;E<u;E++){const L=m[E],G=p[E],H=y[E],z=S*A*4*E;for(let q=0;q<L.count;q++){const X=q*C;f===!0&&(s.fromBufferAttribute(L,q),I[z+X+0]=s.x,I[z+X+1]=s.y,I[z+X+2]=s.z,I[z+X+3]=0),_===!0&&(s.fromBufferAttribute(G,q),I[z+X+4]=s.x,I[z+X+5]=s.y,I[z+X+6]=s.z,I[z+X+7]=0),v===!0&&(s.fromBufferAttribute(H,q),I[z+X+8]=s.x,I[z+X+9]=s.y,I[z+X+10]=s.z,I[z+X+11]=H.itemSize===4?s.w:1)}}d={count:u,texture:P,size:new ue(S,A)},i.set(o,d),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const _=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function TS(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const Ig=new Kt,Mp=new ta(1,1),Lg=new fg,Ug=new vv,Ng=new vg,bp=[],Ep=[],Tp=new Float32Array(16),Ap=new Float32Array(9),Rp=new Float32Array(4);function lo(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=bp[s];if(r===void 0&&(r=new Float32Array(s),bp[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function hn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function un(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function eh(n,e){let t=Ep[e];t===void 0&&(t=new Int32Array(e),Ep[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function AS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function RS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;n.uniform2fv(this.addr,e),un(t,e)}}function CS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(hn(t,e))return;n.uniform3fv(this.addr,e),un(t,e)}}function PS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;n.uniform4fv(this.addr,e),un(t,e)}}function DS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(hn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),un(t,e)}else{if(hn(t,i))return;Rp.set(i),n.uniformMatrix2fv(this.addr,!1,Rp),un(t,i)}}function IS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(hn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),un(t,e)}else{if(hn(t,i))return;Ap.set(i),n.uniformMatrix3fv(this.addr,!1,Ap),un(t,i)}}function LS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(hn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),un(t,e)}else{if(hn(t,i))return;Tp.set(i),n.uniformMatrix4fv(this.addr,!1,Tp),un(t,i)}}function US(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function NS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;n.uniform2iv(this.addr,e),un(t,e)}}function FS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;n.uniform3iv(this.addr,e),un(t,e)}}function OS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;n.uniform4iv(this.addr,e),un(t,e)}}function BS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function kS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;n.uniform2uiv(this.addr,e),un(t,e)}}function zS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;n.uniform3uiv(this.addr,e),un(t,e)}}function HS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;n.uniform4uiv(this.addr,e),un(t,e)}}function GS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Mp.compareFunction=ug,r=Mp):r=Ig,t.setTexture2D(e||r,s)}function VS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Ug,s)}function WS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Ng,s)}function XS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Lg,s)}function $S(n){switch(n){case 5126:return AS;case 35664:return RS;case 35665:return CS;case 35666:return PS;case 35674:return DS;case 35675:return IS;case 35676:return LS;case 5124:case 35670:return US;case 35667:case 35671:return NS;case 35668:case 35672:return FS;case 35669:case 35673:return OS;case 5125:return BS;case 36294:return kS;case 36295:return zS;case 36296:return HS;case 35678:case 36198:case 36298:case 36306:case 35682:return GS;case 35679:case 36299:case 36307:return VS;case 35680:case 36300:case 36308:case 36293:return WS;case 36289:case 36303:case 36311:case 36292:return XS}}function jS(n,e){n.uniform1fv(this.addr,e)}function YS(n,e){const t=lo(e,this.size,2);n.uniform2fv(this.addr,t)}function ZS(n,e){const t=lo(e,this.size,3);n.uniform3fv(this.addr,t)}function qS(n,e){const t=lo(e,this.size,4);n.uniform4fv(this.addr,t)}function KS(n,e){const t=lo(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function JS(n,e){const t=lo(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function QS(n,e){const t=lo(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function eM(n,e){n.uniform1iv(this.addr,e)}function tM(n,e){n.uniform2iv(this.addr,e)}function nM(n,e){n.uniform3iv(this.addr,e)}function iM(n,e){n.uniform4iv(this.addr,e)}function sM(n,e){n.uniform1uiv(this.addr,e)}function rM(n,e){n.uniform2uiv(this.addr,e)}function aM(n,e){n.uniform3uiv(this.addr,e)}function oM(n,e){n.uniform4uiv(this.addr,e)}function lM(n,e,t){const i=this.cache,s=e.length,r=eh(t,s);hn(i,r)||(n.uniform1iv(this.addr,r),un(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Ig,r[a])}function cM(n,e,t){const i=this.cache,s=e.length,r=eh(t,s);hn(i,r)||(n.uniform1iv(this.addr,r),un(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ug,r[a])}function hM(n,e,t){const i=this.cache,s=e.length,r=eh(t,s);hn(i,r)||(n.uniform1iv(this.addr,r),un(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Ng,r[a])}function uM(n,e,t){const i=this.cache,s=e.length,r=eh(t,s);hn(i,r)||(n.uniform1iv(this.addr,r),un(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Lg,r[a])}function dM(n){switch(n){case 5126:return jS;case 35664:return YS;case 35665:return ZS;case 35666:return qS;case 35674:return KS;case 35675:return JS;case 35676:return QS;case 5124:case 35670:return eM;case 35667:case 35671:return tM;case 35668:case 35672:return nM;case 35669:case 35673:return iM;case 5125:return sM;case 36294:return rM;case 36295:return aM;case 36296:return oM;case 35678:case 36198:case 36298:case 36306:case 35682:return lM;case 35679:case 36299:case 36307:return cM;case 35680:case 36300:case 36308:case 36293:return hM;case 36289:case 36303:case 36311:case 36292:return uM}}class fM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=$S(t.type)}}class pM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=dM(t.type)}}class mM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Hh=/(\w+)(\])?(\[|\.)?/g;function Cp(n,e){n.seq.push(e),n.map[e.id]=e}function gM(n,e,t){const i=n.name,s=i.length;for(Hh.lastIndex=0;;){const r=Hh.exec(i),a=Hh.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Cp(t,c===void 0?new fM(o,n,e):new pM(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new mM(o),Cp(t,u)),t=u}}}class Ec{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);gM(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Pp(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const _M=37297;let vM=0;function xM(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Dp=new ot;function yM(n){mt._getMatrix(Dp,mt.workingColorSpace,n);const e=`mat3( ${Dp.elements.map(t=>t.toFixed(4))} )`;switch(mt.getTransfer(n)){case Fc:return[e,"LinearTransferOETF"];case Rt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Ip(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+xM(n.getShaderSource(e),o)}else return r}function wM(n,e){const t=yM(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function SM(n,e){let t;switch(e){case L_:t="Linear";break;case U_:t="Reinhard";break;case N_:t="Cineon";break;case Ji:t="ACESFilmic";break;case O_:t="AgX";break;case tg:t="Neutral";break;case F_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ec=new D;function MM(){mt.getLuminanceCoefficients(ec);const n=ec.x.toFixed(4),e=ec.y.toFixed(4),t=ec.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lo).join(`
`)}function EM(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function TM(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Lo(n){return n!==""}function Lp(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Up(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const AM=/^[ \t]*#include +<([\w\d./]+)>/gm;function qu(n){return n.replace(AM,CM)}const RM=new Map;function CM(n,e){let t=rt[e];if(t===void 0){const i=RM.get(e);if(i!==void 0)t=rt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return qu(t)}const PM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Np(n){return n.replace(PM,DM)}function DM(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Fp(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function IM(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===eg?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===p_?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===sn&&(e="SHADOWMAP_TYPE_VSM"),e}function LM(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ja:case Ya:e="ENVMAP_TYPE_CUBE";break;case $c:e="ENVMAP_TYPE_CUBE_UV";break}return e}function UM(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ya:e="ENVMAP_MODE_REFRACTION";break}return e}function NM(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Bd:e="ENVMAP_BLENDING_MULTIPLY";break;case D_:e="ENVMAP_BLENDING_MIX";break;case I_:e="ENVMAP_BLENDING_ADD";break}return e}function FM(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function OM(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=IM(t),c=LM(t),h=UM(t),u=NM(t),d=FM(t),f=bM(t),_=EM(r),v=s.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Lo).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Lo).join(`
`),p.length>0&&(p+=`
`)):(m=[Fp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lo).join(`
`),p=[Fp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ss?"#define TONE_MAPPING":"",t.toneMapping!==Ss?rt.tonemapping_pars_fragment:"",t.toneMapping!==Ss?SM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,wM("linearToOutputTexel",t.outputColorSpace),MM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lo).join(`
`)),a=qu(a),a=Lp(a,t),a=Up(a,t),o=qu(o),o=Lp(o,t),o=Up(o,t),a=Np(a),o=Np(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Af?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Af?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=y+m+a,S=y+p+o,A=Pp(s,s.VERTEX_SHADER,w),I=Pp(s,s.FRAGMENT_SHADER,S);s.attachShader(v,A),s.attachShader(v,I),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function P(L){if(n.debug.checkShaderErrors){const G=s.getProgramInfoLog(v)||"",H=s.getShaderInfoLog(A)||"",z=s.getShaderInfoLog(I)||"",q=G.trim(),X=H.trim(),ie=z.trim();let Z=!0,re=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(Z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,A,I);else{const oe=Ip(s,A,"vertex"),Te=Ip(s,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+q+`
`+oe+`
`+Te)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(X===""||ie==="")&&(re=!1);re&&(L.diagnostics={runnable:Z,programLog:q,vertexShader:{log:X,prefix:m},fragmentShader:{log:ie,prefix:p}})}s.deleteShader(A),s.deleteShader(I),C=new Ec(s,v),M=TM(s,v)}let C;this.getUniforms=function(){return C===void 0&&P(this),C};let M;this.getAttributes=function(){return M===void 0&&P(this),M};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(v,_M)),E},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=vM++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=I,this}let BM=0;class kM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new zM(e),t.set(e,i)),i}}class zM{constructor(e){this.id=BM++,this.code=e,this.usedTimes=0}}function HM(n,e,t,i,s,r,a){const o=new jd,l=new kM,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,E,L,G,H){const z=G.fog,q=H.geometry,X=M.isMeshStandardMaterial?G.environment:null,ie=(M.isMeshStandardMaterial?t:e).get(M.envMap||X),Z=ie&&ie.mapping===$c?ie.image.height:null,re=_[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const oe=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Te=oe!==void 0?oe.length:0;let fe=0;q.morphAttributes.position!==void 0&&(fe=1),q.morphAttributes.normal!==void 0&&(fe=2),q.morphAttributes.color!==void 0&&(fe=3);let ke,Ye,W,ee;if(re){const _t=fs[re];ke=_t.vertexShader,Ye=_t.fragmentShader}else ke=M.vertexShader,Ye=M.fragmentShader,l.update(M),W=l.getVertexShaderID(M),ee=l.getFragmentShaderID(M);const ae=n.getRenderTarget(),Ne=n.state.buffers.depth.getReversed(),De=H.isInstancedMesh===!0,Le=H.isBatchedMesh===!0,gt=!!M.map,st=!!M.matcap,B=!!ie,Ie=!!M.aoMap,Me=!!M.lightMap,$e=!!M.bumpMap,Re=!!M.normalMap,et=!!M.displacementMap,Ae=!!M.emissiveMap,Oe=!!M.metalnessMap,Nt=!!M.roughnessMap,Mt=M.anisotropy>0,O=M.clearcoat>0,T=M.dispersion>0,Y=M.iridescence>0,te=M.sheen>0,de=M.transmission>0,ne=Mt&&!!M.anisotropyMap,ze=O&&!!M.clearcoatMap,_e=O&&!!M.clearcoatNormalMap,Fe=O&&!!M.clearcoatRoughnessMap,Ve=Y&&!!M.iridescenceMap,ve=Y&&!!M.iridescenceThicknessMap,be=te&&!!M.sheenColorMap,He=te&&!!M.sheenRoughnessMap,Ge=!!M.specularMap,Ee=!!M.specularColorMap,Xe=!!M.specularIntensityMap,k=de&&!!M.transmissionMap,xe=de&&!!M.thicknessMap,J=!!M.gradientMap,Ue=!!M.alphaMap,me=M.alphaTest>0,le=!!M.alphaHash,Be=!!M.extensions;let it=Ss;M.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(it=n.toneMapping);const At={shaderID:re,shaderType:M.type,shaderName:M.name,vertexShader:ke,fragmentShader:Ye,defines:M.defines,customVertexShaderID:W,customFragmentShaderID:ee,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Le,batchingColor:Le&&H._colorsTexture!==null,instancing:De,instancingColor:De&&H.instanceColor!==null,instancingMorph:De&&H.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ae===null?n.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Ut,alphaToCoverage:!!M.alphaToCoverage,map:gt,matcap:st,envMap:B,envMapMode:B&&ie.mapping,envMapCubeUVHeight:Z,aoMap:Ie,lightMap:Me,bumpMap:$e,normalMap:Re,displacementMap:d&&et,emissiveMap:Ae,normalMapObjectSpace:Re&&M.normalMapType===H_,normalMapTangentSpace:Re&&M.normalMapType===Yc,metalnessMap:Oe,roughnessMap:Nt,anisotropy:Mt,anisotropyMap:ne,clearcoat:O,clearcoatMap:ze,clearcoatNormalMap:_e,clearcoatRoughnessMap:Fe,dispersion:T,iridescence:Y,iridescenceMap:Ve,iridescenceThicknessMap:ve,sheen:te,sheenColorMap:be,sheenRoughnessMap:He,specularMap:Ge,specularColorMap:Ee,specularIntensityMap:Xe,transmission:de,transmissionMap:k,thicknessMap:xe,gradientMap:J,opaque:M.transparent===!1&&M.blending===qr&&M.alphaToCoverage===!1,alphaMap:Ue,alphaTest:me,alphaHash:le,combine:M.combine,mapUv:gt&&v(M.map.channel),aoMapUv:Ie&&v(M.aoMap.channel),lightMapUv:Me&&v(M.lightMap.channel),bumpMapUv:$e&&v(M.bumpMap.channel),normalMapUv:Re&&v(M.normalMap.channel),displacementMapUv:et&&v(M.displacementMap.channel),emissiveMapUv:Ae&&v(M.emissiveMap.channel),metalnessMapUv:Oe&&v(M.metalnessMap.channel),roughnessMapUv:Nt&&v(M.roughnessMap.channel),anisotropyMapUv:ne&&v(M.anisotropyMap.channel),clearcoatMapUv:ze&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:_e&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Fe&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Ve&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:ve&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:be&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:He&&v(M.sheenRoughnessMap.channel),specularMapUv:Ge&&v(M.specularMap.channel),specularColorMapUv:Ee&&v(M.specularColorMap.channel),specularIntensityMapUv:Xe&&v(M.specularIntensityMap.channel),transmissionMapUv:k&&v(M.transmissionMap.channel),thicknessMapUv:xe&&v(M.thicknessMap.channel),alphaMapUv:Ue&&v(M.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Re||Mt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!q.attributes.uv&&(gt||Ue),fog:!!z,useFog:M.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ne,skinning:H.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:fe,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:it,decodeVideoTexture:gt&&M.map.isVideoTexture===!0&&mt.getTransfer(M.map.colorSpace)===Rt,decodeVideoTextureEmissive:Ae&&M.emissiveMap.isVideoTexture===!0&&mt.getTransfer(M.emissiveMap.colorSpace)===Rt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===xn,flipSided:M.side===jt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Be&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Be&&M.extensions.multiDraw===!0||Le)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return At.vertexUv1s=c.has(1),At.vertexUv2s=c.has(2),At.vertexUv3s=c.has(3),c.clear(),At}function p(M){const E=[];if(M.shaderID?E.push(M.shaderID):(E.push(M.customVertexShaderID),E.push(M.customFragmentShaderID)),M.defines!==void 0)for(const L in M.defines)E.push(L),E.push(M.defines[L]);return M.isRawShaderMaterial===!1&&(y(E,M),w(E,M),E.push(n.outputColorSpace)),E.push(M.customProgramCacheKey),E.join()}function y(M,E){M.push(E.precision),M.push(E.outputColorSpace),M.push(E.envMapMode),M.push(E.envMapCubeUVHeight),M.push(E.mapUv),M.push(E.alphaMapUv),M.push(E.lightMapUv),M.push(E.aoMapUv),M.push(E.bumpMapUv),M.push(E.normalMapUv),M.push(E.displacementMapUv),M.push(E.emissiveMapUv),M.push(E.metalnessMapUv),M.push(E.roughnessMapUv),M.push(E.anisotropyMapUv),M.push(E.clearcoatMapUv),M.push(E.clearcoatNormalMapUv),M.push(E.clearcoatRoughnessMapUv),M.push(E.iridescenceMapUv),M.push(E.iridescenceThicknessMapUv),M.push(E.sheenColorMapUv),M.push(E.sheenRoughnessMapUv),M.push(E.specularMapUv),M.push(E.specularColorMapUv),M.push(E.specularIntensityMapUv),M.push(E.transmissionMapUv),M.push(E.thicknessMapUv),M.push(E.combine),M.push(E.fogExp2),M.push(E.sizeAttenuation),M.push(E.morphTargetsCount),M.push(E.morphAttributeCount),M.push(E.numDirLights),M.push(E.numPointLights),M.push(E.numSpotLights),M.push(E.numSpotLightMaps),M.push(E.numHemiLights),M.push(E.numRectAreaLights),M.push(E.numDirLightShadows),M.push(E.numPointLightShadows),M.push(E.numSpotLightShadows),M.push(E.numSpotLightShadowsWithMaps),M.push(E.numLightProbes),M.push(E.shadowMapType),M.push(E.toneMapping),M.push(E.numClippingPlanes),M.push(E.numClipIntersection),M.push(E.depthPacking)}function w(M,E){o.disableAll(),E.supportsVertexTextures&&o.enable(0),E.instancing&&o.enable(1),E.instancingColor&&o.enable(2),E.instancingMorph&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),E.dispersion&&o.enable(20),E.batchingColor&&o.enable(21),E.gradientMap&&o.enable(22),M.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),M.push(o.mask)}function S(M){const E=_[M.type];let L;if(E){const G=fs[E];L=Yd.clone(G.uniforms)}else L=M.uniforms;return L}function A(M,E){let L;for(let G=0,H=h.length;G<H;G++){const z=h[G];if(z.cacheKey===E){L=z,++L.usedTimes;break}}return L===void 0&&(L=new OM(n,E,M,r),h.push(L)),L}function I(M){if(--M.usedTimes===0){const E=h.indexOf(M);h[E]=h[h.length-1],h.pop(),M.destroy()}}function P(M){l.remove(M)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:A,releaseProgram:I,releaseShaderCache:P,programs:h,dispose:C}}function GM(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function VM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Op(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Bp(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u,d,f,_,v,m){let p=n[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:_,renderOrder:u.renderOrder,z:v,group:m},n[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=_,p.renderOrder=u.renderOrder,p.z=v,p.group=m),e++,p}function o(u,d,f,_,v,m){const p=a(u,d,f,_,v,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,d,f,_,v,m){const p=a(u,d,f,_,v,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||VM),i.length>1&&i.sort(d||Op),s.length>1&&s.sort(d||Op)}function h(){for(let u=e,d=n.length;u<d;u++){const f=n[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function WM(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Bp,n.set(i,[a])):s>=r.length?(a=new Bp,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function XM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new ye};break;case"SpotLight":t={position:new D,direction:new D,color:new ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new ye,groundColor:new ye};break;case"RectAreaLight":t={color:new ye,position:new D,halfWidth:new D,halfHeight:new D};break}return n[e.id]=t,t}}}function $M(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let jM=0;function YM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function ZM(n){const e=new XM,t=$M(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new D);const s=new D,r=new We,a=new We;function o(c){let h=0,u=0,d=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let f=0,_=0,v=0,m=0,p=0,y=0,w=0,S=0,A=0,I=0,P=0;c.sort(YM);for(let M=0,E=c.length;M<E;M++){const L=c[M],G=L.color,H=L.intensity,z=L.distance,q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=G.r*H,u+=G.g*H,d+=G.b*H;else if(L.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(L.sh.coefficients[X],H);P++}else if(L.isDirectionalLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const ie=L.shadow,Z=t.get(L);Z.shadowIntensity=ie.intensity,Z.shadowBias=ie.bias,Z.shadowNormalBias=ie.normalBias,Z.shadowRadius=ie.radius,Z.shadowMapSize=ie.mapSize,i.directionalShadow[f]=Z,i.directionalShadowMap[f]=q,i.directionalShadowMatrix[f]=L.shadow.matrix,y++}i.directional[f]=X,f++}else if(L.isSpotLight){const X=e.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(G).multiplyScalar(H),X.distance=z,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,i.spot[v]=X;const ie=L.shadow;if(L.map&&(i.spotLightMap[A]=L.map,A++,ie.updateMatrices(L),L.castShadow&&I++),i.spotLightMatrix[v]=ie.matrix,L.castShadow){const Z=t.get(L);Z.shadowIntensity=ie.intensity,Z.shadowBias=ie.bias,Z.shadowNormalBias=ie.normalBias,Z.shadowRadius=ie.radius,Z.shadowMapSize=ie.mapSize,i.spotShadow[v]=Z,i.spotShadowMap[v]=q,S++}v++}else if(L.isRectAreaLight){const X=e.get(L);X.color.copy(G).multiplyScalar(H),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=X,m++}else if(L.isPointLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){const ie=L.shadow,Z=t.get(L);Z.shadowIntensity=ie.intensity,Z.shadowBias=ie.bias,Z.shadowNormalBias=ie.normalBias,Z.shadowRadius=ie.radius,Z.shadowMapSize=ie.mapSize,Z.shadowCameraNear=ie.camera.near,Z.shadowCameraFar=ie.camera.far,i.pointShadow[_]=Z,i.pointShadowMap[_]=q,i.pointShadowMatrix[_]=L.shadow.matrix,w++}i.point[_]=X,_++}else if(L.isHemisphereLight){const X=e.get(L);X.skyColor.copy(L.color).multiplyScalar(H),X.groundColor.copy(L.groundColor).multiplyScalar(H),i.hemi[p]=X,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Pe.LTC_FLOAT_1,i.rectAreaLTC2=Pe.LTC_FLOAT_2):(i.rectAreaLTC1=Pe.LTC_HALF_1,i.rectAreaLTC2=Pe.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;const C=i.hash;(C.directionalLength!==f||C.pointLength!==_||C.spotLength!==v||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==y||C.numPointShadows!==w||C.numSpotShadows!==S||C.numSpotMaps!==A||C.numLightProbes!==P)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=m,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=S+A-I,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=P,C.directionalLength=f,C.pointLength=_,C.spotLength=v,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=y,C.numPointShadows=w,C.numSpotShadows=S,C.numSpotMaps=A,C.numLightProbes=P,i.version=jM++)}function l(c,h){let u=0,d=0,f=0,_=0,v=0;const m=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const w=c[p];if(w.isDirectionalLight){const S=i.directional[u];S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),u++}else if(w.isSpotLight){const S=i.spot[f];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),f++}else if(w.isRectAreaLight){const S=i.rectArea[_];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),a.identity(),r.copy(w.matrixWorld),r.premultiply(m),a.extractRotation(r),S.halfWidth.set(w.width*.5,0,0),S.halfHeight.set(0,w.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),_++}else if(w.isPointLight){const S=i.point[d];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),d++}else if(w.isHemisphereLight){const S=i.hemi[v];S.direction.setFromMatrixPosition(w.matrixWorld),S.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:i}}function kp(n){const e=new ZM(n),t=[],i=[];function s(h){c.camera=h,t.length=0,i.length=0}function r(h){t.push(h)}function a(h){i.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function qM(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new kp(n),e.set(s,[o])):r>=a.length?(o=new kp(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const KM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,JM=`uniform sampler2D shadow_pass;
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
}`;function QM(n,e,t){let i=new Zc;const s=new ue,r=new ue,a=new pt,o=new Tg({depthPacking:Wd}),l=new Zv,c={},h=t.maxTextureSize,u={[qi]:jt,[jt]:qi,[xn]:xn},d=new ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:KM,fragmentShader:JM}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const _=new Tt;_.setAttribute("position",new Xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new he(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=eg;let p=this.type;this.render=function(I,P,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||I.length===0)return;const M=n.getRenderTarget(),E=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),G=n.state;G.setBlending(An),G.buffers.depth.getReversed()?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const H=p!==sn&&this.type===sn,z=p===sn&&this.type!==sn;for(let q=0,X=I.length;q<X;q++){const ie=I[q],Z=ie.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;s.copy(Z.mapSize);const re=Z.getFrameExtents();if(s.multiply(re),r.copy(Z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/re.x),s.x=r.x*re.x,Z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/re.y),s.y=r.y*re.y,Z.mapSize.y=r.y)),Z.map===null||H===!0||z===!0){const Te=this.type!==sn?{minFilter:wn,magFilter:wn}:{};Z.map!==null&&Z.map.dispose(),Z.map=new St(s.x,s.y,Te),Z.map.texture.name=ie.name+".shadowMap",Z.camera.updateProjectionMatrix()}n.setRenderTarget(Z.map),n.clear();const oe=Z.getViewportCount();for(let Te=0;Te<oe;Te++){const fe=Z.getViewport(Te);a.set(r.x*fe.x,r.y*fe.y,r.x*fe.z,r.y*fe.w),G.viewport(a),Z.updateMatrices(ie,Te),i=Z.getFrustum(),S(P,C,Z.camera,ie,this.type)}Z.isPointLightShadow!==!0&&this.type===sn&&y(Z,C),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(M,E,L)};function y(I,P){const C=e.update(v);d.defines.VSM_SAMPLES!==I.blurSamples&&(d.defines.VSM_SAMPLES=I.blurSamples,f.defines.VSM_SAMPLES=I.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new St(s.x,s.y)),d.uniforms.shadow_pass.value=I.map.texture,d.uniforms.resolution.value=I.mapSize,d.uniforms.radius.value=I.radius,n.setRenderTarget(I.mapPass),n.clear(),n.renderBufferDirect(P,null,C,d,v,null),f.uniforms.shadow_pass.value=I.mapPass.texture,f.uniforms.resolution.value=I.mapSize,f.uniforms.radius.value=I.radius,n.setRenderTarget(I.map),n.clear(),n.renderBufferDirect(P,null,C,f,v,null)}function w(I,P,C,M){let E=null;const L=C.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(L!==void 0)E=L;else if(E=C.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const G=E.uuid,H=P.uuid;let z=c[G];z===void 0&&(z={},c[G]=z);let q=z[H];q===void 0&&(q=E.clone(),z[H]=q,P.addEventListener("dispose",A)),E=q}if(E.visible=P.visible,E.wireframe=P.wireframe,M===sn?E.side=P.shadowSide!==null?P.shadowSide:P.side:E.side=P.shadowSide!==null?P.shadowSide:u[P.side],E.alphaMap=P.alphaMap,E.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,E.map=P.map,E.clipShadows=P.clipShadows,E.clippingPlanes=P.clippingPlanes,E.clipIntersection=P.clipIntersection,E.displacementMap=P.displacementMap,E.displacementScale=P.displacementScale,E.displacementBias=P.displacementBias,E.wireframeLinewidth=P.wireframeLinewidth,E.linewidth=P.linewidth,C.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const G=n.properties.get(E);G.light=C}return E}function S(I,P,C,M,E){if(I.visible===!1)return;if(I.layers.test(P.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&E===sn)&&(!I.frustumCulled||i.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,I.matrixWorld);const H=e.update(I),z=I.material;if(Array.isArray(z)){const q=H.groups;for(let X=0,ie=q.length;X<ie;X++){const Z=q[X],re=z[Z.materialIndex];if(re&&re.visible){const oe=w(I,re,M,E);I.onBeforeShadow(n,I,P,C,H,oe,Z),n.renderBufferDirect(C,null,H,oe,I,Z),I.onAfterShadow(n,I,P,C,H,oe,Z)}}}else if(z.visible){const q=w(I,z,M,E);I.onBeforeShadow(n,I,P,C,H,q,null),n.renderBufferDirect(C,null,H,q,I,null),I.onAfterShadow(n,I,P,C,H,q,null)}}const G=I.children;for(let H=0,z=G.length;H<z;H++)S(G[H],P,C,M,E)}function A(I){I.target.removeEventListener("dispose",A);for(const C in c){const M=c[C],E=I.target.uuid;E in M&&(M[E].dispose(),delete M[E])}}}const eb={[Dc]:Ic,[Qo]:Uc,[$a]:el,[Jr]:Lc,[Ic]:Dc,[Uc]:Qo,[el]:$a,[Lc]:Jr};function tb(n,e){function t(){let k=!1;const xe=new pt;let J=null;const Ue=new pt(0,0,0,0);return{setMask:function(me){J!==me&&!k&&(n.colorMask(me,me,me,me),J=me)},setLocked:function(me){k=me},setClear:function(me,le,Be,it,At){At===!0&&(me*=it,le*=it,Be*=it),xe.set(me,le,Be,it),Ue.equals(xe)===!1&&(n.clearColor(me,le,Be,it),Ue.copy(xe))},reset:function(){k=!1,J=null,Ue.set(-1,0,0,0)}}}function i(){let k=!1,xe=!1,J=null,Ue=null,me=null;return{setReversed:function(le){if(xe!==le){const Be=e.get("EXT_clip_control");le?Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.ZERO_TO_ONE_EXT):Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.NEGATIVE_ONE_TO_ONE_EXT),xe=le;const it=me;me=null,this.setClear(it)}},getReversed:function(){return xe},setTest:function(le){le?ae(n.DEPTH_TEST):Ne(n.DEPTH_TEST)},setMask:function(le){J!==le&&!k&&(n.depthMask(le),J=le)},setFunc:function(le){if(xe&&(le=eb[le]),Ue!==le){switch(le){case Dc:n.depthFunc(n.NEVER);break;case Ic:n.depthFunc(n.ALWAYS);break;case Qo:n.depthFunc(n.LESS);break;case Jr:n.depthFunc(n.LEQUAL);break;case $a:n.depthFunc(n.EQUAL);break;case Lc:n.depthFunc(n.GEQUAL);break;case Uc:n.depthFunc(n.GREATER);break;case el:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ue=le}},setLocked:function(le){k=le},setClear:function(le){me!==le&&(xe&&(le=1-le),n.clearDepth(le),me=le)},reset:function(){k=!1,J=null,Ue=null,me=null,xe=!1}}}function s(){let k=!1,xe=null,J=null,Ue=null,me=null,le=null,Be=null,it=null,At=null;return{setTest:function(_t){k||(_t?ae(n.STENCIL_TEST):Ne(n.STENCIL_TEST))},setMask:function(_t){xe!==_t&&!k&&(n.stencilMask(_t),xe=_t)},setFunc:function(_t,Ei,ii){(J!==_t||Ue!==Ei||me!==ii)&&(n.stencilFunc(_t,Ei,ii),J=_t,Ue=Ei,me=ii)},setOp:function(_t,Ei,ii){(le!==_t||Be!==Ei||it!==ii)&&(n.stencilOp(_t,Ei,ii),le=_t,Be=Ei,it=ii)},setLocked:function(_t){k=_t},setClear:function(_t){At!==_t&&(n.clearStencil(_t),At=_t)},reset:function(){k=!1,xe=null,J=null,Ue=null,me=null,le=null,Be=null,it=null,At=null}}}const r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],_=null,v=!1,m=null,p=null,y=null,w=null,S=null,A=null,I=null,P=new ye(0,0,0),C=0,M=!1,E=null,L=null,G=null,H=null,z=null;const q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,ie=0;const Z=n.getParameter(n.VERSION);Z.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(Z)[1]),X=ie>=1):Z.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),X=ie>=2);let re=null,oe={};const Te=n.getParameter(n.SCISSOR_BOX),fe=n.getParameter(n.VIEWPORT),ke=new pt().fromArray(Te),Ye=new pt().fromArray(fe);function W(k,xe,J,Ue){const me=new Uint8Array(4),le=n.createTexture();n.bindTexture(k,le),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Be=0;Be<J;Be++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(xe,0,n.RGBA,1,1,Ue,0,n.RGBA,n.UNSIGNED_BYTE,me):n.texImage2D(xe+Be,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,me);return le}const ee={};ee[n.TEXTURE_2D]=W(n.TEXTURE_2D,n.TEXTURE_2D,1),ee[n.TEXTURE_CUBE_MAP]=W(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[n.TEXTURE_2D_ARRAY]=W(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ee[n.TEXTURE_3D]=W(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ae(n.DEPTH_TEST),a.setFunc(Jr),$e(!1),Re(vf),ae(n.CULL_FACE),Ie(An);function ae(k){h[k]!==!0&&(n.enable(k),h[k]=!0)}function Ne(k){h[k]!==!1&&(n.disable(k),h[k]=!1)}function De(k,xe){return u[k]!==xe?(n.bindFramebuffer(k,xe),u[k]=xe,k===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=xe),k===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=xe),!0):!1}function Le(k,xe){let J=f,Ue=!1;if(k){J=d.get(xe),J===void 0&&(J=[],d.set(xe,J));const me=k.textures;if(J.length!==me.length||J[0]!==n.COLOR_ATTACHMENT0){for(let le=0,Be=me.length;le<Be;le++)J[le]=n.COLOR_ATTACHMENT0+le;J.length=me.length,Ue=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,Ue=!0);Ue&&n.drawBuffers(J)}function gt(k){return _!==k?(n.useProgram(k),_=k,!0):!1}const st={[Gr]:n.FUNC_ADD,[m_]:n.FUNC_SUBTRACT,[g_]:n.FUNC_REVERSE_SUBTRACT};st[__]=n.MIN,st[v_]=n.MAX;const B={[x_]:n.ZERO,[Od]:n.ONE,[y_]:n.SRC_COLOR,[Pc]:n.SRC_ALPHA,[T_]:n.SRC_ALPHA_SATURATE,[b_]:n.DST_COLOR,[S_]:n.DST_ALPHA,[w_]:n.ONE_MINUS_SRC_COLOR,[_u]:n.ONE_MINUS_SRC_ALPHA,[E_]:n.ONE_MINUS_DST_COLOR,[M_]:n.ONE_MINUS_DST_ALPHA,[A_]:n.CONSTANT_COLOR,[R_]:n.ONE_MINUS_CONSTANT_COLOR,[C_]:n.CONSTANT_ALPHA,[P_]:n.ONE_MINUS_CONSTANT_ALPHA};function Ie(k,xe,J,Ue,me,le,Be,it,At,_t){if(k===An){v===!0&&(Ne(n.BLEND),v=!1);return}if(v===!1&&(ae(n.BLEND),v=!0),k!==Fd){if(k!==m||_t!==M){if((p!==Gr||S!==Gr)&&(n.blendEquation(n.FUNC_ADD),p=Gr,S=Gr),_t)switch(k){case qr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xf:n.blendFunc(n.ONE,n.ONE);break;case yf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case wf:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case qr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xf:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case yf:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wf:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}y=null,w=null,A=null,I=null,P.set(0,0,0),C=0,m=k,M=_t}return}me=me||xe,le=le||J,Be=Be||Ue,(xe!==p||me!==S)&&(n.blendEquationSeparate(st[xe],st[me]),p=xe,S=me),(J!==y||Ue!==w||le!==A||Be!==I)&&(n.blendFuncSeparate(B[J],B[Ue],B[le],B[Be]),y=J,w=Ue,A=le,I=Be),(it.equals(P)===!1||At!==C)&&(n.blendColor(it.r,it.g,it.b,At),P.copy(it),C=At),m=k,M=!1}function Me(k,xe){k.side===xn?Ne(n.CULL_FACE):ae(n.CULL_FACE);let J=k.side===jt;xe&&(J=!J),$e(J),k.blending===qr&&k.transparent===!1?Ie(An):Ie(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);const Ue=k.stencilWrite;o.setTest(Ue),Ue&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ae(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?ae(n.SAMPLE_ALPHA_TO_COVERAGE):Ne(n.SAMPLE_ALPHA_TO_COVERAGE)}function $e(k){E!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),E=k)}function Re(k){k!==d_?(ae(n.CULL_FACE),k!==L&&(k===vf?n.cullFace(n.BACK):k===f_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ne(n.CULL_FACE),L=k}function et(k){k!==G&&(X&&n.lineWidth(k),G=k)}function Ae(k,xe,J){k?(ae(n.POLYGON_OFFSET_FILL),(H!==xe||z!==J)&&(n.polygonOffset(xe,J),H=xe,z=J)):Ne(n.POLYGON_OFFSET_FILL)}function Oe(k){k?ae(n.SCISSOR_TEST):Ne(n.SCISSOR_TEST)}function Nt(k){k===void 0&&(k=n.TEXTURE0+q-1),re!==k&&(n.activeTexture(k),re=k)}function Mt(k,xe,J){J===void 0&&(re===null?J=n.TEXTURE0+q-1:J=re);let Ue=oe[J];Ue===void 0&&(Ue={type:void 0,texture:void 0},oe[J]=Ue),(Ue.type!==k||Ue.texture!==xe)&&(re!==J&&(n.activeTexture(J),re=J),n.bindTexture(k,xe||ee[k]),Ue.type=k,Ue.texture=xe)}function O(){const k=oe[re];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function T(){try{n.compressedTexImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Y(){try{n.compressedTexImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function te(){try{n.texSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function de(){try{n.texSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ne(){try{n.compressedTexSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ze(){try{n.compressedTexSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function _e(){try{n.texStorage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Fe(){try{n.texStorage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ve(){try{n.texImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ve(){try{n.texImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function be(k){ke.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),ke.copy(k))}function He(k){Ye.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),Ye.copy(k))}function Ge(k,xe){let J=c.get(xe);J===void 0&&(J=new WeakMap,c.set(xe,J));let Ue=J.get(k);Ue===void 0&&(Ue=n.getUniformBlockIndex(xe,k.name),J.set(k,Ue))}function Ee(k,xe){const Ue=c.get(xe).get(k);l.get(xe)!==Ue&&(n.uniformBlockBinding(xe,Ue,k.__bindingPointIndex),l.set(xe,Ue))}function Xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},re=null,oe={},u={},d=new WeakMap,f=[],_=null,v=!1,m=null,p=null,y=null,w=null,S=null,A=null,I=null,P=new ye(0,0,0),C=0,M=!1,E=null,L=null,G=null,H=null,z=null,ke.set(0,0,n.canvas.width,n.canvas.height),Ye.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ae,disable:Ne,bindFramebuffer:De,drawBuffers:Le,useProgram:gt,setBlending:Ie,setMaterial:Me,setFlipSided:$e,setCullFace:Re,setLineWidth:et,setPolygonOffset:Ae,setScissorTest:Oe,activeTexture:Nt,bindTexture:Mt,unbindTexture:O,compressedTexImage2D:T,compressedTexImage3D:Y,texImage2D:Ve,texImage3D:ve,updateUBOMapping:Ge,uniformBlockBinding:Ee,texStorage2D:_e,texStorage3D:Fe,texSubImage2D:te,texSubImage3D:de,compressedTexSubImage2D:ne,compressedTexSubImage3D:ze,scissor:be,viewport:He,reset:Xe}}function nb(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ue,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(O,T){return f?new OffscreenCanvas(O,T):sl("canvas")}function v(O,T,Y){let te=1;const de=Mt(O);if((de.width>Y||de.height>Y)&&(te=Y/Math.max(de.width,de.height)),te<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const ne=Math.floor(te*de.width),ze=Math.floor(te*de.height);u===void 0&&(u=_(ne,ze));const _e=T?_(ne,ze):u;return _e.width=ne,_e.height=ze,_e.getContext("2d").drawImage(O,0,0,ne,ze),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+de.width+"x"+de.height+") to ("+ne+"x"+ze+")."),_e}else return"data"in O&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+de.width+"x"+de.height+")."),O;return O}function m(O){return O.generateMipmaps}function p(O){n.generateMipmap(O)}function y(O){return O.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?n.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(O,T,Y,te,de=!1){if(O!==null){if(n[O]!==void 0)return n[O];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let ne=T;if(T===n.RED&&(Y===n.FLOAT&&(ne=n.R32F),Y===n.HALF_FLOAT&&(ne=n.R16F),Y===n.UNSIGNED_BYTE&&(ne=n.R8)),T===n.RED_INTEGER&&(Y===n.UNSIGNED_BYTE&&(ne=n.R8UI),Y===n.UNSIGNED_SHORT&&(ne=n.R16UI),Y===n.UNSIGNED_INT&&(ne=n.R32UI),Y===n.BYTE&&(ne=n.R8I),Y===n.SHORT&&(ne=n.R16I),Y===n.INT&&(ne=n.R32I)),T===n.RG&&(Y===n.FLOAT&&(ne=n.RG32F),Y===n.HALF_FLOAT&&(ne=n.RG16F),Y===n.UNSIGNED_BYTE&&(ne=n.RG8)),T===n.RG_INTEGER&&(Y===n.UNSIGNED_BYTE&&(ne=n.RG8UI),Y===n.UNSIGNED_SHORT&&(ne=n.RG16UI),Y===n.UNSIGNED_INT&&(ne=n.RG32UI),Y===n.BYTE&&(ne=n.RG8I),Y===n.SHORT&&(ne=n.RG16I),Y===n.INT&&(ne=n.RG32I)),T===n.RGB_INTEGER&&(Y===n.UNSIGNED_BYTE&&(ne=n.RGB8UI),Y===n.UNSIGNED_SHORT&&(ne=n.RGB16UI),Y===n.UNSIGNED_INT&&(ne=n.RGB32UI),Y===n.BYTE&&(ne=n.RGB8I),Y===n.SHORT&&(ne=n.RGB16I),Y===n.INT&&(ne=n.RGB32I)),T===n.RGBA_INTEGER&&(Y===n.UNSIGNED_BYTE&&(ne=n.RGBA8UI),Y===n.UNSIGNED_SHORT&&(ne=n.RGBA16UI),Y===n.UNSIGNED_INT&&(ne=n.RGBA32UI),Y===n.BYTE&&(ne=n.RGBA8I),Y===n.SHORT&&(ne=n.RGBA16I),Y===n.INT&&(ne=n.RGBA32I)),T===n.RGB&&Y===n.UNSIGNED_INT_5_9_9_9_REV&&(ne=n.RGB9_E5),T===n.RGBA){const ze=de?Fc:mt.getTransfer(te);Y===n.FLOAT&&(ne=n.RGBA32F),Y===n.HALF_FLOAT&&(ne=n.RGBA16F),Y===n.UNSIGNED_BYTE&&(ne=ze===Rt?n.SRGB8_ALPHA8:n.RGBA8),Y===n.UNSIGNED_SHORT_4_4_4_4&&(ne=n.RGBA4),Y===n.UNSIGNED_SHORT_5_5_5_1&&(ne=n.RGB5_A1)}return(ne===n.R16F||ne===n.R32F||ne===n.RG16F||ne===n.RG32F||ne===n.RGBA16F||ne===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function S(O,T){let Y;return O?T===null||T===er||T===Za?Y=n.DEPTH24_STENCIL8:T===Vt?Y=n.DEPTH32F_STENCIL8:T===wr&&(Y=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===er||T===Za?Y=n.DEPTH_COMPONENT24:T===Vt?Y=n.DEPTH_COMPONENT32F:T===wr&&(Y=n.DEPTH_COMPONENT16),Y}function A(O,T){return m(O)===!0||O.isFramebufferTexture&&O.minFilter!==wn&&O.minFilter!==nt?Math.log2(Math.max(T.width,T.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?T.mipmaps.length:1}function I(O){const T=O.target;T.removeEventListener("dispose",I),C(T),T.isVideoTexture&&h.delete(T)}function P(O){const T=O.target;T.removeEventListener("dispose",P),E(T)}function C(O){const T=i.get(O);if(T.__webglInit===void 0)return;const Y=O.source,te=d.get(Y);if(te){const de=te[T.__cacheKey];de.usedTimes--,de.usedTimes===0&&M(O),Object.keys(te).length===0&&d.delete(Y)}i.remove(O)}function M(O){const T=i.get(O);n.deleteTexture(T.__webglTexture);const Y=O.source,te=d.get(Y);delete te[T.__cacheKey],a.memory.textures--}function E(O){const T=i.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),i.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(T.__webglFramebuffer[te]))for(let de=0;de<T.__webglFramebuffer[te].length;de++)n.deleteFramebuffer(T.__webglFramebuffer[te][de]);else n.deleteFramebuffer(T.__webglFramebuffer[te]);T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer[te])}else{if(Array.isArray(T.__webglFramebuffer))for(let te=0;te<T.__webglFramebuffer.length;te++)n.deleteFramebuffer(T.__webglFramebuffer[te]);else n.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&n.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let te=0;te<T.__webglColorRenderbuffer.length;te++)T.__webglColorRenderbuffer[te]&&n.deleteRenderbuffer(T.__webglColorRenderbuffer[te]);T.__webglDepthRenderbuffer&&n.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const Y=O.textures;for(let te=0,de=Y.length;te<de;te++){const ne=i.get(Y[te]);ne.__webglTexture&&(n.deleteTexture(ne.__webglTexture),a.memory.textures--),i.remove(Y[te])}i.remove(O)}let L=0;function G(){L=0}function H(){const O=L;return O>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+s.maxTextures),L+=1,O}function z(O){const T=[];return T.push(O.wrapS),T.push(O.wrapT),T.push(O.wrapR||0),T.push(O.magFilter),T.push(O.minFilter),T.push(O.anisotropy),T.push(O.internalFormat),T.push(O.format),T.push(O.type),T.push(O.generateMipmaps),T.push(O.premultiplyAlpha),T.push(O.flipY),T.push(O.unpackAlignment),T.push(O.colorSpace),T.join()}function q(O,T){const Y=i.get(O);if(O.isVideoTexture&&Oe(O),O.isRenderTargetTexture===!1&&O.isExternalTexture!==!0&&O.version>0&&Y.__version!==O.version){const te=O.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ee(Y,O,T);return}}else O.isExternalTexture&&(Y.__webglTexture=O.sourceTexture?O.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,Y.__webglTexture,n.TEXTURE0+T)}function X(O,T){const Y=i.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&Y.__version!==O.version){ee(Y,O,T);return}t.bindTexture(n.TEXTURE_2D_ARRAY,Y.__webglTexture,n.TEXTURE0+T)}function ie(O,T){const Y=i.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&Y.__version!==O.version){ee(Y,O,T);return}t.bindTexture(n.TEXTURE_3D,Y.__webglTexture,n.TEXTURE0+T)}function Z(O,T){const Y=i.get(O);if(O.version>0&&Y.__version!==O.version){ae(Y,O,T);return}t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture,n.TEXTURE0+T)}const re={[$i]:n.REPEAT,[ys]:n.CLAMP_TO_EDGE,[Nc]:n.MIRRORED_REPEAT},oe={[wn]:n.NEAREST,[ig]:n.NEAREST_MIPMAP_NEAREST,[Io]:n.NEAREST_MIPMAP_LINEAR,[nt]:n.LINEAR,[xc]:n.LINEAR_MIPMAP_NEAREST,[ji]:n.LINEAR_MIPMAP_LINEAR},Te={[G_]:n.NEVER,[Y_]:n.ALWAYS,[V_]:n.LESS,[ug]:n.LEQUAL,[W_]:n.EQUAL,[j_]:n.GEQUAL,[X_]:n.GREATER,[$_]:n.NOTEQUAL};function fe(O,T){if(T.type===Vt&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===nt||T.magFilter===xc||T.magFilter===Io||T.magFilter===ji||T.minFilter===nt||T.minFilter===xc||T.minFilter===Io||T.minFilter===ji)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(O,n.TEXTURE_WRAP_S,re[T.wrapS]),n.texParameteri(O,n.TEXTURE_WRAP_T,re[T.wrapT]),(O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY)&&n.texParameteri(O,n.TEXTURE_WRAP_R,re[T.wrapR]),n.texParameteri(O,n.TEXTURE_MAG_FILTER,oe[T.magFilter]),n.texParameteri(O,n.TEXTURE_MIN_FILTER,oe[T.minFilter]),T.compareFunction&&(n.texParameteri(O,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(O,n.TEXTURE_COMPARE_FUNC,Te[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===wn||T.minFilter!==Io&&T.minFilter!==ji||T.type===Vt&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||i.get(T).__currentAnisotropy){const Y=e.get("EXT_texture_filter_anisotropic");n.texParameterf(O,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy}}}function ke(O,T){let Y=!1;O.__webglInit===void 0&&(O.__webglInit=!0,T.addEventListener("dispose",I));const te=T.source;let de=d.get(te);de===void 0&&(de={},d.set(te,de));const ne=z(T);if(ne!==O.__cacheKey){de[ne]===void 0&&(de[ne]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,Y=!0),de[ne].usedTimes++;const ze=de[O.__cacheKey];ze!==void 0&&(de[O.__cacheKey].usedTimes--,ze.usedTimes===0&&M(T)),O.__cacheKey=ne,O.__webglTexture=de[ne].texture}return Y}function Ye(O,T,Y){return Math.floor(Math.floor(O/Y)/T)}function W(O,T,Y,te){const ne=O.updateRanges;if(ne.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,T.width,T.height,Y,te,T.data);else{ne.sort((ve,be)=>ve.start-be.start);let ze=0;for(let ve=1;ve<ne.length;ve++){const be=ne[ze],He=ne[ve],Ge=be.start+be.count,Ee=Ye(He.start,T.width,4),Xe=Ye(be.start,T.width,4);He.start<=Ge+1&&Ee===Xe&&Ye(He.start+He.count-1,T.width,4)===Ee?be.count=Math.max(be.count,He.start+He.count-be.start):(++ze,ne[ze]=He)}ne.length=ze+1;const _e=n.getParameter(n.UNPACK_ROW_LENGTH),Fe=n.getParameter(n.UNPACK_SKIP_PIXELS),Ve=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,T.width);for(let ve=0,be=ne.length;ve<be;ve++){const He=ne[ve],Ge=Math.floor(He.start/4),Ee=Math.ceil(He.count/4),Xe=Ge%T.width,k=Math.floor(Ge/T.width),xe=Ee,J=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Xe),n.pixelStorei(n.UNPACK_SKIP_ROWS,k),t.texSubImage2D(n.TEXTURE_2D,0,Xe,k,xe,J,Y,te,T.data)}O.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,_e),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Fe),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ve)}}function ee(O,T,Y){let te=n.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(te=n.TEXTURE_2D_ARRAY),T.isData3DTexture&&(te=n.TEXTURE_3D);const de=ke(O,T),ne=T.source;t.bindTexture(te,O.__webglTexture,n.TEXTURE0+Y);const ze=i.get(ne);if(ne.version!==ze.__version||de===!0){t.activeTexture(n.TEXTURE0+Y);const _e=mt.getPrimaries(mt.workingColorSpace),Fe=T.colorSpace===gs?null:mt.getPrimaries(T.colorSpace),Ve=T.colorSpace===gs||_e===Fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve);let ve=v(T.image,!1,s.maxTextureSize);ve=Nt(T,ve);const be=r.convert(T.format,T.colorSpace),He=r.convert(T.type);let Ge=w(T.internalFormat,be,He,T.colorSpace,T.isVideoTexture);fe(te,T);let Ee;const Xe=T.mipmaps,k=T.isVideoTexture!==!0,xe=ze.__version===void 0||de===!0,J=ne.dataReady,Ue=A(T,ve);if(T.isDepthTexture)Ge=S(T.format===qa,T.type),xe&&(k?t.texStorage2D(n.TEXTURE_2D,1,Ge,ve.width,ve.height):t.texImage2D(n.TEXTURE_2D,0,Ge,ve.width,ve.height,0,be,He,null));else if(T.isDataTexture)if(Xe.length>0){k&&xe&&t.texStorage2D(n.TEXTURE_2D,Ue,Ge,Xe[0].width,Xe[0].height);for(let me=0,le=Xe.length;me<le;me++)Ee=Xe[me],k?J&&t.texSubImage2D(n.TEXTURE_2D,me,0,0,Ee.width,Ee.height,be,He,Ee.data):t.texImage2D(n.TEXTURE_2D,me,Ge,Ee.width,Ee.height,0,be,He,Ee.data);T.generateMipmaps=!1}else k?(xe&&t.texStorage2D(n.TEXTURE_2D,Ue,Ge,ve.width,ve.height),J&&W(T,ve,be,He)):t.texImage2D(n.TEXTURE_2D,0,Ge,ve.width,ve.height,0,be,He,ve.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){k&&xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ue,Ge,Xe[0].width,Xe[0].height,ve.depth);for(let me=0,le=Xe.length;me<le;me++)if(Ee=Xe[me],T.format!==rn)if(be!==null)if(k){if(J)if(T.layerUpdates.size>0){const Be=gp(Ee.width,Ee.height,T.format,T.type);for(const it of T.layerUpdates){const At=Ee.data.subarray(it*Be/Ee.data.BYTES_PER_ELEMENT,(it+1)*Be/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,me,0,0,it,Ee.width,Ee.height,1,be,At)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,me,0,0,0,Ee.width,Ee.height,ve.depth,be,Ee.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,me,Ge,Ee.width,Ee.height,ve.depth,0,Ee.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else k?J&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,me,0,0,0,Ee.width,Ee.height,ve.depth,be,He,Ee.data):t.texImage3D(n.TEXTURE_2D_ARRAY,me,Ge,Ee.width,Ee.height,ve.depth,0,be,He,Ee.data)}else{k&&xe&&t.texStorage2D(n.TEXTURE_2D,Ue,Ge,Xe[0].width,Xe[0].height);for(let me=0,le=Xe.length;me<le;me++)Ee=Xe[me],T.format!==rn?be!==null?k?J&&t.compressedTexSubImage2D(n.TEXTURE_2D,me,0,0,Ee.width,Ee.height,be,Ee.data):t.compressedTexImage2D(n.TEXTURE_2D,me,Ge,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?J&&t.texSubImage2D(n.TEXTURE_2D,me,0,0,Ee.width,Ee.height,be,He,Ee.data):t.texImage2D(n.TEXTURE_2D,me,Ge,Ee.width,Ee.height,0,be,He,Ee.data)}else if(T.isDataArrayTexture)if(k){if(xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ue,Ge,ve.width,ve.height,ve.depth),J)if(T.layerUpdates.size>0){const me=gp(ve.width,ve.height,T.format,T.type);for(const le of T.layerUpdates){const Be=ve.data.subarray(le*me/ve.data.BYTES_PER_ELEMENT,(le+1)*me/ve.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,le,ve.width,ve.height,1,be,He,Be)}T.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ve.width,ve.height,ve.depth,be,He,ve.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ge,ve.width,ve.height,ve.depth,0,be,He,ve.data);else if(T.isData3DTexture)k?(xe&&t.texStorage3D(n.TEXTURE_3D,Ue,Ge,ve.width,ve.height,ve.depth),J&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ve.width,ve.height,ve.depth,be,He,ve.data)):t.texImage3D(n.TEXTURE_3D,0,Ge,ve.width,ve.height,ve.depth,0,be,He,ve.data);else if(T.isFramebufferTexture){if(xe)if(k)t.texStorage2D(n.TEXTURE_2D,Ue,Ge,ve.width,ve.height);else{let me=ve.width,le=ve.height;for(let Be=0;Be<Ue;Be++)t.texImage2D(n.TEXTURE_2D,Be,Ge,me,le,0,be,He,null),me>>=1,le>>=1}}else if(Xe.length>0){if(k&&xe){const me=Mt(Xe[0]);t.texStorage2D(n.TEXTURE_2D,Ue,Ge,me.width,me.height)}for(let me=0,le=Xe.length;me<le;me++)Ee=Xe[me],k?J&&t.texSubImage2D(n.TEXTURE_2D,me,0,0,be,He,Ee):t.texImage2D(n.TEXTURE_2D,me,Ge,be,He,Ee);T.generateMipmaps=!1}else if(k){if(xe){const me=Mt(ve);t.texStorage2D(n.TEXTURE_2D,Ue,Ge,me.width,me.height)}J&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,be,He,ve)}else t.texImage2D(n.TEXTURE_2D,0,Ge,be,He,ve);m(T)&&p(te),ze.__version=ne.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function ae(O,T,Y){if(T.image.length!==6)return;const te=ke(O,T),de=T.source;t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+Y);const ne=i.get(de);if(de.version!==ne.__version||te===!0){t.activeTexture(n.TEXTURE0+Y);const ze=mt.getPrimaries(mt.workingColorSpace),_e=T.colorSpace===gs?null:mt.getPrimaries(T.colorSpace),Fe=T.colorSpace===gs||ze===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);const Ve=T.isCompressedTexture||T.image[0].isCompressedTexture,ve=T.image[0]&&T.image[0].isDataTexture,be=[];for(let le=0;le<6;le++)!Ve&&!ve?be[le]=v(T.image[le],!0,s.maxCubemapSize):be[le]=ve?T.image[le].image:T.image[le],be[le]=Nt(T,be[le]);const He=be[0],Ge=r.convert(T.format,T.colorSpace),Ee=r.convert(T.type),Xe=w(T.internalFormat,Ge,Ee,T.colorSpace),k=T.isVideoTexture!==!0,xe=ne.__version===void 0||te===!0,J=de.dataReady;let Ue=A(T,He);fe(n.TEXTURE_CUBE_MAP,T);let me;if(Ve){k&&xe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ue,Xe,He.width,He.height);for(let le=0;le<6;le++){me=be[le].mipmaps;for(let Be=0;Be<me.length;Be++){const it=me[Be];T.format!==rn?Ge!==null?k?J&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be,0,0,it.width,it.height,Ge,it.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be,Xe,it.width,it.height,0,it.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be,0,0,it.width,it.height,Ge,Ee,it.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be,Xe,it.width,it.height,0,Ge,Ee,it.data)}}}else{if(me=T.mipmaps,k&&xe){me.length>0&&Ue++;const le=Mt(be[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ue,Xe,le.width,le.height)}for(let le=0;le<6;le++)if(ve){k?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,be[le].width,be[le].height,Ge,Ee,be[le].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,Xe,be[le].width,be[le].height,0,Ge,Ee,be[le].data);for(let Be=0;Be<me.length;Be++){const At=me[Be].image[le].image;k?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be+1,0,0,At.width,At.height,Ge,Ee,At.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be+1,Xe,At.width,At.height,0,Ge,Ee,At.data)}}else{k?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,Ge,Ee,be[le]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,Xe,Ge,Ee,be[le]);for(let Be=0;Be<me.length;Be++){const it=me[Be];k?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be+1,0,0,Ge,Ee,it.image[le]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be+1,Xe,Ge,Ee,it.image[le])}}}m(T)&&p(n.TEXTURE_CUBE_MAP),ne.__version=de.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function Ne(O,T,Y,te,de,ne){const ze=r.convert(Y.format,Y.colorSpace),_e=r.convert(Y.type),Fe=w(Y.internalFormat,ze,_e,Y.colorSpace),Ve=i.get(T),ve=i.get(Y);if(ve.__renderTarget=T,!Ve.__hasExternalTextures){const be=Math.max(1,T.width>>ne),He=Math.max(1,T.height>>ne);de===n.TEXTURE_3D||de===n.TEXTURE_2D_ARRAY?t.texImage3D(de,ne,Fe,be,He,T.depth,0,ze,_e,null):t.texImage2D(de,ne,Fe,be,He,0,ze,_e,null)}t.bindFramebuffer(n.FRAMEBUFFER,O),Ae(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,de,ve.__webglTexture,0,et(T)):(de===n.TEXTURE_2D||de>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&de<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,te,de,ve.__webglTexture,ne),t.bindFramebuffer(n.FRAMEBUFFER,null)}function De(O,T,Y){if(n.bindRenderbuffer(n.RENDERBUFFER,O),T.depthBuffer){const te=T.depthTexture,de=te&&te.isDepthTexture?te.type:null,ne=S(T.stencilBuffer,de),ze=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=et(T);Ae(T)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_e,ne,T.width,T.height):Y?n.renderbufferStorageMultisample(n.RENDERBUFFER,_e,ne,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,ne,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ze,n.RENDERBUFFER,O)}else{const te=T.textures;for(let de=0;de<te.length;de++){const ne=te[de],ze=r.convert(ne.format,ne.colorSpace),_e=r.convert(ne.type),Fe=w(ne.internalFormat,ze,_e,ne.colorSpace),Ve=et(T);Y&&Ae(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ve,Fe,T.width,T.height):Ae(T)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ve,Fe,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,Fe,T.width,T.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Le(O,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,O),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=i.get(T.depthTexture);te.__renderTarget=T,(!te.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),q(T.depthTexture,0);const de=te.__webglTexture,ne=et(T);if(T.depthTexture.format===Sr)Ae(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,de,0,ne):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,de,0);else if(T.depthTexture.format===qa)Ae(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,de,0,ne):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,de,0);else throw new Error("Unknown depthTexture format")}function gt(O){const T=i.get(O),Y=O.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==O.depthTexture){const te=O.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),te){const de=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,te.removeEventListener("dispose",de)};te.addEventListener("dispose",de),T.__depthDisposeCallback=de}T.__boundDepthTexture=te}if(O.depthTexture&&!T.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");const te=O.texture.mipmaps;te&&te.length>0?Le(T.__webglFramebuffer[0],O):Le(T.__webglFramebuffer,O)}else if(Y){T.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[te]),T.__webglDepthbuffer[te]===void 0)T.__webglDepthbuffer[te]=n.createRenderbuffer(),De(T.__webglDepthbuffer[te],O,!1);else{const de=O.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ne=T.__webglDepthbuffer[te];n.bindRenderbuffer(n.RENDERBUFFER,ne),n.framebufferRenderbuffer(n.FRAMEBUFFER,de,n.RENDERBUFFER,ne)}}else{const te=O.texture.mipmaps;if(te&&te.length>0?t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=n.createRenderbuffer(),De(T.__webglDepthbuffer,O,!1);else{const de=O.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ne=T.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ne),n.framebufferRenderbuffer(n.FRAMEBUFFER,de,n.RENDERBUFFER,ne)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function st(O,T,Y){const te=i.get(O);T!==void 0&&Ne(te.__webglFramebuffer,O,O.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),Y!==void 0&&gt(O)}function B(O){const T=O.texture,Y=i.get(O),te=i.get(T);O.addEventListener("dispose",P);const de=O.textures,ne=O.isWebGLCubeRenderTarget===!0,ze=de.length>1;if(ze||(te.__webglTexture===void 0&&(te.__webglTexture=n.createTexture()),te.__version=T.version,a.memory.textures++),ne){Y.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(T.mipmaps&&T.mipmaps.length>0){Y.__webglFramebuffer[_e]=[];for(let Fe=0;Fe<T.mipmaps.length;Fe++)Y.__webglFramebuffer[_e][Fe]=n.createFramebuffer()}else Y.__webglFramebuffer[_e]=n.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){Y.__webglFramebuffer=[];for(let _e=0;_e<T.mipmaps.length;_e++)Y.__webglFramebuffer[_e]=n.createFramebuffer()}else Y.__webglFramebuffer=n.createFramebuffer();if(ze)for(let _e=0,Fe=de.length;_e<Fe;_e++){const Ve=i.get(de[_e]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=n.createTexture(),a.memory.textures++)}if(O.samples>0&&Ae(O)===!1){Y.__webglMultisampledFramebuffer=n.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let _e=0;_e<de.length;_e++){const Fe=de[_e];Y.__webglColorRenderbuffer[_e]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,Y.__webglColorRenderbuffer[_e]);const Ve=r.convert(Fe.format,Fe.colorSpace),ve=r.convert(Fe.type),be=w(Fe.internalFormat,Ve,ve,Fe.colorSpace,O.isXRRenderTarget===!0),He=et(O);n.renderbufferStorageMultisample(n.RENDERBUFFER,He,be,O.width,O.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,Y.__webglColorRenderbuffer[_e])}n.bindRenderbuffer(n.RENDERBUFFER,null),O.depthBuffer&&(Y.__webglDepthRenderbuffer=n.createRenderbuffer(),De(Y.__webglDepthRenderbuffer,O,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ne){t.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),fe(n.TEXTURE_CUBE_MAP,T);for(let _e=0;_e<6;_e++)if(T.mipmaps&&T.mipmaps.length>0)for(let Fe=0;Fe<T.mipmaps.length;Fe++)Ne(Y.__webglFramebuffer[_e][Fe],O,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Fe);else Ne(Y.__webglFramebuffer[_e],O,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);m(T)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ze){for(let _e=0,Fe=de.length;_e<Fe;_e++){const Ve=de[_e],ve=i.get(Ve);let be=n.TEXTURE_2D;(O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(be=O.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(be,ve.__webglTexture),fe(be,Ve),Ne(Y.__webglFramebuffer,O,Ve,n.COLOR_ATTACHMENT0+_e,be,0),m(Ve)&&p(be)}t.unbindTexture()}else{let _e=n.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(_e=O.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(_e,te.__webglTexture),fe(_e,T),T.mipmaps&&T.mipmaps.length>0)for(let Fe=0;Fe<T.mipmaps.length;Fe++)Ne(Y.__webglFramebuffer[Fe],O,T,n.COLOR_ATTACHMENT0,_e,Fe);else Ne(Y.__webglFramebuffer,O,T,n.COLOR_ATTACHMENT0,_e,0);m(T)&&p(_e),t.unbindTexture()}O.depthBuffer&&gt(O)}function Ie(O){const T=O.textures;for(let Y=0,te=T.length;Y<te;Y++){const de=T[Y];if(m(de)){const ne=y(O),ze=i.get(de).__webglTexture;t.bindTexture(ne,ze),p(ne),t.unbindTexture()}}}const Me=[],$e=[];function Re(O){if(O.samples>0){if(Ae(O)===!1){const T=O.textures,Y=O.width,te=O.height;let de=n.COLOR_BUFFER_BIT;const ne=O.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ze=i.get(O),_e=T.length>1;if(_e)for(let Ve=0;Ve<T.length;Ve++)t.bindFramebuffer(n.FRAMEBUFFER,ze.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ve,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ze.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ve,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ze.__webglMultisampledFramebuffer);const Fe=O.texture.mipmaps;Fe&&Fe.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ze.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ze.__webglFramebuffer);for(let Ve=0;Ve<T.length;Ve++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(de|=n.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(de|=n.STENCIL_BUFFER_BIT)),_e){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ze.__webglColorRenderbuffer[Ve]);const ve=i.get(T[Ve]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ve,0)}n.blitFramebuffer(0,0,Y,te,0,0,Y,te,de,n.NEAREST),l===!0&&(Me.length=0,$e.length=0,Me.push(n.COLOR_ATTACHMENT0+Ve),O.depthBuffer&&O.resolveDepthBuffer===!1&&(Me.push(ne),$e.push(ne),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,$e)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Me))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),_e)for(let Ve=0;Ve<T.length;Ve++){t.bindFramebuffer(n.FRAMEBUFFER,ze.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ve,n.RENDERBUFFER,ze.__webglColorRenderbuffer[Ve]);const ve=i.get(T[Ve]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ze.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ve,n.TEXTURE_2D,ve,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ze.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&l){const T=O.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[T])}}}function et(O){return Math.min(s.maxSamples,O.samples)}function Ae(O){const T=i.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Oe(O){const T=a.render.frame;h.get(O)!==T&&(h.set(O,T),O.update())}function Nt(O,T){const Y=O.colorSpace,te=O.format,de=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||Y!==Ut&&Y!==gs&&(mt.getTransfer(Y)===Rt?(te!==rn||de!==on)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),T}function Mt(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(c.width=O.naturalWidth||O.width,c.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(c.width=O.displayWidth,c.height=O.displayHeight):(c.width=O.width,c.height=O.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=G,this.setTexture2D=q,this.setTexture2DArray=X,this.setTexture3D=ie,this.setTextureCube=Z,this.rebindTextures=st,this.setupRenderTarget=B,this.updateRenderTargetMipmap=Ie,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=gt,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=Ae}function ib(n,e){function t(i,s=gs){let r;const a=mt.getTransfer(s);if(i===on)return n.UNSIGNED_BYTE;if(i===zd)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Hd)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ag)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===sg)return n.BYTE;if(i===rg)return n.SHORT;if(i===wr)return n.UNSIGNED_SHORT;if(i===kd)return n.INT;if(i===er)return n.UNSIGNED_INT;if(i===Vt)return n.FLOAT;if(i===Gt)return n.HALF_FLOAT;if(i===og)return n.ALPHA;if(i===lg)return n.RGB;if(i===rn)return n.RGBA;if(i===Sr)return n.DEPTH_COMPONENT;if(i===qa)return n.DEPTH_STENCIL;if(i===jr)return n.RED;if(i===Gd)return n.RED_INTEGER;if(i===Vr)return n.RG;if(i===Vd)return n.RG_INTEGER;if(i===jc)return n.RGBA_INTEGER;if(i===yc||i===wc||i===Sc||i===Mc)if(a===Rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===yc)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===wc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Sc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Mc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===yc)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===wc)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Sc)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Mc)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===xu||i===yu||i===wu||i===Su)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===xu)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===yu)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===wu)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Su)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Mu||i===bu||i===Eu)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Mu||i===bu)return a===Rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Eu)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Tu||i===Au||i===Ru||i===Cu||i===Pu||i===Du||i===Iu||i===Lu||i===Uu||i===Nu||i===Fu||i===Ou||i===Bu||i===ku)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Tu)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Au)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ru)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Cu)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Pu)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Du)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Iu)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Lu)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Uu)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Nu)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Fu)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ou)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Bu)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ku)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===bc||i===zu||i===Hu)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===bc)return a===Rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===zu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Hu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===cg||i===Gu||i===Vu||i===Wu)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===bc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Gu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Vu)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Wu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Za?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Fg extends Kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const sb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ab{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Fg(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new ln({vertexShader:sb,fragmentShader:rb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new he(new Hn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ob extends bs{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,_=null;const v=new ab,m={},p=t.getContextAttributes();let y=null,w=null;const S=[],A=[],I=new ue;let P=null;const C=new yt;C.viewport=new pt;const M=new yt;M.viewport=new pt;const E=[C,M],L=new gx;let G=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ee=S[W];return ee===void 0&&(ee=new Ah,S[W]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(W){let ee=S[W];return ee===void 0&&(ee=new Ah,S[W]=ee),ee.getGripSpace()},this.getHand=function(W){let ee=S[W];return ee===void 0&&(ee=new Ah,S[W]=ee),ee.getHandSpace()};function z(W){const ee=A.indexOf(W.inputSource);if(ee===-1)return;const ae=S[ee];ae!==void 0&&(ae.update(W.inputSource,W.frame,c||a),ae.dispatchEvent({type:W.type,data:W.inputSource}))}function q(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",X);for(let W=0;W<S.length;W++){const ee=A[W];ee!==null&&(A[W]=null,S[W].disconnect(ee))}G=null,H=null,v.reset();for(const W in m)delete m[W];e.setRenderTarget(y),f=null,d=null,u=null,s=null,w=null,Ye.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",q),s.addEventListener("inputsourceschange",X),p.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(I),typeof XRWebGLBinding<"u"&&(u=new XRWebGLBinding(s,t)),u!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,Ne=null,De=null;p.depth&&(De=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=p.stencil?qa:Sr,Ne=p.stencil?Za:er);const Le={colorFormat:t.RGBA8,depthFormat:De,scaleFactor:r};d=u.createProjectionLayer(Le),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),w=new St(d.textureWidth,d.textureHeight,{format:rn,type:on,depthTexture:new ta(d.textureWidth,d.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ae={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ae),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),w=new St(f.framebufferWidth,f.framebufferHeight,{format:rn,type:on,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ye.setContext(s),Ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function X(W){for(let ee=0;ee<W.removed.length;ee++){const ae=W.removed[ee],Ne=A.indexOf(ae);Ne>=0&&(A[Ne]=null,S[Ne].disconnect(ae))}for(let ee=0;ee<W.added.length;ee++){const ae=W.added[ee];let Ne=A.indexOf(ae);if(Ne===-1){for(let Le=0;Le<S.length;Le++)if(Le>=A.length){A.push(ae),Ne=Le;break}else if(A[Le]===null){A[Le]=ae,Ne=Le;break}if(Ne===-1)break}const De=S[Ne];De&&De.connect(ae)}}const ie=new D,Z=new D;function re(W,ee,ae){ie.setFromMatrixPosition(ee.matrixWorld),Z.setFromMatrixPosition(ae.matrixWorld);const Ne=ie.distanceTo(Z),De=ee.projectionMatrix.elements,Le=ae.projectionMatrix.elements,gt=De[14]/(De[10]-1),st=De[14]/(De[10]+1),B=(De[9]+1)/De[5],Ie=(De[9]-1)/De[5],Me=(De[8]-1)/De[0],$e=(Le[8]+1)/Le[0],Re=gt*Me,et=gt*$e,Ae=Ne/(-Me+$e),Oe=Ae*-Me;if(ee.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Oe),W.translateZ(Ae),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),De[10]===-1)W.projectionMatrix.copy(ee.projectionMatrix),W.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const Nt=gt+Ae,Mt=st+Ae,O=Re-Oe,T=et+(Ne-Oe),Y=B*st/Mt*Nt,te=Ie*st/Mt*Nt;W.projectionMatrix.makePerspective(O,T,Y,te,Nt,Mt),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function oe(W,ee){ee===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ee.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;let ee=W.near,ae=W.far;v.texture!==null&&(v.depthNear>0&&(ee=v.depthNear),v.depthFar>0&&(ae=v.depthFar)),L.near=M.near=C.near=ee,L.far=M.far=C.far=ae,(G!==L.near||H!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),G=L.near,H=L.far),L.layers.mask=W.layers.mask|6,C.layers.mask=L.layers.mask&3,M.layers.mask=L.layers.mask&5;const Ne=W.parent,De=L.cameras;oe(L,Ne);for(let Le=0;Le<De.length;Le++)oe(De[Le],Ne);De.length===2?re(L,C,M):L.projectionMatrix.copy(C.projectionMatrix),Te(W,L,Ne)};function Te(W,ee,ae){ae===null?W.matrix.copy(ee.matrixWorld):(W.matrix.copy(ae.matrixWorld),W.matrix.invert(),W.matrix.multiply(ee.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ee.projectionMatrix),W.projectionMatrixInverse.copy(ee.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Ka*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(W){l=W,d!==null&&(d.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(L)},this.getCameraTexture=function(W){return m[W]};let fe=null;function ke(W,ee){if(h=ee.getViewerPose(c||a),_=ee,h!==null){const ae=h.views;f!==null&&(e.setRenderTargetFramebuffer(w,f.framebuffer),e.setRenderTarget(w));let Ne=!1;ae.length!==L.cameras.length&&(L.cameras.length=0,Ne=!0);for(let st=0;st<ae.length;st++){const B=ae[st];let Ie=null;if(f!==null)Ie=f.getViewport(B);else{const $e=u.getViewSubImage(d,B);Ie=$e.viewport,st===0&&(e.setRenderTargetTextures(w,$e.colorTexture,$e.depthStencilTexture),e.setRenderTarget(w))}let Me=E[st];Me===void 0&&(Me=new yt,Me.layers.enable(st),Me.viewport=new pt,E[st]=Me),Me.matrix.fromArray(B.transform.matrix),Me.matrix.decompose(Me.position,Me.quaternion,Me.scale),Me.projectionMatrix.fromArray(B.projectionMatrix),Me.projectionMatrixInverse.copy(Me.projectionMatrix).invert(),Me.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),st===0&&(L.matrix.copy(Me.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Ne===!0&&L.cameras.push(Me)}const De=s.enabledFeatures;if(De&&De.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&u){const st=u.getDepthInformation(ae[0]);st&&st.isValid&&st.texture&&v.init(st,s.renderState)}if(De&&De.includes("camera-access")&&(e.state.unbindTexture(),u))for(let st=0;st<ae.length;st++){const B=ae[st].camera;if(B){let Ie=m[B];Ie||(Ie=new Fg,m[B]=Ie);const Me=u.getCameraImage(B);Ie.sourceTexture=Me}}}for(let ae=0;ae<S.length;ae++){const Ne=A[ae],De=S[ae];Ne!==null&&De!==void 0&&De.update(Ne,ee,c||a)}fe&&fe(W,ee),ee.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ee}),_=null}const Ye=new Dg;Ye.setAnimationLoop(ke),this.setAnimationLoop=function(W){fe=W},this.dispose=function(){}}}const Ir=new wi,lb=new We;function cb(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,_g(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,w,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),_(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,y,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===jt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===jt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),w=y.envMap,S=y.envMapRotation;w&&(m.envMap.value=w,Ir.copy(S),Ir.x*=-1,Ir.y*=-1,Ir.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ir.y*=-1,Ir.z*=-1),m.envMapRotation.value.setFromMatrix4(lb.makeRotationFromEuler(Ir)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===jt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function hb(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,w){const S=w.program;i.uniformBlockBinding(y,S)}function c(y,w){let S=s[y.id];S===void 0&&(_(y),S=h(y),s[y.id]=S,y.addEventListener("dispose",m));const A=w.program;i.updateUBOMapping(y,A);const I=e.render.frame;r[y.id]!==I&&(d(y),r[y.id]=I)}function h(y){const w=u();y.__bindingPointIndex=w;const S=n.createBuffer(),A=y.__size,I=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,A,I),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,S),S}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const w=s[y.id],S=y.uniforms,A=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let I=0,P=S.length;I<P;I++){const C=Array.isArray(S[I])?S[I]:[S[I]];for(let M=0,E=C.length;M<E;M++){const L=C[M];if(f(L,I,M,A)===!0){const G=L.__offset,H=Array.isArray(L.value)?L.value:[L.value];let z=0;for(let q=0;q<H.length;q++){const X=H[q],ie=v(X);typeof X=="number"||typeof X=="boolean"?(L.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,G+z,L.__data)):X.isMatrix3?(L.__data[0]=X.elements[0],L.__data[1]=X.elements[1],L.__data[2]=X.elements[2],L.__data[3]=0,L.__data[4]=X.elements[3],L.__data[5]=X.elements[4],L.__data[6]=X.elements[5],L.__data[7]=0,L.__data[8]=X.elements[6],L.__data[9]=X.elements[7],L.__data[10]=X.elements[8],L.__data[11]=0):(X.toArray(L.__data,z),z+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,G,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(y,w,S,A){const I=y.value,P=w+"_"+S;if(A[P]===void 0)return typeof I=="number"||typeof I=="boolean"?A[P]=I:A[P]=I.clone(),!0;{const C=A[P];if(typeof I=="number"||typeof I=="boolean"){if(C!==I)return A[P]=I,!0}else if(C.equals(I)===!1)return C.copy(I),!0}return!1}function _(y){const w=y.uniforms;let S=0;const A=16;for(let P=0,C=w.length;P<C;P++){const M=Array.isArray(w[P])?w[P]:[w[P]];for(let E=0,L=M.length;E<L;E++){const G=M[E],H=Array.isArray(G.value)?G.value:[G.value];for(let z=0,q=H.length;z<q;z++){const X=H[z],ie=v(X),Z=S%A,re=Z%ie.boundary,oe=Z+re;S+=re,oe!==0&&A-oe<ie.storage&&(S+=A-oe),G.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=S,S+=ie.storage}}}const I=S%A;return I>0&&(S+=A-I),y.__size=S,y.__cache={},this}function v(y){const w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),w}function m(y){const w=y.target;w.removeEventListener("dispose",m);const S=a.indexOf(w.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(const y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Gn{constructor(e={}){const{canvas:t=uv(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;const _=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const y=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ss,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let A=!1;this._outputColorSpace=je;let I=0,P=0,C=null,M=-1,E=null;const L=new pt,G=new pt;let H=null;const z=new ye(0);let q=0,X=t.width,ie=t.height,Z=1,re=null,oe=null;const Te=new pt(0,0,X,ie),fe=new pt(0,0,X,ie);let ke=!1;const Ye=new Zc;let W=!1,ee=!1;const ae=new We,Ne=new D,De=new pt,Le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let gt=!1;function st(){return C===null?Z:1}let B=i;function Ie(g,b){return t.getContext(g,b)}try{const g={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Mi}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",Ue,!1),t.addEventListener("webglcontextcreationerror",me,!1),B===null){const b="webgl2";if(B=Ie(b,g),B===null)throw Ie(b)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(g){throw console.error("THREE.WebGLRenderer: "+g.message),g}let Me,$e,Re,et,Ae,Oe,Nt,Mt,O,T,Y,te,de,ne,ze,_e,Fe,Ve,ve,be,He,Ge,Ee,Xe;function k(){Me=new wS(B),Me.init(),Ge=new ib(B,Me),$e=new pS(B,Me,e,Ge),Re=new tb(B,Me),$e.reversedDepthBuffer&&d&&Re.buffers.depth.setReversed(!0),et=new bS(B),Ae=new GM,Oe=new nb(B,Me,Re,Ae,$e,Ge,et),Nt=new gS(S),Mt=new yS(S),O=new Px(B),Ee=new dS(B,O),T=new SS(B,O,et,Ee),Y=new TS(B,T,O,et),ve=new ES(B,$e,Oe),_e=new mS(Ae),te=new HM(S,Nt,Mt,Me,$e,Ee,_e),de=new cb(S,Ae),ne=new WM,ze=new qM(Me),Ve=new uS(S,Nt,Mt,Re,Y,f,l),Fe=new QM(S,Y,$e),Xe=new hb(B,et,$e,Re),be=new fS(B,Me,et),He=new MS(B,Me,et),et.programs=te.programs,S.capabilities=$e,S.extensions=Me,S.properties=Ae,S.renderLists=ne,S.shadowMap=Fe,S.state=Re,S.info=et}k();const xe=new ob(S,B);this.xr=xe,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const g=Me.get("WEBGL_lose_context");g&&g.loseContext()},this.forceContextRestore=function(){const g=Me.get("WEBGL_lose_context");g&&g.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(g){g!==void 0&&(Z=g,this.setSize(X,ie,!1))},this.getSize=function(g){return g.set(X,ie)},this.setSize=function(g,b,R=!0){if(xe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=g,ie=b,t.width=Math.floor(g*Z),t.height=Math.floor(b*Z),R===!0&&(t.style.width=g+"px",t.style.height=b+"px"),this.setViewport(0,0,g,b)},this.getDrawingBufferSize=function(g){return g.set(X*Z,ie*Z).floor()},this.setDrawingBufferSize=function(g,b,R){X=g,ie=b,Z=R,t.width=Math.floor(g*R),t.height=Math.floor(b*R),this.setViewport(0,0,g,b)},this.getCurrentViewport=function(g){return g.copy(L)},this.getViewport=function(g){return g.copy(Te)},this.setViewport=function(g,b,R,N){g.isVector4?Te.set(g.x,g.y,g.z,g.w):Te.set(g,b,R,N),Re.viewport(L.copy(Te).multiplyScalar(Z).round())},this.getScissor=function(g){return g.copy(fe)},this.setScissor=function(g,b,R,N){g.isVector4?fe.set(g.x,g.y,g.z,g.w):fe.set(g,b,R,N),Re.scissor(G.copy(fe).multiplyScalar(Z).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(g){Re.setScissorTest(ke=g)},this.setOpaqueSort=function(g){re=g},this.setTransparentSort=function(g){oe=g},this.getClearColor=function(g){return g.copy(Ve.getClearColor())},this.setClearColor=function(){Ve.setClearColor(...arguments)},this.getClearAlpha=function(){return Ve.getClearAlpha()},this.setClearAlpha=function(){Ve.setClearAlpha(...arguments)},this.clear=function(g=!0,b=!0,R=!0){let N=0;if(g){let F=!1;if(C!==null){const U=C.texture.format;F=U===jc||U===Vd||U===Gd}if(F){const U=C.texture.type,j=U===on||U===er||U===wr||U===Za||U===zd||U===Hd,$=Ve.getClearColor(),V=Ve.getClearAlpha(),K=$.r,se=$.g,Q=$.b;j?(_[0]=K,_[1]=se,_[2]=Q,_[3]=V,B.clearBufferuiv(B.COLOR,0,_)):(v[0]=K,v[1]=se,v[2]=Q,v[3]=V,B.clearBufferiv(B.COLOR,0,v))}else N|=B.COLOR_BUFFER_BIT}b&&(N|=B.DEPTH_BUFFER_BIT),R&&(N|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(N)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",Ue,!1),t.removeEventListener("webglcontextcreationerror",me,!1),Ve.dispose(),ne.dispose(),ze.dispose(),Ae.dispose(),Nt.dispose(),Mt.dispose(),Y.dispose(),Ee.dispose(),Xe.dispose(),te.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",ii),xe.removeEventListener("sessionend",gl),As.stop()};function J(g){g.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Ue(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const g=et.autoReset,b=Fe.enabled,R=Fe.autoUpdate,N=Fe.needsUpdate,F=Fe.type;k(),et.autoReset=g,Fe.enabled=b,Fe.autoUpdate=R,Fe.needsUpdate=N,Fe.type=F}function me(g){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",g.statusMessage)}function le(g){const b=g.target;b.removeEventListener("dispose",le),Be(b)}function Be(g){it(g),Ae.remove(g)}function it(g){const b=Ae.get(g).programs;b!==void 0&&(b.forEach(function(R){te.releaseProgram(R)}),g.isShaderMaterial&&te.releaseShaderCache(g))}this.renderBufferDirect=function(g,b,R,N,F,U){b===null&&(b=Le);const j=F.isMesh&&F.matrixWorld.determinant()<0,$=Sl(g,b,R,N,F);Re.setMaterial(N,j);let V=R.index,K=1;if(N.wireframe===!0){if(V=T.getWireframeAttribute(R),V===void 0)return;K=2}const se=R.drawRange,Q=R.attributes.position;let ce=se.start*K,we=(se.start+se.count)*K;U!==null&&(ce=Math.max(ce,U.start*K),we=Math.min(we,(U.start+U.count)*K)),V!==null?(ce=Math.max(ce,0),we=Math.min(we,V.count)):Q!=null&&(ce=Math.max(ce,0),we=Math.min(we,Q.count));const pe=we-ce;if(pe<0||pe===1/0)return;Ee.setup(F,N,$,R,V);let ge,Ce=be;if(V!==null&&(ge=O.get(V),Ce=He,Ce.setIndex(ge)),F.isMesh)N.wireframe===!0?(Re.setLineWidth(N.wireframeLinewidth*st()),Ce.setMode(B.LINES)):Ce.setMode(B.TRIANGLES);else if(F.isLine){let Se=N.linewidth;Se===void 0&&(Se=1),Re.setLineWidth(Se*st()),F.isLineSegments?Ce.setMode(B.LINES):F.isLineLoop?Ce.setMode(B.LINE_LOOP):Ce.setMode(B.LINE_STRIP)}else F.isPoints?Ce.setMode(B.POINTS):F.isSprite&&Ce.setMode(B.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Ga("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ce.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Me.get("WEBGL_multi_draw"))Ce.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Se=F._multiDrawStarts,qe=F._multiDrawCounts,Ze=F._multiDrawCount,at=V?O.get(V).bytesPerElement:1,Ke=Ae.get(N).currentProgram.getUniforms();for(let ut=0;ut<Ze;ut++)Ke.setValue(B,"_gl_DrawID",ut),Ce.render(Se[ut]/at,qe[ut])}else if(F.isInstancedMesh)Ce.renderInstances(ce,pe,F.count);else if(R.isInstancedBufferGeometry){const Se=R._maxInstanceCount!==void 0?R._maxInstanceCount:1/0,qe=Math.min(R.instanceCount,Se);Ce.renderInstances(ce,pe,qe)}else Ce.render(ce,pe)};function At(g,b,R){g.transparent===!0&&g.side===xn&&g.forceSinglePass===!1?(g.side=jt,g.needsUpdate=!0,ra(g,b,R),g.side=qi,g.needsUpdate=!0,ra(g,b,R),g.side=xn):ra(g,b,R)}this.compile=function(g,b,R=null){R===null&&(R=g),p=ze.get(R),p.init(b),w.push(p),R.traverseVisible(function(F){F.isLight&&F.layers.test(b.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),g!==R&&g.traverseVisible(function(F){F.isLight&&F.layers.test(b.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const N=new Set;return g.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const U=F.material;if(U)if(Array.isArray(U))for(let j=0;j<U.length;j++){const $=U[j];At($,R,F),N.add($)}else At(U,R,F),N.add(U)}),p=w.pop(),N},this.compileAsync=function(g,b,R=null){const N=this.compile(g,b,R);return new Promise(F=>{function U(){if(N.forEach(function(j){Ae.get(j).currentProgram.isReady()&&N.delete(j)}),N.size===0){F(g);return}setTimeout(U,10)}Me.get("KHR_parallel_shader_compile")!==null?U():setTimeout(U,10)})};let _t=null;function Ei(g){_t&&_t(g)}function ii(){As.stop()}function gl(){As.start()}const As=new Dg;As.setAnimationLoop(Ei),typeof self<"u"&&As.setContext(self),this.setAnimationLoop=function(g){_t=g,xe.setAnimationLoop(g),g===null?As.stop():As.start()},xe.addEventListener("sessionstart",ii),xe.addEventListener("sessionend",gl),this.render=function(g,b){if(b!==void 0&&b.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),b.parent===null&&b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(b),b=xe.getCamera()),g.isScene===!0&&g.onBeforeRender(S,g,b,C),p=ze.get(g,w.length),p.init(b),w.push(p),ae.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse),Ye.setFromProjectionMatrix(ae,Yi,b.reversedDepth),ee=this.localClippingEnabled,W=_e.init(this.clippingPlanes,ee),m=ne.get(g,y.length),m.init(),y.push(m),xe.enabled===!0&&xe.isPresenting===!0){const U=S.xr.getDepthSensingMesh();U!==null&&fo(U,b,-1/0,S.sortObjects)}fo(g,b,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(re,oe),gt=xe.enabled===!1||xe.isPresenting===!1||xe.hasDepthSensing()===!1,gt&&Ve.addToRenderList(m,g),this.info.render.frame++,W===!0&&_e.beginShadows();const R=p.state.shadowsArray;Fe.render(R,g,b),W===!0&&_e.endShadows(),this.info.autoReset===!0&&this.info.reset();const N=m.opaque,F=m.transmissive;if(p.setupLights(),b.isArrayCamera){const U=b.cameras;if(F.length>0)for(let j=0,$=U.length;j<$;j++){const V=U[j];vl(N,F,g,V)}gt&&Ve.render(g);for(let j=0,$=U.length;j<$;j++){const V=U[j];_l(m,g,V,V.viewport)}}else F.length>0&&vl(N,F,g,b),gt&&Ve.render(g),_l(m,g,b);C!==null&&P===0&&(Oe.updateMultisampleRenderTarget(C),Oe.updateRenderTargetMipmap(C)),g.isScene===!0&&g.onAfterRender(S,g,b),Ee.resetDefaultState(),M=-1,E=null,w.pop(),w.length>0?(p=w[w.length-1],W===!0&&_e.setGlobalState(S.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function fo(g,b,R,N){if(g.visible===!1)return;if(g.layers.test(b.layers)){if(g.isGroup)R=g.renderOrder;else if(g.isLOD)g.autoUpdate===!0&&g.update(b);else if(g.isLight)p.pushLight(g),g.castShadow&&p.pushShadow(g);else if(g.isSprite){if(!g.frustumCulled||Ye.intersectsSprite(g)){N&&De.setFromMatrixPosition(g.matrixWorld).applyMatrix4(ae);const j=Y.update(g),$=g.material;$.visible&&m.push(g,j,$,R,De.z,null)}}else if((g.isMesh||g.isLine||g.isPoints)&&(!g.frustumCulled||Ye.intersectsObject(g))){const j=Y.update(g),$=g.material;if(N&&(g.boundingSphere!==void 0?(g.boundingSphere===null&&g.computeBoundingSphere(),De.copy(g.boundingSphere.center)):(j.boundingSphere===null&&j.computeBoundingSphere(),De.copy(j.boundingSphere.center)),De.applyMatrix4(g.matrixWorld).applyMatrix4(ae)),Array.isArray($)){const V=j.groups;for(let K=0,se=V.length;K<se;K++){const Q=V[K],ce=$[Q.materialIndex];ce&&ce.visible&&m.push(g,j,ce,R,De.z,Q)}}else $.visible&&m.push(g,j,$,R,De.z,null)}}const U=g.children;for(let j=0,$=U.length;j<$;j++)fo(U[j],b,R,N)}function _l(g,b,R,N){const F=g.opaque,U=g.transmissive,j=g.transparent;p.setupLightsView(R),W===!0&&_e.setGlobalState(S.clippingPlanes,R),N&&Re.viewport(L.copy(N)),F.length>0&&Tr(F,b,R),U.length>0&&Tr(U,b,R),j.length>0&&Tr(j,b,R),Re.buffers.depth.setTest(!0),Re.buffers.depth.setMask(!0),Re.buffers.color.setMask(!0),Re.setPolygonOffset(!1)}function vl(g,b,R,N){if((R.isScene===!0?R.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[N.id]===void 0&&(p.state.transmissionRenderTarget[N.id]=new St(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")||Me.has("EXT_color_buffer_float")?Gt:on,minFilter:ji,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:mt.workingColorSpace}));const U=p.state.transmissionRenderTarget[N.id],j=N.viewport||L;U.setSize(j.z*S.transmissionResolutionScale,j.w*S.transmissionResolutionScale);const $=S.getRenderTarget(),V=S.getActiveCubeFace(),K=S.getActiveMipmapLevel();S.setRenderTarget(U),S.getClearColor(z),q=S.getClearAlpha(),q<1&&S.setClearColor(16777215,.5),S.clear(),gt&&Ve.render(R);const se=S.toneMapping;S.toneMapping=Ss;const Q=N.viewport;if(N.viewport!==void 0&&(N.viewport=void 0),p.setupLightsView(N),W===!0&&_e.setGlobalState(S.clippingPlanes,N),Tr(g,R,N),Oe.updateMultisampleRenderTarget(U),Oe.updateRenderTargetMipmap(U),Me.has("WEBGL_multisampled_render_to_texture")===!1){let ce=!1;for(let we=0,pe=b.length;we<pe;we++){const ge=b[we],Ce=ge.object,Se=ge.geometry,qe=ge.material,Ze=ge.group;if(qe.side===xn&&Ce.layers.test(N.layers)){const at=qe.side;qe.side=jt,qe.needsUpdate=!0,xl(Ce,R,N,Se,qe,Ze),qe.side=at,qe.needsUpdate=!0,ce=!0}}ce===!0&&(Oe.updateMultisampleRenderTarget(U),Oe.updateRenderTargetMipmap(U))}S.setRenderTarget($,V,K),S.setClearColor(z,q),Q!==void 0&&(N.viewport=Q),S.toneMapping=se}function Tr(g,b,R){const N=b.isScene===!0?b.overrideMaterial:null;for(let F=0,U=g.length;F<U;F++){const j=g[F],$=j.object,V=j.geometry,K=j.group;let se=j.material;se.allowOverride===!0&&N!==null&&(se=N),$.layers.test(R.layers)&&xl($,b,R,V,se,K)}}function xl(g,b,R,N,F,U){g.onBeforeRender(S,b,R,N,F,U),g.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,g.matrixWorld),g.normalMatrix.getNormalMatrix(g.modelViewMatrix),F.onBeforeRender(S,b,R,N,g,U),F.transparent===!0&&F.side===xn&&F.forceSinglePass===!1?(F.side=jt,F.needsUpdate=!0,S.renderBufferDirect(R,b,N,F,g,U),F.side=qi,F.needsUpdate=!0,S.renderBufferDirect(R,b,N,F,g,U),F.side=xn):S.renderBufferDirect(R,b,N,F,g,U),g.onAfterRender(S,b,R,N,F,U)}function ra(g,b,R){b.isScene!==!0&&(b=Le);const N=Ae.get(g),F=p.state.lights,U=p.state.shadowsArray,j=F.state.version,$=te.getParameters(g,F.state,U,b,R),V=te.getProgramCacheKey($);let K=N.programs;N.environment=g.isMeshStandardMaterial?b.environment:null,N.fog=b.fog,N.envMap=(g.isMeshStandardMaterial?Mt:Nt).get(g.envMap||N.environment),N.envMapRotation=N.environment!==null&&g.envMap===null?b.environmentRotation:g.envMapRotation,K===void 0&&(g.addEventListener("dispose",le),K=new Map,N.programs=K);let se=K.get(V);if(se!==void 0){if(N.currentProgram===se&&N.lightsStateVersion===j)return wl(g,$),se}else $.uniforms=te.getUniforms(g),g.onBeforeCompile($,S),se=te.acquireProgram($,V),K.set(V,se),N.uniforms=$.uniforms;const Q=N.uniforms;return(!g.isShaderMaterial&&!g.isRawShaderMaterial||g.clipping===!0)&&(Q.clippingPlanes=_e.uniform),wl(g,$),N.needsLights=sh(g),N.lightsStateVersion=j,N.needsLights&&(Q.ambientLightColor.value=F.state.ambient,Q.lightProbe.value=F.state.probe,Q.directionalLights.value=F.state.directional,Q.directionalLightShadows.value=F.state.directionalShadow,Q.spotLights.value=F.state.spot,Q.spotLightShadows.value=F.state.spotShadow,Q.rectAreaLights.value=F.state.rectArea,Q.ltc_1.value=F.state.rectAreaLTC1,Q.ltc_2.value=F.state.rectAreaLTC2,Q.pointLights.value=F.state.point,Q.pointLightShadows.value=F.state.pointShadow,Q.hemisphereLights.value=F.state.hemi,Q.directionalShadowMap.value=F.state.directionalShadowMap,Q.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Q.spotShadowMap.value=F.state.spotShadowMap,Q.spotLightMatrix.value=F.state.spotLightMatrix,Q.spotLightMap.value=F.state.spotLightMap,Q.pointShadowMap.value=F.state.pointShadowMap,Q.pointShadowMatrix.value=F.state.pointShadowMatrix),N.currentProgram=se,N.uniformsList=null,se}function yl(g){if(g.uniformsList===null){const b=g.currentProgram.getUniforms();g.uniformsList=Ec.seqWithValue(b.seq,g.uniforms)}return g.uniformsList}function wl(g,b){const R=Ae.get(g);R.outputColorSpace=b.outputColorSpace,R.batching=b.batching,R.batchingColor=b.batchingColor,R.instancing=b.instancing,R.instancingColor=b.instancingColor,R.instancingMorph=b.instancingMorph,R.skinning=b.skinning,R.morphTargets=b.morphTargets,R.morphNormals=b.morphNormals,R.morphColors=b.morphColors,R.morphTargetsCount=b.morphTargetsCount,R.numClippingPlanes=b.numClippingPlanes,R.numIntersection=b.numClipIntersection,R.vertexAlphas=b.vertexAlphas,R.vertexTangents=b.vertexTangents,R.toneMapping=b.toneMapping}function Sl(g,b,R,N,F){b.isScene!==!0&&(b=Le),Oe.resetTextureUnits();const U=b.fog,j=N.isMeshStandardMaterial?b.environment:null,$=C===null?S.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Ut,V=(N.isMeshStandardMaterial?Mt:Nt).get(N.envMap||j),K=N.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,se=!!R.attributes.tangent&&(!!N.normalMap||N.anisotropy>0),Q=!!R.morphAttributes.position,ce=!!R.morphAttributes.normal,we=!!R.morphAttributes.color;let pe=Ss;N.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(pe=S.toneMapping);const ge=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,Ce=ge!==void 0?ge.length:0,Se=Ae.get(N),qe=p.state.lights;if(W===!0&&(ee===!0||g!==E)){const Ft=g===E&&N.id===M;_e.setState(N,g,Ft)}let Ze=!1;N.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==qe.state.version||Se.outputColorSpace!==$||F.isBatchedMesh&&Se.batching===!1||!F.isBatchedMesh&&Se.batching===!0||F.isBatchedMesh&&Se.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Se.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Se.instancing===!1||!F.isInstancedMesh&&Se.instancing===!0||F.isSkinnedMesh&&Se.skinning===!1||!F.isSkinnedMesh&&Se.skinning===!0||F.isInstancedMesh&&Se.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Se.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Se.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Se.instancingMorph===!1&&F.morphTexture!==null||Se.envMap!==V||N.fog===!0&&Se.fog!==U||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==_e.numPlanes||Se.numIntersection!==_e.numIntersection)||Se.vertexAlphas!==K||Se.vertexTangents!==se||Se.morphTargets!==Q||Se.morphNormals!==ce||Se.morphColors!==we||Se.toneMapping!==pe||Se.morphTargetsCount!==Ce)&&(Ze=!0):(Ze=!0,Se.__version=N.version);let at=Se.currentProgram;Ze===!0&&(at=ra(N,b,F));let Ke=!1,ut=!1,kt=!1;const Je=at.getUniforms(),Qe=Se.uniforms;if(Re.useProgram(at.program)&&(Ke=!0,ut=!0,kt=!0),N.id!==M&&(M=N.id,ut=!0),Ke||E!==g){Re.buffers.depth.getReversed()&&g.reversedDepth!==!0&&(g._reversedDepth=!0,g.updateProjectionMatrix()),Je.setValue(B,"projectionMatrix",g.projectionMatrix),Je.setValue(B,"viewMatrix",g.matrixWorldInverse);const Jt=Je.map.cameraPosition;Jt!==void 0&&Jt.setValue(B,Ne.setFromMatrixPosition(g.matrixWorld)),$e.logarithmicDepthBuffer&&Je.setValue(B,"logDepthBufFC",2/(Math.log(g.far+1)/Math.LN2)),(N.isMeshPhongMaterial||N.isMeshToonMaterial||N.isMeshLambertMaterial||N.isMeshBasicMaterial||N.isMeshStandardMaterial||N.isShaderMaterial)&&Je.setValue(B,"isOrthographic",g.isOrthographicCamera===!0),E!==g&&(E=g,ut=!0,kt=!0)}if(F.isSkinnedMesh){Je.setOptional(B,F,"bindMatrix"),Je.setOptional(B,F,"bindMatrixInverse");const Ft=F.skeleton;Ft&&(Ft.boneTexture===null&&Ft.computeBoneTexture(),Je.setValue(B,"boneTexture",Ft.boneTexture,Oe))}F.isBatchedMesh&&(Je.setOptional(B,F,"batchingTexture"),Je.setValue(B,"batchingTexture",F._matricesTexture,Oe),Je.setOptional(B,F,"batchingIdTexture"),Je.setValue(B,"batchingIdTexture",F._indirectTexture,Oe),Je.setOptional(B,F,"batchingColorTexture"),F._colorsTexture!==null&&Je.setValue(B,"batchingColorTexture",F._colorsTexture,Oe));const ct=R.morphAttributes;if((ct.position!==void 0||ct.normal!==void 0||ct.color!==void 0)&&ve.update(F,R,at),(ut||Se.receiveShadow!==F.receiveShadow)&&(Se.receiveShadow=F.receiveShadow,Je.setValue(B,"receiveShadow",F.receiveShadow)),N.isMeshGouraudMaterial&&N.envMap!==null&&(Qe.envMap.value=V,Qe.flipEnvMap.value=V.isCubeTexture&&V.isRenderTargetTexture===!1?-1:1),N.isMeshStandardMaterial&&N.envMap===null&&b.environment!==null&&(Qe.envMapIntensity.value=b.environmentIntensity),ut&&(Je.setValue(B,"toneMappingExposure",S.toneMappingExposure),Se.needsLights&&Ml(Qe,kt),U&&N.fog===!0&&de.refreshFogUniforms(Qe,U),de.refreshMaterialUniforms(Qe,N,Z,ie,p.state.transmissionRenderTarget[g.id]),Ec.upload(B,yl(Se),Qe,Oe)),N.isShaderMaterial&&N.uniformsNeedUpdate===!0&&(Ec.upload(B,yl(Se),Qe,Oe),N.uniformsNeedUpdate=!1),N.isSpriteMaterial&&Je.setValue(B,"center",F.center),Je.setValue(B,"modelViewMatrix",F.modelViewMatrix),Je.setValue(B,"normalMatrix",F.normalMatrix),Je.setValue(B,"modelMatrix",F.matrixWorld),N.isShaderMaterial||N.isRawShaderMaterial){const Ft=N.uniformsGroups;for(let Jt=0,On=Ft.length;Jt<On;Jt++){const si=Ft[Jt];Xe.update(si,at),Xe.bind(si,at)}}return at}function Ml(g,b){g.ambientLightColor.needsUpdate=b,g.lightProbe.needsUpdate=b,g.directionalLights.needsUpdate=b,g.directionalLightShadows.needsUpdate=b,g.pointLights.needsUpdate=b,g.pointLightShadows.needsUpdate=b,g.spotLights.needsUpdate=b,g.spotLightShadows.needsUpdate=b,g.rectAreaLights.needsUpdate=b,g.hemisphereLights.needsUpdate=b}function sh(g){return g.isMeshLambertMaterial||g.isMeshToonMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isShadowMaterial||g.isShaderMaterial&&g.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(g,b,R){const N=Ae.get(g);N.__autoAllocateDepthBuffer=g.resolveDepthBuffer===!1,N.__autoAllocateDepthBuffer===!1&&(N.__useRenderToTexture=!1),Ae.get(g.texture).__webglTexture=b,Ae.get(g.depthTexture).__webglTexture=N.__autoAllocateDepthBuffer?void 0:R,N.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(g,b){const R=Ae.get(g);R.__webglFramebuffer=b,R.__useDefaultFramebuffer=b===void 0};const Rs=B.createFramebuffer();this.setRenderTarget=function(g,b=0,R=0){C=g,I=b,P=R;let N=!0,F=null,U=!1,j=!1;if(g){const V=Ae.get(g);if(V.__useDefaultFramebuffer!==void 0)Re.bindFramebuffer(B.FRAMEBUFFER,null),N=!1;else if(V.__webglFramebuffer===void 0)Oe.setupRenderTarget(g);else if(V.__hasExternalTextures)Oe.rebindTextures(g,Ae.get(g.texture).__webglTexture,Ae.get(g.depthTexture).__webglTexture);else if(g.depthBuffer){const Q=g.depthTexture;if(V.__boundDepthTexture!==Q){if(Q!==null&&Ae.has(Q)&&(g.width!==Q.image.width||g.height!==Q.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Oe.setupDepthRenderbuffer(g)}}const K=g.texture;(K.isData3DTexture||K.isDataArrayTexture||K.isCompressedArrayTexture)&&(j=!0);const se=Ae.get(g).__webglFramebuffer;g.isWebGLCubeRenderTarget?(Array.isArray(se[b])?F=se[b][R]:F=se[b],U=!0):g.samples>0&&Oe.useMultisampledRTT(g)===!1?F=Ae.get(g).__webglMultisampledFramebuffer:Array.isArray(se)?F=se[R]:F=se,L.copy(g.viewport),G.copy(g.scissor),H=g.scissorTest}else L.copy(Te).multiplyScalar(Z).floor(),G.copy(fe).multiplyScalar(Z).floor(),H=ke;if(R!==0&&(F=Rs),Re.bindFramebuffer(B.FRAMEBUFFER,F)&&N&&Re.drawBuffers(g,F),Re.viewport(L),Re.scissor(G),Re.setScissorTest(H),U){const V=Ae.get(g.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+b,V.__webglTexture,R)}else if(j){const V=b;for(let K=0;K<g.textures.length;K++){const se=Ae.get(g.textures[K]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+K,se.__webglTexture,R,V)}}else if(g!==null&&R!==0){const V=Ae.get(g.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,V.__webglTexture,R)}M=-1},this.readRenderTargetPixels=function(g,b,R,N,F,U,j,$=0){if(!(g&&g.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let V=Ae.get(g).__webglFramebuffer;if(g.isWebGLCubeRenderTarget&&j!==void 0&&(V=V[j]),V){Re.bindFramebuffer(B.FRAMEBUFFER,V);try{const K=g.textures[$],se=K.format,Q=K.type;if(!$e.textureFormatReadable(se)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$e.textureTypeReadable(Q)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}b>=0&&b<=g.width-N&&R>=0&&R<=g.height-F&&(g.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+$),B.readPixels(b,R,N,F,Ge.convert(se),Ge.convert(Q),U))}finally{const K=C!==null?Ae.get(C).__webglFramebuffer:null;Re.bindFramebuffer(B.FRAMEBUFFER,K)}}},this.readRenderTargetPixelsAsync=async function(g,b,R,N,F,U,j,$=0){if(!(g&&g.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let V=Ae.get(g).__webglFramebuffer;if(g.isWebGLCubeRenderTarget&&j!==void 0&&(V=V[j]),V)if(b>=0&&b<=g.width-N&&R>=0&&R<=g.height-F){Re.bindFramebuffer(B.FRAMEBUFFER,V);const K=g.textures[$],se=K.format,Q=K.type;if(!$e.textureFormatReadable(se))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$e.textureTypeReadable(Q))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ce=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,ce),B.bufferData(B.PIXEL_PACK_BUFFER,U.byteLength,B.STREAM_READ),g.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+$),B.readPixels(b,R,N,F,Ge.convert(se),Ge.convert(Q),0);const we=C!==null?Ae.get(C).__webglFramebuffer:null;Re.bindFramebuffer(B.FRAMEBUFFER,we);const pe=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await dv(B,pe,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,ce),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,U),B.deleteBuffer(ce),B.deleteSync(pe),U}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(g,b=null,R=0){const N=Math.pow(2,-R),F=Math.floor(g.image.width*N),U=Math.floor(g.image.height*N),j=b!==null?b.x:0,$=b!==null?b.y:0;Oe.setTexture2D(g,0),B.copyTexSubImage2D(B.TEXTURE_2D,R,0,0,j,$,F,U),Re.unbindTexture()};const es=B.createFramebuffer(),x=B.createFramebuffer();this.copyTextureToTexture=function(g,b,R=null,N=null,F=0,U=null){U===null&&(F!==0?(Ga("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),U=F,F=0):U=0);let j,$,V,K,se,Q,ce,we,pe;const ge=g.isCompressedTexture?g.mipmaps[U]:g.image;if(R!==null)j=R.max.x-R.min.x,$=R.max.y-R.min.y,V=R.isBox3?R.max.z-R.min.z:1,K=R.min.x,se=R.min.y,Q=R.isBox3?R.min.z:0;else{const ct=Math.pow(2,-F);j=Math.floor(ge.width*ct),$=Math.floor(ge.height*ct),g.isDataArrayTexture?V=ge.depth:g.isData3DTexture?V=Math.floor(ge.depth*ct):V=1,K=0,se=0,Q=0}N!==null?(ce=N.x,we=N.y,pe=N.z):(ce=0,we=0,pe=0);const Ce=Ge.convert(b.format),Se=Ge.convert(b.type);let qe;b.isData3DTexture?(Oe.setTexture3D(b,0),qe=B.TEXTURE_3D):b.isDataArrayTexture||b.isCompressedArrayTexture?(Oe.setTexture2DArray(b,0),qe=B.TEXTURE_2D_ARRAY):(Oe.setTexture2D(b,0),qe=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,b.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,b.unpackAlignment);const Ze=B.getParameter(B.UNPACK_ROW_LENGTH),at=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Ke=B.getParameter(B.UNPACK_SKIP_PIXELS),ut=B.getParameter(B.UNPACK_SKIP_ROWS),kt=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,ge.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ge.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,K),B.pixelStorei(B.UNPACK_SKIP_ROWS,se),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Q);const Je=g.isDataArrayTexture||g.isData3DTexture,Qe=b.isDataArrayTexture||b.isData3DTexture;if(g.isDepthTexture){const ct=Ae.get(g),Ft=Ae.get(b),Jt=Ae.get(ct.__renderTarget),On=Ae.get(Ft.__renderTarget);Re.bindFramebuffer(B.READ_FRAMEBUFFER,Jt.__webglFramebuffer),Re.bindFramebuffer(B.DRAW_FRAMEBUFFER,On.__webglFramebuffer);for(let si=0;si<V;si++)Je&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ae.get(g).__webglTexture,F,Q+si),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ae.get(b).__webglTexture,U,pe+si)),B.blitFramebuffer(K,se,j,$,ce,we,j,$,B.DEPTH_BUFFER_BIT,B.NEAREST);Re.bindFramebuffer(B.READ_FRAMEBUFFER,null),Re.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(F!==0||g.isRenderTargetTexture||Ae.has(g)){const ct=Ae.get(g),Ft=Ae.get(b);Re.bindFramebuffer(B.READ_FRAMEBUFFER,es),Re.bindFramebuffer(B.DRAW_FRAMEBUFFER,x);for(let Jt=0;Jt<V;Jt++)Je?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ct.__webglTexture,F,Q+Jt):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,ct.__webglTexture,F),Qe?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ft.__webglTexture,U,pe+Jt):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ft.__webglTexture,U),F!==0?B.blitFramebuffer(K,se,j,$,ce,we,j,$,B.COLOR_BUFFER_BIT,B.NEAREST):Qe?B.copyTexSubImage3D(qe,U,ce,we,pe+Jt,K,se,j,$):B.copyTexSubImage2D(qe,U,ce,we,K,se,j,$);Re.bindFramebuffer(B.READ_FRAMEBUFFER,null),Re.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Qe?g.isDataTexture||g.isData3DTexture?B.texSubImage3D(qe,U,ce,we,pe,j,$,V,Ce,Se,ge.data):b.isCompressedArrayTexture?B.compressedTexSubImage3D(qe,U,ce,we,pe,j,$,V,Ce,ge.data):B.texSubImage3D(qe,U,ce,we,pe,j,$,V,Ce,Se,ge):g.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,U,ce,we,j,$,Ce,Se,ge.data):g.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,U,ce,we,ge.width,ge.height,Ce,ge.data):B.texSubImage2D(B.TEXTURE_2D,U,ce,we,j,$,Ce,Se,ge);B.pixelStorei(B.UNPACK_ROW_LENGTH,Ze),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,at),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Ke),B.pixelStorei(B.UNPACK_SKIP_ROWS,ut),B.pixelStorei(B.UNPACK_SKIP_IMAGES,kt),U===0&&b.generateMipmaps&&B.generateMipmap(qe),Re.unbindTexture()},this.copyTextureToTexture3D=function(g,b,R=null,N=null,F=0){return Ga('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(g,b,R,N,F)},this.initRenderTarget=function(g){Ae.get(g).__webglFramebuffer===void 0&&Oe.setupRenderTarget(g)},this.initTexture=function(g){g.isCubeTexture?Oe.setTextureCube(g,0):g.isData3DTexture?Oe.setTexture3D(g,0):g.isDataArrayTexture||g.isCompressedArrayTexture?Oe.setTexture2DArray(g,0):Oe.setTexture2D(g,0),Re.unbindTexture()},this.resetState=function(){I=0,P=0,C=null,Re.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=mt._getUnpackColorSpace()}}var gn=function(){var n=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(h){h.preventDefault(),i(++n%e.children.length)},!1);function t(h){return e.appendChild(h.dom),h}function i(h){for(var u=0;u<e.children.length;u++)e.children[u].style.display=u===h?"block":"none";n=h}var s=(performance||Date).now(),r=s,a=0,o=t(new gn.Panel("FPS","#0ff","#002")),l=t(new gn.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=t(new gn.Panel("MB","#f08","#201"));return i(0),{REVISION:16,dom:e,addPanel:t,showPanel:i,begin:function(){s=(performance||Date).now()},end:function(){a++;var h=(performance||Date).now();if(l.update(h-s,200),h>=r+1e3&&(o.update(a*1e3/(h-r),100),r=h,a=0,c)){var u=performance.memory;c.update(u.usedJSHeapSize/1048576,u.jsHeapSizeLimit/1048576)}return h},update:function(){s=this.end()},domElement:e,setMode:i}};gn.Panel=function(n,e,t){var i=1/0,s=0,r=Math.round,a=r(window.devicePixelRatio||1),o=80*a,l=48*a,c=3*a,h=2*a,u=3*a,d=15*a,f=74*a,_=30*a,v=document.createElement("canvas");v.width=o,v.height=l,v.style.cssText="width:80px;height:48px";var m=v.getContext("2d");return m.font="bold "+9*a+"px Helvetica,Arial,sans-serif",m.textBaseline="top",m.fillStyle=t,m.fillRect(0,0,o,l),m.fillStyle=e,m.fillText(n,c,h),m.fillRect(u,d,f,_),m.fillStyle=t,m.globalAlpha=.9,m.fillRect(u,d,f,_),{dom:v,update:function(p,y){i=Math.min(i,p),s=Math.max(s,p),m.fillStyle=t,m.globalAlpha=1,m.fillRect(0,0,o,d),m.fillStyle=e,m.fillText(r(p)+" "+n+" ("+r(i)+"-"+r(s)+")",c,h),m.drawImage(v,u+a,d,f-a,_,u,d,f-a,_),m.fillRect(u+f-a,d,a,_),m.fillStyle=t,m.globalAlpha=.9,m.fillRect(u+f-a,d,a,r((1-p/y)*_))}}};function zp(n,e){if(e===z_)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===Xu||e===hg){let t=n.getIndex();if(t===null){const a=[],o=n.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);n.setIndex(a),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const i=t.count-2,s=[];if(e===Xu)for(let a=1;a<=i;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<i;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=n.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}function ub(n,e=Math.PI/3){const t=Math.cos(e),i=(1+1e-10)*100,s=[new D,new D,new D],r=new D,a=new D,o=new D,l=new D;function c(v){const m=~~(v.x*i),p=~~(v.y*i),y=~~(v.z*i);return`${m},${p},${y}`}const h=n.index?n.toNonIndexed():n,u=h.attributes.position,d={};for(let v=0,m=u.count/3;v<m;v++){const p=3*v,y=s[0].fromBufferAttribute(u,p+0),w=s[1].fromBufferAttribute(u,p+1),S=s[2].fromBufferAttribute(u,p+2);r.subVectors(S,w),a.subVectors(y,w);const A=new D().crossVectors(r,a).normalize();for(let I=0;I<3;I++){const P=s[I],C=c(P);C in d||(d[C]=[]),d[C].push(A)}}const f=new Float32Array(u.count*3),_=new Xt(f,3,!1);for(let v=0,m=u.count/3;v<m;v++){const p=3*v,y=s[0].fromBufferAttribute(u,p+0),w=s[1].fromBufferAttribute(u,p+1),S=s[2].fromBufferAttribute(u,p+2);r.subVectors(S,w),a.subVectors(y,w),o.crossVectors(r,a).normalize();for(let A=0;A<3;A++){const I=s[A],P=c(I),C=d[P];l.set(0,0,0);for(let M=0,E=C.length;M<E;M++){const L=C[M];o.dot(L)>t&&l.add(L)}l.normalize(),_.setXYZ(p+A,l.x,l.y,l.z)}}return h.setAttribute("normal",_),h}class Vn extends nr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new gb(t)}),this.register(function(t){return new _b(t)}),this.register(function(t){return new Tb(t)}),this.register(function(t){return new Ab(t)}),this.register(function(t){return new Rb(t)}),this.register(function(t){return new xb(t)}),this.register(function(t){return new yb(t)}),this.register(function(t){return new wb(t)}),this.register(function(t){return new Sb(t)}),this.register(function(t){return new mb(t)}),this.register(function(t){return new Mb(t)}),this.register(function(t){return new vb(t)}),this.register(function(t){return new Eb(t)}),this.register(function(t){return new bb(t)}),this.register(function(t){return new fb(t)}),this.register(function(t){return new Cb(t)}),this.register(function(t){return new Pb(t)})}load(e,t,i,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=zo.extractUrlBase(e);a=zo.resolveURL(c,this.path)}else a=zo.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Qr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,s){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Og){try{a[dt.KHR_BINARY_GLTF]=new Db(e)}catch(u){s&&s(u);return}r=JSON.parse(a[dt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Wb(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case dt.KHR_MATERIALS_UNLIT:a[u]=new pb;break;case dt.KHR_DRACO_MESH_COMPRESSION:a[u]=new Ib(r,this.dracoLoader);break;case dt.KHR_TEXTURE_TRANSFORM:a[u]=new Lb;break;case dt.KHR_MESH_QUANTIZATION:a[u]=new Ub;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(i,s)}parseAsync(e,t){const i=this;return new Promise(function(s,r){i.parse(e,t,s,r)})}}function db(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}const dt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class fb{constructor(e){this.parser=e,this.name=dt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let i=0,s=t.length;i<s;i++){const r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,i="light:"+e;let s=t.cache.get(i);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new ye(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Ut);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new na(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new dx(h),c.distance=u;break;case"spot":c=new xr(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),ks(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(i,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,i=this.parser,r=i.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}}class pb{constructor(){this.name=dt.KHR_MATERIALS_UNLIT}getMaterialType(){return yi}extendParams(e,t,i){const s=[];e.color=new ye(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Ut),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",r.baseColorTexture,je))}return Promise.all(s)}}class mb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class gb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(i.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ue(o,o)}return Promise.all(r)}}class _b{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class vb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class xb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SHEEN}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new ye(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Ut)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(i.assignTexture(t,"sheenColorMap",a.sheenColorTexture,je)),a.sheenRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class yb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(i.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class wb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_VOLUME}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(i.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new ye().setRGB(o[0],o[1],o[2],Ut),Promise.all(r)}}class Sb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IOR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Mb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(i.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new ye().setRGB(o[0],o[1],o[2],Ut),a.specularColorTexture!==void 0&&r.push(i.assignTexture(t,"specularColorMap",a.specularColorTexture,je)),Promise.all(r)}}class bb{constructor(e){this.parser=e,this.name=dt.EXT_MATERIALS_BUMP}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(i.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class Eb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bi}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(i.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class Tb{constructor(e){this.parser=e,this.name=dt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,i=t.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class Ab{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}}class Rb{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}}class Cb{constructor(e){this.name=dt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){const s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}}class Pb{constructor(e){this.name=dt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const s=t.meshes[i.mesh];for(const c of s.primitives)if(c.mode!==ci.TRIANGLES&&c.mode!==ci.TRIANGLE_STRIP&&c.mode!==ci.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=i.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const _ of u){const v=new We,m=new D,p=new Ht,y=new D(1,1,1),w=new Kd(_.geometry,_.material,d);for(let S=0;S<d;S++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,S),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,S),l.SCALE&&y.fromBufferAttribute(l.SCALE,S),w.setMatrixAt(S,v.compose(m,p,y));for(const S in l)if(S==="_COLOR_0"){const A=l[S];w.instanceColor=new Qa(A.array,A.itemSize,A.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&_.geometry.setAttribute(S,l[S]);Pt.prototype.copy.call(w,_),this.parser.assignFinalMaterial(w),f.push(w)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Og="glTF",Eo=12,Hp={JSON:1313821514,BIN:5130562};class Db{constructor(e){this.name=dt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Eo),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Og)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Eo,r=new DataView(e,Eo);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===Hp.JSON){const c=new Uint8Array(e,Eo+a,o);this.content=i.decode(c)}else if(l===Hp.BIN){const c=Eo+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Ib{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=dt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const i=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=Ku[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=Ku[h]||h.toLowerCase();if(a[h]!==void 0){const d=i.accessors[e.attributes[h]],f=Wa[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(const _ in f.attributes){const v=f.attributes[_],m=l[_];m!==void 0&&(v.normalized=m)}u(f)},o,c,Ut,d)})})}}class Lb{constructor(){this.name=dt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Ub{constructor(){this.name=dt.KHR_MESH_QUANTIZATION}}class Bg extends dl{constructor(e,t,i,s){super(e,t,i,s)}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=i[r+a];return t}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=s-t,u=(i-t)/h,d=u*u,f=d*u,_=e*c,v=_-c,m=-2*f+3*d,p=f-d,y=1-m,w=p-d+u;for(let S=0;S!==o;S++){const A=a[v+S+o],I=a[v+S+l]*h,P=a[_+S+o],C=a[_+S]*h;r[S]=y*A+w*I+m*P+p*C}return r}}const Nb=new Ht;class Fb extends Bg{interpolate_(e,t,i,s){const r=super.interpolate_(e,t,i,s);return Nb.fromArray(r).normalize().toArray(r),r}}const ci={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Wa={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Gp={9728:wn,9729:nt,9984:ig,9985:xc,9986:Io,9987:ji},Vp={33071:ys,33648:Nc,10497:$i},Gh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ku={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},cr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Ob={CUBICSPLINE:void 0,LINEAR:nl,STEP:tl},Vh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Bb(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new Wt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:qi})),n.DefaultMaterial}function Lr(n,e,t){for(const i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function ks(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function kb(n,e,t){let i=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(i=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(i){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):n.attributes.position;a.push(d)}if(s){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):n.attributes.normal;o.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):n.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return i&&(n.morphAttributes.position=h),s&&(n.morphAttributes.normal=u),r&&(n.morphAttributes.color=d),n.morphTargetsRelative=!0,n})}function zb(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,s=t.length;i<s;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Hb(n){let e;const t=n.extensions&&n.extensions[dt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Wh(t.attributes):e=n.indices+":"+Wh(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)e+=":"+Wh(n.targets[i]);return e}function Wh(n){let e="";const t=Object.keys(n).sort();for(let i=0,s=t.length;i<s;i++)e+=t[i]+":"+n[t[i]]+";";return e}function Ju(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Gb(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Vb=new We;class Wb{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new db,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);s=i&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||r&&a<98?this.textureLoader=new tr(this.options.manager):this.textureLoader=new mx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Qr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:i,userData:{}};return Lr(r,o,s),ks(o,s),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;const s=i.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())r(h,o.children[c])};return r(i,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const s=e(t[i]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&i.push(r)}return i}getDependency(e,t){const i=e+":"+t;let s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[dt.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){i.load(zo.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){const s=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(e){const t=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=Gh[s.type],o=Wa[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new Xt(c,a,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=Gh[s.type],c=Wa[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=s.byteOffset||0,f=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,_=s.normalized===!0;let v,m;if(f&&f!==u){const p=Math.floor(d/f),y="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let w=t.cache.get(y);w||(v=new c(o,p*f,s.count*f/h),w=new xg(v,f/h),t.cache.add(y,w)),m=new rl(w,l,d%f/h,_)}else o===null?v=new c(s.count*l):v=new c(o,d,s.count*l),m=new Xt(v,l,_);if(s.sparse!==void 0){const p=Gh.SCALAR,y=Wa[s.sparse.indices.componentType],w=s.sparse.indices.byteOffset||0,S=s.sparse.values.byteOffset||0,A=new y(a[1],w,s.sparse.count*p),I=new c(a[2],S,s.sparse.count*l);o!==null&&(m=new Xt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let P=0,C=A.length;P<C;P++){const M=A[P];if(m.setX(M,I[P*l]),l>=2&&m.setY(M,I[P*l+1]),l>=3&&m.setZ(M,I[P*l+2]),l>=4&&m.setW(M,I[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,i=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=i.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,i){const s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return h.magFilter=Gp[d.magFilter]||nt,h.minFilter=Gp[d.minFilter]||ji,h.wrapS=Vp[d.wrapS]||$i,h.wrapT=Vp[d.wrapT]||$i,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==wn&&h.minFilter!==nt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const i=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=s.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=i.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let _=d;t.isImageBitmapLoader===!0&&(_=function(v){const m=new Kt(v);m.needsUpdate=!0,d(m)}),t.load(zo.resolveURL(u,r.path),_,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),ks(u,a),u.userData.mimeType=a.mimeType||Gb(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,i,s){const r=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),r.extensions[dt.KHR_TEXTURE_TRANSFORM]){const o=i.extensions!==void 0?i.extensions[dt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[dt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let i=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new bg,Rn.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){const o="LineBasicMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new br,Rn.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(o,l)),i=l}if(s||r||a){let o="ClonedMaterial:"+i.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return Wt}loadMaterial(e){const t=this,i=this.json,s=this.extensions,r=i.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[dt.KHR_MATERIALS_UNLIT]){const u=s[dt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new ye(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Ut),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,je)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=xn);const h=r.alphaMode||Vh.OPAQUE;if(h===Vh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Vh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==yi&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ue(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==yi&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==yi){const u=r.emissiveFactor;o.emissive=new ye().setRGB(u[0],u[1],u[2],Ut)}return r.emissiveTexture!==void 0&&a!==yi&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,je)),Promise.all(c).then(function(){const u=new a(o);return r.name&&(u.name=r.name),ks(u,r),t.associations.set(u,{materials:e}),r.extensions&&Lr(s,u,r),u})}createUniqueName(e){const t=Et.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,i=this.extensions,s=this.primitiveCache;function r(o){return i[dt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Wp(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=Hb(c),u=s[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[dt.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Wp(new Tt,c,t),s[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,i=this.json,s=this.extensions,r=i.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?Bb(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,_=h.length;f<_;f++){const v=h[f],m=a[f];let p;const y=c[f];if(m.mode===ci.TRIANGLES||m.mode===ci.TRIANGLE_STRIP||m.mode===ci.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Sg(v,y):new he(v,y),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===ci.TRIANGLE_STRIP?p.geometry=zp(p.geometry,hg):m.mode===ci.TRIANGLE_FAN&&(p.geometry=zp(p.geometry,Xu));else if(m.mode===ci.LINES)p=new ul(v,y);else if(m.mode===ci.LINE_STRIP)p=new di(v,y);else if(m.mode===ci.LINE_LOOP)p=new $v(v,y);else if(m.mode===ci.POINTS)p=new jv(v,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&zb(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),ks(p,r),m.extensions&&Lr(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,_=u.length;f<_;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Lr(s,u[0],r),u[0];const d=new wt;r.extensions&&Lr(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,_=u.length;f<_;f++)d.add(u[f]);return d})}loadCamera(e){let t;const i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new yt(xt.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(t=new fl(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),ks(t,i),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],i=[];for(let s=0,r=t.joints.length;s<r;s++)i.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){const r=s.pop(),a=s,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new We;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new qd(o,l)})}loadAnimation(e){const t=this.json,i=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){const f=s.channels[u],_=s.samplers[f.sampler],v=f.target,m=v.node,p=s.parameters!==void 0?s.parameters[_.input]:_.input,y=s.parameters!==void 0?s.parameters[_.output]:_.output;v.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",y)),c.push(_),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],_=u[2],v=u[3],m=u[4],p=[];for(let y=0,w=d.length;y<w;y++){const S=d[y],A=f[y],I=_[y],P=v[y],C=m[y];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();const M=i._createAnimationTracks(S,A,I,P,C);if(M)for(let E=0;E<M.length;E++)p.push(M[E])}return new ix(r,void 0,p)})}createNodeMesh(e){const t=this.json,i=this,s=t.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){const a=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){const t=this.json,i=this,s=t.nodes[e],r=i._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,h=o.length;c<h;c++)a.push(i.getDependency("node",o[c]));const l=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Vb)});for(let f=0,_=u.length;f<_;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,i=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new Mg:c.length>1?h=new wt:c.length===1?h=c[0]:h=new Pt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),ks(h,r),r.extensions&&Lr(i,h,r),r.matrix!==void 0){const u=new We;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,i=this.json.scenes[e],s=this,r=new wt;i.name&&(r.name=s.createUniqueName(i.name)),ks(r,i),i.extensions&&Lr(t,r,i);const a=i.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of s.associations)(d instanceof Rn||d instanceof Kt)&&u.set(d,f);return h.traverse(d=>{const f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,i,s,r){const a=[],o=e.name?e.name:e.uuid,l=[];cr[r.path]===cr.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(cr[r.path]){case cr.weights:c=eo;break;case cr.rotation:c=to;break;case cr.translation:case cr.scale:c=no;break;default:switch(i.itemSize){case 1:c=eo;break;case 2:case 3:default:c=no;break}break}const h=s.interpolation!==void 0?Ob[s.interpolation]:nl,u=this._getArrayFromAccessor(i);for(let d=0,f=l.length;d<f;d++){const _=new c(l[d]+"."+cr[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),a.push(_)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const i=Ju(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*i;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){const s=this instanceof to?Fb:Bg;return new s(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Xb(n,e,t){const i=e.attributes,s=new Es;if(i.POSITION!==void 0){const o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new D(l[0],l[1],l[2]),new D(c[0],c[1],c[2])),o.normalized){const h=Ju(Wa[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new D,l=new D;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,_=d.max;if(f!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(_[2]))),d.normalized){const v=Ju(Wa[d.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}n.boundingBox=s;const a=new Ts;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=a}function Wp(n,e,t){const i=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){n.setAttribute(o,l)})}for(const a in i){const o=Ku[a]||a.toLowerCase();o in n.attributes||s.push(r(i[a],o))}if(e.indices!==void 0&&!n.index){const a=t.getDependency("accessor",e.indices).then(function(o){n.setIndex(o)});s.push(a)}return mt.workingColorSpace!==Ut&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${mt.workingColorSpace}" not supported.`),ks(n,e),Xb(n,e,t),Promise.all(s).then(function(){return e.targets!==void 0?kb(n,e.targets,t):n})}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var _i=Uint8Array,za=Uint16Array,$b=Int32Array,kg=new _i([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),zg=new _i([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),jb=new _i([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Hg=function(n,e){for(var t=new za(31),i=0;i<31;++i)t[i]=e+=1<<n[i-1];for(var s=new $b(t[30]),i=1;i<30;++i)for(var r=t[i];r<t[i+1];++r)s[r]=r-t[i]<<5|i;return{b:t,r:s}},Gg=Hg(kg,2),Vg=Gg.b,Yb=Gg.r;Vg[28]=258,Yb[258]=28;var Zb=Hg(zg,0),qb=Zb.b,Qu=new za(32768);for(var Bt=0;Bt<32768;++Bt){var hr=(Bt&43690)>>1|(Bt&21845)<<1;hr=(hr&52428)>>2|(hr&13107)<<2,hr=(hr&61680)>>4|(hr&3855)<<4,Qu[Bt]=((hr&65280)>>8|(hr&255)<<8)>>1}var Go=function(n,e,t){for(var i=n.length,s=0,r=new za(e);s<i;++s)n[s]&&++r[n[s]-1];var a=new za(e);for(s=1;s<e;++s)a[s]=a[s-1]+r[s-1]<<1;var o;if(t){o=new za(1<<e);var l=15-e;for(s=0;s<i;++s)if(n[s])for(var c=s<<4|n[s],h=e-n[s],u=a[n[s]-1]++<<h,d=u|(1<<h)-1;u<=d;++u)o[Qu[u]>>l]=c}else for(o=new za(i),s=0;s<i;++s)n[s]&&(o[s]=Qu[a[n[s]-1]++]>>15-n[s]);return o},pl=new _i(288);for(var Bt=0;Bt<144;++Bt)pl[Bt]=8;for(var Bt=144;Bt<256;++Bt)pl[Bt]=9;for(var Bt=256;Bt<280;++Bt)pl[Bt]=7;for(var Bt=280;Bt<288;++Bt)pl[Bt]=8;var Wg=new _i(32);for(var Bt=0;Bt<32;++Bt)Wg[Bt]=5;var Kb=Go(pl,9,1),Jb=Go(Wg,5,1),Xh=function(n){for(var e=n[0],t=1;t<n.length;++t)n[t]>e&&(e=n[t]);return e},Ci=function(n,e,t){var i=e/8|0;return(n[i]|n[i+1]<<8)>>(e&7)&t},$h=function(n,e){var t=e/8|0;return(n[t]|n[t+1]<<8|n[t+2]<<16)>>(e&7)},Qb=function(n){return(n+7)/8|0},eE=function(n,e,t){return(t==null||t>n.length)&&(t=n.length),new _i(n.subarray(e,t))},tE=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Ui=function(n,e,t){var i=new Error(e||tE[n]);if(i.code=n,Error.captureStackTrace&&Error.captureStackTrace(i,Ui),!t)throw i;return i},nE=function(n,e,t,i){var s=n.length,r=0;if(!s||e.f&&!e.l)return t||new _i(0);var a=!t,o=a||e.i!=2,l=e.i;a&&(t=new _i(s*3));var c=function(gt){var st=t.length;if(gt>st){var B=new _i(Math.max(st*2,gt));B.set(t),t=B}},h=e.f||0,u=e.p||0,d=e.b||0,f=e.l,_=e.d,v=e.m,m=e.n,p=s*8;do{if(!f){h=Ci(n,u,1);var y=Ci(n,u+1,3);if(u+=3,y)if(y==1)f=Kb,_=Jb,v=9,m=5;else if(y==2){var I=Ci(n,u,31)+257,P=Ci(n,u+10,15)+4,C=I+Ci(n,u+5,31)+1;u+=14;for(var M=new _i(C),E=new _i(19),L=0;L<P;++L)E[jb[L]]=Ci(n,u+L*3,7);u+=P*3;for(var G=Xh(E),H=(1<<G)-1,z=Go(E,G,1),L=0;L<C;){var q=z[Ci(n,u,H)];u+=q&15;var w=q>>4;if(w<16)M[L++]=w;else{var X=0,ie=0;for(w==16?(ie=3+Ci(n,u,3),u+=2,X=M[L-1]):w==17?(ie=3+Ci(n,u,7),u+=3):w==18&&(ie=11+Ci(n,u,127),u+=7);ie--;)M[L++]=X}}var Z=M.subarray(0,I),re=M.subarray(I);v=Xh(Z),m=Xh(re),f=Go(Z,v,1),_=Go(re,m,1)}else Ui(1);else{var w=Qb(u)+4,S=n[w-4]|n[w-3]<<8,A=w+S;if(A>s){l&&Ui(0);break}o&&c(d+S),t.set(n.subarray(w,A),d),e.b=d+=S,e.p=u=A*8,e.f=h;continue}if(u>p){l&&Ui(0);break}}o&&c(d+131072);for(var oe=(1<<v)-1,Te=(1<<m)-1,fe=u;;fe=u){var X=f[$h(n,u)&oe],ke=X>>4;if(u+=X&15,u>p){l&&Ui(0);break}if(X||Ui(2),ke<256)t[d++]=ke;else if(ke==256){fe=u,f=null;break}else{var Ye=ke-254;if(ke>264){var L=ke-257,W=kg[L];Ye=Ci(n,u,(1<<W)-1)+Vg[L],u+=W}var ee=_[$h(n,u)&Te],ae=ee>>4;ee||Ui(3),u+=ee&15;var re=qb[ae];if(ae>3){var W=zg[ae];re+=$h(n,u)&(1<<W)-1,u+=W}if(u>p){l&&Ui(0);break}o&&c(d+131072);var Ne=d+Ye;if(d<re){var De=r-re,Le=Math.min(re,Ne);for(De+d<0&&Ui(3);d<Le;++d)t[d]=i[De+d]}for(;d<Ne;++d)t[d]=t[d-re]}}e.l=f,e.p=fe,e.b=d,e.f=h,f&&(h=1,e.m=v,e.d=_,e.n=m)}while(!h);return d!=t.length&&a?eE(t,0,d):t.subarray(0,d)},iE=new _i(0),sE=function(n,e){return((n[0]&15)!=8||n[0]>>4>7||(n[0]<<8|n[1])%31)&&Ui(6,"invalid zlib data"),(n[1]>>5&1)==1&&Ui(6,"invalid zlib data: "+(n[1]&32?"need":"unexpected")+" dictionary"),(n[1]>>3&4)+2};function tc(n,e){return nE(n.subarray(sE(n),-4),{i:2},e,e)}var rE=typeof TextDecoder<"u"&&new TextDecoder,aE=0;try{rE.decode(iE,{stream:!0}),aE=1}catch{}class co extends Cg{constructor(e){super(e),this.type=Gt,this.outputFormat=rn}parse(e){const M=Math.pow(2.7182818,2.2);function E(x,g){let b=0;for(let N=0;N<65536;++N)(N==0||x[N>>3]&1<<(N&7))&&(g[b++]=N);const R=b-1;for(;b<65536;)g[b++]=0;return R}function L(x){for(let g=0;g<16384;g++)x[g]={},x[g].len=0,x[g].lit=0,x[g].p=null}const G={l:0,c:0,lc:0};function H(x,g,b,R,N){for(;b<x;)g=g<<8|Ge(R,N),b+=8;b-=x,G.l=g>>b&(1<<x)-1,G.c=g,G.lc=b}const z=new Array(59);function q(x){for(let b=0;b<=58;++b)z[b]=0;for(let b=0;b<65537;++b)z[x[b]]+=1;let g=0;for(let b=58;b>0;--b){const R=g+z[b]>>1;z[b]=g,g=R}for(let b=0;b<65537;++b){const R=x[b];R>0&&(x[b]=R|z[R]++<<6)}}function X(x,g,b,R,N,F){const U=g;let j=0,$=0;for(;R<=N;R++){if(U.value-g.value>b)return!1;H(6,j,$,x,U);const V=G.l;if(j=G.c,$=G.lc,F[R]=V,V==63){if(U.value-g.value>b)throw new Error("Something wrong with hufUnpackEncTable");H(8,j,$,x,U);let K=G.l+6;if(j=G.c,$=G.lc,R+K>N+1)throw new Error("Something wrong with hufUnpackEncTable");for(;K--;)F[R++]=0;R--}else if(V>=59){let K=V-59+2;if(R+K>N+1)throw new Error("Something wrong with hufUnpackEncTable");for(;K--;)F[R++]=0;R--}}q(F)}function ie(x){return x&63}function Z(x){return x>>6}function re(x,g,b,R){for(;g<=b;g++){const N=Z(x[g]),F=ie(x[g]);if(N>>F)throw new Error("Invalid table entry");if(F>14){const U=R[N>>F-14];if(U.len)throw new Error("Invalid table entry");if(U.lit++,U.p){const j=U.p;U.p=new Array(U.lit);for(let $=0;$<U.lit-1;++$)U.p[$]=j[$]}else U.p=new Array(1);U.p[U.lit-1]=g}else if(F){let U=0;for(let j=1<<14-F;j>0;j--){const $=R[(N<<14-F)+U];if($.len||$.p)throw new Error("Invalid table entry");$.len=F,$.lit=g,U++}}}return!0}const oe={c:0,lc:0};function Te(x,g,b,R){x=x<<8|Ge(b,R),g+=8,oe.c=x,oe.lc=g}const fe={c:0,lc:0};function ke(x,g,b,R,N,F,U,j,$){if(x==g){R<8&&(Te(b,R,N,F),b=oe.c,R=oe.lc),R-=8;let V=b>>R;if(V=new Uint8Array([V])[0],j.value+V>$)return!1;const K=U[j.value-1];for(;V-- >0;)U[j.value++]=K}else if(j.value<$)U[j.value++]=x;else return!1;fe.c=b,fe.lc=R}function Ye(x){return x&65535}function W(x){const g=Ye(x);return g>32767?g-65536:g}const ee={a:0,b:0};function ae(x,g){const b=W(x),N=W(g),F=b+(N&1)+(N>>1),U=F,j=F-N;ee.a=U,ee.b=j}function Ne(x,g){const b=Ye(x),R=Ye(g),N=b-(R>>1)&65535,F=R+N-32768&65535;ee.a=F,ee.b=N}function De(x,g,b,R,N,F,U){const j=U<16384,$=b>N?N:b;let V=1,K,se;for(;V<=$;)V<<=1;for(V>>=1,K=V,V>>=1;V>=1;){se=0;const Q=se+F*(N-K),ce=F*V,we=F*K,pe=R*V,ge=R*K;let Ce,Se,qe,Ze;for(;se<=Q;se+=we){let at=se;const Ke=se+R*(b-K);for(;at<=Ke;at+=ge){const ut=at+pe,kt=at+ce,Je=kt+pe;j?(ae(x[at+g],x[kt+g]),Ce=ee.a,qe=ee.b,ae(x[ut+g],x[Je+g]),Se=ee.a,Ze=ee.b,ae(Ce,Se),x[at+g]=ee.a,x[ut+g]=ee.b,ae(qe,Ze),x[kt+g]=ee.a,x[Je+g]=ee.b):(Ne(x[at+g],x[kt+g]),Ce=ee.a,qe=ee.b,Ne(x[ut+g],x[Je+g]),Se=ee.a,Ze=ee.b,Ne(Ce,Se),x[at+g]=ee.a,x[ut+g]=ee.b,Ne(qe,Ze),x[kt+g]=ee.a,x[Je+g]=ee.b)}if(b&V){const ut=at+ce;j?ae(x[at+g],x[ut+g]):Ne(x[at+g],x[ut+g]),Ce=ee.a,x[ut+g]=ee.b,x[at+g]=Ce}}if(N&V){let at=se;const Ke=se+R*(b-K);for(;at<=Ke;at+=ge){const ut=at+pe;j?ae(x[at+g],x[ut+g]):Ne(x[at+g],x[ut+g]),Ce=ee.a,x[ut+g]=ee.b,x[at+g]=Ce}}K=V,V>>=1}return se}function Le(x,g,b,R,N,F,U,j,$){let V=0,K=0;const se=U,Q=Math.trunc(R.value+(N+7)/8);for(;R.value<Q;)for(Te(V,K,b,R),V=oe.c,K=oe.lc;K>=14;){const we=V>>K-14&16383,pe=g[we];if(pe.len)K-=pe.len,ke(pe.lit,F,V,K,b,R,j,$,se),V=fe.c,K=fe.lc;else{if(!pe.p)throw new Error("hufDecode issues");let ge;for(ge=0;ge<pe.lit;ge++){const Ce=ie(x[pe.p[ge]]);for(;K<Ce&&R.value<Q;)Te(V,K,b,R),V=oe.c,K=oe.lc;if(K>=Ce&&Z(x[pe.p[ge]])==(V>>K-Ce&(1<<Ce)-1)){K-=Ce,ke(pe.p[ge],F,V,K,b,R,j,$,se),V=fe.c,K=fe.lc;break}}if(ge==pe.lit)throw new Error("hufDecode issues")}}const ce=8-N&7;for(V>>=ce,K-=ce;K>0;){const we=g[V<<14-K&16383];if(we.len)K-=we.len,ke(we.lit,F,V,K,b,R,j,$,se),V=fe.c,K=fe.lc;else throw new Error("hufDecode issues")}return!0}function gt(x,g,b,R,N,F){const U={value:0},j=b.value,$=He(g,b),V=He(g,b);b.value+=4;const K=He(g,b);if(b.value+=4,$<0||$>=65537||V<0||V>=65537)throw new Error("Something wrong with HUF_ENCSIZE");const se=new Array(65537),Q=new Array(16384);L(Q);const ce=R-(b.value-j);if(X(x,b,ce,$,V,se),K>8*(R-(b.value-j)))throw new Error("Something wrong with hufUncompress");re(se,$,V,Q),Le(se,Q,x,b,K,V,F,N,U)}function st(x,g,b){for(let R=0;R<b;++R)g[R]=x[g[R]]}function B(x){for(let g=1;g<x.length;g++){const b=x[g-1]+x[g]-128;x[g]=b}}function Ie(x,g){let b=0,R=Math.floor((x.length+1)/2),N=0;const F=x.length-1;for(;!(N>F||(g[N++]=x[b++],N>F));)g[N++]=x[R++]}function Me(x){let g=x.byteLength;const b=new Array;let R=0;const N=new DataView(x);for(;g>0;){const F=N.getInt8(R++);if(F<0){const U=-F;g-=U+1;for(let j=0;j<U;j++)b.push(N.getUint8(R++))}else{const U=F;g-=2;const j=N.getUint8(R++);for(let $=0;$<U+1;$++)b.push(j)}}return b}function $e(x,g,b,R,N,F){let U=new DataView(F.buffer);const j=b[x.idx[0]].width,$=b[x.idx[0]].height,V=3,K=Math.floor(j/8),se=Math.ceil(j/8),Q=Math.ceil($/8),ce=j-(se-1)*8,we=$-(Q-1)*8,pe={value:0},ge=new Array(V),Ce=new Array(V),Se=new Array(V),qe=new Array(V),Ze=new Array(V);for(let Ke=0;Ke<V;++Ke)Ze[Ke]=g[x.idx[Ke]],ge[Ke]=Ke<1?0:ge[Ke-1]+se*Q,Ce[Ke]=new Float32Array(64),Se[Ke]=new Uint16Array(64),qe[Ke]=new Uint16Array(se*64);for(let Ke=0;Ke<Q;++Ke){let ut=8;Ke==Q-1&&(ut=we);let kt=8;for(let Qe=0;Qe<se;++Qe){Qe==se-1&&(kt=ce);for(let ct=0;ct<V;++ct)Se[ct].fill(0),Se[ct][0]=N[ge[ct]++],et(pe,R,Se[ct]),Ae(Se[ct],Ce[ct]),Oe(Ce[ct]);Nt(Ce);for(let ct=0;ct<V;++ct)Mt(Ce[ct],qe[ct],Qe*64)}let Je=0;for(let Qe=0;Qe<V;++Qe){const ct=b[x.idx[Qe]].type;for(let Ft=8*Ke;Ft<8*Ke+ut;++Ft){Je=Ze[Qe][Ft];for(let Jt=0;Jt<K;++Jt){const On=Jt*64+(Ft&7)*8;U.setUint16(Je+0*ct,qe[Qe][On+0],!0),U.setUint16(Je+2*ct,qe[Qe][On+1],!0),U.setUint16(Je+4*ct,qe[Qe][On+2],!0),U.setUint16(Je+6*ct,qe[Qe][On+3],!0),U.setUint16(Je+8*ct,qe[Qe][On+4],!0),U.setUint16(Je+10*ct,qe[Qe][On+5],!0),U.setUint16(Je+12*ct,qe[Qe][On+6],!0),U.setUint16(Je+14*ct,qe[Qe][On+7],!0),Je+=16*ct}}if(K!=se)for(let Ft=8*Ke;Ft<8*Ke+ut;++Ft){const Jt=Ze[Qe][Ft]+8*K*2*ct,On=K*64+(Ft&7)*8;for(let si=0;si<kt;++si)U.setUint16(Jt+si*2*ct,qe[Qe][On+si],!0)}}}const at=new Uint16Array(j);U=new DataView(F.buffer);for(let Ke=0;Ke<V;++Ke){b[x.idx[Ke]].decoded=!0;const ut=b[x.idx[Ke]].type;if(b[Ke].type==2)for(let kt=0;kt<$;++kt){const Je=Ze[Ke][kt];for(let Qe=0;Qe<j;++Qe)at[Qe]=U.getUint16(Je+Qe*2*ut,!0);for(let Qe=0;Qe<j;++Qe)U.setFloat32(Je+Qe*2*ut,J(at[Qe]),!0)}}}function Re(x,g,b,R,N,F){const U=new DataView(F.buffer),j=b[x],$=j.width,V=j.height,K=Math.ceil($/8),se=Math.ceil(V/8),Q=Math.floor($/8),ce=$-(K-1)*8,we=V-(se-1)*8,pe={value:0};let ge=0;const Ce=new Float32Array(64),Se=new Uint16Array(64),qe=new Uint16Array(K*64);for(let Ze=0;Ze<se;++Ze){let at=8;Ze==se-1&&(at=we);for(let Ke=0;Ke<K;++Ke)Se.fill(0),Se[0]=N[ge++],et(pe,R,Se),Ae(Se,Ce),Oe(Ce),Mt(Ce,qe,Ke*64);for(let Ke=8*Ze;Ke<8*Ze+at;++Ke){let ut=g[x][Ke];for(let kt=0;kt<Q;++kt){const Je=kt*64+(Ke&7)*8;for(let Qe=0;Qe<8;++Qe)U.setUint16(ut+Qe*2*j.type,qe[Je+Qe],!0);ut+=16*j.type}if(K!=Q){const kt=Q*64+(Ke&7)*8;for(let Je=0;Je<ce;++Je)U.setUint16(ut+Je*2*j.type,qe[kt+Je],!0)}}}j.decoded=!0}function et(x,g,b){let R,N=1;for(;N<64;)R=g[x.value],R==65280?N=64:R>>8==255?N+=R&255:(b[N]=R,N++),x.value++}function Ae(x,g){g[0]=J(x[0]),g[1]=J(x[1]),g[2]=J(x[5]),g[3]=J(x[6]),g[4]=J(x[14]),g[5]=J(x[15]),g[6]=J(x[27]),g[7]=J(x[28]),g[8]=J(x[2]),g[9]=J(x[4]),g[10]=J(x[7]),g[11]=J(x[13]),g[12]=J(x[16]),g[13]=J(x[26]),g[14]=J(x[29]),g[15]=J(x[42]),g[16]=J(x[3]),g[17]=J(x[8]),g[18]=J(x[12]),g[19]=J(x[17]),g[20]=J(x[25]),g[21]=J(x[30]),g[22]=J(x[41]),g[23]=J(x[43]),g[24]=J(x[9]),g[25]=J(x[11]),g[26]=J(x[18]),g[27]=J(x[24]),g[28]=J(x[31]),g[29]=J(x[40]),g[30]=J(x[44]),g[31]=J(x[53]),g[32]=J(x[10]),g[33]=J(x[19]),g[34]=J(x[23]),g[35]=J(x[32]),g[36]=J(x[39]),g[37]=J(x[45]),g[38]=J(x[52]),g[39]=J(x[54]),g[40]=J(x[20]),g[41]=J(x[22]),g[42]=J(x[33]),g[43]=J(x[38]),g[44]=J(x[46]),g[45]=J(x[51]),g[46]=J(x[55]),g[47]=J(x[60]),g[48]=J(x[21]),g[49]=J(x[34]),g[50]=J(x[37]),g[51]=J(x[47]),g[52]=J(x[50]),g[53]=J(x[56]),g[54]=J(x[59]),g[55]=J(x[61]),g[56]=J(x[35]),g[57]=J(x[36]),g[58]=J(x[48]),g[59]=J(x[49]),g[60]=J(x[57]),g[61]=J(x[58]),g[62]=J(x[62]),g[63]=J(x[63])}function Oe(x){const g=.5*Math.cos(.7853975),b=.5*Math.cos(3.14159/16),R=.5*Math.cos(3.14159/8),N=.5*Math.cos(3*3.14159/16),F=.5*Math.cos(5*3.14159/16),U=.5*Math.cos(3*3.14159/8),j=.5*Math.cos(7*3.14159/16),$=new Array(4),V=new Array(4),K=new Array(4),se=new Array(4);for(let Q=0;Q<8;++Q){const ce=Q*8;$[0]=R*x[ce+2],$[1]=U*x[ce+2],$[2]=R*x[ce+6],$[3]=U*x[ce+6],V[0]=b*x[ce+1]+N*x[ce+3]+F*x[ce+5]+j*x[ce+7],V[1]=N*x[ce+1]-j*x[ce+3]-b*x[ce+5]-F*x[ce+7],V[2]=F*x[ce+1]-b*x[ce+3]+j*x[ce+5]+N*x[ce+7],V[3]=j*x[ce+1]-F*x[ce+3]+N*x[ce+5]-b*x[ce+7],K[0]=g*(x[ce+0]+x[ce+4]),K[3]=g*(x[ce+0]-x[ce+4]),K[1]=$[0]+$[3],K[2]=$[1]-$[2],se[0]=K[0]+K[1],se[1]=K[3]+K[2],se[2]=K[3]-K[2],se[3]=K[0]-K[1],x[ce+0]=se[0]+V[0],x[ce+1]=se[1]+V[1],x[ce+2]=se[2]+V[2],x[ce+3]=se[3]+V[3],x[ce+4]=se[3]-V[3],x[ce+5]=se[2]-V[2],x[ce+6]=se[1]-V[1],x[ce+7]=se[0]-V[0]}for(let Q=0;Q<8;++Q)$[0]=R*x[16+Q],$[1]=U*x[16+Q],$[2]=R*x[48+Q],$[3]=U*x[48+Q],V[0]=b*x[8+Q]+N*x[24+Q]+F*x[40+Q]+j*x[56+Q],V[1]=N*x[8+Q]-j*x[24+Q]-b*x[40+Q]-F*x[56+Q],V[2]=F*x[8+Q]-b*x[24+Q]+j*x[40+Q]+N*x[56+Q],V[3]=j*x[8+Q]-F*x[24+Q]+N*x[40+Q]-b*x[56+Q],K[0]=g*(x[Q]+x[32+Q]),K[3]=g*(x[Q]-x[32+Q]),K[1]=$[0]+$[3],K[2]=$[1]-$[2],se[0]=K[0]+K[1],se[1]=K[3]+K[2],se[2]=K[3]-K[2],se[3]=K[0]-K[1],x[0+Q]=se[0]+V[0],x[8+Q]=se[1]+V[1],x[16+Q]=se[2]+V[2],x[24+Q]=se[3]+V[3],x[32+Q]=se[3]-V[3],x[40+Q]=se[2]-V[2],x[48+Q]=se[1]-V[1],x[56+Q]=se[0]-V[0]}function Nt(x){for(let g=0;g<64;++g){const b=x[0][g],R=x[1][g],N=x[2][g];x[0][g]=b+1.5747*N,x[1][g]=b-.1873*R-.4682*N,x[2][g]=b+1.8556*R}}function Mt(x,g,b){for(let R=0;R<64;++R)g[b+R]=Oa.toHalfFloat(O(x[R]))}function O(x){return x<=1?Math.sign(x)*Math.pow(Math.abs(x),2.2):Math.sign(x)*Math.pow(M,Math.abs(x)-1)}function T(x){return new DataView(x.array.buffer,x.offset.value,x.size)}function Y(x){const g=x.viewer.buffer.slice(x.offset.value,x.offset.value+x.size),b=new Uint8Array(Me(g)),R=new Uint8Array(b.length);return B(b),Ie(b,R),new DataView(R.buffer)}function te(x){const g=x.array.slice(x.offset.value,x.offset.value+x.size),b=tc(g),R=new Uint8Array(b.length);return B(b),Ie(b,R),new DataView(R.buffer)}function de(x){const g=x.viewer,b={value:x.offset.value},R=new Uint16Array(x.columns*x.lines*(x.inputChannels.length*x.type)),N=new Uint8Array(8192);let F=0;const U=new Array(x.inputChannels.length);for(let we=0,pe=x.inputChannels.length;we<pe;we++)U[we]={},U[we].start=F,U[we].end=U[we].start,U[we].nx=x.columns,U[we].ny=x.lines,U[we].size=x.type,F+=U[we].nx*U[we].ny*U[we].size;const j=Ue(g,b),$=Ue(g,b);if($>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(j<=$)for(let we=0;we<$-j+1;we++)N[we+j]=Ee(g,b);const V=new Uint16Array(65536),K=E(N,V),se=He(g,b);gt(x.array,g,b,se,R,F);for(let we=0;we<x.inputChannels.length;++we){const pe=U[we];for(let ge=0;ge<U[we].size;++ge)De(R,pe.start+ge,pe.nx,pe.size,pe.ny,pe.nx*pe.size,K)}st(V,R,F);let Q=0;const ce=new Uint8Array(R.buffer.byteLength);for(let we=0;we<x.lines;we++)for(let pe=0;pe<x.inputChannels.length;pe++){const ge=U[pe],Ce=ge.nx*ge.size,Se=new Uint8Array(R.buffer,ge.end*2,Ce*2);ce.set(Se,Q),Q+=Ce*2,ge.end+=Ce}return new DataView(ce.buffer)}function ne(x){const g=x.array.slice(x.offset.value,x.offset.value+x.size),b=tc(g),R=x.inputChannels.length*x.lines*x.columns*x.totalBytes,N=new ArrayBuffer(R),F=new DataView(N);let U=0,j=0;const $=new Array(4);for(let V=0;V<x.lines;V++)for(let K=0;K<x.inputChannels.length;K++){let se=0;switch(x.inputChannels[K].pixelType){case 1:$[0]=U,$[1]=$[0]+x.columns,U=$[1]+x.columns;for(let ce=0;ce<x.columns;++ce){const we=b[$[0]++]<<8|b[$[1]++];se+=we,F.setUint16(j,se,!0),j+=2}break;case 2:$[0]=U,$[1]=$[0]+x.columns,$[2]=$[1]+x.columns,U=$[2]+x.columns;for(let ce=0;ce<x.columns;++ce){const we=b[$[0]++]<<24|b[$[1]++]<<16|b[$[2]++]<<8;se+=we,F.setUint32(j,se,!0),j+=4}break}}return F}function ze(x){const g=x.viewer,b={value:x.offset.value},R=new Uint8Array(x.columns*x.lines*(x.inputChannels.length*x.type*2)),N={version:Xe(g,b),unknownUncompressedSize:Xe(g,b),unknownCompressedSize:Xe(g,b),acCompressedSize:Xe(g,b),dcCompressedSize:Xe(g,b),rleCompressedSize:Xe(g,b),rleUncompressedSize:Xe(g,b),rleRawSize:Xe(g,b),totalAcUncompressedCount:Xe(g,b),totalDcUncompressedCount:Xe(g,b),acCompression:Xe(g,b)};if(N.version<2)throw new Error("EXRLoader.parse: "+Rs.compression+" version "+N.version+" is unsupported");const F=new Array;let U=Ue(g,b)-2;for(;U>0;){const pe=_e(g.buffer,b),ge=Ee(g,b),Ce=ge>>2&3,Se=(ge>>4)-1,qe=new Int8Array([Se])[0],Ze=Ee(g,b);F.push({name:pe,index:qe,type:Ze,compression:Ce}),U-=pe.length+3}const j=Rs.channels,$=new Array(x.inputChannels.length);for(let pe=0;pe<x.inputChannels.length;++pe){const ge=$[pe]={},Ce=j[pe];ge.name=Ce.name,ge.compression=0,ge.decoded=!1,ge.type=Ce.pixelType,ge.pLinear=Ce.pLinear,ge.width=x.columns,ge.height=x.lines}const V={idx:new Array(3)};for(let pe=0;pe<x.inputChannels.length;++pe){const ge=$[pe];for(let Ce=0;Ce<F.length;++Ce){const Se=F[Ce];ge.name==Se.name&&(ge.compression=Se.compression,Se.index>=0&&(V.idx[Se.index]=pe),ge.offset=pe)}}let K,se,Q;if(N.acCompressedSize>0)switch(N.acCompression){case 0:K=new Uint16Array(N.totalAcUncompressedCount),gt(x.array,g,b,N.acCompressedSize,K,N.totalAcUncompressedCount);break;case 1:const pe=x.array.slice(b.value,b.value+N.totalAcUncompressedCount),ge=tc(pe);K=new Uint16Array(ge.buffer),b.value+=N.totalAcUncompressedCount;break}if(N.dcCompressedSize>0){const pe={array:x.array,offset:b,size:N.dcCompressedSize};se=new Uint16Array(te(pe).buffer),b.value+=N.dcCompressedSize}if(N.rleRawSize>0){const pe=x.array.slice(b.value,b.value+N.rleCompressedSize),ge=tc(pe);Q=Me(ge.buffer),b.value+=N.rleCompressedSize}let ce=0;const we=new Array($.length);for(let pe=0;pe<we.length;++pe)we[pe]=new Array;for(let pe=0;pe<x.lines;++pe)for(let ge=0;ge<$.length;++ge)we[ge].push(ce),ce+=$[ge].width*x.type*2;V.idx[0]!==void 0&&$[V.idx[0]]&&$e(V,we,$,K,se,R);for(let pe=0;pe<$.length;++pe){const ge=$[pe];if(!ge.decoded)switch(ge.compression){case 2:let Ce=0,Se=0;for(let qe=0;qe<x.lines;++qe){let Ze=we[pe][Ce];for(let at=0;at<ge.width;++at){for(let Ke=0;Ke<2*ge.type;++Ke)R[Ze++]=Q[Se+Ke*ge.width*ge.height];Se++}Ce++}break;case 1:Re(pe,we,$,K,se,R);break;default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(R.buffer)}function _e(x,g){const b=new Uint8Array(x);let R=0;for(;b[g.value+R]!=0;)R+=1;const N=new TextDecoder().decode(b.slice(g.value,g.value+R));return g.value=g.value+R+1,N}function Fe(x,g,b){const R=new TextDecoder().decode(new Uint8Array(x).slice(g.value,g.value+b));return g.value=g.value+b,R}function Ve(x,g){const b=be(x,g),R=He(x,g);return[b,R]}function ve(x,g){const b=He(x,g),R=He(x,g);return[b,R]}function be(x,g){const b=x.getInt32(g.value,!0);return g.value=g.value+4,b}function He(x,g){const b=x.getUint32(g.value,!0);return g.value=g.value+4,b}function Ge(x,g){const b=x[g.value];return g.value=g.value+1,b}function Ee(x,g){const b=x.getUint8(g.value);return g.value=g.value+1,b}const Xe=function(x,g){let b;return"getBigInt64"in DataView.prototype?b=Number(x.getBigInt64(g.value,!0)):b=x.getUint32(g.value+4,!0)+Number(x.getUint32(g.value,!0)<<32),g.value+=8,b};function k(x,g){const b=x.getFloat32(g.value,!0);return g.value+=4,b}function xe(x,g){return Oa.toHalfFloat(k(x,g))}function J(x){const g=(x&31744)>>10,b=x&1023;return(x>>15?-1:1)*(g?g===31?b?NaN:1/0:Math.pow(2,g-15)*(1+b/1024):6103515625e-14*(b/1024))}function Ue(x,g){const b=x.getUint16(g.value,!0);return g.value+=2,b}function me(x,g){return J(Ue(x,g))}function le(x,g,b,R){const N=b.value,F=[];for(;b.value<N+R-1;){const U=_e(g,b),j=be(x,b),$=Ee(x,b);b.value+=3;const V=be(x,b),K=be(x,b);F.push({name:U,pixelType:j,pLinear:$,xSampling:V,ySampling:K})}return b.value+=1,F}function Be(x,g){const b=k(x,g),R=k(x,g),N=k(x,g),F=k(x,g),U=k(x,g),j=k(x,g),$=k(x,g),V=k(x,g);return{redX:b,redY:R,greenX:N,greenY:F,blueX:U,blueY:j,whiteX:$,whiteY:V}}function it(x,g){const b=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],R=Ee(x,g);return b[R]}function At(x,g){const b=be(x,g),R=be(x,g),N=be(x,g),F=be(x,g);return{xMin:b,yMin:R,xMax:N,yMax:F}}function _t(x,g){const b=["INCREASING_Y","DECREASING_Y","RANDOM_Y"],R=Ee(x,g);return b[R]}function Ei(x,g){const b=["ENVMAP_LATLONG","ENVMAP_CUBE"],R=Ee(x,g);return b[R]}function ii(x,g){const b=["ONE_LEVEL","MIPMAP_LEVELS","RIPMAP_LEVELS"],R=["ROUND_DOWN","ROUND_UP"],N=He(x,g),F=He(x,g),U=Ee(x,g);return{xSize:N,ySize:F,levelMode:b[U&15],roundingMode:R[U>>4]}}function gl(x,g){const b=k(x,g),R=k(x,g);return[b,R]}function As(x,g){const b=k(x,g),R=k(x,g),N=k(x,g);return[b,R,N]}function fo(x,g,b,R,N){if(R==="string"||R==="stringvector"||R==="iccProfile")return Fe(g,b,N);if(R==="chlist")return le(x,g,b,N);if(R==="chromaticities")return Be(x,b);if(R==="compression")return it(x,b);if(R==="box2i")return At(x,b);if(R==="envmap")return Ei(x,b);if(R==="tiledesc")return ii(x,b);if(R==="lineOrder")return _t(x,b);if(R==="float")return k(x,b);if(R==="v2f")return gl(x,b);if(R==="v3f")return As(x,b);if(R==="int")return be(x,b);if(R==="rational")return Ve(x,b);if(R==="timecode")return ve(x,b);if(R==="preview")return b.value+=N,"skipped";b.value+=N}function _l(x,g){const b=Math.log2(x);return g=="ROUND_DOWN"?Math.floor(b):Math.ceil(b)}function vl(x,g,b){let R=0;switch(x.levelMode){case"ONE_LEVEL":R=1;break;case"MIPMAP_LEVELS":R=_l(Math.max(g,b),x.roundingMode)+1;break;case"RIPMAP_LEVELS":throw new Error("THREE.EXRLoader: RIPMAP_LEVELS tiles currently unsupported.")}return R}function Tr(x,g,b,R){const N=new Array(x);for(let F=0;F<x;F++){const U=1<<F;let j=g/U|0;R=="ROUND_UP"&&j*U<g&&(j+=1);const $=Math.max(j,1);N[F]=($+b-1)/b|0}return N}function xl(){const x=this,g=x.offset,b={value:0};for(let R=0;R<x.tileCount;R++){const N=be(x.viewer,g),F=be(x.viewer,g);g.value+=8,x.size=He(x.viewer,g);const U=N*x.blockWidth,j=F*x.blockHeight;x.columns=U+x.blockWidth>x.width?x.width-U:x.blockWidth,x.lines=j+x.blockHeight>x.height?x.height-j:x.blockHeight;const $=x.columns*x.totalBytes,K=x.size<x.lines*$?x.uncompress(x):T(x);g.value+=x.size;for(let se=0;se<x.lines;se++){const Q=se*x.columns*x.totalBytes;for(let ce=0;ce<x.inputChannels.length;ce++){const we=Rs.channels[ce].name,pe=x.channelByteOffsets[we]*x.columns,ge=x.decodeChannels[we];if(ge===void 0)continue;b.value=Q+pe;const Ce=(x.height-(1+j+se))*x.outLineWidth;for(let Se=0;Se<x.columns;Se++){const qe=Ce+(Se+U)*x.outputChannels+ge;x.byteArray[qe]=x.getter(K,b)}}}}}function ra(){const x=this,g=x.offset,b={value:0};for(let R=0;R<x.height/x.blockHeight;R++){const N=be(x.viewer,g)-Rs.dataWindow.yMin;x.size=He(x.viewer,g),x.lines=N+x.blockHeight>x.height?x.height-N:x.blockHeight;const F=x.columns*x.totalBytes,j=x.size<x.lines*F?x.uncompress(x):T(x);g.value+=x.size;for(let $=0;$<x.blockHeight;$++){const V=R*x.blockHeight,K=$+x.scanOrder(V);if(K>=x.height)continue;const se=$*F,Q=(x.height-1-K)*x.outLineWidth;for(let ce=0;ce<x.inputChannels.length;ce++){const we=Rs.channels[ce].name,pe=x.channelByteOffsets[we]*x.columns,ge=x.decodeChannels[we];if(ge!==void 0){b.value=se+pe;for(let Ce=0;Ce<x.columns;Ce++){const Se=Q+Ce*x.outputChannels+ge;x.byteArray[Se]=x.getter(j,b)}}}}}}function yl(x,g,b){const R={};if(x.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");R.version=x.getUint8(4);const N=x.getUint8(5);R.spec={singleTile:!!(N&2),longName:!!(N&4),deepFormat:!!(N&8),multiPart:!!(N&16)},b.value=8;let F=!0;for(;F;){const U=_e(g,b);if(U==="")F=!1;else{const j=_e(g,b),$=He(x,b),V=fo(x,g,b,j,$);V===void 0?console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${j}'.`):R[U]=V}}if((N&-7)!=0)throw console.error("THREE.EXRHeader:",R),new Error("THREE.EXRLoader: Provided file is currently unsupported.");return R}function wl(x,g,b,R,N,F){const U={size:0,viewer:g,array:b,offset:R,width:x.dataWindow.xMax-x.dataWindow.xMin+1,height:x.dataWindow.yMax-x.dataWindow.yMin+1,inputChannels:x.channels,channelByteOffsets:{},shouldExpand:!1,scanOrder:null,totalBytes:null,columns:null,lines:null,type:null,uncompress:null,getter:null,format:null,colorSpace:Ut};switch(x.compression){case"NO_COMPRESSION":U.blockHeight=1,U.uncompress=T;break;case"RLE_COMPRESSION":U.blockHeight=1,U.uncompress=Y;break;case"ZIPS_COMPRESSION":U.blockHeight=1,U.uncompress=te;break;case"ZIP_COMPRESSION":U.blockHeight=16,U.uncompress=te;break;case"PIZ_COMPRESSION":U.blockHeight=32,U.uncompress=de;break;case"PXR24_COMPRESSION":U.blockHeight=16,U.uncompress=ne;break;case"DWAA_COMPRESSION":U.blockHeight=32,U.uncompress=ze;break;case"DWAB_COMPRESSION":U.blockHeight=256,U.uncompress=ze;break;default:throw new Error("EXRLoader.parse: "+x.compression+" is unsupported")}const j={};for(const Q of x.channels)switch(Q.name){case"Y":case"R":case"G":case"B":case"A":j[Q.name]=!0,U.type=Q.pixelType}let $=!1,V=!1;if(j.R&&j.G&&j.B)U.outputChannels=4;else if(j.Y)U.outputChannels=1;else throw new Error("EXRLoader.parse: file contains unsupported data channels.");switch(U.outputChannels){case 4:F==rn?($=!j.A,U.format=rn,U.colorSpace=Ut,U.outputChannels=4,U.decodeChannels={R:0,G:1,B:2,A:3}):F==Vr?(U.format=Vr,U.colorSpace=Ut,U.outputChannels=2,U.decodeChannels={R:0,G:1}):F==jr?(U.format=jr,U.colorSpace=Ut,U.outputChannels=1,U.decodeChannels={R:0}):V=!0;break;case 1:F==rn?($=!0,U.format=rn,U.colorSpace=Ut,U.outputChannels=4,U.shouldExpand=!0,U.decodeChannels={Y:0}):F==Vr?(U.format=Vr,U.colorSpace=Ut,U.outputChannels=2,U.shouldExpand=!0,U.decodeChannels={Y:0}):F==jr?(U.format=jr,U.colorSpace=Ut,U.outputChannels=1,U.decodeChannels={Y:0}):V=!0;break;default:V=!0}if(V)throw new Error("EXRLoader.parse: invalid output format for specified file.");if(U.type==1)switch(N){case Vt:U.getter=me;break;case Gt:U.getter=Ue;break}else if(U.type==2)switch(N){case Vt:U.getter=k;break;case Gt:U.getter=xe}else throw new Error("EXRLoader.parse: unsupported pixelType "+U.type+" for "+x.compression+".");U.columns=U.width;const K=U.width*U.height*U.outputChannels;switch(N){case Vt:U.byteArray=new Float32Array(K),$&&U.byteArray.fill(1,0,K);break;case Gt:U.byteArray=new Uint16Array(K),$&&U.byteArray.fill(15360,0,K);break;default:console.error("THREE.EXRLoader: unsupported type: ",N);break}let se=0;for(const Q of x.channels)U.decodeChannels[Q.name]!==void 0&&(U.channelByteOffsets[Q.name]=se),se+=Q.pixelType*2;if(U.totalBytes=se,U.outLineWidth=U.width*U.outputChannels,x.lineOrder==="INCREASING_Y"?U.scanOrder=Q=>Q:U.scanOrder=Q=>U.height-1-Q,x.spec.singleTile){U.blockHeight=x.tiles.ySize,U.blockWidth=x.tiles.xSize;const Q=vl(x.tiles,U.width,U.height),ce=Tr(Q,U.width,x.tiles.xSize,x.tiles.roundingMode),we=Tr(Q,U.height,x.tiles.ySize,x.tiles.roundingMode);U.tileCount=ce[0]*we[0];for(let pe=0;pe<Q;pe++)for(let ge=0;ge<we[pe];ge++)for(let Ce=0;Ce<ce[pe];Ce++)Xe(g,R);U.decode=xl.bind(U)}else{U.blockWidth=U.width;const Q=Math.ceil(U.height/U.blockHeight);for(let ce=0;ce<Q;ce++)Xe(g,R);U.decode=ra.bind(U)}return U}const Sl={value:0},Ml=new DataView(e),sh=new Uint8Array(e),Rs=yl(Ml,e,Sl),es=wl(Rs,Ml,sh,Sl,this.type,this.outputFormat);if(es.decode(),es.shouldExpand){const x=es.byteArray;if(this.outputFormat==rn)for(let g=0;g<x.length;g+=4)x[g+2]=x[g+1]=x[g];else if(this.outputFormat==Vr)for(let g=0;g<x.length;g+=2)x[g+1]=x[g]}return{header:Rs,width:es.width,height:es.height,data:es.byteArray,format:es.format,colorSpace:es.colorSpace,type:this.type}}setDataType(e){return this.type=e,this}setOutputFormat(e){return this.outputFormat=e,this}load(e,t,i,s){function r(a,o){a.colorSpace=o.colorSpace,a.minFilter=nt,a.magFilter=nt,a.generateMipmaps=!1,a.flipY=!1,t&&t(a,o)}return super.load(e,r,i,s)}}class th extends he{constructor(e,t={}){const s=[e.isCubeTexture?"#define ENVMAP_TYPE_CUBE":""],r=`
			varying vec3 vWorldPosition;

			void main() {

				vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
				vWorldPosition = worldPosition.xyz;

				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			}
			`,a=s.join(`
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
					#include <colorspace_fragment>

				}
				`,o={map:{value:e},height:{value:t.height||15},radius:{value:t.radius||100}},l=new Jd(1,16),c=new ln({uniforms:o,fragmentShader:a,vertexShader:r,side:xn});super(l,c)}set radius(e){this.material.uniforms.radius.value=e}get radius(){return this.material.uniforms.radius.value}set height(e){this.material.uniforms.height.value=e}get height(){return this.material.uniforms.height.value}}const jh=new WeakMap;class Wn extends nr{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,i,s){const r=new Qr(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,a=>{this.parse(a,t,s)},i,s)}parse(e,t,i=()=>{}){this.decodeDracoFile(e,t,null,null,je,i).catch(i)}decodeDracoFile(e,t,i,s,r=Ut,a=()=>{}){const o={attributeIDs:i||this.defaultAttributeIDs,attributeTypes:s||this.defaultAttributeTypes,useUniqueIDs:!!i,vertexColorSpace:r};return this.decodeGeometry(e,o).then(t).catch(a)}decodeGeometry(e,t){const i=JSON.stringify(t);if(jh.has(e)){const l=jh.get(e);if(l.key===i)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let s;const r=this.workerNextTaskID++,a=e.byteLength,o=this._getWorker(r,a).then(l=>(s=l,new Promise((c,h)=>{s._callbacks[r]={resolve:c,reject:h},s.postMessage({type:"decode",id:r,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{s&&r&&this._releaseTask(s,r)}),jh.set(e,{key:i,promise:o}),o}_createGeometry(e){const t=new Tt;e.index&&t.setIndex(new Xt(e.index.array,1));for(let i=0;i<e.attributes.length;i++){const s=e.attributes[i],r=s.name,a=s.array,o=s.itemSize,l=new Xt(a,o);r==="color"&&(this._assignVertexColorSpace(l,s.vertexColorSpace),l.normalized=!(a instanceof Float32Array)),t.setAttribute(r,l)}return t}_assignVertexColorSpace(e,t){if(t!==je)return;const i=new ye;for(let s=0,r=e.count;s<r;s++)i.fromBufferAttribute(e,s),mt.colorSpaceToWorking(i,je),e.setXYZ(s,i.r,i.g,i.b)}_loadLibrary(e,t){const i=new Qr(this.manager);return i.setPath(this.decoderPath),i.setResponseType(t),i.setWithCredentials(this.withCredentials),new Promise((s,r)=>{i.load(e,s,void 0,r)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(i=>{const s=i[0];e||(this.decoderConfig.wasmBinary=i[1]);const r=oE.toString(),a=["/* draco decoder */",s,"","/* worker */",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([a]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const s=new Worker(this.workerSourceURL);s._callbacks={},s._taskCosts={},s._taskLoad=0,s.postMessage({type:"init",decoderConfig:this.decoderConfig}),s.onmessage=function(r){const a=r.data;switch(a.type){case"decode":s._callbacks[a.id].resolve(a);break;case"error":s._callbacks[a.id].reject(a);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+a.type+'"')}},this.workerPool.push(s)}else this.workerPool.sort(function(s,r){return s._taskLoad>r._taskLoad?-1:1});const i=this.workerPool[this.workerPool.length-1];return i._taskCosts[e]=t,i._taskLoad+=t,i})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function oE(){let n,e;onmessage=function(a){const o=a.data;switch(o.type){case"init":n=o.decoderConfig,e=new Promise(function(h){n.onModuleLoaded=function(u){h({draco:u})},DracoDecoderModule(n)});break;case"decode":const l=o.buffer,c=o.taskConfig;e.then(h=>{const u=h.draco,d=new u.Decoder;try{const f=t(u,d,new Int8Array(l),c),_=f.attributes.map(v=>v.array.buffer);f.index&&_.push(f.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:f},_)}catch(f){console.error(f),self.postMessage({type:"error",id:o.id,error:f.message})}finally{u.destroy(d)}});break}};function t(a,o,l,c){const h=c.attributeIDs,u=c.attributeTypes;let d,f;const _=o.GetEncodedGeometryType(l);if(_===a.TRIANGULAR_MESH)d=new a.Mesh,f=o.DecodeArrayToMesh(l,l.byteLength,d);else if(_===a.POINT_CLOUD)d=new a.PointCloud,f=o.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());const v={index:null,attributes:[]};for(const m in h){const p=self[u[m]];let y,w;if(c.useUniqueIDs)w=h[m],y=o.GetAttributeByUniqueId(d,w);else{if(w=o.GetAttributeId(d,a[h[m]]),w===-1)continue;y=o.GetAttribute(d,w)}const S=s(a,o,d,m,p,y);m==="color"&&(S.vertexColorSpace=c.vertexColorSpace),v.attributes.push(S)}return _===a.TRIANGULAR_MESH&&(v.index=i(a,o,d)),a.destroy(d),v}function i(a,o,l){const h=l.num_faces()*3,u=h*4,d=a._malloc(u);o.GetTrianglesUInt32Array(l,u,d);const f=new Uint32Array(a.HEAPF32.buffer,d,h).slice();return a._free(d),{array:f,itemSize:1}}function s(a,o,l,c,h,u){const d=u.num_components(),_=l.num_points()*d,v=_*h.BYTES_PER_ELEMENT,m=r(a,h),p=a._malloc(v);o.GetAttributeDataArrayForAllPoints(l,u,m,v,p);const y=new h(a.HEAPF32.buffer,p,_).slice();return a._free(p),{name:c,array:y,itemSize:d}}function r(a,o){switch(o){case Float32Array:return a.DT_FLOAT32;case Int8Array:return a.DT_INT8;case Int16Array:return a.DT_INT16;case Int32Array:return a.DT_INT32;case Uint8Array:return a.DT_UINT8;case Uint16Array:return a.DT_UINT16;case Uint32Array:return a.DT_UINT32}}}const Xp={type:"change"},of={type:"start"},Xg={type:"end"},nc=new ro,$p=new Hi,lE=Math.cos(70*xt.DEG2RAD),en=new D,Bn=2*Math.PI,Ct={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Yh=1e-6;class Xn extends Pg{constructor(e,t=null){super(e,t),this.state=Ct.NONE,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ha.ROTATE,MIDDLE:Ha.DOLLY,RIGHT:Ha.PAN},this.touches={ONE:Fa.ROTATE,TWO:Fa.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new Ht,this._lastTargetPosition=new D,this._quat=new Ht().setFromUnitVectors(e.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new pp,this._sphericalDelta=new pp,this._scale=1,this._panOffset=new D,this._rotateStart=new ue,this._rotateEnd=new ue,this._rotateDelta=new ue,this._panStart=new ue,this._panEnd=new ue,this._panDelta=new ue,this._dollyStart=new ue,this._dollyEnd=new ue,this._dollyDelta=new ue,this._dollyDirection=new D,this._mouse=new ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=hE.bind(this),this._onPointerDown=cE.bind(this),this._onPointerUp=uE.bind(this),this._onContextMenu=vE.bind(this),this._onMouseWheel=pE.bind(this),this._onKeyDown=mE.bind(this),this._onTouchStart=gE.bind(this),this._onTouchMove=_E.bind(this),this._onMouseDown=dE.bind(this),this._onMouseMove=fE.bind(this),this._interceptControlDown=xE.bind(this),this._interceptControlUp=yE.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Xp),this.update(),this.state=Ct.NONE}update(e=null){const t=this.object.position;en.copy(t).sub(this.target),en.applyQuaternion(this._quat),this._spherical.setFromVector3(en),this.autoRotate&&this.state===Ct.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Bn:i>Math.PI&&(i-=Bn),s<-Math.PI?s+=Bn:s>Math.PI&&(s-=Bn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(en.setFromSpherical(this._spherical),en.applyQuaternion(this._quatInverse),t.copy(this.target).add(en),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=en.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new D(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new D(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=en.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(nc.origin.copy(this.object.position),nc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(nc.direction))<lE?this.object.lookAt(this.target):($p.setFromNormalAndCoplanarPoint(this.object.up,this.target),nc.intersectPlane($p,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Yh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Yh||this._lastTargetPosition.distanceToSquared(this.target)>Yh?(this.dispatchEvent(Xp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Bn/60*this.autoRotateSpeed*e:Bn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){en.setFromMatrixColumn(t,0),en.multiplyScalar(-e),this._panOffset.add(en)}_panUp(e,t){this.screenSpacePanning===!0?en.setFromMatrixColumn(t,1):(en.setFromMatrixColumn(t,0),en.crossVectors(this.object.up,en)),en.multiplyScalar(e),this._panOffset.add(en)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;en.copy(s).sub(this.target);let r=en.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ue,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function cE(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function hE(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function uE(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Xg),this.state=Ct.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function dE(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ha.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Ct.DOLLY;break;case Ha.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Ct.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Ct.ROTATE}break;case Ha.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Ct.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Ct.PAN}break;default:this.state=Ct.NONE}this.state!==Ct.NONE&&this.dispatchEvent(of)}function fE(n){switch(this.state){case Ct.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Ct.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Ct.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function pE(n){this.enabled===!1||this.enableZoom===!1||this.state!==Ct.NONE||(n.preventDefault(),this.dispatchEvent(of),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Xg))}function mE(n){this.enabled!==!1&&this._handleKeyDown(n)}function gE(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Fa.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Ct.TOUCH_ROTATE;break;case Fa.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Ct.TOUCH_PAN;break;default:this.state=Ct.NONE}break;case 2:switch(this.touches.TWO){case Fa.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Ct.TOUCH_DOLLY_PAN;break;case Fa.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Ct.TOUCH_DOLLY_ROTATE;break;default:this.state=Ct.NONE}break;default:this.state=Ct.NONE}this.state!==Ct.NONE&&this.dispatchEvent(of)}function _E(n){switch(this._trackPointer(n),this.state){case Ct.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Ct.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Ct.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Ct.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Ct.NONE}}function vE(n){this.enabled!==!1&&n.preventDefault()}function xE(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yE(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Ur=new Fn,bn=new D,ur=new D,zt=new Ht,jp={X:new D(1,0,0),Y:new D(0,1,0),Z:new D(0,0,1)},Zh={type:"change"},Yp={type:"mouseDown",mode:null},Zp={type:"mouseUp",mode:null},qp={type:"objectChange"};class ti extends Pg{constructor(e,t=null){super(void 0,t);const i=new TE(this);this._root=i;const s=new AE;this._gizmo=s,i.add(s);const r=new RE;this._plane=r,i.add(r);const a=this;function o(w,S){let A=S;Object.defineProperty(a,w,{get:function(){return A!==void 0?A:S},set:function(I){A!==I&&(A=I,r[w]=I,s[w]=I,a.dispatchEvent({type:w+"-changed",value:I}),a.dispatchEvent(Zh))}}),a[w]=S,r[w]=S,s[w]=S}o("camera",e),o("object",void 0),o("enabled",!0),o("axis",null),o("mode","translate"),o("translationSnap",null),o("rotationSnap",null),o("scaleSnap",null),o("space","world"),o("size",1),o("dragging",!1),o("showX",!0),o("showY",!0),o("showZ",!0),o("minX",-1/0),o("maxX",1/0),o("minY",-1/0),o("maxY",1/0),o("minZ",-1/0),o("maxZ",1/0);const l=new D,c=new D,h=new Ht,u=new Ht,d=new D,f=new Ht,_=new D,v=new D,m=new D,p=0,y=new D;o("worldPosition",l),o("worldPositionStart",c),o("worldQuaternion",h),o("worldQuaternionStart",u),o("cameraPosition",d),o("cameraQuaternion",f),o("pointStart",_),o("pointEnd",v),o("rotationAxis",m),o("rotationAngle",p),o("eye",y),this._offset=new D,this._startNorm=new D,this._endNorm=new D,this._cameraScale=new D,this._parentPosition=new D,this._parentQuaternion=new Ht,this._parentQuaternionInv=new Ht,this._parentScale=new D,this._worldScaleStart=new D,this._worldQuaternionInv=new Ht,this._worldScale=new D,this._positionStart=new D,this._quaternionStart=new Ht,this._scaleStart=new D,this._getPointer=wE.bind(this),this._onPointerDown=ME.bind(this),this._onPointerHover=SE.bind(this),this._onPointerMove=bE.bind(this),this._onPointerUp=EE.bind(this),t!==null&&this.connect(t)}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="auto"}getHelper(){return this._root}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;e!==null&&Ur.setFromCamera(e,this.camera);const t=qh(this._gizmo.picker[this.mode],Ur);t?this.axis=t.object.name:this.axis=null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e!=null&&e.button!==0)&&this.axis!==null){e!==null&&Ur.setFromCamera(e,this.camera);const t=qh(this._plane,Ur,!0);t&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(t.point).sub(this.worldPositionStart)),this.dragging=!0,Yp.mode=this.mode,this.dispatchEvent(Yp)}}pointerMove(e){const t=this.axis,i=this.mode,s=this.object;let r=this.space;if(i==="scale"?r="local":(t==="E"||t==="XYZE"||t==="XYZ")&&(r="world"),s===void 0||t===null||this.dragging===!1||e!==null&&e.button!==-1)return;e!==null&&Ur.setFromCamera(e,this.camera);const a=qh(this._plane,Ur,!0);if(a){if(this.pointEnd.copy(a.point).sub(this.worldPositionStart),i==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),r==="local"&&t!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),t.indexOf("X")===-1&&(this._offset.x=0),t.indexOf("Y")===-1&&(this._offset.y=0),t.indexOf("Z")===-1&&(this._offset.z=0),r==="local"&&t!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),s.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(r==="local"&&(s.position.applyQuaternion(zt.copy(this._quaternionStart).invert()),t.search("X")!==-1&&(s.position.x=Math.round(s.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(s.position.y=Math.round(s.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(s.position.z=Math.round(s.position.z/this.translationSnap)*this.translationSnap),s.position.applyQuaternion(this._quaternionStart)),r==="world"&&(s.parent&&s.position.add(bn.setFromMatrixPosition(s.parent.matrixWorld)),t.search("X")!==-1&&(s.position.x=Math.round(s.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(s.position.y=Math.round(s.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(s.position.z=Math.round(s.position.z/this.translationSnap)*this.translationSnap),s.parent&&s.position.sub(bn.setFromMatrixPosition(s.parent.matrixWorld)))),s.position.x=Math.max(this.minX,Math.min(this.maxX,s.position.x)),s.position.y=Math.max(this.minY,Math.min(this.maxY,s.position.y)),s.position.z=Math.max(this.minZ,Math.min(this.maxZ,s.position.z));else if(i==="scale"){if(t.search("XYZ")!==-1){let o=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(o*=-1),ur.set(o,o,o)}else bn.copy(this.pointStart),ur.copy(this.pointEnd),bn.applyQuaternion(this._worldQuaternionInv),ur.applyQuaternion(this._worldQuaternionInv),ur.divide(bn),t.search("X")===-1&&(ur.x=1),t.search("Y")===-1&&(ur.y=1),t.search("Z")===-1&&(ur.z=1);s.scale.copy(this._scaleStart).multiply(ur),this.scaleSnap&&(t.search("X")!==-1&&(s.scale.x=Math.round(s.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Y")!==-1&&(s.scale.y=Math.round(s.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Z")!==-1&&(s.scale.z=Math.round(s.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(i==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const o=20/this.worldPosition.distanceTo(bn.setFromMatrixPosition(this.camera.matrixWorld));let l=!1;t==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(bn.copy(this.rotationAxis).cross(this.eye))*o):(t==="X"||t==="Y"||t==="Z")&&(this.rotationAxis.copy(jp[t]),bn.copy(jp[t]),r==="local"&&bn.applyQuaternion(this.worldQuaternion),bn.cross(this.eye),bn.length()===0?l=!0:this.rotationAngle=this._offset.dot(bn.normalize())*o),(t==="E"||l)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),r==="local"&&t!=="E"&&t!=="XYZE"?(s.quaternion.copy(this._quaternionStart),s.quaternion.multiply(zt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),s.quaternion.copy(zt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),s.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(Zh),this.dispatchEvent(qp)}}pointerUp(e){e!==null&&e.button!==0||(this.dragging&&this.axis!==null&&(Zp.mode=this.mode,this.dispatchEvent(Zp)),this.dragging=!1,this.axis=null)}dispose(){this.disconnect(),this._root.dispose()}attach(e){return this.object=e,this._root.visible=!0,this}detach(){return this.object=void 0,this.axis=null,this._root.visible=!1,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(Zh),this.dispatchEvent(qp),this.pointStart.copy(this.pointEnd))}getRaycaster(){return Ur}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}setColors(e,t,i,s){const r=this._gizmo.materialLib;r.xAxis.color.set(e),r.yAxis.color.set(t),r.zAxis.color.set(i),r.active.color.set(s),r.xAxisTransparent.color.set(e),r.yAxisTransparent.color.set(t),r.zAxisTransparent.color.set(i),r.activeTransparent.color.set(s),r.xAxis._color&&r.xAxis._color.set(e),r.yAxis._color&&r.yAxis._color.set(t),r.zAxis._color&&r.zAxis._color.set(i),r.active._color&&r.active._color.set(s),r.xAxisTransparent._color&&r.xAxisTransparent._color.set(e),r.yAxisTransparent._color&&r.yAxisTransparent._color.set(t),r.zAxisTransparent._color&&r.zAxisTransparent._color.set(i),r.activeTransparent._color&&r.activeTransparent._color.set(s)}}function wE(n){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:n.button};{const e=this.domElement.getBoundingClientRect();return{x:(n.clientX-e.left)/e.width*2-1,y:-(n.clientY-e.top)/e.height*2+1,button:n.button}}}function SE(n){if(this.enabled)switch(n.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(n));break}}function ME(n){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(n)),this.pointerDown(this._getPointer(n)))}function bE(n){this.enabled&&this.pointerMove(this._getPointer(n))}function EE(n){this.enabled&&(this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(n)))}function qh(n,e,t){const i=e.intersectObject(n,!0);for(let s=0;s<i.length;s++)if(i[s].object.visible||t)return i[s];return!1}const ic=new wi,Dt=new D(0,1,0),Kp=new D(0,0,0),Jp=new We,sc=new Ht,Tc=new Ht,ts=new D,Qp=new We,Uo=new D(1,0,0),kr=new D(0,1,0),No=new D(0,0,1),rc=new D,To=new D,Ao=new D;class TE extends Pt{constructor(e){super(),this.isTransformControlsRoot=!0,this.controls=e,this.visible=!1}updateMatrixWorld(e){const t=this.controls;t.object!==void 0&&(t.object.updateMatrixWorld(),t.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):t.object.parent.matrixWorld.decompose(t._parentPosition,t._parentQuaternion,t._parentScale),t.object.matrixWorld.decompose(t.worldPosition,t.worldQuaternion,t._worldScale),t._parentQuaternionInv.copy(t._parentQuaternion).invert(),t._worldQuaternionInv.copy(t.worldQuaternion).invert()),t.camera.updateMatrixWorld(),t.camera.matrixWorld.decompose(t.cameraPosition,t.cameraQuaternion,t._cameraScale),t.camera.isOrthographicCamera?t.camera.getWorldDirection(t.eye).negate():t.eye.copy(t.cameraPosition).sub(t.worldPosition).normalize(),super.updateMatrixWorld(e)}dispose(){this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}}class AE extends Pt{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const e=new yi({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),t=new br({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),i=e.clone();i.opacity=.15;const s=t.clone();s.opacity=.5;const r=e.clone();r.color.setHex(16711680);const a=e.clone();a.color.setHex(65280);const o=e.clone();o.color.setHex(255);const l=e.clone();l.color.setHex(16711680),l.opacity=.5;const c=e.clone();c.color.setHex(65280),c.opacity=.5;const h=e.clone();h.color.setHex(255),h.opacity=.5;const u=e.clone();u.opacity=.25;const d=e.clone();d.color.setHex(16776960),d.opacity=.25;const f=e.clone();f.color.setHex(16776960);const _=e.clone();_.color.setHex(7895160),this.materialLib={xAxis:r,yAxis:a,zAxis:o,active:f,xAxisTransparent:l,yAxisTransparent:c,zAxisTransparent:h,activeTransparent:d};const v=new fn(0,.04,.1,12);v.translate(0,.05,0);const m=new Lt(.08,.08,.08);m.translate(0,.04,0);const p=new Tt;p.setAttribute("position",new ht([0,0,0,1,0,0],3));const y=new fn(.0075,.0075,.5,3);y.translate(0,.25,0);function w(q,X){const ie=new Wr(q,.0075,3,64,X*Math.PI*2);return ie.rotateY(Math.PI/2),ie.rotateX(Math.PI/2),ie}function S(){const q=new Tt;return q.setAttribute("position",new ht([0,0,0,1,1,1],3)),q}const A={X:[[new he(v,r),[.5,0,0],[0,0,-Math.PI/2]],[new he(v,r),[-.5,0,0],[0,0,Math.PI/2]],[new he(y,r),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new he(v,a),[0,.5,0]],[new he(v,a),[0,-.5,0],[Math.PI,0,0]],[new he(y,a)]],Z:[[new he(v,o),[0,0,.5],[Math.PI/2,0,0]],[new he(v,o),[0,0,-.5],[-Math.PI/2,0,0]],[new he(y,o),null,[Math.PI/2,0,0]]],XYZ:[[new he(new Ba(.1,0),u),[0,0,0]]],XY:[[new he(new Lt(.15,.15,.01),h),[.15,.15,0]]],YZ:[[new he(new Lt(.15,.15,.01),l),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new he(new Lt(.15,.15,.01),c),[.15,0,.15],[-Math.PI/2,0,0]]]},I={X:[[new he(new fn(.2,0,.6,4),i),[.3,0,0],[0,0,-Math.PI/2]],[new he(new fn(.2,0,.6,4),i),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new he(new fn(.2,0,.6,4),i),[0,.3,0]],[new he(new fn(.2,0,.6,4),i),[0,-.3,0],[0,0,Math.PI]]],Z:[[new he(new fn(.2,0,.6,4),i),[0,0,.3],[Math.PI/2,0,0]],[new he(new fn(.2,0,.6,4),i),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new he(new Ba(.2,0),i)]],XY:[[new he(new Lt(.2,.2,.01),i),[.15,.15,0]]],YZ:[[new he(new Lt(.2,.2,.01),i),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new he(new Lt(.2,.2,.01),i),[.15,0,.15],[-Math.PI/2,0,0]]]},P={START:[[new he(new Ba(.01,2),s),null,null,null,"helper"]],END:[[new he(new Ba(.01,2),s),null,null,null,"helper"]],DELTA:[[new di(S(),s),null,null,null,"helper"]],X:[[new di(p,s),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new di(p,s),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new di(p,s),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},C={XYZE:[[new he(w(.5,1),_),null,[0,Math.PI/2,0]]],X:[[new he(w(.5,.5),r)]],Y:[[new he(w(.5,.5),a),null,[0,0,-Math.PI/2]]],Z:[[new he(w(.5,.5),o),null,[0,Math.PI/2,0]]],E:[[new he(w(.75,1),d),null,[0,Math.PI/2,0]]]},M={AXIS:[[new di(p,s),[-1e3,0,0],null,[1e6,1,1],"helper"]]},E={XYZE:[[new he(new Ki(.25,10,8),i)]],X:[[new he(new Wr(.5,.1,4,24),i),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new he(new Wr(.5,.1,4,24),i),[0,0,0],[Math.PI/2,0,0]]],Z:[[new he(new Wr(.5,.1,4,24),i),[0,0,0],[0,0,-Math.PI/2]]],E:[[new he(new Wr(.75,.1,2,24),i)]]},L={X:[[new he(m,r),[.5,0,0],[0,0,-Math.PI/2]],[new he(y,r),[0,0,0],[0,0,-Math.PI/2]],[new he(m,r),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new he(m,a),[0,.5,0]],[new he(y,a)],[new he(m,a),[0,-.5,0],[0,0,Math.PI]]],Z:[[new he(m,o),[0,0,.5],[Math.PI/2,0,0]],[new he(y,o),[0,0,0],[Math.PI/2,0,0]],[new he(m,o),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new he(new Lt(.15,.15,.01),h),[.15,.15,0]]],YZ:[[new he(new Lt(.15,.15,.01),l),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new he(new Lt(.15,.15,.01),c),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new he(new Lt(.1,.1,.1),u)]]},G={X:[[new he(new fn(.2,0,.6,4),i),[.3,0,0],[0,0,-Math.PI/2]],[new he(new fn(.2,0,.6,4),i),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new he(new fn(.2,0,.6,4),i),[0,.3,0]],[new he(new fn(.2,0,.6,4),i),[0,-.3,0],[0,0,Math.PI]]],Z:[[new he(new fn(.2,0,.6,4),i),[0,0,.3],[Math.PI/2,0,0]],[new he(new fn(.2,0,.6,4),i),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new he(new Lt(.2,.2,.01),i),[.15,.15,0]]],YZ:[[new he(new Lt(.2,.2,.01),i),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new he(new Lt(.2,.2,.01),i),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new he(new Lt(.2,.2,.2),i),[0,0,0]]]},H={X:[[new di(p,s),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new di(p,s),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new di(p,s),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function z(q){const X=new Pt;for(const ie in q)for(let Z=q[ie].length;Z--;){const re=q[ie][Z][0].clone(),oe=q[ie][Z][1],Te=q[ie][Z][2],fe=q[ie][Z][3],ke=q[ie][Z][4];re.name=ie,re.tag=ke,oe&&re.position.set(oe[0],oe[1],oe[2]),Te&&re.rotation.set(Te[0],Te[1],Te[2]),fe&&re.scale.set(fe[0],fe[1],fe[2]),re.updateMatrix();const Ye=re.geometry.clone();Ye.applyMatrix4(re.matrix),re.geometry=Ye,re.renderOrder=1/0,re.position.set(0,0,0),re.rotation.set(0,0,0),re.scale.set(1,1,1),X.add(re)}return X}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=z(A)),this.add(this.gizmo.rotate=z(C)),this.add(this.gizmo.scale=z(L)),this.add(this.picker.translate=z(I)),this.add(this.picker.rotate=z(E)),this.add(this.picker.scale=z(G)),this.add(this.helper.translate=z(P)),this.add(this.helper.rotate=z(M)),this.add(this.helper.scale=z(H)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){const i=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:Tc;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let s=[];s=s.concat(this.picker[this.mode].children),s=s.concat(this.gizmo[this.mode].children),s=s.concat(this.helper[this.mode].children);for(let r=0;r<s.length;r++){const a=s[r];a.visible=!0,a.rotation.set(0,0,0),a.position.copy(this.worldPosition);let o;if(this.camera.isOrthographicCamera?o=(this.camera.top-this.camera.bottom)/this.camera.zoom:o=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),a.scale.set(1,1,1).multiplyScalar(o*this.size/4),a.tag==="helper"){a.visible=!1,a.name==="AXIS"?(a.visible=!!this.axis,this.axis==="X"&&(zt.setFromEuler(ic.set(0,0,0)),a.quaternion.copy(i).multiply(zt),Math.abs(Dt.copy(Uo).applyQuaternion(i).dot(this.eye))>.9&&(a.visible=!1)),this.axis==="Y"&&(zt.setFromEuler(ic.set(0,0,Math.PI/2)),a.quaternion.copy(i).multiply(zt),Math.abs(Dt.copy(kr).applyQuaternion(i).dot(this.eye))>.9&&(a.visible=!1)),this.axis==="Z"&&(zt.setFromEuler(ic.set(0,Math.PI/2,0)),a.quaternion.copy(i).multiply(zt),Math.abs(Dt.copy(No).applyQuaternion(i).dot(this.eye))>.9&&(a.visible=!1)),this.axis==="XYZE"&&(zt.setFromEuler(ic.set(0,Math.PI/2,0)),Dt.copy(this.rotationAxis),a.quaternion.setFromRotationMatrix(Jp.lookAt(Kp,Dt,kr)),a.quaternion.multiply(zt),a.visible=this.dragging),this.axis==="E"&&(a.visible=!1)):a.name==="START"?(a.position.copy(this.worldPositionStart),a.visible=this.dragging):a.name==="END"?(a.position.copy(this.worldPosition),a.visible=this.dragging):a.name==="DELTA"?(a.position.copy(this.worldPositionStart),a.quaternion.copy(this.worldQuaternionStart),bn.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),bn.applyQuaternion(this.worldQuaternionStart.clone().invert()),a.scale.copy(bn),a.visible=this.dragging):(a.quaternion.copy(i),this.dragging?a.position.copy(this.worldPositionStart):a.position.copy(this.worldPosition),this.axis&&(a.visible=this.axis.search(a.name)!==-1));continue}a.quaternion.copy(i),this.mode==="translate"||this.mode==="scale"?(a.name==="X"&&Math.abs(Dt.copy(Uo).applyQuaternion(i).dot(this.eye))>.99&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),a.name==="Y"&&Math.abs(Dt.copy(kr).applyQuaternion(i).dot(this.eye))>.99&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),a.name==="Z"&&Math.abs(Dt.copy(No).applyQuaternion(i).dot(this.eye))>.99&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),a.name==="XY"&&Math.abs(Dt.copy(No).applyQuaternion(i).dot(this.eye))<.2&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),a.name==="YZ"&&Math.abs(Dt.copy(Uo).applyQuaternion(i).dot(this.eye))<.2&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),a.name==="XZ"&&Math.abs(Dt.copy(kr).applyQuaternion(i).dot(this.eye))<.2&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1)):this.mode==="rotate"&&(sc.copy(i),Dt.copy(this.eye).applyQuaternion(zt.copy(i).invert()),a.name.search("E")!==-1&&a.quaternion.setFromRotationMatrix(Jp.lookAt(this.eye,Kp,kr)),a.name==="X"&&(zt.setFromAxisAngle(Uo,Math.atan2(-Dt.y,Dt.z)),zt.multiplyQuaternions(sc,zt),a.quaternion.copy(zt)),a.name==="Y"&&(zt.setFromAxisAngle(kr,Math.atan2(Dt.x,Dt.z)),zt.multiplyQuaternions(sc,zt),a.quaternion.copy(zt)),a.name==="Z"&&(zt.setFromAxisAngle(No,Math.atan2(Dt.y,Dt.x)),zt.multiplyQuaternions(sc,zt),a.quaternion.copy(zt))),a.visible=a.visible&&(a.name.indexOf("X")===-1||this.showX),a.visible=a.visible&&(a.name.indexOf("Y")===-1||this.showY),a.visible=a.visible&&(a.name.indexOf("Z")===-1||this.showZ),a.visible=a.visible&&(a.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),a.material._color=a.material._color||a.material.color.clone(),a.material._opacity=a.material._opacity||a.material.opacity,a.material.color.copy(a.material._color),a.material.opacity=a.material._opacity,this.enabled&&this.axis&&(a.name===this.axis?(a.material.color.copy(this.materialLib.active.color),a.material.opacity=1):this.axis.split("").some(function(l){return a.name===l})&&(a.material.color.copy(this.materialLib.active.color),a.material.opacity=1))}super.updateMatrixWorld(e)}}class RE extends he{constructor(){super(new Hn(1e5,1e5,2,2),new yi({visible:!1,wireframe:!0,side:xn,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(e){let t=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(t="local"),rc.copy(Uo).applyQuaternion(t==="local"?this.worldQuaternion:Tc),To.copy(kr).applyQuaternion(t==="local"?this.worldQuaternion:Tc),Ao.copy(No).applyQuaternion(t==="local"?this.worldQuaternion:Tc),Dt.copy(To),this.mode){case"translate":case"scale":switch(this.axis){case"X":Dt.copy(this.eye).cross(rc),ts.copy(rc).cross(Dt);break;case"Y":Dt.copy(this.eye).cross(To),ts.copy(To).cross(Dt);break;case"Z":Dt.copy(this.eye).cross(Ao),ts.copy(Ao).cross(Dt);break;case"XY":ts.copy(Ao);break;case"YZ":ts.copy(rc);break;case"XZ":Dt.copy(Ao),ts.copy(To);break;case"XYZ":case"E":ts.set(0,0,0);break}break;case"rotate":default:ts.set(0,0,0)}ts.length()===0?this.quaternion.copy(this.cameraQuaternion):(Qp.lookAt(bn.set(0,0,0),ts,Dt),this.quaternion.setFromRotationMatrix(Qp)),super.updateMatrixWorld(e)}}function CE(n,e,t){e.traverse(i=>{i.material&&(Array.isArray(i.material)?i.material.forEach(s=>{n.properties.remove(s),s.dispose()}):(n.properties.remove(i.material),i.material.dispose()))}),n.info.programs.length=0,n.compile(e,t)}const PE=({focus:n=0,size:e=25,samples:t=10}={})=>{const i=rt.shadowmap_pars_fragment;return rt.shadowmap_pars_fragment=rt.shadowmap_pars_fragment.replace("#ifdef USE_SHADOWMAP",`#ifdef USE_SHADOWMAP

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
      float blockerDepthSum = float(${n});
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
return mix( 1.0, PCSS(shadowMap, shadowCoord), shadowIntensity );
#if defined( SHADOWMAP_TYPE_PCF )`),(s,r,a)=>{rt.shadowmap_pars_fragment=i,CE(s,r,a)}};function Er(n,e,t,i){const s=Object.entries(n);class r extends ln{static key=xt.generateUUID();constructor(o){super({uniforms:s.reduce((l,[c,h])=>{const u=Yd.clone({[c]:{value:h}});return{...l,...u}},{}),vertexShader:e,fragmentShader:t});for(const[l]of s)Object.defineProperty(this,l,{get:()=>this.uniforms[l].value,set:c=>this.uniforms[l].value=c});Object.assign(this,o),i?.(this)}}return r}const DE=new fl(-1,1,1,-1,0,1);class IE extends Tt{constructor(){super(),this.setAttribute("position",new ht([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ht([0,2,0,0,2,0],2))}}const LE=new IE;class UE{constructor(e){this._mesh=new he(LE,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,DE)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}function ac(n=1024,e=1024,t){var i=n,s=e,r=t||{};const{samples:a=0,depth:o,...l}=r,c=o??r.depthBuffer;var h=new St(i,s,{minFilter:nt,magFilter:nt,type:Gt,...l});return c&&(h.depthTexture=new ta(i,s,Vt)),h.samples=a,h}const NE=n=>n?.isVector3;function em(n=qi){const e={value:new We};return Object.assign(new Yv({side:n}),{viewMatrix:e,onBeforeCompile:t=>{t.uniforms.viewMatrix=e,t.fragmentShader=`vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
           return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
         }
`+t.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
           normal = inverseTransformDirection( normal, viewMatrix );
`)}})}const FE=Er({causticsTexture:null,causticsTextureB:null,color:new ye,lightProjMatrix:new We,lightViewMatrix:new We},`varying vec3 vWorldPosition;   
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
    #include <${parseInt(Mi.replace(/\D+/g,""))>=154?"colorspace_fragment":"encodings_fragment"}>
   }`),OE=Er({cameraMatrixWorld:new We,cameraProjectionMatrixInv:new We,normalTexture:null,depthTexture:null,lightDir:new D(0,1,0),lightPlaneNormal:new D(0,1,0),lightPlaneConstant:0,near:.1,far:100,modelMatrix:new We,worldRadius:1/40,ior:1.1,bounces:0,resolution:1024,size:10,intensity:.5},`
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
  }`),tm={depthBuffer:!0,minFilter:nt,magFilter:nt,type:on},Kh={minFilter:ji,magFilter:nt,type:Vt,generateMipmaps:!0};function BE(n){const e=em(),t=em(jt),i=new OE,s=new UE(i);let r=0;const a=new D,o=new Zc,l=new We,c=new Hi,h=new D,u=new D,d=new Es,f=new D,_=[],v=[],m=[],p=[],y=new D;for(let w=0;w<8;w++)_.push(new D),v.push(new D),m.push(new D),p.push(new D);return function(S){const{params:A,helper:I,camera:P,plane:C,normalTarget:M,normalTargetB:E,causticsTarget:L,causticsTargetB:G,scene:H,group:z}=n();if(A.frames===1/0||A.frames&&r++<A.frames){var q;NE(A.lightSource)?h.copy(A.lightSource).normalize():A.lightSource&&h.copy(z.worldToLocal(A.lightSource.getWorldPosition(a)).normalize()),u.copy(h).multiplyScalar(-1),(q=H.parent)==null||q.matrixWorld.identity(),d.setFromObject(H,!0),_[0].set(d.min.x,d.min.y,d.min.z),_[1].set(d.min.x,d.min.y,d.max.z),_[2].set(d.min.x,d.max.y,d.min.z),_[3].set(d.min.x,d.max.y,d.max.z),_[4].set(d.max.x,d.min.y,d.min.z),_[5].set(d.max.x,d.min.y,d.max.z),_[6].set(d.max.x,d.max.y,d.min.z),_[7].set(d.max.x,d.max.y,d.max.z);for(let W=0;W<8;W++)v[W].copy(_[W]);d.getCenter(f),_.map(W=>W.sub(f));const X=c.set(u,0);_.map((W,ee)=>X.projectPoint(W,m[ee]));const ie=m.reduce((W,ee)=>W.add(ee),a.set(0,0,0)).divideScalar(m.length),Z=m.map(W=>W.distanceTo(ie)).reduce((W,ee)=>Math.max(W,ee)),re=_.map(W=>W.dot(h)).reduce((W,ee)=>Math.max(W,ee));P.position.copy(y.copy(h).multiplyScalar(re).add(f)),P.lookAt(H.localToWorld(f));const oe=l.lookAt(P.position,f,a.set(0,1,0));if(P.left=-Z,P.right=Z,P.top=Z,P.bottom=-Z,A.near&&(P.near=A.near),A.far)P.far=A.far;else{const W=a.set(0,Z,0).applyMatrix4(oe),ee=(P.position.y+W.y)/h.y;P.far=ee}P.updateProjectionMatrix(),P.updateMatrixWorld();const Te=v.map((W,ee)=>W.add(p[ee].copy(h).multiplyScalar(-W.y/h.y))),fe=Te.reduce((W,ee)=>W.add(ee),a.set(0,0,0)).divideScalar(Te.length),ke=2*Te.map(W=>Math.hypot(W.x-fe.x,W.z-fe.z)).reduce((W,ee)=>Math.max(W,ee));C.scale.setScalar(ke),C.position.copy(fe),I!=null&&I.parent&&I.update(),t.viewMatrix.value=e.viewMatrix.value=P.matrixWorldInverse;const Ye=o.setFromProjectionMatrix(l.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse)).planes[4];i.cameraMatrixWorld=P.matrixWorld,i.cameraProjectionMatrixInv=P.projectionMatrixInverse,i.lightDir=u,i.lightPlaneNormal=Ye.normal,i.lightPlaneConstant=Ye.constant,i.near=P.near,i.far=P.far,A.resolution&&(i.resolution=A.resolution),i.size=Z,A.intensity&&(i.intensity=A.intensity),A.worldRadius&&(i.worldRadius=A.worldRadius),H.visible=!0,S.setRenderTarget(M),S.clear(),H.overrideMaterial=e,S.render(H,P),S.setRenderTarget(E),S.clear(),A.backside&&(H.overrideMaterial=t,S.render(H,P)),H.overrideMaterial=null,A.ior&&(i.ior=A.ior),C.material.lightProjMatrix=P.projectionMatrix,C.material.lightViewMatrix=P.matrixWorldInverse,i.normalTexture=M.texture,i.depthTexture=M.depthTexture,S.setRenderTarget(L),S.clear(),s.render(S),A.backsideIOR&&(i.ior=A.backsideIOR),i.normalTexture=E.texture,i.depthTexture=E.depthTexture,S.setRenderTarget(G),S.clear(),A.backside&&s.render(S),S.setRenderTarget(null),A.causticsOnly&&(H.visible=!1)}}}const kE=(n,{frames:e=1,causticsOnly:t=!1,ior:i=1.1,backside:s=!1,backsideIOR:r=1.1,worldRadius:a=.3125,color:o=new ye("white"),intensity:l=.05,resolution:c=2024,lightSource:h=new D(1,1,1),near:u=.1,far:d=0}={})=>{const f={frames:e,ior:i,color:o,causticsOnly:t,backside:s,backsideIOR:r,worldRadius:a,intensity:l,resolution:c,lightSource:h,near:u,far:d},_=new wt;_.name="caustics_group";const v=new fl,m=new cn;m.name="caustics_scene";const p=n,y=new Rx(v);y.name="caustics_helper";const w=f.resolution,S=ac(w,w,tm),A=ac(w,w,tm);n.extensions.get("OES_texture_float_linear")||(console.warn("Caustics: OES_texture_float_linear extension is not supported, using HalfFloatType instead."),Kh.type=Gt);const I=ac(w,w,Kh),P=ac(w,w,Kh),C=new he(new Hn(1,1),new FE({transparent:!0,color:f.color,causticsTexture:I.texture,causticsTextureB:P.texture,blending:Fd,blendSrc:Od,blendDst:Pc,depthWrite:!1}));C.name="caustics_plane",C.rotation.x=-Math.PI/2,C.renderOrder=2,_.add(m,C),_.updateWorldMatrix(!1,!0);const M=BE(()=>({params:f,scene:m,group:_,camera:v,plane:C,normalTarget:S,normalTargetB:A,causticsTarget:I,causticsTargetB:P,helper:y}));return{scene:m,group:_,helper:y,params:f,update:M.bind({},p),normalTarget:S,normalTargetB:A,causticsTarget:I,causticsTargetB:P}},lf=Er({},"void main() { }","void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");function zE(n){return n.isLight}function HE(n){return!!n.geometry}const GE=Er({color:new ye(0),blend:2,alphaTest:.75,opacity:0,map:null},`varying vec2 vUv;
   void main() {
     gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
     vUv = uv;
   }`,`varying vec2 vUv;
   uniform sampler2D map;
   uniform vec3 color;
   uniform float opacity;
   uniform float alphaTest;
   uniform float blend;
   void main() {
     vec4 sampledDiffuseColor = texture2D(map, vUv);
     gl_FragColor = vec4(color * sampledDiffuseColor.r * blend, max(0.0, (1.0 - (sampledDiffuseColor.r + sampledDiffuseColor.g + sampledDiffuseColor.b) / alphaTest)) * opacity);
     #include <tonemapping_fragment>
     #include <${parseInt(Mi.replace(/\D+/g,""))>=154?"colorspace_fragment":"encodings_fragment"}>
   }`);class VE{constructor(e,t,i=1024){this.renderer=e,this.res=i,this.scene=t,this.buffer1Active=!1,this.lights=[],this.meshes=[],this.object=null,this.clearColor=new ye,this.clearAlpha=0;const s=/(Android|iPad|iPhone|iPod)/g.test(navigator.userAgent)?Gt:Vt;this.progressiveLightMap1=new St(this.res,this.res,{type:s}),this.progressiveLightMap2=new St(this.res,this.res,{type:s}),this.discardMat=new lf,this.targetMat=new Eg({fog:!1}),this.previousShadowMap={value:this.progressiveLightMap1.texture},this.averagingWindow={value:100},this.targetMat.onBeforeCompile=r=>{r.vertexShader=`varying vec2 vUv;
`+r.vertexShader.slice(0,-1)+"vUv = uv; gl_Position = vec4((uv - 0.5) * 2.0, 1.0, 1.0); }";const a=r.fragmentShader.indexOf("void main() {");r.fragmentShader=`varying vec2 vUv;
`+r.fragmentShader.slice(0,a)+`uniform sampler2D previousShadowMap;
	uniform float averagingWindow;
`+r.fragmentShader.slice(a-1,-1)+`
vec3 texelOld = texture2D(previousShadowMap, vUv).rgb;
        gl_FragColor.rgb = mix(texelOld, gl_FragColor.rgb, 1.0/ averagingWindow);
      }`,r.uniforms.previousShadowMap=this.previousShadowMap,r.uniforms.averagingWindow=this.averagingWindow}}clear(){this.renderer.getClearColor(this.clearColor),this.clearAlpha=this.renderer.getClearAlpha(),this.renderer.setClearColor("black",1),this.renderer.setRenderTarget(this.progressiveLightMap1),this.renderer.clear(),this.renderer.setRenderTarget(this.progressiveLightMap2),this.renderer.clear(),this.renderer.setRenderTarget(null),this.renderer.setClearColor(this.clearColor,this.clearAlpha),this.lights=[],this.meshes=[],this.scene.traverse(e=>{HE(e)?this.meshes.push({object:e,material:e.material}):zE(e)&&this.lights.push({object:e,intensity:e.intensity})})}prepare(){this.lights.forEach(e=>e.object.intensity=0),this.meshes.forEach(e=>e.object.material=this.discardMat)}finish(){this.lights.forEach(e=>e.object.intensity=e.intensity),this.meshes.forEach(e=>e.object.material=e.material)}configure(e){this.object=e}update(e,t=100){if(!this.object)return;this.averagingWindow.value=t,this.object.material=this.targetMat;const i=this.buffer1Active?this.progressiveLightMap1:this.progressiveLightMap2,s=this.buffer1Active?this.progressiveLightMap2:this.progressiveLightMap1,r=this.scene.background;this.scene.background=null,this.renderer.setRenderTarget(i),this.previousShadowMap.value=s.texture,this.buffer1Active=!this.buffer1Active,this.renderer.render(this.scene,e),this.renderer.setRenderTarget(null),this.scene.background=r}}const Jh=(n,e)=>{"updateRanges"in n?n.updateRanges[0]=e:n.updateRange=e},WE="https://rawcdn.githack.com/pmndrs/drei-assets/9225a9f1fbd449d9411125c2f419b843d0308c9f/cloud.png",nm=new We,oc=new D,lc=new Ht,im=new D,sm=new Ht,Ro=new D,XE=n=>class extends n{constructor(){super();const e=parseInt(Mi.replace(/\D+/g,""))>=154?"opaque_fragment":"output_fragment";this.onBeforeCompile=t=>{t.vertexShader=`attribute float cloudOpacity;
               varying float vOpacity;
              `+t.vertexShader.replace("#include <fog_vertex>",`#include <fog_vertex>
                 vOpacity = cloudOpacity;
                `),t.fragmentShader=`varying float vOpacity;
              `+t.fragmentShader.replace(`#include <${e}>`,`#include <${e}>
                 gl_FragColor = vec4(outgoingLight, diffuseColor.a * vOpacity);
                `)}}};class $E extends wt{constructor({limit:e=200,range:t,material:i=Eg,texture:s,frustumCulled:r=!0}={}){super(),this.name="Clouds",this.ref=this;const a=this,o=new Hn(1,1),l=new Float32Array(Array.from({length:e},()=>1)),c=new Float32Array(Array.from({length:e},()=>[1,1,1]).flat()),h=new Qa(l,1);h.setUsage(ju),o.setAttribute("cloudOpacity",h);const u=XE(i),d=new u;d.map=s,d.transparent=!0,d.depthWrite=!1,d.needsUpdate=!0,this.cloudMaterial=d,this.instance=new Kd(o,d,e);const f=this.instance;f.matrixAutoUpdate=!1,f.frustumCulled=r,f.instanceColor=new Qa(c,3),f.instanceColor.setUsage(ju),a.add(f);const _=[],v=()=>{const P=_.length;let C=0;for(let M=0;M<this.ref.children.length;M++){const E=this.ref.children[M];E.cloudStateArray&&(C+=E.cloudStateArray.length)}if(P===C)return _;_.length=0;for(let M=0;M<this.ref.children.length;M++){const E=this.ref.children[M];E.cloudStateArray&&_.push(...E.cloudStateArray)}return m(),_},m=()=>{const P=Math.min(e,t!==void 0?t:e,_.length);f.count=P,Jh(f.instanceMatrix,{offset:0,count:P*16}),f.instanceColor&&Jh(f.instanceColor,{offset:0,count:P*3}),Jh(f.geometry.attributes.cloudOpacity,{offset:0,count:P})};let p=0,y=0,w;const S=new Ht,A=new D(0,0,1),I=new D;this.update=(P,C,M)=>{p=C,nm.copy(f.matrixWorld).invert(),P.matrixWorld.decompose(im,sm,Ro);const E=v();for(y=0;y<E.length;y++)w=E[y],w.ref.matrixWorld.decompose(oc,lc,Ro),oc.add(I.copy(w.position).applyQuaternion(lc).multiply(Ro)),lc.copy(sm).multiply(S.setFromAxisAngle(A,w.rotation+=M*w.rotationFactor)),Ro.multiplyScalar(w.volume+(1+Math.sin(p*w.density*w.speed))/2*w.growth),w.matrix.compose(oc,lc,Ro).premultiply(nm),w.dist=oc.distanceTo(im);for(E.sort((L,G)=>G.dist-L.dist),y=0;y<E.length;y++)w=E[y],l[y]=w.opacity*(w.dist<w.fade-1?w.dist/w.fade:1),f.setMatrixAt(y,w.matrix),f.setColorAt(y,w.color);f.geometry.attributes.cloudOpacity.needsUpdate=!0,f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0)}}}let jE=0;class YE extends wt{constructor({opacity:e=1,speed:t=0,bounds:i=new D().fromArray([5,1,1]),segments:s=20,color:r=new ye("#ffffff"),fade:a=10,volume:o=6,smallestVolume:l=.25,distribute:c=null,growth:h=4,concentrate:u="inside",seed:d=Math.random()}={}){super(),this.name="cloud_"+jE++,this.seed=d,this.segments=s,this.bounds=i,this.concentrate=u,this.volume=o,this.smallestVolume=l,this.distribute=c,this.growth=h,this.speed=t,this.fade=a,this.opacity=e,this.color=r,this.ref=this,this.cloudStateArray=[],this.updateCloud()}updateCloudStateArray(){if(this.cloudStateArray.length===this.segments)return;const{segments:e,uuid:t}=this;if(this.cloudStateArray.length>this.segments)this.cloudStateArray.splice(0,this.cloudStateArray.length-this.segments);else for(let i=this.cloudStateArray.length;i<e;i++)this.cloudStateArray.push({segments:e,bounds:new D(1,1,1),position:new D,uuid:t,index:i,ref:this,dist:0,matrix:new We,volume:0,length:0,speed:0,growth:0,opacity:1,fade:0,density:0,rotation:i*(Math.PI/e),rotationFactor:0,color:new ye})}updateCloud(){const{volume:e,color:t,speed:i,growth:s,opacity:r,fade:a,bounds:o,seed:l,cloudStateArray:c,distribute:h,segments:u,concentrate:d,smallestVolume:f}=this;this.updateCloudStateArray();let _=0;function v(){const m=Math.sin(l+_)*1e4;return _++,m-Math.floor(m)}c.forEach((m,p)=>{m.segments=u,m.volume=e,m.color=t,m.speed=i,m.growth=s,m.opacity=r,m.fade=a,m.bounds.copy(o),m.density=Math.max(.5,v()),m.rotationFactor=Math.max(.2,.5*v())*i;const y=h?.(m,p);if(y||u>1){var w;m.position.copy(m.bounds).multiply((w=y?.point)!==null&&w!==void 0?w:{x:v()*2-1,y:v()*2-1,z:v()*2-1})}const S=Math.abs(m.position.x),A=Math.abs(m.position.y),I=Math.abs(m.position.z),P=Math.max(S,A,I);m.length=1,S===P&&(m.length-=S/m.bounds.x),A===P&&(m.length-=A/m.bounds.y),I===P&&(m.length-=I/m.bounds.z),m.volume=(y?.volume!==void 0?y.volume:Math.max(Math.max(0,f),d==="random"?v():d==="inside"?m.length:1-m.length))*e})}}class ho extends Cg{constructor(e){super(e),this.type=Gt}parse(e){const a=function(C,M){switch(C){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(M||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(M||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(M||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(M||""))}},u=function(C,M,E){M=M||1024;let G=C.pos,H=-1,z=0,q="",X=String.fromCharCode.apply(null,new Uint16Array(C.subarray(G,G+128)));for(;0>(H=X.indexOf(`
`))&&z<M&&G<C.byteLength;)q+=X,z+=X.length,G+=128,X+=String.fromCharCode.apply(null,new Uint16Array(C.subarray(G,G+128)));return-1<H?(C.pos+=z+H+1,q+X.slice(0,H)):!1},d=function(C){const M=/^#\?(\S+)/,E=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,L=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,G=/^\s*FORMAT=(\S+)\s*$/,H=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,z={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let q,X;for((C.pos>=C.byteLength||!(q=u(C)))&&a(1,"no header found"),(X=q.match(M))||a(3,"bad initial token"),z.valid|=1,z.programtype=X[1],z.string+=q+`
`;q=u(C),q!==!1;){if(z.string+=q+`
`,q.charAt(0)==="#"){z.comments+=q+`
`;continue}if((X=q.match(E))&&(z.gamma=parseFloat(X[1])),(X=q.match(L))&&(z.exposure=parseFloat(X[1])),(X=q.match(G))&&(z.valid|=2,z.format=X[1]),(X=q.match(H))&&(z.valid|=4,z.height=parseInt(X[1],10),z.width=parseInt(X[2],10)),z.valid&2&&z.valid&4)break}return z.valid&2||a(3,"missing format specifier"),z.valid&4||a(3,"missing image size specifier"),z},f=function(C,M,E){const L=M;if(L<8||L>32767||C[0]!==2||C[1]!==2||C[2]&128)return new Uint8Array(C);L!==(C[2]<<8|C[3])&&a(3,"wrong scanline width");const G=new Uint8Array(4*M*E);G.length||a(4,"unable to allocate buffer space");let H=0,z=0;const q=4*L,X=new Uint8Array(4),ie=new Uint8Array(q);let Z=E;for(;Z>0&&z<C.byteLength;){z+4>C.byteLength&&a(1),X[0]=C[z++],X[1]=C[z++],X[2]=C[z++],X[3]=C[z++],(X[0]!=2||X[1]!=2||(X[2]<<8|X[3])!=L)&&a(3,"bad rgbe scanline format");let re=0,oe;for(;re<q&&z<C.byteLength;){oe=C[z++];const fe=oe>128;if(fe&&(oe-=128),(oe===0||re+oe>q)&&a(3,"bad scanline data"),fe){const ke=C[z++];for(let Ye=0;Ye<oe;Ye++)ie[re++]=ke}else ie.set(C.subarray(z,z+oe),re),re+=oe,z+=oe}const Te=L;for(let fe=0;fe<Te;fe++){let ke=0;G[H]=ie[fe+ke],ke+=L,G[H+1]=ie[fe+ke],ke+=L,G[H+2]=ie[fe+ke],ke+=L,G[H+3]=ie[fe+ke],H+=4}Z--}return G},_=function(C,M,E,L){const G=C[M+3],H=Math.pow(2,G-128)/255;E[L+0]=C[M+0]*H,E[L+1]=C[M+1]*H,E[L+2]=C[M+2]*H,E[L+3]=1},v=function(C,M,E,L){const G=C[M+3],H=Math.pow(2,G-128)/255;E[L+0]=Oa.toHalfFloat(Math.min(C[M+0]*H,65504)),E[L+1]=Oa.toHalfFloat(Math.min(C[M+1]*H,65504)),E[L+2]=Oa.toHalfFloat(Math.min(C[M+2]*H,65504)),E[L+3]=Oa.toHalfFloat(1)},m=new Uint8Array(e);m.pos=0;const p=d(m),y=p.width,w=p.height,S=f(m.subarray(m.pos),y,w);let A,I,P;switch(this.type){case Vt:P=S.length/4;const C=new Float32Array(P*4);for(let E=0;E<P;E++)_(S,E*4,C,E*4);A=C,I=Vt;break;case Gt:P=S.length/4;const M=new Uint16Array(P*4);for(let E=0;E<P;E++)v(S,E*4,M,E*4);A=M,I=Gt;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:y,height:w,data:A,header:p.string,gamma:p.gamma,exposure:p.exposure,type:I}}setDataType(e){return this.type=e,this}load(e,t,i,s){function r(a,o){switch(a.type){case Vt:case Gt:a.colorSpace=Ut,a.minFilter=nt,a.magFilter=nt,a.generateMipmaps=!1,a.flipY=!0;break}t&&t(a,o)}return super.load(e,r,i,s)}}class ZE extends he{constructor(e,t,i,s=128){if(t<=0||i<=0||s<=0)throw new Error("GroundedSkybox height, radius, and resolution must be positive.");const r=new Ki(i,2*s,s);r.scale(1,1,-1);const a=r.getAttribute("position"),o=new D;for(let l=0;l<a.count;++l)if(o.fromBufferAttribute(a,l),o.y<0){const c=-t*3/2,h=o.y<c?-t/o.y:1-o.y*o.y/(3*c*c);o.multiplyScalar(h),o.toArray(a.array,3*l)}a.needsUpdate=!0,super(r,new yi({map:e,depthWrite:!1}))}}const Qh=({startFrame:n,endFrame:e,fps:t,frameName:i,textureDataURL:s,textureImageURL:r,loop:a,numberOfFrames:o,autoPlay:l,animationNames:c,onStart:h,onEnd:u,onLoopEnd:d,onFrame:f,play:_,pause:v,flipX:m,alphaTest:p,asSprite:y})=>{let w={frames:[],meta:{version:"1.0",size:{w:1,h:1},scale:"1"}},S=new Kt;const A=new yg({toneMapped:!1,transparent:!0,map:S,alphaTest:p}),I=new yi({toneMapped:!1,side:xn,map:S,transparent:!0,alphaTest:p}),P=new kv(A),C=new he(new Hn(1,1),I);let M=A,E=P;const L=new wt;L.add(E);let G=window.performance.now(),H=n||0,z=i||"";const q=1e3/(t||30),X=Ie=>{S=Ie,M&&(M.map=Ie)},ie=new D(1,1,1),Z=Ie=>{ie.copy(Ie)},re=m?-1:1;let oe=y??!0;(Ie=>{oe=Ie,oe?(M=A,E=P,L.add(P),L.remove(C)):(M=I,E=C,L.remove(P),L.add(C))})(oe);async function fe(Ie,Me,$e){const Re=new tr,et=fetch(Ie).then(Oe=>Oe.json()),Ae=new Promise(Oe=>{Re.load(Me,Oe)});await Promise.all([et,Ae]).then(Oe=>{$e(Oe[0],Oe[1])})}const ke=(Ie,Me)=>{const $e=Me/Ie;return E.scale.set(1,$e,1),E.scale},Ye=async()=>{if(s&&r)await fe(s,r,Ne);else if(r){const Me=await new tr().loadAsync(r);Ne(null,Me)}},W=Ie=>{i=Ie,z!==i&&i&&(H=0,z=i)},ee=()=>{v=!0},ae=()=>{_=!0,v=!1},Ne=(Ie,Me)=>{if(Ie===null){if(Me&&o){const $e=Me.image.width,Re=Me.image.height,et=$e/o,Ae=Re;if(w={frames:[],meta:{version:"1.0",size:{w:$e,h:Re},scale:"1"}},parseInt(et.toString(),10)===et)for(let Oe=0;Oe<o;Oe++)w.frames.push({frame:{x:Oe*et,y:0,w:et,h:Ae},rotated:!1,trimmed:!1,spriteSourceSize:{x:0,y:0,w:et,h:Ae},sourceSize:{w:et,h:Re}})}}else if(Me){w=Ie,w.frames=Array.isArray(Ie.frames)?Ie.frames:De();const{w:$e,h:Re}=B(Ie.frames).sourceSize,et=ke($e,Re);Z(et),M&&(M.map=Me)}Me.premultiplyAlpha=!1,X(Me),Le()},De=()=>{const Ie={},Me=w,$e=c;if($e)for(let Re=0;Re<$e.length;Re++){Ie[$e[Re]]=[];for(const et in Me.frames){const Ae=Me.frames[et],Oe=Ae.frame,Nt=Oe.x,Mt=Oe.y,O=Oe.w,T=Oe.h,Y=Ae.sourceSize.w,te=Ae.sourceSize.h;typeof et=="string"&&et.toLowerCase().indexOf($e[Re].toLowerCase())!==-1&&Ie[$e[Re]].push({x:Nt,y:Mt,w:O,h:T,frame:Oe,sourceSize:{w:Y,h:te}})}}return Ie},Le=()=>{if(!(w&&M.map))return;const{meta:{size:Ie},frames:Me}=w,{w:$e,h:Re}=Array.isArray(Me)?Me[0].sourceSize:i?Me[i]?Me[i][0].sourceSize:{w:0,h:0}:{w:0,h:0};M.map.wrapS=M.map.wrapT=$i,M.map.center.set(0,0),M.map.repeat.set(1*re/(Ie.w/$e),1/(Ie.h/Re));const Ae=1/((Ie.h-1)/Re);M.map.offset.x=0,M.map.offset.y=1-Ae,h&&h({currentFrameName:i,currentFrame:H})},gt=()=>{if(!(w&&M.map))return;const Ie=window.performance.now(),Me=Ie-G,{meta:{size:$e},frames:Re}=w,{w:et,h:Ae}=B(Re).sourceSize,Oe=Array.isArray(Re)?Re:i?Re[i]:[];let Nt=0,Mt=0;const O=e||Oe.length-1;if(H>O&&(H=n??0,d?.({currentFrameName:i,currentFrame:H})),Me<=q)return;G=Ie-Me%q,ke(et,Ae);const T=($e.w-1)/et,Y=($e.h-1)/Ae,{frame:{x:te,y:de},sourceSize:{w:ne,h:ze}}=Oe[H],_e=1/T,Fe=1/Y;Nt=re>0?_e*(te/ne):_e*(te/ne)-M.map.repeat.x,Mt=Math.abs(1-Fe)-Fe*(de/ze),M.map.offset.x=Nt,M.map.offset.y=Mt,H+=1},st=()=>{var Ie,Me;!((Ie=w)!=null&&Ie.frames)||!((Me=M)!=null&&Me.map)||v||(gt(),f&&f({currentFrameName:z,currentFrame:H}))},B=Ie=>{if(Array.isArray(Ie))return Ie[0];if(typeof Ie=="object"&&Ie!==null){const Me=Object.keys(Ie);return Ie[Me[0]][0]}else return{w:0,h:0}};return{group:L,init:Ye,update:st,playAnimation:ae,pauseAnimation:ee,setFrameName:W}},qE=Er({screenspace:!1,color:new ye("black"),opacity:1,thickness:.05,size:new ue},`
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
     #include <${parseInt(Mi.replace(/\D+/g,""))>=154?"colorspace_fragment":"encodings_fragment"}>
   }`);function KE({color:n=new ye("black"),opacity:e=1,transparent:t=!1,screenspace:i=!1,toneMapped:s=!0,polygonOffset:r=!1,polygonOffsetFactor:a=0,renderOrder:o=0,thickness:l=.05,angle:c=Math.PI,gl:h}={}){const u=new wt;let d={color:n,opacity:e,transparent:t,screenspace:i,toneMapped:s,polygonOffset:r,polygonOffsetFactor:a,renderOrder:o,thickness:l,angle:c};function f(v){const m=u.parent;if(u.clear(),m&&m.geometry){let p;const y=new qE({side:jt});m.skeleton?(p=new Sg,p.material=y,p.bind(m.skeleton,m.bindMatrix),u.add(p)):m.isInstancedMesh?(p=new Kd(m.geometry,y,m.count),p.instanceMatrix=m.instanceMatrix,u.add(p)):(p=new he,p.material=y,u.add(p)),p.geometry=v?ub(m.geometry,v):m.geometry}}function _(v){d={...d,...v};const m=u.children[0];if(m){const{transparent:p,thickness:y,color:w,opacity:S,screenspace:A,toneMapped:I,polygonOffset:P,polygonOffsetFactor:C,renderOrder:M}=d,E=new ue;!h&&d.screenspace&&console.warn('Outlines: "screenspace" requires a WebGLRenderer instance to calculate the outline size'),h&&h.getSize(E),Object.assign(m.material,{transparent:p,thickness:y,color:w,opacity:S,size:E,screenspace:A,toneMapped:I,polygonOffset:P,polygonOffsetFactor:C}),M!==void 0&&(m.renderOrder=M)}}return{group:u,updateProps(v){var m;const p=(m=v.angle)!==null&&m!==void 0?m:d.angle;p!==d.angle&&f(p),_(v)},generate(){f(d.angle),_(d)}}}const JE=Er({alphaTest:0,viewport:new ue(1980,1080),focal:1e3,centerAndScaleTexture:null,covAndColorTexture:null},`
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
      #include <${parseInt(Mi.replace(/\D+/g,""))>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `);function QE(n){let e=null,t=0;function i(s,r=!1){const a=e.length/16,o=-1e-4;let l=-1/0,c=1/0;const h=new Float32Array(a),u=new Int32Array(h.buffer),d=new Int32Array(a);let f=0;for(let y=0;y<a;y++){const w=s[0]*e[y*16+12]+s[1]*e[y*16+13]+s[2]*e[y*16+14]+s[3];(r||w<0&&e[y*16+15]>o*w)&&(h[f]=w,d[f]=y,f++,w>l&&(l=w),w<c&&(c=w))}const _=(256*256-1)/(l-c),v=new Uint32Array(256*256);for(let y=0;y<f;y++)u[y]=(h[y]-c)*_|0,v[u[y]]++;const m=new Uint32Array(256*256);for(let y=1;y<256*256;y++)m[y]=m[y-1]+v[y-1];const p=new Uint32Array(f);for(let y=0;y<f;y++)p[m[u[y]]++]=d[y];return p}n.onmessage=s=>{if(s.data.method=="push"){t===0&&(e=new Float32Array(s.data.length));const r=new Float32Array(s.data.matrices);e.set(r,t),t+=r.length}else if(s.data.method=="sort"&&e!==null){const r=i(new Float32Array(s.data.view),s.data.hashed);n.postMessage({indices:r,key:s.data.key},[r.buffer])}}}class eT extends nr{constructor(e,t=25e3){super(),this.gl=e,this.chunkSize=t}async loadAsync(e,t,i){return new Promise(s=>this.load(e,s,t,i))}load(e,t,i,s){const r={gl:this.gl,url:this.manager.resolveURL(e),worker:new Worker(URL.createObjectURL(new Blob(["(",QE.toString(),")(self)"],{type:"application/javascript"}))),manager:this.manager,update:(a,o,l)=>iT(o,r,a,l),connect:a=>sT(r,a),loading:!1,loaded:!1,loadedVertexCount:0,chunkSize:this.chunkSize,totalDownloadBytes:0,numVertices:0,rowLength:32,maxVertexes:0,bufferTextureWidth:0,bufferTextureHeight:0,stream:null,centerAndScaleData:null,covAndColorData:null,covAndColorTexture:null,centerAndScaleTexture:null,onProgress:i};tT(r).then(t).catch(a=>{s?.(a),r.manager.itemError(r.url)})}}async function tT(n){n.manager.itemStart(n.url);const e=await fetch(n.url);if(e.body===null)throw"Failed to fetch file";const t=e.headers.get("Content-Length"),i=t?parseInt(t):void 0;if(i==null)throw"Failed to get content length";n.stream=e.body.getReader(),n.totalDownloadBytes=i,n.numVertices=Math.floor(n.totalDownloadBytes/n.rowLength);const s=n.gl.getContext(),r=s.getParameter(s.MAX_TEXTURE_SIZE);return n.maxVertexes=r*r,n.numVertices>n.maxVertexes&&(n.numVertices=n.maxVertexes),n.bufferTextureWidth=r,n.bufferTextureHeight=Math.floor((n.numVertices-1)/r)+1,n.centerAndScaleData=new Float32Array(n.bufferTextureWidth*n.bufferTextureHeight*4),n.covAndColorData=new Uint32Array(n.bufferTextureWidth*n.bufferTextureHeight*4),n.centerAndScaleTexture=new al(n.centerAndScaleData,n.bufferTextureWidth,n.bufferTextureHeight,rn,Vt),n.centerAndScaleTexture.needsUpdate=!0,n.covAndColorTexture=new al(n.covAndColorData,n.bufferTextureWidth,n.bufferTextureHeight,jc,er),n.covAndColorTexture.internalFormat="RGBA32UI",n.covAndColorTexture.needsUpdate=!0,n}async function nT(n){n.loading=!0;let e=0,t=0;const i=[];let s=0;const r=n.totalDownloadBytes!==0;for(;;)try{const{value:a,done:o}=await n.stream.read();if(o)break;if(e+=a.length,n.totalDownloadBytes!=null){const c=e/n.totalDownloadBytes*100;if(n.onProgress&&c-s>1){const h=new ProgressEvent("progress",{lengthComputable:r,loaded:e,total:n.totalDownloadBytes});n.onProgress(h),s=c}}i.push(a);const l=e-t;if(n.totalDownloadBytes!=null&&l>n.rowLength*n.chunkSize){const c=Math.floor(l/n.rowLength),h=new Uint8Array(l);let u=0;for(const _ of i)h.set(_,u),u+=_.length;if(i.length=0,l>c*n.rowLength){const _=new Uint8Array(l-c*n.rowLength);_.set(h.subarray(l-_.length,l),0),i.push(_)}const d=new Uint8Array(c*n.rowLength);d.set(h.subarray(0,d.byteLength),0);const f=rm(n,d.buffer,c);if(n.worker.postMessage({method:"push",src:n.url,length:n.numVertices*16,matrices:f.buffer},[f.buffer]),t+=c*n.rowLength,n.onProgress){const _=new ProgressEvent("progress",{lengthComputable:r,loaded:n.totalDownloadBytes,total:n.totalDownloadBytes});n.onProgress(_)}}}catch(a){console.error(a);break}if(e-t>0){const a=new Uint8Array(i.reduce((h,u)=>h+u.length,0));let o=0;for(const h of i)a.set(h,o),o+=h.length;const l=Math.floor(a.byteLength/n.rowLength),c=rm(n,a.buffer,l);n.worker.postMessage({method:"push",src:n.url,length:l*16,matrices:c.buffer},[c.buffer])}n.loaded=!0,n.manager.itemEnd(n.url)}function iT(n,e,t,i){if(n.updateMatrixWorld(),e.gl.getCurrentViewport(t.viewport),t.material.viewport.x=t.viewport.z,t.material.viewport.y=t.viewport.w,t.material.focal=t.viewport.w/2*Math.abs(n.projectionMatrix.elements[5]),t.ready){if(i&&t.sorted)return;t.ready=!1;const s=new Float32Array([t.modelViewMatrix.elements[2],-t.modelViewMatrix.elements[6],t.modelViewMatrix.elements[10],t.modelViewMatrix.elements[14]]);e.worker.postMessage({method:"sort",src:e.url,key:t.uuid,view:s.buffer,hashed:i},[s.buffer]),i&&e.loaded&&(t.sorted=!0)}}function sT(n,e){n.loading||nT(n),e.ready=!1,e.pm=new We,e.vm1=new We,e.vm2=new We,e.viewport=new pt;const t=new Uint32Array(n.bufferTextureWidth*n.bufferTextureHeight),i=new Qa(t,1,!1);i.setUsage(ju);const s=e.geometry=new px,r=new Float32Array(18),a=new Xt(r,3);s.setAttribute("position",a),a.setXYZ(2,-2,2,0),a.setXYZ(1,2,2,0),a.setXYZ(0,-2,-2,0),a.setXYZ(5,-2,-2,0),a.setXYZ(4,2,2,0),a.setXYZ(3,2,-2,0),a.needsUpdate=!0,s.setAttribute("splatIndex",i),s.instanceCount=1;function o(c){if(e&&c.data.key===e.uuid){const h=new Uint32Array(c.data.indices);s.attributes.splatIndex.set(h),s.attributes.splatIndex.needsUpdate=!0,s.instanceCount=h.length,e.ready=!0}}n.worker.addEventListener("message",o);async function l(){for(;;){const c=n.gl.properties.get(n.centerAndScaleTexture),h=n.gl.properties.get(n.covAndColorTexture);if(c!=null&&c.__webglTexture&&h!=null&&h.__webglTexture&&n.loadedVertexCount>0)break;await new Promise(u=>setTimeout(u,10))}e.ready=!0}return l(),()=>n.worker.removeEventListener("message",o)}function rm(n,e,t){const i=n.gl.getContext();if(n.loadedVertexCount+t>n.maxVertexes&&(t=n.maxVertexes-n.loadedVertexCount),t<=0)throw"Failed to parse file";const s=new Uint8Array(e),r=new Float32Array(e),a=new Float32Array(t*16),o=new Uint8Array(n.covAndColorData.buffer),l=new Int16Array(n.covAndColorData.buffer);for(let c=0;c<t;c++){const h=new Ht(-(s[32*c+28+1]-128)/128,(s[32*c+28+2]-128)/128,(s[32*c+28+3]-128)/128,-(s[32*c+28+0]-128)/128);h.invert();const u=new D(r[8*c+0],r[8*c+1],-r[8*c+2]),d=new D(r[8*c+3+0],r[8*c+3+1],r[8*c+3+2]),f=new We;f.makeRotationFromQuaternion(h),f.transpose(),f.scale(d);const _=f.clone();f.transpose(),f.premultiply(_),f.setPosition(u);const v=[0,1,2,5,6,10];let m=0;for(let w=0;w<v.length;w++)Math.abs(f.elements[v[w]])>m&&(m=Math.abs(f.elements[v[w]]));let p=n.loadedVertexCount*4+c*4;n.centerAndScaleData[p+0]=u.x,n.centerAndScaleData[p+1]=-u.y,n.centerAndScaleData[p+2]=u.z,n.centerAndScaleData[p+3]=m/32767,p=n.loadedVertexCount*8+c*4*2;for(let w=0;w<v.length;w++)l[p+w]=f.elements[v[w]]*32767/m;p=n.loadedVertexCount*16+(c*4+3)*4;const y=new ye(s[32*c+24+0]/255,s[32*c+24+1]/255,s[32*c+24+2]/255);y.convertSRGBToLinear(),o[p+0]=y.r*255,o[p+1]=y.g*255,o[p+2]=y.b*255,o[p+3]=s[32*c+24+3],f.elements[15]=Math.max(d.x,d.y,d.z)*s[32*c+24+3]/255;for(let w=0;w<16;w++)a[c*16+w]=f.elements[w]}for(;t>0;){let c=0,h=0;const u=n.loadedVertexCount%n.bufferTextureWidth,d=Math.floor(n.loadedVertexCount/n.bufferTextureWidth);n.loadedVertexCount%n.bufferTextureWidth!=0?(c=Math.min(n.bufferTextureWidth,u+t)-u,h=1):Math.floor(t/n.bufferTextureWidth)>0?(c=n.bufferTextureWidth,h=Math.floor(t/n.bufferTextureWidth)):(c=t%n.bufferTextureWidth,h=1);const f=n.gl.properties.get(n.centerAndScaleTexture);i.bindTexture(i.TEXTURE_2D,f.__webglTexture),i.texSubImage2D(i.TEXTURE_2D,0,u,d,c,h,i.RGBA,i.FLOAT,n.centerAndScaleData,n.loadedVertexCount*4);const _=n.gl.properties.get(n.covAndColorTexture);i.bindTexture(i.TEXTURE_2D,_.__webglTexture),i.texSubImage2D(i.TEXTURE_2D,0,u,d,c,h,i.RGBA_INTEGER,i.UNSIGNED_INT,n.covAndColorData,n.loadedVertexCount*4),n.gl.resetState(),n.loadedVertexCount+=c*h,t-=c*h}return a}class am extends he{constructor(e,t,{toneMapped:i=!1,alphaTest:s=0,alphaHash:r=!1}={}){super(),this.frustumCulled=!1,this.onBeforeRender=()=>e.update(this,t,r),this.material=new JE,Object.assign(this.material,{transparent:!r,depthTest:!0,alphaTest:r?0:s,centerAndScaleTexture:e.centerAndScaleTexture,covAndColorTexture:e.covAndColorTexture,depthWrite:r?!0:s>0,blending:r?qr:Fd,blendSrcAlpha:Od,alphaHash:!!r,toneMapped:i}),e.connect(this)}}const rT=()=>parseInt(Mi.replace(/\D+/g,"")),$g=rT(),aT=Er({blur:0,map:null,sdf:null,size:0,resolution:new ue},`varying vec2 vUv;
   void main() {
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
     vUv = uv;
   }`,`uniform sampler2D sdf;
   uniform sampler2D map;
   uniform float blur;
   uniform float size;
   uniform float time;
   uniform vec2 resolution;
   varying vec2 vUv;
   #include <packing>
   void main() {
     vec2 uv = gl_FragCoord.xy / resolution.xy;
     vec4 t = texture2D(map, uv);
     float k = blur;
     float d = texture2D(sdf, vUv).r/size;
     float alpha = 1.0 - smoothstep(0.0, 1.0, clamp(d/k + 1.0, 0.0, 1.0));
     gl_FragColor = vec4(t.rgb, blur == 0.0 ? t.a : t.a * alpha);
     #include <tonemapping_fragment>
     #include <${$g>=154?"colorspace_fragment":"encodings_fragment"}>
   }`);class jg extends bi{constructor({samples:e=6,transmissionSampler:t=!1,chromaticAberration:i=.05,transmission:s=0,_transmission:r=1,transmissionMap:a=null,roughness:o=0,thickness:l=0,thicknessMap:c=null,attenuationDistance:h=1/0,attenuationColor:u=new ye("white"),anisotropicBlur:d=.1,time:f=0,distortion:_=0,distortionScale:v=.5,temporalDistortion:m=0,buffer:p=null}={}){super(),this.uniforms={chromaticAberration:{value:i},transmission:{value:s},_transmission:{value:r},transmissionMap:{value:a},roughness:{value:o},thickness:{value:l},thicknessMap:{value:c},attenuationDistance:{value:h},attenuationColor:{value:u},anisotropicBlur:{value:d},time:{value:f},distortion:{value:_},distortionScale:{value:v},temporalDistortion:{value:m},buffer:{value:p}},this.onBeforeCompile=y=>{y.uniforms={...y.uniforms,...this.uniforms},t?y.defines.USE_SAMPLER="":y.defines.USE_TRANSMISSION="",y.fragmentShader=`
      uniform float chromaticAberration;         
      uniform float anisotropicBlur;      
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
      float randomBase( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }
      float randomBase( vec2  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec3  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec4  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float rand(float seed) {
        float result = randomBase(vec3(gl_FragCoord.xy, seed));
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
`+y.fragmentShader,y.fragmentShader=y.fragmentShader.replace("#include <transmission_pars_fragment>",`
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
`),y.fragmentShader=y.fragmentShader.replace("#include <transmission_fragment>",`  
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
        float runningSeed = 0.0;
        vec3 v = normalize( cameraPosition - pos );
        vec3 n = inverseTransformDirection( normal, viewMatrix );
        vec3 transmission = vec3(0.0);
        float transmissionR, transmissionB, transmissionG;
        float randomCoords = rand(runningSeed++);
        float thickness_smear = thickness * max(pow(roughnessFactor, 0.33), anisotropicBlur);
        vec3 distortionNormal = vec3(0.0);
        vec3 temporalOffset = vec3(time, -time, -time) * temporalDistortion;
        if (distortion > 0.0) {
          distortionNormal = distortion * vec3(snoiseFractal(vec3((pos * distortionScale + temporalOffset))), snoiseFractal(vec3(pos.zxy * distortionScale - temporalOffset)), snoiseFractal(vec3(pos.yxz * distortionScale + temporalOffset)));
        }
        for (float i = 0.0; i < ${e}.0; i ++) {
          vec3 sampleNorm = normalize(n + roughnessFactor * roughnessFactor * 2.0 * normalize(vec3(rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5)) * pow(rand(runningSeed++), 0.33) + distortionNormal);
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
`)},Object.keys(this.uniforms).forEach(y=>Object.defineProperty(this,y,{get:()=>this.uniforms[y].value,set:w=>this.uniforms[y].value=w}))}}const zc=Er({depth:null,opacity:1,attenuation:2.5,anglePower:12,spotPosition:new D(0,0,0),lightColor:new ye("white"),cameraNear:0,cameraFar:1,resolution:new ue(0,0),transparent:!0,depthWrite:!1},`
  varying vec3 vNormal;
  varying float vViewZ;
  varying float vIntensity;
  uniform vec3 spotPosition;
  uniform float attenuation;

  #include <fog_pars_vertex>
  #include <common>
  #include <logdepthbuf_pars_vertex>
  
  void main() {
  	#include <begin_vertex>
    #include <project_vertex>
    #include <fog_vertex>

    // compute intensity
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1);
    vec4 viewPosition = viewMatrix * worldPosition;
    vViewZ = viewPosition.z;

    vIntensity = 1.0 - saturate(distance(worldPosition.xyz, spotPosition) / attenuation);

    gl_Position = projectionMatrix * viewPosition;

    #include <logdepthbuf_vertex>
  }`,`
  varying vec3 vNormal;
  varying float vViewZ;
  varying float vIntensity;

  uniform vec3 lightColor;
  uniform float anglePower;
  uniform sampler2D depth;
  uniform vec2 resolution;
  uniform float cameraNear;
  uniform float cameraFar;
  uniform float opacity;

  #include <fog_pars_fragment>
  #include <packing>
  #include <logdepthbuf_pars_fragment>

  float readDepth(sampler2D depthSampler, vec2 uv) {
    float fragCoordZ = texture(depthSampler, uv).r;

    // https://github.com/mrdoob/three.js/issues/23072
    #ifdef USE_LOGDEPTHBUF
      float viewZ = 1.0 - exp2(fragCoordZ * log(cameraFar + 1.0) / log(2.0));
    #else
      float viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);
    #endif

    return viewZ;
  }

 void main() {
    #include <logdepthbuf_fragment>

    vec3 normal = vec3(vNormal.x, vNormal.y, abs(vNormal.z));
    float angleIntensity = pow(dot(normal, vec3(0, 0, 1)), anglePower);
    float intensity = vIntensity * angleIntensity;

    // fades when z is close to sampled depth, meaning the cone is intersecting existing geometry
    bool isSoft = resolution[0] > 0.0 && resolution[1] > 0.0;
    if (isSoft) {
      vec2 uv = gl_FragCoord.xy / resolution;
      intensity *= smoothstep(0.0, 1.0, vViewZ - readDepth(depth, uv));
    }

    gl_FragColor = vec4(lightColor, intensity * opacity);

    #include <tonemapping_fragment>
    #include <${$g>=154?"colorspace_fragment":"encodings_fragment"}>
    #include <fog_fragment>
  }`,n=>{Object.assign(n.uniforms,Yd.merge([Pe.fog]))});class oT extends ln{constructor(e=new ue){super({uniforms:{inputBuffer:new tt(null),depthBuffer:new tt(null),resolution:new tt(new ue),texelSize:new tt(new ue),halfTexelSize:new tt(new ue),kernel:new tt(0),scale:new tt(1),cameraNear:new tt(0),cameraFar:new tt(1),minDepthThreshold:new tt(0),maxDepthThreshold:new tt(1),depthScale:new tt(0),depthToBlurRatioBias:new tt(.25)},fragmentShader:`#include <common>
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
          #include <${parseInt(Mi.replace(/\D+/g,""))>=154?"colorspace_fragment":"encodings_fragment"}>
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
        }`,blending:An,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t),this.uniforms.halfTexelSize.value.set(e,t).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}}class lT{renderToScreen=!1;constructor({gl:e,resolution:t,width:i=500,height:s=500,minDepthThreshold:r=0,maxDepthThreshold:a=1,depthScale:o=0,depthToBlurRatioBias:l=.25}){this.renderTargetA=new St(t,t,{minFilter:nt,magFilter:nt,stencilBuffer:!1,depthBuffer:!1,type:Gt}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new oT,this.convolutionMaterial.setTexelSize(1/i,1/s),this.convolutionMaterial.setResolution(new ue(i,s)),this.scene=new cn,this.camera=new hl,this.convolutionMaterial.uniforms.minDepthThreshold.value=r,this.convolutionMaterial.uniforms.maxDepthThreshold.value=a,this.convolutionMaterial.uniforms.depthScale.value=o,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=l,this.convolutionMaterial.defines.USE_DEPTH=o>0;const c=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),h=new Float32Array([0,0,2,0,0,2]),u=new Tt;u.setAttribute("position",new Xt(c,3)),u.setAttribute("uv",new Xt(h,2)),this.screen=new he(u,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,t,i){const s=this.scene,r=this.camera,a=this.renderTargetA,o=this.renderTargetB,l=this.convolutionMaterial,c=l.uniforms;c.depthBuffer.value=t.depthTexture;const h=l.kernel;let u=t,d,f,_;for(f=0,_=h.length-1;f<_;++f)d=(f&1)===0?a:o,c.kernel.value=h[f],c.inputBuffer.value=u.texture,e.setRenderTarget(d),e.render(s,r),u=d;c.kernel.value=h[f],c.inputBuffer.value=u.texture,e.setRenderTarget(this.renderToScreen?null:i),e.render(s,r)}}class eu extends Wt{_tDepth={value:null};_distortionMap={value:null};_tDiffuse={value:null};_tDiffuseBlur={value:null};_textureMatrix={value:null};_hasBlur={value:!1};_mirror={value:0};_mixBlur={value:0};_blurStrength={value:.5};_minDepthThreshold={value:.9};_maxDepthThreshold={value:1};_depthScale={value:0};_depthToBlurRatioBias={value:.25};_distortion={value:1};_mixContrast={value:1};constructor(e={}){super(),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var t;(t=e.defines)!=null&&t.USE_UV||(e.defines.USE_UV=""),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
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
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}}const cT=""+new URL("ulmer_muenster_1k-CzQCaZ0L.exr",import.meta.url).href,hT=""+new URL("ulmer_muenster-CHNCW3JR.webp",import.meta.url).href,uT=""+new URL("wide_street_01_1k-CYc_PqDD.exr",import.meta.url).href,dT=""+new URL("wide_street_01-DgC4euMZ.webp",import.meta.url).href,fT=""+new URL("wide_street_02_1k-DRflEFtY.exr",import.meta.url).href,pT=""+new URL("wide_street_02-uVWfq-3x.webp",import.meta.url).href,mT=""+new URL("kloppenheim_02_1k-CFXoL4X5.exr",import.meta.url).href,gT=""+new URL("kloppenheim_02-4zXFvWtQ.webp",import.meta.url).href,_T=""+new URL("dry_cracked_lake-BTESVe21.avif",import.meta.url).href,vT=""+new URL("dry_cracked_lake_1k-DYKgHxd2.hdr",import.meta.url).href,xT=""+new URL("round_platform-XjPRvH_T.avif",import.meta.url).href,yT=""+new URL("round_platform_1k-B_KslR8a.exr",import.meta.url).href,wT=""+new URL("skidpan-BJhHc7IX.avif",import.meta.url).href,ST=""+new URL("skidpan_1k-Do1uC2ZK.hdr",import.meta.url).href,MT=""+new URL("dancing_hall-BgM7ufUX.avif",import.meta.url).href,bT=""+new URL("dancing_hall_1k-D-Z0MlXc.exr",import.meta.url).href,ET=""+new URL("empty_warehouse_01-DtD_HYQH.avif",import.meta.url).href,TT=""+new URL("empty_warehouse_01_1k-Bx0ci9ki.exr",import.meta.url).href,AT=""+new URL("old_hall-C9qg-_1d.avif",import.meta.url).href,RT=""+new URL("old_hall_1k-CdaXHa-9.exr",import.meta.url).href,Nn={ulmer_muenster:{exr:cT,webP:hT,sunPos:[17,14,12],sunColor:"#ffffeb",shadowOpacity:.72,groundProj:{radius:25,height:2}},wide_street1:{exr:uT,webP:dT,sunPos:[15,24,11],sunColor:"#ffffeb",shadowOpacity:.85,groundProj:{radius:12,height:2}},wide_street2:{exr:fT,webP:pT,sunPos:[16,8,12],sunColor:"#ffffeb",shadowOpacity:.55,groundProj:{radius:25,height:2}},kloppenheim:{exr:mT,webP:gT,groundProj:{radius:25,height:2}},dry_cracked_lake:{hdr:vT,avif:_T,groundProj:{radius:20,height:2}},round_platform:{exr:yT,avif:xT,groundProj:{radius:10,height:2.5}},skidpan:{hdr:ST,avif:wT,groundProj:{radius:50,height:4.5}},dancing_hall:{avif:MT,exr:bT,groundProj:{radius:20,height:3}},empty_warehouse:{avif:ET,exr:TT,groundProj:{radius:19,height:6}},old_hall:{avif:AT,exr:RT,groundProj:{radius:13,height:4}}},CT=""+new URL("monkey_comp-Bgb0vDI0.glb",import.meta.url).href,PT=""+new URL("pole_comp-CXNwr1kE.glb",import.meta.url).href,DT=""+new URL("porsche_911_1975_comp-Dc1ki_4z.glb",import.meta.url).href,IT=""+new URL("road_comp-CCPypbOx.glb",import.meta.url).href,LT=""+new URL("room_comp-B6DJDBMh.glb",import.meta.url).href,UT=""+new URL("vase_2k_comp-Cut_6m9m.glb",import.meta.url).href,NT=""+new URL("stanford _bunny_comp-BF1tdc5-.glb",import.meta.url).href;class ml{constructor({debug:e=!1}={}){this.progress=0,this.container=null,this.textElement=null,this.multiProgress=new Map,this.debug=e}_createLoadingDiv(){this.container=document.createElement("div"),this.textElement=document.createElement("div"),Object.assign(this.container.style,{position:"fixed",top:"0",left:"0",width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",background:"linear-gradient(135deg, #333333, #111111)",zIndex:"1000",opacity:"0.9",transition:"opacity 0.3s ease"}),Object.assign(this.textElement.style,{color:"#ffffff99",fontSize:"3rem"}),this.container.appendChild(this.textElement),document.body.appendChild(this.container)}updateProgress(e){this.progress=Math.min(Math.max(e,0),1),this.progress>0&&!this.container&&this._createLoadingDiv(),this.container&&(this.textElement.textContent=`Loading ${Math.floor(this.progress*100)}%`),this.progress===1&&this._removeLoadingDiv()}setGlobalProgress(e="",t=0){this.multiProgress.set(e,t);let i=!0;for(const r of this.multiProgress.values())if(r!==1){i=!1;break}if(i){if(this.multiProgress.clear(),this.updateProgress(1),this.debug){const r=`100% items:${this.multiProgress.size} id:${e.slice(0,30)}=>${t.toFixed(2)} `;console.log(r)}return}const s=[...this.multiProgress.values()].reduce((r,a)=>r+a,0)/this.multiProgress.size;if(this.updateProgress(s),this.debug){const r=`${s.toFixed(2)} size:${this.multiProgress.size} id:${e.slice(0,30)}=>${t.toFixed(2)} `;console.log(r)}}_removeLoadingDiv(){this.container&&(document.body.removeChild(this.container),this.container=null,this.textElement=null)}}const Yg=new Vn,Zg=new Wn;Zg.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");Yg.setDRACOLoader(Zg);const mn={monkey:{url:CT},pole:{url:PT},porsche_1975:{url:DT},road:{url:IT},room:{url:LT},vase:{url:UT},bunny:{url:NT}},uo=async(n,{loadingHelper:e}={})=>(e?.setGlobalProgress(n,0),await Yg.loadAsync(n,t=>{e?.setGlobalProgress(n,t.loaded/t.total)}));let ed,En,Gi,_n,is,Vo,Pi,td=new ue;const Nr={environment:Nn.ulmer_muenster,groundProjection:!0,bgColor:new ye,printCam:()=>{}},ol=new wt,FT=new tr,OT=new co,BT=new ho,qg=new Vn,Kg=new Wn;let Ni;Kg.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");qg.setDRACOLoader(Kg);const om=new Fn,Ta=[];let Jg=()=>{},Hc,lm;async function kT(n){Vo=n,Hc=Vo.addFolder("Scene"),ed=new gn,app.appendChild(ed.dom),En=new Gn({antialias:!0}),En.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),En.setSize(window.innerWidth,window.innerHeight),En.shadowMap.enabled=!0,En.shadowMap.type=sn,En.outputColorSpace=je,En.toneMapping=Ji,lm=new kc(En),lm.compileCubemapShader(),app.appendChild(En.domElement),Gi=new yt(50,window.innerWidth/window.innerHeight,.1,200),Gi.position.set(6,3,6),Gi.name="Camera",Gi.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),_n=new cn,_n.add(ol),is=new Xn(Gi,En.domElement),is.enableDamping=!0,is.dampingFactor=.05,is.minDistance=.1,is.maxDistance=100,is.maxPolarAngle=Math.PI/1.5,is.target.set(0,0,0),is.target.set(0,0,0),Ni=new ti(Gi,En.domElement),Ni.addEventListener("dragging-changed",t=>{is.enabled=!t.value,t.value}),Ni.addEventListener("change",()=>{Ni.object&&Ni.object.position.y<0&&(Ni.object.position.y=0)}),_n.add(Ni.getHelper()),window.addEventListener("resize",HT),document.addEventListener("pointermove",cm);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",t=>{Date.now()-e<200&&(cm(t),VT())}),Hc.add(Ni,"mode",["translate","rotate","scale"]),zT(),await WT(),Qg()}async function zT(){let n=new wt,e=new na(16777195,1);e.name="Dir. Light",e.castShadow=!0,e.shadow.camera.near=.1,e.shadow.camera.far=50,e.shadow.camera.right=15,e.shadow.camera.left=-15,e.shadow.camera.top=15,e.shadow.camera.bottom=-15,e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.radius=1.95,e.shadow.blurSamples=6,e.shadow.bias=-5e-4,n.add(e),_n.add(n);const t=new he(new Hn(10,10).rotateX(-Math.PI/2),new ef({}));t.name="shadowFloor",t.receiveShadow=!0,t.position.set(0,0,0),_n.add(t);async function i(r){if(!r){_n.background=null,_n.environment=null;return}if(r.exr){const a=await OT.loadAsync(r.exr);a.mapping=an,_n.environment=a,console.log("exr loaded")}if(r.hdr){const a=await BT.loadAsync(r.hdr);a.mapping=an,_n.environment=a,console.log("exr loaded")}if(r.webP||r.avif){const a=await FT.loadAsync(r.webP||r.avif);a.mapping=an,a.colorSpace=je,_n.background=a,console.log("bg loaded"),Nr.groundProjection&&s(Nr.environment)}r.sunPos?(e.visible=!0,e.position.fromArray(r.sunPos)):e.visible=!1,r.sunCol?e.color.set(r.sunCol):e.color.set(16777215),r.shadowOpacity&&(t.material.opacity=r.shadowOpacity)}function s(r){Nr.groundProjection&&_n.background&&r.groundProj?(Pi||(Pi=new th(_n.background),Pi.scale.setScalar(100)),Pi.material.uniforms.map.value=_n.background,Pi.radius=r.groundProj.radius,Pi.height=r.groundProj.height,Pi.parent||_n.add(Pi)):Pi&&Pi.parent&&Pi.removeFromParent()}i(Nr.environment),Hc.add(Nr,"environment",Nn).onChange(r=>{i(r)}),Hc.add(Nr,"groundProjection").onChange(r=>{s(Nr.environment)})}function HT(){Gi.aspect=window.innerWidth/window.innerHeight,Gi.updateProjectionMatrix(),En.setSize(window.innerWidth,window.innerHeight)}function GT(){ed.update(),is.update(),Jg(),En.render(_n,Gi)}function Qg(){requestAnimationFrame(Qg),GT()}function VT(){if(om.setFromCamera(td,Gi),om.intersectObject(ol,!0,Ta),!Ta.length){Ni.detach();return}Ta[0].object.selectOnRaycast?Ni.attach(Ta[0].object.selectOnRaycast):Ni.attach(Ta[0].object),Ta.length=0}function cm(n){td.x=n.clientX/window.innerWidth*2-1,td.y=-(n.clientY/window.innerHeight)*2+1}async function WT(){const n=new he(new Ki(.5).translate(0,.5,0),new Wt({color:hm(),roughness:0,metalness:1}));n.name="sphere",n.castShadow=!0,n.receiveShadow=!0,n.position.set(2,0,-1.5),ol.add(n);const e=new he(new Lt(1,1,1).translate(0,.5,0),new Wt({color:hm(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),ol.add(e),XT()}async function XT(){const n={default:"def",physical:"phy",transmission:"tra"},e={carMaterial:n.default},t={renderEachMesh:!1,enabled:!1,customBackground:_n.background,backside:!0,thickness:1,backsideThickness:.5},i=[],r=(await qg.loadAsync(mn.porsche_1975.url)).scene;r.name="car";let a;const o=new lf,l=new jg(6,!1),c=new bi({roughness:0,transmission:1,thickness:1});r.traverse(S=>{if(S.isMesh){S.castShadow=!0,S.receiveShadow=!0,S.selectOnRaycast=r;const A=S.material;i.push({material:A,mesh:S,physical:c,transmission:l}),S.name==="body"&&(a=S)}}),ol.add(r),Vo.add(e,"carMaterial",n).onChange(S=>{for(const A of i)S===n.default&&(A.mesh.material=A.material,t.enabled=!1),S===n.physical&&(A.mesh.material=A.physical,t.enabled=!1),S===n.transmission&&(A.mesh.material=A.transmission,t.enabled=!0)}),$T(Vo,c),jT(Vo,l,t);const h=new St(512,512,{minFilter:nt,magFilter:nt,colorSpace:En.outputColorSpace,type:Gt}),u=new St(512,512,{minFilter:nt,magFilter:nt,colorSpace:En.outputColorSpace,type:Gt}),d=l;d.buffer=u.texture;let f,_,v;const m={gl:En,scene:_n,camera:Gi};let p;const y=[{mesh:a,mat:l}],w=new Qc(!0);Jg=()=>{if(t.enabled){d.time=w.getElapsedTime(),t.renderEachMesh?p=i:p=y;for(let S=0;S<p.length;S++){const A=i[S].mesh;d.buffer===u.texture&&(_=m.gl.toneMapping,f=m.scene.background,v=A.material.side,m.gl.toneMapping=Ss,t.background&&(m.scene.background=t.background),A.material=o,t.backside&&(m.gl.setRenderTarget(h),m.gl.render(m.scene,m.camera),A.material=d,A.material.buffer=h.texture,A.material.thickness=t.backsideThickness,A.material.side=jt),m.gl.setRenderTarget(u),m.gl.render(m.scene,m.camera),A.material=d,A.material.thickness=t.thickness,A.material.side=v,A.material.buffer=u.texture,m.scene.background=f,m.gl.setRenderTarget(null),m.gl.toneMapping=_)}}}}function $T(n,e){const t=n.addFolder("Physical Material");t.addColor(e,"color"),t.addColor(e,"attenuationColor"),t.add(e,"attenuationDistance",0,2),t.add(e,"roughness",0,1),t.add(e,"transmission",0,1),t.add(e,"thickness",0,2),t.add(e,"reflectivity",0,1)}function jT(n,e,t){const i=n.addFolder("Transmission Material");i.add(t,"enabled").name("Rendering Enabled").listen(),i.add(t,"backside"),i.add(t,"thickness",0,2),i.add(t,"backsideThickness",0,2),i.addColor(e,"color"),i.addColor(e,"attenuationColor"),i.add(e,"_transmission",0,1),i.add(e,"attenuationDistance",0,2),i.add(e,"roughness",0,1),i.add(e,"chromaticAberration",0,2),i.add(e,"distortion",0,10),i.add(e,"temporalDistortion",0,1),i.add(e,"anisotropicBlur",0,10),i.add(e,"reflectivity",0,1),i.add(t,"renderEachMesh").name("⚠ Render Each Mesh separately")}const YT=new ye;function hm(){return"#"+YT.setHSL(Math.random(),.5,.5).getHexString()}var yn=Object.freeze({Linear:Object.freeze({None:function(n){return n},In:function(n){return n},Out:function(n){return n},InOut:function(n){return n}}),Quadratic:Object.freeze({In:function(n){return n*n},Out:function(n){return n*(2-n)},InOut:function(n){return(n*=2)<1?.5*n*n:-.5*(--n*(n-2)-1)}}),Cubic:Object.freeze({In:function(n){return n*n*n},Out:function(n){return--n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n:.5*((n-=2)*n*n+2)}}),Quartic:Object.freeze({In:function(n){return n*n*n*n},Out:function(n){return 1- --n*n*n*n},InOut:function(n){return(n*=2)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2)}}),Quintic:Object.freeze({In:function(n){return n*n*n*n*n},Out:function(n){return--n*n*n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2)}}),Sinusoidal:Object.freeze({In:function(n){return 1-Math.sin((1-n)*Math.PI/2)},Out:function(n){return Math.sin(n*Math.PI/2)},InOut:function(n){return .5*(1-Math.sin(Math.PI*(.5-n)))}}),Exponential:Object.freeze({In:function(n){return n===0?0:Math.pow(1024,n-1)},Out:function(n){return n===1?1:1-Math.pow(2,-10*n)},InOut:function(n){return n===0?0:n===1?1:(n*=2)<1?.5*Math.pow(1024,n-1):.5*(-Math.pow(2,-10*(n-1))+2)}}),Circular:Object.freeze({In:function(n){return 1-Math.sqrt(1-n*n)},Out:function(n){return Math.sqrt(1- --n*n)},InOut:function(n){return(n*=2)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1)}}),Elastic:Object.freeze({In:function(n){return n===0?0:n===1?1:-Math.pow(2,10*(n-1))*Math.sin((n-1.1)*5*Math.PI)},Out:function(n){return n===0?0:n===1?1:Math.pow(2,-10*n)*Math.sin((n-.1)*5*Math.PI)+1},InOut:function(n){return n===0?0:n===1?1:(n*=2,n<1?-.5*Math.pow(2,10*(n-1))*Math.sin((n-1.1)*5*Math.PI):.5*Math.pow(2,-10*(n-1))*Math.sin((n-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(n){var e=1.70158;return n===1?1:n*n*((e+1)*n-e)},Out:function(n){var e=1.70158;return n===0?0:--n*n*((e+1)*n+e)+1},InOut:function(n){var e=2.5949095;return(n*=2)<1?.5*(n*n*((e+1)*n-e)):.5*((n-=2)*n*((e+1)*n+e)+2)}}),Bounce:Object.freeze({In:function(n){return 1-yn.Bounce.Out(1-n)},Out:function(n){return n<1/2.75?7.5625*n*n:n<2/2.75?7.5625*(n-=1.5/2.75)*n+.75:n<2.5/2.75?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},InOut:function(n){return n<.5?yn.Bounce.In(n*2)*.5:yn.Bounce.Out(n*2-1)*.5+.5}}),generatePow:function(n){return n===void 0&&(n=4),n=n<Number.EPSILON?Number.EPSILON:n,n=n>1e4?1e4:n,{In:function(e){return Math.pow(e,n)},Out:function(e){return 1-Math.pow(1-e,n)},InOut:function(e){return e<.5?Math.pow(e*2,n)/2:(1-Math.pow(2-e*2,n))/2+.5}}}}),Fo=function(){return performance.now()},ZT=function(){function n(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._tweens={},this._tweensAddedDuringUpdate={},this.add.apply(this,e)}return n.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(t){return e._tweens[t]})},n.prototype.removeAll=function(){this._tweens={}},n.prototype.add=function(){for(var e,t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];for(var s=0,r=t;s<r.length;s++){var a=r[s];(e=a._group)===null||e===void 0||e.remove(a),a._group=this,this._tweens[a.getId()]=a,this._tweensAddedDuringUpdate[a.getId()]=a}},n.prototype.remove=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var i=0,s=e;i<s.length;i++){var r=s[i];r._group=void 0,delete this._tweens[r.getId()],delete this._tweensAddedDuringUpdate[r.getId()]}},n.prototype.allStopped=function(){return this.getAll().every(function(e){return!e.isPlaying()})},n.prototype.update=function(e,t){e===void 0&&(e=Fo()),t===void 0&&(t=!0);var i=Object.keys(this._tweens);if(i.length!==0)for(;i.length>0;){this._tweensAddedDuringUpdate={};for(var s=0;s<i.length;s++){var r=this._tweens[i[s]],a=!t;r&&r.update(e,a)===!1&&!t&&this.remove(r)}i=Object.keys(this._tweensAddedDuringUpdate)}},n}(),nd={Linear:function(n,e){var t=n.length-1,i=t*e,s=Math.floor(i),r=nd.Utils.Linear;return e<0?r(n[0],n[1],i):e>1?r(n[t],n[t-1],t-i):r(n[s],n[s+1>t?t:s+1],i-s)},Utils:{Linear:function(n,e,t){return(e-n)*t+n}}},e0=function(){function n(){}return n.nextId=function(){return n._nextId++},n._nextId=0,n}(),id=new ZT,vi=function(){function n(e,t){this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=yn.Linear.None,this._interpolationFunction=nd.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=e0.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1,this._object=e,typeof t=="object"?(this._group=t,t.add(this)):t===!0&&(this._group=id,id.add(this))}return n.prototype.getId=function(){return this._id},n.prototype.isPlaying=function(){return this._isPlaying},n.prototype.isPaused=function(){return this._isPaused},n.prototype.getDuration=function(){return this._duration},n.prototype.to=function(e,t){if(t===void 0&&(t=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=e,this._propertiesAreSetUp=!1,this._duration=t<0?0:t,this},n.prototype.duration=function(e){return e===void 0&&(e=1e3),this._duration=e<0?0:e,this},n.prototype.dynamic=function(e){return e===void 0&&(e=!1),this._isDynamic=e,this},n.prototype.start=function(e,t){if(e===void 0&&(e=Fo()),t===void 0&&(t=!1),this._isPlaying)return this;if(this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var i in this._valuesStartRepeat)this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e,this._startTime+=this._delayTime,!this._propertiesAreSetUp||t){if(this._propertiesAreSetUp=!0,!this._isDynamic){var s={};for(var r in this._valuesEnd)s[r]=this._valuesEnd[r];this._valuesEnd=s}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,t)}return this},n.prototype.startFromCurrentValues=function(e){return this.start(e,!0)},n.prototype._setupProperties=function(e,t,i,s,r){for(var a in i){var o=e[a],l=Array.isArray(o),c=l?"array":typeof o,h=!l&&Array.isArray(i[a]);if(!(c==="undefined"||c==="function")){if(h){var u=i[a];if(u.length===0)continue;for(var d=[o],f=0,_=u.length;f<_;f+=1){var v=this._handleRelativeValue(o,u[f]);if(isNaN(v)){h=!1,console.warn("Found invalid interpolation list. Skipping.");break}d.push(v)}h&&(i[a]=d)}if((c==="object"||l)&&o&&!h){t[a]=l?[]:{};var m=o;for(var p in m)t[a][p]=m[p];s[a]=l?[]:{};var u=i[a];if(!this._isDynamic){var y={};for(var p in u)y[p]=u[p];i[a]=u=y}this._setupProperties(m,t[a],u,s[a],r)}else(typeof t[a]>"u"||r)&&(t[a]=o),l||(t[a]*=1),h?s[a]=i[a].slice().reverse():s[a]=t[a]||0}}},n.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},n.prototype.end=function(){return this._goToEnd=!0,this.update(this._startTime+this._duration),this},n.prototype.pause=function(e){return e===void 0&&(e=Fo()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this)},n.prototype.resume=function(e){return e===void 0&&(e=Fo()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this)},n.prototype.stopChainedTweens=function(){for(var e=0,t=this._chainedTweens.length;e<t;e++)this._chainedTweens[e].stop();return this},n.prototype.group=function(e){return e?(e.add(this),this):(console.warn("tween.group() without args has been removed, use group.add(tween) instead."),this)},n.prototype.remove=function(){var e;return(e=this._group)===null||e===void 0||e.remove(this),this},n.prototype.delay=function(e){return e===void 0&&(e=0),this._delayTime=e,this},n.prototype.repeat=function(e){return e===void 0&&(e=0),this._initialRepeat=e,this._repeat=e,this},n.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},n.prototype.yoyo=function(e){return e===void 0&&(e=!1),this._yoyo=e,this},n.prototype.easing=function(e){return e===void 0&&(e=yn.Linear.None),this._easingFunction=e,this},n.prototype.interpolation=function(e){return e===void 0&&(e=nd.Linear),this._interpolationFunction=e,this},n.prototype.chain=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._chainedTweens=e,this},n.prototype.onStart=function(e){return this._onStartCallback=e,this},n.prototype.onEveryStart=function(e){return this._onEveryStartCallback=e,this},n.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},n.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},n.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},n.prototype.onStop=function(e){return this._onStopCallback=e,this},n.prototype.update=function(e,t){var i=this,s;if(e===void 0&&(e=Fo()),t===void 0&&(t=n.autoStartOnUpdate),this._isPaused)return!0;var r;if(!this._goToEnd&&!this._isPlaying)if(t)this.start(e,!0);else return!1;if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0);var a=e-this._startTime,o=this._duration+((s=this._repeatDelayTime)!==null&&s!==void 0?s:this._delayTime),l=this._duration+this._repeat*o,c=function(){if(i._duration===0||a>l)return 1;var v=Math.trunc(a/o),m=a-v*o,p=Math.min(m/i._duration,1);return p===0&&a===i._duration?1:p},h=c(),u=this._easingFunction(h);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,u),this._onUpdateCallback&&this._onUpdateCallback(this._object,h),this._duration===0||a>=this._duration)if(this._repeat>0){var d=Math.min(Math.trunc((a-this._duration)/o)+1,this._repeat);isFinite(this._repeat)&&(this._repeat-=d);for(r in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[r]=="string"&&(this._valuesStartRepeat[r]=this._valuesStartRepeat[r]+parseFloat(this._valuesEnd[r])),this._yoyo&&this._swapEndStartRepeatValues(r),this._valuesStart[r]=this._valuesStartRepeat[r];return this._yoyo&&(this._reversed=!this._reversed),this._startTime+=o*d,this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1,!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var f=0,_=this._chainedTweens.length;f<_;f++)this._chainedTweens[f].start(this._startTime+this._duration,!1);return this._isPlaying=!1,!1}return!0},n.prototype._updateProperties=function(e,t,i,s){for(var r in i)if(t[r]!==void 0){var a=t[r]||0,o=i[r],l=Array.isArray(e[r]),c=Array.isArray(o),h=!l&&c;h?e[r]=this._interpolationFunction(o,s):typeof o=="object"&&o?this._updateProperties(e[r],a,o,s):(o=this._handleRelativeValue(a,o),typeof o=="number"&&(e[r]=a+(o-a)*s))}},n.prototype._handleRelativeValue=function(e,t){return typeof t!="string"?t:t.charAt(0)==="+"||t.charAt(0)==="-"?e+parseFloat(t):parseFloat(t)},n.prototype._swapEndStartRepeatValues=function(e){var t=this._valuesStartRepeat[e],i=this._valuesEnd[e];typeof i=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(i):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=t},n.autoStartOnUpdate=!1,n}();e0.nextId;var Ms=id;Ms.getAll.bind(Ms);Ms.removeAll.bind(Ms);Ms.add.bind(Ms);Ms.remove.bind(Ms);var ia=Ms.update.bind(Ms);let sd,hi,ps,_r,ss,tu,um=new ue;const js={enabled:!0,size:25,focus:0,samples:10,animate:!1},t0=new wt;new tr;new co;const n0=new Vn,i0=new Wn;let Li;i0.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");n0.setDRACOLoader(i0);new Fn;let dm,Zt;async function qT(n){tu=n,dm=tu.addFolder("Scene"),sd=new gn,app.appendChild(sd.dom),hi=new Gn({antialias:!0}),hi.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),hi.setSize(window.innerWidth,window.innerHeight),hi.shadowMap.enabled=!0,hi.outputColorSpace=je,hi.toneMapping=Ji,app.appendChild(hi.domElement),ps=new yt(50,window.innerWidth/window.innerHeight,.1,200),ps.position.set(6,3,6),ps.name="Camera",ps.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),_r=new cn,_r.add(t0),ss=new Xn(ps,hi.domElement),ss.enableDamping=!0,ss.dampingFactor=.05,ss.minDistance=.1,ss.maxDistance=100,ss.maxPolarAngle=Math.PI/1.5,ss.target.set(0,0,0),ss.target.set(0,0,0),Li=new ti(ps,hi.domElement),Li.addEventListener("dragging-changed",s=>{ss.enabled=!s.value,s.value}),Li.addEventListener("change",()=>{Li.object&&Li.object.position.y<0&&(Li.object.position.y=0)}),_r.add(Li.getHelper()),window.addEventListener("resize",JT),document.addEventListener("pointermove",fm);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",s=>{Date.now()-e<200&&fm(s)}),dm.add(Li,"mode",["translate","rotate","scale"]),Zt=new na(16777195,5),Zt.name="Dir. Light",Zt.castShadow=!0,Zt.shadow.camera.near=.01,Zt.shadow.camera.far=100;const t=4;Zt.shadow.camera.right=t,Zt.shadow.camera.left=-t,Zt.shadow.camera.top=t,Zt.shadow.camera.bottom=-t,Zt.shadow.mapSize.width=2048,Zt.shadow.mapSize.height=2048,Zt.shadow.bias=-.001,Zt.position.set(2,2,-3),_r.add(Zt),Li.attach(Zt);const i=new nf;_r.add(i),s0(),KT(tu),await e1(),r0()}function KT(n){const e=n.addFolder("PCSS");e.open(),e.onChange(()=>{s0()}),e.add(js,"enabled"),e.add(js,"size",1,100,1),e.add(js,"focus",0,2),e.add(js,"samples",1,20,1);const t=n.addFolder("Defaults");t.open(),t.addColor(Zt,"color"),t.add(Zt,"intensity",0,10);let i;t.add(js,"animate").name("Animate 💡").onChange(s=>{i||(i=new vi(Zt.position).to({x:xt.randFloatSpread(5),y:xt.randFloat(.1,5)}).duration(3e3).repeat(1/0).repeatDelay(1e3).easing(yn.Quadratic.InOut).onStart(()=>{i._valuesStart={x:Zt.position.x,y:Zt.position.y},i.to({x:xt.randFloatSpread(5),y:xt.randFloat(.1,5)})}).onRepeat(()=>{i._onStartCallback()})),s?(Li.detach(),i.start()):(Li.attach(Zt),i.stop())})}let cc=null;async function s0(){cc&&(cc(hi,_r,ps),cc=null),js.enabled&&(cc=PE({size:js.size,focus:js.focus,samples:js.samples}),_r.traverse(n=>{n.material&&n.material.dispose()}))}function JT(){ps.aspect=window.innerWidth/window.innerHeight,ps.updateProjectionMatrix(),hi.setSize(window.innerWidth,window.innerHeight)}function QT(){sd.update(),ia(),ss.update(),hi.render(_r,ps)}function r0(){requestAnimationFrame(r0),QT()}function fm(n){um.x=n.clientX/window.innerWidth*2-1,um.y=-(n.clientY/window.innerHeight)*2+1}async function e1(){const e=(await n0.loadAsync(mn.room.url)).scene;e.name="room",e.traverse(t=>{t.isMesh&&(t.castShadow=!0,t.receiveShadow=!0,t.selectOnRaycast=e,t?.material.name==="lampshade"&&(t.castShadow=!1,t.receiveShadow=!1))}),t0.add(e)}new ye;let rd,pn,xi,Tn,rs,ad,Di,od=new ue;const Co={environment:Nn.kloppenheim,groundProjection:!1,bgColor:new ye,printCam:()=>{}},$r=new wt,t1=new co,n1=new ho,i1=new Vn,a0=new Wn;let Ns;a0.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");i1.setDRACOLoader(a0);const pm=new Fn,nu=[];let o0=()=>{},Gc;async function s1(n){ad=n,Gc=ad.addFolder("Scene"),rd=new gn,app.appendChild(rd.dom),pn=new Gn({antialias:!0}),pn.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),pn.setSize(window.innerWidth,window.innerHeight),pn.shadowMap.enabled=!0,pn.shadowMap.type=sn,pn.outputColorSpace=je,pn.toneMapping=Ji,app.appendChild(pn.domElement),xi=new yt(50,window.innerWidth/window.innerHeight,.1,200),xi.position.set(-16,16,16),xi.name="Camera",Tn=new cn,Tn.add($r),rs=new Xn(xi,pn.domElement),rs.enableDamping=!0,rs.dampingFactor=.05,rs.minDistance=.1,rs.maxDistance=100,rs.maxPolarAngle=Math.PI/1.5,rs.target.set(0,0,0),rs.target.set(0,0,0),Ns=new ti(xi,pn.domElement),Ns.addEventListener("dragging-changed",t=>{rs.enabled=!t.value,t.value}),Ns.addEventListener("change",()=>{Ns.object&&Ns.object.position.y<0&&(Ns.object.position.y=0)}),Tn.add(Ns.getHelper()),window.addEventListener("resize",a1),document.addEventListener("pointermove",mm);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",t=>{Date.now()-e<200&&(mm(t),l1())}),Gc.add(Ns,"mode",["translate","rotate","scale"]),r1(),await c1(),l0()}async function r1(){function n(t){if(!t){Tn.background=null,Tn.environment=null;return}t.exr&&t1.load(t.exr,i=>{i.mapping=an,Tn.environment=i}),t.hdr&&n1.load(t.hdr,i=>{i.mapping=an,Tn.environment=i})}function e(t){Co.groundProjection&&Tn.background&&t.groundProj?(Di||(Di=new th(Tn.background),Di.scale.setScalar(100)),Di.material.uniforms.map.value=Tn.background,Di.radius=t.groundProj.radius,Di.height=t.groundProj.height,Di.parent||Tn.add(Di)):Di&&Di.parent&&Di.removeFromParent()}n(Co.environment),Gc.add(Co,"environment",Nn).onChange(t=>{n(t)}),Gc.add(Co,"groundProjection").onChange(t=>{e(Co.environment)})}function a1(){xi.aspect=window.innerWidth/window.innerHeight,xi.updateProjectionMatrix(),pn.setSize(window.innerWidth,window.innerHeight)}function o1(){rd.update(),ia(),o0(),rs.update(),pn.render(Tn,xi)}function l0(){requestAnimationFrame(l0),o1()}function l1(){pm.setFromCamera(od,xi),pm.intersectObject($r,!0,nu),nu.length&&(nu.length=0)}function mm(n){od.x=n.clientX/window.innerWidth*2-1,od.y=-(n.clientY/window.innerHeight)*2+1}async function c1(){const n=new he(new Ki(.5).translate(0,.5,0),new Wt({color:hc(),roughness:0,metalness:1}));n.name="sphere",n.castShadow=!0,n.receiveShadow=!0,n.position.set(2,0,-1.5),$r.add(n);const e=new he(new Lt(1,1,1).translate(0,.5,0),new Wt({color:hc(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),$r.add(e);const t=new he(new Hn(10,10).rotateX(-Math.PI/2),new Wt({color:hc(),roughness:.5,metalness:0}));t.name="floor",t.receiveShadow=!0,$r.add(t);const i=new ml,r=(await uo(mn.porsche_1975.url,{loadingHelper:i})).scene;r.name="car",r.traverse(a=>{a.isMesh&&(a.castShadow=!0,a.receiveShadow=!0,a.selectOnRaycast=r)}),$r.add(r);for(let a=0;a<30;a++){const o=new he(new Ki(.3),new Wt({color:hc(),roughness:0,metalness:0}));o.name="sphere",o.castShadow=!0,o.receiveShadow=!0,o.position.set(xt.randFloatSpread(10),xt.randFloat(0,5),xt.randFloatSpread(10)),$r.add(o)}h1()}function h1(){Tn.add(new nf(16777215,.5));const n=new ue;let e=1,t,i,s=16777215,r=20,a=.15*4,o=5;const l=new xr;l.intensity=3,l.position.set(5,5,5),l.angle=a,l.color.set(s),l.distance=r,l.castShadow=!0,l.shadow.bias=-1e-4;const c=new Ho(l);Tn.add(l);const h=new zc,u=new yi({transparent:!0,opacity:.25}),d={volumeMaterial:h,basicMaterial:u};let f,_=()=>{};function v(){if(p.useDepth){const C=d1({size:p.depthResolution});let M=f;f=C[0],h.depth=C[0],_=C[1],pn.getSize(n),n.multiplyScalar(pn.getPixelRatio()),h.resolution.copy(n),M&&M.dispose()}else h.depth=null,h.resolution.set(0,0)}h.spotPosition=l.position,h.opacity=e,h.lightColor=l.color,h.attenuation=l.distance,h.anglePower=o,h.cameraNear=xi.near,h.cameraFar=xi.far,t=t===void 0?.1:t,i=i===void 0?l.angle*7:i,console.log({volumeMaterial:h});const m=()=>{h.attenuation=l.distance,r=l.distance,i=Math.tan(l.angle)*l.distance,w.geometry=y(r,t,i)},p={materialType:d.volumeMaterial,helper:!1,useDepth:!1,depthResolution:256,updateVolumeGeometry:m,animateTarget:!1,animateLight:!1},y=(C,M,E)=>{const L=new fn(M,E,C,128,64,!0);return L.translate(0,-C/2,0),L.rotateX(-Math.PI/2),L},w=new he(y(r,t,i),h);m(),l.add(w);const S=new D;o0=()=>{w.lookAt(l.target.getWorldPosition(S)),c.parent&&c.update(),p.useDepth&&(h.depth=null,_(),h.depth=f)},window.onresize=()=>{pn.getSize(n),n.multiplyScalar(pn.getPixelRatio()),p.useDepth&&h.resolution.copy(n),console.log(h.resolution)};function A(C){const M=C.addFolder("SpotLight Volume");M.open(),M.add(p,"materialType",d).onChange(L=>{w.material=L}),M.add(p,"useDepth").onChange(v),M.add(p,"depthResolution",128,2048,128).onChange(v),M.add(h,"opacity",0,2),M.add(h,"attenuation",0,r),M.add(h,"anglePower",0,Math.PI),M.add(h,"cameraNear",0,10),M.add(h,"cameraFar",0,10),M.add(h.resolution,"x",0,1e3,1).listen(),M.add(h.resolution,"y",0,1e3,1).listen();const E=C.addFolder("SpotLight");E.open(),E.add(p,"helper").onChange(L=>{L?Tn.add(c):c.removeFromParent()}),E.addColor(l,"color"),E.add(l,"intensity",0,500),E.add(l,"angle",0,Math.PI/2).onChange(m),E.add(l,"penumbra",0,1),E.add(l,"distance",.1,20).onChange(m),E.add(l.shadow,"bias",-1e-4,1e-4),E.add(p,"animateTarget").name("🚲Animate target").onChange(L=>{L?I.start():I.stop()}),E.add(p,"animateLight").name("🚲Animate light").onChange(L=>{L?P.start():P.stop()})}Ns.attach(l),A(ad);const I=gm(l.target.position,20,2e3,1e3),P=gm(l.position,20,2e3,1e3)}const u1=new ye;function hc(){return"#"+u1.setHSL(Math.random(),.5,.5).getHexString()}let Fr;function d1({size:n,frames:e=1/0}={}){const t=pn,i=new D;t.getSize(i);const s=n||i.x,r=n||i.y;console.log("depth tex res",s,r);const a=new ta(s,r);a.format=Sr,a.type=wr,a.name="Depth_Buffer";let o=0;Fr?Fr.depthTexture.dispose():Fr=f1(s,r),Fr.depthTexture=a,Fr.setSize(s,r);const l=()=>{(e===1/0||o<e)&&(t.setRenderTarget(Fr),t.render(Tn,xi),t.setRenderTarget(null),o++)};return[Fr.depthTexture,l]}function gm(n,e,t,i){const s=new vi(n).to({x:xt.randFloatSpread(e),z:xt.randFloatSpread(e)},t).easing(yn.Bounce.Out).repeat(1e4).repeatDelay(i).onStart(()=>{r()}).onRepeat(()=>{r(),s._valuesEnd.x=xt.randFloatSpread(6),s._valuesEnd.z=xt.randFloatSpread(6)}),r=()=>{s._valuesStart.x=n.x,s._valuesStart.z=n.z};return s}function f1(n,e,t={}){const i=pn,s=n,r=e,a=t,{samples:o=0,depth:l,...c}=a;let h;return h=new St(s,r,{minFilter:nt,magFilter:nt,colorSpace:i.outputColorSpace,type:Gt,...c}),h.samples=o,h}/**
 * postprocessing v6.37.7 build Mon Aug 04 2025
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2025 Raoul van Rüschen
 * @license Zlib
 */var iu=1/1e3,p1=1e3,m1=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(n){typeof document<"u"&&document.hidden!==void 0&&(n?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=n)}get delta(){return this._delta*iu}get fixedDelta(){return this._fixedDelta*iu}set fixedDelta(n){this._fixedDelta=n*p1}get elapsed(){return this._elapsed*iu}update(n){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(n!==void 0?n:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(n){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},g1=(()=>{const n=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]),t=new Tt;return t.setAttribute("position",new Xt(n,3)),t.setAttribute("uv",new Xt(e,2)),t})(),ni=class ld{static get fullscreenGeometry(){return g1}constructor(e="Pass",t=new cn,i=new hl){this.name=e,this.renderer=null,this.scene=t,this.camera=i,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){const t=this.fullscreenMaterial;t!==null&&(t.needsUpdate=!0),this.rtt=!e}}set mainScene(e){}set mainCamera(e){}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(e){let t=this.screen;t!==null?t.material=e:(t=new he(ld.fullscreenGeometry,e),t.frustumCulled=!1,this.scene===null&&(this.scene=new cn),this.scene.add(t),this.screen=t)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,t=Mr){}render(e,t,i,s,r){throw new Error("Render method not implemented!")}setSize(e,t){}initialize(e,t,i){}dispose(){for(const e of Object.keys(this)){const t=this[e];(t instanceof St||t instanceof Rn||t instanceof Kt||t instanceof ld)&&this[e].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},_1=class extends ni{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(n,e,t,i,s){const r=n.state.buffers.stencil;r.setLocked(!1),r.setTest(!1)}},v1=`#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;
#include <colorspace_fragment>
#include <dithering_fragment>
}`,cf="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",c0=class extends ln{constructor(){super({name:"CopyMaterial",uniforms:{inputBuffer:new tt(null),opacity:new tt(1)},blending:An,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:v1,vertexShader:cf})}set inputBuffer(n){this.uniforms.inputBuffer.value=n}setInputBuffer(n){this.uniforms.inputBuffer.value=n}getOpacity(n){return this.uniforms.opacity.value}setOpacity(n){this.uniforms.opacity.value=n}},x1=class extends ni{constructor(n,e=!0){super("CopyPass"),this.fullscreenMaterial=new c0,this.needsSwap=!1,this.renderTarget=n,n===void 0&&(this.renderTarget=new St(1,1,{minFilter:nt,magFilter:nt,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=e}get resize(){return this.autoResize}set resize(n){this.autoResize=n}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(n){this.autoResize=n}render(n,e,t,i,s){this.fullscreenMaterial.inputBuffer=e.texture,n.setRenderTarget(this.renderToScreen?null:this.renderTarget),n.render(this.scene,this.camera)}setSize(n,e){this.autoResize&&this.renderTarget.setSize(n,e)}initialize(n,e,t){t!==void 0&&(this.renderTarget.texture.type=t,t!==on?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":n!==null&&n.outputColorSpace===je&&(this.renderTarget.texture.colorSpace=je))}},_m=new ye,hf=class extends ni{constructor(n=!0,e=!0,t=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=n,this.depth=e,this.stencil=t,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(n,e,t){this.color=n,this.depth=e,this.stencil=t}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(n){this.overrideClearColor=n}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(n){this.overrideClearAlpha=n}render(n,e,t,i,s){const r=this.overrideClearColor,a=this.overrideClearAlpha,o=n.getClearAlpha(),l=r!==null,c=a>=0;l?(n.getClearColor(_m),n.setClearColor(r,c?a:o)):c&&n.setClearAlpha(a),n.setRenderTarget(this.renderToScreen?null:e),n.clear(this.color,this.depth,this.stencil),l?n.setClearColor(_m,o):c&&n.setClearAlpha(o)}},y1=class extends ni{constructor(n,e){super("MaskPass",n,e),this.needsSwap=!1,this.clearPass=new hf(!1,!1,!0),this.inverse=!1}set mainScene(n){this.scene=n}set mainCamera(n){this.camera=n}get inverted(){return this.inverse}set inverted(n){this.inverse=n}get clear(){return this.clearPass.enabled}set clear(n){this.clearPass.enabled=n}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(n){this.inverted=n}render(n,e,t,i,s){const r=n.getContext(),a=n.state.buffers,o=this.scene,l=this.camera,c=this.clearPass,h=this.inverted?0:1,u=1-h;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),a.stencil.setFunc(r.ALWAYS,h,4294967295),a.stencil.setClear(u),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(n,null):(c.render(n,e),c.render(n,t))),this.renderToScreen?(n.setRenderTarget(null),n.render(o,l)):(n.setRenderTarget(e),n.render(o,l),n.setRenderTarget(t),n.render(o,l)),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(r.EQUAL,1,4294967295),a.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),a.stencil.setLocked(!0)}},h0=class{constructor(n=null,{depthBuffer:e=!0,stencilBuffer:t=!1,multisampling:i=0,frameBufferType:s}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,t,s,i),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new x1,this.depthTexture=null,this.passes=[],this.timer=new m1,this.autoRenderToScreen=!0,this.setRenderer(n)}get multisampling(){return this.inputBuffer.samples||0}set multisampling(n){const e=this.inputBuffer,t=this.multisampling;t>0&&n>0?(this.inputBuffer.samples=n,this.outputBuffer.samples=n,this.inputBuffer.dispose(),this.outputBuffer.dispose()):t!==n&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(e.depthBuffer,e.stencilBuffer,e.texture.type,n),this.inputBuffer.depthTexture=this.depthTexture,this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(n){if(this.renderer=n,n!==null){const e=n.getSize(new ue),t=n.getContext().getContextAttributes().alpha,i=this.inputBuffer.texture.type;i===on&&n.outputColorSpace===je&&(this.inputBuffer.texture.colorSpace=je,this.outputBuffer.texture.colorSpace=je,this.inputBuffer.dispose(),this.outputBuffer.dispose()),n.autoClear=!1,this.setSize(e.width,e.height);for(const s of this.passes)s.initialize(n,t,i)}}replaceRenderer(n,e=!0){const t=this.renderer,i=t.domElement.parentNode;return this.setRenderer(n),e&&i!==null&&(i.removeChild(t.domElement),i.appendChild(n.domElement)),t}createDepthTexture(){const n=this.depthTexture=new ta;return this.inputBuffer.depthTexture=n,this.inputBuffer.dispose(),this.inputBuffer.stencilBuffer?(n.format=qa,n.type=Za):n.type=er,n}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.inputBuffer.depthTexture=null,this.inputBuffer.dispose();for(const n of this.passes)n.setDepthTexture(null)}}createBuffer(n,e,t,i){const s=this.renderer,r=s===null?new ue:s.getDrawingBufferSize(new ue),a={minFilter:nt,magFilter:nt,stencilBuffer:e,depthBuffer:n,type:t},o=new St(r.width,r.height,a);return i>0&&(o.ignoreDepthForMultisampleCopy=!1,o.samples=i),t===on&&s!==null&&s.outputColorSpace===je&&(o.texture.colorSpace=je),o.texture.name="EffectComposer.Buffer",o.texture.generateMipmaps=!1,o}setMainScene(n){for(const e of this.passes)e.mainScene=n}setMainCamera(n){for(const e of this.passes)e.mainCamera=n}addPass(n,e){const t=this.passes,i=this.renderer,s=i.getDrawingBufferSize(new ue),r=i.getContext().getContextAttributes().alpha,a=this.inputBuffer.texture.type;if(n.setRenderer(i),n.setSize(s.width,s.height),n.initialize(i,r,a),this.autoRenderToScreen&&(t.length>0&&(t[t.length-1].renderToScreen=!1),n.renderToScreen&&(this.autoRenderToScreen=!1)),e!==void 0?t.splice(e,0,n):t.push(n),this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!0),n.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){const o=this.createDepthTexture();for(n of t)n.setDepthTexture(o)}else n.setDepthTexture(this.depthTexture)}removePass(n){const e=this.passes,t=e.indexOf(n);if(t!==-1&&e.splice(t,1).length>0){if(this.depthTexture!==null){const r=(o,l)=>o||l.needsDepthTexture;e.reduce(r,!1)||(n.getDepthTexture()===this.depthTexture&&n.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&t===e.length&&(n.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){const n=this.passes;this.deleteDepthTexture(),n.length>0&&(this.autoRenderToScreen&&(n[n.length-1].renderToScreen=!1),this.passes=[])}render(n){const e=this.renderer,t=this.copyPass;let i=this.inputBuffer,s=this.outputBuffer,r=!1,a,o,l;n===void 0&&(this.timer.update(),n=this.timer.getDelta());for(const c of this.passes)c.enabled&&(c.render(e,i,s,n,r),c.needsSwap&&(r&&(t.renderToScreen=c.renderToScreen,a=e.getContext(),o=e.state.buffers.stencil,o.setFunc(a.NOTEQUAL,1,4294967295),t.render(e,i,s,n,r),o.setFunc(a.EQUAL,1,4294967295)),l=i,i=s,s=l),c instanceof y1?r=!0:c instanceof _1&&(r=!1))}setSize(n,e,t){const i=this.renderer,s=i.getSize(new ue);(n===void 0||e===void 0)&&(n=s.width,e=s.height),(s.width!==n||s.height!==e)&&i.setSize(n,e,t);const r=i.getDrawingBufferSize(new ue);this.inputBuffer.setSize(r.width,r.height),this.outputBuffer.setSize(r.width,r.height);for(const a of this.passes)a.setSize(r.width,r.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(const n of this.passes)n.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose(),ni.fullscreenGeometry.dispose()}},yr={NONE:0,DEPTH:1,CONVOLUTION:2},vt={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},w1=class{constructor(){this.shaderParts=new Map([[vt.FRAGMENT_HEAD,null],[vt.FRAGMENT_MAIN_UV,null],[vt.FRAGMENT_MAIN_IMAGE,null],[vt.VERTEX_HEAD,null],[vt.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=yr.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=Ut}},su=!1,vm=class{constructor(n=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(n),this.meshCount=0,this.replaceMaterial=e=>{if(e.isMesh){let t;if(e.material.flatShading)switch(e.material.side){case xn:t=this.materialsFlatShadedDoubleSide;break;case jt:t=this.materialsFlatShadedBackSide;break;default:t=this.materialsFlatShaded;break}else switch(e.material.side){case xn:t=this.materialsDoubleSide;break;case jt:t=this.materialsBackSide;break;default:t=this.materials;break}this.originalMaterials.set(e,e.material),e.isSkinnedMesh?e.material=t[2]:e.isInstancedMesh?e.material=t[1]:e.material=t[0],++this.meshCount}}}cloneMaterial(n){if(!(n instanceof ln))return n.clone();const e=n.uniforms,t=new Map;for(const s in e){const r=e[s].value;r.isRenderTargetTexture&&(e[s].value=null,t.set(s,r))}const i=n.clone();for(const s of t)e[s[0]].value=s[1],i.uniforms[s[0]].value=s[1];return i}setMaterial(n){if(this.disposeMaterials(),this.material=n,n!==null){const e=this.materials=[this.cloneMaterial(n),this.cloneMaterial(n),this.cloneMaterial(n)];for(const t of e)t.uniforms=Object.assign({},n.uniforms),t.side=qi;e[2].skinning=!0,this.materialsBackSide=e.map(t=>{const i=this.cloneMaterial(t);return i.uniforms=Object.assign({},n.uniforms),i.side=jt,i}),this.materialsDoubleSide=e.map(t=>{const i=this.cloneMaterial(t);return i.uniforms=Object.assign({},n.uniforms),i.side=xn,i}),this.materialsFlatShaded=e.map(t=>{const i=this.cloneMaterial(t);return i.uniforms=Object.assign({},n.uniforms),i.flatShading=!0,i}),this.materialsFlatShadedBackSide=e.map(t=>{const i=this.cloneMaterial(t);return i.uniforms=Object.assign({},n.uniforms),i.flatShading=!0,i.side=jt,i}),this.materialsFlatShadedDoubleSide=e.map(t=>{const i=this.cloneMaterial(t);return i.uniforms=Object.assign({},n.uniforms),i.flatShading=!0,i.side=xn,i})}}render(n,e,t){const i=n.shadowMap.enabled;if(n.shadowMap.enabled=!1,su){const s=this.originalMaterials;this.meshCount=0,e.traverse(this.replaceMaterial),n.render(e,t);for(const r of s)r[0].material=r[1];this.meshCount!==s.size&&s.clear()}else{const s=e.overrideMaterial;e.overrideMaterial=this.material,n.render(e,t),e.overrideMaterial=s}n.shadowMap.enabled=i}disposeMaterials(){if(this.material!==null){const n=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(const e of n)e.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return su}static set workaroundEnabled(n){su=n}},dr=-1,ei=class extends bs{constructor(n,e=dr,t=dr,i=1){super(),this.resizable=n,this.baseSize=new ue(1,1),this.preferredSize=new ue(e,t),this.target=this.preferredSize,this.s=i,this.effectiveSize=new ue,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){const n=this.baseSize,e=this.preferredSize,t=this.effectiveSize,i=this.scale;e.width!==dr?t.width=e.width:e.height!==dr?t.width=Math.round(e.height*(n.width/Math.max(n.height,1))):t.width=Math.round(n.width*i),e.height!==dr?t.height=e.height:e.width!==dr?t.height=Math.round(e.width/Math.max(n.width/Math.max(n.height,1),1)):t.height=Math.round(n.height*i)}get width(){return this.effectiveSize.width}set width(n){this.preferredWidth=n}get height(){return this.effectiveSize.height}set height(n){this.preferredHeight=n}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(n){this.s!==n&&(this.s=n,this.preferredSize.setScalar(dr),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getScale(){return this.scale}setScale(n){this.scale=n}get baseWidth(){return this.baseSize.width}set baseWidth(n){this.baseSize.width!==n&&(this.baseSize.width=n,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseWidth(){return this.baseWidth}setBaseWidth(n){this.baseWidth=n}get baseHeight(){return this.baseSize.height}set baseHeight(n){this.baseSize.height!==n&&(this.baseSize.height=n,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseHeight(){return this.baseHeight}setBaseHeight(n){this.baseHeight=n}setBaseSize(n,e){(this.baseSize.width!==n||this.baseSize.height!==e)&&(this.baseSize.set(n,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(n){this.preferredSize.width!==n&&(this.preferredSize.width=n,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(n){this.preferredWidth=n}get preferredHeight(){return this.preferredSize.height}set preferredHeight(n){this.preferredSize.height!==n&&(this.preferredSize.height=n,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(n){this.preferredHeight=n}setPreferredSize(n,e){(this.preferredSize.width!==n||this.preferredSize.height!==e)&&(this.preferredSize.set(n,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}copy(n){this.s=n.scale,this.baseSize.set(n.baseWidth,n.baseHeight),this.preferredSize.set(n.preferredWidth,n.preferredHeight),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height)}static get AUTO_SIZE(){return dr}},S1=class{constructor(n=0){this.nextId=n}getNextId(){return this.nextId++}reset(n=0){return this.nextId=n,this}},ru=new S1(2),M1=class extends Set{constructor(n,e=ru.getNextId()){super(),this.exclusive=!1,this._layer=e,(this._layer<1||this._layer>31)&&(console.warn("Layer out of range, resetting to 2"),ru.reset(2),this._layer=ru.getNextId()),n!==void 0&&this.set(n)}get layer(){return this._layer}set layer(n){const e=this._layer;for(const t of this)t.layers.disable(e),t.layers.enable(n);this._layer=n}getLayer(){return this.layer}setLayer(n){this.layer=n}isExclusive(){return this.exclusive}setExclusive(n){this.exclusive=n}clear(){const n=this.layer;for(const e of this)e.layers.disable(n);return super.clear()}set(n){this.clear();for(const e of n)this.add(e);return this}indexOf(n){return this.has(n)?0:-1}add(n){return this.exclusive?n.layers.set(this.layer):n.layers.enable(this.layer),super.add(n)}delete(n){return this.has(n)&&n.layers.disable(this.layer),super.delete(n)}toggle(n){let e;return this.has(n)?(this.delete(n),e=!1):(this.add(n),e=!0),e}setVisible(n){for(const e of this)n?e.layers.enable(0):e.layers.disable(0);return this}},ft={ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},b1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb+y.rgb,y.a),opacity);}",E1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,y.a*opacity);}",T1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4((x.rgb+y.rgb)*0.5,y.a),opacity);}",A1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.xy,xHSL.z));return mix(x,vec4(z,y.a),opacity);}",R1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=x.rgb,b=y.rgb;vec3 z=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/b)),vec3(1.0),step(1.0,a));return mix(x,vec4(z,y.a),opacity);}",C1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=x.rgb,b=y.rgb;vec3 z=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(x,vec4(z,y.a),opacity);}",P1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(min(x.rgb,y.rgb),y.a),opacity);}",D1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(abs(x.rgb-y.rgb),y.a),opacity);}",I1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb/max(y.rgb,1e-12),y.a),opacity);}",L1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4((x.rgb+y.rgb-2.0*x.rgb*y.rgb),y.a),opacity);}",U1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=min(x.rgb,1.0);vec3 b=min(y.rgb,1.0);vec3 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(x,vec4(z,y.a),opacity);}",N1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(step(1.0,x.rgb+y.rgb),y.a),opacity);}",F1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.x,xHSL.yz));return mix(x,vec4(z,y.a),opacity);}",O1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(1.0-y.rgb,y.a),opacity);}",B1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(y.rgb*(1.0-x.rgb),y.a),opacity);}",k1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(max(x.rgb,y.rgb),y.a),opacity);}",z1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(clamp(y.rgb+x.rgb-1.0,0.0,1.0),y.a),opacity);}",H1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(min(x.rgb+y.rgb,1.0),y.a),opacity);}",G1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(clamp(2.0*y.rgb+x.rgb-1.0,0.0,1.0),y.a),opacity);}",V1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.xy,yHSL.z));return mix(x,vec4(z,y.a),opacity);}",W1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb*y.rgb,y.a),opacity);}",X1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(1.0-abs(1.0-x.rgb-y.rgb),y.a),opacity);}",$1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,opacity);}",j1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 z=mix(2.0*y.rgb*x.rgb,1.0-2.0*(1.0-y.rgb)*(1.0-x.rgb),step(0.5,x.rgb));return mix(x,vec4(z,y.a),opacity);}",Y1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 y2=2.0*y.rgb;vec3 z=mix(mix(y2,x.rgb,step(0.5*x.rgb,y.rgb)),max(y2-1.0,vec3(0.0)),step(x.rgb,y2-1.0));return mix(x,vec4(z,y.a),opacity);}",Z1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 z=mix(min(x.rgb*x.rgb/max(1.0-y.rgb,1e-12),1.0),y.rgb,step(1.0,y.rgb));return mix(x,vec4(z,y.a),opacity);}",q1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.x,yHSL.y,xHSL.z));return mix(x,vec4(z,y.a),opacity);}",K1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb+y.rgb-min(x.rgb*y.rgb,1.0),y.a),opacity);}",J1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=x.rgb;vec3 b=y.rgb;vec3 y2=2.0*b;vec3 w=step(0.5,b);vec3 c=a-(1.0-y2)*a*(1.0-a);vec3 d=mix(a+(y2-1.0)*(sqrt(a)-a),a+(y2-1.0)*a*((16.0*a-12.0)*a+3.0),w*(1.0-step(0.25,a)));vec3 z=mix(c,d,w);return mix(x,vec4(z,y.a),opacity);}",Q1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}",eA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(max(x.rgb+y.rgb-1.0,0.0),y.a),opacity);}",tA="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 z=mix(max(1.0-min((1.0-x.rgb)/(2.0*y.rgb),1.0),0.0),min(x.rgb/(2.0*(1.0-y.rgb)),1.0),step(0.5,y.rgb));return mix(x,vec4(z,y.a),opacity);}",nA=new Map([[ft.ADD,b1],[ft.ALPHA,E1],[ft.AVERAGE,T1],[ft.COLOR,A1],[ft.COLOR_BURN,R1],[ft.COLOR_DODGE,C1],[ft.DARKEN,P1],[ft.DIFFERENCE,D1],[ft.DIVIDE,I1],[ft.DST,null],[ft.EXCLUSION,L1],[ft.HARD_LIGHT,U1],[ft.HARD_MIX,N1],[ft.HUE,F1],[ft.INVERT,O1],[ft.INVERT_RGB,B1],[ft.LIGHTEN,k1],[ft.LINEAR_BURN,z1],[ft.LINEAR_DODGE,H1],[ft.LINEAR_LIGHT,G1],[ft.LUMINOSITY,V1],[ft.MULTIPLY,W1],[ft.NEGATION,X1],[ft.NORMAL,$1],[ft.OVERLAY,j1],[ft.PIN_LIGHT,Y1],[ft.REFLECT,Z1],[ft.SATURATION,q1],[ft.SCREEN,K1],[ft.SOFT_LIGHT,J1],[ft.SRC,Q1],[ft.SUBTRACT,eA],[ft.VIVID_LIGHT,tA]]),iA=class extends bs{constructor(n,e=1){super(),this._blendFunction=n,this.opacity=new tt(e)}getOpacity(){return this.opacity.value}setOpacity(n){this.opacity.value=n}get blendFunction(){return this._blendFunction}set blendFunction(n){this._blendFunction=n,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(n){this.blendFunction=n}getShaderCode(){return nA.get(this.blendFunction)}},sA=class extends bs{constructor(n,e,{attributes:t=yr.NONE,blendFunction:i=ft.NORMAL,defines:s=new Map,uniforms:r=new Map,extensions:a=null,vertexShader:o=null}={}){super(),this.name=n,this.renderer=null,this.attributes=t,this.fragmentShader=e,this.vertexShader=o,this.defines=s,this.uniforms=r,this.extensions=a,this.blendMode=new iA(i),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=Ut,this._outputColorSpace=gs}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(n){this._inputColorSpace=n,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n,this.setChanged()}set mainScene(n){}set mainCamera(n){}getName(){return this.name}setRenderer(n){this.renderer=n}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(n){this.attributes=n,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(n){this.fragmentShader=n,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(n){this.vertexShader=n,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(n,e=Mr){}update(n,e,t){}setSize(n,e){}initialize(n,e,t){}dispose(){for(const n of Object.keys(this)){const e=this[n];(e instanceof St||e instanceof Rn||e instanceof Kt||e instanceof ni)&&this[n].dispose()}}},uf={MEDIUM:2,LARGE:3},rA=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,aA="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",oA=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],lA=class extends ln{constructor(n=new pt){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new tt(null),texelSize:new tt(new pt),scale:new tt(1),kernel:new tt(0)},blending:An,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:rA,vertexShader:aA}),this.setTexelSize(n.x,n.y),this.kernelSize=uf.MEDIUM}set inputBuffer(n){this.uniforms.inputBuffer.value=n}setInputBuffer(n){this.inputBuffer=n}get kernelSequence(){return oA[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(n){this.uniforms.scale.value=n}getScale(){return this.uniforms.scale.value}setScale(n){this.uniforms.scale.value=n}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(n){this.uniforms.kernel.value=n}setKernel(n){this.kernel=n}setTexelSize(n,e){this.uniforms.texelSize.value.set(n,e,n*.5,e*.5)}setSize(n,e){const t=1/n,i=1/e;this.uniforms.texelSize.value.set(t,i,t*.5,i*.5)}},cA=class extends ni{constructor({kernelSize:n=uf.MEDIUM,resolutionScale:e=.5,width:t=ei.AUTO_SIZE,height:i=ei.AUTO_SIZE,resolutionX:s=t,resolutionY:r=i}={}){super("KawaseBlurPass"),this.renderTargetA=new St(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";const a=this.resolution=new ei(this,s,r,e);a.addEventListener("change",o=>this.setSize(a.baseWidth,a.baseHeight)),this._blurMaterial=new lA,this._blurMaterial.kernelSize=n,this.copyMaterial=new c0}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(n){this._blurMaterial=n}get dithering(){return this.copyMaterial.dithering}set dithering(n){this.copyMaterial.dithering=n}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(n){this.blurMaterial.kernelSize=n}get width(){return this.resolution.width}set width(n){this.resolution.preferredWidth=n}get height(){return this.resolution.height}set height(n){this.resolution.preferredHeight=n}get scale(){return this.blurMaterial.scale}set scale(n){this.blurMaterial.scale=n}getScale(){return this.blurMaterial.scale}setScale(n){this.blurMaterial.scale=n}getKernelSize(){return this.kernelSize}setKernelSize(n){this.kernelSize=n}getResolutionScale(){return this.resolution.scale}setResolutionScale(n){this.resolution.scale=n}render(n,e,t,i,s){const r=this.scene,a=this.camera,o=this.renderTargetA,l=this.renderTargetB,c=this.blurMaterial,h=c.kernelSequence;let u=e;this.fullscreenMaterial=c;for(let d=0,f=h.length;d<f;++d){const _=(d&1)===0?o:l;c.kernel=h[d],c.inputBuffer=u.texture,n.setRenderTarget(_),n.render(r,a),u=_}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=u.texture,n.setRenderTarget(this.renderToScreen?null:t),n.render(r,a)}setSize(n,e){const t=this.resolution;t.setBaseSize(n,e);const i=t.width,s=t.height;this.renderTargetA.setSize(i,s),this.renderTargetB.setSize(i,s),this.blurMaterial.setSize(n,e)}initialize(n,e,t){t!==void 0&&(this.renderTargetA.texture.type=t,this.renderTargetB.texture.type=t,t!==on?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):n!==null&&n.outputColorSpace===je&&(this.renderTargetA.texture.colorSpace=je,this.renderTargetB.texture.colorSpace=je))}static get AUTO_SIZE(){return ei.AUTO_SIZE}},hA=`#include <common>
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
varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);float mask=1.0;
#ifdef RANGE
float low=step(range.x,l);float high=step(l,range.y);mask=low*high;
#elif defined(THRESHOLD)
mask=smoothstep(threshold,threshold+smoothing,l);
#endif
#ifdef COLOR
gl_FragColor=texel*mask;
#else
gl_FragColor=vec4(l*mask);
#endif
}`,uA=class extends ln{constructor(n=!1,e=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:Mi.replace(/\D+/g,"")},uniforms:{inputBuffer:new tt(null),threshold:new tt(0),smoothing:new tt(1),range:new tt(null)},blending:An,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:hA,vertexShader:cf}),this.colorOutput=n,this.luminanceRange=e}set inputBuffer(n){this.uniforms.inputBuffer.value=n}setInputBuffer(n){this.uniforms.inputBuffer.value=n}get threshold(){return this.uniforms.threshold.value}set threshold(n){this.smoothing>0||n>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=n}getThreshold(){return this.threshold}setThreshold(n){this.threshold=n}get smoothing(){return this.uniforms.smoothing.value}set smoothing(n){this.threshold>0||n>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=n}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(n){this.smoothing=n}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(n){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(n){n?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(n){return this.colorOutput}setColorOutputEnabled(n){this.colorOutput=n}get useRange(){return this.luminanceRange!==null}set useRange(n){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(n){n!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=n,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(n){this.luminanceRange=n}},dA=class extends ni{constructor({renderTarget:n,luminanceRange:e,colorOutput:t,resolutionScale:i=1,width:s=ei.AUTO_SIZE,height:r=ei.AUTO_SIZE,resolutionX:a=s,resolutionY:o=r}={}){super("LuminancePass"),this.fullscreenMaterial=new uA(t,e),this.needsSwap=!1,this.renderTarget=n,this.renderTarget===void 0&&(this.renderTarget=new St(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");const l=this.resolution=new ei(this,a,o,i);l.addEventListener("change",c=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(n,e,t,i,s){const r=this.fullscreenMaterial;r.inputBuffer=e.texture,n.setRenderTarget(this.renderToScreen?null:this.renderTarget),n.render(this.scene,this.camera)}setSize(n,e){const t=this.resolution;t.setBaseSize(n,e),this.renderTarget.setSize(t.width,t.height)}initialize(n,e,t){t!==void 0&&t!==on&&(this.renderTarget.texture.type=t,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},fA=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.0555555
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,pA="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",mA=class extends ln{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new tt(null),texelSize:new tt(new ue)},blending:An,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:fA,vertexShader:pA})}set inputBuffer(n){this.uniforms.inputBuffer.value=n}setSize(n,e){this.uniforms.texelSize.value.set(1/n,1/e)}},gA=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,_A="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",vA=class extends ln{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new tt(null),supportBuffer:new tt(null),texelSize:new tt(new ue),radius:new tt(.85)},blending:An,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:gA,vertexShader:_A})}set inputBuffer(n){this.uniforms.inputBuffer.value=n}set supportBuffer(n){this.uniforms.supportBuffer.value=n}get radius(){return this.uniforms.radius.value}set radius(n){this.uniforms.radius.value=n}setSize(n,e){this.uniforms.texelSize.value.set(1/n,1/e)}},xA=class extends ni{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new St(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new mA,this.upsamplingMaterial=new vA,this.resolution=new ue}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(n){if(this.levels!==n){const e=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let t=0;t<n;++t){const i=e.clone();i.texture.name="Downsampling.Mipmap"+t,this.downsamplingMipmaps.push(i)}this.upsamplingMipmaps.push(e);for(let t=1,i=n-1;t<i;++t){const s=e.clone();s.texture.name="Upsampling.Mipmap"+t,this.upsamplingMipmaps.push(s)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(n){this.upsamplingMaterial.radius=n}render(n,e,t,i,s){const{scene:r,camera:a}=this,{downsamplingMaterial:o,upsamplingMaterial:l}=this,{downsamplingMipmaps:c,upsamplingMipmaps:h}=this;let u=e;this.fullscreenMaterial=o;for(let d=0,f=c.length;d<f;++d){const _=c[d];o.setSize(u.width,u.height),o.inputBuffer=u.texture,n.setRenderTarget(_),n.render(r,a),u=_}this.fullscreenMaterial=l;for(let d=h.length-1;d>=0;--d){const f=h[d];l.setSize(u.width,u.height),l.inputBuffer=u.texture,l.supportBuffer=c[d].texture,n.setRenderTarget(f),n.render(r,a),u=f}}setSize(n,e){const t=this.resolution;t.set(n,e);let i=t.width,s=t.height;for(let r=0,a=this.downsamplingMipmaps.length;r<a;++r)i=Math.round(i*.5),s=Math.round(s*.5),this.downsamplingMipmaps[r].setSize(i,s),r<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[r].setSize(i,s)}initialize(n,e,t){if(t!==void 0){const i=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(const s of i)s.texture.type=t;if(t!==on)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(n!==null&&n.outputColorSpace===je)for(const s of i)s.texture.colorSpace=je}}dispose(){super.dispose();for(const n of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))n.dispose()}},yA=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 texel=texture2D(map,uv);outputColor=vec4(texel.rgb*intensity,max(inputColor.a,texel.a));}`,u0=class extends sA{constructor({blendFunction:n=ft.SCREEN,luminanceThreshold:e=1,luminanceSmoothing:t=.03,mipmapBlur:i=!0,intensity:s=1,radius:r=.85,levels:a=8,kernelSize:o=uf.LARGE,resolutionScale:l=.5,width:c=ei.AUTO_SIZE,height:h=ei.AUTO_SIZE,resolutionX:u=c,resolutionY:d=h}={}){super("BloomEffect",yA,{blendFunction:n,uniforms:new Map([["map",new tt(null)],["intensity",new tt(s)]])}),this.renderTarget=new St(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new cA({kernelSize:o}),this.luminancePass=new dA({colorOutput:!0}),this.luminanceMaterial.threshold=e,this.luminanceMaterial.smoothing=t,this.mipmapBlurPass=new xA,this.mipmapBlurPass.enabled=i,this.mipmapBlurPass.radius=r,this.mipmapBlurPass.levels=a,this.uniforms.get("map").value=i?this.mipmapBlurPass.texture:this.renderTarget.texture;const f=this.resolution=new ei(this,u,d,l);f.addEventListener("change",_=>this.setSize(f.baseWidth,f.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(n){this.resolution.preferredWidth=n}get height(){return this.resolution.height}set height(n){this.resolution.preferredHeight=n}get dithering(){return this.blurPass.dithering}set dithering(n){this.blurPass.dithering=n}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(n){this.blurPass.kernelSize=n}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(n){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(n){this.uniforms.get("intensity").value=n}getIntensity(){return this.intensity}setIntensity(n){this.intensity=n}getResolutionScale(){return this.resolution.scale}setResolutionScale(n){this.resolution.scale=n}update(n,e,t){const i=this.renderTarget,s=this.luminancePass;s.enabled?(s.render(n,e),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(n,s.renderTarget):this.blurPass.render(n,s.renderTarget,i)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(n,e):this.blurPass.render(n,e,i)}setSize(n,e){const t=this.resolution;t.setBaseSize(n,e),this.renderTarget.setSize(t.width,t.height),this.blurPass.resolution.copy(t),this.luminancePass.setSize(n,e),this.mipmapBlurPass.setSize(n,e)}initialize(n,e,t){this.blurPass.initialize(n,e,t),this.luminancePass.initialize(n,e,t),this.mipmapBlurPass.initialize(n,e,t),t!==void 0&&(this.renderTarget.texture.type=t,n!==null&&n.outputColorSpace===je&&(this.renderTarget.texture.colorSpace=je))}},wA=class extends ni{constructor(n,e="inputBuffer"){super("ShaderPass"),this.fullscreenMaterial=n,this.input=e}setInput(n){this.input=n}render(n,e,t,i,s){const r=this.fullscreenMaterial.uniforms;e!==null&&r!==void 0&&r[this.input]!==void 0&&(r[this.input].value=e.texture),n.setRenderTarget(this.renderToScreen?null:t),n.render(this.scene,this.camera)}initialize(n,e,t){t!==void 0&&t!==on&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},Wo={KEEP_MAX_DEPTH:1,DISCARD_MAX_DEPTH:2},SA=`#include <common>
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
#ifdef LOG_DEPTH
float d=pow(2.0,depth.x*log2(cameraNearFar.y+1.0))-1.0;float a=cameraNearFar.y/(cameraNearFar.y-cameraNearFar.x);float b=cameraNearFar.y*cameraNearFar.x/(cameraNearFar.x-cameraNearFar.y);depth.x=a+b/d;
#endif
#endif
#if DEPTH_PACKING_1 == 3201
depth.y=unpackRGBAToDepth(texture2D(depthBuffer1,vUv));
#else
depth.y=texture2D(depthBuffer1,vUv).r;
#ifdef LOG_DEPTH
float d=pow(2.0,depth.y*log2(cameraNearFar.y+1.0))-1.0;float a=cameraNearFar.y/(cameraNearFar.y-cameraNearFar.x);float b=cameraNearFar.y*cameraNearFar.x/(cameraNearFar.x-cameraNearFar.y);depth.y=a+b/d;
#endif
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
if(keep){gl_FragColor=texture2D(inputBuffer,vUv);}else{discard;}}`,MA=class extends ln{constructor(){super({name:"DepthMaskMaterial",defines:{DEPTH_EPSILON:"0.0001",DEPTH_PACKING_0:"0",DEPTH_PACKING_1:"0",DEPTH_TEST_STRATEGY:Wo.KEEP_MAX_DEPTH},uniforms:{inputBuffer:new tt(null),depthBuffer0:new tt(null),depthBuffer1:new tt(null),cameraNearFar:new tt(new ue(1,1))},blending:An,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:SA,vertexShader:cf}),this.depthMode=Qo}set depthBuffer0(n){this.uniforms.depthBuffer0.value=n}set depthPacking0(n){this.defines.DEPTH_PACKING_0=n.toFixed(0),this.needsUpdate=!0}setDepthBuffer0(n,e=Mr){this.depthBuffer0=n,this.depthPacking0=e}set depthBuffer1(n){this.uniforms.depthBuffer1.value=n}set depthPacking1(n){this.defines.DEPTH_PACKING_1=n.toFixed(0),this.needsUpdate=!0}setDepthBuffer1(n,e=Mr){this.depthBuffer1=n,this.depthPacking1=e}get maxDepthStrategy(){return Number(this.defines.DEPTH_TEST_STRATEGY)}set maxDepthStrategy(n){this.defines.DEPTH_TEST_STRATEGY=n.toFixed(0),this.needsUpdate=!0}get keepFar(){return this.maxDepthStrategy}set keepFar(n){this.maxDepthStrategy=n?Wo.KEEP_MAX_DEPTH:Wo.DISCARD_MAX_DEPTH}getMaxDepthStrategy(){return this.maxDepthStrategy}setMaxDepthStrategy(n){this.maxDepthStrategy=n}get epsilon(){return Number(this.defines.DEPTH_EPSILON)}set epsilon(n){this.defines.DEPTH_EPSILON=n.toFixed(16),this.needsUpdate=!0}getEpsilon(){return this.epsilon}setEpsilon(n){this.epsilon=n}get depthMode(){return Number(this.defines.DEPTH_MODE)}set depthMode(n){let e;switch(n){case Dc:e="false";break;case Ic:e="true";break;case $a:e="abs(d1 - d0) <= DEPTH_EPSILON";break;case el:e="abs(d1 - d0) > DEPTH_EPSILON";break;case Qo:e="d0 > d1";break;case Jr:e="d0 >= d1";break;case Lc:e="d0 <= d1";break;case Uc:default:e="d0 < d1";break}this.defines.DEPTH_MODE=n.toFixed(0),this.defines["depthTest(d0, d1)"]=e,this.needsUpdate=!0}getDepthMode(){return this.depthMode}setDepthMode(n){this.depthMode=n}adoptCameraSettings(n){this.copyCameraSettings(n)}copyCameraSettings(n){n&&(this.uniforms.cameraNearFar.value.set(n.near,n.far),n instanceof yt?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}},df=class extends ni{constructor(n,e,t=null){super("RenderPass",n,e),this.needsSwap=!1,this.clearPass=new hf,this.overrideMaterialManager=t===null?null:new vm(t),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(n){this.scene=n}set mainCamera(n){this.camera=n}get renderToScreen(){return super.renderToScreen}set renderToScreen(n){super.renderToScreen=n,this.clearPass.renderToScreen=n}get overrideMaterial(){const n=this.overrideMaterialManager;return n!==null?n.material:null}set overrideMaterial(n){const e=this.overrideMaterialManager;n!==null?e!==null?e.setMaterial(n):this.overrideMaterialManager=new vm(n):e!==null&&(e.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(n){this.overrideMaterial=n}get clear(){return this.clearPass.enabled}set clear(n){this.clearPass.enabled=n}getSelection(){return this.selection}setSelection(n){this.selection=n}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(n){this.ignoreBackground=n}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(n){this.skipShadowMapUpdate=n}getClearPass(){return this.clearPass}render(n,e,t,i,s){const r=this.scene,a=this.camera,o=this.selection,l=a.layers.mask,c=r.background,h=n.shadowMap.autoUpdate,u=this.renderToScreen?null:e;o!==null&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(n.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(r.background=null),this.clearPass.enabled&&this.clearPass.render(n,e),n.setRenderTarget(u),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(n,r,a):n.render(r,a),a.layers.mask=l,r.background=c,n.shadowMap.autoUpdate=h}},bA=class extends ni{constructor(n,e,{renderTarget:t,resolutionScale:i=1,width:s=ei.AUTO_SIZE,height:r=ei.AUTO_SIZE,resolutionX:a=s,resolutionY:o=r}={}){super("DepthPass"),this.needsSwap=!1,this.renderPass=new df(n,e,new Tg({depthPacking:Wd}));const l=this.renderPass;l.skipShadowMapUpdate=!0,l.ignoreBackground=!0;const c=l.clearPass;c.overrideClearColor=new ye(16777215),c.overrideClearAlpha=1,this.renderTarget=t,this.renderTarget===void 0&&(this.renderTarget=new St(1,1,{minFilter:wn,magFilter:wn}),this.renderTarget.texture.name="DepthPass.Target");const h=this.resolution=new ei(this,a,o,i);h.addEventListener("change",u=>this.setSize(h.baseWidth,h.baseHeight))}set mainScene(n){this.renderPass.mainScene=n}set mainCamera(n){this.renderPass.mainCamera=n}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}getResolutionScale(){return this.resolution.scale}setResolutionScale(n){this.resolution.scale=n}render(n,e,t,i,s){const r=this.renderToScreen?null:this.renderTarget;this.renderPass.render(n,r)}setSize(n,e){const t=this.resolution;t.setBaseSize(n,e),this.renderTarget.setSize(t.width,t.height)}},EA=class extends u0{constructor(n,e,t){super(t),this.setAttributes(this.getAttributes()|yr.DEPTH),this.camera=e,this.depthPass=new bA(n,e),this.clearPass=new hf(!0,!1,!1),this.clearPass.overrideClearColor=new ye(0),this.depthMaskPass=new wA(new MA);const i=this.depthMaskMaterial;i.copyCameraSettings(e),i.depthBuffer1=this.depthPass.texture,i.depthPacking1=Wd,i.depthMode=$a,this.renderTargetMasked=new St(1,1,{depthBuffer:!1}),this.renderTargetMasked.texture.name="Bloom.Masked",this.selection=new M1,this._inverted=!1,this._ignoreBackground=!1}set mainScene(n){this.depthPass.mainScene=n}set mainCamera(n){this.camera=n,this.depthPass.mainCamera=n,this.depthMaskMaterial.copyCameraSettings(n)}getSelection(){return this.selection}get depthMaskMaterial(){return this.depthMaskPass.fullscreenMaterial}get inverted(){return this._inverted}set inverted(n){this._inverted=n,this.depthMaskMaterial.depthMode=n?el:$a}isInverted(){return this.inverted}setInverted(n){this.inverted=n}get ignoreBackground(){return this._ignoreBackground}set ignoreBackground(n){this._ignoreBackground=n,this.depthMaskMaterial.maxDepthStrategy=n?Wo.DISCARD_MAX_DEPTH:Wo.KEEP_MAX_DEPTH}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(n){this.ignoreBackground=n}setDepthTexture(n,e=Mr){this.depthMaskMaterial.depthBuffer0=n,this.depthMaskMaterial.depthPacking0=e}update(n,e,t){const i=this.camera,s=this.selection,r=this.inverted;let a=e;if(this.ignoreBackground||!r||s.size>0){const o=i.layers.mask;i.layers.set(s.layer),this.depthPass.render(n),i.layers.mask=o,a=this.renderTargetMasked,this.clearPass.render(n,a),this.depthMaskPass.render(n,e,a)}super.update(n,a,t)}setSize(n,e){super.setSize(n,e),this.renderTargetMasked.setSize(n,e),this.depthPass.setSize(n,e)}initialize(n,e,t){super.initialize(n,e,t),this.clearPass.initialize(n,e,t),this.depthPass.initialize(n,e,t),this.depthMaskPass.initialize(n,e,t),n!==null&&n.capabilities.logarithmicDepthBuffer&&(this.depthMaskPass.fullscreenMaterial.defines.LOG_DEPTH="1"),t!==void 0&&(this.renderTargetMasked.texture.type=t,n!==null&&n.outputColorSpace===je&&(this.renderTargetMasked.texture.colorSpace=je))}},TA=`#include <common>
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
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){
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
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE color0.a=clamp(color0.a,0.0,1.0);gl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
}`,AA="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",RA=class extends ln{constructor(n,e,t,i,s=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:Mi.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new tt(null),depthBuffer:new tt(null),resolution:new tt(new ue),texelSize:new tt(new ue),cameraNear:new tt(.3),cameraFar:new tt(1e3),aspect:new tt(1),time:new tt(0)},blending:An,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:s}),n&&this.setShaderParts(n),e&&this.setDefines(e),t&&this.setUniforms(t),this.copyCameraSettings(i)}set inputBuffer(n){this.uniforms.inputBuffer.value=n}setInputBuffer(n){this.uniforms.inputBuffer.value=n}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(n){this.uniforms.depthBuffer.value=n}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(n){this.defines.DEPTH_PACKING=n.toFixed(0),this.needsUpdate=!0}setDepthBuffer(n,e=Mr){this.depthBuffer=n,this.depthPacking=e}setShaderData(n){this.setShaderParts(n.shaderParts),this.setDefines(n.defines),this.setUniforms(n.uniforms),this.setExtensions(n.extensions)}setShaderParts(n){return this.fragmentShader=TA.replace(vt.FRAGMENT_HEAD,n.get(vt.FRAGMENT_HEAD)||"").replace(vt.FRAGMENT_MAIN_UV,n.get(vt.FRAGMENT_MAIN_UV)||"").replace(vt.FRAGMENT_MAIN_IMAGE,n.get(vt.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=AA.replace(vt.VERTEX_HEAD,n.get(vt.VERTEX_HEAD)||"").replace(vt.VERTEX_MAIN_SUPPORT,n.get(vt.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(n){for(const e of n.entries())this.defines[e[0]]=e[1];return this.needsUpdate=!0,this}setUniforms(n){for(const e of n.entries())this.uniforms[e[0]]=e[1];return this}setExtensions(n){this.extensions={};for(const e of n)this.extensions[e]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(n){this.encodeOutput!==n&&(n?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(n){return this.encodeOutput}setOutputEncodingEnabled(n){this.encodeOutput=n}get time(){return this.uniforms.time.value}set time(n){this.uniforms.time.value=n}setDeltaTime(n){this.uniforms.time.value+=n}adoptCameraSettings(n){this.copyCameraSettings(n)}copyCameraSettings(n){n&&(this.uniforms.cameraNear.value=n.near,this.uniforms.cameraFar.value=n.far,n instanceof yt?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(n,e){const t=this.uniforms;t.resolution.value.set(n,e),t.texelSize.value.set(1/n,1/e),t.aspect.value=n/e}static get Section(){return vt}};function xm(n,e,t){for(const i of e){const s="$1"+n+i.charAt(0).toUpperCase()+i.slice(1),r=new RegExp("([^\\.])(\\b"+i+"\\b)","g");for(const a of t.entries())a[1]!==null&&t.set(a[0],a[1].replace(r,s))}}function CA(n,e,t){let i=e.getFragmentShader(),s=e.getVertexShader();const r=i!==void 0&&/mainImage/.test(i),a=i!==void 0&&/mainUv/.test(i);if(t.attributes|=e.getAttributes(),i===void 0)throw new Error(`Missing fragment shader (${e.name})`);if(a&&(t.attributes&yr.CONVOLUTION)!==0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);if(!r&&!a)throw new Error(`Could not find mainImage or mainUv function (${e.name})`);{const o=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,l=t.shaderParts;let c=l.get(vt.FRAGMENT_HEAD)||"",h=l.get(vt.FRAGMENT_MAIN_UV)||"",u=l.get(vt.FRAGMENT_MAIN_IMAGE)||"",d=l.get(vt.VERTEX_HEAD)||"",f=l.get(vt.VERTEX_MAIN_SUPPORT)||"";const _=new Set,v=new Set;if(a&&(h+=`	${n}MainUv(UV);
`,t.uvTransformation=!0),s!==null&&/mainSupport/.test(s)){const y=/mainSupport *\([\w\s]*?uv\s*?\)/.test(s);f+=`	${n}MainSupport(`,f+=y?`vUv);
`:`);
`;for(const w of s.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(const S of w[1].split(/\s*,\s*/))t.varyings.add(S),_.add(S),v.add(S);for(const w of s.matchAll(o))v.add(w[1])}for(const y of i.matchAll(o))v.add(y[1]);for(const y of e.defines.keys())v.add(y.replace(/\([\w\s,]*\)/g,""));for(const y of e.uniforms.keys())v.add(y);v.delete("while"),v.delete("for"),v.delete("if"),e.uniforms.forEach((y,w)=>t.uniforms.set(n+w.charAt(0).toUpperCase()+w.slice(1),y)),e.defines.forEach((y,w)=>t.defines.set(n+w.charAt(0).toUpperCase()+w.slice(1),y));const m=new Map([["fragment",i],["vertex",s]]);xm(n,v,t.defines),xm(n,v,m),i=m.get("fragment"),s=m.get("vertex");const p=e.blendMode;if(t.blendModes.set(p.blendFunction,p),r){e.inputColorSpace!==null&&e.inputColorSpace!==t.colorSpace&&(u+=e.inputColorSpace===je?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),e.outputColorSpace!==gs?t.colorSpace=e.outputColorSpace:e.inputColorSpace!==null&&(t.colorSpace=e.inputColorSpace);const y=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;u+=`${n}MainImage(color0, UV, `,(t.attributes&yr.DEPTH)!==0&&y.test(i)&&(u+="depth, ",t.readDepth=!0),u+=`color1);
	`;const w=n+"BlendOpacity";t.uniforms.set(w,p.opacity),u+=`color0 = blend${p.blendFunction}(color0, color1, ${w});

	`,c+=`uniform float ${w};

`}if(c+=i+`
`,s!==null&&(d+=s+`
`),l.set(vt.FRAGMENT_HEAD,c),l.set(vt.FRAGMENT_MAIN_UV,h),l.set(vt.FRAGMENT_MAIN_IMAGE,u),l.set(vt.VERTEX_HEAD,d),l.set(vt.VERTEX_MAIN_SUPPORT,f),e.extensions!==null)for(const y of e.extensions)t.extensions.add(y)}}var d0=class extends ni{constructor(n,...e){super("EffectPass"),this.fullscreenMaterial=new RA(null,null,null,n),this.listener=t=>this.handleEvent(t),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(n){for(const e of this.effects)e.mainScene=n}set mainCamera(n){this.fullscreenMaterial.copyCameraSettings(n);for(const e of this.effects)e.mainCamera=n}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(n){this.fullscreenMaterial.encodeOutput=n}get dithering(){return this.fullscreenMaterial.dithering}set dithering(n){const e=this.fullscreenMaterial;e.dithering=n,e.needsUpdate=!0}setEffects(n){for(const e of this.effects)e.removeEventListener("change",this.listener);this.effects=n.sort((e,t)=>t.attributes-e.attributes);for(const e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){const n=new w1;let e=0;for(const a of this.effects)if(a.blendMode.blendFunction===ft.DST)n.attributes|=a.getAttributes()&yr.DEPTH;else{if((n.attributes&a.getAttributes()&yr.CONVOLUTION)!==0)throw new Error(`Convolution effects cannot be merged (${a.name})`);CA("e"+e++,a,n)}let t=n.shaderParts.get(vt.FRAGMENT_HEAD),i=n.shaderParts.get(vt.FRAGMENT_MAIN_IMAGE),s=n.shaderParts.get(vt.FRAGMENT_MAIN_UV);const r=/\bblend\b/g;for(const a of n.blendModes.values())t+=a.getShaderCode().replace(r,`blend${a.blendFunction}`)+`
`;(n.attributes&yr.DEPTH)!==0?(n.readDepth&&(i=`float depth = readDepth(UV);

	`+i),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,n.colorSpace===je&&(i+=`color0 = sRGBToLinear(color0);
	`),n.uvTransformation?(s=`vec2 transformedUv = vUv;
`+s,n.defines.set("UV","transformedUv")):n.defines.set("UV","vUv"),n.shaderParts.set(vt.FRAGMENT_HEAD,t),n.shaderParts.set(vt.FRAGMENT_MAIN_IMAGE,i),n.shaderParts.set(vt.FRAGMENT_MAIN_UV,s);for(const[a,o]of n.shaderParts)o!==null&&n.shaderParts.set(a,o.trim().replace(/^#/,`
#`));this.skipRendering=e===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(n)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(n,e=Mr){this.fullscreenMaterial.depthBuffer=n,this.fullscreenMaterial.depthPacking=e;for(const t of this.effects)t.setDepthTexture(n,e)}render(n,e,t,i,s){for(const r of this.effects)r.update(n,e,i);if(!this.skipRendering||this.renderToScreen){const r=this.fullscreenMaterial;r.inputBuffer=e.texture,r.time+=i*this.timeScale,n.setRenderTarget(this.renderToScreen?null:t),n.render(this.scene,this.camera)}}setSize(n,e){this.fullscreenMaterial.setSize(n,e);for(const t of this.effects)t.setSize(n,e)}initialize(n,e,t){this.renderer=n;for(const i of this.effects)i.initialize(n,e,t);this.updateMaterial(),t!==void 0&&t!==on&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(const n of this.effects)n.removeEventListener("change",this.listener),n.dispose()}handleEvent(n){switch(n.type){case"change":this.recompile();break}}};const cd=new Qr;cd.setResponseType("blob");const ym=new tr,au=new co,ou=new ho,ns={None:null,Color:"color",Default:"default",GroundProjection:"gp"},uc={None:null,HDRI:"hdri"};class sa{constructor(e,{loadingHelper:t}={}){this.scene=e,this.loadingHelper=t,this.preset=Object.values(Nn)[0],this.environmentType=uc.None,this.backgroundType=ns.GroundProjection,this.gpRadius=10,this.gpHeight=1,this.bgColor=new ye("#ffffff"),this.sunEnabled,this.sunPivot,this.sunLight,this.sunPos=new D(1,1,1),this.sunColor=new ye("#ffffff"),this.shadowFloorEnabled,this.shadowFloor,this.shadowOpacity=1,this.envTexture,this.bgTexture,this.groundProjectedSkybox,this.envCache={},this.bgCache={},this.guiFolder=null}init(){this.sunEnabled&&!this.sunPivot&&(this.sunPivot=new wt,this.sunPivot.name="sun_pivot",this.sunLight=new na(16777195,1),this.sunLight.name="sun",this.sunLight.color=this.sunColor,this.sunLight.castShadow=!0,this.sunLight.shadow.camera.near=.1,this.sunLight.shadow.camera.far=50,this.sunLight.shadow.camera.right=15,this.sunLight.shadow.camera.left=-15,this.sunLight.shadow.camera.top=15,this.sunLight.shadow.camera.bottom=-15,this.sunLight.shadow.mapSize.width=1024,this.sunLight.shadow.mapSize.height=1024,this.sunLight.shadow.radius=1.95,this.sunLight.shadow.blurSamples=6,sunLight.shadow.bias=-5e-4,this.sunPivot.add(sunLight)),this.shadowFloorEnabled&&!this.shadowFloor&&(this.shadowFloor=new he(new Hn(10,10).rotateX(-Math.PI/2),new ef({opacity:this.shadowOpacity})),this.shadowFloor.name="shadow_floor",this.shadowFloor.receiveShadow=!0,this.shadowFloor.position.set(0,.001,0))}setEnvType(e){this.environmentType=uc[e]}setBGType(e){this.backgroundType=ns[e]}useFullFloat(){au.setDataType(Vt),ou.setDataType(Vt)}addGui(e){const t=e.addFolder("BG & ENV");return this.guiFolder=t,t.add(this,"preset",Nn).onChange(i=>{this.preset=i,this.updateAll()}),t.add(this,"environmentType",uc).onChange(()=>{this.updateAll()}),t.add(this,"backgroundType",ns).onChange(i=>{this.updateAll(),i===ns.Color?this.bgColorPicker=t.addColor(this,"bgColor"):(this.bgColorPicker?.destroy(),this.bgColorPicker=null)}),t}async updateAll(){const e=this.preset;if(this.init(),await Promise.all([this.downloadEnvironment(e),this.downloadBackground(e)]),this.scene.environment=this.envTexture,this.bgTexture||(this.scene.background=null,this.backgroundType===ns.Color&&(this.scene.background=this.bgColor)),this.backgroundType===ns.GroundProjection&&this.bgTexture)this.scene.background=null,this.groundProjectedSkybox||(this.groundProjectedSkybox=new th(this.bgTexture),this.groundProjectedSkybox.scale.setScalar(100)),e.groundProj.radius&&(this.gpRadius=e.groundProj.radius),e.groundProj.height&&(this.gpHeight=e.groundProj.height),this.bgTexture.minFilter=nt,this.groundProjectedSkybox.material.uniforms.map.value=this.bgTexture,this.groundProjectedSkybox.radius=this.gpRadius,this.groundProjectedSkybox.height=this.gpHeight,this.scene.add(this.groundProjectedSkybox);else switch(this.groundProjectedSkybox?.parent&&this.groundProjectedSkybox.removeFromParent(),this.backgroundType){case ns.Default:{this.scene.background=this.bgTexture;break}case ns.Color:{this.scene.background=this.bgColor;break}default:{this.scene.background=null;break}}}async downloadEnvironment({exr:e,hdr:t}={}){const i=e||t;if(this.environmentType===uc.None){this.envTexture=null;return}let s=this.envCache[i];s||(this.loadingHelper?.setGlobalProgress(i,0),s=e?await au.loadAsync(i,r=>this.loadingHelper?.setGlobalProgress(i,r.loaded/r.total)):await ou.loadAsync(i,r=>this.loadingHelper?.setGlobalProgress(i,r.loaded/r.total)),this.envCache[i]=s,s.mapping=an),this.envTexture=s}async downloadBackground({webP:e,avif:t}={}){const i=e||t;if(!(this.backgroundType===ns.Default||this.backgroundType===ns.GroundProjection)){this.bgTexture=null;return}if(i){let s=this.bgCache[i];if(!s){this.loadingHelper?.setGlobalProgress(i,0);const r=await cd.loadAsync(i,o=>this.loadingHelper?.setGlobalProgress(i,o.loaded/o.total)),a=URL.createObjectURL(r);s=await ym.loadAsync(a),URL.revokeObjectURL(a),this.bgCache[i]=s,s.mapping=an,s.colorSpace=je}this.bgTexture=s}}async setupEnvironment(){loadEnv(this.environmentType)}async loadEnv(e){if(!e){scene.background=null,scene.environment=null;return}const t=async()=>{if(!e.exr)return;this.loadingHelper?.setGlobalProgress(e.exr,0);const r=await au.loadAsync(e.exr,a=>this.loadingHelper?.setGlobalProgress(e.exr,a.loaded/a.total));r.mapping=an,scene.environment=r,console.log("exr loaded")},i=async()=>{if(!e.hdr)return;this.loadingHelper?.setGlobalProgress(e.hdr,0);const r=await ou.loadAsync(e.hdr,a=>this.loadingHelper?.setGlobalProgress(e.hdr,a.loaded/a.total));r.mapping=an,scene.environment=r,console.log("hdr loaded")},s=async()=>{const r=e.webP||e.avif;if(r){this.loadingHelper?.setGlobalProgress(r,0);const a=await cd.loadAsync(r,c=>this.loadingHelper?.setGlobalProgress(r,c.loaded/c.total)),o=URL.createObjectURL(a),l=await ym.loadAsync(o);URL.revokeObjectURL(o),l.mapping=an,l.colorSpace=je,scene.background=l,console.log("Background loaded"),params.groundProjection&&loadGroundProj(params.environment)}};await Promise.all([t(),i(),s()]),e.sunPos?(sunLight.visible=!0,sunLight.position.fromArray(e.sunPos)):sunLight.visible=!1,e.sunColor?sunLight.color.set(e.sunColor):sunLight.color.set(16777215)}}let hd,kn,Xo,$o,vn,Zn,mr,Js,wm=new ue;const PA={pixelRatio:Math.min(1.5,window.devicePixelRatio)},nh=new wt,DA=new Vn,f0=new Wn;f0.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");DA.setDRACOLoader(f0);new Fn;let p0=()=>{},lu;const ih=new ml({debug:!0});console.log("TODO : DYNAMIC IMPORT EACH FILE");async function IA(n){Js=n,lu=Js.addFolder("Scene"),hd=new gn,app.appendChild(hd.dom),kn=new Gn({powerPreference:"high-performance",antialias:!1,stencil:!1,depth:!1}),kn.setPixelRatio(PA.pixelRatio),kn.setSize(window.innerWidth,window.innerHeight),kn.shadowMap.enabled=!0,kn.shadowMap.type=sn,kn.outputColorSpace=je,kn.toneMapping=Ji,app.appendChild(kn.domElement),vn=new yt(50,window.innerWidth/window.innerHeight,.1,200),vn.position.set(5,2,5),vn.name="Camera",Zn=new cn,Zn.fog=new Zd(0,10,20),Zn.add(nh),Xo=new h0(kn),Xo.addPass(new df(Zn,vn)),$o=new EA(Zn,vn,{resolutionScale:.4,luminanceThreshold:0,intensity:120,mipmapBlur:!0,levels:4,radius:.4}),$o.ignoreBackground=!0;const e=new d0(vn,$o);Xo.addPass(e),mr=new Xn(vn,kn.domElement),mr.enableDamping=!0,mr.dampingFactor=.05,mr.minDistance=.5,mr.maxDistance=20,mr.maxPolarAngle=Math.PI/1.5,mr.target.set(0,0,0),window.addEventListener("resize",LA),document.addEventListener("pointermove",Sm);let t=Date.now();app.addEventListener("pointerdown",()=>{t=Date.now()}),app.addEventListener("pointerup",s=>{Date.now()-t<200&&Sm(s)});const i=new sa(Zn,{loadingHelper:ih});i.preset=Nn.kloppenheim,i.setEnvType("HDRI"),i.setBGType("Default"),i.addGui(lu),Zn.backgroundBlurriness=.1,Zn.backgroundIntensity=.01,Zn.environmentIntensity=.1,lu.add(Zn,"environmentIntensity",0,1),m0(),await Promise.all([i.updateAll(),FA()]),g0()}function LA(){vn.aspect=window.innerWidth/window.innerHeight,vn.updateProjectionMatrix(),Xo.setSize(window.innerWidth,window.innerHeight)}function m0(){hd.update(),ia(),p0(),mr.update(),Xo.render()}function g0(){requestAnimationFrame(g0),m0()}function Sm(n){wm.x=n.clientX/window.innerWidth*2-1,wm.y=-(n.clientY/window.innerHeight)*2+1}const Vc=(n,e,t)=>{const i=new fn(e,t,n,128,64,!0);return i.translate(0,-n/2,0),i.rotateX(-Math.PI/2),i},zr=(n,e,t)=>{e.material.attenuation=n.distance;let i=Math.tan(n.angle)*n.distance;e.geometry=Vc(n.distance,t,i)};function UA({size:n,frames:e=1/0}={}){const t=kn,i=new D;t.getSize(i);const s=n||i.x,r=n||i.y;console.log("depth tex res",s,r);const a=new ta(s,r);a.format=Sr,a.type=wr,a.name="Depth_Buffer";let o=0;const l=NA(s,r,{depthTexture:a}),c=()=>{(e===1/0||o<e)&&(t.setRenderTarget(l),t.render(Zn,vn),t.setRenderTarget(null),o++)};return[l.depthTexture,c]}function NA(n,e,t){const i=kn,s=n,r=e,a=t,{samples:o=0,depth:l,...c}=a;let h;return h=new St(s,r,{minFilter:nt,magFilter:nt,colorSpace:i.outputColorSpace,type:Gt,...c}),h.samples=o,h}async function FA(){const n=[],e={speed:10,useDepth:!1,depthResolution:1024},[t,i,s]=await Promise.all([BA(),OA(n),kA(n)]),r=new D,a=()=>{e.useDepth&&(kn.getSize(r),r.multiplyScalar(kn.getPixelRatio()))};window.addEventListener("resize",a);let o=()=>{};function l(){if(e.useDepth){const d=UA({size:e.depthResolution});let f;for(const _ of n)f=_.depth,_.depth=d[0],_.resolution=r;a(),o=d[1],f&&f.dispose()}else for(const d of n)d.depth=null,d.resolution.set(0,0)}Js.add(e,"useDepth").onChange(l),Js.add(e,"depthResolution",128,1024,128).onChange(l),Js.add(e,"speed",.1,20).onChange();const c=new Qc(!0);let h,u;p0=()=>{if(u=c.getDelta()*e.speed,t(u),i(u),s(u),Zn.environmentRotation.y+=vn.position.x>0?u*.01:-u*.01,e.useDepth){for(const d of n)h=d.depth,d.depth=null;o();for(const d of n)d.depth=h}}}async function OA(n){const t=(await uo(mn.porsche_1975.url,{loadingHelper:ih})).scene;t.name="car",t.traverse(C=>{C.isMesh&&(C.selectOnRaycast=t,C.material.transparent||(C.castShadow=!0,C.receiveShadow=!0))}),nh.add(t);const i={FL:t.getObjectByName("wheel_L"),FR:t.getObjectByName("wheel_R"),R:t.getObjectByName("wheels_rear"),body:t.getObjectByName("body"),steerL:t.getObjectByName("steer_L"),steerR:t.getObjectByName("steer_R"),steerVal:0,emit:t.getObjectByName("emit"),lights:t.getObjectByName("lights"),wheenSpinMultiplier:1.8};i.emit.material=new Wt,i.emit.material.color.set(0),i.emit.material.emissive.set("#ffbb73"),i.lights.material.emissiveIntensity=3,Js.add(i.emit.material,"emissiveIntensity",0,50),Js.add(i.lights.material,"emissiveIntensity",0,50),$o.selection.add(i.emit);const s={distance:8},r=new xr;r.intensity=500,r.color.set("#ffbb73"),r.angle=xt.degToRad(20),r.penumbra=.2,r.distance=s.distance;const a=r.clone();t.add(r,a),t.add(r.target,a.target),r.position.set(-.66,.66,2),r.target.position.set(-.66,.25,10),a.position.set(.66,.66,2),a.target.position.set(.66,.25,10);let o=.08;const l=new zc;l.spotPosition=new D,l.opacity=1,l.lightColor=r.color,l.attenuation=s.distance,l.anglePower=5,l.cameraNear=vn.near,l.cameraFar=vn.far;const c=new zc;c.spotPosition=new D,c.opacity=1,c.lightColor=a.color,c.attenuation=s.distance,c.anglePower=l.anglePower,c.cameraNear=vn.near,c.cameraFar=vn.far,n.push(l,c);const h=new he(Vc(s.distance,o,.5),l),u=new he(Vc(s.distance,o,.5),c);r.add(h),a.add(u);const d=new D;h.lookAt(r.target.position),u.lookAt(a.target.position),zr(r,h,o),zr(a,u,o);const f=new xr(16711680,.05);f.penumbra=1,f.position.set(.62,.64,-2),f.target.position.set(.62,0,-4);const _=f.clone();_.position.set(-.62,.64,-2),_.target.position.set(-.62,0,-4),t.add(f,f.target,_,_.target);function v(C){const M=C.addFolder("HeadLight"),E=M.addFolder("Headlights Volume");E.add(l,"opacity",0,2).onChange(L=>{c.opacity=L}),E.add(l,"anglePower",0,15).onChange(L=>{c.anglePower=L}),M.addColor(r,"color").onChange(()=>{a.color.copy(r.color)}),M.add(r,"intensity",0,1e3).onChange(()=>{a.intensity=r.intensity}),M.add(r,"angle",0,Math.PI/2).onChange(()=>{a.angle=r.angle,zr(r,h,o),zr(a,u,o)}),M.add(r,"penumbra",0,1).onChange(()=>{a.penumbra=r.penumbra}),M.add(s,"distance",.1,20).onChange(L=>{r.distance=L,a.distance=L,zr(r,h,o),zr(a,u,o)})}v(Js);const m=xt.degToRad(15),p=xt.degToRad(5),y=.25;function w(){const C=xt.mapLinear(i.steerVal,-1,1,-m,m);i.steerL.rotation.y=C,i.steerR.rotation.y=C,i.body.rotation.z=xt.mapLinear(i.steerVal,-1,1,-p,p)}const S=new vi(i).to({steerVal:0}).duration(1e3).easing(yn.Elastic.Out).onStart(()=>{S._valuesStart.steerVal=i.steerVal}).onUpdate(()=>{w()});let A=!0;const I=new vi(i).to({steerVal:1}).duration(1e3).easing(yn.Back.Out).delay(1e3).onStart(()=>{I.delay(xt.randInt(100,4e3)),A?(I._valuesEnd.steerVal=1,P._valuesEnd.x=y):(I._valuesEnd.steerVal=-1,P._valuesEnd.x=-y),A=!A,P.start()}).onUpdate(()=>{w()});I.chain(S),S.chain(I),setTimeout(()=>{I.startFromCurrentValues()},2e3);const P=new vi(t.position).to({x:0}).duration(2e3).easing(yn.Quadratic.InOut).onStart(()=>{P._valuesStart.x=t.position.x});return C=>{l.spotPosition.copy(h.getWorldPosition(d)),c.spotPosition.copy(u.getWorldPosition(d)),i.FL.rotation.x+=C*i.wheenSpinMultiplier,i.FR.rotation.x+=C*i.wheenSpinMultiplier,i.R.rotation.x+=C*i.wheenSpinMultiplier}}async function BA(){const e=(await uo(mn.road.url,{loadingHelper:ih})).scene;e.name="road",e.traverse(a=>{a.isMesh&&(a.selectOnRaycast=e,a.castShadow=!0,a.receiveShadow=!0)});const t=8,i=12,s=t*i,r=[];for(let a=0;a<t;a++){const o=e.clone();o.position.z=a*i-s/2,nh.add(o),r.push(o)}return a=>{r.forEach(o=>{o.position.z-=a,o.position.z<-s/2&&(o.position.z+=s)})}}async function kA(n){const e=new D,t=.1,s=(await uo(mn.pole.url,{loadingHelper:ih})).scene;s.name="pole";const r=new ye("#ffbb73");s.position.set(-6,0,0),s.rotation.y=Math.PI/2;const a=s.getObjectByName("emit");a.material=new Wt,a.material.color.set(0),a.material.emissive.set("#ffbb73"),a.castShadow=!1,a.receiveShadow=!1;const o=[],l=[],c=[],h={gap:15,intensity:1e3,color:r,helper:!1},u=Js.addFolder("Street Lamps");u.addColor(h,"color"),u.add(h,"intensity",0,2e3).onChange(d=>{c.forEach(f=>{f.intensity=d})}),u.add(h,"gap",10,30,1).onChange(()=>{for(let d=0;d<o.length;d++){const f=o[d];f.position.z=d*h.gap,console.log(d,f.position.z)}}),$o.selection.add(a);for(let d=0;d<4;d++){const f=s.clone();o.push(f),f.position.z=d*h.gap;const _=new xr;c.push(_),_.color=r,_.intensity=h.intensity,_.angle=xt.degToRad(30),_.penumbra=.5,_.distance=12,_.position.set(0,7.2,1.8),_.target.position.set(0,0,7),_.castShadow=!0,_.shadow.bias=-1e-4,_.radius=1,_.blurSamples=4;const v=new zc;console.log(v.uuid),n.push(v),v.spotPosition=new D,v.opacity=.5,v.lightColor=r,v.anglePower=5,v.cameraNear=vn.near,v.cameraFar=vn.far;const m=new he(Vc(_.distance,t,.5),v);_.add(m),zr(_,m,t),m.lookAt(_.target.getWorldPosition(e)),l.push(m);const p=u.addFolder("lamp "+d);p.add(_.shadow,"bias",-1e-4,1e-4).onChange(()=>{}),p.add(v,"opacity",0,2),p.add(v,"attenuation",0,_.distance),p.add(v,"anglePower",0,15),p.add(v,"cameraNear",0,10),p.add(v,"cameraFar",0,10),f.add(_,_.target);const y=new Ho(_);_.helper=y,y.visible=h.helper,Zn.add(y),nh.add(f)}for(let d=0;d<c.length;d++){const f=c[d];l[d].material.spotPosition.copy(f.getWorldPosition(e)),l[d].lookAt(f.target.getWorldPosition(e))}return d=>{for(let f=0;f<o.length;f++){const _=o[f];_.position.z-=d,_.position.z<-h.gap/2*o.length&&(_.position.z+=h.gap*o.length),h.helper&&c.forEach(v=>{v.helper.update()}),l[f].material.spotPosition.copy(l[f].getWorldPosition(e))}}}async function zA(n){const e=document.createElement("div");e.style.position="absolute",e.style.top="50%",e.style.left="50%",e.style.transform="translate(-50%, -50%)",e.style.fontSize="50px",e.style.pointerEvents="none",e.innerHTML="Realism Effects Demo BROKEN",document.body.appendChild(e)}const HA=""+new URL("rgh-OQHteBbA.jpg",import.meta.url).href,GA=""+new URL("paper_normal-04Chbw_b.jpg",import.meta.url).href,Mm={rgh:HA,paper_normal:GA};let ud,qn,zn,Yr,as,Wc,dd=new ue;const jo=new wt,bm=new tr,_0=new Vn,v0=new Wn;let Fi;v0.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");_0.setDRACOLoader(v0);const Em=new Fn,Aa=[];let x0=()=>{},cu;async function VA(n){Wc=n,cu=Wc.addFolder("Scene"),ud=new gn,app.appendChild(ud.dom),qn=new Gn({antialias:!0}),qn.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),qn.setSize(window.innerWidth,window.innerHeight),qn.shadowMap.enabled=!0,qn.shadowMap.type=sn,qn.outputColorSpace=je,qn.toneMapping=Ji,app.appendChild(qn.domElement),zn=new yt(50,window.innerWidth/window.innerHeight,.1,200),zn.position.set(6,3,6),zn.name="Camera",zn.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),Yr=new cn,Yr.add(jo),as=new Xn(zn,qn.domElement),as.enableDamping=!0,as.dampingFactor=.05,as.minDistance=.1,as.maxDistance=100,as.maxPolarAngle=Math.PI/1.5,as.target.set(0,0,0),as.target.set(0,0,0),Fi=new ti(zn,qn.domElement),Fi.addEventListener("dragging-changed",i=>{as.enabled=!i.value,i.value}),Fi.addEventListener("change",()=>{Fi.object&&Fi.object.position.y<0&&(Fi.object.position.y=0)}),Yr.add(Fi.getHelper()),window.addEventListener("resize",WA),document.addEventListener("pointermove",Tm);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",i=>{Date.now()-e<200&&(Tm(i),$A())}),cu.add(Fi,"mode",["translate","rotate","scale"]);const t=new sa(Yr);t.preset=Nn.dancing_hall,t.setEnvType("HDRI"),t.setBGType("GroundProjection"),t.updateAll(),t.addGui(cu),await jA(),y0()}function WA(){zn.aspect=window.innerWidth/window.innerHeight,zn.updateProjectionMatrix(),qn.setSize(window.innerWidth,window.innerHeight)}function XA(){ud.update(),ia(),as.update(),x0(),qn.render(Yr,zn)}function y0(){requestAnimationFrame(y0),XA()}function $A(){if(Em.setFromCamera(dd,zn),Em.intersectObject(jo,!0,Aa),!Aa.length){Fi.detach();return}Aa[0].object.selectOnRaycast?Fi.attach(Aa[0].object.selectOnRaycast):Fi.attach(Aa[0].object),Aa.length=0}function Tm(n){dd.x=n.clientX/window.innerWidth*2-1,dd.y=-(n.clientY/window.innerHeight)*2+1}async function jA(){const n=new he(new Ki(.5).translate(0,.5,0),new Wt({color:Am(),roughness:0,metalness:1}));n.name="sphere",n.castShadow=!0,n.receiveShadow=!0,n.position.set(2,0,-1.5),jo.add(n);const e=new he(new Lt(1,1,1).translate(0,.5,0),new Wt({color:Am(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),jo.add(e);const i=(await _0.loadAsync(mn.porsche_1975.url)).scene;i.name="car",i.traverse(a=>{a.isMesh&&(a.castShadow=!0,a.receiveShadow=!0,a.selectOnRaycast=i,a.name)}),jo.add(i);const s={FL:null,FR:null,R:null,steerL:null,steerR:null,steerVal:0};s.R=i.getObjectByName("wheels_rear"),s.steerL=i.getObjectByName("wheel_L"),s.steerR=i.getObjectByName("wheel_R");const r=xt.degToRad(30);new vi(s).to({steerVal:1},3e3).easing(yn.Elastic.Out).delay(3e3).repeatDelay(5e3).repeat(1e4).yoyo(!0).onUpdate(()=>{const a=xt.mapLinear(s.steerVal,0,1,-r,r);s.steerL.rotation.y=a,s.steerR.rotation.y=a}).start(),YA()}async function YA(){const n={resolution:1024,blurX:1024,blurY:1024,depthScale:1};let e=1,t=5,i=0,s=1,r=.25,a=0,o=.25,l=1,c=0,h=.6,u=1,d=new ye(4671303);const f=qn;let _=n.blurX+n.blurY>0;const v=new Hi,m=new D,p=new D,y=new D,w=new We,S=new D(0,0,-1),A=new pt,I=new D,P=new D,C=new pt,M=new We,E=new yt,L=De=>{if(p.setFromMatrixPosition(De.matrixWorld),y.setFromMatrixPosition(zn.matrixWorld),w.extractRotation(De.matrixWorld),m.set(0,0,1),m.applyMatrix4(w),p.addScaledVector(m,c),I.subVectors(p,y),I.dot(m)>0)return;I.reflect(m).negate(),I.add(p),w.extractRotation(zn.matrixWorld),S.set(0,0,-1),S.applyMatrix4(w),S.add(y),P.subVectors(p,S),P.reflect(m).negate(),P.add(p),E.position.copy(I),E.up.set(0,1,0),E.up.applyMatrix4(w),E.up.reflect(m),E.lookAt(P),E.far=zn.far,E.updateMatrixWorld(),E.projectionMatrix.copy(zn.projectionMatrix),M.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),M.multiply(E.projectionMatrix),M.multiply(E.matrixWorldInverse),M.multiply(De.matrixWorld),v.setFromNormalAndCoplanarPoint(m,p),v.applyMatrix4(E.matrixWorldInverse),A.set(v.normal.x,v.normal.y,v.normal.z,v.constant);const Le=E.projectionMatrix;C.x=(Math.sign(A.x)+Le.elements[8])/Le.elements[0],C.y=(Math.sign(A.y)+Le.elements[9])/Le.elements[5],C.z=-1,C.w=(1+Le.elements[10])/Le.elements[14],A.multiplyScalar(2/A.dot(C)),Le.elements[2]=A.x,Le.elements[6]=A.y,Le.elements[10]=A.z+1,Le.elements[14]=A.w};function G(){const De={minFilter:nt,magFilter:nt,colorSpace:f.outputColorSpace,type:Gt},Le=new St(n.resolution,n.resolution,De);Le.depthBuffer=!0,Le.depthTexture=new ta(n.resolution,n.resolution),Le.depthTexture.format=Sr,Le.depthTexture.type=wr;const gt=new St(n.resolution,n.resolution,De),st=new lT({gl:f,resolution:n.resolution,width:n.blurX,height:n.blurY,minDepthThreshold:i,maxDepthThreshold:s,depthScale:n.depthScale,depthToBlurRatioBias:r});console.log(st);const B={mirror:a,textureMatrix:M,mixBlur:e,tDiffuse:Le.texture,tDepth:Le.depthTexture,tDiffuseBlur:gt.texture,hasBlur:_,mixStrength:t,minDepthThreshold:i,maxDepthThreshold:s,depthScale:n.depthScale,depthToBlurRatioBias:r,distortion:o,mixContrast:l,metalness:h,roughness:u,color:d},Ie={"defines-USE_BLUR":_?"":void 0,"defines-USE_DEPTH":n.depthScale>0?"":void 0,"defines-USE_DISTORTION":void 0};return console.log({fbo1:Le,fbo2:gt,blurpass:st,reflectorProps:B,defines:Ie}),[Le,gt,st,B,Ie]}let[H,z,q,X,ie]=G();function Z(){H.dispose(),z.dispose(),q.renderTargetA.dispose(),q.renderTargetB.dispose(),q.convolutionMaterial.dispose(),_=n.blurX+n.blurY>0,[H,z,q,X,ie]=G(),oe.reflector.dispose(),oe.reflector=new eu(X),oe.reflector.defines.USE_BLUR=ie["defines-USE_BLUR"],oe.reflector.defines.USE_DEPTH=ie["defines-USE_DEPTH"],oe.reflector.defines.USE_DISTORTION=ie["defines-USE_DISTORTION"],fe=oe.reflector,re(),W.materialType instanceof eu&&(W.materialType=oe.reflector,ee.material=W.materialType)}function re(){W.useRoughnessMap?(fe.roughnessMap=ke,Te.roughnessMap=ke):(fe.roughnessMap=null,Te.roughnessMap=null),W.useDistortionMap?fe.distortionMap=ke:fe.distortionMap=null,W.useNormalMap?(fe.normalMap=Ye,Te.normalMap=Ye):(fe.normalMap=null,Te.normalMap=null),fe.needsUpdate=!0,Te.needsUpdate=!0}const oe={standard:new Wt({roughness:u}),reflector:new eu(X)},Te=oe.standard;let fe=oe.reflector;fe.defines.USE_BLUR=ie["defines-USE_BLUR"],fe.defines.USE_DEPTH=ie["defines-USE_DEPTH"],fe.defines.USE_DISTORTION=ie["defines-USE_DISTORTION"];const ke=await bm.loadAsync(Mm.rgh);ke.wrapS=$i,ke.wrapT=$i;const Ye=await bm.loadAsync(Mm.paper_normal);Ye.wrapS=$i,Ye.wrapT=$i,Ye.repeat.set(5,5),ke.repeat.set(5,5),Te.roughnessMap=ke,Te.color.set(d);const W={materialType:oe.reflector,useRoughnessMap:!1,useDistortionMap:!1,useNormalMap:!1,normalScale:1,repeat:5},ee=new he(new qc(5,32),W.materialType);ee.rotateX(-Math.PI/2),ee.name="floor",ee.receiveShadow=!0,ee.position.set(0,.001,0),Yr.add(ee),console.log({reflectorProps:X,material:fe}),Wc.add(W,"materialType",oe).onChange(De=>{ee.material=De});const ae=Wc.addFolder("MeshReflectorMaterial");ae.open(),ae.add(n,"resolution",128,2048,128).name("⚠ Resolution").onChange(Z),ae.add(n,"blurX",16,2048,128).name("⚠ Blur X").onChange(Z),ae.add(n,"blurY",16,2048,128).name("⚠ Blur Y").onChange(Z),ae.add(n,"depthScale",0,10).name("⚠ DEPTH SCALE").onChange(Z),ae.add(W,"useRoughnessMap").onChange(re),ae.add(W,"useDistortionMap").onChange(re),ae.add(W,"useNormalMap").onChange(re),ae.addColor(fe,"color").onChange(()=>{Te.color.copy(fe.color)}),ae.add(W,"normalScale",0,1).onChange(De=>{fe.normalScale.setScalar(De),Te.normalScale.setScalar(De)}),ae.add(W,"repeat",1,15,1).onChange(De=>{ke.repeat.setScalar(De),Ye.repeat.setScalar(De)}),ae.add(fe,"mixStrength",0,15),ae.add(fe,"mixBlur",0,6),ae.add(fe,"mixContrast",0,5),ae.add(fe,"metalness",0,1),ae.add(fe,"roughness",0,1),ae.add(fe,"distortion",-2,2);const Ne=ee;x0=()=>{Ne.visible=!1;const De=f.xr.enabled,Le=f.shadowMap.autoUpdate;L(Ne),f.xr.enabled=!1,f.shadowMap.autoUpdate=!1,f.setRenderTarget(H),f.state.buffers.depth.setMask(!0),f.autoClear||f.clear(),f.render(Yr,E),_&&q.render(f,H,z),f.xr.enabled=De,f.shadowMap.autoUpdate=Le,Ne.visible=!0,f.setRenderTarget(null)}}const ZA=new ye;function Am(){return"#"+ZA.setHSL(Math.random(),.5,.5).getHexString()}let fd,Ln,_s,Zr,Fs,pd,md=new ue;const ff=new wt,w0=new Vn,S0=new Wn;let Oi;S0.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");w0.setDRACOLoader(S0);const Rm=new Fn,Ra=[];let M0=()=>{},hu;async function qA(n){pd=n,hu=pd.addFolder("Scene"),fd=new gn,app.appendChild(fd.dom),Ln=new Gn({antialias:!0}),Ln.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),Ln.setSize(window.innerWidth,window.innerHeight),Ln.shadowMap.enabled=!0,Ln.shadowMap.type=sn,Ln.outputColorSpace=je,Ln.toneMapping=Ji,app.appendChild(Ln.domElement),_s=new yt(50,window.innerWidth/window.innerHeight,.1,200),_s.position.set(2,2,2),_s.name="Camera",Zr=new cn,Zr.add(ff),Fs=new Xn(_s,Ln.domElement),Fs.enableDamping=!0,Fs.dampingFactor=.05,Fs.minDistance=.1,Fs.maxDistance=100,Fs.maxPolarAngle=Math.PI/1.5,Fs.target.set(0,.5,0),Oi=new ti(_s,Ln.domElement),Oi.addEventListener("dragging-changed",i=>{Fs.enabled=!i.value,i.value}),Oi.addEventListener("change",()=>{Oi.object&&Oi.object.position.y<0&&(Oi.object.position.y=0)}),Zr.add(Oi.getHelper()),window.addEventListener("resize",KA),document.addEventListener("pointermove",Cm);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",i=>{Date.now()-e<200&&(Cm(i),QA())}),hu.add(Oi,"mode",["translate","rotate","scale"]);const t=new sa(Zr);t.setBGType("GroundProjection"),t.setEnvType("HDRI"),t.updateAll(),t.addGui(hu),await eR(),b0()}function KA(){_s.aspect=window.innerWidth/window.innerHeight,_s.updateProjectionMatrix(),Ln.setSize(window.innerWidth,window.innerHeight)}function JA(){fd.update(),Fs.update(),M0(),Ln.render(Zr,_s)}function b0(){requestAnimationFrame(b0),JA()}function QA(){if(Rm.setFromCamera(md,_s),Rm.intersectObject(ff,!0,Ra),!Ra.length){Oi.detach();return}Ra[0].object.selectOnRaycast?Oi.attach(Ra[0].object.selectOnRaycast):Oi.attach(Ra[0].object),Ra.length=0}function Cm(n){md.x=n.clientX/window.innerWidth*2-1,md.y=-(n.clientY/window.innerHeight)*2+1}async function eR(){const n={customBackground:Zr.background,backside:!0,thickness:1,backsideThickness:.5},t=(await w0.loadAsync(mn.monkey.url)).scene,i=new lf,s=new jg({anisotropy:.5}),r=[];t.traverse(_=>{_.isMesh&&(_.castShadow=!0,_.receiveShadow=!0,_.selectOnRaycast=t,_.material=s,r.push(_))}),ff.add(t),tR(pd,s,n);const a=new St(512,512,{minFilter:nt,magFilter:nt,colorSpace:Ln.outputColorSpace,type:Gt}),o=new St(512,512,{minFilter:nt,magFilter:nt,colorSpace:Ln.outputColorSpace,type:Gt}),l=s;l.buffer=o.texture;let c,h,u;const d={gl:Ln,scene:Zr,camera:_s},f=new Qc(!0);M0=()=>{l.time=f.getElapsedTime();for(const _ of r){const v=_;l.buffer===o.texture&&(h=d.gl.toneMapping,c=d.scene.background,u=v.material.side,d.gl.toneMapping=Ss,n.background&&(d.scene.background=n.background),v.material=i,n.backside&&(d.gl.setRenderTarget(a),d.gl.render(d.scene,d.camera),v.material=l,v.material.buffer=a.texture,v.material.thickness=n.backsideThickness,v.material.side=jt),d.gl.setRenderTarget(o),d.gl.render(d.scene,d.camera),v.material=l,v.material.thickness=n.thickness,v.material.side=u,v.material.buffer=o.texture,d.scene.background=c,d.gl.setRenderTarget(null),d.gl.toneMapping=h)}}}function tR(n,e,t){const i=n.addFolder("Transmission Material");i.open(),i.add(t,"backside"),i.add(t,"thickness",0,2),i.add(t,"backsideThickness",0,2),i.addColor(e,"color"),i.add(e,"roughness",0,1),i.add(e,"chromaticAberration",0,2),i.add(e,"distortion",0,10),i.add(e,"temporalDistortion",0,1),i.add(e,"anisotropicBlur",0,10),i.add(e,"reflectivity",0,1),i.addColor(e,"attenuationColor"),i.add(e,"attenuationDistance",0,2)}let gd,ai,Yo,us,zs,gr,ll,Pm=new ue;const nR=new wt;let fr;new Fn;let uu;const E0={Vase:mn.vase,Monkey:mn.monkey,Bunny:mn.bunny,Porsche:mn.porsche_1975},dc={model:E0.Porsche},Dm={};let Hr;const iR=new ml;async function sR(n){ll=n,uu=ll.addFolder("Scene"),gd=new gn,app.appendChild(gd.dom),ai=new Gn({antialias:!1,alpha:!0}),ai.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),ai.setSize(window.innerWidth,window.innerHeight),ai.shadowMap.enabled=!0,ai.shadowMap.type=sn,ai.outputColorSpace=je,ai.toneMapping=Ji,app.appendChild(ai.domElement),us=new yt(50,window.innerWidth/window.innerHeight,.1,500),us.position.set(-5,5,5),us.name="Camera",zs=new cn,zs.add(nR),Yo=new h0(ai,{multisampling:4}),Yo.addPass(new df(zs,us)),Yo.addPass(new d0(us,new u0({mipmapBlur:!0,luminanceThreshold:.9}))),gr=new Xn(us,ai.domElement),gr.enableDamping=!0,gr.dampingFactor=.05,gr.minDistance=.1,gr.maxDistance=400,gr.target.set(0,.5,0),fr=new ti(us,ai.domElement),fr.addEventListener("dragging-changed",i=>{gr.enabled=!i.value,i.value}),fr.addEventListener("change",()=>{fr.object&&fr.object.position.y<0&&(fr.object.position.y=0)}),zs.add(fr.getHelper()),window.addEventListener("resize",rR),document.addEventListener("pointermove",Im);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",i=>{Date.now()-e<200&&Im(i)}),uu.add(fr,"mode",["translate","rotate","scale"]);const t=new sa(zs,{loadingHelper:iR});t.setBGType("Default"),t.setEnvType("HDRI"),t.addGui(uu),await Promise.all([t.updateAll(),oR()]),zs.backgroundBlurriness=.4,zs.backgroundIntensity=.2,lR(),T0()}function rR(){us.aspect=window.innerWidth/window.innerHeight,us.updateProjectionMatrix(),Yo.setSize(window.innerWidth,window.innerHeight)}function aR(){gd.update(),ia(),gr.update(),tn&&tn.update(),Yo.render(zs,us)}function T0(){requestAnimationFrame(T0),aR()}function Im(n){Pm.x=n.clientX/window.innerWidth*2-1,Pm.y=-(n.clientY/window.innerHeight)*2+1}async function oR(){const n=async()=>{let e=Dm[dc.model.url];e||(e=await uo(dc.model.url),Dm[dc.model.url]=e),e.scene.traverse(i=>{i.frustumCulled=!1});let t;Hr&&(t=Hr.parent,Hr.removeFromParent()),t&&t.add(e.scene),Hr=e.scene};ll.add(dc,"model",E0).onChange(async e=>{await n()}),await n(),ll.add(Hr.scale,"x",1e-4,3).name("model scale").onChange(e=>{Hr.scale.setScalar(e)})}let tn;async function lR(){tn=kE(ai,{frames:1/0,worldRadius:.01}),zs.add(tn.group,tn.helper),tn.scene.add(Hr),cR()}function cR(){const n=ll.addFolder("Caustics");n.open(),n.addColor(tn.params,"color"),n.add(tn.params,"ior",0,Math.PI),n.add(tn.params,"far",0,5),n.add(tn.helper,"visible").name("helper"),n.add(tn.params,"backside").onChange(e=>{e||tn.causticsTargetB.dispose()}),n.add(tn.params,"backsideIOR",0,Math.PI),n.add(tn.params,"worldRadius",0,.05),n.add(tn.params,"intensity",0,1),n.add(tn.params,"causticsOnly"),n.add(tn.params.lightSource,"x",-1,1),n.add(tn.params.lightSource,"y",.1,10),n.add(tn.params.lightSource,"z",-1,1)}let _d,ui,vs,pi,os,vd,xd=new ue;const Lm={bgColor:new ye,printCam:()=>{}},Zo=new wt,hR=new ho,A0=new Vn,R0=new Wn;let Hs;R0.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");A0.setDRACOLoader(R0);const Um=new Fn,fc=[];let pc,Qs,io,Ua,Un;const It={temporal:!0,frames:40,limit:1/0,blend:40,scale:10,opacity:.8,alphaTest:.75},Ot={bias:.001,mapSize:1024,size:8,near:.5,far:200,position:new D(3,5,3),radius:1,amount:8,intensity:2,ambient:.5},qo={count:0,resetPlm:()=>{}};async function uR(n){vd=n,pc=vd.addFolder("Scene"),_d=new gn,app.appendChild(_d.dom),ui=new Gn({antialias:!0,powerPreference:"high-performance"}),ui.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),ui.setSize(window.innerWidth,window.innerHeight),ui.shadowMap.enabled=!0,ui.outputColorSpace=je,ui.toneMapping=Ji,app.appendChild(ui.domElement),vs=new yt(50,window.innerWidth/window.innerHeight,.1,200),vs.position.set(6,3,6),vs.name="Camera",pi=new cn,hR.load(Nn.skidpan.hdr,t=>{t.mapping=an,pi.backgroundBlurriness=.7,pi.background=t,pi.environment=t}),pi.add(Zo),os=new Xn(vs,ui.domElement),os.enableDamping=!0,os.dampingFactor=.05,os.minDistance=.1,os.maxDistance=100,os.maxPolarAngle=Math.PI/1.5,os.target.set(0,0,0),os.target.set(0,0,0),Hs=new ti(vs,ui.domElement),Hs.addEventListener("dragging-changed",t=>{os.enabled=!t.value,t.value||Qs.recalculate()}),Hs.addEventListener("change",()=>{Hs.object&&Hs.object.position.y<0&&(Hs.object.position.y=0)}),window.addEventListener("resize",dR),document.addEventListener("pointermove",Nm);let e=Date.now();document.addEventListener("pointerdown",()=>{e=Date.now()}),document.addEventListener("pointerup",t=>{Date.now()-e<200&&(Nm(t),pR())}),pc.add(Hs,"mode",["translate","rotate","scale"]),pc.add(pi,"backgroundBlurriness",0,1,.01),pc.addColor(Lm,"bgColor").onChange(()=>{pi.background=Lm.bgColor}),gR(),await mR()}function dR(){vs.aspect=window.innerWidth/window.innerHeight,vs.updateProjectionMatrix(),ui.setSize(window.innerWidth,window.innerHeight)}function fR(){_d.update(),os.update(),vR(),ui.render(pi,vs)}function C0(){requestAnimationFrame(C0),fR()}function pR(){if(Um.setFromCamera(xd,vs),Um.intersectObject(Zo,!0,fc),!fc.length){Hs.detach();return}Hs.attach(fc[0].object),fc.length=0}function Nm(n){xd.x=n.clientX/window.innerWidth*2-1,xd.y=-(n.clientY/window.innerHeight)*2+1}async function mR(){const n=new he(new Ki(.5).translate(0,.5,0),new Wt({color:16777215*Math.random(),roughness:0,metalness:1}));n.name="sphere",n.castShadow=!0,n.receiveShadow=!0,n.position.set(2,0,-1.5),Zo.add(n);const e=new he(new Lt(1,1,1).translate(0,.5,0),new Wt({color:16777215*Math.random(),roughness:.3,metalness:0}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-1.5,0,1.5),Zo.add(e);const i=(await A0.loadAsync(mn.monkey.url)).scene;i.name="suzanne",i.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0)}),Zo.add(i),Qs.clear(),C0()}function gR(){Qs=new VE(ui,pi,1024),Un=new GE({map:Qs.progressiveLightMap2.texture,transparent:!0,depthWrite:!1,toneMapped:!0,blend:2,alphaTest:0}),Un.color.set(0),Ua=new he(new Hn(1,1).rotateX(-Math.PI/2),Un),Ua.scale.setScalar(It.scale),Ua.receiveShadow=!0,pi.add(Ua),Qs.configure(Ua),io=new wt;for(let n=0;n<Ot.amount;n++){const e=new na(16777215,Ot.intensity/Ot.amount);e.name="dir_light_"+n,e.castShadow=!0,e.shadow.bias=Ot.bias,e.shadow.camera.near=Ot.near,e.shadow.camera.far=Ot.far,e.shadow.camera.right=Ot.size/2,e.shadow.camera.left=-Ot.size/2,e.shadow.camera.top=Ot.size/2,e.shadow.camera.bottom=-Ot.size/2,e.shadow.mapSize.width=Ot.mapSize,e.shadow.mapSize.height=Ot.mapSize,io.add(e)}xR(vd)}function _R(){const n=Ot.position.length();for(let e=0;e<io.children.length;e++){const t=io.children[e];if(Math.random()>Ot.ambient)t.position.set(Ot.position.x+xt.randFloatSpread(Ot.radius),Ot.position.y+xt.randFloatSpread(Ot.radius),Ot.position.z+xt.randFloatSpread(Ot.radius));else{let i=Math.acos(2*Math.random()-1)-Math.PI/2,s=2*Math.PI*Math.random();t.position.set(Math.cos(i)*Math.cos(s)*n,Math.abs(Math.cos(i)*Math.sin(s)*n),Math.sin(i)*n)}}}function pr(){console.log("reset"),Qs.clear(),Un.opacity=0,Un.alphaTest=0,qo.count=0,!It.temporal&&It.frames!==1/0&&P0(It.frames)}function vR(){(It.temporal||It.frames===1/0)&&qo.count<It.frames&&qo.count<It.limit&&(P0(),qo.count++)}function P0(n=1){It.blend=Math.max(2,It.frames===1/0?It.blend:It.frames),It.temporal?(Un.opacity=Math.min(It.opacity,Un.opacity+It.opacity/It.blend),Un.alphaTest=Math.min(It.alphaTest,Un.alphaTest+It.alphaTest/It.blend)):(Un.opacity=It.opacity,Un.alphaTest=It.alphaTest),pi.add(io),Qs.prepare();for(let e=0;e<n;e++)_R(),Qs.update(vs,It.blend);pi.remove(io),Qs.finish()}function xR(n){const e=n.addFolder("Shadow Material");e.open(),e.add(It,"opacity",0,1).onChange(s=>{Un.opacity=s}),e.add(It,"alphaTest",0,1).onChange(s=>{Un.alphaTest=s}),e.addColor(Un,"color"),e.add(Un,"blend",0,3);const t=n.addFolder("Shadow params");t.open(),t.add(It,"temporal"),t.add(qo,"resetPlm").name("Re compute ⚡").onChange(pr),t.add(It,"frames",2,100,1).onFinishChange(pr),t.add(It,"scale",.5,30).onChange(s=>{Ua.scale.setScalar(s)}).onFinishChange(pr),t.add(Ot,"radius",.1,5).onFinishChange(pr),t.add(Ot,"ambient",0,1).onFinishChange(pr);const i=n.addFolder("💡 Light source");i.open(),i.add(Ot.position,"x",-5,5).name("Light Direction X").onFinishChange(pr),i.add(Ot.position,"y",1,5).name("Light Direction Y").onFinishChange(pr),i.add(Ot.position,"z",-5,5).name("Light Direction Z").onFinishChange(pr)}let yd,Gs,Ys,mi,ls,wd,Sd=new ue;const Fm={bgColor:new ye,printCam:()=>{}},Ko=new wt,yR=new ho,D0=new Vn,I0=new Wn;let Vs;I0.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");D0.setDRACOLoader(I0);const Om=new Fn,mc=[];let gc;const Ac=[];async function wR(n){wd=n,gc=wd.addFolder("Scene"),yd=new gn,app.appendChild(yd.dom),Gs=new Gn({antialias:!0}),Gs.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),Gs.setSize(window.innerWidth,window.innerHeight),Gs.shadowMap.enabled=!0,app.appendChild(Gs.domElement),Ys=new yt(50,window.innerWidth/window.innerHeight,.1,200),Ys.position.set(6,3,6),Ys.name="Camera",mi=new cn,yR.load(Nn.skidpan.hdr,t=>{t.mapping=an,mi.backgroundBlurriness=.7,mi.background=t,mi.environment=t}),mi.add(Ko),ls=new Xn(Ys,Gs.domElement),ls.enableDamping=!0,ls.dampingFactor=.05,ls.minDistance=.1,ls.maxDistance=100,ls.maxPolarAngle=Math.PI/1.5,ls.target.set(0,0,0),ls.target.set(0,0,0),Vs=new ti(Ys,Gs.domElement),Vs.addEventListener("dragging-changed",t=>{ls.enabled=!t.value,t.value||plm.recalculate()}),Vs.addEventListener("change",()=>{Vs.object&&Vs.object.position.y<0&&(Vs.object.position.y=0)}),window.addEventListener("resize",SR),document.addEventListener("pointermove",Bm);let e=Date.now();document.addEventListener("pointerdown",()=>{e=Date.now()}),document.addEventListener("pointerup",t=>{Date.now()-e<200&&(Bm(t),bR())}),gc.add(Vs,"mode",["translate","rotate","scale"]),gc.add(mi,"backgroundBlurriness",0,1,.01),gc.addColor(Fm,"bgColor").onChange(()=>{mi.background=Fm.bgColor}),await ER(),TR()}function SR(){Ys.aspect=window.innerWidth/window.innerHeight,Ys.updateProjectionMatrix(),Gs.setSize(window.innerWidth,window.innerHeight)}function MR(){yd.update(),ls.update(),Ac.forEach(n=>{n()}),Gs.render(mi,Ys)}function L0(){requestAnimationFrame(L0),MR()}function bR(){if(Om.setFromCamera(Sd,Ys),Om.intersectObject(Ko,!0,mc),!mc.length){Vs.detach();return}Vs.attach(mc[0].object),mc.length=0}function Bm(n){Sd.x=n.clientX/window.innerWidth*2-1,Sd.y=-(n.clientY/window.innerHeight)*2+1}async function ER(){const n=new he(new Ki(.5).translate(0,.5,0),new Wt({color:16777215*Math.random(),roughness:0,metalness:1}));n.name="sphere",n.castShadow=!0,n.receiveShadow=!0,n.position.set(2,0,-3),Ko.add(n);const e=new he(new Lt(1,1,1).translate(0,.5,0),new Wt({color:16777215*Math.random(),roughness:.3,metalness:0}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-1.5,0,-3),Ko.add(e);const i=(await D0.loadAsync(mn.monkey.url)).scene;i.name="suzanne",i.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0)}),i.position.set(0,0,-3),Ko.add(i),mi.add(new Tx(10,10)),L0()}async function TR(){const n=Qh({startFrame:0,fps:40,autoPlay:!0,loop:!0,textureImageURL:"./sprites/flame.png",textureDataURL:"./sprites/flame.json",alphaTest:.01});await n.init(),n.group.position.set(0,2,1.2),n.group.scale.set(4,4,4),mi.add(n.group),Ac.push(n.update),du("flame NEW",n);const e=Qh({startFrame:0,autoPlay:!0,loop:!0,numberOfFrames:16,alphaTest:.01,textureImageURL:"./sprites/alien.png",asSprite:!1});await e.init(),e.group.scale.set(1,1,1),e.group.position.set(-2,.5,2.5),mi.add(e.group),du("Alien NEW",e),Ac.push(e.update);const t=Qh({frameName:"idle",fps:24,animationNames:["idle","celebration"],autoPlay:!0,loop:!0,alphaTest:.01,textureImageURL:"./sprites/boy_hash.png",textureDataURL:"./sprites/boy_hash.json"});await t.init(),t.group.scale.set(1,1,1),t.group.position.set(-2,.5,-1),mi.add(t.group),Ac.push(t.update),du("boySA NEW",t,["idle","celebration"])}function du(n,e,t=[]){const i=wd.addFolder(n);i.add(e,"pauseAnimation"),i.add(e,"playAnimation");for(const s of t){const r={playAnim:()=>{e.setFrameName(s)}};i.add(r,"playAnim").name("play: "+s).onChange(()=>{e.setFrameName(s)})}}const AR=xt.DEG2RAD,RR=xt.RAD2DEG;function CR(n,e=16/9){return Math.atan(Math.tan(n*AR*.5)/e)*RR*2}const Md=new ml;let bd,nn,qt,Qn,Vi,Kn,Kr,Ed=new ue;const PR=new wt,DR=new Vn,U0=new Wn;let ds;U0.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");DR.setDRACOLoader(U0);const km=new Fn,Po=[];let Na,Xa=new ue;const pf=new St(1,1,{samples:2});let Pn,Ca;const ea={cameraFov:50,renderOnlyPortal:!1,portalResolution:1},Do={R:null,steerL:null,steerR:null,steerVal:0},_c={R:null,steerL:null,steerR:null,steerVal:0};let Rc=()=>{};async function IR(n){Kr=n,Kr.close(),bd=new gn,app.appendChild(bd.dom),nn=new Gn({antialias:!0}),nn.setSize(window.innerWidth,window.innerHeight),nn.shadowMap.enabled=!0,nn.shadowMap.type=sn,nn.localClippingEnabled=!0,app.appendChild(nn.domElement),qt=new yt(ea.cameraFov,window.innerWidth/window.innerHeight,.1,200),qt.position.set(-1,.25,2),qt.name="Camera",Kr.add(ea,"cameraFov",10,120,1).onChange(i=>{qt.fov=i,qt.updateProjectionMatrix()}),Qn=new cn,Vi=new cn,nn.getSize(Xa),Qn.add(PR),Kn=new Xn(qt,nn.domElement),Kn.enableDamping=!0,Kn.dampingFactor=.05,Kn.minDistance=.1,Kn.maxDistance=100,Kn.target.set(0,-.5,-1),Kn.enabled=!1,ds=new ti(qt,nn.domElement),ds.addEventListener("dragging-changed",i=>{Kn.enabled=!i.value}),ds.showX=!1,ds.showY=!1,ds.addEventListener("change",()=>{ds.object&&Rc()}),Qn.add(ds.getHelper()),window.addEventListener("resize",Td),document.addEventListener("pointermove",zm);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",i=>{Date.now()-e<200&&(zm(i),LR())}),Td(),UR(),NR();const t=new co;Md.setGlobalProgress(Nn.old_hall.exr,0),t.load(Nn.old_hall.exr,i=>{i.mapping=an,Qn.environment=i,Vi.environment=i;const s=new ZE(i,5,10);Vi.add(s)},i=>{Md.setGlobalProgress(Nn.old_hall.exr,i.loaded/i.total)}),F0()}function Td(){qt.aspect=window.innerWidth/window.innerHeight,qt.aspect<1&&(qt.fov=CR(45,qt.aspect)),qt.updateProjectionMatrix(),nn.setSize(window.innerWidth,window.innerHeight),nn.getSize(Xa),pf.setSize(Xa.x*ea.portalResolution,Xa.y*ea.portalResolution)}function N0(){bd.update(),Kn.update(),ia(),ea.renderOnlyPortal?nn.render(Vi,qt):(nn.setRenderTarget(pf),nn.render(Vi,qt),nn.setRenderTarget(null),nn.render(Qn,qt))}function F0(){requestAnimationFrame(F0),N0()}function LR(){if(Po.length=0,km.setFromCamera(Ed,qt),km.intersectObject(Pn,!0,Po),!Po.length){ds.detach();return}Po[0].object.selectOnRaycast&&ds.attach(Po[0].object.selectOnRaycast)}function zm(n){Ed.x=n.clientX/window.innerWidth*2-1,Ed.y=-(n.clientY/window.innerHeight)*2+1}function UR(){Qn.background=new ye().setHSL(Math.random(),.3,.5),nn.getSize(Xa),Na=new he(new Hn,new aT({map:pf.texture,resolution:Xa})),Na.castShadow=!0,Na.scale.set(0,0,1),Qn.add(Na);const n=new Tt,e=[],t=.5;e.push(-t,-t,0,-t,t,0,t,t,0,t,-t,0),n.setAttribute("position",new ht(e,3));const i=new di(n,new qv({color:16755200,dashSize:.03,gapSize:.01}));i.computeLineDistances(),Na.add(i),i.material.color.setHSL(Math.random(),1,.5);const s=Kr.addFolder("scene");s.open(),s.addColor(Qn,"background")}async function NR(){Vi.background=new ye().set("#51c995");const e=(await uo(mn.porsche_1975.url,{loadingHelper:Md})).scene;e.scale.setScalar(.3),e.position.y=-.5,e.position.z=-1,e.name="car",e.traverse(m=>{m.positionBackup=m.position.clone(),m.isMesh&&(m.castShadow=!0,m.receiveShadow=!0,m.selectOnRaycast=e)});const t=new Hi(new D(0,0,1),0);Kr.add(t,"constant",0,5).name("Clipping plane constant"),Pn=e,Ca=e.clone(),Pn.traverse(m=>{m.isMesh&&(m.selectOnRaycast=Pn,m.material=m.material.clone(),m.material.clippingPlanes=[t],m.material.clipShadows=!0)}),Qn.add(Pn),Vi.add(Ca),Do.R=Pn.getObjectByName("wheels_rear"),Do.steerL=Pn.getObjectByName("wheel_L"),Do.steerR=Pn.getObjectByName("wheel_R"),_c.R=Ca.getObjectByName("wheels_rear"),_c.steerL=Ca.getObjectByName("wheel_L"),_c.steerR=Ca.getObjectByName("wheel_R"),Rc=()=>{Pn.position.z=xt.clamp(Pn.position.z,-1,1),Ca.position.copy(Pn.position);const m=Pn.position.z*(Math.PI*4);for(const p in Do){const y=Do[p],w=_c[p];y&&(y.rotation.x=m),y&&(w.rotation.x=m)}},await nn.compileAsync(Qn,qt),await nn.compileAsync(Vi,qt);const i=new vi(Pn.position).onStart(()=>{}).to({z:0}).duration(3e3).onUpdate((m,p)=>{Rc()}).easing(yn.Quadratic.InOut),s={val:0,camStart:new D,camEnd:new D(2,.2,.5),tarStart:new D,tarEnd:new D(0,0,0)},r=new vi(s).to({val:1}).delay(100).onStart(()=>{s.camStart.copy(qt.position),s.tarStart.copy(Kn.target)}).duration(1e3).onUpdate(()=>{qt.position.lerpVectors(s.camStart,s.camEnd,s.val),Kn.target.lerpVectors(s.tarStart,s.tarEnd,s.val)}).easing(yn.Quadratic.InOut).onComplete(()=>{Kn.enabled=!0,setTimeout(()=>{ds.object||(i.startFromCurrentValues(),Kr.openAnimated())},1e3)}),a=new vi(Pn.position).onStart(()=>{}).to({z:1}).delay(100).duration(3e3).onUpdate((m,p)=>{Kn.target.copy(Pn.position),Rc()}).easing(yn.Quadratic.InOut).chain(r).onComplete(()=>{}),o=new vi(qt.position).to({x:1.5,y:.2,z:.25}).duration(2e3).easing(yn.Quadratic.InOut).chain(a),l=new vi(Na.scale).to({x:1,y:1}).delay(1e3).duration(3e3).onUpdate(()=>{}).easing(yn.Quadratic.InOut).chain(o);N0(),l.start();const c=new Qd(.5,.25,150,20),h=new Wt({metalness:0,roughness:.2});h.color.setHSL(Math.random(),.4,.5);const u=new he(c,h);Vi.add(u),u.receiveShadow=!0,u.scale.setScalar(.2),u.position.z=-1,u.position.y=.2,Qn.add(u.clone()),u.material=h.clone(),u.material.color.setHSL(Math.random(),.4,.5);const d=new na(11272191,3);d.position.set(-2,3,2),d.castShadow=!0,d.shadow.mapSize.width=1024,d.shadow.mapSize.height=1024;const f=6;d.shadow.camera.left=-f,d.shadow.camera.right=f,d.shadow.camera.top=f,d.shadow.camera.bottom=-f,d.shadow.bias=-1e-4,d.shadow.blurSamples=6,d.shadow.radius=3,Qn.add(d.clone()),Vi.add(d);const _=new he(new qc(1.5,48).rotateX(-Math.PI/2),new Wt({color:"grey"}));_.name="shadowFloor",_.receiveShadow=!0,_.position.set(0,-.5,0),Qn.add(_),Vi.add(_.clone());const v=Kr.addFolder("portalScene");v.open(),v.add(ea,"portalResolution",.1,1).name("Portal Res").onChange(()=>Td()),v.add(ea,"renderOnlyPortal")}let Ad,oi,Zs,Oo,Os,Hm,Rd=new ue;const mf=new wt,O0=new Vn,B0=new Wn;let Bi;B0.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");O0.setDRACOLoader(B0);const Gm=new Fn,Pa=[];let fu,vc;async function FR(n){Hm=n,fu=Hm.addFolder("Scene"),Ad=new gn,app.appendChild(Ad.dom),oi=new Gn({antialias:!0}),oi.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),oi.setSize(window.innerWidth,window.innerHeight),oi.shadowMap.enabled=!0,oi.shadowMap.type=sn,oi.outputColorSpace=je,oi.toneMapping=Ji,app.appendChild(oi.domElement),Zs=new yt(50,window.innerWidth/window.innerHeight,.1,200),Zs.position.set(2,2,2),Zs.name="Camera",Oo=new cn,Oo.add(mf),Os=new Xn(Zs,oi.domElement),Os.enableDamping=!0,Os.dampingFactor=.05,Os.minDistance=.1,Os.maxDistance=100,Os.maxPolarAngle=Math.PI/1.5,Os.target.set(0,.5,0),Bi=new ti(Zs,oi.domElement),Bi.addEventListener("dragging-changed",i=>{Os.enabled=!i.value,i.value}),Bi.addEventListener("change",()=>{Bi.object&&Bi.object.position.y<0&&(Bi.object.position.y=0)}),Oo.add(Bi.getHelper()),window.addEventListener("resize",OR),document.addEventListener("pointermove",Vm);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",i=>{Date.now()-e<200&&(Vm(i),kR())}),fu.add(Bi,"mode",["translate","rotate","scale"]);const t=new sa(Oo);t.setBGType("GroundProjection"),t.setEnvType("HDRI"),t.updateAll(),t.addGui(fu),await zR(),k0()}function OR(){Zs.aspect=window.innerWidth/window.innerHeight,Zs.updateProjectionMatrix(),oi.setSize(window.innerWidth,window.innerHeight)}function BR(){Ad.update(),Os.update(),oi.render(Oo,Zs)}function k0(){requestAnimationFrame(k0),BR()}function kR(){if(Gm.setFromCamera(Rd,Zs),Gm.intersectObject(mf,!0,Pa),!Pa.length){Bi.detach();return}Pa[0].object.selectOnRaycast?Bi.attach(Pa[0].object.selectOnRaycast):Bi.attach(Pa[0].object),Pa.length=0}function Vm(n){Rd.x=n.clientX/window.innerWidth*2-1,Rd.y=-(n.clientY/window.innerHeight)*2+1}async function zR(){vc=(await O0.loadAsync(mn.monkey.url)).scene;const e=[];vc.traverse(t=>{t.isMesh&&(t.castShadow=!0,t.receiveShadow=!0,t.selectOnRaycast=vc,e.push(t))}),e.forEach(t=>{const i=KE({color:new ye("red"),thickness:.02});t.add(i.group),i.generate()}),mf.add(vc)}let Cd,Ws,Xi,vr,Bs,Wm,Pd=new ue;const z0=new wt,HR=new Vn,H0=new Wn;let fi;H0.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");HR.setDRACOLoader(H0);const Xm=new Fn,Da=[];let pu;async function GR(n){Wm=n,pu=Wm.addFolder("Scene"),Cd=new gn,app.appendChild(Cd.dom),Ws=new Gn({antialias:!0,alpha:!0}),Ws.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),Ws.setSize(window.innerWidth,window.innerHeight),app.appendChild(Ws.domElement),Xi=new yt(50,window.innerWidth/window.innerHeight,.1,200),Xi.position.set(2,2,2),Xi.name="Camera",vr=new cn,vr.add(z0),Bs=new Xn(Xi,Ws.domElement),Bs.enableDamping=!0,Bs.dampingFactor=.05,Bs.minDistance=.1,Bs.maxDistance=100,Bs.maxPolarAngle=Math.PI/1.5,Bs.target.set(0,.5,0),fi=new ti(Xi,Ws.domElement),fi.addEventListener("dragging-changed",i=>{Bs.enabled=!i.value,i.value}),fi.addEventListener("change",()=>{fi.object&&fi.object.position.y<0&&(fi.object.position.y=0)}),vr.add(fi.getHelper()),window.addEventListener("resize",VR),document.addEventListener("pointermove",$m);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",i=>{Date.now()-e<200&&($m(i),XR())}),pu.add(fi,"mode",["translate","rotate","scale"]);const t=new sa(vr);t.setBGType("Color"),t.bgColor.set("grey"),t.setEnvType("HDRI"),t.updateAll(),t.addGui(pu),vr.add(new Ax),$R(),G0()}function VR(){Xi.aspect=window.innerWidth/window.innerHeight,Xi.updateProjectionMatrix(),Ws.setSize(window.innerWidth,window.innerHeight)}function WR(){Cd.update(),Bs.update(),Ws.render(vr,Xi)}function G0(){requestAnimationFrame(G0),WR()}function XR(){if(Xm.setFromCamera(Pd,Xi),Xm.intersectObject(z0,!0,Da),!Da.length){fi.detach();return}Da[0].object.selectOnRaycast?fi.attach(Da[0].object.selectOnRaycast):fi.attach(Da[0].object),Da.length=0}function $m(n){Pd.x=n.clientX/window.innerWidth*2-1,Pd.y=-(n.clientY/window.innerHeight)*2+1}async function $R(){const n="https://huggingface.co/cakewalk/splat-data/resolve/main",e=new eT(Ws,25e3),[t,i]=await Promise.all([new Promise(a=>e.load(`${n}/nike.splat`,a))]),s=new am(t,Xi,{alphaTest:.1});s.scale.setScalar(.5),s.position.set(0,1.6,2),vr.add(s);const r=new am(t,Xi,{alphaTest:.1});r.scale.setScalar(.5),r.position.set(0,1.6,-1.5),r.rotation.set(Math.PI,0,Math.PI),vr.add(r),fi.attach(r)}let Dd,li,xs,Jn,hs,Xs,Id=new ue;const V0=new wt,jR=new Vn,W0=new Wn,YR=new tr;let ki;W0.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");jR.setDRACOLoader(W0);const jm=new Fn,Ia=[];let X0=()=>{},mu;async function ZR(n){Xs=n,mu=Xs.addFolder("Scene"),Dd=new gn,app.appendChild(Dd.dom),li=new Gn({antialias:!0}),li.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),li.setSize(window.innerWidth,window.innerHeight),li.shadowMap.enabled=!0,li.shadowMap.type=sn,li.outputColorSpace=je,li.toneMapping=tg,app.appendChild(li.domElement),xs=new yt(50,window.innerWidth/window.innerHeight,.1,200),xs.position.set(5,5,5),xs.name="Camera",Jn=new cn,Jn.add(V0),hs=new Xn(xs,li.domElement),hs.enableDamping=!0,hs.dampingFactor=.05,hs.minDistance=.1,hs.maxDistance=100,hs.maxPolarAngle=Math.PI/1.5,hs.target.set(0,.5,0),ki=new ti(xs,li.domElement),ki.addEventListener("dragging-changed",i=>{hs.enabled=!i.value,i.value}),ki.addEventListener("change",()=>{ki.object&&ki.object.position.y<0&&(ki.object.position.y=0)}),Jn.add(ki.getHelper()),window.addEventListener("resize",qR),document.addEventListener("pointermove",Ym);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",i=>{Date.now()-e<200&&(Ym(i),JR())}),mu.add(ki,"mode",["translate","rotate","scale"]);const t=new sa(Jn);t.setBGType("Default"),t.setEnvType("HDRI"),t.updateAll(),t.addGui(mu),await QR(),$0()}function qR(){xs.aspect=window.innerWidth/window.innerHeight,xs.updateProjectionMatrix(),li.setSize(window.innerWidth,window.innerHeight)}function KR(){Dd.update(),ia(),hs.update(),X0(),li.render(Jn,xs)}function $0(){requestAnimationFrame($0),KR()}function JR(){if(jm.setFromCamera(Id,xs),jm.intersectObject(V0,!0,Ia),!Ia.length){ki.detach();return}Ia[0].object.selectOnRaycast?ki.attach(Ia[0].object.selectOnRaycast):ki.attach(Ia[0].object),Ia.length=0}function Ym(n){Id.x=n.clientX/window.innerWidth*2-1,Id.y=-(n.clientY/window.innerHeight)*2+1}async function QR(){const n=new nf;n.intensity=Math.PI/1.5,Jn.add(n),Xs.add(n,"intensity",0,100).name("AmbientLight int");const e=[];{const a=new xr;a.intensity=30,a.position.fromArray([0,40,0]),a.distance=45,a.decay=0,a.penumbra=1,a.intensity=100,Jn.add(a);const o=new Ho(a);Xs.add(a,"intensity",0,100).name("SpotLight 1 int"),o.visible=!1,e.push(o),Jn.add(o)}{const a=new xr("red");a.intensity=30,a.position.fromArray([-20,0,10]),a.angle=.15,a.decay=0,a.penumbra=-1,a.intensity=30,Xs.add(a,"intensity",0,100).name("SpotLight 2 int"),Jn.add(a);const o=new Ho(a);o.visible=!1,e.push(o),Jn.add(o)}{const a=new xr("green");a.intensity=30,a.position.fromArray([20,-10,10]),a.angle=.2,a.decay=0,a.penumbra=-1,a.intensity=20,Xs.add(a,"intensity",0,100).name("SpotLight 3 int"),Jn.add(a);const o=new Ho(a);o.visible=!1,e.push(o),Jn.add(o)}const t=await YR.loadAsync(WE),i=new $E({texture:t,limit:1e3,frustumCulled:!1});Jn.add(i);function s(a){const o=new YE;a?o.position.fromArray(a):(o.position.random().multiplyScalar(20),o.bounds.set(xt.randInt(1,8),xt.randInt(1,4),xt.randInt(1,4)),o.color.setHSL(Math.random(),Math.random(),Math.random()),o.updateCloud()),i.ref.add(o.ref),eC(o),console.warn({[o.name]:o}),new vi(hs.target).to(o.position,500).easing(yn.Quadratic.InOut).start()}Xs.add({visible:!1},"visible").name("Helper visible").onChange(a=>e.forEach(o=>o.visible=a)),Xs.add({addCloud:s},"addCloud").name("Add new Cloud"),s([0,0,0]);const r=new Qc;X0=()=>{i.update(xs,r.getElapsedTime(),r.getDelta())}}function eC(n){const e=Xs.addFolder("Edit: "+n.name);e.onChange(()=>n.updateCloud()),e.addColor(n,"color"),e.add(n,"seed",0,100,1),e.add(n,"segments",1,80,1),e.add(n,"volume",0,100,.1),e.add(n,"opacity",0,1,.01),e.add(n,"fade",0,400,1),e.add(n,"growth",0,20,1),e.add(n,"speed",0,1,.01),e.add(n,"removeFromParent").onChange(()=>{e.destroy()});const t=e.addFolder("bounds").close();t.add(n.bounds,"x",0,25,.5),t.add(n.bounds,"y",0,25,.5),t.add(n.bounds,"z",0,25,.5);const i=e.addFolder("position").close();i.add(n.position,"x",-10,10,.1),i.add(n.position,"y",-10,10,.1),i.add(n.position,"z",-10,10,.1)}let Ld,Yn,ms,In,cs,Zm,Ii,Ud=new ue;const Or={environment:Nn.ulmer_muenster,groundProjection:!0,bgColor:new ye,printCam:()=>{}},cl=new wt,tC=new tr,nC=new co,iC=new ho,j0=new Vn,Y0=new Qr;Y0.setResponseType("blob");const Z0=new Wn;let zi;Z0.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");j0.setDRACOLoader(Z0);const qm=new Fn,La=[];let Xc,Km;const Cc=new ml;async function q0(n){Zm=n,Xc=Zm.addFolder("Scene"),Ld=new gn,app.appendChild(Ld.dom),Yn=new Gn({antialias:!0}),Yn.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),Yn.setSize(window.innerWidth,window.innerHeight),Yn.shadowMap.enabled=!0,Yn.shadowMap.type=sn,Yn.outputColorSpace=je,Yn.toneMapping=Ji,Km=new kc(Yn),Km.compileCubemapShader(),app.appendChild(Yn.domElement),ms=new yt(50,window.innerWidth/window.innerHeight,.1,200),ms.position.set(6,3,6),ms.name="Camera",ms.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),In=new cn,In.add(cl),cs=new Xn(ms,Yn.domElement),cs.enableDamping=!0,cs.dampingFactor=.05,cs.minDistance=.1,cs.maxDistance=100,cs.maxPolarAngle=Math.PI/1.5,cs.target.set(0,0,0),cs.target.set(0,0,0),zi=new ti(ms,Yn.domElement),zi.addEventListener("dragging-changed",t=>{cs.enabled=!t.value,t.value}),zi.addEventListener("change",()=>{zi.object&&zi.object.position.y<0&&(zi.object.position.y=0)}),In.add(zi.getHelper()),window.addEventListener("resize",rC),document.addEventListener("pointermove",Jm);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",t=>{Date.now()-e<200&&(Jm(t),oC())}),Xc.add(zi,"mode",["translate","rotate","scale"]),sC(),lC(),K0()}async function sC(){let n=new wt,e=new na(16777195,1);e.name="Dir. Light",e.castShadow=!0,e.shadow.camera.near=.1,e.shadow.camera.far=50,e.shadow.camera.right=15,e.shadow.camera.left=-15,e.shadow.camera.top=15,e.shadow.camera.bottom=-15,e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.radius=1.95,e.shadow.blurSamples=6,e.shadow.bias=-5e-4,n.add(e),In.add(n);const t=new he(new Hn(10,10).rotateX(-Math.PI/2),new ef({}));t.name="shadowFloor",t.receiveShadow=!0,t.position.set(0,0,0),In.add(t);async function i(r){try{if(!r){In.background=null,In.environment=null;return}const a=async()=>{if(!r.exr)return;const c=await nC.loadAsync(r.exr,h=>Cc.setGlobalProgress(r.exr,h.loaded/h.total));c.mapping=an,In.environment=c,console.log("exr loaded")},o=async()=>{if(!r.hdr)return;const c=await iC.loadAsync(r.hdr,h=>Cc.setGlobalProgress(r.hdr,h.loaded/h.total));c.mapping=an,In.environment=c,console.log("hdr loaded")},l=async()=>{const c=r.webP||r.avif;if(c){const h=await Y0.loadAsync(c,f=>Cc.setGlobalProgress(c,f.loaded/f.total)),u=URL.createObjectURL(h),d=await tC.loadAsync(u);URL.revokeObjectURL(u),d.mapping=an,d.colorSpace=je,In.background=d,console.log("Background loaded"),Or.groundProjection&&s(Or.environment)}};await Promise.all([a(),o(),l()]),r.sunPos?(e.visible=!0,e.position.fromArray(r.sunPos)):e.visible=!1,r.sunCol?e.color.set(r.sunCol):e.color.set(16777215),r.shadowOpacity&&(t.material.opacity=r.shadowOpacity)}catch(a){console.warn(a)}}function s(r){Or.groundProjection&&In.background&&r.groundProj?(Ii||(Ii=new th(In.background),Ii.scale.setScalar(100)),Ii.material.uniforms.map.value=In.background,Ii.radius=r.groundProj.radius,Ii.height=r.groundProj.height,Ii.parent||In.add(Ii)):Ii&&Ii.parent&&Ii.removeFromParent()}await i(Or.environment),Xc.add(Or,"environment",Nn).onChange(r=>{i(r)}),Xc.add(Or,"groundProjection").onChange(r=>{s(Or.environment)})}function rC(){ms.aspect=window.innerWidth/window.innerHeight,ms.updateProjectionMatrix(),Yn.setSize(window.innerWidth,window.innerHeight)}function aC(){Ld.update(),cs.update(),Yn.render(In,ms)}function K0(){requestAnimationFrame(K0),aC()}function oC(){if(qm.setFromCamera(Ud,ms),qm.intersectObject(cl,!0,La),!La.length){zi.detach();return}La[0].object.selectOnRaycast?zi.attach(La[0].object.selectOnRaycast):zi.attach(La[0].object),La.length=0}function Jm(n){Ud.x=n.clientX/window.innerWidth*2-1,Ud.y=-(n.clientY/window.innerHeight)*2+1}async function lC(){const n=new he(new Ki(.5).translate(0,.5,0),new Wt({color:Qm(),roughness:0,metalness:1}));n.name="sphere",n.castShadow=!0,n.receiveShadow=!0,n.position.set(2,0,-1.5),cl.add(n);const e=new he(new Lt(1,1,1).translate(0,.5,0),new Wt({color:Qm(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),cl.add(e),cC()}async function cC(){const e=(await j0.loadAsync(mn.porsche_1975.url,t=>{Cc.setGlobalProgress(mn.porsche_1975.url,t.loaded/t.total)})).scene;e.name="car",e.traverse(t=>{t.isMesh&&(t.castShadow=!0,t.receiveShadow=!0,t.selectOnRaycast=e,t.name)}),cl.add(e)}const hC=new ye;function Qm(){return"#"+hC.setHSL(Math.random(),.5,.5).getHexString()}let uC=window.location.href,dC=new URL(uC);const so={MeshTransmissionMaterial:kT,PCSS:qT,SpotLight:s1,SpotLight1:IA,RealismEffects:zA,Caustics:sR,MeshReflectionMaterial:VA,AccumulativeShadows:uR,SpriteAnimator:wR,MeshPortalMaterial:IR,Outlines:FR,Splat:GR,MeshTransmissionMaterialBasic:qA,Cloud:ZR,CameraShake:q0},fC=[q0],Si={sceneName:dC.searchParams.get("scene")||Object.keys(so)[0],sceneInitFunction:()=>{}};Si.sceneName=Si.sceneName.replace("WIP_","");Si.sceneName==="MeshTransmissionMaterial1"&&(Si.sceneName="MeshTransmissionMaterialBasic");function J0(n){console.log({path:n});const e=new URLSearchParams(window.location.search);e.set("scene",n),window.history.replaceState({},"",`${window.location.pathname}?${e}`),document.title=`Explore | ${n}`}const pC=fC.includes(so[Si.sceneName])?"⚠ WIP "+gf:"Explore Drei Vanilla "+gf,Q0=new Nd({title:pC,closeFolders:!0});Object.keys(so).includes(Si.sceneName)||(Si.sceneName=Object.keys(so)[0]);Q0.add(Si,"sceneName",Object.keys(so)).name("SCENE").onChange(n=>{console.log({v:n}),J0(n),window.location.reload()});Si.sceneInitFunction=so[Si.sceneName];Si.sceneInitFunction(Q0);J0(Si.sceneName);
