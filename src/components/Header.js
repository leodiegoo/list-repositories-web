function Header(props) {
  return (
    <section className="has-text-centered">
      <h1 className="title is-size-3 has-text-weight-bold has-text-info-dark">
        {props.children}
      </h1>
    </section>
  );
}

export default Header;
