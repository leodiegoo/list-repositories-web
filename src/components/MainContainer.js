function MainContainer(props) {
  return (
    <section className="hero is-fullheight has-background-info">
      <div className="hero-body">{props.children}</div>
    </section>
  );
}

export default MainContainer;
