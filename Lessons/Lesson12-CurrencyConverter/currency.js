window.addEventListener('load',()=>{
    var createDomElement = (tagName = '',options,parent = null) => {
        if(tagName.length == 0)console.error('Tag name not defined');
        var node = document.createElement(tagName);

        for (const key in options) {
            node.setAttribute(key,options[key])
        }

        parent.appendChild(node); //add to the page
        return node;
    }
    var currencyContainer = document.querySelector('.currency');
    var header = createDomElement('div',{
        class:'currency-header',
        title:'Elements panel'
    },currencyContainer);
    var body = createDomElement('div',{
        class:'currency-body',
        title:'Currency list'
    },currencyContainer);

    var renderTable = (currencies) => {
        var table = body.querySelector('.currency-table-list');
        if(table != null)body.removeChild(table);
        table = createDomElement('table',{
            class: 'currency-table-list'
        },body);
        var headRow = createDomElement('tr',{},table);
        var headTitles = ['R030','Name','Rate','ISO 4217'];
        headTitles.forEach((value,index)=>{
            createDomElement('th',{},headRow).innerHTML = value;
        });
        currencies.forEach((oneCurr,index)=>{
            var row = createDomElement('tr',{},table);
            createDomElement('td',{},row).innerHTML = oneCurr.r030; //names are already defined in json
            createDomElement('td',{},row).innerHTML = oneCurr.txt;
            createDomElement('td',{},row).innerHTML = oneCurr.rate;
            createDomElement('td',{},row).innerHTML = oneCurr.cc;
        });
    }

    var renderControls = () => {

        var currencyHeader = createDomElement('div',{class:'currency-header-container'},header);
        var headerText = createDomElement('h1',{
            class: 'currency-header-text'
        },currencyHeader);
        headerText.innerHTML = 'Currency converter';
        var inputDate = createDomElement('input',{},currencyHeader);
        inputDate.type = 'date';
        inputDate.value  = new Date().toISOString().substr(0, 10);


        var currencyBody = createDomElement('div',{class:'currency-header-container currency-header-body'},header);
        var blockFrom = createDomElement('div',{},currencyBody);
        var inputFrom = createDomElement('input',{},blockFrom);
        inputFrom.type = 'number';
        inputFrom.value = 1;
        var icon = createDomElement('i',{class:'fa fa-arrows-h currency-header-transferIcon',ariaHidden:'true'},currencyBody);
        var currencyFrom = createDomElement('select',{},blockFrom);
        var blockTo = createDomElement('div',{},currencyBody);
        var inputTo = createDomElement('input',{},blockTo);
        inputTo.type = 'number';
        var currencyTo = createDomElement('select',{},blockTo);

        var currencyFooter = createDomElement('div',{class:'currency-header-footer'},header);
        var calcButton = createDomElement('button',{class:'currency-calculate-button'},currencyFooter);
        calcButton.innerHTML = 'Calculate'


        environment.currencyList.forEach((curr,index)=>{
            createDomElement('option',{},currencyFrom).innerHTML = curr.cc;
            createDomElement('option',{},currencyTo).innerHTML = curr.cc;
        });
        var recalcResult = () => {
            var formattedDate = inputDate.value.replaceAll('-','');
            if(formattedDate != environment.selectedDate){
                environment.selectedDate = formattedDate;
                fetch(environment.bankUriApi,{
                    method:'GET'
                }).then((response)=>{
                    return response.json();
                }).then((currencies)=>{
                    environment.currencyList = currencies;
                    inputTo.value = +(inputFrom.value * (environment.currencyList[currencyFrom.selectedIndex].rate / environment.currencyList[currencyTo.selectedIndex].rate)).toFixed(4);
                });
            }   else inputTo.value = +(inputFrom.value * (environment.currencyList[currencyFrom.selectedIndex].rate / environment.currencyList[currencyTo.selectedIndex].rate)).toFixed(4);
        }
        inputFrom.addEventListener('input',recalcResult);
        inputDate.addEventListener('input',() => {
            recalcResult()
            renderTable(environment.currencyList);
        });
        currencyFrom.addEventListener('change',recalcResult);
        currencyTo.addEventListener('change',recalcResult);
        icon.addEventListener('click',()=>{
            var temp = currencyFrom.selectedIndex;
            currencyFrom.selectedIndex = currencyTo.selectedIndex;
            currencyTo.selectedIndex = temp;
            recalcResult();
        });

        currencyTo.selectedIndex = 1;
        (()=>{
            var event = new Event("change");
            currencyTo.dispatchEvent(event);
        })()
    }

    var environment = {
        currencyList : [],
        selectedDate : '20230624',
        get bankUriApi() {
            return `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${this.selectedDate}&json`;
        }
    }

    fetch(environment.bankUriApi,{
        method:'GET'
    }).then((response)=>{
        return response.json();
    }).then((currencies)=>{
        environment.currencyList = currencies;
        renderTable(currencies);
        renderControls(currencies);
    });
    

});