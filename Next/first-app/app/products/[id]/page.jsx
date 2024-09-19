function Product({ params }) {
    // 将 id 转换为数字类型
    const productId = Number(params.id); // 或 parseInt(params.id, 10)

    if (isNaN(productId)) {
        return <div>无效的产品 ID</div>;
    }

    return (
        <div>
            <h1>Product {productId}</h1>
        </div>
    );
}

export default Product;
