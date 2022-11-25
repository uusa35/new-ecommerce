import p from"./BackendContainer.14a50d96.js";import{r as h,A as g,c as y,b as N,u as b,a as e,j as t,l as v,d as f,h as x}from"./app.8f41755a.js";import o from"./ToolTipWidget.402995ed.js";import _ from"./FormBtns.59c9ecb7.js";import i from"./FormSection.31900827.js";import"./SideBar.511b97bc.js";import"./FiCircle.c9b8b928.js";import"./pluralize.a87e66d1.js";import"./transition.a7dac45d.js";import"./open-closed.0d489d91.js";import"./dialog.d76c2d8b.js";import"./use-owner.dcb13aec.js";import"./use-event-listener.cd17cf37.js";import"./menu.b1c0e94d.js";import"./use-resolve-button-type.fe2d668c.js";import"./BackendHeader.a041d251.js";import"./index.esm.968e8465.js";import"./Footer.2cad62e5.js";import"./BreadCrumbs.ce32cd7c.js";import"./SearchField.46d947e0.js";import"./Pagination.cd5c230b.js";import"./NoElements.fe12762f.js";import"./index.74c4741c.js";import"./SystemMessage.0606d8b1.js";import"./ConfirmationModal.5397c6b8.js";function ee({countries:n}){const{trans:a,getLocalized:d,getThumb:C,getFileUrl:k}=h.exports.useContext(g),{errors:r}=y().props;N();const{data:s,setData:m,put:w,progress:F,reset:q}=b({name_ar:"",name_en:"",order:"",code:"",country_id:"",price:"",active:1}),l=c=>{m(u=>({...u,[c.target.id]:c.target.value}))};return e(p,{type:"governate",children:e("div",{className:"flex flex-col rounded-md bg-transparent",children:t("form",{onSubmit:c=>{c.preventDefault(),f.Inertia.post(x("backend.governate.store"),{_method:"post",...s},{forceFormData:!0})},method:"post",encType:"multipart/form-data",className:"w-full space-y-3 bg-transparent",children:[t(i,{title:`${a("edit")} ${a("governate")}`,children:[t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"name_ar",className:"block   text-gray-800",children:a("name_ar")}),e("div",{className:"mt-1",children:e("input",{onChange:l,required:!0,type:"text",name:"name_ar",maxLength:100,defaultValue:s.name_ar,id:"name_ar",autoComplete:"name_ar",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"})}),e(o,{message:a("name_ar_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.name_ar&&e("div",{className:"text-red-900",children:r.name_ar})})]}),t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"name_en",className:"block   text-gray-800",children:a("name_en")}),e("div",{className:"mt-1",children:e("input",{onChange:l,required:!0,type:"text",name:"name_en",maxLength:100,defaultValue:s.name_en,id:"name_en",autoComplete:"name_en",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"})}),e(o,{message:a("name_en_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.name_en&&e("div",{className:"text-red-900",children:r.name_en})})]}),t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"country_id",className:"block   text-gray-800",children:a("country")}),e("div",{className:"mt-1",children:e("select",{onChange:l,id:"country_id",name:"country_id",defaultValue:s.country_id,autoComplete:"country_id",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md",children:v.exports.map(n,c=>e("option",{value:c.id,children:c[d()]},c.id))})}),e(o,{message:a("user_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.country_id&&e("div",{className:"text-red-900",children:r.country_id})})]}),t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"order",className:"block   text-gray-800",children:a("sequence")}),e("div",{className:"mt-1",children:e("input",{onChange:l,required:!0,type:"number",name:"order",max:99,defaultValue:s.order,id:"order",autoComplete:"order",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"})}),e(o,{message:a("order_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.order&&e("div",{className:"text-red-900",children:r.order})})]}),t("div",{className:"sm:col-span-2 has-tooltip",children:[e("label",{htmlFor:"price",className:"block  font-medium text-gray-800",children:a("price")}),e("div",{className:"mt-1",children:e("input",{onChange:l,required:!0,type:"number",step:"any",name:"price",defaultValue:s.price,id:"price",autoComplete:"price",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(o,{message:a("price_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.price&&e("div",{className:"text-red-900",children:r.price})})]}),t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"code",className:"block   text-gray-800",children:a("code")}),e("div",{className:"mt-1",children:e("input",{onChange:l,required:!0,type:"text",name:"code",defaultValue:s.code,id:"code",autoComplete:"code",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"})}),e(o,{message:a("code_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.code&&e("div",{className:"text-red-900",children:r.code})})]})]}),e(i,{title:a("more_details"),children:t("fieldset",{className:"mt-1 col-span-1",children:[e("div",{children:e("legend",{className:"text-base  text-gray-900",children:a("active")})}),t("div",{className:"mt-4 space-y-4",children:[t("div",{className:"flex items-center",children:[e("input",{onChange:l,id:"active",name:"active",type:"radio",value:1,defaultChecked:s.active,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"active",className:"ml-3 block   text-gray-800",children:a("yes")})]}),t("div",{className:"flex items-center",children:[e("input",{onChange:l,id:"active",name:"active",type:"radio",value:0,defaultChecked:!s.active,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"active",className:"ml-3 block   text-gray-800",children:a("no")})]})]}),e(o,{}),e("div",{children:e("p",{className:"mt-2  text-gray-500",children:r.active&&e("div",{className:"text-red-900",children:r.active})})})]})}),e(_,{type:"governate"})]})})})}export{ee as default};