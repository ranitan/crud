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
          ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>';
        trHTML +=
          '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
          object["id"] +
          ')"><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable();

function showUserCreateBox() {
  Swal.fire({
    title: "Create project",
    html:
      '<form id="myform"  class="was-validated">' +
      '<input id="id" type="hidden">' +
      '<input id="Projectname" class="swal2-input" placeholder="Projectname" required >' +
      '<input id="Leadname" class="swal2-input" placeholder="Leadname" required >' +
      '<input id="Startdate" class="swal2-input" placeholder="Startdate" required >' +
      '<input id="Duration" class="swal2-input" placeholder="Duration" required>' +
      '<input id="Memberno" class="swal2-input" placeholder="Memberno" required>' +
      '</form>',
      focusConfirm: false,
      showCancelButton: true,
    preConfirm: async () => {
      const form = document.getElementById('myform');
      if (!form.checkValidity()) {
        Swal.showValidationMessage('Please fill out all required fields.');
        return;
      }
      try {
        userCreate();
        Swal.fire({
          icon: "success",
          title: "project added successfully",//for success message

        });
        loadTable();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message
        });
      }
      //Regex
         const project_name_regex = /^[a-zA-Z]*$/;
         const Lead_name_regex = /^[a-zA-Z]*$/;
         const date_regex = /^\d{4}-\d{2}-\d{2}$/;
         const member_no_regex = /^(\d+)$/;
         const duration_regex=/^(\d+ years?\s*)?(\d+ days?)?$/;
      
       
      
         if (!project_name_regex.test(Projectname)) {
           Swal.fire({
             title: "Invalid Projectname",
             icon: "error",
             showConfirmButton: true,
         
           });
           return;
         }
      
         if (!Lead_name_regex.test(Leadname)) {
           Swal.fire({
             title: "Invalid Leadnamet",
             icon: "error",
             showConfirmButton: false,
           
           });
           return;
         }
      
         if (!date_regex.test(Startdate)) {
           Swal.fire({
             title: "Invalid Date",
             icon: "error",
             showConfirmButton: false,
           
           });

           return;
         }
      
         if (!member_no_regex.test(Memberno)) {
           Swal.fire({
             title: "Invalid Members",
             icon: "error",
             showConfirmButton: false,
             
           });
           return;
         }
      
         if (!duration_regex.test(Duration)) {
          Swal.fire({
            title: "Invalid duration",
            icon: "error",
            showConfirmButton: false,
            
          });
          return;
        }
      
         if (
           Projectname.match(project_name_regex) &&
           Leadname.match(Lead_name_regex) &&
           Duration.match(duration_regex) &&
           Startdate.match(date_regex)&&
           Memberno.match(member_no_regex)
         ) {
           Swal.fire({
             icon: "success",
             title: "Project created..!",
             showConfirmButton: true,
           });
         };
       
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3000/project/");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(
          JSON.stringify({
            Projectlogo: "/Users/cgvak/Desktop/crud/asset/images/projectrepeat.png",
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
    
    
    },
  );
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
      Projectlogo: "/asset/images/projectrepeat.png",
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
        title: "Edit project",
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
      Projectlogo: "/asset/images/projectrepeat.png",
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
   
  };
}