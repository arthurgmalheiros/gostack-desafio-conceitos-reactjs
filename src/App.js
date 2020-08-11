import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // setRepositories([...repositories, `Repositório ${Date.now()}`])
    const response = await api.post("repositories", {
      title: `Repositório ${Date.now()}`,
      techs: "Arthur Malheiros",
      url: "arthur.com.br",
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <>
      <Header title="Repositories">
        <ul data-testid="repository-list">
          {repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>

        <button onClick={handleAddRepository}>Adicionar</button>
      </Header>
    </>
  );
}

export default App;
