"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';

const textStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    WebkitLineClamp: 2,
    textOverflow: "ellipsis",
  };

export default function HomeEvent() {
  const [dataEvent, setDataEvent] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);


  const getApi = async () => {
    try {
      const data = await fetch("/api/event-data");
      const result = await data.json();
      setDataEvent(result.data);
    } catch (error) {
      console.log("Error fetching event data:", error);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = await fetch(`/api/event-by-search?search=${inputSearch}`, {
        method: "POST",
        body: JSON.stringify({ search: inputSearch })
      });

      const result = await requestData.json();
      setDataEvent(result.data);
    } catch (error) {
      console.log("Error on search request:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Event Showcase</h1>

 {/* carousel */}
 <div id="eventCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {dataEvent.map((el, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={el.id}
              data-bs-interval="3000" 
            >
              <img
                src={el.image}
                className="d-block w-100"
                alt={el.title}
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-2 rounded">
                <h5>{el.title}</h5>
                <p>{el.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#eventCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#eventCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

 {/* <div id="eventCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {dataEvent.map((el, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : "1000"}`}
              key={el.id}
              data-bs-interval="1000"
            >
              <img src={el.image} className="d-block w-100" alt={el.title} />
              <div className="carousel-caption d-none d-md-block">
                <h5>{el.title}</h5>
                <p>{el.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

<br>
</br>
      {/* Form Pencarian */}
      <form onSubmit={handleOnSubmit} className="d-flex justify-content-center mb-4">
        <input
          className="form-control me-2 w-50"
          type="text"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          placeholder="Search events..."
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>

      {/* Daftar Event */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {dataEvent.length > 0 ? (
          dataEvent.map((el) => (
            <div className="col" key={el.id}>
              <div className="card h-100">
                {el.image && (
                  <img
                    src={el.image}
                    className="card-img-top"
                    alt={el.title}
                    style={{ maxHeight: "160px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{el.title}</h5>
                  <p className="card-text" style={textStyle}>
                    {el.description}
                    </p>
                  {/* <p className="card-text">
                    {el.description.length > 100
                      ? `${el.description.substring(0, 100)}...`
                      : el.description}
                  </p> */}
                  
                  <Link href={`/detail-event/${el.id}`} className="btn btn-outline-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No events found.</p>
        )}
      </div>
    </div>
  );
}
