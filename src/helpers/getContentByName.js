export const getContentByName = (name = '', collection) => {
    name = name.toLocaleLowerCase().trim()
    if(name.length === 0) return []
    return collection.filter(
        content => content.title.toLocaleLowerCase().includes(name)
    )
} 