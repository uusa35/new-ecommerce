import{r as o,A as y,e as S,h as N,l,a as t,j as s}from"./app.8f41755a.js";import w from"./FrontendContainer.f87df6a5.js";import C from"./NormalUserWidget.ae15c5d7.js";import k from"./NoElements.fe12762f.js";import h from"./FrontendPagination.5f7ab235.js";import F from"./SearchIndexSideBar.80374dc6.js";import _ from"./SearchIndexSideBarMobile.793a8aee.js";import M from"./FrontendSortIndexMenu.617a9cfc.js";import v from"./FrontendContentContainer.e2e5b70a.js";import"./index.74c4741c.js";import"./MainNav.20d61781.js";import"./index.esm.968e8465.js";import"./index.esm.c2914463.js";import"./helpers.b999fcd4.js";import"./SearchField.46d947e0.js";import"./pluralize.a87e66d1.js";import"./MainNavBookCategoriesList.378062f1.js";import"./popover.4efe15a7.js";import"./open-closed.0d489d91.js";import"./use-owner.dcb13aec.js";import"./use-resolve-button-type.fe2d668c.js";import"./use-event-listener.cd17cf37.js";import"./motion.5c4d7eb2.js";import"./CartIndexOrderSummary.222fd040.js";import"./lib.3666cbba.js";import"./tabs.59b69d47.js";import"./transition.a7dac45d.js";import"./dialog.d76c2d8b.js";import"./menu.b1c0e94d.js";import"./MetaElement.15b324ae.js";/* empty css                   */import"./SystemMessage.0606d8b1.js";import"./disclosure.ddbd91a8.js";import"./FrontendBreadCrumbs.bfadd15b.js";function nt({elements:r,categories:c,settings:$}){const{trans:p,mainColor:i,contentBgColor:b}=o.exports.useContext(y),[d,x]=o.exports.useState(!1),[f,u]=o.exports.useState(),{sort:m}=S(e=>e),{params:n}=N(),[g,a]=o.exports.useState("");return o.exports.useMemo(()=>{n.is_author?a("authors"):n.is_designer?a("our_clients"):n.is_celebrity?a("our_partners"):a("users")},[]),o.exports.useMemo(()=>{f||u(r.data)},[r.data]),o.exports.useMemo(()=>{u(l.exports.orderBy(r.data,[m.colName],[m.desc?"desc":"asc"]))},[m.desc]),t(w,{children:s(v,{children:[t(_,{type:"user",categories:l.exports.filter(c,e=>e.is_user),setMobileFiltersOpen:x,mobileFiltersOpen:d}),s("main",{className:`${b} max-w-2xl mx-auto py-5 px-4 sm:py-5 sm:px-6 lg:max-w-full lg:px-8`,children:[s("div",{className:"flex flex-1 flex-col sm:flex-row justify-start items-end border-b border-gray-200 pb-5",children:[s("div",{className:"flex flex-1 flex-col w-full sm:w-auto",children:[t("h1",{className:`text-4xl font-extrabold tracking-tight text-${i}-900 dark:text-${i}-100 capitalize`,children:p(g)}),s("p",{className:`mt-4 text-base text-${i}-600 dark:text-${i}-200 capitalize`,children:[p("list")," ",p(g)]})]}),t(h,{type:"user",total:r.meta.total,links:r.meta.links,showSearch:!1}),t(M,{showPrice:!1})]}),s("div",{className:"pt-5 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 min-h-screen",children:[t(F,{type:"user",enablePrice:!1,categories:l.exports.filter(c,e=>e.is_user),showSub:!1,setMobileFiltersOpen:x,mobileFiltersOpen:d}),s("div",{className:"mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3",children:[t(k,{display:r.meta.total<1}),t("div",{className:"grid grid-cols-2 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8",children:l.exports.map(f,e=>t(C,{element:e},e.id))})]})]}),t(h,{type:"user",total:r.meta.total,links:r.meta.links,showSearch:!1})]})]})})}export{nt as default};
