import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UserNavbar from '../../components/Navbar/UserNavbar';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import styles from './ecomUserHome.module.css';
import axios from 'axios';

import firstSlide from '../../../assets/carousel1.jpg';
import secondSlide from '../../../assets/carousel2.jpg';
import thirdSlide from '../../../assets/carousel3.jpg';

function EcomUserHome() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products/featured');
        console.log('Fetched data:', response.data);
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (!Array.isArray(featuredProducts)) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserNavbar />
      <div className={styles.carouselContainer}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={firstSlide}
              alt="First slide"
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={secondSlide}
              alt="Second slide"
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={thirdSlide}
              alt="Third slide"
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className={styles.featuredProductsContainer}>
        {featuredProducts.length > 0 ? (featuredProducts.map(({ category, products }) => (
          <div key={category} className={styles.categorySection}>
            <h2>{category} - Featured Products</h2>
            <div className={styles.productRow}>
              {products.map(product => (
                <Card key={product._id} className={styles.productCard}>
                  <Card.Img variant="top" src={product.imageUrl} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      {product.description}
                      <br />
                      <strong>${product.price}</strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        ))):(
          <p>No featured products available.</p>
        ) }
      </div>
    </div>
  );
}

export default EcomUserHome;
