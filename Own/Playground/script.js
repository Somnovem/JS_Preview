$(document).ready(function() {
    $(".btn-modal").click(function() {
      var modalId = $(this).data("modal-target");
      $(modalId).css("display", "block");
    });
  
    $(".close").click(function() {
      $(this).closest(".modal").css("display", "none");
    });
  
    $(window).click(function(e) {
      if ($(e.target).hasClass("modal")) {
        $(e.target).css("display", "none");
      }
    });
  });