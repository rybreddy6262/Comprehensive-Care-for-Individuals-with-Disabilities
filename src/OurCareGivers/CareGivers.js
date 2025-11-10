import { Component } from "react";
import './CareGivers.css';
import Header from "../Header/Header";
import { Link } from "react-router-dom";

class CareGivers extends Component {
  state = { caregivers: [], loading: true, error: null };

  componentDidMount() {
    this.getCareGiversData();
  }

  getCareGiversData = async () => {
    try {
      const response = await fetch("http://localhost:5000/caregivers");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const formattedData = data.map(item => ({
        id: item.id,
        name: item.name,
        specialty: item.specialty,
        location: item.location,
        experience: item.experience,
        rating: item.rating,
        tags: Array.isArray(item.tags) ? item.tags : [],
        languages: item.languages,
        availability: item.availability,
        imageUrl: item.imageUrl
      }));

      this.setState({ caregivers: formattedData, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  render() {
    const { caregivers, loading, error } = this.state;

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (caregivers.length === 0) return <p>No caregivers data found.</p>;

    return (
      <>
        <Header />
        <div className="caregiver-list-container">
          <h1>Care Givers</h1>
          <ul>
            {caregivers.map(cg => (
              <li key={cg.id} className="caregiver-item">
                <img src={cg.imageUrl} alt={cg.name} width="300" />
                <h2>{cg.name}</h2>
                <p><strong>Specialty:</strong> {cg.specialty}</p>
                <p><strong>Location:</strong> {cg.location}</p>
                <p><strong>Experience:</strong> {cg.experience}</p>
                <p><strong>Rating:</strong> {cg.rating}</p>
                <p><strong>Languages:</strong> {cg.languages}</p>
                <p><strong>Availability:</strong> {cg.availability}</p>
                <p><strong>Tags:</strong> {cg.tags.join(', ')}</p>

                <ul className="services-links">
                  <li>
                    <Link to="/zoom-meeting" className="zoom-button"  state ={{caregiver:cg}}>
                      Book Zoom Meeting
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/book-service"
                      className="service-button"
                      state={{ caregiver: cg }}
                    >
                      Book Service
                    </Link>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default CareGivers;
