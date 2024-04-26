
const calculator = document.getElementsByTagName('table')[0] ;
let display = document.getElementById('display') ;
let result = document.getElementById('result') ;

let points = 0 ;

// Main power is this function which calculates result from the string...
function resultCalculation(str) {
    // Split the string by operators
    let numbers = str.split(/[+\-\u00D7\u00F7]/);
    let operators = str.match(/[+\-\u00D7\u00F7]/g);

    // Convert string numbers to actual numbers
    numbers = numbers.map(Number);

    // Perform multiplication and division first
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '\u00D7') {
            numbers[i] *= numbers[i + 1];
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
            i--; // Adjust the index after splice
        } else if (operators[i] === '\u00F7') {
            numbers[i] /= numbers[i + 1];
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
            i--; // Adjust the index after splice
        }
    }

    // Perform addition and subtraction
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else if (operators[i] === '-') {
            result -= numbers[i + 1];
        }
    }

    return result;
}

// Adding listener to complete table (containing buttons)
calculator.addEventListener('click',function(event)
{
    // Fetch the button
    let button = event.target ;
    let buttonValue = button.textContent ;

    switch(buttonValue)
    {
        // Addition operation
        case '+':
        // Initial character cannot be operator
        if(display.textContent.length == 0) {/* do nothing */}
        else
        {
            // Last character should not be +-*/ . That is two consecutive operators not allowed.
            let str = display.textContent ;
            let lastC = str[str.length-1] ;
            if(lastC == '+' || lastC == '-' || lastC == '\u00D7' || lastC == '\u00F7') {/* do nothing */}
            else
            {
                display.textContent += '+' ;
                result.textContent = "" ;
                points = 0 ;
            }
        }
        break ;

        // Subtraction operation
        case '-':
        // Initial character cannot be operator
        if(display.textContent.length == 0) {/* do nothing */}
        else
        {
            // Last character should not be +-*/
            let str = display.textContent ;
            let lastC = str[str.length-1] ;
            if(lastC == '+' || lastC == '-' || lastC == '\u00D7' || lastC == '\u00F7') {/* do nothing */}
            else
            {
                display.textContent += '-' ;
                result.textContent = "" ;
                points = 0 ;
            }
        }
        break ;

        // Multiply operation
        case '\u00D7':
        // Initial character cannot be operator
        if(display.textContent.length == 0) {/* do nothing */}
        else
        {
            // Last character should not be +-*/
            let str = display.textContent ;
            let lastC = str[str.length-1] ;
            if(lastC == '+' || lastC == '-' || lastC == '\u00D7' || lastC == '\u00F7') {/* do nothing */}
            else
            {
                display.textContent += '\u00D7' ;
                result.textContent = "" ;
                points = 0 ;
            }
        }
        break ;
        
        // Divide opearation
        case '\u00F7':
        // Initial character cannot be operator
        if(display.textContent.length == 0) {/* do nothing */}
        else
        {
            // Last character should not be +-*/
            let str = display.textContent ;
            let lastC = str[str.length-1] ;
            if(lastC == '+' || lastC == '-' || lastC == '\u00D7' || lastC == '\u00F7') {/* do nothing */}
            else
            {
                display.textContent += '\u00F7' ;
                result.textContent = "" ;
                points = 0 ;
            }
        }
        break ;
        
        // Equal to operation
        case '=':
        // Initial character cannot be operator
        display.textContent = result.textContent ;
        result.textContent = "";
        break ;
       
        // Clear screen operation
        case 'AC':
        display.textContent = "" ;
        result.textContent = "" ;
        points = 0 ;
        break ;
        
        // Decimal operation
        case '.':
        // Initial character cannot be point
        if(display.textContent.length == 0) {/* do nothing */}
        else 
        {
            if( points == 0 )
            {
                // Append point if there is no point
                display.textContent += '.'  ;
                points += 1 ;
            }
            else
            {
                // Do nothing
            }
        }
        break ;
                
        // 1 to 9 operation
        default: 
        if(buttonValue == '0' && display.textContent.length == 0 ) {/* do nothing */}
        else
        {
            display.textContent += buttonValue ;
            let calculatedResult = resultCalculation(display.textContent) ;
            console.log(result) ;
            result.textContent = calculatedResult ;
        }
            break;
    }
    
})