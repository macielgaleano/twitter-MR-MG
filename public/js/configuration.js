$("#file-1").fileinput({
  theme: "fa",
  uploadUrl: "#",
  allowedFileExtensions: ["jpg", "png", "gif"],
  overwriteInitial: false,
  maxFileSize: 2000,
  maxFilesNum: 1,
  slugCallback: function (filename) {
    return filename.replace("(", "_").replace("]", "_");
  },
});

$(".file-drop-zone-title").text("Arrastre sus archivos aqui!!");
$(".file-caption-name").attr("placeholder", "Seleccione sus archivos");
$(".btn").addClass("btn-danger");
$(".hidden-xs").text("Buscar");

$(document).ready(function () {
  $("#show_hide_password a").on("click", function (event) {
    event.preventDefault();
    if ($("#show_hide_password input").attr("type") == "text") {
      $("#show_hide_password input").attr("type", "password");
      $("#show_hide_password i").addClass("fa-eye-slash");
      $("#show_hide_password i").removeClass("fa-eye");
    } else if ($("#show_hide_password input").attr("type") == "password") {
      $("#show_hide_password input").attr("type", "text");
      $("#show_hide_password i").removeClass("fa-eye-slash");
      $("#show_hide_password i").addClass("fa-eye");
    }
  });
});
