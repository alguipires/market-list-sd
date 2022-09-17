import { GetStaticProps } from 'next'

interface Brandsprops {
    brands: Array<String>
}

export default function brands({brands}:Brandsprops) {
  return (
    <div>
        <h1>Brands</h1>
        <br />
        
        {
            brands.map((brands, index) => (
                <div key={index}>{brands}</div>  
            ))}
    </div>
  );
}


export const getStaticProps: GetStaticProps = async (context) => {
    const brands = ["dell", "lenovo", "acer", Math.random().toString()];

    return {
        props:{
            brands,
        },
        revalidate: 10,
    };
};