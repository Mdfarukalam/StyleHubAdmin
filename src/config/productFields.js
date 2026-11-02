export const productFields = {
    men: {
        title: "Men Product",
        fields: [
            { name: "name", label: "Product Name", type: "text", required: true },
            { name: "brand", label: "Brand", type: "text", required: true },
            {
                name: "category", label: "Category", type: "select",defaultValue: "T-Shirts",

                options: ["T-Shirts", "Jeans", "Shirts", "Jackets"],
            },
              // Image Upload
   
            { name: "price", label: "Selling Price", type: "number", required: true },
            { name: "originalPrice", label: "Original Price", type: "number", required: true },
            { name: "discount", label: "Discount", type: "number", required: true },
            { name: "description", label: "Description", type: "textarea" },
          
      {
  name: "colorVariants",
  label: "Product Colors, Images & Sizes",
  type: "colorVariants",
},
            { name: "stock", label: "Stock", type: "number" },
            { name: "rating", label: "Rating", type: "number" },
            { name: "isActive", label: "Active Product", type: "checkbox" },
        ],
    },




    women: {
        title: "Women Product", // Yahan Men Product ki jagah Women Product

        fields: [
            { name: "name", label: "Product Name", type: "text", required: true },
            { name: "brand", label: "Brand", type: "text", required: true },
            {
                name: "category", label: "Category", type: "select",defaultValue: "T-Shirts",

                options: ["T-Shirts", "Jeans", "Shirts", "Jackets"],
            },
              // Image Upload
 
            { name: "price", label: "Selling Price", type: "number", required: true },
            { name: "originalPrice", label: "Original Price", type: "number", required: true },
            { name: "discount", label: "Discount", type: "number", required: true },
            { name: "description", label: "Description", type: "textarea" },
          
          {
  name: "colorVariants",
  label: "Product Colors, Images & Sizes",
  type: "colorVariants",
},
            { name: "stock", label: "Stock", type: "number" },
            { name: "rating", label: "Rating", type: "number" },
            { name: "isActive", label: "Active Product", type: "checkbox" },
        ],
    },

    kids: {
        title: "kids Product", // Yahan Men Product ki jagah Women Product

        fields: [
            { name: "name", label: "Product Name", type: "text", required: true },
            { name: "brand", label: "Brand", type: "text", required: true },
            {
                name: "category", label: "Category", type: "select",defaultValue: "T-Shirts",

                options: ["T-Shirts", "Jeans", "Shirts", "Jackets"],
            },
              // Image Upload
   
            { name: "price", label: "Selling Price", type: "number", required: true },
            { name: "originalPrice", label: "Original Price", type: "number", required: true },
            { name: "discount", label: "Discount", type: "number", required: true },
            { name: "description", label: "Description", type: "textarea" },
          
   {
  name: "colorVariants",
  label: "Product Colors, Images & Sizes",
  type: "colorVariants",
},
            { name: "stock", label: "Stock", type: "number" },
            { name: "rating", label: "Rating", type: "number" },
            { name: "isActive", label: "Active Product", type: "checkbox" },
        ],
    },



    topProducts: {
        title: "Top Product",  

        fields: [
            { name: "name", label: "Product Name", type: "text", required: true },
            { name: "brand", label: "Brand", type: "text", required: true },
            {
                name: "category", label: "Category", type: "select",defaultValue: "T-Shirts",

                options: ["T-Shirts", "Jeans", "Shirts", "Jackets"],
            },

              // Image Upload
 
            { name: "price", label: "Selling Price", type: "number", required: true },
            { name: "originalPrice", label: "Original Price", type: "number", required: true },
            { name: "discount", label: "Discount", type: "number", required: true },
            { name: "description", label: "Description", type: "textarea" },
          
       {
  name: "colorVariants",
  label: "Product Colors, Images & Sizes",
  type: "colorVariants",
},
            { name: "stock", label: "Stock", type: "number" },
            { name: "rating", label: "Rating", type: "number" },
            { name: "isActive", label: "Active Product", type: "checkbox" },
        ],
    },

    arrivals: {
        title: "New Arrivals Product", // Yahan Men Product ki jagah Women Product

        fields: [
            { name: "name", label: "Product Name", type: "text", required: true },
            { name: "brand", label: "Brand", type: "text", required: true },
            {
                name: "category", label: "Category", type: "select",defaultValue: "T-Shirts",

                options: ["T-Shirts", "Jeans", "Shirts", "Jackets"],
            },

              // Image Upload
   
            { name: "price", label: "Selling Price", type: "number", required: true },
            { name: "originalPrice", label: "Original Price", type: "number", required: true },
            { name: "discount", label: "Discount", type: "number", required: true },
            { name: "description", label: "Description", type: "textarea" },
          
{
  name: "colorVariants",
  label: "Product Colors, Images & Sizes",
  type: "colorVariants",
},
            { name: "stock", label: "Stock", type: "number" },
            { name: "rating", label: "Rating", type: "number" },
            { name: "isActive", label: "Active Product", type: "checkbox" },
        ],
    },

};