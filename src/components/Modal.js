import { useApp } from "../hooks";

const Modal = () => {
  const { signIn, modalIsOpen, toggleModal } = useApp();

  return (
    <div className={"modal " + (modalIsOpen ? "is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Please insert your personal access token before
          </p>
        </header>
        <section className="modal-card-body">
          <p className="is-size-7">
            Create a personal access token at{" "}
            <a
              href="https://github.com/settings/tokens/new?scopes=repo"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/settings/tokens/new?scopes=repo
            </a>
          </p>
          <div className="field mt-2">
            <p className="control is-small">
              <input
                className="input is-small"
                type="text"
                placeholder="Personal access token"
                onChange={(e) => signIn(e.target.value)}
              />
            </p>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={toggleModal}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
