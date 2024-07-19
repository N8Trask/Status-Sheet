const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");
const draftingLane = document.querySelector(".lanes .swim-lane:nth-child(2)");

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
    taskContainer.remove();
  });

  taskContainer.appendChild(taskTitle);
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

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save-btn");

    saveButton.addEventListener("click", () => {
      const notesText = notesField.value;
      const dueDateValue = dueDateField.value;
      const shipDateValue = shipDateField.value;

      taskContainer.querySelector(".task-title").innerText = taskTitle.innerText;
      taskContainer.querySelector(".task-notes").innerText = `Notes: ${notesText}`;
      taskContainer.querySelector(".task-due-date").innerText = `Due Date: ${dueDateValue || "Not Set"}`;
      taskContainer.querySelector(".task-ship-date").innerText = `Ship Date: ${shipDateValue || "Not Set"}`;

      taskContainer.classList.remove("editing");

      taskContainer.querySelector(".notes-field")?.remove();
      taskContainer.querySelector(".due-date-field")?.remove();
      taskContainer.querySelector(".ship-date-field")?.remove();
      taskContainer.querySelector(".save-btn")?.remove();
    });

    taskContainer.appendChild(notesField);
    taskContainer.appendChild(dueDateField);
    taskContainer.appendChild(shipDateField);
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
    
    // Insert new fields before the edit button
    taskContainer.insertBefore(drafter, editButton);
    taskContainer.insertBefore(draftingStartDate, editButton);
  }
}
