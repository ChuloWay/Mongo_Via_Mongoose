const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conection Open!!");
    })
    .catch(err => {
        console.log("Oh No Error");
        console.log(err);
    })


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'price must be positive']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
})

productSchema.methods.greet = function () {
    console.log("Hello Guys");
    console.log(`- from ${this.name}`);
}

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save()
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

productSchema.statics.fireSale = function() {
    return this.updateMany({},{onSale:true, price:0})
}



const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mountain Bike' })
    console.log(foundProduct)
    await foundProduct.toggleOnSale();
    console.log(foundProduct)
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct)

}

Product.fireSale().then(res => console.log(res))

// findProduct()



// const bike = new Product({ name:'Cycling Jersey', price: 28.50 , categories:['cyling','safety','food'], size: 'S'})
// bike.save()
//     .then(data => {
//         console.log("It Worked!!!");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("Oh No Error");
//         console.log(err);
//     })

// Product.findOneAndUpdate({name:' Tire Pump '},
// { price: -650},{new:true, runValidators:true})
// .then(data => {
//     console.log("It Worked!!!");
//     console.log(data);
// })
// .catch(err => {
//     console.log("Oh No Error");
//     console.log(err);
// })
