(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{fKQb:function(e,t,n){"use strict";n.r(t),n.d(t,"AboutModule",function(){return A});var c=n("xeKK"),a=n("tyNb"),o=n("fXoL"),r=n("Wp6s"),s=n("+0xr"),i=n("tB3w");class l{constructor(e,t){this.name=e,this.version=t}}function m(e,t){1&e&&(o.Rb(0,"mat-header-cell"),o.yc(1," \u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435 "),o.Qb())}function u(e,t){if(1&e&&(o.Rb(0,"mat-cell"),o.yc(1),o.Qb()),2&e){const e=t.$implicit;o.Ab(1),o.Ac(" ",e.name," ")}}function b(e,t){1&e&&(o.Rb(0,"mat-header-cell"),o.yc(1," \u0412\u0435\u0440\u0441\u0438\u044f "),o.Qb())}function d(e,t){if(1&e&&(o.Rb(0,"mat-cell"),o.yc(1),o.Qb()),2&e){const e=t.$implicit;o.Ab(1),o.Ac(" ",e.version," ")}}function f(e,t){1&e&&o.Mb(0,"mat-header-row")}function p(e,t){1&e&&o.Mb(0,"mat-row")}let w=(()=>{class e{constructor(){this.displayedColumns=["name","version"],this.dataSource=new s.k(Object.keys(i.a.versions).map(e=>new l(e,i.a.versions[e])))}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=o.Fb({type:e,selectors:[["app-toolchain"]],decls:10,vars:3,consts:[[3,"dataSource"],["table",""],["matColumnDef","name"],[4,"matHeaderCellDef"],[4,"matCellDef"],["matColumnDef","version"],[4,"matHeaderRowDef"],[4,"matRowDef","matRowDefColumns"]],template:function(e,t){1&e&&(o.Rb(0,"mat-table",0,1),o.Pb(2,2),o.xc(3,m,2,0,"mat-header-cell",3),o.xc(4,u,2,1,"mat-cell",4),o.Ob(),o.Pb(5,5),o.xc(6,b,2,0,"mat-header-cell",3),o.xc(7,d,2,1,"mat-cell",4),o.Ob(),o.xc(8,f,1,0,"mat-header-row",6),o.xc(9,p,1,0,"mat-row",7),o.Qb()),2&e&&(o.ic("dataSource",t.dataSource),o.Ab(8),o.ic("matHeaderRowDef",t.displayedColumns),o.Ab(1),o.ic("matRowDefColumns",t.displayedColumns))},directives:[s.j,s.c,s.e,s.b,s.g,s.i,s.d,s.a,s.f,s.h],styles:[""]}),e})();const y=[{path:"",component:(()=>{class e{constructor(){}ngOnInit(){this.userAgent=window.navigator.userAgent}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=o.Fb({type:e,selectors:[["ng-component"]],inputs:{userAgent:"userAgent"},decls:7,vars:1,template:function(e,t){1&e&&(o.Rb(0,"mat-card"),o.Rb(1,"mat-card-title"),o.yc(2,"\u0418\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b"),o.Qb(),o.Rb(3,"mat-card-content"),o.Mb(4,"app-toolchain"),o.Rb(5,"p"),o.yc(6),o.Qb(),o.Qb(),o.Qb()),2&e&&(o.Ab(6),o.Ac("\u0411\u0440\u0430\u0443\u0437\u0435\u0440: ",t.userAgent,""))},directives:[r.a,r.d,r.b,w],styles:[""]}),e})()}];let h=(()=>{class e{}return e.\u0275mod=o.Jb({type:e}),e.\u0275inj=o.Ib({factory:function(t){return new(t||e)},imports:[[a.d.forChild(y)],a.d]}),e})(),A=(()=>{class e{}return e.\u0275mod=o.Jb({type:e}),e.\u0275inj=o.Ib({factory:function(t){return new(t||e)},imports:[[h,c.a]]}),e})()}}]);