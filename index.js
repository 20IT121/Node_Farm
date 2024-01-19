const fs = require('fs');
const http = require('http');
const url = require('url');

// importing the template replacer method
const templateReplacer = require(`${__dirname}/controller/templateReplace`)

// extracting the data from JSON file and parsing it into js object
const dataObj = fs.readFileSync('./dev-data/data.json', 'utf-8')
const data = JSON.parse(dataObj)

// reading the contents of templates...the repeatative template of product details is copied into seperate template, to perform the replacement of placeholders without confusion
const tempOverview = fs.readFileSync('./templates/template-overview.html' , 'utf-8')
const tempProduct = fs.readFileSync('./templates/template-product.html' , 'utf-8')
const temp_AllProducts = fs.readFileSync('./templates/products.html' , 'utf-8')


const server = http.createServer((req,res) => {
    // these two are key values in url.parse() method, query contains the id parameter
    const {pathname , query} = url.parse(req.url, true)
    
    if(pathname === '/product'){
        // we will select the product directly by indexing
        const card = data[query.id]
        res.writeHead(200, {'Content-type' : 'text/html'});
        // then replace the template with the values of that product
        const productPage = templateReplacer(tempProduct, card)
        res.end(productPage)
    }
    else if(pathname === '/' || pathname === '/overview'){
        // we are iterating through all the products using map() and replace the placeholders with each of their values by templateReplace() method
        const replacedOverview = data.map(element => templateReplacer(temp_AllProducts, element)).join('') 
        res.writeHead(200, {'Content-type' : 'text/html'});
        // then replacing the product details with placeholder
        const finalOverview = tempOverview.replace(/{%PRODUCTS%}/ , replacedOverview)
        res.end(finalOverview)
    }
    else{
        res.writeHead(403, {
          'Content-type' : 'type/html'  
        })
        res.end("Page not found")
    }
});

server.listen(8000, '127.0.0.1' , () => {
    console.log("listening at port 8000");
});