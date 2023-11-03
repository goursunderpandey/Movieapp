import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [search, setSearch] = useState('');
  const [res, setRes] = useState([]);
  const [posterDimensions, setPosterDimensions] = useState({ width: '200px', height: '300px' });

  const onChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (search.length < 3) {
      toast.error("Please enter at least three characters");
    } else {
      axios.get(`http://www.omdbapi.com/?s=${search}&apikey=54f08ca1`)
        .then((response) => {
          setRes(response.data.Search || []);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const addToFavorites = (postdata) => {
    axios.post("http://localhost:5000/api/favorite", postdata)
      .then(response => {
        const newFavorite = response;
        console.log(newFavorite);
        toast.success("Added to Favorite ");
      })
      .catch(error => {
        console.error(error);
        toast.error('Something is wrong');
      });
  };

  useEffect(() => {
    res.forEach(result => {
      if (result.Poster) {
        const img = new Image();
        img.src = result.Poster;
        img.onload = () => {
          setPosterDimensions({ width: `${img.width}px`, height: `${img.height}px` });
        };
      } else {
        // Set default dimensions when the poster is missing
        setPosterDimensions({ width: '200px', height: '300px' });
      }
    });
  }, [res]);

  return (
    <div>
      <div className='search p-4'>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control type="text" placeholder="Write a movie name" value={search} onChange={onChange} />
          </Form.Group>
          <Button variant="primary" type="submit" className='p-2 mx-1 mt-1'>Search</Button>
        </Form>
      </div>
      <div className='main_container'>
        {res.length === 0 ? <h2 className='p-2 '> Search Movies </h2> :
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {res.map(result => (
              <Card key={result.imdbID} className="col mb-4">
                <Card.Img
                  variant="top"
                  src={result.Poster}
                  alt={result.Title}
                  style={{ width: posterDimensions.width, height: posterDimensions.height }}
                />
                <Card.Body>
                  <Card.Title>{result.Title}</Card.Title>
                  <Card.Text>Year: {result.Year}</Card.Text>
                  <Button variant="primary" onClick={() => addToFavorites(result)}>Add to Favorites</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        }
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
