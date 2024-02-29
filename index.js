document.addEventListener("DOMContentLoaded", () => {
  //Click event to show all procedures
  const showAllProceduresNamesBtn = document.getElementById("all-procedures");
  showAllProceduresNamesBtn.addEventListener("click", fetchAllProcedures);
  let click = 0
  function fetchAllProcedures() {
    click++
    if(click % 2 === 1){
        fetch("http://localhost:3000/procedures")
        .then((resp) => resp.json())
        .then((procedures) => iterateProcedureNames(procedures))
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }else if(click % 2 === 0){
        proceduresContainer.innerHTML = " "
        selectedProcedureDiv.innerHTML = " "
    }
  }
  const proceduresContainer = document.getElementById(
    "all-procedures-container"
  );
  function iterateProcedureNames(icuProcedures) {
    selectedProcedureDiv.innerHTML = " ";
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
  dropdown.addEventListener("change", (event) => {
    proceduresContainer.innerHTML = " ";
    const pForChangeEvent = document.createElement("p");
    pForChangeEvent.textContent = event.target.value;
    selectedProcedureDiv.appendChild(pForChangeEvent);
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
});
