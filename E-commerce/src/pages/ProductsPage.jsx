import React from 'react'
import { PageHero } from '../components'
import styled from 'styled-components'


const ProductsPage = () => {
    return (
        <main id='main'>
            <PageHero title='products' />
            <div className='page'>
                Products Page Goes Here
            </div>
        </main>
    );
};

const Wrapper = styled.div`
    .products {
        display: grid;
        gap: 3rem 1.5rem;
        margin: 4rem auto;
    }

    @media (min-width: 768px) {
        .products {
            grid-template-columns: 200px 1fr;
        }
}
`;

export default ProductsPage