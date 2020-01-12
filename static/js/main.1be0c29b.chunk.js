(this["webpackJsonpvincent-dang-project-five"]=this["webpackJsonpvincent-dang-project-five"]||[]).push([[0],{33:function(e,a,t){e.exports=t(74)},38:function(e,a,t){},39:function(e,a,t){},74:function(e,a,t){"use strict";t.r(a);var l=t(0),n=t.n(l),r=t(17),c=t.n(r),i=(t(38),t(32)),s=t(4),m=t(5),o=t(7),u=t(6),d=t(8),E=(t(39),t(10)),h=t.n(E),p=t(2),v=t(30),y=function(e){function a(){var e;return Object(s.a)(this,a),(e=Object(o.a)(this,Object(u.a)(a).call(this))).handleChange=function(a){var t=e.props.stockList,l=a.target.value,n=t.filter((function(e){return!e.symbol.toUpperCase().indexOf(l.toUpperCase())}));e.setState({activeSuggestion:0,filteredSuggestions:n,showSuggestions:!0,userInput:a.target.value})},e.handleSubmit=function(a){a.preventDefault();var t=e.state.userInput.toUpperCase();""!==t&&(e.props.searchStockEquity(a,t),e.setState({userInput:""}))},e.onClick=function(a){e.setState({activeSuggestion:0,filteredSuggestions:[],showSuggestions:!1,userInput:a.currentTarget.id})},e.state={userInput:"",activeSuggestion:0,filteredSuggestions:[],showSuggestions:!1},e}return Object(d.a)(a,e),Object(m.a)(a,[{key:"render",value:function(){var e,a=this,t=this.state,l=t.userInput,r=t.showSuggestions,c=t.filteredSuggestions,i=t.activeSuggestion;return r&&l&&(e=c.length?n.a.createElement("ul",{className:"suggestions"},c.map((function(e,t){var l;return t===i&&(l="suggestionActive"),n.a.createElement("li",{className:l,key:t,id:e.symbol,onClick:a.onClick},n.a.createElement("span",null,e.symbol),n.a.createElement("span",null,e.name))}))):n.a.createElement("div",{className:"noSuggestions"},n.a.createElement("p",null,"No suggested results are available."))),n.a.createElement("div",{className:"wrapper"},n.a.createElement("h1",null,n.a.createElement("span",null,"h-l")," index"),n.a.createElement("form",{className:"searchForm",onSubmit:this.handleSubmit},n.a.createElement("label",{htmlFor:"userInput",className:"visuallyHidden"},"Enter a stock name"),n.a.createElement("input",{type:"text",id:"userInput",className:"searchInput",placeholder:"Search for a stock",autoComplete:"off",value:l,onChange:this.handleChange}),n.a.createElement("input",{className:"submitButton",type:"submit",value:"Submit"}),e))}}]),a}(l.Component),g=t(9),k=t.n(g),b=t(3),S=function(e){function a(){var e;return Object(s.a)(this,a),(e=Object(o.a)(this,Object(u.a)(a).call(this))).state={globalDate:"",globalHigh:"",globalLow:"",globalVolume:"",globalChange:"",globalChangePercent:"",isLoading:!0},e}return Object(d.a)(a,e),Object(m.a)(a,[{key:"getGlobalEquityData",value:function(){var e=this;k.a.get("https://financialmodelingprep.com/api/v3/historical-price-full/".concat(this.props.stockEquitySymbol,"?timeseries=5")).then((function(a){var t=a.data.historical[0],l=t.date,n=t.high,r=t.low,c=t.volume,i=t.change,s=t.changePercent;e.setState({globalDate:l,globalHigh:Number(n).toFixed(2),globalLow:Number(r).toFixed(2),globalVolume:c,globalChange:Number(i).toFixed(2),globalChangePercent:Number(s).toFixed(2),isLoading:!1}),0!==i&&e.props.handleStockChange(i)})).catch((function(){e.props.handleErrors()}))}},{key:"componentDidMount",value:function(){this.getGlobalEquityData()}},{key:"componentDidUpdate",value:function(e){var a=this;this.props.stockEquitySymbol!==e.stockEquitySymbol&&setTimeout((function(){a.getGlobalEquityData()}),1500)}},{key:"render",value:function(){var e=this.state,a=e.globalHigh,t=e.globalLow,l=e.globalDate,r=e.globalVolume,c=e.globalChange,i=e.globalChangePercent,s=e.isLoading,m=this.props.increaseOrDecrease;return s?n.a.createElement("div",{className:"timeSeriesContainer"},n.a.createElement("h3",null,"global overview"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("p",null,"last updated"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"high"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"low"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"volume"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"change"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"change (%)"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))))):n.a.createElement("div",{className:"timeSeriesContainer"},n.a.createElement("h3",null,"global overview"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("p",null,"last updated"),n.a.createElement("p",null,l)),n.a.createElement("li",null,n.a.createElement("p",null,"high"),n.a.createElement("p",{className:m},a)),n.a.createElement("li",null,n.a.createElement("p",null,"low"),n.a.createElement("p",{className:m},t)),n.a.createElement("li",null,n.a.createElement("p",null,"volume"),n.a.createElement("p",{className:m},r)),n.a.createElement("li",null,n.a.createElement("p",null,"change"),n.a.createElement("p",{className:m},c,"increase"===m?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVertical",icon:b.b})):"decrease"===m?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVerticalReverse",icon:b.a})):null)),n.a.createElement("li",null,n.a.createElement("p",null,"change (%)"),n.a.createElement("p",{className:m},i,"increase"===m?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVertical",icon:b.b})):"decrease"===m?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVerticalReverse",icon:b.a})):null))))}}]),a}(l.Component),f=function(e){function a(){var e;return Object(s.a)(this,a),(e=Object(o.a)(this,Object(u.a)(a).call(this))).state={intradayHigh:"",intradayLow:"",intradayClose:"",intradayVolume:"",changeIncrease:!1,changeDecrease:!1,isLoading:!0},e}return Object(d.a)(a,e),Object(m.a)(a,[{key:"getIntradayEquityData",value:function(){var e=this;k()({method:"GET",url:"https://www.alphavantage.co/query",dataResponse:"json",params:{apikey:this.props.apiKey,function:"TIME_SERIES_INTRADAY",interval:"1min",symbol:this.props.stockEquitySymbol}}).then((function(a){var t=Object.values(a.data["Time Series (1min)"]),l=t[0]["2. high"],n=t[0]["3. low"],r=t[0]["4. close"],c=t[0]["5. volume"],i=t[1]["4. close"];r>i?e.setState({changeIncrease:!0}):r<i&&e.setState({changeDecrease:!0}),e.setState({intradayHigh:Number(l).toFixed(2),intradayLow:Number(n).toFixed(2),intradayClose:Number(r).toFixed(2),intradayVolume:c,isLoading:!1})})).catch((function(){h.a.fire("Error","You have made too many requests, please wait a minute!","error")}))}},{key:"componentDidMount",value:function(){this.setState({changeDecrease:!1,changeIncrease:!1}),this.getIntradayEquityData()}},{key:"componentDidUpdate",value:function(e){this.props.stockEquitySymbol!==e.stockEquitySymbol&&this.getIntradayEquityData()}},{key:"render",value:function(){var e=this.state,a=e.intradayHigh,t=e.intradayLow,l=e.intradayClose,r=e.intradayVolume,c=e.changeIncrease,i=e.changeDecrease;return e.isLoading?n.a.createElement("div",{className:"timeSeriesContainer"},n.a.createElement("h3",null,"intraday data (1 min)"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("p",null,"high"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"low"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"close"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"volume"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))))):n.a.createElement("div",{className:"timeSeriesContainer"},n.a.createElement("h3",null,"intraday data (1 min)"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("p",null,"high"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},a,c?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVertical",icon:b.b})):i?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVerticalReverse",icon:b.a})):null)),n.a.createElement("li",null,n.a.createElement("p",null,"low"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},t,c?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVertical",icon:b.b})):i?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVerticalReverse",icon:b.a})):null)),n.a.createElement("li",null,n.a.createElement("p",null,"close"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},l)),n.a.createElement("li",null,n.a.createElement("p",null,"volume"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},r))))}}]),a}(l.Component),N=function(e){function a(){var e;return Object(s.a)(this,a),(e=Object(o.a)(this,Object(u.a)(a).call(this))).state={dailyHigh:"",dailyLow:"",dailyClose:"",dailyVolume:"",changeIncrease:!1,changeDecrease:!1,isLoading:!0},e}return Object(d.a)(a,e),Object(m.a)(a,[{key:"getDailyEquityData",value:function(){var e=this;k()({method:"GET",url:"https://www.alphavantage.co/query",dataResponse:"json",params:{apikey:this.props.apiKey,function:"TIME_SERIES_DAILY",symbol:this.props.stockEquitySymbol}}).then((function(a){var t=Object.values(a.data["Time Series (Daily)"]),l=t[0]["2. high"],n=t[0]["3. low"],r=t[0]["4. close"],c=t[0]["5. volume"],i=t[1]["4. close"];r>i?e.setState({changeIncrease:!0}):r<i&&e.setState({changeDecrease:!0}),e.setState({dailyHigh:Number(l).toFixed(2),dailyLow:Number(n).toFixed(2),dailyClose:Number(r).toFixed(2),dailyVolume:c,isLoading:!1})})).catch((function(){h.a.fire("Error","You have made too many requests, please wait a minute!","error")}))}},{key:"componentDidMount",value:function(){this.setState({changeDecrease:!1,changeIncrease:!1}),this.getDailyEquityData()}},{key:"componentDidUpdate",value:function(e){this.props.stockEquitySymbol!==e.stockEquitySymbol&&this.getDailyEquityData()}},{key:"render",value:function(){var e=this.state,a=e.dailyHigh,t=e.dailyLow,l=e.dailyClose,r=e.dailyVolume,c=e.changeIncrease,i=e.changeDecrease;return e.isLoading?n.a.createElement("div",{className:"timeSeriesContainer"},n.a.createElement("h3",null,"daily data (yesterday)"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("p",null,"high"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"low"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"close"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"volume"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))))):n.a.createElement("div",{className:"timeSeriesContainer"},n.a.createElement("h3",null,"daily data (yesterday)"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("p",null,"high"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},a,c?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVertical",icon:b.b})):i?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVerticalReverse",icon:b.a})):null)),n.a.createElement("li",null,n.a.createElement("p",null,"low"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},t,c?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVertical",icon:b.b})):i?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVerticalReverse",icon:b.a})):null)),n.a.createElement("li",null,n.a.createElement("p",null,"close"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},l)),n.a.createElement("li",null,n.a.createElement("p",null,"volume"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},r))))}}]),a}(l.Component),w=function(e){function a(){var e;return Object(s.a)(this,a),(e=Object(o.a)(this,Object(u.a)(a).call(this))).state={weeklyHigh:"",weeklyLow:"",weeklyClose:"",weeklyVolume:"",changeIncrease:!1,changeDecrease:!1,isLoading:!0},e}return Object(d.a)(a,e),Object(m.a)(a,[{key:"getWeeklyEquityData",value:function(){var e=this;k()({method:"GET",url:"https://www.alphavantage.co/query",dataResponse:"json",params:{apikey:this.props.apiKey,function:"TIME_SERIES_WEEKLY",symbol:this.props.stockEquitySymbol}}).then((function(a){var t=Object.values(a.data["Weekly Time Series"]),l=t[0]["2. high"],n=t[0]["3. low"],r=t[0]["4. close"],c=t[0]["5. volume"],i=t[1]["4. close"];r>i?e.setState({changeIncrease:!0}):r<i&&e.setState({changeDecrease:!0}),e.setState({weeklyHigh:Number(l).toFixed(2),weeklyLow:Number(n).toFixed(2),weeklyClose:Number(r).toFixed(2),weeklyVolume:c,isLoading:!1})})).catch((function(){h.a.fire("Error","You have made too many requests, please wait a minute!","error")}))}},{key:"componentDidMount",value:function(){this.setState({changeDecrease:!1,changeIncrease:!1}),this.getWeeklyEquityData()}},{key:"componentDidUpdate",value:function(e){this.props.stockEquitySymbol!==e.stockEquitySymbol&&this.getWeeklyEquityData()}},{key:"render",value:function(){var e=this.state,a=e.weeklyHigh,t=e.weeklyLow,l=e.weeklyClose,r=e.weeklyVolume,c=e.changeIncrease,i=e.changeDecrease;return e.isLoading?n.a.createElement("div",{className:"timeSeriesContainer"},n.a.createElement("h3",null,"weekly data (last week)"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("p",null,"high"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"low"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"close"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"volume"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))))):n.a.createElement("div",{className:"timeSeriesContainer"},n.a.createElement("h3",null,"weekly data (last week)"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("p",null,"high"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},a,c?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVertical",icon:b.b})):i?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVerticalReverse",icon:b.a})):null)),n.a.createElement("li",null,n.a.createElement("p",null,"low"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},t,c?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVertical",icon:b.b})):i?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVerticalReverse",icon:b.a})):null)),n.a.createElement("li",null,n.a.createElement("p",null,"close"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},l)),n.a.createElement("li",null,n.a.createElement("p",null,"volume"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},r))))}}]),a}(l.Component),D=function(e){function a(){var e;return Object(s.a)(this,a),(e=Object(o.a)(this,Object(u.a)(a).call(this))).state={monthlyHigh:"",monthlyLow:"",monthlyClose:"",monthlyVolume:"",changeIncrease:!1,changeDecrease:!1,isLoading:!0},e}return Object(d.a)(a,e),Object(m.a)(a,[{key:"getMonthlyEquityData",value:function(){var e=this;k()({method:"GET",url:"https://www.alphavantage.co/query",dataResponse:"json",params:{apikey:this.props.apiKey,function:"TIME_SERIES_MONTHLY",symbol:this.props.stockEquitySymbol}}).then((function(a){var t=Object.values(a.data["Monthly Time Series"]),l=t[0]["2. high"],n=t[0]["3. low"],r=t[0]["4. close"],c=t[0]["5. volume"],i=t[1]["4. close"];r>i?e.setState({changeIncrease:!0}):r<i&&e.setState({changeDecrease:!0}),e.setState({monthlyHigh:Number(l).toFixed(2),monthlyLow:Number(n).toFixed(2),monthlyClose:Number(r).toFixed(2),monthlyVolume:c,isLoading:!1})})).catch((function(){h.a.fire("Error","You have made too many requests, please wait a minute!","error")}))}},{key:"componentDidMount",value:function(){this.setState({changeDecrease:!1,changeIncrease:!1}),this.getMonthlyEquityData()}},{key:"componentDidUpdate",value:function(e){this.props.stockEquitySymbol!==e.stockEquitySymbol&&this.getMonthlyEquityData()}},{key:"render",value:function(){var e=this.state,a=e.monthlyHigh,t=e.monthlyLow,l=e.monthlyClose,r=e.monthlyVolume,c=e.changeIncrease,i=e.changeDecrease;return e.isLoading?n.a.createElement("div",{className:"timeSeriesContainer"},n.a.createElement("h3",null,"monthly data (last month)"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("p",null,"high"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"low"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"close"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))),n.a.createElement("li",null,n.a.createElement("p",null,"volume"),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))))):n.a.createElement("div",{className:"timeSeriesContainer"},n.a.createElement("h3",null,"monthly data (last month)"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("p",null,"high"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},a,c?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVertical",icon:b.b})):i?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVerticalReverse",icon:b.a})):null)),n.a.createElement("li",null,n.a.createElement("p",null,"low"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},t,c?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVertical",icon:b.b})):i?n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{className:"shakeVerticalReverse",icon:b.a})):null)),n.a.createElement("li",null,n.a.createElement("p",null,"close"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},l)),n.a.createElement("li",null,n.a.createElement("p",null,"volume"),n.a.createElement("p",{className:c?"increase":i?"decrease":null},"                  ",r))))}}]),a}(l.Component),C=t(31),I=t.n(C),L=function(e){function a(){var e;return Object(s.a)(this,a),(e=Object(o.a)(this,Object(u.a)(a).call(this))).state={tickerList:[],isLoading:!0},e}return Object(d.a)(a,e),Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;k.a.get("https://financialmodelingprep.com/api/v3/company/stock/list").then((function(a){for(var t=a.data.symbolsList,l=[],n=0;n<20;n++)l.push(t[n]);e.setState({tickerList:l,isLoading:!1})})).catch((function(e){h.a.fire("Error","An error has occurred, ".concat(e.message),"error")}))}},{key:"render",value:function(){var e=this.state,a=e.tickerList;if(e.isLoading)return n.a.createElement("div",{className:"preloader3"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null));return n.a.createElement(I.a,{className:"tickerCarousel",elementType:"div",options:{wrapAround:!0,autoPlay:1800},static:!0},a.map((function(e,a){return n.a.createElement("div",{className:"tickerCell",key:a},n.a.createElement("p",null,e.symbol),n.a.createElement("p",null,e.price))})))}}]),a}(l.Component),j=function(e){function a(){var e;return Object(s.a)(this,a),(e=Object(o.a)(this,Object(u.a)(a).call(this))).handleErrors=function(){h.a.fire("Error","Your have entered an incorrect stock name! Please enter a valid stock name. (Ex. MSFT, SPY)","error")},e.handleSwitchGlobal=function(){e.setState({timeSeriesGlobal:!0,timeSeriesIntraday:!1,timeSeriesDaily:!1,timeSeriesWeekly:!1,timeSeriesMonthly:!1})},e.handleSwitchIntraday=function(){e.setState({timeSeriesIntraday:!0,timeSeriesGlobal:!1,timeSeriesDaily:!1,timeSeriesWeekly:!1,timeSeriesMonthly:!1})},e.handleSwitchDaily=function(){e.setState({timeSeriesDaily:!0,timeSeriesGlobal:!1,timeSeriesIntraday:!1,timeSeriesWeekly:!1,timeSeriesMonthly:!1})},e.handleSwitchWeekly=function(){e.setState({timeSeriesWeekly:!0,timeSeriesGlobal:!1,timeSeriesIntraday:!1,timeSeriesDaily:!1,timeSeriesMonthly:!1})},e.handleSwitchMonthly=function(){e.setState({timeSeriesMonthly:!0,timeSeriesGlobal:!1,timeSeriesIntraday:!1,timeSeriesDaily:!1,timeSeriesWeekly:!1})},e.searchStockEquity=function(a,t){a.preventDefault(),h.a.fire({position:"center",icon:"success",title:"Loading data",showConfirmButton:!1,timer:1500}),e.setState({stockSymbol:t,changeDecrease:!1,changeIncrease:!1}),e.getStockInfo()},e.handleStockChange=function(a){a>0?e.setState({changeIncrease:!0}):e.setState({changeDecrease:!0})},e.state={stockName:"",stockSymbol:"MSFT",stockLetters:"",stockPrice:"",stockList:[],reactApiKey:"BVAEXUPWKE45Y47X",changeIncrease:!1,changeDecrease:!1,timeSeriesGlobal:!0,timeSeriesIntraday:!1,timeSeriesDaily:!1,timeSeriesWeekly:!1,timeSeriesMonthly:!1,isLoading:!0},e}return Object(d.a)(a,e),Object(m.a)(a,[{key:"getStockInfo",value:function(){var e=this;k.a.get("https://financialmodelingprep.com/api/v3/company/stock/list").then((function(a){var t=a.data.symbolsList,l=Object(i.a)(t),n=l.filter((function(a){return a.symbol===e.state.stockSymbol})),r=n[0].symbol,c=n[0].name,s=n[0].price;e.setState({stockName:c,stockSymbol:r,stockLetters:r,stockPrice:s,stockList:l,isLoading:!1})})).catch((function(){e.handleErrors()}))}},{key:"componentDidMount",value:function(){h.a.fire("Welcome to H-L Index","Want to know what the latest value on a particular stock? This application will display realtime data as well as historical data from last month, week, day and even last minute. Search for any stock in the search bar by entering a stock name. (Ex. MSFT, SPY)","info"),this.getStockInfo()}},{key:"render",value:function(){var e=this.state,a=e.stockName,t=e.stockSymbol,l=e.stockLetters,r=e.stockList,c=e.reactApiKey,i=e.changeIncrease,s=e.changeDecrease,m=e.isLoading,o=e.timeSeriesGlobal,u=e.timeSeriesIntraday,d=e.timeSeriesDaily,E=e.timeSeriesWeekly,h=e.timeSeriesMonthly;return m?n.a.createElement("div",{className:"ldsHourglass"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null)):n.a.createElement("div",{className:"App"},n.a.createElement("header",null,n.a.createElement(y,{stockList:r,searchStockEquity:this.searchStockEquity})),n.a.createElement("main",null,n.a.createElement("div",{className:"wrapper"},n.a.createElement("h2",null,a," (",l,")"),o&&n.a.createElement(S,{handleErrors:this.handleErrors,apiKey:c,stockEquitySymbol:t,handleStockChange:this.handleStockChange,increaseOrDecrease:i?"increase":s?"decrease":null}),u&&!d&&!E&&!h&&n.a.createElement(f,{apiKey:c,stockEquitySymbol:t}),d&&!u&&!E&&!h&&n.a.createElement(N,{apiKey:c,stockEquitySymbol:t}),E&&!u&&!d&&!h&&n.a.createElement(w,{apiKey:c,stockEquitySymbol:t}),h&&!u&&!d&&!E&&n.a.createElement(D,{apiKey:c,stockEquitySymbol:t}),n.a.createElement("div",{className:"timeSeriesButtons"},o?null:n.a.createElement("button",{onClick:this.handleSwitchGlobal},"global"),u?null:n.a.createElement("button",{onClick:this.handleSwitchIntraday},"intraday"),d?null:n.a.createElement("button",{onClick:this.handleSwitchDaily},"daily"),E?null:n.a.createElement("button",{onClick:this.handleSwitchWeekly},"weekly"),h?null:n.a.createElement("button",{onClick:this.handleSwitchMonthly},"monthly")))),n.a.createElement("footer",null,n.a.createElement(L,null),n.a.createElement("div",{className:"wrapper"},n.a.createElement("p",null,"copyright ",n.a.createElement("span",{"aria-hidden":"true"},n.a.createElement(p.a,{icon:v.a}))," vincent ",n.a.createElement("span",{id:"year"},(new Date).getFullYear())))))}}]),a}(l.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(n.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[33,1,2]]]);
//# sourceMappingURL=main.1be0c29b.chunk.js.map