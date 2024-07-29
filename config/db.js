const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbconnection = async (message) => {
    try {
        const dbURI = process.env.MONGODB_URL;
        if (!dbURI) {
            throw new Error("MONGODB_URL environment variable is not defined");
        }
        await mongoose.connect(dbURI);
        console.log(`${message}: Database connected`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = dbconnection;



//cat

// {
//     "name": "Boy",
//     "slug": "boy",
//     "link": "/categories/boy",
//         "_id": "66a64a85cff5e581eebf4013",
//     "subCategoryIds": 
//     ["66a64f4ccff5e581eebf403f",",66a65e5c8f6f35c6b7d200a9","66a6601e1fe1c8c45830733f"]
//     //clothes
//     // ["66a648ad7729155bcd64cbc7", "66a64975cff5e581eebf4003", 
//     //  "66a649a4cff5e581eebf4005","66a649b6cff5e581eebf4007","66a649c8cff5e581eebf4009","66a649dccff5e581eebf400b","66a64a39cff5e581eebf400d",
     
//     //  "66a64a57cff5e581eebf400f","66a64a6ecff5e581eebf4011","66a64a85cff5e581eebf4013"]
//     //Jewelry
//     // ["66a64a9dcff5e581eebf4015","66a64ab3cff5e581eebf4017", "66a64bcacff5e581eebf401b","66a64bf6cff5e581eebf401d","66a64c09cff5e581eebf401f"

// //     ,"66a64c21cff5e581eebf4021","66a64ac7cff5e581eebf4019"
// // ]

// //shoes
// // [
// //     "66a64c4dcff5e581eebf4023","66a64c67cff5e581eebf4025","66a64c7ccff5e581eebf4027","66a64c98cff5e581eebf4029","66a64cc2cff5e581eebf402b"
// // ]
// //
// // ["66a64cf0cff5e581eebf402d","66a64d27cff5e581eebf402f",
// // "66a64d46cff5e581eebf4031","66a64d69cff5e581eebf4033",
// // "66a64d8ecff5e581eebf4035","66a64da8cff5e581eebf4037",

// // "66a64db6cff5e581eebf4039","66a64dd5cff5e581eebf403b"
// // ]







//     // ["66a648ad7729155bcd64cbc7"]
//     // [ "66a64975cff5e581eebf4003","66a649a4cff5e581eebf4005"]
//     // ["66a649b6cff5e581eebf4007","jackets","66a649dccff5e581eebf400b","66a64a39cff5e581eebf400d","66a64a57cff5e581eebf400f","66a64a6ecff5e581eebf4011","66a64a85cff5e581eebf4013","66a64a9dcff5e581eebf4015","66a64ab3cff5e581eebf4017","66a64ac7cff5e581eebf4019","66a64bcacff5e581eebf401b","66a64bf6cff5e581eebf401d","66a64c21cff5e581eebf4021","66a64c4dcff5e581eebf4023","66a64c67cff5e581eebf4025","66a64c7ccff5e581eebf4027","66a64c98cff5e581eebf4029","66a64cc2cff5e581eebf402b","66a64cf0cff5e581eebf402d","66a64d27cff5e581eebf402f","66a64d46cff5e581eebf4031","66a64d69cff5e581eebf4033","66a64d8ecff5e581eebf4035","66a64da8cff5e581eebf4037","66a64db6cff5e581eebf4039","66a64dd5cff5e581eebf403b"]
// }


// {
//     "name": "Product Name",
//     "category": ["66a66aa2e2f07a13227a03d9"],
//     "subcategory": ["66a64975cff5e581eebf4003"],
//     "description": "Product Description",
//     "price": 100,
//     "size": ["S", "M", "L"],
//     "color": ["Red", "Blue"],
//     "stock": 10,
//     "brand": "Brand Name",
//     "isFeatured": false,
//     "isNewArrival": true,
//     "images": ["image1Url", "image2Url"]
// }


// subcat
// {
//   "name": "mobile",
//   "slug": "mobile",
//   "link": "/subcategories/mobile",
//   "isFeatured": false,
//   "isNewArrival": true
// }

// {
//   "name": "Shirts",
//   "slug": "shirts",
//   "link": "/subcategories/shirts",
//   "isFeatured": false,
//   "isNewArrival": true
// }


// {
//   "category": "66a62e52cbe353d46092039e", // Replace CATEGORY_ID with the ID you got from step 2
//   "name": "Cufflinks",
//   "slug": "cufflinks",
//   "link": "/male/cufflinks",
//   "isFeatured": false,
//   "isNewArrival": true
// }

// {
//   "category": "66a62e52cbe353d46092039e",
//   "name": "Smartphones",
//   "slug": "smartphones",
//   "link": "/male/smartphones",
//   "isFeatured": false,
//   "isNewArrival": true

// }


// {
// //   "name": "sami",
// //   "username": "sami",
//   "email": "asad@gmail.com",
//   "password": "asadrao"
// //   "confirmPassword": "asadrao",
// //   "role": ""
// }


// {
//   "name": "Product Name",
//   "category": "Category Name",
//   "subcategory": "Subcategory Name",
//   "description": "Product Description",
//   "price": 100,
//   "size": ["S", "M", "L"],
//   "color": ["Red", "Blue"],
//   "stock": 50,
//   "brand": "Brand Name",
//   "images": ["cloudinary_image_url_1", "cloudinary_image_url_2"],
//   "isFeatured": false,
//   "isNewArrival": true
// }




// {
//   "name": "Updated Product Name",
//   "price": 120
// }
// {
//   "email": "admin@example.com",
//   "password": "hashedPassword"
// }

