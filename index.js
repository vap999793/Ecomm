require('dotenv').config();
const {app} = require('./server');

app.listen(process.env.PORT || 2000, ()=>{
    console.log(`Server is running at PORT : ${process.env.PORT}`);
})