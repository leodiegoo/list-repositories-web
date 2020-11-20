import { useState, useCallback, useEffect } from "react";
import _ from "lodash";

import Header from "./components/Header";
import Container from "./components/Container";
import Section from "./components/Section";
import Modal from "./components/Modal";
import RepositoryItem from "./components/RepositoryItem";

import api from "./services/api";

import { useApp } from "./hooks";

function App() {
  const [username, setUsername] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { repositories, setRepositories, toast } = useApp();

  useEffect(() => {
    async function getRepositories() {
      try {
        if (username) {
          setIsLoading(true);
          const { data } = await api.get(`/repositories/${username}`);
          setRepositories(data.map((repo) => ({ ...repo, star: false })));

          setIsLoading(false);

          toast("🦄 Found repositories!", {
            position: "top-center",
          });
        } else {
          setRepositories([]);
        }
      } catch (error) {
        toast.info("👻 Repositories not found!", {
          position: "top-center",
        });
        setIsLoading(false);
      }
    }
    getRepositories();
  }, [username, setRepositories, toast]);

  const debounceFunc = useCallback(
    _.debounce((e) => setUsername(e.target.value), 500),
    []
  );

  const handleChangeInputUsername = (e) => {
    debounceFunc(e);
  };

  return (
    <Container>
      <Header>GitHub Repositories</Header>

      <Section>
        <div className="column is-half">
          <div className="field">
            <p
              className={
                "control has-icons-left is-large " +
                (isLoading ? "is-loading" : "")
              }
            >
              <input
                className="input is-medium "
                type="text"
                placeholder="Username"
                onChange={handleChangeInputUsername}
              />
              <span className="icon is-small is-left">@</span>
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="column is-half">
          <ul>
            {repositories.map((repository) => (
              <RepositoryItem key={repository.id} repository={repository} />
            ))}
          </ul>
        </div>
      </Section>

      <Modal />
    </Container>
  );
}

export default App;
