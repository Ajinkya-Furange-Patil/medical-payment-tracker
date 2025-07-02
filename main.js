/*document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskFormContainer = document.getElementById("taskFormContainer");
    const taskForm = document.getElementById("taskForm");
    const tasksContainer = document.getElementById("tasksContainer");
    const cancelFormBtn = document.getElementById("cancelFormBtn");

    const showAllBtn = document.getElementById("showAllBtn");
    const showPendingBtn = document.getElementById("showPendingBtn");
    const showCompletedBtn = document.getElementById("showCompletedBtn");
    const showDelayedBtn = document.getElementById("showDelayedBtn");

    const tasks = [];

    // Show the form when 'Add New Payment' button is clicked
    addTaskBtn.addEventListener("click", () => {
        taskFormContainer.classList.remove("hidden");
    });

    // Hide the form when 'Cancel' button is clicked
    cancelFormBtn.addEventListener("click", () => {
        taskFormContainer.classList.add("hidden");
    });

    // Handle task form submission
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Collect form data and create a new task
        const task = {
            vendor: document.getElementById("vendorName").value,
            amount: document.getElementById("paymentAmount").value,
            dueDate: document.getElementById("dueDate").value,
            priority: document.getElementById("priorityLevel").value,
            notes: document.getElementById("notes").value,
            status: "Pending",
        };

        tasks.push(task);
        taskForm.reset();
        taskFormContainer.classList.add("hidden");
        renderTasks(); // Re-render tasks after adding new one
    });

    // Function to render tasks based on filter
    function renderTasks(filterStatus = "All") {
        tasksContainer.innerHTML = "";

        tasks.forEach((task, index) => {
            const taskDiv = document.createElement("div");
            taskDiv.className = `task ${task.status.toLowerCase()}`; // Add class based on status
            taskDiv.setAttribute("data-status", task.status);

            taskDiv.innerHTML = `
                <div>
                    <strong>${task.vendor}</strong> - ₹${task.amount}
                    <p>Due: ${task.dueDate} | Priority: ${task.priority}</p>
                    <p>${task.notes}</p>
                    <p>Status: <strong>${task.status}</strong></p>
                </div>
                <div>
                    <button onclick="updateStatus(${index}, 'Pending')">Pending</button>
                    <button onclick="updateStatus(${index}, 'Completed')">Completed</button>
                    <button onclick="updateStatus(${index}, 'Delayed')">Delayed</button>
                </div>
            `;

            tasksContainer.appendChild(taskDiv);
        });

        applyFilter(filterStatus); // Apply the current filter immediately
    }

    // Update task status dynamically
    window.updateStatus = (index, status) => {
        tasks[index].status = status;
        renderTasks(); // Re-render tasks to reflect changes
        updateStatusSummary(); // Update status summary
        updateProgressBars(); // Update progress bars
    };

    // Function to apply a filter to the tasks (All, Pending, Completed, Delayed)
    function applyFilter(filterStatus) {
        const allTasks = document.querySelectorAll(".task");

        allTasks.forEach((task) => {
            const taskStatus = task.getAttribute("data-status");
            if (filterStatus === "All" || taskStatus === filterStatus) {
                task.style.display = "flex"; // Show task
            } else {
                task.style.display = "none"; // Hide task
            }
        });
    }

    // Event listeners for live filtering
    showAllBtn.addEventListener("click", () => applyFilter("All"));
    showPendingBtn.addEventListener("click", () => applyFilter("Pending"));
    showCompletedBtn.addEventListener("click", () => applyFilter("Completed"));
    showDelayedBtn.addEventListener("click", () => applyFilter("Delayed"));

    // Status summary updates
    function updateStatusSummary() {
        const pendingCount = tasks.filter(task => task.status === "Pending").length;
        const completedCount = tasks.filter(task => task.status === "Completed").length;
        const delayedCount = tasks.filter(task => task.status === "Delayed").length;

        // Update the count display
        document.getElementById("pendingCount").textContent = pendingCount;
        document.getElementById("completedCount").textContent = completedCount;
        document.getElementById("delayedCount").textContent = delayedCount;

        // Update the visual text representation
        document.getElementById("pendingText").textContent = `Pending Payments: ${pendingCount}`;
        document.getElementById("completedText").textContent = `Completed Payments: ${completedCount}`;
        document.getElementById("delayedText").textContent = `Delayed Payments: ${delayedCount}`;
    }

    // Update the progress bars based on task counts
    function updateProgressBars() {
        const totalTasks = tasks.length;

        if (totalTasks === 0) {
            document.getElementById("pendingProgress").value = 0;
            document.getElementById("completedProgress").value = 0;
            document.getElementById("delayedProgress").value = 0;
            return;
        }

        const pendingPercentage = (tasks.filter(task => task.status === "Pending").length / totalTasks) * 100;
        const completedPercentage = (tasks.filter(task => task.status === "Completed").length / totalTasks) * 100;
        const delayedPercentage = (tasks.filter(task => task.status === "Delayed").length / totalTasks) * 100;

        document.getElementById("pendingProgress").value = pendingPercentage;
        document.getElementById("completedProgress").value = completedPercentage;
        document.getElementById("delayedProgress").value = delayedPercentage;
    }

    // Initial call to update status and progress bars when page loads
    updateStatusSummary();
    updateProgressBars();
});*/

// Get elements
const addTaskBtn = document.getElementById('addTaskBtn');
const taskFormContainer = document.getElementById('taskFormContainer');
const cancelFormBtn = document.getElementById('cancelFormBtn');
const taskForm = document.getElementById('taskForm');
const showAllBtn = document.getElementById('showAllBtn');
const showPendingBtn = document.getElementById('showPendingBtn');
const showCompletedBtn = document.getElementById('showCompletedBtn');
const showDelayedBtn = document.getElementById('showDelayedBtn');
const tasksContainer = document.getElementById('tasksContainer');
const pendingProgress = document.getElementById('pendingProgress');
const completedProgress = document.getElementById('completedProgress');
const delayedProgress = document.getElementById('delayedProgress');

// Array to hold payment tasks
let paymentTasks = [];

// Function to toggle form visibility
addTaskBtn.addEventListener('click', () => {
    taskFormContainer.classList.remove('hidden');  // Show the form
});

// Function to hide form when cancel button is clicked
cancelFormBtn.addEventListener('click', () => {
    taskFormContainer.classList.add('hidden');  // Hide the form
});

// Function to handle form submission
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent form from submitting normally

    const vendorName = document.getElementById('vendorName').value;
    const paymentAmount = document.getElementById('paymentAmount').value;
    const dueDate = document.getElementById('dueDate').value;
    const priorityLevel = document.getElementById('priorityLevel').value;
    const notes = document.getElementById('notes').value;

    const newTask = {
        vendorName,
        paymentAmount,
        dueDate,
        priorityLevel,
        notes,
        status: 'Pending' // Default status is 'Pending'
    };

    // Add the new task to the array
    paymentTasks.push(newTask);

    // Clear the form inputs
    taskForm.reset();

    // Hide the form after submission
    taskFormContainer.classList.add('hidden');

    // Re-render tasks and update progress bars
    renderTasks();
    updateProgressBars();
});

// Function to render tasks
function renderTasks() {
    tasksContainer.innerHTML = ''; // Clear existing tasks

    // Loop through tasks and create a card for each task
    paymentTasks.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        
        taskCard.innerHTML = `
            <h3>${task.vendorName}</h3>
            <p><strong>Amount:</strong> $${task.paymentAmount}</p>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
            <p><strong>Priority:</strong> ${task.priorityLevel}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <p><strong>Notes:</strong> ${task.notes}</p>
            <button class="status-btn" onclick="changeStatus(${index})">Change Status</button>
        `;

        tasksContainer.appendChild(taskCard);
    });
}

// Function to change task status (from Pending to Completed or Delayed)
function changeStatus(index) {
    const task = paymentTasks[index];

    // Toggle status between 'Pending', 'Completed', and 'Delayed'
    if (task.status === 'Pending') {
        task.status = 'Completed';
    } else if (task.status === 'Completed') {
        task.status = 'Delayed';
    } else {
        task.status = 'Pending';
    }

    // Re-render tasks after status change
    renderTasks();
    updateProgressBars();
}

// Function to filter tasks based on the selected status
showAllBtn.addEventListener('click', () => {
    renderTasks(); // Show all tasks
});

showPendingBtn.addEventListener('click', () => {
    const pendingTasks = paymentTasks.filter(task => task.status === 'Pending');
    renderFilteredTasks(pendingTasks);
});

showCompletedBtn.addEventListener('click', () => {
    const completedTasks = paymentTasks.filter(task => task.status === 'Completed');
    renderFilteredTasks(completedTasks);
});

showDelayedBtn.addEventListener('click', () => {
    const delayedTasks = paymentTasks.filter(task => task.status === 'Delayed');
    renderFilteredTasks(delayedTasks);
});

// Function to render filtered tasks
function renderFilteredTasks(filteredTasks) {
    tasksContainer.innerHTML = ''; // Clear existing tasks

    filteredTasks.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        
        taskCard.innerHTML = `
            <h3>${task.vendorName}</h3>
            <p><strong>Amount:</strong> $${task.paymentAmount}</p>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
            <p><strong>Priority:</strong> ${task.priorityLevel}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <p><strong>Notes:</strong> ${task.notes}</p>
            <button class="status-btn" onclick="changeStatus(${index})">Change Status</button>
        `;

        tasksContainer.appendChild(taskCard);
    });
}

// Function to update the progress bars based on the task status counts
function updateProgressBars() {
    const totalTasks = paymentTasks.length;
    if (totalTasks === 0) {
        // Set all progress bars to 0 if there are no tasks
        pendingProgress.value = 0;
        completedProgress.value = 0;
        delayedProgress.value = 0;
        return;
    }

    const pendingTasks = paymentTasks.filter(task => task.status === 'Pending').length;
    const completedTasks = paymentTasks.filter(task => task.status === 'Completed').length;
    const delayedTasks = paymentTasks.filter(task => task.status === 'Delayed').length;

    // Calculate progress percentages
    const pendingPercentage = (pendingTasks / totalTasks) * 100;
    const completedPercentage = (completedTasks / totalTasks) * 100;
    const delayedPercentage = (delayedTasks / totalTasks) * 100;

    // Update the progress bars
    pendingProgress.value = pendingPercentage;
    completedProgress.value = completedPercentage;
    delayedProgress.value = delayedPercentage;

    // Update the text count for each status (optional)
    document.getElementById('pendingCount').textContent = pendingTasks;
    document.getElementById('completedCount').textContent = completedTasks;
    document.getElementById('delayedCount').textContent = delayedTasks;

    // Update the visual text for status
    document.getElementById('pendingText').textContent = `Pending Payments: ${pendingTasks}`;
    document.getElementById('completedText').textContent = `Completed Payments: ${completedTasks}`;
    document.getElementById('delayedText').textContent = `Delayed Payments: ${delayedTasks}`;
}

// Initial render of tasks and progress bars
renderTasks();
updateProgressBars();
