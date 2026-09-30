/* Calculator Logic */
let currentExpression = '';

function updateDisplay() {
    document.getElementById('expression').textContent = currentExpression;
}

function updateResult() {
    const resultDisplay = document.getElementById('result');
    if (currentExpression.trim() === '') {
        resultDisplay.textContent = '';
        return;
    }
    try {
        // Replace symbols for evaluation
        let expr = currentExpression.replace(/×/g, '*').replace(/÷/g, '/');
        // Basic validation: only allowed characters
        if (!/^[\d+\-*/(). ]+$/.test(expr)) {
            throw new Error('Invalid characters');
        }
        // Check parentheses balance
        let balance = 0;
        for (let char of expr) {
            if (char === '(') balance++;
            if (char === ')') balance--;
            if (balance < 0) throw new Error('Unbalanced parentheses');
        }
        if (balance !== 0) throw new Error('Unbalanced parentheses');
        // Evaluate
        const result = eval(expr);
        resultDisplay.textContent = result;
    } catch (e) {
        resultDisplay.textContent = '';
    }
}

// Button event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Clear button
    document.getElementById('clear').addEventListener('click', () => {
        currentExpression = '';
        updateDisplay();
        updateResult();
    });

    // Backspace button
    document.getElementById('backspace').addEventListener('click', () => {
        currentExpression = currentExpression.slice(0, -1);
        updateDisplay();
        updateResult();
    });

    // Decimal point
    document.getElementById('decimal').addEventListener('click', () => {
        // Prevent multiple decimal points in a number
        const lastNumber = currentExpression.split(/[\+\-\*\/\×\÷]/).pop();
        if (!lastNumber.includes('.')) {
            currentExpression += '.';
            updateDisplay();
            updateResult();
        }
    });

    // Operator buttons
    document.getElementById('add').addEventListener('click', () => {
        currentExpression += '+';
        updateDisplay();
        updateResult();
    });
    document.getElementById('subtract').addEventListener('click', () => {
        currentExpression += '-';
        updateDisplay();
        updateResult();
    });
    document.getElementById('multiply').addEventListener('click', () => {
        currentExpression += '×';
        updateDisplay();
        updateResult();
    });
    document.getElementById('divide').addEventListener('click', () => {
        currentExpression += '÷';
        updateDisplay();
        updateResult();
    });

    // Number buttons
    for (let i = 0; i <= 9; i++) {
        document.getElementById(`btn-${i}`).addEventListener('click', () => {
            currentExpression += i;
            updateDisplay();
            updateResult();
        });
    }

    // Equals button
    document.getElementById('equals').addEventListener('click', () => {
        try {
            let expr = currentExpression.replace(/×/g, '*').replace(/÷/g, '/');
            // Validate before eval
            if (!/^[\d+\-*/(). ]+$/.test(expr)) {
                throw new Error('Invalid expression');
            }
            let balance = 0;
            for (let char of expr) {
                if (char === '(') balance++;
                if (char === ')') balance--;
                if (balance < 0) throw new Error('Unbalanced parentheses');
            }
            if (balance !== 0) throw new Error('Unbalanced parentheses');
            const result = eval(expr);
            currentExpression = result.toString();
            updateDisplay();
            updateResult();
        } catch (e) {
            currentExpression = 'Error';
            updateDisplay();
            document.getElementById('result').textContent = '';
        }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
            currentExpression += e.key;
            updateDisplay();
            updateResult();
        } else if (e.key === '.') {
            const lastNumber = currentExpression.split(/[\+\-\*\/\×\÷]/).pop();
            if (!lastNumber.includes('.')) {
                currentExpression += '.';
                updateDisplay();
                updateResult();
            }
        } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            // Map keyboard symbols to calculator symbols
            let symbol = e.key;
            if (e.key === '*') symbol = '×';
            if (e.key === '/') symbol = '÷';
            currentExpression += symbol;
            updateDisplay();
            updateResult();
        } else if (e.key === 'Enter' || e.key === '=') {
            // Trigger equals
            document.getElementById('equals').click();
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            document.getElementById('backspace').click();
        } else if (e.key === 'Escape') {
            document.getElementById('clear').click();
        }
    });
});