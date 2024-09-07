import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const HowItWorks = () => {
  const steps = [
    { icon: <PersonAddIcon fontSize="large" />, title: 'Sign Up', description: 'Create your free account' },
    { icon: <SearchIcon fontSize="large" />, title: 'Find Books', description: 'Browse our vast collection' },
    { icon: <BookmarkAddIcon fontSize="large" />, title: 'Borrow', description: 'Reserve or check out books' },
    { icon: <MenuBookIcon fontSize="large" />, title: 'Read & Enjoy', description: 'Dive into your chosen books' },
  ];

  return (
    <Container className="py-10 text-white">
      <div className="relative text-center">
        <h2 className="text-4xl font-bold text-white text-right mb-4 border-b-2 border-blue-500 inline-block pb-2">How It Works</h2>
      </div>
      <Row>
        {steps.map((step, index) => (
          <Col key={index} xs={12} sm={6} md={3} className="mb-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-700 rounded-full p-4 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HowItWorks;