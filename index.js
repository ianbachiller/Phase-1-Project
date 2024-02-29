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
    //   selectedProcedureDiv.innerHTML = " "
      icuProcedures.forEach((procedure) => {
        const p = document.createElement("p");
        // p.addEventListener("dblclick", handleDoubleCLick);
        p.textContent = procedure.name;
        p.setAttribute("id", procedure.id);
        procCont.append(p);
      });
    }
//Click event to show all procedures
})