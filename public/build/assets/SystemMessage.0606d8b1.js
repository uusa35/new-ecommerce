import{b as m,c as u,r as p,l as s,s as o,k as i,a as n}from"./app.8f41755a.js";const g=()=>{const e=m(),{errors:t,error:r,success:a}=u().props;return p.exports.useEffect(()=>{!s.exports.isNull(a)&&!s.exports.isEmpty(a)&&e(o({message:a,type:"success"})),t&&!s.exports.isEmpty(t)&&e(o({message:s.exports.first(s.exports.map(t,c=>c)),type:"error"})),!s.exports.isNull(r)&&!s.exports.isEmpty(r)&&e(o({message:r,type:"error"}));const l=setTimeout(()=>e(i()),3e3);return()=>clearInterval(l)},[a,t,r]),n(p.exports.Fragment,{})};export{g as default};