const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conection Open!!");
    })
    .catch(err => {
        console.log("Oh No Error");
        console.log(err);
    })

const personSchema = new mongoose.Schema({
    first: String,
    last: String,
    dogName: String,
    catName:String
}
)

personSchema.virtual('pets').get(function(){
    return `This is ${this.dogName} and this is my ${this.catName}`
})

personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
}
)

personSchema.pre('save', async function(){
    this.first = 'Yo'
    this.last = 'mama'
    console.log("About to save");
})


personSchema.post('save', async function(){
    console.log("Just saved");
})


const Person =  mongoose.model('Person', personSchema);

