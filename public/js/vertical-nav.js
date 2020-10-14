$(function () {
  // Sidebar toggle behavior
  $("#sidebar").hide();
  $(".sidebarCollapseMenu").on("click", function () {
    $("#sidebar, #content").slideDown();
    $(".sidebarCollapseMenu").hide();
  });
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar, #content").hide();
    $(".sidebarCollapseMenu").show();
  });
});
