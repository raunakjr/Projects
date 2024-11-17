const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const x = document.querySelector(".x1");

console.log(inputFields);
mydata = JSON.parse(localStorage.getItem("key1")) || {};

let completed_goal_count = Object.values(mydata).filter(
  (goal) => goal.iscompleted
).length;

// let completed_goal_count = 0;
// const arr = Object.values(mydata);
// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i]);
//   if (arr[i].iscompleted) {
//     completed_goal_count++;
//   }
// }

progressValue.style.width = `${(completed_goal_count / 3) * 100}%`;
x.innerHTML = `${completed_goal_count}/3 goals completed`;

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value;
    });

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed");

      const inputid = checkbox.nextElementSibling.id;
      mydata[inputid].iscompleted = !mydata[inputid].iscompleted;

      completed_goal_count = Object.values(mydata).filter(
        (goal) => goal.iscompleted
      ).length;

      progressValue.style.width = `${(completed_goal_count / 3) * 100}%`;
      x.innerHTML = `${completed_goal_count}/3 goals completed`;
      setlabel();

      localStorage.setItem("key1", JSON.stringify(mydata));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  // step 2 to show the data we saved in local storage
  // if used to avoid undefined
  if (mydata[input.id]) input.value = mydata[input.id].name;
  // now after we refresh we will not loose the data but we can loose the green marked on our gaols
  if (mydata[input.id] && mydata[input.id].iscompleted) {
    input.parentElement.classList.add("completed");
  }
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });

  // step1 saving the data in local storage
  input.addEventListener("input", (e) => {
    if (mydata[e.target.id] && mydata[e.target.id].iscompleted) {
      input.value = mydata[e.target.id].name;
      return;
    }
    // e.target.id will return id first second and third respectively

    mydata[e.target.id] = {
      name: e.target.value,
      iscompleted: false,
    };
    localStorage.setItem("key1", JSON.stringify(mydata));
  });
});

// Now using local storage to save the data ...

const label = document.querySelector(".progress-label");
setlabel();
function setlabel() {
  if (completed_goal_count == 1) {
    label.innerHTML = "Well began is half done";
  } else if (completed_goal_count == 2) {
    label.innerHTML = "Just a step away, keep going";
  } else if (completed_goal_count == 3) {
    label.innerHTML =
      "Whoa! you have just finished all your goals, Time for Chill";
  } else {
    label.innerHTML = "Raise the bar by completing your goals!";
  }
}

// const topdiv = document.querySelector(".topmostdiv");
// function createGoalContainer(id, placeholderText) {
//   // Create the outer div with class "goal-container"
//   const goalContainer = document.createElement("div");
//   goalContainer.classList.add("goal-container");

//   // Create the nested div with class "custom-checkbox"
//   const customCheckbox = document.createElement("div");
//   customCheckbox.classList.add("custom-checkbox");

//   // Create the <img> element
//   const checkIcon = document.createElement("img");
//   checkIcon.classList.add("check-icon");
//   checkIcon.src = "tick.png"; // Specify the image source
//   checkIcon.alt = "check-icon";

//   // Append the <img> to the "custom-checkbox" div
//   customCheckbox.appendChild(checkIcon);

//   // Create the <input> element
//   const goalInput = document.createElement("input");
//   goalInput.classList.add("goal-input");
//   goalInput.type = "text";
//   goalInput.id = id; // Assign a unique ID
//   goalInput.placeholder = placeholderText;

//   // Append the "custom-checkbox" div and <input> to the "goal-container" div
//   goalContainer.appendChild(customCheckbox);
//   goalContainer.appendChild(goalInput);

//   // Append the "goal-container" div to the main container (or any desired parent)
//   topdiv.appendChild(goalContainer); // Change document.body to your specific container
// }

// // Example usage
// // Adds another goal container
// // const addbtn = document.querySelector(".addbtn");
// // let cnt = 0;
// // addbtn.addEventListener("click", () => {
// //   if (cnt == 0) {
// //     cnt++;
// //     createGoalContainer("fourth", "Add new goal... ");
// //   } // Adds a new goal container with specific ID and placeholder
// //   else if (cnt == 1) {
// //     cnt++;
// //     createGoalContainer("fifth", "Write your goal here...");
// //   }
// // });
