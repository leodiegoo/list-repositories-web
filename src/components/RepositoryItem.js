import { useApp } from "../hooks";

import {
  AiFillStar as SetStar,
  AiOutlineStar as StarUnset,
} from "react-icons/ai";

const RepositoryItem = (props) => {
  const {
    auth,
    toggleModal,
    putStarRepository,
    deleteStarRepository,
    repositories,
    setRepositories,
    toast,
  } = useApp();
  const repository = props.repository;

  const toggleStar = async ({ id, star }) => {
    const newRepositories = repositories.map((repo) => {
      if (repo.id === id) {
        const updatedRepo = {
          ...repo,
          star,
        };
        return updatedRepo;
      }
      return repo;
    });

    setRepositories(newRepositories);
  };

  const handleClickStarRepository = async ({
    owner,
    repository,
    id,
    alreadyStar,
  }) => {
    try {
      if (!auth) {
        toggleModal();
      } else {
        toggleStar({ id, star: !alreadyStar });
        if (alreadyStar) {
          await deleteStarRepository({ owner, repository });
          toast.success("😎 Unstarred successfully!", {
            position: "top-center",
          });
        } else {
          await putStarRepository({ owner, repository });
          toast.success("🤩 Starred successfully!", {
            position: "top-center",
          });
        }
      }
    } catch (error) {
      console.error(error);
      toggleStar({ id, star: !alreadyStar });
    }
  };

  return (
    <li className="box">
      <div className="media-content">
        <div className="content">
          <h1 className="title is-size-4">
            <a rel="noreferrer" href={repository.html_url} target="_blank">
              {repository.name}
            </a>
          </h1>
          {repository.description ?? <p>{repository.description}</p>}
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            <button
              onClick={() =>
                handleClickStarRepository({
                  owner: repository.owner.login,
                  repository: repository.name,
                  id: repository.id,
                  alreadyStar: repository.star,
                })
              }
            >
              <span className="icon is-small">
                {repository.star ? <SetStar /> : <StarUnset />}
              </span>
            </button>
          </div>
        </nav>
      </div>
    </li>
  );
};

export default RepositoryItem;
