import L from"./BackendContainer.14a50d96.js";import{r as n,G as $,e as I,A as B,b as E,c as G,u as M,l as u,w as z,a as e,j as r,F as _,x as O}from"./app.8f41755a.js";import P from"./FormTabsContainer.abbaef42.js";import d from"./ToolTipWidget.402995ed.js";import W from"./FormBtns.59c9ecb7.js";import y from"./FormSection.31900827.js";import H from"./FormCreateElementEmptyTabs.0456375b.js";import"./SideBar.511b97bc.js";import"./FiCircle.c9b8b928.js";import"./pluralize.a87e66d1.js";import"./transition.a7dac45d.js";import"./open-closed.0d489d91.js";import"./dialog.d76c2d8b.js";import"./use-owner.dcb13aec.js";import"./use-event-listener.cd17cf37.js";import"./menu.b1c0e94d.js";import"./use-resolve-button-type.fe2d668c.js";import"./BackendHeader.a041d251.js";import"./index.esm.968e8465.js";import"./Footer.2cad62e5.js";import"./BreadCrumbs.ce32cd7c.js";import"./SearchField.46d947e0.js";import"./Pagination.cd5c230b.js";import"./NoElements.fe12762f.js";import"./index.74c4741c.js";import"./SystemMessage.0606d8b1.js";import"./ConfirmationModal.5397c6b8.js";function be({users:v,categories:k}){const[N,C]=n.exports.useState([]),[b,w]=n.exports.useState([]),{auth:p}=n.exports.useContext($),{parentModule:F,formTabs:q,currentFormTab:T}=I(s=>s),{classNames:j,trans:a,isAdminOrAbove:f,getLocalized:o}=n.exports.useContext(B),S=E(),{errors:t}=G().props,{data:m,setData:h,post:V,progress:J}=M({sku:u.exports.random(1111,9999),name_ar:"",name_en:"",caption_ar:"",caption_en:"",description_en:"",description_ar:"",notes_ar:"",notes_en:"",home_delivery_availability:1,shipment_availability:1,delivery_time:1,exclusive:0,on_new:0,on_sale:0,on_home:0,is_available:1,price:"",sale_price:"",keywords:"",image:"",video_url_one:"",video_url_two:"",video_url_three:"",video_url_four:"",video_url_five:"",start_sale:"",end_sale:"",active:f,is_hot_deal:0,qr:"",direct_purchase:0,barcode:"",order:1,user_id:p==null?void 0:p.id,categories:"",download:0,free:1,file:"",preview:"",embedded:""});n.exports.useMemo(()=>{S(z(u.exports.first(q)))},[]);const c=s=>{h(i=>({...i,[s.target.id]:s.target.value}))},D=s=>{s.preventDefault();let i=new FormData;for(let l=0;l<b.length;l++)i.append(`images[${l}]`,b[l]);i.append("model","course"),V("/backend/course"),setTimeout(()=>O.post("/api/images/upload",i).then(l=>l.data).catch(l=>console.log("eee",l)),1e3)},x=(s,i)=>{const l=u.exports.uniq(s?N.concat(i):u.exports.filter(N,g=>g!=i));C(l),h("categories",l)},A=s=>{w(s)};return e(L,{children:r(P,{children:[r("form",{onSubmit:D,method:"post",encType:"multipart/form-data",className:j(T.id!==0?"hidden":"","w-full space-y-3"),children:[r(y,{title:`${a("create")} ${a(F)}`,message:a("all_information_required"),children:[r("div",{className:"sm:col-span-3 has-tooltip",children:[e("label",{htmlFor:"name_ar",className:"block  font-medium text-gray-800",children:a("name_ar")}),e("div",{className:"mt-1",children:e("input",{onChange:c,required:!0,type:"text",name:"name_ar",maxLength:100,defaultValue:m.name_ar,id:"name_ar",autoComplete:"name_ar",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("name_instruction")}),e("p",{className:"mt-2  text-gray-500",children:t.name_ar&&e("div",{className:"text-red-900",children:t.name_ar})})]}),r("div",{className:"sm:col-span-3 has-tooltip",children:[e("label",{htmlFor:"name_en",className:"block  font-medium text-gray-800",children:a("name_en")}),e("div",{className:"mt-1",children:e("input",{onChange:c,required:!0,type:"text",name:"name_en",maxLength:100,defaultValue:m.name_en,id:"name_en",autoComplete:"name_en",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("name_instruction")}),e("p",{className:"mt-2  text-gray-500",children:t.name_en&&e("div",{className:"text-red-900",children:t.name_en})})]}),r("div",{className:"sm:col-span-2 has-tooltip",children:[e("label",{htmlFor:"price",className:"block  font-medium text-gray-800",children:a("price")}),e("div",{className:"mt-1",children:e("input",{onChange:c,required:!0,type:"number",step:"any",name:"price",defaultValue:m.price,id:"price",autoComplete:"price",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("price_instruction")}),e("p",{className:"mt-2  text-gray-500",children:t.price&&e("div",{className:"text-red-900",children:t.price})})]}),r("div",{className:"sm:col-span-2 has-tooltip",children:[e("label",{htmlFor:"sale_price",className:"block  font-medium text-gray-800",children:a("sale_price")}),e("div",{className:"mt-1 ",children:e("input",{onChange:c,required:!0,type:"number",step:"any",name:"sale_price",defaultValue:m.sale_price,id:"sale_price",autoComplete:"sale_price",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("sale_price_instruction")}),e("p",{className:"mt-2  text-gray-500",children:t.sale_price&&e("div",{className:"text-red-900",children:t.sale_price})})]}),r("div",{className:"sm:col-span-2 has-tooltip",children:[e("label",{htmlFor:"sku",className:"block  font-medium text-gray-800",children:a("sku")}),e("div",{className:"mt-1",children:e("input",{onChange:c,required:!0,type:"text",name:"sku",maxLength:20,defaultValue:m.sku,id:"sku",autoComplete:"sku",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("course_sku_instruction")}),e("p",{className:"mt-2  text-gray-500",children:t.sku&&e("div",{className:"text-red-900",children:t.sku})})]}),e("div",{className:"sm:col-span-2",children:e("div",{className:"sm:col-span-2",children:f&&r(_,{children:[e("label",{htmlFor:"user_id",className:"block  font-medium text-gray-800",children:a("owner")}),e("div",{className:"mt-1",children:r("select",{onChange:c,id:"user_id",name:"user_id",value:m.user_id,autoComplete:"user_id",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md",children:[r("option",{value:"",children:[a("choose")," ",a("owner")]}),v.map(s=>e("option",{value:s.id,children:s[o("name")]},s.id))]})}),e(d,{message:a("user_instruction")}),e("p",{className:"mt-2  text-gray-500",children:t.user_id&&e("div",{className:"text-red-900",children:t.user_id})})]})})})]}),r(y,{title:`${a("other_elements")}`,children:[r("div",{className:"sm:col-span-3",children:[e("label",{htmlFor:"main_image",className:"block  font-medium text-gray-800",children:a("main_image")}),r("div",{className:"mt-1 flex flex-row flex-1 items-center h-32",children:["ore",e("input",{onChange:s=>h("image",s.target.files[0]),type:"file",name:"image",id:"main_image",accept:"image/jpg, image/jpeg , image/png",autoComplete:"main_image",className:"focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})]}),e(d,{message:a("course_main_image_instruction")}),e("p",{className:" text-red-500 rtl:text-left ltr:text-right",children:a("image_best_fit")}),e("p",{className:"mt-2  text-gray-500",children:t.image&&e("div",{className:"text-red-900",children:t.image})})]}),r("div",{className:"sm:col-span-3 has-tooltip",children:[e("label",{htmlFor:"more_images",className:"block  font-medium text-gray-800",children:a("more_images")}),e("div",{className:"mt-1 flex flex-row flex-1 items-center h-32",children:e("input",{onChange:s=>A(s.target.files),type:"file",multiple:!0,name:"images",id:"more_images",accept:"image/jpg, image/jpeg , image/png",autoComplete:"more_imagemore_images_instructions",className:"focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("more_images_instruction")}),e("p",{className:" text-red-500 rtl:text-left ltr:text-right",children:a("image_best_fit")}),e("p",{className:"mt-2  text-gray-500",children:t.images&&e("div",{className:"text-red-900",children:t.images})})]}),r("div",{className:"sm:col-span-3",children:[e("label",{htmlFor:"main_image",className:"block  font-medium text-gray-800",children:a("pdf_file")}),e("div",{className:"mt-1 flex flex-row flex-1 items-center",children:e("input",{onChange:s=>h("file",s.target.files[0]),type:"file",name:"file",id:"file",accept:"application/pdf",autoComplete:"pdf_file",className:"focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"})}),e(d,{message:a("file_instruction")}),e("p",{className:" text-red-500 rtl:text-left ltr:text-right",children:a("file_instruction")}),e("p",{className:"mt-2  text-gray-500",children:t.file&&e("div",{className:"text-red-900",children:t.file})})]}),r("div",{className:"sm:col-span-full has-tooltip",children:[e("label",{htmlFor:"categories",className:"block  font-medium text-gray-800",children:a("categories")}),e("div",{children:e("fieldset",{className:"space-y-5",children:e("div",{className:"flex flex-row flex-wrap",children:k.map(s=>r("div",{className:"flex flex-col flex-1 space-y-4 mt-4 flex-wrap border-r border-b border-gray-200 p-2",children:[r("div",{className:"relative flex items-start",children:[e("div",{className:"flex items-center h-5 rtl:ml-4 ltr:mr-4",children:e("input",{onChange:i=>x(i.target.checked,i.target.value),id:"categories","aria-describedby":"categories-description",name:"categories",value:s.id,type:"checkbox",className:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"})}),e("div",{className:"ltr:ml-3 ",children:e("label",{htmlFor:"categories",className:"font-extrabold text-gray-900 border-b border-gray-400",children:s[o("name")]})})]}),s.children.map(i=>r("div",{children:[r("div",{className:"relative flex items-start mx-5",children:[e("div",{className:"flex items-center h-5 rtl:ml-4 ltr:mr-4",children:e("input",{onChange:l=>x(l.target.checked,l.target.value),id:"categories","aria-describedby":"categories-description",name:"categories",value:i.id,type:"checkbox",className:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"})}),e("div",{className:"ltr:ml-3 ",children:e("label",{htmlFor:"categories",className:" font-extrabold text-gray-600",children:i[o("name")]})})]}),i.children.map(l=>r("div",{className:"relative flex items-start mx-10",children:[e("div",{className:"flex items-center h-5 rtl:ml-4 ltr:mr-4",children:e("input",{onChange:g=>x(g.target.checked,g.target.value),id:"categories","aria-describedby":"categories-description",name:"categories",value:l.id,type:"checkbox",className:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"})}),e("div",{className:"ltr:ml-3 ",children:e("label",{htmlFor:"categories",className:" font-extrabold text-gray-600",children:l[o("name")]})})]},l.id))]},i.id))]},s.id))})})}),e(d,{message:a("course_categories_instruction")}),e("p",{className:"mt-2  text-gray-500",children:t.categories&&e("div",{className:"text-red-900",children:t.categories})})]}),r("div",{className:"sm:col-span-full has-tooltip",children:[r("label",{htmlFor:"embedded",className:"block  font-medium text-gray-800",children:[a("embedded")," ",a("course")]}),e("div",{className:"mt-1",children:e("textarea",{onChange:c,id:"embedded",name:"embedded",required:!0,rows:4,className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md",defaultValue:m.embedded})}),e(d,{message:a("course_embedded_notes_instruction")}),e("p",{className:"mt-2  text-gray-500",children:t.embedded&&e("div",{className:"text-red-900",children:t.embedded})})]})]}),r(y,{title:a("more_details"),children:[f&&r(_,{children:[r("fieldset",{className:"mt-1 col-span-1",children:[e("div",{children:e("legend",{className:"text-base font-medium text-gray-900",children:a("active")})}),r("div",{className:"mt-4 space-y-4",children:[r("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"active",name:"active",type:"radio",defaultChecked:m.active,value:1,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"active",className:"ml-3 block  font-medium text-gray-800",children:a("yes")})]}),r("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"active",name:"active",type:"radio",defaultChecked:!m.active,value:0,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"active",className:"ml-3 block  font-medium text-gray-800",children:a("no")})]})]}),e(d,{}),e("div",{children:e("p",{className:"mt-2  text-gray-500",children:t.active&&e("div",{className:"text-red-900",children:t.active})})})]}),r("fieldset",{className:"mt-1 col-span-1",children:[e("div",{children:e("legend",{className:"text-base font-medium text-gray-900",children:a("on_home")})}),r("div",{className:"mt-4 space-y-4",children:[r("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"on_home",name:"on_home",defaultChecked:m.on_home,type:"radio",value:1,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"push-everything",className:"ml-3 block  font-medium text-gray-800",children:a("yes")})]}),r("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"on_home",name:"on_home",type:"radio",defaultChecked:!m.on_home,value:0,checked:!0,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"on_home",className:"ml-3 block  font-medium text-gray-800",children:a("no")})]})]}),e(d,{}),e("div",{children:e("p",{className:"mt-2  text-gray-500",children:t.on_home&&e("div",{className:"text-red-900",children:t.on_home})})})]})]}),r("fieldset",{className:"mt-1 has-tooltip col-span-1",children:[e("div",{children:e("legend",{className:"text-base font-medium text-gray-900",children:a("on_sale")})}),r("div",{className:"mt-4 space-y-4",children:[r("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"on_sale",name:"on_sale",type:"radio",value:1,defaultChecked:m.on_sale,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"push-everything",className:"ml-3 block  font-medium text-gray-800",children:a("yes")})]}),r("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"on_sale",name:"on_sale",type:"radio",value:0,defaultChecked:!m.on_sale,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"on_sale",className:"ml-3 block  font-medium text-gray-800",children:a("no")})]})]}),e(d,{message:a("course_sale_price_instruction")}),e("div",{children:e("p",{className:"mt-2  text-gray-500",children:t.on_sale&&e("div",{className:"text-red-900",children:t.on_sale})})})]}),r("fieldset",{className:"mt-1 has-tooltip col-span-1",children:[e("div",{children:e("legend",{className:"text-base font-medium text-gray-900",children:a("free")})}),r("div",{className:"mt-4 space-y-4",children:[r("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"free",name:"free",type:"radio",value:1,defaultChecked:m.free,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"free",className:"ml-3 block  font-medium text-gray-800",children:a("yes")})]}),r("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"free",name:"free",type:"radio",value:0,defaultChecked:!m.free,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"free",className:"ml-3 block  font-medium text-gray-800",children:a("no")})]})]}),e(d,{message:a("course_free_instruction")}),e("div",{children:e("p",{className:"mt-2  text-gray-500",children:t.free&&e("div",{className:"text-red-900",children:t.free})})})]})]}),e(W,{type:"course"})]}),e(H,{})]})})}export{be as default};