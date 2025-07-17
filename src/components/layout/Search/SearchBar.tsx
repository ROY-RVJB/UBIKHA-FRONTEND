import './SearchBar.css';

export interface SearchBarProps {
  locationPlaceholder?: string;
  durationPlaceholder?: string;
  onSearch?: (location: string, duration: string) => void;
}

export const SearchBar = ({ 
  locationPlaceholder = "Ubicación", 
  durationPlaceholder = "¿Cuánto tiempo?",
  onSearch 
}: SearchBarProps) => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const location = formData.get('location') as string;
    const duration = formData.get('duration') as string;
    
    if (onSearch) {
      onSearch(location, duration);
    }
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-input-group">
          <input
            type="text"
            name="location"
            className="search-input location-input"
            placeholder={locationPlaceholder}
          />
          
          <input
            type="text"
            name="duration"
            className="search-input duration-input"
            placeholder={durationPlaceholder}
          />
          
          <button type="submit" className="search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
    </div>
  );
};