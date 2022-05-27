let display = document.getElementById('display');
let numbers = document.getElementsByClassName('number');
let operations = document.getElementsByClassName('key');
let decimal = document.getElementById('decimal');
let clear = document.getElementById('clear');
let evaluate = document.getElementById('evaluate');
let initial_value = 0;
let current_operation = "";
let await_value = 0;
//Two states initial_input and await_input
let state = "initial_input";



//Function that will create functionality for what happens when pressing on a button
//Also adresses the logic for the calculator when a button is pressed
//Pressing it will change it to gray and releasing it will return to its normal background color detailed by parameter normal


function number_click(event) {
    if (state == "initial_input") {
        if (!String(initial_value).includes('.')) {
            initial_value = initial_value * 10 +  Number(event.target.textContent);
        } else {
            initial_value = initial_value + event.target.textContent;
        }
        display.innerHTML = initial_value;
    } else {
        if (!String(await_value).includes('.')) {
            await_value = await_value * 10 + Number(event.target.textContent);
            
        } else {
            await_value = await_value + event.target.textContent;
        }
        state = "await_input";
        display.innerHTML = await_value;
    }
}

function operation_click(event) {
    current_operation = event.target.textContent;
    state = "await_input";
}

function evaluate_click(event) {
    if (current_operation == '+') {
        display.innerHTML = initial_value + await_value;
    } else if (current_operation == '-') {
        display.innerHTML = initial_value - await_value;
    } else if (current_operation == 'x') {
        display.innerHTML = initial_value * await_value;
    } else if (current_operation == '÷') {
        display.innerHTML = initial_value / await_value;
    } else {
        display.innerHTML = initial_value;
    }
}

function clear_click(event) {
    state = "initial_input";
    initial_value = 0;
    await_value = 0;
    display.innerHTML = initial_value;
}

function decimal_click(event) {
    if (state == "initial_input") {
        if (!String(initial_value).includes('.')) {
            initial_value = initial_value + ".";
            display.innerHTML = initial_value;
        }
    } else {
        if (!String(await_value).includes('.')) {
            await_value = await_value + ".";
            state = "await_input";
            display.innerHTML = await_value;
        }
    }
}

function button_flick(button, normal) {
    button.addEventListener('mousedown', function(event) {
        event.target.style.backgroundColor = 'gray';
    });
    button.addEventListener('mouseup', function(event) {
        event.target.style.backgroundColor =  normal;
    });
}

//Loops for creating event listeners for each button
//loop is needed becuase more than one item with the same class name

//All Event Listeners/Functionality for clicking a number
for (let i = 0; i < numbers.length; i++) {
    button_flick(numbers[i], 'whitesmoke');
    numbers[i].addEventListener('click', number_click);
}

//All Event Listeners/Functionality for clicking an operation
for (let i = 0; i < operations.length; i++) {
    button_flick(operations[i], 'lightgray');
    operations[i].addEventListener('click', operation_click);
}

//All Event Listeners/Functionality for clicking the evaluate button
button_flick(evaluate, 'goldenrod');
evaluate.addEventListener('click', evaluate_click);

//All Event Listeners/Functionality for clicking the clear button
button_flick(clear, 'whitesmoke');
clear.addEventListener('click', clear_click);

//All Event Listeners/Functionality for clicking the decmimal button
button_flick(decimal, 'whitesmoke');
decimal.addEventListener('click', decimal_click);