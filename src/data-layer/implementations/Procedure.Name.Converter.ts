
function upperCaseFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function lowerCaseFirst(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export function ProcedureNameConverterImpl(procName: string): string {
    procName = procName.indexOf('_') > -1 ? procName.toLowerCase() : procName;
    return lowerCaseFirst(procName.split('_').map(s => upperCaseFirst(s)).join(''));
}