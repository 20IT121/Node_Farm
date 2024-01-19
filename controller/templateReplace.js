// Following is the method to replace all the placeholders which we have inserted into the template page and we are returning new template with replaced values

module.exports = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g , product.productName);
    output = output.replace(/{%IMAGE%}/g , product.image)
    output = output.replace(/{%FROM%}/g , product.from)
    output = output.replace(/{%NUTRIENTS%}/g , product.nutrients)
    output = output.replace(/{%QUANTITY%}/g , product.quantity)
    output = output.replace(/{%PRICE%}/g , product.price)
    output = output.replace(/{%DESCRIPTION%}/g , product.description)
    output = output.replace(/{%ID%}/g , product.id)

    if(!product.organic)
        output = output.replace(/{%NON-ORGANIC%}/g , "not-organic")

    return output
}