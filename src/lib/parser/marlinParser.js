const temperature = /([a-zA-Z]{1}-?\d*){1}:(-?\d+\.?\d*){1} *\/? *(\d*\.*\d*)?/gmi; // prop:value or prop:value /xxxx
const gcode = /([a-zA-Z]{1}\d+\.?\d*)[^: ]/gmi