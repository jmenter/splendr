(this.webpackJsonpsplendr=this.webpackJsonpsplendr||[]).push([[0],{42:function(e,t,r){e.exports=r(86)},47:function(e,t,r){},77:function(e,t){},80:function(e,t,r){},81:function(e,t,r){},82:function(e,t,r){},83:function(e,t,r){},84:function(e,t,r){},85:function(e,t,r){},86:function(e,t,r){"use strict";r.r(t);var o,n,a,c,i=r(0),l=r.n(i),u=r(39),s=r.n(u),p=(r(47),r(5)),m=r(6),h=r(15),d=r(14),b=r(3),g=r(2),v=(r(10),r(1)),f=(o=function(){function e(t,r){Object(p.a)(this,e),this.id=void 0,Object(b.a)(this,"name",n,this),Object(b.a)(this,"chips",a,this),Object(b.a)(this,"tempChips",c,this),this.tableau=[],this.reserveCards=[],this.id=t,this.name=r}return Object(m.a)(e,[{key:"costReductionFor",value:function(e){return this.tableau.filter((function(t){return t.color===e})).length}},{key:"buyingPowerForColor",value:function(e){return(this.chips.get(e)||0)+this.tableau.filter((function(t){return t.color===e})).length}},{key:"canBuyCard",value:function(e){var t=this,r=0;e.costs.forEach((function(e){var o=t.buyingPowerForColor(e.color);e.amount>o&&(r+=e.amount-o)}));var o=this.chips.get("wild")||0;return r-o<=0}},{key:"saveTempChips",value:function(){var e=this;this.tempChips.forEach((function(t){var r=e.chips.get(t)||0;e.chips.set(t,r+1)})),this.tempChips=[]}},{key:"addChip",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(r)this.tempChips.push(e);else{var o=this.chips.get(e)||0;this.chips.set(e,o+t)}}},{key:"removeChip",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(r){var o=this.tempChips.indexOf(e);this.tempChips.splice(o,1)}var n=this.chips.get(e);n&&(console.log("removing chip",e,n,t),n>=t?this.chips.set(e,n-t):this.chips.set(e,0))}},{key:"getChipCount",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e)return this.tempChips.length;var t=Array.from(this.chips.values());return t.length?t.reduce((function(e,t){return e+t})):0}},{key:"canReserveCard",get:function(){return this.reserveCards.length<3}},{key:"chipCount",get:function(){return this.getChipCount()}},{key:"tempChipCount",get:function(){return this.getChipCount(!0)}},{key:"hasTempChips",get:function(){return this.tempChipCount>0}}]),e}(),n=Object(g.a)(o.prototype,"name",[v.n],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=Object(g.a)(o.prototype,"chips",[v.n],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new Map}}),c=Object(g.a)(o.prototype,"tempChips",[v.n],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),Object(g.a)(o.prototype,"canReserveCard",[v.g],Object.getOwnPropertyDescriptor(o.prototype,"canReserveCard"),o.prototype),Object(g.a)(o.prototype,"chipCount",[v.g],Object.getOwnPropertyDescriptor(o.prototype,"chipCount"),o.prototype),Object(g.a)(o.prototype,"tempChipCount",[v.g],Object.getOwnPropertyDescriptor(o.prototype,"tempChipCount"),o.prototype),Object(g.a)(o.prototype,"hasTempChips",[v.g],Object.getOwnPropertyDescriptor(o.prototype,"hasTempChips"),o.prototype),Object(g.a)(o.prototype,"removeChip",[v.f],Object.getOwnPropertyDescriptor(o.prototype,"removeChip"),o.prototype),o),y=[{pointValue:3,cardRequirements:[{color:"blue",amount:4},{color:"white",amount:4}]},{pointValue:3,cardRequirements:[{color:"blue",amount:4},{color:"green",amount:4}]},{pointValue:3,cardRequirements:[{color:"black",amount:4},{color:"red",amount:4}]},{pointValue:3,cardRequirements:[{color:"red",amount:4},{color:"green",amount:4}]},{pointValue:3,cardRequirements:[{color:"black",amount:4},{color:"white",amount:4}]},{pointValue:3,cardRequirements:[{color:"black",amount:3},{color:"blue",amount:3},{color:"white",amount:3}]},{pointValue:3,cardRequirements:[{color:"black",amount:3},{color:"red",amount:3},{color:"white",amount:3}]},{pointValue:3,cardRequirements:[{color:"black",amount:3},{color:"red",amount:3},{color:"green",amount:3}]},{pointValue:3,cardRequirements:[{color:"green",amount:3},{color:"blue",amount:3},{color:"red",amount:3}]},{pointValue:3,cardRequirements:[{color:"green",amount:3},{color:"blue",amount:3},{color:"white",amount:3}]}],C=r(41);function k(e){return e.map((function(e){return{sort:Math.random(),value:e}})).sort((function(e,t){return e.sort-t.sort})).map((function(e){return e.value}))}var O,w,j,E,V,P,S,N,R,T,z,H,I,q,F,x,D,M=[{color:"white",pointValue:1,tier:1,costs:[{color:"green",amount:4}]},{color:"blue",pointValue:1,tier:1,costs:[{color:"red",amount:4}]},{color:"green",pointValue:1,tier:1,costs:[{color:"black",amount:4}]},{color:"red",pointValue:1,tier:1,costs:[{color:"white",amount:4}]},{color:"black",pointValue:1,tier:1,costs:[{color:"blue",amount:4}]},{color:"white",pointValue:0,tier:1,costs:[{color:"red",amount:2},{color:"black",amount:1}]},{color:"blue",pointValue:0,tier:1,costs:[{color:"white",amount:1},{color:"black",amount:2}]},{color:"green",pointValue:0,tier:1,costs:[{color:"white",amount:2},{color:"blue",amount:1}]},{color:"red",pointValue:0,tier:1,costs:[{color:"blue",amount:2},{color:"green",amount:1}]},{color:"black",pointValue:0,tier:1,costs:[{color:"green",amount:2},{color:"red",amount:1}]},{color:"white",pointValue:0,tier:1,costs:[{color:"blue",amount:3}]},{color:"blue",pointValue:0,tier:1,costs:[{color:"black",amount:3}]},{color:"green",pointValue:0,tier:1,costs:[{color:"red",amount:3}]},{color:"red",pointValue:0,tier:1,costs:[{color:"white",amount:3}]},{color:"black",pointValue:0,tier:1,costs:[{color:"green",amount:3}]},{color:"white",pointValue:0,tier:1,costs:[{color:"blue",amount:1},{color:"green",amount:1},{color:"red",amount:1},{color:"black",amount:1}]},{color:"blue",pointValue:0,tier:1,costs:[{color:"white",amount:1},{color:"green",amount:1},{color:"red",amount:1},{color:"black",amount:1}]},{color:"green",pointValue:0,tier:1,costs:[{color:"white",amount:1},{color:"blue",amount:1},{color:"red",amount:1},{color:"black",amount:1}]},{color:"red",pointValue:0,tier:1,costs:[{color:"white",amount:1},{color:"blue",amount:1},{color:"green",amount:1},{color:"black",amount:1}]},{color:"black",pointValue:0,tier:1,costs:[{color:"white",amount:1},{color:"blue",amount:1},{color:"green",amount:1},{color:"red",amount:1}]},{color:"white",pointValue:0,tier:1,costs:[{color:"blue",amount:2},{color:"black",amount:2}]},{color:"blue",pointValue:0,tier:1,costs:[{color:"green",amount:2},{color:"black",amount:2}]},{color:"green",pointValue:0,tier:1,costs:[{color:"blue",amount:2},{color:"red",amount:2}]},{color:"red",pointValue:0,tier:1,costs:[{color:"white",amount:2},{color:"red",amount:2}]},{color:"black",pointValue:0,tier:1,costs:[{color:"white",amount:2},{color:"green",amount:2}]}],A=[{color:"red",pointValue:3,tier:2,costs:[{color:"white",amount:3},{color:"blue",amount:5},{color:"green",amount:3},{color:"black",amount:3}]},{color:"red",pointValue:3,tier:2,costs:[{color:"white",amount:3},{color:"blue",amount:5},{color:"green",amount:3},{color:"black",amount:3}]},{color:"red",pointValue:3,tier:2,costs:[{color:"white",amount:3},{color:"blue",amount:5},{color:"green",amount:3},{color:"black",amount:3}]},{color:"red",pointValue:3,tier:2,costs:[{color:"white",amount:3},{color:"blue",amount:5},{color:"green",amount:3},{color:"black",amount:3}]}],J=[{color:"white",pointValue:3,tier:3,costs:[{color:"blue",amount:3},{color:"green",amount:3},{color:"red",amount:5},{color:"black",amount:3}]},{color:"blue",pointValue:3,tier:3,costs:[{color:"white",amount:3},{color:"green",amount:3},{color:"red",amount:3},{color:"black",amount:5}]},{color:"green",pointValue:3,tier:3,costs:[{color:"white",amount:5},{color:"blue",amount:3},{color:"red",amount:3},{color:"black",amount:3}]},{color:"red",pointValue:3,tier:3,costs:[{color:"white",amount:3},{color:"blue",amount:5},{color:"green",amount:3},{color:"black",amount:3}]},{color:"black",pointValue:3,tier:3,costs:[{color:"white",amount:3},{color:"blue",amount:3},{color:"green",amount:5},{color:"red",amount:3}]},{color:"white",pointValue:4,tier:3,costs:[{color:"black",amount:7}]},{color:"black",pointValue:4,tier:3,costs:[{color:"red",amount:7}]},{color:"blue",pointValue:4,tier:3,costs:[{color:"white",amount:7}]},{color:"red",pointValue:4,tier:3,costs:[{color:"green",amount:7}]},{color:"green",pointValue:4,tier:3,costs:[{color:"blue",amount:7}]},{color:"red",pointValue:4,tier:3,costs:[{color:"blue",amount:3},{color:"green",amount:6},{color:"red",amount:3}]},{color:"black",pointValue:4,tier:3,costs:[{color:"green",amount:3},{color:"red",amount:6},{color:"black",amount:3}]}],B=["white","blue","green","red","black"],G=(O=function(){function e(t){Object(p.a)(this,e),this.players=[],Object(b.a)(this,"chipStacks",w,this),Object(b.a)(this,"cardStacks",j,this),Object(b.a)(this,"nobles",E,this),Object(b.a)(this,"currentRound",V,this),Object(b.a)(this,"currentPlayerIndex",P,this),Object(b.a)(this,"singleChipHandler",S,this),Object(b.a)(this,"doubleChipHandler",N,this),Object(b.a)(this,"purchaseHandler",R,this),Object(b.a)(this,"returnChipHandler",T,this),Object(b.a)(this,"reserveHandler",z,this),this.initializePlayers(t),this.initializeChips(4===t?7:t+2),this.initializeCards(),this.initializeNobles(t+1)}return Object(m.a)(e,[{key:"initializePlayers",value:function(e){var t,r,o=this;t=e,r=function(e){o.players.push(new f(e+1,"player"))},Object(C.a)(Array(t)).forEach((function(e,t){r(t)}))}},{key:"initializeChips",value:function(e){var t=this;B.forEach((function(r){t.chipStacks.set(r,e)})),this.chipStacks.set("wild",5)}},{key:"initializeCards",value:function(){this.cardStacks.set(1,k(M)),this.cardStacks.set(2,k(A)),this.cardStacks.set(3,k(J))}},{key:"initializeNobles",value:function(e){this.nobles=k(y).splice(0,e)}},{key:"playerCanPurchase",value:function(e){return!this.currentPlayer.hasTempChips&&this.currentPlayer.canBuyCard(e)}},{key:"removeChips",value:function(e,t){var r=(this.chipStacks.get(e)||0)-t;this.chipStacks.set(e,r<0?0:r)}},{key:"addChips",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=this.chipStacks.get(e)||0;this.chipStacks.set(e,r+t)}},{key:"chipColorForId",value:function(e){return e.split("-")[0]}},{key:"endPlayerTurn",value:function(){this.currentPlayerIndex++,this.currentPlayerIndex>=this.players.length&&(this.currentRound++,this.currentPlayerIndex=0)}},{key:"currentPlayer",get:function(){return this.players[this.currentPlayerIndex]}},{key:"playerCanReserve",get:function(){return!this.currentPlayer.hasTempChips&&this.currentPlayer.canReserveCard}}]),e}(),w=Object(g.a)(O.prototype,"chipStacks",[v.n],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new Map}}),j=Object(g.a)(O.prototype,"cardStacks",[v.n],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new Map}}),E=Object(g.a)(O.prototype,"nobles",[v.n],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),V=Object(g.a)(O.prototype,"currentRound",[v.n],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),P=Object(g.a)(O.prototype,"currentPlayerIndex",[v.n],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),Object(g.a)(O.prototype,"currentPlayer",[v.g],Object.getOwnPropertyDescriptor(O.prototype,"currentPlayer"),O.prototype),Object(g.a)(O.prototype,"playerCanReserve",[v.g],Object.getOwnPropertyDescriptor(O.prototype,"playerCanReserve"),O.prototype),S=Object(g.a)(O.prototype,"singleChipHandler",[v.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){var r=e.chipColorForId(t.currentTarget.id);e.removeChips(r,1),e.currentPlayer.addChip(r,1,!0),e.currentPlayer.tempChipCount>=3&&(e.currentPlayer.saveTempChips(),e.endPlayerTurn())}}}),N=Object(g.a)(O.prototype,"doubleChipHandler",[v.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){var r=e.chipColorForId(t.currentTarget.id);e.removeChips(r,2),e.currentPlayer.addChip(r,2),e.endPlayerTurn()}}}),R=Object(g.a)(O.prototype,"purchaseHandler",[v.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){var r=t.currentTarget.id.split("-"),o=Number(r[0]),n=Number(r[1]),a=e.cardStacks.get(o);if(a){var c=a.splice(n,1)[0],i=0;c.costs.forEach((function(t){var r=e.currentPlayer.costReductionFor(t.color),o=t.amount-r,n=e.currentPlayer.chips.get(t.color)||0;o>n&&(i+=o-n);var a=o>=0?o:0;e.currentPlayer.removeChip(t.color,a),e.addChips(t.color,a)})),i&&(e.currentPlayer.removeChip("wild",i),e.addChips("wild",i)),e.currentPlayer.tableau.push(c),e.endPlayerTurn()}else e.endPlayerTurn()}}}),T=Object(g.a)(O.prototype,"returnChipHandler",[v.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){var r=e.chipColorForId(t.currentTarget.id);console.log("returning ",t.currentTarget.id),e.currentPlayer.removeChip(r,1,!0),e.addChips(r,1)}}}),z=Object(g.a)(O.prototype,"reserveHandler",[v.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){var r=t.currentTarget.id.split("-"),o=Number(r[0]),n=Number(r[1]),a=e.cardStacks.get(o);if(a){var c=a.splice(n,1)[0];e.currentPlayer.reserveCards.push(c);var i=e.chipStacks.get("wild");i&&i>0&&(e.chipStacks.set("wild",i-1),e.currentPlayer.addChip("wild")),e.endPlayerTurn()}}}}),O),K=r(40),L=r.n(K),Q=r(88),U=(H=function(){function e(t){var r=this;Object(p.a)(this,e),this.socket=void 0,Object(b.a)(this,"clientId",I,this);var o=document.cookie;console.log(o),console.log(Object(Q.a)()),this.socket=L()(t),this.socket.on("connect",(function(){console.log("connected to server"),r.socket.emit("message","hi from me")}))}return Object(m.a)(e,[{key:"sendMessage",value:function(e){this.socket.emit("message",e)}},{key:"configureClientId",value:function(){}}]),e}(),I=Object(g.a)(H.prototype,"clientId",[v.n],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),H),W={gameStore:new function e(){Object(p.a)(this,e),this.game=new G(3)},client:new U("http://localhost:8080")},X=r(8),Y=r(13),Z=(r(80),Object(X.a)((F=function(e){Object(h.a)(r,e);var t=Object(d.a)(r);function r(){var e;Object(p.a)(this,r);for(var o=arguments.length,n=new Array(o),a=0;a<o;a++)n[a]=arguments[a];return e=t.call.apply(t,[this].concat(n)),Object(b.a)(e,"name",x,Object(Y.a)(e)),e.handleChange=function(t){e.name=t.target.value},e.handleSubmit=function(t){e.props.player.name=e.name,t.preventDefault()},e}return Object(m.a)(r,[{key:"render",value:function(){var e=this.props.player,t=W.gameStore.game.currentPlayer===this.props.player?"active":"";return l.a.createElement("div",{className:"PlayerComponent"},l.a.createElement("div",{className:t},l.a.createElement("div",null,"player ",e.name),l.a.createElement("div",null,"id ",e.id),l.a.createElement("div",null,"chips (",e.chipCount,") ",JSON.stringify(e.chips)),l.a.createElement("div",null,"tempchips (",e.tempChipCount,")",JSON.stringify(e.tempChips)),l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement("label",null,"change name:",l.a.createElement("input",{type:"text",value:this.name,onChange:this.handleChange})))))}}]),r}(l.a.Component),x=Object(g.a)(F.prototype,"name",[v.n],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),q=F))||q),$=(r(81),function(e){return l.a.createElement("div",{className:"NobleComponent"},l.a.createElement("div",{className:"point-value"},e.noble.pointValue),e.noble.cardRequirements.map((function(e){return l.a.createElement("div",{className:"requirement "+e.color},e.amount)})))}),_=(r(82),Object(X.a)((function(e){var t=W.gameStore.game,r=t.cardStacks.get(e.cardCostTier);if(!r)return l.a.createElement("div",null);var o=r.length-4,n=o>0?o:0,a=r.slice(0,4);return l.a.createElement("div",{className:"CardStackComponent"},l.a.createElement("div",{className:"card remaining"},n," cards remaining"),a.map((function(r,o){var n=t.playerCanPurchase(r),a="".concat(e.cardCostTier,"-").concat(o);return l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"point-value"},r.pointValue>0?r.pointValue:"\xa0"),l.a.createElement("div",{className:"indicator"},l.a.createElement("div",{className:"color-indicator "+r.color}," ")),l.a.createElement("div",{className:"costs"},r.costs.map((function(e){return l.a.createElement("div",{className:"cost ".concat(e.color)},e.amount)}))),l.a.createElement("div",{className:"actions"},l.a.createElement("button",{id:a,onClick:t.reserveHandler,disabled:!t.playerCanReserve},"hold"),l.a.createElement("button",{id:a,onClick:t.purchaseHandler,disabled:!n},"buy")))})))}))),ee=(r(83),Object(X.a)((function(){var e=W.gameStore.game,t=e.currentPlayer,r=Array.from(e.chipStacks.keys());return l.a.createElement("div",{className:"ChipStackComponent"},l.a.createElement("div",{className:"temp-chips"},"temp chips:",l.a.createElement("br",null),t.tempChips.map((function(t){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"chip-stack ".concat(t)},"1"),l.a.createElement("button",{id:"".concat(t,"-temp-chip"),onClick:e.returnChipHandler},"return"))}))),r.map((function(r){var o,n=e.chipStacks.get(r)||0,a=(null===(o=t.tempChips.find((function(e){return e===r})))||void 0===o?void 0:o.length)?1:0,c=n&&0===a,i=n>=4&&!t.tempChipCount;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"chip-stack ".concat(r)},n),"wild"!==r&&l.a.createElement(l.a.Fragment,null,l.a.createElement("button",{id:"".concat(r,"-1"),disabled:!c,onClick:e.singleChipHandler},"grab 1"),l.a.createElement("button",{id:"".concat(r,"-2"),disabled:!i,onClick:e.doubleChipHandler},"grab 2")))})))}))),te=(r(84),Object(X.a)(D=function(e){Object(h.a)(r,e);var t=Object(d.a)(r);function r(){return Object(p.a)(this,r),t.apply(this,arguments)}return Object(m.a)(r,[{key:"render",value:function(){var e=W.gameStore.game;return l.a.createElement("div",{className:"GameComponent"},l.a.createElement("div",null,"round #",e.currentRound,", players:",e.players.map((function(e){return l.a.createElement(Z,{player:e})}))),l.a.createElement("div",null,"chips:",l.a.createElement(ee,null)),l.a.createElement("div",null,"cards:",l.a.createElement(_,{cardCostTier:1}),l.a.createElement(_,{cardCostTier:2}),l.a.createElement(_,{cardCostTier:3})),l.a.createElement("div",null,"nobles:",e.nobles.map((function(e){return l.a.createElement($,{noble:e})}))))}}]),r}(l.a.Component))||D);var re=function(){return l.a.createElement("div",{className:"App"},l.a.createElement("div",null,"it not splendor"),l.a.createElement(te,null))};r(85);s.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(re,null)),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.2f4b0508.chunk.js.map