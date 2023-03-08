const du=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}};du();const fu="0.0.3";/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.18.0
 * @author George Michael Brower
 * @license MIT
 */class kn{constructor(e,t,n,i,s="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),kn.nextNameID=kn.nextNameID||0,this.$name.id=`lil-gui-name-${++kn.nextNameID}`,this.$widget=document.createElement(s),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class pu extends kn{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Ko(r){let e,t;return(e=r.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=r.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=r.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const mu={isPrimitive:!0,match:r=>typeof r=="string",fromHexString:Ko,toHexString:Ko},er={isPrimitive:!0,match:r=>typeof r=="number",fromHexString:r=>parseInt(r.substring(1),16),toHexString:r=>"#"+r.toString(16).padStart(6,0)},gu={isPrimitive:!1,match:r=>Array.isArray(r),fromHexString(r,e,t=1){const n=er.fromHexString(r);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([r,e,t],n=1){n=255/n;const i=r*n<<16^e*n<<8^t*n<<0;return er.toHexString(i)}},_u={isPrimitive:!1,match:r=>Object(r)===r,fromHexString(r,e,t=1){const n=er.fromHexString(r);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r,g:e,b:t},n=1){n=255/n;const i=r*n<<16^e*n<<8^t*n<<0;return er.toHexString(i)}},xu=[mu,er,gu,_u];function vu(r){return xu.find(e=>e.match(r))}class yu extends kn{constructor(e,t,n,i){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=vu(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=Ko(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class oo extends kn{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class wu extends kn{constructor(e,t,n,i,s,o){super(e,t,n,"number"),this._initInput(),this.min(i),this.max(s);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let _=parseFloat(this.$input.value);isNaN(_)||(this._stepExplicit&&(_=this._snap(_)),this.setValue(this._clamp(_)))},t=_=>{const b=parseFloat(this.$input.value);isNaN(b)||(this._snapClampSetValue(b+_),this.$input.value=this.getValue())},n=_=>{_.code==="Enter"&&this.$input.blur(),_.code==="ArrowUp"&&(_.preventDefault(),t(this._step*this._arrowKeyMultiplier(_))),_.code==="ArrowDown"&&(_.preventDefault(),t(this._step*this._arrowKeyMultiplier(_)*-1))},i=_=>{this._inputFocused&&(_.preventDefault(),t(this._step*this._normalizeMouseWheel(_)))};let s=!1,o,a,l,c,h;const u=5,d=_=>{o=_.clientX,a=l=_.clientY,s=!0,c=this.getValue(),h=0,window.addEventListener("mousemove",m),window.addEventListener("mouseup",x)},m=_=>{if(s){const b=_.clientX-o,v=_.clientY-a;Math.abs(v)>u?(_.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(b)>u&&x()}s||(h-=(_.clientY-l)*this._step*this._arrowKeyMultiplier(_),c+h>this._max?h=this._max-c:c+h<this._min&&(h=this._min-c),this._snapClampSetValue(c+h)),l=_.clientY},x=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",m),window.removeEventListener("mouseup",x)},p=()=>{this._inputFocused=!0},f=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",i,{passive:!1}),this.$input.addEventListener("mousedown",d),this.$input.addEventListener("focus",p),this.$input.addEventListener("blur",f)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(_,b,v,y,S)=>(_-b)/(v-b)*(S-y)+y,t=_=>{const b=this.$slider.getBoundingClientRect();let v=e(_,b.left,b.right,this._min,this._max);this._snapClampSetValue(v)},n=_=>{this._setDraggingStyle(!0),t(_.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)},i=_=>{t(_.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)};let o=!1,a,l;const c=_=>{_.preventDefault(),this._setDraggingStyle(!0),t(_.touches[0].clientX),o=!1},h=_=>{_.touches.length>1||(this._hasScrollBar?(a=_.touches[0].clientX,l=_.touches[0].clientY,o=!0):c(_),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",d))},u=_=>{if(o){const b=_.touches[0].clientX-a,v=_.touches[0].clientY-l;Math.abs(b)>Math.abs(v)?c(_):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d))}else _.preventDefault(),t(_.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d)},m=this._callOnFinishChange.bind(this),x=400;let p;const f=_=>{if(Math.abs(_.deltaX)<Math.abs(_.deltaY)&&this._hasScrollBar)return;_.preventDefault();const v=this._normalizeMouseWheel(_)*this._step;this._snapClampSetValue(this.getValue()+v),this.$input.value=this.getValue(),clearTimeout(p),p=setTimeout(m,x)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",f,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class bu extends kn{constructor(e,t,n,i){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(i)?i:Object.values(i),this._names=Array.isArray(i)?i:Object.keys(i),this._names.forEach(s=>{const o=document.createElement("option");o.innerHTML=s,this.$select.appendChild(o)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.innerHTML=t===-1?e:this._names[t],this}}class Mu extends kn{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const Su=`.lil-gui {
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
  content: "\u2195";
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
  content: "\u25BE";
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
  content: "\u25B8";
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
  content: "\u2713";
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
}`;function Eu(r){const e=document.createElement("style");e.innerHTML=r;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let Ga=!1;class ya{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:i,title:s="Controls",closeFolders:o=!1,injectStyles:a=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",c=>{(c.code==="Enter"||c.code==="Space")&&(c.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),l&&this.domElement.classList.add("allow-touch-styles"),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),!Ga&&a&&(Eu(Su),Ga=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this._closeFolders=o,this.domElement.addEventListener("keydown",c=>c.stopPropagation()),this.domElement.addEventListener("keyup",c=>c.stopPropagation())}add(e,t,n,i,s){if(Object(n)===n)return new bu(this,e,t,n);const o=e[t];switch(typeof o){case"number":return new wu(this,e,t,n,i,s);case"boolean":return new pu(this,e,t);case"string":return new Mu(this,e,t);case"function":return new oo(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,o)}addColor(e,t,n=1){return new yu(this,e,t,n)}addFolder(e){const t=new ya({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof oo||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof oo)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}var qs=function(){var r=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(h){h.preventDefault(),n(++r%e.children.length)},!1);function t(h){return e.appendChild(h.dom),h}function n(h){for(var u=0;u<e.children.length;u++)e.children[u].style.display=u===h?"block":"none";r=h}var i=(performance||Date).now(),s=i,o=0,a=t(new qs.Panel("FPS","#0ff","#002")),l=t(new qs.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=t(new qs.Panel("MB","#f08","#201"));return n(0),{REVISION:16,dom:e,addPanel:t,showPanel:n,begin:function(){i=(performance||Date).now()},end:function(){o++;var h=(performance||Date).now();if(l.update(h-i,200),h>=s+1e3&&(a.update(o*1e3/(h-s),100),s=h,o=0,c)){var u=performance.memory;c.update(u.usedJSHeapSize/1048576,u.jsHeapSizeLimit/1048576)}return h},update:function(){i=this.end()},domElement:e,setMode:n}};qs.Panel=function(r,e,t){var n=1/0,i=0,s=Math.round,o=s(window.devicePixelRatio||1),a=80*o,l=48*o,c=3*o,h=2*o,u=3*o,d=15*o,m=74*o,x=30*o,p=document.createElement("canvas");p.width=a,p.height=l,p.style.cssText="width:80px;height:48px";var f=p.getContext("2d");return f.font="bold "+9*o+"px Helvetica,Arial,sans-serif",f.textBaseline="top",f.fillStyle=t,f.fillRect(0,0,a,l),f.fillStyle=e,f.fillText(r,c,h),f.fillRect(u,d,m,x),f.fillStyle=t,f.globalAlpha=.9,f.fillRect(u,d,m,x),{dom:p,update:function(_,b){n=Math.min(n,_),i=Math.max(i,_),f.fillStyle=t,f.globalAlpha=1,f.fillRect(0,0,a,d),f.fillStyle=e,f.fillText(s(_)+" "+r+" ("+s(n)+"-"+s(i)+")",c,h),f.drawImage(p,u+o,d,m-o,x,u,d,m-o,x),f.fillRect(u+m-o,d,o,x),f.fillStyle=t,f.globalAlpha=.9,f.fillRect(u+m-o,d,o,s((1-_/b)*x))}}};var wa=qs;/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ba="150",Ui={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ki={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Tu=0,Va=1,Au=2,nh=1,Cu=2,Li=3,ti=0,en=1,Sn=2,gi=0,as=1,Wa=2,Xa=3,ja=4,Lu=5,es=100,Ru=101,Pu=102,qa=103,$a=104,Du=200,Iu=201,Nu=202,Fu=203,ih=204,sh=205,Ou=206,Uu=207,ku=208,zu=209,Bu=210,Hu=0,Gu=1,Vu=2,Jo=3,Wu=4,Xu=5,ju=6,qu=7,rh=0,$u=1,Yu=2,zn=0,Zu=1,Ku=2,Ju=3,$r=4,Qu=5,oh=300,us=301,ds=302,fs=303,Qo=304,Yr=306,ps=1e3,Qt=1001,Xr=1002,Lt=1003,ea=1004,Gr=1005,ut=1006,ah=1007,xi=1008,Pi=1009,ed=1010,td=1011,Ma=1012,nd=1013,Ri=1014,En=1015,fn=1016,id=1017,sd=1018,ls=1020,rd=1021,sn=1023,od=1024,ad=1025,_i=1026,ms=1027,lh=1028,ld=1029,cd=1030,hd=1031,ud=1033,ao=33776,lo=33777,co=33778,ho=33779,Ya=35840,Za=35841,Ka=35842,Ja=35843,dd=36196,Qa=37492,el=37496,tl=37808,nl=37809,il=37810,sl=37811,rl=37812,ol=37813,al=37814,ll=37815,cl=37816,hl=37817,ul=37818,dl=37819,fl=37820,pl=37821,uo=36492,fd=36283,ml=36284,gl=36285,_l=36286,tr=2300,gs=2301,fo=2302,xl=2400,vl=2401,yl=2402,pd=2500,md=0,ch=1,ta=2,ni=3e3,Je=3001,gd=3200,_d=3201,hh=0,xd=1,hn="srgb",_s="srgb-linear",uh="display-p3",po=7680,vd=519,na=35044,wl="300 es",ia=1035;class Ni{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let bl=1234567;const $s=Math.PI/180,nr=180/Math.PI;function An(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(zt[r&255]+zt[r>>8&255]+zt[r>>16&255]+zt[r>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[t&63|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[n&255]+zt[n>>8&255]+zt[n>>16&255]+zt[n>>24&255]).toLowerCase()}function Ft(r,e,t){return Math.max(e,Math.min(t,r))}function Sa(r,e){return(r%e+e)%e}function yd(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function wd(r,e,t){return r!==e?(t-r)/(e-r):0}function Ys(r,e,t){return(1-t)*r+t*e}function bd(r,e,t,n){return Ys(r,e,1-Math.exp(-t*n))}function Md(r,e=1){return e-Math.abs(Sa(r,e*2)-e)}function Sd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Ed(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Td(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Ad(r,e){return r+Math.random()*(e-r)}function Cd(r){return r*(.5-Math.random())}function Ld(r){r!==void 0&&(bl=r);let e=bl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Rd(r){return r*$s}function Pd(r){return r*nr}function sa(r){return(r&r-1)===0&&r!==0}function dh(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function fh(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Dd(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),d=o((e-n)/2),m=s((n-e)/2),x=o((n-e)/2);switch(i){case"XYX":r.set(a*h,l*u,l*d,a*c);break;case"YZY":r.set(l*d,a*h,l*u,a*c);break;case"ZXZ":r.set(l*u,l*d,a*h,a*c);break;case"XZX":r.set(a*h,l*x,l*m,a*c);break;case"YXY":r.set(l*m,a*h,l*x,a*c);break;case"ZYZ":r.set(l*x,l*m,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ei(r,e){switch(e.constructor){case Float32Array:return r;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ot(r,e){switch(e.constructor){case Float32Array:return r;case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const is={DEG2RAD:$s,RAD2DEG:nr,generateUUID:An,clamp:Ft,euclideanModulo:Sa,mapLinear:yd,inverseLerp:wd,lerp:Ys,damp:bd,pingpong:Md,smoothstep:Sd,smootherstep:Ed,randInt:Td,randFloat:Ad,randFloatSpread:Cd,seededRandom:Ld,degToRad:Rd,radToDeg:Pd,isPowerOfTwo:sa,ceilPowerOfTwo:dh,floorPowerOfTwo:fh,setQuaternionFromProperEuler:Dd,normalize:ot,denormalize:ei};class Ue{constructor(e=0,t=0){Ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,n,i,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],m=n[5],x=n[8],p=i[0],f=i[3],_=i[6],b=i[1],v=i[4],y=i[7],S=i[2],R=i[5],I=i[8];return s[0]=o*p+a*b+l*S,s[3]=o*f+a*v+l*R,s[6]=o*_+a*y+l*I,s[1]=c*p+h*b+u*S,s[4]=c*f+h*v+u*R,s[7]=c*_+h*y+u*I,s[2]=d*p+m*b+x*S,s[5]=d*f+m*v+x*R,s[8]=d*_+m*y+x*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*s,m=c*s-o*l,x=t*u+n*d+i*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const p=1/x;return e[0]=u*p,e[1]=(i*c-h*n)*p,e[2]=(a*n-i*o)*p,e[3]=d*p,e[4]=(h*t-i*l)*p,e[5]=(i*s-a*t)*p,e[6]=m*p,e[7]=(n*l-c*t)*p,e[8]=(o*t-n*s)*p,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(mo.makeScale(e,t)),this}rotate(e){return this.premultiply(mo.makeRotation(-e)),this}translate(e,t){return this.premultiply(mo.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const mo=new Zt;function ph(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function ir(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}class Mt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],m=s[o+1],x=s[o+2],p=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=m,e[t+2]=x,e[t+3]=p;return}if(u!==p||l!==d||c!==m||h!==x){let f=1-a;const _=l*d+c*m+h*x+u*p,b=_>=0?1:-1,v=1-_*_;if(v>Number.EPSILON){const S=Math.sqrt(v),R=Math.atan2(S,_*b);f=Math.sin(f*R)/S,a=Math.sin(a*R)/S}const y=a*b;if(l=l*f+d*y,c=c*f+m*y,h=h*f+x*y,u=u*f+p*y,f===1-a){const S=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=S,c*=S,h*=S,u*=S}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],d=s[o+1],m=s[o+2],x=s[o+3];return e[t]=a*x+h*u+l*m-c*d,e[t+1]=l*x+h*d+c*u-a*m,e[t+2]=c*x+h*m+a*d-l*u,e[t+3]=h*x-a*u-l*d-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),m=l(i/2),x=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*m*x,this._y=c*m*u-d*h*x,this._z=c*h*x+d*m*u,this._w=c*h*u-d*m*x;break;case"YXZ":this._x=d*h*u+c*m*x,this._y=c*m*u-d*h*x,this._z=c*h*x-d*m*u,this._w=c*h*u+d*m*x;break;case"ZXY":this._x=d*h*u-c*m*x,this._y=c*m*u+d*h*x,this._z=c*h*x+d*m*u,this._w=c*h*u-d*m*x;break;case"ZYX":this._x=d*h*u-c*m*x,this._y=c*m*u+d*h*x,this._z=c*h*x-d*m*u,this._w=c*h*u+d*m*x;break;case"YZX":this._x=d*h*u+c*m*x,this._y=c*m*u+d*h*x,this._z=c*h*x-d*m*u,this._w=c*h*u-d*m*x;break;case"XZY":this._x=d*h*u-c*m*x,this._y=c*m*u-d*h*x,this._z=c*h*x+d*m*u,this._w=c*h*u+d*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-l)*m,this._y=(s-c)*m,this._z=(o-i)*m}else if(n>a&&n>u){const m=2*Math.sqrt(1+n-a-u);this._w=(h-l)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(s+c)/m}else if(a>u){const m=2*Math.sqrt(1+a-n-u);this._w=(s-c)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-n-a);this._w=(o-i)/m,this._x=(s+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ft(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ml.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ml.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=l*t+o*i-a*n,h=l*n+a*t-s*i,u=l*i+s*n-o*t,d=-s*t-o*n-a*i;return this.x=c*l+d*-s+h*-a-u*-o,this.y=h*l+d*-o+u*-s-c*-a,this.z=u*l+d*-a+c*-o-h*-s,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return go.copy(this).projectOnVector(e),this.sub(go)}reflect(e){return this.sub(go.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const go=new P,Ml=new Mt;function cs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function _o(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const Id=new Zt().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),Nd=new Zt().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]),pi=new P;function Fd(r){return r.convertSRGBToLinear(),pi.set(r.r,r.g,r.b).applyMatrix3(Nd),r.setRGB(pi.x,pi.y,pi.z)}function Od(r){return pi.set(r.r,r.g,r.b).applyMatrix3(Id),r.setRGB(pi.x,pi.y,pi.z).convertLinearToSRGB()}const Ud={[_s]:r=>r,[hn]:r=>r.convertSRGBToLinear(),[uh]:Fd},kd={[_s]:r=>r,[hn]:r=>r.convertLinearToSRGB(),[uh]:Od},jt={enabled:!1,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(r){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!r},get workingColorSpace(){return _s},set workingColorSpace(r){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=Ud[e],i=kd[t];if(n===void 0||i===void 0)throw new Error(`Unsupported color space conversion, "${e}" to "${t}".`);return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)}};let zi;class mh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{zi===void 0&&(zi=ir("canvas")),zi.width=e.width,zi.height=e.height;const n=zi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=zi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){const t=ir("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=cs(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(cs(t[n]/255)*255):t[n]=cs(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class gh{constructor(e=null){this.isSource=!0,this.uuid=An(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(xo(i[o].image)):s.push(xo(i[o]))}else s=xo(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function xo(r){return typeof HTMLImageElement!="undefined"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&r instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&r instanceof ImageBitmap?mh.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let zd=0;class Ut extends Ni{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,n=Qt,i=Qt,s=ut,o=xi,a=sn,l=Pi,c=Ut.DEFAULT_ANISOTROPY,h=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zd++}),this.uuid=An(),this.name="",this.source=new gh(e),this.mipmaps=[],this.mapping=t,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==oh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ps:e.x=e.x-Math.floor(e.x);break;case Qt:e.x=e.x<0?0:1;break;case Xr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ps:e.y=e.y-Math.floor(e.y);break;case Qt:e.y=e.y<0?0:1;break;case Xr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=oh;Ut.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,n=0,i=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],m=l[5],x=l[9],p=l[2],f=l[6],_=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-p)<.01&&Math.abs(x-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+p)<.1&&Math.abs(x+f)<.1&&Math.abs(c+m+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,y=(m+1)/2,S=(_+1)/2,R=(h+d)/4,I=(u+p)/4,w=(x+f)/4;return v>y&&v>S?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=R/n,s=I/n):y>S?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=R/i,s=w/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=I/s,i=w/s),this.set(n,i,s,t),this}let b=Math.sqrt((f-x)*(f-x)+(u-p)*(u-p)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(f-x)/b,this.y=(u-p)/b,this.z=(d-h)/b,this.w=Math.acos((c+m+_-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Hn extends Ni{constructor(e=1,t=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const i={width:e,height:t,depth:1};this.texture=new Ut(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:ut,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new gh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _h extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Qt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bd extends Ut{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Qt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ys{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.length;l<c;l+=3){const h=e[l],u=e[l+1],d=e[l+2];h<t&&(t=h),u<n&&(n=u),d<i&&(i=d),h>s&&(s=h),u>o&&(o=u),d>a&&(a=d)}return this.min.set(t,n,i),this.max.set(s,o,a),this}setFromBufferAttribute(e){let t=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.count;l<c;l++){const h=e.getX(l),u=e.getY(l),d=e.getZ(l);h<t&&(t=h),u<n&&(n=u),d<i&&(i=d),h>s&&(s=h),u>o&&(o=u),d>a&&(a=d)}return this.min.set(t,n,i),this.max.set(s,o,a),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=vi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0)if(t&&n.attributes!=null&&n.attributes.position!==void 0){const s=n.attributes.position;for(let o=0,a=s.count;o<a;o++)vi.fromBufferAttribute(s,o).applyMatrix4(e.matrixWorld),this.expandByPoint(vi)}else n.boundingBox===null&&n.computeBoundingBox(),vo.copy(n.boundingBox),vo.applyMatrix4(e.matrixWorld),this.union(vo);const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,vi),vi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Cs),mr.subVectors(this.max,Cs),Bi.subVectors(e.a,Cs),Hi.subVectors(e.b,Cs),Gi.subVectors(e.c,Cs),ri.subVectors(Hi,Bi),oi.subVectors(Gi,Hi),yi.subVectors(Bi,Gi);let t=[0,-ri.z,ri.y,0,-oi.z,oi.y,0,-yi.z,yi.y,ri.z,0,-ri.x,oi.z,0,-oi.x,yi.z,0,-yi.x,-ri.y,ri.x,0,-oi.y,oi.x,0,-yi.y,yi.x,0];return!yo(t,Bi,Hi,Gi,mr)||(t=[1,0,0,0,1,0,0,0,1],!yo(t,Bi,Hi,Gi,mr))?!1:(gr.crossVectors(ri,oi),t=[gr.x,gr.y,gr.z],yo(t,Bi,Hi,Gi,mr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Xn=[new P,new P,new P,new P,new P,new P,new P,new P],vi=new P,vo=new ys,Bi=new P,Hi=new P,Gi=new P,ri=new P,oi=new P,yi=new P,Cs=new P,mr=new P,gr=new P,wi=new P;function yo(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){wi.fromArray(r,s);const a=i.x*Math.abs(wi.x)+i.y*Math.abs(wi.y)+i.z*Math.abs(wi.z),l=e.dot(wi),c=t.dot(wi),h=n.dot(wi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Hd=new ys,Ls=new P,wo=new P;class ws{constructor(e=new P,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Hd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ls.subVectors(e,this.center);const t=Ls.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ls,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ls.copy(e.center).add(wo)),this.expandByPoint(Ls.copy(e.center).sub(wo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const jn=new P,bo=new P,_r=new P,ai=new P,Mo=new P,xr=new P,So=new P;class Zr{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jn.copy(this.origin).addScaledVector(this.direction,t),jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){bo.copy(e).add(t).multiplyScalar(.5),_r.copy(t).sub(e).normalize(),ai.copy(this.origin).sub(bo);const s=e.distanceTo(t)*.5,o=-this.direction.dot(_r),a=ai.dot(this.direction),l=-ai.dot(_r),c=ai.lengthSq(),h=Math.abs(1-o*o);let u,d,m,x;if(h>0)if(u=o*l-a,d=o*a-l,x=s*h,u>=0)if(d>=-x)if(d<=x){const p=1/h;u*=p,d*=p,m=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;else d<=-x?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),m=-u*u+d*(d+2*l)+c):d<=x?(u=0,d=Math.min(Math.max(-s,-l),s),m=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),m=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(bo).addScaledVector(_r,d),m}intersectSphere(e,t){jn.subVectors(e.center,this.origin);const n=jn.dot(this.direction),i=jn.dot(jn)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,jn)!==null}intersectTriangle(e,t,n,i,s){Mo.subVectors(t,e),xr.subVectors(n,e),So.crossVectors(Mo,xr);let o=this.direction.dot(So),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ai.subVectors(this.origin,e);const l=a*this.direction.dot(xr.crossVectors(ai,xr));if(l<0)return null;const c=a*this.direction.dot(Mo.cross(ai));if(c<0||l+c>o)return null;const h=-a*ai.dot(So);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $e{constructor(){$e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,n,i,s,o,a,l,c,h,u,d,m,x,p,f){const _=this.elements;return _[0]=e,_[4]=t,_[8]=n,_[12]=i,_[1]=s,_[5]=o,_[9]=a,_[13]=l,_[2]=c,_[6]=h,_[10]=u,_[14]=d,_[3]=m,_[7]=x,_[11]=p,_[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $e().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Vi.setFromMatrixColumn(e,0).length(),s=1/Vi.setFromMatrixColumn(e,1).length(),o=1/Vi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=o*h,m=o*u,x=a*h,p=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=m+x*c,t[5]=d-p*c,t[9]=-a*l,t[2]=p-d*c,t[6]=x+m*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,m=l*u,x=c*h,p=c*u;t[0]=d+p*a,t[4]=x*a-m,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=m*a-x,t[6]=p+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,m=l*u,x=c*h,p=c*u;t[0]=d-p*a,t[4]=-o*u,t[8]=x+m*a,t[1]=m+x*a,t[5]=o*h,t[9]=p-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,m=o*u,x=a*h,p=a*u;t[0]=l*h,t[4]=x*c-m,t[8]=d*c+p,t[1]=l*u,t[5]=p*c+d,t[9]=m*c-x,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,m=o*c,x=a*l,p=a*c;t[0]=l*h,t[4]=p-d*u,t[8]=x*u+m,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=m*u+x,t[10]=d-p*u}else if(e.order==="XZY"){const d=o*l,m=o*c,x=a*l,p=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+p,t[5]=o*h,t[9]=m*u-x,t[2]=x*u-m,t[6]=a*h,t[10]=p*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Gd,e,Vd)}lookAt(e,t,n){const i=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),li.crossVectors(n,tn),li.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),li.crossVectors(n,tn)),li.normalize(),vr.crossVectors(tn,li),i[0]=li.x,i[4]=vr.x,i[8]=tn.x,i[1]=li.y,i[5]=vr.y,i[9]=tn.y,i[2]=li.z,i[6]=vr.z,i[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],m=n[13],x=n[2],p=n[6],f=n[10],_=n[14],b=n[3],v=n[7],y=n[11],S=n[15],R=i[0],I=i[4],w=i[8],T=i[12],F=i[1],K=i[5],$=i[9],B=i[13],O=i[2],q=i[6],ee=i[10],oe=i[14],Z=i[3],ie=i[7],te=i[11],Te=i[15];return s[0]=o*R+a*F+l*O+c*Z,s[4]=o*I+a*K+l*q+c*ie,s[8]=o*w+a*$+l*ee+c*te,s[12]=o*T+a*B+l*oe+c*Te,s[1]=h*R+u*F+d*O+m*Z,s[5]=h*I+u*K+d*q+m*ie,s[9]=h*w+u*$+d*ee+m*te,s[13]=h*T+u*B+d*oe+m*Te,s[2]=x*R+p*F+f*O+_*Z,s[6]=x*I+p*K+f*q+_*ie,s[10]=x*w+p*$+f*ee+_*te,s[14]=x*T+p*B+f*oe+_*Te,s[3]=b*R+v*F+y*O+S*Z,s[7]=b*I+v*K+y*q+S*ie,s[11]=b*w+v*$+y*ee+S*te,s[15]=b*T+v*B+y*oe+S*Te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],m=e[14],x=e[3],p=e[7],f=e[11],_=e[15];return x*(+s*l*u-i*c*u-s*a*d+n*c*d+i*a*m-n*l*m)+p*(+t*l*m-t*c*d+s*o*d-i*o*m+i*c*h-s*l*h)+f*(+t*c*u-t*a*m-s*o*u+n*o*m+s*a*h-n*c*h)+_*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],m=e[11],x=e[12],p=e[13],f=e[14],_=e[15],b=u*f*c-p*d*c+p*l*m-a*f*m-u*l*_+a*d*_,v=x*d*c-h*f*c-x*l*m+o*f*m+h*l*_-o*d*_,y=h*p*c-x*u*c+x*a*m-o*p*m-h*a*_+o*u*_,S=x*u*l-h*p*l-x*a*d+o*p*d+h*a*f-o*u*f,R=t*b+n*v+i*y+s*S;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/R;return e[0]=b*I,e[1]=(p*d*s-u*f*s-p*i*m+n*f*m+u*i*_-n*d*_)*I,e[2]=(a*f*s-p*l*s+p*i*c-n*f*c-a*i*_+n*l*_)*I,e[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*m-n*l*m)*I,e[4]=v*I,e[5]=(h*f*s-x*d*s+x*i*m-t*f*m-h*i*_+t*d*_)*I,e[6]=(x*l*s-o*f*s-x*i*c+t*f*c+o*i*_-t*l*_)*I,e[7]=(o*d*s-h*l*s+h*i*c-t*d*c-o*i*m+t*l*m)*I,e[8]=y*I,e[9]=(x*u*s-h*p*s-x*n*m+t*p*m+h*n*_-t*u*_)*I,e[10]=(o*p*s-x*a*s+x*n*c-t*p*c-o*n*_+t*a*_)*I,e[11]=(h*a*s-o*u*s-h*n*c+t*u*c+o*n*m-t*a*m)*I,e[12]=S*I,e[13]=(h*p*i-x*u*i+x*n*d-t*p*d-h*n*f+t*u*f)*I,e[14]=(x*a*i-o*p*i-x*n*l+t*p*l+o*n*f-t*a*f)*I,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*I,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,h=o+o,u=a+a,d=s*c,m=s*h,x=s*u,p=o*h,f=o*u,_=a*u,b=l*c,v=l*h,y=l*u,S=n.x,R=n.y,I=n.z;return i[0]=(1-(p+_))*S,i[1]=(m+y)*S,i[2]=(x-v)*S,i[3]=0,i[4]=(m-y)*R,i[5]=(1-(d+_))*R,i[6]=(f+b)*R,i[7]=0,i[8]=(x+v)*I,i[9]=(f-b)*I,i[10]=(1-(d+p))*I,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Vi.set(i[0],i[1],i[2]).length();const o=Vi.set(i[4],i[5],i[6]).length(),a=Vi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],pn.copy(this);const c=1/s,h=1/o,u=1/a;return pn.elements[0]*=c,pn.elements[1]*=c,pn.elements[2]*=c,pn.elements[4]*=h,pn.elements[5]*=h,pn.elements[6]*=h,pn.elements[8]*=u,pn.elements[9]*=u,pn.elements[10]*=u,t.setFromRotationMatrix(pn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o){const a=this.elements,l=2*s/(t-e),c=2*s/(n-i),h=(t+e)/(t-e),u=(n+i)/(n-i),d=-(o+s)/(o-s),m=-2*o*s/(o-s);return a[0]=l,a[4]=0,a[8]=h,a[12]=0,a[1]=0,a[5]=c,a[9]=u,a[13]=0,a[2]=0,a[6]=0,a[10]=d,a[14]=m,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(e,t,n,i,s,o){const a=this.elements,l=1/(t-e),c=1/(n-i),h=1/(o-s),u=(t+e)*l,d=(n+i)*c,m=(o+s)*h;return a[0]=2*l,a[4]=0,a[8]=0,a[12]=-u,a[1]=0,a[5]=2*c,a[9]=0,a[13]=-d,a[2]=0,a[6]=0,a[10]=-2*h,a[14]=-m,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Vi=new P,pn=new $e,Gd=new P(0,0,0),Vd=new P(1,1,1),li=new P,vr=new P,tn=new P,Sl=new $e,El=new Mt;class hr{constructor(e=0,t=0,n=0,i=hr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(Ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ft(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ft(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Sl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return El.setFromEuler(this),this.setFromQuaternion(El,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hr.DEFAULT_ORDER="XYZ";class Ea{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Wd=0;const Tl=new P,Wi=new Mt,qn=new $e,yr=new P,Rs=new P,Xd=new P,jd=new Mt,Al=new P(1,0,0),Cl=new P(0,1,0),Ll=new P(0,0,1),qd={type:"added"},Rl={type:"removed"};class lt extends Ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=An(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=lt.DEFAULT_UP.clone();const e=new P,t=new hr,n=new Mt,i=new P(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new $e},normalMatrix:{value:new Zt}}),this.matrix=new $e,this.matrixWorld=new $e,this.matrixAutoUpdate=lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new Ea,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.premultiply(Wi),this}rotateX(e){return this.rotateOnAxis(Al,e)}rotateY(e){return this.rotateOnAxis(Cl,e)}rotateZ(e){return this.rotateOnAxis(Ll,e)}translateOnAxis(e,t){return Tl.copy(e).applyQuaternion(this.quaternion),this.position.add(Tl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Al,e)}translateY(e){return this.translateOnAxis(Cl,e)}translateZ(e){return this.translateOnAxis(Ll,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yr.copy(e):yr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(Rs,yr,this.up):qn.lookAt(yr,Rs,this.up),this.quaternion.setFromRotationMatrix(qn),i&&(qn.extractRotation(i.matrixWorld),Wi.setFromRotationMatrix(qn),this.quaternion.premultiply(Wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(qd)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rl)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(Rl)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(qn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectsByProperty(e,t);o.length>0&&(n=n.concat(o))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,e,Xd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,jd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),m=o(e.animations),x=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}lt.DEFAULT_UP=new P(0,1,0);lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mn=new P,$n=new P,Eo=new P,Yn=new P,Xi=new P,ji=new P,Pl=new P,To=new P,Ao=new P,Co=new P;class Jn{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),mn.subVectors(e,t),i.cross(mn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){mn.subVectors(i,t),$n.subVectors(n,t),Eo.subVectors(e,t);const o=mn.dot(mn),a=mn.dot($n),l=mn.dot(Eo),c=$n.dot($n),h=$n.dot(Eo),u=o*c-a*a;if(u===0)return s.set(-2,-1,-1);const d=1/u,m=(c*l-a*h)*d,x=(o*h-a*l)*d;return s.set(1-m-x,x,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Yn),Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getUV(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,Yn),l.set(0,0),l.addScaledVector(s,Yn.x),l.addScaledVector(o,Yn.y),l.addScaledVector(a,Yn.z),l}static isFrontFacing(e,t,n,i){return mn.subVectors(n,t),$n.subVectors(e,t),mn.cross($n).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mn.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),mn.cross($n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Jn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Jn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return Jn.getUV(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Jn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Jn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Xi.subVectors(i,n),ji.subVectors(s,n),To.subVectors(e,n);const l=Xi.dot(To),c=ji.dot(To);if(l<=0&&c<=0)return t.copy(n);Ao.subVectors(e,i);const h=Xi.dot(Ao),u=ji.dot(Ao);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Xi,o);Co.subVectors(e,s);const m=Xi.dot(Co),x=ji.dot(Co);if(x>=0&&m<=x)return t.copy(s);const p=m*c-l*x;if(p<=0&&c>=0&&x<=0)return a=c/(c-x),t.copy(n).addScaledVector(ji,a);const f=h*x-m*u;if(f<=0&&u-h>=0&&m-x>=0)return Pl.subVectors(s,i),a=(u-h)/(u-h+(m-x)),t.copy(i).addScaledVector(Pl,a);const _=1/(f+p+d);return o=p*_,a=d*_,t.copy(n).addScaledVector(Xi,o).addScaledVector(ji,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let $d=0;class Cn extends Ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=An(),this.name="",this.type="Material",this.blending=as,this.side=ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=ih,this.blendDst=sh,this.blendEquation=es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Jo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=po,this.stencilZFail=po,this.stencilZPass=po,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}const i=this[t];if(i===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==as&&(n.blending=this.blending),this.side!==ti&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(n.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const xh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gn={h:0,s:0,l:0},wr={h:0,s:0,l:0};function Lo(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,jt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=jt.workingColorSpace){return this.r=e,this.g=t,this.b=n,jt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=jt.workingColorSpace){if(e=Sa(e,1),t=Ft(t,0,1),n=Ft(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Lo(o,s,e+1/3),this.g=Lo(o,s,e),this.b=Lo(o,s,e-1/3)}return jt.toWorkingColorSpace(this,i),this}setStyle(e,t=hn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,jt.toWorkingColorSpace(this,t),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,jt.toWorkingColorSpace(this,t),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)){const l=parseFloat(s[1])/360,c=parseFloat(s[2])/100,h=parseFloat(s[3])/100;return n(s[4]),this.setHSL(l,c,h,t)}break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,jt.toWorkingColorSpace(this,t),this;if(o===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,jt.toWorkingColorSpace(this,t),this;console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){const n=xh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=cs(e.r),this.g=cs(e.g),this.b=cs(e.b),this}copyLinearToSRGB(e){return this.r=_o(e.r),this.g=_o(e.g),this.b=_o(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return jt.fromWorkingColorSpace(Bt.copy(this),e),Ft(Bt.r*255,0,255)<<16^Ft(Bt.g*255,0,255)<<8^Ft(Bt.b*255,0,255)<<0}getHexString(e=hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=jt.workingColorSpace){jt.fromWorkingColorSpace(Bt.copy(this),t);const n=Bt.r,i=Bt.g,s=Bt.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=jt.workingColorSpace){return jt.fromWorkingColorSpace(Bt.copy(this),t),e.r=Bt.r,e.g=Bt.g,e.b=Bt.b,e}getStyle(e=hn){jt.fromWorkingColorSpace(Bt.copy(this),e);const t=Bt.r,n=Bt.g,i=Bt.b;return e!==hn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${t*255|0},${n*255|0},${i*255|0})`}offsetHSL(e,t,n){return this.getHSL(gn),gn.h+=e,gn.s+=t,gn.l+=n,this.setHSL(gn.h,gn.s,gn.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(gn),e.getHSL(wr);const n=Ys(gn.h,wr.h,t),i=Ys(gn.s,wr.s,t),s=Ys(gn.l,wr.l,t);return this.setHSL(n,i,s),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bt=new ke;ke.NAMES=xh;class Un extends Cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=rh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bt=new P,br=new Ue;class kt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=na,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyMatrix3(e),this.setXY(t,br.x,br.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ei(t,this.array)),t}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ei(t,this.array)),t}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ei(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ei(t,this.array)),t}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array),s=ot(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==na&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class vh extends kt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class yh extends kt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class pt extends kt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Yd=0;const an=new $e,Ro=new lt,qi=new P,nn=new ys,Ps=new ys,Ct=new P;class Rt extends Ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=An(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ph(e)?yh:vh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Zt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return an.makeRotationFromQuaternion(e),this.applyMatrix4(an),this}rotateX(e){return an.makeRotationX(e),this.applyMatrix4(an),this}rotateY(e){return an.makeRotationY(e),this.applyMatrix4(an),this}rotateZ(e){return an.makeRotationZ(e),this.applyMatrix4(an),this}translate(e,t,n){return an.makeTranslation(e,t,n),this.applyMatrix4(an),this}scale(e,t,n){return an.makeScale(e,t,n),this.applyMatrix4(an),this}lookAt(e){return Ro.lookAt(e),Ro.updateMatrix(),this.applyMatrix4(Ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qi).negate(),this.translate(qi.x,qi.y,qi.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new pt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ys);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];nn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ws);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Ps.setFromBufferAttribute(a),this.morphTargetsRelative?(Ct.addVectors(nn.min,Ps.min),nn.expandByPoint(Ct),Ct.addVectors(nn.max,Ps.max),nn.expandByPoint(Ct)):(nn.expandByPoint(Ps.min),nn.expandByPoint(Ps.max))}nn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Ct.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Ct));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ct.fromBufferAttribute(a,c),l&&(qi.fromBufferAttribute(e,c),Ct.add(qi)),i=Math.max(i,n.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let F=0;F<a;F++)c[F]=new P,h[F]=new P;const u=new P,d=new P,m=new P,x=new Ue,p=new Ue,f=new Ue,_=new P,b=new P;function v(F,K,$){u.fromArray(i,F*3),d.fromArray(i,K*3),m.fromArray(i,$*3),x.fromArray(o,F*2),p.fromArray(o,K*2),f.fromArray(o,$*2),d.sub(u),m.sub(u),p.sub(x),f.sub(x);const B=1/(p.x*f.y-f.x*p.y);!isFinite(B)||(_.copy(d).multiplyScalar(f.y).addScaledVector(m,-p.y).multiplyScalar(B),b.copy(m).multiplyScalar(p.x).addScaledVector(d,-f.x).multiplyScalar(B),c[F].add(_),c[K].add(_),c[$].add(_),h[F].add(b),h[K].add(b),h[$].add(b))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let F=0,K=y.length;F<K;++F){const $=y[F],B=$.start,O=$.count;for(let q=B,ee=B+O;q<ee;q+=3)v(n[q+0],n[q+1],n[q+2])}const S=new P,R=new P,I=new P,w=new P;function T(F){I.fromArray(s,F*3),w.copy(I);const K=c[F];S.copy(K),S.sub(I.multiplyScalar(I.dot(K))).normalize(),R.crossVectors(w,K);const B=R.dot(h[F])<0?-1:1;l[F*4]=S.x,l[F*4+1]=S.y,l[F*4+2]=S.z,l[F*4+3]=B}for(let F=0,K=y.length;F<K;++F){const $=y[F],B=$.start,O=$.count;for(let q=B,ee=B+O;q<ee;q+=3)T(n[q+0]),T(n[q+1]),T(n[q+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new kt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);const i=new P,s=new P,o=new P,a=new P,l=new P,c=new P,h=new P,u=new P;if(e)for(let d=0,m=e.count;d<m;d+=3){const x=e.getX(d+0),p=e.getX(d+1),f=e.getX(d+2);i.fromBufferAttribute(t,x),s.fromBufferAttribute(t,p),o.fromBufferAttribute(t,f),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,x),l.fromBufferAttribute(n,p),c.fromBufferAttribute(n,f),a.add(h),l.add(h),c.add(h),n.setXYZ(x,a.x,a.y,a.z),n.setXYZ(p,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let d=0,m=t.count;d<m;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let m=0,x=0;for(let p=0,f=l.length;p<f;p++){a.isInterleavedBufferAttribute?m=l[p]*a.data.stride+a.offset:m=l[p]*h;for(let _=0;_<h;_++)d[x++]=c[m++]}return new kt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Rt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],m=e(d,n);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const m=c[u];h.push(m.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Dl=new $e,Rn=new Zr,Mr=new ws,Il=new P,Ds=new P,Is=new P,Ns=new P,Po=new P,Sr=new P,Er=new Ue,Tr=new Ue,Ar=new Ue,Do=new P,Cr=new P;class ge extends lt{constructor(e=new Rt,t=new Un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Sr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(Po.fromBufferAttribute(u,e),o?Sr.addScaledVector(Po,h):Sr.addScaledVector(Po.sub(t),h))}t.add(Sr)}return this.isSkinnedMesh&&this.boneTransform(e,t),t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Mr.copy(n.boundingSphere),Mr.applyMatrix4(s),Rn.copy(e.ray).recast(e.near),Mr.containsPoint(Rn.origin)===!1&&(Rn.intersectSphere(Mr,Il)===null||Rn.origin.distanceToSquared(Il)>(e.far-e.near)**2))||(Dl.copy(s).invert(),Rn.copy(e.ray).applyMatrix4(Dl),n.boundingBox!==null&&Rn.intersectsBox(n.boundingBox)===!1))return;let o;const a=n.index,l=n.attributes.position,c=n.attributes.uv,h=n.attributes.uv2,u=n.groups,d=n.drawRange;if(a!==null)if(Array.isArray(i))for(let m=0,x=u.length;m<x;m++){const p=u[m],f=i[p.materialIndex],_=Math.max(p.start,d.start),b=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let v=_,y=b;v<y;v+=3){const S=a.getX(v),R=a.getX(v+1),I=a.getX(v+2);o=Lr(this,f,e,Rn,c,h,S,R,I),o&&(o.faceIndex=Math.floor(v/3),o.face.materialIndex=p.materialIndex,t.push(o))}}else{const m=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let p=m,f=x;p<f;p+=3){const _=a.getX(p),b=a.getX(p+1),v=a.getX(p+2);o=Lr(this,i,e,Rn,c,h,_,b,v),o&&(o.faceIndex=Math.floor(p/3),t.push(o))}}else if(l!==void 0)if(Array.isArray(i))for(let m=0,x=u.length;m<x;m++){const p=u[m],f=i[p.materialIndex],_=Math.max(p.start,d.start),b=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let v=_,y=b;v<y;v+=3){const S=v,R=v+1,I=v+2;o=Lr(this,f,e,Rn,c,h,S,R,I),o&&(o.faceIndex=Math.floor(v/3),o.face.materialIndex=p.materialIndex,t.push(o))}}else{const m=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let p=m,f=x;p<f;p+=3){const _=p,b=p+1,v=p+2;o=Lr(this,i,e,Rn,c,h,_,b,v),o&&(o.faceIndex=Math.floor(p/3),t.push(o))}}}}function Zd(r,e,t,n,i,s,o,a){let l;if(e.side===en?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===ti,a),l===null)return null;Cr.copy(a),Cr.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Cr);return c<t.near||c>t.far?null:{distance:c,point:Cr.clone(),object:r}}function Lr(r,e,t,n,i,s,o,a,l){r.getVertexPosition(o,Ds),r.getVertexPosition(a,Is),r.getVertexPosition(l,Ns);const c=Zd(r,e,t,n,Ds,Is,Ns,Do);if(c){i&&(Er.fromBufferAttribute(i,o),Tr.fromBufferAttribute(i,a),Ar.fromBufferAttribute(i,l),c.uv=Jn.getUV(Do,Ds,Is,Ns,Er,Tr,Ar,new Ue)),s&&(Er.fromBufferAttribute(s,o),Tr.fromBufferAttribute(s,a),Ar.fromBufferAttribute(s,l),c.uv2=Jn.getUV(Do,Ds,Is,Ns,Er,Tr,Ar,new Ue));const h={a:o,b:a,c:l,normal:new P,materialIndex:0};Jn.getNormal(Ds,Is,Ns,h.normal),c.face=h}return c}class gt extends Rt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,m=0;x("z","y","x",-1,-1,n,t,e,o,s,0),x("z","y","x",1,-1,n,t,-e,o,s,1),x("x","z","y",1,1,e,n,t,i,o,2),x("x","z","y",1,-1,e,n,-t,i,o,3),x("x","y","z",1,-1,e,t,n,i,s,4),x("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(h,3)),this.setAttribute("uv",new pt(u,2));function x(p,f,_,b,v,y,S,R,I,w,T){const F=y/I,K=S/w,$=y/2,B=S/2,O=R/2,q=I+1,ee=w+1;let oe=0,Z=0;const ie=new P;for(let te=0;te<ee;te++){const Te=te*K-B;for(let G=0;G<q;G++){const ae=G*F-$;ie[p]=ae*b,ie[f]=Te*v,ie[_]=O,c.push(ie.x,ie.y,ie.z),ie[p]=0,ie[f]=0,ie[_]=R>0?1:-1,h.push(ie.x,ie.y,ie.z),u.push(G/I),u.push(1-te/w),oe+=1}}for(let te=0;te<w;te++)for(let Te=0;Te<I;Te++){const G=d+Te+q*te,ae=d+Te+q*(te+1),fe=d+(Te+1)+q*(te+1),W=d+(Te+1)+q*te;l.push(G,ae,W),l.push(ae,fe,W),Z+=6}a.addGroup(m,Z,T),m+=Z,d+=oe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function xs(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function $t(r){const e={};for(let t=0;t<r.length;t++){const n=xs(r[t]);for(const i in n)e[i]=n[i]}return e}function Kd(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function wh(r){return r.getRenderTarget()===null&&r.outputEncoding===Je?hn:_s}const bh={clone:xs,merge:$t};var Jd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ii extends Cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jd,this.fragmentShader=Qd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xs(e.uniforms),this.uniformsGroups=Kd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Mh extends lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $e,this.projectionMatrix=new $e,this.projectionMatrixInverse=new $e}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ot extends Mh{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=nr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan($s*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return nr*2*Math.atan(Math.tan($s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan($s*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const $i=-90,Yi=1;class ef extends lt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n;const i=new Ot($i,Yi,e,t);i.layers=this.layers,i.up.set(0,1,0),i.lookAt(1,0,0),this.add(i);const s=new Ot($i,Yi,e,t);s.layers=this.layers,s.up.set(0,1,0),s.lookAt(-1,0,0),this.add(s);const o=new Ot($i,Yi,e,t);o.layers=this.layers,o.up.set(0,0,-1),o.lookAt(0,1,0),this.add(o);const a=new Ot($i,Yi,e,t);a.layers=this.layers,a.up.set(0,0,1),a.lookAt(0,-1,0),this.add(a);const l=new Ot($i,Yi,e,t);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,1),this.add(l);const c=new Ot($i,Yi,e,t);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,s,o,a,l,c]=this.children,h=e.getRenderTarget(),u=e.toneMapping,d=e.xr.enabled;e.toneMapping=zn,e.xr.enabled=!1;const m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,i),e.setRenderTarget(n,1),e.render(t,s),e.setRenderTarget(n,2),e.render(t,o),e.setRenderTarget(n,3),e.render(t,a),e.setRenderTarget(n,4),e.render(t,l),n.texture.generateMipmaps=m,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(h),e.toneMapping=u,e.xr.enabled=d,n.texture.needsPMREMUpdate=!0}}class Sh extends Ut{constructor(e,t,n,i,s,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:us,super(e,t,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class tf extends Hn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Sh(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ut}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new gt(5,5,5),s=new ii({name:"CubemapFromEquirect",uniforms:xs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:gi});s.uniforms.tEquirect.value=t;const o=new ge(i,s),a=t.minFilter;return t.minFilter===xi&&(t.minFilter=ut),new ef(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const Io=new P,nf=new P,sf=new Zt;class Si{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Io.subVectors(n,t).cross(nf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Io),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||sf.getNormalMatrix(e),i=this.coplanarPoint(Io).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zi=new ws,Rr=new P;class Ta{constructor(e=new Si,t=new Si,n=new Si,i=new Si,s=new Si,o=new Si){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,i=n[0],s=n[1],o=n[2],a=n[3],l=n[4],c=n[5],h=n[6],u=n[7],d=n[8],m=n[9],x=n[10],p=n[11],f=n[12],_=n[13],b=n[14],v=n[15];return t[0].setComponents(a-i,u-l,p-d,v-f).normalize(),t[1].setComponents(a+i,u+l,p+d,v+f).normalize(),t[2].setComponents(a+s,u+c,p+m,v+_).normalize(),t[3].setComponents(a-s,u-c,p-m,v-_).normalize(),t[4].setComponents(a-o,u-h,p-x,v-b).normalize(),t[5].setComponents(a+o,u+h,p+x,v+b).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Zi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Zi)}intersectsSprite(e){return Zi.center.set(0,0,0),Zi.radius=.7071067811865476,Zi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Rr.x=i.normal.x>0?e.max.x:e.min.x,Rr.y=i.normal.y>0?e.max.y:e.min.y,Rr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Rr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Eh(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function rf(r,e){const t=e.isWebGL2,n=new WeakMap;function i(c,h){const u=c.array,d=c.usage,m=r.createBuffer();r.bindBuffer(h,m),r.bufferData(h,u,d),c.onUploadCallback();let x;if(u instanceof Float32Array)x=5126;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)x=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=5123;else if(u instanceof Int16Array)x=5122;else if(u instanceof Uint32Array)x=5125;else if(u instanceof Int32Array)x=5124;else if(u instanceof Int8Array)x=5120;else if(u instanceof Uint8Array)x=5121;else if(u instanceof Uint8ClampedArray)x=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:m,type:x,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version}}function s(c,h,u){const d=h.array,m=h.updateRange;r.bindBuffer(u,c),m.count===-1?r.bufferSubData(u,0,d):(t?r.bufferSubData(u,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):r.bufferSubData(u,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(r.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u===void 0?n.set(c,i(c,h)):u.version<c.version&&(s(u.buffer,c,h),u.version=c.version)}return{get:o,remove:a,update:l}}class bs extends Rt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,m=[],x=[],p=[],f=[];for(let _=0;_<h;_++){const b=_*d-o;for(let v=0;v<c;v++){const y=v*u-s;x.push(y,-b,0),p.push(0,0,1),f.push(v/a),f.push(1-_/l)}}for(let _=0;_<l;_++)for(let b=0;b<a;b++){const v=b+c*_,y=b+c*(_+1),S=b+1+c*(_+1),R=b+1+c*_;m.push(v,y,R),m.push(y,S,R)}this.setIndex(m),this.setAttribute("position",new pt(x,3)),this.setAttribute("normal",new pt(p,3)),this.setAttribute("uv",new pt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.width,e.height,e.widthSegments,e.heightSegments)}}var of=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,af=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lf=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,cf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,uf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,df="vec3 transformed = vec3( position );",ff=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pf=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
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
#endif`,mf=`#ifdef USE_IRIDESCENCE
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
#endif`,gf=`#ifdef USE_BUMPMAP
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
#endif`,_f=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,bf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Mf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Sf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Ef=`#define PI 3.141592653589793
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
}`,Tf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Af=`vec3 transformedNormal = objectNormal;
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
#endif`,Cf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,Rf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Df="gl_FragColor = linearToOutputTexel( gl_FragColor );",If=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Nf=`#ifdef USE_ENVMAP
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
#endif`,Ff=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Of=`#ifdef USE_ENVMAP
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
#endif`,Uf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kf=`#ifdef USE_ENVMAP
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
#endif`,zf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vf=`#ifdef USE_GRADIENTMAP
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
}`,Wf=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Xf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$f=`uniform bool receiveShadow;
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
#endif`,Yf=`#if defined( USE_ENVMAP )
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
#endif`,Zf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ep=`PhysicalMaterial material;
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
#endif`,tp=`struct PhysicalMaterial {
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
}`,np=`
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
#endif`,ip=`#if defined( RE_IndirectDiffuse )
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
#endif`,sp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,rp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,op=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ap=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,lp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,cp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,up=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,dp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mp=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gp=`#ifdef USE_MORPHNORMALS
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
#endif`,_p=`#ifdef USE_MORPHTARGETS
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
#endif`,xp=`#ifdef USE_MORPHTARGETS
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
#endif`,vp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 geometryNormal = normal;`,yp=`#ifdef OBJECTSPACE_NORMALMAP
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
#endif`,wp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sp=`#ifdef USE_NORMALMAP
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
#endif`,Ep=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,Tp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,Ap=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,Cp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Pp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ip=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Np=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Op=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Up=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Bp=`float getShadowMask() {
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
}`,Hp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gp=`#ifdef USE_SKINNING
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
#endif`,Vp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wp=`#ifdef USE_SKINNING
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
#endif`,Xp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$p=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Yp=`#ifdef USE_TRANSMISSION
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
#endif`,Zp=`#ifdef USE_TRANSMISSION
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
#endif`,Kp=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,Jp=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,Qp=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,em=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,tm=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,nm=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,im=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const sm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rm=`uniform sampler2D t2D;
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
}`,om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,am=`#ifdef ENVMAP_TYPE_CUBE
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
}`,lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,hm=`#include <common>
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
}`,um=`#if DEPTH_PACKING == 3200
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
}`,dm=`#define DISTANCE
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
}`,fm=`#define DISTANCE
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
}`,pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,gm=`uniform float scale;
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
}`,_m=`uniform vec3 diffuse;
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
}`,xm=`#include <common>
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
}`,vm=`uniform vec3 diffuse;
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
}`,ym=`#define LAMBERT
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
}`,wm=`#define LAMBERT
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
}`,bm=`#define MATCAP
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
}`,Mm=`#define MATCAP
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
}`,Sm=`#define NORMAL
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
}`,Em=`#define NORMAL
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
}`,Tm=`#define PHONG
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
}`,Am=`#define PHONG
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
}`,Cm=`#define STANDARD
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
}`,Lm=`#define STANDARD
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
}`,Rm=`#define TOON
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
}`,Pm=`#define TOON
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
}`,Dm=`uniform float size;
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
}`,Im=`uniform vec3 diffuse;
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
}`,Nm=`#include <common>
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
}`,Fm=`uniform vec3 color;
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
}`,Om=`uniform float rotation;
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
}`,Um=`uniform vec3 diffuse;
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
}`,Ve={alphamap_fragment:of,alphamap_pars_fragment:af,alphatest_fragment:lf,alphatest_pars_fragment:cf,aomap_fragment:hf,aomap_pars_fragment:uf,begin_vertex:df,beginnormal_vertex:ff,bsdfs:pf,iridescence_fragment:mf,bumpmap_pars_fragment:gf,clipping_planes_fragment:_f,clipping_planes_pars_fragment:xf,clipping_planes_pars_vertex:vf,clipping_planes_vertex:yf,color_fragment:wf,color_pars_fragment:bf,color_pars_vertex:Mf,color_vertex:Sf,common:Ef,cube_uv_reflection_fragment:Tf,defaultnormal_vertex:Af,displacementmap_pars_vertex:Cf,displacementmap_vertex:Lf,emissivemap_fragment:Rf,emissivemap_pars_fragment:Pf,encodings_fragment:Df,encodings_pars_fragment:If,envmap_fragment:Nf,envmap_common_pars_fragment:Ff,envmap_pars_fragment:Of,envmap_pars_vertex:Uf,envmap_physical_pars_fragment:Yf,envmap_vertex:kf,fog_vertex:zf,fog_pars_vertex:Bf,fog_fragment:Hf,fog_pars_fragment:Gf,gradientmap_pars_fragment:Vf,lightmap_fragment:Wf,lightmap_pars_fragment:Xf,lights_lambert_fragment:jf,lights_lambert_pars_fragment:qf,lights_pars_begin:$f,lights_toon_fragment:Zf,lights_toon_pars_fragment:Kf,lights_phong_fragment:Jf,lights_phong_pars_fragment:Qf,lights_physical_fragment:ep,lights_physical_pars_fragment:tp,lights_fragment_begin:np,lights_fragment_maps:ip,lights_fragment_end:sp,logdepthbuf_fragment:rp,logdepthbuf_pars_fragment:op,logdepthbuf_pars_vertex:ap,logdepthbuf_vertex:lp,map_fragment:cp,map_pars_fragment:hp,map_particle_fragment:up,map_particle_pars_fragment:dp,metalnessmap_fragment:fp,metalnessmap_pars_fragment:pp,morphcolor_vertex:mp,morphnormal_vertex:gp,morphtarget_pars_vertex:_p,morphtarget_vertex:xp,normal_fragment_begin:vp,normal_fragment_maps:yp,normal_pars_fragment:wp,normal_pars_vertex:bp,normal_vertex:Mp,normalmap_pars_fragment:Sp,clearcoat_normal_fragment_begin:Ep,clearcoat_normal_fragment_maps:Tp,clearcoat_pars_fragment:Ap,iridescence_pars_fragment:Cp,output_fragment:Lp,packing:Rp,premultiplied_alpha_fragment:Pp,project_vertex:Dp,dithering_fragment:Ip,dithering_pars_fragment:Np,roughnessmap_fragment:Fp,roughnessmap_pars_fragment:Op,shadowmap_pars_fragment:Up,shadowmap_pars_vertex:kp,shadowmap_vertex:zp,shadowmask_pars_fragment:Bp,skinbase_vertex:Hp,skinning_pars_vertex:Gp,skinning_vertex:Vp,skinnormal_vertex:Wp,specularmap_fragment:Xp,specularmap_pars_fragment:jp,tonemapping_fragment:qp,tonemapping_pars_fragment:$p,transmission_fragment:Yp,transmission_pars_fragment:Zp,uv_pars_fragment:Kp,uv_pars_vertex:Jp,uv_vertex:Qp,uv2_pars_fragment:em,uv2_pars_vertex:tm,uv2_vertex:nm,worldpos_vertex:im,background_vert:sm,background_frag:rm,backgroundCube_vert:om,backgroundCube_frag:am,cube_vert:lm,cube_frag:cm,depth_vert:hm,depth_frag:um,distanceRGBA_vert:dm,distanceRGBA_frag:fm,equirect_vert:pm,equirect_frag:mm,linedashed_vert:gm,linedashed_frag:_m,meshbasic_vert:xm,meshbasic_frag:vm,meshlambert_vert:ym,meshlambert_frag:wm,meshmatcap_vert:bm,meshmatcap_frag:Mm,meshnormal_vert:Sm,meshnormal_frag:Em,meshphong_vert:Tm,meshphong_frag:Am,meshphysical_vert:Cm,meshphysical_frag:Lm,meshtoon_vert:Rm,meshtoon_frag:Pm,points_vert:Dm,points_frag:Im,shadow_vert:Nm,shadow_frag:Fm,sprite_vert:Om,sprite_frag:Um},xe={common:{diffuse:{value:new ke(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new Zt},uv2Transform:{value:new Zt},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new ke(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Zt}}},Fn={basic:{uniforms:$t([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:$t([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new ke(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:$t([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new ke(0)},specular:{value:new ke(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:$t([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:$t([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new ke(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:$t([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:$t([xe.points,xe.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:$t([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:$t([xe.common,xe.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:$t([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:$t([xe.sprite,xe.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:$t([xe.common,xe.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:$t([xe.lights,xe.fog,{color:{value:new ke(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};Fn.physical={uniforms:$t([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new ke(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new ke(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new ke(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Pr={r:0,b:0,g:0};function km(r,e,t,n,i,s,o){const a=new ke(0);let l=s===!0?0:1,c,h,u=null,d=0,m=null;function x(f,_){let b=!1,v=_.isScene===!0?_.background:null;v&&v.isTexture&&(v=(_.backgroundBlurriness>0?t:e).get(v));const y=r.xr,S=y.getSession&&y.getSession();S&&S.environmentBlendMode==="additive"&&(v=null),v===null?p(a,l):v&&v.isColor&&(p(v,1),b=!0),(r.autoClear||b)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Yr)?(h===void 0&&(h=new ge(new gt(1,1,1),new ii({name:"BackgroundCubeMaterial",uniforms:xs(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,I,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.toneMapped=v.encoding!==Je,(u!==v||d!==v.version||m!==r.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,m=r.toneMapping),h.layers.enableAll(),f.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new ge(new bs(2,2),new ii({name:"BackgroundMaterial",uniforms:xs(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=v.encoding!==Je,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||m!==r.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,m=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))}function p(f,_){f.getRGB(Pr,wh(r)),n.buffers.color.setClear(Pr.r,Pr.g,Pr.b,_,o)}return{getClearColor:function(){return a},setClearColor:function(f,_=1){a.set(f),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,p(a,l)},render:x}}function zm(r,e,t,n){const i=r.getParameter(34921),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=f(null);let c=l,h=!1;function u(O,q,ee,oe,Z){let ie=!1;if(o){const te=p(oe,ee,q);c!==te&&(c=te,m(c.object)),ie=_(O,oe,ee,Z),ie&&b(O,oe,ee,Z)}else{const te=q.wireframe===!0;(c.geometry!==oe.id||c.program!==ee.id||c.wireframe!==te)&&(c.geometry=oe.id,c.program=ee.id,c.wireframe=te,ie=!0)}Z!==null&&t.update(Z,34963),(ie||h)&&(h=!1,w(O,q,ee,oe),Z!==null&&r.bindBuffer(34963,t.get(Z).buffer))}function d(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function m(O){return n.isWebGL2?r.bindVertexArray(O):s.bindVertexArrayOES(O)}function x(O){return n.isWebGL2?r.deleteVertexArray(O):s.deleteVertexArrayOES(O)}function p(O,q,ee){const oe=ee.wireframe===!0;let Z=a[O.id];Z===void 0&&(Z={},a[O.id]=Z);let ie=Z[q.id];ie===void 0&&(ie={},Z[q.id]=ie);let te=ie[oe];return te===void 0&&(te=f(d()),ie[oe]=te),te}function f(O){const q=[],ee=[],oe=[];for(let Z=0;Z<i;Z++)q[Z]=0,ee[Z]=0,oe[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:ee,attributeDivisors:oe,object:O,attributes:{},index:null}}function _(O,q,ee,oe){const Z=c.attributes,ie=q.attributes;let te=0;const Te=ee.getAttributes();for(const G in Te)if(Te[G].location>=0){const fe=Z[G];let W=ie[G];if(W===void 0&&(G==="instanceMatrix"&&O.instanceMatrix&&(W=O.instanceMatrix),G==="instanceColor"&&O.instanceColor&&(W=O.instanceColor)),fe===void 0||fe.attribute!==W||W&&fe.data!==W.data)return!0;te++}return c.attributesNum!==te||c.index!==oe}function b(O,q,ee,oe){const Z={},ie=q.attributes;let te=0;const Te=ee.getAttributes();for(const G in Te)if(Te[G].location>=0){let fe=ie[G];fe===void 0&&(G==="instanceMatrix"&&O.instanceMatrix&&(fe=O.instanceMatrix),G==="instanceColor"&&O.instanceColor&&(fe=O.instanceColor));const W={};W.attribute=fe,fe&&fe.data&&(W.data=fe.data),Z[G]=W,te++}c.attributes=Z,c.attributesNum=te,c.index=oe}function v(){const O=c.newAttributes;for(let q=0,ee=O.length;q<ee;q++)O[q]=0}function y(O){S(O,0)}function S(O,q){const ee=c.newAttributes,oe=c.enabledAttributes,Z=c.attributeDivisors;ee[O]=1,oe[O]===0&&(r.enableVertexAttribArray(O),oe[O]=1),Z[O]!==q&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](O,q),Z[O]=q)}function R(){const O=c.newAttributes,q=c.enabledAttributes;for(let ee=0,oe=q.length;ee<oe;ee++)q[ee]!==O[ee]&&(r.disableVertexAttribArray(ee),q[ee]=0)}function I(O,q,ee,oe,Z,ie){n.isWebGL2===!0&&(ee===5124||ee===5125)?r.vertexAttribIPointer(O,q,ee,Z,ie):r.vertexAttribPointer(O,q,ee,oe,Z,ie)}function w(O,q,ee,oe){if(n.isWebGL2===!1&&(O.isInstancedMesh||oe.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const Z=oe.attributes,ie=ee.getAttributes(),te=q.defaultAttributeValues;for(const Te in ie){const G=ie[Te];if(G.location>=0){let ae=Z[Te];if(ae===void 0&&(Te==="instanceMatrix"&&O.instanceMatrix&&(ae=O.instanceMatrix),Te==="instanceColor"&&O.instanceColor&&(ae=O.instanceColor)),ae!==void 0){const fe=ae.normalized,W=ae.itemSize,ue=t.get(ae);if(ue===void 0)continue;const ve=ue.buffer,be=ue.type,Le=ue.bytesPerElement;if(ae.isInterleavedBufferAttribute){const Oe=ae.data,Ge=Oe.stride,je=ae.offset;if(Oe.isInstancedInterleavedBuffer){for(let Ke=0;Ke<G.locationSize;Ke++)S(G.location+Ke,Oe.meshPerAttribute);O.isInstancedMesh!==!0&&oe._maxInstanceCount===void 0&&(oe._maxInstanceCount=Oe.meshPerAttribute*Oe.count)}else for(let Ke=0;Ke<G.locationSize;Ke++)y(G.location+Ke);r.bindBuffer(34962,ve);for(let Ke=0;Ke<G.locationSize;Ke++)I(G.location+Ke,W/G.locationSize,be,fe,Ge*Le,(je+W/G.locationSize*Ke)*Le)}else{if(ae.isInstancedBufferAttribute){for(let Oe=0;Oe<G.locationSize;Oe++)S(G.location+Oe,ae.meshPerAttribute);O.isInstancedMesh!==!0&&oe._maxInstanceCount===void 0&&(oe._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Oe=0;Oe<G.locationSize;Oe++)y(G.location+Oe);r.bindBuffer(34962,ve);for(let Oe=0;Oe<G.locationSize;Oe++)I(G.location+Oe,W/G.locationSize,be,fe,W*Le,W/G.locationSize*Oe*Le)}}else if(te!==void 0){const fe=te[Te];if(fe!==void 0)switch(fe.length){case 2:r.vertexAttrib2fv(G.location,fe);break;case 3:r.vertexAttrib3fv(G.location,fe);break;case 4:r.vertexAttrib4fv(G.location,fe);break;default:r.vertexAttrib1fv(G.location,fe)}}}}R()}function T(){$();for(const O in a){const q=a[O];for(const ee in q){const oe=q[ee];for(const Z in oe)x(oe[Z].object),delete oe[Z];delete q[ee]}delete a[O]}}function F(O){if(a[O.id]===void 0)return;const q=a[O.id];for(const ee in q){const oe=q[ee];for(const Z in oe)x(oe[Z].object),delete oe[Z];delete q[ee]}delete a[O.id]}function K(O){for(const q in a){const ee=a[q];if(ee[O.id]===void 0)continue;const oe=ee[O.id];for(const Z in oe)x(oe[Z].object),delete oe[Z];delete ee[O.id]}}function $(){B(),h=!0,c!==l&&(c=l,m(c.object))}function B(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:$,resetDefaultState:B,dispose:T,releaseStatesOfGeometry:F,releaseStatesOfProgram:K,initAttributes:v,enableAttribute:y,disableUnusedAttributes:R}}function Bm(r,e,t,n){const i=n.isWebGL2;let s;function o(c){s=c}function a(c,h){r.drawArrays(s,c,h),t.update(h,s,1)}function l(c,h,u){if(u===0)return;let d,m;if(i)d=r,m="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[m](s,c,h,u),t.update(h,s,u)}this.setMode=o,this.render=a,this.renderInstances=l}function Hm(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(I){if(I==="highp"){if(r.getShaderPrecisionFormat(35633,36338).precision>0&&r.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";I="mediump"}return I==="mediump"&&r.getShaderPrecisionFormat(35633,36337).precision>0&&r.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext!="undefined"&&r instanceof WebGL2RenderingContext;let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=r.getParameter(34930),d=r.getParameter(35660),m=r.getParameter(3379),x=r.getParameter(34076),p=r.getParameter(34921),f=r.getParameter(36347),_=r.getParameter(36348),b=r.getParameter(36349),v=d>0,y=o||e.has("OES_texture_float"),S=v&&y,R=o?r.getParameter(36183):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:x,maxAttributes:p,maxVertexUniforms:f,maxVaryings:_,maxFragmentUniforms:b,vertexTextures:v,floatFragmentTextures:y,floatVertexTextures:S,maxSamples:R}}function Gm(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Si,a=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const m=u.length!==0||d||n!==0||i;return i=d,n=u.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,m){const x=u.clippingPlanes,p=u.clipIntersection,f=u.clipShadows,_=r.get(u);if(!i||x===null||x.length===0||s&&!f)s?h(null):c();else{const b=s?0:n,v=b*4;let y=_.clippingState||null;l.value=y,y=h(x,d,v,m);for(let S=0;S!==v;++S)y[S]=t[S];_.clippingState=y,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,m,x){const p=u!==null?u.length:0;let f=null;if(p!==0){if(f=l.value,x!==!0||f===null){const _=m+p*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(f===null||f.length<_)&&(f=new Float32Array(_));for(let v=0,y=m;v!==p;++v,y+=4)o.copy(u[v]).applyMatrix4(b,a),o.normal.toArray(f,y),f[y+3]=o.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=p,e.numIntersection=0,f}}function Vm(r){let e=new WeakMap;function t(o,a){return a===fs?o.mapping=us:a===Qo&&(o.mapping=ds),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){const a=o.mapping;if(a===fs||a===Qo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new tf(l.height/2);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Aa extends Mh{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ss=4,Nl=[.125,.215,.35,.446,.526,.582],Ai=20,No=new Aa,Fl=new ke;let Fo=null;const Ei=(1+Math.sqrt(5))/2,Ki=1/Ei,Ol=[new P(1,1,1),new P(-1,1,1),new P(1,1,-1),new P(-1,1,-1),new P(0,Ei,Ki),new P(0,Ei,-Ki),new P(Ki,0,Ei),new P(-Ki,0,Ei),new P(Ei,Ki,0),new P(-Ei,Ki,0)];class sr{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Fo=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Fo),e.scissorTest=!1,Dr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===us||e.mapping===ds?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fo=this._renderer.getRenderTarget();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ut,minFilter:ut,generateMipmaps:!1,type:fn,format:sn,encoding:ni,depthBuffer:!1},i=Ul(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ul(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Wm(s)),this._blurMaterial=Xm(s,e,t)}return i}_compileMaterial(e){const t=new ge(this._lodPlanes[0],e);this._renderer.compile(t,No)}_sceneToCubeUV(e,t,n,i){const a=new Ot(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Fl),h.toneMapping=zn,h.autoClear=!1;const m=new Un({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1}),x=new ge(new gt,m);let p=!1;const f=e.background;f?f.isColor&&(m.color.copy(f),e.background=null,p=!0):(m.color.copy(Fl),p=!0);for(let _=0;_<6;_++){const b=_%3;b===0?(a.up.set(0,l[_],0),a.lookAt(c[_],0,0)):b===1?(a.up.set(0,0,l[_]),a.lookAt(0,c[_],0)):(a.up.set(0,l[_],0),a.lookAt(0,0,c[_]));const v=this._cubeSize;Dr(i,b*v,_>2?v:0,v,v),h.setRenderTarget(i),p&&h.render(x,a),h.render(e,a)}x.geometry.dispose(),x.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=f}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===us||e.mapping===ds;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=zl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kl());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new ge(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Dr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,No)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Ol[(i-1)%Ol.length];this._blur(e,i-1,i,s,o)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ge(this._lodPlanes[i],c),d=c.uniforms,m=this._sizeLods[n]-1,x=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Ai-1),p=s/x,f=isFinite(s)?1+Math.floor(h*p):Ai;f>Ai&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Ai}`);const _=[];let b=0;for(let I=0;I<Ai;++I){const w=I/p,T=Math.exp(-w*w/2);_.push(T),I===0?b+=T:I<f&&(b+=2*T)}for(let I=0;I<_.length;I++)_[I]=_[I]/b;d.envMap.value=e.texture,d.samples.value=f,d.weights.value=_,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=x,d.mipInt.value=v-n;const y=this._sizeLods[i],S=3*y*(i>v-ss?i-v+ss:0),R=4*(this._cubeSize-y);Dr(t,S,R,3*y,2*y),l.setRenderTarget(t),l.render(u,No)}}function Wm(r){const e=[],t=[],n=[];let i=r;const s=r-ss+1+Nl.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-ss?l=Nl[o-r+ss-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,x=6,p=3,f=2,_=1,b=new Float32Array(p*x*m),v=new Float32Array(f*x*m),y=new Float32Array(_*x*m);for(let R=0;R<m;R++){const I=R%3*2/3-1,w=R>2?0:-1,T=[I,w,0,I+2/3,w,0,I+2/3,w+1,0,I,w,0,I+2/3,w+1,0,I,w+1,0];b.set(T,p*x*R),v.set(d,f*x*R);const F=[R,R,R,R,R,R];y.set(F,_*x*R)}const S=new Rt;S.setAttribute("position",new kt(b,p)),S.setAttribute("uv",new kt(v,f)),S.setAttribute("faceIndex",new kt(y,_)),e.push(S),i>ss&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ul(r,e,t){const n=new Hn(r,e,t);return n.texture.mapping=Yr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Dr(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Xm(r,e,t){const n=new Float32Array(Ai),i=new P(0,1,0);return new ii({name:"SphericalGaussianBlur",defines:{n:Ai,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ca(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function kl(){return new ii({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ca(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function zl(){return new ii({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ca(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Ca(){return`

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
	`}function jm(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===fs||l===Qo,h=l===us||l===ds;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new sr(r)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new sr(r));const d=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function qm(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function $m(r,e,t,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const x in d.attributes)e.remove(d.attributes[x]);d.removeEventListener("dispose",o),delete i[d.id];const m=s.get(d);m&&(e.remove(m),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const x in d)e.update(d[x],34962);const m=u.morphAttributes;for(const x in m){const p=m[x];for(let f=0,_=p.length;f<_;f++)e.update(p[f],34962)}}function c(u){const d=[],m=u.index,x=u.attributes.position;let p=0;if(m!==null){const b=m.array;p=m.version;for(let v=0,y=b.length;v<y;v+=3){const S=b[v+0],R=b[v+1],I=b[v+2];d.push(S,R,R,I,I,S)}}else{const b=x.array;p=x.version;for(let v=0,y=b.length/3-1;v<y;v+=3){const S=v+0,R=v+1,I=v+2;d.push(S,R,R,I,I,S)}}const f=new(ph(d)?yh:vh)(d,1);f.version=p;const _=s.get(u);_&&e.remove(_),s.set(u,f)}function h(u){const d=s.get(u);if(d){const m=u.index;m!==null&&d.version<m.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Ym(r,e,t,n){const i=n.isWebGL2;let s;function o(d){s=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function h(d,m){r.drawElements(s,m,a,d*l),t.update(m,s,1)}function u(d,m,x){if(x===0)return;let p,f;if(i)p=r,f="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[f](s,m,a,d*l,x),t.update(m,s,x)}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u}function Zm(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case 4:t.triangles+=a*(s/3);break;case 1:t.lines+=a*(s/2);break;case 3:t.lines+=a*(s-1);break;case 2:t.lines+=a*s;break;case 0:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Km(r,e){return r[0]-e[0]}function Jm(r,e){return Math.abs(e[1])-Math.abs(r[1])}function Qm(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,o=new at,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const x=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,p=x!==void 0?x.length:0;let f=s.get(h);if(f===void 0||f.count!==p){let q=function(){B.dispose(),s.delete(h),h.removeEventListener("dispose",q)};var m=q;f!==void 0&&f.texture.dispose();const v=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,S=h.morphAttributes.color!==void 0,R=h.morphAttributes.position||[],I=h.morphAttributes.normal||[],w=h.morphAttributes.color||[];let T=0;v===!0&&(T=1),y===!0&&(T=2),S===!0&&(T=3);let F=h.attributes.position.count*T,K=1;F>e.maxTextureSize&&(K=Math.ceil(F/e.maxTextureSize),F=e.maxTextureSize);const $=new Float32Array(F*K*4*p),B=new _h($,F,K,p);B.type=En,B.needsUpdate=!0;const O=T*4;for(let ee=0;ee<p;ee++){const oe=R[ee],Z=I[ee],ie=w[ee],te=F*K*4*ee;for(let Te=0;Te<oe.count;Te++){const G=Te*O;v===!0&&(o.fromBufferAttribute(oe,Te),$[te+G+0]=o.x,$[te+G+1]=o.y,$[te+G+2]=o.z,$[te+G+3]=0),y===!0&&(o.fromBufferAttribute(Z,Te),$[te+G+4]=o.x,$[te+G+5]=o.y,$[te+G+6]=o.z,$[te+G+7]=0),S===!0&&(o.fromBufferAttribute(ie,Te),$[te+G+8]=o.x,$[te+G+9]=o.y,$[te+G+10]=o.z,$[te+G+11]=ie.itemSize===4?o.w:1)}}f={count:p,texture:B,size:new Ue(F,K)},s.set(h,f),h.addEventListener("dispose",q)}let _=0;for(let v=0;v<d.length;v++)_+=d[v];const b=h.morphTargetsRelative?1:1-_;u.getUniforms().setValue(r,"morphTargetBaseInfluence",b),u.getUniforms().setValue(r,"morphTargetInfluences",d),u.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),u.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}else{const x=d===void 0?0:d.length;let p=n[h.id];if(p===void 0||p.length!==x){p=[];for(let y=0;y<x;y++)p[y]=[y,0];n[h.id]=p}for(let y=0;y<x;y++){const S=p[y];S[0]=y,S[1]=d[y]}p.sort(Jm);for(let y=0;y<8;y++)y<x&&p[y][1]?(a[y][0]=p[y][0],a[y][1]=p[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(Km);const f=h.morphAttributes.position,_=h.morphAttributes.normal;let b=0;for(let y=0;y<8;y++){const S=a[y],R=S[0],I=S[1];R!==Number.MAX_SAFE_INTEGER&&I?(f&&h.getAttribute("morphTarget"+y)!==f[R]&&h.setAttribute("morphTarget"+y,f[R]),_&&h.getAttribute("morphNormal"+y)!==_[R]&&h.setAttribute("morphNormal"+y,_[R]),i[y]=I,b+=I):(f&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),_&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),i[y]=0)}const v=h.morphTargetsRelative?1:1-b;u.getUniforms().setValue(r,"morphTargetBaseInfluence",v),u.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function eg(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);return i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),t.update(l.instanceMatrix,34962),l.instanceColor!==null&&t.update(l.instanceColor,34962)),u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Th=new Ut,Ah=new _h,Ch=new Bd,Lh=new Sh,Bl=[],Hl=[],Gl=new Float32Array(16),Vl=new Float32Array(9),Wl=new Float32Array(4);function Ms(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Bl[i];if(s===void 0&&(s=new Float32Array(i),Bl[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function St(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Et(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Kr(r,e){let t=Hl[e];t===void 0&&(t=new Int32Array(e),Hl[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function tg(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function ng(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;r.uniform2fv(this.addr,e),Et(t,e)}}function ig(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;r.uniform3fv(this.addr,e),Et(t,e)}}function sg(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;r.uniform4fv(this.addr,e),Et(t,e)}}function rg(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;Wl.set(n),r.uniformMatrix2fv(this.addr,!1,Wl),Et(t,n)}}function og(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;Vl.set(n),r.uniformMatrix3fv(this.addr,!1,Vl),Et(t,n)}}function ag(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;Gl.set(n),r.uniformMatrix4fv(this.addr,!1,Gl),Et(t,n)}}function lg(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function cg(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;r.uniform2iv(this.addr,e),Et(t,e)}}function hg(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;r.uniform3iv(this.addr,e),Et(t,e)}}function ug(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;r.uniform4iv(this.addr,e),Et(t,e)}}function dg(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function fg(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;r.uniform2uiv(this.addr,e),Et(t,e)}}function pg(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;r.uniform3uiv(this.addr,e),Et(t,e)}}function mg(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;r.uniform4uiv(this.addr,e),Et(t,e)}}function gg(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2D(e||Th,i)}function _g(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Ch,i)}function xg(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Lh,i)}function vg(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Ah,i)}function yg(r){switch(r){case 5126:return tg;case 35664:return ng;case 35665:return ig;case 35666:return sg;case 35674:return rg;case 35675:return og;case 35676:return ag;case 5124:case 35670:return lg;case 35667:case 35671:return cg;case 35668:case 35672:return hg;case 35669:case 35673:return ug;case 5125:return dg;case 36294:return fg;case 36295:return pg;case 36296:return mg;case 35678:case 36198:case 36298:case 36306:case 35682:return gg;case 35679:case 36299:case 36307:return _g;case 35680:case 36300:case 36308:case 36293:return xg;case 36289:case 36303:case 36311:case 36292:return vg}}function wg(r,e){r.uniform1fv(this.addr,e)}function bg(r,e){const t=Ms(e,this.size,2);r.uniform2fv(this.addr,t)}function Mg(r,e){const t=Ms(e,this.size,3);r.uniform3fv(this.addr,t)}function Sg(r,e){const t=Ms(e,this.size,4);r.uniform4fv(this.addr,t)}function Eg(r,e){const t=Ms(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Tg(r,e){const t=Ms(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Ag(r,e){const t=Ms(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Cg(r,e){r.uniform1iv(this.addr,e)}function Lg(r,e){r.uniform2iv(this.addr,e)}function Rg(r,e){r.uniform3iv(this.addr,e)}function Pg(r,e){r.uniform4iv(this.addr,e)}function Dg(r,e){r.uniform1uiv(this.addr,e)}function Ig(r,e){r.uniform2uiv(this.addr,e)}function Ng(r,e){r.uniform3uiv(this.addr,e)}function Fg(r,e){r.uniform4uiv(this.addr,e)}function Og(r,e,t){const n=this.cache,i=e.length,s=Kr(t,i);St(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Th,s[o])}function Ug(r,e,t){const n=this.cache,i=e.length,s=Kr(t,i);St(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Ch,s[o])}function kg(r,e,t){const n=this.cache,i=e.length,s=Kr(t,i);St(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Lh,s[o])}function zg(r,e,t){const n=this.cache,i=e.length,s=Kr(t,i);St(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Ah,s[o])}function Bg(r){switch(r){case 5126:return wg;case 35664:return bg;case 35665:return Mg;case 35666:return Sg;case 35674:return Eg;case 35675:return Tg;case 35676:return Ag;case 5124:case 35670:return Cg;case 35667:case 35671:return Lg;case 35668:case 35672:return Rg;case 35669:case 35673:return Pg;case 5125:return Dg;case 36294:return Ig;case 36295:return Ng;case 36296:return Fg;case 35678:case 36198:case 36298:case 36306:case 35682:return Og;case 35679:case 36299:case 36307:return Ug;case 35680:case 36300:case 36308:case 36293:return kg;case 36289:case 36303:case 36311:case 36292:return zg}}class Hg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=yg(t.type)}}class Gg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=Bg(t.type)}}class Vg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Oo=/(\w+)(\])?(\[|\.)?/g;function Xl(r,e){r.seq.push(e),r.map[e.id]=e}function Wg(r,e,t){const n=r.name,i=n.length;for(Oo.lastIndex=0;;){const s=Oo.exec(n),o=Oo.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Xl(t,c===void 0?new Hg(a,r,e):new Gg(a,r,e));break}else{let u=t.map[a];u===void 0&&(u=new Vg(a),Xl(t,u)),t=u}}}class Vr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,35718);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);Wg(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function jl(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}let Xg=0;function jg(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function qg(r){switch(r){case ni:return["Linear","( value )"];case Je:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",r),["Linear","( value )"]}}function ql(r,e,t){const n=r.getShaderParameter(e,35713),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+jg(r.getShaderSource(e),o)}else return i}function $g(r,e){const t=qg(e);return"vec4 "+r+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function Yg(r,e){let t;switch(e){case Zu:t="Linear";break;case Ku:t="Reinhard";break;case Ju:t="OptimizedCineon";break;case $r:t="ACESFilmic";break;case Qu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Zg(r){return[r.extensionDerivatives||!!r.envMapCubeUVHeight||r.bumpMap||r.tangentSpaceNormalMap||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Gs).join(`
`)}function Kg(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Jg(r,e){const t={},n=r.getProgramParameter(e,35721);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===35674&&(a=2),s.type===35675&&(a=3),s.type===35676&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Gs(r){return r!==""}function $l(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Yl(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Qg=/^[ \t]*#include +<([\w\d./]+)>/gm;function ra(r){return r.replace(Qg,e0)}function e0(r,e){const t=Ve[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return ra(t)}const t0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zl(r){return r.replace(t0,n0)}function n0(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Kl(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function i0(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===nh?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Cu?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Li&&(e="SHADOWMAP_TYPE_VSM"),e}function s0(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case us:case ds:e="ENVMAP_TYPE_CUBE";break;case Yr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function r0(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ds:e="ENVMAP_MODE_REFRACTION";break}return e}function o0(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case rh:e="ENVMAP_BLENDING_MULTIPLY";break;case $u:e="ENVMAP_BLENDING_MIX";break;case Yu:e="ENVMAP_BLENDING_ADD";break}return e}function a0(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function l0(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=i0(t),c=s0(t),h=r0(t),u=o0(t),d=a0(t),m=t.isWebGL2?"":Zg(t),x=Kg(s),p=i.createProgram();let f,_,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=[x].filter(Gs).join(`
`),f.length>0&&(f+=`
`),_=[m,x].filter(Gs).join(`
`),_.length>0&&(_+=`
`)):(f=[Kl(t),"#define SHADER_NAME "+t.shaderName,x,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gs).join(`
`),_=[m,Kl(t),"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==zn?"#define TONE_MAPPING":"",t.toneMapping!==zn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==zn?Yg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.encodings_pars_fragment,$g("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gs).join(`
`)),o=ra(o),o=$l(o,t),o=Yl(o,t),a=ra(a),a=$l(a,t),a=Yl(a,t),o=Zl(o),a=Zl(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,f=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,_=["#define varying in",t.glslVersion===wl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const v=b+f+o,y=b+_+a,S=jl(i,35633,v),R=jl(i,35632,y);if(i.attachShader(p,S),i.attachShader(p,R),t.index0AttributeName!==void 0?i.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p),r.debug.checkShaderErrors){const T=i.getProgramInfoLog(p).trim(),F=i.getShaderInfoLog(S).trim(),K=i.getShaderInfoLog(R).trim();let $=!0,B=!0;if(i.getProgramParameter(p,35714)===!1){$=!1;const O=ql(i,S,"vertex"),q=ql(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,35715)+`

Program Info Log: `+T+`
`+O+`
`+q)}else T!==""?console.warn("THREE.WebGLProgram: Program Info Log:",T):(F===""||K==="")&&(B=!1);B&&(this.diagnostics={runnable:$,programLog:T,vertexShader:{log:F,prefix:f},fragmentShader:{log:K,prefix:_}})}i.deleteShader(S),i.deleteShader(R);let I;this.getUniforms=function(){return I===void 0&&(I=new Vr(i,p)),I};let w;return this.getAttributes=function(){return w===void 0&&(w=Jg(i,p)),w},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.name=t.shaderName,this.id=Xg++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=S,this.fragmentShader=R,this}let c0=0;class h0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new u0(e),t.set(e,n)),n}}class u0{constructor(e){this.id=c0++,this.code=e,this.usedTimes=0}}function d0(r,e,t,n,i,s,o){const a=new Ea,l=new h0,c=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures;let m=i.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(w,T,F,K,$){const B=K.fog,O=$.geometry,q=w.isMeshStandardMaterial?K.environment:null,ee=(w.isMeshStandardMaterial?t:e).get(w.envMap||q),oe=!!ee&&ee.mapping===Yr?ee.image.height:null,Z=x[w.type];w.precision!==null&&(m=i.getMaxPrecision(w.precision),m!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",m,"instead."));const ie=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,te=ie!==void 0?ie.length:0;let Te=0;O.morphAttributes.position!==void 0&&(Te=1),O.morphAttributes.normal!==void 0&&(Te=2),O.morphAttributes.color!==void 0&&(Te=3);let G,ae,fe,W;if(Z){const Ge=Fn[Z];G=Ge.vertexShader,ae=Ge.fragmentShader}else G=w.vertexShader,ae=w.fragmentShader,l.update(w),fe=l.getVertexShaderID(w),W=l.getFragmentShaderID(w);const ue=r.getRenderTarget(),ve=w.alphaTest>0,be=w.clearcoat>0,Le=w.iridescence>0;return{isWebGL2:h,shaderID:Z,shaderName:w.type,vertexShader:G,fragmentShader:ae,defines:w.defines,customVertexShaderID:fe,customFragmentShaderID:W,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:m,instancing:$.isInstancedMesh===!0,instancingColor:$.isInstancedMesh===!0&&$.instanceColor!==null,supportsVertexTextures:d,outputEncoding:ue===null?r.outputEncoding:ue.isXRRenderTarget===!0?ue.texture.encoding:ni,map:!!w.map,matcap:!!w.matcap,envMap:!!ee,envMapMode:ee&&ee.mapping,envMapCubeUVHeight:oe,lightMap:!!w.lightMap,aoMap:!!w.aoMap,emissiveMap:!!w.emissiveMap,bumpMap:!!w.bumpMap,normalMap:!!w.normalMap,objectSpaceNormalMap:w.normalMapType===xd,tangentSpaceNormalMap:w.normalMapType===hh,decodeVideoTexture:!!w.map&&w.map.isVideoTexture===!0&&w.map.encoding===Je,clearcoat:be,clearcoatMap:be&&!!w.clearcoatMap,clearcoatRoughnessMap:be&&!!w.clearcoatRoughnessMap,clearcoatNormalMap:be&&!!w.clearcoatNormalMap,iridescence:Le,iridescenceMap:Le&&!!w.iridescenceMap,iridescenceThicknessMap:Le&&!!w.iridescenceThicknessMap,displacementMap:!!w.displacementMap,roughnessMap:!!w.roughnessMap,metalnessMap:!!w.metalnessMap,specularMap:!!w.specularMap,specularIntensityMap:!!w.specularIntensityMap,specularColorMap:!!w.specularColorMap,opaque:w.transparent===!1&&w.blending===as,alphaMap:!!w.alphaMap,alphaTest:ve,gradientMap:!!w.gradientMap,sheen:w.sheen>0,sheenColorMap:!!w.sheenColorMap,sheenRoughnessMap:!!w.sheenRoughnessMap,transmission:w.transmission>0,transmissionMap:!!w.transmissionMap,thicknessMap:!!w.thicknessMap,combine:w.combine,vertexTangents:!!w.normalMap&&!!O.attributes.tangent,vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUvs:!!w.map||!!w.bumpMap||!!w.normalMap||!!w.specularMap||!!w.alphaMap||!!w.emissiveMap||!!w.roughnessMap||!!w.metalnessMap||!!w.clearcoatMap||!!w.clearcoatRoughnessMap||!!w.clearcoatNormalMap||!!w.iridescenceMap||!!w.iridescenceThicknessMap||!!w.displacementMap||!!w.transmissionMap||!!w.thicknessMap||!!w.specularIntensityMap||!!w.specularColorMap||!!w.sheenColorMap||!!w.sheenRoughnessMap,uvsVertexOnly:!(!!w.map||!!w.bumpMap||!!w.normalMap||!!w.specularMap||!!w.alphaMap||!!w.emissiveMap||!!w.roughnessMap||!!w.metalnessMap||!!w.clearcoatNormalMap||!!w.iridescenceMap||!!w.iridescenceThicknessMap||w.transmission>0||!!w.transmissionMap||!!w.thicknessMap||!!w.specularIntensityMap||!!w.specularColorMap||w.sheen>0||!!w.sheenColorMap||!!w.sheenRoughnessMap)&&!!w.displacementMap,fog:!!B,useFog:w.fog===!0,fogExp2:B&&B.isFogExp2,flatShading:!!w.flatShading,sizeAttenuation:w.sizeAttenuation,logarithmicDepthBuffer:u,skinning:$.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:Te,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:w.toneMapped?r.toneMapping:zn,useLegacyLights:r.useLegacyLights,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Sn,flipSided:w.side===en,useDepthPacking:!!w.depthPacking,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionDerivatives:w.extensions&&w.extensions.derivatives,extensionFragDepth:w.extensions&&w.extensions.fragDepth,extensionDrawBuffers:w.extensions&&w.extensions.drawBuffers,extensionShaderTextureLOD:w.extensions&&w.extensions.shaderTextureLOD,rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),customProgramCacheKey:w.customProgramCacheKey()}}function f(w){const T=[];if(w.shaderID?T.push(w.shaderID):(T.push(w.customVertexShaderID),T.push(w.customFragmentShaderID)),w.defines!==void 0)for(const F in w.defines)T.push(F),T.push(w.defines[F]);return w.isRawShaderMaterial===!1&&(_(T,w),b(T,w),T.push(r.outputEncoding)),T.push(w.customProgramCacheKey),T.join()}function _(w,T){w.push(T.precision),w.push(T.outputEncoding),w.push(T.envMapMode),w.push(T.envMapCubeUVHeight),w.push(T.combine),w.push(T.vertexUvs),w.push(T.fogExp2),w.push(T.sizeAttenuation),w.push(T.morphTargetsCount),w.push(T.morphAttributeCount),w.push(T.numDirLights),w.push(T.numPointLights),w.push(T.numSpotLights),w.push(T.numSpotLightMaps),w.push(T.numHemiLights),w.push(T.numRectAreaLights),w.push(T.numDirLightShadows),w.push(T.numPointLightShadows),w.push(T.numSpotLightShadows),w.push(T.numSpotLightShadowsWithMaps),w.push(T.shadowMapType),w.push(T.toneMapping),w.push(T.numClippingPlanes),w.push(T.numClipIntersection),w.push(T.depthPacking)}function b(w,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.map&&a.enable(4),T.matcap&&a.enable(5),T.envMap&&a.enable(6),T.lightMap&&a.enable(7),T.aoMap&&a.enable(8),T.emissiveMap&&a.enable(9),T.bumpMap&&a.enable(10),T.normalMap&&a.enable(11),T.objectSpaceNormalMap&&a.enable(12),T.tangentSpaceNormalMap&&a.enable(13),T.clearcoat&&a.enable(14),T.clearcoatMap&&a.enable(15),T.clearcoatRoughnessMap&&a.enable(16),T.clearcoatNormalMap&&a.enable(17),T.iridescence&&a.enable(18),T.iridescenceMap&&a.enable(19),T.iridescenceThicknessMap&&a.enable(20),T.displacementMap&&a.enable(21),T.specularMap&&a.enable(22),T.roughnessMap&&a.enable(23),T.metalnessMap&&a.enable(24),T.gradientMap&&a.enable(25),T.alphaMap&&a.enable(26),T.alphaTest&&a.enable(27),T.vertexColors&&a.enable(28),T.vertexAlphas&&a.enable(29),T.vertexUvs&&a.enable(30),T.vertexTangents&&a.enable(31),T.uvsVertexOnly&&a.enable(32),w.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.specularIntensityMap&&a.enable(15),T.specularColorMap&&a.enable(16),T.transmission&&a.enable(17),T.transmissionMap&&a.enable(18),T.thicknessMap&&a.enable(19),T.sheen&&a.enable(20),T.sheenColorMap&&a.enable(21),T.sheenRoughnessMap&&a.enable(22),T.decodeVideoTexture&&a.enable(23),T.opaque&&a.enable(24),w.push(a.mask)}function v(w){const T=x[w.type];let F;if(T){const K=Fn[T];F=bh.clone(K.uniforms)}else F=w.uniforms;return F}function y(w,T){let F;for(let K=0,$=c.length;K<$;K++){const B=c[K];if(B.cacheKey===T){F=B,++F.usedTimes;break}}return F===void 0&&(F=new l0(r,T,w,s),c.push(F)),F}function S(w){if(--w.usedTimes===0){const T=c.indexOf(w);c[T]=c[c.length-1],c.pop(),w.destroy()}}function R(w){l.remove(w)}function I(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:v,acquireProgram:y,releaseProgram:S,releaseShaderCache:R,programs:c,dispose:I}}function f0(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function p0(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Jl(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Ql(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,m,x,p,f){let _=r[e];return _===void 0?(_={id:u.id,object:u,geometry:d,material:m,groupOrder:x,renderOrder:u.renderOrder,z:p,group:f},r[e]=_):(_.id=u.id,_.object=u,_.geometry=d,_.material=m,_.groupOrder=x,_.renderOrder=u.renderOrder,_.z=p,_.group=f),e++,_}function a(u,d,m,x,p,f){const _=o(u,d,m,x,p,f);m.transmission>0?n.push(_):m.transparent===!0?i.push(_):t.push(_)}function l(u,d,m,x,p,f){const _=o(u,d,m,x,p,f);m.transmission>0?n.unshift(_):m.transparent===!0?i.unshift(_):t.unshift(_)}function c(u,d){t.length>1&&t.sort(u||p0),n.length>1&&n.sort(d||Jl),i.length>1&&i.sort(d||Jl)}function h(){for(let u=e,d=r.length;u<d;u++){const m=r[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function m0(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Ql,r.set(n,[o])):i>=s.length?(o=new Ql,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function g0(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new ke};break;case"SpotLight":t={position:new P,direction:new P,color:new ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new ke,groundColor:new ke};break;case"RectAreaLight":t={color:new ke,position:new P,halfWidth:new P,halfHeight:new P};break}return r[e.id]=t,t}}}function _0(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let x0=0;function v0(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function y0(r,e){const t=new g0,n=_0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let h=0;h<9;h++)i.probe.push(new P);const s=new P,o=new $e,a=new $e;function l(h,u){let d=0,m=0,x=0;for(let K=0;K<9;K++)i.probe[K].set(0,0,0);let p=0,f=0,_=0,b=0,v=0,y=0,S=0,R=0,I=0,w=0;h.sort(v0);const T=u===!0?Math.PI:1;for(let K=0,$=h.length;K<$;K++){const B=h[K],O=B.color,q=B.intensity,ee=B.distance,oe=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)d+=O.r*q*T,m+=O.g*q*T,x+=O.b*q*T;else if(B.isLightProbe)for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(B.sh.coefficients[Z],q);else if(B.isDirectionalLight){const Z=t.get(B);if(Z.color.copy(B.color).multiplyScalar(B.intensity*T),B.castShadow){const ie=B.shadow,te=n.get(B);te.shadowBias=ie.bias,te.shadowNormalBias=ie.normalBias,te.shadowRadius=ie.radius,te.shadowMapSize=ie.mapSize,i.directionalShadow[p]=te,i.directionalShadowMap[p]=oe,i.directionalShadowMatrix[p]=B.shadow.matrix,y++}i.directional[p]=Z,p++}else if(B.isSpotLight){const Z=t.get(B);Z.position.setFromMatrixPosition(B.matrixWorld),Z.color.copy(O).multiplyScalar(q*T),Z.distance=ee,Z.coneCos=Math.cos(B.angle),Z.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),Z.decay=B.decay,i.spot[_]=Z;const ie=B.shadow;if(B.map&&(i.spotLightMap[I]=B.map,I++,ie.updateMatrices(B),B.castShadow&&w++),i.spotLightMatrix[_]=ie.matrix,B.castShadow){const te=n.get(B);te.shadowBias=ie.bias,te.shadowNormalBias=ie.normalBias,te.shadowRadius=ie.radius,te.shadowMapSize=ie.mapSize,i.spotShadow[_]=te,i.spotShadowMap[_]=oe,R++}_++}else if(B.isRectAreaLight){const Z=t.get(B);Z.color.copy(O).multiplyScalar(q),Z.halfWidth.set(B.width*.5,0,0),Z.halfHeight.set(0,B.height*.5,0),i.rectArea[b]=Z,b++}else if(B.isPointLight){const Z=t.get(B);if(Z.color.copy(B.color).multiplyScalar(B.intensity*T),Z.distance=B.distance,Z.decay=B.decay,B.castShadow){const ie=B.shadow,te=n.get(B);te.shadowBias=ie.bias,te.shadowNormalBias=ie.normalBias,te.shadowRadius=ie.radius,te.shadowMapSize=ie.mapSize,te.shadowCameraNear=ie.camera.near,te.shadowCameraFar=ie.camera.far,i.pointShadow[f]=te,i.pointShadowMap[f]=oe,i.pointShadowMatrix[f]=B.shadow.matrix,S++}i.point[f]=Z,f++}else if(B.isHemisphereLight){const Z=t.get(B);Z.skyColor.copy(B.color).multiplyScalar(q*T),Z.groundColor.copy(B.groundColor).multiplyScalar(q*T),i.hemi[v]=Z,v++}}b>0&&(e.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xe.LTC_FLOAT_1,i.rectAreaLTC2=xe.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=xe.LTC_HALF_1,i.rectAreaLTC2=xe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=m,i.ambient[2]=x;const F=i.hash;(F.directionalLength!==p||F.pointLength!==f||F.spotLength!==_||F.rectAreaLength!==b||F.hemiLength!==v||F.numDirectionalShadows!==y||F.numPointShadows!==S||F.numSpotShadows!==R||F.numSpotMaps!==I)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=b,i.point.length=f,i.hemi.length=v,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=R,i.spotShadowMap.length=R,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=R+I-w,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=w,F.directionalLength=p,F.pointLength=f,F.spotLength=_,F.rectAreaLength=b,F.hemiLength=v,F.numDirectionalShadows=y,F.numPointShadows=S,F.numSpotShadows=R,F.numSpotMaps=I,i.version=x0++)}function c(h,u){let d=0,m=0,x=0,p=0,f=0;const _=u.matrixWorldInverse;for(let b=0,v=h.length;b<v;b++){const y=h[b];if(y.isDirectionalLight){const S=i.directional[d];S.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(_),d++}else if(y.isSpotLight){const S=i.spot[x];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(_),S.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(_),x++}else if(y.isRectAreaLight){const S=i.rectArea[p];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(_),a.identity(),o.copy(y.matrixWorld),o.premultiply(_),a.extractRotation(o),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),p++}else if(y.isPointLight){const S=i.point[m];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(_),m++}else if(y.isHemisphereLight){const S=i.hemi[f];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(_),f++}}}return{setup:l,setupView:c,state:i}}function ec(r,e){const t=new y0(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function w0(r,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new ec(r,e),t.set(s,[l])):o>=a.length?(l=new ec(r,e),a.push(l)):l=a[o],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class b0 extends Cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class M0 extends Cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new P,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const S0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,E0=`uniform sampler2D shadow_pass;
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
}`;function T0(r,e,t){let n=new Ta;const i=new Ue,s=new Ue,o=new at,a=new b0({depthPacking:_d}),l=new M0,c={},h=t.maxTextureSize,u={[ti]:en,[en]:ti,[Sn]:Sn},d=new ii({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:S0,fragmentShader:E0}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const x=new Rt;x.setAttribute("position",new kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const p=new ge(x,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nh,this.render=function(y,S,R){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||y.length===0)return;const I=r.getRenderTarget(),w=r.getActiveCubeFace(),T=r.getActiveMipmapLevel(),F=r.state;F.setBlending(gi),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);for(let K=0,$=y.length;K<$;K++){const B=y[K],O=B.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",B,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;i.copy(O.mapSize);const q=O.getFrameExtents();if(i.multiply(q),s.copy(O.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/q.x),i.x=s.x*q.x,O.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/q.y),i.y=s.y*q.y,O.mapSize.y=s.y)),O.map===null){const oe=this.type!==Li?{minFilter:Lt,magFilter:Lt}:{};O.map=new Hn(i.x,i.y,oe),O.map.texture.name=B.name+".shadowMap",O.camera.updateProjectionMatrix()}r.setRenderTarget(O.map),r.clear();const ee=O.getViewportCount();for(let oe=0;oe<ee;oe++){const Z=O.getViewport(oe);o.set(s.x*Z.x,s.y*Z.y,s.x*Z.z,s.y*Z.w),F.viewport(o),O.updateMatrices(B,oe),n=O.getFrustum(),v(S,R,O.camera,B,this.type)}O.isPointLightShadow!==!0&&this.type===Li&&_(O,R),O.needsUpdate=!1}f.needsUpdate=!1,r.setRenderTarget(I,w,T)};function _(y,S){const R=e.update(p);d.defines.VSM_SAMPLES!==y.blurSamples&&(d.defines.VSM_SAMPLES=y.blurSamples,m.defines.VSM_SAMPLES=y.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new Hn(i.x,i.y)),d.uniforms.shadow_pass.value=y.map.texture,d.uniforms.resolution.value=y.mapSize,d.uniforms.radius.value=y.radius,r.setRenderTarget(y.mapPass),r.clear(),r.renderBufferDirect(S,null,R,d,p,null),m.uniforms.shadow_pass.value=y.mapPass.texture,m.uniforms.resolution.value=y.mapSize,m.uniforms.radius.value=y.radius,r.setRenderTarget(y.map),r.clear(),r.renderBufferDirect(S,null,R,m,p,null)}function b(y,S,R,I,w,T){let F=null;const K=R.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(K!==void 0)F=K;else if(F=R.isPointLight===!0?l:a,r.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){const $=F.uuid,B=S.uuid;let O=c[$];O===void 0&&(O={},c[$]=O);let q=O[B];q===void 0&&(q=F.clone(),O[B]=q),F=q}return F.visible=S.visible,F.wireframe=S.wireframe,T===Li?F.side=S.shadowSide!==null?S.shadowSide:S.side:F.side=S.shadowSide!==null?S.shadowSide:u[S.side],F.alphaMap=S.alphaMap,F.alphaTest=S.alphaTest,F.map=S.map,F.clipShadows=S.clipShadows,F.clippingPlanes=S.clippingPlanes,F.clipIntersection=S.clipIntersection,F.displacementMap=S.displacementMap,F.displacementScale=S.displacementScale,F.displacementBias=S.displacementBias,F.wireframeLinewidth=S.wireframeLinewidth,F.linewidth=S.linewidth,R.isPointLight===!0&&F.isMeshDistanceMaterial===!0&&(F.referencePosition.setFromMatrixPosition(R.matrixWorld),F.nearDistance=I,F.farDistance=w),F}function v(y,S,R,I,w){if(y.visible===!1)return;if(y.layers.test(S.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&w===Li)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,y.matrixWorld);const K=e.update(y),$=y.material;if(Array.isArray($)){const B=K.groups;for(let O=0,q=B.length;O<q;O++){const ee=B[O],oe=$[ee.materialIndex];if(oe&&oe.visible){const Z=b(y,oe,I,R.near,R.far,w);r.renderBufferDirect(R,null,K,Z,y,ee)}}}else if($.visible){const B=b(y,$,I,R.near,R.far,w);r.renderBufferDirect(R,null,K,B,y,null)}}const F=y.children;for(let K=0,$=F.length;K<$;K++)v(F[K],S,R,I,w)}}function A0(r,e,t){const n=t.isWebGL2;function i(){let z=!1;const k=new at;let le=null;const Se=new at(0,0,0,0);return{setMask:function(Re){le!==Re&&!z&&(r.colorMask(Re,Re,Re,Re),le=Re)},setLocked:function(Re){z=Re},setClear:function(Re,st,wt,Dt,rn){rn===!0&&(Re*=Dt,st*=Dt,wt*=Dt),k.set(Re,st,wt,Dt),Se.equals(k)===!1&&(r.clearColor(Re,st,wt,Dt),Se.copy(k))},reset:function(){z=!1,le=null,Se.set(-1,0,0,0)}}}function s(){let z=!1,k=null,le=null,Se=null;return{setTest:function(Re){Re?ve(2929):be(2929)},setMask:function(Re){k!==Re&&!z&&(r.depthMask(Re),k=Re)},setFunc:function(Re){if(le!==Re){switch(Re){case Hu:r.depthFunc(512);break;case Gu:r.depthFunc(519);break;case Vu:r.depthFunc(513);break;case Jo:r.depthFunc(515);break;case Wu:r.depthFunc(514);break;case Xu:r.depthFunc(518);break;case ju:r.depthFunc(516);break;case qu:r.depthFunc(517);break;default:r.depthFunc(515)}le=Re}},setLocked:function(Re){z=Re},setClear:function(Re){Se!==Re&&(r.clearDepth(Re),Se=Re)},reset:function(){z=!1,k=null,le=null,Se=null}}}function o(){let z=!1,k=null,le=null,Se=null,Re=null,st=null,wt=null,Dt=null,rn=null;return{setTest:function(mt){z||(mt?ve(2960):be(2960))},setMask:function(mt){k!==mt&&!z&&(r.stencilMask(mt),k=mt)},setFunc:function(mt,Kt,on){(le!==mt||Se!==Kt||Re!==on)&&(r.stencilFunc(mt,Kt,on),le=mt,Se=Kt,Re=on)},setOp:function(mt,Kt,on){(st!==mt||wt!==Kt||Dt!==on)&&(r.stencilOp(mt,Kt,on),st=mt,wt=Kt,Dt=on)},setLocked:function(mt){z=mt},setClear:function(mt){rn!==mt&&(r.clearStencil(mt),rn=mt)},reset:function(){z=!1,k=null,le=null,Se=null,Re=null,st=null,wt=null,Dt=null,rn=null}}}const a=new i,l=new s,c=new o,h=new WeakMap,u=new WeakMap;let d={},m={},x=new WeakMap,p=[],f=null,_=!1,b=null,v=null,y=null,S=null,R=null,I=null,w=null,T=!1,F=null,K=null,$=null,B=null,O=null;const q=r.getParameter(35661);let ee=!1,oe=0;const Z=r.getParameter(7938);Z.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec(Z)[1]),ee=oe>=1):Z.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),ee=oe>=2);let ie=null,te={};const Te=r.getParameter(3088),G=r.getParameter(2978),ae=new at().fromArray(Te),fe=new at().fromArray(G);function W(z,k,le){const Se=new Uint8Array(4),Re=r.createTexture();r.bindTexture(z,Re),r.texParameteri(z,10241,9728),r.texParameteri(z,10240,9728);for(let st=0;st<le;st++)r.texImage2D(k+st,0,6408,1,1,0,6408,5121,Se);return Re}const ue={};ue[3553]=W(3553,3553,1),ue[34067]=W(34067,34069,6),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),ve(2929),l.setFunc(Jo),vt(!1),yt(Va),ve(2884),_t(gi);function ve(z){d[z]!==!0&&(r.enable(z),d[z]=!0)}function be(z){d[z]!==!1&&(r.disable(z),d[z]=!1)}function Le(z,k){return m[z]!==k?(r.bindFramebuffer(z,k),m[z]=k,n&&(z===36009&&(m[36160]=k),z===36160&&(m[36009]=k)),!0):!1}function Oe(z,k){let le=p,Se=!1;if(z)if(le=x.get(k),le===void 0&&(le=[],x.set(k,le)),z.isWebGLMultipleRenderTargets){const Re=z.texture;if(le.length!==Re.length||le[0]!==36064){for(let st=0,wt=Re.length;st<wt;st++)le[st]=36064+st;le.length=Re.length,Se=!0}}else le[0]!==36064&&(le[0]=36064,Se=!0);else le[0]!==1029&&(le[0]=1029,Se=!0);Se&&(t.isWebGL2?r.drawBuffers(le):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(le))}function Ge(z){return f!==z?(r.useProgram(z),f=z,!0):!1}const je={[es]:32774,[Ru]:32778,[Pu]:32779};if(n)je[qa]=32775,je[$a]=32776;else{const z=e.get("EXT_blend_minmax");z!==null&&(je[qa]=z.MIN_EXT,je[$a]=z.MAX_EXT)}const Ke={[Du]:0,[Iu]:1,[Nu]:768,[ih]:770,[Bu]:776,[ku]:774,[Ou]:772,[Fu]:769,[sh]:771,[zu]:775,[Uu]:773};function _t(z,k,le,Se,Re,st,wt,Dt){if(z===gi){_===!0&&(be(3042),_=!1);return}if(_===!1&&(ve(3042),_=!0),z!==Lu){if(z!==b||Dt!==T){if((v!==es||R!==es)&&(r.blendEquation(32774),v=es,R=es),Dt)switch(z){case as:r.blendFuncSeparate(1,771,1,771);break;case Wa:r.blendFunc(1,1);break;case Xa:r.blendFuncSeparate(0,769,0,1);break;case ja:r.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case as:r.blendFuncSeparate(770,771,1,771);break;case Wa:r.blendFunc(770,1);break;case Xa:r.blendFuncSeparate(0,769,0,1);break;case ja:r.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}y=null,S=null,I=null,w=null,b=z,T=Dt}return}Re=Re||k,st=st||le,wt=wt||Se,(k!==v||Re!==R)&&(r.blendEquationSeparate(je[k],je[Re]),v=k,R=Re),(le!==y||Se!==S||st!==I||wt!==w)&&(r.blendFuncSeparate(Ke[le],Ke[Se],Ke[st],Ke[wt]),y=le,S=Se,I=st,w=wt),b=z,T=!1}function Tt(z,k){z.side===Sn?be(2884):ve(2884);let le=z.side===en;k&&(le=!le),vt(le),z.blending===as&&z.transparent===!1?_t(gi):_t(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.premultipliedAlpha),l.setFunc(z.depthFunc),l.setTest(z.depthTest),l.setMask(z.depthWrite),a.setMask(z.colorWrite);const Se=z.stencilWrite;c.setTest(Se),Se&&(c.setMask(z.stencilWriteMask),c.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),c.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),it(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?ve(32926):be(32926)}function vt(z){F!==z&&(z?r.frontFace(2304):r.frontFace(2305),F=z)}function yt(z){z!==Tu?(ve(2884),z!==K&&(z===Va?r.cullFace(1029):z===Au?r.cullFace(1028):r.cullFace(1032))):be(2884),K=z}function ct(z){z!==$&&(ee&&r.lineWidth(z),$=z)}function it(z,k,le){z?(ve(32823),(B!==k||O!==le)&&(r.polygonOffset(k,le),B=k,O=le)):be(32823)}function Wt(z){z?ve(3089):be(3089)}function Pt(z){z===void 0&&(z=33984+q-1),ie!==z&&(r.activeTexture(z),ie=z)}function L(z,k,le){le===void 0&&(ie===null?le=33984+q-1:le=ie);let Se=te[le];Se===void 0&&(Se={type:void 0,texture:void 0},te[le]=Se),(Se.type!==z||Se.texture!==k)&&(ie!==le&&(r.activeTexture(le),ie=le),r.bindTexture(z,k||ue[z]),Se.type=z,Se.texture=k)}function E(){const z=te[ie];z!==void 0&&z.type!==void 0&&(r.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function J(){try{r.compressedTexImage2D.apply(r,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function pe(){try{r.compressedTexImage3D.apply(r,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function me(){try{r.texSubImage2D.apply(r,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ye(){try{r.texSubImage3D.apply(r,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ne(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function D(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function V(){try{r.texStorage2D.apply(r,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Me(){try{r.texStorage3D.apply(r,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function _e(){try{r.texImage2D.apply(r,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ae(){try{r.texImage3D.apply(r,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function we(z){ae.equals(z)===!1&&(r.scissor(z.x,z.y,z.z,z.w),ae.copy(z))}function De(z){fe.equals(z)===!1&&(r.viewport(z.x,z.y,z.z,z.w),fe.copy(z))}function We(z,k){let le=u.get(k);le===void 0&&(le=new WeakMap,u.set(k,le));let Se=le.get(z);Se===void 0&&(Se=r.getUniformBlockIndex(k,z.name),le.set(z,Se))}function Be(z,k){const Se=u.get(k).get(z);h.get(k)!==Se&&(r.uniformBlockBinding(k,Se,z.__bindingPointIndex),h.set(k,Se))}function He(){r.disable(3042),r.disable(2884),r.disable(2929),r.disable(32823),r.disable(3089),r.disable(2960),r.disable(32926),r.blendEquation(32774),r.blendFunc(1,0),r.blendFuncSeparate(1,0,1,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(513),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(519,0,4294967295),r.stencilOp(7680,7680,7680),r.clearStencil(0),r.cullFace(1029),r.frontFace(2305),r.polygonOffset(0,0),r.activeTexture(33984),r.bindFramebuffer(36160,null),n===!0&&(r.bindFramebuffer(36009,null),r.bindFramebuffer(36008,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},ie=null,te={},m={},x=new WeakMap,p=[],f=null,_=!1,b=null,v=null,y=null,S=null,R=null,I=null,w=null,T=!1,F=null,K=null,$=null,B=null,O=null,ae.set(0,0,r.canvas.width,r.canvas.height),fe.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:ve,disable:be,bindFramebuffer:Le,drawBuffers:Oe,useProgram:Ge,setBlending:_t,setMaterial:Tt,setFlipSided:vt,setCullFace:yt,setLineWidth:ct,setPolygonOffset:it,setScissorTest:Wt,activeTexture:Pt,bindTexture:L,unbindTexture:E,compressedTexImage2D:J,compressedTexImage3D:pe,texImage2D:_e,texImage3D:Ae,updateUBOMapping:We,uniformBlockBinding:Be,texStorage2D:V,texStorage3D:Me,texSubImage2D:me,texSubImage3D:ye,compressedTexSubImage2D:Ne,compressedTexSubImage3D:D,scissor:we,viewport:De,reset:He}}function C0(r,e,t,n,i,s,o){const a=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,h=i.maxTextureSize,u=i.maxSamples,d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),x=new WeakMap;let p;const f=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(L,E){return _?new OffscreenCanvas(L,E):ir("canvas")}function v(L,E,J,pe){let me=1;if((L.width>pe||L.height>pe)&&(me=pe/Math.max(L.width,L.height)),me<1||E===!0)if(typeof HTMLImageElement!="undefined"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&L instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&L instanceof ImageBitmap){const ye=E?fh:Math.floor,Ne=ye(me*L.width),D=ye(me*L.height);p===void 0&&(p=b(Ne,D));const V=J?b(Ne,D):p;return V.width=Ne,V.height=D,V.getContext("2d").drawImage(L,0,0,Ne,D),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+Ne+"x"+D+")."),V}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function y(L){return sa(L.width)&&sa(L.height)}function S(L){return a?!1:L.wrapS!==Qt||L.wrapT!==Qt||L.minFilter!==Lt&&L.minFilter!==ut}function R(L,E){return L.generateMipmaps&&E&&L.minFilter!==Lt&&L.minFilter!==ut}function I(L){r.generateMipmap(L)}function w(L,E,J,pe,me=!1){if(a===!1)return E;if(L!==null){if(r[L]!==void 0)return r[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let ye=E;return E===6403&&(J===5126&&(ye=33326),J===5131&&(ye=33325),J===5121&&(ye=33321)),E===33319&&(J===5126&&(ye=33328),J===5131&&(ye=33327),J===5121&&(ye=33323)),E===6408&&(J===5126&&(ye=34836),J===5131&&(ye=34842),J===5121&&(ye=pe===Je&&me===!1?35907:32856),J===32819&&(ye=32854),J===32820&&(ye=32855)),(ye===33325||ye===33326||ye===33327||ye===33328||ye===34842||ye===34836)&&e.get("EXT_color_buffer_float"),ye}function T(L,E,J){return R(L,J)===!0||L.isFramebufferTexture&&L.minFilter!==Lt&&L.minFilter!==ut?Math.log2(Math.max(E.width,E.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?E.mipmaps.length:1}function F(L){return L===Lt||L===ea||L===Gr?9728:9729}function K(L){const E=L.target;E.removeEventListener("dispose",K),B(E),E.isVideoTexture&&x.delete(E)}function $(L){const E=L.target;E.removeEventListener("dispose",$),q(E)}function B(L){const E=n.get(L);if(E.__webglInit===void 0)return;const J=L.source,pe=f.get(J);if(pe){const me=pe[E.__cacheKey];me.usedTimes--,me.usedTimes===0&&O(L),Object.keys(pe).length===0&&f.delete(J)}n.remove(L)}function O(L){const E=n.get(L);r.deleteTexture(E.__webglTexture);const J=L.source,pe=f.get(J);delete pe[E.__cacheKey],o.memory.textures--}function q(L){const E=L.texture,J=n.get(L),pe=n.get(E);if(pe.__webglTexture!==void 0&&(r.deleteTexture(pe.__webglTexture),o.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let me=0;me<6;me++)r.deleteFramebuffer(J.__webglFramebuffer[me]),J.__webglDepthbuffer&&r.deleteRenderbuffer(J.__webglDepthbuffer[me]);else{if(r.deleteFramebuffer(J.__webglFramebuffer),J.__webglDepthbuffer&&r.deleteRenderbuffer(J.__webglDepthbuffer),J.__webglMultisampledFramebuffer&&r.deleteFramebuffer(J.__webglMultisampledFramebuffer),J.__webglColorRenderbuffer)for(let me=0;me<J.__webglColorRenderbuffer.length;me++)J.__webglColorRenderbuffer[me]&&r.deleteRenderbuffer(J.__webglColorRenderbuffer[me]);J.__webglDepthRenderbuffer&&r.deleteRenderbuffer(J.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let me=0,ye=E.length;me<ye;me++){const Ne=n.get(E[me]);Ne.__webglTexture&&(r.deleteTexture(Ne.__webglTexture),o.memory.textures--),n.remove(E[me])}n.remove(E),n.remove(L)}let ee=0;function oe(){ee=0}function Z(){const L=ee;return L>=l&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+l),ee+=1,L}function ie(L){const E=[];return E.push(L.wrapS),E.push(L.wrapT),E.push(L.wrapR||0),E.push(L.magFilter),E.push(L.minFilter),E.push(L.anisotropy),E.push(L.internalFormat),E.push(L.format),E.push(L.type),E.push(L.generateMipmaps),E.push(L.premultiplyAlpha),E.push(L.flipY),E.push(L.unpackAlignment),E.push(L.encoding),E.join()}function te(L,E){const J=n.get(L);if(L.isVideoTexture&&Wt(L),L.isRenderTargetTexture===!1&&L.version>0&&J.__version!==L.version){const pe=L.image;if(pe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(pe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{be(J,L,E);return}}t.bindTexture(3553,J.__webglTexture,33984+E)}function Te(L,E){const J=n.get(L);if(L.version>0&&J.__version!==L.version){be(J,L,E);return}t.bindTexture(35866,J.__webglTexture,33984+E)}function G(L,E){const J=n.get(L);if(L.version>0&&J.__version!==L.version){be(J,L,E);return}t.bindTexture(32879,J.__webglTexture,33984+E)}function ae(L,E){const J=n.get(L);if(L.version>0&&J.__version!==L.version){Le(J,L,E);return}t.bindTexture(34067,J.__webglTexture,33984+E)}const fe={[ps]:10497,[Qt]:33071,[Xr]:33648},W={[Lt]:9728,[ea]:9984,[Gr]:9986,[ut]:9729,[ah]:9985,[xi]:9987};function ue(L,E,J){if(J?(r.texParameteri(L,10242,fe[E.wrapS]),r.texParameteri(L,10243,fe[E.wrapT]),(L===32879||L===35866)&&r.texParameteri(L,32882,fe[E.wrapR]),r.texParameteri(L,10240,W[E.magFilter]),r.texParameteri(L,10241,W[E.minFilter])):(r.texParameteri(L,10242,33071),r.texParameteri(L,10243,33071),(L===32879||L===35866)&&r.texParameteri(L,32882,33071),(E.wrapS!==Qt||E.wrapT!==Qt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(L,10240,F(E.magFilter)),r.texParameteri(L,10241,F(E.minFilter)),E.minFilter!==Lt&&E.minFilter!==ut&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const pe=e.get("EXT_texture_filter_anisotropic");if(E.magFilter===Lt||E.minFilter!==Gr&&E.minFilter!==xi||E.type===En&&e.has("OES_texture_float_linear")===!1||a===!1&&E.type===fn&&e.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||n.get(E).__currentAnisotropy)&&(r.texParameterf(L,pe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy)}}function ve(L,E){let J=!1;L.__webglInit===void 0&&(L.__webglInit=!0,E.addEventListener("dispose",K));const pe=E.source;let me=f.get(pe);me===void 0&&(me={},f.set(pe,me));const ye=ie(E);if(ye!==L.__cacheKey){me[ye]===void 0&&(me[ye]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,J=!0),me[ye].usedTimes++;const Ne=me[L.__cacheKey];Ne!==void 0&&(me[L.__cacheKey].usedTimes--,Ne.usedTimes===0&&O(E)),L.__cacheKey=ye,L.__webglTexture=me[ye].texture}return J}function be(L,E,J){let pe=3553;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(pe=35866),E.isData3DTexture&&(pe=32879);const me=ve(L,E),ye=E.source;t.bindTexture(pe,L.__webglTexture,33984+J);const Ne=n.get(ye);if(ye.version!==Ne.__version||me===!0){t.activeTexture(33984+J),r.pixelStorei(37440,E.flipY),r.pixelStorei(37441,E.premultiplyAlpha),r.pixelStorei(3317,E.unpackAlignment),r.pixelStorei(37443,0);const D=S(E)&&y(E.image)===!1;let V=v(E.image,D,!1,h);V=Pt(E,V);const Me=y(V)||a,_e=s.convert(E.format,E.encoding);let Ae=s.convert(E.type),we=w(E.internalFormat,_e,Ae,E.encoding,E.isVideoTexture);ue(pe,E,Me);let De;const We=E.mipmaps,Be=a&&E.isVideoTexture!==!0,He=Ne.__version===void 0||me===!0,z=T(E,V,Me);if(E.isDepthTexture)we=6402,a?E.type===En?we=36012:E.type===Ri?we=33190:E.type===ls?we=35056:we=33189:E.type===En&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===_i&&we===6402&&E.type!==Ma&&E.type!==Ri&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=Ri,Ae=s.convert(E.type)),E.format===ms&&we===6402&&(we=34041,E.type!==ls&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=ls,Ae=s.convert(E.type))),He&&(Be?t.texStorage2D(3553,1,we,V.width,V.height):t.texImage2D(3553,0,we,V.width,V.height,0,_e,Ae,null));else if(E.isDataTexture)if(We.length>0&&Me){Be&&He&&t.texStorage2D(3553,z,we,We[0].width,We[0].height);for(let k=0,le=We.length;k<le;k++)De=We[k],Be?t.texSubImage2D(3553,k,0,0,De.width,De.height,_e,Ae,De.data):t.texImage2D(3553,k,we,De.width,De.height,0,_e,Ae,De.data);E.generateMipmaps=!1}else Be?(He&&t.texStorage2D(3553,z,we,V.width,V.height),t.texSubImage2D(3553,0,0,0,V.width,V.height,_e,Ae,V.data)):t.texImage2D(3553,0,we,V.width,V.height,0,_e,Ae,V.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Be&&He&&t.texStorage3D(35866,z,we,We[0].width,We[0].height,V.depth);for(let k=0,le=We.length;k<le;k++)De=We[k],E.format!==sn?_e!==null?Be?t.compressedTexSubImage3D(35866,k,0,0,0,De.width,De.height,V.depth,_e,De.data,0,0):t.compressedTexImage3D(35866,k,we,De.width,De.height,V.depth,0,De.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?t.texSubImage3D(35866,k,0,0,0,De.width,De.height,V.depth,_e,Ae,De.data):t.texImage3D(35866,k,we,De.width,De.height,V.depth,0,_e,Ae,De.data)}else{Be&&He&&t.texStorage2D(3553,z,we,We[0].width,We[0].height);for(let k=0,le=We.length;k<le;k++)De=We[k],E.format!==sn?_e!==null?Be?t.compressedTexSubImage2D(3553,k,0,0,De.width,De.height,_e,De.data):t.compressedTexImage2D(3553,k,we,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?t.texSubImage2D(3553,k,0,0,De.width,De.height,_e,Ae,De.data):t.texImage2D(3553,k,we,De.width,De.height,0,_e,Ae,De.data)}else if(E.isDataArrayTexture)Be?(He&&t.texStorage3D(35866,z,we,V.width,V.height,V.depth),t.texSubImage3D(35866,0,0,0,0,V.width,V.height,V.depth,_e,Ae,V.data)):t.texImage3D(35866,0,we,V.width,V.height,V.depth,0,_e,Ae,V.data);else if(E.isData3DTexture)Be?(He&&t.texStorage3D(32879,z,we,V.width,V.height,V.depth),t.texSubImage3D(32879,0,0,0,0,V.width,V.height,V.depth,_e,Ae,V.data)):t.texImage3D(32879,0,we,V.width,V.height,V.depth,0,_e,Ae,V.data);else if(E.isFramebufferTexture){if(He)if(Be)t.texStorage2D(3553,z,we,V.width,V.height);else{let k=V.width,le=V.height;for(let Se=0;Se<z;Se++)t.texImage2D(3553,Se,we,k,le,0,_e,Ae,null),k>>=1,le>>=1}}else if(We.length>0&&Me){Be&&He&&t.texStorage2D(3553,z,we,We[0].width,We[0].height);for(let k=0,le=We.length;k<le;k++)De=We[k],Be?t.texSubImage2D(3553,k,0,0,_e,Ae,De):t.texImage2D(3553,k,we,_e,Ae,De);E.generateMipmaps=!1}else Be?(He&&t.texStorage2D(3553,z,we,V.width,V.height),t.texSubImage2D(3553,0,0,0,_e,Ae,V)):t.texImage2D(3553,0,we,_e,Ae,V);R(E,Me)&&I(pe),Ne.__version=ye.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function Le(L,E,J){if(E.image.length!==6)return;const pe=ve(L,E),me=E.source;t.bindTexture(34067,L.__webglTexture,33984+J);const ye=n.get(me);if(me.version!==ye.__version||pe===!0){t.activeTexture(33984+J),r.pixelStorei(37440,E.flipY),r.pixelStorei(37441,E.premultiplyAlpha),r.pixelStorei(3317,E.unpackAlignment),r.pixelStorei(37443,0);const Ne=E.isCompressedTexture||E.image[0].isCompressedTexture,D=E.image[0]&&E.image[0].isDataTexture,V=[];for(let k=0;k<6;k++)!Ne&&!D?V[k]=v(E.image[k],!1,!0,c):V[k]=D?E.image[k].image:E.image[k],V[k]=Pt(E,V[k]);const Me=V[0],_e=y(Me)||a,Ae=s.convert(E.format,E.encoding),we=s.convert(E.type),De=w(E.internalFormat,Ae,we,E.encoding),We=a&&E.isVideoTexture!==!0,Be=ye.__version===void 0||pe===!0;let He=T(E,Me,_e);ue(34067,E,_e);let z;if(Ne){We&&Be&&t.texStorage2D(34067,He,De,Me.width,Me.height);for(let k=0;k<6;k++){z=V[k].mipmaps;for(let le=0;le<z.length;le++){const Se=z[le];E.format!==sn?Ae!==null?We?t.compressedTexSubImage2D(34069+k,le,0,0,Se.width,Se.height,Ae,Se.data):t.compressedTexImage2D(34069+k,le,De,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?t.texSubImage2D(34069+k,le,0,0,Se.width,Se.height,Ae,we,Se.data):t.texImage2D(34069+k,le,De,Se.width,Se.height,0,Ae,we,Se.data)}}}else{z=E.mipmaps,We&&Be&&(z.length>0&&He++,t.texStorage2D(34067,He,De,V[0].width,V[0].height));for(let k=0;k<6;k++)if(D){We?t.texSubImage2D(34069+k,0,0,0,V[k].width,V[k].height,Ae,we,V[k].data):t.texImage2D(34069+k,0,De,V[k].width,V[k].height,0,Ae,we,V[k].data);for(let le=0;le<z.length;le++){const Re=z[le].image[k].image;We?t.texSubImage2D(34069+k,le+1,0,0,Re.width,Re.height,Ae,we,Re.data):t.texImage2D(34069+k,le+1,De,Re.width,Re.height,0,Ae,we,Re.data)}}else{We?t.texSubImage2D(34069+k,0,0,0,Ae,we,V[k]):t.texImage2D(34069+k,0,De,Ae,we,V[k]);for(let le=0;le<z.length;le++){const Se=z[le];We?t.texSubImage2D(34069+k,le+1,0,0,Ae,we,Se.image[k]):t.texImage2D(34069+k,le+1,De,Ae,we,Se.image[k])}}}R(E,_e)&&I(34067),ye.__version=me.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function Oe(L,E,J,pe,me){const ye=s.convert(J.format,J.encoding),Ne=s.convert(J.type),D=w(J.internalFormat,ye,Ne,J.encoding);n.get(E).__hasExternalTextures||(me===32879||me===35866?t.texImage3D(me,0,D,E.width,E.height,E.depth,0,ye,Ne,null):t.texImage2D(me,0,D,E.width,E.height,0,ye,Ne,null)),t.bindFramebuffer(36160,L),it(E)?d.framebufferTexture2DMultisampleEXT(36160,pe,me,n.get(J).__webglTexture,0,ct(E)):(me===3553||me>=34069&&me<=34074)&&r.framebufferTexture2D(36160,pe,me,n.get(J).__webglTexture,0),t.bindFramebuffer(36160,null)}function Ge(L,E,J){if(r.bindRenderbuffer(36161,L),E.depthBuffer&&!E.stencilBuffer){let pe=33189;if(J||it(E)){const me=E.depthTexture;me&&me.isDepthTexture&&(me.type===En?pe=36012:me.type===Ri&&(pe=33190));const ye=ct(E);it(E)?d.renderbufferStorageMultisampleEXT(36161,ye,pe,E.width,E.height):r.renderbufferStorageMultisample(36161,ye,pe,E.width,E.height)}else r.renderbufferStorage(36161,pe,E.width,E.height);r.framebufferRenderbuffer(36160,36096,36161,L)}else if(E.depthBuffer&&E.stencilBuffer){const pe=ct(E);J&&it(E)===!1?r.renderbufferStorageMultisample(36161,pe,35056,E.width,E.height):it(E)?d.renderbufferStorageMultisampleEXT(36161,pe,35056,E.width,E.height):r.renderbufferStorage(36161,34041,E.width,E.height),r.framebufferRenderbuffer(36160,33306,36161,L)}else{const pe=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let me=0;me<pe.length;me++){const ye=pe[me],Ne=s.convert(ye.format,ye.encoding),D=s.convert(ye.type),V=w(ye.internalFormat,Ne,D,ye.encoding),Me=ct(E);J&&it(E)===!1?r.renderbufferStorageMultisample(36161,Me,V,E.width,E.height):it(E)?d.renderbufferStorageMultisampleEXT(36161,Me,V,E.width,E.height):r.renderbufferStorage(36161,V,E.width,E.height)}}r.bindRenderbuffer(36161,null)}function je(L,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,L),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),te(E.depthTexture,0);const pe=n.get(E.depthTexture).__webglTexture,me=ct(E);if(E.depthTexture.format===_i)it(E)?d.framebufferTexture2DMultisampleEXT(36160,36096,3553,pe,0,me):r.framebufferTexture2D(36160,36096,3553,pe,0);else if(E.depthTexture.format===ms)it(E)?d.framebufferTexture2DMultisampleEXT(36160,33306,3553,pe,0,me):r.framebufferTexture2D(36160,33306,3553,pe,0);else throw new Error("Unknown depthTexture format")}function Ke(L){const E=n.get(L),J=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!E.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");je(E.__webglFramebuffer,L)}else if(J){E.__webglDepthbuffer=[];for(let pe=0;pe<6;pe++)t.bindFramebuffer(36160,E.__webglFramebuffer[pe]),E.__webglDepthbuffer[pe]=r.createRenderbuffer(),Ge(E.__webglDepthbuffer[pe],L,!1)}else t.bindFramebuffer(36160,E.__webglFramebuffer),E.__webglDepthbuffer=r.createRenderbuffer(),Ge(E.__webglDepthbuffer,L,!1);t.bindFramebuffer(36160,null)}function _t(L,E,J){const pe=n.get(L);E!==void 0&&Oe(pe.__webglFramebuffer,L,L.texture,36064,3553),J!==void 0&&Ke(L)}function Tt(L){const E=L.texture,J=n.get(L),pe=n.get(E);L.addEventListener("dispose",$),L.isWebGLMultipleRenderTargets!==!0&&(pe.__webglTexture===void 0&&(pe.__webglTexture=r.createTexture()),pe.__version=E.version,o.memory.textures++);const me=L.isWebGLCubeRenderTarget===!0,ye=L.isWebGLMultipleRenderTargets===!0,Ne=y(L)||a;if(me){J.__webglFramebuffer=[];for(let D=0;D<6;D++)J.__webglFramebuffer[D]=r.createFramebuffer()}else{if(J.__webglFramebuffer=r.createFramebuffer(),ye)if(i.drawBuffers){const D=L.texture;for(let V=0,Me=D.length;V<Me;V++){const _e=n.get(D[V]);_e.__webglTexture===void 0&&(_e.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&L.samples>0&&it(L)===!1){const D=ye?E:[E];J.__webglMultisampledFramebuffer=r.createFramebuffer(),J.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,J.__webglMultisampledFramebuffer);for(let V=0;V<D.length;V++){const Me=D[V];J.__webglColorRenderbuffer[V]=r.createRenderbuffer(),r.bindRenderbuffer(36161,J.__webglColorRenderbuffer[V]);const _e=s.convert(Me.format,Me.encoding),Ae=s.convert(Me.type),we=w(Me.internalFormat,_e,Ae,Me.encoding,L.isXRRenderTarget===!0),De=ct(L);r.renderbufferStorageMultisample(36161,De,we,L.width,L.height),r.framebufferRenderbuffer(36160,36064+V,36161,J.__webglColorRenderbuffer[V])}r.bindRenderbuffer(36161,null),L.depthBuffer&&(J.__webglDepthRenderbuffer=r.createRenderbuffer(),Ge(J.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(36160,null)}}if(me){t.bindTexture(34067,pe.__webglTexture),ue(34067,E,Ne);for(let D=0;D<6;D++)Oe(J.__webglFramebuffer[D],L,E,36064,34069+D);R(E,Ne)&&I(34067),t.unbindTexture()}else if(ye){const D=L.texture;for(let V=0,Me=D.length;V<Me;V++){const _e=D[V],Ae=n.get(_e);t.bindTexture(3553,Ae.__webglTexture),ue(3553,_e,Ne),Oe(J.__webglFramebuffer,L,_e,36064+V,3553),R(_e,Ne)&&I(3553)}t.unbindTexture()}else{let D=3553;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(a?D=L.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(D,pe.__webglTexture),ue(D,E,Ne),Oe(J.__webglFramebuffer,L,E,36064,D),R(E,Ne)&&I(D),t.unbindTexture()}L.depthBuffer&&Ke(L)}function vt(L){const E=y(L)||a,J=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let pe=0,me=J.length;pe<me;pe++){const ye=J[pe];if(R(ye,E)){const Ne=L.isWebGLCubeRenderTarget?34067:3553,D=n.get(ye).__webglTexture;t.bindTexture(Ne,D),I(Ne),t.unbindTexture()}}}function yt(L){if(a&&L.samples>0&&it(L)===!1){const E=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],J=L.width,pe=L.height;let me=16384;const ye=[],Ne=L.stencilBuffer?33306:36096,D=n.get(L),V=L.isWebGLMultipleRenderTargets===!0;if(V)for(let Me=0;Me<E.length;Me++)t.bindFramebuffer(36160,D.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+Me,36161,null),t.bindFramebuffer(36160,D.__webglFramebuffer),r.framebufferTexture2D(36009,36064+Me,3553,null,0);t.bindFramebuffer(36008,D.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,D.__webglFramebuffer);for(let Me=0;Me<E.length;Me++){ye.push(36064+Me),L.depthBuffer&&ye.push(Ne);const _e=D.__ignoreDepthValues!==void 0?D.__ignoreDepthValues:!1;if(_e===!1&&(L.depthBuffer&&(me|=256),L.stencilBuffer&&(me|=1024)),V&&r.framebufferRenderbuffer(36008,36064,36161,D.__webglColorRenderbuffer[Me]),_e===!0&&(r.invalidateFramebuffer(36008,[Ne]),r.invalidateFramebuffer(36009,[Ne])),V){const Ae=n.get(E[Me]).__webglTexture;r.framebufferTexture2D(36009,36064,3553,Ae,0)}r.blitFramebuffer(0,0,J,pe,0,0,J,pe,me,9728),m&&r.invalidateFramebuffer(36008,ye)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),V)for(let Me=0;Me<E.length;Me++){t.bindFramebuffer(36160,D.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+Me,36161,D.__webglColorRenderbuffer[Me]);const _e=n.get(E[Me]).__webglTexture;t.bindFramebuffer(36160,D.__webglFramebuffer),r.framebufferTexture2D(36009,36064+Me,3553,_e,0)}t.bindFramebuffer(36009,D.__webglMultisampledFramebuffer)}}function ct(L){return Math.min(u,L.samples)}function it(L){const E=n.get(L);return a&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Wt(L){const E=o.render.frame;x.get(L)!==E&&(x.set(L,E),L.update())}function Pt(L,E){const J=L.encoding,pe=L.format,me=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===ia||J!==ni&&(J===Je?a===!1?e.has("EXT_sRGB")===!0&&pe===sn?(L.format=ia,L.minFilter=ut,L.generateMipmaps=!1):E=mh.sRGBToLinear(E):(pe!==sn||me!==Pi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",J)),E}this.allocateTextureUnit=Z,this.resetTextureUnits=oe,this.setTexture2D=te,this.setTexture2DArray=Te,this.setTexture3D=G,this.setTextureCube=ae,this.rebindTextures=_t,this.setupRenderTarget=Tt,this.updateRenderTargetMipmap=vt,this.updateMultisampleRenderTarget=yt,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=Oe,this.useMultisampledRTT=it}function L0(r,e,t){const n=t.isWebGL2;function i(s,o=null){let a;if(s===Pi)return 5121;if(s===id)return 32819;if(s===sd)return 32820;if(s===ed)return 5120;if(s===td)return 5122;if(s===Ma)return 5123;if(s===nd)return 5124;if(s===Ri)return 5125;if(s===En)return 5126;if(s===fn)return n?5131:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===rd)return 6406;if(s===sn)return 6408;if(s===od)return 6409;if(s===ad)return 6410;if(s===_i)return 6402;if(s===ms)return 34041;if(s===ia)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===lh)return 6403;if(s===ld)return 36244;if(s===cd)return 33319;if(s===hd)return 33320;if(s===ud)return 36249;if(s===ao||s===lo||s===co||s===ho)if(o===Je)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===ao)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===lo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===co)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===ho)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===ao)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===lo)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===co)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===ho)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ya||s===Za||s===Ka||s===Ja)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Ya)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Za)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ka)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Ja)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===dd)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Qa||s===el)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Qa)return o===Je?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===el)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===tl||s===nl||s===il||s===sl||s===rl||s===ol||s===al||s===ll||s===cl||s===hl||s===ul||s===dl||s===fl||s===pl)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===tl)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===nl)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===il)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===sl)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===rl)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===ol)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===al)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===ll)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===cl)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===hl)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ul)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===dl)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===fl)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===pl)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===uo)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===uo)return o===Je?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(s===fd||s===ml||s===gl||s===_l)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===uo)return a.COMPRESSED_RED_RGTC1_EXT;if(s===ml)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===gl)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===_l)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ls?n?34042:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class R0 extends Ot{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Tn extends lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const P0={type:"move"};class Uo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const p of e.hand.values()){const f=t.getJointPose(p,n),_=this._getHandJoint(c,p);f!==null&&(_.matrix.fromArray(f.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.jointRadius=f.radius),_.visible=f!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,x=.005;c.inputState.pinching&&d>m+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=m-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(P0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Tn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Rh extends Ut{constructor(e,t,n,i,s,o,a,l,c,h){if(h=h!==void 0?h:_i,h!==_i&&h!==ms)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===_i&&(n=Ri),n===void 0&&h===ms&&(n=ls),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Lt,this.minFilter=l!==void 0?l:Lt,this.flipY=!1,this.generateMipmaps=!1}}class D0 extends Ni{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,m=null,x=null;const p=t.getContextAttributes();let f=null,_=null;const b=[],v=[],y=new Set,S=new Map,R=new Ot;R.layers.enable(1),R.viewport=new at;const I=new Ot;I.layers.enable(2),I.viewport=new at;const w=[R,I],T=new R0;T.layers.enable(1),T.layers.enable(2);let F=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let ae=b[G];return ae===void 0&&(ae=new Uo,b[G]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(G){let ae=b[G];return ae===void 0&&(ae=new Uo,b[G]=ae),ae.getGripSpace()},this.getHand=function(G){let ae=b[G];return ae===void 0&&(ae=new Uo,b[G]=ae),ae.getHandSpace()};function $(G){const ae=v.indexOf(G.inputSource);if(ae===-1)return;const fe=b[ae];fe!==void 0&&fe.dispatchEvent({type:G.type,data:G.inputSource})}function B(){i.removeEventListener("select",$),i.removeEventListener("selectstart",$),i.removeEventListener("selectend",$),i.removeEventListener("squeeze",$),i.removeEventListener("squeezestart",$),i.removeEventListener("squeezeend",$),i.removeEventListener("end",B),i.removeEventListener("inputsourceschange",O);for(let G=0;G<b.length;G++){const ae=v[G];ae!==null&&(v[G]=null,b[G].disconnect(ae))}F=null,K=null,e.setRenderTarget(f),m=null,d=null,u=null,i=null,_=null,Te.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){a=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u},this.getFrame=function(){return x},this.getSession=function(){return i},this.setSession=async function(G){if(i=G,i!==null){if(f=e.getRenderTarget(),i.addEventListener("select",$),i.addEventListener("selectstart",$),i.addEventListener("selectend",$),i.addEventListener("squeeze",$),i.addEventListener("squeezestart",$),i.addEventListener("squeezeend",$),i.addEventListener("end",B),i.addEventListener("inputsourceschange",O),p.xrCompatible!==!0&&await t.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ae={antialias:i.renderState.layers===void 0?p.antialias:!0,alpha:p.alpha,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(i,t,ae),i.updateRenderState({baseLayer:m}),_=new Hn(m.framebufferWidth,m.framebufferHeight,{format:sn,type:Pi,encoding:e.outputEncoding,stencilBuffer:p.stencil})}else{let ae=null,fe=null,W=null;p.depth&&(W=p.stencil?35056:33190,ae=p.stencil?ms:_i,fe=p.stencil?ls:Ri);const ue={colorFormat:32856,depthFormat:W,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(ue),i.updateRenderState({layers:[d]}),_=new Hn(d.textureWidth,d.textureHeight,{format:sn,type:Pi,depthTexture:new Rh(d.textureWidth,d.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:p.stencil,encoding:e.outputEncoding,samples:p.antialias?4:0});const ve=e.properties.get(_);ve.__ignoreDepthValues=d.ignoreDepthValues}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Te.setContext(i),Te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function O(G){for(let ae=0;ae<G.removed.length;ae++){const fe=G.removed[ae],W=v.indexOf(fe);W>=0&&(v[W]=null,b[W].disconnect(fe))}for(let ae=0;ae<G.added.length;ae++){const fe=G.added[ae];let W=v.indexOf(fe);if(W===-1){for(let ve=0;ve<b.length;ve++)if(ve>=v.length){v.push(fe),W=ve;break}else if(v[ve]===null){v[ve]=fe,W=ve;break}if(W===-1)break}const ue=b[W];ue&&ue.connect(fe)}}const q=new P,ee=new P;function oe(G,ae,fe){q.setFromMatrixPosition(ae.matrixWorld),ee.setFromMatrixPosition(fe.matrixWorld);const W=q.distanceTo(ee),ue=ae.projectionMatrix.elements,ve=fe.projectionMatrix.elements,be=ue[14]/(ue[10]-1),Le=ue[14]/(ue[10]+1),Oe=(ue[9]+1)/ue[5],Ge=(ue[9]-1)/ue[5],je=(ue[8]-1)/ue[0],Ke=(ve[8]+1)/ve[0],_t=be*je,Tt=be*Ke,vt=W/(-je+Ke),yt=vt*-je;ae.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(yt),G.translateZ(vt),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert();const ct=be+vt,it=Le+vt,Wt=_t-yt,Pt=Tt+(W-yt),L=Oe*Le/it*ct,E=Ge*Le/it*ct;G.projectionMatrix.makePerspective(Wt,Pt,L,E,ct,it)}function Z(G,ae){ae===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(ae.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(i===null)return;T.near=I.near=R.near=G.near,T.far=I.far=R.far=G.far,(F!==T.near||K!==T.far)&&(i.updateRenderState({depthNear:T.near,depthFar:T.far}),F=T.near,K=T.far);const ae=G.parent,fe=T.cameras;Z(T,ae);for(let ue=0;ue<fe.length;ue++)Z(fe[ue],ae);T.matrixWorld.decompose(T.position,T.quaternion,T.scale),G.matrix.copy(T.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale);const W=G.children;for(let ue=0,ve=W.length;ue<ve;ue++)W[ue].updateMatrixWorld(!0);fe.length===2?oe(T,R,I):T.projectionMatrix.copy(R.projectionMatrix)},this.getCamera=function(){return T},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(G){l=G,d!==null&&(d.fixedFoveation=G),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=G)},this.getPlanes=function(){return y};let ie=null;function te(G,ae){if(h=ae.getViewerPose(c||o),x=ae,h!==null){const fe=h.views;m!==null&&(e.setRenderTargetFramebuffer(_,m.framebuffer),e.setRenderTarget(_));let W=!1;fe.length!==T.cameras.length&&(T.cameras.length=0,W=!0);for(let ue=0;ue<fe.length;ue++){const ve=fe[ue];let be=null;if(m!==null)be=m.getViewport(ve);else{const Oe=u.getViewSubImage(d,ve);be=Oe.viewport,ue===0&&(e.setRenderTargetTextures(_,Oe.colorTexture,d.ignoreDepthValues?void 0:Oe.depthStencilTexture),e.setRenderTarget(_))}let Le=w[ue];Le===void 0&&(Le=new Ot,Le.layers.enable(ue),Le.viewport=new at,w[ue]=Le),Le.matrix.fromArray(ve.transform.matrix),Le.projectionMatrix.fromArray(ve.projectionMatrix),Le.viewport.set(be.x,be.y,be.width,be.height),ue===0&&T.matrix.copy(Le.matrix),W===!0&&T.cameras.push(Le)}}for(let fe=0;fe<b.length;fe++){const W=v[fe],ue=b[fe];W!==null&&ue!==void 0&&ue.update(W,ae,c||o)}if(ie&&ie(G,ae),ae.detectedPlanes){n.dispatchEvent({type:"planesdetected",data:ae.detectedPlanes});let fe=null;for(const W of y)ae.detectedPlanes.has(W)||(fe===null&&(fe=[]),fe.push(W));if(fe!==null)for(const W of fe)y.delete(W),S.delete(W),n.dispatchEvent({type:"planeremoved",data:W});for(const W of ae.detectedPlanes)if(!y.has(W))y.add(W),S.set(W,ae.lastChangedTime),n.dispatchEvent({type:"planeadded",data:W});else{const ue=S.get(W);W.lastChangedTime>ue&&(S.set(W,W.lastChangedTime),n.dispatchEvent({type:"planechanged",data:W}))}}x=null}const Te=new Eh;Te.setAnimationLoop(te),this.setAnimationLoop=function(G){ie=G},this.dispose=function(){}}}function I0(r,e){function t(p,f){f.color.getRGB(p.fogColor.value,wh(r)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function n(p,f,_,b,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?i(p,f):f.isMeshToonMaterial?(i(p,f),h(p,f)):f.isMeshPhongMaterial?(i(p,f),c(p,f)):f.isMeshStandardMaterial?(i(p,f),u(p,f),f.isMeshPhysicalMaterial&&d(p,f,v)):f.isMeshMatcapMaterial?(i(p,f),m(p,f)):f.isMeshDepthMaterial?i(p,f):f.isMeshDistanceMaterial?(i(p,f),x(p,f)):f.isMeshNormalMaterial?i(p,f):f.isLineBasicMaterial?(s(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?a(p,f,_,b):f.isSpriteMaterial?l(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function i(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map),f.alphaMap&&(p.alphaMap.value=f.alphaMap),f.bumpMap&&(p.bumpMap.value=f.bumpMap,p.bumpScale.value=f.bumpScale,f.side===en&&(p.bumpScale.value*=-1)),f.displacementMap&&(p.displacementMap.value=f.displacementMap,p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap),f.normalMap&&(p.normalMap.value=f.normalMap,p.normalScale.value.copy(f.normalScale),f.side===en&&p.normalScale.value.negate()),f.specularMap&&(p.specularMap.value=f.specularMap),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const _=e.get(f).envMap;if(_&&(p.envMap.value=_,p.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap){p.lightMap.value=f.lightMap;const y=r.useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=f.lightMapIntensity*y}f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity);let b;f.map?b=f.map:f.specularMap?b=f.specularMap:f.displacementMap?b=f.displacementMap:f.normalMap?b=f.normalMap:f.bumpMap?b=f.bumpMap:f.roughnessMap?b=f.roughnessMap:f.metalnessMap?b=f.metalnessMap:f.alphaMap?b=f.alphaMap:f.emissiveMap?b=f.emissiveMap:f.clearcoatMap?b=f.clearcoatMap:f.clearcoatNormalMap?b=f.clearcoatNormalMap:f.clearcoatRoughnessMap?b=f.clearcoatRoughnessMap:f.iridescenceMap?b=f.iridescenceMap:f.iridescenceThicknessMap?b=f.iridescenceThicknessMap:f.specularIntensityMap?b=f.specularIntensityMap:f.specularColorMap?b=f.specularColorMap:f.transmissionMap?b=f.transmissionMap:f.thicknessMap?b=f.thicknessMap:f.sheenColorMap?b=f.sheenColorMap:f.sheenRoughnessMap&&(b=f.sheenRoughnessMap),b!==void 0&&(b.isWebGLRenderTarget&&(b=b.texture),b.matrixAutoUpdate===!0&&b.updateMatrix(),p.uvTransform.value.copy(b.matrix));let v;f.aoMap?v=f.aoMap:f.lightMap&&(v=f.lightMap),v!==void 0&&(v.isWebGLRenderTarget&&(v=v.texture),v.matrixAutoUpdate===!0&&v.updateMatrix(),p.uv2Transform.value.copy(v.matrix))}function s(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function a(p,f,_,b){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*_,p.scale.value=b*.5,f.map&&(p.map.value=f.map),f.alphaMap&&(p.alphaMap.value=f.alphaMap),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);let v;f.map?v=f.map:f.alphaMap&&(v=f.alphaMap),v!==void 0&&(v.matrixAutoUpdate===!0&&v.updateMatrix(),p.uvTransform.value.copy(v.matrix))}function l(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map),f.alphaMap&&(p.alphaMap.value=f.alphaMap),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);let _;f.map?_=f.map:f.alphaMap&&(_=f.alphaMap),_!==void 0&&(_.matrixAutoUpdate===!0&&_.updateMatrix(),p.uvTransform.value.copy(_.matrix))}function c(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function h(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function u(p,f){p.roughness.value=f.roughness,p.metalness.value=f.metalness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap),f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap),e.get(f).envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function d(p,f,_){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap)),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap),f.clearcoatNormalMap&&(p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),p.clearcoatNormalMap.value=f.clearcoatNormalMap,f.side===en&&p.clearcoatNormalScale.value.negate())),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap)),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap)}function m(p,f){f.matcap&&(p.matcap.value=f.matcap)}function x(p,f){p.referencePosition.value.copy(f.referencePosition),p.nearDistance.value=f.nearDistance,p.farDistance.value=f.farDistance}return{refreshFogUniforms:t,refreshMaterialUniforms:n}}function N0(r,e,t,n){let i={},s={},o=[];const a=t.isWebGL2?r.getParameter(35375):0;function l(b,v){const y=v.program;n.uniformBlockBinding(b,y)}function c(b,v){let y=i[b.id];y===void 0&&(x(b),y=h(b),i[b.id]=y,b.addEventListener("dispose",f));const S=v.program;n.updateUBOMapping(b,S);const R=e.render.frame;s[b.id]!==R&&(d(b),s[b.id]=R)}function h(b){const v=u();b.__bindingPointIndex=v;const y=r.createBuffer(),S=b.__size,R=b.usage;return r.bindBuffer(35345,y),r.bufferData(35345,S,R),r.bindBuffer(35345,null),r.bindBufferBase(35345,v,y),y}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const v=i[b.id],y=b.uniforms,S=b.__cache;r.bindBuffer(35345,v);for(let R=0,I=y.length;R<I;R++){const w=y[R];if(m(w,R,S)===!0){const T=w.__offset,F=Array.isArray(w.value)?w.value:[w.value];let K=0;for(let $=0;$<F.length;$++){const B=F[$],O=p(B);typeof B=="number"?(w.__data[0]=B,r.bufferSubData(35345,T+K,w.__data)):B.isMatrix3?(w.__data[0]=B.elements[0],w.__data[1]=B.elements[1],w.__data[2]=B.elements[2],w.__data[3]=B.elements[0],w.__data[4]=B.elements[3],w.__data[5]=B.elements[4],w.__data[6]=B.elements[5],w.__data[7]=B.elements[0],w.__data[8]=B.elements[6],w.__data[9]=B.elements[7],w.__data[10]=B.elements[8],w.__data[11]=B.elements[0]):(B.toArray(w.__data,K),K+=O.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(35345,T,w.__data)}}r.bindBuffer(35345,null)}function m(b,v,y){const S=b.value;if(y[v]===void 0){if(typeof S=="number")y[v]=S;else{const R=Array.isArray(S)?S:[S],I=[];for(let w=0;w<R.length;w++)I.push(R[w].clone());y[v]=I}return!0}else if(typeof S=="number"){if(y[v]!==S)return y[v]=S,!0}else{const R=Array.isArray(y[v])?y[v]:[y[v]],I=Array.isArray(S)?S:[S];for(let w=0;w<R.length;w++){const T=R[w];if(T.equals(I[w])===!1)return T.copy(I[w]),!0}}return!1}function x(b){const v=b.uniforms;let y=0;const S=16;let R=0;for(let I=0,w=v.length;I<w;I++){const T=v[I],F={boundary:0,storage:0},K=Array.isArray(T.value)?T.value:[T.value];for(let $=0,B=K.length;$<B;$++){const O=K[$],q=p(O);F.boundary+=q.boundary,F.storage+=q.storage}if(T.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),T.__offset=y,I>0){R=y%S;const $=S-R;R!==0&&$-F.boundary<0&&(y+=S-R,T.__offset=y)}y+=F.storage}return R=y%S,R>0&&(y+=S-R),b.__size=y,b.__cache={},this}function p(b){const v={boundary:0,storage:0};return typeof b=="number"?(v.boundary=4,v.storage=4):b.isVector2?(v.boundary=8,v.storage=8):b.isVector3||b.isColor?(v.boundary=16,v.storage=12):b.isVector4?(v.boundary=16,v.storage=16):b.isMatrix3?(v.boundary=48,v.storage=48):b.isMatrix4?(v.boundary=64,v.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),v}function f(b){const v=b.target;v.removeEventListener("dispose",f);const y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function _(){for(const b in i)r.deleteBuffer(i[b]);o=[],i={},s={}}return{bind:l,update:c,dispose:_}}function F0(){const r=ir("canvas");return r.style.display="block",r}function ur(r={}){this.isWebGLRenderer=!0;const e=r.canvas!==void 0?r.canvas:F0(),t=r.context!==void 0?r.context:null,n=r.depth!==void 0?r.depth:!0,i=r.stencil!==void 0?r.stencil:!0,s=r.antialias!==void 0?r.antialias:!1,o=r.premultipliedAlpha!==void 0?r.premultipliedAlpha:!0,a=r.preserveDrawingBuffer!==void 0?r.preserveDrawingBuffer:!1,l=r.powerPreference!==void 0?r.powerPreference:"default",c=r.failIfMajorPerformanceCaveat!==void 0?r.failIfMajorPerformanceCaveat:!1;let h;t!==null?h=t.getContextAttributes().alpha:h=r.alpha!==void 0?r.alpha:!1;let u=null,d=null;const m=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=ni,this.useLegacyLights=!0,this.toneMapping=zn,this.toneMappingExposure=1;const p=this;let f=!1,_=0,b=0,v=null,y=-1,S=null;const R=new at,I=new at;let w=null,T=e.width,F=e.height,K=1,$=null,B=null;const O=new at(0,0,T,F),q=new at(0,0,T,F);let ee=!1;const oe=new Ta;let Z=!1,ie=!1,te=null;const Te=new $e,G=new P,ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function fe(){return v===null?K:1}let W=t;function ue(A,X){for(let Y=0;Y<A.length;Y++){const N=A[Y],Q=e.getContext(N,X);if(Q!==null)return Q}return null}try{const A={alpha:!0,depth:n,stencil:i,antialias:s,premultipliedAlpha:o,preserveDrawingBuffer:a,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ba}`),e.addEventListener("webglcontextlost",Ae,!1),e.addEventListener("webglcontextrestored",we,!1),e.addEventListener("webglcontextcreationerror",De,!1),W===null){const X=["webgl2","webgl","experimental-webgl"];if(p.isWebGL1Renderer===!0&&X.shift(),W=ue(X,A),W===null)throw ue(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}W.getShaderPrecisionFormat===void 0&&(W.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let ve,be,Le,Oe,Ge,je,Ke,_t,Tt,vt,yt,ct,it,Wt,Pt,L,E,J,pe,me,ye,Ne,D,V;function Me(){ve=new qm(W),be=new Hm(W,ve,r),ve.init(be),Ne=new L0(W,ve,be),Le=new A0(W,ve,be),Oe=new Zm,Ge=new f0,je=new C0(W,ve,Le,Ge,be,Ne,Oe),Ke=new Vm(p),_t=new jm(p),Tt=new rf(W,be),D=new zm(W,ve,Tt,be),vt=new $m(W,Tt,Oe,D),yt=new eg(W,vt,Tt,Oe),pe=new Qm(W,be,je),L=new Gm(Ge),ct=new d0(p,Ke,_t,ve,be,D,L),it=new I0(p,Ge),Wt=new m0,Pt=new w0(ve,be),J=new km(p,Ke,_t,Le,yt,h,o),E=new T0(p,yt,be),V=new N0(W,Oe,be,Le),me=new Bm(W,ve,Oe,be),ye=new Ym(W,ve,Oe,be),Oe.programs=ct.programs,p.capabilities=be,p.extensions=ve,p.properties=Ge,p.renderLists=Wt,p.shadowMap=E,p.state=Le,p.info=Oe}Me();const _e=new D0(p,W);this.xr=_e,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const A=ve.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=ve.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(A){A!==void 0&&(K=A,this.setSize(T,F,!1))},this.getSize=function(A){return A.set(T,F)},this.setSize=function(A,X,Y=!0){if(_e.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}T=A,F=X,e.width=Math.floor(A*K),e.height=Math.floor(X*K),Y===!0&&(e.style.width=A+"px",e.style.height=X+"px"),this.setViewport(0,0,A,X)},this.getDrawingBufferSize=function(A){return A.set(T*K,F*K).floor()},this.setDrawingBufferSize=function(A,X,Y){T=A,F=X,K=Y,e.width=Math.floor(A*Y),e.height=Math.floor(X*Y),this.setViewport(0,0,A,X)},this.getCurrentViewport=function(A){return A.copy(R)},this.getViewport=function(A){return A.copy(O)},this.setViewport=function(A,X,Y,N){A.isVector4?O.set(A.x,A.y,A.z,A.w):O.set(A,X,Y,N),Le.viewport(R.copy(O).multiplyScalar(K).floor())},this.getScissor=function(A){return A.copy(q)},this.setScissor=function(A,X,Y,N){A.isVector4?q.set(A.x,A.y,A.z,A.w):q.set(A,X,Y,N),Le.scissor(I.copy(q).multiplyScalar(K).floor())},this.getScissorTest=function(){return ee},this.setScissorTest=function(A){Le.setScissorTest(ee=A)},this.setOpaqueSort=function(A){$=A},this.setTransparentSort=function(A){B=A},this.getClearColor=function(A){return A.copy(J.getClearColor())},this.setClearColor=function(){J.setClearColor.apply(J,arguments)},this.getClearAlpha=function(){return J.getClearAlpha()},this.setClearAlpha=function(){J.setClearAlpha.apply(J,arguments)},this.clear=function(A=!0,X=!0,Y=!0){let N=0;A&&(N|=16384),X&&(N|=256),Y&&(N|=1024),W.clear(N)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Ae,!1),e.removeEventListener("webglcontextrestored",we,!1),e.removeEventListener("webglcontextcreationerror",De,!1),Wt.dispose(),Pt.dispose(),Ge.dispose(),Ke.dispose(),_t.dispose(),yt.dispose(),D.dispose(),V.dispose(),ct.dispose(),_e.dispose(),_e.removeEventListener("sessionstart",le),_e.removeEventListener("sessionend",Se),te&&(te.dispose(),te=null),Re.stop()};function Ae(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),f=!0}function we(){console.log("THREE.WebGLRenderer: Context Restored."),f=!1;const A=Oe.autoReset,X=E.enabled,Y=E.autoUpdate,N=E.needsUpdate,Q=E.type;Me(),Oe.autoReset=A,E.enabled=X,E.autoUpdate=Y,E.needsUpdate=N,E.type=Q}function De(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function We(A){const X=A.target;X.removeEventListener("dispose",We),Be(X)}function Be(A){He(A),Ge.remove(A)}function He(A){const X=Ge.get(A).programs;X!==void 0&&(X.forEach(function(Y){ct.releaseProgram(Y)}),A.isShaderMaterial&&ct.releaseShaderCache(A))}this.renderBufferDirect=function(A,X,Y,N,Q,Fe){X===null&&(X=ae);const g=Q.isMesh&&Q.matrixWorld.determinant()<0,M=so(A,X,Y,N,Q);Le.setMaterial(N,g);let C=Y.index,U=1;N.wireframe===!0&&(C=vt.getWireframeAttribute(Y),U=2);const j=Y.drawRange,H=Y.attributes.position;let ne=j.start*U,ce=(j.start+j.count)*U;Fe!==null&&(ne=Math.max(ne,Fe.start*U),ce=Math.min(ce,(Fe.start+Fe.count)*U)),C!==null?(ne=Math.max(ne,0),ce=Math.min(ce,C.count)):H!=null&&(ne=Math.max(ne,0),ce=Math.min(ce,H.count));const de=ce-ne;if(de<0||de===1/0)return;D.setup(Q,N,M,Y,C);let se,re=me;if(C!==null&&(se=Tt.get(C),re=ye,re.setIndex(se)),Q.isMesh)N.wireframe===!0?(Le.setLineWidth(N.wireframeLinewidth*fe()),re.setMode(1)):re.setMode(4);else if(Q.isLine){let he=N.linewidth;he===void 0&&(he=1),Le.setLineWidth(he*fe()),Q.isLineSegments?re.setMode(1):Q.isLineLoop?re.setMode(2):re.setMode(3)}else Q.isPoints?re.setMode(0):Q.isSprite&&re.setMode(4);if(Q.isInstancedMesh)re.renderInstances(ne,de,Q.count);else if(Y.isInstancedBufferGeometry){const he=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ce=Math.min(Y.instanceCount,he);re.renderInstances(ne,de,Ce)}else re.render(ne,de)},this.compile=function(A,X){function Y(N,Q,Fe){N.transparent===!0&&N.side===Sn&&N.forceSinglePass===!1?(N.side=en,N.needsUpdate=!0,Kt(N,Q,Fe),N.side=ti,N.needsUpdate=!0,Kt(N,Q,Fe),N.side=Sn):Kt(N,Q,Fe)}d=Pt.get(A),d.init(),x.push(d),A.traverseVisible(function(N){N.isLight&&N.layers.test(X.layers)&&(d.pushLight(N),N.castShadow&&d.pushShadow(N))}),d.setupLights(p.useLegacyLights),A.traverse(function(N){const Q=N.material;if(Q)if(Array.isArray(Q))for(let Fe=0;Fe<Q.length;Fe++){const g=Q[Fe];Y(g,A,N)}else Y(Q,A,N)}),x.pop(),d=null};let z=null;function k(A){z&&z(A)}function le(){Re.stop()}function Se(){Re.start()}const Re=new Eh;Re.setAnimationLoop(k),typeof self!="undefined"&&Re.setContext(self),this.setAnimationLoop=function(A){z=A,_e.setAnimationLoop(A),A===null?Re.stop():Re.start()},_e.addEventListener("sessionstart",le),_e.addEventListener("sessionend",Se),this.render=function(A,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(f===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),_e.enabled===!0&&_e.isPresenting===!0&&(_e.cameraAutoUpdate===!0&&_e.updateCamera(X),X=_e.getCamera()),A.isScene===!0&&A.onBeforeRender(p,A,X,v),d=Pt.get(A,x.length),d.init(),x.push(d),Te.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),oe.setFromProjectionMatrix(Te),ie=this.localClippingEnabled,Z=L.init(this.clippingPlanes,ie),u=Wt.get(A,m.length),u.init(),m.push(u),st(A,X,0,p.sortObjects),u.finish(),p.sortObjects===!0&&u.sort($,B),Z===!0&&L.beginShadows();const Y=d.state.shadowsArray;if(E.render(Y,A,X),Z===!0&&L.endShadows(),this.info.autoReset===!0&&this.info.reset(),J.render(u,A),d.setupLights(p.useLegacyLights),X.isArrayCamera){const N=X.cameras;for(let Q=0,Fe=N.length;Q<Fe;Q++){const g=N[Q];wt(u,A,g,g.viewport)}}else wt(u,A,X);v!==null&&(je.updateMultisampleRenderTarget(v),je.updateRenderTargetMipmap(v)),A.isScene===!0&&A.onAfterRender(p,A,X),D.resetDefaultState(),y=-1,S=null,x.pop(),x.length>0?d=x[x.length-1]:d=null,m.pop(),m.length>0?u=m[m.length-1]:u=null};function st(A,X,Y,N){if(A.visible===!1)return;if(A.layers.test(X.layers)){if(A.isGroup)Y=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(X);else if(A.isLight)d.pushLight(A),A.castShadow&&d.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||oe.intersectsSprite(A)){N&&G.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Te);const g=yt.update(A),M=A.material;M.visible&&u.push(A,g,M,Y,G.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(A.isSkinnedMesh&&A.skeleton.frame!==Oe.render.frame&&(A.skeleton.update(),A.skeleton.frame=Oe.render.frame),!A.frustumCulled||oe.intersectsObject(A))){N&&G.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Te);const g=yt.update(A),M=A.material;if(Array.isArray(M)){const C=g.groups;for(let U=0,j=C.length;U<j;U++){const H=C[U],ne=M[H.materialIndex];ne&&ne.visible&&u.push(A,g,ne,Y,G.z,H)}}else M.visible&&u.push(A,g,M,Y,G.z,null)}}const Fe=A.children;for(let g=0,M=Fe.length;g<M;g++)st(Fe[g],X,Y,N)}function wt(A,X,Y,N){const Q=A.opaque,Fe=A.transmissive,g=A.transparent;d.setupLightsView(Y),Z===!0&&L.setGlobalState(p.clippingPlanes,Y),Fe.length>0&&Dt(Q,X,Y),N&&Le.viewport(R.copy(N)),Q.length>0&&rn(Q,X,Y),Fe.length>0&&rn(Fe,X,Y),g.length>0&&rn(g,X,Y),Le.buffers.depth.setTest(!0),Le.buffers.depth.setMask(!0),Le.buffers.color.setMask(!0),Le.setPolygonOffset(!1)}function Dt(A,X,Y){const N=be.isWebGL2;te===null&&(te=new Hn(1024,1024,{generateMipmaps:!0,type:ve.has("EXT_color_buffer_half_float")?fn:Pi,minFilter:xi,samples:N&&s===!0?4:0}));const Q=p.getRenderTarget();p.setRenderTarget(te),p.clear();const Fe=p.toneMapping;p.toneMapping=zn,rn(A,X,Y),p.toneMapping=Fe,je.updateMultisampleRenderTarget(te),je.updateRenderTargetMipmap(te),p.setRenderTarget(Q)}function rn(A,X,Y){const N=X.isScene===!0?X.overrideMaterial:null;for(let Q=0,Fe=A.length;Q<Fe;Q++){const g=A[Q],M=g.object,C=g.geometry,U=N===null?g.material:N,j=g.group;M.layers.test(Y.layers)&&mt(M,X,Y,C,U,j)}}function mt(A,X,Y,N,Q,Fe){A.onBeforeRender(p,X,Y,N,Q,Fe),A.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Q.onBeforeRender(p,X,Y,N,A,Fe),Q.transparent===!0&&Q.side===Sn&&Q.forceSinglePass===!1?(Q.side=en,Q.needsUpdate=!0,p.renderBufferDirect(Y,X,N,Q,A,Fe),Q.side=ti,Q.needsUpdate=!0,p.renderBufferDirect(Y,X,N,Q,A,Fe),Q.side=Sn):p.renderBufferDirect(Y,X,N,Q,A,Fe),A.onAfterRender(p,X,Y,N,Q,Fe)}function Kt(A,X,Y){X.isScene!==!0&&(X=ae);const N=Ge.get(A),Q=d.state.lights,Fe=d.state.shadowsArray,g=Q.state.version,M=ct.getParameters(A,Q.state,Fe,X,Y),C=ct.getProgramCacheKey(M);let U=N.programs;N.environment=A.isMeshStandardMaterial?X.environment:null,N.fog=X.fog,N.envMap=(A.isMeshStandardMaterial?_t:Ke).get(A.envMap||N.environment),U===void 0&&(A.addEventListener("dispose",We),U=new Map,N.programs=U);let j=U.get(C);if(j!==void 0){if(N.currentProgram===j&&N.lightsStateVersion===g)return on(A,M),j}else M.uniforms=ct.getUniforms(A),A.onBuild(Y,M,p),A.onBeforeCompile(M,p),j=ct.acquireProgram(M,C),U.set(C,j),N.uniforms=M.uniforms;const H=N.uniforms;(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(H.clippingPlanes=L.uniform),on(A,M),N.needsLights=Oi(A),N.lightsStateVersion=g,N.needsLights&&(H.ambientLightColor.value=Q.state.ambient,H.lightProbe.value=Q.state.probe,H.directionalLights.value=Q.state.directional,H.directionalLightShadows.value=Q.state.directionalShadow,H.spotLights.value=Q.state.spot,H.spotLightShadows.value=Q.state.spotShadow,H.rectAreaLights.value=Q.state.rectArea,H.ltc_1.value=Q.state.rectAreaLTC1,H.ltc_2.value=Q.state.rectAreaLTC2,H.pointLights.value=Q.state.point,H.pointLightShadows.value=Q.state.pointShadow,H.hemisphereLights.value=Q.state.hemi,H.directionalShadowMap.value=Q.state.directionalShadowMap,H.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,H.spotShadowMap.value=Q.state.spotShadowMap,H.spotLightMatrix.value=Q.state.spotLightMatrix,H.spotLightMap.value=Q.state.spotLightMap,H.pointShadowMap.value=Q.state.pointShadowMap,H.pointShadowMatrix.value=Q.state.pointShadowMatrix);const ne=j.getUniforms(),ce=Vr.seqWithValue(ne.seq,H);return N.currentProgram=j,N.uniformsList=ce,j}function on(A,X){const Y=Ge.get(A);Y.outputEncoding=X.outputEncoding,Y.instancing=X.instancing,Y.skinning=X.skinning,Y.morphTargets=X.morphTargets,Y.morphNormals=X.morphNormals,Y.morphColors=X.morphColors,Y.morphTargetsCount=X.morphTargetsCount,Y.numClippingPlanes=X.numClippingPlanes,Y.numIntersection=X.numClipIntersection,Y.vertexAlphas=X.vertexAlphas,Y.vertexTangents=X.vertexTangents,Y.toneMapping=X.toneMapping}function so(A,X,Y,N,Q){X.isScene!==!0&&(X=ae),je.resetTextureUnits();const Fe=X.fog,g=N.isMeshStandardMaterial?X.environment:null,M=v===null?p.outputEncoding:v.isXRRenderTarget===!0?v.texture.encoding:ni,C=(N.isMeshStandardMaterial?_t:Ke).get(N.envMap||g),U=N.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,j=!!N.normalMap&&!!Y.attributes.tangent,H=!!Y.morphAttributes.position,ne=!!Y.morphAttributes.normal,ce=!!Y.morphAttributes.color,de=N.toneMapped?p.toneMapping:zn,se=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,re=se!==void 0?se.length:0,he=Ge.get(N),Ce=d.state.lights;if(Z===!0&&(ie===!0||A!==S)){const qe=A===S&&N.id===y;L.setState(N,A,qe)}let Ee=!1;N.version===he.__version?(he.needsLights&&he.lightsStateVersion!==Ce.state.version||he.outputEncoding!==M||Q.isInstancedMesh&&he.instancing===!1||!Q.isInstancedMesh&&he.instancing===!0||Q.isSkinnedMesh&&he.skinning===!1||!Q.isSkinnedMesh&&he.skinning===!0||he.envMap!==C||N.fog===!0&&he.fog!==Fe||he.numClippingPlanes!==void 0&&(he.numClippingPlanes!==L.numPlanes||he.numIntersection!==L.numIntersection)||he.vertexAlphas!==U||he.vertexTangents!==j||he.morphTargets!==H||he.morphNormals!==ne||he.morphColors!==ce||he.toneMapping!==de||be.isWebGL2===!0&&he.morphTargetsCount!==re)&&(Ee=!0):(Ee=!0,he.__version=N.version);let ze=he.currentProgram;Ee===!0&&(ze=Kt(N,X,Q));let Pe=!1,Ie=!1,Xe=!1;const Ye=ze.getUniforms(),et=he.uniforms;if(Le.useProgram(ze.program)&&(Pe=!0,Ie=!0,Xe=!0),N.id!==y&&(y=N.id,Ie=!0),Pe||S!==A){if(Ye.setValue(W,"projectionMatrix",A.projectionMatrix),be.logarithmicDepthBuffer&&Ye.setValue(W,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),S!==A&&(S=A,Ie=!0,Xe=!0),N.isShaderMaterial||N.isMeshPhongMaterial||N.isMeshToonMaterial||N.isMeshStandardMaterial||N.envMap){const qe=Ye.map.cameraPosition;qe!==void 0&&qe.setValue(W,G.setFromMatrixPosition(A.matrixWorld))}(N.isMeshPhongMaterial||N.isMeshToonMaterial||N.isMeshLambertMaterial||N.isMeshBasicMaterial||N.isMeshStandardMaterial||N.isShaderMaterial)&&Ye.setValue(W,"isOrthographic",A.isOrthographicCamera===!0),(N.isMeshPhongMaterial||N.isMeshToonMaterial||N.isMeshLambertMaterial||N.isMeshBasicMaterial||N.isMeshStandardMaterial||N.isShaderMaterial||N.isShadowMaterial||Q.isSkinnedMesh)&&Ye.setValue(W,"viewMatrix",A.matrixWorldInverse)}if(Q.isSkinnedMesh){Ye.setOptional(W,Q,"bindMatrix"),Ye.setOptional(W,Q,"bindMatrixInverse");const qe=Q.skeleton;qe&&(be.floatVertexTextures?(qe.boneTexture===null&&qe.computeBoneTexture(),Ye.setValue(W,"boneTexture",qe.boneTexture,je),Ye.setValue(W,"boneTextureSize",qe.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const It=Y.morphAttributes;if((It.position!==void 0||It.normal!==void 0||It.color!==void 0&&be.isWebGL2===!0)&&pe.update(Q,Y,ze),(Ie||he.receiveShadow!==Q.receiveShadow)&&(he.receiveShadow=Q.receiveShadow,Ye.setValue(W,"receiveShadow",Q.receiveShadow)),N.isMeshGouraudMaterial&&N.envMap!==null&&(et.envMap.value=C,et.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1),Ie&&(Ye.setValue(W,"toneMappingExposure",p.toneMappingExposure),he.needsLights&&ro(et,Xe),Fe&&N.fog===!0&&it.refreshFogUniforms(et,Fe),it.refreshMaterialUniforms(et,N,K,F,te),Vr.upload(W,he.uniformsList,et,je)),N.isShaderMaterial&&N.uniformsNeedUpdate===!0&&(Vr.upload(W,he.uniformsList,et,je),N.uniformsNeedUpdate=!1),N.isSpriteMaterial&&Ye.setValue(W,"center",Q.center),Ye.setValue(W,"modelViewMatrix",Q.modelViewMatrix),Ye.setValue(W,"normalMatrix",Q.normalMatrix),Ye.setValue(W,"modelMatrix",Q.matrixWorld),N.isShaderMaterial||N.isRawShaderMaterial){const qe=N.uniformsGroups;for(let Ze=0,xt=qe.length;Ze<xt;Ze++)if(be.isWebGL2){const Xt=qe[Ze];V.update(Xt,ze),V.bind(Xt,ze)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ze}function ro(A,X){A.ambientLightColor.needsUpdate=X,A.lightProbe.needsUpdate=X,A.directionalLights.needsUpdate=X,A.directionalLightShadows.needsUpdate=X,A.pointLights.needsUpdate=X,A.pointLightShadows.needsUpdate=X,A.spotLights.needsUpdate=X,A.spotLightShadows.needsUpdate=X,A.rectAreaLights.needsUpdate=X,A.hemisphereLights.needsUpdate=X}function Oi(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return v},this.setRenderTargetTextures=function(A,X,Y){Ge.get(A.texture).__webglTexture=X,Ge.get(A.depthTexture).__webglTexture=Y;const N=Ge.get(A);N.__hasExternalTextures=!0,N.__hasExternalTextures&&(N.__autoAllocateDepthBuffer=Y===void 0,N.__autoAllocateDepthBuffer||ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),N.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,X){const Y=Ge.get(A);Y.__webglFramebuffer=X,Y.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(A,X=0,Y=0){v=A,_=X,b=Y;let N=!0,Q=null,Fe=!1,g=!1;if(A){const C=Ge.get(A);C.__useDefaultFramebuffer!==void 0?(Le.bindFramebuffer(36160,null),N=!1):C.__webglFramebuffer===void 0?je.setupRenderTarget(A):C.__hasExternalTextures&&je.rebindTextures(A,Ge.get(A.texture).__webglTexture,Ge.get(A.depthTexture).__webglTexture);const U=A.texture;(U.isData3DTexture||U.isDataArrayTexture||U.isCompressedArrayTexture)&&(g=!0);const j=Ge.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Q=j[X],Fe=!0):be.isWebGL2&&A.samples>0&&je.useMultisampledRTT(A)===!1?Q=Ge.get(A).__webglMultisampledFramebuffer:Q=j,R.copy(A.viewport),I.copy(A.scissor),w=A.scissorTest}else R.copy(O).multiplyScalar(K).floor(),I.copy(q).multiplyScalar(K).floor(),w=ee;if(Le.bindFramebuffer(36160,Q)&&be.drawBuffers&&N&&Le.drawBuffers(A,Q),Le.viewport(R),Le.scissor(I),Le.setScissorTest(w),Fe){const C=Ge.get(A.texture);W.framebufferTexture2D(36160,36064,34069+X,C.__webglTexture,Y)}else if(g){const C=Ge.get(A.texture),U=X||0;W.framebufferTextureLayer(36160,36064,C.__webglTexture,Y||0,U)}y=-1},this.readRenderTargetPixels=function(A,X,Y,N,Q,Fe,g){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let M=Ge.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&g!==void 0&&(M=M[g]),M){Le.bindFramebuffer(36160,M);try{const C=A.texture,U=C.format,j=C.type;if(U!==sn&&Ne.convert(U)!==W.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const H=j===fn&&(ve.has("EXT_color_buffer_half_float")||be.isWebGL2&&ve.has("EXT_color_buffer_float"));if(j!==Pi&&Ne.convert(j)!==W.getParameter(35738)&&!(j===En&&(be.isWebGL2||ve.has("OES_texture_float")||ve.has("WEBGL_color_buffer_float")))&&!H){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=A.width-N&&Y>=0&&Y<=A.height-Q&&W.readPixels(X,Y,N,Q,Ne.convert(U),Ne.convert(j),Fe)}finally{const C=v!==null?Ge.get(v).__webglFramebuffer:null;Le.bindFramebuffer(36160,C)}}},this.copyFramebufferToTexture=function(A,X,Y=0){const N=Math.pow(2,-Y),Q=Math.floor(X.image.width*N),Fe=Math.floor(X.image.height*N);je.setTexture2D(X,0),W.copyTexSubImage2D(3553,Y,0,0,A.x,A.y,Q,Fe),Le.unbindTexture()},this.copyTextureToTexture=function(A,X,Y,N=0){const Q=X.image.width,Fe=X.image.height,g=Ne.convert(Y.format),M=Ne.convert(Y.type);je.setTexture2D(Y,0),W.pixelStorei(37440,Y.flipY),W.pixelStorei(37441,Y.premultiplyAlpha),W.pixelStorei(3317,Y.unpackAlignment),X.isDataTexture?W.texSubImage2D(3553,N,A.x,A.y,Q,Fe,g,M,X.image.data):X.isCompressedTexture?W.compressedTexSubImage2D(3553,N,A.x,A.y,X.mipmaps[0].width,X.mipmaps[0].height,g,X.mipmaps[0].data):W.texSubImage2D(3553,N,A.x,A.y,g,M,X.image),N===0&&Y.generateMipmaps&&W.generateMipmap(3553),Le.unbindTexture()},this.copyTextureToTexture3D=function(A,X,Y,N,Q=0){if(p.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Fe=A.max.x-A.min.x+1,g=A.max.y-A.min.y+1,M=A.max.z-A.min.z+1,C=Ne.convert(N.format),U=Ne.convert(N.type);let j;if(N.isData3DTexture)je.setTexture3D(N,0),j=32879;else if(N.isDataArrayTexture)je.setTexture2DArray(N,0),j=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}W.pixelStorei(37440,N.flipY),W.pixelStorei(37441,N.premultiplyAlpha),W.pixelStorei(3317,N.unpackAlignment);const H=W.getParameter(3314),ne=W.getParameter(32878),ce=W.getParameter(3316),de=W.getParameter(3315),se=W.getParameter(32877),re=Y.isCompressedTexture?Y.mipmaps[0]:Y.image;W.pixelStorei(3314,re.width),W.pixelStorei(32878,re.height),W.pixelStorei(3316,A.min.x),W.pixelStorei(3315,A.min.y),W.pixelStorei(32877,A.min.z),Y.isDataTexture||Y.isData3DTexture?W.texSubImage3D(j,Q,X.x,X.y,X.z,Fe,g,M,C,U,re.data):Y.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),W.compressedTexSubImage3D(j,Q,X.x,X.y,X.z,Fe,g,M,C,re.data)):W.texSubImage3D(j,Q,X.x,X.y,X.z,Fe,g,M,C,U,re),W.pixelStorei(3314,H),W.pixelStorei(32878,ne),W.pixelStorei(3316,ce),W.pixelStorei(3315,de),W.pixelStorei(32877,se),Q===0&&N.generateMipmaps&&W.generateMipmap(j),Le.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?je.setTextureCube(A,0):A.isData3DTexture?je.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?je.setTexture2DArray(A,0):je.setTexture2D(A,0),Le.unbindTexture()},this.resetState=function(){_=0,b=0,v=null,Le.reset(),D.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}Object.defineProperties(ur.prototype,{physicallyCorrectLights:{get:function(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights},set:function(r){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!r}}});class O0 extends ur{}O0.prototype.isWebGL1Renderer=!0;class La extends lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class U0{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=na,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=An()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=An()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=An()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const qt=new P;class Ra{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ei(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ei(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ei(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ei(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array),s=ot(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new kt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ra(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const tc=new P,nc=new at,ic=new at,k0=new P,sc=new $e;class z0 extends ge{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new $e,this.bindMatrixInverse=new $e}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new at,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}boneTransform(e,t){const n=this.skeleton,i=this.geometry;nc.fromBufferAttribute(i.attributes.skinIndex,e),ic.fromBufferAttribute(i.attributes.skinWeight,e),tc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=ic.getComponent(s);if(o!==0){const a=nc.getComponent(s);sc.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(k0.copy(tc).applyMatrix4(sc),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Ph extends lt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Dh extends Ut{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Lt,h=Lt,u,d){super(null,o,a,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const rc=new $e,B0=new $e;class Pa{constructor(e=[],t=[]){this.uuid=An(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new $e)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new $e;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:B0;rc.multiplyMatrices(a,t[s]),rc.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Pa(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=dh(e),e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Dh(t,e,e,sn,En);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this.boneTextureSize=e,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new Ph),this.bones.push(o),this.boneInverses.push(new $e().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.5,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class oc extends kt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ac=new $e,lc=new $e,Ir=[],H0=new $e,Fs=new ge;class G0 extends ge{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new oc(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.frustumCulled=!1;for(let i=0;i<n;i++)this.setMatrixAt(i,H0)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Fs.geometry=this.geometry,Fs.material=this.material,Fs.material!==void 0)for(let s=0;s<i;s++){this.getMatrixAt(s,ac),lc.multiplyMatrices(n,ac),Fs.matrixWorld=lc,Fs.raycast(e,Ir);for(let o=0,a=Ir.length;o<a;o++){const l=Ir[o];l.instanceId=s,l.object=this,t.push(l)}Ir.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new oc(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Jr extends Cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ke(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const cc=new P,hc=new P,uc=new $e,ko=new Zr,Nr=new ws;class yn extends lt{constructor(e=new Rt,t=new Jr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)cc.fromBufferAttribute(t,i-1),hc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=cc.distanceTo(hc);e.setAttribute("lineDistance",new pt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere),Nr.applyMatrix4(i),Nr.radius+=s,e.ray.intersectsSphere(Nr)===!1)return;uc.copy(i).invert(),ko.copy(e.ray).applyMatrix4(uc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new P,h=new P,u=new P,d=new P,m=this.isLineSegments?2:1,x=n.index,f=n.attributes.position;if(x!==null){const _=Math.max(0,o.start),b=Math.min(x.count,o.start+o.count);for(let v=_,y=b-1;v<y;v+=m){const S=x.getX(v),R=x.getX(v+1);if(c.fromBufferAttribute(f,S),h.fromBufferAttribute(f,R),ko.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(d);w<e.near||w>e.far||t.push({distance:w,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const _=Math.max(0,o.start),b=Math.min(f.count,o.start+o.count);for(let v=_,y=b-1;v<y;v+=m){if(c.fromBufferAttribute(f,v),h.fromBufferAttribute(f,v+1),ko.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const R=e.ray.origin.distanceTo(d);R<e.near||R>e.far||t.push({distance:R,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const dc=new P,fc=new P;class Ih extends yn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)dc.fromBufferAttribute(t,i),fc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+dc.distanceTo(fc);e.setAttribute("lineDistance",new pt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class V0 extends yn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Nh extends Cn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const pc=new $e,oa=new Zr,Fr=new ws,Or=new P;class W0 extends lt{constructor(e=new Rt,t=new Nh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fr.copy(n.boundingSphere),Fr.applyMatrix4(i),Fr.radius+=s,e.ray.intersectsSphere(Fr)===!1)return;pc.copy(i).invert(),oa.copy(e.ray).applyMatrix4(pc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let x=d,p=m;x<p;x++){const f=c.getX(x);Or.fromBufferAttribute(u,f),mc(Or,f,l,i,e,t,this)}}else{const d=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let x=d,p=m;x<p;x++)Or.fromBufferAttribute(u,x),mc(Or,x,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function mc(r,e,t,n,i,s,o){const a=oa.distanceSqToPoint(r);if(a<t){const l=new P;oa.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class Nt extends Rt{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],m=[];let x=0;const p=[],f=n/2;let _=0;b(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new pt(u,3)),this.setAttribute("normal",new pt(d,3)),this.setAttribute("uv",new pt(m,2));function b(){const y=new P,S=new P;let R=0;const I=(t-e)/n;for(let w=0;w<=s;w++){const T=[],F=w/s,K=F*(t-e)+e;for(let $=0;$<=i;$++){const B=$/i,O=B*l+a,q=Math.sin(O),ee=Math.cos(O);S.x=K*q,S.y=-F*n+f,S.z=K*ee,u.push(S.x,S.y,S.z),y.set(q,I,ee).normalize(),d.push(y.x,y.y,y.z),m.push(B,1-F),T.push(x++)}p.push(T)}for(let w=0;w<i;w++)for(let T=0;T<s;T++){const F=p[T][w],K=p[T+1][w],$=p[T+1][w+1],B=p[T][w+1];h.push(F,K,B),h.push(K,$,B),R+=6}c.addGroup(_,R,0),_+=R}function v(y){const S=x,R=new Ue,I=new P;let w=0;const T=y===!0?e:t,F=y===!0?1:-1;for(let $=1;$<=i;$++)u.push(0,f*F,0),d.push(0,F,0),m.push(.5,.5),x++;const K=x;for(let $=0;$<=i;$++){const O=$/i*l+a,q=Math.cos(O),ee=Math.sin(O);I.x=T*ee,I.y=f*F,I.z=T*q,u.push(I.x,I.y,I.z),d.push(0,F,0),R.x=q*.5+.5,R.y=ee*.5*F+.5,m.push(R.x,R.y),x++}for(let $=0;$<i;$++){const B=S+$,O=K+$;y===!0?h.push(O,O+1,B):h.push(O+1,O,B),w+=3}c.addGroup(_,w,y===!0?1:2),_+=w}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qr extends Rt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];a(i),c(n),h(),this.setAttribute("position",new pt(s,3)),this.setAttribute("normal",new pt(s.slice(),3)),this.setAttribute("uv",new pt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const v=new P,y=new P,S=new P;for(let R=0;R<t.length;R+=3)m(t[R+0],v),m(t[R+1],y),m(t[R+2],S),l(v,y,S,b)}function l(b,v,y,S){const R=S+1,I=[];for(let w=0;w<=R;w++){I[w]=[];const T=b.clone().lerp(y,w/R),F=v.clone().lerp(y,w/R),K=R-w;for(let $=0;$<=K;$++)$===0&&w===R?I[w][$]=T:I[w][$]=T.clone().lerp(F,$/K)}for(let w=0;w<R;w++)for(let T=0;T<2*(R-w)-1;T++){const F=Math.floor(T/2);T%2===0?(d(I[w][F+1]),d(I[w+1][F]),d(I[w][F])):(d(I[w][F+1]),d(I[w+1][F+1]),d(I[w+1][F]))}}function c(b){const v=new P;for(let y=0;y<s.length;y+=3)v.x=s[y+0],v.y=s[y+1],v.z=s[y+2],v.normalize().multiplyScalar(b),s[y+0]=v.x,s[y+1]=v.y,s[y+2]=v.z}function h(){const b=new P;for(let v=0;v<s.length;v+=3){b.x=s[v+0],b.y=s[v+1],b.z=s[v+2];const y=f(b)/2/Math.PI+.5,S=_(b)/Math.PI+.5;o.push(y,1-S)}x(),u()}function u(){for(let b=0;b<o.length;b+=6){const v=o[b+0],y=o[b+2],S=o[b+4],R=Math.max(v,y,S),I=Math.min(v,y,S);R>.9&&I<.1&&(v<.2&&(o[b+0]+=1),y<.2&&(o[b+2]+=1),S<.2&&(o[b+4]+=1))}}function d(b){s.push(b.x,b.y,b.z)}function m(b,v){const y=b*3;v.x=e[y+0],v.y=e[y+1],v.z=e[y+2]}function x(){const b=new P,v=new P,y=new P,S=new P,R=new Ue,I=new Ue,w=new Ue;for(let T=0,F=0;T<s.length;T+=9,F+=6){b.set(s[T+0],s[T+1],s[T+2]),v.set(s[T+3],s[T+4],s[T+5]),y.set(s[T+6],s[T+7],s[T+8]),R.set(o[F+0],o[F+1]),I.set(o[F+2],o[F+3]),w.set(o[F+4],o[F+5]),S.copy(b).add(v).add(y).divideScalar(3);const K=f(S);p(R,F+0,b,K),p(I,F+2,v,K),p(w,F+4,y,K)}}function p(b,v,y,S){S<0&&b.x===1&&(o[v]=b.x-1),y.x===0&&y.z===0&&(o[v]=S/2/Math.PI+.5)}function f(b){return Math.atan2(b.z,-b.x)}function _(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qr(e.vertices,e.indices,e.radius,e.details)}}class Da extends Qr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Da(e.radius,e.detail)}}class rs extends Qr{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new rs(e.radius,e.detail)}}class Ss extends Rt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new P,d=new P,m=[],x=[],p=[],f=[];for(let _=0;_<=n;_++){const b=[],v=_/n;let y=0;_==0&&o==0?y=.5/t:_==n&&l==Math.PI&&(y=-.5/t);for(let S=0;S<=t;S++){const R=S/t;u.x=-e*Math.cos(i+R*s)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(i+R*s)*Math.sin(o+v*a),x.push(u.x,u.y,u.z),d.copy(u).normalize(),p.push(d.x,d.y,d.z),f.push(R+y,1-v),b.push(c++)}h.push(b)}for(let _=0;_<n;_++)for(let b=0;b<t;b++){const v=h[_][b+1],y=h[_][b],S=h[_+1][b],R=h[_+1][b+1];(_!==0||o>0)&&m.push(v,y,R),(_!==n-1||l<Math.PI)&&m.push(y,S,R)}this.setIndex(m),this.setAttribute("position",new pt(x,3)),this.setAttribute("normal",new pt(p,3)),this.setAttribute("uv",new pt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ss(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ci extends Rt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new P,u=new P,d=new P;for(let m=0;m<=n;m++)for(let x=0;x<=i;x++){const p=x/i*s,f=m/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(p),u.y=(e+t*Math.cos(f))*Math.sin(p),u.z=t*Math.sin(f),a.push(u.x,u.y,u.z),h.x=e*Math.cos(p),h.y=e*Math.sin(p),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(x/i),c.push(m/n)}for(let m=1;m<=n;m++)for(let x=1;x<=i;x++){const p=(i+1)*m+x-1,f=(i+1)*(m-1)+x-1,_=(i+1)*(m-1)+x,b=(i+1)*m+x;o.push(p,f,b),o.push(f,_,b)}this.setIndex(o),this.setAttribute("position",new pt(a,3)),this.setAttribute("normal",new pt(l,3)),this.setAttribute("uv",new pt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ci(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class X0 extends Cn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new ke(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Bn extends Cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hh,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class si extends Bn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ft(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ke(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ke(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ke(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._iridescence=0,this._transmission=0,this.setValues(e)}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function ci(r,e,t){return Fh(r)?new r.constructor(r.subarray(e,t!==void 0?t:r.length)):r.slice(e,t)}function Ur(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Fh(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function j0(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function gc(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function Oh(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class dr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class q0 extends dr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:xl,endingEnd:xl}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case vl:s=e,a=2*t-n;break;case yl:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case vl:o=e,l=2*n-t;break;case yl:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,m=this._weightNext,x=(n-t)/(i-t),p=x*x,f=p*x,_=-d*f+2*d*p-d*x,b=(1+d)*f+(-1.5-2*d)*p+(-.5+d)*x+1,v=(-1-m)*f+(1.5+m)*p+.5*x,y=m*f-m*p;for(let S=0;S!==a;++S)s[S]=_*o[h+S]+b*o[c+S]+v*o[l+S]+y*o[u+S];return s}}class $0 extends dr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}}class Y0 extends dr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Vn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ur(t,this.TimeBufferType),this.values=Ur(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ur(e.times,Array),values:Ur(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Y0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new $0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new q0(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case tr:t=this.InterpolantFactoryMethodDiscrete;break;case gs:t=this.InterpolantFactoryMethodLinear;break;case fo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tr;case this.InterpolantFactoryMethodLinear:return gs;case this.InterpolantFactoryMethodSmooth:return fo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=ci(n,s,o),this.values=ci(this.values,s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Fh(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=ci(this.times),t=ci(this.values),n=this.getValueSize(),i=this.getInterpolation()===fo,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,m=u+n;for(let x=0;x!==n;++x){const p=t[u+x];if(p!==t[d+x]||p!==t[m+x]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let m=0;m!==n;++m)t[d+m]=t[u+m]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=ci(e,0,o),this.values=ci(t,0,o*n)):(this.times=e,this.values=t),this}clone(){const e=ci(this.times,0),t=ci(this.values,0),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Vn.prototype.TimeBufferType=Float32Array;Vn.prototype.ValueBufferType=Float32Array;Vn.prototype.DefaultInterpolation=gs;class Es extends Vn{}Es.prototype.ValueTypeName="bool";Es.prototype.ValueBufferType=Array;Es.prototype.DefaultInterpolation=tr;Es.prototype.InterpolantFactoryMethodLinear=void 0;Es.prototype.InterpolantFactoryMethodSmooth=void 0;class Uh extends Vn{}Uh.prototype.ValueTypeName="color";class rr extends Vn{}rr.prototype.ValueTypeName="number";class Z0 extends dr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)Mt.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Di extends Vn{InterpolantFactoryMethodLinear(e){return new Z0(this.times,this.values,this.getValueSize(),e)}}Di.prototype.ValueTypeName="quaternion";Di.prototype.DefaultInterpolation=gs;Di.prototype.InterpolantFactoryMethodSmooth=void 0;class Ts extends Vn{}Ts.prototype.ValueTypeName="string";Ts.prototype.ValueBufferType=Array;Ts.prototype.DefaultInterpolation=tr;Ts.prototype.InterpolantFactoryMethodLinear=void 0;Ts.prototype.InterpolantFactoryMethodSmooth=void 0;class or extends Vn{}or.prototype.ValueTypeName="vector";class K0{constructor(e,t=-1,n,i=pd){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=An(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Q0(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(Vn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const h=j0(l);l=gc(l,1,h),c=gc(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new rr(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,m,x,p){if(m.length!==0){const f=[],_=[];Oh(m,f,_,x),f.length!==0&&p.push(new u(d,f,_))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const m={};let x;for(x=0;x<d.length;x++)if(d[x].morphTargets)for(let p=0;p<d[x].morphTargets.length;p++)m[d[x].morphTargets[p]]=-1;for(const p in m){const f=[],_=[];for(let b=0;b!==d[x].morphTargets.length;++b){const v=d[x];f.push(v.time),_.push(v.morphTarget===p?1:0)}i.push(new rr(".morphTargetInfluence["+p+"]",f,_))}l=m.length*o}else{const m=".bones["+t[u].name+"]";n(or,m+".position",d,"pos",i),n(Di,m+".quaternion",d,"rot",i),n(or,m+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function J0(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return rr;case"vector":case"vector2":case"vector3":case"vector4":return or;case"color":return Uh;case"quaternion":return Di;case"bool":case"boolean":return Es;case"string":return Ts}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Q0(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=J0(r.type);if(r.times===void 0){const t=[],n=[];Oh(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const vs={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class e_{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const m=c[u],x=c[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return x}return null}}}const t_=new e_;class Fi{constructor(e){this.manager=e!==void 0?e:t_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const Zn={};class n_ extends Error{constructor(e,t){super(e),this.response=t}}class ar extends Fi{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=vs.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Zn[e]!==void 0){Zn[e].push({onLoad:t,onProgress:n,onError:i});return}Zn[e]=[],Zn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream=="undefined"||c.body===void 0||c.body.getReader===void 0)return c;const h=Zn[e],u=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),m=d?parseInt(d):0,x=m!==0;let p=0;const f=new ReadableStream({start(_){b();function b(){u.read().then(({done:v,value:y})=>{if(v)_.close();else{p+=y.byteLength;const S=new ProgressEvent("progress",{lengthComputable:x,loaded:p,total:m});for(let R=0,I=h.length;R<I;R++){const w=h[R];w.onProgress&&w.onProgress(S)}_.enqueue(y),b()}})}}});return new Response(f)}else throw new n_(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,m=new TextDecoder(d);return c.arrayBuffer().then(x=>m.decode(x))}}}).then(c=>{vs.add(e,c);const h=Zn[e];delete Zn[e];for(let u=0,d=h.length;u<d;u++){const m=h[u];m.onLoad&&m.onLoad(c)}}).catch(c=>{const h=Zn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Zn[e];for(let u=0,d=h.length;u<d;u++){const m=h[u];m.onError&&m.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class i_ extends Fi{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=vs.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=ir("img");function l(){h(),vs.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class s_ extends Fi{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new Dh,a=new ar(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(s.withCredentials),a.load(e,function(l){const c=s.parse(l);!c||(c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:Qt,o.wrapT=c.wrapT!==void 0?c.wrapT:Qt,o.magFilter=c.magFilter!==void 0?c.magFilter:ut,o.minFilter=c.minFilter!==void 0?c.minFilter:ut,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.encoding!==void 0&&(o.encoding=c.encoding),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=xi),c.mipmapCount===1&&(o.minFilter=ut),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,t&&t(o,c))},n,i),o}}class eo extends Fi{constructor(e){super(e)}load(e,t,n,i){const s=new Ut,o=new i_(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class to extends lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const zo=new $e,_c=new P,xc=new P;class Ia{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ue(512,512),this.map=null,this.mapPass=null,this.matrix=new $e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ta,this._frameExtents=new Ue(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;_c.setFromMatrixPosition(e.matrixWorld),t.position.copy(_c),xc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xc),t.updateMatrixWorld(),zo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(zo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class r_ extends Ia{constructor(){super(new Ot(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=nr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class kh extends to{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new r_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const vc=new $e,Os=new P,Bo=new P;class o_ extends Ia{constructor(){super(new Ot(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ue(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Os.setFromMatrixPosition(e.matrixWorld),n.position.copy(Os),Bo.copy(n.position),Bo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Bo),n.updateMatrixWorld(),i.makeTranslation(-Os.x,-Os.y,-Os.z),vc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vc)}}class a_ extends to{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new o_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class l_ extends Ia{constructor(){super(new Aa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Na extends to{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.shadow=new l_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class zh extends to{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class aa{static decodeText(e){if(typeof TextDecoder!="undefined")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class c_ extends Fi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap=="undefined"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch=="undefined"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=vs.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){vs.add(e,l),t&&t(l),s.manager.itemEnd(e)}).catch(function(l){i&&i(l),s.manager.itemError(e),s.manager.itemEnd(e)}),s.manager.itemStart(e)}}class h_{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=yc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=yc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function yc(){return(typeof performance=="undefined"?Date:performance).now()}const Fa="\\[\\]\\.:\\/",u_=new RegExp("["+Fa+"]","g"),Oa="[^"+Fa+"]",d_="[^"+Fa.replace("\\.","")+"]",f_=/((?:WC+[\/:])*)/.source.replace("WC",Oa),p_=/(WCOD+)?/.source.replace("WCOD",d_),m_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Oa),g_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Oa),__=new RegExp("^"+f_+p_+m_+g_+"$"),x_=["material","materials","bones","map"];class v_{constructor(e,t,n){const i=n||nt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class nt{constructor(e,t,n){this.path=t,this.parsedPath=n||nt.parseTrackName(t),this.node=nt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new nt.Composite(e,t,n):new nt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(u_,"")}static parseTrackName(e){const t=__.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);x_.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=nt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}nt.Composite=v_;nt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};nt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};nt.prototype.GetterByBindingType=[nt.prototype._getValue_direct,nt.prototype._getValue_array,nt.prototype._getValue_arrayElement,nt.prototype._getValue_toArray];nt.prototype.SetterByBindingTypeAndVersioning=[[nt.prototype._setValue_direct,nt.prototype._setValue_direct_setNeedsUpdate,nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_array,nt.prototype._setValue_array_setNeedsUpdate,nt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_arrayElement,nt.prototype._setValue_arrayElement_setNeedsUpdate,nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_fromArray,nt.prototype._setValue_fromArray_setNeedsUpdate,nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class no{constructor(e,t,n=0,i=1/0){this.ray=new Zr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ea,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return la(e,this,n,t),n.sort(wc),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)la(e[i],this,n,t);return n.sort(wc),n}}function wc(r,e){return r.distance-e.distance}function la(r,e,t,n){if(r.layers.test(e.layers)&&r.raycast(e,t),n===!0){const i=r.children;for(let s=0,o=i.length;s<o;s++)la(i[s],e,t,!0)}}class bc{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ft(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Mc=new P;class y_ extends lt{constructor(e,t){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new Rt,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,l=32;o<l;o++,a++){const c=o/l*Math.PI*2,h=a/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new pt(i,3));const s=new Jr({fog:!1,toneMapped:!1});this.cone=new Ih(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),Mc.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Mc),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const Qn=w_();function w_(){const r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:o,offsetTable:a}}function b_(r){Math.abs(r)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),r=Ft(r,-65504,65504),Qn.floatView[0]=r;const e=Qn.uint32View[0],t=e>>23&511;return Qn.baseTable[t]+((e&8388607)>>Qn.shiftTable[t])}function M_(r){const e=r>>10;return Qn.uint32View[0]=Qn.mantissaTable[Qn.offsetTable[e]+(r&1023)]+Qn.exponentTable[e],Qn.floatView[0]}const Sc={toHalfFloat:b_,fromHalfFloat:M_};typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ba}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ba);function Ec(r,e){if(e===md)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===ta||e===ch){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===ta)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class Ua extends Fi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new C_(t)}),this.register(function(t){return new F_(t)}),this.register(function(t){return new O_(t)}),this.register(function(t){return new U_(t)}),this.register(function(t){return new R_(t)}),this.register(function(t){return new P_(t)}),this.register(function(t){return new D_(t)}),this.register(function(t){return new I_(t)}),this.register(function(t){return new A_(t)}),this.register(function(t){return new N_(t)}),this.register(function(t){return new L_(t)}),this.register(function(t){return new E_(t)}),this.register(function(t){return new k_(t)}),this.register(function(t){return new z_(t)})}load(e,t,n,i){const s=this;let o;this.resourcePath!==""?o=this.resourcePath:this.path!==""?o=this.path:o=aa.extractUrlBase(e),this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new ar(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Bh){try{o[Qe.KHR_BINARY_GLTF]=new B_(e)}catch(u){i&&i(u);return}s=JSON.parse(o[Qe.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Q_(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);a[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case Qe.KHR_MATERIALS_UNLIT:o[u]=new T_;break;case Qe.KHR_DRACO_MESH_COMPRESSION:o[u]=new H_(s,this.dracoLoader);break;case Qe.KHR_TEXTURE_TRANSFORM:o[u]=new G_;break;case Qe.KHR_MESH_QUANTIZATION:o[u]=new V_;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function S_(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const Qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class E_{constructor(e){this.parser=e,this.name=Qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new ke(16777215);l.color!==void 0&&h.fromArray(l.color);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Na(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new a_(h),c.distance=u;break;case"spot":c=new kh(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,fi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class T_{constructor(){this.name=Qe.KHR_MATERIALS_UNLIT}getMaterialType(){return Un}extendParams(e,t,n){const i=[];e.color=new ke(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.fromArray(o),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Je))}return Promise.all(i)}}class A_{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class C_{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ue(a,a)}return Promise.all(s)}}class L_{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class R_{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new ke(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];return o.sheenColorFactor!==void 0&&t.sheenColor.fromArray(o.sheenColorFactor),o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Je)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class P_{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class D_{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new ke(a[0],a[1],a[2]),Promise.all(s)}}class I_{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class N_{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:si}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new ke(a[0],a[1],a[2]),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Je)),Promise.all(s)}}class F_{constructor(e){this.parser=e,this.name=Qe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class O_{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class U_{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class k_{constructor(e){this.name=Qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(m){return m.buffer}):o.ready.then(function(){const m=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(m),h,u,d,i.mode,i.filter),m})})}else return null}}class z_{constructor(e){this.name=Qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==cn.TRIANGLES&&c.mode!==cn.TRIANGLE_STRIP&&c.mode!==cn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,m=[];for(const x of u){const p=new $e,f=new P,_=new Mt,b=new P(1,1,1),v=new G0(x.geometry,x.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&f.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&_.fromBufferAttribute(l.ROTATION,y),l.SCALE&&b.fromBufferAttribute(l.SCALE,y),v.setMatrixAt(y,p.compose(f,_,b));for(const y in l)y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&x.geometry.setAttribute(y,l[y]);lt.prototype.copy.call(v,x),v.frustumCulled=!1,this.parser.assignFinalMaterial(v),m.push(v)}return h.isGroup?(h.clear(),h.add(...m),h):m[0]}))}}const Bh="glTF",Us=12,Tc={JSON:1313821514,BIN:5130562};class B_{constructor(e){this.name=Qe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Us),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Bh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Us,s=new DataView(e,Us);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===Tc.JSON){const c=new Uint8Array(e,Us+o,a);this.content=n.decode(c)}else if(l===Tc.BIN){const c=Us+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class H_{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=ca[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=ca[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],m=hs[d.componentType];c[u]=m.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u){i.decodeDracoFile(h,function(d){for(const m in d.attributes){const x=d.attributes[m],p=l[m];p!==void 0&&(x.normalized=p)}u(d)},a,c)})})}}class G_{constructor(){this.name=Qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return t.texCoord!==void 0&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class V_{constructor(){this.name=Qe.KHR_MESH_QUANTIZATION}}class Hh extends dr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,m=d*u,x=e*c,p=x-c,f=-2*m+3*d,_=m-d,b=1-f,v=_-d+u;for(let y=0;y!==a;y++){const S=o[p+y+a],R=o[p+y+l]*h,I=o[x+y+a],w=o[x+y]*h;s[y]=b*S+v*R+f*I+_*w}return s}}const W_=new Mt;class X_ extends Hh{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return W_.fromArray(s).normalize().toArray(s),s}}const cn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},hs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ac={9728:Lt,9729:ut,9984:ea,9985:ah,9986:Gr,9987:xi},Cc={33071:Qt,33648:Xr,10497:ps},Ho={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ca={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},hi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},j_={CUBICSPLINE:void 0,LINEAR:gs,STEP:tr},Go={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function q_(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Bn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ti})),r.DefaultMaterial}function ks(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function fi(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function $_(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;a.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function Y_(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Z_(r){const e=r.extensions&&r.extensions[Qe.KHR_DRACO_MESH_COMPRESSION];let t;return e?t="draco:"+e.bufferView+":"+e.indices+":"+Lc(e.attributes):t=r.indices+":"+Lc(r.attributes)+":"+r.mode,t}function Lc(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function ha(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function K_(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const J_=new $e;class Q_{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new S_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator!="undefined"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap=="undefined"||n||i&&s<98?this.textureLoader=new eo(this.options.manager):this.textureLoader=new c_(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ar(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};ks(s,a,i),fi(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())s(h,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Qe.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(aa.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Ho[i.type],a=hs[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new kt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=Ho[i.type],c=hs[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,m=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,x=i.normalized===!0;let p,f;if(m&&m!==u){const _=Math.floor(d/m),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+_+":"+i.count;let v=t.cache.get(b);v||(p=new c(a,_*m,i.count*m/h),v=new U0(p,m/h),t.cache.add(b,v)),f=new Ra(v,l,d%m/h,x)}else a===null?p=new c(i.count*l):p=new c(a,d,i.count*l),f=new kt(p,l,x);if(i.sparse!==void 0){const _=Ho.SCALAR,b=hs[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,S=new b(o[1],v,i.sparse.count*_),R=new c(o[2],y,i.sparse.count*l);a!==null&&(f=new kt(f.array.slice(),f.itemSize,f.normalized));for(let I=0,w=S.length;I<w;I++){const T=S[I];if(f.setX(T,R[I*l]),l>=2&&f.setY(T,R[I*l+1]),l>=3&&f.setZ(T,R[I*l+2]),l>=4&&f.setW(T,R[I*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return f})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"";const d=(s.samplers||{})[o.sampler]||{};return h.magFilter=Ac[d.magFilter]||ut,h.minFilter=Ac[d.minFilter]||xi,h.wrapS=Cc[d.wrapS]||ps,h.wrapT=Cc[d.wrapT]||ps,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,m){let x=d;t.isImageBitmapLoader===!0&&(x=function(p){const f=new Ut(p);f.needsUpdate=!0,d(f)}),t.load(aa.resolveURL(u,s.path),x,void 0,m)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),u.userData.mimeType=o.mimeType||K_(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord!=0&&!(t==="aoMap"&&n.texCoord==1)&&console.warn("THREE.GLTFLoader: Custom UV set "+n.texCoord+" for texture "+t+" not yet supported."),s.extensions[Qe.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Qe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[Qe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.encoding=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Nh,Cn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Jr,Cn.prototype.copy.call(l,n),l.color.copy(n.color),this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}n.aoMap&&t.attributes.uv2===void 0&&t.attributes.uv!==void 0&&t.setAttribute("uv2",t.attributes.uv),e.material=n}getMaterialType(){return Bn}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[Qe.KHR_MATERIALS_UNLIT]){const u=i[Qe.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,s,t))}else{const u=s.pbrMetallicRoughness||{};if(a.color=new ke(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.fromArray(d),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,Je)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Sn);const h=s.alphaMode||Go.OPAQUE;if(h===Go.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Go.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Un&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Ue(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;a.normalScale.set(u,u)}return s.occlusionTexture!==void 0&&o!==Un&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Un&&(a.emissive=new ke().fromArray(s.emissiveFactor)),s.emissiveTexture!==void 0&&o!==Un&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Je)),Promise.all(c).then(function(){const u=new o(a);return s.name&&(u.name=s.name),fi(u,s),t.associations.set(u,{materials:e}),s.extensions&&ks(i,u,s),u})}createUniqueName(e){const t=nt.sanitizeNodeName(e||"");let n=t;for(let i=1;this.nodeNamesUsed[n];++i)n=t+"_"+i;return this.nodeNamesUsed[n]=!0,n}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[Qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Rc(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=Z_(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[Qe.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Rc(new Rt,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?q_(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let m=0,x=h.length;m<x;m++){const p=h[m],f=o[m];let _;const b=c[m];if(f.mode===cn.TRIANGLES||f.mode===cn.TRIANGLE_STRIP||f.mode===cn.TRIANGLE_FAN||f.mode===void 0)_=s.isSkinnedMesh===!0?new z0(p,b):new ge(p,b),_.isSkinnedMesh===!0&&_.normalizeSkinWeights(),f.mode===cn.TRIANGLE_STRIP?_.geometry=Ec(_.geometry,ch):f.mode===cn.TRIANGLE_FAN&&(_.geometry=Ec(_.geometry,ta));else if(f.mode===cn.LINES)_=new Ih(p,b);else if(f.mode===cn.LINE_STRIP)_=new yn(p,b);else if(f.mode===cn.LINE_LOOP)_=new V0(p,b);else if(f.mode===cn.POINTS)_=new W0(p,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+f.mode);Object.keys(_.geometry.morphAttributes).length>0&&Y_(_,s),_.name=t.createUniqueName(s.name||"mesh_"+e),fi(_,s),f.extensions&&ks(i,_,f),t.assignFinalMaterial(_),u.push(_)}for(let m=0,x=u.length;m<x;m++)t.associations.set(u[m],{meshes:e,primitives:m});if(u.length===1)return u[0];const d=new Tn;t.associations.set(d,{meshes:e});for(let m=0,x=u.length;m<x;m++)d.add(u[m]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ot(is.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Aa(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),fi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new $e;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Pa(a,l)})}loadAnimation(e){const n=this.json.animations[e],i=[],s=[],o=[],a=[],l=[];for(let c=0,h=n.channels.length;c<h;c++){const u=n.channels[c],d=n.samplers[u.sampler],m=u.target,x=m.node,p=n.parameters!==void 0?n.parameters[d.input]:d.input,f=n.parameters!==void 0?n.parameters[d.output]:d.output;i.push(this.getDependency("node",x)),s.push(this.getDependency("accessor",p)),o.push(this.getDependency("accessor",f)),a.push(d),l.push(m)}return Promise.all([Promise.all(i),Promise.all(s),Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2],m=c[3],x=c[4],p=[];for(let _=0,b=h.length;_<b;_++){const v=h[_],y=u[_],S=d[_],R=m[_],I=x[_];if(v===void 0)continue;v.updateMatrix();let w;switch(hi[I.path]){case hi.weights:w=rr;break;case hi.rotation:w=Di;break;case hi.position:case hi.scale:default:w=or;break}const T=v.name?v.name:v.uuid,F=R.interpolation!==void 0?j_[R.interpolation]:gs,K=[];hi[I.path]===hi.weights?v.traverse(function(B){B.morphTargetInfluences&&K.push(B.name?B.name:B.uuid)}):K.push(T);let $=S.array;if(S.normalized){const B=ha($.constructor),O=new Float32Array($.length);for(let q=0,ee=$.length;q<ee;q++)O[q]=$[q]*B;$=O}for(let B=0,O=K.length;B<O;B++){const q=new w(K[B]+"."+hi[I.path],y.array,$,F);R.interpolation==="CUBICSPLINE"&&(q.createInterpolant=function(oe){const Z=this instanceof Di?X_:Hh;return new Z(this.times,this.values,this.getValueSize()/3,oe)},q.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),p.push(q)}}const f=n.name?n.name:"animation_"+e;return new K0(f,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(!!a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(m){!m.isSkinnedMesh||m.bind(d,J_)});for(let m=0,x=u.length;m<x;m++)h.add(u[m]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(s.isBone===!0?h=new Ph:c.length>1?h=new Tn:c.length===1?h=c[0]:h=new lt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=o),fi(h,s),s.extensions&&ks(n,h,s),s.matrix!==void 0){const u=new $e;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Tn;n.name&&(s.name=i.createUniqueName(n.name)),fi(s,n),n.extensions&&ks(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,m]of i.associations)(d instanceof Cn||d instanceof Ut)&&u.set(d,m);return h.traverse(d=>{const m=i.associations.get(d);m!=null&&u.set(d,m)}),u};return i.associations=c(s),s})}}function ex(r,e,t){const n=e.attributes,i=new ys;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new P(l[0],l[1],l[2]),new P(c[0],c[1],c[2])),a.normalized){const h=ha(hs[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new P,l=new P;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],m=d.min,x=d.max;if(m!==void 0&&x!==void 0){if(l.setX(Math.max(Math.abs(m[0]),Math.abs(x[0]))),l.setY(Math.max(Math.abs(m[1]),Math.abs(x[1]))),l.setZ(Math.max(Math.abs(m[2]),Math.abs(x[2]))),d.normalized){const p=ha(hs[d.componentType]);l.multiplyScalar(p)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new ws;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Rc(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=ca[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return fi(r,e),ex(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?$_(r,e.targets,t):r})}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.6.9
*/var Pc=function(r){return URL.createObjectURL(new Blob([r],{type:"text/javascript"}))};try{URL.revokeObjectURL(Pc(""))}catch{Pc=function(e){return"data:application/javascript;charset=UTF-8,"+encodeURI(e)}}var un=Uint8Array,mi=Uint16Array,ua=Uint32Array,Gh=new un([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Vh=new un([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),tx=new un([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Wh=function(r,e){for(var t=new mi(31),n=0;n<31;++n)t[n]=e+=1<<r[n-1];for(var i=new ua(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)i[s]=s-t[n]<<5|n;return[t,i]},Xh=Wh(Gh,2),jh=Xh[0],nx=Xh[1];jh[28]=258,nx[258]=28;var ix=Wh(Vh,0),sx=ix[0],da=new mi(32768);for(var dt=0;dt<32768;++dt){var ui=(dt&43690)>>>1|(dt&21845)<<1;ui=(ui&52428)>>>2|(ui&13107)<<2,ui=(ui&61680)>>>4|(ui&3855)<<4,da[dt]=((ui&65280)>>>8|(ui&255)<<8)>>>1}var Zs=function(r,e,t){for(var n=r.length,i=0,s=new mi(e);i<n;++i)++s[r[i]-1];var o=new mi(e);for(i=0;i<e;++i)o[i]=o[i-1]+s[i-1]<<1;var a;if(t){a=new mi(1<<e);var l=15-e;for(i=0;i<n;++i)if(r[i])for(var c=i<<4|r[i],h=e-r[i],u=o[r[i]-1]++<<h,d=u|(1<<h)-1;u<=d;++u)a[da[u]>>>l]=c}else for(a=new mi(n),i=0;i<n;++i)r[i]&&(a[i]=da[o[r[i]-1]++]>>>15-r[i]);return a},fr=new un(288);for(var dt=0;dt<144;++dt)fr[dt]=8;for(var dt=144;dt<256;++dt)fr[dt]=9;for(var dt=256;dt<280;++dt)fr[dt]=7;for(var dt=280;dt<288;++dt)fr[dt]=8;var qh=new un(32);for(var dt=0;dt<32;++dt)qh[dt]=5;var rx=Zs(fr,9,1),ox=Zs(qh,5,1),Vo=function(r){for(var e=r[0],t=1;t<r.length;++t)r[t]>e&&(e=r[t]);return e},_n=function(r,e,t){var n=e/8|0;return(r[n]|r[n+1]<<8)>>(e&7)&t},Wo=function(r,e){var t=e/8|0;return(r[t]|r[t+1]<<8|r[t+2]<<16)>>(e&7)},ax=function(r){return(r/8|0)+(r&7&&1)},lx=function(r,e,t){(e==null||e<0)&&(e=0),(t==null||t>r.length)&&(t=r.length);var n=new(r instanceof mi?mi:r instanceof ua?ua:un)(t-e);return n.set(r.subarray(e,t)),n},cx=function(r,e,t){var n=r.length;if(!n||t&&!t.l&&n<5)return e||new un(0);var i=!e||t,s=!t||t.i;t||(t={}),e||(e=new un(n*3));var o=function(ue){var ve=e.length;if(ue>ve){var be=new un(Math.max(ve*2,ue));be.set(e),e=be}},a=t.f||0,l=t.p||0,c=t.b||0,h=t.l,u=t.d,d=t.m,m=t.n,x=n*8;do{if(!h){t.f=a=_n(r,l,1);var p=_n(r,l+1,3);if(l+=3,p)if(p==1)h=rx,u=ox,d=9,m=5;else if(p==2){var v=_n(r,l,31)+257,y=_n(r,l+10,15)+4,S=v+_n(r,l+5,31)+1;l+=14;for(var R=new un(S),I=new un(19),w=0;w<y;++w)I[tx[w]]=_n(r,l+w*3,7);l+=y*3;for(var T=Vo(I),F=(1<<T)-1,K=Zs(I,T,1),w=0;w<S;){var $=K[_n(r,l,F)];l+=$&15;var f=$>>>4;if(f<16)R[w++]=f;else{var B=0,O=0;for(f==16?(O=3+_n(r,l,3),l+=2,B=R[w-1]):f==17?(O=3+_n(r,l,7),l+=3):f==18&&(O=11+_n(r,l,127),l+=7);O--;)R[w++]=B}}var q=R.subarray(0,v),ee=R.subarray(v);d=Vo(q),m=Vo(ee),h=Zs(q,d,1),u=Zs(ee,m,1)}else throw"invalid block type";else{var f=ax(l)+4,_=r[f-4]|r[f-3]<<8,b=f+_;if(b>n){if(s)throw"unexpected EOF";break}i&&o(c+_),e.set(r.subarray(f,b),c),t.b=c+=_,t.p=l=b*8;continue}if(l>x){if(s)throw"unexpected EOF";break}}i&&o(c+131072);for(var oe=(1<<d)-1,Z=(1<<m)-1,ie=l;;ie=l){var B=h[Wo(r,l)&oe],te=B>>>4;if(l+=B&15,l>x){if(s)throw"unexpected EOF";break}if(!B)throw"invalid length/literal";if(te<256)e[c++]=te;else if(te==256){ie=l,h=null;break}else{var Te=te-254;if(te>264){var w=te-257,G=Gh[w];Te=_n(r,l,(1<<G)-1)+jh[w],l+=G}var ae=u[Wo(r,l)&Z],fe=ae>>>4;if(!ae)throw"invalid distance";l+=ae&15;var ee=sx[fe];if(fe>3){var G=Vh[fe];ee+=Wo(r,l)&(1<<G)-1,l+=G}if(l>x){if(s)throw"unexpected EOF";break}i&&o(c+131072);for(var W=c+Te;c<W;c+=4)e[c]=e[c-ee],e[c+1]=e[c+1-ee],e[c+2]=e[c+2-ee],e[c+3]=e[c+3-ee];c=W}}t.l=h,t.p=ie,t.b=c,h&&(a=1,t.m=d,t.d=u,t.n=m)}while(!a);return c==e.length?e:lx(e,0,c)},hx=new un(0),ux=function(r){if((r[0]&15)!=8||r[0]>>>4>7||(r[0]<<8|r[1])%31)throw"invalid zlib data";if(r[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function kr(r,e){return cx((ux(r),r.subarray(2,-4)),e)}var dx=typeof TextDecoder!="undefined"&&new TextDecoder,fx=0;try{dx.decode(hx,{stream:!0}),fx=1}catch{}class ka extends s_{constructor(e){super(e),this.type=fn}parse(e){const T=Math.pow(2.7182818,2.2);function F(g,M){let C=0;for(let j=0;j<65536;++j)(j==0||g[j>>3]&1<<(j&7))&&(M[C++]=j);const U=C-1;for(;C<65536;)M[C++]=0;return U}function K(g){for(let M=0;M<16384;M++)g[M]={},g[M].len=0,g[M].lit=0,g[M].p=null}const $={l:0,c:0,lc:0};function B(g,M,C,U,j){for(;C<g;)M=M<<8|De(U,j),C+=8;C-=g,$.l=M>>C&(1<<g)-1,$.c=M,$.lc=C}const O=new Array(59);function q(g){for(let C=0;C<=58;++C)O[C]=0;for(let C=0;C<65537;++C)O[g[C]]+=1;let M=0;for(let C=58;C>0;--C){const U=M+O[C]>>1;O[C]=M,M=U}for(let C=0;C<65537;++C){const U=g[C];U>0&&(g[C]=U|O[U]++<<6)}}function ee(g,M,C,U,j,H){const ne=M;let ce=0,de=0;for(;U<=j;U++){if(ne.value-M.value>C)return!1;B(6,ce,de,g,ne);const se=$.l;if(ce=$.c,de=$.lc,H[U]=se,se==63){if(ne.value-M.value>C)throw new Error("Something wrong with hufUnpackEncTable");B(8,ce,de,g,ne);let re=$.l+6;if(ce=$.c,de=$.lc,U+re>j+1)throw new Error("Something wrong with hufUnpackEncTable");for(;re--;)H[U++]=0;U--}else if(se>=59){let re=se-59+2;if(U+re>j+1)throw new Error("Something wrong with hufUnpackEncTable");for(;re--;)H[U++]=0;U--}}q(H)}function oe(g){return g&63}function Z(g){return g>>6}function ie(g,M,C,U){for(;M<=C;M++){const j=Z(g[M]),H=oe(g[M]);if(j>>H)throw new Error("Invalid table entry");if(H>14){const ne=U[j>>H-14];if(ne.len)throw new Error("Invalid table entry");if(ne.lit++,ne.p){const ce=ne.p;ne.p=new Array(ne.lit);for(let de=0;de<ne.lit-1;++de)ne.p[de]=ce[de]}else ne.p=new Array(1);ne.p[ne.lit-1]=M}else if(H){let ne=0;for(let ce=1<<14-H;ce>0;ce--){const de=U[(j<<14-H)+ne];if(de.len||de.p)throw new Error("Invalid table entry");de.len=H,de.lit=M,ne++}}}return!0}const te={c:0,lc:0};function Te(g,M,C,U){g=g<<8|De(C,U),M+=8,te.c=g,te.lc=M}const G={c:0,lc:0};function ae(g,M,C,U,j,H,ne,ce,de){if(g==M){U<8&&(Te(C,U,j,H),C=te.c,U=te.lc),U-=8;let se=C>>U;if(se=new Uint8Array([se])[0],ce.value+se>de)return!1;const re=ne[ce.value-1];for(;se-- >0;)ne[ce.value++]=re}else if(ce.value<de)ne[ce.value++]=g;else return!1;G.c=C,G.lc=U}function fe(g){return g&65535}function W(g){const M=fe(g);return M>32767?M-65536:M}const ue={a:0,b:0};function ve(g,M){const C=W(g),j=W(M),H=C+(j&1)+(j>>1),ne=H,ce=H-j;ue.a=ne,ue.b=ce}function be(g,M){const C=fe(g),U=fe(M),j=C-(U>>1)&65535,H=U+j-32768&65535;ue.a=H,ue.b=j}function Le(g,M,C,U,j,H,ne){const ce=ne<16384,de=C>j?j:C;let se=1,re,he;for(;se<=de;)se<<=1;for(se>>=1,re=se,se>>=1;se>=1;){he=0;const Ce=he+H*(j-re),Ee=H*se,ze=H*re,Pe=U*se,Ie=U*re;let Xe,Ye,et,It;for(;he<=Ce;he+=ze){let qe=he;const Ze=he+U*(C-re);for(;qe<=Ze;qe+=Ie){const xt=qe+Pe,Xt=qe+Ee,At=Xt+Pe;ce?(ve(g[qe+M],g[Xt+M]),Xe=ue.a,et=ue.b,ve(g[xt+M],g[At+M]),Ye=ue.a,It=ue.b,ve(Xe,Ye),g[qe+M]=ue.a,g[xt+M]=ue.b,ve(et,It),g[Xt+M]=ue.a,g[At+M]=ue.b):(be(g[qe+M],g[Xt+M]),Xe=ue.a,et=ue.b,be(g[xt+M],g[At+M]),Ye=ue.a,It=ue.b,be(Xe,Ye),g[qe+M]=ue.a,g[xt+M]=ue.b,be(et,It),g[Xt+M]=ue.a,g[At+M]=ue.b)}if(C&se){const xt=qe+Ee;ce?ve(g[qe+M],g[xt+M]):be(g[qe+M],g[xt+M]),Xe=ue.a,g[xt+M]=ue.b,g[qe+M]=Xe}}if(j&se){let qe=he;const Ze=he+U*(C-re);for(;qe<=Ze;qe+=Ie){const xt=qe+Pe;ce?ve(g[qe+M],g[xt+M]):be(g[qe+M],g[xt+M]),Xe=ue.a,g[xt+M]=ue.b,g[qe+M]=Xe}}re=se,se>>=1}return he}function Oe(g,M,C,U,j,H,ne,ce,de){let se=0,re=0;const he=ne,Ce=Math.trunc(U.value+(j+7)/8);for(;U.value<Ce;)for(Te(se,re,C,U),se=te.c,re=te.lc;re>=14;){const ze=se>>re-14&16383,Pe=M[ze];if(Pe.len)re-=Pe.len,ae(Pe.lit,H,se,re,C,U,ce,de,he),se=G.c,re=G.lc;else{if(!Pe.p)throw new Error("hufDecode issues");let Ie;for(Ie=0;Ie<Pe.lit;Ie++){const Xe=oe(g[Pe.p[Ie]]);for(;re<Xe&&U.value<Ce;)Te(se,re,C,U),se=te.c,re=te.lc;if(re>=Xe&&Z(g[Pe.p[Ie]])==(se>>re-Xe&(1<<Xe)-1)){re-=Xe,ae(Pe.p[Ie],H,se,re,C,U,ce,de,he),se=G.c,re=G.lc;break}}if(Ie==Pe.lit)throw new Error("hufDecode issues")}}const Ee=8-j&7;for(se>>=Ee,re-=Ee;re>0;){const ze=M[se<<14-re&16383];if(ze.len)re-=ze.len,ae(ze.lit,H,se,re,C,U,ce,de,he),se=G.c,re=G.lc;else throw new Error("hufDecode issues")}return!0}function Ge(g,M,C,U,j,H){const ne={value:0},ce=C.value,de=we(M,C),se=we(M,C);C.value+=4;const re=we(M,C);if(C.value+=4,de<0||de>=65537||se<0||se>=65537)throw new Error("Something wrong with HUF_ENCSIZE");const he=new Array(65537),Ce=new Array(16384);K(Ce);const Ee=U-(C.value-ce);if(ee(g,C,Ee,de,se,he),re>8*(U-(C.value-ce)))throw new Error("Something wrong with hufUncompress");ie(he,de,se,Ce),Oe(he,Ce,g,C,re,se,H,j,ne)}function je(g,M,C){for(let U=0;U<C;++U)M[U]=g[M[U]]}function Ke(g){for(let M=1;M<g.length;M++){const C=g[M-1]+g[M]-128;g[M]=C}}function _t(g,M){let C=0,U=Math.floor((g.length+1)/2),j=0;const H=g.length-1;for(;!(j>H||(M[j++]=g[C++],j>H));)M[j++]=g[U++]}function Tt(g){let M=g.byteLength;const C=new Array;let U=0;const j=new DataView(g);for(;M>0;){const H=j.getInt8(U++);if(H<0){const ne=-H;M-=ne+1;for(let ce=0;ce<ne;ce++)C.push(j.getUint8(U++))}else{const ne=H;M-=2;const ce=j.getUint8(U++);for(let de=0;de<ne+1;de++)C.push(ce)}}return C}function vt(g,M,C,U,j,H){let ne=new DataView(H.buffer);const ce=C[g.idx[0]].width,de=C[g.idx[0]].height,se=3,re=Math.floor(ce/8),he=Math.ceil(ce/8),Ce=Math.ceil(de/8),Ee=ce-(he-1)*8,ze=de-(Ce-1)*8,Pe={value:0},Ie=new Array(se),Xe=new Array(se),Ye=new Array(se),et=new Array(se),It=new Array(se);for(let Ze=0;Ze<se;++Ze)It[Ze]=M[g.idx[Ze]],Ie[Ze]=Ze<1?0:Ie[Ze-1]+he*Ce,Xe[Ze]=new Float32Array(64),Ye[Ze]=new Uint16Array(64),et[Ze]=new Uint16Array(he*64);for(let Ze=0;Ze<Ce;++Ze){let xt=8;Ze==Ce-1&&(xt=ze);let Xt=8;for(let tt=0;tt<he;++tt){tt==he-1&&(Xt=Ee);for(let ht=0;ht<se;++ht)Ye[ht].fill(0),Ye[ht][0]=j[Ie[ht]++],yt(Pe,U,Ye[ht]),ct(Ye[ht],Xe[ht]),it(Xe[ht]);Wt(Xe);for(let ht=0;ht<se;++ht)Pt(Xe[ht],et[ht],tt*64)}let At=0;for(let tt=0;tt<se;++tt){const ht=C[g.idx[tt]].type;for(let Wn=8*Ze;Wn<8*Ze+xt;++Wn){At=It[tt][Wn];for(let As=0;As<re;++As){const Ln=As*64+(Wn&7)*8;ne.setUint16(At+0*2*ht,et[tt][Ln+0],!0),ne.setUint16(At+1*2*ht,et[tt][Ln+1],!0),ne.setUint16(At+2*2*ht,et[tt][Ln+2],!0),ne.setUint16(At+3*2*ht,et[tt][Ln+3],!0),ne.setUint16(At+4*2*ht,et[tt][Ln+4],!0),ne.setUint16(At+5*2*ht,et[tt][Ln+5],!0),ne.setUint16(At+6*2*ht,et[tt][Ln+6],!0),ne.setUint16(At+7*2*ht,et[tt][Ln+7],!0),At+=8*2*ht}}if(re!=he)for(let Wn=8*Ze;Wn<8*Ze+xt;++Wn){const As=It[tt][Wn]+8*re*2*ht,Ln=re*64+(Wn&7)*8;for(let pr=0;pr<Xt;++pr)ne.setUint16(As+pr*2*ht,et[tt][Ln+pr],!0)}}}const qe=new Uint16Array(ce);ne=new DataView(H.buffer);for(let Ze=0;Ze<se;++Ze){C[g.idx[Ze]].decoded=!0;const xt=C[g.idx[Ze]].type;if(C[Ze].type==2)for(let Xt=0;Xt<de;++Xt){const At=It[Ze][Xt];for(let tt=0;tt<ce;++tt)qe[tt]=ne.getUint16(At+tt*2*xt,!0);for(let tt=0;tt<ce;++tt)ne.setFloat32(At+tt*2*xt,k(qe[tt]),!0)}}}function yt(g,M,C){let U,j=1;for(;j<64;)U=M[g.value],U==65280?j=64:U>>8==255?j+=U&255:(C[j]=U,j++),g.value++}function ct(g,M){M[0]=k(g[0]),M[1]=k(g[1]),M[2]=k(g[5]),M[3]=k(g[6]),M[4]=k(g[14]),M[5]=k(g[15]),M[6]=k(g[27]),M[7]=k(g[28]),M[8]=k(g[2]),M[9]=k(g[4]),M[10]=k(g[7]),M[11]=k(g[13]),M[12]=k(g[16]),M[13]=k(g[26]),M[14]=k(g[29]),M[15]=k(g[42]),M[16]=k(g[3]),M[17]=k(g[8]),M[18]=k(g[12]),M[19]=k(g[17]),M[20]=k(g[25]),M[21]=k(g[30]),M[22]=k(g[41]),M[23]=k(g[43]),M[24]=k(g[9]),M[25]=k(g[11]),M[26]=k(g[18]),M[27]=k(g[24]),M[28]=k(g[31]),M[29]=k(g[40]),M[30]=k(g[44]),M[31]=k(g[53]),M[32]=k(g[10]),M[33]=k(g[19]),M[34]=k(g[23]),M[35]=k(g[32]),M[36]=k(g[39]),M[37]=k(g[45]),M[38]=k(g[52]),M[39]=k(g[54]),M[40]=k(g[20]),M[41]=k(g[22]),M[42]=k(g[33]),M[43]=k(g[38]),M[44]=k(g[46]),M[45]=k(g[51]),M[46]=k(g[55]),M[47]=k(g[60]),M[48]=k(g[21]),M[49]=k(g[34]),M[50]=k(g[37]),M[51]=k(g[47]),M[52]=k(g[50]),M[53]=k(g[56]),M[54]=k(g[59]),M[55]=k(g[61]),M[56]=k(g[35]),M[57]=k(g[36]),M[58]=k(g[48]),M[59]=k(g[49]),M[60]=k(g[57]),M[61]=k(g[58]),M[62]=k(g[62]),M[63]=k(g[63])}function it(g){const M=.5*Math.cos(.7853975),C=.5*Math.cos(3.14159/16),U=.5*Math.cos(3.14159/8),j=.5*Math.cos(3*3.14159/16),H=.5*Math.cos(5*3.14159/16),ne=.5*Math.cos(3*3.14159/8),ce=.5*Math.cos(7*3.14159/16),de=new Array(4),se=new Array(4),re=new Array(4),he=new Array(4);for(let Ce=0;Ce<8;++Ce){const Ee=Ce*8;de[0]=U*g[Ee+2],de[1]=ne*g[Ee+2],de[2]=U*g[Ee+6],de[3]=ne*g[Ee+6],se[0]=C*g[Ee+1]+j*g[Ee+3]+H*g[Ee+5]+ce*g[Ee+7],se[1]=j*g[Ee+1]-ce*g[Ee+3]-C*g[Ee+5]-H*g[Ee+7],se[2]=H*g[Ee+1]-C*g[Ee+3]+ce*g[Ee+5]+j*g[Ee+7],se[3]=ce*g[Ee+1]-H*g[Ee+3]+j*g[Ee+5]-C*g[Ee+7],re[0]=M*(g[Ee+0]+g[Ee+4]),re[3]=M*(g[Ee+0]-g[Ee+4]),re[1]=de[0]+de[3],re[2]=de[1]-de[2],he[0]=re[0]+re[1],he[1]=re[3]+re[2],he[2]=re[3]-re[2],he[3]=re[0]-re[1],g[Ee+0]=he[0]+se[0],g[Ee+1]=he[1]+se[1],g[Ee+2]=he[2]+se[2],g[Ee+3]=he[3]+se[3],g[Ee+4]=he[3]-se[3],g[Ee+5]=he[2]-se[2],g[Ee+6]=he[1]-se[1],g[Ee+7]=he[0]-se[0]}for(let Ce=0;Ce<8;++Ce)de[0]=U*g[16+Ce],de[1]=ne*g[16+Ce],de[2]=U*g[48+Ce],de[3]=ne*g[48+Ce],se[0]=C*g[8+Ce]+j*g[24+Ce]+H*g[40+Ce]+ce*g[56+Ce],se[1]=j*g[8+Ce]-ce*g[24+Ce]-C*g[40+Ce]-H*g[56+Ce],se[2]=H*g[8+Ce]-C*g[24+Ce]+ce*g[40+Ce]+j*g[56+Ce],se[3]=ce*g[8+Ce]-H*g[24+Ce]+j*g[40+Ce]-C*g[56+Ce],re[0]=M*(g[Ce]+g[32+Ce]),re[3]=M*(g[Ce]-g[32+Ce]),re[1]=de[0]+de[3],re[2]=de[1]-de[2],he[0]=re[0]+re[1],he[1]=re[3]+re[2],he[2]=re[3]-re[2],he[3]=re[0]-re[1],g[0+Ce]=he[0]+se[0],g[8+Ce]=he[1]+se[1],g[16+Ce]=he[2]+se[2],g[24+Ce]=he[3]+se[3],g[32+Ce]=he[3]-se[3],g[40+Ce]=he[2]-se[2],g[48+Ce]=he[1]-se[1],g[56+Ce]=he[0]-se[0]}function Wt(g){for(let M=0;M<64;++M){const C=g[0][M],U=g[1][M],j=g[2][M];g[0][M]=C+1.5747*j,g[1][M]=C-.1873*U-.4682*j,g[2][M]=C+1.8556*U}}function Pt(g,M,C){for(let U=0;U<64;++U)M[C+U]=Sc.toHalfFloat(L(g[U]))}function L(g){return g<=1?Math.sign(g)*Math.pow(Math.abs(g),2.2):Math.sign(g)*Math.pow(T,Math.abs(g)-1)}function E(g){return new DataView(g.array.buffer,g.offset.value,g.size)}function J(g){const M=g.viewer.buffer.slice(g.offset.value,g.offset.value+g.size),C=new Uint8Array(Tt(M)),U=new Uint8Array(C.length);return Ke(C),_t(C,U),new DataView(U.buffer)}function pe(g){const M=g.array.slice(g.offset.value,g.offset.value+g.size),C=kr(M),U=new Uint8Array(C.length);return Ke(C),_t(C,U),new DataView(U.buffer)}function me(g){const M=g.viewer,C={value:g.offset.value},U=new Uint16Array(g.width*g.scanlineBlockSize*(g.channels*g.type)),j=new Uint8Array(8192);let H=0;const ne=new Array(g.channels);for(let ze=0;ze<g.channels;ze++)ne[ze]={},ne[ze].start=H,ne[ze].end=ne[ze].start,ne[ze].nx=g.width,ne[ze].ny=g.lines,ne[ze].size=g.type,H+=ne[ze].nx*ne[ze].ny*ne[ze].size;const ce=le(M,C),de=le(M,C);if(de>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(ce<=de)for(let ze=0;ze<de-ce+1;ze++)j[ze+ce]=We(M,C);const se=new Uint16Array(65536),re=F(j,se),he=we(M,C);Ge(g.array,M,C,he,U,H);for(let ze=0;ze<g.channels;++ze){const Pe=ne[ze];for(let Ie=0;Ie<ne[ze].size;++Ie)Le(U,Pe.start+Ie,Pe.nx,Pe.size,Pe.ny,Pe.nx*Pe.size,re)}je(se,U,H);let Ce=0;const Ee=new Uint8Array(U.buffer.byteLength);for(let ze=0;ze<g.lines;ze++)for(let Pe=0;Pe<g.channels;Pe++){const Ie=ne[Pe],Xe=Ie.nx*Ie.size,Ye=new Uint8Array(U.buffer,Ie.end*2,Xe*2);Ee.set(Ye,Ce),Ce+=Xe*2,Ie.end+=Xe}return new DataView(Ee.buffer)}function ye(g){const M=g.array.slice(g.offset.value,g.offset.value+g.size),C=kr(M),U=g.lines*g.channels*g.width,j=g.type==1?new Uint16Array(U):new Uint32Array(U);let H=0,ne=0;const ce=new Array(4);for(let de=0;de<g.lines;de++)for(let se=0;se<g.channels;se++){let re=0;switch(g.type){case 1:ce[0]=H,ce[1]=ce[0]+g.width,H=ce[1]+g.width;for(let he=0;he<g.width;++he)re+=C[ce[0]++]<<8|C[ce[1]++],j[ne]=re,ne++;break;case 2:ce[0]=H,ce[1]=ce[0]+g.width,ce[2]=ce[1]+g.width,H=ce[2]+g.width;for(let he=0;he<g.width;++he)re+=C[ce[0]++]<<24|C[ce[1]++]<<16|C[ce[2]++]<<8,j[ne]=re,ne++;break}}return new DataView(j.buffer)}function Ne(g){const M=g.viewer,C={value:g.offset.value},U=new Uint8Array(g.width*g.lines*(g.channels*g.type*2)),j={version:Be(M,C),unknownUncompressedSize:Be(M,C),unknownCompressedSize:Be(M,C),acCompressedSize:Be(M,C),dcCompressedSize:Be(M,C),rleCompressedSize:Be(M,C),rleUncompressedSize:Be(M,C),rleRawSize:Be(M,C),totalAcUncompressedCount:Be(M,C),totalDcUncompressedCount:Be(M,C),acCompression:Be(M,C)};if(j.version<2)throw new Error("EXRLoader.parse: "+Y.compression+" version "+j.version+" is unsupported");const H=new Array;let ne=le(M,C)-2;for(;ne>0;){const Pe=D(M.buffer,C),Ie=We(M,C),Xe=Ie>>2&3,Ye=(Ie>>4)-1,et=new Int8Array([Ye])[0],It=We(M,C);H.push({name:Pe,index:et,type:It,compression:Xe}),ne-=Pe.length+3}const ce=Y.channels,de=new Array(g.channels);for(let Pe=0;Pe<g.channels;++Pe){const Ie=de[Pe]={},Xe=ce[Pe];Ie.name=Xe.name,Ie.compression=0,Ie.decoded=!1,Ie.type=Xe.pixelType,Ie.pLinear=Xe.pLinear,Ie.width=g.width,Ie.height=g.lines}const se={idx:new Array(3)};for(let Pe=0;Pe<g.channels;++Pe){const Ie=de[Pe];for(let Xe=0;Xe<H.length;++Xe){const Ye=H[Xe];Ie.name==Ye.name&&(Ie.compression=Ye.compression,Ye.index>=0&&(se.idx[Ye.index]=Pe),Ie.offset=Pe)}}let re,he,Ce;if(j.acCompressedSize>0)switch(j.acCompression){case 0:re=new Uint16Array(j.totalAcUncompressedCount),Ge(g.array,M,C,j.acCompressedSize,re,j.totalAcUncompressedCount);break;case 1:const Pe=g.array.slice(C.value,C.value+j.totalAcUncompressedCount),Ie=kr(Pe);re=new Uint16Array(Ie.buffer),C.value+=j.totalAcUncompressedCount;break}if(j.dcCompressedSize>0){const Pe={array:g.array,offset:C,size:j.dcCompressedSize};he=new Uint16Array(pe(Pe).buffer),C.value+=j.dcCompressedSize}if(j.rleRawSize>0){const Pe=g.array.slice(C.value,C.value+j.rleCompressedSize),Ie=kr(Pe);Ce=Tt(Ie.buffer),C.value+=j.rleCompressedSize}let Ee=0;const ze=new Array(de.length);for(let Pe=0;Pe<ze.length;++Pe)ze[Pe]=new Array;for(let Pe=0;Pe<g.lines;++Pe)for(let Ie=0;Ie<de.length;++Ie)ze[Ie].push(Ee),Ee+=de[Ie].width*g.type*2;vt(se,ze,de,re,he,U);for(let Pe=0;Pe<de.length;++Pe){const Ie=de[Pe];if(!Ie.decoded)switch(Ie.compression){case 2:let Xe=0,Ye=0;for(let et=0;et<g.lines;++et){let It=ze[Pe][Xe];for(let qe=0;qe<Ie.width;++qe){for(let Ze=0;Ze<2*Ie.type;++Ze)U[It++]=Ce[Ye+Ze*Ie.width*Ie.height];Ye++}Xe++}break;case 1:default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(U.buffer)}function D(g,M){const C=new Uint8Array(g);let U=0;for(;C[M.value+U]!=0;)U+=1;const j=new TextDecoder().decode(C.slice(M.value,M.value+U));return M.value=M.value+U+1,j}function V(g,M,C){const U=new TextDecoder().decode(new Uint8Array(g).slice(M.value,M.value+C));return M.value=M.value+C,U}function Me(g,M){const C=Ae(g,M),U=we(g,M);return[C,U]}function _e(g,M){const C=we(g,M),U=we(g,M);return[C,U]}function Ae(g,M){const C=g.getInt32(M.value,!0);return M.value=M.value+4,C}function we(g,M){const C=g.getUint32(M.value,!0);return M.value=M.value+4,C}function De(g,M){const C=g[M.value];return M.value=M.value+1,C}function We(g,M){const C=g.getUint8(M.value);return M.value=M.value+1,C}const Be=function(g,M){let C;return"getBigInt64"in DataView.prototype?C=Number(g.getBigInt64(M.value,!0)):C=g.getUint32(M.value+4,!0)+Number(g.getUint32(M.value,!0)<<32),M.value+=8,C};function He(g,M){const C=g.getFloat32(M.value,!0);return M.value+=4,C}function z(g,M){return Sc.toHalfFloat(He(g,M))}function k(g){const M=(g&31744)>>10,C=g&1023;return(g>>15?-1:1)*(M?M===31?C?NaN:1/0:Math.pow(2,M-15)*(1+C/1024):6103515625e-14*(C/1024))}function le(g,M){const C=g.getUint16(M.value,!0);return M.value+=2,C}function Se(g,M){return k(le(g,M))}function Re(g,M,C,U){const j=C.value,H=[];for(;C.value<j+U-1;){const ne=D(M,C),ce=Ae(g,C),de=We(g,C);C.value+=3;const se=Ae(g,C),re=Ae(g,C);H.push({name:ne,pixelType:ce,pLinear:de,xSampling:se,ySampling:re})}return C.value+=1,H}function st(g,M){const C=He(g,M),U=He(g,M),j=He(g,M),H=He(g,M),ne=He(g,M),ce=He(g,M),de=He(g,M),se=He(g,M);return{redX:C,redY:U,greenX:j,greenY:H,blueX:ne,blueY:ce,whiteX:de,whiteY:se}}function wt(g,M){const C=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],U=We(g,M);return C[U]}function Dt(g,M){const C=we(g,M),U=we(g,M),j=we(g,M),H=we(g,M);return{xMin:C,yMin:U,xMax:j,yMax:H}}function rn(g,M){const C=["INCREASING_Y"],U=We(g,M);return C[U]}function mt(g,M){const C=He(g,M),U=He(g,M);return[C,U]}function Kt(g,M){const C=He(g,M),U=He(g,M),j=He(g,M);return[C,U,j]}function on(g,M,C,U,j){if(U==="string"||U==="stringvector"||U==="iccProfile")return V(M,C,j);if(U==="chlist")return Re(g,M,C,j);if(U==="chromaticities")return st(g,C);if(U==="compression")return wt(g,C);if(U==="box2i")return Dt(g,C);if(U==="lineOrder")return rn(g,C);if(U==="float")return He(g,C);if(U==="v2f")return mt(g,C);if(U==="v3f")return Kt(g,C);if(U==="int")return Ae(g,C);if(U==="rational")return Me(g,C);if(U==="timecode")return _e(g,C);if(U==="preview")return C.value+=j,"skipped";C.value+=j}function so(g,M,C){const U={};if(g.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.");U.version=g.getUint8(4);const j=g.getUint8(5);U.spec={singleTile:!!(j&2),longName:!!(j&4),deepFormat:!!(j&8),multiPart:!!(j&16)},C.value=8;let H=!0;for(;H;){const ne=D(M,C);if(ne==0)H=!1;else{const ce=D(M,C),de=we(g,C),se=on(g,M,C,ce,de);se===void 0?console.warn(`EXRLoader.parse: skipped unknown header attribute type '${ce}'.`):U[ne]=se}}if((j&-5)!=0)throw console.error("EXRHeader:",U),new Error("THREE.EXRLoader: provided file is currently unsupported.");return U}function ro(g,M,C,U,j){const H={size:0,viewer:M,array:C,offset:U,width:g.dataWindow.xMax-g.dataWindow.xMin+1,height:g.dataWindow.yMax-g.dataWindow.yMin+1,channels:g.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:g.channels[0].pixelType,uncompress:null,getter:null,format:null,encoding:null};switch(g.compression){case"NO_COMPRESSION":H.lines=1,H.uncompress=E;break;case"RLE_COMPRESSION":H.lines=1,H.uncompress=J;break;case"ZIPS_COMPRESSION":H.lines=1,H.uncompress=pe;break;case"ZIP_COMPRESSION":H.lines=16,H.uncompress=pe;break;case"PIZ_COMPRESSION":H.lines=32,H.uncompress=me;break;case"PXR24_COMPRESSION":H.lines=16,H.uncompress=ye;break;case"DWAA_COMPRESSION":H.lines=32,H.uncompress=Ne;break;case"DWAB_COMPRESSION":H.lines=256,H.uncompress=Ne;break;default:throw new Error("EXRLoader.parse: "+g.compression+" is unsupported")}if(H.scanlineBlockSize=H.lines,H.type==1)switch(j){case En:H.getter=Se,H.inputSize=2;break;case fn:H.getter=le,H.inputSize=2;break}else if(H.type==2)switch(j){case En:H.getter=He,H.inputSize=4;break;case fn:H.getter=z,H.inputSize=4}else throw new Error("EXRLoader.parse: unsupported pixelType "+H.type+" for "+g.compression+".");H.blockCount=(g.dataWindow.yMax+1)/H.scanlineBlockSize;for(let ce=0;ce<H.blockCount;ce++)Be(M,U);H.outputChannels=H.channels==3?4:H.channels;const ne=H.width*H.height*H.outputChannels;switch(j){case En:H.byteArray=new Float32Array(ne),H.channels<H.outputChannels&&H.byteArray.fill(1,0,ne);break;case fn:H.byteArray=new Uint16Array(ne),H.channels<H.outputChannels&&H.byteArray.fill(15360,0,ne);break;default:console.error("THREE.EXRLoader: unsupported type: ",j);break}return H.bytesPerLine=H.width*H.inputSize*H.channels,H.outputChannels==4?(H.format=sn,H.encoding=ni):(H.format=lh,H.encoding=ni),H}const Oi=new DataView(e),A=new Uint8Array(e),X={value:0},Y=so(Oi,e,X),N=ro(Y,Oi,A,X,this.type),Q={value:0},Fe={R:0,G:1,B:2,A:3,Y:0};for(let g=0;g<N.height/N.scanlineBlockSize;g++){const M=we(Oi,X);N.size=we(Oi,X),N.lines=M+N.scanlineBlockSize>N.height?N.height-M:N.scanlineBlockSize;const U=N.size<N.lines*N.bytesPerLine?N.uncompress(N):E(N);X.value+=N.size;for(let j=0;j<N.scanlineBlockSize;j++){const H=j+g*N.scanlineBlockSize;if(H>=N.height)break;for(let ne=0;ne<N.channels;ne++){const ce=Fe[Y.channels[ne].name];for(let de=0;de<N.width;de++){Q.value=(j*(N.channels*N.width)+ne*N.width+de)*N.inputSize;const se=(N.height-1-H)*(N.width*N.outputChannels)+de*N.outputChannels+ce;N.byteArray[se]=N.getter(U,Q)}}}}return{header:Y,width:N.width,height:N.height,data:N.byteArray,format:N.format,encoding:N.encoding,type:this.type}}setDataType(e){return this.type=e,this}load(e,t,n,i){function s(o,a){o.encoding=a.encoding,o.minFilter=ut,o.magFilter=ut,o.generateMipmaps=!1,o.flipY=!1,t&&t(o,a)}return super.load(e,s,n,i)}}class $h extends ge{constructor(e,t={}){const i=[e.isCubeTexture?"#define ENVMAP_TYPE_CUBE":""],s=`
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
        `,a={map:{value:e},height:{value:t.height||15},radius:{value:t.radius||100}},l=new Da(1,16),c=new ii({uniforms:a,fragmentShader:o,vertexShader:s,side:Sn});super(l,c)}set radius(e){this.material.uniforms.radius.value=e}get radius(){return this.material.uniforms.radius.value}set height(e){this.material.uniforms.height.value=e}get height(){return this.material.uniforms.height.value}}const Xo=new WeakMap;class za extends Fi{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){const s=new ar(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,o=>{this.parse(o,t,i)},n,i)}parse(e,t,n){this.decodeDracoFile(e,t,null,null,hn).catch(n)}decodeDracoFile(e,t,n,i,s=_s){const o={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:s};return this.decodeGeometry(e,o).then(t)}decodeGeometry(e,t){const n=JSON.stringify(t);if(Xo.has(e)){const l=Xo.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i;const s=this.workerNextTaskID++,o=e.byteLength,a=this._getWorker(s,o).then(l=>(i=l,new Promise((c,h)=>{i._callbacks[s]={resolve:c,reject:h},i.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return a.catch(()=>!0).then(()=>{i&&s&&this._releaseTask(i,s)}),Xo.set(e,{key:n,promise:a}),a}_createGeometry(e){const t=new Rt;e.index&&t.setIndex(new kt(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const i=e.attributes[n],s=i.name,o=i.array,a=i.itemSize,l=new kt(o,a);s==="color"&&this._assignVertexColorSpace(l,i.vertexColorSpace),t.setAttribute(s,l)}return t}_assignVertexColorSpace(e,t){if(t!==hn)return;const n=new ke;for(let i=0,s=e.count;i<s;i++)n.fromBufferAttribute(e,i).convertSRGBToLinear(),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new ar(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,s)=>{n.load(e,i,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const s=px.toString(),o=["/* draco decoder */",i,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([o]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(s){const o=s.data;switch(o.type){case"decode":i._callbacks[o.id].resolve(o);break;case"error":i._callbacks[o.id].reject(o);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+o.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,s){return i._taskLoad>s._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function px(){let r,e;onmessage=function(o){const a=o.data;switch(a.type){case"init":r=a.decoderConfig,e=new Promise(function(h){r.onModuleLoaded=function(u){h({draco:u})},DracoDecoderModule(r)});break;case"decode":const l=a.buffer,c=a.taskConfig;e.then(h=>{const u=h.draco,d=new u.Decoder;try{const m=t(u,d,new Int8Array(l),c),x=m.attributes.map(p=>p.array.buffer);m.index&&x.push(m.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:m},x)}catch(m){console.error(m),self.postMessage({type:"error",id:a.id,error:m.message})}finally{u.destroy(d)}});break}};function t(o,a,l,c){const h=c.attributeIDs,u=c.attributeTypes;let d,m;const x=a.GetEncodedGeometryType(l);if(x===o.TRIANGULAR_MESH)d=new o.Mesh,m=a.DecodeArrayToMesh(l,l.byteLength,d);else if(x===o.POINT_CLOUD)d=new o.PointCloud,m=a.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!m.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+m.error_msg());const p={index:null,attributes:[]};for(const f in h){const _=self[u[f]];let b,v;if(c.useUniqueIDs)v=h[f],b=a.GetAttributeByUniqueId(d,v);else{if(v=a.GetAttributeId(d,o[h[f]]),v===-1)continue;b=a.GetAttribute(d,v)}const y=i(o,a,d,f,_,b);f==="color"&&(y.vertexColorSpace=c.vertexColorSpace),p.attributes.push(y)}return x===o.TRIANGULAR_MESH&&(p.index=n(o,a,d)),o.destroy(d),p}function n(o,a,l){const h=l.num_faces()*3,u=h*4,d=o._malloc(u);a.GetTrianglesUInt32Array(l,u,d);const m=new Uint32Array(o.HEAPF32.buffer,d,h).slice();return o._free(d),{array:m,itemSize:1}}function i(o,a,l,c,h,u){const d=u.num_components(),x=l.num_points()*d,p=x*h.BYTES_PER_ELEMENT,f=s(o,h),_=o._malloc(p);a.GetAttributeDataArrayForAllPoints(l,u,f,p,_);const b=new h(o.HEAPF32.buffer,_,x).slice();return o._free(_),{name:c,array:b,itemSize:d}}function s(o,a){switch(a){case Float32Array:return o.DT_FLOAT32;case Int8Array:return o.DT_INT8;case Int16Array:return o.DT_INT16;case Int32Array:return o.DT_INT32;case Uint8Array:return o.DT_UINT8;case Uint16Array:return o.DT_UINT16;case Uint32Array:return o.DT_UINT32}}}const Dc={type:"change"},jo={type:"start"},Ic={type:"end"};class Ba extends Ni{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ui.ROTATE,MIDDLE:Ui.DOLLY,RIGHT:Ui.PAN},this.touches={ONE:ki.ROTATE,TWO:ki.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(D){D.addEventListener("keydown",Pt),this._domElementKeyEvents=D},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Pt),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Dc),n.update(),s=i.NONE},this.update=function(){const D=new P,V=new Mt().setFromUnitVectors(e.up,new P(0,1,0)),Me=V.clone().invert(),_e=new P,Ae=new Mt,we=2*Math.PI;return function(){const We=n.object.position;D.copy(We).sub(n.target),D.applyQuaternion(V),a.setFromVector3(D),n.autoRotate&&s===i.NONE&&T(I()),n.enableDamping?(a.theta+=l.theta*n.dampingFactor,a.phi+=l.phi*n.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let Be=n.minAzimuthAngle,He=n.maxAzimuthAngle;return isFinite(Be)&&isFinite(He)&&(Be<-Math.PI?Be+=we:Be>Math.PI&&(Be-=we),He<-Math.PI?He+=we:He>Math.PI&&(He-=we),Be<=He?a.theta=Math.max(Be,Math.min(He,a.theta)):a.theta=a.theta>(Be+He)/2?Math.max(Be,a.theta):Math.min(He,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),a.radius*=c,a.radius=Math.max(n.minDistance,Math.min(n.maxDistance,a.radius)),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),D.setFromSpherical(a),D.applyQuaternion(Me),We.copy(n.target).add(D),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0)),c=1,u||_e.distanceToSquared(n.object.position)>o||8*(1-Ae.dot(n.object.quaternion))>o?(n.dispatchEvent(Dc),_e.copy(n.object.position),Ae.copy(n.object.quaternion),u=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",J),n.domElement.removeEventListener("pointerdown",_t),n.domElement.removeEventListener("pointercancel",yt),n.domElement.removeEventListener("wheel",Wt),n.domElement.removeEventListener("pointermove",Tt),n.domElement.removeEventListener("pointerup",vt),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Pt),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=i.NONE;const o=1e-6,a=new bc,l=new bc;let c=1;const h=new P;let u=!1;const d=new Ue,m=new Ue,x=new Ue,p=new Ue,f=new Ue,_=new Ue,b=new Ue,v=new Ue,y=new Ue,S=[],R={};function I(){return 2*Math.PI/60/60*n.autoRotateSpeed}function w(){return Math.pow(.95,n.zoomSpeed)}function T(D){l.theta-=D}function F(D){l.phi-=D}const K=function(){const D=new P;return function(Me,_e){D.setFromMatrixColumn(_e,0),D.multiplyScalar(-Me),h.add(D)}}(),$=function(){const D=new P;return function(Me,_e){n.screenSpacePanning===!0?D.setFromMatrixColumn(_e,1):(D.setFromMatrixColumn(_e,0),D.crossVectors(n.object.up,D)),D.multiplyScalar(Me),h.add(D)}}(),B=function(){const D=new P;return function(Me,_e){const Ae=n.domElement;if(n.object.isPerspectiveCamera){const we=n.object.position;D.copy(we).sub(n.target);let De=D.length();De*=Math.tan(n.object.fov/2*Math.PI/180),K(2*Me*De/Ae.clientHeight,n.object.matrix),$(2*_e*De/Ae.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(K(Me*(n.object.right-n.object.left)/n.object.zoom/Ae.clientWidth,n.object.matrix),$(_e*(n.object.top-n.object.bottom)/n.object.zoom/Ae.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function O(D){n.object.isPerspectiveCamera?c/=D:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*D)),n.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function q(D){n.object.isPerspectiveCamera?c*=D:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/D)),n.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ee(D){d.set(D.clientX,D.clientY)}function oe(D){b.set(D.clientX,D.clientY)}function Z(D){p.set(D.clientX,D.clientY)}function ie(D){m.set(D.clientX,D.clientY),x.subVectors(m,d).multiplyScalar(n.rotateSpeed);const V=n.domElement;T(2*Math.PI*x.x/V.clientHeight),F(2*Math.PI*x.y/V.clientHeight),d.copy(m),n.update()}function te(D){v.set(D.clientX,D.clientY),y.subVectors(v,b),y.y>0?O(w()):y.y<0&&q(w()),b.copy(v),n.update()}function Te(D){f.set(D.clientX,D.clientY),_.subVectors(f,p).multiplyScalar(n.panSpeed),B(_.x,_.y),p.copy(f),n.update()}function G(D){D.deltaY<0?q(w()):D.deltaY>0&&O(w()),n.update()}function ae(D){let V=!1;switch(D.code){case n.keys.UP:D.ctrlKey||D.metaKey||D.shiftKey?F(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(0,n.keyPanSpeed),V=!0;break;case n.keys.BOTTOM:D.ctrlKey||D.metaKey||D.shiftKey?F(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(0,-n.keyPanSpeed),V=!0;break;case n.keys.LEFT:D.ctrlKey||D.metaKey||D.shiftKey?T(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(n.keyPanSpeed,0),V=!0;break;case n.keys.RIGHT:D.ctrlKey||D.metaKey||D.shiftKey?T(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(-n.keyPanSpeed,0),V=!0;break}V&&(D.preventDefault(),n.update())}function fe(){if(S.length===1)d.set(S[0].pageX,S[0].pageY);else{const D=.5*(S[0].pageX+S[1].pageX),V=.5*(S[0].pageY+S[1].pageY);d.set(D,V)}}function W(){if(S.length===1)p.set(S[0].pageX,S[0].pageY);else{const D=.5*(S[0].pageX+S[1].pageX),V=.5*(S[0].pageY+S[1].pageY);p.set(D,V)}}function ue(){const D=S[0].pageX-S[1].pageX,V=S[0].pageY-S[1].pageY,Me=Math.sqrt(D*D+V*V);b.set(0,Me)}function ve(){n.enableZoom&&ue(),n.enablePan&&W()}function be(){n.enableZoom&&ue(),n.enableRotate&&fe()}function Le(D){if(S.length==1)m.set(D.pageX,D.pageY);else{const Me=Ne(D),_e=.5*(D.pageX+Me.x),Ae=.5*(D.pageY+Me.y);m.set(_e,Ae)}x.subVectors(m,d).multiplyScalar(n.rotateSpeed);const V=n.domElement;T(2*Math.PI*x.x/V.clientHeight),F(2*Math.PI*x.y/V.clientHeight),d.copy(m)}function Oe(D){if(S.length===1)f.set(D.pageX,D.pageY);else{const V=Ne(D),Me=.5*(D.pageX+V.x),_e=.5*(D.pageY+V.y);f.set(Me,_e)}_.subVectors(f,p).multiplyScalar(n.panSpeed),B(_.x,_.y),p.copy(f)}function Ge(D){const V=Ne(D),Me=D.pageX-V.x,_e=D.pageY-V.y,Ae=Math.sqrt(Me*Me+_e*_e);v.set(0,Ae),y.set(0,Math.pow(v.y/b.y,n.zoomSpeed)),O(y.y),b.copy(v)}function je(D){n.enableZoom&&Ge(D),n.enablePan&&Oe(D)}function Ke(D){n.enableZoom&&Ge(D),n.enableRotate&&Le(D)}function _t(D){n.enabled!==!1&&(S.length===0&&(n.domElement.setPointerCapture(D.pointerId),n.domElement.addEventListener("pointermove",Tt),n.domElement.addEventListener("pointerup",vt)),pe(D),D.pointerType==="touch"?L(D):ct(D))}function Tt(D){n.enabled!==!1&&(D.pointerType==="touch"?E(D):it(D))}function vt(D){me(D),S.length===0&&(n.domElement.releasePointerCapture(D.pointerId),n.domElement.removeEventListener("pointermove",Tt),n.domElement.removeEventListener("pointerup",vt)),n.dispatchEvent(Ic),s=i.NONE}function yt(D){me(D)}function ct(D){let V;switch(D.button){case 0:V=n.mouseButtons.LEFT;break;case 1:V=n.mouseButtons.MIDDLE;break;case 2:V=n.mouseButtons.RIGHT;break;default:V=-1}switch(V){case Ui.DOLLY:if(n.enableZoom===!1)return;oe(D),s=i.DOLLY;break;case Ui.ROTATE:if(D.ctrlKey||D.metaKey||D.shiftKey){if(n.enablePan===!1)return;Z(D),s=i.PAN}else{if(n.enableRotate===!1)return;ee(D),s=i.ROTATE}break;case Ui.PAN:if(D.ctrlKey||D.metaKey||D.shiftKey){if(n.enableRotate===!1)return;ee(D),s=i.ROTATE}else{if(n.enablePan===!1)return;Z(D),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(jo)}function it(D){switch(s){case i.ROTATE:if(n.enableRotate===!1)return;ie(D);break;case i.DOLLY:if(n.enableZoom===!1)return;te(D);break;case i.PAN:if(n.enablePan===!1)return;Te(D);break}}function Wt(D){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(D.preventDefault(),n.dispatchEvent(jo),G(D),n.dispatchEvent(Ic))}function Pt(D){n.enabled===!1||n.enablePan===!1||ae(D)}function L(D){switch(ye(D),S.length){case 1:switch(n.touches.ONE){case ki.ROTATE:if(n.enableRotate===!1)return;fe(),s=i.TOUCH_ROTATE;break;case ki.PAN:if(n.enablePan===!1)return;W(),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case ki.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ve(),s=i.TOUCH_DOLLY_PAN;break;case ki.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;be(),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(jo)}function E(D){switch(ye(D),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;Le(D),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;Oe(D),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;je(D),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ke(D),n.update();break;default:s=i.NONE}}function J(D){n.enabled!==!1&&D.preventDefault()}function pe(D){S.push(D)}function me(D){delete R[D.pointerId];for(let V=0;V<S.length;V++)if(S[V].pointerId==D.pointerId){S.splice(V,1);return}}function ye(D){let V=R[D.pointerId];V===void 0&&(V=new Ue,R[D.pointerId]=V),V.set(D.pageX,D.pageY)}function Ne(D){const V=D.pointerId===S[0].pointerId?S[1]:S[0];return R[V.pointerId]}n.domElement.addEventListener("contextmenu",J),n.domElement.addEventListener("pointerdown",_t),n.domElement.addEventListener("pointercancel",yt),n.domElement.addEventListener("wheel",Wt,{passive:!1}),this.update()}}const bi=new no,Jt=new P,di=new P,ft=new Mt,Nc={X:new P(1,0,0),Y:new P(0,1,0),Z:new P(0,0,1)},qo={type:"change"},Fc={type:"mouseDown"},Oc={type:"mouseUp",mode:null},Uc={type:"objectChange"};class Ha extends lt{constructor(e,t){super(),t===void 0&&(console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.'),t=document),this.isTransformControls=!0,this.visible=!1,this.domElement=t,this.domElement.style.touchAction="none";const n=new yx;this._gizmo=n,this.add(n);const i=new wx;this._plane=i,this.add(i);const s=this;function o(b,v){let y=v;Object.defineProperty(s,b,{get:function(){return y!==void 0?y:v},set:function(S){y!==S&&(y=S,i[b]=S,n[b]=S,s.dispatchEvent({type:b+"-changed",value:S}),s.dispatchEvent(qo))}}),s[b]=v,i[b]=v,n[b]=v}o("camera",e),o("object",void 0),o("enabled",!0),o("axis",null),o("mode","translate"),o("translationSnap",null),o("rotationSnap",null),o("scaleSnap",null),o("space","world"),o("size",1),o("dragging",!1),o("showX",!0),o("showY",!0),o("showZ",!0);const a=new P,l=new P,c=new Mt,h=new Mt,u=new P,d=new Mt,m=new P,x=new P,p=new P,f=0,_=new P;o("worldPosition",a),o("worldPositionStart",l),o("worldQuaternion",c),o("worldQuaternionStart",h),o("cameraPosition",u),o("cameraQuaternion",d),o("pointStart",m),o("pointEnd",x),o("rotationAxis",p),o("rotationAngle",f),o("eye",_),this._offset=new P,this._startNorm=new P,this._endNorm=new P,this._cameraScale=new P,this._parentPosition=new P,this._parentQuaternion=new Mt,this._parentQuaternionInv=new Mt,this._parentScale=new P,this._worldScaleStart=new P,this._worldQuaternionInv=new Mt,this._worldScale=new P,this._positionStart=new P,this._quaternionStart=new Mt,this._scaleStart=new P,this._getPointer=mx.bind(this),this._onPointerDown=_x.bind(this),this._onPointerHover=gx.bind(this),this._onPointerMove=xx.bind(this),this._onPointerUp=vx.bind(this),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp)}updateMatrixWorld(){this.object!==void 0&&(this.object.updateMatrixWorld(),this.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):this.object.parent.matrixWorld.decompose(this._parentPosition,this._parentQuaternion,this._parentScale),this.object.matrixWorld.decompose(this.worldPosition,this.worldQuaternion,this._worldScale),this._parentQuaternionInv.copy(this._parentQuaternion).invert(),this._worldQuaternionInv.copy(this.worldQuaternion).invert()),this.camera.updateMatrixWorld(),this.camera.matrixWorld.decompose(this.cameraPosition,this.cameraQuaternion,this._cameraScale),this.camera.isOrthographicCamera?this.camera.getWorldDirection(this.eye).negate():this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(),super.updateMatrixWorld(this)}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;bi.setFromCamera(e,this.camera);const t=$o(this._gizmo.picker[this.mode],bi);t?this.axis=t.object.name:this.axis=null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e.button!==0)&&this.axis!==null){bi.setFromCamera(e,this.camera);const t=$o(this._plane,bi,!0);t&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(t.point).sub(this.worldPositionStart)),this.dragging=!0,Fc.mode=this.mode,this.dispatchEvent(Fc)}}pointerMove(e){const t=this.axis,n=this.mode,i=this.object;let s=this.space;if(n==="scale"?s="local":(t==="E"||t==="XYZE"||t==="XYZ")&&(s="world"),i===void 0||t===null||this.dragging===!1||e.button!==-1)return;bi.setFromCamera(e,this.camera);const o=$o(this._plane,bi,!0);if(!!o){if(this.pointEnd.copy(o.point).sub(this.worldPositionStart),n==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),s==="local"&&t!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),t.indexOf("X")===-1&&(this._offset.x=0),t.indexOf("Y")===-1&&(this._offset.y=0),t.indexOf("Z")===-1&&(this._offset.z=0),s==="local"&&t!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),i.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(s==="local"&&(i.position.applyQuaternion(ft.copy(this._quaternionStart).invert()),t.search("X")!==-1&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.position.applyQuaternion(this._quaternionStart)),s==="world"&&(i.parent&&i.position.add(Jt.setFromMatrixPosition(i.parent.matrixWorld)),t.search("X")!==-1&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.parent&&i.position.sub(Jt.setFromMatrixPosition(i.parent.matrixWorld))));else if(n==="scale"){if(t.search("XYZ")!==-1){let a=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(a*=-1),di.set(a,a,a)}else Jt.copy(this.pointStart),di.copy(this.pointEnd),Jt.applyQuaternion(this._worldQuaternionInv),di.applyQuaternion(this._worldQuaternionInv),di.divide(Jt),t.search("X")===-1&&(di.x=1),t.search("Y")===-1&&(di.y=1),t.search("Z")===-1&&(di.z=1);i.scale.copy(this._scaleStart).multiply(di),this.scaleSnap&&(t.search("X")!==-1&&(i.scale.x=Math.round(i.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Y")!==-1&&(i.scale.y=Math.round(i.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Z")!==-1&&(i.scale.z=Math.round(i.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(n==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const a=20/this.worldPosition.distanceTo(Jt.setFromMatrixPosition(this.camera.matrixWorld));t==="E"?(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1):t==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(Jt.copy(this.rotationAxis).cross(this.eye))*a):(t==="X"||t==="Y"||t==="Z")&&(this.rotationAxis.copy(Nc[t]),Jt.copy(Nc[t]),s==="local"&&Jt.applyQuaternion(this.worldQuaternion),this.rotationAngle=this._offset.dot(Jt.cross(this.eye).normalize())*a),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),s==="local"&&t!=="E"&&t!=="XYZE"?(i.quaternion.copy(this._quaternionStart),i.quaternion.multiply(ft.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),i.quaternion.copy(ft.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),i.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(qo),this.dispatchEvent(Uc)}}pointerUp(e){e.button===0&&(this.dragging&&this.axis!==null&&(Oc.mode=this.mode,this.dispatchEvent(Oc)),this.dragging=!1,this.axis=null)}dispose(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}attach(e){return this.object=e,this.visible=!0,this}detach(){return this.object=void 0,this.visible=!1,this.axis=null,this}reset(){!this.enabled||this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(qo),this.dispatchEvent(Uc),this.pointStart.copy(this.pointEnd))}getRaycaster(){return bi}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}}function mx(r){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:r.button};{const e=this.domElement.getBoundingClientRect();return{x:(r.clientX-e.left)/e.width*2-1,y:-(r.clientY-e.top)/e.height*2+1,button:r.button}}}function gx(r){if(!!this.enabled)switch(r.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(r));break}}function _x(r){!this.enabled||(document.pointerLockElement||this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(r)),this.pointerDown(this._getPointer(r)))}function xx(r){!this.enabled||this.pointerMove(this._getPointer(r))}function vx(r){!this.enabled||(this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(r)))}function $o(r,e,t){const n=e.intersectObject(r,!0);for(let i=0;i<n.length;i++)if(n[i].object.visible||t)return n[i];return!1}const zr=new hr,rt=new P(0,1,0),kc=new P(0,0,0),zc=new $e,Br=new Mt,Wr=new Mt,Pn=new P,Bc=new $e,Vs=new P(1,0,0),Ti=new P(0,1,0),Ws=new P(0,0,1),Hr=new P,zs=new P,Bs=new P;class yx extends lt{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const e=new Un({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),t=new Jr({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),n=e.clone();n.opacity=.15;const i=t.clone();i.opacity=.5;const s=e.clone();s.color.setHex(16711680);const o=e.clone();o.color.setHex(65280);const a=e.clone();a.color.setHex(255);const l=e.clone();l.color.setHex(16711680),l.opacity=.5;const c=e.clone();c.color.setHex(65280),c.opacity=.5;const h=e.clone();h.color.setHex(255),h.opacity=.5;const u=e.clone();u.opacity=.25;const d=e.clone();d.color.setHex(16776960),d.opacity=.25,e.clone().color.setHex(16776960);const x=e.clone();x.color.setHex(7895160);const p=new Nt(0,.04,.1,12);p.translate(0,.05,0);const f=new gt(.08,.08,.08);f.translate(0,.04,0);const _=new Rt;_.setAttribute("position",new pt([0,0,0,1,0,0],3));const b=new Nt(.0075,.0075,.5,3);b.translate(0,.25,0);function v(q,ee){const oe=new Ci(q,.0075,3,64,ee*Math.PI*2);return oe.rotateY(Math.PI/2),oe.rotateX(Math.PI/2),oe}function y(){const q=new Rt;return q.setAttribute("position",new pt([0,0,0,1,1,1],3)),q}const S={X:[[new ge(p,s),[.5,0,0],[0,0,-Math.PI/2]],[new ge(p,s),[-.5,0,0],[0,0,Math.PI/2]],[new ge(b,s),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new ge(p,o),[0,.5,0]],[new ge(p,o),[0,-.5,0],[Math.PI,0,0]],[new ge(b,o)]],Z:[[new ge(p,a),[0,0,.5],[Math.PI/2,0,0]],[new ge(p,a),[0,0,-.5],[-Math.PI/2,0,0]],[new ge(b,a),null,[Math.PI/2,0,0]]],XYZ:[[new ge(new rs(.1,0),u.clone()),[0,0,0]]],XY:[[new ge(new gt(.15,.15,.01),h.clone()),[.15,.15,0]]],YZ:[[new ge(new gt(.15,.15,.01),l.clone()),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ge(new gt(.15,.15,.01),c.clone()),[.15,0,.15],[-Math.PI/2,0,0]]]},R={X:[[new ge(new Nt(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new ge(new Nt(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new ge(new Nt(.2,0,.6,4),n),[0,.3,0]],[new ge(new Nt(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new ge(new Nt(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new ge(new Nt(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new ge(new rs(.2,0),n)]],XY:[[new ge(new gt(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new ge(new gt(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ge(new gt(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]]},I={START:[[new ge(new rs(.01,2),i),null,null,null,"helper"]],END:[[new ge(new rs(.01,2),i),null,null,null,"helper"]],DELTA:[[new yn(y(),i),null,null,null,"helper"]],X:[[new yn(_,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new yn(_,i.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new yn(_,i.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},w={XYZE:[[new ge(v(.5,1),x),null,[0,Math.PI/2,0]]],X:[[new ge(v(.5,.5),s)]],Y:[[new ge(v(.5,.5),o),null,[0,0,-Math.PI/2]]],Z:[[new ge(v(.5,.5),a),null,[0,Math.PI/2,0]]],E:[[new ge(v(.75,1),d),null,[0,Math.PI/2,0]]]},T={AXIS:[[new yn(_,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]]},F={XYZE:[[new ge(new Ss(.25,10,8),n)]],X:[[new ge(new Ci(.5,.1,4,24),n),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new ge(new Ci(.5,.1,4,24),n),[0,0,0],[Math.PI/2,0,0]]],Z:[[new ge(new Ci(.5,.1,4,24),n),[0,0,0],[0,0,-Math.PI/2]]],E:[[new ge(new Ci(.75,.1,2,24),n)]]},K={X:[[new ge(f,s),[.5,0,0],[0,0,-Math.PI/2]],[new ge(b,s),[0,0,0],[0,0,-Math.PI/2]],[new ge(f,s),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new ge(f,o),[0,.5,0]],[new ge(b,o)],[new ge(f,o),[0,-.5,0],[0,0,Math.PI]]],Z:[[new ge(f,a),[0,0,.5],[Math.PI/2,0,0]],[new ge(b,a),[0,0,0],[Math.PI/2,0,0]],[new ge(f,a),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new ge(new gt(.15,.15,.01),h),[.15,.15,0]]],YZ:[[new ge(new gt(.15,.15,.01),l),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ge(new gt(.15,.15,.01),c),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new ge(new gt(.1,.1,.1),u.clone())]]},$={X:[[new ge(new Nt(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new ge(new Nt(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new ge(new Nt(.2,0,.6,4),n),[0,.3,0]],[new ge(new Nt(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new ge(new Nt(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new ge(new Nt(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new ge(new gt(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new ge(new gt(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ge(new gt(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new ge(new gt(.2,.2,.2),n),[0,0,0]]]},B={X:[[new yn(_,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new yn(_,i.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new yn(_,i.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function O(q){const ee=new lt;for(const oe in q)for(let Z=q[oe].length;Z--;){const ie=q[oe][Z][0].clone(),te=q[oe][Z][1],Te=q[oe][Z][2],G=q[oe][Z][3],ae=q[oe][Z][4];ie.name=oe,ie.tag=ae,te&&ie.position.set(te[0],te[1],te[2]),Te&&ie.rotation.set(Te[0],Te[1],Te[2]),G&&ie.scale.set(G[0],G[1],G[2]),ie.updateMatrix();const fe=ie.geometry.clone();fe.applyMatrix4(ie.matrix),ie.geometry=fe,ie.renderOrder=1/0,ie.position.set(0,0,0),ie.rotation.set(0,0,0),ie.scale.set(1,1,1),ee.add(ie)}return ee}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=O(S)),this.add(this.gizmo.rotate=O(w)),this.add(this.gizmo.scale=O(K)),this.add(this.picker.translate=O(R)),this.add(this.picker.rotate=O(F)),this.add(this.picker.scale=O($)),this.add(this.helper.translate=O(I)),this.add(this.helper.rotate=O(T)),this.add(this.helper.scale=O(B)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){const n=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:Wr;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let i=[];i=i.concat(this.picker[this.mode].children),i=i.concat(this.gizmo[this.mode].children),i=i.concat(this.helper[this.mode].children);for(let s=0;s<i.length;s++){const o=i[s];o.visible=!0,o.rotation.set(0,0,0),o.position.copy(this.worldPosition);let a;if(this.camera.isOrthographicCamera?a=(this.camera.top-this.camera.bottom)/this.camera.zoom:a=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),o.scale.set(1,1,1).multiplyScalar(a*this.size/4),o.tag==="helper"){o.visible=!1,o.name==="AXIS"?(o.visible=!!this.axis,this.axis==="X"&&(ft.setFromEuler(zr.set(0,0,0)),o.quaternion.copy(n).multiply(ft),Math.abs(rt.copy(Vs).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Y"&&(ft.setFromEuler(zr.set(0,0,Math.PI/2)),o.quaternion.copy(n).multiply(ft),Math.abs(rt.copy(Ti).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Z"&&(ft.setFromEuler(zr.set(0,Math.PI/2,0)),o.quaternion.copy(n).multiply(ft),Math.abs(rt.copy(Ws).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="XYZE"&&(ft.setFromEuler(zr.set(0,Math.PI/2,0)),rt.copy(this.rotationAxis),o.quaternion.setFromRotationMatrix(zc.lookAt(kc,rt,Ti)),o.quaternion.multiply(ft),o.visible=this.dragging),this.axis==="E"&&(o.visible=!1)):o.name==="START"?(o.position.copy(this.worldPositionStart),o.visible=this.dragging):o.name==="END"?(o.position.copy(this.worldPosition),o.visible=this.dragging):o.name==="DELTA"?(o.position.copy(this.worldPositionStart),o.quaternion.copy(this.worldQuaternionStart),Jt.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),Jt.applyQuaternion(this.worldQuaternionStart.clone().invert()),o.scale.copy(Jt),o.visible=this.dragging):(o.quaternion.copy(n),this.dragging?o.position.copy(this.worldPositionStart):o.position.copy(this.worldPosition),this.axis&&(o.visible=this.axis.search(o.name)!==-1));continue}o.quaternion.copy(n),this.mode==="translate"||this.mode==="scale"?(o.name==="X"&&Math.abs(rt.copy(Vs).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Y"&&Math.abs(rt.copy(Ti).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Z"&&Math.abs(rt.copy(Ws).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XY"&&Math.abs(rt.copy(Ws).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="YZ"&&Math.abs(rt.copy(Vs).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XZ"&&Math.abs(rt.copy(Ti).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1)):this.mode==="rotate"&&(Br.copy(n),rt.copy(this.eye).applyQuaternion(ft.copy(n).invert()),o.name.search("E")!==-1&&o.quaternion.setFromRotationMatrix(zc.lookAt(this.eye,kc,Ti)),o.name==="X"&&(ft.setFromAxisAngle(Vs,Math.atan2(-rt.y,rt.z)),ft.multiplyQuaternions(Br,ft),o.quaternion.copy(ft)),o.name==="Y"&&(ft.setFromAxisAngle(Ti,Math.atan2(rt.x,rt.z)),ft.multiplyQuaternions(Br,ft),o.quaternion.copy(ft)),o.name==="Z"&&(ft.setFromAxisAngle(Ws,Math.atan2(rt.y,rt.x)),ft.multiplyQuaternions(Br,ft),o.quaternion.copy(ft))),o.visible=o.visible&&(o.name.indexOf("X")===-1||this.showX),o.visible=o.visible&&(o.name.indexOf("Y")===-1||this.showY),o.visible=o.visible&&(o.name.indexOf("Z")===-1||this.showZ),o.visible=o.visible&&(o.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),o.material._color=o.material._color||o.material.color.clone(),o.material._opacity=o.material._opacity||o.material.opacity,o.material.color.copy(o.material._color),o.material.opacity=o.material._opacity,this.enabled&&this.axis&&(o.name===this.axis||this.axis.split("").some(function(l){return o.name===l}))&&(o.material.color.setHex(16776960),o.material.opacity=1)}super.updateMatrixWorld(e)}}class wx extends ge{constructor(){super(new bs(1e5,1e5,2,2),new Un({visible:!1,wireframe:!0,side:Sn,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(e){let t=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(t="local"),Hr.copy(Vs).applyQuaternion(t==="local"?this.worldQuaternion:Wr),zs.copy(Ti).applyQuaternion(t==="local"?this.worldQuaternion:Wr),Bs.copy(Ws).applyQuaternion(t==="local"?this.worldQuaternion:Wr),rt.copy(zs),this.mode){case"translate":case"scale":switch(this.axis){case"X":rt.copy(this.eye).cross(Hr),Pn.copy(Hr).cross(rt);break;case"Y":rt.copy(this.eye).cross(zs),Pn.copy(zs).cross(rt);break;case"Z":rt.copy(this.eye).cross(Bs),Pn.copy(Bs).cross(rt);break;case"XY":Pn.copy(Bs);break;case"YZ":Pn.copy(Hr);break;case"XZ":rt.copy(Bs),Pn.copy(zs);break;case"XYZ":case"E":Pn.set(0,0,0);break}break;case"rotate":default:Pn.set(0,0,0)}Pn.length()===0?this.quaternion.copy(this.cameraQuaternion):(Bc.lookAt(Jt.set(0,0,0),Pn,rt),this.quaternion.setFromRotationMatrix(Bc)),super.updateMatrixWorld(e)}}function bx(r,e,t){e.traverse(n=>{n.material&&(r.properties.remove(n.material),n.material.dispose())}),r.info.programs.length=0,r.compile(e,t)}const Hc=({focus:r=0,size:e=25,samples:t=10}={})=>{const n=Ve.shadowmap_pars_fragment;return Ve.shadowmap_pars_fragment=Ve.shadowmap_pars_fragment.replace("#ifdef USE_SHADOWMAP",`#ifdef USE_SHADOWMAP

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
#if defined( SHADOWMAP_TYPE_PCF )`),(i,s,o)=>{Ve.shadowmap_pars_fragment=n,bx(i,s,o)}};function Yh(r,e,t,n){const i=class extends ii{constructor(o={}){const a=Object.entries(r);super({uniforms:a.reduce((l,[c,h])=>{const u=bh.clone({[c]:{value:h}});return{...l,...u}},{}),vertexShader:e,fragmentShader:t}),this.key="",a.forEach(([l])=>Object.defineProperty(this,l,{get:()=>this.uniforms[l].value,set:c=>this.uniforms[l].value=c})),Object.assign(this,o),n&&n(this)}};return i.key=is.generateUUID(),i}const Mx=Yh({},"void main() { }","void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");class Sx extends si{constructor(e=6,t=!1){super(),this.uniforms={chromaticAberration:{value:.05},transmission:{value:0},_transmission:{value:1},transmissionMap:{value:null},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new ke("white")},anisotropy:{value:.1},time:{value:0},distortion:{value:0},distortionScale:{value:.5},temporalDistortion:{value:0},buffer:{value:null}},this.onBeforeCompile=n=>{n.uniforms={...n.uniforms,...this.uniforms},t?n.defines.USE_SAMPLER="":n.defines.USE_TRANSMISSION="",n.fragmentShader=`
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
              // Attenuation distance is +\u221E, i.e. the transmitted color is not attenuated at all.
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
`)},Object.keys(this.uniforms).forEach(n=>Object.defineProperty(this,n,{get:()=>this.uniforms[n].value,set:i=>this.uniforms[n].value=i}))}}new URL("assets/monkey.e0de9627.glb",location.href).href;var Zh=new URL("assets/porsche_911_1975.f7d7be92.glb",location.href).href,Ex="./assets/ulmer_muenster_1k.f1744c79.exr",Tx="./assets/ulmer_muenster.c72270fe.webp",Ax="./assets/wide_street_01_1k.48a1baf6.exr",Cx="./assets/wide_street_01.bd1bff94.webp",Lx="./assets/wide_street_02_1k.e164254f.exr",Rx="./assets/wide_street_02.b0d1a0ff.webp",Px="./assets/kloppenheim_02_1k.3bfc9f61.exr",Dx="./assets/kloppenheim_02.b7800856.webp";const io={ulmer_muenster:{exr:Ex,webP:Tx,sunPos:[17,14,12],sunCol:"#ffffeb",shadowOpacity:.72,groundProj:{radius:25,height:2}},wide_street1:{exr:Ax,webP:Cx,sunPos:[15,24,11],sunCol:"#ffffeb",shadowOpacity:.85,groundProj:{radius:12,height:2}},wide_street2:{exr:Lx,webP:Rx,sunPos:[16,8,12],sunCol:"#ffffeb",shadowOpacity:.55,groundProj:{radius:25,height:2}},kloppenheim:{exr:Px,webP:Dx}};let fa,Ht,Mn,Vt,Dn,Ks,xn,pa=new Ue;const Mi={environment:io.ulmer_muenster,groundProjection:!0,bgColor:new ke,printCam:()=>{}},lr=new Tn,Ix=new eo,Nx=new ka,Kh=new Ua,Jh=new za;let wn;Jh.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");Kh.setDRACOLoader(Jh);const Gc=new no,Ji=[];let Qh=()=>{},jr,Vc;async function Fx(r){Ks=r,jr=Ks.addFolder("Scene"),fa=new wa,app.appendChild(fa.dom),Ht=new ur({antialias:!0}),Ht.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),Ht.setSize(window.innerWidth,window.innerHeight),Ht.shadowMap.enabled=!0,Ht.shadowMap.type=Li,Ht.outputEncoding=Je,Ht.toneMapping=$r,Vc=new sr(Ht),Vc.compileCubemapShader(),app.appendChild(Ht.domElement),Mn=new Ot(50,window.innerWidth/window.innerHeight,.1,200),Mn.position.set(6,3,6),Mn.name="Camera",Mn.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),Vt=new La,Vt.add(lr),Dn=new Ba(Mn,Ht.domElement),Dn.enableDamping=!0,Dn.dampingFactor=.05,Dn.minDistance=.1,Dn.maxDistance=100,Dn.maxPolarAngle=Math.PI/1.5,Dn.target.set(0,0,0),Dn.target.set(0,0,0),wn=new Ha(Mn,Ht.domElement),wn.addEventListener("dragging-changed",t=>{Dn.enabled=!t.value,t.value}),wn.addEventListener("change",()=>{wn.object&&wn.object.position.y<0&&(wn.object.position.y=0)}),Vt.add(wn),window.addEventListener("resize",Ux),document.addEventListener("pointermove",Wc);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",t=>{Date.now()-e<200&&(Wc(t),zx())}),jr.add(wn,"mode",["translate","rotate","scale"]),Ox(),await Bx(),eu()}async function Ox(){let r=new Tn,e=new Na(16777195,1);e.name="Dir. Light",e.castShadow=!0,e.shadow.camera.near=.1,e.shadow.camera.far=50,e.shadow.camera.right=15,e.shadow.camera.left=-15,e.shadow.camera.top=15,e.shadow.camera.bottom=-15,e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.radius=1.95,e.shadow.blurSamples=6,e.shadow.bias=-5e-4,r.add(e),Vt.add(r);const t=new ge(new bs(10,10).rotateX(-Math.PI/2),new X0({}));t.name="shadowFloor",t.receiveShadow=!0,t.position.set(0,0,0),Vt.add(t);function n(s){if(!s){Vt.background=null,Vt.environment=null;return}s.exr&&Nx.load(s.exr,o=>{o.mapping=fs,Vt.environment=o}),s.webP&&Ix.load(s.webP,o=>{o.mapping=fs,o.encoding=Je,Vt.background=o,Mi.groundProjection&&i(Mi.environment)}),s.sunPos?(e.visible=!0,e.position.fromArray(s.sunPos)):e.visible=!1,s.sunCol?e.color.set(s.sunCol):e.color.set(16777215),s.shadowOpacity&&(t.material.opacity=s.shadowOpacity)}function i(s){Mi.groundProjection&&Vt.background&&s.groundProj?(xn||(xn=new $h(Vt.background),xn.scale.setScalar(100)),xn.material.uniforms.map.value=Vt.background,xn.radius=s.groundProj.radius,xn.height=s.groundProj.height,xn.parent||Vt.add(xn)):xn&&xn.parent&&xn.removeFromParent()}n(Mi.environment),jr.add(Mi,"environment",io).onChange(s=>{n(s)}),jr.add(Mi,"groundProjection").onChange(s=>{i(Mi.environment)})}function Ux(){Mn.aspect=window.innerWidth/window.innerHeight,Mn.updateProjectionMatrix(),Ht.setSize(window.innerWidth,window.innerHeight)}function kx(){fa.update(),Dn.update(),Qh(),Ht.render(Vt,Mn)}function eu(){requestAnimationFrame(eu),kx()}function zx(){if(Gc.setFromCamera(pa,Mn),Gc.intersectObject(lr,!0,Ji),!Ji.length){wn.detach();return}Ji[0].object.selectOnRaycast?wn.attach(Ji[0].object.selectOnRaycast):wn.attach(Ji[0].object),Ji.length=0}function Wc(r){pa.x=r.clientX/window.innerWidth*2-1,pa.y=-(r.clientY/window.innerHeight)*2+1}async function Bx(){const r=new ge(new Ss(.5).translate(0,.5,0),new Bn({color:Xc(),roughness:0,metalness:1}));r.name="sphere",r.castShadow=!0,r.receiveShadow=!0,r.position.set(2,0,-1.5),lr.add(r);const e=new ge(new gt(1,1,1).translate(0,.5,0),new Bn({color:Xc(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),lr.add(e),Hx()}async function Hx(){const r={default:"def",physical:"phy",transmission:"tra"},e={carMaterial:r.default},t={renderEachMesh:!1,enabled:!1,customBackground:Vt.background,backside:!0,thickness:1,backsideThickness:.5},n=[],s=(await Kh.loadAsync(Zh)).scene;s.name="car";let o;const a=new Mx,l=new Sx(6,!1),c=new si({roughness:0,transmission:1,thickness:1});s.traverse(y=>{if(y.isMesh){y.castShadow=!0,y.receiveShadow=!0,y.selectOnRaycast=s;const S=y.material;n.push({material:S,mesh:y,physical:c,transmission:l}),y.name==="body"&&(o=y)}}),lr.add(s),Ks.add(e,"carMaterial",r).onChange(y=>{for(const S of n)y===r.default&&(S.mesh.material=S.material,t.enabled=!1),y===r.physical&&(S.mesh.material=S.physical,t.enabled=!1),y===r.transmission&&(S.mesh.material=S.transmission,t.enabled=!0)}),Gx(Ks,c),Vx(Ks,l,t);const h=new Hn(512,512,{minFilter:ut,magFilter:ut,encoding:Ht.outputEncoding,type:fn}),u=new Hn(512,512,{minFilter:ut,magFilter:ut,encoding:Ht.outputEncoding,type:fn}),d=l;d.buffer=u.texture;let m,x,p;const f={gl:Ht,scene:Vt,camera:Mn};let _;const b=[{mesh:o,mat:l}],v=new h_(!0);Qh=()=>{if(!!t.enabled){d.time=v.getElapsedTime(),t.renderEachMesh?_=n:_=b;for(let y=0;y<_.length;y++){const S=n[y].mesh;d.buffer===u.texture&&(x=f.gl.toneMapping,m=f.scene.background,p=S.material.side,f.gl.toneMapping=zn,t.background&&(f.scene.background=t.background),S.material=a,t.backside&&(f.gl.setRenderTarget(h),f.gl.render(f.scene,f.camera),S.material=d,S.material.buffer=h.texture,S.material.thickness=t.backsideThickness,S.material.side=en),f.gl.setRenderTarget(u),f.gl.render(f.scene,f.camera),S.material.thickness=t.thickness,S.material.side=p,S.material.buffer=u.texture,f.scene.background=m,f.gl.setRenderTarget(null),S.material=d,f.gl.toneMapping=x)}}}}function Gx(r,e){const t=r.addFolder("Physical Material");t.addColor(e,"color"),t.addColor(e,"attenuationColor"),t.add(e,"attenuationDistance",0,2),t.add(e,"roughness",0,1),t.add(e,"transmission",0,1),t.add(e,"thickness",0,2),t.add(e,"reflectivity",0,1)}function Vx(r,e,t){const n=r.addFolder("Transmission Material");n.add(t,"enabled").name("Rendering Enabled").listen(),n.add(t,"backside"),n.add(t,"thickness",0,2),n.add(t,"backsideThickness",0,2),n.addColor(e,"color"),n.addColor(e,"attenuationColor"),n.add(e,"_transmission",0,1),n.add(e,"attenuationDistance",0,2),n.add(e,"roughness",0,1),n.add(e,"chromaticAberration",0,2),n.add(e,"distortion",0,10),n.add(e,"temporalDistortion",0,1),n.add(e,"anisotropy",0,10),n.add(e,"reflectivity",0,1),n.add(t,"renderEachMesh").name("\u26A0 Render Each Mesh separately")}const Wx=new ke;function Xc(){return"#"+Wx.setHSL(Math.random(),.5,.5).getHexString()}var Xx=new URL("assets/room.afeffddc.glb",location.href).href;let ma,ln,On,ts,In,jc,ga=new Ue;new ke;const Js=new Tn;new eo;new ka;const tu=new Ua,nu=new za;let bn;nu.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");tu.setDRACOLoader(nu);const qc=new no,Qi=[];let $c,Yc;async function jx(r){jc=r,$c=jc.addFolder("Scene"),ma=new wa,app.appendChild(ma.dom),ln=new ur({antialias:!0}),ln.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),ln.setSize(window.innerWidth,window.innerHeight),ln.shadowMap.enabled=!0,ln.outputEncoding=Je,ln.toneMapping=$r,Yc=new sr(ln),Yc.compileCubemapShader(),app.appendChild(ln.domElement),On=new Ot(50,window.innerWidth/window.innerHeight,.1,200),On.position.set(6,3,6),On.name="Camera",On.position.set(2.0404140991899564,2.644387886134694,3.8683136783076355),ts=new La,ts.add(Js),In=new Ba(On,ln.domElement),In.enableDamping=!0,In.dampingFactor=.05,In.minDistance=.1,In.maxDistance=100,In.maxPolarAngle=Math.PI/1.5,In.target.set(0,0,0),In.target.set(0,0,0),bn=new Ha(On,ln.domElement),bn.addEventListener("dragging-changed",i=>{In.enabled=!i.value,i.value}),bn.addEventListener("change",()=>{bn.object&&bn.object.position.y<0&&(bn.object.position.y=0)}),ts.add(bn),window.addEventListener("resize",qx),document.addEventListener("pointermove",Zc);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",i=>{Date.now()-e<200&&(Zc(i),Yx())}),$c.add(bn,"mode",["translate","rotate","scale"]),Hc({size:35,focus:.5,samples:16}),console.log(Hc);let t=new Na(16777195,5);t.name="Dir. Light",t.castShadow=!0,t.shadow.camera.near=.1,t.shadow.camera.far=50,t.shadow.camera.right=8.5,t.shadow.camera.left=-8.5,t.shadow.camera.top=8.5,t.shadow.camera.bottom=-8.5,t.shadow.mapSize.width=2048,t.shadow.mapSize.height=2048,t.shadow.bias=-.001,t.position.set(5,5,-8),ts.add(t);const n=new zh;ts.add(n),await Zx(),iu()}function qx(){On.aspect=window.innerWidth/window.innerHeight,On.updateProjectionMatrix(),ln.setSize(window.innerWidth,window.innerHeight)}function $x(){ma.update(),In.update(),ln.render(ts,On)}function iu(){requestAnimationFrame(iu),$x()}function Yx(){if(qc.setFromCamera(ga,On),qc.intersectObject(Js,!0,Qi),!Qi.length){bn.detach();return}Qi[0].object.selectOnRaycast?bn.attach(Qi[0].object.selectOnRaycast):bn.attach(Qi[0].object),Qi.length=0}function Zc(r){ga.x=r.clientX/window.innerWidth*2-1,ga.y=-(r.clientY/window.innerHeight)*2+1}async function Zx(){const r=new ge(new Ss(.5).translate(0,.5,0),new Bn({color:Kc(),roughness:0,metalness:1}));r.name="sphere",r.castShadow=!0,r.receiveShadow=!0,r.position.set(2,0,-1.5),Js.add(r);const e=new ge(new gt(1,1,1).translate(0,.5,0),new Bn({color:Kc(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),Js.add(e);const n=(await tu.loadAsync(Xx)).scene;n.name="room",n.scale.setScalar(.5),n.position.set(0,-1,0),n.traverse(i=>{i.isMesh&&(i.castShadow=!0,i.receiveShadow=!0,i.selectOnRaycast=n,i.name==="Object_13"&&(console.log("FOUND",i),i.material.opacity=.5,i.material.transparent=!0,i.castShadow=!1,i.receiveShadow=!1))}),Js.add(n)}const Kx=new ke;function Kc(){return"#"+Kx.setHSL(Math.random(),.5,.5).getHexString()}const Jx=Yh({depth:null,opacity:1,attenuation:2.5,anglePower:12,spotPosition:new P(0,0,0),lightColor:new ke("white"),cameraNear:0,cameraFar:1,resolution:new Ue(0,0),transparent:!0,depthWrite:!1},`
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
  }`);var Qs={Linear:{None:function(r){return r}},Quadratic:{In:function(r){return r*r},Out:function(r){return r*(2-r)},InOut:function(r){return(r*=2)<1?.5*r*r:-.5*(--r*(r-2)-1)}},Cubic:{In:function(r){return r*r*r},Out:function(r){return--r*r*r+1},InOut:function(r){return(r*=2)<1?.5*r*r*r:.5*((r-=2)*r*r+2)}},Quartic:{In:function(r){return r*r*r*r},Out:function(r){return 1- --r*r*r*r},InOut:function(r){return(r*=2)<1?.5*r*r*r*r:-.5*((r-=2)*r*r*r-2)}},Quintic:{In:function(r){return r*r*r*r*r},Out:function(r){return--r*r*r*r*r+1},InOut:function(r){return(r*=2)<1?.5*r*r*r*r*r:.5*((r-=2)*r*r*r*r+2)}},Sinusoidal:{In:function(r){return 1-Math.cos(r*Math.PI/2)},Out:function(r){return Math.sin(r*Math.PI/2)},InOut:function(r){return .5*(1-Math.cos(Math.PI*r))}},Exponential:{In:function(r){return r===0?0:Math.pow(1024,r-1)},Out:function(r){return r===1?1:1-Math.pow(2,-10*r)},InOut:function(r){return r===0?0:r===1?1:(r*=2)<1?.5*Math.pow(1024,r-1):.5*(-Math.pow(2,-10*(r-1))+2)}},Circular:{In:function(r){return 1-Math.sqrt(1-r*r)},Out:function(r){return Math.sqrt(1- --r*r)},InOut:function(r){return(r*=2)<1?-.5*(Math.sqrt(1-r*r)-1):.5*(Math.sqrt(1-(r-=2)*r)+1)}},Elastic:{In:function(r){return r===0?0:r===1?1:-Math.pow(2,10*(r-1))*Math.sin((r-1.1)*5*Math.PI)},Out:function(r){return r===0?0:r===1?1:Math.pow(2,-10*r)*Math.sin((r-.1)*5*Math.PI)+1},InOut:function(r){return r===0?0:r===1?1:(r*=2,r<1?-.5*Math.pow(2,10*(r-1))*Math.sin((r-1.1)*5*Math.PI):.5*Math.pow(2,-10*(r-1))*Math.sin((r-1.1)*5*Math.PI)+1)}},Back:{In:function(r){var e=1.70158;return r*r*((e+1)*r-e)},Out:function(r){var e=1.70158;return--r*r*((e+1)*r+e)+1},InOut:function(r){var e=2.5949095;return(r*=2)<1?.5*(r*r*((e+1)*r-e)):.5*((r-=2)*r*((e+1)*r+e)+2)}},Bounce:{In:function(r){return 1-Qs.Bounce.Out(1-r)},Out:function(r){return r<1/2.75?7.5625*r*r:r<2/2.75?7.5625*(r-=1.5/2.75)*r+.75:r<2.5/2.75?7.5625*(r-=2.25/2.75)*r+.9375:7.5625*(r-=2.625/2.75)*r+.984375},InOut:function(r){return r<.5?Qs.Bounce.In(r*2)*.5:Qs.Bounce.Out(r*2-1)*.5+.5}}},Xs;typeof self=="undefined"&&typeof process!="undefined"&&process.hrtime?Xs=function(){var r=process.hrtime();return r[0]*1e3+r[1]/1e6}:typeof self!="undefined"&&self.performance!==void 0&&self.performance.now!==void 0?Xs=self.performance.now.bind(self.performance):Date.now!==void 0?Xs=Date.now:Xs=function(){return new Date().getTime()};var ns=Xs,Qx=function(){function r(){this._tweens={},this._tweensAddedDuringUpdate={}}return r.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(t){return e._tweens[t]})},r.prototype.removeAll=function(){this._tweens={}},r.prototype.add=function(e){this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e},r.prototype.remove=function(e){delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]},r.prototype.update=function(e,t){e===void 0&&(e=ns()),t===void 0&&(t=!1);var n=Object.keys(this._tweens);if(n.length===0)return!1;for(;n.length>0;){this._tweensAddedDuringUpdate={};for(var i=0;i<n.length;i++){var s=this._tweens[n[i]],o=!t;s&&s.update(e,o)===!1&&!t&&delete this._tweens[n[i]]}n=Object.keys(this._tweensAddedDuringUpdate)}return!0},r}(),js={Linear:function(r,e){var t=r.length-1,n=t*e,i=Math.floor(n),s=js.Utils.Linear;return e<0?s(r[0],r[1],n):e>1?s(r[t],r[t-1],t-n):s(r[i],r[i+1>t?t:i+1],n-i)},Bezier:function(r,e){for(var t=0,n=r.length-1,i=Math.pow,s=js.Utils.Bernstein,o=0;o<=n;o++)t+=i(1-e,n-o)*i(e,o)*r[o]*s(n,o);return t},CatmullRom:function(r,e){var t=r.length-1,n=t*e,i=Math.floor(n),s=js.Utils.CatmullRom;return r[0]===r[t]?(e<0&&(i=Math.floor(n=t*(1+e))),s(r[(i-1+t)%t],r[i],r[(i+1)%t],r[(i+2)%t],n-i)):e<0?r[0]-(s(r[0],r[0],r[1],r[1],-n)-r[0]):e>1?r[t]-(s(r[t],r[t],r[t-1],r[t-1],n-t)-r[t]):s(r[i?i-1:0],r[i],r[t<i+1?t:i+1],r[t<i+2?t:i+2],n-i)},Utils:{Linear:function(r,e,t){return(e-r)*t+r},Bernstein:function(r,e){var t=js.Utils.Factorial;return t(r)/t(e)/t(r-e)},Factorial:function(){var r=[1];return function(e){var t=1;if(r[e])return r[e];for(var n=e;n>1;n--)t*=n;return r[e]=t,t}}(),CatmullRom:function(r,e,t,n,i){var s=(t-r)*.5,o=(n-e)*.5,a=i*i,l=i*a;return(2*e-2*t+s+o)*l+(-3*e+3*t-2*s-o)*a+s*i+e}}},su=function(){function r(){}return r.nextId=function(){return r._nextId++},r._nextId=0,r}(),ru=new Qx,ev=function(){function r(e,t){t===void 0&&(t=ru),this._object=e,this._group=t,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=Qs.Linear.None,this._interpolationFunction=js.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._id=su.nextId(),this._isChainStopped=!1,this._goToEnd=!1}return r.prototype.getId=function(){return this._id},r.prototype.isPlaying=function(){return this._isPlaying},r.prototype.isPaused=function(){return this._isPaused},r.prototype.to=function(e,t){return this._valuesEnd=Object.create(e),t!==void 0&&(this._duration=t),this},r.prototype.duration=function(e){return this._duration=e,this},r.prototype.start=function(e){if(this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var t in this._valuesStartRepeat)this._swapEndStartRepeatValues(t),this._valuesStart[t]=this._valuesStartRepeat[t]}return this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e!==void 0?typeof e=="string"?ns()+parseFloat(e):e:ns(),this._startTime+=this._delayTime,this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat),this},r.prototype._setupProperties=function(e,t,n,i){for(var s in n){var o=e[s],a=Array.isArray(o),l=a?"array":typeof o,c=!a&&Array.isArray(n[s]);if(!(l==="undefined"||l==="function")){if(c){var h=n[s];if(h.length===0)continue;h=h.map(this._handleRelativeValue.bind(this,o)),n[s]=[o].concat(h)}if((l==="object"||a)&&o&&!c){t[s]=a?[]:{};for(var u in o)t[s][u]=o[u];i[s]=a?[]:{},this._setupProperties(o,t[s],n[s],i[s])}else typeof t[s]=="undefined"&&(t[s]=o),a||(t[s]*=1),c?i[s]=n[s].slice().reverse():i[s]=t[s]||0}}},r.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},r.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},r.prototype.pause=function(e){return e===void 0&&(e=ns()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this._group&&this._group.remove(this),this)},r.prototype.resume=function(e){return e===void 0&&(e=ns()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},r.prototype.stopChainedTweens=function(){for(var e=0,t=this._chainedTweens.length;e<t;e++)this._chainedTweens[e].stop();return this},r.prototype.group=function(e){return this._group=e,this},r.prototype.delay=function(e){return this._delayTime=e,this},r.prototype.repeat=function(e){return this._initialRepeat=e,this._repeat=e,this},r.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},r.prototype.yoyo=function(e){return this._yoyo=e,this},r.prototype.easing=function(e){return this._easingFunction=e,this},r.prototype.interpolation=function(e){return this._interpolationFunction=e,this},r.prototype.chain=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._chainedTweens=e,this},r.prototype.onStart=function(e){return this._onStartCallback=e,this},r.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},r.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},r.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},r.prototype.onStop=function(e){return this._onStopCallback=e,this},r.prototype.update=function(e,t){if(e===void 0&&(e=ns()),t===void 0&&(t=!0),this._isPaused)return!0;var n,i,s=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(e>s)return!1;t&&this.start(e)}if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),i=(e-this._startTime)/this._duration,i=this._duration===0||i>1?1:i;var o=this._easingFunction(i);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,o),this._onUpdateCallback&&this._onUpdateCallback(this._object,i),i===1)if(this._repeat>0){isFinite(this._repeat)&&this._repeat--;for(n in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[n]=="string"&&(this._valuesStartRepeat[n]=this._valuesStartRepeat[n]+parseFloat(this._valuesEnd[n])),this._yoyo&&this._swapEndStartRepeatValues(n),this._valuesStart[n]=this._valuesStartRepeat[n];return this._yoyo&&(this._reversed=!this._reversed),this._repeatDelayTime!==void 0?this._startTime=e+this._repeatDelayTime:this._startTime=e+this._delayTime,this._onRepeatCallback&&this._onRepeatCallback(this._object),!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var a=0,l=this._chainedTweens.length;a<l;a++)this._chainedTweens[a].start(this._startTime+this._duration);return this._isPlaying=!1,!1}return!0},r.prototype._updateProperties=function(e,t,n,i){for(var s in n)if(t[s]!==void 0){var o=t[s]||0,a=n[s],l=Array.isArray(e[s]),c=Array.isArray(a),h=!l&&c;h?e[s]=this._interpolationFunction(a,i):typeof a=="object"&&a?this._updateProperties(e[s],o,a,i):(a=this._handleRelativeValue(o,a),typeof a=="number"&&(e[s]=o+(a-o)*i))}},r.prototype._handleRelativeValue=function(e,t){return typeof t!="string"?t:t.charAt(0)==="+"||t.charAt(0)==="-"?e+parseFloat(t):parseFloat(t)},r.prototype._swapEndStartRepeatValues=function(e){var t=this._valuesStartRepeat[e],n=this._valuesEnd[e];typeof n=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(n):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=t},r}();su.nextId;var Gn=ru;Gn.getAll.bind(Gn);Gn.removeAll.bind(Gn);Gn.add.bind(Gn);Gn.remove.bind(Gn);var tv=Gn.update.bind(Gn);let _a,Gt,dn,Yt,Nn,xa,vn,va=new Ue;const Hs={environment:io.kloppenheim,groundProjection:!1,bgColor:new ke,printCam:()=>{}},os=new Tn;new eo;const nv=new ka,ou=new Ua,au=new za;let Kn;au.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");ou.setDRACOLoader(au);const Jc=new no,Yo=[];let lu=()=>{},qr,Qc;async function iv(r){xa=r,qr=xa.addFolder("Scene"),_a=new wa,app.appendChild(_a.dom),Gt=new ur({antialias:!0}),Gt.setPixelRatio(Math.min(1.5,window.devicePixelRatio)),Gt.setSize(window.innerWidth,window.innerHeight),Gt.shadowMap.enabled=!0,Gt.shadowMap.type=Li,Gt.outputEncoding=Je,Gt.toneMapping=$r,Qc=new sr(Gt),Qc.compileCubemapShader(),app.appendChild(Gt.domElement),dn=new Ot(50,window.innerWidth/window.innerHeight,.1,200),dn.position.set(-16,16,16),dn.name="Camera",Yt=new La,Yt.add(os),Nn=new Ba(dn,Gt.domElement),Nn.enableDamping=!0,Nn.dampingFactor=.05,Nn.minDistance=.1,Nn.maxDistance=100,Nn.maxPolarAngle=Math.PI/1.5,Nn.target.set(0,0,0),Nn.target.set(0,0,0),Kn=new Ha(dn,Gt.domElement),Kn.addEventListener("dragging-changed",t=>{Nn.enabled=!t.value,t.value}),Kn.addEventListener("change",()=>{Kn.object&&Kn.object.position.y<0&&(Kn.object.position.y=0)}),Yt.add(Kn),window.addEventListener("resize",rv),document.addEventListener("pointermove",eh);let e=Date.now();app.addEventListener("pointerdown",()=>{e=Date.now()}),app.addEventListener("pointerup",t=>{Date.now()-e<200&&(eh(t),av())}),qr.add(Kn,"mode",["translate","rotate","scale"]),sv(),await lv(),cu()}async function sv(){function r(t){if(!t){Yt.background=null,Yt.environment=null;return}t.exr&&nv.load(t.exr,n=>{n.mapping=fs,Yt.environment=n})}function e(t){Hs.groundProjection&&Yt.background&&t.groundProj?(vn||(vn=new $h(Yt.background),vn.scale.setScalar(100)),vn.material.uniforms.map.value=Yt.background,vn.radius=t.groundProj.radius,vn.height=t.groundProj.height,vn.parent||Yt.add(vn)):vn&&vn.parent&&vn.removeFromParent()}r(Hs.environment),qr.add(Hs,"environment",io).onChange(t=>{r(t)}),qr.add(Hs,"groundProjection").onChange(t=>{e(Hs.environment)})}function rv(){dn.aspect=window.innerWidth/window.innerHeight,dn.updateProjectionMatrix(),Gt.setSize(window.innerWidth,window.innerHeight)}function ov(){_a.update(),tv(),lu(),Nn.update(),Gt.render(Yt,dn)}function cu(){requestAnimationFrame(cu),ov()}function av(){Jc.setFromCamera(va,dn),Jc.intersectObject(os,!0,Yo),Yo.length&&(Yo.length=0)}function eh(r){va.x=r.clientX/window.innerWidth*2-1,va.y=-(r.clientY/window.innerHeight)*2+1}async function lv(){const r=new ge(new Ss(.5).translate(0,.5,0),new Bn({color:Zo(),roughness:0,metalness:1}));r.name="sphere",r.castShadow=!0,r.receiveShadow=!0,r.position.set(2,0,-1.5),os.add(r);const e=new ge(new gt(1,1,1).translate(0,.5,0),new Bn({color:Zo(),roughness:0,metalness:1}));e.name="cube",e.castShadow=!0,e.receiveShadow=!0,e.position.set(-2,0,-1.5),os.add(e);const t=new ge(new bs(10,10).rotateX(-Math.PI/2),new Bn({color:Zo(),roughness:.5,metalness:0}));t.name="floor",t.receiveShadow=!0,os.add(t);const i=(await ou.loadAsync(Zh)).scene;i.name="car",i.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0,s.selectOnRaycast=i)}),os.add(i),cv()}function cv(){Yt.add(new zh(16777215,.5));let r=1,e,t,n=16777215,i=5*4,s=.15*4,o=5;const a=new kh;a.intensity=3,a.position.set(5,5,5),a.angle=s,a.color.set(n),a.distance=i,a.castShadow=!0,a.shadow.bias=-1e-4;const l=new y_(a);Yt.add(a);const c=new Jx,h=new Un({transparent:!0,opacity:.25}),u={volumeMaterial:c,basicMaterial:h},[d,m]=uv({size:1024});c.spotPosition=a.position,c.opacity=r,c.lightColor=a.color,c.attenuation=a.distance,c.anglePower=o,c.cameraNear=dn.near,c.cameraFar=dn.far,e=e===void 0?.1:e,t=t===void 0?a.angle*7:t,console.log({volumeMaterial:c});const x=()=>{c.attenuation=a.distance,i=a.distance,t=Math.tan(a.angle)*a.distance,_.geometry=f(i,e,t)},p={materialType:u.volumeMaterial,helper:!1,useDepth:!1,updateVolumeGeometry:x,animateTarget:!1,animateLight:!1},f=(R,I,w)=>{const T=new Nt(I,w,R,128,64,!0);return T.translate(0,-R/2,0),T.rotateX(-Math.PI/2),T},_=new ge(f(i,e,t),c);x(),a.add(_);const b=new P;lu=()=>{_.lookAt(a.target.getWorldPosition(b)),l.parent&&l.update(),p.useDepth&&(c.depth=null,m(),c.depth=d)};const v=th(a.target.position,20,2e3,1e3),y=th(a.position,20,2e3,1e3);function S(R){const I=R.addFolder("SpotLight Volume");I.open(),I.add(p,"materialType",u).onChange(T=>{_.material=T}),I.add(p,"useDepth").onChange(T=>{T?(c.depth=d,c.resolution=Gt.getSize(new Ue)):(c.depth=null,c.resolution=new Ue(0,0))}),I.add(c,"opacity",0,1),I.add(c,"attenuation",0,i),I.add(c,"anglePower",0,Math.PI),I.add(c,"cameraNear",0,10),I.add(c,"cameraFar",0,10);const w=R.addFolder("SpotLight");w.open(),w.add(p,"helper").onChange(T=>{T?Yt.add(l):l.removeFromParent()}),w.addColor(a,"color"),w.add(a,"intensity",0,5),w.add(a,"angle",0,Math.PI/2).onChange(x),w.add(a,"penumbra",0,1),w.add(a,"distance",.1,20).onChange(x),w.add(a.shadow,"bias",-1e-4,1e-4),w.add(p,"animateTarget").name("\u{1F6B2}Animate target").onChange(T=>{T?v.start():v.stop()}),w.add(p,"animateLight").name("\u{1F6B2}Animate light").onChange(T=>{T?y.start():y.stop()})}Kn.attach(a),S(xa)}const hv=new ke;function Zo(){return"#"+hv.setHSL(Math.random(),.5,.5).getHexString()}function uv({size:r=256,frames:e=1/0}={}){const t=Gt,n=r,i=r,s=new Rh(n,i);s.format=_i,s.type=Ma,s.name="use_Depth_Buffer";let o=0;const a=dv(n,i,{depthTexture:s}),l=()=>{(e===1/0||o<e)&&(t.setRenderTarget(a),t.render(Yt,dn),t.setRenderTarget(null),o++)};return[a.depthTexture,l]}function th(r,e,t,n){const i=new ev(r).to({x:is.randFloatSpread(e),z:is.randFloatSpread(e)},t).easing(Qs.Bounce.Out).repeat(1e4).repeatDelay(n).onStart(()=>{s()}).onRepeat(()=>{s(),i.to({x:is.randFloatSpread(6),z:is.randFloatSpread(6)})}),s=()=>{i._valuesStart.x=r.x,i._valuesStart.z=r.z};return i}function dv(r,e,t){const n=Gt,i=r,s=e,o=t,{samples:a=0,depth:l,...c}=o;let h;return h=new Hn(i,s,{minFilter:ut,magFilter:ut,encoding:n.outputEncoding,type:fn,...c}),h.samples=a,h}let fv=window.location.href,pv=new URL(fv);const cr={MeshTransmissionMaterial:Fx,PCSS:jx,WIP_SpotLight:iv},Ii={sceneName:pv.searchParams.get("scene")||Object.keys(cr)[0],sceneInitFunction:()=>{}};function hu(r){console.log({path:r});const e=new URLSearchParams(window.location.search);e.set("scene",r),window.history.replaceState({},"",`${window.location.pathname}?${e}`),document.title=`Test | ${r}`}const uu=new ya({title:"Test Vanilla "+fu,closeFolders:!0});uu.add(Ii,"sceneName",Object.keys(cr)).name("SCENE").onChange(r=>{console.log({v:r}),hu(r),window.location.reload()});Object.keys(cr).includes(Ii.sceneName)||(Ii.sceneName=Object.keys(cr)[0]);Ii.sceneInitFunction=cr[Ii.sceneName];Ii.sceneInitFunction(uu);hu(Ii.sceneName);
