export const productFields = {
    men: {
        title: "Men Product",
        fields: [


            { name: "brand", label: "Brand", type: "text", required: true },
            {
                name: "category", label: "Category", type: "select", defaultValue: "T-Shirts",
                options: [
                    "T-Shirts",
                    "Shirts",
                    "Jeans",
                    "Shorts",
                    "Trousers",
                    "Jackets",
                    "Hoodies",
                    "Sweatshirts",
                    "Sweaters",
                    "Dresses",
                    "Frocks",
                    "Kurtis",
                    "Tops",
                    "Leggings",
                    "Skirts",
                    "Co-Ord Sets",
                    "Ethnic Wear",
                    "Party Wear",
                    "Nightwear",
                    "Track Pants",
                    "Tracksuits",
                    "Rompers",
                    "Jumpsuits",
                    "School Uniform"
                ],
            },
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
        title: "Women Product",

        fields: [


            { name: "brand", label: "Brand", type: "text", required: true },
            {
                name: "category", label: "Category", type: "select", defaultValue: "T-Shirts",

                options: [
                    "T-Shirts",
                    "Jeans",
                    "Shirts",
                    "Jackets",
                    "Kurtis",
                    "Tops",
                    "Sarees",
                    "Dresses",
                    "Skirts",
                    "Leggings",
                    "Palazzos",
                    "Ethnic Wear",
                    "Western Wear",
                    "Suits",
                    "Lehenga",
                    "Dupatta",
                    "Shorts",
                    "Co-Ord Sets",
                    "Sweaters",
                    "Sweatshirts"
                ],
            },
            // Image Upload

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
        title: "kids Product",

        fields: [


            { name: "brand", label: "Brand", type: "text", required: true },
            {
                name: "category", label: "Category", type: "select", defaultValue: "T-Shirts",

                options: [
                    "T-Shirts",
                    "Shirts",
                    "Jeans",
                    "Shorts",
                    "Trousers",
                    "Jackets",
                    "Hoodies",
                    "Sweatshirts",
                    "Sweaters",
                    "Dresses",
                    "Frocks",
                    "Kurtis",
                    "Tops",
                    "Leggings",
                    "Skirts",
                    "Co-Ord Sets",
                    "Ethnic Wear",
                    "Party Wear",
                    "Nightwear",
                    "Track Pants",
                    "Tracksuits",
                    "Rompers",
                    "Jumpsuits",
                    "School Uniform"
                ],
            },
            // Image Upload

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


            { name: "brand", label: "Brand", type: "text", required: true },
            {
                name: "category", label: "Category", type: "select", defaultValue: "T-Shirts",

                options: [
                    "T-Shirts",
                    "Shirts",
                    "Jeans",
                    "Jackets",
                    "Kurtis",
                    "Tops",
                    "Sarees",
                    "Dresses",
                    "Skirts",
                    "Lehengas",
                    "Kids Wear",
                    "Shoes",
                    "Accessories",
                    "Other"
                ],
            },

            // Image Upload


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
        title: "New Arrivals Product",

        fields: [


            { name: "brand", label: "Brand", type: "text", required: true },
            {
                name: "category", label: "Category", type: "select", defaultValue: "T-Shirts",

                options: [
                    "T-Shirts",
                    "Shirts",
                    "Jeans",
                    "Jackets",
                    "Hoodies",
                    "Sweatshirts",
                    "Sweaters",
                    "Trousers",
                    "Shorts",
                    "Kurtis",
                    "Tops",
                    "Sarees",
                    "Dresses",
                    "Skirts",
                    "Lehengas",
                    "Ethnic Wear",
                    "Western Wear",
                    "Kids Wear",
                    "Shoes",
                    "Accessories",
                    "Other"
                ],
            },

            // Image Upload


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


    Addimage: {
        title: "Image Product",

        fields: [
                        { name: "images", label: "images", type: "text", required: true },

        ]
    }

     

};