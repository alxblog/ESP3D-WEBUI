import { h } from 'preact';

export const capitalize = (s) => (typeof s === 'string') ? s.charAt(0).toUpperCase() + s.slice(1) : ''

export const getColClasses = ({ col, ...responsive }) => {
    const responsiveClasses =
        Object
            .keys(responsive)
            .reduce((acc, key, i) => i == 0 ? acc : `${acc} col-${key}-${responsive[key]}`, '')
    return `col-${col} ${responsiveClasses}`
}

export const parseFileSizeString = (sizeString) => {
    const [size, unit] = sizeString.split(' ')
    const parsedSize = parseFloat(size)
    switch (unit) {
        case 'B': return parsedSize;
        case 'KB': return parsedSize * 1e3;
        case 'MB': return parsedSize * 1e6;
        case 'GB': return parsedSize * 1e9;
        case 'TB': return parsedSize * 1e12;
        default: return undefined;
    }
}

/*
export const flattenNestedObjSchema = (arr) => {
    return Object.keys(arr).reduce((acc, cur) => {
        const element = arr[cur]
        if ('fields' in element) {
            const { fields, ...rest } = element
            return { ...acc, [cur]: { ...rest }, ...flattenNestedObjSchema(fields) }
        }
        return { ...acc, [cur]: { ...element } }
    }, {})
}
*/

export const generateUID = () => Math.random().toString(36).substr(2, 9)

export const removeEntriesByIDs = (src, uid) => (src.filter(({ id }) => !uid.includes(id)))

export const mergeFlatPrefToNestedSchema = (settings, schema) => {
    // console.log('mergeFlatPrefToNestedSchema', JSON.stringify(settings))
    // console.log('mergeFlatPrefToNestedSchema schema', JSON.stringify(schema))
    return Object.keys(schema).reduce((acc, key) => {
        if ('fields' in schema[key]) return {
            ...acc, [key]: {
                ...schema[key],
                value: settings[key],
                fields: mergeFlatPrefToNestedSchema(settings, schema[key].fields)
            }
        }
        return { ...acc, [key]: { ...schema[key], value: settings[key] } }
    }, { ...schema })
}

export const createComponent =
    (
        is,
        className,
        classModifier = {},
    ) =>
        ({
            is: Tag = is,
            class: c = '',
            id = '',
            ...props
        }) => {
            const splittedArgs = Object.keys(props)
                .reduce((acc, curr) => {
                    if (Object.keys(classModifier).includes(curr)) return { classes: [...acc.classes, classModifier[curr]], ...acc.props }
                    return { classes: [...acc.classes], props: { ...acc.props, [curr]: props[curr] } }
                }, { classes: [], props: {} })
            const classNames = `${className} ${splittedArgs.classes.join(' ')} ${c}`.trim()

            return <Tag class={classNames} id={id} {...splittedArgs.props} />
        }


export const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

export const limitArr = (arr, limit) => arr.slice(arr.length - ((arr.length <= limit) ? arr.length : limit), arr.length)