(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[88],{3479:function(e,n,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/viajes/travelDetail",function(){return i(2590)}])},8666:function(e,n,i){"use strict";i.r(n);var t=i(5893),r=i(2636),a=i(5451),c=i(1163);n.default=function(){var e=(0,c.useRouter)();return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(r.Z,{icon:a.t,height:48,marginTop:18,marginLeft:20,marginBottom:18,onClick:function(){return e.push("/")}})})}},499:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return c}});var t=i(5893),r=i(6811),a=i(1383);function c(){return(0,t.jsx)(r.Z,{display:"flex",alignItems:"center",justifyContent:"center",height:400,children:(0,t.jsx)(a.Z,{})})}},290:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return A}});var t=i(5893),r=i(6811),a=i(3712),c=i(1898),s=i(1016),l=i(3171),o=i(1163),d=i(7294),u=i(9918);function A(){var e=function(){u.W4.logout()},n=(0,o.useRouter)(),i=(0,d.useState)(null),A=i[0],h=i[1];return(0,d.useEffect)((function(){var e=u.W4.user.subscribe((function(e){return h(e)}));return function(){return e.unsubscribe()}}),[]),(0,t.jsx)(t.Fragment,{children:A?(0,t.jsx)(r.Z,{display:"flex",padding:15,justifyContent:"flex-end",children:(0,t.jsxs)(a.Z,{backgroundColor:"white",elevation:1,height:50,width:300,display:"flex",alignItems:"center",justifyContent:"space-around",children:[(0,t.jsx)(c.ZP,{appearance:"primary",intent:"success",height:36,onClick:function(){return n.push("/user/userProfile")},iconAfter:s.t,children:"Mi Cuenta"}),(0,t.jsx)(c.ZP,{appearance:"primary",intent:"danger",height:36,onClick:e,iconAfter:l.t,children:"Desconectar"})]})}):(0,t.jsx)(r.Z,{display:"flex",padding:15,justifyContent:"flex-end",children:(0,t.jsx)(a.Z,{backgroundColor:"white",elevation:0,height:50,width:160,display:"flex",alignItems:"center",justifyContent:"space-around",children:(0,t.jsx)(c.ZP,{appearance:"primary",intent:"success",height:36,onClick:function(){return n.push("/login")},iconAfter:l.t,children:"Conectar"})})})})}},2590:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return Z}});var t=i(4051),r=i.n(t),a=i(5893),c=i(4693),s=i(9824),l=i(6811),o=i(3712),d=i(3646),u=i(7117),A=i(1898),h=i(499),f=(i(290),i(8666),i(1358)),x=i(8030),g=i(7294),p=i(5675),m={src:"/_next/static/media/iconseat.5a82c45b.png",height:64,width:64,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAVUlEQVR42h3HMQqAMBQE0bHQRsE7iIIgWNlZmC7pbMwRcv8rOPx5zS50QOZWBp/1VEZVVzSQeZRd0U6hV3FFG4lXyRUdzKyaXdHJwqXFFU00PjUm+AEchAiJuncnGwAAAABJRU5ErkJggg=="},j={src:"/_next/static/media/iconseatSelected.a609fe47.png",height:64,width:64,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAY1BMVEW/AAC+AAC/AAC+AAC/AAC+AAC/AAC/AAC+AAC/AAC/AAC/AAC+AAC+AAC+AAC/AAC/AAC+AAC/AAC+AAC/AAC/AAC+AAC/AAC/AAC/AAC+AAC/AAC/AAC+AAC+AAC/AAC/AAC5e2vgAAAAIXRSTlMAAAEBBQUGCwsMDyIiJCUoKysuLjQ7Oz9AR0dIT09UVWUvS6r+AAAASElEQVR42g3J2xaAEBRF0X0KRaGLciv8/1fytsaamJDeJ9IMYnVdKidARO+TAMhmxrMdx4T/CwbAqbRWx4h7d267BslWSpPUAXH7A1FmSPNoAAAAAElFTkSuQmCC"};i(7041);function C(e,n,i,t,r,a,c){try{var s=e[a](c),l=s.value}catch(o){return void i(o)}s.done?n(l):Promise.resolve(l).then(t,r)}var Z=function(e){var n,i=function(e){return e===T?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c.Z,{children:e<9?"0".concat(e+1):e+1}),(0,a.jsx)(p.default,{alt:"Seat",src:j,width:48,height:48,fill:"red"},e.x)]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c.Z,{children:e<9?"0".concat(e+1):e+1}),(0,a.jsx)(p.default,{alt:"Sea Blanck",src:m,width:48,height:48,fill:"red"},e.x)]})},t=(0,g.useState)(!0),Z=t[0],y=t[1],v=(0,g.useState)(""),w=v[0],S=v[1],D=(0,g.useState)(Array(40)),b=D[0],E=(D[1],(0,g.useState)("")),T=E[0],I=E[1],R=(0,g.useState)(""),k=R[0],U=R[1],B=(0,g.useState)(""),P=(B[0],B[1]),V=function(){var n,i=(n=r().mark((function n(i){var t,a;return r().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:try{t=e.travelData.info,a=e.travelData.fecha,S(t),U(a),P(e.travelData.code)}catch(i){s.Z.danger(i.message)}finally{y(!1)}case 1:case"end":return n.stop()}}),n)})),function(){var e=this,i=arguments;return new Promise((function(t,r){var a=n.apply(e,i);function c(e){C(a,t,r,c,s,"next",e)}function s(e){C(a,t,r,c,s,"throw",e)}c(void 0)}))});return function(e){return i.apply(this,arguments)}}();return(0,g.useEffect)((function(){V()})),(0,a.jsx)(a.Fragment,{children:Z?(0,a.jsx)(h.default,{}):(0,a.jsxs)(l.Z,{border:"default",display:"flex",width:"100%",height:"90vh",flexDirection:"column",children:[(0,a.jsxs)(l.Z,{flexDirection:"row",display:"flex",children:[(0,a.jsxs)(o.Z,{elevation:1,height:140,width:"50%",border:"default",margin:10,padding:10,display:"flex",flexDirection:"column",alignItems:"center",children:[(0,a.jsx)(d.Z,{size:600,marginTop:10,children:"Trayectoria"}),(0,a.jsxs)(l.Z,{display:"flex",flexDirection:"row",justifyContent:"space-around",marginTop:20,width:"100%",children:[(0,a.jsxs)(l.Z,{display:"flex",flexDirection:"column",alignItems:"center",children:[(0,a.jsx)(d.Z,{children:"Origen"}),(0,a.jsx)(c.Z,{children:w.origen})]}),(0,a.jsx)(f.L,{size:24,marginTop:10}),(0,a.jsxs)(l.Z,{display:"flex",flexDirection:"column",alignItems:"center",children:[(0,a.jsx)(d.Z,{children:"Destino"}),(0,a.jsx)(c.Z,{children:w.destino})]})]})]}),(0,a.jsxs)(o.Z,{elevation:1,height:140,width:"50%",border:"default",margin:10,padding:10,display:"flex",flexDirection:"column",alignItems:"center",children:[(0,a.jsx)(d.Z,{size:600,marginTop:10,children:"Detalles"}),(0,a.jsxs)(l.Z,{display:"flex",flexDirection:"row",justifyContent:"space-around",marginTop:20,width:"100%",children:[(0,a.jsxs)(l.Z,{display:"flex",flexDirection:"column",alignItems:"center",children:[(0,a.jsx)(d.Z,{children:"Hora de Salida"}),(0,a.jsx)(c.Z,{children:(n=w.horaSalida,n.toString().slice(0,2)+":"+n.toString().slice(2,4))})]}),(0,a.jsxs)(l.Z,{display:"flex",flexDirection:"column",alignItems:"center",children:[(0,a.jsx)(d.Z,{children:"Costo de Pasaje"}),(0,a.jsxs)(c.Z,{children:["$",w.costoViaje]})]})]})]})]}),(0,a.jsxs)(o.Z,{elevation:1,alignItems:"center",display:"flex",height:"75%",width:"90%",marginLeft:28,marginTop:20,flexDirection:"column",children:[(0,a.jsx)(d.Z,{size:600,marginTop:20,marginBottom:30,children:"Seleccione un Asiento disponible"}),(0,a.jsxs)(l.Z,{display:"flex",justifyContent:"space-around",children:[(0,a.jsx)(l.Z,{display:"flex",flexDirection:"row",flexWrap:"wrap",width:"50%",children:Array.apply(null,b).map((function(e,n){return(0,a.jsx)(o.Z,{onClick:function(){return function(e){I(e===T?"":e)}(n)},children:i(n)},n.toString())}))}),(0,a.jsxs)(l.Z,{display:"flex",flexDirection:"column",alignItems:"center",children:[(0,a.jsx)(c.Z,{marginTop:40,children:"N\xba seleccionado"}),(0,a.jsx)(u.Z,{color:"muted",size:900,marginTop:10,children:""===T?0:T+1}),(0,a.jsx)(A.ZP,{appearance:"primary",marginTop:330,onClick:function(){return function(){if(""!==T){var n="".concat(T+1).concat(w.origen.slice(0,3)).concat(w.destino.slice(0,3)).concat(w.horaSalida).concat(k);P(n),e.parentCallBack(w,k,T+1,n)}else s.Z.danger("Debe seleccionar un asiento")}()},children:"Agregar"}),(0,a.jsx)(A.ZP,{appearance:"primary",iconAfter:x.Y,onClick:function(){return console.log(T)},intent:"danger",marginTop:10,children:"Volver"})]})]})]})]})})}}},function(e){e.O(0,[655,898,385,582,365,824,386,970,774,888,179],(function(){return n=3479,e(e.s=n);var n}));var n=e.O();_N_E=n}]);