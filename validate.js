$(document).ready(function () {
    $("#mycrud").validate({
      rules: {
        Projectname: {
          required: true,
          minlength: 5,
          maxlength: 10,
          pattern: /^(\w){5,10}$/,
        },
        Leadname: {
            required: true,
            minlength: 5,
            maxlength: 10,
            pattern: /^(\w){5,10}$/,
          },
        Startdate: {
          required: true,
          pattern:/^(?:0[1-9]|[12][0-9]|3[0-1])-(?:0[1-9]|1[0-2])-(?!0000)[0-9]{4}$/,
        },
        Duration: {
          required: true,
        },
        Memberno: {
          required: true,
        },
      },
      messages: {
        Projectname: "Enter project Name",
        Leadname:"ENter leadname",
        Startdate: "Enter proper date",
        Duration: "Enter duration",
        Memberno: "total number of members?",
      },
    });
  });