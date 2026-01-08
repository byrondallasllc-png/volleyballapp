import React from 'react';
import { Link } from 'react-router-dom';
import './TournamentCard.css';

const StarRating = ({ rating, showValue = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="star star-full">★</span>
      ))}
      {hasHalfStar && <span className="star star-half">★</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="star star-empty">★</span>
      ))}
      {showValue && <span className="star-value">{rating.toFixed(1)}</span>}
    </div>
  );
};

export default function TournamentCard({ tournament }) {
  const {
    id,
    name,
    organization,
    city,
    state,
    venue,
    dates,
    ageGroup,
    bidRequired,
    registrationFee,
    estimatedTravelCost,
    ratings,
    numReviews,
    recruitingData
  } = tournament;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const averageRating = Object.values(ratings).reduce((a, b) => a + b, 0) / Object.keys(ratings).length;
  const totalCost = registrationFee + estimatedTravelCost;

  return (
    <Link to={`/tournament/${id}`} className="tournament-card">
      {/* Header */}
      <div className="tournament-card-header">
        <div className="tournament-org-badge">{organization}</div>
        {bidRequired && <div className="tournament-bid-badge">🏆 Bid Required</div>}
      </div>

      {/* Title */}
      <h3 className="tournament-card-title">{name}</h3>

      {/* Location */}
      <div className="tournament-location">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>{city}, {state}</span>
      </div>

      <div className="tournament-venue">{venue}</div>

      {/* Dates */}
      <div className="tournament-dates">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>{formatDate(dates.start)} - {formatDate(dates.end)}</span>
        <span className="tournament-age-group">{ageGroup}</span>
      </div>

      {/* Overall Rating */}
      <div className="tournament-overall-rating">
        <StarRating rating={averageRating} />
        <span className="tournament-reviews-count">({numReviews} reviews)</span>
      </div>

      {/* Rating Categories */}
      <div className="tournament-ratings">
        <div className="rating-item">
          <div className="rating-label">Competition</div>
          <StarRating rating={ratings.competitionLevel} showValue={false} />
        </div>
        <div className="rating-item">
          <div className="rating-label">Organization</div>
          <StarRating rating={ratings.organizationQuality} showValue={false} />
        </div>
        <div className="rating-item">
          <div className="rating-label">Recruiting</div>
          <StarRating rating={ratings.recruitingVisibility} showValue={false} />
        </div>
        <div className="rating-item">
          <div className="rating-label">Value</div>
          <StarRating rating={ratings.valueForMoney} showValue={false} />
        </div>
      </div>

      {/* Cost Estimate */}
      <div className="tournament-cost">
        <div className="cost-label">Est. Total Cost</div>
        <div className="cost-value">${totalCost.toLocaleString()}</div>
        <div className="cost-breakdown">
          ${registrationFee} reg + ${estimatedTravelCost} travel
        </div>
      </div>

      {/* Recruiting Info */}
      {recruitingData.collegeScoutsAttending.length > 0 && (
        <div className="tournament-recruiting">
          <div className="recruiting-icon">🎓</div>
          <div className="recruiting-info">
            <div className="recruiting-label">College Scouts Attending</div>
            <div className="recruiting-schools">
              {recruitingData.collegeScoutsAttending.slice(0, 3).join(', ')}
              {recruitingData.collegeScoutsAttending.length > 3 && ` +${recruitingData.collegeScoutsAttending.length - 3} more`}
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="tournament-card-footer">
        <button className="view-details-btn">
          View Details
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </Link>
  );
}
