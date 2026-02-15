import React, { useState } from 'react';
import Slider from 'react-slick';
import { StarOutlined, ShoppingCartOutlined, EyeOutlined, HeartOutlined, ZoomInOutlined } from '@ant-design/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Container from './Container';
import { Modal } from 'antd'; // Import Ant Design's Modal for the preview functionality

// SpecialCard component
// SpecialCard component
const SpecialCard = ({ product, onPreview }: any) => {
    return (
        <div className="relative group border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Product Image */}
            <div className="relative">
                <img src={product.image} alt={product.name} className="w-full object-cover" />

                {/* Sale and New Badges */}
                {product.isNew && (
                    <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">New</span>
                )}
                {product.isOnSale && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">Sale</span>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Rating */}
                <div className="flex items-center mb-2">
                    {[...Array(product.rating)].map((_, index) => (
                        <StarOutlined key={index} className="text-yellow-500" />
                    ))}
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-semibold">{product.name}</h3>

                {/* Prices */}
                <div className="flex items-center space-x-2 mt-2">
                    {product.isOnSale && (
                        <span className="text-gray-500 line-through">BDT:{product.originalPrice}</span>
                    )}
                    <span className="text-xl font-bold text-red-600">BDT:{product.price}</span>
                </div>
            </div>

            {/* Hover Actions */}
            <div className="absolute inset-0 flex items-center justify-center space-x-3 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-200">
                    <ShoppingCartOutlined className="text-xl" />
                </button>
                <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-200">
                    <EyeOutlined className="text-xl" />
                </button>
                <button
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => onPreview(product.image)}
                >
                    <ZoomInOutlined className="text-xl" />
                </button>
                <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-200">
                    <HeartOutlined className="text-xl" />
                </button>
            </div>
        </div>
    );
};

// Slider settings
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
};

const ProductGrid = () => {
    const [previewImage, setPreviewImage] = useState(null);

    const productData = [
        { image: 'img/cloth8.jpg', name: 'Product One', price: 49.99, originalPrice: 59.99, isNew: true, isOnSale: true, rating: 4 },
        { image: 'img/cloth15.jpg', name: 'Product Two', price: 39.99, originalPrice: 49.99, isNew: false, isOnSale: true, rating: 3 },
        { image: 'img/cloth17.jpg', name: 'Product Three', price: 29.99, originalPrice: null, isNew: true, isOnSale: false, rating: 5 },
        { image: 'img/cloth12.jpg', name: 'Product Four', price: 59.99, originalPrice: 69.99, isNew: false, isOnSale: true, rating: 4 },
        { image: 'img/cloth11.jpg', name: 'Product Five', price: 59.99, originalPrice: 69.99, isNew: false, isOnSale: true, rating: 4 },
        { image: 'img/cloth9.jpg', name: 'Product Six', price: 59.99, originalPrice: 69.99, isNew: false, isOnSale: true, rating: 4 },
        // Add more products here
    ];

    const handlePreview = (image: any) => {
        setPreviewImage(image);
    };

    const handleModalCancel = () => {
        setPreviewImage(null);
    };

    return (

        <Container>
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-primary py-4 rounded text-white">
                    Special Offers
                </h2>
                <Slider {...sliderSettings}>
                    {productData.map((product, index) => (
                        <SpecialCard key={index} product={product} onPreview={handlePreview} />
                    ))}
                </Slider>

                {/* Preview Modal */}
                {/* Preview Modal */}
                {previewImage && (
                    <Modal
                        visible={!!previewImage}
                        footer={null}
                        onCancel={handleModalCancel}
                        width={1200}
                    >
                        <img src={previewImage} alt="Preview" className="w-full h-auto" />
                    </Modal>
                )}
            </div>
        </Container>
    );
};

const App = () => {
    return (
        <div>
            <ProductGrid />
        </div>
    );
};

export default App;
