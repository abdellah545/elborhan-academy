import React, { useState } from "react";
import style from "./PlansComponents.module.css";

function PlansComponent() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [duration, setDuration] = useState(45); // Default duration to 45 minutes

  const plans = [
    { id: 1, sessions: 2 },
    { id: 2, sessions: 4 },
    { id: 3, sessions: 6 },
    { id: 4, sessions: 8 },
  ];

  const calculatePrice = () => {
    if (!selectedPlan) return 0;
    return ((selectedPlan.sessions * duration) / 60) * 8;
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan === selectedPlan ? null : plan);
  };

  const handleDurationChange = (e) => {
    setDuration(Number(e.target.value));
  };

  return (
    <div className={`${style.plans_container}`}>
      <div className={`${style.plan_cards}`}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`${style.plan_card} ${
              selectedPlan && selectedPlan.id === plan.id ? "selected" : ""
            }`}
            onClick={() => handleSelectPlan(plan)}
          >
            <h3 className={`${style.__h3}`}>{plan.sessions} Sessions per month</h3>
            <p>Unlimited Study</p>
            <p>Teacher Support</p>
            <p>Visual Interaction</p>
            <button className={`${style.select_button}`}>Select</button>
          </div>
        ))}
      </div>
      <div className={`${style.slider_container}`}>
        <input
          type="range"
          min="30"
          max="120"
          step="15"
          value={duration}
          onChange={handleDurationChange}
          list="tickmarks"
        />
        <datalist id="tickmarks">
          <option value="30" label="30"></option>
          <option value="45" label="45"></option>
          <option value="60" label="60"></option>
          <option value="75" label="75"></option>
          <option value="90" label="90"></option>
          <option value="105" label="105"></option>
          <option value="120" label="120"></option>
        </datalist>
        <div className={`${style.slider_labels}`}>
          {["30", "45", "60", "75", "90", "105", "120"].map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div>
      </div>
      <h3 className={`${style._h3}`}>Estimated: ${calculatePrice().toFixed(2)}</h3>
    </div>
  );
}

export default PlansComponent;
