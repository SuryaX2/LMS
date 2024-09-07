import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Sarah J.',
            rating: 5,
            text: `This library system has transformed my reading habits. It's so easy to find and borrow books now!`,
        },
        {
            name: 'Mike T.',
            rating: 4,
            text: `The personalized recommendations are spot-on. I've discovered so many great books I wouldn't have found otherwise.`,
        },
        {
            name: 'Emily R.',
            rating: 5,
            text: 'As a student, this library system has been invaluable. The wide selection and easy borrowing process have made my research so much easier.',
        },
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            index < rating ? (
                <StarIcon key={index} style={{ color: '#FCD34D' }} />
            ) : (
                <StarBorderIcon key={index} style={{ color: '#FCD34D' }} />
            )
        ));
    };

    const cardStyle = {
        backgroundColor: '#1F2937',
        color: 'white',
        border: 'none',
        height: '100%',
        boxShadow: '0px 0px 7px 0px aqua'
    };

    return (
        <Container className="py-16">
            <div className="relative text-right">
                <h2 className='text-4xl font-bold text-white text-right mb-4 border-b-2 border-blue-500 inline-block pb-2'>
                    What Our Users Say
                </h2>
            </div>
            <Row>
                {testimonials.map((testimonial, index) => (
                    <Col key={index} xs={12} md={4} className="mb-8">
                        <Card style={cardStyle}>
                            <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    {renderStars(testimonial.rating)}
                                </div>
                                <Card.Text style={{ flexGrow: 1, color: '#E5E7EB' }}>{testimonial.text}</Card.Text>
                                <Card.Title style={{ marginTop: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
                                    {testimonial.name}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Testimonials;