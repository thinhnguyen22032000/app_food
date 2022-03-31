export const distanceCalc = (value, fix) => {
    return (value/1000).toFixed(fix)
}
export const timeCalc = (value, fix) => {
    return ((value/60)/60).toFixed(fix)
}