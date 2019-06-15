const mapHelper = (object, projections, callTree) => {
    switch (typeof object) {
        case 'object':
            let keys = Object.keys(a);
            if(keys.length == 1){
                let mapper = keys[0];
                let mappee = object[operator];
                if(mapper in projections){
                    callTree += `${mapper}.`
                    let evalMappee = parseTreeHelper(mappee, projections, callTree);
                    let dict = projections[operatee];
                    if(evalMappee in dict){
                        return dict[evalMappee];
                    }else{
                        throw RangeError(`Value ${evalMappee} not included within mapper ${mapper} provided at ${callTree}`);
                    }
                }else{
                    throw RangeError(`Mapping ${operatee} not included within projections provided at ${callTree}`);
                }
            }else if(keys.length > 1){
                throw SyntaxError(`Multiple mappers is not supported at ${callTree}, given keys :${keys.toString()}`);
            }else{
                throw SyntaxError(`Mapper must not be empty at ${callTree}`);
            }

        default:
            throw Error(`Unsupported mapping type ${typeof object} at ${callTree}, must be of type "{mapperDict: objectmapped}".`);
    }
}
const instruction = (operator, operatee, projections, callTree) => {
    switch (operator) {
        case '+':
            if(operatee instanceof Array){
                return operatee.map(addeeObj=> parseTreeHelper(addeeObj, projections, callTree));
            }else{
                throw SyntaxError(`Objects being "+" must be Array at ${callTree}`);
            }
        
        case '-':
            if(operatee instanceof Array && operatee.length == 2){
                let [A, B] = operatee.map(addeeObj=> parseTreeHelper(addeeObj, projections, callTree));
                return A - B;
            }else{
                throw SyntaxError(`Objects being "-" must be Array and of length 2 at ${callTree}`);
            }
        
        case 'map':
            return mapHelper(operatee, projections, callTree);

        case 'reveredIn':
            // TODO:

        case 'value':
            // TODO:
    
        default:
            // TODO:
            break;
    }
}
const parseTreeHelper = (object, projections, callTree) => {
    switch (typeof object) {
        case 'number':
        case 'string':
            return object;

        case 'object':
            let keys = Object.keys(a);
            if(keys.length == 1){
                let operator = keys[0];
                let operatee = object[operator];
                callTree += `${operator}.`
                return instruction(operator, operatee, projections, callTree);
            }else if(keys.length > 1){
                throw SyntaxError(`Object with multiple oprators is not supported at ${callTree}, given keys :${keys.toString()}`);
            }else{
                throw SyntaxError(`Object must not be empty at ${callTree}`);
            }

        default:
            throw Error(`Unsupported instruction type ${typeof object} at ${callTree}`);
    }
}

const parseTree = function(object, projections = {}){
    return parseTreeHelper(object, projections);
}
module.exports = parseTree;