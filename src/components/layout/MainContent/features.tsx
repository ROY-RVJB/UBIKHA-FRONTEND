
import './features.css';

export interface FeaturesProps {
  feature1Title: string;
  feature1Description: string;
  feature1Icon: string;
  feature2Title: string;
  feature2Description: string;
  feature2Icon: string;
  feature3Title: string;
  feature3Description: string;
  feature3Icon: string;
}
export const Features = ({ feature1Title, feature1Description, feature1Icon,feature2Title, feature2Description, feature2Icon,feature3Title, feature3Description, feature3Icon }: FeaturesProps) => {
  return (
    <section className="features-section">
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <i className={feature1Icon}></i>
          </div>
          <h3 className="feature-title">{feature1Title}</h3>
          <p className="feature-description">
            {feature1Description}
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <i className={feature2Icon}></i>
          </div>
          <h3 className="feature-title">{feature2Title}</h3>
          <p className="feature-description">
            {feature2Description}
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <i className={feature3Icon}></i>
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