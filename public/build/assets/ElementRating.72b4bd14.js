import{F as g}from"./FiCircle.c9b8b928.js";import{r,A as v,b as _,u as y,j as o,a as s,a2 as N,l,d as b,h as C,s as w}from"./app.8f41755a.js";import{calculateRating as D}from"./helpers.b999fcd4.js";function A({ratings:i,id:m,type:u=""}){const{classNames:p,trans:t,guest:n}=r.exports.useContext(v),[a,c]=r.exports.useState(0),d=_(),{data:h,setData:x,post:F,progress:R}=y({model:u,element_id:m,value:a});r.exports.useMemo(()=>{c(D(i))},[]);const f=e=>{e.preventDefault(),b.Inertia.post(C("frontend.rating.store"),{_method:"post",...h},{forceFormData:!0,onSuccess:()=>d(w({message:t("process_success"),type:"success"}))})};return o("div",{className:"mt-3",children:[s("h3",{className:"sr-only",children:t("ratings")}),o("div",{className:"flex items-center",children:[s("div",{className:"flex items-center",onClick:()=>{n&&N.error(l.exports.capitalize(t("u_have_to_register_first")))},children:s("form",{onSubmit:f,method:"post",children:l.exports.map(l.exports.range(1,6),e=>s("button",{disabled:n,type:"submit",onClick:()=>{x("value",e*20),c(e)},children:s(g,{className:p(a>=e?"text-yellow-400":"text-gray-300","h-5 w-5 flex-shrink-0 hover:text-yellow-400"),"aria-hidden":"true"},e)},e))})}),o("p",{className:"sr-only",children:[a," out of 5 stars"]})]})]})}export{A as default};