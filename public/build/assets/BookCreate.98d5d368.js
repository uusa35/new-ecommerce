import $ from"./BackendContainer.14a50d96.js";import{r as n,G as B,e as I,A as E,b as G,c as M,u as z,l as u,w as O,a as e,j as t,F as _,x as P}from"./app.8f41755a.js";import W from"./FormTabsContainer.abbaef42.js";import d from"./ToolTipWidget.402995ed.js";import H from"./FormBtns.59c9ecb7.js";import x from"./FormSection.31900827.js";import J from"./FormCreateElementEmptyTabs.0456375b.js";import"./SideBar.511b97bc.js";import"./FiCircle.c9b8b928.js";import"./pluralize.a87e66d1.js";import"./transition.a7dac45d.js";import"./open-closed.0d489d91.js";import"./dialog.d76c2d8b.js";import"./use-owner.dcb13aec.js";import"./use-event-listener.cd17cf37.js";import"./menu.b1c0e94d.js";import"./use-resolve-button-type.fe2d668c.js";import"./BackendHeader.a041d251.js";import"./index.esm.968e8465.js";import"./Footer.2cad62e5.js";import"./BreadCrumbs.ce32cd7c.js";import"./SearchField.46d947e0.js";import"./Pagination.cd5c230b.js";import"./NoElements.fe12762f.js";import"./index.74c4741c.js";import"./SystemMessage.0606d8b1.js";import"./ConfirmationModal.5397c6b8.js";function _e({users:v,categories:k}){const[b,w]=n.exports.useState([]),[N,C]=n.exports.useState([]),{auth:p}=n.exports.useContext(B),{parentModule:F,formTabs:q,currentFormTab:T}=I(l=>l),{classNames:V,trans:a,isAdminOrAbove:f,getLocalized:c}=n.exports.useContext(E),j=G(),{props:S}=M(),{errors:r}=S,{data:s,setData:h,post:D,progress:K}=z({sku:u.exports.random(1111,9999),name_ar:"",name_en:"",caption_ar:"",caption_en:"",description_en:"",description_ar:"",notes_ar:"",notes_en:"",home_delivery_availability:1,shipment_availability:1,delivery_time:1,exclusive:0,on_new:0,on_sale:0,on_home:0,is_available:1,price:"",weight:.25,sale_price:"",keywords:"",image:"",video_url_one:"",video_url_two:"",video_url_three:"",video_url_four:"",video_url_five:"",start_sale:"",end_sale:"",active:f,check_stock:1,is_hot_deal:0,wrap_as_gift:0,qty:1,qr:"",direct_purchase:0,barcode:"",order:1,user_id:p==null?void 0:p.id,categories:"",download:1,free:1,file:"",preview:"",embedded:""});n.exports.useMemo(()=>{j(O(u.exports.first(q)))},[]);const i=l=>{h(m=>({...m,[l.target.id]:l.target.value}))},L=l=>{l.preventDefault();let m=new FormData;for(let o=0;o<N.length;o++)m.append(`images[${o}]`,N[o]);m.append("model","book"),D("/backend/book"),setTimeout(()=>P.post("/api/images/upload",m).then(o=>o.data).catch(o=>console.log("eee",o)),1e3)},y=(l,m)=>{const o=u.exports.uniq(l?b.concat(m):u.exports.filter(b,g=>g!=m));w(o),h("categories",o)},A=l=>{C(l)};return e($,{children:t(W,{children:[t("form",{onSubmit:L,method:"post",encType:"multipart/form-data",className:V(T.id!==0?"hidden":"","w-full space-y-3"),children:[t(x,{title:`${a("create")} ${a(F)}`,message:a("all_information_required"),children:[t("div",{className:"sm:col-span-3 has-tooltip",children:[e("label",{htmlFor:"name_ar",className:"block  font-medium text-gray-800",children:a("name_ar")}),e("div",{className:"mt-1",children:e("input",{onChange:i,required:!0,type:"text",name:"name_ar",maxLength:100,maxLength:100,defaultValue:s.name_ar,id:"name_ar",autoComplete:"name_ar",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("book_price_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.name_ar&&e("div",{className:"text-red-900",children:r.name_ar})})]}),t("div",{className:"sm:col-span-3 has-tooltip",children:[e("label",{htmlFor:"name_en",className:"block  font-medium text-gray-800",children:a("name_en")}),e("div",{className:"mt-1",children:e("input",{onChange:i,required:!0,type:"text",name:"name_en",maxLength:100,defaultValue:s.name_en,id:"name_en",autoComplete:"name_en",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("book_price_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.name_en&&e("div",{className:"text-red-900",children:r.name_en})})]}),t("div",{className:"sm:col-span-2 has-tooltip",children:[e("label",{htmlFor:"price",className:"block  font-medium text-gray-800",children:a("price")}),e("div",{className:"mt-1",children:e("input",{onChange:i,required:!0,type:"number",step:"any",name:"price",defaultValue:s.price,id:"price",autoComplete:"price",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("book_price_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.price&&e("div",{className:"text-red-900",children:r.price})})]}),t("div",{className:"sm:col-span-2 has-tooltip",children:[e("label",{htmlFor:"sale_price",className:"block  font-medium text-gray-800",children:a("sale_price")}),e("div",{className:"mt-1 ",children:e("input",{onChange:i,required:!0,type:"number",step:"any",name:"sale_price",defaultValue:s.sale_price,id:"sale_price",autoComplete:"sale_price",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("book_sale_price_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.sale_price&&e("div",{className:"text-red-900",children:r.sale_price})})]}),t("div",{className:"sm:col-span-2 has-tooltip",children:[t("label",{htmlFor:"qty",className:"block  font-medium text-gray-800",children:[a("qty")," ",a("available")]}),e("div",{className:"mt-1",children:e("input",{onChange:i,required:!0,type:"number",step:"any",name:"qty",defaultValue:s.qty,id:"qty",autoComplete:"qty",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("book_qty_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.qty&&e("div",{className:"text-red-900",children:r.qty})})]}),t("div",{className:"sm:col-span-2 has-tooltip",children:[e("label",{htmlFor:"sku",className:"block  font-medium text-gray-800",children:a("sku")}),e("div",{className:"mt-1",children:e("input",{onChange:i,required:!0,type:"text",name:"sku",maxLength:20,defaultValue:s.sku,id:"sku",autoComplete:"sku",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("book_sku_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.sku&&e("div",{className:"text-red-900",children:r.sku})})]}),t("div",{className:"sm:col-span-2 hidden",children:[e("label",{htmlFor:"weight",className:"block  font-medium text-gray-800",children:a("weight")}),e("div",{className:"mt-1",children:e("input",{onChange:i,type:"number",step:"any",name:"weight",defaultValue:s.weight,id:"weight",autoComplete:"weight",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("book_weight_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.weight&&e("div",{className:"text-red-900",children:r.weight})})]}),e("div",{className:"sm:col-span-2",children:f&&t(_,{children:[e("label",{htmlFor:"user_id",className:"block  font-medium text-gray-800",children:a("owner")}),e("div",{className:"mt-1",children:t("select",{onChange:i,id:"user_id",name:"user_id",defaultValue:s.user_id,autoComplete:"user_id",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md",children:[t("option",{value:"",children:[a("choose")," ",a("owner")]}),v.map(l=>e("option",{value:l.id,children:l[c()]},l.id))]})}),e(d,{message:a("user_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.user_id&&e("div",{className:"text-red-900",children:r.user_id})})]})})]}),t(x,{title:`${a("other_elements")}`,children:[t("div",{className:"sm:col-span-3",children:[e("label",{htmlFor:"main_image",className:"block  font-medium text-gray-800",children:a("main_image")}),t("div",{className:"mt-1 flex flex-row flex-1 items-center h-32",children:["ore",e("input",{onChange:l=>h("image",l.target.files[0]),type:"file",name:"image",id:"main_image",accept:"image/jpg, image/jpeg , image/png",autoComplete:"main_image",className:"focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})]}),e(d,{message:a("book_main_image_instruction")}),e("p",{className:" text-red-500 rtl:text-left ltr:text-right",children:a("image_best_fit")}),e("p",{className:"mt-2  text-gray-500",children:r.image&&e("div",{className:"text-red-900",children:r.image})})]}),t("div",{className:"sm:col-span-3 has-tooltip",children:[e("label",{htmlFor:"more_images",className:"block  font-medium text-gray-800",children:a("more_images")}),e("div",{className:"mt-1 flex flex-row flex-1 items-center h-32",children:e("input",{onChange:l=>A(l.target.files),type:"file",multiple:!0,name:"images",id:"more_images",accept:"image/jpg, image/jpeg , image/png",autoComplete:"more_imagemore_images_instructions",className:"focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("more_images_instruction")}),e("p",{className:" text-red-500 rtl:text-left ltr:text-right",children:a("image_best_fit")}),e("p",{className:"mt-2  text-gray-500",children:r.images&&e("div",{className:"text-red-900",children:r.images})})]}),t("div",{className:"sm:col-span-3",children:[e("label",{htmlFor:"main_image",className:"block  font-medium text-gray-800",children:a("book_file")}),e("div",{className:"mt-1 flex flex-row flex-1 items-center",children:e("input",{onChange:l=>h("file",l.target.files[0]),type:"file",name:"file",id:"file",accept:"application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.ms-powerpoint,application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel ",autoComplete:"pdf_file",className:"focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("file_instruction")}),e("p",{className:" text-red-500 rtl:text-left ltr:text-right",children:a("file_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.file&&e("div",{className:"text-red-900",children:r.file})})]}),t("div",{className:"sm:col-span-full has-tooltip",children:[e("label",{htmlFor:"categories",className:"block  font-medium text-gray-800",children:a("categories")}),e("div",{children:e("fieldset",{className:"space-y-5",children:e("div",{className:"flex flex-row flex-wrap",children:k.map(l=>t("div",{className:"flex flex-col flex-1 space-y-4 mt-4 flex-wrap border-r border-b border-gray-200 p-2",children:[t("div",{className:"relative flex items-start",children:[e("div",{className:"flex items-center h-5 rtl:ml-4 ltr:mr-4",children:e("input",{onChange:m=>y(m.target.checked,m.target.value),id:"categories","aria-describedby":"categories-description",name:"categories",value:l.id,type:"checkbox",className:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"})}),e("div",{className:"ltr:ml-3 ",children:e("label",{htmlFor:"categories",className:"font-extrabold text-gray-900 border-b border-gray-400",children:l[c()]})})]}),l.children.map(m=>t("div",{children:[t("div",{className:"relative flex items-start mx-5",children:[e("div",{className:"flex items-center h-5 rtl:ml-4 ltr:mr-4",children:e("input",{onChange:o=>y(o.target.checked,o.target.value),id:"categories","aria-describedby":"categories-description",name:"categories",value:m.id,type:"checkbox",className:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"})}),e("div",{className:"ltr:ml-3 ",children:e("label",{htmlFor:"categories",className:" font-extrabold text-gray-600",children:m[c()]})})]}),m.children.map(o=>t("div",{className:"relative flex items-start mx-10",children:[e("div",{className:"flex items-center h-5 rtl:ml-4 ltr:mr-4",children:e("input",{onChange:g=>y(g.target.checked,g.target.value),id:"categories","aria-describedby":"categories-description",name:"categories",value:o.id,type:"checkbox",className:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"})}),e("div",{className:"ltr:ml-3 ",children:e("label",{htmlFor:"categories",className:" font-extrabold text-gray-600",children:o[c()]})})]},o.id))]},m.id))]},l.id))})})}),e(d,{message:a("book_categories_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.categories&&e("div",{className:"text-red-900",children:r.categories})})]}),t("div",{className:"sm:col-span-full has-tooltip hidden",children:[t("label",{htmlFor:"embedded",className:"block  font-medium text-gray-800",children:[a("embedded")," ",a("book")]}),e("div",{className:"mt-1",children:e("textarea",{onChange:i,id:"embedded",name:"embedded",rows:4,className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md",defaultValue:s.embedded})}),e(d,{message:a("book_embedded_notes_instruction")}),e("p",{className:"mt-2  text-gray-500",children:r.embedded&&e("div",{className:"text-red-900",children:r.embedded})})]})]}),t(x,{title:a("more_details"),children:[f&&t(_,{children:[t("fieldset",{className:"mt-1 col-span-1",children:[e("div",{children:e("legend",{className:"text-base font-medium text-gray-900",children:a("active")})}),t("div",{className:"mt-4 space-y-4",children:[t("div",{className:"flex items-center",children:[e("input",{onChange:i,id:"active",name:"active",type:"radio",defaultChecked:s.active,value:1,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"active",className:"ml-3 block  font-medium text-gray-800",children:a("yes")})]}),t("div",{className:"flex items-center",children:[e("input",{onChange:i,id:"active",name:"active",type:"radio",defaultChecked:!s.active,value:0,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"active",className:"ml-3 block  font-medium text-gray-800",children:a("no")})]})]}),e(d,{}),e("div",{children:e("p",{className:"mt-2  text-gray-500",children:r.active&&e("div",{className:"text-red-900",children:r.active})})})]}),t("fieldset",{className:"mt-1 col-span-1",children:[e("div",{children:e("legend",{className:"text-base font-medium text-gray-900",children:a("on_home")})}),t("div",{className:"mt-4 space-y-4",children:[t("div",{className:"flex items-center",children:[e("input",{onChange:i,name:"on_home",defaultChecked:s.on_home,type:"radio",value:1,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"push-everything",className:"ml-3 block  font-medium text-gray-800",children:a("yes")})]}),t("div",{className:"flex items-center",children:[e("input",{onChange:i,name:"on_home",type:"radio",defaultChecked:!s.on_home,value:0,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"on_home",className:"ml-3 block  font-medium text-gray-800",children:a("no")})]})]}),e(d,{}),e("div",{children:e("p",{className:"mt-2  text-gray-500",children:r.on_home&&e("div",{className:"text-red-900",children:r.on_home})})})]})]}),t("fieldset",{className:"mt-1 has-tooltip col-span-1",children:[e("div",{children:e("legend",{className:"text-base font-medium text-gray-900",children:a("on_sale")})}),t("div",{className:"mt-4 space-y-4",children:[t("div",{className:"flex items-center",children:[e("input",{onChange:i,name:"on_sale",type:"radio",value:1,defaultChecked:s.on_sale,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"push-everything",className:"ml-3 block  font-medium text-gray-800",children:a("yes")})]}),t("div",{className:"flex items-center",children:[e("input",{onChange:i,name:"on_sale",type:"radio",value:0,defaultChecked:!s.on_sale,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"on_sale",className:"ml-3 block  font-medium text-gray-800",children:a("no")})]})]}),e(d,{message:a("book_sale_price_instruction")}),e("div",{children:e("p",{className:"mt-2  text-gray-500",children:r.on_sale&&e("div",{className:"text-red-900",children:r.on_sale})})})]}),t("fieldset",{className:"mt-1 has-tooltip col-span-1",children:[e("div",{children:e("legend",{className:"text-base font-medium text-gray-900",children:a("free")})}),t("div",{className:"mt-4 space-y-4",children:[t("div",{className:"flex items-center",children:[e("input",{onChange:i,id:"free",name:"free",type:"radio",value:1,defaultChecked:s.free,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"free",className:"ml-3 block  font-medium text-gray-800",children:a("yes")})]}),t("div",{className:"flex items-center",children:[e("input",{onChange:i,id:"free",name:"free",type:"radio",value:0,defaultChecked:!s.free,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"free",className:"ml-3 block  font-medium text-gray-800",children:a("no")})]})]}),e(d,{message:a("book_free_instruction")}),e("div",{children:e("p",{className:"mt-2  text-gray-500",children:r.free&&e("div",{className:"text-red-900",children:r.free})})})]}),t("fieldset",{className:"mt-1 has-tooltip col-span-1",children:[e("div",{children:e("legend",{className:"text-base font-medium text-gray-900",children:a("download")})}),t("div",{className:"mt-4 space-y-4",children:[t("div",{className:"flex items-center",children:[e("input",{onChange:i,id:"download",name:"download",type:"radio",value:1,defaultChecked:s.download,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"download",className:"ml-3 block  font-medium text-gray-800",children:a("yes")})]}),t("div",{className:"flex items-center",children:[e("input",{onChange:i,id:"download",name:"download",type:"radio",value:0,defaultChecked:!s.download,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"download",className:"ml-3 block  font-medium text-gray-800",children:a("no")})]})]}),e(d,{message:a("book_download_instruction")}),e("div",{children:e("p",{className:"mt-2  text-gray-500",children:r.download&&e("div",{className:"text-red-900",children:r.download})})})]})]}),e(H,{type:"book"})]}),e(J,{})]})})}export{_e as default};