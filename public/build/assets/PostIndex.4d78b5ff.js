import{r as c,A as y,e as N,b as L,l as j,a as e,j as r,L as s,h as l,y as w,F as f,v as C}from"./app.8f41755a.js";import M from"./BackendContainer.14a50d96.js";import{b as _}from"./index.esm.968e8465.js";import B from"./ActiveDot.05a9772a.js";import"./ToolTipWidget.402995ed.js";import{q as i}from"./menu.b1c0e94d.js";import{W}from"./transition.a7dac45d.js";import"./SideBar.511b97bc.js";import"./FiCircle.c9b8b928.js";import"./pluralize.a87e66d1.js";import"./dialog.d76c2d8b.js";import"./open-closed.0d489d91.js";import"./use-owner.dcb13aec.js";import"./use-event-listener.cd17cf37.js";import"./use-resolve-button-type.fe2d668c.js";import"./BackendHeader.a041d251.js";import"./Footer.2cad62e5.js";import"./BreadCrumbs.ce32cd7c.js";import"./SearchField.46d947e0.js";import"./Pagination.cd5c230b.js";import"./NoElements.fe12762f.js";import"./index.74c4741c.js";import"./SystemMessage.0606d8b1.js";import"./ConfirmationModal.5397c6b8.js";function te({elements:d}){const[x,g]=c.exports.useState(),{trans:t,classNames:n,getLocalized:m,isAdminOrAbove:b,getThumb:u}=c.exports.useContext(y),{sort:h,locale:v}=N(a=>a),p=L();return c.exports.useMemo(()=>{x||g(d.data)},[d.data]),c.exports.useMemo(()=>{g(j.exports.orderBy(d.data,[h.colName],[h.desc?"desc":"asc"]))},[h.desc]),e(M,{elements:d,showSearch:d.meta.total>=1,showNoElements:d.meta.total<1,showMobileView:d.meta.total>1,total:d.meta.total,links:d.meta.links,mainModule:"post",children:e("div",{className:"flex flex-col ltr:mr",children:e("div",{className:"overflow-visible ",children:r("div",{className:"align-middle inline-block min-w-full rounded-b-lg",children:[r("div",{className:"flex items-center gap-x-4 justify-end  py-2 bg-white rounded-sm shadow-sm mb-3 px-10",children:[r("h6",{children:[t("filtering")," : "]}),e(s,{className:"border border-gray-400 rounded-md shadow-md p-3",href:l("backend.post.index",{...l().params,active:!0}),children:t("active")}),e(s,{className:"border border-gray-400 rounded-md shadow-md p-3",href:l("backend.post.index",{...l().params,active:!1}),children:t("not_active")}),e(s,{className:"border border-gray-400 rounded-md shadow-md p-3",href:l("backend.post.index",{on_sale:!0}),children:t("on_sale")}),e(s,{className:"border border-gray-400 rounded-md shadow-md p-3",href:l("backend.post.index",{on_sale:!1}),children:t("no_sale")}),r(s,{className:"border border-gray-600 rounded-md shadow-md p-3",href:l("backend.post.index"),children:[t("all")," ",t("posts")]})]}),e("div",{className:"bg-gray-300 shadow border-b overflow-visible border-gray-200 sm:rounded-lg",children:r("table",{className:"min-w-full border-collapse block md:table",children:[e("thead",{className:"block md:table-header-group",children:r("tr",{className:"border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ",children:[e("th",{scope:"col",className:"block md:table-cell px-3 py-3  rtl:text-right ltr:text-left  uppercase tracking-wider tracking-wider",onClick:c.exports.useCallback(()=>p(w("id"))),children:r("div",{className:"flex flex-row",children:[h.desc?e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mx-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinejoin:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 15l7-7 7 7"})}):e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mx-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinejoin:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M19 9l-7 7-7-7"})}),e("div",{children:t("id")})]})}),e("th",{scope:"col",className:"block md:table-cell py-3 rtl:text-right ltr:text-left",onClick:c.exports.useCallback(()=>p(w("sku"))),children:r("div",{className:"flex flex-row",children:[h.desc?e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mx-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinejoin:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 15l7-7 7 7"})}):e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mx-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinejoin:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M19 9l-7 7-7-7"})}),t("sku")]})}),e("th",{scope:"col",className:" block md:table-cell px-3 py-3  rtl:text-right ltr:text-left",onClick:c.exports.useCallback(()=>p(w("name"))),children:r("div",{className:"flex flex-row",children:[h.desc?e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mx-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinejoin:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 15l7-7 7 7"})}):e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mx-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinejoin:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M19 9l-7 7-7-7"})}),t("name")]})}),e("th",{scope:"col",className:" block md:table-cell px-3 py-3 rtl:text-right ltr:text-left",children:t("commands")}),e("th",{scope:"col",className:" block md:table-cell px-3 py-3 rtl:text-right ltr:text-left",children:r("div",{className:"flex flex-row justify-between items-center",children:[e("div",{className:"flex",children:t("owner_author")}),e("div",{className:"flex items-center justify-center"})]})})]})}),e("tbody",{className:"block md:table-row-group",children:x&&x.map(a=>r("tr",{className:"block md:table-row bg-white border-b border-gray-100 text-gray-500 odd:bg-white even:bg-gray-100",children:[e("td",{className:" block md:table-cell px-3 py-4 whitespace-nowrap font-medium text-gray-900",children:a.id}),e("td",{className:"block md:table-cell px-3 py-4 whitespace-nowrap text-gray-500 truncate",children:a.sku}),e("td",{className:"block md:table-cell px-3 py-4 whitespace-nowrap text-gray-500",children:r("div",{className:"flex flex-row items-center space-x-3 lg:pl-2",children:[e("img",{src:u(a.image),className:"w-16 h-auto ltr:pr-5 rtl:pl-5"}),e(B,{active:a.active}),e("span",{children:a[m()]})]})}),e("td",{className:" px-6 py-4 whitespace-nowrap text-right font-medium",children:e("div",{className:"relative flex justify-center items-center rounded-full shadow-md w-12 h-12",children:e(i,{as:"div",className:"abflex-shrink-0 z-60",children:({open:k})=>r(f,{children:[r(i.Button,{className:"w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",children:[e("span",{className:"sr-only",children:"Open options"}),e(_,{className:"w-5 h-5","aria-hidden":"true"})]}),e(W,{show:k,as:c.exports.Fragment,enter:"transition ease-out duration-100",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:r(i.Items,{static:!0,className:n(v.isRTL?"right-10":"left-10","z-40 mx-3 origin-top-right absolute top-3 w-48 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"),children:[r("div",{className:"py-1",children:[e(i.Item,{children:({active:o})=>r(s,{href:l("backend.post.edit",a.id),className:n(o?"bg-gray-100 text-gray-900":"text-gray-800","flex flex-1 flex-row items-center block px-4 py-2 ltr:text-left rtl:text-right"),children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 mx-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})}),t("edit")," ",t("post")]})}),e(i.Item,{children:({active:o})=>r(s,{href:l("backend.slide.search",{slidable_id:a.id,slidable_type:"post"}),className:n(o?"bg-gray-100 text-gray-900":"text-gray-800","hidden flex flex-1 flex-row items-center block px-4 py-2 ltr:text-left rtl:text-right"),children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 mx-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"})}),t("list")," ",t("slides")]})}),e(i.Item,{children:({active:o})=>r(s,{href:l("backend.slide.create",{slidable_id:a.id,slidable_type:"post"}),className:n(o?"bg-gray-100 text-gray-900":"text-gray-800","hidden flex flex-1 flex-row items-center block px-4 py-2 ltr:text-left rtl:text-right"),children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 mx-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"})}),t("create")," ",t("slide")]})})]}),e("div",{className:"py-1",children:a.has_real_attributes?r(f,{children:[e(i.Item,{children:({active:o})=>r(s,{href:l("backend.attribute.index",{post_id:a.id}),className:n(o?"bg-gray-100 text-gray-900":"text-gray-800","flex flex-1 flex-row items-center block px-4 py-2 ltr:text-left rtl:text-right"),children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 mx-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"})}),t("post_attribute")]})}),e(i.Item,{children:({active:o})=>r(s,{href:l("backend.attribute.create",{post_id:a.id}),className:n(o?"bg-gray-100 text-gray-900":"text-gray-800","flex flex-1 flex-row items-center block px-4 py-2 ltr:text-left rtl:text-right"),children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 mx-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"})}),t("add_edit_attributes")]})})]}):null}),b?e("div",{className:"py-1",children:e(i.Item,{children:({active:o})=>r(s,{href:l("backend.toggle.activate",{model:"post",id:a.id}),className:n(o?"bg-gray-100 text-gray-900":"text-gray-800","flex flex-1 flex-row items-center block px-4 py-2 ltr:text-left rtl:text-right"),children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 mx-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"})}),t("activate_or_deactivate")]})})}):null,e("div",{className:"py-1",children:e(i.Item,{children:({active:o})=>r("button",{onClick:()=>p(C({type:"destroy",model:"post",id:a.id,title:`${t("destroy")} ${t("post")} ${a[m()]}`,message:`${t("confirmation")} ${t("destroy")} ${t("post")}`})),className:n(o?"bg-gray-100 text-gray-900":"text-gray-800","flex flex-1 w-full flex-row items-center block px-4 py-2 ltr:text-left rtl:text-right text-red-700"),children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 mx-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})}),t("delete")]})})})]})})]})})},a[m("name")])}),e("td",{className:"block md:table-cell px-3 py-4 whitespace-nowrap text-gray-500",children:a.user?r(s,{className:"flex flex-row items-center",href:l("backend.user.edit",a.user.id),children:[e("img",{src:u(a.user.image),alt:"",className:"h-8 w-8 rounded-full shadow-md object-cover mx-3"}),e("span",{children:a.user[m()]})]}):t("n_a")})]},a.id))})]})})]})})})})}export{te as default};