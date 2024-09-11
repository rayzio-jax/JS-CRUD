/*
	This file is for DOM and other HTML elements processing
*/

const display = document.querySelector("#display"); // Display element
const form = document.querySelector("#form"); // Form element
const submitFormBtn = document.querySelector(".submit-btn"); // Submit button
const notifSubmit = document.querySelector(".notif-submit"); // Notification after submiting form
const ageInput = document.querySelector("input[name='age']"); // Age input, type number
const refreshBtn = document.querySelector(".refresh-btn"); // Refresh button

form.addEventListener("submit", formSubmit); // Handle form submit event
window.addEventListener("load", handleDataDisplay); // Handle load data and display it to display element
refreshBtn.addEventListener("click", handleDataDisplay); // Handle refresh button to refresh data
ageInput.addEventListener("input", numberInputChange); // Handle to set input number not below or above the limit
ageInput.addEventListener("blur", numberInputChange); // Handle to set input number not below or above the limit

// A handler to change element value to not crossing the limit
function numberInputChange(e) {
	let val = Number(e.currentTarget.value); // Ensure val is a number

	// Constrain the value between 0 and 50
	if (val < 1) {
		val = null;
	} else if (val > 50) {
		val = 50;
	}

	// Update the input value
	e.currentTarget.value = val;
}

// An edit button event listener
function attachEditListener() {
	// Get all edit button elements
	const editBtnElements = document.querySelectorAll(".edit-btn");

	// Add an event listener to each edit button element
	editBtnElements.forEach((btn) =>
		// Every edit button have their own listener which do an action here
		btn.addEventListener("click", async (e) => {
			// Navigate to the closest parent with class 'data-box'
			const dataBox = e.target.closest(".data-box");

			// Find the p element with id="data-uuid" inside that dataBox
			const _uuid = dataBox
				.querySelector("#data-uuid")
				.textContent.replace("ID: ", "")
				.trim();

			// Get current data
			const currentData = await getAllData(_uuid).then((res) => res.data[0]);

			// Create confirm button element
			const confirmButton = document.createElement("button");
			confirmButton.title = "confirm";
			confirmButton.className = "confirm-btn";
			confirmButton.textContent = "👍";

			// Create cancel button element
			const cancelButton = document.createElement("button");
			cancelButton.title = "cancel";
			cancelButton.className = "cancel-btn";
			cancelButton.textContent = "❌";

			// Create data editing container
			const editBox = document.createElement("div");
			editBox.setAttribute("id", "edit");
			editBox.className = "edit-box";

			// Create 'input text' element for editing name data
			const newName = document.createElement("input");
			newName.type = "text";
			newName.name = "new-name";
			newName.maxLength = "10";
			newName.placeholder = "New name";

			// Create a 'select' element for editing gender data
			const newGender = document.createElement("select");
			newGender.name = "new-gender";
			const maleGen = document.createElement("option");
			maleGen.value = "male";
			maleGen.innerHTML = "Male";
			const femaleGen = document.createElement("option");
			femaleGen.value = "female";
			femaleGen.innerHTML = "Female";

			// Insert element option `male` and `female` into 'select' element
			newGender.appendChild(maleGen);
			newGender.appendChild(femaleGen);

			// Set 'select' value to `male` if data in current field is Male, otherwise set it to 'female'
			newGender.value = currentData.gender === "M" ? "male" : "female";

			// Create 'input number' element for editing age data
			const newAge = document.createElement("input");
			newAge.type = "number";
			newAge.name = "new-age";
			newAge.min = "0";
			newAge.max = "50";
			newAge.placeholder = "New age";

			// Get the button container
			const btnBox = dataBox.querySelector(".btn-box");

			// Get the target button
			const targetBtn = dataBox.querySelector(".btn-box .delete-btn");

			dataBox.insertBefore(editBox, btnBox);
			editBox.appendChild(newName);
			editBox.appendChild(newGender);
			editBox.appendChild(newAge);
			btnBox.appendChild(confirmButton);
			btnBox.appendChild(cancelButton);

			newAge.addEventListener("input", numberInputChange);
			newAge.addEventListener("blur", numberInputChange);

			// Remove all corresponding elements
			function removeBoxAndButton() {
				while (btnBox.lastChild && btnBox.lastChild !== targetBtn) {
					btnBox.removeChild(btnBox.lastChild);
				}
				editBox.remove();
			}

			// When cancel button clicked, it remove the editing container and the desired button
			cancelButton.addEventListener("click", removeBoxAndButton);

			confirmButton.addEventListener("click", async () => {
				if (_uuid) {
					await fetch("/api/update", {
						method: "PATCH",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							_uuid,
							_name:
								newName.value === "" || newName.value === null
									? currentData.name
									: newName.value,
							_gender: newGender.value === "male" ? "M" : "F",
							_age:
								newAge.value === "" || newAge.value === null
									? Number(currentData.age)
									: Number(newAge.value),
						}),
					})
						.then((res) => res.json())
						.then(() => {
							removeBoxAndButton();
							handleDataDisplay();
						})
						.catch((err) => console.error(err));
				}
			});
		})
	);
}

// A delete button event listener
function attachDelListener() {
	// Get all delete button elements
	const delBtnElements = document.querySelectorAll(".delete-btn");

	// Add an event listener to each delete button element
	delBtnElements.forEach((btn) =>
		btn.addEventListener("click", async (e) => {
			// Navigate to the closest parent with class 'data-box'
			const dataBox = e.target.closest(".data-box");

			// Find the p element with id="data-uuid" inside that dataBox
			const _uuid = dataBox
				.querySelector("#data-uuid")
				.textContent.replace("ID: ", "")
				.trim();

			if (_uuid) {
				await fetch("/api/delete", {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						_uuid,
					}),
				})
					.then((res) => res.json())
					.then(() => {
						handleDataDisplay();
					})
					.catch((err) => console.error(err));
			}
		})
	);
}

// A handler to display all acquired data from `getAllData()`
async function handleDataDisplay() {
	while (display.hasChildNodes()) {
		display.removeChild(display.firstChild);
	}

	// Get all data from database
	const payload = await getAllData();

	// If data length is 0, code will not be executed
	if (Object.keys(payload.data).length !== 0) {
		payload.data.map((data) => {
			const _id = document.createElement("p");
			const _name = document.createElement("p");
			const _gender = document.createElement("p");
			const _age = document.createElement("p");
			const dataContainer = document.createElement("div");
			const buttonContainer = document.createElement("div");
			const editBtn = document.createElement("button");
			const delBtn = document.createElement("button");

			dataContainer.className = "data-box";
			buttonContainer.className = "btn-box";
			editBtn.className = "edit-btn";
			delBtn.className = "delete-btn";

			_id.setAttribute("id", "data-uuid");

			editBtn.title = "edit";
			delBtn.title = "delete";

			_id.innerHTML = "ID: " + data.id;
			_name.innerHTML = "NAME: " + data.name;
			_gender.innerHTML = "GENDER: " + data.gender;
			_age.innerHTML = "AGE: " + data.age;
			editBtn.innerHTML = "EDIT";
			delBtn.innerHTML = "DELETE";

			buttonContainer.appendChild(editBtn);
			buttonContainer.appendChild(delBtn);
			dataContainer.appendChild(_id);
			dataContainer.appendChild(_name);
			dataContainer.appendChild(_gender);
			dataContainer.appendChild(_age);
			dataContainer.appendChild(buttonContainer);
			display.appendChild(dataContainer);
		});

		attachEditListener();
		attachDelListener();
	} else {
		// Instead of displaying blank, I added an element "p" and set the text to show that data is empty in database
		const noData = document.createElement("p");

		noData.innerHTML = "NO DATA";
		noData.style.fontSize = "30px";

		display.appendChild(noData);
	}
}

// Get all user data from API
async function getAllData(uuid = "") {
	const url =
		uuid !== "" || uuid !== null ? "/api/get?uuid=" + uuid : "/api/get";

	const get = await fetch(url, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then((res) => res.json())
		.catch((err) => console.error("Fetch error: ", err));

	return get;
}

// Update selected user data through API to database
async function updateData() {}

// Post new data through API to database
async function formSubmit(e) {
	e.preventDefault();
	const _name = document.getElementById("name");
	const _gender = document.querySelector("input[name='gender']:checked").value;
	const _age = document.getElementById("age");

	await fetch("/api/post", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			_name: _name.value,
			_gender,
			_age: _age.value,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			notifSubmit.innerHTML = data.message;
			notifSubmit.classList.remove("hide");
			submitFormBtn.setAttribute("disabled", true);

			_name.innerText = "";
			_age.innerText = "";
		})
		.catch((err) => console.error("Fetch error: ", err));

	handleDataDisplay();

	setTimeout(() => {
		notifSubmit.classList.add("hide");
		submitFormBtn.removeAttribute("disabled");
	}, 2000);
}
