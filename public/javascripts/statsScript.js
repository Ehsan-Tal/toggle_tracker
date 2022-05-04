fetch("/stats/collect")
  .then( res => res.json() )
  .then( res => {
    
    const config  = res.config;
    const data = res.data;
    const labels  = res.labels;

    console.log(config);
    const anChart = new Chart(
      document.getElementById('anChart'),
      config
    );
  })
  .catch(err => {
    makeErrorMessage(err);
  });
