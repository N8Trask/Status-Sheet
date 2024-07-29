const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");
const draftingLane = document.querySelector(".lanes .swim-lane:nth-child(2)");
const checkingLane = document.querySelector(".lanes .swim-lane:nth-child(3)");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) return;

  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  taskContainer.setAttribute("draggable", "true");

  const taskTitle = document.createElement("p");
  taskTitle.classList.add("task-title");
  taskTitle.innerText = value;

  const dropdown = document.createElement("select");
  dropdown.classList.add("task-dropdown");
  const options = ["Job Type...", "R&D", "Preliminary", "Production", "ECO W/ Ship Date", "On Hold"];
  options.forEach((option, index) => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.innerText = option;
    if (index === 0) {
      opt.disabled = true;
      opt.selected = true;
    }
    dropdown.appendChild(opt);
  });

  // Set default color
  taskContainer.style.backgroundColor = "white";

  dropdown.addEventListener("change", () => {
    const jobType = dropdown.value;
    switch (jobType) {
      case "R&D":
        taskContainer.style.backgroundColor = "yellow";
        break;
      case "Preliminary":
        taskContainer.style.backgroundColor = "lightblue";
        break;
      case "Production":
        taskContainer.style.backgroundColor = "green";
        break;
      case "ECO W/ Ship Date":
        taskContainer.style.backgroundColor = "tan";
        break;
      case "On Hold":
        taskContainer.style.backgroundColor = "#FA8072";
        break;
      default:
        taskContainer.style.backgroundColor = "white";
        break;
    }
  });

  const notes = document.createElement("p");
  notes.classList.add("task-notes");
  notes.innerText = "Notes: Not Set";

  const dueDate = document.createElement("p");
  dueDate.classList.add("task-due-date");
  dueDate.innerText = "Due Date: Not Set";

  const shipDate = document.createElement("p");
  shipDate.classList.add("task-ship-date");
  shipDate.innerText = "Ship Date: Not Set";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-btn");

  editButton.addEventListener("click", () => {
    toggleEditMode(taskContainer);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");

  deleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this task?")) {
      taskContainer.remove();
    }
  });

  taskContainer.appendChild(taskTitle);
  taskContainer.appendChild(dropdown);
  taskContainer.appendChild(notes);
  taskContainer.appendChild(dueDate);
  taskContainer.appendChild(shipDate);
  taskContainer.appendChild(editButton);
  taskContainer.appendChild(deleteButton);

  todoLane.appendChild(taskContainer);

  input.value = "";
});

function toggleEditMode(taskContainer) {
  const isEditing = taskContainer.classList.toggle("editing");

  if (isEditing) {
    const taskTitle = taskContainer.querySelector(".task-title");

    const dropdown = taskContainer.querySelector(".task-dropdown");
    const dropdownField = document.createElement("select");
    dropdownField.classList.add("dropdown-field");
    const options = ["Job Type...", "R&D", "Preliminary", "Production", "ECO W/ Ship Date", "On Hold"];
    options.forEach((option, index) => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.innerText = option;
      if (index === 0) {
        opt.disabled = true;
      }
      dropdownField.appendChild(opt);
    });
    dropdownField.value = dropdown.value;

    const notesField = document.createElement("textarea");
    notesField.classList.add("notes-field");
    notesField.placeholder = "Add notes here...";
    notesField.value = taskContainer.querySelector(".task-notes")?.innerText.replace("Notes: ", "") || "";

    const dueDateField = document.createElement("input");
    dueDateField.type = "date";
    dueDateField.classList.add("due-date-field");
    dueDateField.value = taskContainer.querySelector(".task-due-date")?.innerText.replace("Due Date: ", "") || "";

    const shipDateField = document.createElement("input");
    shipDateField.type = "date";
    shipDateField.classList.add("ship-date-field");
    shipDateField.value = taskContainer.querySelector(".task-ship-date")?.innerText.replace("Ship Date: ", "") || "";

    const drafterField = document.createElement("input");
    drafterField.type = "text";
    drafterField.classList.add("drafter-field");
    drafterField.placeholder = "Add drafter name...";
    drafterField.value = taskContainer.querySelector(".task-drafter")?.innerText.replace("Drafter: ", "") || "";

    const draftingStartDateField = document.createElement("input");
    draftingStartDateField.type = "date";
    draftingStartDateField.classList.add("drafting-start-date-field");
    draftingStartDateField.value = taskContainer.querySelector(".task-drafting-start-date")?.innerText.replace("Drafting Start Date: ", "") || "";

    const checkerField = document.createElement("input");
    checkerField.type = "text";
    checkerField.classList.add("checker-field");
    checkerField.placeholder = "Add checker name...";
    checkerField.value = taskContainer.querySelector(".task-checker")?.innerText.replace("Checker: ", "") || "";

    const checkingStartDateField = document.createElement("input");
    checkingStartDateField.type = "date";
    checkingStartDateField.classList.add("checking-start-date-field");
    checkingStartDateField.value = taskContainer.querySelector(".task-checking-start-date")?.innerText.replace("Checking Start Date: ", "") || "";

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save-btn");

    saveButton.addEventListener("click", () => {
      const notesText = notesField.value;
      const dueDateValue = dueDateField.value;
      const shipDateValue = shipDateField.value;
      const dropdownValue = dropdownField.value;

      taskContainer.querySelector(".task-title").innerText = taskTitle.innerText;
      taskContainer.querySelector(".task-notes").innerText = `Notes: ${notesText}`;
      taskContainer.querySelector(".task-due-date").innerText = `Due Date: ${dueDateValue || "Not Set"}`;
      taskContainer.querySelector(".task-ship-date").innerText = `Ship Date: ${shipDateValue || "Not Set"}`;
      taskContainer.querySelector(".task-dropdown").value = dropdownValue;

      const drafterValue = drafterField.value;
      const draftingStartDateValue = draftingStartDateField.value;
      if (taskContainer.querySelector(".task-drafter")) {
        taskContainer.querySelector(".task-drafter").innerText = `Drafter: ${drafterValue || "Not Set"}`;
      }
      if (taskContainer.querySelector(".task-drafting-start-date")) {
        taskContainer.querySelector(".task-drafting-start-date").innerText = `Drafting Start Date: ${draftingStartDateValue || "Not Set"}`;
      }

      const checkerValue = checkerField.value;
      const checkingStartDateValue = checkingStartDateField.value;
      if (taskContainer.querySelector(".task-checker")) {
        taskContainer.querySelector(".task-checker").innerText = `Checker: ${checkerValue || "Not Set"}`;
      }
      if (taskContainer.querySelector(".task-checking-start-date")) {
        taskContainer.querySelector(".task-checking-start-date").innerText = `Checking Start Date: ${checkingStartDateValue || "Not Set"}`;
      }

      // Update background color based on dropdown value
      switch (dropdownValue) {
        case "R&D":
          taskContainer.style.backgroundColor = "yellow";
          break;
        case "Preliminary":
          taskContainer.style.backgroundColor = "lightblue";
          break;
        case "Production":
          taskContainer.style.backgroundColor = "green";
          break;
        case "ECO W/ Ship Date":
          taskContainer.style.backgroundColor = "tan";
          break;
        case "On Hold":
          taskContainer.style.backgroundColor = "#FA8072";
          break;
        default:
          taskContainer.style.backgroundColor = "white";
          break;
      }

      taskContainer.classList.remove("editing");

      dropdownField.remove();
      notesField.remove();
      dueDateField.remove();
      shipDateField.remove();
      drafterField.remove();
      draftingStartDateField.remove();
      checkerField.remove();
      checkingStartDateField.remove();
      saveButton.remove();
    });

    taskContainer.appendChild(dropdownField);
    taskContainer.appendChild(notesField);
    taskContainer.appendChild(dueDateField);
    taskContainer.appendChild(shipDateField);
    taskContainer.appendChild(drafterField);
    taskContainer.appendChild(draftingStartDateField);
    taskContainer.appendChild(checkerField);
    taskContainer.appendChild(checkingStartDateField);
    taskContainer.appendChild(saveButton);
  }
}

document.addEventListener('dragstart', (e) => {
  if (e.target.classList.contains('task-container')) {
    e.target.classList.add('is-dragging');
  }
});

document.addEventListener('dragend', (e) => {
  if (e.target.classList.contains('task-container')) {
    e.target.classList.remove('is-dragging');
  }
});

document.querySelectorAll('.swim-lane').forEach(lane => {
  lane.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(lane, e.clientY);
    const dragging = document.querySelector('.is-dragging');
    if (afterElement == null) {
      lane.appendChild(dragging);
    } else {
      lane.insertBefore(dragging, afterElement);
    }
  });
  
  lane.addEventListener('drop', (e) => {
    e.preventDefault();
    const dragging = document.querySelector('.is-dragging');
    if (lane === draftingLane) {
      addDraftingFields(dragging);
    } else if (lane === checkingLane) {
      addCheckingFields(dragging);
    }
  });
});

function getDragAfterElement(lane, y) {
  const draggableElements = [...lane.querySelectorAll('.task-container:not(.is-dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function addDraftingFields(taskContainer) {
  if (!taskContainer.querySelector(".task-drafter")) {
    const drafter = document.createElement("p");
    drafter.classList.add("task-drafter");
    drafter.innerText = "Drafter: Not Set";

    const draftingStartDate = document.createElement("p");
    draftingStartDate.classList.add("task-drafting-start-date");
    draftingStartDate.innerText = "Drafting Start Date: Not Set";

    const editButton = taskContainer.querySelector(".edit-btn");
    
    taskContainer.insertBefore(drafter, editButton);
    taskContainer.insertBefore(draftingStartDate, editButton);
  }
}

function addCheckingFields(taskContainer) {
  if (!taskContainer.querySelector(".task-checker")) {
    const checker = document.createElement("p");
    checker.classList.add("task-checker");
    checker.innerText = "Checker: Not Set";

    const checkingStartDate = document.createElement("p");
    checkingStartDate.classList.add("task-checking-start-date");
    checkingStartDate.innerText = "Checking Start Date: Not Set";

    const editButton = taskContainer.querySelector(".edit-btn");
    
    taskContainer.insertBefore(checker, editButton);
    taskContainer.insertBefore(checkingStartDate, editButton);
  }
}
