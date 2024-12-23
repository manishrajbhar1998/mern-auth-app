

const getProduct = async (req,res) => {
    res.status(200).json([
        {
            name: "iphone15",
            price: "$100"
        },
        {
            name: "iphone16",
            price: "$150"
        }
    ])
}

module.exports = {
    getProduct
}