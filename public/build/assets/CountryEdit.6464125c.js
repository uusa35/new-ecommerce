import h from"./BackendContainer.14a50d96.js";import{r as u,A as _,c as p,b as y,u as b,a as e,j as t,d as x,h as f}from"./app.8f41755a.js";import s from"./ToolTipWidget.402995ed.js";import N from"./FormBtns.59c9ecb7.js";import d from"./FormSection.31900827.js";import"./SideBar.511b97bc.js";import"./FiCircle.c9b8b928.js";import"./pluralize.a87e66d1.js";import"./transition.a7dac45d.js";import"./open-closed.0d489d91.js";import"./dialog.d76c2d8b.js";import"./use-owner.dcb13aec.js";import"./use-event-listener.cd17cf37.js";import"./menu.b1c0e94d.js";import"./use-resolve-button-type.fe2d668c.js";import"./BackendHeader.a041d251.js";import"./index.esm.968e8465.js";import"./Footer.2cad62e5.js";import"./BreadCrumbs.ce32cd7c.js";import"./SearchField.46d947e0.js";import"./Pagination.cd5c230b.js";import"./NoElements.fe12762f.js";import"./index.74c4741c.js";import"./SystemMessage.0606d8b1.js";import"./ConfirmationModal.5397c6b8.js";function Z({country:a}){const{trans:r,getLocalized:v,getThumb:o,getFileUrl:C}=u.exports.useContext(_),{errors:l}=p().props;y();const{data:m,setData:n,put:k,progress:w,reset:F}=b({name_ar:a.name_ar,name_en:a.name_en,calling_code:a.calling_code,country_code:a.country_code,image:a.image,order:a.order,has_currency:a.has_currency,max:a.max,currency_symbol_ar:a.currency_symbol_ar,currency_symbol_en:a.currency_symbol_en,is_local:a.is_local,longitude:a.longitude,latitude:a.latitude,minimum_shipment_charge:a.minimum_shipment_charge,fixed_shipment_charge:a.fixed_shipment_charge,active:a.active}),c=i=>{n(g=>({...g,[i.target.id]:i.target.value}))};return e(h,{type:"country",children:e("div",{className:"flex flex-col rounded-md bg-transparent",children:t("form",{onSubmit:i=>{i.preventDefault(),x.Inertia.post(f("backend.country.update",a.id),{_method:"put",...m,image:m.image},{forceFormData:!0})},method:"post",encType:"multipart/form-data",className:"w-full space-y-3 bg-transparent",children:[t(d,{title:`${r("edit")} ${r("country")}`,children:[t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"name_ar",className:"block   text-gray-800",children:r("name_ar")}),e("div",{className:"mt-1",children:e("input",{onChange:c,required:!0,type:"text",name:"name_ar",maxLength:100,defaultValue:a.name_ar,id:"name_ar",autoComplete:"name_ar",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"})}),e(s,{message:r("name_ar_instruction")}),e("p",{className:"mt-2  text-gray-500",children:l.name_ar&&e("div",{className:"text-red-900",children:l.name_ar})})]}),t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"name_en",className:"block   text-gray-800",children:r("name_en")}),e("div",{className:"mt-1",children:e("input",{onChange:c,required:!0,type:"text",name:"name_en",maxLength:100,defaultValue:a.name_en,id:"name_en",autoComplete:"name_en",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"})}),e(s,{message:r("name_en_instruction")}),e("p",{className:"mt-2  text-gray-500",children:l.name_en&&e("div",{className:"text-red-900",children:l.name_en})})]}),t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"currency_symbol_ar",className:"block   text-gray-800",children:r("currency_symbol_ar")}),e("div",{className:"mt-1",children:e("input",{onChange:c,required:!0,type:"text",name:"currency_symbol_ar",maxLength:5,defaultValue:a.currency_symbol_ar,id:"currency_symbol_ar",autoComplete:"currency_symbol_ar",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"})}),e(s,{message:r("currency_symbol_ar_instruction")}),e("p",{className:"mt-2  text-gray-500",children:l.currency_symbol_ar&&e("div",{className:"text-red-900",children:l.currency_symbol_ar})})]}),t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"currency_symbol_en",className:"block   text-gray-800",children:r("currency_symbol_en")}),e("div",{className:"mt-1",children:e("input",{onChange:c,required:!0,type:"text",name:"currency_symbol_en",maxLength:5,defaultValue:a.currency_symbol_en,id:"currency_symbol_en",autoComplete:"currency_symbol_en",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"})}),e(s,{message:r("currency_symbol_en_instruction")}),e("p",{className:"mt-2  text-gray-500",children:l.currency_symbol_en&&e("div",{className:"text-red-900",children:l.currency_symbol_en})})]}),t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"order",className:"block   text-gray-800",children:r("sequance")}),e("div",{className:"mt-1",children:e("input",{onChange:c,required:!0,type:"number",name:"order",max:99,defaultValue:a.order,id:"order",autoComplete:"order",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"})}),e(s,{message:r("order_instruction")}),e("p",{className:"mt-2  text-gray-500",children:l.order&&e("div",{className:"text-red-900",children:l.order})})]}),t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"order",className:"block   text-gray-800",children:r("calling_code")}),e("div",{className:"mt-1",children:e("input",{onChange:c,required:!0,type:"number",name:"calling_code",maxLength:3,defaultValue:a.calling_code,id:"calling_code",autoComplete:"calling_code",className:"shadow-sm focus:ring-gray-500 focus:bcalling_code-gray-500 block w-full bcalling_code-gray-300 rounded-md"})}),e(s,{message:r("calling_code_instruction")}),e("p",{className:"mt-2  text-gray-500",children:l.calling_code&&e("div",{className:"text-red-900",children:l.calling_code})})]}),t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"order",className:"block   text-gray-800",children:r("country_code")}),e("div",{className:"mt-1",children:e("input",{onChange:c,required:!0,type:"text",name:"country_code",maxLength:3,defaultValue:a.country_code,id:"country_code",autoComplete:"country_code",className:"shadow-sm focus:ring-gray-500 focus:bcountry_code-gray-500 block w-full bcountry_code-gray-300 rounded-md"})}),e(s,{message:r("country_code_instruction")}),e("p",{className:"mt-2  text-gray-500",children:l.country_code&&e("div",{className:"text-red-900",children:l.country_code})})]}),t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"order",className:"block   text-gray-800",children:r("fixed_shipment_charge")}),e("div",{className:"mt-1",children:e("input",{onChange:c,required:!0,type:"number",name:"fixed_shipment_charge",max:99,defaultValue:a.fixed_shipment_charge,id:"fixed_shipment_charge",autoComplete:"fixed_shipment_charge",className:"shadow-sm focus:ring-gray-500 focus:bfixed_shipment_charge-gray-500 block w-full bfixed_shipment_charge-gray-300 rounded-md"})}),e(s,{message:r("fixed_shipment_charge_instruction")}),e("p",{className:"mt-2  text-gray-500",children:l.fixed_shipment_charge&&e("div",{className:"text-red-900",children:l.fixed_shipment_charge})})]}),t("div",{className:"sm:col-span-3 has-tooltip mt-5",children:[e("label",{htmlFor:"main_image",className:"block   text-gray-800",children:r("main_image")}),t("div",{className:"mt-1 flex flex-row flex-1 items-center h-32",children:[e("input",{onChange:i=>n("image",i.target.files[0]),type:"file",name:"image",id:"main_image",accept:"image/jpg, image/jpeg , image/png",autoComplete:"main_image",className:"focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"}),e("img",{className:"h-24 w-20 bg-cover rounded-md",src:o(a.image),alt:""})]}),e(s,{message:r("book_main_image_instruction")}),e("p",{className:" text-red-500 rtl:text-left ltr:text-right",children:r("square_best_fit")}),e("p",{className:"mt-2  text-gray-500",children:l.image&&e("div",{className:"text-red-900",children:l.image})})]})]}),t(d,{title:r("more_details"),children:[t("fieldset",{className:"mt-1 col-span-1",children:[e("div",{children:e("legend",{className:"text-base  text-gray-900",children:r("active")})}),t("div",{className:"mt-4 space-y-4",children:[t("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"active",name:"active",type:"radio",value:1,defaultChecked:a.active,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"active",className:"ml-3 block   text-gray-800",children:r("yes")})]}),t("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"active",name:"active",type:"radio",value:0,defaultChecked:!a.active,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"active",className:"ml-3 block   text-gray-800",children:r("no")})]})]}),e(s,{}),e("div",{children:e("p",{className:"mt-2  text-gray-500",children:l.active&&e("div",{className:"text-red-900",children:l.active})})})]}),t("fieldset",{className:"mt-1 col-span-1",children:[e("div",{children:e("legend",{className:"text-base  text-gray-900",children:r("is_local")})}),t("div",{className:"mt-4 space-y-4",children:[t("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"is_local",name:"is_local",type:"radio",value:1,defaultChecked:a.is_local,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"is_local",className:"ml-3 block   text-gray-800",children:r("yes")})]}),t("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"is_local",name:"is_local",type:"radio",value:0,defaultChecked:!a.is_local,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"is_local",className:"ml-3 block   text-gray-800",children:r("no")})]})]}),e(s,{}),e("div",{children:e("p",{className:"mt-2  text-gray-500",children:l.is_local&&e("div",{className:"text-red-900",children:l.is_local})})})]})]}),e(N,{type:"country"})]})})})}export{Z as default};
