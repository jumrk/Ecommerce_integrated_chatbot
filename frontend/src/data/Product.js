const products = [
    {
        id: 1,
        name: 'Áo thun trắng Basic',
        price: 150000,
        images: [
            'https://i.pinimg.com/736x/ea/5e/09/ea5e096ba271673250b76e2ba6b20c04.jpg',
            'https://i.pinimg.com/736x/9e/41/8f/9e418f03e1da0adfa19f254a1f37d3c4.jpg',
            'https://i.pinimg.com/736x/ce/5b/bb/ce5bbb67a205e25e233be3f976b31fc9.jpg',
            'https://i.pinimg.com/736x/1f/23/76/1f2376ac692d97d76e02145b0243cf99.jpg'
        ],
        category: 'T-shirt',
        colors: ['white', 'black', 'gray'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Áo thun basic chất liệu cotton 100%, form regular fit',
        specifications: {
            material: '100% cotton',
            style: 'Basic',
            fit: 'Regular fit',
            origin: 'Việt Nam',
            washCare: 'Giặt máy ở nhiệt độ thường'
        },
        rating: 4.5,
        reviews: 120,
        stock: {
            'S-white': 10,
            'M-white': 15,
            'L-white': 20,
            'XL-white': 5
        }
    },
    {
        id: 2,
        name: 'Quần Jeans Slim Fit',
        price: 350000,
        images: [
            'https://i.pinimg.com/736x/9e/41/8f/9e418f03e1da0adfa19f254a1f37d3c4.jpg',
            'https://i.pinimg.com/736x/ea/5e/09/ea5e096ba271673250b76e2ba6b20c04.jpg',
            'https://i.pinimg.com/736x/fe/8f/ce/fe8fceb06d3132d5f578427d5e2294b5.jpg',
            'https://i.pinimg.com/736x/ce/5b/bb/ce5bbb67a205e25e233be3f976b31fc9.jpg'
        ],
        category: 'Quần Jeans',
        colors: ['blue', 'black', 'light-blue'],
        sizes: ['28', '29', '30', '31', '32'],
        description: 'Quần jeans nam form slim fit với thiết kế hiện đại',
        specifications: {
            material: '98% cotton, 2% spandex',
            style: 'Slim fit',
            fit: 'Ôm vừa',
            origin: 'Việt Nam',
            washCare: 'Giặt máy với nước lạnh'
        },
        discount: 20,
        rating: 4.8,
        reviews: 89,
        stock: {
            '29-blue': 8,
            '30-blue': 12,
            '31-blue': 15,
            '32-blue': 7
        }
    },
    {
        id: 3,
        name: 'Giày Sneaker Classic',
        price: 800000,
        images: [
            'https://i.pinimg.com/736x/ce/5b/bb/ce5bbb67a205e25e233be3f976b31fc9.jpg',
            'https://i.pinimg.com/736x/1f/23/76/1f2376ac692d97d76e02145b0243cf99.jpg',
            'https://i.pinimg.com/736x/ea/5e/09/ea5e096ba271673250b76e2ba6b20c04.jpg',
            'https://i.pinimg.com/736x/9e/41/8f/9e418f03e1da0adfa19f254a1f37d3c4.jpg'
        ],
        category: 'Giày',
        colors: ['black', 'white', 'gray'],
        sizes: ['39', '40', '41', '42', '43'],
        description: 'Giày sneaker thiết kế basic, dễ phối đồ',
        specifications: {
            material: 'Canvas, đế cao su',
            style: 'Classic',
            fit: 'True to size',
            origin: 'Việt Nam',
            washCare: 'Lau chùi bằng khăn ẩm'
        },
        rating: 4.7,
        reviews: 150,
        stock: {
            '40-black': 10,
            '41-black': 15,
            '42-black': 20
        }
    },
    {
        id: 4,
        name: 'Mũ Snapback Classic',
        price: 120000,
        images: [
            'https://i.pinimg.com/736x/1f/23/76/1f2376ac692d97d76e02145b0243cf99.jpg',
            'https://i.pinimg.com/736x/fe/8f/ce/fe8fceb06d3132d5f578427d5e2294b5.jpg',
            'https://i.pinimg.com/736x/ce/5b/bb/ce5bbb67a205e25e233be3f976b31fc9.jpg',
            'https://i.pinimg.com/736x/ea/5e/09/ea5e096ba271673250b76e2ba6b20c04.jpg'
        ],
        category: 'Phụ kiện',
        colors: ['black', 'red', 'navy'],
        sizes: ['One size'],
        description: 'Mũ snapback phong cách đường phố',
        specifications: {
            material: '100% cotton, khóa nhựa',
            style: 'Street style',
            fit: 'Adjustable',
            origin: 'Việt Nam',
            washCare: 'Giặt tay nhẹ nhàng'
        },
        rating: 4.3,
        reviews: 45,
        stock: {
            'OneSize-black': 25,
            'OneSize-red': 20,
            'OneSize-navy': 15
        }
    },
    {
        id: 5,
        name: 'Túi Tote Canvas',
        price: 200000,
        images: [
            'https://i.pinimg.com/736x/fe/8f/ce/fe8fceb06d3132d5f578427d5e2294b5.jpg',
            'https://i.pinimg.com/736x/1f/23/76/1f2376ac692d97d76e02145b0243cf99.jpg',
            'https://i.pinimg.com/736x/9e/41/8f/9e418f03e1da0adfa19f254a1f37d3c4.jpg',
            'https://i.pinimg.com/736x/ea/5e/09/ea5e096ba271673250b76e2ba6b20c04.jpg'
        ],
        category: 'Phụ kiện',
        colors: ['beige', 'black', 'white'],
        sizes: ['One size'],
        description: 'Túi tote vải canvas cao cấp',
        specifications: {
            material: 'Canvas 12oz',
            style: 'Casual',
            fit: 'Large capacity',
            origin: 'Việt Nam',
            washCare: 'Giặt tay với nước lạnh'
        },
        discount: 15,
        rating: 4.6,
        reviews: 78,
        stock: {
            'OneSize-beige': 30,
            'OneSize-black': 25,
            'OneSize-white': 20
        }
    },
    {
        id: 6,
        name: 'Túi Tote Canvas',
        price: 200000,
        images: [
            'https://i.pinimg.com/736x/fe/8f/ce/fe8fceb06d3132d5f578427d5e2294b5.jpg',
            'https://i.pinimg.com/736x/1f/23/76/1f2376ac692d97d76e02145b0243cf99.jpg',
            'https://i.pinimg.com/736x/9e/41/8f/9e418f03e1da0adfa19f254a1f37d3c4.jpg',
            'https://i.pinimg.com/736x/ea/5e/09/ea5e096ba271673250b76e2ba6b20c04.jpg'
        ],
        category: 'Phụ kiện',
        colors: ['beige', 'black', 'white'],
        sizes: ['One size'],
        description: 'Túi tote vải canvas cao cấp',
        specifications: {
            material: 'Canvas 12oz',
            style: 'Casual',
            fit: 'Large capacity',
            origin: 'Việt Nam',
            washCare: 'Giặt tay với nước lạnh'
        },
        discount: 15,
        rating: 4.6,
        reviews: 78,
        stock: {
            'OneSize-beige': 30,
            'OneSize-black': 25,
            'OneSize-white': 20
        }
    },
    {
        id: 7,
        name: 'Túi Tote Canvas',
        price: 200000,
        images: [
            'https://i.pinimg.com/736x/fe/8f/ce/fe8fceb06d3132d5f578427d5e2294b5.jpg',
            'https://i.pinimg.com/736x/1f/23/76/1f2376ac692d97d76e02145b0243cf99.jpg',
            'https://i.pinimg.com/736x/9e/41/8f/9e418f03e1da0adfa19f254a1f37d3c4.jpg',
            'https://i.pinimg.com/736x/ea/5e/09/ea5e096ba271673250b76e2ba6b20c04.jpg'
        ],
        category: 'Phụ kiện',
        colors: ['beige', 'black', 'white'],
        sizes: ['One size'],
        description: 'Túi tote vải canvas cao cấp',
        specifications: {
            material: 'Canvas 12oz',
            style: 'Casual',
            fit: 'Large capacity',
            origin: 'Việt Nam',
            washCare: 'Giặt tay với nước lạnh'
        },
        discount: 15,
        rating: 4.6,
        reviews: 78,
        stock: {
            'OneSize-beige': 30,
            'OneSize-black': 25,
            'OneSize-white': 20
        }
    },
    {
        id: 8,
        name: 'Túi Tote Canvas',
        price: 200000,
        images: [
            'https://i.pinimg.com/736x/fe/8f/ce/fe8fceb06d3132d5f578427d5e2294b5.jpg',
            'https://i.pinimg.com/736x/1f/23/76/1f2376ac692d97d76e02145b0243cf99.jpg',
            'https://i.pinimg.com/736x/9e/41/8f/9e418f03e1da0adfa19f254a1f37d3c4.jpg',
            'https://i.pinimg.com/736x/ea/5e/09/ea5e096ba271673250b76e2ba6b20c04.jpg'
        ],
        category: 'Phụ kiện',
        colors: ['beige', 'black', 'white'],
        sizes: ['One size'],
        description: 'Túi tote vải canvas cao cấp',
        specifications: {
            material: 'Canvas 12oz',
            style: 'Casual',
            fit: 'Large capacity',
            origin: 'Việt Nam',
            washCare: 'Giặt tay với nước lạnh'
        },
        discount: 15,
        rating: 4.6,
        reviews: 78,
        stock: {
            'OneSize-beige': 30,
            'OneSize-black': 25,
            'OneSize-white': 20
        }
    }, {
        id: 9,
        name: 'Túi Tote Canvas',
        price: 200000,
        images: [
            'https://i.pinimg.com/736x/fe/8f/ce/fe8fceb06d3132d5f578427d5e2294b5.jpg',
            'https://i.pinimg.com/736x/1f/23/76/1f2376ac692d97d76e02145b0243cf99.jpg',
            'https://i.pinimg.com/736x/9e/41/8f/9e418f03e1da0adfa19f254a1f37d3c4.jpg',
            'https://i.pinimg.com/736x/ea/5e/09/ea5e096ba271673250b76e2ba6b20c04.jpg'
        ],
        category: 'Phụ kiện',
        colors: ['beige', 'black', 'white'],
        sizes: ['One size'],
        description: 'Túi tote vải canvas cao cấp',
        specifications: {
            material: 'Canvas 12oz',
            style: 'Casual',
            fit: 'Large capacity',
            origin: 'Việt Nam',
            washCare: 'Giặt tay với nước lạnh'
        },
        discount: 15,
        rating: 4.6,
        reviews: 78,
        stock: {
            'OneSize-beige': 30,
            'OneSize-black': 25,
            'OneSize-white': 20
        }
    }
];

export default products;