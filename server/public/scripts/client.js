console.log('testing 1..2..3');

const operatorObject = {
    operator: null,
}

function setOperator(operator) {
    operatorObject.operator = operator;
}

// created variable and function to store and update operator object.
// function is used to update operator property

function findTotal(event) {
    event.preventDefault();
    let firstNumber = document.querySelector('#first-number').value;
    let secondNumber = document.querySelector('#second-number').value;

    let equation = {
        first: firstNumber,
        operator: operatorObject.operator,
        second: secondNumber
    }
    console.log(firstNumber, secondNumber, equation);

    fetch('/equations', {
        method: 'POST', body: JSON.stringify(equation),
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => {
            console.log('POST Response:', response);
            document.querySelector('#first-number').value = '';
            document.querySelector('#second-number').value = '';
            getEquation();
            displayTotal();
        })


        .catch((error) => {
            console.log(error);
            alert('Something went wrong!');
        });
}


function getEquation() {
    fetch('/equations')
        .then((response) => {
            console.log('Get Response:', response)
            return response.json();
        })
        .then((equations) => {
            let contentDiv = document.querySelector('#equationsTable');

            contentDiv.innerHTML = '';

            for (let i in equations) {
                let element = equations[i];
                contentDiv.innerHTML += `
                <tr>
                    <td>${element.first} ${element.operator} ${element.second} = ${element.result} </td>
                </tr>`;
            }

            let totalDiv = document.querySelector('#total');

            totalDiv.innerHTML = `<h2>${equations[equations.length - 1].result}</h2>`;

        }).catch((error) => {
            console.log('Error with request:', error);
            alert('Something went wrong!');
        });
}

function displayTotal() {
    fetch('/equations')
        .then((response) => {
            console.log('Get Response Total:', response)
            return response.json();
        })
        .then((equation) => {
            console.log(equation);


        }).catch((error) => {
            console.log('Error with total', error);
            alert('Something went wrong with the total display');
        })
}
