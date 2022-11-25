import G from"./BackendContainer.14a50d96.js";import{r as h,e as U,A as z,b as O,c as P,u as W,l as o,a as e,j as t,i as Y,F as H,x as J}from"./app.8f41755a.js";import K from"./FormTabsContainer.abbaef42.js";import n from"./ToolTipWidget.402995ed.js";import Q from"./FormBtns.59c9ecb7.js";import x from"./FormSection.31900827.js";import R from"./FormCreateElementEmptyTabs.0456375b.js";import"./SideBar.511b97bc.js";import"./FiCircle.c9b8b928.js";import"./pluralize.a87e66d1.js";import"./transition.a7dac45d.js";import"./open-closed.0d489d91.js";import"./dialog.d76c2d8b.js";import"./use-owner.dcb13aec.js";import"./use-event-listener.cd17cf37.js";import"./menu.b1c0e94d.js";import"./use-resolve-button-type.fe2d668c.js";import"./BackendHeader.a041d251.js";import"./index.esm.968e8465.js";import"./Footer.2cad62e5.js";import"./BreadCrumbs.ce32cd7c.js";import"./SearchField.46d947e0.js";import"./Pagination.cd5c230b.js";import"./NoElements.fe12762f.js";import"./index.74c4741c.js";import"./SystemMessage.0606d8b1.js";import"./ConfirmationModal.5397c6b8.js";function Ve({roles:S,categories:V,countries:_,subscriptions:y}){var F;const[v,j]=h.exports.useState([]),[N,q]=h.exports.useState([]),[p,T]=h.exports.useState([]),[w,k]=h.exports.useState([]),{parentModule:D,currentFormTab:A}=U(r=>r),{classNames:M,trans:a,getFileUrl:E,isAdminOrAbove:b,getLocalized:m,getThumb:C}=h.exports.useContext(z);O();const{props:I}=P(),{errors:s}=I,{data:i,setData:g,put:X,post:L,progress:Z,reset:ee}=W({sku:"",name:"",name_ar:"",name_en:"",caption_ar:"",caption_en:"",description_en:"",description_ar:"",policy_en:"",policy_ar:"",service_en:"",service_ar:"",cancellation_en:"",cancellation_ar:"",email:"",mobile:"",phone:"",fax:"",image:"",banner:"",bg:"",address:"",area:"",block:"",street:"",building:"",floor:"",apartment:"",country_name:"",keywords:"",qr:"",file:"",website:"",facebook:"",instagram:"",youtube:"",twitter:"",whatsapp:"",iphone:"",android:"",longitude:"",latitude:"",balance:"",player_id:"",video_url_one:"",video_url_two:"",video_url_three:"",video_url_four:"",video_url_five:"",on_home:0,active:1,role_id:3,country_id:"",governate_id:"",area_id:"",end_subscription_date:"01-01-2020",subscription_id:o.exports.first(y).id,merchant_id:"",views:1,is_available:1,is_online:1,access_dashboard:0,is_male:1,mobile_verified:0,mobile_code:"1234",fixed_amount_subscription:1,percentage_subscription:1,start_subscription:"",end_subscription:"",code:"",custome_delivery:0,news_letter_on:1,custome_delivery_fees:1,password:""});h.exports.useMemo(()=>{const r=i.country_id?o.exports.first(o.exports.filter(_,d=>d.id==i.country_id)):o.exports.first(_);T(r.governates),g("governate_id",o.exports.first(r.governates).id);const l=o.exports.first(r.governates).areas;k(l),g("area_id",o.exports.first(l).id)},[i.country_id]),h.exports.useMemo(()=>{if(!o.exports.isEmpty(p)){const r=i.governate_id?o.exports.first(o.exports.filter(p,l=>l.id==i.governate_id)):o.exports.first(p);k(r.areas),g("area_id",o.exports.first(r.areas).id)}},[i.governate_id]);const c=r=>{g(l=>({...l,[r.target.id]:r.target.value}))},$=r=>{r.preventDefault();let l=new FormData;for(let d=0;d<N.length;d++)l.append(`images[${d}]`,N[d]);l.append("model","user"),L("/backend/user"),setTimeout(()=>J.post("/api/images/upload",l).then(d=>d.data).catch(d=>console.log("eee",d)),1e3)},f=(r,l)=>{const d=o.exports.uniq(r?v.concat(l):o.exports.filter(v,u=>u!=l));j(d),g("categories",d)},B=r=>{q(r)};return e(G,{type:"user",children:t(K,{children:[t("form",{onSubmit:$,method:"put",encType:"multipart/form-data",className:" sm:w-full",children:[e("input",{type:"hidden",name:"_method",value:"put"}),t("div",{className:M(A.id!==0?"hidden":"","w-full space-y-3 bg-transparent"),children:[t(x,{title:`${a("edit")} ${a(D)}`,children:[t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"name",className:"block   text-gray-800",children:a("name")}),e("div",{className:"mt-1",children:e("input",{required:!0,type:"text",name:"name",onChange:c,defaultValue:i.name,id:"name",autoComplete:"name",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"})}),e(n,{message:a("user_price_instruction")}),e("p",{className:"mt-2  text-gray-500",children:s.name&&e("div",{className:"text-red-900",children:s.name})})]}),t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"name_ar",className:"block   text-gray-800",children:a("name_ar")}),e("div",{className:"mt-1",children:e("input",{onChange:c,required:!0,type:"text",name:"name_ar",maxLength:100,defaultValue:i.name_ar,id:"name_ar",autoComplete:"name_ar",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"})}),e(n,{message:a("user_price_instruction")}),e("p",{className:"mt-2  text-gray-500",children:s.name_ar&&e("div",{className:"text-red-900",children:s.name_ar})})]}),t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"name_en",className:"block   text-gray-800",children:a("name_en")}),e("div",{className:"mt-1",children:e("input",{onChange:c,required:!0,type:"text",name:"name_en",maxLength:100,defaultValue:i.name_en,id:"name_en",autoComplete:"name_en",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"})}),e(n,{message:a("user_price_instruction")}),e("p",{className:"mt-2  text-gray-500",children:s.name_en&&e("div",{className:"text-red-900",children:s.name_en})})]}),t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"email",className:"block   text-gray-800",children:a("email")}),e("div",{className:"mt-1",children:e("input",{onChange:c,required:!0,type:"text",name:"email",defaultValue:i.email,id:"email",autoComplete:"email",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"})}),e(n,{message:a("user_price_instruction")}),e("p",{className:"mt-2  text-gray-500",children:s.email&&e("div",{className:"text-red-900",children:s.email})})]}),t("div",{className:"sm:col-span-2",children:[e("label",{htmlFor:"password",className:"block   text-gray-800",children:a("password")}),e("div",{className:"mt-1",children:e("input",{required:!0,type:"password",name:"password",onChange:c,id:"password",autoComplete:"password",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"})}),e(n,{message:a("password_instruction")}),e("p",{className:"mt-2  text-gray-500",children:s.password&&e("div",{className:"text-red-900",children:s.password})})]}),b&&t("div",{className:"sm:col-span-2 hidden",children:[e("label",{htmlFor:"subscription_id",className:"block   text-gray-800",children:a("subscription")}),e("div",{className:"mt-1",children:e("select",{onChange:c,id:"subscription_id",name:"subscription_id",defaultValue:i.subscription_id,autoComplete:"subscription_id",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md",children:o.exports.map(y,r=>e("option",{value:r.id,children:r[m()]},r.id))})}),e(n,{message:a("user_instruction")}),e("p",{className:"mt-2  text-gray-500",children:s.subscription_id&&e("div",{className:"text-red-900",children:s.subscription_id})})]}),b&&t("div",{className:"sm:col-span-2 has-tooltip mb-5 hidden",children:[e("label",{htmlFor:"end_subscription_date",className:"block   text-gray-800",children:a("end_subscription_date")}),e("div",{className:"mt-1",children:e("input",{onChange:r=>console.log(r.target.value),type:"datetime-local",step:"any",name:"end_subscription_date",id:"end_subscription_date",autoComplete:"end_subscription_date",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"})}),e(n,{message:a("book_end_sale_instruction")}),t("p",{className:"mt-2  text-gray-500",children:[t("span",{className:"text-extrabold  text-black",children:[a("current_date")," :"," ",Y(i.end_subscription_date).format("DD/MM/Y  -|- hh:mm a")]}),s.end_subscription_date&&e("div",{className:"text-red-900",children:s.end_subscription_date})]})]}),e("div",{className:"sm:col-span-2",children:b&&t(H,{children:[e("label",{htmlFor:"role_id",className:"block   text-gray-800",children:a("role")}),e("div",{className:"mt-1",children:t("select",{onChange:c,id:"role_id",name:"role_id",value:i.role_id,defaultValue:i.role_id,autoComplete:"role_id",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md",children:[t("option",{value:"",children:[a("choose")," ",a("role")]}),S.map(r=>e("option",{value:r.id,children:r[m()]},r.id))]})}),e(n,{message:a("user_instruction")}),e("p",{className:"mt-2  text-gray-500",children:s.role_id&&e("div",{className:"text-red-900",children:s.role_id})})]})}),t("div",{className:"sm:col-span-1",children:[e("label",{htmlFor:"country_id",className:"block   text-gray-800",children:a("country")}),e("div",{className:"mt-1",children:t("select",{onChange:c,id:"country_id",name:"country_id",value:i.country_id,defaultValue:i.country_id,autoComplete:"country_id",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md",children:[t("option",{value:"",children:[a("choose")," ",a("country")]}),o.exports.map(_,r=>e("option",{value:r.id,children:r[m()]},r.id))]})}),e(n,{message:a("user_instruction")}),e("p",{className:"mt-2  text-gray-500",children:s.country_id&&e("div",{className:"text-red-900",children:s.country_id})})]}),p&&t("div",{className:"lg:col-span-1",children:[e("label",{htmlFor:"governate_id",className:"block   ",children:a("governate")}),e("div",{className:"mt-1",children:t("select",{required:!0,onChange:c,id:"governate_id",name:"governate_id",defaultValue:i.governate_id,autoComplete:"governate_id",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md text-black",children:[t("option",{value:"",children:[a("choose")," ",a("governate")]}),o.exports.map(p,r=>e("option",{value:r.id,children:r[m()]},r.id))]})}),e(n,{message:a("user_instruction")}),e("p",{className:"mt-2  ",children:s.governate_id&&e("div",{className:"text-red-900",children:s.governate_id})})]}),w&&t("div",{className:"sm:col-span-1",children:[e("label",{htmlFor:"area_id",className:"block   text-gray-800",children:a("area")}),e("div",{className:"mt-1",children:t("select",{onChange:c,id:"area_id",name:"area_id",value:i.area_id,defaultValue:i.area_id,autoComplete:"area_id",className:"shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md",children:[t("option",{value:"",children:[a("choose")," ",a("area")]}),o.exports.map(w,r=>e("option",{value:r.id,children:r[m()]},r.id))]})}),e(n,{message:a("user_instruction")}),e("p",{className:"mt-2  text-gray-500",children:s.area_id&&e("div",{className:"text-red-900",children:s.area_id})})]})]}),t(x,{children:[t("div",{className:"sm:col-span-full has-tooltip",children:[e("label",{htmlFor:"categories",className:"block   text-gray-800",children:a("categories")}),e("div",{children:e("fieldset",{className:"space-y-5",children:e("div",{className:"flex flex-row flex-wrap",children:o.exports.map(V,r=>t("div",{className:"flex flex-col flex-1 space-y-4 mt-4 flex-wrap border-r border-b border-gray-200 p-2",children:[t("div",{className:"relative flex items-start",children:[e("div",{className:"flex items-center h-5 rtl:ml-4 ltr:mr-4",children:e("input",{onChange:l=>f(l.target.checked,l.target.value),id:"categories","aria-describedby":"categories-description",name:"categories",value:r.id,type:"checkbox",className:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"})}),e("div",{className:"ltr:ml-3 ",children:e("label",{htmlFor:"categories",className:"font-extrabold text-gray-900 border-b border-gray-400",children:r[m("name")]})})]}),o.exports.map(r.children,l=>t("div",{children:[t("div",{className:"relative flex items-start mx-5",children:[e("div",{className:"flex items-center h-5 rtl:ml-4 ltr:mr-4",children:e("input",{onChange:d=>f(d.target.checked,d.target.value),id:"categories","aria-describedby":"categories-description",name:"categories",value:l.id,type:"checkbox",className:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"})}),e("div",{className:"ltr:ml-3 ",children:e("label",{htmlFor:"categories",className:" font-extrabold text-gray-600",children:l[m("name")]})})]}),o.exports.map(l.children,d=>t("div",{className:"relative flex items-start mx-10",children:[e("div",{className:"flex items-center h-5 rtl:ml-4 ltr:mr-4",children:e("input",{onChange:u=>f(u.target.checked,u.target.value),id:"categories","aria-describedby":"categories-description",name:"categories",value:d.id,type:"checkbox",className:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"})}),e("div",{className:"ltr:ml-3 ",children:e("label",{htmlFor:"categories",className:" font-extrabold text-gray-600",children:d[m("name")]})})]},d.id))]},l.id))]},r.id))})})}),e(n,{message:a("user_categories_instruction")}),e("p",{className:"mt-2  text-gray-500",children:s.categories&&e("div",{className:"text-red-900",children:s.categories})})]}),t("div",{className:"sm:col-span-3 has-tooltip mt-5",children:[e("label",{htmlFor:"main_image",className:"block   text-gray-800",children:a("main_image")}),t("div",{className:"mt-1 flex flex-row flex-1 items-center h-32",children:[e("input",{onChange:r=>g("image",r.target.files[0]),type:"file",name:"image",id:"main_image",accept:"image/jpg, image/jpeg , image/png",autoComplete:"main_image",className:"focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"}),e("img",{className:"h-24 w-20 bg-cover rounded-md",src:C(i.image),alt:""})]}),e(n,{message:a("user_main_image_instruction")}),e("p",{className:" text-red-500 rtl:text-left ltr:text-right",children:a("image_best_fit")}),e("p",{className:"mt-2  text-gray-500",children:s.image&&e("div",{className:"text-red-900",children:s.image})})]}),t("div",{className:"sm:col-span-3 has-tooltip mt-3",children:[e("label",{htmlFor:"more_images",className:"block   text-gray-800",children:a("more_images")}),t("div",{className:"mt-1 flex flex-row flex-1 items-center h-32",children:[e("input",{onChange:r=>B(r.target.files),type:"file",multiple:!0,name:"images",id:"more_images",accept:"image/jpg, image/jpeg , image/png",autoComplete:"more_images",className:"focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md"}),i.images&&e("img",{className:"h-24 w-20 bg-cover rounded-md",src:C((F=i.images[0])==null?void 0:F.image),alt:""})]}),e(n,{message:a("more_images_instruction")}),e("p",{className:" text-red-500 rtl:text-left ltr:text-right",children:a("image_best_fit")}),e("p",{className:"mt-2  text-gray-500",children:s.images&&e("div",{className:"text-red-900",children:s.images})})]}),t("div",{className:"sm:col-span-3 hidden",children:[e("label",{htmlFor:"main_image",className:"block  flex flex-row justify-between items-center  text-gray-800",children:a("pdf_file")}),t("div",{className:"mt-1 flex flex-row flex-1 items-center h-32",children:[e("input",{onChange:r=>g("file",r.target.files[0]),type:"file",name:"file",id:"file",accept:"application/pdf",autoComplete:"pdf_file",className:"focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md"}),i.file&&e("a",{className:"p-2 ring-2 ring-gray-300 bg-gray-100 rounded-md shadow-md text-center w-1/2",target:"_blank",href:E(i.file),children:a("file_url")})]}),e(n,{message:a("file_instruction")}),e("p",{className:"mt-2  text-gray-500",children:s.file&&e("div",{className:"text-red-900",children:s.file})})]})]}),t(x,{title:a("more_details"),children:[t("fieldset",{className:"mt-1 col-span-1",children:[e("div",{children:e("legend",{className:"text-base  text-gray-900",children:a("active")})}),t("div",{className:"mt-4 space-y-4",children:[t("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"active",name:"active",type:"radio",value:1,defaultChecked:i.active,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"active",className:"ml-3 block   text-gray-800",children:a("yes")})]}),t("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"active",name:"active",type:"radio",value:0,defaultChecked:!i.active,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"active",className:"ml-3 block   text-gray-800",children:a("no")})]})]}),e(n,{}),e("div",{children:e("p",{className:"mt-2  text-gray-500",children:s.active&&e("div",{className:"text-red-900",children:s.active})})})]}),t("fieldset",{className:"mt-1 col-span-1",children:[e("div",{children:e("legend",{className:"text-base  text-gray-900",children:a("on_home")})}),t("div",{className:"mt-4 space-y-4",children:[t("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"on_home",name:"on_home",type:"radio",value:1,defaultChecked:i.on_home,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"push-everything",className:"ml-3 block   text-gray-800",children:a("yes")})]}),t("div",{className:"flex items-center",children:[e("input",{onChange:c,id:"on_home",name:"on_home",type:"radio",value:0,defaultChecked:!i.on_home,className:"mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"}),e("label",{htmlFor:"on_home",className:"ml-3 block   text-gray-800",children:a("no")})]})]}),e(n,{}),e("div",{children:e("p",{className:"mt-2  text-gray-500",children:s.on_home&&e("div",{className:"text-red-900",children:s.on_home})})})]})]}),e(Q,{type:"user"})]})]}),e(R,{})]})})}export{Ve as default};