document.addEventListener("DOMContentLoaded", () => {
  //Click event to show all procedures
  const showAllProceduresNamesBtn = document.getElementById("all-procedures");
  showAllProceduresNamesBtn.addEventListener("click", fetchAllProcedures);
  let click = 0;
  function fetchAllProcedures() {
    click++;
    if (click % 2 === 1) {
      fetch("http://localhost:3000/procedures")
        .then((resp) => resp.json())
        .then((procedures) => iterateProcedureNames(procedures))
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else if (click % 2 === 0) {
      proceduresContainer.innerHTML = " ";
      selectedProcedureDiv.innerHTML = " ";
      procedureTitle.textContent = " ";
    }
  }
  const proceduresContainer = document.getElementById(
    "all-procedures-container"
  );
  function iterateProcedureNames(icuProcedures) {
    selectedProcedureDiv.innerHTML = " ";
    procedureTitle.textContent = " ";
    icuProcedures.forEach((procedure) => {
      const p = document.createElement("p");
      p.addEventListener("dblclick", handleDoubleCLick);
      p.textContent = procedure.name;
      p.setAttribute("id", procedure.id);
      proceduresContainer.append(p);
    });
  }
  //Click event to show all procedures

  //Double-click event to show details of a procedure
  const selectedProcedureDiv = document.getElementById("selected-procedure");
  function handleDoubleCLick(event) {
    procedureTitle.innerText = event.target.textContent;
    let pId = event.target.id;
    fetch(`http://localhost:3000/procedures/${pId}`)
      .then((resp) => resp.json())
      .then((procedureInfo) => iterateInfo(procedureInfo));
  }
  //Double-click event to show details of a procedure

  //Iterate info function for the selected procedure
  function iterateInfo(procedureInfo) {
    selectedProcedureDiv.innerHTML = " ";
    //For steps
    const pForSteps = document.createElement("p");
    pForSteps.textContent = `Steps for ${procedureInfo.name}`;
    const olForSteps = document.createElement("ol");
    selectedProcedureDiv.appendChild(pForSteps);
    selectedProcedureDiv.appendChild(olForSteps);
    procedureInfo.steps.forEach((step) => {
      const liForSteps = document.createElement("li");
      liForSteps.textContent = step;
      olForSteps.appendChild(liForSteps);
    });
    selectedProcedureDiv.appendChild(olForSteps);

    //For indications
    const pForIndications = document.createElement("p");
    pForIndications.textContent = `Indications for ${procedureInfo.name}`;
    const olForIndications = document.createElement("ol");
    selectedProcedureDiv.appendChild(pForIndications);
    selectedProcedureDiv.appendChild(olForIndications);
    procedureInfo.indications.forEach((indication) => {
      const liForIndications = document.createElement("li");
      liForIndications.textContent = indication;
      olForIndications.appendChild(liForIndications);
    });
    selectedProcedureDiv.appendChild(olForIndications);

    //For contraindications
    const pForContraindications = document.createElement("p");
    pForContraindications.textContent = `Contraindications for ${procedureInfo.name}`;
    const olForContraindications = document.createElement("ol");
    selectedProcedureDiv.appendChild(pForContraindications);
    selectedProcedureDiv.appendChild(olForContraindications);
    procedureInfo.contraindications.forEach((contraindication) => {
      const liForContraindications = document.createElement("li");
      liForContraindications.textContent = contraindication;
      olForContraindications.appendChild(liForContraindications);
    });
    selectedProcedureDiv.appendChild(olForContraindications);
  }
  //Iterate info function for the selected procedure

  // Change event to choose a procedure
  const dropdown = document.getElementById("dropdown-option");
  const procedureTitle = document.getElementById("procedure-title");
  dropdown.addEventListener("change", (event) => {
    proceduresContainer.innerHTML = " ";
    procedureTitle.innerText = event.target.value;
    fetch("http://localhost:3000/procedures")
      .then((resp) => resp.json())
      .then((procedures) => {
        const selectedDrop = procedures.find(
          (procedure) => procedure.name === event.target.value
        );
        iterateInfo(selectedDrop);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    //Change event to choose a procedure
  });

  //Mouseover event to clear all containers
  document.getElementById("logo").addEventListener("mouseover", () => {
    proceduresContainer.innerHTML = " ";
    selectedProcedureDiv.innerHTML = " ";
    procedureTitle.textContent = " ";
    showToast("Selection cleared!")
  });
  function showToast(message) {
    const toast = document.getElementById('toast-notification');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
}
  //Mouseover event to clear all containers

//
// Add a button in the HTML with the text “names”  - 
//when the button is clicked, on the bottom of the page display procedures with a name length of less than 25 characters including white space. 
//You chose how to list those that pass this test on the page for the user to see. If you want to reuse some of your code appropriately to accomplish this, you may.

//Steps:
  //Add a button element with text = names
  //Add a click event listener to that button
  //create a div element
  //Callback function will:
    //iterate through the object using filter method
    //for each element create a p element
    //p element text content will be the curretn value of the iterator
    //append p element to the div

document.getElementById("names-button").addEventListener("click", handleNamesButton)
const names = document.getElementById("names")
function handleNamesButton(){
  fetch("http://localhost:3000/procedures")
  .then(resp => resp.json())
  .then(procs => filterProcs(procs))
}

//Filter procedures with names less than 25 characters
function filterProcs(procedures){
  const filteredProcs = procedures.filter(procedure => procedure.name.length < 25)
    filteredProcs.forEach(filteredProc => {
      const p = document.createElement('p')
      p.textContent = filteredProc.name
      names.append(p)
    })
}
//Filter procedures with names less than 25 characters
});
