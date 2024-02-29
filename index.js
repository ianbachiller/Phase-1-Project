document.addEventListener("DOMContentLoaded", () => {
  //Click event to show all procedures
  const showAllProceduresNamesBtn = document.getElementById("all-procedures");
  showAllProceduresNamesBtn.addEventListener("click", fetchAllProcedures);
  function fetchAllProcedures() {
    fetch("http://localhost:3000/procedures")
      .then((resp) => resp.json())
      .then((procedures) => iterateProcedureNames(procedures))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  const procCont = document.getElementById("all-procedures-container");
  function iterateProcedureNames(icuProcedures) {
    selectedProcedureDiv.innerHTML = " ";
    icuProcedures.forEach((procedure) => {
      const p = document.createElement("p");
      p.addEventListener("dblclick", handleDoubleCLick);
      p.textContent = procedure.name;
      p.setAttribute("id", procedure.id);
      procCont.append(p);
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
  //Iterate info function
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
  //Iterate info
});
