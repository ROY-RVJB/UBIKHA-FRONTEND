import { LuStar,LuBed,LuRefreshCcwDot  } from "react-icons/lu";
import './features.css';

export interface FeaturesProps {
  feature1Title: string;
  feature1Description: string;
  feature2Title: string;
  feature2Description: string;
  feature3Title: string;
  feature3Description: string;

}
export const Features = ({ feature1Title, feature1Description,feature2Title, feature2Description,feature3Title, feature3Description, }: FeaturesProps) => {
  return (
    <section className="features-section">
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <LuRefreshCcwDot /> 
          </div>  
          <h3 className="feature-title">{feature1Title}</h3>
          <p className="feature-description">
            {feature1Description}
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
             <LuBed /> 
          </div>
          <h3 className="feature-title">{feature2Title}</h3>
          <p className="feature-description">
            {feature2Description}
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
             <LuStar/> 
          </div>
          <h3 className="feature-title">{feature3Title}</h3>
          <p className="feature-description">
            {feature3Description}
          </p>
        </div>
        
      </div>
    </section>
  );
};