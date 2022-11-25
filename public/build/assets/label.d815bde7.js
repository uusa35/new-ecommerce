import{r as u,R as g}from"./app.8f41755a.js";import{o as p,C as b,y as v,s as x,$ as y}from"./open-closed.0d489d91.js";import{I as T}from"./use-owner.dcb13aec.js";function k(t={},r=null,e=[]){for(let[o,l]of Object.entries(t))d(e,f(r,o),l);return e}function f(t,r){return t?t+"["+r+"]":r}function d(t,r,e){if(Array.isArray(e))for(let[o,l]of e.entries())d(t,f(r,o.toString()),l);else e instanceof Date?t.push([r,e.toISOString()]):typeof e=="boolean"?t.push([r,e?"1":"0"]):typeof e=="string"?t.push([r,e]):typeof e=="number"?t.push([r,`${e}`]):e==null?t.push([r,""]):k(e,r,t)}function R(t){var r;let e=(r=t==null?void 0:t.form)!=null?r:t.closest("form");if(e){for(let o of e.elements)if(o.tagName==="INPUT"&&o.type==="submit"||o.tagName==="BUTTON"&&o.type==="submit"||o.nodeName==="INPUT"&&o.type==="image"){o.click();return}}}function $(t,r,e){let[o,l]=u.exports.useState(e),n=t!==void 0,i=u.exports.useRef(n),s=u.exports.useRef(!1),a=u.exports.useRef(!1);return n&&!i.current&&!s.current?(s.current=!0,i.current=n,console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")):!n&&i.current&&!a.current&&(a.current=!0,i.current=n,console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")),[n?t:o,p(c=>(n||l(c),r==null?void 0:r(c)))]}let m=u.exports.createContext(null);function h(){let t=u.exports.useContext(m);if(t===null){let r=new Error("You used a <Label /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(r,h),r}return t}function w(){let[t,r]=u.exports.useState([]);return[t.length>0?t.join(" "):void 0,u.exports.useMemo(()=>function(e){let o=p(n=>(r(i=>[...i,n]),()=>r(i=>{let s=i.slice(),a=s.indexOf(n);return a!==-1&&s.splice(a,1),s}))),l=u.exports.useMemo(()=>({register:o,slot:e.slot,name:e.name,props:e.props}),[o,e.slot,e.name,e.props]);return g.createElement(m.Provider,{value:l},e.children)},[r])]}let C="label",A=b(function(t,r){let{passive:e=!1,...o}=t,l=h(),n=`headlessui-label-${T()}`,i=v(r);x(()=>l.register(n),[n,l.register]);let s={ref:i,...l.props,id:n};return e&&("onClick"in s&&delete s.onClick,"onClick"in o&&delete o.onClick),y({ourProps:s,theirProps:o,slot:l.slot||{},defaultTag:C,name:l.name||"Label"})});export{A as F,w as M,$ as T,k as e,R as p};