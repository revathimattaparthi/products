
/*
 * GET products listing.
 */

exports.list = function(req, res){
    
    console.log("all the products")

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM product',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('products',{page_title:"products - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

// add new product

exports.add = function(req, res){
  res.render('add_products',{page_title:"Add products - Node.js"});
};

exports.edit = function(req, res){
    
    var pid = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM product WHERE pid = ?',[pid],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_products',{page_title:"Edit products - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the products
*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
  
            productName    : input.productName,
            description : input.description,
            price   : input.price,
            quantity   : input.quantity
        
        };
        
        var query = connection.query("INSERT INTO product set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/products');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

// save after editing products

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var pid = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            productName    : input.productName,
            description : input.description,
            price   : input.price,
            quantity   : input.quantity,
            cid : input.cid
        
        
        };
        
        connection.query("UPDATE product set ? WHERE pid = ? ",[data,pid], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/products');
          
        });
    
    });
};

// delete product

exports.delete_product = function(req,res){


    console.log('delete')
          
     var pid = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM product  WHERE pid = ? ",[pid], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/products');
             
        });
        
     });
};


