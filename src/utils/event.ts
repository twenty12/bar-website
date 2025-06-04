import ReactGA from "react-ga4";

export const logEvent = (category: string, action: string, label?: string, value?: number) => {
  // Log all events to console for debugging
  console.log('Event:', { category, action, label, value });

  // Special logging for Rooftop Honey events
  if (category === "Rooftop Honey" || action === "Rooftop Honey" || label?.includes("Rooftop Honey")) {
    console.log('Rooftop Honey Event:', {
      category,
      action,
      label,
      value,
      timestamp: new Date().toISOString()
    });
  }

  ReactGA.event({
    category,
    action,
    label,
    value,
  });
}; 