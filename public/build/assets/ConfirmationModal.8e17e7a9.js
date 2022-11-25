import{r as t,A as p,b as u,a as e,j as a,h,a5 as g,m as x}from"./app.8f41755a.js";import{o as y}from"./index.62a2be08.js";import{W as n}from"./transition.a7dac45d.js";import{g as i}from"./dialog.d76c2d8b.js";import"./open-closed.0d489d91.js";import"./use-owner.dcb13aec.js";import"./use-event-listener.cd17cf37.js";function k({confirmationOpen:m=!1,routeName:d="",paramId:f="",message:s=""}){const o=t.exports.useRef(null),{trans:r}=t.exports.useContext(p),l=u(),c=()=>l(x());return e(n.Root,{show:m,as:t.exports.Fragment,children:e(i,{as:"div",className:"fixed z-10 inset-0 overflow-y-auto",initialFocus:o,onClose:()=>c(),children:a("div",{className:"font-tajwal-medium flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",children:[e(n.Child,{as:t.exports.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:e(i.Overlay,{className:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"})}),e("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true",children:"\u200B"}),e(n.Child,{as:t.exports.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:a("div",{className:"inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6",children:[a("div",{children:[e("div",{className:"mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100",children:e(y.CheckIcon,{className:"h-6 w-6 text-green-900","aria-hidden":"true"})}),a("div",{className:"mt-3 text-center sm:mt-5",children:[e(i.Title,{as:"h3",className:"text-lg leading-6 font-medium text-gray-900 capitalize ",children:r("confirmation")}),s&&s.length>10&&e("div",{className:"mt-2",children:e("p",{className:"text-sm text-gray-900 capitalize",children:s})})]})]}),a("div",{className:"mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense capitalize",children:[e("a",{className:"w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 font-bold text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:col-start-2 sm:text-sm",href:h(d,{order_id:f}),onClick:()=>l(g()),children:r("confirm")}),e("button",{type:"button",className:"mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-900 text-white font-bold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:col-start-1 sm:text-sm",onClick:()=>c(),ref:o,children:r("cancel")})]})]})})]})})})}export{k as default};
