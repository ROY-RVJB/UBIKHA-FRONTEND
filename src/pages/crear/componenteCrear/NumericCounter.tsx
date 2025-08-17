import './NumericCounter.css';

interface NumericCounterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

function NumericCounter({ label, value, onChange, min = 0, max = 99, disabled = false }: NumericCounterProps) {
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
    <div className={`counter-container ${disabled ? 'counter-disabled' : ''}`}>
      <div className="counter-label">
        <span>{label}</span>
      </div>
      <div className="counter-controls">
        <button
          className={`counter-btn counter-btn-minus ${value <= min || disabled ? 'disabled' : ''}`}
          onClick={handleDecrement}
          disabled={value <= min || disabled}
          aria-label={`Disminuir ${label.toLowerCase()}`}
        >
          -
        </button>
        <span className="counter-value" aria-live="polite">
          {disabled ? '-' : value}
        </span>
        <button
          className={`counter-btn counter-btn-plus ${value >= max || disabled ? 'disabled' : ''}`}
          onClick={handleIncrement}
          disabled={value >= max || disabled}
          aria-label={`Aumentar ${label.toLowerCase()}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default NumericCounter;