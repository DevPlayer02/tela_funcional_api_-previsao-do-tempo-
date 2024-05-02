
async function getAddressByCep() {
    const cep = document.getElementById("cep").value;
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
  
        const tableBody = document.getElementById("resultado-cep-table").getElementsByTagName('tbody')[0];
  
        if (tableBody.rows.length > 0) {
            tableBody.deleteRow(0);
        }
  
        const newRow = tableBody.insertRow();
        newRow.insertCell().textContent = data.logradouro;
        newRow.insertCell().textContent = data.bairro;
        newRow.insertCell().textContent = data.localidade;
  
        tableBody.classList.add("resultado-table");
    } catch (error) {
        alert(error.message);
    }
  }

async function getPrevisao() {
  const lat = document.getElementById("latitude").value;
  const lon = document.getElementById("longitude").value;
  try {
      const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`
      );
      const data = await response.json();
      console.log(data);

      const div = document.querySelector('.previsao-tempo');
      if (data && data.hourly && data.hourly.temperature_2m.length > 0) {
          const temperaturaAtual = data.hourly.temperature_2m[0];
          if (div) {
              div.innerHTML = `<h1>Previsão de tempo de acordo com a região: ${temperaturaAtual}°C</h1>`;
          } else {
              const div = document.createElement('div');
              div.classList.add('previsao-tempo');
              div.innerHTML = `<h1>Previsão de tempo de acordo com a região: ${temperaturaAtual}°C</h1>`;
              document.getElementById('resul-tempo').appendChild(div);
          }
      } else {
          document.getElementById('resul-tempo').innerHTML = "<h1>Não foi possível obter a temperatura atual.</h1>";
      }
  } catch (error) {
      alert(error.message);
  }
}
