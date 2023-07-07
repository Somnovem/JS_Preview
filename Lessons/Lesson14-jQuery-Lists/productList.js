$(() => {
  var responseData = {
    products: null,
  };
  let selectedRow = null;
  var allBrands = [];
  var allCategories = [];
  let tableOptions = ["id", "title", "price", "rating", "brand", "category"];
  let noMatchesObj = [
    {
      id: 1,
      title: "No matches",
      price: "",
      rating: "",
      brand: "",
      category: "",
    },
  ];
  var sortedAscending = true;
  var lastSortedHeaderId = 0;
  var activeProductList = null;
  $.get("https://dummyjson.com/products?skip=0&limit=100", {}).done((data) => {
    if (data != null) {
      responseData.products = data.products;
      renderTable(responseData.products, $(".table-products"));
      let $buttClose = $("#exampleModal .btn-close-modal");
      $buttClose.on("click", function () {
        $("#exampleModal").modal("hide");
      });

      $("#pickedBrand").on("change", () => {
        matchedPropertyTable("brand", $("#pickedBrand").val());
      });
      $("#pickedCategory").on("change", () => {
        matchedPropertyTable("category", $("#pickedCategory").val());
      });

      $("#btnSearch").on("click", () => {
        var key = $("#searchKey").val();
        if (key.length == 0) return;
        var matches = activeProductList.filter((product) =>
          product.title.includes(key)
        );
        renderTable(
          matches.length != 0 ? matches : noMatchesObj,
          $(".table-products")
        );
      });
      $("#btnRangePrice").on("click", () => {
        if ($("#priceFrom").val() <= 0 || $("#priceTo").val() <= 0) return;
        var matches = activeProductList.filter(
          (product) =>
            product.price >= $("#priceFrom").val() &&
            product.price <= $("#priceTo").val()
        );
        renderTable(
          matches.length != 0 ? matches : noMatchesObj,
          $(".table-products")
        );
      });
      $("#btnRangeRating").on("click", () => {
        if ($("#ratingFrom").val() <= 0 || $("#ratingTo").val() <= 0) return;
        var matches = activeProductList.filter(
          (product) =>
            product.rating >= $("#ratingFrom").val() &&
            product.rating <= $("#ratingTo").val()
        );
        renderTable(
          matches.length != 0 ? matches : noMatchesObj,
          $(".table-products")
        );
      });
      $("#btnReset").on("click", resetInput);
    }
  });
  var renderRowHead = (options = []) => {
    var $row = $("<tr>");
    for (let i = 0; i < options.length; i++) {
      let $header = $("<th>").text(options[i]);
      $header.on("click", () => {
        sortTable(i);
      });
      $row.append($header);
    }
    return $row;
  };
  var renderRowBody = (data = {}, options = []) => {
    var $row = $("<tr>");
    for (const key in data) {
      if (key == "brand") {
        var brand = data[key];
        if (!allBrands.includes(brand)) {
          allBrands.push(brand);
          $("#pickedBrand").append(fillOption(brand));
        }
      } else if (key == "category") {
        var category = data[key];
        if (!allCategories.includes(category)) {
          allCategories.push(category);
          $("#pickedCategory").append(fillOption(category));
        }
      }
      for (let i = 0; i < options.length; i++) {
        if (options[i] == key) {
          $row.append($("<td>").text(data[key]));
        }
      }
    }
    return $row;
  };
  var renderTable = (products, parent) => {
    activeProductList = products;
    parent.empty();
    parent.append(renderRowHead(tableOptions));
    products.forEach((oneProduct) => {
      parent.append(renderRowBody(oneProduct, tableOptions));
    });
    parent
      .find("td")
      .on("click", (e) => {
        if (selectedRow != null) selectedRow.removeClass("selected");
        selectedRow = $(e.target).closest("tr").addClass("selected");
      })
      .on("dblclick", (e) => {
        let idProduct = parseInt($(e.target).closest("tr").first().text());
        showModal(getProductById(idProduct));
      });
  };
  var resetInput = () => {
    $("#searchKey").val('');
    $("#priceFrom").val('');
    $("#priceTo").val('');
    $("#ratingFrom").val('');
    $("#ratingTo").val('');
    $("#pickedBrand").prop("selectedIndex", 0);
    $("#pickedCategory").prop("selectedIndex", 0);
    renderTable(responseData.products, $(".table-products"));
  };
  var showModal = (oneProduct) => {
    var $modalBody = $(".modal-body");
    $modalBody.empty();

    var $modalTitle = $("<h3>");
    $modalTitle.text(oneProduct.title).addClass("text-center");
    $modalBody.append($modalTitle);

    var $modalImageCarousel = `
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
            </button>
        </div>
    `;
    $modalBody.append($modalImageCarousel);
    var $carouselInner = $(".carousel-inner");
    $carouselInner.append(
      $("<div>")
        .addClass("carousel-item active")
        .append(
          fillImage(oneProduct.thumbnail).addClass("d-block w-100 active")
        )
    );
    for (var i = 0; i < oneProduct.images.length; ++i) {
      $carouselInner.append(
        $("<div>")
          .addClass("carousel-item")
          .append(fillImage(oneProduct.images[i]).addClass("d-block w-100"))
      );
    }

    var $modalDescriptionBlock = $("<div>").addClass("modal-description-block");
    var $modalDescriptionHeader = $("<h3>")
      .addClass("modal-description-header")
      .text("description");
    $modalDescriptionBlock.append($modalDescriptionHeader);

    var $modalDescription = $("<h5>");
    $modalDescription.text(oneProduct.description).addClass("text-center");

    $modalDescriptionBlock.append($modalDescription);
    $modalBody.append($modalDescriptionBlock);

    var $modalDiscount = $("<h4>")
      .addClass("text-center")
      .text("Discount: " + oneProduct.discountPercentage + "%");
    $modalBody.append($modalDiscount);

    var $modalPrice = $("<h4>")
      .addClass("text-center")
      .text("Price: " + oneProduct.price + "$");
    $modalBody.append($modalPrice);

    var $modalRating = $("<h4>")
      .addClass("text-center")
      .text("Rating: " + oneProduct.rating + "★");
    $modalBody.append($modalRating);

    var $modalBrand = $("<h4>")
      .addClass("text-center")
      .text("Brand: " + oneProduct.brand);
    $modalBody.append($modalBrand);

    var $modalCategory = $("<h4>")
      .addClass("text-center")
      .text("Category: " + oneProduct.category);
    $modalBody.append($modalCategory);

    var $modalStock = $("<h4>")
      .addClass("text-center")
      .text("Stock: " + oneProduct.stock);
    $modalBody.append($modalStock);

    $("#exampleModal").modal("show");
  };
  var fillOption = (data) => $("<option>").val(data).text(data);
  var fillImage = (img) => $("<img>").attr("src", img);
  var getProductById = (id) => {
    for (var i = 0; i < activeProductList.length; ++i) {
      if (activeProductList[i].id == id) return activeProductList[i];
    }
    return null;
  };
  function sortByProperty(array, propertyName, ascending = true) {
    if (sortedAscending)
      return array.sort((a, b) => {
        if (a[propertyName] < b[propertyName]) {
          return -1;
        }
        if (a[propertyName] > b[propertyName]) {
          return 1;
        }
        return 0;
      });
    else
      return array.sort((a, b) => {
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
    renderTable(
      sortByProperty(
        activeProductList,
        tableOptions[headerId],
        sortedAscending
      ),
      $(".table-products")
    );
  };
  var matchedPropertyTable = (propertyName, propertyValue) => {
    var matches = responseData.products.filter(
      (product) => product[propertyName] == propertyValue
    );
    renderTable(
      matches.length != 0 ? matches : noMatchesObj,
      $(".table-products")
    );
  };
});
