import{r as o,A as _,e as F,G as L,h as l,a as e,j as s,L as d,F as j,l as m}from"./app.8f41755a.js";import{W as f}from"./transition.a7dac45d.js";import{g as y}from"./dialog.d76c2d8b.js";import"./open-closed.0d489d91.js";import"./use-owner.dcb13aec.js";import"./use-event-listener.cd17cf37.js";function A({setMobileFiltersOpen:g,categories:w,mobileFiltersOpen:b,id:r,enablePrice:C=!1}){const{trans:c,getLocalized:p,classNames:v,mainColor:x,mainBgColor:N,btnClass:k,textColor:t,currentFont:$}=o.exports.useContext(_),{locale:u}=F(a=>a),{settings:z}=o.exports.useContext(L),{params:i}=l();return e(f.Root,{show:b,as:o.exports.Fragment,children:s(y,{as:"div",className:v(u.isRTL?"right-0":"left-0","fixed inset-0  flex z-40 lg:hidden"),onClose:()=>g,children:[e(f.Child,{as:o.exports.Fragment,enter:"transition-opacity ease-linear duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"transition-opacity ease-linear duration-300",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:e(y.Overlay,{className:"fixed inset-0 bg-black bg-opacity-25"})}),e(f.Child,{as:o.exports.Fragment,enter:"transition ease-in-out duration-300 transform",leave:"transition ease-in-out duration-300 transform",children:s("div",{className:`${$} bg-white relative max-w-xs w-full shadow-xl pb-12 flex flex-col overflow-y-auto`,dir:u.dir,children:[e("div",{className:"px-4 flex items-center justify-between",children:s("button",{type:"button",className:"-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-800 dark:text-gray-50",onClick:()=>g(!1),children:[e("span",{className:"sr-only",children:"Close menu"}),e(XIcon,{className:"h-6 w-6","aria-hidden":"true"})]})}),e("aside",{className:"p-5",children:e("div",{className:"lg:block",children:s("div",{className:"divide-y divide-gray-200 space-y-3",children:[s("div",{className:"flex flex-1 justify-between items-center",children:[e("div",{className:"flex",children:e("h3",{className:`capitalize ${t}`,children:c("filters")})}),e("div",{className:"flex",children:e(d,{href:l().has("frontend.user.search.products")?l("frontend.user.search.products",{id:r}):"#",className:`px-3 py-1 ${k} rounded-sm shadow-sm ring-1 ring-gray-400 capitalize`,children:c("clear_search")})})]}),C&&z.enable_prices?s(j,{children:[e("div",{className:"flex pt-3",children:e("h3",{className:`capitalize ${t}`,children:c("prices")})}),m.exports.map(m.exports.range(50,300,50),a=>e("div",{className:"pt-3",children:e("fieldset",{className:"space-y-3",children:e("div",{className:"pt-3 space-y-3",children:s(d,{href:l().has("frontend.user.search.products")?l("frontend.user.search.products",{...i,user_id:r,id:r,max:a,min:parseInt(a-50)}):"#",className:v(i.max==a?`bg-${N}-200 dark:bg-${N}-400 p-3 rounded-md shadow-md`:"","flex items-center"),children:[u.isRTL?e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",color:x,viewBox:"0 0 20 20",fill:"currentColor",children:e("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})}):e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",color:x,viewBox:"0 0 20 20",fill:"currentColor",children:e("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"})}),e("label",{htmlFor:"name",className:`rtl:mr-3 ltr:ml-3 text-sm ${t} capitalize`,children:`${c("less_than")} ${a} ${c("kd")}`})]})})})},a))]}):null,e("div",{className:"flex pt-3",children:e("h3",{className:`capitalize ${t}`,children:c("categories")})}),m.exports.map(w,a=>e("div",{className:"pt-3",children:s("fieldset",{className:"space-y-3",children:[e("div",{className:"pt-3 space-y-3",children:s(d,{href:l("frontend.user.search.products",{...i,user_id:r,id:r,category_id:a.id}),className:"flex items-center",children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,color:x,children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})}),e("label",{htmlFor:"name",className:`rtl:mr-3 ltr:ml-3 text-sm ${t} capitalize`,children:a[p()]})]})}),m.exports.map(a.children,n=>s("div",{className:"pt-1 space-y-3 mx-5",children:[s(d,{href:l("frontend.user.search.products",{...i,user_id:r,id:r,category_id:n.id}),className:"flex items-center",children:[e("input",{readOnly:!0,type:"checkbox",checked:n.id==i.category_id}),e("label",{htmlFor:"name",className:`rtl:mr-3 ltr:ml-3 text-sm ${t} capitalize`,children:n[p()]})]}),m.exports.map(n.children,h=>e("div",{className:"pt-1 space-y-3 mx-2",children:s(d,{href:l("frontend.user.search.products",{...i,category_id:h.id,id:r,user_id:r}),className:"flex items-center",children:[e("input",{readOnly:!0,type:"checkbox",checked:h.id==i.category_id}),e("label",{htmlFor:"name",className:`rtl:mr-3 ltr:ml-3 text-sm ${t} capitalize`,children:h[p()]})]})},h.id))]},n.id))]})},a.id))]})})})]})})]})})}export{A as default};
