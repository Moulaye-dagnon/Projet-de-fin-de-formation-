export const dateFormat = (date)=>{
    const options = {day: "2-digit", month: "2-digit", year: "numeric"}
    return new Date(date).toLocaleDateString(undefined, options)
}