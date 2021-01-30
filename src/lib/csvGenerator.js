/**
 * 
 * @param {Array} rawData 
 * @param {String} separator 
 * @param {Bool} parsed 
 */
//Optimization : extract header onfly
const generateCSVContent = (rawData, separator = ",", parsed) => {
    const arrToFormattedString = (arr, separator, parsed = false) =>
        arr.map(value => ((parsed && !isNaN(value)) ? value : `"${value}"`)).join(separator || ',')
    const header = rawData.reduce((prev, curr) => [...new Set([...prev, ...Object.keys(curr)])], []) //extract all headers/props
    const data = rawData.reduce((prev, curr, i, arr) => {
        const output = Object.keys(curr).reduce((prev, currKey) => {
            prev[header.indexOf(currKey)] = curr[currKey]
            return prev
        }, [])
        return [...prev, arrToFormattedString(output, separator, parsed)]
    }, [])
    return [arrToFormattedString(header, separator), ...data].join('\n')
}

const downloadAsCSV = (data) => {
    const element = document.createElement("a");
    const file = new Blob([data],
        { type: 'text/csv;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `export-${Date.now()}.csv`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element); // beware
}

export { generateCSVContent, downloadAsCSV }