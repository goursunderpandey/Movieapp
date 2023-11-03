import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const Favorite = () => {
  const [fav, setFev] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/favorite')
      .then(response => {
        setFev(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const deleteFavorites = (id) => {
    axios.delete(`http://localhost:5000/api/favorite/${id}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      })
      .then(() => {
        axios.get('http://localhost:5000/api/favorite')
          .then(response => {
            setFev(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      });
  };

  return (
    <div className="container my-4">
      {fav.message === 'No Favorite found' ? (
        <h1 className="text-center">Favorite is Empty</h1>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {fav.map(result => (
            <div className="col mb-4" key={result._id}>
              <div className="card">
                <img src={result.Poster} className="card-img-top" alt="Movie Poster" />
                <div className="card-body">
                  <h5 className="card-title">{result.Title}</h5>
                  <p className="card-text">Year: {result.Year}</p>
                </div>
                <div className="card-footer">
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteFavorites(result._id);
                    }}
                  >
                    Delete From Favorites
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
