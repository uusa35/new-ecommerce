import p from"./BackendContainer.14a50d96.js";import{r as a,A as h,G as x,h as o,a as e,j as s,L as d,l as w,i as u}from"./app.8f41755a.js";import g from"./ToolTipWidget.402995ed.js";import"./SideBar.511b97bc.js";import"./FiCircle.c9b8b928.js";import"./pluralize.a87e66d1.js";import"./transition.a7dac45d.js";import"./open-closed.0d489d91.js";import"./dialog.d76c2d8b.js";import"./use-owner.dcb13aec.js";import"./use-event-listener.cd17cf37.js";import"./menu.b1c0e94d.js";import"./use-resolve-button-type.fe2d668c.js";import"./BackendHeader.a041d251.js";import"./index.esm.968e8465.js";import"./Footer.2cad62e5.js";import"./BreadCrumbs.ce32cd7c.js";import"./SearchField.46d947e0.js";import"./Pagination.cd5c230b.js";import"./NoElements.fe12762f.js";import"./index.74c4741c.js";import"./SystemMessage.0606d8b1.js";import"./ConfirmationModal.5397c6b8.js";function J({elements:i}){var l;const{trans:r,theme:v,handleDeleteItem:c,classNames:f,getLocalized:n}=a.exports.useContext(h);a.exports.useContext(x);const{params:m}=o();return e(p,{elements:i,subModule:"timing",showNoElements:i.data.length<1,showMobileView:!0,children:e("div",{className:"flex flex-col ",children:e("div",{className:" overflow-auto",children:e("div",{className:"align-middle inline-block min-w-full rounded-b-lg",children:e("div",{className:"bg-gray-300 shadow border-b overflow-visible border-gray-200 sm:rounded-lg",children:s("table",{className:"min-w-full border-collapse block md:table",children:[e("thead",{className:"block md:table-header-group",children:s("tr",{className:"border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ",children:[e("th",{scope:"col",className:"px-6 py-3  rtl:text-right ltr:text-left text-sm  uppercase ",children:r("id")}),e("th",{scope:"col",className:"px-6 py-3  rtl:text-right ltr:text-left text-sm  uppercase ",children:r("date")}),e("th",{scope:"col",className:"px-6 py-3  rtl:text-right ltr:text-left text-sm  uppercase ",children:r("start_time")}),e("th",{scope:"col",className:"px-6 py-3  rtl:text-right ltr:text-left text-sm  uppercase ",children:r("end_time")}),e("th",{scope:"col",className:"px-6 py-3  rtl:text-right ltr:text-left text-sm  uppercase ",children:r("service")}),e("th",{scope:"col",className:"px-6 py-3  rtl:text-right ltr:text-left text-sm  uppercase ",children:s("div",{className:"flex flex-row justify-between items-center",children:[e("div",{className:"flex",children:r("commands")}),e("div",{className:"flex",children:s(d,{className:"has-tooltip",href:o("backend.timing.create",{service_id:i.data.length>0?(l=i.data[0])==null?void 0:l.service_id:m.service_id}),children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"})}),e(g,{message:r("create")})]})})]})})]})}),e("tbody",{className:"bg-white divide-y divide-gray-200 border-r border-l border-b border-gray-400",children:w.exports.map(i.data,t=>s("tr",{children:[e("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",children:t.id}),e("td",{className:"px-6 py-4 whitespace-nowrap text-sm ",children:u(t.date).format("L")}),e("td",{className:"px-6 py-4 whitespace-nowrap text-sm ",children:t.start}),e("td",{className:"px-6 py-4 whitespace-nowrap text-sm ",children:t.end}),e("td",{className:"px-6 py-4 whitespace-nowrap text-sm ",children:t.service[n()]}),e("td",{className:"px-6 py-4 whitespace-nowrap text-sm ",children:s("div",{className:"flex flex-row items-center justify-around",children:[e(d,{href:o("backend.timing.edit",t.id),className:"text-indigo-600 hover:text-indigo-900",children:e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}),e("button",{onClick:()=>c("destroy","timing",t.id),className:"text-indigo-600 hover:text-indigo-900 ",children:e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})})]},t.id))})]})})})})})})}export{J as default};