import './NumericCounter.css';

interface NumericCounterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

function NumericCounter({ label, value, onChange, min = 0, max = 99 }: NumericCounterProps) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="counter-container">
      <div className="counter-label">
        <span>{label}</span>
      </div>
      <div className="counter-controls">
        <button
          className={`counter-btn counter-btn-minus ${value <= min ? 'disabled' : ''}`}
          onClick={handleDecrement}
          disabled={value <= min}
          aria-label={`Disminuir ${label.toLowerCase()}`}
        >
          -
        </button>
        <span className="counter-value" aria-live="polite">
          {value}
        </span>
        <button
          className={`counter-btn counter-btn-plus ${value >= max ? 'disabled' : ''}`}
          onClick={handleIncrement}
          disabled={value >= max}
          aria-label={`Aumentar ${label.toLowerCase()}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default NumericCounter;