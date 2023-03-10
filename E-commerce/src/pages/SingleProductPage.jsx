import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';

import {
    Loading,
    Error,
    ProductImages,
    Stars,
    PageHero,
    AddToCart,
} from '../components'

const SingleProductPage = () => {
    const {
        singleProductLoading: loading,
        singleProductError: error,
        singleProduct: product,
        fetchSingleProduct,
    } = useProductsContext();
    const {
        name,
        price,
        description,
        stock,
        stars,
        id: sku,
        reviews,
        images,
        company,
    } = product;
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = name;
    }, []);

    useEffect(() => {
        fetchSingleProduct(`${url}${id}`);
    }, [id]);

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <Error message='fetching product' />
    }

    return (
        <Wrapper>
            <PageHero title={name} product />
            <div className='section section-center page'>
                <Link to='/products' className='btn'>
                    back to products
                </Link>
                <div className="product-center">
                    <ProductImages images={images} />
                    <section className='content'>
                        <h2>{name}</h2>
                        <Stars stars={stars} reviews={reviews} />
                        <h5 className='price'>{formatPrice(price)}</h5>
                        <p className='desc'>{description}</p>
                        <p className='info'>
                            <span>Available :</span>
                            {sku}                        </p>
                        <p className='info'>
                            <span>SKU :</span>
                            {stock > 0 ? "In stock" : "Out of stock"}
                        </p>
                        <p className='info'>
                            <span>Brand :</span>
                            {company}
                        </p>
                        <hr />
                        {stock > 0 && <AddToCart product={product} />}
                    </section>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.main`
    .product-center{
        display: grid;
        gap: 4rem;
        margin-top: 2rem;
    }
    .price{
        color: var(--clr-primary-5);
    }
    .desc {
        line-height: 2;
        max-width: 45rem;
    }
    .info {
        text-transform: capitalize;
        width: 300px;
        display: grid;
        grid-template-columns: 125px 1fr;
        span {
            font-weight: 700;
        }
    }

    @media (min-width: 992px) {
        .product-center {
            grid-template-columns: 1fr 1fr;
            align-items: center;
        }
        .price {
            font-size: 1.25rem;
        }
    }
`;

export default SingleProductPage;