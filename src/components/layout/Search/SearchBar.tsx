import './SearchBar.css';

export interface SearchBarProps {
  locationPlaceholder?: string;
  durationPlaceholder?: string;
}

export const SearchBar = ({ 
  locationPlaceholder = "Ubicación", 
  durationPlaceholder = "¿Cuánto tiempo?"
}: SearchBarProps) => {

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <div className="search-input-group">
          <input
            type="text"
            className="search-input location-input"
            placeholder={locationPlaceholder}
          />
          
          <input
            type="text"
            className="search-input duration-input"
            placeholder={durationPlaceholder}
          />
          
          <button className="search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
  );
};