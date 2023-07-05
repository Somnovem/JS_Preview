$(() => {
    var responseData = {
        products: null
    }
    let selectedRow = null;
    var allBrands = [];
    var allCategories = [];
    let tableOptions = ['id', 'title', 'price', 'rating', 'brand', 'category'];
    let noMatchesObj = [{id:1, title:'No matches', price:'', rating:'', brand:'', category:''}];
    var sortedAscending = true;
    var lastSortedHeaderId = 0;
    $.get('https://dummyjson.com/products?skip=0&limit=100', {}).done((data) => {
        if (data != null) {
            responseData.products = data.products;
            renderTable(responseData.products, $('.table-products'));
        }
    })
    var renderRowHead = (options = []) => {
        var $row = $('<tr>');
        for (let i = 0; i < options.length; i++) {
            let $header = $('<th>').text(options[i]);
            $header.on('click', () => {sortTable(i)});
            $row.append($header);
        }
        return $row;
    };
    var renderRowBody = (data = {}, options = []) => {
        var $row = $('<tr>');
        for (const key in data) {
            if (key == 'brand') {
                var brand = data[key];
                if (!allBrands.includes(brand)) {
                    allBrands.push(brand);
                    var option = $('<option>');
                    option.val(brand);
                    option.text(brand);
                    $('#pickedBrand').append(option);
                }
            }
            else if (key == 'category'){
                var category = data[key];
                if (!allCategories.includes(category)) {
                    allCategories.push(category);
                    var option = $('<option>');
                    option.val(category);
                    option.text(category);
                    $('#pickedCategory').append(option);
                }
            }
            for (let i = 0; i < options.length; i++) {
                if (options[i] == key) {
                    $row.append($('<td>').text(data[key]));
                }
            }
        }
        return $row;
    }
    var renderTable = (products, parent) => {
        parent.empty();
        parent.append(renderRowHead(tableOptions))
        products.forEach((oneProduct) => {
            parent.append(renderRowBody(oneProduct, tableOptions));
        })
        parent.find('td').on('click', (e) => {
            console.log(1);
            if (selectedRow != null) selectedRow.removeClass('selected');
            selectedRow = $(e.target).closest('tr').addClass('selected');
        }).on('dblclick', (e) => {
            showModal();
        });

        $('#pickedBrand').on('change',()=>{
            matchedPropertyTable('brand',$('#pickedBrand').val());
        });
        $('#pickedCategory').on('change',()=>{
            matchedPropertyTable('category',$('#pickedCategory').val());
        });

        $('#btnSearch').on('click',()=>{
            var key = $('#searchKey').val();
            if(key.length == 0) return;
            var matches = responseData.products.filter(product => product.title.includes(key));
            renderTable(matches.length != 0 ? matches : noMatchesObj,$('.table-products'));
        });
        $('#btnRangePrice').on('click',()=>{
            if($('#priceFrom').val() <= 0 || $('#priceTo').val() <= 0)return;
            var matches = responseData.products.filter(product => product.price >= $('#priceFrom').val() && product.price <= $('#priceTo').val());
            renderTable(matches.length != 0 ? matches :noMatchesObj ,$('.table-products'));
        });
        $('#btnRangeRating').on('click',()=>{
            if($('#ratingFrom').val() <= 0 || $('#ratingTo').val() <= 0)return;
            var matches = responseData.products.filter(product => product.rating >= $('#ratingFrom').val() && product.rating <= $('#ratingTo').val());
            renderTable(matches.length != 0 ? matches :noMatchesObj ,$('.table-products'));
        });
        $('#btnReset').on('click',resetInput);
    }
    var resetInput = () => {
        $('#searchKey').val('');
        $('#priceFrom').val();
        $('#priceTo').val();
        $('#ratingFrom').val();
        $('#ratingTo').val();
        $('#pickedBrand').prop('selectedIndex', 0);
        $('#pickedCategory').prop('selectedIndex', 0);
        renderTable(responseData.products,$('.table-products'));
    }
    var showModal = (oneProduct) => {
        $("#exampleModal").modal('show');

        let $buttClose = $("#exampleModal .btn-close-modal");
        $buttClose.on("click", function () {
            $("#exampleModal").modal('hide');
        });
    }
    function sortByProperty(array, propertyName,ascending = true) {
        if (sortedAscending) return array.sort((a, b) => {
          if (a[propertyName] < b[propertyName]) {
            return -1;
          }
          if (a[propertyName] > b[propertyName]) {
            return 1;
          }
          return 0;
        });
        else return array.sort((a, b) => {
            if (a[propertyName] < b[propertyName]) {
              return 1;
            }
            if (a[propertyName] > b[propertyName]) {
              return -1;
            }
            return 0;
        });
    }
    var sortTable = (headerId) => {
        sortedAscending = lastSortedHeaderId == headerId ? !sortedAscending : true;
        lastSortedHeaderId = headerId;
        renderTable(sortByProperty(responseData.products,tableOptions[headerId],sortedAscending),$('.table-products'));
    }
    var matchedPropertyTable = (propertyName,propertyValue) => {
        var matches = responseData.products.filter(product => product[propertyName] == propertyValue);
        renderTable(matches.length != 0 ? matches : noMatchesObj,$('.table-products'));
    }
})
