import{r as d,A as _,e as $,G as j,b as S,u as C,l as f,j as a,a as e,i as h,F as v}from"./app.8f41755a.js";import{o as c}from"./index.62a2be08.js";import z from"./FrontendContainer.f87df6a5.js";import L from"./ElementPrice.24f8d79a.js";import I from"./ElementTags.b41162b2.js";import{I as M}from"./image-gallery.4848a544.js";import B from"./ElementRating.72b4bd14.js";import P from"./ElementFavoriteBtn.9108325a.js";import{i as F}from"./lib.3666cbba.js";import O from"./AlertMessage.0840591f.js";import A from"./EmbeddedHtml.07fc019c.js";import E from"./SubMetaElement.bc440d06.js";import H from"./FrontendContentContainer.e2e5b70a.js";import{q as x}from"./menu.b1c0e94d.js";import{W as T}from"./transition.a7dac45d.js";import{O as l}from"./disclosure.ddbd91a8.js";import"./index.74c4741c.js";import"./MainNav.20d61781.js";import"./index.esm.968e8465.js";import"./index.esm.c2914463.js";import"./helpers.b999fcd4.js";import"./SearchField.46d947e0.js";import"./pluralize.a87e66d1.js";import"./MainNavBookCategoriesList.378062f1.js";import"./popover.4efe15a7.js";import"./open-closed.0d489d91.js";import"./use-owner.dcb13aec.js";import"./use-resolve-button-type.fe2d668c.js";import"./use-event-listener.cd17cf37.js";import"./motion.5c4d7eb2.js";import"./CartIndexOrderSummary.222fd040.js";import"./NoElements.fe12762f.js";import"./tabs.59b69d47.js";import"./dialog.d76c2d8b.js";import"./MetaElement.15b324ae.js";/* empty css                   */import"./SystemMessage.0606d8b1.js";import"./FiCircle.c9b8b928.js";import"./FrontendBreadCrumbs.bfadd15b.js";function Se({element:r}){const{getThumb:N,getLarge:p,getLocalized:s,trans:t,classNames:m,mainColor:o,mainBgColor:g,contentBgcolor:W}=d.exports.useContext(_),[n,b]=d.exports.useState(),[w,k]=d.exports.useState([]);$(i=>i);const{auth:u}=d.exports.useContext(j);return S(),C({type:"service",cart_id:null,element_id:r.id,qty:1,price:r.isOnSale?r.sale_price:r.price,direct_purchase:r.direct_purchase}),d.exports.useMemo(()=>{const i=[];i.push({thumbnail:p(r.image),original:p(r.image)}),f.exports.map(r.images,y=>{i.push({thumbnail:p(y.image),original:p(y.image)})}),k(i)},[r]),a(z,{children:[e(E,{title:r[s()],description:r[s("description")],image:r.image}),e(H,{childName:r[s()],children:a("div",{className:`${contentBgColor} max-w-2xl mx-auto lg:max-w-none pt-10 h-full`,children:[e("div",{className:"w-full h-auto overflow-hidden mb-10",children:e(A,{html:r.embedded})}),a("div",{className:m((r.video_url_one,"lg:grid-cols-2"),"lg:grid lg:gap-x-4 lg:px-4 lg:items-start m-auto pb-10"),children:[a("div",{className:"relative",children:[e(I,{exclusive:r.exclusive,onSale:r.isOnSale,onNew:r.on_new,free:r.free}),e(M,{showBullets:!0,showNav:!1,originalAlt:r[s()],originalTitle:r[s()],thumbnailLabel:r[s()],thumbnailTitle:r[s()],showThumbnails:!0,thumbnailPosition:F?"bottom":"right",items:w})]}),a("div",{className:"mx-5 mt-10 pt-10 sm:px-0 sm:mt-16 lg:mt-0",children:[e("h1",{className:"text-3xl font-extrabold tracking-tight text-gray-900",children:r[s()]}),a("div",{className:"mt-3",children:[e("h2",{className:"sr-only",children:t("information")}),e(L,{price:r.price,salePrice:r.sale_price,showLocal:!0,isOnSale:r.isOnSale,large:!0})]}),r.ratings&&e(B,{ratings:r.ratings,id:r.id,type:"service"}),a("div",{className:"flex flex-1 flex-col sm:flex-row justify-between items-center",children:[e("div",{className:"flex flex-1",children:r[s("caption")]&&a("div",{className:"mt-6",children:[e("h3",{className:"sr-only",children:t("caption")}),e("div",{className:"text-base text-gray-800 space-y-6",children:r[s("caption")]})]})}),e("div",{className:"flex",children:r.sku&&a("div",{className:"mt-6",children:[e("h3",{className:"sr-only",children:t("sku")}),a("div",{className:"text-base text-gray-800 space-y-6",children:[t("reference_id")," :",r.sku]})]})})]}),a("div",{className:"mt-6",children:[r.timings&&r.is_available&&a(x,{as:"div",className:"relative inline-block text-left mb-5 w-full",children:[e("div",{children:a(x.Button,{className:"flex flex-1 justify-between items-center w-full capitalize rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500",children:[e("div",{children:f.exports.isEmpty(n)?t("available_timings"):h(`${n.date} ${n.start}`).format("dddd : L - HH:mm A")}),e(c.ChevronDownIcon,{className:"h-5 w-5","aria-hidden":"true"})]})}),e(T,{as:d.exports.Fragment,enter:"transition ease-out duration-100",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:e(x.Items,{className:"z-30 origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none",children:e("div",{className:"py-1",children:f.exports.map(r.timings,i=>e(x.Item,{children:e("div",{onClick:()=>b(i),className:m(i.id===(n==null?void 0:n.id)?"bg-gray-100 text-gray-900":"text-gray-800","block px-4 py-2 text-sm hover:bg-gray-100"),children:a("div",{className:"flex flex-1 flex-col xl:flex-row justify-start items-center text-sm sm:text-lg",children:[a("div",{className:"flex flex-1 flex-col justify-start xl:flex-row xl:w-1/3 items-center",children:[e("span",{className:"flex",children:`${h(i.date).format("dddd")} ${t("equivalent")}`}),e("span",{className:"flex flex-1 justify-start sm:px-2 flex-row",children:`${h(i.date).format("L")}`})]}),a("div",{className:"flex flex-col xl:flex-row justify-between items-center",children:[e("div",{className:"flex capitalize",children:`${t("from")} ${h(`${i.date} ${i.start}`).format("HH:mm A")}`}),e("div",{className:"flex ltr:ml-2 rtl:mr-2 capitalize",children:`${t("to")} ${h(`${i.date} ${i.end}`).format("HH:mm A")}`})]})]})})},i.id))})})})]}),!r.is_available&&e(O,{title:t("element_is_not_available"),message:t("element_is_not_available_currently_for_order")}),e("div",{className:"flex flex-row justify-between items-center gap-x-5",children:e(P,{id:r.id,type:"service",favoritesList:u==null?void 0:u.favoritesList})})]}),a("section",{"aria-labelledby":"details-heading",className:"my-12",children:[e("h2",{id:"details-heading",className:"sr-only",children:"Additional details"}),a("div",{className:"border-t divide-y divide-gray-200 ",children:[e(l,{as:"div",defaultOpen:!0,children:({open:i})=>a(v,{children:[a(l.Button,{className:"group relative w-full py-6 flex justify-between items-center text-left",children:[e("span",{className:m(i?"text-gray-600":"text-gray-900","capitalize font-extrabold"),children:t("description")}),e("span",{className:"ml-6 flex items-center",children:i?e(c.MinusSmIcon,{className:"block h-6 w-6 text-gray-400 group-hover:text-gray-500","aria-hidden":"true"}):e(c.PlusSmIcon,{className:"block h-6 w-6 text-gray-400 group-hover:text-gray-500","aria-hidden":"true"})})]}),e(l.Panel,{as:"div",className:"pb-6",children:e("p",{className:"capitalize",children:r[s("description")]})})]})}),e(l,{as:"div",defaultOpen:!1,children:({open:i})=>a(v,{children:[a(l.Button,{className:"group relative w-full py-6 flex justify-between items-center text-left",children:[e("span",{className:m(i?"text-gray-600":"text-gray-900","capitalize"),children:t("notes")}),e("span",{className:"ml-6 flex items-center",children:i?e(c.MinusSmIcon,{className:"block h-6 w-6 text-gray-400 group-hover:text-gray-500","aria-hidden":"true"}):e(c.PlusSmIcon,{className:"block h-6 w-6 text-gray-400 group-hover:text-gray-500","aria-hidden":"true"})})]}),e(l.Panel,{as:"div",className:"pb-6",children:e("p",{className:"capitalize",children:r[s("notes")]})})]})}),e(l,{as:"div",defaultOpen:!1,children:({open:i})=>a(v,{children:[a(l.Button,{className:"group relative w-full py-6 flex justify-between items-center text-left",children:[e("span",{className:m(i?"text-gray-600":"text-gray-900","capitalize"),children:t("owner")}),e("span",{className:"ml-6 flex items-center",children:i?e(c.MinusSmIcon,{className:"block h-6 w-6 text-gray-400 group-hover:text-gray-500","aria-hidden":"true"}):e(c.PlusSmIcon,{className:"block h-6 w-6 text-gray-400 group-hover:text-gray-500","aria-hidden":"true"})})]}),e(l.Panel,{as:"div",className:"pb-6",children:a("div",{className:"flex flex-1 justify-start items-start",children:[e("div",{children:e("img",{className:"w-40 h-auto rounded-sm shadow-md",src:N(r.user.image),alt:r.user[s()]})}),a("div",{className:"rtl:mr-5 ltr:ml-5",children:[e("h4",{children:r.user[s()]}),e("h6",{children:r.user[s("caption")]}),e("p",{children:r.user[s("description")]})]})]})})]})})]})]}),a("section",{"aria-labelledby":"policies-heading",className:"mt-10",children:[e("h2",{id:"policies-heading",className:"sr-only",children:t("notes")}),a("dl",{className:"grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 capitalize truncate",children:[r.direct_purchase?a("div",{className:`flex flex-1 flex-col justify-start items-center bg-${g}-50 dark:bg-${g}-600 border border-${o}-200 dark:border-${o}-400 rounded-lg p-6 text-center`,children:[e("div",{children:e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}),e("span",{className:"mt-4 text-sm font-medium text-gray-900",children:t("direct_purchase")}),e("dd",{className:"mt-1 text-sm text-gray-500",children:t("direct_purchase")})]}):null,r.timings&&a("div",{className:"flex flex-1 flex-col overflow-clip truncate capitalize justify-start items-center bg-gray-50 border border-gray-200 rounded-lg p-6 text-center",children:[e("div",{children:e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})})}),e("span",{className:"mt-4 text-sm font-medium text-gray-900",children:t("timings")}),e("p",{className:"mt-1 text-xs text-gray-500",children:t("kwt_timing_zone")})]}),r.sku&&a("div",{className:`flex flex-1 flex-col justify-start items-center bg-${g}-50 dark:bg-${g}-600 border border-${o}-200 dark:border-${o}-400 rounded-lg p-6 text-center`,children:[e("div",{children:e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"})})}),e("span",{className:`mt-4 text-sm font-medium text-${o}-600 dark:text-${o}-100`,children:t("reference_id")}),e("dd",{className:`mt-1 text-sm text-${o}-600 dark:text-${o}-100`,children:r.sku})]})]})]})]})]})]})})]})}export{Se as default};