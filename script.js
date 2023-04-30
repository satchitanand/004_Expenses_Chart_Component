fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    createChart(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function createChart(data) {
  const chartContainer = document.querySelector(".chart");

  MAX_PERCENT = 80;
  const style = getComputedStyle(document.body);
  const maxColor = style.getPropertyValue("--cyan");

  // Find the maximum value in the data
  const maxValue = Math.max(...data.map((item) => item.amount));

  data.forEach((item) => {
    // Create a container for the tooltip, the bar and the label
    const barContainer = document.createElement("div");
    barContainer.classList.add("bar-container");

    // Append the bar container to the chart container
    chartContainer.appendChild(barContainer);

    /***************** tooltip *****************/
    
    // Create a tooltip and set its content to the amount value
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.textContent = item.amount.toFixed(2);

    // Append the tooltip to the bar container
    barContainer.appendChild(tooltip);
        
    /******************  bar  ******************/
    
    // Create a bar and set its height based on the data value
    const bar = document.createElement("div");
    
    bar.classList.add("bar");
    const barHeight = (item.amount / maxValue) * MAX_PERCENT;
    bar.style.height =  barHeight + "%";
    
    if (barHeight > (MAX_PERCENT - 1)) {
      bar.style.backgroundColor = maxColor;
    }
    
    // Append the bar to the bar container
    barContainer.appendChild(bar);
        
    /****************** label ******************/
    
    // Create a label and set its text content to the label from the data
    const label = document.createElement("div");
    label.classList.add("bar-label");
    label.textContent = item.day;

    // Append the label to the bar container
    barContainer.appendChild(label);
  });
}
