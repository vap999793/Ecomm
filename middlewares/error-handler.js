process.on('uncaughtException', (err)=>{
    console.log('uncaughtException');
})

process.on('unhandledRejection', (err)=>{
    console.log('unhandledRejection--------');
})


function handleError(error, req, res, next) {
    try{
        if(res.statusCode == 200){
            res.status(500);
        }
        res.json({error: error.message || "Something went wrong"});
    }
    catch{
        next();
    }
}

module.exports = {handleError};