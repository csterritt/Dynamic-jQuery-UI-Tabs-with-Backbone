// executed when the DOM is ready
$(document).ready(function() {

  // Build our TabEx objects
  buildTabExUI();

  // Bind the add-a-new-tab button
  $("#submit_new_tab").click(function(event) {
    var n = $.trim($("#name_input").val());
    var c = $.trim($("#contents_input").val());
    if (n !== "" && c !== "") {
      window.App.addTab(n, c);
      $("#name_input").val("");
      $("#contents_input").val("");
    }
    event.preventDefault();
  });

  // Set up deleter buttons
  $("#tab_wrapper").on('click', "a", {}, function(event) {
    if ($(this).attr('class') === 'deleter') {
      var its_id = $(this).attr('id');
      $("#tab_wrapper").tabs("remove", "#tab_" + its_id);
      event.preventDefault();
    }
  });

});
