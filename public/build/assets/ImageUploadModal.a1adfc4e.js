import{B as z,r as O,o as $,A as T,e as F,j as B,a as A}from"./app.8f41755a.js";var I={exports:{}};(function(E,L){(function(H,R){E.exports=R(O.exports)})($,H=>(()=>{var R={899:u=>{u.exports=H}},X={};function C(u){var c=X[u];if(c!==void 0)return c.exports;var f=X[u]={exports:{}};return R[u](f,f.exports,C),f.exports}C.n=u=>{var c=u&&u.__esModule?()=>u.default:()=>u;return C.d(c,{a:c}),c},C.d=(u,c)=>{for(var f in c)C.o(c,f)&&!C.o(u,f)&&Object.defineProperty(u,f,{enumerable:!0,get:c[f]})},C.o=(u,c)=>Object.prototype.hasOwnProperty.call(u,c),C.r=u=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(u,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(u,"__esModule",{value:!0})};var S={};return(()=>{C.r(S),C.d(S,{Component:()=>x,areCropsEqual:()=>k,centerCrop:()=>j,clamp:()=>_,containCrop:()=>K,convertToPercentCrop:()=>b,convertToPixelCrop:()=>v,default:()=>x,defaultCrop:()=>P,makeAspectCrop:()=>U,nudgeCrop:()=>N});var u=C(899),c=C.n(u);function f(a){var t,e,o="";if(typeof a=="string"||typeof a=="number")o+=a;else if(typeof a=="object")if(Array.isArray(a))for(t=0;t<a.length;t++)a[t]&&(e=f(a[t]))&&(o&&(o+=" "),o+=e);else for(t in a)a[t]&&(o&&(o+=" "),o+=t);return o}const P={x:0,y:0,width:0,height:0,unit:"px"};function _(a,t,e){return Math.min(Math.max(a,t),e)}function k(a,t){return a.width===t.width&&a.height===t.height&&a.x===t.x&&a.y===t.y&&a.unit===t.unit}function U(a,t,e,o){const r=v(a,e,o);return a.width&&(r.height=r.width/t),a.height&&(r.width=r.height*t),r.y+r.height>o&&(r.height=o-r.y,r.width=r.height*t),r.x+r.width>e&&(r.width=e-r.x,r.height=r.width/t),a.unit==="%"?b(r,e,o):r}function j(a,t,e){const o=v(a,t,e);return o.x=(t-o.width)/2,o.y=(e-o.height)/2,a.unit==="%"?b(o,t,e):o}function b(a,t,e){return a.unit==="%"?{...P,...a,unit:"%"}:{unit:"%",x:a.x?a.x/t*100:0,y:a.y?a.y/e*100:0,width:a.width?a.width/t*100:0,height:a.height?a.height/e*100:0}}function v(a,t,e){return a.unit?a.unit==="px"?{...P,...a,unit:"px"}:{unit:"px",x:a.x?a.x*t/100:0,y:a.y?a.y*e/100:0,width:a.width?a.width*t/100:0,height:a.height?a.height*e/100:0}:{...P,...a,unit:"px"}}function K(a,t,e,o,r,n=0,s=0,g=o,h=r){const i={...a};let l=Math.min(n,o),p=Math.min(s,r),w=Math.min(g,o),d=Math.min(h,r);t&&(t>1?(l=s?s*t:l,p=l/t,w=g*t):(p=n?n/t:p,l=p*t,d=h/t)),i.y<0&&(i.height=Math.max(i.height+i.y,p),i.y=0),i.x<0&&(i.width=Math.max(i.width+i.x,l),i.x=0);const m=o-(i.x+i.width);m<0&&(i.x=Math.min(i.x,o-l),i.width+=m);const y=r-(i.y+i.height);if(y<0&&(i.y=Math.min(i.y,r-p),i.height+=y),i.width<l&&(e!=="sw"&&e!="nw"||(i.x-=l-i.width),i.width=l),i.height<p&&(e!=="nw"&&e!="ne"||(i.y-=p-i.height),i.height=p),i.width>w&&(e!=="sw"&&e!="nw"||(i.x-=w-i.width),i.width=w),i.height>d&&(e!=="nw"&&e!="ne"||(i.y-=d-i.height),i.height=d),t){const Y=i.width/i.height;if(Y<t){const D=Math.max(i.width/t,p);e!=="nw"&&e!="ne"||(i.y-=D-i.height),i.height=D}else if(Y>t){const D=Math.max(i.height*t,l);e!=="sw"&&e!="nw"||(i.x-=D-i.width),i.width=D}}return i}function N(a,t,e,o){const r={...a};return t==="ArrowLeft"?o==="nw"?(r.x-=e,r.y-=e,r.width+=e,r.height+=e):o==="w"?(r.x-=e,r.width+=e):o==="sw"?(r.x-=e,r.width+=e,r.height+=e):o==="ne"?(r.y+=e,r.width-=e,r.height-=e):o==="e"?r.width-=e:o==="se"&&(r.width-=e,r.height-=e):t==="ArrowRight"&&(o==="nw"?(r.x+=e,r.y+=e,r.width-=e,r.height-=e):o==="w"?(r.x+=e,r.width-=e):o==="sw"?(r.x+=e,r.width-=e,r.height-=e):o==="ne"?(r.y-=e,r.width+=e,r.height+=e):o==="e"?r.width+=e:o==="se"&&(r.width+=e,r.height+=e)),t==="ArrowUp"?o==="nw"?(r.x-=e,r.y-=e,r.width+=e,r.height+=e):o==="n"?(r.y-=e,r.height+=e):o==="ne"?(r.y-=e,r.width+=e,r.height+=e):o==="sw"?(r.x+=e,r.width-=e,r.height-=e):o==="s"?r.height-=e:o==="se"&&(r.width-=e,r.height-=e):t==="ArrowDown"&&(o==="nw"?(r.x+=e,r.y+=e,r.width-=e,r.height-=e):o==="n"?(r.y+=e,r.height-=e):o==="ne"?(r.y+=e,r.width-=e,r.height-=e):o==="sw"?(r.x-=e,r.width+=e,r.height+=e):o==="s"?r.height+=e:o==="se"&&(r.width+=e,r.height+=e)),r}const M={capture:!0,passive:!1};class x extends u.PureComponent{constructor(){super(...arguments),this.docMoveBound=!1,this.mouseDownOnCrop=!1,this.dragStarted=!1,this.evData={startClientX:0,startClientY:0,startCropX:0,startCropY:0,clientX:0,clientY:0,isResize:!0},this.componentRef=(0,u.createRef)(),this.mediaRef=(0,u.createRef)(),this.initChangeCalled=!1,this.state={cropIsActive:!1,newCropIsBeingDrawn:!1},this.onCropPointerDown=t=>{const{crop:e,disabled:o}=this.props,r=this.getBox();if(!e)return;const n=v(e,r.width,r.height);if(o)return;t.cancelable&&t.preventDefault(),this.bindDocMove(),this.componentRef.current.focus({preventScroll:!0});const s=t.target.dataset.ord,g=Boolean(s);let h=t.clientX,i=t.clientY,l=n.x,p=n.y;if(s){const w=t.clientX-r.x,d=t.clientY-r.y;let m=0,y=0;s==="ne"||s=="e"?(m=w-(n.x+n.width),y=d-n.y,l=n.x,p=n.y+n.height):s==="se"||s==="s"?(m=w-(n.x+n.width),y=d-(n.y+n.height),l=n.x,p=n.y):s==="sw"||s=="w"?(m=w-n.x,y=d-(n.y+n.height),l=n.x+n.width,p=n.y):s!=="nw"&&s!="n"||(m=w-n.x,y=d-n.y,l=n.x+n.width,p=n.y+n.height),h=l+r.x+m,i=p+r.y+y}this.evData={startClientX:h,startClientY:i,startCropX:l,startCropY:p,clientX:t.clientX,clientY:t.clientY,isResize:g,ord:s},this.mouseDownOnCrop=!0,this.setState({cropIsActive:!0})},this.onComponentPointerDown=t=>{const{crop:e,disabled:o,locked:r,keepSelection:n,onChange:s}=this.props,g=this.getBox();if(o||r||n&&e)return;t.cancelable&&t.preventDefault(),this.bindDocMove(),this.componentRef.current.focus({preventScroll:!0});const h=t.clientX-g.x,i=t.clientY-g.y,l={unit:"px",x:h,y:i,width:0,height:0};this.evData={startClientX:t.clientX,startClientY:t.clientY,startCropX:h,startCropY:i,clientX:t.clientX,clientY:t.clientY,isResize:!0},this.mouseDownOnCrop=!0,s(v(l,g.width,g.height),b(l,g.width,g.height)),this.setState({cropIsActive:!0,newCropIsBeingDrawn:!0})},this.onDocPointerMove=t=>{const{crop:e,disabled:o,onChange:r,onDragStart:n}=this.props,s=this.getBox();if(o||!e||!this.mouseDownOnCrop)return;t.cancelable&&t.preventDefault(),this.dragStarted||(this.dragStarted=!0,n&&n(t));const{evData:g}=this;let h;g.clientX=t.clientX,g.clientY=t.clientY,h=g.isResize?this.resizeCrop():this.dragCrop(),k(e,h)||r(v(h,s.width,s.height),b(h,s.width,s.height))},this.onComponentKeyDown=t=>{const{crop:e,disabled:o,onChange:r,onComplete:n}=this.props,s=this.getBox();if(o)return;const g=t.key;let h=!1;if(!e)return;const i=this.makePixelCrop(),l=(navigator.platform.match("Mac")?t.metaKey:t.ctrlKey)?x.nudgeStepLarge:t.shiftKey?x.nudgeStepMedium:x.nudgeStep;if(g==="ArrowLeft"?(i.x-=l,h=!0):g==="ArrowRight"?(i.x+=l,h=!0):g==="ArrowUp"?(i.y-=l,h=!0):g==="ArrowDown"&&(i.y+=l,h=!0),h){t.cancelable&&t.preventDefault(),i.x=_(i.x,0,s.width-i.width),i.y=_(i.y,0,s.height-i.height);const p=v(i,s.width,s.height),w=b(i,s.width,s.height);r(p,w),n&&n(p,w)}},this.onHandlerKeyDown=(t,e)=>{const{aspect:o=0,crop:r,disabled:n,minWidth:s=0,minHeight:g=0,maxWidth:h,maxHeight:i,onChange:l,onComplete:p}=this.props,w=this.getBox();if(n||!r||t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="ArrowLeft"&&t.key!=="ArrowRight")return;t.stopPropagation(),t.preventDefault();const d=(navigator.platform.match("Mac")?t.metaKey:t.ctrlKey)?x.nudgeStepLarge:t.shiftKey?x.nudgeStepMedium:x.nudgeStep,m=K(N(v(r,w.width,w.height),t.key,d,e),o,e,w.width,w.height,s,g,h,i);if(!k(r,m)){const y=b(m,w.width,w.height);l(m,y),p&&p(m,y)}},this.onDocPointerDone=t=>{const{crop:e,disabled:o,onComplete:r,onDragEnd:n}=this.props,s=this.getBox();this.unbindDocMove(),!o&&e&&this.mouseDownOnCrop&&(this.mouseDownOnCrop=!1,this.dragStarted=!1,n&&n(t),r&&r(v(e,s.width,s.height),b(e,s.width,s.height)),this.setState({cropIsActive:!1,newCropIsBeingDrawn:!1}))},this.onDragFocus=t=>{var e;(e=this.componentRef.current)===null||e===void 0||e.scrollTo(0,0)}}get document(){return document}getBox(){const t=this.mediaRef.current;if(!t)return{x:0,y:0,width:0,height:0};const{x:e,y:o,width:r,height:n}=t.getBoundingClientRect();return{x:e,y:o,width:r,height:n}}componentDidUpdate(t){const{crop:e,onComplete:o}=this.props;if(o&&!t.crop&&e){const{width:r,height:n}=this.getBox();r&&n&&o(v(e,r,n),b(e,r,n))}}componentWillUnmount(){this.resizeObserver&&this.resizeObserver.disconnect()}bindDocMove(){this.docMoveBound||(this.document.addEventListener("pointermove",this.onDocPointerMove,M),this.document.addEventListener("pointerup",this.onDocPointerDone,M),this.document.addEventListener("pointercancel",this.onDocPointerDone,M),this.docMoveBound=!0)}unbindDocMove(){this.docMoveBound&&(this.document.removeEventListener("pointermove",this.onDocPointerMove,M),this.document.removeEventListener("pointerup",this.onDocPointerDone,M),this.document.removeEventListener("pointercancel",this.onDocPointerDone,M),this.docMoveBound=!1)}getCropStyle(){const{crop:t}=this.props;if(t)return{top:`${t.y}${t.unit}`,left:`${t.x}${t.unit}`,width:`${t.width}${t.unit}`,height:`${t.height}${t.unit}`}}dragCrop(){const{evData:t}=this,e=this.getBox(),o=this.makePixelCrop(),r=t.clientX-t.startClientX,n=t.clientY-t.startClientY;return o.x=_(t.startCropX+r,0,e.width-o.width),o.y=_(t.startCropY+n,0,e.height-o.height),o}getPointRegion(t){const{evData:e}=this,o=e.clientX-t.x,r=e.clientY-t.y<e.startCropY;return o<e.startCropX?r?"nw":"sw":r?"ne":"se"}resizeCrop(){const{evData:t}=this,e=this.getBox(),{aspect:o=0,minWidth:r=0,minHeight:n=0,maxWidth:s,maxHeight:g}=this.props,h=this.getPointRegion(e),i=this.makePixelCrop(),l=t.ord?t.ord:h,p=t.clientX-t.startClientX,w=t.clientY-t.startClientY,d={unit:"px",x:0,y:0,width:0,height:0};h==="ne"?(d.x=t.startCropX,d.width=p,o?(d.height=d.width/o,d.y=t.startCropY-d.height):(d.height=Math.abs(w),d.y=t.startCropY-d.height)):h==="se"?(d.x=t.startCropX,d.y=t.startCropY,d.width=p,d.height=o?d.width/o:w):h==="sw"?(d.x=t.startCropX+p,d.y=t.startCropY,d.width=Math.abs(p),d.height=o?d.width/o:w):h==="nw"&&(d.x=t.startCropX+p,d.width=Math.abs(p),o?(d.height=d.width/o,d.y=t.startCropY-d.height):(d.height=Math.abs(w),d.y=t.startCropY+w));const m=K(d,o,h,e.width,e.height,r,n,s,g);return o||x.xyOrds.indexOf(l)>-1?(i.x=m.x,i.y=m.y,i.width=m.width,i.height=m.height):x.xOrds.indexOf(l)>-1?(i.x=m.x,i.width=m.width):x.yOrds.indexOf(l)>-1&&(i.y=m.y,i.height=m.height),i}createCropSelection(){const{ariaLabels:t=x.defaultProps.ariaLabels,disabled:e,locked:o,renderSelectionAddon:r,ruleOfThirds:n,crop:s}=this.props,g=this.getCropStyle();if(s)return c().createElement("div",{style:g,className:"ReactCrop__crop-selection",onPointerDown:this.onCropPointerDown,"aria-label":t.cropArea,tabIndex:0,onKeyDown:this.onComponentKeyDown,role:"group"},!e&&!o&&c().createElement("div",{className:"ReactCrop__drag-elements",onFocus:this.onDragFocus},c().createElement("div",{className:"ReactCrop__drag-bar ord-n","data-ord":"n"}),c().createElement("div",{className:"ReactCrop__drag-bar ord-e","data-ord":"e"}),c().createElement("div",{className:"ReactCrop__drag-bar ord-s","data-ord":"s"}),c().createElement("div",{className:"ReactCrop__drag-bar ord-w","data-ord":"w"}),c().createElement("div",{className:"ReactCrop__drag-handle ord-nw","data-ord":"nw",tabIndex:0,"aria-label":t.nwDragHandle,onKeyDown:h=>this.onHandlerKeyDown(h,"nw"),role:"button"}),c().createElement("div",{className:"ReactCrop__drag-handle ord-n","data-ord":"n",tabIndex:0,"aria-label":t.nDragHandle,onKeyDown:h=>this.onHandlerKeyDown(h,"n"),role:"button"}),c().createElement("div",{className:"ReactCrop__drag-handle ord-ne","data-ord":"ne",tabIndex:0,"aria-label":t.neDragHandle,onKeyDown:h=>this.onHandlerKeyDown(h,"ne"),role:"button"}),c().createElement("div",{className:"ReactCrop__drag-handle ord-e","data-ord":"e",tabIndex:0,"aria-label":t.eDragHandle,onKeyDown:h=>this.onHandlerKeyDown(h,"e"),role:"button"}),c().createElement("div",{className:"ReactCrop__drag-handle ord-se","data-ord":"se",tabIndex:0,"aria-label":t.seDragHandle,onKeyDown:h=>this.onHandlerKeyDown(h,"se"),role:"button"}),c().createElement("div",{className:"ReactCrop__drag-handle ord-s","data-ord":"s",tabIndex:0,"aria-label":t.sDragHandle,onKeyDown:h=>this.onHandlerKeyDown(h,"s"),role:"button"}),c().createElement("div",{className:"ReactCrop__drag-handle ord-sw","data-ord":"sw",tabIndex:0,"aria-label":t.swDragHandle,onKeyDown:h=>this.onHandlerKeyDown(h,"sw"),role:"button"}),c().createElement("div",{className:"ReactCrop__drag-handle ord-w","data-ord":"w",tabIndex:0,"aria-label":t.wDragHandle,onKeyDown:h=>this.onHandlerKeyDown(h,"w"),role:"button"})),r&&c().createElement("div",{className:"ReactCrop__selection-addon",onMouseDown:h=>h.stopPropagation()},r(this.state)),n&&c().createElement(c().Fragment,null,c().createElement("div",{className:"ReactCrop__rule-of-thirds-hz"}),c().createElement("div",{className:"ReactCrop__rule-of-thirds-vt"})))}makePixelCrop(){const t={...P,...this.props.crop||{}},e=this.getBox();return v(t,e.width,e.height)}render(){const{aspect:t,children:e,circularCrop:o,className:r,crop:n,disabled:s,locked:g,style:h,ruleOfThirds:i}=this.props,{cropIsActive:l,newCropIsBeingDrawn:p}=this.state,w=n?this.createCropSelection():null,d=function(){for(var m,y,Y=0,D="";Y<arguments.length;)(m=arguments[Y++])&&(y=f(m))&&(D&&(D+=" "),D+=y);return D}("ReactCrop",r,{"ReactCrop--active":l,"ReactCrop--disabled":s,"ReactCrop--locked":g,"ReactCrop--new-crop":p,"ReactCrop--fixed-aspect":n&&t,"ReactCrop--circular-crop":n&&o,"ReactCrop--rule-of-thirds":n&&i,"ReactCrop--invisible-crop":!this.dragStarted&&n&&!n.width&&!n.height});return c().createElement("div",{ref:this.componentRef,className:d,style:h},c().createElement("div",{ref:this.mediaRef,className:"ReactCrop__child-wrapper",onPointerDown:this.onComponentPointerDown},e),w)}}x.xOrds=["e","w"],x.yOrds=["n","s"],x.xyOrds=["nw","ne","se","sw"],x.nudgeStep=1,x.nudgeStepMedium=10,x.nudgeStepLarge=100,x.defaultProps={ariaLabels:{cropArea:"Use the arrow keys to move the crop selection area",nwDragHandle:"Use the arrow keys to move the north west drag handle to change the crop selection area",nDragHandle:"Use the up and down arrow keys to move the north drag handle to change the crop selection area",neDragHandle:"Use the arrow keys to move the north east drag handle to change the crop selection area",eDragHandle:"Use the up and down arrow keys to move the east drag handle to change the crop selection area",seDragHandle:"Use the arrow keys to move the south east drag handle to change the crop selection area",sDragHandle:"Use the up and down arrow keys to move the south drag handle to change the crop selection area",swDragHandle:"Use the arrow keys to move the south west drag handle to change the crop selection area",wDragHandle:"Use the up and down arrow keys to move the west drag handle to change the crop selection area"}}})(),S})())})(I);const W=z(I.exports);function G({image:E,setData:L}){const{classNames:H,trans:R,getThumb:X,getLocalized:C}=O.exports.useContext(T);F(c=>c);const[S,u]=O.exports.useState({aspect:16/9});return B("div",{className:"flex flex-1 border-2 border-black w-full h-full",children:[A(W,{src:window.URL.createObjectURL(E),crop:S,onChange:c=>u(c)}),B("div",{className:"mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense",children:[A("button",{type:"button",className:"mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:col-start-1 sm:text-sm",children:R("cancel")}),A("button",{type:"button",children:R("confirm")})]})]})}export{G as default};
