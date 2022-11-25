import{r as a,A as w,e as N,u as k,b as C,a as e,m as i,j as s,h as l,d as j}from"./app.8f41755a.js";import{W as d}from"./transition.a7dac45d.js";import{g as m}from"./dialog.d76c2d8b.js";import"./open-closed.0d489d91.js";import"./use-owner.dcb13aec.js";import"./use-event-listener.cd17cf37.js";function D(){const{trans:c,classNames:u}=a.exports.useContext(w),{confirmationModal:t,locale:f}=N(n=>n),{data:F,submit:T,setData:h,delete:y}=k({id:""}),p=a.exports.useRef(null),o=C(),g=()=>o(i()),x=()=>{if(t.type==="destroy"&&t.id)return b()},b=()=>{const{id:n,model:r,type:v}=t;return h("id",n),o(i()),y(l(`backend.${r}.${v}`,n),{preserveScroll:!0,onSuccess:()=>{r!=="image"&&j.Inertia.get(l(`backend.${r}.index`))},onError:()=>{}})};return e(d.Root,{show:t.display,as:a.exports.Fragment,children:e(m,{as:"div",static:!0,className:"fixed z-10 inset-0 overflow-y-auto",initialFocus:p,onClose:()=>o(i()),children:s("div",{className:u((f.isRTL,"font-tajwal-medium"),"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 capitalize"),children:[e(d.Child,{as:a.exports.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:e(m.Overlay,{className:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"})}),e("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true",children:"\u200B"}),e(d.Child,{as:a.exports.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:s("div",{className:"inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6",children:[s("div",{children:[e("div",{className:"mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100",children:e("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-8 w-8",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}),s("div",{className:"mt-3 text-center sm:mt-5",children:[e(m.Title,{as:"h3",className:"text-lg leading-6 font-medium text-gray-900",children:t.title}),e("div",{className:"mt-2",children:e("p",{className:"text-sm text-gray-500",children:t.message})})]})]}),s("div",{className:"mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense",children:[e("button",{type:"button",className:"mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:col-start-1 sm:text-sm capitalize",onClick:()=>g(),ref:p,children:c("cancel")}),e("button",{type:"button",className:u(t.type==="destroy"?"bg-red-900":"bg-gray-600","w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:col-start-2 sm:text-sm capitalize"),onClick:()=>x(t.id),children:c("confirm")})]}),t.type==="destroy"&&t.id&&s("form",{method:"post",action:l(`backend.${t.model}.${t.type}`,t.id),children:[e("input",{type:"hidden",name:"_method",value:"delete"}),e("button",{type:"submit",className:"btn btn-del hidden"})]})]})})]})})})}export{D as default};