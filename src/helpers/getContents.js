
export const getContentsByType = (collection, contentType, limit) => {
    const types = ["1", "2", "3", "5", "7"];
    let filteredContents
    if (!types.includes(String(contentType))) {
      throw new Error(`${contentType} is not a valid Content Type`);
    }
    
    // Filtra el contenido por el tipo especificado
      filteredContents = collection.filter((content) => String(content.type) === contentType);
      // console.log('I can get this mfs \n')
      // console.dir(collection)

    
    // Si se proporciona un límite, devuelve los últimos 'limit' registros
    if (limit !== undefined) {
      return filteredContents.slice(-limit);
    }
    
    // Si no se proporciona límite, devuelve todo el contenido filtrado
    return filteredContents;
  };