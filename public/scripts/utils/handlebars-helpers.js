Handlebars.registerHelper('isRowFilled', function(lvalue, operator, rvalue) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    let result = 0;
    switch (operator) {
        case "+":
            result = lvalue + rvalue;
            break;
        case "-":
            result = lvalue - rvalue;
            break;
        case "*":
            result = lvalue * rvalue;
            break;
        case "/":
            result = lvalue / rvalue;
            break;
        case "%":
            result = lvalue % rvalue;
            break;
        default:
            break;
    }

    return !result;
});