import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import SurveyComponent from "./SurveyComponent";

const root = createRoot(document.getElementById("surveyElement"));
root.render(<SurveyComponent />);
