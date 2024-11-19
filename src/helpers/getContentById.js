export const getContentById = (contentType, collection, id) => {

    if(contentType === 1){
        return collection.find(costume => costume.id === id)    
    } else if(contentType === 2){
        return collection.find(banner => banner.id === id)    
    } else if(contentType === 3) {
        return collection.find(sale => sale.id === id)
    }

} 