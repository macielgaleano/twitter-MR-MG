$(function () {
  // Sidebar toggle behavior
  $("#sidebar").hide();
  $(".sidebarCollapseMenu").on("click", function () {
    $("#sidebar, #content").show("slide", { direction: "right" }, 1000);
    $(".sidebarCollapseMenu").hide();
  });
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar, #content").hide("slide", { direction: "left" }, 1000);
    $(".sidebarCollapseMenu").show();
  });
});

$(".heart").on("click", function (event) {
  console.log("click");
  event.stopPropagation();
  event.stopImmediatePropagation();
  $(this).addClass("text-danger");
});
