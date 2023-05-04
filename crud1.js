function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/project");
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      const objects = JSON.parse(this.responseText);

      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML +=
          '<td><img width="50px" src="' +
          object["projectlogo"] +
          '" class="projectlogo"></td>';
        trHTML += "<td>" + object["Projectname"] + "</td>";
        trHTML += "<td>" + object["Leadname"] + "</td>";
        trHTML += "<td>" + object["Startdate"] + "</td>";
        trHTML += "<td>" + object["Duration"] + "</td>";
        trHTML += "<td>" + object["Memberno"] + "</td>";
        trHTML +=
          '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
          object["id"] +
          ')">Edit</button>';
        trHTML +=
          '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
          object["id"] +
          ')">Del</button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable();

function showUserCreateBox() {
  Swal.fire({
    title: "Create user",
    html:
      '<form id="myform"  class="was-validated">' +
      '<input id="id" type="hidden">' +
      '<input id="Projectname" class="swal2-input" placeholder="Projectname" required >' +
      '<input id="Leadname" class="swal2-input" placeholder="Leadname" required >' +
      '<input id="Startdate" class="swal2-input" placeholder="Startdate" required >' +
      '<input id="Duration" class="swal2-input" placeholder="Duration" required>' +
      '<input id="Memberno" class="swal2-input" placeholder="Memberno" required>' +
      '</form>',
    preConfirm: async () => {
      const form = document.querySelector('myform');
      const projectNameInput = document.querySelector('#Projectname');
      const leadNameInput = document.querySelector('#Leadname');
      const startDateInput = document.querySelector('#Startdate');
      const durationInput = document.querySelector('#Duration');
      const memberNoInput = document.querySelector('#Memberno');
      const submitButton = document.querySelector('#submit');

      submitButton.addEventListener('click', (event) => {
        event.preventDefault();

        try {
          userCreate();
          // Check if project name input is empty
          if (projectNameInput.value === '') {
            throw new Error('Please enter a project name.');
          }

          // Check if lead name input is empty
          if (leadNameInput.value === '') {
            throw new Error('Please enter a lead name.');
          }

          // Check if start date input is empty and valid format
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (startDateInput.value === '') {
            throw new Error('Please enter a start date.');
          } else if (!dateRegex.test(startDateInput.value)) {
            throw new Error('Please enter a valid start date (YYYY-MM-DD format).');
          }

          // Check if duration input is empty and numeric
          if (durationInput.value === '') {
            throw new Error('Please enter a duration in weeks.');
          } else if (isNaN(durationInput.value)) {
            throw new Error('Please enter a valid duration (numeric value only).');
          }

          // Check if member number input is empty and numeric
          if (memberNoInput.value === '') {
            throw new Error('Please enter the number of project members.');
          } else if (isNaN(memberNoInput.value)) {
            throw new Error('Please enter a valid member number (numeric value only).');
          }

          // If all inputs are valid, submit the form
          form.submit();

        } catch (error) {
          // Display error message using SweetAlert2 library
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
        }
      });

    },
    // preConfirm: async () => {
    //   const form = document.getElementById('myform');
    //   if (!form.checkValidity()) {
    //     Swal.showValidationMessage('Please fill out all required fields.');
    //     return;
    //   }
    //   try {
    //     userCreate();
    //     Swal.fire({
    //       icon: "success",
    //       title: "project added successfully",//for success message

    //     });
    //     loadTable();
    //   } catch (error) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Error",
    //       text: error.message
    //     });
    //   }
    // },
  });
}



function userCreate() {
  const Projectname = document.getElementById("Projectname").value;
  const Leadname = document.getElementById("Leadname").value;
  const Startdate = document.getElementById("Startdate").value;
  const Duration = document.getElementById("Duration").value;
  const Memberno = document.getElementById("Memberno").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/project/");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      Projectlogo: "C:/Users/hp/Desktop/crud/asset/images/projectrepeat.png",
      Projectname: Projectname,
      Leadname: Leadname,
      Startdate: Startdate,
      Duration: Duration,
      Memberno: Memberno,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      loadTable();
    }
  };
}

function showUserEditBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/project/${id}`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      //const user = objects["objects"];
      console.log(objects);
      Swal.fire({
        title: "Edit User",
        html:
          '<input id="id" type="hidden" value="' +
          objects[`${id}`] +
          '">' +
          '<input id="Projectname" class="swal2-input" placeholder="Projectname" value="' +
          objects["Projectname"] +
          '">' +
          '<input id="Leadname" class="swal2-input" placeholder="Leadname" value="' +
          objects["Leadname"] +
          '">' +
          '<input id="Startdate" class="swal2-input" placeholder="Startdate" value="' +
          objects["Startdate"] +
          '">' +
          '<input id="Duration" class="swal2-input" placeholder="Duration" value="' +
          objects["Duration"] +
          '">' +
          '<input id="Memberno" class="swal2-input" placeholder="Memberno" value="' +
          objects["Startdate"] +
          '">',
        preConfirm: () => {
          userEdit(id);
        },
      });
    }
  };
}

function userEdit(id) {
  //const id = document.getElementById("id").value;
  const Projectname = document.getElementById("Projectname").value;
  const Leadname = document.getElementById("Leadname").value;
  const Startdate = document.getElementById("Startdate").value;
  const Duration = document.getElementById("Duration").value;
  const Memberno = document.getElementById("Memberno").value;

  console.log(id);
  console.log(Projectname);
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", `http://localhost:3000/project/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      // id: id,
      Projectlogo: "C:/Users/cgvak/Desktop/crud/asset/images/projectrepeat.png",
      Projectname: Projectname,
      Leadname: Leadname,
      Startdate: Startdate,
      Duration: Duration,
      Memberno: Memberno,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      loadTable();
    }
  };
}

function userDelete(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open(`DELETE`, `http://localhost:3000/project/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      id: id,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      // Swal.fire(objects["message"]);
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          objects["message"];
        }
      })
    }
    //loadTable();
  };
}