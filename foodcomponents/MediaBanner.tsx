import { Card, Rate } from 'antd';
import { Image } from 'antd';

const categories = [
    {
        title: 'NEW PRODUCTS',
        products: [
            { image: '/img/cloth13.jpg', name: 'Product 1', rating: 4, price: 'BDT:153.00' },
            { image: '/img/cloth12.jpg', name: 'Product 2', rating: 4, price: 'BDT:153.00' }
        ],
    },
    {
        title: 'FEATURE PRODUCTS',
        products: [
            { image: '/img/cloth18.jpg', name: 'Product 3', rating: 4, price: 'BDT:153.00' },
            { image: '/img/cloth10.jpg', name: 'Product 4', rating: 4, price: 'BDT:153.00' }
        ],
    },
    {
        title: 'BEST SELLERS',
        products: [
            { image: '/img/cloth9.jpg', name: 'Product 1', rating: 4, price: 'BDT:153.00' },
            { image: '/img/cloth8.jpg', name: 'Product 2', rating: 4, price: 'BDT:153.00' }
        ],
    },
    {
        title: '50% OFF',
        products: [
            { image: '/img/cloth14.jpg', name: 'Product 3', rating: 4, price: 'BDT:153.00' },
            { image: '/img/cloth15.jpg', name: 'Product 4', rating: 4, price: 'BDT:153.00' }
        ],
    },
];

export default function ProductGrid() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                    <div key={index} className="flex flex-col">
                        <h2 className="bg-primary text-white p-4 text-lg font-bold mb-4 rounded-t text-center">
                            {category.title}
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {category.products.map((product, idx) => (
                                <Card
                                    key={idx}
                                    hoverable
                                    cover={
                                        <div className="w-full h-48 relative flex items-center justify-center overflow-hidden">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                preview={true} // Disable the preview popup
                                                style={{ objectFit: 'cover', width: '100%', height: '100%' }} // Apply CSS for sizing and fitting
                                            />
                                        </div>
                                    }
                                    className="flex flex-col items-center justify-between mb-4 w-full sm:w-80"
                                >
                                    <div className="text-center">
                                        <Rate disabled defaultValue={product.rating} />
                                        <p className="text-base font-medium mt-2">{product.name}</p>
                                        <p className="text-red-600 font-bold mt-1">{product.price}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
