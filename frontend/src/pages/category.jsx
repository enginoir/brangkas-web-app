import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import 'bootstrap/dist/css/bootstrap.min.css';

export const Category = () => {
  const [categorys, setCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [editedCategory, setEditedCategory] = useState({
    id: null,
    category_name: '',
  });

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const response = await axios.get('http://localhost:2000/category');
    setCategory(response.data);
  };

  const editCategory = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:2000/category/${categoryId}`);
      setSelectedCategoryId(categoryId);
      setEditedCategory({
        id: response.data.id,
        category_name: response.data.category_name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateCategory = async () => {
    try {
      await axios.patch(`http://localhost:2000/category/${editedCategory.id}`, editedCategory);
      getCategory();
      // Clear the selected category and edited category state
      setSelectedCategoryId(null);
      setEditedCategory({ id: null, category_name: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:2000/category/${categoryId}`);
      getCategory();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryNameChange = (event) => {
    setEditedCategory({ ...editedCategory, category_name: event.target.value });
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{selectedCategoryId ? 'Edit Category' : 'Add & Update Category'}</Form.Label>
                <Form.Control type="text" placeholder="Enter category" value={editedCategory.category_name} onChange={handleCategoryNameChange} />
                <Form.Text className="text-muted">Category for menu.</Form.Text>
              </Form.Group>
              {selectedCategoryId ? (
                <Button variant="dark" onClick={updateCategory}>
                  Update
                </Button>
              ) : (
                <Button variant="outline-dark" type="submit">
                  Submit
                </Button>
              )}
            </Form>
          </Col>
          <Col xs={12} md={6}>
            <ListGroup as="ol" numbered>
              {categorys.map((category) => (
                <ListGroup.Item as="li" key={category.id}>
                  {category.category_name}
                  <Button variant="dark" className="mx-2" onClick={() => editCategory(category.id)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => deleteCategory(category.id)}>
                    Delete
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};
