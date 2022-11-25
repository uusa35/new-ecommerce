import{c as b}from"./index.esm.968e8465.js";import{r as v,A as C,e as z,G as _,h as r,j as a,a as e,L as c,F,l as m}from"./app.8f41755a.js";function R({setMobileFiltersOpen:g,categories:u,mobileFiltersOpen:L,type:s,enablePrice:w=!0,showSub:f=!0}){const{trans:i,getLocalized:h,classNames:$,mainColor:x,mainBgColor:N,btnClass:p,textColor:n}=v.exports.useContext(C),{locale:y}=z(l=>l),{settings:k}=v.exports.useContext(_),{params:d}=r();return a("aside",{children:[e("h2",{className:"sr-only capitalize",children:i("advanced_search")}),a("div",{className:"flex flex-1 justify-between items-center",children:[e("div",{className:"flex",children:a("button",{type:"button",className:`inline-flex items-center lg:hidden ${p} p-3 rounded-md shadow-sm capitalize`,onClick:()=>g(!0),children:[e("span",{className:`${n}`,children:i("advanced_search")}),e(b,{className:"flex-shrink-0 ml-1 h-5 w-5 text-gray-400","aria-hidden":"true"})]})}),e("div",{className:"flex",children:e(c,{href:s&&r().has(`frontend.${s}.index`)?r(`frontend.${s}.index`):"#",className:`inline-flex items-center lg:hidden ${p} p-3 rounded-sm shadow-md capitalize`,children:i("clear_search")})})]}),e("div",{className:"hidden lg:block",children:a("div",{className:"divide-y divide-gray-200 space-y-3",children:[a("div",{className:"flex flex-1 justify-between items-center",children:[e("div",{className:"flex",children:e("h3",{className:`${n}`,children:i("filters")})}),e("div",{className:"flex",children:e(c,{href:s&&r().has(`frontend.${s}.index`)?r(`frontend.${s}.index`):"#",className:`px-3 py-1 ${p} rounded-sm shadow-sm ring-1 ring-gray-400 capitalize`,children:i("clear_search")})})]}),w&&k.enable_prices?a(F,{children:[e("div",{className:"flex pt-3",children:e("h3",{className:`${n}`,children:i("prices")})}),m.exports.map(m.exports.range(50,300,50),l=>e("div",{className:"pt-3",children:e("fieldset",{className:"space-y-3",children:e("div",{className:"pt-3 space-y-3",children:a(c,{href:r().has(`frontend.${s}.index`)?r(`frontend.${s}.index`,{...d,max:l,min:parseInt(l-50)}):"#",className:$(d.max==l?`bg-${N}-200 dark:bg-${N}-400 p-3 rounded-md shadow-md`:"","flex items-center"),children:[y.isRTL?e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",color:x,viewBox:"0 0 20 20",fill:"currentColor",children:e("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})}):e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",color:x,viewBox:"0 0 20 20",fill:"currentColor",children:e("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"})}),e("label",{htmlFor:"name",className:`rtl:mr-3 ltr:ml-3 text-sm ${n} capitalize`,children:`${i("less_than")} ${l} ${i("kd")}`})]})})})},l))]}):null,e("div",{className:"flex pt-3",children:e("h3",{className:`${n}`,children:i("categories")})}),m.exports.map(u,l=>e("div",{className:"pt-3",children:a("fieldset",{className:"space-y-3",children:[e("div",{className:"pt-3 space-y-3",children:e(c,{href:r(`frontend.${s}.index`,{...d,category_id:l.id}),className:"flex items-center",children:a("label",{htmlFor:"name",className:`flex flex-row rtl:mr-3 ltr:ml-3 text-sm ${n} capitalize`,children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 mx-2",color:x,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})}),l[h()]]})})}),f&&m.exports.map(l.children,t=>a("div",{className:"pt-1 space-y-3 mx-5",children:[a(c,{href:r(`frontend.${s}.index`,{...d,category_id:t.id}),className:"flex items-center",children:[e("input",{readOnly:!0,type:"checkbox",checked:t.id==d.category_id}),e("label",{htmlFor:"name",className:`rtl:mr-3 ltr:ml-3 text-sm ${n} capitalize`,children:t[h()]})]}),f&&m.exports.map(t.children,o=>e("div",{className:"pt-1 space-y-3 mx-2",children:a(c,{href:r(`frontend.${s}.index`,{...d,category_id:o.id}),className:"flex items-center",children:[e("input",{readOnly:!0,type:"checkbox",checked:o.id==d.category_id}),e("label",{htmlFor:"name",className:`rtl:mr-3 ltr:ml-3 text-sm ${n} capitalize`,children:o[h()]})]})},o.id))]},t.id))]})},l.id))]})})]})}export{R as default};
