(this["webpackJsonpcom.fosscord.client"]=this["webpackJsonpcom.fosscord.client"]||[]).push([[1],{38:function(e,t,n){"use strict";(function(e){var c=n(10),a=n(12),r=n(46),o=n(39),i=[e.__REDUX_DEVTOOLS_EXTENSION__?e.__REDUX_DEVTOOLS_EXTENSION__():void 0,Object(a.a)(o.a)].filter((function(e){return void 0!==e}));t.a=Object(a.e)(r.a,a.d.apply(void 0,Object(c.a)(i)))}).call(this,n(18))},46:function(e,t,n){"use strict";var c=n(12),a=n(10);var r={id:"0",config:{},invite:"discord.gg",api:"discord.com/api/v8",cdn:"cdn.discordapp.com",host:"discord.com",icon:"https://logopng.net/wp-content/uploads/2020/07/logo-discord-png-icon-6.png",version:8};t.a=Object(c.c)({accounts:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_ACCOUNT":return[].concat(Object(a.a)(e),[t.payload]);case"REMOVE_ACCOUNT":return e.filter((function(e){return e!==t.payload}));default:return e}},instances:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[r,{host:"test",id:"1"}],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_INSTANCE":return[].concat(Object(a.a)(e),[t.payload]);case"REMOVE_INSTANCE":return e.filter((function(e){return e!==t.payload}));default:return e}},users:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_USER":return[].concat(Object(a.a)(e),[t.payload]);case"ADD_USERS":return[].concat(Object(a.a)(e),Object(a.a)(t.payload));case"REMOVE_USER":case"REMOVE_USERS":return e.filter((function(e){return e!==t.payload}));case"UPDATE_USER":var n=Object(a.a)(e);return n.find((function(e){return e===t.payload})),n;default:return e}}})},52:function(e,t,n){},72:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(23),o=n.n(r),i=(n(52),n(35)),s=n(38),l=n(34),u=n(2),d=n(5),p=n(6),h=n(17),f=n(47),j=n(3),O=function(e){Object(h.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(d.a)(this,n);for(var c=arguments.length,a=new Array(c),r=0;r<c;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).state={hasError:!1},e}return Object(p.a)(n,[{key:"componentDidCatch",value:function(e,t){console.log(e,t)}},{key:"render",value:function(){return this.state.hasError?Object(j.jsx)("div",{className:"text danger",children:"Something went wrong."}):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}]),n}(a.a.Component),b=n(33),v=n(22),g=n(40),E=n(42);b.a.use(g.a).use(E.a).use(v.e).init({fallbackLng:"en",interpolation:{escapeValue:!1}});b.a;var y=a.a.lazy((function(){return n.e(5).then(n.bind(null,95))})),_=a.a.lazy((function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,97))})),m=a.a.lazy((function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,98))})),S=a.a.lazy((function(){return n.e(7).then(n.bind(null,96))}));var x=function(){return Object(j.jsx)(c.StrictMode,{children:Object(j.jsx)(i.a,{store:s.a,children:Object(j.jsx)(O,{children:Object(j.jsx)(c.Suspense,{fallback:Object(j.jsx)("div",{className:"text"}),children:Object(j.jsx)(l.a,{children:Object(j.jsxs)(u.c,{children:[Object(j.jsx)(u.a,{exact:!0,path:"/register",component:m}),Object(j.jsx)(u.a,{path:"/login",component:_}),Object(j.jsx)(u.a,{exact:!0,path:"/",component:y}),Object(j.jsx)(u.a,{component:S})]})})})})})})},D=function(){o.a.render(Object(j.jsx)(x,{}),document.getElementById("root"))};(function(e){e&&e instanceof Function&&n.e(0).then(n.bind(null,84)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),r(e),o(e)}))})(console.log),window.cordova?document.addEventListener("deviceready",(function(){console.log("device ready"),D()}),!1):D()}},[[72,2,0]]]);
//# sourceMappingURL=main.9f92a12a.chunk.js.map